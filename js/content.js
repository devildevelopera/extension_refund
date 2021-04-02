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
            let domain = window.location.hostname;
            let className = '';
            if (domain.includes('.store.apple.com')) {
                domain = 'www.apple.com';
            }
            switch (domain) {
                case 'returns.fahertybrand.com':
                    className = 'refund-estimate-total totals-amount';
                    break;
                case 'returns.narvar.com':
                    className = 'return-summary-refund-value';
                    break;
                case 'returns.wearfigs.com':
                    className = 'return-summary__total-amount';
                    break;
                case 'returns.verishop.com':
                    className = 'return-summary__total-amount';
                    break;
                case 'www.amazon.com':
                    className = 'a-section a-spacing-top-micro a-text-right';
                    break;
                case 'returns.beachbunnyswimwear.com':
                    className = 'return-total'
                    break;
                case 'www.apple.com':
                    className = 'rs-refundsummary-value column large-3 small-4 small-offset-1';
                    break;
            }
            if (className) {
                const elements = document.getElementsByClassName(className);
                setTimeout(function () {
                    if (elements.length > 0) {
                        if (domain === 'www.amazon.com') {
                            chrome.runtime.sendMessage({ type: "value", value: elements[0].getElementsByTagName('span')[0].innerHTML });
                        } else if (domain === 'returns.beachbunnyswimwear.com') {
                            chrome.runtime.sendMessage({ type: "value", value: elements[0].getElementsByTagName('span')[1].innerHTML });
                        } else if (domain === 'www.apple.com') {
                            chrome.runtime.sendMessage({ type: "value", value: elements[3].innerHTML });
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