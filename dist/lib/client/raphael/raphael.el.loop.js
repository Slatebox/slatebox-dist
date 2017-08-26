"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s) {
    Raphael.el.loop = function (_options) {
        var options = {
            pkg: [{ "stroke-width": 3 }, { "stroke-width": 1 }],
            duration: 200,
            repeat: false
        };
        _underscore2.default.extend(options, _options);

        var _self = this;
        function loop() {
            _self.animate(options.pkg[0], options.duration, function () {
                _self.animate(options.pkg[1], options.duration, function () {
                    if (options.repeat) {
                        loop();
                    }
                });
            });
        };

        loop();

        return this;
    };
})(Slatebox);
