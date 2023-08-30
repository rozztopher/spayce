const crudService = new services.CrudService(models.Asset);

exports.update = {
    createAsset: async (req, res, next) => {
        try {
            const { body: payload } = req;
            // const id = req.params.id;
            let asset = await crudService.add(payload);
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    deleteAsset: async (req, res, next) => {
        try {
            const id = req.params.id;
            let asset = await crudService.deleteById(id);
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    updateAsset: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update(payload, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setAssetName: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update({ name: payload.name }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setType: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update({ type: payload.type }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setPrice: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update({ price: payload.price }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setRarity: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update({ rarity: payload.rarity }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setSupply: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update({ supply: payload.supply }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setSrc: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let asset = await crudService.update({ src: payload.src }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    removeSrc: async (req, res, next) => {
        try {
            const id = req.params.id;
            let asset = await crudService.update({ src: null }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
    setAvailability: async (req, res, next) => {
        try {
            const id = req.params.id;
            const { body: payload } = req;
            let asset = await crudService.update({ date_from: payload.date_from, date_to: payload.date_to }, id, messages.notFound("Asset"));
            return utils.apiResponse.ok(res, messages.success, asset);
        } catch (err) {
            next(err);
        }
    },
};