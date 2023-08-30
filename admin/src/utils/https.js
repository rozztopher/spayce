import axios from 'axios';

import config from '../config';

let http = axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
