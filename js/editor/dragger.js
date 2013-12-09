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