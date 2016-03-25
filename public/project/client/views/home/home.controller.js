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

        function init() {
            vm.userQuizzes = userQuizzes();
            vm.quizzesTodo = quizzesTodo();
        }
        init();

        function userQuizzes() {
            if (vm.currentUser) {
                return QuizService.findAllQuizzesForUser(vm.currentUser._id);
            }
            return null;
        }

        function quizzesTodo() {
            return null;
        }

    }
})();