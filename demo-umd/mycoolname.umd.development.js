(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'three', 'react'], factory) :
  (global = global || self, factory(global.TsdxThreejsTemplate = {}, global.THREE, global.React));
}(this, (function (exports, THREE, React) { 'use strict';

  React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;

    _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, "Generator");

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;

  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
     module.exports 
  ));

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  });

  // This set of controls performs orbiting, dollying (zooming), and panning.
  // Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
  //
  //    Orbit - left mouse / touch: one-finger move
  //    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
  //    Pan - right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move

  const _changeEvent = { type: 'change' };
  const _startEvent = { type: 'start' };
  const _endEvent = { type: 'end' };

  class OrbitControls extends THREE.EventDispatcher {

  	constructor( object, domElement ) {

  		super();

  		if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
  		if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );

  		this.object = object;
  		this.domElement = domElement;

  		// Set to false to disable this control
  		this.enabled = true;

  		// "target" sets the location of focus, where the object orbits around
  		this.target = new THREE.Vector3();

  		// How far you can dolly in and out ( PerspectiveCamera only )
  		this.minDistance = 0;
  		this.maxDistance = Infinity;

  		// How far you can zoom in and out ( OrthographicCamera only )
  		this.minZoom = 0;
  		this.maxZoom = Infinity;

  		// How far you can orbit vertically, upper and lower limits.
  		// Range is 0 to Math.PI radians.
  		this.minPolarAngle = 0; // radians
  		this.maxPolarAngle = Math.PI; // radians

  		// How far you can orbit horizontally, upper and lower limits.
  		// If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
  		this.minAzimuthAngle = - Infinity; // radians
  		this.maxAzimuthAngle = Infinity; // radians

  		// Set to true to enable damping (inertia)
  		// If damping is enabled, you must call controls.update() in your animation loop
  		this.enableDamping = false;
  		this.dampingFactor = 0.05;

  		// This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  		// Set to false to disable zooming
  		this.enableZoom = true;
  		this.zoomSpeed = 1.0;

  		// Set to false to disable rotating
  		this.enableRotate = true;
  		this.rotateSpeed = 1.0;

  		// Set to false to disable panning
  		this.enablePan = true;
  		this.panSpeed = 1.0;
  		this.screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
  		this.keyPanSpeed = 7.0;	// pixels moved per arrow key push

  		// Set to true to automatically rotate around the target
  		// If auto-rotate is enabled, you must call controls.update() in your animation loop
  		this.autoRotate = false;
  		this.autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60

  		// The four arrow keys
  		this.keys = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' };

  		// Mouse buttons
  		this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };

  		// Touch fingers
  		this.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  		// for reset
  		this.target0 = this.target.clone();
  		this.position0 = this.object.position.clone();
  		this.zoom0 = this.object.zoom;

  		// the target DOM element for key events
  		this._domElementKeyEvents = null;

  		//
  		// public methods
  		//

  		this.getPolarAngle = function () {

  			return spherical.phi;

  		};

  		this.getAzimuthalAngle = function () {

  			return spherical.theta;

  		};

  		this.listenToKeyEvents = function ( domElement ) {

  			domElement.addEventListener( 'keydown', onKeyDown );
  			this._domElementKeyEvents = domElement;

  		};

  		this.saveState = function () {

  			scope.target0.copy( scope.target );
  			scope.position0.copy( scope.object.position );
  			scope.zoom0 = scope.object.zoom;

  		};

  		this.reset = function () {

  			scope.target.copy( scope.target0 );
  			scope.object.position.copy( scope.position0 );
  			scope.object.zoom = scope.zoom0;

  			scope.object.updateProjectionMatrix();
  			scope.dispatchEvent( _changeEvent );

  			scope.update();

  			state = STATE.NONE;

  		};

  		// this method is exposed, but perhaps it would be better if we can make it private...
  		this.update = function () {

  			const offset = new THREE.Vector3();

  			// so camera.up is the orbit axis
  			const quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
  			const quatInverse = quat.clone().invert();

  			const lastPosition = new THREE.Vector3();
  			const lastQuaternion = new THREE.Quaternion();

  			const twoPI = 2 * Math.PI;

  			return function update() {

  				const position = scope.object.position;

  				offset.copy( position ).sub( scope.target );

  				// rotate offset to "y-axis-is-up" space
  				offset.applyQuaternion( quat );

  				// angle from z-axis around y-axis
  				spherical.setFromVector3( offset );

  				if ( scope.autoRotate && state === STATE.NONE ) {

  					rotateLeft( getAutoRotationAngle() );

  				}

  				if ( scope.enableDamping ) {

  					spherical.theta += sphericalDelta.theta * scope.dampingFactor;
  					spherical.phi += sphericalDelta.phi * scope.dampingFactor;

  				} else {

  					spherical.theta += sphericalDelta.theta;
  					spherical.phi += sphericalDelta.phi;

  				}

  				// restrict theta to be between desired limits

  				let min = scope.minAzimuthAngle;
  				let max = scope.maxAzimuthAngle;

  				if ( isFinite( min ) && isFinite( max ) ) {

  					if ( min < - Math.PI ) min += twoPI; else if ( min > Math.PI ) min -= twoPI;

  					if ( max < - Math.PI ) max += twoPI; else if ( max > Math.PI ) max -= twoPI;

  					if ( min <= max ) {

  						spherical.theta = Math.max( min, Math.min( max, spherical.theta ) );

  					} else {

  						spherical.theta = ( spherical.theta > ( min + max ) / 2 ) ?
  							Math.max( min, spherical.theta ) :
  							Math.min( max, spherical.theta );

  					}

  				}

  				// restrict phi to be between desired limits
  				spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

  				spherical.makeSafe();


  				spherical.radius *= scale;

  				// restrict radius to be between desired limits
  				spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

  				// move target to panned location

  				if ( scope.enableDamping === true ) {

  					scope.target.addScaledVector( panOffset, scope.dampingFactor );

  				} else {

  					scope.target.add( panOffset );

  				}

  				offset.setFromSpherical( spherical );

  				// rotate offset back to "camera-up-vector-is-up" space
  				offset.applyQuaternion( quatInverse );

  				position.copy( scope.target ).add( offset );

  				scope.object.lookAt( scope.target );

  				if ( scope.enableDamping === true ) {

  					sphericalDelta.theta *= ( 1 - scope.dampingFactor );
  					sphericalDelta.phi *= ( 1 - scope.dampingFactor );

  					panOffset.multiplyScalar( 1 - scope.dampingFactor );

  				} else {

  					sphericalDelta.set( 0, 0, 0 );

  					panOffset.set( 0, 0, 0 );

  				}

  				scale = 1;

  				// update condition is:
  				// min(camera displacement, camera rotation in radians)^2 > EPS
  				// using small-angle approximation cos(x/2) = 1 - x^2 / 8

  				if ( zoomChanged ||
  					lastPosition.distanceToSquared( scope.object.position ) > EPS ||
  					8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

  					scope.dispatchEvent( _changeEvent );

  					lastPosition.copy( scope.object.position );
  					lastQuaternion.copy( scope.object.quaternion );
  					zoomChanged = false;

  					return true;

  				}

  				return false;

  			};

  		}();

  		this.dispose = function () {

  			scope.domElement.removeEventListener( 'contextmenu', onContextMenu );

  			scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
  			scope.domElement.removeEventListener( 'wheel', onMouseWheel );

  			scope.domElement.removeEventListener( 'touchstart', onTouchStart );
  			scope.domElement.removeEventListener( 'touchend', onTouchEnd );
  			scope.domElement.removeEventListener( 'touchmove', onTouchMove );

  			scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
  			scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );


  			if ( scope._domElementKeyEvents !== null ) {

  				scope._domElementKeyEvents.removeEventListener( 'keydown', onKeyDown );

  			}

  			//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

  		};

  		//
  		// internals
  		//

  		const scope = this;

  		const STATE = {
  			NONE: - 1,
  			ROTATE: 0,
  			DOLLY: 1,
  			PAN: 2,
  			TOUCH_ROTATE: 3,
  			TOUCH_PAN: 4,
  			TOUCH_DOLLY_PAN: 5,
  			TOUCH_DOLLY_ROTATE: 6
  		};

  		let state = STATE.NONE;

  		const EPS = 0.000001;

  		// current position in spherical coordinates
  		const spherical = new THREE.Spherical();
  		const sphericalDelta = new THREE.Spherical();

  		let scale = 1;
  		const panOffset = new THREE.Vector3();
  		let zoomChanged = false;

  		const rotateStart = new THREE.Vector2();
  		const rotateEnd = new THREE.Vector2();
  		const rotateDelta = new THREE.Vector2();

  		const panStart = new THREE.Vector2();
  		const panEnd = new THREE.Vector2();
  		const panDelta = new THREE.Vector2();

  		const dollyStart = new THREE.Vector2();
  		const dollyEnd = new THREE.Vector2();
  		const dollyDelta = new THREE.Vector2();

  		function getAutoRotationAngle() {

  			return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

  		}

  		function getZoomScale() {

  			return Math.pow( 0.95, scope.zoomSpeed );

  		}

  		function rotateLeft( angle ) {

  			sphericalDelta.theta -= angle;

  		}

  		function rotateUp( angle ) {

  			sphericalDelta.phi -= angle;

  		}

  		const panLeft = function () {

  			const v = new THREE.Vector3();

  			return function panLeft( distance, objectMatrix ) {

  				v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
  				v.multiplyScalar( - distance );

  				panOffset.add( v );

  			};

  		}();

  		const panUp = function () {

  			const v = new THREE.Vector3();

  			return function panUp( distance, objectMatrix ) {

  				if ( scope.screenSpacePanning === true ) {

  					v.setFromMatrixColumn( objectMatrix, 1 );

  				} else {

  					v.setFromMatrixColumn( objectMatrix, 0 );
  					v.crossVectors( scope.object.up, v );

  				}

  				v.multiplyScalar( distance );

  				panOffset.add( v );

  			};

  		}();

  		// deltaX and deltaY are in pixels; right and down are positive
  		const pan = function () {

  			const offset = new THREE.Vector3();

  			return function pan( deltaX, deltaY ) {

  				const element = scope.domElement;

  				if ( scope.object.isPerspectiveCamera ) {

  					// perspective
  					const position = scope.object.position;
  					offset.copy( position ).sub( scope.target );
  					let targetDistance = offset.length();

  					// half of the fov is center to top of screen
  					targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

  					// we use only clientHeight here so aspect ratio does not distort speed
  					panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
  					panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

  				} else if ( scope.object.isOrthographicCamera ) {

  					// orthographic
  					panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
  					panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

  				} else {

  					// camera neither orthographic nor perspective
  					console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
  					scope.enablePan = false;

  				}

  			};

  		}();

  		function dollyOut( dollyScale ) {

  			if ( scope.object.isPerspectiveCamera ) {

  				scale /= dollyScale;

  			} else if ( scope.object.isOrthographicCamera ) {

  				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
  				scope.object.updateProjectionMatrix();
  				zoomChanged = true;

  			} else {

  				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
  				scope.enableZoom = false;

  			}

  		}

  		function dollyIn( dollyScale ) {

  			if ( scope.object.isPerspectiveCamera ) {

  				scale *= dollyScale;

  			} else if ( scope.object.isOrthographicCamera ) {

  				scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
  				scope.object.updateProjectionMatrix();
  				zoomChanged = true;

  			} else {

  				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
  				scope.enableZoom = false;

  			}

  		}

  		//
  		// event callbacks - update the object state
  		//

  		function handleMouseDownRotate( event ) {

  			rotateStart.set( event.clientX, event.clientY );

  		}

  		function handleMouseDownDolly( event ) {

  			dollyStart.set( event.clientX, event.clientY );

  		}

  		function handleMouseDownPan( event ) {

  			panStart.set( event.clientX, event.clientY );

  		}

  		function handleMouseMoveRotate( event ) {

  			rotateEnd.set( event.clientX, event.clientY );

  			rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

  			const element = scope.domElement;

  			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

  			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

  			rotateStart.copy( rotateEnd );

  			scope.update();

  		}

  		function handleMouseMoveDolly( event ) {

  			dollyEnd.set( event.clientX, event.clientY );

  			dollyDelta.subVectors( dollyEnd, dollyStart );

  			if ( dollyDelta.y > 0 ) {

  				dollyOut( getZoomScale() );

  			} else if ( dollyDelta.y < 0 ) {

  				dollyIn( getZoomScale() );

  			}

  			dollyStart.copy( dollyEnd );

  			scope.update();

  		}

  		function handleMouseMovePan( event ) {

  			panEnd.set( event.clientX, event.clientY );

  			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

  			pan( panDelta.x, panDelta.y );

  			panStart.copy( panEnd );

  			scope.update();

  		}

  		function handleMouseWheel( event ) {

  			if ( event.deltaY < 0 ) {

  				dollyIn( getZoomScale() );

  			} else if ( event.deltaY > 0 ) {

  				dollyOut( getZoomScale() );

  			}

  			scope.update();

  		}

  		function handleKeyDown( event ) {

  			let needsUpdate = false;

  			switch ( event.code ) {

  				case scope.keys.UP:
  					pan( 0, scope.keyPanSpeed );
  					needsUpdate = true;
  					break;

  				case scope.keys.BOTTOM:
  					pan( 0, - scope.keyPanSpeed );
  					needsUpdate = true;
  					break;

  				case scope.keys.LEFT:
  					pan( scope.keyPanSpeed, 0 );
  					needsUpdate = true;
  					break;

  				case scope.keys.RIGHT:
  					pan( - scope.keyPanSpeed, 0 );
  					needsUpdate = true;
  					break;

  			}

  			if ( needsUpdate ) {

  				// prevent the browser from scrolling on cursor keys
  				event.preventDefault();

  				scope.update();

  			}


  		}

  		function handleTouchStartRotate( event ) {

  			if ( event.touches.length == 1 ) {

  				rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

  			} else {

  				const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
  				const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

  				rotateStart.set( x, y );

  			}

  		}

  		function handleTouchStartPan( event ) {

  			if ( event.touches.length == 1 ) {

  				panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

  			} else {

  				const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
  				const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

  				panStart.set( x, y );

  			}

  		}

  		function handleTouchStartDolly( event ) {

  			const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
  			const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

  			const distance = Math.sqrt( dx * dx + dy * dy );

  			dollyStart.set( 0, distance );

  		}

  		function handleTouchStartDollyPan( event ) {

  			if ( scope.enableZoom ) handleTouchStartDolly( event );

  			if ( scope.enablePan ) handleTouchStartPan( event );

  		}

  		function handleTouchStartDollyRotate( event ) {

  			if ( scope.enableZoom ) handleTouchStartDolly( event );

  			if ( scope.enableRotate ) handleTouchStartRotate( event );

  		}

  		function handleTouchMoveRotate( event ) {

  			if ( event.touches.length == 1 ) {

  				rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

  			} else {

  				const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
  				const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

  				rotateEnd.set( x, y );

  			}

  			rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

  			const element = scope.domElement;

  			rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

  			rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

  			rotateStart.copy( rotateEnd );

  		}

  		function handleTouchMovePan( event ) {

  			if ( event.touches.length == 1 ) {

  				panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

  			} else {

  				const x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
  				const y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

  				panEnd.set( x, y );

  			}

  			panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

  			pan( panDelta.x, panDelta.y );

  			panStart.copy( panEnd );

  		}

  		function handleTouchMoveDolly( event ) {

  			const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
  			const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

  			const distance = Math.sqrt( dx * dx + dy * dy );

  			dollyEnd.set( 0, distance );

  			dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

  			dollyOut( dollyDelta.y );

  			dollyStart.copy( dollyEnd );

  		}

  		function handleTouchMoveDollyPan( event ) {

  			if ( scope.enableZoom ) handleTouchMoveDolly( event );

  			if ( scope.enablePan ) handleTouchMovePan( event );

  		}

  		function handleTouchMoveDollyRotate( event ) {

  			if ( scope.enableZoom ) handleTouchMoveDolly( event );

  			if ( scope.enableRotate ) handleTouchMoveRotate( event );

  		}

  		//
  		// event handlers - FSM: listen for events and reset state
  		//

  		function onPointerDown( event ) {

  			if ( scope.enabled === false ) return;

  			switch ( event.pointerType ) {

  				case 'mouse':
  				case 'pen':
  					onMouseDown( event );
  					break;

  				// TODO touch

  			}

  		}

  		function onPointerMove( event ) {

  			if ( scope.enabled === false ) return;

  			switch ( event.pointerType ) {

  				case 'mouse':
  				case 'pen':
  					onMouseMove( event );
  					break;

  				// TODO touch

  			}

  		}

  		function onPointerUp( event ) {

  			switch ( event.pointerType ) {

  				case 'mouse':
  				case 'pen':
  					onMouseUp();
  					break;

  				// TODO touch

  			}

  		}

  		function onMouseDown( event ) {

  			// Prevent the browser from scrolling.
  			event.preventDefault();

  			// Manually set the focus since calling preventDefault above
  			// prevents the browser from setting it automatically.

  			scope.domElement.focus ? scope.domElement.focus() : window.focus();

  			let mouseAction;

  			switch ( event.button ) {

  				case 0:

  					mouseAction = scope.mouseButtons.LEFT;
  					break;

  				case 1:

  					mouseAction = scope.mouseButtons.MIDDLE;
  					break;

  				case 2:

  					mouseAction = scope.mouseButtons.RIGHT;
  					break;

  				default:

  					mouseAction = - 1;

  			}

  			switch ( mouseAction ) {

  				case THREE.MOUSE.DOLLY:

  					if ( scope.enableZoom === false ) return;

  					handleMouseDownDolly( event );

  					state = STATE.DOLLY;

  					break;

  				case THREE.MOUSE.ROTATE:

  					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

  						if ( scope.enablePan === false ) return;

  						handleMouseDownPan( event );

  						state = STATE.PAN;

  					} else {

  						if ( scope.enableRotate === false ) return;

  						handleMouseDownRotate( event );

  						state = STATE.ROTATE;

  					}

  					break;

  				case THREE.MOUSE.PAN:

  					if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

  						if ( scope.enableRotate === false ) return;

  						handleMouseDownRotate( event );

  						state = STATE.ROTATE;

  					} else {

  						if ( scope.enablePan === false ) return;

  						handleMouseDownPan( event );

  						state = STATE.PAN;

  					}

  					break;

  				default:

  					state = STATE.NONE;

  			}

  			if ( state !== STATE.NONE ) {

  				scope.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove );
  				scope.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp );

  				scope.dispatchEvent( _startEvent );

  			}

  		}

  		function onMouseMove( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  			switch ( state ) {

  				case STATE.ROTATE:

  					if ( scope.enableRotate === false ) return;

  					handleMouseMoveRotate( event );

  					break;

  				case STATE.DOLLY:

  					if ( scope.enableZoom === false ) return;

  					handleMouseMoveDolly( event );

  					break;

  				case STATE.PAN:

  					if ( scope.enablePan === false ) return;

  					handleMouseMovePan( event );

  					break;

  			}

  		}

  		function onMouseUp( event ) {

  			scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
  			scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

  			if ( scope.enabled === false ) return;

  			scope.dispatchEvent( _endEvent );

  			state = STATE.NONE;

  		}

  		function onMouseWheel( event ) {

  			if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

  			event.preventDefault();

  			scope.dispatchEvent( _startEvent );

  			handleMouseWheel( event );

  			scope.dispatchEvent( _endEvent );

  		}

  		function onKeyDown( event ) {

  			if ( scope.enabled === false || scope.enablePan === false ) return;

  			handleKeyDown( event );

  		}

  		function onTouchStart( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault(); // prevent scrolling

  			switch ( event.touches.length ) {

  				case 1:

  					switch ( scope.touches.ONE ) {

  						case THREE.TOUCH.ROTATE:

  							if ( scope.enableRotate === false ) return;

  							handleTouchStartRotate( event );

  							state = STATE.TOUCH_ROTATE;

  							break;

  						case THREE.TOUCH.PAN:

  							if ( scope.enablePan === false ) return;

  							handleTouchStartPan( event );

  							state = STATE.TOUCH_PAN;

  							break;

  						default:

  							state = STATE.NONE;

  					}

  					break;

  				case 2:

  					switch ( scope.touches.TWO ) {

  						case THREE.TOUCH.DOLLY_PAN:

  							if ( scope.enableZoom === false && scope.enablePan === false ) return;

  							handleTouchStartDollyPan( event );

  							state = STATE.TOUCH_DOLLY_PAN;

  							break;

  						case THREE.TOUCH.DOLLY_ROTATE:

  							if ( scope.enableZoom === false && scope.enableRotate === false ) return;

  							handleTouchStartDollyRotate( event );

  							state = STATE.TOUCH_DOLLY_ROTATE;

  							break;

  						default:

  							state = STATE.NONE;

  					}

  					break;

  				default:

  					state = STATE.NONE;

  			}

  			if ( state !== STATE.NONE ) {

  				scope.dispatchEvent( _startEvent );

  			}

  		}

  		function onTouchMove( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault(); // prevent scrolling

  			switch ( state ) {

  				case STATE.TOUCH_ROTATE:

  					if ( scope.enableRotate === false ) return;

  					handleTouchMoveRotate( event );

  					scope.update();

  					break;

  				case STATE.TOUCH_PAN:

  					if ( scope.enablePan === false ) return;

  					handleTouchMovePan( event );

  					scope.update();

  					break;

  				case STATE.TOUCH_DOLLY_PAN:

  					if ( scope.enableZoom === false && scope.enablePan === false ) return;

  					handleTouchMoveDollyPan( event );

  					scope.update();

  					break;

  				case STATE.TOUCH_DOLLY_ROTATE:

  					if ( scope.enableZoom === false && scope.enableRotate === false ) return;

  					handleTouchMoveDollyRotate( event );

  					scope.update();

  					break;

  				default:

  					state = STATE.NONE;

  			}

  		}

  		function onTouchEnd( event ) {

  			if ( scope.enabled === false ) return;

  			scope.dispatchEvent( _endEvent );

  			state = STATE.NONE;

  		}

  		function onContextMenu( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  		}

  		//

  		scope.domElement.addEventListener( 'contextmenu', onContextMenu );

  		scope.domElement.addEventListener( 'pointerdown', onPointerDown );
  		scope.domElement.addEventListener( 'wheel', onMouseWheel, { passive: false } );

  		scope.domElement.addEventListener( 'touchstart', onTouchStart, { passive: false } );
  		scope.domElement.addEventListener( 'touchend', onTouchEnd );
  		scope.domElement.addEventListener( 'touchmove', onTouchMove, { passive: false } );

  		// force an update at start

  		this.update();

  	}

  }

  const _changeEvent$1 = { type: 'change' };
  const _startEvent$1 = { type: 'start' };
  const _endEvent$1 = { type: 'end' };

  class TrackballControls extends THREE.EventDispatcher {

  	constructor( object, domElement ) {

  		super();

  		if ( domElement === undefined ) console.warn( 'THREE.TrackballControls: The second parameter "domElement" is now mandatory.' );
  		if ( domElement === document ) console.error( 'THREE.TrackballControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );

  		const scope = this;
  		const STATE = { NONE: - 1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

  		this.object = object;
  		this.domElement = domElement;

  		// API

  		this.enabled = true;

  		this.screen = { left: 0, top: 0, width: 0, height: 0 };

  		this.rotateSpeed = 1.0;
  		this.zoomSpeed = 1.2;
  		this.panSpeed = 0.3;

  		this.noRotate = false;
  		this.noZoom = false;
  		this.noPan = false;

  		this.staticMoving = false;
  		this.dynamicDampingFactor = 0.2;

  		this.minDistance = 0;
  		this.maxDistance = Infinity;

  		this.keys = [ 'KeyA' /*A*/, 'KeyS' /*S*/, 'KeyD' /*D*/ ];

  		this.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };

  		// internals

  		this.target = new THREE.Vector3();

  		const EPS = 0.000001;

  		const lastPosition = new THREE.Vector3();
  		let lastZoom = 1;

  		let _state = STATE.NONE,
  			_keyState = STATE.NONE,

  			_touchZoomDistanceStart = 0,
  			_touchZoomDistanceEnd = 0,

  			_lastAngle = 0;

  		const _eye = new THREE.Vector3(),

  			_movePrev = new THREE.Vector2(),
  			_moveCurr = new THREE.Vector2(),

  			_lastAxis = new THREE.Vector3(),

  			_zoomStart = new THREE.Vector2(),
  			_zoomEnd = new THREE.Vector2(),

  			_panStart = new THREE.Vector2(),
  			_panEnd = new THREE.Vector2();

  		// for reset

  		this.target0 = this.target.clone();
  		this.position0 = this.object.position.clone();
  		this.up0 = this.object.up.clone();
  		this.zoom0 = this.object.zoom;

  		// methods

  		this.handleResize = function () {

  			const box = scope.domElement.getBoundingClientRect();
  			// adjustments come from similar code in the jquery offset() function
  			const d = scope.domElement.ownerDocument.documentElement;
  			scope.screen.left = box.left + window.pageXOffset - d.clientLeft;
  			scope.screen.top = box.top + window.pageYOffset - d.clientTop;
  			scope.screen.width = box.width;
  			scope.screen.height = box.height;

  		};

  		const getMouseOnScreen = ( function () {

  			const vector = new THREE.Vector2();

  			return function getMouseOnScreen( pageX, pageY ) {

  				vector.set(
  					( pageX - scope.screen.left ) / scope.screen.width,
  					( pageY - scope.screen.top ) / scope.screen.height
  				);

  				return vector;

  			};

  		}() );

  		const getMouseOnCircle = ( function () {

  			const vector = new THREE.Vector2();

  			return function getMouseOnCircle( pageX, pageY ) {

  				vector.set(
  					( ( pageX - scope.screen.width * 0.5 - scope.screen.left ) / ( scope.screen.width * 0.5 ) ),
  					( ( scope.screen.height + 2 * ( scope.screen.top - pageY ) ) / scope.screen.width ) // screen.width intentional
  				);

  				return vector;

  			};

  		}() );

  		this.rotateCamera = ( function () {

  			const axis = new THREE.Vector3(),
  				quaternion = new THREE.Quaternion(),
  				eyeDirection = new THREE.Vector3(),
  				objectUpDirection = new THREE.Vector3(),
  				objectSidewaysDirection = new THREE.Vector3(),
  				moveDirection = new THREE.Vector3();

  			return function rotateCamera() {

  				moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
  				let angle = moveDirection.length();

  				if ( angle ) {

  					_eye.copy( scope.object.position ).sub( scope.target );

  					eyeDirection.copy( _eye ).normalize();
  					objectUpDirection.copy( scope.object.up ).normalize();
  					objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

  					objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
  					objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

  					moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

  					axis.crossVectors( moveDirection, _eye ).normalize();

  					angle *= scope.rotateSpeed;
  					quaternion.setFromAxisAngle( axis, angle );

  					_eye.applyQuaternion( quaternion );
  					scope.object.up.applyQuaternion( quaternion );

  					_lastAxis.copy( axis );
  					_lastAngle = angle;

  				} else if ( ! scope.staticMoving && _lastAngle ) {

  					_lastAngle *= Math.sqrt( 1.0 - scope.dynamicDampingFactor );
  					_eye.copy( scope.object.position ).sub( scope.target );
  					quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
  					_eye.applyQuaternion( quaternion );
  					scope.object.up.applyQuaternion( quaternion );

  				}

  				_movePrev.copy( _moveCurr );

  			};

  		}() );


  		this.zoomCamera = function () {

  			let factor;

  			if ( _state === STATE.TOUCH_ZOOM_PAN ) {

  				factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
  				_touchZoomDistanceStart = _touchZoomDistanceEnd;

  				if ( scope.object.isPerspectiveCamera ) {

  					_eye.multiplyScalar( factor );

  				} else if ( scope.object.isOrthographicCamera ) {

  					scope.object.zoom *= factor;
  					scope.object.updateProjectionMatrix();

  				} else {

  					console.warn( 'THREE.TrackballControls: Unsupported camera type' );

  				}

  			} else {

  				factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * scope.zoomSpeed;

  				if ( factor !== 1.0 && factor > 0.0 ) {

  					if ( scope.object.isPerspectiveCamera ) {

  						_eye.multiplyScalar( factor );

  					} else if ( scope.object.isOrthographicCamera ) {

  						scope.object.zoom /= factor;
  						scope.object.updateProjectionMatrix();

  					} else {

  						console.warn( 'THREE.TrackballControls: Unsupported camera type' );

  					}

  				}

  				if ( scope.staticMoving ) {

  					_zoomStart.copy( _zoomEnd );

  				} else {

  					_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

  				}

  			}

  		};

  		this.panCamera = ( function () {

  			const mouseChange = new THREE.Vector2(),
  				objectUp = new THREE.Vector3(),
  				pan = new THREE.Vector3();

  			return function panCamera() {

  				mouseChange.copy( _panEnd ).sub( _panStart );

  				if ( mouseChange.lengthSq() ) {

  					if ( scope.object.isOrthographicCamera ) {

  						const scale_x = ( scope.object.right - scope.object.left ) / scope.object.zoom / scope.domElement.clientWidth;
  						const scale_y = ( scope.object.top - scope.object.bottom ) / scope.object.zoom / scope.domElement.clientWidth;

  						mouseChange.x *= scale_x;
  						mouseChange.y *= scale_y;

  					}

  					mouseChange.multiplyScalar( _eye.length() * scope.panSpeed );

  					pan.copy( _eye ).cross( scope.object.up ).setLength( mouseChange.x );
  					pan.add( objectUp.copy( scope.object.up ).setLength( mouseChange.y ) );

  					scope.object.position.add( pan );
  					scope.target.add( pan );

  					if ( scope.staticMoving ) {

  						_panStart.copy( _panEnd );

  					} else {

  						_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( scope.dynamicDampingFactor ) );

  					}

  				}

  			};

  		}() );

  		this.checkDistances = function () {

  			if ( ! scope.noZoom || ! scope.noPan ) {

  				if ( _eye.lengthSq() > scope.maxDistance * scope.maxDistance ) {

  					scope.object.position.addVectors( scope.target, _eye.setLength( scope.maxDistance ) );
  					_zoomStart.copy( _zoomEnd );

  				}

  				if ( _eye.lengthSq() < scope.minDistance * scope.minDistance ) {

  					scope.object.position.addVectors( scope.target, _eye.setLength( scope.minDistance ) );
  					_zoomStart.copy( _zoomEnd );

  				}

  			}

  		};

  		this.update = function () {

  			_eye.subVectors( scope.object.position, scope.target );

  			if ( ! scope.noRotate ) {

  				scope.rotateCamera();

  			}

  			if ( ! scope.noZoom ) {

  				scope.zoomCamera();

  			}

  			if ( ! scope.noPan ) {

  				scope.panCamera();

  			}

  			scope.object.position.addVectors( scope.target, _eye );

  			if ( scope.object.isPerspectiveCamera ) {

  				scope.checkDistances();

  				scope.object.lookAt( scope.target );

  				if ( lastPosition.distanceToSquared( scope.object.position ) > EPS ) {

  					scope.dispatchEvent( _changeEvent$1 );

  					lastPosition.copy( scope.object.position );

  				}

  			} else if ( scope.object.isOrthographicCamera ) {

  				scope.object.lookAt( scope.target );

  				if ( lastPosition.distanceToSquared( scope.object.position ) > EPS || lastZoom !== scope.object.zoom ) {

  					scope.dispatchEvent( _changeEvent$1 );

  					lastPosition.copy( scope.object.position );
  					lastZoom = scope.object.zoom;

  				}

  			} else {

  				console.warn( 'THREE.TrackballControls: Unsupported camera type' );

  			}

  		};

  		this.reset = function () {

  			_state = STATE.NONE;
  			_keyState = STATE.NONE;

  			scope.target.copy( scope.target0 );
  			scope.object.position.copy( scope.position0 );
  			scope.object.up.copy( scope.up0 );
  			scope.object.zoom = scope.zoom0;

  			scope.object.updateProjectionMatrix();

  			_eye.subVectors( scope.object.position, scope.target );

  			scope.object.lookAt( scope.target );

  			scope.dispatchEvent( _changeEvent$1 );

  			lastPosition.copy( scope.object.position );
  			lastZoom = scope.object.zoom;

  		};

  		// listeners

  		function onPointerDown( event ) {

  			if ( scope.enabled === false ) return;

  			switch ( event.pointerType ) {

  				case 'mouse':
  				case 'pen':
  					onMouseDown( event );
  					break;

  				// TODO touch

  			}

  		}

  		function onPointerMove( event ) {

  			if ( scope.enabled === false ) return;

  			switch ( event.pointerType ) {

  				case 'mouse':
  				case 'pen':
  					onMouseMove( event );
  					break;

  				// TODO touch

  			}

  		}

  		function onPointerUp( event ) {

  			if ( scope.enabled === false ) return;

  			switch ( event.pointerType ) {

  				case 'mouse':
  				case 'pen':
  					onMouseUp( event );
  					break;

  				// TODO touch

  			}

  		}

  		function keydown( event ) {

  			if ( scope.enabled === false ) return;

  			window.removeEventListener( 'keydown', keydown );

  			if ( _keyState !== STATE.NONE ) {

  				return;

  			} else if ( event.code === scope.keys[ STATE.ROTATE ] && ! scope.noRotate ) {

  				_keyState = STATE.ROTATE;

  			} else if ( event.code === scope.keys[ STATE.ZOOM ] && ! scope.noZoom ) {

  				_keyState = STATE.ZOOM;

  			} else if ( event.code === scope.keys[ STATE.PAN ] && ! scope.noPan ) {

  				_keyState = STATE.PAN;

  			}

  		}

  		function keyup() {

  			if ( scope.enabled === false ) return;

  			_keyState = STATE.NONE;

  			window.addEventListener( 'keydown', keydown );

  		}

  		function onMouseDown( event ) {

  			event.preventDefault();

  			if ( _state === STATE.NONE ) {

  				switch ( event.button ) {

  					case scope.mouseButtons.LEFT:
  						_state = STATE.ROTATE;
  						break;

  					case scope.mouseButtons.MIDDLE:
  						_state = STATE.ZOOM;
  						break;

  					case scope.mouseButtons.RIGHT:
  						_state = STATE.PAN;
  						break;

  					default:
  						_state = STATE.NONE;

  				}

  			}

  			const state = ( _keyState !== STATE.NONE ) ? _keyState : _state;

  			if ( state === STATE.ROTATE && ! scope.noRotate ) {

  				_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );
  				_movePrev.copy( _moveCurr );

  			} else if ( state === STATE.ZOOM && ! scope.noZoom ) {

  				_zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
  				_zoomEnd.copy( _zoomStart );

  			} else if ( state === STATE.PAN && ! scope.noPan ) {

  				_panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
  				_panEnd.copy( _panStart );

  			}

  			scope.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove );
  			scope.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp );

  			scope.dispatchEvent( _startEvent$1 );

  		}

  		function onMouseMove( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  			const state = ( _keyState !== STATE.NONE ) ? _keyState : _state;

  			if ( state === STATE.ROTATE && ! scope.noRotate ) {

  				_movePrev.copy( _moveCurr );
  				_moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );

  			} else if ( state === STATE.ZOOM && ! scope.noZoom ) {

  				_zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

  			} else if ( state === STATE.PAN && ! scope.noPan ) {

  				_panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

  			}

  		}

  		function onMouseUp( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  			_state = STATE.NONE;

  			scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
  			scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

  			scope.dispatchEvent( _endEvent$1 );

  		}

  		function mousewheel( event ) {

  			if ( scope.enabled === false ) return;

  			if ( scope.noZoom === true ) return;

  			event.preventDefault();

  			switch ( event.deltaMode ) {

  				case 2:
  					// Zoom in pages
  					_zoomStart.y -= event.deltaY * 0.025;
  					break;

  				case 1:
  					// Zoom in lines
  					_zoomStart.y -= event.deltaY * 0.01;
  					break;

  				default:
  					// undefined, 0, assume pixels
  					_zoomStart.y -= event.deltaY * 0.00025;
  					break;

  			}

  			scope.dispatchEvent( _startEvent$1 );
  			scope.dispatchEvent( _endEvent$1 );

  		}

  		function touchstart( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  			switch ( event.touches.length ) {

  				case 1:
  					_state = STATE.TOUCH_ROTATE;
  					_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
  					_movePrev.copy( _moveCurr );
  					break;

  				default: // 2 or more
  					_state = STATE.TOUCH_ZOOM_PAN;
  					const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
  					const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
  					_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

  					const x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
  					const y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
  					_panStart.copy( getMouseOnScreen( x, y ) );
  					_panEnd.copy( _panStart );
  					break;

  			}

  			scope.dispatchEvent( _startEvent$1 );

  		}

  		function touchmove( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  			switch ( event.touches.length ) {

  				case 1:
  					_movePrev.copy( _moveCurr );
  					_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
  					break;

  				default: // 2 or more
  					const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
  					const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
  					_touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

  					const x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
  					const y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
  					_panEnd.copy( getMouseOnScreen( x, y ) );
  					break;

  			}

  		}

  		function touchend( event ) {

  			if ( scope.enabled === false ) return;

  			switch ( event.touches.length ) {

  				case 0:
  					_state = STATE.NONE;
  					break;

  				case 1:
  					_state = STATE.TOUCH_ROTATE;
  					_moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
  					_movePrev.copy( _moveCurr );
  					break;

  			}

  			scope.dispatchEvent( _endEvent$1 );

  		}

  		function contextmenu( event ) {

  			if ( scope.enabled === false ) return;

  			event.preventDefault();

  		}

  		this.dispose = function () {

  			scope.domElement.removeEventListener( 'contextmenu', contextmenu );

  			scope.domElement.removeEventListener( 'pointerdown', onPointerDown );
  			scope.domElement.removeEventListener( 'wheel', mousewheel );

  			scope.domElement.removeEventListener( 'touchstart', touchstart );
  			scope.domElement.removeEventListener( 'touchend', touchend );
  			scope.domElement.removeEventListener( 'touchmove', touchmove );

  			scope.domElement.ownerDocument.removeEventListener( 'pointermove', onPointerMove );
  			scope.domElement.ownerDocument.removeEventListener( 'pointerup', onPointerUp );

  			window.removeEventListener( 'keydown', keydown );
  			window.removeEventListener( 'keyup', keyup );

  		};

  		this.domElement.addEventListener( 'contextmenu', contextmenu );

  		this.domElement.addEventListener( 'pointerdown', onPointerDown );
  		this.domElement.addEventListener( 'wheel', mousewheel, { passive: false } );

  		this.domElement.addEventListener( 'touchstart', touchstart, { passive: false } );
  		this.domElement.addEventListener( 'touchend', touchend );
  		this.domElement.addEventListener( 'touchmove', touchmove, { passive: false } );

  		this.domElement.ownerDocument.addEventListener( 'pointermove', onPointerMove );
  		this.domElement.ownerDocument.addEventListener( 'pointerup', onPointerUp );

  		window.addEventListener( 'keydown', keydown );
  		window.addEventListener( 'keyup', keyup );

  		this.handleResize();

  		// force an update at start
  		this.update();

  	}

  }

  /**
   * A simple ascii-art wrapper for error messaging in order to convey
   * just how tragic your errors are
   */
  function asciiError(msg) {
    console.clear();
    return "\n\n   ______________________________    . \\  | / .\n  /                            / \\     \\ \\ / /\n |                            | ==========  - -\n  \\____________________________\\_/     / / \\ \\\n  ______________________________      \\  | / | \\\n /                            / \\     \\ \\ / /.   .\n|                            | ==========  - -\n \\____________________________\\_/     / / \\ \\    /\n   ______________________________   / |\\  | /  .\n  /                            / \\     \\ \\ / /\n |                            | ==========  -  - -\n  \\____________________________\\_/     / / \\ \\\n                                     .  / | \\  .\n\n  Are you trying to wreak havoc!?!\n\n  " + msg + "\n\n  Idiot.\n\n  ";
  }

  var initialCameraParams = {
    aspectRatio: 2,
    fieldOfView: 60,
    nearPlane: 0.1,
    farPlane: 13500
  };
  /**
   * This abstract class is to be inherited by the SceneManager instance.
   * The idea is to place all the usual/boilerplate code for setting up
   * a threeJs scene and running it here, so that the only place you
   * need to implement the specifics of your scene is in your
   * SceneManager instance.
   *
   * By convention, properties/methods that are not intended/expected to be used
   * outside this class are prefixed with '_'
   *
   */

  var AbstractSceneManager = /*#__PURE__*/function () {
    function AbstractSceneManager(_containerId, _isWorldFlippable) {
      var _this = this;

      if (_isWorldFlippable === void 0) {
        _isWorldFlippable = false;
      }

      this._containerId = _containerId;
      this._isWorldFlippable = _isWorldFlippable; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>

      this._scene = new THREE.Scene();
      this._canvas = document.createElement('canvas');
      this._clock = new THREE.Clock(false);
      this._initialViewingVector = new THREE.Vector3(10, 10, 10);
      this._isSceneReady = false;
      this._isRendering = false;
      this._isInit = false; // protected _fps?: number;

      this._fps = 60;
      this._camera = new THREE.PerspectiveCamera(initialCameraParams.fieldOfView, initialCameraParams.aspectRatio, initialCameraParams.nearPlane, initialCameraParams.farPlane);
      this._sceneEntities = [];

      this.updateCamera = function () {};

      this.preInitHook = function () {};

      this.postInitHook = function () {};

      this.destroyHook = function () {};

      this.destroy = function () {
        window.removeEventListener('resize', _this.updateCameraAspect);

        _this._stopRendering();

        _this.destroyHook();
      };

      this._render = function () {
        console.log('>>> render');
        if (!_this._isRendering) return;

        if (!!_this._fps) {
          setTimeout(function () {
            _this._requestAnimationFrameId = requestAnimationFrame(_this._render);

            _this._update();
          }, 1000 / _this._fps);
        } else {
          _this._requestAnimationFrameId = requestAnimationFrame(_this._render);

          _this._update();
        }
      };

      this._startRendering = function () {
        _this._isRendering = true;

        _this._render();
      };

      this._stopRendering = function () {
        console.log('STOP!!!');
        _this._isRendering = false; // this._fps = undefined;
        // if (!!this._requestAnimationFrameId) {
        //   const xxx = this._requestAnimationFrameId;
        //   console.log('xxx', xxx);
        //   cancelAnimationFrame(xxx);
        //   this._requestAnimationFrameId = undefined;
        // }
      };
    }

    var _proto = AbstractSceneManager.prototype;

    _proto.init = /*#__PURE__*/function () {
      var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
        var _this2 = this;

        var container, DPR;
        return runtime_1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._isInit) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._isInit = true; // Enable superclass constructor to adjust settings prior to initialization sequence

                this.preInitHook(); // Get container and add fitting canvas to it

                container = document.getElementById(this._containerId);

                if (container) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('No container found with id: ' + this._containerId);

              case 7:
                this._canvas.style.width = '100%';
                this._canvas.style.height = '100%';
                container.append(this._canvas); // React to resize events on window

                this.updateCameraAspect = this.updateCameraAspect.bind(this);
                window.addEventListener('resize', this.updateCameraAspect); // Build Renderer

                DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
                this._renderer = new THREE.WebGLRenderer({
                  canvas: this._canvas,
                  antialias: true,
                  alpha: true
                });

                this._renderer.setPixelRatio(DPR);

                this._renderer.sortObjects = false; // This prevents pesky rendering-disruption effect

                this._renderer.shadowMap.enabled = true;
                this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this._renderer.outputEncoding = THREE.GammaEncoding; // Init camera position and orientation

                this._camera.position.copy(this._initialViewingVector);

                this._camera.up = new THREE.Vector3(0, 0, 1); // Vector defining up direction of camera

                this._camera.lookAt(0, 0, 0); // console.log(">>>", OrbitControls);
                // Define and configure orbitControls
                // Do NOT attempt to create controls until
                // dependencies are set, or you'll get erratic behavior.
                // OrbitControls => Can't flip upside down
                // TrackballControls => Can flip upside down


                this._orbitControls = !this._isWorldFlippable ? new OrbitControls(this._camera, this._renderer.domElement) : new TrackballControls(this._camera, this._renderer.domElement);

                if (!(this._orbitControls instanceof OrbitControls)) {
                  _context2.next = 28;
                  break;
                }

                this._orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

                this._orbitControls.dampingFactor = 0.25;
                _context2.next = 36;
                break;

              case 28:
                if (!(this._orbitControls instanceof TrackballControls)) {
                  _context2.next = 35;
                  break;
                }

                this._orbitControls.rotateSpeed = 10.0;
                this._orbitControls.zoomSpeed = 1.2;
                this._orbitControls.panSpeed = 0.8;
                this._orbitControls.keys = ['65', '83', '68']; // a s d

                _context2.next = 36;
                break;

              case 35:
                throw Error('Poor Logic');

              case 36:
                if (this._sceneEntities.length) {
                  _context2.next = 38;
                  break;
                }

                throw new Error(asciiError('You have no scene entities!'));

              case 38:
                _context2.next = 40;
                return Promise.all(this._sceneEntities.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(sceneEntity) {
                    var initiatedSceneEntityGroup;
                    return runtime_1.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return sceneEntity.init();

                          case 2:
                            initiatedSceneEntityGroup = _context.sent;

                            if (!(!initiatedSceneEntityGroup || !initiatedSceneEntityGroup.children.length)) {
                              _context.next = 5;
                              break;
                            }

                            throw new Error(asciiError("\n            -----------------------------------------------------------------------------\n            The scene entity \"" + sceneEntity.constructor.name + "\" has empty sceneEntityGroup\n            after initialization!!!\n            -----------------------------------------------------------------------------\n            "));

                          case 5:
                            _this2._scene.add(initiatedSceneEntityGroup);

                            return _context.abrupt("return");

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 40:
                // Run updater methods
                this.setHelpersVisibility(false);
                this.updateCameraAspect(); // Begin Animation

                this._clock.start();

                this._isRendering = true;

                this._startRendering(); // Enable superclass constructor to adjust settings after to initialization sequence


                this.postInitHook();

              case 46:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    _proto.addSceneEntities = function addSceneEntities(sceneEntities) {
      var _this3 = this;

      // Add scene entities
      sceneEntities.forEach(function (el) {
        return _this3._sceneEntities.push(el);
      });
    }
    /**
     * This method lets you show/hide the objects within in your scene
     * designated as 'helpers'. It relies on the practice of setting the property `userData.isHelper = true`
     * on any object you want to be classified as a helper
     */
    ;

    _proto.setHelpersVisibility = function setHelpersVisibility(isHelpersShown) {
      this._scene.traverse(function (child) {
        return child.userData.isHelper && (child.visible = isHelpersShown);
      });
    };

    _proto.updateCameraAspect = function updateCameraAspect() {
      console.log(this._canvas); // Not sure where/how, but canvas' style width/height
      // gets altered and needs to be reset to 100%

      this._canvas.style.width = '100%';
      this._canvas.style.height = '100%';
      var width = this._canvas.offsetWidth || 1;
      var height = this._canvas.offsetHeight || 1;
      this._camera.aspect = width / height;

      this._camera.updateProjectionMatrix();

      this._renderer.setSize(width, height);
    };

    _proto._update = function _update() {
      var _this$_orbitControls;

      // Loop through scene entities and trigger their update methods
      var elapsedTime = !!this._clock ? this._clock.getElapsedTime() : 0;

      this._sceneEntities.forEach(function (el) {
        return el.update(elapsedTime);
      }); // Update camera


      this.updateCamera(elapsedTime); // Needed for TrackballControls

      (_this$_orbitControls = this._orbitControls) == null ? void 0 : _this$_orbitControls.update(); // Finish loop

      if (!this._camera || !this._renderer) throw new Error('Poor Logic');

      if (!!this._requestAnimationFrameId) {
        this._renderer.render(this._scene, this._camera);
      }
    };

    return AbstractSceneManager;
  }();

  // o object_name | g group_name
  const _object_pattern = /^[og]\s*(.+)?/;
  // mtllib file_reference
  const _material_library_pattern = /^mtllib /;
  // usemtl material_name
  const _material_use_pattern = /^usemtl /;
  // usemap map_name
  const _map_use_pattern = /^usemap /;

  const _vA = new THREE.Vector3();
  const _vB = new THREE.Vector3();
  const _vC = new THREE.Vector3();

  const _ab = new THREE.Vector3();
  const _cb = new THREE.Vector3();

  function ParserState() {

  	const state = {
  		objects: [],
  		object: {},

  		vertices: [],
  		normals: [],
  		colors: [],
  		uvs: [],

  		materials: {},
  		materialLibraries: [],

  		startObject: function ( name, fromDeclaration ) {

  			// If the current object (initial from reset) is not from a g/o declaration in the parsed
  			// file. We need to use it for the first parsed g/o to keep things in sync.
  			if ( this.object && this.object.fromDeclaration === false ) {

  				this.object.name = name;
  				this.object.fromDeclaration = ( fromDeclaration !== false );
  				return;

  			}

  			const previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

  			if ( this.object && typeof this.object._finalize === 'function' ) {

  				this.object._finalize( true );

  			}

  			this.object = {
  				name: name || '',
  				fromDeclaration: ( fromDeclaration !== false ),

  				geometry: {
  					vertices: [],
  					normals: [],
  					colors: [],
  					uvs: [],
  					hasUVIndices: false
  				},
  				materials: [],
  				smooth: true,

  				startMaterial: function ( name, libraries ) {

  					const previous = this._finalize( false );

  					// New usemtl declaration overwrites an inherited material, except if faces were declared
  					// after the material, then it must be preserved for proper MultiMaterial continuation.
  					if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

  						this.materials.splice( previous.index, 1 );

  					}

  					const material = {
  						index: this.materials.length,
  						name: name || '',
  						mtllib: ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
  						smooth: ( previous !== undefined ? previous.smooth : this.smooth ),
  						groupStart: ( previous !== undefined ? previous.groupEnd : 0 ),
  						groupEnd: - 1,
  						groupCount: - 1,
  						inherited: false,

  						clone: function ( index ) {

  							const cloned = {
  								index: ( typeof index === 'number' ? index : this.index ),
  								name: this.name,
  								mtllib: this.mtllib,
  								smooth: this.smooth,
  								groupStart: 0,
  								groupEnd: - 1,
  								groupCount: - 1,
  								inherited: false
  							};
  							cloned.clone = this.clone.bind( cloned );
  							return cloned;

  						}
  					};

  					this.materials.push( material );

  					return material;

  				},

  				currentMaterial: function () {

  					if ( this.materials.length > 0 ) {

  						return this.materials[ this.materials.length - 1 ];

  					}

  					return undefined;

  				},

  				_finalize: function ( end ) {

  					const lastMultiMaterial = this.currentMaterial();
  					if ( lastMultiMaterial && lastMultiMaterial.groupEnd === - 1 ) {

  						lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
  						lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
  						lastMultiMaterial.inherited = false;

  					}

  					// Ignore objects tail materials if no face declarations followed them before a new o/g started.
  					if ( end && this.materials.length > 1 ) {

  						for ( let mi = this.materials.length - 1; mi >= 0; mi -- ) {

  							if ( this.materials[ mi ].groupCount <= 0 ) {

  								this.materials.splice( mi, 1 );

  							}

  						}

  					}

  					// Guarantee at least one empty material, this makes the creation later more straight forward.
  					if ( end && this.materials.length === 0 ) {

  						this.materials.push( {
  							name: '',
  							smooth: this.smooth
  						} );

  					}

  					return lastMultiMaterial;

  				}
  			};

  			// Inherit previous objects material.
  			// Spec tells us that a declared material must be set to all objects until a new material is declared.
  			// If a usemtl declaration is encountered while this new object is being parsed, it will
  			// overwrite the inherited material. Exception being that there was already face declarations
  			// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

  			if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function' ) {

  				const declared = previousMaterial.clone( 0 );
  				declared.inherited = true;
  				this.object.materials.push( declared );

  			}

  			this.objects.push( this.object );

  		},

  		finalize: function () {

  			if ( this.object && typeof this.object._finalize === 'function' ) {

  				this.object._finalize( true );

  			}

  		},

  		parseVertexIndex: function ( value, len ) {

  			const index = parseInt( value, 10 );
  			return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

  		},

  		parseNormalIndex: function ( value, len ) {

  			const index = parseInt( value, 10 );
  			return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

  		},

  		parseUVIndex: function ( value, len ) {

  			const index = parseInt( value, 10 );
  			return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

  		},

  		addVertex: function ( a, b, c ) {

  			const src = this.vertices;
  			const dst = this.object.geometry.vertices;

  			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
  			dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
  			dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

  		},

  		addVertexPoint: function ( a ) {

  			const src = this.vertices;
  			const dst = this.object.geometry.vertices;

  			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

  		},

  		addVertexLine: function ( a ) {

  			const src = this.vertices;
  			const dst = this.object.geometry.vertices;

  			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

  		},

  		addNormal: function ( a, b, c ) {

  			const src = this.normals;
  			const dst = this.object.geometry.normals;

  			dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
  			dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
  			dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

  		},

  		addFaceNormal: function ( a, b, c ) {

  			const src = this.vertices;
  			const dst = this.object.geometry.normals;

  			_vA.fromArray( src, a );
  			_vB.fromArray( src, b );
  			_vC.fromArray( src, c );

  			_cb.subVectors( _vC, _vB );
  			_ab.subVectors( _vA, _vB );
  			_cb.cross( _ab );

  			_cb.normalize();

  			dst.push( _cb.x, _cb.y, _cb.z );
  			dst.push( _cb.x, _cb.y, _cb.z );
  			dst.push( _cb.x, _cb.y, _cb.z );

  		},

  		addColor: function ( a, b, c ) {

  			const src = this.colors;
  			const dst = this.object.geometry.colors;

  			if ( src[ a ] !== undefined ) dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
  			if ( src[ b ] !== undefined ) dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
  			if ( src[ c ] !== undefined ) dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

  		},

  		addUV: function ( a, b, c ) {

  			const src = this.uvs;
  			const dst = this.object.geometry.uvs;

  			dst.push( src[ a + 0 ], src[ a + 1 ] );
  			dst.push( src[ b + 0 ], src[ b + 1 ] );
  			dst.push( src[ c + 0 ], src[ c + 1 ] );

  		},

  		addDefaultUV: function () {

  			const dst = this.object.geometry.uvs;

  			dst.push( 0, 0 );
  			dst.push( 0, 0 );
  			dst.push( 0, 0 );

  		},

  		addUVLine: function ( a ) {

  			const src = this.uvs;
  			const dst = this.object.geometry.uvs;

  			dst.push( src[ a + 0 ], src[ a + 1 ] );

  		},

  		addFace: function ( a, b, c, ua, ub, uc, na, nb, nc ) {

  			const vLen = this.vertices.length;

  			let ia = this.parseVertexIndex( a, vLen );
  			let ib = this.parseVertexIndex( b, vLen );
  			let ic = this.parseVertexIndex( c, vLen );

  			this.addVertex( ia, ib, ic );
  			this.addColor( ia, ib, ic );

  			// normals

  			if ( na !== undefined && na !== '' ) {

  				const nLen = this.normals.length;

  				ia = this.parseNormalIndex( na, nLen );
  				ib = this.parseNormalIndex( nb, nLen );
  				ic = this.parseNormalIndex( nc, nLen );

  				this.addNormal( ia, ib, ic );

  			} else {

  				this.addFaceNormal( ia, ib, ic );

  			}

  			// uvs

  			if ( ua !== undefined && ua !== '' ) {

  				const uvLen = this.uvs.length;

  				ia = this.parseUVIndex( ua, uvLen );
  				ib = this.parseUVIndex( ub, uvLen );
  				ic = this.parseUVIndex( uc, uvLen );

  				this.addUV( ia, ib, ic );

  				this.object.geometry.hasUVIndices = true;

  			} else {

  				// add placeholder values (for inconsistent face definitions)

  				this.addDefaultUV();

  			}

  		},

  		addPointGeometry: function ( vertices ) {

  			this.object.geometry.type = 'Points';

  			const vLen = this.vertices.length;

  			for ( let vi = 0, l = vertices.length; vi < l; vi ++ ) {

  				const index = this.parseVertexIndex( vertices[ vi ], vLen );

  				this.addVertexPoint( index );
  				this.addColor( index );

  			}

  		},

  		addLineGeometry: function ( vertices, uvs ) {

  			this.object.geometry.type = 'Line';

  			const vLen = this.vertices.length;
  			const uvLen = this.uvs.length;

  			for ( let vi = 0, l = vertices.length; vi < l; vi ++ ) {

  				this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

  			}

  			for ( let uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

  				this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

  			}

  		}

  	};

  	state.startObject( '', false );

  	return state;

  }

  //

  class OBJLoader extends THREE.Loader {

  	constructor( manager ) {

  		super( manager );

  		this.materials = null;

  	}

  	load( url, onLoad, onProgress, onError ) {

  		const scope = this;

  		const loader = new THREE.FileLoader( this.manager );
  		loader.setPath( this.path );
  		loader.setRequestHeader( this.requestHeader );
  		loader.setWithCredentials( this.withCredentials );
  		loader.load( url, function ( text ) {

  			try {

  				onLoad( scope.parse( text ) );

  			} catch ( e ) {

  				if ( onError ) {

  					onError( e );

  				} else {

  					console.error( e );

  				}

  				scope.manager.itemError( url );

  			}

  		}, onProgress, onError );

  	}

  	setMaterials( materials ) {

  		this.materials = materials;

  		return this;

  	}

  	parse( text ) {

  		const state = new ParserState();

  		if ( text.indexOf( '\r\n' ) !== - 1 ) {

  			// This is faster than String.split with regex that splits on both
  			text = text.replace( /\r\n/g, '\n' );

  		}

  		if ( text.indexOf( '\\\n' ) !== - 1 ) {

  			// join lines separated by a line continuation character (\)
  			text = text.replace( /\\\n/g, '' );

  		}

  		const lines = text.split( '\n' );
  		let line = '', lineFirstChar = '';
  		let lineLength = 0;
  		let result = [];

  		// Faster to just trim left side of the line. Use if available.
  		const trimLeft = ( typeof ''.trimLeft === 'function' );

  		for ( let i = 0, l = lines.length; i < l; i ++ ) {

  			line = lines[ i ];

  			line = trimLeft ? line.trimLeft() : line.trim();

  			lineLength = line.length;

  			if ( lineLength === 0 ) continue;

  			lineFirstChar = line.charAt( 0 );

  			// @todo invoke passed in handler if any
  			if ( lineFirstChar === '#' ) continue;

  			if ( lineFirstChar === 'v' ) {

  				const data = line.split( /\s+/ );

  				switch ( data[ 0 ] ) {

  					case 'v':
  						state.vertices.push(
  							parseFloat( data[ 1 ] ),
  							parseFloat( data[ 2 ] ),
  							parseFloat( data[ 3 ] )
  						);
  						if ( data.length >= 7 ) {

  							state.colors.push(
  								parseFloat( data[ 4 ] ),
  								parseFloat( data[ 5 ] ),
  								parseFloat( data[ 6 ] )

  							);

  						} else {

  							// if no colors are defined, add placeholders so color and vertex indices match

  							state.colors.push( undefined, undefined, undefined );

  						}

  						break;
  					case 'vn':
  						state.normals.push(
  							parseFloat( data[ 1 ] ),
  							parseFloat( data[ 2 ] ),
  							parseFloat( data[ 3 ] )
  						);
  						break;
  					case 'vt':
  						state.uvs.push(
  							parseFloat( data[ 1 ] ),
  							parseFloat( data[ 2 ] )
  						);
  						break;

  				}

  			} else if ( lineFirstChar === 'f' ) {

  				const lineData = line.substr( 1 ).trim();
  				const vertexData = lineData.split( /\s+/ );
  				const faceVertices = [];

  				// Parse the face vertex data into an easy to work with format

  				for ( let j = 0, jl = vertexData.length; j < jl; j ++ ) {

  					const vertex = vertexData[ j ];

  					if ( vertex.length > 0 ) {

  						const vertexParts = vertex.split( '/' );
  						faceVertices.push( vertexParts );

  					}

  				}

  				// Draw an edge between the first vertex and all subsequent vertices to form an n-gon

  				const v1 = faceVertices[ 0 ];

  				for ( let j = 1, jl = faceVertices.length - 1; j < jl; j ++ ) {

  					const v2 = faceVertices[ j ];
  					const v3 = faceVertices[ j + 1 ];

  					state.addFace(
  						v1[ 0 ], v2[ 0 ], v3[ 0 ],
  						v1[ 1 ], v2[ 1 ], v3[ 1 ],
  						v1[ 2 ], v2[ 2 ], v3[ 2 ]
  					);

  				}

  			} else if ( lineFirstChar === 'l' ) {

  				const lineParts = line.substring( 1 ).trim().split( ' ' );
  				let lineVertices = [];
  				const lineUVs = [];

  				if ( line.indexOf( '/' ) === - 1 ) {

  					lineVertices = lineParts;

  				} else {

  					for ( let li = 0, llen = lineParts.length; li < llen; li ++ ) {

  						const parts = lineParts[ li ].split( '/' );

  						if ( parts[ 0 ] !== '' ) lineVertices.push( parts[ 0 ] );
  						if ( parts[ 1 ] !== '' ) lineUVs.push( parts[ 1 ] );

  					}

  				}

  				state.addLineGeometry( lineVertices, lineUVs );

  			} else if ( lineFirstChar === 'p' ) {

  				const lineData = line.substr( 1 ).trim();
  				const pointData = lineData.split( ' ' );

  				state.addPointGeometry( pointData );

  			} else if ( ( result = _object_pattern.exec( line ) ) !== null ) {

  				// o object_name
  				// or
  				// g group_name

  				// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
  				// let name = result[ 0 ].substr( 1 ).trim();
  				const name = ( ' ' + result[ 0 ].substr( 1 ).trim() ).substr( 1 );

  				state.startObject( name );

  			} else if ( _material_use_pattern.test( line ) ) {

  				// material

  				state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

  			} else if ( _material_library_pattern.test( line ) ) {

  				// mtl file

  				state.materialLibraries.push( line.substring( 7 ).trim() );

  			} else if ( _map_use_pattern.test( line ) ) {

  				// the line is parsed but ignored since the loader assumes textures are defined MTL files
  				// (according to https://www.okino.com/conv/imp_wave.htm, 'usemap' is the old-style Wavefront texture reference method)

  				console.warn( 'THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.' );

  			} else if ( lineFirstChar === 's' ) {

  				result = line.split( ' ' );

  				// smooth shading

  				// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
  				// but does not define a usemtl for each face set.
  				// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
  				// This requires some care to not create extra material on each smooth value for "normal" obj files.
  				// where explicit usemtl defines geometry groups.
  				// Example asset: examples/models/obj/cerberus/Cerberus.obj

  				/*
  					 * http://paulbourke.net/dataformats/obj/
  					 * or
  					 * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
  					 *
  					 * From chapter "Grouping" Syntax explanation "s group_number":
  					 * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
  					 * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
  					 * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
  					 * than 0."
  					 */
  				if ( result.length > 1 ) {

  					const value = result[ 1 ].trim().toLowerCase();
  					state.object.smooth = ( value !== '0' && value !== 'off' );

  				} else {

  					// ZBrush can produce "s" lines #11707
  					state.object.smooth = true;

  				}

  				const material = state.object.currentMaterial();
  				if ( material ) material.smooth = state.object.smooth;

  			} else {

  				// Handle null terminated files without exception
  				if ( line === '\0' ) continue;

  				console.warn( 'THREE.OBJLoader: Unexpected line: "' + line + '"' );

  			}

  		}

  		state.finalize();

  		const container = new THREE.Group();
  		container.materialLibraries = [].concat( state.materialLibraries );

  		const hasPrimitives = ! ( state.objects.length === 1 && state.objects[ 0 ].geometry.vertices.length === 0 );

  		if ( hasPrimitives === true ) {

  			for ( let i = 0, l = state.objects.length; i < l; i ++ ) {

  				const object = state.objects[ i ];
  				const geometry = object.geometry;
  				const materials = object.materials;
  				const isLine = ( geometry.type === 'Line' );
  				const isPoints = ( geometry.type === 'Points' );
  				let hasVertexColors = false;

  				// Skip o/g line declarations that did not follow with any faces
  				if ( geometry.vertices.length === 0 ) continue;

  				const buffergeometry = new THREE.BufferGeometry();

  				buffergeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( geometry.vertices, 3 ) );

  				if ( geometry.normals.length > 0 ) {

  					buffergeometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( geometry.normals, 3 ) );

  				}

  				if ( geometry.colors.length > 0 ) {

  					hasVertexColors = true;
  					buffergeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( geometry.colors, 3 ) );

  				}

  				if ( geometry.hasUVIndices === true ) {

  					buffergeometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( geometry.uvs, 2 ) );

  				}

  				// Create materials

  				const createdMaterials = [];

  				for ( let mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

  					const sourceMaterial = materials[ mi ];
  					const materialHash = sourceMaterial.name + '_' + sourceMaterial.smooth + '_' + hasVertexColors;
  					let material = state.materials[ materialHash ];

  					if ( this.materials !== null ) {

  						material = this.materials.create( sourceMaterial.name );

  						// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
  						if ( isLine && material && ! ( material instanceof THREE.LineBasicMaterial ) ) {

  							const materialLine = new THREE.LineBasicMaterial();
  							THREE.Material.prototype.copy.call( materialLine, material );
  							materialLine.color.copy( material.color );
  							material = materialLine;

  						} else if ( isPoints && material && ! ( material instanceof THREE.PointsMaterial ) ) {

  							const materialPoints = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false } );
  							THREE.Material.prototype.copy.call( materialPoints, material );
  							materialPoints.color.copy( material.color );
  							materialPoints.map = material.map;
  							material = materialPoints;

  						}

  					}

  					if ( material === undefined ) {

  						if ( isLine ) {

  							material = new THREE.LineBasicMaterial();

  						} else if ( isPoints ) {

  							material = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );

  						} else {

  							material = new THREE.MeshPhongMaterial();

  						}

  						material.name = sourceMaterial.name;
  						material.flatShading = sourceMaterial.smooth ? false : true;
  						material.vertexColors = hasVertexColors;

  						state.materials[ materialHash ] = material;

  					}

  					createdMaterials.push( material );

  				}

  				// Create mesh

  				let mesh;

  				if ( createdMaterials.length > 1 ) {

  					for ( let mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

  						const sourceMaterial = materials[ mi ];
  						buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

  					}

  					if ( isLine ) {

  						mesh = new THREE.LineSegments( buffergeometry, createdMaterials );

  					} else if ( isPoints ) {

  						mesh = new THREE.Points( buffergeometry, createdMaterials );

  					} else {

  						mesh = new THREE.Mesh( buffergeometry, createdMaterials );

  					}

  				} else {

  					if ( isLine ) {

  						mesh = new THREE.LineSegments( buffergeometry, createdMaterials[ 0 ] );

  					} else if ( isPoints ) {

  						mesh = new THREE.Points( buffergeometry, createdMaterials[ 0 ] );

  					} else {

  						mesh = new THREE.Mesh( buffergeometry, createdMaterials[ 0 ] );

  					}

  				}

  				mesh.name = object.name;

  				container.add( mesh );

  			}

  		} else {

  			// if there is only the default parser state object with no geometry data, interpret data as point cloud

  			if ( state.vertices.length > 0 ) {

  				const material = new THREE.PointsMaterial( { size: 1, sizeAttenuation: false } );

  				const buffergeometry = new THREE.BufferGeometry();

  				buffergeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( state.vertices, 3 ) );

  				if ( state.colors.length > 0 && state.colors[ 0 ] !== undefined ) {

  					buffergeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( state.colors, 3 ) );
  					material.vertexColors = true;

  				}

  				const points = new THREE.Points( buffergeometry, material );
  				container.add( points );

  			}

  		}

  		return container;

  	}

  }

  /**
   * Loads a Wavefront .mtl file specifying materials
   */

  class MTLLoader extends THREE.Loader {

  	constructor( manager ) {

  		super( manager );

  	}

  	/**
  	 * Loads and parses a MTL asset from a URL.
  	 *
  	 * @param {String} url - URL to the MTL file.
  	 * @param {Function} [onLoad] - Callback invoked with the loaded object.
  	 * @param {Function} [onProgress] - Callback for download progress.
  	 * @param {Function} [onError] - Callback for download errors.
  	 *
  	 * @see setPath setResourcePath
  	 *
  	 * @note In order for relative texture references to resolve correctly
  	 * you must call setResourcePath() explicitly prior to load.
  	 */
  	load( url, onLoad, onProgress, onError ) {

  		const scope = this;

  		const path = ( this.path === '' ) ? THREE.LoaderUtils.extractUrlBase( url ) : this.path;

  		const loader = new THREE.FileLoader( this.manager );
  		loader.setPath( this.path );
  		loader.setRequestHeader( this.requestHeader );
  		loader.setWithCredentials( this.withCredentials );
  		loader.load( url, function ( text ) {

  			try {

  				onLoad( scope.parse( text, path ) );

  			} catch ( e ) {

  				if ( onError ) {

  					onError( e );

  				} else {

  					console.error( e );

  				}

  				scope.manager.itemError( url );

  			}

  		}, onProgress, onError );

  	}

  	setMaterialOptions( value ) {

  		this.materialOptions = value;
  		return this;

  	}

  	/**
  	 * Parses a MTL file.
  	 *
  	 * @param {String} text - Content of MTL file
  	 * @return {MaterialCreator}
  	 *
  	 * @see setPath setResourcePath
  	 *
  	 * @note In order for relative texture references to resolve correctly
  	 * you must call setResourcePath() explicitly prior to parse.
  	 */
  	parse( text, path ) {

  		const lines = text.split( '\n' );
  		let info = {};
  		const delimiter_pattern = /\s+/;
  		const materialsInfo = {};

  		for ( let i = 0; i < lines.length; i ++ ) {

  			let line = lines[ i ];
  			line = line.trim();

  			if ( line.length === 0 || line.charAt( 0 ) === '#' ) {

  				// Blank line or comment ignore
  				continue;

  			}

  			const pos = line.indexOf( ' ' );

  			let key = ( pos >= 0 ) ? line.substring( 0, pos ) : line;
  			key = key.toLowerCase();

  			let value = ( pos >= 0 ) ? line.substring( pos + 1 ) : '';
  			value = value.trim();

  			if ( key === 'newmtl' ) {

  				// New material

  				info = { name: value };
  				materialsInfo[ value ] = info;

  			} else {

  				if ( key === 'ka' || key === 'kd' || key === 'ks' || key === 'ke' ) {

  					const ss = value.split( delimiter_pattern, 3 );
  					info[ key ] = [ parseFloat( ss[ 0 ] ), parseFloat( ss[ 1 ] ), parseFloat( ss[ 2 ] ) ];

  				} else {

  					info[ key ] = value;

  				}

  			}

  		}

  		const materialCreator = new MaterialCreator( this.resourcePath || path, this.materialOptions );
  		materialCreator.setCrossOrigin( this.crossOrigin );
  		materialCreator.setManager( this.manager );
  		materialCreator.setMaterials( materialsInfo );
  		return materialCreator;

  	}

  }

  /**
   * Create a new MTLLoader.MaterialCreator
   * @param baseUrl - Url relative to which textures are loaded
   * @param options - Set of options on how to construct the materials
   *                  side: Which side to apply the material
   *                        FrontSide (default), THREE.BackSide, THREE.DoubleSide
   *                  wrap: What type of wrapping to apply for textures
   *                        RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
   *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
   *                                Default: false, assumed to be already normalized
   *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
   *                                  Default: false
   * @constructor
   */

  class MaterialCreator {

  	constructor( baseUrl = '', options = {} ) {

  		this.baseUrl = baseUrl;
  		this.options = options;
  		this.materialsInfo = {};
  		this.materials = {};
  		this.materialsArray = [];
  		this.nameLookup = {};

  		this.crossOrigin = 'anonymous';

  		this.side = ( this.options.side !== undefined ) ? this.options.side : THREE.FrontSide;
  		this.wrap = ( this.options.wrap !== undefined ) ? this.options.wrap : THREE.RepeatWrapping;

  	}

  	setCrossOrigin( value ) {

  		this.crossOrigin = value;
  		return this;

  	}

  	setManager( value ) {

  		this.manager = value;

  	}

  	setMaterials( materialsInfo ) {

  		this.materialsInfo = this.convert( materialsInfo );
  		this.materials = {};
  		this.materialsArray = [];
  		this.nameLookup = {};

  	}

  	convert( materialsInfo ) {

  		if ( ! this.options ) return materialsInfo;

  		const converted = {};

  		for ( const mn in materialsInfo ) {

  			// Convert materials info into normalized form based on options

  			const mat = materialsInfo[ mn ];

  			const covmat = {};

  			converted[ mn ] = covmat;

  			for ( const prop in mat ) {

  				let save = true;
  				let value = mat[ prop ];
  				const lprop = prop.toLowerCase();

  				switch ( lprop ) {

  					case 'kd':
  					case 'ka':
  					case 'ks':

  						// Diffuse color (color under white light) using RGB values

  						if ( this.options && this.options.normalizeRGB ) {

  							value = [ value[ 0 ] / 255, value[ 1 ] / 255, value[ 2 ] / 255 ];

  						}

  						if ( this.options && this.options.ignoreZeroRGBs ) {

  							if ( value[ 0 ] === 0 && value[ 1 ] === 0 && value[ 2 ] === 0 ) {

  								// ignore

  								save = false;

  							}

  						}

  						break;

  				}

  				if ( save ) {

  					covmat[ lprop ] = value;

  				}

  			}

  		}

  		return converted;

  	}

  	preload() {

  		for ( const mn in this.materialsInfo ) {

  			this.create( mn );

  		}

  	}

  	getIndex( materialName ) {

  		return this.nameLookup[ materialName ];

  	}

  	getAsArray() {

  		let index = 0;

  		for ( const mn in this.materialsInfo ) {

  			this.materialsArray[ index ] = this.create( mn );
  			this.nameLookup[ mn ] = index;
  			index ++;

  		}

  		return this.materialsArray;

  	}

  	create( materialName ) {

  		if ( this.materials[ materialName ] === undefined ) {

  			this.createMaterial_( materialName );

  		}

  		return this.materials[ materialName ];

  	}

  	createMaterial_( materialName ) {

  		// Create material

  		const scope = this;
  		const mat = this.materialsInfo[ materialName ];
  		const params = {

  			name: materialName,
  			side: this.side

  		};

  		function resolveURL( baseUrl, url ) {

  			if ( typeof url !== 'string' || url === '' )
  				return '';

  			// Absolute URL
  			if ( /^https?:\/\//i.test( url ) ) return url;

  			return baseUrl + url;

  		}

  		function setMapForType( mapType, value ) {

  			if ( params[ mapType ] ) return; // Keep the first encountered texture

  			const texParams = scope.getTextureParams( value, params );
  			const map = scope.loadTexture( resolveURL( scope.baseUrl, texParams.url ) );

  			map.repeat.copy( texParams.scale );
  			map.offset.copy( texParams.offset );

  			map.wrapS = scope.wrap;
  			map.wrapT = scope.wrap;

  			params[ mapType ] = map;

  		}

  		for ( const prop in mat ) {

  			const value = mat[ prop ];
  			let n;

  			if ( value === '' ) continue;

  			switch ( prop.toLowerCase() ) {

  				// Ns is material specular exponent

  				case 'kd':

  					// Diffuse color (color under white light) using RGB values

  					params.color = new THREE.Color().fromArray( value );

  					break;

  				case 'ks':

  					// Specular color (color when light is reflected from shiny surface) using RGB values
  					params.specular = new THREE.Color().fromArray( value );

  					break;

  				case 'ke':

  					// Emissive using RGB values
  					params.emissive = new THREE.Color().fromArray( value );

  					break;

  				case 'map_kd':

  					// Diffuse texture map

  					setMapForType( 'map', value );

  					break;

  				case 'map_ks':

  					// Specular map

  					setMapForType( 'specularMap', value );

  					break;

  				case 'map_ke':

  					// Emissive map

  					setMapForType( 'emissiveMap', value );

  					break;

  				case 'norm':

  					setMapForType( 'normalMap', value );

  					break;

  				case 'map_bump':
  				case 'bump':

  					// Bump texture map

  					setMapForType( 'bumpMap', value );

  					break;

  				case 'map_d':

  					// Alpha map

  					setMapForType( 'alphaMap', value );
  					params.transparent = true;

  					break;

  				case 'ns':

  					// The specular exponent (defines the focus of the specular highlight)
  					// A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

  					params.shininess = parseFloat( value );

  					break;

  				case 'd':
  					n = parseFloat( value );

  					if ( n < 1 ) {

  						params.opacity = n;
  						params.transparent = true;

  					}

  					break;

  				case 'tr':
  					n = parseFloat( value );

  					if ( this.options && this.options.invertTrProperty ) n = 1 - n;

  					if ( n > 0 ) {

  						params.opacity = 1 - n;
  						params.transparent = true;

  					}

  					break;

  			}

  		}

  		this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
  		return this.materials[ materialName ];

  	}

  	getTextureParams( value, matParams ) {

  		const texParams = {

  			scale: new THREE.Vector2( 1, 1 ),
  			offset: new THREE.Vector2( 0, 0 )

  		 };

  		const items = value.split( /\s+/ );
  		let pos;

  		pos = items.indexOf( '-bm' );

  		if ( pos >= 0 ) {

  			matParams.bumpScale = parseFloat( items[ pos + 1 ] );
  			items.splice( pos, 2 );

  		}

  		pos = items.indexOf( '-s' );

  		if ( pos >= 0 ) {

  			texParams.scale.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
  			items.splice( pos, 4 ); // we expect 3 parameters here!

  		}

  		pos = items.indexOf( '-o' );

  		if ( pos >= 0 ) {

  			texParams.offset.set( parseFloat( items[ pos + 1 ] ), parseFloat( items[ pos + 2 ] ) );
  			items.splice( pos, 4 ); // we expect 3 parameters here!

  		}

  		texParams.url = items.join( ' ' ).trim();
  		return texParams;

  	}

  	loadTexture( url, mapping, onLoad, onProgress, onError ) {

  		const manager = ( this.manager !== undefined ) ? this.manager : THREE.DefaultLoadingManager;
  		let loader = manager.getHandler( url );

  		if ( loader === null ) {

  			loader = new THREE.TextureLoader( manager );

  		}

  		if ( loader.setCrossOrigin ) loader.setCrossOrigin( this.crossOrigin );

  		const texture = loader.load( url, onLoad, onProgress, onError );

  		if ( mapping !== undefined ) texture.mapping = mapping;

  		return texture;

  	}

  }

  class DDSLoader extends THREE.CompressedTextureLoader {

  	constructor( manager ) {

  		super( manager );

  	}

  	parse( buffer, loadMipmaps ) {

  		const dds = { mipmaps: [], width: 0, height: 0, format: null, mipmapCount: 1 };

  		// Adapted from @toji's DDS utils
  		// https://github.com/toji/webgl-texture-utils/blob/master/texture-util/dds.js

  		// All values and structures referenced from:
  		// http://msdn.microsoft.com/en-us/library/bb943991.aspx/

  		const DDS_MAGIC = 0x20534444;

  		// let DDSD_CAPS = 0x1;
  		// let DDSD_HEIGHT = 0x2;
  		// let DDSD_WIDTH = 0x4;
  		// let DDSD_PITCH = 0x8;
  		// let DDSD_PIXELFORMAT = 0x1000;
  		const DDSD_MIPMAPCOUNT = 0x20000;
  		// let DDSD_LINEARSIZE = 0x80000;
  		// let DDSD_DEPTH = 0x800000;

  		// let DDSCAPS_COMPLEX = 0x8;
  		// let DDSCAPS_MIPMAP = 0x400000;
  		// let DDSCAPS_TEXTURE = 0x1000;

  		const DDSCAPS2_CUBEMAP = 0x200;
  		const DDSCAPS2_CUBEMAP_POSITIVEX = 0x400;
  		const DDSCAPS2_CUBEMAP_NEGATIVEX = 0x800;
  		const DDSCAPS2_CUBEMAP_POSITIVEY = 0x1000;
  		const DDSCAPS2_CUBEMAP_NEGATIVEY = 0x2000;
  		const DDSCAPS2_CUBEMAP_POSITIVEZ = 0x4000;
  		const DDSCAPS2_CUBEMAP_NEGATIVEZ = 0x8000;
  		// let DDSCAPS2_VOLUME = 0x200000;

  		// let DDPF_ALPHAPIXELS = 0x1;
  		// let DDPF_ALPHA = 0x2;
  		const DDPF_FOURCC = 0x4;
  		// let DDPF_RGB = 0x40;
  		// let DDPF_YUV = 0x200;
  		// let DDPF_LUMINANCE = 0x20000;

  		function fourCCToInt32( value ) {

  			return value.charCodeAt( 0 ) +
  				( value.charCodeAt( 1 ) << 8 ) +
  				( value.charCodeAt( 2 ) << 16 ) +
  				( value.charCodeAt( 3 ) << 24 );

  		}

  		function int32ToFourCC( value ) {

  			return String.fromCharCode(
  				value & 0xff,
  				( value >> 8 ) & 0xff,
  				( value >> 16 ) & 0xff,
  				( value >> 24 ) & 0xff
  			);

  		}

  		function loadARGBMip( buffer, dataOffset, width, height ) {

  			const dataLength = width * height * 4;
  			const srcBuffer = new Uint8Array( buffer, dataOffset, dataLength );
  			const byteArray = new Uint8Array( dataLength );
  			let dst = 0;
  			let src = 0;
  			for ( let y = 0; y < height; y ++ ) {

  				for ( let x = 0; x < width; x ++ ) {

  					const b = srcBuffer[ src ]; src ++;
  					const g = srcBuffer[ src ]; src ++;
  					const r = srcBuffer[ src ]; src ++;
  					const a = srcBuffer[ src ]; src ++;
  					byteArray[ dst ] = r; dst ++;	//r
  					byteArray[ dst ] = g; dst ++;	//g
  					byteArray[ dst ] = b; dst ++;	//b
  					byteArray[ dst ] = a; dst ++;	//a

  				}

  			}

  			return byteArray;

  		}

  		const FOURCC_DXT1 = fourCCToInt32( 'DXT1' );
  		const FOURCC_DXT3 = fourCCToInt32( 'DXT3' );
  		const FOURCC_DXT5 = fourCCToInt32( 'DXT5' );
  		const FOURCC_ETC1 = fourCCToInt32( 'ETC1' );

  		const headerLengthInt = 31; // The header length in 32 bit ints

  		// Offsets into the header array

  		const off_magic = 0;

  		const off_size = 1;
  		const off_flags = 2;
  		const off_height = 3;
  		const off_width = 4;

  		const off_mipmapCount = 7;

  		const off_pfFlags = 20;
  		const off_pfFourCC = 21;
  		const off_RGBBitCount = 22;
  		const off_RBitMask = 23;
  		const off_GBitMask = 24;
  		const off_BBitMask = 25;
  		const off_ABitMask = 26;

  		// let off_caps = 27;
  		const off_caps2 = 28;
  		// let off_caps3 = 29;
  		// let off_caps4 = 30;

  		// Parse header

  		const header = new Int32Array( buffer, 0, headerLengthInt );

  		if ( header[ off_magic ] !== DDS_MAGIC ) {

  			console.error( 'THREE.DDSLoader.parse: Invalid magic number in DDS header.' );
  			return dds;

  		}

  		if ( ! header[ off_pfFlags ] & DDPF_FOURCC ) {

  			console.error( 'THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code.' );
  			return dds;

  		}

  		let blockBytes;

  		const fourCC = header[ off_pfFourCC ];

  		let isRGBAUncompressed = false;

  		switch ( fourCC ) {

  			case FOURCC_DXT1:

  				blockBytes = 8;
  				dds.format = THREE.RGB_S3TC_DXT1_Format;
  				break;

  			case FOURCC_DXT3:

  				blockBytes = 16;
  				dds.format = THREE.RGBA_S3TC_DXT3_Format;
  				break;

  			case FOURCC_DXT5:

  				blockBytes = 16;
  				dds.format = THREE.RGBA_S3TC_DXT5_Format;
  				break;

  			case FOURCC_ETC1:

  				blockBytes = 8;
  				dds.format = THREE.RGB_ETC1_Format;
  				break;

  			default:

  				if ( header[ off_RGBBitCount ] === 32
  					&& header[ off_RBitMask ] & 0xff0000
  					&& header[ off_GBitMask ] & 0xff00
  					&& header[ off_BBitMask ] & 0xff
  					&& header[ off_ABitMask ] & 0xff000000 ) {

  					isRGBAUncompressed = true;
  					blockBytes = 64;
  					dds.format = THREE.RGBAFormat;

  				} else {

  					console.error( 'THREE.DDSLoader.parse: Unsupported FourCC code ', int32ToFourCC( fourCC ) );
  					return dds;

  				}

  		}

  		dds.mipmapCount = 1;

  		if ( header[ off_flags ] & DDSD_MIPMAPCOUNT && loadMipmaps !== false ) {

  			dds.mipmapCount = Math.max( 1, header[ off_mipmapCount ] );

  		}

  		const caps2 = header[ off_caps2 ];
  		dds.isCubemap = caps2 & DDSCAPS2_CUBEMAP ? true : false;
  		if ( dds.isCubemap && (
  			! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEX ) ||
  			! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEX ) ||
  			! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEY ) ||
  			! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEY ) ||
  			! ( caps2 & DDSCAPS2_CUBEMAP_POSITIVEZ ) ||
  			! ( caps2 & DDSCAPS2_CUBEMAP_NEGATIVEZ )
  		) ) {

  			console.error( 'THREE.DDSLoader.parse: Incomplete cubemap faces' );
  			return dds;

  		}

  		dds.width = header[ off_width ];
  		dds.height = header[ off_height ];

  		let dataOffset = header[ off_size ] + 4;

  		// Extract mipmaps buffers

  		const faces = dds.isCubemap ? 6 : 1;

  		for ( let face = 0; face < faces; face ++ ) {

  			let width = dds.width;
  			let height = dds.height;

  			for ( let i = 0; i < dds.mipmapCount; i ++ ) {

  				let byteArray, dataLength;

  				if ( isRGBAUncompressed ) {

  					byteArray = loadARGBMip( buffer, dataOffset, width, height );
  					dataLength = byteArray.length;

  				} else {

  					dataLength = Math.max( 4, width ) / 4 * Math.max( 4, height ) / 4 * blockBytes;
  					byteArray = new Uint8Array( buffer, dataOffset, dataLength );

  				}

  				const mipmap = { 'data': byteArray, 'width': width, 'height': height };
  				dds.mipmaps.push( mipmap );

  				dataOffset += dataLength;

  				width = Math.max( width >> 1, 1 );
  				height = Math.max( height >> 1, 1 );

  			}

  		}

  		return dds;

  	}

  }

  /**
   * Function to scale an object so that the child with the largest bounding-sphere radius
   * will end up with a bounding sphere radius equal to the supplied targetRadius
   */

  function resizeThreeJsObject(object, targetRadius) {
    // --------------------------------------------------------------------------->>>
    var biggestSphereRadius = Math.pow(10, -10);
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.geometry.computeBoundingSphere(); // Need to run this, else `child.geometry.boundingSphere.radius` will be undefined

        if (!!child.geometry && !!child.geometry.boundingSphere && child.geometry.boundingSphere.radius > biggestSphereRadius) {
          biggestSphereRadius = child.geometry.boundingSphere.radius;
        }
      }
    });
    var s = targetRadius / biggestSphereRadius;
    object.scale.set(s, s, s);
  }

  /**
   * Simple function to ensure all children receive and cast shadows
   */
  function enshadowChildren(object) {
    object.traverse(function (child) {
      if (child.type === 'Mesh') {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  /**
   * Function to center object on its bounding box
   *
   * An object created in blender may not have its origin at the object's
   * physical center, and this can be annoying when, say, you want to rotate
   * that object. This function will shift the object relative to its parent
   * coordinate system so that its center is at the parent's origin; that means
   * you can then e.g. rotate the parent to get a realistic/useful rotation effect
   * on this object
   */

  function centerOnBoundingBox(object) {
    // ----------------------------------------------------->>>
    // Get center of boundingBox
    var boundingBox = new THREE.Box3().setFromObject(object);

    var _boundingBox$getCente = boundingBox.getCenter(new THREE.Vector3()).toArray(),
        x2 = _boundingBox$getCente[0],
        y2 = _boundingBox$getCente[1],
        z2 = _boundingBox$getCente[2]; // Move object to where center was


    var _object$position$clon = object.position.clone().toArray(),
        x1 = _object$position$clon[0],
        y1 = _object$position$clon[1],
        z1 = _object$position$clon[2];

    object.position.set(x1 - x2, y1 - y2, z1 - z2);
  }

  /**
   * Wrapper around OBJLoader and MTLLoader letting you just specify
   * urls to the obj and mtl files, a scaling factor, and a callback to use
   * on the resulting threeJs object
   * Patterns taken from: https://threejs.org/examples/webgl_loader_obj_mtl.html
   */

  function MTLOBJLoader(mtlUrl, objUrl, cbOnReady, targetRadius, isCenteredOnBoundingBox, isShadowShown) {
    // --->>>
    var manager = new THREE.LoadingManager();
    manager.addHandler(/\.dds$/i, new DDSLoader());
    new MTLLoader(manager).load(mtlUrl, function (materials) {
      // --->>>
      materials.preload();
      new OBJLoader().setMaterials(materials).load(objUrl, function (object) {
        if (!!targetRadius) resizeThreeJsObject(object, targetRadius);
        if (!!isCenteredOnBoundingBox) centerOnBoundingBox(object);
        if (!!isShadowShown) enshadowChildren(object);
        cbOnReady(object); // Signal object readiness
      }, function (xhr) {
        // Called when loading is in progress
        console.log(xhr.loaded / xhr.total * 100 + '% loaded');
      }, function (error) {
        console.log('Loading error occurred:', error.message);
      });
    });
  }

  /**
   * Base class that any entity must extend in order that its threeJs group
   * might get added to the threeJs scene owned by the manager
   */

  var AbstractSceneEntity = function AbstractSceneEntity() {
    var _this = this;

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>
    this._sceneEntityGroup = new THREE.Group();

    this.getSceneEntityGroup = function () {
      return _this._sceneEntityGroup;
    };
  };

  var DemoObjLoader = /*#__PURE__*/function (_AbstractSceneEntity) {
    _inheritsLoose(DemoObjLoader, _AbstractSceneEntity);

    function DemoObjLoader() {
      var _this;

      // ~~~>>>
      _this = _AbstractSceneEntity.apply(this, arguments) || this;

      _this.update = function (time) {
        _this._sceneEntityGroup.rotateY(time * 0 + 0.001);
      };

      return _this;
    }

    var _proto = DemoObjLoader.prototype;

    _proto.init = /*#__PURE__*/function () {
      var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var _this2 = this;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  // --->>>
                  var onObjectLoad = function onObjectLoad(loadedThreeJsObject) {
                    // --->>>
                    // Add loaded object and rotate whole group
                    _this2._sceneEntityGroup.add(loadedThreeJsObject);

                    _this2._sceneEntityGroup.rotateX(Math.PI / 2); // Create helper box around loaded object


                    // Create helper box around loaded object
                    var helperBox = new THREE.BoxHelper(loadedThreeJsObject, 0xffff00);
                    helperBox.userData.isHelper = true;

                    _this2._sceneEntityGroup.add(helperBox); // Add helper sphere to origin of group to illustrate it


                    // Add helper sphere to origin of group to illustrate it
                    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshPhongMaterial({
                      color: 'white',
                      opacity: 0.5
                    }));
                    sphere.userData.isHelper = true;

                    _this2._sceneEntityGroup.add(sphere); // Add helperBox to all children of loadedObject


                    // Add helperBox to all children of loadedObject
                    loadedThreeJsObject.traverse(function (child) {
                      child.visible = true;
                      var helperBox0 = new THREE.BoxHelper(child, 0xffff00);
                      helperBox0.userData.isHelper = true;

                      _this2._sceneEntityGroup.add(helperBox0);
                    });
                    resolve(_this2._sceneEntityGroup);
                  }; // Test loader-wrappers for MTL-OBJ and FBX files


                  // Test loader-wrappers for MTL-OBJ and FBX files
                  {
                    MTLOBJLoader( // 'https://raw.githubusercontent.com/d-w-d/tsdx-threejs-template/main/images/low-poly-well.mtl',
                    // 'https://raw.githubusercontent.com/d-w-d/tsdx-threejs-template/main/images/low-poly-well.obj',
                    'https://threejs.org/examples/models/obj/male02/male02_dds.mtl', 'https://threejs.org/examples/models/obj/male02/male02.obj', onObjectLoad, 5, true, true);
                  }
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    return DemoObjLoader;
  }(AbstractSceneEntity);

  var MiscHelpers = /*#__PURE__*/function (_AbstractSceneEntity) {
    _inheritsLoose(MiscHelpers, _AbstractSceneEntity);

    function MiscHelpers() {
      var _this;

      _this = _AbstractSceneEntity.apply(this, arguments) || this;

      _this.update = function (time) {
        _this._sceneEntityGroup.position.x += time * 0;
      };

      return _this;
    }

    var _proto = MiscHelpers.prototype;

    _proto.init = /*#__PURE__*/function () {
      var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var _this2 = this;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  var axesHelper = new THREE.AxesHelper(500); // Mark this as helper in order to be toggle-able

                  // Mark this as helper in order to be toggle-able
                  axesHelper.userData.isHelper = true;

                  _this2._sceneEntityGroup.add(axesHelper);

                  resolve(_this2._sceneEntityGroup);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    return MiscHelpers;
  }(AbstractSceneEntity);

  var SimpleLight = /*#__PURE__*/function (_AbstractSceneEntity) {
    _inheritsLoose(SimpleLight, _AbstractSceneEntity);

    function SimpleLight() {
      var _this;

      _this = _AbstractSceneEntity.apply(this, arguments) || this;

      _this.update = function (time) {
        _this._sceneEntityGroup.position.x += time * 0;
      };

      return _this;
    }

    var _proto = SimpleLight.prototype;

    _proto.init = /*#__PURE__*/function () {
      var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var _this2 = this;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  //
                  var light = new THREE.AmbientLight(0x333333, 0.3);
                  light.userData.isAmbientLight = true;

                  _this2._sceneEntityGroup.add(light);

                  resolve(_this2._sceneEntityGroup);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    return SimpleLight;
  }(AbstractSceneEntity);

  var Square = /*#__PURE__*/function (_AbstractSceneEntity) {
    _inheritsLoose(Square, _AbstractSceneEntity);

    // ~~~>>>
    function Square(sideLength) {
      var _this;

      _this = _AbstractSceneEntity.call(this) || this;
      _this.sideLength = sideLength;

      _this.update = function (time) {
        _this._sceneEntityGroup.position.x += time * 0;
      };

      return _this;
    }

    var _proto = Square.prototype;

    _proto.init = /*#__PURE__*/function () {
      var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var _this2 = this;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  _this2._sceneEntityGroup.add(new THREE.Mesh(new THREE.BoxGeometry(_this2.sideLength, _this2.sideLength, _this2.sideLength), new THREE.MeshPhongMaterial()));

                  _this2._sceneEntityGroup.position.z = -10;
                  resolve(_this2._sceneEntityGroup);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    return Square;
  }(AbstractSceneEntity);

  var DirectionalLight = /*#__PURE__*/function (_AbstractSceneEntity) {
    _inheritsLoose(DirectionalLight, _AbstractSceneEntity);

    function DirectionalLight() {
      var _this;

      _this = _AbstractSceneEntity.apply(this, arguments) || this;

      _this.update = function (time) {
        _this._sceneEntityGroup.position.x += time * 0;
      };

      return _this;
    }

    var _proto = DirectionalLight.prototype;

    _proto.init = /*#__PURE__*/function () {
      var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
        var _this2 = this;

        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  var light = new THREE.DirectionalLight(0xffffff, 1);
                  light.position.set(10, 10, 10);
                  light.lookAt(0, 0, 0);
                  light.castShadow = true;

                  _this2._sceneEntityGroup.add(light);

                  var helper = new THREE.DirectionalLightHelper(light, 5);
                  helper.userData.isHelper = true;

                  _this2._sceneEntityGroup.add(light);

                  _this2._sceneEntityGroup.add(helper);

                  resolve(_this2._sceneEntityGroup);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }();

    return DirectionalLight;
  }(AbstractSceneEntity);

  /**
   * Implement a scene for this app with 'real' entities
   */

  var SceneManager = /*#__PURE__*/function (_AbstractSceneManager) {
    _inheritsLoose(SceneManager, _AbstractSceneManager);

    function SceneManager(containerId) {
      var _this;

      // -------------------------->>>
      _this = _AbstractSceneManager.call(this, containerId) || this; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>

      _this.isRotating = false;

      _this.updateCamera = function (time) {
        // -------------------------->>>
        // if (!this.isRotating) return;
        // Logic for random rotation
        // This illustrates some important concepts for controlling camera
        var f = 0.5;
        var c = 1.111;
        var x = 10 * Math.sin(time * 0.1 * f) + c;
        var y = 10 * Math.cos(time * 0.1 * f * 2 + Math.PI) + c;
        var z = 10 * Math.sin(time * 0.1 * f + Math.PI * 0.5) + c;
        _this._camera.position.x = x;
        _this._camera.position.y = y;
        _this._camera.position.z = z; // Logic to prevent camera reorientation at zenith
        // Allows world to go upside down; nauseating

        var presentLookVector = new THREE.Vector3(0, 0, -1);
        presentLookVector.applyQuaternion(_this._camera.quaternion);

        _this._camera.up.copy(presentLookVector);

        _this._camera.lookAt(0, 0, 0);
      };

      _this.toggleRotation = function () {
        _this.isRotating = !_this.isRotating; // Reset camera

        if (_this.isRotating) {
          _this._orbitControls.enabled = false;
        } else {
          _this._camera.position.copy(_this._initialViewingVector);

          _this._camera.up.copy(new THREE.Vector3(0, 0, 1));

          _this._orbitControls.enabled = true;
        }
      };

      _this.addSceneEntities([new DemoObjLoader(), new MiscHelpers(), new SimpleLight(), new Square(1), new DirectionalLight()]); // Logic to run before scene initialization


      _this.preInitHook = function () {}; // Logic to run after scene initialization


      _this.postInitHook = function () {// this._orbitControls!.enabled = false;
      }; // Set initial camera position


      _this._initialViewingVector = new THREE.Vector3(6, 15, 9); // Add listeners, subscriptions, etc.
      // !BE SURE TO ADD CORRESPONDING TERMINARTORS TO this.destroyHook()!

      _this.tempInterval = setInterval(function () {
        console.log('>>> Hmmm');
      }, 1000);

      _this.destroyHook = function () {
        console.log('Clearing interval');
        clearInterval(_this.tempInterval);
      };

      return _this;
    }

    return SceneManager;
  }(AbstractSceneManager);

  /**
   *  React wrapper
   */

  function TsdxThreejsTemplate(props) {
    // --->>>
    var _width$height$backgro = _extends({
      width: '100%',
      height: '100%',
      backgroundColor: 'grey'
    }, props),
        width = _width$height$backgro.width,
        height = _width$height$backgro.height,
        backgroundColor = _width$height$backgro.backgroundColor;

    var id = 'this-id-will-never-be-duplicated-says-007';
    React.useEffect(function () {
      init(id);
      return function () {
        destroy();
        console.log('Widget app removed!!!');
      };
    }, []);
    return React.createElement("div", {
      id: id,
      style: {
        width: width,
        height: height,
        backgroundColor: backgroundColor
      }
    });
  }

  var threejsScene;
  /**
   * Create threeJs canvas and inject into container
   */

  function init(containerId) {
    if (containerId === void 0) {
      containerId = 'threejs-canvas-container';
    }

    // --->>>
    // Get div to contain canvas
    var canvasContainer = document.getElementById(containerId);
    if (!canvasContainer) throw new Error("Can't find div of id " + containerId);
    threejsScene = new SceneManager(containerId);
    threejsScene.init();
  }
  /**
   * Destroy
   */

  function destroy() {
    // --->>>
    threejsScene.destroy();
  }

  exports.TsdxThreejsTemplate = TsdxThreejsTemplate;
  exports.destroy = destroy;
  exports.init = init;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tsdxthreejstemplate.umd.development.js.map
