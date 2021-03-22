window.addEventListener('load', () => {
    var iframe = document.createElement('iframe');
    iframe.style.background = "white";
    iframe.style.border = "1px solid #E6E9ED";
    iframe.style.height = "0px";
    iframe.style.minHeight = "0px";
    iframe.style.width = "300px";
    iframe.style.position = "fixed";
    iframe.style.top = "0px";
    iframe.style.right = "0px";
    iframe.style.zIndex = "9000000000000000000";
    iframe.id = 'myFrame';
    iframe.src = chrome.extension.getURL("../popup.html");
    document.body.appendChild(iframe);

    const receiveMessage = (message) => {
        if (message === "getValue") {
            const dommain = window.location.hostname;
            let className = '';
            switch (dommain) {
                case 'returns.fahertybrand.com':
                    className = 'refund-estimate-total totals-amount';
                    break;
                case 'returns.narvar.com':
                    className = 'return-summary-refund-value';
                    break;
                case 'returns.wearfigs.com':
                    className = 'return-summary__total-amount';
                case 'www.amazon.com':
                    className = 'a-section a-spacing-top-micro a-text-right'
            }
            if (className) {
                const elements = document.getElementsByClassName(className);
                setTimeout(function() {
                    if (elements.length > 0) {
                        if (dommain === 'www.amazon.com') {
                            chrome.runtime.sendMessage({ type: "value", value: elements[0].getElementsByTagName('span')[0].innerHTML });
                        } else {
                            chrome.runtime.sendMessage({ type: "value", value: elements[0].innerHTML });
                        }
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }
        }
        if (message === "addIframe") {
            iframe.style.height = '200px'
        }
    }

    chrome.runtime.onMessage.addListener(receiveMessage);
});