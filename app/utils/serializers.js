export function createSearchParam(
  filter = {},
  searchParams = "",
  keyName = ""
) {
  const params = new URLSearchParams(`?${searchParams}`);

  const keys = Object.entries(filter);

  keys.forEach(([key, value]) => {
    params.set(keyName ? `${keyName}.${key}` : key, value);
  });

  if (keyName) {
    if (params.size && keys.length) params.set(`mandatory.${keyName}`, "true");
    else params.delete(`mandatory.${keyName}`);
  }

  return params.toString();
}

export const truncateText = (text, size = 250) => {
  return text.length > size ? text.slice(0, size) + "..." : text;
};
