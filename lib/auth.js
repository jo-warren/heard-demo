import bcrypt from "bcryptjs"
import crypto from "crypto"

export function basicAuth(email, password) {
    return 'Basic ' + Buffer.from(`${email}:${password}`, "ascii").toString("base64")
}

export function decodeBasicAuth(authorization) {
    const decoded = Buffer.from(authorization.split(" ")[1], "base64").toString("ascii")
    const [email, password] = decoded.split(":")
    return { email, password }
}

export function isAuthenticated() {
    return true
}

export async function hashPassword(password) {
    const hash = await crypto.scryptSync(password, 'salt', 32)
    return encrypt(hash)
}

export function encrypt(key) {
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
    const encrypted = Buffer.concat([cipher.update(key), cipher.final()])

    return {
        iv: iv.toString("hex"),
        content: encrypted.toString("hex")
    }
}

export function decrypt(hash) {
    // const decipher = crypto.createDecipheriv("aes-256-gcm", hash, Buffer.from(hash.iv, "hex"))
    // const decrypted = Buffer.concat([decipher, update(Buffer.from(hash.content, "hex")), decipher.final()])
    // return decrypted.toString()
    return "decrypted password"
}