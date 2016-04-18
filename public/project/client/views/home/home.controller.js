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
        vm.currentUser = UserService.getCurrentUser();
        vm.login = login;

        function init() {
            if (vm.currentUser) {
                $location.url("/profile");
            }

        }

        init();

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