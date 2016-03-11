"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("CardService", cardService);

    function cardService($rootScope) {
        var model = {
            cards: [
                {
                    "_id": 123, "quizID": 123,
                    "question": "Car",
                    "answer": "车",
                    "picture": "https://farm1.staticflickr.com/514/19933361592_5bd2542eb2_n.jpg"
                },
                {
                    "_id": 234, "quizID": 123,
                    "question": "Cat",
                    "answer": "猫",
                    "picture": "https://farm4.staticflickr.com/3665/10224967706_33f6f2b961_n.jpg"
                }
            ]


            //findUserByCredentials: findUserByCredentials,
            //findUserById: findUserById,
            //findUserByUsername: findUserByUsername,
            //findAllUsers: findAllUsers,
            //createUser: createUser,
            //deleteUserById: deleteUserById,
            //updateUser: updateUser,
            //setCurrentUser: setCurrentUser,
            //getCurrentUser: getCurrentUser
        };
        return model;

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function findUserByUsername(username) {
            var user = null;
            var cUser;
            for (var i in model.currentUsers) {
                cUser = model.currentUsers[i];
                if (cUser.username === username) {
                    user = cUser;
                    break;
                }
            }
            return user;
        }

        function findUserById(id) {
            var user = null;
            var cUser;
            for (var i in model.currentUsers) {
                cUser = model.currentUsers[i];
                if (cUser._id === id) {
                    user = cUser;
                    break;
                }
            }
            return user;
        }

        function findUserByCredentials(username, password, callback) {
            var user = null;
            var cUser;
            for (var i in model.currentUsers) {
                cUser = model.currentUsers[i];
                if (cUser.username === username &&
                    cUser.password === password) {
                    user = cUser;
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(model.currentUsers);
        }

        function createUser(user, callback) {
            var newUser = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password,
                roles: user.roles,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };
            model.currentUsers.push(newUser);
            callback(newUser);
        }

        function deleteUserById(userId, callback) {
            var indexToRemove = -1;
            var index;
            var cUser;
            for (index = 0; index < model.currentUsers.length; index++) {
                cUser = model.currentUsers[index];
                if (cUser._id == userId) {
                    indexToRemove = index;
                }
            }
            if (indexToRemove > -1) {
                model.currentUsers.splice(indexToRemove, 1);
            }
            callback(model.currentUsers);
        }

        function updateUser(userId, user, callback) {
            var cUser = model.findUserById(userId);
            if (cUser != null) {
                cUser.firstName = user.firstName;
                cUser.lastName = user.lastName;
                cUser.password = user.password;
                cUser.email = user.email;
            }
            callback(cUser);
        }
    }
})();
