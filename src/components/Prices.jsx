import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import BoxDiamondLink from "./BoxDiamondLink.jsx";
import "./styles/prices.scss"
import {useEffect, useState} from "react";
import {getLinks} from "../utils/getInfo.js";
import {useApp} from "../hooks/useApp.js";

export default function Prices() {
    const {currentCity, serverAddress} = useApp();
    // const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    const serverAssetsFolder = `${serverAddress}/mdlbassets/${currentCity.replace("г. ", "")}/prices`;

    const [prices, setPrices] = useState([]);

    const pricesInfo = {
        title: "Цены",
        text: "Мы предлагаем оптимальное соотношение цены и качества для каждой услуги." +
            " В списке ниже вы найдёте актуальные расценки, чтобы выбрать наиболее подходящие" +
            " предложения для вашего здоровья и комфорта."
    }

    useEffect(() => {
        setPrices([]);
        // console.log(currentCity)
        // console.log(serverAddress)
        // console.log(serverAssetsFolder)
        getLinks(prices, setPrices, "price", serverAssetsFolder, currentCity.replace("г. ", ""))
            .catch(err => console.log(err))
    }, [currentCity])

    return (
        <Container>
            <div className="prices__container">
                <BoxDividerV info={pricesInfo} />
                <BoxDiamondLink isPrices={true} info={prices}/>
            </div>
        </Container>
    )
}