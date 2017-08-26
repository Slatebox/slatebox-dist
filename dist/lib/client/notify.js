'use strict';

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $e) {
    var n = function n() {
        var _self = this;

        if (!(_self instanceof Notify)) return new Notify();

        var uid = $s.guid();
        var options = {
            msg: '',
            hgt: 50,
            duration: 300,
            className: 'warningBar',
            delayClose: 0,
            hideClose: false,
            onOpen: null,
            msgBar: "messageBar" + uid,
            popFromBottom: false
        };

        _self.message = function (_options) {
            _underscore2.default.extend(options, _options);

            //hide other bars if visible
            _underscore2.default.each($s.select("div.notify"), function (elem) {
                elem.style.visibility = 'hidden';
            });

            if ($s.el(options.msgBar) && $s.el(options.msgBar).style.visibility === "visible") {
                var _height = $s.getDimensions($s.el(options.msgBar)).height;
                $e($s.el(options.msgBar), "top:" + _height * -1 + "px", {
                    duration: options.duration,
                    after: function after() {
                        if ($s.el(options.msgBar) !== null) {
                            document.body.removeChild($s.el(options.msgBar));
                        }
                        buildBar();
                    }
                });
            } else {
                buildBar();
            }

            function buildBar() {
                var _inside = "<div style='text-align:left;padding:10px;float:left;width:96%;' id='notifyBarMessage_" + uid + "'>" + options.msg + "</div><div style='float:right;margin-top:6px;padding-right:2px;width:4%;'><a href='javascript:' class='lnkCloseMessage' id='lnkCloseMessage_" + uid + "'>X</a></div>";
                var _notify = document.createElement("div");
                _notify.setAttribute("class", options.className + " notify");
                _notify.setAttribute("rel", options.popFromBottom); //for resizing window
                _notify.style.height = options.hgt + "px";

                var _cssToAnimate = "top:0px";
                if (options.popFromBottom) {
                    var ws = $s.windowSize();
                    _notify.style.top = ws.height + options.hgt + "px";
                    _cssToAnimate = "top:" + (ws.height - options.hgt) + "px";
                } else {
                    _notify.style.top = options.hgt * -1 + "px";
                }

                //_notify.style.display = "none";
                _notify.setAttribute("id", options.msgBar);
                _notify.innerHTML = _inside;
                document.body.appendChild(_notify);

                $e($s.el(options.msgBar), _cssToAnimate, {
                    duration: options.duration,
                    after: function after() {
                        if (!options.hideClose) {
                            $s.el('lnkCloseMessage_' + uid).onclick = function (e) {
                                e.preventDefault();
                                _self.closeMessage();
                            };
                        } else {
                            $s.el("lnkCloseMessage_" + uid).style.display = "none";
                        }

                        if (options.delayClose && options.delayClose > 0) {
                            setTimeout(function () {
                                _self.closeMessage();
                            }, options.delayClose);
                        }

                        if (_underscore2.default.isFunction(options.onOpen)) {
                            options.onOpen.apply(this, [$s.el("notifyBarMessage_" + uid), _self]);
                        }
                    }
                });
            };
            return _self;
        };

        _self.changeMessage = function (msg) {
            $s.el("notifyBarMessage_" + uid).innerHTML = msg;
            return _self;
        };

        _self.visible = function () {
            return $s.el(options.msgBar) !== null;
        };

        _self.resize = function (h, d, cb) {
            if ($s.el(options.msgBar) !== null) {

                var _cssToAnimate = "top:" + h * -1 + "px";
                if (options.popFromBottom) _cssToAnimate = "top:" + ($s.windowSize().height - h) + "px";

                $e($s.el(options.msgBar), _cssToAnimate, {
                    duration: d,
                    after: function after() {
                        if (_underscore2.default.isFunction(cb)) {
                            cb.apply(this);
                        }
                    }
                });
            } else {
                if (_underscore2.default.isFunction(cb)) {
                    cb.apply(this);
                }
            }
        };

        _self.closeMessage = function (cb) {
            if ($s.el(options.msgBar) !== null) {

                var _cssToAnimate = "top:" + options.hgt * -1 + "px";
                if (options.popFromBottom) _cssToAnimate = "top:" + ($s.windowSize().height + options.hgt) + "px";

                $e($s.el(options.msgBar), _cssToAnimate, {
                    duration: options.duration,
                    after: function after() {
                        document.body.removeChild($s.el(options.msgBar));

                        //show other bars if hidden
                        _underscore2.default.each($s.select("div.notify"), function (elem) {
                            elem.style.visibility = 'visible';
                        });

                        if (_underscore2.default.isFunction(options.onClose)) {
                            options.onClose.apply(this);
                        }
                        if (_underscore2.default.isFunction(cb)) {
                            cb.apply(this);
                        }
                    }
                });
            } else {
                if (_underscore2.default.isFunction(cb)) {
                    cb.apply(this);
                }
            }
        };
    };
    $s.addEvent(window, "resize", function () {
        _underscore2.default.each($s.select("div.notify"), function (elem) {
            if (elem.getAttribute("rel") === "true") {
                var ws = $s.windowSize();
                var d = $s.getDimensions(elem);
                elem.style.top = ws.height - d.height + "px";
            }
        });
    });
    window.Notify = n;
})(Slatebox, emile); // Notify.js 0.5.0
// (c) 2012 Tim Heckel
// Notify.js may be freely distributed under the MIT license.
