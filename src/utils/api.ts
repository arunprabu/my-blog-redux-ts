export async function callApi(method: string, url: string, data?: any) {
  const res = await fetch( url, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}