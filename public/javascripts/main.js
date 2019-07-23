// 日本語と半角英数のみを使用しているかチェック
exports.checkJaAndEn = str => {
    return (str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf-A-Za-z0-9]+$/)) ? true : '';
}

$(function () {
    $('.list-checkbox').click(function () {
        alert('hello world!');
    });
});