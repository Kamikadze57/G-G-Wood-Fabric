const productsData = require('./database/interior-doors.json');

const SofiaOriginal5007 = require('../images/catalog/interior-doors/Sofia-Original-50.07.png');
const VISION6443 = require('../images/catalog/interior-doors/VISION-64.43.png');
const VISION6444 = require('../images/catalog/interior-doors/VISION-64.44.png');
const SKYLINE5521 = require('../images/catalog/interior-doors/SKYLINE-55.21.png');
const SKYLINE5523 = require('../images/catalog/interior-doors/SKYLINE-55.23.png');
const VISION6445 = require('../images/catalog/interior-doors/VISION-64.45.png');
const CLASSIC6544 = require('../images/catalog/interior-doors/CLASSIC-65.44.png');
const CLASSIC6422 = require('../images/catalog/interior-doors/CLASSIC-64.22.png');
const METAMORFOSA65171 = require('../images/catalog/interior-doors/METAMORFOSA-65.171.png');

const imageMap = {
  'Sofia-Original-50.07': SofiaOriginal5007,
  'VISION-64.43': VISION6443,
  'VISION-64.44': VISION6444,
  'SKYLINE-55.21': SKYLINE5521,
  'SKYLINE-55.23': SKYLINE5523,
  'VISION-64.45': VISION6445,
  'CLASSIC-65.44': CLASSIC6544,
  'CLASSIC-64.22': CLASSIC6422,
  'METAMORFOSA-65.171': METAMORFOSA65171,
};

document.addEventListener('DOMContentLoaded', () => {
  const productsList = document.querySelector('[productsList]');
  if (!productsList) {
    console.error('[productsList] не знайдено.');
    return;
  }
  const productsHtml = productsData
    .map(product => {
      const imageUrl = imageMap[product.photo];
      return `
    <li class="products__item">
      <h3 class="products__title">${product.name}</h3>
      <p class="products__price">${product.price}</p>
      <img src="${imageUrl}" alt="${product.name}" class="products__img" />
      <a href="../pages/product-card.html" class="products__link">КУПИТИ</a>
    </li>
    `;
    })
    .join('');
  productsList.innerHTML = productsHtml;
});