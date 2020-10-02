import galleryItems from './gallery-items.js';

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

const refs = {
    galleryContainer: document.querySelector('.js-gallery'),
    modalContainer: document.querySelector('.js-lightbox'),
    modalImage: document.querySelector('.lightbox__image'),
    modalBthClose: document.querySelector(
        'button[data-action="close-lightbox"]',
    ),
    modalOverlay: document.querySelector('.lightbox__overlay'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

refs.galleryContainer.addEventListener('click', onOpenModal);

function createGalleryMarkup(gallery) {
    return gallery
        .map(({ preview, original, description }) => {
            return `
            <li class="gallery__item">
                <a 
                class="gallery__link"
                href="${original}"
                >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
                </a>
            </li>
            `;
        })
        .join('');
}

// Реализация делегирования на галерее ul.js - gallery.

function onOpenModal(event) {
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

function onCloseModal() {
    // Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
    refs.modalContainer.classList.remove('is-open');

    // Очистка значения атрибута src элемента img.lightbox__image.
    refs.modalImage.removeAttribute('src');
    refs.modalImage.removeAttribute('alt');
    // console.log(refs.modalImage.attributes);

    refs.modalBthClose.removeEventListener('click', onCloseModal);
    refs.modalOverlay.removeEventListener('click', onCloseModalByOverlayClick);
    window.removeEventListener('keydown', onCloseModalByEscKeyDown);
}

// Закрытие модального окна по клику на div.lightbox__overlay.
function onCloseModalByOverlayClick(event) {
    if (event.target === event.currentTarget) {
        onCloseModal();
    }
}

// Закрытие модального окна по нажатию клавиши ESC.
function onCloseModalByEscKeyDown(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}
