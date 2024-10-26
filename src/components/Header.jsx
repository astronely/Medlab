import {Container} from "react-bootstrap";
import styles from "./styles/header.module.scss"
import "./styles/header.scss"
import "./styles/headerMedia.scss"
import CityPicture from "/src/assets/about-us/nav/house.svg"
import Envelope from "/src/assets/envelope.svg"
import Toggle from "/src/assets/toggle.svg"
import Logo from "./ui/Logo.jsx"
import Button from "./ui/Button.jsx"
import {useModal} from "../hooks/useModal.js";
import {openModal} from "../utils/modalUtils.js";
import {useApp} from "../hooks/useApp.js";
import {Link} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useState} from "react";

export default function Header() {
    const {setIsActive, setModal} = useModal();
    const {currentCity} = useApp();
    const [isCollapsedLinksOpen, setIsCollapsedLinksOpen] = useState(false);

    const feedbackModalName = "feedback";
    const cityModalName = "chooseCity";

    const isXl = useMediaQuery({minWidth: 1200});
    const isMd = useMediaQuery({minWidth: 768});
    const isSm = useMediaQuery({minWidth: 0});

    const openCollapsedLinks = () => {
        setIsCollapsedLinksOpen(!isCollapsedLinksOpen);
    }

    return (
        <div className={styles.bg}>
            <Container className="header">
                {isMd ?
                    <>
                        <Logo isLink={true}/>
                        <div className="header__links">
                            <Link className="header__link" to="/about-us">О нас</Link>
                            <Link className="header__link" to="/prices">Цены</Link>
                            <Link className="header__link" to="/specialists">Специалисты</Link>
                            <Link className="header__link" to="/contacts">Контакты</Link>
                        </div>

                        <div className="header__right-buttons">
                            <div className="header__city"
                                 onClick={() => openModal(setIsActive, setModal, cityModalName)}>
                                <img src={CityPicture} alt="Picture of city"/>
                                <div className="header__city-text">{currentCity}</div>
                            </div>
                            {isXl ?
                                <Button onClickAction={() => openModal(setIsActive, setModal, feedbackModalName)}
                                        buttonText="Обратная связь"/>
                                : <img src={Envelope}
                                       onClick={() => openModal(setIsActive, setModal, feedbackModalName)}
                                       alt="Feedback Modal"/>
                            }
                        </div>
                    </>
                    :
                    <div className="header__collapse">
                        <div className="header__collapse-top">
                            <Logo isLink={true}/>
                            <div className="header__collapse-right">
                                <div className="header__city"
                                     onClick={() => openModal(setIsActive, setModal, cityModalName)}>
                                    <img src={CityPicture} alt="Picture of city"/>
                                    <div className="header__city-text">{currentCity}</div>
                                </div>
                                <img
                                    onClick={openCollapsedLinks}
                                    src={Toggle}
                                    alt="Toggle image"/>
                            </div>
                        </div>
                        <div className={`header__collapse-bottom ${isCollapsedLinksOpen ? "active" : "hidden"}`}>
                            <div className="header__links">
                                <Link className="header__link" to="/about-us">О нас</Link>
                                <Link className="header__link" to="/prices">Цены</Link>
                                <Link className="header__link" to="/specialists">Специалисты</Link>
                                <Link className="header__link" to="/contacts">Контакты</Link>
                            </div>
                            <Button className="header__collapse-button"
                                    onClickAction={() => openModal(setIsActive, setModal, feedbackModalName)}
                                    buttonText="Обратная связь"/>
                        </div>
                    </div>}

            </Container>
        </div>
    )
}