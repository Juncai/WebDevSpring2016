"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("HomeController", homeController);

    function homeController($location, UserService, QuizService) {

        var vm = this;
        vm.currentUser = UserService.getCurrentUser();
        vm.login = login;

        function init() {
            if (vm.currentUser) {
                vm.userQuizzes = userQuizzes();
                vm.quizzesTodo = quizzesTodo();
            }
        }

        init();

        function userQuizzes() {
            if (vm.currentUser) {
                return QuizService.findAllQuizzesForUser(vm.currentUser._id);
            }
            return null;
        }

        function quizzesTodo() {
            var quizToDo = [
                {
                    "_id": "111",
                    "title": "Sample Quiz 1"
                },
                {
                    "_id": "222",
                    "title": "Sample Quiz 2"
                }
            ];
            return quizToDo;
        }

        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .findUserByCredentials(
                    user.username,
                    user.password
                )
                .then(function (response) {
                    if (response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();