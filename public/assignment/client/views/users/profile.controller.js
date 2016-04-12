"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($location, UserService) {
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.currentUser = UserService.getCurrentUser();

        if (!vm.currentUser) {
            $location.url("/home");
        } else {
            if (vm.currentUser.emails) {
                vm.currentUser.email = vm.currentUser.emails[0];
            }

        }


        vm.update = update;

        function update(user) {

            if (user.verifyPassword) {
                if (user.verifyPassword != user.password) {
                    vm.message = "Passwords don't match.";
                    return;
                }
            } else {
                delete user.password;
            }

            // TODO refactor email input
            if (!user.email) {
                vm.message = "Email is required.";
                return;
            }

            user.emails = [user.email];
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function (response) {
                        // do nothing
                    },
                    function (error) {
                        vm.error = error;
                    });
        }
    }
})();
