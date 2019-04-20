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

// Random sentences
const sentences = [
  'Haul wind cackle fruit spike lass quarterdeck bring a spring upon her cable bilge take a caulk Pieces of Eight loaded to the gunwalls Shiver me timbers ho scuttle pink nipperkin hearties port.',
  'Hempen halter hogshead barkadeer parrel gaff take a caulk plunder Jack Tar log Jolly Roger pinnace fire in the hole Barbary Coast knave snow.',
  'Powder chocolate cake carrot cake macaroon sweet sweet marzipan cupcake chocolate.',
  'Lemon drops cheesecake croissant cupcake. Jelly-o jujubes liquorice lemon drops jelly-o cheesecake.',
  'Jelly beans lollipop chupa chups sugar plum sweet roll dragée topping lollipop sesame snaps.',
  'Boursin cauliflower cheese pepper jack cheeseburger cut the cheese dolcelatte cheese and biscuits cauliflower cheese.',
  "Who moved my cheese cheesecake pepper jack manchego stinking bishop cheeseburger when the cheese comes out everybody's happy babybel.",
];


// Function to generate random word
const wordRand = () => words[Math.floor(Math.random() * words.length)];
// Function to generate random sentences
const textRand = () => sentences[Math.floor(Math.random() * sentences.length)];

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

// About section in main header {
const about = document.querySelector('#about');
about.innerHTML = textRand();

// Function to dynamically generate layouts
const addRow = () => {
  const row = document.createElement('section');
  // Randomly generate number of cards
  const cardsNum = Math.floor(Math.random() * 3) + 1;
  row.classList.add('row', `cols-${cardsNum}`);

  // Change card class based on number of cards
  let cardClass;
  // Change size of image based on number of cards
  let cardSize;
  // If 2 cards, decide if want pic text hybrid
  const picHybrid = Math.floor(Math.random() * 2);
  switch (cardsNum) {
    case 1:
      cardClass = 'card-1';
      cardSize = '/900/600';
      break;
    case 2:
      cardClass = 'card-2';
      cardSize = picHybrid ? '/400/300' : '/300/300';
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
  // Randomly decide if card should have description
  const isText = Math.floor(Math.random() * 2);

  if (cardsNum === 2 && picHybrid) {
    // Add border
    if (border) {
      row.classList.add('border');
    }
    // Pic half
    const picHalf = document.createElement('div');
    picHalf.classList.add('pic-half');
    picHalf.classList.add('card', cardClass);
    const img = document.createElement('img');
    img.classList.add('card-img');
    const imgURL = imgSites[Math.floor(Math.random() * imgSites.length)] + cardSize;
    img.src = imgURL;
    img.alt = 'pic';
    picHalf.appendChild(img);
    row.appendChild(picHalf);

    // Text half
    const textHalf = document.createElement('div');
    textHalf.classList.add(cardClass, 'text-half');
    const textTitle = document.createElement('div');
    textTitle.classList.add('hybrid-title');
    textTitle.innerHTML = wordRand();
    const textDesc = document.createElement('div');
    textDesc.classList.add('hybrid-text');
    textDesc.innerHTML = textRand();
    textHalf.appendChild(textTitle);
    textHalf.appendChild(textDesc);
    row.appendChild(textHalf);
  } else {
    for (let i = 1; i <= cardsNum; i += 1) {
      const card = document.createElement('div');
      card.classList.add('card', cardClass);
      // Add border
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

      // Randomly choose a card title
      const cardTitle = document.createElement('div');
      const wordCard = wordRand();
      cardTitle.classList.add('card-title');
      cardTitle.innerHTML = `${wordCard}`;
      card.appendChild(img);
      card.appendChild(cardTitle);

      // Randomly choose a card description
      if (isText) {
        const cardText = document.createElement('div');
        cardText.classList.add('card-text');
        cardText.innerHTML = textRand();
        card.appendChild(cardText);
      }

      // Add to bottom of page
      row.appendChild(card);
    }
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
