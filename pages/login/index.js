import Link from "next/link"
import { useState } from "react"
import Layout from "../../components/shared/layout/layout"
import styles from "./login.module.scss"

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    async function submit(e) {
        e.preventDefault()
        if (!email || !password) {
            alert("Missing required fields")
            return false
        }

        fetch(`/api/auth/user`, {
            method: 'GET',
            headers: {
                'Authorization': basicAuth(email, password),
                'Content-Type': "application/json"
            }
        })
    }

    return (
        <Layout>
            <div className={styles.login}>
                <form>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                </form>
                <Link href="/account/new">Create an account</Link>
            </div>
        </Layout>
    )
}