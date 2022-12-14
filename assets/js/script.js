'use strict';

// ! LOADER
const loader = document.getElementById('loader');

// Listen for the "load" event on the window object
window.addEventListener('load', function () {
    loader.classList.add('fade-out');
    loader.style.zIndex = '0';
});

// ! DECLARING VARIABLES
let activePlayer,
    firstRollScores,
    gameScores,
    gameCurrentScore,
    gamePlaying,
    diceColour,
    winPoints;

// ! HELPERS
// Return a random number between 1 and 6.
const getRandomNum = () => Math.trunc(Math.random() * 6) + 1;

// ! AUDIO

const audioDiceRoll = new Audio('/assets/audio/dice-roll.mp3');
const audioBtnClick = new Audio();

// ! MAIN MENU ELEMENTS
// Selecting the elements from the HTML file.
const mainMenuEl = document.querySelector('#js__menu');

// ! BUTTONS
const btnMenuNewGame = document.querySelector('#js__menu--new-game');
const btnHeaderNewGame = document.querySelector('#js__header--new-game');
const btnBack = document.querySelector('#returnToMenuModal');
const btnModalReset = document.querySelector('#js__modal__reset');
const btnModalBackToMenu = document.querySelector('#js__return-to-main-menu');

// ! FIRST ROLL VARIABLES
const firstRollPlayer0El = document.querySelector('.first-roll__player-0');
const firstRollPlayer1El = document.querySelector('.first-roll__player-1');
const firstRollDice0El = document.querySelector('.first-roll__die-1');
const firstRollDice1El = document.querySelector('.first-roll__die-2');
const firstRollDiceBtn = document.querySelector('.first-roll__btn');
const firstRollMessageTopEl = document.querySelector(
    '.first-roll__message--top'
);
const firstRollMessageBottomEl = document.querySelector(
    '.first-roll__message--bottom'
);
const firstRollPlayer0Total = document.querySelector(
    '#first-roll__player-0--total'
);
const firstRollPlayer1Total = document.querySelector(
    '#first-roll__player-1--total'
);
const firstRollPlayersScoresEl = document.querySelector(
    '#js__first-roll__scores'
);
const firstRollElToHide = document.querySelectorAll('.js__hide');

// ! GAME VARIABLES
// Player element
const gamePlayer0El = document.querySelector('.player-0');
const gamePlayer1El = document.querySelector('.player-1');

// Player score
const gamePlayer0ScoreEl = document.querySelector('#js__score__player--0');
const gamePlayer1ScoreEl = document.querySelector('#js__score__player--1');

// Player current
const gamePlayer0CurrentEl = document.querySelector('#js__current-0');
const gamePlayer1CurrentEl = document.querySelector('#js__current-1');

// Game dice
const gameDiceEl = document.querySelector('.main__controls--dice-img');

// Game roll btn-s
const btnRoll = document.querySelectorAll('.btn-roll');

// Game hold btn
const btnHold = document.querySelector('.btn-hold');

// ! SETTINGS MENU
// Dice carousel
const carouselDice = document.querySelector('#dice-carousel');
const carouselPoints = document.querySelector('#points-carousel');
const carouselControlBtn = document.querySelectorAll(
    '[data-bs-target="#points-carousel"]'
);

// Win points
const winPointsDisplay = document.querySelector('.win-points__display');

// ! SETTINGS
const initSettings = function () {
    diceColour = 'light';
    winPoints = 100;
};

// ! FIRST ROLL INITIAL SETTINGS
const initFirstRoll = function () {
    // Initialize variables
    activePlayer = 0;
    firstRollScores = [0, 0];

    // Set text content and styles for elements on the page
    firstRollPlayer0Total.textContent = 0;
    firstRollPlayer1Total.textContent = 0;
    firstRollMessageTopEl.textContent = `Roll the dice to determine who plays first!`; // First roll messages
    firstRollMessageTopEl.style.fontSize = '';
    firstRollMessageBottomEl.textContent = 'Player 1 will roll the dice first!';

    // Hides the specified elements by adding the 'visually-hidden' class to them
    for (const elements of firstRollElToHide) {
        elements.classList.remove('visually-hidden'); // When first roll is finish remove elements
    }

    // Add and remove classes from player elements to toggle their appearance
    firstRollPlayer0El.classList.add('first-roll__active');
    firstRollPlayer1El.classList.remove('first-roll__active');

    // Set initial image for dice
    setDiceColour();

    // Set text content and attributes for first roll dice button
    firstRollDiceBtn.textContent = 'Roll Dice';
    firstRollDiceBtn.removeAttribute('data-bs-dismiss');

    // Reset margin for first roll scores element
    firstRollPlayersScoresEl.style.marginTop = '';
};

