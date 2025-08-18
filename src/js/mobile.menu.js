const mobileBtn = document.querySelector('[mobileBtn]');
const mobileMenu = document.querySelector('[mobileMenu]');
const header = document.querySelector('[header]');

window.addEventListener('resize', () => {
  closeOnResize();
  setHeaderHeight();
});
mobileBtn.addEventListener('click', toggleMobile);

function setHeaderHeight() {
  const headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty(
    '--header-height',
    `${headerHeight}px`
  );
}
setHeaderHeight();

export function toggleMobile() {
  mobileMenu.classList.toggle('open');
  header.style.boxShadow = mobileMenu.classList.contains('open')
    ? '0px 5px 8px 2px rgba(41,41,41,0.75)'
    : '';
  document.body.classList.toggle('no-scroll');
}

function closeOnResize() {
  if (window.innerWidth > 767 && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
    header.style.boxShadow = '';
  }
}

function closeMobileMenuOnClickOutside(event) {
  const isClickInside =
    mobileMenu.contains(event.target) || header.contains(event.target);
  if (!isClickInside && mobileMenu.classList.contains('open')) {
    toggleMobile();
  }
}
document.addEventListener('click', closeMobileMenuOnClickOutside);
