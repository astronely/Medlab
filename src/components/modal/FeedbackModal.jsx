import {Modal} from "./Modal.jsx";
import Button from "../ui/Button.jsx";
import {useState} from "react";
import {useModal} from "../../hooks/useModal.js";
import InputMask from "react-input-mask"

export default function FeedbackModal({open = false}) {

    const [isError, setIsError] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });
    const {setIsActive} = useModal();
    const formSubmitEmail = import.meta.env.VITE_FORM_SUBMIT_EMAIL;
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!formData.name || !formData.phone) {
            setIsError(true);
            return;
        }

        setIsError(false);

        try {
            console.log("request_send");
            setIsActive(false);
            const response = await fetch(`https://formsubmit.co/ajax/${formSubmitEmail}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                },
                body: new URLSearchParams({
                    name: formData.name,
                    phone: formData.phone
                }).toString()
            });

            if (response.ok) {
                setFormData({ name: "", phone: "" }); // Clear form
            } else {
                throw new Error("Failed to send the message");
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    };

    return (
        <Modal open={open}>
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__label">
                    <div className="modal__label-title">Нужна помощь?</div>
                    <div className="modal__label-text">
                        Оставьте заявку, и наши специалисты очень скоро вам ответят!
                    </div>
                </div>
                <div className="modal__input-side">
                    <input
                        className="modal__input"
                        placeholder="Ваше имя"
                        type="text"
                        name="name"
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <InputMask
                        mask="+7 (999) 999-99-99"
                        value={formData.phone}
                        onChange={handleChange}
                    >
                        {(inputProps) => (
                            <input
                                {...inputProps}
                                className="modal__input"
                                placeholder="+7 (___) ___-__-__"
                                type="text"
                                name="phone"
                                required
                            />
                        )}
                    </InputMask>
                    <div className="modal__input-button">
                        {isError && (
                            <div className="modal__input-error">
                                Пожалуйста, заполните форму корректно
                            </div>
                        )}
                        <Button
                            className="modal__input-button-style"
                            buttonText="Отправить"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </Modal>
    )
}