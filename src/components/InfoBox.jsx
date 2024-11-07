import "./styles/infobox.scss"
import {useAnimateOnMount} from "./../hooks/useAnimateOnMount.js";
export default function InfoBox({
                                    isAddress = false, isSchedule = false,
                                    isContacts = false, isTests = false, info
                                }) {
    const isActive = useAnimateOnMount();

    return (
        <div className={`infobox__container ${isActive ? 'active' : ''}`}>
            {isAddress ?
                <div className="infobox__info">
                    <div className="infobox__title">Адрес:</div>
                    <div className="infobox__text">
                        Мы находимся по адресу:
                        <br/>{info.text}
                    </div>
                </div>
                : isSchedule ?
                    <div className="infobox__info">
                        <div className="infobox__title">{isTests ? "Прием анализов:" : "График работы:"}</div>
                        <div className="infobox__text">{info.weekdays} <b>пн-пт</b></div>
                        <div className="infobox__text">{info.weekend} <b>сб-вс</b></div>
                    </div>
                    : isContacts ?
                        <div className="infobox__info">
                            <div className="infobox__title">Ген. директор MedLab</div>
                            <div className="infobox__text">Почта: {info.email}</div>
                            <div className="infobox__text">Номер: {info.telephone}</div>
                        </div>
                        : <></>}
        </div>
    )
}