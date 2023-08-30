router
    // Update
    .post(
        "/asset/createAsset",
        validators.asset.createAssetPayloadValidation,
        middlewares.validation.request,
        actions.asset.update.createAsset
    )
    .delete(
        "/asset/deleteAsset/:id",
        middlewares.id_validation.validateId,
        middlewares.validation.request,
        actions.asset.update.deleteAsset
    )
    .put(
        "/asset/updateAsset/:id",
        middlewares.id_validation.validateId,
        middlewares.validation.request,
        validators.asset.createAssetPayloadValidation,
        actions.asset.update.updateAsset        
    )
    .put(
        "/asset/setAssetName/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        validators.asset.setAssetNamePayloadValidation,
        actions.asset.update.setAssetName
    )
    .put(
        "/asset/setType/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        validators.asset.setTypePayloadValidation,
        actions.asset.update.setType
    )
    .put(
        "/asset/setPrice/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        validators.asset.setPricePayloadValidation,
        actions.asset.update.setPrice
    )
    .put(
        "/asset/setRarity/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        validators.asset.setRarityPayloadValidation,
        actions.asset.update.setRarity
    )
    .put(
        "/asset/setSupply/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        validators.asset.setSupplyPayloadValidation,
        actions.asset.update.setSupply
    )
    .put(
        "/asset/setSrc/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        validators.asset.setSrcPayloadValidation,
        actions.asset.update.setSrc
    )
    .get(
        "/asset/removeSrc/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        actions.asset.update.removeSrc
    )
    .put(
        "/asset/setAvailability/:id",
        middlewares.id_validation.validateId,
        validators.asset.setAvailabilityPayloadValidation,
        middlewares.validation.request,
        actions.asset.update.setAvailability
    )
    // Lists
    .get(
        "/asset/getAllAssets",
        middlewares.validation.request,
        actions.asset.list.getAllAssets
    )
    .get(
        "/asset/getAssetById/:id",
        middlewares.validation.request,
        middlewares.id_validation.validateId,
        actions.asset.list.getAssetById
    )
    .get(
        "/asset/getAssetsByName/:name",
        middlewares.validation.request,
        actions.asset.list.getAssetsByName
    )
    .get(
        "/asset/getAssetsByType/:type",
        middlewares.validation.request,
        actions.asset.list.getAssetsByType
    )
    .get(
        "/asset/getAssetsLessThanPrice/:price",
        middlewares.validation.request,
        actions.asset.list.getAssetsLessThanPrice
    )
    .get(
        "/asset/getAssetsByRarity/:id",
        middlewares.id_validation.validateId,
        middlewares.validation.request,
        actions.asset.list.getAssetsByRarity
    )
    .get(
        "/asset/getSupply/:id",
        middlewares.id_validation.validateId,
        middlewares.validation.request,
        actions.asset.list.getSupply
    )
    .get(
        "/asset/getSrc/:id",
        middlewares.id_validation.validateId,
        middlewares.validation.request,
        actions.asset.list.getSrc
    )
    .get(
        "/asset/getAvailability/:id",
        middlewares.id_validation.validateId,
        actions.asset.list.getAvailability
    );

module.exports = { prefix: "asset", router };
