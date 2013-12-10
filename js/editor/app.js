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
app.converter = new Showdown.converter();

/**
 * Convert the text, benchmark the time it took to do so
 * @param text
 * @returns {*}
 */
app.convertTextToHtml = function(text) {
    var start = new Date().getTime();

    var result = app.converter.makeHtml(text);

    console.log("Conversion took " + (new Date().getTime() - start) + "ms");
    return result;
};
app.directive("dragger", function($document) {
    // global padding
    var padding = 4;

    function resetDragger(btn, padding) {
        var perfectOffset = ($("body").width() / 2) - (btn.width() / 2) - padding;
        btn.css("left", perfectOffset);
        btn.css("visibility", "visible");

        // Reset px width from mousemove event handler
        $("#editor-input-container").attr('width', '');
        $("#editor-output-container").attr('width', '');

        // Revert to original 50/50 setting
        $("#editor-input-container").css("width", "49%");
        $("#editor-output-container").css("width", "49%");
    }

    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            console.log("dragger directive loaded");

            var btn = $("#editor-btn-resize");
            var inputArea = $("#editor-input-container");
            var outputArea = $("#editor-output-container");

            var bodyWidth = $("body").width();
            var buttonWidth = btn.width();

            // Center the button and show it
            resetDragger(btn, padding);

            var draggerDown = false;

            btn.on("mousedown", function() {
                draggerDown = true;
                bodyWidth = $("body").width();
                return false;
            });

            $(document).on("mousemove", function(e) {
                if (draggerDown) {
                    btn.css("left", e.clientX);
                    inputArea.width(e.clientX - padding);
                    outputArea.width(bodyWidth - e.clientX - buttonWidth - (padding * 3));
                    return false;
                }
            });
            $(document).on("mouseup", function() {
                if (draggerDown){
                    draggerDown = false;
                    return false;
                }
            });

            $(window).on("resize", function() {
                resetDragger(btn, padding);
            });
        }
    };
});
app.directive("liveoutput", function($compile) {
    var liveTemplate = '<div ng-bind-html="editor.textOutput"></div>';
    var sourceTemplate = '<pre ng-bind="editor.textOutput"></pre>';

    function getTemplate(type) {
        if(type === "live") {
            return liveTemplate;
        } else if(type === "source") {
            return sourceTemplate;
        }
    }

    return {
        restrict: "E",
        link: function(scope, element, attrs) {
            console.log("liveoutput directive loaded");
            /*
             Watch for changes in the editor.outputType. This is ALSO triggered when the
             directive is loaded initially, so no need to call that twice.
              */
            scope.$watch('editor.outputType', function(value) {
                console.log("OutputType changed to " + value);
                if(value === "live" || value === "source") {
                    element.html(getTemplate(value));
                    $compile(element.contents())(scope);
                } else if(value === "syntax") {
                    element.html(scope.tutorialContent);
                }
            });
        }
    };
});
