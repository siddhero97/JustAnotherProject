"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(pid) {
        this.pid = pid;
        this.userName = userName;
    }
    User.prototype.getPid = function () {
        return this.pid;
    };
    User.prototype.getUserName = function () {
        return this.userName;
    };
    User.prototype.setPid = function (pid) {
        this.pid = pid;
    };
    User.prototype.setUsername = function (userName) {
        this.userName = userName;
    };
    return User;
}());
exports.User = User;
