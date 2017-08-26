'use strict';

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s) {
    $s.fn.slate = function (_options) {
        if (!(this instanceof $s.fn.slate)) return new $s.fn.slate(_options);

        var _slate = this;
        _slate.options = {
            id: $s.guid(),
            container: '',
            instance: '',
            name: '',
            description: '',
            containerStyle: {
                width: "auto",
                height: "auto"
            },
            viewPort: {
                allowDrag: true,
                originalWidth: 50000,
                width: 50000,
                height: 50000,
                left: 5000,
                top: 5000,
                zoom: { w: 50000, h: 50000, r: 1 }
            },
            events: {
                onNodeDragged: null,
                onCanvasClicked: null,
                onImagesRequested: null,
                onRequestSave: null
            },
            enabled: true,
            showBirdsEye: true,
            sizeOfBirdsEye: 200,
            showMultiSelect: true,
            showZoom: true,
            showUndoRedo: true,
            showStatus: true,
            showLocks: true,
            collaboration: {
                allow: true,
                localizedOnly: false,
                userIdOverride: null,
                onCollaboration: null
            },
            isPublic: false,
            isFeatured: false,
            isCommunity: false
        };

        //ensure indiv sections aren't wiped out by custom additions/changes
        var _iv = _slate.options.viewPort;
        var _cs = _slate.options.containerStyle;
        var _ie = _slate.options.events;
        var _c = _slate.options.collaboration;
        //var _cc = _slate.options.collaboration.callbacks;

        _underscore2.default.extend(_slate.options, _options);
        _underscore2.default.extend(_slate.options.collaboration, _underscore2.default.extend(_c, _options.collaboration || {}));
        //_.extend(_slate.options.collaboration.callbacks, _.extend(_cc, _options.collaboration.callbacks || {}));
        _underscore2.default.extend(_slate.options.viewPort, _underscore2.default.extend(_iv, _options.viewPort || {}));
        _underscore2.default.extend(_slate.options.events, _underscore2.default.extend(_ie, _options.events || {}));
        _underscore2.default.extend(_slate.options.containerStyle, _underscore2.default.extend(_cs, _options.containerStyle || {}));

        //ensure container is always an object
        if (!$s.isElement(_slate.options.container)) {
            _slate.options.container = $s.el(_slate.options.container);
        }

        var constants = {
            statusPanelAtRest: 33,
            statusPanelExpanded: 200
        };

        function url(opt) {
            return options.ajax.rootUrl + options.ajax.urlFlavor + opt;
        };

        var glows = [];
        _slate.glow = function (obj) {
            glows.push(obj.glow());
            //setTimeout(function () { glows.length > 0 && _slate.unglow() }, 1000);
        };

        _slate.unglow = function () {
            _underscore2.default.each(glows, function (glow) {
                glow.remove();
            });
            glows = [];
        };

        var tips = [];
        _slate.addtip = function (tip) {
            if (tip) tips.push(tip);
        };

        _slate.untooltip = function () {
            _underscore2.default.each(tips, function (tip) {
                tip && tip.remove();
            });
        };

        // _slate.reset = function () {
        //     var _v = 50000;
        //     _slate.options.viewPort = {
        //         allowDrag: true
        //         , originalWidth: _v
        //         , width: _v
        //         , height: _v
        //         , left: 5000
        //         , top: 5000
        //         , zoom: { w: _v, h: _v, r: 1 }
        //     };
        //     _slate.zoom(0, 0, _v, _v, false);
        //     _slate.canvas.resize(_v);
        //     //_slate.canvas.move({ x: 5000, y: 5000, dur: 0, isAbsolute: true });
        // };

        _slate.zoom = function (x, y, w, h, fit) {
            this.nodes.closeAllLineOptions();
            this.paper.setViewBox(x, y, w, h, fit);
        };

        _slate.svg = function (cb) {

            var _orient = _slate.getOrientation();

            var _resizedSlate = JSON.parse(_slate.exportJSON());
            _underscore2.default.each(_resizedSlate.nodes, function (n) {
                n.options.yPos = n.options.yPos - _orient.top;
                n.options.xPos = n.options.xPos - _orient.left;
                if (n.options.rotate) {
                    n.options.rotate.point.x = n.options.rotate.point.x - _orient.left;
                    n.options.rotate.point.y = n.options.rotate.point.y - _orient.top; //  = { x: n.options.xPos + n.options.width/2, y: n.options.yPos + n.options.height/2 };
                }
                var _updatedPath = $s._transformPath(n.options.vectorPath, ["T", _orient.left * -1, ",", _orient.top * -1].join(""));
                n.options.vectorPath = _updatedPath;
            });

            var _div = $("<div id='tempSvgSlate'/>").css("width", "1000px").css("height", "1000px").css("visibility", "hidden");

            $(document.body).append(_div);

            var _size = Math.max(_orient.width, _orient.height);

            //arrows are not showing up because this is missing from the new svg --
            //it exists in the Meteor.currentSlate.
            //<path stroke-linecap="round" d="M5,0 0,2.5 5,5 3.5,3 3.5,2z" id="raphael-marker-classic" style="-webkit-tap-highlight-color: #FFEB3B;"></path>
            //Meteor.Slatebox.exportCanvas.nodes.refreshAllRelationships();

            //because raphael only adds the <path (above) when it doesn't already
            //exist and because I modified the raphael.js source on 5964 to accomodate
            //the hiding of these so that they get created on SVG export
            //now the exported SVG should include the previously missing <path element
            _underscore2.default.each(["block", "classic", "oval", "diamond", "open", "none", "wide", "narrow", "long", "short"], function (tt) {
                $("#raphael-marker-" + tt).hide();
            });

            var _exportCanvas = new $s().slate({
                container: "tempSvgSlate",
                containerStyle: { backgroundColor: _resizedSlate.options.containerStyle.backgroundColor },
                defaultLineColor: _resizedSlate.options.defaultLineColor,
                viewPort: {
                    allowDrag: false,
                    originalWidth: _size,
                    width: _size,
                    height: _size,
                    left: 0,
                    top: 0,
                    zoom: { w: _size, h: _size, r: 1 }
                }
                //, viewPort: _resizedSlate.options.viewPort
                , name: _resizedSlate.options.name,
                description: _resizedSlate.options.description,
                showBirdsEye: false,
                showMultiSelect: false,
                showUndoRedo: false,
                showZoom: false
            });

            _exportCanvas.init();
            _exportCanvas.loadJSON(JSON.stringify(_resizedSlate), undefined, true);
            _exportCanvas.nodes.refreshAllRelationships();

            //the timeout is critical to ensure that the SVG canvas settles
            //and the url-fill images appear.
            setTimeout(function () {

                cb({ svg: _exportCanvas.canvas.rawSVG(), orient: _orient });
                _div.remove();

                //show these, which were missing due to the above logic re the 
                //arrows on the exported slate.
                _underscore2.default.each(["block", "classic", "oval", "diamond", "open", "none", "wide", "narrow", "long", "short"], function (tt) {
                    $("#raphael-marker-" + tt).show();
                });
            }, 100);
        };

        _slate.present = function (pkg) {
            var _currentOperations = [],
                n = null;
            var next = function next() {
                if (_currentOperations.length === 0) {
                    if (pkg.nodes.length > 0) {
                        var node = pkg.nodes.shift();
                        n = _underscore2.default.detect(_slate.nodes.allNodes, function (n) {
                            return n.options.name == node.name;
                        });
                        _currentOperations = node.operations;
                        pkg.nodeChanged && pkg.nodeChanged(node);
                    }
                }

                if (_currentOperations.length > 0) {
                    var op = _currentOperations.shift();
                    pkg.opChanged && pkg.opChanged(op);

                    perform(pkg, n, op, function (p) {
                        var _sync = pkg.sync !== undefined ? pkg.sync[p.operation] : false;
                        switch (p.operation) {
                            case "zoom":
                                _sync && _slate.collab && _slate.collab.send({ type: 'onZoom', data: { id: p.id, zoomLevel: p.zoomLevel } });
                                break;
                            case "position":
                                _sync && _slate.collab && _slate.collab.send({ type: "onNodePositioned", data: { id: p.id, location: p.location, easing: p.easing } });
                                break;
                        }
                        next();
                    });
                } else {
                    pkg.complete && pkg.complete();
                }
            };
            next();
        };

        function perform(pkg, node, op, cb) {
            var _det = op.split('@'),
                _param = _det[1];
            //console.log(_det[0]);
            switch (_det[0]) {
                case 'zoom':
                    var _dur = _det.length > 2 ? parseFloat(_det[2]) : pkg.defaultDuration;
                    node.zoom(_param, _dur, cb);
                    break;
                case 'position':
                    var _ease = _det.length > 2 ? _det[2] : pkg.defaultEasing,
                        _dur = _det.length > 3 ? parseFloat(_det[3]) : pkg.defaultDuration;
                    node.position(_param, cb, _ease, _dur);
                    break;
            }
        };

        // _slate.setSize = function (w, h) {
        //     this.paper.setSize(w, h);
        // };

        _slate.loadJSON = function (_jsonSlate, blnPreserve, blnSkipZoom) {
            var useMainCanvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var _enabled = this.options.enabled;
            if (blnPreserve === undefined) {
                this.paper.clear();
                _slate.nodes.allNodes = [];
            }

            var _loadedSlate = JSON.parse(_jsonSlate);
            var _collab = this.options.collaboration;
            _underscore2.default.extend(this.options, _loadedSlate.options);
            //this.id = _loadedSlate.id;
            this.options.collaboration = _collab;

            var _deferredRelationships = [];
            _underscore2.default.each(_loadedSlate.nodes, function (node) {
                var _boundTo = $s.instance.node(node.options);
                _slate.nodes.add(_boundTo, useMainCanvas);
                _deferredRelationships.push({ bt: _boundTo, json: node });
            });

            _underscore2.default.each(_deferredRelationships, function (relationship) {
                var _bounded = relationship;
                _bounded.bt.addRelationships(_bounded.json, function (lines) {
                    _underscore2.default.invoke(lines, 'toFront');
                    _bounded.bt.vect.toFront();
                    _bounded.bt.text.toFront();
                    _bounded.bt.link.toFront();
                });
            });

            //zoom
            if (!blnSkipZoom) {
                var _v = Math.max(this.options.viewPort.zoom.w, this.options.viewPort.zoom.h);
                this.zoom(0, 0, _v, _v, false);
                this.canvas.resize(_v);
            }

            if (_slate.options.showLocks) {
                _slate.displayLocks();
            }

            //refreshes all relationships
            _underscore2.default.each(_slate.nodes.allNodes, function (_node) {
                _node.relationships.updateAssociationsWith({ activeNode: _node.options.id, currentDx: 0, currentDy: 0 });
            });
            _slate.nodes.refreshAllRelationships();

            //reset disable if previously was disabled
            //if (!_enabled) {
            //    _slate.disable();
            //}

            //refresh birdseye
            //_slate.options.showBirdsEye && _slate.birdseye.refresh();
        };

        _slate.displayLocks = function () {
            _slate.nodes.allNodes.forEach(function (node) {
                node.initLock();
            });
        };

        _slate.hideLocks = function () {
            _slate.nodes.allNodes.forEach(function (node) {
                node.hideLock();
            });
        };

        //the granularity is at the level of the node...
        _slate.exportDifference = function (compare, lineWidthOverride) {
            var _difOpts = _underscore2.default.extend({}, _slate.options);
            var _pc = _difOpts.collaboration.panelContainer;
            var _cc = _difOpts.collaboration.callbacks;
            delete _difOpts.collaboration.panelContainer;
            delete _difOpts.collaboration.callbacks;
            delete _difOpts.container;
            delete _difOpts.events;

            //birdseye specific -- if this is not here, then locks
            //show up on the birdseye
            _difOpts.showLocks = compare.options.showLocks;

            var jsonSlate = { options: (0, _lodash2.default)(_difOpts), nodes: [] };

            _underscore2.default.each(_slate.nodes.allNodes, function (node) {
                var _exists = false;
                var pn = node;
                if (pn.options.id !== _slate.tempNodeId) {
                    _underscore2.default.each(compare.nodes.allNodes, function (nodeInner) {
                        if (nodeInner.options.id === pn.options.id) {
                            _exists = true;
                            return;
                        }
                    });
                    if (!_exists) {
                        jsonSlate.nodes.push(pn.serialize(lineWidthOverride));
                    }
                }
            });

            _difOpts.collaboration.panelContainer = _pc;
            _difOpts.collaboration.callbacks = _cc;

            return JSON.stringify(jsonSlate);
        };

        _slate.exportJSON = function () {
            var _cont = _slate.options.container;
            var _pcont = _slate.options.collaboration.panelContainer || null;
            var _callbacks = _slate.options.collaboration.callbacks || null;
            var _opts = _slate.options;
            delete _opts.container;
            delete _opts.collaboration.panelContainer;

            var jsonSlate = { options: (0, _lodash2.default)(_opts), nodes: [] };
            _slate.options.container = _cont;
            _slate.options.collaboration.panelContainer = _pcont;
            _slate.options.collaboration.callbacks = _callbacks;

            delete jsonSlate.options.events;
            delete jsonSlate.options.ajax;
            delete jsonSlate.options.container;

            var ma = [];
            _underscore2.default.each(_slate.nodes.allNodes, function (node) {
                if (node.options.id !== _slate.tempNodeId) {
                    jsonSlate.nodes.push(node.serialize());
                }
            });

            return JSON.stringify(jsonSlate);
        };

        _slate.snapshot = function () {
            var _snap = JSON.parse(_slate.exportJSON());
            _snap.nodes.allNodes = _snap.nodes;
            return _snap;
        };

        _slate.getOrientation = function (_nodesToOrient) {

            var orient = 'landscape',
                sWidth = _slate.options.viewPort.width,
                sHeight = _slate.options.viewPort.height,
                vpLeft = 0,
                vpTop = 0;
            var bb = new Array();
            bb['left'] = 99999;bb['right'] = 0;bb['top'] = 99999;bb['bottom'] = 0;

            var an = _nodesToOrient || _slate.nodes.allNodes;
            if (an.length > 0) {
                for (_px = 0; _px < an.length; _px++) {
                    //var sb = allNodes[_px].b.split(' ');
                    var sbw = 10;
                    //if (!isNaN(sb[0].replace('px', ''))) sbw = parseInt(sb[0].replace('px', ''));
                    var _bb = an[_px].vect.getBBox();

                    //var x = _bb.x + ((_bb.x / _slate.options.viewPort.zoom.r) - _bb.x);
                    var _r = _slate.options.viewPort.zoom.r || 1;
                    var x = _bb.x * _r;
                    var y = _bb.y * _r;
                    var w = _bb.width * _r;
                    var h = _bb.height * _r;

                    /*
                    var x = _bb.x;
                    var y = _bb.y;
                    var w = _bb.width;
                    var h = _bb.height;
                    */

                    bb['left'] = Math.abs(Math.min(bb['left'], x - sbw));
                    bb['right'] = Math.abs(Math.max(bb['right'], x + w + sbw));
                    bb['top'] = Math.abs(Math.min(bb['top'], y - sbw));
                    bb['bottom'] = Math.abs(Math.max(bb['bottom'], y + h + sbw));
                }

                var sWidth = bb['right'] - bb['left'];
                var sHeight = bb['bottom'] - bb['top'];

                if (sHeight > sWidth) {
                    orient = 'portrait';
                }
            }
            return { orientation: orient, height: sHeight, width: sWidth, left: bb['left'], top: bb['top'] };
        };

        _slate.resize = function (_size, dur, pad) {
            var _p = pad || 0;
            if (_p < 6) _p = 6;
            _size = _size - (_p * 2 || 0);
            var orx = _slate.getOrientation();
            var wp = orx.width / _size * _slate.options.viewPort.width;
            var hp = orx.height / _size * _slate.options.viewPort.height;
            var sp = Math.max(wp, hp);

            var _r = Math.max(_slate.options.viewPort.width, _slate.options.viewPort.height) / sp;
            var l = orx.left * _r - _p;
            var t = orx.top * _r - _p;

            _slate.zoom(0, 0, sp, sp, true);
            _slate.options.viewPort.zoom = { w: sp, h: sp, l: parseInt(l * -1), t: parseInt(t * -1), r: _slate.options.viewPort.originalWidth / sp };
            _slate.canvas.move({ x: l, y: t, dur: dur, isAbsolute: true });
        };

        _slate.stopEditing = function () {
            _underscore2.default.each(_slate.nodes.allNodes, function (node) {
                node.editor && node.editor.end();
                node.images && node.images.end();
                node.links && node.links.end();
                node.customShapes && node.customShapes.end();
            });
        };

        _slate.disable = function (exemptSlate, exemptNodes) {
            if (!exemptNodes) {
                _underscore2.default.each(_slate.nodes.allNodes, function (node) {
                    node.disable();
                });
            }

            if (!exemptSlate) {
                _slate.options.enabled = false;
                _slate.options.viewPort.allowDrag = false;
            }
        };

        _slate.enable = function (exemptSlate, exemptNodes) {
            if (!exemptNodes) {
                _underscore2.default.each(_slate.nodes.allNodes, function (node) {
                    node.enable();
                });
            }
            if (!exemptSlate) {
                _slate.options.enabled = true;
                _slate.options.viewPort.allowDrag = true;
            }
        };

        _slate.unMarkAll = function () {
            _underscore2.default.each(_slate.nodes.allNodes, function (node) {
                node.unmark();
            });
        };

        _slate.init = function () {

            //init collaboration
            if (_slate.options.collaboration && _slate.options.collaboration.allow) {
                //init collaboration
                _slate.collab.init();
            }

            var _init = _slate.canvas.init();

            //init multi selection mode 
            if (_slate.options.showMultiSelect) {
                _slate.multiselection && _slate.multiselection.init();
            }

            return _init;

            //window.onerror = function (e) {
            //TODO: add error handling
            //};
        };

        //loads plugins
        _underscore2.default.each($s.fn.slate.fn, function (fn) {
            if (_underscore2.default.isFunction(fn)) {
                if (arguments[1].substring(0, 1) === '_') {
                    var p = arguments[1].replace("_", "");
                    _slate[p] = {};
                    _slate[p] = fn.apply(_slate[p]);
                    _slate[p]._ = _slate; //_slate[p].parent = 
                    //delete _node["_" + p];
                }
            }
        });

        _slate.tempNodeId = $s.guid();

        if (_underscore2.default.isFunction(_slate.options.onInitCompleted)) {
            _slate.options.onInitCompleted.apply(this);
        }

        return _slate;
    };
    $s.fn.slate.fn = $s.fn.slate.prototype = {};
})(Slatebox);
