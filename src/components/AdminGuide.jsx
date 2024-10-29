import React from 'react';
import './styles/adminGuide.scss';

// TODO: Поставить правильные размеры в описании изображений
const AdminGuide = () => (
    <div className="admin-guide">
        <h2 className="admin-guide__header">Методичка по использованию Админ-панели</h2>

        {/* General Information Section */}
        <div className="admin-guide__section">
            <h3 className="admin-guide__section-title">Раздел "Общая информация"</h3>
            <ul className="admin-guide__list">
                <li className="admin-guide__list-item">
                    <strong>Правовая информация</strong> – поле для загрузки документов, отображаемых в разделе
                    "Правовая информация".
                </li>
                <li className="admin-guide__list-item">
                    <strong>О нас</strong> – поле для загрузки документов, отображаемых в разделе "О нас" (медицинские
                    постановления, доп. данные и т.п.).
                </li>
                <li className="admin-guide__list-item">
                    <strong>Контролирующие органы</strong> – раздел, отображаемый в разделе "О нас". Поля для
                    заполнения: название, адрес, телефон, почта.
                </li>
                <li className="admin-guide__list-item">
                    <strong>Добавление изображений к главной странице</strong> – изображения прикрепляются в 6 различных
                    форматах для корректного отображения на всех экранах:
                    <ul className="admin-guide__list">
                        <li className="admin-guide__list-item"><strong>XXL</strong> - 1920x1080px</li>
                        <li className="admin-guide__list-item"><strong>XL</strong> - 1920x1080px</li>
                        <li className="admin-guide__list-item"><strong>LG</strong> - 1920x1080px</li>
                        <li className="admin-guide__list-item"><strong>MD</strong> - 1920x1080px</li>
                        <li className="admin-guide__list-item"><strong>SM</strong> - 1920x1080px</li>
                        <li className="admin-guide__list-item"><strong>XS</strong> - 1920x1080px</li>
                    </ul>
                    При необходимости изменить хотя бы одно изображение, требуется загрузить все 6.
                </li>
            </ul>
        </div>

        {/* City Section */}
        <div className="admin-guide__section">
            <h3 className="admin-guide__section-title">Раздел "Город"</h3>
            <ul className="admin-guide__list">
                <li className="admin-guide__list-item"><strong>Название города</strong></li>
                <li className="admin-guide__list-item"><strong>Адрес для карт</strong>  (формат:
                    координаты через точку с запятой, пример: 58.58454;68.45459)</li>
                <li className="admin-guide__list-item"><strong>VK</strong> (ссылка на страницу)</li>
                <li className="admin-guide__list-item"><strong>Почта</strong></li>
                <li className="admin-guide__list-item"><strong>Телефон</strong></li>
                <li className="admin-guide__list-item"><strong>Адрес</strong> (формат: текст, пример: г.
                    Челябинск, проспект Ленина 20)</li>
                <li className="admin-guide__list-item"><strong>Время работы</strong> (формат: будние
                    дни;выходные, пример: 16:00-18:00;15:00-19:00)</li>
                <li className="admin-guide__list-item"><strong>Цены</strong> (прикрепляются как файлы)
                </li>
                <li className="admin-guide__list-item">
                    <strong>Специалисты</strong>:
                    <ul className="admin-guide__list">
                        <li className="admin-guide__list-item">ФИО</li>
                        <li className="admin-guide__list-item">Специальность, стаж (формат: специализация, стаж через точку с запятой, пример: Аллерголог, стаж 15 лет; Пульмонолог, стаж 4 года)</li>
                        <li className="admin-guide__list-item">Фотография (рекомендуемый формат: 360x360; при отсутствии изображения используется запасное)</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
);

export default AdminGuide;
