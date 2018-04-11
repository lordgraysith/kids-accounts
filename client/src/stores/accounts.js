export async function getKidWithAccounts (id) {
  const res = await fetch(`/api/kids/${id}/accounts`)
  return res.json()
}
export async function getKidAndAccount (kidId, accountId) {
  const res = await fetch(`/api/kids/${kidId}/accounts/${accountId}`)
  return res.json()
}
