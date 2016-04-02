"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function register(user) {
            vm.message = null;
            if (user == null) {
                vm.message = "Invalid information input.";
                return;
            }
            if (!user.username) {
                vm.message = "Username is required.";
                return;
            }
            if (!user.password || !user.verifyPassword) {
                vm.message = "Password is required.";
                return;
            }
            if (user.verifyPassword != user.password) {
                vm.message = "Passwords don't match.";
                return;
            }
            if (!user.email) {
                vm.message = "Email is required.";
                return;
            }
            //var userWithSameUsername = UserService.findUserByUsername(user.username);
            //if (userWithSameUsername != null) {
            //    vm.message = "Existing username.";
            //    return;
            //}
            user.firstName = "";
            user.lastName = "";
            user.roles = [];
            var userExisted = false;
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    if (reponse != null) {
                        userExisted = true;
                    }
                });

            if (userExisted) {
                vm.message("Username existed!");
                return;
            }

            UserService
                .createUser(user)
                .then(function (response) {
                    var users = response.data;
                    for (var u in users) {
                       if (users[u].username == user.username) {
                           UserService.setCurrentUser(users[u]);
                           $location.url("/profile");
                           break;
                       }
                    }
                });
        }
    }
})();