// ! SWITCH PLAYER
const switchPlayer = function () {
    // Check if the game is playing
    if (gamePlaying) {
        // Reset the current score to 0
        gameCurrentScore = 0;

        // Update the current score display for the active player
        document.getElementById(`js__current-${activePlayer}`).textContent = 0;

        // Toggle the active player class
        gamePlayer0El.classList.toggle('main__player--active');
        gamePlayer1El.classList.toggle('main__player--active');

        // Hide the roll button for the active player
        document
            .querySelectorAll(`#js__btn-roll-${activePlayer}`)
            .forEach(function (element) {
                element.classList.add('visually-hidden');
            });

        // Switch to the other player
        activePlayer = activePlayer === 0 ? 1 : 0;

        // Show the roll button for the active player
        document
            .querySelectorAll(`#js__btn-roll-${activePlayer}`)
            .forEach(function (element) {
                element.classList.remove('visually-hidden');
            });

        // If First roll is playing
    } else {
        // Switch to the other player
        activePlayer = activePlayer === 0 ? 1 : 0;

        // Toggle the active player class for the first roll
        firstRollPlayer0El.classList.toggle('first-roll__active');
        firstRollPlayer1El.classList.toggle('first-roll__active');
    }
};

// ! START FIRST ROLL
function startFirstRoll() {
    initFirstRoll(); // Initial first roll conditions
    firstRollDiceBtn.addEventListener(
        'click',
        function removeListener(event) {
            // Get random number 1-6
            let dice0 = getRandomNum();
            let dice1 = getRandomNum();

            // Add up dices
            const firstRollDiceTotal = dice0 + dice1;

            // Set the src property of the dice images based on the roll result and dice color settings
            setDiceImageSrc(dice0, dice1);

            // Add roll score to active player
            firstRollScores[activePlayer] += firstRollDiceTotal;

            // Display dices total to active player
            document.getElementById(
                `first-roll__player-${activePlayer}--total`
            ).textContent = firstRollDiceTotal;

            // Switch Player
            switchPlayer();

            // Signal next player turn
            firstRollMessageBottomEl.textContent = `Player 2 rolls next.`;

            // First roll dice animations resets
            event.preventDefault;
            firstRollDice0El.classList.remove('dice-roll');
            firstRollDice1El.classList.remove('dice-roll');
            void firstRollDice0El.offsetWidth;
            void firstRollDice1El.offsetWidth;
            firstRollDice0El.classList.add('dice-roll');
            firstRollDice1El.classList.add('dice-roll');

            // Inside the event listener for the dice button:
            if (firstRollScores[0] !== 0 && firstRollScores[1] !== 0) {
                if (firstRollScores[0] > firstRollScores[1]) {
                    setTimeout(hideFirstRollElements, 400, firstRollElToHide);
                    setTimeout(
                        setFirstRollMessage,
                        500,
                        'Player 1 won the first roll!'
                    );
                    setFirstRollButton('Start game', removeListener, 'modal');
                    setFirstRollActivePlayer(0);
                    activePlayer = 0;
                    initializeGame();
                } else if (firstRollScores[0] < firstRollScores[1]) {
                    setTimeout(hideFirstRollElements, 700, firstRollElToHide);
                    setTimeout(
                        setFirstRollMessage,
                        500,
                        'Player 2 won the first roll!'
                    );
                    setFirstRollButton('Start game', removeListener, 'modal');
                    setFirstRollActivePlayer(1);
                    activePlayer = 1;
                    initializeGame();
                } else {
                    firstRollMessageBottomEl.textContent =
                        'Draw! Player 1 will roll the dice again!';
                    setTimeout(resetFirstRollScore, 400);
                }
            }
        },
        false
    );
}

// ? Set the src property of the dice images based on the roll result and dice color settings
function setDiceImageSrc(dice0, dice1) {
    if (diceColour === 'light') {
        firstRollDice0El.src = `assets/img/dice-img/light/dice-light-${dice0}.png`;
        firstRollDice1El.src = `assets/img/dice-img/light/dice-light-${dice1}.png`;
    } else {
        firstRollDice0El.src = `assets/img/dice-img/dark/dice-dark-${dice0}.png`;
        firstRollDice1El.src = `assets/img/dice-img/dark/dice-dark-${dice1}.png`;
    }
}

