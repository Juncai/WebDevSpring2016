"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("HomeController", homeController);

    function homeController($location, UserService) {

        var vm = this;
        vm.currentUser = null;
        vm.login = login;
        vm.quizzesToDo = [];

        function init() {
            vm.currentUser = UserService.getCurrentUser();
            if (vm.currentUser) {
                findQuizzesToDo();
            }

        }

        init();

        function findQuizzesToDo() {
            vm.quizzesToDo = [];
            var gg;
            var clazz;
            var grade;
            for (var c in vm.currentUser.classes) {
                clazz = vm.currentUser.classes[c];
                for (var g in clazz.performance) {
                    grade = clazz.performance[g];
                    if (!grade.finished[0]) {
                        gg = {};
                        gg.quizId = grade.quizId;
                        gg.quizName = grade.quizName;
                        gg.classId = clazz._id;
                        vm.quizzesToDo.push(gg);
                    }
                }
            }
        }
        
        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .login(
                    user.username,
                    user.password
                )
                .then(
                    function (response) {
                        var resUser = response.data;
                        if (resUser) {
                            delete resUser.password;
                            UserService.setCurrentUser(resUser);
                            $location.url("/profile");
                        } else {
                            vm.message = "Login failed!";
                        }
                    },
                    function (response) {
                        vm.message = "Login failed!";
                    });
        }
    }
})();