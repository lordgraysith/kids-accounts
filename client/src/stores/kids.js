export async function getKidById (id) {
  const res = await fetch(`/api/kids/${id}`)
  return res.json()
}

export async function getAllKids () {
  const res = await fetch('/api/kids')
  return res.json()
}