// ? Hides the specified elements by adding the 'visually-hidden' class to them
function hideFirstRollElements(elements) {
    for (const element of elements) {
        element.classList.add('visually-hidden');
    }
}

// ? Sets the message in the top element and styles it
function setFirstRollMessage(message) {
    firstRollMessageTopEl.textContent = message;
    firstRollMessageTopEl.style.fontSize = '1.3rem';
    firstRollPlayersScoresEl.style.marginTop = '1.5rem';
}

// ? Sets the text, event listener, and attribute for the button
function setFirstRollButton(text, listener, attribute) {
    firstRollDiceBtn.textContent = text;
    firstRollDiceBtn.removeEventListener('click', listener);
    firstRollDiceBtn.setAttribute('data-bs-dismiss', attribute);
}

// ? Adds the 'first-roll__active' class to the specified player and removes it from the other player
function setFirstRollActivePlayer(player) {
    if (player === 0) {
        firstRollPlayer0El.classList.add('first-roll__active');
        firstRollPlayer1El.classList.remove('first-roll__active');
    } else {
        firstRollPlayer1El.classList.add('first-roll__active');
        firstRollPlayer0El.classList.remove('first-roll__active');
    }
}

// ! RESET FIRST ROLL
/* 
The resetFirstRollScore function resets the first roll scores for both players to 0,
and updates the text content of the score elements to reflect the new values.
It also calls the setDiceColour function, sets the color of the dice.
This function is called when the first roll results in a draw,
and it allows the players to roll the dice again to determine who goes first.
By resetting the scores, the function effectively resets the first roll and allows
the players to start over.
*/
function resetFirstRollScore() {
    firstRollScores[0] = 0;
    firstRollScores[1] = 0;
    firstRollPlayer0Total.textContent = 0;
    firstRollPlayer1Total.textContent = 0;
    setDiceColour();
}

// ! INITIALIZE GAME
function initializeGame() {
    // Reset the game scores and state
    resetGameScores();
    // Update the game scores in the HTML document
    updateScoresInDom();
    // Show the active player
    toggleActivePlayer();
}

// ! MENU NEW GAME BUTTON
btnMenuNewGame.addEventListener('click', function () {
    mainMenuEl.classList.add('visually-hidden');
    gamePlaying = false;

    // Enable win points in settings
    enableCarouselControls();
    // Start "Go first dice"
    startFirstRoll();
});

// ! HEADER NEW GAME BUTTON
/*
The above code is adding an event listener to the button with the id of btnHeaderNewGame. When the
button is clicked, it will add an event listener to the button with the id of btnModalReset. When
the button with the id of btnModalReset is clicked, it will call the resetGame() function and
enableCarouselControls().
*/
btnHeaderNewGame.addEventListener('click', function () {
    btnModalReset.addEventListener('click', function () {
        // Reset the game to its initial state
        resetGame();
        // Enable win points in settings
        enableCarouselControls();
    });

    const bodyModal = document.querySelector('#js__modal__reset__body');
    bodyModal.textContent = `Are you sure you want restart game?`;

    startFirstRoll();
});

// ! BACK BUTTON
/*
Back button is removing a class called visually-hidden from an element with
the ID mainMenuEl, updating scores in the HTML document, resetting the game,
and enabling win points in the game's settings.
*/
btnBack.addEventListener('click', function () {
    btnModalBackToMenu.addEventListener('click', function () {
        mainMenuEl.classList.remove('visually-hidden');
        // Update the game scores in the HTML document
        updateScoresInDom();
        // Reset the game to its initial state
        resetGame();
        // Enable win points in settings
        enableCarouselControls();
    });
});

