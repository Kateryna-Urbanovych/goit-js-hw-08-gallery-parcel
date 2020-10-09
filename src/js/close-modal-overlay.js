import onCloseModal from './close-modal.js';
// Закрытие модального окна по клику на div.lightbox__overlay.
export default function onCloseModalByOverlayClick(event) {
    if (event.target === event.currentTarget) {
        onCloseModal();
    }
}
