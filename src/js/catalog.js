// Змінні для початкових значень ціни
const INITIAL_MIN_PRICE = 2200;
const INITIAL_MAX_PRICE = 147500;

document.addEventListener('DOMContentLoaded', function () {
  const minRangeInput = document.querySelector('[minPriceRange]');
  const maxRangeInput = document.querySelector('[maxPriceRange]');
  const inputMin = document.querySelector('[inputMin]');
  const inputMax = document.querySelector('[inputMax]');
  const sliderTrack = document.querySelector('[sliderTrack]');
  const priceClearButton = document.querySelector('[priceClear]');
  const minPriceText = document.querySelector('[minPriceText]');
  const maxPriceText = document.querySelector('[maxPriceText]');

  // Функція для оновлення візуального стану повзунка та полів вводу
  function updateRangeSlider() {
    let minVal = parseInt(minRangeInput.value);
    let maxVal = parseInt(maxRangeInput.value);
    // Обмеження: мінімальне значення не може бути більшим за максимальне
    if (minVal > maxVal) {
      minRangeInput.value = maxVal;
      minVal = maxVal;
    }
    // Розрахунок позиції для візуального треку
    const minPercent =
      ((minVal - minRangeInput.min) / (minRangeInput.max - minRangeInput.min)) *
      100;
    const maxPercent =
      ((maxVal - maxRangeInput.min) / (maxRangeInput.max - maxRangeInput.min)) *
      100;
    sliderTrack.style.left = minPercent + '%';
    sliderTrack.style.width = maxPercent - minPercent + '%';
    // Оновлення значень в полях вводу
    inputMin.value = minVal;
    inputMax.value = maxVal;
  }
  // Функція для оновлення повзунків на основі значень в полях вводу
  function updateRangeFromInputs() {
    const minVal = parseInt(inputMin.value);
    const maxVal = parseInt(inputMax.value);
    const minPossible = parseInt(minRangeInput.min);
    const maxPossible = parseInt(minRangeInput.max);
    // Перевірка, чи не виходять значення за межі допустимого діапазону
    if (minVal >= minPossible && minVal <= maxPossible) {
      minRangeInput.value = minVal;
    } else {
      inputMin.value = minRangeInput.value; // Повертаємо початкове значення, якщо введене невірне
    }
    if (maxVal >= minPossible && maxVal <= maxPossible) {
      maxRangeInput.value = maxVal;
    } else {
      inputMax.value = maxRangeInput.value; // Повертаємо початкове значення, якщо введене невірне
    }
    updateRangeSlider();
  }
  // Функція для скидання цін до початкових
  function clearPrice() {
    minRangeInput.value = INITIAL_MIN_PRICE;
    maxRangeInput.value = INITIAL_MAX_PRICE;
    updateRangeSlider();
  }
  // Функція для динамічної установки діапазону значень
  function setRange(min, max, initialMin, initialMax) {
    minRangeInput.min = min;
    minRangeInput.max = max;
    maxRangeInput.min = min;
    maxRangeInput.max = max;

    minRangeInput.value = initialMin;
    maxRangeInput.value = initialMax;
    // Встановлення початкових значень для текстових елементів
    minPriceText.textContent = min;
    maxPriceText.textContent = max;
    updateRangeSlider();
  }
  // Встановлення початкових значень
  setRange(
    INITIAL_MIN_PRICE,
    INITIAL_MAX_PRICE,
    INITIAL_MIN_PRICE,
    INITIAL_MAX_PRICE
  );

  // Додавання обробників подій для повзунків
  minRangeInput.addEventListener('input', updateRangeSlider);
  maxRangeInput.addEventListener('input', updateRangeSlider);
  // Додавання обробників подій для полів вводу
  inputMin.addEventListener('change', updateRangeFromInputs);
  inputMax.addEventListener('change', updateRangeFromInputs);
  // Додавання обробника подій для кнопки очищення
  priceClearButton.addEventListener('click', clearPrice);
});

const filtersData = [
  {
    title: 'Тип дверей',
    items: ['Міжкімнатні', 'Приховані'],
  },
  {
    title: 'Стиль',
    items: ['Скандинавський', 'Вінтаж', 'Сучасний'],
  },
  {
    title: 'Матеріал',
    items: ['Емаль', 'Монохромний Кортекс', 'Шовк', 'Кортекс', 'Шпон'],
  },
  {
    title: 'Покриття',
    items: ['Матове', 'Глянцеве', 'Під фарбу'],
  },
  {
    title: 'Тип конструкції',
    items: [
      'Рамкові',
      'Фільончасті',
      'Щитові',
      'Засклені',
      'Глухі',
      'Аркові',
      'Радіусні',
      'Автоматичні',
      'Протизламні',
    ],
  },
  {
    title: 'Облицювання',
    items: ['Ваніль', 'Білий Клен', 'Тополя', 'Білий матовий'],
  },
];

const filterContainer = document.querySelector('[filterBox]');

const createFilterItem = filter => {
  const itemsHTML = filter.items
    .map(item => `<li class="filter-list__item">${item}</li>`)
    .join('');
  return `
      <div class="filter__box">
        <div class="filter-title__box">
          <h2 class="filter__title">${filter.title}</h2>
          <svg class="filter-title__svg">
            <use href="#dropdown"></use>
          </svg>
        </div>
        <ul class="filter__list">
          ${itemsHTML}
        </ul>
      </div>
    `;
};
const allFiltersHTML = filtersData.map(createFilterItem).join('');
filterContainer.innerHTML = allFiltersHTML;
