/**
 *
 * Created by jonca on 3/10/2016.
 */
(function(){
    angular
        .module("QuizZ")
        .controller("SearchController", searchController);

    function searchController($scope, SearchService) {
        $scope.search = search;

        function init() {

        }
        init();

        function search(school) {
            SearchService
                .searchSchoolsByName(school.name)
                .success(function(response){
                    $scope.data = response.result;
                });
        }
    }
})();
