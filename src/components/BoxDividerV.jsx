import "./styles/components.scss"
import "./styles/about.scss"
import "./styles/aboutMedia.scss"
import { useMediaQuery } from 'react-responsive';

export default function BoxDividerV(
    {
        isDivider = true, isTitle = true, isText = true,
        info, style = {}, dividerUpper = true
    }) {

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
                {/*{isDivider ?*/}
                {/*    (dividerUpper ? <div className="about__divider-upper"/> :*/}
                {/*        <div className="about__divider-lower"/>)*/}
                {/*    : <></>}*/}
                <div className="about__label-content">
                    {isTitle ? <h2>{info.title}</h2> : <></>}
                    {isText ? <span style={style}>{info.text}</span> : <></>}
                </div>
            </div>
        </>
    )
}