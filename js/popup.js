document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() { chrome.runtime.sendMessage({ type: 'getValue' }); }, 1000);
});

const receiveMessage = (message) => {
    if (message.type === 'value') {
        document.getElementById("estimate-refund").innerHTML = message.value;
        chrome.runtime.sendMessage({ type: 'addIframe' });
    }
}

chrome.runtime.onMessage.addListener(receiveMessage);