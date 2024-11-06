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
    const [pictures, setPictures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`

    const getPicture = (pictureName) => {
        return `${serverAddress}/mdlbassets/commonPicture/${pictureName}`
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getPictures();
            setPictures([]);
            for (let item in fetchedData) {
                if (item === "id") continue;
                // console.log(item, fetchedData[item])
                setPictures(pictures => [...pictures,
                    <img className="home__picture" src={fetchedData[item] ? getPicture(fetchedData[item]) : xxl}
                         alt="Main picture"/>])
            }
            // console.log(pictures)
            setIsLoading(false);
        }

        fetchData().catch(err => console.log(err))
    }, [])

    return (
        <>
            <Container>
                {isLoading ? <> </> :
                    <div className="home__main">
                        {/*xxl*/}
                        <MediaQuery minWidth={1400}>
                            {pictures[0] ? pictures[0] : <img className="home__picture"
                                                              src={xxl}
                                                              alt="Main picture"/>}
                            {/*<img className="home__picture" src={pictures[0]}*/}
                            {/*     alt="Main picture"/>*/}
                        </MediaQuery>

                        {/*xl*/}
                        <MediaQuery minWidth={1200} maxWidth={1399}>
                            {pictures[1] ? pictures[1] : <img className="home__picture"
                                                              src={xl}
                                                              alt="Main picture"/>}
                            {/*<img className="home__picture" src={pictures.xl ? getPicture(pictures.xl) : xl}*/}
                            {/*     alt="Main picture"/>*/}
                        </MediaQuery>

                        {/*lg*/}
                        <MediaQuery minWidth={992} maxWidth={1199}>
                            {pictures[2] ? pictures[2] : <img className="home__picture"
                                                              src={lg}
                                                              alt="Main picture"/>}
                            {/*<img className="home__picture" src={pictures.lg ? getPicture(pictures.lg) : lg}*/}
                            {/*     alt="Main picture"/>*/}
                        </MediaQuery>

                        {/*md*/}
                        <MediaQuery minWidth={768} maxWidth={991}>
                            {pictures[3] ? pictures[3] : <img className="home__picture"
                                                              src={md}
                                                              alt="Main picture"/>}
                            {/*<img className="home__picture" src={pictures.md ? getPicture(pictures.md) : md}*/}
                            {/*     alt="Main picture"/>*/}
                        </MediaQuery>

                        {/*sm*/}
                        <MediaQuery minWidth={576} maxWidth={767}>
                            {pictures[4] ? pictures[4] : <img className="home__picture"
                                                              src={sm}
                                                              alt="Main picture"/>}
                            {/*<img className="home__picture" src={pictures.sm ? getPicture(pictures.sm) : sm}*/}
                            {/*     alt="Main picture"/>*/}
                        </MediaQuery>

                        {/*xs*/}
                        <MediaQuery minWidth={0} maxWidth={575}>
                            {pictures[5] ? pictures[5] : <img className="home__picture"
                                                              src={sm}
                                                              alt="Main picture"/>}
                            {/*<img className="home__picture" src={pictures.sm ? getPicture(pictures.sm) : sm}*/}
                            {/*     alt="Main picture"/>*/}
                        </MediaQuery>
                    </div>
                }
            </Container>
        </>
    )
}