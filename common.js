exports.checkSignIn = function (req, res) {
    result = '';
    if (req.session.password != undefined && req.session.userId != undefined) {
        result = true;
    }
    return result;
}

exports.isHalfWidthCharacters = function (str) {
    let str = toString(str);
    return result = (str.match(/^[A-Za-z0-9]*$/));
}