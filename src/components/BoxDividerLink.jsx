import "./styles/components.scss"
import "./styles/boxComponents.scss"
import { useMediaQuery } from "react-responsive";

export default function BoxDividerLink({isDivider = true, dividerUpper = true, links}) {

    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    return (
        <>
            <div className="label">
                {
                    !isMobile ? isDivider ?
                            (dividerUpper ? <div className="divider__upper"/> :
                                <div className="divider__lower"/>)
                            : <></>
                        : <></>
                }
                <div className="label__links">
                    {links.map((item, index) => (
                        <a className="label__link" href={item.link} key={index}>{item.name}</a>
                    ))}
                </div>
            </div>
        </>
    )
}