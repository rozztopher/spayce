const crudService = new services.CrudService(models.User);

exports.update = {
    updateUser: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            if (payload.display && !payload.display.includes("#")) {
                payload.display = payload.display + '#';
                let userName = await models.User.find({ display: { $regex: '.*' + payload.display + '.*' } }, { display: 1 }).sort({ display: -1 }).limit(1)
                payload.display = utils.displayName.create(userName, payload.display);
            }
            let user = await crudService.update(payload, id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    updateDisplayName: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { body: payload } = req;
            payload.display= payload.display + '#';
            let userName = await models.User.find({ display: { $regex: '.*' + payload.display + '.*' } }, { display: 1 }).sort({ display: -1 }).limit(1)
            payload.display = utils.displayName.create(userName, payload.display);
            let user = await crudService.update({ display: payload.display }, id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    addSpace: async (req, res, next) => {
        try {
            const space_id = req.params.id;
            let user = await crudService.update({ "$addToSet": { "spaces": space_id } }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    removeSpace: async (req, res, next) => {
        try {
            const space_id = req.params.id;
            let user = await crudService.update({ "$pull": { "spaces": space_id } }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    removeAllSpaces: async (req, res, next) => {
        try {
            let user = await crudService.update({ $set: { 'spaces': [] } }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    addSubscription: async (req, res, next) => {
        try {
            const subscription = req.params.id;
            let user = await crudService.update({ "$addToSet": { "subscription": subscription } }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    removeSubscription: async (req, res, next) => {
        try {
            const subscription = req.params.id;
            let user = await crudService.update({ "$pull": { "subscription": subscription } }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    removeAllSubscriptions: async (req, res, next) => {
        try {
            let user = await crudService.update({ $set: { 'subscription': [] } }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    updateSettings: async (req, res, next) => {
        try {
            const { body: payload } = req;
            let user = await crudService.update({ settings: payload.settings }, req.user._id, messages.userNotFound);
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    resetSettings: async (req, res, next) => {
        try {
            return utils.apiResponse.ok(res, messages.success, req.user);
        } catch (err) {
            next(err);
        }
    },
};