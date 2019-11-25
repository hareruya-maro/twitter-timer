chrome.storage.sync.get({
    selected_moratorium: 5, // 初期設定：5分表示
    isOn: 'ON',
}, function (items) {
    let time = parseInt(items.selected_moratorium);

    // 機能がONの場合だけ
    if (items.isOn === 'ON') {
        setTimeout(() => {
            chrome.runtime.sendMessage("close", function (response) { });
        }, time * 1000); // デバッグのため秒で確認
    }
});

