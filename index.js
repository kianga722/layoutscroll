// Generate Layout Module
const genLayout = (() => {
  // Word bank
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

  // Image Placeholder Site bank
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

  // Sentences bank
  const sentences = [
    'Haul wind cackle fruit spike lass quarterdeck bring a spring upon her cable bilge take a caulk Pieces of Eight loaded to the gunwalls Shiver me timbers ho scuttle pink nipperkin hearties port.',
    'Hempen halter hogshead barkadeer parrel gaff take a caulk plunder Jack Tar log Jolly Roger pinnace fire in the hole Barbary Coast knave snow.',
    'Powder chocolate cake carrot cake macaroon sweet sweet marzipan cupcake chocolate.',
    'Lemon drops cheesecake croissant cupcake. Jelly-o jujubes liquorice lemon drops jelly-o cheesecake.',
    'Jelly beans lollipop chupa chups sugar plum sweet roll dragée topping lollipop sesame snaps.',
    'Boursin cauliflower cheese pepper jack cheeseburger cut the cheese dolcelatte cheese and biscuits cauliflower cheese.',
    "Who moved my cheese cheesecake pepper jack manchego stinking bishop cheeseburger when the cheese comes out everybody's happy babybel.",
  ];

  // Animation bank classes
  const animations = [
    'slideLeft',
    'slideRight',
    'fadeIn',
    'enlarge',
    'rotate',
  ];

  // Function to randomly grab element in array
  const arrRand = arr => arr[Math.floor(Math.random() * arr.length)];
  // Function to randomly generate number 1 to 3
  const cardRand = () => Math.floor(Math.random() * 3) + 1;
  // Function to randomly generate number 0 or 1
  const coinFlip = () => Math.floor(Math.random() * 2);

  // Function to generate nav link words
  const navWordsGen = () => {
    const navLinks = document.querySelector('.nav-links');
    const navWords = [];
    for (let i = 1; i <= 5; i += 1) {
      const link = document.createElement('a');
      let word = arrRand(words);
      while (navWords.includes(word)) {
        word = arrRand(words);
      }
      navWords.push(word);
      link.innerHTML = `${word}`;
      navLinks.appendChild(link);
    }
    return navWords;
  };

  // Main Header generate word
  const headerWordGen = (navWords) => {
    const headerText = document.querySelector('.header-text');
    let word = arrRand(words);
    while (navWords.includes(word)) {
      word = arrRand(words);
    }
    headerText.innerHTML = `${word}`;
  };

  // About section generate sentence
  const aboutTextGen = () => {
    const about = document.querySelector('#about');
    about.innerHTML = arrRand(sentences);
  };

  // Function to generate card elements
  const cardsGen = (row, cardsNum, circle, border, isText, cardClass, cardSize) => {
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
      const imgURL = arrRand(imgSites) + cardSize;
      img.src = imgURL;
      img.alt = 'card';
      if (circle && cardsNum !== 1) {
        img.classList.add('circle');
      }

      // Randomly choose a card title
      const cardTitle = document.createElement('div');
      const wordCard = arrRand(words);
      cardTitle.classList.add('card-title');
      cardTitle.innerHTML = `${wordCard}`;
      card.appendChild(img);
      card.appendChild(cardTitle);

      // Randomly choose a card description
      if (isText) {
        const cardText = document.createElement('div');
        cardText.classList.add('card-text');
        cardText.innerHTML = arrRand(sentences);
        card.appendChild(cardText);
      }

      // Add to bottom of page
      row.appendChild(card);
    }
  };

  // Function to generate pic text hybrid element
  const hybridGen = (row, border, cardClass, cardSize) => {
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
    const imgURL = arrRand(imgSites) + cardSize;
    img.src = imgURL;
    img.alt = 'pic';
    picHalf.appendChild(img);
    row.appendChild(picHalf);

    // Text half
    const textHalf = document.createElement('div');
    textHalf.classList.add(cardClass, 'text-half');
    const textTitle = document.createElement('div');
    textTitle.classList.add('hybrid-title');
    textTitle.innerHTML = arrRand(words);
    const textDesc = document.createElement('div');
    textDesc.classList.add('hybrid-text');
    textDesc.innerHTML = arrRand(sentences);
    textHalf.appendChild(textTitle);
    textHalf.appendChild(textDesc);
    row.appendChild(textHalf);
  };

  // Function to dynamically generate layouts
  const addRow = () => {
    // Create new element
    const row = document.createElement('section');
    // Randomly generate number of cards
    const cardsNum = cardRand();
    row.classList.add('row', `${arrRand(animations)}`, `cols-${cardsNum}`);

    // Change card class based on number of cards
    let cardClass;
    // Change size of image based on number of cards
    let cardSize;
    // If 2 cards, decide if want pic text hybrid
    const picHybrid = coinFlip();
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
    const circle = coinFlip();
    // Randomly have borders around cards
    const border = coinFlip();
    // Randomly decide if card should have description
    const isText = coinFlip();

    if (cardsNum === 2 && picHybrid) {
      // If pic text hybrid element
      hybridGen(row, border, cardClass, cardSize);
    } else {
      // Else just do regular card creation
      cardsGen(row, cardsNum, circle, border, isText, cardClass, cardSize);
    }

    // Append element to bottom of page
    const content = document.querySelector('#content-main');
    content.appendChild(row);
  };

  return {
    navWordsGen, headerWordGen, aboutTextGen, addRow,
  };
})();


// Generate initial nav, header, and about text
genLayout.headerWordGen(genLayout.navWordsGen());
genLayout.aboutTextGen();

// Fill up viewport enough to create scrollbar if not already there
while (document.body.clientHeight < window.innerHeight) {
  genLayout.addRow();
}

// Scroll Event Listener
document.addEventListener('scroll', () => {
  // Add some transparency to navbar if not scrolled
  const nav = document.querySelector('#nav');
  if (window.pageYOffset === 0) {
    nav.classList.remove('nav-scrolled');
  } else {
    nav.classList.add('nav-scrolled');
  }
  // Check if scrolled to bottom and generate elements if triggered
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    genLayout.addRow();
  }
});
