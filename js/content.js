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
    if (window.location.hostname !== 'www.revolve.com' && window.location.hostname !== 'www.skechers.com' && window.location.hostname !== 'www.lulus.com') {
        iframe.src = chrome.extension.getURL("../popup.html");
    }

    document.body.appendChild(iframe);

    if (window.location.href === 'https://www.revolve.com/content/trackorder/') {
        let ifrm = document.getElementById('myIframe');
        ifrm.style.height = '200px';
        ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
        ifrm.document.open();
        className = 'shopping-summary__footer';
        elements = document.getElementsByClassName(className);
        const return_date_elements = document.getElementsByClassName('js-dropdown__menu popover__content');
        if (return_date_elements.length > 0) {
            if (new Date(return_date_elements[4].getElementsByTagName('span')[0].innerHTML.substr(28)) > new Date()) {
                if (elements.length > 0) {
                    value = elements[0].getElementsByClassName('shopping-summary__value')[0].innerHTML;
                    ifrm.document.write(`
                        <h1>Hello</h1>
                        <p>
                            <h3>Your estimated refund is <span id="estimate-refund">${value}</span></h3>
                        </p>
                    `);
                    let cssLink = document.createElement("link");
                    cssLink.href = chrome.extension.getURL("css/style.css");
                    cssLink.rel = "stylesheet";
                    cssLink.media = "screen";
                    ifrm.document.head.appendChild(cssLink);

                    ifrm.document.close();
                }
            }
        }
    }

    if (window.location.href === 'https://www.skechers.com/on/demandware.store/Sites-USSkechers-Site/en_US/Order-CheckStatus') {
        let ifrm = document.getElementById('myIframe');
        ifrm.style.height = '200px';
        ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
        ifrm.document.open();
        className = 'grand-total-sum';
        elements = document.getElementsByClassName(className);
        if (elements.length > 0) {
            value = elements[0].innerHTML;
            ifrm.document.write(`
                        <h1>Hello</h1>
                        <p>
                            <h3>Your estimated refund is <span id="estimate-refund">${value}</span></h3>
                        </p>
                    `);
            let cssLink = document.createElement("link");
            cssLink.href = chrome.extension.getURL("css/style.css");
            cssLink.rel = "stylesheet";
            cssLink.media = "screen";
            ifrm.document.head.appendChild(cssLink);

            ifrm.document.close();
        }
    }

    if (window.location.href.includes('https://www.lulus.com/myaccount/orders/return/')) {
        let ifrm = document.getElementById('myIframe');
        ifrm.style.height = '200px';
        ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
        ifrm.document.open();
        className = 'o-box__row c-refund__item o-box__row--last';
        var refreshIntervalId = setInterval(function () {
            elements = document.getElementsByClassName(className);
            if (elements.length > 0) {
                clearInterval(refreshIntervalId);
                value = elements[0].getElementsByTagName('span')[1].innerHTML;
                ifrm.document.write(`
                            <h1>Hello</h1>
                            <p>
                                <h3>Your estimated refund is <span id="estimate-refund">${value}</span></h3>
                            </p>
                        `);
                let cssLink = document.createElement("link");
                cssLink.href = chrome.extension.getURL("css/style.css");
                cssLink.rel = "stylesheet";
                cssLink.media = "screen";
                ifrm.document.head.appendChild(cssLink);

                ifrm.document.close();
            }
        }, 1000);


    }

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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.macys.com') {
                className = 'om_returns_estimated-credit';
                elements = document.getElementById(className);
                return setTimeout(function () {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.walmart.com') {
                className = 'total-refund font-bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                return setTimeout(function () {
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
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('totals-amount')[4].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'usprettylittlething.intelligentreturns.net' && window.location.href === 'https://usprettylittlething.intelligentreturns.net/main/select_payment_method') {
                className = 'amount_to_return_span';
                elements = document.getElementById(className);
                return setTimeout(function () {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
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
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.dickssportinggoods.com') {
                className = 'MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6 MuiGrid-grid-md-12';
                elements = document.getElementsByClassName(className);
                const checkboxes = document.getElementsByClassName('MuiButtonBase-root MuiIconButton-root MuiCheckbox-root MuiCheckbox-colorSecondary mts Mui-checked MuiIconButton-colorSecondary');
                return setTimeout(function () {
                    if (checkboxes.length > 0 && elements.length > 0) {
                        value = elements[0].getElementsByClassName('mbs')[0].getElementsByTagName('strong')[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'encore.brandedonline.com') {
                className = 'table table-borderless refund-table';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('tr')[2].getElementsByTagName('strong')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.thereformation.com') {
                className = 'account-content__block-items';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('account-content__block-item')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.newbalance.com') {
                className = 'font-body-large font-weight-bold ml-0 ml-lg-3';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.abercrombie.com') {
                className = 'transaction-summary-item-amount transaction-summary-negative';
                elements = document.getElementsByClassName(className);
                const submit_button = document.getElementsByClassName('progress-step-button');
                return setTimeout(function () {
                    if (submit_button[3].ariaCurrent === 'step' && elements.length > 0) {
                        value = elements[0].innerHTML.replace('-', '');
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.fila.com') {
                className = 'order-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('td')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.matchesfashion.com') {
                className = 'refundTotal';
                elements = document.getElementById(className);
                return setTimeout(function () {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.spanx.com') {
                className = 'mst-rma-box__content';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        const str = elements[0].getElementsByTagName('li')[0].getElementsByTagName('span')[1].innerHTML;
                        const index = str.lastIndexOf('($');
                        value = str.substring(index + 1, str.length - 2)
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.shoebacca.com') {
                className = 'returnOrder-head-EGG';
                elements = document.getElementsByClassName(className);
                const dropdown = document.getElementsByClassName('select-input-2XP');
                return setTimeout(function () {
                    if (dropdown.length > 0 && dropdown[0].value !== '0' && elements.length > 0) {
                        const span_arr = elements[0].getElementsByTagName('span');
                        value = span_arr[1].innerHTML + span_arr[2].innerHTML + span_arr[3].innerHTML + span_arr[4].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.victoriassecret.com') {
                className = 'fabric-h3-typography-element fabric-wcag-typography-element payment-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('td')[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.ssense.com') {
                className = 'span3 item-price';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML.replace('USD', '');
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.bloomingdales.com') {
                className = 'om_returns_estimated-credit';
                elements = document.getElementById(className);
                return setTimeout(function () {
                    if (elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.thenorthface.com') {
                className = 'order-total return-order-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.billabong.com') {
                className = 'total_line';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[5].getElementsByTagName('span')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'us.shein.com') {
                className = 'return-table';
                elements = document.getElementsByClassName(className);
                const checkbox = document.getElementsByClassName('S-checkbox fMHPzG S-checkbox_checkbox16 S-checkbox_normal S-checkbox_checked ga-return-select');
                return setTimeout(function () {
                    if (checkbox.length > 0 && elements.length > 0) {
                        value = elements[0].getElementsByTagName('td')[3].getElementsByTagName('div')[1].innerHTML.replace('US', '');
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.badgleymischka.com') {
                const ifr = document.getElementsByTagName('iframe')[0];
                console.log(ifr);
                className = 'table-row body return-type';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('span')[2].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.kennethcole.com') {
                className = 'pricing line-item-total-price-amount item-total-null';
                elements = document.getElementsByClassName(className);
                const checkbox = document.getElementsByClassName('form-group custom-control custom-checkbox return-product-line-item return-available return-selected');
                return setTimeout(function () {
                    if (checkbox.length > 0 && elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }
            if (domain === 'herschel.com') {
                className = 'col-xs-4 ng-binding';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[2].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'mmlafleur.com') {
                className = 'grand_total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('strong')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }


            if (domain === 'www.guess.com') {
                className = 'c-returns__panel-totals-value text-right m-0 p-0';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[4].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.savagex.com') {
                className = 'bfx-price Price-sc-1tftzty-0 dsbPEx BasketItemPrice__BasketPrice-u4ykr8-4 fahsvg bfx-list-price';
                elements = document.getElementsByClassName(className);
                const checkbox = document.getElementsByClassName('RadioGroup__Wrapper-sc-122h4vc-0 gOnAYm BorderedRadioGroup-sc-8blr08-0 ReturnRestockOptions__RestockRadioGroup-sc-4o0m7o-0 cSBNqE');
                return setTimeout(function () {
                    if (checkbox.length > 0 && elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.reebok.com') {
                className = 'gl-price-item notranslate';
                elements = document.getElementsByClassName(className);
                const checkbox = document.getElementsByClassName('gl-checkbox gl-checkbox--checked');
                return setTimeout(function () {
                    if (checkbox.length > 0 && elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'missguided.intelligentreturns.net') {
                className = 'amount_to_return_span';
                elements = document.getElementById(className);
                const page_validation = (window.location.pathname === '/main/select_shipping')
                return setTimeout(function () {
                    if (page_validation && elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.costco.com') {
                className = 'hidden-xs hidden-md hidden-sm col-xl-2 col-lg-2 align_right order_details_item_details_cost';
                elements = document.getElementsByClassName(className);
                const checkbox = document.getElementsByClassName('big-green');
                return setTimeout(function () {
                    if (checkbox.length > 0 && elements.length > 0) {
                        value = elements[0].getElementsByTagName('p')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.cuyana.com') {
                className = 'pricing line-item-total-price-amount';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.roxy.com' || domain === 'www.rvca.com') {
                className = 'block_totals';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByClassName('total_line')[5].getElementsByTagName('span')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'pacsun.letslinc.com') {
                className = 'product_properties';
                elements = document.getElementsByClassName(className);
                let step2 = document.getElementsByClassName('progress_step_bubble active customizable')
                return setTimeout(function () {
                    if (step2.length > 1 && step2[1].getElementsByClassName('progress_step_bubble_text')[0].innerHTML === '2' && elements.length > 0) {
                        value = elements[1].getElementsByClassName('product_property')[3].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'gymshark.intelligentreturns.net') {
                className = 'amount_to_return_span';
                elements = document.getElementById(className);
                const step3 = document.getElementsByClassName('step-3 current');
                return setTimeout(function () {
                    if (step3.length > 0 && elements) {
                        value = elements.innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'www.nordstrom.com') {
                let index = undefined;
                elements = document.getElementsByTagName('div');
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].innerHTML == 'Refund total including tax') {
                        index = i - 2;
                        break;
                    }
                }
                return setTimeout(function () {
                    if (index) {
                        value = elements[index].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'draperjames.happyreturns.com' || domain === 'universalstandard.happyreturns.com' || domain === 'cariuma.happyreturns.com' || domain === 'publicrec.happyreturns.com' || domain === 'huckberry.happyreturns.com' || domain === 'hillflint.happyreturns.com' || domain === 'andieswim.happyreturns.com') {
                className = 'amount-row highlight-amount-row font-weight-bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('div')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'beach-riot.loopreturns.com') {
                className = 'return-summary__total-amount';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'us.romwe.com') {
                className = 'return-usprice';
                elements = document.getElementsByClassName(className);
                const opa = document.getElementsByClassName('S-radio ieTZrC S-radio_radio20 S-radio_normal S-radio_checked');
                return setTimeout(function () {
                    if (opa.length > 0 && opa[0].getAttribute("da-label") === "Payment Account" && elements.length > 0) {
                        value = elements[0].innerHTML.trim().substring(3, elements[0].innerHTML.trim().length - 1);
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'olivers.loopreturns.com') {
                className = 'base-text return-summary__value display-large';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            // New store August5th
            // Important, first remove the 'returns.narvar.com' section (line 129) already added

            if (window.location.href.includes('https://returns.narvar.com/vince/returns/step-2')) {
                className = 'est-refund';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.narvar.com') {
                className = 'return-summary-refund-value _2dRR';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (['exchanges.shopduer.com',
                'returns.baseballism.com',
                'returns.marinelayer.com',
                'returns.oneillclothing.com',
                'exchanges.allbirds.com',
                'exchanges.puravidabracelets.com',
                'returns.hourglasscosmetics.com',
                'returns.thrivecausemetics.com',
                'returns.brooklinen.com'
            ].includes(domain)) {
                className = 'base-text return-summary__value display-large';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (['returns.gathre.com',
                'returns.unique-vintage.com',
                'unique-vintage.returnly.com',
                'felinagroup.returnly.com',
                'returns.beyondyoga.com',
                'returns.thirdlove.com'].includes(domain)) {
                className = 'return-total';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('span')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (['returns.cultgaia.com', 'returns.sundryclothing.com'].includes(domain)) {
                className = 'refund-estimate-total totals-amount';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'returns.fanatics.com') {
                className = 'return-total';
                elements = document.getElementsByClassName(className);
                paymentMethodChecks = document.getElementsByClassName('return-summary__refund-method-option selected');
                return setTimeout(function () {
                    if (elements.length > 0 && paymentMethodChecks.length > 0) {
                        value = elements[0].getElementsByTagName('span')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }

            if (domain === 'us-gymshark.happyreturns.com') {
                className = 'amount-row highlight-amount-row font-weight-bold';
                elements = document.getElementsByClassName(className);
                return setTimeout(function () {
                    if (elements.length > 0) {
                        value = elements[0].getElementsByTagName('div')[1].innerHTML;
                        sendMessage(value);
                        iframe.style.height = '200px'
                    } else {
                        iframe.style.height = '0px'
                    }
                }, 500);
            }
        }
    }

    chrome.runtime.onMessage.addListener(receiveMessage);
});