import {Modal} from "./Modal.jsx";
import CityString from "../CityString.jsx";
import {useEffect, useState} from "react";
import {getCities} from "../../utils/getInfo.js";

export default function CityModal({open = false}) {

    const [cities, setCities] = useState([]);
    // const cities = [
    //     "г. Сим",
    //     "г. Йошкар-ола",
    //     "г. Челябинск",
    //     "г. Екатеринбург"
    // ]

    useEffect(() => {
        const fetchData = async () => {
            const citiesData = await getCities();
            setCities(citiesData);
        }
        fetchData().catch(err => console.log(err))
    }, [])

    return (
        <Modal open={open}>
            <form className="modal__form">
                <div className="modal__label">
                    <div className="modal__label-title">Выберите ваш город</div>
                    <div className="modal__label-text">из предложенных в списке ниже</div>
                </div>
                <div className="modal__city-list">
                    {cities.map((cityName, index) => (
                        <CityString cityName={cityName.name} key={index} open={open}/>
                    ))}
                </div>
            </form>
        </Modal>
    )
}