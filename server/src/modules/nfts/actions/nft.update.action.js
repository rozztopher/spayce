const crudService = new services.CrudService(models.Nft);

exports.update = {
    addNft: async (req, res, next) => {
        try {
            const { body: payload } = req;
            let nft = await crudService.add(payload);
            return utils.apiResponse.ok(res, messages.success, nft);
        } catch (err) {
            next(err);
        }
    },
    updateNft: async (req, res, next) => {
        try {
            const { body: payload } = req;
            const id = req.params.id;
            let nft = await crudService.update(payload, id, messages.notFound("NFT"));
            return utils.apiResponse.ok(res, messages.success, nft);
        } catch (err) {
            next(err);
        }
    },
};