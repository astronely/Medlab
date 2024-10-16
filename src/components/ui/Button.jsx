import "../styles/components.scss"

export default function Button({buttonText, style= {}, className = ""}) {
    return(
        <button style={style} className={`main-button ${className}`}>{buttonText}</button>
    )
}