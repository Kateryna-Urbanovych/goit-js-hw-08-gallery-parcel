import { refs } from '../index.js';
import onCloseModal from './close-modal.js';
import onCloseModalByOverlayClick from './close-modal-overlay.js';
import onCloseModalByEscKeyDown from './close-modal-esc.js';

export default function onOpenModal(event) {
    event.preventDefault();

    if (!event.target.classList.contains('gallery__image')) {
        // или event.target.nodeName !== 'IMG'
        return;
    }

    // Получение url большого изображения.
    const galleryImage = event.target;
    // console.log(galleryImage.dataset.source);
    // console.log(galleryImage.alt);

    // Открытие модального окна по клику на элементе галереи.
    refs.modalContainer.classList.add('is-open');

    // Подмена значения атрибута src элемента img.lightbox__image
    refs.modalImage.src = galleryImage.dataset.source;
    refs.modalImage.alt = galleryImage.alt;

    refs.modalBthClose.addEventListener('click', onCloseModal);
    refs.modalOverlay.addEventListener('click', onCloseModalByOverlayClick);
    window.addEventListener('keydown', onCloseModalByEscKeyDown);
}
