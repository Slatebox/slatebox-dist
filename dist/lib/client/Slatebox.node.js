"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _getTransformedPath = require("./helpers/getTransformedPath");

var _getTransformedPath2 = _interopRequireDefault(_getTransformedPath);

var _getDepCoords = require("./helpers/getDepCoords");

var _getDepCoords2 = _interopRequireDefault(_getDepCoords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s) {
    $s.fn.node = function (_options) {
        if (!(this instanceof $s.fn.node)) return new $s.fn.node(_options);

        var _node = this,
            _marker,
            _lock,
            _openLock;
        _node.options = {
            id: $s.guid(),
            name: '',
            text: '' //text in the node
            , image: '' //the image to show with the node
            , imageTiled: false,
            xPos: 0 //the initial x position relative to the node container
            , yPos: 0 //the initial y position relative to the node container
            , height: 10 //the height of the node
            , width: 10 //the width of the node
            , borderWidth: 2 //border width of the node
            , borderStyle: "",
            lineColor: '#000000' //line color
            , lineWidth: 10 //line width
            , lineOpacity: 1,
            allowDrag: true,
            allowMenu: true,
            allowContext: true,
            allowResize: true,
            backgroundColor: '#f8f8f8',
            foregroundColor: '#000',
            fontSize: 12,
            fontFamily: 'Trebuchet MS',
            fontStyle: 'normal',
            vectorPath: '',
            rotate: {
                rotationAngle: 0
            },
            link: { show: false, type: '', data: '', thumbnail: { width: 175, height: 175 } }
        };

        _underscore2.default.extend(_node.options, _options);
        if (_node.options.name === "") _node.options.name = _node.options.id;

        _node.constants = {
            statusPanelAtRest: 33,
            statusPanelExpanded: 200
        };

        _node.del = function () {
            var _unlinkId = _node.options.id;

            _node.slate.nodes.closeAllMenus();
            _node.slate.nodes.closeAllLineOptions();
            _node.relationships.removeAll();

            _node.slate.options.viewPort.allowDrag = true;

            //unlink any links
            _underscore2.default.each(_node.slate.nodes.allNodes, function (node) {
                if (node.options.link && node.options.link.show && node.options.link.data === _unlinkId) {
                    _underscore2.default.extend(node.options.link, { show: false, type: '', data: '' });
                    node.link.hide();
                }
            });

            _node.slate.unMarkAll();
            _node.slate.nodes.remove(_node);
        };

        function url(opt) {
            return _node.options.ajax.rootUrl + _node.options.ajax.urlFlavor + opt;
        };

        _node.getTransformString = function () {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var _transforms = [];
            var rotationTransform = void 0;
            if (opts.rotate) {
                rotationTransform = "R" + opts.rotate.rotationAngle + ", " + opts.rotate.point.x + ", " + opts.rotate.point.y;
            } else if (_node.options.rotate.rotationAngle) {
                rotationTransform = "R" + _node.options.rotate.rotationAngle + ", " + (_node.options.rotate.point.x - (opts.dx || 0)) + ", " + (_node.options.rotate.point.y - (opts.dy || 0));
            }
            _transforms.push(rotationTransform);

            if (opts.action === "translate") {
                var translationTransform = "T" + opts.dx + ", " + opts.dy;
                _transforms.push(translationTransform);
            }

            return _transforms.join(" ");
        };

        _node.setStartDrag = function () {
            _node.slate.options.viewPort.allowDrag = false;
            _node.slate.stopEditing();
            _node.connectors && _node.connectors.reset();
            _node.context && _node.context.remove();
            if (_node.menu && _node.menu.isOpen()) {
                _node.menu.wasOpen = true;
            }
            _node.slate.hideLocks();
        };

        _node.setEndDrag = function () {
            if (_node.slate && _node.slate.options.enabled) //could be null in case of the tempNode
                _node.slate.options.viewPort.allowDrag = true;

            if (_node.menu && _underscore2.default.isFunction(_node.menu.show) && _node.options.allowMenu) _node.menu.show();

            _node.slate.displayLocks();
        };

        _node.serialize = function (lineWidthOverride) {
            var jsonNode = {};
            _underscore2.default.extend(jsonNode, {
                options: _node.options
            });
            jsonNode.relationships = { associations: [] }; //, children: []
            _underscore2.default.each(_node.relationships.associations, function (association) {
                jsonNode.relationships.associations.push(bindRel(association, lineWidthOverride));
            });
            return jsonNode;
        };

        function bindRel(obj, lineWidthOverride) {
            return {
                childId: obj.child.options.id,
                parentId: obj.parent.options.id,
                isStraightLine: obj.blnStraight,
                lineColor: obj.lineColor,
                lineOpacity: obj.lineOpacity,
                lineWidth: lineWidthOverride || obj.lineWidth,
                showParentArrow: obj.showParentArrow || false,
                showChildArrow: obj.showChildArrow || false
            };
        };

        _node.addRelationships = function (json, cb) {
            //add parents
            var _lines = [];
            if (json.relationships) {

                //add associations
                if (_underscore2.default.isArray(json.relationships.associations)) {
                    _underscore2.default.each(json.relationships.associations, function (association) {
                        var _pr = association,
                            _pn = null;
                        _underscore2.default.each(_node.slate.nodes.allNodes, function (node) {
                            if (node.options.id === _pr.parentId && _node.options.id !== node.options.id) {
                                _pn = node;
                                return;
                            }
                        });
                        if (_pn) {
                            var _conn = _pn.relationships.addAssociation(_node, _pr);
                            _lines.push(_conn.line);
                            return;
                        }
                    });
                }
            }
            if (_underscore2.default.isFunction(cb)) {
                cb.apply(this, [_lines]);
            }
        };

        _node.toFront = function () {
            _underscore2.default.each(_node.relationships.children, function (child) {
                child.line.toFront();
            });
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.parents, "line"), "toFront");
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.associations, "line"), "toFront");

            _node.vect.toFront();
            _node.text.toFront();
            _node.link.toFront();
        };

        _node.toBack = function () {
            _node.link.toBack();
            _node.text.toBack();
            _node.vect.toBack();
            _underscore2.default.each(_node.relationships.children, function (child) {
                child.line.toBack();
            });
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.parents, "line"), "toBack");
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.associations, "line"), "toBack");
        };

        _node.hide = function () {
            _node.vect.hide();
            _node.text.hide();
            _node.options.link.show && _node.link.hide();
        };

        _node.show = function () {
            _node.vect.show();
            _node.text.show();
            _node.options.link.show && _node.link.show();
        };
        _node.rotateMoveVector = function (_ref) {
            var dx = _ref.dx,
                dy = _ref.dy;

            var _rotationAngle = -_node.options.rotate.rotationAngle * Math.PI / 180; //conversion to radians
            return {
                dx: dx * Math.cos(_rotationAngle) - dy * Math.sin(_rotationAngle),
                dy: dx * Math.sin(_rotationAngle) + dy * Math.cos(_rotationAngle)
            };
        };
        //returns an invisible path with the correct position of a path being dragged. MAKE SURE TO REMOVE IT AFTER YOU ARE DONE WITH IT or there will be a growing number of invisible paths rendering the slate unusable
        _node.getTempPathWithCorrectPositionFor = function (_ref2) {
            var pathElement = _ref2.pathElement,
                dx = _ref2.dx,
                dy = _ref2.dy,
                rotationAngle = _ref2.rotationAngle;

            var tempPath = _node.slate.paper.path(pathElement.attr("path").toString()).attr({ opacity: 0 });
            var _transforms = [];
            var bb = tempPath.getBBox();
            if (!_underscore2.default.isUndefined(dx) && !_underscore2.default.isUndefined(dy)) {
                if (_node.options.rotate.rotationAngle) {
                    var newMoveVector = _node.rotateMoveVector({ dx: dx, dy: dy });
                    _transforms.push("T" + newMoveVector.dx + "," + newMoveVector.dy);
                } else {
                    _transforms.push("T" + dx + "," + dy);
                }
            }

            if (!_underscore2.default.isUndefined(rotationAngle)) {
                _transforms.push("r" + rotationAngle + ", " + bb.cx + ", " + bb.cy);
            } else if (_node.options.rotate.rotationAngle) {
                _transforms.push("r" + _node.options.rotate.rotationAngle + ", " + _node.options.rotate.point.x + ", " + _node.options.rotate.point.y);
            }

            tempPath.transform("");
            var transformPath = (0, _getTransformedPath2.default)(tempPath.attr("path").toString(), _transforms);
            tempPath.attr({ path: transformPath });
            return tempPath;
        };

        _node.setPosition = function (p, blnKeepMenusOpen, activeNode) {
            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


            _node.options.xPos = p.x;
            _node.options.yPos = p.y;

            var lc = _node.linkCoords();
            _node.text.attr(_node.textCoords(opts));
            _node.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());

            //close all open menus
            if (blnKeepMenusOpen !== true) {
                _node.slate.nodes.closeAllMenus(activeNode);
                _node.slate.nodes.closeAllLineOptions();
            }
        };

        _node.hideOwnMenus = function () {
            _node.link.hide();
            _node.menu.hide();
            // _lock && _lock.hide();
            // _openLock && _openLock.hide();
        };

        // _node.moveNodes = function(pkg) {
        //   _node.slate.nodes.closeAllLineOptions();
        //   _node.hideOwnMenus();
        //
        //   const allAssoc = [];
        //   _.each(_node.slate.nodes.allNodes, (node) => {
        //     _.each(node.relationships.associations, (a) => {
        //       allAssoc.push(a);
        //     });
        //   });
        //   const uniqAssoc = _.uniq(allAssoc, (a) => {
        //     return a.id;
        //   });
        //
        //   var p = pkg.data || pkg
        //     , d = p.dur || Meteor.collabAnimationDuration || 300
        //     , e = p.easing || ">";
        //   const {associations, nodeOptions} = p;
        //
        //   _.each(nodeOptions, (opts) => {
        //     const _nodeObject = _.find(_node.slate.nodes.allNodes, function (node) {
        //       return node.options.id === opts.id;
        //     });
        //
        //     _.extend(_nodeObject.options, opts);
        //
        //     const dps = _getDepCoords({x: opts.xPos, y: opts.yPos}, _nodeObject.options)
        //       , lx = dps.lx
        //       , tx = dps.tx
        //       , ty = dps.ty;
        //
        //     _nodeObject.text.animate({ x: tx, y: ty }, d, e);
        //     _nodeObject.link.animate({ x: lx, y: ty }, d, e);
        //
        //     _nodeObject && _nodeObject.vect.animate({path: opts.vectorPath}, d, e, function() {
        //       _nodeObject.vect.transform("");
        //       _nodeObject.vect.attr({path: opts.vectorPath});
        //     });
        //   });
        //
        //   _.each(associations, (assoc) => {
        //     const a = _.find(uniqAssoc, function(a) {
        //       return a.parent.options.id === assoc.parentId;
        //     });
        //
        //     a && a.line.animate({path: assoc.linePath}, d, e, function() {
        //       a.line.transform("");
        //       a.line.attr({path: assoc.linePath});
        //     });
        //   });
        // };

        _node.move = function (pkg) {
            _node.slate.nodes.closeAllLineOptions();

            //for text animation
            var p = pkg.data || pkg,
                d = p.dur || Meteor.collabAnimationDuration || 300,
                e = p.easing || ">",
                dps = (0, _getDepCoords2.default)(p, _node.options),
                lx = dps.lx,
                tx = dps.tx,
                ty = dps.ty;

            //simulate ctrl and shift keys
            _node.slate.isAlt = p.isAlt || false;
            _node.slate.isShift = p.isShift || false;

            //always hide by default
            _node.hideOwnMenus();

            //kick off the 'move' of all connected associations
            var _targX = p.x - _node.options.xPos,
                _targY = p.y - _node.options.yPos;

            _node.relationships.updateAssociationsWith({
                currentDx: _targX,
                currentDy: _targY,
                activeNode: _node.options.id,
                isUp: false,
                isShift: p.isShift,
                isAlt: p.isAlt
            });

            _node.relationships.syncAssociations(_node, function (c, a) {
                var pxx = { x: c.options.xPos + _targX, y: c.options.yPos + _targY };
                switch (c.options.vectorPath) {
                    case "ellipse":
                        pxx = { cx: c.options.xPos + _targX, cy: c.options.yPos + _targY };
                        break;
                }
                var dps = (0, _getDepCoords2.default)(pxx, c);

                var _refresher = window.setInterval(function () {
                    c.relationships.refresh(true);
                }, 10);

                c.vect.animate(pxx, d, e, function () {
                    window.clearInterval(_refresher);
                });
                c.text.animate({ x: dps.tx, y: dps.ty }, d, e);
                c.link.animate({ x: dps.lx, y: dps.ty }, d, e);

                var apath = Raphael.transformPath(a.line.attr("path"), "T" + _targX + "," + _targY);

                //console.log("line: ", bb.x, parseInt(bb.x + _targX), a.line.attr("path").toString(), apath.toString());

                a.line.animate({ path: apath }, d, e);
            });

            var onAnimate = function onAnimate(obj) {
                _node.relationships.refresh(true);
            };

            var att = {};
            switch (_node.options.vectorPath) {
                case "ellipse":
                    att = { cx: p.x, cy: p.y };
                    break;
                case "rectangle":
                case "roundedrectangle":
                    att = { x: p.x, y: p.y };
                    _node.vect.animate({ transform: "T" + _targX + "," + _targY }, d, e);
                    break;
                default:
                    att = { transform: "T" + _targX + "," + _targY };
                    break;
            }

            var _complete = function _complete(node) {
                var bb = node.vect.getBBox();
                var dx = node.options.vectorPath === "ellipse" ? bb.cx : bb.x,
                    dy = node.options.vectorPath === "ellipse" ? bb.cy : bb.y;

                node.options.xPos = dx;
                node.options.yPos = dy;

                var targetPath = Raphael.transformPath(node.vect.attr("path"), "T" + _targX + "," + _targY);
                node.vect.transform("");
                att = { path: targetPath };
                node.vect.attr(att);

                node.relationships.updateAssociationsWith({ currentDx: 0, currentDy: 0, isUp: true, isAnimating: false, isBeingAnimated: false, isShift: p.isShift, isAlt: p.isAlt });
                node.relationships.refresh();

                var lc = node.linkCoords();
                node.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());
                if (node.options.link && node.options.link.show) node.link.show();
                node.slate.birdseye && node.slate.birdseye.refresh(true);
            };

            _node.text.animate({ x: tx, y: ty }, d, e);
            _node.link.animate({ x: lx, y: ty }, d, e);

            eve.on("raphael.anim.frame.*", onAnimate);

            _node.vect.animate(att, d, e, function () {
                eve.unbind("raphael.anim.frame.*", onAnimate);

                _complete(_node);

                //set association coords
                _node.relationships.syncAssociations(_node, function (c, a) {
                    c.relationships.updateAssociationsWith({ activeNode: a.activeNode, currentDx: _targX, currentDy: _targY, isShift: p.isShift, isAlt: p.isAlt });
                    if (!(p.isAlt && p.isShift) && a.activeNode === a.parent.options.id && !p.isShift) {
                        _complete(c);
                    }
                });

                _node.slate.isAlt = false;
                _node.slate.isShift = false;

                //cb
                pkg.cb && pkg.cb();
            });
        };

        _node.zoom = function (zoomPercent, duration, cb) {
            /*
            var _startZoom = _node.slate.options.viewPort.zoom.w;
            var _targetZoom = _node.slate.options.viewPort.originalWidth * (100 / parseInt(zoomPercent));
            var _zoomDif = Math.abs(_targetZoom - _startZoom);
            */

            //UNTIL PAN AND ZOOM WORKS CORRECTLY, THIS WILL
            //ALWAYS BE A AIMPLE PROXY TO ZOOMING THE SLATE
            _node.slate.canvas.zoom({
                dur: duration,
                zoomPercent: zoomPercent,
                callbacks: {
                    during: function during(percentComplete, easing) {
                        //additional calcs
                    },
                    after: function after(zoomVal) {
                        cb && cb.apply(this, [{ id: _node.options.id, operation: 'zoom', zoomLevel: zoomVal }]);
                    }
                }
            });
        };

        _node.position = function (location, cb, easing, dur) {

            easing = easing || 'easeTo'; //'swingFromTo'
            dur = dur || 500;

            var _vpt = _node.vect.getBBox(),
                zr = _node.slate.options.viewPort.zoom.r,
                d = $s.getDimensions(_node.slate.options.container),
                cw = d.width,
                ch = d.height,
                nw = _node.options.width * zr,
                nh = _node.options.height * zr,
                pad = 10;

            //get upper left coords
            var _x = _vpt.x * zr,
                _y = _vpt.y * zr;

            switch (location) {
                case "lowerright":
                    _x = _x - (cw - nw) - pad;
                    _y = _y - (ch - nh) - pad;
                    break;
                case "lowerleft":
                    _x = _x - pad;
                    _y = _y - (ch - nh) - pad;
                    break;
                case "upperright":
                    _x = _x - (cw - nw) - pad;
                    _y = _y - pad;
                    break;
                case "upperleft":
                    _x = _x - pad;
                    _y = _y - pad;
                    break;
                default:
                    //center
                    _x = _x - (cw / 2 - nw / 2);
                    _y = _y - (ch / 2 - nh / 2);
                    break;
            }

            if (_x === _node.slate.options.viewPort.left && _y === _node.slate.options.viewPort.top) {
                cb.apply();
            } else {
                _node.slate.canvas.move({
                    x: _x,
                    y: _y,
                    dur: dur,
                    callbacks: {
                        after: function after() {
                            cb.apply(this, [{ id: _node.options.id, operation: 'position', location: location, easing: easing }]);
                        }
                    },
                    isAbsolute: true,
                    easing: easing
                });
            }
        };

        _node.mark = function () {

            var _vpt = _node.vect.getBBox(),
                _x = _vpt.x,
                _y = _vpt.y;

            if (!_marker) {
                //if (_node.options.vectorPath === "ellipse") {
                //    _x = _x - (_node.options.width / 2);
                //    _y = _y - (_node.options.height / 2);
                //}
                _marker = _node.slate.paper.rect(_x - 10, _y - 10, _vpt.width + 20, _vpt.height + 20, 10).attr({ "stroke-width": _node.options.borderWidth, "stroke": "red", fill: "#ccc", "fill-opacity": .8 }).toBack();
            } else _marker.attr({ x: _x - 10, y: _y - 10, width: _vpt.width + 20, height: _vpt.height + 20 });
        };

        _node.unmark = function () {
            _marker && _marker.remove();
            _marker = null;
        };

        var lm;
        _node.unbutton = function () {
            lm && lm.unbutton();
        };

        _node.button = function (options) {
            lm = _node.slate.paper.set();
            lm.push(_node.vect);
            lm.push(_node.text);
            _underscore2.default.extend(options, { node: _node });
            lm.button(options);
        };

        //var _prevAllowDrag, _prevAllowMenu;
        _node.disable = function () {
            //_prevAllowDrag = _node.options.allowDrag;
            //_prevAllowMenu = _node.options.allowMenu;
            _node.options.allowMenu = false;
            _node.options.allowDrag = false;
            _node.hideOwnMenus();
            if (_node.slate.options.showLocks) {
                _node.showLock();
            }
            _node.relationships.unwireHoverEvents();
        };

        _node.enable = function () {
            _node.options.allowMenu = true; // _prevAllowMenu || true;
            _node.options.allowDrag = true; // _prevAllowDrag || true;
            _node.hideLock();
            _node.relationships.wireHoverEvents();
        };

        _node.showLock = function () {
            var _vpt = _node.vect.getBBox();
            var r = _node.slate.paper;
            if (!_lock && _node.slate.options.showLocks) {
                _lock = r.lockClosed().transform(["t", _vpt.x2 + 10, ",", _vpt.y - 20, "s", 0.9, 0.9].join()).attr({ fill: "#fff", stroke: "#000" });
                _lock.mouseover(function (e) {
                    _node.slate.unglow();
                    _node.hideLock();
                    var _openLock = _node.showOpenLock();
                    _node.slate.glow(_openLock);
                });
                _lock.mouseout(function (e) {
                    _node.slate.unglow();
                });
            }
            return _lock;
        };

        _node.hideLock = function () {
            _node.hideOpenLock();
            _lock && _lock.remove();
            _lock = null;
            _node.slate.unglow();
        };

        _node.showOpenLock = function () {
            var _vpt = _node.vect.getBBox();
            var r = _node.slate.paper;
            _openLock = r.lockOpen().transform(["t", _vpt.x2 + 10, ",", _vpt.y - 20, "s", 0.9, 0.9].join()).attr({ fill: "#fff", stroke: "#000" });
            _openLock.mouseover(function (e) {
                _node.slate.unglow();
                _node.slate.glow(this);
            });
            _openLock.mouseout(function (e) {
                _node.hideOpenLock();
                _node.showLock();
                _node.slate.unglow();
            });
            _openLock.mousedown(function (e) {
                _node.enable();
            });
            return _openLock;
        };

        _node.hideOpenLock = function () {
            _openLock && _openLock.remove();
            _openLock = null;
        };

        _node.initLock = function () {
            if (_node.vect && !_node.options.allowDrag && !_node.options.allowMenu) {
                _node.showLock();
            }
        };

        _node.offset = function () {
            var _x = _node.options.xPos - _node.slate.options.viewPort.left;
            var _y = _node.options.yPos - _node.slate.options.viewPort.top;
            if (_node.options.vectorPath === "ellipse") {
                _x = _x - _node.options.width / 2;
                _y = _y - _node.options.height / 2;
            }

            //var z = _node.slate.options.viewPort.zoom.r;
            //var _x = ((off.x - d.width) * z) / 2;
            //var _y = ((off.y - d.height) * z) / 2;

            return { x: _x, y: _y };
        };

        _node.textCoords = function () {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var tempPath = _node.slate.paper.path(_node.vect.attr("path")).transform(opts.transformString || "");
            var noRotationBB = tempPath.getBBox();
            var tx = noRotationBB.cx + (_node.vect.currentDx || 0);
            var ty = noRotationBB.cy + (_node.vect.currentDy || 0);
            tempPath.remove();
            return { x: tx, y: ty };
        };

        _node.linkCoords = function () {
            var x = _node.options.xPos - 20;
            var y = _node.options.yPos + _node.options.height / 2 - 22;

            if (_node.vect.type !== "rect") {
                y = _node.options.yPos + _node.options.height / 2 - 22;
                x = _node.options.xPos - 20;
            }
            return { x: x, y: y };
        };

        _node.animCoords = function () {
            var att = _self._.options.vectorPath === "ellipse" ? { cx: _self._.vect.ox + dx, cy: _self._.vect.oy + dy } : { x: _self._.vect.ox + dx, y: _self._.vect.oy + dy };
        };

        _node.init = function () {
            if (_node.options.id > -1) {
                $s.ajax(url(_node.options.ajax.nodeCreated), function (respText, resp) {
                    _node.options.holdData = eval('(' + respText + ')');
                    bindSlates(_node.options.holdData);
                }, JSON.stringify(_node.options));
            }
        };

        _node.rotate = function (_opts) {
            var opts = {
                angle: 0,
                cb: null,
                dur: 0
            };
            _underscore2.default.extend(opts, _opts);
            var ta = ["r", opts.angle].join('');

            if (opts.dur === 0) {
                _node.vect.transform(ta);
                _node.text.transform(ta);
                if (_node.options.link.show) _node.link.transform(ta);
                opts.cb && opts.cb();
            } else {
                var lm = _node.slate.paper.set();
                lm.push(_node.vect);
                lm.push(_node.text);
                if (_node.options.link.show) lm.push(_node.link);
                lm.animate({ transform: ta }, opts.dur, ">", function () {
                    opts.cb && opts.cb();
                });
            }
        };

        _underscore2.default.each($s.fn.node.fn, function (fn) {
            if (_underscore2.default.isFunction(fn)) {
                if (arguments[1].substring(0, 1) === '_') {
                    var p = arguments[1].replace("_", "");
                    _node[p] = {};
                    _node[p] = fn.apply(_node[p]);
                    _node[p]._ = _node;
                    //delete _node["_" + p];
                }
            }
        });
        return _node;
    };
    $s.fn.node.fn = $s.fn.node.prototype = {};
})(Slatebox);
