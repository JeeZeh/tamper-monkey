// ==UserScript==
// @name         Ecosia Ad Softener
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Ethically soften and distinguish ads on Ecosia without hiding or blocking.
// @author       https://jeezeh.github.io
// @match        https://www.ecosia.org/search?q=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const hrNode = document.createElement('hr');
    hrNode.setAttribute("style", "margin: 20px 0px");
    const adNode = document.querySelector('.card-ad');
    const allAds = document.querySelectorAll('.card-ad, .results-ads');

    allAds.forEach(ad => {
        ad.style.opacity = 0.75;
    });
    adNode.parentNode.insertBefore(hrNode, adNode.nextSibling);

})();
