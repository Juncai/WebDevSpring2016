/**
 * Created by jonca on 3/10/2016.
 */
(function () {
    angular
        .module("QuizZ")
        .controller("DetailsController", detailsController);

    function detailsController($scope,
                               $routeParams,
                               $location,
                               SchoolService,
                               ClassService) {
        var schoolID = $routeParams.schoolID;

        function init() {
            $scope.data = SchoolService.findSchoolByID(schoolID);
            $scope.classes = ClassService.findClassBySchoolID(schoolID);
            $scope.newClass = newClass;
        }

        init();


        function newClass(schoolID) {
            $location.url("/newClass");
        }
    }
})();