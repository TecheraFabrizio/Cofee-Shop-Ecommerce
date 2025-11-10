export function formatPrice(price) {
  const priceFormatted = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  return priceFormatted;
}