// ! ROLL BUTTON
/*
The below code is adding an event listener to the roll dice button.
It generates a random number representing the roll of the die,
displays the corresponding image of the rolled number,
roll the die using a CSS animation,
and updates the game state based on the roll.

The function checks if the die roll is equal to 1.
If it is, the function switches to the next player using a switchPlayer function,
If the die roll is not 1, the rolled number is added to the current player's score
and the current score is updated on the page by setting the text content
of the js__current-${activePlayer} element to the new score.
*/
// https://css-tricks.com/restart-css-animation/
btnRoll.forEach(function (btn) {
    btn.addEventListener(
        'click',
        function (event) {
            if (gamePlaying) {
                //  Generating a random dice roll
                const dice = getRandomNum();
                audioDiceRoll.play();
                //  Display dice
                if (diceColour === 'light') {
                    gameDiceEl.src = `assets/img/dice-img/light/dice-light-${dice}.png`;
                } else {
                    gameDiceEl.src = `assets/img/dice-img/dark/dice-dark-${dice}.png`;
                }

                // Roll dice animation
                event.preventDefault;
                gameDiceEl.classList.remove('dice-roll');
                void gameDiceEl.offsetWidth;
                gameDiceEl.classList.add('dice-roll');

                // If the dice roll is 1, switch to the next player
                if (dice === 1) {
                    switchPlayer();
                    // Display red dice
                    gameDiceEl.src = `assets/img/dice-img/red/dice-red-1.png`;
                } else {
                    // Otherwise, add the dice roll to the current score
                    gameCurrentScore += dice;

                    document.getElementById(
                        `js__current-${activePlayer}`
                    ).textContent = gameCurrentScore;
                }
            }
        },
        false
    );
});

// ! HOLD BUTTON
/*
The first player to reach a certain number of points (winPoints) wins the game.
The code first checks if the game is currently in progress (gamePlaying is true).
If so, it adds the current score (gameCurrentScore) to the active player's score
and updates the player's score on the page.

Next, the code checks if the active player's score is equal to or greater than winPoints.
If so, the game is finished and the code sets gamePlaying to false, hides the dice,
and adds a "winner" class to the active player's element on the page. 
Otherwise, it switches to the next player by calling switchPlayer().

Finally, the code checks if either player has saved any points, and if so, 
it disables the controls for the carousel on the page by 
calling disableCarouselControls().
*/
btnHold.addEventListener('click', function () {
    // Check if the game is currently being played
    if (gamePlaying) {
        // Add the current score to the active player's total score
        gameScores[activePlayer] += gameCurrentScore;

        // Update the active player's score on the page
        document.querySelector(
            `#js__score__player--${activePlayer}`
        ).textContent = gameScores[activePlayer];

        // Check if the active player has reached or surpassed the winPoints score
        if (gameScores[activePlayer] >= winPoints) {
            // End the game

            // Set the current scores for both players to 0
            gamePlayer0CurrentEl.textContent = 0;
            gamePlayer1CurrentEl.textContent = 0;

            // Hide the dice
            gameDiceEl.classList.add('hidden');

            // Add the 'player__winner' class to the active player
            document
                .querySelector(`.player-${activePlayer}`)
                .classList.add('main__player--winner');

            // Add the 'player__lost' class to non-active player
            document
                .querySelector(`.player-${activePlayer === 0 ? 1 : 0}`)
                .classList.add('main__player--lost');

            // Switch to the other player
            toggleActivePlayer();

            // Set gamePlaying to false to indicate that the game is over
            gamePlaying = false;
        } else {
            // Switch to the other player
            switchPlayer();
        }
    }

    // If either player has saved any points, disable the controls for the carousel
    // This prevents the user from changing the winPoints score after the game has started
    if (
        gamePlayer0ScoreEl.textContent !== '0' ||
        gamePlayer1ScoreEl.textContent !== '0'
    ) {
        disableCarouselControls();
    }
});

// ! DICE COLOUR
// prettier-ignore
function setDiceColour() {
    // Determine the base path for the dice images
    const basePath = `assets/img/dice-img/${diceColour === 'light' ? 'light' : 'dark'}/`;

    // Set the dice images for the first roll
    firstRollDice0El.src = `${basePath}dice-${diceColour === 'light' ? 'light-3' : 'dark-3'}.png`;
    firstRollDice1El.src = `${basePath}dice-${diceColour === 'light' ? 'light-4' : 'dark-4'}.png`;
}

// ! DICE CAROUSEL
/* Changing the dice colour when the carousel slides. */
// prettier-ignore
carouselDice.addEventListener('slid.bs.carousel', function () {
    const carouselItems = document.querySelectorAll('.carousel-dice__item');
    carouselItems.forEach(function (item) {
        if (item.classList.contains('active')) {
            if (item.id === 'dice-light') {
                diceColour = 'light';
                gameDiceEl.src = `assets/img/dice-img/light/dice-light-1.png`;
            } else {
                diceColour = 'dark';
                gameDiceEl.src = `assets/img/dice-img/dark/dice-dark-1.png`;
            }
        }
    });
});

