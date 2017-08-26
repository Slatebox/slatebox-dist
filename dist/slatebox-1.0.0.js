/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (true) {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
      return _;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}.call(this));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransformedPath;

var _underscore = __webpack_require__(0);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDepCoords;
function getDepCoords(p, options) {
  var lx = p.x - 5,
      tx = p.x + options.width / 2,
      ty = p.y + options.height / 2;

  if (options.vectorPath === "ellipse") {
    lx = p.cx - 5;
    tx = p.cx;
    ty = p.cy;
  }

  return { lx: lx, tx: tx, ty: ty };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(8)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(2);
__webpack_require__(1);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
module.exports = __webpack_require__(40);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _underscore = __webpack_require__(0);

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
        global = window;
    Slatebox.getJSON = function (url, callback) {
        var id = S4() + S4();
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
    //                  (c == '\\') ? (tmp[i] = '\\\\') :
    //                  (c == '"') ? (tmp[i] = '\\"') : 0 :
    //                (tmp[i] =
    //                  (c == '\n') ? '\\n' :
    //                  (c == '\r') ? '\\r' :
    //                  (c == '\t') ? '\\t' :
    //                  (c == '\b') ? '\\b' :
    //                  (c == '\f') ? '\\f' :
    //                  (c = c.charCodeAt(), ('\\u00' + ((c > 15) ? 1 : 0) + (c % 16)))
    //                )
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _lodash = __webpack_require__(3);

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
                    //, viewPort: _resizedSlate.options.viewPort
                }, name: _resizedSlate.options.name,
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
                for (var _px = 0; _px < an.length; _px++) {
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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _getTransformedPath = __webpack_require__(1);

var _getTransformedPath2 = _interopRequireDefault(_getTransformedPath);

var _getDepCoords = __webpack_require__(2);

var _getDepCoords2 = _interopRequireDefault(_getDepCoords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s) {
    $s.fn.node = function (_options) {
        if (!(this instanceof $s.fn.node)) return new $s.fn.node(_options);

        var _node = this,
            _marker,
            _lock,
            _openLock;
        _node.options = {
            id: $s.guid(),
            name: '',
            text: '' //text in the node
            , image: '' //the image to show with the node
            , imageTiled: false,
            xPos: 0 //the initial x position relative to the node container
            , yPos: 0 //the initial y position relative to the node container
            , height: 10 //the height of the node
            , width: 10 //the width of the node
            , borderWidth: 2 //border width of the node
            , borderStyle: "",
            lineColor: '#000000' //line color
            , lineWidth: 10 //line width
            , lineOpacity: 1,
            allowDrag: true,
            allowMenu: true,
            allowContext: true,
            allowResize: true,
            backgroundColor: '#f8f8f8',
            foregroundColor: '#000',
            fontSize: 12,
            fontFamily: 'Trebuchet MS',
            fontStyle: 'normal',
            vectorPath: '',
            rotate: {
                rotationAngle: 0
            },
            link: { show: false, type: '', data: '', thumbnail: { width: 175, height: 175 } }
        };

        _underscore2.default.extend(_node.options, _options);
        if (_node.options.name === "") _node.options.name = _node.options.id;

        _node.constants = {
            statusPanelAtRest: 33,
            statusPanelExpanded: 200
        };

        _node.del = function () {
            var _unlinkId = _node.options.id;

            _node.slate.nodes.closeAllMenus();
            _node.slate.nodes.closeAllLineOptions();
            _node.relationships.removeAll();

            _node.slate.options.viewPort.allowDrag = true;

            //unlink any links
            _underscore2.default.each(_node.slate.nodes.allNodes, function (node) {
                if (node.options.link && node.options.link.show && node.options.link.data === _unlinkId) {
                    _underscore2.default.extend(node.options.link, { show: false, type: '', data: '' });
                    node.link.hide();
                }
            });

            _node.slate.unMarkAll();
            _node.slate.nodes.remove(_node);
        };

        function url(opt) {
            return _node.options.ajax.rootUrl + _node.options.ajax.urlFlavor + opt;
        };

        _node.getTransformString = function () {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var _transforms = [];
            var rotationTransform = void 0;
            if (opts.rotate) {
                rotationTransform = "R" + opts.rotate.rotationAngle + ", " + opts.rotate.point.x + ", " + opts.rotate.point.y;
            } else if (_node.options.rotate.rotationAngle) {
                rotationTransform = "R" + _node.options.rotate.rotationAngle + ", " + (_node.options.rotate.point.x - (opts.dx || 0)) + ", " + (_node.options.rotate.point.y - (opts.dy || 0));
            }
            _transforms.push(rotationTransform);

            if (opts.action === "translate") {
                var translationTransform = "T" + opts.dx + ", " + opts.dy;
                _transforms.push(translationTransform);
            }

            return _transforms.join(" ");
        };

        _node.setStartDrag = function () {
            _node.slate.options.viewPort.allowDrag = false;
            _node.slate.stopEditing();
            _node.connectors && _node.connectors.reset();
            _node.context && _node.context.remove();
            if (_node.menu && _node.menu.isOpen()) {
                _node.menu.wasOpen = true;
            }
            _node.slate.hideLocks();
        };

        _node.setEndDrag = function () {
            if (_node.slate && _node.slate.options.enabled) //could be null in case of the tempNode
                _node.slate.options.viewPort.allowDrag = true;

            if (_node.menu && _underscore2.default.isFunction(_node.menu.show) && _node.options.allowMenu) _node.menu.show();

            _node.slate.displayLocks();
        };

        _node.serialize = function (lineWidthOverride) {
            var jsonNode = {};
            _underscore2.default.extend(jsonNode, {
                options: _node.options
            });
            jsonNode.relationships = { associations: [] }; //, children: []
            _underscore2.default.each(_node.relationships.associations, function (association) {
                jsonNode.relationships.associations.push(bindRel(association, lineWidthOverride));
            });
            return jsonNode;
        };

        function bindRel(obj, lineWidthOverride) {
            return {
                childId: obj.child.options.id,
                parentId: obj.parent.options.id,
                isStraightLine: obj.blnStraight,
                lineColor: obj.lineColor,
                lineOpacity: obj.lineOpacity,
                lineWidth: lineWidthOverride || obj.lineWidth,
                showParentArrow: obj.showParentArrow || false,
                showChildArrow: obj.showChildArrow || false
            };
        };

        _node.addRelationships = function (json, cb) {
            //add parents
            var _lines = [];
            if (json.relationships) {

                //add associations
                if (_underscore2.default.isArray(json.relationships.associations)) {
                    _underscore2.default.each(json.relationships.associations, function (association) {
                        var _pr = association,
                            _pn = null;
                        _underscore2.default.each(_node.slate.nodes.allNodes, function (node) {
                            if (node.options.id === _pr.parentId && _node.options.id !== node.options.id) {
                                _pn = node;
                                return;
                            }
                        });
                        if (_pn) {
                            var _conn = _pn.relationships.addAssociation(_node, _pr);
                            _lines.push(_conn.line);
                            return;
                        }
                    });
                }
            }
            if (_underscore2.default.isFunction(cb)) {
                cb.apply(this, [_lines]);
            }
        };

        _node.toFront = function () {
            _underscore2.default.each(_node.relationships.children, function (child) {
                child.line.toFront();
            });
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.parents, "line"), "toFront");
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.associations, "line"), "toFront");

            _node.vect.toFront();
            _node.text.toFront();
            _node.link.toFront();
        };

        _node.toBack = function () {
            _node.link.toBack();
            _node.text.toBack();
            _node.vect.toBack();
            _underscore2.default.each(_node.relationships.children, function (child) {
                child.line.toBack();
            });
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.parents, "line"), "toBack");
            _underscore2.default.invoke(_underscore2.default.pluck(_node.relationships.associations, "line"), "toBack");
        };

        _node.hide = function () {
            _node.vect.hide();
            _node.text.hide();
            _node.options.link.show && _node.link.hide();
        };

        _node.show = function () {
            _node.vect.show();
            _node.text.show();
            _node.options.link.show && _node.link.show();
        };
        _node.rotateMoveVector = function (_ref) {
            var dx = _ref.dx,
                dy = _ref.dy;

            var _rotationAngle = -_node.options.rotate.rotationAngle * Math.PI / 180; //conversion to radians
            return {
                dx: dx * Math.cos(_rotationAngle) - dy * Math.sin(_rotationAngle),
                dy: dx * Math.sin(_rotationAngle) + dy * Math.cos(_rotationAngle)
            };
        };
        //returns an invisible path with the correct position of a path being dragged. MAKE SURE TO REMOVE IT AFTER YOU ARE DONE WITH IT or there will be a growing number of invisible paths rendering the slate unusable
        _node.getTempPathWithCorrectPositionFor = function (_ref2) {
            var pathElement = _ref2.pathElement,
                dx = _ref2.dx,
                dy = _ref2.dy,
                rotationAngle = _ref2.rotationAngle;

            var tempPath = _node.slate.paper.path(pathElement.attr("path").toString()).attr({ opacity: 0 });
            var _transforms = [];
            var bb = tempPath.getBBox();
            if (!_underscore2.default.isUndefined(dx) && !_underscore2.default.isUndefined(dy)) {
                if (_node.options.rotate.rotationAngle) {
                    var newMoveVector = _node.rotateMoveVector({ dx: dx, dy: dy });
                    _transforms.push("T" + newMoveVector.dx + "," + newMoveVector.dy);
                } else {
                    _transforms.push("T" + dx + "," + dy);
                }
            }

            if (!_underscore2.default.isUndefined(rotationAngle)) {
                _transforms.push("r" + rotationAngle + ", " + bb.cx + ", " + bb.cy);
            } else if (_node.options.rotate.rotationAngle) {
                _transforms.push("r" + _node.options.rotate.rotationAngle + ", " + _node.options.rotate.point.x + ", " + _node.options.rotate.point.y);
            }

            tempPath.transform("");
            var transformPath = (0, _getTransformedPath2.default)(tempPath.attr("path").toString(), _transforms);
            tempPath.attr({ path: transformPath });
            return tempPath;
        };

        _node.setPosition = function (p, blnKeepMenusOpen, activeNode) {
            var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


            _node.options.xPos = p.x;
            _node.options.yPos = p.y;

            var lc = _node.linkCoords();
            _node.text.attr(_node.textCoords(opts));
            _node.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());

            //close all open menus
            if (blnKeepMenusOpen !== true) {
                _node.slate.nodes.closeAllMenus(activeNode);
                _node.slate.nodes.closeAllLineOptions();
            }
        };

        _node.hideOwnMenus = function () {
            _node.link.hide();
            _node.menu.hide();
            // _lock && _lock.hide();
            // _openLock && _openLock.hide();
        };

        // _node.moveNodes = function(pkg) {
        //   _node.slate.nodes.closeAllLineOptions();
        //   _node.hideOwnMenus();
        //
        //   const allAssoc = [];
        //   _.each(_node.slate.nodes.allNodes, (node) => {
        //     _.each(node.relationships.associations, (a) => {
        //       allAssoc.push(a);
        //     });
        //   });
        //   const uniqAssoc = _.uniq(allAssoc, (a) => {
        //     return a.id;
        //   });
        //
        //   var p = pkg.data || pkg
        //     , d = p.dur || Meteor.collabAnimationDuration || 300
        //     , e = p.easing || ">";
        //   const {associations, nodeOptions} = p;
        //
        //   _.each(nodeOptions, (opts) => {
        //     const _nodeObject = _.find(_node.slate.nodes.allNodes, function (node) {
        //       return node.options.id === opts.id;
        //     });
        //
        //     _.extend(_nodeObject.options, opts);
        //
        //     const dps = _getDepCoords({x: opts.xPos, y: opts.yPos}, _nodeObject.options)
        //       , lx = dps.lx
        //       , tx = dps.tx
        //       , ty = dps.ty;
        //
        //     _nodeObject.text.animate({ x: tx, y: ty }, d, e);
        //     _nodeObject.link.animate({ x: lx, y: ty }, d, e);
        //
        //     _nodeObject && _nodeObject.vect.animate({path: opts.vectorPath}, d, e, function() {
        //       _nodeObject.vect.transform("");
        //       _nodeObject.vect.attr({path: opts.vectorPath});
        //     });
        //   });
        //
        //   _.each(associations, (assoc) => {
        //     const a = _.find(uniqAssoc, function(a) {
        //       return a.parent.options.id === assoc.parentId;
        //     });
        //
        //     a && a.line.animate({path: assoc.linePath}, d, e, function() {
        //       a.line.transform("");
        //       a.line.attr({path: assoc.linePath});
        //     });
        //   });
        // };

        _node.move = function (pkg) {
            _node.slate.nodes.closeAllLineOptions();

            //for text animation
            var p = pkg.data || pkg,
                d = p.dur || Meteor.collabAnimationDuration || 300,
                e = p.easing || ">",
                dps = (0, _getDepCoords2.default)(p, _node.options),
                lx = dps.lx,
                tx = dps.tx,
                ty = dps.ty;

            //simulate ctrl and shift keys
            _node.slate.isAlt = p.isAlt || false;
            _node.slate.isShift = p.isShift || false;

            //always hide by default
            _node.hideOwnMenus();

            //kick off the 'move' of all connected associations
            var _targX = p.x - _node.options.xPos,
                _targY = p.y - _node.options.yPos;

            _node.relationships.updateAssociationsWith({
                currentDx: _targX,
                currentDy: _targY,
                activeNode: _node.options.id,
                isUp: false,
                isShift: p.isShift,
                isAlt: p.isAlt
            });

            _node.relationships.syncAssociations(_node, function (c, a) {
                var pxx = { x: c.options.xPos + _targX, y: c.options.yPos + _targY };
                switch (c.options.vectorPath) {
                    case "ellipse":
                        pxx = { cx: c.options.xPos + _targX, cy: c.options.yPos + _targY };
                        break;
                }
                var dps = (0, _getDepCoords2.default)(pxx, c);

                var _refresher = window.setInterval(function () {
                    c.relationships.refresh(true);
                }, 10);

                c.vect.animate(pxx, d, e, function () {
                    window.clearInterval(_refresher);
                });
                c.text.animate({ x: dps.tx, y: dps.ty }, d, e);
                c.link.animate({ x: dps.lx, y: dps.ty }, d, e);

                var apath = Raphael.transformPath(a.line.attr("path"), "T" + _targX + "," + _targY);

                //console.log("line: ", bb.x, parseInt(bb.x + _targX), a.line.attr("path").toString(), apath.toString());

                a.line.animate({ path: apath }, d, e);
            });

            var onAnimate = function onAnimate(obj) {
                _node.relationships.refresh(true);
            };

            var att = {};
            switch (_node.options.vectorPath) {
                case "ellipse":
                    att = { cx: p.x, cy: p.y };
                    break;
                case "rectangle":
                case "roundedrectangle":
                    att = { x: p.x, y: p.y };
                    _node.vect.animate({ transform: "T" + _targX + "," + _targY }, d, e);
                    break;
                default:
                    att = { transform: "T" + _targX + "," + _targY };
                    break;
            }

            var _complete = function _complete(node) {
                var bb = node.vect.getBBox();
                var dx = node.options.vectorPath === "ellipse" ? bb.cx : bb.x,
                    dy = node.options.vectorPath === "ellipse" ? bb.cy : bb.y;

                node.options.xPos = dx;
                node.options.yPos = dy;

                var targetPath = Raphael.transformPath(node.vect.attr("path"), "T" + _targX + "," + _targY);
                node.vect.transform("");
                att = { path: targetPath };
                node.vect.attr(att);

                node.relationships.updateAssociationsWith({ currentDx: 0, currentDy: 0, isUp: true, isAnimating: false, isBeingAnimated: false, isShift: p.isShift, isAlt: p.isAlt });
                node.relationships.refresh();

                var lc = node.linkCoords();
                node.link.transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());
                if (node.options.link && node.options.link.show) node.link.show();
                node.slate.birdseye && node.slate.birdseye.refresh(true);
            };

            _node.text.animate({ x: tx, y: ty }, d, e);
            _node.link.animate({ x: lx, y: ty }, d, e);

            eve.on("raphael.anim.frame.*", onAnimate);

            _node.vect.animate(att, d, e, function () {
                eve.unbind("raphael.anim.frame.*", onAnimate);

                _complete(_node);

                //set association coords
                _node.relationships.syncAssociations(_node, function (c, a) {
                    c.relationships.updateAssociationsWith({ activeNode: a.activeNode, currentDx: _targX, currentDy: _targY, isShift: p.isShift, isAlt: p.isAlt });
                    if (!(p.isAlt && p.isShift) && a.activeNode === a.parent.options.id && !p.isShift) {
                        _complete(c);
                    }
                });

                _node.slate.isAlt = false;
                _node.slate.isShift = false;

                //cb
                pkg.cb && pkg.cb();
            });
        };

        _node.zoom = function (zoomPercent, duration, cb) {
            /*
            var _startZoom = _node.slate.options.viewPort.zoom.w;
            var _targetZoom = _node.slate.options.viewPort.originalWidth * (100 / parseInt(zoomPercent));
            var _zoomDif = Math.abs(_targetZoom - _startZoom);
            */

            //UNTIL PAN AND ZOOM WORKS CORRECTLY, THIS WILL
            //ALWAYS BE A AIMPLE PROXY TO ZOOMING THE SLATE
            _node.slate.canvas.zoom({
                dur: duration,
                zoomPercent: zoomPercent,
                callbacks: {
                    during: function during(percentComplete, easing) {
                        //additional calcs
                    },
                    after: function after(zoomVal) {
                        cb && cb.apply(this, [{ id: _node.options.id, operation: 'zoom', zoomLevel: zoomVal }]);
                    }
                }
            });
        };

        _node.position = function (location, cb, easing, dur) {

            easing = easing || 'easeTo'; //'swingFromTo'
            dur = dur || 500;

            var _vpt = _node.vect.getBBox(),
                zr = _node.slate.options.viewPort.zoom.r,
                d = $s.getDimensions(_node.slate.options.container),
                cw = d.width,
                ch = d.height,
                nw = _node.options.width * zr,
                nh = _node.options.height * zr,
                pad = 10;

            //get upper left coords
            var _x = _vpt.x * zr,
                _y = _vpt.y * zr;

            switch (location) {
                case "lowerright":
                    _x = _x - (cw - nw) - pad;
                    _y = _y - (ch - nh) - pad;
                    break;
                case "lowerleft":
                    _x = _x - pad;
                    _y = _y - (ch - nh) - pad;
                    break;
                case "upperright":
                    _x = _x - (cw - nw) - pad;
                    _y = _y - pad;
                    break;
                case "upperleft":
                    _x = _x - pad;
                    _y = _y - pad;
                    break;
                default:
                    //center
                    _x = _x - (cw / 2 - nw / 2);
                    _y = _y - (ch / 2 - nh / 2);
                    break;
            }

            if (_x === _node.slate.options.viewPort.left && _y === _node.slate.options.viewPort.top) {
                cb.apply();
            } else {
                _node.slate.canvas.move({
                    x: _x,
                    y: _y,
                    dur: dur,
                    callbacks: {
                        after: function after() {
                            cb.apply(this, [{ id: _node.options.id, operation: 'position', location: location, easing: easing }]);
                        }
                    },
                    isAbsolute: true,
                    easing: easing
                });
            }
        };

        _node.mark = function () {

            var _vpt = _node.vect.getBBox(),
                _x = _vpt.x,
                _y = _vpt.y;

            if (!_marker) {
                //if (_node.options.vectorPath === "ellipse") {
                //    _x = _x - (_node.options.width / 2);
                //    _y = _y - (_node.options.height / 2);
                //}
                _marker = _node.slate.paper.rect(_x - 10, _y - 10, _vpt.width + 20, _vpt.height + 20, 10).attr({ "stroke-width": _node.options.borderWidth, "stroke": "red", fill: "#ccc", "fill-opacity": .8 }).toBack();
            } else _marker.attr({ x: _x - 10, y: _y - 10, width: _vpt.width + 20, height: _vpt.height + 20 });
        };

        _node.unmark = function () {
            _marker && _marker.remove();
            _marker = null;
        };

        var lm;
        _node.unbutton = function () {
            lm && lm.unbutton();
        };

        _node.button = function (options) {
            lm = _node.slate.paper.set();
            lm.push(_node.vect);
            lm.push(_node.text);
            _underscore2.default.extend(options, { node: _node });
            lm.button(options);
        };

        //var _prevAllowDrag, _prevAllowMenu;
        _node.disable = function () {
            //_prevAllowDrag = _node.options.allowDrag;
            //_prevAllowMenu = _node.options.allowMenu;
            _node.options.allowMenu = false;
            _node.options.allowDrag = false;
            _node.hideOwnMenus();
            if (_node.slate.options.showLocks) {
                _node.showLock();
            }
            _node.relationships.unwireHoverEvents();
        };

        _node.enable = function () {
            _node.options.allowMenu = true; // _prevAllowMenu || true;
            _node.options.allowDrag = true; // _prevAllowDrag || true;
            _node.hideLock();
            _node.relationships.wireHoverEvents();
        };

        _node.showLock = function () {
            var _vpt = _node.vect.getBBox();
            var r = _node.slate.paper;
            if (!_lock && _node.slate.options.showLocks) {
                _lock = r.lockClosed().transform(["t", _vpt.x2 + 10, ",", _vpt.y - 20, "s", 0.9, 0.9].join()).attr({ fill: "#fff", stroke: "#000" });
                _lock.mouseover(function (e) {
                    _node.slate.unglow();
                    _node.hideLock();
                    var _openLock = _node.showOpenLock();
                    _node.slate.glow(_openLock);
                });
                _lock.mouseout(function (e) {
                    _node.slate.unglow();
                });
            }
            return _lock;
        };

        _node.hideLock = function () {
            _node.hideOpenLock();
            _lock && _lock.remove();
            _lock = null;
            _node.slate.unglow();
        };

        _node.showOpenLock = function () {
            var _vpt = _node.vect.getBBox();
            var r = _node.slate.paper;
            _openLock = r.lockOpen().transform(["t", _vpt.x2 + 10, ",", _vpt.y - 20, "s", 0.9, 0.9].join()).attr({ fill: "#fff", stroke: "#000" });
            _openLock.mouseover(function (e) {
                _node.slate.unglow();
                _node.slate.glow(this);
            });
            _openLock.mouseout(function (e) {
                _node.hideOpenLock();
                _node.showLock();
                _node.slate.unglow();
            });
            _openLock.mousedown(function (e) {
                _node.enable();
            });
            return _openLock;
        };

        _node.hideOpenLock = function () {
            _openLock && _openLock.remove();
            _openLock = null;
        };

        _node.initLock = function () {
            if (_node.vect && !_node.options.allowDrag && !_node.options.allowMenu) {
                _node.showLock();
            }
        };

        _node.offset = function () {
            var _x = _node.options.xPos - _node.slate.options.viewPort.left;
            var _y = _node.options.yPos - _node.slate.options.viewPort.top;
            if (_node.options.vectorPath === "ellipse") {
                _x = _x - _node.options.width / 2;
                _y = _y - _node.options.height / 2;
            }

            //var z = _node.slate.options.viewPort.zoom.r;
            //var _x = ((off.x - d.width) * z) / 2;
            //var _y = ((off.y - d.height) * z) / 2;

            return { x: _x, y: _y };
        };

        _node.textCoords = function () {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var tempPath = _node.slate.paper.path(_node.vect.attr("path")).transform(opts.transformString || "");
            var noRotationBB = tempPath.getBBox();
            var tx = noRotationBB.cx + (_node.vect.currentDx || 0);
            var ty = noRotationBB.cy + (_node.vect.currentDy || 0);
            tempPath.remove();
            return { x: tx, y: ty };
        };

        _node.linkCoords = function () {
            var x = _node.options.xPos - 20;
            var y = _node.options.yPos + _node.options.height / 2 - 22;

            if (_node.vect.type !== "rect") {
                y = _node.options.yPos + _node.options.height / 2 - 22;
                x = _node.options.xPos - 20;
            }
            return { x: x, y: y };
        };

        _node.animCoords = function () {
            var att = _self._.options.vectorPath === "ellipse" ? { cx: _self._.vect.ox + dx, cy: _self._.vect.oy + dy } : { x: _self._.vect.ox + dx, y: _self._.vect.oy + dy };
        };

        _node.init = function () {
            if (_node.options.id > -1) {
                $s.ajax(url(_node.options.ajax.nodeCreated), function (respText, resp) {
                    _node.options.holdData = eval('(' + respText + ')');
                    bindSlates(_node.options.holdData);
                }, JSON.stringify(_node.options));
            }
        };

        _node.rotate = function (_opts) {
            var opts = {
                angle: 0,
                cb: null,
                dur: 0
            };
            _underscore2.default.extend(opts, _opts);
            var ta = ["r", opts.angle].join('');

            if (opts.dur === 0) {
                _node.vect.transform(ta);
                _node.text.transform(ta);
                if (_node.options.link.show) _node.link.transform(ta);
                opts.cb && opts.cb();
            } else {
                var lm = _node.slate.paper.set();
                lm.push(_node.vect);
                lm.push(_node.text);
                if (_node.options.link.show) lm.push(_node.link);
                lm.animate({ transform: ta }, opts.dur, ">", function () {
                    opts.cb && opts.cb();
                });
            }
        };

        _underscore2.default.each($s.fn.node.fn, function (fn) {
            if (_underscore2.default.isFunction(fn)) {
                if (arguments[1].substring(0, 1) === '_') {
                    var p = arguments[1].replace("_", "");
                    _node[p] = {};
                    _node[p] = fn.apply(_node[p]);
                    _node[p]._ = _node;
                    //delete _node["_" + p];
                }
            }
        });
        return _node;
    };
    $s.fn.node.fn = $s.fn.node.prototype = {};
})(Slatebox);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._birdseye = function () {
        if (Raphael === undefined) {
            alert("You must load Raphael in order to use the Slatebox.slate.birdseye.js plugin!");
        }

        var _self = this,
            _be,
            _corner,
            _handle,
            orx,
            sp,
            options,
            _parentDimen,
            _lastX,
            _lastY,
            _wpadding,
            _hpadding;

        _self.show = function (_options) {

            options = {
                size: 200,
                onHandleMove: null
            };

            _underscore2.default.extend(options, _options);

            var c = _self._.options.container;
            _parentDimen = $s.getDimensions(c);

            _be = document.createElement('div');
            _be.setAttribute("id", "slateBirdsEye_" + _self._.options.id);
            _be.setAttribute("class", "slateBirdsEye");
            _be.style.position = "absolute";
            _be.style.height = options.size + "px";
            _be.style.width = options.size + "px";
            _be.style.border = "2px inset #333";
            _be.style.backgroundColor = "#fff";

            c.appendChild(_be);
            setBe();

            _corner = $s.instance.slate({
                container: $s.el("slateBirdsEye_" + _self._.options.id),
                viewPort: { allowDrag: false },
                collaboration: { allow: false },
                showZoom: false,
                showUndoRedo: false,
                showMultiSelect: false,
                showBirdsEye: false,
                showLocks: false,
                imageFolder: '',
                events: {
                    onNodeDragged: function onNodeDragged() {
                        //console.log("birdseye relationships changed ", pkg);
                        _self._.nodes.copyNodePositions(_corner.nodes.allNodes);
                    }
                }
            }).init();

            _self.refresh();

            $s.addEvent(window, "resize", function () {
                var c = _self._.options.container;
                _parentDimen = $s.getDimensions(c);
                setBe();
            });

            if (!_self._.options.showBirdsEye) _self.disable();
        };

        _self.enabled = function () {
            return _corner !== undefined;
        };

        _self.enable = function () {
            if (!_corner) _self.show();
            $s.el("slateBirdsEye_" + _self._.options.id).style.display = "block";
        };

        _self.disable = function () {
            $s.el("slateBirdsEye_" + _self._.options.id).style.display = "none";
        };

        function setBe() {
            _be.style.left = _parentDimen.width - options.size + "px";
            _be.style.top = "-2px";
        };

        _self.relationshipsChanged = function (pkg) {
            if (_corner) {
                switch (pkg.type) {
                    case "removeRelationship":
                        _corner.nodes.removeRelationship(pkg.data);
                        //{ parent: c.parent.options.id, child: c.child.options.id };
                        break;
                    case "addRelationship":
                        var __pkg = JSON.parse(JSON.stringify(pkg));
                        _underscore2.default.extend(__pkg.data, { options: { lineWidth: 1 } });
                        //data: { id: _self._.options.id, relationships: rels} };
                        _corner.nodes.addRelationship(__pkg.data);
                        break;
                }
            }
        };

        _self.nodeChanged = function (pkg) {
            if (_corner) {
                var _node;
                var useMainCanvas = true;
                switch (pkg.type) {
                    case 'onNodeShapeChanged':
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.shapes.set(pkg.data);
                        break;
                    case "onNodeTextChanged":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.editor.set(pkg.data.text, pkg.data.fontSize, pkg.data.fontColor);
                        break;
                    case "onNodeColorChanged":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.colorpicker.set(pkg.data);
                        break;
                    case "onNodeImageChanged":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.images.set(pkg.data.img, pkg.data.w, pkg.data.h, useMainCanvas);
                        break;
                    case "onNodeResized":
                        _node = _corner.nodes.one(pkg.data.id);
                        _underscore2.default.extend(_node.options, pkg.data);
                        _node.resize.set(pkg.data.width, pkg.data.height);
                        _node.vect.pattern && _node.resize.nodeSizeCorrection(useMainCanvas);
                        break;
                    case "onNodeRotated":
                        _node = _corner.nodes.one(pkg.data.id);

                        _underscore2.default.each(pkg.data.associations, function (association) {
                            var currentAssociation = _underscore2.default.find(_node.relationships.associations, function (ass) {
                                return ass.child.options.id === association.child.options.id && ass.parent.options.id === association.parent.options.id;
                            });
                            if (currentAssociation) {
                                currentAssociation.line.attr({ path: association.line.attr("path").toString() });
                            }
                        });

                        delete pkg.data.associations;

                        _underscore2.default.extend(_node.options, pkg.data);
                        var tempPath = Meteor.currentSlate.paper.path(_node.vect.attr("path"));
                        var opts = {
                            boundingClientRect: tempPath[0].getBoundingClientRect()
                        };
                        tempPath.remove();
                        _node.rotate.applyImageRotation(opts);
                        break;
                    case "onNodeToFront":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.vect.toFront();
                        break;
                    case "onNodeToBack":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.vect.toBack();
                        break;
                    case "onNodeLocked":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.options.allowDrag = false;
                    case "onNodeUnlocked":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.options.allowDrag = true;
                        break;
                    case "changeLineColor":
                        _node = _corner.nodes.one(pkg.data.id);
                        _node.lineOptions.set(pkg.data);
                        break;
                    case "onNodesMove":
                        _node = _self._.nodes.one(pkg.data.id);
                        // _node.moveNodes(pkg);
                        _corner.nodes.moveNodes(pkg, { useMainCanvas: true });
                        break;
                }
            }
        };

        _self.nodeDeleted = function (pkg) {
            if (_corner) {
                var _node = _corner.nodes.one(pkg.data.id);
                _node.del();
            }
        };

        _self.nodeDetatched = function (pkg) {
            if (_corner) {
                var _node = _corner.nodes.one(pkg.data.id);
                _node.relationships.detatch();
            }
        };

        _self.reload = function (json) {
            if (_handle) _handle.remove();
            _corner.loadJSON(json);
            _self.refresh(true);
        };

        _self.refresh = function (blnNoAdditions) {
            if (_corner) {

                var c = _self._.options.container;
                _parentDimen = $s.getDimensions(c);

                if (_handle) _handle.remove();

                if (blnNoAdditions === true) {
                    _corner.canvas.move({ x: _self._.options.viewPort.left, y: _self._.options.viewPort.top, dur: 0, isAbsolute: true });
                    var useMainCanvas = true;
                    _corner.nodes.copyNodePositions(_self._.nodes.allNodes, useMainCanvas); //repositionNodes();
                } else {
                    var _export = _self._.exportDifference(_corner, 1); //line width override                    
                    _corner.loadJSON(_export, true, true, true, true);
                }

                orx = _self._.getOrientation();

                if (_self._.options.viewPort.left < orx.left) _wpadding = _self._.options.viewPort.left - orx.left;else _wpadding = _self._.options.viewPort.left - orx.left + (_parentDimen.width - orx.width); // (_self._.options.viewPort.left + _parentDimen.width) - (orx.left + orx.width);

                _hpadding = _self._.options.viewPort.top - orx.top;

                var _pw = Math.max(Math.abs(_wpadding), orx.width < _parentDimen.width ? _parentDimen.width - orx.width : 0);
                var _ph = Math.max(Math.abs(_hpadding), orx.height < _parentDimen.height ? _parentDimen.height - orx.height : 0);

                var wp = (orx.width + _pw) / options.size * _self._.options.viewPort.width;
                var hp = (orx.height + _ph) / options.size * _self._.options.viewPort.height;

                sp = Math.max(wp, hp);

                var _r = Math.max(_self._.options.viewPort.width, _self._.options.viewPort.height) / sp;
                var l = (orx.left + (_wpadding < 0 ? _wpadding : 0)) * _r - 5;
                var t = (orx.top + (_hpadding < 0 ? _hpadding : 0)) * _r - 5;

                _corner.zoom(0, 0, sp, sp, true);
                _corner.options.viewPort.zoom.r = _corner.options.viewPort.originalWidth / sp;
                _corner.canvas.move({ x: l, y: t, dur: 0, isAbsolute: true });
                _corner.disable();

                var _ix = _self._.options.viewPort.left / _self._.options.viewPort.zoom.r; // +_wpadding; // orx.left; // -(orx.left - _self._.options.viewPort.left); //+_self._.options.viewPort.left; // orx.left + orx.width / 2;
                var _iy = _self._.options.viewPort.top / _self._.options.viewPort.zoom.r; // +_hpadding; // orx.top; // -(orx.top - _self._.options.viewPort.top); //+_self._.options.viewPort.top; // orx.top + orx.height / 2;

                var _w = _parentDimen.width / _self._.options.viewPort.zoom.r,
                    _h = _parentDimen.height / _self._.options.viewPort.zoom.r;
                _handle = _corner.paper.rect(_ix, _iy, _w, _h).attr({ stroke: 'red', "stroke-width": 1, fill: "#f8f8f8", "fill-opacity": ".6" });

                wireHandle();
            }
        };

        var init = function init() {
            _handle.ox = this.attr("x");
            _handle.oy = this.attr("y");
        };

        var move = function move(x, y) {

            var _zr = _corner.options.viewPort.originalWidth / sp;
            x = x + (x / _zr - x);
            y = y + (y / _zr - y);

            var _mx = _handle.ox + x;
            var _my = _handle.oy + y;

            _handle.attr({ x: _mx, y: _my });

            var bb = _handle.getBBox();
            var _cx = bb.x * _self._.options.viewPort.zoom.r; // -_parentDimen.width / 2;
            var _cy = bb.y * _self._.options.viewPort.zoom.r; // -_parentDimen.height / 2;

            if (_underscore2.default.isFunction(options.onHandleMove)) {
                options.onHandleMove.apply(this, [_cx, _cy]);
            };

            _self._.canvas.move({ x: _cx, y: _cy, dur: 0, isAbsolute: true });

            _lastX = bb.x;
            _lastY = bb.y;
            _lastOrx = orx;

            //_handle.transform(["t", x, y].join());
        };

        var up = function up(e) {
            _self.refresh();
            _self._.canvas.broadcast();
        };

        function wireHandle() {
            _handle.drag(move, init, up);
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._canvas = function () {
        if (Raphael === undefined) {
            alert("You must load Raphael in order to use the Slatebox.slate.canvas.js plugin!");
        }

        var _self = this,
            _paper,
            _internal,
            _status,
            imageFolder,
            _dken = null;

        var cp = function cp(e) {
            var m = $s.mousePos(e);

            difX = Canvas.objInitPos.left + (m.x - Canvas.objInitialMousePos.x);
            difY = Canvas.objInitPos.top + (m.y - Canvas.objInitialMousePos.y);

            _width = _self._.options.containerStyle.width;
            _height = _self._.options.containerStyle.height;
            _vpWidth = _self._.options.viewPort.width;
            _vpHeight = _self._.options.viewPort.height;

            if (difX > 0) difX = 0;else if (Math.abs(difX) + _width > _vpWidth) difX = _width - vpWidth;
            if (difY > 0) difY = 0;else if (Math.abs(difY) + _height > _vpHeight) difY = _height - _vpHeight;

            return { x: difX, y: difY };
        };

        var Canvas = {
            objInitPos: {},
            objInitialMousePos: { x: 0, y: 0 },
            kinetic: null,
            isDragging: false,
            initDrag: function initDrag(e) {

                _self._.options.events && _self._.options.events.onCanvasClicked && _self._.options.events.onCanvasClicked();

                if (_self._.options.viewPort.allowDrag) {
                    _self._.multiselection && _self._.multiselection.end();
                    this.isDragging = true;
                    var m = $s.mousePos(e);
                    Canvas.objInitPos = $s.positionedOffset(_internal);
                    var offsets = $s.positionedOffset(_self._.options.container);
                    Canvas.objInitialMousePos = { x: m.x + offsets.left, y: m.y + offsets.top };

                    var xy = cp(e);

                    _status.innerHTML = Math.abs(xy.x) + ', ' + Math.abs(xy.y);

                    if (_self._.options.showStatus) {
                        _status.style.display = 'block';
                        _self._.multiselection && _self._.multiselection.hide();
                    }

                    _internal.style.cursor = 'url(' + imageFolder + 'closedhand.cur), default';

                    if (m.allTouches) {
                        _self._.options.lastTouches = m.allTouches;
                    }

                    if (_underscore2.default.isFunction(_self._.removeContextMenus)) _self._.removeContextMenus();
                    $s.stopEvent(e);
                } else {
                    if (_underscore2.default.isFunction(_self._.onSelectionStart)) {
                        _self._.onSelectionStart.apply(this, [e]);
                    } else {
                        $s.stopEvent(e);
                    }
                }
            },
            setCursor: function setCursor(containerInstance) {
                if (this.isDragging) _internal.style.cursor = 'url(' + imageFolder + 'closedhand.cur), default';else _internal.style.cursor = 'url(' + imageFolder + 'openhand.cur), default';
            },
            onDrag: function onDrag(e) {
                if (this.isDragging && _self._.options.viewPort.allowDrag) {
                    var xy = cp(e);
                    if (xy.allTouches && xy.allTouches.length > 1) {
                        _self._.options.lastTouches = xy.allTouches;
                    }

                    _status.innerHTML = Math.abs(xy.x) + ', ' + Math.abs(xy.y);
                    _internal.style.left = xy.x + "px";
                    _internal.style.top = xy.y + "px";
                }
            },
            endDrag: function endDrag(e) {
                if (this.isDragging && _self._.options.viewPort.allowDrag) {
                    this.isDragging = false;
                    //var m = $s.mousePos(e);

                    _internal.style.cursor = 'url(' + imageFolder + 'openhand.cur), default';
                    _status.style.display = 'none';
                    _self._.multiselection && _self._.multiselection.show();

                    var xy = cp(e);
                    _self.endDrag(xy);

                    /*
                    if (!isNaN(Canvas.objInitPos.left)) {
                    difX = Canvas.objInitPos.left + (Canvas.objInitialMousePos.x);
                    difY = Canvas.objInitPos.top + (Canvas.objInitialMousePos.y);
                      _width = _self._.options.containerStyle.width;
                    _height = _self._.options.containerStyle.height;
                      vpWidth = _self._.options.viewPort.width; //* _self._.options.viewPort.zoom) / _self._.options.viewPort.width;
                    vpHeight = _self._.options.viewPort.height // * _self._.options.viewPort.zoom) / _self._.options.viewPort.height;
                      if (difX >= 0) difX = 0; else if (Math.abs(difX) + _width > vpWidth) difX = _width - vpWidth;
                    if (difY >= 0) difY = 0; else if (Math.abs(difY) + _height > vpHeight) difY = _height - vpHeight;
                    Canvas.objInitPos = {};
                      _self._.options.viewPort.left = Math.abs(difX); // Math.abs((difX * _self._.options.viewPort.zoom) / _self._.options.viewPort.width);
                    _self._.options.viewPort.top = Math.abs(difY); // Math.abs((difY * _self._.options.viewPort.zoom) / _self._.options.viewPort.height);
                    //Canvas.saveAndBroadcast(difX, difY);
                    }
                    */
                }
            }
        };

        _self.endDrag = function (coords) {
            _self._.options.viewPort.left = Math.abs(coords.x); // Math.abs((difX * _self._.options.viewPort.zoom) / _self._.options.viewPort.width);
            _self._.options.viewPort.top = Math.abs(coords.y); // Math.abs((difY * _self._.options.viewPort.zoom) / _self._.options.viewPort.height);

            _internal.style.left = coords.x + "px";
            _internal.style.top = coords.y + "px";

            _self._.birdseye && _self._.birdseye.refresh(true);

            if (_self._.options.collaboration.allow) _self.broadcast();
        };

        _self.broadcast = function () {
            _self._.collab && _self._.collab.send({ type: "onCanvasMove", data: { left: _self._.options.viewPort.left, top: _self._.options.viewPort.top } });
        };

        _self.zoom = function (_opts) {

            var opts = {
                dur: 500,
                callbacks: { after: null, during: null },
                easing: 'easeFromTo',
                zoomPercent: 100
            };

            _underscore2.default.extend(opts, _opts);

            _self._.nodes.closeAllConnectors();
            var dc = _underscore2.default.isFunction(opts.callbacks.during);

            var _startZoom = _self._.options.viewPort.zoom.w;
            var _targetZoom = _self._.options.viewPort.originalWidth * (100 / parseInt(opts.zoomPercent));
            var _zoomDif = Math.abs(_targetZoom - _startZoom);

            opts.dur = opts.dur || 500;

            //_internal.style.transform = perspective(config.perspective / targetScale) + scale(_zoomDif);
            //_internal.style.transitionDuration = opts.dur + "ms";
            //_internal.style.transitionDelay = "0ms";

            emile(_internal, "padding:1px", {
                duration: opts.dur,
                before: function before() {
                    _self._.options.viewPort.allowDrag = false;
                },
                after: function after() {
                    _self._.options.viewPort.allowDrag = true;
                    _self._.zoomSlider.set(_targetZoom);
                    _self._.birdseye && _self._.birdseye.refresh(true);
                    opts.callbacks.after && opts.callbacks.after.apply(_self, [_targetZoom]);
                },
                during: function during(pc) {
                    var _val = _targetZoom > _startZoom ? _startZoom + _zoomDif * pc : _startZoom - _zoomDif * pc;
                    _self._.zoom(0, 0, _val, _val, false);
                    _self._.canvas.resize(_val);

                    dc && opts.callbacks.during.apply(this, [pc]);
                },
                easing: _self.easing[opts.easing]
            });
        };

        _self.scaleToFitNodes = function (_opts) {
            var opts = {
                nodes: [],
                dur: 500,
                cb: null,
                offset: 0,
                minWidth: 60,
                minHeight: 30
            };
            _underscore2.default.extend(opts, _opts);

            var orient = _self._.getOrientation(opts.nodes),
                d = $s.getDimensions(_self._.options.container),
                r = _self._.options.viewPort.zoom.r || 1,
                _tp = 1,
                _widthZP = parseInt(d.width / (orient.width / r) * 100) //division by r converts it back from the scaled version
            ,
                _heightZP = parseInt(d.height / (orient.height / r) * 100);

            switch (orient.orientation) {
                case "landscape":
                    _tp = _widthZP;
                    break;
                case "portrait":
                    _tp = _heightZP;
                    break;
            }
            //_tp = parseInt(_tp * 100);

            console.log("zoom ", _tp, orient.orientation);

            //zoom canvas
            _self.zoom({
                dur: opts.dur,
                callbacks: {
                    after: function after() {
                        opts.cb && opts.cb();
                    }
                },
                easing: 'easeFromTo',
                zoomPercent: _tp
            });
        };

        //useful for centering the canvas on a collection of nodes
        _self.centerOnNodes = function (_opts) {
            var opts = {
                nodes: [],
                dur: 500,
                cb: null
            };
            _underscore2.default.extend(opts, _opts);
            var orient = _self._.getOrientation(opts.nodes);
            var d = $s.getDimensions(_self._.options.container);
            var cw = d.width,
                ch = d.height,
                nw = orient.width,
                nh = orient.height,
                pad = 10;

            //console.log("orient width: " + nw + " , height: " + nh + " | width: " + cw + " , height: " + ch);

            //get upper left coords
            var _x = orient.left - (cw / 2 - nw / 2);
            var _y = orient.top - (ch / 2 - nh / 2);

            _self.move({ x: _x, y: _y, isAbsolute: true, dur: opts.dur, easing: 'swingFromTo', callbacks: { after: function after() {
                        opts.cb && opts.cb();
                    } } });
        };

        //useful for centering the canvas by comparing the viewport's previous width/height to its current width/height        
        _self.center = function (_opts) {
            var opts = {
                previousWindowSize: {},
                dur: 500,
                cb: null
            };
            _underscore2.default.extend(opts, _opts);
            var ws = $s.windowSize();
            _self.move({
                x: (ws.width - opts.previousWindowSize.w) / 2 * -1,
                y: (ws.height - opts.previousWindowSize.h) / 2 * -1,
                duration: opts.dur,
                isAbsolute: false,
                easing: 'swingFromTo',
                callbacks: {
                    after: function after() {
                        opts.cb && opts.cb();
                    }
                }
            });
            return ws;
        };

        _self.move = function (_opts) {
            var opts = {
                x: 0,
                y: 0,
                dur: 500,
                callbacks: { after: null, during: null },
                isAbsolute: true,
                easing: 'easeFromTo'
            };

            _underscore2.default.extend(opts, _opts);

            _self._.nodes.closeAllConnectors();
            var x = opts.x;
            var y = opts.y;
            var dc = _underscore2.default.isFunction(opts.callbacks.during);
            if (opts.isAbsolute === false) {
                x = _self._.options.viewPort.left + x;
                y = _self._.options.viewPort.top + y;
            }

            if (opts.dur > 0) {
                emile(_internal, "left:" + x * -1 + "px;top:" + y * -1 + "px", {
                    duration: opts.dur,
                    before: function before() {
                        _self._.options.viewPort.allowDrag = false;
                    },
                    after: function after() {
                        _self._.options.viewPort.allowDrag = true;
                        _self._.options.viewPort.left = Math.abs(parseInt(_internal.style.left.replace("px", "")));
                        _self._.options.viewPort.top = Math.abs(parseInt(_internal.style.top.replace("px", "")));
                        _self._.birdseye && _self._.birdseye.refresh(true);
                        opts.callbacks.after && opts.callbacks.after.apply(_self);
                    },
                    during: function during(pc) {
                        dc && opts.callbacks.during.apply(this, [pc]);
                    },
                    easing: _self.easing[opts.easing]
                });
            } else {
                //x = Math.abs(_self._.options.viewPort.left) + Math.abs(x) * -1;
                //y = Math.abs(_self._.options.viewPort.top) + Math.abs(y) * -1;
                _internal.style.left = x * -1 + "px";
                _internal.style.top = y * -1 + "px";
                _self._.options.viewPort.left = Math.abs(x);
                _self._.options.viewPort.top = Math.abs(y);
            }
        };

        _self.resize = function (val) {

            val = parseInt(val);

            var R = _self._.options.viewPort.width / val;
            var dimen = $s.getDimensions(_self._.options.container);

            //_internal.style.width = "50000px";
            //_internal.style.height = "50000px";

            var _top = _self._.options.viewPort.top * -1 * R;
            var _left = _self._.options.viewPort.left * -1 * R;

            var _centerY = (dimen.height / 2 * R - dimen.height / 2) * -1;
            var _centerX = (dimen.width / 2 * R - dimen.width / 2) * -1;

            _top = _top + _centerY;
            _left = _left + _centerX;

            _internal.style.top = _top + "px";
            _internal.style.left = _left + "px";

            _self._.options.viewPort.zoom = { w: val, h: val, l: parseInt(_left * -1), t: parseInt(_top * -1), r: _self._.options.viewPort.originalWidth / val };
            //console.log(val);
            //if (_self._.options.viewPort.lockZoom === false) z.r = R;
        };

        _self.clear = function () {
            _self._.options.container.innerHTML = "";
            return _self._;
        };

        var _eve = {
            init: ['onmousedown', 'ontouchstart'],
            drag: ['onmousemove', 'ontouchmove'],
            up: ['onmouseup', 'ontouchend', 'onmouseout'],
            gest: ['ongesturestart', 'ongesturechange', 'ongestureend']
        };

        _self.wire = function () {

            for (var ee in _eve.init) {
                _internal[_eve.init[parseInt(ee)]] = Canvas.initDrag;
            }
            for (var ee in _eve.drag) {
                _internal[_eve.drag[parseInt(ee)]] = Canvas.onDrag;
            }
            for (var ee in _eve.up) {
                _internal[_eve.up[parseInt(ee)]] = Canvas.endDrag;
            }

            var origVal, zoomX, zoomY;
            _internal.ongesturestart = function (e) {
                e.preventDefault();
                _self._.options.viewPort.allowDrag = false;
                if (_self._.options.lastTouches) {
                    var lt = _self._.options.lastTouches;
                    zoomX = lt[0].x;
                    zoomY = lt[0].y;
                    if (lt.length > 1) {
                        zoomX = (Math.max(lt[0].x, lt[1].x || 0) - Math.min(lt[0].x, lt[1].x || lt[0].x)) / 2; // + Math.min(lt[0].x, lt[1].x || lt[0].x);
                        zoomY = (Math.max(lt[0].y, lt[1].y || 0) - Math.min(lt[0].y, lt[1].y || lt[0].y)) / 2; // + Math.min(lt[0].y, lt[1].y || lt[0].y);
                    }
                    origVal = _self._.options.viewPort.zoom.w;
                    //_self._.paper.rect(xMiddle + _self._.options.viewPort.left, yMiddle + _self._.options.viewPort.top, 10, 10);
                }
            };
            _internal.ongesturechange = function (e) {
                var val = origVal / e.scale;

                _self._.zoom(0, 0, val, val, false);
                _self._.canvas.resize(val); //, zoomX, zoomY

                $s.select('li.rmitem')[0].innerHTML = _self._.options.lastTouches[0].x + " , " + _self._.options.lastTouches[1].x;
            };
            _internal.ongestureend = function (e) {
                _self._.options.viewPort.allowDrag = true;
                //try expanding the canvas -- i think this is consistently firing, but the _internal is out of scope after a bit...

                //$s.select('li.rmitem')[0].innerHTML = z.w + " , " + z.h + " , " + z.l + " , " + z.t;
                var z = _self._.options.viewPort.zoom;
                var vp = _self._.options.viewPort;
                vp.width = z.w;
                vp.height = z.h;
                vp.left = z.l;
                vp.top = z.t;
            };
        };

        _self.unwire = function () {
            for (var ee in _eve.init) {
                _internal[_eve.init[parseInt(ee)]] = null;
            }
            for (var ee in _eve.drag) {
                _internal[_eve.drag[parseInt(ee)]] = null;
            }
            for (var ee in _eve.up) {
                _internal[_eve.up[parseInt(ee)]] = null;
            }
            for (var ee in _eve.gest) {
                _internal[_eve.gest[parseInt(ee)]] = null;
            }
        };

        _self.init = function (_options) {
            var c = _self._.options.container,
                opts = _self._.options;
            imageFolder = opts.imageFolder || "/images/";
            if (typeof c === "string") c = $s.el(c);
            if (c === undefined || c === null) {
                throw new Error("You must provide a container to initiate the canvas!");
            }

            /*
            var _cw = _self._.options.containerStyle.width + "px";
            var _ch = _self._.options.containerStyle.height + "px";
            if (_self._.options.containerStyle.width === 'auto') {
            _ws = $s.windowSize();
            _self._.options.containerStyle.width = _ws.width;
            _self._.options.containerStyle.height = _ws.height;
            _cw = _ws.width + "px";
            _ch = _ws.height + "px"
            }
              c.style.width = _cw;
            c.style.height = _ch;
            */

            //wipe it clean
            c.innerHTML = "";
            if (_paper) _paper.clear();

            if (_internal) c.removeChild(_internal);

            //internal
            _internal = document.createElement('div');
            _internal.setAttribute("class", "slateboxInternal");
            c.appendChild(_internal);

            //status
            var d = $s.getDimensions(c);
            _status = document.createElement("div");
            _status.style.position = "absolute";
            _status.style.height = "20px";
            _status.style.left = '5px';
            _status.style.color = "#000";
            _status.style.fontSize = "10pt";
            _status.style.fontFamily = "trebuchet ms";
            _status.style.top = "0px";
            _status.style.display = "none";
            _status.style.padding = "5px";
            _status.style.filter = "alpha(opacity=80)";
            _status.style.opacity = '.80';
            _status.style.backgroundColor = "#ffff99";
            _status.style.fontWeight = "bold";
            c.appendChild(_status);

            //style container
            var cs = opts.containerStyle;
            //c.style.border = cs.border;
            //c.style.backgroundImage = cs.backgroundImage;
            //c.style.backgroundRepeat = cs.backgroundImageIsTiled; bad for ie
            c.style.position = "relative";
            c.style.overflow = "hidden";

            //style internal
            var _w = opts.viewPort.width;
            var _h = opts.viewPort.height;
            var _l = opts.viewPort.left;
            var _t = opts.viewPort.top;
            _internal.style.width = _w + "px";
            _internal.style.height = _h + "px";
            _internal.style.left = _l * -1 + "px";
            _internal.style.top = _t * -1 + "px";
            _internal.style.position = 'absolute';
            _self.borderTop = _self.borderTop + 2 || 2;
            _internal.style.borderTop = _self.borderTop + "px";
            _internal.style.cursor = 'url(' + imageFolder + 'openhand.cur), default';
            _internal.style.backgroundColor = cs.backgroundColor || "#fff";

            if (opts.viewPort.allowDrag) {
                _self.wire();
            }

            console.log("creating canvas ", _w, _h, _internal);
            _paper = Raphael(_internal, _w, _h);

            opts.viewPort.originalHeight = _h;
            opts.viewPort.originalWidth = _w;

            //set up initial zoom params
            _self.resize(_w);

            //show zoom slider
            if (opts.showZoom) {
                _self._.zoomSlider.show();
                _self._.zoomSlider.setValue(opts.viewPort.width);
            }

            //show undo redo
            if (opts.showUndoRedo) {
                _self._.undoRedo.show();
            }

            //show birdseye
            if (opts.showBirdsEye) {
                if (_self._.birdseye.enabled()) {
                    _self._.birdseye.reload(_self._.exportJSON());
                } else {
                    _self._.birdseye.show({
                        size: opts.sizeOfBirdsEye || 200,
                        onHandleMove: function onHandleMove(left, top) {}
                    });
                }
            }

            _self._.paper = _paper;
            return _self._;
        };

        _self.rawSVG = function () {
            return _internal.innerHTML;
        };

        _self.darken = function (percent) {
            if (_dken === null) {
                _dken = document.createElement("div");
                var ws = $s.windowSize();
                _dken.style.backgroundColor = '#ccc';
                _dken.style.position = 'absolute';
                _dken.style.left = '0px';
                _dken.style.top = '0px';
                _dken.style.width = ws.width + "px";
                _dken.style.height = ws.height + "px";
                _dken.style.zIndex = 999;
                _dken.style.filter = "alpha(opacity=" + percent + ")";
                _dken.style.opacity = percent / 100;
                document.body.appendChild(_dken);
            }
            return _dken;
        };

        $s.addEvent(window, "resize", function () {
            if (_dken !== null) {
                var ws = $s.windowSize();
                _dken.style.width = ws.width + "px";
                _dken.style.height = ws.height + "px";
            }
        });

        _self.lighten = function () {
            _dken && document.body.removeChild(_dken);
            _dken = null;
        };

        _self.refreshBackground = function () {
            _internal.style.backgroundColor = _self._.options.containerStyle.backgroundColor || "#fff";
        };

        _self.get = function () {
            return _internal;
        };

        _self.draggable = function () {
            return _internal;
        };

        _self.easing = {
            elastic: function elastic(pos) {
                return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
            },
            swingFromTo: function swingFromTo(pos) {
                var s = 1.70158;return (pos /= 0.5) < 1 ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s)) : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
            },
            swingFrom: function swingFrom(pos) {
                var s = 1.70158;return pos * pos * ((s + 1) * pos - s);
            },
            swingTo: function swingTo(pos) {
                var s = 1.70158;return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
            },
            bounce: function bounce(pos) {
                if (pos < 1 / 2.75) {
                    return 7.5625 * pos * pos;
                } else {
                    if (pos < 2 / 2.75) {
                        return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
                    } else {
                        if (pos < 2.5 / 2.75) {
                            return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
                        } else {
                            return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
                        }
                    }
                }
            },
            bouncePast: function bouncePast(pos) {
                if (pos < 1 / 2.75) {
                    return 7.5625 * pos * pos;
                } else {
                    if (pos < 2 / 2.75) {
                        return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
                    } else {
                        if (pos < 2.5 / 2.75) {
                            return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
                        } else {
                            return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
                        }
                    }
                }
            },
            easeFromTo: function easeFromTo(pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 4);
                }return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
            },
            easeFrom: function easeFrom(pos) {
                return Math.pow(pos, 4);
            },
            easeTo: function easeTo(pos) {
                return Math.pow(pos, 0.25);
            },
            none: function none(pos) {
                return -Math.cos(pos * Math.PI) / 2 + 0.5;
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($s, $slate) {
    $slate.fn._keyboard = function () {
        var _self = this,
            hoverNode = null;

        _self.start = function (_hoverNode) {
            hoverNode = _hoverNode;
            $s.addEvent(document, "keydown", _press);
        };

        var _press = function _press(e) {
            var _key = $s.getKey(e);
            if (hoverNode) {
                hoverNode.context && hoverNode.context.remove();
                switch (_key) {
                    case 39:
                        //left
                        hoverNode.connectors.addNode(true);
                        break;
                    case 46:
                        //delete
                        hoverNode.toolbar.del();
                        break;
                }
                return $s.stopEvent(e);
            } else if (_self._.multiselection && _self._.multiselection.isSelecting()) {
                switch (_key) {
                    case 46:
                        //delete
                        _self._.multiselection.del();
                        break;
                }
            }
        };

        _self.end = function () {
            hoverNode = null;
            if (!_self._.multiselection.isSelecting()) {
                $s.removeEvent(document, "keydown", _press);
            }
        };

        function _key(e, bln) {
            var _key = $s.getKey(e);
            switch (_key) {
                case 17:
                    //ctrl
                    _self._.isCtrl = bln;
                    break;
                case 16:
                    //shift
                    _self._.isShift = bln;
                    break;
                case 18:
                    //alt
                    _self._.isAlt = bln;
                    break;
            }
        };

        var _globalDown = function _globalDown(e) {
            _key(e, true);
        };

        var _globalUp = function _globalUp(e) {
            setTimeout(function () {
                _key(e, false);
            }, 100); //gives the move collab event a moment to catch up
        };

        //perpetual look
        $s.addEvent(document, "keydown", _globalDown);
        $s.addEvent(document, "keyup", _globalUp);

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($s, $slate) {
    $slate.fn._message = function () {
        var _self = this;

        _self.show = function (msg, time) {
            var mb = _self._.messageBox;
            var d = $s.getDimensions(_self._.options.container);

            if (_self._.messageBox === undefined) {
                var r = _self._.paper;
                mb = _self._.messageBox = r.set();
                mb.push(r.rect(0, 0, d.width, 28, 7).attr({ fill: "#ffff99" }));
                mb.push(r.text(0, 0, "").standard());
            }

            mb.show();

            mb[1].attr({ text: msg });
            var _w = mb[1].getBBox().width;
            mb[0].attr({ width: _w + 12 });

            var _x = _self._.options.viewPort.left + (d.width - mb[0].attr("width")) / 2;
            var _y = _self._.options.viewPort.top + 3;
            mb[0].attr({ x: _x, y: _y, "fill-opacity": 0 });
            mb[1].attr({ x: _x + _w / 2 + 6, y: _y + 13, "fill-opacity": 0 });

            mb.animate({ "fill-opacity": 1 }, 500, function () {
                setTimeout(function () {
                    mb.animate({ "fill-opacity": 0 }, 500, function () {
                        mb.hide();
                    });
                }, time);
            });
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate, $) {
    $slate.fn._collab = function () {
        var _self = this,
            options,
            _invoker,
            pc;

        _self.init = function () {
            pc = _self._.options.collaboration || {};
            if (!$s.localRecipients) $s.localRecipients = [];
            wire();
        };

        _self.invoke = function (pkg) {
            _invoker[pkg.type](pkg);
        };

        function process(pkg) {
            if ($s.localRecipients.length > 1) {
                var _time = 0;
                for (var s in $s.localRecipients) {
                    _time += 10;
                    (function (rec, t) {
                        setTimeout(function () {
                            rec["_"]["collab"]["invoke"](pkg);
                        }, t);
                    })($s.localRecipients[s], _time);
                }
            } else if (_invoker[pkg.type]) {
                _self._.undoRedo && _self._.undoRedo.hide();
                _invoker[pkg.type](pkg);
            } else {
                pc.onCollaboration && pc.onCollaboration({ type: "custom", slate: _self._, pkg: pkg });
            }
        };

        function wire() {

            _invoker = {

                onZoom: function onZoom(pkg) {
                    var zoomPercent = _self._.options.viewPort.originalWidth / pkg.data.zoomLevel * 100;
                    _self._.canvas.zoom({
                        dur: pkg.data.duration || 500,
                        zoomPercent: zoomPercent,
                        callbacks: {
                            during: function during(percentComplete, easing) {
                                //additional calcs
                            },
                            after: function after(zoomVal) {
                                addMessage(pkg, 'That was me\n zooming the canvas!');
                            }
                        }
                    });
                },

                onNodePositioned: function onNodePositioned(pkg) {
                    var cn = _self._.nodes.one(pkg.data.id);
                    cn.position(pkg.data.location, function () {}, pkg.data.easing, pkg.data.duration || 500);
                    addMessage(pkg, 'That was me\n positioning the node!');
                },

                onNodeLinkRemoved: function onNodeLinkRemoved(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.links && cn.links.unset();
                    addMessage(pkg, 'That was me\n removing the link!');
                },

                onNodeLinkAdded: function onNodeLinkAdded(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.links && cn.links.set(pkg.data.linkType, pkg.data.linkData);
                    addMessage(pkg, 'That was me\n adding the resource link!');
                },

                onNodeUnlocked: function onNodeUnlocked(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.options.allowDrag = true;
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n unlocking the node!');
                },

                onNodeLocked: function onNodeLocked(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.options.allowDrag = false;
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n locking the node!');
                },

                onNodeToBack: function onNodeToBack(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.vect.toBack();
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n send to back!');
                },

                onNodeToFront: function onNodeToFront(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.vect.toFront();
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n bringing to front!');
                },

                onNodeShapeChanged: function onNodeShapeChanged(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.shapes.set(pkg.data);
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n changing the shape!');
                },

                onNodeAdded: function onNodeAdded(pkg) {
                    var blnPreserve = pkg.preserve !== undefined ? pkg.preserve : true;
                    _self._.loadJSON(pkg.data, blnPreserve, true);
                    //_self._.birdseye && _self._.birdseye.refresh();
                    addMessage(pkg, 'That was me\n adding the node!');
                },

                onNodeImageChanged: function onNodeImageChanged(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.images.set(pkg.data.img, pkg.data.w, pkg.data.w);
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n changing the image!');
                },

                onNodeDeleted: function onNodeDeleted(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.del();
                    _self._.birdseye && _self._.birdseye.nodeDeleted(pkg);
                    addMessage(pkg, 'That was me\n deleting the node!');
                },

                onNodeResized: function onNodeResized(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.hideOwnMenus();
                    _underscore2.default.extend(cn.options, pkg.data);
                    cn.resize.set(pkg.data.width, pkg.data.height, 500);
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n changing the size!');
                },

                onNodeRotated: function onNodeRotated(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.hideOwnMenus();
                    var previousRotationAngle = cn.options.rotate.rotationAngle;
                    _underscore2.default.extend(cn.options, pkg.data);
                    cn.rotate.set(pkg.data.rotate.rotationAngle - previousRotationAngle, 500);
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n rotating the node!');
                },

                onNodeColorChanged: function onNodeColorChanged(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.colorpicker.set(pkg.data);
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n changing the color!');
                },

                onNodeTextChanged: function onNodeTextChanged(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.editor.set(pkg.data.text, pkg.data.fontSize, pkg.data.fontColor);
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n changing the text!');
                },

                addRelationship: function addRelationship(pkg) {
                    _self._.nodes.addRelationship(pkg.data);
                    _self._.birdseye && _self._.birdseye.relationshipsChanged(pkg);
                    addMessage(pkg, 'That was me\n adding the relationship!');
                },

                removeRelationship: function removeRelationship(pkg) {
                    _self._.nodes.removeRelationship(pkg.data);
                    _self._.birdseye && _self._.birdseye.relationshipsChanged(pkg);
                    addMessage(pkg, 'That was me\n removing the relationship!');
                },
                //was replaced by onNodesMove, but I will leave this for now in case we want to animate a single node in future
                onNodeMove: function onNodeMove(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.move(pkg);
                    addMessage(pkg, 'That was me\n moving the node!');
                },

                onNodesMove: function onNodesMove(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    // cn.moveNodes(pkg);
                    var animate = true;
                    cn.slate.nodes.moveNodes(pkg, { animate: animate });
                    cn.slate.birdseye && cn.slate.birdseye.nodeChanged(pkg);
                    addMessage(pkg, 'That was me\n moving the node!');
                },

                changeLineColor: function changeLineColor(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.lineOptions.set(pkg.data);
                    addMessage(pkg, 'That was me\n changing the line color!');
                    _self._.birdseye && _self._.birdseye.nodeChanged(pkg);
                },

                changeLineWidth: function changeLineWidth(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.lineOptions.set(pkg.data);
                    addMessage(pkg, 'That was me\n changing the line width!');
                },

                toggleParentArrow: function toggleParentArrow(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.lineOptions.set(pkg.data);
                    addMessage(pkg, 'That was me\n adding the arrow!');
                },

                toggleChildArrow: function toggleChildArrow(pkg) {
                    cn = _self._.nodes.one(pkg.data.id);
                    cn.lineOptions.set(pkg.data);
                    addMessage(pkg, 'That was me\n adding the arrow!');
                },

                onCanvasMove: function onCanvasMove(pkg) {
                    var opts = {
                        x: pkg.data.left,
                        y: pkg.data.top,
                        dur: pkg.data.duration || 500,
                        callback: {
                            after: function after() {
                                _self._.birdseye && _self._.birdseye.refresh(true);
                            }
                        },
                        isAbsolute: true
                    };
                    _self._.canvas.move(opts);
                    addMessage(pkg, 'That was me\n moving the canvas!');
                }
                // ,
                // onJSONChanged: function(pkg) {
                //     _self._.loadJSON(pkg.json);
                //     _self._.slate.birdseye && _self._.slate.birdseye.refresh(true);
                //     addMessage(pkg, 'I just changed the slate!');
                // }
            };

            pc.onCollaboration && pc.onCollaboration({ type: "init", slate: _self._, cb: function cb(pkg) {
                    process(pkg);
                } });
            if (pc.localizedOnly) {
                $s.localRecipients.push(_self);
            }
        }

        _self.send = function (pkg) {
            send(pkg);
        };

        function addMessage(pkg, msg) {
            //CollaborationMessages.insert({userId: getUserId(), slateId: _self._._id || _self._.options.id, msg: msg});
        };

        function send(pkg) {
            _self._.undoRedo && _self._.options.showUndoRedo && _self._.undoRedo.snap(); //pkg
            if (pc.allow) {
                if (_underscore2.default.isFunction(_self._.options.onSlateChanged)) {
                    _self._.options.onSlateChanged.apply(this, [pkg]);
                }
                pc.onCollaboration && pc.onCollaboration({ type: "process", slate: _self._, pkg: pkg, cb: function cb(pkg) {
                        process(pkg);
                    } });
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._multiselection = function () {
        var _self = this,
            selRect = null,
            ox,
            oy,
            _init,
            marker = null,
            selectedNodes = [],
            origPos = null,
            resizer = null,
            minSize = 100;

        _self.init = function () {
            var c = _self._.options.container;
            if (c) {

                _init = document.createElement("div");
                _init.setAttribute("class", "slateMultiSelect");
                _init.style.position = "absolute";
                _init.style.height = "30px";
                _init.style.left = '10px';
                _init.style.color = "#081272";
                _init.style.fontSize = "11pt";
                _init.style.fontFamily = "trebuchet ms";
                _init.style.top = "5px";
                _init.style.display = "block";
                _init.style.padding = "5px";
                _init.style.margin = "5px;";
                _init.style.backgroundColor = "#fff";
                _init.style.cursor = "pointer";
                _init.innerHTML = "[multi-select]";
                _init.style.zIndex = "0";
                c.appendChild(_init);

                $s.addEvent(_init, "click", function (e) {
                    switch (_init.innerHTML) {
                        case "[multi-select]":
                            _self.start();
                            break;
                        case "selecting [click to stop]...":
                            _self.end();
                            break;
                    }
                });
            }
        };

        _self.hide = function () {
            if (_init) _init.style.display = "none";
        };

        _self.show = function () {
            if (_init) _init.style.display = "block";
        };

        _self.start = function () {
            _self._.disable(); // options.viewPort.allowDrag = false;
            _init.innerHTML = "selecting [click to stop]...";
            _self._.onSelectionStart = function (e) {
                var p = xy(e);
                selRect = _self._.paper.rect(p.x, p.y, 10, 10).attr({ "stroke-dasharray": "-" });
                $s.addEvent(_self._.canvas.get(), "mousemove", _move);
                $s.addEvent(_self._.canvas.get(), "mouseup", _select);
                ox = p.x;
                oy = p.y;
            };
        };

        _self.isSelecting = function () {
            return marker !== null;
        };

        _self.del = function () {
            if (confirm('Are you sure you want to remove the selected nodes?')) {
                _underscore2.default.each(selectedNodes, function (node) {
                    node.toolbar.del();
                });
                _self.end();
            }
        };

        _self.end = function () {
            if (marker !== null) {
                resizer.unmouseover(_resizeHover);
                //marker.undrag(markerEvents.move, markerEvents.init, markerEvents.up);
                //resizer.undrag(resizeEvents.move, resizeEvents.init, resizeEvents.up);
                marker.remove();
                resizer.remove();
                marker = null;
                _self._.keyboard && _self._.keyboard.end();
            }
            if (_init) _init.innerHTML = "[multi-select]";
        };

        _self.endSelection = function () {
            selRect && selRect.remove();
            _self._.enable();
            _self._.onSelectionStart = null;
            $s.removeEvent(_self._.canvas.get(), "mousemove", _move);
            $s.removeEvent(_self._.canvas.get(), "mouseup", _select);
        };

        var xy = function xy(e) {
            var mp = $s.mousePos(e);
            var off = $s.positionedOffset(_self._.options.container);
            var _x = mp.x + _self._.options.viewPort.left - off.left;
            var _y = mp.y + _self._.options.viewPort.top - off.top;
            var z = _self._.options.viewPort.zoom.r;
            return { x: _x / z, y: _y / z };
        };

        var _move = function _move(e) {
            p = xy(e);
            var height = p.y - oy;
            var width = p.x - ox;

            if (height > 0) {
                selRect.attr({ height: height });
            } else {
                selRect.attr({ y: p.y, height: oy - p.y });
            }
            if (width > 0) {
                selRect.attr({ width: width });
            } else {
                selRect.attr({ x: p.x, width: ox - p.x });
            }
        };

        var _select = function _select(e) {
            var sr = selRect.getBBox();
            var l = _self._.options.viewPort.left;
            var t = _self._.options.viewPort.top;
            var z = _self._.options.viewPort.zoom.r;
            selectedNodes = _underscore2.default.filter(_self._.nodes.allNodes, function (n) {
                return n.options.xPos + n.options.width > sr.x && n.options.xPos < sr.x + sr.width && n.options.yPos + n.options.height > sr.y && n.options.yPos < sr.y + sr.height;
            });

            if (selectedNodes.length > 1) {
                var orient = _self._.getOrientation(selectedNodes);
                var w = orient.width / z;
                var h = orient.height / z;
                if (w < minSize) w = minSize;
                if (h < minSize) h = minSize;

                marker = _self._.paper.rect(orient.left / z, orient.top / z, w, h).attr({ "stroke-dasharray": "-", "fill": "#f8f8f8" });
                marker.toBack();
                origPos = marker.getBBox();

                _self.endSelection();

                //resizer
                var _nx = origPos.x + origPos.width;
                var _ny = origPos.y + origPos.height;

                resizer = _self._.paper.resize(_self._.options.imageFolder + "2_lines.png").transform(["t", _nx - 5, ",", _ny - 5].join()).attr({ fill: "#fff", "stroke": "#000" });
                resizer.mouseover(_resizeHover);
                marker.drag(markerEvents.move, markerEvents.init, markerEvents.up);
                resizer.drag(resizeEvents.move, resizeEvents.init, resizeEvents.up);

                //hiding resizer for now
                //resizer.hide();

                //unmark all and remove connectors
                _self._.unMarkAll();

                _underscore2.default.each(selectedNodes, function (node) {
                    node.connectors.remove();
                    node.resize.hide();
                });

                //activate keyboard shortcuts for this group...
                _self._.keyboard && _self._.keyboard.start();
            } else if (selectedNodes.length === 1) {
                selectedNodes[0].menu.show();
                selectedNodes[0].mark();
                _self.endSelection();
                _self.end();
            } else {
                _self.endSelection();
                _self.end();
            }
        };

        var _resizeHover = function _resizeHover(e) {
            resizer.attr({ cursor: 'nw-resize' });
        };

        var markerEvents = {
            init: function init(x, y) {
                _self._.options.viewPort.allowDrag = false;
                marker.ox = marker.attr("x");
                marker.oy = marker.attr("y");
                _underscore2.default.each(selectedNodes, function (node) {
                    node.vect.ox = node.vect.type == "rect" ? node.vect.attr("x") : node.vect.attr("cx");
                    node.vect.oy = node.vect.type == "rect" ? node.vect.attr("y") : node.vect.attr("cy");
                });
            },
            move: function move(dx, dy) {
                var _zr = _self._.options.viewPort.zoom.r;
                dx = dx + (dx / _zr - dx);
                dy = dy + (dy / _zr - dy);

                var att = { x: marker.ox + dx, y: marker.oy + dy };
                marker.attr(att);

                _underscore2.default.each(selectedNodes, function (node) {
                    node.setPosition({ x: node.vect.ox + dx, y: node.vect.oy + dy });
                    node.relationships.refresh();
                    /*
                    node.relationships.syncAssociations(node, function(c, a) {
                        //c.setPosition({ x: c.vect.ox + dx, y: c.vect.oy + dy });
                        c.relationships.refresh();
                    });
                    */
                });

                var _nx = origPos.x + origPos.width + dx - 5,
                    _ny = origPos.y + origPos.height + dy - 5;
                resizer.transform(["t", _nx, ",", _ny].join(""));
            },
            up: function up(e) {
                _self._.options.viewPort.allowDrag = true;
                _self._.birdseye && _self._.birdseye.refresh(true);

                var _sids = (0, _underscore2.default)(selectedNodes).chain().pluck('options').pluck('id').value();

                _underscore2.default.each(selectedNodes, function (node) {
                    broadcastMove(node);
                });

                origPos = marker.getBBox();
            }
        };

        function _resize() {
            var mbb = marker.getBBox();

            var xStatic = mbb.x + mbb.width / 2;
            var yStatic = mbb.y + mbb.height / 2;
            var yScale = mbb.height / origPos.height;
            var xScale = mbb.width / origPos.width;

            _underscore2.default.each(selectedNodes, function (node) {
                var nx = xStatic + xScale * (node.options.xPos - xStatic);
                var ny = yStatic + yScale * (node.options.yPos - yStatic);

                node.setPosition({ x: nx, y: ny });

                var nw = xScale * node.options.width; // ((mbb.width * node.options.width) / origPos.width);
                var nh = yScale * node.options.height; // ((mbb.height * node.options.height) / origPos.height);
                node.resize.set(nw, nh, 0);
            });
        };

        function broadcastMove(node) {
            _self._.collab && _self._.collab.send({
                type: "onNodeMove",
                data: {
                    id: node.options.id,
                    x: node.options.xPos,
                    y: node.options.yPos
                }
            });
        };

        var resizeEvents = {
            init: function init() {
                _self._.disable();
                _underscore2.default.each(selectedNodes, function (node) {
                    node.vect.ox = node.vect.type == "rect" ? node.vect.attr("x") : node.vect.attr("cx");
                    node.vect.oy = node.vect.type == "rect" ? node.vect.attr("y") : node.vect.attr("cy");
                });
            },
            move: function move(dx, dy) {

                var _zr = _self._.options.viewPort.zoom.r;
                dx = dx + (dx / _zr - dx);
                dy = dy + (dy / _zr - dy);

                var _width = origPos.width + dx * 2;
                var _height = origPos.height + dy * 2;

                var _nx = origPos.x + origPos.width + dx - 5;
                var _ny = origPos.y + origPos.height + dy - 5;
                var rw = true,
                    rh = true;
                if (_width < minSize) {
                    _width = minSize;rw = false;
                }
                if (_height < minSize) {
                    _height = minSize;rh = false;
                }

                resizer.transform(["t", _nx, ",", _ny].join(""));

                var att = { width: _width, height: _height };
                rw && _underscore2.default.extend(att, { x: origPos.x - dx });
                rh && _underscore2.default.extend(att, { y: origPos.y - dy });

                marker.attr(att);
            },
            up: function up() {
                _self._.enable();
                _resize();

                _underscore2.default.each(selectedNodes, function (node) {
                    node.resize.send();
                    broadcastMove(node);
                });

                _self._.birdseye && _self._.birdseye.refresh(true);

                origPos = marker.getBBox();
                var _nx = origPos.x + origPos.width;
                var _ny = origPos.y + origPos.height;
                resizer.transform(["t", _nx - 5, ",", _ny - 5].join(""));
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _getTransformedPath = __webpack_require__(1);

var _getTransformedPath2 = _interopRequireDefault(_getTransformedPath);

var _getDepCoords = __webpack_require__(2);

var _getDepCoords2 = _interopRequireDefault(_getDepCoords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._nodes = function () {
        var _self = this,
            _ensureBe;
        _self.allNodes = [];

        function refreshBe() {
            window.clearTimeout(_ensureBe);
            _ensureBe = window.setTimeout(function () {
                _self._.birdseye && _self._.birdseye.refresh(false);
            }, 10);
        };

        _self.copyNodePositions = function (source) {
            var useMainCanvas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            _underscore2.default.each(source, function (src) {
                //if (src.options.id !== _self.tempNodeId) {
                var cn = _underscore2.default.detect(_self.allNodes, function (n) {
                    return n.options.id === src.options.id;
                });
                cn.setPosition({ x: src.options.xPos, y: src.options.yPos });

                var opts = {};
                if (useMainCanvas) {
                    var tempPath = Meteor.currentSlate.paper.path(cn.vect.attr("path"));
                    opts.boundingClientRect = tempPath[0].getBoundingClientRect();
                    tempPath.remove();
                }
                cn.rotate.applyImageRotation(opts);
                //}
            });
            _underscore2.default.invoke(_underscore2.default.pluck(_self.allNodes, 'relationships'), 'refresh');
        };

        _self.addRange = function (_nodes) {
            _underscore2.default.each(_nodes, function (node) {
                _self.add(node);
            });
            return _self;
        };

        _self.removeRange = function (_nodes) {
            _underscore2.default.each(_nodes, function (node) {
                _self.allNodes = removeNode(_self.allNodes, node);
            });
            return _self;
        };

        _self.add = function (_node, useMainCanvas) {
            _node.slate = _self._; //parent
            _self.allNodes.push(_node);
            addToCanvas(_node, useMainCanvas);
        };

        _self.remove = function (_node) {
            _self.allNodes = remove(_self.allNodes, _node);
            _node.slate = null;
            removeFromCanvas(_node);
        };

        _self.moveNodes = function (pkg, options) {
            _self.closeAllLineOptions();
            _self.closeAllMenus();
            // _node.hideOwnMenus();
            var allAssoc = [];
            _underscore2.default.each(_self.allNodes, function (node) {
                _underscore2.default.each(node.relationships.associations, function (a) {
                    allAssoc.push(a);
                });
            });
            var uniqAssoc = _underscore2.default.uniq(allAssoc, function (a) {
                return a.id;
            });

            var p = pkg.data || pkg,
                d = p.dur || Meteor.collabAnimationDuration || 300,
                e = p.easing || ">";
            var associations = p.associations,
                nodeOptions = p.nodeOptions;


            _underscore2.default.each(nodeOptions, function (opts) {
                var _nodeObject = _underscore2.default.find(_self.allNodes, function (node) {
                    return node.options.id === opts.id;
                });

                _underscore2.default.extend(_nodeObject.options, opts);

                var dps = (0, _getDepCoords2.default)({ x: opts.xPos, y: opts.yPos }, _nodeObject.options),
                    lx = dps.lx,
                    tx = dps.tx,
                    ty = dps.ty;
                if (options.animate) {
                    _nodeObject.text.animate({ x: tx, y: ty }, d, e);
                    _nodeObject.link.animate({ x: lx, y: ty }, d, e);
                } else {
                    _nodeObject.text.attr({ x: tx, y: ty });
                    _nodeObject.link.attr({ x: lx, y: ty });
                }

                if (options.animate) {
                    _nodeObject && _nodeObject.vect.animate({ path: opts.vectorPath, transform: _nodeObject.getTransformString() }, d, e, function () {
                        _nodeObject.vect.attr({ path: opts.vectorPath });
                    });
                } else {
                    _nodeObject && _nodeObject.vect.attr({ path: opts.vectorPath });
                    var rotationOptions = {};
                    if (options.useMainCanvas) {
                        var tempPath = Meteor.currentSlate.paper.path(_nodeObject.vect.attr("path"));
                        rotationOptions = {
                            boundingClientRect: tempPath[0].getBoundingClientRect()
                        };
                        tempPath.remove();
                    }
                    _nodeObject.rotate.applyImageRotation(rotationOptions);
                }
            });

            _underscore2.default.each(associations, function (assoc) {
                var a = _underscore2.default.find(uniqAssoc, function (a) {
                    return a.parent.options.id === assoc.parentId && a.child.options.id === assoc.childId;
                });
                if (options.animate) {
                    a && a.line.animate({ path: assoc.linePath }, d, e, function () {
                        a.line.attr({ path: assoc.linePath });
                    });
                } else {
                    a && a.line.attr({ path: assoc.linePath });
                }
            });
            _self._.birdseye && _self._.birdseye.refresh(true);
        };

        function getParentChild(obj) {
            var _parent, _child;
            _underscore2.default.each(_self.allNodes, function (node) {
                if (node.options.id === obj.parent) {
                    _parent = node;
                } else if (node.options.id === obj.child) {
                    _child = node;
                }
                if (_parent && _child) return;
            });

            return { p: _parent, c: _child };
        };

        _self.removeRelationship = function (rm) {
            var pc = getParentChild(rm);
            var _parent = pc.p,
                _child = pc.c;
            if (_parent && _child) {
                // _parent.relationships.removeChild(_child);
                // _child.relationships.removeParent(_parent);
                _parent.relationships.removeAssociation(_child);
                _child.relationships.removeAssociation(_parent);
            }
        };

        _self.refreshAllRelationships = function () {
            _underscore2.default.each(_self.allNodes, function (node) {
                node.relationships.refresh();
            });
        };

        _self.addRelationship = function (add) {
            var pc = getParentChild(add);
            var _parent = pc.p,
                _child = pc.c;
            if (_parent && _child) {
                switch (add.type) {
                    case "association":
                        _parent.relationships.addAssociation(_child, add.options);
                        break;
                    // case "parent":
                    //     _parent.relationships.addParent(_child);
                    //     break;
                }
            }
        };

        _self.closeAllLineOptions = function (exception) {
            _underscore2.default.each(_self.allNodes, function (node) {
                _underscore2.default.each(node.relationships.associations, function (association) {
                    if (association.id === exception) {} else {
                        node.lineOptions && node.lineOptions.hide(association.id);
                    }
                });
            });
        };

        _self.closeAllMenus = function (exception) {
            _underscore2.default.each(_self.allNodes, function (node) {
                if (node.options.id === exception) {} else {
                    node.menu && node.menu.hide();
                    node.resize && node.resize.hide();
                }
            });
        };

        _self.closeAllConnectors = function () {
            _underscore2.default.each(_self.allNodes, function (node) {
                node.connectors && node.connectors.remove();
                node.resize && node.resize.hide();
            });
        };

        _self.one = function (id) {
            var cn = null;
            _underscore2.default.each(_self.allNodes, function (node) {
                if (node.options.id === id) {
                    cn = node;
                    return;
                }
            });
            return cn;
        };

        function remove(a, obj) {
            return _underscore2.default.filter(a, function (a) {
                return a.options.id !== obj.options.id;
            });
        }

        function removeFromCanvas(_node) {
            _underscore2.default.each(["vect", "text", "link"], function (tt) {
                _node[tt].remove();
            });
            refreshBe();
        };

        function addToCanvas(_node, useMainCanvas) {
            var vect = null,
                text = null,
                link = null,
                s = _node.options.borderColor || "#000";
            if (_node.options.borderWidth === 0) s = 'transparent';
            var vectOpt = { stroke: s, "stroke-dasharray": _node.options.borderStyle || "", "stroke-width": _node.options.borderWidth, fill: _node.options.backgroundColor || "none" };
            var _x = _node.options.xPos;
            var _y = _node.options.yPos;
            var paperToUse = _self._.paper;
            var percent = 1;

            var _width = _node.options.width;
            var _height = _node.options.height;

            //tree:
            //_node.options.vectorPath = "M72.223,47.223c0-5.945-3.777-11.039-9.028-13.021c2.192-2.455,3.472-5.651,3.472-9.201c0-7.67-6.218-13.889-13.889-13.889c-1.094,0-2.104,0.106-3.125,0.344C48.49,4.961,42.942-0.002,36.111,0c-6.83,0.001-12.379,4.964-13.542,11.46c-1.021-0.239-2.032-0.345-3.125-0.345c-7.671,0-13.889,6.218-13.889,13.889c0,3.551,1.28,6.746,3.472,9.202C3.777,36.187,0,41.278,0,47.223c0,7.671,5.556,13.892,13.889,13.892h2.777l11.111,19.444v13.887c0,2.777,2.778,5.555,5.556,5.555h5.556c2.776,0,5.555-2.777,5.555-5.555v-13.89l11.112-19.441l3.992-0.083C66.666,61.113,72.223,54.474,72.223,47.223L72.223,47.223z M27.778,61.113h16.667l-5.555,11.11h-5.556L27.778,61.113z";

            //house:
            //_node.options.vectorPath = "M232.272,88.949L79.937,223.837v192.749c0,4.979,4.023,8.971,9.001,8.971h95.205v-84.51c0-4.979,3.994-9,8.971-9h78.229  c4.978,0,8.97,4.021,8.97,9v84.51h95.235c4.979,0,8.972-3.992,8.972-8.971V223.779L232.272,88.949z";

            //rounded rect:
            //
            //_node.options.vectorPath = "M1,1 h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z";
            //_node.options.vectorPath = "M" + _x + "," + _y + " h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z";
            //console.log("path is ", _node.options.vectorPath);
            //_node.options.vectorPath = "M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z"
            // M276.328,277.105h-85.096V224.74  h85.096V277.105z M79.937,42.699h54.771l-0.479,32.438l-54.293,49.048V42.699z M231.388,24.746L15.334,216.053l22.758,25.676l194.18-171.952l194.136,171.952l22.715-25.676L233.113,24.746 l-0.884-0.76L231.388,24.746z

            //const _path = paperToUse.roundedRectanglePath(pathAttrs);
            //console.log("path is ", _path);
            //_node.options.vectorPath = "M" + _x + "," + _y + " h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z";

            //console.log("paths are ", _path, _node.options.vectorPath);

            //adjust historical vectorPaths to pure paths...
            // const _tp = "T" + (_x * percent) + "," + (_y * percent) + ",s" + (_width/150 * percent) + "," + (_height/100 * percent);
            var _transforms = ["T" + _x * percent + ", " + _y * percent, "s" + _width / 150 * percent + ", " + _height / 100 * percent + ", " + _x + ", " + _y];
            _node.options.isEllipse = _node.options.isEllipse || _node.options.vectorPath === "ellispse";
            switch (_node.options.vectorPath) {
                case "ellipse":
                    _node.options.vectorPath = (0, _getTransformedPath2.default)("M150,50 a75,50 0 1,1 0,-1 z", _transforms);
                    break;
                case "rectangle":
                    _node.options.vectorPath = (0, _getTransformedPath2.default)("M1,1 h150 v100 h-150 v-100 z", _transforms);
                    break;
                case "roundedrectangle":
                    _node.options.vectorPath = (0, _getTransformedPath2.default)("M1,1 h130 a10,10 0 0 1 10,10 v80 a10,10 0 0 1 -10,10 h-130 a10,10 0 0 1 -10,-10 v-80 a10,10 0 0 1 10,-10 z", _transforms);
                    break;
            }

            vect = paperToUse.path(_node.options.vectorPath).attr(vectOpt);

            //need to set in case toback or tofront is called and the load order changes in the context plugin
            vect.node.setAttribute("rel", _node.options.id);
            vect.data({ id: _node.options.id });
            _node.vect = vect;
            _node.vect.transform(_node.getTransformString());

            //update xPos, yPos in case it is different than actual
            var bbox = vect.getBBox();
            _node.options.xPos = bbox.x;
            _node.options.yPos = bbox.y;

            var tc = _node.textCoords();
            var lc = _node.linkCoords();
            text = paperToUse.text(tc.x, tc.y, _node.options.text || '').attr({ "font-size": _node.options.fontSize + "pt", fill: _node.options.foregroundColor || "#000" });
            link = paperToUse.linkArrow().transform(["t", lc.x, ",", lc.y, "s", ".8", ",", ".8", "r", "180"].join());

            _node.text = text;
            _node.link = link;

            _node.relationships.wireHoverEvents();
            _node.relationships.wireDragEvents();
            _node.links && _node.links.wireEvents();

            if (_node.options.image && _node.options.image !== "") {
                _node.images.set(_node.options.image, _node.options.imageOrigWidth, _node.options.imageOrigHeight, useMainCanvas);
                //_node.vect.attr({ "fill": "url(" + _node.options.image + ")", "stroke-width": _node.options.borderWidth, "stroke": "#000" });
            }

            if (!_node.options.link || !_node.options.link.show) {
                _node.link.hide();
            }

            refreshBe();
            return vect;
        };
        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $slate) {
    $slate.fn._zoomSlider = function () {
        var _self = this,
            slider;

        _self.setValue = function (val) {
            slider && slider.setValue(val);
        };

        _self.hide = function () {
            if ($s.el("slateSlider_" + _self._.options.id) !== null) {
                _self._.options.container.removeChild($s.el("slateSlider_" + _self._.options.id));
            }
        };

        _self.show = function (_options) {

            _self.hide();

            var options = {
                height: 320,
                width: 70,
                offset: { left: 20, top: 80 },
                slider: { height: 300, min: 6000, max: 200000, set: 5000 }
            };

            _underscore2.default.extend(options, _options);

            var c = _self._.options.container;
            var scx = document.createElement('div');
            scx.setAttribute("id", "slateSlider_" + _self._.options.id);
            scx.style.position = "absolute";
            scx.style.height = options.height + "px";
            scx.style.width = options.width + "px";
            scx.style.left = options.offset.left + "px";
            scx.style.top = options.offset.top + "px";
            c.appendChild(scx);

            options.paper = Raphael("slateSlider_" + _self._.options.id, options.width, options.height);

            slider = options.paper.slider(options.slider.height, options.slider.min, options.slider.max, options.slider.set, function (val) {
                //length, start, end, initVal, onSlide, onDone

                if (Raphael.svg) {
                    console.log("zooming to " + val);
                    _self._.zoom(0, 0, val, val, false);
                    _self._.canvas.resize(val);
                }
            }, function (val) {
                _self.set(val);
                _self._.collab && _self._.collab.send({ type: 'onZoom', data: { zoomLevel: val } });
            });
        };

        _self.set = function (val) {
            _self._.zoom(0, 0, val, val, false);
            _self._.canvas.resize(val);

            var z = _self._.options.viewPort.zoom;

            _self._.options.viewPort.width = z.w;
            _self._.options.viewPort.height = z.h;
            _self._.options.viewPort.left = z.l;
            _self._.options.viewPort.top = z.t;
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.slate);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._colorpicker = function (_options) {
        var options = {
            colors: [{ hex: "000000", to: "575757" //black //six to a row
            }, { hex: "FFFFFF", to: "d9d9d9" //white
            }, { hex: "FF0000", to: "a31616" //red
            }, { hex: "C3FF68", to: "afff68" //green
            }, { hex: "0B486B", to: "3B88B5" //blue
            }, { hex: "FBB829", to: "cd900e" //orange
            }, { hex: "BFF202", to: "D1F940" //yellow
            }, { hex: "FF0066", to: "aa1d55" ///pink
            }, { hex: "800F25", to: "3d0812" //dark red
            }, { hex: "A40802", to: "d70b03" //red
            }, { hex: "FF5EAA", to: "cf5d93" //strong pink
            }, { hex: "740062", to: "D962C6" //purple
            }, { hex: "FF4242", to: "A61515" //red
            }, { hex: "D15C57", to: "9D5C58" //pinkish
            }, { hex: "FCFBE3", to: "c9c56f" //light yellow-white
            }, { hex: "FF9900", to: "c98826" //orange
            }, { hex: "369001", to: "9CEE6C" //green
            }, { hex: "9E906E", to: "675324" //brown
            }, { hex: "F3D915", to: "F9EA7C" //yellow 2
            }, { hex: "031634", to: "2D579A" // dark blue
            }, { hex: "556270", to: "7b92ab" //gray-blue
            }, { hex: "1693A5", to: "23aad6" //turquoise
            }, { hex: "ADD8C7", to: "59a989" //light turquoise
            }, { hex: "261C21", to: "EB9605" }],
            useColorLovers: false
        };
        _underscore2.default.extend(options, _options);
        if (options.colors !== null) {
            $s.availColors = options.colors;
        }
        var _self = this;

        function getColors(callback) {
            if ($s.availColors === undefined) {
                var apiUrl = "http://www.colourlovers.com/api/colors/top&jsonCallback=?"; //&context=" + this.imageContext;
                $s.getJSON(apiUrl, function (data) {
                    $s.availColors = data;
                    if (_underscore2.default.isFunction(callback)) callback.apply(this, [$s.availColors]);
                });
            } else {
                if (_underscore2.default.isFunction(callback)) callback.apply(this, [$s.availColors]);
            }
        };

        _self.prepColors = function (cb) {
            getColors(cb);
        };

        _self.show = function (opts) {

            var _zoomScalar = opts.zoomScalar || 1;
            var _zoomCorrection = opts.zoomScalar ? Math.pow(50 / _zoomScalar, 0.125) : 0; //the more zoomed out, the less significant
            //x, y, _m, _width
            var _m = opts.m;
            var wx = opts.width || _m[4].attr("width");
            var _rowOff = wx - 125 * _zoomScalar - _zoomCorrection;
            var _x = opts.x + _rowOff;
            var _y = opts.y + 5 * _zoomScalar - _zoomCorrection;

            getColors(function (data) {
                var tot = -1,
                    rowCount = 6,
                    rp = _self._.slate.paper,
                    w = 15 * _zoomScalar,
                    h = 15 * _zoomScalar,
                    p = 4 * _zoomScalar;

                _underscore2.default.each(data, function (dataElem) {
                    tot++;
                    if (tot % rowCount === 0 && tot !== 0) {
                        _y += h + p;
                        _x = opts.x + _rowOff;
                        //if (_self._.options.vectorPath === 'ellipse') {
                        //    _x = _x - _self._.options.width / 2;
                        //}
                    }
                    var _hex = dataElem.hex;
                    var _to = dataElem.to;
                    var _swatch = rp.rect(_x, _y, w, h, 3).attr({ stroke: '#000', fill: ["90-#", _hex, "-#", _to].join('') });

                    _swatch.mouseover(function (e) {
                        _self._.slate.glow(this);
                        //this.animate({ transform: "s1.5, 1.5" }, 200);
                    });

                    _swatch.mouseout(function (e) {
                        _self._.slate.unglow();
                        //this.animate({ transform: "s1,1" }, 200);
                    });

                    _swatch.mousedown(function (e) {
                        $s.stopEvent(e);
                        opts.onSelected && opts.onSelected(this);
                    });

                    _m.push(_swatch);
                    _x += w + p;
                    if (tot > 19) return;
                });
            });
        };

        _self.set = function (cast) {
            _self._.options.backgroundColor = cast.color;
            _self._.vect.attr({ fill: cast.color });
            //_.each(_self._.relationships.children, function (child) {
            //    child.lineColor = cast.color;
            //});
            _self._.relationships.refresh();
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _lodash = __webpack_require__(3);

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

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n, $si) {
    $n.fn._context = function () {
        var _self = this,
            _contextMenu,
            _priorAllowDrag = true,
            _height = 190;

        //wire up event
        var _wire = window.setInterval(function () {
            if (_self._) {
                _self.create();
                window.clearInterval(_wire);
            }
        }, 500);

        _self.create = function () {
            if (_self._.text.node && _self._.options.allowContext && !_self._.slate.isAlt && !_self._.slate.isShift) {
                _self._.text.node.oncontextmenu = _self._.vect.node.oncontextmenu = function (e) {
                    _priorAllowDrag = _self._.options.allowDrag;
                    _self._.options.allowDrag = false;
                    _self.remove();
                    buildContext(e);
                    setTimeout(function (e) {
                        _self._.options.allowDrag = _priorAllowDrag;
                    }, 2);
                    return $s.stopEvent(e);
                };
            }
        };

        function buildContext(e) {
            _contextMenu = document.createElement('div');
            _contextMenu.setAttribute("id", "contextMenu_" + _self._.options.id);
            _contextMenu.setAttribute("class", "sb_cm");
            document.body.appendChild(_contextMenu);
            setContext(e);
        };

        function menuItems() {
            var _tmp = "<div style='padding:5px;' class='sb_contextMenuItem' rel='{func}'>{text}</div>";
            var _inside = _tmp.replace(/{func}/g, "tofront").replace(/{text}/g, "to front");
            _inside += _tmp.replace(/{func}/g, "toback").replace(/{text}/g, "to back");
            if (_priorAllowDrag) {
                _inside += _tmp.replace(/{func}/g, "lock").replace(/{text}/g, "lock");
            } else {
                _inside += _tmp.replace(/{func}/g, "unlock").replace(/{text}/g, "unlock");
            }
            _inside += _tmp.replace(/{func}/g, "close").replace(/{text}/g, "close");
            return _inside;
        };

        function setContext(e) {
            _contextMenu.innerHTML = menuItems();

            _underscore2.default.each($s.select("div.contextMenuItem"), function (elem) {
                elem.onclick = function (e) {
                    var act = this.getAttribute("rel"),
                        _reorder = false;
                    var pkg = { type: '', data: { id: _self._.options.id } };
                    switch (act) {
                        case "tofront":
                            _self._.toFront();
                            _reorder = true;
                            pkg.type = 'onNodeToFront';
                            break;
                        case "toback":
                            _self._.toBack();
                            _reorder = true;
                            pkg.type = 'onNodeToBack';
                            break;
                        case "lock":
                            _self._.disable();
                            pkg.type = 'onNodeLocked';
                            break;
                        case "unlock":
                            _self._.enable();
                            pkg.type = 'onNodeUnlocked';
                            break;
                        case "close":
                            break;
                    }
                    if (_reorder) {
                        var zIndex = 0;
                        for (var node = _self._.slate.paper.bottom; node != null; node = node.next) {
                            if (node.type === "ellipse" || node.type === "rect") {
                                zIndex++;
                                var _id = node.data("id");

                                //not all rects have an id (the menu box is a rect, but it has no options.id because it is not a node
                                //so you cannot always show this...
                                if (_id) {
                                    var reorderedNode = _underscore2.default.detect(_self._.slate.nodes.allNodes, function (n) {
                                        return n.options.id === _id;
                                    });
                                    reorderedNode.sortorder = zIndex;
                                }
                            }
                        }
                        _self._.slate.nodes.allNodes.sort(function (a, b) {
                            return a.sortorder < b.sortorder ? -1 : 1;
                        });
                    }
                    if (pkg.type !== "") broadcast(pkg);
                    _self.remove();
                };
            });

            var mp = $s.mousePos(e);

            var _x = mp.x; // _self._.options.xPos - _self._.slate.options.viewPort.left + _self._.options.width / 3;
            var _y = mp.y; // _self._.options.yPos - _self._.slate.options.viewPort.top;
            _contextMenu.style.left = _x + "px";
            _contextMenu.style.top = _y + "px";
            _contextMenu.style.height = _height + "px";
        };

        function broadcast(pkg) {
            //broadcast
            if (_self._.slate.collab) _self._.slate.collab.send(pkg);
            if (_self._.slate.birdseye) _self._.slate.birdseye.nodeChanged(pkg);
        };

        _self.remove = function () {
            _self._.slate.removeContextMenus();
            _contextMenu = null;
        };

        _self.isVisible = function () {
            return _contextMenu !== null;
        };

        return _self;
    };
    $si.fn.removeContextMenus = function () {
        var _cm = $s.select("div.sb_cm");
        _underscore2.default.each(_cm, function (elem) {
            document.body.removeChild(elem);
        });
    };
})(Slatebox, Slatebox.fn.node, Slatebox.fn.slate);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._editor = function () {
        var _self = this,
            _tempId = $s.guid().replace("-", ""),
            lineBreaks = [],
            _keypress,
            _submit,
            _cancel,
            cursor,
            ll,
            _ntfy;
        _self.editing = false;
        _self.start = function () {
            _self.editing = true;
            _self._.slate.keyboard && _self._.slate.keyboard.end();

            cursor = _self._.slate.paper.rect(-99, -99, 8, 1).attr({ fill: "#000" }).loop({
                pkg: [{ fill: "#fff" }, { fill: "#000" }],
                duration: 500,
                repeat: true
            });
            //positionedoffset?
            _self._.slate.nodes.closeAllMenus();

            var origText = '',
                origSize;

            function sizes() {
                var _sel = "<select id='ddlTxtSize'>";
                for (ptx = 10; ptx < 201; ptx++) {
                    if (ptx % 2 === 0) {
                        _sel += "<option>" + ptx + "</option>";
                    }
                }
                _sel += "</select>";
                return _sel;
            };

            function buildColorPicker() {
                var ctmp = "<div style='float:left;padding:3px;margin-right:5px;background-color:#f8f8f8;border:1px solid #ccc;cursor:pointer;' class='changeTextColor' rel='{text}'><div style='width:30px;height:30px;background-color:{color};float:left;border:1px solid #333;'></div></div>";
                var _colors = ctmp.replace(/{color}/gi, '#000').replace(/{text}/gi, 'black');
                _colors += ctmp.replace(/{color}/gi, '#FFF').replace(/{text}/gi, 'white');
                return _colors;
            };

            function setColor(clr, txtBg) {
                _self.set(null, null, clr);
                var txt = $s.el("txtForNode");
                txt.style.backgroundColor = txtBg;
                txt.style.color = clr;
                txt.focus();
            };

            if ($s.select("div.embedBar").length > 0) {
                _underscore2.default.each($s.select("div.embedBar"), function (elem) {
                    document.body.removeChild(elem);
                });
            };

            _ntfy = new Notify().message({
                hgt: 120,
                duration: 200,
                className: 'embedBar',
                delayClose: 0,
                spinner: null,
                hideClose: false,
                popFromBottom: true,
                onClose: function onClose() {
                    //_self.set(origText, origSize);
                    _self.end();
                },
                onOpen: function onOpen(container, _ntfy) {
                    container.innerHTML = "<div style='width:900px;'>You are editing the node's text!<br/><div style='float:left;margin-right:8px;height:60px;'><textarea id='txtForNode' style='text-align:center;width:500px;height:70px;color:#000;'></textarea></div><div style='float:left;margin-right:20px;margin-top:-20px'>Size " + sizes() + " pt&nbsp;&nbsp;<button id='btnSubmitText' class='btn btn-primary'>Update</button><div id='textColorPicker' style='margin-top:4px;'></div></div></div>";
                    origText = _self._.options.text;
                    origSize = _self._.options.fontSize;
                    $s.el("txtForNode").value = origText;
                    $s.el("txtForNode").select();

                    $s.el("btnSubmitText").onclick = function (e) {
                        _self.end();
                        submitChanges();
                    };
                    console.log("going to set ", origSize);
                    $s.el("ddlTxtSize").value = origSize || 10;
                    $s.el("ddlTxtSize").onchange = function (e) {
                        var pt = this.options[this.selectedIndex].value;
                        _self.set(_self._.options.text, pt);
                    };

                    $s.el("textColorPicker").innerHTML = buildColorPicker();
                    _underscore2.default.each($s.select("div.changeTextColor"), function (elem) {
                        var btn = elem;
                        btn.onclick = function (e) {
                            btn.style.border = "1px solid red";
                            switch (btn.getAttribute("rel")) {
                                case "black":
                                    setColor("#000", "#fff");
                                    break;
                                case "white":
                                    setColor("#fff", "#000");
                                    break;
                            }
                        };
                        btn.onmouseover = function (e) {
                            btn.style.border = "1px solid red";
                        };
                        btn.onmouseout = function (e) {
                            btn.style.border = "1px solid #ccc";
                        };
                    });

                    $s.el("txtForNode").onkeyup = function (e) {
                        var _v = this.value;
                        if (_v === "") _v = " ";
                        var _text = _self._.text;
                        _self._.options.text = _v;
                        var keyCode = $s.getKey(e || event);
                        _text.attr({ "text": keyCode === 13 || keyCode === 32 ? _v + " " : _v });
                        var ts = _text.getBBox();
                        if (keyCode === 13 || keyCode === 32) {
                            setTimeout(function () {
                                _text.attr({ "text": _self._.options.text });
                            }, 0);
                        };

                        //get the width of the last line of text
                        var _sp = _text.attr("text").split("\n");
                        ll = _self._.slate.paper.text(-99, -99, _sp[_sp.length - 1]).attr({ "font-size": _self._.options.fontSize + "pt" });
                        var _b = ll.getBBox();
                        ll.remove();

                        _self.resize();
                        _self.resize();
                        _self._.mark();
                        _self._.relationships.refresh();

                        var centerX = _sp.length > 1 ? ts.width / 2 + _b.width / 2 : ts.width;
                        cursor.attr({ x: ts.x + centerX, y: ts.y + ts.height, "font-size": _self._.options.fontSize + "pt" });
                    };
                }
            });

            _self._.mark();
        };

        _self.set = function (t, s, c) {
            t && (_self._.options.text = t);
            s && (_self._.options.fontSize = s);
            c && (_self._.options.foregroundColor = c);
            t && _self._.text.attr({ "text": t });
            s && _self._.text.attr({ "font-size": +s + "pt" });
            c && _self._.text.attr({ fill: c });
            _self.resize();
            _self.resize();
        };

        function submitChanges() {
            //broadcast
            var textPkg = { type: "onNodeTextChanged", data: { id: _self._.options.id, text: _self._.options.text, fontSize: _self._.options.fontSize, fontColor: _self._.options.foregroundColor } };
            if (_self._.slate.collab) _self._.slate.collab.send(textPkg);
            if (_self._.slate.birdseye) _self._.slate.birdseye.nodeChanged(textPkg);
        };

        _self.resize = function () {
            var _text = _self._.text;

            var _xPad = 20;
            var _yPad = 20;

            if (_self._.options.vectorPath === "ellipse") {
                _xPad = 30;
                _yPad = 30;
            }

            var _shim = false;
            if (_text.attr("text") === " ") {
                _text.attr("text", ".");_shim = true;
            }

            var ts = _text.getBBox();

            if (_shim) _text.attr("text", " ");

            var _rsWidth = ts.width + _xPad,
                _rsHeight = ts.height + _yPad,
                _rsX = ts.x - _xPad / 2,
                _rsY = ts.y - _yPad / 2,
                _rscX = ts.x + _self._.options.width / 2 - _xPad / 2,
                _rscY = ts.y + _self._.options.height / 2 - _yPad / 2;

            if (_rsWidth < _self._.options.width) {
                _rsWidth = _self._.options.width;
                _rsX = _self._.options.xPos;
                _rscX = _self._.options.xPos;
            }

            if (_rsHeight < _self._.options.height) {
                _rsHeight = _self._.options.height;
                _rsY = _self._.options.yPos;
                _rscY = _self._.options.yPos;
            }

            var att = _self._.vect.type == "rect" ? { x: _rsX, y: _rsY } : { cx: _rscX, cy: _rscY };
            var wdt = _self._.vect.type == "rect" ? { width: _rsWidth, height: _rsHeight } : { rx: _rsWidth / 2, ry: _rsHeight / 2 };
            _underscore2.default.extend(att, wdt);

            _self._.resize.set(_rsWidth, _rsHeight);
            _self._.options.xPos = _rsX;
            _self._.options.width = _rsWidth;
            _self._.options.yPos = _rsY;
            _self._.options.height = _rsHeight;

            _self._.link.attr(_self._.linkCoords());
        };

        _self.end = function () {
            _self.editing = false;
            _self._.unmark();
            if (_ntfy && _ntfy.visible()) submitChanges();
            _ntfy && _ntfy.closeMessage();

            if (cursor) {
                cursor.remove();
                cursor = null;
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

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

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._links = function () {
        var _self = this,
            _ntfy;

        var options = {
            existenceUrl: '/UrlExists'
        };

        _self.start = function (_options) {
            _self._.slate.nodes.closeAllMenus();

            _underscore2.default.extend(options, _options || {});

            _ntfy = new Notify().message({
                hgt: 185,
                duration: 200,
                className: 'embedBar',
                delayClose: 0,
                spinner: null,
                hideClose: false,
                popFromBottom: true,
                onOpen: function onOpen(container, _ntfy) {
                    _self._.slate.unglow();
                    container.innerHTML = "<div style='width:900px;'>" + "<div id='linkForm'><div id='provideUrlPlaceholder' style='height:75px;width:900px;'>" + "<span style='font-size:16pt;' id='spnEmbedAction'>Provide an external link (will always open in a new window)</span><br/>" + "<span style='font-size:16pt;color:#ccc;' id='embedUrlPrefix'>http://</span>" + "<input type='text' id='txtUrl' style='width:450px;font-size:16pt;color:#000'/>" + "&nbsp;<button id='btnApply' class='btn btn-primary'>go</button>&nbsp;<button id='btnRemove' class='btn btn-danger' style='visibility:hidden;'>remove</button>" + "</div>" + "<div id='messagePlaceholder' style='display:none;height:75px;font-size:20pt;width:900px;'></div>" + "<div style='margin-top:10px;padding:3px;width:800px;height:63px;font-size:14pt;'>WHERE do you want to link to?" + "<div style='border-top:1px dashed #ccc;padding:5px;font-size:12pt;'>" + "<label for='radioLinkUrl' style='float:left;cursor:pointer;'>" + "<input type='radio' id='radioLinkUrl' name='linkType' checked/>" + "an EXTERNAL website" + "</label>" + "<label for='radioLinkSlate' style='float:left;margin-left:15px;cursor:pointer;'>" + "<input type='radio' id='radioLinkSlate' name='linkType'/>" + "a node on THIS slate" + "</label>" + "<label for='radioLinkExternalSlate' style='margin-left:15px;float:left;cursor:pointer;display:none;'>" + "<input type='radio' id='radioLinkExternalSlate' name='linkType' disabled/>" + "a DIFFERENT slate<br/>(coming soon)" + "</label>" + "</div>" + "</div></div><div id='processForm' style='font-size:20pt;'></div>" + "</div>";

                    _self._.link.hide();
                    $s.el("txtUrl").focus();
                    _self._.mark();

                    if (_self._.options.link && _self._.options.link.show) {
                        $s.el("btnRemove").style.visibility = "visible";
                    }

                    $s.addEvent($s.el("btnRemove"), "click", function (e) {
                        _self.unset();
                        var pkg = { type: 'onNodeLinkRemoved', data: { id: _self._.options.id } };
                        if (_self._.slate.collab) _self._.slate.collab.send(pkg);
                        return $s.stopEvent(e);
                    });

                    $s.addEvent($s.el("txtUrl"), "keypress", function (e) {
                        if ($s.getKey(e) === 13) {
                            bindURL();
                        }
                    });

                    $s.addEvent($s.el("txtUrl"), "focus", function (e) {
                        this.select();
                    });

                    $s.addEvent($s.el("btnApply"), "click", function (e) {
                        bindURL();
                        return $s.stopEvent(e);
                    });

                    $s.addEvent($s.el("radioLinkUrl"), "click", function (e) {
                        removeInternalLinking();
                        $s.el("provideUrlPlaceholder").style.display = "block";
                        $s.el("messagePlaceholder").style.display = "none";
                    });

                    $s.addEvent($s.el("radioLinkSlate"), "click", function (e) {
                        _self._.slate.options.linking = {
                            onNode: function onNode(node) {
                                _self.set('currentSlate', node.options.id, true);
                                var pkg = { type: 'onNodeLinkAdded', data: { id: _self._.options.id, linkType: 'currentSlate', linkData: node.options.id } };
                                if (_self._.slate.collab) _self._.slate.collab.send(pkg);

                                _ntfy && _ntfy.resize(50, 300, function () {
                                    _ntfy.changeMessage("You've set the link! Returning you to your original node in a moment...");
                                    setTimeout(function () {
                                        _self._.position('center', function () {
                                            //back
                                            _ntfy.changeMessage("The connection is all set!");
                                            setTimeout(function () {
                                                _ntfy && _ntfy.closeMessage();
                                            }, 1500);
                                        }, 'swingFromTo', 1500);
                                    }, 2000);
                                });
                                removeInternalLinking();
                            }
                        };
                        $s.el("provideUrlPlaceholder").style.display = "none";
                        $s.el("messagePlaceholder").style.display = "block";
                        $s.el("messagePlaceholder").innerHTML = "Scroll the slate to the node you'd like to link to and click it.";
                    });

                    $s.addEvent($s.el("radioLinkExternalSlate"), "click", function (e) {
                        _self._.slate.options.linking = {
                            onSlate: function onSlate(slate) {}
                        };
                        $s.el("provideUrlPlaceholder").style.display = "none";
                        $s.el("messagePlaceholder").style.display = "block";
                        $s.el("messagePlaceholder").innerHTML = "Select the slate that you'd like to link to using the menu above.";
                    });
                },
                onClose: function onClose() {
                    if (_self._.options.link.show) {
                        _self._.link.show();
                    }
                }
            });
        };

        function removeInternalLinking() {
            _self._.slate.options.linking = null;
        };

        function checkUrlExistence(u, cb) {
            var pkg = JSON.stringify({ Url: u });

            $s.el("btnApply").setAttribute("disabled", "disabled");
            $s.el("btnApply").innerHTML = "Checking...";

            $s.ajax(options.existenceUrl, function (respText, resp) {
                var _getUrl = JSON.parse(respText);
                $s.el("btnApply").removeAttribute("disabled", "disabled");
                $s.el("btnApply").innerHTML = "go";
                cb.apply(this, [_getUrl.exists]);
            }, pkg, 'POST');
        }

        function bindURL() {
            var u = $s.el("txtUrl").value.replace(/http:\/\//gi, '');
            checkUrlExistence(u, function (exists) {
                if (exists !== true) {
                    alert("Sorry but " + u + " doesn't look to be a valid URL. Please check it!");
                } else {
                    _self.set('externalUrl', u, true);
                    var pkg = { type: 'onNodeLinkAdded', data: { id: _self._.options.id, linkType: 'externalUrl', linkData: u } };
                    if (_self._.slate.collab) _self._.slate.collab.send(pkg);
                }
            });
        };

        _self.end = function () {
            _self._.unmark();
            _self._.slate.unglow();
            _ntfy && _ntfy.closeMessage();
        };

        _self.set = function (type, data, prepare) {
            if (!_self._.options.link) _self._.options.link = {};
            if (!_self._.options.link.thumbnail) _self._.options.link.thumbnail = { width: 175, height: 175 };

            switch (type) {
                case 'externalUrl':
                    _underscore2.default.extend(_self._.options.link, { type: type, data: data, show: true });
                    if (prepare === true) {
                        $s.el("linkForm").style.display = 'none';
                        $s.el("processForm").style.display = 'block';
                        $s.el("processForm").innerHTML = "<div style='margin-top:-3px;float:left;'><span id='spanFetchThumb'></span></div><div style='margin-left:10px;float:left;margin-top:0px;font-size:14pt;'>Fetching URL Thumbnail (it only takes this long the first time)...</div>";

                        _ntfy && _ntfy.resize(50, 300, function () {
                            if ($s.el("spanFetchThumb") !== null) var _spinner = new spinner("spanFetchThumb", 8, 16, 15, 1, "#fff");
                        });

                        $(document.body).append($("<img style='display:none;'>").attr("src", "http://img.bitpixels.com/getthumbnail?code=57959&url=" + _self._.options.link.data + "&size=200"));
                        window.setTimeout(function () {
                            _self._.link.show();
                            _self.end();
                        }, 1000);
                    } else {
                        _self._.link.show();
                    }
                    break;
                case 'currentSlate':
                    _underscore2.default.extend(_self._.options.link, { type: type, data: data, show: true });
                    break;
                case 'externalSlate':
                    break;

            }
        };

        _self.unset = function () {
            _underscore2.default.extend(_self._.options.link, { type: '', data: '', show: false });
            _self._.link.hide();
            _self.end();
        };

        _self.processEvent = function () {
            switch (_self._.options.link.type) {
                case "externalUrl":
                    var surl = _self._.options.link.data.length > 20 ? _self._.options.link.data.substring(0, 20) + "..." : _self._.options.link.data;
                    var _msg = surl;
                    _self._.link.tooltip({ type: 'image', msg: _msg }, _self._.options.link.thumbnail.width, _self._.options.link.thumbnail.height);
                    window.setTimeout(function () {
                        _self._.link.tt[0].attr({ "fill": "url('http://img.bitpixels.com/getthumbnail?code=57959&url=" + _self._.options.link.data + "&size=200')" });
                    }, 500);
                    break;
                case "externalSlate":
                    break;
                case "currentSlate":
                    _self._.slate.addtip(_self._.link.tooltip({ type: 'text', msg: "Jump to another node" }, 140, 23));
                    break;
            }
        };

        _self.wireEvents = function () {
            _self._.link.mouseover(function (e) {
                _self._.slate.glow(_self._.link);
                _self.processEvent();
                $s.stopEvent(e);
            });

            _self._.link.mouseout(function (e) {
                _self._.slate.unglow();
                switch (_self._.options.link.type) {
                    case 'externalUrl':
                        _self._.link.untooltip();
                        break;
                    case "currentSlate":
                        _self._.slate.untooltip();
                        break;
                }
                $s.stopEvent(e);
            });

            _self._.link.click(function (e) {
                switch (_self._.options.link.type) {
                    case "externalUrl":
                        window.open(["http://", _self._.options.link.data].join(""), 'sb_external');
                        break;
                    case "externalSlate":
                        break;
                    case "currentSlate":
                        var n = _self._.slate.nodes.one(_self._.options.link.data),
                            _vpt = n.vect.getBBox(),
                            zr = _self._.slate.options.viewPort.zoom.r;

                        n.position('center', function () {
                            n.mark();
                        }, 'swingFromTo', 2000);

                        break;
                }
                $s.stopEvent(e);
            });
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._menu = function () {
        var _self = this;
        var _m = null;
        var _isOpen = false;

        _self.isOpen = function () {
            return _isOpen;
        };
        _self.show = function (ttl) {
            if (_self._.slate !== null) {
                var r = _self._.slate.paper;
                if (ttl === undefined) ttl = 3000;
                if (_m) {
                    _underscore2.default.invoke(_m, 'remove');_m = null;
                }

                var off = _self._.offset();
                // var _x = off.x + _self._.slate.options.viewPort.left;
                // var _y = off.y + _self._.slate.options.viewPort.top - 80;
                var bb = _self._.vect.getBBox();
                var _x = bb.x;
                var _y = bb.y;
                _m = r.set();

                //right, bottom, and settings connectors
                _self._.connectors.show(_x, _y, _m, function () {
                    loadParent(r, _x, _y);
                });

                if (_self.wasOpen) {
                    _self.wasOpen = false;_self._.connectors.removeSettingsButton();loadParent(r, _x, _y);
                }
            }
        };

        _self.hide = function (exceptionElemId) {
            if (_m) {
                _underscore2.default.invoke(_underscore2.default.reject(_m, function (item) {
                    return item.id === exceptionElemId;
                }), 'remove');
                _m = _underscore2.default.isUndefined(exceptionElemId) ? null : _underscore2.default.filter(_m, function (item) {
                    return item.id === exceptionElemId;
                });
            }
            _isOpen = false;
        };

        function broadcast(_pkg) {
            _self._.colorpicker.set(_pkg.data);
            _self._.slate.collab && _self._.slate.collab.send(_pkg);
        };

        function loadParent(r, _x, _y) {

            _isOpen = true;

            _y -= 80;

            //menu parent
            var _menuParent = r.rect(_x, _y, 295, 80, 10).attr({ "fill": "90-#ccc-#eee" });
            _menuParent.node.style.cursor = "pointer";
            _m.push(_menuParent);

            //toolbar -- connector, editor, deleter
            _self._.toolbar.show(_x, _y, _m);

            //color picker
            _self._.colorpicker.show({
                x: _x,
                y: _y,
                m: _m,
                onSelected: function onSelected(_swatch) {
                    _swatch.loop();
                    var _backColor = _swatch.attr("fill");
                    var _testColor = "#" + _backColor.split(/90-#/g)[1].split(/-#/g)[0];
                    var _textColor = Raphael.rgb2hsb(_testColor).b < .4 ? "#fff" : "#000";

                    if (_self._.options.image !== "") _self._.options.image = "";

                    var _pkg = { type: "onNodeColorChanged", data: { id: _self._.options.id, color: _backColor } };
                    broadcast(_pkg);
                    _self._.slate.birdseye && _self._.slate.birdseye.nodeChanged(_pkg);
                }
            });

            //shapes -- change the node shape to rect, rounded rect, ellipse
            _self._.shapes.show(_x, _y, _m);

            //lines on menu
            _m.push(r.path(["M", _x, _y + 36, "L", _x + 160, _y + 36].join(",")).attr({ stroke: "#000" }));
            _m.push(r.path(["M", _x + 160, _y, "L", _x + 160, _y + 80].join(",")).attr({ stroke: "#000" }));

            //menu
            var cls = r.deleter().attr({ fill: "#ddd", stroke: "#333" }).transform(["t", _x + 275, ",", _y - 13, "s", ",", ".75", ".75"].join());
            cls.mouseover(function () {
                _self._.slate.glow(cls);
            });
            cls.mouseout(function () {
                _self._.slate.unglow();
            });
            cls.mousedown(function () {
                _self._.slate.unglow();
                _self.hide();
            });
            _m.push(cls);
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

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
            //slate.safari();
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
            //slate.safari();
        };

        var _over = function _over(e) {
            _self._.slate.options.viewPort.allowDrag = false;

            _self._.slate.keyboard && _self._.slate.keyboard.start(_self._);

            //close all open menus
            _self._.slate.nodes.closeAllMenus(_self._.options.id);
            if (Session && (!Session.get('elementIsBeingResized') || Session.get('elementIsBeingResized') === false)) {
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

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

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

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

var _getTransformedPath = __webpack_require__(1);

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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($s, $n) {
    $n.fn._template = new function () {
        var _self = this;

        _self.hello = function () {
            alert(parent.options.name);
        };

        return _self;
    }();
})(Slatebox, Slatebox.fn.node);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $n) {
    $n.fn._toolbar = function () {
        var _self = this;
        _self.show = function (x, y, _m) {
            var y = y + 1;
            var _r = _self._.slate.paper;

            //build toolbar
            var cOptions = { fill: "#eee", stroke: "#333" };
            var cs = 14,
                cm = 16;

            toolbar = [_r.handle().data({ msg: 'Connect To Node', width: 110 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x, ",", y, "s", ".85", ".85"].join()), _r.deleter().data({ msg: 'Delete', width: 54 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 30, ",", y, "s", ".85", ".85"].join()), _r.editor().data({ msg: 'Edit Text', width: 65 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 60, ",", y, "s", ".85", ".85"].join()), _r.searcher().data({ msg: 'Embed Image', width: 90 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 90, ",", y, "s", ".85", ".85"].join()), _r.link().data({ msg: 'Add Link', width: 62 }).attr({ fill: "90-#999-#ccc", stroke: "#333", "stroke-width": 2 }).transform(["t", x + 120, ",", y, "s", ".85", ".85"].join())];

            _underscore2.default.each(toolbar, function (toolbarElem) {
                toolbarElem.mouseover(function (e) {
                    _self._.slate.glow(this);
                    var _text = this.data("msg");
                    _self._.slate.addtip(this.tooltip({ type: 'text', msg: _text }, this.data("width"), this.data("height")));
                    $s.stopEvent(e);
                });
                toolbarElem.mouseout(function (e) {
                    if (_self._ && _self._.slate) {
                        _self._.slate.unglow();
                        this.untooltip();
                    }
                    $s.stopEvent(e);
                });
            });

            for (t = 0; t < 5; t++) {
                (function (t) {
                    _underscore2.default.each(['mousedown'], function (eventType) {
                        toolbar[t][eventType](function (e) {
                            e.stopPropagation();
                            _self._.slate.unglow();
                            _self._.slate.untooltip();
                            if (_self._.events && _underscore2.default.isFunction(_self._.events.onToolbarClick)) {
                                _self._.events.onToolbarClick.apply(this, [t]);
                            } else {
                                if (t === 0) {
                                    //connector
                                    _self._.relationships.initiateTempNode(e, _self._, true);
                                    _self._.menu.hide();
                                } else if (t === 1) {
                                    _self.del();
                                } else if (t === 2) {
                                    _self._.slate.stopEditing();
                                    //fire the editor
                                    _self._.position('center', function () {
                                        _self._.editor.start();
                                    });
                                } else if (t === 3) {
                                    //searcher
                                    //var mp = $s.mousePos(e);
                                    //mp.y = mp.y + 130; //adjust up
                                    _self._.slate.unMarkAll();
                                    _self._.slate.stopEditing();
                                    _self._.position('center', function () {
                                        _self._.images.start();
                                    });
                                } else if (t === 4) {
                                    //var mp = $s.mousePos(e);
                                    //mp.y = mp.y + 130; //adjust up

                                    _self._.slate.unMarkAll();
                                    _self._.slate.stopEditing();

                                    _self._.position('center', function () {
                                        _self._.links.start();
                                    });
                                }
                            }
                        });
                    });
                })(t);
            }_underscore2.default.each(toolbar, function (toolbarElem) {
                _m.push(toolbarElem);
            });
            return _self;
        };

        _self.del = function () {

            var nn = _self._.slate.nodes.allNodes;
            var _valid = _underscore2.default.filter(nn, function (n) {
                return n.options.allowDrag && n.options.allowContext && n.options.allowResize && n.options.allowMenu;
            });

            if (_valid.length <= 1) {
                alert("Sorry, this is the last editable node on the slate, you cannot delete this one!");
            } else {
                var s = _self._.slate;
                _self._.del();
                var delPkg = { type: 'onNodeDeleted', data: { id: _self._.options.id } };
                s.collab && s.collab.send(delPkg);
                s.birdseye && s.birdseye.nodeDeleted(delPkg);
            }
        };

        return _self;
    };
})(Slatebox, Slatebox.fn.node);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// Copyright (c) 2017 Adobe Systems Incorporated. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// ┌────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.5.4 - JavaScript Events Library                      │ \\
// ├────────────────────────────────────────────────────────────┤ \\
// │ Author Dmitry Baranovskiy (http://dmitry.baranovskiy.com/) │ \\
// └────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.5.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        comaseparator = /\s*,\s*/,
        wildcard = "*",
        numsort = function numsort(a, b) {
        return a - b;
    },
        current_event,
        stop,
        events = { n: {} },
        firstDefined = function firstDefined() {
        for (var i = 0, ii = this.length; i < ii; i++) {
            if (typeof this[i] != "undefined") {
                return this[i];
            }
        }
    },
        lastDefined = function lastDefined() {
        var i = this.length;
        while (--i) {
            if (typeof this[i] != "undefined") {
                return this[i];
            }
        }
    },
        objtos = Object.prototype.toString,
        Str = String,
        isArray = Array.isArray || function (ar) {
        return ar instanceof Array || objtos.call(ar) == "[object Array]";
    },

    /*\
     * eve
     [ method ]
      * Fires event with given `name`, given scope and other parameters.
      - name (string) name of the *event*, dot (`.`) or slash (`/`) separated
     - scope (object) context for the event handlers
     - varargs (...) the rest of arguments will be sent to event handlers
      = (object) array of returned values from the listeners. Array has two methods `.firstDefined()` and `.lastDefined()` to get first or last not `undefined` value.
    \*/
    eve = function eve(name, scope) {
        var oldstop = stop,
            args = Array.prototype.slice.call(arguments, 2),
            listeners = eve.listeners(name),
            z = 0,
            l,
            indexed = [],
            queue = {},
            out = [],
            ce = current_event;
        out.firstDefined = firstDefined;
        out.lastDefined = lastDefined;
        current_event = name;
        stop = 0;
        for (var i = 0, ii = listeners.length; i < ii; i++) {
            if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
        }indexed.sort(numsort);
        while (indexed[z] < 0) {
            l = queue[indexed[z++]];
            out.push(l.apply(scope, args));
            if (stop) {
                stop = oldstop;
                return out;
            }
        }
        for (i = 0; i < ii; i++) {
            l = listeners[i];
            if ("zIndex" in l) {
                if (l.zIndex == indexed[z]) {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                    do {
                        z++;
                        l = queue[indexed[z]];
                        l && out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                    } while (l);
                } else {
                    queue[l.zIndex] = l;
                }
            } else {
                out.push(l.apply(scope, args));
                if (stop) {
                    break;
                }
            }
        }
        stop = oldstop;
        current_event = ce;
        return out;
    };
    // Undocumented. Debug only.
    eve._events = events;
    /*\
     * eve.listeners
     [ method ]
      * Internal method which gives you array of all event handlers that will be triggered by the given `name`.
      - name (string) name of the event, dot (`.`) or slash (`/`) separated
      = (array) array of event handlers
    \*/
    eve.listeners = function (name) {
        var names = isArray(name) ? name : name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    /*\
     * eve.separator
     [ method ]
      * If for some reasons you don’t like default separators (`.` or `/`) you can specify yours
     * here. Be aware that if you pass a string longer than one character it will be treated as
     * a list of characters.
      - separator (string) new separator. Empty string resets to default: `.` or `/`.
    \*/
    eve.separator = function (sep) {
        if (sep) {
            sep = Str(sep).replace(/(?=[\.\^\]\[\-])/g, "\\");
            sep = "[" + sep + "]";
            separator = new RegExp(sep);
        } else {
            separator = /[\.\/]/;
        }
    };
    /*\
     * eve.on
     [ method ]
     **
     * Binds given event handler with a given name. You can use wildcards “`*`” for the names:
     | eve.on("*.under.*", f);
     | eve("mouse.under.floor"); // triggers f
     * Use @eve to trigger the listener.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     - name (array) if you don’t want to use separators, you can use array of strings
     - f (function) event handler function
     **
     = (function) returned function accepts a single numeric parameter that represents z-index of the handler. It is an optional feature and only used when you need to ensure that some subset of handlers will be invoked in a given order, despite of the order of assignment.
     > Example:
     | eve.on("mouse", eatIt)(2);
     | eve.on("mouse", scream);
     | eve.on("mouse", catchIt)(1);
     * This will ensure that `catchIt` function will be called before `eatIt`.
     *
     * If you want to put your handler before non-indexed handlers, specify a negative value.
     * Note: I assume most of the time you don’t need to worry about z-index, but it’s nice to have this feature “just in case”.
    \*/
    eve.on = function (name, f) {
        if (typeof f != "function") {
            return function () {};
        }
        var names = isArray(name) ? isArray(name[0]) ? name : [name] : Str(name).split(comaseparator);
        for (var i = 0, ii = names.length; i < ii; i++) {
            (function (name) {
                var names = isArray(name) ? name : Str(name).split(separator),
                    e = events,
                    exist;
                for (var i = 0, ii = names.length; i < ii; i++) {
                    e = e.n;
                    e = e.hasOwnProperty(names[i]) && e[names[i]] || (e[names[i]] = { n: {} });
                }
                e.f = e.f || [];
                for (i = 0, ii = e.f.length; i < ii; i++) {
                    if (e.f[i] == f) {
                        exist = true;
                        break;
                    }
                }!exist && e.f.push(f);
            })(names[i]);
        }
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    /*\
     * eve.f
     [ method ]
     **
     * Returns function that will fire given event with optional arguments.
     * Arguments that will be passed to the result function will be also
     * concated to the list of final arguments.
     | el.onclick = eve.f("click", 1, 2);
     | eve.on("click", function (a, b, c) {
     |     console.log(a, b, c); // 1, 2, [event object]
     | });
     - event (string) event name
     - varargs (…) and any other arguments
     = (function) possible event handler function
    \*/
    eve.f = function (event) {
        var attrs = [].slice.call(arguments, 1);
        return function () {
            eve.apply(null, [event, null].concat(attrs).concat([].slice.call(arguments, 0)));
        };
    };
    /*\
     * eve.stop
     [ method ]
     **
     * Is used inside an event handler to stop the event, preventing any subsequent listeners from firing.
    \*/
    eve.stop = function () {
        stop = 1;
    };
    /*\
     * eve.nt
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     - subname (string) #optional subname of the event
     **
     = (string) name of the event, if `subname` is not specified
     * or
     = (boolean) `true`, if current event’s name contains `subname`
    \*/
    eve.nt = function (subname) {
        var cur = isArray(current_event) ? current_event.join(".") : current_event;
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(cur);
        }
        return cur;
    };
    /*\
     * eve.nts
     [ method ]
     **
     * Could be used inside event handler to figure out actual name of the event.
     **
     **
     = (array) names of the event
    \*/
    eve.nts = function () {
        return isArray(current_event) ? current_event : current_event.split(separator);
    };
    /*\
     * eve.off
     [ method ]
     **
     * Removes given function from the list of event listeners assigned to given name.
     * If no arguments specified all the events will be cleared.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
    \*/
    /*\
     * eve.unbind
     [ method ]
     **
     * See @eve.off
    \*/
    eve.off = eve.unbind = function (name, f) {
        if (!name) {
            eve._events = events = { n: {} };
            return;
        }
        var names = isArray(name) ? isArray(name[0]) ? name : [name] : Str(name).split(comaseparator);
        if (names.length > 1) {
            for (var i = 0, ii = names.length; i < ii; i++) {
                eve.off(names[i], f);
            }
            return;
        }
        names = isArray(name) ? name : Str(name).split(separator);
        var e,
            key,
            splice,
            i,
            ii,
            j,
            jj,
            cur = [events],
            inodes = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                        inodes.unshift({
                            n: e,
                            name: names[i]
                        });
                    }
                } else {
                    for (key in e) {
                        if (e[has](key)) {
                            splice.push(e[key]);
                            inodes.unshift({
                                n: e,
                                name: key
                            });
                        }
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) {
                            if (e.f[j] == f) {
                                e.f.splice(j, 1);
                                break;
                            }
                        }!e.f.length && delete e.f;
                    }
                    for (key in e.n) {
                        if (e.n[has](key) && e.n[key].f) {
                            var funcs = e.n[key].f;
                            for (j = 0, jj = funcs.length; j < jj; j++) {
                                if (funcs[j] == f) {
                                    funcs.splice(j, 1);
                                    break;
                                }
                            }!funcs.length && delete e.n[key].f;
                        }
                    }
                } else {
                    delete e.f;
                    for (key in e.n) {
                        if (e.n[has](key) && e.n[key].f) {
                            delete e.n[key].f;
                        }
                    }
                }
                e = e.n;
            }
        }
        // prune inner nodes in path
        prune: for (i = 0, ii = inodes.length; i < ii; i++) {
            e = inodes[i];
            for (key in e.n[e.name].f) {
                // not empty (has listeners)
                continue prune;
            }
            for (key in e.n[e.name].n) {
                // not empty (has children)
                continue prune;
            }
            // is empty
            delete e.n[e.name];
        }
    };
    /*\
     * eve.once
     [ method ]
     **
     * Binds given event handler with a given name to only run once then unbind itself.
     | eve.once("login", f);
     | eve("login"); // triggers f
     | eve("login"); // no listeners
     * Use @eve to trigger the listener.
     **
     - name (string) name of the event, dot (`.`) or slash (`/`) separated, with optional wildcards
     - f (function) event handler function
     **
     = (function) same return function as @eve.on
    \*/
    eve.once = function (name, f) {
        var f2 = function f2() {
            eve.off(name, f2);
            return f.apply(this, arguments);
        };
        return eve.on(name, f2);
    };
    /*\
     * eve.version
     [ property (string) ]
     **
     * Current version of the library.
    \*/
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    glob.eve = eve;
    typeof module != "undefined" && module.exports ? module.exports = eve :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
        return eve;
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : glob.eve = eve;
})(typeof window != "undefined" ? window : undefined);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// ┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.2.0 - JavaScript Vector Library                                                             │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2016 Dmitry Baranovskiy (http://raphaeljs.com)                                       │ \\
// │ Copyright © 2008-2016 Sencha Labs (http://sencha.com)                                                 │ \\
// ├───────────────────────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (https://github.com/DmitryBaranovskiy/raphael/blob/master/license.txt) license.│ \\
// └───────────────────────────────────────────────────────────────────────────────────────────────────────┘ \\

(function webpackUniversalModuleDefinition(root, factory) {
    root["Raphael"] = factory(root["eve"]);
})(window, function (__WEBPACK_EXTERNAL_MODULE_2__) {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};

            /******/ // The require function
            /******/function __webpack_require__(moduleId) {

                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId])
                    /******/return installedModules[moduleId].exports;

                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/exports: {},
                    /******/id: moduleId,
                    /******/loaded: false
                    /******/ };

                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

                /******/ // Flag the module as loaded
                /******/module.loaded = true;

                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }

            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;

            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;

            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";

            /******/ // Load entry module and return exports
            /******/return __webpack_require__(0);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (R) {

                return R;
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (eve) {

                /*\
                 * Raphael
                 [ method ]
                 **
                 * Creates a canvas object on which to draw.
                 * You must do this first, as all future calls to drawing methods
                 * from this instance will be bound to this canvas.
                 > Parameters
                 **
                 - container (HTMLElement|string) DOM element or its ID which is going to be a parent for drawing surface
                 - width (number)
                 - height (number)
                 - callback (function) #optional callback function which is going to be executed in the context of newly created paper
                 * or
                 - x (number)
                 - y (number)
                 - width (number)
                 - height (number)
                 - callback (function) #optional callback function which is going to be executed in the context of newly created paper
                 * or
                 - all (array) (first 3 or 4 elements in the array are equal to [containerID, width, height] or [x, y, width, height]. The rest are element descriptions in format {type: type, <attributes>}). See @Paper.add.
                 - callback (function) #optional callback function which is going to be executed in the context of newly created paper
                 * or
                 - onReadyCallback (function) function that is going to be called on DOM ready event. You can also subscribe to this event via Eve’s “DOMLoad” event. In this case method returns `undefined`.
                 = (object) @Paper
                 > Usage
                 | // Each of the following examples create a canvas
                 | // that is 320px wide by 200px high.
                 | // Canvas is created at the viewport’s 10,50 coordinate.
                 | var paper = Raphael(10, 50, 320, 200);
                 | // Canvas is created at the top left corner of the #notepad element
                 | // (or its top right corner in dir="rtl" elements)
                 | var paper = Raphael(document.getElementById("notepad"), 320, 200);
                 | // Same as above
                 | var paper = Raphael("notepad", 320, 200);
                 | // Image dump
                 | var set = Raphael(["notepad", 320, 200, {
                 |     type: "rect",
                 |     x: 10,
                 |     y: 10,
                 |     width: 25,
                 |     height: 25,
                 |     stroke: "#f00"
                 | }, {
                 |     type: "text",
                 |     x: 30,
                 |     y: 40,
                 |     text: "Dump"
                 | }]);
                \*/
                function R(first) {
                    if (R.is(first, "function")) {
                        return loaded ? first() : eve.on("raphael.DOMload", first);
                    } else if (R.is(first, array)) {
                        return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
                    } else {
                        var args = Array.prototype.slice.call(arguments, 0);
                        if (R.is(args[args.length - 1], "function")) {
                            var f = args.pop();
                            return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                                f.call(R._engine.create[apply](R, args));
                            });
                        } else {
                            return R._engine.create[apply](R, arguments);
                        }
                    }
                }
                R.version = "2.2.0";
                R.eve = eve;
                var loaded,
                    separator = /[, ]+/,
                    elements = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
                    formatrg = /\{(\d+)\}/g,
                    proto = "prototype",
                    has = "hasOwnProperty",
                    g = {
                    doc: document,
                    win: window
                },
                    oldRaphael = {
                    was: Object.prototype[has].call(g.win, "Raphael"),
                    is: g.win.Raphael
                },
                    Paper = function Paper() {
                    /*\
                     * Paper.ca
                     [ property (object) ]
                     **
                     * Shortcut for @Paper.customAttributes
                    \*/
                    /*\
                     * Paper.customAttributes
                     [ property (object) ]
                     **
                     * If you have a set of attributes that you would like to represent
                     * as a function of some number you can do it easily with custom attributes:
                     > Usage
                     | paper.customAttributes.hue = function (num) {
                     |     num = num % 1;
                     |     return {fill: "hsb(" + num + ", 0.75, 1)"};
                     | };
                     | // Custom attribute “hue” will change fill
                     | // to be given hue with fixed saturation and brightness.
                     | // Now you can use it like this:
                     | var c = paper.circle(10, 10, 10).attr({hue: .45});
                     | // or even like this:
                     | c.animate({hue: 1}, 1e3);
                     |
                     | // You could also create custom attribute
                     | // with multiple parameters:
                     | paper.customAttributes.hsb = function (h, s, b) {
                     |     return {fill: "hsb(" + [h, s, b].join(",") + ")"};
                     | };
                     | c.attr({hsb: "0.5 .8 1"});
                     | c.animate({hsb: [1, 0, 0.5]}, 1e3);
                    \*/
                    this.ca = this.customAttributes = {};
                },
                    paperproto,
                    appendChild = "appendChild",
                    apply = "apply",
                    concat = "concat",
                    supportsTouch = 'ontouchstart' in g.win || g.win.DocumentTouch && g.doc instanceof DocumentTouch,
                    //taken from Modernizr touch test
                E = "",
                    S = " ",
                    Str = String,
                    split = "split",
                    events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
                    touchMap = {
                    mousedown: "touchstart",
                    mousemove: "touchmove",
                    mouseup: "touchend"
                },
                    lowerCase = Str.prototype.toLowerCase,
                    math = Math,
                    mmax = math.max,
                    mmin = math.min,
                    abs = math.abs,
                    pow = math.pow,
                    PI = math.PI,
                    nu = "number",
                    string = "string",
                    array = "array",
                    toString = "toString",
                    fillString = "fill",
                    objectToString = Object.prototype.toString,
                    paper = {},
                    push = "push",
                    ISURL = R._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
                    colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
                    isnan = { "NaN": 1, "Infinity": 1, "-Infinity": 1 },
                    bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
                    round = math.round,
                    setAttribute = "setAttribute",
                    toFloat = parseFloat,
                    toInt = parseInt,
                    upperCase = Str.prototype.toUpperCase,
                    availableAttrs = R._availableAttrs = {
                    "arrow-end": "none",
                    "arrow-start": "none",
                    blur: 0,
                    "clip-rect": "0 0 1e9 1e9",
                    cursor: "default",
                    cx: 0,
                    cy: 0,
                    fill: "#fff",
                    "fill-opacity": 1,
                    font: '10px "Arial"',
                    "font-family": '"Arial"',
                    "font-size": "10",
                    "font-style": "normal",
                    "font-weight": 400,
                    gradient: 0,
                    height: 0,
                    href: "http://raphaeljs.com/",
                    "letter-spacing": 0,
                    opacity: 1,
                    path: "M0,0",
                    r: 0,
                    rx: 0,
                    ry: 0,
                    src: "",
                    stroke: "#000",
                    "stroke-dasharray": "",
                    "stroke-linecap": "butt",
                    "stroke-linejoin": "butt",
                    "stroke-miterlimit": 0,
                    "stroke-opacity": 1,
                    "stroke-width": 1,
                    target: "_blank",
                    "text-anchor": "middle",
                    title: "Raphael",
                    transform: "",
                    width: 0,
                    x: 0,
                    y: 0,
                    "class": ""
                },
                    availableAnimAttrs = R._availableAnimAttrs = {
                    blur: nu,
                    "clip-rect": "csv",
                    cx: nu,
                    cy: nu,
                    fill: "colour",
                    "fill-opacity": nu,
                    "font-size": nu,
                    height: nu,
                    opacity: nu,
                    path: "path",
                    r: nu,
                    rx: nu,
                    ry: nu,
                    stroke: "colour",
                    "stroke-opacity": nu,
                    "stroke-width": nu,
                    transform: "transform",
                    width: nu,
                    x: nu,
                    y: nu
                },
                    whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
                    commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
                    hsrg = { hs: 1, rg: 1 },
                    p2s = /,?([achlmqrstvxz]),?/gi,
                    pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
                    tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
                    pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
                    radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
                    eldata = {},
                    sortByKey = function sortByKey(a, b) {
                    return a.key - b.key;
                },
                    sortByNumber = function sortByNumber(a, b) {
                    return toFloat(a) - toFloat(b);
                },
                    fun = function fun() {},
                    pipe = function pipe(x) {
                    return x;
                },
                    rectPath = R._rectPath = function (x, y, w, h, r) {
                    if (r) {
                        return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
                    }
                    return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
                },
                    ellipsePath = function ellipsePath(x, y, rx, ry) {
                    if (ry == null) {
                        ry = rx;
                    }
                    return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
                },
                    getPath = R._getPath = {
                    path: function path(el) {
                        return el.attr("path");
                    },
                    circle: function circle(el) {
                        var a = el.attrs;
                        return ellipsePath(a.cx, a.cy, a.r);
                    },
                    ellipse: function ellipse(el) {
                        var a = el.attrs;
                        return ellipsePath(a.cx, a.cy, a.rx, a.ry);
                    },
                    rect: function rect(el) {
                        var a = el.attrs;
                        return rectPath(a.x, a.y, a.width, a.height, a.r);
                    },
                    image: function image(el) {
                        var a = el.attrs;
                        return rectPath(a.x, a.y, a.width, a.height);
                    },
                    text: function text(el) {
                        var bbox = el._getBBox();
                        return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
                    },
                    set: function set(el) {
                        var bbox = el._getBBox();
                        return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
                    }
                },

                /*\
                 * Raphael.mapPath
                 [ method ]
                 **
                 * Transform the path string with given matrix.
                 > Parameters
                 - path (string) path string
                 - matrix (object) see @Matrix
                 = (string) transformed path string
                \*/
                mapPath = R.mapPath = function (path, matrix) {
                    if (!matrix) {
                        return path;
                    }
                    var x, y, i, j, ii, jj, pathi;
                    path = path2curve(path);
                    for (i = 0, ii = path.length; i < ii; i++) {
                        pathi = path[i];
                        for (j = 1, jj = pathi.length; j < jj; j += 2) {
                            x = matrix.x(pathi[j], pathi[j + 1]);
                            y = matrix.y(pathi[j], pathi[j + 1]);
                            pathi[j] = x;
                            pathi[j + 1] = y;
                        }
                    }
                    return path;
                };

                R._g = g;
                /*\
                 * Raphael.type
                 [ property (string) ]
                 **
                 * Can be “SVG”, “VML” or empty, depending on browser support.
                \*/
                R.type = g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML";
                if (R.type == "VML") {
                    var d = g.doc.createElement("div"),
                        b;
                    d.innerHTML = '<v:shape adj="1"/>';
                    b = d.firstChild;
                    b.style.behavior = "url(#default#VML)";
                    if (!(b && _typeof(b.adj) == "object")) {
                        return R.type = E;
                    }
                    d = null;
                }
                /*\
                 * Raphael.svg
                 [ property (boolean) ]
                 **
                 * `true` if browser supports SVG.
                \*/
                /*\
                 * Raphael.vml
                 [ property (boolean) ]
                 **
                 * `true` if browser supports VML.
                \*/
                R.svg = !(R.vml = R.type == "VML");
                R._Paper = Paper;
                /*\
                 * Raphael.fn
                 [ property (object) ]
                 **
                 * You can add your own method to the canvas. For example if you want to draw a pie chart,
                 * you can create your own pie chart function and ship it as a Raphaël plugin. To do this
                 * you need to extend the `Raphael.fn` object. You should modify the `fn` object before a
                 * Raphaël instance is created, otherwise it will take no effect. Please note that the
                 * ability for namespaced plugins was removed in Raphael 2.0. It is up to the plugin to
                 * ensure any namespacing ensures proper context.
                 > Usage
                 | Raphael.fn.arrow = function (x1, y1, x2, y2, size) {
                 |     return this.path( ... );
                 | };
                 | // or create namespace
                 | Raphael.fn.mystuff = {
                 |     arrow: function () {…},
                 |     star: function () {…},
                 |     // etc…
                 | };
                 | var paper = Raphael(10, 10, 630, 480);
                 | // then use it
                 | paper.arrow(10, 10, 30, 30, 5).attr({fill: "#f00"});
                 | paper.mystuff.arrow();
                 | paper.mystuff.star();
                \*/
                R.fn = paperproto = Paper.prototype = R.prototype;
                R._id = 0;
                /*\
                 * Raphael.is
                 [ method ]
                 **
                 * Handful of replacements for `typeof` operator.
                 > Parameters
                 - o (…) any object or primitive
                 - type (string) name of the type, i.e. “string”, “function”, “number”, etc.
                 = (boolean) is given value is of given type
                \*/
                R.is = function (o, type) {
                    type = lowerCase.call(type);
                    if (type == "finite") {
                        return !isnan[has](+o);
                    }
                    if (type == "array") {
                        return o instanceof Array;
                    }
                    return type == "null" && o === null || type == (typeof o === "undefined" ? "undefined" : _typeof(o)) && o !== null || type == "object" && o === Object(o) || type == "array" && Array.isArray && Array.isArray(o) || objectToString.call(o).slice(8, -1).toLowerCase() == type;
                };

                function clone(obj) {
                    if (typeof obj == "function" || Object(obj) !== obj) {
                        return obj;
                    }
                    var res = new obj.constructor();
                    for (var key in obj) {
                        if (obj[has](key)) {
                            res[key] = clone(obj[key]);
                        }
                    }return res;
                }

                /*\
                 * Raphael.angle
                 [ method ]
                 **
                 * Returns angle between two or three points
                 > Parameters
                 - x1 (number) x coord of first point
                 - y1 (number) y coord of first point
                 - x2 (number) x coord of second point
                 - y2 (number) y coord of second point
                 - x3 (number) #optional x coord of third point
                 - y3 (number) #optional y coord of third point
                 = (number) angle in degrees.
                \*/
                R.angle = function (x1, y1, x2, y2, x3, y3) {
                    if (x3 == null) {
                        var x = x1 - x2,
                            y = y1 - y2;
                        if (!x && !y) {
                            return 0;
                        }
                        return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
                    } else {
                        return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
                    }
                };
                /*\
                 * Raphael.rad
                 [ method ]
                 **
                 * Transform angle to radians
                 > Parameters
                 - deg (number) angle in degrees
                 = (number) angle in radians.
                \*/
                R.rad = function (deg) {
                    return deg % 360 * PI / 180;
                };
                /*\
                 * Raphael.deg
                 [ method ]
                 **
                 * Transform angle to degrees
                 > Parameters
                 - rad (number) angle in radians
                 = (number) angle in degrees.
                \*/
                R.deg = function (rad) {
                    return Math.round(rad * 180 / PI % 360 * 1000) / 1000;
                };
                /*\
                 * Raphael.snapTo
                 [ method ]
                 **
                 * Snaps given value to given grid.
                 > Parameters
                 - values (array|number) given array of values or step of the grid
                 - value (number) value to adjust
                 - tolerance (number) #optional tolerance for snapping. Default is `10`.
                 = (number) adjusted value.
                \*/
                R.snapTo = function (values, value, tolerance) {
                    tolerance = R.is(tolerance, "finite") ? tolerance : 10;
                    if (R.is(values, array)) {
                        var i = values.length;
                        while (i--) {
                            if (abs(values[i] - value) <= tolerance) {
                                return values[i];
                            }
                        }
                    } else {
                        values = +values;
                        var rem = value % values;
                        if (rem < tolerance) {
                            return value - rem;
                        }
                        if (rem > values - tolerance) {
                            return value - rem + values;
                        }
                    }
                    return value;
                };

                /*\
                 * Raphael.createUUID
                 [ method ]
                 **
                 * Returns RFC4122, version 4 ID
                \*/
                var createUUID = R.createUUID = function (uuidRegEx, uuidReplacer) {
                    return function () {
                        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
                    };
                }(/[xy]/g, function (c) {
                    var r = math.random() * 16 | 0,
                        v = c == "x" ? r : r & 3 | 8;
                    return v.toString(16);
                });

                /*\
                 * Raphael.setWindow
                 [ method ]
                 **
                 * Used when you need to draw in `&lt;iframe>`. Switched window to the iframe one.
                 > Parameters
                 - newwin (window) new window object
                \*/
                R.setWindow = function (newwin) {
                    eve("raphael.setWindow", R, g.win, newwin);
                    g.win = newwin;
                    g.doc = g.win.document;
                    if (R._engine.initWin) {
                        R._engine.initWin(g.win);
                    }
                };
                var _toHex = function toHex(color) {
                    if (R.vml) {
                        // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
                        var trim = /^\s+|\s+$/g;
                        var bod;
                        try {
                            var docum = new ActiveXObject("htmlfile");
                            docum.write("<body>");
                            docum.close();
                            bod = docum.body;
                        } catch (e) {
                            bod = createPopup().document.body;
                        }
                        var range = bod.createTextRange();
                        _toHex = cacher(function (color) {
                            try {
                                bod.style.color = Str(color).replace(trim, E);
                                var value = range.queryCommandValue("ForeColor");
                                value = (value & 255) << 16 | value & 65280 | (value & 16711680) >>> 16;
                                return "#" + ("000000" + value.toString(16)).slice(-6);
                            } catch (e) {
                                return "none";
                            }
                        });
                    } else {
                        var i = g.doc.createElement("i");
                        i.title = "Rapha\xebl Colour Picker";
                        i.style.display = "none";
                        g.doc.body.appendChild(i);
                        _toHex = cacher(function (color) {
                            i.style.color = color;
                            return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
                        });
                    }
                    return _toHex(color);
                },
                    hsbtoString = function hsbtoString() {
                    return "hsb(" + [this.h, this.s, this.b] + ")";
                },
                    hsltoString = function hsltoString() {
                    return "hsl(" + [this.h, this.s, this.l] + ")";
                },
                    rgbtoString = function rgbtoString() {
                    return this.hex;
                },
                    prepareRGB = function prepareRGB(r, g, b) {
                    if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
                        b = r.b;
                        g = r.g;
                        r = r.r;
                    }
                    if (g == null && R.is(r, string)) {
                        var clr = R.getRGB(r);
                        r = clr.r;
                        g = clr.g;
                        b = clr.b;
                    }
                    if (r > 1 || g > 1 || b > 1) {
                        r /= 255;
                        g /= 255;
                        b /= 255;
                    }

                    return [r, g, b];
                },
                    packageRGB = function packageRGB(r, g, b, o) {
                    r *= 255;
                    g *= 255;
                    b *= 255;
                    var rgb = {
                        r: r,
                        g: g,
                        b: b,
                        hex: R.rgb(r, g, b),
                        toString: rgbtoString
                    };
                    R.is(o, "finite") && (rgb.opacity = o);
                    return rgb;
                };

                /*\
                 * Raphael.color
                 [ method ]
                 **
                 * Parses the color string and returns object with all values for the given color.
                 > Parameters
                 - clr (string) color string in one of the supported formats (see @Raphael.getRGB)
                 = (object) Combined RGB & HSB object in format:
                 o {
                 o     r (number) red,
                 o     g (number) green,
                 o     b (number) blue,
                 o     hex (string) color in HTML/CSS format: #••••••,
                 o     error (boolean) `true` if string can’t be parsed,
                 o     h (number) hue,
                 o     s (number) saturation,
                 o     v (number) value (brightness),
                 o     l (number) lightness
                 o }
                \*/
                R.color = function (clr) {
                    var rgb;
                    if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
                        rgb = R.hsb2rgb(clr);
                        clr.r = rgb.r;
                        clr.g = rgb.g;
                        clr.b = rgb.b;
                        clr.hex = rgb.hex;
                    } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
                        rgb = R.hsl2rgb(clr);
                        clr.r = rgb.r;
                        clr.g = rgb.g;
                        clr.b = rgb.b;
                        clr.hex = rgb.hex;
                    } else {
                        if (R.is(clr, "string")) {
                            clr = R.getRGB(clr);
                        }
                        if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                            rgb = R.rgb2hsl(clr);
                            clr.h = rgb.h;
                            clr.s = rgb.s;
                            clr.l = rgb.l;
                            rgb = R.rgb2hsb(clr);
                            clr.v = rgb.b;
                        } else {
                            clr = { hex: "none" };
                            clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
                        }
                    }
                    clr.toString = rgbtoString;
                    return clr;
                };
                /*\
                 * Raphael.hsb2rgb
                 [ method ]
                 **
                 * Converts HSB values to RGB object.
                 > Parameters
                 - h (number) hue
                 - s (number) saturation
                 - v (number) value or brightness
                 = (object) RGB object in format:
                 o {
                 o     r (number) red,
                 o     g (number) green,
                 o     b (number) blue,
                 o     hex (string) color in HTML/CSS format: #••••••
                 o }
                \*/
                R.hsb2rgb = function (h, s, v, o) {
                    if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
                        v = h.b;
                        s = h.s;
                        o = h.o;
                        h = h.h;
                    }
                    h *= 360;
                    var R, G, B, X, C;
                    h = h % 360 / 60;
                    C = v * s;
                    X = C * (1 - abs(h % 2 - 1));
                    R = G = B = v - C;

                    h = ~~h;
                    R += [C, X, 0, 0, X, C][h];
                    G += [X, C, C, X, 0, 0][h];
                    B += [0, 0, X, C, C, X][h];
                    return packageRGB(R, G, B, o);
                };
                /*\
                 * Raphael.hsl2rgb
                 [ method ]
                 **
                 * Converts HSL values to RGB object.
                 > Parameters
                 - h (number) hue
                 - s (number) saturation
                 - l (number) luminosity
                 = (object) RGB object in format:
                 o {
                 o     r (number) red,
                 o     g (number) green,
                 o     b (number) blue,
                 o     hex (string) color in HTML/CSS format: #••••••
                 o }
                \*/
                R.hsl2rgb = function (h, s, l, o) {
                    if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
                        l = h.l;
                        s = h.s;
                        h = h.h;
                    }
                    if (h > 1 || s > 1 || l > 1) {
                        h /= 360;
                        s /= 100;
                        l /= 100;
                    }
                    h *= 360;
                    var R, G, B, X, C;
                    h = h % 360 / 60;
                    C = 2 * s * (l < .5 ? l : 1 - l);
                    X = C * (1 - abs(h % 2 - 1));
                    R = G = B = l - C / 2;

                    h = ~~h;
                    R += [C, X, 0, 0, X, C][h];
                    G += [X, C, C, X, 0, 0][h];
                    B += [0, 0, X, C, C, X][h];
                    return packageRGB(R, G, B, o);
                };
                /*\
                 * Raphael.rgb2hsb
                 [ method ]
                 **
                 * Converts RGB values to HSB object.
                 > Parameters
                 - r (number) red
                 - g (number) green
                 - b (number) blue
                 = (object) HSB object in format:
                 o {
                 o     h (number) hue
                 o     s (number) saturation
                 o     b (number) brightness
                 o }
                \*/
                R.rgb2hsb = function (r, g, b) {
                    b = prepareRGB(r, g, b);
                    r = b[0];
                    g = b[1];
                    b = b[2];

                    var H, S, V, C;
                    V = mmax(r, g, b);
                    C = V - mmin(r, g, b);
                    H = C == 0 ? null : V == r ? (g - b) / C : V == g ? (b - r) / C + 2 : (r - g) / C + 4;
                    H = (H + 360) % 6 * 60 / 360;
                    S = C == 0 ? 0 : C / V;
                    return { h: H, s: S, b: V, toString: hsbtoString };
                };
                /*\
                 * Raphael.rgb2hsl
                 [ method ]
                 **
                 * Converts RGB values to HSL object.
                 > Parameters
                 - r (number) red
                 - g (number) green
                 - b (number) blue
                 = (object) HSL object in format:
                 o {
                 o     h (number) hue
                 o     s (number) saturation
                 o     l (number) luminosity
                 o }
                \*/
                R.rgb2hsl = function (r, g, b) {
                    b = prepareRGB(r, g, b);
                    r = b[0];
                    g = b[1];
                    b = b[2];

                    var H, S, L, M, m, C;
                    M = mmax(r, g, b);
                    m = mmin(r, g, b);
                    C = M - m;
                    H = C == 0 ? null : M == r ? (g - b) / C : M == g ? (b - r) / C + 2 : (r - g) / C + 4;
                    H = (H + 360) % 6 * 60 / 360;
                    L = (M + m) / 2;
                    S = C == 0 ? 0 : L < .5 ? C / (2 * L) : C / (2 - 2 * L);
                    return { h: H, s: S, l: L, toString: hsltoString };
                };
                R._path2string = function () {
                    return this.join(",").replace(p2s, "$1");
                };
                function repush(array, item) {
                    for (var i = 0, ii = array.length; i < ii; i++) {
                        if (array[i] === item) {
                            return array.push(array.splice(i, 1)[0]);
                        }
                    }
                }
                function cacher(f, scope, postprocessor) {
                    function newf() {
                        var arg = Array.prototype.slice.call(arguments, 0),
                            args = arg.join("\u2400"),
                            cache = newf.cache = newf.cache || {},
                            count = newf.count = newf.count || [];
                        if (cache[has](args)) {
                            repush(count, args);
                            return postprocessor ? postprocessor(cache[args]) : cache[args];
                        }
                        count.length >= 1e3 && delete cache[count.shift()];
                        count.push(args);
                        cache[args] = f[apply](scope, arg);
                        return postprocessor ? postprocessor(cache[args]) : cache[args];
                    }
                    return newf;
                }

                var preload = R._preload = function (src, f) {
                    var img = g.doc.createElement("img");
                    img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
                    img.onload = function () {
                        f.call(this);
                        this.onload = null;
                        g.doc.body.removeChild(this);
                    };
                    img.onerror = function () {
                        g.doc.body.removeChild(this);
                    };
                    g.doc.body.appendChild(img);
                    img.src = src;
                };

                function clrToString() {
                    return this.hex;
                }

                /*\
                 * Raphael.getRGB
                 [ method ]
                 **
                 * Parses colour string as RGB object
                 > Parameters
                 - colour (string) colour string in one of formats:
                 # <ul>
                 #     <li>Colour name (“<code>red</code>”, “<code>green</code>”, “<code>cornflowerblue</code>”, etc)</li>
                 #     <li>#••• — shortened HTML colour: (“<code>#000</code>”, “<code>#fc0</code>”, etc)</li>
                 #     <li>#•••••• — full length HTML colour: (“<code>#000000</code>”, “<code>#bd2300</code>”)</li>
                 #     <li>rgb(•••, •••, •••) — red, green and blue channels’ values: (“<code>rgb(200,&nbsp;100,&nbsp;0)</code>”)</li>
                 #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (“<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>”)</li>
                 #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (“<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>”)</li>
                 #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
                 #     <li>hsl(•••, •••, •••) — same as hsb</li>
                 #     <li>hsl(•••%, •••%, •••%) — same as hsb</li>
                 # </ul>
                 = (object) RGB object in format:
                 o {
                 o     r (number) red,
                 o     g (number) green,
                 o     b (number) blue
                 o     hex (string) color in HTML/CSS format: #••••••,
                 o     error (boolean) true if string can’t be parsed
                 o }
                \*/
                R.getRGB = cacher(function (colour) {
                    if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
                        return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString };
                    }
                    if (colour == "none") {
                        return { r: -1, g: -1, b: -1, hex: "none", toString: clrToString };
                    }
                    !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = _toHex(colour));
                    var res,
                        red,
                        green,
                        blue,
                        opacity,
                        t,
                        values,
                        rgb = colour.match(colourRegExp);
                    if (rgb) {
                        if (rgb[2]) {
                            blue = toInt(rgb[2].substring(5), 16);
                            green = toInt(rgb[2].substring(3, 5), 16);
                            red = toInt(rgb[2].substring(1, 3), 16);
                        }
                        if (rgb[3]) {
                            blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                            green = toInt((t = rgb[3].charAt(2)) + t, 16);
                            red = toInt((t = rgb[3].charAt(1)) + t, 16);
                        }
                        if (rgb[4]) {
                            values = rgb[4][split](commaSpaces);
                            red = toFloat(values[0]);
                            values[0].slice(-1) == "%" && (red *= 2.55);
                            green = toFloat(values[1]);
                            values[1].slice(-1) == "%" && (green *= 2.55);
                            blue = toFloat(values[2]);
                            values[2].slice(-1) == "%" && (blue *= 2.55);
                            rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                            values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                        }
                        if (rgb[5]) {
                            values = rgb[5][split](commaSpaces);
                            red = toFloat(values[0]);
                            values[0].slice(-1) == "%" && (red *= 2.55);
                            green = toFloat(values[1]);
                            values[1].slice(-1) == "%" && (green *= 2.55);
                            blue = toFloat(values[2]);
                            values[2].slice(-1) == "%" && (blue *= 2.55);
                            (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                            rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                            values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                            return R.hsb2rgb(red, green, blue, opacity);
                        }
                        if (rgb[6]) {
                            values = rgb[6][split](commaSpaces);
                            red = toFloat(values[0]);
                            values[0].slice(-1) == "%" && (red *= 2.55);
                            green = toFloat(values[1]);
                            values[1].slice(-1) == "%" && (green *= 2.55);
                            blue = toFloat(values[2]);
                            values[2].slice(-1) == "%" && (blue *= 2.55);
                            (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                            rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                            values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                            return R.hsl2rgb(red, green, blue, opacity);
                        }
                        rgb = { r: red, g: green, b: blue, toString: clrToString };
                        rgb.hex = "#" + (16777216 | blue | green << 8 | red << 16).toString(16).slice(1);
                        R.is(opacity, "finite") && (rgb.opacity = opacity);
                        return rgb;
                    }
                    return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString };
                }, R);
                /*\
                 * Raphael.hsb
                 [ method ]
                 **
                 * Converts HSB values to hex representation of the colour.
                 > Parameters
                 - h (number) hue
                 - s (number) saturation
                 - b (number) value or brightness
                 = (string) hex representation of the colour.
                \*/
                R.hsb = cacher(function (h, s, b) {
                    return R.hsb2rgb(h, s, b).hex;
                });
                /*\
                 * Raphael.hsl
                 [ method ]
                 **
                 * Converts HSL values to hex representation of the colour.
                 > Parameters
                 - h (number) hue
                 - s (number) saturation
                 - l (number) luminosity
                 = (string) hex representation of the colour.
                \*/
                R.hsl = cacher(function (h, s, l) {
                    return R.hsl2rgb(h, s, l).hex;
                });
                /*\
                 * Raphael.rgb
                 [ method ]
                 **
                 * Converts RGB values to hex representation of the colour.
                 > Parameters
                 - r (number) red
                 - g (number) green
                 - b (number) blue
                 = (string) hex representation of the colour.
                \*/
                R.rgb = cacher(function (r, g, b) {
                    function round(x) {
                        return x + 0.5 | 0;
                    }
                    return "#" + (16777216 | round(b) | round(g) << 8 | round(r) << 16).toString(16).slice(1);
                });
                /*\
                 * Raphael.getColor
                 [ method ]
                 **
                 * On each call returns next colour in the spectrum. To reset it back to red call @Raphael.getColor.reset
                 > Parameters
                 - value (number) #optional brightness, default is `0.75`
                 = (string) hex representation of the colour.
                \*/
                R.getColor = function (value) {
                    var start = this.getColor.start = this.getColor.start || { h: 0, s: 1, b: value || .75 },
                        rgb = this.hsb2rgb(start.h, start.s, start.b);
                    start.h += .075;
                    if (start.h > 1) {
                        start.h = 0;
                        start.s -= .2;
                        start.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: start.b });
                    }
                    return rgb.hex;
                };
                /*\
                 * Raphael.getColor.reset
                 [ method ]
                 **
                 * Resets spectrum position for @Raphael.getColor back to red.
                \*/
                R.getColor.reset = function () {
                    delete this.start;
                };

                // http://schepers.cc/getting-to-the-point
                function catmullRom2bezier(crp, z) {
                    var d = [];
                    for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
                        var p = [{ x: +crp[i - 2], y: +crp[i - 1] }, { x: +crp[i], y: +crp[i + 1] }, { x: +crp[i + 2], y: +crp[i + 3] }, { x: +crp[i + 4], y: +crp[i + 5] }];
                        if (z) {
                            if (!i) {
                                p[0] = { x: +crp[iLen - 2], y: +crp[iLen - 1] };
                            } else if (iLen - 4 == i) {
                                p[3] = { x: +crp[0], y: +crp[1] };
                            } else if (iLen - 2 == i) {
                                p[2] = { x: +crp[0], y: +crp[1] };
                                p[3] = { x: +crp[2], y: +crp[3] };
                            }
                        } else {
                            if (iLen - 4 == i) {
                                p[3] = p[2];
                            } else if (!i) {
                                p[0] = { x: +crp[i], y: +crp[i + 1] };
                            }
                        }
                        d.push(["C", (-p[0].x + 6 * p[1].x + p[2].x) / 6, (-p[0].y + 6 * p[1].y + p[2].y) / 6, (p[1].x + 6 * p[2].x - p[3].x) / 6, (p[1].y + 6 * p[2].y - p[3].y) / 6, p[2].x, p[2].y]);
                    }

                    return d;
                }
                /*\
                 * Raphael.parsePathString
                 [ method ]
                 **
                 * Utility method
                 **
                 * Parses given path string into an array of arrays of path segments.
                 > Parameters
                 - pathString (string|array) path string or array of segments (in the last case it will be returned straight away)
                 = (array) array of segments.
                \*/
                R.parsePathString = function (pathString) {
                    if (!pathString) {
                        return null;
                    }
                    var pth = paths(pathString);
                    if (pth.arr) {
                        return pathClone(pth.arr);
                    }

                    var paramCounts = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 },
                        data = [];
                    if (R.is(pathString, array) && R.is(pathString[0], array)) {
                        // rough assumption
                        data = pathClone(pathString);
                    }
                    if (!data.length) {
                        Str(pathString).replace(pathCommand, function (a, b, c) {
                            var params = [],
                                name = b.toLowerCase();
                            c.replace(pathValues, function (a, b) {
                                b && params.push(+b);
                            });
                            if (name == "m" && params.length > 2) {
                                data.push([b][concat](params.splice(0, 2)));
                                name = "l";
                                b = b == "m" ? "l" : "L";
                            }
                            if (name == "r") {
                                data.push([b][concat](params));
                            } else while (params.length >= paramCounts[name]) {
                                data.push([b][concat](params.splice(0, paramCounts[name])));
                                if (!paramCounts[name]) {
                                    break;
                                }
                            }
                        });
                    }
                    data.toString = R._path2string;
                    pth.arr = pathClone(data);
                    return data;
                };
                /*\
                 * Raphael.parseTransformString
                 [ method ]
                 **
                 * Utility method
                 **
                 * Parses given path string into an array of transformations.
                 > Parameters
                 - TString (string|array) transform string or array of transformations (in the last case it will be returned straight away)
                 = (array) array of transformations.
                \*/
                R.parseTransformString = cacher(function (TString) {
                    if (!TString) {
                        return null;
                    }
                    var paramCounts = { r: 3, s: 4, t: 2, m: 6 },
                        data = [];
                    if (R.is(TString, array) && R.is(TString[0], array)) {
                        // rough assumption
                        data = pathClone(TString);
                    }
                    if (!data.length) {
                        Str(TString).replace(tCommand, function (a, b, c) {
                            var params = [],
                                name = lowerCase.call(b);
                            c.replace(pathValues, function (a, b) {
                                b && params.push(+b);
                            });
                            data.push([b][concat](params));
                        });
                    }
                    data.toString = R._path2string;
                    return data;
                });
                // PATHS
                var paths = function paths(ps) {
                    var p = paths.ps = paths.ps || {};
                    if (p[ps]) {
                        p[ps].sleep = 100;
                    } else {
                        p[ps] = {
                            sleep: 100
                        };
                    }
                    setTimeout(function () {
                        for (var key in p) {
                            if (p[has](key) && key != ps) {
                                p[key].sleep--;
                                !p[key].sleep && delete p[key];
                            }
                        }
                    });
                    return p[ps];
                };
                /*\
                 * Raphael.findDotsAtSegment
                 [ method ]
                 **
                 * Utility method
                 **
                 * Find dot coordinates on the given cubic bezier curve at the given t.
                 > Parameters
                 - p1x (number) x of the first point of the curve
                 - p1y (number) y of the first point of the curve
                 - c1x (number) x of the first anchor of the curve
                 - c1y (number) y of the first anchor of the curve
                 - c2x (number) x of the second anchor of the curve
                 - c2y (number) y of the second anchor of the curve
                 - p2x (number) x of the second point of the curve
                 - p2y (number) y of the second point of the curve
                 - t (number) position on the curve (0..1)
                 = (object) point information in format:
                 o {
                 o     x: (number) x coordinate of the point
                 o     y: (number) y coordinate of the point
                 o     m: {
                 o         x: (number) x coordinate of the left anchor
                 o         y: (number) y coordinate of the left anchor
                 o     }
                 o     n: {
                 o         x: (number) x coordinate of the right anchor
                 o         y: (number) y coordinate of the right anchor
                 o     }
                 o     start: {
                 o         x: (number) x coordinate of the start of the curve
                 o         y: (number) y coordinate of the start of the curve
                 o     }
                 o     end: {
                 o         x: (number) x coordinate of the end of the curve
                 o         y: (number) y coordinate of the end of the curve
                 o     }
                 o     alpha: (number) angle of the curve derivative at the point
                 o }
                \*/
                R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
                    var t1 = 1 - t,
                        t13 = pow(t1, 3),
                        t12 = pow(t1, 2),
                        t2 = t * t,
                        t3 = t2 * t,
                        x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
                        y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
                        mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
                        my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
                        nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
                        ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
                        ax = t1 * p1x + t * c1x,
                        ay = t1 * p1y + t * c1y,
                        cx = t1 * c2x + t * p2x,
                        cy = t1 * c2y + t * p2y,
                        alpha = 90 - math.atan2(mx - nx, my - ny) * 180 / PI;
                    (mx > nx || my < ny) && (alpha += 180);
                    return {
                        x: x,
                        y: y,
                        m: { x: mx, y: my },
                        n: { x: nx, y: ny },
                        start: { x: ax, y: ay },
                        end: { x: cx, y: cy },
                        alpha: alpha
                    };
                };
                /*\
                 * Raphael.bezierBBox
                 [ method ]
                 **
                 * Utility method
                 **
                 * Return bounding box of a given cubic bezier curve
                 > Parameters
                 - p1x (number) x of the first point of the curve
                 - p1y (number) y of the first point of the curve
                 - c1x (number) x of the first anchor of the curve
                 - c1y (number) y of the first anchor of the curve
                 - c2x (number) x of the second anchor of the curve
                 - c2y (number) y of the second anchor of the curve
                 - p2x (number) x of the second point of the curve
                 - p2y (number) y of the second point of the curve
                 * or
                 - bez (array) array of six points for bezier curve
                 = (object) point information in format:
                 o {
                 o     min: {
                 o         x: (number) x coordinate of the left point
                 o         y: (number) y coordinate of the top point
                 o     }
                 o     max: {
                 o         x: (number) x coordinate of the right point
                 o         y: (number) y coordinate of the bottom point
                 o     }
                 o }
                \*/
                R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
                    if (!R.is(p1x, "array")) {
                        p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
                    }
                    var bbox = curveDim.apply(null, p1x);
                    return {
                        x: bbox.min.x,
                        y: bbox.min.y,
                        x2: bbox.max.x,
                        y2: bbox.max.y,
                        width: bbox.max.x - bbox.min.x,
                        height: bbox.max.y - bbox.min.y
                    };
                };
                /*\
                 * Raphael.isPointInsideBBox
                 [ method ]
                 **
                 * Utility method
                 **
                 * Returns `true` if given point is inside bounding boxes.
                 > Parameters
                 - bbox (string) bounding box
                 - x (string) x coordinate of the point
                 - y (string) y coordinate of the point
                 = (boolean) `true` if point inside
                \*/
                R.isPointInsideBBox = function (bbox, x, y) {
                    return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
                };
                /*\
                 * Raphael.isBBoxIntersect
                 [ method ]
                 **
                 * Utility method
                 **
                 * Returns `true` if two bounding boxes intersect
                 > Parameters
                 - bbox1 (string) first bounding box
                 - bbox2 (string) second bounding box
                 = (boolean) `true` if they intersect
                \*/
                R.isBBoxIntersect = function (bbox1, bbox2) {
                    var i = R.isPointInsideBBox;
                    return i(bbox2, bbox1.x, bbox1.y) || i(bbox2, bbox1.x2, bbox1.y) || i(bbox2, bbox1.x, bbox1.y2) || i(bbox2, bbox1.x2, bbox1.y2) || i(bbox1, bbox2.x, bbox2.y) || i(bbox1, bbox2.x2, bbox2.y) || i(bbox1, bbox2.x, bbox2.y2) || i(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
                };
                function base3(t, p1, p2, p3, p4) {
                    var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
                        t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
                    return t * t2 - 3 * p1 + 3 * p2;
                }
                function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
                    if (z == null) {
                        z = 1;
                    }
                    z = z > 1 ? 1 : z < 0 ? 0 : z;
                    var z2 = z / 2,
                        n = 12,
                        Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816],
                        Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
                        sum = 0;
                    for (var i = 0; i < n; i++) {
                        var ct = z2 * Tvalues[i] + z2,
                            xbase = base3(ct, x1, x2, x3, x4),
                            ybase = base3(ct, y1, y2, y3, y4),
                            comb = xbase * xbase + ybase * ybase;
                        sum += Cvalues[i] * math.sqrt(comb);
                    }
                    return z2 * sum;
                }
                function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
                    if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
                        return;
                    }
                    var t = 1,
                        step = t / 2,
                        t2 = t - step,
                        l,
                        e = .01;
                    l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
                    while (abs(l - ll) > e) {
                        step /= 2;
                        t2 += (l < ll ? 1 : -1) * step;
                        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
                    }
                    return t2;
                }
                function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
                    if (mmax(x1, x2) < mmin(x3, x4) || mmin(x1, x2) > mmax(x3, x4) || mmax(y1, y2) < mmin(y3, y4) || mmin(y1, y2) > mmax(y3, y4)) {
                        return;
                    }
                    var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
                        ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
                        denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

                    if (!denominator) {
                        return;
                    }
                    var px = nx / denominator,
                        py = ny / denominator,
                        px2 = +px.toFixed(2),
                        py2 = +py.toFixed(2);
                    if (px2 < +mmin(x1, x2).toFixed(2) || px2 > +mmax(x1, x2).toFixed(2) || px2 < +mmin(x3, x4).toFixed(2) || px2 > +mmax(x3, x4).toFixed(2) || py2 < +mmin(y1, y2).toFixed(2) || py2 > +mmax(y1, y2).toFixed(2) || py2 < +mmin(y3, y4).toFixed(2) || py2 > +mmax(y3, y4).toFixed(2)) {
                        return;
                    }
                    return { x: px, y: py };
                }
                function inter(bez1, bez2) {
                    return interHelper(bez1, bez2);
                }
                function interCount(bez1, bez2) {
                    return interHelper(bez1, bez2, 1);
                }
                function interHelper(bez1, bez2, justCount) {
                    var bbox1 = R.bezierBBox(bez1),
                        bbox2 = R.bezierBBox(bez2);
                    if (!R.isBBoxIntersect(bbox1, bbox2)) {
                        return justCount ? 0 : [];
                    }
                    var l1 = bezlen.apply(0, bez1),
                        l2 = bezlen.apply(0, bez2),
                        n1 = mmax(~~(l1 / 5), 1),
                        n2 = mmax(~~(l2 / 5), 1),
                        dots1 = [],
                        dots2 = [],
                        xy = {},
                        res = justCount ? 0 : [];
                    for (var i = 0; i < n1 + 1; i++) {
                        var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
                        dots1.push({ x: p.x, y: p.y, t: i / n1 });
                    }
                    for (i = 0; i < n2 + 1; i++) {
                        p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
                        dots2.push({ x: p.x, y: p.y, t: i / n2 });
                    }
                    for (i = 0; i < n1; i++) {
                        for (var j = 0; j < n2; j++) {
                            var di = dots1[i],
                                di1 = dots1[i + 1],
                                dj = dots2[j],
                                dj1 = dots2[j + 1],
                                ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                                cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                                is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                            if (is) {
                                if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                                    continue;
                                }
                                xy[is.x.toFixed(4)] = is.y.toFixed(4);
                                var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                                    t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                                if (t1 >= 0 && t1 <= 1.001 && t2 >= 0 && t2 <= 1.001) {
                                    if (justCount) {
                                        res++;
                                    } else {
                                        res.push({
                                            x: is.x,
                                            y: is.y,
                                            t1: mmin(t1, 1),
                                            t2: mmin(t2, 1)
                                        });
                                    }
                                }
                            }
                        }
                    }
                    return res;
                }
                /*\
                 * Raphael.pathIntersection
                 [ method ]
                 **
                 * Utility method
                 **
                 * Finds intersections of two paths
                 > Parameters
                 - path1 (string) path string
                 - path2 (string) path string
                 = (array) dots of intersection
                 o [
                 o     {
                 o         x: (number) x coordinate of the point
                 o         y: (number) y coordinate of the point
                 o         t1: (number) t value for segment of path1
                 o         t2: (number) t value for segment of path2
                 o         segment1: (number) order number for segment of path1
                 o         segment2: (number) order number for segment of path2
                 o         bez1: (array) eight coordinates representing beziér curve for the segment of path1
                 o         bez2: (array) eight coordinates representing beziér curve for the segment of path2
                 o     }
                 o ]
                \*/
                R.pathIntersection = function (path1, path2) {
                    return interPathHelper(path1, path2);
                };
                R.pathIntersectionNumber = function (path1, path2) {
                    return interPathHelper(path1, path2, 1);
                };
                function interPathHelper(path1, path2, justCount) {
                    path1 = R._path2curve(path1);
                    path2 = R._path2curve(path2);
                    var x1,
                        y1,
                        x2,
                        y2,
                        x1m,
                        y1m,
                        x2m,
                        y2m,
                        bez1,
                        bez2,
                        res = justCount ? 0 : [];
                    for (var i = 0, ii = path1.length; i < ii; i++) {
                        var pi = path1[i];
                        if (pi[0] == "M") {
                            x1 = x1m = pi[1];
                            y1 = y1m = pi[2];
                        } else {
                            if (pi[0] == "C") {
                                bez1 = [x1, y1].concat(pi.slice(1));
                                x1 = bez1[6];
                                y1 = bez1[7];
                            } else {
                                bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                                x1 = x1m;
                                y1 = y1m;
                            }
                            for (var j = 0, jj = path2.length; j < jj; j++) {
                                var pj = path2[j];
                                if (pj[0] == "M") {
                                    x2 = x2m = pj[1];
                                    y2 = y2m = pj[2];
                                } else {
                                    if (pj[0] == "C") {
                                        bez2 = [x2, y2].concat(pj.slice(1));
                                        x2 = bez2[6];
                                        y2 = bez2[7];
                                    } else {
                                        bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                                        x2 = x2m;
                                        y2 = y2m;
                                    }
                                    var intr = interHelper(bez1, bez2, justCount);
                                    if (justCount) {
                                        res += intr;
                                    } else {
                                        for (var k = 0, kk = intr.length; k < kk; k++) {
                                            intr[k].segment1 = i;
                                            intr[k].segment2 = j;
                                            intr[k].bez1 = bez1;
                                            intr[k].bez2 = bez2;
                                        }
                                        res = res.concat(intr);
                                    }
                                }
                            }
                        }
                    }
                    return res;
                }
                /*\
                 * Raphael.isPointInsidePath
                 [ method ]
                 **
                 * Utility method
                 **
                 * Returns `true` if given point is inside a given closed path.
                 > Parameters
                 - path (string) path string
                 - x (number) x of the point
                 - y (number) y of the point
                 = (boolean) true, if point is inside the path
                \*/
                R.isPointInsidePath = function (path, x, y) {
                    var bbox = R.pathBBox(path);
                    return R.isPointInsideBBox(bbox, x, y) && interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
                };
                R._removedFactory = function (methodname) {
                    return function () {
                        eve("raphael.log", null, "Rapha\xEBl: you are calling to method \u201C" + methodname + "\u201D of removed object", methodname);
                    };
                };
                /*\
                 * Raphael.pathBBox
                 [ method ]
                 **
                 * Utility method
                 **
                 * Return bounding box of a given path
                 > Parameters
                 - path (string) path string
                 = (object) bounding box
                 o {
                 o     x: (number) x coordinate of the left top point of the box
                 o     y: (number) y coordinate of the left top point of the box
                 o     x2: (number) x coordinate of the right bottom point of the box
                 o     y2: (number) y coordinate of the right bottom point of the box
                 o     width: (number) width of the box
                 o     height: (number) height of the box
                 o     cx: (number) x coordinate of the center of the box
                 o     cy: (number) y coordinate of the center of the box
                 o }
                \*/
                var pathDimensions = R.pathBBox = function (path) {
                    var pth = paths(path);
                    if (pth.bbox) {
                        return clone(pth.bbox);
                    }
                    if (!path) {
                        return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };
                    }
                    path = path2curve(path);
                    var x = 0,
                        y = 0,
                        X = [],
                        Y = [],
                        p;
                    for (var i = 0, ii = path.length; i < ii; i++) {
                        p = path[i];
                        if (p[0] == "M") {
                            x = p[1];
                            y = p[2];
                            X.push(x);
                            Y.push(y);
                        } else {
                            var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                            X = X[concat](dim.min.x, dim.max.x);
                            Y = Y[concat](dim.min.y, dim.max.y);
                            x = p[5];
                            y = p[6];
                        }
                    }
                    var xmin = mmin[apply](0, X),
                        ymin = mmin[apply](0, Y),
                        xmax = mmax[apply](0, X),
                        ymax = mmax[apply](0, Y),
                        width = xmax - xmin,
                        height = ymax - ymin,
                        bb = {
                        x: xmin,
                        y: ymin,
                        x2: xmax,
                        y2: ymax,
                        width: width,
                        height: height,
                        cx: xmin + width / 2,
                        cy: ymin + height / 2
                    };
                    pth.bbox = clone(bb);
                    return bb;
                },
                    pathClone = function pathClone(pathArray) {
                    var res = clone(pathArray);
                    res.toString = R._path2string;
                    return res;
                },
                    pathToRelative = R._pathToRelative = function (pathArray) {
                    var pth = paths(pathArray);
                    if (pth.rel) {
                        return pathClone(pth.rel);
                    }
                    if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
                        // rough assumption
                        pathArray = R.parsePathString(pathArray);
                    }
                    var res = [],
                        x = 0,
                        y = 0,
                        mx = 0,
                        my = 0,
                        start = 0;
                    if (pathArray[0][0] == "M") {
                        x = pathArray[0][1];
                        y = pathArray[0][2];
                        mx = x;
                        my = y;
                        start++;
                        res.push(["M", x, y]);
                    }
                    for (var i = start, ii = pathArray.length; i < ii; i++) {
                        var r = res[i] = [],
                            pa = pathArray[i];
                        if (pa[0] != lowerCase.call(pa[0])) {
                            r[0] = lowerCase.call(pa[0]);
                            switch (r[0]) {
                                case "a":
                                    r[1] = pa[1];
                                    r[2] = pa[2];
                                    r[3] = pa[3];
                                    r[4] = pa[4];
                                    r[5] = pa[5];
                                    r[6] = +(pa[6] - x).toFixed(3);
                                    r[7] = +(pa[7] - y).toFixed(3);
                                    break;
                                case "v":
                                    r[1] = +(pa[1] - y).toFixed(3);
                                    break;
                                case "m":
                                    mx = pa[1];
                                    my = pa[2];
                                default:
                                    for (var j = 1, jj = pa.length; j < jj; j++) {
                                        r[j] = +(pa[j] - (j % 2 ? x : y)).toFixed(3);
                                    }
                            }
                        } else {
                            r = res[i] = [];
                            if (pa[0] == "m") {
                                mx = pa[1] + x;
                                my = pa[2] + y;
                            }
                            for (var k = 0, kk = pa.length; k < kk; k++) {
                                res[i][k] = pa[k];
                            }
                        }
                        var len = res[i].length;
                        switch (res[i][0]) {
                            case "z":
                                x = mx;
                                y = my;
                                break;
                            case "h":
                                x += +res[i][len - 1];
                                break;
                            case "v":
                                y += +res[i][len - 1];
                                break;
                            default:
                                x += +res[i][len - 2];
                                y += +res[i][len - 1];
                        }
                    }
                    res.toString = R._path2string;
                    pth.rel = pathClone(res);
                    return res;
                },
                    pathToAbsolute = R._pathToAbsolute = function (pathArray) {
                    var pth = paths(pathArray);
                    if (pth.abs) {
                        return pathClone(pth.abs);
                    }
                    if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) {
                        // rough assumption
                        pathArray = R.parsePathString(pathArray);
                    }
                    if (!pathArray || !pathArray.length) {
                        return [["M", 0, 0]];
                    }
                    var res = [],
                        x = 0,
                        y = 0,
                        mx = 0,
                        my = 0,
                        start = 0;
                    if (pathArray[0][0] == "M") {
                        x = +pathArray[0][1];
                        y = +pathArray[0][2];
                        mx = x;
                        my = y;
                        start++;
                        res[0] = ["M", x, y];
                    }
                    var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
                    for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                        res.push(r = []);
                        pa = pathArray[i];
                        if (pa[0] != upperCase.call(pa[0])) {
                            r[0] = upperCase.call(pa[0]);
                            switch (r[0]) {
                                case "A":
                                    r[1] = pa[1];
                                    r[2] = pa[2];
                                    r[3] = pa[3];
                                    r[4] = pa[4];
                                    r[5] = pa[5];
                                    r[6] = +(pa[6] + x);
                                    r[7] = +(pa[7] + y);
                                    break;
                                case "V":
                                    r[1] = +pa[1] + y;
                                    break;
                                case "H":
                                    r[1] = +pa[1] + x;
                                    break;
                                case "R":
                                    var dots = [x, y][concat](pa.slice(1));
                                    for (var j = 2, jj = dots.length; j < jj; j++) {
                                        dots[j] = +dots[j] + x;
                                        dots[++j] = +dots[j] + y;
                                    }
                                    res.pop();
                                    res = res[concat](catmullRom2bezier(dots, crz));
                                    break;
                                case "M":
                                    mx = +pa[1] + x;
                                    my = +pa[2] + y;
                                default:
                                    for (j = 1, jj = pa.length; j < jj; j++) {
                                        r[j] = +pa[j] + (j % 2 ? x : y);
                                    }
                            }
                        } else if (pa[0] == "R") {
                            dots = [x, y][concat](pa.slice(1));
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            r = ["R"][concat](pa.slice(-2));
                        } else {
                            for (var k = 0, kk = pa.length; k < kk; k++) {
                                r[k] = pa[k];
                            }
                        }
                        switch (r[0]) {
                            case "Z":
                                x = mx;
                                y = my;
                                break;
                            case "H":
                                x = r[1];
                                break;
                            case "V":
                                y = r[1];
                                break;
                            case "M":
                                mx = r[r.length - 2];
                                my = r[r.length - 1];
                            default:
                                x = r[r.length - 2];
                                y = r[r.length - 1];
                        }
                    }
                    res.toString = R._path2string;
                    pth.abs = pathClone(res);
                    return res;
                },
                    l2c = function l2c(x1, y1, x2, y2) {
                    return [x1, y1, x2, y2, x2, y2];
                },
                    q2c = function q2c(x1, y1, ax, ay, x2, y2) {
                    var _13 = 1 / 3,
                        _23 = 2 / 3;
                    return [_13 * x1 + _23 * ax, _13 * y1 + _23 * ay, _13 * x2 + _23 * ax, _13 * y2 + _23 * ay, x2, y2];
                },
                    a2c = function a2c(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
                    // for more information of where this math came from visit:
                    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
                    var _120 = PI * 120 / 180,
                        rad = PI / 180 * (+angle || 0),
                        res = [],
                        xy,
                        rotate = cacher(function (x, y, rad) {
                        var X = x * math.cos(rad) - y * math.sin(rad),
                            Y = x * math.sin(rad) + y * math.cos(rad);
                        return { x: X, y: Y };
                    });
                    if (!recursive) {
                        xy = rotate(x1, y1, -rad);
                        x1 = xy.x;
                        y1 = xy.y;
                        xy = rotate(x2, y2, -rad);
                        x2 = xy.x;
                        y2 = xy.y;
                        var cos = math.cos(PI / 180 * angle),
                            sin = math.sin(PI / 180 * angle),
                            x = (x1 - x2) / 2,
                            y = (y1 - y2) / 2;
                        var h = x * x / (rx * rx) + y * y / (ry * ry);
                        if (h > 1) {
                            h = math.sqrt(h);
                            rx = h * rx;
                            ry = h * ry;
                        }
                        var rx2 = rx * rx,
                            ry2 = ry * ry,
                            k = (large_arc_flag == sweep_flag ? -1 : 1) * math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                            cx = k * rx * y / ry + (x1 + x2) / 2,
                            cy = k * -ry * x / rx + (y1 + y2) / 2,
                            f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                            f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                        f1 = x1 < cx ? PI - f1 : f1;
                        f2 = x2 < cx ? PI - f2 : f2;
                        f1 < 0 && (f1 = PI * 2 + f1);
                        f2 < 0 && (f2 = PI * 2 + f2);
                        if (sweep_flag && f1 > f2) {
                            f1 = f1 - PI * 2;
                        }
                        if (!sweep_flag && f2 > f1) {
                            f2 = f2 - PI * 2;
                        }
                    } else {
                        f1 = recursive[0];
                        f2 = recursive[1];
                        cx = recursive[2];
                        cy = recursive[3];
                    }
                    var df = f2 - f1;
                    if (abs(df) > _120) {
                        var f2old = f2,
                            x2old = x2,
                            y2old = y2;
                        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                        x2 = cx + rx * math.cos(f2);
                        y2 = cy + ry * math.sin(f2);
                        res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
                    }
                    df = f2 - f1;
                    var c1 = math.cos(f1),
                        s1 = math.sin(f1),
                        c2 = math.cos(f2),
                        s2 = math.sin(f2),
                        t = math.tan(df / 4),
                        hx = 4 / 3 * rx * t,
                        hy = 4 / 3 * ry * t,
                        m1 = [x1, y1],
                        m2 = [x1 + hx * s1, y1 - hy * c1],
                        m3 = [x2 + hx * s2, y2 - hy * c2],
                        m4 = [x2, y2];
                    m2[0] = 2 * m1[0] - m2[0];
                    m2[1] = 2 * m1[1] - m2[1];
                    if (recursive) {
                        return [m2, m3, m4][concat](res);
                    } else {
                        res = [m2, m3, m4][concat](res).join()[split](",");
                        var newres = [];
                        for (var i = 0, ii = res.length; i < ii; i++) {
                            newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                        }
                        return newres;
                    }
                },
                    findDotAtSegment = function findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
                    var t1 = 1 - t;
                    return {
                        x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                        y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
                    };
                },
                    curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
                    var a = c2x - 2 * c1x + p1x - (p2x - 2 * c2x + c1x),
                        b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                        c = p1x - c1x,
                        t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                        t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                        y = [p1y, p2y],
                        x = [p1x, p2x],
                        dot;
                    abs(t1) > "1e12" && (t1 = .5);
                    abs(t2) > "1e12" && (t2 = .5);
                    if (t1 > 0 && t1 < 1) {
                        dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                        x.push(dot.x);
                        y.push(dot.y);
                    }
                    if (t2 > 0 && t2 < 1) {
                        dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                        x.push(dot.x);
                        y.push(dot.y);
                    }
                    a = c2y - 2 * c1y + p1y - (p2y - 2 * c2y + c1y);
                    b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
                    c = p1y - c1y;
                    t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
                    t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
                    abs(t1) > "1e12" && (t1 = .5);
                    abs(t2) > "1e12" && (t2 = .5);
                    if (t1 > 0 && t1 < 1) {
                        dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                        x.push(dot.x);
                        y.push(dot.y);
                    }
                    if (t2 > 0 && t2 < 1) {
                        dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                        x.push(dot.x);
                        y.push(dot.y);
                    }
                    return {
                        min: { x: mmin[apply](0, x), y: mmin[apply](0, y) },
                        max: { x: mmax[apply](0, x), y: mmax[apply](0, y) }
                    };
                }),
                    path2curve = R._path2curve = cacher(function (path, path2) {
                    var pth = !path2 && paths(path);
                    if (!path2 && pth.curve) {
                        return pathClone(pth.curve);
                    }
                    var p = pathToAbsolute(path),
                        p2 = path2 && pathToAbsolute(path2),
                        attrs = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                        attrs2 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
                        processPath = function processPath(path, d, pcom) {
                        var nx,
                            ny,
                            tq = { T: 1, Q: 1 };
                        if (!path) {
                            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                        }
                        !(path[0] in tq) && (d.qx = d.qy = null);
                        switch (path[0]) {
                            case "M":
                                d.X = path[1];
                                d.Y = path[2];
                                break;
                            case "A":
                                path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                                break;
                            case "S":
                                if (pcom == "C" || pcom == "S") {
                                    // In "S" case we have to take into account, if the previous command is C/S.
                                    nx = d.x * 2 - d.bx; // And reflect the previous
                                    ny = d.y * 2 - d.by; // command's control point relative to the current point.
                                } else {
                                    // or some else or nothing
                                    nx = d.x;
                                    ny = d.y;
                                }
                                path = ["C", nx, ny][concat](path.slice(1));
                                break;
                            case "T":
                                if (pcom == "Q" || pcom == "T") {
                                    // In "T" case we have to take into account, if the previous command is Q/T.
                                    d.qx = d.x * 2 - d.qx; // And make a reflection similar
                                    d.qy = d.y * 2 - d.qy; // to case "S".
                                } else {
                                    // or something else or nothing
                                    d.qx = d.x;
                                    d.qy = d.y;
                                }
                                path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                                break;
                            case "Q":
                                d.qx = path[1];
                                d.qy = path[2];
                                path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                                break;
                            case "L":
                                path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                                break;
                            case "H":
                                path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                                break;
                            case "V":
                                path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                                break;
                            case "Z":
                                path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                                break;
                        }
                        return path;
                    },
                        fixArc = function fixArc(pp, i) {
                        if (pp[i].length > 7) {
                            pp[i].shift();
                            var pi = pp[i];
                            while (pi.length) {
                                pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
                                p2 && (pcoms2[i] = "A"); // the same as above
                                pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                            }
                            pp.splice(i, 1);
                            ii = mmax(p.length, p2 && p2.length || 0);
                        }
                    },
                        fixM = function fixM(path1, path2, a1, a2, i) {
                        if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                            path2.splice(i, 0, ["M", a2.x, a2.y]);
                            a1.bx = 0;
                            a1.by = 0;
                            a1.x = path1[i][1];
                            a1.y = path1[i][2];
                            ii = mmax(p.length, p2 && p2.length || 0);
                        }
                    },
                        pcoms1 = [],
                        // path commands of original path p
                    pcoms2 = [],
                        // path commands of original path p2
                    pfirst = "",
                        // temporary holder for original path command
                    pcom = ""; // holder for previous path command of original path
                    for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                        p[i] && (pfirst = p[i][0]); // save current path command

                        if (pfirst != "C") // C is not saved yet, because it may be result of conversion
                            {
                                pcoms1[i] = pfirst; // Save current path command
                                i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
                            }
                        p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

                        if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
                        // which may produce multiple C:s
                        // so we have to make sure that C is also C in original path

                        fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

                        if (p2) {
                            // the same procedures is done to p2
                            p2[i] && (pfirst = p2[i][0]);
                            if (pfirst != "C") {
                                pcoms2[i] = pfirst;
                                i && (pcom = pcoms2[i - 1]);
                            }
                            p2[i] = processPath(p2[i], attrs2, pcom);

                            if (pcoms2[i] != "A" && pfirst == "C") pcoms2[i] = "C";

                            fixArc(p2, i);
                        }
                        fixM(p, p2, attrs, attrs2, i);
                        fixM(p2, p, attrs2, attrs, i);
                        var seg = p[i],
                            seg2 = p2 && p2[i],
                            seglen = seg.length,
                            seg2len = p2 && seg2.length;
                        attrs.x = seg[seglen - 2];
                        attrs.y = seg[seglen - 1];
                        attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                        attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                        attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                        attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                        attrs2.x = p2 && seg2[seg2len - 2];
                        attrs2.y = p2 && seg2[seg2len - 1];
                    }
                    if (!p2) {
                        pth.curve = pathClone(p);
                    }
                    return p2 ? [p, p2] : p;
                }, null, pathClone),
                    parseDots = R._parseDots = cacher(function (gradient) {
                    var dots = [];
                    for (var i = 0, ii = gradient.length; i < ii; i++) {
                        var dot = {},
                            par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                        dot.color = R.getRGB(par[1]);
                        if (dot.color.error) {
                            return null;
                        }
                        dot.opacity = dot.color.opacity;
                        dot.color = dot.color.hex;
                        par[2] && (dot.offset = par[2] + "%");
                        dots.push(dot);
                    }
                    for (i = 1, ii = dots.length - 1; i < ii; i++) {
                        if (!dots[i].offset) {
                            var start = toFloat(dots[i - 1].offset || 0),
                                end = 0;
                            for (var j = i + 1; j < ii; j++) {
                                if (dots[j].offset) {
                                    end = dots[j].offset;
                                    break;
                                }
                            }
                            if (!end) {
                                end = 100;
                                j = ii;
                            }
                            end = toFloat(end);
                            var d = (end - start) / (j - i + 1);
                            for (; i < j; i++) {
                                start += d;
                                dots[i].offset = start + "%";
                            }
                        }
                    }
                    return dots;
                }),
                    tear = R._tear = function (el, paper) {
                    el == paper.top && (paper.top = el.prev);
                    el == paper.bottom && (paper.bottom = el.next);
                    el.next && (el.next.prev = el.prev);
                    el.prev && (el.prev.next = el.next);
                },
                    tofront = R._tofront = function (el, paper) {
                    if (paper.top === el) {
                        return;
                    }
                    tear(el, paper);
                    el.next = null;
                    el.prev = paper.top;
                    paper.top.next = el;
                    paper.top = el;
                },
                    toback = R._toback = function (el, paper) {
                    if (paper.bottom === el) {
                        return;
                    }
                    tear(el, paper);
                    el.next = paper.bottom;
                    el.prev = null;
                    paper.bottom.prev = el;
                    paper.bottom = el;
                },
                    insertafter = R._insertafter = function (el, el2, paper) {
                    tear(el, paper);
                    el2 == paper.top && (paper.top = el);
                    el2.next && (el2.next.prev = el);
                    el.next = el2.next;
                    el.prev = el2;
                    el2.next = el;
                },
                    insertbefore = R._insertbefore = function (el, el2, paper) {
                    tear(el, paper);
                    el2 == paper.bottom && (paper.bottom = el);
                    el2.prev && (el2.prev.next = el);
                    el.prev = el2.prev;
                    el2.prev = el;
                    el.next = el2;
                },

                /*\
                 * Raphael.toMatrix
                 [ method ]
                 **
                 * Utility method
                 **
                 * Returns matrix of transformations applied to a given path
                 > Parameters
                 - path (string) path string
                 - transform (string|array) transformation string
                 = (object) @Matrix
                \*/
                toMatrix = R.toMatrix = function (path, transform) {
                    var bb = pathDimensions(path),
                        el = {
                        _: {
                            transform: E
                        },
                        getBBox: function getBBox() {
                            return bb;
                        }
                    };
                    extractTransform(el, transform);
                    return el.matrix;
                },

                /*\
                 * Raphael.transformPath
                 [ method ]
                 **
                 * Utility method
                 **
                 * Returns path transformed by a given transformation
                 > Parameters
                 - path (string) path string
                 - transform (string|array) transformation string
                 = (string) path
                \*/
                transformPath = R.transformPath = function (path, transform) {
                    return mapPath(path, toMatrix(path, transform));
                },
                    extractTransform = R._extractTransform = function (el, tstr) {
                    if (tstr == null) {
                        return el._.transform;
                    }
                    tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
                    var tdata = R.parseTransformString(tstr),
                        deg = 0,
                        dx = 0,
                        dy = 0,
                        sx = 1,
                        sy = 1,
                        _ = el._,
                        m = new Matrix();
                    _.transform = tdata || [];
                    if (tdata) {
                        for (var i = 0, ii = tdata.length; i < ii; i++) {
                            var t = tdata[i],
                                tlen = t.length,
                                command = Str(t[0]).toLowerCase(),
                                absolute = t[0] != command,
                                inver = absolute ? m.invert() : 0,
                                x1,
                                y1,
                                x2,
                                y2,
                                bb;
                            if (command == "t" && tlen == 3) {
                                if (absolute) {
                                    x1 = inver.x(0, 0);
                                    y1 = inver.y(0, 0);
                                    x2 = inver.x(t[1], t[2]);
                                    y2 = inver.y(t[1], t[2]);
                                    m.translate(x2 - x1, y2 - y1);
                                } else {
                                    m.translate(t[1], t[2]);
                                }
                            } else if (command == "r") {
                                if (tlen == 2) {
                                    bb = bb || el.getBBox(1);
                                    m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                                    deg += t[1];
                                } else if (tlen == 4) {
                                    if (absolute) {
                                        x2 = inver.x(t[2], t[3]);
                                        y2 = inver.y(t[2], t[3]);
                                        m.rotate(t[1], x2, y2);
                                    } else {
                                        m.rotate(t[1], t[2], t[3]);
                                    }
                                    deg += t[1];
                                }
                            } else if (command == "s") {
                                if (tlen == 2 || tlen == 3) {
                                    bb = bb || el.getBBox(1);
                                    m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                                    sx *= t[1];
                                    sy *= t[tlen - 1];
                                } else if (tlen == 5) {
                                    if (absolute) {
                                        x2 = inver.x(t[3], t[4]);
                                        y2 = inver.y(t[3], t[4]);
                                        m.scale(t[1], t[2], x2, y2);
                                    } else {
                                        m.scale(t[1], t[2], t[3], t[4]);
                                    }
                                    sx *= t[1];
                                    sy *= t[2];
                                }
                            } else if (command == "m" && tlen == 7) {
                                m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                            }
                            _.dirtyT = 1;
                            el.matrix = m;
                        }
                    }

                    /*\
                     * Element.matrix
                     [ property (object) ]
                     **
                     * Keeps @Matrix object, which represents element transformation
                    \*/
                    el.matrix = m;

                    _.sx = sx;
                    _.sy = sy;
                    _.deg = deg;
                    _.dx = dx = m.e;
                    _.dy = dy = m.f;

                    if (sx == 1 && sy == 1 && !deg && _.bbox) {
                        _.bbox.x += +dx;
                        _.bbox.y += +dy;
                    } else {
                        _.dirtyT = 1;
                    }
                },
                    getEmpty = function getEmpty(item) {
                    var l = item[0];
                    switch (l.toLowerCase()) {
                        case "t":
                            return [l, 0, 0];
                        case "m":
                            return [l, 1, 0, 0, 1, 0, 0];
                        case "r":
                            if (item.length == 4) {
                                return [l, 0, item[2], item[3]];
                            } else {
                                return [l, 0];
                            }
                        case "s":
                            if (item.length == 5) {
                                return [l, 1, 1, item[3], item[4]];
                            } else if (item.length == 3) {
                                return [l, 1, 1];
                            } else {
                                return [l, 1];
                            }
                    }
                },
                    equaliseTransform = R._equaliseTransform = function (t1, t2) {
                    t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
                    t1 = R.parseTransformString(t1) || [];
                    t2 = R.parseTransformString(t2) || [];
                    var maxlength = mmax(t1.length, t2.length),
                        from = [],
                        to = [],
                        i = 0,
                        j,
                        jj,
                        tt1,
                        tt2;
                    for (; i < maxlength; i++) {
                        tt1 = t1[i] || getEmpty(t2[i]);
                        tt2 = t2[i] || getEmpty(tt1);
                        if (tt1[0] != tt2[0] || tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3]) || tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4])) {
                            return;
                        }
                        from[i] = [];
                        to[i] = [];
                        for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                            j in tt1 && (from[i][j] = tt1[j]);
                            j in tt2 && (to[i][j] = tt2[j]);
                        }
                    }
                    return {
                        from: from,
                        to: to
                    };
                };
                R._getContainer = function (x, y, w, h) {
                    var container;
                    container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
                    if (container == null) {
                        return;
                    }
                    if (container.tagName) {
                        if (y == null) {
                            return {
                                container: container,
                                width: container.style.pixelWidth || container.offsetWidth,
                                height: container.style.pixelHeight || container.offsetHeight
                            };
                        } else {
                            return {
                                container: container,
                                width: y,
                                height: w
                            };
                        }
                    }
                    return {
                        container: 1,
                        x: x,
                        y: y,
                        width: w,
                        height: h
                    };
                };
                /*\
                 * Raphael.pathToRelative
                 [ method ]
                 **
                 * Utility method
                 **
                 * Converts path to relative form
                 > Parameters
                 - pathString (string|array) path string or array of segments
                 = (array) array of segments.
                \*/
                R.pathToRelative = pathToRelative;
                R._engine = {};
                /*\
                 * Raphael.path2curve
                 [ method ]
                 **
                 * Utility method
                 **
                 * Converts path to a new path where all segments are cubic bezier curves.
                 > Parameters
                 - pathString (string|array) path string or array of segments
                 = (array) array of segments.
                \*/
                R.path2curve = path2curve;
                /*\
                 * Raphael.matrix
                 [ method ]
                 **
                 * Utility method
                 **
                 * Returns matrix based on given parameters.
                 > Parameters
                 - a (number)
                 - b (number)
                 - c (number)
                 - d (number)
                 - e (number)
                 - f (number)
                 = (object) @Matrix
                \*/
                R.matrix = function (a, b, c, d, e, f) {
                    return new Matrix(a, b, c, d, e, f);
                };
                function Matrix(a, b, c, d, e, f) {
                    if (a != null) {
                        this.a = +a;
                        this.b = +b;
                        this.c = +c;
                        this.d = +d;
                        this.e = +e;
                        this.f = +f;
                    } else {
                        this.a = 1;
                        this.b = 0;
                        this.c = 0;
                        this.d = 1;
                        this.e = 0;
                        this.f = 0;
                    }
                }
                (function (matrixproto) {
                    /*\
                     * Matrix.add
                     [ method ]
                     **
                     * Adds given matrix to existing one.
                     > Parameters
                     - a (number)
                     - b (number)
                     - c (number)
                     - d (number)
                     - e (number)
                     - f (number)
                     or
                     - matrix (object) @Matrix
                    \*/
                    matrixproto.add = function (a, b, c, d, e, f) {
                        var out = [[], [], []],
                            m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                            matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
                            x,
                            y,
                            z,
                            res;

                        if (a && a instanceof Matrix) {
                            matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
                        }

                        for (x = 0; x < 3; x++) {
                            for (y = 0; y < 3; y++) {
                                res = 0;
                                for (z = 0; z < 3; z++) {
                                    res += m[x][z] * matrix[z][y];
                                }
                                out[x][y] = res;
                            }
                        }
                        this.a = out[0][0];
                        this.b = out[1][0];
                        this.c = out[0][1];
                        this.d = out[1][1];
                        this.e = out[0][2];
                        this.f = out[1][2];
                    };
                    /*\
                     * Matrix.invert
                     [ method ]
                     **
                     * Returns inverted version of the matrix
                     = (object) @Matrix
                    \*/
                    matrixproto.invert = function () {
                        var me = this,
                            x = me.a * me.d - me.b * me.c;
                        return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
                    };
                    /*\
                     * Matrix.clone
                     [ method ]
                     **
                     * Returns copy of the matrix
                     = (object) @Matrix
                    \*/
                    matrixproto.clone = function () {
                        return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
                    };
                    /*\
                     * Matrix.translate
                     [ method ]
                     **
                     * Translate the matrix
                     > Parameters
                     - x (number)
                     - y (number)
                    \*/
                    matrixproto.translate = function (x, y) {
                        this.add(1, 0, 0, 1, x, y);
                    };
                    /*\
                     * Matrix.scale
                     [ method ]
                     **
                     * Scales the matrix
                     > Parameters
                     - x (number)
                     - y (number) #optional
                     - cx (number) #optional
                     - cy (number) #optional
                    \*/
                    matrixproto.scale = function (x, y, cx, cy) {
                        y == null && (y = x);
                        (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
                        this.add(x, 0, 0, y, 0, 0);
                        (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
                    };
                    /*\
                     * Matrix.rotate
                     [ method ]
                     **
                     * Rotates the matrix
                     > Parameters
                     - a (number)
                     - x (number)
                     - y (number)
                    \*/
                    matrixproto.rotate = function (a, x, y) {
                        a = R.rad(a);
                        x = x || 0;
                        y = y || 0;
                        var cos = +math.cos(a).toFixed(9),
                            sin = +math.sin(a).toFixed(9);
                        this.add(cos, sin, -sin, cos, x, y);
                        this.add(1, 0, 0, 1, -x, -y);
                    };
                    /*\
                     * Matrix.x
                     [ method ]
                     **
                     * Return x coordinate for given point after transformation described by the matrix. See also @Matrix.y
                     > Parameters
                     - x (number)
                     - y (number)
                     = (number) x
                    \*/
                    matrixproto.x = function (x, y) {
                        return x * this.a + y * this.c + this.e;
                    };
                    /*\
                     * Matrix.y
                     [ method ]
                     **
                     * Return y coordinate for given point after transformation described by the matrix. See also @Matrix.x
                     > Parameters
                     - x (number)
                     - y (number)
                     = (number) y
                    \*/
                    matrixproto.y = function (x, y) {
                        return x * this.b + y * this.d + this.f;
                    };
                    matrixproto.get = function (i) {
                        return +this[Str.fromCharCode(97 + i)].toFixed(4);
                    };
                    matrixproto.toString = function () {
                        return R.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
                    };
                    matrixproto.toFilter = function () {
                        return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
                    };
                    matrixproto.offset = function () {
                        return [this.e.toFixed(4), this.f.toFixed(4)];
                    };
                    function norm(a) {
                        return a[0] * a[0] + a[1] * a[1];
                    }
                    function normalize(a) {
                        var mag = math.sqrt(norm(a));
                        a[0] && (a[0] /= mag);
                        a[1] && (a[1] /= mag);
                    }
                    /*\
                     * Matrix.split
                     [ method ]
                     **
                     * Splits matrix into primitive transformations
                     = (object) in format:
                     o dx (number) translation by x
                     o dy (number) translation by y
                     o scalex (number) scale by x
                     o scaley (number) scale by y
                     o shear (number) shear
                     o rotate (number) rotation in deg
                     o isSimple (boolean) could it be represented via simple transformations
                    \*/
                    matrixproto.split = function () {
                        var out = {};
                        // translation
                        out.dx = this.e;
                        out.dy = this.f;

                        // scale and shear
                        var row = [[this.a, this.c], [this.b, this.d]];
                        out.scalex = math.sqrt(norm(row[0]));
                        normalize(row[0]);

                        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
                        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

                        out.scaley = math.sqrt(norm(row[1]));
                        normalize(row[1]);
                        out.shear /= out.scaley;

                        // rotation
                        var sin = -row[0][1],
                            cos = row[1][1];
                        if (cos < 0) {
                            out.rotate = R.deg(math.acos(cos));
                            if (sin < 0) {
                                out.rotate = 360 - out.rotate;
                            }
                        } else {
                            out.rotate = R.deg(math.asin(sin));
                        }

                        out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
                        out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
                        out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
                        return out;
                    };
                    /*\
                     * Matrix.toTransformString
                     [ method ]
                     **
                     * Return transform string that represents given matrix
                     = (string) transform string
                    \*/
                    matrixproto.toTransformString = function (shorter) {
                        var s = shorter || this[split]();
                        if (s.isSimple) {
                            s.scalex = +s.scalex.toFixed(4);
                            s.scaley = +s.scaley.toFixed(4);
                            s.rotate = +s.rotate.toFixed(4);
                            return (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) + (s.rotate ? "r" + [s.rotate, 0, 0] : E);
                        } else {
                            return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
                        }
                    };
                })(Matrix.prototype);

                var preventDefault = function preventDefault() {
                    this.returnValue = false;
                },
                    preventTouch = function preventTouch() {
                    return this.originalEvent.preventDefault();
                },
                    stopPropagation = function stopPropagation() {
                    this.cancelBubble = true;
                },
                    stopTouch = function stopTouch() {
                    return this.originalEvent.stopPropagation();
                },
                    getEventPosition = function getEventPosition(e) {
                    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;

                    return {
                        x: e.clientX + scrollX,
                        y: e.clientY + scrollY
                    };
                },
                    addEvent = function () {
                    if (g.doc.addEventListener) {
                        return function (obj, type, fn, element) {
                            var f = function f(e) {
                                var pos = getEventPosition(e);
                                return fn.call(element, e, pos.x, pos.y);
                            };
                            obj.addEventListener(type, f, false);

                            if (supportsTouch && touchMap[type]) {
                                var _f = function _f(e) {
                                    var pos = getEventPosition(e),
                                        olde = e;

                                    for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                                        if (e.targetTouches[i].target == obj) {
                                            e = e.targetTouches[i];
                                            e.originalEvent = olde;
                                            e.preventDefault = preventTouch;
                                            e.stopPropagation = stopTouch;
                                            break;
                                        }
                                    }

                                    return fn.call(element, e, pos.x, pos.y);
                                };
                                obj.addEventListener(touchMap[type], _f, false);
                            }

                            return function () {
                                obj.removeEventListener(type, f, false);

                                if (supportsTouch && touchMap[type]) obj.removeEventListener(touchMap[type], _f, false);

                                return true;
                            };
                        };
                    } else if (g.doc.attachEvent) {
                        return function (obj, type, fn, element) {
                            var f = function f(e) {
                                e = e || g.win.event;
                                var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                                    scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                                    x = e.clientX + scrollX,
                                    y = e.clientY + scrollY;
                                e.preventDefault = e.preventDefault || preventDefault;
                                e.stopPropagation = e.stopPropagation || stopPropagation;
                                return fn.call(element, e, x, y);
                            };
                            obj.attachEvent("on" + type, f);
                            var detacher = function detacher() {
                                obj.detachEvent("on" + type, f);
                                return true;
                            };
                            return detacher;
                        };
                    }
                }(),
                    drag = [],
                    dragMove = function dragMove(e) {
                    var x = e.clientX,
                        y = e.clientY,
                        scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                        dragi,
                        j = drag.length;
                    while (j--) {
                        dragi = drag[j];
                        if (supportsTouch && e.touches) {
                            var i = e.touches.length,
                                touch;
                            while (i--) {
                                touch = e.touches[i];
                                if (touch.identifier == dragi.el._drag.id) {
                                    x = touch.clientX;
                                    y = touch.clientY;
                                    (e.originalEvent ? e.originalEvent : e).preventDefault();
                                    break;
                                }
                            }
                        } else {
                            e.preventDefault();
                        }
                        var node = dragi.el.node,
                            o,
                            next = node.nextSibling,
                            parent = node.parentNode,
                            display = node.style.display;
                        g.win.opera && parent.removeChild(node);
                        node.style.display = "none";
                        o = dragi.el.paper.getElementByPoint(x, y);
                        node.style.display = display;
                        g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
                        o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
                        x += scrollX;
                        y += scrollY;
                        eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
                    }
                },
                    dragUp = function dragUp(e) {
                    R.unmousemove(dragMove).unmouseup(dragUp);
                    var i = drag.length,
                        dragi;
                    while (i--) {
                        dragi = drag[i];
                        dragi.el._drag = {};
                        eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
                    }
                    drag = [];
                },

                /*\
                 * Raphael.el
                 [ property (object) ]
                 **
                 * You can add your own method to elements. This is useful when you want to hack default functionality or
                 * want to wrap some common transformation or attributes in one method. In difference to canvas methods,
                 * you can redefine element method at any time. Expending element methods wouldn’t affect set.
                 > Usage
                 | Raphael.el.red = function () {
                 |     this.attr({fill: "#f00"});
                 | };
                 | // then use it
                 | paper.circle(100, 100, 20).red();
                \*/
                elproto = R.el = {};
                /*\
                 * Element.click
                 [ method ]
                 **
                 * Adds event handler for click for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.unclick
                 [ method ]
                 **
                 * Removes event handler for click for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.dblclick
                 [ method ]
                 **
                 * Adds event handler for double click for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.undblclick
                 [ method ]
                 **
                 * Removes event handler for double click for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.mousedown
                 [ method ]
                 **
                 * Adds event handler for mousedown for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.unmousedown
                 [ method ]
                 **
                 * Removes event handler for mousedown for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.mousemove
                 [ method ]
                 **
                 * Adds event handler for mousemove for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.unmousemove
                 [ method ]
                 **
                 * Removes event handler for mousemove for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.mouseout
                 [ method ]
                 **
                 * Adds event handler for mouseout for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.unmouseout
                 [ method ]
                 **
                 * Removes event handler for mouseout for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.mouseover
                 [ method ]
                 **
                 * Adds event handler for mouseover for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.unmouseover
                 [ method ]
                 **
                 * Removes event handler for mouseover for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.mouseup
                 [ method ]
                 **
                 * Adds event handler for mouseup for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.unmouseup
                 [ method ]
                 **
                 * Removes event handler for mouseup for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.touchstart
                 [ method ]
                 **
                 * Adds event handler for touchstart for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.untouchstart
                 [ method ]
                 **
                 * Removes event handler for touchstart for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.touchmove
                 [ method ]
                 **
                 * Adds event handler for touchmove for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.untouchmove
                 [ method ]
                 **
                 * Removes event handler for touchmove for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.touchend
                 [ method ]
                 **
                 * Adds event handler for touchend for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.untouchend
                 [ method ]
                 **
                 * Removes event handler for touchend for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/

                /*\
                 * Element.touchcancel
                 [ method ]
                 **
                 * Adds event handler for touchcancel for the element.
                 > Parameters
                 - handler (function) handler for the event
                 = (object) @Element
                \*/
                /*\
                 * Element.untouchcancel
                 [ method ]
                 **
                 * Removes event handler for touchcancel for the element.
                 > Parameters
                 - handler (function) #optional handler for the event
                 = (object) @Element
                \*/
                for (var i = events.length; i--;) {
                    (function (eventName) {
                        R[eventName] = elproto[eventName] = function (fn, scope) {
                            if (R.is(fn, "function")) {
                                this.events = this.events || [];
                                this.events.push({ name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this) });
                            }
                            return this;
                        };
                        R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                            var events = this.events || [],
                                l = events.length;
                            while (l--) {
                                if (events[l].name == eventName && (R.is(fn, "undefined") || events[l].f == fn)) {
                                    events[l].unbind();
                                    events.splice(l, 1);
                                    !events.length && delete this.events;
                                }
                            }
                            return this;
                        };
                    })(events[i]);
                }

                /*\
                 * Element.data
                 [ method ]
                 **
                 * Adds or retrieves given value associated with given key.
                 **
                 * See also @Element.removeData
                 > Parameters
                 - key (string) key to store data
                 - value (any) #optional value to store
                 = (object) @Element
                 * or, if value is not specified:
                 = (any) value
                 * or, if key and value are not specified:
                 = (object) Key/value pairs for all the data associated with the element.
                 > Usage
                 | for (var i = 0, i < 5, i++) {
                 |     paper.circle(10 + 15 * i, 10, 10)
                 |          .attr({fill: "#000"})
                 |          .data("i", i)
                 |          .click(function () {
                 |             alert(this.data("i"));
                 |          });
                 | }
                \*/
                elproto.data = function (key, value) {
                    var data = eldata[this.id] = eldata[this.id] || {};
                    if (arguments.length == 0) {
                        return data;
                    }
                    if (arguments.length == 1) {
                        if (R.is(key, "object")) {
                            for (var i in key) {
                                if (key[has](i)) {
                                    this.data(i, key[i]);
                                }
                            }return this;
                        }
                        eve("raphael.data.get." + this.id, this, data[key], key);
                        return data[key];
                    }
                    data[key] = value;
                    eve("raphael.data.set." + this.id, this, value, key);
                    return this;
                };
                /*\
                 * Element.removeData
                 [ method ]
                 **
                 * Removes value associated with an element by given key.
                 * If key is not provided, removes all the data of the element.
                 > Parameters
                 - key (string) #optional key
                 = (object) @Element
                \*/
                elproto.removeData = function (key) {
                    if (key == null) {
                        eldata[this.id] = {};
                    } else {
                        eldata[this.id] && delete eldata[this.id][key];
                    }
                    return this;
                };
                /*\
                * Element.getData
                [ method ]
                **
                * Retrieves the element data
                = (object) data
                \*/
                elproto.getData = function () {
                    return clone(eldata[this.id] || {});
                };
                /*\
                 * Element.hover
                 [ method ]
                 **
                 * Adds event handlers for hover for the element.
                 > Parameters
                 - f_in (function) handler for hover in
                 - f_out (function) handler for hover out
                 - icontext (object) #optional context for hover in handler
                 - ocontext (object) #optional context for hover out handler
                 = (object) @Element
                \*/
                elproto.hover = function (f_in, f_out, scope_in, scope_out) {
                    return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
                };
                /*\
                 * Element.unhover
                 [ method ]
                 **
                 * Removes event handlers for hover for the element.
                 > Parameters
                 - f_in (function) handler for hover in
                 - f_out (function) handler for hover out
                 = (object) @Element
                \*/
                elproto.unhover = function (f_in, f_out) {
                    return this.unmouseover(f_in).unmouseout(f_out);
                };
                var draggable = [];
                /*\
                 * Element.drag
                 [ method ]
                 **
                 * Adds event handlers for drag of the element.
                 > Parameters
                 - onmove (function) handler for moving
                 - onstart (function) handler for drag start
                 - onend (function) handler for drag end
                 - mcontext (object) #optional context for moving handler
                 - scontext (object) #optional context for drag start handler
                 - econtext (object) #optional context for drag end handler
                 * Additionally following `drag` events will be triggered: `drag.start.<id>` on start,
                 * `drag.end.<id>` on end and `drag.move.<id>` on every move. When element will be dragged over another element
                 * `drag.over.<id>` will be fired as well.
                 *
                 * Start event and start handler will be called in specified context or in context of the element with following parameters:
                 o x (number) x position of the mouse
                 o y (number) y position of the mouse
                 o event (object) DOM event object
                 * Move event and move handler will be called in specified context or in context of the element with following parameters:
                 o dx (number) shift by x from the start point
                 o dy (number) shift by y from the start point
                 o x (number) x position of the mouse
                 o y (number) y position of the mouse
                 o event (object) DOM event object
                 * End event and end handler will be called in specified context or in context of the element with following parameters:
                 o event (object) DOM event object
                 = (object) @Element
                \*/
                elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
                    function start(e) {
                        (e.originalEvent || e).preventDefault();
                        var x = e.clientX,
                            y = e.clientY,
                            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
                        this._drag.id = e.identifier;
                        if (supportsTouch && e.touches) {
                            var i = e.touches.length,
                                touch;
                            while (i--) {
                                touch = e.touches[i];
                                this._drag.id = touch.identifier;
                                if (touch.identifier == this._drag.id) {
                                    x = touch.clientX;
                                    y = touch.clientY;
                                    break;
                                }
                            }
                        }
                        this._drag.x = x + scrollX;
                        this._drag.y = y + scrollY;
                        !drag.length && R.mousemove(dragMove).mouseup(dragUp);
                        drag.push({ el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope });
                        onstart && eve.on("raphael.drag.start." + this.id, onstart);
                        onmove && eve.on("raphael.drag.move." + this.id, onmove);
                        onend && eve.on("raphael.drag.end." + this.id, onend);
                        eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
                    }
                    this._drag = {};
                    draggable.push({ el: this, start: start });
                    this.mousedown(start);
                    return this;
                };
                /*\
                 * Element.onDragOver
                 [ method ]
                 **
                 * Shortcut for assigning event handler for `drag.over.<id>` event, where id is id of the element (see @Element.id).
                 > Parameters
                 - f (function) handler for event, first argument would be the element you are dragging over
                \*/
                elproto.onDragOver = function (f) {
                    f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
                };
                /*\
                 * Element.undrag
                 [ method ]
                 **
                 * Removes all drag event handlers from given element.
                \*/
                elproto.undrag = function () {
                    var i = draggable.length;
                    while (i--) {
                        if (draggable[i].el == this) {
                            this.unmousedown(draggable[i].start);
                            draggable.splice(i, 1);
                            eve.unbind("raphael.drag.*." + this.id);
                        }
                    }!draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
                    drag = [];
                };
                /*\
                 * Paper.circle
                 [ method ]
                 **
                 * Draws a circle.
                 **
                 > Parameters
                 **
                 - x (number) x coordinate of the centre
                 - y (number) y coordinate of the centre
                 - r (number) radius
                 = (object) Raphaël element object with type “circle”
                 **
                 > Usage
                 | var c = paper.circle(50, 50, 40);
                \*/
                paperproto.circle = function (x, y, r) {
                    var out = R._engine.circle(this, x || 0, y || 0, r || 0);
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Paper.rect
                 [ method ]
                 *
                 * Draws a rectangle.
                 **
                 > Parameters
                 **
                 - x (number) x coordinate of the top left corner
                 - y (number) y coordinate of the top left corner
                 - width (number) width
                 - height (number) height
                 - r (number) #optional radius for rounded corners, default is 0
                 = (object) Raphaël element object with type “rect”
                 **
                 > Usage
                 | // regular rectangle
                 | var c = paper.rect(10, 10, 50, 50);
                 | // rectangle with rounded corners
                 | var c = paper.rect(40, 40, 50, 50, 10);
                \*/
                paperproto.rect = function (x, y, w, h, r) {
                    var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Paper.ellipse
                 [ method ]
                 **
                 * Draws an ellipse.
                 **
                 > Parameters
                 **
                 - x (number) x coordinate of the centre
                 - y (number) y coordinate of the centre
                 - rx (number) horizontal radius
                 - ry (number) vertical radius
                 = (object) Raphaël element object with type “ellipse”
                 **
                 > Usage
                 | var c = paper.ellipse(50, 50, 40, 20);
                \*/
                paperproto.ellipse = function (x, y, rx, ry) {
                    var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Paper.path
                 [ method ]
                 **
                 * Creates a path element by given path data string.
                 > Parameters
                 - pathString (string) #optional path string in SVG format.
                 * Path string consists of one-letter commands, followed by comma seprarated arguments in numercal form. Example:
                 | "M10,20L30,40"
                 * Here we can see two commands: “M”, with arguments `(10, 20)` and “L” with arguments `(30, 40)`. Upper case letter mean command is absolute, lower case—relative.
                 *
                 # <p>Here is short list of commands available, for more details see <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path's data attribute's format are described in the SVG specification.">SVG path string format</a>.</p>
                 # <table><thead><tr><th>Command</th><th>Name</th><th>Parameters</th></tr></thead><tbody>
                 # <tr><td>M</td><td>moveto</td><td>(x y)+</td></tr>
                 # <tr><td>Z</td><td>closepath</td><td>(none)</td></tr>
                 # <tr><td>L</td><td>lineto</td><td>(x y)+</td></tr>
                 # <tr><td>H</td><td>horizontal lineto</td><td>x+</td></tr>
                 # <tr><td>V</td><td>vertical lineto</td><td>y+</td></tr>
                 # <tr><td>C</td><td>curveto</td><td>(x1 y1 x2 y2 x y)+</td></tr>
                 # <tr><td>S</td><td>smooth curveto</td><td>(x2 y2 x y)+</td></tr>
                 # <tr><td>Q</td><td>quadratic Bézier curveto</td><td>(x1 y1 x y)+</td></tr>
                 # <tr><td>T</td><td>smooth quadratic Bézier curveto</td><td>(x y)+</td></tr>
                 # <tr><td>A</td><td>elliptical arc</td><td>(rx ry x-axis-rotation large-arc-flag sweep-flag x y)+</td></tr>
                 # <tr><td>R</td><td><a href="http://en.wikipedia.org/wiki/Catmull–Rom_spline#Catmull.E2.80.93Rom_spline">Catmull-Rom curveto</a>*</td><td>x1 y1 (x y)+</td></tr></tbody></table>
                 * * “Catmull-Rom curveto” is a not standard SVG command and added in 2.0 to make life easier.
                 * Note: there is a special case when path consist of just three commands: “M10,10R…z”. In this case path will smoothly connects to its beginning.
                 > Usage
                 | var c = paper.path("M10 10L90 90");
                 | // draw a diagonal line:
                 | // move to 10,10, line to 90,90
                 * For example of path strings, check out these icons: http://raphaeljs.com/icons/
                \*/
                paperproto.path = function (pathString) {
                    pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
                    var out = R._engine.path(R.format[apply](R, arguments), this);
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Paper.image
                 [ method ]
                 **
                 * Embeds an image into the surface.
                 **
                 > Parameters
                 **
                 - src (string) URI of the source image
                 - x (number) x coordinate position
                 - y (number) y coordinate position
                 - width (number) width of the image
                 - height (number) height of the image
                 = (object) Raphaël element object with type “image”
                 **
                 > Usage
                 | var c = paper.image("apple.png", 10, 10, 80, 80);
                \*/
                paperproto.image = function (src, x, y, w, h) {
                    var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Paper.text
                 [ method ]
                 **
                 * Draws a text string. If you need line breaks, put “\n” in the string.
                 **
                 > Parameters
                 **
                 - x (number) x coordinate position
                 - y (number) y coordinate position
                 - text (string) The text string to draw
                 = (object) Raphaël element object with type “text”
                 **
                 > Usage
                 | var t = paper.text(50, 50, "Raphaël\nkicks\nbutt!");
                \*/
                paperproto.text = function (x, y, text) {
                    var out = R._engine.text(this, x || 0, y || 0, Str(text));
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Paper.set
                 [ method ]
                 **
                 * Creates array-like object to keep and operate several elements at once.
                 * Warning: it doesn’t create any elements for itself in the page, it just groups existing elements.
                 * Sets act as pseudo elements — all methods available to an element can be used on a set.
                 = (object) array-like object that represents set of elements
                 **
                 > Usage
                 | var st = paper.set();
                 | st.push(
                 |     paper.circle(10, 10, 5),
                 |     paper.circle(30, 10, 5)
                 | );
                 | st.attr({fill: "red"}); // changes the fill of both circles
                \*/
                paperproto.set = function (itemsArray) {
                    !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
                    var out = new Set(itemsArray);
                    this.__set__ && this.__set__.push(out);
                    out["paper"] = this;
                    out["type"] = "set";
                    return out;
                };
                /*\
                 * Paper.setStart
                 [ method ]
                 **
                 * Creates @Paper.set. All elements that will be created after calling this method and before calling
                 * @Paper.setFinish will be added to the set.
                 **
                 > Usage
                 | paper.setStart();
                 | paper.circle(10, 10, 5),
                 | paper.circle(30, 10, 5)
                 | var st = paper.setFinish();
                 | st.attr({fill: "red"}); // changes the fill of both circles
                \*/
                paperproto.setStart = function (set) {
                    this.__set__ = set || this.set();
                };
                /*\
                 * Paper.setFinish
                 [ method ]
                 **
                 * See @Paper.setStart. This method finishes catching and returns resulting set.
                 **
                 = (object) set
                \*/
                paperproto.setFinish = function (set) {
                    var out = this.__set__;
                    delete this.__set__;
                    return out;
                };
                /*\
                 * Paper.getSize
                 [ method ]
                 **
                 * Obtains current paper actual size.
                 **
                 = (object)
                 \*/
                paperproto.getSize = function () {
                    var container = this.canvas.parentNode;
                    return {
                        width: container.offsetWidth,
                        height: container.offsetHeight
                    };
                };
                /*\
                 * Paper.setSize
                 [ method ]
                 **
                 * If you need to change dimensions of the canvas call this method
                 **
                 > Parameters
                 **
                 - width (number) new width of the canvas
                 - height (number) new height of the canvas
                \*/
                paperproto.setSize = function (width, height) {
                    return R._engine.setSize.call(this, width, height);
                };
                /*\
                 * Paper.setViewBox
                 [ method ]
                 **
                 * Sets the view box of the paper. Practically it gives you ability to zoom and pan whole paper surface by
                 * specifying new boundaries.
                 **
                 > Parameters
                 **
                 - x (number) new x position, default is `0`
                 - y (number) new y position, default is `0`
                 - w (number) new width of the canvas
                 - h (number) new height of the canvas
                 - fit (boolean) `true` if you want graphics to fit into new boundary box
                \*/
                paperproto.setViewBox = function (x, y, w, h, fit) {
                    return R._engine.setViewBox.call(this, x, y, w, h, fit);
                };
                /*\
                 * Paper.top
                 [ property ]
                 **
                 * Points to the topmost element on the paper
                \*/
                /*\
                 * Paper.bottom
                 [ property ]
                 **
                 * Points to the bottom element on the paper
                \*/
                paperproto.top = paperproto.bottom = null;
                /*\
                 * Paper.raphael
                 [ property ]
                 **
                 * Points to the @Raphael object/function
                \*/
                paperproto.raphael = R;
                var getOffset = function getOffset(elem) {
                    var box = elem.getBoundingClientRect(),
                        doc = elem.ownerDocument,
                        body = doc.body,
                        docElem = doc.documentElement,
                        clientTop = docElem.clientTop || body.clientTop || 0,
                        clientLeft = docElem.clientLeft || body.clientLeft || 0,
                        top = box.top + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop) - clientTop,
                        left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
                    return {
                        y: top,
                        x: left
                    };
                };
                /*\
                 * Paper.getElementByPoint
                 [ method ]
                 **
                 * Returns you topmost element under given point.
                 **
                 = (object) Raphaël element object
                 > Parameters
                 **
                 - x (number) x coordinate from the top left corner of the window
                 - y (number) y coordinate from the top left corner of the window
                 > Usage
                 | paper.getElementByPoint(mouseX, mouseY).attr({stroke: "#f00"});
                \*/
                paperproto.getElementByPoint = function (x, y) {
                    var paper = this,
                        svg = paper.canvas,
                        target = g.doc.elementFromPoint(x, y);
                    if (g.win.opera && target.tagName == "svg") {
                        var so = getOffset(svg),
                            sr = svg.createSVGRect();
                        sr.x = x - so.x;
                        sr.y = y - so.y;
                        sr.width = sr.height = 1;
                        var hits = svg.getIntersectionList(sr, null);
                        if (hits.length) {
                            target = hits[hits.length - 1];
                        }
                    }
                    if (!target) {
                        return null;
                    }
                    while (target.parentNode && target != svg.parentNode && !target.raphael) {
                        target = target.parentNode;
                    }
                    target == paper.canvas.parentNode && (target = svg);
                    target = target && target.raphael ? paper.getById(target.raphaelid) : null;
                    return target;
                };

                /*\
                 * Paper.getElementsByBBox
                 [ method ]
                 **
                 * Returns set of elements that have an intersecting bounding box
                 **
                 > Parameters
                 **
                 - bbox (object) bbox to check with
                 = (object) @Set
                 \*/
                paperproto.getElementsByBBox = function (bbox) {
                    var set = this.set();
                    this.forEach(function (el) {
                        if (R.isBBoxIntersect(el.getBBox(), bbox)) {
                            set.push(el);
                        }
                    });
                    return set;
                };

                /*\
                 * Paper.getById
                 [ method ]
                 **
                 * Returns you element by its internal ID.
                 **
                 > Parameters
                 **
                 - id (number) id
                 = (object) Raphaël element object
                \*/
                paperproto.getById = function (id) {
                    var bot = this.bottom;
                    while (bot) {
                        if (bot.id == id) {
                            return bot;
                        }
                        bot = bot.next;
                    }
                    return null;
                };
                /*\
                 * Paper.forEach
                 [ method ]
                 **
                 * Executes given function for each element on the paper
                 *
                 * If callback function returns `false` it will stop loop running.
                 **
                 > Parameters
                 **
                 - callback (function) function to run
                 - thisArg (object) context object for the callback
                 = (object) Paper object
                 > Usage
                 | paper.forEach(function (el) {
                 |     el.attr({ stroke: "blue" });
                 | });
                \*/
                paperproto.forEach = function (callback, thisArg) {
                    var bot = this.bottom;
                    while (bot) {
                        if (callback.call(thisArg, bot) === false) {
                            return this;
                        }
                        bot = bot.next;
                    }
                    return this;
                };
                /*\
                 * Paper.getElementsByPoint
                 [ method ]
                 **
                 * Returns set of elements that have common point inside
                 **
                 > Parameters
                 **
                 - x (number) x coordinate of the point
                 - y (number) y coordinate of the point
                 = (object) @Set
                \*/
                paperproto.getElementsByPoint = function (x, y) {
                    var set = this.set();
                    this.forEach(function (el) {
                        if (el.isPointInside(x, y)) {
                            set.push(el);
                        }
                    });
                    return set;
                };
                function x_y() {
                    return this.x + S + this.y;
                }
                function x_y_w_h() {
                    return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
                }
                /*\
                 * Element.isPointInside
                 [ method ]
                 **
                 * Determine if given point is inside this element’s shape
                 **
                 > Parameters
                 **
                 - x (number) x coordinate of the point
                 - y (number) y coordinate of the point
                 = (boolean) `true` if point inside the shape
                \*/
                elproto.isPointInside = function (x, y) {
                    var rp = this.realPath = getPath[this.type](this);
                    if (this.attr('transform') && this.attr('transform').length) {
                        rp = R.transformPath(rp, this.attr('transform'));
                    }
                    return R.isPointInsidePath(rp, x, y);
                };
                /*\
                 * Element.getBBox
                 [ method ]
                 **
                 * Return bounding box for a given element
                 **
                 > Parameters
                 **
                 - isWithoutTransform (boolean) flag, `true` if you want to have bounding box before transformations. Default is `false`.
                 = (object) Bounding box object:
                 o {
                 o     x: (number) top left corner x
                 o     y: (number) top left corner y
                 o     x2: (number) bottom right corner x
                 o     y2: (number) bottom right corner y
                 o     width: (number) width
                 o     height: (number) height
                 o }
                \*/
                elproto.getBBox = function (isWithoutTransform) {
                    if (this.removed) {
                        return {};
                    }
                    var _ = this._;
                    if (isWithoutTransform) {
                        if (_.dirty || !_.bboxwt) {
                            this.realPath = getPath[this.type](this);
                            _.bboxwt = pathDimensions(this.realPath);
                            _.bboxwt.toString = x_y_w_h;
                            _.dirty = 0;
                        }
                        return _.bboxwt;
                    }
                    if (_.dirty || _.dirtyT || !_.bbox) {
                        if (_.dirty || !this.realPath) {
                            _.bboxwt = 0;
                            this.realPath = getPath[this.type](this);
                        }
                        _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
                        _.bbox.toString = x_y_w_h;
                        _.dirty = _.dirtyT = 0;
                    }
                    return _.bbox;
                };
                /*\
                 * Element.clone
                 [ method ]
                 **
                 = (object) clone of a given element
                 **
                \*/
                elproto.clone = function () {
                    if (this.removed) {
                        return null;
                    }
                    var out = this.paper[this.type]().attr(this.attr());
                    this.__set__ && this.__set__.push(out);
                    return out;
                };
                /*\
                 * Element.glow
                 [ method ]
                 **
                 * Return set of elements that create glow-like effect around given element. See @Paper.set.
                 *
                 * Note: Glow is not connected to the element. If you change element attributes it won’t adjust itself.
                 **
                 > Parameters
                 **
                 - glow (object) #optional parameters object with all properties optional:
                 o {
                 o     width (number) size of the glow, default is `10`
                 o     fill (boolean) will it be filled, default is `false`
                 o     opacity (number) opacity, default is `0.5`
                 o     offsetx (number) horizontal offset, default is `0`
                 o     offsety (number) vertical offset, default is `0`
                 o     color (string) glow colour, default is `black`
                 o }
                 = (object) @Paper.set of elements that represents glow
                \*/
                elproto.glow = function (glow) {
                    if (this.type == "text") {
                        return null;
                    }
                    glow = glow || {};
                    var s = {
                        width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
                        fill: glow.fill || false,
                        opacity: glow.opacity == null ? .5 : glow.opacity,
                        offsetx: glow.offsetx || 0,
                        offsety: glow.offsety || 0,
                        color: glow.color || "#000"
                    },
                        c = s.width / 2,
                        r = this.paper,
                        out = r.set(),
                        path = this.realPath || getPath[this.type](this);
                    path = this.matrix ? mapPath(path, this.matrix) : path;
                    for (var i = 1; i < c + 1; i++) {
                        out.push(r.path(path).attr({
                            stroke: s.color,
                            fill: s.fill ? s.color : "none",
                            "stroke-linejoin": "round",
                            "stroke-linecap": "round",
                            "stroke-width": +(s.width / c * i).toFixed(3),
                            opacity: +(s.opacity / c).toFixed(3)
                        }));
                    }
                    return out.insertBefore(this).translate(s.offsetx, s.offsety);
                };
                var curveslengths = {},
                    getPointAtSegmentLength = function getPointAtSegmentLength(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
                    if (length == null) {
                        return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
                    } else {
                        return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
                    }
                },
                    getLengthFactory = function getLengthFactory(istotal, subpath) {
                    return function (path, length, onlystart) {
                        path = path2curve(path);
                        var x,
                            y,
                            p,
                            l,
                            sp = "",
                            subpaths = {},
                            point,
                            len = 0;
                        for (var i = 0, ii = path.length; i < ii; i++) {
                            p = path[i];
                            if (p[0] == "M") {
                                x = +p[1];
                                y = +p[2];
                            } else {
                                l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                                if (len + l > length) {
                                    if (subpath && !subpaths.start) {
                                        point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                        sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                                        if (onlystart) {
                                            return sp;
                                        }
                                        subpaths.start = sp;
                                        sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                                        len += l;
                                        x = +p[5];
                                        y = +p[6];
                                        continue;
                                    }
                                    if (!istotal && !subpath) {
                                        point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                                        return { x: point.x, y: point.y, alpha: point.alpha };
                                    }
                                }
                                len += l;
                                x = +p[5];
                                y = +p[6];
                            }
                            sp += p.shift() + p;
                        }
                        subpaths.end = sp;
                        point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
                        point.alpha && (point = { x: point.x, y: point.y, alpha: point.alpha });
                        return point;
                    };
                };
                var getTotalLength = getLengthFactory(1),
                    getPointAtLength = getLengthFactory(),
                    getSubpathsAtLength = getLengthFactory(0, 1);
                /*\
                 * Raphael.getTotalLength
                 [ method ]
                 **
                 * Returns length of the given path in pixels.
                 **
                 > Parameters
                 **
                 - path (string) SVG path string.
                 **
                 = (number) length.
                \*/
                R.getTotalLength = getTotalLength;
                /*\
                 * Raphael.getPointAtLength
                 [ method ]
                 **
                 * Return coordinates of the point located at the given length on the given path.
                 **
                 > Parameters
                 **
                 - path (string) SVG path string
                 - length (number)
                 **
                 = (object) representation of the point:
                 o {
                 o     x: (number) x coordinate
                 o     y: (number) y coordinate
                 o     alpha: (number) angle of derivative
                 o }
                \*/
                R.getPointAtLength = getPointAtLength;
                /*\
                 * Raphael.getSubpath
                 [ method ]
                 **
                 * Return subpath of a given path from given length to given length.
                 **
                 > Parameters
                 **
                 - path (string) SVG path string
                 - from (number) position of the start of the segment
                 - to (number) position of the end of the segment
                 **
                 = (string) pathstring for the segment
                \*/
                R.getSubpath = function (path, from, to) {
                    if (this.getTotalLength(path) - to < 1e-6) {
                        return getSubpathsAtLength(path, from).end;
                    }
                    var a = getSubpathsAtLength(path, to, 1);
                    return from ? getSubpathsAtLength(a, from).end : a;
                };
                /*\
                 * Element.getTotalLength
                 [ method ]
                 **
                 * Returns length of the path in pixels. Only works for element of “path” type.
                 = (number) length.
                \*/
                elproto.getTotalLength = function () {
                    var path = this.getPath();
                    if (!path) {
                        return;
                    }

                    if (this.node.getTotalLength) {
                        return this.node.getTotalLength();
                    }

                    return getTotalLength(path);
                };
                /*\
                 * Element.getPointAtLength
                 [ method ]
                 **
                 * Return coordinates of the point located at the given length on the given path. Only works for element of “path” type.
                 **
                 > Parameters
                 **
                 - length (number)
                 **
                 = (object) representation of the point:
                 o {
                 o     x: (number) x coordinate
                 o     y: (number) y coordinate
                 o     alpha: (number) angle of derivative
                 o }
                \*/
                elproto.getPointAtLength = function (length) {
                    var path = this.getPath();
                    if (!path) {
                        return;
                    }

                    return getPointAtLength(path, length);
                };
                /*\
                 * Element.getPath
                 [ method ]
                 **
                 * Returns path of the element. Only works for elements of “path” type and simple elements like circle.
                 = (object) path
                 **
                \*/
                elproto.getPath = function () {
                    var path,
                        getPath = R._getPath[this.type];

                    if (this.type == "text" || this.type == "set") {
                        return;
                    }

                    if (getPath) {
                        path = getPath(this);
                    }

                    return path;
                };
                /*\
                 * Element.getSubpath
                 [ method ]
                 **
                 * Return subpath of a given element from given length to given length. Only works for element of “path” type.
                 **
                 > Parameters
                 **
                 - from (number) position of the start of the segment
                 - to (number) position of the end of the segment
                 **
                 = (string) pathstring for the segment
                \*/
                elproto.getSubpath = function (from, to) {
                    var path = this.getPath();
                    if (!path) {
                        return;
                    }

                    return R.getSubpath(path, from, to);
                };
                /*\
                 * Raphael.easing_formulas
                 [ property ]
                 **
                 * Object that contains easing formulas for animation. You could extend it with your own. By default it has following list of easing:
                 # <ul>
                 #     <li>“linear”</li>
                 #     <li>“&lt;” or “easeIn” or “ease-in”</li>
                 #     <li>“>” or “easeOut” or “ease-out”</li>
                 #     <li>“&lt;>” or “easeInOut” or “ease-in-out”</li>
                 #     <li>“backIn” or “back-in”</li>
                 #     <li>“backOut” or “back-out”</li>
                 #     <li>“elastic”</li>
                 #     <li>“bounce”</li>
                 # </ul>
                 # <p>See also <a href="http://raphaeljs.com/easing.html">Easing demo</a>.</p>
                \*/
                var ef = R.easing_formulas = {
                    linear: function linear(n) {
                        return n;
                    },
                    "<": function _(n) {
                        return pow(n, 1.7);
                    },
                    ">": function _(n) {
                        return pow(n, .48);
                    },
                    "<>": function _(n) {
                        var q = .48 - n / 1.04,
                            Q = math.sqrt(.1734 + q * q),
                            x = Q - q,
                            X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                            y = -Q - q,
                            Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                            t = X + Y + .5;
                        return (1 - t) * 3 * t * t + t * t * t;
                    },
                    backIn: function backIn(n) {
                        var s = 1.70158;
                        return n * n * ((s + 1) * n - s);
                    },
                    backOut: function backOut(n) {
                        n = n - 1;
                        var s = 1.70158;
                        return n * n * ((s + 1) * n + s) + 1;
                    },
                    elastic: function elastic(n) {
                        if (n == !!n) {
                            return n;
                        }
                        return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
                    },
                    bounce: function bounce(n) {
                        var s = 7.5625,
                            p = 2.75,
                            l;
                        if (n < 1 / p) {
                            l = s * n * n;
                        } else {
                            if (n < 2 / p) {
                                n -= 1.5 / p;
                                l = s * n * n + .75;
                            } else {
                                if (n < 2.5 / p) {
                                    n -= 2.25 / p;
                                    l = s * n * n + .9375;
                                } else {
                                    n -= 2.625 / p;
                                    l = s * n * n + .984375;
                                }
                            }
                        }
                        return l;
                    }
                };
                ef.easeIn = ef["ease-in"] = ef["<"];
                ef.easeOut = ef["ease-out"] = ef[">"];
                ef.easeInOut = ef["ease-in-out"] = ef["<>"];
                ef["back-in"] = ef.backIn;
                ef["back-out"] = ef.backOut;

                var animationElements = [],
                    requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                    setTimeout(callback, 16);
                },
                    animation = function animation() {
                    var Now = +new Date(),
                        l = 0;
                    for (; l < animationElements.length; l++) {
                        var e = animationElements[l];
                        if (e.el.removed || e.paused) {
                            continue;
                        }
                        var time = Now - e.start,
                            ms = e.ms,
                            easing = e.easing,
                            from = e.from,
                            diff = e.diff,
                            to = e.to,
                            t = e.t,
                            that = e.el,
                            set = {},
                            now,
                            init = {},
                            key;
                        if (e.initstatus) {
                            time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                            e.status = e.initstatus;
                            delete e.initstatus;
                            e.stop && animationElements.splice(l--, 1);
                        } else {
                            e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                        }
                        if (time < 0) {
                            continue;
                        }
                        if (time < ms) {
                            var pos = easing(time / ms);
                            for (var attr in from) {
                                if (from[has](attr)) {
                                    switch (availableAnimAttrs[attr]) {
                                        case nu:
                                            now = +from[attr] + pos * ms * diff[attr];
                                            break;
                                        case "colour":
                                            now = "rgb(" + [upto255(round(from[attr].r + pos * ms * diff[attr].r)), upto255(round(from[attr].g + pos * ms * diff[attr].g)), upto255(round(from[attr].b + pos * ms * diff[attr].b))].join(",") + ")";
                                            break;
                                        case "path":
                                            now = [];
                                            for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                                now[i] = [from[attr][i][0]];
                                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                                    now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                                }
                                                now[i] = now[i].join(S);
                                            }
                                            now = now.join(S);
                                            break;
                                        case "transform":
                                            if (diff[attr].real) {
                                                now = [];
                                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                                    now[i] = [from[attr][i][0]];
                                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                                        now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                                    }
                                                }
                                            } else {
                                                var get = function get(i) {
                                                    return +from[attr][i] + pos * ms * diff[attr][i];
                                                };
                                                // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                                now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                            }
                                            break;
                                        case "csv":
                                            if (attr == "clip-rect") {
                                                now = [];
                                                i = 4;
                                                while (i--) {
                                                    now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                                }
                                            }
                                            break;
                                        default:
                                            var from2 = [][concat](from[attr]);
                                            now = [];
                                            i = that.paper.customAttributes[attr].length;
                                            while (i--) {
                                                now[i] = +from2[i] + pos * ms * diff[attr][i];
                                            }
                                            break;
                                    }
                                    set[attr] = now;
                                }
                            }that.attr(set);
                            (function (id, that, anim) {
                                setTimeout(function () {
                                    eve("raphael.anim.frame." + id, that, anim);
                                });
                            })(that.id, that, e.anim);
                        } else {
                            (function (f, el, a) {
                                setTimeout(function () {
                                    eve("raphael.anim.frame." + el.id, el, a);
                                    eve("raphael.anim.finish." + el.id, el, a);
                                    R.is(f, "function") && f.call(el);
                                });
                            })(e.callback, that, e.anim);
                            that.attr(to);
                            animationElements.splice(l--, 1);
                            if (e.repeat > 1 && !e.next) {
                                for (key in to) {
                                    if (to[has](key)) {
                                        init[key] = e.totalOrigin[key];
                                    }
                                }e.el.attr(init);
                                runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                            }
                            if (e.next && !e.stop) {
                                runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                            }
                        }
                    }
                    animationElements.length && requestAnimFrame(animation);
                },
                    upto255 = function upto255(color) {
                    return color > 255 ? 255 : color < 0 ? 0 : color;
                };
                /*\
                 * Element.animateWith
                 [ method ]
                 **
                 * Acts similar to @Element.animate, but ensure that given animation runs in sync with another given element.
                 **
                 > Parameters
                 **
                 - el (object) element to sync with
                 - anim (object) animation to sync with
                 - params (object) #optional final attributes for the element, see also @Element.attr
                 - ms (number) #optional number of milliseconds for animation to run
                 - easing (string) #optional easing type. Accept on of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
                 - callback (function) #optional callback function. Will be called at the end of animation.
                 * or
                 - element (object) element to sync with
                 - anim (object) animation to sync with
                 - animation (object) #optional animation object, see @Raphael.animation
                 **
                 = (object) original element
                \*/
                elproto.animateWith = function (el, anim, params, ms, easing, callback) {
                    var element = this;
                    if (element.removed) {
                        callback && callback.call(element);
                        return element;
                    }
                    var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
                        x,
                        y;
                    runAnimation(a, element, a.percents[0], null, element.attr());
                    for (var i = 0, ii = animationElements.length; i < ii; i++) {
                        if (animationElements[i].anim == anim && animationElements[i].el == el) {
                            animationElements[ii - 1].start = animationElements[i].start;
                            break;
                        }
                    }
                    return element;
                    //
                    //
                    // var a = params ? R.animation(params, ms, easing, callback) : anim,
                    //     status = element.status(anim);
                    // return this.animate(a).status(a, status * anim.ms / a.ms);
                };
                function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
                    var cx = 3 * p1x,
                        bx = 3 * (p2x - p1x) - cx,
                        ax = 1 - cx - bx,
                        cy = 3 * p1y,
                        by = 3 * (p2y - p1y) - cy,
                        ay = 1 - cy - by;
                    function sampleCurveX(t) {
                        return ((ax * t + bx) * t + cx) * t;
                    }
                    function solve(x, epsilon) {
                        var t = solveCurveX(x, epsilon);
                        return ((ay * t + by) * t + cy) * t;
                    }
                    function solveCurveX(x, epsilon) {
                        var t0, t1, t2, x2, d2, i;
                        for (t2 = x, i = 0; i < 8; i++) {
                            x2 = sampleCurveX(t2) - x;
                            if (abs(x2) < epsilon) {
                                return t2;
                            }
                            d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                            if (abs(d2) < 1e-6) {
                                break;
                            }
                            t2 = t2 - x2 / d2;
                        }
                        t0 = 0;
                        t1 = 1;
                        t2 = x;
                        if (t2 < t0) {
                            return t0;
                        }
                        if (t2 > t1) {
                            return t1;
                        }
                        while (t0 < t1) {
                            x2 = sampleCurveX(t2);
                            if (abs(x2 - x) < epsilon) {
                                return t2;
                            }
                            if (x > x2) {
                                t0 = t2;
                            } else {
                                t1 = t2;
                            }
                            t2 = (t1 - t0) / 2 + t0;
                        }
                        return t2;
                    }
                    return solve(t, 1 / (200 * duration));
                }
                elproto.onAnimation = function (f) {
                    f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
                    return this;
                };
                function Animation(anim, ms) {
                    var percents = [],
                        newAnim = {};
                    this.ms = ms;
                    this.times = 1;
                    if (anim) {
                        for (var attr in anim) {
                            if (anim[has](attr)) {
                                newAnim[toFloat(attr)] = anim[attr];
                                percents.push(toFloat(attr));
                            }
                        }percents.sort(sortByNumber);
                    }
                    this.anim = newAnim;
                    this.top = percents[percents.length - 1];
                    this.percents = percents;
                }
                /*\
                 * Animation.delay
                 [ method ]
                 **
                 * Creates a copy of existing animation object with given delay.
                 **
                 > Parameters
                 **
                 - delay (number) number of ms to pass between animation start and actual animation
                 **
                 = (object) new altered Animation object
                 | var anim = Raphael.animation({cx: 10, cy: 20}, 2e3);
                 | circle1.animate(anim); // run the given animation immediately
                 | circle2.animate(anim.delay(500)); // run the given animation after 500 ms
                \*/
                Animation.prototype.delay = function (delay) {
                    var a = new Animation(this.anim, this.ms);
                    a.times = this.times;
                    a.del = +delay || 0;
                    return a;
                };
                /*\
                 * Animation.repeat
                 [ method ]
                 **
                 * Creates a copy of existing animation object with given repetition.
                 **
                 > Parameters
                 **
                 - repeat (number) number iterations of animation. For infinite animation pass `Infinity`
                 **
                 = (object) new altered Animation object
                \*/
                Animation.prototype.repeat = function (times) {
                    var a = new Animation(this.anim, this.ms);
                    a.del = this.del;
                    a.times = math.floor(mmax(times, 0)) || 1;
                    return a;
                };
                function runAnimation(anim, element, percent, status, totalOrigin, times) {
                    percent = toFloat(percent);
                    var params,
                        isInAnim,
                        isInAnimSet,
                        percents = [],
                        next,
                        prev,
                        timestamp,
                        ms = anim.ms,
                        from = {},
                        to = {},
                        diff = {};
                    if (status) {
                        for (i = 0, ii = animationElements.length; i < ii; i++) {
                            var e = animationElements[i];
                            if (e.el.id == element.id && e.anim == anim) {
                                if (e.percent != percent) {
                                    animationElements.splice(i, 1);
                                    isInAnimSet = 1;
                                } else {
                                    isInAnim = e;
                                }
                                element.attr(e.totalOrigin);
                                break;
                            }
                        }
                    } else {
                        status = +to; // NaN
                    }
                    for (var i = 0, ii = anim.percents.length; i < ii; i++) {
                        if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                            percent = anim.percents[i];
                            prev = anim.percents[i - 1] || 0;
                            ms = ms / anim.top * (percent - prev);
                            next = anim.percents[i + 1];
                            params = anim.anim[percent];
                            break;
                        } else if (status) {
                            element.attr(anim.anim[anim.percents[i]]);
                        }
                    }
                    if (!params) {
                        return;
                    }
                    if (!isInAnim) {
                        for (var attr in params) {
                            if (params[has](attr)) {
                                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                                    from[attr] = element.attr(attr);
                                    from[attr] == null && (from[attr] = availableAttrs[attr]);
                                    to[attr] = params[attr];
                                    switch (availableAnimAttrs[attr]) {
                                        case nu:
                                            diff[attr] = (to[attr] - from[attr]) / ms;
                                            break;
                                        case "colour":
                                            from[attr] = R.getRGB(from[attr]);
                                            var toColour = R.getRGB(to[attr]);
                                            diff[attr] = {
                                                r: (toColour.r - from[attr].r) / ms,
                                                g: (toColour.g - from[attr].g) / ms,
                                                b: (toColour.b - from[attr].b) / ms
                                            };
                                            break;
                                        case "path":
                                            var pathes = path2curve(from[attr], to[attr]),
                                                toPath = pathes[1];
                                            from[attr] = pathes[0];
                                            diff[attr] = [];
                                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                                diff[attr][i] = [0];
                                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                                }
                                            }
                                            break;
                                        case "transform":
                                            var _ = element._,
                                                eq = equaliseTransform(_[attr], to[attr]);
                                            if (eq) {
                                                from[attr] = eq.from;
                                                to[attr] = eq.to;
                                                diff[attr] = [];
                                                diff[attr].real = true;
                                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                                    diff[attr][i] = [from[attr][i][0]];
                                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                                    }
                                                }
                                            } else {
                                                var m = element.matrix || new Matrix(),
                                                    to2 = {
                                                    _: { transform: _.transform },
                                                    getBBox: function getBBox() {
                                                        return element.getBBox(1);
                                                    }
                                                };
                                                from[attr] = [m.a, m.b, m.c, m.d, m.e, m.f];
                                                extractTransform(to2, to[attr]);
                                                to[attr] = to2._.transform;
                                                diff[attr] = [(to2.matrix.a - m.a) / ms, (to2.matrix.b - m.b) / ms, (to2.matrix.c - m.c) / ms, (to2.matrix.d - m.d) / ms, (to2.matrix.e - m.e) / ms, (to2.matrix.f - m.f) / ms];
                                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                                // extractTransform(to2, to[attr]);
                                                // diff[attr] = [
                                                //     (to2._.sx - _.sx) / ms,
                                                //     (to2._.sy - _.sy) / ms,
                                                //     (to2._.deg - _.deg) / ms,
                                                //     (to2._.dx - _.dx) / ms,
                                                //     (to2._.dy - _.dy) / ms
                                                // ];
                                            }
                                            break;
                                        case "csv":
                                            var values = Str(params[attr])[split](separator),
                                                from2 = Str(from[attr])[split](separator);
                                            if (attr == "clip-rect") {
                                                from[attr] = from2;
                                                diff[attr] = [];
                                                i = from2.length;
                                                while (i--) {
                                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                                }
                                            }
                                            to[attr] = values;
                                            break;
                                        default:
                                            values = [][concat](params[attr]);
                                            from2 = [][concat](from[attr]);
                                            diff[attr] = [];
                                            i = element.paper.customAttributes[attr].length;
                                            while (i--) {
                                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                                            }
                                            break;
                                    }
                                }
                            }
                        }var easing = params.easing,
                            easyeasy = R.easing_formulas[easing];
                        if (!easyeasy) {
                            easyeasy = Str(easing).match(bezierrg);
                            if (easyeasy && easyeasy.length == 5) {
                                var curve = easyeasy;
                                easyeasy = function easyeasy(t) {
                                    return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                                };
                            } else {
                                easyeasy = pipe;
                            }
                        }
                        timestamp = params.start || anim.start || +new Date();
                        e = {
                            anim: anim,
                            percent: percent,
                            timestamp: timestamp,
                            start: timestamp + (anim.del || 0),
                            status: 0,
                            initstatus: status || 0,
                            stop: false,
                            ms: ms,
                            easing: easyeasy,
                            from: from,
                            diff: diff,
                            to: to,
                            el: element,
                            callback: params.callback,
                            prev: prev,
                            next: next,
                            repeat: times || anim.times,
                            origin: element.attr(),
                            totalOrigin: totalOrigin
                        };
                        animationElements.push(e);
                        if (status && !isInAnim && !isInAnimSet) {
                            e.stop = true;
                            e.start = new Date() - ms * status;
                            if (animationElements.length == 1) {
                                return animation();
                            }
                        }
                        if (isInAnimSet) {
                            e.start = new Date() - e.ms * status;
                        }
                        animationElements.length == 1 && requestAnimFrame(animation);
                    } else {
                        isInAnim.initstatus = status;
                        isInAnim.start = new Date() - isInAnim.ms * status;
                    }
                    eve("raphael.anim.start." + element.id, element, anim);
                }
                /*\
                 * Raphael.animation
                 [ method ]
                 **
                 * Creates an animation object that can be passed to the @Element.animate or @Element.animateWith methods.
                 * See also @Animation.delay and @Animation.repeat methods.
                 **
                 > Parameters
                 **
                 - params (object) final attributes for the element, see also @Element.attr
                 - ms (number) number of milliseconds for animation to run
                 - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
                 - callback (function) #optional callback function. Will be called at the end of animation.
                 **
                 = (object) @Animation
                \*/
                R.animation = function (params, ms, easing, callback) {
                    if (params instanceof Animation) {
                        return params;
                    }
                    if (R.is(easing, "function") || !easing) {
                        callback = callback || easing || null;
                        easing = null;
                    }
                    params = Object(params);
                    ms = +ms || 0;
                    var p = {},
                        json,
                        attr;
                    for (attr in params) {
                        if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
                            json = true;
                            p[attr] = params[attr];
                        }
                    }if (!json) {
                        // if percent-like syntax is used and end-of-all animation callback used
                        if (callback) {
                            // find the last one
                            var lastKey = 0;
                            for (var i in params) {
                                var percent = toInt(i);
                                if (params[has](i) && percent > lastKey) {
                                    lastKey = percent;
                                }
                            }
                            lastKey += '%';
                            // if already defined callback in the last keyframe, skip
                            !params[lastKey].callback && (params[lastKey].callback = callback);
                        }
                        return new Animation(params, ms);
                    } else {
                        easing && (p.easing = easing);
                        callback && (p.callback = callback);
                        return new Animation({ 100: p }, ms);
                    }
                };
                /*\
                 * Element.animate
                 [ method ]
                 **
                 * Creates and starts animation for given element.
                 **
                 > Parameters
                 **
                 - params (object) final attributes for the element, see also @Element.attr
                 - ms (number) number of milliseconds for animation to run
                 - easing (string) #optional easing type. Accept one of @Raphael.easing_formulas or CSS format: `cubic&#x2010;bezier(XX,&#160;XX,&#160;XX,&#160;XX)`
                 - callback (function) #optional callback function. Will be called at the end of animation.
                 * or
                 - animation (object) animation object, see @Raphael.animation
                 **
                 = (object) original element
                \*/
                elproto.animate = function (params, ms, easing, callback) {
                    var element = this;
                    if (element.removed) {
                        callback && callback.call(element);
                        return element;
                    }
                    var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
                    runAnimation(anim, element, anim.percents[0], null, element.attr());
                    return element;
                };
                /*\
                 * Element.setTime
                 [ method ]
                 **
                 * Sets the status of animation of the element in milliseconds. Similar to @Element.status method.
                 **
                 > Parameters
                 **
                 - anim (object) animation object
                 - value (number) number of milliseconds from the beginning of the animation
                 **
                 = (object) original element if `value` is specified
                 * Note, that during animation following events are triggered:
                 *
                 * On each animation frame event `anim.frame.<id>`, on start `anim.start.<id>` and on end `anim.finish.<id>`.
                \*/
                elproto.setTime = function (anim, value) {
                    if (anim && value != null) {
                        this.status(anim, mmin(value, anim.ms) / anim.ms);
                    }
                    return this;
                };
                /*\
                 * Element.status
                 [ method ]
                 **
                 * Gets or sets the status of animation of the element.
                 **
                 > Parameters
                 **
                 - anim (object) #optional animation object
                 - value (number) #optional 0 – 1. If specified, method works like a setter and sets the status of a given animation to the value. This will cause animation to jump to the given position.
                 **
                 = (number) status
                 * or
                 = (array) status if `anim` is not specified. Array of objects in format:
                 o {
                 o     anim: (object) animation object
                 o     status: (number) status
                 o }
                 * or
                 = (object) original element if `value` is specified
                \*/
                elproto.status = function (anim, value) {
                    var out = [],
                        i = 0,
                        len,
                        e;
                    if (value != null) {
                        runAnimation(anim, this, -1, mmin(value, 1));
                        return this;
                    } else {
                        len = animationElements.length;
                        for (; i < len; i++) {
                            e = animationElements[i];
                            if (e.el.id == this.id && (!anim || e.anim == anim)) {
                                if (anim) {
                                    return e.status;
                                }
                                out.push({
                                    anim: e.anim,
                                    status: e.status
                                });
                            }
                        }
                        if (anim) {
                            return 0;
                        }
                        return out;
                    }
                };
                /*\
                 * Element.pause
                 [ method ]
                 **
                 * Stops animation of the element with ability to resume it later on.
                 **
                 > Parameters
                 **
                 - anim (object) #optional animation object
                 **
                 = (object) original element
                \*/
                elproto.pause = function (anim) {
                    for (var i = 0; i < animationElements.length; i++) {
                        if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
                            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                                animationElements[i].paused = true;
                            }
                        }
                    }return this;
                };
                /*\
                 * Element.resume
                 [ method ]
                 **
                 * Resumes animation if it was paused with @Element.pause method.
                 **
                 > Parameters
                 **
                 - anim (object) #optional animation object
                 **
                 = (object) original element
                \*/
                elproto.resume = function (anim) {
                    for (var i = 0; i < animationElements.length; i++) {
                        if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
                            var e = animationElements[i];
                            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                                delete e.paused;
                                this.status(e.anim, e.status);
                            }
                        }
                    }return this;
                };
                /*\
                 * Element.stop
                 [ method ]
                 **
                 * Stops animation of the element.
                 **
                 > Parameters
                 **
                 - anim (object) #optional animation object
                 **
                 = (object) original element
                \*/
                elproto.stop = function (anim) {
                    for (var i = 0; i < animationElements.length; i++) {
                        if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
                            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                                animationElements.splice(i--, 1);
                            }
                        }
                    }return this;
                };
                function stopAnimation(paper) {
                    for (var i = 0; i < animationElements.length; i++) {
                        if (animationElements[i].el.paper == paper) {
                            animationElements.splice(i--, 1);
                        }
                    }
                }
                eve.on("raphael.remove", stopAnimation);
                eve.on("raphael.clear", stopAnimation);
                elproto.toString = function () {
                    return "Rapha\xEBl\u2019s object";
                };

                // Set
                var Set = function Set(items) {
                    this.items = [];
                    this.length = 0;
                    this.type = "set";
                    if (items) {
                        for (var i = 0, ii = items.length; i < ii; i++) {
                            if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                                this[this.items.length] = this.items[this.items.length] = items[i];
                                this.length++;
                            }
                        }
                    }
                },
                    setproto = Set.prototype;
                /*\
                 * Set.push
                 [ method ]
                 **
                 * Adds each argument to the current set.
                 = (object) original element
                \*/
                setproto.push = function () {
                    var item, len;
                    for (var i = 0, ii = arguments.length; i < ii; i++) {
                        item = arguments[i];
                        if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                            len = this.items.length;
                            this[len] = this.items[len] = item;
                            this.length++;
                        }
                    }
                    return this;
                };
                /*\
                 * Set.pop
                 [ method ]
                 **
                 * Removes last element and returns it.
                 = (object) element
                \*/
                setproto.pop = function () {
                    this.length && delete this[this.length--];
                    return this.items.pop();
                };
                /*\
                 * Set.forEach
                 [ method ]
                 **
                 * Executes given function for each element in the set.
                 *
                 * If function returns `false` it will stop loop running.
                 **
                 > Parameters
                 **
                 - callback (function) function to run
                 - thisArg (object) context object for the callback
                 = (object) Set object
                \*/
                setproto.forEach = function (callback, thisArg) {
                    for (var i = 0, ii = this.items.length; i < ii; i++) {
                        if (callback.call(thisArg, this.items[i], i) === false) {
                            return this;
                        }
                    }
                    return this;
                };
                for (var method in elproto) {
                    if (elproto[has](method)) {
                        setproto[method] = function (methodname) {
                            return function () {
                                var arg = arguments;
                                return this.forEach(function (el) {
                                    el[methodname][apply](el, arg);
                                });
                            };
                        }(method);
                    }
                }setproto.attr = function (name, value) {
                    if (name && R.is(name, array) && R.is(name[0], "object")) {
                        for (var j = 0, jj = name.length; j < jj; j++) {
                            this.items[j].attr(name[j]);
                        }
                    } else {
                        for (var i = 0, ii = this.items.length; i < ii; i++) {
                            this.items[i].attr(name, value);
                        }
                    }
                    return this;
                };
                /*\
                 * Set.clear
                 [ method ]
                 **
                 * Removes all elements from the set
                \*/
                setproto.clear = function () {
                    while (this.length) {
                        this.pop();
                    }
                };
                /*\
                 * Set.splice
                 [ method ]
                 **
                 * Removes given element from the set
                 **
                 > Parameters
                 **
                 - index (number) position of the deletion
                 - count (number) number of element to remove
                 - insertion… (object) #optional elements to insert
                 = (object) set elements that were deleted
                \*/
                setproto.splice = function (index, count, insertion) {
                    index = index < 0 ? mmax(this.length + index, 0) : index;
                    count = mmax(0, mmin(this.length - index, count));
                    var tail = [],
                        todel = [],
                        args = [],
                        i;
                    for (i = 2; i < arguments.length; i++) {
                        args.push(arguments[i]);
                    }
                    for (i = 0; i < count; i++) {
                        todel.push(this[index + i]);
                    }
                    for (; i < this.length - index; i++) {
                        tail.push(this[index + i]);
                    }
                    var arglen = args.length;
                    for (i = 0; i < arglen + tail.length; i++) {
                        this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
                    }
                    i = this.items.length = this.length -= count - arglen;
                    while (this[i]) {
                        delete this[i++];
                    }
                    return new Set(todel);
                };
                /*\
                 * Set.exclude
                 [ method ]
                 **
                 * Removes given element from the set
                 **
                 > Parameters
                 **
                 - element (object) element to remove
                 = (boolean) `true` if object was found & removed from the set
                \*/
                setproto.exclude = function (el) {
                    for (var i = 0, ii = this.length; i < ii; i++) {
                        if (this[i] == el) {
                            this.splice(i, 1);
                            return true;
                        }
                    }
                };
                setproto.animate = function (params, ms, easing, callback) {
                    (R.is(easing, "function") || !easing) && (callback = easing || null);
                    var len = this.items.length,
                        i = len,
                        item,
                        set = this,
                        collector;
                    if (!len) {
                        return this;
                    }
                    callback && (collector = function collector() {
                        ! --len && callback.call(set);
                    });
                    easing = R.is(easing, string) ? easing : collector;
                    var anim = R.animation(params, ms, easing, collector);
                    item = this.items[--i].animate(anim);
                    while (i--) {
                        this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
                        this.items[i] && !this.items[i].removed || len--;
                    }
                    return this;
                };
                setproto.insertAfter = function (el) {
                    var i = this.items.length;
                    while (i--) {
                        this.items[i].insertAfter(el);
                    }
                    return this;
                };
                setproto.getBBox = function () {
                    var x = [],
                        y = [],
                        x2 = [],
                        y2 = [];
                    for (var i = this.items.length; i--;) {
                        if (!this.items[i].removed) {
                            var box = this.items[i].getBBox();
                            x.push(box.x);
                            y.push(box.y);
                            x2.push(box.x + box.width);
                            y2.push(box.y + box.height);
                        }
                    }x = mmin[apply](0, x);
                    y = mmin[apply](0, y);
                    x2 = mmax[apply](0, x2);
                    y2 = mmax[apply](0, y2);
                    return {
                        x: x,
                        y: y,
                        x2: x2,
                        y2: y2,
                        width: x2 - x,
                        height: y2 - y
                    };
                };
                setproto.clone = function (s) {
                    s = this.paper.set();
                    for (var i = 0, ii = this.items.length; i < ii; i++) {
                        s.push(this.items[i].clone());
                    }
                    return s;
                };
                setproto.toString = function () {
                    return "Rapha\xEBl\u2018s set";
                };

                setproto.glow = function (glowConfig) {
                    var ret = this.paper.set();
                    this.forEach(function (shape, index) {
                        var g = shape.glow(glowConfig);
                        if (g != null) {
                            g.forEach(function (shape2, index2) {
                                ret.push(shape2);
                            });
                        }
                    });
                    return ret;
                };

                /*\
                 * Set.isPointInside
                 [ method ]
                 **
                 * Determine if given point is inside this set’s elements
                 **
                 > Parameters
                 **
                 - x (number) x coordinate of the point
                 - y (number) y coordinate of the point
                 = (boolean) `true` if point is inside any of the set's elements
                 \*/
                setproto.isPointInside = function (x, y) {
                    var isPointInside = false;
                    this.forEach(function (el) {
                        if (el.isPointInside(x, y)) {
                            isPointInside = true;
                            return false; // stop loop
                        }
                    });
                    return isPointInside;
                };

                /*\
                 * Raphael.registerFont
                 [ method ]
                 **
                 * Adds given font to the registered set of fonts for Raphaël. Should be used as an internal call from within Cufón’s font file.
                 * Returns original parameter, so it could be used with chaining.
                 # <a href="http://wiki.github.com/sorccu/cufon/about">More about Cufón and how to convert your font form TTF, OTF, etc to JavaScript file.</a>
                 **
                 > Parameters
                 **
                 - font (object) the font to register
                 = (object) the font you passed in
                 > Usage
                 | Cufon.registerFont(Raphael.registerFont({…}));
                \*/
                R.registerFont = function (font) {
                    if (!font.face) {
                        return font;
                    }
                    this.fonts = this.fonts || {};
                    var fontcopy = {
                        w: font.w,
                        face: {},
                        glyphs: {}
                    },
                        family = font.face["font-family"];
                    for (var prop in font.face) {
                        if (font.face[has](prop)) {
                            fontcopy.face[prop] = font.face[prop];
                        }
                    }if (this.fonts[family]) {
                        this.fonts[family].push(fontcopy);
                    } else {
                        this.fonts[family] = [fontcopy];
                    }
                    if (!font.svg) {
                        fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
                        for (var glyph in font.glyphs) {
                            if (font.glyphs[has](glyph)) {
                                var path = font.glyphs[glyph];
                                fontcopy.glyphs[glyph] = {
                                    w: path.w,
                                    k: {},
                                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                                        return { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[command] || "M";
                                    }) + "z"
                                };
                                if (path.k) {
                                    for (var k in path.k) {
                                        if (path[has](k)) {
                                            fontcopy.glyphs[glyph].k[k] = path.k[k];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return font;
                };
                /*\
                 * Paper.getFont
                 [ method ]
                 **
                 * Finds font object in the registered fonts by given parameters. You could specify only one word from the font name, like “Myriad” for “Myriad Pro”.
                 **
                 > Parameters
                 **
                 - family (string) font family name or any word from it
                 - weight (string) #optional font weight
                 - style (string) #optional font style
                 - stretch (string) #optional font stretch
                 = (object) the font object
                 > Usage
                 | paper.print(100, 100, "Test string", paper.getFont("Times", 800), 30);
                \*/
                paperproto.getFont = function (family, weight, style, stretch) {
                    stretch = stretch || "normal";
                    style = style || "normal";
                    weight = +weight || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[weight] || 400;
                    if (!R.fonts) {
                        return;
                    }
                    var font = R.fonts[family];
                    if (!font) {
                        var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
                        for (var fontName in R.fonts) {
                            if (R.fonts[has](fontName)) {
                                if (name.test(fontName)) {
                                    font = R.fonts[fontName];
                                    break;
                                }
                            }
                        }
                    }
                    var thefont;
                    if (font) {
                        for (var i = 0, ii = font.length; i < ii; i++) {
                            thefont = font[i];
                            if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                                break;
                            }
                        }
                    }
                    return thefont;
                };
                /*\
                 * Paper.print
                 [ method ]
                 **
                 * Creates path that represent given text written using given font at given position with given size.
                 * Result of the method is path element that contains whole text as a separate path.
                 **
                 > Parameters
                 **
                 - x (number) x position of the text
                 - y (number) y position of the text
                 - string (string) text to print
                 - font (object) font object, see @Paper.getFont
                 - size (number) #optional size of the font, default is `16`
                 - origin (string) #optional could be `"baseline"` or `"middle"`, default is `"middle"`
                 - letter_spacing (number) #optional number in range `-1..1`, default is `0`
                 - line_spacing (number) #optional number in range `1..3`, default is `1`
                 = (object) resulting path element, which consist of all letters
                 > Usage
                 | var txt = r.print(10, 50, "print", r.getFont("Museo"), 30).attr({fill: "#fff"});
                \*/
                paperproto.print = function (x, y, string, font, size, origin, letter_spacing, line_spacing) {
                    origin = origin || "middle"; // baseline|middle
                    letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
                    line_spacing = mmax(mmin(line_spacing || 1, 3), 1);
                    var letters = Str(string)[split](E),
                        shift = 0,
                        notfirst = 0,
                        path = E,
                        scale;
                    R.is(font, "string") && (font = this.getFont(font));
                    if (font) {
                        scale = (size || 16) / font.face["units-per-em"];
                        var bb = font.face.bbox[split](separator),
                            top = +bb[0],
                            lineHeight = bb[3] - bb[1],
                            shifty = 0,
                            height = +bb[1] + (origin == "baseline" ? lineHeight + +font.face.descent : lineHeight / 2);
                        for (var i = 0, ii = letters.length; i < ii; i++) {
                            if (letters[i] == "\n") {
                                shift = 0;
                                curr = 0;
                                notfirst = 0;
                                shifty += lineHeight * line_spacing;
                            } else {
                                var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                                    curr = font.glyphs[letters[i]];
                                shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + font.w * letter_spacing : 0;
                                notfirst = 1;
                            }
                            if (curr && curr.d) {
                                path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                            }
                        }
                    }
                    return this.path(path).attr({
                        fill: "#000",
                        stroke: "none"
                    });
                };

                /*\
                 * Paper.add
                 [ method ]
                 **
                 * Imports elements in JSON array in format `{type: type, <attributes>}`
                 **
                 > Parameters
                 **
                 - json (array)
                 = (object) resulting set of imported elements
                 > Usage
                 | paper.add([
                 |     {
                 |         type: "circle",
                 |         cx: 10,
                 |         cy: 10,
                 |         r: 5
                 |     },
                 |     {
                 |         type: "rect",
                 |         x: 10,
                 |         y: 10,
                 |         width: 10,
                 |         height: 10,
                 |         fill: "#fc0"
                 |     }
                 | ]);
                \*/
                paperproto.add = function (json) {
                    if (R.is(json, "array")) {
                        var res = this.set(),
                            i = 0,
                            ii = json.length,
                            j;
                        for (; i < ii; i++) {
                            j = json[i] || {};
                            elements[has](j.type) && res.push(this[j.type]().attr(j));
                        }
                    }
                    return res;
                };

                /*\
                 * Raphael.format
                 [ method ]
                 **
                 * Simple format function. Replaces construction of type “`{<number>}`” to the corresponding argument.
                 **
                 > Parameters
                 **
                 - token (string) string to format
                 - … (string) rest of arguments will be treated as parameters for replacement
                 = (string) formated string
                 > Usage
                 | var x = 10,
                 |     y = 20,
                 |     width = 40,
                 |     height = 50;
                 | // this will draw a rectangular shape equivalent to "M10,20h40v50h-40z"
                 | paper.path(Raphael.format("M{0},{1}h{2}v{3}h{4}z", x, y, width, height, -width));
                \*/
                R.format = function (token, params) {
                    var args = R.is(params, array) ? [0][concat](params) : arguments;
                    token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
                        return args[++i] == null ? E : args[i];
                    }));
                    return token || E;
                };
                /*\
                 * Raphael.fullfill
                 [ method ]
                 **
                 * A little bit more advanced format function than @Raphael.format. Replaces construction of type “`{<name>}`” to the corresponding argument.
                 **
                 > Parameters
                 **
                 - token (string) string to format
                 - json (object) object which properties will be used as a replacement
                 = (string) formated string
                 > Usage
                 | // this will draw a rectangular shape equivalent to "M10,20h40v50h-40z"
                 | paper.path(Raphael.fullfill("M{x},{y}h{dim.width}v{dim.height}h{dim['negative width']}z", {
                 |     x: 10,
                 |     y: 20,
                 |     dim: {
                 |         width: 40,
                 |         height: 50,
                 |         "negative width": -40
                 |     }
                 | }));
                \*/
                R.fullfill = function () {
                    var tokenRegex = /\{([^\}]+)\}/g,
                        objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                        // matches .xxxxx or ["xxxxx"] to run over object properties
                    replacer = function replacer(all, key, obj) {
                        var res = obj;
                        key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                            name = name || quotedName;
                            if (res) {
                                if (name in res) {
                                    res = res[name];
                                }
                                typeof res == "function" && isFunc && (res = res());
                            }
                        });
                        res = (res == null || res == obj ? all : res) + "";
                        return res;
                    };
                    return function (str, obj) {
                        return String(str).replace(tokenRegex, function (all, key) {
                            return replacer(all, key, obj);
                        });
                    };
                }();
                /*\
                 * Raphael.ninja
                 [ method ]
                 **
                 * If you want to leave no trace of Raphaël (Well, Raphaël creates only one global variable `Raphael`, but anyway.) You can use `ninja` method.
                 * Beware, that in this case plugins could stop working, because they are depending on global variable existence.
                 **
                 = (object) Raphael object
                 > Usage
                 | (function (local_raphael) {
                 |     var paper = local_raphael(10, 10, 320, 200);
                 |     …
                 | })(Raphael.ninja());
                \*/
                R.ninja = function () {
                    if (oldRaphael.was) {
                        g.win.Raphael = oldRaphael.is;
                    } else {
                        // IE8 raises an error when deleting window property
                        window.Raphael = undefined;
                        try {
                            delete window.Raphael;
                        } catch (e) {}
                    }
                    return R;
                };
                /*\
                 * Raphael.st
                 [ property (object) ]
                 **
                 * You can add your own method to elements and sets. It is wise to add a set method for each element method
                 * you added, so you will be able to call the same method on sets too.
                 **
                 * See also @Raphael.el.
                 > Usage
                 | Raphael.el.red = function () {
                 |     this.attr({fill: "#f00"});
                 | };
                 | Raphael.st.red = function () {
                 |     this.forEach(function (el) {
                 |         el.red();
                 |     });
                 | };
                 | // then use it
                 | paper.set(paper.circle(100, 100, 20), paper.circle(110, 100, 20)).red();
                \*/
                R.st = setproto;

                eve.on("raphael.DOMload", function () {
                    loaded = true;
                });

                // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
                (function (doc, loaded, _f2) {
                    if (doc.readyState == null && doc.addEventListener) {
                        doc.addEventListener(loaded, _f2 = function f() {
                            doc.removeEventListener(loaded, _f2, false);
                            doc.readyState = "complete";
                        }, false);
                        doc.readyState = "loading";
                    }
                    function isLoaded() {
                        /in/.test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
                    }
                    isLoaded();
                })(document, "DOMContentLoaded");

                return R;
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

            /***/
        },
        /* 2 */
        /***/function (module, exports) {

            module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (R) {
                if (R && !R.svg) {
                    return;
                }

                var has = "hasOwnProperty",
                    Str = String,
                    toFloat = parseFloat,
                    toInt = parseInt,
                    math = Math,
                    mmax = math.max,
                    abs = math.abs,
                    pow = math.pow,
                    separator = /[, ]+/,
                    eve = R.eve,
                    E = "",
                    S = " ";
                var xlink = "http://www.w3.org/1999/xlink",
                    markers = {
                    block: "M5,0 0,2.5 5,5z",
                    classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                    diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                    open: "M6,1 1,3.5 6,6",
                    oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                },
                    markerCounter = {};
                R.toString = function () {
                    return "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
                };
                var $ = function $(el, attr) {
                    if (attr) {
                        if (typeof el == "string") {
                            el = $(el);
                        }
                        for (var key in attr) {
                            if (attr[has](key)) {
                                if (key.substring(0, 6) == "xlink:") {
                                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                                } else {
                                    el.setAttribute(key, Str(attr[key]));
                                }
                            }
                        }
                    } else {
                        el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
                        el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                    }
                    return el;
                },
                    addGradientFill = function addGradientFill(element, gradient) {
                    var type = "linear",
                        id = element.id + gradient,
                        fx = .5,
                        fy = .5,
                        o = element.node,
                        SVG = element.paper,
                        s = o.style,
                        el = R._g.doc.getElementById(id);
                    if (!el) {
                        gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                            type = "radial";
                            if (_fx && _fy) {
                                fx = toFloat(_fx);
                                fy = toFloat(_fy);
                                var dir = (fy > .5) * 2 - 1;
                                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) && fy != .5 && (fy = fy.toFixed(5) - 1e-5 * dir);
                            }
                            return E;
                        });
                        gradient = gradient.split(/\s*\-\s*/);
                        if (type == "linear") {
                            var angle = gradient.shift();
                            angle = -toFloat(angle);
                            if (isNaN(angle)) {
                                return null;
                            }
                            var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                                max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                            vector[2] *= max;
                            vector[3] *= max;
                            if (vector[2] < 0) {
                                vector[0] = -vector[2];
                                vector[2] = 0;
                            }
                            if (vector[3] < 0) {
                                vector[1] = -vector[3];
                                vector[3] = 0;
                            }
                        }
                        var dots = R._parseDots(gradient);
                        if (!dots) {
                            return null;
                        }
                        id = id.replace(/[\(\)\s,\xb0#]/g, "_");

                        if (element.gradient && id != element.gradient.id) {
                            SVG.defs.removeChild(element.gradient);
                            delete element.gradient;
                        }

                        if (!element.gradient) {
                            el = $(type + "Gradient", { id: id });
                            element.gradient = el;
                            $(el, type == "radial" ? {
                                fx: fx,
                                fy: fy
                            } : {
                                x1: vector[0],
                                y1: vector[1],
                                x2: vector[2],
                                y2: vector[3],
                                gradientTransform: element.matrix.invert()
                            });
                            SVG.defs.appendChild(el);
                            for (var i = 0, ii = dots.length; i < ii; i++) {
                                el.appendChild($("stop", {
                                    offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                                    "stop-color": dots[i].color || "#fff",
                                    "stop-opacity": isFinite(dots[i].opacity) ? dots[i].opacity : 1
                                }));
                            }
                        }
                    }
                    $(o, {
                        fill: fillurl(id),
                        opacity: 1,
                        "fill-opacity": 1
                    });
                    s.fill = E;
                    s.opacity = 1;
                    s.fillOpacity = 1;
                    return 1;
                },
                    isIE9or10 = function isIE9or10() {
                    var mode = document.documentMode;
                    return mode && (mode === 9 || mode === 10);
                },
                    fillurl = function fillurl(id) {
                    if (isIE9or10()) {
                        return "url('#" + id + "')";
                    }
                    var location = document.location;
                    var locationString = location.protocol + '//' + location.host + location.pathname + location.search;
                    return "url('" + locationString + "#" + id + "')";
                },
                    updatePosition = function updatePosition(o) {
                    var bbox = o.getBBox(1);
                    $(o.pattern, { patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")" });
                },
                    addArrow = function addArrow(o, value, isEnd) {
                    if (o.type == "path") {
                        var values = Str(value).toLowerCase().split("-"),
                            p = o.paper,
                            se = isEnd ? "end" : "start",
                            node = o.node,
                            attrs = o.attrs,
                            stroke = attrs["stroke-width"],
                            i = values.length,
                            type = "classic",
                            from,
                            to,
                            dx,
                            refX,
                            attr,
                            w = 3,
                            h = 3,
                            t = 5;
                        while (i--) {
                            switch (values[i]) {
                                case "block":
                                case "classic":
                                case "oval":
                                case "diamond":
                                case "open":
                                case "none":
                                    type = values[i];
                                    break;
                                case "wide":
                                    h = 5;break;
                                case "narrow":
                                    h = 2;break;
                                case "long":
                                    w = 5;break;
                                case "short":
                                    w = 2;break;
                            }
                        }
                        if (type == "open") {
                            w += 2;
                            h += 2;
                            t += 2;
                            dx = 1;
                            refX = isEnd ? 4 : 1;
                            attr = {
                                fill: "none",
                                stroke: attrs.stroke
                            };
                        } else {
                            refX = dx = w / 2;
                            attr = {
                                fill: attrs.stroke,
                                stroke: "none"
                            };
                        }
                        if (o._.arrows) {
                            if (isEnd) {
                                o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                                o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                            } else {
                                o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                                o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                            }
                        } else {
                            o._.arrows = {};
                        }
                        if (type != "none") {
                            var pathId = "raphael-marker-" + type,
                                markerId = "raphael-marker-" + se + type + w + h + "-obj" + o.id;
                            if (!R._g.doc.getElementById(pathId)) {
                                p.defs.appendChild($($("path"), {
                                    "stroke-linecap": "round",
                                    d: markers[type],
                                    id: pathId
                                }));
                                markerCounter[pathId] = 1;
                            } else {
                                markerCounter[pathId]++;
                            }
                            var marker = R._g.doc.getElementById(markerId),
                                use;
                            if (!marker) {
                                marker = $($("marker"), {
                                    id: markerId,
                                    markerHeight: h,
                                    markerWidth: w,
                                    orient: "auto",
                                    refX: refX,
                                    refY: h / 2
                                });
                                use = $($("use"), {
                                    "xlink:href": "#" + pathId,
                                    transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                                    "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                                });
                                marker.appendChild(use);
                                p.defs.appendChild(marker);
                                markerCounter[markerId] = 1;
                            } else {
                                markerCounter[markerId]++;
                                use = marker.getElementsByTagName("use")[0];
                            }
                            $(use, attr);
                            var delta = dx * (type != "diamond" && type != "oval");
                            if (isEnd) {
                                from = o._.arrows.startdx * stroke || 0;
                                to = R.getTotalLength(attrs.path) - delta * stroke;
                            } else {
                                from = delta * stroke;
                                to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                            }
                            attr = {};
                            attr["marker-" + se] = "url(#" + markerId + ")";
                            if (to || from) {
                                attr.d = R.getSubpath(attrs.path, from, to);
                            }
                            $(node, attr);
                            o._.arrows[se + "Path"] = pathId;
                            o._.arrows[se + "Marker"] = markerId;
                            o._.arrows[se + "dx"] = delta;
                            o._.arrows[se + "Type"] = type;
                            o._.arrows[se + "String"] = value;
                        } else {
                            if (isEnd) {
                                from = o._.arrows.startdx * stroke || 0;
                                to = R.getTotalLength(attrs.path) - from;
                            } else {
                                from = 0;
                                to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                            }
                            o._.arrows[se + "Path"] && $(node, { d: R.getSubpath(attrs.path, from, to) });
                            delete o._.arrows[se + "Path"];
                            delete o._.arrows[se + "Marker"];
                            delete o._.arrows[se + "dx"];
                            delete o._.arrows[se + "Type"];
                            delete o._.arrows[se + "String"];
                        }
                        for (attr in markerCounter) {
                            if (markerCounter[has](attr) && !markerCounter[attr]) {
                                var item = R._g.doc.getElementById(attr);
                                item && item.parentNode.removeChild(item);
                            }
                        }
                    }
                },
                    dasharray = {
                    "-": [3, 1],
                    ".": [1, 1],
                    "-.": [3, 1, 1, 1],
                    "-..": [3, 1, 1, 1, 1, 1],
                    ". ": [1, 3],
                    "- ": [4, 3],
                    "--": [8, 3],
                    "- .": [4, 3, 1, 3],
                    "--.": [8, 3, 1, 3],
                    "--..": [8, 3, 1, 3, 1, 3]
                },
                    addDashes = function addDashes(o, value, params) {
                    value = dasharray[Str(value).toLowerCase()];
                    if (value) {
                        var width = o.attrs["stroke-width"] || "1",
                            butt = { round: width, square: width, butt: 0 }[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                            dashes = [],
                            i = value.length;
                        while (i--) {
                            dashes[i] = value[i] * width + (i % 2 ? 1 : -1) * butt;
                        }
                        $(o.node, { "stroke-dasharray": dashes.join(",") });
                    } else {
                        $(o.node, { "stroke-dasharray": "none" });
                    }
                },
                    setFillAndStroke = function setFillAndStroke(o, params) {
                    var node = o.node,
                        attrs = o.attrs,
                        vis = node.style.visibility;
                    node.style.visibility = "hidden";
                    for (var att in params) {
                        if (params[has](att)) {
                            if (!R._availableAttrs[has](att)) {
                                continue;
                            }
                            var value = params[att];
                            attrs[att] = value;
                            switch (att) {
                                case "blur":
                                    o.blur(value);
                                    break;
                                case "title":
                                    var title = node.getElementsByTagName("title");

                                    // Use the existing <title>.
                                    if (title.length && (title = title[0])) {
                                        title.firstChild.nodeValue = value;
                                    } else {
                                        title = $("title");
                                        var val = R._g.doc.createTextNode(value);
                                        title.appendChild(val);
                                        node.appendChild(title);
                                    }
                                    break;
                                case "href":
                                case "target":
                                    var pn = node.parentNode;
                                    if (pn.tagName.toLowerCase() != "a") {
                                        var hl = $("a");
                                        pn.insertBefore(hl, node);
                                        hl.appendChild(node);
                                        pn = hl;
                                    }
                                    if (att == "target") {
                                        pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                                    } else {
                                        pn.setAttributeNS(xlink, att, value);
                                    }
                                    break;
                                case "cursor":
                                    node.style.cursor = value;
                                    break;
                                case "transform":
                                    o.transform(value);
                                    break;
                                case "arrow-start":
                                    addArrow(o, value);
                                    break;
                                case "arrow-end":
                                    addArrow(o, value, 1);
                                    break;
                                case "clip-rect":
                                    var rect = Str(value).split(separator);
                                    if (rect.length == 4) {
                                        o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                                        var el = $("clipPath"),
                                            rc = $("rect");
                                        el.id = R.createUUID();
                                        $(rc, {
                                            x: rect[0],
                                            y: rect[1],
                                            width: rect[2],
                                            height: rect[3]
                                        });
                                        el.appendChild(rc);
                                        o.paper.defs.appendChild(el);
                                        $(node, { "clip-path": "url(#" + el.id + ")" });
                                        o.clip = rc;
                                    }
                                    if (!value) {
                                        var path = node.getAttribute("clip-path");
                                        if (path) {
                                            var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                            clip && clip.parentNode.removeChild(clip);
                                            $(node, { "clip-path": E });
                                            delete o.clip;
                                        }
                                    }
                                    break;
                                case "path":
                                    if (o.type == "path") {
                                        $(node, { d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0" });
                                        o._.dirty = 1;
                                        if (o._.arrows) {
                                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                                        }
                                    }
                                    break;
                                case "width":
                                    node.setAttribute(att, value);
                                    o._.dirty = 1;
                                    if (attrs.fx) {
                                        att = "x";
                                        value = attrs.x;
                                    } else {
                                        break;
                                    }
                                case "x":
                                    if (attrs.fx) {
                                        value = -attrs.x - (attrs.width || 0);
                                    }
                                case "rx":
                                    if (att == "rx" && o.type == "rect") {
                                        break;
                                    }
                                case "cx":
                                    node.setAttribute(att, value);
                                    o.pattern && updatePosition(o);
                                    o._.dirty = 1;
                                    break;
                                case "height":
                                    node.setAttribute(att, value);
                                    o._.dirty = 1;
                                    if (attrs.fy) {
                                        att = "y";
                                        value = attrs.y;
                                    } else {
                                        break;
                                    }
                                case "y":
                                    if (attrs.fy) {
                                        value = -attrs.y - (attrs.height || 0);
                                    }
                                case "ry":
                                    if (att == "ry" && o.type == "rect") {
                                        break;
                                    }
                                case "cy":
                                    node.setAttribute(att, value);
                                    o.pattern && updatePosition(o);
                                    o._.dirty = 1;
                                    break;
                                case "r":
                                    if (o.type == "rect") {
                                        $(node, { rx: value, ry: value });
                                    } else {
                                        node.setAttribute(att, value);
                                    }
                                    o._.dirty = 1;
                                    break;
                                case "src":
                                    if (o.type == "image") {
                                        node.setAttributeNS(xlink, "href", value);
                                    }
                                    break;
                                case "stroke-width":
                                    if (o._.sx != 1 || o._.sy != 1) {
                                        value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                                    }
                                    node.setAttribute(att, value);
                                    if (attrs["stroke-dasharray"]) {
                                        addDashes(o, attrs["stroke-dasharray"], params);
                                    }
                                    if (o._.arrows) {
                                        "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                        "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                                    }
                                    break;
                                case "stroke-dasharray":
                                    addDashes(o, value, params);
                                    break;
                                case "fill":
                                    var isURL = Str(value).match(R._ISURL);
                                    if (isURL) {
                                        el = $("pattern");
                                        var ig = $("image");
                                        el.id = R.createUUID();
                                        $(el, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 });
                                        $(ig, { x: 0, y: 0, "xlink:href": isURL[1] });
                                        el.appendChild(ig);

                                        (function (el) {
                                            R._preload(isURL[1], function () {
                                                var w = this.offsetWidth,
                                                    h = this.offsetHeight;
                                                $(el, { width: w, height: h });
                                                $(ig, { width: w, height: h });
                                            });
                                        })(el);
                                        o.paper.defs.appendChild(el);
                                        $(node, { fill: "url(#" + el.id + ")" });
                                        o.pattern = el;
                                        o.pattern && updatePosition(o);
                                        break;
                                    }
                                    var clr = R.getRGB(value);
                                    if (!clr.error) {
                                        delete params.gradient;
                                        delete attrs.gradient;
                                        !R.is(attrs.opacity, "undefined") && R.is(params.opacity, "undefined") && $(node, { opacity: attrs.opacity });
                                        !R.is(attrs["fill-opacity"], "undefined") && R.is(params["fill-opacity"], "undefined") && $(node, { "fill-opacity": attrs["fill-opacity"] });
                                    } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                                        if ("opacity" in attrs || "fill-opacity" in attrs) {
                                            var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                            if (gradient) {
                                                var stops = gradient.getElementsByTagName("stop");
                                                $(stops[stops.length - 1], { "stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1) });
                                            }
                                        }
                                        attrs.gradient = value;
                                        attrs.fill = "none";
                                        break;
                                    }
                                    clr[has]("opacity") && $(node, { "fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity });
                                case "stroke":
                                    clr = R.getRGB(value);
                                    node.setAttribute(att, clr.hex);
                                    att == "stroke" && clr[has]("opacity") && $(node, { "stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity });
                                    if (att == "stroke" && o._.arrows) {
                                        "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                        "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                                    }
                                    break;
                                case "gradient":
                                    (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                                    break;
                                case "opacity":
                                    if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                                        $(node, { "stroke-opacity": value > 1 ? value / 100 : value });
                                    }
                                // fall
                                case "fill-opacity":
                                    if (attrs.gradient) {
                                        gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                        if (gradient) {
                                            stops = gradient.getElementsByTagName("stop");
                                            $(stops[stops.length - 1], { "stop-opacity": value });
                                        }
                                        break;
                                    }
                                default:
                                    att == "font-size" && (value = toInt(value, 10) + "px");
                                    var cssrule = att.replace(/(\-.)/g, function (w) {
                                        return w.substring(1).toUpperCase();
                                    });
                                    node.style[cssrule] = value;
                                    o._.dirty = 1;
                                    node.setAttribute(att, value);
                                    break;
                            }
                        }
                    }

                    tuneText(o, params);
                    node.style.visibility = vis;
                },
                    leading = 1.2,
                    tuneText = function tuneText(el, params) {
                    if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
                        return;
                    }
                    var a = el.attrs,
                        node = el.node,
                        fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

                    if (params[has]("text")) {
                        a.text = params.text;
                        while (node.firstChild) {
                            node.removeChild(node.firstChild);
                        }
                        var texts = Str(params.text).split("\n"),
                            tspans = [],
                            tspan;
                        for (var i = 0, ii = texts.length; i < ii; i++) {
                            tspan = $("tspan");
                            i && $(tspan, { dy: fontSize * leading, x: a.x });
                            tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                            node.appendChild(tspan);
                            tspans[i] = tspan;
                        }
                    } else {
                        tspans = node.getElementsByTagName("tspan");
                        for (i = 0, ii = tspans.length; i < ii; i++) {
                            if (i) {
                                $(tspans[i], { dy: fontSize * leading, x: a.x });
                            } else {
                                $(tspans[0], { dy: 0 });
                            }
                        }
                    }
                    $(node, { x: a.x, y: a.y });
                    el._.dirty = 1;
                    var bb = el._getBBox(),
                        dif = a.y - (bb.y + bb.height / 2);
                    dif && R.is(dif, "finite") && $(tspans[0], { dy: dif });
                },
                    getRealNode = function getRealNode(node) {
                    if (node.parentNode && node.parentNode.tagName.toLowerCase() === "a") {
                        return node.parentNode;
                    } else {
                        return node;
                    }
                },
                    Element = function Element(node, svg) {
                    var X = 0,
                        Y = 0;
                    /*\
                     * Element.node
                     [ property (object) ]
                     **
                     * Gives you a reference to the DOM object, so you can assign event handlers or just mess around.
                     **
                     * Note: Don’t mess with it.
                     > Usage
                     | // draw a circle at coordinate 10,10 with radius of 10
                     | var c = paper.circle(10, 10, 10);
                     | c.node.onclick = function () {
                     |     c.attr("fill", "red");
                     | };
                    \*/
                    this[0] = this.node = node;
                    /*\
                     * Element.raphael
                     [ property (object) ]
                     **
                     * Internal reference to @Raphael object. In case it is not available.
                     > Usage
                     | Raphael.el.red = function () {
                     |     var hsb = this.paper.raphael.rgb2hsb(this.attr("fill"));
                     |     hsb.h = 1;
                     |     this.attr({fill: this.paper.raphael.hsb2rgb(hsb).hex});
                     | }
                    \*/
                    node.raphael = true;
                    /*\
                     * Element.id
                     [ property (number) ]
                     **
                     * Unique id of the element. Especially useful when you want to listen to events of the element,
                     * because all events are fired in format `<module>.<action>.<id>`. Also useful for @Paper.getById method.
                    \*/
                    this.id = guid();
                    node.raphaelid = this.id;

                    /**
                    * Method that returns a 5 letter/digit id, enough for 36^5 = 60466176 elements
                    * @returns {string} id
                    */
                    function guid() {
                        return ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
                    }

                    this.matrix = R.matrix();
                    this.realPath = null;
                    /*\
                     * Element.paper
                     [ property (object) ]
                     **
                     * Internal reference to “paper” where object drawn. Mainly for use in plugins and element extensions.
                     > Usage
                     | Raphael.el.cross = function () {
                     |     this.attr({fill: "red"});
                     |     this.paper.path("M10,10L50,50M50,10L10,50")
                     |         .attr({stroke: "red"});
                     | }
                    \*/
                    this.paper = svg;
                    this.attrs = this.attrs || {};
                    this._ = {
                        transform: [],
                        sx: 1,
                        sy: 1,
                        deg: 0,
                        dx: 0,
                        dy: 0,
                        dirty: 1
                    };
                    !svg.bottom && (svg.bottom = this);
                    /*\
                     * Element.prev
                     [ property (object) ]
                     **
                     * Reference to the previous element in the hierarchy.
                    \*/
                    this.prev = svg.top;
                    svg.top && (svg.top.next = this);
                    svg.top = this;
                    /*\
                     * Element.next
                     [ property (object) ]
                     **
                     * Reference to the next element in the hierarchy.
                    \*/
                    this.next = null;
                },
                    elproto = R.el;

                Element.prototype = elproto;
                elproto.constructor = Element;

                R._engine.path = function (pathString, SVG) {
                    var el = $("path");
                    SVG.canvas && SVG.canvas.appendChild(el);
                    var p = new Element(el, SVG);
                    p.type = "path";
                    setFillAndStroke(p, {
                        fill: "none",
                        stroke: "#000",
                        path: pathString
                    });
                    return p;
                };
                /*\
                 * Element.rotate
                 [ method ]
                 **
                 * Deprecated! Use @Element.transform instead.
                 * Adds rotation by given angle around given point to the list of
                 * transformations of the element.
                 > Parameters
                 - deg (number) angle in degrees
                 - cx (number) #optional x coordinate of the centre of rotation
                 - cy (number) #optional y coordinate of the centre of rotation
                 * If cx & cy aren’t specified centre of the shape is used as a point of rotation.
                 = (object) @Element
                \*/
                elproto.rotate = function (deg, cx, cy) {
                    if (this.removed) {
                        return this;
                    }
                    deg = Str(deg).split(separator);
                    if (deg.length - 1) {
                        cx = toFloat(deg[1]);
                        cy = toFloat(deg[2]);
                    }
                    deg = toFloat(deg[0]);
                    cy == null && (cx = cy);
                    if (cx == null || cy == null) {
                        var bbox = this.getBBox(1);
                        cx = bbox.x + bbox.width / 2;
                        cy = bbox.y + bbox.height / 2;
                    }
                    this.transform(this._.transform.concat([["r", deg, cx, cy]]));
                    return this;
                };
                /*\
                 * Element.scale
                 [ method ]
                 **
                 * Deprecated! Use @Element.transform instead.
                 * Adds scale by given amount relative to given point to the list of
                 * transformations of the element.
                 > Parameters
                 - sx (number) horisontal scale amount
                 - sy (number) vertical scale amount
                 - cx (number) #optional x coordinate of the centre of scale
                 - cy (number) #optional y coordinate of the centre of scale
                 * If cx & cy aren’t specified centre of the shape is used instead.
                 = (object) @Element
                \*/
                elproto.scale = function (sx, sy, cx, cy) {
                    if (this.removed) {
                        return this;
                    }
                    sx = Str(sx).split(separator);
                    if (sx.length - 1) {
                        sy = toFloat(sx[1]);
                        cx = toFloat(sx[2]);
                        cy = toFloat(sx[3]);
                    }
                    sx = toFloat(sx[0]);
                    sy == null && (sy = sx);
                    cy == null && (cx = cy);
                    if (cx == null || cy == null) {
                        var bbox = this.getBBox(1);
                    }
                    cx = cx == null ? bbox.x + bbox.width / 2 : cx;
                    cy = cy == null ? bbox.y + bbox.height / 2 : cy;
                    this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
                    return this;
                };
                /*\
                 * Element.translate
                 [ method ]
                 **
                 * Deprecated! Use @Element.transform instead.
                 * Adds translation by given amount to the list of transformations of the element.
                 > Parameters
                 - dx (number) horisontal shift
                 - dy (number) vertical shift
                 = (object) @Element
                \*/
                elproto.translate = function (dx, dy) {
                    if (this.removed) {
                        return this;
                    }
                    dx = Str(dx).split(separator);
                    if (dx.length - 1) {
                        dy = toFloat(dx[1]);
                    }
                    dx = toFloat(dx[0]) || 0;
                    dy = +dy || 0;
                    this.transform(this._.transform.concat([["t", dx, dy]]));
                    return this;
                };
                /*\
                 * Element.transform
                 [ method ]
                 **
                 * Adds transformation to the element which is separate to other attributes,
                 * i.e. translation doesn’t change `x` or `y` of the rectange. The format
                 * of transformation string is similar to the path string syntax:
                 | "t100,100r30,100,100s2,2,100,100r45s1.5"
                 * Each letter is a command. There are four commands: `t` is for translate, `r` is for rotate, `s` is for
                 * scale and `m` is for matrix.
                 *
                 * There are also alternative “absolute” translation, rotation and scale: `T`, `R` and `S`. They will not take previous transformation into account. For example, `...T100,0` will always move element 100 px horisontally, while `...t100,0` could move it vertically if there is `r90` before. Just compare results of `r90t100,0` and `r90T100,0`.
                 *
                 * So, the example line above could be read like “translate by 100, 100; rotate 30° around 100, 100; scale twice around 100, 100;
                 * rotate 45° around centre; scale 1.5 times relative to centre”. As you can see rotate and scale commands have origin
                 * coordinates as optional parameters, the default is the centre point of the element.
                 * Matrix accepts six parameters.
                 > Usage
                 | var el = paper.rect(10, 20, 300, 200);
                 | // translate 100, 100, rotate 45°, translate -100, 0
                 | el.transform("t100,100r45t-100,0");
                 | // if you want you can append or prepend transformations
                 | el.transform("...t50,50");
                 | el.transform("s2...");
                 | // or even wrap
                 | el.transform("t50,50...t-50-50");
                 | // to reset transformation call method with empty string
                 | el.transform("");
                 | // to get current value call it without parameters
                 | console.log(el.transform());
                 > Parameters
                 - tstr (string) #optional transformation string
                 * If tstr isn’t specified
                 = (string) current transformation string
                 * else
                 = (object) @Element
                \*/
                elproto.transform = function (tstr) {
                    var _ = this._;
                    if (tstr == null) {
                        return _.transform;
                    }
                    R._extractTransform(this, tstr);

                    this.clip && $(this.clip, { transform: this.matrix.invert() });
                    this.pattern && updatePosition(this);
                    this.node && $(this.node, { transform: this.matrix });

                    if (_.sx != 1 || _.sy != 1) {
                        var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
                        this.attr({ "stroke-width": sw });
                    }

                    return this;
                };
                /*\
                 * Element.hide
                 [ method ]
                 **
                 * Makes element invisible. See @Element.show.
                 = (object) @Element
                \*/
                elproto.hide = function () {
                    if (!this.removed) this.node.style.display = "none";
                    return this;
                };
                /*\
                 * Element.show
                 [ method ]
                 **
                 * Makes element visible. See @Element.hide.
                 = (object) @Element
                \*/
                elproto.show = function () {
                    if (!this.removed) this.node.style.display = "";
                    return this;
                };
                /*\
                 * Element.remove
                 [ method ]
                 **
                 * Removes element from the paper.
                \*/
                elproto.remove = function () {
                    var node = getRealNode(this.node);
                    if (this.removed || !node.parentNode) {
                        return;
                    }
                    var paper = this.paper;
                    paper.__set__ && paper.__set__.exclude(this);
                    eve.unbind("raphael.*.*." + this.id);
                    if (this.gradient) {
                        paper.defs.removeChild(this.gradient);
                    }
                    R._tear(this, paper);

                    node.parentNode.removeChild(node);

                    // Remove custom data for element
                    this.removeData();

                    for (var i in this) {
                        this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
                    }
                    this.removed = true;
                };
                elproto._getBBox = function () {
                    if (this.node.style.display == "none") {
                        this.show();
                        var hide = true;
                    }
                    var canvasHidden = false,
                        containerStyle;
                    if (this.paper.canvas.parentElement) {
                        containerStyle = this.paper.canvas.parentElement.style;
                    } //IE10+ can't find parentElement
                    else if (this.paper.canvas.parentNode) {
                            containerStyle = this.paper.canvas.parentNode.style;
                        }

                    if (containerStyle && containerStyle.display == "none") {
                        canvasHidden = true;
                        containerStyle.display = "";
                    }
                    var bbox = {};
                    try {
                        bbox = this.node.getBBox();
                    } catch (e) {
                        // Firefox 3.0.x, 25.0.1 (probably more versions affected) play badly here - possible fix
                        bbox = {
                            x: this.node.clientLeft,
                            y: this.node.clientTop,
                            width: this.node.clientWidth,
                            height: this.node.clientHeight
                        };
                    } finally {
                        bbox = bbox || {};
                        if (canvasHidden) {
                            containerStyle.display = "none";
                        }
                    }
                    hide && this.hide();
                    return bbox;
                };
                /*\
                 * Element.attr
                 [ method ]
                 **
                 * Sets the attributes of the element.
                 > Parameters
                 - attrName (string) attribute’s name
                 - value (string) value
                 * or
                 - params (object) object of name/value pairs
                 * or
                 - attrName (string) attribute’s name
                 * or
                 - attrNames (array) in this case method returns array of current values for given attribute names
                 = (object) @Element if attrsName & value or params are passed in.
                 = (...) value of the attribute if only attrsName is passed in.
                 = (array) array of values of the attribute if attrsNames is passed in.
                 = (object) object of attributes if nothing is passed in.
                 > Possible parameters
                 # <p>Please refer to the <a href="http://www.w3.org/TR/SVG/" title="The W3C Recommendation for the SVG language describes these properties in detail.">SVG specification</a> for an explanation of these parameters.</p>
                 o arrow-end (string) arrowhead on the end of the path. The format for string is `<type>[-<width>[-<length>]]`. Possible types: `classic`, `block`, `open`, `oval`, `diamond`, `none`, width: `wide`, `narrow`, `medium`, length: `long`, `short`, `midium`.
                 o clip-rect (string) comma or space separated values: x, y, width and height
                 o cursor (string) CSS type of the cursor
                 o cx (number) the x-axis coordinate of the center of the circle, or ellipse
                 o cy (number) the y-axis coordinate of the center of the circle, or ellipse
                 o fill (string) colour, gradient or image
                 o fill-opacity (number)
                 o font (string)
                 o font-family (string)
                 o font-size (number) font size in pixels
                 o font-weight (string)
                 o height (number)
                 o href (string) URL, if specified element behaves as hyperlink
                 o opacity (number)
                 o path (string) SVG path string format
                 o r (number) radius of the circle, ellipse or rounded corner on the rect
                 o rx (number) horisontal radius of the ellipse
                 o ry (number) vertical radius of the ellipse
                 o src (string) image URL, only works for @Element.image element
                 o stroke (string) stroke colour
                 o stroke-dasharray (string) [“”, “none”, “`-`”, “`.`”, “`-.`”, “`-..`”, “`. `”, “`- `”, “`--`”, “`- .`”, “`--.`”, “`--..`”]
                 o stroke-linecap (string) [“`butt`”, “`square`”, “`round`”]
                 o stroke-linejoin (string) [“`bevel`”, “`round`”, “`miter`”]
                 o stroke-miterlimit (number)
                 o stroke-opacity (number)
                 o stroke-width (number) stroke width in pixels, default is '1'
                 o target (string) used with href
                 o text (string) contents of the text element. Use `\n` for multiline text
                 o text-anchor (string) [“`start`”, “`middle`”, “`end`”], default is “`middle`”
                 o title (string) will create tooltip with a given text
                 o transform (string) see @Element.transform
                 o width (number)
                 o x (number)
                 o y (number)
                 > Gradients
                 * Linear gradient format: “`‹angle›-‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`90-#fff-#000`” – 90°
                 * gradient from white to black or “`0-#fff-#f00:20-#000`” – 0° gradient from white via red (at 20%) to black.
                 *
                 * radial gradient: “`r[(‹fx›, ‹fy›)]‹colour›[-‹colour›[:‹offset›]]*-‹colour›`”, example: “`r#fff-#000`” –
                 * gradient from white to black or “`r(0.25, 0.75)#fff-#000`” – gradient from white to black with focus point
                 * at 0.25, 0.75. Focus point coordinates are in 0..1 range. Radial gradients can only be applied to circles and ellipses.
                 > Path String
                 # <p>Please refer to <a href="http://www.w3.org/TR/SVG/paths.html#PathData" title="Details of a path’s data attribute’s format are described in the SVG specification.">SVG documentation regarding path string</a>. Raphaël fully supports it.</p>
                 > Colour Parsing
                 # <ul>
                 #     <li>Colour name (“<code>red</code>”, “<code>green</code>”, “<code>cornflowerblue</code>”, etc)</li>
                 #     <li>#••• — shortened HTML colour: (“<code>#000</code>”, “<code>#fc0</code>”, etc)</li>
                 #     <li>#•••••• — full length HTML colour: (“<code>#000000</code>”, “<code>#bd2300</code>”)</li>
                 #     <li>rgb(•••, •••, •••) — red, green and blue channels’ values: (“<code>rgb(200,&nbsp;100,&nbsp;0)</code>”)</li>
                 #     <li>rgb(•••%, •••%, •••%) — same as above, but in %: (“<code>rgb(100%,&nbsp;175%,&nbsp;0%)</code>”)</li>
                 #     <li>rgba(•••, •••, •••, •••) — red, green and blue channels’ values: (“<code>rgba(200,&nbsp;100,&nbsp;0, .5)</code>”)</li>
                 #     <li>rgba(•••%, •••%, •••%, •••%) — same as above, but in %: (“<code>rgba(100%,&nbsp;175%,&nbsp;0%, 50%)</code>”)</li>
                 #     <li>hsb(•••, •••, •••) — hue, saturation and brightness values: (“<code>hsb(0.5,&nbsp;0.25,&nbsp;1)</code>”)</li>
                 #     <li>hsb(•••%, •••%, •••%) — same as above, but in %</li>
                 #     <li>hsba(•••, •••, •••, •••) — same as above, but with opacity</li>
                 #     <li>hsl(•••, •••, •••) — almost the same as hsb, see <a href="http://en.wikipedia.org/wiki/HSL_and_HSV" title="HSL and HSV - Wikipedia, the free encyclopedia">Wikipedia page</a></li>
                 #     <li>hsl(•••%, •••%, •••%) — same as above, but in %</li>
                 #     <li>hsla(•••, •••, •••, •••) — same as above, but with opacity</li>
                 #     <li>Optionally for hsb and hsl you could specify hue as a degree: “<code>hsl(240deg,&nbsp;1,&nbsp;.5)</code>” or, if you want to go fancy, “<code>hsl(240°,&nbsp;1,&nbsp;.5)</code>”</li>
                 # </ul>
                \*/
                elproto.attr = function (name, value) {
                    if (this.removed) {
                        return this;
                    }
                    if (name == null) {
                        var res = {};
                        for (var a in this.attrs) {
                            if (this.attrs[has](a)) {
                                res[a] = this.attrs[a];
                            }
                        }res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
                        res.transform = this._.transform;
                        return res;
                    }
                    if (value == null && R.is(name, "string")) {
                        if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                            return this.attrs.gradient;
                        }
                        if (name == "transform") {
                            return this._.transform;
                        }
                        var names = name.split(separator),
                            out = {};
                        for (var i = 0, ii = names.length; i < ii; i++) {
                            name = names[i];
                            if (name in this.attrs) {
                                out[name] = this.attrs[name];
                            } else if (R.is(this.paper.customAttributes[name], "function")) {
                                out[name] = this.paper.customAttributes[name].def;
                            } else {
                                out[name] = R._availableAttrs[name];
                            }
                        }
                        return ii - 1 ? out : out[names[0]];
                    }
                    if (value == null && R.is(name, "array")) {
                        out = {};
                        for (i = 0, ii = name.length; i < ii; i++) {
                            out[name[i]] = this.attr(name[i]);
                        }
                        return out;
                    }
                    if (value != null) {
                        var params = {};
                        params[name] = value;
                    } else if (name != null && R.is(name, "object")) {
                        params = name;
                    }
                    for (var key in params) {
                        eve("raphael.attr." + key + "." + this.id, this, params[key]);
                    }
                    for (key in this.paper.customAttributes) {
                        if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                            this.attrs[key] = params[key];
                            for (var subkey in par) {
                                if (par[has](subkey)) {
                                    params[subkey] = par[subkey];
                                }
                            }
                        }
                    }setFillAndStroke(this, params);
                    return this;
                };
                /*\
                 * Element.toFront
                 [ method ]
                 **
                 * Moves the element so it is the closest to the viewer’s eyes, on top of other elements.
                 = (object) @Element
                \*/
                elproto.toFront = function () {
                    if (this.removed) {
                        return this;
                    }
                    var node = getRealNode(this.node);
                    node.parentNode.appendChild(node);
                    var svg = this.paper;
                    svg.top != this && R._tofront(this, svg);
                    return this;
                };
                /*\
                 * Element.toBack
                 [ method ]
                 **
                 * Moves the element so it is the furthest from the viewer’s eyes, behind other elements.
                 = (object) @Element
                \*/
                elproto.toBack = function () {
                    if (this.removed) {
                        return this;
                    }
                    var node = getRealNode(this.node);
                    var parentNode = node.parentNode;
                    parentNode.insertBefore(node, parentNode.firstChild);
                    R._toback(this, this.paper);
                    var svg = this.paper;
                    return this;
                };
                /*\
                 * Element.insertAfter
                 [ method ]
                 **
                 * Inserts current object after the given one.
                 = (object) @Element
                \*/
                elproto.insertAfter = function (element) {
                    if (this.removed || !element) {
                        return this;
                    }

                    var node = getRealNode(this.node);
                    var afterNode = getRealNode(element.node || element[element.length - 1].node);
                    if (afterNode.nextSibling) {
                        afterNode.parentNode.insertBefore(node, afterNode.nextSibling);
                    } else {
                        afterNode.parentNode.appendChild(node);
                    }
                    R._insertafter(this, element, this.paper);
                    return this;
                };
                /*\
                 * Element.insertBefore
                 [ method ]
                 **
                 * Inserts current object before the given one.
                 = (object) @Element
                \*/
                elproto.insertBefore = function (element) {
                    if (this.removed || !element) {
                        return this;
                    }

                    var node = getRealNode(this.node);
                    var beforeNode = getRealNode(element.node || element[0].node);
                    beforeNode.parentNode.insertBefore(node, beforeNode);
                    R._insertbefore(this, element, this.paper);
                    return this;
                };
                elproto.blur = function (size) {
                    // Experimental. No Safari support. Use it on your own risk.
                    var t = this;
                    if (+size !== 0) {
                        var fltr = $("filter"),
                            blur = $("feGaussianBlur");
                        t.attrs.blur = size;
                        fltr.id = R.createUUID();
                        $(blur, { stdDeviation: +size || 1.5 });
                        fltr.appendChild(blur);
                        t.paper.defs.appendChild(fltr);
                        t._blur = fltr;
                        $(t.node, { filter: "url(#" + fltr.id + ")" });
                    } else {
                        if (t._blur) {
                            t._blur.parentNode.removeChild(t._blur);
                            delete t._blur;
                            delete t.attrs.blur;
                        }
                        t.node.removeAttribute("filter");
                    }
                    return t;
                };
                R._engine.circle = function (svg, x, y, r) {
                    var el = $("circle");
                    svg.canvas && svg.canvas.appendChild(el);
                    var res = new Element(el, svg);
                    res.attrs = { cx: x, cy: y, r: r, fill: "none", stroke: "#000" };
                    res.type = "circle";
                    $(el, res.attrs);
                    return res;
                };
                R._engine.rect = function (svg, x, y, w, h, r) {
                    var el = $("rect");
                    svg.canvas && svg.canvas.appendChild(el);
                    var res = new Element(el, svg);
                    res.attrs = { x: x, y: y, width: w, height: h, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000" };
                    res.type = "rect";
                    $(el, res.attrs);
                    return res;
                };
                R._engine.ellipse = function (svg, x, y, rx, ry) {
                    var el = $("ellipse");
                    svg.canvas && svg.canvas.appendChild(el);
                    var res = new Element(el, svg);
                    res.attrs = { cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000" };
                    res.type = "ellipse";
                    $(el, res.attrs);
                    return res;
                };
                R._engine.image = function (svg, src, x, y, w, h) {
                    var el = $("image");
                    $(el, { x: x, y: y, width: w, height: h, preserveAspectRatio: "none" });
                    el.setAttributeNS(xlink, "href", src);
                    svg.canvas && svg.canvas.appendChild(el);
                    var res = new Element(el, svg);
                    res.attrs = { x: x, y: y, width: w, height: h, src: src };
                    res.type = "image";
                    return res;
                };
                R._engine.text = function (svg, x, y, text) {
                    var el = $("text");
                    svg.canvas && svg.canvas.appendChild(el);
                    var res = new Element(el, svg);
                    res.attrs = {
                        x: x,
                        y: y,
                        "text-anchor": "middle",
                        text: text,
                        "font-family": R._availableAttrs["font-family"],
                        "font-size": R._availableAttrs["font-size"],
                        stroke: "none",
                        fill: "#000"
                    };
                    res.type = "text";
                    setFillAndStroke(res, res.attrs);
                    return res;
                };
                R._engine.setSize = function (width, height) {
                    this.width = width || this.width;
                    this.height = height || this.height;
                    this.canvas.setAttribute("width", this.width);
                    this.canvas.setAttribute("height", this.height);
                    if (this._viewBox) {
                        this.setViewBox.apply(this, this._viewBox);
                    }
                    return this;
                };
                R._engine.create = function () {
                    var con = R._getContainer.apply(0, arguments),
                        container = con && con.container,
                        x = con.x,
                        y = con.y,
                        width = con.width,
                        height = con.height;
                    if (!container) {
                        throw new Error("SVG container not found.");
                    }
                    var cnvs = $("svg"),
                        css = "overflow:hidden;",
                        isFloating;
                    x = x || 0;
                    y = y || 0;
                    width = width || 512;
                    height = height || 342;
                    $(cnvs, {
                        height: height,
                        version: 1.1,
                        width: width,
                        xmlns: "http://www.w3.org/2000/svg",
                        "xmlns:xlink": "http://www.w3.org/1999/xlink"
                    });
                    if (container == 1) {
                        cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
                        R._g.doc.body.appendChild(cnvs);
                        isFloating = 1;
                    } else {
                        cnvs.style.cssText = css + "position:relative";
                        if (container.firstChild) {
                            container.insertBefore(cnvs, container.firstChild);
                        } else {
                            container.appendChild(cnvs);
                        }
                    }
                    container = new R._Paper();
                    container.width = width;
                    container.height = height;
                    container.canvas = cnvs;
                    container.clear();
                    container._left = container._top = 0;
                    isFloating && (container.renderfix = function () {});
                    container.renderfix();
                    return container;
                };
                R._engine.setViewBox = function (x, y, w, h, fit) {
                    eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
                    var paperSize = this.getSize(),
                        size = mmax(w / paperSize.width, h / paperSize.height),
                        top = this.top,
                        aspectRatio = fit ? "xMidYMid meet" : "xMinYMin",
                        vb,
                        sw;
                    if (x == null) {
                        if (this._vbSize) {
                            size = 1;
                        }
                        delete this._vbSize;
                        vb = "0 0 " + this.width + S + this.height;
                    } else {
                        this._vbSize = size;
                        vb = x + S + y + S + w + S + h;
                    }
                    $(this.canvas, {
                        viewBox: vb,
                        preserveAspectRatio: aspectRatio
                    });
                    while (size && top) {
                        sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
                        top.attr({ "stroke-width": sw });
                        top._.dirty = 1;
                        top._.dirtyT = 1;
                        top = top.prev;
                    }
                    this._viewBox = [x, y, w, h, !!fit];
                    return this;
                };
                /*\
                 * Paper.renderfix
                 [ method ]
                 **
                 * Fixes the issue of Firefox and IE9 regarding subpixel rendering. If paper is dependent
                 * on other elements after reflow it could shift half pixel which cause for lines to lost their crispness.
                 * This method fixes the issue.
                 **
                   Special thanks to Mariusz Nowak (http://www.medikoo.com/) for this method.
                \*/
                R.prototype.renderfix = function () {
                    var cnvs = this.canvas,
                        s = cnvs.style,
                        pos;
                    try {
                        pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
                    } catch (e) {
                        pos = cnvs.createSVGMatrix();
                    }
                    var left = -pos.e % 1,
                        top = -pos.f % 1;
                    if (left || top) {
                        if (left) {
                            this._left = (this._left + left) % 1;
                            s.left = this._left + "px";
                        }
                        if (top) {
                            this._top = (this._top + top) % 1;
                            s.top = this._top + "px";
                        }
                    }
                };
                /*\
                 * Paper.clear
                 [ method ]
                 **
                 * Clears the paper, i.e. removes all the elements.
                \*/
                R.prototype.clear = function () {
                    R.eve("raphael.clear", this);
                    var c = this.canvas;
                    while (c.firstChild) {
                        c.removeChild(c.firstChild);
                    }
                    this.bottom = this.top = null;
                    (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
                    c.appendChild(this.desc);
                    c.appendChild(this.defs = $("defs"));
                };
                /*\
                 * Paper.remove
                 [ method ]
                 **
                 * Removes the paper from the DOM.
                \*/
                R.prototype.remove = function () {
                    eve("raphael.remove", this);
                    this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                    for (var i in this) {
                        this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
                    }
                };
                var setproto = R.st;
                for (var method in elproto) {
                    if (elproto[has](method) && !setproto[has](method)) {
                        setproto[method] = function (methodname) {
                            return function () {
                                var arg = arguments;
                                return this.forEach(function (el) {
                                    el[methodname].apply(el, arg);
                                });
                            };
                        }(method);
                    }
                }
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

            /***/
        }
        /******/])
    );
});
;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

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

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Raphael.el.tooltip = function (obj, w, h) {
    if (w === undefined) w = 80;
    if (h === undefined) h = 20;
    var _tt = this.paper.set();
    var pos = this.getBBox();

    if (obj.type === 'text') {
        //text tooltip
        _tt.push(this.paper.rect(pos.x, pos.y + h * -1 - 10, w, h, 5).attr({ "fill": "#fff" }));
        _tt.push(this.paper.text(pos.x + 5, pos.y - 20, "").attr({ "text-anchor": "start", "stroke": "#fff", "font-size": 13, "fill": "#fff" }));
    } else {
        //image tooltip
        var xpad = w * -1 - 5;
        _tt.push(this.paper.rect(pos.x + xpad, pos.y + h / 2 * -1, w, h, 15).attr({ "stroke-width": 2, "stroke": "#fff", "z-index": 9999 }));
        _tt.push(this.paper.rect(pos.x + xpad, pos.y + (h / 2 - 45), w, 47, 15)).attr({ "stroke-width": 2, fill: "90-#333-#000", "z-index": 9999 });
        _tt.push(this.paper.text(pos.x + xpad + w / 2, pos.y + (h / 2 - 20), "").attr({ "text-anchor": "middle", "stroke": "#fff", "font-weight": "normal", "font-family": "Verdana", "font-size": 11, "z-index": 999 }));
    }

    var s = this;
    if (!s.removed) {
        s.tt = _tt;
        if (obj.type === "text") {
            s.tt[0].animate({ "stroke": "#000", "fill": "#333" }, 200, function () {
                s.tt[1].attr({ text: obj.msg });
            });
        } else {
            s.tt[0].animate({ "stroke": "#000", "fill": "#333" }, 200, function () {
                //s.tt[1].attr({  });
                s.tt[2].attr({ text: obj.msg });
            });
        }
    }

    return s.tt;
};

Raphael.el.untooltip = function () {
    this.tt && this.tt.remove();
    return this;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Raphael.el.button = function () {
    return this.attr({ "fill": "90-#000-#eee" });
};

Raphael.el.redbutton = function () {
    return this.attr({ "fill": "90-#990000-#eee" });
};

Raphael.el.buttonText = function () {
    return this.standard().attr({ "fill": "#fff" });
};

Raphael.el.activeColor = "#fffc51";

Raphael.el.active = function (anim, cb) {
    var pkg = { "stroke-width": 2, "stroke": this.activeColor };
    if (anim) {
        if (cb === undefined) return this.animate(pkg, 200);else return this.animate(pkg, 100, cb);
    } else {
        return this.attr(pkg);
    }
};

Raphael.el.isDisabled = function () {
    if (this.type === "text") {
        return this.attr("fill") === "#eee";
    } else {
        return this.attr("fill") === "#ccc";
    }
};

Raphael.el.disabled = function (anim, cb) {
    var pkg = { "fill": "#ccc", "stroke": "eee" };
    var tpkg = { "fill": "#eee" };
    if (this.type === "text") {
        return this.attr(tpkg);
    } else {
        return this.attr(pkg);
    }
};

Raphael.el.enabled = function (anim, cb) {
    if (this.type === "text") {
        return this.buttonText();
    } else {
        return this.button();
    }
};

Raphael.el.inactive = function (anim, cb) {
    var pkg = { "stroke-width": 1, "stroke": "#000" };
    if (anim) {
        if (cb === undefined) return this.animate(pkg, 200);else return this.animate(pkg, 100, cb);
    } else {
        return this.attr(pkg);
    }
};

Raphael.el.standard = function () {
    return this.attr({ "font-family": "Trebuchet MS", "font-size": "13pt" });
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s) {
    Raphael.el.loop = function (_options) {
        var options = {
            pkg: [{ "stroke-width": 3 }, { "stroke-width": 1 }],
            duration: 200,
            repeat: false
        };
        _underscore2.default.extend(options, _options);

        var _self = this;
        function loop() {
            _self.animate(options.pkg[0], options.duration, function () {
                _self.animate(options.pkg[1], options.duration, function () {
                    if (options.repeat) {
                        loop();
                    }
                });
            });
        };

        loop();

        return this;
    };
})(Slatebox);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s) {
    Raphael.st.button = function (_options) {
        var options = {
            mousedown: null,
            mouseover: null,
            node: {}
        };
        _underscore2.default.extend(options, _options);

        var _self = this,
            _glows = [];

        _self.emd = function (e) {
            _underscore2.default.invoke(_glows, 'remove');
            options.mousedown.apply(this, [e, options.node]);
        };
        _self.emo = function (e) {
            options.mouseover.apply(this, [e, options.node]);
        };

        _self.forEach(function (el) {
            el.node.style.cursor = 'pointer';
            if (options.mousedown !== null) {
                el.mousedown(_self.emd);
            }

            if (options.mouseover !== null) {
                el.mouseover(_self.emo);
            }
        });

        _self.gl = function (e) {
            _glows.push(this.glow());
        };
        _self.eg = function (e) {
            _underscore2.default.invoke(_glows, 'remove');
        };
        _self.kg = function (t) {
            _underscore2.default.invoke(_glows, 'remove');
            _glows.push(t.glow());
        };

        var _vect = this[0];
        _self.tmover = function (e) {
            _self.kg(_vect);
        };
        _self.tmout = function (e) {
            _underscore2.default.invoke(_glows, 'remove');
        };

        _self[0].mouseover(_self.gl);
        _self[0].mouseout(_self.eg);

        _self[1].mouseover(_self.tmover);
        _self[1].mouseout(_self.tmout);

        return _self;
    };
})(Slatebox);

(function ($s) {
    Raphael.st.unbutton = function () {
        var _self = this;

        _self.forEach(function (el) {
            el.unmousedown(_self.emd);
            el.unmouseover(_self.emo);
        });

        _self[0].unmouseover(_self.gl);
        _self[0].unmouseout(_self.eg);

        _self[1].unmouseover(_self.tmover);
        _self[1].unmouseout(_self.tmout);

        return _self;
    };
})(Slatebox);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// emile.js (c) 2009 Thomas Fuchs
// Licensed under the terms of the MIT license.

(function (emile, container) {
    var parseEl = document.createElement('div'),
        props = ('backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth ' + 'borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize ' + 'fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight ' + 'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft ' + 'paddingRight paddingTop right textIndent top width wordSpacing zIndex').split(' ');

    function interpolate(source, target, pos) {
        return parseFloat(source + (target - source) * pos).toFixed(3);
    }
    function s(str, p, c) {
        return str.substr(p, c || 1);
    }
    function color(source, target, pos) {
        var i = 2,
            j,
            c,
            tmp,
            v = [],
            r = [];
        while (j = 3, c = arguments[i - 1], i--) {
            if (s(c, 0) == 'r') {
                c = c.match(/\d+/g);while (j--) {
                    v.push(~~c[j]);
                }
            } else {
                if (c.length == 4) c = '#' + s(c, 1) + s(c, 1) + s(c, 2) + s(c, 2) + s(c, 3) + s(c, 3);
                while (j--) {
                    v.push(parseInt(s(c, 1 + j * 2, 2), 16));
                }
            }
        }while (j--) {
            tmp = ~~(v[j + 3] + (v[j] - v[j + 3]) * pos);r.push(tmp < 0 ? 0 : tmp > 255 ? 255 : tmp);
        }
        return 'rgb(' + r.join(',') + ')';
    }

    function parse(prop) {
        var p = parseFloat(prop),
            q = prop.replace(/^[\-\d\.]+/, '');
        return isNaN(p) ? { v: q, f: color, u: '' } : { v: p, f: interpolate, u: q };
    }

    function normalize(style) {
        var css,
            rules = {},
            i = props.length,
            v;
        parseEl.innerHTML = '<div style="' + style + '"></div>';
        css = parseEl.childNodes[0].style;
        while (i--) {
            if (v = css[props[i]]) rules[props[i]] = parse(v);
        }return rules;
    }

    container[emile] = function (el, style, opts) {
        el = typeof el == 'string' ? document.getElementById(el) : el;
        opts = opts || {};
        var target = normalize(style),
            comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
            prop,
            current = {},
            start = +new Date(),
            dur = opts.duration || 200,
            finish = start + dur,
            interval,
            easing = opts.easing || function (pos) {
            return -Math.cos(pos * Math.PI) / 2 + 0.5;
        };
        for (prop in target) {
            current[prop] = parse(comp[prop]);
        }interval = setInterval(function () {
            var time = +new Date(),
                pos = time > finish ? 1 : (time - start) / dur;
            for (prop in target) {
                var tv = opts.onMove ? opts.onMove(prop) : target[prop].f(current[prop].v, target[prop].v, easing(pos));
                el.style[prop] = tv + target[prop].u;
            }
            if (time > finish) {
                clearInterval(interval);
                opts.after && opts.after();
            } else {
                opts.during && opts.during.apply(this, [(time - start) / dur]);
            }
        }, 10);
    };
})('emile', window);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _underscore = __webpack_require__(0);

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function ($s, $e) {
    var n = function n() {
        var _self = this;

        if (!(_self instanceof Notify)) return new Notify();

        var uid = $s.guid();
        var options = {
            msg: '',
            hgt: 50,
            duration: 300,
            className: 'warningBar',
            delayClose: 0,
            hideClose: false,
            onOpen: null,
            msgBar: "messageBar" + uid,
            popFromBottom: false
        };

        _self.message = function (_options) {
            _underscore2.default.extend(options, _options);

            //hide other bars if visible
            _underscore2.default.each($s.select("div.notify"), function (elem) {
                elem.style.visibility = 'hidden';
            });

            if ($s.el(options.msgBar) && $s.el(options.msgBar).style.visibility === "visible") {
                var _height = $s.getDimensions($s.el(options.msgBar)).height;
                $e($s.el(options.msgBar), "top:" + _height * -1 + "px", {
                    duration: options.duration,
                    after: function after() {
                        if ($s.el(options.msgBar) !== null) {
                            document.body.removeChild($s.el(options.msgBar));
                        }
                        buildBar();
                    }
                });
            } else {
                buildBar();
            }

            function buildBar() {
                var _inside = "<div style='text-align:left;padding:10px;float:left;width:96%;' id='notifyBarMessage_" + uid + "'>" + options.msg + "</div><div style='float:right;margin-top:6px;padding-right:2px;width:4%;'><a href='javascript:' class='lnkCloseMessage' id='lnkCloseMessage_" + uid + "'>X</a></div>";
                var _notify = document.createElement("div");
                _notify.setAttribute("class", options.className + " notify");
                _notify.setAttribute("rel", options.popFromBottom); //for resizing window
                _notify.style.height = options.hgt + "px";

                var _cssToAnimate = "top:0px";
                if (options.popFromBottom) {
                    var ws = $s.windowSize();
                    _notify.style.top = ws.height + options.hgt + "px";
                    _cssToAnimate = "top:" + (ws.height - options.hgt) + "px";
                } else {
                    _notify.style.top = options.hgt * -1 + "px";
                }

                //_notify.style.display = "none";
                _notify.setAttribute("id", options.msgBar);
                _notify.innerHTML = _inside;
                document.body.appendChild(_notify);

                $e($s.el(options.msgBar), _cssToAnimate, {
                    duration: options.duration,
                    after: function after() {
                        if (!options.hideClose) {
                            $s.el('lnkCloseMessage_' + uid).onclick = function (e) {
                                e.preventDefault();
                                _self.closeMessage();
                            };
                        } else {
                            $s.el("lnkCloseMessage_" + uid).style.display = "none";
                        }

                        if (options.delayClose && options.delayClose > 0) {
                            setTimeout(function () {
                                _self.closeMessage();
                            }, options.delayClose);
                        }

                        if (_underscore2.default.isFunction(options.onOpen)) {
                            options.onOpen.apply(this, [$s.el("notifyBarMessage_" + uid), _self]);
                        }
                    }
                });
            };
            return _self;
        };

        _self.changeMessage = function (msg) {
            $s.el("notifyBarMessage_" + uid).innerHTML = msg;
            return _self;
        };

        _self.visible = function () {
            return $s.el(options.msgBar) !== null;
        };

        _self.resize = function (h, d, cb) {
            if ($s.el(options.msgBar) !== null) {

                var _cssToAnimate = "top:" + h * -1 + "px";
                if (options.popFromBottom) _cssToAnimate = "top:" + ($s.windowSize().height - h) + "px";

                $e($s.el(options.msgBar), _cssToAnimate, {
                    duration: d,
                    after: function after() {
                        if (_underscore2.default.isFunction(cb)) {
                            cb.apply(this);
                        }
                    }
                });
            } else {
                if (_underscore2.default.isFunction(cb)) {
                    cb.apply(this);
                }
            }
        };

        _self.closeMessage = function (cb) {
            if ($s.el(options.msgBar) !== null) {

                var _cssToAnimate = "top:" + options.hgt * -1 + "px";
                if (options.popFromBottom) _cssToAnimate = "top:" + ($s.windowSize().height + options.hgt) + "px";

                $e($s.el(options.msgBar), _cssToAnimate, {
                    duration: options.duration,
                    after: function after() {
                        document.body.removeChild($s.el(options.msgBar));

                        //show other bars if hidden
                        _underscore2.default.each($s.select("div.notify"), function (elem) {
                            elem.style.visibility = 'visible';
                        });

                        if (_underscore2.default.isFunction(options.onClose)) {
                            options.onClose.apply(this);
                        }
                        if (_underscore2.default.isFunction(cb)) {
                            cb.apply(this);
                        }
                    }
                });
            } else {
                if (_underscore2.default.isFunction(cb)) {
                    cb.apply(this);
                }
            }
        };
    };
    $s.addEvent(window, "resize", function () {
        _underscore2.default.each($s.select("div.notify"), function (elem) {
            if (elem.getAttribute("rel") === "true") {
                var ws = $s.windowSize();
                var d = $s.getDimensions(elem);
                elem.style.top = ws.height - d.height + "px";
            }
        });
    });
    window.Notify = n;
})(Slatebox, emile); // Notify.js 0.5.0
// (c) 2012 Tim Heckel
// Notify.js may be freely distributed under the MIT license.

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.spinner = function () {
    var _sp = function spinner(holderid, R1, R2, count, stroke_width, colour) {
        var sectorsCount = count || 12,
            color = colour || "#fff",
            width = stroke_width || 15,
            r1 = Math.min(R1, R2) || 35,
            r2 = Math.max(R1, R2) || 60,
            cx = r2 + width,
            cy = r2 + width,
            r = Raphael(holderid, r2 * 2 + width * 2, r2 * 2 + width * 2),
            sectors = [],
            opacity = [],
            beta = 2 * Math.PI / sectorsCount,
            pathParams = { stroke: color, "stroke-width": width, "stroke-linecap": "round" };

        Raphael.getColor.reset();
        for (var i = 0; i < sectorsCount; i++) {
            var alpha = beta * i - Math.PI / 2,
                cos = Math.cos(alpha),
                sin = Math.sin(alpha);
            opacity[i] = 1 / sectorsCount * i;
            sectors[i] = r.path([["M", cx + r1 * cos, cy + r1 * sin], ["L", cx + r2 * cos, cy + r2 * sin]]).attr(pathParams);
            if (color == "rainbow") {
                sectors[i].attr("stroke", Raphael.getColor());
            }
        }
        var tick;
        (function ticker() {
            opacity.unshift(opacity.pop());
            for (var i = 0; i < sectorsCount; i++) {
                sectors[i].attr("opacity", opacity[i]);
            }
            r.safari();
            tick = setTimeout(ticker, 1000 / sectorsCount);
        })();
        return function () {
            clearTimeout(tick);
            r.clear();
        };
    };
    return _sp;
}();

/***/ })
/******/ ]);