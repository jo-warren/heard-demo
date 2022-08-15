import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../../components/shared/layout/layout"
import { basicAuth } from "../../../lib/auth"
import { handleApiResponse } from "../../../lib/utils"
import styles from "./new.module.scss"

export default function NewAccount() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirm, setConfirm] = useState()
    const router = useRouter()

    async function submit(e) {
        e.preventDefault()
        if (confirm !== password) {
            alert("Passwords do not match")
            return false
        }

        if (!name || !email || !password || !confirm) {
            alert("Missing required fields")
            return false
        }

        fetch(`/api/auth/user`, {
            method: 'POST',
            headers: {
                'Authorization': basicAuth(email, password),
                'Content-Type': "application/json"
            },
            body: JSON.stringify({name})
        })
        .then(handleApiResponse)
        .then(() => router.push("/"))
        .catch(err => alert(err.displayMessage))
    }

    return (
        <Layout>
            <div className={styles.login}>
                <form onSubmit={submit}>
                    <div className={styles.field}>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required></input>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required></input>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="confirm">Confirm Password</label>
                        <input id="confirm" type="password" onChange={(e) => setConfirm(e.target.value)} required></input>
                    </div>
                    <input type="submit" />
                </form>
                <div>Already have an account? <Link href="/login">Login</Link></div>
            </div>
        </Layout>
    )
}