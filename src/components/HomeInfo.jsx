import {Container} from "react-bootstrap";
import './styles/home.scss'
import MediaQuery from "react-responsive";
import xxl from '/src/assets/content/main/img/child-xxl.png';
import xl from '/src/assets/content/main/img/child-xl.png';
import lg from '/src/assets/content/main/img/child-lg.png';
import md from '/src/assets/content/main/img/child-md.png';
import sm from '/src/assets/content/main/img/child-sm.png';

export default function HomeInfo() {

    // TODO: pictures from db

    return(
        <>
            <Container>
                <div className="home__main">
                    {/*xxl*/}
                    <MediaQuery minWidth={1400}>
                        <img className="home__picture" src={xxl} alt="Main picture"/>
                    </MediaQuery>

                    {/*xl*/}
                    <MediaQuery minWidth={1200} maxWidth={1399}>
                        <img className="home__picture" src={xl} alt="Main picture"/>
                    </MediaQuery>

                    {/*lg*/}
                    <MediaQuery minWidth={992} maxWidth={1199}>
                        <img className="home__picture" src={lg} alt="Main picture"/>
                    </MediaQuery>

                    {/*md*/}
                    <MediaQuery minWidth={768} maxWidth={991}>
                        <img className="home__picture" src={md} alt="Main picture"/>
                    </MediaQuery>

                    {/*sm*/}
                    <MediaQuery minWidth={576} maxWidth={767}>
                        <img className="home__picture" src={sm} alt="Main picture"/>
                    </MediaQuery>

                    {/*xs*/}
                    <MediaQuery minWidth={0} maxWidth={575}>
                        <img className="home__picture" src={sm} alt="Main picture"/>
                    </MediaQuery>
                </div>
            </Container>
        </>
    )
}