"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function() {
    angular
        .module("QuizZ")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.logout = logout;
        //$scope.isAdmin = isAdmin;

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        //function isAdmin() {
        //    var user = UserService.getCurrentUser();
        //    return (user != null && user.roles.indexOf("admin") != -1);
        //}
    }
})();