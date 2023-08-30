import axios from "axios";

export const openseaURL = "https://testnets-api.opensea.io/api/v1/";
export const openseaClient = axios.create({
  openseaURL,
});
