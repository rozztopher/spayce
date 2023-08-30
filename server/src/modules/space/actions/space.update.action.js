const crudService = new services.CrudService(models.Space);

exports.update = {
    createSpace: async (req, res, next) => {
        try {
            const { body: payload } = req;
            // const id = req.params.id;
            let space = await crudService.add(payload);
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    deleteSpace: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.deleteById(id);
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    updateSpace: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let space = await crudService.update(payload, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    setName: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let space = await crudService.update({ name: payload.name }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    setOwner: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let space = await crudService.update({ owner: payload.userId }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    removeOwner: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.update({ owner: null }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    setAudio: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let space = await crudService.update({ audio: payload.audio }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    removeAudio: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.update({ audio: null }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    incrementViews: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.update({ $inc: { views: 1 } }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    incrementLikes: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.update({ $inc: { likes: 1 } }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    incrementShares: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.update({ $inc: { shares: 1 } }, id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    }
};