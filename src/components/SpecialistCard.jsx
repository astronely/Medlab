import ManPlaceholder from "/src/assets/specialists/man-placeholder.svg"
import WomanPlaceholder from "/src/assets/specialists/woman-placeholder.svg"
import "./styles/specialistCard.scss"

export default function SpecialistCard({specialist, style={}}) {

    const specialistImage = specialist.sex === "man" ? ManPlaceholder : WomanPlaceholder;

    return (
        <div className="specialist__card" style={style}>
            <div className="specialist__card-image">
                <img src={specialistImage} alt="Фотография специалиста"/>
            </div>
            <div className="specialist__card-divider" />
            <div className="specialist__label">
                <div className="specialist__label-name">Name Surname</div>
                <div className="specialist__label-experience">
                    {specialist.experience.map((experience, index) => (
                        <span key={index}>{experience}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}