Number.prototype.pad = function (size = 2) {
    let str = this.toString();
    while (str.length < size) {
        str = "0" + str;
    }
    return str;
}