import {Container} from "react-bootstrap";
import "./styles/admin.scss"
import AdminCityLabel from "./AdminCityLabel.jsx";
import {useState} from "react";
import {
    AdminThemeContainerFiles,
    AdminThemeContainerInputs,
    AdminThemeContainerOrgs, AdminThemeContainerSpecialists,
    AdminThemeInput
} from "./AdminThemeContainers.jsx";
import Button from "./ui/Button.jsx";

export default function AdminPanel() {

    const legalInfo = {
        title: "Правовая информация",
        text: "Перетащите файлы сюда",
        placeholder: "кнопка загрузки файлов/область прикреп.файлов"
    }

    const aboutInfo = {
        title: "О нас",
        text: "Перетащите файлы сюда",
        placeholder: "кнопка загрузки файлов/область прикреп.файлов"
    }

    const orgsInfo = {
        title: "Контроллирующие органы"
    }

    const contactInfo = {
        title: "Контактная информация",
        inputs: [
            {
                title: "VK",
                placeholder: "Ссылка"
            },
            {
                title: "Почта",
                placeholder: "Почта"
            },
            {
                title: "Телефон/WhatsApp",
                placeholder: "Телефон"
            },
            {
                title: "Адрес",
                placeholder: "Адрес"
            },
        ]
    }

    const workTimeInfo = {
        title: "Время работы",
        inputs: [
            {
                title: "Прием биоматериала",
                placeholder: "текст"
            },
            {
                title: "Выдача результатов",
                placeholder: "текст"
            }
        ]
    }

    const priceInfo = {
        title: "Цены",
        text: "Перетащите файлы сюда",
        placeholder: "кнопка загрузки файлов/область прикреп.файлов"
    }

    const [cities, setCities] = useState([
        {name: "Общая информация"},
        {name: "Сим"},
        {name: "Йошка-ола"},
        {name: "Дубайск"}]);

    const [isActive, setIsActive] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const onClick = (name) => {
        setIsActive(name)
    }

    const addNewCity = () => {
        setCities([...cities, {name: `Новый город ${cities.length}`}])
    }

    const deleteCity = (name) => {
        setCities(cities.filter((item) => item.name !== name))
    }

    return (
        <>
            <div className="admin__panel-header">
                <Container>
                    <div className="admin__panel-header-container">
                        <div style={{width: "35%"}} className="admin__panel-header-part">
                            <div className="admin__panel-header-title">Выберите город</div>
                            <div className="admin__panel-header-image"><img className="admin__panel-image"
                                                                            onClick={() => setIsEditing(!isEditing)}
                                                                            src="/src/assets/admin/Pencil.svg"
                                                                            alt="Edit button"/></div>
                        </div>
                        <div style={{width: "65%"}} className="admin__panel-header-part">
                            <div className="admin__panel-header-title">Панель редактирования</div>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="admin__panel-container">
                    <div style={{width: "35%"}} className="admin__panel-city">
                        <div className="admin__panel-city-list">
                            {cities.map((city, index) => (
                                <AdminCityLabel info={city} onClick={onClick}
                                                isActive={isActive}
                                                isEditing={isEditing}
                                                removeAction={deleteCity} key={index}/>
                            ))}
                            <Button onClickAction={addNewCity} className="admin__panel-button" buttonText="Добавить город"/>
                        </div>
                    </div>
                    <div className="admin__panel-divider"/>
                    <div style={{width: "65%"}} className="admin__panel-edit">
                        {isActive === "" ? <> </>
                            :
                            isActive === "Общая информация" ?
                                <>
                                    <AdminThemeContainerFiles info={legalInfo}/>
                                    <AdminThemeContainerFiles info={aboutInfo}/>
                                    <AdminThemeContainerOrgs info={orgsInfo}/>
                                    <div className="admin__panel-save-button">
                                        Сохранить <img
                                        className="admin__panel-save-image"
                                        src="/src/assets/admin/Save.svg"
                                        alt="Edit button"/></div>
                                </>
                                :
                                <>
                                    <AdminThemeInput style={{fontSize: "40px",}}
                                                     info={{title: "Название города", placeholder: isActive}}/>
                                    <AdminThemeContainerInputs info={contactInfo}/>
                                    <AdminThemeContainerInputs info={workTimeInfo}/>
                                    <AdminThemeContainerFiles info={priceInfo}/>
                                    <AdminThemeContainerSpecialists info={{title: "Специалисты"}}/>
                                    <div className="admin__panel-save-button">
                                        Сохранить <img
                                        className="admin__panel-save-image"
                                        src="/src/assets/admin/Save.svg"
                                        alt="Edit button"/></div>
                                </>
                        }
                    </div>
                </div>
            </Container>
        </>


    )
}