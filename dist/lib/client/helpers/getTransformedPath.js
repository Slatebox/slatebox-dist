"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransformedPath;

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTransformedPath(originalPath, transforms) {
  var _transformsArray = transforms;
  var transformedPath = originalPath;
  if (!_underscore2.default.isArray(transforms) && _underscore2.default.isString(transforms)) {
    _transformsArray = [transforms];
  }
  //NOTE: it's safer to apply transforms one by one because this transform string `T${_x * percent}, ${_y * percent}, s${_width/150 * percent}, ${_height/100 * percent}, ${_x}, ${_y}`
  //      would be applied incorrectly - element would be translated using the center of scaling ${_x}, ${_y} which seems to be a bug in raphael.js
  _underscore2.default.each(_transformsArray, function (transform) {
    transformedPath = Raphael.transformPath(transformedPath, transform).toString();
  });

  return transformedPath;
}
