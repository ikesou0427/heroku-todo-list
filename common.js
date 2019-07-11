exports.checkSesson = function (req, res) {
    result = '';
    if (req.session.password != undefined && req.session.name != undefined) {
        result = true;
    }
    return result;
}