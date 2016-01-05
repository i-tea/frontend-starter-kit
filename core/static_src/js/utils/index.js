export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}

export function whichTransitionEvent() {
    let tr;
    const el = document.createElement('fakeelement');
    const transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
    };

    for (tr in transitions) {
        if (el.style[tr] !== undefined) {
            return transitions[tr];
        }
    }
}

export function whichAnimationEvent() {
    let tr;
    const el = document.createElement('fakeelement');
    const transitions = {
        animation: 'animationend',
        OAnimation: 'oAnimationEnd',
        MozAnimation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
    };

    for (tr in transitions) {
        if (el.style[tr] !== undefined) {
            return transitions[tr];
        }
    }
}

export function getTransformPropertyName() {
    const properties = [
        'transform',
        'msTransform',
        'webkitTransform',
        'mozTransform',
        'oTransform',
    ];

    for (let i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] !== 'undefined') {
            return properties[i];
        }
    }

    return null;
}

export function querySelectArray(selector, el) {
    let elParam = el;
    if (!elParam) {
        elParam = document;
    }

    return Array.prototype.slice.call(elParam.querySelectorAll(selector));
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
    let timeout;
    return () => {
        const self = this;
        const args = arguments;
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(self, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(self, args);
    };
}

// Generates a UUID
export function uuid() {
    let i;
    let random;
    let uuidGen = '';
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuidGen += '-';
        }

        /* eslint-disable no-nested-ternary */
        uuidGen += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        /* eslint-enable no-nested-ternary */
    }

    return uuidGen;
}

// Remove CSS outlines in an accessible manner
// Make sure you have an empty style tag that
// lives after your main style sheet
export function tabfocus(selector = '.accessTab') {
    const tabFocus = document.querySelector(selector);
    window.addEventListener('mousedown', () => {
        tabFocus.innerHTML = '';
    }, false);

    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 9) {
            tabFocus.innerHTML = 'a:focus { outline: solid 3px #6cc6ee; }';
        }
    }, false);
}