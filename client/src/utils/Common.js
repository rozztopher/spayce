import { rarityMap } from "./Constants";

export const compare = (a, b, order) => {
    if (order === "desc") {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
    } else if (order === "asc") {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      if (a.createdAt < b.createdAt) {
        return 1;
      }
    }
    return 0;
  }

export const getCategoryAttribute = (attributes) => {
  let category = "";
  attributes.forEach((attribute) => {
    if (attribute.trait_type === "Category") {
      category = attribute.value;
    }
  });
  return category;
};

export const getCollectionAttribute = (attributes) => {
  let collection = "";
  attributes.forEach((attribute) => {
    if (attribute.trait_type === "Collection") {
      collection = attribute.value;
    }
  });
  return collection;
};

export const getFrameAttribute = (attributes) => {
  let frames = 0;
  attributes.forEach((attribute) => {
    if (attribute.trait_type === "Frames") {
      frames = parseInt(attribute.value);
    }
  });
  return frames;
};

export const getRarityAttribute = (attributes) => {
  let rarity = "";
  attributes.forEach((attribute) => {
    if (attribute.trait_type === "Rarity") {
      rarity = attribute.value;
    }
  });
  return rarity;
};

export const getRarityColor = (attributes) => {
  let color = "6E6C7D";
  attributes.forEach((attribute) => {
    if (attribute.trait_type === "Rarity") {
      const rarity = attribute.value;
      color = rarityMap[rarity].color;
    }
  });
  return color;
};

export const getTypeAttribute = (attributes) => {
  let type = "";
  attributes.forEach((attribute) => {
    if (attribute.trait_type === "Type") {
      type = attribute.value;
    }
  });
  return type;
};
