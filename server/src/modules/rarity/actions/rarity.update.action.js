const crudService = new services.CrudService(models.Rarity);

exports.update = {
    createRarity: async (req, res, next) => {
        try {
            const { body: payload } = req;
            let rarity = await crudService.add(payload);
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    updateRarity: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let rarity = await crudService.update(payload, id, messages.notFound("Record"));
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    setName: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let rarity = await crudService.update({ name: payload.name }, id, messages.notFound("Record"));
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    setColour: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let rarity = await crudService.update({ colour: payload.colour }, id, messages.notFound("Record"));
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
    setProbability: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let rarity = await crudService.update({ probability: payload.probability }, id, messages.notFound("Record"));
            return utils.apiResponse.ok(res, messages.success, rarity);
        } catch (err) {
            next(err);
        }
    },
};