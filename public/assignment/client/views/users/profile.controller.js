"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $location, UserService) {
        $scope.error = null;
        $scope.message = null;
        $scope.currentUser = UserService.getCurrentUser();

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        $scope.update = update;

        function update(user) {
            if (!user.password || !user.verifyPassword) {
                $scope.message = "Password is required.";
                return;
            }
            if (user.verifyPassword != user.password) {
                $scope.message = "Passwords don't match.";
                return;
            }
            if (!user.email) {
                $scope.message = "Email is required.";
                return;
            }
            UserService.updateUser($scope.currentUser._id, user);
        }

        function updateCallback(user) {
            $scope.error = null;
            $scope.message = null;

            if (user) {
                $scope.currentUser = user;
                $scope.message = "Update successfully.";
                UserService.setCurrentUser($scope.currentUser);
            } else {
                $scope.message = "Update failed";
            }
        }
    }
})();
