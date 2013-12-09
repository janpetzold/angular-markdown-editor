var app = angular.module("editor", ['ngSanitize']);

app.controller('EditorCtrl', function($scope, $http) {
    $scope.editor = {};

    $scope.tutorialContent = '';

    // Set default variables
    $scope.editor.textInput = '';
    $scope.editor.textOutput = '';
    $scope.editor.outputType = "live";

    // Fetch tutorial text
    $http.get('partials/tutorial.html').success(function(data) {
        $scope.tutorialContent = data;
    });

    $scope.editor.changeType = function(type) {
        $scope.editor.outputType = type;
    };

    $scope.editor.change = function(value) {
        var html = app.convertTextToHtml(value);
        $scope.editor.textOutput = html;
    };
});

app.controller.$inject = ['$scope', '$http'];