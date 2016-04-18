/**
 * Created by jonca on 3/10/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               $location,
                               UserService,
                               SchoolService,
                               ClassService) {
        var vm = this;
        vm.message = null;
        var schoolId = $routeParams.unitid;
        vm.newClass = newClass;
        vm.school = {};
        vm.currentUser = UserService.getCurrentUser();

        function init() {
            if (vm.currentUser == null) {
                $location.url("/home");
            } else {
                vm.isTeacher = (vm.currentUser.role == "TEACHER");
            }
            if (schoolId == null) {
                $location.url("/search");
            } else {
                SchoolService.findSchoolByUNITID(schoolId)
                    .then(function (response) {
                        vm.school = response.data;
                    });
            }
        }

        init();

        function newClass(newClassName) {
            if (!newClassName) {
                vm.message = "Class name is required.";
                return;
            }
            
            for (var c in vm.school.classes) {
                if (vm.school.classes[c].name == newClassName) {
                    vm.message = "Class names may conflict.";
                    return;
                }
            }

            var newClass = {};
            newClass.name = newClassName;
            newClass.schoolId = vm.school.UNITID;
            newClass.schoolName = vm.school.name;
            newClass.teacher = vm.currentUser.username;
            newClass.created = Date.now();
            ClassService
                .createClass(newClass)
                .then(function (response) {
                    vm.school = response.data;
                });
        }
    }
})();