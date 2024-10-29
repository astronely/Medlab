import "./styles/specialistCard.scss"

export default function SpecialistCard({specialist, style={}}) {

    const specialistExperience = specialist.experience.trim().split(";");
    return (
        <div className="specialist__card" style={style}>
            <div className="specialist__card-image-container">
                <img className="specialist__card-image" src={specialist.photo} alt="Фотография специалиста"/>
            </div>
            <div className="specialist__card-divider" />
            <div className="specialist__label">
                <div className="specialist__label-name">{specialist.full_name}</div>
                <div className="specialist__label-experience">
                    {specialistExperience.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}