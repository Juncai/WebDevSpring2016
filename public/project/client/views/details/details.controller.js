/**
 * Created by jonca on 3/10/2016.
 */
(function(){
    angular
        .module("QuizZ")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams,
                               SearchService,
                               $rootScope,
                               $location,
                               ClassService
    ) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        var currentUser = $rootScope.currentUser;
        vm.favorite = favorite;

        function init() {
            SearchService
                .findSchoolByID(imdbID)
                .then(function(response){
                    vm.data = response.data;
                });

            ClassService
                .findUserLikes (imdbID)
                .then(function(response){
                    vm.movie = response.data;
                });
        }
        init();

        function favorite(movie) {
            if(currentUser) {
                ClassService
                    .userLikesMovie(currentUser._id, movie);
            } else {
                $location.url("/login");
            }
        }
    }
})();