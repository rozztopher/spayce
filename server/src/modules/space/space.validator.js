const { body, param } = expressValidator;

let createSpacePayloadValidation = [
    body("name")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isMongoId()
        .withMessage(messages.invalidId),
    body("thumbnail")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
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
let setOwnerPayloadValidation = [
    body("owner")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isMongoId()
        .withMessage(messages.invalidId),
];
let setAudioPayloadValidation = [
    body("audio")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isString()
        .withMessage(messages.invalidDataType("String")),
];
let setAudioEnabledPayloadValidation = [
    body("audio_enabled")
        .exists()
        .withMessage(messages.notPresent)
        .notEmpty()
        .withMessage(messages.notEmpty)
        .isBoolean()
        .withMessage(messages.invalidDataType("Boolean")),
];

module.exports = {
    createSpacePayloadValidation,
    setNamePayloadValidation,
    setOwnerPayloadValidation,
    setAudioPayloadValidation,
    setAudioEnabledPayloadValidation,
};
