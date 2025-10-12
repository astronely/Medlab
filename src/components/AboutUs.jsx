import BoxDividerV from "./BoxDividerV.jsx";
import {Container} from "react-bootstrap";
import BoxDividerLink from "./BoxDividerLink.jsx";
import BoxDiamondLink from "./BoxDiamondLink.jsx";
import "./styles/aboutMedia.scss"
import "./styles/about.scss"
import {useEffect, useState} from "react";
import {getAddress, getInfo, getLinks} from "../utils/getInfo.js";
import {useApp} from "../hooks/useApp.js";

export default function AboutUs() {
    const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    const serverAssetsFolder = `${serverAddress}/mdlbassets/aboutUs`;
    const [cityData, setCityData] = useState({});
    const {currentCity} = useApp();
    const [links, setLinks] = useState([]);
    const [authorities, setAuthorities] = useState([]);
    const [clinicAddress, setClinicAddress] = useState("______________________");

    useEffect(() => {
        setLinks([]);
        setAuthorities([]);
        getLinks(links, setLinks, "about", serverAssetsFolder).catch(err => console.log(err));
        getInfo(setAuthorities, "authority").catch(err => console.log(err))
        getAddress(setClinicAddress, currentCity.replace("г. ", "")).catch(err => console.log(err));
    }, [currentCity])

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getCityInfo(currentCity);
            // console.log("CITY DATA: ", fetchedData)
            setCityData(fetchedData[0]);
            // console.log("CITY DATA: ", cityData)
        }
        fetchData().catch(err => console.log(err))
    }, [currentCity])

    const aboutUsInfo = {
        title: "О нас",
        text: "Наша клиника — это современный медицинский центр, работающий в соответствии\n" +
            "с действующими стандартами и нормативами здравоохранения.\n" +
            "Мы строго соблюдаем все медицинские постановления и поддерживаем актуальность нашей информации\n" +
            "в государственных реестрах. Ознакомьтесь с юридической информацией и официальными документами ниже."
    }

    const documentInfo = {
        title: "Документы",
        text: "Этот раздел отражает суть представленных документов, включая правила," +
            " договоры и инструкции, касающиеся как услуг," +
            " так и подготовки к медицинским исследованиям"
    }

    const authoritiesInfo = {
        title: "Адреса и контакты контролирующих органов",
        authorities: authorities
    }

    const contactInfo = {
        text: `Общество с ограниченной ответственностью «МЕДЛАБ74» ИНН 7457012008  КПП 745701001 ОГРН 1217400040660
р/с 40702810872000042759
ПАО СБЕРБАНК
к/с 30101810700000000602 БИК 047501602

Юридический адрес: 456020, Челябинская область, Ашинский р-н, г Сим, ул Пушкина, д. 9, помещение 2

Адрес клиники в городе: ${clinicAddress}

e-mail: medlab74@mail.ru
телефон: ${cityData.phone}

Лицензирующий орган: Министерство здравоохранения Челябинской области
Телефон: +7 (351) 240-22-22
Адрес: Улица Кирова 165, Челябинск
Дата предоставления лицензии: 15.04.2022
Регистрационный номер лицензии: Л041-01141-45/00145516`
    }

    const contactInfoAsha = {
        text: "Общество с ограниченной ответственностью «БИОЛИНИЯ»\n" +
            "456014, Челябинская область, город Аша, ул. Ленина, д. 19, пом. 2\n" +
            "ИНН 7424031904, КПП 742401001     ОГРН 1147424000316\n" +
            "Р/сч. 40702810372000011086                      в ПАО «Сбербанк»\n" +
            "К/сч.30101810700000000602\n" +
            "БИК 047501602\n" +
            "Лицензия № Л041-01024-74/03147950 от 09.09.2025\n" +
            "Директор Хайсамова Римма Закировна\n" +
            "действует на основании Устава\n\n" +
            "Адрес клиники в городе: " + clinicAddress + "\n\n" +
            "e-mail: medlab74@mail.ru\n" +
            "телефон: " + cityData.phone
    }

    return (
        <Container>
            <div className="about__container">
                <BoxDividerV info={aboutUsInfo}/>
                <div className="about__main-content">
                    <div className="about__legal-info about__main-content-item">
                        <BoxDividerV info={documentInfo} dividerUpper={false}/>
                        <BoxDividerLink links={links}/>
                    </div>
                    <div className="about__links about__main-content-item">
                        <BoxDividerV isDivider={false} isText={false} info={authoritiesInfo}/>
                        <BoxDiamondLink isAddresses={true} info={authoritiesInfo.authorities}/>
                    </div>
                    <div className="about__main-content-item">
                        <BoxDividerV style={{color: "var(--secondary-black)", whiteSpace: "pre-wrap", fontSize: "1rem"}}
                                     isTitle={false}
                                     info={currentCity === "Аша" ? contactInfoAsha : contactInfo}
                                     dividerUpper={false}/>
                    </div>
                </div>
            </div>
        </Container>
    )
}