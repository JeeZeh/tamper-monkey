// ==UserScript==
// @name         Mule Paster
// @namespace    https://github.com/JeeZeh/tamper-monkey/
// @version      1.0.0
// @description  Enhancement for MULE environment allowing pasting from any source into workbook. Useful if working offline and moving your code to MULE afterwards. NOTE: You must paste, undo, and paste again if you have new clipboard content.
// @author       https://jeezeh.github.io
// @match        https://mule.cs.nuim.ie/*
// @include      https://*.githubusercontent.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      githubusercontent.com
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/mule-paster.user.js
// @downloadURL  https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/mule-paster.user.js
// @homepageURL  https://github.com/JeeZeh/tamper-monkey
// ==/UserScript==

document.body.addEventListener("keydown", async (e) => {
    e = e || window.event;
    var key = e.which || e.keyCode; // keyCode detection
    var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    if (key == 86 && ctrl) {
        console.log(`Replacing stored workbook content`);
        const newText = await navigator.clipboard.readText();
        sessionStorage.setItem('workbook', newText);
    }
}, false);