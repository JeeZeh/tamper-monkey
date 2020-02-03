// ==UserScript==
// @name         Mudle Enhancer
// @namespace    https://github.com/JeeZeh/tamper-monkey/
// @version      1.0.1
// @description  Enhancements for Maynooth University's 2019-2020 Moodle Dashboard
// @author       https://jeezeh.github.io
// @match        https://2020.moodle.maynoothuniversity.ie/*
// @include      https://*.githubusercontent.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      githubusercontent.com
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/mudle-enhancer.user.js
// @downloadURL  https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/mudle-enhancer.user.js
// @homepageURL  https://github.com/JeeZeh/tamper-monkey
// ==/UserScript==

cleanModuleNames();

function cleanModuleNames() {
    const courseListIds = ['#block-mycourselist-past', '#block-mycourselist-current', '#block-mycourselist-future'];
    const courseLists = document.querySelectorAll(courseListIds.map(element => `${element} .course_title a[title]`).join(', '));
    for (const course of courseLists) {
        course.innerText = trimModule(course.title);
    }
}

function trimModule(title) {
    const cutPoint = title.indexOf('(2019');

    if (cutPoint > 0) {
        return title.substring(0, cutPoint > 0 ? cutPoint : null);
    }

    return title;
}