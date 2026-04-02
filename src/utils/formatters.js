export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function getSavedValue(key, fallback) {
  if (typeof window === 'undefined') return fallback

  const saved = localStorage.getItem(key)
  if (!saved) return fallback

  try {
    return JSON.parse(saved)
  } catch {
    return saved
  }
}
