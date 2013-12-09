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