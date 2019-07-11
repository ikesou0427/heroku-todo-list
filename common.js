exports.checkSignIn = function (req, res) {
    result = '';
    if (req.session.password != undefined && req.session.userId != undefined) {
        result = true;
    }
    return result;
}

exports.isHalfWidthCharacters = str => str.match(/^[A-Za-z0-9]*$/);