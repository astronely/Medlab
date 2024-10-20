import FeedbackModal from "./FeedbackModal.jsx";
import {useModal} from "../../hooks/useModal.js";
import CityModal from "./CityModal.jsx";

export function ModalManager() {
    const {modal} = useModal();
    return (
        <>
            <FeedbackModal open={modal === 'feedback'} />
            <CityModal open={modal === 'chooseCity'} />
        </>
    )
}