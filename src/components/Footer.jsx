import Logo from "./ui/Logo.jsx";
import SocialLink from "./ui/SocialLink.jsx";
import "./styles/footer.scss"
import Whatsapp from "/src/assets/contacts/footer/whatsapp.svg"
import VK from "/src/assets/contacts/footer/vk.svg"
import Phone from "/src/assets/contacts/footer/phone.svg"
import Envelope from "/src/assets/contacts/footer/envelope.svg"
import Copyright from "/src/assets/contacts/footer/copyright.svg"
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getCityInfo} from "../utils/getInfo.js";
import {useApp} from "../hooks/useApp.js";

export default function Footer() {
    const [cityData, setCityData] = useState({});
    const {currentCity} = useApp();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getCityInfo(currentCity);
            console.log("CITY DATA: ", fetchedData)
            setCityData(fetchedData[0]);
            // console.log("CITY DATA: ", cityData)
        }
        fetchData().catch(err => console.log(err))
    }, [currentCity])

    return (
        <Container>
            <div className="footer">
                <div className="footer__top">
                    <Logo />
                    <div className="footer__links">
                        <SocialLink picture={Whatsapp} text={`${cityData.phone}`} type={"whatsapp"}/>
                        <SocialLink picture={VK} text={`${cityData.vk}`} type={"vk"}/>
                        <SocialLink picture={Phone} text={`${cityData.phone}`} type={"phone"}/>
                        <SocialLink picture={Envelope} text={`${cityData.email}`} type={"email"}/>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="footer__bottom-wrap">
                        <div className="footer__bottom-copyright">
                            <img src={Copyright} alt="copyright symbol"/>
                            <span className="footer__boottom-text">Copyright 2024</span>
                        </div>
                        <a className="footer__bottom-text" href="/legal-info">Правовая информация</a>
                    </div>
                </div>
            </div>
        </Container>
    )
}