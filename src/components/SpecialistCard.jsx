import ManPlaceholder from "/src/assets/specialists/man-placeholder.svg"
import WomanPlaceholder from "/src/assets/specialists/woman-placeholder.svg"
import "./styles/specialistCard.scss"

export default function SpecialistCard({specialist, style={}}) {

    const specialistImage = specialist.sex === "woman" ? WomanPlaceholder : ManPlaceholder; // TODO: change to gender
    console.log(specialist)
    return (
        <div className="specialist__card" style={style}>
            <div className="specialist__card-image-container">
                <img className="specialist__card-image" src={specialist.photo} alt="Фотография специалиста"/>
            </div>
            <div className="specialist__card-divider" />
            <div className="specialist__label">
                <div className="specialist__label-name">{specialist.full_name}</div>
                <div className="specialist__label-experience">
                    <span>{specialist.experience}</span>
                    {/*{specialist.experience.map((experience, index) => (*/}
                    {/*    <span key={index}>{experience}</span>*/}
                    {/*))}*/}
                </div>
            </div>
        </div>
    )
}