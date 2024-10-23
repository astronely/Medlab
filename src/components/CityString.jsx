import cityImage from "../assets/about-us/nav/house.svg";
import {useModal} from "../hooks/useModal.js";
import {useApp} from "../hooks/useApp.js";

export default function CityString({cityName}) {
    const {setIsActive} = useModal();
    const {setCurrentCity} = useApp();

    const setChosenCity = () => {
        // const processedCityName = cityName.replace("г. ", "").toLowerCase();
        localStorage.setItem("currentCity", cityName);
        setCurrentCity(cityName);
        setIsActive(false)
    }

    return (
        <div className="modal__city" onClick={
            () => setChosenCity()
        }>
            <img src={cityImage} alt="City image"/>
            <b>{cityName}</b>
        </div>
    )
}