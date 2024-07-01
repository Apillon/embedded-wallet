import Ae, { createContext as Oe, useReducer as Ie, useState as N, useEffect as U, useContext as Pe, forwardRef as tr, useRef as X, useMemo as ye } from "react";
import rr from "react-dom";
import { Transition as nr, Dialog as ar, TransitionChild as lt, DialogPanel as sr } from "@headlessui/react";
import { W as re, i as ct, E as or, g as me, c as ee } from "./index-VLVQMktF.js";
import { ethers as Ce } from "ethers";
import ir from "react-qr-code";
function lr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ft = { exports: {} }, _ = ft.exports = {}, V, B;
function Re() {
  throw new Error("setTimeout has not been defined");
}
function Ne() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? V = setTimeout : V = Re;
  } catch {
    V = Re;
  }
  try {
    typeof clearTimeout == "function" ? B = clearTimeout : B = Ne;
  } catch {
    B = Ne;
  }
})();
function pt(t) {
  if (V === setTimeout)
    return setTimeout(t, 0);
  if ((V === Re || !V) && setTimeout)
    return V = setTimeout, setTimeout(t, 0);
  try {
    return V(t, 0);
  } catch {
    try {
      return V.call(null, t, 0);
    } catch {
      return V.call(this, t, 0);
    }
  }
}
function cr(t) {
  if (B === clearTimeout)
    return clearTimeout(t);
  if ((B === Ne || !B) && clearTimeout)
    return B = clearTimeout, clearTimeout(t);
  try {
    return B(t);
  } catch {
    try {
      return B.call(null, t);
    } catch {
      return B.call(this, t);
    }
  }
}
var M = [], te = !1, G, ve = -1;
function ur() {
  !te || !G || (te = !1, G.length ? M = G.concat(M) : ve = -1, M.length && ht());
}
function ht() {
  if (!te) {
    var t = pt(ur);
    te = !0;
    for (var n = M.length; n; ) {
      for (G = M, M = []; ++ve < n; )
        G && G[ve].run();
      ve = -1, n = M.length;
    }
    G = null, te = !1, cr(t);
  }
}
_.nextTick = function(t) {
  var n = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var a = 1; a < arguments.length; a++)
      n[a - 1] = arguments[a];
  M.push(new mt(t, n)), M.length === 1 && !te && pt(ht);
};
function mt(t, n) {
  this.fun = t, this.array = n;
}
mt.prototype.run = function() {
  this.fun.apply(null, this.array);
};
_.title = "browser";
_.browser = !0;
_.env = {};
_.argv = [];
_.version = "";
_.versions = {};
function Y() {
}
_.on = Y;
_.addListener = Y;
_.once = Y;
_.off = Y;
_.removeListener = Y;
_.removeAllListeners = Y;
_.emit = Y;
_.prependListener = Y;
_.prependOnceListener = Y;
_.listeners = function(t) {
  return [];
};
_.binding = function(t) {
  throw new Error("process.binding is not supported");
};
_.cwd = function() {
  return "/";
};
_.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
_.umask = function() {
  return 0;
};
var dr = ft.exports;
const Fe = /* @__PURE__ */ lr(dr);
var _e = { exports: {} }, oe = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ut;
function fr() {
  if (ut)
    return oe;
  ut = 1;
  var t = Ae, n = Symbol.for("react.element"), a = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, m = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(y, u, g) {
    var p, f = {}, o = null, c = null;
    g !== void 0 && (o = "" + g), u.key !== void 0 && (o = "" + u.key), u.ref !== void 0 && (c = u.ref);
    for (p in u)
      i.call(u, p) && !d.hasOwnProperty(p) && (f[p] = u[p]);
    if (y && y.defaultProps)
      for (p in u = y.defaultProps, u)
        f[p] === void 0 && (f[p] = u[p]);
    return { $$typeof: n, type: y, key: o, ref: c, props: f, _owner: m.current };
  }
  return oe.Fragment = a, oe.jsx = v, oe.jsxs = v, oe;
}
var ie = {}, dt;
function pr() {
  return dt || (dt = 1, Fe.env.NODE_ENV !== "production" && function() {
    var t = Ae, n = Symbol.for("react.element"), a = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), v = Symbol.for("react.provider"), y = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), o = Symbol.for("react.lazy"), c = Symbol.for("react.offscreen"), h = Symbol.iterator, S = "@@iterator";
    function k(e) {
      if (e === null || typeof e != "object")
        return null;
      var s = h && e[h] || e[S];
      return typeof s == "function" ? s : null;
    }
    var I = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var s = arguments.length, l = new Array(s > 1 ? s - 1 : 0), x = 1; x < s; x++)
          l[x - 1] = arguments[x];
        H("error", e, l);
      }
    }
    function H(e, s, l) {
      {
        var x = I.ReactDebugCurrentFrame, j = x.getStackAddendum();
        j !== "" && (s += "%s", l = l.concat([j]));
        var T = l.map(function(w) {
          return String(w);
        });
        T.unshift("Warning: " + s), Function.prototype.apply.call(console[e], console, T);
      }
    }
    var F = !1, J = !1, z = !1, C = !1, kt = !1, Le;
    Le = Symbol.for("react.module.reference");
    function St(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === i || e === d || kt || e === m || e === g || e === p || C || e === c || F || J || z || typeof e == "object" && e !== null && (e.$$typeof === o || e.$$typeof === f || e.$$typeof === v || e.$$typeof === y || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Le || e.getModuleId !== void 0));
    }
    function Ct(e, s, l) {
      var x = e.displayName;
      if (x)
        return x;
      var j = s.displayName || s.name || "";
      return j !== "" ? l + "(" + j + ")" : l;
    }
    function Ue(e) {
      return e.displayName || "Context";
    }
    function $(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case i:
          return "Fragment";
        case a:
          return "Portal";
        case d:
          return "Profiler";
        case m:
          return "StrictMode";
        case g:
          return "Suspense";
        case p:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case y:
            var s = e;
            return Ue(s) + ".Consumer";
          case v:
            var l = e;
            return Ue(l._context) + ".Provider";
          case u:
            return Ct(e, e.render, "ForwardRef");
          case f:
            var x = e.displayName || null;
            return x !== null ? x : $(e.type) || "Memo";
          case o: {
            var j = e, T = j._payload, w = j._init;
            try {
              return $(w(T));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var q = Object.assign, ne = 0, $e, Ve, Be, Me, Ye, He, Je;
    function ze() {
    }
    ze.__reactDisabledLog = !0;
    function Rt() {
      {
        if (ne === 0) {
          $e = console.log, Ve = console.info, Be = console.warn, Me = console.error, Ye = console.group, He = console.groupCollapsed, Je = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ze,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        ne++;
      }
    }
    function Nt() {
      {
        if (ne--, ne === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: q({}, e, {
              value: $e
            }),
            info: q({}, e, {
              value: Ve
            }),
            warn: q({}, e, {
              value: Be
            }),
            error: q({}, e, {
              value: Me
            }),
            group: q({}, e, {
              value: Ye
            }),
            groupCollapsed: q({}, e, {
              value: He
            }),
            groupEnd: q({}, e, {
              value: Je
            })
          });
        }
        ne < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var xe = I.ReactCurrentDispatcher, ge;
    function ue(e, s, l) {
      {
        if (ge === void 0)
          try {
            throw Error();
          } catch (j) {
            var x = j.stack.trim().match(/\n( *(at )?)/);
            ge = x && x[1] || "";
          }
        return `
` + ge + e;
      }
    }
    var be = !1, de;
    {
      var _t = typeof WeakMap == "function" ? WeakMap : Map;
      de = new _t();
    }
    function qe(e, s) {
      if (!e || be)
        return "";
      {
        var l = de.get(e);
        if (l !== void 0)
          return l;
      }
      var x;
      be = !0;
      var j = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var T;
      T = xe.current, xe.current = null, Rt();
      try {
        if (s) {
          var w = function() {
            throw Error();
          };
          if (Object.defineProperty(w.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(w, []);
            } catch (D) {
              x = D;
            }
            Reflect.construct(e, [], w);
          } else {
            try {
              w.call();
            } catch (D) {
              x = D;
            }
            e.call(w.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (D) {
            x = D;
          }
          e();
        }
      } catch (D) {
        if (D && x && typeof D.stack == "string") {
          for (var b = D.stack.split(`
`), P = x.stack.split(`
`), R = b.length - 1, A = P.length - 1; R >= 1 && A >= 0 && b[R] !== P[A]; )
            A--;
          for (; R >= 1 && A >= 0; R--, A--)
            if (b[R] !== P[A]) {
              if (R !== 1 || A !== 1)
                do
                  if (R--, A--, A < 0 || b[R] !== P[A]) {
                    var L = `
` + b[R].replace(" at new ", " at ");
                    return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && de.set(e, L), L;
                  }
                while (R >= 1 && A >= 0);
              break;
            }
        }
      } finally {
        be = !1, xe.current = T, Nt(), Error.prepareStackTrace = j;
      }
      var Z = e ? e.displayName || e.name : "", K = Z ? ue(Z) : "";
      return typeof e == "function" && de.set(e, K), K;
    }
    function At(e, s, l) {
      return qe(e, !1);
    }
    function Ot(e) {
      var s = e.prototype;
      return !!(s && s.isReactComponent);
    }
    function fe(e, s, l) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return qe(e, Ot(e));
      if (typeof e == "string")
        return ue(e);
      switch (e) {
        case g:
          return ue("Suspense");
        case p:
          return ue("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return At(e.render);
          case f:
            return fe(e.type, s, l);
          case o: {
            var x = e, j = x._payload, T = x._init;
            try {
              return fe(T(j), s, l);
            } catch {
            }
          }
        }
      return "";
    }
    var ae = Object.prototype.hasOwnProperty, Ke = {}, Xe = I.ReactDebugCurrentFrame;
    function pe(e) {
      if (e) {
        var s = e._owner, l = fe(e.type, e._source, s ? s.type : null);
        Xe.setExtraStackFrame(l);
      } else
        Xe.setExtraStackFrame(null);
    }
    function It(e, s, l, x, j) {
      {
        var T = Function.call.bind(ae);
        for (var w in e)
          if (T(e, w)) {
            var b = void 0;
            try {
              if (typeof e[w] != "function") {
                var P = Error((x || "React class") + ": " + l + " type `" + w + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[w] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw P.name = "Invariant Violation", P;
              }
              b = e[w](s, w, x, l, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (R) {
              b = R;
            }
            b && !(b instanceof Error) && (pe(j), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", x || "React class", l, w, typeof b), pe(null)), b instanceof Error && !(b.message in Ke) && (Ke[b.message] = !0, pe(j), E("Failed %s type: %s", l, b.message), pe(null));
          }
      }
    }
    var Pt = Array.isArray;
    function we(e) {
      return Pt(e);
    }
    function Ft(e) {
      {
        var s = typeof Symbol == "function" && Symbol.toStringTag, l = s && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return l;
      }
    }
    function Dt(e) {
      try {
        return Ge(e), !1;
      } catch {
        return !0;
      }
    }
    function Ge(e) {
      return "" + e;
    }
    function Qe(e) {
      if (Dt(e))
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ft(e)), Ge(e);
    }
    var se = I.ReactCurrentOwner, Wt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ze, et, je;
    je = {};
    function Lt(e) {
      if (ae.call(e, "ref")) {
        var s = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Ut(e) {
      if (ae.call(e, "key")) {
        var s = Object.getOwnPropertyDescriptor(e, "key").get;
        if (s && s.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function $t(e, s) {
      if (typeof e.ref == "string" && se.current && s && se.current.stateNode !== s) {
        var l = $(se.current.type);
        je[l] || (E('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', $(se.current.type), e.ref), je[l] = !0);
      }
    }
    function Vt(e, s) {
      {
        var l = function() {
          Ze || (Ze = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: l,
          configurable: !0
        });
      }
    }
    function Bt(e, s) {
      {
        var l = function() {
          et || (et = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
        };
        l.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: l,
          configurable: !0
        });
      }
    }
    var Mt = function(e, s, l, x, j, T, w) {
      var b = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: n,
        // Built-in properties that belong on the element
        type: e,
        key: s,
        ref: l,
        props: w,
        // Record the component responsible for creating this element.
        _owner: T
      };
      return b._store = {}, Object.defineProperty(b._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(b, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: x
      }), Object.defineProperty(b, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: j
      }), Object.freeze && (Object.freeze(b.props), Object.freeze(b)), b;
    };
    function Yt(e, s, l, x, j) {
      {
        var T, w = {}, b = null, P = null;
        l !== void 0 && (Qe(l), b = "" + l), Ut(s) && (Qe(s.key), b = "" + s.key), Lt(s) && (P = s.ref, $t(s, j));
        for (T in s)
          ae.call(s, T) && !Wt.hasOwnProperty(T) && (w[T] = s[T]);
        if (e && e.defaultProps) {
          var R = e.defaultProps;
          for (T in R)
            w[T] === void 0 && (w[T] = R[T]);
        }
        if (b || P) {
          var A = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          b && Vt(w, A), P && Bt(w, A);
        }
        return Mt(e, b, P, j, x, se.current, w);
      }
    }
    var Te = I.ReactCurrentOwner, tt = I.ReactDebugCurrentFrame;
    function Q(e) {
      if (e) {
        var s = e._owner, l = fe(e.type, e._source, s ? s.type : null);
        tt.setExtraStackFrame(l);
      } else
        tt.setExtraStackFrame(null);
    }
    var Ee;
    Ee = !1;
    function ke(e) {
      return typeof e == "object" && e !== null && e.$$typeof === n;
    }
    function rt() {
      {
        if (Te.current) {
          var e = $(Te.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Ht(e) {
      return "";
    }
    var nt = {};
    function Jt(e) {
      {
        var s = rt();
        if (!s) {
          var l = typeof e == "string" ? e : e.displayName || e.name;
          l && (s = `

Check the top-level render call using <` + l + ">.");
        }
        return s;
      }
    }
    function at(e, s) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var l = Jt(s);
        if (nt[l])
          return;
        nt[l] = !0;
        var x = "";
        e && e._owner && e._owner !== Te.current && (x = " It was passed a child from " + $(e._owner.type) + "."), Q(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', l, x), Q(null);
      }
    }
    function st(e, s) {
      {
        if (typeof e != "object")
          return;
        if (we(e))
          for (var l = 0; l < e.length; l++) {
            var x = e[l];
            ke(x) && at(x, s);
          }
        else if (ke(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var j = k(e);
          if (typeof j == "function" && j !== e.entries)
            for (var T = j.call(e), w; !(w = T.next()).done; )
              ke(w.value) && at(w.value, s);
        }
      }
    }
    function zt(e) {
      {
        var s = e.type;
        if (s == null || typeof s == "string")
          return;
        var l;
        if (typeof s == "function")
          l = s.propTypes;
        else if (typeof s == "object" && (s.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        s.$$typeof === f))
          l = s.propTypes;
        else
          return;
        if (l) {
          var x = $(s);
          It(l, e.props, "prop", x, e);
        } else if (s.PropTypes !== void 0 && !Ee) {
          Ee = !0;
          var j = $(s);
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", j || "Unknown");
        }
        typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function qt(e) {
      {
        for (var s = Object.keys(e.props), l = 0; l < s.length; l++) {
          var x = s[l];
          if (x !== "children" && x !== "key") {
            Q(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", x), Q(null);
            break;
          }
        }
        e.ref !== null && (Q(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), Q(null));
      }
    }
    var ot = {};
    function it(e, s, l, x, j, T) {
      {
        var w = St(e);
        if (!w) {
          var b = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (b += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var P = Ht();
          P ? b += P : b += rt();
          var R;
          e === null ? R = "null" : we(e) ? R = "array" : e !== void 0 && e.$$typeof === n ? (R = "<" + ($(e.type) || "Unknown") + " />", b = " Did you accidentally export a JSX literal instead of a component?") : R = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", R, b);
        }
        var A = Yt(e, s, l, j, T);
        if (A == null)
          return A;
        if (w) {
          var L = s.children;
          if (L !== void 0)
            if (x)
              if (we(L)) {
                for (var Z = 0; Z < L.length; Z++)
                  st(L[Z], e);
                Object.freeze && Object.freeze(L);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              st(L, e);
        }
        if (ae.call(s, "key")) {
          var K = $(e), D = Object.keys(s).filter(function(er) {
            return er !== "key";
          }), Se = D.length > 0 ? "{key: someKey, " + D.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!ot[K + Se]) {
            var Zt = D.length > 0 ? "{" + D.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Se, K, Zt, K), ot[K + Se] = !0;
          }
        }
        return e === i ? qt(A) : zt(A), A;
      }
    }
    function Kt(e, s, l) {
      return it(e, s, l, !0);
    }
    function Xt(e, s, l) {
      return it(e, s, l, !1);
    }
    var Gt = Xt, Qt = Kt;
    ie.Fragment = i, ie.jsx = Gt, ie.jsxs = Qt;
  }()), ie;
}
Fe.env.NODE_ENV === "production" ? _e.exports = fr() : _e.exports = pr();
var r = _e.exports, ce = {}, le = rr;
if (Fe.env.NODE_ENV === "production")
  ce.createRoot = le.createRoot, ce.hydrateRoot = le.hydrateRoot;
else {
  var he = le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  ce.createRoot = function(t, n) {
    he.usingClientEntryPoint = !0;
    try {
      return le.createRoot(t, n);
    } finally {
      he.usingClientEntryPoint = !1;
    }
  }, ce.hydrateRoot = function(t, n, a) {
    he.usingClientEntryPoint = !0;
    try {
      return le.hydrateRoot(t, n, a);
    } finally {
      he.usingClientEntryPoint = !1;
    }
  };
}
const vt = (t = 0) => ({
  username: "",
  address: "",
  contractAddress: "",
  balance: "",
  authStrategy: "passkey",
  networkId: t,
  walletScreen: "main",
  displayedError: ""
});
function hr(t, n) {
  switch (n.type) {
    case "setValue":
      return {
        ...t,
        [n.payload.key]: n.payload.value
      };
    case "setState":
      return {
        ...t,
        ...n.payload
      };
    case "reset":
      return vt(t.networkId);
    default:
      throw new Error("Unhandled action type." + JSON.stringify(n));
  }
}
const yt = Oe(void 0);
function mr({
  children: t,
  networks: n = [],
  defaultNetworkId: a = 0,
  sapphireUrl: i,
  accountManagerAddress: m
}) {
  const [d, v] = Ie(hr, vt(a)), [y, u] = N(!1), [g, p] = N();
  U(() => {
    if (y) {
      const { walletScreen: o, displayedError: c, ...h } = d;
      localStorage.setItem(re.WALLET_CONTEXT, JSON.stringify(h));
    }
  }, [d]), U(() => {
    const o = localStorage.getItem(re.WALLET_CONTEXT);
    if (o)
      try {
        const c = JSON.parse(o);
        v({ type: "setState", payload: c });
      } catch (c) {
        console.error("Cant parse global state localStorage", c);
      }
    setTimeout(() => u(!0), 10);
  }, []), U(() => {
    if (y && !g) {
      let o;
      n && n.length ? o = ct({
        sapphireUrl: i,
        accountManagerAddress: m,
        defaultNetworkId: d.networkId || a,
        networkConfig: n.reduce((c, h) => (c[h.id] = {
          rpcUrl: h.rpcUrl,
          explorerUrl: h.explorerUrl
        }, c), {})
      }) : o = ct(), o && (p(o), f(o), o.setAccount({
        username: d.username,
        strategy: d.authStrategy,
        address: d.address,
        contractAddress: d.contractAddress
      }));
    }
  }, [n, a, y]);
  async function f(o) {
    const c = o || g;
    if (c && d.address)
      try {
        const h = await c?.getAccountBalance(d.address);
        v({ type: "setValue", payload: { key: "balance", value: h } }), console.log(
          "Native Oasis Sapphire balance:",
          await c.getAccountBalance(d.address, 23295)
        );
      } catch (h) {
        console.error("Reloading balance", h);
      }
  }
  return /* @__PURE__ */ r.jsx(
    yt.Provider,
    {
      value: {
        state: d,
        dispatch: v,
        networks: n,
        networksById: n.reduce((o, c) => (o[c.id] = c, o), {}),
        defaultNetworkId: a || 0,
        wallet: g,
        setWallet: p,
        reloadUserBalance: f,
        setScreen: (o) => v({ type: "setValue", payload: { key: "walletScreen", value: o } }),
        handleError: (o) => {
          o ? (console.error(o), (o?.name || o?.message) && v({
            type: "setValue",
            payload: { key: "displayedError", value: or[o.name] || o.message }
          })) : v({ type: "setValue", payload: { key: "displayedError", value: "" } });
        }
      },
      children: t
    }
  );
}
function W() {
  const t = Pe(yt);
  if (t === void 0)
    throw new Error("useWalletContext usage must be wrapped with WalletContext provider.");
  return t;
}
function xt(t) {
  var n, a, i = "";
  if (typeof t == "string" || typeof t == "number")
    i += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var m = t.length;
      for (n = 0; n < m; n++)
        t[n] && (a = xt(t[n])) && (i && (i += " "), i += a);
    } else
      for (a in t)
        t[a] && (i && (i += " "), i += a);
  return i;
}
function De() {
  for (var t, n, a = 0, i = "", m = arguments.length; a < m; a++)
    (t = arguments[a]) && (n = xt(t)) && (i && (i += " "), i += n);
  return i;
}
function vr({
  size: t = 36,
  width: n = 2,
  color: a = "currentColor",
  className: i
}) {
  return /* @__PURE__ */ r.jsx(
    "svg",
    {
      style: {
        margin: `-${t / 2}px 0 0 -${t / 2}px`,
        width: `${t}px`,
        height: `${t}px`,
        animation: "rotate 2s linear infinite",
        zIndex: 2,
        position: "absolute",
        top: "50%",
        left: "50%"
      },
      viewBox: "0 0 50 50",
      className: i,
      children: /* @__PURE__ */ r.jsx(
        "circle",
        {
          cx: "25",
          cy: "25",
          r: "20",
          fill: "none",
          stroke: a,
          strokeWidth: n,
          style: {
            strokeDasharray: "8, 10",
            animation: "dash 8s ease-in-out infinite"
          }
        }
      )
    }
  );
}
const yr = "160px", xr = "40px", gr = "px-4 py-2.5", O = tr(
  ({
    blank: t = !1,
    self: n = !1,
    variant: a = "primary",
    minWidth: i = yr,
    minHeight: m = xr,
    paddingClass: d = gr,
    disabled: v = !1,
    loading: y = !1,
    type: u = "button",
    className: g,
    ...p
  }, f) => {
    const o = De(
      d,
      g,
      "relative inline-block rounded-lg text-sm font-bold border-b-[4px] border-t-[4px]",
      {
        "transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50": !y && !v,
        "bg-yellow text-dark border-b-yellow border-t-yellow": a === "primary",
        "bg-lightdark text-offwhite border-b-lightdark border-t-lightdark": a === "secondary",
        "opacity-60": v
      }
    ), c = { minWidth: i, minHeight: m }, h = /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      !!y && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        " ",
        /* @__PURE__ */ r.jsx(vr, { color: "#141721" })
      ] }),
      " ",
      !y && p.children
    ] });
    return (t || n) && typeof p.href == "string" ? /* @__PURE__ */ r.jsx(
      "a",
      {
        ref: f,
        href: p.href,
        target: t ? "_blank" : "_self",
        rel: "noreferrer",
        title: p.title,
        className: o,
        style: c,
        onClick: p.onClick,
        children: h
      }
    ) : /* @__PURE__ */ r.jsx(
      "button",
      {
        ref: f,
        type: u,
        disabled: y || v,
        className: o,
        style: c,
        ...p,
        children: h
      }
    );
  }
);
O.displayName = "Btn";
function br() {
  const { dispatch: t, defaultNetworkId: n, handleError: a } = W(), [i, m] = N(""), [d, v] = N(!1), [y, u] = N(!1);
  async function g(f) {
    if (f.preventDefault(), !i)
      return;
    const o = me();
    v(!0), a();
    try {
      if (await o?.userExists(i)) {
        const c = await o?.authenticate("passkey", { username: i });
        c && p({
          username: i,
          address: c.publicAddress,
          authStrategy: "passkey"
        });
      } else
        u(!0);
    } catch (c) {
      a(c);
    }
    v(!1);
  }
  async function p({
    username: f,
    address: o,
    authStrategy: c
  }) {
    const S = await me()?.getAccountBalance(o) || "0";
    t({
      type: "setState",
      payload: {
        address: o,
        username: f,
        balance: S,
        authStrategy: c,
        networkId: n || void 0
      }
    });
  }
  return y ? /* @__PURE__ */ r.jsx(
    wr,
    {
      loading: d,
      onConfirm: async () => {
        v(!0), a();
        try {
          const o = await me()?.register("passkey", { username: i });
          o && p({ username: i, address: o.publicAddress, authStrategy: "passkey" });
        } catch (f) {
          a(f);
        }
        v(!1);
      }
    }
  ) : /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h2", { className: "mb-6", children: "Sign in or Sign up" }),
    /* @__PURE__ */ r.jsxs("form", { onSubmit: (f) => g(f), children: [
      /* @__PURE__ */ r.jsx(
        "input",
        {
          placeholder: "your e-mail@email.com",
          value: i,
          className: "w-full mb-8",
          onChange: (f) => m(f.target.value)
        }
      ),
      /* @__PURE__ */ r.jsx(O, { type: "submit", loading: d, className: "w-full", children: "Continue" })
    ] })
  ] });
}
function wr({
  loading: t,
  onConfirm: n,
  onLoading: a
}) {
  const { handleError: i } = W(), [m, d] = N(""), [v, y] = N(!1), u = [
    X(null),
    X(null),
    X(null),
    X(null),
    X(null),
    X(null)
  ];
  U(() => {
    m.length === 6 && !/\s/.test(m) && g();
  }, [m]);
  async function g() {
    a?.(!0), i();
    try {
      console.log(m), await new Promise((c) => setTimeout(c, 1337)), y(!0), n?.(m);
    } catch (c) {
      i(c), a?.(!1);
    }
  }
  function p(c, h) {
    const S = c.target;
    if (/^[^\d]$/.test(S.value)) {
      S.value = "";
      return;
    }
    const k = u[h - 1], I = u[h + 1], E = u.map((H, F) => m[F] || " ");
    E[h] = S.value, d(E.join("")), S.select(), S.value === "" ? k?.current && k.current.focus() : I?.current && I.current.select();
  }
  function f(c, h) {
    const S = c.target, k = u[h - 1];
    (c.key === "Backspace" || c.key === "Delete") && S.value === "" && (c.preventDefault(), d((I) => I.slice(0, h) + " " + I.slice(h + 1)), k?.current && k.current.focus());
  }
  function o(c) {
    const h = c.clipboardData.getData("text");
    h.length === 6 && (d(h), u.forEach((S, k) => {
      S?.current && (S.current.value = h.charAt(k));
    }));
  }
  return v ? /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ r.jsx("h2", { className: "mb-12", children: "Email succesfully confirmed." }),
    /* @__PURE__ */ r.jsx("p", { className: "text-xl mb-12", children: "Passkey configuration will now start." }),
    /* @__PURE__ */ r.jsx(O, { loading: t, onClick: () => n?.(m), children: "Retry" })
  ] }) : /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ r.jsx("p", { children: "We just sent a confirmation code to your email. Paste the code below to proceed with account creation." }),
    /* @__PURE__ */ r.jsx("h2", { className: "my-6", children: "Check your email" }),
    /* @__PURE__ */ r.jsx("p", { className: "mb-6", children: "Enter the 6-digit code you received" }),
    /* @__PURE__ */ r.jsx("div", { className: "flex gap-2 mb-12 justify-center", children: [0, 1, 2, 3, 4, 5].map((c) => /* @__PURE__ */ r.jsx(
      "input",
      {
        ref: u[c],
        type: "text",
        maxLength: 1,
        autoFocus: c === 0,
        disabled: t,
        className: "min-w-0 w-14 h-14",
        onFocus: (h) => h.target.select(),
        onKeyDown: (h) => f(h, c),
        onPaste: (h) => o(h),
        onChange: (h) => p(h, c)
      },
      c
    )) }),
    /* @__PURE__ */ r.jsx(O, { disabled: t, children: "Send again" })
  ] });
}
function gt(t) {
  return !t || t.length <= 10 ? t : `${t.slice(0, 6)}...${t.slice(-4)}`;
}
function jr() {
  const { state: t, dispatch: n, networks: a, wallet: i, reloadUserBalance: m, setScreen: d } = W();
  if (!Array.isArray(a) || !a.length)
    return /* @__PURE__ */ r.jsx(r.Fragment, {});
  function v(y) {
    n({ type: "setValue", payload: { key: "networkId", value: y } }), i?.setDefaultNetworkId(y), m(), d("main");
  }
  return /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h2", { className: "mb-4", children: "Select network" }),
    /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-3", children: a.map((y) => /* @__PURE__ */ r.jsx(
      O,
      {
        variant: "secondary",
        disabled: y.id === t.networkId,
        onClick: () => v(y.id),
        children: y.name
      },
      y.id
    )) })
  ] });
}
const Tr = () => ({
  txs: {},
  pending: [],
  chainIdsForHash: {}
  // for pending hashes
});
function Er(t, n) {
  switch (n.type) {
    case "setState":
      return {
        ...t,
        ...n.payload
      };
    case "addTx":
      return {
        ...t,
        txs: {
          ...t.txs,
          [n.payload.owner]: {
            ...t.txs[n.payload.owner],
            [n.payload.hash]: n.payload
          }
        },
        // pending: [...new Set([...state.pending, action.payload.hash])],
        chainIdsForHash: {
          ...t.chainIdsForHash,
          [n.payload.hash]: n.payload.chainId
        }
      };
    case "setTxStatus":
      return {
        ...t,
        txs: {
          ...t.txs,
          [n.payload.tx.owner]: {
            ...t.txs[n.payload.tx.owner],
            [n.payload.tx.hash]: {
              ...t.txs[n.payload.tx.owner][n.payload.tx.hash],
              status: n.payload.status
            }
          }
        },
        pending: n.payload.status === "pending" ? [.../* @__PURE__ */ new Set([...t.pending, n.payload.tx.hash])] : t.pending.filter((a) => a !== n.payload.tx.hash),
        chainIdsForHash: n.payload.status === "pending" ? {
          ...t.chainIdsForHash,
          [n.payload.tx.hash]: n.payload.tx.chainId
        } : Object.keys(t.chainIdsForHash).reduce((a, i) => (i !== n.payload.tx.hash && (a[i] = n.payload.tx.chainId), a), {})
      };
    default:
      throw new Error("Unhandled action type." + JSON.stringify(n));
  }
}
const bt = Oe(void 0);
function kr({ children: t }) {
  const [n, a] = Ie(Er, Tr()), [i, m] = N(!1), {
    state: { address: d },
    reloadUserBalance: v
  } = W();
  U(() => {
    if (i) {
      const { pending: u, chainIdsForHash: g, ...p } = n;
      localStorage.setItem(re.TRANSACTIONS_CONTEXT, JSON.stringify(p));
    }
  }, [n]), U(() => {
    const u = localStorage.getItem(re.TRANSACTIONS_CONTEXT);
    if (u)
      try {
        const g = JSON.parse(u);
        a({ type: "setState", payload: g });
      } catch (g) {
        console.error("Cant parse context state localStorage", g);
      }
    setTimeout(() => {
      m(!0);
    }, 100);
  }, []), U(() => {
    if (d && n.txs[d] && Object.keys(n.txs[d]).length)
      for (const u of Object.keys(n.txs[d]))
        y(u);
  }, [d, n.txs]);
  async function y(u) {
    if (!d)
      return;
    const g = me();
    if (!g)
      throw new Error("Wallet not initialized." + u);
    const p = g.getRpcProviderForChainId(n.chainIdsForHash[u]);
    if (!p)
      throw new Error("Provider not initialized. " + u);
    const f = n.txs[d]?.[u];
    if (!f || f.status === "confirmed" || f.status === "failed" || n.pending.includes(u))
      return;
    if (Date.now() - f.createdAt > 15e3 && !await p.getTransaction(u)) {
      a({ type: "setTxStatus", payload: { tx: f, status: "failed" } });
      return;
    }
    const o = await p.getTransactionReceipt(u);
    o ? (o.status ? a({
      type: "setTxStatus",
      payload: {
        tx: f,
        status: "confirmed"
      }
    }) : a({
      type: "setTxStatus",
      payload: {
        tx: f,
        status: "failed"
      }
    }), v(), g.events.emit("txDone", f)) : (a({
      type: "setTxStatus",
      payload: {
        tx: f,
        status: "pending"
      }
    }), p.once(u, (c) => {
      const h = c && !isNaN(c.status) && c.status === 0;
      v(), a({
        type: "setTxStatus",
        payload: {
          tx: f,
          status: h ? "failed" : "confirmed"
        }
      }), g.events.emit("txDone", f);
    }));
  }
  return /* @__PURE__ */ r.jsx(bt.Provider, { value: { state: n, dispatch: a, checkTransaction: y }, children: t });
}
function wt() {
  const t = Pe(bt);
  if (t === void 0)
    throw new Error(
      "useTransactionsContext usage must be wrapped with TransactionsContext provider."
    );
  return t;
}
function We(t = "Copy", n = "Copied!") {
  const [a, i] = N(t);
  let m = null;
  function d(v) {
    navigator.clipboard.writeText(v), m && clearTimeout(m), i(n), m = setTimeout(() => i(t), 2e3);
  }
  return {
    text: a,
    onCopy: d
  };
}
function Sr() {
  const {
    state: { address: t }
  } = W(), { state: n } = wt();
  return !t || !n.txs[t] ? /* @__PURE__ */ r.jsx(r.Fragment, {}) : /* @__PURE__ */ r.jsx("div", { children: /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-1 max-h-[134px] overflow-auto pr-2", children: Object.values(n.txs[t]).sort((a, i) => (i.createdAt || 0) - (a.createdAt || 0)).map((a) => /* @__PURE__ */ r.jsx(Cr, { tx: a }, a.hash)) }) });
}
function Cr({ tx: t }) {
  const { text: n, onCopy: a } = We();
  return /* @__PURE__ */ r.jsxs("div", { className: "rounded-md bg-offwhite/5 px-2 py-1", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ r.jsx("span", { className: "font-bold text-sm", children: /* @__PURE__ */ r.jsxs("a", { href: t.explorerUrl || "#", target: "_blank", title: "View on explorer", children: [
        t.label,
        "  ↗"
      ] }) }),
      /* @__PURE__ */ r.jsx(
        "span",
        {
          className: De("text-sm", {
            "text-[#FF6188]": t.status === "failed",
            "text-[#A9DC76]": t.status === "confirmed",
            "text-[#F7AF39]": t.status === "pending"
          }),
          children: t.status
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ r.jsxs("span", { className: "text-sm", children: [
        gt(t.hash),
        " ",
        /* @__PURE__ */ r.jsx("button", { className: "text-xs", onClick: () => a(t.hash), children: n })
      ] }),
      /* @__PURE__ */ r.jsx("span", { className: "text-xs", children: new Date(t.createdAt).toISOString().slice(0, -5).replace("T", " ") })
    ] })
  ] });
}
const Rr = () => ({
  list: {},
  selectedToken: ""
  // address
});
function Nr(t, n) {
  switch (n.type) {
    case "setState":
      return {
        ...t,
        ...n.payload
      };
    case "setValue":
      return {
        ...t,
        [n.payload.key]: n.payload.value
      };
    case "updateToken": {
      const a = [...t.list[n.payload.owner] || []], i = a.findIndex((m) => m.address === n.payload.token.address);
      return i < 0 ? a.push(n.payload.token) : a[i] = n.payload.token, {
        ...t,
        list: {
          ...t.list,
          [n.payload.owner]: a
        }
      };
    }
    default:
      throw new Error("Unhandled action type." + JSON.stringify(n));
  }
}
const jt = Oe(void 0);
function _r({ children: t }) {
  const [n, a] = Ie(Nr, Rr()), [i, m] = N(!1), { state: d, wallet: v } = W();
  U(() => {
    i && localStorage.setItem(re.TOKENS_CONTEXT, JSON.stringify(n));
  }, [n]), U(() => {
    const u = localStorage.getItem(re.TOKENS_CONTEXT);
    if (u)
      try {
        const g = JSON.parse(u);
        a({ type: "setState", payload: g }), Array.isArray(g?.list?.[d.address]) && g.list[d.address].forEach(async (p) => {
          if (v) {
            const f = await v.contractRead({
              contractAddress: p.address,
              contractAbi: ee,
              contractFunctionName: "balanceOf",
              contractFunctionValues: [d.address]
            });
            f && a({
              type: "updateToken",
              payload: {
                owner: d.address,
                token: {
                  ...p,
                  balance: Ce.formatUnits(f, p.decimals)
                }
              }
            });
          }
        });
      } catch (g) {
        console.error("Cant parse context state localStorage", g);
      }
    setTimeout(() => {
      m(!0);
    }, 100);
  }, []);
  async function y(u) {
    if (v) {
      const [g, p, f, o] = await Promise.all([
        v.contractRead({
          contractAddress: u,
          contractAbi: ee,
          contractFunctionName: "name"
        }),
        v.contractRead({
          contractAddress: u,
          contractAbi: ee,
          contractFunctionName: "symbol"
        }),
        v.contractRead({
          contractAddress: u,
          contractAbi: ee,
          contractFunctionName: "decimals"
        }),
        v.contractRead({
          contractAddress: u,
          contractAbi: ee,
          contractFunctionName: "balanceOf",
          contractFunctionValues: [d.address]
        })
      ]);
      if (p)
        return {
          address: u,
          name: g,
          symbol: p,
          decimals: Number(f),
          balance: Ce.formatUnits(o, f)
        };
    }
  }
  return /* @__PURE__ */ r.jsx(
    jt.Provider,
    {
      value: {
        state: n,
        dispatch: a,
        getTokenDetails: y
      },
      children: t
    }
  );
}
function Tt() {
  const t = Pe(jt);
  if (t === void 0)
    throw new Error("useTokensContext usage must be wrapped with TokensContext provider.");
  return t;
}
function Ar() {
  const { state: t, networksById: n, setScreen: a, wallet: i, handleError: m } = W(), { state: d } = Tt(), [v, y] = N(""), [u, g] = N(""), [p, f] = N(!1), o = ye(
    () => ({
      address: "",
      name: `${n[t.networkId].name} ETH`,
      symbol: "ETH",
      decimals: 18,
      balance: t.balance
    }),
    [t.balance, t.networkId]
  ), c = ye(() => {
    if (d.selectedToken) {
      const h = d.list[t.address];
      if (h) {
        const S = h.find((k) => k.address === d.selectedToken);
        if (S)
          return S;
      }
    }
    return o;
  }, [d.selectedToken, d.list]);
  return t.walletScreen === "selectToken" ? /* @__PURE__ */ r.jsx(Or, { nativeToken: o }) : t.walletScreen === "receiveToken" ? /* @__PURE__ */ r.jsx(Ir, {}) : /* @__PURE__ */ r.jsxs(
    "form",
    {
      onSubmit: async (h) => {
        if (h.preventDefault(), !p) {
          if (!v || !u) {
            console.error("Address and amount are required");
            return;
          }
          if (!i) {
            console.error("Wallet not initialized");
            return;
          }
          f(!0), m();
          try {
            await i.signContractWrite({
              mustConfirm: !0,
              contractAbi: ee,
              contractAddress: c.address,
              contractFunctionName: "transfer",
              contractFunctionValues: [
                v,
                Ce.parseUnits(u, c.decimals)
              ]
            });
          } catch (S) {
            m(S);
          }
          f(!1);
        }
      },
      children: [
        /* @__PURE__ */ r.jsx("h2", { className: "mb-8", children: "Send tokens to address" }),
        /* @__PURE__ */ r.jsxs(
          O,
          {
            variant: "secondary",
            className: "mb-4 w-full text-left",
            onClick: () => a("selectToken"),
            children: [
              "Token: ",
              c.name,
              /* @__PURE__ */ r.jsx("br", {}),
              /* @__PURE__ */ r.jsxs("span", { className: "font-normal", children: [
                "Balance: ",
                c.balance,
                " ",
                c.symbol
              ] })
            ]
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            placeholder: "Receiver address",
            value: v,
            className: "w-full mb-4",
            onChange: (h) => y(h.target.value)
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            placeholder: "Amount",
            value: u,
            className: "w-full mb-8",
            onChange: (h) => g(h.target.value)
          }
        ),
        /* @__PURE__ */ r.jsx(O, { type: "submit", className: "w-full", children: "Send" })
      ]
    }
  );
}
function Or({ nativeToken: t }) {
  const { state: n, setScreen: a, handleError: i } = W(), { state: m, dispatch: d, getTokenDetails: v } = Tt(), [y, u] = N(""), [g, p] = N(!1), f = ye(() => Array.isArray(m.list[n.address]) ? [t, ...m.list[n.address]] : [t], [m.list]);
  return /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("h2", { className: "mb-4", children: "Add token" }),
    /* @__PURE__ */ r.jsxs(
      "form",
      {
        className: "mb-8",
        onSubmit: async (o) => {
          if (o.preventDefault(), !g) {
            if (!y) {
              console.error("No address");
              return;
            }
            p(!0), i();
            try {
              const c = await v(y);
              if (!c)
                throw new Error("Could not get token details");
              d({ type: "updateToken", payload: { owner: n.address, token: c } });
            } catch (c) {
              i(c);
            }
            p(!1);
          }
        },
        children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              placeholder: "Token address",
              value: y,
              className: "w-full mb-4",
              onChange: (o) => u(o.target.value)
            }
          ),
          /* @__PURE__ */ r.jsx(O, { type: "submit", loading: g, className: "w-full", children: "Add" })
        ]
      }
    ),
    /* @__PURE__ */ r.jsx("h2", { className: "mb-4", children: "Select token" }),
    /* @__PURE__ */ r.jsx("div", { className: "flex flex-col gap-3", children: f.map((o) => /* @__PURE__ */ r.jsxs(
      O,
      {
        variant: "secondary",
        disabled: o.address === m.selectedToken,
        className: "w-full text-left",
        onClick: () => {
          d({
            type: "setValue",
            payload: { key: "selectedToken", value: o.address }
          }), a("sendToken");
        },
        children: [
          "Token: ",
          o.name,
          /* @__PURE__ */ r.jsx("br", {}),
          /* @__PURE__ */ r.jsxs("span", { className: "font-normal", children: [
            "Balance: ",
            o.balance,
            " ",
            o.symbol
          ] })
        ]
      },
      o.address
    )) })
  ] });
}
function Ir() {
  const { state: t } = W(), { text: n, onCopy: a } = We();
  return t.address ? /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("div", { className: "p-4 mb-4", children: /* @__PURE__ */ r.jsx(
      ir,
      {
        value: `ethereum:${t.address}`,
        size: 256,
        style: { height: "auto", maxWidth: "100%", width: "256px", margin: "0 auto" },
        viewBox: "0 0 256 256"
      }
    ) }),
    /* @__PURE__ */ r.jsx("input", { readOnly: !0, value: t.address, className: "w-full mb-4" }),
    /* @__PURE__ */ r.jsx(O, { className: "w-full", onClick: () => a(t.address), children: n })
  ] }) : /* @__PURE__ */ r.jsx(r.Fragment, {});
}
function Et({
  text: t,
  show: n,
  className: a
}) {
  const { state: i, handleError: m } = W();
  return !i.displayedError && !t || !n ? /* @__PURE__ */ r.jsx(r.Fragment, {}) : /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: De(
        "flex gap-2 justify-between items-start py-2 pl-3 pr-2 break-all text-sm text-white bg-red/75 rounded-md",
        a
      ),
      children: [
        i.displayedError || t || "",
        /* @__PURE__ */ r.jsx(
          "button",
          {
            title: "Dismiss",
            className: "text-offwhite hover:text-white -mt-0.5 shrink-0",
            onClick: () => m(),
            children: /* @__PURE__ */ r.jsx(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ r.jsx(
                  "path",
                  {
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                    d: "M12 10.6569L6.34317 5L4.92896 6.41421L10.5858 12.0711L4.92898 17.7279L6.3432 19.1421L12 13.4853L17.6569 19.1421L19.0711 17.7279L13.4143 12.0711L19.0711 6.41421L17.6569 5L12 10.6569Z",
                    fill: "currentColor"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}
function Pr() {
  const { state: t, dispatch: n, networksById: a, setScreen: i } = W(), m = ye(() => t.walletScreen === "main" ? { key: "networks", label: "Change" } : t.walletScreen === "selectToken" ? { key: "sendToken", label: "Back" } : { key: "main", label: "Back" }, [t.walletScreen]);
  return /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx("div", { className: "text-center -mt-4 sm:-mt-8 mb-4", children: /* @__PURE__ */ r.jsxs("div", { className: "inline-block", children: [
      /* @__PURE__ */ r.jsx("p", { children: t.networkId && a[t.networkId] ? a[t.networkId].name : "No network" }),
      /* @__PURE__ */ r.jsx("p", { children: /* @__PURE__ */ r.jsx("button", { className: "text-sm", onClick: () => i(m.key), children: m.label }) })
    ] }) }),
    /* @__PURE__ */ r.jsx(Et, { show: !0, className: "mb-2" }),
    t.walletScreen === "main" && /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx(Fr, { className: "mb-6" }),
      /* @__PURE__ */ r.jsxs("div", { className: "flex gap-4 mb-6", children: [
        /* @__PURE__ */ r.jsx(O, { minWidth: "0", className: "w-full", onClick: () => i("sendToken"), children: "Send" }),
        /* @__PURE__ */ r.jsx(O, { minWidth: "0", className: "w-full", onClick: () => i("receiveToken"), children: "Receive" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ r.jsx("h3", { className: "mb-2", children: "Transactions" }),
        /* @__PURE__ */ r.jsx(Sr, {})
      ] }),
      /* @__PURE__ */ r.jsx(O, { variant: "secondary", className: "w-full", onClick: () => n({ type: "reset" }), children: "Disconnect wallet" })
    ] }),
    t.walletScreen === "networks" && /* @__PURE__ */ r.jsx("div", { children: /* @__PURE__ */ r.jsx(jr, {}) }),
    ["sendToken", "selectToken", "receiveToken"].includes(t.walletScreen) && /* @__PURE__ */ r.jsx("div", { children: /* @__PURE__ */ r.jsx(_r, { children: /* @__PURE__ */ r.jsx(Ar, {}) }) })
  ] });
}
function Fr({ className: t }) {
  const { state: n } = W(), { text: a, onCopy: i } = We();
  return /* @__PURE__ */ r.jsxs("div", { className: t, children: [
    /* @__PURE__ */ r.jsxs("h2", { className: "break-all mb-1", children: [
      "Hi, ",
      n.username
    ] }),
    /* @__PURE__ */ r.jsxs("p", { title: n.address, className: "text-xl", children: [
      /* @__PURE__ */ r.jsx("span", { className: "mr-2", children: gt(n.address) }),
      /* @__PURE__ */ r.jsx("button", { className: "text-sm", onClick: () => i(n.address), children: a })
    ] }),
    /* @__PURE__ */ r.jsxs("p", { children: [
      n.balance,
      " ETH"
    ] })
  ] });
}
function Dr({
  tx: t,
  signMessage: n,
  contractFunctionData: a,
  approveText: i = "Approve",
  declineText: m = "Reject",
  onApprove: d,
  onDecline: v
}) {
  const { networksById: y } = W(), [u, g] = N(!1), p = "bg-offwhite/25 p-3 whitespace-pre-wrap break-all rounded-sm";
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    !!n && /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("h2", { className: "mb-6", children: "Sign Message" }),
      /* @__PURE__ */ r.jsxs("p", { children: [
        "You are signing:",
        /* @__PURE__ */ r.jsx("br", {}),
        n
      ] })
    ] }),
    !!t && /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("h2", { className: "mb-6", children: "Approve Transaction" }),
      /* @__PURE__ */ r.jsx("pre", { className: p, children: JSON.stringify(
        t,
        (f, o) => typeof o == "bigint" ? o.toString() : o,
        2
      ) })
    ] }),
    !!a && /* @__PURE__ */ r.jsxs("div", { children: [
      /* @__PURE__ */ r.jsx("h2", { className: "mb-6", children: "Approve Contract Transaction" }),
      !!a.chainId && !!y[a.chainId] && /* @__PURE__ */ r.jsxs("p", { children: [
        "Chain: ",
        y[a.chainId].name
      ] }),
      /* @__PURE__ */ r.jsxs("p", { className: "my-3 break-all", children: [
        "Contract address: ",
        a.contractAddress
      ] }),
      /* @__PURE__ */ r.jsxs("p", { className: "my-3 break-all", children: [
        "Contract function: ",
        a.contractFunctionName
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "my-3", children: /* @__PURE__ */ r.jsx("pre", { className: p, children: JSON.stringify(
        a.contractFunctionValues,
        (f, o) => typeof o == "bigint" ? o.toString() : o,
        2
      ) }) })
    ] }),
    /* @__PURE__ */ r.jsx(Et, { show: !0, className: "mt-6 -mb-6" }),
    /* @__PURE__ */ r.jsxs("div", { className: "mt-12 flex gap-4", children: [
      /* @__PURE__ */ r.jsx(
        O,
        {
          loading: u,
          className: "w-full",
          onClick: async () => {
            g(!0), await d(), g(!1);
          },
          children: i
        }
      ),
      /* @__PURE__ */ r.jsx(O, { variant: "secondary", disabled: u, className: "w-full", onClick: v, children: m })
    ] })
  ] });
}
function Wr({ disableAutoBroadcastAfterSign: t = !1 }) {
  const { state: n, wallet: a, setScreen: i, handleError: m } = W(), { dispatch: d } = wt(), [v, y] = N(!1), [u, g] = N(), [p, f] = N(), [o, c] = N(""), [h, S] = N({
    title: "",
    txHash: "",
    explorerUrl: ""
  }), k = X(), I = n.username && n.address;
  U(() => {
    const F = (C) => {
      C.plain ? (g(C.plain?.tx), k.current = C, y(!0)) : C.contractWrite && (f({
        chainId: C.contractWrite.chainId,
        contractAddress: C.contractWrite.contractAddress,
        contractFunctionName: C.contractWrite.contractFunctionName,
        contractFunctionValues: C.contractWrite.contractFunctionValues
      }), k.current = C, y(!0));
    }, J = (C) => {
      c(C.message), k.current = { signature: C }, y(!0);
    }, z = (C) => {
      d({ type: "addTx", payload: C });
    };
    return a && (a.events.on("txApprove", F), a.events.on("signatureRequest", J), a.events.on("txSubmitted", z)), () => {
      a && (a.events.off("txApprove", F), a.events.off("signatureRequest", J), a.events.off("txSubmitted", z));
    };
  }, [a]), U(() => {
    v || ((u || o || p) && E(), n.walletScreen !== "main" && i("main"));
  }, [v]);
  function E() {
    y(!1), g(void 0), f(void 0), c(""), S({
      title: "",
      txHash: "",
      explorerUrl: ""
    });
  }
  let H = /* @__PURE__ */ r.jsx(r.Fragment, {});
  return I ? u || o || p ? h.title ? H = /* @__PURE__ */ r.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ r.jsx("h2", { className: "mb-6", children: h.title }),
    !!h.explorerUrl && /* @__PURE__ */ r.jsx("p", { className: "mb-6", children: /* @__PURE__ */ r.jsx(O, { variant: "secondary", href: h.explorerUrl, blank: !0, children: "View on explorer" }) }),
    !!h.txHash && /* @__PURE__ */ r.jsxs("p", { className: "break-all my-3", children: [
      "Transaction hash: ",
      h.txHash
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "mt-12", children: /* @__PURE__ */ r.jsx(O, { onClick: () => E(), children: "Close" }) })
  ] }) : H = /* @__PURE__ */ r.jsx(
    Dr,
    {
      tx: u,
      signMessage: o,
      contractFunctionData: p,
      onApprove: async () => {
        if (k.current)
          try {
            if (m(), k.current.signature)
              await a?.signMessage({
                ...k.current.signature,
                authData: { username: n.username }
              }), E();
            else if (k.current.plain) {
              const F = await a?.signPlainTransaction({
                ...k.current.plain,
                authData: { username: n.username }
              });
              if (t)
                E();
              else if (F) {
                const { signedTxData: J, chainId: z } = F, C = await a?.broadcastTransaction(
                  J,
                  z,
                  k.current.plain.label || ""
                );
                S({
                  title: "Transaction submitted",
                  explorerUrl: C?.txItem.explorerUrl || "",
                  txHash: C?.txHash || ""
                });
              }
            } else if (k.current.contractWrite) {
              const F = await a?.signContractWrite({
                ...k.current.contractWrite,
                authData: { username: n.username }
              });
              if (t)
                E();
              else if (F) {
                const { signedTxData: J, chainId: z } = F, C = await a?.broadcastTransaction(
                  J,
                  z,
                  k.current.contractWrite.label || ""
                );
                S({
                  title: "Transaction submitted",
                  explorerUrl: C?.txItem.explorerUrl || "",
                  txHash: C?.txHash || ""
                });
              }
            }
          } catch (F) {
            m(F);
          }
      },
      onDecline: () => E()
    }
  ) : H = /* @__PURE__ */ r.jsx(Pr, {}) : H = /* @__PURE__ */ r.jsx(br, {}), /* @__PURE__ */ r.jsxs("div", { children: [
    /* @__PURE__ */ r.jsx(Lr, { isOpen: v, setIsOpen: y, children: H }),
    /* @__PURE__ */ r.jsx(O, { id: "oaw-wallet-widget-btn", onClick: () => y(!0), children: I ? "Open wallet" : "Sign in now" })
  ] });
}
function Lr({
  children: t,
  isOpen: n,
  setIsOpen: a
}) {
  return /* @__PURE__ */ r.jsx(r.Fragment, { children: /* @__PURE__ */ r.jsx(nr, { show: n, children: /* @__PURE__ */ r.jsxs(
    ar,
    {
      id: "oaw-wallet-widget",
      open: n,
      className: "relative z-50",
      onClose: () => a(!1),
      children: [
        /* @__PURE__ */ r.jsx(
          lt,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 bg-black/50", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ r.jsx(
          lt,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 scale-95",
            enterTo: "opacity-100 scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 scale-100",
            leaveTo: "opacity-0 scale-95",
            children: /* @__PURE__ */ r.jsx("div", { className: "fixed inset-0 w-screen overflow-y-auto p-4", children: /* @__PURE__ */ r.jsx("div", { className: "flex items-center justify-center min-h-full", children: /* @__PURE__ */ r.jsxs(sr, { className: "relative max-w-lg w-full min-h-[600px] bg-dark p-8 sm:py-16 sm:px-12 border border-brightdark text-offwhite", children: [
              /* @__PURE__ */ r.jsx("button", { className: "absolute top-2 right-2", onClick: () => a(!1), children: /* @__PURE__ */ r.jsx(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ r.jsx(
                    "path",
                    {
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      d: "M12 10.6569L6.34317 5L4.92896 6.41421L10.5858 12.0711L4.92898 17.7279L6.3432 19.1421L12 13.4853L17.6569 19.1421L19.0711 17.7279L13.4143 12.0711L19.0711 6.41421L17.6569 5L12 10.6569Z",
                      fill: "#9C9C95"
                    }
                  )
                }
              ) }),
              t
            ] }) }) })
          }
        )
      ]
    }
  ) }) });
}
function Ur(t) {
  return /* @__PURE__ */ r.jsx(mr, { ...t, children: /* @__PURE__ */ r.jsx(kr, { children: /* @__PURE__ */ r.jsx(Wr, { ...t }) }) });
}
function Jr(t, n) {
  if (typeof document > "u") {
    console.error("Cannot initialize oasis wallet app UI");
    return;
  }
  let a = null;
  t && (a = document.querySelector(t)), a || (a = document.createElement("div"), a.id = "oasis-app-wallet"), document.body.appendChild(a), ce.createRoot(a).render(
    /* @__PURE__ */ r.jsx(Ae.StrictMode, { children: /* @__PURE__ */ r.jsx(Ur, { ...n }) })
  );
}
export {
  Jr as initializeApp
};
