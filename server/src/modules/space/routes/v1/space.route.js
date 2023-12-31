router
    // Update
    .post(
        "/space/createSpace",
        middlewares.validation.request,
        actions.space.update.createSpace
    )
    .delete(
        "/space/deleteSpace/:id",
        middlewares.id_validation.validateId,
        actions.space.update.deleteSpace
    )
    .put(
        "/space/updateSpace/:id",
        middlewares.id_validation.validateId,
        actions.space.update.updateSpace
    )
    .put(
        "/space/setName/:id",
        middlewares.id_validation.validateId,
        validators.space.setNamePayloadValidation,
        middlewares.validation.request,
        actions.space.update.setName
    )
    .put(
        "/space/setOwner/:id",
        middlewares.id_validation.validateId,
        validators.space.setOwnerPayloadValidation,
        middlewares.validation.request,
        actions.space.update.setOwner
    )
    .put(
        "/space/removeOwner/:id",
        middlewares.id_validation.validateId,
        actions.space.update.removeOwner
    )
    .put(
        "/space/setAudio/:id",
        middlewares.id_validation.validateId,
        validators.space.setAudioPayloadValidation,
        middlewares.validation.request,
        actions.space.update.setAudio
    )
    .put(
        "/space/removeAudio/:id",
        middlewares.id_validation.validateId,
        actions.space.update.removeAudio
    )
    .put(
        "/space/incrementViews/:id",
        middlewares.id_validation.validateId,
        actions.space.update.incrementViews
    )
    .put(
        "/space/incrementLikes/:id",
        middlewares.id_validation.validateId,
        actions.space.update.incrementLikes
    )
    .put(
        "/space/incrementShares/:id",
        middlewares.id_validation.validateId,
        actions.space.update.incrementShares
    )
    // Lists
    .get(
        "/space/getAllSpaces",
        middlewares.validation.request,
        actions.space.list.getAllSpaces
    )
    .get(
        "/space/getSpaceBySearch/:term",
        middlewares.validation.request,
        actions.space.list.getSpaceBySearch
    )
    .get(
        "/space/getNumberOfSpaces",
        middlewares.validation.request,
        actions.space.list.getNumberOfSpaces
    )
    .get(
        "/space/getSpace/:id",
        middlewares.id_validation.validateId,
        actions.space.list.getSpace
    )
    .get(
        // change param to body
        "/space/getSpacesByName/:name",
        actions.space.list.getSpacesByName
    )
    .get(
        "/space/getViews/:id",
        middlewares.id_validation.validateId,
        actions.space.list.getViews
    )
    .get(
        "/space/getSpacesbyViews",
        actions.space.list.getSpacesbyViews
    )
    .get(
        "/space/getLikes/:id",
        middlewares.id_validation.validateId,
        actions.space.list.getLikes
    )
    .get(
        "/space/getSpacesByLikes",
        actions.space.list.getSpacesByLikes
    )
    .get(
        "/space/getShares/:id",
        middlewares.id_validation.validateId,
        actions.space.list.getShares
    )
    .get(
        "/space/getSpacesByShares",
        actions.space.list.getSpacesByShares
    )
    .get(
        "/space/getDateCreated/:id",
        middlewares.id_validation.validateId,
        actions.space.list.getDateCreated
    )
    .get(
        "/space/getDateModified/:id",
        middlewares.id_validation.validateId,
        actions.space.list.getDateModified
    );

module.exports = { prefix: "space", router };
