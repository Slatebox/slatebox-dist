"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var Slatebox = function Slatebox(_options) {
        var _sb = this;
        var slate = null;

        if (!(_sb instanceof Slatebox)) return new Slatebox(_options);

        if (_sb.slate === undefined) {
            alert("You have not included a reference to Slatebox.slate.js!");
        }

        _sb.slates = new Array();
        _sb._options = _options;

        window.Slatebox.instance = _sb;
    };

    Slatebox.windowSize = function () {
        var w = 0;
        var h = 0;

        //IE
        if (!window.innerWidth) {
            //strict mode
            if (!(document.documentElement.clientWidth == 0)) {
                w = document.documentElement.clientWidth;
                h = document.documentElement.clientHeight;
            }
            //quirks mode
            else {
                    w = document.body.clientWidth;
                    h = document.body.clientHeight;
                }
        }
        //w3c
        else {
                w = window.innerWidth;
                h = window.innerHeight;
            }
        return { width: w, height: h };
    };

    Slatebox.isElement = function (o) {
        return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
        (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && o.nodeType === 1 && typeof o.nodeName === "string";
    };

    // convenience
    Slatebox.el = function (id) {
        return document.getElementById(id);
    };

    // var arr = select("elem.className"); 
    Slatebox.select = function (query) {
        var index = query.indexOf(".");
        if (index != -1) {
            var tag = query.slice(0, index) || "*";
            var klass = query.slice(index + 1, query.length);
            var els = [];
            _underscore2.default.each(document.getElementsByTagName(tag), function (elem) {
                if (elem.className && elem.className.indexOf(klass) != -1) {
                    els.push(elem);
                }
            });
            return els;
        }
    };

    Slatebox.getKey = function (e) {
        var keyCode = 0;
        try {
            keyCode = e.keyCode;
        } catch (Err) {
            keyCode = e.which;
        }
        return keyCode;
    };

    // fix event inconsistencies across browsers
    Slatebox.stopEvent = function (e) {
        e = e || window.event;

        if (e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
        } else {
            e.returnValue = false;
            e.cancelBubble = true;
        }
        return false;
    };

    Slatebox.toShortDateString = function (jsonDate) {
        var _date = jsonDate;
        try {
            var d = new Date(parseInt(jsonDate.substr(6)));
            _date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        } catch (Err) {}

        return _date;
    };

    Slatebox.addEvent = function (obj, type, fn) {
        if (obj.attachEvent) {
            obj['e' + type + fn] = fn;
            obj[type + fn] = function () {
                obj['e' + type + fn](window.event);
            };
            obj.attachEvent('on' + type, obj[type + fn]);
        } else obj.addEventListener(type, fn, false);
    };
    Slatebox.removeEvent = function (obj, type, fn) {
        if (obj.detachEvent) {
            obj.detachEvent('on' + type, obj[type + fn]);
            obj[type + fn] = null;
        } else obj.removeEventListener(type, fn, false);
    };

    // push an event listener into existing array of listeners
    Slatebox.bind = function (to, evt, fn) {
        to[evt] = to[evt] || [];
        to[evt].push(fn);
    };

    Slatebox.imageExists = function (u, cb, id) {
        var _id = "temp_" + Slatebox.guid();
        var _img = document.body.appendChild(document.createElement("img"));
        _img.style.position = "absolute";
        _img.style.top = "-10000px";
        _img.style.left = "-10000px";
        _img.setAttribute("src", u);
        _img.setAttribute("id", _id);

        Slatebox.addEvent(_img, "load", function (e) {
            var d = Slatebox.getDimensions(_img);
            document.body.removeChild(_img);
            cb.apply(this, [true, d.width, d.height, id]);
        });

        Slatebox.addEvent(_img, "error", function (e) {
            document.body.removeChild(_img);
            cb.apply(this, [false, 0, 0, id]);
        });
    };

    Slatebox.urlExists = function (url) {
        var http = new XMLHttpRequest();
        http.open('GET', url, false);
        http.send();
        return http.status == 200;
    };

    Slatebox.ajax = function (u, f, d, v, x, h) {
        x = this.ActiveXObject;
        //the guid is essential to break the cache because ie8< seems to want to cache this. argh.
        u = [u, u.indexOf("?") === -1 ? "?" : "&", "guid=" + Slatebox.guid()].join("");
        x = new (x ? x : XMLHttpRequest)('Microsoft.XMLHTTP');
        var vx = d ? v ? v : 'POST' : v ? v : 'GET';
        x.open(vx, u, 1);
        x.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        if (h) _underscore2.default.each(h, function (hElem) {
            x.setRequestHeader(hElem.n, hElem.v);
        });
        x.onreadystatechange = function () {
            x.readyState > 3 && f ? f(x.responseText, x) : 0;
        };
        x.send(d);
    };

    var S4 = function S4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    };
    Slatebox.guid = function () {
        return S4() + S4() + S4();
    };
    Slatebox.number = function () {
        return Math.floor(Math.random() * 9999) + 999;
    };

    var head = document.getElementsByTagName('head')[0],
        global = this;
    Slatebox.getJSON = function (url, callback) {
        id = S4() + S4();
        var script = document.createElement('script'),
            token = '__jsonp' + id;

        // callback should be a global function
        global[token] = callback;

        // url should have "?" parameter which is to be replaced with a global callback name
        script.src = url.replace(/\?(&|$)/, '__jsonp' + id + '$1');

        // clean up on load: remove script tag, null script variable and delete global callback function
        script.onload = function () {
            //delete script;
            script = null;
            //delete global[token];
        };
        head.appendChild(script);
    };

    Slatebox.positionedOffset = function (obj) {
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        return { left: curleft, top: curtop };
    };

    Slatebox.getDimensions = function (ele) {
        var width = 0,
            height = 0;
        if (typeof ele.clip !== "undefined") {
            width = ele.clip.width;
            height = ele.clip.height;
        } else {
            if (ele.style.pixelWidth) {
                width = ele.style.pixelWidth;
                height = ele.style.pixelHeight;
            } else {
                width = ele.offsetWidth;
                height = ele.offsetHeight;
            }
        }
        return { width: width, height: height };
    };

    Slatebox.isIE = function () {
        var version = 999; // we assume a sane browser
        if (navigator.appVersion.indexOf("MSIE") !== -1 && navigator.appVersion.indexOf("chromeframe") === -1) version = parseFloat(navigator.appVersion.split("MSIE")[1]);
        return version;
    };

    Slatebox.isIpad = function () {
        return navigator.userAgent.match(/iPad/i) !== null;
    };

    Slatebox.mousePos = function (e) {
        if (document.all) {
            mouseX = window.event.clientX; //document.body.scrollLeft; //(e.clientX || 0) +
            mouseY = window.event.clientY; //document.body.scrollTop;
        } else if (e.targetTouches) {
            if (e.targetTouches.length) {
                var t = e.targetTouches[0]; // touches.item(0);
                mouseX = t.clientX;
                mouseY = t.clientY;
                var _allTouches = [];
                for (var tx in e.targetTouches) {
                    _allTouches.push({ x: e.targetTouches[tx].clientX, y: e.targetTouches[tx].clientY });
                }
            }
            //}
        } else {
            mouseX = e.pageX;
            mouseY = e.pageY;
        }
        return { x: mouseX, y: mouseY, allTouches: _allTouches };
    };

    //    Slatebox.toJSON = function (obj) {
    //        var tmp = this.split("");
    //        for (var i = 0; i < tmp.length; i++) {
    //            var c = tmp[i];
    //            (c >= ' ') ?
    //			            (c == '\\') ? (tmp[i] = '\\\\') :
    //			            (c == '"') ? (tmp[i] = '\\"') : 0 :
    //		            (tmp[i] =
    //			            (c == '\n') ? '\\n' :
    //			            (c == '\r') ? '\\r' :
    //			            (c == '\t') ? '\\t' :
    //			            (c == '\b') ? '\\b' :
    //			            (c == '\f') ? '\\f' :
    //			            (c = c.charCodeAt(), ('\\u00' + ((c > 15) ? 1 : 0) + (c % 16)))
    //		            )
    //        }
    //        return '"' + tmp.join("") + '"';
    //    };

    Slatebox.ensureEle = function (el) {
        return typeof el === 'string' ? document.getElementById(el) : el;
    };

    Slatebox.onOff = function (baseUrl, ele, callback) {
        var imgID = Slatebox.guid().replace('-', '').substring(0, 8);
        var _element = Slatebox.ensureEle(ele);
        _element.innerHTML = "<div style='cursor:pointer;overflow:hidden;width:53px;height:20px;'><img id='" + imgID + "' style='margin-top:0px;' src='" + baseUrl + "/public/images/checkbox-switch-stateful.png' alt='toggle'/>";
        Slatebox.el(imgID).onclick = function (e) {
            callback.apply(this, [imgID]);
        };
        return imgID;
    };

    Slatebox.isOn = function (ele) {
        var _ele = Slatebox.ensureEle(ele);
        if (_ele.style.marginTop === "0px") return false;
        return true;
    };

    Slatebox.toggleOnOff = function (ele) {
        var _ele = Slatebox.ensureEle(ele);
        if (_ele.style.marginTop === "0px") _ele.style.marginTop = "-22px";else _ele.style.marginTop = "0px";
    };

    Slatebox.div = function (p, x, y, w, h) {
        var _id = "temp_" + Slatebox.guid();
        var _div = p.appendChild(document.createElement("div"));
        _div.style.position = 'absolute';
        _div.style.top = y + "px";
        _div.style.left = x + "px";
        _div.style.width = w + "px";
        _div.style.height = h + "px";
        _div.style.border = "1px solid red";
        _div.style.backgroundColor = "#f8f8f8";
        _div.setAttribute("id", _id);
        return _id;
    };

    Slatebox._transformPath = function (_original, _transform) {
        return Raphael.transformPath(_original, _transform).toString();
    };

    Slatebox.transformPath = function (_node, _transformation) {
        var _path = Raphael.transformPath(_node.vect.attr("path").toString(), _transformation).toString();
        //M6314,5416.945658187136C6314,5393.284794938737,6306.207842377084,5373.010877800417,6295.374742118167,5365.122596730885C6299.896958032759,5355.351794497941,6302.537668055896,5342.631841774332,6302.537668055896,5328.5029831483025C6302.537668055896,5297.976688595687,6289.709593896682,5273.225316258962,6273.883901250288,5273.225316258962C6271.626919402412,5273.225316258962,6269.543234149791,5273.6471920376625,6267.436855295411,5274.594422559631C6265.037522672839,5248.744581214237,6253.591695166361,5228.9920388590335,6239.498968472649,5228.99999877938C6225.408304833644,5229.003978739551,6213.960414272465,5248.756521094771,6211.561081649886,5274.610342400342C6209.454702795506,5273.65913191819,6207.368954488182,5273.237256139491,6205.114035695002,5273.237256139491C6189.288343048615,5273.237256139491,6176.460268889408,5297.984648516063,6176.460268889408,5328.514923028826C6176.460268889408,5342.647761615049,6179.100978912538,5355.363734378466,6183.623194827133,5365.138516571601C6172.792157622918,5373.022817680932,6165,5393.284794938737,6165,5416.945658187136C6165,5447.4759326999165,6176.462331944123,5472.23526495696,6193.6537668055935,5472.23526495696C6193.6537668055935,5472.23526495696,6199.382869722941,5472.23526495696,6199.382869722941,5472.23526495696C6199.382869722941,5472.23526495696,6222.305470556472,5549.621610625899,6222.305470556472,5549.621610625899C6222.305470556472,5549.621610625899,6222.305470556472,5604.891317594834,6222.305470556472,5604.891317594834C6222.305470556472,5615.943667004587,6228.036636528537,5626.9999963744585,6233.76780250059,5626.9999963744585C6233.76780250059,5626.9999963744585,6245.23013444471,5626.9999963744585,6245.23013444471,5626.9999963744585C6250.95717430736,5626.9999963744585,6256.690403334128,5615.947646964747,6256.690403334128,5604.891317594834C6256.690403334128,5604.891317594834,6256.690403334128,5549.60967074536,6256.690403334128,5549.60967074536C6256.690403334128,5549.60967074536,6279.615067222356,5472.23526495696,6279.615067222356,5472.23526495696C6279.615067222356,5472.23526495696,6287.8507816069705,5471.90492826231,6287.8507816069705,5471.90492826231C6302.5356050011815,5472.227305036631,6314,5445.804349425833,6314,5416.945658187136C6314,5416.945658187136,6314,5416.945658187136,6314,5416.945658187136C6314,5416.945658187136,6314,5416.945658187136,6314,5416.945658187136M6222.307533611179,5472.227305036631C6222.307533611179,5472.227305036631,6256.692466388824,5472.227305036631,6256.692466388824,5472.227305036631C6256.692466388824,5472.227305036631,6245.232197499413,5516.44466259583,6245.232197499413,5516.44466259583C6245.232197499413,5516.44466259583,6233.769865555285,5516.44466259583,6233.769865555285,5516.44466259583C6233.769865555285,5516.44466259583,6222.307533611179,5472.227305036631,6222.307533611179,5472.227305036631C6222.307533611179,5472.227305036631,6222.307533611179,5472.227305036631,6222.307533611179,5472.227305036631
        var _ps = _path.split(",");
        var _psx = [];
        _underscore2.default.each(_ps, function (p) {
            var nn = _underscore2.default.isFinite(p) ? parseInt(p, 10) : p;
            _psx.push(nn);
        });
        _node.options.vectorPath = _psx.join(",");
        _node.vect.transform("");
        _node.vect.attr({ path: _node.options.vectorPath });
        var bb = _node.vect.getBBox();
        var rotationContext = {
            point: {
                x: bb.cx,
                y: bb.cy
            }
        };
        _underscore2.default.extend(_node.options.rotate, rotationContext);
        var transformString = _node.getTransformString();
        _node.vect.transform(transformString);
    };

    Slatebox.fn = Slatebox.prototype = {
        initNode: function initNode() {
            var _node = this;
            _underscore2.default.each($s.fn.node.fn, function (fn) {
                if (_underscore2.default.isFunction(fn)) {
                    if (arguments[1].substring(0, 1) === '_') {
                        fn.apply(_node);
                        //delete Slatebox.fn.node.fn[arguments[0]];
                    }
                }
            });
        }
    };

    //helper methods
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /*, thisp */) {
            "use strict";

            if (this === void 0 || this === null) throw new TypeError();

            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function") throw new TypeError();

            var res = [];
            var thisp = arguments[1];
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i]; // in case fun mutates this
                    if (fun.call(thisp, val, i, t)) res.push(val);
                }
            }

            return res;
        };
    }

    window.Slatebox = Slatebox;
})();
