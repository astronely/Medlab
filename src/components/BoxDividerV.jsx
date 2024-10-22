import "./styles/components.scss"
import "./styles/boxComponents.scss"
import { useMediaQuery } from 'react-responsive';

export default function BoxDividerV(
    {
        isDivider = true, isTitle = true, isText = true,
        info, style = {}, dividerUpper = true
    }) {

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
                <div className="label__content">
                    {isTitle ? <h2>{info.title}</h2> : <></>}
                    {isText ? <span style={style}>{info.text}</span> : <></>}
                </div>
            </div>
        </>
    )
}