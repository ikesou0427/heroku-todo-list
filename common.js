exports.checkSignIn = function (req, res) {
    result = '';
    if (req.session.password != undefined && req.session.userId != undefined) {
        result = true;
    }
    return result;
}

exports.checkAccount