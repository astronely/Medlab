import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import SpecialistCard from "./SpecialistCard.jsx";
import "./styles/specialists.scss"
import "./styles/specialistsMedia.scss"
import {useEffect, useState} from "react";
import {getSpecialistsCards} from "../utils/getInfo.js";
import {useApp} from "../hooks/useApp.js";

export default function Specialists() {

    const [specialists, setSpecialists] = useState([]);
    const {currentCity} = useApp();

    const specialistsInfo = {
        title: "Специалисты",
        text: "В нашей клинике работают квалифицированные специалисты с многолетним опытом." +
            " Каждый из них — эксперт в своей области, готовый обеспечить индивидуальный подход" +
            " и внимательное отношение к каждому пациенту. Выберите нужного специалиста" +
            " и узнайте больше о его профессиональных достижениях."
    }

    useEffect(() => {
        setSpecialists([]);
        const fetchSpecialists = async () => {
            await getSpecialistsCards(specialists, setSpecialists, currentCity.replace("г. ", ""))
                .catch(err => console.log(err))
        }

        fetchSpecialists().catch(err => console.log(err))
        // console.log(specialists)
    }, [currentCity])

    return (
        <Container>
            <div className="specialists__container">
                <BoxDividerV info={specialistsInfo} />
                <div className="specialists__cards">
                    {specialists.map((specialist, index) => (
                        <SpecialistCard specialist={specialist} style={{ animationDelay: `${index * 0.5}s`}} key={index} />
                    ))}
                </div>
            </div>
        </Container>
    )
}