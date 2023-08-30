const crudService = new services.CrudService(models.Asset);

exports.list = {
    getAllAssets: async (req, res, next) => {
        try {
            let assets = await crudService.getList();
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getAssetById: async (req, res, next) => {
        try {
            const id = req.params.id;
            let asset = await crudService.getModelById(id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    getAssetsByName: async (req, res, next) => {
        try {
            const name = req.params.name;
            let assets = await models.Asset.find({ name: { $regex: '.*' + name + '.*' } });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getAssetsByType: async (req, res, next) => {
        try {
            const type = req.params.type;
            let assets = await models.Asset.find({ type: { $regex: '.*' + type + '.*' } });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getAssetsLessThanPrice: async (req, res, next) => {
        try {
            const price = req.params.price;
            let assets = await models.Asset.find({ price: { $lte: price } });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getAssetsByRarity: async (req, res, next) => {
        try {
            const id = req.params.id;
            let assets = await models.Asset.find({ rarity: id });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getSupply: async (req, res, next) => {
        try {
            const id = req.params.id;
            let assets = await models.Asset.findOne({ _id: id }, { supply: 1 });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getSrc: async (req, res, next) => {
        try {
            const id = req.params.id;
            let assets = await models.Asset.findOne({ _id: id }, { src: 1 });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
    getAvailability: async (req, res, next) => {
        try {
            const id = req.params.id;
            let assets = await models.Asset.findOne({ _id: id }, { date_from: 1, date_to: 1 });
            return utils.apiResponse.ok(res, messages.success, assets);
        } catch (err) {
            next(err);
        }
    },
};