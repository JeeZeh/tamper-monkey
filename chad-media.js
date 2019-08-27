// ==UserScript==
// @name         Chad Media
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  I use Chad Media, not Virgin Media.
// @author       You
// @match        https://www.virginmedia.ie/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const virgins = Array.from(document.querySelectorAll('a, h1, h2, h3, h4, h5, h6, p, span, strong'))
        .filter(el => el.innerText.toLowerCase().includes('virgin'));

    for (const virgin of virgins) {
        virgin.innerText = virgin.innerText.replace(/Virgin/gi, 'Chad');
    }

    document.getElementById('menu.dashboard').style.top = '8px';
})();
