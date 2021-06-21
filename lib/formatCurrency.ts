const formatCurrency = (data: number) => {
  return data.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export default formatCurrency;