// ! POINTS CAROUSEL
/* The below code is listening for the carousel to slide and then it is checking which slide is active
and then setting the winPoints variable to the correct value.
*/
// prettier-ignore
carouselPoints.addEventListener('slid.bs.carousel', function () {

    // Find all elements with the class "carousel-points__item"
    const carouselItems = document.querySelectorAll('.carousel-points__item');

    // Loop through the carousel items
    carouselItems.forEach(function (item) {
        // If the current item has the class "active"
        if (item.classList.contains('active')) {
            // If the current item has the id "points-100"
            if (item.id === 'points-100') {
                winPoints = 100;
            } else if (item.id === 'points-500') {
                winPoints = 500;
            } else if (item.id === 'points-1000') {
                winPoints = 1000;
            } else {
                winPoints = 5000;
            }
        }
    });

    // Set the text content of winPointsDisplay to the value of winPoints
    winPointsDisplay.textContent = winPoints;
});

initSettings();

// ! UPDATES AND RESETS

// ? Reset the game scores and state
function resetGameScores() {
    // Set the initial scores and state of the game
    gameScores = [0, 0];
    gameCurrentScore = 0;
    gamePlaying = true;
}

// ? Reset game
function resetGame() {
    // Set the gamePlaying variable to false to indicate that the game is not currently in progress
    gamePlaying = false;

    // Remove the active class from the gamePlayer0El and gamePlayer1El elements
    gamePlayer0El.classList.remove(
        'main__player--active',
        'main__player--winner',
        'main__player--lost'
    );
    gamePlayer1El.classList.remove(
        'main__player--active',
        'main__player--winner',
        'main__player--lost'
    );

    // Update the scores in the HTML document
    updateScoresInDom();

    // Add the visually-hidden class to each button in the btnRoll array
    btnRoll.forEach(function (btn) {
        btn.classList.add('visually-hidden');
    });
}

// ? Update the game scores in the HTML document
function updateScoresInDom() {
    // Set the score of both players to 0
    gamePlayer0ScoreEl.textContent = 0;
    gamePlayer1ScoreEl.textContent = 0;

    // Set the current score of both players to 0
    gamePlayer0CurrentEl.textContent = 0;
    gamePlayer1CurrentEl.textContent = 0;
}

// ? Toggle the active player
function toggleActivePlayer() {
    // Select the roll button for the active player
    const rollBtnSelector = `#js__btn-roll-${activePlayer}`;

    // Select the active player
    const activePlayerSelector = `.player-${activePlayer}`;

    // Toggle the visibility of the roll button for the active player
    document.querySelectorAll(rollBtnSelector).forEach(el => {
        el.classList.toggle('visually-hidden');
    });

    // Toggle the 'main__player--active' class for the active player
    document
        .querySelector(activePlayerSelector)
        .classList.toggle('main__player--active');
}

// ? Disable carousel points
function disableCarouselControls() {
    // Loop through the carousel control buttons
    carouselControlBtn.forEach(function (controlBtn) {
        // Remove the data-bs-target attribute
        controlBtn.removeAttribute('data-bs-target');
        // Set the background-image property of the first child element to "none"
        controlBtn.firstElementChild.style.backgroundImage = 'none';
        // Set the cursor property to "not-allowed"
        controlBtn.style.cursor = 'not-allowed';
    });

    // Disable touch scroll between items
    carouselPoints.setAttribute('data-bs-touch', 'false');

    // Add the win-points--active class to the winPointsDisplay element
    winPointsDisplay.classList.add('win-points--active');
}

// ? Enable carousel controls
function enableCarouselControls() {
    // Loop through the carousel control buttons
    carouselControlBtn.forEach(function (controlBtn) {
        // Set the data-bs-target attribute to "#points-carousel"
        controlBtn.setAttribute('data-bs-target', '#points-carousel');
        // Set the background-image property of the first child element to an empty string
        // Use default
        controlBtn.firstElementChild.style.backgroundImage = '';
        // Set the cursor property to an empty string
        // Use default
        controlBtn.style.cursor = '';
    });

    // Enable touch scroll between items
    carouselPoints.setAttribute('data-bs-touch', 'true');

    // Remove the win-points--active class from the winPointsDisplay element
    winPointsDisplay.classList.remove('win-points--active');
}
