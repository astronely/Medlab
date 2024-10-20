import {Container} from "react-bootstrap";
import "./styles/admin.scss"

export default function AdminPanel() {

    return (
        <Container>
            <div className="admin__panel-container">
                <div className="admin__panel-city">
                    <div className="admin__panel-header">
                        <div className="admin__panel-header-title">Выберите город</div>
                        <div className="admin__panel-header-image"><img className="admin__panel-image"
                                                                        src="/src/assets/admin/Pencil.svg"
                                                                        alt="Edit button"/></div>
                    </div>
                </div>
                <div className="admin__panel-divider" />
                <div style={{width: "65%"}} className="admin__panel-edit">
                    <div className="admin__panel-header">
                        <div className="admin__panel-header-title">Панель редактирования</div>
                        <div className="admin__panel-header-image">Сохранить<img src="/src/assets/admin/Save.svg"
                                                                        alt="Edit button"/></div>
                    </div>
                </div>
            </div>
        </Container>
    )
}