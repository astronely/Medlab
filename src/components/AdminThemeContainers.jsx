import {useEffect, useRef, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import AddImage from "/src/assets/admin/add.svg"
import RemoveImage from "/src/assets/admin/remove.svg"

import {getOnlyInfo, getSpecialistsInfo} from "../utils/getInfo.js";

export function AdminThemeContainerFiles({
                                             info,
                                             theme,
                                             id,
                                             inputId,
                                             classNameInput = "",
                                             styleContainer = {}
                                         }) {
    const {control} = useFormContext();
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event, onChange) => {
        event.preventDefault();
        const files = Array.from(event.target.files);
        onChange(files);
    }

    const onInputChange = (event, onChange) => {
        const files = Array.from(event.target.files);
        onChange(files);
    };

    let name;
    switch (theme) {
        case "files":
            name = `${theme}.${id}`;
            break;
        case "prices":
            name = `${theme}.${id}`;
            break;
        case "specialists":
            name = `${theme}[${id}].photo`
            break;
        case "mainPictures":
            name = `${theme}[${id}].${info.fieldName}`
            break;
    }


    return (
        <>
            <div className="admin__theme-files-container" style={styleContainer}>
                <div className="admin__theme-title">{info.title}</div>
                <div className="admin__theme-edit">
                    <div className="admin__theme-text">{info.text}</div>
                    <Controller
                        name={name}
                        control={control}
                        render={({field: {onChange, value}}) => (
                            <div
                                onClick={handleClick}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, onChange)}
                                className={classNameInput !== "" ? classNameInput : "admin__theme-input-file"}>

                                {value && value.length !== 0 ? (
                                    typeof(value) === "string" ?
                                        <div key={inputId} style={{padding: '10px 0'}}>{value}</div>
                                        :
                                        value.map((file, index) => (
                                            // console.log(file)
                                            <div key={inputId + index} style={{padding: '10px 0'}}>{file.name}</div>
                                        ))
                                ) : (
                                    info.placeholder
                                )}

                                <input type='file'
                                       onChange={(e) => onInputChange(e, onChange)}
                                       multiple hidden
                                       ref={inputRef}
                                       key={inputId}
                                />
                            </div>
                        )}>
                    </Controller>
                </div>
            </div>
        </>
    )
}

export function AdminThemeContainerOrgs({info, methods}) {
    const [orgBoxes, setOrgBoxes] = useState([]);
    const [counter, setCounter] = useState(0);

    const onClickAdd = () => {
        setOrgBoxes(orgBoxes => [...orgBoxes, {
            id: counter,
        }])
        setCounter(prevState => prevState + 1)
    }

    const onClickDelete = (id) => {
        methods.unregister(`orgs.${id}`)
        setOrgBoxes(orgBoxes.filter((item) => item.id !== id));
    }

    useEffect(() => {
        const fetchData = async () => {
            const boxes = await getOnlyInfo("authority");
            setOrgBoxes(boxes);
        }
        setTimeout(() => {
            fetchData().catch(err => console.log(err))
        }, 700)
    }, [])

    return (
        <div className="admin__theme-orgs-container">
            <div className="admin__theme-title">
                {info.title} <img onClick={onClickAdd} src={AddImage} alt="add box"/>
            </div>
            {orgBoxes.map((box, index) => (
                <AdminThemeOrgsInputs info={box} onClickDelete={onClickDelete} key={index}/>
            ))}
        </div>
    )
}

function AdminThemeOrgsInputs({info, onClickDelete}) {
    const id = info.id;

    const inputsInfo = [
        {title: "Название", placeholder: "Название", fieldName: "name"},
        {title: "Адрес", placeholder: "Адрес", fieldName: "address"},
        {title: "Телефон", placeholder: "Телефон", fieldName: "phone"},
        {title: "Почта", placeholder: "Почта", fieldName: "email"}
    ]

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
            <div className="admin__theme-orgs-inputs">
                {inputsInfo.map((inputInfo, index) => (
                    <AdminThemeInput theme={"orgs"} info={inputInfo} id={id} inputId={4 * id + index}
                                     key={4 * id + index}/>
                ))}
            </div>
            <div style={{width: "fit-content"}} onClick={() => onClickDelete(info.id)}>
                <img style={{width: "48px"}} src={RemoveImage} alt="remove box"/>
            </div>
        </div>
    )
}

export function AdminThemeContainerSpecialists({info, city, methods}) {
    const [specialists, setSpecialists] = useState([]);
    const [counter, setCounter] = useState(0);
    const startIndex = 8;

    const onClickAdd = () => {
        setSpecialists(specialists => [...specialists, {
            id: counter,
        }]);
        setCounter(prevState => prevState + 1);
    }

    const onClickDelete = (id) => {
        methods.unregister(`specialists.${id}`)
        setSpecialists(specialists.filter((item) => item.id !== id))
    }

    useEffect(() => {
        const fetchData = async () => {
            const specialistsList = await getSpecialistsInfo(city);
            setSpecialists(specialistsList);
        }
        setTimeout(() => {
            fetchData().catch(err => console.log(err))
        }, 550)
    }, [city])

    return (
        <div className="admin__theme-specialists-container">
            <div className="admin__theme-title">{info.title} <img onClick={onClickAdd} src={AddImage}
                                                                  alt="add box"/></div>
            <div className="admin__theme-specialists-list">
                {specialists.map((specialist, index) => (
                    <AdminThemeSpecialist info={specialist}
                                          onClickDelete={onClickDelete}
                                          key={index + startIndex}/>
                ))}
            </div>
        </div>
    )
}

