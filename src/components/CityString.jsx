import cityImage from "../assets/about-us/nav/house.svg";

export default function CityString({cityName}) {

    return (
        <div className="modal__city">
            <img src={cityImage} alt="City image"/>
            <b>{cityName}</b>
        </div>
    )
}