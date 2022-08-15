import { hashPassword } from "../../../lib/auth"
import UserRepo from "../repo"
import bcrypt from "bcryptjs"

export default async function AuthService() {
    const userRepo = await UserRepo()

    return {
        createUser,
        login
    }

    async function createUser({ name, email, password }) {
        if (!name || !email || !password) {
            throw new Error("Missing required parameter(s)")
        }

        const userFound = await userRepo.findByEmail(email)
        if (userFound) {
            const message = "User already exists"
            const err = new Error(message)
            err.displayMessage = message
            throw err
        }

        await userRepo.insertOne(
            name,
            email,
            await hashPassword(password)
        )
    }

    async function login(email, password) {
        if (!email || !password) {
            throw new Error("Missing required parameter(s)")
        }

        const user = await userRepo.findByEmail(email)
        if (!user) {
            const err = new Error(`User not found ${email}`)
            err.displayMessage = "A user with that email does not exist"
            throw err
        }

        const encryptedPw = hashPassword(password)
        if (encryptedPw.iv == user.password_iv && encryptedPw.content == user.password_content) {
            return user
        }
    }
}