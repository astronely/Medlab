import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./styles/home.scss"
import MainPicture from "/src/assets/content/main/img/Child-xxl.png"
import {Container} from "react-bootstrap";
export default function Home() {

    return (
        <Container>
            <Header />
            <div className="home__main">
                <img src={MainPicture} alt="Main picture"/>
            </div>
            <Footer />
        </Container>
    )
}