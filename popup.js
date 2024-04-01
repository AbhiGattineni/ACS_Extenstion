document.addEventListener('DOMContentLoaded', function() {
    const keywordsInput = document.getElementById('keywordsInput');
    const displayArea = document.querySelector('section');
    const addKeyword = document.querySelector('.add-btn');
    const colorRadios = document.querySelectorAll('.clr');

    const defaultKeywords = {
        'this': '#FF3946',
        'that': '#7cffc4',
        'the': '#e9ff70'
    };

    let keywordsColors = JSON.parse(localStorage.getItem('keywordsColors')) || defaultKeywords;

    function saveKeywordsColorsToLocalStorage() {
        localStorage.setItem('keywordsColors', JSON.stringify(keywordsColors));
    }

    function addKeywordWithColor(keyword, color) {
        const para = document.createElement('p');
        const i = document.createElement('i');
        i.setAttribute('class', 'bx bxs-x-circle');
        para.textContent = keyword;
        para.style.backgroundColor = color;
        para.classList.add('tab');
        displayArea.appendChild(para);
        if (!(keyword in defaultKeywords)) {
            para.appendChild(i);
            i.addEventListener('click', function() {
                deleteKeywordAndDisplay(keyword);
            });
        }
    }

    function addKeywordToStorageAndDisplay(keyword, color) {
        keywordsColors[keyword] = color;
        saveKeywordsColorsToLocalStorage();
        addKeywordWithColor(keyword, color);
    }

    function deleteKeywordAndDisplay(keyword) {
        delete keywordsColors[keyword];
        saveKeywordsColorsToLocalStorage();
        loadKeywordsFromStorageAndDisplay();
    }

    function loadKeywordsFromStorageAndDisplay() {
        displayArea.innerHTML = '';
        Object.keys(keywordsColors).forEach(keyword => {
            addKeywordWithColor(keyword, keywordsColors[keyword]);
        });
    }

    loadKeywordsFromStorageAndDisplay();

    addKeyword.addEventListener('click', function() {
        const keyword = keywordsInput.value.trim();
        if (keyword !== '') {
            let color;
            if (colorRadios[0].checked) {
                color = '#FF3946'; // Red color
            } else if (colorRadios[1].checked) {
                color = '#7cffc4'; // Green color
            } else {
                color = '#e9ff70'; // Yellow color
            }
            addKeywordToStorageAndDisplay(keyword, color);
            keywordsInput.value = '';
        }
    });

    // Automatically trigger highlighting functionality
    const keywordsWithColors = Object.entries(keywordsColors).map(([keyword, color]) => ({ keyword, color }));
    chrome.runtime.sendMessage({ action: 'highlight', keywords: keywordsWithColors });

});
