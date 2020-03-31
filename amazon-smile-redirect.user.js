// ==UserScript==
// @name         Amazon Smile Auto Redirect
// @namespace    https://github.com/JeeZeh/tamper-monkey
// @version      1.1.0
// @description  If you always forget to use smile.amazon.* then this is for you! Redirects automatically if you every navigate to www.amazon.*. There may be bugs, haven't found any yet.
// @author       https://jeezeh.github.io
// @include      https://www.amazon.tld/*
// @include      https://*.githubusercontent.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      githubusercontent.com
// @connect      raw.githubusercontent.com
// @run-at       document-start
// @updateURL    https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/amazon-smile-redirect.user.js
// @downloadURL  https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/amazon-smile-redirect.user.js
// @homepageURL  https://github.com/JeeZeh/tamper-monkey
// ==/UserScript==

(() => {if (window.location.host.startsWith("www.amazon.")) {
    window.location.replace(window.location.href.replace("www.amazon.", "smile.amazon."));
}})()