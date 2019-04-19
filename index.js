// Random words
const words = [
  'Amazing',
  'Astonishing',
  'Awesome',
  'Cool',
  'Fantastic',
  'Impressive',
  'Incredible',
  'Marvelous',
  'Miraculous',
  'Phenomenal',
  'Sensational',
  'Spectacular',
  'Super',
  'Stunning',
  'Unbelievable',
  'Wonderful',
];

// Random image placeholder sites
const imgSites = [
  'https://baconmockup.com',
  'https://loremflickr.com',
  'https://lorempixel.com',
  'https://www.picsum.photos',
  'https://placebeard.it',
  'https://placecage.com',
  'https://placeimg.com',
  'https://placekitten.com',
  'https://www.placebear.com',
  'https://www.stevensegallery.com',
  'https://unsplash.it',
];


// Function to generate random word
const wordRand = () => words[Math.floor(Math.random() * words.length)];

// Funtion to generate nav link words
const navLinks = document.querySelector('.nav-links');
const navWords = [];
let word;
for (let i = 1; i <= 5; i += 1) {
  const link = document.createElement('a');
  word = wordRand();
  if (navWords.includes(word)) {
    word = wordRand();
  }
  navWords.push(word);
  link.innerHTML = `${word}`;
  navLinks.appendChild(link);
}

// Main Header generate word
const headerText = document.querySelector('.header-text');
word = wordRand();
if (navWords.includes(word)) {
  word = wordRand();
}
headerText.innerHTML = `${word}`;

// Function to dynamically generate layouts
const addRow = () => {
  const row = document.createElement('section');
  row.classList.add('row');

  // Randomly generate number of cards
  const cardsNum = Math.floor(Math.random() * 3) + 1;
  // Random justify content
  if (cardsNum !== 1) {
    const justify = Math.floor(Math.random() * 3);
    switch (justify) {
      case 0:
        if (cardsNum === 2) {
          row.classList.add('center');
        }
        row.classList.add('space-between');
        break;
      case 1:
        row.classList.add('space-around');
        break;
      case 2:
        row.classList.add('space-evenly');
        break;
      case 3:
        row.classList.add('center');
        break;
      default:
        row.classList.add('center');
    }
  }

  // Change card class based on number of cards
  let cardClass;
  // Change size of image based on number of cards
  let cardSize;
  switch (cardsNum) {
    case 1:
      cardClass = 'card-1';
      cardSize = '/900/600';
      break;
    case 2:
      cardClass = 'card-2';
      cardSize = '/300/300';
      break;
    case 3:
      cardClass = 'card-3';
      cardSize = '/200/200';
      break;
    default:
      cardClass = 'card-1';
      cardSize = '/200/200';
  }
  // Randomly make images circles
  const circle = Math.floor(Math.random() * 2);
  // Randomly have borders around cards
  const border = Math.floor(Math.random() * 2);

  for (let i = 1; i <= cardsNum; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card', cardClass);
    if (border) {
      card.classList.add('border');
    }

    // Randomly choose an image placeholder site
    const img = document.createElement('img');
    img.classList.add('card-img');
    const imgURL = imgSites[Math.floor(Math.random() * imgSites.length)] + cardSize;
    img.src = imgURL;
    img.alt = 'card';
    if (circle && cardsNum !== 1) {
      img.classList.add('circle');
    }

    // Randomly choose a card text description
    const cardText = document.createElement('div');
    const wordCard = wordRand();
    cardText.classList.add('card-text');
    cardText.innerHTML = `${wordCard}`;
    card.appendChild(img);
    card.appendChild(cardText);

    // Add to bottom of page
    row.appendChild(card);
  }

  const content = document.querySelector('#content-main');
  content.appendChild(row);
};

// Fill up viewport enough to create scrollbar
while (document.body.clientHeight < window.innerHeight) {
  addRow();
}

// Check if scrolled to bottom
document.addEventListener('scroll', () => {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    addRow();
  }
});
