"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._toolbar = function () {
        var _self = this;
        _self.show = function (x, y, _m) {
            var y = y + 1;
            var _r = _self._.slate.paper;

            //build toolbar
            var cOptions = { fill: "#eee", stroke: "#333" };
            var cs = 14,
                cm = 16;

            toolbar = [_r.handle().data({ msg: 'Connect To Node', width: 110 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x, ",", y, "s", ".85", ".85"].join()), _r.deleter().data({ msg: 'Delete', width: 54 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 30, ",", y, "s", ".85", ".85"].join()), _r.editor().data({ msg: 'Edit Text', width: 65 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 60, ",", y, "s", ".85", ".85"].join()), _r.searcher().data({ msg: 'Embed Image', width: 90 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 90, ",", y, "s", ".85", ".85"].join()), _r.link().data({ msg: 'Add Link', width: 62 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 120, ",", y, "s", ".85", ".85"].join())];

            _underscore2.default.each(toolbar, function (toolbarElem) {
                toolbarElem.mouseover(function (e) {
                    _self._.slate.glow(this);
                    var _text = this.data("msg");
                    _self._.slate.addtip(this.tooltip({ type: 'text', msg: _text }, this.data("width"), this.data("height")));
                    $s.stopEvent(e);
                });
                toolbarElem.mouseout(function (e) {
                    if (_self._ && _self._.slate) {
                        _self._.slate.unglow();
                        this.untooltip();
                    }
                    $s.stopEvent(e);
                });
            });

            for (t = 0; t < 5; t++) {
                (function (t) {
                    _underscore2.default.each(['mousedown'], function (eventType) {
                        toolbar[t][eventType](function (e) {
                            e.stopPropagation();
                            _self._.slate.unglow();
                            _self._.slate.untooltip();
                            if (_self._.events && _underscore2.default.isFunction(_self._.events.onToolbarClick)) {
                                _self._.events.onToolbarClick.apply(this, [t]);
                            } else {
                                if (t === 0) {
                                    //connector
                                    _self._.relationships.initiateTempNode(e, _self._, true);
                                    _self._.menu.hide();
                                } else if (t === 1) {
                                    _self.del();
                                } else if (t === 2) {
                                    _self._.slate.stopEditing();
                                    //fire the editor
                                    _self._.position('center', function () {
                                        _self._.editor.start();
                                    });
                                } else if (t === 3) {
                                    //searcher
                                    //var mp = $s.mousePos(e);
                                    //mp.y = mp.y + 130; //adjust up
                                    _self._.slate.unMarkAll();
                                    _self._.slate.stopEditing();
                                    _self._.position('center', function () {
                                        _self._.images.start();
                                    });
                                } else if (t === 4) {
                                    //var mp = $s.mousePos(e);
                                    //mp.y = mp.y + 130; //adjust up

                                    _self._.slate.unMarkAll();
                                    _self._.slate.stopEditing();

                                    _self._.position('center', function () {
                                        _self._.links.start();
                                    });
                                }
                            }
                        });
                    });
                })(t);
            }_underscore2.default.each(toolbar, function (toolbarElem) {
                _m.push(toolbarElem);
            });
            return _self;
        };

        _self.del = function () {

            var nn = _self._.slate.nodes.allNodes;
            var _valid = _underscore2.default.filter(nn, function (n) {
                return n.options.allowDrag && n.options.allowContext && n.options.allowResize && n.options.allowMenu;
            });

            if (_valid.length <= 1) {
                alert("Sorry, this is the last editable node on the slate, you cannot delete this one!");
            } else {
                var s = _self._.slate;
                _self._.del();
                var delPkg = { type: 'onNodeDeleted', data: { id: _self._.options.id } };
                s.collab && s.collab.send(delPkg);
                s.birdseye && s.birdseye.nodeDeleted(delPkg);
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);