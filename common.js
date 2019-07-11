exports.checkSesson = function (req, res) {
    result = '';
    if (req.session.password != undefined && req.session.name != undefined) {
        result = true;
    }
    console.log('-----common-----', '\n', result, '\n','-------------');
    return result;
}