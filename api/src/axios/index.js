const axios = require('axios');

const { API_BASE_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

module.exports = axiosInstance;