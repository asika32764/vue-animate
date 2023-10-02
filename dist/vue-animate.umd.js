(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueAnimate = {}));
})(this, (function (exports) { 'use strict';

    function attention(el, animate, duration = undefined, options = {}) {
        return doAttention(el, animate, duration, options);
    }
    function doAttention(el, animate, duration = undefined, options = {}) {
        if (typeof duration === 'number' || typeof duration === 'string') {
            options.duration = duration;
        }
        else if (duration != undefined) {
            options = duration;
        }
        return new Promise((resolve) => {
            const rollbacks = getRollbacks(el);
            el.addEventListener('animationend', () => {
                el.classList.remove('animate__animated', 'animate__' + animate);
                restore(el, rollbacks);
                resolve();
            }, { once: true });
            setVariables(el, options);
            el.classList.add('animate__animated', 'animate__' + animate);
        });
    }
    function setVariables(el, options) {
        if (options.duration) {
            el.style.setProperty('animation-duration', String(options.duration));
        }
        if (options.delay) {
            el.style.setProperty('animation-delay', String(options.delay));
        }
        if (options.iterationCount) {
            el.style.setProperty('animation-iteration-count', String(options.iterationCount));
        }
        if (options.direction) {
            el.style.setProperty('animation-direction', options.direction);
        }
        if (options.fillMode) {
            el.style.setProperty('animation-fill-mode', options.fillMode);
        }
    }
    function restore(el, rollbacks) {
        for (const varName in rollbacks) {
            const value = rollbacks[varName];
            if (value === '') {
                el.style.removeProperty(varName);
            }
            else {
                el.style.setProperty(varName, value);
            }
        }
    }
    function getRollbacks(el) {
        const rollbacks = {};
        rollbacks['animation-duration'] = el.style.getPropertyValue('animation-duration');
        rollbacks['animation-delay'] = el.style.getPropertyValue('animation-delay');
        rollbacks['animation-iteration-count'] = el.style.getPropertyValue('animation-iteration-count');
        rollbacks['animation-direction'] = el.style.getPropertyValue('animation-direction');
        rollbacks['animation-fill-mode'] = el.style.getPropertyValue('animation-fill-mode');
        return rollbacks;
    }

    function bounce(el, duration = undefined, options = {}) {
        return doAttention(el, 'bounce', duration, options);
    }

    function flash(el, duration = undefined, options = {}) {
        return doAttention(el, 'flash', duration, options);
    }

    function headShake(el, duration = undefined, options = {}) {
        return doAttention(el, 'headShake', duration, options);
    }

    function heartBeat(el, duration = undefined, options = {}) {
        return doAttention(el, 'heartBeat', duration, options);
    }

    function jello(el, duration = undefined, options = {}) {
        return doAttention(el, 'jello', duration, options);
    }

    function pulse(el, duration = undefined, options = {}) {
        return doAttention(el, 'pulse', duration, options);
    }

    function rubberBand(el, duration = undefined, options = {}) {
        return doAttention(el, 'rubberBand', duration, options);
    }

    function shakeX(el, duration = undefined, options = {}) {
        return doAttention(el, 'shakeX', duration, options);
    }

    function shakeY(el, duration = undefined, options = {}) {
        return doAttention(el, 'shakeY', duration, options);
    }

    function swing(el, duration = undefined, options = {}) {
        return doAttention(el, 'swing', duration, options);
    }

    function tada(el, duration = undefined, options = {}) {
        return doAttention(el, 'tada', duration, options);
    }

    function wobble(el, duration = undefined, options = {}) {
        return doAttention(el, 'wobble', duration, options);
    }

    exports.attention = attention;
    exports.bounce = bounce;
    exports.flash = flash;
    exports.headShake = headShake;
    exports.heartBeat = heartBeat;
    exports.jello = jello;
    exports.pulse = pulse;
    exports.rubberBand = rubberBand;
    exports.shakeX = shakeX;
    exports.shakeY = shakeY;
    exports.swing = swing;
    exports.tada = tada;
    exports.wobble = wobble;

}));
//# sourceMappingURL=vue-animate.umd.js.map
