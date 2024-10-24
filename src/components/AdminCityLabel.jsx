import {ConfirmDeleteModal} from "./modal/ConfirmModal.jsx";
import {useModal} from "../hooks/useModal.js";
import {openModal} from "../utils/modalUtils.js";
import RemoveImage from "/src/assets/admin/remove.svg"

export default function AdminCityLabel({info, isActive, onClick, setCity, isEditing = false}) {
    const {setIsActive, setModal, modal} = useModal();

    const isCommonInfo = info.name === "Общая информация";

    return (
        <>
            <div className="admin__panel-city-label-container">
                <div onClick={() => onClick(info.name)}
                     className={`admin__panel-city-label 
                 ${isCommonInfo ? "admin__panel-city-border-color" : ""}
                 ${isActive === info.name ? "chosen" : ""}`}>
                    <div className="admin__panel-city-name">{info.name}</div>
                </div>
                <img onClick={() => {
                    setCity(info)
                    openModal(setIsActive, setModal, "confirm")
                }}
                     src={RemoveImage}
                     className={`admin__panel-city-label-remove ${isEditing && !isCommonInfo ? "active" : ""}`}
                     alt="remove button"/>
            </div>
        </>

    )
}