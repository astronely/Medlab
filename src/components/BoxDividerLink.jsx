import "./styles/components.scss"
import "./styles/about.scss"
import {useMediaQuery} from "react-responsive";

export default function BoxDividerLink({isDivider = true, dividerUpper = true, links}) {

    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    return (
        <>
            <div className="about__label">
                {
                    !isMobile ? isDivider ?
                            (dividerUpper ? <div className="about__divider-upper"/> :
                                <div className="about__divider-lower"/>)
                            : <></>
                        : <></>
                }
                <div className="about__label-links">
                    {links.map((link, index) => (
                        <a className="about__link" key={index}>{link.text}</a>
                    ))}
                </div>
            </div>
        </>
    )
}