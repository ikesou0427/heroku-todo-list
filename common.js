exports.checkSignIn = function (req, res) {
    let result = '';
    if (req.session.password != undefined && req.session.userId != undefined) {
        result = true;
    }
    return result;
}

exports.isHalfWidthCharacters = str => str.match(/^[A-Za-z0-9]*$/);

exports.checkLength = (str,minLength,maxLength) => {
    return minLength <= str.length && str.length <= maxLength ? true :'';
}

exports.checkInputString = (str, minLength, maxLength) => {
    let checkStr = String(str);
    console.log(str);
    console.log('ishalf', this.isHalfWidthCharacters(checkStr));
    console.log('length',this.checkLength(checkStr, minLength, maxLength));
    console.log(this.isHalfWidthCharacters(checkStr) && this.checkLength(checkStr, minLength, maxLength) ? true : '');
    return this.isHalfWidthCharacters(checkStr) && this.checkLength(checkStr, minLength, maxLength) ? true : '';
}