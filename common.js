exports.checkSesson = function (req, res) {
    result = false;
    if (req.session.password != undefined && req.session.name != undefined) {
        result = true;
    }
    console.log('-----common-----', '\n', result,'-------------');
    return result;
}