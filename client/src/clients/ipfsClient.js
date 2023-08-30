import axios from "axios";

export const gatewayURL = "https://gateway.moralisipfs.com/ipfs/";
export const ipfsClient = axios.create({
  gatewayURL,
});
