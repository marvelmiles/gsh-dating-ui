const { isProdMode } = require("../utils/validators");

export const API_ENDPOINT = isProdMode
  ? "https://sgh-dating-api.glitch.me/api"
  : "http://localhost:10000/api";

export const CLIENT_ENDPOINT = isProdMode
  ? "https://sgh-dating-ui.vercel.app"
  : "http://localhost:3000";

export const EDIT_ACCESS_MSG = `
  Hi! It looks like this bio data isn't editable because you're currently logged in as a test user. To make changes, please log in with your regular account to have full access and control over your details.
  `;

export const interestedInList = ["Anyone", "Woman", "Couples", "Man"];

export const genderList = ["Both", "Male", "Female"];