function AdminThemeSpecialist({info, onClickDelete}) {
    const id = info.id;

    const inputsInfo = [
        {title: "ФИО", placeholder: "Фамилия", fieldName: "full_name"},
        {text: "Фотография", placeholder: "Прикрепите файлы сюда", fieldName: "photo"},
        {title: "Специальность и стаж", placeholder: "Список через запятую", fieldName: "experience"},
    ]

    return (
        <div className="admin__theme-specialist">
            {inputsInfo.map((item, index) => (
                index === 1 ? <AdminThemeContainerFiles theme={"specialists"}
                                                        info={item}
                                                        id={id}
                                                        inputId={id * 3 + index}
                                                        key={id * 3 + index}
                                                        classNameInput={"admin__theme-specialists-input-file"}
                                                        styleContainer={{gap: "0"}}/>
                    : <AdminThemeInput info={item}
                                       theme={"specialists"}
                                       id={id}
                                       inputId={id * 3 + index}
                                       key={id * 3 + index}
                                       inputStyle={index === 2 ? {height: "150px"} : {}}/>
            ))}
            <img onClick={() => onClickDelete(info.id)}
                 src={RemoveImage}
                 alt="remove box"/>
        </div>
    )
}

export function AdminThemeContainerPictures({info}) {
    const [pictures, setPictures] = useState([]);
    // const [counter, setCounter] = useState(0);
    const startIndex = 2;

    useEffect(() => {
        setTimeout(() => {
            setPictures([{id: 0}])
        }, 700)
    }, [])

    return (
        <div className="admin__theme-specialists-container">
            <div className="admin__theme-title">{info.title}</div>
            <div className="admin__theme-specialists-list">
                {pictures.map((picture, index) => (
                    <AdminThemePicture info={picture}
                                       key={index + startIndex}/>
                ))}
            </div>
        </div>
    )
}

function AdminThemePicture({info}) {
    const id = info.id;

    const picturesInputInfo = [
        {text: "Формат xxl", placeholder: "Прикрепите изображение", fieldName: "xxl"},
        {text: "Формат xl", placeholder: "Прикрепите изображение", fieldName: "xl"},
        {text: "Формат lg", placeholder: "Прикрепите изображение", fieldName: "lg"},
        {text: "Формат md", placeholder: "Прикрепите изображение", fieldName: "md"},
        {text: "Формат sm", placeholder: "Прикрепите изображение", fieldName: "sm"},
        {text: "Формат xs", placeholder: "Прикрепите изображение", fieldName: "xs"},
    ]

    return (
        <div className="admin__theme-specialist">
            {picturesInputInfo.map((item, index) => (
                <AdminThemeContainerFiles theme={"mainPictures"}
                                          info={item}
                                          id={id}
                                          keyForFilePosition={index}
                                          inputId={id * 6 + index}
                                          key={id * 6 + index}
                                          classNameInput={"admin__theme-specialists-input-file"}
                                          styleContainer={{gap: "0"}}/>
            ))}
            {/*<img onClick={() => onClickDelete(info.id)}*/}
            {/*     src={RemoveImage}*/}
            {/*     alt="remove box"/>*/}
        </div>
    )
}

export function AdminThemeContainerInputs({info, theme}) {

    const startIndex = info.title === "Контактная информация" ? 2 : 6;
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
            <div className="admin__theme-title">{info.title}</div>
            <div className="admin__theme-inputs-container">
                {info.inputs.map((inputInfo, index) => (
                    <AdminThemeInput info={inputInfo}
                                     theme={theme}
                                     inputId={index + startIndex}
                                     key={index}/>
                ))}
            </div>
        </div>
    )
}

export function AdminThemeInput({info, theme, id, inputId, style = {}, inputStyle = {}}) {
    const {control} = useFormContext();

    let name = "";
    const dataField = info.fieldName ? info.fieldName : (info.title).toLowerCase();

    switch (theme) {
        case "orgs":
            name = `${theme}[${id}].${dataField}`;
            break;
        case "name":
            name = `city.name`
            break;
        case "contacts":
            name = `city.${dataField}`
            break;
        case "workTime":
            name = `city.${dataField}`
            break;
        case "specialists":
            name = `${theme}[${id}].${dataField}`
            break;
        case "coords":
            name = `city.coordinates`
            break;
    }

    return (
        <div className="admin__theme-input-container">
            <div className="admin__theme-input-name" style={style}>{info.title}</div>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <input {...field}
                           style={inputStyle}
                           key={inputId}
                           type="text"
                           className="admin__theme-input-textedit"
                           placeholder={info.title}/>
                )}>

            </Controller>
        </div>
    )
}