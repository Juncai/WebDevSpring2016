/**
 *
 * Created by jonca on 3/10/2016.
 */
(function(){
    angular
        .module("QuizZ")
        .controller("SearchController", searchController);

    function searchController($scope, $location, SchoolService) {
        $scope.search = search;
        $scope.details = details;

        function init() {

        }
        init();

        function search(school) {
            SchoolService
                .searchSchoolsByName(school.name)
                .success(function(response){
                    $scope.data = response.result;
                });
        }

        function details(index) {
            var cSchool = $scope.data.records[index];
            SchoolService.cacheSchool(cSchool);
            $location.url("/details/" + cSchool.UNITID);
        }
    }
})();
