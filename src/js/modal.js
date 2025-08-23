export function getModal() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    orderModalBtn: document.querySelector('[data-modal-btn]'),
    modalContent: document.querySelector('.modal__content'),
    modalBox: document.querySelector('.gratitude__box'),
  };

  const imgUrl = new URL('../images/modal_img.jpg', import.meta.url).href;

  refs.openModalBtn.addEventListener(
    'click',
    _.debounce(() => {
      refs.modal.classList.toggle('is-hidden');
      refs.closeModalBtn.classList.toggle('visually-hidden');
      document.body.classList.toggle('no-scroll');
    }, 300)
  );

  refs.closeModalBtn.addEventListener('click', () => {
    refs.modal.classList.toggle('is-hidden');
    refs.closeModalBtn.classList.toggle('visually-hidden');
    document.body.classList.toggle('no-scroll');
    refs.modalBox.innerHTML = '';
    refs.modalBox.classList.add('visually-hidden');
    refs.modalContent.classList.remove('visually-hidden');
  });

  refs.orderModalBtn.addEventListener('click', () => {
    refs.modalContent.classList.add('visually-hidden');
    refs.modalBox.classList.remove('visually-hidden');
    refs.modalBox.innerHTML = `
      <img class="gratitude__background" src="${imgUrl}" alt="Дякуємо за заявку">
      <h2 class="product-card__title gratitude__title">Дякуємо за заявку</h2>
      <p class="product-card__headline">Наші спеціалісти зателефонують Вам протягом найближчих 15 хвилин.</p>
      <button onclick="window.location.href='/src/index.html'" type="button" class="button product-card__btn--order gratitude__btn">На головну</button>
    `;
  });
}
