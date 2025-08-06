(() => {
  const refs = {
    openModalBtn: document.querySelector("[openModalBtn]"),
    closeModalBtn: document.querySelector("[closeModalBtn]"),
    modal: document.querySelector("[modal]"),
    backdrop: document.querySelector("[modalBackdrop]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.backdrop.classList.toggle("is-hidden");
  }
})();
