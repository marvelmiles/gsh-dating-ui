export const isProdMode = process.env.NODE_ENV === "production";

export const isObject = (obj) =>
  obj &&
  (typeof obj.toString === "function"
    ? obj.toString() === "[object Object]"
    : typeof obj === "object" && obj.length === undefined);

export const withMapObj = (obj = {}, map = {}, bool) => {
  let withMap;
  for (const key in obj) {
    if (
      // (map[key] !== "Medium password" || map[key] !== "Weak password") &&
      !!map[key] === bool
    ) {
      withMap = true;
      break;
    }
  }
  return withMap;
};

export function isScrolledToBottom(element) {
  // Check if element is valid
  if (!element) {
    return false;
  }

  const elementHeight = element.clientHeight;
  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;

  // Check if scrolled to bottom with a small buffer for potential rounding errors
  return scrollTop + elementHeight >= scrollHeight - 1;
}

export function isElementOverflowing(element) {
  // Check for overflow due to content exceeding element dimensions
  const hasScrollableContent = element.scrollHeight > element.clientHeight;

  // Account for overflow hidden style (hiding scrollbars even if content overflows)
  const overflowYStyle = window.getComputedStyle(element).overflowY;
  const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

  return hasScrollableContent && !isOverflowHidden;
}

export function isScrolledFromBottom(element, threshold = 80) {
  // Check if the element exists
  if (!element) return false;

  // Calculate the remaining scroll distance
  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight;
  const remainingScrollDistance = scrollHeight - (scrollTop + clientHeight);

  // Compare the remaining scroll distance with the threshold
  return remainingScrollDistance >= threshold;
}
