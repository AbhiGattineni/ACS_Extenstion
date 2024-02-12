document.addEventListener('DOMContentLoaded', function() {
    const highlightButton = document.getElementById('highlightButton');
    const keywordsInput = document.getElementById('keywordsInput');
    const displayArea = document.querySelector('section');
    const addKeyword = document.querySelector('.add-btn');

    let keywordsList = ['keyword1', 'keyword2', 'keyword3'];

    keywordsList.forEach(keyword => {
        const para = document.createElement('p');
        para.textContent = keyword;
        para.classList.add('tab');
        displayArea.appendChild(para);
    });
    addKeyword.addEventListener('click', function() {
        const keyword = keywordsInput.value.trim();
        if (keyword !== '') {
            keywordsList.push(keyword);

            const para = document.createElement('p');
            para.textContent = keyword;
            para.classList.add('tab');
            displayArea.appendChild(para);

            keywordsInput.value = '';
        }
    });
    highlightButton.addEventListener('click', function() {
        const keywords = keywordsInput.value.trim();
        if (keywords !== '') {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                const activeTab = tabs[0];
                chrome.tabs.sendMessage(activeTab.id, { action: 'highlight', keywords: keywords });
            });
        }
    });
});
