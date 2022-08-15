export async function handleApiResponse(res) {
   if (res.ok) {
        if (res.status == 204) {
            return Promise.resolve()
        }
        if (res.headers.get('Content-Type')?.includes('text/html')) {
            return res.text()
        }
        if (res.headers.get('Content-Type')?.includes('application/octet-stream')) {
            return res.blob()
        }
        return res.json()
   } else {
        return Promise.reject(res)
   }
}