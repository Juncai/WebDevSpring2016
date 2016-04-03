"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($location, UserService) {
        var vm = this;
        vm.message = null;
        
        vm.login = login;

        function init() {

        }
        init();

        function login(user) {
            if (!user) {
                return;
            }
            UserService
                .findUserByCredentials(
                    user.username,
                    user.password
                )
                .then(function(response) {
                    if (response.data) {
                        var resUser = response.data;
                        delete resUser.password;
                        UserService.setCurrentUser(resUser);
                        $location.url("/profile");
                    }
                },
                function (response) {
                    vm.message  = "Login failed!";
                });
        }
    }
})();
