const articlesData = require('./database/articles.json');

const aluminumPartitions = require('../images/articles/aluminum-partitions.png');
const decorativeSlats = require('../images/articles/decorative-slats.png');
const doorSelection = require('../images/articles/door-selection.png');
const graficaPartitions = require('../images/articles/grafica-partitions.png');
const loftInterior = require('../images/articles/loft-interior.png');
const newPartitions = require('../images/articles/new-partitions.png');

const imageMap = {
  'aluminum-partitions': aluminumPartitions,
  'decorative-slats': decorativeSlats,
  'door-selection': doorSelection,
  'grafica-partitions': graficaPartitions,
  'loft-interior': loftInterior,
  'new-partitions': newPartitions,
};

document.addEventListener('DOMContentLoaded', () => {
  const articlesList = document.querySelector('[articlesList]');

  if (!articlesList) {
    console.error('[articlesList] не знайдено.');
    return;
  }

  const articlesHtml = articlesData
    .map(article => {
      const imageUrl = imageMap[article.image];
      return `
        <li class="articles__item">
          <img src="${imageUrl}" alt="${article.title}" class="articles__img">
          <div class="articles__content">
            <h2 class="articles-item__title">${article.title}</h2>
            <p class="articles__desc">${article.description}</p>
            <div class="articles__footer">
              <a href="#" class="articles__link">Читати далі</a>
              <p class="articles__date">${article.date}</p>
            </div>
          </div>
        </li>
      `;
    })
    .join('');

  articlesList.innerHTML = articlesHtml;
});