import dbClient from "../clients/dbClient";

export const addSpace = async (id, user) => {
  try {
    await dbClient.post(
      "/api/v1/users/addSpace/" + id,
      { user: user },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
  } catch (error) {
    console.log("Adding space to user error", error);
  }
};

export const createSpace = async (space) => {
  try {
    const response = await dbClient.post("/api/v1/space/createSpace", space, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Creating space error", error);
  }
};

export const getAlNFTs = async () => {
  try {
    const response = await dbClient.get("/api/v1/nft/getAllNfts/", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET all NFTs", error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await dbClient.get("/api/v1/nft/getCategories", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("save profile settings--- error", error);
  }
};

export const getArchitectures = async () => {
  try {
    const response = await dbClient.get("/api/v1/nft/getArchitectures", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("save profile settings--- error", error);
  }
};

export const getNFTByToken = async (id) => {
  try {
    const response = await dbClient.get("/api/v1/nft/getNftByToken/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET NFT by id", error);
  }
};

export const getNFTBySearch = async (term) => {
  try {
    const response = await dbClient.get("/api/v1/nft/getNFTBySearch/" + term, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET NFT by search", error);
  }
};

export const getNFTsByCategory = async (category) => {
  try {
    const response = await dbClient.get(
      "/api/v1/nft/getNFTsByCategory/" + category,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("GET NFTs by category", error);
  }
};

export const getNFTCount = async () => {
  try {
    const response = await dbClient.get("/api/v1/nft/getNFTCount", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET nft count", error);
  }
};

export const getNFTCountByRarity = async (rarity) => {
  try {
    const response = await dbClient.get(
      "/api/v1/nft/getNFTCountByRarity/" + rarity,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("GET nft count by rarity", error);
  }
};

export const getNFTSoldSum = async () => {
  try {
    const response = await dbClient.get("/api/v1/nft/getSoldSum", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET nft sold sum", error);
  }
};

export const getNFTSoldSumByRarity = async (rarity) => {
  try {
    const response = await dbClient.get(
      "/api/v1/nft/getSoldSumByRarity/" + rarity,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("save profile settings--- error", error);
  }
};

export const getNumberOfSpaces = async () => {
  try {
    const response = await dbClient.get("/api/v1/space/getNumberOfSpaces", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("get space by id", error);
  }
};

export const getSpaceById = async (spayceID) => {
  try {
    const response = await dbClient.get("/api/v1/space/getSpace/" + spayceID, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET space by id", error);
  }
};

export const getSpaceBySearch = async (term) => {
  try {
    const response = await dbClient.get(
      "/api/v1/space/getSpaceBySearch/" + term,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("GET space by search", error);
  }
};

export const getSpacesByViews = async () => {
  try {
    const response = await dbClient.get("/api/v1/space/getSpacesbyViews", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET spaces by views", error);
  }
};

export const getUserByCustomURL = async (url) => {
  try {
    const response = await dbClient.get(
      "/api/v1/users/getUserByCustomURL/" + url,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("GET user by custom url", error);
  }
};

export const getUserBySearch = async (term) => {
  try {
    const response = await dbClient.get(
      "/api/v1/users/getUserBySearch/" + term,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("GET user by search", error);
  }
};

export const getUserById = async (userID) => {
  try {
    const response = await dbClient.get("/api/v1/users/getUserById/" + userID, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("GET user by id", error);
  }
};

export const incrementViews = async (spayceID) => {
  try {
    await dbClient.put("/api/v1/space/incrementViews/" + spayceID, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
  } catch (error) {
    console.log("Increment views", error);
  }
};

export const incrementShares = async (spayceID) => {
  try {
    await dbClient.put("/api/v1/space/incrementShares/" + spayceID, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
  } catch (error) {
    console.log("Increment shares", error);
  }
};

export const login = async (user) => {
  try {
    const response = await dbClient.post("/api/v1/users/auth/login", user, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.data;
  } catch (error) {
    console.log("login--- error", error);
  }
};

export const updateSpace = async (spaceID, space) => {
  try {
    await dbClient.put("/api/v1/space/updateSpace/" + spaceID, space, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
  } catch (error) {
    console.log("PUT space", error);
  }
};

export const updateUser = async (userID, user) => {
  try {
    const response = await dbClient.put(
      "/api/v1/users/updateUser/" + userID,
      user,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("PUT user", error);
  }
};
