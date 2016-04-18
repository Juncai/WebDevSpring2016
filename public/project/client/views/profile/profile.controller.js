"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;

        vm.error = null;
        vm.message = null;
        vm.currentUser = null;
        vm.update = update;
        vm.follow = follow;
        vm.isSelf = true;
        vm.self = {};

        function init() {
            if (UserService.getCurrentUser() == null) {
                $location.url("/home");
                return;
            }
            if ($routeParams.username) {
                vm.isSelf = false;
                vm.self = UserService.getCurrentUser();
                UserService.findUserByUsername($routeParams.username)
                    .then(function (response) {
                        vm.currentUser = response.data;
                    })
            } else {
                UserService.profile(UserService.getCurrentUser()._id)
                    .then(function (response) {
                        vm.currentUser = response.data;
                        UserService.setCurrentUser(vm.currentUser);
                    });
            }
        }

        init();

        function update(user) {
            if (user.verifyPassword) {
                if (user.verifyPassword != user.password) {
                    vm.message = "Passwords don't match.";
                    return;
                }
            } else {
                delete user.password;
            }

            if (!user.email) {
                vm.message = "Email is required.";
                return;
            }
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function (response) {
                    // var cUser = response.data;
                    // if (cUser != null) {
                    //     vm.currentUser = cUser;
                    // }
                });
        }

        function follow(user) {
            UserService.addFollowing(vm.self._id, user)
                .then(
                    function (response) {
                        vm.currentUser = response.data;
                    }
                )
        }
    }
})();
