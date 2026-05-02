 export function getStockStatus(stock: number) {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 5) return 'low-stock';
  return null;
}