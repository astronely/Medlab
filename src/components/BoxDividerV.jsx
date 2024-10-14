import "./styles/components.scss"
import "./styles/about.scss"

export default function BoxDividerV({isDivider = true, isTitle = true, isText = true, info}) {

    return (
        <>
            <div className="about__label">
                {isDivider ? <div className="about__divider"/> : <></>}
                <div className="about__label-content">
                    {isTitle ? <h2>{info.title}</h2> : <></>}
                    {isText ? <span>{info.text}</span> : <></>}
                </div>
            </div>
        </>
    )
}