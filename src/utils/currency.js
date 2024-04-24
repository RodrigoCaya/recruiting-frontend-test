const exchangeRate = 950;

export const transformCurrency = (amount, currency) => {
  let clp = 0;
  let usd = 0;
  if (currency === 'USD') {
    usd = amount;
    clp = amount * exchangeRate;
  } else {
    clp = amount;
    usd = Math.round(amount / exchangeRate);
  }
  return '$' + clp + ' CLP ($' + usd + ' USD)';
}