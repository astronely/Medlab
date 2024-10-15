import {Container} from "react-bootstrap";
import './styles/home.scss'
import MediaQuery from "react-responsive";

export default function HomeInfo() {

    return(
        <>
            <Container>
                <div className="home__main">
                    {/*xxl*/}
                    <MediaQuery minWidth={1400}>
                        <img className="home__picture" src={'/src/assets/content/main/img/Child-xxl.png'} alt="Main picture"/>
                    </MediaQuery>

                    {/*xl*/}
                    <MediaQuery minWidth={1200} maxWidth={1399}>
                        <img className="home__picture" src={'/src/assets/content/main/img/Child-xl.png'} alt="Main picture"/>
                    </MediaQuery>

                    {/*lg*/}
                    <MediaQuery minWidth={992} maxWidth={1199}>
                        <img className="home__picture" src={'/src/assets/content/main/img/Child-lg.png'} alt="Main picture"/>
                    </MediaQuery>

                    {/*md*/}
                    <MediaQuery minWidth={768} maxWidth={991}>
                        <img className="home__picture" src={'/src/assets/content/main/img/Child-md.png'} alt="Main picture"/>
                    </MediaQuery>

                    {/*sm*/}
                    <MediaQuery minWidth={576} maxWidth={767}>
                        <img className="home__picture" src={'/src/assets/content/main/img/Child-sm.png'} alt="Main picture"/>
                    </MediaQuery>

                    {/*xs*/}
                    <MediaQuery minWidth={0} maxWidth={575}>
                        <img className="home__picture" src={'/src/assets/content/main/img/Child-xs.png'} alt="Main picture"/>
                    </MediaQuery>
                </div>
            </Container>
        </>
    )
}