export const formatCurrency = (number) => {
  const price = Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
  return price;
};
