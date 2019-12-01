"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(pid) {
        this.pid = pid;
        this.hobbies = [];
        this.reciving = false;
        this.lang_code = "";
    }
    User.prototype.getPid = function () {
        return this.pid;
    };
    User.prototype.getrec = function() {
        return this.reciving;
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
    User.prototype.getLangCode = function (lang) {
        return this.lang_code;
    }
    User.prototype.setLangCode = function (code) {
        this.lang_code = code;
    }
    return User;
}());
exports.User = User;
