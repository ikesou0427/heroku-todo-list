exports.checkSignIn = function (req, res) {
    let result = '';
    if (req.session.password != undefined && req.session.userId != undefined) {
        result = true;
    }
    return result;
}

exports.isHalfWidthCharacters = str => str.match(/^[A-Za-z0-9]*$/) ? true : '';

exports.checkLength = (str,minLength,maxLength) => {
    return minLength <= str.length && str.length <= maxLength ? true :'';
}

exports.checkInputString = (str, minLength, maxLength) => {
    let checkStr = String(str);
    return this.isHalfWidthCharacters(checkStr) && this.checkLength(checkStr, minLength, maxLength) ? true : '';
}

// 日本語と半角英数のみを使用しているかチェック
exports.checkJaAndEn = str => {
    return (str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf-A-Za-z0-9]+$/)) ? true : '';
}

// https://gist.github.com/orleika/45ae49db4066f577fc7b  author:orleika
exports.getIP = req => {
    if (req.headers['x-forwarded-for']) {
        return req.headers['x-forwarded-for'];
    }
    if (req.connection && req.connection.remoteAddress) {
        return req.connection.remoteAddress;
    }
    if (req.connection.socket && req.connection.socket.remoteAddress) {
        return req.connection.socket.remoteAddress;
    }
    if (req.socket && req.socket.remoteAddress) {
        return req.socket.remoteAddress;
    }
    return '0.0.0.0';
};