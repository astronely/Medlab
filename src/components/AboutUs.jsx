import BoxDividerV from "./BoxDividerV.jsx";
import {Container} from "react-bootstrap";
import BoxDividerLink from "./BoxDividerLink.jsx";
import BoxDiamondLink from "./BoxDiamondLink.jsx";
import "./styles/aboutMedia.scss"
import "./styles/about.scss"

export default function AboutUs() {

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
            " договоры и 3333333333333333 инструкции, касающиеся как услуг," +
            " так и подготовки к медицинским исследованиям"
    }

    const links = [
        {name: "Link 1", href: "#"},
        {name: "Link 2", href: "#"},
        {name: "Link 3", href: "#"},
        {name: "Link 4", href: "#"},
        {name: "Link 5", href: "#"},
    ] // TODO: links dependence from chosen city

    const addressesInfo = {
        title: "Адреса и контакты контроллирующих органов",
        addresses: [
            {name: "Тата", address: "Туту", telephone: "+7 (999) 999 88 77"},
            {name: "Тата", address: "Туту", telephone: "+7 (999) 999 88 77"},
            {name: "Тата", address: "Туту", telephone: "+7 (999) 999 88 77"}
        ]
    }

    const contactInfo = {
        INN: `Общество с ограниченной ответственностью «МЕДЛАБ74» ИНН 7457012008  КПП 745701001 ОГРН 1217400040660
            р/с 40702810872000042759
            ПАО СБЕРБАНК
            к/с 30101810700000000602 БИК 047501602`,
        legalAddress: `Юридический адрес: 456020, Челябинская область, Ашинский р-н, г Сим, ул Пушкина, д. 9, помещение 2`,
        address: `Адрес Клиники в Городе: ________________________________`,
        contacts: `e-mail: medlab74@mail.ru
            телефон: 89514895362`,
        director: `Директор: Герасименко Светлана Николаевна`,
        license: `Лицензия выдана Министерством здравоохранения Свердловской области`,
        globalContacts: `Адрес: 620014, г. Екатеринбург, ул. Вайнера, д. 34-б Телефон: +7 (343) 385-06-00, +7 (800) 100-01-53 `,
        text: `Общество с ограниченной ответственностью «МЕДЛАБ74» ИНН 7457012008  КПП 745701001 ОГРН 1217400040660
р/с 40702810872000042759
ПАО СБЕРБАНК
к/с 30101810700000000602 БИК 047501602

Юридический адрес: 456020, Челtябинская область, Ашинский р-н, г Сим, ул Пушкина, д. 9, помещение 2

Адрес Клиники в Городе: ________________________________

e-mail: medlab74@mail.ru
телефон: 89514895362

Директор: Герасименко Светлана Николаевна

Лицензия выдана Министерством здравоохранения Свердловской области

Адрес: 620014, г. Екатеринбург, ул. Вайнера, д. 34-б Телефон: +7 (343) 385-06-00, +7 (800) 100-01-53 `
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