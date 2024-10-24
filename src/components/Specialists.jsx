import {Container} from "react-bootstrap";
import BoxDividerV from "./BoxDividerV.jsx";
import SpecialistCard from "./SpecialistCard.jsx";
import "./styles/specialists.scss"
import "./styles/specialistsMedia.scss"

export default function Specialists() {

    const specialistsInfo = {
        title: "Специалисты",
        text: "В нашей клинике работают квалифицированные специалисты с многолетним опытом." +
            " Каждый из них — эксперт в своей области, готовый обеспечить индивидуальный подход" +
            " и внимательное отношение к каждому пациенту. Выберите нужного специалиста" +
            " и узнайте больше о его профессиональных достижениях."
    }

    const specialists = [
        {
            sex: "man",
            experience: [
                "job1, 5 years",
                "job2, 2.5 years",
            ]
        },
        {
            sex: "woman",
            experience: [
                "job1, 5 years",
            ]
        },
        {
            sex: "woman",
            experience: [
                "job1, 5 years",
                "job2, 2.5 years",
                "job3, 2.5 years",
            ]
        },
        {
            sex: "man",
            experience: [
                "job1, 5 years",
                "job2, 2.5 years",
                "job3, 2.5 years",
                "job4, 4 years",
            ]
        },
        {
            sex: "man",
            experience: [
                "job1, 5 years",
                "job2, 2.5 years",
                "job3, 2.5 years",
            ]
        },

    ]

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