import FeedbackModal from "./FeedbackModal.jsx";
import {useModal} from "../../hooks/useModal.js";

export function ModalManager() {
    const {modal} = useModal();
    return (
        <>
            <FeedbackModal open={modal === 'feedback'} />
        </>
    )
}