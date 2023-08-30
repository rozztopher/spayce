import { Document, Model } from "mongoose";

declare global {
  // GLOBAL PACKAGES
  const express: typeof import("express");
  const app: ReturnType<typeof express>;
  const router: ReturnType<typeof express.Router>;
  const createError: typeof import("http-errors");
  const cookieParser: typeof import("cookie-parser");
  const logger: typeof import("morgan");
  const _: typeof import("lodash");
  const glob: typeof import("glob");
  const path: typeof import("path");
  const fs: typeof import("fs");
  const passport: typeof import("passport");
  const passportLocal: typeof import("passport-local");
  const passportJWT: typeof import("passport-jwt");
  const mongoose: typeof import("mongoose");
  const crypto: typeof import("crypto");
  const JWT: typeof import("jsonwebtoken");
  const bodyParser: typeof import("body-parser");
  const cors: typeof import("cors");
  const fs: typeof import("fs");
  const expressValidator: typeof import("express-validator");
  const sgMail: typeof import("@sendgrid/mail");
  const util: typeof import("util");
  const axios: typeof import("axios").default;

  // MODELS
  const models: {
    User: typeof import("./src/modules/users/user.schema");
    Space: typeof import("./src/modules/space/space.schema");
    Asset: typeof import("./src/modules/asset/asset.schema");
    Rarity: typeof import("./src/modules/rarity/rarity.schema");
    Nft: typeof import("./src/modules/nfts/nft.schema");
  };

  // MIDDLEWARES
  const middlewares: {
    id_validation: typeof import("./src/middlewares/id_validation.middleware");
    jwt: typeof import("./src/middlewares/jwt.middleware");
    local_passport: typeof import("./src/middlewares/local_passport.middleware");
    query_validation: typeof import("./src/middlewares/query_validation.middleware");
    validation: typeof import("./src/middlewares/validation.middleware");
    space_limits: typeof import("./src/middlewares/space_limits.middleware");
  };
  // SERVICES
  const services: {
    AuthService: typeof import("./src/services/auth.service").AuthService;
    CrudService: typeof import("./src/services/crud.service").CrudService;
  };
  // UTILS
  const utils: {
    globalFile: typeof import("./src/utils/globalFile.util");
    hash: typeof import("./src/utils/hash.util");
    random: typeof import("./src/utils/random.util");
    apiResponse: typeof import("./src/utils/apiResponse.util");
    dumpResponse: typeof import("./src/utils/dumpResponse.util")
    displayName: typeof import("./src/utils/displayName.util");
  };
  // LIBS
  const libs: {
    email_service: typeof import("./src/libs/email_service.lib");
  };
  // ACTIONS
  const actions: {
    users: {
      auth: typeof import("./src/modules/users/actions/user.auth.action").auth;
      list: typeof import("./src/modules/users/actions/user.list.action").list;
      update: typeof import("./src/modules/users/actions/user.update.action").update;
    };
    rarity: {
      list: typeof import("./src/modules/rarity/actions/rarity.list.action").list;
      update: typeof import("./src/modules/rarity/actions/rarity.update.action").update;
    };
    asset: {
      list: typeof import("./src/modules/asset/actions/asset.list.action").list;
      update: typeof import("./src/modules/asset/actions/asset.update.action").update;
    };
    space: {
      list: typeof import("./src/modules/space/actions/space.list.action").list;
      update: typeof import("./src/modules/space/actions/space.update.action").update;
    };
    nfts: {
      list: typeof import("./src/modules/nfts/actions/nft.list.action").list;
      update: typeof import("./src/modules/nfts/actions/nft.update.action").update;
    };
  };
  // VALIDATORS
  const validators: {
    users: typeof import("./src/modules/users/user.validator.js");
    space: typeof import("./src/modules/space/space.validator.js");
    asset: typeof import("./src/modules/asset/asset.validator.js");
    rarity: typeof import("./src/modules/rarity/rarity.validator.js");
    nfts: typeof import("./src/modules/nfts/nft.validator.js");
  };

  const messages: typeof import("./config/messages");
  const dataConstraint: typeof import("./config/data_constraints");

  namespace Express {
    interface Request {
      roleModel: Model<Document>;
    }
  }
}
export { };
