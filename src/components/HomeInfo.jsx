import {Container} from "react-bootstrap";
import './styles/home.scss'
import MediaQuery from "react-responsive";
import xxl from '/src/assets/content/main/img/child-xxl.png';
import xl from '/src/assets/content/main/img/child-xl.png';
import lg from '/src/assets/content/main/img/child-lg.png';
import md from '/src/assets/content/main/img/child-md.png';
import sm from '/src/assets/content/main/img/child-sm.png';
import {useEffect, useState} from "react";
import {getPictures} from "../utils/getInfo.js";

export default function HomeInfo() {
    const [pictures, setPictures] = useState({});

    const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    const getPicture = (pictureName) => {
        return `${serverAddress}/assets/commonPicture/${pictureName}`
    }
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getPictures();
            setPictures(fetchedData);
            console.log(pictures)
        }
        fetchData().catch(err => console.log(err))
    }, [])

    return(
        <>
            <Container>
                <div className="home__main">
                    {/*xxl*/}
                    <MediaQuery minWidth={1400}>
                        <img className="home__picture" src={getPicture(pictures.xxl) ? getPicture(pictures.xxl) : xxl} alt="Main picture"/>
                    </MediaQuery>

                    {/*xl*/}
                    <MediaQuery minWidth={1200} maxWidth={1399}>
                        <img className="home__picture" src={getPicture(pictures.xl) ? getPicture(pictures.xl) : xl} alt="Main picture"/>
                    </MediaQuery>

                    {/*lg*/}
                    <MediaQuery minWidth={992} maxWidth={1199}>
                        <img className="home__picture" src={getPicture(pictures.lg) ? getPicture(pictures.lg) : lg} alt="Main picture"/>
                    </MediaQuery>

                    {/*md*/}
                    <MediaQuery minWidth={768} maxWidth={991}>
                        <img className="home__picture" src={getPicture(pictures.md) ? getPicture(pictures.md) : md} alt="Main picture"/>
                    </MediaQuery>

                    {/*sm*/}
                    <MediaQuery minWidth={576} maxWidth={767}>
                        <img className="home__picture" src={getPicture(pictures.sm) ? getPicture(pictures.sm) : sm} alt="Main picture"/>
                    </MediaQuery>

                    {/*xs*/}
                    <MediaQuery minWidth={0} maxWidth={575}>
                        <img className="home__picture" src={getPicture(pictures.sm) ? getPicture(pictures.sm) : sm} alt="Main picture"/>
                    </MediaQuery>
                </div>
            </Container>
        </>
    )
}