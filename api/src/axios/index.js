const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
})

module.exports = axiosInstance;
