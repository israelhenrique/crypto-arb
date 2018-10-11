import { API } from "aws-amplify";

export const fetchCardsData = async (value) => {
  // const response = await fetch(`/dashboard?amount=${value}&currency=brl`)
  const result = await API.get("dashboard", '/dashboard', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
    queryStringParameters: {
      amount: value,
      currency: 'brl'
    }
  })
  // const result = await response.json()
  return result.map((card) => {
    const profitPercent = card.profitPercent - 1 // Api returns total amount after arbitrage, not just profit
    const profit = profitPercent * value
    return ({
      ...card,
      profit: profit,
      profitPercent: profit / value,
    })
  })
}
