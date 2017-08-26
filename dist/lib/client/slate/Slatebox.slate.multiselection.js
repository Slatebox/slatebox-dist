"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._multiselection = function () {
        var _self = this,
            selRect = null,
            ox,
            oy,
            _init,
            marker = null,
            selectedNodes = [],
            origPos = null,
            resizer = null,
            minSize = 100;

        _self.init = function () {
            var c = _self._.options.container;
            if (c) {

                _init = document.createElement("div");
                _init.setAttribute("class", "slateMultiSelect");
                _init.style.position = "absolute";
                _init.style.height = "30px";
                _init.style.left = '10px';
                _init.style.color = "#081272";
                _init.style.fontSize = "11pt";
                _init.style.fontFamily = "trebuchet ms";
                _init.style.top = "5px";
                _init.style.display = "block";
                _init.style.padding = "5px";
                _init.style.margin = "5px;";
                _init.style.backgroundColor = "#fff";
                _init.style.cursor = "pointer";
                _init.innerHTML = "[multi-select]";
                _init.style.zIndex = "0";
                c.appendChild(_init);

                $s.addEvent(_init, "click", function (e) {
                    switch (_init.innerHTML) {
                        case "[multi-select]":
                            _self.start();
                            break;
                        case "selecting [click to stop]...":
                            _self.end();
                            break;
                    }
                });
            }
        };

        _self.hide = function () {
            if (_init) _init.style.display = "none";
        };

        _self.show = function () {
            if (_init) _init.style.display = "block";
        };

        _self.start = function () {
            _self._.disable(); // options.viewPort.allowDrag = false;
            _init.innerHTML = "selecting [click to stop]...";
            _self._.onSelectionStart = function (e) {
                var p = xy(e);
                selRect = _self._.paper.rect(p.x, p.y, 10, 10).attr({ "stroke-dasharray": "-" });
                $s.addEvent(_self._.canvas.get(), "mousemove", _move);
                $s.addEvent(_self._.canvas.get(), "mouseup", _select);
                ox = p.x;
                oy = p.y;
            };
        };

        _self.isSelecting = function () {
            return marker !== null;
        };

        _self.del = function () {
            if (confirm('Are you sure you want to remove the selected nodes?')) {
                _underscore2.default.each(selectedNodes, function (node) {
                    node.toolbar.del();
                });
                _self.end();
            }
        };

        _self.end = function () {
            if (marker !== null) {
                resizer.unmouseover(_resizeHover);
                //marker.undrag(markerEvents.move, markerEvents.init, markerEvents.up);
                //resizer.undrag(resizeEvents.move, resizeEvents.init, resizeEvents.up);
                marker.remove();
                resizer.remove();
                marker = null;
                _self._.keyboard && _self._.keyboard.end();
            }
            if (_init) _init.innerHTML = "[multi-select]";
        };

        _self.endSelection = function () {
            selRect && selRect.remove();
            _self._.enable();
            _self._.onSelectionStart = null;
            $s.removeEvent(_self._.canvas.get(), "mousemove", _move);
            $s.removeEvent(_self._.canvas.get(), "mouseup", _select);
        };

        var xy = function xy(e) {
            var mp = $s.mousePos(e);
            var off = $s.positionedOffset(_self._.options.container);
            var _x = mp.x + _self._.options.viewPort.left - off.left;
            var _y = mp.y + _self._.options.viewPort.top - off.top;
            var z = _self._.options.viewPort.zoom.r;
            return { x: _x / z, y: _y / z };
        };

        var _move = function _move(e) {
            p = xy(e);
            var height = p.y - oy;
            var width = p.x - ox;

            if (height > 0) {
                selRect.attr({ height: height });
            } else {
                selRect.attr({ y: p.y, height: oy - p.y });
            }
            if (width > 0) {
                selRect.attr({ width: width });
            } else {
                selRect.attr({ x: p.x, width: ox - p.x });
            }
        };

        var _select = function _select(e) {
            var sr = selRect.getBBox();
            var l = _self._.options.viewPort.left;
            var t = _self._.options.viewPort.top;
            var z = _self._.options.viewPort.zoom.r;
            selectedNodes = _underscore2.default.filter(_self._.nodes.allNodes, function (n) {
                return n.options.xPos + n.options.width > sr.x && n.options.xPos < sr.x + sr.width && n.options.yPos + n.options.height > sr.y && n.options.yPos < sr.y + sr.height;
            });

            if (selectedNodes.length > 1) {
                var orient = _self._.getOrientation(selectedNodes);
                var w = orient.width / z;
                var h = orient.height / z;
                if (w < minSize) w = minSize;
                if (h < minSize) h = minSize;

                marker = _self._.paper.rect(orient.left / z, orient.top / z, w, h).attr({ "stroke-dasharray": "-", "fill": "#f8f8f8" });
                marker.toBack();
                origPos = marker.getBBox();

                _self.endSelection();

                //resizer
                var _nx = origPos.x + origPos.width;
                var _ny = origPos.y + origPos.height;

                resizer = _self._.paper.resize(_self._.options.imageFolder + "2_lines.png").transform(["t", _nx - 5, ",", _ny - 5].join()).attr({ fill: "#fff", "stroke": "#000" });
                resizer.mouseover(_resizeHover);
                marker.drag(markerEvents.move, markerEvents.init, markerEvents.up);
                resizer.drag(resizeEvents.move, resizeEvents.init, resizeEvents.up);

                //hiding resizer for now
                //resizer.hide();

                //unmark all and remove connectors
                _self._.unMarkAll();

                _underscore2.default.each(selectedNodes, function (node) {
                    node.connectors.remove();
                    node.resize.hide();
                });

                //activate keyboard shortcuts for this group...
                _self._.keyboard && _self._.keyboard.start();
            } else if (selectedNodes.length === 1) {
                selectedNodes[0].menu.show();
                selectedNodes[0].mark();
                _self.endSelection();
                _self.end();
            } else {
                _self.endSelection();
                _self.end();
            }
        };

        var _resizeHover = function _resizeHover(e) {
            resizer.attr({ cursor: 'nw-resize' });
        };

        var markerEvents = {
            init: function init(x, y) {
                _self._.options.viewPort.allowDrag = false;
                marker.ox = marker.attr("x");
                marker.oy = marker.attr("y");
                _underscore2.default.each(selectedNodes, function (node) {
                    node.vect.ox = node.vect.type == "rect" ? node.vect.attr("x") : node.vect.attr("cx");
                    node.vect.oy = node.vect.type == "rect" ? node.vect.attr("y") : node.vect.attr("cy");
                });
            },
            move: function move(dx, dy) {
                var _zr = _self._.options.viewPort.zoom.r;
                dx = dx + (dx / _zr - dx);
                dy = dy + (dy / _zr - dy);

                var att = { x: marker.ox + dx, y: marker.oy + dy };
                marker.attr(att);

                _underscore2.default.each(selectedNodes, function (node) {
                    node.setPosition({ x: node.vect.ox + dx, y: node.vect.oy + dy });
                    node.relationships.refresh();
                    /*
                    node.relationships.syncAssociations(node, function(c, a) {
                        //c.setPosition({ x: c.vect.ox + dx, y: c.vect.oy + dy });
                        c.relationships.refresh();
                    });
                    */
                });

                var _nx = origPos.x + origPos.width + dx - 5,
                    _ny = origPos.y + origPos.height + dy - 5;
                resizer.transform(["t", _nx, ",", _ny].join(""));
            },
            up: function up(e) {
                _self._.options.viewPort.allowDrag = true;
                _self._.birdseye && _self._.birdseye.refresh(true);

                var _sids = (0, _underscore2.default)(selectedNodes).chain().pluck('options').pluck('id').value();

                _underscore2.default.each(selectedNodes, function (node) {
                    broadcastMove(node);
                });

                origPos = marker.getBBox();
            }
        };

        function _resize() {
            var mbb = marker.getBBox();

            var xStatic = mbb.x + mbb.width / 2;
            var yStatic = mbb.y + mbb.height / 2;
            var yScale = mbb.height / origPos.height;
            var xScale = mbb.width / origPos.width;

            _underscore2.default.each(selectedNodes, function (node) {
                var nx = xStatic + xScale * (node.options.xPos - xStatic);
                var ny = yStatic + yScale * (node.options.yPos - yStatic);

                node.setPosition({ x: nx, y: ny });

                var nw = xScale * node.options.width; // ((mbb.width * node.options.width) / origPos.width);
                var nh = yScale * node.options.height; // ((mbb.height * node.options.height) / origPos.height);
                node.resize.set(nw, nh, 0);
            });
        };

        function broadcastMove(node) {
            _self._.collab && _self._.collab.send({
                type: "onNodeMove",
                data: {
                    id: node.options.id,
                    x: node.options.xPos,
                    y: node.options.yPos
                }
            });
        };

        var resizeEvents = {
            init: function init() {
                _self._.disable();
                _underscore2.default.each(selectedNodes, function (node) {
                    node.vect.ox = node.vect.type == "rect" ? node.vect.attr("x") : node.vect.attr("cx");
                    node.vect.oy = node.vect.type == "rect" ? node.vect.attr("y") : node.vect.attr("cy");
                });
            },
            move: function move(dx, dy) {

                var _zr = _self._.options.viewPort.zoom.r;
                dx = dx + (dx / _zr - dx);
                dy = dy + (dy / _zr - dy);

                var _width = origPos.width + dx * 2;
                var _height = origPos.height + dy * 2;

                var _nx = origPos.x + origPos.width + dx - 5;
                var _ny = origPos.y + origPos.height + dy - 5;
                var rw = true,
                    rh = true;
                if (_width < minSize) {
                    _width = minSize;rw = false;
                }
                if (_height < minSize) {
                    _height = minSize;rh = false;
                }

                resizer.transform(["t", _nx, ",", _ny].join(""));

                var att = { width: _width, height: _height };
                rw && _underscore2.default.extend(att, { x: origPos.x - dx });
                rh && _underscore2.default.extend(att, { y: origPos.y - dy });

                marker.attr(att);
            },
            up: function up() {
                _self._.enable();
                _resize();

                _underscore2.default.each(selectedNodes, function (node) {
                    node.resize.send();
                    broadcastMove(node);
                });

                _self._.birdseye && _self._.birdseye.refresh(true);

                origPos = marker.getBBox();
                var _nx = origPos.x + origPos.width;
                var _ny = origPos.y + origPos.height;
                resizer.transform(["t", _nx - 5, ",", _ny - 5].join(""));
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);
