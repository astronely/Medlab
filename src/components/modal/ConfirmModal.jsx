import {Modal} from './Modal.jsx';
import {useModal} from "../../hooks/useModal.js";
import '../modal/Modal.scss'
import Button from "../ui/Button.jsx";

export function ConfirmDeleteModal({open = false, deleteAction, item}) {
    const {setIsActive} = useModal();

    return (
        <Modal open={open}>
            <div className='modal__form'>
                <div className="modal__label">
                    <div className="modal__label-title">Вы уверены что хотите удалить город {item.name}?</div>
                </div>
                <div className='modal__input-side'>
                    <Button className='modal__input-button-style'
                            onClick={() => setIsActive(false)}
                            buttonText="Отменить"/>

                    <Button className='modal__input-button-style'
                            onClickAction={() => {
                                deleteAction(item.name);
                                setIsActive(false);
                            }}
                            buttonText="Удалить"/>
                </div>
            </div>
        </Modal>
    )
}