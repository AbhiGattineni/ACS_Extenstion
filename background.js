chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'highlight') {
        const keywords = request.keywords;
        if (keywords && keywords.length > 0) {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs && tabs.length > 0) {
                    const tabId = tabs[0].id;
                    console.log('Tab ID:', tabId);
                    chrome.storage.local.get('keywordsColors', function (data) {
                        const keywordsColors = data.keywordsColors || {};
                        chrome.tabs.sendMessage(tabId, { action: 'highlight', keywords: keywords, keywordsColors: keywordsColors });
                    });
                }
            });
        }
    }
});
