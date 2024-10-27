import styles from "../styles/social.module.scss"
export default function SocialLink({picture, text, type}) {

    const onClickEmail = (text) => {
        navigator.clipboard.writeText(text).catch(err => console.log(err))
    }

    return (
        <div className={styles.link}>
            <img src={picture} alt={"Footer link icon"}/>
            {
                type === "email" || "whatsapp" ?
                <span><a className={styles.link} style={{cursor: "pointer"}} onClick={() => onClickEmail(text)}>{text}</a></span>
                : type === "phone" ?
                        <span><a className={styles.link} href={`tel:${text}`}>{text}</a></span>
                    :
                        <span><a className={styles.link} href={`https://${text}`}>{text}</a></span>
            }
        </div>
    )
}