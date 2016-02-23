/**
 * Created by jonca on 2/22/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($rootScope) {
        var currentUsers =
            [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;

        function findUserByCredentials(username, password, callback) {
            var index;
            var user = null;
            var cUser;
            for (index = 0; index < currentUsers.length; index++) {
                cUser = currentUsers[index];
                if (cUser.username == username && cUser.password == password) {
                    user = cUser;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(currentUsers);
        }

        function createUser(user, callback) {
            // TODO need sanity check (required fields, existing username...)
            user._id = (new Date).getTime();
            currentUsers.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            var indexToRemove = -1;
            var index;
            var cUser;
            for (index = 0; index < currentUsers.length; index++) {
                cUser = currentUsers[index];
                if (cUser._id == userId) {
                    indexToRemove = index;
                }
            }
            if (indexToRemove > -1) {
                currentUsers.splice(indexToRemove, 1);
            }
            callback(currentUsers);
        }

        function updateUser(userId, user, callback) {
            var index;
            var cUser;
            for (index = 0; index < currentUsers.length; index++) {
                cUser = currentUsers[index];
                if (cUser._id == userId) {
                    for (var name in user) {
                        cUser[name] = user[name];
                    }
                    callback(cUser);
                    break;
                }
            }
        }
    }
})();
