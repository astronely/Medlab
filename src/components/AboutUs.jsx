import BoxDividerV from "./BoxDividerV.jsx";
import {Container} from "react-bootstrap";
import BoxDividerLink from "./BoxDividerLink.jsx";
import BoxDiamondLink from "./BoxDiamondLink.jsx";
import "./styles/aboutMedia.scss"
import "./styles/about.scss"
import axios from "axios";
import {useEffect, useState} from "react";

export default function AboutUs() {
    const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`
    const serverAssetsFolder = `${serverAddress}/assets/aboutUs`;

    const [links, setLinks] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [clinicAddress, setClinicAddress] = useState("______________________");

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
            " договоры и 3 инструкции, касающиеся как услуг," +
            " так и подготовки к медицинским исследованиям"
    }

    const getLinks = async () => {
        setLinks([]);
        axios.get(`${serverAddress}/api/about/get`)
            .then(res => {
                console.log(res.data)
                for (let link of res.data) {
                    setLinks(links => [...links,
                        {
                            name: link.file_name,
                            link: `${serverAssetsFolder}/${link.file_name}`
                        }
                    ])
                }
            })
    }

    const addressesInfo = {
        title: "Адреса и контакты контроллирующих органов",
        addresses: [
            {
                name: "ТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТатаТата",
                address: "Туту",
                telephone: "+7 (999) 999 88 77"
            }, // TODO: do width limits for text
            {name: "Тата", address: "Туту", telephone: "+7 (999) 999 88 77"},
            {name: "Тата", address: "Туту", telephone: "+7 (999) 999 88 77"}
        ]
    }

    const contactInfo = {
        text: `Общество с ограниченной ответственностью «МЕДЛАБ74» ИНН 7457012008  КПП 745701001 ОГРН 1217400040660
р/с 40702810872000042759
ПАО СБЕРБАНК
к/с 30101810700000000602 БИК 047501602

Юридический адрес: 456020, Челtябинская область, Ашинский р-н, г Сим, ул Пушкина, д. 9, помещение 2

Адрес Клиники в Городе: ${clinicAddress}

e-mail: medlab74@mail.ru
телефон: 89514895362

Директор: Герасименко Светлана Николаевна

Лицензия выдана Министерством здравоохранения Свердловской области

Адрес: 620014, г. Екатеринбург, ул. Вайнера, д. 34-б Телефон: +7 (343) 385-06-00, +7 (800) 100-01-53 `
    }

    useEffect(() => {
        setLinks([])
        getLinks().catch(err => console.log(err))
    }, [])

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
                        <BoxDividerV isDivider={false} isText={false} info={addressesInfo}/>
                        <BoxDiamondLink isAddresses={true} info={addressesInfo.addresses}/>
                    </div>
                    <div className="about__main-content-item">
                        <BoxDividerV style={{color: "var(--secondary-black)", whiteSpace: "pre-wrap", fontSize: "1rem"}}
                                     isTitle={false}
                                     info={contactInfo}
                                     dividerUpper={false}/>
                    </div>
                </div>
            </div>
        </Container>
    )
}