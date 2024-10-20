import "./modal/modal.scss"
import "./styles/admin.scss"
import Button from "./ui/Button.jsx";

export default function AdminLogin() {

    return (
        <div className="admin__login-container">
            <div className="admin__login-content">
                <div className="admin__login-label">
                    <div className="admin__login-title">MedLab</div>
                    <div className="admin__login-text">Панель управления</div>
                </div>
                <div className="admin__login-inputs">
                    <input className="admin__login-input" placeholder="Логин" type="text" maxLength={100}/>
                    <input className="admin__login-input" placeholder="Пароль" type="password" maxLength={100}/>
                </div>
                <Button className="admin__login-button" buttonText="Войти"/>
            </div>
        </div>
    )
}