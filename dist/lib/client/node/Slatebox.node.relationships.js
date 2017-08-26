"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._relationships = function () {
        var _self = this;
        _self.associations = [];

        var _isLastAlt = false,
            _isLastShift = false;

        function broadcast(pkg) {
            _self._.slate.collab && _self._.slate.collab.send(pkg);
        };

        function refreshBe() {
            //refresh the birds eye
            var _json = null;
            if (_self._.slate.birdseye) _json = _self._.slate.birdseye.refresh(false);
            return _json;
        };

        _self.addAssociation = function (_node, assocPkg) {
            var cx = _self._.slate.paper;
            assocPkg = assocPkg || {};

            //make sure this doesn't already exist
            var _connection = _underscore2.default.detect(_self.associations, function (a) {
                return a.child.options.id === _node.options.id;
            });

            if (!_connection) {
                _connection = cx.connection({
                    id: $s.guid(),
                    parent: _self._,
                    child: _node,
                    lineColor: assocPkg.lineColor || _self._.options.lineColor,
                    lineWidth: assocPkg.lineWidth || _self._.options.lineWidth,
                    lineOpacity: assocPkg.lineOpacity || _self._.options.lineOpacity,
                    blnStraight: assocPkg.isStraightLine || false,
                    showParentArrow: assocPkg.showParentArrow || _self._.options.showParentArrow,
                    showChildArrow: assocPkg.showChildArrow || _self._.options.showChildArrow,
                    childHasMultipleParents: _node.options.hasMultipleParents || false
                });
                _connection.line.toBack();

                _self.associations.push(_connection);
                _node.relationships.associations.push(_connection);

                wireLineEvents(_connection);
                //refreshBe();
            }

            return _connection;
        };

        function wireLineEvents(c) {
            var _show = null;
            if (_self._.options.allowMenu) {
                var sp = 200,
                    highlight = "#ff0";
                c.line.node.style.cursor = "pointer";
                c.line.mouseover(function (e) {
                    c.over = true;
                    if (_self._.slate.options.enabled) {
                        lazyShowOptions(e);
                    }
                });
                c.line.mouseout(function () {
                    c.over = false;
                    _self._.slate.unglow();
                });

                c.line.mousedown(function (e) {
                    showOptions();
                });
            }
            var showOptions = function showOptions(e) {
                if (c.over) {
                    var _par = c.parent.offset();
                    var _child = c.child.offset();
                    _self._.lineOptions.show(e, c);
                }
            };
            var lazyShowOptions = _underscore2.default.debounce(showOptions, 500);
        };

        _self.initiateTempNode = function (e, _parent, _assocPkg) {
            var mp = $s.mousePos(e);
            var _slate = _parent.slate;

            var off = $s.positionedOffset(_slate.options.container);

            var _zr = _self._.slate.options.viewPort.zoom.r;
            var xp = _slate.options.viewPort.left + mp.x - off.left;
            var yp = _slate.options.viewPort.top + mp.y - off.top;

            var _tempNode = $s.instance.node({
                id: _self._.slate.tempNodeId,
                xPos: xp + (xp / _zr - xp),
                yPos: yp + (yp / _zr - yp),
                lineColor: "#990000",
                backgroundColor: "#ffffff",
                vectorPath: 'roundedrectangle',
                width: 30,
                height: 30
            });

            //var _pkg = { showParentArrow: _self._.options.showParentArrow, showChildArrow: _self._.options.showChildArrow }
            _slate.nodes.add(_tempNode, true);
            var _tempRelationship = _parent.relationships.addAssociation(_tempNode, _assocPkg, true); // _tempNode.relationships.addParent(_parent, {}, true);

            _tempRelationship.hoveredOver = null;
            _tempRelationship.lastHoveredOver = null;

            //initiates the drag
            _tempNode.vect.initDrag(e); //, off.x, off.y);
            _slate.options.viewPort.allowDrag = false;

            _tempNode.vect.mousemove(function (e) {
                _self._.slate.paper.connection(_tempRelationship);

                //is there a current hit?
                if (_tempRelationship.hoveredOver === null) {
                    //(e.clientX + e.clientY) % 2 === 0 && 
                    _tempRelationship.hoveredOver = hitTest($s.mousePos(e));
                    if (_tempRelationship.hoveredOver !== null) {
                        //yes, currently over a node -- scale it
                        _tempRelationship.hoveredOver.vect.animate({ "stroke-width": 5 }, 500, function () {
                            _tempRelationship.hoveredOver.vect.animate({ "stroke-width": _self._.options.borderWidth }, 500, function () {
                                _tempRelationship.hoveredOver = null;
                            });
                        });

                        //_tempRelationship.hoveredOver.vect.animate({ scale: '1.25, 1.25' }, 200);
                        //remember this node
                        //_tempRelationship.lastHoveredOver = _tempRelationship.hoveredOver;
                    } else {
                            //no current hit...is there a previous hit to reset?
                            //if (_tempRelationship.lastHoveredOver !== null) {
                            //    _tempRelationship.lastHoveredOver.vect.attr({ fill: _self._.options.backgroundColor });
                            //_tempRelationship.lastHoveredOver.vect.animate({ scale: '1,1' }, 200);
                            //    _tempRelationship.lastHoveredOver = null;
                            //}
                        }
                }
            });

            _tempNode.vect.mouseup(function (e) {
                _parent.relationships.removeAssociation(_tempNode);
                //_tempNode.relationships.removeParent(_parent);
                _tempNode.slate.nodes.remove(_tempNode);

                var overNode = hitTest($s.mousePos(e));
                if (overNode !== null) {
                    //overNode.vect.transform("s1,1,");

                    //check if overNode has any parents
                    var _relevantAssociations = _underscore2.default.filter(overNode.relationships.associations, function (association) {
                        return overNode.options.id === association.child.options.id;
                    });
                    overNode.options.hasMultipleParents = _relevantAssociations.length > 0;
                    overNode.relationships.updateAssociationsWith({
                        // childHasMultipleParents: _relevantAssociations.length > 0,
                        conditional: [{
                            key: "childHasMultipleParents",
                            getValue: function getValue(association, node) {
                                return _underscore2.default.filter(node.relationships.associations, function (a) {
                                    return overNode.options.id === a.child.options.id;
                                }).length > 0;
                            },
                            condition: function condition(association, node) {
                                return association.child.options.id === node.options.id;
                            },
                            data: overNode
                        }]
                    });
                    //check if the two nodes are already associated -- multiple associations between two nodes are currently not supported
                    var relevantAssociation = _underscore2.default.find(_parent.relationships.associations, function (association) {
                        return association.child.options.id === overNode.options.id && association.parent.options.id === _parent.options.id || association.parent.options.id === overNode.options.id && association.child.options.id === _parent.options.id;
                    });
                    if (!relevantAssociation) {
                        _parent.relationships.addAssociation(overNode, _assocPkg);
                        var _pkgx = { type: "addRelationship", data: { type: 'association', parent: _parent.options.id, child: overNode.options.id } };
                        _self._.slate.birdseye && _self._.slate.birdseye.relationshipsChanged(_pkgx);
                        broadcast(_pkgx);
                    }
                }

                if (_self._.slate.options.enabled) _parent.slate.options.viewPort.allowDrag = true;
            });
        };

        _self.removeAll = function () {
            _underscore2.default.each(_self.associations, function (association) {
                association.child.relationships.removeAssociation(_self._); //.parent);
                association.parent.relationships.removeAssociation(_self._);
                //_self.removeAssociation(this.child);
                _self._.slate.paper.removeConnection(association);
            });
            _self.associations = [];
        };

        _self.removeAssociation = function (_node) {
            _self.associations = remove(_self.associations, 'child', _node);
            _self.associations = remove(_self.associations, 'parent', _node);
            return _self;
        };

        _self.setKeys = function (_ref) {
            var isShift = _ref.isShift,
                isAlt = _ref.isAlt;

            _isLastShift = isShift;
            _isLastAlt = isAlt;
        };

        function hitTest(mp) {
            var overNode = null;
            var off = $s.positionedOffset(_self._.slate.options.container);
            _underscore2.default.each(_self._.slate.nodes.allNodes, function (node) {
                if (node.options.id !== _self._.slate.tempNodeId && node.options.id !== _self._.options.id && node.options.allowContext && node.options.allowResize) {
                    var _bb = node.vect.getBBox();

                    var _zr = _self._.slate.options.viewPort.zoom.r;
                    var xp = _self._.slate.options.viewPort.left + mp.x - off.left;
                    var yp = _self._.slate.options.viewPort.top + mp.y - off.top;

                    var c = {
                        x: xp + (xp / _zr - xp),
                        y: yp + (yp / _zr - yp)
                    };

                    if (c.x > _bb.x && c.x < _bb.x + _bb.width && c.y > _bb.y && c.y < _bb.y + _bb.height) {
                        overNode = node;
                        return;
                    }
                }
            });
            return overNode;
        };

        function remove(associations, type, obj) {
            var _na = [];
            _underscore2.default.each(associations, function (association) {
                if (association[type].options.id === obj.options.id) {
                    _self._.slate.paper.removeConnection(association);
                } else {
                    _na.push(association);
                }
            });
            return _na;
        };

        var dragger = function dragger(x, y) {
            if (_self._.events && _underscore2.default.isFunction(_self._.events.onClick)) {
                _self._.events.onClick.apply(this, [function () {
                    _initDrag(this);
                }]);
            } else {
                _initDrag(this);
            }
        };

        function _initDrag(_vect) {
            _self._.slate.multiselection && _self._.slate.multiselection.end();
            if (_self._.slate.options.linking) {
                _self._.slate.options.linking.onNode.apply(_vect, [_self._]);
            } else {
                if (_self._.options.allowDrag) {
                    Meteor.currentMoveTickAssociations = [];
                    if (Meteor.currentSlate) {
                        _underscore2.default.each(Meteor.currentSlate.nodes.allNodes, function (node) {
                            node.relationships.updateAssociationsWith({
                                currentDx: 0,
                                currentDy: 0
                            });
                        });
                    }

                    _self.updateAssociationsWith({
                        activeNode: _self._.options.id,
                        currentDx: 0,
                        currentDy: 0,
                        isAlt: _self._.slate.isAlt,
                        isShift: _self._.slate.isShift,
                        isUp: false,
                        childPositionSaved: false,
                        action: "move"
                    });

                    var bbox = _self._.vect.getBBox();
                    _vect.ox = bbox.x;
                    _vect.oy = bbox.y;
                    _self.syncAssociations(_self._, function (c, a) {
                        if (!Meteor.currentMoveTickAssociations.includes(a.id)) {
                            c.relationships.updateSingleAssociationWith({ id: a.id }, {
                                activeNode: _self._.options.id,
                                currentDx: 0,
                                currentDy: 0,
                                isAlt: _self._.slate.isAlt,
                                isShift: _self._.slate.isShift,
                                isUp: false,
                                childPositionSaved: false,
                                action: "move"
                            });
                            c.relationships.hideAll();
                            c.relationships.setKeys({ isAlt: _self._.slate.isAlt, isShift: _self._.slate.isShift });
                            c.setStartDrag();
                        }
                    });

                    _self.hideAll();
                    _self._.setStartDrag();

                    _isLastAlt = _self._.slate.isAlt;
                    _isLastShift = _self._.slate.isShift;
                }
            }
        };

        var move = function move(dx, dy) {
            if (_self._.options.allowDrag) {

                Meteor.currentMoveTickAssociations = [];
                var _zr = _self._.slate.options.viewPort.zoom.r;
                dx = dx + (dx / _zr - dx);
                dy = dy + (dy / _zr - dy);

                var newMoveVector = _self._.rotateMoveVector({ dx: dx, dy: dy });
                var translateContext = {
                    action: "translate",
                    dx: newMoveVector.dx,
                    dy: newMoveVector.dy
                };
                var transformString = _self._.getTransformString(translateContext);
                _self._.vect.transform(transformString);
                _self._.vect.currentDx = dx;
                _self._.vect.currentDy = dy;
                _self._.setPosition({ x: _self._.vect.ox + dx, y: _self._.vect.oy + dy });

                _self.updateAssociationsWith({
                    currentDx: dx,
                    currentDy: dy
                });
                _self.syncAssociations(_self._, function (c, a) {
                    c.relationships.updateAssociationsWith({ activeNode: a.activeNode, currentDx: dx, currentDy: dy, isShift: _isLastShift, isAlt: _isLastAlt });
                    if (!(_isLastAlt && _isLastShift) && a.activeNode === a.parent.options.id && !_isLastShift) {
                        c.relationships.refresh();
                    } else if (_isLastAlt && _isLastShift) {
                        c.setPosition({ x: c.options.xPos + dx, y: c.options.yPos + dy }, undefined, undefined, { transformString: "T" + dx + "," + dy });
                    }
                });

                _self.refresh();
            }
        };

        _self.syncAssociations = function (node, cb) {
            _underscore2.default.each(node.relationships.associations, function (a) {
                if (a.child.options.id !== _self._.options.id && a.child.options.id !== node.options.id) {
                    cb && cb(a.child, a);
                    if (!Meteor.currentMoveTickAssociations) {
                        Meteor.currentMoveTickAssociations = [];
                    }
                    if (a.isAlt && a.isShift && !Meteor.currentMoveTickAssociations.includes(a.id)) {
                        // if (_self._.slate.isAlt && _self._.slate.isShift) {
                        Meteor.currentMoveTickAssociations && Meteor.currentMoveTickAssociations.push(a.id);
                        _self.syncAssociations(a.child, cb);
                    }
                }
            });
        };

        _self.updateAssociationsWith = function (opts) {
            var conditionalSet = {};
            if (opts.conditional) {
                _underscore2.default.each(opts.conditional, function (setContext, i) {
                    conditionalSet[i] = setContext;
                });
                delete opts.conditional;
            }
            _underscore2.default.each(_self.associations, function (a) {
                _underscore2.default.extend(a, opts);
                _underscore2.default.each(conditionalSet, function (setContext) {
                    if (setContext.condition(a, setContext.data)) {
                        a[setContext.key] = setContext.getValue(a, setContext.data);
                    }
                });
            });
        };

        _self.updateSingleAssociationWith = function (key, opts) {
            var association = _underscore2.default.findWhere(_self.associations, key);
            association && _underscore2.default.extend(association, opts);
        };

        var up = function up(e) {
            Meteor.currentMoveTickAssociations = [];
            _self.updateAssociationsWith({ isUp: true });
            _self.syncAssociations(_self._, function (c) {
                c.relationships.updateAssociationsWith({ isUp: true });
            });
            Meteor.currentMoveTickAssociations = [];

            _self.showAll();
            _self.refresh();
            _self._.setEndDrag();

            $s.transformPath(_self._, "T" + _self._.vect.currentDx + "," + _self._.vect.currentDy);

            if (!_isLastShift || !_isLastAlt && !_isLastShift) {
                var relevantAssociations = _underscore2.default.filter(_self._.relationships.associations, function (association) {
                    return (association.child.options.id === association.activeNode || association.parent.options.id === association.activeNode) && association.parent.options.id === association.activeNode;
                });
                _underscore2.default.each(relevantAssociations, function (association) {
                    $s.transformPath(association.child, "T" + _self._.vect.currentDx + "," + _self._.vect.currentDy);
                    var childBB = association.child.vect.getBBox();
                    association.child.setPosition({ x: childBB.x, y: childBB.y });
                    association.isShift = false;
                    association.isAlt = false;
                });
            } else if (_isLastAlt && _isLastShift) {
                var parentAssociations = _underscore2.default.filter(_self.associations, function (association) {
                    return association.child.options.id === _self._.options.id;
                });
                _underscore2.default.each(parentAssociations, function (parentAssociation) {
                    parentAssociation && parentAssociation.parent.relationships.refresh();
                });
                _self.updateAssociationsWith({ isUp: true, currentDx: _self._.vect.currentDx, currentDy: _self._.vect.currentDy });
                Meteor.currentMoveTickAssociations = [];
                _self.syncAssociations(_self._, function (c, a) {
                    if (a.childPositionSaved) {
                        c.relationships.updateAssociationsWith({ currentDx: 0, currentDy: 0 });
                    }
                    $s.transformPath(c, "T" + a.currentDx + "," + a.currentDy);
                    var childBB = c.vect.getBBox();
                    c.setPosition({ x: childBB.x, y: childBB.y });
                    a.childPositionSaved = true;
                    c.relationships.updateAssociationsWith({ isUp: true, isShift: _isLastShift, isAlt: _isLastAlt, conditional: [{
                            key: "childPositionSaved",
                            getValue: function getValue() {
                                return true;
                            },
                            condition: function condition(association, node) {
                                return association.child.options.id === node.options.id;
                            },
                            data: c
                        }] });
                    c.relationships.refresh();
                });

                Meteor.currentMoveTickAssociations = [];
            }

            var targetPoint = {
                x: _self._.vect.ox + _self._.vect.currentDx,
                y: _self._.vect.oy + _self._.vect.currentDy
            };

            _self._.vect.currentDx = 0;
            _self._.vect.currentDy = 0;

            _self._.vect.xPos = targetPoint.x;
            _self._.vect.yPos = targetPoint.y;

            _self.updateAssociationsWith({ isUp: false, currentDx: 0, currentDy: 0, isShift: false, isAlt: false });
            _self.syncAssociations(_self._, function (c) {
                c.relationships.showAll();
                c.relationships.updateAssociationsWith({ isUp: false, currentDx: 0, currentDy: 0, isShift: false, isAlt: false });
            });
            Meteor.currentMoveTickAssociations = [];

            _self._.slate.birdseye && _self._.slate.birdseye.refresh(true);

            if (_self._.slate.options.events && _underscore2.default.isFunction(_self._.slate.options.events.onNodeDragged)) _self._.slate.options.events.onNodeDragged.apply(this);

            _self.send();
        };

        _self.send = function () {
            if (_self._.context && !_self._.context.isVisible() && _self._.options.allowDrag) {
                // _self._.slate.collab && _self._.slate.collab.send({
                //     type: "onNodeMove"
                //     , data: {
                //         id: _self._.options.id
                //         , x: _self._.options.xPos
                //         , y: _self._.options.yPos
                //         , isAlt: _isLastAlt
                //         , isShift: _isLastShift
                //     }
                // });
                var pkg = {
                    type: "onNodesMove",
                    data: {
                        id: _self._.options.id,
                        nodeOptions: _underscore2.default.map(_self._.slate.nodes.allNodes, function (node) {
                            return node.options;
                        }),
                        associations: function () {
                            var assoc = [];
                            _underscore2.default.each(_self._.slate.nodes.allNodes, function (node) {
                                _underscore2.default.each(node.relationships.associations, function (a) {
                                    assoc.push({
                                        parentId: a.parent.options.id,
                                        childId: a.child.options.id,
                                        linePath: a.line.attr("path").toString(),
                                        id: a.line.id
                                    });
                                });
                            });
                            return _underscore2.default.uniq(assoc, function (a) {
                                return a.id;
                            });
                        }()
                    }
                };
                _self._.slate.collab && _self._.slate.collab.send(pkg);
                _self._.slate.birdseye && _self._.slate.birdseye.nodeChanged(pkg);
            }
        };

        var _visibility = function _visibility(action) {
            var slate = _self._.slate.paper;
            for (var i = _self.associations.length; i--;) {
                _self.associations[i].line[action]();
            }
            slate.safari();
        };

        _self.hideAll = function () {
            if (_self._.slate.isAlt && _self._.slate.isShift) _visibility("hide");
        };

        _self.hideOwn = function () {
            _underscore2.default.each(_self.associations, function (association) {
                association.line.hide();
            });
        };

        _self.showOwn = function () {
            _underscore2.default.each(_self.associations, function (association) {
                association.line.show();
            });
        };

        _self.showAll = function () {
            if (_isLastAlt && _isLastShift) _visibility("show");
        };

        _self.refresh = function (isAnimating) {
            var slate = _self._.slate.paper;
            for (var i = _self.associations.length; i--;) {
                var _pkg = _self.associations[i];
                _pkg.isAnimating = isAnimating || false;
                slate.connection(_pkg);
            }
            slate.safari();
        };

        var _over = function _over(e) {
            _self._.slate.options.viewPort.allowDrag = false;

            _self._.slate.keyboard && _self._.slate.keyboard.start(_self._);

            //close all open menus
            _self._.slate.nodes.closeAllMenus(_self._.options.id);
            if (!Session.get('elementIsBeingResized') || Session.get('elementIsBeingResized') === false) {
                if (_self._.menu && _underscore2.default.isFunction(_self._.menu.show) && _self._.options.allowMenu && !_self._.menu.isOpen()) {
                    _self._.menu.show();
                }
            }
            $s.stopEvent(e);
        };

        var _out = function _out(e) {
            if (_self._ && _self._.slate && _self._.slate.options) {
                _self._.slate.options.viewPort.allowDrag = true;
                _self._.slate.unglow();
                _self._.slate.keyboard && _self._.slate.keyboard.end();
            } else {
                console.log("missing options from ", _self);
            }
            $s.stopEvent(e);
        };

        var _dbl = function _dbl(e) {
            if (_self._.slate.options.enabled) {
                _self._.position('center', function () {
                    _self._.editor && _self._.editor.start();
                });
            }
            $s.stopEvent(e);
        };

        var v = [];
        _self.wireHoverEvents = function () {
            v = [];
            v.push({ o: _self._.vect, over: _over, out: _out, dbl: _dbl });
            v.push({ o: _self._.text, over: _over, out: _out, dbl: _dbl });
            if (_self._.options.id !== _self._.slate.tempNodeId) {
                _underscore2.default.each(v, function (vElem) {
                    vElem.o.mouseover(vElem.over);
                    vElem.o.mouseout(vElem.out);
                    vElem.o.dblclick(vElem.dbl);
                });
            }
        };

        _self.unwireHoverEvents = function () {
            _underscore2.default.each(v, function (vElem) {
                vElem.o.events && vElem.o.unmouseover(vElem.over); //_.indexOf(_.pluck(vElem.o.events, 'name'), "mouseover") > -1
                vElem.o.events && vElem.o.unmouseout(vElem.out);
                vElem.o.events && vElem.o.undblclick(vElem.dbl);
            });
        };

        _self.wireDragEvents = function () {
            _self._.vect.drag(move, dragger, up);
            _self._.text.mousedown(function (e) {
                _self._.vect.initDrag(e);
            });
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);
