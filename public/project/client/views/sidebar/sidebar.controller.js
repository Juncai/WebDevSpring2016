"use strict";
/**
 * Created by Phoenix on 2/13/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("SidebarController", sidebarController);

    function sidebarController($location, UserService) {
        var vm = this;
        vm.$location = $location;
        vm.isTeacher = isTeacher;
        vm.currentUser = UserService.getCurrentUser();
        

        function isTeacher() {
            if (UserService.getCurrentUser() != null) {
                return UserService.getCurrentUser().role == 'TEACHER';
            }
            return false;
        }
    }
})();