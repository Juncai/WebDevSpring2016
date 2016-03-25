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
        var schoolId = $routeParams.schoolId;
        vm.newClass = newClass;
        vm.school = SchoolService.findSchoolByID(schoolId);
        vm.classes = null;
        vm.currentUser = UserService.getCurrentUser();

        function init() {
            if (schoolId == null) {
                $location.url("/search");
            } else {
                ClassService
                    .findClassesBySchoolId(schoolId)
                    .then(function (response) {
                        vm.classes = response.data;
                    });

            }
        }

        init();

        function newClass(newClassName) {
            if (!newClassName) {
                vm.message = "Class name is required.";
                return;
            }
            var newClass = {};
            newClass.name = newClassName;
            newClass.schoolId = vm.school.UNITID;
            newClass.teacher = null;
            newClass.created = Date.now();
            ClassService
                .createClass(vm.currentUser._id, newClass)
                .then(function (response) {
                    var nClasses = response.data;
                    if (nClasses != null) {
                        var classForCurrentSchool = []
                        for (var c in nClasses) {
                            if (nClasses[c].schoolId == vm.school.UNITID) {
                                classForCurrentSchool.push(nClasses[c]);
                            }
                        }
                        vm.classes = classForCurrentSchool;
                    } else {
                        vm.message = "Class names may conflict.";
                    }
                });
        }
    }
})();