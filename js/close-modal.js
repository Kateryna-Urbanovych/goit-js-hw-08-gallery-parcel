import { refs } from './index.js';
import onCloseModalByOverlayClick from './close-modal-overlay.js';
import onCloseModalByEscKeyDown from './close-modal-esc.js';

// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
export default function onCloseModal() {
    refs.modalContainer.classList.remove('is-open');

    // Очистка значения атрибута src элемента img.lightbox__image.
    refs.modalImage.removeAttribute('src');
    refs.modalImage.removeAttribute('alt');
    // console.log(refs.modalImage.attributes);

    refs.modalBthClose.removeEventListener('click', onCloseModal);
    refs.modalOverlay.removeEventListener('click', onCloseModalByOverlayClick);
    window.removeEventListener('keydown', onCloseModalByEscKeyDown);
}
