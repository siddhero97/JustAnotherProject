"use strict";
exports.__esModule = true;
var Category = /** @class */ (function () {
    function Category(hobby) {
        this.users = [];
        this.hobby = hobby;
        console.log("HOBBY ", name, ": initialized");
    }
    Category.prototype.addUser = function (user) {
        this.users.push(user);
    };
    Category.prototype.getUsers = function () {
        return this.users;
    };
    return Category;
}());
exports.Category = Category;
