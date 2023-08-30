const { body, param } = expressValidator;

let createAssetPayloadValidation = [
    body("name")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
    body("type")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
    body("price")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isInt({ min: 0 })
        .withMessage(messages.invalidLength),
    body("rarity")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isMongoId()
        .withMessage(messages.invalidId),
    body("supply")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isInt({ min: 0 })
        .withMessage(messages.invalidLength),
    body("src")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
];
let setAssetNamePayloadValidation = [
    body("name")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String"))
];
let setTypePayloadValidation = [
    body("type")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String"))
];
let setPricePayloadValidation = [
    body("price")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isInt({ min: 0 })
        .withMessage(messages.invalidLength),
];
let setRarityPayloadValidation = [
    body("rarity")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isMongoId()
        .withMessage(messages.invalidId)
];
let setSupplyPayloadValidation = [
    body("supply")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isInt({ min: 0 })
        .withMessage(messages.invalidLength),
];
let setSrcPayloadValidation = [
    body("src")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
];
let setAvailabilityPayloadValidation = [
    body("date_from")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isISO8601()
        .withMessage(messages.invalidDataType("Date")),
    body("date_to")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isISO8601()
        .withMessage(messages.invalidDataType("Date")),
];

module.exports = {
    createAssetPayloadValidation,
    setAssetNamePayloadValidation,
    setTypePayloadValidation,
    setPricePayloadValidation,
    setRarityPayloadValidation,
    setSupplyPayloadValidation,
    setSrcPayloadValidation,
    setAvailabilityPayloadValidation
};
