export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function formatToCurrency(value) {
  // Use Intl.NumberFormat for currency formatting
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Ensures two decimal places
    maximumFractionDigits: 2,
  });

  // Format the value to currency
  return formatter.format(value);
}
