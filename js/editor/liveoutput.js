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