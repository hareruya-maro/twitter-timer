
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    chrome.storage.sync.get({
        isOn: 'ON',
    }, function (items) {
        // 機能がONの場合だけ
        if (items.isOn === 'ON') {
            chrome.tabs.query({ url: "https://twitter.com/*" }, function (tabs) {
                if (tabs.length > 0) {
                    tabs.map((tab) => {
                        chrome.tabs.remove(tab.id);
                    })
                }
            });
            chrome.tabs.query({ url: "https://*.twitter.com/*" }, function (tabs) {
                if (tabs.length > 0) {
                    tabs.map((tab) => {
                        chrome.tabs.remove(tab.id);
                    })
                }
            })
        }
    });

});

