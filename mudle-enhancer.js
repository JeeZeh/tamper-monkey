// ==UserScript==
// @name         Mudle Enhancer 
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enhancements for Maynooth University's 2019-2020 Moodle Dashboard
// @author       https://jeezeh.github.io
// @match        https://2020.moodle.maynoothuniversity.ie/*
// @grant        none
// ==/UserScript== 

cleanModuleNames();

/**
 * Changes the ugly module code titles to their full module name, stripping the (YEAR:SEMESTER) at the end.
 */
function cleanModuleNames() {
    const courseListIds = ['#block-mycourselist-past', '#block-mycourselist-current', '#block-mycourselist-future'];
    const courseLists = document.querySelectorAll(courseListIds.map(element => `${element} .course_title a[title]`).join(', '));
    for (const course of courseLists) {
        course.innerText = trimModule(course.title);
    }
}

function trimModule(title) {
    const cutPoint = title.indexOf('(2019');

    return title.substring(0, cutPoint);
}