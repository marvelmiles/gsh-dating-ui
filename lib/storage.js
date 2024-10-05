export const cacheData = (key, data) => {
  const v = JSON.stringify(
    typeof data === "string"
      ? data
      : {
          ...getCacheData(key),
          ...data,
        }
  );

  localStorage.setItem(key, v);
};

export const getCacheData = (key, fb = {}) => {
  const d = localStorage.getItem(key);
  return d ? JSON.parse(d) : fb;
};

export const removeCache = (key) => {
  localStorage.removeItem(key);
};

export const clearProfileDataCache = () => {
  for (const key of [
    "profileData",
    "profileDataRates",
    "profileDataRatesCurrency",
    "profileDataTimezone",
  ]) {
    removeCache(key);
  }
};

export const clearSessionCache = () => {
  clearProfileDataCache();
};
