"use strict";
exports.__esModule = true;
var Hobby = /** @class */ (function () {
    function Hobby(name) {
        this.name = name;
        this.listOfUsers = [];
        console.log("HOBBY ", name, ": initialized");
    }
    Hobby.prototype.addUser = function (user) {
        this.listOfUsers.push(user);
    };
    Hobby.prototype.getUsers = function () {
        return this.listOfUsers;
    };
    return Hobby;
}());
exports.Hobby = Hobby;
