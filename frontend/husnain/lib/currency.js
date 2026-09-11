// Currency formatting utility for PKR
export const CURRENCY = 'Rs.';

export function formatPrice(amount) {
  if (amount === undefined || amount === null) return `${CURRENCY} 0`;
  return `${CURRENCY} ${Number(amount).toLocaleString()}`;
}
