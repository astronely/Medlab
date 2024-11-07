import "./modal/modal.scss"
import "./styles/admin.scss"
import Button from "./ui/Button.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useApp} from "../hooks/useApp.js";

export default function AdminLogin() {
    const navigate = useNavigate();
    const {serverAddress} = useApp();
    // const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            login: '',
            password: ''
        }
    })

    const submitHandler = async data => {
        await axios.post(`${serverAddress}/api/admin/login`, data)
            .then(response => {
                if (response.status === 200) {
                    navigate("/adminPanelPage", {replace: true})
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="admin__login-container">
                <div className="admin__login-content">
                    <div className="admin__login-label">
                        <div className="admin__login-title">MedLab</div>
                        <div className="admin__login-text">Панель управления</div>
                    </div>
                    <div className="admin__login-inputs">
                        <input {...register("login")} className="admin__login-input" placeholder="Логин" type="text" maxLength={100}/>
                        <input {...register("password")} className="admin__login-input" placeholder="Пароль" type="password" maxLength={100}/>
                    </div>
                    <Button className="admin__login-button" buttonText="Войти"/>
                </div>
            </div>
        </form>
    )
}