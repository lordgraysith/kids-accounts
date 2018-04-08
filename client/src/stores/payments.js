export async function makePayment (kidId, amount, description) {
  const res = await fetch('/api/payments/', {
    body: JSON.stringify({
      kidId,
      amount,
      description
    }),
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  return await res.json()
}
