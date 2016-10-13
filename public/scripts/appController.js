var app = angular.module("tvshows", ["ngRoute"]);

app.controller('getListTvShowsController', getListTvShowsController);
app.controller('saveTvShowsController', saveTvShowsController);

var configFunction = function ($routeProvider) {
    $routeProvider
        .when("/listTvShows", {
        templateUrl : "views/listTvShows.html",
        controller : "getListTvShowsController"
    })
        .when("/saveTvShows/:id", {
        templateUrl : "views/saveTvShows.html",
        controller : "saveTvShowsController"
    });
};

configFunction.$inject = ['$routeProvider'];
app.config(configFunction);
