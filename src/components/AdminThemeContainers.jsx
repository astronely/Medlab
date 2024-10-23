import {useRef, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";

export function AdminThemeContainerFiles({
                                             info,
                                             theme,
                                             id,
                                             inputId,
                                             keyForFilePosition = 0,
                                             classNameInput = null,
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
            name = `${theme}[${id}].${keyForFilePosition}`
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
                                className={classNameInput ? classNameInput : "admin__theme-input-file"}>

                                {value && value.length !== 0 ? (
                                    value.map((file, index) => (
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
            name: "",
            address: "",
            telephone: "",
            email: ""
        }])
        setCounter(prevState => prevState + 1)
    }

    const onClickDelete = (id) => {
        // console.log("delete id:", id)
        methods.unregister(`orgs.${id}`)
        setOrgBoxes(orgBoxes.filter((item) => item.id !== id));
    }

    return (
        <div className="admin__theme-orgs-container">
            <div className="admin__theme-title">
                {info.title} <img onClick={onClickAdd} src="/src/assets/admin/add.svg" alt="add box"/>
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
        {title: "Название", placeholder: id},
        {title: "Адрес", placeholder: "Адрес"},
        {title: "Телефон", placeholder: "Телефон"},
        {title: "Почта", placeholder: "Почта"}
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
                <img style={{width: "48px"}} src="/src/assets/admin/remove.svg" alt="remove box"/>
            </div>
        </div>
    )
}

export function AdminThemeContainerSpecialists({info, methods}) {
    const [specialists, setSpecialists] = useState([]);
    const [counter, setCounter] = useState(0);
    const startIndex = 8;

    const onClickAdd = () => {
        setSpecialists(specialists => [...specialists, {
            id: counter,
            name: specialists.length,
            experience: ["job1, 2 years", "job2, 3years"]
        }]);
        setCounter(prevState => prevState + 1);
    }

    const onClickDelete = (id) => {
        // console.log("ID TO DELETE: ", id)
        methods.unregister(`specialists.${id}`)
        setSpecialists(specialists.filter((item) => item.id !== id))
    }

    return (
        <div className="admin__theme-specialists-container">
            <div className="admin__theme-title">{info.title} <img onClick={onClickAdd} src="/src/assets/admin/add.svg"
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
        {title: "ФИО", placeholder: "Фамилия"},
        {text: "Фотография", placeholder: "Прикрепите файлы сюда"},
        {title: "Специальность и стаж", placeholder: "Список через запятую"},
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
                                       theme="specialists"
                                       id={id}
                                       inputId={id * 3 + index}
                                       key={id * 3 + index}
                                       inputStyle={index === 2 ? {height: "150px"} : {}}/>
            ))}
            <img onClick={() => onClickDelete(info.id)}
                 src="/src/assets/admin/remove.svg"
                 alt="remove box"/>
        </div>
    )
}

export function AdminThemeContainerPictures({info, methods}) {
    const [pictures, setPictures] = useState([]);
    const [counter, setCounter] = useState(0);
    const startIndex = 2;

    const onClickAdd = () => {
        setPictures(pictures => [...pictures, {
            id: counter,
            name: pictures.length,
        }]);
        setCounter(prevState => prevState + 1);
    }

    const onClickDelete = (id) => {
        console.log("ID: ", id)
        methods.unregister(`mainPictures.${id}`)
        setPictures(pictures.filter((item) => item.id !== id))
    }

    return (
        <div className="admin__theme-specialists-container">
            <div className="admin__theme-title">{info.title} <img onClick={onClickAdd} src="/src/assets/admin/add.svg"
                                                                  alt="add box"/></div>
            <div className="admin__theme-specialists-list">
                {pictures.map((picture, index) => (
                    <AdminThemePicture info={picture}
                                       onClickDelete={onClickDelete}
                                       key={index + startIndex}/>
                ))}
            </div>
        </div>
    )
}

function AdminThemePicture({info, onClickDelete}) {
    const id = info.id;

    const picturesInputInfo = [
        {text: "Формат xxl", placeholder: "Прикрепите изображение"},
        {text: "Формат xl", placeholder: "Прикрепите изображение"},
        {text: "Формат lg", placeholder: "Прикрепите изображение"},
        {text: "Формат md", placeholder: "Прикрепите изображение"},
        {text: "Формат sm", placeholder: "Прикрепите изображение"},
        {text: "Формат xs", placeholder: "Прикрепите изображение"},
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
            <img onClick={() => onClickDelete(info.id)}
                 src="/src/assets/admin/remove.svg"
                 alt="remove box"/>
        </div>
    )
}

export function AdminThemeContainerInputs({info}) {

    const theme = info.title === "Контактная информация" ? "contacts" : "workTime";
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

    // TODO: Сделать нормальные name за место info.title
    let name = "";
    switch (theme) {
        case "orgs":
            name = `${theme}[${id}].${(info.title).toLowerCase()}`;
            break;
        case "city":
            name = `${theme}.name`
            break;
        case "contacts":
            name = `${theme}.${(info.title).toLowerCase()}`
            break;
        case "workTime":
            name = `${theme}.${(info.title).toLowerCase()}`
            break;
        case "specialists":
            name = `${theme}[${id}].${(info.title).toLowerCase()}`
            break;
        case "coords":
            name = `city.coords`
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
                           placeholder={info.placeholder}/>
                )}>

            </Controller>
        </div>
    )
}