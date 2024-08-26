const { isProdMode } = require("../utils/validators");

export const API_ENDPOINT = isProdMode
  ? "https://sgh-dating-api.glitch.me/api"
  : "http://localhost:10000/api";

export const CLIENT_ENDPOINT = isProdMode
  ? "https://sgh-dating-ui.vercel.app"
  : "http://localhost:3000";
