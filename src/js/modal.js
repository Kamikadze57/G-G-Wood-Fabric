export function getModal() {
  // Знаходимо всі потрібні елементи DOM і зберігаємо їх у константах для зручності.
  const openModalBtn = document.querySelector('[data-modal-open]');
  const closeModalBtn = document.querySelector('[data-modal-close]');
  const modalBackdrop = document.querySelector('[data-modal]');
  const orderModalBtn = document.querySelector('[data-modal-btn]');
  const modalGratitude = document.querySelector('.gratitude__modal');
  const productCardModal = document.querySelector('.product-card__modal');

  // Якщо якогось елемента немає, ми виходимо з функції, щоб уникнути помилок.
  if (
    !openModalBtn ||
    !closeModalBtn ||
    !modalBackdrop ||
    !orderModalBtn ||
    !modalGratitude ||
    !productCardModal
  ) {
    return;
  }

  // Спільна функція для відкриття та закриття модального вікна.
  // Вона перемикає класи, які керують видимістю та прокруткою сторінки.
  const toggleModal = () => {
    modalBackdrop.classList.toggle('is-hidden');
    closeModalBtn.classList.toggle('visually-hidden');
    document.body.classList.toggle('no-scroll');
  };

  // Спільна функція для перемикання між вікнами.
  // Вона приховує одне вікно і показує інше.
  const swapModals = () => {
    productCardModal.classList.toggle('visually-hidden');
    modalGratitude.classList.toggle('visually-hidden');
  };

  // Додаємо обробники подій до кнопок.
  // При натисканні на кожну кнопку викликається відповідна функція.
  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', () => {
    toggleModal();
    // Додаткова дія при закритті:
    // Переконуємося, що вікно з подякою приховано, а вікно з продуктом видно.
    if (modalGratitude.classList.contains('visually-hidden')) {
      swapModals();
    }
  });
  orderModalBtn.addEventListener('click', swapModals);
}
