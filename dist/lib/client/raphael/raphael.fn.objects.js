"use strict";

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (R) {
    R.fn.handle = function (x, y) {
        return this.path(icons.handle + c);
    };

    R.fn.editor = function (x, y) {
        return this.path(icons.editor + c);
    };

    R.fn.deleter = function (x, y) {
        return this.path(icons.deleter + c);
    };

    R.fn.searcher = function (x, y) {
        return this.path(icons.searcher + c);
    };

    R.fn.plus = function (x, y) {
        return this.path(icons.plus + c);
    };

    R.fn.link = function (x, y) {
        return this.path(icons.link + c);
    };

    R.fn.up = function (x, y) {
        return this.path(icons.up);
    };

    R.fn.down = function (x, y) {
        return this.path(icons.up).transform("r180");
    };

    R.fn.setting = function (x, y) {
        return this.path(icons.settings + c).transform("s,.9,.9");
    };

    R.fn.arrow = function () {
        return this.path(icons.arrow + c);
    };

    R.fn.arrowHead = function () {
        return this.path(icons.arrowHead).attr({ fill: "#648CB2" }).transform("s0.7");
    };

    R.fn.linkArrow = function () {
        return this.path(icons.arrow + c).attr({ fill: '#648CB2' });
    };

    R.fn.lockClosed = function () {
        return this.path(icons.lockClosed);
    };

    R.fn.lockOpen = function () {
        return this.path(icons.lockOpen);
    };

    R.fn.stopSign = function (x, y) {
        var _ss = this.set();
        var _path = Raphael.transformPath(icons.stopSign, ["T", x, ",", y, ",s2,2"].join(""));
        _ss.push(this.path(_path).attr({ "stroke:": "#fff", fill: "red" }));
        _ss.push(this.text(x + 52, y + 37, "STOP").attr({ "font-size": "40pt", "fill:": "#fff", "font-family": "Trebuchet MS" }));
        _ss.push(this.text(x + 47, y + 88, "There are no\nmore results").attr({ "font-size": "16pt", "fill:": "#fff", "font-family": "Trebuchet MS" }));
        return _ss;
    };

    R.fn.loadMore = function (x, y) {
        var _more = this.set();
        var _circle = "M " + x + ", " + y + " h180 a15,15 0 0 1 15,15 v180 a15,15 0 0 1 -15,15 h-180 a15,15 0 0 1 -15,-15 v-180 a15,15 0 0 1 15,-15 z";
        _more.push(this.path(_circle).attr({ fill: "#ddd", stroke: "#000", "stroke-width": 3 }));
        _more.push(this.path(icons.searcher).transform(["T", x, ",", y, "s2.5,2.5"].join("")).attr({ fill: "#fff", stroke: "#000", "stroke-width": 3 }));
        _more.push(this.text(x + 10, y + 10, "Load More...").attr({ "font-size": 14 }));
        return _more;
    };

    R.fn.speechbubble = function (x, y, txt) {
        var _bubble = this.set();
        _bubble.push(this.path(icons.speechbubble).transform(["t", x, ",", y].join()).scale(6, 4).scale(-1, 1)).attr({ fill: "#fff", stroke: "#000", "stroke-width": 3 });
        _bubble.push(this.text(x + 10, y + 10, txt).attr({ "font-size": 12 }));
        return _bubble;
    };

    R.fn.undo = function (path) {
        return this.path(icons.undo);
    };

    R.fn.redo = function (path) {
        return this.path(icons.undo).transform("s-1,1");
    };

    R.fn.resize = function (img) {
        //return this.rect(0,0,10,10);
        //return this.path("M8.818,9.464l9.712,10.792L8.818,9.464zM 11.783,20.823 17.326,18.918 19.804,13.604 24.348,26.72 zM 15.565,8.896 10.022,10.802 7.544,16.115 3,3 z");
        //var _resize = this.set();
        //_resize.push(this.path("M 56.6875 0.125 L 29.875 26.625 L -0.3125 56.53125 L 25.46875 56.53125 L 56.6875 25.375 L 56.6875 0.125 z").attr({stroke: "#fff", fill: "#fff"}).transform("s.5") );
        //_resize.push(this.path("M 0,56.829931 56.539823,0.29010776 zM 14.289023,56.569787 56.693882,14.164916 zM 25.229778,56.521813 57.03342,24.71816 z").attr({stroke: "#000"}).transform("s.5") );
        //_resize.push(this.path(icons.resizeMarker2));
        //return _resize;
        return this.image(img, 0, 0, 22, 23);
    };

    // R.fn.rectangle = function(opts) {
    //     return this.path(shapes.rectangle(opts));
    // };

    // R.fn.rectanglePath = function(opts) {
    //     return shapes.rectangle(opts);
    // };

    // R.fn.straightPath = function(opts) {
    //   return this.path("M5480,5300 h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z");
    //   //console.log("path is ", shapes.roundedRectangle(opts));
    //   //return this.path(opts.pathString);
    // };

    // R.fn.roundedRectangle = function(opts) {
    //     return this.path(shapes.roundedRectangle(opts));
    // };

    // R.fn.roundedRectanglePath = function(opts) {
    //     return "M ${x + 123}, ${y + 43} h30 a3,3 0 0 1 3,3 v25 a3,3 0 0 1 -3,3 h-30 a3,3 0 0 1 -3,-3 v-25 a3,3 0 0 1 3,-3 z";
    // };

    R.fn.slider = function (length, start, end, initVal, onSlide, onDone, onInit, _x, _y, _isHorizontal, z) {

        z = z || 1;

        var _slider = this.set();
        _slider.push(this.rect(_x || 10, _y || 10, 10, length, 5).attr({ fill: "#ccc", stroke: "#333", "stroke-width": 2 }));
        var _sl = this.path(icons.sliderHandle).transform(["t", _x - 10 || 0, ",", _y || 0, "r270"].join(""));
        _sl.attr({ fill: "#eee", stroke: "#ccc" });
        _slider.push(_sl);

        //globals
        var _lockX,
            _initY,
            _lyp,
            _lastDy = 0;

        _slider.setValue = function (val) {
            var _setCurrent = val * length / end + (_y || 0); // / (z || 1);
            _slider[1].transform(["t", _x - 10 || 0, ",", _setCurrent, "r270"].join());
            _lockX = _slider[1].attr("x") + (_x - 10 || 0), _initY = _slider[1].attr("y") + (_y || 0), _lyp = _setCurrent, _lastDy = _y || 0;
        };

        //set current value
        _slider.setValue(initVal);

        var init = function init(x, y) {
            if (_underscore2.default.isFunction(onInit)) {
                onInit.apply(this);
            };
        };

        var move = function move(dx, dy) {

            dx = dx + (dx / z - dx);
            dy = dy + (dy / z - dy);

            //dx = dx / z;
            //dy = dy / z;

            dy = _lyp + dy;

            if (dy < 0) dy = 0;
            if (dy > length + (_y || 0) - 15) dy = length + (_y || 0) - 15;
            if (dy < (_y || 0) - 15) dy = _y - 15;
            _lastDy = dy;

            //moving 1 0 2 5272.32 raphael.fn.objects.js:89
            //moving  5801.08 85 

            _slider[1].transform(["t", _lockX, ",", dy, "r270"].join());

            var currentValue = (dy - _initY) * end / length + start;

            if (_underscore2.default.isFunction(onSlide)) {
                onSlide.apply(this, [currentValue]);
            };
        };

        var up = function up() {
            _lyp = _lastDy - _initY;
            var currentValue = _lyp * end / length + start;
            if (_underscore2.default.isFunction(onSlide)) {
                onSlide.apply(this, [currentValue]);
            };
            if (_underscore2.default.isFunction(onDone)) {
                onDone.apply(this, [currentValue]);
            };
        };

        _slider[1].drag(move, init, up);

        return _slider;
    };

    var c = "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z";

    var icons = {
        handle: "M26.33,15.836l-3.893-1.545l3.136-7.9c0.28-0.705-0.064-1.505-0.771-1.785c-0.707-0.28-1.506,0.065-1.785,0.771l-3.136,7.9l-4.88-1.937l3.135-7.9c0.281-0.706-0.064-1.506-0.77-1.786c-0.706-0.279-1.506,0.065-1.785,0.771l-3.136,7.9L8.554,8.781l-1.614,4.066l2.15,0.854l-2.537,6.391c-0.61,1.54,0.143,3.283,1.683,3.895l1.626,0.646L8.985,26.84c-0.407,1.025,0.095,2.188,1.122,2.596l0.93,0.369c1.026,0.408,2.188-0.095,2.596-1.121l0.877-2.207l1.858,0.737c1.54,0.611,3.284-0.142,3.896-1.682l2.535-6.391l1.918,0.761L26.33,15.836z",
        editor: "M25.31,2.872l-3.384-2.127c-0.854-0.536-1.979-0.278-2.517,0.576l-1.334,2.123l6.474,4.066l1.335-2.122C26.42,4.533,26.164,3.407,25.31,2.872zM6.555,21.786l6.474,4.066L23.581,9.054l-6.477-4.067L6.555,21.786zM5.566,26.952l-0.143,3.819l3.379-1.787l3.14-1.658l-6.246-3.925L5.566,26.952z",
        deleter: "M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z",
        searcher: "M29.772,26.433l-7.126-7.126c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127L29.772,26.433zM7.203,13.885c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486c-0.007,3.58-2.905,6.476-6.484,6.484C10.106,20.361,7.209,17.465,7.203,13.885z",
        up: "M1.67892,15.48059l23.55337,0l-11.37616,-13.92457l-12.17721,13.92457z",
        arrow: "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM13.665,25.725l-3.536-3.539l6.187-6.187l-6.187-6.187l3.536-3.536l9.724,9.723L13.665,25.725z",
        settings: "M16.015,12.03c-2.156,0-3.903,1.747-3.903,3.903c0,2.155,1.747,3.903,3.903,3.903c0.494,0,0.962-0.102,1.397-0.27l0.836,1.285l1.359-0.885l-0.831-1.276c0.705-0.706,1.142-1.681,1.142-2.757C19.918,13.777,18.171,12.03,16.015,12.03zM16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM26.174,20.809c-0.241,0.504-0.513,0.99-0.826,1.45L22.19,21.58c-0.481,0.526-1.029,0.994-1.634,1.385l0.119,3.202c-0.507,0.23-1.028,0.421-1.569,0.57l-1.955-2.514c-0.372,0.051-0.75,0.086-1.136,0.086c-0.356,0-0.706-0.029-1.051-0.074l-1.945,2.5c-0.541-0.151-1.065-0.342-1.57-0.569l0.117-3.146c-0.634-0.398-1.208-0.88-1.712-1.427L6.78,22.251c-0.313-0.456-0.583-0.944-0.826-1.448l2.088-2.309c-0.226-0.703-0.354-1.451-0.385-2.223l-2.768-1.464c0.055-0.563,0.165-1.107,0.301-1.643l3.084-0.427c0.29-0.702,0.675-1.352,1.135-1.942L8.227,7.894c0.399-0.389,0.83-0.744,1.283-1.07l2.663,1.672c0.65-0.337,1.349-0.593,2.085-0.75l0.968-3.001c0.278-0.021,0.555-0.042,0.837-0.042c0.282,0,0.56,0.022,0.837,0.042l0.976,3.028c0.72,0.163,1.401,0.416,2.036,0.75l2.704-1.697c0.455,0.326,0.887,0.681,1.285,1.07l-1.216,2.986c0.428,0.564,0.793,1.181,1.068,1.845l3.185,0.441c0.135,0.535,0.247,1.081,0.302,1.643l-2.867,1.516c-0.034,0.726-0.15,1.43-0.355,2.1L26.174,20.809z",
        sliderHandle: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584z",
        speechbubble: "M16,5.333c-7.732,0-14,4.701-14,10.5c0,1.982,0.741,3.833,2.016,5.414L2,25.667l5.613-1.441c2.339,1.317,5.237,2.107,8.387,2.107c7.732,0,14-4.701,14-10.5C30,10.034,23.732,5.333,16,5.333z",
        resizeMarker: "M -0.124,19.563999 19.440001,0M 3.891,20.542999 20.047001,4.3850002M 8.8249998,20.936001 20.936001,8.8249998",
        link: "M15.667,4.601c-1.684,1.685-2.34,3.985-2.025,6.173l3.122-3.122c0.004-0.005,0.014-0.008,0.016-0.012c0.21-0.403,0.464-0.789,0.802-1.126c1.774-1.776,4.651-1.775,6.428,0c1.775,1.773,1.777,4.652,0.002,6.429c-0.34,0.34-0.727,0.593-1.131,0.804c-0.004,0.002-0.006,0.006-0.01,0.01l-3.123,3.123c2.188,0.316,4.492-0.34,6.176-2.023c2.832-2.832,2.83-7.423,0-10.255C23.09,1.77,18.499,1.77,15.667,4.601zM14.557,22.067c-0.209,0.405-0.462,0.791-0.801,1.131c-1.775,1.774-4.656,1.774-6.431,0c-1.775-1.774-1.775-4.653,0-6.43c0.339-0.338,0.725-0.591,1.128-0.8c0.004-0.006,0.005-0.012,0.011-0.016l3.121-3.123c-2.187-0.316-4.489,0.342-6.172,2.024c-2.831,2.831-2.83,7.423,0,10.255c2.833,2.831,7.424,2.831,10.257,0c1.684-1.684,2.342-3.986,2.023-6.175l-3.125,3.123C14.565,22.063,14.561,22.065,14.557,22.067zM9.441,18.885l2.197,2.197c0.537,0.537,1.417,0.537,1.953,0l8.302-8.302c0.539-0.536,0.539-1.417,0.002-1.952l-2.199-2.197c-0.536-0.539-1.416-0.539-1.952-0.002l-8.302,8.303C8.904,17.469,8.904,18.349,9.441,18.885z",
        resizeMarker2: "M22.5,8.5v3.168l3.832,3.832L22.5,19.332V22.5l7-7L22.5,8.5zM8.5,22.5v-3.168L4.667,15.5L8.5,11.668V8.5l-7,7L8.5,22.5zM15.5,14.101c-0.928,0-1.68,0.751-1.68,1.68c0,0.927,0.752,1.681,1.68,1.681c0.927,0,1.68-0.754,1.68-1.681C17.18,14.852,16.427,14.101,15.5,14.101zM10.46,14.101c-0.928,0-1.68,0.751-1.68,1.68c0,0.927,0.752,1.681,1.68,1.681s1.68-0.754,1.68-1.681C12.14,14.852,11.388,14.101,10.46,14.101zM20.541,14.101c-0.928,0-1.682,0.751-1.682,1.68c0,0.927,0.754,1.681,1.682,1.681s1.68-0.754,1.68-1.681C22.221,14.852,21.469,14.101,20.541,14.101z",
        plus: "M25.979,12.896 19.312,12.896 19.312,6.229 12.647,6.229 12.647,12.896 5.979,12.896 5.979,19.562 12.647,19.562 12.647,26.229 19.312,26.229 19.312,19.562 25.979,19.562z",
        arrowHead: "M15.834,29.084 15.834,16.166 2.917,16.166 29.083,2.917z",
        undo: "M12.981,9.073V6.817l-12.106,6.99l12.106,6.99v-2.422c3.285-0.002,9.052,0.28,9.052,2.269c0,2.78-6.023,4.263-6.023,4.263v2.132c0,0,13.53,0.463,13.53-9.823C29.54,9.134,17.952,8.831,12.981,9.073z",
        lockClosed: "M24.875,15.334v-4.876c0-4.894-3.981-8.875-8.875-8.875s-8.875,3.981-8.875,8.875v4.876H5.042v15.083h21.916V15.334H24.875zM10.625,10.458c0-2.964,2.411-5.375,5.375-5.375s5.375,2.411,5.375,5.375v4.876h-10.75V10.458zM18.272,26.956h-4.545l1.222-3.667c-0.782-0.389-1.324-1.188-1.324-2.119c0-1.312,1.063-2.375,2.375-2.375s2.375,1.062,2.375,2.375c0,0.932-0.542,1.73-1.324,2.119L18.272,26.956z",
        lockOpen: "M24.875,15.334v-4.876c0-4.894-3.981-8.875-8.875-8.875s-8.875,3.981-8.875,8.875v0.375h3.5v-0.375c0-2.964,2.411-5.375,5.375-5.375s5.375,2.411,5.375,5.375v4.876H5.042v15.083h21.916V15.334H24.875zM18.272,26.956h-4.545l1.222-3.667c-0.782-0.389-1.324-1.188-1.324-2.119c0-1.312,1.063-2.375,2.375-2.375s2.375,1.062,2.375,2.375c0,0.932-0.542,1.73-1.324,2.119L18.272,26.956z",
        stopSign: "M69.527,2H29.971L2,29.971v39.558L29.971,97.5h39.558L97.5,69.527V29.972L69.527,2z M95.625,68.898L68.898,95.625H31.101  L4.375,68.898V31.516v-0.414L31.102,4.375h37.796l26.728,26.727L95.625,68.898L95.625,68.898z M68.07,6.375H31.93L6.375,31.93v36.142L31.93,93.626h36.142L93.625,68.07V31.93L68.07,6.375z"
    };

    // var shapes = {
    //     rectangle: function({x = 5500, y = 5300, width = 150, height = 100}) {
    //         return `M${x} ${y} h${width} v${height} h${-(width)} v${-(height)} z`;
    //     }
    //     , roundedRectangle: function({x = 5500, y = 5300, width = 150, height = 100, curveRadius = 10}) {
    //         return `M${x},${y} h${width - 2* curveRadius} a${curveRadius},${curveRadius} 0 0 1 ${curveRadius},${curveRadius} v${height - 2 * curveRadius} a${curveRadius},${curveRadius} 0 0 1 -${curveRadius},${curveRadius} h-${width - 2 * curveRadius} a${curveRadius},${curveRadius} 0 0 1 -${curveRadius},-${curveRadius} v-${height - 2 * curveRadius} a${curveRadius},${curveRadius} 0 0 1 ${curveRadius},-${curveRadius} z`;
    //     }
    // }
})(Raphael);
