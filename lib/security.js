import crypto from "crypto"

export function standardHeaders() {
    return  new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json"
    })
}

export function signedRequest(method, data) {
    const headers = standardHeaders()
    headers.append("timestamp", new Date())
    headers.append("signature", createApiHash(headers.get("timestamp").toString() + process.env.API_KEY))

    return {
        method,
        headers,
        body: JSON.stringify(data)
    }
}

function createApiHash(message) {
    return crypto.createHmac("sha256", process.env.API_KEY).update(message).digest("hex")
}