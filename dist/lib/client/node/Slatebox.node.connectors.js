'use strict';

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._connectors = function () {
        var _self = this;
        var buttons;
        var pinnedRowCount = 3;
        var _lastUnpinned = { options: { xPos: null, width: null, yPos: null } };

        _self.remove = function () {
            _underscore2.default.invoke(buttons, 'remove');
        };
        _self.removeSettingsButton = function () {
            buttons.setting.remove();
        };
        _self.show = function (x, y, _m, onSettingsClicked) {
            var btnRadius = 15;
            var r = _self._.slate.paper;

            //menu offset, resetting back
            // y = y + 80;
            var btnAttr = { fill: "#fff", stroke: "#000" };
            var bb = _self._.vect.getBBox();
            buttons = {
                setting: r.setting().transform(["t", x + bb.width - 50, ",", y - 18].join()).attr(btnAttr),
                unPinned: r.plus().transform(["t", x + bb.width - 16, ",", y + 8].join()).attr(btnAttr)
                //, pinned: r.arrow().transform(["t", _cx - 13, ",", _cy - 9, "s", so, so, "r", "90"].join()).attr(btnAttr)
            };

            _underscore2.default.each(['mousedown'], function (eventType) {
                buttons.setting[eventType](function (e) {
                    _self._.slate.unglow();
                    onSettingsClicked.apply(this);
                    this.remove();
                    _self._.slate.multiselection && _self._.slate.multiselection.end();
                    _self._.context && _self._.context.remove();
                    _self._.editor && _self._.editor.end();
                    _self._.images && _self._.images.end();
                    _self._.links && _self._.links.end();
                });

                buttons.unPinned[eventType](function (e) {
                    _self._.slate.unglow();
                    _self._.connectors.addNode();
                    this.loop();
                    _self._.context && _self._.context.remove();
                });
            });

            _underscore2.default.each(buttons, function (button) {
                _m.push(button);
                button.mouseover(function (e) {
                    _self._.slate.glow(this);
                });
                button.mouseout(function (e) {
                    _self._.slate.unglow();
                });
            });

            var rs = _self._.resize.show(x + bb.width, y + bb.height);
            _m.push(rs);

            var rotate = _self._.rotate.show(x, y);
            _m.push(rotate);

            return _self;
        };

        _self.reset = function () {
            _lastUnpinned = { options: { xPos: null, width: null, yPos: null } };
        };

        function broadcast(_snap) {
            var pkg = { type: 'onNodeAdded', data: _self._.slate.exportDifference(_snap) };
            _self._.slate.collab && _self._.slate.collab.send(pkg);
        };

        _self.addNode = function (skipCenter) {
            //add new node to the right of this one.
            var _snap = _self._.slate.snapshot();

            var _options = (0, _lodash2.default)(_self._.options);
            delete _options.id;
            delete _options.link;
            var targetXPos = (_lastUnpinned.xPos || _self._.options.xPos) + (_self._.options.width || _lastUnpinned.width) + 30;
            _options.text = "";
            _options.width = _self._.options.width;
            _options.height = _self._.options.height;
            var newNode = $s.instance.node(_options);
            _self._.slate.nodes.add(newNode);

            var transformPath = Raphael.transformPath(newNode.vect.attr("path").toString(), 'T' + (targetXPos - newNode.options.xPos) + ', 0');
            newNode.vect.attr({ path: transformPath });
            newNode.rotate.applyImageRotation();
            newNode.options.vectorPath = transformPath;

            newNode.resize.set(newNode.options.width, newNode.options.height);

            _lastUnpinned = newNode.options;

            _self._.relationships.addAssociation(newNode);
            _self._.slate.birdseye && _self._.slate.birdseye.refresh(false);
            _self._.slate.unMarkAll();

            broadcast(_snap);

            //var _pkg = { type: "addRelationship", data: { type: 'association', parent: _self._.options.id, child: newNode.options.id} };
            //_self._.slate.collab && _self._.slate.collab.send(_pkg);

            //fire the editor
            if (skipCenter === undefined) {
                newNode.position('center', function () {
                    newNode.editor && newNode.editor.start();
                });
            }

            return newNode;
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);
