import { connectToOracle } from "../../../lib/db"

export default async function UserRepo() {
    const db = await connectToOracle()

    return {
        findByEmail,
        insertOne
    }

    async function findByEmail(email) {
        const { rows } = await db.execute("SELECT * FROM users WHERE EMAIL=:email", [email])
        return rows.length > 0 ? rows[0] : null
    }

    async function insertOne(name, email, password) {
        const query = "INSERT INTO users VALUES (USERS_SEQ.nextval, :EMAIL, :PASSWORD_IV, :NAME, :PASSWORD_CONTENT)"
        const binds = [email, password.iv, name, password.content]
        return db.execute(query, binds, { autoCommit: true })
    }
}