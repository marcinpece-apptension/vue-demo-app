import axios from 'axios';

const baseUrl = 'https://sdw-wsrest.ecb.europa.eu/service/data/EXR/';

export const api = axios.create({
  baseURL: baseUrl,
  camelize: true,
});