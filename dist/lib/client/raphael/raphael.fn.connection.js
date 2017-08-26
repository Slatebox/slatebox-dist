"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Raphael.fn.connection = function (_options) {
  var options = {
    sb: Slatebox,
    parent: null,
    child: null,
    lineColor: "#fff",
    lineOpacity: 1,
    lineWidth: 20,
    blnStraight: false,
    showParentArrow: false,
    showChildArrow: false,
    isAnimating: false
  };
  _underscore2.default.extend(options, _options);

  //finds the closestPoint to an svg path (very good approximation); for alternatives look at gradSearch function (has 1 known bug) here https://codepen.io/mmazur/pen/OmqdZy?editors=0010
  function closestPoint(pathNode, point) {
    var pathLength = pathNode.getTotalLength(),
        precision = 64,
        //increase this value for better performance at a risk of worse point approximation; in future this should be scaled according to number of path segments (there could be a better solution)
    best,
        bestLength,
        bestDistance = Infinity;
    // linear scan for coarse approximation
    for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
      if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
        best = scan, bestLength = scanLength, bestDistance = scanDistance;
      }
    }

    // binary search for precise estimate
    precision /= 2;
    while (precision > 0.5) {
      var before, after, beforeLength, afterLength, beforeDistance, afterDistance;
      if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
        best = before, bestLength = beforeLength, bestDistance = beforeDistance;
      } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
        best = after, bestLength = afterLength, bestDistance = afterDistance;
      } else {
        precision /= 2;
      }
    }
    return { bestPoint: best, bestLength: bestLength };

    function distance2(p) {
      //squared distance between two points
      var dx = p.x - point.x,
          dy = p.y - point.y;
      return dx * dx + dy * dy;
    }
  }

  function calcPath() {
    var types = ["parent", "child"];
    var pathOriginNode;
    var pathEndNode;
    var pointOnParentPath;
    var childPathContext;
    var pointOnChildPath;
    var parentPathContext;
    var tempPath;
    if (options.isShift && options.isAlt && options.activeNode === options.child.options.id) {
      pathOriginNode = options.child;
      pathEndNode = options.parent;

      var midPoints = getCorrectMidPoints();

      var tempOriginNode = void 0;
      if (pathOriginNode.options.rotate.rotationAngle) {
        tempOriginNode = pathOriginNode.getTempPathWithCorrectPositionFor({
          pathElement: pathOriginNode.vect,
          dx: 0,
          dy: 0
        });
      }

      var tempEndNode = void 0;
      if (pathEndNode.options.rotate.rotationAngle) {
        tempEndNode = pathEndNode.getTempPathWithCorrectPositionFor({
          pathElement: pathEndNode.vect,
          dx: 0,
          dy: 0
        });
      }

      parentPathContext = closestPoint(tempEndNode || pathEndNode.vect, midPoints.child);
      pointOnParentPath = parentPathContext.bestPoint;

      childPathContext = closestPoint(tempOriginNode || pathOriginNode.vect, pointOnParentPath);
      pointOnChildPath = childPathContext.bestPoint;
      options.child.relationships.updateSingleAssociationWith({ id: options.id }, { parentPointLength: parentPathContext.bestLength, childPointLength: childPathContext.bestLength });

      tempOriginNode && tempOriginNode.remove();
      tempEndNode && tempEndNode.remove();
    } else if (options.isShift && !options.isAlt && (options.activeNode === options.parent.options.id || options.activeNode === options.child.options.id) || _underscore2.default.isUndefined(options.parentPointLength) || _underscore2.default.isUndefined(options.childPointLength) || !options.isShift && !options.isAlt && options.activeNode !== options.parent.options.id && options.activeNode !== options.child.options.id) {
      if (options.activeNode && (options.activeNode === options.parent.options.id || options.activeNode === options.child.options.id)) {
        _underscore2.default.each(types, function (type) {
          if (options[type].options.id === options.activeNode) {
            pathOriginNode = options[type];
          } else {
            pathEndNode = options[type];
          }
        });
      } else {
        var relevantAssociation = checkIfNodeIsAssociatedWith(options.child, options.activeNode);
        if (options.childHasMultipleParents && (!relevantAssociation || relevantAssociation.parent.options.id !== options.child.options.id)) {
          pathOriginNode = options.child;
          pathEndNode = options.parent;
        } else {
          pathOriginNode = options.parent;
          pathEndNode = options.child;
        }
      }

      var middlePoints = getCorrectMidPoints();

      if (options.activeNode && options.activeNode !== options.child.options.id && options.activeNode !== options.parent.options.id && checkIfHasParentFor(pathEndNode, options.activeNode)) {
        tempPath = pathEndNode.getTempPathWithCorrectPositionFor({
          pathElement: pathEndNode.vect,
          dx: options.currentDx,
          dy: options.currentDy
        });

        childPathContext = closestPoint(tempPath, middlePoints.parent);
        pointOnChildPath = childPathContext.bestPoint;
        tempPath.remove();
      } else {
        var endTempNode = void 0;
        if (pathEndNode.options.rotate.rotationAngle) {
          endTempNode = pathEndNode.getTempPathWithCorrectPositionFor({
            pathElement: pathEndNode.vect,
            dx: 0,
            dy: 0
          });
        }

        childPathContext = closestPoint(endTempNode || pathEndNode.vect, pathOriginNode.options.id === options.parent.options.id ? middlePoints.parent : middlePoints.child);
        pointOnChildPath = childPathContext.bestPoint;

        endTempNode && endTempNode.remove();
      }

      tempPath = pathOriginNode.getTempPathWithCorrectPositionFor({
        pathElement: pathOriginNode.vect,
        dx: options.currentDx,
        dy: options.currentDy
      });

      parentPathContext = closestPoint(tempPath, pointOnChildPath);
      pointOnParentPath = parentPathContext.bestPoint;

      if (options.childHasMultipleParents) {
        options.childPointLength = parentPathContext.bestLength;
        options.parentPointLength = childPathContext.bestLength;
      } else {
        options.childPointLength = childPathContext.bestLength;
        options.parentPointLength = parentPathContext.bestLength;
      }

      //propagate pointLengths to relevant association
      if (options.child.options.id === pathEndNode.options.id) {
        options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childPointLength: childPathContext.bestLength, parentPointLength: parentPathContext.bestLength });
      } else {
        options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childPointLength: parentPathContext.bestLength, parentPointLength: childPathContext.bestLength });
      }
    } else if (options.isShift && options.isAlt) {
      pathOriginNode = options.parent;
      pathEndNode = options.child;
      if (options.activeNode === options.parent.options.id) {
        if (!(options.isUp && (options.childHasMultipleParents || options.childPositionSaved))) {
          var newMoveVector = pathEndNode.rotateMoveVector({ dx: options.currentDx, dy: options.currentDy });
          var opts = {
            action: "translate",
            dx: newMoveVector.dx,
            dy: newMoveVector.dy
          };
          var transformString = pathEndNode.getTransformString(opts);
          // pathEndNode.vect.transform("T" + (options.currentDx) + "," + (options.currentDy));
          pathEndNode.vect.transform(transformString);

          tempPath = pathOriginNode.getTempPathWithCorrectPositionFor({
            pathElement: pathOriginNode.vect,
            dx: options.currentDx,
            dy: options.currentDy
          });

          pointOnParentPath = tempPath.getPointAtLength(options.parentPointLength);
          tempPath.remove();

          tempPath = pathEndNode.getTempPathWithCorrectPositionFor({
            pathElement: pathEndNode.vect,
            dx: options.currentDx,
            dy: options.currentDy
          });
          var bb = tempPath.getBBox();
          options.child.setPosition({ x: bb.x, y: bb.y }, false, options.activeNode, { transformString: options.child.vect.transform() });

          pointOnChildPath = tempPath.getPointAtLength(options.childPointLength);
        } else {
          var _tempOriginNode = void 0;
          if (pathOriginNode.options.rotate.rotationAngle) {
            _tempOriginNode = pathOriginNode.getTempPathWithCorrectPositionFor({
              pathElement: pathOriginNode.vect,
              dx: 0,
              dy: 0
            });
          }

          var _tempEndNode = void 0;
          if (pathEndNode.options.rotate.rotationAngle) {
            _tempEndNode = pathEndNode.getTempPathWithCorrectPositionFor({
              pathElement: pathEndNode.vect,
              dx: 0,
              dy: 0
            });
          }
          // pointOnParentPath = (tempOriginNode || pathOriginNode.vect).getPointAtLength(options.parentPointLength);
          // pointOnChildPath = (tempEndNode || pathEndNode.vect).getPointAtLength(options.childPointLength);

          var _midPoints = getCorrectMidPoints();
          parentPathContext = closestPoint(_tempOriginNode || pathOriginNode.vect, _midPoints.child);
          pointOnParentPath = parentPathContext.bestPoint;
          options.parentPointLength = parentPathContext.bestLength;

          childPathContext = closestPoint(_tempEndNode || pathEndNode.vect, _midPoints.parent);
          pointOnChildPath = childPathContext.bestPoint;
          options.childPointLength = childPathContext.bestLength;

          _tempOriginNode && _tempOriginNode.remove();
          _tempEndNode && _tempEndNode.remove();
        }
        //propagate position changes to all nodes
        if (!options.isUp) {
          pathEndNode.relationships.syncAssociations(pathEndNode, function (c, a) {
            c.relationships.updateAssociationsWith({
              activeNode: a.activeNode,
              currentDx: options.currentDx,
              currentDy: options.currentDy
            });
            c.relationships.refresh();
          });
        }
      } else {
        if (!(options.isUp && (options.childHasMultipleParents || options.childPositionSaved))) {
          var _newMoveVector = pathEndNode.rotateMoveVector({ dx: options.currentDx, dy: options.currentDy });
          var _opts = {
            action: "translate",
            dx: _newMoveVector.dx,
            dy: _newMoveVector.dy
          };
          var _transformString = pathEndNode.getTransformString(_opts);
          // pathEndNode.vect.transform("T" + (options.currentDx) + "," + (options.currentDy));
          pathEndNode.vect.transform(_transformString);
        }

        if (!options.childHasMultipleParents && !options.childPositionSaved) {
          tempPath = pathOriginNode.getTempPathWithCorrectPositionFor({
            pathElement: pathOriginNode.vect,
            dx: 0,
            dy: 0
          });

          var _midPoints2 = getCorrectMidPoints();
          parentPathContext = closestPoint(tempPath || pathOriginNode.vect, _midPoints2.child);
          pointOnParentPath = parentPathContext.bestPoint;
          options.parentPointLength = parentPathContext.bestLength;

          // pointOnParentPath = tempPath.getPointAtLength(options.parentPointLength);
          tempPath.remove();

          tempPath = pathEndNode.getTempPathWithCorrectPositionFor({
            pathElement: pathEndNode.vect,
            dx: options.currentDx,
            dy: options.currentDy
          });
          var _bb = tempPath.getBBox();
          options.child.setPosition({ x: _bb.x, y: _bb.y }, false, options.activeNode, { transformString: options.child.vect.transform() });

          // pointOnChildPath = tempPath.getPointAtLength(options.childPointLength);
          childPathContext = closestPoint(tempPath || pathEndNode.vect, _midPoints2.parent);
          pointOnChildPath = childPathContext.bestPoint;
          options.childPointLength = childPathContext.bestLength;
        } else {
          var _midPoints3 = getCorrectMidPoints();

          var _tempOriginNode2 = void 0;
          if (pathOriginNode.options.rotate.rotationAngle) {
            _tempOriginNode2 = pathOriginNode.getTempPathWithCorrectPositionFor({
              pathElement: pathOriginNode.vect,
              dx: 0,
              dy: 0
            });
          }

          var _tempEndNode2 = void 0;
          if (pathEndNode.options.rotate.rotationAngle) {
            _tempEndNode2 = pathEndNode.getTempPathWithCorrectPositionFor({
              pathElement: pathEndNode.vect,
              dx: 0,
              dy: 0
            });
          }

          childPathContext = closestPoint(_tempEndNode2 || pathEndNode.vect, _midPoints3.parent);
          pointOnChildPath = childPathContext.bestPoint;
          options.childPointLength = childPathContext.bestLength;

          parentPathContext = closestPoint(_tempOriginNode2 || pathOriginNode.vect, pointOnChildPath);
          pointOnParentPath = parentPathContext.bestPoint;
          options.parentPointLength = parentPathContext.bestLength;

          _tempOriginNode2 && _tempOriginNode2.remove();
          _tempEndNode2 && _tempEndNode2.remove();

          //propagate pointLengths to relevant association
          if (options.child.options.id === pathEndNode.options.id) {
            options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childPointLength: childPathContext.bestLength, parentPointLength: parentPathContext.bestLength });
          } else {
            options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childPointLength: parentPathContext.bestLength, parentPointLength: childPathContext.bestLength });
          }
        }
      }
    } else {
      pathOriginNode = options.parent;
      pathEndNode = options.child;
      if (options.child.options.id === options.activeNode) {

        var _midPoints4 = getCorrectMidPoints();
        var originTempPath = void 0;
        if (options.parent.options.rotate.rotationAngle) {
          originTempPath = pathOriginNode.getTempPathWithCorrectPositionFor({
            pathElement: pathOriginNode.vect,
            dx: 0,
            dy: 0
          });
        }

        parentPathContext = closestPoint(originTempPath || pathOriginNode.vect, _midPoints4.child);
        pointOnParentPath = parentPathContext.bestPoint;
        options.parentPointLength = parentPathContext.bestLength;

        originTempPath && originTempPath.remove();

        tempPath = pathEndNode.getTempPathWithCorrectPositionFor({
          pathElement: pathEndNode.vect,
          dx: options.currentDx,
          dy: options.currentDy
        });

        childPathContext = closestPoint(tempPath, pointOnParentPath);
        pointOnChildPath = childPathContext.bestPoint;
        options.childPointLength = childPathContext.bestLength;
        options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childPointLength: childPathContext.bestLength, parentPointLength: parentPathContext.bestLength });
      } else if (options.parent.options.id === options.activeNode) {
        tempPath = pathOriginNode.getTempPathWithCorrectPositionFor({
          pathElement: pathOriginNode.vect,
          dx: options.currentDx,
          dy: options.currentDy
        });

        if (options.action === "rotate") {
          var _midPoints5 = getCorrectMidPoints();

          parentPathContext = closestPoint(tempPath, _midPoints5.child);
          pointOnParentPath = parentPathContext.bestPoint;
          options.parentPointLength = parentPathContext.bestLength;
        } else {
          // pointOnParentPath = tempPath.getPointAtLength(options.parentPointLength);
          var _midPoints6 = getCorrectMidPoints();

          parentPathContext = closestPoint(tempPath, _midPoints6.child);
          pointOnParentPath = parentPathContext.bestPoint;
          options.parentPointLength = parentPathContext.bestLength;
        }
        tempPath.remove();

        if (!(options.isUp && options.childHasMultipleParents)) {
          if (!options.isAnimating) {
            var _newMoveVector2 = pathEndNode.rotateMoveVector({ dx: options.currentDx, dy: options.currentDy });
            var _opts2 = {
              action: "translate",
              dx: _newMoveVector2.dx,
              dy: _newMoveVector2.dy
            };
            var _transformString2 = pathEndNode.getTransformString(_opts2);
            // pathEndNode.vect.transform("T" + (options.currentDx) + "," + (options.currentDy));
            pathEndNode.vect.transform(_transformString2);
          } else if (!options.childIsBeingAnimated) {
            pathEndNode.vect.animate({ transform: "T" + options.currentDx + "," + options.currentDy }, Meteor.collabAnimationDuration || 300, '>', function () {
              options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childIsBeingAnimated: false });
            });
            options.child.relationships.updateSingleAssociationWith({ id: options.id }, { childIsBeingAnimated: true });
          }
        }

        tempPath = pathEndNode.getTempPathWithCorrectPositionFor({
          pathElement: pathEndNode.vect,
          dx: options.currentDx,
          dy: options.currentDy
        });
        var _bb2 = tempPath.getBBox();
        options.child.setPosition({ x: _bb2.x, y: _bb2.y }, false, options.activeNode, { transformString: options.child.vect.transform() });

        pointOnChildPath = tempPath.getPointAtLength(options.childPointLength);
      } else {
        var _childPointLength, _parentPointLength;
        var _relevantAssociation = checkIfNodeIsAssociatedWith(options.child, options.activeNode);
        //swap nodes because child has a "parent" role in this case
        if (options.childHasMultipleParents && (!_relevantAssociation || _relevantAssociation.parent.options.id !== options.child.options.id)) {
          pathOriginNode = options.child;
          pathEndNode = options.parent;
          _childPointLength = options.parentPointLength;
          _parentPointLength = options.childPointLength;
        }
        if (options.parent.options.id === pathEndNode.options.id && checkIfHasParentFor(pathEndNode, options.activeNode)) {
          //end node is a parent and will move
          tempPath = pathEndNode.getTempPathWithCorrectPositionFor({
            pathElement: pathEndNode.vect,
            dx: options.currentDx,
            dy: options.currentDy
          });
          pointOnChildPath = tempPath.getPointAtLength(_childPointLength || options.childPointLength);
          tempPath.remove();
        } else {
          pointOnChildPath = pathEndNode.vect.getPointAtLength(!_underscore2.default.isUndefined(_childPointLength) ? _childPointLength : options.childPointLength);
        }

        tempPath = pathOriginNode.getTempPathWithCorrectPositionFor({
          pathElement: pathOriginNode.vect,
          dx: options.currentDx,
          dy: options.currentDy
        });
        pointOnParentPath = tempPath.getPointAtLength(!_underscore2.default.isUndefined(_parentPointLength) ? _parentPointLength : options.parentPointLength);
      }
    }

    tempPath && tempPath.remove();
    var path = getHorizontalCurve(pointOnParentPath, pointOnChildPath);
    return {
      path: path
    };
  }

  //returns a horizontally curved line
  function getHorizontalCurve(originPoint, endPoint) {
    var x1 = originPoint.x,
        y1 = originPoint.y,
        x2 = endPoint.x,
        y2 = endPoint.y;

    var middlePointX = (x1 + x2) / 2;
    return ['M', x1, y1, 'C', middlePointX, y1, middlePointX, y2, x2, y2].join(" ");
  }

  //returns a vertically curved line
  function getVerticalCurve(originPoint, endPoint) {
    var x1 = originPoint.x,
        y1 = originPoint.y,
        x2 = endPoint.x,
        y2 = endPoint.y;

    var middlePointY = (y1 + y2) / 2;
    return ['M', x1, y1, 'C', x1, middlePointY, x2, middlePointY, x2, y2].join(" ");
  }

  //check if passed in node will move or not based on its relation to the active node (node being dragged)
  function checkIfHasParentFor(node, activeNodeId) {
    var relevantAssociation = _underscore2.default.find(node.relationships.associations, function (association) {
      return association.child.options.id === activeNodeId || association.parent.options.id === activeNodeId;
    });
    return relevantAssociation && relevantAssociation.parent.options.id === activeNodeId; //if active node is a parent of the passed in node then the node will move
  }

  function checkIfNodeIsAssociatedWith(currentNode, nodeOfInterestId) {
    var relevantAssociation = _underscore2.default.find(currentNode.relationships.associations, function (association) {
      return association.child.options.id === nodeOfInterestId || association.parent.options.id === nodeOfInterestId;
    });
    return relevantAssociation || false;
  }

  function _in(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  }

  //returns a path between middle points of a bbox. Keep this for now in case we decide to upgrade the current pathing
  function getCorrectMidPoints() {
    var originBB = options.parent.vect.getBBox(),
        endBB = options.child.vect.getBBox();

    var _px = _in(originBB.x) && originBB.x,
        _pcx = _in(originBB.cx) && originBB.cx,
        _py = _in(originBB.y) && originBB.y,
        _pcy = _in(originBB.cy) && originBB.cy,
        _cx = _in(endBB.x) && endBB.x,
        _ccx = _in(endBB.cx) && endBB.cx,
        _cy = _in(endBB.y) && endBB.y,
        _ccy = _in(endBB.cy) && endBB.cy;

    var relevantParentMiddlePoint;

    var _px1 = originBB.x,
        _py1 = originBB.y,
        _px2 = originBB.x2,
        _py2 = originBB.y,
        _px3 = originBB.x2,
        _py3 = originBB.y2,
        _px4 = originBB.x,
        _py4 = originBB.y2;

    /*
      generic line equation
      y = ((y2-y1)/(x2-x1)) * (x-x1) + y1
        line 1: line passing through upper left corner and bottom right corner
      y = ((_py3 - _py1)/(_px3 - _px1)) * (x - _px1) + _py1
        line 2: line passing through bottom left corner and upper right corner
      y = ((_py2 - _py4)/(_px2 - _px4)) * (x - _px4) + _py4
     */

    //NOTE: comments below apply to a Cartesian coordinate system; the svg coordinate system is slightly different with (0,0) in upper left corner of the plane
    //it means that regular above means below here
    if (_ccy >= (_py3 - _py1) / (_px3 - _px1) * (_ccx - _px1) + _py1) {
      //means that child center point is above line 1
      if (_ccy >= (_py2 - _py4) / (_px2 - _px4) * (_ccx - _px4) + _py4) {
        //means that child center point is above line 2
        relevantParentMiddlePoint = { x: _pcx, y: _py3 };
      } else {
        //means that child center point is either below line 2 or is on line 2
        relevantParentMiddlePoint = { x: _px1, y: _pcy };
      }
    } else {
      //means that child center point is below line 1
      if (_ccy >= (_py2 - _py4) / (_px2 - _px4) * (_ccx - _px4) + _py4) {
        //means that child center point is above line 2
        relevantParentMiddlePoint = { x: _px2, y: _pcy };
      } else {
        //means that child center point is either below line 2 or is on line 2
        relevantParentMiddlePoint = { x: _pcx, y: _py1 };
      }
    }

    var relevantChildMiddlePoint;

    var _cx1 = endBB.x,
        _cy1 = endBB.y,
        _cx2 = endBB.x2,
        _cy2 = endBB.y,
        _cx3 = endBB.x2,
        _cy3 = endBB.y2,
        _cx4 = endBB.x,
        _cy4 = endBB.y2;

    /*
     generic line equation
     y = ((y2-y1)/(x2-x1)) * (x-x1) + y1
       line 1: line passing through upper left corner and bottom right corner
     y = ((_cy3 - _cy1)/(_cx3 - _cx1)) * (x - _cx1) + _cy1
       line 2: line passing through bottom left corner and upper right corner
     y = ((_cy2 - _cy4)/(_cx2 - _cx4)) * (x - _cx4) + _cy4
     */

    //NOTE: comments below apply to a Cartesian coordinate system; the svg coordinate system is slightly different with (0,0) in upper left corner of the plane
    //it means that regular above means below here
    if (_pcy >= (_cy3 - _cy1) / (_cx3 - _cx1) * (_pcx - _cx1) + _cy1) {
      //means that child center point is above line 1
      if (_pcy >= (_cy2 - _cy4) / (_cx2 - _cx4) * (_pcx - _cx4) + _cy4) {
        //means that child center point is above line 2
        relevantChildMiddlePoint = { x: _ccx, y: _cy3 };
      } else {
        //means that child center point is either below line 2 or is on line 2
        relevantChildMiddlePoint = { x: _cx1, y: _ccy };
      }
    } else {
      //means that child center point is below line 1
      if (_pcy >= (_cy2 - _cy4) / (_cx2 - _cx4) * (_pcx - _cx4) + _cy4) {
        //means that child center point is above line 2
        relevantChildMiddlePoint = { x: _cx2, y: _ccy };
      } else {
        //means that child center point is either below line 2 or is on line 2
        relevantChildMiddlePoint = { x: _ccx, y: _cy1 };
      }
    }

    return {
      child: relevantChildMiddlePoint,
      parent: relevantParentMiddlePoint
    };
  };

  this.removeConnection = function (options) {
    options.line.remove();
  };

  var details = calcPath(),
      _attr = { stroke: options.lineColor, fill: "none", "stroke-width": options.lineWidth, "fill-opacity": options.lineOpacity, opacity: options.lineOpacity };
  //stop connection re-draws when shift+alt drag until the move is up because the lines are hidden anyways
  if (!(options.isAlt && options.isShift) || options.isAlt && options.isShift && options.isUp) {
    _attr.path = details.path;
  }

  if (options.showChildArrow) {
    _underscore2.default.extend(_attr, { "arrow-end": "classic" });
  } else {
    _underscore2.default.extend(_attr, { "arrow-end": "none" });
  }

  if (options.showParentArrow) {
    _underscore2.default.extend(_attr, { "arrow-start": "classic" });
  } else {
    _underscore2.default.extend(_attr, { "arrow-start": "none" });
  }

  if (options.line === undefined) {
    _underscore2.default.extend(options, {
      line: this.path(details.path).attr(_attr)
    });
  } else if (!(options.isAlt && options.isShift) || options.isAlt && options.isShift && options.isUp) {
    if (!options.isAnimating) {
      // for some reason updating an existing line with new attributes like so: options.line.attr(_attr); doesn't always work
      // removing the old line and drawing a new line with new attributes will ensure that the line is always updated
      options.line.remove();
      var _newLine = options.child.slate.paper.path(details.path).attr(_attr);
      options.child.relationships.updateSingleAssociationWith({ id: options.id }, { line: _newLine });
    } else if (!options.isBeingAnimated) {
      options.parent.relationships.updateSingleAssociationWith({ id: options.id }, { isBeingAnimated: true });

      options.line.animate({ path: _attr.path }, Meteor.collabAnimationDuration || 300, '>', function () {
        options.parent.relationships.updateSingleAssociationWith({ id: options.id }, { isBeingAnimated: false, isAnimating: false });
      });
    }
  }
  options.line && options.line.toBack(); //make sure that lines don't show in front of nodes

  return options;
};
