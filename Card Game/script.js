const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

// Create the deck of 52 cards
function createDeck() {
  deck = []; // Reset deck
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ value, suit });
    }
  }
}

// Shuffle the deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Update the deck display
function updateDeckDisplay() {
  const deckContainer = document.getElementById("deck");
  deckContainer.innerHTML = "";

  if (deck.length ===0){
    deckContainer.style.display = "none";
    return;
  }

 let deckTop = document.createElement("div");
  deckTop.classList.add("card", "card-back");
  deckTop.innerHTML = "🂠";
  deckContainer.appendChild(deckTop);
}

// Draw a card when clicking the deck
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
});


// Create a single card element
function createCardElement(card) {
  let cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  let frontDiv = document.createElement("div");
  frontDiv.classList.add("card-front");
  frontDiv.innerHTML = `${card.value} ${card.suit}`;

  let backDiv = document.createElement("div");
  backDiv.classList.add("card-back");
  backDiv.innerHTML = "🂠";

  cardDiv.appendChild(frontDiv);
  cardDiv.appendChild(backDiv);
  
  cardDiv.addEventListener("click", function () {
    returnCardToDeck(card, cardDiv);
  });

  return cardDiv;
}

// Initialize deck when page loads
window.onload = function () {
  createDeck();
  shuffleDeck();
  updateDeckDisplay();
  console.log("Deck initialized with", deck.length, "cards.");
};

//Return a card
function returnCardToDeck(card, cardElement) {
  console.log(`Returning ${card.value} ${card.suit} to deck`);

  // Remove the card from the drawn area
cardElement.remove();
deck.unshift(card);

  // Show the deck again if it was hidden
  let deckContainer = document.getElementById("deck");
  deckContainer.style.display = "block";
  deckContainer.classList.remove("hidden");

  updateDeckDisplay();
}
