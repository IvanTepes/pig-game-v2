'use strict';

/* Selecting the elements from the HTML file. */
const menuNewBtn = document.querySelector('.js__new-game');
const mainMenu = document.querySelector('.menu');
const backBtn = document.querySelector('#js__back-btn');

/* Adding an event listener to the menuNewBtn element. When the button is clicked, the mainMenu element
will have the class visually-hidden added to it. */
menuNewBtn.addEventListener('click', function () {
    mainMenu.classList.add('visually-hidden');
});

/* Adding an event listener to the backBtn element. When the button is clicked, the mainMenu element
will have the class visually-hidden removed from it. */
backBtn.addEventListener('click', function () {
    mainMenu.classList.remove('visually-hidden');
});
