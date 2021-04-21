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
                return setTimeout(function() {
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
                return setTimeout(function() {
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
                return setTimeout(function() {
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
                return setTimeout(function() {
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
                return setTimeout(function() {
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
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('span')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.macys.com') {
                className = 'om_returns_estimated-credit';
                elements = document.getElementById(className);
                return setTimeout(function() {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.walmart.com') {
                className = 'total-refund font-bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.adidas.com') {
                className = 'gl-price gl-price--horizontal notranslate gl-label--bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
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
                return setTimeout(function() {
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
                const submit_button = document.getElementById('step-three-complete-button');
                if (submit_button) {
                    return sendMessage(localStorage.getItem('TARGET_REFUND_VALUE'));
                } else {
                    iframe.style.height = '0px';
                }
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML;
                        localStorage.setItem('TARGET_REFUND_VALUE', value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.fahertybrand.com') {
                className = 'rpb-row total-row';
                elements = document.getElementsByTagName('return-totals');
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('totals-amount')[4].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'usprettylittlething.intelligentreturns.net' && window.location.href === 'https://usprettylittlething.intelligentreturns.net/main/select_payment_method') {
                className = 'amount_to_return_span';
                elements = document.getElementById(className);
                return setTimeout(function() {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.bestbuy.com') {
                className = 'sku-item-with-total__item-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
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
                return setTimeout(function() {
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
                return setTimeout(function() {
                    if (checkboxes.length > 0 && elements.length > 0) {
                        value = elements[0].getElementsByClassName('flx-dir-sm-r')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.dickssportinggoods.com') {
                className = 'MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-md-12';
                elements = document.getElementsByClassName(className);
                const checkboxes = document.getElementsByClassName('MuiButtonBase-root MuiIconButton-root jss1 MuiCheckbox-root MuiCheckbox-colorSecondary mts jss2 Mui-checked MuiIconButton-colorSecondary');
                return setTimeout(function() {
                    if (checkboxes.length > 0 && elements.length > 0) {
                        value = elements[0].getElementsByClassName('mbs')[0].getElementsByTagName('strong')[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'encore.brandedonline.com') {
                className = 'table table-borderless refund-table';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('tr')[2].getElementsByTagName('strong')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.thereformation.com') {
                className = 'account-content__block-items';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('account-content__block-item')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.newbalance.com') {
                className = 'font-body-large font-weight-bold ml-0 ml-lg-3';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.abercrombie.com') {
                className = 'transaction-summary-item-amount transaction-summary-negative';
                elements = document.getElementsByClassName(className);
                const submit_button = document.getElementsByClassName('progress-step-button');
                return setTimeout(function() {
                    if (submit_button[3].ariaCurrent === 'step' && elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.fila.com') {
                className = 'order-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('td')[1].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.matchesfashion.com') {
                className = 'refundTotal';
                elements = document.getElementById(className);
                return setTimeout(function() {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.spanx.com') {
                className = 'mst-rma-box__content';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        const str = elements[0].getElementsByTagName('li')[0].getElementsByTagName('span')[1].innerHTML;
                        const index = str.lastIndexOf('($');
                        console.log(index)
                        value = str.substring(index + 1, str.length - 2)
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.shoebacca.com') {
                className = 'orderItemsDetail-totalPrice-SPB';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML.replace('Total ', '');
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.victoriassecret.com') {
                className = 'fabric-h3-typography-element fabric-wcag-typography-element payment-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('td')[0].innerHTML;
                        sendMessage(value);
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.ssense.com') {
                className = 'span3 item-price';
                elements = document.getElementsByClassName(className);
                return setTimeout(function() {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML.replace('USD', '');
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