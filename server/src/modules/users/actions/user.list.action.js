const crudService = new services.CrudService(models.User);

exports.list = {
    getAllUsers: async (req, res, next) => {
        try {
            let users = await crudService.getList();
            return utils.apiResponse.ok(res, messages.success, users);
        } catch (err) {
            next(err);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const id = req.params.id;
            let user = await crudService.getModelById(id, messages.notFound("User"));
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    getUserByCustomURL: async (req, res, next) => {
        try {
            const url = req.params.url;
            const users = await models.User.find({ customURL: { $regex: '.*' + url + '.*' } });
            return utils.apiResponse.ok(res, messages.success, users[0]);
        } catch (err) {
            next(err);
        }
    },
    getUsersByDisplayName: async (req, res, next) => {
        try {
            const name = req.params.name;
            let users = await models.User.find({ display_name: { $regex: '.*' + name + '.*' } });
            return utils.apiResponse.ok(res, messages.success, users);
        } catch (err) {
            next(err);
        }
    },
    getUserByDisplayName: async (req, res, next) => {
        try {
            const { body: payload } = req;
            let user = await models.User.findOne({ display_name: payload.name });
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    getAllUserSpaces: async (req, res, next) => {
        try {
            const id = req.params.id;

            let aggregate = [];
            aggregate.push({
                $match: {
                    _id: mongoose.Types.ObjectId(id)
                }
            });

            aggregate.push({
                '$lookup': {
                    'from': 'spaces',
                    'let': { 'sid': '$spaces' },
                    'pipeline': [
                        { '$match': { '$expr': { '$in': ['$_id', '$$sid'] } } }
                    ],
                    'as': 'spaces_data'
                }
            });

            let spaces = await models.User.aggregate(aggregate);
            return utils.apiResponse.ok(res, messages.success, spaces);
        } catch (err) {
            next(err);
        }
    },
    getUserSpace: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { body: payload } = req;

            let aggregate = [];
            aggregate.push({
                $match: {
                    _id: mongoose.Types.ObjectId(id)
                }
            });

            aggregate.push({
                '$lookup': {
                    'from': 'spaces',
                    'let': { 'sid': mongoose.Types.ObjectId(payload.space_id) },
                    'pipeline': [
                        { '$match': { '$expr': { '$eq': ['$_id', '$$sid'] } } }
                    ],
                    'as': 'spaces_data'
                }
            });
            
            let spaces = await models.User.aggregate(aggregate);
            return utils.apiResponse.ok(res, messages.success, spaces);
        } catch (err) {
            next(err);
        }
    },
    getUserByWalletAddress: async (req, res, next) => {
        try {
            const wallet_address = req.params.wallet_address;
            let user = await models.User.findOne({ wallet_address: payload.wallet_address });
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    isVerified: async (req, res, next) => {
        try {
            const id = req.params.id;
            let user = await models.User.findOne({ _id: id, verified: true });
            return utils.apiResponse.ok(res, messages.success, user);
        } catch (err) {
            next(err);
        }
    },
    getSubscriptions: async (req, res, next) => {
        try {
            const id = req.params.id;
            let user = await models.User.findOne({ _id: id }, { subscription: 1 });
            return utils.apiResponse.ok(res, messages.success, user.subscription);
        } catch (err) {
            next(err);
        }
    },
    getSettings: async (req, res, next) => {
        try {
            const id = req.params.id;
            let user = await models.User.findOne({ _id: id }, { settings: 1 });
            return utils.apiResponse.ok(res, messages.success, user.settings);
        } catch (err) {
            next(err);
        }
    },
    getUserBySearch: async (req, res, next) => {
        try {
            const term = req.params.term;
            let users = await models.User.find({ $text : {$search : term} })
            return utils.apiResponse.ok(res, messages.success, users);
        } catch (err) {
            next(err);
        }
    },
};