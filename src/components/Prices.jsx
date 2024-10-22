import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import BoxDiamondLink from "./BoxDiamondLink.jsx";
import "./styles/prices.scss"

export default function Prices() {

    const pricesInfo = {
        title: "Цены",
        text: "Мы предлагаем оптимальное соотношение цены и качества для каждой услуги." +
            " В списке ниже вы найдёте актуальные расценки, чтобы выбрать наиболее подходящие" +
            " предложения для вашего здоровья и комфорта."
    }

    const prices = [
        {name: "price_link.pdf", link: "#"},
        {name: "price_link.pdf", link: "#"},
        {name: "price_link.pdf", link: "#"},
        {name: "price_link.pdf", link: "#"},
        {name: "price_link.pdf", link: "#"},
    ]

    return (
        <Container>
            <div className="prices__container">
                <BoxDividerV info={pricesInfo} />
                <BoxDiamondLink isPrices={true} info={prices}/>
            </div>
        </Container>
    )
}