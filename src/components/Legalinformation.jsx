import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import BoxDividerLink from "./BoxDividerLink.jsx";
import {useEffect, useState} from "react";
import {getLinks} from "../utils/getInfo.js";
import "./styles/legal.scss"

export default function LegalInformation() {
    const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    const serverAssetsFolder = `${serverAddress}/assets/legalInfo`;

    const [legalInfoLinks, setLegalInfoLinks] = useState([]);

    const legalInfo = {
        title: "Правовая информация",
        text: "В данном разделе представлены все необходимые правовые сведения," +
            " с которыми вы можете ознакомиться для получения полной и актуальной информации."
    }


    useEffect(() => {
        setLegalInfoLinks([])
        getLinks(legalInfoLinks, setLegalInfoLinks, "legal", serverAssetsFolder).catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <div className="legal__container">
                <BoxDividerV info={legalInfo} dividerUpper={false}/>
                <BoxDividerLink links={legalInfoLinks}/>
            </div>
        </Container>
    )
}