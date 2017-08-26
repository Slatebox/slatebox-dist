"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _getTransformedPath = require("../helpers/getTransformedPath");

var _getTransformedPath2 = _interopRequireDefault(_getTransformedPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
  $n.fn._shapes = function () {
    var _self = this,
        hover = "",
        changer;

    _self.show = function (x, y, _m) {
      x = x + 1;
      var _r = _self._.slate.paper;
      var _s = { fill: "#fff", stroke: "#000", "stroke-width": 1 };
      var _custom = { fill: "#d8d8d8", stroke: "#000", "stroke-width": 1 };

      //this is the icon for the custom shapes
      var _customShapesIcon = "M " + (x + 123) + ", " + (y + 43) + " h30 a3,3 0 0 1 3,3 v25 a3,3 0 0 1 -3,3 h-30 a3,3 0 0 1 -3,-3 v-25 a3,3 0 0 1 3,-3 z M " + (x + 128) + "," + (y + 58) + " m -3,0 a3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0Z M " + (x + 138) + "," + (y + 58) + " m -3,0 a3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0Z M " + (x + 148) + "," + (y + 58) + " m -3,0 a3,3 0 1,0 6,0 a 3,3 0 1,0 -6,0Z";
      //"ADD8C7", to: "59a989"
      var shapes = [_r.rect(x + 5, y + 43, 30, 30).attr(_s), _r.rect(x + 44, y + 43, 30, 30, 5).attr(_s), _r.ellipse(x + 98, y + 58, 16, 16).attr(_s), _r.path(_customShapesIcon).attr(_custom).data({ msg: 'Custom Shape', width: 97 })];

      _underscore2.default.each(shapes, function (shape) {
        shape.mouseover(function (e) {
          _self._.slate.glow(this);
          var _text = this.data("msg");
          if (_text) {
            _self._.slate.addtip(this.tooltip({ type: 'text', msg: _text }, this.data("width"), this.data("height")));
          }
          $s.stopEvent(e);
        });
        shape.mouseout(function (e) {
          _self._.slate.unglow();
          this.untooltip();
          $s.stopEvent(e);
        });
        shape.mousedown(function (e) {
          if (this.type !== _self._.options.vectorPath) {
            var pkg = {
              type: 'onNodeShapeChanged',
              data: {
                id: _self._.options.id,
                shape: this.type,
                rx: this.attr("rx")
              }
            };
            if (pkg.data.shape === "path") {
              //need to bring up the pathSearch
              _self._.position("center", function () {
                _self._.customShapes.start();
              });
            } else {
              _self.set(pkg.data);
              _self._.slate.collab && _self._.slate.collab.send(pkg);
              _self._.slate.birdseye && _self._.slate.birdseye.nodeChanged(pkg);
            }
          }
        });
        _m.push(shape);
      });
    };

    _self.set = function (pkg) {
      _self._.slate.unglow();
      var vectOpt = { fill: _self._.options.backgroundColor, "stroke-width": _self._.options.borderWidth, "stroke": "#000" };
      if (_self._.options.image && _self._.options.image !== "") vectOpt.fill = "url(" + _self._.options.image + ")";
      var _x = _self._.options.xPos,
          _y = _self._.options.yPos;
      var _translateTransform = ["T", _x, ",", _y].join(""); //, _width/150, ",", _height/100].join("");

      //get a path with no rotation to get the actual node dimensions instead of bbox dimensions
      var tempPath = _self._.slate.paper.path(_self._.vect.attr("path").toString()).attr({ opacity: 0 });
      var relevantBB = tempPath.getBBox();

      var _scaleTransform = ["s", relevantBB.width / 150, ",", relevantBB.height / 100, ",", _x, ",", _y].join("");
      var transforms = [_scaleTransform, _translateTransform];
      switch (pkg.shape) {
        case "ellipse":

          //_tp = ["T", _x + _width/2, ",", _y + _height/2, "s", _width/150, ",", _height/100].join("");
          // _self._.options.vectorPath = Raphael.transformPath("M 1,1 m -75,0 a75,50 0 1,0 150,0 a 75,50 0 1,0 -150,0Z", _tp).toString();
          _self._.options.vectorPath = (0, _getTransformedPath2.default)("M 1,1 m -75,0 a75,50 0 1,0 150,0 a 75,50 0 1,0 -150,0Z", transforms);
          _self._.options.isEllipse = true;
          // _self._.options.xPos += _width / 2;
          // _self._.options.yPos += _height / 2;
          break;
        case "rect":
          //_tp = ["T", _x, ",", _y, "s", _width/150, ",", _height/100].join("");
          //determine if rounded or not?
          _self._.options.vectorPath = pkg.rx > 0 ? (0, _getTransformedPath2.default)("M1,1 h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z", transforms) : (0, _getTransformedPath2.default)("M1,1 h150 v100 h-150 v-100 z", transforms);
          _self._.options.isEllipse = false;
          break;
        default:
          _self._.options.vectorPath = pkg.shape;
          _self._.options.isEllipse = false;
          break;
      }

      var att = _underscore2.default.extend(vectOpt, { path: _self._.options.vectorPath });
      _self._.vect.attr(att);

      var _newBB = _self._.vect.getBBox();
      var _difX = _x - _newBB.x;
      var _difY = _y - _newBB.y;
      if (_difX !== 0 || _difY !== 0) {
        $s.transformPath(_self._, ["T", _difX, _difY].toString(","));
        _newBB = _self._.vect.getBBox();
        $s.transformPath(_self._, ["T", relevantBB.cx - _newBB.cx, relevantBB.cy - _newBB.cy].toString(","));
        _newBB = _self._.vect.getBBox();
      }

      //get a path with no rotation to get the actual node dimensions instead of bbox dimensions
      tempPath && tempPath.remove();
      tempPath = _self._.slate.paper.path(_self._.vect.attr("path").toString()).attr({ opacity: 0 });
      relevantBB = tempPath.getBBox();

      //apply image fill rotation
      if (_self._.vect.pattern) {
        var fillWidth = relevantBB.width;
        var fillHeight = relevantBB.height;
        $(_self._.vect.pattern).find("image").css("height", fillHeight);
        $(_self._.vect.pattern).find("image").css("width", fillWidth);
        _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("height", fillHeight);
        _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("width", fillWidth);
        // _self._.vect.pattern.getElementsByTagName("image")[0].setAttribute("transform", `rotate(${_self._.options.rotationAngle}, ${fillWidth / 2 + relevantBB.x - _newBB.x || 0}, ${fillHeight / 2 + relevantBB.y - _newBB.y || 0})translate(${relevantBB.x - _newBB.x + (pkg.shape === "ellipse" && _self._.options.rotationAngle ? pkg.rx * relevantBB.height / 100 * 0.7 : 0)},${relevantBB.y - _newBB.y - (pkg.shape === "ellipse" ? (_self._.options.rotationAngle ? pkg.rx : -pkg.rx) : 0)})`);
        _self._.rotate.applyImageRotation();
      }

      _self._.text.toFront();
      _self._.link.toFront();
      _self._.relationships.refresh();
      _self._.relationships.wireHoverEvents();
      _self._.relationships.wireDragEvents();
      _self._.setPosition({ x: _newBB.x, y: _newBB.y });

      //needed for tofront and toback ops of the context menu
      _self._.vect.data({ id: _self._.options.id });
      _self._.context.create();

      tempPath && tempPath.remove();
    };

    return _self;
  };
})(Slatebox, Slatebox.fn.node);
