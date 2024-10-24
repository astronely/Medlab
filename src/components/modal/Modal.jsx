import './modal.scss'
import {useModal} from "../../hooks/useModal.js";
import Cross from "/src/assets/cross.svg"

export function Modal({children, open}) {
    const {isActive, setIsActive} = useModal();
    return (
        <div className={isActive && open ? 'modal active' : 'modal'} onClick={() => setIsActive(false)}>
            <div className={isActive && open ? 'modal__content active' : 'modal__content'}
                 onClick={e => e.stopPropagation()}>
                <div className="modal__cross">
                    <img className="modal__cross-image" src={Cross}
                         alt="Cross"
                    onClick={() => setIsActive(false)}/>
                </div>
                {children}
            </div>
        </div>
    )
}