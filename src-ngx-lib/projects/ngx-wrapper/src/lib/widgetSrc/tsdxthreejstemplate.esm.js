import { Scene, Clock, Vector3, PerspectiveCamera, WebGLRenderer, PCFSoftShadowMap, GammaEncoding, Mesh, Box3, Group, BoxHelper, SphereGeometry, MeshPhongMaterial, DirectionalLight as DirectionalLight$1, DirectionalLightHelper, AxesHelper, AmbientLight, BoxGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import 'three/examples/jsm/loaders/OBJLoader';
import 'three/examples/jsm/loaders/MTLLoader';
import 'three/examples/jsm/loaders/DDSLoader';
import { FBXLoader as FBXLoader$1 } from 'three/examples/jsm/loaders/FBXLoader';
import React from 'react';

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

    this._scene = new Scene();
    this._canvas = document.createElement('canvas');
    this._clock = new Clock(false);
    this._initialViewingVector = new Vector3(10, 10, 10);
    this._isSceneReady = false;
    this._isRendering = false;
    this._isHelpersShown = false;
    this._isInit = false;
    this._container = null;
    this._fps = 60;
    this._camera = new PerspectiveCamera(initialCameraParams.fieldOfView, initialCameraParams.aspectRatio, initialCameraParams.nearPlane, initialCameraParams.farPlane);
    this._sceneEntities = [];

    this._preInitHook = function () {};

    this._postInitHook = function () {};

    this._destroyHook = function () {};

    this._updateCamera = function () {};

    this.registerSceneEntities = function (sceneEntities) {
      sceneEntities.forEach(function (el) {
        return _this._sceneEntities.push(el);
      });
    };
    /**
     * This method lets you show/hide the objects within in your scene
     * designated as 'helpers'. It relies on the practice of setting the property `userData.isHelper = true`
     * on any object you want to be classified as a helper
     */


    this.setHelpersVisibility = function () {
      _this._scene.traverse(function (child) {
        return child.userData.isHelper && (child.visible = _this._isHelpersShown);
      });
    };

    this.toggleHelpersVisibility = function () {
      _this._isHelpersShown = !_this._isHelpersShown;

      _this.setHelpersVisibility();
    };

    this._updateCameraAspect = function () {
      // Not sure where/how, but canvas' style width/height
      // gets altered and needs to be reset to 100%
      _this._canvas.style.width = '100%';
      _this._canvas.style.height = '100%';
      var width = _this._canvas.offsetWidth || 1;
      var height = _this._canvas.offsetHeight || 1;
      _this._camera.aspect = width / height;

      _this._camera.updateProjectionMatrix();

      _this._renderer.setSize(width, height);
    };

    this.destroy = function () {
      window.removeEventListener('resize', _this._updateCameraAspect);

      _this._stopRendering();

      _this._destroyHook();
    };

    this._render = function () {
      if (!_this._isRendering) return;
      setTimeout(function () {
        _this._requestAnimationFrameId = requestAnimationFrame(_this._render);

        _this._update();
      }, 1000 / _this._fps);
    };

    this._startRendering = function () {
      console.log('Starting animation...');
      _this._isRendering = true;

      _this._clock.start();

      _this._render();
    };

    this._stopRendering = function () {
      console.log('Stopping animation...');
      _this._isRendering = false;

      _this._clock.stop();
    };
  }

  var _proto = AbstractSceneManager.prototype;

  _proto.init = /*#__PURE__*/function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var _this2 = this;

      var DPR;
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

              this._preInitHook(); // Get container and add fitting canvas to it


              this._container = document.getElementById(this._containerId);

              if (this._container) {
                _context2.next = 7;
                break;
              }

              throw new Error('No container found with id: ' + this._containerId);

            case 7:
              this._canvas.style.width = '100%';
              this._canvas.style.height = '100%';

              this._container.append(this._canvas);

              this._container.style.setProperty('position', 'relative'); // React to resize events on window
              // this._updateCameraAspect = this.updateCameraAspect.bind(this);


              window.addEventListener('resize', this._updateCameraAspect); // Build Renderer

              DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
              this._renderer = new WebGLRenderer({
                canvas: this._canvas,
                antialias: true,
                alpha: true
              });

              this._renderer.setPixelRatio(DPR);

              this._renderer.sortObjects = false; // This prevents pesky rendering-disruption effect

              this._renderer.shadowMap.enabled = true;
              this._renderer.shadowMap.type = PCFSoftShadowMap;
              this._renderer.outputEncoding = GammaEncoding; // Init camera position and orientation

              this._camera.position.copy(this._initialViewingVector);

              this._camera.up = new Vector3(0, 0, 1); // Vector defining up direction of camera

              this._camera.lookAt(0, 0, 0); // Define and configure orbitControls
              // Do NOT attempt to create controls until
              // dependencies are set, or you'll get erratic behavior.
              // OrbitControls => Can't flip upside down
              // TrackballControls => Can flip upside down


              this._controls = !this._isWorldFlippable ? new OrbitControls(this._camera, this._renderer.domElement) : new TrackballControls(this._camera, this._renderer.domElement);

              if (!(this._controls instanceof OrbitControls)) {
                _context2.next = 28;
                break;
              }

              this._controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

              this._controls.dampingFactor = 0.25;
              _context2.next = 36;
              break;

            case 28:
              if (!(this._controls instanceof TrackballControls)) {
                _context2.next = 35;
                break;
              }

              this._controls.rotateSpeed = 10.0;
              this._controls.zoomSpeed = 1.2;
              this._controls.panSpeed = 0.8;
              this._controls.keys = ['65', '83', '68']; // a s d

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
              this.setHelpersVisibility();

              this._updateCameraAspect(); // Begin Animation


              this._startRendering(); // Enable superclass constructor to adjust settings after to initialization sequence


              this._postInitHook();

            case 44:
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

  _proto.setFramesPerSecond = function setFramesPerSecond(newFps) {
    if (newFps <= 0 || newFps > 100) return;
    this._fps = newFps;
  };

  _proto._update = function _update() {
    var _this$_controls;

    // Get time
    var elapsedTime = this._clock.getElapsedTime(); // Loop through scene entities and trigger their update methods


    this._sceneEntities.forEach(function (el) {
      return el.update(elapsedTime);
    }); // Update camera


    this._updateCamera(elapsedTime); // Needed for TrackballControls


    (_this$_controls = this._controls) == null ? void 0 : _this$_controls.update(); // Finish loop

    if (!this._camera || !this._renderer) throw new Error('Poor Logic');

    if (!!this._requestAnimationFrameId) {
      this._renderer.render(this._scene, this._camera);
    }
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
    if (child instanceof Mesh) {
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
  var boundingBox = new Box3().setFromObject(object);

  var _boundingBox$getCente = boundingBox.getCenter(new Vector3()).toArray(),
      x2 = _boundingBox$getCente[0],
      y2 = _boundingBox$getCente[1],
      z2 = _boundingBox$getCente[2]; // Move object to where center was


  var _object$position$clon = object.position.clone().toArray(),
      x1 = _object$position$clon[0],
      y1 = _object$position$clon[1],
      z1 = _object$position$clon[2];

  object.position.set(x1 - x2, y1 - y2, z1 - z2);
}

function FBXLoader(fbxUrl, cbOnReady, targetRadius, isCenteredOnBoundingBox, isShadowShown) {
  // ----------------->>>
  new FBXLoader$1().load(fbxUrl, function (object) {
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
  this._sceneEntityGroup = new Group();

  this.getSceneEntityGroup = function () {
    return _this._sceneEntityGroup;
  };
};

var DemoLoadedObject = /*#__PURE__*/function (_AbstractSceneEntity) {
  _inheritsLoose(DemoLoadedObject, _AbstractSceneEntity);

  function DemoLoadedObject() {
    var _this;

    // ~~~>>>
    _this = _AbstractSceneEntity.apply(this, arguments) || this;
    _this._isInternalLightsOn = true;

    _this.update = function (time) {
      _this._sceneEntityGroup.rotateY(time * 0 + 0.001);
    };

    _this.toggleInternalLights = function () {
      _this._isInternalLightsOn = !_this._isInternalLightsOn;

      _this._loadedObject.traverse(function (child) {
        // console.log('>>> ', child.type);
        if (child.type === 'DirectionalLight') {
          //
          child.visible = _this._isInternalLightsOn;
        }
      });
    };

    return _this;
  }

  var _proto = DemoLoadedObject.prototype;

  _proto.init = /*#__PURE__*/function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _this2 = this;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve) {
                // --->>>
                var onObjectLoad = function onObjectLoad(loadedObject) {
                  // --->>>
                  // Set internal handle and register object
                  _this2._loadedObject = loadedObject;

                  _this2._sceneEntityGroup.add(loadedObject); // Rotations to correct object orientation


                  // Rotations to correct object orientation
                  _this2._sceneEntityGroup.rotateX(Math.PI / 2); // Create helper box around loaded object


                  // Create helper box around loaded object
                  var helperBox = new BoxHelper(loadedObject, 0xffff00);
                  helperBox.userData.isHelper = true;

                  _this2._sceneEntityGroup.add(helperBox); // Add helper sphere to origin of group to illustrate it


                  // Add helper sphere to origin of group to illustrate it
                  var sphere = new Mesh(new SphereGeometry(1), new MeshPhongMaterial({
                    color: 'white',
                    opacity: 0.1
                  }));
                  sphere.userData.isHelper = true;

                  _this2._sceneEntityGroup.add(sphere); // Add helperBox to all children of loadedObject


                  // Add helperBox to all children of loadedObject
                  loadedObject.traverse(function (child) {
                    child.visible = true;
                    // See dev notes on why all this scaling logic is needed


                    // If child is a directional light, then give it a helper
                    // See dev notes on why all this scaling logic is needed
                    if (child.type === 'DirectionalLight') {
                      var s = getObjectMeanScale(loadedObject);
                      var directionalLightClone = child.clone();
                      var _directionalLightClon = directionalLightClone.position,
                          x = _directionalLightClon.x,
                          y = _directionalLightClon.y,
                          z = _directionalLightClon.z;
                      var newDirectionalLight = new DirectionalLight$1();
                      newDirectionalLight.position.set(x * s, y * s, z * s);
                      newDirectionalLight.intensity = directionalLightClone.intensity;
                      var helper = new DirectionalLightHelper(newDirectionalLight, 5, 'pink');
                      helper.userData.isHelper = true;

                      _this2._sceneEntityGroup.add(helper);
                    }
                  });
                  resolve(_this2._sceneEntityGroup);
                }; // Test loader-wrappers for MTL-OBJ and FBX files


                // Test loader-wrappers for MTL-OBJ and FBX files
                {
                  FBXLoader('https://raw.githubusercontent.com/d-w-d/tsdx-threejs-template/main/images/low-poly-well.fbx', onObjectLoad, // 1,
                  0.05, true, true);
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

  return DemoLoadedObject;
}(AbstractSceneEntity);

function getObjectMeanScale(object) {
  return (object.scale.x + object.scale.x + object.scale.x) / 3;
}

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
                var axesHelper = new AxesHelper(500); // Mark this as helper in order to be toggle-able

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

    // ~~~>>>
    _this = _AbstractSceneEntity.apply(this, arguments) || this;
    _this._defaultIntensity = 0.3;

    _this.update = function (time) {
      _this._sceneEntityGroup.position.x += time * 0;
    };

    _this.setPower = function (intensity) {
      var newIntensity = intensity || _this._defaultIntensity;
      _this._light.intensity = newIntensity;
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
                _this2._light = new AmbientLight(0x333333, _this2._defaultIntensity);
                _this2._light.userData.isAmbientLight = true;

                _this2._sceneEntityGroup.add(_this2._light);

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

  _proto.setIsOn = function setIsOn(isOn) {
    this._light.visible = isOn;
  };

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
                _this2._sceneEntityGroup.add(new Mesh(new BoxGeometry(_this2.sideLength, _this2.sideLength, _this2.sideLength), new MeshPhongMaterial()));

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

    // ~~~>>>
    _this = _AbstractSceneEntity.apply(this, arguments) || this;

    _this.update = function (_time) {// this._sceneEntityGroup.position.x += time * 0;
      // this._sceneEntityGroup.rotateZ(_time * 0 + 0.001);
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
                // Create light
                _this2._light = new DirectionalLight$1(0xffffff, 1);

                _this2._light.position.set(10, 10, 10);

                _this2._light.lookAt(0, 0, 0);

                _this2._light.castShadow = true;

                _this2._sceneEntityGroup.add(_this2._light); // Add light helper


                // Add light helper
                var helper = new DirectionalLightHelper(_this2._light.clone(), 5, 'cyan');
                helper.userData.isHelper = true;
                helper.visible = true;
                helper.userData.name = 'my-directional-light-helper';

                _this2._sceneEntityGroup.add(_this2._light);

                _this2._sceneEntityGroup.add(helper); // console.log('=============', this._light, this._light.clone(), helper);


                // console.log('=============', this._light, this._light.clone(), helper);
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

  _proto.setIsOn = function setIsOn(isOn) {
    this._light.visible = isOn;
  };

  return DirectionalLight;
}(AbstractSceneEntity);

/**
 * Constants for widget
 */

/**
 * Properties common to all html buttons
 */
var buttonBackgroundColor = 'rgba(255,255,255,0.2)';
var buttonClickedBackgroundColor = 'rgba(255,255,255,0.4)';
var buttonTextColor = 'rgba(255,255,255,0.8)';
var buttonCursorType = 'pointer';
var buttonPadding = '10px';
var buttonFadeInSpecs = '1s ease-in-out'; // These two properties must be coordinated together using e.g. google.fonts

var buttonFontFamily = "'Odibee Sans', cursive";
var buttonCssUrl = 'https://fonts.googleapis.com/css2?family=Odibee+Sans';

/**
 *
 */
var addGlobalStyles = function addGlobalStyles() {

  var globalStyle = document.createElement('style');
  globalStyle.innerHTML = "\n    @keyframes global-fade-in {\n      from { opacity: 0; }\n      to   { opacity: 1; }\n    }\n  ";
  document.head.append(globalStyle); //
};

/**
 * Function to mutate buttons by injecting them with properties
 * common to all html buttons; append to container when ready
 */

var injectCommonButtonProperties = function injectCommonButtonProperties(button, container, onClickCB) {
  // --->>>
  // Add to global styles
  addGlobalStyles(); // Start loading the remote fonts style sheet; mutate button on completion

  var link = document.createElement('link');
  link.rel = 'stylesheet';

  link.onload = function () {
    // console.log('Loaded css url for fonts');
    mutateButton();
  };

  link.onerror = function () {
    console.log('Failed to load css url for fonts; continuing anyway...');
    mutateButton();
  };

  link.href = buttonCssUrl;
  document.head.append(link); // Callback to mutate button

  function mutateButton() {
    // Positioning
    button.style.position = 'absolute';
    button.style.setProperty('padding', buttonPadding); // Colors

    button.style.setProperty('color', buttonTextColor);
    button.style.setProperty('background-color', buttonBackgroundColor); // Font stuff

    button.style.setProperty('font-family', buttonFontFamily);
    button.style.setProperty('font-size', '20px'); // Setup fade-in effect

    button.style.setProperty('animation', "global-fade-in " + buttonFadeInSpecs); // Cursor behavior
    // Prevent text in button from being selectable
    // See here: https://stackoverflow.com/a/4407335/8620332

    button.style.setProperty('cursor', buttonCursorType);
    button.style.setProperty('-webkit-touch-callout', 'none');
    button.style.setProperty('-webkit-user-select', 'none');
    button.style.setProperty('-khtml-user-select', 'none');
    button.style.setProperty('-moz-user-select', 'none');
    button.style.setProperty('-ms-user-select', 'none');
    button.style.setProperty('user-select', 'none'); // Properties related to click effect

    button.style.setProperty('transition', 'background-color 50ms ease-in-out');
    button.addEventListener('click', function () {
      button.style.setProperty('background-color', buttonClickedBackgroundColor);
      setTimeout(function () {
        button.style.setProperty('background-color', buttonBackgroundColor);
        onClickCB();
      }, 200);
    }); // Make visible

    container.append(button);
  }
};

/**
 *
 * @param container
 */

var buttonToggleLights = function buttonToggleLights(container, onClickCB) {
  // --->>>
  // Warning
  if (!container) throw new Error('Canvas Container is Falsy!'); // Set properties unique to this button

  var button = document.createElement('div');
  button.innerText = 'Toggle Lights';
  button.style.setProperty('top', '10px');
  button.style.setProperty('left', '10px'); // Set properties common to all buttons; append to container when ready

  injectCommonButtonProperties(button, container, onClickCB); // Finish him

  return button;
};

/**
 *
 * @param container
 */

var buttonToggleHelpers = function buttonToggleHelpers(container, onClickCB) {
  // --->>>
  // Warning
  if (!container) throw new Error('Canvas Container is Falsy!'); // Set properties unique to this button

  var button = document.createElement('div');
  button.innerText = 'Toggle Helpers';
  button.style.setProperty('top', '10px');
  button.style.setProperty('right', '10px'); // Set properties common to all buttons; append to container when ready

  injectCommonButtonProperties(button, container, onClickCB); // Finish him

  return button;
};

/**
 *
 * @param container
 */

var buttonToggleRotation = function buttonToggleRotation(container, onClickCB) {
  // --->>>
  // Warning
  if (!container) throw new Error('Canvas Container is Falsy!'); // Set properties unique to this button

  var button = document.createElement('div');
  button.innerText = 'Toggle Rotations';
  button.style.setProperty('top', '10px');
  button.style.setProperty('left', '50%');
  button.style.setProperty('transform', 'translateX(-50%)'); // Set properties common to all buttons; append to container when ready

  injectCommonButtonProperties(button, container, onClickCB); // Finish him

  return button;
};

/**
 * Implement a scene for this app with 'real' scene entities
 */

var SceneManager = /*#__PURE__*/function (_AbstractSceneManager) {
  _inheritsLoose(SceneManager, _AbstractSceneManager);

  function SceneManager(containerId) {
    var _this;

    // --->>>
    _this = _AbstractSceneManager.call(this, containerId) || this; // ~~~>>>

    _this.isRotating = false;
    _this._isDirectionalLightOn = true; // Overwrite protected method to update camera

    _this._updateCamera = function (time) {
      // -------------------------->>>
      // return;
      if (!_this.isRotating) return; // Logic for random rotation
      // This illustrates some important concepts for controlling camera

      var f = 0.5;
      var c = 1.111;
      var x = 10 * Math.sin(time * 1.1 * f) + c;
      var y = 10 * Math.cos(time * 1.1 * f * 2 + Math.PI) + c;
      var z = 10 * Math.sin(time * 1.1 * f + Math.PI * 0.5) + c;
      _this._camera.position.x = x;
      _this._camera.position.y = y;
      _this._camera.position.z = z; // Logic to prevent camera reorientation at zenith
      // Allows world to go upside down; nauseating

      var presentLookVector = new Vector3(0, 0, -1);
      presentLookVector.applyQuaternion(_this._camera.quaternion);

      _this._camera.up.copy(presentLookVector);

      _this._camera.lookAt(0, 0, 0);
    };

    _this.toggleRotation = function () {
      _this.isRotating = !_this.isRotating; // Reset camera

      if (_this.isRotating) {
        _this._controls.enabled = false;
      } else {
        _this._camera.position.copy(_this._initialViewingVector);

        _this._camera.up.copy(new Vector3(0, 0, 1));

        _this._controls.enabled = true;
      }
    }; // Create scene entities that need a handle


    _this._directionalLight = new DirectionalLight();
    _this._demoLoadedObject = new DemoLoadedObject(); // Register all scene entities

    _this.registerSceneEntities([_this._directionalLight, _this._demoLoadedObject, new SimpleLight(), new MiscHelpers(), new Square(1)]); // Logic to run before scene initialization


    _this._preInitHook = function () {}; // Logic to run after scene initialization


    _this._postInitHook = function () {
      // --->>>
      // Add buttons
      _this.toggleLightsButton = buttonToggleLights(_this._container, function () {
        var _this$_directionalLig;

        _this._isDirectionalLightOn = !_this._isDirectionalLightOn;
        (_this$_directionalLig = _this._directionalLight) == null ? void 0 : _this$_directionalLig.setIsOn(_this._isDirectionalLightOn);

        _this._demoLoadedObject.toggleInternalLights();
      });

      _this.toggleLightsButton.hasChildNodes();

      _this.toggleRotationButton = buttonToggleRotation(_this._container, _this.toggleRotation);

      _this.toggleRotationButton.hasChildNodes();

      _this.toggleHelpersButton = buttonToggleHelpers(_this._container, _this.toggleHelpersVisibility);

      _this.toggleHelpersButton.hasChildNodes();
    }; // Set initial camera position


    _this._initialViewingVector = new Vector3(6, 15, 9); // Add listeners, subscriptions, etc.
    // !BE SURE TO ADD CORRESPONDING TERMINATORS TO this.destroyHook()!

    _this.demoInterval = setInterval(function () {// console.log('>>> This is a demo listener that needs to be removed at end');
    }, 1000);

    _this._destroyHook = function () {
      clearInterval(_this.demoInterval);
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

export { TsdxThreejsTemplate, destroy, init };
//# sourceMappingURL=tsdxthreejstemplate.esm.js.map
