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
    iframe.id = 'myIframe';
    iframe.src = chrome.extension.getURL("../popup.html");

    document.body.appendChild(iframe);

    const sendMessage = (value) => {
        chrome.runtime.sendMessage({ type: "value", value: value });
    }

    const receiveMessage = (message) => {
        if (message === "getValue") {
            let value = '';
            let elements = [];
            let className = '';
            let domain = window.location.hostname;

            if (domain.includes('.store.apple.com')) {
                className = 'rs-refundsummary-value column large-3 small-4 small-offset-1';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[3].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.narvar.com') {
                className = 'return-summary-estimated-refund-value';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.getcasely.com') {
                className = 'return-summary__total-amount';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.wearfigs.com' || domain === 'returns.verishop.com') {
                className = 'return-summary__total-amount';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.amazon.com') {
                className = 'a-section a-spacing-top-micro a-text-right';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('span')[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.beachbunnyswimwear.com') {
                className = 'return-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('span')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.macys.com') {
                className = 'pricing-wrapper';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('total')[0].getElementsByTagName('p')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.walmart.com') {
                className = 'order-total top-separator';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('heading-d no-margin')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.adidas.com') {
                className = 'gl-price gl-price--horizontal notranslate gl-label--bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('div')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.samsung.com') {
                className = 'rpb-row total-row';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('rpb-row-price')[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.target.com') {
                className = 'Row-uds8za-0 kxCChi h-text-lg h-text-bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('div')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.fahertybrand.com') {
                className = 'rpb-row total-row';
                elements = document.getElementsByTagName('return-totals');
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('totals-amount')[4].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'usprettylittlething.intelligentreturns.net') {
                className = 'amount-to-return-title';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('span')[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.bestbuy.com') {
                className = 'sku-item-with-total__item-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('dollar-amount')[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.stevemadden.com') {
                className = 'amount-row highlight-amount-row font-weight-bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('div')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.nike.com') {
                className = 'd-sm-flx flx-wr-sm-nw headline-5';
                elements = document.getElementsByClassName(className);
                const checkboxes = document.getElementsByClassName('css-1ie939s-return Item d-sm-flx flx-wr-sm-nw checked');
                return setTimeout(function () {
                    if (checkboxes.length > 0 && elements.length > 0) {
                        value = elements[0].getElementsByClassName('flx-dir-sm-r')[1].innerHTML;
                        sendMessage(value);
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