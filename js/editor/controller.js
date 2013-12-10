var app = angular.module("editor", ['ngSanitize']);

app.controller('EditorCtrl', function($scope, $http) {
    $scope.editor = {};

    $scope.tutorialContent = '';

    $scope.editor.outputType = "live";

    // Set initial values after page load
    $scope.editor.textInput = 'Welcome!\n=======\n\nJust enter your text in the **left** input field and see the instant output on the right.';
    $scope.editor.textOutput = app.convertTextToHtml($scope.editor.textInput);

    // Fetch tutorial text
    $http.get('partials/tutorial.html').success(function(data) {
        $scope.tutorialContent = data;
    });

    $scope.editor.changeType = function(type) {
        $scope.editor.outputType = type;
    };

    $scope.editor.change = function(value) {
        // Conversion is triggered on every change in input
        $scope.editor.textOutput = app.convertTextToHtml(value);
    };
});

app.controller.$inject = ['$scope', '$http'];