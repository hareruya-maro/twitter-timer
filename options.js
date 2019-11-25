function statusSet(msg) {
    var status = document.getElementById('status');
    status.textContent = msg;
    setTimeout(function () {
        if (status.textContent === msg) {
            status.textContent = '';
        }
    }, 1500);
}


// 設定画面で保存ボタンを押されたら
function save_options() {

    // 設定値を変数に格納
    var moratorium = document.getElementById('moratorium').value;
    var isCheck = document.getElementById('valid').checked;

    if (isNumber(moratorium)) {
        // chromeアカウントと紐づくストレージに保存
        chrome.storage.sync.set({
            selected_moratorium: moratorium,
        }, function () {
            var msg = chrome.i18n.getMessage("savesuccess");
            statusSet(msg);
        });
    } else {
        var status = document.getElementById('status');
        status.textContent = 'Error!! input value is not Number.';
    }
}

// 設定画面で設定を表示する
function restore_options() {

    // 画面表示メッセージ取得
    var displayableMsg = chrome.i18n.getMessage('displayableTime');
    var save = chrome.i18n.getMessage('save');
    var displayableMsgDiv = document.getElementById('displayableMsg');
    displayableMsgDiv.textContent = displayableMsg;
    var saveButton = document.getElementById('save');
    saveButton.textContent = save;

    // デフォルト値は、ここで設定する
    chrome.storage.sync.get({
        selected_moratorium: '5',
        isOn: 'ON',
        // 保存された値があったら、それを使う
    }, function (items) {
        document.getElementById('moratorium').value = items.selected_moratorium;
        document.getElementById('valid').checked = items.isOn === 'ON';
        document.getElementById('moratorium').disabled = items.isOn !== 'ON';
        document.getElementById('save').disabled = items.isOn !== 'ON';
    });
}

/**
 * 数値チェック関数
 * 入力値が数値 (符号あり小数 (- のみ許容)) であることをチェックする
 * [引数]   numVal: 入力値
 * [返却値] true:  数値
 *          false: 数値以外
 */
function isNumber(numVal) {
    // チェック条件パターン
    var pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
    // 数値チェック
    return pattern.test(numVal);
}

function checkStateChanged() {
    var isCheck = document.getElementById('valid').checked;
    document.getElementById('moratorium').disabled = !isCheck;
    document.getElementById('save').disabled = !isCheck;
    var isOn = 'ON';
    if (!isCheck) {
        isOn = 'OFF';
    }

    chrome.storage.sync.set({
        isOn: isOn,
    }, function () {
        var msg = chrome.i18n.getMessage(isCheck ? 'on' : 'off');

        statusSet(msg);
    });


}

// 画面表示と保存ボタンのイベントを設定
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('valid').addEventListener('change', checkStateChanged);
