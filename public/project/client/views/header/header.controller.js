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
        $scope.isTeacher = isTeacher;
        // $scope.currentUser = UserService.getCurrentUser();
        

        function isTeacher() {
            if (UserService.getCurrentUser() != null) {
                return UserService.getCurrentUser().role == 'TEACHER';
            }
            return false;
        }
        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }
    }
})();