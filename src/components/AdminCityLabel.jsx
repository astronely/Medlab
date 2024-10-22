export default function AdminCityLabel({info, isActive, onClick, removeAction, isEditing = false}) {

    const isCommonInfo = info.name === "Общая информация";

    return (
        <div className="admin__panel-city-label-container">
            <div onClick={() => onClick(info.name)}
                 className={`admin__panel-city-label 
                 ${isCommonInfo ? "admin__panel-city-border-color" : ""}
                 ${isActive === info.name ? "chosen" : ""}`}>
                <div className="admin__panel-city-name">{info.name}</div>
            </div>
            <img onClick={() => removeAction(info.name)}
                 src="/src/assets/admin/remove.svg"
                 className={`admin__panel-city-label-remove ${isEditing && !isCommonInfo ? "active" : ""}`}
                 alt="remove button"/>
        </div>
    )
}