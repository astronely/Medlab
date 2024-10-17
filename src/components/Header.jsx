import {Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import styles from "./styles/header.module.scss"
import "./styles/header.scss"
import CityPicture from "/src/assets/about-us/nav/Vector.svg"
import Logo from "./ui/Logo.jsx"
import Button from "./ui/Button.jsx"
import {useModal} from "../hooks/useModal.js";
import {openModal} from "../utils/modalUtils.js";

export default function Header() {
    const {setIsActive, setModal} = useModal();
    const feedbackModalName = "feedback";

    return (
        <Navbar expand="lg" className={styles.bg}>
            <Container className="header">
                <NavbarBrand href="/"><Logo /></NavbarBrand>
                <Navbar.Collapse>
                    <Nav className="header__links">
                        <Nav.Link className="header__link" href="/about-us">О нас</Nav.Link>
                        <Nav.Link className="header__link" href="/prices">Цены</Nav.Link>
                        <Nav.Link className="header__link" href="#">Специалисты</Nav.Link>
                        <Nav.Link className="header__link" href="/contacts">Контакты</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="header__right-buttons" id="basic-nav">
                    <div className="header__city">
                        <img src={CityPicture} alt="Picture of city"/>
                        <Nav.Link className="header__city-text" href="#city">г. Сим</Nav.Link> {/* TODO: NavLink -> a */}
                    </div>
                    <Button onClickAction={() => openModal(setIsActive, setModal, feedbackModalName)} buttonText="Обратная связь"/>
                </Nav>
                <Navbar.Toggle/>
            </Container>
        </Navbar>
    )
}