const TRANSACTIONS_API_URL =
  import.meta.env.VITE_TRANSACTIONS_API_URL ||
  'https://69ce594e33a09f831b7d570e.mockapi.io/api/v1/Transactions'

function toSafeDateOnly(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10)
  }

  return parsed.toISOString().slice(0, 10)
}

function toNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}


function mapApiTransactionToUi(item) {
  const normalizedType = item.Type ? 'income' : 'expense'
  const normalizedAmount = Math.abs(toNumber(item.Amount))

  return {
    id: String(item.id),
    date: toSafeDateOnly(item.createdAt),
    description: item.Description || 'Untitled transaction',
    amount: normalizedAmount,
    category: item.Category || 'Uncategorized',
    type: normalizedType,
  }
}

function mapUiTransactionToApiPayload(payload) {
  const createdAt = new Date(`${payload.date}T00:00:00`).toISOString()

  return {
    createdAt,
    Description: payload.description,
    Category: payload.category,
    Type: payload.type === 'income',
    Amount: String(Math.abs(toNumber(payload.amount))),
  }
}

async function request(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function fetchTransactions() {
  const records = await request(`${TRANSACTIONS_API_URL}?sortBy=createdAt&order=desc`, {
    method: 'GET',
  })

  if (!Array.isArray(records)) {
    throw new Error('Unexpected API response for transactions')
  }

  return records.map(mapApiTransactionToUi)
}

export async function createTransaction(payload) {
  const created = await request(TRANSACTIONS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(mapUiTransactionToApiPayload(payload)),
  })

  return mapApiTransactionToUi(created)
}

export async function updateTransaction(transactionId, payload) {
  const updated = await request(`${TRANSACTIONS_API_URL}/${transactionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ...mapUiTransactionToApiPayload(payload),
      id: String(transactionId),
    }),
  })

  return mapApiTransactionToUi(updated)
}

export async function deleteTransaction(transactionId) {
  await request(`${TRANSACTIONS_API_URL}/${transactionId}`, {
    method: 'DELETE',
  })

  return String(transactionId)
}
