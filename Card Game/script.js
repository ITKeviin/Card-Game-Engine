const suits = ["♠", "♥", "♦", "♣"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];

// Initialize Deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
}

// Shuffle Deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Display Deck
function updateDeckDisplay() {
    const deckContainer = document.getElementById("deck");
    deckContainer.innerHTML = "";

    if (deck.length === 0) {
        deckContainer.style.display = "none"; // Hide deck when empty
        return;
    }

    deckContainer.style.display = "flex"; // Ensure deck is visible
    let deckTop = document.createElement("div");
    deckTop.classList.add("card", "card-back");
    deckTop.innerHTML = "🂠";
    deckContainer.appendChild(deckTop);
}

// Draw a Card
document.getElementById("deck").addEventListener("click", function () {
    if (deck.length === 0) return; // Do nothing when the deck is empty

    let drawnCard = deck.shift(); // Remove the top card
    let drawnContainer = document.getElementById("drawn-cards");
    let drawnCardDiv = createCardElement(drawnCard);

    drawnContainer.appendChild(drawnCardDiv);
    updateDeckDisplay();

    // Play Draw Sound
    playSound("sounds/carddraw.wav");
});

// Create Card Element
function createCardElement(card) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    let frontDiv = document.createElement("div");
    frontDiv.classList.add("card-front");

    let colorClass = (card.suit === "♦" || card.suit === "♥") ? "red" : "black";

    // Add Corners
    ["top-left", "top-right", "bottom-left", "bottom-right"].forEach(position => {
        let cornerDiv = document.createElement("div");
        cornerDiv.classList.add("corner", position, colorClass);
        cornerDiv.innerHTML = `${card.value}<br>${card.suit}`;
        frontDiv.appendChild(cornerDiv);
    });

    // Add Center Suit
    let centerSuit = document.createElement("div");
    centerSuit.classList.add("center-suit", colorClass);
    centerSuit.innerHTML = card.suit;
    frontDiv.appendChild(centerSuit);

    let backDiv = document.createElement("div");
    backDiv.classList.add("card-back");
    backDiv.innerHTML = "🂠";

    cardDiv.appendChild(frontDiv);
    cardDiv.appendChild(backDiv);

    // Ensure the card flips correctly
    setTimeout(() => cardDiv.classList.add("flip"), 100);

    // Make the card returnable to the deck
    cardDiv.addEventListener("click", () => returnCardToDeck(card, cardDiv));

    return cardDiv;
}

// Return Card to Deck
// Return Card to Deck (With Flip Animation)
function returnCardToDeck(card, cardElement) {
  console.log(`Returning ${card.value} ${card.suit} to deck`);

  deck.unshift(card); // Return the card to the top of the deck
  console.log("Deck size after return:", deck.length);

  // Add flip animation before moving
  cardElement.style.transition = "transform 0.6s ease-in-out, opacity 0.5s";
  cardElement.style.transform = "rotateY(180deg) translateY(-50px) scale(0)";
  cardElement.style.opacity = "0";

  setTimeout(() => {
      cardElement.remove();
      document.getElementById("deck").style.display = "flex"; // Show deck again if hidden
      updateDeckDisplay();
      playSound("sounds/carddraw.wav");
  }, 600); // Match the transition time
}


// Sound Player
function playSound(soundFile) {
    let audio = new Audio(soundFile);
    audio.volume = soundEffectsVolume;
    audio.play();
}

// Background Music
const bgMusic = document.getElementById("bg-music");
let soundEffectsVolume = 0.5;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("toggle-music").addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.muted = false; // Ensure it's not muted
            bgMusic.volume = 0.5;  // Set default volume
            bgMusic.play().then(() => {
                console.log("Music playing");
            }).catch(error => {
                console.log("Music autoplay blocked:", error);
            });
        } else {
            bgMusic.pause();
        }
    });
});

// Settings Menu
function toggleSettingsMenu() {
    const menu = document.getElementById("settings-menu");
    if (!menu) {
        console.error("Settings menu not found!");
        return;
    }
    menu.classList.toggle("visible"); // Use CSS class for smooth toggling
}

// Volume Controls
document.getElementById("bg-music-slider").addEventListener("input", (e) => {
    bgMusic.volume = e.target.value;
});

document.getElementById("sfx-slider").addEventListener("input", (e) => {
    soundEffectsVolume = e.target.value;
});

// Toggle Menu
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key.toLowerCase() === "p") {
        toggleSettingsMenu();
    }
});

// Start the Game
window.onload = function () {
    createDeck();
    shuffleDeck();
    updateDeckDisplay();
    console.log("Deck initialized with", deck.length, "cards.");

    setTimeout(() => playSound("sounds/cardshuffle.wav"), 500);

    // Background Music
    bgMusic.volume = 0.5;
    bgMusic.play().catch(error => console.log("Music autoplay blocked:", error));
};
