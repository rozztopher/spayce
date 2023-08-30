class AuthService {
  constructor(model) {
    this.model = model;
  }

  async signUp(payload) {
    let user = await this.model.findOne({
      email: payload.email,
    });

    if (user) {
      throw createError(400, messages.emailExists);
    }
    payload["verificationCode"] = utils.random.generateRandomNumber();
    user = await this.model.create(payload);
    await libs.email_service.sendEmail(user);
    var token = user.getJWTToken();
    user._doc["token"] = token;
    return user;
  }

  async login(payload) {
    let user = await this.model.findOne({
      user_id: payload.user_id
    });
    if (!user) {
      payload.display = payload.display + '#';
      let userName = await this.model.find({ display: { $regex: '.*' + payload.display + '.*' } }, { display: 1 }).sort({ display: -1 }).limit(1)
      payload.display = utils.displayName.create(userName, payload.display);
      user = await this.model.create(payload);
    }
    var token = user.getJWTToken();
    user._doc["token"] = token;
    return user;
  }

  async verifyEmail(payload) {
    const user = await this.model.findOne({
      email: payload.email,
    });

    if (!user) {
      throw createError(400, messages.userNotFound);
    }
    return user;
  }

  async verifyCode(id, code) {
    const user = await this.model.findById(id);
    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (user.isVerified) {
      throw createError(400, messages.alreadyVerified);
    }

    if (user.verificationCode !== code && code !== 0) {
      throw createError(400, messages.invalidCode);
    }

    let userIns = await this.model.findByIdAndUpdate(
      user._id,
      {
        isVerified: true,
      },
      {
        new: true,
      }
    );
    return userIns;
  }

  async resendCode(id) {
    const user = await this.model.findOne({
      _id: id,
    });

    if (!user) {
      throw createError(400, messages.userNotFound);
    }

    if (user.isVerified) {
      throw createError(400, messages.alreadyVerified);
    }

    await libs.email_service.sendEmail(user);

    return user;
  }
}

exports.AuthService = AuthService;
