"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;
        var dummyUser =
        {
            "_id": 123, "firstName": "Alice", "lastName": "Wonderland", "birthdate": "2000-10-5",
            "password": "alice", "role": "student", "email": "abc@gmail.com",
            "followed": [234, 345], "following": [345, 456], "quizList": [123, 234], "classes": [123, 234]
        };

        function login(user) {
            $rootScope.currentUser = dummyUser;
            $location.url("/profile");
        }
    }
})();
