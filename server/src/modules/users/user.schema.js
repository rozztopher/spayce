const UserSchema = new mongoose.Schema(
  {
    display: String,
    user_id: String,
    wallet_address: String,
    pfp: String,
    twitter: String,
    discord: String,
    instagram: String,
    website: String,
    email: String,
    bio: String,
    customURL: String,
    spaces: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      default: []
    }],
    likedspaces: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Space",
      default: []
    }],
    subscription: [{
      type: String,
      default: []
    }],
    verified: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

UserSchema.methods.verifyPassword = function (pwd) {
  return this.password == utils.hash.makeHashValue(pwd);
};

UserSchema.methods.getJWTToken = function () {
  const payload = {
    name: this.firstName + " " + this.lastName,
    email: this.email,
    id: this.id,
    model: "users",
  };

  return JWT.sign(payload, process.env.JWTSECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  return _.omit(obj, [
    "password",
    "verificationCode",
    "isVerified",
    "codeExpiryTime",
  ]);
};

module.exports = mongoose.model("User", UserSchema);
