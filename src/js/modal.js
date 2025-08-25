export function getModal() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modalBackdrop: document.querySelector('[data-modal]'),
    orderModalBtn: document.querySelector('[data-modal-btn]'),

    modalGratitude: document.querySelector('.gratitude__modal'),
    productCardModal: document.querySelector('.product-card__modal'),
  };

  refs.openModalBtn.addEventListener(
    'click',
    _.debounce(() => {
      refs.modalBackdrop.classList.toggle('is-hidden');
      refs.closeModalBtn.classList.toggle('visually-hidden');
      document.body.classList.toggle('no-scroll');
    }, 300)
  );

  refs.closeModalBtn.addEventListener('click', () => {
    refs.modalBackdrop.classList.toggle('is-hidden');
    refs.closeModalBtn.classList.toggle('visually-hidden');
    document.body.classList.toggle('no-scroll');

    refs.productCardModal.classList.remove('visually-hidden');
    refs.modalGratitude.classList.add('visually-hidden');
  });

  refs.orderModalBtn.addEventListener('click', () => {
    refs.productCardModal.classList.add('visually-hidden');
    refs.modalGratitude.classList.remove('visually-hidden');
  });
}
