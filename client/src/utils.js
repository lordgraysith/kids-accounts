export function decimalChange (num, orig) {
  if (isNaN(num)) return orig
  const isBackspace = /\.\d$/.test(num.toString())
  if (isBackspace) return num / 10
  if (/\.\d{3}$/.test(num.toString())) return num * 10
  return num
}
