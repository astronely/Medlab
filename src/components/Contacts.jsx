import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import InfoBox from "./InfoBox.jsx";
import DoubleInfoBox from "./DoubleInfoBox.jsx";
import Button from "./ui/Button.jsx";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import "./styles/contacts.scss"
import "./styles/contactsMedia.scss"

export default function Contacts() {

    const contactsInfo = {
        title: "Контакты",
        text: "Мы всегда рады помочь вам! Свяжитесь с нами любым удобным способом" +
            " или посетите наш офис по указанному адресу."
    }

    const addressInfo = {
        text: "Мы находимся по адресу: ул. Noname, №123"
    }

    const scheduleInfo = [
        {
            weekdays: "8:00-16:00",
            weekend: "10:00-14:00"
        },
        {
            weekdays: "8:00-12:00",
            weekend: "8:00-9:00"
        }
    ]

    const directorInfo = {
        email: "email@email.com",
        telephone: "+7 (999) 999 88 77"
    }

    return (
        <Container>
            <div className="contacts__container">
                <BoxDividerV info={contactsInfo}/>
                <div className="contacts__main-content">
                    <div className="contacts__info">
                        <InfoBox isAddress={true} info={addressInfo}/>
                        <DoubleInfoBox info={scheduleInfo}/>
                        <InfoBox isContacts={true} info={directorInfo}/>
                        <Button style={{fontSize: "2rem", borderRadius: "24px", padding: "20px"}} className="contacts__button" buttonText="Обратная связь"/>
                    </div>
                    <div className="contacts__map-container">
                        <YMaps>
                            <Map className="contacts__map"
                                 defaultState={{
                                     center: [54.984868, 57.688882],
                                     zoom: 16,
                                     controls: ["zoomControl"],
                                 }}
                                 modules={
                                     ["control.ZoomControl"]
                                 }>
                                <Placemark defaultGeometry={[54.984868, 57.688882]}/>
                            </Map>
                        </YMaps>
                    </div>
                </div>
            </div>
        </Container>
    )
}