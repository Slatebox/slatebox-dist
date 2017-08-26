'use strict';

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._images = function () {
        var _self = this,
            _ntfy,
            options,
            _searchType = 'image';
        _self.imagesearching = false;
        _self.start = function (_options) {
            _self.imagesearching = true;
            _self._.slate.nodes.closeAllMenus();

            options = {
                searchImages: true
                //, imageUrl: '/images?query={query}&size={size}&rpp={rpp}&page={page}'
                , size: 'Small',
                isColor: true,
                paging: { rpp: 4, page: 0, total: 0 }
            };

            _underscore2.default.extend(options, _options || {});

            var origImage;
            _ntfy = new Notify().message({
                hgt: 185,
                duration: 200,
                className: 'embedBar',
                delayClose: 0,
                spinner: null,
                hideClose: false,
                popFromBottom: true,
                onOpen: function onOpen(container, _ntfy) {

                    container.innerHTML = "<div style='width:100%;clear:both;'>" + "<div id='embedDivAction' style='float:left;width:25%;'>" + "<span style='font-size:20pt;' id='spnEmbedAction'>Search Images</span><br/>" + "<span style='display:none;font-size:20pt;color:#ccc;' id='embedUrlPrefix'>http://</span><input type='text' id='txtSearch' class='input-sm' style='margin-bottom:-2px;color:#000;font-size:12pt;'/>" + "&nbsp;<button id='btnImageSearch' class='btn btn-success btn-sm'>go</button>" + "<div id='imgShowSize' style='padding-top:10px;'>" + "<span id='lblImageSize' style='font-size:12pt;'>Size: </span> " + "<select id='ddlImageSize' style='color:#000;'>" + "<option selected>Small</option>" + "<option>Medium</option>" + "<option>Large</option>" + "<option>All</option>" + "</select>" + "&nbsp;&nbsp;<label for='chkAsUrl' style='cursor:pointer'><input type='checkbox' id='chkAsUrl' />Provide URL</label>" + "</div>&nbsp;&nbsp;[<a href='javascript:' id='lnkClearImage'>clear</a>]" + "</div>" + "</div>" + "<div style='float:left;width:5%;visibility:hidden;margin-right:-10px;margin-left:-10px;font-size:40pt;cursor:pointer;color:red;' id='lnkSearchBack' class='imgChanger'> < </div>" + "<div style='float:left;width:65%;' id='imgResults'></div>" + "<div style='float:left;width:5%;visibility:hidden;margin-right:-10px;margin-left:-10px;font-size:40pt;cursor:pointer;color:red;' id='lnkSearchForward' class='imgChanger'> > </div>" + "</div>";

                    origImage = _self._.options.image;
                    $s.el("ddlImageSize").value = options.size;

                    $s.el("txtSearch").focus();
                    _self._.mark();

                    $s.addEvent($s.el("txtSearch"), "keypress", function (e) {
                        if ($s.getKey(e) === 13) {
                            if ($s.el("chkAsUrl").checked) {
                                bindURL();
                            } else {
                                bindResults();
                                options.paging.page = 0;
                                options.paging.total = 0;
                            }
                        }
                    });

                    $s.addEvent($s.el("txtSearch"), "focus", function (e) {
                        this.select();
                    });

                    $s.addEvent($s.el("btnImageSearch"), "click", function (e) {
                        if ($s.el("chkAsUrl").checked) {
                            bindURL();
                        } else {
                            bindResults();
                            options.paging.page = 0;
                            options.paging.total = 0;
                        }
                        return $s.stopEvent(e);
                    });

                    $s.addEvent($s.el("lnkSearchForward"), "click", function (e) {
                        options.paging.page++;
                        bindResults();
                        return $s.stopEvent(e);
                    });

                    $s.addEvent($s.el("lnkSearchBack"), "click", function (e) {
                        options.paging.page--;
                        bindResults();
                        return $s.stopEvent(e);
                    });

                    $s.addEvent($s.el("lnkClearImage"), "click", function (e) {
                        _set('', 50, 50);
                    });

                    $s.addEvent($s.el("chkAsUrl"), "click", function (e) {
                        if (this.checked) {
                            $s.el("ddlImageSize").style.visibility = 'hidden';
                            $s.el("lblImageSize").style.visibility = 'hidden';
                            $s.el("embedUrlPrefix").style.display = "inline";
                            $s.el("spnEmbedAction").innerHTML = "Provide URL";
                            _underscore2.default.each($s.select("div.imgChanger"), function (elem) {
                                elem.style.display = 'none';
                            });
                            $s.el("imgResults").style.display = "none";
                            $s.el("embedDivAction").style.width = "850px";
                            emile($s.el("txtSearch"), "width:600px", {
                                duration: 500,
                                after: function after() {
                                    $s.el("txtSearch").setAttribute("placeholder", "provide the url to your image");
                                }
                            });
                        } else {
                            shrinkBox();
                        }
                    });

                    _underscore2.default.each($s.select("div.imgChanger"), function (elem) {
                        $s.addEvent(elem, "mouseover", function (e) {
                            this.style.color = '#fff';
                        });
                        $s.addEvent(elem, "mouseout", function (e) {
                            this.style.color = 'red';
                        });
                    });
                }
            });
        };

        function shrinkBox(cb) {
            emile($s.el("txtSearch"), "width:170px", {
                duration: 500,
                after: function after() {
                    $s.el("ddlImageSize").style.visibility = 'visible';
                    $s.el("lblImageSize").style.visibility = 'visible';
                    $s.el("embedUrlPrefix").style.display = "none";
                    $s.el("spnEmbedAction").innerHTML = "Search Images";
                    _underscore2.default.each($s.select("div.imgChanger"), function (elem) {
                        elem.style.display = 'block';
                    });
                    $s.el("imgResults").style.display = "block";
                    $s.el("embedDivAction").style.width = "260px";

                    $s.el("txtSearch").removeAttribute("placeholder");

                    if (_underscore2.default.isFunction(cb)) cb.apply(this);
                }
            });
        };

        function bindURL() {
            var u = ["http://", $s.el("txtSearch").value.replace('http://', '')].join('');
            $s.imageExists(u, function (exists, w, h) {
                if (exists) {
                    _set(u, w, h);
                } else {
                    setTimeout(function () {
                        alert("Sorry, that image could not be loaded.");
                    }, 2000);
                }
            });
        };

        function bindResults() {
            hideNav();
            var _size = $s.el("ddlImageSize").value.toLowerCase();
            if ($s.el("ddlImageSize").value === "All") {
                _size = "";
            }

            // var _url = options.imageUrl
            //             .replace(/{query}/gi, $s.el("txtSearch").value)
            //             .replace(/{size}/gi, _size)
            //             .replace(/{rpp}/gi, options.paging.rpp)
            //             .replace(/{page}/gi, (options.paging.page * options.paging.rpp))

            //console.log("using image url ", _url, _size, options.paging, $s.el("txtSearch").value);

            var _template = "<div style='float:left;cursor:pointer;border:1px solid transparent;padding:5px;height:150px;overflow:hidden;' class='searchImage' rel='{url}|{width}|{height}'><div style='width:100px;height:105px;text-align:center;'><img src='{thumb}' title='{title}' alt='{title}' style='width:90px;'/></div><div style='text-align:center;'>{width} x {height}</div></div>";
            var _results = '';

            _self._.slate.options.events.onImagesRequested({
                rpp: options.paging.rpp,
                size: _size,
                page: options.paging.page,
                query: $s.el("txtSearch").value,
                cb: function cb(pkg) {
                    //var pkg = JSON.parse(respText);
                    options.paging.total = (options.paging.page + 2) * options.paging.rpp;
                    _underscore2.default.each(pkg, function (pkgObj) {
                        var _title = pkgObj.name;
                        var _thumb = pkgObj.thumbnailUrl;
                        var _url = pkgObj.contentUrl;
                        var _width = parseInt(pkgObj.width);
                        var _height = parseInt(pkgObj.height);
                        _results += _template.replace(/{url}/gi, _url).replace(/{thumb}/gi, _thumb).replace(/{imgWidth}/gi, pkgObj.thumbnail.width).replace(/{imgHeight}/gi, pkgObj.thumbnail.height).replace(/{title}/gi, _title).replace(/{width}/gi, _width).replace(/{height}/gi, _height);
                    });
                    setResults(_results);
                }
            });
        };

        function setResults(_results) {
            if (_results === "") {
                $s.el("imgResults").innerHTML = "<div style='font-size:20pt;color:#fff;margin-top:20px;'>There are no results!</div>";
            } else {
                $s.el("imgResults").innerHTML = _results;
                setNav();
                setImageSelect();
            }
        };

        function setImageSelect() {
            _underscore2.default.each($s.select("div.searchImage"), function (elem) {
                $s.addEvent(elem, "click", function (e) {
                    var _sel = this.getAttribute("rel").split('|');
                    var img = _sel[0],
                        w = parseInt(_sel[1]),
                        h = parseInt(_sel[2]);
                    _set(img, w, h);
                });
                $s.addEvent(elem, "mouseover", function (e) {
                    this.style.border = "1px solid #ccc";
                    this.style.backgroundColor = '#333';
                    this.style.color = '#fff';
                });
                $s.addEvent(elem, "mouseout", function (e) {
                    this.style.border = "1px solid transparent";
                    this.style.backgroundColor = 'transparent';
                    this.style.color = '#ccc';
                });
            });
        };

        function _set(img, w, h) {
            _self.set(img, w, h);
            _self._.mark();

            var _pkg = { type: 'onNodeImageChanged', data: { id: _self._.options.id, img: _self._.options.image, w: _self._.options.width, h: _self._.options.height } };
            _self._.slate.birdseye && _self._.slate.birdseye.nodeChanged(_pkg);
            _self._.slate.collab && _self._.slate.collab.send(_pkg);
        };

        function hideNav() {
            $s.el("lnkSearchForward").style.visibility = 'hidden';
            $s.el("lnkSearchBack").style.visibility = 'hidden';
        };

        function setNav() {
            if ((options.paging.page + 1) * options.paging.rpp < options.paging.total) {
                $s.el("lnkSearchForward").style.visibility = 'visible';
            }
            if (options.paging.page > 0) {
                $s.el("lnkSearchBack").style.visibility = 'visible';
            }
        };

        _self.end = function () {
            _self.imagesearching = false;
            _self._.unmark();
            _ntfy && _ntfy.closeMessage();
        };

        _self.set = function (img, w, h) {
            var useMainCanvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            _self._.vect.data({ relativeFill: true });
            _self._.options.image = img;
            _self._.options.imageOrigHeight = h; //for scaling node to image size purposes; this value should never be changed
            _self._.options.imageOrigWidth = w;

            var _paper = useMainCanvas ? Meteor.currentSlate.paper : _self._.slate.paper;

            _self._.vect.transform("");
            var tempPath = _paper.path(_self._.vect.attr("path").toString()).attr({ opacity: 0 });
            var noTransformsBB = tempPath.getBBox();

            //delete previous fill before adding a new image
            $(_self._.vect.pattern).detach();

            sz = { "fill": "url(" + _self._.options.image + ")", "stroke-width": _self._.options.borderWidth, "stroke": "#000" };

            _self._.vect.attr(sz);

            // const scaleString = `s${w/noTransformsBB.width},${h/noTransformsBB.height},${noTransformsBB.x}, ${noTransformsBB.y}`;
            var scaleString = 's' + w / noTransformsBB.width + ',' + h / noTransformsBB.height;
            var scaledPath = Raphael.transformPath(tempPath.attr("path").toString(), scaleString);
            _self._.vect.attr({ path: scaledPath });
            _self._.options.vectorPath = scaledPath;
            var bb = _self._.vect.getBBox();

            $(_self._.vect.pattern).find("image").css("height", bb.height);
            $(_self._.vect.pattern).find("image").css("width", bb.width);

            var opts = {};
            if (useMainCanvas) {
                //get the correct clientBoundingRect for birdseye
                tempPath.attr({ path: scaledPath });
                opts.boundingClientRect = tempPath[0].getBoundingClientRect();
            }

            _self._.rotate.applyImageRotation(opts);
            var rotatedBB = _self._.vect.getBBox();
            _self._.options.width = rotatedBB.width;
            _self._.options.height = rotatedBB.height;

            _self._.relationships.refresh();
            _self._.setPosition({ x: rotatedBB.x, y: rotatedBB.y });
            _self._.connectors && _self._.connectors.remove();
            _self._.resize && _self._.resize.hide();
            tempPath && tempPath.remove();
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);
