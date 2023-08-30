import { openseaURL } from "../clients/openseaClient";
import axios from "axios";

export const getAllNFTs = async (owner) => {
  let offset = 0;
  const nfts = await axios.get(
    openseaURL + `assets/?owner=${owner}&offset=${offset}&limit=50`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return nfts.data.assets;
};
