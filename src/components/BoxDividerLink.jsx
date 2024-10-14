import "./styles/components.scss"
import "./styles/about.scss"

export default function BoxDividerLink({links}) {

    return (
        <>
            <div className="about__label">
                <div className="about__divider"/>
                <div className="about__label-links">
                    {links.map((link, index) => (
                        <a className="about__link" key={index}>{link.text}</a>
                    ))}
                </div>
            </div>
        </>
    )
}