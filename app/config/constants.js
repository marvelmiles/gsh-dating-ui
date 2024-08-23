const { isProdMode } = require("../utils/validators");

export const API_ENDPOINT = isProdMode ? "" : "http://localhost:10000/api";

export const CLIENT_ENDPOINT = "http://localhost:3000";
