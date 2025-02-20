const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

// Making the deck
function createDeck() {
  deck = []; // Reset deck
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
}

// Shuffle
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Display deck
function updateDeckDisplay() {
  const deckContainer = document.getElementById("deck");
  deckContainer.innerHTML = "";

  if (deck.length === 0) {
    deckContainer.style.display = "none";
    return;
  }

  let deckTop = document.createElement("div");
  deckTop.classList.add("card", "card-back");
  deckTop.innerHTML = "🂠";
  deckContainer.appendChild(deckTop);
}

// Sound
function playSound(soundFile) {
  let audio = new Audio(soundFile);
  audio.play();
}

// Player draws a card
document.getElementById("deck").addEventListener("click", function () {
  if (deck.length === 0) {
    alert("No more cards left!");
    return;
  }

  let drawnCard = deck.shift();
  console.log("Drew:", drawnCard);

  let drawnContainer = document.getElementById("drawn-cards");
  let drawnCardDiv = createCardElement(drawnCard);

  drawnContainer.appendChild(drawnCardDiv);
  updateDeckDisplay();

  // Draw Sound
  playSound("sounds/carddraw.wav");
});

// Create a single card
function createCardElement(card) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  let frontDiv = document.createElement("div");
  frontDiv.classList.add("card-front");

  let colorClass = (card.suit === "♦" || card.suit === "♥") ? "red" : "black";

  // Add the value in all four corners
  let corners = ["top-left", "top-right", "bottom-left", "bottom-right"];
  corners.forEach(position => {
    let cornerDiv = document.createElement("div");
    cornerDiv.classList.add("corner", position, colorClass);
    cornerDiv.innerHTML = `${card.value}<br>${card.suit}`;
    frontDiv.appendChild(cornerDiv);
  });

// Add the center suit
let centerSuit = document.createElement("div");
centerSuit.classList.add("center-suit", colorClass);
centerSuit.innerHTML = card.suit; 
frontDiv.appendChild(centerSuit);

  let backDiv = document.createElement("div");
  backDiv.classList.add("card-back");
  backDiv.innerHTML = "🂠"; 

  cardDiv.appendChild(frontDiv);
  cardDiv.appendChild(backDiv);

  // Ensure the card flips correctly after being drawn
  setTimeout(() => {
    cardDiv.classList.add("flip");
  }, 100);

  cardDiv.addEventListener("click", function () {
    returnCardToDeck(card, cardDiv);
  });

  return cardDiv;
}


// Return card to deck
function returnCardToDeck(card, cardElement) {
  console.log(`Returning ${card.value} ${card.suit} to deck`);

  cardElement.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
  cardElement.style.transform = "translateY(-50px) scale(0)";
  cardElement.style.opacity = "0";

  setTimeout(() => {
    cardElement.remove();
    deck.unshift(card);
    updateDeckDisplay();
  }, 500);

  //return card sound
  playSound("sounds/carddraw.wav");
}

//Shuffle deck on page load
window.onload = function () {
  createDeck();
  shuffleDeck();
  updateDeckDisplay();
  console.log("Deck initialized with", deck.length, "cards.");

  // Play shuffle sound
  playSound("sounds/cardshuffle.wav");
};
