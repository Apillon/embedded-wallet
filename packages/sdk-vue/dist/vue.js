import './style.css';
import { defineComponent as b0, onMounted as jf, openBlock as A0, createElementBlock as E0, shallowRef as v0, computed as x0, reactive as I0, watch as N0, readonly as B0 } from "vue";
import { jsxs as J, Fragment as on, jsx as L } from "react/jsx-runtime";
import O0, { createContext as Jl, forwardRef as k0, useReducer as Zl, useState as Rt, useEffect as Ge, useRef as dr, useContext as Yl, useMemo as Ta } from "react";
import S0 from "react-dom";
import { Transition as T0, Dialog as R0, TransitionChild as Ku, DialogPanel as C0 } from "@headlessui/react";
import * as P0 from "@oasisprotocol/sapphire-paratime";
import { pbkdf2Sync as U0 } from "pbkdf2";
import { CBOR as Wf } from "cbor-redux";
import * as qr from "asn1js";
import L0 from "mitt";
import { ProviderRpcError as zf } from "viem";
import { parseAbi as Qf } from "abitype";
import { ethers as Ra } from "ethers";
import D0 from "react-qr-code";
var F0 = Object.defineProperty, qf = (n) => {
  throw TypeError(n);
}, M0 = (n, t, e) => t in n ? F0(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, S = (n, t, e) => M0(n, typeof t != "symbol" ? t + "" : t, e), Xl = (n, t, e) => t.has(n) || qf("Cannot " + e), f = (n, t, e) => (Xl(n, t, "read from private field"), e ? e.call(n) : t.get(n)), C = (n, t, e) => t.has(n) ? qf("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(n) : t.set(n, e), A = (n, t, e, r) => (Xl(n, t, "write to private field"), t.set(n, e), e), F = (n, t, e) => (Xl(n, t, "access private method"), e), Ca = (n, t, e, r) => ({
  set _(s) {
    A(n, t, s);
  },
  get _() {
    return f(n, t, r);
  }
});
function H0(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Kf = { exports: {} }, Ct = Kf.exports = {}, Ye, Xe;
function Jc() {
  throw new Error("setTimeout has not been defined");
}
function Zc() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Ye = setTimeout : Ye = Jc;
  } catch {
    Ye = Jc;
  }
  try {
    typeof clearTimeout == "function" ? Xe = clearTimeout : Xe = Zc;
  } catch {
    Xe = Zc;
  }
})();
function Jf(n) {
  if (Ye === setTimeout)
    return setTimeout(n, 0);
  if ((Ye === Jc || !Ye) && setTimeout)
    return Ye = setTimeout, setTimeout(n, 0);
  try {
    return Ye(n, 0);
  } catch {
    try {
      return Ye.call(null, n, 0);
    } catch {
      return Ye.call(this, n, 0);
    }
  }
}
function _0(n) {
  if (Xe === clearTimeout)
    return clearTimeout(n);
  if ((Xe === Zc || !Xe) && clearTimeout)
    return Xe = clearTimeout, clearTimeout(n);
  try {
    return Xe(n);
  } catch {
    try {
      return Xe.call(null, n);
    } catch {
      return Xe.call(this, n);
    }
  }
}
var Bn = [], zs = !1, Mr, sa = -1;
function G0() {
  !zs || !Mr || (zs = !1, Mr.length ? Bn = Mr.concat(Bn) : sa = -1, Bn.length && Zf());
}
function Zf() {
  if (!zs) {
    var n = Jf(G0);
    zs = !0;
    for (var t = Bn.length; t; ) {
      for (Mr = Bn, Bn = []; ++sa < t; )
        Mr && Mr[sa].run();
      sa = -1, t = Bn.length;
    }
    Mr = null, zs = !1, _0(n);
  }
}
Ct.nextTick = function(n) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var e = 1; e < arguments.length; e++)
      t[e - 1] = arguments[e];
  Bn.push(new Yf(n, t)), Bn.length === 1 && !zs && Jf(Zf);
};
function Yf(n, t) {
  this.fun = n, this.array = t;
}
Yf.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Ct.title = "browser";
Ct.browser = !0;
Ct.env = {};
Ct.argv = [];
Ct.version = "";
Ct.versions = {};
function Tn() {
}
Ct.on = Tn;
Ct.addListener = Tn;
Ct.once = Tn;
Ct.off = Tn;
Ct.removeListener = Tn;
Ct.removeAllListeners = Tn;
Ct.emit = Tn;
Ct.prependListener = Tn;
Ct.prependOnceListener = Tn;
Ct.listeners = function(n) {
  return [];
};
Ct.binding = function(n) {
  throw new Error("process.binding is not supported");
};
Ct.cwd = function() {
  return "/";
};
Ct.chdir = function(n) {
  throw new Error("process.chdir is not supported");
};
Ct.umask = function() {
  return 0;
};
var V0 = Kf.exports;
const $0 = /* @__PURE__ */ H0(V0);
var Ii = {}, Ai = S0;
if ($0.env.NODE_ENV === "production")
  Ii.createRoot = Ai.createRoot, Ii.hydrateRoot = Ai.hydrateRoot;
else {
  var Ko = Ai.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Ii.createRoot = function(n, t) {
    Ko.usingClientEntryPoint = !0;
    try {
      return Ai.createRoot(n, t);
    } finally {
      Ko.usingClientEntryPoint = !1;
    }
  }, Ii.hydrateRoot = function(n, t, e) {
    Ko.usingClientEntryPoint = !0;
    try {
      return Ai.hydrateRoot(n, t, e);
    } finally {
      Ko.usingClientEntryPoint = !1;
    }
  };
}
const j0 = "6.13.1";
function W0(n, t, e) {
  const r = t.split("|").map((i) => i.trim());
  for (let i = 0; i < r.length; i++)
    switch (t) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof n === t)
          return;
    }
  const s = new Error(`invalid value for type ${t}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${e}`, s.value = n, s;
}
async function Zt(n) {
  const t = Object.keys(n);
  return (await Promise.all(t.map((e) => Promise.resolve(n[e])))).reduce((e, r, s) => (e[t[s]] = r, e), {});
}
function q(n, t, e) {
  for (let r in t) {
    let s = t[r];
    const i = e ? e[r] : null;
    i && W0(s, i, r), Object.defineProperty(n, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function Fs(n) {
  if (n == null)
    return "null";
  if (Array.isArray(n))
    return "[ " + n.map(Fs).join(", ") + " ]";
  if (n instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let r = 0; r < n.length; r++)
      e += t[n[r] >> 4], e += t[n[r] & 15];
    return e;
  }
  if (typeof n == "object" && typeof n.toJSON == "function")
    return Fs(n.toJSON());
  switch (typeof n) {
    case "boolean":
    case "symbol":
      return n.toString();
    case "bigint":
      return BigInt(n).toString();
    case "number":
      return n.toString();
    case "string":
      return JSON.stringify(n);
    case "object": {
      const t = Object.keys(n);
      return t.sort(), "{ " + t.map((e) => `${Fs(e)}: ${Fs(n[e])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function zt(n, t) {
  return n && n.code === t;
}
function tu(n) {
  return zt(n, "CALL_EXCEPTION");
}
function vt(n, t, e) {
  let r = n;
  {
    const i = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${Fs(e)}`);
      for (const o in e) {
        if (o === "shortMessage")
          continue;
        const c = e[o];
        i.push(o + "=" + Fs(c));
      }
    }
    i.push(`code=${t}`), i.push(`version=${j0}`), i.length && (n += " (" + i.join(", ") + ")");
  }
  let s;
  switch (t) {
    case "INVALID_ARGUMENT":
      s = new TypeError(n);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(n);
      break;
    default:
      s = new Error(n);
  }
  return q(s, { code: t }), e && Object.assign(s, e), s.shortMessage == null && q(s, { shortMessage: r }), s;
}
function D(n, t, e, r) {
  if (!n)
    throw vt(t, e, r);
}
function B(n, t, e, r) {
  D(n, t, "INVALID_ARGUMENT", { argument: e, value: r });
}
function Xf(n, t, e) {
  e == null && (e = ""), e && (e = ": " + e), D(n >= t, "missing arguemnt" + e, "MISSING_ARGUMENT", {
    count: n,
    expectedCount: t
  }), D(n <= t, "too many arguments" + e, "UNEXPECTED_ARGUMENT", {
    count: n,
    expectedCount: t
  });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((n, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD" && "é".normalize("NFD") !== "é")
      throw new Error("broken");
    n.push(t);
  } catch {
  }
  return n;
}, []);
function Do(n, t, e) {
  if (e == null && (e = ""), n !== t) {
    let r = e, s = "new";
    e && (r += ".", s += " " + e), D(!1, `private constructor; use ${r}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: s
    });
  }
}
function td(n, t, e) {
  if (n instanceof Uint8Array)
    return e ? new Uint8Array(n) : n;
  if (typeof n == "string" && n.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((n.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(n.substring(s, s + 2), 16), s += 2;
    return r;
  }
  B(!1, "invalid BytesLike value", t || "value", n);
}
function et(n, t) {
  return td(n, t, !1);
}
function Yt(n, t) {
  return td(n, t, !0);
}
function gt(n, t) {
  return !(typeof n != "string" || !n.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && n.length !== 2 + 2 * t || t === !0 && n.length % 2 !== 0);
}
function eu(n) {
  return gt(n, !0) || n instanceof Uint8Array;
}
const Ju = "0123456789abcdef";
function W(n) {
  const t = et(n);
  let e = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    e += Ju[(s & 240) >> 4] + Ju[s & 15];
  }
  return e;
}
function Et(n) {
  return "0x" + n.map((t) => W(t).substring(2)).join("");
}
function Kr(n) {
  return gt(n, !0) ? (n.length - 2) / 2 : et(n).length;
}
function xt(n, t, e) {
  const r = et(n);
  return e != null && e > r.length && D(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: e
  }), W(r.slice(t ?? 0, e ?? r.length));
}
function ed(n, t, e) {
  const r = et(n);
  D(t >= r.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(r),
    length: t,
    offset: t + 1
  });
  const s = new Uint8Array(t);
  return s.fill(0), e ? s.set(r, t - r.length) : s.set(r, 0), W(s);
}
function sn(n, t) {
  return ed(n, t, !0);
}
function nu(n, t) {
  return ed(n, t, !1);
}
const Qa = BigInt(0), He = BigInt(1), Ms = 9007199254740991;
function Pa(n, t) {
  const e = qa(n, "value"), r = BigInt(nt(t, "width"));
  if (D(e >> r === Qa, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: n
  }), e >> r - He) {
    const s = (He << r) - He;
    return -((~e & s) + He);
  }
  return e;
}
function ru(n, t) {
  let e = z(n, "value");
  const r = BigInt(nt(t, "width")), s = He << r - He;
  if (e < Qa) {
    e = -e, D(e <= s, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: n
    });
    const i = (He << r) - He;
    return (~e & i) + He;
  } else
    D(e < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: n
    });
  return e;
}
function Hr(n, t) {
  const e = qa(n, "value"), r = BigInt(nt(t, "bits"));
  return e & (He << r) - He;
}
function z(n, t) {
  switch (typeof n) {
    case "bigint":
      return n;
    case "number":
      return B(Number.isInteger(n), "underflow", t || "value", n), B(n >= -Ms && n <= Ms, "overflow", t || "value", n), BigInt(n);
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return n[0] === "-" && n[1] !== "-" ? -BigInt(n.substring(1)) : BigInt(n);
      } catch (e) {
        B(!1, `invalid BigNumberish string: ${e.message}`, t || "value", n);
      }
  }
  B(!1, "invalid BigNumberish value", t || "value", n);
}
function qa(n, t) {
  const e = z(n, t);
  return D(e >= Qa, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: n
  }), e;
}
const Zu = "0123456789abcdef";
function ti(n) {
  if (n instanceof Uint8Array) {
    let t = "0x0";
    for (const e of n)
      t += Zu[e >> 4], t += Zu[e & 15];
    return BigInt(t);
  }
  return z(n);
}
function nt(n, t) {
  switch (typeof n) {
    case "bigint":
      return B(n >= -Ms && n <= Ms, "overflow", t || "value", n), Number(n);
    case "number":
      return B(Number.isInteger(n), "underflow", t || "value", n), B(n >= -Ms && n <= Ms, "overflow", t || "value", n), n;
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return nt(BigInt(n), t);
      } catch (e) {
        B(!1, `invalid numeric string: ${e.message}`, t || "value", n);
      }
  }
  B(!1, "invalid numeric value", t || "value", n);
}
function z0(n) {
  return nt(ti(n));
}
function lr(n, t) {
  let e = qa(n, "value").toString(16);
  if (t == null)
    e.length % 2 && (e = "0" + e);
  else {
    const r = nt(t, "width");
    for (D(r * 2 >= e.length, `value exceeds width (${r} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: n
    }); e.length < r * 2; )
      e = "0" + e;
  }
  return "0x" + e;
}
function Lt(n) {
  const t = qa(n, "value");
  if (t === Qa)
    return new Uint8Array([]);
  let e = t.toString(16);
  e.length % 2 && (e = "0" + e);
  const r = new Uint8Array(e.length / 2);
  for (let s = 0; s < r.length; s++) {
    const i = s * 2;
    r[s] = parseInt(e.substring(i, i + 2), 16);
  }
  return r;
}
function Hs(n) {
  let t = W(eu(n) ? n : Lt(n)).substring(2);
  for (; t.startsWith("0"); )
    t = t.substring(1);
  return t === "" && (t = "0"), "0x" + t;
}
const Yu = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
BigInt(0);
const Xu = BigInt(58);
function Q0(n) {
  const t = et(n);
  let e = ti(t), r = "";
  for (; e; )
    r = Yu[Number(e % Xu)] + r, e /= Xu;
  for (let s = 0; s < t.length && !t[s]; s++)
    r = Yu[0] + r;
  return r;
}
function q0(n) {
  n = atob(n);
  const t = new Uint8Array(n.length);
  for (let e = 0; e < n.length; e++)
    t[e] = n.charCodeAt(e);
  return et(t);
}
function K0(n) {
  const t = et(n);
  let e = "";
  for (let r = 0; r < t.length; r++)
    e += String.fromCharCode(t[r]);
  return btoa(e);
}
var Ni;
class nd {
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(t, e, r) {
    S(this, "filter"), S(this, "emitter"), C(this, Ni), A(this, Ni, e), q(this, { emitter: t, filter: r });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    f(this, Ni) != null && await this.emitter.off(this.filter, f(this, Ni));
  }
}
Ni = /* @__PURE__ */ new WeakMap();
function J0(n, t, e, r, s) {
  B(!1, `invalid codepoint at offset ${t}; ${n}`, "bytes", e);
}
function rd(n, t, e, r, s) {
  if (n === "BAD_PREFIX" || n === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < e.length && e[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return n === "OVERRUN" ? e.length - t - 1 : 0;
}
function Z0(n, t, e, r, s) {
  return n === "OVERLONG" ? (B(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), rd(n, t, e));
}
const Y0 = Object.freeze({
  error: J0,
  ignore: rd,
  replace: Z0
});
function X0(n, t) {
  t == null && (t = Y0.error);
  const e = et(n, "bytes"), r = [];
  let s = 0;
  for (; s < e.length; ) {
    const i = e[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let o = null, c = null;
    if ((i & 224) === 192)
      o = 1, c = 127;
    else if ((i & 240) === 224)
      o = 2, c = 2047;
    else if ((i & 248) === 240)
      o = 3, c = 65535;
    else {
      (i & 192) === 128 ? s += t("UNEXPECTED_CONTINUE", s - 1, e, r) : s += t("BAD_PREFIX", s - 1, e, r);
      continue;
    }
    if (s - 1 + o >= e.length) {
      s += t("OVERRUN", s - 1, e, r);
      continue;
    }
    let a = i & (1 << 8 - o - 1) - 1;
    for (let l = 0; l < o; l++) {
      let h = e[s];
      if ((h & 192) != 128) {
        s += t("MISSING_CONTINUE", s, e, r), a = null;
        break;
      }
      a = a << 6 | h & 63, s++;
    }
    if (a !== null) {
      if (a > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - o, e, r, a);
        continue;
      }
      if (a >= 55296 && a <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - o, e, r, a);
        continue;
      }
      if (a <= c) {
        s += t("OVERLONG", s - 1 - o, e, r, a);
        continue;
      }
      r.push(a);
    }
  }
  return r;
}
function Ve(n, t) {
  B(typeof n == "string", "invalid string value", "str", n);
  let e = [];
  for (let r = 0; r < n.length; r++) {
    const s = n.charCodeAt(r);
    if (s < 128)
      e.push(s);
    else if (s < 2048)
      e.push(s >> 6 | 192), e.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      r++;
      const i = n.charCodeAt(r);
      B(r < n.length && (i & 64512) === 56320, "invalid surrogate pair", "str", n);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      e.push(o >> 18 | 240), e.push(o >> 12 & 63 | 128), e.push(o >> 6 & 63 | 128), e.push(o & 63 | 128);
    } else
      e.push(s >> 12 | 224), e.push(s >> 6 & 63 | 128), e.push(s & 63 | 128);
  }
  return new Uint8Array(e);
}
function ty(n) {
  return n.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Ua(n, t) {
  return ty(X0(n, t));
}
function sd(n) {
  async function t(e, r) {
    D(r == null || !r.cancelled, "request cancelled before sending", "CANCELLED");
    const s = e.url.split(":")[0].toLowerCase();
    D(s === "http" || s === "https", `unsupported protocol ${s}`, "UNSUPPORTED_OPERATION", {
      info: { protocol: s },
      operation: "request"
    }), D(s === "https" || !e.credentials || e.allowInsecureAuthentication, "insecure authorized connections unsupported", "UNSUPPORTED_OPERATION", {
      operation: "request"
    });
    let i = null;
    const o = new AbortController(), c = setTimeout(() => {
      i = vt("request timeout", "TIMEOUT"), o.abort();
    }, e.timeout);
    r && r.addListener(() => {
      i = vt("request cancelled", "CANCELLED"), o.abort();
    });
    const a = {
      method: e.method,
      headers: new Headers(Array.from(e)),
      body: e.body || void 0,
      signal: o.signal
    };
    let l;
    try {
      l = await fetch(e.url, a);
    } catch (b) {
      throw clearTimeout(c), i || b;
    }
    clearTimeout(c);
    const h = {};
    l.headers.forEach((b, y) => {
      h[y.toLowerCase()] = b;
    });
    const u = await l.arrayBuffer(), p = u == null ? null : new Uint8Array(u);
    return {
      statusCode: l.status,
      statusMessage: l.statusText,
      headers: h,
      body: p
    };
  }
  return t;
}
const ey = 12, ny = 250;
let th = sd();
const ry = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), sy = new RegExp("^ipfs://(ipfs/)?(.*)$", "i");
let mc = !1;
async function id(n, t) {
  try {
    const e = n.match(ry);
    if (!e)
      throw new Error("invalid data");
    return new ei(200, "OK", {
      "content-type": e[1] || "text/plain"
    }, e[2] ? q0(e[3]) : cy(e[3]));
  } catch {
    return new ei(599, "BAD REQUEST (invalid data: URI)", {}, null, new ns(n));
  }
}
function od(n) {
  async function t(e, r) {
    try {
      const s = e.match(sy);
      if (!s)
        throw new Error("invalid link");
      return new ns(`${n}${s[2]}`);
    } catch {
      return new ei(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new ns(e));
    }
  }
  return t;
}
const La = {
  data: id,
  ipfs: od("https://gateway.ipfs.io/ipfs/")
}, ad = /* @__PURE__ */ new WeakMap();
var ys, pr;
class iy {
  constructor(t) {
    C(this, ys), C(this, pr), A(this, ys, []), A(this, pr, !1), ad.set(t, () => {
      if (!f(this, pr)) {
        A(this, pr, !0);
        for (const e of f(this, ys))
          setTimeout(() => {
            e();
          }, 0);
        A(this, ys, []);
      }
    });
  }
  addListener(t) {
    D(!f(this, pr), "singal already cancelled", "UNSUPPORTED_OPERATION", {
      operation: "fetchCancelSignal.addCancelListener"
    }), f(this, ys).push(t);
  }
  get cancelled() {
    return f(this, pr);
  }
  checkSignal() {
    D(!this.cancelled, "cancelled", "CANCELLED", {});
  }
}
ys = /* @__PURE__ */ new WeakMap(), pr = /* @__PURE__ */ new WeakMap();
function Jo(n) {
  if (n == null)
    throw new Error("missing signal; should not happen");
  return n.checkSignal(), n;
}
var Bi, Oi, qe, Wn, ki, Si, _t, me, zn, ms, ws, bs, mn, en, gr, _s, Ti;
const oy = class Yc {
  /**
   *  Create a new FetchRequest instance with default values.
   *
   *  Once created, each property may be set before issuing a
   *  ``.send()`` to make the request.
   */
  constructor(t) {
    C(this, _s), C(this, Bi), C(this, Oi), C(this, qe), C(this, Wn), C(this, ki), C(this, Si), C(this, _t), C(this, me), C(this, zn), C(this, ms), C(this, ws), C(this, bs), C(this, mn), C(this, en), C(this, gr), A(this, Si, String(t)), A(this, Bi, !1), A(this, Oi, !0), A(this, qe, {}), A(this, Wn, ""), A(this, ki, 3e5), A(this, en, {
      slotInterval: ny,
      maxAttempts: ey
    }), A(this, gr, null);
  }
  /**
   *  The fetch URL to request.
   */
  get url() {
    return f(this, Si);
  }
  set url(t) {
    A(this, Si, String(t));
  }
  /**
   *  The fetch body, if any, to send as the request body. //(default: null)//
   *
   *  When setting a body, the intrinsic ``Content-Type`` is automatically
   *  set and will be used if **not overridden** by setting a custom
   *  header.
   *
   *  If %%body%% is null, the body is cleared (along with the
   *  intrinsic ``Content-Type``).
   *
   *  If %%body%% is a string, the intrinsic ``Content-Type`` is set to
   *  ``text/plain``.
   *
   *  If %%body%% is a Uint8Array, the intrinsic ``Content-Type`` is set to
   *  ``application/octet-stream``.
   *
   *  If %%body%% is any other object, the intrinsic ``Content-Type`` is
   *  set to ``application/json``.
   */
  get body() {
    return f(this, _t) == null ? null : new Uint8Array(f(this, _t));
  }
  set body(t) {
    if (t == null)
      A(this, _t, void 0), A(this, me, void 0);
    else if (typeof t == "string")
      A(this, _t, Ve(t)), A(this, me, "text/plain");
    else if (t instanceof Uint8Array)
      A(this, _t, t), A(this, me, "application/octet-stream");
    else if (typeof t == "object")
      A(this, _t, Ve(JSON.stringify(t))), A(this, me, "application/json");
    else
      throw new Error("invalid body");
  }
  /**
   *  Returns true if the request has a body.
   */
  hasBody() {
    return f(this, _t) != null;
  }
  /**
   *  The HTTP method to use when requesting the URI. If no method
   *  has been explicitly set, then ``GET`` is used if the body is
   *  null and ``POST`` otherwise.
   */
  get method() {
    return f(this, Wn) ? f(this, Wn) : this.hasBody() ? "POST" : "GET";
  }
  set method(t) {
    t == null && (t = ""), A(this, Wn, String(t).toUpperCase());
  }
  /**
   *  The headers that will be used when requesting the URI. All
   *  keys are lower-case.
   *
   *  This object is a copy, so any changes will **NOT** be reflected
   *  in the ``FetchRequest``.
   *
   *  To set a header entry, use the ``setHeader`` method.
   */
  get headers() {
    const t = Object.assign({}, f(this, qe));
    return f(this, zn) && (t.authorization = `Basic ${K0(Ve(f(this, zn)))}`), this.allowGzip && (t["accept-encoding"] = "gzip"), t["content-type"] == null && f(this, me) && (t["content-type"] = f(this, me)), this.body && (t["content-length"] = String(this.body.length)), t;
  }
  /**
   *  Get the header for %%key%%, ignoring case.
   */
  getHeader(t) {
    return this.headers[t.toLowerCase()];
  }
  /**
   *  Set the header for %%key%% to %%value%%. All values are coerced
   *  to a string.
   */
  setHeader(t, e) {
    f(this, qe)[String(t).toLowerCase()] = String(e);
  }
  /**
   *  Clear all headers, resetting all intrinsic headers.
   */
  clearHeaders() {
    A(this, qe, {});
  }
  [Symbol.iterator]() {
    const t = this.headers, e = Object.keys(t);
    let r = 0;
    return {
      next: () => {
        if (r < e.length) {
          const s = e[r++];
          return {
            value: [s, t[s]],
            done: !1
          };
        }
        return { value: void 0, done: !0 };
      }
    };
  }
  /**
   *  The value that will be sent for the ``Authorization`` header.
   *
   *  To set the credentials, use the ``setCredentials`` method.
   */
  get credentials() {
    return f(this, zn) || null;
  }
  /**
   *  Sets an ``Authorization`` for %%username%% with %%password%%.
   */
  setCredentials(t, e) {
    B(!t.match(/:/), "invalid basic authentication username", "username", "[REDACTED]"), A(this, zn, `${t}:${e}`);
  }
  /**
   *  Enable and request gzip-encoded responses. The response will
   *  automatically be decompressed. //(default: true)//
   */
  get allowGzip() {
    return f(this, Oi);
  }
  set allowGzip(t) {
    A(this, Oi, !!t);
  }
  /**
   *  Allow ``Authentication`` credentials to be sent over insecure
   *  channels. //(default: false)//
   */
  get allowInsecureAuthentication() {
    return !!f(this, Bi);
  }
  set allowInsecureAuthentication(t) {
    A(this, Bi, !!t);
  }
  /**
   *  The timeout (in milliseconds) to wait for a complete response.
   *  //(default: 5 minutes)//
   */
  get timeout() {
    return f(this, ki);
  }
  set timeout(t) {
    B(t >= 0, "timeout must be non-zero", "timeout", t), A(this, ki, t);
  }
  /**
   *  This function is called prior to each request, for example
   *  during a redirection or retry in case of server throttling.
   *
   *  This offers an opportunity to populate headers or update
   *  content before sending a request.
   */
  get preflightFunc() {
    return f(this, ms) || null;
  }
  set preflightFunc(t) {
    A(this, ms, t);
  }
  /**
   *  This function is called after each response, offering an
   *  opportunity to provide client-level throttling or updating
   *  response data.
   *
   *  Any error thrown in this causes the ``send()`` to throw.
   *
   *  To schedule a retry attempt (assuming the maximum retry limit
   *  has not been reached), use [[response.throwThrottleError]].
   */
  get processFunc() {
    return f(this, ws) || null;
  }
  set processFunc(t) {
    A(this, ws, t);
  }
  /**
   *  This function is called on each retry attempt.
   */
  get retryFunc() {
    return f(this, bs) || null;
  }
  set retryFunc(t) {
    A(this, bs, t);
  }
  /**
   *  This function is called to fetch content from HTTP and
   *  HTTPS URLs and is platform specific (e.g. nodejs vs
   *  browsers).
   *
   *  This is by default the currently registered global getUrl
   *  function, which can be changed using [[registerGetUrl]].
   *  If this has been set, setting is to ``null`` will cause
   *  this FetchRequest (and any future clones) to revert back to
   *  using the currently registered global getUrl function.
   *
   *  Setting this is generally not necessary, but may be useful
   *  for developers that wish to intercept requests or to
   *  configurege a proxy or other agent.
   */
  get getUrlFunc() {
    return f(this, gr) || th;
  }
  set getUrlFunc(t) {
    A(this, gr, t);
  }
  toString() {
    return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${f(this, _t) ? W(f(this, _t)) : "null"}>`;
  }
  /**
   *  Update the throttle parameters used to determine maximum
   *  attempts and exponential-backoff properties.
   */
  setThrottleParams(t) {
    t.slotInterval != null && (f(this, en).slotInterval = t.slotInterval), t.maxAttempts != null && (f(this, en).maxAttempts = t.maxAttempts);
  }
  /**
   *  Resolves to the response by sending the request.
   */
  send() {
    return D(f(this, mn) == null, "request already sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.send" }), A(this, mn, new iy(this)), F(this, _s, Ti).call(this, 0, ld() + this.timeout, 0, this, new ei(0, "", {}, null, this));
  }
  /**
   *  Cancels the inflight response, causing a ``CANCELLED``
   *  error to be rejected from the [[send]].
   */
  cancel() {
    D(f(this, mn) != null, "request has not been sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.cancel" });
    const t = ad.get(this);
    if (!t)
      throw new Error("missing signal; should not happen");
    t();
  }
  /**
   *  Returns a new [[FetchRequest]] that represents the redirection
   *  to %%location%%.
   */
  redirect(t) {
    const e = this.url.split(":")[0].toLowerCase(), r = t.split(":")[0].toLowerCase();
    D(this.method === "GET" && (e !== "https" || r !== "http") && t.match(/^https?:/), "unsupported redirect", "UNSUPPORTED_OPERATION", {
      operation: `redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(t)})`
    });
    const s = new Yc(t);
    return s.method = "GET", s.allowGzip = this.allowGzip, s.timeout = this.timeout, A(s, qe, Object.assign({}, f(this, qe))), f(this, _t) && A(s, _t, new Uint8Array(f(this, _t))), A(s, me, f(this, me)), s;
  }
  /**
   *  Create a new copy of this request.
   */
  clone() {
    const t = new Yc(this.url);
    return A(t, Wn, f(this, Wn)), f(this, _t) && A(t, _t, f(this, _t)), A(t, me, f(this, me)), A(t, qe, Object.assign({}, f(this, qe))), A(t, zn, f(this, zn)), this.allowGzip && (t.allowGzip = !0), t.timeout = this.timeout, this.allowInsecureAuthentication && (t.allowInsecureAuthentication = !0), A(t, ms, f(this, ms)), A(t, ws, f(this, ws)), A(t, bs, f(this, bs)), A(t, en, Object.assign({}, f(this, en))), A(t, gr, f(this, gr)), t;
  }
  /**
   *  Locks all static configuration for gateways and FetchGetUrlFunc
   *  registration.
   */
  static lockConfig() {
    mc = !0;
  }
  /**
   *  Get the current Gateway function for %%scheme%%.
   */
  static getGateway(t) {
    return La[t.toLowerCase()] || null;
  }
  /**
   *  Use the %%func%% when fetching URIs using %%scheme%%.
   *
   *  This method affects all requests globally.
   *
   *  If [[lockConfig]] has been called, no change is made and this
   *  throws.
   */
  static registerGateway(t, e) {
    if (t = t.toLowerCase(), t === "http" || t === "https")
      throw new Error(`cannot intercept ${t}; use registerGetUrl`);
    if (mc)
      throw new Error("gateways locked");
    La[t] = e;
  }
  /**
   *  Use %%getUrl%% when fetching URIs over HTTP and HTTPS requests.
   *
   *  This method affects all requests globally.
   *
   *  If [[lockConfig]] has been called, no change is made and this
   *  throws.
   */
  static registerGetUrl(t) {
    if (mc)
      throw new Error("gateways locked");
    th = t;
  }
  /**
   *  Creates a getUrl function that fetches content from HTTP and
   *  HTTPS URLs.
   *
   *  The available %%options%% are dependent on the platform
   *  implementation of the default getUrl function.
   *
   *  This is not generally something that is needed, but is useful
   *  when trying to customize simple behaviour when fetching HTTP
   *  content.
   */
  static createGetUrlFunc(t) {
    return sd();
  }
  /**
   *  Creates a function that can "fetch" data URIs.
   *
   *  Note that this is automatically done internally to support
   *  data URIs, so it is not necessary to register it.
   *
   *  This is not generally something that is needed, but may
   *  be useful in a wrapper to perfom custom data URI functionality.
   */
  static createDataGateway() {
    return id;
  }
  /**
   *  Creates a function that will fetch IPFS (unvalidated) from
   *  a custom gateway baseUrl.
   *
   *  The default IPFS gateway used internally is
   *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
   */
  static createIpfsGatewayFunc(t) {
    return od(t);
  }
};
Bi = /* @__PURE__ */ new WeakMap(), Oi = /* @__PURE__ */ new WeakMap(), qe = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap(), Si = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap(), me = /* @__PURE__ */ new WeakMap(), zn = /* @__PURE__ */ new WeakMap(), ms = /* @__PURE__ */ new WeakMap(), ws = /* @__PURE__ */ new WeakMap(), bs = /* @__PURE__ */ new WeakMap(), mn = /* @__PURE__ */ new WeakMap(), en = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), _s = /* @__PURE__ */ new WeakSet(), Ti = async function(n, t, e, r, s) {
  var i, o, c;
  if (n >= f(this, en).maxAttempts)
    return s.makeServerError("exceeded maximum retry limit");
  D(ld() <= t, "timeout", "TIMEOUT", {
    operation: "request.send",
    reason: "timeout",
    request: r
  }), e > 0 && await ly(e);
  let a = this.clone();
  const l = (a.url.split(":")[0] || "").toLowerCase();
  if (l in La) {
    const p = await La[l](a.url, Jo(f(r, mn)));
    if (p instanceof ei) {
      let b = p;
      if (this.processFunc) {
        Jo(f(r, mn));
        try {
          b = await this.processFunc(a, b);
        } catch (y) {
          (y.throttle == null || typeof y.stall != "number") && b.makeServerError("error in post-processing function", y).assertOk();
        }
      }
      return b;
    }
    a = p;
  }
  this.preflightFunc && (a = await this.preflightFunc(a));
  const h = await this.getUrlFunc(a, Jo(f(r, mn)));
  let u = new ei(h.statusCode, h.statusMessage, h.headers, h.body, r);
  if (u.statusCode === 301 || u.statusCode === 302) {
    try {
      const p = u.headers.location || "";
      return F(i = a.redirect(p), _s, Ti).call(i, n + 1, t, 0, r, u);
    } catch {
    }
    return u;
  } else if (u.statusCode === 429 && (this.retryFunc == null || await this.retryFunc(a, u, n))) {
    const p = u.headers["retry-after"];
    let b = f(this, en).slotInterval * Math.trunc(Math.random() * Math.pow(2, n));
    return typeof p == "string" && p.match(/^[1-9][0-9]*$/) && (b = parseInt(p)), F(o = a.clone(), _s, Ti).call(o, n + 1, t, b, r, u);
  }
  if (this.processFunc) {
    Jo(f(r, mn));
    try {
      u = await this.processFunc(a, u);
    } catch (p) {
      (p.throttle == null || typeof p.stall != "number") && u.makeServerError("error in post-processing function", p).assertOk();
      let b = f(this, en).slotInterval * Math.trunc(Math.random() * Math.pow(2, n));
      return p.stall >= 0 && (b = p.stall), F(c = a.clone(), _s, Ti).call(c, n + 1, t, b, r, u);
    }
  }
  return u;
};
let ns = oy;
var ia, oa, aa, we, Ri, As;
const ay = class cd {
  constructor(t, e, r, s, i) {
    C(this, ia), C(this, oa), C(this, aa), C(this, we), C(this, Ri), C(this, As), A(this, ia, t), A(this, oa, e), A(this, aa, Object.keys(r).reduce((o, c) => (o[c.toLowerCase()] = String(r[c]), o), {})), A(this, we, s == null ? null : new Uint8Array(s)), A(this, Ri, i || null), A(this, As, { message: "" });
  }
  toString() {
    return `<FetchResponse status=${this.statusCode} body=${f(this, we) ? W(f(this, we)) : "null"}>`;
  }
  /**
   *  The response status code.
   */
  get statusCode() {
    return f(this, ia);
  }
  /**
   *  The response status message.
   */
  get statusMessage() {
    return f(this, oa);
  }
  /**
   *  The response headers. All keys are lower-case.
   */
  get headers() {
    return Object.assign({}, f(this, aa));
  }
  /**
   *  The response body, or ``null`` if there was no body.
   */
  get body() {
    return f(this, we) == null ? null : new Uint8Array(f(this, we));
  }
  /**
   *  The response body as a UTF-8 encoded string, or the empty
   *  string (i.e. ``""``) if there was no body.
   *
   *  An error is thrown if the body is invalid UTF-8 data.
   */
  get bodyText() {
    try {
      return f(this, we) == null ? "" : Ua(f(this, we));
    } catch {
      D(!1, "response body is not valid UTF-8 data", "UNSUPPORTED_OPERATION", {
        operation: "bodyText",
        info: { response: this }
      });
    }
  }
  /**
   *  The response body, decoded as JSON.
   *
   *  An error is thrown if the body is invalid JSON-encoded data
   *  or if there was no body.
   */
  get bodyJson() {
    try {
      return JSON.parse(this.bodyText);
    } catch {
      D(!1, "response body is not valid JSON", "UNSUPPORTED_OPERATION", {
        operation: "bodyJson",
        info: { response: this }
      });
    }
  }
  [Symbol.iterator]() {
    const t = this.headers, e = Object.keys(t);
    let r = 0;
    return {
      next: () => {
        if (r < e.length) {
          const s = e[r++];
          return {
            value: [s, t[s]],
            done: !1
          };
        }
        return { value: void 0, done: !0 };
      }
    };
  }
  /**
   *  Return a Response with matching headers and body, but with
   *  an error status code (i.e. 599) and %%message%% with an
   *  optional %%error%%.
   */
  makeServerError(t, e) {
    let r;
    t ? r = `CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${t})` : (t = `${this.statusCode} ${this.statusMessage}`, r = `CLIENT ESCALATED SERVER ERROR (${t})`);
    const s = new cd(599, r, this.headers, this.body, f(this, Ri) || void 0);
    return A(s, As, { message: t, error: e }), s;
  }
  /**
   *  If called within a [request.processFunc](FetchRequest-processFunc)
   *  call, causes the request to retry as if throttled for %%stall%%
   *  milliseconds.
   */
  throwThrottleError(t, e) {
    e == null ? e = -1 : B(Number.isInteger(e) && e >= 0, "invalid stall timeout", "stall", e);
    const r = new Error(t || "throttling requests");
    throw q(r, { stall: e, throttle: !0 }), r;
  }
  /**
   *  Get the header value for %%key%%, ignoring case.
   */
  getHeader(t) {
    return this.headers[t.toLowerCase()];
  }
  /**
   *  Returns true if the response has a body.
   */
  hasBody() {
    return f(this, we) != null;
  }
  /**
   *  The request made for this response.
   */
  get request() {
    return f(this, Ri);
  }
  /**
   *  Returns true if this response was a success statusCode.
   */
  ok() {
    return f(this, As).message === "" && this.statusCode >= 200 && this.statusCode < 300;
  }
  /**
   *  Throws a ``SERVER_ERROR`` if this response is not ok.
   */
  assertOk() {
    if (this.ok())
      return;
    let { message: t, error: e } = f(this, As);
    t === "" && (t = `server response ${this.statusCode} ${this.statusMessage}`);
    let r = null;
    this.request && (r = this.request.url);
    let s = null;
    try {
      f(this, we) && (s = Ua(f(this, we)));
    } catch {
    }
    D(!1, t, "SERVER_ERROR", {
      request: this.request || "unknown request",
      response: this,
      error: e,
      info: {
        requestUrl: r,
        responseBody: s,
        responseStatus: `${this.statusCode} ${this.statusMessage}`
      }
    });
  }
};
ia = /* @__PURE__ */ new WeakMap(), oa = /* @__PURE__ */ new WeakMap(), aa = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), Ri = /* @__PURE__ */ new WeakMap(), As = /* @__PURE__ */ new WeakMap();
let ei = ay;
function ld() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function cy(n) {
  return Ve(n.replace(/%([0-9a-f][0-9a-f])/gi, (t, e) => String.fromCharCode(parseInt(e, 16))));
}
function ly(n) {
  return new Promise((t) => setTimeout(t, n));
}
const uy = BigInt(-1), Ce = BigInt(0), Gs = BigInt(1), hy = BigInt(5), Es = {};
let Qs = "0000";
for (; Qs.length < 80; )
  Qs += Qs;
function fr(n) {
  let t = Qs;
  for (; t.length < n; )
    t += t;
  return BigInt("1" + t.substring(0, n));
}
function Ci(n, t, e) {
  const r = BigInt(t.width);
  if (t.signed) {
    const s = Gs << r - Gs;
    D(e == null || n >= -s && n < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: n
    }), n > Ce ? n = Pa(Hr(n, r), r) : n = -Pa(Hr(-n, r), r);
  } else {
    const s = Gs << r;
    D(e == null || n >= 0 && n < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: n
    }), n = (n % s + s) % s & s - Gs;
  }
  return n;
}
function wc(n) {
  typeof n == "number" && (n = `fixed128x${n}`);
  let t = !0, e = 128, r = 18;
  if (typeof n == "string") {
    if (n !== "fixed") if (n === "ufixed")
      t = !1;
    else {
      const i = n.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
      B(i, "invalid fixed format", "format", n), t = i[1] !== "u", e = parseInt(i[2]), r = parseInt(i[3]);
    }
  } else if (n) {
    const i = n, o = (c, a, l) => i[c] == null ? l : (B(typeof i[c] === a, "invalid fixed format (" + c + " not " + a + ")", "format." + c, i[c]), i[c]);
    t = o("signed", "boolean", t), e = o("width", "number", e), r = o("decimals", "number", r);
  }
  B(e % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", e), B(r <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", r);
  const s = (t ? "" : "u") + "fixed" + String(e) + "x" + String(r);
  return { signed: t, width: e, decimals: r, name: s };
}
function fy(n, t) {
  let e = "";
  n < Ce && (e = "-", n *= uy);
  let r = n.toString();
  if (t === 0)
    return e + r;
  for (; r.length <= t; )
    r = Qs + r;
  const s = r.length - t;
  for (r = r.substring(0, s) + "." + r.substring(s); r[0] === "0" && r[1] !== "."; )
    r = r.substring(1);
  for (; r[r.length - 1] === "0" && r[r.length - 2] !== "."; )
    r = r.substring(0, r.length - 1);
  return e + r;
}
var tn, pt, re, wt, Sr, wn, Xc, tl, el, nl;
const ud = class vs {
  // Use this when changing this file to get some typing info,
  // but then switch to any to mask the internal type
  //constructor(guard: any, value: bigint, format: _FixedFormat) {
  /**
   *  @private
   */
  constructor(t, e, r) {
    C(this, wt), S(this, "format"), C(this, tn), C(this, pt), C(this, re), S(this, "_value"), Do(t, Es, "FixedNumber"), A(this, pt, e), A(this, tn, r);
    const s = fy(e, r.decimals);
    q(this, { format: r.name, _value: s }), A(this, re, fr(r.decimals));
  }
  /**
   *  If true, negative values are permitted, otherwise only
   *  positive values and zero are allowed.
   */
  get signed() {
    return f(this, tn).signed;
  }
  /**
   *  The number of bits available to store the value.
   */
  get width() {
    return f(this, tn).width;
  }
  /**
   *  The number of decimal places in the fixed-point arithment field.
   */
  get decimals() {
    return f(this, tn).decimals;
  }
  /**
   *  The value as an integer, based on the smallest unit the
   *  [[decimals]] allow.
   */
  get value() {
    return f(this, pt);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%, ignoring overflow.
   */
  addUnsafe(t) {
    return F(this, wt, Xc).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  add(t) {
    return F(this, wt, Xc).call(this, t, "add");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%, ignoring overflow.
   */
  subUnsafe(t) {
    return F(this, wt, tl).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  sub(t) {
    return F(this, wt, tl).call(this, t, "sub");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%, ignoring overflow and underflow (precision loss).
   */
  mulUnsafe(t) {
    return F(this, wt, el).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  mul(t) {
    return F(this, wt, el).call(this, t, "mul");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs or if underflow (precision loss) occurs.
   */
  mulSignal(t) {
    F(this, wt, Sr).call(this, t);
    const e = f(this, pt) * f(t, pt);
    return D(e % f(this, re) === Ce, "precision lost during signalling mul", "NUMERIC_FAULT", {
      operation: "mulSignal",
      fault: "underflow",
      value: this
    }), F(this, wt, wn).call(this, e / f(this, re), "mulSignal");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  divUnsafe(t) {
    return F(this, wt, nl).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  div(t) {
    return F(this, wt, nl).call(this, t, "div");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%. A [[NumericFaultError]] is thrown if underflow
   *  (precision loss) occurs.
   */
  divSignal(t) {
    D(f(t, pt) !== Ce, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    }), F(this, wt, Sr).call(this, t);
    const e = f(this, pt) * f(this, re);
    return D(e % f(t, pt) === Ce, "precision lost during signalling div", "NUMERIC_FAULT", {
      operation: "divSignal",
      fault: "underflow",
      value: this
    }), F(this, wt, wn).call(this, e / f(t, pt), "divSignal");
  }
  /**
   *  Returns a comparison result between %%this%% and %%other%%.
   *
   *  This is suitable for use in sorting, where ``-1`` implies %%this%%
   *  is smaller, ``1`` implies %%this%% is larger and ``0`` implies
   *  both are equal.
   */
  cmp(t) {
    let e = this.value, r = t.value;
    const s = this.decimals - t.decimals;
    return s > 0 ? r *= fr(s) : s < 0 && (e *= fr(-s)), e < r ? -1 : e > r ? 1 : 0;
  }
  /**
   *  Returns true if %%other%% is equal to %%this%%.
   */
  eq(t) {
    return this.cmp(t) === 0;
  }
  /**
   *  Returns true if %%other%% is less than to %%this%%.
   */
  lt(t) {
    return this.cmp(t) < 0;
  }
  /**
   *  Returns true if %%other%% is less than or equal to %%this%%.
   */
  lte(t) {
    return this.cmp(t) <= 0;
  }
  /**
   *  Returns true if %%other%% is greater than to %%this%%.
   */
  gt(t) {
    return this.cmp(t) > 0;
  }
  /**
   *  Returns true if %%other%% is greater than or equal to %%this%%.
   */
  gte(t) {
    return this.cmp(t) >= 0;
  }
  /**
   *  Returns a new [[FixedNumber]] which is the largest **integer**
   *  that is less than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  floor() {
    let t = f(this, pt);
    return f(this, pt) < Ce && (t -= f(this, re) - Gs), t = f(this, pt) / f(this, re) * f(this, re), F(this, wt, wn).call(this, t, "floor");
  }
  /**
   *  Returns a new [[FixedNumber]] which is the smallest **integer**
   *  that is greater than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  ceiling() {
    let t = f(this, pt);
    return f(this, pt) > Ce && (t += f(this, re) - Gs), t = f(this, pt) / f(this, re) * f(this, re), F(this, wt, wn).call(this, t, "ceiling");
  }
  /**
   *  Returns a new [[FixedNumber]] with the decimal component
   *  rounded up on ties at %%decimals%% places.
   */
  round(t) {
    if (t == null && (t = 0), t >= this.decimals)
      return this;
    const e = this.decimals - t, r = hy * fr(e - 1);
    let s = this.value + r;
    const i = fr(e);
    return s = s / i * i, Ci(s, f(this, tn), "round"), new vs(Es, s, f(this, tn));
  }
  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero() {
    return f(this, pt) === Ce;
  }
  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative() {
    return f(this, pt) < Ce;
  }
  /**
   *  Returns the string representation of %%this%%.
   */
  toString() {
    return this._value;
  }
  /**
   *  Returns a float approximation.
   *
   *  Due to IEEE 754 precission (or lack thereof), this function
   *  can only return an approximation and most values will contain
   *  rounding errors.
   */
  toUnsafeFloat() {
    return parseFloat(this.toString());
  }
  /**
   *  Return a new [[FixedNumber]] with the same value but has had
   *  its field set to %%format%%.
   *
   *  This will throw if the value cannot fit into %%format%%.
   */
  toFormat(t) {
    return vs.fromString(this.toString(), t);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% divided by
   *  %%decimal%% places with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% (once adjusted
   *  for %%decimals%%) cannot fit in %%format%%, either due to overflow
   *  or underflow (precision loss).
   */
  static fromValue(t, e, r) {
    const s = e == null ? 0 : nt(e), i = wc(r);
    let o = z(t, "value");
    const c = s - i.decimals;
    if (c > 0) {
      const a = fr(c);
      D(o % a === Ce, "value loses precision for format", "NUMERIC_FAULT", {
        operation: "fromValue",
        fault: "underflow",
        value: t
      }), o /= a;
    } else c < 0 && (o *= fr(-c));
    return Ci(o, i, "fromValue"), new vs(Es, o, i);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%%, either due to overflow or underflow (precision loss).
   */
  static fromString(t, e) {
    const r = t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
    B(r && r[2].length + r[3].length > 0, "invalid FixedNumber string value", "value", t);
    const s = wc(e);
    let i = r[2] || "0", o = r[3] || "";
    for (; o.length < s.decimals; )
      o += Qs;
    D(o.substring(s.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
      operation: "fromString",
      fault: "underflow",
      value: t
    }), o = o.substring(0, s.decimals);
    const c = BigInt(r[1] + i + o);
    return Ci(c, s, "fromString"), new vs(Es, c, s);
  }
  /**
   *  Creates a new [[FixedNumber]] with the big-endian representation
   *  %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%% due to overflow.
   */
  static fromBytes(t, e) {
    let r = ti(et(t, "value"));
    const s = wc(e);
    return s.signed && (r = Pa(r, s.width)), Ci(r, s, "fromBytes"), new vs(Es, r, s);
  }
};
tn = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), re = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ new WeakSet(), Sr = function(n) {
  B(this.format === n.format, "incompatible format; use fixedNumber.toFormat", "other", n);
}, wn = function(n, t) {
  return n = Ci(n, f(this, tn), t), new ud(Es, n, f(this, tn));
}, Xc = function(n, t) {
  return F(this, wt, Sr).call(this, n), F(this, wt, wn).call(this, f(this, pt) + f(n, pt), t);
}, tl = function(n, t) {
  return F(this, wt, Sr).call(this, n), F(this, wt, wn).call(this, f(this, pt) - f(n, pt), t);
}, el = function(n, t) {
  return F(this, wt, Sr).call(this, n), F(this, wt, wn).call(this, f(this, pt) * f(n, pt) / f(this, re), t);
}, nl = function(n, t) {
  return D(f(n, pt) !== Ce, "division by zero", "NUMERIC_FAULT", {
    operation: "div",
    fault: "divide-by-zero",
    value: this
  }), F(this, wt, Sr).call(this, n), F(this, wt, wn).call(this, f(this, pt) * f(this, re) / f(n, pt), t);
};
let dy = ud;
function py(n) {
  let t = n.toString(16);
  for (; t.length < 2; )
    t = "0" + t;
  return "0x" + t;
}
function eh(n, t, e) {
  let r = 0;
  for (let s = 0; s < e; s++)
    r = r * 256 + n[t + s];
  return r;
}
function nh(n, t, e, r) {
  const s = [];
  for (; e < t + 1 + r; ) {
    const i = hd(n, e);
    s.push(i.result), e += i.consumed, D(e <= t + 1 + r, "child data too short", "BUFFER_OVERRUN", {
      buffer: n,
      length: r,
      offset: t
    });
  }
  return { consumed: 1 + r, result: s };
}
function hd(n, t) {
  D(n.length !== 0, "data too short", "BUFFER_OVERRUN", {
    buffer: n,
    length: 0,
    offset: 1
  });
  const e = (r) => {
    D(r <= n.length, "data short segment too short", "BUFFER_OVERRUN", {
      buffer: n,
      length: n.length,
      offset: r
    });
  };
  if (n[t] >= 248) {
    const r = n[t] - 247;
    e(t + 1 + r);
    const s = eh(n, t + 1, r);
    return e(t + 1 + r + s), nh(n, t, t + 1 + r, r + s);
  } else if (n[t] >= 192) {
    const r = n[t] - 192;
    return e(t + 1 + r), nh(n, t, t + 1, r);
  } else if (n[t] >= 184) {
    const r = n[t] - 183;
    e(t + 1 + r);
    const s = eh(n, t + 1, r);
    e(t + 1 + r + s);
    const i = W(n.slice(t + 1 + r, t + 1 + r + s));
    return { consumed: 1 + r + s, result: i };
  } else if (n[t] >= 128) {
    const r = n[t] - 128;
    e(t + 1 + r);
    const s = W(n.slice(t + 1, t + 1 + r));
    return { consumed: 1 + r, result: s };
  }
  return { consumed: 1, result: py(n[t]) };
}
function Ka(n) {
  const t = et(n, "data"), e = hd(t, 0);
  return B(e.consumed === t.length, "unexpected junk after rlp payload", "data", n), e.result;
}
function rh(n) {
  const t = [];
  for (; n; )
    t.unshift(n & 255), n >>= 8;
  return t;
}
function fd(n) {
  if (Array.isArray(n)) {
    let r = [];
    if (n.forEach(function(i) {
      r = r.concat(fd(i));
    }), r.length <= 55)
      return r.unshift(192 + r.length), r;
    const s = rh(r.length);
    return s.unshift(247 + s.length), s.concat(r);
  }
  const t = Array.prototype.slice.call(et(n, "object"));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const e = rh(t.length);
  return e.unshift(183 + e.length), e.concat(t);
}
const sh = "0123456789abcdef";
function rs(n) {
  let t = "0x";
  for (const e of fd(n))
    t += sh[e >> 4], t += sh[e & 15];
  return t;
}
const gy = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function ih(n, t) {
  let e = 18;
  if (typeof t == "string") {
    const r = gy.indexOf(t);
    B(r >= 0, "invalid unit", "unit", t), e = 3 * r;
  } else t != null && (e = nt(t, "unit"));
  return dy.fromValue(n, e, { decimals: e, width: 512 }).toString();
}
const Xt = 32, rl = new Uint8Array(Xt), yy = ["then"], Zo = {}, dd = /* @__PURE__ */ new WeakMap();
function Tr(n) {
  return dd.get(n);
}
function oh(n, t) {
  dd.set(n, t);
}
function Ei(n, t) {
  const e = new Error(`deferred error during ABI decoding triggered accessing ${n}`);
  throw e.error = t, e;
}
function sl(n, t, e) {
  return n.indexOf(null) >= 0 ? t.map((r, s) => r instanceof Da ? sl(Tr(r), r, e) : r) : n.reduce((r, s, i) => {
    let o = t.getValue(s);
    return s in r || (e && o instanceof Da && (o = sl(Tr(o), o, e)), r[s] = o), r;
  }, {});
}
var Pi;
const my = class Ui extends Array {
  /**
   *  @private
   */
  constructor(...t) {
    const e = t[0];
    let r = t[1], s = (t[2] || []).slice(), i = !0;
    e !== Zo && (r = t, s = [], i = !1), super(r.length), C(this, Pi), r.forEach((a, l) => {
      this[l] = a;
    });
    const o = s.reduce((a, l) => (typeof l == "string" && a.set(l, (a.get(l) || 0) + 1), a), /* @__PURE__ */ new Map());
    if (oh(this, Object.freeze(r.map((a, l) => {
      const h = s[l];
      return h != null && o.get(h) === 1 ? h : null;
    }))), A(this, Pi, []), f(this, Pi) == null && f(this, Pi), !i)
      return;
    Object.freeze(this);
    const c = new Proxy(this, {
      get: (a, l, h) => {
        if (typeof l == "string") {
          if (l.match(/^[0-9]+$/)) {
            const p = nt(l, "%index");
            if (p < 0 || p >= this.length)
              throw new RangeError("out of result range");
            const b = a[p];
            return b instanceof Error && Ei(`index ${p}`, b), b;
          }
          if (yy.indexOf(l) >= 0)
            return Reflect.get(a, l, h);
          const u = a[l];
          if (u instanceof Function)
            return function(...p) {
              return u.apply(this === h ? a : this, p);
            };
          if (!(l in a))
            return a.getValue.apply(this === h ? a : this, [l]);
        }
        return Reflect.get(a, l, h);
      }
    });
    return oh(c, Tr(this)), c;
  }
  /**
   *  Returns the Result as a normal Array. If %%deep%%, any children
   *  which are Result objects are also converted to a normal Array.
   *
   *  This will throw if there are any outstanding deferred
   *  errors.
   */
  toArray(t) {
    const e = [];
    return this.forEach((r, s) => {
      r instanceof Error && Ei(`index ${s}`, r), t && r instanceof Ui && (r = r.toArray(t)), e.push(r);
    }), e;
  }
  /**
   *  Returns the Result as an Object with each name-value pair. If
   *  %%deep%%, any children which are Result objects are also
   *  converted to an Object.
   *
   *  This will throw if any value is unnamed, or if there are
   *  any outstanding deferred errors.
   */
  toObject(t) {
    const e = Tr(this);
    return e.reduce((r, s, i) => (D(s != null, `value at index ${i} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), sl(e, this, t)), {});
  }
  /**
   *  @_ignore
   */
  slice(t, e) {
    t == null && (t = 0), t < 0 && (t += this.length, t < 0 && (t = 0)), e == null && (e = this.length), e < 0 && (e += this.length, e < 0 && (e = 0)), e > this.length && (e = this.length);
    const r = Tr(this), s = [], i = [];
    for (let o = t; o < e; o++)
      s.push(this[o]), i.push(r[o]);
    return new Ui(Zo, s, i);
  }
  /**
   *  @_ignore
   */
  filter(t, e) {
    const r = Tr(this), s = [], i = [];
    for (let o = 0; o < this.length; o++) {
      const c = this[o];
      c instanceof Error && Ei(`index ${o}`, c), t.call(e, c, o, this) && (s.push(c), i.push(r[o]));
    }
    return new Ui(Zo, s, i);
  }
  /**
   *  @_ignore
   */
  map(t, e) {
    const r = [];
    for (let s = 0; s < this.length; s++) {
      const i = this[s];
      i instanceof Error && Ei(`index ${s}`, i), r.push(t.call(e, i, s, this));
    }
    return r;
  }
  /**
   *  Returns the value for %%name%%.
   *
   *  Since it is possible to have a key whose name conflicts with
   *  a method on a [[Result]] or its superclass Array, or any
   *  JavaScript keyword, this ensures all named values are still
   *  accessible by name.
   */
  getValue(t) {
    const e = Tr(this).indexOf(t);
    if (e === -1)
      return;
    const r = this[e];
    return r instanceof Error && Ei(`property ${JSON.stringify(t)}`, r.error), r;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(t, e) {
    return new Ui(Zo, t, e);
  }
};
Pi = /* @__PURE__ */ new WeakMap();
let Da = my;
function ah(n) {
  let t = Lt(n);
  return D(t.length <= Xt, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: t, length: Xt, offset: t.length }), t.length !== Xt && (t = Yt(Et([rl.slice(t.length % Xt), t]))), t;
}
class Rn {
  constructor(t, e, r, s) {
    S(this, "name"), S(this, "type"), S(this, "localName"), S(this, "dynamic"), q(this, { name: t, type: e, localName: r, dynamic: s }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(t, e) {
    B(!1, t, this.localName, e);
  }
}
var nr, rr, Li, ca;
class il {
  constructor() {
    C(this, Li), C(this, nr), C(this, rr), A(this, nr, []), A(this, rr, 0);
  }
  get data() {
    return Et(f(this, nr));
  }
  get length() {
    return f(this, rr);
  }
  appendWriter(t) {
    return F(this, Li, ca).call(this, Yt(t.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(t) {
    let e = Yt(t);
    const r = e.length % Xt;
    return r && (e = Yt(Et([e, rl.slice(r)]))), F(this, Li, ca).call(this, e);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(t) {
    return F(this, Li, ca).call(this, ah(t));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const t = f(this, nr).length;
    return f(this, nr).push(rl), A(this, rr, f(this, rr) + Xt), (e) => {
      f(this, nr)[t] = ah(e);
    };
  }
}
nr = /* @__PURE__ */ new WeakMap(), rr = /* @__PURE__ */ new WeakMap(), Li = /* @__PURE__ */ new WeakSet(), ca = function(n) {
  return f(this, nr).push(n), A(this, rr, f(this, rr) + n.length), n.length;
};
var fe, de, Rr, qs, _r, yo, ol, pd;
const wy = class gd {
  constructor(t, e, r) {
    C(this, yo), S(this, "allowLoose"), C(this, fe), C(this, de), C(this, Rr), C(this, qs), C(this, _r), q(this, { allowLoose: !!e }), A(this, fe, Yt(t)), A(this, Rr, 0), A(this, qs, null), A(this, _r, r ?? 1024), A(this, de, 0);
  }
  get data() {
    return W(f(this, fe));
  }
  get dataLength() {
    return f(this, fe).length;
  }
  get consumed() {
    return f(this, de);
  }
  get bytes() {
    return new Uint8Array(f(this, fe));
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(t) {
    const e = new gd(f(this, fe).slice(f(this, de) + t), this.allowLoose, f(this, _r));
    return A(e, qs, this), e;
  }
  // Read bytes
  readBytes(t, e) {
    let r = F(this, yo, pd).call(this, 0, t, !!e);
    return F(this, yo, ol).call(this, t), A(this, de, f(this, de) + r.length), r.slice(0, t);
  }
  // Read a numeric values
  readValue() {
    return ti(this.readBytes(Xt));
  }
  readIndex() {
    return z0(this.readBytes(Xt));
  }
};
fe = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakMap(), Rr = /* @__PURE__ */ new WeakMap(), qs = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), yo = /* @__PURE__ */ new WeakSet(), ol = function(n) {
  var t;
  if (f(this, qs))
    return F(t = f(this, qs), yo, ol).call(t, n);
  A(this, Rr, f(this, Rr) + n), D(f(this, _r) < 1 || f(this, Rr) <= f(this, _r) * this.dataLength, `compressed ABI data exceeds inflation ratio of ${f(this, _r)} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
    buffer: Yt(f(this, fe)),
    offset: f(this, de),
    length: n,
    info: {
      bytesRead: f(this, Rr),
      dataLength: this.dataLength
    }
  });
}, pd = function(n, t, e) {
  let r = Math.ceil(t / Xt) * Xt;
  return f(this, de) + r > f(this, fe).length && (this.allowLoose && e && f(this, de) + t <= f(this, fe).length ? r = t : D(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
    buffer: Yt(f(this, fe)),
    length: f(this, fe).length,
    offset: f(this, de) + r
  })), f(this, fe).slice(f(this, de), f(this, de) + r);
};
let by = wy;
const ch = globalThis || void 0 || self;
function Fa(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function su(n, ...t) {
  if (!(n instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${n.length}`);
}
function Ay(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Fa(n.outputLen), Fa(n.blockLen);
}
function ni(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function yd(n, t) {
  su(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const bc = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const md = (n) => n instanceof Uint8Array, Ey = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4)), Ac = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), je = (n, t) => n << 32 - t | n >>> t, vy = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!vy)
  throw new Error("Non little-endian hardware is not supported");
function xy(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Ja(n) {
  if (typeof n == "string" && (n = xy(n)), !md(n))
    throw new Error(`expected Uint8Array, got ${typeof n}`);
  return n;
}
function Iy(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!md(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
let iu = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function ou(n) {
  const t = (r) => n().update(Ja(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function Ny(n = 32) {
  if (bc && typeof bc.getRandomValues == "function")
    return bc.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
let wd = class extends iu {
  constructor(n, t) {
    super(), this.finished = !1, this.destroyed = !1, Ay(n);
    const e = Ja(t);
    if (this.iHash = n.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const r = this.blockLen, s = new Uint8Array(r);
    s.set(e.length > r ? n.create().update(e).digest() : e);
    for (let i = 0; i < s.length; i++)
      s[i] ^= 54;
    this.iHash.update(s), this.oHash = n.create();
    for (let i = 0; i < s.length; i++)
      s[i] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(n) {
    return ni(this), this.iHash.update(n), this;
  }
  digestInto(n) {
    ni(this), su(n, this.outputLen), this.finished = !0, this.iHash.digestInto(n), this.oHash.update(n), this.oHash.digestInto(n), this.destroy();
  }
  digest() {
    const n = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(n), n;
  }
  _cloneInto(n) {
    n || (n = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: e, finished: r, destroyed: s, blockLen: i, outputLen: o } = this;
    return n = n, n.finished = r, n.destroyed = s, n.blockLen = i, n.outputLen = o, n.oHash = t._cloneInto(n.oHash), n.iHash = e._cloneInto(n.iHash), n;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const bd = (n, t, e) => new wd(n, t).update(e).digest();
bd.create = (n, t) => new wd(n, t);
function By(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), c = Number(e & i), a = r ? 4 : 0, l = r ? 0 : 4;
  n.setUint32(t + a, o, r), n.setUint32(t + l, c, r);
}
class Ad extends iu {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ac(this.buffer);
  }
  update(t) {
    ni(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Ja(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const a = Ac(t);
        for (; s <= i - o; o += s)
          this.process(a, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ni(this), yd(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let u = o; u < s; u++)
      e[u] = 0;
    By(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Ac(t), a = this.outputLen;
    if (a % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = a / 4, h = this.get();
    if (l > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++)
      c.setUint32(4 * u, h[u], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return t.length = s, t.pos = c, t.finished = i, t.destroyed = o, s % e && t.buffer.set(r), t;
  }
}
const Oy = (n, t, e) => n & t ^ ~n & e, ky = (n, t, e) => n & t ^ n & e ^ t & e, Sy = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), Pn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Un = /* @__PURE__ */ new Uint32Array(64);
let Ty = class extends Ad {
  constructor() {
    super(64, 32, 8, !1), this.A = Pn[0] | 0, this.B = Pn[1] | 0, this.C = Pn[2] | 0, this.D = Pn[3] | 0, this.E = Pn[4] | 0, this.F = Pn[5] | 0, this.G = Pn[6] | 0, this.H = Pn[7] | 0;
  }
  get() {
    const { A: n, B: t, C: e, D: r, E: s, F: i, G: o, H: c } = this;
    return [n, t, e, r, s, i, o, c];
  }
  // prettier-ignore
  set(n, t, e, r, s, i, o, c) {
    this.A = n | 0, this.B = t | 0, this.C = e | 0, this.D = r | 0, this.E = s | 0, this.F = i | 0, this.G = o | 0, this.H = c | 0;
  }
  process(n, t) {
    for (let h = 0; h < 16; h++, t += 4)
      Un[h] = n.getUint32(t, !1);
    for (let h = 16; h < 64; h++) {
      const u = Un[h - 15], p = Un[h - 2], b = je(u, 7) ^ je(u, 18) ^ u >>> 3, y = je(p, 17) ^ je(p, 19) ^ p >>> 10;
      Un[h] = y + Un[h - 7] + b + Un[h - 16] | 0;
    }
    let { A: e, B: r, C: s, D: i, E: o, F: c, G: a, H: l } = this;
    for (let h = 0; h < 64; h++) {
      const u = je(o, 6) ^ je(o, 11) ^ je(o, 25), p = l + u + Oy(o, c, a) + Sy[h] + Un[h] | 0, b = (je(e, 2) ^ je(e, 13) ^ je(e, 22)) + ky(e, r, s) | 0;
      l = a, a = c, c = o, o = i + p | 0, i = s, s = r, r = e, e = p + b | 0;
    }
    e = e + this.A | 0, r = r + this.B | 0, s = s + this.C | 0, i = i + this.D | 0, o = o + this.E | 0, c = c + this.F | 0, a = a + this.G | 0, l = l + this.H | 0, this.set(e, r, s, i, o, c, a, l);
  }
  roundClean() {
    Un.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Ed = /* @__PURE__ */ ou(() => new Ty()), Yo = /* @__PURE__ */ BigInt(2 ** 32 - 1), al = /* @__PURE__ */ BigInt(32);
function vd(n, t = !1) {
  return t ? { h: Number(n & Yo), l: Number(n >> al & Yo) } : { h: Number(n >> al & Yo) | 0, l: Number(n & Yo) | 0 };
}
function xd(n, t = !1) {
  let e = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: i, l: o } = vd(n[s], t);
    [e[s], r[s]] = [i, o];
  }
  return [e, r];
}
const Ry = (n, t) => BigInt(n >>> 0) << al | BigInt(t >>> 0), Cy = (n, t, e) => n >>> e, Py = (n, t, e) => n << 32 - e | t >>> e, Uy = (n, t, e) => n >>> e | t << 32 - e, Ly = (n, t, e) => n << 32 - e | t >>> e, Dy = (n, t, e) => n << 64 - e | t >>> e - 32, Fy = (n, t, e) => n >>> e - 32 | t << 64 - e, My = (n, t) => t, Hy = (n, t) => n, Id = (n, t, e) => n << e | t >>> 32 - e, Nd = (n, t, e) => t << e | n >>> 32 - e, Bd = (n, t, e) => t << e - 32 | n >>> 64 - e, Od = (n, t, e) => n << e - 32 | t >>> 64 - e;
function _y(n, t, e, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: n + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const Gy = (n, t, e) => (n >>> 0) + (t >>> 0) + (e >>> 0), Vy = (n, t, e, r) => t + e + r + (n / 2 ** 32 | 0) | 0, $y = (n, t, e, r) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0), jy = (n, t, e, r, s) => t + e + r + s + (n / 2 ** 32 | 0) | 0, Wy = (n, t, e, r, s) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0) + (s >>> 0), zy = (n, t, e, r, s, i) => t + e + r + s + i + (n / 2 ** 32 | 0) | 0, X = {
  fromBig: vd,
  split: xd,
  toBig: Ry,
  shrSH: Cy,
  shrSL: Py,
  rotrSH: Uy,
  rotrSL: Ly,
  rotrBH: Dy,
  rotrBL: Fy,
  rotr32H: My,
  rotr32L: Hy,
  rotlSH: Id,
  rotlSL: Nd,
  rotlBH: Bd,
  rotlBL: Od,
  add: _y,
  add3L: Gy,
  add3H: Vy,
  add4L: $y,
  add4H: jy,
  add5H: zy,
  add5L: Wy
}, [Qy, qy] = X.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))), Ln = /* @__PURE__ */ new Uint32Array(80), Dn = /* @__PURE__ */ new Uint32Array(80);
class Ky extends Ad {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: a, Eh: l, El: h, Fh: u, Fl: p, Gh: b, Gl: y, Hh: d, Hl: g } = this;
    return [t, e, r, s, i, o, c, a, l, h, u, p, b, y, d, g];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, c, a, l, h, u, p, b, y, d, g) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = a | 0, this.Eh = l | 0, this.El = h | 0, this.Fh = u | 0, this.Fl = p | 0, this.Gh = b | 0, this.Gl = y | 0, this.Hh = d | 0, this.Hl = g | 0;
  }
  process(t, e) {
    for (let v = 0; v < 16; v++, e += 4)
      Ln[v] = t.getUint32(e), Dn[v] = t.getUint32(e += 4);
    for (let v = 16; v < 80; v++) {
      const T = Ln[v - 15] | 0, k = Dn[v - 15] | 0, x = X.rotrSH(T, k, 1) ^ X.rotrSH(T, k, 8) ^ X.shrSH(T, k, 7), N = X.rotrSL(T, k, 1) ^ X.rotrSL(T, k, 8) ^ X.shrSL(T, k, 7), O = Ln[v - 2] | 0, _ = Dn[v - 2] | 0, U = X.rotrSH(O, _, 19) ^ X.rotrBH(O, _, 61) ^ X.shrSH(O, _, 6), P = X.rotrSL(O, _, 19) ^ X.rotrBL(O, _, 61) ^ X.shrSL(O, _, 6), V = X.add4L(N, P, Dn[v - 7], Dn[v - 16]), $ = X.add4H(V, x, U, Ln[v - 7], Ln[v - 16]);
      Ln[v] = $ | 0, Dn[v] = V | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: a, Dh: l, Dl: h, Eh: u, El: p, Fh: b, Fl: y, Gh: d, Gl: g, Hh: w, Hl: I } = this;
    for (let v = 0; v < 80; v++) {
      const T = X.rotrSH(u, p, 14) ^ X.rotrSH(u, p, 18) ^ X.rotrBH(u, p, 41), k = X.rotrSL(u, p, 14) ^ X.rotrSL(u, p, 18) ^ X.rotrBL(u, p, 41), x = u & b ^ ~u & d, N = p & y ^ ~p & g, O = X.add5L(I, k, N, qy[v], Dn[v]), _ = X.add5H(O, w, T, x, Qy[v], Ln[v]), U = O | 0, P = X.rotrSH(r, s, 28) ^ X.rotrBH(r, s, 34) ^ X.rotrBH(r, s, 39), V = X.rotrSL(r, s, 28) ^ X.rotrBL(r, s, 34) ^ X.rotrBL(r, s, 39), $ = r & i ^ r & c ^ i & c, rt = s & o ^ s & a ^ o & a;
      w = d | 0, I = g | 0, d = b | 0, g = y | 0, b = u | 0, y = p | 0, { h: u, l: p } = X.add(l | 0, h | 0, _ | 0, U | 0), l = c | 0, h = a | 0, c = i | 0, a = o | 0, i = r | 0, o = s | 0;
      const m = X.add3L(U, V, rt);
      r = X.add3H(m, _, P, $), s = m | 0;
    }
    ({ h: r, l: s } = X.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = X.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: a } = X.add(this.Ch | 0, this.Cl | 0, c | 0, a | 0), { h: l, l: h } = X.add(this.Dh | 0, this.Dl | 0, l | 0, h | 0), { h: u, l: p } = X.add(this.Eh | 0, this.El | 0, u | 0, p | 0), { h: b, l: y } = X.add(this.Fh | 0, this.Fl | 0, b | 0, y | 0), { h: d, l: g } = X.add(this.Gh | 0, this.Gl | 0, d | 0, g | 0), { h: w, l: I } = X.add(this.Hh | 0, this.Hl | 0, w | 0, I | 0), this.set(r, s, i, o, c, a, l, h, u, p, b, y, d, g, w, I);
  }
  roundClean() {
    Ln.fill(0), Dn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Jy = /* @__PURE__ */ ou(() => new Ky());
function Zy() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof ch < "u")
    return ch;
  throw new Error("unable to locate global object");
}
const lh = Zy();
lh.crypto || lh.msCrypto;
function Yy(n) {
  switch (n) {
    case "sha256":
      return Ed.create();
    case "sha512":
      return Jy.create();
  }
  B(!1, "invalid hashing algorithm name", "algorithm", n);
}
const [kd, Sd, Td] = [[], [], []], Xy = /* @__PURE__ */ BigInt(0), vi = /* @__PURE__ */ BigInt(1), tm = /* @__PURE__ */ BigInt(2), em = /* @__PURE__ */ BigInt(7), nm = /* @__PURE__ */ BigInt(256), rm = /* @__PURE__ */ BigInt(113);
for (let n = 0, t = vi, e = 1, r = 0; n < 24; n++) {
  [e, r] = [r, (2 * e + 3 * r) % 5], kd.push(2 * (5 * r + e)), Sd.push((n + 1) * (n + 2) / 2 % 64);
  let s = Xy;
  for (let i = 0; i < 7; i++)
    t = (t << vi ^ (t >> em) * rm) % nm, t & tm && (s ^= vi << (vi << /* @__PURE__ */ BigInt(i)) - vi);
  Td.push(s);
}
const [sm, im] = /* @__PURE__ */ xd(Td, !0), uh = (n, t, e) => e > 32 ? Bd(n, t, e) : Id(n, t, e), hh = (n, t, e) => e > 32 ? Od(n, t, e) : Nd(n, t, e);
function om(n, t = 24) {
  const e = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      e[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, a = (o + 2) % 10, l = e[a], h = e[a + 1], u = uh(l, h, 1) ^ e[c], p = hh(l, h, 1) ^ e[c + 1];
      for (let b = 0; b < 50; b += 10)
        n[o + b] ^= u, n[o + b + 1] ^= p;
    }
    let s = n[2], i = n[3];
    for (let o = 0; o < 24; o++) {
      const c = Sd[o], a = uh(s, i, c), l = hh(s, i, c), h = kd[o];
      s = n[h], i = n[h + 1], n[h] = a, n[h + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        e[c] = n[o + c];
      for (let c = 0; c < 10; c++)
        n[o + c] ^= ~e[(c + 2) % 10] & e[(c + 4) % 10];
    }
    n[0] ^= sm[r], n[1] ^= im[r];
  }
  e.fill(0);
}
let am = class Rd extends iu {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Fa(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Ey(this.state);
  }
  keccak() {
    om(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    ni(this);
    const { blockLen: e, state: r } = this;
    t = Ja(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(e - this.pos, s - i);
      for (let c = 0; c < o; c++)
        r[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: r, blockLen: s } = this;
    t[r] ^= e, e & 128 && r === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    ni(this, !1), su(t), this.finish();
    const e = this.state, { blockLen: r } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - s);
      t.set(e.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Fa(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (yd(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: r, outputLen: s, rounds: i, enableXOF: o } = this;
    return t || (t = new Rd(e, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const cm = (n, t, e) => ou(() => new am(t, n, e)), lm = /* @__PURE__ */ cm(1, 136, 256 / 8);
let Cd = !1;
const Pd = function(n) {
  return lm(n);
};
let Ud = Pd;
function It(n) {
  const t = et(n, "data");
  return W(Ud(t));
}
It._ = Pd;
It.lock = function() {
  Cd = !0;
};
It.register = function(n) {
  if (Cd)
    throw new TypeError("keccak256 is locked");
  Ud = n;
};
Object.freeze(It);
const Ld = function(n) {
  return Yy("sha256").update(n).digest();
};
let Dd = Ld, Fd = !1;
function ur(n) {
  const t = et(n, "data");
  return W(Dd(t));
}
ur._ = Ld;
ur.lock = function() {
  Fd = !0;
};
ur.register = function(n) {
  if (Fd)
    throw new Error("sha256 is locked");
  Dd = n;
};
Object.freeze(ur);
Object.freeze(ur);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Md = BigInt(0), Za = BigInt(1), um = BigInt(2), Ya = (n) => n instanceof Uint8Array, hm = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function ri(n) {
  if (!Ya(n))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += hm[n[e]];
  return t;
}
function Hd(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function au(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
function si(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const e = new Uint8Array(t / 2);
  for (let r = 0; r < e.length; r++) {
    const s = r * 2, i = n.slice(s, s + 2), o = Number.parseInt(i, 16);
    if (Number.isNaN(o) || o < 0)
      throw new Error("Invalid byte sequence");
    e[r] = o;
  }
  return e;
}
function Jr(n) {
  return au(ri(n));
}
function cu(n) {
  if (!Ya(n))
    throw new Error("Uint8Array expected");
  return au(ri(Uint8Array.from(n).reverse()));
}
function ii(n, t) {
  return si(n.toString(16).padStart(t * 2, "0"));
}
function lu(n, t) {
  return ii(n, t).reverse();
}
function fm(n) {
  return si(Hd(n));
}
function Pe(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = si(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Ya(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function Bo(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!Ya(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
function dm(n, t) {
  if (n.length !== t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !1;
  return !0;
}
function pm(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function gm(n) {
  let t;
  for (t = 0; n > Md; n >>= Za, t += 1)
    ;
  return t;
}
function ym(n, t) {
  return n >> BigInt(t) & Za;
}
const mm = (n, t, e) => n | (e ? Za : Md) << BigInt(t), uu = (n) => (um << BigInt(n - 1)) - Za, Ec = (n) => new Uint8Array(n), fh = (n) => Uint8Array.from(n);
function _d(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = Ec(n), s = Ec(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...h) => e(s, r, ...h), a = (h = Ec()) => {
    s = c(fh([0]), h), r = c(), h.length !== 0 && (s = c(fh([1]), h), r = c());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const u = [];
    for (; h < t; ) {
      r = c();
      const p = r.slice();
      u.push(p), h += r.length;
    }
    return Bo(...u);
  };
  return (h, u) => {
    o(), a(h);
    let p;
    for (; !(p = u(l())); )
      a();
    return o(), p;
  };
}
const wm = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || n instanceof Uint8Array,
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function Fo(n, t, e = {}) {
  const r = (s, i, o) => {
    const c = wm[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const a = n[s];
    if (!(o && a === void 0) && !c(a, n))
      throw new Error(`Invalid param ${String(s)}=${a} (${typeof a}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const bm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: ym,
  bitLen: gm,
  bitMask: uu,
  bitSet: mm,
  bytesToHex: ri,
  bytesToNumberBE: Jr,
  bytesToNumberLE: cu,
  concatBytes: Bo,
  createHmacDrbg: _d,
  ensureBytes: Pe,
  equalBytes: dm,
  hexToBytes: si,
  hexToNumber: au,
  numberToBytesBE: ii,
  numberToBytesLE: lu,
  numberToHexUnpadded: Hd,
  numberToVarBytesBE: fm,
  utf8ToBytes: pm,
  validateObject: Fo
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ft = BigInt(0), Bt = BigInt(1), Cr = BigInt(2), Am = BigInt(3), cl = BigInt(4), dh = BigInt(5), ph = BigInt(8);
BigInt(9);
BigInt(16);
function ie(n, t) {
  const e = n % t;
  return e >= Ft ? e : t + e;
}
function Em(n, t, e) {
  if (e <= Ft || t < Ft)
    throw new Error("Expected power/modulo > 0");
  if (e === Bt)
    return Ft;
  let r = Bt;
  for (; t > Ft; )
    t & Bt && (r = r * n % e), n = n * n % e, t >>= Bt;
  return r;
}
function ge(n, t, e) {
  let r = n;
  for (; t-- > Ft; )
    r *= r, r %= e;
  return r;
}
function ll(n, t) {
  if (n === Ft || t <= Ft)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = ie(n, t), r = t, s = Ft, i = Bt;
  for (; e !== Ft; ) {
    const o = r / e, c = r % e, a = s - i * o;
    r = e, e = c, s = i, i = a;
  }
  if (r !== Bt)
    throw new Error("invert: does not exist");
  return ie(s, t);
}
function vm(n) {
  const t = (n - Bt) / Cr;
  let e, r, s;
  for (e = n - Bt, r = 0; e % Cr === Ft; e /= Cr, r++)
    ;
  for (s = Cr; s < n && Em(s, t, n) !== n - Bt; s++)
    ;
  if (r === 1) {
    const o = (n + Bt) / cl;
    return function(c, a) {
      const l = c.pow(a, o);
      if (!c.eql(c.sqr(l), a))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (e + Bt) / Cr;
  return function(o, c) {
    if (o.pow(c, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let a = r, l = o.pow(o.mul(o.ONE, s), e), h = o.pow(c, i), u = o.pow(c, e);
    for (; !o.eql(u, o.ONE); ) {
      if (o.eql(u, o.ZERO))
        return o.ZERO;
      let p = 1;
      for (let y = o.sqr(u); p < a && !o.eql(y, o.ONE); p++)
        y = o.sqr(y);
      const b = o.pow(l, Bt << BigInt(a - p - 1));
      l = o.sqr(b), h = o.mul(h, b), u = o.mul(u, l), a = p;
    }
    return h;
  };
}
function xm(n) {
  if (n % cl === Am) {
    const t = (n + Bt) / cl;
    return function(e, r) {
      const s = e.pow(r, t);
      if (!e.eql(e.sqr(s), r))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (n % ph === dh) {
    const t = (n - dh) / ph;
    return function(e, r) {
      const s = e.mul(r, Cr), i = e.pow(s, t), o = e.mul(r, i), c = e.mul(e.mul(o, Cr), i), a = e.mul(o, e.sub(c, e.ONE));
      if (!e.eql(e.sqr(a), r))
        throw new Error("Cannot find square root");
      return a;
    };
  }
  return vm(n);
}
const Im = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function Nm(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Im.reduce((r, s) => (r[s] = "function", r), t);
  return Fo(n, e);
}
function Bm(n, t, e) {
  if (e < Ft)
    throw new Error("Expected power > 0");
  if (e === Ft)
    return n.ONE;
  if (e === Bt)
    return t;
  let r = n.ONE, s = t;
  for (; e > Ft; )
    e & Bt && (r = n.mul(r, s)), s = n.sqr(s), e >>= Bt;
  return r;
}
function Om(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, c) => n.is0(o) ? i : (e[c] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, c) => n.is0(o) ? i : (e[c] = n.mul(i, e[c]), n.mul(i, o)), s), e;
}
function Gd(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function km(n, t, e = !1, r = {}) {
  if (n <= Ft)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = Gd(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = xm(n), c = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: uu(s),
    ZERO: Ft,
    ONE: Bt,
    create: (a) => ie(a, n),
    isValid: (a) => {
      if (typeof a != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof a}`);
      return Ft <= a && a < n;
    },
    is0: (a) => a === Ft,
    isOdd: (a) => (a & Bt) === Bt,
    neg: (a) => ie(-a, n),
    eql: (a, l) => a === l,
    sqr: (a) => ie(a * a, n),
    add: (a, l) => ie(a + l, n),
    sub: (a, l) => ie(a - l, n),
    mul: (a, l) => ie(a * l, n),
    pow: (a, l) => Bm(c, a, l),
    div: (a, l) => ie(a * ll(l, n), n),
    // Same as above, but doesn't normalize
    sqrN: (a) => a * a,
    addN: (a, l) => a + l,
    subN: (a, l) => a - l,
    mulN: (a, l) => a * l,
    inv: (a) => ll(a, n),
    sqrt: r.sqrt || ((a) => o(c, a)),
    invertBatch: (a) => Om(c, a),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, l, h) => h ? l : a,
    toBytes: (a) => e ? lu(a, i) : ii(a, i),
    fromBytes: (a) => {
      if (a.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${a.length}`);
      return e ? cu(a) : Jr(a);
    }
  });
  return Object.freeze(c);
}
function Vd(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function $d(n) {
  const t = Vd(n);
  return t + Math.ceil(t / 2);
}
function Sm(n, t, e = !1) {
  const r = n.length, s = Vd(t), i = $d(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? Jr(n) : cu(n), c = ie(o, t - Bt) + Bt;
  return e ? lu(c, s) : ii(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Tm = BigInt(0), vc = BigInt(1);
function Rm(n, t) {
  const e = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, r = (s) => {
    const i = Math.ceil(t / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = n.ZERO, c = s;
      for (; i > Tm; )
        i & vc && (o = o.add(c)), c = c.double(), i >>= vc;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(s, i) {
      const { windows: o, windowSize: c } = r(i), a = [];
      let l = s, h = l;
      for (let u = 0; u < o; u++) {
        h = l, a.push(h);
        for (let p = 1; p < c; p++)
          h = h.add(l), a.push(h);
        l = h.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: c, windowSize: a } = r(s);
      let l = n.ZERO, h = n.BASE;
      const u = BigInt(2 ** s - 1), p = 2 ** s, b = BigInt(s);
      for (let y = 0; y < c; y++) {
        const d = y * a;
        let g = Number(o & u);
        o >>= b, g > a && (g -= p, o += vc);
        const w = d, I = d + Math.abs(g) - 1, v = y % 2 !== 0, T = g < 0;
        g === 0 ? h = h.add(e(v, i[w])) : l = l.add(e(T, i[I]));
      }
      return { p: l, f: h };
    },
    wNAFCached(s, i, o, c) {
      const a = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, a), a !== 1 && i.set(s, c(l))), this.wNAF(a, l, o);
    }
  };
}
function jd(n) {
  return Nm(n.Fp), Fo(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Gd(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Cm(n) {
  const t = jd(n);
  Fo(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: r, a: s } = t;
  if (e) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: Pm, hexToBytes: Um } = bm, Gr = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(n = "") {
      super(n);
    }
  },
  _parseInt(n) {
    const { Err: t } = Gr;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Pm(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = Gr, e = typeof n == "string" ? Um(n) : n;
    if (!(e instanceof Uint8Array))
      throw new Error("ui8a expected");
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Gr._parseInt(e.subarray(2)), { d: o, l: c } = Gr._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const h = l.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, c = e(i), a = e(o);
    return `30${e(o + i + 4)}02${a}${s}02${c}${r}`;
  }
}, bn = BigInt(0), Ae = BigInt(1);
BigInt(2);
const gh = BigInt(3);
BigInt(4);
function Lm(n) {
  const t = Cm(n), { Fp: e } = t, r = t.toBytes || ((y, d, g) => {
    const w = d.toAffine();
    return Bo(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((y) => {
    const d = y.subarray(1), g = e.fromBytes(d.subarray(0, e.BYTES)), w = e.fromBytes(d.subarray(e.BYTES, 2 * e.BYTES));
    return { x: g, y: w };
  });
  function i(y) {
    const { a: d, b: g } = t, w = e.sqr(y), I = e.mul(w, y);
    return e.add(e.add(I, e.mul(y, d)), g);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(y) {
    return typeof y == "bigint" && bn < y && y < t.n;
  }
  function c(y) {
    if (!o(y))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function a(y) {
    const { allowedPrivateKeyLengths: d, nByteLength: g, wrapPrivateKey: w, n: I } = t;
    if (d && typeof y != "bigint") {
      if (y instanceof Uint8Array && (y = ri(y)), typeof y != "string" || !d.includes(y.length))
        throw new Error("Invalid key");
      y = y.padStart(g * 2, "0");
    }
    let v;
    try {
      v = typeof y == "bigint" ? y : Jr(Pe("private key", y, g));
    } catch {
      throw new Error(`private key must be ${g} bytes, hex or bigint, not ${typeof y}`);
    }
    return w && (v = ie(v, I)), c(v), v;
  }
  const l = /* @__PURE__ */ new Map();
  function h(y) {
    if (!(y instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  class u {
    constructor(d, g, w) {
      if (this.px = d, this.py = g, this.pz = w, d == null || !e.isValid(d))
        throw new Error("x required");
      if (g == null || !e.isValid(g))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(d) {
      const { x: g, y: w } = d || {};
      if (!d || !e.isValid(g) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (d instanceof u)
        throw new Error("projective point not allowed");
      const I = (v) => e.eql(v, e.ZERO);
      return I(g) && I(w) ? u.ZERO : new u(g, w, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(d) {
      const g = e.invertBatch(d.map((w) => w.pz));
      return d.map((w, I) => w.toAffine(g[I])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(d) {
      const g = u.fromAffine(s(Pe("pointHex", d)));
      return g.assertValidity(), g;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(d) {
      return u.BASE.multiply(a(d));
    }
    // "Private method", don't use it directly
    _setWindowSize(d) {
      this._WINDOW_SIZE = d, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: d, y: g } = this.toAffine();
      if (!e.isValid(d) || !e.isValid(g))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(g), I = i(d);
      if (!e.eql(w, I))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: d } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d, x = e.eql(e.mul(g, k), e.mul(v, I)), N = e.eql(e.mul(w, k), e.mul(T, I));
      return x && N;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new u(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: d, b: g } = t, w = e.mul(g, gh), { px: I, py: v, pz: T } = this;
      let k = e.ZERO, x = e.ZERO, N = e.ZERO, O = e.mul(I, I), _ = e.mul(v, v), U = e.mul(T, T), P = e.mul(I, v);
      return P = e.add(P, P), N = e.mul(I, T), N = e.add(N, N), k = e.mul(d, N), x = e.mul(w, U), x = e.add(k, x), k = e.sub(_, x), x = e.add(_, x), x = e.mul(k, x), k = e.mul(P, k), N = e.mul(w, N), U = e.mul(d, U), P = e.sub(O, U), P = e.mul(d, P), P = e.add(P, N), N = e.add(O, O), O = e.add(N, O), O = e.add(O, U), O = e.mul(O, P), x = e.add(x, O), U = e.mul(v, T), U = e.add(U, U), O = e.mul(U, P), k = e.sub(k, O), N = e.mul(U, _), N = e.add(N, N), N = e.add(N, N), new u(k, x, N);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d;
      let x = e.ZERO, N = e.ZERO, O = e.ZERO;
      const _ = t.a, U = e.mul(t.b, gh);
      let P = e.mul(g, v), V = e.mul(w, T), $ = e.mul(I, k), rt = e.add(g, w), m = e.add(v, T);
      rt = e.mul(rt, m), m = e.add(P, V), rt = e.sub(rt, m), m = e.add(g, I);
      let E = e.add(v, k);
      return m = e.mul(m, E), E = e.add(P, $), m = e.sub(m, E), E = e.add(w, I), x = e.add(T, k), E = e.mul(E, x), x = e.add(V, $), E = e.sub(E, x), O = e.mul(_, m), x = e.mul(U, $), O = e.add(x, O), x = e.sub(V, O), O = e.add(V, O), N = e.mul(x, O), V = e.add(P, P), V = e.add(V, P), $ = e.mul(_, $), m = e.mul(U, m), V = e.add(V, $), $ = e.sub(P, $), $ = e.mul(_, $), m = e.add(m, $), P = e.mul(V, m), N = e.add(N, P), P = e.mul(E, m), x = e.mul(rt, x), x = e.sub(x, P), P = e.mul(rt, V), O = e.mul(E, O), O = e.add(O, P), new u(x, N, O);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(d) {
      return b.wNAFCached(this, l, d, (g) => {
        const w = e.invertBatch(g.map((I) => I.pz));
        return g.map((I, v) => I.toAffine(w[v])).map(u.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(d) {
      const g = u.ZERO;
      if (d === bn)
        return g;
      if (c(d), d === Ae)
        return this;
      const { endo: w } = t;
      if (!w)
        return b.unsafeLadder(this, d);
      let { k1neg: I, k1: v, k2neg: T, k2: k } = w.splitScalar(d), x = g, N = g, O = this;
      for (; v > bn || k > bn; )
        v & Ae && (x = x.add(O)), k & Ae && (N = N.add(O)), O = O.double(), v >>= Ae, k >>= Ae;
      return I && (x = x.negate()), T && (N = N.negate()), N = new u(e.mul(N.px, w.beta), N.py, N.pz), x.add(N);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(d) {
      c(d);
      let g = d, w, I;
      const { endo: v } = t;
      if (v) {
        const { k1neg: T, k1: k, k2neg: x, k2: N } = v.splitScalar(g);
        let { p: O, f: _ } = this.wNAF(k), { p: U, f: P } = this.wNAF(N);
        O = b.constTimeNegate(T, O), U = b.constTimeNegate(x, U), U = new u(e.mul(U.px, v.beta), U.py, U.pz), w = O.add(U), I = _.add(P);
      } else {
        const { p: T, f: k } = this.wNAF(g);
        w = T, I = k;
      }
      return u.normalizeZ([w, I])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(d, g, w) {
      const I = u.BASE, v = (k, x) => x === bn || x === Ae || !k.equals(I) ? k.multiplyUnsafe(x) : k.multiply(x), T = v(this, g).add(v(d, w));
      return T.is0() ? void 0 : T;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(d) {
      const { px: g, py: w, pz: I } = this, v = this.is0();
      d == null && (d = v ? e.ONE : e.inv(I));
      const T = e.mul(g, d), k = e.mul(w, d), x = e.mul(I, d);
      if (v)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(x, e.ONE))
        throw new Error("invZ was invalid");
      return { x: T, y: k };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: g } = t;
      if (d === Ae)
        return !0;
      if (g)
        return g(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d, clearCofactor: g } = t;
      return d === Ae ? this : g ? g(u, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(u, this, d);
    }
    toHex(d = !0) {
      return ri(this.toRawBytes(d));
    }
  }
  u.BASE = new u(t.Gx, t.Gy, e.ONE), u.ZERO = new u(e.ZERO, e.ONE, e.ZERO);
  const p = t.nBitLength, b = Rm(u, t.endo ? Math.ceil(p / 2) : p);
  return {
    CURVE: t,
    ProjectivePoint: u,
    normPrivateKeyToScalar: a,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Dm(n) {
  const t = jd(n);
  return Fo(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Fm(n) {
  const t = Dm(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(m) {
    return bn < m && m < e.ORDER;
  }
  function c(m) {
    return ie(m, r);
  }
  function a(m) {
    return ll(m, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: h, weierstrassEquation: u, isWithinCurveOrder: p } = Lm({
    ...t,
    toBytes(m, E, R) {
      const M = E.toAffine(), H = e.toBytes(M.x), G = Bo;
      return R ? G(Uint8Array.from([E.hasEvenY() ? 2 : 3]), H) : G(Uint8Array.from([4]), H, e.toBytes(M.y));
    },
    fromBytes(m) {
      const E = m.length, R = m[0], M = m.subarray(1);
      if (E === s && (R === 2 || R === 3)) {
        const H = Jr(M);
        if (!o(H))
          throw new Error("Point is not on curve");
        const G = u(H);
        let Q = e.sqrt(G);
        const K = (Q & Ae) === Ae;
        return (R & 1) === 1 !== K && (Q = e.neg(Q)), { x: H, y: Q };
      } else if (E === i && R === 4) {
        const H = e.fromBytes(M.subarray(0, e.BYTES)), G = e.fromBytes(M.subarray(e.BYTES, 2 * e.BYTES));
        return { x: H, y: G };
      } else
        throw new Error(`Point of length ${E} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), b = (m) => ri(ii(m, t.nByteLength));
  function y(m) {
    const E = r >> Ae;
    return m > E;
  }
  function d(m) {
    return y(m) ? c(-m) : m;
  }
  const g = (m, E, R) => Jr(m.slice(E, R));
  class w {
    constructor(E, R, M) {
      this.r = E, this.s = R, this.recovery = M, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(E) {
      const R = t.nByteLength;
      return E = Pe("compactSignature", E, R * 2), new w(g(E, 0, R), g(E, R, 2 * R));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(E) {
      const { r: R, s: M } = Gr.toSig(Pe("DER", E));
      return new w(R, M);
    }
    assertValidity() {
      if (!p(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!p(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(E) {
      return new w(this.r, this.s, E);
    }
    recoverPublicKey(E) {
      const { r: R, s: M, recovery: H } = this, G = N(Pe("msgHash", E));
      if (H == null || ![0, 1, 2, 3].includes(H))
        throw new Error("recovery id invalid");
      const Q = H === 2 || H === 3 ? R + t.n : R;
      if (Q >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const K = H & 1 ? "03" : "02", Z = l.fromHex(K + b(Q)), st = a(Q), ht = c(-G * st), bt = c(M * st), at = l.BASE.multiplyAndAddUnsafe(Z, ht, bt);
      if (!at)
        throw new Error("point at infinify");
      return at.assertValidity(), at;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return y(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return si(this.toDERHex());
    }
    toDERHex() {
      return Gr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return si(this.toCompactHex());
    }
    toCompactHex() {
      return b(this.r) + b(this.s);
    }
  }
  const I = {
    isValidPrivateKey(m) {
      try {
        return h(m), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const m = $d(t.n);
      return Sm(t.randomBytes(m), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(m = 8, E = l.BASE) {
      return E._setWindowSize(m), E.multiply(BigInt(3)), E;
    }
  };
  function v(m, E = !0) {
    return l.fromPrivateKey(m).toRawBytes(E);
  }
  function T(m) {
    const E = m instanceof Uint8Array, R = typeof m == "string", M = (E || R) && m.length;
    return E ? M === s || M === i : R ? M === 2 * s || M === 2 * i : m instanceof l;
  }
  function k(m, E, R = !0) {
    if (T(m))
      throw new Error("first arg must be private key");
    if (!T(E))
      throw new Error("second arg must be public key");
    return l.fromHex(E).multiply(h(m)).toRawBytes(R);
  }
  const x = t.bits2int || function(m) {
    const E = Jr(m), R = m.length * 8 - t.nBitLength;
    return R > 0 ? E >> BigInt(R) : E;
  }, N = t.bits2int_modN || function(m) {
    return c(x(m));
  }, O = uu(t.nBitLength);
  function _(m) {
    if (typeof m != "bigint")
      throw new Error("bigint expected");
    if (!(bn <= m && m < O))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ii(m, t.nByteLength);
  }
  function U(m, E, R = P) {
    if (["recovered", "canonical"].some((lt) => lt in R))
      throw new Error("sign() legacy options not supported");
    const { hash: M, randomBytes: H } = t;
    let { lowS: G, prehash: Q, extraEntropy: K } = R;
    G == null && (G = !0), m = Pe("msgHash", m), Q && (m = Pe("prehashed msgHash", M(m)));
    const Z = N(m), st = h(E), ht = [_(st), _(Z)];
    if (K != null) {
      const lt = K === !0 ? H(e.BYTES) : K;
      ht.push(Pe("extraEntropy", lt));
    }
    const bt = Bo(...ht), at = Z;
    function Ht(lt) {
      const yt = x(lt);
      if (!p(yt))
        return;
      const Pt = a(yt), Y = l.BASE.multiply(yt).toAffine(), dt = c(Y.x);
      if (dt === bn)
        return;
      const Ut = c(Pt * c(at + dt * st));
      if (Ut === bn)
        return;
      let Be = (Y.x === dt ? 0 : 2) | Number(Y.y & Ae), Oe = Ut;
      return G && y(Ut) && (Oe = d(Ut), Be ^= 1), new w(dt, Oe, Be);
    }
    return { seed: bt, k2sig: Ht };
  }
  const P = { lowS: t.lowS, prehash: !1 }, V = { lowS: t.lowS, prehash: !1 };
  function $(m, E, R = P) {
    const { seed: M, k2sig: H } = U(m, E, R), G = t;
    return _d(G.hash.outputLen, G.nByteLength, G.hmac)(M, H);
  }
  l.BASE._setWindowSize(8);
  function rt(m, E, R, M = V) {
    var H;
    const G = m;
    if (E = Pe("msgHash", E), R = Pe("publicKey", R), "strict" in M)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: Q, prehash: K } = M;
    let Z, st;
    try {
      if (typeof G == "string" || G instanceof Uint8Array)
        try {
          Z = w.fromDER(G);
        } catch (Y) {
          if (!(Y instanceof Gr.Err))
            throw Y;
          Z = w.fromCompact(G);
        }
      else if (typeof G == "object" && typeof G.r == "bigint" && typeof G.s == "bigint") {
        const { r: Y, s: dt } = G;
        Z = new w(Y, dt);
      } else
        throw new Error("PARSE");
      st = l.fromHex(R);
    } catch (Y) {
      if (Y.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (Q && Z.hasHighS())
      return !1;
    K && (E = t.hash(E));
    const { r: ht, s: bt } = Z, at = N(E), Ht = a(bt), lt = c(at * Ht), yt = c(ht * Ht), Pt = (H = l.BASE.multiplyAndAddUnsafe(st, lt, yt)) == null ? void 0 : H.toAffine();
    return Pt ? c(Pt.x) === ht : !1;
  }
  return {
    CURVE: t,
    getPublicKey: v,
    getSharedSecret: k,
    sign: $,
    verify: rt,
    ProjectivePoint: l,
    Signature: w,
    utils: I
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Mm(n) {
  return {
    hash: n,
    hmac: (t, ...e) => bd(n, t, Iy(...e)),
    randomBytes: Ny
  };
}
function Hm(n, t) {
  const e = (r) => Fm({ ...n, ...Mm(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Wd = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), yh = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), _m = BigInt(1), ul = BigInt(2), mh = (n, t) => (n + t / ul) / t;
function Gm(n) {
  const t = Wd, e = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), a = BigInt(88), l = n * n * n % t, h = l * l * n % t, u = ge(h, e, t) * h % t, p = ge(u, e, t) * h % t, b = ge(p, ul, t) * l % t, y = ge(b, s, t) * b % t, d = ge(y, i, t) * y % t, g = ge(d, c, t) * d % t, w = ge(g, a, t) * g % t, I = ge(w, c, t) * d % t, v = ge(I, e, t) * h % t, T = ge(v, o, t) * y % t, k = ge(T, r, t) * l % t, x = ge(k, ul, t);
  if (!hl.eql(hl.sqr(x), n))
    throw new Error("Cannot find square root");
  return x;
}
const hl = km(Wd, void 0, void 0, { sqrt: Gm }), Qn = Hm({
  a: BigInt(0),
  b: BigInt(7),
  Fp: hl,
  n: yh,
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: !0,
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (n) => {
      const t = yh, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -_m * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, o = BigInt("0x100000000000000000000000000000000"), c = mh(i * n, t), a = mh(-r * n, t);
      let l = ie(n - c * e - a * s, t), h = ie(-c * r - a * i, t);
      const u = l > o, p = h > o;
      if (u && (l = t - l), p && (h = t - h), l > o || h > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: u, k1: l, k2neg: p, k2: h };
    }
  }
}, Ed);
BigInt(0);
Qn.ProjectivePoint;
const bi = "0x0000000000000000000000000000000000000000", fl = "0x0000000000000000000000000000000000000000000000000000000000000000", wh = BigInt(0), bh = BigInt(1), Ah = BigInt(2), Eh = BigInt(27), vh = BigInt(28), Xo = BigInt(35), ds = {};
function xh(n) {
  return sn(Lt(n), 32);
}
var Di, Fi, Mi, xs;
const Vm = class Ke {
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    C(this, Di), C(this, Fi), C(this, Mi), C(this, xs), Do(t, ds, "Signature"), A(this, Di, e), A(this, Fi, r), A(this, Mi, s), A(this, xs, null);
  }
  /**
   *  The ``r`` value for a signautre.
   *
   *  This represents the ``x`` coordinate of a "reference" or
   *  challenge point, from which the ``y`` can be computed.
   */
  get r() {
    return f(this, Di);
  }
  set r(t) {
    B(Kr(t) === 32, "invalid r", "value", t), A(this, Di, W(t));
  }
  /**
   *  The ``s`` value for a signature.
   */
  get s() {
    return f(this, Fi);
  }
  set s(t) {
    B(Kr(t) === 32, "invalid s", "value", t);
    const e = W(t);
    B(parseInt(e.substring(0, 3)) < 8, "non-canonical s", "value", e), A(this, Fi, e);
  }
  /**
   *  The ``v`` value for a signature.
   *
   *  Since a given ``x`` value for ``r`` has two possible values for
   *  its correspondin ``y``, the ``v`` indicates which of the two ``y``
   *  values to use.
   *
   *  It is normalized to the values ``27`` or ``28`` for legacy
   *  purposes.
   */
  get v() {
    return f(this, Mi);
  }
  set v(t) {
    const e = nt(t, "value");
    B(e === 27 || e === 28, "invalid v", "v", t), A(this, Mi, e);
  }
  /**
   *  The EIP-155 ``v`` for legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get networkV() {
    return f(this, xs);
  }
  /**
   *  The chain ID for EIP-155 legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get legacyChainId() {
    const t = this.networkV;
    return t == null ? null : Ke.getChainId(t);
  }
  /**
   *  The ``yParity`` for the signature.
   *
   *  See ``v`` for more details on how this value is used.
   */
  get yParity() {
    return this.v === 27 ? 0 : 1;
  }
  /**
   *  The [[link-eip-2098]] compact representation of the ``yParity``
   *  and ``s`` compacted into a single ``bytes32``.
   */
  get yParityAndS() {
    const t = et(this.s);
    return this.yParity && (t[0] |= 128), W(t);
  }
  /**
   *  The [[link-eip-2098]] compact representation.
   */
  get compactSerialized() {
    return Et([this.r, this.yParityAndS]);
  }
  /**
   *  The serialized representation.
   */
  get serialized() {
    return Et([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Signature { r: "${this.r}", s: "${this.s}", yParity: ${this.yParity}, networkV: ${this.networkV} }`;
  }
  /**
   *  Returns a new identical [[Signature]].
   */
  clone() {
    const t = new Ke(ds, this.r, this.s, this.v);
    return this.networkV && A(t, xs, this.networkV), t;
  }
  /**
   *  Returns a representation that is compatible with ``JSON.stringify``.
   */
  toJSON() {
    const t = this.networkV;
    return {
      _type: "signature",
      networkV: t != null ? t.toString() : null,
      r: this.r,
      s: this.s,
      v: this.v
    };
  }
  /**
   *  Compute the chain ID from the ``v`` in a legacy EIP-155 transactions.
   *
   *  @example:
   *    Signature.getChainId(45)
   *    //_result:
   *
   *    Signature.getChainId(46)
   *    //_result:
   */
  static getChainId(t) {
    const e = z(t, "v");
    return e == Eh || e == vh ? wh : (B(e >= Xo, "invalid EIP-155 v", "v", t), (e - Xo) / Ah);
  }
  /**
   *  Compute the ``v`` for a chain ID for a legacy EIP-155 transactions.
   *
   *  Legacy transactions which use [[link-eip-155]] hijack the ``v``
   *  property to include the chain ID.
   *
   *  @example:
   *    Signature.getChainIdV(5, 27)
   *    //_result:
   *
   *    Signature.getChainIdV(5, 28)
   *    //_result:
   *
   */
  static getChainIdV(t, e) {
    return z(t) * Ah + BigInt(35 + e - 27);
  }
  /**
   *  Compute the normalized legacy transaction ``v`` from a ``yParirty``,
   *  a legacy transaction ``v`` or a legacy [[link-eip-155]] transaction.
   *
   *  @example:
   *    // The values 0 and 1 imply v is actually yParity
   *    Signature.getNormalizedV(0)
   *    //_result:
   *
   *    // Legacy non-EIP-1559 transaction (i.e. 27 or 28)
   *    Signature.getNormalizedV(27)
   *    //_result:
   *
   *    // Legacy EIP-155 transaction (i.e. >= 35)
   *    Signature.getNormalizedV(46)
   *    //_result:
   *
   *    // Invalid values throw
   *    Signature.getNormalizedV(5)
   *    //_error:
   */
  static getNormalizedV(t) {
    const e = z(t);
    return e === wh || e === Eh ? 27 : e === bh || e === vh ? 28 : (B(e >= Xo, "invalid v", "v", t), e & bh ? 27 : 28);
  }
  /**
   *  Creates a new [[Signature]].
   *
   *  If no %%sig%% is provided, a new [[Signature]] is created
   *  with default values.
   *
   *  If %%sig%% is a string, it is parsed.
   */
  static from(t) {
    function e(l, h) {
      B(l, h, "signature", t);
    }
    if (t == null)
      return new Ke(ds, fl, fl, 27);
    if (typeof t == "string") {
      const l = et(t, "signature");
      if (l.length === 64) {
        const h = W(l.slice(0, 32)), u = l.slice(32, 64), p = u[0] & 128 ? 28 : 27;
        return u[0] &= 127, new Ke(ds, h, W(u), p);
      }
      if (l.length === 65) {
        const h = W(l.slice(0, 32)), u = l.slice(32, 64);
        e((u[0] & 128) === 0, "non-canonical s");
        const p = Ke.getNormalizedV(l[64]);
        return new Ke(ds, h, W(u), p);
      }
      e(!1, "invalid raw signature length");
    }
    if (t instanceof Ke)
      return t.clone();
    const r = t.r;
    e(r != null, "missing r");
    const s = xh(r), i = function(l, h) {
      if (l != null)
        return xh(l);
      if (h != null) {
        e(gt(h, 32), "invalid yParityAndS");
        const u = et(h);
        return u[0] &= 127, W(u);
      }
      e(!1, "missing s");
    }(t.s, t.yParityAndS);
    e((et(i)[0] & 128) == 0, "non-canonical s");
    const { networkV: o, v: c } = function(l, h, u) {
      if (l != null) {
        const p = z(l);
        return {
          networkV: p >= Xo ? p : void 0,
          v: Ke.getNormalizedV(p)
        };
      }
      if (h != null)
        return e(gt(h, 32), "invalid yParityAndS"), { v: et(h)[0] & 128 ? 28 : 27 };
      if (u != null) {
        switch (nt(u, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        e(!1, "invalid yParity");
      }
      e(!1, "missing v");
    }(t.v, t.yParityAndS, t.yParity), a = new Ke(ds, s, i, c);
    return o && A(a, xs, o), e(t.yParity == null || nt(t.yParity, "sig.yParity") === a.yParity, "yParity mismatch"), e(t.yParityAndS == null || t.yParityAndS === a.yParityAndS, "yParityAndS mismatch"), a;
  }
};
Di = /* @__PURE__ */ new WeakMap(), Fi = /* @__PURE__ */ new WeakMap(), Mi = /* @__PURE__ */ new WeakMap(), xs = /* @__PURE__ */ new WeakMap();
let an = Vm;
var qn;
const $m = class Is {
  /**
   *  Creates a new **SigningKey** for %%privateKey%%.
   */
  constructor(t) {
    C(this, qn), B(Kr(t) === 32, "invalid private key", "privateKey", "[REDACTED]"), A(this, qn, W(t));
  }
  /**
   *  The private key.
   */
  get privateKey() {
    return f(this, qn);
  }
  /**
   *  The uncompressed public key.
   *
   * This will always begin with the prefix ``0x04`` and be 132
   * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
   */
  get publicKey() {
    return Is.computePublicKey(f(this, qn));
  }
  /**
   *  The compressed public key.
   *
   *  This will always begin with either the prefix ``0x02`` or ``0x03``
   *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
   *  nibbles)
   */
  get compressedPublicKey() {
    return Is.computePublicKey(f(this, qn), !0);
  }
  /**
   *  Return the signature of the signed %%digest%%.
   */
  sign(t) {
    B(Kr(t) === 32, "invalid digest length", "digest", t);
    const e = Qn.sign(Yt(t), Yt(f(this, qn)), {
      lowS: !0
    });
    return an.from({
      r: lr(e.r, 32),
      s: lr(e.s, 32),
      v: e.recovery ? 28 : 27
    });
  }
  /**
   *  Returns the [[link-wiki-ecdh]] shared secret between this
   *  private key and the %%other%% key.
   *
   *  The %%other%% key may be any type of key, a raw public key,
   *  a compressed/uncompressed pubic key or aprivate key.
   *
   *  Best practice is usually to use a cryptographic hash on the
   *  returned value before using it as a symetric secret.
   *
   *  @example:
   *    sign1 = new SigningKey(id("some-secret-1"))
   *    sign2 = new SigningKey(id("some-secret-2"))
   *
   *    // Notice that privA.computeSharedSecret(pubB)...
   *    sign1.computeSharedSecret(sign2.publicKey)
   *    //_result:
   *
   *    // ...is equal to privB.computeSharedSecret(pubA).
   *    sign2.computeSharedSecret(sign1.publicKey)
   *    //_result:
   */
  computeSharedSecret(t) {
    const e = Is.computePublicKey(t);
    return W(Qn.getSharedSecret(Yt(f(this, qn)), et(e), !1));
  }
  /**
   *  Compute the public key for %%key%%, optionally %%compressed%%.
   *
   *  The %%key%% may be any type of key, a raw public key, a
   *  compressed/uncompressed public key or private key.
   *
   *  @example:
   *    sign = new SigningKey(id("some-secret"));
   *
   *    // Compute the uncompressed public key for a private key
   *    SigningKey.computePublicKey(sign.privateKey)
   *    //_result:
   *
   *    // Compute the compressed public key for a private key
   *    SigningKey.computePublicKey(sign.privateKey, true)
   *    //_result:
   *
   *    // Compute the uncompressed public key
   *    SigningKey.computePublicKey(sign.publicKey, false);
   *    //_result:
   *
   *    // Compute the Compressed a public key
   *    SigningKey.computePublicKey(sign.publicKey, true);
   *    //_result:
   */
  static computePublicKey(t, e) {
    let r = et(t, "key");
    if (r.length === 32) {
      const i = Qn.getPublicKey(r, !!e);
      return W(i);
    }
    if (r.length === 64) {
      const i = new Uint8Array(65);
      i[0] = 4, i.set(r, 1), r = i;
    }
    const s = Qn.ProjectivePoint.fromHex(r);
    return W(s.toRawBytes(e));
  }
  /**
   *  Returns the public key for the private key which produced the
   *  %%signature%% for the given %%digest%%.
   *
   *  @example:
   *    key = new SigningKey(id("some-secret"))
   *    digest = id("hello world")
   *    sig = key.sign(digest)
   *
   *    // Notice the signer public key...
   *    key.publicKey
   *    //_result:
   *
   *    // ...is equal to the recovered public key
   *    SigningKey.recoverPublicKey(digest, sig)
   *    //_result:
   *
   */
  static recoverPublicKey(t, e) {
    B(Kr(t) === 32, "invalid digest length", "digest", t);
    const r = an.from(e);
    let s = Qn.Signature.fromCompact(Yt(Et([r.r, r.s])));
    s = s.addRecoveryBit(r.yParity);
    const i = s.recoverPublicKey(Yt(t));
    return B(i != null, "invalid signautre for digest", "signature", e), "0x" + i.toHex(!1);
  }
  /**
   *  Returns the point resulting from adding the ellipic curve points
   *  %%p0%% and %%p1%%.
   *
   *  This is not a common function most developers should require, but
   *  can be useful for certain privacy-specific techniques.
   *
   *  For example, it is used by [[HDNodeWallet]] to compute child
   *  addresses from parent public keys and chain codes.
   */
  static addPoints(t, e, r) {
    const s = Qn.ProjectivePoint.fromHex(Is.computePublicKey(t).substring(2)), i = Qn.ProjectivePoint.fromHex(Is.computePublicKey(e).substring(2));
    return "0x" + s.add(i).toHex(!!r);
  }
};
qn = /* @__PURE__ */ new WeakMap();
let hu = $m;
const jm = BigInt(0), Wm = BigInt(36);
function Ih(n) {
  n = n.toLowerCase();
  const t = n.substring(2).split(""), e = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    e[s] = t[s].charCodeAt(0);
  const r = et(It(e));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const fu = {};
for (let n = 0; n < 10; n++)
  fu[String(n)] = String(n);
for (let n = 0; n < 26; n++)
  fu[String.fromCharCode(65 + n)] = String(10 + n);
const Nh = 15;
function zm(n) {
  n = n.toUpperCase(), n = n.substring(4) + n.substring(0, 2) + "00";
  let t = n.split("").map((r) => fu[r]).join("");
  for (; t.length >= Nh; ) {
    let r = t.substring(0, Nh);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
const Qm = function() {
  const n = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    n[e] = BigInt(t);
  }
  return n;
}();
function qm(n) {
  n = n.toLowerCase();
  let t = jm;
  for (let e = 0; e < n.length; e++)
    t = t * Wm + Qm[n[e]];
  return t;
}
function ft(n) {
  if (B(typeof n == "string", "invalid address", "address", n), n.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    n.startsWith("0x") || (n = "0x" + n);
    const t = Ih(n);
    return B(!n.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === n, "bad address checksum", "address", n), t;
  }
  if (n.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    B(n.substring(2, 4) === zm(n), "bad icap checksum", "address", n);
    let t = qm(n.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return Ih("0x" + t);
  }
  B(!1, "invalid address", "address", n);
}
function Km(n) {
  const t = ft(n.from);
  let e = z(n.nonce, "tx.nonce").toString(16);
  return e === "0" ? e = "0x" : e.length % 2 ? e = "0x0" + e : e = "0x" + e, ft(xt(It(rs([t, e])), 12));
}
function zd(n) {
  return n && typeof n.getAddress == "function";
}
async function xc(n, t) {
  const e = await t;
  return (e == null || e === "0x0000000000000000000000000000000000000000") && (D(typeof n != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: n }), B(!1, "invalid AddressLike value; did not resolve to a value address", "target", n)), ft(e);
}
function te(n, t) {
  if (typeof n == "string")
    return n.match(/^0x[0-9a-f]{40}$/i) ? ft(n) : (D(t != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), xc(n, t.resolveName(n)));
  if (zd(n))
    return xc(n, n.getAddress());
  if (n && typeof n.then == "function")
    return xc(n, n);
  B(!1, "unsupported addressable value", "target", n);
}
const dn = {};
function j(n, t) {
  let e = !1;
  return t < 0 && (e = !0, t *= -1), new ae(dn, `${e ? "" : "u"}int${t}`, n, { signed: e, width: t });
}
function ct(n, t) {
  return new ae(dn, `bytes${t || ""}`, n, { size: t });
}
const Bh = Symbol.for("_ethers_typed");
var Ns;
const Jm = class Kn {
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s) {
    S(this, "type"), S(this, "value"), C(this, Ns), S(this, "_typedSymbol"), s == null && (s = null), Do(dn, t, "Typed"), q(this, { _typedSymbol: Bh, type: e, value: r }), A(this, Ns, s), this.format();
  }
  /**
   *  Format the type as a Human-Readable type.
   */
  format() {
    if (this.type === "array")
      throw new Error("");
    if (this.type === "dynamicArray")
      throw new Error("");
    return this.type === "tuple" ? `tuple(${this.value.map((t) => t.format()).join(",")})` : this.type;
  }
  /**
   *  The default value returned by this type.
   */
  defaultValue() {
    return 0;
  }
  /**
   *  The minimum value for numeric types.
   */
  minValue() {
    return 0;
  }
  /**
   *  The maximum value for numeric types.
   */
  maxValue() {
    return 0;
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedBigInt]].
   */
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedData]].
   */
  isData() {
    return this.type.startsWith("bytes");
  }
  /**
   *  Returns ``true`` and provides a type guard is this is a [[TypedString]].
   */
  isString() {
    return this.type === "string";
  }
  /**
   *  Returns the tuple name, if this is a tuple. Throws otherwise.
   */
  get tupleName() {
    if (this.type !== "tuple")
      throw TypeError("not a tuple");
    return f(this, Ns);
  }
  // Returns the length of this type as an array
  // - `null` indicates the length is unforced, it could be dynamic
  // - `-1` indicates the length is dynamic
  // - any other value indicates it is a static array and is its length
  /**
   *  Returns the length of the array type or ``-1`` if it is dynamic.
   *
   *  Throws if the type is not an array.
   */
  get arrayLength() {
    if (this.type !== "array")
      throw TypeError("not an array");
    return f(this, Ns) === !0 ? -1 : f(this, Ns) === !1 ? this.value.length : null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(t, e) {
    return new Kn(dn, t, e);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(t) {
    return j(t, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(t) {
    return j(t, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(t) {
    return j(t, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(t) {
    return j(t, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(t) {
    return j(t, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(t) {
    return j(t, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(t) {
    return j(t, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(t) {
    return j(t, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(t) {
    return j(t, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(t) {
    return j(t, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(t) {
    return j(t, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(t) {
    return j(t, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(t) {
    return j(t, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(t) {
    return j(t, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(t) {
    return j(t, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(t) {
    return j(t, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(t) {
    return j(t, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(t) {
    return j(t, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(t) {
    return j(t, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(t) {
    return j(t, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(t) {
    return j(t, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(t) {
    return j(t, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(t) {
    return j(t, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(t) {
    return j(t, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(t) {
    return j(t, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(t) {
    return j(t, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(t) {
    return j(t, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(t) {
    return j(t, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(t) {
    return j(t, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(t) {
    return j(t, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(t) {
    return j(t, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(t) {
    return j(t, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(t) {
    return j(t, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(t) {
    return j(t, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(t) {
    return j(t, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(t) {
    return j(t, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(t) {
    return j(t, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(t) {
    return j(t, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(t) {
    return j(t, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(t) {
    return j(t, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(t) {
    return j(t, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(t) {
    return j(t, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(t) {
    return j(t, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(t) {
    return j(t, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(t) {
    return j(t, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(t) {
    return j(t, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(t) {
    return j(t, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(t) {
    return j(t, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(t) {
    return j(t, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(t) {
    return j(t, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(t) {
    return j(t, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(t) {
    return j(t, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(t) {
    return j(t, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(t) {
    return j(t, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(t) {
    return j(t, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(t) {
    return j(t, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(t) {
    return j(t, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(t) {
    return j(t, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(t) {
    return j(t, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(t) {
    return j(t, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(t) {
    return j(t, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(t) {
    return j(t, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(t) {
    return j(t, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(t) {
    return j(t, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(t) {
    return j(t, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(t) {
    return j(t, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(t) {
    return ct(t, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(t) {
    return ct(t, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(t) {
    return ct(t, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(t) {
    return ct(t, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(t) {
    return ct(t, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(t) {
    return ct(t, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(t) {
    return ct(t, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(t) {
    return ct(t, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(t) {
    return ct(t, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(t) {
    return ct(t, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(t) {
    return ct(t, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(t) {
    return ct(t, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(t) {
    return ct(t, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(t) {
    return ct(t, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(t) {
    return ct(t, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(t) {
    return ct(t, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(t) {
    return ct(t, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(t) {
    return ct(t, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(t) {
    return ct(t, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(t) {
    return ct(t, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(t) {
    return ct(t, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(t) {
    return ct(t, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(t) {
    return ct(t, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(t) {
    return ct(t, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(t) {
    return ct(t, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(t) {
    return ct(t, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(t) {
    return ct(t, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(t) {
    return ct(t, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(t) {
    return ct(t, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(t) {
    return ct(t, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(t) {
    return ct(t, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(t) {
    return ct(t, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(t) {
    return new Kn(dn, "address", t);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(t) {
    return new Kn(dn, "bool", !!t);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(t) {
    return new Kn(dn, "bytes", t);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(t) {
    return new Kn(dn, "string", t);
  }
  /**
   *  Return a new ``array`` type for %%v%%, allowing %%dynamic%% length.
   */
  static array(t, e) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``tuple`` type for %%v%%, with the optional %%name%%.
   */
  static tuple(t, e) {
    throw new Error("not implemented yet");
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static overrides(t) {
    return new Kn(dn, "overrides", Object.assign({}, t));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(t) {
    return t && typeof t == "object" && "_typedSymbol" in t && t._typedSymbol === Bh;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(t, e) {
    if (Kn.isTyped(t)) {
      if (t.type !== e)
        throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
      return t.value;
    }
    return t;
  }
};
Ns = /* @__PURE__ */ new WeakMap();
let ae = Jm, Zm = class extends Rn {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    let r = ae.dereference(e, "string");
    try {
      r = ft(r);
    } catch (s) {
      return this._throwError(s.message, e);
    }
    return t.writeValue(r);
  }
  decode(t) {
    return ft(lr(t.readValue(), 20));
  }
}, Ym = class extends Rn {
  constructor(t) {
    super(t.name, t.type, "_", t.dynamic), S(this, "coder"), this.coder = t;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(t, e) {
    return this.coder.encode(t, e);
  }
  decode(t) {
    return this.coder.decode(t);
  }
};
function Qd(n, t, e) {
  let r = [];
  if (Array.isArray(e))
    r = e;
  else if (e && typeof e == "object") {
    let a = {};
    r = t.map((l) => {
      const h = l.localName;
      return D(h, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: l }, value: e }), D(!a[h], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: l }, value: e }), a[h] = !0, e[h];
    });
  } else
    B(!1, "invalid tuple value", "tuple", e);
  B(t.length === r.length, "types/value length mismatch", "tuple", e);
  let s = new il(), i = new il(), o = [];
  t.forEach((a, l) => {
    let h = r[l];
    if (a.dynamic) {
      let u = i.length;
      a.encode(i, h);
      let p = s.writeUpdatableValue();
      o.push((b) => {
        p(b + u);
      });
    } else
      a.encode(s, h);
  }), o.forEach((a) => {
    a(s.length);
  });
  let c = n.appendWriter(s);
  return c += n.appendWriter(i), c;
}
function qd(n, t) {
  let e = [], r = [], s = n.subReader(0);
  return t.forEach((i) => {
    let o = null;
    if (i.dynamic) {
      let c = n.readIndex(), a = s.subReader(c);
      try {
        o = i.decode(a);
      } catch (l) {
        if (zt(l, "BUFFER_OVERRUN"))
          throw l;
        o = l, o.baseType = i.name, o.name = i.localName, o.type = i.type;
      }
    } else
      try {
        o = i.decode(n);
      } catch (c) {
        if (zt(c, "BUFFER_OVERRUN"))
          throw c;
        o = c, o.baseType = i.name, o.name = i.localName, o.type = i.type;
      }
    if (o == null)
      throw new Error("investigate");
    e.push(o), r.push(i.localName || null);
  }), Da.fromItems(e, r);
}
let Xm = class extends Rn {
  constructor(t, e, r) {
    const s = t.type + "[" + (e >= 0 ? e : "") + "]", i = e === -1 || t.dynamic;
    super("array", s, r, i), S(this, "coder"), S(this, "length"), q(this, { coder: t, length: e });
  }
  defaultValue() {
    const t = this.coder.defaultValue(), e = [];
    for (let r = 0; r < this.length; r++)
      e.push(t);
    return e;
  }
  encode(t, e) {
    const r = ae.dereference(e, "array");
    Array.isArray(r) || this._throwError("expected array value", r);
    let s = this.length;
    s === -1 && (s = r.length, t.writeValue(r.length)), Xf(r.length, s, "coder array" + (this.localName ? " " + this.localName : ""));
    let i = [];
    for (let o = 0; o < r.length; o++)
      i.push(this.coder);
    return Qd(t, i, r);
  }
  decode(t) {
    let e = this.length;
    e === -1 && (e = t.readIndex(), D(e * Xt <= t.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: t.bytes, offset: e * Xt, length: t.dataLength }));
    let r = [];
    for (let s = 0; s < e; s++)
      r.push(new Ym(this.coder));
    return qd(t, r);
  }
}, tw = class extends Rn {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    const r = ae.dereference(e, "bool");
    return t.writeValue(r ? 1 : 0);
  }
  decode(t) {
    return !!t.readValue();
  }
};
class Kd extends Rn {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = Yt(e);
    let r = t.writeValue(e.length);
    return r += t.writeBytes(e), r;
  }
  decode(t) {
    return t.readBytes(t.readIndex(), !0);
  }
}
let ew = class extends Kd {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return W(super.decode(t));
  }
}, nw = class extends Rn {
  constructor(t, e) {
    let r = "bytes" + String(t);
    super(r, r, e, !1), S(this, "size"), q(this, { size: t }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(t, e) {
    let r = Yt(ae.dereference(e, this.type));
    return r.length !== this.size && this._throwError("incorrect data length", e), t.writeBytes(r);
  }
  decode(t) {
    return W(t.readBytes(this.size));
  }
};
const rw = new Uint8Array([]);
let sw = class extends Rn {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes(rw);
  }
  decode(t) {
    return t.readBytes(0), null;
  }
};
const iw = BigInt(0), ow = BigInt(1), aw = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class cw extends Rn {
  constructor(t, e, r) {
    const s = (e ? "int" : "uint") + t * 8;
    super(s, s, r, !1), S(this, "size"), S(this, "signed"), q(this, { size: t, signed: e }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(t, e) {
    let r = z(ae.dereference(e, this.type)), s = Hr(aw, Xt * 8);
    if (this.signed) {
      let i = Hr(s, this.size * 8 - 1);
      (r > i || r < -(i + ow)) && this._throwError("value out-of-bounds", e), r = ru(r, 8 * Xt);
    } else (r < iw || r > Hr(s, this.size * 8)) && this._throwError("value out-of-bounds", e);
    return t.writeValue(r);
  }
  decode(t) {
    let e = Hr(t.readValue(), this.size * 8);
    return this.signed && (e = Pa(e, this.size * 8)), e;
  }
}
let lw = class extends Kd {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, Ve(ae.dereference(e, "string")));
  }
  decode(t) {
    return Ua(super.decode(t));
  }
}, la = class extends Rn {
  constructor(t, e) {
    let r = !1;
    const s = [];
    t.forEach((o) => {
      o.dynamic && (r = !0), s.push(o.type);
    });
    const i = "tuple(" + s.join(",") + ")";
    super("tuple", i, e, r), S(this, "coders"), q(this, { coders: Object.freeze(t.slice()) });
  }
  defaultValue() {
    const t = [];
    this.coders.forEach((r) => {
      t.push(r.defaultValue());
    });
    const e = this.coders.reduce((r, s) => {
      const i = s.localName;
      return i && (r[i] || (r[i] = 0), r[i]++), r;
    }, {});
    return this.coders.forEach((r, s) => {
      let i = r.localName;
      !i || e[i] !== 1 || (i === "length" && (i = "_length"), t[i] == null && (t[i] = t[s]));
    }), Object.freeze(t);
  }
  encode(t, e) {
    const r = ae.dereference(e, "tuple");
    return Qd(t, this.coders, r);
  }
  decode(t) {
    return qd(t, this.coders);
  }
};
function ss(n) {
  return It(Ve(n));
}
var uw = "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";
const Oh = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), kh = 4;
function hw(n) {
  let t = 0;
  function e() {
    return n[t++] << 8 | n[t++];
  }
  let r = e(), s = 1, i = [0, 1];
  for (let k = 1; k < r; k++)
    i.push(s += e());
  let o = e(), c = t;
  t += o;
  let a = 0, l = 0;
  function h() {
    return a == 0 && (l = l << 8 | n[t++], a = 8), l >> --a & 1;
  }
  const u = 31, p = 2 ** u, b = p >>> 1, y = b >> 1, d = p - 1;
  let g = 0;
  for (let k = 0; k < u; k++) g = g << 1 | h();
  let w = [], I = 0, v = p;
  for (; ; ) {
    let k = Math.floor(((g - I + 1) * s - 1) / v), x = 0, N = r;
    for (; N - x > 1; ) {
      let U = x + N >>> 1;
      k < i[U] ? N = U : x = U;
    }
    if (x == 0) break;
    w.push(x);
    let O = I + Math.floor(v * i[x] / s), _ = I + Math.floor(v * i[x + 1] / s) - 1;
    for (; !((O ^ _) & b); )
      g = g << 1 & d | h(), O = O << 1 & d, _ = _ << 1 & d | 1;
    for (; O & ~_ & y; )
      g = g & b | g << 1 & d >>> 1 | h(), O = O << 1 ^ b, _ = (_ ^ b) << 1 | b | 1;
    I = O, v = 1 + _ - O;
  }
  let T = r - 4;
  return w.map((k) => {
    switch (k - T) {
      case 3:
        return T + 65792 + (n[c++] << 16 | n[c++] << 8 | n[c++]);
      case 2:
        return T + 256 + (n[c++] << 8 | n[c++]);
      case 1:
        return T + n[c++];
      default:
        return k - 1;
    }
  });
}
function fw(n) {
  let t = 0;
  return () => n[t++];
}
function Jd(n) {
  return fw(hw(dw(n)));
}
function dw(n) {
  let t = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((s, i) => t[s.charCodeAt(0)] = i);
  let e = n.length, r = new Uint8Array(6 * e >> 3);
  for (let s = 0, i = 0, o = 0, c = 0; s < e; s++)
    c = c << 6 | t[n.charCodeAt(s)], o += 6, o >= 8 && (r[i++] = c >> (o -= 8));
  return r;
}
function pw(n) {
  return n & 1 ? ~n >> 1 : n >> 1;
}
function gw(n, t) {
  let e = Array(n);
  for (let r = 0, s = 0; r < n; r++) e[r] = s += pw(t());
  return e;
}
function Oo(n, t = 0) {
  let e = [];
  for (; ; ) {
    let r = n(), s = n();
    if (!s) break;
    t += r;
    for (let i = 0; i < s; i++)
      e.push(t + i);
    t += s + 1;
  }
  return e;
}
function Zd(n) {
  return ko(() => {
    let t = Oo(n);
    if (t.length) return t;
  });
}
function Yd(n) {
  let t = [];
  for (; ; ) {
    let e = n();
    if (e == 0) break;
    t.push(yw(e, n));
  }
  for (; ; ) {
    let e = n() - 1;
    if (e < 0) break;
    t.push(mw(e, n));
  }
  return t.flat();
}
function ko(n) {
  let t = [];
  for (; ; ) {
    let e = n(t.length);
    if (!e) break;
    t.push(e);
  }
  return t;
}
function Xd(n, t, e) {
  let r = Array(n).fill().map(() => []);
  for (let s = 0; s < t; s++)
    gw(n, e).forEach((i, o) => r[o].push(i));
  return r;
}
function yw(n, t) {
  let e = 1 + t(), r = t(), s = ko(t);
  return Xd(s.length, 1 + n, t).flatMap((i, o) => {
    let [c, ...a] = i;
    return Array(s[o]).fill().map((l, h) => {
      let u = h * r;
      return [c + h * e, a.map((p) => p + u)];
    });
  });
}
function mw(n, t) {
  let e = 1 + t();
  return Xd(e, 1 + n, t).map((r) => [r[0], r.slice(1)]);
}
function ww(n) {
  let t = [], e = Oo(n);
  return s(r([]), []), t;
  function r(i) {
    let o = n(), c = ko(() => {
      let a = Oo(n).map((l) => e[l]);
      if (a.length) return r(a);
    });
    return { S: o, B: c, Q: i };
  }
  function s({ S: i, B: o }, c, a) {
    if (!(i & 4 && a === c[c.length - 1])) {
      i & 2 && (a = c[c.length - 1]), i & 1 && t.push(c);
      for (let l of o)
        for (let h of l.Q)
          s(l, [...c, h], a);
    }
  }
}
function bw(n) {
  return n.toString(16).toUpperCase().padStart(2, "0");
}
function tp(n) {
  return `{${bw(n)}}`;
}
function Aw(n) {
  let t = [];
  for (let e = 0, r = n.length; e < r; ) {
    let s = n.codePointAt(e);
    e += s < 65536 ? 1 : 2, t.push(s);
  }
  return t;
}
function oi(n) {
  let t = n.length;
  if (t < 4096) return String.fromCodePoint(...n);
  let e = [];
  for (let r = 0; r < t; )
    e.push(String.fromCodePoint(...n.slice(r, r += 4096)));
  return e.join("");
}
function Ew(n, t) {
  let e = n.length, r = e - t.length;
  for (let s = 0; r == 0 && s < e; s++) r = n[s] - t[s];
  return r;
}
var vw = "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";
const So = 44032, Ma = 4352, Ha = 4449, _a = 4519, ep = 19, np = 21, ai = 28, Ga = np * ai, xw = ep * Ga, Iw = So + xw, Nw = Ma + ep, Bw = Ha + np, Ow = _a + ai;
function Hi(n) {
  return n >> 24 & 255;
}
function rp(n) {
  return n & 16777215;
}
let dl, Sh, pl, ua;
function kw() {
  let n = Jd(vw);
  dl = new Map(Zd(n).flatMap((t, e) => t.map((r) => [r, e + 1 << 24]))), Sh = new Set(Oo(n)), pl = /* @__PURE__ */ new Map(), ua = /* @__PURE__ */ new Map();
  for (let [t, e] of Yd(n)) {
    if (!Sh.has(t) && e.length == 2) {
      let [r, s] = e, i = ua.get(r);
      i || (i = /* @__PURE__ */ new Map(), ua.set(r, i)), i.set(s, t);
    }
    pl.set(t, e.reverse());
  }
}
function sp(n) {
  return n >= So && n < Iw;
}
function Sw(n, t) {
  if (n >= Ma && n < Nw && t >= Ha && t < Bw)
    return So + (n - Ma) * Ga + (t - Ha) * ai;
  if (sp(n) && t > _a && t < Ow && (n - So) % ai == 0)
    return n + (t - _a);
  {
    let e = ua.get(n);
    return e && (e = e.get(t), e) ? e : -1;
  }
}
function ip(n) {
  dl || kw();
  let t = [], e = [], r = !1;
  function s(i) {
    let o = dl.get(i);
    o && (r = !0, i |= o), t.push(i);
  }
  for (let i of n)
    for (; ; ) {
      if (i < 128)
        t.push(i);
      else if (sp(i)) {
        let o = i - So, c = o / Ga | 0, a = o % Ga / ai | 0, l = o % ai;
        s(Ma + c), s(Ha + a), l > 0 && s(_a + l);
      } else {
        let o = pl.get(i);
        o ? e.push(...o) : s(i);
      }
      if (!e.length) break;
      i = e.pop();
    }
  if (r && t.length > 1) {
    let i = Hi(t[0]);
    for (let o = 1; o < t.length; o++) {
      let c = Hi(t[o]);
      if (c == 0 || i <= c) {
        i = c;
        continue;
      }
      let a = o - 1;
      for (; ; ) {
        let l = t[a + 1];
        if (t[a + 1] = t[a], t[a] = l, !a || (i = Hi(t[--a]), i <= c)) break;
      }
      i = Hi(t[o]);
    }
  }
  return t;
}
function Tw(n) {
  let t = [], e = [], r = -1, s = 0;
  for (let i of n) {
    let o = Hi(i), c = rp(i);
    if (r == -1)
      o == 0 ? r = c : t.push(c);
    else if (s > 0 && s >= o)
      o == 0 ? (t.push(r, ...e), e.length = 0, r = c) : e.push(c), s = o;
    else {
      let a = Sw(r, c);
      a >= 0 ? r = a : s == 0 && o == 0 ? (t.push(r), r = c) : (e.push(c), s = o);
    }
  }
  return r >= 0 && t.push(r, ...e), t;
}
function op(n) {
  return ip(n).map(rp);
}
function Rw(n) {
  return Tw(ip(n));
}
const Th = 45, ap = ".", cp = 65039, lp = 1, Va = (n) => Array.from(n);
function To(n, t) {
  return n.P.has(t) || n.Q.has(t);
}
class Cw extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let gl, up, Vr, yl, hp, Ks, Ic, Bs, yr, Rh, ml;
function du() {
  if (gl) return;
  let n = Jd(uw);
  const t = () => Oo(n), e = () => new Set(t()), r = (h, u) => u.forEach((p) => h.add(p));
  gl = new Map(Yd(n)), up = e(), Vr = t(), yl = new Set(t().map((h) => Vr[h])), Vr = new Set(Vr), hp = e(), e();
  let s = Zd(n), i = n();
  const o = () => {
    let h = /* @__PURE__ */ new Set();
    return t().forEach((u) => r(h, s[u])), r(h, t()), h;
  };
  Ks = ko((h) => {
    let u = ko(n).map((p) => p + 96);
    if (u.length) {
      let p = h >= i;
      u[0] -= 32, u = oi(u), p && (u = `Restricted[${u}]`);
      let b = o(), y = o(), d = !n();
      return { N: u, P: b, Q: y, M: d, R: p };
    }
  }), Ic = e(), Bs = /* @__PURE__ */ new Map();
  let c = t().concat(Va(Ic)).sort((h, u) => h - u);
  c.forEach((h, u) => {
    let p = n(), b = c[u] = p ? c[u - p] : { V: [], M: /* @__PURE__ */ new Map() };
    b.V.push(h), Ic.has(h) || Bs.set(h, b);
  });
  for (let { V: h, M: u } of new Set(Bs.values())) {
    let p = [];
    for (let y of h) {
      let d = Ks.filter((w) => To(w, y)), g = p.find(({ G: w }) => d.some((I) => w.has(I)));
      g || (g = { G: /* @__PURE__ */ new Set(), V: [] }, p.push(g)), g.V.push(y), r(g.G, d);
    }
    let b = p.flatMap((y) => Va(y.G));
    for (let { G: y, V: d } of p) {
      let g = new Set(b.filter((w) => !y.has(w)));
      for (let w of d)
        u.set(w, g);
    }
  }
  yr = /* @__PURE__ */ new Set();
  let a = /* @__PURE__ */ new Set();
  const l = (h) => yr.has(h) ? a.add(h) : yr.add(h);
  for (let h of Ks) {
    for (let u of h.P) l(u);
    for (let u of h.Q) l(u);
  }
  for (let h of yr)
    !Bs.has(h) && !a.has(h) && Bs.set(h, lp);
  r(yr, op(yr)), Rh = ww(n).map((h) => Cw.from(h)).sort(Ew), ml = /* @__PURE__ */ new Map();
  for (let h of Rh) {
    let u = [ml];
    for (let p of h) {
      let b = u.map((y) => {
        let d = y.get(p);
        return d || (d = /* @__PURE__ */ new Map(), y.set(p, d)), d;
      });
      p === cp ? u.push(...b) : u = b;
    }
    for (let p of u)
      p.V = h;
  }
}
function pu(n) {
  return (fp(n) ? "" : `${gu(Xa([n]))} `) + tp(n);
}
function gu(n) {
  return `"${n}"‎`;
}
function Pw(n) {
  if (n.length >= 4 && n[2] == Th && n[3] == Th)
    throw new Error(`invalid label extension: "${oi(n.slice(0, 4))}"`);
}
function Uw(n) {
  for (let t = n.lastIndexOf(95); t > 0; )
    if (n[--t] !== 95)
      throw new Error("underscore allowed only at start");
}
function Lw(n) {
  let t = n[0], e = Oh.get(t);
  if (e) throw mo(`leading ${e}`);
  let r = n.length, s = -1;
  for (let i = 1; i < r; i++) {
    t = n[i];
    let o = Oh.get(t);
    if (o) {
      if (s == i) throw mo(`${e} + ${o}`);
      s = i + 1, e = o;
    }
  }
  if (s == r) throw mo(`trailing ${e}`);
}
function Xa(n, t = 1 / 0, e = tp) {
  let r = [];
  Dw(n[0]) && r.push("◌"), n.length > t && (t >>= 1, n = [...n.slice(0, t), 8230, ...n.slice(-t)]);
  let s = 0, i = n.length;
  for (let o = 0; o < i; o++) {
    let c = n[o];
    fp(c) && (r.push(oi(n.slice(s, o))), r.push(e(c)), s = o + 1);
  }
  return r.push(oi(n.slice(s, i))), r.join("");
}
function Dw(n) {
  return du(), Vr.has(n);
}
function fp(n) {
  return du(), hp.has(n);
}
function Fw(n) {
  return Gw(Mw(n, Rw, jw));
}
function Mw(n, t, e) {
  if (!n) return [];
  du();
  let r = 0;
  return n.split(ap).map((s) => {
    let i = Aw(s), o = {
      input: i,
      offset: r
      // codepoint, not substring!
    };
    r += i.length + 1;
    try {
      let c = o.tokens = $w(i, t, e), a = c.length, l;
      if (!a)
        throw new Error("empty label");
      let h = o.output = c.flat();
      if (Uw(h), !(o.emoji = a > 1 || c[0].is_emoji) && h.every((u) => u < 128))
        Pw(h), l = "ASCII";
      else {
        let u = c.flatMap((p) => p.is_emoji ? [] : p);
        if (!u.length)
          l = "Emoji";
        else {
          if (Vr.has(h[0])) throw mo("leading combining mark");
          for (let y = 1; y < a; y++) {
            let d = c[y];
            if (!d.is_emoji && Vr.has(d[0]))
              throw mo(`emoji + combining mark: "${oi(c[y - 1])} + ${Xa([d[0]])}"`);
          }
          Lw(h);
          let p = Va(new Set(u)), [b] = _w(p);
          Vw(b, u), Hw(b, p), l = b.N;
        }
      }
      o.type = l;
    } catch (c) {
      o.error = c;
    }
    return o;
  });
}
function Hw(n, t) {
  let e, r = [];
  for (let s of t) {
    let i = Bs.get(s);
    if (i === lp) return;
    if (i) {
      let o = i.M.get(s);
      if (e = e ? e.filter((c) => o.has(c)) : Va(o), !e.length) return;
    } else
      r.push(s);
  }
  if (e) {
    for (let s of e)
      if (r.every((i) => To(s, i)))
        throw new Error(`whole-script confusable: ${n.N}/${s.N}`);
  }
}
function _w(n) {
  let t = Ks;
  for (let e of n) {
    let r = t.filter((s) => To(s, e));
    if (!r.length)
      throw Ks.some((s) => To(s, e)) ? pp(t[0], e) : dp(e);
    if (t = r, r.length == 1) break;
  }
  return t;
}
function Gw(n) {
  return n.map(({ input: t, error: e, output: r }) => {
    if (e) {
      let s = e.message;
      throw new Error(n.length == 1 ? s : `Invalid label ${gu(Xa(t, 63))}: ${s}`);
    }
    return oi(r);
  }).join(ap);
}
function dp(n) {
  return new Error(`disallowed character: ${pu(n)}`);
}
function pp(n, t) {
  let e = pu(t), r = Ks.find((s) => s.P.has(t));
  return r && (e = `${r.N} ${e}`), new Error(`illegal mixture: ${n.N} + ${e}`);
}
function mo(n) {
  return new Error(`illegal placement: ${n}`);
}
function Vw(n, t) {
  for (let e of t)
    if (!To(n, e))
      throw pp(n, e);
  if (n.M) {
    let e = op(t);
    for (let r = 1, s = e.length; r < s; r++)
      if (yl.has(e[r])) {
        let i = r + 1;
        for (let o; i < s && yl.has(o = e[i]); i++)
          for (let c = r; c < i; c++)
            if (e[c] == o)
              throw new Error(`duplicate non-spacing marks: ${pu(o)}`);
        if (i - r > kh)
          throw new Error(`excessive non-spacing marks: ${gu(Xa(e.slice(r - 1, i)))} (${i - r}/${kh})`);
        r = i;
      }
  }
}
function $w(n, t, e) {
  let r = [], s = [];
  for (n = n.slice().reverse(); n.length; ) {
    let i = Ww(n);
    if (i)
      s.length && (r.push(t(s)), s = []), r.push(e(i));
    else {
      let o = n.pop();
      if (yr.has(o))
        s.push(o);
      else {
        let c = gl.get(o);
        if (c)
          s.push(...c);
        else if (!up.has(o))
          throw dp(o);
      }
    }
  }
  return s.length && r.push(t(s)), r;
}
function jw(n) {
  return n.filter((t) => t != cp);
}
function Ww(n, t) {
  let e = ml, r, s = n.length;
  for (; s && (e = e.get(n[--s]), !!e); ) {
    let { V: i } = e;
    i && (r = i, n.length = s);
  }
  return r;
}
const gp = new Uint8Array(32);
gp.fill(0);
function Ch(n) {
  return B(n.length !== 0, "invalid ENS name; empty component", "comp", n), n;
}
function yp(n) {
  const t = Ve(zw(n)), e = [];
  if (n.length === 0)
    return e;
  let r = 0;
  for (let s = 0; s < t.length; s++)
    t[s] === 46 && (e.push(Ch(t.slice(r, s))), r = s + 1);
  return B(r < t.length, "invalid ENS name; empty component", "name", n), e.push(Ch(t.slice(r))), e;
}
function zw(n) {
  try {
    if (n.length === 0)
      throw new Error("empty label");
    return Fw(n);
  } catch (t) {
    B(!1, `invalid ENS name (${t.message})`, "name", n);
  }
}
function wl(n) {
  B(typeof n == "string", "invalid ENS name; not a string", "name", n), B(n.length, "invalid ENS name (empty label)", "name", n);
  let t = gp;
  const e = yp(n);
  for (; e.length; )
    t = It(Et([t, It(e.pop())]));
  return W(t);
}
function Qw(n, t) {
  const e = t;
  return B(e <= 255, "DNS encoded label cannot exceed 255", "length", e), W(Et(yp(n).map((r) => {
    B(r.length <= e, `label ${JSON.stringify(n)} exceeds ${e} bytes`, "name", n);
    const s = new Uint8Array(r.length + 1);
    return s.set(r, 1), s[0] = s.length - 1, s;
  }))) + "00";
}
function Nc(n, t) {
  return {
    address: ft(n),
    storageKeys: t.map((e, r) => (B(gt(e, 32), "invalid slot", `storageKeys[${r}]`, e), e.toLowerCase()))
  };
}
function fs(n) {
  if (Array.isArray(n))
    return n.map((e, r) => Array.isArray(e) ? (B(e.length === 2, "invalid slot set", `value[${r}]`, e), Nc(e[0], e[1])) : (B(e != null && typeof e == "object", "invalid address-slot set", "value", n), Nc(e.address, e.storageKeys)));
  B(n != null && typeof n == "object", "invalid access list", "value", n);
  const t = Object.keys(n).map((e) => {
    const r = n[e].reduce((s, i) => (s[i] = !0, s), {});
    return Nc(e, Object.keys(r).sort());
  });
  return t.sort((e, r) => e.address.localeCompare(r.address)), t;
}
function qw(n) {
  let t;
  return typeof n == "string" ? t = hu.computePublicKey(n, !1) : t = n.publicKey, ft(It("0x" + t.substring(4)).substring(26));
}
function mp(n, t) {
  return qw(hu.recoverPublicKey(n, t));
}
const Dt = BigInt(0), Kw = BigInt(2), Jw = BigInt(27), Zw = BigInt(28), Yw = BigInt(35), Xw = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), Bc = 4096 * 32;
function Ph(n, t) {
  let e = n.toString(16);
  for (; e.length < 2; )
    e = "0" + e;
  return e += ur(t).substring(4), "0x" + e;
}
function tc(n) {
  return n === "0x" ? null : ft(n);
}
function yu(n, t) {
  try {
    return fs(n);
  } catch (e) {
    B(!1, e.message, t, n);
  }
}
function Mo(n, t) {
  return n === "0x" ? 0 : nt(n, t);
}
function Ot(n, t) {
  if (n === "0x")
    return Dt;
  const e = z(n, t);
  return B(e <= Xw, "value exceeds uint size", t, e), e;
}
function mt(n, t) {
  const e = z(n, "value"), r = Lt(e);
  return B(r.length <= 32, "value too large", `tx.${t}`, e), r;
}
function mu(n) {
  return fs(n).map((t) => [t.address, t.storageKeys]);
}
function tb(n, t) {
  B(Array.isArray(n), `invalid ${t}`, "value", n);
  for (let e = 0; e < n.length; e++)
    B(gt(n[e], 32), "invalid ${ param } hash", `value[${e}]`, n[e]);
  return n;
}
function eb(n) {
  const t = Ka(n);
  B(Array.isArray(t) && (t.length === 9 || t.length === 6), "invalid field count for legacy transaction", "data", n);
  const e = {
    type: 0,
    nonce: Mo(t[0], "nonce"),
    gasPrice: Ot(t[1], "gasPrice"),
    gasLimit: Ot(t[2], "gasLimit"),
    to: tc(t[3]),
    value: Ot(t[4], "value"),
    data: W(t[5]),
    chainId: Dt
  };
  if (t.length === 6)
    return e;
  const r = Ot(t[6], "v"), s = Ot(t[7], "r"), i = Ot(t[8], "s");
  if (s === Dt && i === Dt)
    e.chainId = r;
  else {
    let o = (r - Yw) / Kw;
    o < Dt && (o = Dt), e.chainId = o, B(o !== Dt || r === Jw || r === Zw, "non-canonical legacy v", "v", t[6]), e.signature = an.from({
      r: sn(t[7], 32),
      s: sn(t[8], 32),
      v: r
    });
  }
  return e;
}
function nb(n, t) {
  const e = [
    mt(n.nonce, "nonce"),
    mt(n.gasPrice || 0, "gasPrice"),
    mt(n.gasLimit, "gasLimit"),
    n.to || "0x",
    mt(n.value, "value"),
    n.data
  ];
  let r = Dt;
  if (n.chainId != Dt)
    r = z(n.chainId, "tx.chainId"), B(!t || t.networkV == null || t.legacyChainId === r, "tx.chainId/sig.v mismatch", "sig", t);
  else if (n.signature) {
    const i = n.signature.legacyChainId;
    i != null && (r = i);
  }
  if (!t)
    return r !== Dt && (e.push(Lt(r)), e.push("0x"), e.push("0x")), rs(e);
  let s = BigInt(27 + t.yParity);
  return r !== Dt ? s = an.getChainIdV(r, t.v) : BigInt(t.v) !== s && B(!1, "tx.chainId/sig.v mismatch", "sig", t), e.push(Lt(s)), e.push(Lt(t.r)), e.push(Lt(t.s)), rs(e);
}
function wu(n, t) {
  let e;
  try {
    if (e = Mo(t[0], "yParity"), e !== 0 && e !== 1)
      throw new Error("bad yParity");
  } catch {
    B(!1, "invalid yParity", "yParity", t[0]);
  }
  const r = sn(t[1], 32), s = sn(t[2], 32), i = an.from({ r, s, yParity: e });
  n.signature = i;
}
function rb(n) {
  const t = Ka(et(n).slice(1));
  B(Array.isArray(t) && (t.length === 9 || t.length === 12), "invalid field count for transaction type: 2", "data", W(n));
  const e = {
    type: 2,
    chainId: Ot(t[0], "chainId"),
    nonce: Mo(t[1], "nonce"),
    maxPriorityFeePerGas: Ot(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: Ot(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: Ot(t[4], "gasLimit"),
    to: tc(t[5]),
    value: Ot(t[6], "value"),
    data: W(t[7]),
    accessList: yu(t[8], "accessList")
  };
  return t.length === 9 || wu(e, t.slice(9)), e;
}
function sb(n, t) {
  const e = [
    mt(n.chainId, "chainId"),
    mt(n.nonce, "nonce"),
    mt(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    mt(n.maxFeePerGas || 0, "maxFeePerGas"),
    mt(n.gasLimit, "gasLimit"),
    n.to || "0x",
    mt(n.value, "value"),
    n.data,
    mu(n.accessList || [])
  ];
  return t && (e.push(mt(t.yParity, "yParity")), e.push(Lt(t.r)), e.push(Lt(t.s))), Et(["0x02", rs(e)]);
}
function ib(n) {
  const t = Ka(et(n).slice(1));
  B(Array.isArray(t) && (t.length === 8 || t.length === 11), "invalid field count for transaction type: 1", "data", W(n));
  const e = {
    type: 1,
    chainId: Ot(t[0], "chainId"),
    nonce: Mo(t[1], "nonce"),
    gasPrice: Ot(t[2], "gasPrice"),
    gasLimit: Ot(t[3], "gasLimit"),
    to: tc(t[4]),
    value: Ot(t[5], "value"),
    data: W(t[6]),
    accessList: yu(t[7], "accessList")
  };
  return t.length === 8 || wu(e, t.slice(8)), e;
}
function ob(n, t) {
  const e = [
    mt(n.chainId, "chainId"),
    mt(n.nonce, "nonce"),
    mt(n.gasPrice || 0, "gasPrice"),
    mt(n.gasLimit, "gasLimit"),
    n.to || "0x",
    mt(n.value, "value"),
    n.data,
    mu(n.accessList || [])
  ];
  return t && (e.push(mt(t.yParity, "recoveryParam")), e.push(Lt(t.r)), e.push(Lt(t.s))), Et(["0x01", rs(e)]);
}
function ab(n) {
  let t = Ka(et(n).slice(1)), e = "3", r = null;
  if (t.length === 4 && Array.isArray(t[0])) {
    e = "3 (network format)";
    const i = t[1], o = t[2], c = t[3];
    B(Array.isArray(i), "invalid network format: blobs not an array", "fields[1]", i), B(Array.isArray(o), "invalid network format: commitments not an array", "fields[2]", o), B(Array.isArray(c), "invalid network format: proofs not an array", "fields[3]", c), B(i.length === o.length, "invalid network format: blobs/commitments length mismatch", "fields", t), B(i.length === c.length, "invalid network format: blobs/proofs length mismatch", "fields", t), r = [];
    for (let a = 0; a < t[1].length; a++)
      r.push({
        data: i[a],
        commitment: o[a],
        proof: c[a]
      });
    t = t[0];
  }
  B(Array.isArray(t) && (t.length === 11 || t.length === 14), `invalid field count for transaction type: ${e}`, "data", W(n));
  const s = {
    type: 3,
    chainId: Ot(t[0], "chainId"),
    nonce: Mo(t[1], "nonce"),
    maxPriorityFeePerGas: Ot(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: Ot(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: Ot(t[4], "gasLimit"),
    to: tc(t[5]),
    value: Ot(t[6], "value"),
    data: W(t[7]),
    accessList: yu(t[8], "accessList"),
    maxFeePerBlobGas: Ot(t[9], "maxFeePerBlobGas"),
    blobVersionedHashes: t[10]
  };
  r && (s.blobs = r), B(s.to != null, `invalid address for transaction type: ${e}`, "data", n), B(Array.isArray(s.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", n);
  for (let i = 0; i < s.blobVersionedHashes.length; i++)
    B(gt(s.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", n);
  return t.length === 11 || wu(s, t.slice(11)), s;
}
function cb(n, t, e) {
  const r = [
    mt(n.chainId, "chainId"),
    mt(n.nonce, "nonce"),
    mt(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    mt(n.maxFeePerGas || 0, "maxFeePerGas"),
    mt(n.gasLimit, "gasLimit"),
    n.to || bi,
    mt(n.value, "value"),
    n.data,
    mu(n.accessList || []),
    mt(n.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
    tb(n.blobVersionedHashes || [], "blobVersionedHashes")
  ];
  return t && (r.push(mt(t.yParity, "yParity")), r.push(Lt(t.r)), r.push(Lt(t.s)), e) ? Et([
    "0x03",
    rs([
      r,
      e.map((s) => s.data),
      e.map((s) => s.commitment),
      e.map((s) => s.proof)
    ])
  ]) : Et(["0x03", rs(r)]);
}
var hn, _i, Gi, Vi, $i, ji, Wi, zi, Qi, qi, Ki, Ji, Os, mr, Jn, wr, Zi, ha;
const lb = class Zn {
  /**
   *  Creates a new Transaction with default values.
   */
  constructor() {
    C(this, Zi), C(this, hn), C(this, _i), C(this, Gi), C(this, Vi), C(this, $i), C(this, ji), C(this, Wi), C(this, zi), C(this, Qi), C(this, qi), C(this, Ki), C(this, Ji), C(this, Os), C(this, mr), C(this, Jn), C(this, wr), A(this, hn, null), A(this, _i, null), A(this, Vi, 0), A(this, $i, Dt), A(this, ji, null), A(this, Wi, null), A(this, zi, null), A(this, Gi, "0x"), A(this, Qi, Dt), A(this, qi, Dt), A(this, Ki, null), A(this, Ji, null), A(this, Os, null), A(this, mr, null), A(this, wr, null), A(this, Jn, null);
  }
  /**
   *  The transaction type.
   *
   *  If null, the type will be automatically inferred based on
   *  explicit properties.
   */
  get type() {
    return f(this, hn);
  }
  set type(t) {
    switch (t) {
      case null:
        A(this, hn, null);
        break;
      case 0:
      case "legacy":
        A(this, hn, 0);
        break;
      case 1:
      case "berlin":
      case "eip-2930":
        A(this, hn, 1);
        break;
      case 2:
      case "london":
      case "eip-1559":
        A(this, hn, 2);
        break;
      case 3:
      case "cancun":
      case "eip-4844":
        A(this, hn, 3);
        break;
      default:
        B(!1, "unsupported transaction type", "type", t);
    }
  }
  /**
   *  The name of the transaction type.
   */
  get typeName() {
    switch (this.type) {
      case 0:
        return "legacy";
      case 1:
        return "eip-2930";
      case 2:
        return "eip-1559";
      case 3:
        return "eip-4844";
    }
    return null;
  }
  /**
   *  The ``to`` address for the transaction or ``null`` if the
   *  transaction is an ``init`` transaction.
   */
  get to() {
    const t = f(this, _i);
    return t == null && this.type === 3 ? bi : t;
  }
  set to(t) {
    A(this, _i, t == null ? null : ft(t));
  }
  /**
   *  The transaction nonce.
   */
  get nonce() {
    return f(this, Vi);
  }
  set nonce(t) {
    A(this, Vi, nt(t, "value"));
  }
  /**
   *  The gas limit.
   */
  get gasLimit() {
    return f(this, $i);
  }
  set gasLimit(t) {
    A(this, $i, z(t));
  }
  /**
   *  The gas price.
   *
   *  On legacy networks this defines the fee that will be paid. On
   *  EIP-1559 networks, this should be ``null``.
   */
  get gasPrice() {
    const t = f(this, ji);
    return t == null && (this.type === 0 || this.type === 1) ? Dt : t;
  }
  set gasPrice(t) {
    A(this, ji, t == null ? null : z(t, "gasPrice"));
  }
  /**
   *  The maximum priority fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxPriorityFeePerGas() {
    return f(this, Wi) ?? (this.type === 2 || this.type === 3 ? Dt : null);
  }
  set maxPriorityFeePerGas(t) {
    A(this, Wi, t == null ? null : z(t, "maxPriorityFeePerGas"));
  }
  /**
   *  The maximum total fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxFeePerGas() {
    return f(this, zi) ?? (this.type === 2 || this.type === 3 ? Dt : null);
  }
  set maxFeePerGas(t) {
    A(this, zi, t == null ? null : z(t, "maxFeePerGas"));
  }
  /**
   *  The transaction data. For ``init`` transactions this is the
   *  deployment code.
   */
  get data() {
    return f(this, Gi);
  }
  set data(t) {
    A(this, Gi, W(t));
  }
  /**
   *  The amount of ether (in wei) to send in this transactions.
   */
  get value() {
    return f(this, Qi);
  }
  set value(t) {
    A(this, Qi, z(t, "value"));
  }
  /**
   *  The chain ID this transaction is valid on.
   */
  get chainId() {
    return f(this, qi);
  }
  set chainId(t) {
    A(this, qi, z(t));
  }
  /**
   *  If signed, the signature for this transaction.
   */
  get signature() {
    return f(this, Ki) || null;
  }
  set signature(t) {
    A(this, Ki, t == null ? null : an.from(t));
  }
  /**
   *  The access list.
   *
   *  An access list permits discounted (but pre-paid) access to
   *  bytecode and state variable access within contract execution.
   */
  get accessList() {
    return (f(this, Ji) || null) ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(t) {
    A(this, Ji, t == null ? null : fs(t));
  }
  /**
   *  The max fee per blob gas for Cancun transactions.
   */
  get maxFeePerBlobGas() {
    const t = f(this, Os);
    return t == null && this.type === 3 ? Dt : t;
  }
  set maxFeePerBlobGas(t) {
    A(this, Os, t == null ? null : z(t, "maxFeePerBlobGas"));
  }
  /**
   *  The BLOb versioned hashes for Cancun transactions.
   */
  get blobVersionedHashes() {
    let t = f(this, mr);
    return t == null && this.type === 3 ? [] : t;
  }
  set blobVersionedHashes(t) {
    if (t != null) {
      B(Array.isArray(t), "blobVersionedHashes must be an Array", "value", t), t = t.slice();
      for (let e = 0; e < t.length; e++)
        B(gt(t[e], 32), "invalid blobVersionedHash", `value[${e}]`, t[e]);
    }
    A(this, mr, t);
  }
  /**
   *  The BLObs for the Transaction, if any.
   *
   *  If ``blobs`` is non-``null``, then the [[seriailized]]
   *  will return the network formatted sidecar, otherwise it
   *  will return the standard [[link-eip-2718]] payload. The
   *  [[unsignedSerialized]] is unaffected regardless.
   *
   *  When setting ``blobs``, either fully valid [[Blob]] objects
   *  may be specified (i.e. correctly padded, with correct
   *  committments and proofs) or a raw [[BytesLike]] may
   *  be provided.
   *
   *  If raw [[BytesLike]] are provided, the [[kzg]] property **must**
   *  be already set. The blob will be correctly padded and the
   *  [[KzgLibrary]] will be used to compute the committment and
   *  proof for the blob.
   *
   *  A BLOb is a sequence of field elements, each of which must
   *  be within the BLS field modulo, so some additional processing
   *  may be required to encode arbitrary data to ensure each 32 byte
   *  field is within the valid range.
   *
   *  Setting this automatically populates [[blobVersionedHashes]],
   *  overwriting any existing values. Setting this to ``null``
   *  does **not** remove the [[blobVersionedHashes]], leaving them
   *  present.
   */
  get blobs() {
    return f(this, wr) == null ? null : f(this, wr).map((t) => Object.assign({}, t));
  }
  set blobs(t) {
    if (t == null) {
      A(this, wr, null);
      return;
    }
    const e = [], r = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if (eu(i)) {
        D(f(this, Jn), "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
          operation: "set blobs()"
        });
        let o = et(i);
        if (B(o.length <= Bc, "blob is too large", `blobs[${s}]`, i), o.length !== Bc) {
          const l = new Uint8Array(Bc);
          l.set(o), o = l;
        }
        const c = f(this, Jn).blobToKzgCommitment(o), a = W(f(this, Jn).computeBlobKzgProof(o, c));
        e.push({
          data: W(o),
          commitment: W(c),
          proof: a
        }), r.push(Ph(1, c));
      } else {
        const o = W(i.commitment);
        e.push({
          data: W(i.data),
          commitment: o,
          proof: W(i.proof)
        }), r.push(Ph(1, o));
      }
    }
    A(this, wr, e), A(this, mr, r);
  }
  get kzg() {
    return f(this, Jn);
  }
  set kzg(t) {
    A(this, Jn, t);
  }
  /**
   *  The transaction hash, if signed. Otherwise, ``null``.
   */
  get hash() {
    return this.signature == null ? null : It(F(this, Zi, ha).call(this, !0, !1));
  }
  /**
   *  The pre-image hash of this transaction.
   *
   *  This is the digest that a [[Signer]] must sign to authorize
   *  this transaction.
   */
  get unsignedHash() {
    return It(this.unsignedSerialized);
  }
  /**
   *  The sending address, if signed. Otherwise, ``null``.
   */
  get from() {
    return this.signature == null ? null : mp(this.unsignedHash, this.signature);
  }
  /**
   *  The public key of the sender, if signed. Otherwise, ``null``.
   */
  get fromPublicKey() {
    return this.signature == null ? null : hu.recoverPublicKey(this.unsignedHash, this.signature);
  }
  /**
   *  Returns true if signed.
   *
   *  This provides a Type Guard that properties requiring a signed
   *  transaction are non-null.
   */
  isSigned() {
    return this.signature != null;
  }
  /**
   *  The serialized transaction.
   *
   *  This throws if the transaction is unsigned. For the pre-image,
   *  use [[unsignedSerialized]].
   */
  get serialized() {
    return F(this, Zi, ha).call(this, !0, !0);
  }
  /**
   *  The transaction pre-image.
   *
   *  The hash of this is the digest which needs to be signed to
   *  authorize this transaction.
   */
  get unsignedSerialized() {
    return F(this, Zi, ha).call(this, !1, !1);
  }
  /**
   *  Return the most "likely" type; currently the highest
   *  supported transaction type.
   */
  inferType() {
    const t = this.inferTypes();
    return t.indexOf(2) >= 0 ? 2 : t.pop();
  }
  /**
   *  Validates the explicit properties and returns a list of compatible
   *  transaction types.
   */
  inferTypes() {
    const t = this.gasPrice != null, e = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, r = this.accessList != null, s = f(this, Os) != null || f(this, mr);
    this.maxFeePerGas != null && this.maxPriorityFeePerGas != null && D(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this }), D(!e || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this }), D(this.type !== 0 || !r, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
    const i = [];
    return this.type != null ? i.push(this.type) : e ? i.push(2) : t ? (i.push(1), r || i.push(0)) : r ? (i.push(1), i.push(2)) : (s && this.to || (i.push(0), i.push(1), i.push(2)), i.push(3)), i.sort(), i;
  }
  /**
   *  Returns true if this transaction is a legacy transaction (i.e.
   *  ``type === 0``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if this transaction is berlin hardform transaction (i.e.
   *  ``type === 1``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if this transaction is london hardform transaction (i.e.
   *  ``type === 2``).
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if this transaction is an [[link-eip-4844]] BLOB
   *  transaction.
   *
   *  This provides a Type Guard that the related properties are
   *  non-null.
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Create a copy of this transaciton.
   */
  clone() {
    return Zn.from(this);
  }
  /**
   *  Return a JSON-friendly object.
   */
  toJSON() {
    const t = (e) => e == null ? null : e.toString();
    return {
      type: this.type,
      to: this.to,
      //            from: this.from,
      data: this.data,
      nonce: this.nonce,
      gasLimit: t(this.gasLimit),
      gasPrice: t(this.gasPrice),
      maxPriorityFeePerGas: t(this.maxPriorityFeePerGas),
      maxFeePerGas: t(this.maxFeePerGas),
      value: t(this.value),
      chainId: t(this.chainId),
      sig: this.signature ? this.signature.toJSON() : null,
      accessList: this.accessList
    };
  }
  /**
   *  Create a **Transaction** from a serialized transaction or a
   *  Transaction-like object.
   */
  static from(t) {
    if (t == null)
      return new Zn();
    if (typeof t == "string") {
      const r = et(t);
      if (r[0] >= 127)
        return Zn.from(eb(r));
      switch (r[0]) {
        case 1:
          return Zn.from(ib(r));
        case 2:
          return Zn.from(rb(r));
        case 3:
          return Zn.from(ab(r));
      }
      D(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const e = new Zn();
    return t.type != null && (e.type = t.type), t.to != null && (e.to = t.to), t.nonce != null && (e.nonce = t.nonce), t.gasLimit != null && (e.gasLimit = t.gasLimit), t.gasPrice != null && (e.gasPrice = t.gasPrice), t.maxPriorityFeePerGas != null && (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas), t.maxFeePerGas != null && (e.maxFeePerGas = t.maxFeePerGas), t.maxFeePerBlobGas != null && (e.maxFeePerBlobGas = t.maxFeePerBlobGas), t.data != null && (e.data = t.data), t.value != null && (e.value = t.value), t.chainId != null && (e.chainId = t.chainId), t.signature != null && (e.signature = an.from(t.signature)), t.accessList != null && (e.accessList = t.accessList), t.blobVersionedHashes != null && (e.blobVersionedHashes = t.blobVersionedHashes), t.kzg != null && (e.kzg = t.kzg), t.blobs != null && (e.blobs = t.blobs), t.hash != null && (B(e.isSigned(), "unsigned transaction cannot define '.hash'", "tx", t), B(e.hash === t.hash, "hash mismatch", "tx", t)), t.from != null && (B(e.isSigned(), "unsigned transaction cannot define '.from'", "tx", t), B(e.from.toLowerCase() === (t.from || "").toLowerCase(), "from mismatch", "tx", t)), e;
  }
};
hn = /* @__PURE__ */ new WeakMap(), _i = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap(), Vi = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), Qi = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap(), Ki = /* @__PURE__ */ new WeakMap(), Ji = /* @__PURE__ */ new WeakMap(), Os = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap(), Zi = /* @__PURE__ */ new WeakSet(), ha = function(n, t) {
  D(!n || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
  const e = n ? this.signature : null;
  switch (this.inferType()) {
    case 0:
      return nb(this, e);
    case 1:
      return ob(this, e);
    case 2:
      return sb(this, e);
    case 3:
      return cb(this, e, t ? this.blobs : null);
  }
  D(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
};
let wp = lb;
const ub = new RegExp("^bytes([0-9]+)$"), hb = new RegExp("^(u?int)([0-9]*)$"), fb = new RegExp("^(.*)\\[([0-9]*)\\]$");
function bp(n, t, e) {
  switch (n) {
    case "address":
      return et(e ? sn(t, 32) : ft(t));
    case "string":
      return Ve(t);
    case "bytes":
      return et(t);
    case "bool":
      return t = t ? "0x01" : "0x00", et(e ? sn(t, 32) : t);
  }
  let r = n.match(hb);
  if (r) {
    let s = r[1] === "int", i = parseInt(r[2] || "256");
    return B((!r[2] || r[2] === String(i)) && i % 8 === 0 && i !== 0 && i <= 256, "invalid number type", "type", n), e && (i = 256), s && (t = ru(t, i)), et(sn(Lt(t), i / 8));
  }
  if (r = n.match(ub), r) {
    const s = parseInt(r[1]);
    return B(String(s) === r[1] && s !== 0 && s <= 32, "invalid bytes type", "type", n), B(Kr(t) === s, `invalid value for ${n}`, "value", t), e ? et(nu(t, 32)) : t;
  }
  if (r = n.match(fb), r && Array.isArray(t)) {
    const s = r[1], i = parseInt(r[2] || String(t.length));
    B(i === t.length, `invalid array length for ${n}`, "value", t);
    const o = [];
    return t.forEach(function(c) {
      o.push(bp(s, c, !0));
    }), et(Et(o));
  }
  B(!1, "invalid type", "type", n);
}
function db(n, t) {
  B(n.length === t.length, "wrong number of values; expected ${ types.length }", "values", t);
  const e = [];
  return n.forEach(function(r, s) {
    e.push(bp(r, t[s]));
  }), W(Et(e));
}
function pb(n, t) {
  return It(db(n, t));
}
const Ap = new Uint8Array(32);
Ap.fill(0);
const gb = BigInt(-1), Ep = BigInt(0), vp = BigInt(1), yb = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function mb(n) {
  const t = et(n), e = t.length % 32;
  return e ? Et([t, Ap.slice(e)]) : W(t);
}
const wb = lr(vp, 32), bb = lr(Ep, 32), Uh = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, Oc = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function Lh(n) {
  return function(t) {
    return B(typeof t == "string", `invalid domain value for ${JSON.stringify(n)}`, `domain.${n}`, t), t;
  };
}
const Ab = {
  name: Lh("name"),
  version: Lh("version"),
  chainId: function(n) {
    const t = z(n, "domain.chainId");
    return B(t >= 0, "invalid chain ID", "domain.chainId", n), Number.isSafeInteger(t) ? Number(t) : Hs(t);
  },
  verifyingContract: function(n) {
    try {
      return ft(n).toLowerCase();
    } catch {
    }
    B(!1, 'invalid domain value "verifyingContract"', "domain.verifyingContract", n);
  },
  salt: function(n) {
    const t = et(n, "domain.salt");
    return B(t.length === 32, 'invalid domain value "salt"', "domain.salt", n), W(t);
  }
};
function bl(n) {
  {
    const t = n.match(/^(u?)int(\d+)$/);
    if (t) {
      const e = t[1] === "", r = parseInt(t[2]);
      B(r % 8 === 0 && r !== 0 && r <= 256 && t[2] === String(r), "invalid numeric width", "type", n);
      const s = Hr(yb, e ? r - 1 : r), i = e ? (s + vp) * gb : Ep;
      return function(o) {
        const c = z(o, "value");
        return B(c >= i && c <= s, `value out-of-bounds for ${n}`, "value", c), lr(e ? ru(c, 256) : c, 32);
      };
    }
  }
  {
    const t = n.match(/^bytes(\d+)$/);
    if (t) {
      const e = parseInt(t[1]);
      return B(e !== 0 && e <= 32 && t[1] === String(e), "invalid bytes width", "type", n), function(r) {
        const s = et(r);
        return B(s.length === e, `invalid length for ${n}`, "value", r), mb(r);
      };
    }
  }
  switch (n) {
    case "address":
      return function(t) {
        return sn(ft(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? wb : bb;
      };
    case "bytes":
      return function(t) {
        return It(t);
      };
    case "string":
      return function(t) {
        return ss(t);
      };
  }
  return null;
}
function Dh(n, t) {
  return `${n}(${t.map(({ name: e, type: r }) => r + " " + e).join(",")})`;
}
function fa(n) {
  const t = n.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
  return t ? {
    base: t[1],
    index: t[2] + t[4],
    array: {
      base: t[1],
      prefix: t[1] + t[2],
      count: t[5] ? parseInt(t[5]) : -1
    }
  } : { base: n };
}
var da, or, Yi, Al, xp;
const Eb = class ke {
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   *
   *  This performs all necessary checking that types are valid and
   *  do not violate the [[link-eip-712]] structural constraints as
   *  well as computes the [[primaryType]].
   */
  constructor(t) {
    C(this, Al), S(this, "primaryType"), C(this, da), C(this, or), C(this, Yi), A(this, or, /* @__PURE__ */ new Map()), A(this, Yi, /* @__PURE__ */ new Map());
    const e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = {};
    Object.keys(t).forEach((a) => {
      i[a] = t[a].map(({ name: l, type: h }) => {
        let { base: u, index: p } = fa(h);
        return u === "int" && !t.int && (u = "int256"), u === "uint" && !t.uint && (u = "uint256"), { name: l, type: u + (p || "") };
      }), e.set(a, /* @__PURE__ */ new Set()), r.set(a, []), s.set(a, /* @__PURE__ */ new Set());
    }), A(this, da, JSON.stringify(i));
    for (const a in i) {
      const l = /* @__PURE__ */ new Set();
      for (const h of i[a]) {
        B(!l.has(h.name), `duplicate variable name ${JSON.stringify(h.name)} in ${JSON.stringify(a)}`, "types", t), l.add(h.name);
        const u = fa(h.type).base;
        B(u !== a, `circular type reference to ${JSON.stringify(u)}`, "types", t), !bl(u) && (B(r.has(u), `unknown type ${JSON.stringify(u)}`, "types", t), r.get(u).push(a), e.get(a).add(u));
      }
    }
    const o = Array.from(r.keys()).filter((a) => r.get(a).length === 0);
    B(o.length !== 0, "missing primary type", "types", t), B(o.length === 1, `ambiguous primary types or unused types: ${o.map((a) => JSON.stringify(a)).join(", ")}`, "types", t), q(this, { primaryType: o[0] });
    function c(a, l) {
      B(!l.has(a), `circular type reference to ${JSON.stringify(a)}`, "types", t), l.add(a);
      for (const h of e.get(a))
        if (r.has(h)) {
          c(h, l);
          for (const u of l)
            s.get(u).add(h);
        }
      l.delete(a);
    }
    c(this.primaryType, /* @__PURE__ */ new Set());
    for (const [a, l] of s) {
      const h = Array.from(l);
      h.sort(), f(this, or).set(a, Dh(a, i[a]) + h.map((u) => Dh(u, i[u])).join(""));
    }
  }
  /**
   *  The types.
   */
  get types() {
    return JSON.parse(f(this, da));
  }
  /**
   *  Returnthe encoder for the specific %%type%%.
   */
  getEncoder(t) {
    let e = f(this, Yi).get(t);
    return e || (e = F(this, Al, xp).call(this, t), f(this, Yi).set(t, e)), e;
  }
  /**
   *  Return the full type for %%name%%.
   */
  encodeType(t) {
    const e = f(this, or).get(t);
    return B(e, `unknown type: ${JSON.stringify(t)}`, "name", t), e;
  }
  /**
   *  Return the encoded %%value%% for the %%type%%.
   */
  encodeData(t, e) {
    return this.getEncoder(t)(e);
  }
  /**
   *  Returns the hash of %%value%% for the type of %%name%%.
   */
  hashStruct(t, e) {
    return It(this.encodeData(t, e));
  }
  /**
   *  Return the fulled encoded %%value%% for the [[types]].
   */
  encode(t) {
    return this.encodeData(this.primaryType, t);
  }
  /**
   *  Return the hash of the fully encoded %%value%% for the [[types]].
   */
  hash(t) {
    return this.hashStruct(this.primaryType, t);
  }
  /**
   *  @_ignore:
   */
  _visit(t, e, r) {
    if (bl(t))
      return r(t, e);
    const s = fa(t).array;
    if (s)
      return B(s.count === -1 || s.count === e.length, `array length mismatch; expected length ${s.count}`, "value", e), e.map((o) => this._visit(s.prefix, o, r));
    const i = this.types[t];
    if (i)
      return i.reduce((o, { name: c, type: a }) => (o[c] = this._visit(a, e[c], r), o), {});
    B(!1, `unknown type: ${t}`, "type", t);
  }
  /**
   *  Call %%calback%% for each value in %%value%%, passing the type and
   *  component within %%value%%.
   *
   *  This is useful for replacing addresses or other transformation that
   *  may be desired on each component, based on its type.
   */
  visit(t, e) {
    return this._visit(this.primaryType, t, e);
  }
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   */
  static from(t) {
    return new ke(t);
  }
  /**
   *  Return the primary type for %%types%%.
   */
  static getPrimaryType(t) {
    return ke.from(t).primaryType;
  }
  /**
   *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
   */
  static hashStruct(t, e, r) {
    return ke.from(e).hashStruct(t, r);
  }
  /**
   *  Return the domain hash for %%domain%%.
   */
  static hashDomain(t) {
    const e = [];
    for (const r in t) {
      if (t[r] == null)
        continue;
      const s = Uh[r];
      B(s, `invalid typed-data domain key: ${JSON.stringify(r)}`, "domain", t), e.push({ name: r, type: s });
    }
    return e.sort((r, s) => Oc.indexOf(r.name) - Oc.indexOf(s.name)), ke.hashStruct("EIP712Domain", { EIP712Domain: e }, t);
  }
  /**
   *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static encode(t, e, r) {
    return Et([
      "0x1901",
      ke.hashDomain(t),
      ke.from(e).hash(r)
    ]);
  }
  /**
   *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static hash(t, e, r) {
    return It(ke.encode(t, e, r));
  }
  // Replaces all address types with ENS names with their looked up address
  /**
   * Resolves to the value from resolving all addresses in %%value%% for
   * %%types%% and the %%domain%%.
   */
  static async resolveNames(t, e, r, s) {
    t = Object.assign({}, t);
    for (const c in t)
      t[c] == null && delete t[c];
    const i = {};
    t.verifyingContract && !gt(t.verifyingContract, 20) && (i[t.verifyingContract] = "0x");
    const o = ke.from(e);
    o.visit(r, (c, a) => (c === "address" && !gt(a, 20) && (i[a] = "0x"), a));
    for (const c in i)
      i[c] = await s(c);
    return t.verifyingContract && i[t.verifyingContract] && (t.verifyingContract = i[t.verifyingContract]), r = o.visit(r, (c, a) => c === "address" && i[a] ? i[a] : a), { domain: t, value: r };
  }
  /**
   *  Returns the JSON-encoded payload expected by nodes which implement
   *  the JSON-RPC [[link-eip-712]] method.
   */
  static getPayload(t, e, r) {
    ke.hashDomain(t);
    const s = {}, i = [];
    Oc.forEach((a) => {
      const l = t[a];
      l != null && (s[a] = Ab[a](l), i.push({ name: a, type: Uh[a] }));
    });
    const o = ke.from(e);
    e = o.types;
    const c = Object.assign({}, e);
    return B(c.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", e), c.EIP712Domain = i, o.encode(r), {
      types: c,
      domain: s,
      primaryType: o.primaryType,
      message: o.visit(r, (a, l) => {
        if (a.match(/^bytes(\d*)/))
          return W(et(l));
        if (a.match(/^u?int/))
          return z(l).toString();
        switch (a) {
          case "address":
            return l.toLowerCase();
          case "bool":
            return !!l;
          case "string":
            return B(typeof l == "string", "invalid string", "value", l), l;
        }
        B(!1, "unsupported type", "type", a);
      })
    };
  }
};
da = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap(), Yi = /* @__PURE__ */ new WeakMap(), Al = /* @__PURE__ */ new WeakSet(), xp = function(n) {
  {
    const r = bl(n);
    if (r)
      return r;
  }
  const t = fa(n).array;
  if (t) {
    const r = t.prefix, s = this.getEncoder(r);
    return (i) => {
      B(t.count === -1 || t.count === i.length, `array length mismatch; expected length ${t.count}`, "value", i);
      let o = i.map(s);
      return f(this, or).has(r) && (o = o.map(It)), It(Et(o));
    };
  }
  const e = this.types[n];
  if (e) {
    const r = ss(f(this, or).get(n));
    return (s) => {
      const i = e.map(({ name: o, type: c }) => {
        const a = this.getEncoder(c)(s[o]);
        return f(this, or).has(c) ? It(a) : a;
      });
      return i.unshift(r), Et(i);
    };
  }
  B(!1, `unknown type: ${n}`, "type", n);
};
let Fh = Eb;
function ee(n) {
  const t = /* @__PURE__ */ new Set();
  return n.forEach((e) => t.add(e)), Object.freeze(t);
}
const vb = "external public payable override", xb = ee(vb.split(" ")), Ip = "constant external internal payable private public pure view override", Ib = ee(Ip.split(" ")), Np = "constructor error event fallback function receive struct", Bp = ee(Np.split(" ")), Op = "calldata memory storage payable indexed", Nb = ee(Op.split(" ")), Bb = "tuple returns", Ob = [Np, Op, Bb, Ip].join(" "), kb = ee(Ob.split(" ")), Sb = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, Tb = new RegExp("^(\\s*)"), Rb = new RegExp("^([0-9]+)"), Cb = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), kp = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), Sp = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var Wt, Ze, pa, El;
const Tp = class Rp {
  constructor(t) {
    C(this, pa), C(this, Wt), C(this, Ze), A(this, Wt, 0), A(this, Ze, t.slice());
  }
  get offset() {
    return f(this, Wt);
  }
  get length() {
    return f(this, Ze).length - f(this, Wt);
  }
  clone() {
    return new Rp(f(this, Ze));
  }
  reset() {
    A(this, Wt, 0);
  }
  // Pops and returns the value of the next token, if it is a keyword in allowed; throws if out of tokens
  popKeyword(t) {
    const e = this.peek();
    if (e.type !== "KEYWORD" || !t.has(e.text))
      throw new Error(`expected keyword ${e.text}`);
    return this.pop().text;
  }
  // Pops and returns the value of the next token if it is `type`; throws if out of tokens
  popType(t) {
    if (this.peek().type !== t) {
      const e = this.peek();
      throw new Error(`expected ${t}; got ${e.type} ${JSON.stringify(e.text)}`);
    }
    return this.pop().text;
  }
  // Pops and returns a "(" TOKENS ")"
  popParen() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const e = F(this, pa, El).call(this, f(this, Wt) + 1, t.match + 1);
    return A(this, Wt, t.match + 1), e;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const e = [];
    for (; f(this, Wt) < t.match - 1; ) {
      const r = this.peek().linkNext;
      e.push(F(this, pa, El).call(this, f(this, Wt) + 1, r)), A(this, Wt, r);
    }
    return A(this, Wt, t.match + 1), e;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (f(this, Wt) >= f(this, Ze).length)
      throw new Error("out-of-bounds");
    return f(this, Ze)[f(this, Wt)];
  }
  // Returns the next value, if it is a keyword in `allowed`
  peekKeyword(t) {
    const e = this.peekType("KEYWORD");
    return e != null && t.has(e) ? e : null;
  }
  // Returns the value of the next token if it is `type`
  peekType(t) {
    if (this.length === 0)
      return null;
    const e = this.peek();
    return e.type === t ? e.text : null;
  }
  // Returns the next token; throws if out of tokens
  pop() {
    const t = this.peek();
    return Ca(this, Wt)._++, t;
  }
  toString() {
    const t = [];
    for (let e = f(this, Wt); e < f(this, Ze).length; e++) {
      const r = f(this, Ze)[e];
      t.push(`${r.type}:${r.text}`);
    }
    return `<TokenString ${t.join(" ")}>`;
  }
};
Wt = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), pa = /* @__PURE__ */ new WeakSet(), El = function(n = 0, t = 0) {
  return new Tp(f(this, Ze).slice(n, t).map((e) => Object.freeze(Object.assign({}, e, {
    match: e.match - n,
    linkBack: e.linkBack - n,
    linkNext: e.linkNext - n
  }))));
};
let Cn = Tp;
function hr(n) {
  const t = [], e = (o) => {
    const c = i < n.length ? JSON.stringify(n[i]) : "$EOI";
    throw new Error(`invalid token ${c} at ${i}: ${o}`);
  };
  let r = [], s = [], i = 0;
  for (; i < n.length; ) {
    let o = n.substring(i), c = o.match(Tb);
    c && (i += c[1].length, o = n.substring(i));
    const a = { depth: r.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    t.push(a);
    let l = Sb[o[0]] || "";
    if (l) {
      if (a.type = l, a.text = o[0], i++, l === "OPEN_PAREN")
        r.push(t.length - 1), s.push(t.length - 1);
      else if (l == "CLOSE_PAREN")
        r.length === 0 && e("no matching open bracket"), a.match = r.pop(), t[a.match].match = t.length - 1, a.depth--, a.linkBack = s.pop(), t[a.linkBack].linkNext = t.length - 1;
      else if (l === "COMMA")
        a.linkBack = s.pop(), t[a.linkBack].linkNext = t.length - 1, s.push(t.length - 1);
      else if (l === "OPEN_BRACKET")
        a.type = "BRACKET";
      else if (l === "CLOSE_BRACKET") {
        let h = t.pop().text;
        if (t.length > 0 && t[t.length - 1].type === "NUMBER") {
          const u = t.pop().text;
          h = u + h, t[t.length - 1].value = nt(u);
        }
        if (t.length === 0 || t[t.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        t[t.length - 1].text += h;
      }
      continue;
    }
    if (c = o.match(Cb), c) {
      if (a.text = c[1], i += a.text.length, kb.has(a.text)) {
        a.type = "KEYWORD";
        continue;
      }
      if (a.text.match(Sp)) {
        a.type = "TYPE";
        continue;
      }
      a.type = "ID";
      continue;
    }
    if (c = o.match(Rb), c) {
      a.text = c[1], a.type = "NUMBER", i += a.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(o[0])} at position ${i}`);
  }
  return new Cn(t.map((o) => Object.freeze(o)));
}
function Mh(n, t) {
  let e = [];
  for (const r in t.keys())
    n.has(r) && e.push(r);
  if (e.length > 1)
    throw new Error(`conflicting types: ${e.join(", ")}`);
}
function ec(n, t) {
  if (t.peekKeyword(Bp)) {
    const e = t.pop().text;
    if (e !== n)
      throw new Error(`expected ${n}, got ${e}`);
  }
  return t.popType("ID");
}
function Sn(n, t) {
  const e = /* @__PURE__ */ new Set();
  for (; ; ) {
    const r = n.peekType("KEYWORD");
    if (r == null || t && !t.has(r))
      break;
    if (n.pop(), e.has(r))
      throw new Error(`duplicate keywords: ${JSON.stringify(r)}`);
    e.add(r);
  }
  return Object.freeze(e);
}
function Cp(n) {
  let t = Sn(n, Ib);
  return Mh(t, ee("constant payable nonpayable".split(" "))), Mh(t, ee("pure view payable nonpayable".split(" "))), t.has("view") ? "view" : t.has("pure") ? "pure" : t.has("payable") ? "payable" : t.has("nonpayable") ? "nonpayable" : t.has("constant") ? "view" : "nonpayable";
}
function kn(n, t) {
  return n.popParams().map((e) => ne.from(e, t));
}
function Pp(n) {
  if (n.peekType("AT")) {
    if (n.pop(), n.peekType("NUMBER"))
      return z(n.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function is(n) {
  if (n.length)
    throw new Error(`unexpected tokens at offset ${n.offset}: ${n.toString()}`);
}
const Pb = new RegExp(/^(.*)\[([0-9]*)\]$/);
function Hh(n) {
  const t = n.match(Sp);
  if (B(t, "invalid type", "type", n), n === "uint")
    return "uint256";
  if (n === "int")
    return "int256";
  if (t[2]) {
    const e = parseInt(t[2]);
    B(e !== 0 && e <= 32, "invalid bytes length", "type", n);
  } else if (t[3]) {
    const e = parseInt(t[3]);
    B(e !== 0 && e <= 256 && e % 8 === 0, "invalid numeric width", "type", n);
  }
  return n;
}
const At = {}, ce = Symbol.for("_ethers_internal"), _h = "_ParamTypeInternal", Gh = "_ErrorInternal", Vh = "_EventInternal", $h = "_ConstructorInternal", jh = "_FallbackInternal", Wh = "_FunctionInternal", zh = "_StructInternal";
var wo, ga;
const Ub = class Se {
  /**
   *  @private
   */
  constructor(t, e, r, s, i, o, c, a) {
    if (C(this, wo), S(this, "name"), S(this, "type"), S(this, "baseType"), S(this, "indexed"), S(this, "components"), S(this, "arrayLength"), S(this, "arrayChildren"), Do(t, At, "ParamType"), Object.defineProperty(this, ce, { value: _h }), o && (o = Object.freeze(o.slice())), s === "array") {
      if (c == null || a == null)
        throw new Error("");
    } else if (c != null || a != null)
      throw new Error("");
    if (s === "tuple") {
      if (o == null)
        throw new Error("");
    } else if (o != null)
      throw new Error("");
    q(this, {
      name: e,
      type: r,
      baseType: s,
      indexed: i,
      components: o,
      arrayLength: c,
      arrayChildren: a
    });
  }
  /**
   *  Return a string representation of this type.
   *
   *  For example,
   *
   *  ``sighash" => "(uint256,address)"``
   *
   *  ``"minimal" => "tuple(uint256,address) indexed"``
   *
   *  ``"full" => "tuple(uint256 foo, address bar) indexed baz"``
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json") {
      const r = this.name || "";
      if (this.isArray()) {
        const i = JSON.parse(this.arrayChildren.format("json"));
        return i.name = r, i.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(i);
      }
      const s = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: r
      };
      return typeof this.indexed == "boolean" && (s.indexed = this.indexed), this.isTuple() && (s.components = this.components.map((i) => JSON.parse(i.format(t)))), JSON.stringify(s);
    }
    let e = "";
    return this.isArray() ? (e += this.arrayChildren.format(t), e += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? e += "(" + this.components.map((r) => r.format(t)).join(t === "full" ? ", " : ",") + ")" : e += this.type, t !== "sighash" && (this.indexed === !0 && (e += " indexed"), t === "full" && this.name && (e += " " + this.name)), e;
  }
  /**
   *  Returns true if %%this%% is an Array type.
   *
   *  This provides a type gaurd ensuring that [[arrayChildren]]
   *  and [[arrayLength]] are non-null.
   */
  isArray() {
    return this.baseType === "array";
  }
  /**
   *  Returns true if %%this%% is a Tuple type.
   *
   *  This provides a type gaurd ensuring that [[components]]
   *  is non-null.
   */
  isTuple() {
    return this.baseType === "tuple";
  }
  /**
   *  Returns true if %%this%% is an Indexable type.
   *
   *  This provides a type gaurd ensuring that [[indexed]]
   *  is non-null.
   */
  isIndexable() {
    return this.indexed != null;
  }
  /**
   *  Walks the **ParamType** with %%value%%, calling %%process%%
   *  on each type, destructing the %%value%% recursively.
   */
  walk(t, e) {
    if (this.isArray()) {
      if (!Array.isArray(t))
        throw new Error("invalid array value");
      if (this.arrayLength !== -1 && t.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const r = this;
      return t.map((s) => r.arrayChildren.walk(s, e));
    }
    if (this.isTuple()) {
      if (!Array.isArray(t))
        throw new Error("invalid tuple value");
      if (t.length !== this.components.length)
        throw new Error("array is wrong length");
      const r = this;
      return t.map((s, i) => r.components[i].walk(s, e));
    }
    return e(this.type, t);
  }
  /**
   *  Walks the **ParamType** with %%value%%, asynchronously calling
   *  %%process%% on each type, destructing the %%value%% recursively.
   *
   *  This can be used to resolve ENS names by walking and resolving each
   *  ``"address"`` type.
   */
  async walkAsync(t, e) {
    const r = [], s = [t];
    return F(this, wo, ga).call(this, r, t, e, (i) => {
      s[0] = i;
    }), r.length && await Promise.all(r), s[0];
  }
  /**
   *  Creates a new **ParamType** for %%obj%%.
   *
   *  If %%allowIndexed%% then the ``indexed`` keyword is permitted,
   *  otherwise the ``indexed`` keyword will throw an error.
   */
  static from(t, e) {
    if (Se.isParamType(t))
      return t;
    if (typeof t == "string")
      try {
        return Se.from(hr(t), e);
      } catch {
        B(!1, "invalid param type", "obj", t);
      }
    else if (t instanceof Cn) {
      let c = "", a = "", l = null;
      Sn(t, ee(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN") ? (a = "tuple", l = t.popParams().map((y) => Se.from(y)), c = `tuple(${l.map((y) => y.format()).join(",")})`) : (c = Hh(t.popType("TYPE")), a = c);
      let h = null, u = null;
      for (; t.length && t.peekType("BRACKET"); ) {
        const y = t.pop();
        h = new Se(At, "", c, a, null, l, u, h), u = y.value, c += y.text, a = "array", l = null;
      }
      let p = null;
      if (Sn(t, Nb).has("indexed")) {
        if (!e)
          throw new Error("");
        p = !0;
      }
      const b = t.peekType("ID") ? t.pop().text : "";
      if (t.length)
        throw new Error("leftover tokens");
      return new Se(At, b, c, a, p, l, u, h);
    }
    const r = t.name;
    B(!r || typeof r == "string" && r.match(kp), "invalid name", "obj.name", r);
    let s = t.indexed;
    s != null && (B(e, "parameter cannot be indexed", "obj.indexed", t.indexed), s = !!s);
    let i = t.type, o = i.match(Pb);
    if (o) {
      const c = parseInt(o[2] || "-1"), a = Se.from({
        type: o[1],
        components: t.components
      });
      return new Se(At, r || "", i, "array", s, null, c, a);
    }
    if (i === "tuple" || i.startsWith(
      "tuple("
      /* fix: ) */
    ) || i.startsWith(
      "("
      /* fix: ) */
    )) {
      const c = t.components != null ? t.components.map((a) => Se.from(a)) : null;
      return new Se(At, r || "", i, "tuple", s, c, null, null);
    }
    return i = Hh(t.type), new Se(At, r || "", i, i, s, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(t) {
    return t && t[ce] === _h;
  }
};
wo = /* @__PURE__ */ new WeakSet(), ga = function(n, t, e, r) {
  if (this.isArray()) {
    if (!Array.isArray(t))
      throw new Error("invalid array value");
    if (this.arrayLength !== -1 && t.length !== this.arrayLength)
      throw new Error("array is wrong length");
    const i = this.arrayChildren, o = t.slice();
    o.forEach((c, a) => {
      var l;
      F(l = i, wo, ga).call(l, n, c, e, (h) => {
        o[a] = h;
      });
    }), r(o);
    return;
  }
  if (this.isTuple()) {
    const i = this.components;
    let o;
    if (Array.isArray(t))
      o = t.slice();
    else {
      if (t == null || typeof t != "object")
        throw new Error("invalid tuple value");
      o = i.map((c) => {
        if (!c.name)
          throw new Error("cannot use object value with unnamed components");
        if (!(c.name in t))
          throw new Error(`missing value for component ${c.name}`);
        return t[c.name];
      });
    }
    if (o.length !== this.components.length)
      throw new Error("array is wrong length");
    o.forEach((c, a) => {
      var l;
      F(l = i[a], wo, ga).call(l, n, c, e, (h) => {
        o[a] = h;
      });
    }), r(o);
    return;
  }
  const s = e(this.type, t);
  s.then ? n.push(async function() {
    r(await s);
  }()) : r(s);
};
let ne = Ub;
class os {
  /**
   *  @private
   */
  constructor(t, e, r) {
    S(this, "type"), S(this, "inputs"), Do(t, At, "Fragment"), r = Object.freeze(r.slice()), q(this, { type: e, inputs: r });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(t) {
    if (typeof t == "string") {
      try {
        os.from(JSON.parse(t));
      } catch {
      }
      return os.from(hr(t));
    }
    if (t instanceof Cn)
      switch (t.peekKeyword(Bp)) {
        case "constructor":
          return On.from(t);
        case "error":
          return gn.from(t);
        case "event":
          return nn.from(t);
        case "fallback":
        case "receive":
          return Qh.from(t);
        case "function":
          return rn.from(t);
        case "struct":
          return Zr.from(t);
      }
    else if (typeof t == "object") {
      switch (t.type) {
        case "constructor":
          return On.from(t);
        case "error":
          return gn.from(t);
        case "event":
          return nn.from(t);
        case "fallback":
        case "receive":
          return Qh.from(t);
        case "function":
          return rn.from(t);
        case "struct":
          return Zr.from(t);
      }
      D(!1, `unsupported type: ${t.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    B(!1, "unsupported frgament object", "obj", t);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(t) {
    return On.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(t) {
    return gn.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(t) {
    return nn.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(t) {
    return rn.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(t) {
    return Zr.isFragment(t);
  }
}
class nc extends os {
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    super(t, e, s), S(this, "name"), B(typeof r == "string" && r.match(kp), "invalid identifier", "name", r), s = Object.freeze(s.slice()), q(this, { name: r });
  }
}
function Ro(n, t) {
  return "(" + t.map((e) => e.format(n)).join(n === "full" ? ", " : ",") + ")";
}
let gn = class Xi extends nc {
  /**
   *  @private
   */
  constructor(t, e, r) {
    super(t, "error", e, r), Object.defineProperty(this, ce, { value: Gh });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return ss(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this fragment as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    const e = [];
    return t !== "sighash" && e.push("error"), e.push(this.name + Ro(t, this.inputs)), e.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(t) {
    if (Xi.isFragment(t))
      return t;
    if (typeof t == "string")
      return Xi.from(hr(t));
    if (t instanceof Cn) {
      const e = ec("error", t), r = kn(t);
      return is(t), new Xi(At, e, r);
    }
    return new Xi(At, t.name, t.inputs ? t.inputs.map(ne.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(t) {
    return t && t[ce] === Gh;
  }
};
class nn extends nc {
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    super(t, "event", e, r), S(this, "anonymous"), Object.defineProperty(this, ce, { value: Vh }), q(this, { anonymous: s });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return ss(this.format("sighash"));
  }
  /**
   *  Returns a string representation of this event as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    const e = [];
    return t !== "sighash" && e.push("event"), e.push(this.name + Ro(t, this.inputs)), t !== "sighash" && this.anonymous && e.push("anonymous"), e.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(t, e) {
    return e = (e || []).map((r) => ne.from(r)), new nn(At, t, e, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(t) {
    if (nn.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return nn.from(hr(t));
      } catch {
        B(!1, "invalid event fragment", "obj", t);
      }
    else if (t instanceof Cn) {
      const e = ec("event", t), r = kn(t, !0), s = !!Sn(t, ee(["anonymous"])).has("anonymous");
      return is(t), new nn(At, e, r, s);
    }
    return new nn(At, t.name, t.inputs ? t.inputs.map((e) => ne.from(e, !0)) : [], !!t.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(t) {
    return t && t[ce] === Vh;
  }
}
class On extends os {
  /**
   *  @private
   */
  constructor(t, e, r, s, i) {
    super(t, e, r), S(this, "payable"), S(this, "gas"), Object.defineProperty(this, ce, { value: $h }), q(this, { payable: s, gas: i });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(t) {
    if (D(t != null && t !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), t === "json")
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    const e = [`constructor${Ro(t, this.inputs)}`];
    return this.payable && e.push("payable"), this.gas != null && e.push(`@${this.gas.toString()}`), e.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(t) {
    if (On.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return On.from(hr(t));
      } catch {
        B(!1, "invalid constuctor fragment", "obj", t);
      }
    else if (t instanceof Cn) {
      Sn(t, ee(["constructor"]));
      const e = kn(t), r = !!Sn(t, xb).has("payable"), s = Pp(t);
      return is(t), new On(At, "constructor", e, r, s);
    }
    return new On(At, "constructor", t.inputs ? t.inputs.map(ne.from) : [], !!t.payable, t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(t) {
    return t && t[ce] === $h;
  }
}
let Qh = class br extends os {
  constructor(t, e, r) {
    super(t, "fallback", e), S(this, "payable"), Object.defineProperty(this, ce, { value: jh }), q(this, { payable: r });
  }
  /**
   *  Returns a string representation of this fallback as %%format%%.
   */
  format(t) {
    const e = this.inputs.length === 0 ? "receive" : "fallback";
    if (t === "json") {
      const r = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: e, stateMutability: r });
    }
    return `${e}()${this.payable ? " payable" : ""}`;
  }
  /**
   *  Returns a new **FallbackFragment** for %%obj%%.
   */
  static from(t) {
    if (br.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return br.from(hr(t));
      } catch {
        B(!1, "invalid fallback fragment", "obj", t);
      }
    else if (t instanceof Cn) {
      const e = t.toString(), r = t.peekKeyword(ee(["fallback", "receive"]));
      if (B(r, "type must be fallback or receive", "obj", e), t.popKeyword(ee(["fallback", "receive"])) === "receive") {
        const o = kn(t);
        return B(o.length === 0, "receive cannot have arguments", "obj.inputs", o), Sn(t, ee(["payable"])), is(t), new br(At, [], !0);
      }
      let s = kn(t);
      s.length ? B(s.length === 1 && s[0].type === "bytes", "invalid fallback inputs", "obj.inputs", s.map((o) => o.format("minimal")).join(", ")) : s = [ne.from("bytes")];
      const i = Cp(t);
      if (B(i === "nonpayable" || i === "payable", "fallback cannot be constants", "obj.stateMutability", i), Sn(t, ee(["returns"])).has("returns")) {
        const o = kn(t);
        B(o.length === 1 && o[0].type === "bytes", "invalid fallback outputs", "obj.outputs", o.map((c) => c.format("minimal")).join(", "));
      }
      return is(t), new br(At, s, i === "payable");
    }
    if (t.type === "receive")
      return new br(At, [], !0);
    if (t.type === "fallback") {
      const e = [ne.from("bytes")], r = t.stateMutability === "payable";
      return new br(At, e, r);
    }
    B(!1, "invalid fallback description", "obj", t);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(t) {
    return t && t[ce] === jh;
  }
};
class rn extends nc {
  /**
   *  @private
   */
  constructor(t, e, r, s, i, o) {
    super(t, "function", e, s), S(this, "constant"), S(this, "outputs"), S(this, "stateMutability"), S(this, "payable"), S(this, "gas"), Object.defineProperty(this, ce, { value: Wh }), i = Object.freeze(i.slice()), q(this, { constant: r === "view" || r === "pure", gas: o, outputs: i, payable: r === "payable", stateMutability: r });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return ss(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this function as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t))),
        outputs: this.outputs.map((r) => JSON.parse(r.format(t)))
      });
    const e = [];
    return t !== "sighash" && e.push("function"), e.push(this.name + Ro(t, this.inputs)), t !== "sighash" && (this.stateMutability !== "nonpayable" && e.push(this.stateMutability), this.outputs && this.outputs.length && (e.push("returns"), e.push(Ro(t, this.outputs))), this.gas != null && e.push(`@${this.gas.toString()}`)), e.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(t, e) {
    return e = (e || []).map((r) => ne.from(r)), new rn(At, t, "view", e, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(t) {
    if (rn.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return rn.from(hr(t));
      } catch {
        B(!1, "invalid function fragment", "obj", t);
      }
    else if (t instanceof Cn) {
      const r = ec("function", t), s = kn(t), i = Cp(t);
      let o = [];
      Sn(t, ee(["returns"])).has("returns") && (o = kn(t));
      const c = Pp(t);
      return is(t), new rn(At, r, i, s, o, c);
    }
    let e = t.stateMutability;
    return e == null && (e = "payable", typeof t.constant == "boolean" ? (e = "view", t.constant || (e = "payable", typeof t.payable == "boolean" && !t.payable && (e = "nonpayable"))) : typeof t.payable == "boolean" && !t.payable && (e = "nonpayable")), new rn(At, t.name, e, t.inputs ? t.inputs.map(ne.from) : [], t.outputs ? t.outputs.map(ne.from) : [], t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(t) {
    return t && t[ce] === Wh;
  }
}
class Zr extends nc {
  /**
   *  @private
   */
  constructor(t, e, r) {
    super(t, "struct", e, r), Object.defineProperty(this, ce, { value: zh });
  }
  /**
   *  Returns a string representation of this struct as %%format%%.
   */
  format() {
    throw new Error("@TODO");
  }
  /**
   *  Returns a new **StructFragment** for %%obj%%.
   */
  static from(t) {
    if (typeof t == "string")
      try {
        return Zr.from(hr(t));
      } catch {
        B(!1, "invalid struct fragment", "obj", t);
      }
    else if (t instanceof Cn) {
      const e = ec("struct", t), r = kn(t);
      return is(t), new Zr(At, e, r);
    }
    return new Zr(At, t.name, t.inputs ? t.inputs.map(ne.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(t) {
    return t && t[ce] === zh;
  }
}
const $e = /* @__PURE__ */ new Map();
$e.set(0, "GENERIC_PANIC");
$e.set(1, "ASSERT_FALSE");
$e.set(17, "OVERFLOW");
$e.set(18, "DIVIDE_BY_ZERO");
$e.set(33, "ENUM_RANGE_ERROR");
$e.set(34, "BAD_STORAGE_DATA");
$e.set(49, "STACK_UNDERFLOW");
$e.set(50, "ARRAY_RANGE_ERROR");
$e.set(65, "OUT_OF_MEMORY");
$e.set(81, "UNINITIALIZED_FUNCTION_CALL");
const Lb = new RegExp(/^bytes([0-9]*)$/), Db = new RegExp(/^(u?int)([0-9]*)$/);
let kc = null, qh = 1024;
function Fb(n, t, e, r) {
  let s = "missing revert data", i = null;
  const o = null;
  let c = null;
  if (e) {
    s = "execution reverted";
    const l = et(e);
    if (e = W(e), l.length === 0)
      s += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (l.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (W(l.slice(0, 4)) === "0x08c379a0")
      try {
        i = r.decode(["string"], l.slice(4))[0], c = {
          signature: "Error(string)",
          name: "Error",
          args: [i]
        }, s += `: ${JSON.stringify(i)}`;
      } catch {
        s += " (could not decode reason; invalid string data)";
      }
    else if (W(l.slice(0, 4)) === "0x4e487b71")
      try {
        const h = Number(r.decode(["uint256"], l.slice(4))[0]);
        c = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [h]
        }, i = `Panic due to ${$e.get(h) || "UNKNOWN"}(${h})`, s += `: ${i}`;
      } catch {
        s += " (could not decode panic code)";
      }
    else
      s += " (unknown custom error)";
  }
  const a = {
    to: t.to ? ft(t.to) : null,
    data: t.data || "0x"
  };
  return t.from && (a.from = ft(t.from)), vt(s, "CALL_EXCEPTION", {
    action: n,
    data: e,
    reason: i,
    transaction: a,
    invocation: o,
    revert: c
  });
}
var $r, Js;
const Mb = class vl {
  constructor() {
    C(this, $r);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(t) {
    const e = t.map((r) => F(this, $r, Js).call(this, ne.from(r)));
    return new la(e, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(t, e) {
    Xf(e.length, t.length, "types/values length mismatch");
    const r = t.map((o) => F(this, $r, Js).call(this, ne.from(o))), s = new la(r, "_"), i = new il();
    return s.encode(i, e), i.data;
  }
  /**
   *  Decode the ABI %%data%% as the %%types%% into values.
   *
   *  If %%loose%% decoding is enabled, then strict padding is
   *  not enforced. Some older versions of Solidity incorrectly
   *  padded event data emitted from ``external`` functions.
   */
  decode(t, e, r) {
    const s = t.map((i) => F(this, $r, Js).call(this, ne.from(i)));
    return new la(s, "_").decode(new by(e, r, qh));
  }
  static _setDefaultMaxInflation(t) {
    B(typeof t == "number" && Number.isInteger(t), "invalid defaultMaxInflation factor", "value", t), qh = t;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return kc == null && (kc = new vl()), kc;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(t, e, r) {
    return Fb(t, e, r, vl.defaultAbiCoder());
  }
};
$r = /* @__PURE__ */ new WeakSet(), Js = function(n) {
  if (n.isArray())
    return new Xm(F(this, $r, Js).call(this, n.arrayChildren), n.arrayLength, n.name);
  if (n.isTuple())
    return new la(n.components.map((e) => F(this, $r, Js).call(this, e)), n.name);
  switch (n.baseType) {
    case "address":
      return new Zm(n.name);
    case "bool":
      return new tw(n.name);
    case "string":
      return new lw(n.name);
    case "bytes":
      return new ew(n.name);
    case "":
      return new sw(n.name);
  }
  let t = n.type.match(Db);
  if (t) {
    let e = parseInt(t[2] || "256");
    return B(e !== 0 && e <= 256 && e % 8 === 0, "invalid " + t[1] + " bit length", "param", n), new cw(e / 8, t[1] === "int", n.name);
  }
  if (t = n.type.match(Lb), t) {
    let e = parseInt(t[1]);
    return B(e !== 0 && e <= 32, "invalid bytes length", "param", n), new nw(e, n.name);
  }
  B(!1, "invalid type", "type", n.type);
};
let Co = Mb;
function xl(n) {
  const t = Ve(n);
  if (t.length > 31)
    throw new Error("bytes32 string must be less than 32 bytes");
  return nu(t, 32);
}
class Hb {
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    S(this, "fragment"), S(this, "name"), S(this, "signature"), S(this, "topic"), S(this, "args");
    const s = t.name, i = t.format();
    q(this, {
      fragment: t,
      name: s,
      signature: i,
      topic: e,
      args: r
    });
  }
}
class _b {
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s) {
    S(this, "fragment"), S(this, "name"), S(this, "args"), S(this, "signature"), S(this, "selector"), S(this, "value");
    const i = t.name, o = t.format();
    q(this, {
      fragment: t,
      name: i,
      args: r,
      signature: o,
      selector: e,
      value: s
    });
  }
}
class Gb {
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    S(this, "fragment"), S(this, "name"), S(this, "args"), S(this, "signature"), S(this, "selector");
    const s = t.name, i = t.format();
    q(this, {
      fragment: t,
      name: s,
      args: r,
      signature: i,
      selector: e
    });
  }
}
class Kh {
  /**
   *  @_ignore:
   */
  constructor(t) {
    S(this, "hash"), S(this, "_isIndexed"), q(this, { hash: t, _isIndexed: !0 });
  }
  /**
   *  Returns ``true`` if %%value%% is an **Indexed**.
   *
   *  This provides a Type Guard for property access.
   */
  static isIndexed(t) {
    return !!(t && t._isIndexed);
  }
}
const Jh = {
  0: "generic panic",
  1: "assert(false)",
  17: "arithmetic overflow",
  18: "division or modulo by zero",
  33: "enum overflow",
  34: "invalid encoded storage byte array accessed",
  49: "out-of-bounds array access; popping on an empty array",
  50: "out-of-bounds access of an array or bytesN",
  65: "out of memory",
  81: "uninitialized function"
}, Zh = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: (n) => `reverted with reason string ${JSON.stringify(n)}`
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"],
    reason: (n) => {
      let t = "unknown panic code";
      return n >= 0 && n <= 255 && Jh[n.toString()] && (t = Jh[n.toString()]), `reverted with panic code 0x${n.toString(16)} (${t})`;
    }
  }
};
var fn, An, En, Qt, Yn, ya, ma;
const Vb = class ks {
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(t) {
    C(this, Yn), S(this, "fragments"), S(this, "deploy"), S(this, "fallback"), S(this, "receive"), C(this, fn), C(this, An), C(this, En), C(this, Qt);
    let e = [];
    typeof t == "string" ? e = JSON.parse(t) : e = t, A(this, En, /* @__PURE__ */ new Map()), A(this, fn, /* @__PURE__ */ new Map()), A(this, An, /* @__PURE__ */ new Map());
    const r = [];
    for (const o of e)
      try {
        r.push(os.from(o));
      } catch (c) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(o)}:`, c.message);
      }
    q(this, {
      fragments: Object.freeze(r)
    });
    let s = null, i = !1;
    A(this, Qt, this.getAbiCoder()), this.fragments.forEach((o, c) => {
      let a;
      switch (o.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          q(this, { deploy: o });
          return;
        case "fallback":
          o.inputs.length === 0 ? i = !0 : (B(!s || o.payable !== s.payable, "conflicting fallback fragments", `fragments[${c}]`, o), s = o, i = s.payable);
          return;
        case "function":
          a = f(this, En);
          break;
        case "event":
          a = f(this, An);
          break;
        case "error":
          a = f(this, fn);
          break;
        default:
          return;
      }
      const l = o.format();
      a.has(l) || a.set(l, o);
    }), this.deploy || q(this, {
      deploy: On.from("constructor()")
    }), q(this, { fallback: s, receive: i });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(t) {
    const e = t ? "minimal" : "full";
    return this.fragments.map((r) => r.format(e));
  }
  /**
   *  Return the JSON-encoded ABI. This is the format Solidiy
   *  returns.
   */
  formatJson() {
    const t = this.fragments.map((e) => e.format("json"));
    return JSON.stringify(t.map((e) => JSON.parse(e)));
  }
  /**
   *  The ABI coder that will be used to encode and decode binary
   *  data.
   */
  getAbiCoder() {
    return Co.defaultAbiCoder();
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(t) {
    const e = F(this, Yn, ya).call(this, t, null, !1);
    return B(e, "no matching function", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(t) {
    return !!F(this, Yn, ya).call(this, t, null, !1);
  }
  /**
   *  Get the [[FunctionFragment]] for %%key%%, which may be a function
   *  selector, function name or function signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple functions match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single function in
   *  the ABI, this will throw.
   */
  getFunction(t, e) {
    return F(this, Yn, ya).call(this, t, e || null, !0);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(t) {
    const e = Array.from(f(this, En).keys());
    e.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t(f(this, En).get(s), r);
    }
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(t) {
    const e = F(this, Yn, ma).call(this, t, null, !1);
    return B(e, "no matching event", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(t) {
    return !!F(this, Yn, ma).call(this, t, null, !1);
  }
  /**
   *  Get the [[EventFragment]] for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple events match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single event in
   *  the ABI, this will throw.
   */
  getEvent(t, e) {
    return F(this, Yn, ma).call(this, t, e || null, !0);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(t) {
    const e = Array.from(f(this, An).keys());
    e.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t(f(this, An).get(s), r);
    }
  }
  /**
   *  Get the [[ErrorFragment]] for %%key%%, which may be an error
   *  selector, error name or error signature that belongs to the ABI.
   *
   *  If %%values%% is provided, it will use the Typed API to handle
   *  ambiguous cases where multiple errors match by name.
   *
   *  If the %%key%% and %%values%% do not refine to a single error in
   *  the ABI, this will throw.
   */
  getError(t, e) {
    if (gt(t)) {
      const r = t.toLowerCase();
      if (Zh[r])
        return gn.from(Zh[r].signature);
      for (const s of f(this, fn).values())
        if (r === s.selector)
          return s;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const r = [];
      for (const [s, i] of f(this, fn))
        s.split(
          "("
          /* fix:) */
        )[0] === t && r.push(i);
      if (r.length === 0)
        return t === "Error" ? gn.from("error Error(string)") : t === "Panic" ? gn.from("error Panic(uint256)") : null;
      if (r.length > 1) {
        const s = r.map((i) => JSON.stringify(i.format())).join(", ");
        B(!1, `ambiguous error description (i.e. ${s})`, "name", t);
      }
      return r[0];
    }
    return t = gn.from(t).format(), t === "Error(string)" ? gn.from("error Error(string)") : t === "Panic(uint256)" ? gn.from("error Panic(uint256)") : f(this, fn).get(t) || null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(t) {
    const e = Array.from(f(this, fn).keys());
    e.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t(f(this, fn).get(s), r);
    }
  }
  // Get the 4-byte selector used by Solidity to identify a function
  /*
  getSelector(fragment: ErrorFragment | FunctionFragment): string {
      if (typeof(fragment) === "string") {
          const matches: Array<Fragment> = [ ];
  
          try { matches.push(this.getFunction(fragment)); } catch (error) { }
          try { matches.push(this.getError(<string>fragment)); } catch (_) { }
  
          if (matches.length === 0) {
              logger.throwArgumentError("unknown fragment", "key", fragment);
          } else if (matches.length > 1) {
              logger.throwArgumentError("ambiguous fragment matches function and error", "key", fragment);
          }
  
          fragment = matches[0];
      }
  
      return dataSlice(id(fragment.format()), 0, 4);
  }
      */
  // Get the 32-byte topic hash used by Solidity to identify an event
  /*
  getEventTopic(fragment: EventFragment): string {
      //if (typeof(fragment) === "string") { fragment = this.getEvent(eventFragment); }
      return id(fragment.format());
  }
  */
  _decodeParams(t, e) {
    return f(this, Qt).decode(t, e);
  }
  _encodeParams(t, e) {
    return f(this, Qt).encode(t, e);
  }
  /**
   *  Encodes a ``tx.data`` object for deploying the Contract with
   *  the %%values%% as the constructor arguments.
   */
  encodeDeploy(t) {
    return this._encodeParams(this.deploy.inputs, t || []);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified error (see [[getError]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeErrorResult(t, e) {
    if (typeof t == "string") {
      const r = this.getError(t);
      B(r, "unknown error", "fragment", t), t = r;
    }
    return B(xt(e, 0, 4) === t.selector, `data signature does not match error ${t.name}.`, "data", e), this._decodeParams(t.inputs, xt(e, 4));
  }
  /**
   *  Encodes the transaction revert data for a call result that
   *  reverted from the the Contract with the sepcified %%error%%
   *  (see [[getError]] for valid values for %%fragment%%) with the %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeErrorResult(t, e) {
    if (typeof t == "string") {
      const r = this.getError(t);
      B(r, "unknown error", "fragment", t), t = r;
    }
    return Et([
      t.selector,
      this._encodeParams(t.inputs, e || [])
    ]);
  }
  /**
   *  Decodes the %%data%% from a transaction ``tx.data`` for
   *  the function specified (see [[getFunction]] for valid values
   *  for %%fragment%%).
   *
   *  Most developers should prefer the [[parseTransaction]] method
   *  instead, which will automatically detect the fragment.
   */
  decodeFunctionData(t, e) {
    if (typeof t == "string") {
      const r = this.getFunction(t);
      B(r, "unknown function", "fragment", t), t = r;
    }
    return B(xt(e, 0, 4) === t.selector, `data signature does not match function ${t.name}.`, "data", e), this._decodeParams(t.inputs, xt(e, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(t, e) {
    if (typeof t == "string") {
      const r = this.getFunction(t);
      B(r, "unknown function", "fragment", t), t = r;
    }
    return Et([
      t.selector,
      this._encodeParams(t.inputs, e || [])
    ]);
  }
  /**
   *  Decodes the result %%data%% (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values for
   *  %%key%%).
   *
   *  Most developers should prefer the [[parseCallResult]] method instead,
   *  which will automatically detect a ``CALL_EXCEPTION`` and throw the
   *  corresponding error.
   */
  decodeFunctionResult(t, e) {
    if (typeof t == "string") {
      const i = this.getFunction(t);
      B(i, "unknown function", "fragment", t), t = i;
    }
    let r = "invalid length for result data";
    const s = Yt(e);
    if (s.length % 32 === 0)
      try {
        return f(this, Qt).decode(t.outputs, s);
      } catch {
        r = "could not decode result data";
      }
    D(!1, r, "BAD_DATA", {
      value: W(s),
      info: { method: t.name, signature: t.format() }
    });
  }
  makeError(t, e) {
    const r = et(t, "data"), s = Co.getBuiltinCallException("call", e, r);
    if (s.message.startsWith("execution reverted (unknown custom error)")) {
      const o = W(r.slice(0, 4)), c = this.getError(o);
      if (c)
        try {
          const a = f(this, Qt).decode(c.inputs, r.slice(4));
          s.revert = {
            name: c.name,
            signature: c.format(),
            args: a
          }, s.reason = s.revert.signature, s.message = `execution reverted: ${s.reason}`;
        } catch {
          s.message = "execution reverted (coult not decode custom error)";
        }
    }
    const i = this.parseTransaction(e);
    return i && (s.invocation = {
      method: i.name,
      signature: i.signature,
      args: i.args
    }), s;
  }
  /**
   *  Encodes the result data (e.g. from an ``eth_call``) for the
   *  specified function (see [[getFunction]] for valid values
   *  for %%fragment%%) with %%values%%.
   *
   *  This is generally not used by most developers, unless trying to mock
   *  a result from a Contract.
   */
  encodeFunctionResult(t, e) {
    if (typeof t == "string") {
      const r = this.getFunction(t);
      B(r, "unknown function", "fragment", t), t = r;
    }
    return W(f(this, Qt).encode(t.outputs, e || []));
  }
  /*
      spelunk(inputs: Array<ParamType>, values: ReadonlyArray<any>, processfunc: (type: string, value: any) => Promise<any>): Promise<Array<any>> {
          const promises: Array<Promise<>> = [ ];
          const process = function(type: ParamType, value: any): any {
              if (type.baseType === "array") {
                  return descend(type.child
              }
              if (type. === "address") {
              }
          };
  
          const descend = function (inputs: Array<ParamType>, values: ReadonlyArray<any>) {
              if (inputs.length !== values.length) { throw new Error("length mismatch"); }
              
          };
  
          const result: Array<any> = [ ];
          values.forEach((value, index) => {
              if (value == null) {
                  topics.push(null);
              } else if (param.baseType === "array" || param.baseType === "tuple") {
                  logger.throwArgumentError("filtering with tuples or arrays not supported", ("contract." + param.name), value);
              } else if (Array.isArray(value)) {
                  topics.push(value.map((value) => encodeTopic(param, value)));
              } else {
                  topics.push(encodeTopic(param, value));
              }
          });
      }
  */
  // Create the filter for the event with search criteria (e.g. for eth_filterLog)
  encodeFilterTopics(t, e) {
    if (typeof t == "string") {
      const i = this.getEvent(t);
      B(i, "unknown event", "eventFragment", t), t = i;
    }
    D(e.length <= t.inputs.length, `too many arguments for ${t.format()}`, "UNEXPECTED_ARGUMENT", { count: e.length, expectedCount: t.inputs.length });
    const r = [];
    t.anonymous || r.push(t.topicHash);
    const s = (i, o) => i.type === "string" ? ss(o) : i.type === "bytes" ? It(W(o)) : (i.type === "bool" && typeof o == "boolean" ? o = o ? "0x01" : "0x00" : i.type.match(/^u?int/) ? o = lr(o) : i.type.match(/^bytes/) ? o = nu(o, 32) : i.type === "address" && f(this, Qt).encode(["address"], [o]), sn(W(o), 32));
    for (e.forEach((i, o) => {
      const c = t.inputs[o];
      if (!c.indexed) {
        B(i == null, "cannot filter non-indexed parameters; must be null", "contract." + c.name, i);
        return;
      }
      i == null ? r.push(null) : c.baseType === "array" || c.baseType === "tuple" ? B(!1, "filtering with tuples or arrays not supported", "contract." + c.name, i) : Array.isArray(i) ? r.push(i.map((a) => s(c, a))) : r.push(s(c, i));
    }); r.length && r[r.length - 1] === null; )
      r.pop();
    return r;
  }
  encodeEventLog(t, e) {
    if (typeof t == "string") {
      const o = this.getEvent(t);
      B(o, "unknown event", "eventFragment", t), t = o;
    }
    const r = [], s = [], i = [];
    return t.anonymous || r.push(t.topicHash), B(e.length === t.inputs.length, "event arguments/values mismatch", "values", e), t.inputs.forEach((o, c) => {
      const a = e[c];
      if (o.indexed)
        if (o.type === "string")
          r.push(ss(a));
        else if (o.type === "bytes")
          r.push(It(a));
        else {
          if (o.baseType === "tuple" || o.baseType === "array")
            throw new Error("not implemented");
          r.push(f(this, Qt).encode([o.type], [a]));
        }
      else
        s.push(o), i.push(a);
    }), {
      data: f(this, Qt).encode(s, i),
      topics: r
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(t, e, r) {
    if (typeof t == "string") {
      const b = this.getEvent(t);
      B(b, "unknown event", "eventFragment", t), t = b;
    }
    if (r != null && !t.anonymous) {
      const b = t.topicHash;
      B(gt(r[0], 32) && r[0].toLowerCase() === b, "fragment/topic mismatch", "topics[0]", r[0]), r = r.slice(1);
    }
    const s = [], i = [], o = [];
    t.inputs.forEach((b, y) => {
      b.indexed ? b.type === "string" || b.type === "bytes" || b.baseType === "tuple" || b.baseType === "array" ? (s.push(ne.from({ type: "bytes32", name: b.name })), o.push(!0)) : (s.push(b), o.push(!1)) : (i.push(b), o.push(!1));
    });
    const c = r != null ? f(this, Qt).decode(s, Et(r)) : null, a = f(this, Qt).decode(i, e, !0), l = [], h = [];
    let u = 0, p = 0;
    return t.inputs.forEach((b, y) => {
      let d = null;
      if (b.indexed)
        if (c == null)
          d = new Kh(null);
        else if (o[y])
          d = new Kh(c[p++]);
        else
          try {
            d = c[p++];
          } catch (g) {
            d = g;
          }
      else
        try {
          d = a[u++];
        } catch (g) {
          d = g;
        }
      l.push(d), h.push(b.name || null);
    }), Da.fromItems(l, h);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(t) {
    const e = et(t.data, "tx.data"), r = z(t.value != null ? t.value : 0, "tx.value"), s = this.getFunction(W(e.slice(0, 4)));
    if (!s)
      return null;
    const i = f(this, Qt).decode(s.inputs, e.slice(4));
    return new _b(s, s.selector, i, r);
  }
  parseCallResult(t) {
    throw new Error("@TODO");
  }
  /**
   *  Parses a receipt log, finding the matching event and extracts
   *  the parameter values along with other useful event details.
   *
   *  If the matching event cannot be found, returns null.
   */
  parseLog(t) {
    const e = this.getEvent(t.topics[0]);
    return !e || e.anonymous ? null : new Hb(e, e.topicHash, this.decodeEventLog(e, t.data, t.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(t) {
    const e = W(t), r = this.getError(xt(e, 0, 4));
    if (!r)
      return null;
    const s = f(this, Qt).decode(r.inputs, xt(e, 4));
    return new Gb(r, r.selector, s);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(t) {
    return t instanceof ks ? t : typeof t == "string" ? new ks(JSON.parse(t)) : typeof t.formatJson == "function" ? new ks(t.formatJson()) : typeof t.format == "function" ? new ks(t.format("json")) : new ks(t);
  }
};
fn = /* @__PURE__ */ new WeakMap(), An = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), Qt = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakSet(), // Find a function definition by any means necessary (unless it is ambiguous)
ya = function(n, t, e) {
  if (gt(n)) {
    const r = n.toLowerCase();
    for (const s of f(this, En).values())
      if (r === s.selector)
        return s;
    return null;
  }
  if (n.indexOf("(") === -1) {
    const r = [];
    for (const [s, i] of f(this, En))
      s.split(
        "("
        /* fix:) */
      )[0] === n && r.push(i);
    if (t) {
      const s = t.length > 0 ? t[t.length - 1] : null;
      let i = t.length, o = !0;
      ae.isTyped(s) && s.type === "overrides" && (o = !1, i--);
      for (let c = r.length - 1; c >= 0; c--) {
        const a = r[c].inputs.length;
        a !== i && (!o || a !== i - 1) && r.splice(c, 1);
      }
      for (let c = r.length - 1; c >= 0; c--) {
        const a = r[c].inputs;
        for (let l = 0; l < t.length; l++)
          if (ae.isTyped(t[l])) {
            if (l >= a.length) {
              if (t[l].type === "overrides")
                continue;
              r.splice(c, 1);
              break;
            }
            if (t[l].type !== a[l].baseType) {
              r.splice(c, 1);
              break;
            }
          }
      }
    }
    if (r.length === 1 && t && t.length !== r[0].inputs.length) {
      const s = t[t.length - 1];
      (s == null || Array.isArray(s) || typeof s != "object") && r.splice(0, 1);
    }
    if (r.length === 0)
      return null;
    if (r.length > 1 && e) {
      const s = r.map((i) => JSON.stringify(i.format())).join(", ");
      B(!1, `ambiguous function description (i.e. matches ${s})`, "key", n);
    }
    return r[0];
  }
  return f(this, En).get(rn.from(n).format()) || null;
}, // Find an event definition by any means necessary (unless it is ambiguous)
ma = function(n, t, e) {
  if (gt(n)) {
    const r = n.toLowerCase();
    for (const s of f(this, An).values())
      if (r === s.topicHash)
        return s;
    return null;
  }
  if (n.indexOf("(") === -1) {
    const r = [];
    for (const [s, i] of f(this, An))
      s.split(
        "("
        /* fix:) */
      )[0] === n && r.push(i);
    if (t) {
      for (let s = r.length - 1; s >= 0; s--)
        r[s].inputs.length < t.length && r.splice(s, 1);
      for (let s = r.length - 1; s >= 0; s--) {
        const i = r[s].inputs;
        for (let o = 0; o < t.length; o++)
          if (ae.isTyped(t[o]) && t[o].type !== i[o].baseType) {
            r.splice(s, 1);
            break;
          }
      }
    }
    if (r.length === 0)
      return null;
    if (r.length > 1 && e) {
      const s = r.map((i) => JSON.stringify(i.format())).join(", ");
      B(!1, `ambiguous event description (i.e. matches ${s})`, "key", n);
    }
    return r[0];
  }
  return f(this, An).get(nn.from(n).format()) || null;
};
let Ss = Vb;
const Up = BigInt(0);
function Zs(n) {
  return n ?? null;
}
function Nt(n) {
  return n == null ? null : n.toString();
}
class Yh {
  /**
   *  Creates a new FeeData for %%gasPrice%%, %%maxFeePerGas%% and
   *  %%maxPriorityFeePerGas%%.
   */
  constructor(t, e, r) {
    S(this, "gasPrice"), S(this, "maxFeePerGas"), S(this, "maxPriorityFeePerGas"), q(this, {
      gasPrice: Zs(t),
      maxFeePerGas: Zs(e),
      maxPriorityFeePerGas: Zs(r)
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { gasPrice: t, maxFeePerGas: e, maxPriorityFeePerGas: r } = this;
    return {
      _type: "FeeData",
      gasPrice: Nt(t),
      maxFeePerGas: Nt(e),
      maxPriorityFeePerGas: Nt(r)
    };
  }
}
function rc(n) {
  const t = {};
  n.to && (t.to = n.to), n.from && (t.from = n.from), n.data && (t.data = W(n.data));
  const e = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const s of e)
    !(s in n) || n[s] == null || (t[s] = z(n[s], `request.${s}`));
  const r = "type,nonce".split(/,/);
  for (const s of r)
    !(s in n) || n[s] == null || (t[s] = nt(n[s], `request.${s}`));
  return n.accessList && (t.accessList = fs(n.accessList)), "blockTag" in n && (t.blockTag = n.blockTag), "enableCcipRead" in n && (t.enableCcipRead = !!n.enableCcipRead), "customData" in n && (t.customData = n.customData), "blobVersionedHashes" in n && n.blobVersionedHashes && (t.blobVersionedHashes = n.blobVersionedHashes.slice()), "kzg" in n && (t.kzg = n.kzg), "blobs" in n && n.blobs && (t.blobs = n.blobs.map((s) => eu(s) ? W(s) : Object.assign({}, s))), t;
}
var Xn;
class $b {
  /**
   *  Create a new **Block** object.
   *
   *  This should generally not be necessary as the unless implementing a
   *  low-level library.
   */
  constructor(t, e) {
    S(this, "provider"), S(this, "number"), S(this, "hash"), S(this, "timestamp"), S(this, "parentHash"), S(this, "parentBeaconBlockRoot"), S(this, "nonce"), S(this, "difficulty"), S(this, "gasLimit"), S(this, "gasUsed"), S(this, "stateRoot"), S(this, "receiptsRoot"), S(this, "blobGasUsed"), S(this, "excessBlobGas"), S(this, "miner"), S(this, "prevRandao"), S(this, "extraData"), S(this, "baseFeePerGas"), C(this, Xn), A(this, Xn, t.transactions.map((r) => typeof r != "string" ? new bu(r, e) : r)), q(this, {
      provider: e,
      hash: Zs(t.hash),
      number: t.number,
      timestamp: t.timestamp,
      parentHash: t.parentHash,
      parentBeaconBlockRoot: t.parentBeaconBlockRoot,
      nonce: t.nonce,
      difficulty: t.difficulty,
      gasLimit: t.gasLimit,
      gasUsed: t.gasUsed,
      blobGasUsed: t.blobGasUsed,
      excessBlobGas: t.excessBlobGas,
      miner: t.miner,
      prevRandao: Zs(t.prevRandao),
      extraData: t.extraData,
      baseFeePerGas: Zs(t.baseFeePerGas),
      stateRoot: t.stateRoot,
      receiptsRoot: t.receiptsRoot
    });
  }
  /**
   *  Returns the list of transaction hashes, in the order
   *  they were executed within the block.
   */
  get transactions() {
    return f(this, Xn).map((t) => typeof t == "string" ? t : t.hash);
  }
  /**
   *  Returns the complete transactions, in the order they
   *  were executed within the block.
   *
   *  This is only available for blocks which prefetched
   *  transactions, by passing ``true`` to %%prefetchTxs%%
   *  into [[Provider-getBlock]].
   */
  get prefetchedTransactions() {
    const t = f(this, Xn).slice();
    return t.length === 0 ? [] : (D(typeof t[0] == "object", "transactions were not prefetched with block request", "UNSUPPORTED_OPERATION", {
      operation: "transactionResponses()"
    }), t);
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { baseFeePerGas: t, difficulty: e, extraData: r, gasLimit: s, gasUsed: i, hash: o, miner: c, prevRandao: a, nonce: l, number: h, parentHash: u, parentBeaconBlockRoot: p, stateRoot: b, receiptsRoot: y, timestamp: d, transactions: g } = this;
    return {
      _type: "Block",
      baseFeePerGas: Nt(t),
      difficulty: Nt(e),
      extraData: r,
      gasLimit: Nt(s),
      gasUsed: Nt(i),
      blobGasUsed: Nt(this.blobGasUsed),
      excessBlobGas: Nt(this.excessBlobGas),
      hash: o,
      miner: c,
      prevRandao: a,
      nonce: l,
      number: h,
      parentHash: u,
      timestamp: d,
      parentBeaconBlockRoot: p,
      stateRoot: b,
      receiptsRoot: y,
      transactions: g
    };
  }
  [Symbol.iterator]() {
    let t = 0;
    const e = this.transactions;
    return {
      next: () => t < this.length ? {
        value: e[t++],
        done: !1
      } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The number of transactions in this block.
   */
  get length() {
    return f(this, Xn).length;
  }
  /**
   *  The [[link-js-date]] this block was included at.
   */
  get date() {
    return this.timestamp == null ? null : new Date(this.timestamp * 1e3);
  }
  /**
   *  Get the transaction at %%indexe%% within this block.
   */
  async getTransaction(t) {
    let e;
    if (typeof t == "number")
      e = f(this, Xn)[t];
    else {
      const r = t.toLowerCase();
      for (const s of f(this, Xn))
        if (typeof s == "string") {
          if (s !== r)
            continue;
          e = s;
          break;
        } else {
          if (s.hash === r)
            continue;
          e = s;
          break;
        }
    }
    if (e == null)
      throw new Error("no such tx");
    return typeof e == "string" ? await this.provider.getTransaction(e) : e;
  }
  /**
   *  If a **Block** was fetched with a request to include the transactions
   *  this will allow synchronous access to those transactions.
   *
   *  If the transactions were not prefetched, this will throw.
   */
  getPrefetchedTransaction(t) {
    const e = this.prefetchedTransactions;
    if (typeof t == "number")
      return e[t];
    t = t.toLowerCase();
    for (const r of e)
      if (r.hash === t)
        return r;
    B(!1, "no matching transaction", "indexOrHash", t);
  }
  /**
   *  Returns true if this block been mined. This provides a type guard
   *  for all properties on a [[MinedBlock]].
   */
  isMined() {
    return !!this.hash;
  }
  /**
   *  Returns true if this block is an [[link-eip-2930]] block.
   */
  isLondon() {
    return !!this.baseFeePerGas;
  }
  /**
   *  @_ignore:
   */
  orphanedEvent() {
    if (!this.isMined())
      throw new Error("");
    return Wb(this);
  }
}
Xn = /* @__PURE__ */ new WeakMap();
class Ho {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    S(this, "provider"), S(this, "transactionHash"), S(this, "blockHash"), S(this, "blockNumber"), S(this, "removed"), S(this, "address"), S(this, "data"), S(this, "topics"), S(this, "index"), S(this, "transactionIndex"), this.provider = e;
    const r = Object.freeze(t.topics.slice());
    q(this, {
      transactionHash: t.transactionHash,
      blockHash: t.blockHash,
      blockNumber: t.blockNumber,
      removed: t.removed,
      address: t.address,
      data: t.data,
      topics: r,
      index: t.index,
      transactionIndex: t.transactionIndex
    });
  }
  /**
   *  Returns a JSON-compatible object.
   */
  toJSON() {
    const { address: t, blockHash: e, blockNumber: r, data: s, index: i, removed: o, topics: c, transactionHash: a, transactionIndex: l } = this;
    return {
      _type: "log",
      address: t,
      blockHash: e,
      blockNumber: r,
      data: s,
      index: i,
      removed: o,
      topics: c,
      transactionHash: a,
      transactionIndex: l
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    return D(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const t = await this.provider.getTransaction(this.transactionHash);
    return D(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const t = await this.provider.getTransactionReceipt(this.transactionHash);
    return D(!!t, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return zb(this);
  }
}
var wa;
class Lp {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    S(this, "provider"), S(this, "to"), S(this, "from"), S(this, "contractAddress"), S(this, "hash"), S(this, "index"), S(this, "blockHash"), S(this, "blockNumber"), S(this, "logsBloom"), S(this, "gasUsed"), S(this, "blobGasUsed"), S(this, "cumulativeGasUsed"), S(this, "gasPrice"), S(this, "blobGasPrice"), S(this, "type"), S(this, "status"), S(this, "root"), C(this, wa), A(this, wa, Object.freeze(t.logs.map((s) => new Ho(s, e))));
    let r = Up;
    t.effectiveGasPrice != null ? r = t.effectiveGasPrice : t.gasPrice != null && (r = t.gasPrice), q(this, {
      provider: e,
      to: t.to,
      from: t.from,
      contractAddress: t.contractAddress,
      hash: t.hash,
      index: t.index,
      blockHash: t.blockHash,
      blockNumber: t.blockNumber,
      logsBloom: t.logsBloom,
      gasUsed: t.gasUsed,
      cumulativeGasUsed: t.cumulativeGasUsed,
      blobGasUsed: t.blobGasUsed,
      gasPrice: r,
      blobGasPrice: t.blobGasPrice,
      type: t.type,
      //byzantium: tx.byzantium,
      status: t.status,
      root: t.root
    });
  }
  /**
   *  The logs for this transaction.
   */
  get logs() {
    return f(this, wa);
  }
  /**
   *  Returns a JSON-compatible representation.
   */
  toJSON() {
    const {
      to: t,
      from: e,
      contractAddress: r,
      hash: s,
      index: i,
      blockHash: o,
      blockNumber: c,
      logsBloom: a,
      logs: l,
      //byzantium, 
      status: h,
      root: u
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: o,
      blockNumber: c,
      //byzantium, 
      contractAddress: r,
      cumulativeGasUsed: Nt(this.cumulativeGasUsed),
      from: e,
      gasPrice: Nt(this.gasPrice),
      blobGasUsed: Nt(this.blobGasUsed),
      blobGasPrice: Nt(this.blobGasPrice),
      gasUsed: Nt(this.gasUsed),
      hash: s,
      index: i,
      logs: l,
      logsBloom: a,
      root: u,
      status: h,
      to: t
    };
  }
  /**
   *  @_ignore:
   */
  get length() {
    return this.logs.length;
  }
  [Symbol.iterator]() {
    let t = 0;
    return {
      next: () => t < this.length ? { value: this.logs[t++], done: !1 } : { value: void 0, done: !0 }
    };
  }
  /**
   *  The total fee for this transaction, in wei.
   */
  get fee() {
    return this.gasUsed * this.gasPrice;
  }
  /**
   *  Resolves to the block this transaction occurred in.
   */
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    if (t == null)
      throw new Error("TODO");
    return t;
  }
  /**
   *  Resolves to the transaction this transaction occurred in.
   */
  async getTransaction() {
    const t = await this.provider.getTransaction(this.hash);
    if (t == null)
      throw new Error("TODO");
    return t;
  }
  /**
   *  Resolves to the return value of the execution of this transaction.
   *
   *  Support for this feature is limited, as it requires an archive node
   *  with the ``debug_`` or ``trace_`` API enabled.
   */
  async getResult() {
    return await this.provider.getTransactionResult(this.hash);
  }
  /**
   *  Resolves to the number of confirmations this transaction has.
   */
  async confirmations() {
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return Mp(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(t) {
    return D(!t || t.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), Fp(this, t);
  }
}
wa = /* @__PURE__ */ new WeakMap();
var Ar;
const jb = class Dp {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    S(this, "provider"), S(this, "blockNumber"), S(this, "blockHash"), S(this, "index"), S(this, "hash"), S(this, "type"), S(this, "to"), S(this, "from"), S(this, "nonce"), S(this, "gasLimit"), S(this, "gasPrice"), S(this, "maxPriorityFeePerGas"), S(this, "maxFeePerGas"), S(this, "maxFeePerBlobGas"), S(this, "data"), S(this, "value"), S(this, "chainId"), S(this, "signature"), S(this, "accessList"), S(this, "blobVersionedHashes"), C(this, Ar), this.provider = e, this.blockNumber = t.blockNumber != null ? t.blockNumber : null, this.blockHash = t.blockHash != null ? t.blockHash : null, this.hash = t.hash, this.index = t.index, this.type = t.type, this.from = t.from, this.to = t.to || null, this.gasLimit = t.gasLimit, this.nonce = t.nonce, this.data = t.data, this.value = t.value, this.gasPrice = t.gasPrice, this.maxPriorityFeePerGas = t.maxPriorityFeePerGas != null ? t.maxPriorityFeePerGas : null, this.maxFeePerGas = t.maxFeePerGas != null ? t.maxFeePerGas : null, this.maxFeePerBlobGas = t.maxFeePerBlobGas != null ? t.maxFeePerBlobGas : null, this.chainId = t.chainId, this.signature = t.signature, this.accessList = t.accessList != null ? t.accessList : null, this.blobVersionedHashes = t.blobVersionedHashes != null ? t.blobVersionedHashes : null, A(this, Ar, -1);
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber: t, blockHash: e, index: r, hash: s, type: i, to: o, from: c, nonce: a, data: l, signature: h, accessList: u, blobVersionedHashes: p } = this;
    return {
      _type: "TransactionResponse",
      accessList: u,
      blockNumber: t,
      blockHash: e,
      blobVersionedHashes: p,
      chainId: Nt(this.chainId),
      data: l,
      from: c,
      gasLimit: Nt(this.gasLimit),
      gasPrice: Nt(this.gasPrice),
      hash: s,
      maxFeePerGas: Nt(this.maxFeePerGas),
      maxPriorityFeePerGas: Nt(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: Nt(this.maxFeePerBlobGas),
      nonce: a,
      signature: h,
      to: o,
      index: r,
      type: i,
      value: Nt(this.value)
    };
  }
  /**
   *  Resolves to the Block that this transaction was included in.
   *
   *  This will return null if the transaction has not been included yet.
   */
  async getBlock() {
    let t = this.blockNumber;
    if (t == null) {
      const r = await this.getTransaction();
      r && (t = r.blockNumber);
    }
    if (t == null)
      return null;
    const e = this.provider.getBlock(t);
    if (e == null)
      throw new Error("TODO");
    return e;
  }
  /**
   *  Resolves to this transaction being re-requested from the
   *  provider. This can be used if you have an unmined transaction
   *  and wish to get an up-to-date populated instance.
   */
  async getTransaction() {
    return this.provider.getTransaction(this.hash);
  }
  /**
   *  Resolve to the number of confirmations this transaction has.
   */
  async confirmations() {
    if (this.blockNumber == null) {
      const { tx: t, blockNumber: e } = await Zt({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber()
      });
      return t == null || t.blockNumber == null ? 0 : e - t.blockNumber + 1;
    }
    return await this.provider.getBlockNumber() - this.blockNumber + 1;
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(t, e) {
    const r = t ?? 1, s = e ?? 0;
    let i = f(this, Ar), o = -1, c = i === -1;
    const a = async () => {
      if (c)
        return null;
      const { blockNumber: u, nonce: p } = await Zt({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (p < this.nonce) {
        i = u;
        return;
      }
      if (c)
        return null;
      const b = await this.getTransaction();
      if (!(b && b.blockNumber != null))
        for (o === -1 && (o = i - 3, o < f(this, Ar) && (o = f(this, Ar))); o <= u; ) {
          if (c)
            return null;
          const y = await this.provider.getBlock(o, !0);
          if (y == null)
            return;
          for (const d of y)
            if (d === this.hash)
              return;
          for (let d = 0; d < y.length; d++) {
            const g = await y.getTransaction(d);
            if (g.from === this.from && g.nonce === this.nonce) {
              if (c)
                return null;
              const w = await this.provider.getTransactionReceipt(g.hash);
              if (w == null || u - w.blockNumber + 1 < r)
                return;
              let I = "replaced";
              g.data === this.data && g.to === this.to && g.value === this.value ? I = "repriced" : g.data === "0x" && g.from === g.to && g.value === Up && (I = "cancelled"), D(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: I === "replaced" || I === "cancelled",
                reason: I,
                replacement: g.replaceableTransaction(i),
                hash: g.hash,
                receipt: w
              });
            }
          }
          o++;
        }
    }, l = (u) => {
      if (u == null || u.status !== 0)
        return u;
      D(!1, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: u.to,
          from: u.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: u
      });
    }, h = await this.provider.getTransactionReceipt(this.hash);
    if (r === 0)
      return l(h);
    if (h) {
      if (await h.confirmations() >= r)
        return l(h);
    } else if (await a(), r === 0)
      return null;
    return await new Promise((u, p) => {
      const b = [], y = () => {
        b.forEach((g) => g());
      };
      if (b.push(() => {
        c = !0;
      }), s > 0) {
        const g = setTimeout(() => {
          y(), p(vt("wait for transaction timeout", "TIMEOUT"));
        }, s);
        b.push(() => {
          clearTimeout(g);
        });
      }
      const d = async (g) => {
        if (await g.confirmations() >= r) {
          y();
          try {
            u(l(g));
          } catch (w) {
            p(w);
          }
        }
      };
      if (b.push(() => {
        this.provider.off(this.hash, d);
      }), this.provider.on(this.hash, d), i >= 0) {
        const g = async () => {
          try {
            await a();
          } catch (w) {
            if (zt(w, "TRANSACTION_REPLACED")) {
              y(), p(w);
              return;
            }
          }
          c || this.provider.once("block", g);
        };
        b.push(() => {
          this.provider.off("block", g);
        }), this.provider.once("block", g);
      }
    });
  }
  /**
   *  Returns ``true`` if this transaction has been included.
   *
   *  This is effective only as of the time the TransactionResponse
   *  was instantiated. To get up-to-date information, use
   *  [[getTransaction]].
   *
   *  This provides a Type Guard that this transaction will have
   *  non-null property values for properties that are null for
   *  unmined transactions.
   */
  isMined() {
    return this.blockHash != null;
  }
  /**
   *  Returns true if the transaction is a legacy (i.e. ``type == 0``)
   *  transaction.
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLegacy() {
    return this.type === 0;
  }
  /**
   *  Returns true if the transaction is a Berlin (i.e. ``type == 1``)
   *  transaction. See [[link-eip-2070]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isBerlin() {
    return this.type === 1;
  }
  /**
   *  Returns true if the transaction is a London (i.e. ``type == 2``)
   *  transaction. See [[link-eip-1559]].
   *
   *  This provides a Type Guard that this transaction will have
   *  the ``null``-ness for hardfork-specific properties set correctly.
   */
  isLondon() {
    return this.type === 2;
  }
  /**
   *  Returns true if hte transaction is a Cancun (i.e. ``type == 3``)
   *  transaction. See [[link-eip-4844]].
   */
  isCancun() {
    return this.type === 3;
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that evict this transaction.
   */
  removedEvent() {
    return D(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Mp(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(t) {
    return D(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), D(!t || t.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Fp(this, t);
  }
  /**
   *  Returns a new TransactionResponse instance which has the ability to
   *  detect (and throw an error) if the transaction is replaced, which
   *  will begin scanning at %%startBlock%%.
   *
   *  This should generally not be used by developers and is intended
   *  primarily for internal use. Setting an incorrect %%startBlock%% can
   *  have devastating performance consequences if used incorrectly.
   */
  replaceableTransaction(t) {
    B(Number.isInteger(t) && t >= 0, "invalid startBlock", "startBlock", t);
    const e = new Dp(this, this.provider);
    return A(e, Ar, t), e;
  }
};
Ar = /* @__PURE__ */ new WeakMap();
let bu = jb;
function Wb(n) {
  return { orphan: "drop-block", hash: n.hash, number: n.number };
}
function Fp(n, t) {
  return { orphan: "reorder-transaction", tx: n, other: t };
}
function Mp(n) {
  return { orphan: "drop-transaction", tx: n };
}
function zb(n) {
  return { orphan: "drop-log", log: {
    transactionHash: n.transactionHash,
    blockHash: n.blockHash,
    blockNumber: n.blockNumber,
    address: n.address,
    data: n.data,
    topics: Object.freeze(n.topics.slice()),
    index: n.index
  } };
}
let Au = class extends Ho {
  /**
   * @_ignore:
   */
  constructor(t, e, r) {
    super(t, t.provider), S(this, "interface"), S(this, "fragment"), S(this, "args");
    const s = e.decodeEventLog(r, t.data, t.topics);
    q(this, { args: s, fragment: r, interface: e });
  }
  /**
   *  The name of the event.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The signature of the event.
   */
  get eventSignature() {
    return this.fragment.format();
  }
};
class Hp extends Ho {
  /**
   * @_ignore:
   */
  constructor(t, e) {
    super(t, t.provider), S(this, "error"), q(this, { error: e });
  }
}
var to;
class Qb extends Lp {
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    super(r, e), C(this, to), A(this, to, t);
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((t) => {
      const e = t.topics.length ? f(this, to).getEvent(t.topics[0]) : null;
      if (e)
        try {
          return new Au(t, f(this, to), e);
        } catch (r) {
          return new Hp(t, r);
        }
      return t;
    });
  }
}
to = /* @__PURE__ */ new WeakMap();
var ba;
let Eu = class extends bu {
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    super(r, e), C(this, ba), A(this, ba, t);
  }
  /**
   *  Resolves once this transaction has been mined and has
   *  %%confirms%% blocks including it (default: ``1``) with an
   *  optional %%timeout%%.
   *
   *  This can resolve to ``null`` only if %%confirms%% is ``0``
   *  and the transaction has not been mined, otherwise this will
   *  wait until enough confirmations have completed.
   */
  async wait(t, e) {
    const r = await super.wait(t, e);
    return r == null ? null : new Qb(f(this, ba), this.provider, r);
  }
};
ba = /* @__PURE__ */ new WeakMap();
class _p extends nd {
  /**
   *  @_event:
   */
  constructor(t, e, r, s) {
    super(t, e, r), S(this, "log"), q(this, { log: s });
  }
  /**
   *  Resolves to the block the event occured in.
   */
  async getBlock() {
    return await this.log.getBlock();
  }
  /**
   *  Resolves to the transaction the event occured in.
   */
  async getTransaction() {
    return await this.log.getTransaction();
  }
  /**
   *  Resolves to the transaction receipt the event occured in.
   */
  async getTransactionReceipt() {
    return await this.log.getTransactionReceipt();
  }
}
class qb extends _p {
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s, i) {
    super(t, e, r, new Au(i, t.interface, s));
    const o = t.interface.decodeEventLog(s, this.log.data, this.log.topics);
    q(this, { args: o, fragment: s });
  }
  /**
   *  The event name.
   */
  get eventName() {
    return this.fragment.name;
  }
  /**
   *  The event signature.
   */
  get eventSignature() {
    return this.fragment.format();
  }
}
const Xh = BigInt(0);
function Gp(n) {
  return n && typeof n.call == "function";
}
function Vp(n) {
  return n && typeof n.estimateGas == "function";
}
function sc(n) {
  return n && typeof n.resolveName == "function";
}
function $p(n) {
  return n && typeof n.sendTransaction == "function";
}
function jp(n) {
  if (n != null) {
    if (sc(n))
      return n;
    if (n.provider)
      return n.provider;
  }
}
var Aa;
class Kb {
  constructor(t, e, r) {
    if (C(this, Aa), S(this, "fragment"), q(this, { fragment: e }), e.inputs.length < r.length)
      throw new Error("too many arguments");
    const s = as(t.runner, "resolveName"), i = sc(s) ? s : null;
    A(this, Aa, async function() {
      const o = await Promise.all(e.inputs.map((c, a) => r[a] == null ? null : c.walkAsync(r[a], (l, h) => l === "address" ? Array.isArray(h) ? Promise.all(h.map((u) => te(u, i))) : te(h, i) : h)));
      return t.interface.encodeFilterTopics(e, o);
    }());
  }
  getTopicFilter() {
    return f(this, Aa);
  }
}
Aa = /* @__PURE__ */ new WeakMap();
function as(n, t) {
  return n == null ? null : typeof n[t] == "function" ? n : n.provider && typeof n.provider[t] == "function" ? n.provider : null;
}
function jr(n) {
  return n == null ? null : n.provider || null;
}
async function Wp(n, t) {
  const e = ae.dereference(n, "overrides");
  B(typeof e == "object", "invalid overrides parameter", "overrides", n);
  const r = rc(e);
  return B(r.to == null || (t || []).indexOf("to") >= 0, "cannot override to", "overrides.to", r.to), B(r.data == null || (t || []).indexOf("data") >= 0, "cannot override data", "overrides.data", r.data), r.from && (r.from = r.from), r;
}
async function Jb(n, t, e) {
  const r = as(n, "resolveName"), s = sc(r) ? r : null;
  return await Promise.all(t.map((i, o) => i.walkAsync(e[o], (c, a) => (a = ae.dereference(a, c), c === "address" ? te(a, s) : a))));
}
function Zb(n) {
  const t = async function(o) {
    const c = await Wp(o, ["data"]);
    c.to = await n.getAddress(), c.from && (c.from = await te(c.from, jp(n.runner)));
    const a = n.interface, l = z(c.value || Xh, "overrides.value") === Xh, h = (c.data || "0x") === "0x";
    a.fallback && !a.fallback.payable && a.receive && !h && !l && B(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", o), B(a.fallback || h, "cannot send data to receive-only contract", "overrides.data", c.data);
    const u = a.receive || a.fallback && a.fallback.payable;
    return B(u || l, "cannot send value to non-payable fallback", "overrides.value", c.value), B(a.fallback || h, "cannot send data to receive-only contract", "overrides.data", c.data), c;
  }, e = async function(o) {
    const c = as(n.runner, "call");
    D(Gp(c), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const a = await t(o);
    try {
      return await c.call(a);
    } catch (l) {
      throw tu(l) && l.data ? n.interface.makeError(l.data, a) : l;
    }
  }, r = async function(o) {
    const c = n.runner;
    D($p(c), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const a = await c.sendTransaction(await t(o)), l = jr(n.runner);
    return new Eu(n.interface, l, a);
  }, s = async function(o) {
    const c = as(n.runner, "estimateGas");
    return D(Vp(c), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await c.estimateGas(await t(o));
  }, i = async (o) => await r(o);
  return q(i, {
    _contract: n,
    estimateGas: s,
    populateTransaction: t,
    send: r,
    staticCall: e
  }), i;
}
function Yb(n, t) {
  const e = function(...l) {
    const h = n.interface.getFunction(t, l);
    return D(h, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: l }
    }), h;
  }, r = async function(...l) {
    const h = e(...l);
    let u = {};
    if (h.inputs.length + 1 === l.length && (u = await Wp(l.pop()), u.from && (u.from = await te(u.from, jp(n.runner)))), h.inputs.length !== l.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const p = await Jb(n.runner, h.inputs, l);
    return Object.assign({}, u, await Zt({
      to: n.getAddress(),
      data: n.interface.encodeFunctionData(h, p)
    }));
  }, s = async function(...l) {
    const h = await c(...l);
    return h.length === 1 ? h[0] : h;
  }, i = async function(...l) {
    const h = n.runner;
    D($p(h), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const u = await h.sendTransaction(await r(...l)), p = jr(n.runner);
    return new Eu(n.interface, p, u);
  }, o = async function(...l) {
    const h = as(n.runner, "estimateGas");
    return D(Vp(h), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await h.estimateGas(await r(...l));
  }, c = async function(...l) {
    const h = as(n.runner, "call");
    D(Gp(h), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const u = await r(...l);
    let p = "0x";
    try {
      p = await h.call(u);
    } catch (y) {
      throw tu(y) && y.data ? n.interface.makeError(y.data, u) : y;
    }
    const b = e(...l);
    return n.interface.decodeFunctionResult(b, p);
  }, a = async (...l) => e(...l).constant ? await s(...l) : await i(...l);
  return q(a, {
    name: n.interface.getFunctionName(t),
    _contract: n,
    _key: t,
    getFragment: e,
    estimateGas: o,
    populateTransaction: r,
    send: i,
    staticCall: s,
    staticCallResult: c
  }), Object.defineProperty(a, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const l = n.interface.getFunction(t);
      return D(l, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), l;
    }
  }), a;
}
function Xb(n, t) {
  const e = function(...s) {
    const i = n.interface.getEvent(t, s);
    return D(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: s }
    }), i;
  }, r = function(...s) {
    return new Kb(n, e(...s), s);
  };
  return q(r, {
    name: n.interface.getEventName(t),
    _contract: n,
    _key: t,
    getFragment: e
  }), Object.defineProperty(r, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const s = n.interface.getEvent(t);
      return D(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), s;
    }
  }), r;
}
const ic = Symbol.for("_ethersInternal_contract"), zp = /* @__PURE__ */ new WeakMap();
function tA(n, t) {
  zp.set(n[ic], t);
}
function ue(n) {
  return zp.get(n[ic]);
}
function eA(n) {
  return n && typeof n == "object" && "getTopicFilter" in n && typeof n.getTopicFilter == "function" && n.fragment;
}
async function vu(n, t) {
  let e, r = null;
  if (Array.isArray(t)) {
    const i = function(o) {
      if (gt(o, 32))
        return o;
      const c = n.interface.getEvent(o);
      return B(c, "unknown fragment", "name", o), c.topicHash;
    };
    e = t.map((o) => o == null ? null : Array.isArray(o) ? o.map(i) : i(o));
  } else t === "*" ? e = [null] : typeof t == "string" ? gt(t, 32) ? e = [t] : (r = n.interface.getEvent(t), B(r, "unknown fragment", "event", t), e = [r.topicHash]) : eA(t) ? e = await t.getTopicFilter() : "fragment" in t ? (r = t.fragment, e = [r.topicHash]) : B(!1, "unknown event name", "event", t);
  e = e.map((i) => {
    if (i == null)
      return null;
    if (Array.isArray(i)) {
      const o = Array.from(new Set(i.map((c) => c.toLowerCase())).values());
      return o.length === 1 ? o[0] : (o.sort(), o);
    }
    return i.toLowerCase();
  });
  const s = e.map((i) => i == null ? "null" : Array.isArray(i) ? i.join("|") : i).join("&");
  return { fragment: r, tag: s, topics: e };
}
async function eo(n, t) {
  const { subs: e } = ue(n);
  return e.get((await vu(n, t)).tag) || null;
}
async function tf(n, t, e) {
  const r = jr(n.runner);
  D(r, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: t });
  const { fragment: s, tag: i, topics: o } = await vu(n, e), { addr: c, subs: a } = ue(n);
  let l = a.get(i);
  if (!l) {
    const h = { address: c || n, topics: o }, u = (b) => {
      let y = s;
      if (y == null)
        try {
          y = n.interface.getEvent(b.topics[0]);
        } catch {
        }
      if (y) {
        const d = y, g = s ? n.interface.decodeEventLog(s, b.data, b.topics) : [];
        Nl(n, e, g, (w) => new qb(n, w, e, d, b));
      } else
        Nl(n, e, [], (d) => new _p(n, d, e, b));
    };
    let p = [];
    l = { tag: i, listeners: [], start: () => {
      p.length || p.push(r.on(h, u));
    }, stop: async () => {
      if (p.length == 0)
        return;
      let b = p;
      p = [], await Promise.all(b), r.off(h, u);
    } }, a.set(i, l);
  }
  return l;
}
let Il = Promise.resolve();
async function nA(n, t, e, r) {
  await Il;
  const s = await eo(n, t);
  if (!s)
    return !1;
  const i = s.listeners.length;
  return s.listeners = s.listeners.filter(({ listener: o, once: c }) => {
    const a = Array.from(e);
    r && a.push(r(c ? null : o));
    try {
      o.call(n, ...a);
    } catch {
    }
    return !c;
  }), s.listeners.length === 0 && (s.stop(), ue(n).subs.delete(s.tag)), i > 0;
}
async function Nl(n, t, e, r) {
  try {
    await Il;
  } catch {
  }
  const s = nA(n, t, e, r);
  return Il = s, await s;
}
const ta = ["then"];
var Qp;
Qp = ic;
const rA = class Ea {
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(t, e, r, s) {
    S(this, "target"), S(this, "interface"), S(this, "runner"), S(this, "filters"), S(this, Qp), S(this, "fallback"), B(typeof t == "string" || zd(t), "invalid value for Contract target", "target", t), r == null && (r = null);
    const i = Ss.from(e);
    q(this, { target: t, runner: r, interface: i }), Object.defineProperty(this, ic, { value: {} });
    let o, c = null, a = null;
    if (s) {
      const u = jr(r);
      a = new Eu(this.interface, u, s);
    }
    let l = /* @__PURE__ */ new Map();
    if (typeof t == "string")
      if (gt(t))
        c = t, o = Promise.resolve(t);
      else {
        const u = as(r, "resolveName");
        if (!sc(u))
          throw vt("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        o = u.resolveName(t).then((p) => {
          if (p == null)
            throw vt("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: t
            });
          return ue(this).addr = p, p;
        });
      }
    else
      o = t.getAddress().then((u) => {
        if (u == null)
          throw new Error("TODO");
        return ue(this).addr = u, u;
      });
    tA(this, { addrPromise: o, addr: c, deployTx: a, subs: l });
    const h = new Proxy({}, {
      get: (u, p, b) => {
        if (typeof p == "symbol" || ta.indexOf(p) >= 0)
          return Reflect.get(u, p, b);
        try {
          return this.getEvent(p);
        } catch (y) {
          if (!zt(y, "INVALID_ARGUMENT") || y.argument !== "key")
            throw y;
        }
      },
      has: (u, p) => ta.indexOf(p) >= 0 ? Reflect.has(u, p) : Reflect.has(u, p) || this.interface.hasEvent(String(p))
    });
    return q(this, { filters: h }), q(this, {
      fallback: i.receive || i.fallback ? Zb(this) : null
    }), new Proxy(this, {
      get: (u, p, b) => {
        if (typeof p == "symbol" || p in u || ta.indexOf(p) >= 0)
          return Reflect.get(u, p, b);
        try {
          return u.getFunction(p);
        } catch (y) {
          if (!zt(y, "INVALID_ARGUMENT") || y.argument !== "key")
            throw y;
        }
      },
      has: (u, p) => typeof p == "symbol" || p in u || ta.indexOf(p) >= 0 ? Reflect.has(u, p) : u.interface.hasFunction(p)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(t) {
    return new Ea(this.target, this.interface, t);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(t) {
    return new Ea(t, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await ue(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const t = jr(this.runner);
    D(t, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
    const e = await t.getCode(await this.getAddress());
    return e === "0x" ? null : e;
  }
  /**
   *  Resolve to this Contract once the bytecode has been deployed, or
   *  resolve immediately if already deployed.
   */
  async waitForDeployment() {
    const t = this.deploymentTransaction();
    if (t)
      return await t.wait(), this;
    if (await this.getDeployedCode() != null)
      return this;
    const e = jr(this.runner);
    return D(e != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" }), new Promise((r, s) => {
      const i = async () => {
        try {
          if (await this.getDeployedCode() != null)
            return r(this);
          e.once("block", i);
        } catch (o) {
          s(o);
        }
      };
      i();
    });
  }
  /**
   *  Return the transaction used to deploy this contract.
   *
   *  This is only available if this instance was returned from a
   *  [[ContractFactory]].
   */
  deploymentTransaction() {
    return ue(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(t) {
    return typeof t != "string" && (t = t.format()), Yb(this, t);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(t) {
    return typeof t != "string" && (t = t.format()), Xb(this, t);
  }
  /**
   *  @_ignore:
   */
  async queryTransaction(t) {
    throw new Error("@TODO");
  }
  /*
      // @TODO: this is a non-backwards compatible change, but will be added
      //        in v7 and in a potential SmartContract class in an upcoming
      //        v6 release
      async getTransactionReceipt(hash: string): Promise<null | ContractTransactionReceipt> {
          const provider = getProvider(this.runner);
          assert(provider, "contract runner does not have a provider",
              "UNSUPPORTED_OPERATION", { operation: "queryTransaction" });
  
          const receipt = await provider.getTransactionReceipt(hash);
          if (receipt == null) { return null; }
  
          return new ContractTransactionReceipt(this.interface, provider, receipt);
      }
      */
  /**
   *  Provide historic access to event data for %%event%% in the range
   *  %%fromBlock%% (default: ``0``) to %%toBlock%% (default: ``"latest"``)
   *  inclusive.
   */
  async queryFilter(t, e, r) {
    e == null && (e = 0), r == null && (r = "latest");
    const { addr: s, addrPromise: i } = ue(this), o = s || await i, { fragment: c, topics: a } = await vu(this, t), l = { address: o, topics: a, fromBlock: e, toBlock: r }, h = jr(this.runner);
    return D(h, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await h.getLogs(l)).map((u) => {
      let p = c;
      if (p == null)
        try {
          p = this.interface.getEvent(u.topics[0]);
        } catch {
        }
      if (p)
        try {
          return new Au(u, this.interface, p);
        } catch (b) {
          return new Hp(u, b);
        }
      return new Ho(u, h);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(t, e) {
    const r = await tf(this, "on", t);
    return r.listeners.push({ listener: e, once: !1 }), r.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(t, e) {
    const r = await tf(this, "once", t);
    return r.listeners.push({ listener: e, once: !0 }), r.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(t, ...e) {
    return await Nl(this, t, e, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(t) {
    if (t) {
      const s = await eo(this, t);
      return s ? s.listeners.length : 0;
    }
    const { subs: e } = ue(this);
    let r = 0;
    for (const { listeners: s } of e.values())
      r += s.length;
    return r;
  }
  /**
   *  Resolves to the listeners subscribed to %%event%% or all listeners
   *  if unspecified.
   */
  async listeners(t) {
    if (t) {
      const s = await eo(this, t);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: e } = ue(this);
    let r = [];
    for (const { listeners: s } of e.values())
      r = r.concat(s.map(({ listener: i }) => i));
    return r;
  }
  /**
   *  Remove the %%listener%% from the listeners for %%event%% or remove
   *  all listeners if unspecified.
   */
  async off(t, e) {
    const r = await eo(this, t);
    if (!r)
      return this;
    if (e) {
      const s = r.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && r.listeners.splice(s, 1);
    }
    return (e == null || r.listeners.length === 0) && (r.stop(), ue(this).subs.delete(r.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(t) {
    if (t) {
      const e = await eo(this, t);
      if (!e)
        return this;
      e.stop(), ue(this).subs.delete(e.tag);
    } else {
      const { subs: e } = ue(this);
      for (const { tag: r, stop: s } of e.values())
        s(), e.delete(r);
    }
    return this;
  }
  /**
   *  Alias for [on].
   */
  async addListener(t, e) {
    return await this.on(t, e);
  }
  /**
   *  Alias for [off].
   */
  async removeListener(t, e) {
    return await this.off(t, e);
  }
  /**
   *  Create a new Class for the %%abi%%.
   */
  static buildClass(t) {
    class e extends Ea {
      constructor(s, i = null) {
        super(s, t, i);
      }
    }
    return e;
  }
  /**
   *  Create a new BaseContract with a specified Interface.
   */
  static from(t, e, r) {
    return r == null && (r = null), new this(t, e, r);
  }
};
let sA = rA;
function iA() {
  return sA;
}
class cs extends iA() {
}
function Sc(n) {
  return n.match(/^ipfs:\/\/ipfs\//i) ? n = n.substring(12) : n.match(/^ipfs:\/\//i) ? n = n.substring(7) : B(!1, "unsupported IPFS format", "link", n), `https://gateway.ipfs.io/ipfs/${n}`;
}
class oA {
  /**
   *  Creates a new **MulticoinProviderPluing** for %%name%%.
   */
  constructor(t) {
    S(this, "name"), q(this, { name: t });
  }
  connect(t) {
    return this;
  }
  /**
   *  Returns ``true`` if %%coinType%% is supported by this plugin.
   */
  supportsCoinType(t) {
    return !1;
  }
  /**
   *  Resolves to the encoded %%address%% for %%coinType%%.
   */
  async encodeAddress(t, e) {
    throw new Error("unsupported coin");
  }
  /**
   *  Resolves to the decoded %%data%% for %%coinType%%.
   */
  async decodeAddress(t, e) {
    throw new Error("unsupported coin");
  }
}
const qp = new RegExp("^(ipfs)://(.*)$", "i"), ef = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  qp,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
var Er, Ys, vr, Ts, Bl, Kp;
const Ol = class kl {
  constructor(t, e, r) {
    C(this, vr), S(this, "provider"), S(this, "address"), S(this, "name"), C(this, Er), C(this, Ys), q(this, { provider: t, address: e, name: r }), A(this, Er, null), A(this, Ys, new cs(e, [
      "function supportsInterface(bytes4) view returns (bool)",
      "function resolve(bytes, bytes) view returns (bytes)",
      "function addr(bytes32) view returns (address)",
      "function addr(bytes32, uint) view returns (bytes)",
      "function text(bytes32, string) view returns (string)",
      "function contenthash(bytes32) view returns (bytes)"
    ], t));
  }
  /**
   *  Resolves to true if the resolver supports wildcard resolution.
   */
  async supportsWildcard() {
    return f(this, Er) == null && A(this, Er, (async () => {
      try {
        return await f(this, Ys).supportsInterface("0x9061b923");
      } catch (t) {
        if (zt(t, "CALL_EXCEPTION"))
          return !1;
        throw A(this, Er, null), t;
      }
    })()), await f(this, Er);
  }
  /**
   *  Resolves to the address for %%coinType%% or null if the
   *  provided %%coinType%% has not been configured.
   */
  async getAddress(t) {
    if (t == null && (t = 60), t === 60)
      try {
        const i = await F(this, vr, Ts).call(this, "addr(bytes32)");
        return i == null || i === bi ? null : i;
      } catch (i) {
        if (zt(i, "CALL_EXCEPTION"))
          return null;
        throw i;
      }
    if (t >= 0 && t < 2147483648) {
      let i = t + 2147483648;
      const o = await F(this, vr, Ts).call(this, "addr(bytes32,uint)", [i]);
      if (gt(o, 20))
        return ft(o);
    }
    let e = null;
    for (const i of this.provider.plugins)
      if (i instanceof oA && i.supportsCoinType(t)) {
        e = i;
        break;
      }
    if (e == null)
      return null;
    const r = await F(this, vr, Ts).call(this, "addr(bytes32,uint)", [t]);
    if (r == null || r === "0x")
      return null;
    const s = await e.decodeAddress(t, r);
    if (s != null)
      return s;
    D(!1, "invalid coin data", "UNSUPPORTED_OPERATION", {
      operation: `getAddress(${t})`,
      info: { coinType: t, data: r }
    });
  }
  /**
   *  Resolves to the EIP-634 text record for %%key%%, or ``null``
   *  if unconfigured.
   */
  async getText(t) {
    const e = await F(this, vr, Ts).call(this, "text(bytes32,string)", [t]);
    return e == null || e === "0x" ? null : e;
  }
  /**
   *  Rsolves to the content-hash or ``null`` if unconfigured.
   */
  async getContentHash() {
    const t = await F(this, vr, Ts).call(this, "contenthash(bytes32)");
    if (t == null || t === "0x")
      return null;
    const e = t.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
    if (e) {
      const s = e[1] === "e3010170" ? "ipfs" : "ipns", i = parseInt(e[4], 16);
      if (e[5].length === i * 2)
        return `${s}://${Q0("0x" + e[2])}`;
    }
    const r = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
    if (r && r[1].length === 64)
      return `bzz://${r[1]}`;
    D(!1, "invalid or unsupported content hash data", "UNSUPPORTED_OPERATION", {
      operation: "getContentHash()",
      info: { data: t }
    });
  }
  /**
   *  Resolves to the avatar url or ``null`` if the avatar is either
   *  unconfigured or incorrectly configured (e.g. references an NFT
   *  not owned by the address).
   *
   *  If diagnosing issues with configurations, the [[_getAvatar]]
   *  method may be useful.
   */
  async getAvatar() {
    return (await this._getAvatar()).url;
  }
  /**
   *  When resolving an avatar, there are many steps involved, such
   *  fetching metadata and possibly validating ownership of an
   *  NFT.
   *
   *  This method can be used to examine each step and the value it
   *  was working from.
   */
  async _getAvatar() {
    const t = [{ type: "name", value: this.name }];
    try {
      const e = await this.getText("avatar");
      if (e == null)
        return t.push({ type: "!avatar", value: "" }), { url: null, linkage: t };
      t.push({ type: "avatar", value: e });
      for (let r = 0; r < ef.length; r++) {
        const s = e.match(ef[r]);
        if (s == null)
          continue;
        const i = s[1].toLowerCase();
        switch (i) {
          case "https":
          case "data":
            return t.push({ type: "url", value: e }), { linkage: t, url: e };
          case "ipfs": {
            const o = Sc(e);
            return t.push({ type: "ipfs", value: e }), t.push({ type: "url", value: o }), { linkage: t, url: o };
          }
          case "erc721":
          case "erc1155": {
            const o = i === "erc721" ? "tokenURI(uint256)" : "uri(uint256)";
            t.push({ type: i, value: e });
            const c = await this.getAddress();
            if (c == null)
              return t.push({ type: "!owner", value: "" }), { url: null, linkage: t };
            const a = (s[2] || "").split("/");
            if (a.length !== 2)
              return t.push({ type: `!${i}caip`, value: s[2] || "" }), { url: null, linkage: t };
            const l = a[1], h = new cs(a[0], [
              // ERC-721
              "function tokenURI(uint) view returns (string)",
              "function ownerOf(uint) view returns (address)",
              // ERC-1155
              "function uri(uint) view returns (string)",
              "function balanceOf(address, uint256) view returns (uint)"
            ], this.provider);
            if (i === "erc721") {
              const d = await h.ownerOf(l);
              if (c !== d)
                return t.push({ type: "!owner", value: d }), { url: null, linkage: t };
              t.push({ type: "owner", value: d });
            } else if (i === "erc1155") {
              const d = await h.balanceOf(c, l);
              if (!d)
                return t.push({ type: "!balance", value: "0" }), { url: null, linkage: t };
              t.push({ type: "balance", value: d.toString() });
            }
            let u = await h[o](l);
            if (u == null || u === "0x")
              return t.push({ type: "!metadata-url", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata-url-base", value: u }), i === "erc1155" && (u = u.replace("{id}", lr(l, 32).substring(2)), t.push({ type: "metadata-url-expanded", value: u })), u.match(/^ipfs:/i) && (u = Sc(u)), t.push({ type: "metadata-url", value: u });
            let p = {};
            const b = await new ns(u).send();
            b.assertOk();
            try {
              p = b.bodyJson;
            } catch {
              try {
                t.push({ type: "!metadata", value: b.bodyText });
              } catch {
                const d = b.body;
                return d && t.push({ type: "!metadata", value: W(d) }), { url: null, linkage: t };
              }
              return { url: null, linkage: t };
            }
            if (!p)
              return t.push({ type: "!metadata", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata", value: JSON.stringify(p) });
            let y = p.image;
            if (typeof y != "string")
              return t.push({ type: "!imageUrl", value: "" }), { url: null, linkage: t };
            if (!y.match(/^(https:\/\/|data:)/i)) {
              if (y.match(qp) == null)
                return t.push({ type: "!imageUrl-ipfs", value: y }), { url: null, linkage: t };
              t.push({ type: "imageUrl-ipfs", value: y }), y = Sc(y);
            }
            return t.push({ type: "url", value: y }), { linkage: t, url: y };
          }
        }
      }
    } catch {
    }
    return { linkage: t, url: null };
  }
  static async getEnsAddress(t) {
    const e = await t.getNetwork(), r = e.getPlugin("org.ethers.plugins.network.Ens");
    return D(r, "network does not support ENS", "UNSUPPORTED_OPERATION", {
      operation: "getEnsAddress",
      info: { network: e }
    }), r.address;
  }
  /**
   *  Resolve to the ENS resolver for %%name%% using %%provider%% or
   *  ``null`` if unconfigured.
   */
  static async fromName(t, e) {
    var r;
    let s = e;
    for (; ; ) {
      if (s === "" || s === "." || e !== "eth" && s === "eth")
        return null;
      const i = await F(r = kl, Bl, Kp).call(r, t, s);
      if (i != null) {
        const o = new kl(t, i, e);
        return s !== e && !await o.supportsWildcard() ? null : o;
      }
      s = s.split(".").slice(1).join(".");
    }
  }
};
Er = /* @__PURE__ */ new WeakMap(), Ys = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakSet(), Ts = async function(n, t) {
  t = (t || []).slice();
  const e = f(this, Ys).interface;
  t.unshift(wl(this.name));
  let r = null;
  await this.supportsWildcard() && (r = e.getFunction(n), D(r, "missing fragment", "UNKNOWN_ERROR", {
    info: { funcName: n }
  }), t = [
    Qw(this.name, 255),
    e.encodeFunctionData(r, t)
  ], n = "resolve(bytes,bytes)"), t.push({
    enableCcipRead: !0
  });
  try {
    const s = await f(this, Ys)[n](...t);
    return r ? e.decodeFunctionResult(r, s)[0] : s;
  } catch (s) {
    if (!zt(s, "CALL_EXCEPTION"))
      throw s;
  }
  return null;
}, Bl = /* @__PURE__ */ new WeakSet(), Kp = async function(n, t) {
  const e = await Ol.getEnsAddress(n);
  try {
    const r = await new cs(e, [
      "function resolver(bytes32) view returns (address)"
    ], n).resolver(wl(t), {
      enableCcipRead: !0
    });
    return r === bi ? null : r;
  } catch (r) {
    throw r;
  }
  return null;
}, C(Ol, Bl);
let nf = Ol;
const rf = BigInt(0);
function ot(n, t) {
  return function(e) {
    return e == null ? t : n(e);
  };
}
function oc(n, t) {
  return (e) => {
    if (t && e == null)
      return null;
    if (!Array.isArray(e))
      throw new Error("not an array");
    return e.map((r) => n(r));
  };
}
function _o(n, t) {
  return (e) => {
    const r = {};
    for (const s in n) {
      let i = s;
      if (t && s in t && !(i in e)) {
        for (const o of t[s])
          if (o in e) {
            i = o;
            break;
          }
      }
      try {
        const o = n[s](e[i]);
        o !== void 0 && (r[s] = o);
      } catch (o) {
        const c = o instanceof Error ? o.message : "not-an-error";
        D(!1, `invalid value for value.${s} (${c})`, "BAD_DATA", { value: e });
      }
    }
    return r;
  };
}
function aA(n) {
  switch (n) {
    case !0:
    case "true":
      return !0;
    case !1:
    case "false":
      return !1;
  }
  B(!1, `invalid boolean; ${JSON.stringify(n)}`, "value", n);
}
function ci(n) {
  return B(gt(n, !0), "invalid data", "value", n), n;
}
function Gt(n) {
  return B(gt(n, 32), "invalid hash", "value", n), n;
}
const cA = _o({
  address: ft,
  blockHash: Gt,
  blockNumber: nt,
  data: ci,
  index: nt,
  removed: ot(aA, !1),
  topics: oc(Gt),
  transactionHash: Gt,
  transactionIndex: nt
}, {
  index: ["logIndex"]
});
function lA(n) {
  return cA(n);
}
const uA = _o({
  hash: ot(Gt),
  parentHash: Gt,
  parentBeaconBlockRoot: ot(Gt, null),
  number: nt,
  timestamp: nt,
  nonce: ot(ci),
  difficulty: z,
  gasLimit: z,
  gasUsed: z,
  stateRoot: ot(Gt, null),
  receiptsRoot: ot(Gt, null),
  blobGasUsed: ot(z, null),
  excessBlobGas: ot(z, null),
  miner: ot(ft),
  prevRandao: ot(Gt, null),
  extraData: ci,
  baseFeePerGas: ot(z)
}, {
  prevRandao: ["mixHash"]
});
function hA(n) {
  const t = uA(n);
  return t.transactions = n.transactions.map((e) => typeof e == "string" ? e : Jp(e)), t;
}
const fA = _o({
  transactionIndex: nt,
  blockNumber: nt,
  transactionHash: Gt,
  address: ft,
  topics: oc(Gt),
  data: ci,
  index: nt,
  blockHash: Gt
}, {
  index: ["logIndex"]
});
function dA(n) {
  return fA(n);
}
const pA = _o({
  to: ot(ft, null),
  from: ot(ft, null),
  contractAddress: ot(ft, null),
  // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
  index: nt,
  root: ot(W),
  gasUsed: z,
  blobGasUsed: ot(z, null),
  logsBloom: ot(ci),
  blockHash: Gt,
  hash: Gt,
  logs: oc(dA),
  blockNumber: nt,
  //confirmations: allowNull(getNumber, null),
  cumulativeGasUsed: z,
  effectiveGasPrice: ot(z),
  blobGasPrice: ot(z, null),
  status: ot(nt),
  type: ot(nt, 0)
}, {
  effectiveGasPrice: ["gasPrice"],
  hash: ["transactionHash"],
  index: ["transactionIndex"]
});
function gA(n) {
  return pA(n);
}
function Jp(n) {
  n.to && z(n.to) === rf && (n.to = "0x0000000000000000000000000000000000000000");
  const t = _o({
    hash: Gt,
    // Some nodes do not return this, usually test nodes (like Ganache)
    index: ot(nt, void 0),
    type: (e) => e === "0x" || e == null ? 0 : nt(e),
    accessList: ot(fs, null),
    blobVersionedHashes: ot(oc(Gt, !0), null),
    blockHash: ot(Gt, null),
    blockNumber: ot(nt, null),
    transactionIndex: ot(nt, null),
    from: ft,
    // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas) must be set
    gasPrice: ot(z),
    maxPriorityFeePerGas: ot(z),
    maxFeePerGas: ot(z),
    maxFeePerBlobGas: ot(z, null),
    gasLimit: z,
    to: ot(ft, null),
    value: z,
    nonce: nt,
    data: ci,
    creates: ot(ft, null),
    chainId: ot(z, null)
  }, {
    data: ["input"],
    gasLimit: ["gas"],
    index: ["transactionIndex"]
  })(n);
  if (t.to == null && t.creates == null && (t.creates = Km(t)), (n.type === 1 || n.type === 2) && n.accessList == null && (t.accessList = []), n.signature ? t.signature = an.from(n.signature) : t.signature = an.from(n), t.chainId == null) {
    const e = t.signature.legacyChainId;
    e != null && (t.chainId = e);
  }
  return t.blockHash && z(t.blockHash) === rf && (t.blockHash = null), t;
}
const yA = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class Go {
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(t) {
    S(this, "name"), q(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new Go(this.name);
  }
}
class ac extends Go {
  /**
   *  Creates a new GasCostPlugin from %%effectiveBlock%% until the
   *  latest block or another GasCostPlugin supercedes that block number,
   *  with the associated %%costs%%.
   */
  constructor(t, e) {
    t == null && (t = 0), super(`org.ethers.network.plugins.GasCost#${t || 0}`), S(this, "effectiveBlock"), S(this, "txBase"), S(this, "txCreate"), S(this, "txDataZero"), S(this, "txDataNonzero"), S(this, "txAccessListStorageKey"), S(this, "txAccessListAddress");
    const r = { effectiveBlock: t };
    function s(i, o) {
      let c = (e || {})[i];
      c == null && (c = o), B(typeof c == "number", `invalud value for ${i}`, "costs", e), r[i] = c;
    }
    s("txBase", 21e3), s("txCreate", 32e3), s("txDataZero", 4), s("txDataNonzero", 16), s("txAccessListStorageKey", 1900), s("txAccessListAddress", 2400), q(this, r);
  }
  clone() {
    return new ac(this.effectiveBlock, this);
  }
}
class cc extends Go {
  /**
   *  Creates a new **EnsPlugin** connected to %%address%% on the
   *  %%targetNetwork%%. The default ENS address and mainnet is used
   *  if unspecified.
   */
  constructor(t, e) {
    super("org.ethers.plugins.network.Ens"), S(this, "address"), S(this, "targetNetwork"), q(this, {
      address: t || yA,
      targetNetwork: e ?? 1
    });
  }
  clone() {
    return new cc(this.address, this.targetNetwork);
  }
}
var va, xa;
class mA extends Go {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(t, e) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin"), C(this, va), C(this, xa), A(this, va, t), A(this, xa, e);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return f(this, va);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return f(this, xa);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
va = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap();
const Tc = /* @__PURE__ */ new Map();
var no, ro, xr;
const wA = class so {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, e) {
    C(this, no), C(this, ro), C(this, xr), A(this, no, t), A(this, ro, z(e)), A(this, xr, /* @__PURE__ */ new Map());
  }
  /**
   *  Returns a JSON-compatible representation of a Network.
   */
  toJSON() {
    return { name: this.name, chainId: String(this.chainId) };
  }
  /**
   *  The network common name.
   *
   *  This is the canonical name, as networks migh have multiple
   *  names.
   */
  get name() {
    return f(this, no);
  }
  set name(t) {
    A(this, no, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return f(this, ro);
  }
  set chainId(t) {
    A(this, ro, z(t, "chainId"));
  }
  /**
   *  Returns true if %%other%% matches this network. Any chain ID
   *  must match, and if no chain ID is present, the name must match.
   *
   *  This method does not currently check for additional properties,
   *  such as ENS address or plug-in compatibility.
   */
  matches(t) {
    if (t == null)
      return !1;
    if (typeof t == "string") {
      try {
        return this.chainId === z(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === z(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === z(t.chainId);
        } catch {
        }
        return !1;
      }
      return t.name != null ? this.name === t.name : !1;
    }
    return !1;
  }
  /**
   *  Returns the list of plugins currently attached to this Network.
   */
  get plugins() {
    return Array.from(f(this, xr).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (f(this, xr).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return f(this, xr).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return f(this, xr).get(t) || null;
  }
  /**
   *  Gets a list of all plugins that match %%name%%, with otr without
   *  a fragment.
   */
  getPlugins(t) {
    return this.plugins.filter((e) => e.name.split("#")[0] === t);
  }
  /**
   *  Create a copy of this Network.
   */
  clone() {
    const t = new so(this.name, this.chainId);
    return this.plugins.forEach((e) => {
      t.attachPlugin(e.clone());
    }), t;
  }
  /**
   *  Compute the intrinsic gas required for a transaction.
   *
   *  A GasCostPlugin can be attached to override the default
   *  values.
   */
  computeIntrinsicGas(t) {
    const e = this.getPlugin("org.ethers.plugins.network.GasCost") || new ac();
    let r = e.txBase;
    if (t.to == null && (r += e.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += e.txDataZero : r += e.txDataNonzero;
    if (t.accessList) {
      const s = fs(t.accessList);
      for (const i in s)
        r += e.txAccessListAddress + e.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (bA(), t == null)
      return so.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const e = Tc.get(t);
      if (e)
        return e();
      if (typeof t == "bigint")
        return new so("unknown", t);
      B(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      B(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const e = new so(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && e.attachPlugin(new cc(t.ensAddress, t.ensNetwork)), e;
    }
    B(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, e) {
    typeof t == "number" && (t = BigInt(t));
    const r = Tc.get(t);
    r && B(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), Tc.set(t, e);
  }
};
no = /* @__PURE__ */ new WeakMap(), ro = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap();
let ar = wA;
function sf(n, t) {
  const e = String(n);
  if (!e.match(/^[0-9.]+$/))
    throw new Error(`invalid gwei value: ${n}`);
  const r = e.split(".");
  if (r.length === 1 && r.push(""), r.length !== 2)
    throw new Error(`invalid gwei value: ${n}`);
  for (; r[1].length < t; )
    r[1] += "0";
  if (r[1].length > 9) {
    let s = BigInt(r[1].substring(0, 9));
    r[1].substring(9).match(/^0+$/) || s++, r[1] = s.toString();
  }
  return BigInt(r[0] + r[1]);
}
function of(n) {
  return new mA(n, async (t, e, r) => {
    r.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, o] = await Promise.all([
        r.send(),
        t()
      ]);
      s = i;
      const c = s.bodyJson.standard;
      return {
        gasPrice: o.gasPrice,
        maxFeePerGas: sf(c.maxFee, 9),
        maxPriorityFeePerGas: sf(c.maxPriorityFee, 9)
      };
    } catch (i) {
      D(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
let af = !1;
function bA() {
  if (af)
    return;
  af = !0;
  function n(t, e, r) {
    const s = function() {
      const i = new ar(t, e);
      return r.ensNetwork != null && i.attachPlugin(new cc(null, r.ensNetwork)), i.attachPlugin(new ac()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    ar.register(t, s), ar.register(e, s), r.altNames && r.altNames.forEach((i) => {
      ar.register(i, s);
    });
  }
  n("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), n("ropsten", 3, { ensNetwork: 3 }), n("rinkeby", 4, { ensNetwork: 4 }), n("goerli", 5, { ensNetwork: 5 }), n("kovan", 42, { ensNetwork: 42 }), n("sepolia", 11155111, { ensNetwork: 11155111 }), n("holesky", 17e3, { ensNetwork: 17e3 }), n("classic", 61, {}), n("classicKotti", 6, {}), n("arbitrum", 42161, {
    ensNetwork: 1
  }), n("arbitrum-goerli", 421613, {}), n("arbitrum-sepolia", 421614, {}), n("base", 8453, { ensNetwork: 1 }), n("base-goerli", 84531, {}), n("base-sepolia", 84532, {}), n("bnb", 56, { ensNetwork: 1 }), n("bnbt", 97, {}), n("linea", 59144, { ensNetwork: 1 }), n("linea-goerli", 59140, {}), n("linea-sepolia", 59141, {}), n("matic", 137, {
    ensNetwork: 1,
    plugins: [
      of("https://gasstation.polygon.technology/v2")
    ]
  }), n("matic-amoy", 80002, {}), n("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      of("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), n("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), n("optimism-goerli", 420, {}), n("optimism-sepolia", 11155420, {}), n("xdai", 100, { ensNetwork: 1 });
}
function xu(n) {
  return JSON.parse(JSON.stringify(n));
}
var cr, Fe, Pr, yn, bo, $a;
class AA {
  /**
   *  Create a new **PollingBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    C(this, bo), C(this, cr), C(this, Fe), C(this, Pr), C(this, yn), A(this, cr, t), A(this, Fe, null), A(this, Pr, 4e3), A(this, yn, -2);
  }
  /**
   *  The polling interval.
   */
  get pollingInterval() {
    return f(this, Pr);
  }
  set pollingInterval(t) {
    A(this, Pr, t);
  }
  start() {
    f(this, Fe) || (A(this, Fe, f(this, cr)._setTimeout(F(this, bo, $a).bind(this), f(this, Pr))), F(this, bo, $a).call(this));
  }
  stop() {
    f(this, Fe) && (f(this, cr)._clearTimeout(f(this, Fe)), A(this, Fe, null));
  }
  pause(t) {
    this.stop(), t && A(this, yn, -2);
  }
  resume() {
    this.start();
  }
}
cr = /* @__PURE__ */ new WeakMap(), Fe = /* @__PURE__ */ new WeakMap(), Pr = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakSet(), $a = async function() {
  try {
    const n = await f(this, cr).getBlockNumber();
    if (f(this, yn) === -2) {
      A(this, yn, n);
      return;
    }
    if (n !== f(this, yn)) {
      for (let t = f(this, yn) + 1; t <= n; t++) {
        if (f(this, Fe) == null)
          return;
        await f(this, cr).emit("block", t);
      }
      A(this, yn, n);
    }
  } catch {
  }
  f(this, Fe) != null && A(this, Fe, f(this, cr)._setTimeout(F(this, bo, $a).bind(this), f(this, Pr)));
};
var Rs, Cs, Ir;
let Iu = class {
  /**
   *  Create a new **OnBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    C(this, Rs), C(this, Cs), C(this, Ir), A(this, Rs, t), A(this, Ir, !1), A(this, Cs, (e) => {
      this._poll(e, f(this, Rs));
    });
  }
  /**
   *  Called on every new block.
   */
  async _poll(t, e) {
    throw new Error("sub-classes must override this");
  }
  start() {
    f(this, Ir) || (A(this, Ir, !0), f(this, Cs).call(this, -2), f(this, Rs).on("block", f(this, Cs)));
  }
  stop() {
    f(this, Ir) && (A(this, Ir, !1), f(this, Rs).off("block", f(this, Cs)));
  }
  pause(t) {
    this.stop();
  }
  resume() {
    this.start();
  }
};
Rs = /* @__PURE__ */ new WeakMap(), Cs = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap();
var io, tr;
class EA extends Iu {
  constructor(t, e) {
    super(t), C(this, io), C(this, tr), A(this, io, e), A(this, tr, -2);
  }
  pause(t) {
    t && A(this, tr, -2), super.pause(t);
  }
  async _poll(t, e) {
    const r = await e.getBlock(f(this, io));
    r != null && (f(this, tr) === -2 ? A(this, tr, r.number) : r.number > f(this, tr) && (e.emit(f(this, io), r.number), A(this, tr, r.number)));
  }
}
io = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap();
var Sl;
class vA extends Iu {
  constructor(t, e) {
    super(t), C(this, Sl), A(this, Sl, xu(e));
  }
  async _poll(t, e) {
    throw new Error("@TODO");
  }
}
Sl = /* @__PURE__ */ new WeakMap();
var oo;
class xA extends Iu {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%hash%%.
   */
  constructor(t, e) {
    super(t), C(this, oo), A(this, oo, e);
  }
  async _poll(t, e) {
    const r = await e.getTransactionReceipt(f(this, oo));
    r && e.emit(f(this, oo), r);
  }
}
oo = /* @__PURE__ */ new WeakMap();
var sr, Ao, ao, Nr, Me, Tl, Zp;
let Nu = class {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%filter%%.
   */
  constructor(t, e) {
    C(this, Tl), C(this, sr), C(this, Ao), C(this, ao), C(this, Nr), C(this, Me), A(this, sr, t), A(this, Ao, xu(e)), A(this, ao, F(this, Tl, Zp).bind(this)), A(this, Nr, !1), A(this, Me, -2);
  }
  start() {
    f(this, Nr) || (A(this, Nr, !0), f(this, Me) === -2 && f(this, sr).getBlockNumber().then((t) => {
      A(this, Me, t);
    }), f(this, sr).on("block", f(this, ao)));
  }
  stop() {
    f(this, Nr) && (A(this, Nr, !1), f(this, sr).off("block", f(this, ao)));
  }
  pause(t) {
    this.stop(), t && A(this, Me, -2);
  }
  resume() {
    this.start();
  }
};
sr = /* @__PURE__ */ new WeakMap(), Ao = /* @__PURE__ */ new WeakMap(), ao = /* @__PURE__ */ new WeakMap(), Nr = /* @__PURE__ */ new WeakMap(), Me = /* @__PURE__ */ new WeakMap(), Tl = /* @__PURE__ */ new WeakSet(), Zp = async function(n) {
  if (f(this, Me) === -2)
    return;
  const t = xu(f(this, Ao));
  t.fromBlock = f(this, Me) + 1, t.toBlock = n;
  const e = await f(this, sr).getLogs(t);
  if (e.length === 0) {
    f(this, Me) < n - 60 && A(this, Me, n - 60);
    return;
  }
  for (const r of e)
    f(this, sr).emit(f(this, Ao), r), A(this, Me, r.blockNumber);
};
const IA = BigInt(2), NA = 10;
function ea(n) {
  return n && typeof n.then == "function";
}
function Ia(n, t) {
  return n + ":" + JSON.stringify(t, (e, r) => {
    if (r == null)
      return "null";
    if (typeof r == "bigint")
      return `bigint:${r.toString()}`;
    if (typeof r == "string")
      return r.toLowerCase();
    if (typeof r == "object" && !Array.isArray(r)) {
      const s = Object.keys(r);
      return s.sort(), s.reduce((i, o) => (i[o] = r[o], i), {});
    }
    return r;
  });
}
class Yp {
  /**
   *  Create a new UnmanagedSubscriber with %%name%%.
   */
  constructor(t) {
    S(this, "name"), q(this, { name: t });
  }
  start() {
  }
  stop() {
  }
  pause(t) {
  }
  resume() {
  }
}
function BA(n) {
  return JSON.parse(JSON.stringify(n));
}
function Rl(n) {
  return n = Array.from(new Set(n).values()), n.sort(), n;
}
async function Rc(n, t) {
  if (n == null)
    throw new Error("invalid event");
  if (Array.isArray(n) && (n = { topics: n }), typeof n == "string")
    switch (n) {
      case "block":
      case "debug":
      case "error":
      case "finalized":
      case "network":
      case "pending":
      case "safe":
        return { type: n, tag: n };
    }
  if (gt(n, 32)) {
    const e = n.toLowerCase();
    return { type: "transaction", tag: Ia("tx", { hash: e }), hash: e };
  }
  if (n.orphan) {
    const e = n;
    return { type: "orphan", tag: Ia("orphan", e), filter: BA(e) };
  }
  if (n.address || n.topics) {
    const e = n, r = {
      topics: (e.topics || []).map((s) => s == null ? null : Array.isArray(s) ? Rl(s.map((i) => i.toLowerCase())) : s.toLowerCase())
    };
    if (e.address) {
      const s = [], i = [], o = (c) => {
        gt(c) ? s.push(c) : i.push((async () => {
          s.push(await te(c, t));
        })());
      };
      Array.isArray(e.address) ? e.address.forEach(o) : o(e.address), i.length && await Promise.all(i), r.address = Rl(s.map((c) => c.toLowerCase()));
    }
    return { filter: r, tag: Ia("event", r), type: "event" };
  }
  B(!1, "unknown ProviderEvent", "event", n);
}
function Cc() {
  return (/* @__PURE__ */ new Date()).getTime();
}
const OA = {
  cacheTimeout: 250,
  pollingInterval: 4e3
};
var Jt, Br, qt, co, be, Ps, Ur, er, Na, Te, lo, Eo, ut, he, Cl, Pl, uo, Ul, ho, Ba;
class kA {
  /**
   *  Create a new **AbstractProvider** connected to %%network%%, or
   *  use the various network detection capabilities to discover the
   *  [[Network]] if necessary.
   */
  constructor(t, e) {
    if (C(this, ut), C(this, Jt), C(this, Br), C(this, qt), C(this, co), C(this, be), C(this, Ps), C(this, Ur), C(this, er), C(this, Na), C(this, Te), C(this, lo), C(this, Eo), A(this, Eo, Object.assign({}, OA, e || {})), t === "any")
      A(this, Ps, !0), A(this, be, null);
    else if (t) {
      const r = ar.from(t);
      A(this, Ps, !1), A(this, be, Promise.resolve(r)), setTimeout(() => {
        this.emit("network", r, null);
      }, 0);
    } else
      A(this, Ps, !1), A(this, be, null);
    A(this, er, -1), A(this, Ur, /* @__PURE__ */ new Map()), A(this, Jt, /* @__PURE__ */ new Map()), A(this, Br, /* @__PURE__ */ new Map()), A(this, qt, null), A(this, co, !1), A(this, Na, 1), A(this, Te, /* @__PURE__ */ new Map()), A(this, lo, !1);
  }
  get pollingInterval() {
    return f(this, Eo).pollingInterval;
  }
  /**
   *  Returns ``this``, to allow an **AbstractProvider** to implement
   *  the [[ContractRunner]] interface.
   */
  get provider() {
    return this;
  }
  /**
   *  Returns all the registered plug-ins.
   */
  get plugins() {
    return Array.from(f(this, Br).values());
  }
  /**
   *  Attach a new plug-in.
   */
  attachPlugin(t) {
    if (f(this, Br).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return f(this, Br).set(t.name, t.connect(this)), this;
  }
  /**
   *  Get a plugin by name.
   */
  getPlugin(t) {
    return f(this, Br).get(t) || null;
  }
  /**
   *  Prevent any CCIP-read operation, regardless of whether requested
   *  in a [[call]] using ``enableCcipRead``.
   */
  get disableCcipRead() {
    return f(this, lo);
  }
  set disableCcipRead(t) {
    A(this, lo, !!t);
  }
  /**
   *  Resolves to the data for executing the CCIP-read operations.
   */
  async ccipReadFetch(t, e, r) {
    if (this.disableCcipRead || r.length === 0 || t.to == null)
      return null;
    const s = t.to.toLowerCase(), i = e.toLowerCase(), o = [];
    for (let c = 0; c < r.length; c++) {
      const a = r[c], l = a.replace("{sender}", s).replace("{data}", i), h = new ns(l);
      a.indexOf("{data}") === -1 && (h.body = { data: i, sender: s }), this.emit("debug", { action: "sendCcipReadFetchRequest", request: h, index: c, urls: r });
      let u = "unknown error";
      const p = await h.send();
      try {
        const b = p.bodyJson;
        if (b.data)
          return this.emit("debug", { action: "receiveCcipReadFetchResult", request: h, result: b }), b.data;
        b.message && (u = b.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: h, result: b });
      } catch {
      }
      D(p.statusCode < 400 || p.statusCode >= 500, `response not found during CCIP fetch: ${u}`, "OFFCHAIN_FAULT", { reason: "404_MISSING_RESOURCE", transaction: t, info: { url: a, errorMessage: u } }), o.push(u);
    }
    D(!1, `error encountered during CCIP fetch: ${o.map((c) => JSON.stringify(c)).join(", ")}`, "OFFCHAIN_FAULT", {
      reason: "500_SERVER_ERROR",
      transaction: t,
      info: { urls: r, errorMessages: o }
    });
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a block before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Block]].
   */
  _wrapBlock(t, e) {
    return new $b(hA(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a log before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Log]].
   */
  _wrapLog(t, e) {
    return new Ho(lA(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  receipt before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionReceipt]].
   */
  _wrapTransactionReceipt(t, e) {
    return new Lp(gA(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  response before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionResponse]].
   */
  _wrapTransactionResponse(t, e) {
    return new bu(Jp(t), this);
  }
  /**
   *  Resolves to the Network, forcing a network detection using whatever
   *  technique the sub-class requires.
   *
   *  Sub-classes **must** override this.
   */
  _detectNetwork() {
    D(!1, "sub-classes must implement this", "UNSUPPORTED_OPERATION", {
      operation: "_detectNetwork"
    });
  }
  /**
   *  Sub-classes should use this to perform all built-in operations. All
   *  methods sanitizes and normalizes the values passed into this.
   *
   *  Sub-classes **must** override this.
   */
  async _perform(t) {
    D(!1, `unsupported method: ${t.method}`, "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: t
    });
  }
  // State
  async getBlockNumber() {
    const t = nt(await F(this, ut, he).call(this, { method: "getBlockNumber" }), "%response");
    return f(this, er) >= 0 && A(this, er, t), t;
  }
  /**
   *  Returns or resolves to the address for %%address%%, resolving ENS
   *  names and [[Addressable]] objects and returning if already an
   *  address.
   */
  _getAddress(t) {
    return te(t, this);
  }
  /**
   *  Returns or resolves to a valid block tag for %%blockTag%%, resolving
   *  negative values and returning if already a valid block tag.
   */
  _getBlockTag(t) {
    if (t == null)
      return "latest";
    switch (t) {
      case "earliest":
        return "0x0";
      case "finalized":
      case "latest":
      case "pending":
      case "safe":
        return t;
    }
    if (gt(t))
      return gt(t, 32) ? t : Hs(t);
    if (typeof t == "bigint" && (t = nt(t, "blockTag")), typeof t == "number")
      return t >= 0 ? Hs(t) : f(this, er) >= 0 ? Hs(f(this, er) + t) : this.getBlockNumber().then((e) => Hs(e + t));
    B(!1, "invalid blockTag", "blockTag", t);
  }
  /**
   *  Returns or resolves to a filter for %%filter%%, resolving any ENS
   *  names or [[Addressable]] object and returning if already a valid
   *  filter.
   */
  _getFilter(t) {
    const e = (t.topics || []).map((a) => a == null ? null : Array.isArray(a) ? Rl(a.map((l) => l.toLowerCase())) : a.toLowerCase()), r = "blockHash" in t ? t.blockHash : void 0, s = (a, l, h) => {
      let u;
      switch (a.length) {
        case 0:
          break;
        case 1:
          u = a[0];
          break;
        default:
          a.sort(), u = a;
      }
      if (r && (l != null || h != null))
        throw new Error("invalid filter");
      const p = {};
      return u && (p.address = u), e.length && (p.topics = e), l && (p.fromBlock = l), h && (p.toBlock = h), r && (p.blockHash = r), p;
    };
    let i = [];
    if (t.address)
      if (Array.isArray(t.address))
        for (const a of t.address)
          i.push(this._getAddress(a));
      else
        i.push(this._getAddress(t.address));
    let o;
    "fromBlock" in t && (o = this._getBlockTag(t.fromBlock));
    let c;
    return "toBlock" in t && (c = this._getBlockTag(t.toBlock)), i.filter((a) => typeof a != "string").length || o != null && typeof o != "string" || c != null && typeof c != "string" ? Promise.all([Promise.all(i), o, c]).then((a) => s(a[0], a[1], a[2])) : s(i, o, c);
  }
  /**
   *  Returns or resolves to a transaction for %%request%%, resolving
   *  any ENS names or [[Addressable]] and returning if already a valid
   *  transaction.
   */
  _getTransactionRequest(t) {
    const e = rc(t), r = [];
    if (["to", "from"].forEach((s) => {
      if (e[s] == null)
        return;
      const i = te(e[s], this);
      ea(i) ? r.push(async function() {
        e[s] = await i;
      }()) : e[s] = i;
    }), e.blockTag != null) {
      const s = this._getBlockTag(e.blockTag);
      ea(s) ? r.push(async function() {
        e.blockTag = await s;
      }()) : e.blockTag = s;
    }
    return r.length ? async function() {
      return await Promise.all(r), e;
    }() : e;
  }
  async getNetwork() {
    if (f(this, be) == null) {
      const s = (async () => {
        try {
          const i = await this._detectNetwork();
          return this.emit("network", i, null), i;
        } catch (i) {
          throw f(this, be) === s && A(this, be, null), i;
        }
      })();
      return A(this, be, s), (await s).clone();
    }
    const t = f(this, be), [e, r] = await Promise.all([
      t,
      this._detectNetwork()
      // The actual connected network
    ]);
    return e.chainId !== r.chainId && (f(this, Ps) ? (this.emit("network", r, e), f(this, be) === t && A(this, be, Promise.resolve(r))) : D(!1, `network changed: ${e.chainId} => ${r.chainId} `, "NETWORK_ERROR", {
      event: "changed"
    })), e.clone();
  }
  async getFeeData() {
    const t = await this.getNetwork(), e = async () => {
      const { _block: s, gasPrice: i, priorityFee: o } = await Zt({
        _block: F(this, ut, Ul).call(this, "latest", !1),
        gasPrice: (async () => {
          try {
            const h = await F(this, ut, he).call(this, { method: "getGasPrice" });
            return z(h, "%response");
          } catch {
          }
          return null;
        })(),
        priorityFee: (async () => {
          try {
            const h = await F(this, ut, he).call(this, { method: "getPriorityFee" });
            return z(h, "%response");
          } catch {
          }
          return null;
        })()
      });
      let c = null, a = null;
      const l = this._wrapBlock(s, t);
      return l && l.baseFeePerGas && (a = o ?? BigInt("1000000000"), c = l.baseFeePerGas * IA + a), new Yh(i, c, a);
    }, r = t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    if (r) {
      const s = new ns(r.url), i = await r.processFunc(e, this, s);
      return new Yh(i.gasPrice, i.maxFeePerGas, i.maxPriorityFeePerGas);
    }
    return await e();
  }
  async estimateGas(t) {
    let e = this._getTransactionRequest(t);
    return ea(e) && (e = await e), z(await F(this, ut, he).call(this, {
      method: "estimateGas",
      transaction: e
    }), "%response");
  }
  async call(t) {
    const { tx: e, blockTag: r } = await Zt({
      tx: this._getTransactionRequest(t),
      blockTag: this._getBlockTag(t.blockTag)
    });
    return await F(this, ut, Pl).call(this, F(this, ut, Cl).call(this, e, r, t.enableCcipRead ? 0 : -1));
  }
  async getBalance(t, e) {
    return z(await F(this, ut, uo).call(this, { method: "getBalance" }, t, e), "%response");
  }
  async getTransactionCount(t, e) {
    return nt(await F(this, ut, uo).call(this, { method: "getTransactionCount" }, t, e), "%response");
  }
  async getCode(t, e) {
    return W(await F(this, ut, uo).call(this, { method: "getCode" }, t, e));
  }
  async getStorage(t, e, r) {
    const s = z(e, "position");
    return W(await F(this, ut, uo).call(this, { method: "getStorage", position: s }, t, r));
  }
  // Write
  async broadcastTransaction(t) {
    const { blockNumber: e, hash: r, network: s } = await Zt({
      blockNumber: this.getBlockNumber(),
      hash: this._perform({
        method: "broadcastTransaction",
        signedTransaction: t
      }),
      network: this.getNetwork()
    }), i = wp.from(t);
    if (i.hash !== r)
      throw new Error("@TODO: the returned hash did not match");
    return this._wrapTransactionResponse(i, s).replaceableTransaction(e);
  }
  // Queries
  async getBlock(t, e) {
    const { network: r, params: s } = await Zt({
      network: this.getNetwork(),
      params: F(this, ut, Ul).call(this, t, !!e)
    });
    return s == null ? null : this._wrapBlock(s, r);
  }
  async getTransaction(t) {
    const { network: e, params: r } = await Zt({
      network: this.getNetwork(),
      params: F(this, ut, he).call(this, { method: "getTransaction", hash: t })
    });
    return r == null ? null : this._wrapTransactionResponse(r, e);
  }
  async getTransactionReceipt(t) {
    const { network: e, params: r } = await Zt({
      network: this.getNetwork(),
      params: F(this, ut, he).call(this, { method: "getTransactionReceipt", hash: t })
    });
    if (r == null)
      return null;
    if (r.gasPrice == null && r.effectiveGasPrice == null) {
      const s = await F(this, ut, he).call(this, { method: "getTransaction", hash: t });
      if (s == null)
        throw new Error("report this; could not find tx or effectiveGasPrice");
      r.effectiveGasPrice = s.gasPrice;
    }
    return this._wrapTransactionReceipt(r, e);
  }
  async getTransactionResult(t) {
    const { result: e } = await Zt({
      network: this.getNetwork(),
      result: F(this, ut, he).call(this, { method: "getTransactionResult", hash: t })
    });
    return e == null ? null : W(e);
  }
  // Bloom-filter Queries
  async getLogs(t) {
    let e = this._getFilter(t);
    ea(e) && (e = await e);
    const { network: r, params: s } = await Zt({
      network: this.getNetwork(),
      params: F(this, ut, he).call(this, { method: "getLogs", filter: e })
    });
    return s.map((i) => this._wrapLog(i, r));
  }
  // ENS
  _getProvider(t) {
    D(!1, "provider cannot connect to target network", "UNSUPPORTED_OPERATION", {
      operation: "_getProvider()"
    });
  }
  async getResolver(t) {
    return await nf.fromName(this, t);
  }
  async getAvatar(t) {
    const e = await this.getResolver(t);
    return e ? await e.getAvatar() : null;
  }
  async resolveName(t) {
    const e = await this.getResolver(t);
    return e ? await e.getAddress() : null;
  }
  async lookupAddress(t) {
    t = ft(t);
    const e = wl(t.substring(2).toLowerCase() + ".addr.reverse");
    try {
      const r = await nf.getEnsAddress(this), s = await new cs(r, [
        "function resolver(bytes32) view returns (address)"
      ], this).resolver(e);
      if (s == null || s === bi)
        return null;
      const i = await new cs(s, [
        "function name(bytes32) view returns (string)"
      ], this).name(e);
      return await this.resolveName(i) !== t ? null : i;
    } catch (r) {
      if (zt(r, "BAD_DATA") && r.value === "0x" || zt(r, "CALL_EXCEPTION"))
        return null;
      throw r;
    }
    return null;
  }
  async waitForTransaction(t, e, r) {
    const s = e ?? 1;
    return s === 0 ? this.getTransactionReceipt(t) : new Promise(async (i, o) => {
      let c = null;
      const a = async (l) => {
        try {
          const h = await this.getTransactionReceipt(t);
          if (h != null && l - h.blockNumber + 1 >= s) {
            i(h), c && (clearTimeout(c), c = null);
            return;
          }
        } catch (h) {
          console.log("EEE", h);
        }
        this.once("block", a);
      };
      r != null && (c = setTimeout(() => {
        c != null && (c = null, this.off("block", a), o(vt("timeout", "TIMEOUT", { reason: "timeout" })));
      }, r)), a(await this.getBlockNumber());
    });
  }
  async waitForBlock(t) {
    D(!1, "not implemented yet", "NOT_IMPLEMENTED", {
      operation: "waitForBlock"
    });
  }
  /**
   *  Clear a timer created using the [[_setTimeout]] method.
   */
  _clearTimeout(t) {
    const e = f(this, Te).get(t);
    e && (e.timer && clearTimeout(e.timer), f(this, Te).delete(t));
  }
  /**
   *  Create a timer that will execute %%func%% after at least %%timeout%%
   *  (in ms). If %%timeout%% is unspecified, then %%func%% will execute
   *  in the next event loop.
   *
   *  [Pausing](AbstractProvider-paused) the provider will pause any
   *  associated timers.
   */
  _setTimeout(t, e) {
    e == null && (e = 0);
    const r = Ca(this, Na)._++, s = () => {
      f(this, Te).delete(r), t();
    };
    if (this.paused)
      f(this, Te).set(r, { timer: null, func: s, time: e });
    else {
      const i = setTimeout(s, e);
      f(this, Te).set(r, { timer: i, func: s, time: Cc() });
    }
    return r;
  }
  /**
   *  Perform %%func%% on each subscriber.
   */
  _forEachSubscriber(t) {
    for (const e of f(this, Jt).values())
      t(e.subscriber);
  }
  /**
   *  Sub-classes may override this to customize subscription
   *  implementations.
   */
  _getSubscriber(t) {
    switch (t.type) {
      case "debug":
      case "error":
      case "network":
        return new Yp(t.type);
      case "block": {
        const e = new AA(this);
        return e.pollingInterval = this.pollingInterval, e;
      }
      case "safe":
      case "finalized":
        return new EA(this, t.type);
      case "event":
        return new Nu(this, t.filter);
      case "transaction":
        return new xA(this, t.hash);
      case "orphan":
        return new vA(this, t.filter);
    }
    throw new Error(`unsupported event: ${t.type}`);
  }
  /**
   *  If a [[Subscriber]] fails and needs to replace itself, this
   *  method may be used.
   *
   *  For example, this is used for providers when using the
   *  ``eth_getFilterChanges`` method, which can return null if state
   *  filters are not supported by the backend, allowing the Subscriber
   *  to swap in a [[PollingEventSubscriber]].
   */
  _recoverSubscriber(t, e) {
    for (const r of f(this, Jt).values())
      if (r.subscriber === t) {
        r.started && r.subscriber.stop(), r.subscriber = e, r.started && e.start(), f(this, qt) != null && e.pause(f(this, qt));
        break;
      }
  }
  async on(t, e) {
    const r = await F(this, ut, Ba).call(this, t);
    return r.listeners.push({ listener: e, once: !1 }), r.started || (r.subscriber.start(), r.started = !0, f(this, qt) != null && r.subscriber.pause(f(this, qt))), this;
  }
  async once(t, e) {
    const r = await F(this, ut, Ba).call(this, t);
    return r.listeners.push({ listener: e, once: !0 }), r.started || (r.subscriber.start(), r.started = !0, f(this, qt) != null && r.subscriber.pause(f(this, qt))), this;
  }
  async emit(t, ...e) {
    const r = await F(this, ut, ho).call(this, t, e);
    if (!r || r.listeners.length === 0)
      return !1;
    const s = r.listeners.length;
    return r.listeners = r.listeners.filter(({ listener: i, once: o }) => {
      const c = new nd(this, o ? null : i, t);
      try {
        i.call(this, ...e, c);
      } catch {
      }
      return !o;
    }), r.listeners.length === 0 && (r.started && r.subscriber.stop(), f(this, Jt).delete(r.tag)), s > 0;
  }
  async listenerCount(t) {
    if (t) {
      const r = await F(this, ut, ho).call(this, t);
      return r ? r.listeners.length : 0;
    }
    let e = 0;
    for (const { listeners: r } of f(this, Jt).values())
      e += r.length;
    return e;
  }
  async listeners(t) {
    if (t) {
      const r = await F(this, ut, ho).call(this, t);
      return r ? r.listeners.map(({ listener: s }) => s) : [];
    }
    let e = [];
    for (const { listeners: r } of f(this, Jt).values())
      e = e.concat(r.map(({ listener: s }) => s));
    return e;
  }
  async off(t, e) {
    const r = await F(this, ut, ho).call(this, t);
    if (!r)
      return this;
    if (e) {
      const s = r.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && r.listeners.splice(s, 1);
    }
    return (!e || r.listeners.length === 0) && (r.started && r.subscriber.stop(), f(this, Jt).delete(r.tag)), this;
  }
  async removeAllListeners(t) {
    if (t) {
      const { tag: e, started: r, subscriber: s } = await F(this, ut, Ba).call(this, t);
      r && s.stop(), f(this, Jt).delete(e);
    } else
      for (const [e, { started: r, subscriber: s }] of f(this, Jt))
        r && s.stop(), f(this, Jt).delete(e);
    return this;
  }
  // Alias for "on"
  async addListener(t, e) {
    return await this.on(t, e);
  }
  // Alias for "off"
  async removeListener(t, e) {
    return this.off(t, e);
  }
  /**
   *  If this provider has been destroyed using the [[destroy]] method.
   *
   *  Once destroyed, all resources are reclaimed, internal event loops
   *  and timers are cleaned up and no further requests may be sent to
   *  the provider.
   */
  get destroyed() {
    return f(this, co);
  }
  /**
   *  Sub-classes may use this to shutdown any sockets or release their
   *  resources and reject any pending requests.
   *
   *  Sub-classes **must** call ``super.destroy()``.
   */
  destroy() {
    this.removeAllListeners();
    for (const t of f(this, Te).keys())
      this._clearTimeout(t);
    A(this, co, !0);
  }
  /**
   *  Whether the provider is currently paused.
   *
   *  A paused provider will not emit any events, and generally should
   *  not make any requests to the network, but that is up to sub-classes
   *  to manage.
   *
   *  Setting ``paused = true`` is identical to calling ``.pause(false)``,
   *  which will buffer any events that occur while paused until the
   *  provider is unpaused.
   */
  get paused() {
    return f(this, qt) != null;
  }
  set paused(t) {
    !!t !== this.paused && (this.paused ? this.resume() : this.pause(!1));
  }
  /**
   *  Pause the provider. If %%dropWhilePaused%%, any events that occur
   *  while paused are dropped, otherwise all events will be emitted once
   *  the provider is unpaused.
   */
  pause(t) {
    if (A(this, er, -1), f(this, qt) != null) {
      if (f(this, qt) == !!t)
        return;
      D(!1, "cannot change pause type; resume first", "UNSUPPORTED_OPERATION", {
        operation: "pause"
      });
    }
    this._forEachSubscriber((e) => e.pause(t)), A(this, qt, !!t);
    for (const e of f(this, Te).values())
      e.timer && clearTimeout(e.timer), e.time = Cc() - e.time;
  }
  /**
   *  Resume the provider.
   */
  resume() {
    if (f(this, qt) != null) {
      this._forEachSubscriber((t) => t.resume()), A(this, qt, null);
      for (const t of f(this, Te).values()) {
        let e = t.time;
        e < 0 && (e = 0), t.time = Cc(), setTimeout(t.func, e);
      }
    }
  }
}
Jt = /* @__PURE__ */ new WeakMap(), Br = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), co = /* @__PURE__ */ new WeakMap(), be = /* @__PURE__ */ new WeakMap(), Ps = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakMap(), Na = /* @__PURE__ */ new WeakMap(), Te = /* @__PURE__ */ new WeakMap(), lo = /* @__PURE__ */ new WeakMap(), Eo = /* @__PURE__ */ new WeakMap(), ut = /* @__PURE__ */ new WeakSet(), he = async function(n) {
  const t = f(this, Eo).cacheTimeout;
  if (t < 0)
    return await this._perform(n);
  const e = Ia(n.method, n);
  let r = f(this, Ur).get(e);
  return r || (r = this._perform(n), f(this, Ur).set(e, r), setTimeout(() => {
    f(this, Ur).get(e) === r && f(this, Ur).delete(e);
  }, t)), await r;
}, Cl = async function(n, t, e) {
  D(e < NA, "CCIP read exceeded maximum redirections", "OFFCHAIN_FAULT", {
    reason: "TOO_MANY_REDIRECTS",
    transaction: Object.assign({}, n, { blockTag: t, enableCcipRead: !0 })
  });
  const r = rc(n);
  try {
    return W(await this._perform({ method: "call", transaction: r, blockTag: t }));
  } catch (s) {
    if (!this.disableCcipRead && tu(s) && s.data && e >= 0 && t === "latest" && r.to != null && xt(s.data, 0, 4) === "0x556f1830") {
      const i = s.data, o = await te(r.to, this);
      let c;
      try {
        c = PA(xt(s.data, 4));
      } catch (h) {
        D(!1, h.message, "OFFCHAIN_FAULT", {
          reason: "BAD_DATA",
          transaction: r,
          info: { data: i }
        });
      }
      D(c.sender.toLowerCase() === o.toLowerCase(), "CCIP Read sender mismatch", "CALL_EXCEPTION", {
        action: "call",
        data: i,
        reason: "OffchainLookup",
        transaction: r,
        invocation: null,
        revert: {
          signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
          name: "OffchainLookup",
          args: c.errorArgs
        }
      });
      const a = await this.ccipReadFetch(r, c.calldata, c.urls);
      D(a != null, "CCIP Read failed to fetch data", "OFFCHAIN_FAULT", {
        reason: "FETCH_FAILED",
        transaction: r,
        info: { data: s.data, errorArgs: c.errorArgs }
      });
      const l = {
        to: o,
        data: Et([c.selector, CA([a, c.extraData])])
      };
      this.emit("debug", { action: "sendCcipReadCall", transaction: l });
      try {
        const h = await F(this, ut, Cl).call(this, l, t, e + 1);
        return this.emit("debug", { action: "receiveCcipReadCallResult", transaction: Object.assign({}, l), result: h }), h;
      } catch (h) {
        throw this.emit("debug", { action: "receiveCcipReadCallError", transaction: Object.assign({}, l), error: h }), h;
      }
    }
    throw s;
  }
}, Pl = async function(n) {
  const { value: t } = await Zt({
    network: this.getNetwork(),
    value: n
  });
  return t;
}, uo = async function(n, t, e) {
  let r = this._getAddress(t), s = this._getBlockTag(e);
  return (typeof r != "string" || typeof s != "string") && ([r, s] = await Promise.all([r, s])), await F(this, ut, Pl).call(this, F(this, ut, he).call(this, Object.assign(n, { address: r, blockTag: s })));
}, Ul = async function(n, t) {
  if (gt(n, 32))
    return await F(this, ut, he).call(this, {
      method: "getBlock",
      blockHash: n,
      includeTransactions: t
    });
  let e = this._getBlockTag(n);
  return typeof e != "string" && (e = await e), await F(this, ut, he).call(this, {
    method: "getBlock",
    blockTag: e,
    includeTransactions: t
  });
}, ho = async function(n, t) {
  let e = await Rc(n, this);
  return e.type === "event" && t && t.length > 0 && t[0].removed === !0 && (e = await Rc({ orphan: "drop-log", log: t[0] }, this)), f(this, Jt).get(e.tag) || null;
}, Ba = async function(n) {
  const t = await Rc(n, this), e = t.tag;
  let r = f(this, Jt).get(e);
  return r || (r = { subscriber: this._getSubscriber(t), tag: e, addressableMap: /* @__PURE__ */ new WeakMap(), nameMap: /* @__PURE__ */ new Map(), started: !1, listeners: [] }, f(this, Jt).set(e, r)), r;
};
function SA(n, t) {
  try {
    const e = Ll(n, t);
    if (e)
      return Ua(e);
  } catch {
  }
  return null;
}
function Ll(n, t) {
  if (n === "0x")
    return null;
  try {
    const e = nt(xt(n, t, t + 32)), r = nt(xt(n, e, e + 32));
    return xt(n, e + 32, e + 32 + r);
  } catch {
  }
  return null;
}
function cf(n) {
  const t = Lt(n);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const e = new Uint8Array(32);
  return e.set(t, 32 - t.length), e;
}
function TA(n) {
  if (n.length % 32 === 0)
    return n;
  const t = new Uint8Array(Math.ceil(n.length / 32) * 32);
  return t.set(n), t;
}
const RA = new Uint8Array([]);
function CA(n) {
  const t = [];
  let e = 0;
  for (let r = 0; r < n.length; r++)
    t.push(RA), e += 32;
  for (let r = 0; r < n.length; r++) {
    const s = et(n[r]);
    t[r] = cf(e), t.push(cf(s.length)), t.push(TA(s)), e += 32 + Math.ceil(s.length / 32) * 32;
  }
  return Et(t);
}
const lf = "0x0000000000000000000000000000000000000000000000000000000000000000";
function PA(n) {
  const t = {
    sender: "",
    urls: [],
    calldata: "",
    selector: "",
    extraData: "",
    errorArgs: []
  };
  D(Kr(n) >= 5 * 32, "insufficient OffchainLookup data", "OFFCHAIN_FAULT", {
    reason: "insufficient OffchainLookup data"
  });
  const e = xt(n, 0, 32);
  D(xt(e, 0, 12) === xt(lf, 0, 12), "corrupt OffchainLookup sender", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup sender"
  }), t.sender = xt(e, 12);
  try {
    const r = [], s = nt(xt(n, 32, 64)), i = nt(xt(n, s, s + 32)), o = xt(n, s + 32);
    for (let c = 0; c < i; c++) {
      const a = SA(o, c * 32);
      if (a == null)
        throw new Error("abort");
      r.push(a);
    }
    t.urls = r;
  } catch {
    D(!1, "corrupt OffchainLookup urls", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup urls"
    });
  }
  try {
    const r = Ll(n, 64);
    if (r == null)
      throw new Error("abort");
    t.calldata = r;
  } catch {
    D(!1, "corrupt OffchainLookup calldata", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup calldata"
    });
  }
  D(xt(n, 100, 128) === xt(lf, 0, 28), "corrupt OffchainLookup callbaackSelector", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup callbaackSelector"
  }), t.selector = xt(n, 96, 100);
  try {
    const r = Ll(n, 128);
    if (r == null)
      throw new Error("abort");
    t.extraData = r;
  } catch {
    D(!1, "corrupt OffchainLookup extraData", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup extraData"
    });
  }
  return t.errorArgs = "sender,urls,calldata,selector,extraData".split(/,/).map((r) => t[r]), t;
}
function ps(n, t) {
  if (n.provider)
    return n.provider;
  D(!1, "missing provider", "UNSUPPORTED_OPERATION", { operation: t });
}
async function uf(n, t) {
  let e = rc(t);
  if (e.to != null && (e.to = te(e.to, n)), e.from != null) {
    const r = e.from;
    e.from = Promise.all([
      n.getAddress(),
      te(r, n)
    ]).then(([s, i]) => (B(s.toLowerCase() === i.toLowerCase(), "transaction from mismatch", "tx.from", i), s));
  } else
    e.from = n.getAddress();
  return await Zt(e);
}
class Xp {
  /**
   *  Creates a new Signer connected to %%provider%%.
   */
  constructor(t) {
    S(this, "provider"), q(this, { provider: t || null });
  }
  async getNonce(t) {
    return ps(this, "getTransactionCount").getTransactionCount(await this.getAddress(), t);
  }
  async populateCall(t) {
    return await uf(this, t);
  }
  async populateTransaction(t) {
    const e = ps(this, "populateTransaction"), r = await uf(this, t);
    r.nonce == null && (r.nonce = await this.getNonce("pending")), r.gasLimit == null && (r.gasLimit = await this.estimateGas(r));
    const s = await this.provider.getNetwork();
    if (r.chainId != null) {
      const o = z(r.chainId);
      B(o === s.chainId, "transaction chainId mismatch", "tx.chainId", t.chainId);
    } else
      r.chainId = s.chainId;
    const i = r.maxFeePerGas != null || r.maxPriorityFeePerGas != null;
    if (r.gasPrice != null && (r.type === 2 || i) ? B(!1, "eip-1559 transaction do not support gasPrice", "tx", t) : (r.type === 0 || r.type === 1) && i && B(!1, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", t), (r.type === 2 || r.type == null) && r.maxFeePerGas != null && r.maxPriorityFeePerGas != null)
      r.type = 2;
    else if (r.type === 0 || r.type === 1) {
      const o = await e.getFeeData();
      D(o.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", {
        operation: "getGasPrice"
      }), r.gasPrice == null && (r.gasPrice = o.gasPrice);
    } else {
      const o = await e.getFeeData();
      if (r.type == null)
        if (o.maxFeePerGas != null && o.maxPriorityFeePerGas != null)
          if (r.type = 2, r.gasPrice != null) {
            const c = r.gasPrice;
            delete r.gasPrice, r.maxFeePerGas = c, r.maxPriorityFeePerGas = c;
          } else
            r.maxFeePerGas == null && (r.maxFeePerGas = o.maxFeePerGas), r.maxPriorityFeePerGas == null && (r.maxPriorityFeePerGas = o.maxPriorityFeePerGas);
        else o.gasPrice != null ? (D(!i, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", {
          operation: "populateTransaction"
        }), r.gasPrice == null && (r.gasPrice = o.gasPrice), r.type = 0) : D(!1, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", {
          operation: "signer.getFeeData"
        });
      else (r.type === 2 || r.type === 3) && (r.maxFeePerGas == null && (r.maxFeePerGas = o.maxFeePerGas), r.maxPriorityFeePerGas == null && (r.maxPriorityFeePerGas = o.maxPriorityFeePerGas));
    }
    return await Zt(r);
  }
  async estimateGas(t) {
    return ps(this, "estimateGas").estimateGas(await this.populateCall(t));
  }
  async call(t) {
    return ps(this, "call").call(await this.populateCall(t));
  }
  async resolveName(t) {
    return await ps(this, "resolveName").resolveName(t);
  }
  async sendTransaction(t) {
    const e = ps(this, "sendTransaction"), r = await this.populateTransaction(t);
    delete r.from;
    const s = wp.from(r);
    return await e.broadcastTransaction(await this.signTransaction(s));
  }
}
var fo, Oa;
const UA = class tg extends Xp {
  /**
   *  Creates a new **VoidSigner** with %%address%% attached to
   *  %%provider%%.
   */
  constructor(t, e) {
    super(e), C(this, fo), S(this, "address"), q(this, { address: t });
  }
  async getAddress() {
    return this.address;
  }
  connect(t) {
    return new tg(this.address, t);
  }
  async signTransaction(t) {
    F(this, fo, Oa).call(this, "transactions", "signTransaction");
  }
  async signMessage(t) {
    F(this, fo, Oa).call(this, "messages", "signMessage");
  }
  async signTypedData(t, e, r) {
    F(this, fo, Oa).call(this, "typed-data", "signTypedData");
  }
};
fo = /* @__PURE__ */ new WeakSet(), Oa = function(n, t) {
  D(!1, `VoidSigner cannot sign ${n}`, "UNSUPPORTED_OPERATION", { operation: t });
};
let hf = UA;
function LA(n) {
  return JSON.parse(JSON.stringify(n));
}
var se, pn, Vs, Or, $s, vo, Us, Dl, Fl;
class eg {
  /**
   *  Creates a new **FilterIdSubscriber** which will used [[_subscribe]]
   *  and [[_emitResults]] to setup the subscription and provide the event
   *  to the %%provider%%.
   */
  constructor(t) {
    C(this, Us), C(this, se), C(this, pn), C(this, Vs), C(this, Or), C(this, $s), C(this, vo), A(this, se, t), A(this, pn, null), A(this, Vs, F(this, Us, Dl).bind(this)), A(this, Or, !1), A(this, $s, null), A(this, vo, !1);
  }
  /**
   *  Sub-classes **must** override this to begin the subscription.
   */
  _subscribe(t) {
    throw new Error("subclasses must override this");
  }
  /**
   *  Sub-classes **must** override this handle the events.
   */
  _emitResults(t, e) {
    throw new Error("subclasses must override this");
  }
  /**
   *  Sub-classes **must** override this handle recovery on errors.
   */
  _recover(t) {
    throw new Error("subclasses must override this");
  }
  start() {
    f(this, Or) || (A(this, Or, !0), F(this, Us, Dl).call(this, -2));
  }
  stop() {
    f(this, Or) && (A(this, Or, !1), A(this, vo, !0), F(this, Us, Fl).call(this), f(this, se).off("block", f(this, Vs)));
  }
  pause(t) {
    t && F(this, Us, Fl).call(this), f(this, se).off("block", f(this, Vs));
  }
  resume() {
    this.start();
  }
}
se = /* @__PURE__ */ new WeakMap(), pn = /* @__PURE__ */ new WeakMap(), Vs = /* @__PURE__ */ new WeakMap(), Or = /* @__PURE__ */ new WeakMap(), $s = /* @__PURE__ */ new WeakMap(), vo = /* @__PURE__ */ new WeakMap(), Us = /* @__PURE__ */ new WeakSet(), Dl = async function(n) {
  try {
    f(this, pn) == null && A(this, pn, this._subscribe(f(this, se)));
    let t = null;
    try {
      t = await f(this, pn);
    } catch (s) {
      if (!zt(s, "UNSUPPORTED_OPERATION") || s.operation !== "eth_newFilter")
        throw s;
    }
    if (t == null) {
      A(this, pn, null), f(this, se)._recoverSubscriber(this, this._recover(f(this, se)));
      return;
    }
    const e = await f(this, se).getNetwork();
    if (f(this, $s) || A(this, $s, e), f(this, $s).chainId !== e.chainId)
      throw new Error("chaid changed");
    if (f(this, vo))
      return;
    const r = await f(this, se).send("eth_getFilterChanges", [t]);
    await this._emitResults(f(this, se), r);
  } catch (t) {
    console.log("@TODO", t);
  }
  f(this, se).once("block", f(this, Vs));
}, Fl = function() {
  const n = f(this, pn);
  n && (A(this, pn, null), n.then((t) => {
    f(this, se).destroyed || f(this, se).send("eth_uninstallFilter", [t]);
  }));
};
var Ls;
class DA extends eg {
  /**
   *  Creates a new **FilterIdEventSubscriber** attached to %%provider%%
   *  listening for %%filter%%.
   */
  constructor(t, e) {
    super(t), C(this, Ls), A(this, Ls, LA(e));
  }
  _recover(t) {
    return new Nu(t, f(this, Ls));
  }
  async _subscribe(t) {
    return await t.send("eth_newFilter", [f(this, Ls)]);
  }
  async _emitResults(t, e) {
    for (const r of e)
      t.emit(f(this, Ls), t._wrapLog(r, t._network));
  }
}
Ls = /* @__PURE__ */ new WeakMap();
class FA extends eg {
  async _subscribe(t) {
    return await t.send("eth_newPendingTransactionFilter", []);
  }
  async _emitResults(t, e) {
    for (const r of e)
      t.emit("pending", r);
  }
}
const MA = "bigint,boolean,function,number,string,symbol".split(/,/g);
function ka(n) {
  if (n == null || MA.indexOf(typeof n) >= 0 || typeof n.getAddress == "function")
    return n;
  if (Array.isArray(n))
    return n.map(ka);
  if (typeof n == "object")
    return Object.keys(n).reduce((t, e) => (t[e] = n[e], t), {});
  throw new Error(`should not happen: ${n} (${typeof n})`);
}
function HA(n) {
  return new Promise((t) => {
    setTimeout(t, n);
  });
}
function gs(n) {
  return n && n.toLowerCase();
}
function ff(n) {
  return n && typeof n.pollingInterval == "number";
}
const ng = {
  polling: !1,
  staticNetwork: null,
  batchStallTime: 10,
  batchMaxSize: 1 << 20,
  batchMaxCount: 100,
  cacheTimeout: 250,
  pollingInterval: 4e3
};
let Pc = class extends Xp {
  constructor(t, e) {
    super(t), S(this, "address"), e = ft(e), q(this, { address: e });
  }
  connect(t) {
    D(!1, "cannot reconnect JsonRpcSigner", "UNSUPPORTED_OPERATION", {
      operation: "signer.connect"
    });
  }
  async getAddress() {
    return this.address;
  }
  // JSON-RPC will automatially fill in nonce, etc. so we just check from
  async populateTransaction(t) {
    return await this.populateCall(t);
  }
  // Returns just the hash of the transaction after sent, which is what
  // the bare JSON-RPC API does;
  async sendUncheckedTransaction(t) {
    const e = ka(t), r = [];
    if (e.from) {
      const i = e.from;
      r.push((async () => {
        const o = await te(i, this.provider);
        B(o != null && o.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), e.from = o;
      })());
    } else
      e.from = this.address;
    if (e.gasLimit == null && r.push((async () => {
      e.gasLimit = await this.provider.estimateGas({ ...e, from: this.address });
    })()), e.to != null) {
      const i = e.to;
      r.push((async () => {
        e.to = await te(i, this.provider);
      })());
    }
    r.length && await Promise.all(r);
    const s = this.provider.getRpcTransaction(e);
    return this.provider.send("eth_sendTransaction", [s]);
  }
  async sendTransaction(t) {
    const e = await this.provider.getBlockNumber(), r = await this.sendUncheckedTransaction(t);
    return await new Promise((s, i) => {
      const o = [1e3, 100];
      let c = 0;
      const a = async () => {
        try {
          const l = await this.provider.getTransaction(r);
          if (l != null) {
            s(l.replaceableTransaction(e));
            return;
          }
        } catch (l) {
          if (zt(l, "CANCELLED") || zt(l, "BAD_DATA") || zt(l, "NETWORK_ERROR")) {
            l.info == null && (l.info = {}), l.info.sendTransactionHash = r, i(l);
            return;
          }
          if (zt(l, "INVALID_ARGUMENT") && (c++, l.info == null && (l.info = {}), l.info.sendTransactionHash = r, c > 10)) {
            i(l);
            return;
          }
          this.provider.emit("error", vt("failed to fetch transation after sending (will try again)", "UNKNOWN_ERROR", { error: l }));
        }
        this.provider._setTimeout(() => {
          a();
        }, o.pop() || 4e3);
      };
      a();
    });
  }
  async signTransaction(t) {
    const e = ka(t);
    if (e.from) {
      const s = await te(e.from, this.provider);
      B(s != null && s.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), e.from = s;
    } else
      e.from = this.address;
    const r = this.provider.getRpcTransaction(e);
    return await this.provider.send("eth_signTransaction", [r]);
  }
  async signMessage(t) {
    const e = typeof t == "string" ? Ve(t) : t;
    return await this.provider.send("personal_sign", [
      W(e),
      this.address.toLowerCase()
    ]);
  }
  async signTypedData(t, e, r) {
    const s = ka(r), i = await Fh.resolveNames(t, e, s, async (o) => {
      const c = await te(o);
      return B(c != null, "TypedData does not support null address", "value", o), c;
    });
    return await this.provider.send("eth_signTypedData_v4", [
      this.address.toLowerCase(),
      JSON.stringify(Fh.getPayload(i.domain, e, i.value))
    ]);
  }
  async unlock(t) {
    return this.provider.send("personal_unlockAccount", [
      this.address.toLowerCase(),
      t,
      null
    ]);
  }
  // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
  async _legacySignMessage(t) {
    const e = typeof t == "string" ? Ve(t) : t;
    return await this.provider.send("eth_sign", [
      this.address.toLowerCase(),
      W(e)
    ]);
  }
};
var Xs, po, ir, vn, Je, Re, le, Sa, Ml;
class _A extends kA {
  constructor(t, e) {
    super(t, e), C(this, Sa), C(this, Xs), C(this, po), C(this, ir), C(this, vn), C(this, Je), C(this, Re), C(this, le), A(this, po, 1), A(this, Xs, Object.assign({}, ng, e || {})), A(this, ir, []), A(this, vn, null), A(this, Re, null), A(this, le, null);
    {
      let s = null;
      const i = new Promise((o) => {
        s = o;
      });
      A(this, Je, { promise: i, resolve: s });
    }
    const r = this._getOption("staticNetwork");
    typeof r == "boolean" ? (B(!r || t !== "any", "staticNetwork cannot be used on special network 'any'", "options", e), r && t != null && A(this, Re, ar.from(t))) : r && (B(t == null || r.matches(t), "staticNetwork MUST match network object", "options", e), A(this, Re, r));
  }
  /**
   *  Returns the value associated with the option %%key%%.
   *
   *  Sub-classes can use this to inquire about configuration options.
   */
  _getOption(t) {
    return f(this, Xs)[t];
  }
  /**
   *  Gets the [[Network]] this provider has committed to. On each call, the network
   *  is detected, and if it has changed, the call will reject.
   */
  get _network() {
    return D(f(this, Re), "network is not available yet", "NETWORK_ERROR"), f(this, Re);
  }
  /**
   *  Resolves to the non-normalized value by performing %%req%%.
   *
   *  Sub-classes may override this to modify behavior of actions,
   *  and should generally call ``super._perform`` as a fallback.
   */
  async _perform(t) {
    if (t.method === "call" || t.method === "estimateGas") {
      let r = t.transaction;
      if (r && r.type != null && z(r.type) && r.maxFeePerGas == null && r.maxPriorityFeePerGas == null) {
        const s = await this.getFeeData();
        s.maxFeePerGas == null && s.maxPriorityFeePerGas == null && (t = Object.assign({}, t, {
          transaction: Object.assign({}, r, { type: void 0 })
        }));
      }
    }
    const e = this.getRpcRequest(t);
    return e != null ? await this.send(e.method, e.args) : super._perform(t);
  }
  /**
   *  Sub-classes may override this; it detects the *actual* network that
   *  we are **currently** connected to.
   *
   *  Keep in mind that [[send]] may only be used once [[ready]], otherwise the
   *  _send primitive must be used instead.
   */
  async _detectNetwork() {
    const t = this._getOption("staticNetwork");
    if (t)
      if (t === !0) {
        if (f(this, Re))
          return f(this, Re);
      } else
        return t;
    return f(this, le) ? await f(this, le) : this.ready ? (A(this, le, (async () => {
      try {
        const e = ar.from(z(await this.send("eth_chainId", [])));
        return A(this, le, null), e;
      } catch (e) {
        throw A(this, le, null), e;
      }
    })()), await f(this, le)) : (A(this, le, (async () => {
      const e = {
        id: Ca(this, po)._++,
        method: "eth_chainId",
        params: [],
        jsonrpc: "2.0"
      };
      this.emit("debug", { action: "sendRpcPayload", payload: e });
      let r;
      try {
        r = (await this._send(e))[0], A(this, le, null);
      } catch (s) {
        throw A(this, le, null), this.emit("debug", { action: "receiveRpcError", error: s }), s;
      }
      if (this.emit("debug", { action: "receiveRpcResult", result: r }), "result" in r)
        return ar.from(z(r.result));
      throw this.getRpcError(e, r);
    })()), await f(this, le));
  }
  /**
   *  Sub-classes **MUST** call this. Until [[_start]] has been called, no calls
   *  will be passed to [[_send]] from [[send]]. If it is overridden, then
   *  ``super._start()`` **MUST** be called.
   *
   *  Calling it multiple times is safe and has no effect.
   */
  _start() {
    f(this, Je) == null || f(this, Je).resolve == null || (f(this, Je).resolve(), A(this, Je, null), (async () => {
      for (; f(this, Re) == null && !this.destroyed; )
        try {
          A(this, Re, await this._detectNetwork());
        } catch (t) {
          if (this.destroyed)
            break;
          console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"), this.emit("error", vt("failed to bootstrap network detection", "NETWORK_ERROR", { event: "initial-network-discovery", info: { error: t } })), await HA(1e3);
        }
      F(this, Sa, Ml).call(this);
    })());
  }
  /**
   *  Resolves once the [[_start]] has been called. This can be used in
   *  sub-classes to defer sending data until the connection has been
   *  established.
   */
  async _waitUntilReady() {
    if (f(this, Je) != null)
      return await f(this, Je).promise;
  }
  /**
   *  Return a Subscriber that will manage the %%sub%%.
   *
   *  Sub-classes may override this to modify the behavior of
   *  subscription management.
   */
  _getSubscriber(t) {
    return t.type === "pending" ? new FA(this) : t.type === "event" ? this._getOption("polling") ? new Nu(this, t.filter) : new DA(this, t.filter) : t.type === "orphan" && t.filter.orphan === "drop-log" ? new Yp("orphan") : super._getSubscriber(t);
  }
  /**
   *  Returns true only if the [[_start]] has been called.
   */
  get ready() {
    return f(this, Je) == null;
  }
  /**
   *  Returns %%tx%% as a normalized JSON-RPC transaction request,
   *  which has all values hexlified and any numeric values converted
   *  to Quantity values.
   */
  getRpcTransaction(t) {
    const e = {};
    return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach((r) => {
      if (t[r] == null)
        return;
      let s = r;
      r === "gasLimit" && (s = "gas"), e[s] = Hs(z(t[r], `tx.${r}`));
    }), ["from", "to", "data"].forEach((r) => {
      t[r] != null && (e[r] = W(t[r]));
    }), t.accessList && (e.accessList = fs(t.accessList)), t.blobVersionedHashes && (e.blobVersionedHashes = t.blobVersionedHashes.map((r) => r.toLowerCase())), e;
  }
  /**
   *  Returns the request method and arguments required to perform
   *  %%req%%.
   */
  getRpcRequest(t) {
    switch (t.method) {
      case "chainId":
        return { method: "eth_chainId", args: [] };
      case "getBlockNumber":
        return { method: "eth_blockNumber", args: [] };
      case "getGasPrice":
        return { method: "eth_gasPrice", args: [] };
      case "getPriorityFee":
        return { method: "eth_maxPriorityFeePerGas", args: [] };
      case "getBalance":
        return {
          method: "eth_getBalance",
          args: [gs(t.address), t.blockTag]
        };
      case "getTransactionCount":
        return {
          method: "eth_getTransactionCount",
          args: [gs(t.address), t.blockTag]
        };
      case "getCode":
        return {
          method: "eth_getCode",
          args: [gs(t.address), t.blockTag]
        };
      case "getStorage":
        return {
          method: "eth_getStorageAt",
          args: [
            gs(t.address),
            "0x" + t.position.toString(16),
            t.blockTag
          ]
        };
      case "broadcastTransaction":
        return {
          method: "eth_sendRawTransaction",
          args: [t.signedTransaction]
        };
      case "getBlock":
        if ("blockTag" in t)
          return {
            method: "eth_getBlockByNumber",
            args: [t.blockTag, !!t.includeTransactions]
          };
        if ("blockHash" in t)
          return {
            method: "eth_getBlockByHash",
            args: [t.blockHash, !!t.includeTransactions]
          };
        break;
      case "getTransaction":
        return {
          method: "eth_getTransactionByHash",
          args: [t.hash]
        };
      case "getTransactionReceipt":
        return {
          method: "eth_getTransactionReceipt",
          args: [t.hash]
        };
      case "call":
        return {
          method: "eth_call",
          args: [this.getRpcTransaction(t.transaction), t.blockTag]
        };
      case "estimateGas":
        return {
          method: "eth_estimateGas",
          args: [this.getRpcTransaction(t.transaction)]
        };
      case "getLogs":
        return t.filter && t.filter.address != null && (Array.isArray(t.filter.address) ? t.filter.address = t.filter.address.map(gs) : t.filter.address = gs(t.filter.address)), { method: "eth_getLogs", args: [t.filter] };
    }
    return null;
  }
  /**
   *  Returns an ethers-style Error for the given JSON-RPC error
   *  %%payload%%, coalescing the various strings and error shapes
   *  that different nodes return, coercing them into a machine-readable
   *  standardized error.
   */
  getRpcError(t, e) {
    const { method: r } = t, { error: s } = e;
    if (r === "eth_estimateGas" && s.message) {
      const c = s.message;
      if (!c.match(/revert/i) && c.match(/insufficient funds/i))
        return vt("insufficient funds", "INSUFFICIENT_FUNDS", {
          transaction: t.params[0],
          info: { payload: t, error: s }
        });
    }
    if (r === "eth_call" || r === "eth_estimateGas") {
      const c = Hl(s), a = Co.getBuiltinCallException(r === "eth_call" ? "call" : "estimateGas", t.params[0], c ? c.data : null);
      return a.info = { error: s, payload: t }, a;
    }
    const i = JSON.stringify(VA(s));
    if (typeof s.message == "string" && s.message.match(/user denied|ethers-user-denied/i))
      return vt("user rejected action", "ACTION_REJECTED", {
        action: {
          eth_sign: "signMessage",
          personal_sign: "signMessage",
          eth_signTypedData_v4: "signTypedData",
          eth_signTransaction: "signTransaction",
          eth_sendTransaction: "sendTransaction",
          eth_requestAccounts: "requestAccess",
          wallet_requestAccounts: "requestAccess"
        }[r] || "unknown",
        reason: "rejected",
        info: { payload: t, error: s }
      });
    if (r === "eth_sendRawTransaction" || r === "eth_sendTransaction") {
      const c = t.params[0];
      if (i.match(/insufficient funds|base fee exceeds gas limit/i))
        return vt("insufficient funds for intrinsic transaction cost", "INSUFFICIENT_FUNDS", {
          transaction: c,
          info: { error: s }
        });
      if (i.match(/nonce/i) && i.match(/too low/i))
        return vt("nonce has already been used", "NONCE_EXPIRED", { transaction: c, info: { error: s } });
      if (i.match(/replacement transaction/i) && i.match(/underpriced/i))
        return vt("replacement fee too low", "REPLACEMENT_UNDERPRICED", { transaction: c, info: { error: s } });
      if (i.match(/only replay-protected/i))
        return vt("legacy pre-eip-155 transactions not supported", "UNSUPPORTED_OPERATION", {
          operation: r,
          info: { transaction: c, info: { error: s } }
        });
    }
    let o = !!i.match(/the method .* does not exist/i);
    return o || s && s.details && s.details.startsWith("Unauthorized method:") && (o = !0), o ? vt("unsupported operation", "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: { error: s, payload: t }
    }) : vt("could not coalesce error", "UNKNOWN_ERROR", { error: s, payload: t });
  }
  /**
   *  Requests the %%method%% with %%params%% via the JSON-RPC protocol
   *  over the underlying channel. This can be used to call methods
   *  on the backend that do not have a high-level API within the Provider
   *  API.
   *
   *  This method queues requests according to the batch constraints
   *  in the options, assigns the request a unique ID.
   *
   *  **Do NOT override** this method in sub-classes; instead
   *  override [[_send]] or force the options values in the
   *  call to the constructor to modify this method's behavior.
   */
  send(t, e) {
    if (this.destroyed)
      return Promise.reject(vt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t }));
    const r = Ca(this, po)._++, s = new Promise((i, o) => {
      f(this, ir).push({
        resolve: i,
        reject: o,
        payload: { method: t, params: e, id: r, jsonrpc: "2.0" }
      });
    });
    return F(this, Sa, Ml).call(this), s;
  }
  /**
   *  Resolves to the [[Signer]] account for  %%address%% managed by
   *  the client.
   *
   *  If the %%address%% is a number, it is used as an index in the
   *  the accounts from [[listAccounts]].
   *
   *  This can only be used on clients which manage accounts (such as
   *  Geth with imported account or MetaMask).
   *
   *  Throws if the account doesn't exist.
   */
  async getSigner(t) {
    t == null && (t = 0);
    const e = this.send("eth_accounts", []);
    if (typeof t == "number") {
      const s = await e;
      if (t >= s.length)
        throw new Error("no such account");
      return new Pc(this, s[t]);
    }
    const { accounts: r } = await Zt({
      network: this.getNetwork(),
      accounts: e
    });
    t = ft(t);
    for (const s of r)
      if (ft(s) === t)
        return new Pc(this, t);
    throw new Error("invalid account");
  }
  async listAccounts() {
    return (await this.send("eth_accounts", [])).map((t) => new Pc(this, t));
  }
  destroy() {
    f(this, vn) && (clearTimeout(f(this, vn)), A(this, vn, null));
    for (const { payload: t, reject: e } of f(this, ir))
      e(vt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t.method }));
    A(this, ir, []), super.destroy();
  }
}
Xs = /* @__PURE__ */ new WeakMap(), po = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), vn = /* @__PURE__ */ new WeakMap(), Je = /* @__PURE__ */ new WeakMap(), Re = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakSet(), Ml = function() {
  if (f(this, vn))
    return;
  const n = this._getOption("batchMaxCount") === 1 ? 0 : this._getOption("batchStallTime");
  A(this, vn, setTimeout(() => {
    A(this, vn, null);
    const t = f(this, ir);
    for (A(this, ir, []); t.length; ) {
      const e = [t.shift()];
      for (; t.length && e.length !== f(this, Xs).batchMaxCount; )
        if (e.push(t.shift()), JSON.stringify(e.map((r) => r.payload)).length > f(this, Xs).batchMaxSize) {
          t.unshift(e.pop());
          break;
        }
      (async () => {
        const r = e.length === 1 ? e[0].payload : e.map((s) => s.payload);
        this.emit("debug", { action: "sendRpcPayload", payload: r });
        try {
          const s = await this._send(r);
          this.emit("debug", { action: "receiveRpcResult", result: s });
          for (const { resolve: i, reject: o, payload: c } of e) {
            if (this.destroyed) {
              o(vt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: c.method }));
              continue;
            }
            const a = s.filter((l) => l.id === c.id)[0];
            if (a == null) {
              const l = vt("missing response for request", "BAD_DATA", {
                value: s,
                info: { payload: c }
              });
              this.emit("error", l), o(l);
              continue;
            }
            if ("error" in a) {
              o(this.getRpcError(c, a));
              continue;
            }
            i(a.result);
          }
        } catch (s) {
          this.emit("debug", { action: "receiveRpcError", error: s });
          for (const { reject: i } of e)
            i(s);
        }
      })();
    }
  }, n));
};
var kr;
class GA extends _A {
  constructor(t, e) {
    super(t, e), C(this, kr);
    let r = this._getOption("pollingInterval");
    r == null && (r = ng.pollingInterval), A(this, kr, r);
  }
  _getSubscriber(t) {
    const e = super._getSubscriber(t);
    return ff(e) && (e.pollingInterval = f(this, kr)), e;
  }
  /**
   *  The polling interval (default: 4000 ms)
   */
  get pollingInterval() {
    return f(this, kr);
  }
  set pollingInterval(t) {
    if (!Number.isInteger(t) || t < 0)
      throw new Error("invalid interval");
    A(this, kr, t), this._forEachSubscriber((e) => {
      ff(e) && (e.pollingInterval = f(this, kr));
    });
  }
}
kr = /* @__PURE__ */ new WeakMap();
var go;
let Uc = class extends GA {
  constructor(t, e, r) {
    t == null && (t = "http://localhost:8545"), super(e, r), C(this, go), typeof t == "string" ? A(this, go, new ns(t)) : A(this, go, t.clone());
  }
  _getConnection() {
    return f(this, go).clone();
  }
  async send(t, e) {
    return await this._start(), await super.send(t, e);
  }
  async _send(t) {
    const e = this._getConnection();
    e.body = JSON.stringify(t), e.setHeader("content-type", "application/json");
    const r = await e.send();
    r.assertOk();
    let s = r.bodyJson;
    return Array.isArray(s) || (s = [s]), s;
  }
};
go = /* @__PURE__ */ new WeakMap();
function Hl(n) {
  if (n == null)
    return null;
  if (typeof n.message == "string" && n.message.match(/revert/i) && gt(n.data))
    return { message: n.message, data: n.data };
  if (typeof n == "object") {
    for (const t in n) {
      const e = Hl(n[t]);
      if (e)
        return e;
    }
    return null;
  }
  if (typeof n == "string")
    try {
      return Hl(JSON.parse(n));
    } catch {
    }
  return null;
}
function _l(n, t) {
  if (n != null) {
    if (typeof n.message == "string" && t.push(n.message), typeof n == "object")
      for (const e in n)
        _l(n[e], t);
    if (typeof n == "string")
      try {
        return _l(JSON.parse(n), t);
      } catch {
      }
  }
}
function VA(n) {
  const t = [];
  return _l(n, t), t;
}
const rg = [
  "constructor()",
  "error DER_Split_Error()",
  "error expmod_Error()",
  "error k256Decompress_Invalid_Length_Error()",
  "error k256DeriveY_Invalid_Prefix_Error()",
  "error recoverV_Error()",
  "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword) args)",
  "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)",
  "function encryptedTx(bytes32 nonce, bytes ciphertext)",
  "function gaspayingAddress() view returns (address)",
  // 'function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice) view returns (bytes out_data)',
  "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)",
  "function getAccount(bytes32 in_username) view returns (address account, address keypairAddress)",
  "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)",
  "function manageCredentialPassword((bytes32 digest, bytes data) args)",
  "function personalization() view returns (bytes32)",
  "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, bytes in_data) view returns (bytes out_data)",
  "function proxyViewPassword(bytes32 in_hashedUsername, bytes32 in_digest, bytes in_data) view returns (bytes out_data)",
  "function salt() view returns (bytes32)",
  "function userExists(bytes32 in_username) view returns (bool)"
], $A = [
  "constructor()",
  "error DER_Split_Error()",
  "error expmod_Error()",
  "error k256Decompress_Invalid_Length_Error()",
  "error k256DeriveY_Invalid_Prefix_Error()",
  "error recoverV_Error()",
  "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword) args)",
  "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)",
  "function encryptedTx(bytes32 nonce, bytes ciphertext)",
  "function gaspayingAddress() view returns (address)",
  "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice) view returns (bytes out_data)",
  "function getAccount(bytes32 in_username) view returns (address account, address keypairAddress)",
  "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)",
  "function manageCredentialPassword((bytes32 digest, bytes data) args)",
  "function personalization() view returns (bytes32)",
  "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, bytes in_data) view returns (bytes out_data)",
  "function proxyViewPassword(bytes32 in_hashedUsername, bytes32 in_digest, bytes in_data) view returns (bytes out_data)",
  "function salt() view returns (bytes32)",
  "function userExists(bytes32 in_username) view returns (bool)"
], na = [
  "constructor()",
  "error DER_Split_Error()",
  "error expmod_Error()",
  "error k256Decompress_Invalid_Length_Error()",
  "error k256DeriveY_Invalid_Prefix_Error()",
  "error recoverV_Error()",
  "function call(address in_contract, bytes in_data) returns (bytes out_data)",
  "function init(address starterOwner)",
  "function isController(address who) view returns (bool)",
  "function keypairAddress() view returns (address)",
  "function modifyController(address who, bool status)",
  "function sign(bytes32 digest) view returns ((bytes32 r, bytes32 s, uint256 v))",
  "function signEIP155((uint64 nonce, uint256 gasPrice, uint64 gasLimit, address to, uint256 value, bytes data, uint256 chainId) txToSign) view returns (bytes)",
  "function staticcall(address in_contract, bytes in_data) view returns (bytes out_data)",
  "function transfer(address in_target, uint256 amount)"
], Ds = [
  {
    inputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "symbol", type: "string" },
      { internalType: "address", name: "_receiver", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "owner", type: "address" },
      { indexed: !0, internalType: "address", name: "spender", type: "address" },
      { indexed: !1, internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, internalType: "address", name: "from", type: "address" },
      { indexed: !0, internalType: "address", name: "to", type: "address" },
      { indexed: !1, internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" }
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" }
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function"
  }
];
function df(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function jA(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function lc(n, ...t) {
  if (!jA(n))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${n.length}`);
}
function WA(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  df(n.outputLen), df(n.blockLen);
}
function ja(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function zA(n, t) {
  lc(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const Lc = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Dc = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), We = (n, t) => n << 32 - t | n >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function QA(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Bu(n) {
  return typeof n == "string" && (n = QA(n)), lc(n), n;
}
function qA(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    lc(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
class sg {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function KA(n) {
  const t = (r) => n().update(Bu(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function JA(n = 32) {
  if (Lc && typeof Lc.getRandomValues == "function")
    return Lc.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
function ZA(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), c = Number(e & i), a = r ? 4 : 0, l = r ? 0 : 4;
  n.setUint32(t + a, o, r), n.setUint32(t + l, c, r);
}
const YA = (n, t, e) => n & t ^ ~n & e, XA = (n, t, e) => n & t ^ n & e ^ t & e;
class t1 extends sg {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Dc(this.buffer);
  }
  update(t) {
    ja(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Bu(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const a = Dc(t);
        for (; s <= i - o; o += s)
          this.process(a, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    ja(this), zA(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let u = o; u < s; u++)
      e[u] = 0;
    ZA(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Dc(t), a = this.outputLen;
    if (a % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = a / 4, h = this.get();
    if (l > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++)
      c.setUint32(4 * u, h[u], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return t.length = s, t.pos = c, t.finished = i, t.destroyed = o, s % e && t.buffer.set(r), t;
  }
}
const e1 = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), Fn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Mn = /* @__PURE__ */ new Uint32Array(64);
class n1 extends t1 {
  constructor() {
    super(64, 32, 8, !1), this.A = Fn[0] | 0, this.B = Fn[1] | 0, this.C = Fn[2] | 0, this.D = Fn[3] | 0, this.E = Fn[4] | 0, this.F = Fn[5] | 0, this.G = Fn[6] | 0, this.H = Fn[7] | 0;
  }
  get() {
    const { A: t, B: e, C: r, D: s, E: i, F: o, G: c, H: a } = this;
    return [t, e, r, s, i, o, c, a];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, c, a) {
    this.A = t | 0, this.B = e | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = a | 0;
  }
  process(t, e) {
    for (let u = 0; u < 16; u++, e += 4)
      Mn[u] = t.getUint32(e, !1);
    for (let u = 16; u < 64; u++) {
      const p = Mn[u - 15], b = Mn[u - 2], y = We(p, 7) ^ We(p, 18) ^ p >>> 3, d = We(b, 17) ^ We(b, 19) ^ b >>> 10;
      Mn[u] = d + Mn[u - 7] + y + Mn[u - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: a, G: l, H: h } = this;
    for (let u = 0; u < 64; u++) {
      const p = We(c, 6) ^ We(c, 11) ^ We(c, 25), b = h + p + YA(c, a, l) + e1[u] + Mn[u] | 0, y = (We(r, 2) ^ We(r, 13) ^ We(r, 22)) + XA(r, s, i) | 0;
      h = l, l = a, a = c, c = o + b | 0, o = i, i = s, s = r, r = b + y | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, a = a + this.F | 0, l = l + this.G | 0, h = h + this.H | 0, this.set(r, s, i, o, c, a, l, h);
  }
  roundClean() {
    Mn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const r1 = /* @__PURE__ */ KA(() => new n1());
let ig = class extends sg {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, WA(t);
    const r = Bu(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(r.length > s ? t.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return ja(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ja(this), lc(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = c, t.oHash = e._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const og = (n, t, e) => new ig(n, t).update(e).digest();
og.create = (n, t) => new ig(n, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ag = /* @__PURE__ */ BigInt(0), uc = /* @__PURE__ */ BigInt(1), s1 = /* @__PURE__ */ BigInt(2);
function ls(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function Vo(n) {
  if (!ls(n))
    throw new Error("Uint8Array expected");
}
const i1 = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function us(n) {
  Vo(n);
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += i1[n[e]];
  return t;
}
function cg(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Ou(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
const ln = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function pf(n) {
  if (n >= ln._0 && n <= ln._9)
    return n - ln._0;
  if (n >= ln._A && n <= ln._F)
    return n - (ln._A - 10);
  if (n >= ln._a && n <= ln._f)
    return n - (ln._a - 10);
}
function li(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length, e = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const o = pf(n.charCodeAt(i)), c = pf(n.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const a = n[i] + n[i + 1];
      throw new Error('hex string expected, got non-hex character "' + a + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function Yr(n) {
  return Ou(us(n));
}
function ku(n) {
  return Vo(n), Ou(us(Uint8Array.from(n).reverse()));
}
function ui(n, t) {
  return li(n.toString(16).padStart(t * 2, "0"));
}
function Su(n, t) {
  return ui(n, t).reverse();
}
function o1(n) {
  return li(cg(n));
}
function Ue(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = li(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (ls(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function Po(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    Vo(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
function a1(n, t) {
  if (n.length !== t.length)
    return !1;
  let e = 0;
  for (let r = 0; r < n.length; r++)
    e |= n[r] ^ t[r];
  return e === 0;
}
function c1(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function l1(n) {
  let t;
  for (t = 0; n > ag; n >>= uc, t += 1)
    ;
  return t;
}
function u1(n, t) {
  return n >> BigInt(t) & uc;
}
function h1(n, t, e) {
  return n | (e ? uc : ag) << BigInt(t);
}
const Tu = (n) => (s1 << BigInt(n - 1)) - uc, Fc = (n) => new Uint8Array(n), gf = (n) => Uint8Array.from(n);
function lg(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = Fc(n), s = Fc(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...h) => e(s, r, ...h), a = (h = Fc()) => {
    s = c(gf([0]), h), r = c(), h.length !== 0 && (s = c(gf([1]), h), r = c());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const u = [];
    for (; h < t; ) {
      r = c();
      const p = r.slice();
      u.push(p), h += r.length;
    }
    return Po(...u);
  };
  return (h, u) => {
    o(), a(h);
    let p;
    for (; !(p = u(l())); )
      a();
    return o(), p;
  };
}
const f1 = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || ls(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function $o(n, t, e = {}) {
  const r = (s, i, o) => {
    const c = f1[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const a = n[s];
    if (!(o && a === void 0) && !c(a, n))
      throw new Error(`Invalid param ${String(s)}=${a} (${typeof a}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const d1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: Vo,
  bitGet: u1,
  bitLen: l1,
  bitMask: Tu,
  bitSet: h1,
  bytesToHex: us,
  bytesToNumberBE: Yr,
  bytesToNumberLE: ku,
  concatBytes: Po,
  createHmacDrbg: lg,
  ensureBytes: Ue,
  equalBytes: a1,
  hexToBytes: li,
  hexToNumber: Ou,
  isBytes: ls,
  numberToBytesBE: ui,
  numberToBytesLE: Su,
  numberToHexUnpadded: cg,
  numberToVarBytesBE: o1,
  utf8ToBytes: c1,
  validateObject: $o
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Vt = BigInt(0), kt = BigInt(1), Lr = BigInt(2), p1 = BigInt(3), Gl = BigInt(4), yf = BigInt(5), mf = BigInt(8);
BigInt(9);
BigInt(16);
function Ie(n, t) {
  const e = n % t;
  return e >= Vt ? e : t + e;
}
function g1(n, t, e) {
  if (e <= Vt || t < Vt)
    throw new Error("Expected power/modulo > 0");
  if (e === kt)
    return Vt;
  let r = kt;
  for (; t > Vt; )
    t & kt && (r = r * n % e), n = n * n % e, t >>= kt;
  return r;
}
function Vl(n, t) {
  if (n === Vt || t <= Vt)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = Ie(n, t), r = t, s = Vt, i = kt;
  for (; e !== Vt; ) {
    const o = r / e, c = r % e, a = s - i * o;
    r = e, e = c, s = i, i = a;
  }
  if (r !== kt)
    throw new Error("invert: does not exist");
  return Ie(s, t);
}
function y1(n) {
  const t = (n - kt) / Lr;
  let e, r, s;
  for (e = n - kt, r = 0; e % Lr === Vt; e /= Lr, r++)
    ;
  for (s = Lr; s < n && g1(s, t, n) !== n - kt; s++)
    ;
  if (r === 1) {
    const o = (n + kt) / Gl;
    return function(c, a) {
      const l = c.pow(a, o);
      if (!c.eql(c.sqr(l), a))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (e + kt) / Lr;
  return function(o, c) {
    if (o.pow(c, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let a = r, l = o.pow(o.mul(o.ONE, s), e), h = o.pow(c, i), u = o.pow(c, e);
    for (; !o.eql(u, o.ONE); ) {
      if (o.eql(u, o.ZERO))
        return o.ZERO;
      let p = 1;
      for (let y = o.sqr(u); p < a && !o.eql(y, o.ONE); p++)
        y = o.sqr(y);
      const b = o.pow(l, kt << BigInt(a - p - 1));
      l = o.sqr(b), h = o.mul(h, b), u = o.mul(u, l), a = p;
    }
    return h;
  };
}
function m1(n) {
  if (n % Gl === p1) {
    const t = (n + kt) / Gl;
    return function(e, r) {
      const s = e.pow(r, t);
      if (!e.eql(e.sqr(s), r))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (n % mf === yf) {
    const t = (n - yf) / mf;
    return function(e, r) {
      const s = e.mul(r, Lr), i = e.pow(s, t), o = e.mul(r, i), c = e.mul(e.mul(o, Lr), i), a = e.mul(o, e.sub(c, e.ONE));
      if (!e.eql(e.sqr(a), r))
        throw new Error("Cannot find square root");
      return a;
    };
  }
  return y1(n);
}
const w1 = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function b1(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = w1.reduce((r, s) => (r[s] = "function", r), t);
  return $o(n, e);
}
function A1(n, t, e) {
  if (e < Vt)
    throw new Error("Expected power > 0");
  if (e === Vt)
    return n.ONE;
  if (e === kt)
    return t;
  let r = n.ONE, s = t;
  for (; e > Vt; )
    e & kt && (r = n.mul(r, s)), s = n.sqr(s), e >>= kt;
  return r;
}
function E1(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, c) => n.is0(o) ? i : (e[c] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, c) => n.is0(o) ? i : (e[c] = n.mul(i, e[c]), n.mul(i, o)), s), e;
}
function ug(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function v1(n, t, e = !1, r = {}) {
  if (n <= Vt)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = ug(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = m1(n), c = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: Tu(s),
    ZERO: Vt,
    ONE: kt,
    create: (a) => Ie(a, n),
    isValid: (a) => {
      if (typeof a != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof a}`);
      return Vt <= a && a < n;
    },
    is0: (a) => a === Vt,
    isOdd: (a) => (a & kt) === kt,
    neg: (a) => Ie(-a, n),
    eql: (a, l) => a === l,
    sqr: (a) => Ie(a * a, n),
    add: (a, l) => Ie(a + l, n),
    sub: (a, l) => Ie(a - l, n),
    mul: (a, l) => Ie(a * l, n),
    pow: (a, l) => A1(c, a, l),
    div: (a, l) => Ie(a * Vl(l, n), n),
    // Same as above, but doesn't normalize
    sqrN: (a) => a * a,
    addN: (a, l) => a + l,
    subN: (a, l) => a - l,
    mulN: (a, l) => a * l,
    inv: (a) => Vl(a, n),
    sqrt: r.sqrt || ((a) => o(c, a)),
    invertBatch: (a) => E1(c, a),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, l, h) => h ? l : a,
    toBytes: (a) => e ? Su(a, i) : ui(a, i),
    fromBytes: (a) => {
      if (a.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${a.length}`);
      return e ? ku(a) : Yr(a);
    }
  });
  return Object.freeze(c);
}
function hg(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function fg(n) {
  const t = hg(n);
  return t + Math.ceil(t / 2);
}
function x1(n, t, e = !1) {
  const r = n.length, s = hg(t), i = fg(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? Yr(n) : ku(n), c = Ie(o, t - kt) + kt;
  return e ? Su(c, s) : ui(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const I1 = BigInt(0), Mc = BigInt(1);
function N1(n, t) {
  const e = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, r = (s) => {
    const i = Math.ceil(t / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = n.ZERO, c = s;
      for (; i > I1; )
        i & Mc && (o = o.add(c)), c = c.double(), i >>= Mc;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(s, i) {
      const { windows: o, windowSize: c } = r(i), a = [];
      let l = s, h = l;
      for (let u = 0; u < o; u++) {
        h = l, a.push(h);
        for (let p = 1; p < c; p++)
          h = h.add(l), a.push(h);
        l = h.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: c, windowSize: a } = r(s);
      let l = n.ZERO, h = n.BASE;
      const u = BigInt(2 ** s - 1), p = 2 ** s, b = BigInt(s);
      for (let y = 0; y < c; y++) {
        const d = y * a;
        let g = Number(o & u);
        o >>= b, g > a && (g -= p, o += Mc);
        const w = d, I = d + Math.abs(g) - 1, v = y % 2 !== 0, T = g < 0;
        g === 0 ? h = h.add(e(v, i[w])) : l = l.add(e(T, i[I]));
      }
      return { p: l, f: h };
    },
    wNAFCached(s, i, o, c) {
      const a = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, a), a !== 1 && i.set(s, c(l))), this.wNAF(a, l, o);
    }
  };
}
function dg(n) {
  return b1(n.Fp), $o(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...ug(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function B1(n) {
  const t = dg(n);
  $o(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: r, a: s } = t;
  if (e) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: O1, hexToBytes: k1 } = d1, Wr = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(n = "") {
      super(n);
    }
  },
  _parseInt(n) {
    const { Err: t } = Wr;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: O1(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = Wr, e = typeof n == "string" ? k1(n) : n;
    Vo(e);
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Wr._parseInt(e.subarray(2)), { d: o, l: c } = Wr._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const h = l.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, c = e(i), a = e(o);
    return `30${e(o + i + 4)}02${a}${s}02${c}${r}`;
  }
}, xn = BigInt(0), Ee = BigInt(1);
BigInt(2);
const wf = BigInt(3);
BigInt(4);
function S1(n) {
  const t = B1(n), { Fp: e } = t, r = t.toBytes || ((y, d, g) => {
    const w = d.toAffine();
    return Po(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((y) => {
    const d = y.subarray(1), g = e.fromBytes(d.subarray(0, e.BYTES)), w = e.fromBytes(d.subarray(e.BYTES, 2 * e.BYTES));
    return { x: g, y: w };
  });
  function i(y) {
    const { a: d, b: g } = t, w = e.sqr(y), I = e.mul(w, y);
    return e.add(e.add(I, e.mul(y, d)), g);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(y) {
    return typeof y == "bigint" && xn < y && y < t.n;
  }
  function c(y) {
    if (!o(y))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function a(y) {
    const { allowedPrivateKeyLengths: d, nByteLength: g, wrapPrivateKey: w, n: I } = t;
    if (d && typeof y != "bigint") {
      if (ls(y) && (y = us(y)), typeof y != "string" || !d.includes(y.length))
        throw new Error("Invalid key");
      y = y.padStart(g * 2, "0");
    }
    let v;
    try {
      v = typeof y == "bigint" ? y : Yr(Ue("private key", y, g));
    } catch {
      throw new Error(`private key must be ${g} bytes, hex or bigint, not ${typeof y}`);
    }
    return w && (v = Ie(v, I)), c(v), v;
  }
  const l = /* @__PURE__ */ new Map();
  function h(y) {
    if (!(y instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  class u {
    constructor(d, g, w) {
      if (this.px = d, this.py = g, this.pz = w, d == null || !e.isValid(d))
        throw new Error("x required");
      if (g == null || !e.isValid(g))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(d) {
      const { x: g, y: w } = d || {};
      if (!d || !e.isValid(g) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (d instanceof u)
        throw new Error("projective point not allowed");
      const I = (v) => e.eql(v, e.ZERO);
      return I(g) && I(w) ? u.ZERO : new u(g, w, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(d) {
      const g = e.invertBatch(d.map((w) => w.pz));
      return d.map((w, I) => w.toAffine(g[I])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(d) {
      const g = u.fromAffine(s(Ue("pointHex", d)));
      return g.assertValidity(), g;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(d) {
      return u.BASE.multiply(a(d));
    }
    // "Private method", don't use it directly
    _setWindowSize(d) {
      this._WINDOW_SIZE = d, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: d, y: g } = this.toAffine();
      if (!e.isValid(d) || !e.isValid(g))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(g), I = i(d);
      if (!e.eql(w, I))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: d } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d, x = e.eql(e.mul(g, k), e.mul(v, I)), N = e.eql(e.mul(w, k), e.mul(T, I));
      return x && N;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new u(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: d, b: g } = t, w = e.mul(g, wf), { px: I, py: v, pz: T } = this;
      let k = e.ZERO, x = e.ZERO, N = e.ZERO, O = e.mul(I, I), _ = e.mul(v, v), U = e.mul(T, T), P = e.mul(I, v);
      return P = e.add(P, P), N = e.mul(I, T), N = e.add(N, N), k = e.mul(d, N), x = e.mul(w, U), x = e.add(k, x), k = e.sub(_, x), x = e.add(_, x), x = e.mul(k, x), k = e.mul(P, k), N = e.mul(w, N), U = e.mul(d, U), P = e.sub(O, U), P = e.mul(d, P), P = e.add(P, N), N = e.add(O, O), O = e.add(N, O), O = e.add(O, U), O = e.mul(O, P), x = e.add(x, O), U = e.mul(v, T), U = e.add(U, U), O = e.mul(U, P), k = e.sub(k, O), N = e.mul(U, _), N = e.add(N, N), N = e.add(N, N), new u(k, x, N);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d;
      let x = e.ZERO, N = e.ZERO, O = e.ZERO;
      const _ = t.a, U = e.mul(t.b, wf);
      let P = e.mul(g, v), V = e.mul(w, T), $ = e.mul(I, k), rt = e.add(g, w), m = e.add(v, T);
      rt = e.mul(rt, m), m = e.add(P, V), rt = e.sub(rt, m), m = e.add(g, I);
      let E = e.add(v, k);
      return m = e.mul(m, E), E = e.add(P, $), m = e.sub(m, E), E = e.add(w, I), x = e.add(T, k), E = e.mul(E, x), x = e.add(V, $), E = e.sub(E, x), O = e.mul(_, m), x = e.mul(U, $), O = e.add(x, O), x = e.sub(V, O), O = e.add(V, O), N = e.mul(x, O), V = e.add(P, P), V = e.add(V, P), $ = e.mul(_, $), m = e.mul(U, m), V = e.add(V, $), $ = e.sub(P, $), $ = e.mul(_, $), m = e.add(m, $), P = e.mul(V, m), N = e.add(N, P), P = e.mul(E, m), x = e.mul(rt, x), x = e.sub(x, P), P = e.mul(rt, V), O = e.mul(E, O), O = e.add(O, P), new u(x, N, O);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(d) {
      return b.wNAFCached(this, l, d, (g) => {
        const w = e.invertBatch(g.map((I) => I.pz));
        return g.map((I, v) => I.toAffine(w[v])).map(u.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(d) {
      const g = u.ZERO;
      if (d === xn)
        return g;
      if (c(d), d === Ee)
        return this;
      const { endo: w } = t;
      if (!w)
        return b.unsafeLadder(this, d);
      let { k1neg: I, k1: v, k2neg: T, k2: k } = w.splitScalar(d), x = g, N = g, O = this;
      for (; v > xn || k > xn; )
        v & Ee && (x = x.add(O)), k & Ee && (N = N.add(O)), O = O.double(), v >>= Ee, k >>= Ee;
      return I && (x = x.negate()), T && (N = N.negate()), N = new u(e.mul(N.px, w.beta), N.py, N.pz), x.add(N);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(d) {
      c(d);
      let g = d, w, I;
      const { endo: v } = t;
      if (v) {
        const { k1neg: T, k1: k, k2neg: x, k2: N } = v.splitScalar(g);
        let { p: O, f: _ } = this.wNAF(k), { p: U, f: P } = this.wNAF(N);
        O = b.constTimeNegate(T, O), U = b.constTimeNegate(x, U), U = new u(e.mul(U.px, v.beta), U.py, U.pz), w = O.add(U), I = _.add(P);
      } else {
        const { p: T, f: k } = this.wNAF(g);
        w = T, I = k;
      }
      return u.normalizeZ([w, I])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(d, g, w) {
      const I = u.BASE, v = (k, x) => x === xn || x === Ee || !k.equals(I) ? k.multiplyUnsafe(x) : k.multiply(x), T = v(this, g).add(v(d, w));
      return T.is0() ? void 0 : T;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(d) {
      const { px: g, py: w, pz: I } = this, v = this.is0();
      d == null && (d = v ? e.ONE : e.inv(I));
      const T = e.mul(g, d), k = e.mul(w, d), x = e.mul(I, d);
      if (v)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(x, e.ONE))
        throw new Error("invZ was invalid");
      return { x: T, y: k };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: g } = t;
      if (d === Ee)
        return !0;
      if (g)
        return g(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d, clearCofactor: g } = t;
      return d === Ee ? this : g ? g(u, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(u, this, d);
    }
    toHex(d = !0) {
      return us(this.toRawBytes(d));
    }
  }
  u.BASE = new u(t.Gx, t.Gy, e.ONE), u.ZERO = new u(e.ZERO, e.ONE, e.ZERO);
  const p = t.nBitLength, b = N1(u, t.endo ? Math.ceil(p / 2) : p);
  return {
    CURVE: t,
    ProjectivePoint: u,
    normPrivateKeyToScalar: a,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function T1(n) {
  const t = dg(n);
  return $o(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function R1(n) {
  const t = T1(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(m) {
    return xn < m && m < e.ORDER;
  }
  function c(m) {
    return Ie(m, r);
  }
  function a(m) {
    return Vl(m, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: h, weierstrassEquation: u, isWithinCurveOrder: p } = S1({
    ...t,
    toBytes(m, E, R) {
      const M = E.toAffine(), H = e.toBytes(M.x), G = Po;
      return R ? G(Uint8Array.from([E.hasEvenY() ? 2 : 3]), H) : G(Uint8Array.from([4]), H, e.toBytes(M.y));
    },
    fromBytes(m) {
      const E = m.length, R = m[0], M = m.subarray(1);
      if (E === s && (R === 2 || R === 3)) {
        const H = Yr(M);
        if (!o(H))
          throw new Error("Point is not on curve");
        const G = u(H);
        let Q;
        try {
          Q = e.sqrt(G);
        } catch (Z) {
          const st = Z instanceof Error ? ": " + Z.message : "";
          throw new Error("Point is not on curve" + st);
        }
        const K = (Q & Ee) === Ee;
        return (R & 1) === 1 !== K && (Q = e.neg(Q)), { x: H, y: Q };
      } else if (E === i && R === 4) {
        const H = e.fromBytes(M.subarray(0, e.BYTES)), G = e.fromBytes(M.subarray(e.BYTES, 2 * e.BYTES));
        return { x: H, y: G };
      } else
        throw new Error(`Point of length ${E} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), b = (m) => us(ui(m, t.nByteLength));
  function y(m) {
    const E = r >> Ee;
    return m > E;
  }
  function d(m) {
    return y(m) ? c(-m) : m;
  }
  const g = (m, E, R) => Yr(m.slice(E, R));
  class w {
    constructor(E, R, M) {
      this.r = E, this.s = R, this.recovery = M, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(E) {
      const R = t.nByteLength;
      return E = Ue("compactSignature", E, R * 2), new w(g(E, 0, R), g(E, R, 2 * R));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(E) {
      const { r: R, s: M } = Wr.toSig(Ue("DER", E));
      return new w(R, M);
    }
    assertValidity() {
      if (!p(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!p(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(E) {
      return new w(this.r, this.s, E);
    }
    recoverPublicKey(E) {
      const { r: R, s: M, recovery: H } = this, G = N(Ue("msgHash", E));
      if (H == null || ![0, 1, 2, 3].includes(H))
        throw new Error("recovery id invalid");
      const Q = H === 2 || H === 3 ? R + t.n : R;
      if (Q >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const K = H & 1 ? "03" : "02", Z = l.fromHex(K + b(Q)), st = a(Q), ht = c(-G * st), bt = c(M * st), at = l.BASE.multiplyAndAddUnsafe(Z, ht, bt);
      if (!at)
        throw new Error("point at infinify");
      return at.assertValidity(), at;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return y(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return li(this.toDERHex());
    }
    toDERHex() {
      return Wr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return li(this.toCompactHex());
    }
    toCompactHex() {
      return b(this.r) + b(this.s);
    }
  }
  const I = {
    isValidPrivateKey(m) {
      try {
        return h(m), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const m = fg(t.n);
      return x1(t.randomBytes(m), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(m = 8, E = l.BASE) {
      return E._setWindowSize(m), E.multiply(BigInt(3)), E;
    }
  };
  function v(m, E = !0) {
    return l.fromPrivateKey(m).toRawBytes(E);
  }
  function T(m) {
    const E = ls(m), R = typeof m == "string", M = (E || R) && m.length;
    return E ? M === s || M === i : R ? M === 2 * s || M === 2 * i : m instanceof l;
  }
  function k(m, E, R = !0) {
    if (T(m))
      throw new Error("first arg must be private key");
    if (!T(E))
      throw new Error("second arg must be public key");
    return l.fromHex(E).multiply(h(m)).toRawBytes(R);
  }
  const x = t.bits2int || function(m) {
    const E = Yr(m), R = m.length * 8 - t.nBitLength;
    return R > 0 ? E >> BigInt(R) : E;
  }, N = t.bits2int_modN || function(m) {
    return c(x(m));
  }, O = Tu(t.nBitLength);
  function _(m) {
    if (typeof m != "bigint")
      throw new Error("bigint expected");
    if (!(xn <= m && m < O))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ui(m, t.nByteLength);
  }
  function U(m, E, R = P) {
    if (["recovered", "canonical"].some((lt) => lt in R))
      throw new Error("sign() legacy options not supported");
    const { hash: M, randomBytes: H } = t;
    let { lowS: G, prehash: Q, extraEntropy: K } = R;
    G == null && (G = !0), m = Ue("msgHash", m), Q && (m = Ue("prehashed msgHash", M(m)));
    const Z = N(m), st = h(E), ht = [_(st), _(Z)];
    if (K != null && K !== !1) {
      const lt = K === !0 ? H(e.BYTES) : K;
      ht.push(Ue("extraEntropy", lt));
    }
    const bt = Po(...ht), at = Z;
    function Ht(lt) {
      const yt = x(lt);
      if (!p(yt))
        return;
      const Pt = a(yt), Y = l.BASE.multiply(yt).toAffine(), dt = c(Y.x);
      if (dt === xn)
        return;
      const Ut = c(Pt * c(at + dt * st));
      if (Ut === xn)
        return;
      let Be = (Y.x === dt ? 0 : 2) | Number(Y.y & Ee), Oe = Ut;
      return G && y(Ut) && (Oe = d(Ut), Be ^= 1), new w(dt, Oe, Be);
    }
    return { seed: bt, k2sig: Ht };
  }
  const P = { lowS: t.lowS, prehash: !1 }, V = { lowS: t.lowS, prehash: !1 };
  function $(m, E, R = P) {
    const { seed: M, k2sig: H } = U(m, E, R), G = t;
    return lg(G.hash.outputLen, G.nByteLength, G.hmac)(M, H);
  }
  l.BASE._setWindowSize(8);
  function rt(m, E, R, M = V) {
    var H;
    const G = m;
    if (E = Ue("msgHash", E), R = Ue("publicKey", R), "strict" in M)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: Q, prehash: K } = M;
    let Z, st;
    try {
      if (typeof G == "string" || ls(G))
        try {
          Z = w.fromDER(G);
        } catch (Y) {
          if (!(Y instanceof Wr.Err))
            throw Y;
          Z = w.fromCompact(G);
        }
      else if (typeof G == "object" && typeof G.r == "bigint" && typeof G.s == "bigint") {
        const { r: Y, s: dt } = G;
        Z = new w(Y, dt);
      } else
        throw new Error("PARSE");
      st = l.fromHex(R);
    } catch (Y) {
      if (Y.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (Q && Z.hasHighS())
      return !1;
    K && (E = t.hash(E));
    const { r: ht, s: bt } = Z, at = N(E), Ht = a(bt), lt = c(at * Ht), yt = c(ht * Ht), Pt = (H = l.BASE.multiplyAndAddUnsafe(st, lt, yt)) == null ? void 0 : H.toAffine();
    return Pt ? c(Pt.x) === ht : !1;
  }
  return {
    CURVE: t,
    getPublicKey: v,
    getSharedSecret: k,
    sign: $,
    verify: rt,
    ProjectivePoint: l,
    Signature: w,
    utils: I
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function C1(n) {
  return {
    hash: n,
    hmac: (t, ...e) => og(n, t, qA(...e)),
    randomBytes: JA
  };
}
function P1(n, t) {
  const e = (r) => R1({ ...n, ...C1(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const pg = v1(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), U1 = pg.create(BigInt("-3")), L1 = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), D1 = P1({
  a: U1,
  // Equation params: a, b
  b: L1,
  Fp: pg,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: !1
}, r1), bf = D1, xo = "embeddedWallet", Ru = 23294, Cu = 23295, hi = {
  WALLET_CONTEXT: "oaw_context",
  TRANSACTIONS_CONTEXT: "oaw_transactions",
  TOKENS_CONTEXT: "oaw_tokens"
}, Kt = {
  SAPPHIRE_PROVIDER_NOT_INITIALIZED: "OAW_SAPPHIRE_PROVIDER_NOT_INITIALIZED",
  ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED: "OAW_ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED",
  NO_USERNAME: "OAW_NO_USERNAME",
  NO_PASSWORD: "OAW_NO_PASSWORD",
  NO_LOGIN_PROXY_DATA: "OAW_NO_LOGIN_PROXY_DATA",
  AUTHENTICATION_DATA_NOT_PROVIDED: "OAW_AUTHENTICATION_DATA_NOT_PROVIDED",
  CANT_GET_ACCOUNT_ADDRESS: "OAW_CANT_GET_ACCOUNT_ADDRESS",
  NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: "OAW_NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID",
  CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: "OAW_CROSS_CHAIN_PROVIDER_NOT_INITIALIZED",
  OASIS_WALLET_NOT_INITIALIZED: "OAW_OASIS_WALLET_NOT_INITIALIZED",
  CANT_HASH_USERNAME: "OAW_CANT_HASH_USERNAME",
  CANT_GET_SIGNATURE: "CANT_GET_SIGNATURE",
  NO_APILLON_SESSION_TOKEN_CALLBACK: "NO_APILLON_SESSION_TOKEN_CALLBACK",
  INVALID_APILLON_SESSION_TOKEN: "INVALID_APILLON_SESSION_TOKEN"
}, gg = {
  [Kt.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: "Sapphire provider not initialized",
  [Kt.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: "Account manager contract not initialized",
  [Kt.NO_USERNAME]: "No username",
  [Kt.NO_PASSWORD]: "No password",
  [Kt.NO_LOGIN_PROXY_DATA]: "No login proxy data",
  [Kt.AUTHENTICATION_DATA_NOT_PROVIDED]: "Authentication data not provided",
  [Kt.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [Kt.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: "No rpc url configured for selected chainid",
  [Kt.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: "Cross chain provider not initialized",
  [Kt.OASIS_WALLET_NOT_INITIALIZED]: "Embedded wallet not initialized",
  [Kt.CANT_HASH_USERNAME]: "Can't hash username",
  [Kt.NO_APILLON_SESSION_TOKEN_CALLBACK]: "Session token callback must be provided",
  [Kt.INVALID_APILLON_SESSION_TOKEN]: "Session token is not valid"
};
function Af(n) {
  if (typeof window < "u")
    return window[xo] = new yg(n), window[xo];
}
function Io() {
  if (typeof window < "u")
    return window[xo] || (window[xo] = new yg()), window[xo];
}
async function Xr(n = "") {
  var t, e;
  const r = await ((e = (t = Io()) == null ? void 0 : t.accountManagerContract) == null ? void 0 : e.salt());
  if (r)
    return U0(n, Lt(r), 1e5, 32, "sha256");
}
function Hc(n) {
  return [Cu, Ru].includes(n);
}
function it(n, t = "Error") {
  const e = new Error(t);
  throw e.name = Kt[n], e;
}
let Ef = class {
  constructor() {
    S(this, "abiCoder", Co.defaultAbiCoder());
  }
  async getRegisterData(t) {
    t.username || it("NO_USERNAME"), t.password || it("NO_PASSWORD");
    const e = await Xr(t.username);
    if (!e) {
      it("CANT_HASH_USERNAME");
      return;
    }
    const r = this.generateNewKeypair();
    return {
      hashedUsername: e,
      credentialId: r.credentialId,
      pubkey: {
        kty: 2,
        // Elliptic Curve format
        alg: -7,
        // ES256 algorithm
        crv: 1,
        // P-256 curve
        x: r.decoded_x,
        y: r.decoded_y
      },
      optionalPassword: xl(t.password)
    };
  }
  async getProxyResponse(t, e, r) {
    r.username || it("NO_USERNAME"), r.password || it("NO_PASSWORD");
    const s = await Xr(r.username);
    s || it("CANT_HASH_USERNAME");
    const i = pb(
      ["bytes32", "bytes"],
      [xl(r.password), e]
    );
    return await t.proxyViewPassword(s, i, e);
  }
  generateNewKeypair() {
    const t = bf.utils.randomPrivateKey(), e = bf.getPublicKey(t, !1), r = "0x" + us(e), s = this.abiCoder.encode(["string"], [r]), i = r.slice(4, r.length), o = BigInt("0x" + i.slice(0, 64)), c = BigInt("0x" + i.slice(64, i.length));
    return {
      credentialId: s,
      privateKey: t,
      decoded_x: o,
      decoded_y: c
    };
  }
};
function F1(n) {
  return n[0] << 24 | n[1] << 16 | n[2] << 8 | n[3];
}
function M1(n) {
  return n[0] << 8 | n[1];
}
function H1(n) {
  const t = Wf.decode(n), e = t[1];
  if (e == 2) {
    const r = {
      kty: e,
      alg: t[3],
      crv: t[-1],
      x: ti(t[-2]),
      /** @type {Uint8Array} */
      y: ti(t[-3])
    };
    if (!(r.alg == -7 && r.crv == 1) && // ES256 + P-256 (NIST)
    !(r.alg == -8 && r.crv == 6))
      throw new Error(`Unknown alg: ${r.alg}, crv: ${r.crv}`);
    return r;
  }
  throw new Error(`Unsupported kty: ${e}`);
}
function _1(n) {
  if (n.byteLength - n.byteOffset < 37)
    throw new Error("Attestation Object must be at least 37 bytes or longer");
  const t = n.slice(32, 33)[0], e = {
    rpIdHash: n.slice(0, 32),
    // 32 bytes, SHA256(rp.id), e.g. SHA256(b'localhost')
    flags: {
      //  1 byte
      UP: (t & 1) != 0,
      // Bit 0: User Present (UP) result
      // Bit 1: Reserved for future use (RFU1)
      UV: (t & 4) != 0,
      // Bit 2: User Verified (UV) result
      BE: (t & 8) != 0,
      // Bit 3: Backup Eligibility (BE)
      BS: (t & 16) != 0,
      // Bit 3: Backup State (BS)
      // Bit 5: Reserved for future use (RFU2)
      AT: (t & 64) != 0,
      // Bit 6: Attested credential data included (AT)
      ED: (t & 128) != 0
      // Bit 7: Extension data included (ED).
    },
    signCount: F1(n.slice(33, 37))
    //  4 bytes
  };
  if (e.flags.ED)
    throw new Error("Extension Data not supported!");
  if (e.flags.AT) {
    const r = M1(n.slice(53, 55));
    e.attestedCredentialData = {
      aaguid: n.slice(37, 53),
      // 16 bytes
      credentialId: n.slice(55, 55 + r),
      // vanillacbor.decodeOnlyFirst(buffer).byteLength;
      // https://www.w3.org/TR/webauthn-2/#sctn-encoded-credPubKey-examples
      credentialPublicKey: H1(n.slice(55 + r).buffer)
    };
  }
  return e;
}
function G1(n) {
  const t = Wf.decode(new Uint8Array(n).buffer).authData;
  return _1(t);
}
async function V1(n, t, e) {
  const r = await navigator.credentials.create({
    publicKey: {
      attestation: "none",
      challenge: e.buffer,
      pubKeyCredParams: [
        //{alg: -8, type: "public-key"},   // Ed25519
        { alg: -7, type: "public-key" }
        // ES256
        //{alg: -257, type: "public-key"}  // RS256
      ],
      rp: n,
      user: t
    }
  });
  if (!r)
    throw new Error("No PublicKeyCredential returned!");
  const s = r.response, i = new TextDecoder("utf-8").decode(s.clientDataJSON);
  return {
    id: new Uint8Array(r.rawId),
    cd: i,
    ad: G1(s.attestationObject)
  };
}
function $1(n) {
  return Object.entries(n).map(([t, e]) => {
    if (typeof e == "boolean")
      return {
        t: 1,
        k: t,
        v: e ? "true" : "false"
      };
    if (typeof e == "string")
      return {
        t: 0,
        k: t,
        v: e
      };
    throw new Error(`Incompatible value type! Key:${t} Value:${e}`);
  });
}
const j1 = new qr.Sequence({
  name: "sig",
  value: [
    new qr.Integer({
      name: "r"
    }),
    new qr.Integer({
      name: "s"
    })
  ]
});
async function W1(n, t) {
  t || (t = crypto.getRandomValues(new Uint8Array(32)));
  const e = await navigator.credentials.get({
    publicKey: {
      allowCredentials: n.map((l) => ({ id: l, type: "public-key" })),
      challenge: t
    }
  }), r = e.response, s = qr.verifySchema(r.signature, j1);
  if (!s.verified)
    throw new Error("Unable to decode ASN.1 signature!");
  const i = s.result, o = i.r.toBigInt(), c = i.s.toBigInt(), a = JSON.parse(new TextDecoder().decode(r.clientDataJSON));
  return {
    credentialIdHashed: It(new Uint8Array(e.rawId)),
    challenge: t,
    resp: {
      authenticatorData: new Uint8Array(r.authenticatorData),
      clientDataTokens: $1(a),
      sigR: o,
      sigS: c
    }
  };
}
let vf = class {
  async getRegisterData(t) {
    t.username || it("NO_USERNAME");
    const e = await Xr(t.username);
    if (!e) {
      it("CANT_HASH_USERNAME");
      return;
    }
    const r = await V1(
      {
        name: "Embedded Wallet Account",
        id: window.location.hostname
      },
      {
        id: e,
        name: t.username,
        displayName: t.username
      },
      crypto.getRandomValues(new Uint8Array(32))
    );
    return {
      hashedUsername: e,
      credentialId: r.id,
      pubkey: r.ad.attestedCredentialData.credentialPublicKey,
      optionalPassword: fl
    };
  }
  async getProxyResponse(t, e, r) {
    r.username || it("NO_USERNAME");
    const s = r.hashedUsername || await Xr(r.username);
    s || it("CANT_HASH_USERNAME");
    const i = await t.personalization(), o = await t.credentialIdsByUsername(s), c = await W1(
      // binary credential ids
      o.map((a) => Lt(a)),
      // challenge
      Lt(ur(i + ur(e).slice(2)))
    );
    return await t.proxyView(c.credentialIdHashed, c.resp, e);
  }
};
class z1 extends zf {
  constructor() {
    super(new Error(gg[Kt.OASIS_WALLET_NOT_INITIALIZED]), {
      code: 4900,
      shortMessage: "Disconnected"
    });
  }
}
class _c extends zf {
  constructor() {
    super(new Error("Request rejected by user"), {
      code: 4001,
      shortMessage: "User Rejected Request"
    });
  }
}
var Q1 = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
let yg = class {
  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(t) {
    S(this, "sapphireProvider"), S(this, "accountManagerContract"), S(this, "abiCoder", Co.defaultAbiCoder()), S(this, "events"), S(this, "onGetSignature"), S(this, "onGetApillonSessionToken"), S(this, "isTest", !1), S(this, "defaultNetworkId", 0), S(this, "rpcUrls", {}), S(this, "rpcProviders", {}), S(this, "explorerUrls", {
      [Ru]: "https://explorer.oasis.io/mainnet/sapphire",
      [Cu]: "https://explorer.oasis.io/testnet/sapphire"
    }), S(this, "lastAccount", {
      username: "",
      authStrategy: "passkey",
      address: "",
      contractAddress: ""
    }), S(this, "waitForAccountResolver", null);
    const e = new Uc(
      t != null && t.test ? "https://testnet.sapphire.oasis.io" : "https://sapphire.oasis.io"
    );
    if (this.sapphireProvider = P0.wrap(e), this.accountManagerContract = new cs(
      (t == null ? void 0 : t.accountManagerAddress) || "0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1",
      !(t != null && t.onGetSignature) && !(t != null && t.onGetApillonSessionToken) ? $A : rg,
      new hf(bi, this.sapphireProvider)
    ), this.defaultNetworkId = (t == null ? void 0 : t.defaultNetworkId) || this.defaultNetworkId, t == null ? void 0 : t.networkConfig)
      for (const r in t.networkConfig)
        this.rpcUrls[r] = t.networkConfig[r].rpcUrl, this.explorerUrls[r] = t.networkConfig[r].explorerUrl;
    this.events = L0(), this.isTest = !!(t != null && t.test), this.onGetSignature = t == null ? void 0 : t.onGetSignature, this.onGetApillonSessionToken = t == null ? void 0 : t.onGetApillonSessionToken;
    try {
      this.getRpcProviderForChainId(this.defaultNetworkId) && this.events.emit("connect", { chainId: `0x${this.defaultNetworkId.toString(16)}` });
    } catch {
    }
  }
  // #region Auth utils
  /**
   * Check if `username` is already registered on accountManager
   */
  async userExists(t) {
    return this.sapphireProvider || it("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || it("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), await this.accountManagerContract.userExists(
      await Xr(t)
    ) || !1;
  }
  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   */
  async register(t, e) {
    this.sapphireProvider || it("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || it("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    let r;
    t === "password" ? r = await new Ef().getRegisterData(e) : t === "passkey" && (r = await new vf().getRegisterData(e));
    const s = this.abiCoder.encode(
      ["tuple(bytes funcData, uint8 txType)"],
      [
        {
          funcData: this.abiCoder.encode(
            [
              "tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword)"
            ],
            [r]
          ),
          txType: 0
        }
      ]
    ), i = (await this.sapphireProvider.getFeeData()).gasPrice, o = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    );
    let c = "";
    if (this.onGetSignature || this.onGetApillonSessionToken) {
      this.onGetSignature || (this.onGetSignature = this.getApillonSignature);
      const l = await this.onGetSignature(s);
      l.signature || it("CANT_GET_SIGNATURE"), c = await this.accountManagerContract.generateGaslessTx(
        s,
        o,
        l.gasPrice ? BigInt(l.gasPrice) : i,
        l.gasLimit ? BigInt(l.gasLimit) : 1000000n,
        BigInt(l.timestamp),
        l.signature
      );
    } else
      c = await this.accountManagerContract.generateGaslessTx(
        s,
        o,
        i
      );
    const a = await this.sapphireProvider.send("eth_sendRawTransaction", [c]);
    if (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "username",
      newValue: e.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, await this.waitForTxReceipt(a))
      return await this.handleAccountAfterAuth(e.username);
  }
  /**
   * Check that credentials belong to some account.
   */
  async authenticate(t, e) {
    this.sapphireProvider || it("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || it("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), e.username || it("NO_USERNAME");
    const r = "0x000000000000000000000000000000000000000000000000000000000000DEAD", s = await Xr(e.username), i = new Ss(na), o = i.encodeFunctionData("sign", [r]), c = await this.getProxyForStrategy(t, o, {
      ...e,
      hashedUsername: s
    });
    c || it("NO_LOGIN_PROXY_DATA");
    const [[a, l, h]] = i.decodeFunctionResult("sign", c).toArray(), u = mp(r, {
      r: a,
      s: l,
      v: h
    }), p = await this.accountManagerContract.getAccount(s);
    if (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "username",
      newValue: e.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, p.length > 1 && u === p[1])
      return await this.handleAccountAfterAuth(e.username);
  }
  /**
   * Return address for username.
   * - Public EVM address
   * - Account contract address (deployed on sapphire)
   */
  async getAccountAddress(t) {
    if (this.sapphireProvider || it("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || it("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), !t) {
      if (this.lastAccount.address)
        return {
          publicAddress: this.lastAccount.address,
          accountContractAddress: this.lastAccount.contractAddress
        };
      it("NO_USERNAME");
    }
    const e = await Xr(t), r = await this.accountManagerContract.getAccount(e);
    if (Array.isArray(r) && r.length > 1)
      return this.events.emit("dataUpdated", {
        name: "address",
        newValue: r[1],
        oldValue: this.lastAccount.address
      }), this.lastAccount.address = r[1], this.lastAccount.contractAddress = r[0], {
        publicAddress: r[1],
        accountContractAddress: r[0]
      };
  }
  async getAccountBalance(t, e = this.defaultNetworkId, r = 18) {
    var s;
    if (!e || Hc(e))
      return ih(await ((s = this.sapphireProvider) == null ? void 0 : s.getBalance(t)) || 0n, r);
    if (!this.rpcUrls[e])
      return "0";
    const i = this.rpcProviders[e] || new Uc(this.rpcUrls[e]);
    return ih(await i.getBalance(t), r);
  }
  // #endregion
  // #region Auth helpers
  /**
   * Default handler for getting signature.
   *
   * If no custom `onGetSignature` param is provided, use apillon^tm by default.
   *
   * `onGetApillonSessionToken` param must be provided in this case to authenticate
   * with the signature generating endpoint.
   */
  async getApillonSignature(t) {
    if (!this.onGetApillonSessionToken)
      return it("NO_APILLON_SESSION_TOKEN_CALLBACK"), { signature: "", gasLimit: 0, timestamp: 0 };
    try {
      const e = await this.onGetApillonSessionToken();
      e || it("INVALID_APILLON_SESSION_TOKEN");
      const { data: r } = await (await fetch(
        `${Q1.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/signature`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: e,
            data: t
          })
        }
      )).json();
      return {
        signature: r.signature,
        gasLimit: r.gasLimit || 0,
        gasPrice: r.gasPrice || 0,
        timestamp: r.timestamp
      };
    } catch (e) {
      console.error("Signature request error", e);
    }
    return { signature: "", gasLimit: 0, timestamp: 0 };
  }
  setAccount(t) {
    this.events.emit("dataUpdated", {
      name: "username",
      newValue: t.username,
      oldValue: this.lastAccount.username
    }), this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t.strategy,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "address",
      newValue: t.address,
      oldValue: this.lastAccount.address
    }), this.lastAccount.username = t.username, this.lastAccount.authStrategy = t.strategy, this.lastAccount.address = t.address, this.lastAccount.contractAddress = t.contractAddress;
  }
  async handleAccountAfterAuth(t) {
    const e = await this.getAccountAddress(t);
    return e && this.waitForAccountResolver && (this.waitForAccountResolver(e.publicAddress), this.waitForAccountResolver = null), e && this.events.emit("accountsChanged", [e.publicAddress]), e;
  }
  /**
   * Create a promise and pass resolver to event `providerRequestAccounts`.
   * Once the promise resolves, return account address.
   */
  async waitForAccount() {
    return await new Promise((t) => {
      this.waitForAccountResolver = t, this.events.emit("providerRequestAccounts", t);
    });
  }
  // #endregion
  // #region Transactions
  async signMessage(t) {
    this.sapphireProvider || it("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const e = new Ss(na);
    let r = t.data || "";
    const s = t.message;
    if ((!r || t.mustConfirm) && (typeof t.message == "string" && !t.message.startsWith("0x") && (t.message = xl(t.message)), r = e.encodeFunctionData("sign", [t.message]), t.mustConfirm))
      return await new Promise((o, c) => {
        this.events.emit("signatureRequest", {
          ...t,
          data: r,
          message: s,
          mustConfirm: !1,
          resolve: o,
          reject: c
        });
      });
    t.authData || (t.strategy === "passkey" && this.lastAccount.username ? t.authData = { username: this.lastAccount.username } : it("AUTHENTICATION_DATA_NOT_PROVIDED"));
    const i = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      r,
      t.authData
    );
    if (i) {
      const [o] = e.decodeFunctionResult("sign", i).toArray();
      if (Array.isArray(o) && o.length > 2) {
        const c = an.from({
          r: o[0],
          s: o[1],
          v: o[2]
        }).serialized;
        return t.resolve && t.resolve(c), c;
      }
    }
  }
  /**
   * Authenticate with selected auth strategy through sapphire "Account Manager",
   * then return signed tx data and chainId of tx.
   */
  async signPlainTransaction(t) {
    var e;
    const r = this.validateChainId(
      ((e = t == null ? void 0 : t.tx) == null ? void 0 : e.chainId) && +t.tx.chainId.toString() || 0
    );
    if (t.tx.chainId = r, t.tx.nonce || (t.tx.nonce = await this.getRpcProviderForChainId(r).getTransactionCount(
      this.lastAccount.address
    )), t.tx.type === "eip1559" && (t.tx.type = 2, t.tx.gasLimit = t.tx.gas), t.tx.gasPrice || (t.tx.gasPrice = (await this.getRpcProviderForChainId(t.tx.chainId).getFeeData()).gasPrice), t.tx.gasLimit || (t.tx.gasLimit = 1e6), (t.tx.type === 2 && !t.tx.value || "value" in t.tx && typeof t.tx.value > "u") && (t.tx.value = 0n), t.mustConfirm)
      return await new Promise((c, a) => {
        this.events.emit("txApprove", {
          plain: { ...t, mustConfirm: !1, resolve: c, reject: a }
        });
      });
    t.authData || it("AUTHENTICATION_DATA_NOT_PROVIDED");
    const s = new Ss(na), i = s.encodeFunctionData("signEIP155", [t.tx]), o = await this.getProxyForStrategy(t.strategy, i, t.authData);
    if (o) {
      const [c] = s.decodeFunctionResult("signEIP155", o).toArray();
      return t.resolve && t.resolve({
        signedTxData: c,
        chainId: r
      }), {
        signedTxData: c,
        chainId: r
      };
    }
  }
  /**
   * Send raw transaction data to network.
   * If chainId is provided, the transaction is sent to that network (cross-chain).
   */
  async broadcastTransaction(t, e, r = "Transaction") {
    const s = this.getRpcProviderForChainId(e), i = await s.send("eth_sendRawTransaction", [t]), o = {
      hash: i,
      label: r,
      rawData: t,
      owner: this.lastAccount.address || "none",
      status: "pending",
      chainId: e || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[e || this.defaultNetworkId] ? `${this.explorerUrls[e || this.defaultNetworkId]}/tx/${i}` : "",
      createdAt: Date.now()
    };
    return this.events.emit("txSubmitted", o), {
      txHash: i,
      ethProvider: s,
      txItem: o
    };
  }
  /**
   * Get signed tx for making a contract write call.
   */
  async signContractWrite(t) {
    const e = this.validateChainId(t.chainId);
    if (t.mustConfirm)
      return await new Promise((l, h) => {
        this.events.emit("txApprove", {
          contractWrite: { ...t, mustConfirm: !1, resolve: l, reject: h }
        });
      });
    t.authData || it("AUTHENTICATION_DATA_NOT_PROVIDED");
    const r = await this.getAccountAddress(t.authData.username);
    r != null && r.publicAddress || it("CANT_GET_ACCOUNT_ADDRESS");
    const s = new Ss(t.contractAbi).encodeFunctionData(
      t.contractFunctionName,
      t.contractFunctionValues
    ), i = await new hf(
      r.publicAddress,
      this.getRpcProviderForChainId(e)
    ).populateTransaction({
      from: r.publicAddress,
      to: t.contractAddress,
      gasLimit: 1e6,
      value: 0,
      data: s
    });
    i.gasPrice = 2e10;
    const o = new Ss(na), c = o.encodeFunctionData("signEIP155", [i]), a = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      c,
      t.authData
    );
    if (a) {
      const [l] = o.decodeFunctionResult("signEIP155", a).toArray();
      return t.resolve && t.resolve({
        signedTxData: l,
        chainId: e
      }), {
        signedTxData: l,
        chainId: e
      };
    }
  }
  /**
   * Get result of contract read.
   * Utility function, this has nothing to do with Oasis.
   */
  async contractRead(t) {
    const e = this.validateChainId(t.chainId), r = this.getRpcProviderForChainId(e), s = new cs(t.contractAddress, t.contractAbi, r);
    return t.contractFunctionValues ? await s[t.contractFunctionName](...t.contractFunctionValues) : await s[t.contractFunctionName]();
  }
  // #endregion
  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(t, e, r) {
    if (this.accountManagerContract || it("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), t === "password")
      return await new Ef().getProxyResponse(
        this.accountManagerContract,
        e,
        r
      );
    if (t === "passkey")
      return await new vf().getProxyResponse(
        this.accountManagerContract,
        e,
        r
      );
  }
  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(t, e) {
    !e && !this.sapphireProvider && it("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const r = 60;
    let s = 0;
    for (; ; ) {
      const i = await (e || this.sapphireProvider).getTransactionReceipt(t);
      if (i)
        return i;
      if (s += 1, s >= r)
        return;
      await new Promise((o) => setTimeout(o, 1e3));
    }
  }
  setDefaultNetworkId(t) {
    return this.rpcUrls[t] ? (this.events.emit("dataUpdated", {
      name: "defaultNetworkId",
      newValue: t,
      oldValue: this.defaultNetworkId
    }), this.events.emit("chainChanged", { chainId: `0x${t.toString(16)}` }), this.defaultNetworkId = t, !0) : !1;
  }
  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(t) {
    return (t && !Hc(t) && !this.rpcUrls[t] || !t && this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) && it("NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID"), !t && this.defaultNetworkId && (t = this.defaultNetworkId), t;
  }
  /**
   * Get provider object for chainId.
   * If no chainId specified, use sapphire network rpc.
   */
  getRpcProviderForChainId(t) {
    if (!t || t && Hc(+t.toString()))
      return this.sapphireProvider || (this.events.emit("disconnect", { error: new z1() }), it("SAPPHIRE_PROVIDER_NOT_INITIALIZED")), this.sapphireProvider;
    {
      const e = this.rpcProviders[t] || new Uc(this.rpcUrls[t]);
      return this.rpcProviders[t] = e, e || it("CROSS_CHAIN_PROVIDER_NOT_INITIALIZED"), e;
    }
  }
  // #endregion
};
Qf(rg);
const mg = (n = 0) => ({
  username: "",
  address: "",
  contractAddress: "",
  balance: "",
  authStrategy: "passkey",
  networkId: n,
  walletScreen: "main",
  displayedError: ""
});
function q1(n, t) {
  switch (t.type) {
    case "setValue":
      return {
        ...n,
        [t.payload.key]: t.payload.value
      };
    case "setState":
      return {
        ...n,
        ...t.payload
      };
    case "reset":
      return mg(n.networkId);
    default:
      throw new Error("Unhandled action type." + JSON.stringify(t));
  }
}
const wg = Jl(void 0);
function K1({
  children: n,
  networks: t = [],
  defaultNetworkId: e = 0,
  ...r
}) {
  t = r != null && r.test ? [
    {
      name: "Sapphire Testnet",
      id: Cu,
      rpcUrl: "https://testnet.sapphire.oasis.io",
      explorerUrl: "https://explorer.oasis.io/testnet/sapphire"
    },
    ...t
  ] : [
    {
      name: "Oasis Sapphire",
      id: Ru,
      rpcUrl: "https://sapphire.oasis.io",
      explorerUrl: "https://explorer.oasis.io/mainnet/sapphire"
    }
  ];
  const [s, i] = Zl(q1, mg(e || t[0].id)), [o, c] = Rt(!1), [a, l] = Rt();
  Ge(() => {
    if (o) {
      const { walletScreen: u, displayedError: p, ...b } = s;
      localStorage.setItem(hi.WALLET_CONTEXT, JSON.stringify(b));
    }
  }, [s]), Ge(() => {
    const u = localStorage.getItem(hi.WALLET_CONTEXT);
    if (u)
      try {
        const p = JSON.parse(u);
        i({ type: "setState", payload: p });
      } catch (p) {
        console.error("Cant parse global state localStorage", p);
      }
    setTimeout(() => c(!0), 10);
  }, []), Ge(() => {
    if (o && !a) {
      let u;
      t && t.length ? u = Af({
        ...r,
        defaultNetworkId: s.networkId || e,
        networkConfig: t.reduce((p, b) => (p[b.id] = {
          rpcUrl: b.rpcUrl,
          explorerUrl: b.explorerUrl
        }, p), {})
      }) : u = Af(), u && (l(u), h(u), u.setAccount({
        username: s.username,
        strategy: s.authStrategy,
        address: s.address,
        contractAddress: s.contractAddress
      }));
    }
  }, [t, e, o]);
  async function h(u) {
    const p = u || a;
    if (p && s.address)
      try {
        const b = await (p == null ? void 0 : p.getAccountBalance(s.address));
        i({ type: "setValue", payload: { key: "balance", value: b } });
      } catch (b) {
        console.error("Reloading balance", b);
      }
  }
  return /* @__PURE__ */ L(
    wg.Provider,
    {
      value: {
        state: s,
        dispatch: i,
        networks: t,
        networksById: t.reduce(
          (u, p) => (u[p.id] = p, u),
          {}
        ),
        defaultNetworkId: e || 0,
        wallet: a,
        setWallet: l,
        reloadUserBalance: h,
        setScreen: (u) => i({ type: "setValue", payload: { key: "walletScreen", value: u } }),
        handleError: (u) => {
          var p;
          if (u) {
            console.error(u);
            let b = "";
            u != null && u.name && (b = gg[u.name]), !b && u != null && u.error && ((p = u == null ? void 0 : u.error) != null && p.message ? b = u.error.message : typeof u.error == "string" && (b = u.error)), !b && u != null && u.message && (b = u.message), b && i({
              type: "setValue",
              payload: { key: "displayedError", value: b }
            });
          } else
            i({ type: "setValue", payload: { key: "displayedError", value: "" } });
        }
      },
      children: n
    }
  );
}
function pe() {
  const n = Yl(wg);
  if (n === void 0)
    throw new Error("useWalletContext usage must be wrapped with WalletContext provider.");
  return n;
}
function bg(n) {
  var t, e, r = "";
  if (typeof n == "string" || typeof n == "number") r += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var s = n.length;
    for (t = 0; t < s; t++) n[t] && (e = bg(n[t])) && (r && (r += " "), r += e);
  } else for (e in n) n[e] && (r && (r += " "), r += e);
  return r;
}
function Pu() {
  for (var n, t, e = 0, r = "", s = arguments.length; e < s; e++) (n = arguments[e]) && (t = bg(n)) && (r && (r += " "), r += t);
  return r;
}
function J1({
  size: n = 36,
  width: t = 2,
  color: e = "currentColor",
  className: r
}) {
  return /* @__PURE__ */ L(
    "svg",
    {
      style: {
        margin: `-${n / 2}px 0 0 -${n / 2}px`,
        width: `${n}px`,
        height: `${n}px`,
        animation: "rotate 2s linear infinite",
        zIndex: 2,
        position: "absolute",
        top: "50%",
        left: "50%"
      },
      viewBox: "0 0 50 50",
      className: r,
      children: /* @__PURE__ */ L(
        "circle",
        {
          cx: "25",
          cy: "25",
          r: "20",
          fill: "none",
          stroke: e,
          strokeWidth: t,
          style: {
            strokeDasharray: "8, 10",
            animation: "dash 8s ease-in-out infinite"
          }
        }
      )
    }
  );
}
const Z1 = "160px", Y1 = "40px", X1 = "px-4 py-2.5", jt = k0(
  ({
    blank: n = !1,
    self: t = !1,
    variant: e = "primary",
    minWidth: r = Z1,
    minHeight: s = Y1,
    paddingClass: i = X1,
    disabled: o = !1,
    loading: c = !1,
    type: a = "button",
    className: l,
    ...h
  }, u) => {
    const p = Pu(
      i,
      l,
      "oaw-button relative inline-block rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] border-x-0",
      {
        "transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50": !c && !o,
        "bg-yellow text-dark border-b-yellow border-t-yellow": e === "primary",
        "bg-lightdark text-offwhite border-b-lightdark border-t-lightdark": e === "secondary",
        "opacity-60": o
      }
    ), b = { minWidth: r, minHeight: s }, y = /* @__PURE__ */ J(on, { children: [
      !!c && /* @__PURE__ */ J(on, { children: [
        " ",
        /* @__PURE__ */ L(J1, { color: "#141721" })
      ] }),
      " ",
      !c && h.children
    ] });
    return (n || t) && typeof h.href == "string" ? /* @__PURE__ */ L(
      "a",
      {
        ref: u,
        href: h.href,
        target: n ? "_blank" : "_self",
        rel: "noreferrer",
        title: h.title,
        className: p,
        style: b,
        onClick: h.onClick,
        children: y
      }
    ) : /* @__PURE__ */ L(
      "button",
      {
        ref: u,
        type: a,
        disabled: c || o,
        className: p,
        style: b,
        ...h,
        children: y
      }
    );
  }
);
jt.displayName = "Btn";
function No({
  text: n,
  show: t,
  className: e
}) {
  const { state: r, handleError: s } = pe();
  return !r.displayedError && !n || !t ? /* @__PURE__ */ L(on, {}) : /* @__PURE__ */ J(
    "div",
    {
      className: Pu(
        "flex gap-2 justify-between items-start py-2 pl-3 pr-2 break-all text-sm text-white bg-red/75 rounded-md overflow-auto",
        e
      ),
      style: { maxHeight: "250px" },
      children: [
        r.displayedError || n || "",
        /* @__PURE__ */ L(
          "button",
          {
            title: "Dismiss",
            className: "!text-white/50 hover:!text-white -mt-0.5 shrink-0",
            onClick: () => s(),
            children: /* @__PURE__ */ L(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ L(
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
var xf = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function tE({
  authFormPlaceholder: n = "your e-mail@email.com",
  isAuthEmail: t = !0,
  isEmailConfirm: e = !0,
  onEmailConfirmRequest: r,
  onEmailConfirm: s,
  onGetApillonSessionToken: i
}) {
  const { dispatch: o, defaultNetworkId: c, handleError: a } = pe(), [l, h] = Rt(""), [u, p] = Rt(!1), [b, y] = Rt(!1), [d, g] = Rt(!1);
  async function w(T) {
    if (T.preventDefault(), !l)
      return;
    const k = Io();
    p(!0), a();
    try {
      if (await (k == null ? void 0 : k.userExists(l))) {
        const x = await (k == null ? void 0 : k.authenticate("passkey", { username: l }));
        x && v({
          username: l,
          address: x.publicAddress,
          authStrategy: "passkey"
        });
      } else if (e && r)
        await r(l), y(!0);
      else if (e && i) {
        const x = await i();
        x || it("INVALID_APILLON_SESSION_TOKEN"), await fetch(
          `${xf.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/otp/generate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: x,
              email: l
            })
          }
        ), y(!0);
      } else
        I();
    } catch (x) {
      a(x);
    }
    p(!1);
  }
  async function I() {
    p(!0), a();
    try {
      const T = Io(), k = await (T == null ? void 0 : T.register("passkey", { username: l }));
      k && v({ username: l, address: k.publicAddress, authStrategy: "passkey" });
    } catch (T) {
      a(T);
    }
    p(!1);
  }
  async function v({
    username: T,
    address: k,
    authStrategy: x
  }) {
    const N = Io(), O = await (N == null ? void 0 : N.getAccountBalance(k)) || "0";
    o({
      type: "setState",
      payload: {
        address: k,
        username: T,
        balance: O,
        authStrategy: x,
        networkId: c || void 0
      }
    });
  }
  return d ? /* @__PURE__ */ J("div", { className: "text-center", children: [
    /* @__PURE__ */ L("h2", { className: "mb-12", children: r ? "Email succesfully confirmed." : "Welcome" }),
    /* @__PURE__ */ L("p", { className: "text-xl mb-12", children: "Passkey configuration will now start." }),
    /* @__PURE__ */ L(jt, { loading: u, onClick: () => I(), children: "Retry" }),
    /* @__PURE__ */ L(No, { show: !0, className: "mt-6" })
  ] }) : b ? /* @__PURE__ */ J(on, { children: [
    /* @__PURE__ */ L(
      eE,
      {
        isCodeSubmitted: d,
        loading: u,
        onConfirm: async (T) => {
          if (!s && !i)
            return I();
          p(!0), a();
          try {
            if (s)
              await s(l, T);
            else if (i) {
              const k = await i();
              k || it("INVALID_APILLON_SESSION_TOKEN");
              const { data: x } = await (await fetch(
                `${xf.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/otp/validate`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    token: k,
                    email: l,
                    code: T
                  })
                }
              )).json();
              if (!x)
                throw new Error("Verification code is not valid.");
            }
            g(!0), I();
          } catch (k) {
            a(k), p(!1);
          }
        }
      }
    ),
    /* @__PURE__ */ L(No, { show: !0, className: "mt-6" })
  ] }) : /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ L("h2", { className: "mb-6", children: "Sign in or Sign up" }),
    /* @__PURE__ */ J("form", { onSubmit: (T) => w(T), children: [
      /* @__PURE__ */ L(
        "input",
        {
          type: t ? "email" : "text",
          placeholder: n,
          value: l,
          className: "w-full mb-8",
          onChange: (T) => h(T.target.value)
        }
      ),
      /* @__PURE__ */ L(jt, { type: "submit", loading: u, className: "w-full", children: "Continue" })
    ] }),
    /* @__PURE__ */ L(No, { show: !0, className: "mt-6" })
  ] });
}
function eE({
  loading: n,
  onConfirm: t
}) {
  const [e, r] = Rt(""), s = [
    dr(null),
    dr(null),
    dr(null),
    dr(null),
    dr(null),
    dr(null)
  ];
  Ge(() => {
    e.length === 6 && !/\s/.test(e) && t(e);
  }, [e]);
  function i(a, l) {
    const h = a.target;
    if (/^[^\d]$/.test(h.value)) {
      h.value = "";
      return;
    }
    const u = s[l - 1], p = s[l + 1], b = s.map((y, d) => e[d] || " ");
    b[l] = h.value, r(b.join("")), h.select(), h.value === "" ? u != null && u.current && u.current.focus() : p != null && p.current && p.current.select();
  }
  function o(a, l) {
    const h = a.target, u = s[l - 1];
    (a.key === "Backspace" || a.key === "Delete") && h.value === "" && (a.preventDefault(), r((p) => p.slice(0, l) + " " + p.slice(l + 1)), u != null && u.current && u.current.focus());
  }
  function c(a) {
    const l = a.clipboardData.getData("text");
    l.length === 6 && (r(l), s.forEach((h, u) => {
      h != null && h.current && (h.current.value = l.charAt(u));
    }));
  }
  return /* @__PURE__ */ J("div", { className: "text-center", children: [
    /* @__PURE__ */ L("p", { children: "We just sent a confirmation code to your email. Paste the code below to proceed with account creation." }),
    /* @__PURE__ */ L("h2", { className: "my-6", children: "Check your email" }),
    /* @__PURE__ */ L("p", { className: "mb-6", children: "Enter the 6-digit code you received" }),
    /* @__PURE__ */ L("div", { className: "flex gap-2 mb-12 justify-center", children: [0, 1, 2, 3, 4, 5].map((a) => /* @__PURE__ */ L(
      "input",
      {
        ref: s[a],
        type: "text",
        maxLength: 1,
        autoFocus: a === 0,
        disabled: n,
        className: "min-w-0 w-14 h-14",
        onFocus: (l) => l.target.select(),
        onKeyDown: (l) => o(l, a),
        onPaste: (l) => c(l),
        onChange: (l) => i(l, a)
      },
      a
    )) }),
    /* @__PURE__ */ L(jt, { disabled: n, children: "Send again" })
  ] });
}
function Ag(n) {
  return !n || n.length <= 10 ? n : `${n.slice(0, 6)}...${n.slice(-4)}`;
}
function nE() {
  const { state: n, dispatch: t, networks: e, wallet: r, setScreen: s } = pe();
  if (!Array.isArray(e) || !e.length)
    return /* @__PURE__ */ L(on, {});
  function i(o) {
    t({ type: "setValue", payload: { key: "networkId", value: o } }), r == null || r.setDefaultNetworkId(o), s("main");
  }
  return /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ L("h2", { className: "mb-4", children: "Select network" }),
    /* @__PURE__ */ L("div", { className: "flex flex-col gap-3", children: e.map((o) => /* @__PURE__ */ L(
      jt,
      {
        variant: "secondary",
        disabled: o.id === n.networkId,
        onClick: () => i(o.id),
        children: o.name
      },
      o.id
    )) })
  ] });
}
const rE = () => ({
  txs: {},
  pending: [],
  chainIdsForHash: {}
  // for pending hashes
});
function sE(n, t) {
  switch (t.type) {
    case "setState":
      return {
        ...n,
        ...t.payload
      };
    case "addTx":
      return {
        ...n,
        txs: {
          ...n.txs,
          [t.payload.owner]: {
            ...n.txs[t.payload.owner],
            [t.payload.hash]: t.payload
          }
        },
        // pending: [...new Set([...state.pending, action.payload.hash])],
        chainIdsForHash: {
          ...n.chainIdsForHash,
          [t.payload.hash]: t.payload.chainId
        }
      };
    case "setTxStatus":
      return {
        ...n,
        txs: {
          ...n.txs,
          [t.payload.tx.owner]: {
            ...n.txs[t.payload.tx.owner],
            [t.payload.tx.hash]: {
              ...n.txs[t.payload.tx.owner][t.payload.tx.hash],
              status: t.payload.status
            }
          }
        },
        pending: t.payload.status === "pending" ? [.../* @__PURE__ */ new Set([...n.pending, t.payload.tx.hash])] : n.pending.filter((e) => e !== t.payload.tx.hash),
        chainIdsForHash: t.payload.status === "pending" ? {
          ...n.chainIdsForHash,
          [t.payload.tx.hash]: t.payload.tx.chainId
        } : Object.keys(n.chainIdsForHash).reduce(
          (e, r) => (r !== t.payload.tx.hash && (e[r] = t.payload.tx.chainId), e),
          {}
        )
      };
    default:
      throw new Error("Unhandled action type." + JSON.stringify(t));
  }
}
const Eg = Jl(void 0);
function iE({ children: n }) {
  const [t, e] = Zl(sE, rE()), [r, s] = Rt(!1), {
    state: { address: i },
    reloadUserBalance: o
  } = pe();
  Ge(() => {
    if (r) {
      const { pending: a, chainIdsForHash: l, ...h } = t;
      localStorage.setItem(hi.TRANSACTIONS_CONTEXT, JSON.stringify(h));
    }
  }, [t]), Ge(() => {
    const a = localStorage.getItem(hi.TRANSACTIONS_CONTEXT);
    if (a)
      try {
        const l = JSON.parse(a);
        e({ type: "setState", payload: l });
      } catch (l) {
        console.error("Cant parse context state localStorage", l);
      }
    setTimeout(() => {
      s(!0);
    }, 100);
  }, []), Ge(() => {
    if (i && t.txs[i] && Object.keys(t.txs[i]).length)
      for (const a of Object.keys(t.txs[i]))
        c(a);
  }, [i, t.txs]);
  async function c(a) {
    var l;
    if (!i)
      return;
    const h = Io();
    if (!h)
      throw new Error("Wallet not initialized." + a);
    const u = h.getRpcProviderForChainId(t.chainIdsForHash[a]);
    if (!u)
      throw new Error("Provider not initialized. " + a);
    const p = (l = t.txs[i]) == null ? void 0 : l[a];
    if (!p || p.status === "confirmed" || p.status === "failed" || t.pending.includes(a))
      return;
    if (Date.now() - p.createdAt > 15e3 && !await u.getTransaction(a)) {
      e({ type: "setTxStatus", payload: { tx: p, status: "failed" } });
      return;
    }
    const b = await u.getTransactionReceipt(a);
    b ? (b.status ? e({
      type: "setTxStatus",
      payload: {
        tx: p,
        status: "confirmed"
      }
    }) : e({
      type: "setTxStatus",
      payload: {
        tx: p,
        status: "failed"
      }
    }), o(), h.events.emit("txDone", p)) : (e({
      type: "setTxStatus",
      payload: {
        tx: p,
        status: "pending"
      }
    }), u.once(a, (y) => {
      const d = y && !isNaN(y.status) && y.status === 0;
      o(), e({
        type: "setTxStatus",
        payload: {
          tx: p,
          status: d ? "failed" : "confirmed"
        }
      }), h.events.emit("txDone", p);
    }));
  }
  return /* @__PURE__ */ L(Eg.Provider, { value: { state: t, dispatch: e, checkTransaction: c }, children: n });
}
function vg() {
  const n = Yl(Eg);
  if (n === void 0)
    throw new Error(
      "useTransactionsContext usage must be wrapped with TransactionsContext provider."
    );
  return n;
}
function Uu(n = "Copy", t = "Copied!") {
  const [e, r] = Rt(n);
  let s = null;
  function i(o) {
    navigator.clipboard.writeText(o), s && clearTimeout(s), r(t), s = setTimeout(() => r(n), 2e3);
  }
  return {
    text: e,
    onCopy: i
  };
}
function oE() {
  const {
    state: { address: n }
  } = pe(), { state: t } = vg();
  return !n || !t.txs[n] ? /* @__PURE__ */ L(on, {}) : /* @__PURE__ */ L("div", { children: /* @__PURE__ */ L("div", { className: "flex flex-col gap-1 max-h-[134px] overflow-auto pr-2", children: Object.values(t.txs[n]).sort((e, r) => (r.createdAt || 0) - (e.createdAt || 0)).map((e) => /* @__PURE__ */ L(aE, { tx: e }, e.hash)) }) });
}
function aE({ tx: n }) {
  const { text: t, onCopy: e } = Uu();
  return /* @__PURE__ */ J("div", { className: "rounded-md bg-offwhite/5 px-2 py-1", children: [
    /* @__PURE__ */ J("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ L("span", { className: "font-bold text-sm", children: /* @__PURE__ */ J(
        "a",
        {
          href: n.explorerUrl || "#",
          target: "_blank",
          title: "View on explorer",
          className: "rounded-sm",
          children: [
            n.label,
            "  ↗"
          ]
        }
      ) }),
      /* @__PURE__ */ L(
        "span",
        {
          className: Pu("text-sm", {
            "text-[#FF6188]": n.status === "failed",
            "text-[#A9DC76]": n.status === "confirmed",
            "text-[#F7AF39]": n.status === "pending"
          }),
          children: n.status
        }
      )
    ] }),
    /* @__PURE__ */ J("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ J("span", { title: n.hash, className: "text-sm", children: [
        Ag(n.hash),
        " ",
        /* @__PURE__ */ L("button", { className: "text-xs", onClick: () => e(n.hash), children: t })
      ] }),
      /* @__PURE__ */ L("span", { title: new Date(n.createdAt).toISOString(), className: "text-xs", children: new Date(n.createdAt).toISOString().slice(0, -5).replace("T", " ") })
    ] })
  ] });
}
const cE = () => ({
  list: {},
  selectedToken: ""
  // address
});
function lE(n, t) {
  var e;
  switch (t.type) {
    case "setState":
      return {
        ...n,
        ...t.payload
      };
    case "setValue":
      return {
        ...n,
        [t.payload.key]: t.payload.value
      };
    case "updateToken": {
      const r = [...((e = n.list[t.payload.owner]) == null ? void 0 : e[t.payload.chainId]) || []], s = r.findIndex((i) => i.address === t.payload.token.address);
      return s < 0 ? r.push(t.payload.token) : r[s] = t.payload.token, {
        ...n,
        list: {
          ...n.list,
          [t.payload.owner]: {
            ...n.list[t.payload.owner],
            [t.payload.chainId]: r
          }
        }
      };
    }
    default:
      throw new Error("Unhandled action type." + JSON.stringify(t));
  }
}
const xg = Jl(void 0);
function uE({ children: n }) {
  const [t, e] = Zl(lE, cE()), [r, s] = Rt(!1), { state: i, wallet: o } = pe();
  Ge(() => {
    r && localStorage.setItem(hi.TOKENS_CONTEXT, JSON.stringify(t));
  }, [t]), Ge(() => {
    var a, l;
    const h = localStorage.getItem(hi.TOKENS_CONTEXT);
    if (h)
      try {
        const u = JSON.parse(h);
        e({ type: "setState", payload: u }), Array.isArray((l = (a = u == null ? void 0 : u.list) == null ? void 0 : a[i.address]) == null ? void 0 : l[i.networkId]) && u.list[i.address][i.networkId].forEach(
          async (p) => {
            if (o) {
              const b = await o.contractRead({
                contractAddress: p.address,
                contractAbi: Ds,
                contractFunctionName: "balanceOf",
                contractFunctionValues: [i.address]
              });
              b && e({
                type: "updateToken",
                payload: {
                  owner: i.address,
                  chainId: i.networkId,
                  token: {
                    ...p,
                    balance: Ra.formatUnits(b, p.decimals)
                  }
                }
              });
            }
          }
        );
      } catch (u) {
        console.error("Cant parse context state localStorage", u);
      }
    setTimeout(() => {
      s(!0);
    }, 100);
  }, []);
  async function c(a) {
    if (o) {
      const [l, h, u, p] = await Promise.all([
        o.contractRead({
          contractAddress: a,
          contractAbi: Ds,
          contractFunctionName: "name"
        }),
        o.contractRead({
          contractAddress: a,
          contractAbi: Ds,
          contractFunctionName: "symbol"
        }),
        o.contractRead({
          contractAddress: a,
          contractAbi: Ds,
          contractFunctionName: "decimals"
        }),
        o.contractRead({
          contractAddress: a,
          contractAbi: Ds,
          contractFunctionName: "balanceOf",
          contractFunctionValues: [i.address]
        })
      ]);
      if (h)
        return {
          address: a,
          name: l,
          symbol: h,
          decimals: Number(u),
          balance: Ra.formatUnits(p, u)
        };
    }
  }
  return /* @__PURE__ */ L(
    xg.Provider,
    {
      value: {
        state: t,
        dispatch: e,
        getTokenDetails: c
      },
      children: n
    }
  );
}
function Ig() {
  const n = Yl(xg);
  if (n === void 0)
    throw new Error("useTokensContext usage must be wrapped with TokensContext provider.");
  return n;
}
function hE() {
  const { state: n, networksById: t, setScreen: e, wallet: r, handleError: s } = pe(), { state: i } = Ig(), [o, c] = Rt(""), [a, l] = Rt(""), [h, u] = Rt(!1), p = Ta(
    () => {
      var y;
      return {
        address: "",
        name: `${(y = t == null ? void 0 : t[n.networkId]) == null ? void 0 : y.name} ETH`,
        symbol: "ETH",
        decimals: 18,
        balance: n.balance
      };
    },
    [n.balance, n.networkId]
  ), b = Ta(() => {
    if (i.selectedToken) {
      const y = i.list[n.address][n.networkId];
      if (y) {
        const d = y.find((g) => g.address === i.selectedToken);
        if (d)
          return d;
      }
    }
    return p;
  }, [i.selectedToken, i.list]);
  return n.walletScreen === "selectToken" ? /* @__PURE__ */ L(fE, { nativeToken: p }) : n.walletScreen === "receiveToken" ? /* @__PURE__ */ L(dE, {}) : /* @__PURE__ */ J(
    "form",
    {
      onSubmit: async (y) => {
        if (y.preventDefault(), !h) {
          if (!o || !a) {
            console.error("Address and amount are required");
            return;
          }
          if (!r) {
            console.error("Wallet not initialized");
            return;
          }
          u(!0), s();
          try {
            b.address ? await r.signContractWrite({
              mustConfirm: !0,
              contractAbi: Ds,
              contractAddress: b.address,
              contractFunctionName: "transfer",
              contractFunctionValues: [
                o,
                Ra.parseUnits(a, b.decimals)
              ],
              label: "Transfer ERC20 token"
            }) : await r.signPlainTransaction({
              mustConfirm: !0,
              strategy: "passkey",
              tx: {
                to: o,
                data: "0x",
                gasLimit: 1e6,
                value: Ra.parseEther(a)
              },
              label: "Transfer native token"
            });
          } catch (d) {
            s(d);
          }
          u(!1);
        }
      },
      children: [
        /* @__PURE__ */ L("h2", { className: "mb-8", children: "Send tokens to address" }),
        /* @__PURE__ */ J(
          jt,
          {
            variant: "secondary",
            className: "mb-4 w-full text-left",
            onClick: () => e("selectToken"),
            children: [
              "Token: ",
              b.name,
              /* @__PURE__ */ L("br", {}),
              /* @__PURE__ */ J("span", { className: "font-normal", children: [
                "Balance: ",
                b.balance,
                " ",
                b.symbol
              ] })
            ]
          }
        ),
        /* @__PURE__ */ L(
          "input",
          {
            placeholder: "Receiver address",
            value: o,
            className: "w-full mb-4",
            onChange: (y) => c(y.target.value)
          }
        ),
        /* @__PURE__ */ L(
          "input",
          {
            placeholder: "Amount",
            value: a,
            className: "w-full mb-8",
            onChange: (y) => l(y.target.value)
          }
        ),
        /* @__PURE__ */ L(jt, { type: "submit", className: "w-full", children: "Send" })
      ]
    }
  );
}
function fE({ nativeToken: n }) {
  const { state: t, setScreen: e, handleError: r } = pe(), { state: s, dispatch: i, getTokenDetails: o } = Ig(), [c, a] = Rt(""), [l, h] = Rt(!1), u = Ta(() => {
    var p;
    return Array.isArray((p = s.list[t.address]) == null ? void 0 : p[t.networkId]) ? [n, ...s.list[t.address][t.networkId]] : [n];
  }, [s.list]);
  return /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ L("h2", { className: "mb-4", children: "Add token" }),
    /* @__PURE__ */ J(
      "form",
      {
        className: "mb-8",
        onSubmit: async (p) => {
          if (p.preventDefault(), !l) {
            if (!c) {
              console.error("No address");
              return;
            }
            h(!0), r();
            try {
              const b = await o(c);
              if (!b)
                throw new Error("Could not get token details");
              i({
                type: "updateToken",
                payload: { owner: t.address, chainId: t.networkId, token: b }
              });
            } catch (b) {
              r(b);
            }
            h(!1);
          }
        },
        children: [
          /* @__PURE__ */ L(
            "input",
            {
              placeholder: "Token address",
              value: c,
              className: "w-full mb-4",
              onChange: (p) => a(p.target.value)
            }
          ),
          /* @__PURE__ */ L(jt, { type: "submit", loading: l, className: "w-full", children: "Add" })
        ]
      }
    ),
    /* @__PURE__ */ L("h2", { className: "mb-4", children: "Select token" }),
    /* @__PURE__ */ L("div", { className: "flex flex-col gap-3", children: u.map((p) => /* @__PURE__ */ J(
      jt,
      {
        variant: "secondary",
        disabled: p.address === s.selectedToken,
        className: "w-full text-left",
        onClick: () => {
          i({
            type: "setValue",
            payload: { key: "selectedToken", value: p.address }
          }), e("sendToken");
        },
        children: [
          "Token: ",
          p.name,
          /* @__PURE__ */ L("br", {}),
          /* @__PURE__ */ J("span", { className: "font-normal", children: [
            "Balance: ",
            p.balance,
            " ",
            p.symbol
          ] })
        ]
      },
      p.address
    )) })
  ] });
}
function dE() {
  const { state: n } = pe(), { text: t, onCopy: e } = Uu();
  return n.address ? /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ L("div", { className: "p-4 mb-4", children: /* @__PURE__ */ L(
      D0,
      {
        value: `ethereum:${n.address}`,
        size: 256,
        style: { height: "auto", maxWidth: "100%", width: "256px", margin: "0 auto" },
        viewBox: "0 0 256 256"
      }
    ) }),
    /* @__PURE__ */ L("input", { readOnly: !0, value: n.address, className: "w-full mb-4" }),
    /* @__PURE__ */ L(jt, { className: "w-full", onClick: () => e(n.address), children: t })
  ] }) : /* @__PURE__ */ L(on, {});
}
function pE() {
  const { wallet: n, state: t, dispatch: e, networksById: r, setScreen: s } = pe(), i = Ta(() => t.walletScreen === "main" ? { key: "networks", label: "Change" } : t.walletScreen === "selectToken" ? { key: "sendToken", label: "Back" } : { key: "main", label: "Back" }, [t.walletScreen]);
  return /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ L("div", { className: "text-center -mt-4 sm:-mt-8 mb-4", children: /* @__PURE__ */ J("div", { className: "inline-block opacity-50 hover:opacity-100", children: [
      /* @__PURE__ */ L("p", { children: t.networkId && r[t.networkId] ? r[t.networkId].name : "No network" }),
      /* @__PURE__ */ L("p", { children: /* @__PURE__ */ L("button", { className: "text-sm", onClick: () => s(i.key), children: i.label }) })
    ] }) }),
    /* @__PURE__ */ L(No, { show: !0, className: "mb-2" }),
    t.walletScreen === "main" && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ L(gE, { className: "mb-6" }),
      /* @__PURE__ */ J("div", { className: "flex gap-4 mb-6", children: [
        /* @__PURE__ */ L(jt, { minWidth: "0", className: "w-full", onClick: () => s("sendToken"), children: "Send" }),
        /* @__PURE__ */ L(jt, { minWidth: "0", className: "w-full", onClick: () => s("receiveToken"), children: "Receive" })
      ] }),
      /* @__PURE__ */ J("div", { className: "mb-8", children: [
        /* @__PURE__ */ L("h3", { className: "mb-2", children: "Transactions" }),
        /* @__PURE__ */ L(oE, {})
      ] }),
      /* @__PURE__ */ L(
        jt,
        {
          variant: "secondary",
          className: "w-full",
          onClick: () => {
            e({ type: "reset" }), n == null || n.setAccount({
              username: "",
              address: "",
              contractAddress: "",
              strategy: "passkey"
            });
          },
          children: "Disconnect wallet"
        }
      )
    ] }),
    t.walletScreen === "networks" && /* @__PURE__ */ L("div", { children: /* @__PURE__ */ L(nE, {}) }),
    ["sendToken", "selectToken", "receiveToken"].includes(t.walletScreen) && /* @__PURE__ */ L("div", { children: /* @__PURE__ */ L(uE, { children: /* @__PURE__ */ L(hE, {}) }) })
  ] });
}
function gE({ className: n }) {
  const { state: t } = pe(), { text: e, onCopy: r } = Uu();
  return /* @__PURE__ */ J("div", { className: n, children: [
    /* @__PURE__ */ J("h2", { className: "break-all mb-1", children: [
      "Hi, ",
      t.username
    ] }),
    /* @__PURE__ */ J("p", { title: t.address, className: "text-xl", children: [
      /* @__PURE__ */ L("span", { className: "mr-2", children: Ag(t.address) }),
      /* @__PURE__ */ L("button", { className: "text-sm", onClick: () => r(t.address), children: e })
    ] }),
    /* @__PURE__ */ J("p", { children: [
      t.balance,
      " ETH"
    ] })
  ] });
}
function yE({
  tx: n,
  signMessage: t,
  contractFunctionData: e,
  approveText: r = "Approve",
  declineText: s = "Reject",
  onApprove: i,
  onDecline: o
}) {
  const { networksById: c, wallet: a, dispatch: l } = pe(), [h, u] = Rt(!1), p = "bg-offwhite/25 p-3 whitespace-pre-wrap break-all rounded-sm mt-2";
  return /* @__PURE__ */ J(on, { children: [
    !!t && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ L("h2", { className: "mb-6", children: "Sign Message" }),
      /* @__PURE__ */ J("p", { className: "break-all", children: [
        "You are signing:",
        /* @__PURE__ */ L("br", {}),
        t
      ] })
    ] }),
    !!n && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ L("h2", { className: "mb-6", children: "Approve Transaction" }),
      Object.entries(n).map(([b, y]) => /* @__PURE__ */ J("div", { className: "mb-2 break-all", children: [
        /* @__PURE__ */ L("p", { className: "font-bold text-sm", children: b }),
        /* @__PURE__ */ L(
          "div",
          {
            style: { maxHeight: "220px" },
            className: "overflow-auto pr-8 -mr-8 sm:pr-12 sm:-mr-12",
            children: typeof y == "bigint" ? y.toString() : typeof y == "object" ? /* @__PURE__ */ L("pre", { className: p, children: JSON.stringify(
              n,
              (d, g) => typeof g == "bigint" ? g.toString() : g,
              2
            ) }) : y
          }
        )
      ] }, b))
    ] }),
    !!e && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ L("h2", { className: "mb-6", children: "Approve Contract Transaction" }),
      !!e.chainId && !!c[e.chainId] && /* @__PURE__ */ J("div", { children: [
        /* @__PURE__ */ L("p", { className: "font-bold text-sm", children: "Chain" }),
        c[e.chainId].name
      ] }),
      /* @__PURE__ */ J("div", { className: "mb-3 break-all", children: [
        /* @__PURE__ */ L("p", { className: "font-bold text-sm", children: "Contract address" }),
        e.contractAddress
      ] }),
      /* @__PURE__ */ J("div", { className: "mb-3 break-all", children: [
        /* @__PURE__ */ L("p", { className: "font-bold text-sm", children: "Contract function" }),
        e.contractFunctionName
      ] }),
      !!e.contractFunctionValues && !!e.contractFunctionValues.length && /* @__PURE__ */ J("div", { className: "break-all", children: [
        /* @__PURE__ */ L("p", { className: "font-bold text-sm", children: "Contract function values" }),
        /* @__PURE__ */ L("pre", { className: p, children: JSON.stringify(
          e.contractFunctionValues,
          (b, y) => typeof y == "bigint" ? y.toString() : y,
          2
        ) })
      ] })
    ] }),
    /* @__PURE__ */ L(No, { show: !0, className: "mt-6 -mb-6" }),
    /* @__PURE__ */ J("div", { className: "mt-12 flex gap-4", children: [
      /* @__PURE__ */ L(
        jt,
        {
          loading: h,
          className: "w-full",
          onClick: async () => {
            u(!0), await i(), u(!1);
          },
          children: r
        }
      ),
      /* @__PURE__ */ L(jt, { variant: "secondary", disabled: h, className: "w-full", onClick: o, children: s })
    ] }),
    /* @__PURE__ */ L("div", { className: "mt-4 text-center", children: /* @__PURE__ */ L(
      "button",
      {
        onClick: () => {
          a == null || a.setAccount({
            username: "",
            address: "",
            contractAddress: "",
            strategy: "passkey"
          }), l({
            type: "setState",
            payload: {
              username: "",
              address: "",
              contractAddress: "",
              balance: "",
              authStrategy: "passkey"
            }
          });
        },
        children: "Use another account"
      }
    ) })
  ] });
}
function mE({
  disableAutoBroadcastAfterSign: n = !1,
  disableDefaultActivatorStyle: t = !1,
  ...e
}) {
  const { state: r, wallet: s, setScreen: i, handleError: o, reloadUserBalance: c } = pe(), { dispatch: a } = vg(), [l, h] = Rt(!1), [u, p] = Rt(), [b, y] = Rt(), [d, g] = Rt(""), [w, I] = Rt({
    title: "",
    txHash: "",
    explorerUrl: ""
  }), v = dr(), T = r.username && r.address;
  Ge(() => {
    const N = (V) => {
      var $;
      V.plain ? (p(($ = V.plain) == null ? void 0 : $.tx), v.current = V, h(!0)) : V.contractWrite && (y({
        chainId: V.contractWrite.chainId,
        contractAddress: V.contractWrite.contractAddress,
        contractFunctionName: V.contractWrite.contractFunctionName,
        contractFunctionValues: V.contractWrite.contractFunctionValues
      }), v.current = V, h(!0));
    }, O = (V) => {
      g(V.message), v.current = { signature: V }, h(!0);
    }, _ = (V) => {
      a({ type: "addTx", payload: V });
    }, U = () => {
      h(!0);
    }, P = (V) => {
      V.name === "defaultNetworkId" && c();
    };
    return s && (s.events.on("txApprove", N), s.events.on("signatureRequest", O), s.events.on("txSubmitted", _), s.events.on("providerRequestAccounts", U), s.events.on("dataUpdated", P)), () => {
      s && (s.events.off("txApprove", N), s.events.off("signatureRequest", O), s.events.off("txSubmitted", _), s.events.off("providerRequestAccounts", U), s.events.off("dataUpdated", P));
    };
  }, [s]), Ge(() => {
    l || ((u || d || b) && k(), r.walletScreen !== "main" && setTimeout(() => {
      i("main");
    }, 200), s && s.waitForAccountResolver && (s.waitForAccountResolver(""), s.waitForAccountResolver = null));
  }, [l]);
  function k() {
    h(!1), setTimeout(() => {
      p(void 0), y(void 0), g(""), I({
        title: "",
        txHash: "",
        explorerUrl: ""
      });
    }, 200);
  }
  let x = /* @__PURE__ */ L(on, {});
  return T ? u || d || b ? w.title ? x = /* @__PURE__ */ J("div", { className: "text-center", children: [
    /* @__PURE__ */ L("h2", { className: "mb-6", children: w.title }),
    !!w.explorerUrl && /* @__PURE__ */ L("p", { className: "mb-6", children: /* @__PURE__ */ L(jt, { variant: "secondary", href: w.explorerUrl, blank: !0, children: "View on explorer" }) }),
    !!w.txHash && /* @__PURE__ */ J("p", { className: "break-all my-3", children: [
      "Transaction hash: ",
      w.txHash
    ] }),
    /* @__PURE__ */ L("div", { className: "mt-12", children: /* @__PURE__ */ L(jt, { onClick: () => k(), children: "Close" }) })
  ] }) : x = /* @__PURE__ */ L(
    yE,
    {
      tx: u,
      signMessage: d,
      contractFunctionData: b,
      onApprove: async () => {
        if (v.current)
          try {
            if (o(), v.current.signature)
              await (s == null ? void 0 : s.signMessage({
                ...v.current.signature,
                authData: { username: r.username }
              })), k();
            else if (v.current.plain) {
              const N = await (s == null ? void 0 : s.signPlainTransaction({
                ...v.current.plain,
                authData: { username: r.username }
              }));
              if (n)
                k();
              else if (N) {
                const { signedTxData: O, chainId: _ } = N, U = await (s == null ? void 0 : s.broadcastTransaction(
                  O,
                  _,
                  v.current.plain.label || "Transaction"
                ));
                I({
                  title: "Transaction submitted",
                  explorerUrl: (U == null ? void 0 : U.txItem.explorerUrl) || "",
                  txHash: (U == null ? void 0 : U.txHash) || ""
                });
              }
            } else if (v.current.contractWrite) {
              const N = await (s == null ? void 0 : s.signContractWrite({
                ...v.current.contractWrite,
                authData: { username: r.username }
              }));
              if (n)
                k();
              else if (N) {
                const { signedTxData: O, chainId: _ } = N, U = await (s == null ? void 0 : s.broadcastTransaction(
                  O,
                  _,
                  v.current.contractWrite.label || "Transaction"
                ));
                I({
                  title: "Transaction submitted",
                  explorerUrl: (U == null ? void 0 : U.txItem.explorerUrl) || "",
                  txHash: (U == null ? void 0 : U.txHash) || ""
                });
              }
            }
          } catch (N) {
            o(N);
          }
      },
      onDecline: () => {
        var N, O, _, U, P, V;
        k(), (O = (N = v.current) == null ? void 0 : N.contractWrite) != null && O.reject ? v.current.contractWrite.reject(new _c()) : (U = (_ = v.current) == null ? void 0 : _.plain) != null && U.reject ? v.current.plain.reject(new _c()) : (V = (P = v.current) == null ? void 0 : P.signature) != null && V.reject && v.current.signature.reject(new _c());
      }
    }
  ) : x = /* @__PURE__ */ L(pE, {}) : x = /* @__PURE__ */ L(tE, { ...e }), /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ L(wE, { isOpen: l, setIsOpen: h, children: x }),
    /* @__PURE__ */ L(
      "button",
      {
        id: "oaw-wallet-widget-btn",
        className: t ? void 0 : "oaw-btn-default-style",
        onClick: () => h(!0),
        children: T ? "Open wallet" : "Sign in"
      }
    )
  ] });
}
function wE({
  children: n,
  isOpen: t,
  setIsOpen: e
}) {
  return /* @__PURE__ */ L(on, { children: /* @__PURE__ */ L(T0, { show: t, children: /* @__PURE__ */ J(
    R0,
    {
      id: "oaw-wallet-widget",
      open: t,
      style: {
        position: "relative",
        zIndex: "10001"
      },
      onClose: () => e(!1),
      children: [
        /* @__PURE__ */ L(
          Ku,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ L("div", { className: "fixed inset-0 bg-black/50", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ L(
          Ku,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 scale-95",
            enterTo: "opacity-100 scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 scale-100",
            leaveTo: "opacity-0 scale-95",
            children: /* @__PURE__ */ L("div", { className: "fixed inset-0 w-screen overflow-y-auto p-4", children: /* @__PURE__ */ L("div", { className: "flex items-center justify-center min-h-full", children: /* @__PURE__ */ J(C0, { className: "relative max-w-lg w-full min-h-[600px] bg-dark p-8 sm:py-16 sm:px-12 border border-brightdark text-offwhite", children: [
              /* @__PURE__ */ L("button", { className: "absolute top-2 right-2", onClick: () => e(!1), children: /* @__PURE__ */ L(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ L(
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
              n
            ] }) }) })
          }
        )
      ]
    }
  ) }) });
}
function bE(n) {
  return /* @__PURE__ */ L(K1, { ...n, children: /* @__PURE__ */ L(iE, { children: /* @__PURE__ */ L(mE, { ...n }) }) });
}
function AE(n, t) {
  if (typeof document > "u") {
    console.error("Cannot initialize embedded wallet app UI");
    return;
  }
  let e = null;
  e = document.querySelector(n), e || (e = document.createElement("div"), e.id = "embedded-wallet", e.setAttribute("style", "display: none;"), document.body.appendChild(e)), Ii.createRoot(e).render(
    /* @__PURE__ */ L(O0.StrictMode, { children: /* @__PURE__ */ L(bE, { ...t }) })
  );
}
const EE = { id: "embedded-wallet-activator-vue" }, Rx = /* @__PURE__ */ b0({
  __name: "WalletWidget",
  props: {
    networks: {},
    disableAutoBroadcastAfterSign: { type: Boolean },
    disableDefaultActivatorStyle: { type: Boolean },
    authFormPlaceholder: {},
    isAuthEmail: { type: Boolean },
    isEmailConfirm: { type: Boolean },
    onEmailConfirmRequest: { type: Function },
    onEmailConfirm: { type: Function },
    test: { type: Boolean },
    accountManagerAddress: {},
    defaultNetworkId: {},
    networkConfig: {},
    onGetSignature: { type: Function },
    onGetApillonSessionToken: { type: Function }
  },
  setup(n) {
    const t = n;
    return jf(() => {
      AE("#embedded-wallet-activator-vue", t);
    }), (e, r) => (A0(), E0("div", EE));
  }
}), vE = "6.13.1";
function If(n, t, e) {
  for (let r in t) {
    let s = t[r];
    Object.defineProperty(n, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function js(n) {
  if (n == null)
    return "null";
  if (Array.isArray(n))
    return "[ " + n.map(js).join(", ") + " ]";
  if (n instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let r = 0; r < n.length; r++)
      e += t[n[r] >> 4], e += t[n[r] & 15];
    return e;
  }
  if (typeof n == "object" && typeof n.toJSON == "function")
    return js(n.toJSON());
  switch (typeof n) {
    case "boolean":
    case "symbol":
      return n.toString();
    case "bigint":
      return BigInt(n).toString();
    case "number":
      return n.toString();
    case "string":
      return JSON.stringify(n);
    case "object": {
      const t = Object.keys(n);
      return t.sort(), "{ " + t.map((e) => `${js(e)}: ${js(n[e])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function xE(n, t, e) {
  let r = n;
  {
    const i = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${js(e)}`);
      for (const o in e) {
        if (o === "shortMessage")
          continue;
        const c = e[o];
        i.push(o + "=" + js(c));
      }
    }
    i.push(`code=${t}`), i.push(`version=${vE}`), i.length && (n += " (" + i.join(", ") + ")");
  }
  let s;
  switch (t) {
    case "INVALID_ARGUMENT":
      s = new TypeError(n);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(n);
      break;
    default:
      s = new Error(n);
  }
  return If(s, { code: t }), e && Object.assign(s, e), s.shortMessage == null && If(s, { shortMessage: r }), s;
}
function Lu(n, t, e, r) {
  if (!n)
    throw xE(t, e, r);
}
function _e(n, t, e, r) {
  Lu(n, t, "INVALID_ARGUMENT", { argument: e, value: r });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((n, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD" && "é".normalize("NFD") !== "é")
      throw new Error("broken");
    n.push(t);
  } catch {
  }
  return n;
}, []);
function IE(n, t, e) {
  if (n instanceof Uint8Array)
    return n;
  if (typeof n == "string" && n.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((n.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(n.substring(s, s + 2), 16), s += 2;
    return r;
  }
  _e(!1, "invalid BytesLike value", t || "value", n);
}
function Du(n, t) {
  return IE(n, t);
}
const Nf = "0123456789abcdef";
function Ng(n) {
  const t = Du(n);
  let e = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    e += Nf[(s & 240) >> 4] + Nf[s & 15];
  }
  return e;
}
const NE = BigInt(0);
BigInt(1);
const Ws = 9007199254740991;
function BE(n, t) {
  switch (typeof n) {
    case "bigint":
      return n;
    case "number":
      return _e(Number.isInteger(n), "underflow", t || "value", n), _e(n >= -Ws && n <= Ws, "overflow", t || "value", n), BigInt(n);
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return n[0] === "-" && n[1] !== "-" ? -BigInt(n.substring(1)) : BigInt(n);
      } catch (e) {
        _e(!1, `invalid BigNumberish string: ${e.message}`, t || "value", n);
      }
  }
  _e(!1, "invalid BigNumberish value", t || "value", n);
}
function OE(n, t) {
  const e = BE(n, t);
  return Lu(e >= NE, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: n
  }), e;
}
function Bg(n, t) {
  switch (typeof n) {
    case "bigint":
      return _e(n >= -Ws && n <= Ws, "overflow", t || "value", n), Number(n);
    case "number":
      return _e(Number.isInteger(n), "underflow", t || "value", n), _e(n >= -Ws && n <= Ws, "overflow", t || "value", n), n;
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return Bg(BigInt(n), t);
      } catch (e) {
        _e(!1, `invalid numeric string: ${e.message}`, t || "value", n);
      }
  }
  _e(!1, "invalid numeric value", t || "value", n);
}
function Og(n, t) {
  let e = OE(n, "value").toString(16);
  {
    const r = Bg(t, "width");
    for (Lu(r * 2 >= e.length, `value exceeds width (${r} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: n
    }); e.length < r * 2; )
      e = "0" + e;
  }
  return "0x" + e;
}
BigInt(0);
BigInt(58);
BigInt(-1);
BigInt(0);
BigInt(1);
BigInt(5);
let Gc = "0000";
for (; Gc.length < 80; )
  Gc += Gc;
const Bf = globalThis || void 0 || self;
function Wa(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function Fu(n, ...t) {
  if (!(n instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${n.length}`);
}
function kE(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Wa(n.outputLen), Wa(n.blockLen);
}
function fi(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function kg(n, t) {
  Fu(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const Vc = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Sg = (n) => n instanceof Uint8Array, SE = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4)), $c = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), ze = (n, t) => n << 32 - t | n >>> t, TE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!TE)
  throw new Error("Non little-endian hardware is not supported");
function RE(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function hc(n) {
  if (typeof n == "string" && (n = RE(n)), !Sg(n))
    throw new Error(`expected Uint8Array, got ${typeof n}`);
  return n;
}
function CE(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!Sg(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
let Mu = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function Hu(n) {
  const t = (r) => n().update(hc(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function PE(n = 32) {
  if (Vc && typeof Vc.getRandomValues == "function")
    return Vc.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
let Tg = class extends Mu {
  constructor(n, t) {
    super(), this.finished = !1, this.destroyed = !1, kE(n);
    const e = hc(t);
    if (this.iHash = n.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const r = this.blockLen, s = new Uint8Array(r);
    s.set(e.length > r ? n.create().update(e).digest() : e);
    for (let i = 0; i < s.length; i++)
      s[i] ^= 54;
    this.iHash.update(s), this.oHash = n.create();
    for (let i = 0; i < s.length; i++)
      s[i] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(n) {
    return fi(this), this.iHash.update(n), this;
  }
  digestInto(n) {
    fi(this), Fu(n, this.outputLen), this.finished = !0, this.iHash.digestInto(n), this.oHash.update(n), this.oHash.digestInto(n), this.destroy();
  }
  digest() {
    const n = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(n), n;
  }
  _cloneInto(n) {
    n || (n = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: e, finished: r, destroyed: s, blockLen: i, outputLen: o } = this;
    return n = n, n.finished = r, n.destroyed = s, n.blockLen = i, n.outputLen = o, n.oHash = t._cloneInto(n.oHash), n.iHash = e._cloneInto(n.iHash), n;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const Rg = (n, t, e) => new Tg(n, t).update(e).digest();
Rg.create = (n, t) => new Tg(n, t);
function UE(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), c = Number(e & i), a = r ? 4 : 0, l = r ? 0 : 4;
  n.setUint32(t + a, o, r), n.setUint32(t + l, c, r);
}
class Cg extends Mu {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = $c(this.buffer);
  }
  update(t) {
    fi(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = hc(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const a = $c(t);
        for (; s <= i - o; o += s)
          this.process(a, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    fi(this), kg(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let u = o; u < s; u++)
      e[u] = 0;
    UE(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = $c(t), a = this.outputLen;
    if (a % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = a / 4, h = this.get();
    if (l > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++)
      c.setUint32(4 * u, h[u], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return t.length = s, t.pos = c, t.finished = i, t.destroyed = o, s % e && t.buffer.set(r), t;
  }
}
const LE = (n, t, e) => n & t ^ ~n & e, DE = (n, t, e) => n & t ^ n & e ^ t & e, FE = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), Hn = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), _n = /* @__PURE__ */ new Uint32Array(64);
let ME = class extends Cg {
  constructor() {
    super(64, 32, 8, !1), this.A = Hn[0] | 0, this.B = Hn[1] | 0, this.C = Hn[2] | 0, this.D = Hn[3] | 0, this.E = Hn[4] | 0, this.F = Hn[5] | 0, this.G = Hn[6] | 0, this.H = Hn[7] | 0;
  }
  get() {
    const { A: n, B: t, C: e, D: r, E: s, F: i, G: o, H: c } = this;
    return [n, t, e, r, s, i, o, c];
  }
  // prettier-ignore
  set(n, t, e, r, s, i, o, c) {
    this.A = n | 0, this.B = t | 0, this.C = e | 0, this.D = r | 0, this.E = s | 0, this.F = i | 0, this.G = o | 0, this.H = c | 0;
  }
  process(n, t) {
    for (let h = 0; h < 16; h++, t += 4)
      _n[h] = n.getUint32(t, !1);
    for (let h = 16; h < 64; h++) {
      const u = _n[h - 15], p = _n[h - 2], b = ze(u, 7) ^ ze(u, 18) ^ u >>> 3, y = ze(p, 17) ^ ze(p, 19) ^ p >>> 10;
      _n[h] = y + _n[h - 7] + b + _n[h - 16] | 0;
    }
    let { A: e, B: r, C: s, D: i, E: o, F: c, G: a, H: l } = this;
    for (let h = 0; h < 64; h++) {
      const u = ze(o, 6) ^ ze(o, 11) ^ ze(o, 25), p = l + u + LE(o, c, a) + FE[h] + _n[h] | 0, b = (ze(e, 2) ^ ze(e, 13) ^ ze(e, 22)) + DE(e, r, s) | 0;
      l = a, a = c, c = o, o = i + p | 0, i = s, s = r, r = e, e = p + b | 0;
    }
    e = e + this.A | 0, r = r + this.B | 0, s = s + this.C | 0, i = i + this.D | 0, o = o + this.E | 0, c = c + this.F | 0, a = a + this.G | 0, l = l + this.H | 0, this.set(e, r, s, i, o, c, a, l);
  }
  roundClean() {
    _n.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Pg = /* @__PURE__ */ Hu(() => new ME()), ra = /* @__PURE__ */ BigInt(2 ** 32 - 1), $l = /* @__PURE__ */ BigInt(32);
function Ug(n, t = !1) {
  return t ? { h: Number(n & ra), l: Number(n >> $l & ra) } : { h: Number(n >> $l & ra) | 0, l: Number(n & ra) | 0 };
}
function Lg(n, t = !1) {
  let e = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: i, l: o } = Ug(n[s], t);
    [e[s], r[s]] = [i, o];
  }
  return [e, r];
}
const HE = (n, t) => BigInt(n >>> 0) << $l | BigInt(t >>> 0), _E = (n, t, e) => n >>> e, GE = (n, t, e) => n << 32 - e | t >>> e, VE = (n, t, e) => n >>> e | t << 32 - e, $E = (n, t, e) => n << 32 - e | t >>> e, jE = (n, t, e) => n << 64 - e | t >>> e - 32, WE = (n, t, e) => n >>> e - 32 | t << 64 - e, zE = (n, t) => t, QE = (n, t) => n, Dg = (n, t, e) => n << e | t >>> 32 - e, Fg = (n, t, e) => t << e | n >>> 32 - e, Mg = (n, t, e) => t << e - 32 | n >>> 64 - e, Hg = (n, t, e) => n << e - 32 | t >>> 64 - e;
function qE(n, t, e, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: n + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const KE = (n, t, e) => (n >>> 0) + (t >>> 0) + (e >>> 0), JE = (n, t, e, r) => t + e + r + (n / 2 ** 32 | 0) | 0, ZE = (n, t, e, r) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0), YE = (n, t, e, r, s) => t + e + r + s + (n / 2 ** 32 | 0) | 0, XE = (n, t, e, r, s) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0) + (s >>> 0), t2 = (n, t, e, r, s, i) => t + e + r + s + i + (n / 2 ** 32 | 0) | 0, tt = {
  fromBig: Ug,
  split: Lg,
  toBig: HE,
  shrSH: _E,
  shrSL: GE,
  rotrSH: VE,
  rotrSL: $E,
  rotrBH: jE,
  rotrBL: WE,
  rotr32H: zE,
  rotr32L: QE,
  rotlSH: Dg,
  rotlSL: Fg,
  rotlBH: Mg,
  rotlBL: Hg,
  add: qE,
  add3L: KE,
  add3H: JE,
  add4L: ZE,
  add4H: YE,
  add5H: t2,
  add5L: XE
}, [e2, n2] = tt.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((n) => BigInt(n))), Gn = /* @__PURE__ */ new Uint32Array(80), Vn = /* @__PURE__ */ new Uint32Array(80);
class r2 extends Cg {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: r, Bl: s, Ch: i, Cl: o, Dh: c, Dl: a, Eh: l, El: h, Fh: u, Fl: p, Gh: b, Gl: y, Hh: d, Hl: g } = this;
    return [t, e, r, s, i, o, c, a, l, h, u, p, b, y, d, g];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, c, a, l, h, u, p, b, y, d, g) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = c | 0, this.Dl = a | 0, this.Eh = l | 0, this.El = h | 0, this.Fh = u | 0, this.Fl = p | 0, this.Gh = b | 0, this.Gl = y | 0, this.Hh = d | 0, this.Hl = g | 0;
  }
  process(t, e) {
    for (let v = 0; v < 16; v++, e += 4)
      Gn[v] = t.getUint32(e), Vn[v] = t.getUint32(e += 4);
    for (let v = 16; v < 80; v++) {
      const T = Gn[v - 15] | 0, k = Vn[v - 15] | 0, x = tt.rotrSH(T, k, 1) ^ tt.rotrSH(T, k, 8) ^ tt.shrSH(T, k, 7), N = tt.rotrSL(T, k, 1) ^ tt.rotrSL(T, k, 8) ^ tt.shrSL(T, k, 7), O = Gn[v - 2] | 0, _ = Vn[v - 2] | 0, U = tt.rotrSH(O, _, 19) ^ tt.rotrBH(O, _, 61) ^ tt.shrSH(O, _, 6), P = tt.rotrSL(O, _, 19) ^ tt.rotrBL(O, _, 61) ^ tt.shrSL(O, _, 6), V = tt.add4L(N, P, Vn[v - 7], Vn[v - 16]), $ = tt.add4H(V, x, U, Gn[v - 7], Gn[v - 16]);
      Gn[v] = $ | 0, Vn[v] = V | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: c, Cl: a, Dh: l, Dl: h, Eh: u, El: p, Fh: b, Fl: y, Gh: d, Gl: g, Hh: w, Hl: I } = this;
    for (let v = 0; v < 80; v++) {
      const T = tt.rotrSH(u, p, 14) ^ tt.rotrSH(u, p, 18) ^ tt.rotrBH(u, p, 41), k = tt.rotrSL(u, p, 14) ^ tt.rotrSL(u, p, 18) ^ tt.rotrBL(u, p, 41), x = u & b ^ ~u & d, N = p & y ^ ~p & g, O = tt.add5L(I, k, N, n2[v], Vn[v]), _ = tt.add5H(O, w, T, x, e2[v], Gn[v]), U = O | 0, P = tt.rotrSH(r, s, 28) ^ tt.rotrBH(r, s, 34) ^ tt.rotrBH(r, s, 39), V = tt.rotrSL(r, s, 28) ^ tt.rotrBL(r, s, 34) ^ tt.rotrBL(r, s, 39), $ = r & i ^ r & c ^ i & c, rt = s & o ^ s & a ^ o & a;
      w = d | 0, I = g | 0, d = b | 0, g = y | 0, b = u | 0, y = p | 0, { h: u, l: p } = tt.add(l | 0, h | 0, _ | 0, U | 0), l = c | 0, h = a | 0, c = i | 0, a = o | 0, i = r | 0, o = s | 0;
      const m = tt.add3L(U, V, rt);
      r = tt.add3H(m, _, P, $), s = m | 0;
    }
    ({ h: r, l: s } = tt.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = tt.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: c, l: a } = tt.add(this.Ch | 0, this.Cl | 0, c | 0, a | 0), { h: l, l: h } = tt.add(this.Dh | 0, this.Dl | 0, l | 0, h | 0), { h: u, l: p } = tt.add(this.Eh | 0, this.El | 0, u | 0, p | 0), { h: b, l: y } = tt.add(this.Fh | 0, this.Fl | 0, b | 0, y | 0), { h: d, l: g } = tt.add(this.Gh | 0, this.Gl | 0, d | 0, g | 0), { h: w, l: I } = tt.add(this.Hh | 0, this.Hl | 0, w | 0, I | 0), this.set(r, s, i, o, c, a, l, h, u, p, b, y, d, g, w, I);
  }
  roundClean() {
    Gn.fill(0), Vn.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const s2 = /* @__PURE__ */ Hu(() => new r2());
function i2() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof Bf < "u")
    return Bf;
  throw new Error("unable to locate global object");
}
const Of = i2();
Of.crypto || Of.msCrypto;
function o2(n) {
  switch (n) {
    case "sha256":
      return Pg.create();
    case "sha512":
      return s2.create();
  }
  _e(!1, "invalid hashing algorithm name", "algorithm", n);
}
const [_g, Gg, Vg] = [[], [], []], a2 = /* @__PURE__ */ BigInt(0), xi = /* @__PURE__ */ BigInt(1), c2 = /* @__PURE__ */ BigInt(2), l2 = /* @__PURE__ */ BigInt(7), u2 = /* @__PURE__ */ BigInt(256), h2 = /* @__PURE__ */ BigInt(113);
for (let n = 0, t = xi, e = 1, r = 0; n < 24; n++) {
  [e, r] = [r, (2 * e + 3 * r) % 5], _g.push(2 * (5 * r + e)), Gg.push((n + 1) * (n + 2) / 2 % 64);
  let s = a2;
  for (let i = 0; i < 7; i++)
    t = (t << xi ^ (t >> l2) * h2) % u2, t & c2 && (s ^= xi << (xi << /* @__PURE__ */ BigInt(i)) - xi);
  Vg.push(s);
}
const [f2, d2] = /* @__PURE__ */ Lg(Vg, !0), kf = (n, t, e) => e > 32 ? Mg(n, t, e) : Dg(n, t, e), Sf = (n, t, e) => e > 32 ? Hg(n, t, e) : Fg(n, t, e);
function p2(n, t = 24) {
  const e = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      e[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const c = (o + 8) % 10, a = (o + 2) % 10, l = e[a], h = e[a + 1], u = kf(l, h, 1) ^ e[c], p = Sf(l, h, 1) ^ e[c + 1];
      for (let b = 0; b < 50; b += 10)
        n[o + b] ^= u, n[o + b + 1] ^= p;
    }
    let s = n[2], i = n[3];
    for (let o = 0; o < 24; o++) {
      const c = Gg[o], a = kf(s, i, c), l = Sf(s, i, c), h = _g[o];
      s = n[h], i = n[h + 1], n[h] = a, n[h + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let c = 0; c < 10; c++)
        e[c] = n[o + c];
      for (let c = 0; c < 10; c++)
        n[o + c] ^= ~e[(c + 2) % 10] & e[(c + 4) % 10];
    }
    n[0] ^= f2[r], n[1] ^= d2[r];
  }
  e.fill(0);
}
let g2 = class $g extends Mu {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Wa(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = SE(this.state);
  }
  keccak() {
    p2(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    fi(this);
    const { blockLen: e, state: r } = this;
    t = hc(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(e - this.pos, s - i);
      for (let c = 0; c < o; c++)
        r[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: r, blockLen: s } = this;
    t[r] ^= e, e & 128 && r === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    fi(this, !1), Fu(t), this.finish();
    const e = this.state, { blockLen: r } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, i - s);
      t.set(e.subarray(this.posOut, this.posOut + o), s), this.posOut += o, s += o;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Wa(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (kg(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: r, outputLen: s, rounds: i, enableXOF: o } = this;
    return t || (t = new $g(e, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const y2 = (n, t, e) => Hu(() => new g2(t, n, e)), m2 = /* @__PURE__ */ y2(1, 136, 256 / 8);
let jg = !1;
const Wg = function(n) {
  return m2(n);
};
let zg = Wg;
function fc(n) {
  const t = Du(n, "data");
  return Ng(zg(t));
}
fc._ = Wg;
fc.lock = function() {
  jg = !0;
};
fc.register = function(n) {
  if (jg)
    throw new TypeError("keccak256 is locked");
  zg = n;
};
Object.freeze(fc);
const Qg = function(n) {
  return o2("sha256").update(n).digest();
};
let qg = Qg, Kg = !1;
function jo(n) {
  const t = Du(n, "data");
  return Ng(qg(t));
}
jo._ = Qg;
jo.lock = function() {
  Kg = !0;
};
jo.register = function(n) {
  if (Kg)
    throw new Error("sha256 is locked");
  qg = n;
};
Object.freeze(jo);
Object.freeze(jo);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Jg = BigInt(0), dc = BigInt(1), w2 = BigInt(2), pc = (n) => n instanceof Uint8Array, b2 = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function di(n) {
  if (!pc(n))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += b2[n[e]];
  return t;
}
function Zg(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function _u(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
function pi(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const e = new Uint8Array(t / 2);
  for (let r = 0; r < e.length; r++) {
    const s = r * 2, i = n.slice(s, s + 2), o = Number.parseInt(i, 16);
    if (Number.isNaN(o) || o < 0)
      throw new Error("Invalid byte sequence");
    e[r] = o;
  }
  return e;
}
function ts(n) {
  return _u(di(n));
}
function Gu(n) {
  if (!pc(n))
    throw new Error("Uint8Array expected");
  return _u(di(Uint8Array.from(n).reverse()));
}
function gi(n, t) {
  return pi(n.toString(16).padStart(t * 2, "0"));
}
function Vu(n, t) {
  return gi(n, t).reverse();
}
function A2(n) {
  return pi(Zg(n));
}
function Le(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = pi(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (pc(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function Uo(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!pc(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
function E2(n, t) {
  if (n.length !== t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !1;
  return !0;
}
function v2(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function x2(n) {
  let t;
  for (t = 0; n > Jg; n >>= dc, t += 1)
    ;
  return t;
}
function I2(n, t) {
  return n >> BigInt(t) & dc;
}
const N2 = (n, t, e) => n | (e ? dc : Jg) << BigInt(t), $u = (n) => (w2 << BigInt(n - 1)) - dc, jc = (n) => new Uint8Array(n), Tf = (n) => Uint8Array.from(n);
function Yg(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = jc(n), s = jc(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...h) => e(s, r, ...h), a = (h = jc()) => {
    s = c(Tf([0]), h), r = c(), h.length !== 0 && (s = c(Tf([1]), h), r = c());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const u = [];
    for (; h < t; ) {
      r = c();
      const p = r.slice();
      u.push(p), h += r.length;
    }
    return Uo(...u);
  };
  return (h, u) => {
    o(), a(h);
    let p;
    for (; !(p = u(l())); )
      a();
    return o(), p;
  };
}
const B2 = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || n instanceof Uint8Array,
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function Wo(n, t, e = {}) {
  const r = (s, i, o) => {
    const c = B2[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const a = n[s];
    if (!(o && a === void 0) && !c(a, n))
      throw new Error(`Invalid param ${String(s)}=${a} (${typeof a}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const O2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: I2,
  bitLen: x2,
  bitMask: $u,
  bitSet: N2,
  bytesToHex: di,
  bytesToNumberBE: ts,
  bytesToNumberLE: Gu,
  concatBytes: Uo,
  createHmacDrbg: Yg,
  ensureBytes: Le,
  equalBytes: E2,
  hexToBytes: pi,
  hexToNumber: _u,
  numberToBytesBE: gi,
  numberToBytesLE: Vu,
  numberToHexUnpadded: Zg,
  numberToVarBytesBE: A2,
  utf8ToBytes: v2,
  validateObject: Wo
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Mt = BigInt(0), St = BigInt(1), Dr = BigInt(2), k2 = BigInt(3), jl = BigInt(4), Rf = BigInt(5), Cf = BigInt(8);
BigInt(9);
BigInt(16);
function oe(n, t) {
  const e = n % t;
  return e >= Mt ? e : t + e;
}
function S2(n, t, e) {
  if (e <= Mt || t < Mt)
    throw new Error("Expected power/modulo > 0");
  if (e === St)
    return Mt;
  let r = St;
  for (; t > Mt; )
    t & St && (r = r * n % e), n = n * n % e, t >>= St;
  return r;
}
function ye(n, t, e) {
  let r = n;
  for (; t-- > Mt; )
    r *= r, r %= e;
  return r;
}
function Wl(n, t) {
  if (n === Mt || t <= Mt)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = oe(n, t), r = t, s = Mt, i = St;
  for (; e !== Mt; ) {
    const o = r / e, c = r % e, a = s - i * o;
    r = e, e = c, s = i, i = a;
  }
  if (r !== St)
    throw new Error("invert: does not exist");
  return oe(s, t);
}
function T2(n) {
  const t = (n - St) / Dr;
  let e, r, s;
  for (e = n - St, r = 0; e % Dr === Mt; e /= Dr, r++)
    ;
  for (s = Dr; s < n && S2(s, t, n) !== n - St; s++)
    ;
  if (r === 1) {
    const o = (n + St) / jl;
    return function(c, a) {
      const l = c.pow(a, o);
      if (!c.eql(c.sqr(l), a))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (e + St) / Dr;
  return function(o, c) {
    if (o.pow(c, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let a = r, l = o.pow(o.mul(o.ONE, s), e), h = o.pow(c, i), u = o.pow(c, e);
    for (; !o.eql(u, o.ONE); ) {
      if (o.eql(u, o.ZERO))
        return o.ZERO;
      let p = 1;
      for (let y = o.sqr(u); p < a && !o.eql(y, o.ONE); p++)
        y = o.sqr(y);
      const b = o.pow(l, St << BigInt(a - p - 1));
      l = o.sqr(b), h = o.mul(h, b), u = o.mul(u, l), a = p;
    }
    return h;
  };
}
function R2(n) {
  if (n % jl === k2) {
    const t = (n + St) / jl;
    return function(e, r) {
      const s = e.pow(r, t);
      if (!e.eql(e.sqr(s), r))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (n % Cf === Rf) {
    const t = (n - Rf) / Cf;
    return function(e, r) {
      const s = e.mul(r, Dr), i = e.pow(s, t), o = e.mul(r, i), c = e.mul(e.mul(o, Dr), i), a = e.mul(o, e.sub(c, e.ONE));
      if (!e.eql(e.sqr(a), r))
        throw new Error("Cannot find square root");
      return a;
    };
  }
  return T2(n);
}
const C2 = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function P2(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = C2.reduce((r, s) => (r[s] = "function", r), t);
  return Wo(n, e);
}
function U2(n, t, e) {
  if (e < Mt)
    throw new Error("Expected power > 0");
  if (e === Mt)
    return n.ONE;
  if (e === St)
    return t;
  let r = n.ONE, s = t;
  for (; e > Mt; )
    e & St && (r = n.mul(r, s)), s = n.sqr(s), e >>= St;
  return r;
}
function L2(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, c) => n.is0(o) ? i : (e[c] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, c) => n.is0(o) ? i : (e[c] = n.mul(i, e[c]), n.mul(i, o)), s), e;
}
function Xg(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function D2(n, t, e = !1, r = {}) {
  if (n <= Mt)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = Xg(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = R2(n), c = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: $u(s),
    ZERO: Mt,
    ONE: St,
    create: (a) => oe(a, n),
    isValid: (a) => {
      if (typeof a != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof a}`);
      return Mt <= a && a < n;
    },
    is0: (a) => a === Mt,
    isOdd: (a) => (a & St) === St,
    neg: (a) => oe(-a, n),
    eql: (a, l) => a === l,
    sqr: (a) => oe(a * a, n),
    add: (a, l) => oe(a + l, n),
    sub: (a, l) => oe(a - l, n),
    mul: (a, l) => oe(a * l, n),
    pow: (a, l) => U2(c, a, l),
    div: (a, l) => oe(a * Wl(l, n), n),
    // Same as above, but doesn't normalize
    sqrN: (a) => a * a,
    addN: (a, l) => a + l,
    subN: (a, l) => a - l,
    mulN: (a, l) => a * l,
    inv: (a) => Wl(a, n),
    sqrt: r.sqrt || ((a) => o(c, a)),
    invertBatch: (a) => L2(c, a),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, l, h) => h ? l : a,
    toBytes: (a) => e ? Vu(a, i) : gi(a, i),
    fromBytes: (a) => {
      if (a.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${a.length}`);
      return e ? Gu(a) : ts(a);
    }
  });
  return Object.freeze(c);
}
function t0(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function e0(n) {
  const t = t0(n);
  return t + Math.ceil(t / 2);
}
function F2(n, t, e = !1) {
  const r = n.length, s = t0(t), i = e0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? ts(n) : Gu(n), c = oe(o, t - St) + St;
  return e ? Vu(c, s) : gi(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const M2 = BigInt(0), Wc = BigInt(1);
function H2(n, t) {
  const e = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, r = (s) => {
    const i = Math.ceil(t / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = n.ZERO, c = s;
      for (; i > M2; )
        i & Wc && (o = o.add(c)), c = c.double(), i >>= Wc;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(s, i) {
      const { windows: o, windowSize: c } = r(i), a = [];
      let l = s, h = l;
      for (let u = 0; u < o; u++) {
        h = l, a.push(h);
        for (let p = 1; p < c; p++)
          h = h.add(l), a.push(h);
        l = h.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: c, windowSize: a } = r(s);
      let l = n.ZERO, h = n.BASE;
      const u = BigInt(2 ** s - 1), p = 2 ** s, b = BigInt(s);
      for (let y = 0; y < c; y++) {
        const d = y * a;
        let g = Number(o & u);
        o >>= b, g > a && (g -= p, o += Wc);
        const w = d, I = d + Math.abs(g) - 1, v = y % 2 !== 0, T = g < 0;
        g === 0 ? h = h.add(e(v, i[w])) : l = l.add(e(T, i[I]));
      }
      return { p: l, f: h };
    },
    wNAFCached(s, i, o, c) {
      const a = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, a), a !== 1 && i.set(s, c(l))), this.wNAF(a, l, o);
    }
  };
}
function n0(n) {
  return P2(n.Fp), Wo(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Xg(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function _2(n) {
  const t = n0(n);
  Wo(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: r, a: s } = t;
  if (e) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: G2, hexToBytes: V2 } = O2, zr = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(n = "") {
      super(n);
    }
  },
  _parseInt(n) {
    const { Err: t } = zr;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: G2(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = zr, e = typeof n == "string" ? V2(n) : n;
    if (!(e instanceof Uint8Array))
      throw new Error("ui8a expected");
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = zr._parseInt(e.subarray(2)), { d: o, l: c } = zr._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const h = l.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, c = e(i), a = e(o);
    return `30${e(o + i + 4)}02${a}${s}02${c}${r}`;
  }
}, In = BigInt(0), ve = BigInt(1);
BigInt(2);
const Pf = BigInt(3);
BigInt(4);
function $2(n) {
  const t = _2(n), { Fp: e } = t, r = t.toBytes || ((y, d, g) => {
    const w = d.toAffine();
    return Uo(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((y) => {
    const d = y.subarray(1), g = e.fromBytes(d.subarray(0, e.BYTES)), w = e.fromBytes(d.subarray(e.BYTES, 2 * e.BYTES));
    return { x: g, y: w };
  });
  function i(y) {
    const { a: d, b: g } = t, w = e.sqr(y), I = e.mul(w, y);
    return e.add(e.add(I, e.mul(y, d)), g);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(y) {
    return typeof y == "bigint" && In < y && y < t.n;
  }
  function c(y) {
    if (!o(y))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function a(y) {
    const { allowedPrivateKeyLengths: d, nByteLength: g, wrapPrivateKey: w, n: I } = t;
    if (d && typeof y != "bigint") {
      if (y instanceof Uint8Array && (y = di(y)), typeof y != "string" || !d.includes(y.length))
        throw new Error("Invalid key");
      y = y.padStart(g * 2, "0");
    }
    let v;
    try {
      v = typeof y == "bigint" ? y : ts(Le("private key", y, g));
    } catch {
      throw new Error(`private key must be ${g} bytes, hex or bigint, not ${typeof y}`);
    }
    return w && (v = oe(v, I)), c(v), v;
  }
  const l = /* @__PURE__ */ new Map();
  function h(y) {
    if (!(y instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  class u {
    constructor(d, g, w) {
      if (this.px = d, this.py = g, this.pz = w, d == null || !e.isValid(d))
        throw new Error("x required");
      if (g == null || !e.isValid(g))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(d) {
      const { x: g, y: w } = d || {};
      if (!d || !e.isValid(g) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (d instanceof u)
        throw new Error("projective point not allowed");
      const I = (v) => e.eql(v, e.ZERO);
      return I(g) && I(w) ? u.ZERO : new u(g, w, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(d) {
      const g = e.invertBatch(d.map((w) => w.pz));
      return d.map((w, I) => w.toAffine(g[I])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(d) {
      const g = u.fromAffine(s(Le("pointHex", d)));
      return g.assertValidity(), g;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(d) {
      return u.BASE.multiply(a(d));
    }
    // "Private method", don't use it directly
    _setWindowSize(d) {
      this._WINDOW_SIZE = d, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: d, y: g } = this.toAffine();
      if (!e.isValid(d) || !e.isValid(g))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(g), I = i(d);
      if (!e.eql(w, I))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: d } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d, x = e.eql(e.mul(g, k), e.mul(v, I)), N = e.eql(e.mul(w, k), e.mul(T, I));
      return x && N;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new u(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: d, b: g } = t, w = e.mul(g, Pf), { px: I, py: v, pz: T } = this;
      let k = e.ZERO, x = e.ZERO, N = e.ZERO, O = e.mul(I, I), _ = e.mul(v, v), U = e.mul(T, T), P = e.mul(I, v);
      return P = e.add(P, P), N = e.mul(I, T), N = e.add(N, N), k = e.mul(d, N), x = e.mul(w, U), x = e.add(k, x), k = e.sub(_, x), x = e.add(_, x), x = e.mul(k, x), k = e.mul(P, k), N = e.mul(w, N), U = e.mul(d, U), P = e.sub(O, U), P = e.mul(d, P), P = e.add(P, N), N = e.add(O, O), O = e.add(N, O), O = e.add(O, U), O = e.mul(O, P), x = e.add(x, O), U = e.mul(v, T), U = e.add(U, U), O = e.mul(U, P), k = e.sub(k, O), N = e.mul(U, _), N = e.add(N, N), N = e.add(N, N), new u(k, x, N);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d;
      let x = e.ZERO, N = e.ZERO, O = e.ZERO;
      const _ = t.a, U = e.mul(t.b, Pf);
      let P = e.mul(g, v), V = e.mul(w, T), $ = e.mul(I, k), rt = e.add(g, w), m = e.add(v, T);
      rt = e.mul(rt, m), m = e.add(P, V), rt = e.sub(rt, m), m = e.add(g, I);
      let E = e.add(v, k);
      return m = e.mul(m, E), E = e.add(P, $), m = e.sub(m, E), E = e.add(w, I), x = e.add(T, k), E = e.mul(E, x), x = e.add(V, $), E = e.sub(E, x), O = e.mul(_, m), x = e.mul(U, $), O = e.add(x, O), x = e.sub(V, O), O = e.add(V, O), N = e.mul(x, O), V = e.add(P, P), V = e.add(V, P), $ = e.mul(_, $), m = e.mul(U, m), V = e.add(V, $), $ = e.sub(P, $), $ = e.mul(_, $), m = e.add(m, $), P = e.mul(V, m), N = e.add(N, P), P = e.mul(E, m), x = e.mul(rt, x), x = e.sub(x, P), P = e.mul(rt, V), O = e.mul(E, O), O = e.add(O, P), new u(x, N, O);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(d) {
      return b.wNAFCached(this, l, d, (g) => {
        const w = e.invertBatch(g.map((I) => I.pz));
        return g.map((I, v) => I.toAffine(w[v])).map(u.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(d) {
      const g = u.ZERO;
      if (d === In)
        return g;
      if (c(d), d === ve)
        return this;
      const { endo: w } = t;
      if (!w)
        return b.unsafeLadder(this, d);
      let { k1neg: I, k1: v, k2neg: T, k2: k } = w.splitScalar(d), x = g, N = g, O = this;
      for (; v > In || k > In; )
        v & ve && (x = x.add(O)), k & ve && (N = N.add(O)), O = O.double(), v >>= ve, k >>= ve;
      return I && (x = x.negate()), T && (N = N.negate()), N = new u(e.mul(N.px, w.beta), N.py, N.pz), x.add(N);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(d) {
      c(d);
      let g = d, w, I;
      const { endo: v } = t;
      if (v) {
        const { k1neg: T, k1: k, k2neg: x, k2: N } = v.splitScalar(g);
        let { p: O, f: _ } = this.wNAF(k), { p: U, f: P } = this.wNAF(N);
        O = b.constTimeNegate(T, O), U = b.constTimeNegate(x, U), U = new u(e.mul(U.px, v.beta), U.py, U.pz), w = O.add(U), I = _.add(P);
      } else {
        const { p: T, f: k } = this.wNAF(g);
        w = T, I = k;
      }
      return u.normalizeZ([w, I])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(d, g, w) {
      const I = u.BASE, v = (k, x) => x === In || x === ve || !k.equals(I) ? k.multiplyUnsafe(x) : k.multiply(x), T = v(this, g).add(v(d, w));
      return T.is0() ? void 0 : T;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(d) {
      const { px: g, py: w, pz: I } = this, v = this.is0();
      d == null && (d = v ? e.ONE : e.inv(I));
      const T = e.mul(g, d), k = e.mul(w, d), x = e.mul(I, d);
      if (v)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(x, e.ONE))
        throw new Error("invZ was invalid");
      return { x: T, y: k };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: g } = t;
      if (d === ve)
        return !0;
      if (g)
        return g(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d, clearCofactor: g } = t;
      return d === ve ? this : g ? g(u, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(u, this, d);
    }
    toHex(d = !0) {
      return di(this.toRawBytes(d));
    }
  }
  u.BASE = new u(t.Gx, t.Gy, e.ONE), u.ZERO = new u(e.ZERO, e.ONE, e.ZERO);
  const p = t.nBitLength, b = H2(u, t.endo ? Math.ceil(p / 2) : p);
  return {
    CURVE: t,
    ProjectivePoint: u,
    normPrivateKeyToScalar: a,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function j2(n) {
  const t = n0(n);
  return Wo(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function W2(n) {
  const t = j2(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(m) {
    return In < m && m < e.ORDER;
  }
  function c(m) {
    return oe(m, r);
  }
  function a(m) {
    return Wl(m, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: h, weierstrassEquation: u, isWithinCurveOrder: p } = $2({
    ...t,
    toBytes(m, E, R) {
      const M = E.toAffine(), H = e.toBytes(M.x), G = Uo;
      return R ? G(Uint8Array.from([E.hasEvenY() ? 2 : 3]), H) : G(Uint8Array.from([4]), H, e.toBytes(M.y));
    },
    fromBytes(m) {
      const E = m.length, R = m[0], M = m.subarray(1);
      if (E === s && (R === 2 || R === 3)) {
        const H = ts(M);
        if (!o(H))
          throw new Error("Point is not on curve");
        const G = u(H);
        let Q = e.sqrt(G);
        const K = (Q & ve) === ve;
        return (R & 1) === 1 !== K && (Q = e.neg(Q)), { x: H, y: Q };
      } else if (E === i && R === 4) {
        const H = e.fromBytes(M.subarray(0, e.BYTES)), G = e.fromBytes(M.subarray(e.BYTES, 2 * e.BYTES));
        return { x: H, y: G };
      } else
        throw new Error(`Point of length ${E} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), b = (m) => di(gi(m, t.nByteLength));
  function y(m) {
    const E = r >> ve;
    return m > E;
  }
  function d(m) {
    return y(m) ? c(-m) : m;
  }
  const g = (m, E, R) => ts(m.slice(E, R));
  class w {
    constructor(E, R, M) {
      this.r = E, this.s = R, this.recovery = M, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(E) {
      const R = t.nByteLength;
      return E = Le("compactSignature", E, R * 2), new w(g(E, 0, R), g(E, R, 2 * R));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(E) {
      const { r: R, s: M } = zr.toSig(Le("DER", E));
      return new w(R, M);
    }
    assertValidity() {
      if (!p(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!p(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(E) {
      return new w(this.r, this.s, E);
    }
    recoverPublicKey(E) {
      const { r: R, s: M, recovery: H } = this, G = N(Le("msgHash", E));
      if (H == null || ![0, 1, 2, 3].includes(H))
        throw new Error("recovery id invalid");
      const Q = H === 2 || H === 3 ? R + t.n : R;
      if (Q >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const K = H & 1 ? "03" : "02", Z = l.fromHex(K + b(Q)), st = a(Q), ht = c(-G * st), bt = c(M * st), at = l.BASE.multiplyAndAddUnsafe(Z, ht, bt);
      if (!at)
        throw new Error("point at infinify");
      return at.assertValidity(), at;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return y(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return pi(this.toDERHex());
    }
    toDERHex() {
      return zr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return pi(this.toCompactHex());
    }
    toCompactHex() {
      return b(this.r) + b(this.s);
    }
  }
  const I = {
    isValidPrivateKey(m) {
      try {
        return h(m), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const m = e0(t.n);
      return F2(t.randomBytes(m), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(m = 8, E = l.BASE) {
      return E._setWindowSize(m), E.multiply(BigInt(3)), E;
    }
  };
  function v(m, E = !0) {
    return l.fromPrivateKey(m).toRawBytes(E);
  }
  function T(m) {
    const E = m instanceof Uint8Array, R = typeof m == "string", M = (E || R) && m.length;
    return E ? M === s || M === i : R ? M === 2 * s || M === 2 * i : m instanceof l;
  }
  function k(m, E, R = !0) {
    if (T(m))
      throw new Error("first arg must be private key");
    if (!T(E))
      throw new Error("second arg must be public key");
    return l.fromHex(E).multiply(h(m)).toRawBytes(R);
  }
  const x = t.bits2int || function(m) {
    const E = ts(m), R = m.length * 8 - t.nBitLength;
    return R > 0 ? E >> BigInt(R) : E;
  }, N = t.bits2int_modN || function(m) {
    return c(x(m));
  }, O = $u(t.nBitLength);
  function _(m) {
    if (typeof m != "bigint")
      throw new Error("bigint expected");
    if (!(In <= m && m < O))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return gi(m, t.nByteLength);
  }
  function U(m, E, R = P) {
    if (["recovered", "canonical"].some((lt) => lt in R))
      throw new Error("sign() legacy options not supported");
    const { hash: M, randomBytes: H } = t;
    let { lowS: G, prehash: Q, extraEntropy: K } = R;
    G == null && (G = !0), m = Le("msgHash", m), Q && (m = Le("prehashed msgHash", M(m)));
    const Z = N(m), st = h(E), ht = [_(st), _(Z)];
    if (K != null) {
      const lt = K === !0 ? H(e.BYTES) : K;
      ht.push(Le("extraEntropy", lt));
    }
    const bt = Uo(...ht), at = Z;
    function Ht(lt) {
      const yt = x(lt);
      if (!p(yt))
        return;
      const Pt = a(yt), Y = l.BASE.multiply(yt).toAffine(), dt = c(Y.x);
      if (dt === In)
        return;
      const Ut = c(Pt * c(at + dt * st));
      if (Ut === In)
        return;
      let Be = (Y.x === dt ? 0 : 2) | Number(Y.y & ve), Oe = Ut;
      return G && y(Ut) && (Oe = d(Ut), Be ^= 1), new w(dt, Oe, Be);
    }
    return { seed: bt, k2sig: Ht };
  }
  const P = { lowS: t.lowS, prehash: !1 }, V = { lowS: t.lowS, prehash: !1 };
  function $(m, E, R = P) {
    const { seed: M, k2sig: H } = U(m, E, R), G = t;
    return Yg(G.hash.outputLen, G.nByteLength, G.hmac)(M, H);
  }
  l.BASE._setWindowSize(8);
  function rt(m, E, R, M = V) {
    var Pt;
    const H = m;
    if (E = Le("msgHash", E), R = Le("publicKey", R), "strict" in M)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: G, prehash: Q } = M;
    let K, Z;
    try {
      if (typeof H == "string" || H instanceof Uint8Array)
        try {
          K = w.fromDER(H);
        } catch (Y) {
          if (!(Y instanceof zr.Err))
            throw Y;
          K = w.fromCompact(H);
        }
      else if (typeof H == "object" && typeof H.r == "bigint" && typeof H.s == "bigint") {
        const { r: Y, s: dt } = H;
        K = new w(Y, dt);
      } else
        throw new Error("PARSE");
      Z = l.fromHex(R);
    } catch (Y) {
      if (Y.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (G && K.hasHighS())
      return !1;
    Q && (E = t.hash(E));
    const { r: st, s: ht } = K, bt = N(E), at = a(ht), Ht = c(bt * at), lt = c(st * at), yt = (Pt = l.BASE.multiplyAndAddUnsafe(Z, Ht, lt)) == null ? void 0 : Pt.toAffine();
    return yt ? c(yt.x) === st : !1;
  }
  return {
    CURVE: t,
    getPublicKey: v,
    getSharedSecret: k,
    sign: $,
    verify: rt,
    ProjectivePoint: l,
    Signature: w,
    utils: I
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function z2(n) {
  return {
    hash: n,
    hmac: (t, ...e) => Rg(n, t, CE(...e)),
    randomBytes: PE
  };
}
function Q2(n, t) {
  const e = (r) => W2({ ...n, ...z2(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const r0 = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Uf = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), q2 = BigInt(1), zl = BigInt(2), Lf = (n, t) => (n + t / zl) / t;
function K2(n) {
  const t = r0, e = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), c = BigInt(44), a = BigInt(88), l = n * n * n % t, h = l * l * n % t, u = ye(h, e, t) * h % t, p = ye(u, e, t) * h % t, b = ye(p, zl, t) * l % t, y = ye(b, s, t) * b % t, d = ye(y, i, t) * y % t, g = ye(d, c, t) * d % t, w = ye(g, a, t) * g % t, I = ye(w, c, t) * d % t, v = ye(I, e, t) * h % t, T = ye(v, o, t) * y % t, k = ye(T, r, t) * l % t, x = ye(k, zl, t);
  if (!Ql.eql(Ql.sqr(x), n))
    throw new Error("Cannot find square root");
  return x;
}
const Ql = D2(r0, void 0, void 0, { sqrt: K2 }), J2 = Q2({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Ql,
  n: Uf,
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  lowS: !0,
  /**
   * secp256k1 belongs to Koblitz curves: it has efficiently computable endomorphism.
   * Endomorphism uses 2x less RAM, speeds up precomputation by 2x and ECDH / key recovery by 20%.
   * For precomputed wNAF it trades off 1/2 init time & 1/3 ram for 20% perf hit.
   * Explanation: https://gist.github.com/paulmillr/eb670806793e84df628a7c434a873066
   */
  endo: {
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (n) => {
      const t = Uf, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -q2 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, o = BigInt("0x100000000000000000000000000000000"), c = Lf(i * n, t), a = Lf(-r * n, t);
      let l = oe(n - c * e - a * s, t), h = oe(-c * r - a * i, t);
      const u = l > o, p = h > o;
      if (u && (l = t - l), p && (h = t - h), l > o || h > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: u, k1: l, k2neg: p, k2: h };
    }
  }
}, Pg);
BigInt(0);
J2.ProjectivePoint;
BigInt(0);
BigInt(1);
BigInt(2);
BigInt(27);
BigInt(28);
BigInt(35);
BigInt(0);
BigInt(36);
(function() {
  const n = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    n[e] = BigInt(t);
  }
  return n;
})();
BigInt(0);
BigInt(1);
BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const Z2 = new Uint8Array(32);
Z2.fill(0);
BigInt(0);
BigInt(2);
BigInt(27);
BigInt(28);
BigInt(35);
BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const Y2 = new Uint8Array(32);
Y2.fill(0);
BigInt(-1);
const X2 = BigInt(0), tv = BigInt(1);
BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
Og(tv, 32);
Og(X2, 32);
function zo(n) {
  const t = /* @__PURE__ */ new Set();
  return n.forEach((e) => t.add(e)), Object.freeze(t);
}
const ev = "external public payable override";
zo(ev.split(" "));
const s0 = "constant external internal payable private public pure view override";
zo(s0.split(" "));
const i0 = "constructor error event fallback function receive struct";
zo(i0.split(" "));
const o0 = "calldata memory storage payable indexed";
zo(o0.split(" "));
const nv = "tuple returns", rv = [i0, o0, nv, s0].join(" ");
zo(rv.split(" "));
const cn = /* @__PURE__ */ new Map();
cn.set(0, "GENERIC_PANIC");
cn.set(1, "ASSERT_FALSE");
cn.set(17, "OVERFLOW");
cn.set(18, "DIVIDE_BY_ZERO");
cn.set(33, "ENUM_RANGE_ERROR");
cn.set(34, "BAD_STORAGE_DATA");
cn.set(49, "STACK_UNDERFLOW");
cn.set(50, "ARRAY_RANGE_ERROR");
cn.set(65, "OUT_OF_MEMORY");
cn.set(81, "UNINITIALIZED_FUNCTION_CALL");
BigInt(0);
BigInt(0);
Promise.resolve();
BigInt(0);
BigInt(2);
const sv = [
  "constructor()",
  "error DER_Split_Error()",
  "error expmod_Error()",
  "error k256Decompress_Invalid_Length_Error()",
  "error k256DeriveY_Invalid_Prefix_Error()",
  "error recoverV_Error()",
  "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword) args)",
  "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)",
  "function encryptedTx(bytes32 nonce, bytes ciphertext)",
  "function gaspayingAddress() view returns (address)",
  // 'function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice) view returns (bytes out_data)',
  "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)",
  "function getAccount(bytes32 in_username) view returns (address account, address keypairAddress)",
  "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)",
  "function manageCredentialPassword((bytes32 digest, bytes data) args)",
  "function personalization() view returns (bytes32)",
  "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, bytes in_data) view returns (bytes out_data)",
  "function proxyViewPassword(bytes32 in_hashedUsername, bytes32 in_digest, bytes in_data) view returns (bytes out_data)",
  "function salt() view returns (bytes32)",
  "function userExists(bytes32 in_username) view returns (bool)"
];
function Df(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function iv(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function gc(n, ...t) {
  if (!iv(n))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${n.length}`);
}
function ov(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Df(n.outputLen), Df(n.blockLen);
}
function za(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function av(n, t) {
  gc(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const zc = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Qc = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), Qe = (n, t) => n << 32 - t | n >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function cv(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function ju(n) {
  return typeof n == "string" && (n = cv(n)), gc(n), n;
}
function lv(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    gc(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
class a0 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function uv(n) {
  const t = (r) => n().update(ju(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function hv(n = 32) {
  if (zc && typeof zc.getRandomValues == "function")
    return zc.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
function fv(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), c = Number(e & i), a = r ? 4 : 0, l = r ? 0 : 4;
  n.setUint32(t + a, o, r), n.setUint32(t + l, c, r);
}
const dv = (n, t, e) => n & t ^ ~n & e, pv = (n, t, e) => n & t ^ n & e ^ t & e;
class gv extends a0 {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Qc(this.buffer);
  }
  update(t) {
    za(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = ju(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const c = Math.min(s - this.pos, i - o);
      if (c === s) {
        const a = Qc(t);
        for (; s <= i - o; o += s)
          this.process(a, o);
        continue;
      }
      r.set(t.subarray(o, o + c), this.pos), this.pos += c, o += c, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    za(this), av(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let u = o; u < s; u++)
      e[u] = 0;
    fv(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const c = Qc(t), a = this.outputLen;
    if (a % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = a / 4, h = this.get();
    if (l > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++)
      c.setUint32(4 * u, h[u], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: o, pos: c } = this;
    return t.length = s, t.pos = c, t.finished = i, t.destroyed = o, s % e && t.buffer.set(r), t;
  }
}
const yv = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), $n = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), jn = /* @__PURE__ */ new Uint32Array(64);
class mv extends gv {
  constructor() {
    super(64, 32, 8, !1), this.A = $n[0] | 0, this.B = $n[1] | 0, this.C = $n[2] | 0, this.D = $n[3] | 0, this.E = $n[4] | 0, this.F = $n[5] | 0, this.G = $n[6] | 0, this.H = $n[7] | 0;
  }
  get() {
    const { A: t, B: e, C: r, D: s, E: i, F: o, G: c, H: a } = this;
    return [t, e, r, s, i, o, c, a];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, c, a) {
    this.A = t | 0, this.B = e | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = c | 0, this.H = a | 0;
  }
  process(t, e) {
    for (let u = 0; u < 16; u++, e += 4)
      jn[u] = t.getUint32(e, !1);
    for (let u = 16; u < 64; u++) {
      const p = jn[u - 15], b = jn[u - 2], y = Qe(p, 7) ^ Qe(p, 18) ^ p >>> 3, d = Qe(b, 17) ^ Qe(b, 19) ^ b >>> 10;
      jn[u] = d + jn[u - 7] + y + jn[u - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: c, F: a, G: l, H: h } = this;
    for (let u = 0; u < 64; u++) {
      const p = Qe(c, 6) ^ Qe(c, 11) ^ Qe(c, 25), b = h + p + dv(c, a, l) + yv[u] + jn[u] | 0, y = (Qe(r, 2) ^ Qe(r, 13) ^ Qe(r, 22)) + pv(r, s, i) | 0;
      h = l, l = a, a = c, c = o + b | 0, o = i, i = s, s = r, r = b + y | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, c = c + this.E | 0, a = a + this.F | 0, l = l + this.G | 0, h = h + this.H | 0, this.set(r, s, i, o, c, a, l, h);
  }
  roundClean() {
    jn.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const wv = /* @__PURE__ */ uv(() => new mv());
class c0 extends a0 {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, ov(t);
    const r = ju(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(r.length > s ? t.create().update(r).digest() : r);
    for (let o = 0; o < i.length; o++)
      i[o] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let o = 0; o < i.length; o++)
      i[o] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return za(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    za(this), gc(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: c } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = c, t.oHash = e._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const l0 = (n, t, e) => new c0(n, t).update(e).digest();
l0.create = (n, t) => new c0(n, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const u0 = /* @__PURE__ */ BigInt(0), yc = /* @__PURE__ */ BigInt(1), bv = /* @__PURE__ */ BigInt(2);
function hs(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function Qo(n) {
  if (!hs(n))
    throw new Error("Uint8Array expected");
}
const Av = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function yi(n) {
  Qo(n);
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += Av[n[e]];
  return t;
}
function h0(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Wu(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
const un = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Ff(n) {
  if (n >= un._0 && n <= un._9)
    return n - un._0;
  if (n >= un._A && n <= un._F)
    return n - (un._A - 10);
  if (n >= un._a && n <= un._f)
    return n - (un._a - 10);
}
function mi(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length, e = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const o = Ff(n.charCodeAt(i)), c = Ff(n.charCodeAt(i + 1));
    if (o === void 0 || c === void 0) {
      const a = n[i] + n[i + 1];
      throw new Error('hex string expected, got non-hex character "' + a + '" at index ' + i);
    }
    r[s] = o * 16 + c;
  }
  return r;
}
function es(n) {
  return Wu(yi(n));
}
function zu(n) {
  return Qo(n), Wu(yi(Uint8Array.from(n).reverse()));
}
function wi(n, t) {
  return mi(n.toString(16).padStart(t * 2, "0"));
}
function Qu(n, t) {
  return wi(n, t).reverse();
}
function Ev(n) {
  return mi(h0(n));
}
function De(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = mi(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (hs(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function Lo(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    Qo(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
function vv(n, t) {
  if (n.length !== t.length)
    return !1;
  let e = 0;
  for (let r = 0; r < n.length; r++)
    e |= n[r] ^ t[r];
  return e === 0;
}
function xv(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Iv(n) {
  let t;
  for (t = 0; n > u0; n >>= yc, t += 1)
    ;
  return t;
}
function Nv(n, t) {
  return n >> BigInt(t) & yc;
}
function Bv(n, t, e) {
  return n | (e ? yc : u0) << BigInt(t);
}
const qu = (n) => (bv << BigInt(n - 1)) - yc, qc = (n) => new Uint8Array(n), Mf = (n) => Uint8Array.from(n);
function f0(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = qc(n), s = qc(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, c = (...h) => e(s, r, ...h), a = (h = qc()) => {
    s = c(Mf([0]), h), r = c(), h.length !== 0 && (s = c(Mf([1]), h), r = c());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const u = [];
    for (; h < t; ) {
      r = c();
      const p = r.slice();
      u.push(p), h += r.length;
    }
    return Lo(...u);
  };
  return (h, u) => {
    o(), a(h);
    let p;
    for (; !(p = u(l())); )
      a();
    return o(), p;
  };
}
const Ov = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || hs(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function qo(n, t, e = {}) {
  const r = (s, i, o) => {
    const c = Ov[i];
    if (typeof c != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const a = n[s];
    if (!(o && a === void 0) && !c(a, n))
      throw new Error(`Invalid param ${String(s)}=${a} (${typeof a}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const kv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: Qo,
  bitGet: Nv,
  bitLen: Iv,
  bitMask: qu,
  bitSet: Bv,
  bytesToHex: yi,
  bytesToNumberBE: es,
  bytesToNumberLE: zu,
  concatBytes: Lo,
  createHmacDrbg: f0,
  ensureBytes: De,
  equalBytes: vv,
  hexToBytes: mi,
  hexToNumber: Wu,
  isBytes: hs,
  numberToBytesBE: wi,
  numberToBytesLE: Qu,
  numberToHexUnpadded: h0,
  numberToVarBytesBE: Ev,
  utf8ToBytes: xv,
  validateObject: qo
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const $t = BigInt(0), Tt = BigInt(1), Fr = BigInt(2), Sv = BigInt(3), ql = BigInt(4), Hf = BigInt(5), _f = BigInt(8);
BigInt(9);
BigInt(16);
function Ne(n, t) {
  const e = n % t;
  return e >= $t ? e : t + e;
}
function Tv(n, t, e) {
  if (e <= $t || t < $t)
    throw new Error("Expected power/modulo > 0");
  if (e === Tt)
    return $t;
  let r = Tt;
  for (; t > $t; )
    t & Tt && (r = r * n % e), n = n * n % e, t >>= Tt;
  return r;
}
function Kl(n, t) {
  if (n === $t || t <= $t)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = Ne(n, t), r = t, s = $t, i = Tt;
  for (; e !== $t; ) {
    const o = r / e, c = r % e, a = s - i * o;
    r = e, e = c, s = i, i = a;
  }
  if (r !== Tt)
    throw new Error("invert: does not exist");
  return Ne(s, t);
}
function Rv(n) {
  const t = (n - Tt) / Fr;
  let e, r, s;
  for (e = n - Tt, r = 0; e % Fr === $t; e /= Fr, r++)
    ;
  for (s = Fr; s < n && Tv(s, t, n) !== n - Tt; s++)
    ;
  if (r === 1) {
    const o = (n + Tt) / ql;
    return function(c, a) {
      const l = c.pow(a, o);
      if (!c.eql(c.sqr(l), a))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (e + Tt) / Fr;
  return function(o, c) {
    if (o.pow(c, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let a = r, l = o.pow(o.mul(o.ONE, s), e), h = o.pow(c, i), u = o.pow(c, e);
    for (; !o.eql(u, o.ONE); ) {
      if (o.eql(u, o.ZERO))
        return o.ZERO;
      let p = 1;
      for (let y = o.sqr(u); p < a && !o.eql(y, o.ONE); p++)
        y = o.sqr(y);
      const b = o.pow(l, Tt << BigInt(a - p - 1));
      l = o.sqr(b), h = o.mul(h, b), u = o.mul(u, l), a = p;
    }
    return h;
  };
}
function Cv(n) {
  if (n % ql === Sv) {
    const t = (n + Tt) / ql;
    return function(e, r) {
      const s = e.pow(r, t);
      if (!e.eql(e.sqr(s), r))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (n % _f === Hf) {
    const t = (n - Hf) / _f;
    return function(e, r) {
      const s = e.mul(r, Fr), i = e.pow(s, t), o = e.mul(r, i), c = e.mul(e.mul(o, Fr), i), a = e.mul(o, e.sub(c, e.ONE));
      if (!e.eql(e.sqr(a), r))
        throw new Error("Cannot find square root");
      return a;
    };
  }
  return Rv(n);
}
const Pv = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function Uv(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Pv.reduce((r, s) => (r[s] = "function", r), t);
  return qo(n, e);
}
function Lv(n, t, e) {
  if (e < $t)
    throw new Error("Expected power > 0");
  if (e === $t)
    return n.ONE;
  if (e === Tt)
    return t;
  let r = n.ONE, s = t;
  for (; e > $t; )
    e & Tt && (r = n.mul(r, s)), s = n.sqr(s), e >>= Tt;
  return r;
}
function Dv(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, c) => n.is0(o) ? i : (e[c] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, c) => n.is0(o) ? i : (e[c] = n.mul(i, e[c]), n.mul(i, o)), s), e;
}
function d0(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function Fv(n, t, e = !1, r = {}) {
  if (n <= $t)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = d0(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Cv(n), c = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: qu(s),
    ZERO: $t,
    ONE: Tt,
    create: (a) => Ne(a, n),
    isValid: (a) => {
      if (typeof a != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof a}`);
      return $t <= a && a < n;
    },
    is0: (a) => a === $t,
    isOdd: (a) => (a & Tt) === Tt,
    neg: (a) => Ne(-a, n),
    eql: (a, l) => a === l,
    sqr: (a) => Ne(a * a, n),
    add: (a, l) => Ne(a + l, n),
    sub: (a, l) => Ne(a - l, n),
    mul: (a, l) => Ne(a * l, n),
    pow: (a, l) => Lv(c, a, l),
    div: (a, l) => Ne(a * Kl(l, n), n),
    // Same as above, but doesn't normalize
    sqrN: (a) => a * a,
    addN: (a, l) => a + l,
    subN: (a, l) => a - l,
    mulN: (a, l) => a * l,
    inv: (a) => Kl(a, n),
    sqrt: r.sqrt || ((a) => o(c, a)),
    invertBatch: (a) => Dv(c, a),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, l, h) => h ? l : a,
    toBytes: (a) => e ? Qu(a, i) : wi(a, i),
    fromBytes: (a) => {
      if (a.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${a.length}`);
      return e ? zu(a) : es(a);
    }
  });
  return Object.freeze(c);
}
function p0(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function g0(n) {
  const t = p0(n);
  return t + Math.ceil(t / 2);
}
function Mv(n, t, e = !1) {
  const r = n.length, s = p0(t), i = g0(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? es(n) : zu(n), c = Ne(o, t - Tt) + Tt;
  return e ? Qu(c, s) : wi(c, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Hv = BigInt(0), Kc = BigInt(1);
function _v(n, t) {
  const e = (s, i) => {
    const o = i.negate();
    return s ? o : i;
  }, r = (s) => {
    const i = Math.ceil(t / s) + 1, o = 2 ** (s - 1);
    return { windows: i, windowSize: o };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let o = n.ZERO, c = s;
      for (; i > Hv; )
        i & Kc && (o = o.add(c)), c = c.double(), i >>= Kc;
      return o;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(s, i) {
      const { windows: o, windowSize: c } = r(i), a = [];
      let l = s, h = l;
      for (let u = 0; u < o; u++) {
        h = l, a.push(h);
        for (let p = 1; p < c; p++)
          h = h.add(l), a.push(h);
        l = h.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, o) {
      const { windows: c, windowSize: a } = r(s);
      let l = n.ZERO, h = n.BASE;
      const u = BigInt(2 ** s - 1), p = 2 ** s, b = BigInt(s);
      for (let y = 0; y < c; y++) {
        const d = y * a;
        let g = Number(o & u);
        o >>= b, g > a && (g -= p, o += Kc);
        const w = d, I = d + Math.abs(g) - 1, v = y % 2 !== 0, T = g < 0;
        g === 0 ? h = h.add(e(v, i[w])) : l = l.add(e(T, i[I]));
      }
      return { p: l, f: h };
    },
    wNAFCached(s, i, o, c) {
      const a = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, a), a !== 1 && i.set(s, c(l))), this.wNAF(a, l, o);
    }
  };
}
function y0(n) {
  return Uv(n.Fp), qo(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...d0(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Gv(n) {
  const t = y0(n);
  qo(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: r, a: s } = t;
  if (e) {
    if (!r.eql(s, r.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: Vv, hexToBytes: $v } = kv, Qr = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(n = "") {
      super(n);
    }
  },
  _parseInt(n) {
    const { Err: t } = Qr;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Vv(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = Qr, e = typeof n == "string" ? $v(n) : n;
    Qo(e);
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Qr._parseInt(e.subarray(2)), { d: o, l: c } = Qr._parseInt(i);
    if (c.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const h = l.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, c = e(i), a = e(o);
    return `30${e(o + i + 4)}02${a}${s}02${c}${r}`;
  }
}, Nn = BigInt(0), xe = BigInt(1);
BigInt(2);
const Gf = BigInt(3);
BigInt(4);
function jv(n) {
  const t = Gv(n), { Fp: e } = t, r = t.toBytes || ((y, d, g) => {
    const w = d.toAffine();
    return Lo(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((y) => {
    const d = y.subarray(1), g = e.fromBytes(d.subarray(0, e.BYTES)), w = e.fromBytes(d.subarray(e.BYTES, 2 * e.BYTES));
    return { x: g, y: w };
  });
  function i(y) {
    const { a: d, b: g } = t, w = e.sqr(y), I = e.mul(w, y);
    return e.add(e.add(I, e.mul(y, d)), g);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(y) {
    return typeof y == "bigint" && Nn < y && y < t.n;
  }
  function c(y) {
    if (!o(y))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function a(y) {
    const { allowedPrivateKeyLengths: d, nByteLength: g, wrapPrivateKey: w, n: I } = t;
    if (d && typeof y != "bigint") {
      if (hs(y) && (y = yi(y)), typeof y != "string" || !d.includes(y.length))
        throw new Error("Invalid key");
      y = y.padStart(g * 2, "0");
    }
    let v;
    try {
      v = typeof y == "bigint" ? y : es(De("private key", y, g));
    } catch {
      throw new Error(`private key must be ${g} bytes, hex or bigint, not ${typeof y}`);
    }
    return w && (v = Ne(v, I)), c(v), v;
  }
  const l = /* @__PURE__ */ new Map();
  function h(y) {
    if (!(y instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  class u {
    constructor(d, g, w) {
      if (this.px = d, this.py = g, this.pz = w, d == null || !e.isValid(d))
        throw new Error("x required");
      if (g == null || !e.isValid(g))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(d) {
      const { x: g, y: w } = d || {};
      if (!d || !e.isValid(g) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (d instanceof u)
        throw new Error("projective point not allowed");
      const I = (v) => e.eql(v, e.ZERO);
      return I(g) && I(w) ? u.ZERO : new u(g, w, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(d) {
      const g = e.invertBatch(d.map((w) => w.pz));
      return d.map((w, I) => w.toAffine(g[I])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(d) {
      const g = u.fromAffine(s(De("pointHex", d)));
      return g.assertValidity(), g;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(d) {
      return u.BASE.multiply(a(d));
    }
    // "Private method", don't use it directly
    _setWindowSize(d) {
      this._WINDOW_SIZE = d, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: d, y: g } = this.toAffine();
      if (!e.isValid(d) || !e.isValid(g))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(g), I = i(d);
      if (!e.eql(w, I))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: d } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(d);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d, x = e.eql(e.mul(g, k), e.mul(v, I)), N = e.eql(e.mul(w, k), e.mul(T, I));
      return x && N;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new u(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: d, b: g } = t, w = e.mul(g, Gf), { px: I, py: v, pz: T } = this;
      let k = e.ZERO, x = e.ZERO, N = e.ZERO, O = e.mul(I, I), _ = e.mul(v, v), U = e.mul(T, T), P = e.mul(I, v);
      return P = e.add(P, P), N = e.mul(I, T), N = e.add(N, N), k = e.mul(d, N), x = e.mul(w, U), x = e.add(k, x), k = e.sub(_, x), x = e.add(_, x), x = e.mul(k, x), k = e.mul(P, k), N = e.mul(w, N), U = e.mul(d, U), P = e.sub(O, U), P = e.mul(d, P), P = e.add(P, N), N = e.add(O, O), O = e.add(N, O), O = e.add(O, U), O = e.mul(O, P), x = e.add(x, O), U = e.mul(v, T), U = e.add(U, U), O = e.mul(U, P), k = e.sub(k, O), N = e.mul(U, _), N = e.add(N, N), N = e.add(N, N), new u(k, x, N);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(d) {
      h(d);
      const { px: g, py: w, pz: I } = this, { px: v, py: T, pz: k } = d;
      let x = e.ZERO, N = e.ZERO, O = e.ZERO;
      const _ = t.a, U = e.mul(t.b, Gf);
      let P = e.mul(g, v), V = e.mul(w, T), $ = e.mul(I, k), rt = e.add(g, w), m = e.add(v, T);
      rt = e.mul(rt, m), m = e.add(P, V), rt = e.sub(rt, m), m = e.add(g, I);
      let E = e.add(v, k);
      return m = e.mul(m, E), E = e.add(P, $), m = e.sub(m, E), E = e.add(w, I), x = e.add(T, k), E = e.mul(E, x), x = e.add(V, $), E = e.sub(E, x), O = e.mul(_, m), x = e.mul(U, $), O = e.add(x, O), x = e.sub(V, O), O = e.add(V, O), N = e.mul(x, O), V = e.add(P, P), V = e.add(V, P), $ = e.mul(_, $), m = e.mul(U, m), V = e.add(V, $), $ = e.sub(P, $), $ = e.mul(_, $), m = e.add(m, $), P = e.mul(V, m), N = e.add(N, P), P = e.mul(E, m), x = e.mul(rt, x), x = e.sub(x, P), P = e.mul(rt, V), O = e.mul(E, O), O = e.add(O, P), new u(x, N, O);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(d) {
      return b.wNAFCached(this, l, d, (g) => {
        const w = e.invertBatch(g.map((I) => I.pz));
        return g.map((I, v) => I.toAffine(w[v])).map(u.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(d) {
      const g = u.ZERO;
      if (d === Nn)
        return g;
      if (c(d), d === xe)
        return this;
      const { endo: w } = t;
      if (!w)
        return b.unsafeLadder(this, d);
      let { k1neg: I, k1: v, k2neg: T, k2: k } = w.splitScalar(d), x = g, N = g, O = this;
      for (; v > Nn || k > Nn; )
        v & xe && (x = x.add(O)), k & xe && (N = N.add(O)), O = O.double(), v >>= xe, k >>= xe;
      return I && (x = x.negate()), T && (N = N.negate()), N = new u(e.mul(N.px, w.beta), N.py, N.pz), x.add(N);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(d) {
      c(d);
      let g = d, w, I;
      const { endo: v } = t;
      if (v) {
        const { k1neg: T, k1: k, k2neg: x, k2: N } = v.splitScalar(g);
        let { p: O, f: _ } = this.wNAF(k), { p: U, f: P } = this.wNAF(N);
        O = b.constTimeNegate(T, O), U = b.constTimeNegate(x, U), U = new u(e.mul(U.px, v.beta), U.py, U.pz), w = O.add(U), I = _.add(P);
      } else {
        const { p: T, f: k } = this.wNAF(g);
        w = T, I = k;
      }
      return u.normalizeZ([w, I])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(d, g, w) {
      const I = u.BASE, v = (k, x) => x === Nn || x === xe || !k.equals(I) ? k.multiplyUnsafe(x) : k.multiply(x), T = v(this, g).add(v(d, w));
      return T.is0() ? void 0 : T;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(d) {
      const { px: g, py: w, pz: I } = this, v = this.is0();
      d == null && (d = v ? e.ONE : e.inv(I));
      const T = e.mul(g, d), k = e.mul(w, d), x = e.mul(I, d);
      if (v)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(x, e.ONE))
        throw new Error("invZ was invalid");
      return { x: T, y: k };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: g } = t;
      if (d === xe)
        return !0;
      if (g)
        return g(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d, clearCofactor: g } = t;
      return d === xe ? this : g ? g(u, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(u, this, d);
    }
    toHex(d = !0) {
      return yi(this.toRawBytes(d));
    }
  }
  u.BASE = new u(t.Gx, t.Gy, e.ONE), u.ZERO = new u(e.ZERO, e.ONE, e.ZERO);
  const p = t.nBitLength, b = _v(u, t.endo ? Math.ceil(p / 2) : p);
  return {
    CURVE: t,
    ProjectivePoint: u,
    normPrivateKeyToScalar: a,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Wv(n) {
  const t = y0(n);
  return qo(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function zv(n) {
  const t = Wv(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(m) {
    return Nn < m && m < e.ORDER;
  }
  function c(m) {
    return Ne(m, r);
  }
  function a(m) {
    return Kl(m, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: h, weierstrassEquation: u, isWithinCurveOrder: p } = jv({
    ...t,
    toBytes(m, E, R) {
      const M = E.toAffine(), H = e.toBytes(M.x), G = Lo;
      return R ? G(Uint8Array.from([E.hasEvenY() ? 2 : 3]), H) : G(Uint8Array.from([4]), H, e.toBytes(M.y));
    },
    fromBytes(m) {
      const E = m.length, R = m[0], M = m.subarray(1);
      if (E === s && (R === 2 || R === 3)) {
        const H = es(M);
        if (!o(H))
          throw new Error("Point is not on curve");
        const G = u(H);
        let Q;
        try {
          Q = e.sqrt(G);
        } catch (Z) {
          const st = Z instanceof Error ? ": " + Z.message : "";
          throw new Error("Point is not on curve" + st);
        }
        const K = (Q & xe) === xe;
        return (R & 1) === 1 !== K && (Q = e.neg(Q)), { x: H, y: Q };
      } else if (E === i && R === 4) {
        const H = e.fromBytes(M.subarray(0, e.BYTES)), G = e.fromBytes(M.subarray(e.BYTES, 2 * e.BYTES));
        return { x: H, y: G };
      } else
        throw new Error(`Point of length ${E} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), b = (m) => yi(wi(m, t.nByteLength));
  function y(m) {
    const E = r >> xe;
    return m > E;
  }
  function d(m) {
    return y(m) ? c(-m) : m;
  }
  const g = (m, E, R) => es(m.slice(E, R));
  class w {
    constructor(E, R, M) {
      this.r = E, this.s = R, this.recovery = M, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(E) {
      const R = t.nByteLength;
      return E = De("compactSignature", E, R * 2), new w(g(E, 0, R), g(E, R, 2 * R));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(E) {
      const { r: R, s: M } = Qr.toSig(De("DER", E));
      return new w(R, M);
    }
    assertValidity() {
      if (!p(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!p(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(E) {
      return new w(this.r, this.s, E);
    }
    recoverPublicKey(E) {
      const { r: R, s: M, recovery: H } = this, G = N(De("msgHash", E));
      if (H == null || ![0, 1, 2, 3].includes(H))
        throw new Error("recovery id invalid");
      const Q = H === 2 || H === 3 ? R + t.n : R;
      if (Q >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const K = H & 1 ? "03" : "02", Z = l.fromHex(K + b(Q)), st = a(Q), ht = c(-G * st), bt = c(M * st), at = l.BASE.multiplyAndAddUnsafe(Z, ht, bt);
      if (!at)
        throw new Error("point at infinify");
      return at.assertValidity(), at;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return y(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, c(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return mi(this.toDERHex());
    }
    toDERHex() {
      return Qr.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return mi(this.toCompactHex());
    }
    toCompactHex() {
      return b(this.r) + b(this.s);
    }
  }
  const I = {
    isValidPrivateKey(m) {
      try {
        return h(m), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const m = g0(t.n);
      return Mv(t.randomBytes(m), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(m = 8, E = l.BASE) {
      return E._setWindowSize(m), E.multiply(BigInt(3)), E;
    }
  };
  function v(m, E = !0) {
    return l.fromPrivateKey(m).toRawBytes(E);
  }
  function T(m) {
    const E = hs(m), R = typeof m == "string", M = (E || R) && m.length;
    return E ? M === s || M === i : R ? M === 2 * s || M === 2 * i : m instanceof l;
  }
  function k(m, E, R = !0) {
    if (T(m))
      throw new Error("first arg must be private key");
    if (!T(E))
      throw new Error("second arg must be public key");
    return l.fromHex(E).multiply(h(m)).toRawBytes(R);
  }
  const x = t.bits2int || function(m) {
    const E = es(m), R = m.length * 8 - t.nBitLength;
    return R > 0 ? E >> BigInt(R) : E;
  }, N = t.bits2int_modN || function(m) {
    return c(x(m));
  }, O = qu(t.nBitLength);
  function _(m) {
    if (typeof m != "bigint")
      throw new Error("bigint expected");
    if (!(Nn <= m && m < O))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return wi(m, t.nByteLength);
  }
  function U(m, E, R = P) {
    if (["recovered", "canonical"].some((lt) => lt in R))
      throw new Error("sign() legacy options not supported");
    const { hash: M, randomBytes: H } = t;
    let { lowS: G, prehash: Q, extraEntropy: K } = R;
    G == null && (G = !0), m = De("msgHash", m), Q && (m = De("prehashed msgHash", M(m)));
    const Z = N(m), st = h(E), ht = [_(st), _(Z)];
    if (K != null && K !== !1) {
      const lt = K === !0 ? H(e.BYTES) : K;
      ht.push(De("extraEntropy", lt));
    }
    const bt = Lo(...ht), at = Z;
    function Ht(lt) {
      const yt = x(lt);
      if (!p(yt))
        return;
      const Pt = a(yt), Y = l.BASE.multiply(yt).toAffine(), dt = c(Y.x);
      if (dt === Nn)
        return;
      const Ut = c(Pt * c(at + dt * st));
      if (Ut === Nn)
        return;
      let Be = (Y.x === dt ? 0 : 2) | Number(Y.y & xe), Oe = Ut;
      return G && y(Ut) && (Oe = d(Ut), Be ^= 1), new w(dt, Oe, Be);
    }
    return { seed: bt, k2sig: Ht };
  }
  const P = { lowS: t.lowS, prehash: !1 }, V = { lowS: t.lowS, prehash: !1 };
  function $(m, E, R = P) {
    const { seed: M, k2sig: H } = U(m, E, R), G = t;
    return f0(G.hash.outputLen, G.nByteLength, G.hmac)(M, H);
  }
  l.BASE._setWindowSize(8);
  function rt(m, E, R, M = V) {
    var Pt;
    const H = m;
    if (E = De("msgHash", E), R = De("publicKey", R), "strict" in M)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: G, prehash: Q } = M;
    let K, Z;
    try {
      if (typeof H == "string" || hs(H))
        try {
          K = w.fromDER(H);
        } catch (Y) {
          if (!(Y instanceof Qr.Err))
            throw Y;
          K = w.fromCompact(H);
        }
      else if (typeof H == "object" && typeof H.r == "bigint" && typeof H.s == "bigint") {
        const { r: Y, s: dt } = H;
        K = new w(Y, dt);
      } else
        throw new Error("PARSE");
      Z = l.fromHex(R);
    } catch (Y) {
      if (Y.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (G && K.hasHighS())
      return !1;
    Q && (E = t.hash(E));
    const { r: st, s: ht } = K, bt = N(E), at = a(ht), Ht = c(bt * at), lt = c(st * at), yt = (Pt = l.BASE.multiplyAndAddUnsafe(Z, Ht, lt)) == null ? void 0 : Pt.toAffine();
    return yt ? c(yt.x) === st : !1;
  }
  return {
    CURVE: t,
    getPublicKey: v,
    getSharedSecret: k,
    sign: $,
    verify: rt,
    ProjectivePoint: l,
    Signature: w,
    utils: I
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Qv(n) {
  return {
    hash: n,
    hmac: (t, ...e) => l0(n, t, lv(...e)),
    randomBytes: hv
  };
}
function qv(n, t) {
  const e = (r) => zv({ ...n, ...Qv(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const m0 = Fv(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Kv = m0.create(BigInt("-3")), Jv = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b");
qv({
  a: Kv,
  // Equation params: a, b
  b: Jv,
  Fp: m0,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: !1
}, wv);
const Vf = "embeddedWallet", Zv = {
  SAPPHIRE_PROVIDER_NOT_INITIALIZED: "OAW_SAPPHIRE_PROVIDER_NOT_INITIALIZED",
  ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED: "OAW_ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED",
  NO_USERNAME: "OAW_NO_USERNAME",
  NO_PASSWORD: "OAW_NO_PASSWORD",
  NO_LOGIN_PROXY_DATA: "OAW_NO_LOGIN_PROXY_DATA",
  AUTHENTICATION_DATA_NOT_PROVIDED: "OAW_AUTHENTICATION_DATA_NOT_PROVIDED",
  CANT_GET_ACCOUNT_ADDRESS: "OAW_CANT_GET_ACCOUNT_ADDRESS",
  NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: "OAW_NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID",
  CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: "OAW_CROSS_CHAIN_PROVIDER_NOT_INITIALIZED",
  OASIS_WALLET_NOT_INITIALIZED: "OAW_OASIS_WALLET_NOT_INITIALIZED",
  CANT_HASH_USERNAME: "OAW_CANT_HASH_USERNAME",
  CANT_GET_SIGNATURE: "CANT_GET_SIGNATURE",
  NO_APILLON_SESSION_TOKEN_CALLBACK: "NO_APILLON_SESSION_TOKEN_CALLBACK",
  INVALID_APILLON_SESSION_TOKEN: "INVALID_APILLON_SESSION_TOKEN"
};
function $f(n, t = "Error") {
  const e = new Error(t);
  throw e.name = Zv[n], e;
}
new qr.Sequence({
  name: "sig",
  value: [
    new qr.Integer({
      name: "r"
    }),
    new qr.Integer({
      name: "s"
    })
  ]
});
Qf(sv);
function w0() {
  const n = v0();
  jf(() => {
    t();
  });
  function t() {
    if (typeof window < "u" && window[Vf]) {
      n.value = window[Vf];
      return;
    }
    setTimeout(t, 50);
  }
  return {
    wallet: x0(() => n.value)
  };
}
function Yv() {
  const { wallet: n } = w0(), t = I0({
    username: "",
    address: "",
    authStrategy: "passkey"
  });
  N0(
    n,
    (s, i) => {
      s && !i && (t.username = s.lastAccount.username, t.address = s.lastAccount.address, t.authStrategy = s.lastAccount.authStrategy, s.events.on("dataUpdated", e));
    },
    { immediate: !0 }
  );
  function e({ name: s, newValue: i }) {
    s === "username" ? t.username = i : s === "address" ? t.address = i : s === "authStrategy" && (t.authStrategy = i);
  }
  async function r(s = void 0) {
    var i;
    return await ((i = n.value) == null ? void 0 : i.getAccountBalance(t.address, s));
  }
  return {
    info: B0(t),
    getBalance: r
  };
}
function Cx({
  abi: n,
  address: t,
  chainId: e,
  mustConfirm: r = !0
}) {
  const { wallet: s } = w0(), { info: i } = Yv();
  async function o(a, l) {
    if (!s.value) {
      $f("OASIS_WALLET_NOT_INITIALIZED");
      return;
    }
    return await s.value.contractRead({
      contractAbi: n,
      contractAddress: t,
      contractFunctionName: a,
      contractFunctionValues: l,
      chainId: e
    });
  }
  async function c(a, l, h) {
    if (!s.value) {
      $f("OASIS_WALLET_NOT_INITIALIZED");
      return;
    }
    return await s.value.signContractWrite({
      contractAbi: n,
      contractAddress: t,
      contractFunctionName: a,
      contractFunctionValues: l,
      chainId: e,
      label: h,
      strategy: i.authStrategy,
      authData: { username: i.username },
      mustConfirm: r
    });
  }
  return {
    read: o,
    write: c
  };
}
export {
  Rx as WalletWidget,
  Yv as useAccount,
  Cx as useContract,
  w0 as useWallet
};
