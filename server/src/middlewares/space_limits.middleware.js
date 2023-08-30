exports.validateLimits = (req, res, next) => {
    const { body: payload } = req;
    if (!payload.limits
        || !payload.limits.air_slot_limit
        || !_.isNumber(payload.limits.air_slot_limit)
        || payload.limits.air_slot_limit < 0) {
        throw createError(400, messages.invalidLimit('air_slot_limit'));
    } else if (!payload.limits.wall_slot_limit
        || !_.isNumber(payload.limits.wall_slot_limit)
        || payload.limits.wall_slot_limit < 0) {
        throw createError(400, messages.invalidLimit('wall_slot_limit'));
    } else if (!payload.limits.floor_slot_limit
        || !_.isNumber(payload.limits.floor_slot_limit)
        || payload.limits.floor_slot_limit < 0) {
        throw createError(400, messages.invalidLimit('floor_slot_limit'));
    } else if (!payload.limits.nft_slot_limit
        || !_.isNumber(payload.limits.nft_slot_limit)
        || payload.limits.nft_slot_limit < 0) {
        throw createError(400, messages.invalidLimit('nft_slot_limit'));
    } else if (!payload.limits.viewer_limit
        || !_.isNumber(payload.limits.viewer_limit)
        || payload.limits.viewer_limit < 0) {
        throw createError(400, messages.invalidLimit('viewer_limit'));
    } else if (!payload.limits.levels_limit
        || !_.isNumber(payload.limits.levels_limit)
        || payload.limits.levels_limit < 0) {
        throw createError(400, messages.invalidLimit('levels_limit'));
    }
    payload.air_slot_limit = payload.limits.air_slot_limit;
    payload.wall_slot_limit = payload.limits.wall_slot_limit;
    payload.floor_slot_limit = payload.limits.floor_slot_limit;
    payload.nft_slot_limit = payload.limits.nft_slot_limit;
    payload.viewer_limit = payload.limits.viewer_limit;
    payload.levels_limit = payload.limits.levels_limit;
    delete payload.limits;
    next();
};
