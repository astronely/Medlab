import "../styles/components.scss"

export default function Button({buttonText, style= {}}) {
    return(
        <button style={style} className="main-button">{buttonText}</button>
    )
}