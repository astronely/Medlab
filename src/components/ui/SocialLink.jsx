import styles from "../styles/social.module.scss"
export default function SocialLink({picture, text}) {

    return (
        <div className={styles.link}>
            <img src={picture} />
            <span>{text}</span>
        </div>
    )
}