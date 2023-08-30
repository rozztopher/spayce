const { body, param } = expressValidator;

let createRarityPayloadValidation = [
    body("name")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
    body("colour")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
    body("probability")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isInt({ min: 0, max: 1 })
        .withMessage(messages.invalidLength)
];
let setNamePayloadValidation = [
    body("name")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
];
let setColourPayloadValidation = [
    body("colour")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
];
let setProbabilityPayloadValidation = [
    body("probability")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isInt({ min: 0, max: 1 })
        .withMessage(messages.invalidLength)
];

module.exports = {
    createRarityPayloadValidation,
    setNamePayloadValidation,
    setColourPayloadValidation,
    setProbabilityPayloadValidation
};
