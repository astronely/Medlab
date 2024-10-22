import {useRef, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";

export function AdminThemeContainerFiles({info, theme, id}) {
    const {control} = useFormContext();

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event, onChange) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        onChange(files);
        setUploadedFiles(event.dataTransfer.files)
    }

    const onInputChange = (event) => {
        if (event.target.files.length !== 0) {
            setUploadedFiles(event.target.files)
        }
    }

    return (
        <>
            <div className="admin__theme-files-container">
                <div className="admin__theme-title">{info.title}</div>
                <div className="admin__theme-edit">
                    <div className="admin__theme-text">{info.text}</div>
                    <Controller
                        name={`${theme}.${id}`}
                        control={control}
                        render={({field: {onChange}}) => (
                            <div onClick={handleClick}
                                 onDragOver={handleDragOver}
                                 onDrop={(e) => handleDrop(e, onChange)}
                                 className="admin__theme-input-file">
                                {uploadedFiles.length !== 0 ?
                                    Array.from(uploadedFiles).map((file, index) => <div key={index}>{file.name}</div>)
                                    : info.placeholder}
                                <input type='file'
                                       onChange={(e) => {
                                           onInputChange(e)
                                           onChange(Array.from(e.target.files))
                                       }}
                                       multiple hidden ref={inputRef}
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
    const startIndex = 7;

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
                                          specialistBoxId={index + startIndex}
                                          onClickDelete={onClickDelete}
                                          key={index + startIndex}/>
                ))}
            </div>
        </div>
    )
}

function AdminThemeSpecialist({info, specialistBoxId, onClickDelete}) {
    const id = info.id;

    const inputsInfo = [
        {title: "ФИО", placeholder: "Фамилия"},
        {title: "Специальность и стаж", placeholder: "Список через запятую"}
    ]

    return (
        <div className="admin__theme-specialist">
            <img onClick={() => onClickDelete(info.id)}
                 src="/src/assets/admin/remove.svg"
                 alt="add box"/>

            {inputsInfo.map((item, index) => (
                <AdminThemeInput info={item}
                                 theme="specialists"
                                 id={id}
                                 inputId={id * 2 + index}
                                 key={id * 2 + index}
                                 inputStyle={index === 0 ? {} : {height: "150px"}}/>
            ))}
        </div>
    )
}

export function AdminThemeContainerInputs({info}) {

    const theme = info.title === "Контактная информация" ? "contacts" : "workTime";
    const startIndex = info.title === "Контактная информация" ? 1 : 5;
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
    switch (theme) {
        case "orgs":
            name = `${theme}[${id}].${(info.title).toLowerCase()}`;
            break;
        case "city":
            name = `${theme}`
            break;
        case "contacts":
            name = `${theme}.${(info.title).toLowerCase()}`
            break;
        case "workTime":
            name = `${theme}.${(info.title).toLowerCase()}`
            break;
        case "specialists":
            name = `${theme}[${id}].${(info.title).toLowerCase()}`
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
                           placeholder={inputId}/>
                )}>

            </Controller>
        </div>
    )
}