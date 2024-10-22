import InfoBox from "./InfoBox.jsx";
import "./styles/infobox.scss"

export default function DoubleInfoBox({info}) {

    return (
        <div className="infobox__double-container">
            <InfoBox isSchedule={true} info={info[0]} />
            <InfoBox isSchedule={true} info={info[1]} isTests={true} />
        </div>
    )
}