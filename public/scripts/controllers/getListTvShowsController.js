var getListTvShowsController = function ($scope, $http,$location) { 
    $scope.listTvsShows =[];
    $scope.deleteTvShow = deleteTvShow;
    $scope.editTvShow = editTvShow;
    $scope.TypeMessage ="";
    $scope.showMessage="";
    $scope.message="";

    getListTvShows();
    function getListTvShows() {
        $http.get('/api/getListTvShows').success(function (resp) {
            $scope.listTvsShows= resp;
        }).error(function (resp) {
            console.log("Error " + resp);
        });
    }

    function deleteTvShow(TvShowId) {
        $http.delete('/api/deleteListTvShows/'+ TvShowId).success(function (resp) {
            $scope.TypeMessage ="alert alert-success";
            $scope.showMessage ="show";
            $scope.message="Success! Tv Show removed from the system";
            getListTvShows();

        }).error(function (resp) {
            console.log("Error");
            $scope.showMessage= "show";
            $scope.TypeMessage ="alert alert-warning";
            $scope.message="Error! Could not delete the TV Show";
        });
    }

    function editTvShow(TvShowId) {
        $location.url('saveTvShows/' + TvShowId);
    }
}

getListTvShowsController.$inject = ['$scope', '$http','$location'];