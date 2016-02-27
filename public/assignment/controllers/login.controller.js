"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, $rootScope, $location, UserService) {
        $scope.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password, loginCallback);
        }

        function loginCallback(user) {
            if (user) {
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();
