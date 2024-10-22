import {Modal} from "./Modal.jsx";
import CityString from "../CityString.jsx";

export default function CityModal({open = false}) {

    const cities = [
        "г. Сим",
        "г. Йошкар-ола",
        "г. Челябинск",
        "г. Екатеринбург"
    ]

    return (
        <Modal open={open}>
            <form className="modal__form">
                <div className="modal__label">
                    <div className="modal__label-title">Выберите ваш город</div>
                    <div className="modal__label-text">из предложенных в списке ниже</div>
                </div>
                <div className="modal__city-list">
                    {cities.map((cityName, index) => (
                        <CityString cityName={cityName} key={index} />
                    ))}
                </div>
            </form>
        </Modal>
    )
}