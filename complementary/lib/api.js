const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

export async function post(path, body){
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  })
  return res.json()
}

export async function get(path){
  const res = await fetch(`${BASE}${path}`, { method: 'GET' })
  return res.json()
}
