import { decodeBasicAuth } from "../../../../lib/auth"
import AuthService from "../../../../modules/auth/services/authService"

export default async function handler(req, res) {
    const authService = await AuthService()
    if (req.method == 'POST') {
        const { email, password } = decodeBasicAuth(req.headers.authorization)
        const { name } = req.body
        await authService.createUser({ name, email, password})
        .then(() => res.status(204))
        .catch(err => {
            if (!err.displayMessage) {
                err.displayMessage = "Error creating account"
            }
            console.log(err)
            res.status(500)
            res.send(err)
        })
        .finally(() => {
            res.end()
        })
    } else if (req.method == 'GET') {
        const { email, password } = decodeBasicAuth(req.headers.authorization)
    } else {
        console.log("Method not allowed")
    }
}