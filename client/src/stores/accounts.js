export async function getKidWithAccounts (id) {
  const res = await fetch(`/api/kids/${id}/accounts`)
  return res.json()
}
