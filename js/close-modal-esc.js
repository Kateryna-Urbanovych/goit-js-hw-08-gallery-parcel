// Закрытие модального окна по нажатию клавиши ESC.
export default function onCloseModalByEscKeyDown(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}
