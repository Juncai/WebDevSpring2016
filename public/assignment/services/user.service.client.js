"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($rootScope) {
        var model = {
            currentUsers: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"], "email": ""
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"], "email": ""
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"], "email": ""
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"], "email": ""
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"], "email": ""
                }
            ],

            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
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
                password: user.password
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
