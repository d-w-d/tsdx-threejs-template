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
      this._isInit = false;
      this._fps = 60;
      this._camera = new THREE.PerspectiveCamera(initialCameraParams.fieldOfView, initialCameraParams.aspectRatio, initialCameraParams.nearPlane, initialCameraParams.farPlane);
      this._sceneEntities = [];

      this.updateCamera = function () {};

      this.preInitHook = function () {};

      this.postInitHook = function () {};

      this._render = function () {
        if (!!_this._fps) {
          setTimeout(function () {
            _this._requestAnimationFrameId = requestAnimationFrame(_this._render);

            _this.update();
          }, 1000 / _this._fps);
        } else {
          _this._requestAnimationFrameId = requestAnimationFrame(_this._render);

          _this.update();
        }
      };

      this._stopRendering = function () {
        if (!!_this._requestAnimationFrameId) {
          cancelAnimationFrame(_this._requestAnimationFrameId);
          _this._requestAnimationFrameId = undefined;
        }
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
                container.append(this._canvas); // Build Renderer

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
                  _context2.next = 26;
                  break;
                }

                this._orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

                this._orbitControls.dampingFactor = 0.25;
                _context2.next = 34;
                break;

              case 26:
                if (!(this._orbitControls instanceof TrackballControls)) {
                  _context2.next = 33;
                  break;
                }

                this._orbitControls.rotateSpeed = 10.0;
                this._orbitControls.zoomSpeed = 1.2;
                this._orbitControls.panSpeed = 0.8;
                this._orbitControls.keys = ['65', '83', '68']; // a s d

                _context2.next = 34;
                break;

              case 33:
                throw Error('Poor Logic');

              case 34:
                if (this._sceneEntities.length) {
                  _context2.next = 36;
                  break;
                }

                throw new Error(asciiError('You have no scene entities!'));

              case 36:
                _context2.next = 38;
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

              case 38:
                // Run updater methods
                this.setHelpersVisibility(false);
                this.updateCameraAspect(); // Begin Animation

                this._clock.start();

                this._render(); // Enable superclass constructor to adjust settings after to initialization sequence


                this.postInitHook();

              case 43:
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
    };

    _proto.update = function update() {
      var _this$_orbitControls;

      // Loop through scene entities and trigger their update methods
      var elapsedTime = !!this._clock ? this._clock.getElapsedTime() : 0;

      this._sceneEntities.forEach(function (el) {
        return el.update(elapsedTime);
      }); // Update camera


      this.updateCamera(elapsedTime); // Needed for TrackballControls

      (_this$_orbitControls = this._orbitControls) == null ? void 0 : _this$_orbitControls.update(); // Finish loop

      if (!this._camera || !this._renderer) throw new Error('Poor Logic');

      this._renderer.render(this._scene, this._camera);
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
      // Not sure where/how, but canvas' style width/height
      // gets altered and needs to be reset to 100%
      this._canvas.style.width = '100%';
      this._canvas.style.height = '100%';
      var width = this._canvas.offsetWidth || 1;
      var height = this._canvas.offsetHeight || 1;
      this._camera.aspect = width / height;

      this._camera.updateProjectionMatrix();

      this._renderer.setSize(width, height);
    };

    return AbstractSceneManager;
  }();

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

  /*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  */

  // DEFLATE is a complex format; to read this code, you should probably check the RFC first:
  // https://tools.ietf.org/html/rfc1951
  // You may also wish to take a look at the guide I made about this program:
  // https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
  // Some of the following code is similar to that of UZIP.js:
  // https://github.com/photopea/UZIP.js
  // However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
  // Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
  // is better for memory in most engines (I *think*).
  var ch2 = {};
  var durl = function (c) { return URL.createObjectURL(new Blob([c], { type: 'text/javascript' })); };
  var cwk = function (u) { return new Worker(u); };
  try {
      URL.revokeObjectURL(durl(''));
  }
  catch (e) {
      // We're in Deno or a very old browser
      durl = function (c) { return 'data:application/javascript;charset=UTF-8,' + encodeURI(c); };
      // If Deno, this is necessary; if not, this changes nothing
      cwk = function (u) { return new Worker(u, { type: 'module' }); };
  }
  var wk = (function (c, id, msg, transfer, cb) {
      var w = cwk(ch2[id] || (ch2[id] = durl(c)));
      w.onerror = function (e) { return cb(e.error, null); };
      w.onmessage = function (e) { return cb(null, e.data); };
      w.postMessage(msg, transfer);
      return w;
  });

  // aliases for shorter compressed code (most minifers don't do this)
  var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
  // fixed length extra bits
  var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
  // fixed distance extra bits
  // see fleb note
  var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
  // code length index map
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  // get base, reverse index map from extra bits
  var freb = function (eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
          b[i] = start += 1 << eb[i - 1];
      }
      // numbers here are at max 18 bits
      var r = new u32(b[30]);
      for (var i = 1; i < 30; ++i) {
          for (var j = b[i]; j < b[i + 1]; ++j) {
              r[j] = ((j - b[i]) << 5) | i;
          }
      }
      return [b, r];
  };
  var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
  // we can ignore the fact that the other numbers are wrong; they never happen anyway
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
  // map of value to reverse (assuming 16 bits)
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
      // reverse table algorithm from SO
      var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
      x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
      x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
      rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
  }
  // create huffman tree from u8 "map": index -> code length for code index
  // mb (max bits) must be at most 15
  // TODO: optimize/split up?
  var hMap = (function (cd, mb, r) {
      var s = cd.length;
      // index
      var i = 0;
      // u16 "map": index -> # of codes with bit length = index
      var l = new u16(mb);
      // length of cd must be 288 (total # of codes)
      for (; i < s; ++i)
          ++l[cd[i] - 1];
      // u16 "map": index -> minimum code for bit length = index
      var le = new u16(mb);
      for (i = 0; i < mb; ++i) {
          le[i] = (le[i - 1] + l[i - 1]) << 1;
      }
      var co;
      if (r) {
          // u16 "map": index -> number of actual bits, symbol for code
          co = new u16(1 << mb);
          // bits to remove for reverser
          var rvb = 15 - mb;
          for (i = 0; i < s; ++i) {
              // ignore 0 lengths
              if (cd[i]) {
                  // num encoding both symbol and bits read
                  var sv = (i << 4) | cd[i];
                  // free bits
                  var r_1 = mb - cd[i];
                  // start value
                  var v = le[cd[i] - 1]++ << r_1;
                  // m is end value
                  for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                      // every 16 bit value starting with the code yields the same result
                      co[rev[v] >>> rvb] = sv;
                  }
              }
          }
      }
      else {
          co = new u16(s);
          for (i = 0; i < s; ++i) {
              if (cd[i]) {
                  co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
              }
          }
      }
      return co;
  });
  // fixed length tree
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
      flt[i] = 8;
  for (var i = 144; i < 256; ++i)
      flt[i] = 9;
  for (var i = 256; i < 280; ++i)
      flt[i] = 7;
  for (var i = 280; i < 288; ++i)
      flt[i] = 8;
  // fixed distance tree
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
      fdt[i] = 5;
  // fixed length map
  var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
  // fixed distance map
  var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
  // find max of array
  var max = function (a) {
      var m = a[0];
      for (var i = 1; i < a.length; ++i) {
          if (a[i] > m)
              m = a[i];
      }
      return m;
  };
  // read d, starting at bit p and mask with m
  var bits = function (d, p, m) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
  };
  // read d, starting at bit p continuing for at least 16 bits
  var bits16 = function (d, p) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
  };
  // get end of byte
  var shft = function (p) { return ((p / 8) | 0) + (p & 7 && 1); };
  // typed array slice - allows garbage collector to free original reference,
  // while being more compatible than .slice
  var slc = function (v, s, e) {
      if (s == null || s < 0)
          s = 0;
      if (e == null || e > v.length)
          e = v.length;
      // can't use .constructor in case user-supplied
      var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
      n.set(v.subarray(s, e));
      return n;
  };
  // expands raw DEFLATE data
  var inflt = function (dat, buf, st) {
      // source length
      var sl = dat.length;
      if (!sl || (st && !st.l && sl < 5))
          return buf || new u8(0);
      // have to estimate size
      var noBuf = !buf || st;
      // no state
      var noSt = !st || st.i;
      if (!st)
          st = {};
      // Assumes roughly 33% compression ratio average
      if (!buf)
          buf = new u8(sl * 3);
      // ensure buffer can fit at least l elements
      var cbuf = function (l) {
          var bl = buf.length;
          // need to increase size to fit
          if (l > bl) {
              // Double or set to necessary, whichever is greater
              var nbuf = new u8(Math.max(bl * 2, l));
              nbuf.set(buf);
              buf = nbuf;
          }
      };
      //  last chunk         bitpos           bytes
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      // total bits
      var tbts = sl * 8;
      do {
          if (!lm) {
              // BFINAL - this is only 1 when last chunk is next
              st.f = final = bits(dat, pos, 1);
              // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
              var type = bits(dat, pos + 1, 3);
              pos += 3;
              if (!type) {
                  // go to end of byte boundary
                  var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                  if (t > sl) {
                      if (noSt)
                          throw 'unexpected EOF';
                      break;
                  }
                  // ensure size
                  if (noBuf)
                      cbuf(bt + l);
                  // Copy over uncompressed data
                  buf.set(dat.subarray(s, t), bt);
                  // Get new bitpos, update byte count
                  st.b = bt += l, st.p = pos = t * 8;
                  continue;
              }
              else if (type == 1)
                  lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
              else if (type == 2) {
                  //  literal                            lengths
                  var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                  var tl = hLit + bits(dat, pos + 5, 31) + 1;
                  pos += 14;
                  // length+distance tree
                  var ldt = new u8(tl);
                  // code length tree
                  var clt = new u8(19);
                  for (var i = 0; i < hcLen; ++i) {
                      // use index map to get real code
                      clt[clim[i]] = bits(dat, pos + i * 3, 7);
                  }
                  pos += hcLen * 3;
                  // code lengths bits
                  var clb = max(clt), clbmsk = (1 << clb) - 1;
                  // code lengths map
                  var clm = hMap(clt, clb, 1);
                  for (var i = 0; i < tl;) {
                      var r = clm[bits(dat, pos, clbmsk)];
                      // bits read
                      pos += r & 15;
                      // symbol
                      var s = r >>> 4;
                      // code length to copy
                      if (s < 16) {
                          ldt[i++] = s;
                      }
                      else {
                          //  copy   count
                          var c = 0, n = 0;
                          if (s == 16)
                              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                          else if (s == 17)
                              n = 3 + bits(dat, pos, 7), pos += 3;
                          else if (s == 18)
                              n = 11 + bits(dat, pos, 127), pos += 7;
                          while (n--)
                              ldt[i++] = c;
                      }
                  }
                  //    length tree                 distance tree
                  var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                  // max length bits
                  lbt = max(lt);
                  // max dist bits
                  dbt = max(dt);
                  lm = hMap(lt, lbt, 1);
                  dm = hMap(dt, dbt, 1);
              }
              else
                  throw 'invalid block type';
              if (pos > tbts) {
                  if (noSt)
                      throw 'unexpected EOF';
                  break;
              }
          }
          // Make sure the buffer can hold this + the largest possible addition
          // Maximum chunk size (practically, theoretically infinite) is 2^17;
          if (noBuf)
              cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (;; lpos = pos) {
              // bits read, code
              var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
              pos += c & 15;
              if (pos > tbts) {
                  if (noSt)
                      throw 'unexpected EOF';
                  break;
              }
              if (!c)
                  throw 'invalid length/literal';
              if (sym < 256)
                  buf[bt++] = sym;
              else if (sym == 256) {
                  lpos = pos, lm = null;
                  break;
              }
              else {
                  var add = sym - 254;
                  // no extra bits needed if less
                  if (sym > 264) {
                      // index
                      var i = sym - 257, b = fleb[i];
                      add = bits(dat, pos, (1 << b) - 1) + fl[i];
                      pos += b;
                  }
                  // dist
                  var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                  if (!d)
                      throw 'invalid distance';
                  pos += d & 15;
                  var dt = fd[dsym];
                  if (dsym > 3) {
                      var b = fdeb[dsym];
                      dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                  }
                  if (pos > tbts) {
                      if (noSt)
                          throw 'unexpected EOF';
                      break;
                  }
                  if (noBuf)
                      cbuf(bt + 131072);
                  var end = bt + add;
                  for (; bt < end; bt += 4) {
                      buf[bt] = buf[bt - dt];
                      buf[bt + 1] = buf[bt + 1 - dt];
                      buf[bt + 2] = buf[bt + 2 - dt];
                      buf[bt + 3] = buf[bt + 3 - dt];
                  }
                  bt = end;
              }
          }
          st.l = lm, st.p = lpos, st.b = bt;
          if (lm)
              final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  // starting at p, write the minimum number of bits that can hold v to d
  var wbits = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
  };
  // starting at p, write the minimum number of bits (>8) that can hold v to d
  var wbits16 = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
      d[o + 2] |= v >>> 16;
  };
  // creates code lengths from a frequency table
  var hTree = function (d, mb) {
      // Need extra info to make a tree
      var t = [];
      for (var i = 0; i < d.length; ++i) {
          if (d[i])
              t.push({ s: i, f: d[i] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
          return [et, 0];
      if (s == 1) {
          var v = new u8(t[0].s + 1);
          v[t[0].s] = 1;
          return [v, 1];
      }
      t.sort(function (a, b) { return a.f - b.f; });
      // after i2 reaches last ind, will be stopped
      // freq must be greater than largest possible number of symbols
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
      t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
      // efficient algorithm from UZIP.js
      // i0 is lookbehind, i2 is lookahead - after processing two low-freq
      // symbols that combined have high freq, will start processing i2 (high-freq,
      // non-composite) symbols instead
      // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
      while (i1 != s - 1) {
          l = t[t[i0].f < t[i2].f ? i0++ : i2++];
          r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
          t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
      }
      var maxSym = t2[0].s;
      for (var i = 1; i < s; ++i) {
          if (t2[i].s > maxSym)
              maxSym = t2[i].s;
      }
      // code lengths
      var tr = new u16(maxSym + 1);
      // max bits in tree
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
          // more algorithms from UZIP.js
          // TODO: find out how this code works (debt)
          //  ind    debt
          var i = 0, dt = 0;
          //    left            cost
          var lft = mbt - mb, cst = 1 << lft;
          t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
          for (; i < s; ++i) {
              var i2_1 = t2[i].s;
              if (tr[i2_1] > mb) {
                  dt += cst - (1 << (mbt - tr[i2_1]));
                  tr[i2_1] = mb;
              }
              else
                  break;
          }
          dt >>>= lft;
          while (dt > 0) {
              var i2_2 = t2[i].s;
              if (tr[i2_2] < mb)
                  dt -= 1 << (mb - tr[i2_2]++ - 1);
              else
                  ++i;
          }
          for (; i >= 0 && dt; --i) {
              var i2_3 = t2[i].s;
              if (tr[i2_3] == mb) {
                  --tr[i2_3];
                  ++dt;
              }
          }
          mbt = mb;
      }
      return [new u8(tr), mbt];
  };
  // get the max length and assign length codes
  var ln = function (n, l, d) {
      return n.s == -1
          ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
          : (l[n.s] = d);
  };
  // length codes generation
  var lc = function (c) {
      var s = c.length;
      // Note that the semicolon was intentional
      while (s && !c[--s])
          ;
      var cl = new u16(++s);
      //  ind      num         streak
      var cli = 0, cln = c[0], cls = 1;
      var w = function (v) { cl[cli++] = v; };
      for (var i = 1; i <= s; ++i) {
          if (c[i] == cln && i != s)
              ++cls;
          else {
              if (!cln && cls > 2) {
                  for (; cls > 138; cls -= 138)
                      w(32754);
                  if (cls > 2) {
                      w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                      cls = 0;
                  }
              }
              else if (cls > 3) {
                  w(cln), --cls;
                  for (; cls > 6; cls -= 6)
                      w(8304);
                  if (cls > 2)
                      w(((cls - 3) << 5) | 8208), cls = 0;
              }
              while (cls--)
                  w(cln);
              cls = 1;
              cln = c[i];
          }
      }
      return [cl.subarray(0, cli), s];
  };
  // calculate the length of output from tree, code lengths
  var clen = function (cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
          l += cf[i] * cl[i];
      return l;
  };
  // writes a fixed block
  // returns the new bit pos
  var wfblk = function (out, pos, dat) {
      // no need to write 00 as type: TypedArray defaults to 0
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >>> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
          out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
  };
  // writes a block
  var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
      var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
      var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
      var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
          lcfreq[lclt[i] & 31]++;
      for (var i = 0; i < lcdt.length; ++i)
          lcfreq[lcdt[i] & 31]++;
      var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
          ;
      var flen = (bl + 5) << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
      if (flen <= ftlen && flen <= dtlen)
          return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
          lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
          var llm = hMap(lct, mlcb, 0);
          wbits(out, p, nlc - 257);
          wbits(out, p + 5, ndc - 1);
          wbits(out, p + 10, nlcc - 4);
          p += 14;
          for (var i = 0; i < nlcc; ++i)
              wbits(out, p + 3 * i, lct[clim[i]]);
          p += 3 * nlcc;
          var lcts = [lclt, lcdt];
          for (var it = 0; it < 2; ++it) {
              var clct = lcts[it];
              for (var i = 0; i < clct.length; ++i) {
                  var len = clct[i] & 31;
                  wbits(out, p, llm[len]), p += lct[len];
                  if (len > 15)
                      wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
              }
          }
      }
      else {
          lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
          if (syms[i] > 255) {
              var len = (syms[i] >>> 18) & 31;
              wbits16(out, p, lm[len + 257]), p += ll[len + 257];
              if (len > 7)
                  wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
              var dst = syms[i] & 31;
              wbits16(out, p, dm[dst]), p += dl[dst];
              if (dst > 3)
                  wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
          }
          else {
              wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
          }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
  };
  // deflate options (nice << 13) | chain
  var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  // empty
  var et = /*#__PURE__*/ new u8(0);
  // compresses data into a raw DEFLATE buffer
  var dflt = function (dat, lvl, plvl, pre, post, lst) {
      var s = dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
      // writing to this writes to the output buffer
      var w = o.subarray(pre, o.length - post);
      var pos = 0;
      if (!lvl || s < 8) {
          for (var i = 0; i <= s; i += 65535) {
              // end
              var e = i + 65535;
              if (e < s) {
                  // write full block
                  pos = wfblk(w, pos, dat.subarray(i, e));
              }
              else {
                  // write final block
                  w[i] = lst;
                  pos = wfblk(w, pos, dat.subarray(i, s));
              }
          }
      }
      else {
          var opt = deo[lvl - 1];
          var n = opt >>> 13, c = opt & 8191;
          var msk_1 = (1 << plvl) - 1;
          //    prev 2-byte val map    curr 2-byte val map
          var prev = new u16(32768), head = new u16(msk_1 + 1);
          var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
          var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
          // 24576 is an arbitrary number of maximum symbols per block
          // 424 buffer for last block
          var syms = new u32(25000);
          // length/literal freq   distance freq
          var lf = new u16(288), df = new u16(32);
          //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
          var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
          for (; i < s; ++i) {
              // hash value
              // deopt when i > s - 3 - at end, deopt acceptable
              var hv = hsh(i);
              // index mod 32768    previous index mod
              var imod = i & 32767, pimod = head[hv];
              prev[imod] = pimod;
              head[hv] = imod;
              // We always should modify head and prev, but only add symbols if
              // this data is not yet processed ("wait" for wait index)
              if (wi <= i) {
                  // bytes remaining
                  var rem = s - i;
                  if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                      pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                      li = lc_1 = eb = 0, bs = i;
                      for (var j = 0; j < 286; ++j)
                          lf[j] = 0;
                      for (var j = 0; j < 30; ++j)
                          df[j] = 0;
                  }
                  //  len    dist   chain
                  var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                  if (rem > 2 && hv == hsh(i - dif)) {
                      var maxn = Math.min(n, rem) - 1;
                      var maxd = Math.min(32767, i);
                      // max possible length
                      // not capped at dif because decompressors implement "rolling" index population
                      var ml = Math.min(258, rem);
                      while (dif <= maxd && --ch_1 && imod != pimod) {
                          if (dat[i + l] == dat[i + l - dif]) {
                              var nl = 0;
                              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                  ;
                              if (nl > l) {
                                  l = nl, d = dif;
                                  // break out early when we reach "nice" (we are satisfied enough)
                                  if (nl > maxn)
                                      break;
                                  // now, find the rarest 2-byte sequence within this
                                  // length of literals and search for that instead.
                                  // Much faster than just using the start
                                  var mmd = Math.min(dif, nl - 2);
                                  var md = 0;
                                  for (var j = 0; j < mmd; ++j) {
                                      var ti = (i - dif + j + 32768) & 32767;
                                      var pti = prev[ti];
                                      var cd = (ti - pti + 32768) & 32767;
                                      if (cd > md)
                                          md = cd, pimod = ti;
                                  }
                              }
                          }
                          // check the previous match
                          imod = pimod, pimod = prev[imod];
                          dif += (imod - pimod + 32768) & 32767;
                      }
                  }
                  // d will be nonzero only when a match was found
                  if (d) {
                      // store both dist and len data in one Uint32
                      // Make sure this is recognized as a len/dist with 28th bit (2^28)
                      syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                      var lin = revfl[l] & 31, din = revfd[d] & 31;
                      eb += fleb[lin] + fdeb[din];
                      ++lf[257 + lin];
                      ++df[din];
                      wi = i + l;
                      ++lc_1;
                  }
                  else {
                      syms[li++] = dat[i];
                      ++lf[dat[i]];
                  }
              }
          }
          pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
          // this is the easiest way to avoid needing to maintain state
          if (!lst && pos & 7)
              pos = wfblk(w, pos + 1, et);
      }
      return slc(o, 0, pre + shft(pos) + post);
  };
  // CRC32 table
  var crct = /*#__PURE__*/ (function () {
      var t = new u32(256);
      for (var i = 0; i < 256; ++i) {
          var c = i, k = 9;
          while (--k)
              c = ((c & 1) && 0xEDB88320) ^ (c >>> 1);
          t[i] = c;
      }
      return t;
  })();
  // CRC32
  var crc = function () {
      var c = -1;
      return {
          p: function (d) {
              // closures have awful performance
              var cr = c;
              for (var i = 0; i < d.length; ++i)
                  cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
              c = cr;
          },
          d: function () { return ~c; }
      };
  };
  // Alder32
  var adler = function () {
      var a = 1, b = 0;
      return {
          p: function (d) {
              // closures have awful performance
              var n = a, m = b;
              var l = d.length;
              for (var i = 0; i != l;) {
                  var e = Math.min(i + 2655, l);
                  for (; i < e; ++i)
                      m += n += d[i];
                  n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
              }
              a = n, b = m;
          },
          d: function () {
              a %= 65521, b %= 65521;
              return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
          }
      };
  };
  // deflate with opts
  var dopt = function (dat, opt, pre, post, st) {
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
  };
  // Walmart object spread
  var mrg = function (a, b) {
      var o = {};
      for (var k in a)
          o[k] = a[k];
      for (var k in b)
          o[k] = b[k];
      return o;
  };
  // worker clone
  // This is possibly the craziest part of the entire codebase, despite how simple it may seem.
  // The only parameter to this function is a closure that returns an array of variables outside of the function scope.
  // We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
  // We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
  // The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
  // This took me three weeks to figure out how to do.
  var wcln = function (fn, fnStr, td) {
      var dt = fn();
      var st = fn.toString();
      var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/ /g, '').split(',');
      for (var i = 0; i < dt.length; ++i) {
          var v = dt[i], k = ks[i];
          if (typeof v == 'function') {
              fnStr += ';' + k + '=';
              var st_1 = v.toString();
              if (v.prototype) {
                  // for global objects
                  if (st_1.indexOf('[native code]') != -1) {
                      var spInd = st_1.indexOf(' ', 8) + 1;
                      fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                  }
                  else {
                      fnStr += st_1;
                      for (var t in v.prototype)
                          fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                  }
              }
              else
                  fnStr += st_1;
          }
          else
              td[k] = v;
      }
      return [fnStr, td];
  };
  var ch = [];
  // clone bufs
  var cbfs = function (v) {
      var tl = [];
      for (var k in v) {
          if (v[k] instanceof u8 || v[k] instanceof u16 || v[k] instanceof u32)
              tl.push((v[k] = new v[k].constructor(v[k])).buffer);
      }
      return tl;
  };
  // use a worker to execute code
  var wrkr = function (fns, init, id, cb) {
      var _a;
      if (!ch[id]) {
          var fnStr = '', td_1 = {}, m = fns.length - 1;
          for (var i = 0; i < m; ++i)
              _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
          ch[id] = wcln(fns[m], fnStr, td_1);
      }
      var td = mrg({}, ch[id][1]);
      return wk(ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
  };
  // base async inflate fn
  var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, hMap, max, bits, bits16, shft, slc, inflt, inflateSync, pbf, gu8]; };
  var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
  // gzip extra
  var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
  // gunzip extra
  var guze = function () { return [gzs, gzl]; };
  // zlib extra
  var zle = function () { return [zlh, wbytes, adler]; };
  // unzlib extra
  var zule = function () { return [zlv]; };
  // post buf
  var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
  // get u8
  var gu8 = function (o) { return o && o.size && new u8(o.size); };
  // async helper
  var cbify = function (dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, function (err, dat) {
          w.terminate();
          cb(err, dat);
      });
      w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
      return function () { w.terminate(); };
  };
  // auto stream
  var astrm = function (strm) {
      strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
      return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
  };
  // async stream attach
  var astrmify = function (fns, strm, opts, init, id) {
      var t;
      var w = wrkr(fns, init, id, function (err, dat) {
          if (err)
              w.terminate(), strm.ondata.call(strm, err);
          else {
              if (dat[1])
                  w.terminate();
              strm.ondata.call(strm, err, dat[0], dat[1]);
          }
      });
      w.postMessage(opts);
      strm.push = function (d, f) {
          if (t)
              throw 'stream finished';
          if (!strm.ondata)
              throw 'no stream handler';
          w.postMessage([d, t = f], [d.buffer]);
      };
      strm.terminate = function () { w.terminate(); };
  };
  // read 2 bytes
  var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
  // read 4 bytes
  var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
  var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
  // write bytes
  var wbytes = function (d, b, v) {
      for (; v; ++b)
          d[b] = v, v >>>= 8;
  };
  // gzip header
  var gzh = function (c, o) {
      var fn = o.filename;
      c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
      if (o.mtime != 0)
          wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
      if (fn) {
          c[3] = 8;
          for (var i = 0; i <= fn.length; ++i)
              c[i + 10] = fn.charCodeAt(i);
      }
  };
  // gzip footer: -8 to -4 = CRC, -4 to -0 is length
  // gzip start
  var gzs = function (d) {
      if (d[0] != 31 || d[1] != 139 || d[2] != 8)
          throw 'invalid gzip data';
      var flg = d[3];
      var st = 10;
      if (flg & 4)
          st += d[10] | (d[11] << 8) + 2;
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
          ;
      return st + (flg & 2);
  };
  // gzip length
  var gzl = function (d) {
      var l = d.length;
      return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
  };
  // gzip header length
  var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
  // zlib header
  var zlh = function (c, o) {
      var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
      c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
  };
  // zlib valid
  var zlv = function (d) {
      if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
          throw 'invalid zlib data';
      if (d[1] & 32)
          throw 'invalid zlib data: preset dictionaries not supported';
  };
  function AsyncCmpStrm(opts, cb) {
      if (!cb && typeof opts == 'function')
          cb = opts, opts = {};
      this.ondata = cb;
      return opts;
  }
  // zlib footer: -4 to -0 is Adler32
  /**
   * Streaming DEFLATE compression
   */
  var Deflate = /*#__PURE__*/ (function () {
      function Deflate(opts, cb) {
          if (!cb && typeof opts == 'function')
              cb = opts, opts = {};
          this.ondata = cb;
          this.o = opts || {};
      }
      Deflate.prototype.p = function (c, f) {
          this.ondata(dopt(c, this.o, 0, 0, !f), f);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Deflate.prototype.push = function (chunk, final) {
          if (this.d)
              throw 'stream finished';
          if (!this.ondata)
              throw 'no stream handler';
          this.d = final;
          this.p(chunk, final || false);
      };
      return Deflate;
  }());
  /**
   * Asynchronous streaming DEFLATE compression
   */
  var AsyncDeflate = /*#__PURE__*/ (function () {
      function AsyncDeflate(opts, cb) {
          astrmify([
              bDflt,
              function () { return [astrm, Deflate]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Deflate(ev.data);
              onmessage = astrm(strm);
          }, 6);
      }
      return AsyncDeflate;
  }());
  function deflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return cbify(data, opts, [
          bDflt,
      ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
  }
  /**
   * Compresses data with DEFLATE without any wrapper
   * @param data The data to compress
   * @param opts The compression options
   * @returns The deflated version of the data
   */
  function deflateSync(data, opts) {
      return dopt(data, opts || {}, 0, 0);
  }
  /**
   * Streaming DEFLATE decompression
   */
  var Inflate = /*#__PURE__*/ (function () {
      /**
       * Creates an inflation stream
       * @param cb The callback to call whenever data is inflated
       */
      function Inflate(cb) {
          this.s = {};
          this.p = new u8(0);
          this.ondata = cb;
      }
      Inflate.prototype.e = function (c) {
          if (this.d)
              throw 'stream finished';
          if (!this.ondata)
              throw 'no stream handler';
          var l = this.p.length;
          var n = new u8(l + c.length);
          n.set(this.p), n.set(c, l), this.p = n;
      };
      Inflate.prototype.c = function (final) {
          this.d = this.s.i = final || false;
          var bts = this.s.b;
          var dt = inflt(this.p, this.o, this.s);
          this.ondata(slc(dt, bts, this.s.b), this.d);
          this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
          this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
      };
      /**
       * Pushes a chunk to be inflated
       * @param chunk The chunk to push
       * @param final Whether this is the final chunk
       */
      Inflate.prototype.push = function (chunk, final) {
          this.e(chunk), this.c(final);
      };
      return Inflate;
  }());
  /**
   * Asynchronous streaming DEFLATE decompression
   */
  var AsyncInflate = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous inflation stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncInflate(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              function () { return [astrm, Inflate]; }
          ], this, 0, function () {
              var strm = new Inflate();
              onmessage = astrm(strm);
          }, 7);
      }
      return AsyncInflate;
  }());
  function inflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return cbify(data, opts, [
          bInflt
      ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
  }
  /**
   * Expands DEFLATE data with no wrapper
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function inflateSync(data, out) {
      return inflt(data, out);
  }
  // before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
  /**
   * Streaming GZIP compression
   */
  var Gzip = /*#__PURE__*/ (function () {
      function Gzip(opts, cb) {
          this.c = crc();
          this.l = 0;
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be GZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gzip.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Gzip.prototype.p = function (c, f) {
          this.c.p(c);
          this.l += c.length;
          var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
          if (this.v)
              gzh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
          this.ondata(raw, f);
      };
      return Gzip;
  }());
  /**
   * Asynchronous streaming GZIP compression
   */
  var AsyncGzip = /*#__PURE__*/ (function () {
      function AsyncGzip(opts, cb) {
          astrmify([
              bDflt,
              gze,
              function () { return [astrm, Deflate, Gzip]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Gzip(ev.data);
              onmessage = astrm(strm);
          }, 8);
      }
      return AsyncGzip;
  }());
  function gzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return cbify(data, opts, [
          bDflt,
          gze,
          function () { return [gzipSync]; }
      ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
  }
  /**
   * Compresses data with GZIP
   * @param data The data to compress
   * @param opts The compression options
   * @returns The gzipped version of the data
   */
  function gzipSync(data, opts) {
      if (!opts)
          opts = {};
      var c = crc(), l = data.length;
      c.p(data);
      var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
      return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
  }
  /**
   * Streaming GZIP decompression
   */
  var Gunzip = /*#__PURE__*/ (function () {
      /**
       * Creates a GUNZIP stream
       * @param cb The callback to call whenever data is inflated
       */
      function Gunzip(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be GUNZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gunzip.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              var s = this.p.length > 3 ? gzs(this.p) : 4;
              if (s >= this.p.length && !final)
                  return;
              this.p = this.p.subarray(s), this.v = 0;
          }
          if (final) {
              if (this.p.length < 8)
                  throw 'invalid gzip stream';
              this.p = this.p.subarray(0, -8);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Gunzip;
  }());
  /**
   * Asynchronous streaming GZIP decompression
   */
  var AsyncGunzip = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous GUNZIP stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncGunzip(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              guze,
              function () { return [astrm, Inflate, Gunzip]; }
          ], this, 0, function () {
              var strm = new Gunzip();
              onmessage = astrm(strm);
          }, 9);
      }
      return AsyncGunzip;
  }());
  function gunzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return cbify(data, opts, [
          bInflt,
          guze,
          function () { return [gunzipSync]; }
      ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
  }
  /**
   * Expands GZIP data
   * @param data The data to decompress
   * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
   * @returns The decompressed version of the data
   */
  function gunzipSync(data, out) {
      return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
  }
  /**
   * Streaming Zlib compression
   */
  var Zlib = /*#__PURE__*/ (function () {
      function Zlib(opts, cb) {
          this.c = adler();
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be zlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Zlib.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Zlib.prototype.p = function (c, f) {
          this.c.p(c);
          var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
          if (this.v)
              zlh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 4, this.c.d());
          this.ondata(raw, f);
      };
      return Zlib;
  }());
  /**
   * Asynchronous streaming Zlib compression
   */
  var AsyncZlib = /*#__PURE__*/ (function () {
      function AsyncZlib(opts, cb) {
          astrmify([
              bDflt,
              zle,
              function () { return [astrm, Deflate, Zlib]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Zlib(ev.data);
              onmessage = astrm(strm);
          }, 10);
      }
      return AsyncZlib;
  }());
  function zlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return cbify(data, opts, [
          bDflt,
          zle,
          function () { return [zlibSync]; }
      ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
  }
  /**
   * Compress data with Zlib
   * @param data The data to compress
   * @param opts The compression options
   * @returns The zlib-compressed version of the data
   */
  function zlibSync(data, opts) {
      if (!opts)
          opts = {};
      var a = adler();
      a.p(data);
      var d = dopt(data, opts, 2, 4);
      return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
  }
  /**
   * Streaming Zlib decompression
   */
  var Unzlib = /*#__PURE__*/ (function () {
      /**
       * Creates a Zlib decompression stream
       * @param cb The callback to call whenever data is inflated
       */
      function Unzlib(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be unzlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzlib.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              if (this.p.length < 2 && !final)
                  return;
              this.p = this.p.subarray(2), this.v = 0;
          }
          if (final) {
              if (this.p.length < 4)
                  throw 'invalid zlib stream';
              this.p = this.p.subarray(0, -4);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Unzlib;
  }());
  /**
   * Asynchronous streaming Zlib decompression
   */
  var AsyncUnzlib = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous Zlib decompression stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncUnzlib(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              zule,
              function () { return [astrm, Inflate, Unzlib]; }
          ], this, 0, function () {
              var strm = new Unzlib();
              onmessage = astrm(strm);
          }, 11);
      }
      return AsyncUnzlib;
  }());
  function unzlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return cbify(data, opts, [
          bInflt,
          zule,
          function () { return [unzlibSync]; }
      ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
  }
  /**
   * Expands Zlib data
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function unzlibSync(data, out) {
      return inflt((zlv(data), data.subarray(2, -4)), out);
  }
  /**
   * Streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var Decompress = /*#__PURE__*/ (function () {
      /**
       * Creates a decompression stream
       * @param cb The callback to call whenever data is decompressed
       */
      function Decompress(cb) {
          this.G = Gunzip;
          this.I = Inflate;
          this.Z = Unzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Decompress.prototype.push = function (chunk, final) {
          if (!this.ondata)
              throw 'no stream handler';
          if (!this.s) {
              if (this.p && this.p.length) {
                  var n = new u8(this.p.length + chunk.length);
                  n.set(this.p), n.set(chunk, this.p.length);
              }
              else
                  this.p = chunk;
              if (this.p.length > 2) {
                  var _this_1 = this;
                  var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                  this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                      ? new this.G(cb)
                      : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                          ? new this.I(cb)
                          : new this.Z(cb);
                  this.s.push(this.p, final);
                  this.p = null;
              }
          }
          else
              this.s.push(chunk, final);
      };
      return Decompress;
  }());
  /**
   * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var AsyncDecompress = /*#__PURE__*/ (function () {
      /**
     * Creates an asynchronous decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
      function AsyncDecompress(cb) {
          this.G = AsyncGunzip;
          this.I = AsyncInflate;
          this.Z = AsyncUnzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncDecompress.prototype.push = function (chunk, final) {
          Decompress.prototype.push.call(this, chunk, final);
      };
      return AsyncDecompress;
  }());
  function decompress(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzip(data, opts, cb)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflate(data, opts, cb)
              : unzlib(data, opts, cb);
  }
  /**
   * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function decompressSync(data, out) {
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzipSync(data, out)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflateSync(data, out)
              : unzlibSync(data, out);
  }
  // flatten a directory structure
  var fltn = function (d, p, t, o) {
      for (var k in d) {
          var val = d[k], n = p + k;
          if (val instanceof u8)
              t[n] = [val, o];
          else if (Array.isArray(val))
              t[n] = [val[0], mrg(o, val[1])];
          else
              fltn(val, n + '/', t, o);
      }
  };
  // text encoder
  var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
  // text decoder
  var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
  // text decoder stream
  var tds = 0;
  try {
      td.decode(et, { stream: true });
      tds = 1;
  }
  catch (e) { }
  // decode UTF8
  var dutf8 = function (d) {
      for (var r = '', i = 0;;) {
          var c = d[i++];
          var eb = (c > 127) + (c > 223) + (c > 239);
          if (i + eb > d.length)
              return [r, slc(d, i - 1)];
          if (!eb)
              r += String.fromCharCode(c);
          else if (eb == 3) {
              c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                  r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
          }
          else if (eb & 1)
              r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
          else
              r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
      }
  };
  /**
   * Streaming UTF-8 decoding
   */
  var DecodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is decoded
       */
      function DecodeUTF8(cb) {
          this.ondata = cb;
          if (tds)
              this.t = new TextDecoder();
          else
              this.p = et;
      }
      /**
       * Pushes a chunk to be decoded from UTF-8 binary
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      DecodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              throw 'no callback';
          final = !!final;
          if (this.t) {
              this.ondata(this.t.decode(chunk, { stream: true }), final);
              if (final) {
                  if (this.t.decode().length)
                      throw 'invalid utf-8 data';
                  this.t = null;
              }
              return;
          }
          if (!this.p)
              throw 'stream finished';
          var dat = new u8(this.p.length + chunk.length);
          dat.set(this.p);
          dat.set(chunk, this.p.length);
          var _a = dutf8(dat), ch = _a[0], np = _a[1];
          if (final) {
              if (np.length)
                  throw 'invalid utf-8 data';
              this.p = null;
          }
          else
              this.p = np;
          this.ondata(ch, final);
      };
      return DecodeUTF8;
  }());
  /**
   * Streaming UTF-8 encoding
   */
  var EncodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is encoded
       */
      function EncodeUTF8(cb) {
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be encoded to UTF-8
       * @param chunk The string data to push
       * @param final Whether this is the last chunk
       */
      EncodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              throw 'no callback';
          if (this.d)
              throw 'stream finished';
          this.ondata(strToU8(chunk), this.d = final || false);
      };
      return EncodeUTF8;
  }());
  /**
   * Converts a string into a Uint8Array for use with compression/decompression methods
   * @param str The string to encode
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless decoding a binary string.
   * @returns The string encoded in UTF-8/Latin-1 binary
   */
  function strToU8(str, latin1) {
      if (latin1) {
          var ar_1 = new u8(str.length);
          for (var i = 0; i < str.length; ++i)
              ar_1[i] = str.charCodeAt(i);
          return ar_1;
      }
      if (te)
          return te.encode(str);
      var l = str.length;
      var ar = new u8(str.length + (str.length >> 1));
      var ai = 0;
      var w = function (v) { ar[ai++] = v; };
      for (var i = 0; i < l; ++i) {
          if (ai + 5 > ar.length) {
              var n = new u8(ai + 8 + ((l - i) << 1));
              n.set(ar);
              ar = n;
          }
          var c = str.charCodeAt(i);
          if (c < 128 || latin1)
              w(c);
          else if (c < 2048)
              w(192 | (c >> 6)), w(128 | (c & 63));
          else if (c > 55295 && c < 57344)
              c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                  w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
          else
              w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
      }
      return slc(ar, 0, ai);
  }
  /**
   * Converts a Uint8Array to a string
   * @param dat The data to decode to string
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless encoding to binary string.
   * @returns The original UTF-8/Latin-1 string
   */
  function strFromU8(dat, latin1) {
      if (latin1) {
          var r = '';
          for (var i = 0; i < dat.length; i += 16384)
              r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
          return r;
      }
      else if (td)
          return td.decode(dat);
      else {
          var _a = dutf8(dat), out = _a[0], ext = _a[1];
          if (ext.length)
              throw 'invalid utf-8 data';
          return out;
      }
  }
  // deflate bit flag
  var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
  // skip local zip header
  var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
  // read zip header
  var zh = function (d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
      var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
      return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  // read zip64 extra field
  var z64e = function (d, b) {
      for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
          ;
      return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  // extra field length
  var exfl = function (ex) {
      var le = 0;
      if (ex) {
          for (var k in ex) {
              var l = ex[k].length;
              if (l > 65535)
                  throw 'extra field too long';
              le += l + 4;
          }
      }
      return le;
  };
  // write zip header
  var wzh = function (d, b, f, fn, u, c, ce, co) {
      var fl = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
      if (ce != null)
          d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2; // spec compliance? what's that?
      d[b++] = (f.flag << 1) | (c == null && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
          throw 'date not in range 1980-2099';
      wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
      if (c != null) {
          wbytes(d, b, f.crc);
          wbytes(d, b + 4, c);
          wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
          wbytes(d, b, col);
          wbytes(d, b + 6, f.attrs);
          wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl;
      if (exl) {
          for (var k in ex) {
              var exf = ex[k], l = exf.length;
              wbytes(d, b, +k);
              wbytes(d, b + 2, l);
              d.set(exf, b + 4), b += 4 + l;
          }
      }
      if (col)
          d.set(co, b), b += col;
      return b;
  };
  // write zip footer (end of central directory)
  var wzf = function (o, b, c, d, e) {
      wbytes(o, b, 0x6054B50); // skip disk
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
  };
  /**
   * A pass-through stream to keep data uncompressed in a ZIP archive.
   */
  var ZipPassThrough = /*#__PURE__*/ (function () {
      /**
       * Creates a pass-through stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       */
      function ZipPassThrough(filename) {
          this.filename = filename;
          this.c = crc();
          this.size = 0;
          this.compression = 0;
      }
      /**
       * Processes a chunk and pushes to the output stream. You can override this
       * method in a subclass for custom behavior, but by default this passes
       * the data through. You must call this.ondata(err, chunk, final) at some
       * point in this method.
       * @param chunk The chunk to process
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.process = function (chunk, final) {
          this.ondata(null, chunk, final);
      };
      /**
       * Pushes a chunk to be added. If you are subclassing this with a custom
       * compression algorithm, note that you must push data from the source
       * file only, pre-compression.
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.push = function (chunk, final) {
          if (!this.ondata)
              throw 'no callback - add to ZIP archive before pushing';
          this.c.p(chunk);
          this.size += chunk.length;
          if (final)
              this.crc = this.c.d();
          this.process(chunk, final || false);
      };
      return ZipPassThrough;
  }());
  // I don't extend because TypeScript extension adds 1kB of runtime bloat
  /**
   * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
   * for better performance
   */
  var ZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function ZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new Deflate(opts, function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
      }
      ZipDeflate.prototype.process = function (chunk, final) {
          try {
              this.d.push(chunk, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return ZipDeflate;
  }());
  /**
   * Asynchronous streaming DEFLATE compression for ZIP archives
   */
  var AsyncZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function AsyncZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new AsyncDeflate(opts, function (err, dat, final) {
              _this_1.ondata(err, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
          this.terminate = this.d.terminate;
      }
      AsyncZipDeflate.prototype.process = function (chunk, final) {
          this.d.push(chunk, final);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return AsyncZipDeflate;
  }());
  // TODO: Better tree shaking
  /**
   * A zippable archive to which files can incrementally be added
   */
  var Zip = /*#__PURE__*/ (function () {
      /**
       * Creates an empty ZIP archive to which files can be added
       * @param cb The callback to call whenever data for the generated ZIP archive
       *           is available
       */
      function Zip(cb) {
          this.ondata = cb;
          this.u = [];
          this.d = 1;
      }
      /**
       * Adds a file to the ZIP archive
       * @param file The file stream to add
       */
      Zip.prototype.add = function (file) {
          var _this_1 = this;
          if (this.d & 2)
              throw 'stream finished';
          var f = strToU8(file.filename), fl = f.length;
          var com = file.comment, o = com && strToU8(com);
          var u = fl != file.filename.length || (o && (com.length != o.length));
          var hl = fl + exfl(file.extra) + 30;
          if (fl > 65535)
              throw 'filename too long';
          var header = new u8(hl);
          wzh(header, 0, file, f, u);
          var chks = [header];
          var pAll = function () {
              for (var _i = 0, chks_1 = chks; _i < chks_1.length; _i++) {
                  var chk = chks_1[_i];
                  _this_1.ondata(null, chk, false);
              }
              chks = [];
          };
          var tr = this.d;
          this.d = 0;
          var ind = this.u.length;
          var uf = mrg(file, {
              f: f,
              u: u,
              o: o,
              t: function () {
                  if (file.terminate)
                      file.terminate();
              },
              r: function () {
                  pAll();
                  if (tr) {
                      var nxt = _this_1.u[ind + 1];
                      if (nxt)
                          nxt.r();
                      else
                          _this_1.d = 1;
                  }
                  tr = 1;
              }
          });
          var cl = 0;
          file.ondata = function (err, dat, final) {
              if (err) {
                  _this_1.ondata(err, dat, final);
                  _this_1.terminate();
              }
              else {
                  cl += dat.length;
                  chks.push(dat);
                  if (final) {
                      var dd = new u8(16);
                      wbytes(dd, 0, 0x8074B50);
                      wbytes(dd, 4, file.crc);
                      wbytes(dd, 8, cl);
                      wbytes(dd, 12, file.size);
                      chks.push(dd);
                      uf.c = cl, uf.b = hl + cl + 16, uf.crc = file.crc, uf.size = file.size;
                      if (tr)
                          uf.r();
                      tr = 1;
                  }
                  else if (tr)
                      pAll();
              }
          };
          this.u.push(uf);
      };
      /**
       * Ends the process of adding files and prepares to emit the final chunks.
       * This *must* be called after adding all desired files for the resulting
       * ZIP file to work properly.
       */
      Zip.prototype.end = function () {
          var _this_1 = this;
          if (this.d & 2) {
              if (this.d & 1)
                  throw 'stream finishing';
              throw 'stream finished';
          }
          if (this.d)
              this.e();
          else
              this.u.push({
                  r: function () {
                      if (!(_this_1.d & 1))
                          return;
                      _this_1.u.splice(-1, 1);
                      _this_1.e();
                  },
                  t: function () { }
              });
          this.d = 3;
      };
      Zip.prototype.e = function () {
          var bt = 0, l = 0, tl = 0;
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
          }
          var out = new u8(tl + 22);
          for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
              var f = _c[_b];
              wzh(out, bt, f, f.f, f.u, f.c, l, f.o);
              bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
          }
          wzf(out, bt, this.u.length, tl, l);
          this.ondata(null, out, true);
          this.d = 2;
      };
      /**
       * A method to terminate any internal workers used by the stream. Subsequent
       * calls to add() will fail.
       */
      Zip.prototype.terminate = function () {
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              f.t();
          }
          this.d = 2;
      };
      return Zip;
  }());
  function zip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          throw 'no callback';
      var r = {};
      fltn(data, '', r, opts);
      var k = Object.keys(r);
      var lft = k.length, o = 0, tot = 0;
      var slft = lft, files = new Array(lft);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var cbf = function () {
          var out = new u8(tot + 22), oe = o, cdl = tot - o;
          tot = 0;
          for (var i = 0; i < slft; ++i) {
              var f = files[i];
              try {
                  var l = f.c.length;
                  wzh(out, tot, f, f.f, f.u, l);
                  var badd = 30 + f.f.length + exfl(f.extra);
                  var loc = tot + badd;
                  out.set(f.c, loc);
                  wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
              }
              catch (e) {
                  return cb(e, null);
              }
          }
          wzf(out, o, files.length, cdl, oe);
          cb(null, out);
      };
      if (!lft)
          cbf();
      var _loop_1 = function (i) {
          var fn = k[i];
          var _a = r[fn], file = _a[0], p = _a[1];
          var c = crc(), size = file.length;
          c.p(file);
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          var compression = p.level == 0 ? 0 : 8;
          var cbl = function (e, d) {
              if (e) {
                  tAll();
                  cb(e, null);
              }
              else {
                  var l = d.length;
                  files[i] = mrg(p, {
                      size: size,
                      crc: c.d(),
                      c: d,
                      f: f,
                      m: m,
                      u: s != fn.length || (m && (com.length != ms)),
                      compression: compression
                  });
                  o += 30 + s + exl + l;
                  tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                  if (!--lft)
                      cbf();
              }
          };
          if (s > 65535)
              cbl('filename too long', null);
          if (!compression)
              cbl(null, file);
          else if (size < 160000) {
              try {
                  cbl(null, deflateSync(file, p));
              }
              catch (e) {
                  cbl(e, null);
              }
          }
          else
              term.push(deflate(file, p, cbl));
      };
      // Cannot use lft because it can decrease
      for (var i = 0; i < slft; ++i) {
          _loop_1(i);
      }
      return tAll;
  }
  /**
   * Synchronously creates a ZIP file. Prefer using `zip` for better performance
   * with more than one file.
   * @param data The directory structure for the ZIP archive
   * @param opts The main options, merged with per-file options
   * @returns The generated ZIP archive
   */
  function zipSync(data, opts) {
      if (!opts)
          opts = {};
      var r = {};
      var files = [];
      fltn(data, '', r, opts);
      var o = 0;
      var tot = 0;
      for (var fn in r) {
          var _a = r[fn], file = _a[0], p = _a[1];
          var compression = p.level == 0 ? 0 : 8;
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          if (s > 65535)
              throw 'filename too long';
          var d = compression ? deflateSync(file, p) : file, l = d.length;
          var c = crc();
          c.p(file);
          files.push(mrg(p, {
              size: file.length,
              crc: c.d(),
              c: d,
              f: f,
              m: m,
              u: s != fn.length || (m && (com.length != ms)),
              o: o,
              compression: compression
          }));
          o += 30 + s + exl + l;
          tot += 76 + 2 * (s + exl) + (ms || 0) + l;
      }
      var out = new u8(tot + 22), oe = o, cdl = tot - o;
      for (var i = 0; i < files.length; ++i) {
          var f = files[i];
          wzh(out, f.o, f, f.f, f.u, f.c.length);
          var badd = 30 + f.f.length + exfl(f.extra);
          out.set(f.c, f.o + badd);
          wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
      }
      wzf(out, o, files.length, cdl, oe);
      return out;
  }
  /**
   * Streaming pass-through decompression for ZIP archives
   */
  var UnzipPassThrough = /*#__PURE__*/ (function () {
      function UnzipPassThrough() {
      }
      UnzipPassThrough.prototype.push = function (data, final) {
          this.ondata(null, data, final);
      };
      UnzipPassThrough.compression = 0;
      return UnzipPassThrough;
  }());
  /**
   * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
   * better performance.
   */
  var UnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function UnzipInflate() {
          var _this_1 = this;
          this.i = new Inflate(function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
      }
      UnzipInflate.prototype.push = function (data, final) {
          try {
              this.i.push(data, final);
          }
          catch (e) {
              this.ondata(e, data, final);
          }
      };
      UnzipInflate.compression = 8;
      return UnzipInflate;
  }());
  /**
   * Asynchronous streaming DEFLATE decompression for ZIP archives
   */
  var AsyncUnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function AsyncUnzipInflate(_, sz) {
          var _this_1 = this;
          if (sz < 320000) {
              this.i = new Inflate(function (dat, final) {
                  _this_1.ondata(null, dat, final);
              });
          }
          else {
              this.i = new AsyncInflate(function (err, dat, final) {
                  _this_1.ondata(err, dat, final);
              });
              this.terminate = this.i.terminate;
          }
      }
      AsyncUnzipInflate.prototype.push = function (data, final) {
          if (this.i.terminate)
              data = slc(data, 0);
          this.i.push(data, final);
      };
      AsyncUnzipInflate.compression = 8;
      return AsyncUnzipInflate;
  }());
  /**
   * A ZIP archive decompression stream that emits files as they are discovered
   */
  var Unzip = /*#__PURE__*/ (function () {
      /**
       * Creates a ZIP decompression stream
       * @param cb The callback to call whenever a file in the ZIP archive is found
       */
      function Unzip(cb) {
          this.onfile = cb;
          this.k = [];
          this.o = {
              0: UnzipPassThrough
          };
          this.p = et;
      }
      /**
       * Pushes a chunk to be unzipped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzip.prototype.push = function (chunk, final) {
          var _this_1 = this;
          if (!this.onfile)
              throw 'no callback';
          if (!this.p)
              throw 'stream finished';
          if (this.c > 0) {
              var len = Math.min(this.c, chunk.length);
              var toAdd = chunk.subarray(0, len);
              this.c -= len;
              if (this.d)
                  this.d.push(toAdd, !this.c);
              else
                  this.k[0].push(toAdd);
              chunk = chunk.subarray(len);
              if (chunk.length)
                  return this.push(chunk, final);
          }
          else {
              var f = 0, i = 0, is = void 0, buf = void 0;
              if (!this.p.length)
                  buf = chunk;
              else if (!chunk.length)
                  buf = this.p;
              else {
                  buf = new u8(this.p.length + chunk.length);
                  buf.set(this.p), buf.set(chunk, this.p.length);
              }
              var l = buf.length, oc = this.c, add = oc && this.d;
              var _loop_2 = function () {
                  var _a;
                  var sig = b4(buf, i);
                  if (sig == 0x4034B50) {
                      f = 1, is = i;
                      this_1.d = null;
                      this_1.c = 0;
                      var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                      if (l > i + 30 + fnl + es) {
                          var chks_2 = [];
                          this_1.k.unshift(chks_2);
                          f = 2;
                          var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                          var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                          if (sc_1 == 4294967295) {
                              _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                          }
                          else if (dd)
                              sc_1 = -1;
                          i += es;
                          this_1.c = sc_1;
                          var d_1;
                          var file_1 = {
                              name: fn_1,
                              compression: cmp_1,
                              start: function () {
                                  if (!file_1.ondata)
                                      throw 'no callback';
                                  if (!sc_1)
                                      file_1.ondata(null, et, true);
                                  else {
                                      var ctr = _this_1.o[cmp_1];
                                      if (!ctr)
                                          throw 'unknown compression type ' + cmp_1;
                                      d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                      d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                      for (var _i = 0, chks_3 = chks_2; _i < chks_3.length; _i++) {
                                          var dat = chks_3[_i];
                                          d_1.push(dat, false);
                                      }
                                      if (_this_1.k[0] == chks_2 && _this_1.c)
                                          _this_1.d = d_1;
                                      else
                                          d_1.push(et, true);
                                  }
                              },
                              terminate: function () {
                                  if (d_1 && d_1.terminate)
                                      d_1.terminate();
                              }
                          };
                          if (sc_1 >= 0)
                              file_1.size = sc_1, file_1.originalSize = su_1;
                          this_1.onfile(file_1);
                      }
                      return "break";
                  }
                  else if (oc) {
                      if (sig == 0x8074B50) {
                          is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                          return "break";
                      }
                      else if (sig == 0x2014B50) {
                          is = i -= 4, f = 3, this_1.c = 0;
                          return "break";
                      }
                  }
              };
              var this_1 = this;
              for (; i < l - 4; ++i) {
                  var state_1 = _loop_2();
                  if (state_1 === "break")
                      break;
              }
              this.p = et;
              if (oc < 0) {
                  var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                  if (add)
                      add.push(dat, !!f);
                  else
                      this.k[+(f == 2)].push(dat);
              }
              if (f & 2)
                  return this.push(buf.subarray(i), final);
              this.p = buf.subarray(i);
          }
          if (final) {
              if (this.c)
                  throw 'invalid zip file';
              this.p = null;
          }
      };
      /**
       * Registers a decoder with the stream, allowing for files compressed with
       * the compression type provided to be expanded correctly
       * @param decoder The decoder constructor
       */
      Unzip.prototype.register = function (decoder) {
          this.o[decoder.compression] = decoder;
      };
      return Unzip;
  }());
  /**
   * Asynchronously decompresses a ZIP archive
   * @param data The raw compressed ZIP file
   * @param cb The callback to call with the decompressed files
   * @returns A function that can be used to immediately terminate the unzipping
   */
  function unzip(data, cb) {
      if (typeof cb != 'function')
          throw 'no callback';
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var files = {};
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558) {
              cb('invalid zip file', null);
              return;
          }
      }
      var lft = b2(data, e + 8);
      if (!lft)
          cb(null, {});
      var c = lft;
      var o = b4(data, e + 16);
      var z = o == 4294967295;
      if (z) {
          e = b4(data, e - 12);
          if (b4(data, e) != 0x6064B50) {
              cb('invalid zip file', null);
              return;
          }
          c = lft = b4(data, e + 32);
          o = b4(data, e + 48);
      }
      var _loop_3 = function (i) {
          var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
          o = no;
          var cbl = function (e, d) {
              if (e) {
                  tAll();
                  cb(e, null);
              }
              else {
                  files[fn] = d;
                  if (!--lft)
                      cb(null, files);
              }
          };
          if (!c_1)
              cbl(null, slc(data, b, b + sc));
          else if (c_1 == 8) {
              var infl = data.subarray(b, b + sc);
              if (sc < 320000) {
                  try {
                      cbl(null, inflateSync(infl, new u8(su)));
                  }
                  catch (e) {
                      cbl(e, null);
                  }
              }
              else
                  term.push(inflate(infl, { size: su }, cbl));
          }
          else
              cbl('unknown compression type ' + c_1, null);
      };
      for (var i = 0; i < c; ++i) {
          _loop_3();
      }
      return tAll;
  }
  /**
   * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
   * performance with more than one file.
   * @param data The raw compressed ZIP file
   * @returns The decompressed files
   */
  function unzipSync(data) {
      var files = {};
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558)
              throw 'invalid zip file';
      }
      var c = b2(data, e + 8);
      if (!c)
          return {};
      var o = b4(data, e + 16);
      var z = o == 4294967295;
      if (z) {
          e = b4(data, e - 12);
          if (b4(data, e) != 0x6064B50)
              throw 'invalid zip file';
          c = b4(data, e + 32);
          o = b4(data, e + 48);
      }
      for (var i = 0; i < c; ++i) {
          var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
          o = no;
          if (!c_2)
              files[fn] = slc(data, b, b + sc);
          else if (c_2 == 8)
              files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
          else
              throw 'unknown compression type ' + c_2;
      }
      return files;
  }

  var fflate = {
    __proto__: null,
    Deflate: Deflate,
    AsyncDeflate: AsyncDeflate,
    deflate: deflate,
    deflateSync: deflateSync,
    Inflate: Inflate,
    AsyncInflate: AsyncInflate,
    inflate: inflate,
    inflateSync: inflateSync,
    Gzip: Gzip,
    AsyncGzip: AsyncGzip,
    gzip: gzip,
    gzipSync: gzipSync,
    Gunzip: Gunzip,
    AsyncGunzip: AsyncGunzip,
    gunzip: gunzip,
    gunzipSync: gunzipSync,
    Zlib: Zlib,
    AsyncZlib: AsyncZlib,
    zlib: zlib,
    zlibSync: zlibSync,
    Unzlib: Unzlib,
    AsyncUnzlib: AsyncUnzlib,
    unzlib: unzlib,
    unzlibSync: unzlibSync,
    compress: gzip,
    AsyncCompress: AsyncGzip,
    compressSync: gzipSync,
    Compress: Gzip,
    Decompress: Decompress,
    AsyncDecompress: AsyncDecompress,
    decompress: decompress,
    decompressSync: decompressSync,
    DecodeUTF8: DecodeUTF8,
    EncodeUTF8: EncodeUTF8,
    strToU8: strToU8,
    strFromU8: strFromU8,
    ZipPassThrough: ZipPassThrough,
    ZipDeflate: ZipDeflate,
    AsyncZipDeflate: AsyncZipDeflate,
    Zip: Zip,
    zip: zip,
    zipSync: zipSync,
    UnzipPassThrough: UnzipPassThrough,
    UnzipInflate: UnzipInflate,
    AsyncUnzipInflate: AsyncUnzipInflate,
    Unzip: Unzip,
    unzip: unzip,
    unzipSync: unzipSync
  };

  /**
   * NURBS utils
   *
   * See NURBSCurve and NURBSSurface.
   **/


  /**************************************************************
   *	NURBS Utils
   **************************************************************/

  class NURBSUtils {

  	/*
  	Finds knot vector span.

  	p : degree
  	u : parametric value
  	U : knot vector

  	returns the span
  	*/
  	static findSpan( p, u, U ) {

  		const n = U.length - p - 1;

  		if ( u >= U[ n ] ) {

  			return n - 1;

  		}

  		if ( u <= U[ p ] ) {

  			return p;

  		}

  		let low = p;
  		let high = n;
  		let mid = Math.floor( ( low + high ) / 2 );

  		while ( u < U[ mid ] || u >= U[ mid + 1 ] ) {

  			if ( u < U[ mid ] ) {

  				high = mid;

  			} else {

  				low = mid;

  			}

  			mid = Math.floor( ( low + high ) / 2 );

  		}

  		return mid;

  	}


  	/*
  	Calculate basis functions. See The NURBS Book, page 70, algorithm A2.2

  	span : span in which u lies
  	u    : parametric point
  	p    : degree
  	U    : knot vector

  	returns array[p+1] with basis functions values.
  	*/
  	static calcBasisFunctions( span, u, p, U ) {

  		const N = [];
  		const left = [];
  		const right = [];
  		N[ 0 ] = 1.0;

  		for ( let j = 1; j <= p; ++ j ) {

  			left[ j ] = u - U[ span + 1 - j ];
  			right[ j ] = U[ span + j ] - u;

  			let saved = 0.0;

  			for ( let r = 0; r < j; ++ r ) {

  				const rv = right[ r + 1 ];
  				const lv = left[ j - r ];
  				const temp = N[ r ] / ( rv + lv );
  				N[ r ] = saved + rv * temp;
  				saved = lv * temp;

  			 }

  			 N[ j ] = saved;

  		 }

  		 return N;

  	}


  	/*
  	Calculate B-Spline curve points. See The NURBS Book, page 82, algorithm A3.1.

  	p : degree of B-Spline
  	U : knot vector
  	P : control points (x, y, z, w)
  	u : parametric point

  	returns point for given u
  	*/
  	static calcBSplinePoint( p, U, P, u ) {

  		const span = this.findSpan( p, u, U );
  		const N = this.calcBasisFunctions( span, u, p, U );
  		const C = new THREE.Vector4( 0, 0, 0, 0 );

  		for ( let j = 0; j <= p; ++ j ) {

  			const point = P[ span - p + j ];
  			const Nj = N[ j ];
  			const wNj = point.w * Nj;
  			C.x += point.x * wNj;
  			C.y += point.y * wNj;
  			C.z += point.z * wNj;
  			C.w += point.w * Nj;

  		}

  		return C;

  	}


  	/*
  	Calculate basis functions derivatives. See The NURBS Book, page 72, algorithm A2.3.

  	span : span in which u lies
  	u    : parametric point
  	p    : degree
  	n    : number of derivatives to calculate
  	U    : knot vector

  	returns array[n+1][p+1] with basis functions derivatives
  	*/
  	static calcBasisFunctionDerivatives( span, u, p, n, U ) {

  		const zeroArr = [];
  		for ( let i = 0; i <= p; ++ i )
  			zeroArr[ i ] = 0.0;

  		const ders = [];

  		for ( let i = 0; i <= n; ++ i )
  			ders[ i ] = zeroArr.slice( 0 );

  		const ndu = [];

  		for ( let i = 0; i <= p; ++ i )
  			ndu[ i ] = zeroArr.slice( 0 );

  		ndu[ 0 ][ 0 ] = 1.0;

  		const left = zeroArr.slice( 0 );
  		const right = zeroArr.slice( 0 );

  		for ( let j = 1; j <= p; ++ j ) {

  			left[ j ] = u - U[ span + 1 - j ];
  			right[ j ] = U[ span + j ] - u;

  			let saved = 0.0;

  			for ( let r = 0; r < j; ++ r ) {

  				const rv = right[ r + 1 ];
  				const lv = left[ j - r ];
  				ndu[ j ][ r ] = rv + lv;

  				const temp = ndu[ r ][ j - 1 ] / ndu[ j ][ r ];
  				ndu[ r ][ j ] = saved + rv * temp;
  				saved = lv * temp;

  			}

  			ndu[ j ][ j ] = saved;

  		}

  		for ( let j = 0; j <= p; ++ j ) {

  			ders[ 0 ][ j ] = ndu[ j ][ p ];

  		}

  		for ( let r = 0; r <= p; ++ r ) {

  			let s1 = 0;
  			let s2 = 1;

  			const a = [];
  			for ( let i = 0; i <= p; ++ i ) {

  				a[ i ] = zeroArr.slice( 0 );

  			}

  			a[ 0 ][ 0 ] = 1.0;

  			for ( let k = 1; k <= n; ++ k ) {

  				let d = 0.0;
  				const rk = r - k;
  				const pk = p - k;

  				if ( r >= k ) {

  					a[ s2 ][ 0 ] = a[ s1 ][ 0 ] / ndu[ pk + 1 ][ rk ];
  					d = a[ s2 ][ 0 ] * ndu[ rk ][ pk ];

  				}

  				const j1 = ( rk >= - 1 ) ? 1 : - rk;
  				const j2 = ( r - 1 <= pk ) ? k - 1 : p - r;

  				for ( let j = j1; j <= j2; ++ j ) {

  					a[ s2 ][ j ] = ( a[ s1 ][ j ] - a[ s1 ][ j - 1 ] ) / ndu[ pk + 1 ][ rk + j ];
  					d += a[ s2 ][ j ] * ndu[ rk + j ][ pk ];

  				}

  				if ( r <= pk ) {

  					a[ s2 ][ k ] = - a[ s1 ][ k - 1 ] / ndu[ pk + 1 ][ r ];
  					d += a[ s2 ][ k ] * ndu[ r ][ pk ];

  				}

  				ders[ k ][ r ] = d;

  				const j = s1;
  				s1 = s2;
  				s2 = j;

  			}

  		}

  		let r = p;

  		for ( let k = 1; k <= n; ++ k ) {

  			for ( let j = 0; j <= p; ++ j ) {

  				ders[ k ][ j ] *= r;

  			}

  			r *= p - k;

  		}

  		return ders;

  	}


  	/*
  		Calculate derivatives of a B-Spline. See The NURBS Book, page 93, algorithm A3.2.

  		p  : degree
  		U  : knot vector
  		P  : control points
  		u  : Parametric points
  		nd : number of derivatives

  		returns array[d+1] with derivatives
  		*/
  	static calcBSplineDerivatives( p, U, P, u, nd ) {

  		const du = nd < p ? nd : p;
  		const CK = [];
  		const span = this.findSpan( p, u, U );
  		const nders = this.calcBasisFunctionDerivatives( span, u, p, du, U );
  		const Pw = [];

  		for ( let i = 0; i < P.length; ++ i ) {

  			const point = P[ i ].clone();
  			const w = point.w;

  			point.x *= w;
  			point.y *= w;
  			point.z *= w;

  			Pw[ i ] = point;

  		}

  		for ( let k = 0; k <= du; ++ k ) {

  			const point = Pw[ span - p ].clone().multiplyScalar( nders[ k ][ 0 ] );

  			for ( let j = 1; j <= p; ++ j ) {

  				point.add( Pw[ span - p + j ].clone().multiplyScalar( nders[ k ][ j ] ) );

  			}

  			CK[ k ] = point;

  		}

  		for ( let k = du + 1; k <= nd + 1; ++ k ) {

  			CK[ k ] = new THREE.Vector4( 0, 0, 0 );

  		}

  		return CK;

  	}


  	/*
  	Calculate "K over I"

  	returns k!/(i!(k-i)!)
  	*/
  	static calcKoverI( k, i ) {

  		let nom = 1;

  		for ( let j = 2; j <= k; ++ j ) {

  			nom *= j;

  		}

  		let denom = 1;

  		for ( let j = 2; j <= i; ++ j ) {

  			denom *= j;

  		}

  		for ( let j = 2; j <= k - i; ++ j ) {

  			denom *= j;

  		}

  		return nom / denom;

  	}


  	/*
  	Calculate derivatives (0-nd) of rational curve. See The NURBS Book, page 127, algorithm A4.2.

  	Pders : result of function calcBSplineDerivatives

  	returns array with derivatives for rational curve.
  	*/
  	static calcRationalCurveDerivatives( Pders ) {

  		const nd = Pders.length;
  		const Aders = [];
  		const wders = [];

  		for ( let i = 0; i < nd; ++ i ) {

  			const point = Pders[ i ];
  			Aders[ i ] = new THREE.Vector3( point.x, point.y, point.z );
  			wders[ i ] = point.w;

  		}

  		const CK = [];

  		for ( let k = 0; k < nd; ++ k ) {

  			const v = Aders[ k ].clone();

  			for ( let i = 1; i <= k; ++ i ) {

  				v.sub( CK[ k - i ].clone().multiplyScalar( this.calcKoverI( k, i ) * wders[ i ] ) );

  			}

  			CK[ k ] = v.divideScalar( wders[ 0 ] );

  		}

  		return CK;

  	}


  	/*
  	Calculate NURBS curve derivatives. See The NURBS Book, page 127, algorithm A4.2.

  	p  : degree
  	U  : knot vector
  	P  : control points in homogeneous space
  	u  : parametric points
  	nd : number of derivatives

  	returns array with derivatives.
  	*/
  	static calcNURBSDerivatives( p, U, P, u, nd ) {

  		const Pders = this.calcBSplineDerivatives( p, U, P, u, nd );
  		return this.calcRationalCurveDerivatives( Pders );

  	}


  	/*
  	Calculate rational B-Spline surface point. See The NURBS Book, page 134, algorithm A4.3.

  	p1, p2 : degrees of B-Spline surface
  	U1, U2 : knot vectors
  	P      : control points (x, y, z, w)
  	u, v   : parametric values

  	returns point for given (u, v)
  	*/
  	static calcSurfacePoint( p, q, U, V, P, u, v, target ) {

  		const uspan = this.findSpan( p, u, U );
  		const vspan = this.findSpan( q, v, V );
  		const Nu = this.calcBasisFunctions( uspan, u, p, U );
  		const Nv = this.calcBasisFunctions( vspan, v, q, V );
  		const temp = [];

  		for ( let l = 0; l <= q; ++ l ) {

  			temp[ l ] = new THREE.Vector4( 0, 0, 0, 0 );
  			for ( let k = 0; k <= p; ++ k ) {

  				const point = P[ uspan - p + k ][ vspan - q + l ].clone();
  				const w = point.w;
  				point.x *= w;
  				point.y *= w;
  				point.z *= w;
  				temp[ l ].add( point.multiplyScalar( Nu[ k ] ) );

  			}

  		}

  		const Sw = new THREE.Vector4( 0, 0, 0, 0 );
  		for ( let l = 0; l <= q; ++ l ) {

  			Sw.add( temp[ l ].multiplyScalar( Nv[ l ] ) );

  		}

  		Sw.divideScalar( Sw.w );
  		target.set( Sw.x, Sw.y, Sw.z );

  	}

  }

  /**
   * NURBS curve object
   *
   * Derives from Curve, overriding getPoint and getTangent.
   *
   * Implementation is based on (x, y [, z=0 [, w=1]]) control points with w=weight.
   *
   **/

  class NURBSCurve extends THREE.Curve {

  	constructor(
  		degree,
  		knots /* array of reals */,
  		controlPoints /* array of Vector(2|3|4) */,
  		startKnot /* index in knots */,
  		endKnot /* index in knots */
  	) {

  		super();

  		this.degree = degree;
  		this.knots = knots;
  		this.controlPoints = [];
  		// Used by periodic NURBS to remove hidden spans
  		this.startKnot = startKnot || 0;
  		this.endKnot = endKnot || ( this.knots.length - 1 );

  		for ( let i = 0; i < controlPoints.length; ++ i ) {

  			// ensure Vector4 for control points
  			const point = controlPoints[ i ];
  			this.controlPoints[ i ] = new THREE.Vector4( point.x, point.y, point.z, point.w );

  		}

  	}

  	getPoint( t, optionalTarget = new THREE.Vector3() ) {

  		const point = optionalTarget;

  		const u = this.knots[ this.startKnot ] + t * ( this.knots[ this.endKnot ] - this.knots[ this.startKnot ] ); // linear mapping t->u

  		// following results in (wx, wy, wz, w) homogeneous point
  		const hpoint = NURBSUtils.calcBSplinePoint( this.degree, this.knots, this.controlPoints, u );

  		if ( hpoint.w !== 1.0 ) {

  			// project to 3D space: (wx, wy, wz, w) -> (x, y, z, 1)
  			hpoint.divideScalar( hpoint.w );

  		}

  		return point.set( hpoint.x, hpoint.y, hpoint.z );

  	}

  	getTangent( t, optionalTarget = new THREE.Vector3() ) {

  		const tangent = optionalTarget;

  		const u = this.knots[ 0 ] + t * ( this.knots[ this.knots.length - 1 ] - this.knots[ 0 ] );
  		const ders = NURBSUtils.calcNURBSDerivatives( this.degree, this.knots, this.controlPoints, u, 1 );
  		tangent.copy( ders[ 1 ] ).normalize();

  		return tangent;

  	}

  }

  /**
   * Loader loads FBX file and generates Group representing FBX scene.
   * Requires FBX file to be >= 7.0 and in ASCII or >= 6400 in Binary format
   * Versions lower than this may load but will probably have errors
   *
   * Needs Support:
   *  Morph normals / blend shape normals
   *
   * FBX format references:
   * 	https://wiki.blender.org/index.php/User:Mont29/Foundation/FBX_File_Structure
   * 	http://help.autodesk.com/view/FBX/2017/ENU/?guid=__cpp_ref_index_html (C++ SDK reference)
   *
   * 	Binary format specification:
   *		https://code.blender.org/2013/08/fbx-binary-file-format-specification/
   */


  let fbxTree;
  let connections;
  let sceneGraph;

  class FBXLoader extends THREE.Loader {

  	constructor( manager ) {

  		super( manager );

  	}

  	load( url, onLoad, onProgress, onError ) {

  		const scope = this;

  		const path = ( scope.path === '' ) ? THREE.LoaderUtils.extractUrlBase( url ) : scope.path;

  		const loader = new THREE.FileLoader( this.manager );
  		loader.setPath( scope.path );
  		loader.setResponseType( 'arraybuffer' );
  		loader.setRequestHeader( scope.requestHeader );
  		loader.setWithCredentials( scope.withCredentials );

  		loader.load( url, function ( buffer ) {

  			try {

  				onLoad( scope.parse( buffer, path ) );

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

  	parse( FBXBuffer, path ) {

  		if ( isFbxFormatBinary( FBXBuffer ) ) {

  			fbxTree = new BinaryParser().parse( FBXBuffer );

  		} else {

  			const FBXText = convertArrayBufferToString( FBXBuffer );

  			if ( ! isFbxFormatASCII( FBXText ) ) {

  				throw new Error( 'THREE.FBXLoader: Unknown format.' );

  			}

  			if ( getFbxVersion( FBXText ) < 7000 ) {

  				throw new Error( 'THREE.FBXLoader: FBX version not supported, FileVersion: ' + getFbxVersion( FBXText ) );

  			}

  			fbxTree = new TextParser().parse( FBXText );

  		}

  		// console.log( fbxTree );

  		const textureLoader = new THREE.TextureLoader( this.manager ).setPath( this.resourcePath || path ).setCrossOrigin( this.crossOrigin );

  		return new FBXTreeParser( textureLoader, this.manager ).parse( fbxTree );

  	}

  }

  // Parse the FBXTree object returned by the BinaryParser or TextParser and return a Group
  class FBXTreeParser {

  	constructor( textureLoader, manager ) {

  		this.textureLoader = textureLoader;
  		this.manager = manager;

  	}

  	parse() {

  		connections = this.parseConnections();

  		const images = this.parseImages();
  		const textures = this.parseTextures( images );
  		const materials = this.parseMaterials( textures );
  		const deformers = this.parseDeformers();
  		const geometryMap = new GeometryParser().parse( deformers );

  		this.parseScene( deformers, geometryMap, materials );

  		return sceneGraph;

  	}

  	// Parses FBXTree.Connections which holds parent-child connections between objects (e.g. material -> texture, model->geometry )
  	// and details the connection type
  	parseConnections() {

  		const connectionMap = new Map();

  		if ( 'Connections' in fbxTree ) {

  			const rawConnections = fbxTree.Connections.connections;

  			rawConnections.forEach( function ( rawConnection ) {

  				const fromID = rawConnection[ 0 ];
  				const toID = rawConnection[ 1 ];
  				const relationship = rawConnection[ 2 ];

  				if ( ! connectionMap.has( fromID ) ) {

  					connectionMap.set( fromID, {
  						parents: [],
  						children: []
  					} );

  				}

  				const parentRelationship = { ID: toID, relationship: relationship };
  				connectionMap.get( fromID ).parents.push( parentRelationship );

  				if ( ! connectionMap.has( toID ) ) {

  					connectionMap.set( toID, {
  						parents: [],
  						children: []
  					} );

  				}

  				const childRelationship = { ID: fromID, relationship: relationship };
  				connectionMap.get( toID ).children.push( childRelationship );

  			} );

  		}

  		return connectionMap;

  	}

  	// Parse FBXTree.Objects.Video for embedded image data
  	// These images are connected to textures in FBXTree.Objects.Textures
  	// via FBXTree.Connections.
  	parseImages() {

  		const images = {};
  		const blobs = {};

  		if ( 'Video' in fbxTree.Objects ) {

  			const videoNodes = fbxTree.Objects.Video;

  			for ( const nodeID in videoNodes ) {

  				const videoNode = videoNodes[ nodeID ];

  				const id = parseInt( nodeID );

  				images[ id ] = videoNode.RelativeFilename || videoNode.Filename;

  				// raw image data is in videoNode.Content
  				if ( 'Content' in videoNode ) {

  					const arrayBufferContent = ( videoNode.Content instanceof ArrayBuffer ) && ( videoNode.Content.byteLength > 0 );
  					const base64Content = ( typeof videoNode.Content === 'string' ) && ( videoNode.Content !== '' );

  					if ( arrayBufferContent || base64Content ) {

  						const image = this.parseImage( videoNodes[ nodeID ] );

  						blobs[ videoNode.RelativeFilename || videoNode.Filename ] = image;

  					}

  				}

  			}

  		}

  		for ( const id in images ) {

  			const filename = images[ id ];

  			if ( blobs[ filename ] !== undefined ) images[ id ] = blobs[ filename ];
  			else images[ id ] = images[ id ].split( '\\' ).pop();

  		}

  		return images;

  	}

  	// Parse embedded image data in FBXTree.Video.Content
  	parseImage( videoNode ) {

  		const content = videoNode.Content;
  		const fileName = videoNode.RelativeFilename || videoNode.Filename;
  		const extension = fileName.slice( fileName.lastIndexOf( '.' ) + 1 ).toLowerCase();

  		let type;

  		switch ( extension ) {

  			case 'bmp':

  				type = 'image/bmp';
  				break;

  			case 'jpg':
  			case 'jpeg':

  				type = 'image/jpeg';
  				break;

  			case 'png':

  				type = 'image/png';
  				break;

  			case 'tif':

  				type = 'image/tiff';
  				break;

  			case 'tga':

  				if ( this.manager.getHandler( '.tga' ) === null ) {

  					console.warn( 'FBXLoader: TGA loader not found, skipping ', fileName );

  				}

  				type = 'image/tga';
  				break;

  			default:

  				console.warn( 'FBXLoader: Image type "' + extension + '" is not supported.' );
  				return;

  		}

  		if ( typeof content === 'string' ) { // ASCII format

  			return 'data:' + type + ';base64,' + content;

  		} else { // Binary Format

  			const array = new Uint8Array( content );
  			return window.URL.createObjectURL( new Blob( [ array ], { type: type } ) );

  		}

  	}

  	// Parse nodes in FBXTree.Objects.Texture
  	// These contain details such as UV scaling, cropping, rotation etc and are connected
  	// to images in FBXTree.Objects.Video
  	parseTextures( images ) {

  		const textureMap = new Map();

  		if ( 'Texture' in fbxTree.Objects ) {

  			const textureNodes = fbxTree.Objects.Texture;
  			for ( const nodeID in textureNodes ) {

  				const texture = this.parseTexture( textureNodes[ nodeID ], images );
  				textureMap.set( parseInt( nodeID ), texture );

  			}

  		}

  		return textureMap;

  	}

  	// Parse individual node in FBXTree.Objects.Texture
  	parseTexture( textureNode, images ) {

  		const texture = this.loadTexture( textureNode, images );

  		texture.ID = textureNode.id;

  		texture.name = textureNode.attrName;

  		const wrapModeU = textureNode.WrapModeU;
  		const wrapModeV = textureNode.WrapModeV;

  		const valueU = wrapModeU !== undefined ? wrapModeU.value : 0;
  		const valueV = wrapModeV !== undefined ? wrapModeV.value : 0;

  		// http://download.autodesk.com/us/fbx/SDKdocs/FBX_SDK_Help/files/fbxsdkref/class_k_fbx_texture.html#889640e63e2e681259ea81061b85143a
  		// 0: repeat(default), 1: clamp

  		texture.wrapS = valueU === 0 ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  		texture.wrapT = valueV === 0 ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;

  		if ( 'Scaling' in textureNode ) {

  			const values = textureNode.Scaling.value;

  			texture.repeat.x = values[ 0 ];
  			texture.repeat.y = values[ 1 ];

  		}

  		return texture;

  	}

  	// load a texture specified as a blob or data URI, or via an external URL using TextureLoader
  	loadTexture( textureNode, images ) {

  		let fileName;

  		const currentPath = this.textureLoader.path;

  		const children = connections.get( textureNode.id ).children;

  		if ( children !== undefined && children.length > 0 && images[ children[ 0 ].ID ] !== undefined ) {

  			fileName = images[ children[ 0 ].ID ];

  			if ( fileName.indexOf( 'blob:' ) === 0 || fileName.indexOf( 'data:' ) === 0 ) {

  				this.textureLoader.setPath( undefined );

  			}

  		}

  		let texture;

  		const extension = textureNode.FileName.slice( - 3 ).toLowerCase();

  		if ( extension === 'tga' ) {

  			const loader = this.manager.getHandler( '.tga' );

  			if ( loader === null ) {

  				console.warn( 'FBXLoader: TGA loader not found, creating placeholder texture for', textureNode.RelativeFilename );
  				texture = new THREE.Texture();

  			} else {

  				texture = loader.load( fileName );

  			}

  		} else if ( extension === 'psd' ) {

  			console.warn( 'FBXLoader: PSD textures are not supported, creating placeholder texture for', textureNode.RelativeFilename );
  			texture = new THREE.Texture();

  		} else {

  			texture = this.textureLoader.load( fileName );

  		}

  		this.textureLoader.setPath( currentPath );

  		return texture;

  	}

  	// Parse nodes in FBXTree.Objects.Material
  	parseMaterials( textureMap ) {

  		const materialMap = new Map();

  		if ( 'Material' in fbxTree.Objects ) {

  			const materialNodes = fbxTree.Objects.Material;

  			for ( const nodeID in materialNodes ) {

  				const material = this.parseMaterial( materialNodes[ nodeID ], textureMap );

  				if ( material !== null ) materialMap.set( parseInt( nodeID ), material );

  			}

  		}

  		return materialMap;

  	}

  	// Parse single node in FBXTree.Objects.Material
  	// Materials are connected to texture maps in FBXTree.Objects.Textures
  	// FBX format currently only supports Lambert and Phong shading models
  	parseMaterial( materialNode, textureMap ) {

  		const ID = materialNode.id;
  		const name = materialNode.attrName;
  		let type = materialNode.ShadingModel;

  		// Case where FBX wraps shading model in property object.
  		if ( typeof type === 'object' ) {

  			type = type.value;

  		}

  		// Ignore unused materials which don't have any connections.
  		if ( ! connections.has( ID ) ) return null;

  		const parameters = this.parseParameters( materialNode, textureMap, ID );

  		let material;

  		switch ( type.toLowerCase() ) {

  			case 'phong':
  				material = new THREE.MeshPhongMaterial();
  				break;
  			case 'lambert':
  				material = new THREE.MeshLambertMaterial();
  				break;
  			default:
  				console.warn( 'THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.', type );
  				material = new THREE.MeshPhongMaterial();
  				break;

  		}

  		material.setValues( parameters );
  		material.name = name;

  		return material;

  	}

  	// Parse FBX material and return parameters suitable for a three.js material
  	// Also parse the texture map and return any textures associated with the material
  	parseParameters( materialNode, textureMap, ID ) {

  		const parameters = {};

  		if ( materialNode.BumpFactor ) {

  			parameters.bumpScale = materialNode.BumpFactor.value;

  		}

  		if ( materialNode.Diffuse ) {

  			parameters.color = new THREE.Color().fromArray( materialNode.Diffuse.value );

  		} else if ( materialNode.DiffuseColor && ( materialNode.DiffuseColor.type === 'Color' || materialNode.DiffuseColor.type === 'ColorRGB' ) ) {

  			// The blender exporter exports diffuse here instead of in materialNode.Diffuse
  			parameters.color = new THREE.Color().fromArray( materialNode.DiffuseColor.value );

  		}

  		if ( materialNode.DisplacementFactor ) {

  			parameters.displacementScale = materialNode.DisplacementFactor.value;

  		}

  		if ( materialNode.Emissive ) {

  			parameters.emissive = new THREE.Color().fromArray( materialNode.Emissive.value );

  		} else if ( materialNode.EmissiveColor && ( materialNode.EmissiveColor.type === 'Color' || materialNode.EmissiveColor.type === 'ColorRGB' ) ) {

  			// The blender exporter exports emissive color here instead of in materialNode.Emissive
  			parameters.emissive = new THREE.Color().fromArray( materialNode.EmissiveColor.value );

  		}

  		if ( materialNode.EmissiveFactor ) {

  			parameters.emissiveIntensity = parseFloat( materialNode.EmissiveFactor.value );

  		}

  		if ( materialNode.Opacity ) {

  			parameters.opacity = parseFloat( materialNode.Opacity.value );

  		}

  		if ( parameters.opacity < 1.0 ) {

  			parameters.transparent = true;

  		}

  		if ( materialNode.ReflectionFactor ) {

  			parameters.reflectivity = materialNode.ReflectionFactor.value;

  		}

  		if ( materialNode.Shininess ) {

  			parameters.shininess = materialNode.Shininess.value;

  		}

  		if ( materialNode.Specular ) {

  			parameters.specular = new THREE.Color().fromArray( materialNode.Specular.value );

  		} else if ( materialNode.SpecularColor && materialNode.SpecularColor.type === 'Color' ) {

  			// The blender exporter exports specular color here instead of in materialNode.Specular
  			parameters.specular = new THREE.Color().fromArray( materialNode.SpecularColor.value );

  		}

  		const scope = this;
  		connections.get( ID ).children.forEach( function ( child ) {

  			const type = child.relationship;

  			switch ( type ) {

  				case 'Bump':
  					parameters.bumpMap = scope.getTexture( textureMap, child.ID );
  					break;

  				case 'Maya|TEX_ao_map':
  					parameters.aoMap = scope.getTexture( textureMap, child.ID );
  					break;

  				case 'DiffuseColor':
  				case 'Maya|TEX_color_map':
  					parameters.map = scope.getTexture( textureMap, child.ID );
  					parameters.map.encoding = THREE.sRGBEncoding;
  					break;

  				case 'DisplacementColor':
  					parameters.displacementMap = scope.getTexture( textureMap, child.ID );
  					break;

  				case 'EmissiveColor':
  					parameters.emissiveMap = scope.getTexture( textureMap, child.ID );
  					parameters.emissiveMap.encoding = THREE.sRGBEncoding;
  					break;

  				case 'NormalMap':
  				case 'Maya|TEX_normal_map':
  					parameters.normalMap = scope.getTexture( textureMap, child.ID );
  					break;

  				case 'ReflectionColor':
  					parameters.envMap = scope.getTexture( textureMap, child.ID );
  					parameters.envMap.mapping = THREE.EquirectangularReflectionMapping;
  					parameters.envMap.encoding = THREE.sRGBEncoding;
  					break;

  				case 'SpecularColor':
  					parameters.specularMap = scope.getTexture( textureMap, child.ID );
  					parameters.specularMap.encoding = THREE.sRGBEncoding;
  					break;

  				case 'TransparentColor':
  				case 'TransparencyFactor':
  					parameters.alphaMap = scope.getTexture( textureMap, child.ID );
  					parameters.transparent = true;
  					break;

  				case 'AmbientColor':
  				case 'ShininessExponent': // AKA glossiness map
  				case 'SpecularFactor': // AKA specularLevel
  				case 'VectorDisplacementColor': // NOTE: Seems to be a copy of DisplacementColor
  				default:
  					console.warn( 'THREE.FBXLoader: %s map is not supported in three.js, skipping texture.', type );
  					break;

  			}

  		} );

  		return parameters;

  	}

  	// get a texture from the textureMap for use by a material.
  	getTexture( textureMap, id ) {

  		// if the texture is a layered texture, just use the first layer and issue a warning
  		if ( 'LayeredTexture' in fbxTree.Objects && id in fbxTree.Objects.LayeredTexture ) {

  			console.warn( 'THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer.' );
  			id = connections.get( id ).children[ 0 ].ID;

  		}

  		return textureMap.get( id );

  	}

  	// Parse nodes in FBXTree.Objects.Deformer
  	// Deformer node can contain skinning or Vertex Cache animation data, however only skinning is supported here
  	// Generates map of Skeleton-like objects for use later when generating and binding skeletons.
  	parseDeformers() {

  		const skeletons = {};
  		const morphTargets = {};

  		if ( 'Deformer' in fbxTree.Objects ) {

  			const DeformerNodes = fbxTree.Objects.Deformer;

  			for ( const nodeID in DeformerNodes ) {

  				const deformerNode = DeformerNodes[ nodeID ];

  				const relationships = connections.get( parseInt( nodeID ) );

  				if ( deformerNode.attrType === 'Skin' ) {

  					const skeleton = this.parseSkeleton( relationships, DeformerNodes );
  					skeleton.ID = nodeID;

  					if ( relationships.parents.length > 1 ) console.warn( 'THREE.FBXLoader: skeleton attached to more than one geometry is not supported.' );
  					skeleton.geometryID = relationships.parents[ 0 ].ID;

  					skeletons[ nodeID ] = skeleton;

  				} else if ( deformerNode.attrType === 'BlendShape' ) {

  					const morphTarget = {
  						id: nodeID,
  					};

  					morphTarget.rawTargets = this.parseMorphTargets( relationships, DeformerNodes );
  					morphTarget.id = nodeID;

  					if ( relationships.parents.length > 1 ) console.warn( 'THREE.FBXLoader: morph target attached to more than one geometry is not supported.' );

  					morphTargets[ nodeID ] = morphTarget;

  				}

  			}

  		}

  		return {

  			skeletons: skeletons,
  			morphTargets: morphTargets,

  		};

  	}

  	// Parse single nodes in FBXTree.Objects.Deformer
  	// The top level skeleton node has type 'Skin' and sub nodes have type 'Cluster'
  	// Each skin node represents a skeleton and each cluster node represents a bone
  	parseSkeleton( relationships, deformerNodes ) {

  		const rawBones = [];

  		relationships.children.forEach( function ( child ) {

  			const boneNode = deformerNodes[ child.ID ];

  			if ( boneNode.attrType !== 'Cluster' ) return;

  			const rawBone = {

  				ID: child.ID,
  				indices: [],
  				weights: [],
  				transformLink: new THREE.Matrix4().fromArray( boneNode.TransformLink.a ),
  				// transform: new Matrix4().fromArray( boneNode.Transform.a ),
  				// linkMode: boneNode.Mode,

  			};

  			if ( 'Indexes' in boneNode ) {

  				rawBone.indices = boneNode.Indexes.a;
  				rawBone.weights = boneNode.Weights.a;

  			}

  			rawBones.push( rawBone );

  		} );

  		return {

  			rawBones: rawBones,
  			bones: []

  		};

  	}

  	// The top level morph deformer node has type "BlendShape" and sub nodes have type "BlendShapeChannel"
  	parseMorphTargets( relationships, deformerNodes ) {

  		const rawMorphTargets = [];

  		for ( let i = 0; i < relationships.children.length; i ++ ) {

  			const child = relationships.children[ i ];

  			const morphTargetNode = deformerNodes[ child.ID ];

  			const rawMorphTarget = {

  				name: morphTargetNode.attrName,
  				initialWeight: morphTargetNode.DeformPercent,
  				id: morphTargetNode.id,
  				fullWeights: morphTargetNode.FullWeights.a

  			};

  			if ( morphTargetNode.attrType !== 'BlendShapeChannel' ) return;

  			rawMorphTarget.geoID = connections.get( parseInt( child.ID ) ).children.filter( function ( child ) {

  				return child.relationship === undefined;

  			} )[ 0 ].ID;

  			rawMorphTargets.push( rawMorphTarget );

  		}

  		return rawMorphTargets;

  	}

  	// create the main Group() to be returned by the loader
  	parseScene( deformers, geometryMap, materialMap ) {

  		sceneGraph = new THREE.Group();

  		const modelMap = this.parseModels( deformers.skeletons, geometryMap, materialMap );

  		const modelNodes = fbxTree.Objects.Model;

  		const scope = this;
  		modelMap.forEach( function ( model ) {

  			const modelNode = modelNodes[ model.ID ];
  			scope.setLookAtProperties( model, modelNode );

  			const parentConnections = connections.get( model.ID ).parents;

  			parentConnections.forEach( function ( connection ) {

  				const parent = modelMap.get( connection.ID );
  				if ( parent !== undefined ) parent.add( model );

  			} );

  			if ( model.parent === null ) {

  				sceneGraph.add( model );

  			}


  		} );

  		this.bindSkeleton( deformers.skeletons, geometryMap, modelMap );

  		this.createAmbientLight();

  		this.setupMorphMaterials();

  		sceneGraph.traverse( function ( node ) {

  			if ( node.userData.transformData ) {

  				if ( node.parent ) {

  					node.userData.transformData.parentMatrix = node.parent.matrix;
  					node.userData.transformData.parentMatrixWorld = node.parent.matrixWorld;

  				}

  				const transform = generateTransform( node.userData.transformData );

  				node.applyMatrix4( transform );
  				node.updateWorldMatrix();

  			}

  		} );

  		const animations = new AnimationParser().parse();

  		// if all the models where already combined in a single group, just return that
  		if ( sceneGraph.children.length === 1 && sceneGraph.children[ 0 ].isGroup ) {

  			sceneGraph.children[ 0 ].animations = animations;
  			sceneGraph = sceneGraph.children[ 0 ];

  		}

  		sceneGraph.animations = animations;

  	}

  	// parse nodes in FBXTree.Objects.Model
  	parseModels( skeletons, geometryMap, materialMap ) {

  		const modelMap = new Map();
  		const modelNodes = fbxTree.Objects.Model;

  		for ( const nodeID in modelNodes ) {

  			const id = parseInt( nodeID );
  			const node = modelNodes[ nodeID ];
  			const relationships = connections.get( id );

  			let model = this.buildSkeleton( relationships, skeletons, id, node.attrName );

  			if ( ! model ) {

  				switch ( node.attrType ) {

  					case 'Camera':
  						model = this.createCamera( relationships );
  						break;
  					case 'Light':
  						model = this.createLight( relationships );
  						break;
  					case 'Mesh':
  						model = this.createMesh( relationships, geometryMap, materialMap );
  						break;
  					case 'NurbsCurve':
  						model = this.createCurve( relationships, geometryMap );
  						break;
  					case 'LimbNode':
  					case 'Root':
  						model = new THREE.Bone();
  						break;
  					case 'Null':
  					default:
  						model = new THREE.Group();
  						break;

  				}

  				model.name = node.attrName ? THREE.PropertyBinding.sanitizeNodeName( node.attrName ) : '';

  				model.ID = id;

  			}

  			this.getTransformData( model, node );
  			modelMap.set( id, model );

  		}

  		return modelMap;

  	}

  	buildSkeleton( relationships, skeletons, id, name ) {

  		let bone = null;

  		relationships.parents.forEach( function ( parent ) {

  			for ( const ID in skeletons ) {

  				const skeleton = skeletons[ ID ];

  				skeleton.rawBones.forEach( function ( rawBone, i ) {

  					if ( rawBone.ID === parent.ID ) {

  						const subBone = bone;
  						bone = new THREE.Bone();

  						bone.matrixWorld.copy( rawBone.transformLink );

  						// set name and id here - otherwise in cases where "subBone" is created it will not have a name / id

  						bone.name = name ? THREE.PropertyBinding.sanitizeNodeName( name ) : '';
  						bone.ID = id;

  						skeleton.bones[ i ] = bone;

  						// In cases where a bone is shared between multiple meshes
  						// duplicate the bone here and and it as a child of the first bone
  						if ( subBone !== null ) {

  							bone.add( subBone );

  						}

  					}

  				} );

  			}

  		} );

  		return bone;

  	}

  	// create a PerspectiveCamera or OrthographicCamera
  	createCamera( relationships ) {

  		let model;
  		let cameraAttribute;

  		relationships.children.forEach( function ( child ) {

  			const attr = fbxTree.Objects.NodeAttribute[ child.ID ];

  			if ( attr !== undefined ) {

  				cameraAttribute = attr;

  			}

  		} );

  		if ( cameraAttribute === undefined ) {

  			model = new THREE.Object3D();

  		} else {

  			let type = 0;
  			if ( cameraAttribute.CameraProjectionType !== undefined && cameraAttribute.CameraProjectionType.value === 1 ) {

  				type = 1;

  			}

  			let nearClippingPlane = 1;
  			if ( cameraAttribute.NearPlane !== undefined ) {

  				nearClippingPlane = cameraAttribute.NearPlane.value / 1000;

  			}

  			let farClippingPlane = 1000;
  			if ( cameraAttribute.FarPlane !== undefined ) {

  				farClippingPlane = cameraAttribute.FarPlane.value / 1000;

  			}


  			let width = window.innerWidth;
  			let height = window.innerHeight;

  			if ( cameraAttribute.AspectWidth !== undefined && cameraAttribute.AspectHeight !== undefined ) {

  				width = cameraAttribute.AspectWidth.value;
  				height = cameraAttribute.AspectHeight.value;

  			}

  			const aspect = width / height;

  			let fov = 45;
  			if ( cameraAttribute.FieldOfView !== undefined ) {

  				fov = cameraAttribute.FieldOfView.value;

  			}

  			const focalLength = cameraAttribute.FocalLength ? cameraAttribute.FocalLength.value : null;

  			switch ( type ) {

  				case 0: // Perspective
  					model = new THREE.PerspectiveCamera( fov, aspect, nearClippingPlane, farClippingPlane );
  					if ( focalLength !== null ) model.setFocalLength( focalLength );
  					break;

  				case 1: // Orthographic
  					model = new THREE.OrthographicCamera( - width / 2, width / 2, height / 2, - height / 2, nearClippingPlane, farClippingPlane );
  					break;

  				default:
  					console.warn( 'THREE.FBXLoader: Unknown camera type ' + type + '.' );
  					model = new THREE.Object3D();
  					break;

  			}

  		}

  		return model;

  	}

  	// Create a DirectionalLight, PointLight or SpotLight
  	createLight( relationships ) {

  		let model;
  		let lightAttribute;

  		relationships.children.forEach( function ( child ) {

  			const attr = fbxTree.Objects.NodeAttribute[ child.ID ];

  			if ( attr !== undefined ) {

  				lightAttribute = attr;

  			}

  		} );

  		if ( lightAttribute === undefined ) {

  			model = new THREE.Object3D();

  		} else {

  			let type;

  			// LightType can be undefined for Point lights
  			if ( lightAttribute.LightType === undefined ) {

  				type = 0;

  			} else {

  				type = lightAttribute.LightType.value;

  			}

  			let color = 0xffffff;

  			if ( lightAttribute.Color !== undefined ) {

  				color = new THREE.Color().fromArray( lightAttribute.Color.value );

  			}

  			let intensity = ( lightAttribute.Intensity === undefined ) ? 1 : lightAttribute.Intensity.value / 100;

  			// light disabled
  			if ( lightAttribute.CastLightOnObject !== undefined && lightAttribute.CastLightOnObject.value === 0 ) {

  				intensity = 0;

  			}

  			let distance = 0;
  			if ( lightAttribute.FarAttenuationEnd !== undefined ) {

  				if ( lightAttribute.EnableFarAttenuation !== undefined && lightAttribute.EnableFarAttenuation.value === 0 ) {

  					distance = 0;

  				} else {

  					distance = lightAttribute.FarAttenuationEnd.value;

  				}

  			}

  			// TODO: could this be calculated linearly from FarAttenuationStart to FarAttenuationEnd?
  			const decay = 1;

  			switch ( type ) {

  				case 0: // Point
  					model = new THREE.PointLight( color, intensity, distance, decay );
  					break;

  				case 1: // Directional
  					model = new THREE.DirectionalLight( color, intensity );
  					break;

  				case 2: // Spot
  					let angle = Math.PI / 3;

  					if ( lightAttribute.InnerAngle !== undefined ) {

  						angle = THREE.MathUtils.degToRad( lightAttribute.InnerAngle.value );

  					}

  					let penumbra = 0;
  					if ( lightAttribute.OuterAngle !== undefined ) {

  						// TODO: this is not correct - FBX calculates outer and inner angle in degrees
  						// with OuterAngle > InnerAngle && OuterAngle <= Math.PI
  						// while three.js uses a penumbra between (0, 1) to attenuate the inner angle
  						penumbra = THREE.MathUtils.degToRad( lightAttribute.OuterAngle.value );
  						penumbra = Math.max( penumbra, 1 );

  					}

  					model = new THREE.SpotLight( color, intensity, distance, angle, penumbra, decay );
  					break;

  				default:
  					console.warn( 'THREE.FBXLoader: Unknown light type ' + lightAttribute.LightType.value + ', defaulting to a PointLight.' );
  					model = new THREE.PointLight( color, intensity );
  					break;

  			}

  			if ( lightAttribute.CastShadows !== undefined && lightAttribute.CastShadows.value === 1 ) {

  				model.castShadow = true;

  			}

  		}

  		return model;

  	}

  	createMesh( relationships, geometryMap, materialMap ) {

  		let model;
  		let geometry = null;
  		let material = null;
  		const materials = [];

  		// get geometry and materials(s) from connections
  		relationships.children.forEach( function ( child ) {

  			if ( geometryMap.has( child.ID ) ) {

  				geometry = geometryMap.get( child.ID );

  			}

  			if ( materialMap.has( child.ID ) ) {

  				materials.push( materialMap.get( child.ID ) );

  			}

  		} );

  		if ( materials.length > 1 ) {

  			material = materials;

  		} else if ( materials.length > 0 ) {

  			material = materials[ 0 ];

  		} else {

  			material = new THREE.MeshPhongMaterial( { color: 0xcccccc } );
  			materials.push( material );

  		}

  		if ( 'color' in geometry.attributes ) {

  			materials.forEach( function ( material ) {

  				material.vertexColors = true;

  			} );

  		}

  		if ( geometry.FBX_Deformer ) {

  			materials.forEach( function ( material ) {

  				material.skinning = true;

  			} );

  			model = new THREE.SkinnedMesh( geometry, material );
  			model.normalizeSkinWeights();

  		} else {

  			model = new THREE.Mesh( geometry, material );

  		}

  		return model;

  	}

  	createCurve( relationships, geometryMap ) {

  		const geometry = relationships.children.reduce( function ( geo, child ) {

  			if ( geometryMap.has( child.ID ) ) geo = geometryMap.get( child.ID );

  			return geo;

  		}, null );

  		// FBX does not list materials for Nurbs lines, so we'll just put our own in here.
  		const material = new THREE.LineBasicMaterial( { color: 0x3300ff, linewidth: 1 } );
  		return new THREE.Line( geometry, material );

  	}

  	// parse the model node for transform data
  	getTransformData( model, modelNode ) {

  		const transformData = {};

  		if ( 'InheritType' in modelNode ) transformData.inheritType = parseInt( modelNode.InheritType.value );

  		if ( 'RotationOrder' in modelNode ) transformData.eulerOrder = getEulerOrder( modelNode.RotationOrder.value );
  		else transformData.eulerOrder = 'ZYX';

  		if ( 'Lcl_Translation' in modelNode ) transformData.translation = modelNode.Lcl_Translation.value;

  		if ( 'PreRotation' in modelNode ) transformData.preRotation = modelNode.PreRotation.value;
  		if ( 'Lcl_Rotation' in modelNode ) transformData.rotation = modelNode.Lcl_Rotation.value;
  		if ( 'PostRotation' in modelNode ) transformData.postRotation = modelNode.PostRotation.value;

  		if ( 'Lcl_Scaling' in modelNode ) transformData.scale = modelNode.Lcl_Scaling.value;

  		if ( 'ScalingOffset' in modelNode ) transformData.scalingOffset = modelNode.ScalingOffset.value;
  		if ( 'ScalingPivot' in modelNode ) transformData.scalingPivot = modelNode.ScalingPivot.value;

  		if ( 'RotationOffset' in modelNode ) transformData.rotationOffset = modelNode.RotationOffset.value;
  		if ( 'RotationPivot' in modelNode ) transformData.rotationPivot = modelNode.RotationPivot.value;

  		model.userData.transformData = transformData;

  	}

  	setLookAtProperties( model, modelNode ) {

  		if ( 'LookAtProperty' in modelNode ) {

  			const children = connections.get( model.ID ).children;

  			children.forEach( function ( child ) {

  				if ( child.relationship === 'LookAtProperty' ) {

  					const lookAtTarget = fbxTree.Objects.Model[ child.ID ];

  					if ( 'Lcl_Translation' in lookAtTarget ) {

  						const pos = lookAtTarget.Lcl_Translation.value;

  						// DirectionalLight, SpotLight
  						if ( model.target !== undefined ) {

  							model.target.position.fromArray( pos );
  							sceneGraph.add( model.target );

  						} else { // Cameras and other Object3Ds

  							model.lookAt( new THREE.Vector3().fromArray( pos ) );

  						}

  					}

  				}

  			} );

  		}

  	}

  	bindSkeleton( skeletons, geometryMap, modelMap ) {

  		const bindMatrices = this.parsePoseNodes();

  		for ( const ID in skeletons ) {

  			const skeleton = skeletons[ ID ];

  			const parents = connections.get( parseInt( skeleton.ID ) ).parents;

  			parents.forEach( function ( parent ) {

  				if ( geometryMap.has( parent.ID ) ) {

  					const geoID = parent.ID;
  					const geoRelationships = connections.get( geoID );

  					geoRelationships.parents.forEach( function ( geoConnParent ) {

  						if ( modelMap.has( geoConnParent.ID ) ) {

  							const model = modelMap.get( geoConnParent.ID );

  							model.bind( new THREE.Skeleton( skeleton.bones ), bindMatrices[ geoConnParent.ID ] );

  						}

  					} );

  				}

  			} );

  		}

  	}

  	parsePoseNodes() {

  		const bindMatrices = {};

  		if ( 'Pose' in fbxTree.Objects ) {

  			const BindPoseNode = fbxTree.Objects.Pose;

  			for ( const nodeID in BindPoseNode ) {

  				if ( BindPoseNode[ nodeID ].attrType === 'BindPose' ) {

  					const poseNodes = BindPoseNode[ nodeID ].PoseNode;

  					if ( Array.isArray( poseNodes ) ) {

  						poseNodes.forEach( function ( poseNode ) {

  							bindMatrices[ poseNode.Node ] = new THREE.Matrix4().fromArray( poseNode.Matrix.a );

  						} );

  					} else {

  						bindMatrices[ poseNodes.Node ] = new THREE.Matrix4().fromArray( poseNodes.Matrix.a );

  					}

  				}

  			}

  		}

  		return bindMatrices;

  	}

  	// Parse ambient color in FBXTree.GlobalSettings - if it's not set to black (default), create an ambient light
  	createAmbientLight() {

  		if ( 'GlobalSettings' in fbxTree && 'AmbientColor' in fbxTree.GlobalSettings ) {

  			const ambientColor = fbxTree.GlobalSettings.AmbientColor.value;
  			const r = ambientColor[ 0 ];
  			const g = ambientColor[ 1 ];
  			const b = ambientColor[ 2 ];

  			if ( r !== 0 || g !== 0 || b !== 0 ) {

  				const color = new THREE.Color( r, g, b );
  				sceneGraph.add( new THREE.AmbientLight( color, 1 ) );

  			}

  		}

  	}

  	setupMorphMaterials() {

  		const scope = this;
  		sceneGraph.traverse( function ( child ) {

  			if ( child.isMesh ) {

  				if ( child.geometry.morphAttributes.position && child.geometry.morphAttributes.position.length ) {

  					if ( Array.isArray( child.material ) ) {

  						child.material.forEach( function ( material, i ) {

  							scope.setupMorphMaterial( child, material, i );

  						} );

  					} else {

  						scope.setupMorphMaterial( child, child.material );

  					}

  				}

  			}

  		} );

  	}

  	setupMorphMaterial( child, material, index ) {

  		const uuid = child.uuid;
  		const matUuid = material.uuid;

  		// if a geometry has morph targets, it cannot share the material with other geometries
  		let sharedMat = false;

  		sceneGraph.traverse( function ( node ) {

  			if ( node.isMesh ) {

  				if ( Array.isArray( node.material ) ) {

  					node.material.forEach( function ( mat ) {

  						if ( mat.uuid === matUuid && node.uuid !== uuid ) sharedMat = true;

  					} );

  				} else if ( node.material.uuid === matUuid && node.uuid !== uuid ) sharedMat = true;

  			}

  		} );

  		if ( sharedMat === true ) {

  			const clonedMat = material.clone();
  			clonedMat.morphTargets = true;

  			if ( index === undefined ) child.material = clonedMat;
  			else child.material[ index ] = clonedMat;

  		} else material.morphTargets = true;

  	}

  }

  // parse Geometry data from FBXTree and return map of BufferGeometries
  class GeometryParser {

  	// Parse nodes in FBXTree.Objects.Geometry
  	parse( deformers ) {

  		const geometryMap = new Map();

  		if ( 'Geometry' in fbxTree.Objects ) {

  			const geoNodes = fbxTree.Objects.Geometry;

  			for ( const nodeID in geoNodes ) {

  				const relationships = connections.get( parseInt( nodeID ) );
  				const geo = this.parseGeometry( relationships, geoNodes[ nodeID ], deformers );

  				geometryMap.set( parseInt( nodeID ), geo );

  			}

  		}

  		return geometryMap;

  	}

  	// Parse single node in FBXTree.Objects.Geometry
  	parseGeometry( relationships, geoNode, deformers ) {

  		switch ( geoNode.attrType ) {

  			case 'Mesh':
  				return this.parseMeshGeometry( relationships, geoNode, deformers );

  			case 'NurbsCurve':
  				return this.parseNurbsGeometry( geoNode );

  		}

  	}

  	// Parse single node mesh geometry in FBXTree.Objects.Geometry
  	parseMeshGeometry( relationships, geoNode, deformers ) {

  		const skeletons = deformers.skeletons;
  		const morphTargets = [];

  		const modelNodes = relationships.parents.map( function ( parent ) {

  			return fbxTree.Objects.Model[ parent.ID ];

  		} );

  		// don't create geometry if it is not associated with any models
  		if ( modelNodes.length === 0 ) return;

  		const skeleton = relationships.children.reduce( function ( skeleton, child ) {

  			if ( skeletons[ child.ID ] !== undefined ) skeleton = skeletons[ child.ID ];

  			return skeleton;

  		}, null );

  		relationships.children.forEach( function ( child ) {

  			if ( deformers.morphTargets[ child.ID ] !== undefined ) {

  				morphTargets.push( deformers.morphTargets[ child.ID ] );

  			}

  		} );

  		// Assume one model and get the preRotation from that
  		// if there is more than one model associated with the geometry this may cause problems
  		const modelNode = modelNodes[ 0 ];

  		const transformData = {};

  		if ( 'RotationOrder' in modelNode ) transformData.eulerOrder = getEulerOrder( modelNode.RotationOrder.value );
  		if ( 'InheritType' in modelNode ) transformData.inheritType = parseInt( modelNode.InheritType.value );

  		if ( 'GeometricTranslation' in modelNode ) transformData.translation = modelNode.GeometricTranslation.value;
  		if ( 'GeometricRotation' in modelNode ) transformData.rotation = modelNode.GeometricRotation.value;
  		if ( 'GeometricScaling' in modelNode ) transformData.scale = modelNode.GeometricScaling.value;

  		const transform = generateTransform( transformData );

  		return this.genGeometry( geoNode, skeleton, morphTargets, transform );

  	}

  	// Generate a BufferGeometry from a node in FBXTree.Objects.Geometry
  	genGeometry( geoNode, skeleton, morphTargets, preTransform ) {

  		const geo = new THREE.BufferGeometry();
  		if ( geoNode.attrName ) geo.name = geoNode.attrName;

  		const geoInfo = this.parseGeoNode( geoNode, skeleton );
  		const buffers = this.genBuffers( geoInfo );

  		const positionAttribute = new THREE.Float32BufferAttribute( buffers.vertex, 3 );

  		positionAttribute.applyMatrix4( preTransform );

  		geo.setAttribute( 'position', positionAttribute );

  		if ( buffers.colors.length > 0 ) {

  			geo.setAttribute( 'color', new THREE.Float32BufferAttribute( buffers.colors, 3 ) );

  		}

  		if ( skeleton ) {

  			geo.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( buffers.weightsIndices, 4 ) );

  			geo.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( buffers.vertexWeights, 4 ) );

  			// used later to bind the skeleton to the model
  			geo.FBX_Deformer = skeleton;

  		}

  		if ( buffers.normal.length > 0 ) {

  			const normalMatrix = new THREE.Matrix3().getNormalMatrix( preTransform );

  			const normalAttribute = new THREE.Float32BufferAttribute( buffers.normal, 3 );
  			normalAttribute.applyNormalMatrix( normalMatrix );

  			geo.setAttribute( 'normal', normalAttribute );

  		}

  		buffers.uvs.forEach( function ( uvBuffer, i ) {

  			// subsequent uv buffers are called 'uv1', 'uv2', ...
  			let name = 'uv' + ( i + 1 ).toString();

  			// the first uv buffer is just called 'uv'
  			if ( i === 0 ) {

  				name = 'uv';

  			}

  			geo.setAttribute( name, new THREE.Float32BufferAttribute( buffers.uvs[ i ], 2 ) );

  		} );

  		if ( geoInfo.material && geoInfo.material.mappingType !== 'AllSame' ) {

  			// Convert the material indices of each vertex into rendering groups on the geometry.
  			let prevMaterialIndex = buffers.materialIndex[ 0 ];
  			let startIndex = 0;

  			buffers.materialIndex.forEach( function ( currentIndex, i ) {

  				if ( currentIndex !== prevMaterialIndex ) {

  					geo.addGroup( startIndex, i - startIndex, prevMaterialIndex );

  					prevMaterialIndex = currentIndex;
  					startIndex = i;

  				}

  			} );

  			// the loop above doesn't add the last group, do that here.
  			if ( geo.groups.length > 0 ) {

  				const lastGroup = geo.groups[ geo.groups.length - 1 ];
  				const lastIndex = lastGroup.start + lastGroup.count;

  				if ( lastIndex !== buffers.materialIndex.length ) {

  					geo.addGroup( lastIndex, buffers.materialIndex.length - lastIndex, prevMaterialIndex );

  				}

  			}

  			// case where there are multiple materials but the whole geometry is only
  			// using one of them
  			if ( geo.groups.length === 0 ) {

  				geo.addGroup( 0, buffers.materialIndex.length, buffers.materialIndex[ 0 ] );

  			}

  		}

  		this.addMorphTargets( geo, geoNode, morphTargets, preTransform );

  		return geo;

  	}

  	parseGeoNode( geoNode, skeleton ) {

  		const geoInfo = {};

  		geoInfo.vertexPositions = ( geoNode.Vertices !== undefined ) ? geoNode.Vertices.a : [];
  		geoInfo.vertexIndices = ( geoNode.PolygonVertexIndex !== undefined ) ? geoNode.PolygonVertexIndex.a : [];

  		if ( geoNode.LayerElementColor ) {

  			geoInfo.color = this.parseVertexColors( geoNode.LayerElementColor[ 0 ] );

  		}

  		if ( geoNode.LayerElementMaterial ) {

  			geoInfo.material = this.parseMaterialIndices( geoNode.LayerElementMaterial[ 0 ] );

  		}

  		if ( geoNode.LayerElementNormal ) {

  			geoInfo.normal = this.parseNormals( geoNode.LayerElementNormal[ 0 ] );

  		}

  		if ( geoNode.LayerElementUV ) {

  			geoInfo.uv = [];

  			let i = 0;
  			while ( geoNode.LayerElementUV[ i ] ) {

  				if ( geoNode.LayerElementUV[ i ].UV ) {

  					geoInfo.uv.push( this.parseUVs( geoNode.LayerElementUV[ i ] ) );

  				}

  				i ++;

  			}

  		}

  		geoInfo.weightTable = {};

  		if ( skeleton !== null ) {

  			geoInfo.skeleton = skeleton;

  			skeleton.rawBones.forEach( function ( rawBone, i ) {

  				// loop over the bone's vertex indices and weights
  				rawBone.indices.forEach( function ( index, j ) {

  					if ( geoInfo.weightTable[ index ] === undefined ) geoInfo.weightTable[ index ] = [];

  					geoInfo.weightTable[ index ].push( {

  						id: i,
  						weight: rawBone.weights[ j ],

  					} );

  				} );

  			} );

  		}

  		return geoInfo;

  	}

  	genBuffers( geoInfo ) {

  		const buffers = {
  			vertex: [],
  			normal: [],
  			colors: [],
  			uvs: [],
  			materialIndex: [],
  			vertexWeights: [],
  			weightsIndices: [],
  		};

  		let polygonIndex = 0;
  		let faceLength = 0;
  		let displayedWeightsWarning = false;

  		// these will hold data for a single face
  		let facePositionIndexes = [];
  		let faceNormals = [];
  		let faceColors = [];
  		let faceUVs = [];
  		let faceWeights = [];
  		let faceWeightIndices = [];

  		const scope = this;
  		geoInfo.vertexIndices.forEach( function ( vertexIndex, polygonVertexIndex ) {

  			let materialIndex;
  			let endOfFace = false;

  			// Face index and vertex index arrays are combined in a single array
  			// A cube with quad faces looks like this:
  			// PolygonVertexIndex: *24 {
  			//  a: 0, 1, 3, -3, 2, 3, 5, -5, 4, 5, 7, -7, 6, 7, 1, -1, 1, 7, 5, -4, 6, 0, 2, -5
  			//  }
  			// Negative numbers mark the end of a face - first face here is 0, 1, 3, -3
  			// to find index of last vertex bit shift the index: ^ - 1
  			if ( vertexIndex < 0 ) {

  				vertexIndex = vertexIndex ^ - 1; // equivalent to ( x * -1 ) - 1
  				endOfFace = true;

  			}

  			let weightIndices = [];
  			let weights = [];

  			facePositionIndexes.push( vertexIndex * 3, vertexIndex * 3 + 1, vertexIndex * 3 + 2 );

  			if ( geoInfo.color ) {

  				const data = getData( polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.color );

  				faceColors.push( data[ 0 ], data[ 1 ], data[ 2 ] );

  			}

  			if ( geoInfo.skeleton ) {

  				if ( geoInfo.weightTable[ vertexIndex ] !== undefined ) {

  					geoInfo.weightTable[ vertexIndex ].forEach( function ( wt ) {

  						weights.push( wt.weight );
  						weightIndices.push( wt.id );

  					} );


  				}

  				if ( weights.length > 4 ) {

  					if ( ! displayedWeightsWarning ) {

  						console.warn( 'THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights.' );
  						displayedWeightsWarning = true;

  					}

  					const wIndex = [ 0, 0, 0, 0 ];
  					const Weight = [ 0, 0, 0, 0 ];

  					weights.forEach( function ( weight, weightIndex ) {

  						let currentWeight = weight;
  						let currentIndex = weightIndices[ weightIndex ];

  						Weight.forEach( function ( comparedWeight, comparedWeightIndex, comparedWeightArray ) {

  							if ( currentWeight > comparedWeight ) {

  								comparedWeightArray[ comparedWeightIndex ] = currentWeight;
  								currentWeight = comparedWeight;

  								const tmp = wIndex[ comparedWeightIndex ];
  								wIndex[ comparedWeightIndex ] = currentIndex;
  								currentIndex = tmp;

  							}

  						} );

  					} );

  					weightIndices = wIndex;
  					weights = Weight;

  				}

  				// if the weight array is shorter than 4 pad with 0s
  				while ( weights.length < 4 ) {

  					weights.push( 0 );
  					weightIndices.push( 0 );

  				}

  				for ( let i = 0; i < 4; ++ i ) {

  					faceWeights.push( weights[ i ] );
  					faceWeightIndices.push( weightIndices[ i ] );

  				}

  			}

  			if ( geoInfo.normal ) {

  				const data = getData( polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.normal );

  				faceNormals.push( data[ 0 ], data[ 1 ], data[ 2 ] );

  			}

  			if ( geoInfo.material && geoInfo.material.mappingType !== 'AllSame' ) {

  				materialIndex = getData( polygonVertexIndex, polygonIndex, vertexIndex, geoInfo.material )[ 0 ];

  			}

  			if ( geoInfo.uv ) {

  				geoInfo.uv.forEach( function ( uv, i ) {

  					const data = getData( polygonVertexIndex, polygonIndex, vertexIndex, uv );

  					if ( faceUVs[ i ] === undefined ) {

  						faceUVs[ i ] = [];

  					}

  					faceUVs[ i ].push( data[ 0 ] );
  					faceUVs[ i ].push( data[ 1 ] );

  				} );

  			}

  			faceLength ++;

  			if ( endOfFace ) {

  				scope.genFace( buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength );

  				polygonIndex ++;
  				faceLength = 0;

  				// reset arrays for the next face
  				facePositionIndexes = [];
  				faceNormals = [];
  				faceColors = [];
  				faceUVs = [];
  				faceWeights = [];
  				faceWeightIndices = [];

  			}

  		} );

  		return buffers;

  	}

  	// Generate data for a single face in a geometry. If the face is a quad then split it into 2 tris
  	genFace( buffers, geoInfo, facePositionIndexes, materialIndex, faceNormals, faceColors, faceUVs, faceWeights, faceWeightIndices, faceLength ) {

  		for ( let i = 2; i < faceLength; i ++ ) {

  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ 0 ] ] );
  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ 1 ] ] );
  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ 2 ] ] );

  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ ( i - 1 ) * 3 ] ] );
  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ ( i - 1 ) * 3 + 1 ] ] );
  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ ( i - 1 ) * 3 + 2 ] ] );

  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ i * 3 ] ] );
  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ i * 3 + 1 ] ] );
  			buffers.vertex.push( geoInfo.vertexPositions[ facePositionIndexes[ i * 3 + 2 ] ] );

  			if ( geoInfo.skeleton ) {

  				buffers.vertexWeights.push( faceWeights[ 0 ] );
  				buffers.vertexWeights.push( faceWeights[ 1 ] );
  				buffers.vertexWeights.push( faceWeights[ 2 ] );
  				buffers.vertexWeights.push( faceWeights[ 3 ] );

  				buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 ] );
  				buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 + 1 ] );
  				buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 + 2 ] );
  				buffers.vertexWeights.push( faceWeights[ ( i - 1 ) * 4 + 3 ] );

  				buffers.vertexWeights.push( faceWeights[ i * 4 ] );
  				buffers.vertexWeights.push( faceWeights[ i * 4 + 1 ] );
  				buffers.vertexWeights.push( faceWeights[ i * 4 + 2 ] );
  				buffers.vertexWeights.push( faceWeights[ i * 4 + 3 ] );

  				buffers.weightsIndices.push( faceWeightIndices[ 0 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ 1 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ 2 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ 3 ] );

  				buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 + 1 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 + 2 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ ( i - 1 ) * 4 + 3 ] );

  				buffers.weightsIndices.push( faceWeightIndices[ i * 4 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ i * 4 + 1 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ i * 4 + 2 ] );
  				buffers.weightsIndices.push( faceWeightIndices[ i * 4 + 3 ] );

  			}

  			if ( geoInfo.color ) {

  				buffers.colors.push( faceColors[ 0 ] );
  				buffers.colors.push( faceColors[ 1 ] );
  				buffers.colors.push( faceColors[ 2 ] );

  				buffers.colors.push( faceColors[ ( i - 1 ) * 3 ] );
  				buffers.colors.push( faceColors[ ( i - 1 ) * 3 + 1 ] );
  				buffers.colors.push( faceColors[ ( i - 1 ) * 3 + 2 ] );

  				buffers.colors.push( faceColors[ i * 3 ] );
  				buffers.colors.push( faceColors[ i * 3 + 1 ] );
  				buffers.colors.push( faceColors[ i * 3 + 2 ] );

  			}

  			if ( geoInfo.material && geoInfo.material.mappingType !== 'AllSame' ) {

  				buffers.materialIndex.push( materialIndex );
  				buffers.materialIndex.push( materialIndex );
  				buffers.materialIndex.push( materialIndex );

  			}

  			if ( geoInfo.normal ) {

  				buffers.normal.push( faceNormals[ 0 ] );
  				buffers.normal.push( faceNormals[ 1 ] );
  				buffers.normal.push( faceNormals[ 2 ] );

  				buffers.normal.push( faceNormals[ ( i - 1 ) * 3 ] );
  				buffers.normal.push( faceNormals[ ( i - 1 ) * 3 + 1 ] );
  				buffers.normal.push( faceNormals[ ( i - 1 ) * 3 + 2 ] );

  				buffers.normal.push( faceNormals[ i * 3 ] );
  				buffers.normal.push( faceNormals[ i * 3 + 1 ] );
  				buffers.normal.push( faceNormals[ i * 3 + 2 ] );

  			}

  			if ( geoInfo.uv ) {

  				geoInfo.uv.forEach( function ( uv, j ) {

  					if ( buffers.uvs[ j ] === undefined ) buffers.uvs[ j ] = [];

  					buffers.uvs[ j ].push( faceUVs[ j ][ 0 ] );
  					buffers.uvs[ j ].push( faceUVs[ j ][ 1 ] );

  					buffers.uvs[ j ].push( faceUVs[ j ][ ( i - 1 ) * 2 ] );
  					buffers.uvs[ j ].push( faceUVs[ j ][ ( i - 1 ) * 2 + 1 ] );

  					buffers.uvs[ j ].push( faceUVs[ j ][ i * 2 ] );
  					buffers.uvs[ j ].push( faceUVs[ j ][ i * 2 + 1 ] );

  				} );

  			}

  		}

  	}

  	addMorphTargets( parentGeo, parentGeoNode, morphTargets, preTransform ) {

  		if ( morphTargets.length === 0 ) return;

  		parentGeo.morphTargetsRelative = true;

  		parentGeo.morphAttributes.position = [];
  		// parentGeo.morphAttributes.normal = []; // not implemented

  		const scope = this;
  		morphTargets.forEach( function ( morphTarget ) {

  			morphTarget.rawTargets.forEach( function ( rawTarget ) {

  				const morphGeoNode = fbxTree.Objects.Geometry[ rawTarget.geoID ];

  				if ( morphGeoNode !== undefined ) {

  					scope.genMorphGeometry( parentGeo, parentGeoNode, morphGeoNode, preTransform, rawTarget.name );

  				}

  			} );

  		} );

  	}

  	// a morph geometry node is similar to a standard  node, and the node is also contained
  	// in FBXTree.Objects.Geometry, however it can only have attributes for position, normal
  	// and a special attribute Index defining which vertices of the original geometry are affected
  	// Normal and position attributes only have data for the vertices that are affected by the morph
  	genMorphGeometry( parentGeo, parentGeoNode, morphGeoNode, preTransform, name ) {

  		const vertexIndices = ( parentGeoNode.PolygonVertexIndex !== undefined ) ? parentGeoNode.PolygonVertexIndex.a : [];

  		const morphPositionsSparse = ( morphGeoNode.Vertices !== undefined ) ? morphGeoNode.Vertices.a : [];
  		const indices = ( morphGeoNode.Indexes !== undefined ) ? morphGeoNode.Indexes.a : [];

  		const length = parentGeo.attributes.position.count * 3;
  		const morphPositions = new Float32Array( length );

  		for ( let i = 0; i < indices.length; i ++ ) {

  			const morphIndex = indices[ i ] * 3;

  			morphPositions[ morphIndex ] = morphPositionsSparse[ i * 3 ];
  			morphPositions[ morphIndex + 1 ] = morphPositionsSparse[ i * 3 + 1 ];
  			morphPositions[ morphIndex + 2 ] = morphPositionsSparse[ i * 3 + 2 ];

  		}

  		// TODO: add morph normal support
  		const morphGeoInfo = {
  			vertexIndices: vertexIndices,
  			vertexPositions: morphPositions,

  		};

  		const morphBuffers = this.genBuffers( morphGeoInfo );

  		const positionAttribute = new THREE.Float32BufferAttribute( morphBuffers.vertex, 3 );
  		positionAttribute.name = name || morphGeoNode.attrName;

  		positionAttribute.applyMatrix4( preTransform );

  		parentGeo.morphAttributes.position.push( positionAttribute );

  	}

  	// Parse normal from FBXTree.Objects.Geometry.LayerElementNormal if it exists
  	parseNormals( NormalNode ) {

  		const mappingType = NormalNode.MappingInformationType;
  		const referenceType = NormalNode.ReferenceInformationType;
  		const buffer = NormalNode.Normals.a;
  		let indexBuffer = [];
  		if ( referenceType === 'IndexToDirect' ) {

  			if ( 'NormalIndex' in NormalNode ) {

  				indexBuffer = NormalNode.NormalIndex.a;

  			} else if ( 'NormalsIndex' in NormalNode ) {

  				indexBuffer = NormalNode.NormalsIndex.a;

  			}

  		}

  		return {
  			dataSize: 3,
  			buffer: buffer,
  			indices: indexBuffer,
  			mappingType: mappingType,
  			referenceType: referenceType
  		};

  	}

  	// Parse UVs from FBXTree.Objects.Geometry.LayerElementUV if it exists
  	parseUVs( UVNode ) {

  		const mappingType = UVNode.MappingInformationType;
  		const referenceType = UVNode.ReferenceInformationType;
  		const buffer = UVNode.UV.a;
  		let indexBuffer = [];
  		if ( referenceType === 'IndexToDirect' ) {

  			indexBuffer = UVNode.UVIndex.a;

  		}

  		return {
  			dataSize: 2,
  			buffer: buffer,
  			indices: indexBuffer,
  			mappingType: mappingType,
  			referenceType: referenceType
  		};

  	}

  	// Parse Vertex Colors from FBXTree.Objects.Geometry.LayerElementColor if it exists
  	parseVertexColors( ColorNode ) {

  		const mappingType = ColorNode.MappingInformationType;
  		const referenceType = ColorNode.ReferenceInformationType;
  		const buffer = ColorNode.Colors.a;
  		let indexBuffer = [];
  		if ( referenceType === 'IndexToDirect' ) {

  			indexBuffer = ColorNode.ColorIndex.a;

  		}

  		return {
  			dataSize: 4,
  			buffer: buffer,
  			indices: indexBuffer,
  			mappingType: mappingType,
  			referenceType: referenceType
  		};

  	}

  	// Parse mapping and material data in FBXTree.Objects.Geometry.LayerElementMaterial if it exists
  	parseMaterialIndices( MaterialNode ) {

  		const mappingType = MaterialNode.MappingInformationType;
  		const referenceType = MaterialNode.ReferenceInformationType;

  		if ( mappingType === 'NoMappingInformation' ) {

  			return {
  				dataSize: 1,
  				buffer: [ 0 ],
  				indices: [ 0 ],
  				mappingType: 'AllSame',
  				referenceType: referenceType
  			};

  		}

  		const materialIndexBuffer = MaterialNode.Materials.a;

  		// Since materials are stored as indices, there's a bit of a mismatch between FBX and what
  		// we expect.So we create an intermediate buffer that points to the index in the buffer,
  		// for conforming with the other functions we've written for other data.
  		const materialIndices = [];

  		for ( let i = 0; i < materialIndexBuffer.length; ++ i ) {

  			materialIndices.push( i );

  		}

  		return {
  			dataSize: 1,
  			buffer: materialIndexBuffer,
  			indices: materialIndices,
  			mappingType: mappingType,
  			referenceType: referenceType
  		};

  	}

  	// Generate a NurbGeometry from a node in FBXTree.Objects.Geometry
  	parseNurbsGeometry( geoNode ) {

  		if ( NURBSCurve === undefined ) {

  			console.error( 'THREE.FBXLoader: The loader relies on NURBSCurve for any nurbs present in the model. Nurbs will show up as empty geometry.' );
  			return new THREE.BufferGeometry();

  		}

  		const order = parseInt( geoNode.Order );

  		if ( isNaN( order ) ) {

  			console.error( 'THREE.FBXLoader: Invalid Order %s given for geometry ID: %s', geoNode.Order, geoNode.id );
  			return new THREE.BufferGeometry();

  		}

  		const degree = order - 1;

  		const knots = geoNode.KnotVector.a;
  		const controlPoints = [];
  		const pointsValues = geoNode.Points.a;

  		for ( let i = 0, l = pointsValues.length; i < l; i += 4 ) {

  			controlPoints.push( new THREE.Vector4().fromArray( pointsValues, i ) );

  		}

  		let startKnot, endKnot;

  		if ( geoNode.Form === 'Closed' ) {

  			controlPoints.push( controlPoints[ 0 ] );

  		} else if ( geoNode.Form === 'Periodic' ) {

  			startKnot = degree;
  			endKnot = knots.length - 1 - startKnot;

  			for ( let i = 0; i < degree; ++ i ) {

  				controlPoints.push( controlPoints[ i ] );

  			}

  		}

  		const curve = new NURBSCurve( degree, knots, controlPoints, startKnot, endKnot );
  		const vertices = curve.getPoints( controlPoints.length * 7 );

  		const positions = new Float32Array( vertices.length * 3 );

  		vertices.forEach( function ( vertex, i ) {

  			vertex.toArray( positions, i * 3 );

  		} );

  		const geometry = new THREE.BufferGeometry();
  		geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

  		return geometry;

  	}

  }

  // parse animation data from FBXTree
  class AnimationParser {

  	// take raw animation clips and turn them into three.js animation clips
  	parse() {

  		const animationClips = [];

  		const rawClips = this.parseClips();

  		if ( rawClips !== undefined ) {

  			for ( const key in rawClips ) {

  				const rawClip = rawClips[ key ];

  				const clip = this.addClip( rawClip );

  				animationClips.push( clip );

  			}

  		}

  		return animationClips;

  	}

  	parseClips() {

  		// since the actual transformation data is stored in FBXTree.Objects.AnimationCurve,
  		// if this is undefined we can safely assume there are no animations
  		if ( fbxTree.Objects.AnimationCurve === undefined ) return undefined;

  		const curveNodesMap = this.parseAnimationCurveNodes();

  		this.parseAnimationCurves( curveNodesMap );

  		const layersMap = this.parseAnimationLayers( curveNodesMap );
  		const rawClips = this.parseAnimStacks( layersMap );

  		return rawClips;

  	}

  	// parse nodes in FBXTree.Objects.AnimationCurveNode
  	// each AnimationCurveNode holds data for an animation transform for a model (e.g. left arm rotation )
  	// and is referenced by an AnimationLayer
  	parseAnimationCurveNodes() {

  		const rawCurveNodes = fbxTree.Objects.AnimationCurveNode;

  		const curveNodesMap = new Map();

  		for ( const nodeID in rawCurveNodes ) {

  			const rawCurveNode = rawCurveNodes[ nodeID ];

  			if ( rawCurveNode.attrName.match( /S|R|T|DeformPercent/ ) !== null ) {

  				const curveNode = {

  					id: rawCurveNode.id,
  					attr: rawCurveNode.attrName,
  					curves: {},

  				};

  				curveNodesMap.set( curveNode.id, curveNode );

  			}

  		}

  		return curveNodesMap;

  	}

  	// parse nodes in FBXTree.Objects.AnimationCurve and connect them up to
  	// previously parsed AnimationCurveNodes. Each AnimationCurve holds data for a single animated
  	// axis ( e.g. times and values of x rotation)
  	parseAnimationCurves( curveNodesMap ) {

  		const rawCurves = fbxTree.Objects.AnimationCurve;

  		// TODO: Many values are identical up to roundoff error, but won't be optimised
  		// e.g. position times: [0, 0.4, 0. 8]
  		// position values: [7.23538335023477e-7, 93.67518615722656, -0.9982695579528809, 7.23538335023477e-7, 93.67518615722656, -0.9982695579528809, 7.235384487103147e-7, 93.67520904541016, -0.9982695579528809]
  		// clearly, this should be optimised to
  		// times: [0], positions [7.23538335023477e-7, 93.67518615722656, -0.9982695579528809]
  		// this shows up in nearly every FBX file, and generally time array is length > 100

  		for ( const nodeID in rawCurves ) {

  			const animationCurve = {

  				id: rawCurves[ nodeID ].id,
  				times: rawCurves[ nodeID ].KeyTime.a.map( convertFBXTimeToSeconds ),
  				values: rawCurves[ nodeID ].KeyValueFloat.a,

  			};

  			const relationships = connections.get( animationCurve.id );

  			if ( relationships !== undefined ) {

  				const animationCurveID = relationships.parents[ 0 ].ID;
  				const animationCurveRelationship = relationships.parents[ 0 ].relationship;

  				if ( animationCurveRelationship.match( /X/ ) ) {

  					curveNodesMap.get( animationCurveID ).curves[ 'x' ] = animationCurve;

  				} else if ( animationCurveRelationship.match( /Y/ ) ) {

  					curveNodesMap.get( animationCurveID ).curves[ 'y' ] = animationCurve;

  				} else if ( animationCurveRelationship.match( /Z/ ) ) {

  					curveNodesMap.get( animationCurveID ).curves[ 'z' ] = animationCurve;

  				} else if ( animationCurveRelationship.match( /d|DeformPercent/ ) && curveNodesMap.has( animationCurveID ) ) {

  					curveNodesMap.get( animationCurveID ).curves[ 'morph' ] = animationCurve;

  				}

  			}

  		}

  	}

  	// parse nodes in FBXTree.Objects.AnimationLayer. Each layers holds references
  	// to various AnimationCurveNodes and is referenced by an AnimationStack node
  	// note: theoretically a stack can have multiple layers, however in practice there always seems to be one per stack
  	parseAnimationLayers( curveNodesMap ) {

  		const rawLayers = fbxTree.Objects.AnimationLayer;

  		const layersMap = new Map();

  		for ( const nodeID in rawLayers ) {

  			const layerCurveNodes = [];

  			const connection = connections.get( parseInt( nodeID ) );

  			if ( connection !== undefined ) {

  				// all the animationCurveNodes used in the layer
  				const children = connection.children;

  				children.forEach( function ( child, i ) {

  					if ( curveNodesMap.has( child.ID ) ) {

  						const curveNode = curveNodesMap.get( child.ID );

  						// check that the curves are defined for at least one axis, otherwise ignore the curveNode
  						if ( curveNode.curves.x !== undefined || curveNode.curves.y !== undefined || curveNode.curves.z !== undefined ) {

  							if ( layerCurveNodes[ i ] === undefined ) {

  								const modelID = connections.get( child.ID ).parents.filter( function ( parent ) {

  									return parent.relationship !== undefined;

  								} )[ 0 ].ID;

  								if ( modelID !== undefined ) {

  									const rawModel = fbxTree.Objects.Model[ modelID.toString() ];

  									if ( rawModel === undefined ) {

  										console.warn( 'THREE.FBXLoader: Encountered a unused curve.', child );
  										return;

  									}

  									const node = {

  										modelName: rawModel.attrName ? THREE.PropertyBinding.sanitizeNodeName( rawModel.attrName ) : '',
  										ID: rawModel.id,
  										initialPosition: [ 0, 0, 0 ],
  										initialRotation: [ 0, 0, 0 ],
  										initialScale: [ 1, 1, 1 ],

  									};

  									sceneGraph.traverse( function ( child ) {

  										if ( child.ID === rawModel.id ) {

  											node.transform = child.matrix;

  											if ( child.userData.transformData ) node.eulerOrder = child.userData.transformData.eulerOrder;

  										}

  									} );

  									if ( ! node.transform ) node.transform = new THREE.Matrix4();

  									// if the animated model is pre rotated, we'll have to apply the pre rotations to every
  									// animation value as well
  									if ( 'PreRotation' in rawModel ) node.preRotation = rawModel.PreRotation.value;
  									if ( 'PostRotation' in rawModel ) node.postRotation = rawModel.PostRotation.value;

  									layerCurveNodes[ i ] = node;

  								}

  							}

  							if ( layerCurveNodes[ i ] ) layerCurveNodes[ i ][ curveNode.attr ] = curveNode;

  						} else if ( curveNode.curves.morph !== undefined ) {

  							if ( layerCurveNodes[ i ] === undefined ) {

  								const deformerID = connections.get( child.ID ).parents.filter( function ( parent ) {

  									return parent.relationship !== undefined;

  								} )[ 0 ].ID;

  								const morpherID = connections.get( deformerID ).parents[ 0 ].ID;
  								const geoID = connections.get( morpherID ).parents[ 0 ].ID;

  								// assuming geometry is not used in more than one model
  								const modelID = connections.get( geoID ).parents[ 0 ].ID;

  								const rawModel = fbxTree.Objects.Model[ modelID ];

  								const node = {

  									modelName: rawModel.attrName ? THREE.PropertyBinding.sanitizeNodeName( rawModel.attrName ) : '',
  									morphName: fbxTree.Objects.Deformer[ deformerID ].attrName,

  								};

  								layerCurveNodes[ i ] = node;

  							}

  							layerCurveNodes[ i ][ curveNode.attr ] = curveNode;

  						}

  					}

  				} );

  				layersMap.set( parseInt( nodeID ), layerCurveNodes );

  			}

  		}

  		return layersMap;

  	}

  	// parse nodes in FBXTree.Objects.AnimationStack. These are the top level node in the animation
  	// hierarchy. Each Stack node will be used to create a AnimationClip
  	parseAnimStacks( layersMap ) {

  		const rawStacks = fbxTree.Objects.AnimationStack;

  		// connect the stacks (clips) up to the layers
  		const rawClips = {};

  		for ( const nodeID in rawStacks ) {

  			const children = connections.get( parseInt( nodeID ) ).children;

  			if ( children.length > 1 ) {

  				// it seems like stacks will always be associated with a single layer. But just in case there are files
  				// where there are multiple layers per stack, we'll display a warning
  				console.warn( 'THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.' );

  			}

  			const layer = layersMap.get( children[ 0 ].ID );

  			rawClips[ nodeID ] = {

  				name: rawStacks[ nodeID ].attrName,
  				layer: layer,

  			};

  		}

  		return rawClips;

  	}

  	addClip( rawClip ) {

  		let tracks = [];

  		const scope = this;
  		rawClip.layer.forEach( function ( rawTracks ) {

  			tracks = tracks.concat( scope.generateTracks( rawTracks ) );

  		} );

  		return new THREE.AnimationClip( rawClip.name, - 1, tracks );

  	}

  	generateTracks( rawTracks ) {

  		const tracks = [];

  		let initialPosition = new THREE.Vector3();
  		let initialRotation = new THREE.Quaternion();
  		let initialScale = new THREE.Vector3();

  		if ( rawTracks.transform ) rawTracks.transform.decompose( initialPosition, initialRotation, initialScale );

  		initialPosition = initialPosition.toArray();
  		initialRotation = new THREE.Euler().setFromQuaternion( initialRotation, rawTracks.eulerOrder ).toArray();
  		initialScale = initialScale.toArray();

  		if ( rawTracks.T !== undefined && Object.keys( rawTracks.T.curves ).length > 0 ) {

  			const positionTrack = this.generateVectorTrack( rawTracks.modelName, rawTracks.T.curves, initialPosition, 'position' );
  			if ( positionTrack !== undefined ) tracks.push( positionTrack );

  		}

  		if ( rawTracks.R !== undefined && Object.keys( rawTracks.R.curves ).length > 0 ) {

  			const rotationTrack = this.generateRotationTrack( rawTracks.modelName, rawTracks.R.curves, initialRotation, rawTracks.preRotation, rawTracks.postRotation, rawTracks.eulerOrder );
  			if ( rotationTrack !== undefined ) tracks.push( rotationTrack );

  		}

  		if ( rawTracks.S !== undefined && Object.keys( rawTracks.S.curves ).length > 0 ) {

  			const scaleTrack = this.generateVectorTrack( rawTracks.modelName, rawTracks.S.curves, initialScale, 'scale' );
  			if ( scaleTrack !== undefined ) tracks.push( scaleTrack );

  		}

  		if ( rawTracks.DeformPercent !== undefined ) {

  			const morphTrack = this.generateMorphTrack( rawTracks );
  			if ( morphTrack !== undefined ) tracks.push( morphTrack );

  		}

  		return tracks;

  	}

  	generateVectorTrack( modelName, curves, initialValue, type ) {

  		const times = this.getTimesForAllAxes( curves );
  		const values = this.getKeyframeTrackValues( times, curves, initialValue );

  		return new THREE.VectorKeyframeTrack( modelName + '.' + type, times, values );

  	}

  	generateRotationTrack( modelName, curves, initialValue, preRotation, postRotation, eulerOrder ) {

  		if ( curves.x !== undefined ) {

  			this.interpolateRotations( curves.x );
  			curves.x.values = curves.x.values.map( THREE.MathUtils.degToRad );

  		}

  		if ( curves.y !== undefined ) {

  			this.interpolateRotations( curves.y );
  			curves.y.values = curves.y.values.map( THREE.MathUtils.degToRad );

  		}

  		if ( curves.z !== undefined ) {

  			this.interpolateRotations( curves.z );
  			curves.z.values = curves.z.values.map( THREE.MathUtils.degToRad );

  		}

  		const times = this.getTimesForAllAxes( curves );
  		const values = this.getKeyframeTrackValues( times, curves, initialValue );

  		if ( preRotation !== undefined ) {

  			preRotation = preRotation.map( THREE.MathUtils.degToRad );
  			preRotation.push( eulerOrder );

  			preRotation = new THREE.Euler().fromArray( preRotation );
  			preRotation = new THREE.Quaternion().setFromEuler( preRotation );

  		}

  		if ( postRotation !== undefined ) {

  			postRotation = postRotation.map( THREE.MathUtils.degToRad );
  			postRotation.push( eulerOrder );

  			postRotation = new THREE.Euler().fromArray( postRotation );
  			postRotation = new THREE.Quaternion().setFromEuler( postRotation ).invert();

  		}

  		const quaternion = new THREE.Quaternion();
  		const euler = new THREE.Euler();

  		const quaternionValues = [];

  		for ( let i = 0; i < values.length; i += 3 ) {

  			euler.set( values[ i ], values[ i + 1 ], values[ i + 2 ], eulerOrder );

  			quaternion.setFromEuler( euler );

  			if ( preRotation !== undefined ) quaternion.premultiply( preRotation );
  			if ( postRotation !== undefined ) quaternion.multiply( postRotation );

  			quaternion.toArray( quaternionValues, ( i / 3 ) * 4 );

  		}

  		return new THREE.QuaternionKeyframeTrack( modelName + '.quaternion', times, quaternionValues );

  	}

  	generateMorphTrack( rawTracks ) {

  		const curves = rawTracks.DeformPercent.curves.morph;
  		const values = curves.values.map( function ( val ) {

  			return val / 100;

  		} );

  		const morphNum = sceneGraph.getObjectByName( rawTracks.modelName ).morphTargetDictionary[ rawTracks.morphName ];

  		return new THREE.NumberKeyframeTrack( rawTracks.modelName + '.morphTargetInfluences[' + morphNum + ']', curves.times, values );

  	}

  	// For all animated objects, times are defined separately for each axis
  	// Here we'll combine the times into one sorted array without duplicates
  	getTimesForAllAxes( curves ) {

  		let times = [];

  		// first join together the times for each axis, if defined
  		if ( curves.x !== undefined ) times = times.concat( curves.x.times );
  		if ( curves.y !== undefined ) times = times.concat( curves.y.times );
  		if ( curves.z !== undefined ) times = times.concat( curves.z.times );

  		// then sort them
  		times = times.sort( function ( a, b ) {

  			return a - b;

  		} );

  		// and remove duplicates
  		if ( times.length > 1 ) {

  			let targetIndex = 1;
  			let lastValue = times[ 0 ];
  			for ( let i = 1; i < times.length; i ++ ) {

  				const currentValue = times[ i ];
  				if ( currentValue !== lastValue ) {

  					times[ targetIndex ] = currentValue;
  					lastValue = currentValue;
  					targetIndex ++;

  				}

  			}

  			times = times.slice( 0, targetIndex );

  		}

  		return times;

  	}

  	getKeyframeTrackValues( times, curves, initialValue ) {

  		const prevValue = initialValue;

  		const values = [];

  		let xIndex = - 1;
  		let yIndex = - 1;
  		let zIndex = - 1;

  		times.forEach( function ( time ) {

  			if ( curves.x ) xIndex = curves.x.times.indexOf( time );
  			if ( curves.y ) yIndex = curves.y.times.indexOf( time );
  			if ( curves.z ) zIndex = curves.z.times.indexOf( time );

  			// if there is an x value defined for this frame, use that
  			if ( xIndex !== - 1 ) {

  				const xValue = curves.x.values[ xIndex ];
  				values.push( xValue );
  				prevValue[ 0 ] = xValue;

  			} else {

  				// otherwise use the x value from the previous frame
  				values.push( prevValue[ 0 ] );

  			}

  			if ( yIndex !== - 1 ) {

  				const yValue = curves.y.values[ yIndex ];
  				values.push( yValue );
  				prevValue[ 1 ] = yValue;

  			} else {

  				values.push( prevValue[ 1 ] );

  			}

  			if ( zIndex !== - 1 ) {

  				const zValue = curves.z.values[ zIndex ];
  				values.push( zValue );
  				prevValue[ 2 ] = zValue;

  			} else {

  				values.push( prevValue[ 2 ] );

  			}

  		} );

  		return values;

  	}

  	// Rotations are defined as Euler angles which can have values  of any size
  	// These will be converted to quaternions which don't support values greater than
  	// PI, so we'll interpolate large rotations
  	interpolateRotations( curve ) {

  		for ( let i = 1; i < curve.values.length; i ++ ) {

  			const initialValue = curve.values[ i - 1 ];
  			const valuesSpan = curve.values[ i ] - initialValue;

  			const absoluteSpan = Math.abs( valuesSpan );

  			if ( absoluteSpan >= 180 ) {

  				const numSubIntervals = absoluteSpan / 180;

  				const step = valuesSpan / numSubIntervals;
  				let nextValue = initialValue + step;

  				const initialTime = curve.times[ i - 1 ];
  				const timeSpan = curve.times[ i ] - initialTime;
  				const interval = timeSpan / numSubIntervals;
  				let nextTime = initialTime + interval;

  				const interpolatedTimes = [];
  				const interpolatedValues = [];

  				while ( nextTime < curve.times[ i ] ) {

  					interpolatedTimes.push( nextTime );
  					nextTime += interval;

  					interpolatedValues.push( nextValue );
  					nextValue += step;

  				}

  				curve.times = inject( curve.times, i, interpolatedTimes );
  				curve.values = inject( curve.values, i, interpolatedValues );

  			}

  		}

  	}

  }

  // parse an FBX file in ASCII format
  class TextParser {

  	getPrevNode() {

  		return this.nodeStack[ this.currentIndent - 2 ];

  	}

  	getCurrentNode() {

  		return this.nodeStack[ this.currentIndent - 1 ];

  	}

  	getCurrentProp() {

  		return this.currentProp;

  	}

  	pushStack( node ) {

  		this.nodeStack.push( node );
  		this.currentIndent += 1;

  	}

  	popStack() {

  		this.nodeStack.pop();
  		this.currentIndent -= 1;

  	}

  	setCurrentProp( val, name ) {

  		this.currentProp = val;
  		this.currentPropName = name;

  	}

  	parse( text ) {

  		this.currentIndent = 0;

  		this.allNodes = new FBXTree();
  		this.nodeStack = [];
  		this.currentProp = [];
  		this.currentPropName = '';

  		const scope = this;

  		const split = text.split( /[\r\n]+/ );

  		split.forEach( function ( line, i ) {

  			const matchComment = line.match( /^[\s\t]*;/ );
  			const matchEmpty = line.match( /^[\s\t]*$/ );

  			if ( matchComment || matchEmpty ) return;

  			const matchBeginning = line.match( '^\\t{' + scope.currentIndent + '}(\\w+):(.*){', '' );
  			const matchProperty = line.match( '^\\t{' + ( scope.currentIndent ) + '}(\\w+):[\\s\\t\\r\\n](.*)' );
  			const matchEnd = line.match( '^\\t{' + ( scope.currentIndent - 1 ) + '}}' );

  			if ( matchBeginning ) {

  				scope.parseNodeBegin( line, matchBeginning );

  			} else if ( matchProperty ) {

  				scope.parseNodeProperty( line, matchProperty, split[ ++ i ] );

  			} else if ( matchEnd ) {

  				scope.popStack();

  			} else if ( line.match( /^[^\s\t}]/ ) ) {

  				// large arrays are split over multiple lines terminated with a ',' character
  				// if this is encountered the line needs to be joined to the previous line
  				scope.parseNodePropertyContinued( line );

  			}

  		} );

  		return this.allNodes;

  	}

  	parseNodeBegin( line, property ) {

  		const nodeName = property[ 1 ].trim().replace( /^"/, '' ).replace( /"$/, '' );

  		const nodeAttrs = property[ 2 ].split( ',' ).map( function ( attr ) {

  			return attr.trim().replace( /^"/, '' ).replace( /"$/, '' );

  		} );

  		const node = { name: nodeName };
  		const attrs = this.parseNodeAttr( nodeAttrs );

  		const currentNode = this.getCurrentNode();

  		// a top node
  		if ( this.currentIndent === 0 ) {

  			this.allNodes.add( nodeName, node );

  		} else { // a subnode

  			// if the subnode already exists, append it
  			if ( nodeName in currentNode ) {

  				// special case Pose needs PoseNodes as an array
  				if ( nodeName === 'PoseNode' ) {

  					currentNode.PoseNode.push( node );

  				} else if ( currentNode[ nodeName ].id !== undefined ) {

  					currentNode[ nodeName ] = {};
  					currentNode[ nodeName ][ currentNode[ nodeName ].id ] = currentNode[ nodeName ];

  				}

  				if ( attrs.id !== '' ) currentNode[ nodeName ][ attrs.id ] = node;

  			} else if ( typeof attrs.id === 'number' ) {

  				currentNode[ nodeName ] = {};
  				currentNode[ nodeName ][ attrs.id ] = node;

  			} else if ( nodeName !== 'Properties70' ) {

  				if ( nodeName === 'PoseNode' )	currentNode[ nodeName ] = [ node ];
  				else currentNode[ nodeName ] = node;

  			}

  		}

  		if ( typeof attrs.id === 'number' ) node.id = attrs.id;
  		if ( attrs.name !== '' ) node.attrName = attrs.name;
  		if ( attrs.type !== '' ) node.attrType = attrs.type;

  		this.pushStack( node );

  	}

  	parseNodeAttr( attrs ) {

  		let id = attrs[ 0 ];

  		if ( attrs[ 0 ] !== '' ) {

  			id = parseInt( attrs[ 0 ] );

  			if ( isNaN( id ) ) {

  				id = attrs[ 0 ];

  			}

  		}

  		let name = '', type = '';

  		if ( attrs.length > 1 ) {

  			name = attrs[ 1 ].replace( /^(\w+)::/, '' );
  			type = attrs[ 2 ];

  		}

  		return { id: id, name: name, type: type };

  	}

  	parseNodeProperty( line, property, contentLine ) {

  		let propName = property[ 1 ].replace( /^"/, '' ).replace( /"$/, '' ).trim();
  		let propValue = property[ 2 ].replace( /^"/, '' ).replace( /"$/, '' ).trim();

  		// for special case: base64 image data follows "Content: ," line
  		//	Content: ,
  		//	 "/9j/4RDaRXhpZgAATU0A..."
  		if ( propName === 'Content' && propValue === ',' ) {

  			propValue = contentLine.replace( /"/g, '' ).replace( /,$/, '' ).trim();

  		}

  		const currentNode = this.getCurrentNode();
  		const parentName = currentNode.name;

  		if ( parentName === 'Properties70' ) {

  			this.parseNodeSpecialProperty( line, propName, propValue );
  			return;

  		}

  		// Connections
  		if ( propName === 'C' ) {

  			const connProps = propValue.split( ',' ).slice( 1 );
  			const from = parseInt( connProps[ 0 ] );
  			const to = parseInt( connProps[ 1 ] );

  			let rest = propValue.split( ',' ).slice( 3 );

  			rest = rest.map( function ( elem ) {

  				return elem.trim().replace( /^"/, '' );

  			} );

  			propName = 'connections';
  			propValue = [ from, to ];
  			append( propValue, rest );

  			if ( currentNode[ propName ] === undefined ) {

  				currentNode[ propName ] = [];

  			}

  		}

  		// Node
  		if ( propName === 'Node' ) currentNode.id = propValue;

  		// connections
  		if ( propName in currentNode && Array.isArray( currentNode[ propName ] ) ) {

  			currentNode[ propName ].push( propValue );

  		} else {

  			if ( propName !== 'a' ) currentNode[ propName ] = propValue;
  			else currentNode.a = propValue;

  		}

  		this.setCurrentProp( currentNode, propName );

  		// convert string to array, unless it ends in ',' in which case more will be added to it
  		if ( propName === 'a' && propValue.slice( - 1 ) !== ',' ) {

  			currentNode.a = parseNumberArray( propValue );

  		}

  	}

  	parseNodePropertyContinued( line ) {

  		const currentNode = this.getCurrentNode();

  		currentNode.a += line;

  		// if the line doesn't end in ',' we have reached the end of the property value
  		// so convert the string to an array
  		if ( line.slice( - 1 ) !== ',' ) {

  			currentNode.a = parseNumberArray( currentNode.a );

  		}

  	}

  	// parse "Property70"
  	parseNodeSpecialProperty( line, propName, propValue ) {

  		// split this
  		// P: "Lcl Scaling", "Lcl Scaling", "", "A",1,1,1
  		// into array like below
  		// ["Lcl Scaling", "Lcl Scaling", "", "A", "1,1,1" ]
  		const props = propValue.split( '",' ).map( function ( prop ) {

  			return prop.trim().replace( /^\"/, '' ).replace( /\s/, '_' );

  		} );

  		const innerPropName = props[ 0 ];
  		const innerPropType1 = props[ 1 ];
  		const innerPropType2 = props[ 2 ];
  		const innerPropFlag = props[ 3 ];
  		let innerPropValue = props[ 4 ];

  		// cast values where needed, otherwise leave as strings
  		switch ( innerPropType1 ) {

  			case 'int':
  			case 'enum':
  			case 'bool':
  			case 'ULongLong':
  			case 'double':
  			case 'Number':
  			case 'FieldOfView':
  				innerPropValue = parseFloat( innerPropValue );
  				break;

  			case 'Color':
  			case 'ColorRGB':
  			case 'Vector3D':
  			case 'Lcl_Translation':
  			case 'Lcl_Rotation':
  			case 'Lcl_Scaling':
  				innerPropValue = parseNumberArray( innerPropValue );
  				break;

  		}

  		// CAUTION: these props must append to parent's parent
  		this.getPrevNode()[ innerPropName ] = {

  			'type': innerPropType1,
  			'type2': innerPropType2,
  			'flag': innerPropFlag,
  			'value': innerPropValue

  		};

  		this.setCurrentProp( this.getPrevNode(), innerPropName );

  	}

  }

  // Parse an FBX file in Binary format
  class BinaryParser {

  	parse( buffer ) {

  		const reader = new BinaryReader( buffer );
  		reader.skip( 23 ); // skip magic 23 bytes

  		const version = reader.getUint32();

  		if ( version < 6400 ) {

  			throw new Error( 'THREE.FBXLoader: FBX version not supported, FileVersion: ' + version );

  		}

  		const allNodes = new FBXTree();

  		while ( ! this.endOfContent( reader ) ) {

  			const node = this.parseNode( reader, version );
  			if ( node !== null ) allNodes.add( node.name, node );

  		}

  		return allNodes;

  	}

  	// Check if reader has reached the end of content.
  	endOfContent( reader ) {

  		// footer size: 160bytes + 16-byte alignment padding
  		// - 16bytes: magic
  		// - padding til 16-byte alignment (at least 1byte?)
  		//	(seems like some exporters embed fixed 15 or 16bytes?)
  		// - 4bytes: magic
  		// - 4bytes: version
  		// - 120bytes: zero
  		// - 16bytes: magic
  		if ( reader.size() % 16 === 0 ) {

  			return ( ( reader.getOffset() + 160 + 16 ) & ~ 0xf ) >= reader.size();

  		} else {

  			return reader.getOffset() + 160 + 16 >= reader.size();

  		}

  	}

  	// recursively parse nodes until the end of the file is reached
  	parseNode( reader, version ) {

  		const node = {};

  		// The first three data sizes depends on version.
  		const endOffset = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();
  		const numProperties = ( version >= 7500 ) ? reader.getUint64() : reader.getUint32();

  		( version >= 7500 ) ? reader.getUint64() : reader.getUint32(); // the returned propertyListLen is not used

  		const nameLen = reader.getUint8();
  		const name = reader.getString( nameLen );

  		// Regards this node as NULL-record if endOffset is zero
  		if ( endOffset === 0 ) return null;

  		const propertyList = [];

  		for ( let i = 0; i < numProperties; i ++ ) {

  			propertyList.push( this.parseProperty( reader ) );

  		}

  		// Regards the first three elements in propertyList as id, attrName, and attrType
  		const id = propertyList.length > 0 ? propertyList[ 0 ] : '';
  		const attrName = propertyList.length > 1 ? propertyList[ 1 ] : '';
  		const attrType = propertyList.length > 2 ? propertyList[ 2 ] : '';

  		// check if this node represents just a single property
  		// like (name, 0) set or (name2, [0, 1, 2]) set of {name: 0, name2: [0, 1, 2]}
  		node.singleProperty = ( numProperties === 1 && reader.getOffset() === endOffset ) ? true : false;

  		while ( endOffset > reader.getOffset() ) {

  			const subNode = this.parseNode( reader, version );

  			if ( subNode !== null ) this.parseSubNode( name, node, subNode );

  		}

  		node.propertyList = propertyList; // raw property list used by parent

  		if ( typeof id === 'number' ) node.id = id;
  		if ( attrName !== '' ) node.attrName = attrName;
  		if ( attrType !== '' ) node.attrType = attrType;
  		if ( name !== '' ) node.name = name;

  		return node;

  	}

  	parseSubNode( name, node, subNode ) {

  		// special case: child node is single property
  		if ( subNode.singleProperty === true ) {

  			const value = subNode.propertyList[ 0 ];

  			if ( Array.isArray( value ) ) {

  				node[ subNode.name ] = subNode;

  				subNode.a = value;

  			} else {

  				node[ subNode.name ] = value;

  			}

  		} else if ( name === 'Connections' && subNode.name === 'C' ) {

  			const array = [];

  			subNode.propertyList.forEach( function ( property, i ) {

  				// first Connection is FBX type (OO, OP, etc.). We'll discard these
  				if ( i !== 0 ) array.push( property );

  			} );

  			if ( node.connections === undefined ) {

  				node.connections = [];

  			}

  			node.connections.push( array );

  		} else if ( subNode.name === 'Properties70' ) {

  			const keys = Object.keys( subNode );

  			keys.forEach( function ( key ) {

  				node[ key ] = subNode[ key ];

  			} );

  		} else if ( name === 'Properties70' && subNode.name === 'P' ) {

  			let innerPropName = subNode.propertyList[ 0 ];
  			let innerPropType1 = subNode.propertyList[ 1 ];
  			const innerPropType2 = subNode.propertyList[ 2 ];
  			const innerPropFlag = subNode.propertyList[ 3 ];
  			let innerPropValue;

  			if ( innerPropName.indexOf( 'Lcl ' ) === 0 ) innerPropName = innerPropName.replace( 'Lcl ', 'Lcl_' );
  			if ( innerPropType1.indexOf( 'Lcl ' ) === 0 ) innerPropType1 = innerPropType1.replace( 'Lcl ', 'Lcl_' );

  			if ( innerPropType1 === 'Color' || innerPropType1 === 'ColorRGB' || innerPropType1 === 'Vector' || innerPropType1 === 'Vector3D' || innerPropType1.indexOf( 'Lcl_' ) === 0 ) {

  				innerPropValue = [
  					subNode.propertyList[ 4 ],
  					subNode.propertyList[ 5 ],
  					subNode.propertyList[ 6 ]
  				];

  			} else {

  				innerPropValue = subNode.propertyList[ 4 ];

  			}

  			// this will be copied to parent, see above
  			node[ innerPropName ] = {

  				'type': innerPropType1,
  				'type2': innerPropType2,
  				'flag': innerPropFlag,
  				'value': innerPropValue

  			};

  		} else if ( node[ subNode.name ] === undefined ) {

  			if ( typeof subNode.id === 'number' ) {

  				node[ subNode.name ] = {};
  				node[ subNode.name ][ subNode.id ] = subNode;

  			} else {

  				node[ subNode.name ] = subNode;

  			}

  		} else {

  			if ( subNode.name === 'PoseNode' ) {

  				if ( ! Array.isArray( node[ subNode.name ] ) ) {

  					node[ subNode.name ] = [ node[ subNode.name ] ];

  				}

  				node[ subNode.name ].push( subNode );

  			} else if ( node[ subNode.name ][ subNode.id ] === undefined ) {

  				node[ subNode.name ][ subNode.id ] = subNode;

  			}

  		}

  	}

  	parseProperty( reader ) {

  		const type = reader.getString( 1 );
  		let length;

  		switch ( type ) {

  			case 'C':
  				return reader.getBoolean();

  			case 'D':
  				return reader.getFloat64();

  			case 'F':
  				return reader.getFloat32();

  			case 'I':
  				return reader.getInt32();

  			case 'L':
  				return reader.getInt64();

  			case 'R':
  				length = reader.getUint32();
  				return reader.getArrayBuffer( length );

  			case 'S':
  				length = reader.getUint32();
  				return reader.getString( length );

  			case 'Y':
  				return reader.getInt16();

  			case 'b':
  			case 'c':
  			case 'd':
  			case 'f':
  			case 'i':
  			case 'l':

  				const arrayLength = reader.getUint32();
  				const encoding = reader.getUint32(); // 0: non-compressed, 1: compressed
  				const compressedLength = reader.getUint32();

  				if ( encoding === 0 ) {

  					switch ( type ) {

  						case 'b':
  						case 'c':
  							return reader.getBooleanArray( arrayLength );

  						case 'd':
  							return reader.getFloat64Array( arrayLength );

  						case 'f':
  							return reader.getFloat32Array( arrayLength );

  						case 'i':
  							return reader.getInt32Array( arrayLength );

  						case 'l':
  							return reader.getInt64Array( arrayLength );

  					}

  				}

  				if ( typeof fflate === 'undefined' ) {

  					console.error( 'THREE.FBXLoader: External library fflate.min.js required.' );

  				}

  				const data = unzlibSync( new Uint8Array( reader.getArrayBuffer( compressedLength ) ) ); // eslint-disable-line no-undef
  				const reader2 = new BinaryReader( data.buffer );

  				switch ( type ) {

  					case 'b':
  					case 'c':
  						return reader2.getBooleanArray( arrayLength );

  					case 'd':
  						return reader2.getFloat64Array( arrayLength );

  					case 'f':
  						return reader2.getFloat32Array( arrayLength );

  					case 'i':
  						return reader2.getInt32Array( arrayLength );

  					case 'l':
  						return reader2.getInt64Array( arrayLength );

  				}

  			default:
  				throw new Error( 'THREE.FBXLoader: Unknown property type ' + type );

  		}

  	}

  }

  class BinaryReader {

  	constructor( buffer, littleEndian ) {

  		this.dv = new DataView( buffer );
  		this.offset = 0;
  		this.littleEndian = ( littleEndian !== undefined ) ? littleEndian : true;

  	}

  	getOffset() {

  		return this.offset;

  	}

  	size() {

  		return this.dv.buffer.byteLength;

  	}

  	skip( length ) {

  		this.offset += length;

  	}

  	// seems like true/false representation depends on exporter.
  	// true: 1 or 'Y'(=0x59), false: 0 or 'T'(=0x54)
  	// then sees LSB.
  	getBoolean() {

  		return ( this.getUint8() & 1 ) === 1;

  	}

  	getBooleanArray( size ) {

  		const a = [];

  		for ( let i = 0; i < size; i ++ ) {

  			a.push( this.getBoolean() );

  		}

  		return a;

  	}

  	getUint8() {

  		const value = this.dv.getUint8( this.offset );
  		this.offset += 1;
  		return value;

  	}

  	getInt16() {

  		const value = this.dv.getInt16( this.offset, this.littleEndian );
  		this.offset += 2;
  		return value;

  	}

  	getInt32() {

  		const value = this.dv.getInt32( this.offset, this.littleEndian );
  		this.offset += 4;
  		return value;

  	}

  	getInt32Array( size ) {

  		const a = [];

  		for ( let i = 0; i < size; i ++ ) {

  			a.push( this.getInt32() );

  		}

  		return a;

  	}

  	getUint32() {

  		const value = this.dv.getUint32( this.offset, this.littleEndian );
  		this.offset += 4;
  		return value;

  	}

  	// JavaScript doesn't support 64-bit integer so calculate this here
  	// 1 << 32 will return 1 so using multiply operation instead here.
  	// There's a possibility that this method returns wrong value if the value
  	// is out of the range between Number.MAX_SAFE_INTEGER and Number.MIN_SAFE_INTEGER.
  	// TODO: safely handle 64-bit integer
  	getInt64() {

  		let low, high;

  		if ( this.littleEndian ) {

  			low = this.getUint32();
  			high = this.getUint32();

  		} else {

  			high = this.getUint32();
  			low = this.getUint32();

  		}

  		// calculate negative value
  		if ( high & 0x80000000 ) {

  			high = ~ high & 0xFFFFFFFF;
  			low = ~ low & 0xFFFFFFFF;

  			if ( low === 0xFFFFFFFF ) high = ( high + 1 ) & 0xFFFFFFFF;

  			low = ( low + 1 ) & 0xFFFFFFFF;

  			return - ( high * 0x100000000 + low );

  		}

  		return high * 0x100000000 + low;

  	}

  	getInt64Array( size ) {

  		const a = [];

  		for ( let i = 0; i < size; i ++ ) {

  			a.push( this.getInt64() );

  		}

  		return a;

  	}

  	// Note: see getInt64() comment
  	getUint64() {

  		let low, high;

  		if ( this.littleEndian ) {

  			low = this.getUint32();
  			high = this.getUint32();

  		} else {

  			high = this.getUint32();
  			low = this.getUint32();

  		}

  		return high * 0x100000000 + low;

  	}

  	getFloat32() {

  		const value = this.dv.getFloat32( this.offset, this.littleEndian );
  		this.offset += 4;
  		return value;

  	}

  	getFloat32Array( size ) {

  		const a = [];

  		for ( let i = 0; i < size; i ++ ) {

  			a.push( this.getFloat32() );

  		}

  		return a;

  	}

  	getFloat64() {

  		const value = this.dv.getFloat64( this.offset, this.littleEndian );
  		this.offset += 8;
  		return value;

  	}

  	getFloat64Array( size ) {

  		const a = [];

  		for ( let i = 0; i < size; i ++ ) {

  			a.push( this.getFloat64() );

  		}

  		return a;

  	}

  	getArrayBuffer( size ) {

  		const value = this.dv.buffer.slice( this.offset, this.offset + size );
  		this.offset += size;
  		return value;

  	}

  	getString( size ) {

  		// note: safari 9 doesn't support Uint8Array.indexOf; create intermediate array instead
  		let a = [];

  		for ( let i = 0; i < size; i ++ ) {

  			a[ i ] = this.getUint8();

  		}

  		const nullByte = a.indexOf( 0 );
  		if ( nullByte >= 0 ) a = a.slice( 0, nullByte );

  		return THREE.LoaderUtils.decodeText( new Uint8Array( a ) );

  	}

  }

  // FBXTree holds a representation of the FBX data, returned by the TextParser ( FBX ASCII format)
  // and BinaryParser( FBX Binary format)
  class FBXTree {

  	add( key, val ) {

  		this[ key ] = val;

  	}

  }

  // ************** UTILITY FUNCTIONS **************

  function isFbxFormatBinary( buffer ) {

  	const CORRECT = 'Kaydara\u0020FBX\u0020Binary\u0020\u0020\0';

  	return buffer.byteLength >= CORRECT.length && CORRECT === convertArrayBufferToString( buffer, 0, CORRECT.length );

  }

  function isFbxFormatASCII( text ) {

  	const CORRECT = [ 'K', 'a', 'y', 'd', 'a', 'r', 'a', '\\', 'F', 'B', 'X', '\\', 'B', 'i', 'n', 'a', 'r', 'y', '\\', '\\' ];

  	let cursor = 0;

  	function read( offset ) {

  		const result = text[ offset - 1 ];
  		text = text.slice( cursor + offset );
  		cursor ++;
  		return result;

  	}

  	for ( let i = 0; i < CORRECT.length; ++ i ) {

  		const num = read( 1 );
  		if ( num === CORRECT[ i ] ) {

  			return false;

  		}

  	}

  	return true;

  }

  function getFbxVersion( text ) {

  	const versionRegExp = /FBXVersion: (\d+)/;
  	const match = text.match( versionRegExp );

  	if ( match ) {

  		const version = parseInt( match[ 1 ] );
  		return version;

  	}

  	throw new Error( 'THREE.FBXLoader: Cannot find the version number for the file given.' );

  }

  // Converts FBX ticks into real time seconds.
  function convertFBXTimeToSeconds( time ) {

  	return time / 46186158000;

  }

  const dataArray = [];

  // extracts the data from the correct position in the FBX array based on indexing type
  function getData( polygonVertexIndex, polygonIndex, vertexIndex, infoObject ) {

  	let index;

  	switch ( infoObject.mappingType ) {

  		case 'ByPolygonVertex' :
  			index = polygonVertexIndex;
  			break;
  		case 'ByPolygon' :
  			index = polygonIndex;
  			break;
  		case 'ByVertice' :
  			index = vertexIndex;
  			break;
  		case 'AllSame' :
  			index = infoObject.indices[ 0 ];
  			break;
  		default :
  			console.warn( 'THREE.FBXLoader: unknown attribute mapping type ' + infoObject.mappingType );

  	}

  	if ( infoObject.referenceType === 'IndexToDirect' ) index = infoObject.indices[ index ];

  	const from = index * infoObject.dataSize;
  	const to = from + infoObject.dataSize;

  	return slice( dataArray, infoObject.buffer, from, to );

  }

  const tempEuler = new THREE.Euler();
  const tempVec = new THREE.Vector3();

  // generate transformation from FBX transform data
  // ref: https://help.autodesk.com/view/FBX/2017/ENU/?guid=__files_GUID_10CDD63C_79C1_4F2D_BB28_AD2BE65A02ED_htm
  // ref: http://docs.autodesk.com/FBX/2014/ENU/FBX-SDK-Documentation/index.html?url=cpp_ref/_transformations_2main_8cxx-example.html,topicNumber=cpp_ref__transformations_2main_8cxx_example_htmlfc10a1e1-b18d-4e72-9dc0-70d0f1959f5e
  function generateTransform( transformData ) {

  	const lTranslationM = new THREE.Matrix4();
  	const lPreRotationM = new THREE.Matrix4();
  	const lRotationM = new THREE.Matrix4();
  	const lPostRotationM = new THREE.Matrix4();

  	const lScalingM = new THREE.Matrix4();
  	const lScalingPivotM = new THREE.Matrix4();
  	const lScalingOffsetM = new THREE.Matrix4();
  	const lRotationOffsetM = new THREE.Matrix4();
  	const lRotationPivotM = new THREE.Matrix4();

  	const lParentGX = new THREE.Matrix4();
  	const lParentLX = new THREE.Matrix4();
  	const lGlobalT = new THREE.Matrix4();

  	const inheritType = ( transformData.inheritType ) ? transformData.inheritType : 0;

  	if ( transformData.translation ) lTranslationM.setPosition( tempVec.fromArray( transformData.translation ) );

  	if ( transformData.preRotation ) {

  		const array = transformData.preRotation.map( THREE.MathUtils.degToRad );
  		array.push( transformData.eulerOrder );
  		lPreRotationM.makeRotationFromEuler( tempEuler.fromArray( array ) );

  	}

  	if ( transformData.rotation ) {

  		const array = transformData.rotation.map( THREE.MathUtils.degToRad );
  		array.push( transformData.eulerOrder );
  		lRotationM.makeRotationFromEuler( tempEuler.fromArray( array ) );

  	}

  	if ( transformData.postRotation ) {

  		const array = transformData.postRotation.map( THREE.MathUtils.degToRad );
  		array.push( transformData.eulerOrder );
  		lPostRotationM.makeRotationFromEuler( tempEuler.fromArray( array ) );
  		lPostRotationM.invert();

  	}

  	if ( transformData.scale ) lScalingM.scale( tempVec.fromArray( transformData.scale ) );

  	// Pivots and offsets
  	if ( transformData.scalingOffset ) lScalingOffsetM.setPosition( tempVec.fromArray( transformData.scalingOffset ) );
  	if ( transformData.scalingPivot ) lScalingPivotM.setPosition( tempVec.fromArray( transformData.scalingPivot ) );
  	if ( transformData.rotationOffset ) lRotationOffsetM.setPosition( tempVec.fromArray( transformData.rotationOffset ) );
  	if ( transformData.rotationPivot ) lRotationPivotM.setPosition( tempVec.fromArray( transformData.rotationPivot ) );

  	// parent transform
  	if ( transformData.parentMatrixWorld ) {

  		lParentLX.copy( transformData.parentMatrix );
  		lParentGX.copy( transformData.parentMatrixWorld );

  	}

  	const lLRM = new THREE.Matrix4().copy( lPreRotationM ).multiply( lRotationM ).multiply( lPostRotationM );
  	// Global Rotation
  	const lParentGRM = new THREE.Matrix4();
  	lParentGRM.extractRotation( lParentGX );

  	// Global Shear*Scaling
  	const lParentTM = new THREE.Matrix4();
  	lParentTM.copyPosition( lParentGX );

  	const lParentGSM = new THREE.Matrix4();
  	const lParentGRSM = new THREE.Matrix4().copy( lParentTM ).invert().multiply( lParentGX );
  	lParentGSM.copy( lParentGRM ).invert().multiply( lParentGRSM );
  	const lLSM = lScalingM;

  	const lGlobalRS = new THREE.Matrix4();

  	if ( inheritType === 0 ) {

  		lGlobalRS.copy( lParentGRM ).multiply( lLRM ).multiply( lParentGSM ).multiply( lLSM );

  	} else if ( inheritType === 1 ) {

  		lGlobalRS.copy( lParentGRM ).multiply( lParentGSM ).multiply( lLRM ).multiply( lLSM );

  	} else {

  		const lParentLSM = new THREE.Matrix4().scale( new THREE.Vector3().setFromMatrixScale( lParentLX ) );
  		const lParentLSM_inv = new THREE.Matrix4().copy( lParentLSM ).invert();
  		const lParentGSM_noLocal = new THREE.Matrix4().copy( lParentGSM ).multiply( lParentLSM_inv );

  		lGlobalRS.copy( lParentGRM ).multiply( lLRM ).multiply( lParentGSM_noLocal ).multiply( lLSM );

  	}

  	const lRotationPivotM_inv = new THREE.Matrix4();
  	lRotationPivotM_inv.copy( lRotationPivotM ).invert();
  	const lScalingPivotM_inv = new THREE.Matrix4();
  	lScalingPivotM_inv.copy( lScalingPivotM ).invert();
  	// Calculate the local transform matrix
  	let lTransform = new THREE.Matrix4();
  	lTransform.copy( lTranslationM ).multiply( lRotationOffsetM ).multiply( lRotationPivotM ).multiply( lPreRotationM ).multiply( lRotationM ).multiply( lPostRotationM ).multiply( lRotationPivotM_inv ).multiply( lScalingOffsetM ).multiply( lScalingPivotM ).multiply( lScalingM ).multiply( lScalingPivotM_inv );

  	const lLocalTWithAllPivotAndOffsetInfo = new THREE.Matrix4().copyPosition( lTransform );

  	const lGlobalTranslation = new THREE.Matrix4().copy( lParentGX ).multiply( lLocalTWithAllPivotAndOffsetInfo );
  	lGlobalT.copyPosition( lGlobalTranslation );

  	lTransform = new THREE.Matrix4().copy( lGlobalT ).multiply( lGlobalRS );

  	// from global to local
  	lTransform.premultiply( lParentGX.invert() );

  	return lTransform;

  }

  // Returns the three.js intrinsic Euler order corresponding to FBX extrinsic Euler order
  // ref: http://help.autodesk.com/view/FBX/2017/ENU/?guid=__cpp_ref_class_fbx_euler_html
  function getEulerOrder( order ) {

  	order = order || 0;

  	const enums = [
  		'ZYX', // -> XYZ extrinsic
  		'YZX', // -> XZY extrinsic
  		'XZY', // -> YZX extrinsic
  		'ZXY', // -> YXZ extrinsic
  		'YXZ', // -> ZXY extrinsic
  		'XYZ', // -> ZYX extrinsic
  		//'SphericXYZ', // not possible to support
  	];

  	if ( order === 6 ) {

  		console.warn( 'THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect.' );
  		return enums[ 0 ];

  	}

  	return enums[ order ];

  }

  // Parses comma separated list of numbers and returns them an array.
  // Used internally by the TextParser
  function parseNumberArray( value ) {

  	const array = value.split( ',' ).map( function ( val ) {

  		return parseFloat( val );

  	} );

  	return array;

  }

  function convertArrayBufferToString( buffer, from, to ) {

  	if ( from === undefined ) from = 0;
  	if ( to === undefined ) to = buffer.byteLength;

  	return THREE.LoaderUtils.decodeText( new Uint8Array( buffer, from, to ) );

  }

  function append( a, b ) {

  	for ( let i = 0, j = a.length, l = b.length; i < l; i ++, j ++ ) {

  		a[ j ] = b[ i ];

  	}

  }

  function slice( a, b, from, to ) {

  	for ( let i = from, j = 0; i < to; i ++, j ++ ) {

  		a[ j ] = b[ i ];

  	}

  	return a;

  }

  // inject array a2 into array a1 at index
  function inject( a1, index, a2 ) {

  	return a1.slice( 0, index ).concat( a2 ).concat( a1.slice( index ) );

  }

  function FBXLoader$1(fbxUrl, cbOnReady, targetRadius, isCenteredOnBoundingBox, isShadowShown) {
    // ----------------->>>
    new FBXLoader().load(fbxUrl, function (object) {
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
                      color: "white",
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
                    FBXLoader$1("https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/low-poly-well.fbx", // 'https://d-w-d.github.io/tsdx-threejs-react-boilerplate/images/monster-confrontation.fbx',
                    onObjectLoad, 0.05, true, true);
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
                  console.log(">>>>", THREE);
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

    //
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
        if (!_this.isRotating) return; // Logic for random rotation
        // This illustrates some important concepts for controlling camera

        var f = 0.5;
        var c = 0;
        var x = 10 * Math.sin(time * f) + c;
        var y = 10 * Math.cos(time * f * 2 + Math.PI) + c;
        var z = 10 * Math.sin(time * f + Math.PI * 0.5) + c;
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

      _this.addSceneEntities([new DemoObjLoader(), new MiscHelpers(), new SimpleLight(), new Square(1), new DirectionalLight()]); // Logic to run after scene initialization


      _this.preInitHook = function () {}; // Logic to run after scene initialization


      _this.postInitHook = function () {// this._orbitControls!.enabled = false;
      }; // Set initial camera position


      _this._initialViewingVector = new THREE.Vector3(6, 15, 9);
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

  exports.TsdxThreejsTemplate = TsdxThreejsTemplate;
  exports.init = init;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tsdxthreejstemplate.umd.development.js.map
