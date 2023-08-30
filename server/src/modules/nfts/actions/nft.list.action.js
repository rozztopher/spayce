const { model } = require("mongoose");

const crudService = new services.CrudService(models.Nft);

exports.list = {
  getAllNfts: async (req, res, next) => {
    try {
      let nft = await crudService.getList();
      return utils.apiResponse.ok(res, messages.success, nft);
    } catch (err) {
      next(err);
    }
  },
  getNftByToken: async (req, res, next) => {
    try {
      let nft = await models.Nft.findOne({ id: req.params.id });
      utils.dumpResponse.ok(res, messages.success, nft);
      return nft;
    } catch (err) {
      next(err);
    }
  },
  getDataByURL: async (req, res, next) => {
    try {
      const { body: payload } = req;
      const response = await axios.get(payload.url);
      const mergedObject = {
        ...response.data,
        ...payload.data,
      };
      return utils.apiResponse.ok(res, messages.success, mergedObject);
    } catch (err) {
      next(err);
    }
  },
  getNFTBySearch: async (req, res, next) => {
    try {
      const term = req.params.term;
      let nfts = await models.Nft.find({ $text: { $search: term } });
      return utils.apiResponse.ok(res, messages.success, nfts);
    } catch (err) {
      next(err);
    }
  },
  getNFTCount: async (req, res, next) => {
    try {
      let supply = 0;
      let nfts = await crudService.getList();
      nfts.forEach((nft) => (supply += nft.supply));
      return utils.apiResponse.ok(res, messages.success, supply);
    } catch (err) {
      next(err);
    }
  },
  getSoldSum: async (req, res, next) => {
    try {
      let sold = 0;
      let nfts = await crudService.getList();
      nfts.forEach((nft) => (sold += nft.sold));
      return utils.apiResponse.ok(res, messages.success, sold);
    } catch (err) {
      next(err);
    }
  },
  getNFTCountByRarity: async (req, res, next) => {
    try {
      const rarity = req.params.rarity;
      let supply = 0;
      let nfts = await crudService.getList();
      nfts.forEach((nft) => {
        if (rarity === nft.rarity) {
          supply += nft.supply;
        }
      });
      return utils.apiResponse.ok(res, messages.success, supply);
    } catch (err) {
      next(err);
    }
  },
  getSoldSumByRarity: async (req, res, next) => {
    try {
      const rarity = req.params.rarity;
      let sold = 0;
      let nfts = await crudService.getList();
      nfts.forEach((nft) => {
        if (rarity === nft.rarity) {
          sold += nft.sold;
        }
      });
      return utils.apiResponse.ok(res, messages.success, sold);
    } catch (err) {
      next(err);
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = {};
      const nfts = await crudService.getList();
      nfts.forEach(nft => {
        nft.attributes.forEach(attribute => {
          if (attribute.trait_type === "Category") {
            if (categories[attribute.value]) {
              categories[attribute.value] = categories[attribute.value] + 1
            } else {
              categories[attribute.value] = 1
            }
          }
        })
      })
      return utils.apiResponse.ok(res, messages.success, categories);
    } catch (err) {
      next(err);
    }
  },
  getNFTsByCategory: async (req, res, next) => {
    try {
      const category = req.params.category
      const allNFTs = await crudService.getList();
      const filteredNFTs = []
      allNFTs.forEach(nft => {
        nft.attributes.forEach(attribute => {
          if (attribute.trait_type === "Category") {
            if (attribute.value.toLowerCase() === category.toLowerCase()) {
              filteredNFTs.push(nft)
            }
          }
        })
      })
      return utils.apiResponse.ok(res, messages.success, filteredNFTs);
    } catch (err) {
      next(err);
    }
  },
  getArchitectures: async (req, res, next) => {
    try {
      const nfts = await crudService.getList();
      const architectures = []
      nfts.forEach(nft => {
        nft.attributes.forEach(attribute => {
          if (attribute.trait_type === "Type") {
            if (attribute.value === "Architecture") {
              architectures.push(nft)
            }
          }
        })
      })
      return utils.apiResponse.ok(res, messages.success, architectures);
    } catch (err) {
      next(err);
    }
  },
};
