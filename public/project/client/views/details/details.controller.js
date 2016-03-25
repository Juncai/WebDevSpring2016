/**
 * Created by jonca on 3/10/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               $location,
                               SchoolService,
                               ClassService) {
        var vm = this;
        var schoolID = $routeParams.schoolID;

        function init() {
            if (schoolID != null) {
                vm.school = SchoolService.findSchoolByID(schoolID);
                vm.classes = ClassService.findClassBySchoolID(schoolID);
                vm.newClass = newClass;
            }

        }

        init();


        function newClass(schoolID) {
            $location.url("/newClass");
        }
    }
})();