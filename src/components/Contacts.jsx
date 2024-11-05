import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import InfoBox from "./InfoBox.jsx";
import DoubleInfoBox from "./DoubleInfoBox.jsx";
import Button from "./ui/Button.jsx";
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import "./styles/contacts.scss"
import "./styles/contactsMedia.scss"
import {openModal} from "../utils/modalUtils.js";
import {useModal} from "../hooks/useModal.js";
import {useEffect, useState} from "react";
import {useApp} from "../hooks/useApp.js";
import {getCityInfo} from "../utils/getInfo.js";

export default function Contacts() {

    const {setIsActive, setModal} = useModal();
    const {currentCity} = useApp();
    const feedbackModalName = "feedback";

    const [addressInfo, setAddressInfo] = useState("Placeholder for address"); // TODO: address from db
    const [scheduleInfo, setScheduleInfo] = useState([
        {
            weekdays: "",
            weekend: ""
        },
        {
            weekdays: "",
            weekend: ""
        }
    ]);
    const [coordinates, setCoordinates] = useState([54.984868, 57.688882]); // TODO: director info from db

    const contactsInfo = {
        title: "Контакты",
        text: "Мы всегда рады помочь вам! Свяжитесь с нами любым удобным способом" +
            " или посетите наш офис по указанному адресу."
    }

    const directorInfo = {
        email: "medlab74@mail.ru",
        telephone: "+7 (951) 489-53-62"
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCityInfo(currentCity.replace("г. ", ""));
            const data = res[0];

            setAddressInfo({text: res[0].address})

            const coords = data.coordinates.trim().split(";");
            setCoordinates([parseFloat(coords[0]), parseFloat(coords[1])])
            const rawScheduleGive = data.bio_give.trim().split(";");
            const rawScheduleGet = data.bio_get.trim().split(";");
            setScheduleInfo([
                {
                    weekdays: rawScheduleGive[0],
                    weekend: rawScheduleGive[1],
                },
                {
                    weekdays: rawScheduleGet[0],
                    weekend: rawScheduleGet[1],
                }
            ])
        }
        fetchData().catch(err => {
            console.log(err)
            setScheduleInfo([
                {
                    weekdays: "",
                    weekend: ""
                },
                {
                    weekdays: "",
                    weekend: ""
                }
            ])
            setCoordinates([54.984868, 57.688882])
            setAddressInfo({text: "Placeholder"})
        });
    }, [currentCity])

    return (
        <Container>
            <div className="contacts__container">
                <BoxDividerV info={contactsInfo}/>
                <div className="contacts__main-content">
                    <div className="contacts__info">
                        <InfoBox isAddress={true} info={addressInfo}/>
                        <DoubleInfoBox info={scheduleInfo}/>
                        <InfoBox isContacts={true} info={directorInfo}/>
                        <Button
                            onClickAction={() => openModal(setIsActive, setModal, feedbackModalName)}
                            style={{fontSize: "2rem", borderRadius: "24px", padding: "20px"}}
                            className="contacts__button" buttonText="Обратная связь"/>
                    </div>
                    <div className="contacts__map-container">
                        <YMaps>
                            <Map className="contacts__map"
                                 defaultState={{
                                     center: [coordinates[0], coordinates[1]],
                                     zoom: 16,
                                     controls: ["zoomControl"],
                                 }}
                                 modules={
                                     ["control.ZoomControl"]
                                 }>
                                <Placemark defaultGeometry={[coordinates[0], coordinates[1]]}/>
                            </Map>
                        </YMaps>
                    </div>
                </div>
            </div>
        </Container>
    )
}