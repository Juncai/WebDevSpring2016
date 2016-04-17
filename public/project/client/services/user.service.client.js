"use strict";
/**
 * Created by Jun Cai on 2/22/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .factory("UserService", userService);

    function userService($http, $rootScope) {
        var model = {
            register: register,
            login: login,
            logout: logout,
            profile: profile,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            findUserByUsername: findUserByUsername,
            // for class
            findGradeInClassById: findGradeInClassById,
            // for grade
            createQuizForUser: createQuizForUser,
            deleteQuizById: deleteQuizById,
            findQuizById: findQuizById,
            // for users
            addFollowing: addFollowing,
            removeFollowing: removeFollowing,

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

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function login(username, password) {
            var credentials = {username: username, password: password};
            return $http.post("/api/project/login", credentials);
        }

        function logout(user) {
            return $http.post("/api/project/logout", user);
        }

        function profile(id) {
            return $http.get("/api/project/user/" + id);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user/username/" + username);
        }

        function findGradeInClassById(userId, classId, gradeId) {
            return $http.get("/api/project/user/" + userId + "/class/" + classId + "/grade/" + gradeId);
        }

        function createQuizForUser(userId, quiz) {
            return $http.post("/api/project/user/" + userId + "/quiz", quiz);
        }

        function deleteQuizById(userId, quizId) {
            return $http.delete("/api/project/user/" + userId + "/quiz/" + quizId);
        }

        function findQuizById(userId, quizId) {
            return $http.get("/api/project/user/" + userId + "/quiz/" + quizId);
        }

        function addFollowing(userId, followedUser) {
            return $http.post("/api/project/user/" + userId + "/following", followedUser);
        }

        function removeFollowing(userId, followedUsername) {
            return $http.delete("/api/project/user/" + userId + "/following/" + followedUsername);
        }

    }
})();
