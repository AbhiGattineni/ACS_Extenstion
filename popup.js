document.addEventListener('DOMContentLoaded', function() {
    const keywordsInput = document.getElementById('keywordsInput');
    const displayArea = document.querySelector('section');
    const addKeyword = document.querySelector('.add-btn');
    const colorRadios = document.querySelectorAll('.clr');
    const checkbox = document.getElementById('cbx-3');

    const defaultKeywords = {
        'this': '#FF3946',
        'that': '#7cffc4',
        'the': '#e9ff70'
    };

    // Load checkbox state from localStorage or set it to false by default
    let checkboxState = JSON.parse(localStorage.getItem('checkboxState')) || false;

    // Function to save checkbox state to localStorage
    function saveCheckboxStateToLocalStorage() {
        localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
    }

    // Function to update checkbox state and save it to localStorage
    function updateCheckboxState(event) {
        checkboxState = event.target.checked;
        saveCheckboxStateToLocalStorage();
    }

    // Add event listener to checkbox to update its state when it changes
    checkbox.addEventListener('change', updateCheckboxState);

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

    // Set the initial state of the checkbox based on the loaded value
    checkbox.checked = checkboxState;
});
