const crudService = new services.CrudService(models.Space);

exports.list = {
    getAllSpaces: async (req, res, next) => {
        try {
            let space = await crudService.getList();
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getNumberOfSpaces: async (req, res, next) => {
        try {
            let space = await models.Space.count();
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getSpace: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await crudService.getModelById(id, messages.notFound("Space"));
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getSpacesByName: async (req, res, next) => {
        try {
            const name = req.params.name;
            let space = await models.Space.find({ name: { $regex: '.*' + name + '.*' } });
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getViews: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await models.Space.findOne({ _id: id }, { views: 1 });
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getSpacesbyViews: async (req, res, next) => {
        try {
            let space = await models.Space.find()
                .sort({ views: -1 })
                .limit(100);;
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getLikes: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await models.Space.findOne({ _id: id }, { likes: 1 });
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getSpacesByLikes: async (req, res, next) => {
        try {
            let space = await models.Space.find()
                .sort({ likes: -1 })
                .limit(100);;
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getShares: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await models.Space.findOne({ _id: id }, { shares: 1 });
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getSpacesByShares: async (req, res, next) => {
        try {
            let space = await models.Space.find()
                .sort({ shares: -1 })
                .limit(100);;
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getDateCreated: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await models.Space.findOne({ _id: id }, { createdAt: 1 });
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getDateModified: async (req, res, next) => {
        try {
            const id = req.params.id;
            let space = await models.Space.findOne({ _id: id }, { updatedAt: 1 });
            return utils.apiResponse.ok(res, messages.success, space);
        } catch (err) {
            next(err);
        }
    },
    getSpaceBySearch: async (req, res, next) => {
        try {
            const term = req.params.term;
            let spaces = await models.Space.find({ $text : {$search : term}})
            return utils.apiResponse.ok(res, messages.success, spaces);
        } catch (err) {
            next(err);
        }
    },
};