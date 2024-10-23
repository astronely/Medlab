import {Container} from "react-bootstrap";
import "./styles/admin.scss"
import AdminCityLabel from "./AdminCityLabel.jsx";
import {useState} from "react";
import {
    AdminThemeContainerFiles,
    AdminThemeContainerInputs,
    AdminThemeContainerOrgs, AdminThemeContainerPictures, AdminThemeContainerSpecialists,
    AdminThemeInput
} from "./AdminThemeContainers.jsx";
import Button from "./ui/Button.jsx";
import {FormProvider, useForm} from "react-hook-form";

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


    const methods = useForm({
        defaultValues: {
            files: [],
            orgs: [],
            city: [],
            contacts: [],
            workTime: [],
            specialists: [],
            mainPictures: []
        }
    });

    const {handleSubmit} = methods;

    const onSave = (data) => {
        console.log(data)
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
                            <Button onClickAction={addNewCity} className="admin__panel-button"
                                    buttonText="Добавить город"/>
                        </div>
                    </div>
                    <div className="admin__panel-divider"/>
                    <div style={{width: "65%"}} className="admin__panel-edit">
                        {isActive === "" ? <> </>
                            :
                            isActive === "Общая информация" ?
                                <FormProvider {...methods}>
                                    <AdminThemeContainerFiles theme="files" info={legalInfo} id={"legal"} key={1}/>
                                    <AdminThemeContainerFiles theme="files" info={aboutInfo} id={"about"} key={2}/>
                                    <AdminThemeContainerPictures theme="mainPictures"
                                                                 info={{title: "Изображения главной страницы"}}
                                                                 methods={methods}/>
                                    <AdminThemeContainerOrgs info={orgsInfo} methods={methods} key={3}/>
                                    <div onClick={handleSubmit(onSave)} className="admin__panel-save-button">
                                        Сохранить <img
                                        className="admin__panel-save-image"
                                        src="/src/assets/admin/Save.svg"
                                        alt="Edit button"/></div>
                                </FormProvider>
                                :
                                <FormProvider {...methods}>
                                    <div className="admin__panel-edit-city-info">
                                        <AdminThemeInput style={{fontSize: "40px",}}
                                                         info={{title: "Название города", placeholder: isActive}}
                                                         theme="city"
                                                         inputId={0}/>
                                        <AdminThemeInput style={{fontSize: "40px",}}
                                                         info={{
                                                             title: "Адрес для карт",
                                                             placeholder: "Координаты xx.xxxxx; yy.yyyyyy"
                                                         }}
                                                         theme="coords"
                                                         inputId={1}/>
                                    </div>
                                    <AdminThemeContainerInputs info={contactInfo} key={101}/>
                                    <AdminThemeContainerInputs info={workTimeInfo} key={102}/>
                                    <AdminThemeContainerFiles theme="prices" info={priceInfo} id={"price"}/>
                                    <AdminThemeContainerSpecialists info={{title: "Специалисты"}} methods={methods}/>
                                    <div onClick={handleSubmit(onSave)} className="admin__panel-save-button">
                                        Сохранить <img
                                        className="admin__panel-save-image"
                                        src="/src/assets/admin/Save.svg"
                                        alt="Edit button"/></div>
                                </FormProvider>
                        }
                    </div>
                </div>
            </Container>
        </>


    )
}