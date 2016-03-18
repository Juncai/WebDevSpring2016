"use strict";
/**
 * Created by Phoenix on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", sidebarController);

    function sidebarController($scope, $location, UserService) {
        $scope.$location = $location;
        $scope.isAdmin = isAdmin;

        function isAdmin() {
            var user = UserService.getCurrentUser();
            return (user != null && user.roles != null && user.roles.indexOf("admin") != -1);
        }
    }
})();