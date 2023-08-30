const crudService = new services.CrudService(models.Rarity);

exports.list = {
    getAllRarities: async (req, res, next) => {
        try {
            let rarities = await crudService.getList();
            return utils.apiResponse.ok(res, messages.success, rarities);
        } catch (err) {
            next(err);
        }
    },
    getAllRaritiesByProbability: async (req, res, next) => {
        try {
            let rarities = await crudService.getList({ probability: 1 });
            return utils.apiResponse.ok(res, messages.success, rarities);
        } catch (err) {
            next(err);
        }
    },
    getRaritiesByCategory: async (req, res, next) => {
        try {
            const cat = req.params.cat;
            let rarity = await models.Rarity.find({ category: cat });
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    getRaritiyBySubCategory: async (req, res, next) => {
        try {
            const cat = req.params.cat;
            let rarity = await models.Rarity.findOne({ sub_category: cat });
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const id = req.params.id;
            let rarity = await models.Rarity.findOne({ _id: id }, { category: 1 });
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    getSubCategory: async (req, res, next) => {
        try {
            const id = req.params.id;
            let rarity = await models.Rarity.findOne({ _id: id }, { sub_category: 1 });
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    getProbability: async (req, res, next) => {
        try {
            const id = req.params.id;
            let rarity = await models.Rarity.findOne({ _id: id }, { probability: 1 });
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
};