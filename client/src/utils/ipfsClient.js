import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "https://ipfs.moralis.io:2053/ipfs/" : "https://ipfs.moralis.io:2053/ipfs/";

export const ipfsDirectoryClient = axios.create({
  baseURL,
});
