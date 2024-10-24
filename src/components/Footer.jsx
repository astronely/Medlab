import Logo from "./ui/Logo.jsx";
import SocialLink from "./ui/SocialLink.jsx";
import "./styles/footer.scss"
import Whatsapp from "/src/assets/contacts/footer/whatsapp.svg"
import VK from "/src/assets/contacts/footer/vk.svg"
import Phone from "/src/assets/contacts/footer/phone.svg"
import Envelope from "/src/assets/contacts/footer/envelope.svg"
import Copyright from "/src/assets/contacts/footer/copyright.svg"
import {Container} from "react-bootstrap";

export default function Footer() {
    return (
        <Container>
            <div className="footer">
                <div className="footer__top">
                    <Logo />
                    <div className="footer__links">
                        <SocialLink picture={Whatsapp} text="Whatsapp"/>
                        <SocialLink picture={VK} text="VK"/>
                        <SocialLink picture={Phone} text="+7 (999) 999-99-99"/>
                        <SocialLink picture={Envelope} text="testbox@mail.com"/>
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