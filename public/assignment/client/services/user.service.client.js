"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var model = {
            login: login,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            register: register,
            logout: logout,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserAdmin: updateUserAdmin,
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

        function login(user) {
            return $http.post("/api/assignment/login", user);
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function logout(user) {
            return $http.post("/api/assignment/logout", user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function updateUserAdmin(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function findUserById(id) {
            return $http.get("/api/assignment/admin/user/" + id);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }
    }
})();
