const receiveMessage = (message) => {
    if (message.type === 'getValue') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'getValue');
        });
    }
    if (message.type === 'value') {
        chrome.runtime.sendMessage({ type: 'value', value: message.value });
    }
};

chrome.runtime.onMessage.addListener(receiveMessage);