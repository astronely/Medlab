import "../styles/components.scss"

export default function Button({buttonText, style= {}, className = "", onClickAction}) {

    return(
        <button onClick={onClickAction} style={style} className={`main-button ${className}`}>{buttonText}</button>
    )
}