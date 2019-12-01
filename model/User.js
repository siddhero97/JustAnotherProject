"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(pid) {
        this.pid = pid;
        this.hobbies = [];
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
    User.prototype.getHobbies = function () {
        return this.hobbies;
    };
    User.prototype.addHobby = function (hobby) {
        this.hobbies.push(hobby);
    };
    User.prototype.addHobies = function (hobbies) {
        this.hobbies.concat(hobbies);
    };
    return User;
}());
exports.User = User;
