import https from "../utils/https";
import config from "../config";

export const createNFT = async (body) => {
  const attributes = [
    {
      trait_type: "Category",
      value: body.category,
    },
    {
      trait_type: "Collection",
      value: body.edition,
    },
    {
      trait_type: "Rarity",
      value: body.rarity,
    },
    {
      trait_type: "Type",
      value: body.type,
    },
  ];
  if (body.type === "Architecture") {
    attributes.push({ trait_type: "Frames", value: body.frames });
  }
  delete body.category;
  delete body.edition;
  delete body.rarity;
  delete body.type;
  body.attributes = attributes;
  let url = config.baseURI + "/nft/auth/addNft";

  try {
    const response = await https.post(url, body);
    return response;
  } catch (error) {
    throw error;
  }
};
