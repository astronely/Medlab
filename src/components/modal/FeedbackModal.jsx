import {Modal} from "./Modal.jsx";
import Button from "../ui/Button.jsx";
import {useState} from "react";

export default function FeedbackModal({open = false}) {

    const [isError, setIsError] = useState(false);

    return (
        <Modal open={open}>
            <form className="modal__form">
                <div className="modal__label">
                    <div className="modal__label-title">Нужна помощь?</div>
                    <div className="modal__label-text">Оставьте заявку,
                        и наши специалисты очень скоро вам ответят!
                    </div>
                </div>
                <div className="modal__input-side">
                    <input className="modal__input" placeholder="Ваше имя" type="text" maxLength={100}/>
                    <input className="modal__input" placeholder="Номер телефона" type="text" maxLength={12}/> {/*TODO: telephone validation */}
                    <div className="modal__input-button">
                        {isError ? <div className="modal__input-error">Пожалуйста, заполните форму корректно</div> : <></>}
                        <Button className="modal__input-button-style" buttonText="Отправить"/>
                    </div>
                </div>
            </form>
        </Modal>
    )
}