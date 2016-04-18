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
            findGradeForUser: findGradeForUser,
            findGradeInClassForUser: findGradeInClassForUser,
            deleteGradeForUser: deleteGradeForUser,
            finishQuizPractice: finishQuizPractice,
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

        function deleteGradeForUser(userId, quizId) {
            return $http.delete("/api/project/user/" + userId + "/quiz/" + quizId);
        }

        function findGradeForUser(userId, gradeId) {
            return $http.get("/api/project/grade/" + gradeId + "/user/" + userId);
        }
        
        function findGradeInClassForUser(userId, classId, gradeId) {
            return $http.get("/api/project/grade/" + gradeId+ "/class/" + classId + "/user/" + userId);
        }

        function finishQuizPractice(userId, gradeId, grade) {
            return $http.put("/api/project/grade/" + gradeId + "/user/" + userId, grade);

        }

        function addFollowing(userId, followedUser) {
            return $http.post("/api/project/user/" + userId + "/following", followedUser);
        }

        function removeFollowing(userId, followedUsername) {
            return $http.delete("/api/project/user/" + userId + "/following/" + followedUsername);
        }

    }
})();
