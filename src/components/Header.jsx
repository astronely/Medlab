import {Container, Nav, Navbar} from "react-bootstrap";
import styles from "./styles/header.module.scss"
import "./styles/header.scss"
import CityPicture from "/src/assets/about-us/nav/Vector.svg"
import Logo from "./ui/Logo.jsx"
import Button from "./ui/Button.jsx"

export default function Header() {

    return (
        <Navbar expand="lg" className={styles.bg}>
            <Container className="header">
                <Nav><Logo /></Nav>
                <Navbar.Collapse>
                    <Nav className="header__links">
                        <Nav.Link className="header__link" href="#">О нас</Nav.Link>
                        <Nav.Link className="header__link" href="#">Цены</Nav.Link>
                        <Nav.Link className="header__link" href="#">Специалисты</Nav.Link>
                        <Nav.Link className="header__link" href="#">Контакты</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="header__right-buttons" id="basic-nav">
                    <div className="header__city">
                        <img src={CityPicture} />
                        <Nav.Link className="header__city-text" href="#city">г. Сим</Nav.Link> {/* TODO: NavLink -> a */}
                    </div>
                    <Button buttonText="Обратная связь"/>
                </Nav>
                <Navbar.Toggle/>
            </Container>
        </Navbar>
    )
}