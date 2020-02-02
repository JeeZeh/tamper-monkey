// ==UserScript==
// @name         Univeristy of Surrey Catalogue ToC
// @namespace    https://github.com/JeeZeh/tamper-monkey
// @version      1.0.1
// @description  Adds a table of contents to Surrey University's Module catalogue
// @author       https://jeezeh.github.io
// @match        https://catalogue.surrey.ac.uk/*/module/*
// @include      https://*.githubusercontent.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @connect      githubusercontent.com
// @connect      raw.githubusercontent.com
// @updateURL    https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/surrey-catalogue-toc.user.js
// @downloadURL  https://raw.githubusercontent.com/JeeZeh/tamper-monkey/master/surrey-catalogue-toc.user.js
// @homepageURL  https://github.com/JeeZeh/tamper-monkey
// ==/UserScript==

main();

function generateCategories(selector) {
    if (!selector) {
        selector = '.h2';
    }

    const categories = document.querySelectorAll(selector);

    for (const c of categories) {
        c.original = c.innerText
        c.innerHTML = `<a name="${c.innerText.replace(' ', '')}"></a>${c.innerHTML} <span class="small"> • <a href="#toc">Back to ToC<a/></span>`;
    }

    return categories
}

function generateToC(categories) {
    let toc = document.createElement('div');
    toc.setAttribute('class', 'row');
    toc.setAttribute('id', 'toc');
    
    let rowContainer = document.createElement('div');
    rowContainer.setAttribute('class', 'col-md-12');
    
    let header = document.createElement('p');
    header.setAttribute('class', 'h2 border');
    header.innerText = 'Table of Contents';
    
    let list = document.createElement('ol')
    categories.forEach(c => {
        let item = document.createElement('li');
        item.innerHTML = `<a href="#${c.original.replace(' ', '')}">${c.original}</a>`;
        list.appendChild(item);
    });
    rowContainer.appendChild(header);
    rowContainer.appendChild(list);
    toc.appendChild(rowContainer);

    return toc;
}

function main() {
    const categories = generateCategories('.h2');
    const toc = generateToC(categories);
    
    let insertionPoint = document.querySelector('body > div.spec.module-spec > div > div > div:nth-child(2)');
    insertionPoint.parentElement.insertBefore(toc, insertionPoint);
}


