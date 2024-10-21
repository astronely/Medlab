import {useEffect, useRef, useState} from "react";

export function AdminThemeContainerFiles({info}) {
    const [uploadedFiles, setUploadedFiles] = useState(null);
    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = (event) => {
        event.preventDefault();
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
                    <div onClick={handleClick}
                         onDragOver={handleDragOver}
                         onDrop={handleDrop}
                         className="admin__theme-input-file">
                        {uploadedFiles && uploadedFiles.length !== 0 ?
                            Array.from(uploadedFiles).map((file, index) => <div key={index}>{file.name}</div>)
                            : info.placeholder}
                        <input type='file' onChange={onInputChange}
                               multiple hidden ref={inputRef}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export function AdminThemeContainerInputs({info}) {

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
            <div className="admin__theme-title">{info.title}</div>
            <div className="admin__theme-inputs-container">
                {info.inputs.map((inputInfo, index) => (
                    <AdminThemeInput info={inputInfo} key={index}/>
                ))}
            </div>
        </div>
    )
}

export function AdminThemeContainerOrgs({info}) {
    const [orgBoxes, setOrgBoxes] = useState([]);
    const [counter, setCounter] = useState(0);

    const onClickAdd = () => {
        setOrgBoxes(orgBoxes => [...orgBoxes, {
            id: counter,
            name: counter,
            address: "",
            telephone: "",
            email: ""
        }])
        setCounter(prevState => prevState + 1)
    }

    const onClickDelete = (id) => {
        console.log("delete id:", id)
        console.log("array before: ", orgBoxes)

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
        {title: "Название", placeholder: info.name},
        {title: "Адрес", placeholder: "Адрес"},
        {title: "Телефон", placeholder: "Телефон"},
        {title: "Почта", placeholder: "Почта"}
    ]

    console.log("id:", id)
    return (
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
            <div className="admin__theme-orgs-inputs">
                {inputsInfo.map((inputInfo, index) => (
                    <AdminThemeInput info={inputInfo} id={4 * id + index} key={index}/>
                ))}
            </div>
            <div style={{width: "fit-content"}} onClick={() => onClickDelete(info.id)}>
                <img style={{width: "48px"}} src="/src/assets/admin/remove.svg" alt="remove box"/>
            </div>
        </div>
    )
}

export function AdminThemeInput({info, id, style = {}, inputStyle={}}) {

    return (
        <div className="admin__theme-input-container">
            <div className="admin__theme-input-name" style={style}>{info.title}</div>
            <input style={inputStyle} key={id} type="text" className="admin__theme-input-textedit" placeholder={info.placeholder}/>
        </div>
    )
}

export function AdminThemeContainerSpecialists({info}) {
    const [specialists, setSpecialists] = useState([]);
    const [counter, setCounter] = useState(0);

    const onClickAdd = () => {
        setSpecialists(specialists => [...specialists, {
            id: counter,
            name: specialists.length,
            experience: ["job1, 2 years", "job2, 3years"]
        }]);
        setCounter(prevState => prevState + 1);
    }

    const onClickDelete = (id) => {
        console.log("ID TO DELETE: ", id)
        setSpecialists(specialists.filter((item) => item.id !== id))
    }

    return (
        <div className="admin__theme-specialists-container">
            <div className="admin__theme-title">{info.title} <img onClick={onClickAdd} src="/src/assets/admin/add.svg"
                                                                  alt="add box"/></div>
            <div className="admin__theme-specialists-list">
                {specialists.map((specialist, index) => (
                    <AdminThemeSpecialist info={specialist} onClickDelete={() => onClickDelete(specialist.id)} key={index}/>
                ))}
            </div>
        </div>
    )
}

function AdminThemeSpecialist({info, onClickDelete}) {

    return (
        <div className="admin__theme-specialist">
            <img onClick={onClickDelete} src="/src/assets/admin/remove.svg" alt="add box"/>
            <AdminThemeInput info={{title: "ФИО", placeholder: "Фамилия"}} id={info.id*2} key={info.id * 2}/>
            <AdminThemeInput info={{title: "Специальность, стаж", placeholder: "Список через запятую"}}
                             id={info.id*2+1}
                             key={info.id * 2+1}
                             inputStyle={{height: "150px"}}/>
        </div>
    )
}