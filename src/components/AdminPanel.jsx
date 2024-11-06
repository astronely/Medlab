import {Container} from "react-bootstrap";
import "./styles/admin.scss"
import AdminCityLabel from "./AdminCityLabel.jsx";
import {useEffect, useState} from "react";
import {
    AdminThemeContainerFiles,
    AdminThemeContainerInputs,
    AdminThemeContainerOrgs, AdminThemeContainerPictures, AdminThemeContainerSpecialists,
    AdminThemeInput
} from "./AdminThemeContainers.jsx";
import Button from "./ui/Button.jsx";
import {FormProvider, useForm} from "react-hook-form";
import {ConfirmDeleteModal} from "./modal/ConfirmModal.jsx";
import {useModal} from "../hooks/useModal.js";
import SaveImage from "/src/assets/admin/Save.svg"
import EditImage from "/src/assets/admin/Pencil.svg"
import axios from "axios";
import {
    getCities,
    getCityInfo,
    getOnlyInfo,
    getOnlyLinksName,
    getPictures,
    getSpecialistsInfo
} from "../utils/getInfo.js";
import AdminGuide from "./AdminGuide.jsx"
import {useNavigate} from "react-router-dom";
import {isAuth} from "../utils/authUtils.js";

export default function AdminPanel() {
    const navigate = useNavigate();

    const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`
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
                placeholder: "Ссылка",
                fieldName: "vk"
            },
            {
                title: "Почта",
                placeholder: "Почта",
                fieldName: "email"
            },
            {
                title: "Телефон/WhatsApp",
                placeholder: "Телефон",
                fieldName: "phone"
            },
            {
                title: "Адрес",
                placeholder: "Адрес",
                fieldName: "address"
            },
        ]
    }

    const workTimeInfo = {
        title: "Время работы",
        inputs: [
            {
                title: "Прием биоматериала",
                placeholder: "текст",
                fieldName: "bio_get"
            },
            {
                title: "Выдача результатов",
                placeholder: "текст",
                fieldName: "bio_give"
            }
        ]
    }

    const priceInfo = {
        title: "Цены",
        text: "Перетащите файлы сюда",
        placeholder: "кнопка загрузки файлов/область прикреп.файлов"
    }


    const {modal} = useModal();

    const [cityToDelete, setCityToDelete] = useState({});
    const [cities, setCities] = useState([{name: "Общая информация"}]);
    const [prevCities, setPrevCities] = useState([{name: "Общая информация"}]);
    const [isActive, setIsActive] = useState("Общая информация");
    const [isEditing, setIsEditing] = useState(false);

    const onClick = (name) => {
        setIsActive(name)
    }

    const addNewCity = () => {
        setCities(cities => [...cities, {name: `Новый город ${cities.length}`}])
    }

    const deleteCity = (name) => {
        axios.delete(`${serverAddress}/api/city/delete/${name}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        setCities(cities.filter((item) => item.name !== name))
    }

    const methods = useForm({
        defaultValues: {
            files: {
                about: undefined,
                legal: undefined,
                price: undefined
            },
            orgs: [],
            city: {
                name: undefined,
                coordinates: undefined,
                address: undefined,
                vk: undefined,
                email: undefined,
                phone: undefined,
                bio_get: undefined,
                bio_give: undefined
            },
            specialists: [],
            mainPictures: []
        }
    });

    const {handleSubmit, setValue} = methods;

    const createFile = async (files, theme, city = "") => {
        const formData = new FormData();

        if (files === undefined || files.length === 0) {
            return;
        }
        // console.log(files)

        for (let file of files) {
            if (file instanceof File) formData.append(`${theme}Files`, file, file.name);
            else formData.append(`${theme}Files`, file);
        }

        if (city !== "") {
            formData.append("currentCity", city);
        }

        await axios.post(`${serverAddress}/api/${theme}/create`, formData)
            .then((res) => {
                console.log(res)
                console.log(`${theme} info successfully updated!`);
            })
            .catch(err => console.log(err));
    }

    const createText = async (data, theme) => {
        // console.log("CREATE TEXT: ", data)
        let dataToSend = {}
        if (data !== undefined) {
            const filteredData = Object.values(data).filter(item => item !== null && item !== undefined)
            // console.log("FilteredData: ", filteredData);
            dataToSend = {filteredData}
        }

        // console.log(dataToSend)
        await axios.post(`${serverAddress}/api/authority/create`, dataToSend)
            .then(() => {
                console.log(`${theme} info successfully updated!`)
            })
            .catch(err => console.log(err))
    }

    const createCity = async (data) => {
        delete data["id"];
        await axios.post(`${serverAddress}/api/city/create`, data)
            .then(() => {
                console.log("City info successfully created!")
            })
            .catch(err => console.log(err))
    }

    const updateCity = async (data) => {
        delete data["id"];
        await axios.put(`${serverAddress}/api/city/update/${isActive}`, data)
            .then(() => {
                console.log("City info successfully updated!")
            })
            .catch(err => console.log(err))
    }

    const createSpecialist = async (data, city) => {
        const formData = new FormData();
        // console.log("Specialist data: ", data)
        if (data === undefined) {
            formData.append("currentCity", city);
            await axios.post(`${serverAddress}/api/specialist/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(() => {
                    console.log("Specialist successfully updated!")
                })
                .catch(err => console.log(err))
            return;
        }
        Object.values(data).forEach(item => {
            formData.append('specialists', JSON.stringify({
                full_name: item.full_name,
                experience: item.experience,
                photo: typeof (item.photo) === "string" ? item.photo
                    : item.photo !== undefined ? item.photo[0].name : ""
            }));
            if (typeof (item.photo) !== "string" && item.photo !== undefined)
                formData.append('photos', item.photo[0], item.photo[0].name); // Добавляем файл
        });
        formData.append("currentCity", city);

        await axios.post(`${serverAddress}/api/specialist/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                console.log("Specialist successfully updated!")
            })
            .catch(err => console.log(err))
    }

    const createCommonPictures = async (data) => {
        const formData = new FormData();
        // console.log(data)
        if (data === undefined) {
            return;
        }

        delete data["id"];
        for (let file in data) {
            if (data[file] === undefined) continue;
            let fileToAdd = undefined;
            if (Array.isArray(data[file])) fileToAdd = data[file][0];
            if (typeof(data[file]) === "string") fileToAdd = data[file];
            // console.log(fileToAdd)
            if (fileToAdd instanceof File) {
                formData.append(`commonPictures`, fileToAdd, fileToAdd.name)
                continue
            }
            formData.append(`commonPictures`, fileToAdd);
        }

        // console.log(data)

        await axios.post(`${serverAddress}/api/commonPicture/create`, formData)
            .then(res => {
                console.log(`CommonPicture info successfully updated! \n ${res.data}`);
            })
            .catch(err => console.log(err));
    }

    const onSave = async (data) => {
        console.log("DATA: ", data)
        if (isActive === "Общая информация") {
            console.log("Общая информация DATA SEND", data);
            await createFile(data.files.about, "about");
            await createFile(data.files.legal, "legal");
            await createText(data.orgs, "authority");
            await createCommonPictures(data.mainPictures[0])
            window.location.reload()
            return;
        }
        // console.log(cities)

        if (data.city.name.trim() === '') {
            alert("Введите название города!");
            return;
        }

        if (prevCities.some(item => item.name === isActive)) {
            // console.log("Update city!", isActive)
            await updateCity(data.city);
        } else {
            await createCity(data.city);
        }

        // console.log("SPECIALISTS DATA: ", data.specialists)

        await createFile(data.files.price, "price", data.city.name);
        await createSpecialist(data.specialists, data.city.name);
        window.location.reload()
    }

    useEffect(() => {
        const fetchData = async () => {
            const aboutFiles = await getOnlyLinksName("about");
            const legalFiles = await getOnlyLinksName("legal");
            const priceFiles = await getOnlyLinksName("price", isActive);
            const authorities = await getOnlyInfo("authority");
            const specialists = await getSpecialistsInfo(isActive);
            const commonPictures = await getPictures();
            const city = await getCityInfo(isActive);

            setValue("mainPictures", [commonPictures])

            setValue("files", Object.assign([], {
                about: aboutFiles,
                legal: legalFiles,
                price: priceFiles
            }))

            setValue("city", city.length ? city[0] : {
                name: "",
                coordinates: "",
                address: "",
                vk: "",
                email: "",
                phone: "",
                bio_get: "",
                bio_give: ""
            })

            setValue("specialists",
                specialists.length ?
                    Object.fromEntries(specialists.map(item => [item.id, item]))
                    : {}
            )

            setValue("orgs", Object.fromEntries(authorities.map(item => [item.id, item])))
        }

        fetchData().catch(err => console.log(err));
    }, [isActive])

    useEffect(() => {

        const checkAuth = async () => {
            const isAuthorized = await isAuth(serverAddress);
            console.log("is Authorized?: ", isAuthorized)
            if (!isAuthorized) {
                navigate("/", {replace: true})
            }
        }

        const fetchData = async () => {
            const allCities = await getCities();
            setCities([{name: "Общая информация"}]);
            setPrevCities([{name: "Общая информация"}]);
            for (let city of allCities) {
                setCities(cities => [...cities, {
                    name: city.name
                }])
                setPrevCities(prevCities => [...prevCities, {
                    name: city.name
                }])
            }
        }

        const initAdminPanel = async () => {
            await fetchData().catch(err => console.log(err));
            await checkAuth().catch(err => console.log(err));
        }

        initAdminPanel().catch(err => console.log(err))
    }, [])

    return (
        <div className="admin__panel-wrap">
            <div className="admin__panel-header">
                <Container>
                    <div className="admin__panel-header-container">
                        <div style={{width: "35%"}} className="admin__panel-header-part">
                            <div className="admin__panel-header-title">Выберите город</div>
                            <div className="admin__panel-header-image"><img className="admin__panel-image"
                                                                            onClick={() => setIsEditing(!isEditing)}
                                                                            src={EditImage}
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
                                                setCity={setCityToDelete} key={index}/>
                            ))}
                            <Button onClickAction={addNewCity} className="admin__panel-button"
                                    buttonText="Добавить город"/>
                        </div>
                        <ConfirmDeleteModal open={modal === "confirm"} deleteAction={deleteCity} item={cityToDelete}/>
                    </div>
                    <div className="admin__panel-divider"/>
                    <div style={{width: "65%"}} className="admin__panel-edit">
                        {isActive === "" ? <> </>
                            :
                            isActive === "Общая информация" ?
                                <FormProvider {...methods}>
                                    <AdminGuide></AdminGuide>
                                    <AdminThemeContainerFiles theme="files" info={legalInfo} id={"legal"} key={51}/>
                                    <AdminThemeContainerFiles theme="files" info={aboutInfo} id={"about"} key={52}/>
                                    <AdminThemeContainerPictures theme="mainPictures"
                                                                 info={{title: "Изображения главной страницы"}}/>
                                    <AdminThemeContainerOrgs info={orgsInfo} methods={methods} key={53}/>
                                    <div onClick={handleSubmit(onSave)} className="admin__panel-save-button">
                                        Сохранить <img
                                        className="admin__panel-save-image"
                                        src={SaveImage}
                                        alt="Edit button"/></div>
                                </FormProvider>
                                :
                                <FormProvider {...methods}>
                                    <div className="admin__panel-edit-city-info">
                                        <AdminThemeInput style={{fontSize: "40px",}}
                                                         info={{title: "Название города", placeholder: isActive}}
                                                         theme="name"
                                                         inputId={0}
                                                         key={101}/>
                                        <AdminThemeInput style={{fontSize: "40px",}}
                                                         info={{
                                                             title: "Адрес для карт",
                                                             placeholder: "Координаты xx.xxxxx; yy.yyyyyy"
                                                         }}
                                                         theme="coords"
                                                         inputId={1}
                                                         key={102}/>
                                    </div>
                                    <AdminThemeContainerInputs info={contactInfo} theme="contacts" key={103}/>
                                    <AdminThemeContainerInputs info={workTimeInfo} theme="workTime" key={104}/>
                                    <AdminThemeContainerFiles theme="files" info={priceInfo} id={"price"} key={105}/>
                                    <AdminThemeContainerSpecialists info={{title: "Специалисты"}} city={isActive}
                                                                    methods={methods}
                                                                    key={106}/>
                                    <div onClick={handleSubmit(onSave)} className="admin__panel-save-button">
                                        Сохранить <img
                                        className="admin__panel-save-image"
                                        src={SaveImage}
                                        alt="Edit button"/></div>
                                </FormProvider>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}