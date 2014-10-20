/* globals __coverage__ */
/* jshint camelcase: false */

var fs = require('fs');

exports.afterEnd = function (phantom) {
    fs.write(
        './dist/coverage/coverage.json',
        phantom.page.evaluate(function () {
            return JSON.stringify(__coverage__);
        })
    );
};
