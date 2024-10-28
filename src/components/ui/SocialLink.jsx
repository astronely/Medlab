import styles from "../styles/social.module.scss"

export default function SocialLink({picture, text, type}) {

    const onClickEmail = (text) => {
        navigator.clipboard.writeText(text).catch(err => console.log(err))
    }
    // console.log(text.replace(/[^\d+]/g, ""))

    return (
        <div className={styles.link}>
            <img src={picture} alt={"Footer link icon"}/>
            {
                type === "email" ?
                    <span><a className={styles.link}
                             onClick={() => onClickEmail(text)}>{text}</a></span>
                    : type === "phone" ?
                        <span><a className={styles.link} href={`tel: ${text}`} >{text}</a></span>
                        : type === "whatsapp" ?
                            <span><a className={styles.link} href={`https://wa.me/${text.replace(/[^\d+]/g, "")}`} target={"_blank"} rel="noopener noreferrer">{text}</a></span>
                            :
                            <span><a className={styles.link} href={`https://${text}`} target={"_blank"} rel="noopener noreferrer">{text}</a></span>
            }
        </div>
    )
}