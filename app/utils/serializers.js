export function serializeFilter(filter = {}) {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    params.set(`filter[${key}]`, value);
  });

  return params.toString();
}

export const truncateText = (text, size = 250) => {
  return text.length > size ? text.slice(0, size) + "..." : text;
};
