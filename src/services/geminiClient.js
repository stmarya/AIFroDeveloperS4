const axios = require("axios");

const client = axios.create({
  baseURL: process.env.GEMINI_API_URL,
  params: {
    key: process.env.GEMINI_API_KEY, // API key via query param
  },
  headers: {
    "Content-Type": "application/json", // no Authorization header
  },
  timeout: 15000,
});

// Optional: request/response logging
client.interceptors.request.use((req) => {
  console.log(
    `→ ${req.method.toUpperCase()} ${req.baseURL}${req.url}`,
    req.data
  );
  return req;
});
client.interceptors.response.use(
  (res) => {
    console.log(`← ${res.status} ${res.config.url}`);
    return res;
  },
  (err) => {
    console.error(err.response?.data || err.message);
    return Promise.reject(err);
  }
);

module.exports = client;
