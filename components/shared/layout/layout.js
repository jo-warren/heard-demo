import NavBar from "./navBar"
import styles from "./layout.module.scss"

export default function Layout({children}) {
    return (
    <div className={styles.layout}>
        <NavBar />
        {children}
    </div>
    )
}