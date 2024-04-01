chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'highlight') {
        const keywordsWithColors = message.keywords;
        if (keywordsWithColors && keywordsWithColors.length > 0) {
            // Remove existing highlighting spans
            document.querySelectorAll('span.keyword-highlight').forEach(function(span) {
                span.outerHTML = span.innerHTML;
            });

            keywordsWithColors.forEach(({ keyword, color }) => {
                const regex = new RegExp('\\b' + keyword + '\\b', 'gi');
                document.querySelectorAll('*').forEach(function(node) {
                    node.innerHTML = node.innerHTML.replace(regex, match => {
                        return `<span class="keyword-highlight" style="background-color: ${color};">${match}</span>`;
                    });
                });
            });
        }
    }
});
