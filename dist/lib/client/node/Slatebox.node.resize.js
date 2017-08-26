"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
  $n.fn._resize = function () {
    var _self = this,
        resize,
        resizeTemp;

    _self.show = function (x, y) {
      if (_self._.options.allowResize) {
        resizeTemp && resizeTemp.remove();
        var r = _self._.slate.paper;
        // resize = r.resize("/packages/slatebox/lib/client/images/2_lines.png").transform(["t", x - 5, ",", y - 5].join()).attr({ fill: "#fff", "stroke": "#000" });
        resize = r.resize("/packages/slatebox/lib/client/images/2_lines.png").attr({ fill: "#fff", "stroke": "#000", x: x - 5, y: y - 5 });
        resizeTemp = r.rect(x - 6, y - 6, resize.attr("width"), resize.attr("height")).attr({ fill: "#f00", opacity: 0.00000001 }).toFront();
        resize.mouseover(function (e) {
          resize.attr({ cursor: 'nw-resize' });
        });

        resizeTemp.mouseover(function (e) {
          resizeTemp.attr({ cursor: 'nw-resize' });
        });

        resizeTemp.drag(move, start, up);
        // resize.drag(move, start, up);

        return resize;
      }
    };

    _self.hide = function (r) {
      resizeTemp && resizeTemp.remove();
      resize && resize.remove();
    };

    var origX, origY;
    var lastDx = 0;
    var lastDy = 0;
    var _minWidth = 10,
        _minHeight = 10,
        _dragAllowed = false,
        _origWidth,
        _origHeight,
        _isResizing = false;
    var origPath;
    var start = function start() {
      origPath = _self._.options.vectorPath;
      origX = resizeTemp.attr("x");
      origY = resizeTemp.attr("y");
      //create a huge dragging area in order to prevent mouse from losing focus on the correct element
      resizeTemp.attr({ x: resizeTemp.attr("x") - 1000, y: resizeTemp.attr("y") - 1000, width: 10000, height: 10000 });

      Session.set('elementIsBeingResized', true);

      _self._.relationships.updateAssociationsWith({
        activeNode: _self._.options.id,
        currentDx: 0,
        currentDy: 0,
        action: "resize"
      });

      resize.ox = resize.attr("x");
      resize.oy = resize.attr("y");

      _isResizing = true;
      var s = this;
      _self._.slate.multiselection && _self._.slate.multiselection.end();
      s.ox = s.attr("x");
      s.oy = s.attr("y");

      _self._.setStartDrag();
      _self._.connectors.remove();

      _dragAllowed = _self._.slate.options.viewPort.allowDrag;
      _self._.slate.disable(false, true);

      if (_self._.options.text !== " ") {
        var mm = _self._.text.getBBox();
        _minWidth = mm.width + 10 > 50 ? mm.width + 10 : 50;
        _minHeight = mm.height + 10 > 50 ? mm.height + 10 : 50;
      }

      _origWidth = _self._.options.width;
      _origHeight = _self._.options.height;

      //scale minHeight and minWidth to preserve the current aspect ratio
      if (_self._.options.rotate.rotationAngle) {
        var heightRatio = _minHeight / _origHeight;
        var widthRatio = _minWidth / _origWidth;

        if (Math.abs(widthRatio - 1) < Math.abs(heightRatio - 1)) {
          _minHeight = _origHeight * widthRatio;
        } else if (Math.abs(widthRatio - 1) > Math.abs(heightRatio - 1)) {
          _minWidth = _origWidth * heightRatio;
        }
      }
    },
        move = function move(dx, dy) {
      var bb = _self._.vect.getBBox();
      var _zr = _self._.slate.options.viewPort.zoom.r;
      dx = dx + (dx / _zr - dx);
      dy = dy + (dy / _zr - dy);

      var _transWidth = _origWidth + dx;
      var _transHeight = _origHeight + dy;

      if (_self._.options.rotate.rotationAngle) {
        //preserve the height/width ratio for rotated nodes

        var heightRatio = _transHeight / _origHeight;
        var widthRatio = _transWidth / _origWidth;

        if (Math.abs(widthRatio - 1) < Math.abs(heightRatio - 1)) {
          //scale _transHeight and dy
          _transHeight = _origHeight * widthRatio;
          dy = _transHeight - _origHeight;
        } else if (Math.abs(widthRatio - 1) > Math.abs(heightRatio - 1)) {
          //scale _transWidth and dx
          _transWidth = _origWidth * heightRatio;
          dx = _transWidth - _origWidth;
        }
      }

      if (_transWidth > _minWidth) {
        this.attr({ x: this.ox + dx });
        resize.attr({ x: resize.ox + dx });
      } else {
        this.attr({ x: this.ox });
      }

      if (_transHeight > _minHeight) {
        this.attr({ y: this.oy + dy });
        resize.attr({ y: resize.oy + dy });
      } else {
        this.attr({ y: this.oy });
      }

      if (_self._.events && _underscore2.default.isFunction(_self._.events.onResizing)) {
        _self._.events.onResizing.apply(this, [_transWidth, _transHeight]);
      }
      _self.set(_transWidth, _transHeight);

      lastDx = dx;
      lastDy = dy;
    },
        up = function up() {
      var _self$_$options = _self._.options,
          image = _self$_$options.image,
          imageOrigHeight = _self$_$options.imageOrigHeight,
          imageOrigWidth = _self$_$options.imageOrigWidth;

      if (image && !!imageOrigHeight && !!imageOrigWidth) {
        _self.nodeSizeCorrection();
      }

      resizeTemp.attr({ x: origX + lastDx, y: origY + lastDy, width: resize.attr("width"), height: resize.attr("height") });

      Session.set('elementIsBeingResized', false);
      _isResizing = false;
      _self._.slate.enable(false, true);
      resize.remove();
      resizeTemp.remove();
      _self._.setEndDrag();
      //_self._.relationships.wireHoverEvents();

      if (_self._.events && _underscore2.default.isFunction(_self._.events.onResized)) {
        _self._.events.onResized.apply(this, [_self.send]);
      } else {
        _self.send();
      }
    };

    //refines node size if has image fill
    _self.nodeSizeCorrection = function () {
      var useMainCanvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _self._.vect.transform("");
      var bb = _self._.vect.getBBox();
      var imgHeightScalar = _self._.options.imageOrigHeight / bb.height;
      var imgWidthScalar = _self._.options.imageOrigWidth / bb.width;

      //rotation affects fill scaling because it scales to bbox size instead of node size
      // const tempPath = _self._.slate.paper.path(_self._.vect.attr("path").toString()).attr({opacity: 0});
      // const tempPathTS = `R${-_self._.options.rotationAngle}, ${bb.cx}, ${bb.cy}`;
      // const newTempPathStr = Raphael.transformPath(_self._.vect.attr("path").toString(), tempPathTS).toString();
      // tempPath.attr({path: newTempPathStr});
      // let relevantBB = tempPath.getBBox();

      var xScale = 1;
      var yScale = 1;
      //NOTE: in the if's below, width and height are supposed to be mixed together
      if (_self._.options.imageOrigHeight / imgWidthScalar > bb.height) {
        xScale = bb.height / bb.width;
      }

      if (_self._.options.imageOrigWidth / imgHeightScalar > bb.width) {
        yScale = bb.width / bb.height;
      }

      var imgOrigRatio = _self._.options.imageOrigWidth / _self._.options.imageOrigHeight;
      var currentBBRatio = bb.width / bb.height;
      if (currentBBRatio < imgOrigRatio) {
        yScale = 1 / imgOrigRatio * bb.width / bb.height;
        if (bb.height * yScale < _minHeight) {
          yScale = _minHeight / bb.height;
        }
      } else if (currentBBRatio > imgOrigRatio) {
        xScale = imgOrigRatio * bb.height / bb.width;
        if (bb.width * xScale < _minWidth) {
          xScale = _minWidth / bb.width;
        }
      }

      var scaleTransform = "s" + xScale + "," + yScale + "," + bb.x + ", " + bb.y;
      var scaledPath = Raphael.transformPath(_self._.vect.attr("path").toString(), scaleTransform);
      _self._.vect.attr({ path: scaledPath });
      bb = _self._.vect.getBBox();

      if (_self._.vect.pattern) {
        $(_self._.vect.pattern).find("image").css("height", bb.height);
        $(_self._.vect.pattern).find("image").css("width", bb.width);
        _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("height", bb.height);
        _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("width", bb.width);

        // _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("transform", `rotate(${_self._.options.rotationAngle}, ${bb.width / 2 + _self._.options.rotationDx}, ${bb.height / 2 + _self._.options.rotationDy})translate(${_self._.options.rotationDx},${_self._.options.rotationDy})`);
      }

      //update positions of text (if any) and menu icons
      _self._.setPosition({ x: bb.x, y: bb.y });
      _self._.relationships.refresh();

      var opts = {};
      if (useMainCanvas) {
        var tempPath = Meteor.currentSlate.paper.path(scaledPath);
        opts.boundingClientRect = tempPath[0].getBoundingClientRect();
        tempPath.remove();
      }

      _self._.rotate.applyImageRotation(opts);
      bb = _self._.vect.getBBox();
      _self._.options.width = bb.width;
      _self._.options.height = bb.height;
      _self._.options.imageOrigHeight = bb.height;
      _self._.options.imageOrigWidth = bb.width;
    };

    _self.send = function () {
      //broadcast change to birdseye and collaborators
      var pkg = { type: 'onNodeResized', data: {
          id: _self._.options.id,
          height: _self._.options.height,
          width: _self._.options.width,
          imageOrigWidth: _self._.options.imageOrigWidth,
          imageOrigHeight: _self._.options.imageOrigHeight
        } };
      var currentRotationPoint = _underscore2.default.clone(_self._.options.rotate.point);
      _self._.slate.birdseye && _self._.slate.birdseye.nodeChanged(pkg);
      _self._.options.rotate.point = currentRotationPoint;
      _self._.slate.collab && _self._.slate.collab.send(pkg);
    };

    _self.lazySend = _underscore2.default.throttle(_self.send, 700);

    // _self.set = function (width, height, dur, easing, callback) {
    //   _self._.vect.transform("");
    //     var tatt = {}, latt = {}, bb = _self._.vect.getBBox();
    //   // const tempPath = _self._.slate.paper.path(_self._.vect.attr("path").toString()).attr({opacity: 0});
    //   const tempPath = _self._.slate.paper.path(origPath);
    //   // tempPath.transform("");
    //   const tempPathTS = `R${_self._.options.rotate.rotationAngle}, ${_self._.options.rotate.point.x}, ${_self._.options.rotate.point.y}`;
    //   const newTempPathStr = Raphael.transformPath(_self._.vect.attr("path").toString(), tempPathTS).toString();
    //   tempPath.attr({path: newTempPathStr});
    //   let widthScalarTmp = 1, heightScalarTmp = 1;
    //   let relevantBB = tempPath.getBBox();
    //     if (!dur) dur = 0;
    //     var widthScalar = 1;
    //     var heightScalar = 1;
    //   let keepAspectRatio = false;
    //
    //     if (width > _minWidth) {
    //       widthScalar = width / bb.width;
    //       widthScalarTmp = width / relevantBB.width;
    //
    //       var tx = bb.x + (width / 2), lx = bb.x - 5;
    //
    //       if (dur === 0) {
    //         _self._.text.attr({x: tx});
    //       } else {
    //         tatt = {x: tx};
    //         latt = {x: lx};
    //       }
    //
    //       _self._.options.width = width;
    //
    //     } else {
    //       keepAspectRatio = true;
    //       widthScalar = _minWidth / bb.width;
    //       _self._.options.width = _minWidth;
    //     }
    //
    //     if (!_self._.options.rotate.rotationAngle || (_self._.options.rotate.rotationAngle && !keepAspectRatio)) {
    //       if (height > _minHeight) {
    //         heightScalar = height / bb.height;
    //         heightScalarTmp = height / relevantBB.height;
    //         var ty = bb.y + (height / 2);
    //
    //         if (dur === 0) {
    //           _self._.text.attr({y: ty});
    //         } else {
    //           _.extend(tatt, {y: ty});
    //           _.extend(latt, {y: ty});
    //         }
    //
    //         _self._.options.height = height;
    //       } else {
    //         heightScalar = _minHeight / bb.height;
    //         _self._.options.height = _minHeight;
    //       }
    //     }
    //
    //   if (_self._.options.rotate.rotationAngle && Math.abs(_self._.options.width/_self._.options.height - _origWidth/_origHeight) > 0.01) {
    //     widthScalar = 1;
    //     heightScalar = 1;
    //   }
    //
    //     //rotation affects fill scaling because it scales to bbox size instead of node size
    //     // const tempPath = _self._.slate.paper.path(_self._.vect.attr("path").toString()).attr({opacity: 0});
    //     tempPath.transform("");
    //     // const tempPathTS = `R${-_self._.options.rotationAngle}, ${bb.cx}, ${bb.cy}`;
    //     // const newTempPathStr = Raphael.transformPath(_self._.vect.attr("path").toString(), tempPathTS).toString();
    //     // tempPath.attr({path: newTempPathStr});
    //     // const relevantBB = tempPath.getBBox();
    //
    //     //scale image if any and correct scalars to fit the image perfectly (or should I do it in up)?
    //     $(_self._.vect.pattern).find("image").css("height", relevantBB.height);
    //     $(_self._.vect.pattern).find("image").css("width", relevantBB.width);
    //
    //     const totalLengthBeforeUpdatingDimensions = _self._.vect.getTotalLength();
    //
    //
    //     const transformStringTMP = `s${widthScalarTmp},${heightScalarTmp},${relevantBB.x}, ${relevantBB.y}`;
    //     const transformString = `s${widthScalar},${heightScalar},${bb.x}, ${bb.y}`;
    //     const newPathString = Raphael.transformPath(_self._.vect.attr("path").toString(), transformString).toString();
    //     _self._.options.vectorPath = newPathString;
    //
    //   const newPathStringTMP = Raphael.transformPath(tempPath.attr("path").toString(), transformStringTMP).toString();
    //   tempPath.attr({path: newPathStringTMP});
    //   relevantBB = tempPath.getBBox();
    //   var b = Meteor.currentSlate.paper.circle(relevantBB.cx, relevantBB.cy, 5);
    //
    //
    //   if (dur > 0) {
    //         _self._.text.animate(tatt, dur);
    //         _self._.link.hide();
    //
    //         var onAnimate = function () {
    //             if (_self._.slate) _self._.relationships.refresh();
    //         };
    //
    //         eve.on("raphael.anim.frame.*", onAnimate);
    //         // _self._.vect.animate({path: _self._.options.vectorPath}, dur, easing, function () {
    //         _self._.vect.animate({transform: transformString}, dur, easing, function () {
    //           _self._.vect.transform("");
    //           _self._.vect.attr({path: newPathString, "stroke-width": _self._.vect.attr("stroke-width")});
    //           bb = _self._.vect.getBBox();
    //           if (_self._.vect.pattern) {
    //             var fillWidth = _self._.options.imageOrigWidth;
    //             var fillHeight = _self._.options.imageOrigHeight;
    //             $(_self._.vect.pattern).find("image").css("height", fillHeight);
    //             $(_self._.vect.pattern).find("image").css("width", fillWidth);
    //             _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("height", fillHeight);
    //             _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("width", fillWidth);
    //             _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("transform", `rotate(${_self._.options.rotationAngle}, ${fillWidth / 2 + _self._.options.rotationDx}, ${fillHeight / 2 + _self._.options.rotationDy})translate(${_self._.options.rotationDx},${_self._.options.rotationDy})`);
    //           }
    //             //TODO find a way to animate pathLenghts -- see 'else' below for more details
    //             var lc = _self._.linkCoords();
    //             _self._.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());
    //             if (_self._.options.link.show) _self._.link.show();
    //             _self._.relationships.refresh();
    //             eve.unbind("raphael.anim.frame.*", onAnimate);
    //             callback && callback.apply(this, [_self._]);
    //         });
    //
    //     } else {
    //       _self._.vect.attr({path: _self._.options.vectorPath});
    //       bb = _self._.vect.getBBox();
    //       _.extend(_self._.options.rotate.point, {x: relevantBB.cx, y: relevantBB.cy});
    //       // _self._.rotate.applyImageRotation();
    //       // _self._.setPosition({x: bb.x, y: bb.y}, true);
    //       const currentTotalLength = _self._.vect.getTotalLength();
    //       //update pathLengths for the connection endpoints for each connection.
    //       _.each(_self._.relationships.associations, function(association) {
    //           //make sure that the right side of the connection is scaled
    //           if (association.child.options.id === _self._.options.id) {
    //             association.childPointLength = association.childPointLength * (currentTotalLength/totalLengthBeforeUpdatingDimensions);
    //           } else if (association.parent.options.id === _self._.options.id) {
    //             association.parentPointLength = association.parentPointLength * (currentTotalLength/totalLengthBeforeUpdatingDimensions);
    //           }
    //       });
    //
    //       // _self._.relationships.refresh();
    //         var lc = _self._.linkCoords();
    //         _self._.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());
    //         _self._.relationships.refresh();
    //     }
    //
    //     // tempPath && tempPath.remove();
    // };


    _self.set = function (width, height, dur, easing, callback) {
      var latt = void 0,
          tatt = void 0;
      var tempPath = _self._.slate.paper.path(origPath || _underscore2.default.find(Meteor.currentSlate.nodes.allNodes, function (node) {
        return node.options.id === _self._.options.id;
      }).options.vectorPath);
      var tbb = tempPath.getBBox();
      if (!_self._.options.rotate.point) {
        _self._.options.rotate.point = { x: tbb.cx, y: tbb.cy };
      }
      var rotationTransform = "R" + _self._.options.rotate.rotationAngle + ", " + tbb.cx + ", " + tbb.cy;
      var rotatedPath = Raphael.transformPath(tempPath.attr("path"), rotationTransform).toString();
      tempPath.attr({ path: rotatedPath });
      var rotationBB = tempPath.getBBox();

      if (!dur) dur = 0;
      var widthScalar = 1;
      var heightScalar = 1;

      if (width > _minWidth) {
        widthScalar = width / rotationBB.width;

        var tx = rotationBB.x + width / 2,
            lx = rotationBB.x - 5;

        if (dur === 0) {
          _self._.text.attr({ x: tx });
        } else {
          tatt = { x: tx };
          latt = { x: lx };
        }

        _self._.options.width = width;
      } else {
        widthScalar = _minWidth / rotationBB.width;
        _self._.options.width = _minWidth;
      }

      if (height > _minHeight) {
        heightScalar = height / rotationBB.height;
        var ty = rotationBB.y + height / 2;

        if (dur === 0) {
          _self._.text.attr({ y: ty });
        } else {
          _underscore2.default.extend(tatt, { y: ty });
          _underscore2.default.extend(latt, { y: ty });
        }

        _self._.options.height = height;
      } else {
        heightScalar = _minHeight / rotationBB.height;
        _self._.options.height = _minHeight;
      }

      var scaleTransform = "s" + widthScalar + ", " + heightScalar + ", " + rotationBB.x + ", " + rotationBB.y;
      var scaledPath = Raphael.transformPath(tempPath.attr("path").toString(), scaleTransform).toString();
      tempPath.attr({ path: scaledPath });
      rotationBB = tempPath.getBBox();

      _underscore2.default.extend(_self._.options.rotate.point, { x: rotationBB.cx, y: rotationBB.cy });

      var noRotationTransform = "R" + -_self._.options.rotate.rotationAngle + ", " + _self._.options.rotate.point.x + ", " + _self._.options.rotate.point.y;
      var noRotationPath = Raphael.transformPath(tempPath.attr("path"), noRotationTransform).toString();
      tempPath.attr({ path: noRotationPath });
      var noRotationBB = tempPath.getBBox();
      _self._.options.vectorPath = noRotationPath;

      if (dur > 0) {
        //todo this might not be working or might not even be used at all
        _self._.text.animate(tatt, dur);
        _self._.link.hide();

        var onAnimate = function onAnimate() {
          if (_self._.slate) _self._.relationships.refresh();
        };

        eve.on("raphael.anim.frame.*", onAnimate);
        // _self._.vect.animate({path: _self._.options.vectorPath}, dur, easing, function () {
        _self._.vect.animate({ path: noRotationPath, transform: _self._.getTransformString() }, dur, easing, function () {
          var bb = _self._.vect.getBBox();
          if (_self._.vect.pattern) {
            var fillWidth = _self._.options.imageOrigWidth;
            var fillHeight = _self._.options.imageOrigHeight;
            $(_self._.vect.pattern).find("image").css("height", fillHeight);
            $(_self._.vect.pattern).find("image").css("width", fillWidth);
            _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("height", fillHeight);
            _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("width", fillWidth);
          }
          //TODO find a way to animate pathLenghts -- see 'else' below for more details
          var lc = _self._.linkCoords();
          _self._.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());
          if (_self._.options.link.show) _self._.link.show();
          _self._.relationships.refresh();
          eve.unbind("raphael.anim.frame.*", onAnimate);
          callback && callback.apply(this, [_self._]);
        });
      } else {
        var totalLengthBeforeUpdatingDimensions = _self._.vect.getTotalLength();
        _self._.vect.attr({ path: tempPath.attr("path") });
        _self._.vect.transform(_self._.getTransformString());
        _underscore2.default.extend(_self._.options.rotate.point, { x: noRotationBB.cx, y: noRotationBB.cy });
        _self._.rotate.applyImageRotation();
        _self._.setPosition({ x: noRotationBB.x, y: noRotationBB.y }, true);
        var currentTotalLength = _self._.vect.getTotalLength();
        $(_self._.vect.pattern).find("image").css("height", noRotationBB.height);
        $(_self._.vect.pattern).find("image").css("width", noRotationBB.width);
        //update pathLengths for the connection endpoints for each connection.
        _underscore2.default.each(_self._.relationships.associations, function (association) {
          //make sure that the right side of the connection is scaled
          if (association.child.options.id === _self._.options.id) {
            association.childPointLength = association.childPointLength * (currentTotalLength / totalLengthBeforeUpdatingDimensions);
          } else if (association.parent.options.id === _self._.options.id) {
            association.parentPointLength = association.parentPointLength * (currentTotalLength / totalLengthBeforeUpdatingDimensions);
          }
        });

        _self._.relationships.refresh();
        var lc = _self._.linkCoords();
        _self._.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());
        _self._.relationships.refresh();
      }

      tempPath.remove();

      //update rotation point in case it changes
      var tp = _self._.slate.paper.path(_self._.vect.attr("path"));
      var nrbb = tp.getBBox(); //no rotation bbox
      _underscore2.default.extend(_self._.options.rotate.point, { x: nrbb.cx, y: nrbb.cy });
      tp.remove();
    };

    return _self;
  };
})(Slatebox, Slatebox.fn.node);
