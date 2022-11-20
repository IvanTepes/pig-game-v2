'use strict';

const scoreInput = document.querySelector('.footer__max-score--input');
const wrapper = document.querySelector('.wrapper');
console.log(scoreInput);

scoreInput.addEventListener('focusin', focusInFunction);
scoreInput.addEventListener('focusout', focusOutFunction);

function focusInFunction() {
    wrapper.style.height = '120%';
}
function focusOutFunction() {
    wrapper.style.height = '';
}
