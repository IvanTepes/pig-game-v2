'use strict';

const scoreInput = document.querySelector('.footer__max-score--input');
const wrapper = document.querySelector('.wrapper');

console.log(scoreInput);

scoreInput.addEventListener('focusin', focusInFunction);
scoreInput.addEventListener('focusout', focusOutFunction);

function focusInFunction() {
    wrapper.style.height = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
}
function focusOutFunction() {
    wrapper.style.height = '';
    document.documentElement.style.height = '';
    document.body.style.height = '';
}
