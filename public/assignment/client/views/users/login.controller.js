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
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
        }
    }
})();
