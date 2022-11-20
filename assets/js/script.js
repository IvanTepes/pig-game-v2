'use strict';

const scoreInput = document.querySelector('.footer__max-score--input');
console.log(scoreInput);

scoreInput.addEventListener('focusin', focusInFunction);
scoreInput.addEventListener('focusout', focusOutFunction);

function focusInFunction() {
    // document.body.style.position = 'absolute';
    document.body.style.height = '100vh';
}
