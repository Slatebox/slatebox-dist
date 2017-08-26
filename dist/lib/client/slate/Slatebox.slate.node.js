"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _getTransformedPath = require("../helpers/getTransformedPath");

var _getTransformedPath2 = _interopRequireDefault(_getTransformedPath);

var _getDepCoords = require("../helpers/getDepCoords");

var _getDepCoords2 = _interopRequireDefault(_getDepCoords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._nodes = function () {
        var _self = this,
            _ensureBe;
        _self.allNodes = [];

        function refreshBe() {
            window.clearTimeout(_ensureBe);
            _ensureBe = window.setTimeout(function () {
                _self._.birdseye && _self._.birdseye.refresh(false);
            }, 10);
        };

        _self.copyNodePositions = function (source) {
            var useMainCanvas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _underscore2.default.each(source, function (src) {
                //if (src.options.id !== _self.tempNodeId) {
                var cn = _underscore2.default.detect(_self.allNodes, function (n) {
                    return n.options.id === src.options.id;
                });
                cn.setPosition({ x: src.options.xPos, y: src.options.yPos });

                var opts = {};
                if (useMainCanvas) {
                    var tempPath = Meteor.currentSlate.paper.path(cn.vect.attr("path"));
                    opts.boundingClientRect = tempPath[0].getBoundingClientRect();
                    tempPath.remove();
                }
                cn.rotate.applyImageRotation(opts);
                //}
            });
            _underscore2.default.invoke(_underscore2.default.pluck(_self.allNodes, 'relationships'), 'refresh');
        };

        _self.addRange = function (_nodes) {
            _underscore2.default.each(_nodes, function (node) {
                _self.add(node);
            });
            return _self;
        };

        _self.removeRange = function (_nodes) {
            _underscore2.default.each(_nodes, function (node) {
                _self.allNodes = removeNode(_self.allNodes, node);
            });
            return _self;
        };

        _self.add = function (_node, useMainCanvas) {
            _node.slate = _self._; //parent
            _self.allNodes.push(_node);
            addToCanvas(_node, useMainCanvas);
        };

        _self.remove = function (_node) {
            _self.allNodes = remove(_self.allNodes, _node);
            _node.slate = null;
            removeFromCanvas(_node);
        };

        _self.moveNodes = function (pkg, options) {
            _self.closeAllLineOptions();
            _self.closeAllMenus();
            // _node.hideOwnMenus();
            var allAssoc = [];
            _underscore2.default.each(_self.allNodes, function (node) {
                _underscore2.default.each(node.relationships.associations, function (a) {
                    allAssoc.push(a);
                });
            });
            var uniqAssoc = _underscore2.default.uniq(allAssoc, function (a) {
                return a.id;
            });

            var p = pkg.data || pkg,
                d = p.dur || Meteor.collabAnimationDuration || 300,
                e = p.easing || ">";
            var associations = p.associations,
                nodeOptions = p.nodeOptions;


            _underscore2.default.each(nodeOptions, function (opts) {
                var _nodeObject = _underscore2.default.find(_self.allNodes, function (node) {
                    return node.options.id === opts.id;
                });

                _underscore2.default.extend(_nodeObject.options, opts);

                var dps = (0, _getDepCoords2.default)({ x: opts.xPos, y: opts.yPos }, _nodeObject.options),
                    lx = dps.lx,
                    tx = dps.tx,
                    ty = dps.ty;
                if (options.animate) {
                    _nodeObject.text.animate({ x: tx, y: ty }, d, e);
                    _nodeObject.link.animate({ x: lx, y: ty }, d, e);
                } else {
                    _nodeObject.text.attr({ x: tx, y: ty });
                    _nodeObject.link.attr({ x: lx, y: ty });
                }

                if (options.animate) {
                    _nodeObject && _nodeObject.vect.animate({ path: opts.vectorPath, transform: _nodeObject.getTransformString() }, d, e, function () {
                        _nodeObject.vect.attr({ path: opts.vectorPath });
                    });
                } else {
                    _nodeObject && _nodeObject.vect.attr({ path: opts.vectorPath });
                    var rotationOptions = {};
                    if (options.useMainCanvas) {
                        var tempPath = Meteor.currentSlate.paper.path(_nodeObject.vect.attr("path"));
                        rotationOptions = {
                            boundingClientRect: tempPath[0].getBoundingClientRect()
                        };
                        tempPath.remove();
                    }
                    _nodeObject.rotate.applyImageRotation(rotationOptions);
                }
            });

            _underscore2.default.each(associations, function (assoc) {
                var a = _underscore2.default.find(uniqAssoc, function (a) {
                    return a.parent.options.id === assoc.parentId && a.child.options.id === assoc.childId;
                });
                if (options.animate) {
                    a && a.line.animate({ path: assoc.linePath }, d, e, function () {
                        a.line.attr({ path: assoc.linePath });
                    });
                } else {
                    a && a.line.attr({ path: assoc.linePath });
                }
            });
            _self._.birdseye && _self._.birdseye.refresh(true);
        };

        function getParentChild(obj) {
            var _parent, _child;
            _underscore2.default.each(_self.allNodes, function (node) {
                if (node.options.id === obj.parent) {
                    _parent = node;
                } else if (node.options.id === obj.child) {
                    _child = node;
                }
                if (_parent && _child) return;
            });

            return { p: _parent, c: _child };
        };

        _self.removeRelationship = function (rm) {
            var pc = getParentChild(rm);
            var _parent = pc.p,
                _child = pc.c;
            if (_parent && _child) {
                // _parent.relationships.removeChild(_child);
                // _child.relationships.removeParent(_parent);
                _parent.relationships.removeAssociation(_child);
                _child.relationships.removeAssociation(_parent);
            }
        };

        _self.refreshAllRelationships = function () {
            _underscore2.default.each(_self.allNodes, function (node) {
                node.relationships.refresh();
            });
        };

        _self.addRelationship = function (add) {
            var pc = getParentChild(add);
            var _parent = pc.p,
                _child = pc.c;
            if (_parent && _child) {
                switch (add.type) {
                    case "association":
                        _parent.relationships.addAssociation(_child, add.options);
                        break;
                    // case "parent":
                    //     _parent.relationships.addParent(_child);
                    //     break;
                }
            }
        };

        _self.closeAllLineOptions = function (exception) {
            _underscore2.default.each(_self.allNodes, function (node) {
                _underscore2.default.each(node.relationships.associations, function (association) {
                    if (association.id === exception) {} else {
                        node.lineOptions && node.lineOptions.hide(association.id);
                    }
                });
            });
        };

        _self.closeAllMenus = function (exception) {
            _underscore2.default.each(_self.allNodes, function (node) {
                if (node.options.id === exception) {} else {
                    node.menu && node.menu.hide();
                    node.resize && node.resize.hide();
                }
            });
        };

        _self.closeAllConnectors = function () {
            _underscore2.default.each(_self.allNodes, function (node) {
                node.connectors && node.connectors.remove();
                node.resize && node.resize.hide();
            });
        };

        _self.one = function (id) {
            var cn = null;
            _underscore2.default.each(_self.allNodes, function (node) {
                if (node.options.id === id) {
                    cn = node;
                    return;
                }
            });
            return cn;
        };

        function remove(a, obj) {
            return _underscore2.default.filter(a, function (a) {
                return a.options.id !== obj.options.id;
            });
        }

        function removeFromCanvas(_node) {
            _underscore2.default.each(["vect", "text", "link"], function (tt) {
                _node[tt].remove();
            });
            refreshBe();
        };

        function addToCanvas(_node, useMainCanvas) {
            var vect = null,
                text = null,
                link = null,
                s = _node.options.borderColor || "#000";
            if (_node.options.borderWidth === 0) s = 'transparent';
            var vectOpt = { stroke: s, "stroke-dasharray": _node.options.borderStyle || "", "stroke-width": _node.options.borderWidth, fill: _node.options.backgroundColor || "none" };
            var _x = _node.options.xPos;
            var _y = _node.options.yPos;
            var paperToUse = _self._.paper;
            var percent = 1;

            var _width = _node.options.width;
            var _height = _node.options.height;

            //tree:
            //_node.options.vectorPath = "M72.223,47.223c0-5.945-3.777-11.039-9.028-13.021c2.192-2.455,3.472-5.651,3.472-9.201c0-7.67-6.218-13.889-13.889-13.889c-1.094,0-2.104,0.106-3.125,0.344C48.49,4.961,42.942-0.002,36.111,0c-6.83,0.001-12.379,4.964-13.542,11.46c-1.021-0.239-2.032-0.345-3.125-0.345c-7.671,0-13.889,6.218-13.889,13.889c0,3.551,1.28,6.746,3.472,9.202C3.777,36.187,0,41.278,0,47.223c0,7.671,5.556,13.892,13.889,13.892h2.777l11.111,19.444v13.887c0,2.777,2.778,5.555,5.556,5.555h5.556c2.776,0,5.555-2.777,5.555-5.555v-13.89l11.112-19.441l3.992-0.083C66.666,61.113,72.223,54.474,72.223,47.223L72.223,47.223z M27.778,61.113h16.667l-5.555,11.11h-5.556L27.778,61.113z";

            //house:
            //_node.options.vectorPath = "M232.272,88.949L79.937,223.837v192.749c0,4.979,4.023,8.971,9.001,8.971h95.205v-84.51c0-4.979,3.994-9,8.971-9h78.229  c4.978,0,8.97,4.021,8.97,9v84.51h95.235c4.979,0,8.972-3.992,8.972-8.971V223.779L232.272,88.949z";

            //rounded rect:
            //
            //_node.options.vectorPath = "M1,1 h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z";
            //_node.options.vectorPath = "M" + _x + "," + _y + " h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z";
            //console.log("path is ", _node.options.vectorPath);
            //_node.options.vectorPath = "M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z"
            // M276.328,277.105h-85.096V224.74  h85.096V277.105z M79.937,42.699h54.771l-0.479,32.438l-54.293,49.048V42.699z M231.388,24.746L15.334,216.053l22.758,25.676l194.18-171.952l194.136,171.952l22.715-25.676L233.113,24.746 l-0.884-0.76L231.388,24.746z

            //const _path = paperToUse.roundedRectanglePath(pathAttrs);
            //console.log("path is ", _path);
            //_node.options.vectorPath = "M" + _x + "," + _y + " h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z";

            //console.log("paths are ", _path, _node.options.vectorPath);

            //adjust historical vectorPaths to pure paths...
            // const _tp = "T" + (_x * percent) + "," + (_y * percent) + ",s" + (_width/150 * percent) + "," + (_height/100 * percent);
            var _transforms = ["T" + _x * percent + ", " + _y * percent, "s" + _width / 150 * percent + ", " + _height / 100 * percent + ", " + _x + ", " + _y];
            _node.options.isEllipse = _node.options.isEllipse || _node.options.vectorPath === "ellispse";
            switch (_node.options.vectorPath) {
                case "ellipse":
                    _node.options.vectorPath = (0, _getTransformedPath2.default)("M150,50 a75,50 0 1,1 0,-1 z", _transforms);
                    break;
                case "rectangle":
                    _node.options.vectorPath = (0, _getTransformedPath2.default)("M1,1 h150 v100 h-150 v-100 z", _transforms);
                    break;
                case "roundedrectangle":
                    _node.options.vectorPath = (0, _getTransformedPath2.default)("M1,1 h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z", _transforms);
                    break;
            }

            vect = paperToUse.path(_node.options.vectorPath).attr(vectOpt);

            //need to set in case toback or tofront is called and the load order changes in the context plugin
            vect.node.setAttribute("rel", _node.options.id);
            vect.data({ id: _node.options.id });
            _node.vect = vect;
            _node.vect.transform(_node.getTransformString());

            //update xPos, yPos in case it is different than actual
            var bbox = vect.getBBox();
            _node.options.xPos = bbox.x;
            _node.options.yPos = bbox.y;

            var tc = _node.textCoords();
            var lc = _node.linkCoords();
            text = paperToUse.text(tc.x, tc.y, _node.options.text || '').attr({ "font-size": _node.options.fontSize + "pt", fill: _node.options.foregroundColor || "#000" });
            link = paperToUse.linkArrow().transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());

            _node.text = text;
            _node.link = link;

            _node.relationships.wireHoverEvents();
            _node.relationships.wireDragEvents();
            _node.links && _node.links.wireEvents();

            if (_node.options.image && _node.options.image !== "") {
                _node.images.set(_node.options.image, _node.options.imageOrigWidth, _node.options.imageOrigHeight, useMainCanvas);
                //_node.vect.attr({ "fill": "url(" + _node.options.image + ")", "stroke-width": _node.options.borderWidth, "stroke": "#000" });
            }

            if (!_node.options.link || !_node.options.link.show) {
                _node.link.hide();
            }

            refreshBe();
            return vect;
        };
        return _self;
    };
})(Slatebox, Slatebox.fn.slate);
