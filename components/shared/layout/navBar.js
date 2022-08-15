import Image from "next/image"
import styles from "./navBar.module.scss"

export default function NavBar() {
    return (
        <div className={styles.nav}>
            <Image 
                src="/images/logo.svg" 
                width={88} 
                height={25}
                alt="logo">
            </Image>
        </div>
    )
}