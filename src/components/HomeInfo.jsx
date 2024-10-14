import {Container} from "react-bootstrap";
import MainPicture from "../assets/content/main/img/Child-xxl.png";
import './styles/home.scss'

export default function HomeInfo() {

    return(
        <>
            <Container>
                <div className="home__main">
                    <img src={MainPicture} alt="Main picture"/>
                </div>
            </Container>
        </>
    )
}