"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ProfileController", profileController);

    function profileController($location, UserService) {
        var vm = this;

        vm.error = null;
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();
        vm.update = update;

        function init() {
            if (!vm.currentUser) {
                $location.url("/home");
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
    }
})();
