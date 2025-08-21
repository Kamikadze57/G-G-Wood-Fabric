export function getModal() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    orderModalBtn: document.querySelector('[data-modal-btn]'),
    modalContent: document.querySelector('.modal__content'),
    modalContainer: document.querySelector('.product-card__modal'),
  };

  refs.openModalBtn.addEventListener(
    'click',
    _.debounce(() => {
      toggleModal();
    }, 300)
  );

  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    refs.closeModalBtn.classList.toggle('visually-hidden');
    document.body.classList.toggle('no-scroll');
  }

  refs.orderModalBtn.addEventListener('click', changeModal);

  function changeModal() {
    refs.modalContent.classList.toggle('visually-hidden');
    refs.modalContainer.innerHTML += `
      <div class="gratitude__container">
        <img src="../images/modal__img.png" alt="interior" class="product-card__img" />
        <h2 class="product-card__title">Дякуємо за заявку</h2>
        <p class="product-card__headline">
          Наші спеціалісти зателефонують Вам найближчим часом.
        </p>
        <button 
          onclick="window.location.href='/src/index.html'" 
          type="button" 
          class="button product-card__btn--order gratitude__btn">
          На головну
        </button>
      </div>`;
  }
}
