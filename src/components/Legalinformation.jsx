import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import BoxDividerLink from "./BoxDividerLink.jsx";
import "./styles/legal.scss"

export default function LegalInformation() {

    const legalInfo = {
        title: "Правовая информация",
        text: "В данном разделе представлены все необходимые правовые сведения," +
            " с которыми вы можете ознакомиться для получения полной и актуальной информации."
    }

    const legalInfoLinks = [
        {name: "Правовая ифнормация1.pdf", link: "#"},
        {name: "Отчет о медецинской правовой информации2.pdf", link: "#"},
        {name: "Документ о правовой информации 5.pdf", link: "#"},
        {name: "texttexttexttexttext.pdf", link: "#"},
    ]

    return (
        <Container>
            <div className="legal__container">
                <BoxDividerV info={legalInfo} dividerUpper={false}/>
                <BoxDividerLink links={legalInfoLinks}/>
            </div>
        </Container>
    )
}