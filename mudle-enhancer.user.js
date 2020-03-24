// ==UserScript==
// @name         MUdle Enhancer
// @namespace    https://github.com/JeeZeh/tamper-monkey/
// @version      2.1.0
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


/* ----------------------------------------------------------------- 
 *
 * Clean up module names
 * Replaces "(Year:Semester)" with the title of the module 
 *
 * ----------------------------------------------------------------- */


cleanModuleNames();

function cleanModuleNames() {
    const courseListIds = [
        '#block-mycourselist-past',
        '#block-mycourselist-current',
        '#block-mycourselist-future'
    ];

    const courseLists = document.querySelectorAll(courseListIds
        .map(element => `${element} .course_title a[title]`).join(', ')
    );

    for (const course of courseLists) {
        course.innerText = trimModule(course.title);
    }
}

function trimModule(title) {
    const semesterMatch = title.match(/\s\(\d*-\d*:[\w\d\s-]*\)/);

    return title
        .substring(0, semesterMatch ? semesterMatch.index : undefined)
        .replace(/\[\w\]/, "");
}

/* ----------------------------------------------------------------- 
 * 
 * Creates and handles task/assignment hiding 
 * Requires localStorage, might be cleared at somepoint...
 * 
 * ----------------------------------------------------------------- */


let TASKS_DB = JSON.parse(localStorage.getItem('tasks'));
let LIVE_TASKS = document.querySelectorAll('.mytasks > .taskrow');
syncTasks();


function syncTasks() {
    if (TASKS_DB == null) TASKS_DB = {};
    LIVE_TASKS.forEach(addCheckbox);
    console.log(TASKS_DB);
    localStorage.setItem('tasks', JSON.stringify(TASKS_DB));
}

function addCheckbox(task) {
    const taskId = serialiseTask(task);
    let check = document.getElementById(taskId);
    if (check == null) {
        check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.id = taskId;
        check.addEventListener('click', () => toggleTask(taskId));
        check.style.margin = '5px';
        task.querySelector('.media').prepend(check);
    }

    check.checked = TASKS_DB.hasOwnProperty(taskId);
    task.querySelectorAll('.taskcoursename, .taskdate').forEach(e => e.hidden = check.checked);
    if (check.checked) {
        task.style.opacity = 0.2;
    } else {
        task.style.removeProperty('opacity');
    }
}

function toggleTask(taskId) {
    if (TASKS_DB == null) return;
    console.log(`Toggling ${taskId}`);

    if (TASKS_DB.hasOwnProperty(taskId)) {
        delete TASKS_DB[taskId];
    } else {
        TASKS_DB[taskId] = true;
    }
    syncTasks();
}

function serialiseTask(task) {
    let urlParts = task.querySelector('.pull-left').getAttribute('href').split('?id=');
    let potentialId = parseInt(urlParts[1]);
    if (!isNaN(potentialId)) return `task_${potentialId}`;

    console.error('Could not parse task id', task);
    return null;
}
