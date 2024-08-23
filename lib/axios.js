import rootAxios from "axios";
// import { getCookie } from "../utils";
// import { COOKIE_REFRESH_TOKEN, COOKIE_ACCESS_TOKEN } from "../config/constants";
import { API_ENDPOINT, CLIENT_ENDPOINT } from "@/app/config/constants";

let isRefreshing = false;
let requestQueue = [];

export const getHttpErrMsg = (err) => {
  return err.response ? err.response.data : { message: err.message };
};

export const processQueue = (err, data) => {
  requestQueue.forEach((prom) => {
    if (err) prom.reject({ err, config: prom.requestConfig });
    else prom.resolve({ data, config: prom.requestConfig });
  });
  requestQueue = [];
};

export const replaceParam = (replace, key, value = "") => {
  return (
    window.location.search
      .toLowerCase()
      .replace(`&${replace}`, "")
      .replace(replace, "") + (value ? `&${key}=${value}` : "")
  );
};

export const createRelativeUrl = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("redirect")) return encodeURIComponent(params.get("redirect"));

  return encodeURIComponent(
    window.location.pathname +
      (window.location.search || "") +
      (window.location.hash || "")
  );
};

export const handleRefreshToken = (requestConfig) => {
  console.log("refreshing...");

  isRefreshing = true;

  return axios
    .get(`/auth/refresh-token`, {
      withCredentials: true,
    })
    .then((res) => {
      requestConfig && (requestConfig._refreshed = true);

      processQueue(null);

      return requestConfig ? axios.request(requestConfig) : res;
    })
    .catch((err) => {
      processQueue(err);

      window.location.href = `${CLIENT_ENDPOINT}/auth/login?redirect=${createRelativeUrl()}&timedout=true`;

      return Promise.reject(err);
    })
    .finally(() => {
      isRefreshing = false;
    });
};

const axios = rootAxios.create({
  baseURL: API_ENDPOINT,
});

axios.interceptors.request.use(function (config) {
  if (config.withCredentials || /delete|put|post|patch/.test(config.method)) {
    // config.headers["authorization"] = `Bearer ${getCookie(
    //   config.url.indexOf("auth/refresh-token") > -1
    //     ? COOKIE_REFRESH_TOKEN
    //     : COOKIE_ACCESS_TOKEN
    // )}`;

    config.withCredentials =
      config.withCredentials === undefined ? true : config.withCredentials;
  }

  config.withCredentials = true;

  const source = rootAxios.CancelToken.source(); // create new source token on every request

  config.cancelToken = source.token;

  return config;
});

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  async (err) => {
    const requestConfig = err.config;

    if (rootAxios.isCancel(err)) return Promise.reject(err);

    if (err.response?.status === 401) {
      console.log("in 401...");
      if (isRefreshing) {
        console.log("handle api in is refreshing....");
      } else if (requestConfig.withCredentials && !requestConfig._noRefresh)
        return handleRefreshToken(requestConfig);
    }

    return Promise.reject(getHttpErrMsg(err));
  }
);

export default axios;
