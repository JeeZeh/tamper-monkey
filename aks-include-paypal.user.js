// ==UserScript==
// @name         AllKeyShop.com - Include PayPal markup in price display
// @namespace    https://github.com/JeeZeh/tamper-monkey
// @version      1.0.0
// @description  Adds the PayPal markup for each shop to the final key price
// @author       https://jeezeh.github.io
// @match        https://www.allkeyshop.com/blog/*
// @include      https://*.githubusercontent.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      githubusercontent.com
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/aks-include-paypal.user.js
// @downloadURL  https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/aks-include-paypal.user.js
// @homepageURL  https://github.com/JeeZeh/tamper-monkey
// ==/UserScript==

function parseAndSumMarkup(original, markup) {
    let currency = original.innerText.match(/[$€]/)[0];
    original = parseFloat(original.innerText.match(/\d+.\d+/)[0]);
    markup = parseFloat(markup.innerText.match(/\d+.\d+/)[0]);
    let newPrice = (original + markup).toFixed(2);
    return currency == "$" ? `${currency}${newPrice}` : `${newPrice}${currency}`;
}

document.querySelectorAll('.offers-table-row').forEach(row => {
    let paypal = Array.from(row.querySelectorAll('.fees-value[data-fee-paypal]')).find(v => v.innerText !== "None");
    if (paypal && paypal.innerText !== "None")  {        
        let originalWithDiscount = row.querySelector("span[data-offer-price-container]");
        let originalWithoutDiscount = row.querySelector("span[data-offer-price-without-coupon-container]");
        if (originalWithoutDiscount) {
            originalWithoutDiscount.innerText = parseAndSumMarkup(originalWithoutDiscount, paypal)
        }
        if (originalWithDiscount) {
            originalWithDiscount.innerText = parseAndSumMarkup(originalWithDiscount, paypal)
        }
    }   
});

