function attention(el, animate) {
    return new Promise((resolve) => {
        el.addEventListener('animationend', () => {
            el.classList.remove(animate);
            resolve();
        }, { once: true });
        el.classList.add(animate);
    });
}

var attention$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: attention
});

function bounce(el) {
    return attention(el, 'bounce');
}

function flash(el) {
    return attention(el, 'flash');
}

function headShake(el) {
    return attention(el, 'headShake');
}

function heartBeat(el) {
    return attention(el, 'heartBeat');
}

function jello(el) {
    return attention(el, 'jello');
}

function pulse(el) {
    return attention(el, 'pulse');
}

function rubberBand(el) {
    return attention(el, 'rubberBand');
}

function shake(el) {
    return attention(el, 'shake');
}

function shakeX(el) {
    return attention(el, 'shakeX');
}

function shakeY(el) {
    return attention(el, 'shakeY');
}

function swing(el) {
    return attention(el, 'swing');
}

function tada(el) {
    return attention(el, 'tada');
}

function wobble(el) {
    return attention(el, 'wobble');
}

export { attention$1 as attention, bounce, flash, headShake, heartBeat, jello, pulse, rubberBand, shake, shakeX, shakeY, swing, tada, wobble };
//# sourceMappingURL=vue-animate.es.js.map
