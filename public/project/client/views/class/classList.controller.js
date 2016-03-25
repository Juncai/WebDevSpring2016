"use strict";
/**
 * Created by Jun Cai on 2/13/2016.
 */

(function () {
    angular
        .module("QuizZ")
        .controller("ClassListController", classListController);

    function classListController($location, ClassService, UserService) {
        var vm = this;
        vm.currentUser = UserService.getCurrentUser();
        vm.classes = [];

        function init() {
            if (vm.currentUser == null) {
                $location.url("/home");
            } else {
                ClassService
                    .findClassesByUserId(vm.currentUser._id)
                    .then(function (response) {
                        vm.classes = response.data;
                    });
            }

        }

        init();

    }
})();
