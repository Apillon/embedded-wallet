import './main.css';var Ef = Object.defineProperty;
var Il = (r) => {
  throw TypeError(r);
};
var vf = (r, t, e) => t in r ? Ef(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var b = (r, t, e) => vf(r, typeof t != "symbol" ? t + "" : t, e), To = (r, t, e) => t.has(r) || Il("Cannot " + e);
var d = (r, t, e) => (To(r, t, "read from private field"), e ? e.call(r) : t.get(r)), x = (r, t, e) => t.has(r) ? Il("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), p = (r, t, e, n) => (To(r, t, "write to private field"), n ? n.call(r, e) : t.set(r, e), e), B = (r, t, e) => (To(r, t, "access private method"), e);
var Ni = (r, t, e, n) => ({
  set _(s) {
    p(r, t, s, e);
  },
  get _() {
    return d(r, t, n);
  }
});
import { jsx as C, jsxs as J, Fragment as Xe } from "react/jsx-runtime";
import xf, { createContext as Gc, useReducer as Vc, useState as At, useEffect as Re, useContext as _c, forwardRef as Nf, useRef as cn, useMemo as Ha } from "react";
import If from "react-dom";
import { Transition as Tf, Dialog as Cf, TransitionChild as Tl, DialogPanel as Of } from "@headlessui/react";
import * as Pf from "@oasisprotocol/sapphire-paratime";
import { pbkdf2Sync as kf } from "pbkdf2";
import { CBOR as Xu } from "cbor-redux";
import * as Ta from "asn1js";
import Rf from "mitt";
import { ProviderRpcError as $u } from "viem";
import { parseAbi as Sf } from "abitype";
import { ethers as Ga } from "ethers";
import Bf from "react-qr-code";
function Uf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var th = { exports: {} }, bt = th.exports = {}, Fe, Me;
function Xo() {
  throw new Error("setTimeout has not been defined");
}
function $o() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Fe = setTimeout : Fe = Xo;
  } catch {
    Fe = Xo;
  }
  try {
    typeof clearTimeout == "function" ? Me = clearTimeout : Me = $o;
  } catch {
    Me = $o;
  }
})();
function eh(r) {
  if (Fe === setTimeout)
    return setTimeout(r, 0);
  if ((Fe === Xo || !Fe) && setTimeout)
    return Fe = setTimeout, setTimeout(r, 0);
  try {
    return Fe(r, 0);
  } catch {
    try {
      return Fe.call(null, r, 0);
    } catch {
      return Fe.call(this, r, 0);
    }
  }
}
function Df(r) {
  if (Me === clearTimeout)
    return clearTimeout(r);
  if ((Me === $o || !Me) && clearTimeout)
    return Me = clearTimeout, clearTimeout(r);
  try {
    return Me(r);
  } catch {
    try {
      return Me.call(null, r);
    } catch {
      return Me.call(this, r);
    }
  }
}
var Er = [], As = !1, mn, Ca = -1;
function Lf() {
  !As || !mn || (As = !1, mn.length ? Er = mn.concat(Er) : Ca = -1, Er.length && rh());
}
function rh() {
  if (!As) {
    var r = eh(Lf);
    As = !0;
    for (var t = Er.length; t; ) {
      for (mn = Er, Er = []; ++Ca < t; )
        mn && mn[Ca].run();
      Ca = -1, t = Er.length;
    }
    mn = null, As = !1, Df(r);
  }
}
bt.nextTick = function(r) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var e = 1; e < arguments.length; e++)
      t[e - 1] = arguments[e];
  Er.push(new nh(r, t)), Er.length === 1 && !As && eh(rh);
};
function nh(r, t) {
  this.fun = r, this.array = t;
}
nh.prototype.run = function() {
  this.fun.apply(null, this.array);
};
bt.title = "browser";
bt.browser = !0;
bt.env = {};
bt.argv = [];
bt.version = "";
bt.versions = {};
function Tr() {
}
bt.on = Tr;
bt.addListener = Tr;
bt.once = Tr;
bt.off = Tr;
bt.removeListener = Tr;
bt.removeAllListeners = Tr;
bt.emit = Tr;
bt.prependListener = Tr;
bt.prependOnceListener = Tr;
bt.listeners = function(r) {
  return [];
};
bt.binding = function(r) {
  throw new Error("process.binding is not supported");
};
bt.cwd = function() {
  return "/";
};
bt.chdir = function(r) {
  throw new Error("process.chdir is not supported");
};
bt.umask = function() {
  return 0;
};
var Ff = th.exports;
const Mf = /* @__PURE__ */ Uf(Ff);
var Pi = {}, Ii = If;
if (Mf.env.NODE_ENV === "production")
  Pi.createRoot = Ii.createRoot, Pi.hydrateRoot = Ii.hydrateRoot;
else {
  var ga = Ii.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Pi.createRoot = function(r, t) {
    ga.usingClientEntryPoint = !0;
    try {
      return Ii.createRoot(r, t);
    } finally {
      ga.usingClientEntryPoint = !1;
    }
  }, Pi.hydrateRoot = function(r, t, e) {
    ga.usingClientEntryPoint = !0;
    try {
      return Ii.hydrateRoot(r, t, e);
    } finally {
      ga.usingClientEntryPoint = !1;
    }
  };
}
const Hf = "6.13.1";
function Gf(r, t, e) {
  const n = t.split("|").map((i) => i.trim());
  for (let i = 0; i < n.length; i++)
    switch (t) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof r === t)
          return;
    }
  const s = new Error(`invalid value for type ${t}`);
  throw s.code = "INVALID_ARGUMENT", s.argument = `value.${e}`, s.value = r, s;
}
async function jt(r) {
  const t = Object.keys(r);
  return (await Promise.all(t.map((e) => Promise.resolve(r[e])))).reduce((e, n, s) => (e[t[s]] = n, e), {});
}
function Q(r, t, e) {
  for (let n in t) {
    let s = t[n];
    const i = e ? e[n] : null;
    i && Gf(s, i, n), Object.defineProperty(r, n, { enumerable: !0, value: s, writable: !1 });
  }
}
function ds(r) {
  if (r == null)
    return "null";
  if (Array.isArray(r))
    return "[ " + r.map(ds).join(", ") + " ]";
  if (r instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let n = 0; n < r.length; n++)
      e += t[r[n] >> 4], e += t[r[n] & 15];
    return e;
  }
  if (typeof r == "object" && typeof r.toJSON == "function")
    return ds(r.toJSON());
  switch (typeof r) {
    case "boolean":
    case "symbol":
      return r.toString();
    case "bigint":
      return BigInt(r).toString();
    case "number":
      return r.toString();
    case "string":
      return JSON.stringify(r);
    case "object": {
      const t = Object.keys(r);
      return t.sort(), "{ " + t.map((e) => `${ds(e)}: ${ds(r[e])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Ft(r, t) {
  return r && r.code === t;
}
function jc(r) {
  return Ft(r, "CALL_EXCEPTION");
}
function ht(r, t, e) {
  let n = r;
  {
    const i = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${ds(e)}`);
      for (const a in e) {
        if (a === "shortMessage")
          continue;
        const o = e[a];
        i.push(a + "=" + ds(o));
      }
    }
    i.push(`code=${t}`), i.push(`version=${Hf}`), i.length && (r += " (" + i.join(", ") + ")");
  }
  let s;
  switch (t) {
    case "INVALID_ARGUMENT":
      s = new TypeError(r);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(r);
      break;
    default:
      s = new Error(r);
  }
  return Q(s, { code: t }), e && Object.assign(s, e), s.shortMessage == null && Q(s, { shortMessage: n }), s;
}
function R(r, t, e, n) {
  if (!r)
    throw ht(t, e, n);
}
function A(r, t, e, n) {
  R(r, t, "INVALID_ARGUMENT", { argument: e, value: n });
}
function sh(r, t, e) {
  e == null && (e = ""), e && (e = ": " + e), R(r >= t, "missing arguemnt" + e, "MISSING_ARGUMENT", {
    count: r,
    expectedCount: t
  }), R(r <= t, "too many arguments" + e, "UNEXPECTED_ARGUMENT", {
    count: r,
    expectedCount: t
  });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((r, t) => {
  try {
    if ("test".normalize(t) !== "test")
      throw new Error("bad");
    if (t === "NFD" && "é".normalize("NFD") !== "é")
      throw new Error("broken");
    r.push(t);
  } catch {
  }
  return r;
}, []);
function oa(r, t, e) {
  if (e == null && (e = ""), r !== t) {
    let n = e, s = "new";
    e && (n += ".", s += " " + e), R(!1, `private constructor; use ${n}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: s
    });
  }
}
function ih(r, t, e) {
  if (r instanceof Uint8Array)
    return e ? new Uint8Array(r) : r;
  if (typeof r == "string" && r.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const n = new Uint8Array((r.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < n.length; i++)
      n[i] = parseInt(r.substring(s, s + 2), 16), s += 2;
    return n;
  }
  A(!1, "invalid BytesLike value", t || "value", r);
}
function q(r, t) {
  return ih(r, t, !1);
}
function Qt(r, t) {
  return ih(r, t, !0);
}
function ot(r, t) {
  return !(typeof r != "string" || !r.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && r.length !== 2 + 2 * t || t === !0 && r.length % 2 !== 0);
}
function Qc(r) {
  return ot(r, !0) || r instanceof Uint8Array;
}
const Cl = "0123456789abcdef";
function H(r) {
  const t = q(r);
  let e = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    e += Cl[(s & 240) >> 4] + Cl[s & 15];
  }
  return e;
}
function ut(r) {
  return "0x" + r.map((t) => H(t).substring(2)).join("");
}
function _n(r) {
  return ot(r, !0) ? (r.length - 2) / 2 : q(r).length;
}
function dt(r, t, e) {
  const n = q(r);
  return e != null && e > n.length && R(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: n,
    length: n.length,
    offset: e
  }), H(n.slice(t ?? 0, e ?? n.length));
}
function ah(r, t, e) {
  const n = q(r);
  R(t >= n.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(n),
    length: t,
    offset: t + 1
  });
  const s = new Uint8Array(t);
  return s.fill(0), e ? s.set(n, t - n.length) : s.set(n, 0), H(s);
}
function Ze(r, t) {
  return ah(r, t, !0);
}
function zc(r, t) {
  return ah(r, t, !1);
}
const lo = BigInt(0), ke = BigInt(1), fs = 9007199254740991;
function Va(r, t) {
  const e = uo(r, "value"), n = BigInt(W(t, "width"));
  if (R(e >> n === lo, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: r
  }), e >> n - ke) {
    const s = (ke << n) - ke;
    return -((~e & s) + ke);
  }
  return e;
}
function Jc(r, t) {
  let e = G(r, "value");
  const n = BigInt(W(t, "width")), s = ke << n - ke;
  if (e < lo) {
    e = -e, R(e <= s, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r
    });
    const i = (ke << n) - ke;
    return (~e & i) + ke;
  } else
    R(e < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r
    });
  return e;
}
function yn(r, t) {
  const e = uo(r, "value"), n = BigInt(W(t, "bits"));
  return e & (ke << n) - ke;
}
function G(r, t) {
  switch (typeof r) {
    case "bigint":
      return r;
    case "number":
      return A(Number.isInteger(r), "underflow", t || "value", r), A(r >= -fs && r <= fs, "overflow", t || "value", r), BigInt(r);
    case "string":
      try {
        if (r === "")
          throw new Error("empty string");
        return r[0] === "-" && r[1] !== "-" ? -BigInt(r.substring(1)) : BigInt(r);
      } catch (e) {
        A(!1, `invalid BigNumberish string: ${e.message}`, t || "value", r);
      }
  }
  A(!1, "invalid BigNumberish value", t || "value", r);
}
function uo(r, t) {
  const e = G(r, t);
  return R(e >= lo, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: r
  }), e;
}
const Ol = "0123456789abcdef";
function li(r) {
  if (r instanceof Uint8Array) {
    let t = "0x0";
    for (const e of r)
      t += Ol[e >> 4], t += Ol[e & 15];
    return BigInt(t);
  }
  return G(r);
}
function W(r, t) {
  switch (typeof r) {
    case "bigint":
      return A(r >= -fs && r <= fs, "overflow", t || "value", r), Number(r);
    case "number":
      return A(Number.isInteger(r), "underflow", t || "value", r), A(r >= -fs && r <= fs, "overflow", t || "value", r), r;
    case "string":
      try {
        if (r === "")
          throw new Error("empty string");
        return W(BigInt(r), t);
      } catch (e) {
        A(!1, `invalid numeric string: ${e.message}`, t || "value", r);
      }
  }
  A(!1, "invalid numeric value", t || "value", r);
}
function Vf(r) {
  return W(li(r));
}
function en(r, t) {
  let e = uo(r, "value").toString(16);
  if (t == null)
    e.length % 2 && (e = "0" + e);
  else {
    const n = W(t, "width");
    for (R(n * 2 >= e.length, `value exceeds width (${n} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: r
    }); e.length < n * 2; )
      e = "0" + e;
  }
  return "0x" + e;
}
function xt(r) {
  const t = uo(r, "value");
  if (t === lo)
    return new Uint8Array([]);
  let e = t.toString(16);
  e.length % 2 && (e = "0" + e);
  const n = new Uint8Array(e.length / 2);
  for (let s = 0; s < n.length; s++) {
    const i = s * 2;
    n[s] = parseInt(e.substring(i, i + 2), 16);
  }
  return n;
}
function ps(r) {
  let t = H(Qc(r) ? r : xt(r)).substring(2);
  for (; t.startsWith("0"); )
    t = t.substring(1);
  return t === "" && (t = "0"), "0x" + t;
}
const Pl = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
BigInt(0);
const kl = BigInt(58);
function _f(r) {
  const t = q(r);
  let e = li(t), n = "";
  for (; e; )
    n = Pl[Number(e % kl)] + n, e /= kl;
  for (let s = 0; s < t.length && !t[s]; s++)
    n = Pl[0] + n;
  return n;
}
function jf(r) {
  r = atob(r);
  const t = new Uint8Array(r.length);
  for (let e = 0; e < r.length; e++)
    t[e] = r.charCodeAt(e);
  return q(t);
}
function Qf(r) {
  const t = q(r);
  let e = "";
  for (let n = 0; n < t.length; n++)
    e += String.fromCharCode(t[n]);
  return btoa(e);
}
var xs;
class oh {
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(t, e, n) {
    /**
     *  The event filter.
     */
    b(this, "filter");
    /**
     *  The **EventEmitterable**.
     */
    b(this, "emitter");
    x(this, xs);
    p(this, xs, e), Q(this, { emitter: t, filter: n });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    d(this, xs) != null && await this.emitter.off(this.filter, d(this, xs));
  }
}
xs = new WeakMap();
function zf(r, t, e, n, s) {
  A(!1, `invalid codepoint at offset ${t}; ${r}`, "bytes", e);
}
function ch(r, t, e, n, s) {
  if (r === "BAD_PREFIX" || r === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let a = t + 1; a < e.length && e[a] >> 6 === 2; a++)
      i++;
    return i;
  }
  return r === "OVERRUN" ? e.length - t - 1 : 0;
}
function Jf(r, t, e, n, s) {
  return r === "OVERLONG" ? (A(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), n.push(s), 0) : (n.push(65533), ch(r, t, e));
}
const Kf = Object.freeze({
  error: zf,
  ignore: ch,
  replace: Jf
});
function qf(r, t) {
  t == null && (t = Kf.error);
  const e = q(r, "bytes"), n = [];
  let s = 0;
  for (; s < e.length; ) {
    const i = e[s++];
    if (!(i >> 7)) {
      n.push(i);
      continue;
    }
    let a = null, o = null;
    if ((i & 224) === 192)
      a = 1, o = 127;
    else if ((i & 240) === 224)
      a = 2, o = 2047;
    else if ((i & 248) === 240)
      a = 3, o = 65535;
    else {
      (i & 192) === 128 ? s += t("UNEXPECTED_CONTINUE", s - 1, e, n) : s += t("BAD_PREFIX", s - 1, e, n);
      continue;
    }
    if (s - 1 + a >= e.length) {
      s += t("OVERRUN", s - 1, e, n);
      continue;
    }
    let c = i & (1 << 8 - a - 1) - 1;
    for (let l = 0; l < a; l++) {
      let h = e[s];
      if ((h & 192) != 128) {
        s += t("MISSING_CONTINUE", s, e, n), c = null;
        break;
      }
      c = c << 6 | h & 63, s++;
    }
    if (c !== null) {
      if (c > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - a, e, n, c);
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - a, e, n, c);
        continue;
      }
      if (c <= o) {
        s += t("OVERLONG", s - 1 - a, e, n, c);
        continue;
      }
      n.push(c);
    }
  }
  return n;
}
function Se(r, t) {
  A(typeof r == "string", "invalid string value", "str", r);
  let e = [];
  for (let n = 0; n < r.length; n++) {
    const s = r.charCodeAt(n);
    if (s < 128)
      e.push(s);
    else if (s < 2048)
      e.push(s >> 6 | 192), e.push(s & 63 | 128);
    else if ((s & 64512) == 55296) {
      n++;
      const i = r.charCodeAt(n);
      A(n < r.length && (i & 64512) === 56320, "invalid surrogate pair", "str", r);
      const a = 65536 + ((s & 1023) << 10) + (i & 1023);
      e.push(a >> 18 | 240), e.push(a >> 12 & 63 | 128), e.push(a >> 6 & 63 | 128), e.push(a & 63 | 128);
    } else
      e.push(s >> 12 | 224), e.push(s >> 6 & 63 | 128), e.push(s & 63 | 128);
  }
  return new Uint8Array(e);
}
function Wf(r) {
  return r.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function _a(r, t) {
  return Wf(qf(r, t));
}
function lh(r) {
  async function t(e, n) {
    R(n == null || !n.cancelled, "request cancelled before sending", "CANCELLED");
    const s = e.url.split(":")[0].toLowerCase();
    R(s === "http" || s === "https", `unsupported protocol ${s}`, "UNSUPPORTED_OPERATION", {
      info: { protocol: s },
      operation: "request"
    }), R(s === "https" || !e.credentials || e.allowInsecureAuthentication, "insecure authorized connections unsupported", "UNSUPPORTED_OPERATION", {
      operation: "request"
    });
    let i = null;
    const a = new AbortController(), o = setTimeout(() => {
      i = ht("request timeout", "TIMEOUT"), a.abort();
    }, e.timeout);
    n && n.addListener(() => {
      i = ht("request cancelled", "CANCELLED"), a.abort();
    });
    const c = {
      method: e.method,
      headers: new Headers(Array.from(e)),
      body: e.body || void 0,
      signal: a.signal
    };
    let l;
    try {
      l = await fetch(e.url, c);
    } catch (y) {
      throw clearTimeout(o), i || y;
    }
    clearTimeout(o);
    const h = {};
    l.headers.forEach((y, m) => {
      h[m.toLowerCase()] = y;
    });
    const u = await l.arrayBuffer(), f = u == null ? null : new Uint8Array(u);
    return {
      statusCode: l.status,
      statusMessage: l.statusText,
      headers: h,
      body: f
    };
  }
  return t;
}
const Zf = 12, Yf = 250;
let Rl = lh();
const Xf = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), $f = new RegExp("^ipfs://(ipfs/)?(.*)$", "i");
let Co = !1;
async function uh(r, t) {
  try {
    const e = r.match(Xf);
    if (!e)
      throw new Error("invalid data");
    return new tn(200, "OK", {
      "content-type": e[1] || "text/plain"
    }, e[2] ? jf(e[3]) : ep(e[3]));
  } catch {
    return new tn(599, "BAD REQUEST (invalid data: URI)", {}, null, new Nr(r));
  }
}
function hh(r) {
  async function t(e, n) {
    try {
      const s = e.match($f);
      if (!s)
        throw new Error("invalid link");
      return new Nr(`${r}${s[2]}`);
    } catch {
      return new tn(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new Nr(e));
    }
  }
  return t;
}
const ma = {
  data: uh,
  ipfs: hh("https://gateway.ipfs.io/ipfs/")
}, dh = /* @__PURE__ */ new WeakMap();
var vn, Fr;
class tp {
  constructor(t) {
    x(this, vn);
    x(this, Fr);
    p(this, vn, []), p(this, Fr, !1), dh.set(t, () => {
      if (!d(this, Fr)) {
        p(this, Fr, !0);
        for (const e of d(this, vn))
          setTimeout(() => {
            e();
          }, 0);
        p(this, vn, []);
      }
    });
  }
  addListener(t) {
    R(!d(this, Fr), "singal already cancelled", "UNSUPPORTED_OPERATION", {
      operation: "fetchCancelSignal.addCancelListener"
    }), d(this, vn).push(t);
  }
  get cancelled() {
    return d(this, Fr);
  }
  checkSignal() {
    R(!this.cancelled, "cancelled", "CANCELLED", {});
  }
}
vn = new WeakMap(), Fr = new WeakMap();
function ya(r) {
  if (r == null)
    throw new Error("missing signal; should not happen");
  return r.checkSignal(), r;
}
var Ns, Is, Ie, or, Ts, Cs, It, se, cr, xn, Nn, In, He, Te, Mr, Tn, ki;
const ro = class ro {
  /**
   *  Create a new FetchRequest instance with default values.
   *
   *  Once created, each property may be set before issuing a
   *  ``.send()`` to make the request.
   */
  constructor(t) {
    x(this, Tn);
    x(this, Ns);
    x(this, Is);
    x(this, Ie);
    x(this, or);
    x(this, Ts);
    x(this, Cs);
    x(this, It);
    x(this, se);
    x(this, cr);
    // Hooks
    x(this, xn);
    x(this, Nn);
    x(this, In);
    x(this, He);
    x(this, Te);
    x(this, Mr);
    p(this, Cs, String(t)), p(this, Ns, !1), p(this, Is, !0), p(this, Ie, {}), p(this, or, ""), p(this, Ts, 3e5), p(this, Te, {
      slotInterval: Yf,
      maxAttempts: Zf
    }), p(this, Mr, null);
  }
  /**
   *  The fetch URL to request.
   */
  get url() {
    return d(this, Cs);
  }
  set url(t) {
    p(this, Cs, String(t));
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
    return d(this, It) == null ? null : new Uint8Array(d(this, It));
  }
  set body(t) {
    if (t == null)
      p(this, It, void 0), p(this, se, void 0);
    else if (typeof t == "string")
      p(this, It, Se(t)), p(this, se, "text/plain");
    else if (t instanceof Uint8Array)
      p(this, It, t), p(this, se, "application/octet-stream");
    else if (typeof t == "object")
      p(this, It, Se(JSON.stringify(t))), p(this, se, "application/json");
    else
      throw new Error("invalid body");
  }
  /**
   *  Returns true if the request has a body.
   */
  hasBody() {
    return d(this, It) != null;
  }
  /**
   *  The HTTP method to use when requesting the URI. If no method
   *  has been explicitly set, then ``GET`` is used if the body is
   *  null and ``POST`` otherwise.
   */
  get method() {
    return d(this, or) ? d(this, or) : this.hasBody() ? "POST" : "GET";
  }
  set method(t) {
    t == null && (t = ""), p(this, or, String(t).toUpperCase());
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
    const t = Object.assign({}, d(this, Ie));
    return d(this, cr) && (t.authorization = `Basic ${Qf(Se(d(this, cr)))}`), this.allowGzip && (t["accept-encoding"] = "gzip"), t["content-type"] == null && d(this, se) && (t["content-type"] = d(this, se)), this.body && (t["content-length"] = String(this.body.length)), t;
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
    d(this, Ie)[String(t).toLowerCase()] = String(e);
  }
  /**
   *  Clear all headers, resetting all intrinsic headers.
   */
  clearHeaders() {
    p(this, Ie, {});
  }
  [Symbol.iterator]() {
    const t = this.headers, e = Object.keys(t);
    let n = 0;
    return {
      next: () => {
        if (n < e.length) {
          const s = e[n++];
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
    return d(this, cr) || null;
  }
  /**
   *  Sets an ``Authorization`` for %%username%% with %%password%%.
   */
  setCredentials(t, e) {
    A(!t.match(/:/), "invalid basic authentication username", "username", "[REDACTED]"), p(this, cr, `${t}:${e}`);
  }
  /**
   *  Enable and request gzip-encoded responses. The response will
   *  automatically be decompressed. //(default: true)//
   */
  get allowGzip() {
    return d(this, Is);
  }
  set allowGzip(t) {
    p(this, Is, !!t);
  }
  /**
   *  Allow ``Authentication`` credentials to be sent over insecure
   *  channels. //(default: false)//
   */
  get allowInsecureAuthentication() {
    return !!d(this, Ns);
  }
  set allowInsecureAuthentication(t) {
    p(this, Ns, !!t);
  }
  /**
   *  The timeout (in milliseconds) to wait for a complete response.
   *  //(default: 5 minutes)//
   */
  get timeout() {
    return d(this, Ts);
  }
  set timeout(t) {
    A(t >= 0, "timeout must be non-zero", "timeout", t), p(this, Ts, t);
  }
  /**
   *  This function is called prior to each request, for example
   *  during a redirection or retry in case of server throttling.
   *
   *  This offers an opportunity to populate headers or update
   *  content before sending a request.
   */
  get preflightFunc() {
    return d(this, xn) || null;
  }
  set preflightFunc(t) {
    p(this, xn, t);
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
    return d(this, Nn) || null;
  }
  set processFunc(t) {
    p(this, Nn, t);
  }
  /**
   *  This function is called on each retry attempt.
   */
  get retryFunc() {
    return d(this, In) || null;
  }
  set retryFunc(t) {
    p(this, In, t);
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
    return d(this, Mr) || Rl;
  }
  set getUrlFunc(t) {
    p(this, Mr, t);
  }
  toString() {
    return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${d(this, It) ? H(d(this, It)) : "null"}>`;
  }
  /**
   *  Update the throttle parameters used to determine maximum
   *  attempts and exponential-backoff properties.
   */
  setThrottleParams(t) {
    t.slotInterval != null && (d(this, Te).slotInterval = t.slotInterval), t.maxAttempts != null && (d(this, Te).maxAttempts = t.maxAttempts);
  }
  /**
   *  Resolves to the response by sending the request.
   */
  send() {
    return R(d(this, He) == null, "request already sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.send" }), p(this, He, new tp(this)), B(this, Tn, ki).call(this, 0, Sl() + this.timeout, 0, this, new tn(0, "", {}, null, this));
  }
  /**
   *  Cancels the inflight response, causing a ``CANCELLED``
   *  error to be rejected from the [[send]].
   */
  cancel() {
    R(d(this, He) != null, "request has not been sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.cancel" });
    const t = dh.get(this);
    if (!t)
      throw new Error("missing signal; should not happen");
    t();
  }
  /**
   *  Returns a new [[FetchRequest]] that represents the redirection
   *  to %%location%%.
   */
  redirect(t) {
    const e = this.url.split(":")[0].toLowerCase(), n = t.split(":")[0].toLowerCase();
    R(this.method === "GET" && (e !== "https" || n !== "http") && t.match(/^https?:/), "unsupported redirect", "UNSUPPORTED_OPERATION", {
      operation: `redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(t)})`
    });
    const s = new ro(t);
    return s.method = "GET", s.allowGzip = this.allowGzip, s.timeout = this.timeout, p(s, Ie, Object.assign({}, d(this, Ie))), d(this, It) && p(s, It, new Uint8Array(d(this, It))), p(s, se, d(this, se)), s;
  }
  /**
   *  Create a new copy of this request.
   */
  clone() {
    const t = new ro(this.url);
    return p(t, or, d(this, or)), d(this, It) && p(t, It, d(this, It)), p(t, se, d(this, se)), p(t, Ie, Object.assign({}, d(this, Ie))), p(t, cr, d(this, cr)), this.allowGzip && (t.allowGzip = !0), t.timeout = this.timeout, this.allowInsecureAuthentication && (t.allowInsecureAuthentication = !0), p(t, xn, d(this, xn)), p(t, Nn, d(this, Nn)), p(t, In, d(this, In)), p(t, Te, Object.assign({}, d(this, Te))), p(t, Mr, d(this, Mr)), t;
  }
  /**
   *  Locks all static configuration for gateways and FetchGetUrlFunc
   *  registration.
   */
  static lockConfig() {
    Co = !0;
  }
  /**
   *  Get the current Gateway function for %%scheme%%.
   */
  static getGateway(t) {
    return ma[t.toLowerCase()] || null;
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
    if (Co)
      throw new Error("gateways locked");
    ma[t] = e;
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
    if (Co)
      throw new Error("gateways locked");
    Rl = t;
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
    return lh();
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
    return uh;
  }
  /**
   *  Creates a function that will fetch IPFS (unvalidated) from
   *  a custom gateway baseUrl.
   *
   *  The default IPFS gateway used internally is
   *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
   */
  static createIpfsGatewayFunc(t) {
    return hh(t);
  }
};
Ns = new WeakMap(), Is = new WeakMap(), Ie = new WeakMap(), or = new WeakMap(), Ts = new WeakMap(), Cs = new WeakMap(), It = new WeakMap(), se = new WeakMap(), cr = new WeakMap(), xn = new WeakMap(), Nn = new WeakMap(), In = new WeakMap(), He = new WeakMap(), Te = new WeakMap(), Mr = new WeakMap(), Tn = new WeakSet(), ki = async function(t, e, n, s, i) {
  var h, u, f;
  if (t >= d(this, Te).maxAttempts)
    return i.makeServerError("exceeded maximum retry limit");
  R(Sl() <= e, "timeout", "TIMEOUT", {
    operation: "request.send",
    reason: "timeout",
    request: s
  }), n > 0 && await rp(n);
  let a = this.clone();
  const o = (a.url.split(":")[0] || "").toLowerCase();
  if (o in ma) {
    const y = await ma[o](a.url, ya(d(s, He)));
    if (y instanceof tn) {
      let m = y;
      if (this.processFunc) {
        ya(d(s, He));
        try {
          m = await this.processFunc(a, m);
        } catch (g) {
          (g.throttle == null || typeof g.stall != "number") && m.makeServerError("error in post-processing function", g).assertOk();
        }
      }
      return m;
    }
    a = y;
  }
  this.preflightFunc && (a = await this.preflightFunc(a));
  const c = await this.getUrlFunc(a, ya(d(s, He)));
  let l = new tn(c.statusCode, c.statusMessage, c.headers, c.body, s);
  if (l.statusCode === 301 || l.statusCode === 302) {
    try {
      const y = l.headers.location || "";
      return B(h = a.redirect(y), Tn, ki).call(h, t + 1, e, 0, s, l);
    } catch {
    }
    return l;
  } else if (l.statusCode === 429 && (this.retryFunc == null || await this.retryFunc(a, l, t))) {
    const y = l.headers["retry-after"];
    let m = d(this, Te).slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
    return typeof y == "string" && y.match(/^[1-9][0-9]*$/) && (m = parseInt(y)), B(u = a.clone(), Tn, ki).call(u, t + 1, e, m, s, l);
  }
  if (this.processFunc) {
    ya(d(s, He));
    try {
      l = await this.processFunc(a, l);
    } catch (y) {
      (y.throttle == null || typeof y.stall != "number") && l.makeServerError("error in post-processing function", y).assertOk();
      let m = d(this, Te).slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
      return y.stall >= 0 && (m = y.stall), B(f = a.clone(), Tn, ki).call(f, t + 1, e, m, s, l);
    }
  }
  return l;
};
let Nr = ro;
var Wi, Zi, Yi, ie, Os, Cn;
const El = class El {
  constructor(t, e, n, s, i) {
    x(this, Wi);
    x(this, Zi);
    x(this, Yi);
    x(this, ie);
    x(this, Os);
    x(this, Cn);
    p(this, Wi, t), p(this, Zi, e), p(this, Yi, Object.keys(n).reduce((a, o) => (a[o.toLowerCase()] = String(n[o]), a), {})), p(this, ie, s == null ? null : new Uint8Array(s)), p(this, Os, i || null), p(this, Cn, { message: "" });
  }
  toString() {
    return `<FetchResponse status=${this.statusCode} body=${d(this, ie) ? H(d(this, ie)) : "null"}>`;
  }
  /**
   *  The response status code.
   */
  get statusCode() {
    return d(this, Wi);
  }
  /**
   *  The response status message.
   */
  get statusMessage() {
    return d(this, Zi);
  }
  /**
   *  The response headers. All keys are lower-case.
   */
  get headers() {
    return Object.assign({}, d(this, Yi));
  }
  /**
   *  The response body, or ``null`` if there was no body.
   */
  get body() {
    return d(this, ie) == null ? null : new Uint8Array(d(this, ie));
  }
  /**
   *  The response body as a UTF-8 encoded string, or the empty
   *  string (i.e. ``""``) if there was no body.
   *
   *  An error is thrown if the body is invalid UTF-8 data.
   */
  get bodyText() {
    try {
      return d(this, ie) == null ? "" : _a(d(this, ie));
    } catch {
      R(!1, "response body is not valid UTF-8 data", "UNSUPPORTED_OPERATION", {
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
      R(!1, "response body is not valid JSON", "UNSUPPORTED_OPERATION", {
        operation: "bodyJson",
        info: { response: this }
      });
    }
  }
  [Symbol.iterator]() {
    const t = this.headers, e = Object.keys(t);
    let n = 0;
    return {
      next: () => {
        if (n < e.length) {
          const s = e[n++];
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
    let n;
    t ? n = `CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${t})` : (t = `${this.statusCode} ${this.statusMessage}`, n = `CLIENT ESCALATED SERVER ERROR (${t})`);
    const s = new El(599, n, this.headers, this.body, d(this, Os) || void 0);
    return p(s, Cn, { message: t, error: e }), s;
  }
  /**
   *  If called within a [request.processFunc](FetchRequest-processFunc)
   *  call, causes the request to retry as if throttled for %%stall%%
   *  milliseconds.
   */
  throwThrottleError(t, e) {
    e == null ? e = -1 : A(Number.isInteger(e) && e >= 0, "invalid stall timeout", "stall", e);
    const n = new Error(t || "throttling requests");
    throw Q(n, { stall: e, throttle: !0 }), n;
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
    return d(this, ie) != null;
  }
  /**
   *  The request made for this response.
   */
  get request() {
    return d(this, Os);
  }
  /**
   *  Returns true if this response was a success statusCode.
   */
  ok() {
    return d(this, Cn).message === "" && this.statusCode >= 200 && this.statusCode < 300;
  }
  /**
   *  Throws a ``SERVER_ERROR`` if this response is not ok.
   */
  assertOk() {
    if (this.ok())
      return;
    let { message: t, error: e } = d(this, Cn);
    t === "" && (t = `server response ${this.statusCode} ${this.statusMessage}`);
    let n = null;
    this.request && (n = this.request.url);
    let s = null;
    try {
      d(this, ie) && (s = _a(d(this, ie)));
    } catch {
    }
    R(!1, t, "SERVER_ERROR", {
      request: this.request || "unknown request",
      response: this,
      error: e,
      info: {
        requestUrl: n,
        responseBody: s,
        responseStatus: `${this.statusCode} ${this.statusMessage}`
      }
    });
  }
};
Wi = new WeakMap(), Zi = new WeakMap(), Yi = new WeakMap(), ie = new WeakMap(), Os = new WeakMap(), Cn = new WeakMap();
let tn = El;
function Sl() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function ep(r) {
  return Se(r.replace(/%([0-9a-f][0-9a-f])/gi, (t, e) => String.fromCharCode(parseInt(e, 16))));
}
function rp(r) {
  return new Promise((t) => setTimeout(t, r));
}
const np = BigInt(-1), Ee = BigInt(0), gs = BigInt(1), sp = BigInt(5), ss = {};
let bs = "0000";
for (; bs.length < 80; )
  bs += bs;
function on(r) {
  let t = bs;
  for (; t.length < r; )
    t += t;
  return BigInt("1" + t.substring(0, r));
}
function Ti(r, t, e) {
  const n = BigInt(t.width);
  if (t.signed) {
    const s = gs << n - gs;
    R(e == null || r >= -s && r < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: r
    }), r > Ee ? r = Va(yn(r, n), n) : r = -Va(yn(-r, n), n);
  } else {
    const s = gs << n;
    R(e == null || r >= 0 && r < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: r
    }), r = (r % s + s) % s & s - gs;
  }
  return r;
}
function Oo(r) {
  typeof r == "number" && (r = `fixed128x${r}`);
  let t = !0, e = 128, n = 18;
  if (typeof r == "string") {
    if (r !== "fixed") if (r === "ufixed")
      t = !1;
    else {
      const i = r.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
      A(i, "invalid fixed format", "format", r), t = i[1] !== "u", e = parseInt(i[2]), n = parseInt(i[3]);
    }
  } else if (r) {
    const i = r, a = (o, c, l) => i[o] == null ? l : (A(typeof i[o] === c, "invalid fixed format (" + o + " not " + c + ")", "format." + o, i[o]), i[o]);
    t = a("signed", "boolean", t), e = a("width", "number", e), n = a("decimals", "number", n);
  }
  A(e % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", e), A(n <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", n);
  const s = (t ? "" : "u") + "fixed" + String(e) + "x" + String(n);
  return { signed: t, width: e, decimals: n, name: s };
}
function ip(r, t) {
  let e = "";
  r < Ee && (e = "-", r *= np);
  let n = r.toString();
  if (t === 0)
    return e + n;
  for (; n.length <= t; )
    n = bs + n;
  const s = n.length - t;
  for (n = n.substring(0, s) + "." + n.substring(s); n[0] === "0" && n[1] !== "."; )
    n = n.substring(1);
  for (; n[n.length - 1] === "0" && n[n.length - 2] !== "."; )
    n = n.substring(0, n.length - 1);
  return e + n;
}
var Ce, it, Vt, rt, ln, rr, ec, rc, nc, sc;
const Dr = class Dr {
  // Use this when changing this file to get some typing info,
  // but then switch to any to mask the internal type
  //constructor(guard: any, value: bigint, format: _FixedFormat) {
  /**
   *  @private
   */
  constructor(t, e, n) {
    x(this, rt);
    /**
     *  The specific fixed-point arithmetic field for this value.
     */
    b(this, "format");
    x(this, Ce);
    // The actual value (accounting for decimals)
    x(this, it);
    // A base-10 value to multiple values by to maintain the magnitude
    x(this, Vt);
    /**
     *  This is a property so console.log shows a human-meaningful value.
     *
     *  @private
     */
    b(this, "_value");
    oa(t, ss, "FixedNumber"), p(this, it, e), p(this, Ce, n);
    const s = ip(e, n.decimals);
    Q(this, { format: n.name, _value: s }), p(this, Vt, on(n.decimals));
  }
  /**
   *  If true, negative values are permitted, otherwise only
   *  positive values and zero are allowed.
   */
  get signed() {
    return d(this, Ce).signed;
  }
  /**
   *  The number of bits available to store the value.
   */
  get width() {
    return d(this, Ce).width;
  }
  /**
   *  The number of decimal places in the fixed-point arithment field.
   */
  get decimals() {
    return d(this, Ce).decimals;
  }
  /**
   *  The value as an integer, based on the smallest unit the
   *  [[decimals]] allow.
   */
  get value() {
    return d(this, it);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%, ignoring overflow.
   */
  addUnsafe(t) {
    return B(this, rt, ec).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  add(t) {
    return B(this, rt, ec).call(this, t, "add");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%, ignoring overflow.
   */
  subUnsafe(t) {
    return B(this, rt, rc).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  sub(t) {
    return B(this, rt, rc).call(this, t, "sub");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%, ignoring overflow and underflow (precision loss).
   */
  mulUnsafe(t) {
    return B(this, rt, nc).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  mul(t) {
    return B(this, rt, nc).call(this, t, "mul");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs or if underflow (precision loss) occurs.
   */
  mulSignal(t) {
    B(this, rt, ln).call(this, t);
    const e = d(this, it) * d(t, it);
    return R(e % d(this, Vt) === Ee, "precision lost during signalling mul", "NUMERIC_FAULT", {
      operation: "mulSignal",
      fault: "underflow",
      value: this
    }), B(this, rt, rr).call(this, e / d(this, Vt), "mulSignal");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  divUnsafe(t) {
    return B(this, rt, sc).call(this, t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  div(t) {
    return B(this, rt, sc).call(this, t, "div");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%. A [[NumericFaultError]] is thrown if underflow
   *  (precision loss) occurs.
   */
  divSignal(t) {
    R(d(t, it) !== Ee, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    }), B(this, rt, ln).call(this, t);
    const e = d(this, it) * d(this, Vt);
    return R(e % d(t, it) === Ee, "precision lost during signalling div", "NUMERIC_FAULT", {
      operation: "divSignal",
      fault: "underflow",
      value: this
    }), B(this, rt, rr).call(this, e / d(t, it), "divSignal");
  }
  /**
   *  Returns a comparison result between %%this%% and %%other%%.
   *
   *  This is suitable for use in sorting, where ``-1`` implies %%this%%
   *  is smaller, ``1`` implies %%this%% is larger and ``0`` implies
   *  both are equal.
   */
  cmp(t) {
    let e = this.value, n = t.value;
    const s = this.decimals - t.decimals;
    return s > 0 ? n *= on(s) : s < 0 && (e *= on(-s)), e < n ? -1 : e > n ? 1 : 0;
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
    let t = d(this, it);
    return d(this, it) < Ee && (t -= d(this, Vt) - gs), t = d(this, it) / d(this, Vt) * d(this, Vt), B(this, rt, rr).call(this, t, "floor");
  }
  /**
   *  Returns a new [[FixedNumber]] which is the smallest **integer**
   *  that is greater than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  ceiling() {
    let t = d(this, it);
    return d(this, it) > Ee && (t += d(this, Vt) - gs), t = d(this, it) / d(this, Vt) * d(this, Vt), B(this, rt, rr).call(this, t, "ceiling");
  }
  /**
   *  Returns a new [[FixedNumber]] with the decimal component
   *  rounded up on ties at %%decimals%% places.
   */
  round(t) {
    if (t == null && (t = 0), t >= this.decimals)
      return this;
    const e = this.decimals - t, n = sp * on(e - 1);
    let s = this.value + n;
    const i = on(e);
    return s = s / i * i, Ti(s, d(this, Ce), "round"), new Dr(ss, s, d(this, Ce));
  }
  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero() {
    return d(this, it) === Ee;
  }
  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative() {
    return d(this, it) < Ee;
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
    return Dr.fromString(this.toString(), t);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% divided by
   *  %%decimal%% places with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% (once adjusted
   *  for %%decimals%%) cannot fit in %%format%%, either due to overflow
   *  or underflow (precision loss).
   */
  static fromValue(t, e, n) {
    const s = e == null ? 0 : W(e), i = Oo(n);
    let a = G(t, "value");
    const o = s - i.decimals;
    if (o > 0) {
      const c = on(o);
      R(a % c === Ee, "value loses precision for format", "NUMERIC_FAULT", {
        operation: "fromValue",
        fault: "underflow",
        value: t
      }), a /= c;
    } else o < 0 && (a *= on(-o));
    return Ti(a, i, "fromValue"), new Dr(ss, a, i);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%%, either due to overflow or underflow (precision loss).
   */
  static fromString(t, e) {
    const n = t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
    A(n && n[2].length + n[3].length > 0, "invalid FixedNumber string value", "value", t);
    const s = Oo(e);
    let i = n[2] || "0", a = n[3] || "";
    for (; a.length < s.decimals; )
      a += bs;
    R(a.substring(s.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
      operation: "fromString",
      fault: "underflow",
      value: t
    }), a = a.substring(0, s.decimals);
    const o = BigInt(n[1] + i + a);
    return Ti(o, s, "fromString"), new Dr(ss, o, s);
  }
  /**
   *  Creates a new [[FixedNumber]] with the big-endian representation
   *  %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%% due to overflow.
   */
  static fromBytes(t, e) {
    let n = li(q(t, "value"));
    const s = Oo(e);
    return s.signed && (n = Va(n, s.width)), Ti(n, s, "fromBytes"), new Dr(ss, n, s);
  }
};
Ce = new WeakMap(), it = new WeakMap(), Vt = new WeakMap(), rt = new WeakSet(), ln = function(t) {
  A(this.format === t.format, "incompatible format; use fixedNumber.toFormat", "other", t);
}, rr = function(t, e) {
  return t = Ti(t, d(this, Ce), e), new Dr(ss, t, d(this, Ce));
}, ec = function(t, e) {
  return B(this, rt, ln).call(this, t), B(this, rt, rr).call(this, d(this, it) + d(t, it), e);
}, rc = function(t, e) {
  return B(this, rt, ln).call(this, t), B(this, rt, rr).call(this, d(this, it) - d(t, it), e);
}, nc = function(t, e) {
  return B(this, rt, ln).call(this, t), B(this, rt, rr).call(this, d(this, it) * d(t, it) / d(this, Vt), e);
}, sc = function(t, e) {
  return R(d(t, it) !== Ee, "division by zero", "NUMERIC_FAULT", {
    operation: "div",
    fault: "divide-by-zero",
    value: this
  }), B(this, rt, ln).call(this, t), B(this, rt, rr).call(this, d(this, it) * d(this, Vt) / d(t, it), e);
};
let tc = Dr;
function ap(r) {
  let t = r.toString(16);
  for (; t.length < 2; )
    t = "0" + t;
  return "0x" + t;
}
function Bl(r, t, e) {
  let n = 0;
  for (let s = 0; s < e; s++)
    n = n * 256 + r[t + s];
  return n;
}
function Ul(r, t, e, n) {
  const s = [];
  for (; e < t + 1 + n; ) {
    const i = fh(r, e);
    s.push(i.result), e += i.consumed, R(e <= t + 1 + n, "child data too short", "BUFFER_OVERRUN", {
      buffer: r,
      length: n,
      offset: t
    });
  }
  return { consumed: 1 + n, result: s };
}
function fh(r, t) {
  R(r.length !== 0, "data too short", "BUFFER_OVERRUN", {
    buffer: r,
    length: 0,
    offset: 1
  });
  const e = (n) => {
    R(n <= r.length, "data short segment too short", "BUFFER_OVERRUN", {
      buffer: r,
      length: r.length,
      offset: n
    });
  };
  if (r[t] >= 248) {
    const n = r[t] - 247;
    e(t + 1 + n);
    const s = Bl(r, t + 1, n);
    return e(t + 1 + n + s), Ul(r, t, t + 1 + n, n + s);
  } else if (r[t] >= 192) {
    const n = r[t] - 192;
    return e(t + 1 + n), Ul(r, t, t + 1, n);
  } else if (r[t] >= 184) {
    const n = r[t] - 183;
    e(t + 1 + n);
    const s = Bl(r, t + 1, n);
    e(t + 1 + n + s);
    const i = H(r.slice(t + 1 + n, t + 1 + n + s));
    return { consumed: 1 + n + s, result: i };
  } else if (r[t] >= 128) {
    const n = r[t] - 128;
    e(t + 1 + n);
    const s = H(r.slice(t + 1, t + 1 + n));
    return { consumed: 1 + n, result: s };
  }
  return { consumed: 1, result: ap(r[t]) };
}
function ho(r) {
  const t = q(r, "data"), e = fh(t, 0);
  return A(e.consumed === t.length, "unexpected junk after rlp payload", "data", r), e.result;
}
function Dl(r) {
  const t = [];
  for (; r; )
    t.unshift(r & 255), r >>= 8;
  return t;
}
function ph(r) {
  if (Array.isArray(r)) {
    let n = [];
    if (r.forEach(function(i) {
      n = n.concat(ph(i));
    }), n.length <= 55)
      return n.unshift(192 + n.length), n;
    const s = Dl(n.length);
    return s.unshift(247 + s.length), s.concat(n);
  }
  const t = Array.prototype.slice.call(q(r, "object"));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const e = Dl(t.length);
  return e.unshift(183 + e.length), e.concat(t);
}
const Ll = "0123456789abcdef";
function qn(r) {
  let t = "0x";
  for (const e of ph(r))
    t += Ll[e >> 4], t += Ll[e & 15];
  return t;
}
const op = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function Fl(r, t) {
  let e = 18;
  if (typeof t == "string") {
    const n = op.indexOf(t);
    A(n >= 0, "invalid unit", "unit", t), e = 3 * n;
  } else t != null && (e = W(t, "unit"));
  return tc.fromValue(r, e, { decimals: e, width: 512 }).toString();
}
const zt = 32, ic = new Uint8Array(zt), cp = ["then"], wa = {}, gh = /* @__PURE__ */ new WeakMap();
function hn(r) {
  return gh.get(r);
}
function Ml(r, t) {
  gh.set(r, t);
}
function Ci(r, t) {
  const e = new Error(`deferred error during ABI decoding triggered accessing ${r}`);
  throw e.error = t, e;
}
function ac(r, t, e) {
  return r.indexOf(null) >= 0 ? t.map((n, s) => n instanceof ui ? ac(hn(n), n, e) : n) : r.reduce((n, s, i) => {
    let a = t.getValue(s);
    return s in n || (e && a instanceof ui && (a = ac(hn(a), a, e)), n[s] = a), n;
  }, {});
}
var Ps;
const ms = class ms extends Array {
  /**
   *  @private
   */
  constructor(...e) {
    const n = e[0];
    let s = e[1], i = (e[2] || []).slice(), a = !0;
    n !== wa && (s = e, i = [], a = !1);
    super(s.length);
    // No longer used; but cannot be removed as it will remove the
    // #private field from the .d.ts which may break backwards
    // compatibility
    x(this, Ps);
    s.forEach((l, h) => {
      this[h] = l;
    });
    const o = i.reduce((l, h) => (typeof h == "string" && l.set(h, (l.get(h) || 0) + 1), l), /* @__PURE__ */ new Map());
    if (Ml(this, Object.freeze(s.map((l, h) => {
      const u = i[h];
      return u != null && o.get(u) === 1 ? u : null;
    }))), p(this, Ps, []), d(this, Ps) == null && d(this, Ps), !a)
      return;
    Object.freeze(this);
    const c = new Proxy(this, {
      get: (l, h, u) => {
        if (typeof h == "string") {
          if (h.match(/^[0-9]+$/)) {
            const y = W(h, "%index");
            if (y < 0 || y >= this.length)
              throw new RangeError("out of result range");
            const m = l[y];
            return m instanceof Error && Ci(`index ${y}`, m), m;
          }
          if (cp.indexOf(h) >= 0)
            return Reflect.get(l, h, u);
          const f = l[h];
          if (f instanceof Function)
            return function(...y) {
              return f.apply(this === u ? l : this, y);
            };
          if (!(h in l))
            return l.getValue.apply(this === u ? l : this, [h]);
        }
        return Reflect.get(l, h, u);
      }
    });
    return Ml(c, hn(this)), c;
  }
  /**
   *  Returns the Result as a normal Array. If %%deep%%, any children
   *  which are Result objects are also converted to a normal Array.
   *
   *  This will throw if there are any outstanding deferred
   *  errors.
   */
  toArray(e) {
    const n = [];
    return this.forEach((s, i) => {
      s instanceof Error && Ci(`index ${i}`, s), e && s instanceof ms && (s = s.toArray(e)), n.push(s);
    }), n;
  }
  /**
   *  Returns the Result as an Object with each name-value pair. If
   *  %%deep%%, any children which are Result objects are also
   *  converted to an Object.
   *
   *  This will throw if any value is unnamed, or if there are
   *  any outstanding deferred errors.
   */
  toObject(e) {
    const n = hn(this);
    return n.reduce((s, i, a) => (R(i != null, `value at index ${a} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), ac(n, this, e)), {});
  }
  /**
   *  @_ignore
   */
  slice(e, n) {
    e == null && (e = 0), e < 0 && (e += this.length, e < 0 && (e = 0)), n == null && (n = this.length), n < 0 && (n += this.length, n < 0 && (n = 0)), n > this.length && (n = this.length);
    const s = hn(this), i = [], a = [];
    for (let o = e; o < n; o++)
      i.push(this[o]), a.push(s[o]);
    return new ms(wa, i, a);
  }
  /**
   *  @_ignore
   */
  filter(e, n) {
    const s = hn(this), i = [], a = [];
    for (let o = 0; o < this.length; o++) {
      const c = this[o];
      c instanceof Error && Ci(`index ${o}`, c), e.call(n, c, o, this) && (i.push(c), a.push(s[o]));
    }
    return new ms(wa, i, a);
  }
  /**
   *  @_ignore
   */
  map(e, n) {
    const s = [];
    for (let i = 0; i < this.length; i++) {
      const a = this[i];
      a instanceof Error && Ci(`index ${i}`, a), s.push(e.call(n, a, i, this));
    }
    return s;
  }
  /**
   *  Returns the value for %%name%%.
   *
   *  Since it is possible to have a key whose name conflicts with
   *  a method on a [[Result]] or its superclass Array, or any
   *  JavaScript keyword, this ensures all named values are still
   *  accessible by name.
   */
  getValue(e) {
    const n = hn(this).indexOf(e);
    if (n === -1)
      return;
    const s = this[n];
    return s instanceof Error && Ci(`property ${JSON.stringify(e)}`, s.error), s;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(e, n) {
    return new ms(wa, e, n);
  }
};
Ps = new WeakMap();
let ui = ms;
function Hl(r) {
  let t = xt(r);
  return R(t.length <= zt, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: t, length: zt, offset: t.length }), t.length !== zt && (t = Qt(ut([ic.slice(t.length % zt), t]))), t;
}
class Cr {
  constructor(t, e, n, s) {
    // The coder name:
    //   - address, uint256, tuple, array, etc.
    b(this, "name");
    // The fully expanded type, including composite types:
    //   - address, uint256, tuple(address,bytes), uint256[3][4][],  etc.
    b(this, "type");
    // The localName bound in the signature, in this example it is "baz":
    //   - tuple(address foo, uint bar) baz
    b(this, "localName");
    // Whether this type is dynamic:
    //  - Dynamic: bytes, string, address[], tuple(boolean[]), etc.
    //  - Not Dynamic: address, uint256, boolean[3], tuple(address, uint8)
    b(this, "dynamic");
    Q(this, { name: t, type: e, localName: n, dynamic: s }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(t, e) {
    A(!1, t, this.localName, e);
  }
}
var lr, On, ks, Oa;
class oc {
  constructor() {
    x(this, ks);
    // An array of WordSize lengthed objects to concatenation
    x(this, lr);
    x(this, On);
    p(this, lr, []), p(this, On, 0);
  }
  get data() {
    return ut(d(this, lr));
  }
  get length() {
    return d(this, On);
  }
  appendWriter(t) {
    return B(this, ks, Oa).call(this, Qt(t.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(t) {
    let e = Qt(t);
    const n = e.length % zt;
    return n && (e = Qt(ut([e, ic.slice(n)]))), B(this, ks, Oa).call(this, e);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(t) {
    return B(this, ks, Oa).call(this, Hl(t));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const t = d(this, lr).length;
    return d(this, lr).push(ic), p(this, On, d(this, On) + zt), (e) => {
      d(this, lr)[t] = Hl(e);
    };
  }
}
lr = new WeakMap(), On = new WeakMap(), ks = new WeakSet(), Oa = function(t) {
  return d(this, lr).push(t), p(this, On, d(this, On) + t.length), t.length;
};
var qt, ae, Pn, kn, Hr, rs, lc, mh;
const vl = class vl {
  constructor(t, e, n) {
    x(this, rs);
    // Allows incomplete unpadded data to be read; otherwise an error
    // is raised if attempting to overrun the buffer. This is required
    // to deal with an old Solidity bug, in which event data for
    // external (not public thoguh) was tightly packed.
    b(this, "allowLoose");
    x(this, qt);
    x(this, ae);
    x(this, Pn);
    x(this, kn);
    x(this, Hr);
    Q(this, { allowLoose: !!e }), p(this, qt, Qt(t)), p(this, Pn, 0), p(this, kn, null), p(this, Hr, n ?? 1024), p(this, ae, 0);
  }
  get data() {
    return H(d(this, qt));
  }
  get dataLength() {
    return d(this, qt).length;
  }
  get consumed() {
    return d(this, ae);
  }
  get bytes() {
    return new Uint8Array(d(this, qt));
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(t) {
    const e = new vl(d(this, qt).slice(d(this, ae) + t), this.allowLoose, d(this, Hr));
    return p(e, kn, this), e;
  }
  // Read bytes
  readBytes(t, e) {
    let n = B(this, rs, mh).call(this, 0, t, !!e);
    return B(this, rs, lc).call(this, t), p(this, ae, d(this, ae) + n.length), n.slice(0, t);
  }
  // Read a numeric values
  readValue() {
    return li(this.readBytes(zt));
  }
  readIndex() {
    return Vf(this.readBytes(zt));
  }
};
qt = new WeakMap(), ae = new WeakMap(), Pn = new WeakMap(), kn = new WeakMap(), Hr = new WeakMap(), rs = new WeakSet(), lc = function(t) {
  var e;
  if (d(this, kn))
    return B(e = d(this, kn), rs, lc).call(e, t);
  p(this, Pn, d(this, Pn) + t), R(d(this, Hr) < 1 || d(this, Pn) <= d(this, Hr) * this.dataLength, `compressed ABI data exceeds inflation ratio of ${d(this, Hr)} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
    buffer: Qt(d(this, qt)),
    offset: d(this, ae),
    length: t,
    info: {
      bytesRead: d(this, Pn),
      dataLength: this.dataLength
    }
  });
}, mh = function(t, e, n) {
  let s = Math.ceil(e / zt) * zt;
  return d(this, ae) + s > d(this, qt).length && (this.allowLoose && n && d(this, ae) + e <= d(this, qt).length ? s = e : R(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
    buffer: Qt(d(this, qt)),
    length: d(this, qt).length,
    offset: d(this, ae) + s
  })), d(this, qt).slice(d(this, ae), d(this, ae) + s);
};
let cc = vl;
const Gl = globalThis || void 0 || self;
function ja(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error(`Wrong positive integer: ${r}`);
}
function Kc(r, ...t) {
  if (!(r instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${r.length}`);
}
function lp(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  ja(r.outputLen), ja(r.blockLen);
}
function hi(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function yh(r, t) {
  Kc(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const Po = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const wh = (r) => r instanceof Uint8Array, up = (r) => new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4)), ko = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), De = (r, t) => r << 32 - t | r >>> t, hp = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!hp)
  throw new Error("Non little-endian hardware is not supported");
function dp(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function fo(r) {
  if (typeof r == "string" && (r = dp(r)), !wh(r))
    throw new Error(`expected Uint8Array, got ${typeof r}`);
  return r;
}
function fp(...r) {
  const t = new Uint8Array(r.reduce((n, s) => n + s.length, 0));
  let e = 0;
  return r.forEach((n) => {
    if (!wh(n))
      throw new Error("Uint8Array expected");
    t.set(n, e), e += n.length;
  }), t;
}
let qc = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function Wc(r) {
  const t = (n) => r().update(fo(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function pp(r = 32) {
  if (Po && typeof Po.getRandomValues == "function")
    return Po.getRandomValues(new Uint8Array(r));
  throw new Error("crypto.getRandomValues must be defined");
}
let Ah = class extends qc {
  constructor(r, t) {
    super(), this.finished = !1, this.destroyed = !1, lp(r);
    const e = fo(t);
    if (this.iHash = r.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const n = this.blockLen, s = new Uint8Array(n);
    s.set(e.length > n ? r.create().update(e).digest() : e);
    for (let i = 0; i < s.length; i++)
      s[i] ^= 54;
    this.iHash.update(s), this.oHash = r.create();
    for (let i = 0; i < s.length; i++)
      s[i] ^= 106;
    this.oHash.update(s), s.fill(0);
  }
  update(r) {
    return hi(this), this.iHash.update(r), this;
  }
  digestInto(r) {
    hi(this), Kc(r, this.outputLen), this.finished = !0, this.iHash.digestInto(r), this.oHash.update(r), this.oHash.digestInto(r), this.destroy();
  }
  digest() {
    const r = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(r), r;
  }
  _cloneInto(r) {
    r || (r = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: t, iHash: e, finished: n, destroyed: s, blockLen: i, outputLen: a } = this;
    return r = r, r.finished = n, r.destroyed = s, r.blockLen = i, r.outputLen = a, r.oHash = t._cloneInto(r.oHash), r.iHash = e._cloneInto(r.iHash), r;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const bh = (r, t, e) => new Ah(r, t).update(e).digest();
bh.create = (r, t) => new Ah(r, t);
function gp(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const s = BigInt(32), i = BigInt(4294967295), a = Number(e >> s & i), o = Number(e & i), c = n ? 4 : 0, l = n ? 0 : 4;
  r.setUint32(t + c, a, n), r.setUint32(t + l, o, n);
}
class Eh extends qc {
  constructor(t, e, n, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ko(this.buffer);
  }
  update(t) {
    hi(this);
    const { view: e, buffer: n, blockLen: s } = this;
    t = fo(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(s - this.pos, i - a);
      if (o === s) {
        const c = ko(t);
        for (; s <= i - a; a += s)
          this.process(c, a);
        continue;
      }
      n.set(t.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    hi(this), yh(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: s, isLE: i } = this;
    let { pos: a } = this;
    e[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(n, 0), a = 0);
    for (let u = a; u < s; u++)
      e[u] = 0;
    gp(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const o = ko(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, h = this.get();
    if (l > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++)
      o.setUint32(4 * u, h[u], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: s, finished: i, destroyed: a, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = a, s % e && t.buffer.set(n), t;
  }
}
const mp = (r, t, e) => r & t ^ ~r & e, yp = (r, t, e) => r & t ^ r & e ^ t & e, wp = /* @__PURE__ */ new Uint32Array([
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
]), Or = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Pr = /* @__PURE__ */ new Uint32Array(64);
let Ap = class extends Eh {
  constructor() {
    super(64, 32, 8, !1), this.A = Or[0] | 0, this.B = Or[1] | 0, this.C = Or[2] | 0, this.D = Or[3] | 0, this.E = Or[4] | 0, this.F = Or[5] | 0, this.G = Or[6] | 0, this.H = Or[7] | 0;
  }
  get() {
    const { A: r, B: t, C: e, D: n, E: s, F: i, G: a, H: o } = this;
    return [r, t, e, n, s, i, a, o];
  }
  // prettier-ignore
  set(r, t, e, n, s, i, a, o) {
    this.A = r | 0, this.B = t | 0, this.C = e | 0, this.D = n | 0, this.E = s | 0, this.F = i | 0, this.G = a | 0, this.H = o | 0;
  }
  process(r, t) {
    for (let h = 0; h < 16; h++, t += 4)
      Pr[h] = r.getUint32(t, !1);
    for (let h = 16; h < 64; h++) {
      const u = Pr[h - 15], f = Pr[h - 2], y = De(u, 7) ^ De(u, 18) ^ u >>> 3, m = De(f, 17) ^ De(f, 19) ^ f >>> 10;
      Pr[h] = m + Pr[h - 7] + y + Pr[h - 16] | 0;
    }
    let { A: e, B: n, C: s, D: i, E: a, F: o, G: c, H: l } = this;
    for (let h = 0; h < 64; h++) {
      const u = De(a, 6) ^ De(a, 11) ^ De(a, 25), f = l + u + mp(a, o, c) + wp[h] + Pr[h] | 0, y = (De(e, 2) ^ De(e, 13) ^ De(e, 22)) + yp(e, n, s) | 0;
      l = c, c = o, o = a, a = i + f | 0, i = s, s = n, n = e, e = f + y | 0;
    }
    e = e + this.A | 0, n = n + this.B | 0, s = s + this.C | 0, i = i + this.D | 0, a = a + this.E | 0, o = o + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(e, n, s, i, a, o, c, l);
  }
  roundClean() {
    Pr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const vh = /* @__PURE__ */ Wc(() => new Ap()), Aa = /* @__PURE__ */ BigInt(2 ** 32 - 1), uc = /* @__PURE__ */ BigInt(32);
function xh(r, t = !1) {
  return t ? { h: Number(r & Aa), l: Number(r >> uc & Aa) } : { h: Number(r >> uc & Aa) | 0, l: Number(r & Aa) | 0 };
}
function Nh(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let s = 0; s < r.length; s++) {
    const { h: i, l: a } = xh(r[s], t);
    [e[s], n[s]] = [i, a];
  }
  return [e, n];
}
const bp = (r, t) => BigInt(r >>> 0) << uc | BigInt(t >>> 0), Ep = (r, t, e) => r >>> e, vp = (r, t, e) => r << 32 - e | t >>> e, xp = (r, t, e) => r >>> e | t << 32 - e, Np = (r, t, e) => r << 32 - e | t >>> e, Ip = (r, t, e) => r << 64 - e | t >>> e - 32, Tp = (r, t, e) => r >>> e - 32 | t << 64 - e, Cp = (r, t) => t, Op = (r, t) => r, Ih = (r, t, e) => r << e | t >>> 32 - e, Th = (r, t, e) => t << e | r >>> 32 - e, Ch = (r, t, e) => t << e - 32 | r >>> 64 - e, Oh = (r, t, e) => r << e - 32 | t >>> 64 - e;
function Pp(r, t, e, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: r + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const kp = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), Rp = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, Sp = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), Bp = (r, t, e, n, s) => t + e + n + s + (r / 2 ** 32 | 0) | 0, Up = (r, t, e, n, s) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (s >>> 0), Dp = (r, t, e, n, s, i) => t + e + n + s + i + (r / 2 ** 32 | 0) | 0, K = {
  fromBig: xh,
  split: Nh,
  toBig: bp,
  shrSH: Ep,
  shrSL: vp,
  rotrSH: xp,
  rotrSL: Np,
  rotrBH: Ip,
  rotrBL: Tp,
  rotr32H: Cp,
  rotr32L: Op,
  rotlSH: Ih,
  rotlSL: Th,
  rotlBH: Ch,
  rotlBL: Oh,
  add: Pp,
  add3L: kp,
  add3H: Rp,
  add4L: Sp,
  add4H: Bp,
  add5H: Dp,
  add5L: Up
}, [Lp, Fp] = K.split([
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
].map((r) => BigInt(r))), kr = /* @__PURE__ */ new Uint32Array(80), Rr = /* @__PURE__ */ new Uint32Array(80);
class Mp extends Eh {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: s, Ch: i, Cl: a, Dh: o, Dl: c, Eh: l, El: h, Fh: u, Fl: f, Gh: y, Gl: m, Hh: g, Hl: w } = this;
    return [t, e, n, s, i, a, o, c, l, h, u, f, y, m, g, w];
  }
  // prettier-ignore
  set(t, e, n, s, i, a, o, c, l, h, u, f, y, m, g, w) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = c | 0, this.Eh = l | 0, this.El = h | 0, this.Fh = u | 0, this.Fl = f | 0, this.Gh = y | 0, this.Gl = m | 0, this.Hh = g | 0, this.Hl = w | 0;
  }
  process(t, e) {
    for (let N = 0; N < 16; N++, e += 4)
      kr[N] = t.getUint32(e), Rr[N] = t.getUint32(e += 4);
    for (let N = 16; N < 80; N++) {
      const U = kr[N - 15] | 0, P = Rr[N - 15] | 0, I = K.rotrSH(U, P, 1) ^ K.rotrSH(U, P, 8) ^ K.shrSH(U, P, 7), k = K.rotrSL(U, P, 1) ^ K.rotrSL(U, P, 8) ^ K.shrSL(U, P, 7), S = kr[N - 2] | 0, _ = Rr[N - 2] | 0, D = K.rotrSH(S, _, 19) ^ K.rotrBH(S, _, 61) ^ K.shrSH(S, _, 6), F = K.rotrSL(S, _, 19) ^ K.rotrBL(S, _, 61) ^ K.shrSL(S, _, 6), j = K.add4L(k, F, Rr[N - 7], Rr[N - 16]), $ = K.add4H(j, I, D, kr[N - 7], kr[N - 16]);
      kr[N] = $ | 0, Rr[N] = j | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: a, Ch: o, Cl: c, Dh: l, Dl: h, Eh: u, El: f, Fh: y, Fl: m, Gh: g, Gl: w, Hh: E, Hl: O } = this;
    for (let N = 0; N < 80; N++) {
      const U = K.rotrSH(u, f, 14) ^ K.rotrSH(u, f, 18) ^ K.rotrBH(u, f, 41), P = K.rotrSL(u, f, 14) ^ K.rotrSL(u, f, 18) ^ K.rotrBL(u, f, 41), I = u & y ^ ~u & g, k = f & m ^ ~f & w, S = K.add5L(O, P, k, Fp[N], Rr[N]), _ = K.add5H(S, E, U, I, Lp[N], kr[N]), D = S | 0, F = K.rotrSH(n, s, 28) ^ K.rotrBH(n, s, 34) ^ K.rotrBH(n, s, 39), j = K.rotrSL(n, s, 28) ^ K.rotrBL(n, s, 34) ^ K.rotrBL(n, s, 39), $ = n & i ^ n & o ^ i & o, Et = s & a ^ s & c ^ a & c;
      E = g | 0, O = w | 0, g = y | 0, w = m | 0, y = u | 0, m = f | 0, { h: u, l: f } = K.add(l | 0, h | 0, _ | 0, D | 0), l = o | 0, h = c | 0, o = i | 0, c = a | 0, i = n | 0, a = s | 0;
      const v = K.add3L(D, j, Et);
      n = K.add3H(v, _, F, $), s = v | 0;
    }
    ({ h: n, l: s } = K.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: a } = K.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: o, l: c } = K.add(this.Ch | 0, this.Cl | 0, o | 0, c | 0), { h: l, l: h } = K.add(this.Dh | 0, this.Dl | 0, l | 0, h | 0), { h: u, l: f } = K.add(this.Eh | 0, this.El | 0, u | 0, f | 0), { h: y, l: m } = K.add(this.Fh | 0, this.Fl | 0, y | 0, m | 0), { h: g, l: w } = K.add(this.Gh | 0, this.Gl | 0, g | 0, w | 0), { h: E, l: O } = K.add(this.Hh | 0, this.Hl | 0, E | 0, O | 0), this.set(n, s, i, a, o, c, l, h, u, f, y, m, g, w, E, O);
  }
  roundClean() {
    kr.fill(0), Rr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Hp = /* @__PURE__ */ Wc(() => new Mp());
function Gp() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof Gl < "u")
    return Gl;
  throw new Error("unable to locate global object");
}
const Vl = Gp();
Vl.crypto || Vl.msCrypto;
function Vp(r) {
  switch (r) {
    case "sha256":
      return vh.create();
    case "sha512":
      return Hp.create();
  }
  A(!1, "invalid hashing algorithm name", "algorithm", r);
}
const [Ph, kh, Rh] = [[], [], []], _p = /* @__PURE__ */ BigInt(0), Oi = /* @__PURE__ */ BigInt(1), jp = /* @__PURE__ */ BigInt(2), Qp = /* @__PURE__ */ BigInt(7), zp = /* @__PURE__ */ BigInt(256), Jp = /* @__PURE__ */ BigInt(113);
for (let r = 0, t = Oi, e = 1, n = 0; r < 24; r++) {
  [e, n] = [n, (2 * e + 3 * n) % 5], Ph.push(2 * (5 * n + e)), kh.push((r + 1) * (r + 2) / 2 % 64);
  let s = _p;
  for (let i = 0; i < 7; i++)
    t = (t << Oi ^ (t >> Qp) * Jp) % zp, t & jp && (s ^= Oi << (Oi << /* @__PURE__ */ BigInt(i)) - Oi);
  Rh.push(s);
}
const [Kp, qp] = /* @__PURE__ */ Nh(Rh, !0), _l = (r, t, e) => e > 32 ? Ch(r, t, e) : Ih(r, t, e), jl = (r, t, e) => e > 32 ? Oh(r, t, e) : Th(r, t, e);
function Wp(r, t = 24) {
  const e = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let a = 0; a < 10; a++)
      e[a] = r[a] ^ r[a + 10] ^ r[a + 20] ^ r[a + 30] ^ r[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const o = (a + 8) % 10, c = (a + 2) % 10, l = e[c], h = e[c + 1], u = _l(l, h, 1) ^ e[o], f = jl(l, h, 1) ^ e[o + 1];
      for (let y = 0; y < 50; y += 10)
        r[a + y] ^= u, r[a + y + 1] ^= f;
    }
    let s = r[2], i = r[3];
    for (let a = 0; a < 24; a++) {
      const o = kh[a], c = _l(s, i, o), l = jl(s, i, o), h = Ph[a];
      s = r[h], i = r[h + 1], r[h] = c, r[h + 1] = l;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let o = 0; o < 10; o++)
        e[o] = r[a + o];
      for (let o = 0; o < 10; o++)
        r[a + o] ^= ~e[(o + 2) % 10] & e[(o + 4) % 10];
    }
    r[0] ^= Kp[n], r[1] ^= qp[n];
  }
  e.fill(0);
}
let Zp = class Sh extends qc {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, ja(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = up(this.state);
  }
  keccak() {
    Wp(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    hi(this);
    const { blockLen: e, state: n } = this;
    t = fo(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const a = Math.min(e - this.pos, s - i);
      for (let o = 0; o < a; o++)
        n[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: n, blockLen: s } = this;
    t[n] ^= e, e & 128 && n === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    hi(this, !1), Kc(t), this.finish();
    const e = this.state, { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const a = Math.min(n - this.posOut, i - s);
      t.set(e.subarray(this.posOut, this.posOut + a), s), this.posOut += a, s += a;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return ja(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (yh(t, this), this.finished)
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
    const { blockLen: e, suffix: n, outputLen: s, rounds: i, enableXOF: a } = this;
    return t || (t = new Sh(e, n, s, a, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = a, t.destroyed = this.destroyed, t;
  }
};
const Yp = (r, t, e) => Wc(() => new Zp(t, r, e)), Xp = /* @__PURE__ */ Yp(1, 136, 256 / 8);
let Bh = !1;
const Uh = function(r) {
  return Xp(r);
};
let Dh = Uh;
function ft(r) {
  const t = q(r, "data");
  return H(Dh(t));
}
ft._ = Uh;
ft.lock = function() {
  Bh = !0;
};
ft.register = function(r) {
  if (Bh)
    throw new TypeError("keccak256 is locked");
  Dh = r;
};
Object.freeze(ft);
const Lh = function(r) {
  return Vp("sha256").update(r).digest();
};
let Fh = Lh, Mh = !1;
function rn(r) {
  const t = q(r, "data");
  return H(Fh(t));
}
rn._ = Lh;
rn.lock = function() {
  Mh = !0;
};
rn.register = function(r) {
  if (Mh)
    throw new Error("sha256 is locked");
  Fh = r;
};
Object.freeze(rn);
Object.freeze(rn);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Hh = BigInt(0), po = BigInt(1), $p = BigInt(2), go = (r) => r instanceof Uint8Array, tg = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function di(r) {
  if (!go(r))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += tg[r[e]];
  return t;
}
function Gh(r) {
  const t = r.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Zc(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return BigInt(r === "" ? "0" : `0x${r}`);
}
function fi(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  const t = r.length;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const e = new Uint8Array(t / 2);
  for (let n = 0; n < e.length; n++) {
    const s = n * 2, i = r.slice(s, s + 2), a = Number.parseInt(i, 16);
    if (Number.isNaN(a) || a < 0)
      throw new Error("Invalid byte sequence");
    e[n] = a;
  }
  return e;
}
function jn(r) {
  return Zc(di(r));
}
function Yc(r) {
  if (!go(r))
    throw new Error("Uint8Array expected");
  return Zc(di(Uint8Array.from(r).reverse()));
}
function pi(r, t) {
  return fi(r.toString(16).padStart(t * 2, "0"));
}
function Xc(r, t) {
  return pi(r, t).reverse();
}
function eg(r) {
  return fi(Gh(r));
}
function xe(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = fi(t);
    } catch (i) {
      throw new Error(`${r} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (go(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${r} must be hex string or Uint8Array`);
  const s = n.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${r} expected ${e} bytes, got ${s}`);
  return n;
}
function Gi(...r) {
  const t = new Uint8Array(r.reduce((n, s) => n + s.length, 0));
  let e = 0;
  return r.forEach((n) => {
    if (!go(n))
      throw new Error("Uint8Array expected");
    t.set(n, e), e += n.length;
  }), t;
}
function rg(r, t) {
  if (r.length !== t.length)
    return !1;
  for (let e = 0; e < r.length; e++)
    if (r[e] !== t[e])
      return !1;
  return !0;
}
function ng(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function sg(r) {
  let t;
  for (t = 0; r > Hh; r >>= po, t += 1)
    ;
  return t;
}
function ig(r, t) {
  return r >> BigInt(t) & po;
}
const ag = (r, t, e) => r | (e ? po : Hh) << BigInt(t), $c = (r) => ($p << BigInt(r - 1)) - po, Ro = (r) => new Uint8Array(r), Ql = (r) => Uint8Array.from(r);
function Vh(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = Ro(r), s = Ro(r), i = 0;
  const a = () => {
    n.fill(1), s.fill(0), i = 0;
  }, o = (...h) => e(s, n, ...h), c = (h = Ro()) => {
    s = o(Ql([0]), h), n = o(), h.length !== 0 && (s = o(Ql([1]), h), n = o());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const u = [];
    for (; h < t; ) {
      n = o();
      const f = n.slice();
      u.push(f), h += n.length;
    }
    return Gi(...u);
  };
  return (h, u) => {
    a(), c(h);
    let f;
    for (; !(f = u(l())); )
      c();
    return a(), f;
  };
}
const og = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || r instanceof Uint8Array,
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function ca(r, t, e = {}) {
  const n = (s, i, a) => {
    const o = og[i];
    if (typeof o != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const c = r[s];
    if (!(a && c === void 0) && !o(c, r))
      throw new Error(`Invalid param ${String(s)}=${c} (${typeof c}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(e))
    n(s, i, !0);
  return r;
}
const cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: ig,
  bitLen: sg,
  bitMask: $c,
  bitSet: ag,
  bytesToHex: di,
  bytesToNumberBE: jn,
  bytesToNumberLE: Yc,
  concatBytes: Gi,
  createHmacDrbg: Vh,
  ensureBytes: xe,
  equalBytes: rg,
  hexToBytes: fi,
  hexToNumber: Zc,
  numberToBytesBE: pi,
  numberToBytesLE: Xc,
  numberToHexUnpadded: Gh,
  numberToVarBytesBE: eg,
  utf8ToBytes: ng,
  validateObject: ca
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ct = BigInt(0), mt = BigInt(1), dn = BigInt(2), lg = BigInt(3), hc = BigInt(4), zl = BigInt(5), Jl = BigInt(8);
BigInt(9);
BigInt(16);
function Zt(r, t) {
  const e = r % t;
  return e >= Ct ? e : t + e;
}
function ug(r, t, e) {
  if (e <= Ct || t < Ct)
    throw new Error("Expected power/modulo > 0");
  if (e === mt)
    return Ct;
  let n = mt;
  for (; t > Ct; )
    t & mt && (n = n * r % e), r = r * r % e, t >>= mt;
  return n;
}
function le(r, t, e) {
  let n = r;
  for (; t-- > Ct; )
    n *= n, n %= e;
  return n;
}
function dc(r, t) {
  if (r === Ct || t <= Ct)
    throw new Error(`invert: expected positive integers, got n=${r} mod=${t}`);
  let e = Zt(r, t), n = t, s = Ct, i = mt;
  for (; e !== Ct; ) {
    const a = n / e, o = n % e, c = s - i * a;
    n = e, e = o, s = i, i = c;
  }
  if (n !== mt)
    throw new Error("invert: does not exist");
  return Zt(s, t);
}
function hg(r) {
  const t = (r - mt) / dn;
  let e, n, s;
  for (e = r - mt, n = 0; e % dn === Ct; e /= dn, n++)
    ;
  for (s = dn; s < r && ug(s, t, r) !== r - mt; s++)
    ;
  if (n === 1) {
    const a = (r + mt) / hc;
    return function(o, c) {
      const l = o.pow(c, a);
      if (!o.eql(o.sqr(l), c))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (e + mt) / dn;
  return function(a, o) {
    if (a.pow(o, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let c = n, l = a.pow(a.mul(a.ONE, s), e), h = a.pow(o, i), u = a.pow(o, e);
    for (; !a.eql(u, a.ONE); ) {
      if (a.eql(u, a.ZERO))
        return a.ZERO;
      let f = 1;
      for (let m = a.sqr(u); f < c && !a.eql(m, a.ONE); f++)
        m = a.sqr(m);
      const y = a.pow(l, mt << BigInt(c - f - 1));
      l = a.sqr(y), h = a.mul(h, y), u = a.mul(u, l), c = f;
    }
    return h;
  };
}
function dg(r) {
  if (r % hc === lg) {
    const t = (r + mt) / hc;
    return function(e, n) {
      const s = e.pow(n, t);
      if (!e.eql(e.sqr(s), n))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (r % Jl === zl) {
    const t = (r - zl) / Jl;
    return function(e, n) {
      const s = e.mul(n, dn), i = e.pow(s, t), a = e.mul(n, i), o = e.mul(e.mul(a, dn), i), c = e.mul(a, e.sub(o, e.ONE));
      if (!e.eql(e.sqr(c), n))
        throw new Error("Cannot find square root");
      return c;
    };
  }
  return hg(r);
}
const fg = [
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
function pg(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = fg.reduce((n, s) => (n[s] = "function", n), t);
  return ca(r, e);
}
function gg(r, t, e) {
  if (e < Ct)
    throw new Error("Expected power > 0");
  if (e === Ct)
    return r.ONE;
  if (e === mt)
    return t;
  let n = r.ONE, s = t;
  for (; e > Ct; )
    e & mt && (n = r.mul(n, s)), s = r.sqr(s), e >>= mt;
  return n;
}
function mg(r, t) {
  const e = new Array(t.length), n = t.reduce((i, a, o) => r.is0(a) ? i : (e[o] = i, r.mul(i, a)), r.ONE), s = r.inv(n);
  return t.reduceRight((i, a, o) => r.is0(a) ? i : (e[o] = r.mul(i, e[o]), r.mul(i, a)), s), e;
}
function _h(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function yg(r, t, e = !1, n = {}) {
  if (r <= Ct)
    throw new Error(`Expected Field ORDER > 0, got ${r}`);
  const { nBitLength: s, nByteLength: i } = _h(r, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const a = dg(r), o = Object.freeze({
    ORDER: r,
    BITS: s,
    BYTES: i,
    MASK: $c(s),
    ZERO: Ct,
    ONE: mt,
    create: (c) => Zt(c, r),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);
      return Ct <= c && c < r;
    },
    is0: (c) => c === Ct,
    isOdd: (c) => (c & mt) === mt,
    neg: (c) => Zt(-c, r),
    eql: (c, l) => c === l,
    sqr: (c) => Zt(c * c, r),
    add: (c, l) => Zt(c + l, r),
    sub: (c, l) => Zt(c - l, r),
    mul: (c, l) => Zt(c * l, r),
    pow: (c, l) => gg(o, c, l),
    div: (c, l) => Zt(c * dc(l, r), r),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, l) => c + l,
    subN: (c, l) => c - l,
    mulN: (c, l) => c * l,
    inv: (c) => dc(c, r),
    sqrt: n.sqrt || ((c) => a(o, c)),
    invertBatch: (c) => mg(o, c),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (c, l, h) => h ? l : c,
    toBytes: (c) => e ? Xc(c, i) : pi(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
      return e ? Yc(c) : jn(c);
    }
  });
  return Object.freeze(o);
}
function jh(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function Qh(r) {
  const t = jh(r);
  return t + Math.ceil(t / 2);
}
function wg(r, t, e = !1) {
  const n = r.length, s = jh(t), i = Qh(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const a = e ? jn(r) : Yc(r), o = Zt(a, t - mt) + mt;
  return e ? Xc(o, s) : pi(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ag = BigInt(0), So = BigInt(1);
function bg(r, t) {
  const e = (s, i) => {
    const a = i.negate();
    return s ? a : i;
  }, n = (s) => {
    const i = Math.ceil(t / s) + 1, a = 2 ** (s - 1);
    return { windows: i, windowSize: a };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let a = r.ZERO, o = s;
      for (; i > Ag; )
        i & So && (a = a.add(o)), o = o.double(), i >>= So;
      return a;
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
      const { windows: a, windowSize: o } = n(i), c = [];
      let l = s, h = l;
      for (let u = 0; u < a; u++) {
        h = l, c.push(h);
        for (let f = 1; f < o; f++)
          h = h.add(l), c.push(h);
        l = h.double();
      }
      return c;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, a) {
      const { windows: o, windowSize: c } = n(s);
      let l = r.ZERO, h = r.BASE;
      const u = BigInt(2 ** s - 1), f = 2 ** s, y = BigInt(s);
      for (let m = 0; m < o; m++) {
        const g = m * c;
        let w = Number(a & u);
        a >>= y, w > c && (w -= f, a += So);
        const E = g, O = g + Math.abs(w) - 1, N = m % 2 !== 0, U = w < 0;
        w === 0 ? h = h.add(e(N, i[E])) : l = l.add(e(U, i[O]));
      }
      return { p: l, f: h };
    },
    wNAFCached(s, i, a, o) {
      const c = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, c), c !== 1 && i.set(s, o(l))), this.wNAF(c, l, a);
    }
  };
}
function zh(r) {
  return pg(r.Fp), ca(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ..._h(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Eg(r) {
  const t = zh(r);
  ca(t, {
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
  const { endo: e, Fp: n, a: s } = t;
  if (e) {
    if (!n.eql(s, n.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: vg, hexToBytes: xg } = cg, wn = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(r = "") {
      super(r);
    }
  },
  _parseInt(r) {
    const { Err: t } = wn;
    if (r.length < 2 || r[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = r[1], n = r.subarray(2, e + 2);
    if (!e || n.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (n[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (n[0] === 0 && !(n[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: vg(n), l: r.subarray(e + 2) };
  },
  toSig(r) {
    const { Err: t } = wn, e = typeof r == "string" ? xg(r) : r;
    if (!(e instanceof Uint8Array))
      throw new Error("ui8a expected");
    let n = e.length;
    if (n < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== n - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = wn._parseInt(e.subarray(2)), { d: a, l: o } = wn._parseInt(i);
    if (o.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: a };
  },
  hexFromSig(r) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const h = l.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, n = t(e(r.s)), s = t(e(r.r)), i = n.length / 2, a = s.length / 2, o = e(i), c = e(a);
    return `30${e(a + i + 4)}02${c}${s}02${o}${n}`;
  }
}, Ar = BigInt(0), me = BigInt(1);
BigInt(2);
const Kl = BigInt(3);
BigInt(4);
function Ng(r) {
  const t = Eg(r), { Fp: e } = t, n = t.toBytes || ((m, g, w) => {
    const E = g.toAffine();
    return Gi(Uint8Array.from([4]), e.toBytes(E.x), e.toBytes(E.y));
  }), s = t.fromBytes || ((m) => {
    const g = m.subarray(1), w = e.fromBytes(g.subarray(0, e.BYTES)), E = e.fromBytes(g.subarray(e.BYTES, 2 * e.BYTES));
    return { x: w, y: E };
  });
  function i(m) {
    const { a: g, b: w } = t, E = e.sqr(m), O = e.mul(E, m);
    return e.add(e.add(O, e.mul(m, g)), w);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(m) {
    return typeof m == "bigint" && Ar < m && m < t.n;
  }
  function o(m) {
    if (!a(m))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function c(m) {
    const { allowedPrivateKeyLengths: g, nByteLength: w, wrapPrivateKey: E, n: O } = t;
    if (g && typeof m != "bigint") {
      if (m instanceof Uint8Array && (m = di(m)), typeof m != "string" || !g.includes(m.length))
        throw new Error("Invalid key");
      m = m.padStart(w * 2, "0");
    }
    let N;
    try {
      N = typeof m == "bigint" ? m : jn(xe("private key", m, w));
    } catch {
      throw new Error(`private key must be ${w} bytes, hex or bigint, not ${typeof m}`);
    }
    return E && (N = Zt(N, O)), o(N), N;
  }
  const l = /* @__PURE__ */ new Map();
  function h(m) {
    if (!(m instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  class u {
    constructor(g, w, E) {
      if (this.px = g, this.py = w, this.pz = E, g == null || !e.isValid(g))
        throw new Error("x required");
      if (w == null || !e.isValid(w))
        throw new Error("y required");
      if (E == null || !e.isValid(E))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(g) {
      const { x: w, y: E } = g || {};
      if (!g || !e.isValid(w) || !e.isValid(E))
        throw new Error("invalid affine point");
      if (g instanceof u)
        throw new Error("projective point not allowed");
      const O = (N) => e.eql(N, e.ZERO);
      return O(w) && O(E) ? u.ZERO : new u(w, E, e.ONE);
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
    static normalizeZ(g) {
      const w = e.invertBatch(g.map((E) => E.pz));
      return g.map((E, O) => E.toAffine(w[O])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(g) {
      const w = u.fromAffine(s(xe("pointHex", g)));
      return w.assertValidity(), w;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(g) {
      return u.BASE.multiply(c(g));
    }
    // "Private method", don't use it directly
    _setWindowSize(g) {
      this._WINDOW_SIZE = g, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: g, y: w } = this.toAffine();
      if (!e.isValid(g) || !e.isValid(w))
        throw new Error("bad point: x or y not FE");
      const E = e.sqr(w), O = i(g);
      if (!e.eql(E, O))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: g } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(g);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(g) {
      h(g);
      const { px: w, py: E, pz: O } = this, { px: N, py: U, pz: P } = g, I = e.eql(e.mul(w, P), e.mul(N, O)), k = e.eql(e.mul(E, P), e.mul(U, O));
      return I && k;
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
      const { a: g, b: w } = t, E = e.mul(w, Kl), { px: O, py: N, pz: U } = this;
      let P = e.ZERO, I = e.ZERO, k = e.ZERO, S = e.mul(O, O), _ = e.mul(N, N), D = e.mul(U, U), F = e.mul(O, N);
      return F = e.add(F, F), k = e.mul(O, U), k = e.add(k, k), P = e.mul(g, k), I = e.mul(E, D), I = e.add(P, I), P = e.sub(_, I), I = e.add(_, I), I = e.mul(P, I), P = e.mul(F, P), k = e.mul(E, k), D = e.mul(g, D), F = e.sub(S, D), F = e.mul(g, F), F = e.add(F, k), k = e.add(S, S), S = e.add(k, S), S = e.add(S, D), S = e.mul(S, F), I = e.add(I, S), D = e.mul(N, U), D = e.add(D, D), S = e.mul(D, F), P = e.sub(P, S), k = e.mul(D, _), k = e.add(k, k), k = e.add(k, k), new u(P, I, k);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(g) {
      h(g);
      const { px: w, py: E, pz: O } = this, { px: N, py: U, pz: P } = g;
      let I = e.ZERO, k = e.ZERO, S = e.ZERO;
      const _ = t.a, D = e.mul(t.b, Kl);
      let F = e.mul(w, N), j = e.mul(E, U), $ = e.mul(O, P), Et = e.add(w, E), v = e.add(N, U);
      Et = e.mul(Et, v), v = e.add(F, j), Et = e.sub(Et, v), v = e.add(w, O);
      let T = e.add(N, P);
      return v = e.mul(v, T), T = e.add(F, $), v = e.sub(v, T), T = e.add(E, O), I = e.add(U, P), T = e.mul(T, I), I = e.add(j, $), T = e.sub(T, I), S = e.mul(_, v), I = e.mul(D, $), S = e.add(I, S), I = e.sub(j, S), S = e.add(j, S), k = e.mul(I, S), j = e.add(F, F), j = e.add(j, F), $ = e.mul(_, $), v = e.mul(D, v), j = e.add(j, $), $ = e.sub(F, $), $ = e.mul(_, $), v = e.add(v, $), F = e.mul(j, v), k = e.add(k, F), F = e.mul(T, v), I = e.mul(Et, I), I = e.sub(I, F), F = e.mul(Et, j), S = e.mul(T, S), S = e.add(S, F), new u(I, k, S);
    }
    subtract(g) {
      return this.add(g.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(g) {
      return y.wNAFCached(this, l, g, (w) => {
        const E = e.invertBatch(w.map((O) => O.pz));
        return w.map((O, N) => O.toAffine(E[N])).map(u.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(g) {
      const w = u.ZERO;
      if (g === Ar)
        return w;
      if (o(g), g === me)
        return this;
      const { endo: E } = t;
      if (!E)
        return y.unsafeLadder(this, g);
      let { k1neg: O, k1: N, k2neg: U, k2: P } = E.splitScalar(g), I = w, k = w, S = this;
      for (; N > Ar || P > Ar; )
        N & me && (I = I.add(S)), P & me && (k = k.add(S)), S = S.double(), N >>= me, P >>= me;
      return O && (I = I.negate()), U && (k = k.negate()), k = new u(e.mul(k.px, E.beta), k.py, k.pz), I.add(k);
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
    multiply(g) {
      o(g);
      let w = g, E, O;
      const { endo: N } = t;
      if (N) {
        const { k1neg: U, k1: P, k2neg: I, k2: k } = N.splitScalar(w);
        let { p: S, f: _ } = this.wNAF(P), { p: D, f: F } = this.wNAF(k);
        S = y.constTimeNegate(U, S), D = y.constTimeNegate(I, D), D = new u(e.mul(D.px, N.beta), D.py, D.pz), E = S.add(D), O = _.add(F);
      } else {
        const { p: U, f: P } = this.wNAF(w);
        E = U, O = P;
      }
      return u.normalizeZ([E, O])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(g, w, E) {
      const O = u.BASE, N = (P, I) => I === Ar || I === me || !P.equals(O) ? P.multiplyUnsafe(I) : P.multiply(I), U = N(this, w).add(N(g, E));
      return U.is0() ? void 0 : U;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(g) {
      const { px: w, py: E, pz: O } = this, N = this.is0();
      g == null && (g = N ? e.ONE : e.inv(O));
      const U = e.mul(w, g), P = e.mul(E, g), I = e.mul(O, g);
      if (N)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(I, e.ONE))
        throw new Error("invZ was invalid");
      return { x: U, y: P };
    }
    isTorsionFree() {
      const { h: g, isTorsionFree: w } = t;
      if (g === me)
        return !0;
      if (w)
        return w(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: g, clearCofactor: w } = t;
      return g === me ? this : w ? w(u, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(g = !0) {
      return this.assertValidity(), n(u, this, g);
    }
    toHex(g = !0) {
      return di(this.toRawBytes(g));
    }
  }
  u.BASE = new u(t.Gx, t.Gy, e.ONE), u.ZERO = new u(e.ZERO, e.ONE, e.ZERO);
  const f = t.nBitLength, y = bg(u, t.endo ? Math.ceil(f / 2) : f);
  return {
    CURVE: t,
    ProjectivePoint: u,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: a
  };
}
function Ig(r) {
  const t = zh(r);
  return ca(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Tg(r) {
  const t = Ig(r), { Fp: e, n } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function a(v) {
    return Ar < v && v < e.ORDER;
  }
  function o(v) {
    return Zt(v, n);
  }
  function c(v) {
    return dc(v, n);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: h, weierstrassEquation: u, isWithinCurveOrder: f } = Ng({
    ...t,
    toBytes(v, T, L) {
      const z = T.toAffine(), V = e.toBytes(z.x), Y = Gi;
      return L ? Y(Uint8Array.from([T.hasEvenY() ? 2 : 3]), V) : Y(Uint8Array.from([4]), V, e.toBytes(z.y));
    },
    fromBytes(v) {
      const T = v.length, L = v[0], z = v.subarray(1);
      if (T === s && (L === 2 || L === 3)) {
        const V = jn(z);
        if (!a(V))
          throw new Error("Point is not on curve");
        const Y = u(V);
        let at = e.sqrt(Y);
        const st = (at & me) === me;
        return (L & 1) === 1 !== st && (at = e.neg(at)), { x: V, y: at };
      } else if (T === i && L === 4) {
        const V = e.fromBytes(z.subarray(0, e.BYTES)), Y = e.fromBytes(z.subarray(e.BYTES, 2 * e.BYTES));
        return { x: V, y: Y };
      } else
        throw new Error(`Point of length ${T} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), y = (v) => di(pi(v, t.nByteLength));
  function m(v) {
    const T = n >> me;
    return v > T;
  }
  function g(v) {
    return m(v) ? o(-v) : v;
  }
  const w = (v, T, L) => jn(v.slice(T, L));
  class E {
    constructor(T, L, z) {
      this.r = T, this.s = L, this.recovery = z, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(T) {
      const L = t.nByteLength;
      return T = xe("compactSignature", T, L * 2), new E(w(T, 0, L), w(T, L, 2 * L));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(T) {
      const { r: L, s: z } = wn.toSig(xe("DER", T));
      return new E(L, z);
    }
    assertValidity() {
      if (!f(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!f(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(T) {
      return new E(this.r, this.s, T);
    }
    recoverPublicKey(T) {
      const { r: L, s: z, recovery: V } = this, Y = k(xe("msgHash", T));
      if (V == null || ![0, 1, 2, 3].includes(V))
        throw new Error("recovery id invalid");
      const at = V === 2 || V === 3 ? L + t.n : L;
      if (at >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const st = V & 1 ? "03" : "02", Nt = l.fromHex(st + y(at)), vt = c(at), $t = o(-Y * vt), be = o(z * vt), Ot = l.BASE.multiplyAndAddUnsafe(Nt, $t, be);
      if (!Ot)
        throw new Error("point at infinify");
      return Ot.assertValidity(), Ot;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new E(this.r, o(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return fi(this.toDERHex());
    }
    toDERHex() {
      return wn.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return fi(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const O = {
    isValidPrivateKey(v) {
      try {
        return h(v), !0;
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
      const v = Qh(t.n);
      return wg(t.randomBytes(v), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(v = 8, T = l.BASE) {
      return T._setWindowSize(v), T.multiply(BigInt(3)), T;
    }
  };
  function N(v, T = !0) {
    return l.fromPrivateKey(v).toRawBytes(T);
  }
  function U(v) {
    const T = v instanceof Uint8Array, L = typeof v == "string", z = (T || L) && v.length;
    return T ? z === s || z === i : L ? z === 2 * s || z === 2 * i : v instanceof l;
  }
  function P(v, T, L = !0) {
    if (U(v))
      throw new Error("first arg must be private key");
    if (!U(T))
      throw new Error("second arg must be public key");
    return l.fromHex(T).multiply(h(v)).toRawBytes(L);
  }
  const I = t.bits2int || function(v) {
    const T = jn(v), L = v.length * 8 - t.nBitLength;
    return L > 0 ? T >> BigInt(L) : T;
  }, k = t.bits2int_modN || function(v) {
    return o(I(v));
  }, S = $c(t.nBitLength);
  function _(v) {
    if (typeof v != "bigint")
      throw new Error("bigint expected");
    if (!(Ar <= v && v < S))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return pi(v, t.nByteLength);
  }
  function D(v, T, L = F) {
    if (["recovered", "canonical"].some((Ht) => Ht in L))
      throw new Error("sign() legacy options not supported");
    const { hash: z, randomBytes: V } = t;
    let { lowS: Y, prehash: at, extraEntropy: st } = L;
    Y == null && (Y = !0), v = xe("msgHash", v), at && (v = xe("prehashed msgHash", z(v)));
    const Nt = k(v), vt = h(T), $t = [_(vt), _(Nt)];
    if (st != null) {
      const Ht = st === !0 ? V(e.BYTES) : st;
      $t.push(xe("extraEntropy", Ht));
    }
    const be = Gi(...$t), Ot = Nt;
    function an(Ht) {
      const te = I(Ht);
      if (!f(te))
        return;
      const $e = c(te), pt = l.BASE.multiply(te).toAffine(), ee = o(pt.x);
      if (ee === Ar)
        return;
      const tr = o($e * o(Ot + ee * vt));
      if (tr === Ar)
        return;
      let vi = (pt.x === ee ? 0 : 2) | Number(pt.y & me), xi = tr;
      return Y && m(tr) && (xi = g(tr), vi ^= 1), new E(ee, xi, vi);
    }
    return { seed: be, k2sig: an };
  }
  const F = { lowS: t.lowS, prehash: !1 }, j = { lowS: t.lowS, prehash: !1 };
  function $(v, T, L = F) {
    const { seed: z, k2sig: V } = D(v, T, L), Y = t;
    return Vh(Y.hash.outputLen, Y.nByteLength, Y.hmac)(z, V);
  }
  l.BASE._setWindowSize(8);
  function Et(v, T, L, z = j) {
    var $e;
    const V = v;
    if (T = xe("msgHash", T), L = xe("publicKey", L), "strict" in z)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: Y, prehash: at } = z;
    let st, Nt;
    try {
      if (typeof V == "string" || V instanceof Uint8Array)
        try {
          st = E.fromDER(V);
        } catch (pt) {
          if (!(pt instanceof wn.Err))
            throw pt;
          st = E.fromCompact(V);
        }
      else if (typeof V == "object" && typeof V.r == "bigint" && typeof V.s == "bigint") {
        const { r: pt, s: ee } = V;
        st = new E(pt, ee);
      } else
        throw new Error("PARSE");
      Nt = l.fromHex(L);
    } catch (pt) {
      if (pt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (Y && st.hasHighS())
      return !1;
    at && (T = t.hash(T));
    const { r: vt, s: $t } = st, be = k(T), Ot = c($t), an = o(be * Ot), Ht = o(vt * Ot), te = ($e = l.BASE.multiplyAndAddUnsafe(Nt, an, Ht)) == null ? void 0 : $e.toAffine();
    return te ? o(te.x) === vt : !1;
  }
  return {
    CURVE: t,
    getPublicKey: N,
    getSharedSecret: P,
    sign: $,
    verify: Et,
    ProjectivePoint: l,
    Signature: E,
    utils: O
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Cg(r) {
  return {
    hash: r,
    hmac: (t, ...e) => bh(r, t, fp(...e)),
    randomBytes: pp
  };
}
function Og(r, t) {
  const e = (n) => Tg({ ...r, ...Cg(n) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Jh = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), ql = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Pg = BigInt(1), fc = BigInt(2), Wl = (r, t) => (r + t / fc) / t;
function kg(r) {
  const t = Jh, e = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), a = BigInt(23), o = BigInt(44), c = BigInt(88), l = r * r * r % t, h = l * l * r % t, u = le(h, e, t) * h % t, f = le(u, e, t) * h % t, y = le(f, fc, t) * l % t, m = le(y, s, t) * y % t, g = le(m, i, t) * m % t, w = le(g, o, t) * g % t, E = le(w, c, t) * w % t, O = le(E, o, t) * g % t, N = le(O, e, t) * h % t, U = le(N, a, t) * m % t, P = le(U, n, t) * l % t, I = le(P, fc, t);
  if (!pc.eql(pc.sqr(I), r))
    throw new Error("Cannot find square root");
  return I;
}
const pc = yg(Jh, void 0, void 0, { sqrt: kg }), Ur = Og({
  a: BigInt(0),
  b: BigInt(7),
  Fp: pc,
  n: ql,
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
    splitScalar: (r) => {
      const t = ql, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -Pg * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, a = BigInt("0x100000000000000000000000000000000"), o = Wl(i * r, t), c = Wl(-n * r, t);
      let l = Zt(r - o * e - c * s, t), h = Zt(-o * n - c * i, t);
      const u = l > a, f = h > a;
      if (u && (l = t - l), f && (h = t - h), l > a || h > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: u, k1: l, k2neg: f, k2: h };
    }
  }
}, vh);
BigInt(0);
Ur.ProjectivePoint;
const gi = "0x0000000000000000000000000000000000000000", gc = "0x0000000000000000000000000000000000000000000000000000000000000000", Zl = BigInt(0), Yl = BigInt(1), Xl = BigInt(2), $l = BigInt(27), tu = BigInt(28), ba = BigInt(35), is = {};
function eu(r) {
  return Ze(xt(r), 32);
}
var Rs, Ss, Bs, Rn;
const ve = class ve {
  /**
   *  @private
   */
  constructor(t, e, n, s) {
    x(this, Rs);
    x(this, Ss);
    x(this, Bs);
    x(this, Rn);
    oa(t, is, "Signature"), p(this, Rs, e), p(this, Ss, n), p(this, Bs, s), p(this, Rn, null);
  }
  /**
   *  The ``r`` value for a signautre.
   *
   *  This represents the ``x`` coordinate of a "reference" or
   *  challenge point, from which the ``y`` can be computed.
   */
  get r() {
    return d(this, Rs);
  }
  set r(t) {
    A(_n(t) === 32, "invalid r", "value", t), p(this, Rs, H(t));
  }
  /**
   *  The ``s`` value for a signature.
   */
  get s() {
    return d(this, Ss);
  }
  set s(t) {
    A(_n(t) === 32, "invalid s", "value", t);
    const e = H(t);
    A(parseInt(e.substring(0, 3)) < 8, "non-canonical s", "value", e), p(this, Ss, e);
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
    return d(this, Bs);
  }
  set v(t) {
    const e = W(t, "value");
    A(e === 27 || e === 28, "invalid v", "v", t), p(this, Bs, e);
  }
  /**
   *  The EIP-155 ``v`` for legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get networkV() {
    return d(this, Rn);
  }
  /**
   *  The chain ID for EIP-155 legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get legacyChainId() {
    const t = this.networkV;
    return t == null ? null : ve.getChainId(t);
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
    const t = q(this.s);
    return this.yParity && (t[0] |= 128), H(t);
  }
  /**
   *  The [[link-eip-2098]] compact representation.
   */
  get compactSerialized() {
    return ut([this.r, this.yParityAndS]);
  }
  /**
   *  The serialized representation.
   */
  get serialized() {
    return ut([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Signature { r: "${this.r}", s: "${this.s}", yParity: ${this.yParity}, networkV: ${this.networkV} }`;
  }
  /**
   *  Returns a new identical [[Signature]].
   */
  clone() {
    const t = new ve(is, this.r, this.s, this.v);
    return this.networkV && p(t, Rn, this.networkV), t;
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
    const e = G(t, "v");
    return e == $l || e == tu ? Zl : (A(e >= ba, "invalid EIP-155 v", "v", t), (e - ba) / Xl);
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
    return G(t) * Xl + BigInt(35 + e - 27);
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
    const e = G(t);
    return e === Zl || e === $l ? 27 : e === Yl || e === tu ? 28 : (A(e >= ba, "invalid v", "v", t), e & Yl ? 27 : 28);
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
      A(l, h, "signature", t);
    }
    if (t == null)
      return new ve(is, gc, gc, 27);
    if (typeof t == "string") {
      const l = q(t, "signature");
      if (l.length === 64) {
        const h = H(l.slice(0, 32)), u = l.slice(32, 64), f = u[0] & 128 ? 28 : 27;
        return u[0] &= 127, new ve(is, h, H(u), f);
      }
      if (l.length === 65) {
        const h = H(l.slice(0, 32)), u = l.slice(32, 64);
        e((u[0] & 128) === 0, "non-canonical s");
        const f = ve.getNormalizedV(l[64]);
        return new ve(is, h, H(u), f);
      }
      e(!1, "invalid raw signature length");
    }
    if (t instanceof ve)
      return t.clone();
    const n = t.r;
    e(n != null, "missing r");
    const s = eu(n), i = function(l, h) {
      if (l != null)
        return eu(l);
      if (h != null) {
        e(ot(h, 32), "invalid yParityAndS");
        const u = q(h);
        return u[0] &= 127, H(u);
      }
      e(!1, "missing s");
    }(t.s, t.yParityAndS);
    e((q(i)[0] & 128) == 0, "non-canonical s");
    const { networkV: a, v: o } = function(l, h, u) {
      if (l != null) {
        const f = G(l);
        return {
          networkV: f >= ba ? f : void 0,
          v: ve.getNormalizedV(f)
        };
      }
      if (h != null)
        return e(ot(h, 32), "invalid yParityAndS"), { v: q(h)[0] & 128 ? 28 : 27 };
      if (u != null) {
        switch (W(u, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        e(!1, "invalid yParity");
      }
      e(!1, "missing v");
    }(t.v, t.yParityAndS, t.yParity), c = new ve(is, s, i, o);
    return a && p(c, Rn, a), e(t.yParity == null || W(t.yParity, "sig.yParity") === c.yParity, "yParity mismatch"), e(t.yParityAndS == null || t.yParityAndS === c.yParityAndS, "yParityAndS mismatch"), c;
  }
};
Rs = new WeakMap(), Ss = new WeakMap(), Bs = new WeakMap(), Rn = new WeakMap();
let Ae = ve;
var ur;
const pn = class pn {
  /**
   *  Creates a new **SigningKey** for %%privateKey%%.
   */
  constructor(t) {
    x(this, ur);
    A(_n(t) === 32, "invalid private key", "privateKey", "[REDACTED]"), p(this, ur, H(t));
  }
  /**
   *  The private key.
   */
  get privateKey() {
    return d(this, ur);
  }
  /**
   *  The uncompressed public key.
   *
   * This will always begin with the prefix ``0x04`` and be 132
   * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
   */
  get publicKey() {
    return pn.computePublicKey(d(this, ur));
  }
  /**
   *  The compressed public key.
   *
   *  This will always begin with either the prefix ``0x02`` or ``0x03``
   *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
   *  nibbles)
   */
  get compressedPublicKey() {
    return pn.computePublicKey(d(this, ur), !0);
  }
  /**
   *  Return the signature of the signed %%digest%%.
   */
  sign(t) {
    A(_n(t) === 32, "invalid digest length", "digest", t);
    const e = Ur.sign(Qt(t), Qt(d(this, ur)), {
      lowS: !0
    });
    return Ae.from({
      r: en(e.r, 32),
      s: en(e.s, 32),
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
    const e = pn.computePublicKey(t);
    return H(Ur.getSharedSecret(Qt(d(this, ur)), q(e), !1));
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
    let n = q(t, "key");
    if (n.length === 32) {
      const i = Ur.getPublicKey(n, !!e);
      return H(i);
    }
    if (n.length === 64) {
      const i = new Uint8Array(65);
      i[0] = 4, i.set(n, 1), n = i;
    }
    const s = Ur.ProjectivePoint.fromHex(n);
    return H(s.toRawBytes(e));
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
    A(_n(t) === 32, "invalid digest length", "digest", t);
    const n = Ae.from(e);
    let s = Ur.Signature.fromCompact(Qt(ut([n.r, n.s])));
    s = s.addRecoveryBit(n.yParity);
    const i = s.recoverPublicKey(Qt(t));
    return A(i != null, "invalid signautre for digest", "signature", e), "0x" + i.toHex(!1);
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
  static addPoints(t, e, n) {
    const s = Ur.ProjectivePoint.fromHex(pn.computePublicKey(t).substring(2)), i = Ur.ProjectivePoint.fromHex(pn.computePublicKey(e).substring(2));
    return "0x" + s.add(i).toHex(!!n);
  }
};
ur = new WeakMap();
let Vi = pn;
const Rg = BigInt(0), Sg = BigInt(36);
function ru(r) {
  r = r.toLowerCase();
  const t = r.substring(2).split(""), e = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    e[s] = t[s].charCodeAt(0);
  const n = q(ft(e));
  for (let s = 0; s < 40; s += 2)
    n[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (n[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const tl = {};
for (let r = 0; r < 10; r++)
  tl[String(r)] = String(r);
for (let r = 0; r < 26; r++)
  tl[String.fromCharCode(65 + r)] = String(10 + r);
const nu = 15;
function Bg(r) {
  r = r.toUpperCase(), r = r.substring(4) + r.substring(0, 2) + "00";
  let t = r.split("").map((n) => tl[n]).join("");
  for (; t.length >= nu; ) {
    let n = t.substring(0, nu);
    t = parseInt(n, 10) % 97 + t.substring(n.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
const Ug = function() {
  const r = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    r[e] = BigInt(t);
  }
  return r;
}();
function Dg(r) {
  r = r.toLowerCase();
  let t = Rg;
  for (let e = 0; e < r.length; e++)
    t = t * Sg + Ug[r[e]];
  return t;
}
function nt(r) {
  if (A(typeof r == "string", "invalid address", "address", r), r.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    r.startsWith("0x") || (r = "0x" + r);
    const t = ru(r);
    return A(!r.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === r, "bad address checksum", "address", r), t;
  }
  if (r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    A(r.substring(2, 4) === Bg(r), "bad icap checksum", "address", r);
    let t = Dg(r.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return ru("0x" + t);
  }
  A(!1, "invalid address", "address", r);
}
function Lg(r) {
  const t = nt(r.from);
  let e = G(r.nonce, "tx.nonce").toString(16);
  return e === "0" ? e = "0x" : e.length % 2 ? e = "0x0" + e : e = "0x" + e, nt(dt(ft(qn([t, e])), 12));
}
function Kh(r) {
  return r && typeof r.getAddress == "function";
}
async function Bo(r, t) {
  const e = await t;
  return (e == null || e === "0x0000000000000000000000000000000000000000") && (R(typeof r != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: r }), A(!1, "invalid AddressLike value; did not resolve to a value address", "target", r)), nt(e);
}
function Jt(r, t) {
  if (typeof r == "string")
    return r.match(/^0x[0-9a-f]{40}$/i) ? nt(r) : (R(t != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), Bo(r, t.resolveName(r)));
  if (Kh(r))
    return Bo(r, r.getAddress());
  if (r && typeof r.then == "function")
    return Bo(r, r);
  A(!1, "unsupported addressable value", "target", r);
}
const nr = {};
function M(r, t) {
  let e = !1;
  return t < 0 && (e = !0, t *= -1), new Mt(nr, `${e ? "" : "u"}int${t}`, r, { signed: e, width: t });
}
function et(r, t) {
  return new Mt(nr, `bytes${t || ""}`, r, { size: t });
}
const su = Symbol.for("_ethers_typed");
var Sn;
const sr = class sr {
  /**
   *  @_ignore:
   */
  constructor(t, e, n, s) {
    /**
     *  The type, as a Solidity-compatible type.
     */
    b(this, "type");
    /**
     *  The actual value.
     */
    b(this, "value");
    x(this, Sn);
    /**
     *  @_ignore:
     */
    b(this, "_typedSymbol");
    s == null && (s = null), oa(nr, t, "Typed"), Q(this, { _typedSymbol: su, type: e, value: n }), p(this, Sn, s), this.format();
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
    return d(this, Sn);
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
    return d(this, Sn) === !0 ? -1 : d(this, Sn) === !1 ? this.value.length : null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(t, e) {
    return new sr(nr, t, e);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(t) {
    return M(t, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(t) {
    return M(t, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(t) {
    return M(t, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(t) {
    return M(t, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(t) {
    return M(t, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(t) {
    return M(t, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(t) {
    return M(t, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(t) {
    return M(t, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(t) {
    return M(t, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(t) {
    return M(t, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(t) {
    return M(t, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(t) {
    return M(t, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(t) {
    return M(t, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(t) {
    return M(t, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(t) {
    return M(t, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(t) {
    return M(t, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(t) {
    return M(t, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(t) {
    return M(t, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(t) {
    return M(t, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(t) {
    return M(t, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(t) {
    return M(t, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(t) {
    return M(t, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(t) {
    return M(t, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(t) {
    return M(t, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(t) {
    return M(t, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(t) {
    return M(t, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(t) {
    return M(t, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(t) {
    return M(t, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(t) {
    return M(t, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(t) {
    return M(t, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(t) {
    return M(t, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(t) {
    return M(t, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(t) {
    return M(t, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(t) {
    return M(t, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(t) {
    return M(t, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(t) {
    return M(t, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(t) {
    return M(t, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(t) {
    return M(t, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(t) {
    return M(t, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(t) {
    return M(t, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(t) {
    return M(t, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(t) {
    return M(t, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(t) {
    return M(t, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(t) {
    return M(t, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(t) {
    return M(t, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(t) {
    return M(t, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(t) {
    return M(t, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(t) {
    return M(t, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(t) {
    return M(t, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(t) {
    return M(t, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(t) {
    return M(t, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(t) {
    return M(t, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(t) {
    return M(t, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(t) {
    return M(t, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(t) {
    return M(t, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(t) {
    return M(t, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(t) {
    return M(t, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(t) {
    return M(t, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(t) {
    return M(t, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(t) {
    return M(t, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(t) {
    return M(t, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(t) {
    return M(t, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(t) {
    return M(t, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(t) {
    return M(t, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(t) {
    return M(t, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(t) {
    return M(t, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(t) {
    return et(t, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(t) {
    return et(t, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(t) {
    return et(t, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(t) {
    return et(t, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(t) {
    return et(t, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(t) {
    return et(t, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(t) {
    return et(t, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(t) {
    return et(t, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(t) {
    return et(t, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(t) {
    return et(t, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(t) {
    return et(t, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(t) {
    return et(t, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(t) {
    return et(t, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(t) {
    return et(t, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(t) {
    return et(t, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(t) {
    return et(t, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(t) {
    return et(t, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(t) {
    return et(t, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(t) {
    return et(t, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(t) {
    return et(t, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(t) {
    return et(t, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(t) {
    return et(t, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(t) {
    return et(t, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(t) {
    return et(t, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(t) {
    return et(t, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(t) {
    return et(t, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(t) {
    return et(t, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(t) {
    return et(t, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(t) {
    return et(t, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(t) {
    return et(t, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(t) {
    return et(t, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(t) {
    return et(t, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(t) {
    return new sr(nr, "address", t);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(t) {
    return new sr(nr, "bool", !!t);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(t) {
    return new sr(nr, "bytes", t);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(t) {
    return new sr(nr, "string", t);
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
    return new sr(nr, "overrides", Object.assign({}, t));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(t) {
    return t && typeof t == "object" && "_typedSymbol" in t && t._typedSymbol === su;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(t, e) {
    if (sr.isTyped(t)) {
      if (t.type !== e)
        throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
      return t.value;
    }
    return t;
  }
};
Sn = new WeakMap();
let Mt = sr;
class Fg extends Cr {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    let n = Mt.dereference(e, "string");
    try {
      n = nt(n);
    } catch (s) {
      return this._throwError(s.message, e);
    }
    return t.writeValue(n);
  }
  decode(t) {
    return nt(en(t.readValue(), 20));
  }
}
class Mg extends Cr {
  constructor(e) {
    super(e.name, e.type, "_", e.dynamic);
    b(this, "coder");
    this.coder = e;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(e, n) {
    return this.coder.encode(e, n);
  }
  decode(e) {
    return this.coder.decode(e);
  }
}
function qh(r, t, e) {
  let n = [];
  if (Array.isArray(e))
    n = e;
  else if (e && typeof e == "object") {
    let c = {};
    n = t.map((l) => {
      const h = l.localName;
      return R(h, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: l }, value: e }), R(!c[h], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: l }, value: e }), c[h] = !0, e[h];
    });
  } else
    A(!1, "invalid tuple value", "tuple", e);
  A(t.length === n.length, "types/value length mismatch", "tuple", e);
  let s = new oc(), i = new oc(), a = [];
  t.forEach((c, l) => {
    let h = n[l];
    if (c.dynamic) {
      let u = i.length;
      c.encode(i, h);
      let f = s.writeUpdatableValue();
      a.push((y) => {
        f(y + u);
      });
    } else
      c.encode(s, h);
  }), a.forEach((c) => {
    c(s.length);
  });
  let o = r.appendWriter(s);
  return o += r.appendWriter(i), o;
}
function Wh(r, t) {
  let e = [], n = [], s = r.subReader(0);
  return t.forEach((i) => {
    let a = null;
    if (i.dynamic) {
      let o = r.readIndex(), c = s.subReader(o);
      try {
        a = i.decode(c);
      } catch (l) {
        if (Ft(l, "BUFFER_OVERRUN"))
          throw l;
        a = l, a.baseType = i.name, a.name = i.localName, a.type = i.type;
      }
    } else
      try {
        a = i.decode(r);
      } catch (o) {
        if (Ft(o, "BUFFER_OVERRUN"))
          throw o;
        a = o, a.baseType = i.name, a.name = i.localName, a.type = i.type;
      }
    if (a == null)
      throw new Error("investigate");
    e.push(a), n.push(i.localName || null);
  }), ui.fromItems(e, n);
}
class Hg extends Cr {
  constructor(e, n, s) {
    const i = e.type + "[" + (n >= 0 ? n : "") + "]", a = n === -1 || e.dynamic;
    super("array", i, s, a);
    b(this, "coder");
    b(this, "length");
    Q(this, { coder: e, length: n });
  }
  defaultValue() {
    const e = this.coder.defaultValue(), n = [];
    for (let s = 0; s < this.length; s++)
      n.push(e);
    return n;
  }
  encode(e, n) {
    const s = Mt.dereference(n, "array");
    Array.isArray(s) || this._throwError("expected array value", s);
    let i = this.length;
    i === -1 && (i = s.length, e.writeValue(s.length)), sh(s.length, i, "coder array" + (this.localName ? " " + this.localName : ""));
    let a = [];
    for (let o = 0; o < s.length; o++)
      a.push(this.coder);
    return qh(e, a, s);
  }
  decode(e) {
    let n = this.length;
    n === -1 && (n = e.readIndex(), R(n * zt <= e.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: e.bytes, offset: n * zt, length: e.dataLength }));
    let s = [];
    for (let i = 0; i < n; i++)
      s.push(new Mg(this.coder));
    return Wh(e, s);
  }
}
class Gg extends Cr {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    const n = Mt.dereference(e, "bool");
    return t.writeValue(n ? 1 : 0);
  }
  decode(t) {
    return !!t.readValue();
  }
}
class Zh extends Cr {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = Qt(e);
    let n = t.writeValue(e.length);
    return n += t.writeBytes(e), n;
  }
  decode(t) {
    return t.readBytes(t.readIndex(), !0);
  }
}
class Vg extends Zh {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return H(super.decode(t));
  }
}
class _g extends Cr {
  constructor(e, n) {
    let s = "bytes" + String(e);
    super(s, s, n, !1);
    b(this, "size");
    Q(this, { size: e }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(e, n) {
    let s = Qt(Mt.dereference(n, this.type));
    return s.length !== this.size && this._throwError("incorrect data length", n), e.writeBytes(s);
  }
  decode(e) {
    return H(e.readBytes(this.size));
  }
}
const jg = new Uint8Array([]);
class Qg extends Cr {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes(jg);
  }
  decode(t) {
    return t.readBytes(0), null;
  }
}
const zg = BigInt(0), Jg = BigInt(1), Kg = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class qg extends Cr {
  constructor(e, n, s) {
    const i = (n ? "int" : "uint") + e * 8;
    super(i, i, s, !1);
    b(this, "size");
    b(this, "signed");
    Q(this, { size: e, signed: n }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(e, n) {
    let s = G(Mt.dereference(n, this.type)), i = yn(Kg, zt * 8);
    if (this.signed) {
      let a = yn(i, this.size * 8 - 1);
      (s > a || s < -(a + Jg)) && this._throwError("value out-of-bounds", n), s = Jc(s, 8 * zt);
    } else (s < zg || s > yn(i, this.size * 8)) && this._throwError("value out-of-bounds", n);
    return e.writeValue(s);
  }
  decode(e) {
    let n = yn(e.readValue(), this.size * 8);
    return this.signed && (n = Va(n, this.size * 8)), n;
  }
}
class Wg extends Zh {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, Se(Mt.dereference(e, "string")));
  }
  decode(t) {
    return _a(super.decode(t));
  }
}
class Ea extends Cr {
  constructor(e, n) {
    let s = !1;
    const i = [];
    e.forEach((o) => {
      o.dynamic && (s = !0), i.push(o.type);
    });
    const a = "tuple(" + i.join(",") + ")";
    super("tuple", a, n, s);
    b(this, "coders");
    Q(this, { coders: Object.freeze(e.slice()) });
  }
  defaultValue() {
    const e = [];
    this.coders.forEach((s) => {
      e.push(s.defaultValue());
    });
    const n = this.coders.reduce((s, i) => {
      const a = i.localName;
      return a && (s[a] || (s[a] = 0), s[a]++), s;
    }, {});
    return this.coders.forEach((s, i) => {
      let a = s.localName;
      !a || n[a] !== 1 || (a === "length" && (a = "_length"), e[a] == null && (e[a] = e[i]));
    }), Object.freeze(e);
  }
  encode(e, n) {
    const s = Mt.dereference(n, "tuple");
    return qh(e, this.coders, s);
  }
  decode(e) {
    return Wh(e, this.coders);
  }
}
function Wn(r) {
  return ft(Se(r));
}
var Zg = "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";
const iu = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), au = 4;
function Yg(r) {
  let t = 0;
  function e() {
    return r[t++] << 8 | r[t++];
  }
  let n = e(), s = 1, i = [0, 1];
  for (let P = 1; P < n; P++)
    i.push(s += e());
  let a = e(), o = t;
  t += a;
  let c = 0, l = 0;
  function h() {
    return c == 0 && (l = l << 8 | r[t++], c = 8), l >> --c & 1;
  }
  const u = 31, f = 2 ** u, y = f >>> 1, m = y >> 1, g = f - 1;
  let w = 0;
  for (let P = 0; P < u; P++) w = w << 1 | h();
  let E = [], O = 0, N = f;
  for (; ; ) {
    let P = Math.floor(((w - O + 1) * s - 1) / N), I = 0, k = n;
    for (; k - I > 1; ) {
      let D = I + k >>> 1;
      P < i[D] ? k = D : I = D;
    }
    if (I == 0) break;
    E.push(I);
    let S = O + Math.floor(N * i[I] / s), _ = O + Math.floor(N * i[I + 1] / s) - 1;
    for (; !((S ^ _) & y); )
      w = w << 1 & g | h(), S = S << 1 & g, _ = _ << 1 & g | 1;
    for (; S & ~_ & m; )
      w = w & y | w << 1 & g >>> 1 | h(), S = S << 1 ^ y, _ = (_ ^ y) << 1 | y | 1;
    O = S, N = 1 + _ - S;
  }
  let U = n - 4;
  return E.map((P) => {
    switch (P - U) {
      case 3:
        return U + 65792 + (r[o++] << 16 | r[o++] << 8 | r[o++]);
      case 2:
        return U + 256 + (r[o++] << 8 | r[o++]);
      case 1:
        return U + r[o++];
      default:
        return P - 1;
    }
  });
}
function Xg(r) {
  let t = 0;
  return () => r[t++];
}
function Yh(r) {
  return Xg(Yg($g(r)));
}
function $g(r) {
  let t = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((s, i) => t[s.charCodeAt(0)] = i);
  let e = r.length, n = new Uint8Array(6 * e >> 3);
  for (let s = 0, i = 0, a = 0, o = 0; s < e; s++)
    o = o << 6 | t[r.charCodeAt(s)], a += 6, a >= 8 && (n[i++] = o >> (a -= 8));
  return n;
}
function tm(r) {
  return r & 1 ? ~r >> 1 : r >> 1;
}
function em(r, t) {
  let e = Array(r);
  for (let n = 0, s = 0; n < r; n++) e[n] = s += tm(t());
  return e;
}
function _i(r, t = 0) {
  let e = [];
  for (; ; ) {
    let n = r(), s = r();
    if (!s) break;
    t += n;
    for (let i = 0; i < s; i++)
      e.push(t + i);
    t += s + 1;
  }
  return e;
}
function Xh(r) {
  return ji(() => {
    let t = _i(r);
    if (t.length) return t;
  });
}
function $h(r) {
  let t = [];
  for (; ; ) {
    let e = r();
    if (e == 0) break;
    t.push(rm(e, r));
  }
  for (; ; ) {
    let e = r() - 1;
    if (e < 0) break;
    t.push(nm(e, r));
  }
  return t.flat();
}
function ji(r) {
  let t = [];
  for (; ; ) {
    let e = r(t.length);
    if (!e) break;
    t.push(e);
  }
  return t;
}
function td(r, t, e) {
  let n = Array(r).fill().map(() => []);
  for (let s = 0; s < t; s++)
    em(r, e).forEach((i, a) => n[a].push(i));
  return n;
}
function rm(r, t) {
  let e = 1 + t(), n = t(), s = ji(t);
  return td(s.length, 1 + r, t).flatMap((i, a) => {
    let [o, ...c] = i;
    return Array(s[a]).fill().map((l, h) => {
      let u = h * n;
      return [o + h * e, c.map((f) => f + u)];
    });
  });
}
function nm(r, t) {
  let e = 1 + t();
  return td(e, 1 + r, t).map((n) => [n[0], n.slice(1)]);
}
function sm(r) {
  let t = [], e = _i(r);
  return s(n([]), []), t;
  function n(i) {
    let a = r(), o = ji(() => {
      let c = _i(r).map((l) => e[l]);
      if (c.length) return n(c);
    });
    return { S: a, B: o, Q: i };
  }
  function s({ S: i, B: a }, o, c) {
    if (!(i & 4 && c === o[o.length - 1])) {
      i & 2 && (c = o[o.length - 1]), i & 1 && t.push(o);
      for (let l of a)
        for (let h of l.Q)
          s(l, [...o, h], c);
    }
  }
}
function im(r) {
  return r.toString(16).toUpperCase().padStart(2, "0");
}
function ed(r) {
  return `{${im(r)}}`;
}
function am(r) {
  let t = [];
  for (let e = 0, n = r.length; e < n; ) {
    let s = r.codePointAt(e);
    e += s < 65536 ? 1 : 2, t.push(s);
  }
  return t;
}
function mi(r) {
  let t = r.length;
  if (t < 4096) return String.fromCodePoint(...r);
  let e = [];
  for (let n = 0; n < t; )
    e.push(String.fromCodePoint(...r.slice(n, n += 4096)));
  return e.join("");
}
function om(r, t) {
  let e = r.length, n = e - t.length;
  for (let s = 0; n == 0 && s < e; s++) n = r[s] - t[s];
  return n;
}
var cm = "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";
const Qi = 44032, Qa = 4352, za = 4449, Ja = 4519, rd = 19, nd = 21, yi = 28, Ka = nd * yi, lm = rd * Ka, um = Qi + lm, hm = Qa + rd, dm = za + nd, fm = Ja + yi;
function Ri(r) {
  return r >> 24 & 255;
}
function sd(r) {
  return r & 16777215;
}
let mc, ou, yc, Pa;
function pm() {
  let r = Yh(cm);
  mc = new Map(Xh(r).flatMap((t, e) => t.map((n) => [n, e + 1 << 24]))), ou = new Set(_i(r)), yc = /* @__PURE__ */ new Map(), Pa = /* @__PURE__ */ new Map();
  for (let [t, e] of $h(r)) {
    if (!ou.has(t) && e.length == 2) {
      let [n, s] = e, i = Pa.get(n);
      i || (i = /* @__PURE__ */ new Map(), Pa.set(n, i)), i.set(s, t);
    }
    yc.set(t, e.reverse());
  }
}
function id(r) {
  return r >= Qi && r < um;
}
function gm(r, t) {
  if (r >= Qa && r < hm && t >= za && t < dm)
    return Qi + (r - Qa) * Ka + (t - za) * yi;
  if (id(r) && t > Ja && t < fm && (r - Qi) % yi == 0)
    return r + (t - Ja);
  {
    let e = Pa.get(r);
    return e && (e = e.get(t), e) ? e : -1;
  }
}
function ad(r) {
  mc || pm();
  let t = [], e = [], n = !1;
  function s(i) {
    let a = mc.get(i);
    a && (n = !0, i |= a), t.push(i);
  }
  for (let i of r)
    for (; ; ) {
      if (i < 128)
        t.push(i);
      else if (id(i)) {
        let a = i - Qi, o = a / Ka | 0, c = a % Ka / yi | 0, l = a % yi;
        s(Qa + o), s(za + c), l > 0 && s(Ja + l);
      } else {
        let a = yc.get(i);
        a ? e.push(...a) : s(i);
      }
      if (!e.length) break;
      i = e.pop();
    }
  if (n && t.length > 1) {
    let i = Ri(t[0]);
    for (let a = 1; a < t.length; a++) {
      let o = Ri(t[a]);
      if (o == 0 || i <= o) {
        i = o;
        continue;
      }
      let c = a - 1;
      for (; ; ) {
        let l = t[c + 1];
        if (t[c + 1] = t[c], t[c] = l, !c || (i = Ri(t[--c]), i <= o)) break;
      }
      i = Ri(t[a]);
    }
  }
  return t;
}
function mm(r) {
  let t = [], e = [], n = -1, s = 0;
  for (let i of r) {
    let a = Ri(i), o = sd(i);
    if (n == -1)
      a == 0 ? n = o : t.push(o);
    else if (s > 0 && s >= a)
      a == 0 ? (t.push(n, ...e), e.length = 0, n = o) : e.push(o), s = a;
    else {
      let c = gm(n, o);
      c >= 0 ? n = c : s == 0 && a == 0 ? (t.push(n), n = o) : (e.push(o), s = a);
    }
  }
  return n >= 0 && t.push(n, ...e), t;
}
function od(r) {
  return ad(r).map(sd);
}
function ym(r) {
  return mm(ad(r));
}
const cu = 45, cd = ".", ld = 65039, ud = 1, qa = (r) => Array.from(r);
function zi(r, t) {
  return r.P.has(t) || r.Q.has(t);
}
class wm extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let wc, hd, An, Ac, dd, Es, Uo, cs, un, lu, bc;
function el() {
  if (wc) return;
  let r = Yh(Zg);
  const t = () => _i(r), e = () => new Set(t()), n = (h, u) => u.forEach((f) => h.add(f));
  wc = new Map($h(r)), hd = e(), An = t(), Ac = new Set(t().map((h) => An[h])), An = new Set(An), dd = e(), e();
  let s = Xh(r), i = r();
  const a = () => {
    let h = /* @__PURE__ */ new Set();
    return t().forEach((u) => n(h, s[u])), n(h, t()), h;
  };
  Es = ji((h) => {
    let u = ji(r).map((f) => f + 96);
    if (u.length) {
      let f = h >= i;
      u[0] -= 32, u = mi(u), f && (u = `Restricted[${u}]`);
      let y = a(), m = a(), g = !r();
      return { N: u, P: y, Q: m, M: g, R: f };
    }
  }), Uo = e(), cs = /* @__PURE__ */ new Map();
  let o = t().concat(qa(Uo)).sort((h, u) => h - u);
  o.forEach((h, u) => {
    let f = r(), y = o[u] = f ? o[u - f] : { V: [], M: /* @__PURE__ */ new Map() };
    y.V.push(h), Uo.has(h) || cs.set(h, y);
  });
  for (let { V: h, M: u } of new Set(cs.values())) {
    let f = [];
    for (let m of h) {
      let g = Es.filter((E) => zi(E, m)), w = f.find(({ G: E }) => g.some((O) => E.has(O)));
      w || (w = { G: /* @__PURE__ */ new Set(), V: [] }, f.push(w)), w.V.push(m), n(w.G, g);
    }
    let y = f.flatMap((m) => qa(m.G));
    for (let { G: m, V: g } of f) {
      let w = new Set(y.filter((E) => !m.has(E)));
      for (let E of g)
        u.set(E, w);
    }
  }
  un = /* @__PURE__ */ new Set();
  let c = /* @__PURE__ */ new Set();
  const l = (h) => un.has(h) ? c.add(h) : un.add(h);
  for (let h of Es) {
    for (let u of h.P) l(u);
    for (let u of h.Q) l(u);
  }
  for (let h of un)
    !cs.has(h) && !c.has(h) && cs.set(h, ud);
  n(un, od(un)), lu = sm(r).map((h) => wm.from(h)).sort(om), bc = /* @__PURE__ */ new Map();
  for (let h of lu) {
    let u = [bc];
    for (let f of h) {
      let y = u.map((m) => {
        let g = m.get(f);
        return g || (g = /* @__PURE__ */ new Map(), m.set(f, g)), g;
      });
      f === ld ? u.push(...y) : u = y;
    }
    for (let f of u)
      f.V = h;
  }
}
function rl(r) {
  return (fd(r) ? "" : `${nl(mo([r]))} `) + ed(r);
}
function nl(r) {
  return `"${r}"‎`;
}
function Am(r) {
  if (r.length >= 4 && r[2] == cu && r[3] == cu)
    throw new Error(`invalid label extension: "${mi(r.slice(0, 4))}"`);
}
function bm(r) {
  for (let t = r.lastIndexOf(95); t > 0; )
    if (r[--t] !== 95)
      throw new Error("underscore allowed only at start");
}
function Em(r) {
  let t = r[0], e = iu.get(t);
  if (e) throw Di(`leading ${e}`);
  let n = r.length, s = -1;
  for (let i = 1; i < n; i++) {
    t = r[i];
    let a = iu.get(t);
    if (a) {
      if (s == i) throw Di(`${e} + ${a}`);
      s = i + 1, e = a;
    }
  }
  if (s == n) throw Di(`trailing ${e}`);
}
function mo(r, t = 1 / 0, e = ed) {
  let n = [];
  vm(r[0]) && n.push("◌"), r.length > t && (t >>= 1, r = [...r.slice(0, t), 8230, ...r.slice(-t)]);
  let s = 0, i = r.length;
  for (let a = 0; a < i; a++) {
    let o = r[a];
    fd(o) && (n.push(mi(r.slice(s, a))), n.push(e(o)), s = a + 1);
  }
  return n.push(mi(r.slice(s, i))), n.join("");
}
function vm(r) {
  return el(), An.has(r);
}
function fd(r) {
  return el(), dd.has(r);
}
function xm(r) {
  return Cm(Nm(r, ym, km));
}
function Nm(r, t, e) {
  if (!r) return [];
  el();
  let n = 0;
  return r.split(cd).map((s) => {
    let i = am(s), a = {
      input: i,
      offset: n
      // codepoint, not substring!
    };
    n += i.length + 1;
    try {
      let o = a.tokens = Pm(i, t, e), c = o.length, l;
      if (!c)
        throw new Error("empty label");
      let h = a.output = o.flat();
      if (bm(h), !(a.emoji = c > 1 || o[0].is_emoji) && h.every((u) => u < 128))
        Am(h), l = "ASCII";
      else {
        let u = o.flatMap((f) => f.is_emoji ? [] : f);
        if (!u.length)
          l = "Emoji";
        else {
          if (An.has(h[0])) throw Di("leading combining mark");
          for (let m = 1; m < c; m++) {
            let g = o[m];
            if (!g.is_emoji && An.has(g[0]))
              throw Di(`emoji + combining mark: "${mi(o[m - 1])} + ${mo([g[0]])}"`);
          }
          Em(h);
          let f = qa(new Set(u)), [y] = Tm(f);
          Om(y, u), Im(y, f), l = y.N;
        }
      }
      a.type = l;
    } catch (o) {
      a.error = o;
    }
    return a;
  });
}
function Im(r, t) {
  let e, n = [];
  for (let s of t) {
    let i = cs.get(s);
    if (i === ud) return;
    if (i) {
      let a = i.M.get(s);
      if (e = e ? e.filter((o) => a.has(o)) : qa(a), !e.length) return;
    } else
      n.push(s);
  }
  if (e) {
    for (let s of e)
      if (n.every((i) => zi(s, i)))
        throw new Error(`whole-script confusable: ${r.N}/${s.N}`);
  }
}
function Tm(r) {
  let t = Es;
  for (let e of r) {
    let n = t.filter((s) => zi(s, e));
    if (!n.length)
      throw Es.some((s) => zi(s, e)) ? gd(t[0], e) : pd(e);
    if (t = n, n.length == 1) break;
  }
  return t;
}
function Cm(r) {
  return r.map(({ input: t, error: e, output: n }) => {
    if (e) {
      let s = e.message;
      throw new Error(r.length == 1 ? s : `Invalid label ${nl(mo(t, 63))}: ${s}`);
    }
    return mi(n);
  }).join(cd);
}
function pd(r) {
  return new Error(`disallowed character: ${rl(r)}`);
}
function gd(r, t) {
  let e = rl(t), n = Es.find((s) => s.P.has(t));
  return n && (e = `${n.N} ${e}`), new Error(`illegal mixture: ${r.N} + ${e}`);
}
function Di(r) {
  return new Error(`illegal placement: ${r}`);
}
function Om(r, t) {
  for (let e of t)
    if (!zi(r, e))
      throw gd(r, e);
  if (r.M) {
    let e = od(t);
    for (let n = 1, s = e.length; n < s; n++)
      if (Ac.has(e[n])) {
        let i = n + 1;
        for (let a; i < s && Ac.has(a = e[i]); i++)
          for (let o = n; o < i; o++)
            if (e[o] == a)
              throw new Error(`duplicate non-spacing marks: ${rl(a)}`);
        if (i - n > au)
          throw new Error(`excessive non-spacing marks: ${nl(mo(e.slice(n - 1, i)))} (${i - n}/${au})`);
        n = i;
      }
  }
}
function Pm(r, t, e) {
  let n = [], s = [];
  for (r = r.slice().reverse(); r.length; ) {
    let i = Rm(r);
    if (i)
      s.length && (n.push(t(s)), s = []), n.push(e(i));
    else {
      let a = r.pop();
      if (un.has(a))
        s.push(a);
      else {
        let o = wc.get(a);
        if (o)
          s.push(...o);
        else if (!hd.has(a))
          throw pd(a);
      }
    }
  }
  return s.length && n.push(t(s)), n;
}
function km(r) {
  return r.filter((t) => t != ld);
}
function Rm(r, t) {
  let e = bc, n, s = r.length;
  for (; s && (e = e.get(r[--s]), !!e); ) {
    let { V: i } = e;
    i && (n = i, r.length = s);
  }
  return n;
}
const md = new Uint8Array(32);
md.fill(0);
function uu(r) {
  return A(r.length !== 0, "invalid ENS name; empty component", "comp", r), r;
}
function yd(r) {
  const t = Se(Sm(r)), e = [];
  if (r.length === 0)
    return e;
  let n = 0;
  for (let s = 0; s < t.length; s++)
    t[s] === 46 && (e.push(uu(t.slice(n, s))), n = s + 1);
  return A(n < t.length, "invalid ENS name; empty component", "name", r), e.push(uu(t.slice(n))), e;
}
function Sm(r) {
  try {
    if (r.length === 0)
      throw new Error("empty label");
    return xm(r);
  } catch (t) {
    A(!1, `invalid ENS name (${t.message})`, "name", r);
  }
}
function Ec(r) {
  A(typeof r == "string", "invalid ENS name; not a string", "name", r), A(r.length, "invalid ENS name (empty label)", "name", r);
  let t = md;
  const e = yd(r);
  for (; e.length; )
    t = ft(ut([t, ft(e.pop())]));
  return H(t);
}
function Bm(r, t) {
  const e = t;
  return A(e <= 255, "DNS encoded label cannot exceed 255", "length", e), H(ut(yd(r).map((n) => {
    A(n.length <= e, `label ${JSON.stringify(r)} exceeds ${e} bytes`, "name", r);
    const s = new Uint8Array(n.length + 1);
    return s.set(n, 1), s[0] = s.length - 1, s;
  }))) + "00";
}
function Do(r, t) {
  return {
    address: nt(r),
    storageKeys: t.map((e, n) => (A(ot(e, 32), "invalid slot", `storageKeys[${n}]`, e), e.toLowerCase()))
  };
}
function ns(r) {
  if (Array.isArray(r))
    return r.map((e, n) => Array.isArray(e) ? (A(e.length === 2, "invalid slot set", `value[${n}]`, e), Do(e[0], e[1])) : (A(e != null && typeof e == "object", "invalid address-slot set", "value", r), Do(e.address, e.storageKeys)));
  A(r != null && typeof r == "object", "invalid access list", "value", r);
  const t = Object.keys(r).map((e) => {
    const n = r[e].reduce((s, i) => (s[i] = !0, s), {});
    return Do(e, Object.keys(n).sort());
  });
  return t.sort((e, n) => e.address.localeCompare(n.address)), t;
}
function Um(r) {
  let t;
  return typeof r == "string" ? t = Vi.computePublicKey(r, !1) : t = r.publicKey, nt(ft("0x" + t.substring(4)).substring(26));
}
function wd(r, t) {
  return Um(Vi.recoverPublicKey(r, t));
}
const Tt = BigInt(0), Dm = BigInt(2), Lm = BigInt(27), Fm = BigInt(28), Mm = BigInt(35), Hm = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), Lo = 4096 * 32;
function hu(r, t) {
  let e = r.toString(16);
  for (; e.length < 2; )
    e = "0" + e;
  return e += rn(t).substring(4), "0x" + e;
}
function yo(r) {
  return r === "0x" ? null : nt(r);
}
function sl(r, t) {
  try {
    return ns(r);
  } catch (e) {
    A(!1, e.message, t, r);
  }
}
function la(r, t) {
  return r === "0x" ? 0 : W(r, t);
}
function yt(r, t) {
  if (r === "0x")
    return Tt;
  const e = G(r, t);
  return A(e <= Hm, "value exceeds uint size", t, e), e;
}
function ct(r, t) {
  const e = G(r, "value"), n = xt(e);
  return A(n.length <= 32, "value too large", `tx.${t}`, e), n;
}
function il(r) {
  return ns(r).map((t) => [t.address, t.storageKeys]);
}
function Gm(r, t) {
  A(Array.isArray(r), `invalid ${t}`, "value", r);
  for (let e = 0; e < r.length; e++)
    A(ot(r[e], 32), "invalid ${ param } hash", `value[${e}]`, r[e]);
  return r;
}
function Vm(r) {
  const t = ho(r);
  A(Array.isArray(t) && (t.length === 9 || t.length === 6), "invalid field count for legacy transaction", "data", r);
  const e = {
    type: 0,
    nonce: la(t[0], "nonce"),
    gasPrice: yt(t[1], "gasPrice"),
    gasLimit: yt(t[2], "gasLimit"),
    to: yo(t[3]),
    value: yt(t[4], "value"),
    data: H(t[5]),
    chainId: Tt
  };
  if (t.length === 6)
    return e;
  const n = yt(t[6], "v"), s = yt(t[7], "r"), i = yt(t[8], "s");
  if (s === Tt && i === Tt)
    e.chainId = n;
  else {
    let a = (n - Mm) / Dm;
    a < Tt && (a = Tt), e.chainId = a, A(a !== Tt || n === Lm || n === Fm, "non-canonical legacy v", "v", t[6]), e.signature = Ae.from({
      r: Ze(t[7], 32),
      s: Ze(t[8], 32),
      v: n
    });
  }
  return e;
}
function _m(r, t) {
  const e = [
    ct(r.nonce, "nonce"),
    ct(r.gasPrice || 0, "gasPrice"),
    ct(r.gasLimit, "gasLimit"),
    r.to || "0x",
    ct(r.value, "value"),
    r.data
  ];
  let n = Tt;
  if (r.chainId != Tt)
    n = G(r.chainId, "tx.chainId"), A(!t || t.networkV == null || t.legacyChainId === n, "tx.chainId/sig.v mismatch", "sig", t);
  else if (r.signature) {
    const i = r.signature.legacyChainId;
    i != null && (n = i);
  }
  if (!t)
    return n !== Tt && (e.push(xt(n)), e.push("0x"), e.push("0x")), qn(e);
  let s = BigInt(27 + t.yParity);
  return n !== Tt ? s = Ae.getChainIdV(n, t.v) : BigInt(t.v) !== s && A(!1, "tx.chainId/sig.v mismatch", "sig", t), e.push(xt(s)), e.push(xt(t.r)), e.push(xt(t.s)), qn(e);
}
function al(r, t) {
  let e;
  try {
    if (e = la(t[0], "yParity"), e !== 0 && e !== 1)
      throw new Error("bad yParity");
  } catch {
    A(!1, "invalid yParity", "yParity", t[0]);
  }
  const n = Ze(t[1], 32), s = Ze(t[2], 32), i = Ae.from({ r: n, s, yParity: e });
  r.signature = i;
}
function jm(r) {
  const t = ho(q(r).slice(1));
  A(Array.isArray(t) && (t.length === 9 || t.length === 12), "invalid field count for transaction type: 2", "data", H(r));
  const e = {
    type: 2,
    chainId: yt(t[0], "chainId"),
    nonce: la(t[1], "nonce"),
    maxPriorityFeePerGas: yt(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: yt(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: yt(t[4], "gasLimit"),
    to: yo(t[5]),
    value: yt(t[6], "value"),
    data: H(t[7]),
    accessList: sl(t[8], "accessList")
  };
  return t.length === 9 || al(e, t.slice(9)), e;
}
function Qm(r, t) {
  const e = [
    ct(r.chainId, "chainId"),
    ct(r.nonce, "nonce"),
    ct(r.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    ct(r.maxFeePerGas || 0, "maxFeePerGas"),
    ct(r.gasLimit, "gasLimit"),
    r.to || "0x",
    ct(r.value, "value"),
    r.data,
    il(r.accessList || [])
  ];
  return t && (e.push(ct(t.yParity, "yParity")), e.push(xt(t.r)), e.push(xt(t.s))), ut(["0x02", qn(e)]);
}
function zm(r) {
  const t = ho(q(r).slice(1));
  A(Array.isArray(t) && (t.length === 8 || t.length === 11), "invalid field count for transaction type: 1", "data", H(r));
  const e = {
    type: 1,
    chainId: yt(t[0], "chainId"),
    nonce: la(t[1], "nonce"),
    gasPrice: yt(t[2], "gasPrice"),
    gasLimit: yt(t[3], "gasLimit"),
    to: yo(t[4]),
    value: yt(t[5], "value"),
    data: H(t[6]),
    accessList: sl(t[7], "accessList")
  };
  return t.length === 8 || al(e, t.slice(8)), e;
}
function Jm(r, t) {
  const e = [
    ct(r.chainId, "chainId"),
    ct(r.nonce, "nonce"),
    ct(r.gasPrice || 0, "gasPrice"),
    ct(r.gasLimit, "gasLimit"),
    r.to || "0x",
    ct(r.value, "value"),
    r.data,
    il(r.accessList || [])
  ];
  return t && (e.push(ct(t.yParity, "recoveryParam")), e.push(xt(t.r)), e.push(xt(t.s))), ut(["0x01", qn(e)]);
}
function Km(r) {
  let t = ho(q(r).slice(1)), e = "3", n = null;
  if (t.length === 4 && Array.isArray(t[0])) {
    e = "3 (network format)";
    const i = t[1], a = t[2], o = t[3];
    A(Array.isArray(i), "invalid network format: blobs not an array", "fields[1]", i), A(Array.isArray(a), "invalid network format: commitments not an array", "fields[2]", a), A(Array.isArray(o), "invalid network format: proofs not an array", "fields[3]", o), A(i.length === a.length, "invalid network format: blobs/commitments length mismatch", "fields", t), A(i.length === o.length, "invalid network format: blobs/proofs length mismatch", "fields", t), n = [];
    for (let c = 0; c < t[1].length; c++)
      n.push({
        data: i[c],
        commitment: a[c],
        proof: o[c]
      });
    t = t[0];
  }
  A(Array.isArray(t) && (t.length === 11 || t.length === 14), `invalid field count for transaction type: ${e}`, "data", H(r));
  const s = {
    type: 3,
    chainId: yt(t[0], "chainId"),
    nonce: la(t[1], "nonce"),
    maxPriorityFeePerGas: yt(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: yt(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: yt(t[4], "gasLimit"),
    to: yo(t[5]),
    value: yt(t[6], "value"),
    data: H(t[7]),
    accessList: sl(t[8], "accessList"),
    maxFeePerBlobGas: yt(t[9], "maxFeePerBlobGas"),
    blobVersionedHashes: t[10]
  };
  n && (s.blobs = n), A(s.to != null, `invalid address for transaction type: ${e}`, "data", r), A(Array.isArray(s.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", r);
  for (let i = 0; i < s.blobVersionedHashes.length; i++)
    A(ot(s.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", r);
  return t.length === 11 || al(s, t.slice(11)), s;
}
function qm(r, t, e) {
  const n = [
    ct(r.chainId, "chainId"),
    ct(r.nonce, "nonce"),
    ct(r.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    ct(r.maxFeePerGas || 0, "maxFeePerGas"),
    ct(r.gasLimit, "gasLimit"),
    r.to || gi,
    ct(r.value, "value"),
    r.data,
    il(r.accessList || []),
    ct(r.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
    Gm(r.blobVersionedHashes || [], "blobVersionedHashes")
  ];
  return t && (n.push(ct(t.yParity, "yParity")), n.push(xt(t.r)), n.push(xt(t.s)), e) ? ut([
    "0x03",
    qn([
      n,
      e.map((s) => s.data),
      e.map((s) => s.commitment),
      e.map((s) => s.proof)
    ])
  ]) : ut(["0x03", qn(n)]);
}
var Ge, Us, Ds, Ls, Fs, Ms, Hs, Gs, Vs, _s, js, Qs, Bn, Gr, hr, Vr, zs, ka;
const ir = class ir {
  /**
   *  Creates a new Transaction with default values.
   */
  constructor() {
    x(this, zs);
    x(this, Ge);
    x(this, Us);
    x(this, Ds);
    x(this, Ls);
    x(this, Fs);
    x(this, Ms);
    x(this, Hs);
    x(this, Gs);
    x(this, Vs);
    x(this, _s);
    x(this, js);
    x(this, Qs);
    x(this, Bn);
    x(this, Gr);
    x(this, hr);
    x(this, Vr);
    p(this, Ge, null), p(this, Us, null), p(this, Ls, 0), p(this, Fs, Tt), p(this, Ms, null), p(this, Hs, null), p(this, Gs, null), p(this, Ds, "0x"), p(this, Vs, Tt), p(this, _s, Tt), p(this, js, null), p(this, Qs, null), p(this, Bn, null), p(this, Gr, null), p(this, Vr, null), p(this, hr, null);
  }
  /**
   *  The transaction type.
   *
   *  If null, the type will be automatically inferred based on
   *  explicit properties.
   */
  get type() {
    return d(this, Ge);
  }
  set type(t) {
    switch (t) {
      case null:
        p(this, Ge, null);
        break;
      case 0:
      case "legacy":
        p(this, Ge, 0);
        break;
      case 1:
      case "berlin":
      case "eip-2930":
        p(this, Ge, 1);
        break;
      case 2:
      case "london":
      case "eip-1559":
        p(this, Ge, 2);
        break;
      case 3:
      case "cancun":
      case "eip-4844":
        p(this, Ge, 3);
        break;
      default:
        A(!1, "unsupported transaction type", "type", t);
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
    const t = d(this, Us);
    return t == null && this.type === 3 ? gi : t;
  }
  set to(t) {
    p(this, Us, t == null ? null : nt(t));
  }
  /**
   *  The transaction nonce.
   */
  get nonce() {
    return d(this, Ls);
  }
  set nonce(t) {
    p(this, Ls, W(t, "value"));
  }
  /**
   *  The gas limit.
   */
  get gasLimit() {
    return d(this, Fs);
  }
  set gasLimit(t) {
    p(this, Fs, G(t));
  }
  /**
   *  The gas price.
   *
   *  On legacy networks this defines the fee that will be paid. On
   *  EIP-1559 networks, this should be ``null``.
   */
  get gasPrice() {
    const t = d(this, Ms);
    return t == null && (this.type === 0 || this.type === 1) ? Tt : t;
  }
  set gasPrice(t) {
    p(this, Ms, t == null ? null : G(t, "gasPrice"));
  }
  /**
   *  The maximum priority fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxPriorityFeePerGas() {
    return d(this, Hs) ?? (this.type === 2 || this.type === 3 ? Tt : null);
  }
  set maxPriorityFeePerGas(t) {
    p(this, Hs, t == null ? null : G(t, "maxPriorityFeePerGas"));
  }
  /**
   *  The maximum total fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxFeePerGas() {
    return d(this, Gs) ?? (this.type === 2 || this.type === 3 ? Tt : null);
  }
  set maxFeePerGas(t) {
    p(this, Gs, t == null ? null : G(t, "maxFeePerGas"));
  }
  /**
   *  The transaction data. For ``init`` transactions this is the
   *  deployment code.
   */
  get data() {
    return d(this, Ds);
  }
  set data(t) {
    p(this, Ds, H(t));
  }
  /**
   *  The amount of ether (in wei) to send in this transactions.
   */
  get value() {
    return d(this, Vs);
  }
  set value(t) {
    p(this, Vs, G(t, "value"));
  }
  /**
   *  The chain ID this transaction is valid on.
   */
  get chainId() {
    return d(this, _s);
  }
  set chainId(t) {
    p(this, _s, G(t));
  }
  /**
   *  If signed, the signature for this transaction.
   */
  get signature() {
    return d(this, js) || null;
  }
  set signature(t) {
    p(this, js, t == null ? null : Ae.from(t));
  }
  /**
   *  The access list.
   *
   *  An access list permits discounted (but pre-paid) access to
   *  bytecode and state variable access within contract execution.
   */
  get accessList() {
    return (d(this, Qs) || null) ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(t) {
    p(this, Qs, t == null ? null : ns(t));
  }
  /**
   *  The max fee per blob gas for Cancun transactions.
   */
  get maxFeePerBlobGas() {
    const t = d(this, Bn);
    return t == null && this.type === 3 ? Tt : t;
  }
  set maxFeePerBlobGas(t) {
    p(this, Bn, t == null ? null : G(t, "maxFeePerBlobGas"));
  }
  /**
   *  The BLOb versioned hashes for Cancun transactions.
   */
  get blobVersionedHashes() {
    let t = d(this, Gr);
    return t == null && this.type === 3 ? [] : t;
  }
  set blobVersionedHashes(t) {
    if (t != null) {
      A(Array.isArray(t), "blobVersionedHashes must be an Array", "value", t), t = t.slice();
      for (let e = 0; e < t.length; e++)
        A(ot(t[e], 32), "invalid blobVersionedHash", `value[${e}]`, t[e]);
    }
    p(this, Gr, t);
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
    return d(this, Vr) == null ? null : d(this, Vr).map((t) => Object.assign({}, t));
  }
  set blobs(t) {
    if (t == null) {
      p(this, Vr, null);
      return;
    }
    const e = [], n = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if (Qc(i)) {
        R(d(this, hr), "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
          operation: "set blobs()"
        });
        let a = q(i);
        if (A(a.length <= Lo, "blob is too large", `blobs[${s}]`, i), a.length !== Lo) {
          const l = new Uint8Array(Lo);
          l.set(a), a = l;
        }
        const o = d(this, hr).blobToKzgCommitment(a), c = H(d(this, hr).computeBlobKzgProof(a, o));
        e.push({
          data: H(a),
          commitment: H(o),
          proof: c
        }), n.push(hu(1, o));
      } else {
        const a = H(i.commitment);
        e.push({
          data: H(i.data),
          commitment: a,
          proof: H(i.proof)
        }), n.push(hu(1, a));
      }
    }
    p(this, Vr, e), p(this, Gr, n);
  }
  get kzg() {
    return d(this, hr);
  }
  set kzg(t) {
    p(this, hr, t);
  }
  /**
   *  The transaction hash, if signed. Otherwise, ``null``.
   */
  get hash() {
    return this.signature == null ? null : ft(B(this, zs, ka).call(this, !0, !1));
  }
  /**
   *  The pre-image hash of this transaction.
   *
   *  This is the digest that a [[Signer]] must sign to authorize
   *  this transaction.
   */
  get unsignedHash() {
    return ft(this.unsignedSerialized);
  }
  /**
   *  The sending address, if signed. Otherwise, ``null``.
   */
  get from() {
    return this.signature == null ? null : wd(this.unsignedHash, this.signature);
  }
  /**
   *  The public key of the sender, if signed. Otherwise, ``null``.
   */
  get fromPublicKey() {
    return this.signature == null ? null : Vi.recoverPublicKey(this.unsignedHash, this.signature);
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
    return B(this, zs, ka).call(this, !0, !0);
  }
  /**
   *  The transaction pre-image.
   *
   *  The hash of this is the digest which needs to be signed to
   *  authorize this transaction.
   */
  get unsignedSerialized() {
    return B(this, zs, ka).call(this, !1, !1);
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
    const t = this.gasPrice != null, e = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, n = this.accessList != null, s = d(this, Bn) != null || d(this, Gr);
    this.maxFeePerGas != null && this.maxPriorityFeePerGas != null && R(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this }), R(!e || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this }), R(this.type !== 0 || !n, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
    const i = [];
    return this.type != null ? i.push(this.type) : e ? i.push(2) : t ? (i.push(1), n || i.push(0)) : n ? (i.push(1), i.push(2)) : (s && this.to || (i.push(0), i.push(1), i.push(2)), i.push(3)), i.sort(), i;
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
    return ir.from(this);
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
      return new ir();
    if (typeof t == "string") {
      const n = q(t);
      if (n[0] >= 127)
        return ir.from(Vm(n));
      switch (n[0]) {
        case 1:
          return ir.from(zm(n));
        case 2:
          return ir.from(jm(n));
        case 3:
          return ir.from(Km(n));
      }
      R(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const e = new ir();
    return t.type != null && (e.type = t.type), t.to != null && (e.to = t.to), t.nonce != null && (e.nonce = t.nonce), t.gasLimit != null && (e.gasLimit = t.gasLimit), t.gasPrice != null && (e.gasPrice = t.gasPrice), t.maxPriorityFeePerGas != null && (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas), t.maxFeePerGas != null && (e.maxFeePerGas = t.maxFeePerGas), t.maxFeePerBlobGas != null && (e.maxFeePerBlobGas = t.maxFeePerBlobGas), t.data != null && (e.data = t.data), t.value != null && (e.value = t.value), t.chainId != null && (e.chainId = t.chainId), t.signature != null && (e.signature = Ae.from(t.signature)), t.accessList != null && (e.accessList = t.accessList), t.blobVersionedHashes != null && (e.blobVersionedHashes = t.blobVersionedHashes), t.kzg != null && (e.kzg = t.kzg), t.blobs != null && (e.blobs = t.blobs), t.hash != null && (A(e.isSigned(), "unsigned transaction cannot define '.hash'", "tx", t), A(e.hash === t.hash, "hash mismatch", "tx", t)), t.from != null && (A(e.isSigned(), "unsigned transaction cannot define '.from'", "tx", t), A(e.from.toLowerCase() === (t.from || "").toLowerCase(), "from mismatch", "tx", t)), e;
  }
};
Ge = new WeakMap(), Us = new WeakMap(), Ds = new WeakMap(), Ls = new WeakMap(), Fs = new WeakMap(), Ms = new WeakMap(), Hs = new WeakMap(), Gs = new WeakMap(), Vs = new WeakMap(), _s = new WeakMap(), js = new WeakMap(), Qs = new WeakMap(), Bn = new WeakMap(), Gr = new WeakMap(), hr = new WeakMap(), Vr = new WeakMap(), zs = new WeakSet(), ka = function(t, e) {
  R(!t || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
  const n = t ? this.signature : null;
  switch (this.inferType()) {
    case 0:
      return _m(this, n);
    case 1:
      return Jm(this, n);
    case 2:
      return Qm(this, n);
    case 3:
      return qm(this, n, e ? this.blobs : null);
  }
  R(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
};
let Wa = ir;
const Wm = new RegExp("^bytes([0-9]+)$"), Zm = new RegExp("^(u?int)([0-9]*)$"), Ym = new RegExp("^(.*)\\[([0-9]*)\\]$");
function Ad(r, t, e) {
  switch (r) {
    case "address":
      return q(e ? Ze(t, 32) : nt(t));
    case "string":
      return Se(t);
    case "bytes":
      return q(t);
    case "bool":
      return t = t ? "0x01" : "0x00", q(e ? Ze(t, 32) : t);
  }
  let n = r.match(Zm);
  if (n) {
    let s = n[1] === "int", i = parseInt(n[2] || "256");
    return A((!n[2] || n[2] === String(i)) && i % 8 === 0 && i !== 0 && i <= 256, "invalid number type", "type", r), e && (i = 256), s && (t = Jc(t, i)), q(Ze(xt(t), i / 8));
  }
  if (n = r.match(Wm), n) {
    const s = parseInt(n[1]);
    return A(String(s) === n[1] && s !== 0 && s <= 32, "invalid bytes type", "type", r), A(_n(t) === s, `invalid value for ${r}`, "value", t), e ? q(zc(t, 32)) : t;
  }
  if (n = r.match(Ym), n && Array.isArray(t)) {
    const s = n[1], i = parseInt(n[2] || String(t.length));
    A(i === t.length, `invalid array length for ${r}`, "value", t);
    const a = [];
    return t.forEach(function(o) {
      a.push(Ad(s, o, !0));
    }), q(ut(a));
  }
  A(!1, "invalid type", "type", r);
}
function Xm(r, t) {
  A(r.length === t.length, "wrong number of values; expected ${ types.length }", "values", t);
  const e = [];
  return r.forEach(function(n, s) {
    e.push(Ad(n, t[s]));
  }), H(ut(e));
}
function $m(r, t) {
  return ft(Xm(r, t));
}
const bd = new Uint8Array(32);
bd.fill(0);
const ty = BigInt(-1), Ed = BigInt(0), vd = BigInt(1), ey = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function ry(r) {
  const t = q(r), e = t.length % 32;
  return e ? ut([t, bd.slice(e)]) : H(t);
}
const ny = en(vd, 32), sy = en(Ed, 32), du = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, Fo = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function fu(r) {
  return function(t) {
    return A(typeof t == "string", `invalid domain value for ${JSON.stringify(r)}`, `domain.${r}`, t), t;
  };
}
const iy = {
  name: fu("name"),
  version: fu("version"),
  chainId: function(r) {
    const t = G(r, "domain.chainId");
    return A(t >= 0, "invalid chain ID", "domain.chainId", r), Number.isSafeInteger(t) ? Number(t) : ps(t);
  },
  verifyingContract: function(r) {
    try {
      return nt(r).toLowerCase();
    } catch {
    }
    A(!1, 'invalid domain value "verifyingContract"', "domain.verifyingContract", r);
  },
  salt: function(r) {
    const t = q(r, "domain.salt");
    return A(t.length === 32, 'invalid domain value "salt"', "domain.salt", r), H(t);
  }
};
function Mo(r) {
  {
    const t = r.match(/^(u?)int(\d+)$/);
    if (t) {
      const e = t[1] === "", n = parseInt(t[2]);
      A(n % 8 === 0 && n !== 0 && n <= 256 && t[2] === String(n), "invalid numeric width", "type", r);
      const s = yn(ey, e ? n - 1 : n), i = e ? (s + vd) * ty : Ed;
      return function(a) {
        const o = G(a, "value");
        return A(o >= i && o <= s, `value out-of-bounds for ${r}`, "value", o), en(e ? Jc(o, 256) : o, 32);
      };
    }
  }
  {
    const t = r.match(/^bytes(\d+)$/);
    if (t) {
      const e = parseInt(t[1]);
      return A(e !== 0 && e <= 32 && t[1] === String(e), "invalid bytes width", "type", r), function(n) {
        const s = q(n);
        return A(s.length === e, `invalid length for ${r}`, "value", n), ry(n);
      };
    }
  }
  switch (r) {
    case "address":
      return function(t) {
        return Ze(nt(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? ny : sy;
      };
    case "bytes":
      return function(t) {
        return ft(t);
      };
    case "string":
      return function(t) {
        return Wn(t);
      };
  }
  return null;
}
function pu(r, t) {
  return `${r}(${t.map(({ name: e, type: n }) => n + " " + e).join(",")})`;
}
function va(r) {
  const t = r.match(/^([^\x5b]*)((\x5b\d*\x5d)*)(\x5b(\d*)\x5d)$/);
  return t ? {
    base: t[1],
    index: t[2] + t[4],
    array: {
      base: t[1],
      prefix: t[1] + t[2],
      count: t[5] ? parseInt(t[5]) : -1
    }
  } : { base: r };
}
var Xi, dr, Js, no, xd;
const ue = class ue {
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   *
   *  This performs all necessary checking that types are valid and
   *  do not violate the [[link-eip-712]] structural constraints as
   *  well as computes the [[primaryType]].
   */
  constructor(t) {
    x(this, no);
    /**
     *  The primary type for the structured [[types]].
     *
     *  This is derived automatically from the [[types]], since no
     *  recursion is possible, once the DAG for the types is consturcted
     *  internally, the primary type must be the only remaining type with
     *  no parent nodes.
     */
    b(this, "primaryType");
    x(this, Xi);
    x(this, dr);
    x(this, Js);
    p(this, dr, /* @__PURE__ */ new Map()), p(this, Js, /* @__PURE__ */ new Map());
    const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = {};
    Object.keys(t).forEach((c) => {
      i[c] = t[c].map(({ name: l, type: h }) => {
        let { base: u, index: f } = va(h);
        return u === "int" && !t.int && (u = "int256"), u === "uint" && !t.uint && (u = "uint256"), { name: l, type: u + (f || "") };
      }), e.set(c, /* @__PURE__ */ new Set()), n.set(c, []), s.set(c, /* @__PURE__ */ new Set());
    }), p(this, Xi, JSON.stringify(i));
    for (const c in i) {
      const l = /* @__PURE__ */ new Set();
      for (const h of i[c]) {
        A(!l.has(h.name), `duplicate variable name ${JSON.stringify(h.name)} in ${JSON.stringify(c)}`, "types", t), l.add(h.name);
        const u = va(h.type).base;
        A(u !== c, `circular type reference to ${JSON.stringify(u)}`, "types", t), !Mo(u) && (A(n.has(u), `unknown type ${JSON.stringify(u)}`, "types", t), n.get(u).push(c), e.get(c).add(u));
      }
    }
    const a = Array.from(n.keys()).filter((c) => n.get(c).length === 0);
    A(a.length !== 0, "missing primary type", "types", t), A(a.length === 1, `ambiguous primary types or unused types: ${a.map((c) => JSON.stringify(c)).join(", ")}`, "types", t), Q(this, { primaryType: a[0] });
    function o(c, l) {
      A(!l.has(c), `circular type reference to ${JSON.stringify(c)}`, "types", t), l.add(c);
      for (const h of e.get(c))
        if (n.has(h)) {
          o(h, l);
          for (const u of l)
            s.get(u).add(h);
        }
      l.delete(c);
    }
    o(this.primaryType, /* @__PURE__ */ new Set());
    for (const [c, l] of s) {
      const h = Array.from(l);
      h.sort(), d(this, dr).set(c, pu(c, i[c]) + h.map((u) => pu(u, i[u])).join(""));
    }
  }
  /**
   *  The types.
   */
  get types() {
    return JSON.parse(d(this, Xi));
  }
  /**
   *  Returnthe encoder for the specific %%type%%.
   */
  getEncoder(t) {
    let e = d(this, Js).get(t);
    return e || (e = B(this, no, xd).call(this, t), d(this, Js).set(t, e)), e;
  }
  /**
   *  Return the full type for %%name%%.
   */
  encodeType(t) {
    const e = d(this, dr).get(t);
    return A(e, `unknown type: ${JSON.stringify(t)}`, "name", t), e;
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
    return ft(this.encodeData(t, e));
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
  _visit(t, e, n) {
    if (Mo(t))
      return n(t, e);
    const s = va(t).array;
    if (s)
      return A(s.count === -1 || s.count === e.length, `array length mismatch; expected length ${s.count}`, "value", e), e.map((a) => this._visit(s.prefix, a, n));
    const i = this.types[t];
    if (i)
      return i.reduce((a, { name: o, type: c }) => (a[o] = this._visit(c, e[o], n), a), {});
    A(!1, `unknown type: ${t}`, "type", t);
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
    return new ue(t);
  }
  /**
   *  Return the primary type for %%types%%.
   */
  static getPrimaryType(t) {
    return ue.from(t).primaryType;
  }
  /**
   *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
   */
  static hashStruct(t, e, n) {
    return ue.from(e).hashStruct(t, n);
  }
  /**
   *  Return the domain hash for %%domain%%.
   */
  static hashDomain(t) {
    const e = [];
    for (const n in t) {
      if (t[n] == null)
        continue;
      const s = du[n];
      A(s, `invalid typed-data domain key: ${JSON.stringify(n)}`, "domain", t), e.push({ name: n, type: s });
    }
    return e.sort((n, s) => Fo.indexOf(n.name) - Fo.indexOf(s.name)), ue.hashStruct("EIP712Domain", { EIP712Domain: e }, t);
  }
  /**
   *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static encode(t, e, n) {
    return ut([
      "0x1901",
      ue.hashDomain(t),
      ue.from(e).hash(n)
    ]);
  }
  /**
   *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static hash(t, e, n) {
    return ft(ue.encode(t, e, n));
  }
  // Replaces all address types with ENS names with their looked up address
  /**
   * Resolves to the value from resolving all addresses in %%value%% for
   * %%types%% and the %%domain%%.
   */
  static async resolveNames(t, e, n, s) {
    t = Object.assign({}, t);
    for (const o in t)
      t[o] == null && delete t[o];
    const i = {};
    t.verifyingContract && !ot(t.verifyingContract, 20) && (i[t.verifyingContract] = "0x");
    const a = ue.from(e);
    a.visit(n, (o, c) => (o === "address" && !ot(c, 20) && (i[c] = "0x"), c));
    for (const o in i)
      i[o] = await s(o);
    return t.verifyingContract && i[t.verifyingContract] && (t.verifyingContract = i[t.verifyingContract]), n = a.visit(n, (o, c) => o === "address" && i[c] ? i[c] : c), { domain: t, value: n };
  }
  /**
   *  Returns the JSON-encoded payload expected by nodes which implement
   *  the JSON-RPC [[link-eip-712]] method.
   */
  static getPayload(t, e, n) {
    ue.hashDomain(t);
    const s = {}, i = [];
    Fo.forEach((c) => {
      const l = t[c];
      l != null && (s[c] = iy[c](l), i.push({ name: c, type: du[c] }));
    });
    const a = ue.from(e);
    e = a.types;
    const o = Object.assign({}, e);
    return A(o.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", e), o.EIP712Domain = i, a.encode(n), {
      types: o,
      domain: s,
      primaryType: a.primaryType,
      message: a.visit(n, (c, l) => {
        if (c.match(/^bytes(\d*)/))
          return H(q(l));
        if (c.match(/^u?int/))
          return G(l).toString();
        switch (c) {
          case "address":
            return l.toLowerCase();
          case "bool":
            return !!l;
          case "string":
            return A(typeof l == "string", "invalid string", "value", l), l;
        }
        A(!1, "unsupported type", "type", c);
      })
    };
  }
};
Xi = new WeakMap(), dr = new WeakMap(), Js = new WeakMap(), no = new WeakSet(), xd = function(t) {
  {
    const s = Mo(t);
    if (s)
      return s;
  }
  const e = va(t).array;
  if (e) {
    const s = e.prefix, i = this.getEncoder(s);
    return (a) => {
      A(e.count === -1 || e.count === a.length, `array length mismatch; expected length ${e.count}`, "value", a);
      let o = a.map(i);
      return d(this, dr).has(s) && (o = o.map(ft)), ft(ut(o));
    };
  }
  const n = this.types[t];
  if (n) {
    const s = Wn(d(this, dr).get(t));
    return (i) => {
      const a = n.map(({ name: o, type: c }) => {
        const l = this.getEncoder(c)(i[o]);
        return d(this, dr).has(c) ? ft(l) : l;
      });
      return a.unshift(s), ut(a);
    };
  }
  A(!1, `unknown type: ${t}`, "type", t);
};
let Za = ue;
function Kt(r) {
  const t = /* @__PURE__ */ new Set();
  return r.forEach((e) => t.add(e)), Object.freeze(t);
}
const ay = "external public payable override", oy = Kt(ay.split(" ")), Nd = "constant external internal payable private public pure view override", cy = Kt(Nd.split(" ")), Id = "constructor error event fallback function receive struct", Td = Kt(Id.split(" ")), Cd = "calldata memory storage payable indexed", ly = Kt(Cd.split(" ")), uy = "tuple returns", hy = [Id, Cd, uy, Nd].join(" "), dy = Kt(hy.split(" ")), fy = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, py = new RegExp("^(\\s*)"), gy = new RegExp("^([0-9]+)"), my = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), Od = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), Pd = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var Pt, Oe, $i, vc;
const so = class so {
  constructor(t) {
    x(this, $i);
    x(this, Pt);
    x(this, Oe);
    p(this, Pt, 0), p(this, Oe, t.slice());
  }
  get offset() {
    return d(this, Pt);
  }
  get length() {
    return d(this, Oe).length - d(this, Pt);
  }
  clone() {
    return new so(d(this, Oe));
  }
  reset() {
    p(this, Pt, 0);
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
    const e = B(this, $i, vc).call(this, d(this, Pt) + 1, t.match + 1);
    return p(this, Pt, t.match + 1), e;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const e = [];
    for (; d(this, Pt) < t.match - 1; ) {
      const n = this.peek().linkNext;
      e.push(B(this, $i, vc).call(this, d(this, Pt) + 1, n)), p(this, Pt, n);
    }
    return p(this, Pt, t.match + 1), e;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (d(this, Pt) >= d(this, Oe).length)
      throw new Error("out-of-bounds");
    return d(this, Oe)[d(this, Pt)];
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
    return Ni(this, Pt)._++, t;
  }
  toString() {
    const t = [];
    for (let e = d(this, Pt); e < d(this, Oe).length; e++) {
      const n = d(this, Oe)[e];
      t.push(`${n.type}:${n.text}`);
    }
    return `<TokenString ${t.join(" ")}>`;
  }
};
Pt = new WeakMap(), Oe = new WeakMap(), $i = new WeakSet(), vc = function(t = 0, e = 0) {
  return new so(d(this, Oe).slice(t, e).map((n) => Object.freeze(Object.assign({}, n, {
    match: n.match - t,
    linkBack: n.linkBack - t,
    linkNext: n.linkNext - t
  }))));
};
let Be = so;
function sn(r) {
  const t = [], e = (a) => {
    const o = i < r.length ? JSON.stringify(r[i]) : "$EOI";
    throw new Error(`invalid token ${o} at ${i}: ${a}`);
  };
  let n = [], s = [], i = 0;
  for (; i < r.length; ) {
    let a = r.substring(i), o = a.match(py);
    o && (i += o[1].length, a = r.substring(i));
    const c = { depth: n.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    t.push(c);
    let l = fy[a[0]] || "";
    if (l) {
      if (c.type = l, c.text = a[0], i++, l === "OPEN_PAREN")
        n.push(t.length - 1), s.push(t.length - 1);
      else if (l == "CLOSE_PAREN")
        n.length === 0 && e("no matching open bracket"), c.match = n.pop(), t[c.match].match = t.length - 1, c.depth--, c.linkBack = s.pop(), t[c.linkBack].linkNext = t.length - 1;
      else if (l === "COMMA")
        c.linkBack = s.pop(), t[c.linkBack].linkNext = t.length - 1, s.push(t.length - 1);
      else if (l === "OPEN_BRACKET")
        c.type = "BRACKET";
      else if (l === "CLOSE_BRACKET") {
        let h = t.pop().text;
        if (t.length > 0 && t[t.length - 1].type === "NUMBER") {
          const u = t.pop().text;
          h = u + h, t[t.length - 1].value = W(u);
        }
        if (t.length === 0 || t[t.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        t[t.length - 1].text += h;
      }
      continue;
    }
    if (o = a.match(my), o) {
      if (c.text = o[1], i += c.text.length, dy.has(c.text)) {
        c.type = "KEYWORD";
        continue;
      }
      if (c.text.match(Pd)) {
        c.type = "TYPE";
        continue;
      }
      c.type = "ID";
      continue;
    }
    if (o = a.match(gy), o) {
      c.text = o[1], c.type = "NUMBER", i += c.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${i}`);
  }
  return new Be(t.map((a) => Object.freeze(a)));
}
function gu(r, t) {
  let e = [];
  for (const n in t.keys())
    r.has(n) && e.push(n);
  if (e.length > 1)
    throw new Error(`conflicting types: ${e.join(", ")}`);
}
function wo(r, t) {
  if (t.peekKeyword(Td)) {
    const e = t.pop().text;
    if (e !== r)
      throw new Error(`expected ${r}, got ${e}`);
  }
  return t.popType("ID");
}
function Ir(r, t) {
  const e = /* @__PURE__ */ new Set();
  for (; ; ) {
    const n = r.peekType("KEYWORD");
    if (n == null || t && !t.has(n))
      break;
    if (r.pop(), e.has(n))
      throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);
    e.add(n);
  }
  return Object.freeze(e);
}
function kd(r) {
  let t = Ir(r, cy);
  return gu(t, Kt("constant payable nonpayable".split(" "))), gu(t, Kt("pure view payable nonpayable".split(" "))), t.has("view") ? "view" : t.has("pure") ? "pure" : t.has("payable") ? "payable" : t.has("nonpayable") ? "nonpayable" : t.has("constant") ? "view" : "nonpayable";
}
function xr(r, t) {
  return r.popParams().map((e) => St.from(e, t));
}
function Rd(r) {
  if (r.peekType("AT")) {
    if (r.pop(), r.peekType("NUMBER"))
      return G(r.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function Zn(r) {
  if (r.length)
    throw new Error(`unexpected tokens at offset ${r.offset}: ${r.toString()}`);
}
const yy = new RegExp(/^(.*)\[([0-9]*)\]$/);
function mu(r) {
  const t = r.match(Pd);
  if (A(t, "invalid type", "type", r), r === "uint")
    return "uint256";
  if (r === "int")
    return "int256";
  if (t[2]) {
    const e = parseInt(t[2]);
    A(e !== 0 && e <= 32, "invalid bytes length", "type", r);
  } else if (t[3]) {
    const e = parseInt(t[3]);
    A(e !== 0 && e <= 256 && e % 8 === 0, "invalid numeric width", "type", r);
  }
  return r;
}
const lt = {}, Xt = Symbol.for("_ethers_internal"), yu = "_ParamTypeInternal", wu = "_ErrorInternal", Au = "_EventInternal", bu = "_ConstructorInternal", Eu = "_FallbackInternal", vu = "_FunctionInternal", xu = "_StructInternal";
var Ks, Ra;
const he = class he {
  /**
   *  @private
   */
  constructor(t, e, n, s, i, a, o, c) {
    x(this, Ks);
    /**
     *  The local name of the parameter (or ``""`` if unbound)
     */
    b(this, "name");
    /**
     *  The fully qualified type (e.g. ``"address"``, ``"tuple(address)"``,
     *  ``"uint256[3][]"``)
     */
    b(this, "type");
    /**
     *  The base type (e.g. ``"address"``, ``"tuple"``, ``"array"``)
     */
    b(this, "baseType");
    /**
     *  True if the parameters is indexed.
     *
     *  For non-indexable types this is ``null``.
     */
    b(this, "indexed");
    /**
     *  The components for the tuple.
     *
     *  For non-tuple types this is ``null``.
     */
    b(this, "components");
    /**
     *  The array length, or ``-1`` for dynamic-lengthed arrays.
     *
     *  For non-array types this is ``null``.
     */
    b(this, "arrayLength");
    /**
     *  The type of each child in the array.
     *
     *  For non-array types this is ``null``.
     */
    b(this, "arrayChildren");
    if (oa(t, lt, "ParamType"), Object.defineProperty(this, Xt, { value: yu }), a && (a = Object.freeze(a.slice())), s === "array") {
      if (o == null || c == null)
        throw new Error("");
    } else if (o != null || c != null)
      throw new Error("");
    if (s === "tuple") {
      if (a == null)
        throw new Error("");
    } else if (a != null)
      throw new Error("");
    Q(this, {
      name: e,
      type: n,
      baseType: s,
      indexed: i,
      components: a,
      arrayLength: o,
      arrayChildren: c
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
      const n = this.name || "";
      if (this.isArray()) {
        const i = JSON.parse(this.arrayChildren.format("json"));
        return i.name = n, i.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(i);
      }
      const s = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: n
      };
      return typeof this.indexed == "boolean" && (s.indexed = this.indexed), this.isTuple() && (s.components = this.components.map((i) => JSON.parse(i.format(t)))), JSON.stringify(s);
    }
    let e = "";
    return this.isArray() ? (e += this.arrayChildren.format(t), e += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? e += "(" + this.components.map((n) => n.format(t)).join(t === "full" ? ", " : ",") + ")" : e += this.type, t !== "sighash" && (this.indexed === !0 && (e += " indexed"), t === "full" && this.name && (e += " " + this.name)), e;
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
      const n = this;
      return t.map((s) => n.arrayChildren.walk(s, e));
    }
    if (this.isTuple()) {
      if (!Array.isArray(t))
        throw new Error("invalid tuple value");
      if (t.length !== this.components.length)
        throw new Error("array is wrong length");
      const n = this;
      return t.map((s, i) => n.components[i].walk(s, e));
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
    const n = [], s = [t];
    return B(this, Ks, Ra).call(this, n, t, e, (i) => {
      s[0] = i;
    }), n.length && await Promise.all(n), s[0];
  }
  /**
   *  Creates a new **ParamType** for %%obj%%.
   *
   *  If %%allowIndexed%% then the ``indexed`` keyword is permitted,
   *  otherwise the ``indexed`` keyword will throw an error.
   */
  static from(t, e) {
    if (he.isParamType(t))
      return t;
    if (typeof t == "string")
      try {
        return he.from(sn(t), e);
      } catch {
        A(!1, "invalid param type", "obj", t);
      }
    else if (t instanceof Be) {
      let o = "", c = "", l = null;
      Ir(t, Kt(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN") ? (c = "tuple", l = t.popParams().map((m) => he.from(m)), o = `tuple(${l.map((m) => m.format()).join(",")})`) : (o = mu(t.popType("TYPE")), c = o);
      let h = null, u = null;
      for (; t.length && t.peekType("BRACKET"); ) {
        const m = t.pop();
        h = new he(lt, "", o, c, null, l, u, h), u = m.value, o += m.text, c = "array", l = null;
      }
      let f = null;
      if (Ir(t, ly).has("indexed")) {
        if (!e)
          throw new Error("");
        f = !0;
      }
      const y = t.peekType("ID") ? t.pop().text : "";
      if (t.length)
        throw new Error("leftover tokens");
      return new he(lt, y, o, c, f, l, u, h);
    }
    const n = t.name;
    A(!n || typeof n == "string" && n.match(Od), "invalid name", "obj.name", n);
    let s = t.indexed;
    s != null && (A(e, "parameter cannot be indexed", "obj.indexed", t.indexed), s = !!s);
    let i = t.type, a = i.match(yy);
    if (a) {
      const o = parseInt(a[2] || "-1"), c = he.from({
        type: a[1],
        components: t.components
      });
      return new he(lt, n || "", i, "array", s, null, o, c);
    }
    if (i === "tuple" || i.startsWith(
      "tuple("
      /* fix: ) */
    ) || i.startsWith(
      "("
      /* fix: ) */
    )) {
      const o = t.components != null ? t.components.map((c) => he.from(c)) : null;
      return new he(lt, n || "", i, "tuple", s, o, null, null);
    }
    return i = mu(t.type), new he(lt, n || "", i, i, s, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(t) {
    return t && t[Xt] === yu;
  }
};
Ks = new WeakSet(), Ra = function(t, e, n, s) {
  if (this.isArray()) {
    if (!Array.isArray(e))
      throw new Error("invalid array value");
    if (this.arrayLength !== -1 && e.length !== this.arrayLength)
      throw new Error("array is wrong length");
    const a = this.arrayChildren, o = e.slice();
    o.forEach((c, l) => {
      var h;
      B(h = a, Ks, Ra).call(h, t, c, n, (u) => {
        o[l] = u;
      });
    }), s(o);
    return;
  }
  if (this.isTuple()) {
    const a = this.components;
    let o;
    if (Array.isArray(e))
      o = e.slice();
    else {
      if (e == null || typeof e != "object")
        throw new Error("invalid tuple value");
      o = a.map((c) => {
        if (!c.name)
          throw new Error("cannot use object value with unnamed components");
        if (!(c.name in e))
          throw new Error(`missing value for component ${c.name}`);
        return e[c.name];
      });
    }
    if (o.length !== this.components.length)
      throw new Error("array is wrong length");
    o.forEach((c, l) => {
      var h;
      B(h = a[l], Ks, Ra).call(h, t, c, n, (u) => {
        o[l] = u;
      });
    }), s(o);
    return;
  }
  const i = n(this.type, e);
  i.then ? t.push(async function() {
    s(await i);
  }()) : s(i);
};
let St = he;
class Yn {
  /**
   *  @private
   */
  constructor(t, e, n) {
    /**
     *  The type of the fragment.
     */
    b(this, "type");
    /**
     *  The inputs for the fragment.
     */
    b(this, "inputs");
    oa(t, lt, "Fragment"), n = Object.freeze(n.slice()), Q(this, { type: e, inputs: n });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(t) {
    if (typeof t == "string") {
      try {
        Yn.from(JSON.parse(t));
      } catch {
      }
      return Yn.from(sn(t));
    }
    if (t instanceof Be)
      switch (t.peekKeyword(Td)) {
        case "constructor":
          return vr.from(t);
        case "error":
          return Yt.from(t);
        case "event":
          return Ke.from(t);
        case "fallback":
        case "receive":
          return ar.from(t);
        case "function":
          return qe.from(t);
        case "struct":
          return Qn.from(t);
      }
    else if (typeof t == "object") {
      switch (t.type) {
        case "constructor":
          return vr.from(t);
        case "error":
          return Yt.from(t);
        case "event":
          return Ke.from(t);
        case "fallback":
        case "receive":
          return ar.from(t);
        case "function":
          return qe.from(t);
        case "struct":
          return Qn.from(t);
      }
      R(!1, `unsupported type: ${t.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    A(!1, "unsupported frgament object", "obj", t);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(t) {
    return vr.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(t) {
    return Yt.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(t) {
    return Ke.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(t) {
    return qe.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(t) {
    return Qn.isFragment(t);
  }
}
class Ao extends Yn {
  /**
   *  @private
   */
  constructor(e, n, s, i) {
    super(e, n, i);
    /**
     *  The name of the fragment.
     */
    b(this, "name");
    A(typeof s == "string" && s.match(Od), "invalid identifier", "name", s), i = Object.freeze(i.slice()), Q(this, { name: s });
  }
}
function Ji(r, t) {
  return "(" + t.map((e) => e.format(r)).join(r === "full" ? ", " : ",") + ")";
}
class Yt extends Ao {
  /**
   *  @private
   */
  constructor(t, e, n) {
    super(t, "error", e, n), Object.defineProperty(this, Xt, { value: wu });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return Wn(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this fragment as %%format%%.
   */
  format(t) {
    if (t == null && (t = "sighash"), t === "json")
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((n) => JSON.parse(n.format(t)))
      });
    const e = [];
    return t !== "sighash" && e.push("error"), e.push(this.name + Ji(t, this.inputs)), e.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(t) {
    if (Yt.isFragment(t))
      return t;
    if (typeof t == "string")
      return Yt.from(sn(t));
    if (t instanceof Be) {
      const e = wo("error", t), n = xr(t);
      return Zn(t), new Yt(lt, e, n);
    }
    return new Yt(lt, t.name, t.inputs ? t.inputs.map(St.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(t) {
    return t && t[Xt] === wu;
  }
}
class Ke extends Ao {
  /**
   *  @private
   */
  constructor(e, n, s, i) {
    super(e, "event", n, s);
    /**
     *  Whether this event is anonymous.
     */
    b(this, "anonymous");
    Object.defineProperty(this, Xt, { value: Au }), Q(this, { anonymous: i });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return Wn(this.format("sighash"));
  }
  /**
   *  Returns a string representation of this event as %%format%%.
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json")
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((s) => JSON.parse(s.format(e)))
      });
    const n = [];
    return e !== "sighash" && n.push("event"), n.push(this.name + Ji(e, this.inputs)), e !== "sighash" && this.anonymous && n.push("anonymous"), n.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(e, n) {
    return n = (n || []).map((s) => St.from(s)), new Ke(lt, e, n, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(e) {
    if (Ke.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return Ke.from(sn(e));
      } catch {
        A(!1, "invalid event fragment", "obj", e);
      }
    else if (e instanceof Be) {
      const n = wo("event", e), s = xr(e, !0), i = !!Ir(e, Kt(["anonymous"])).has("anonymous");
      return Zn(e), new Ke(lt, n, s, i);
    }
    return new Ke(lt, e.name, e.inputs ? e.inputs.map((n) => St.from(n, !0)) : [], !!e.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(e) {
    return e && e[Xt] === Au;
  }
}
class vr extends Yn {
  /**
   *  @private
   */
  constructor(e, n, s, i, a) {
    super(e, n, s);
    /**
     *  Whether the constructor can receive an endowment.
     */
    b(this, "payable");
    /**
     *  The recommended gas limit for deployment or ``null``.
     */
    b(this, "gas");
    Object.defineProperty(this, Xt, { value: bu }), Q(this, { payable: i, gas: a });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(e) {
    if (R(e != null && e !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), e === "json")
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(e)))
      });
    const n = [`constructor${Ji(e, this.inputs)}`];
    return this.payable && n.push("payable"), this.gas != null && n.push(`@${this.gas.toString()}`), n.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(e) {
    if (vr.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return vr.from(sn(e));
      } catch {
        A(!1, "invalid constuctor fragment", "obj", e);
      }
    else if (e instanceof Be) {
      Ir(e, Kt(["constructor"]));
      const n = xr(e), s = !!Ir(e, oy).has("payable"), i = Rd(e);
      return Zn(e), new vr(lt, "constructor", n, s, i);
    }
    return new vr(lt, "constructor", e.inputs ? e.inputs.map(St.from) : [], !!e.payable, e.gas != null ? e.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(e) {
    return e && e[Xt] === bu;
  }
}
class ar extends Yn {
  constructor(e, n, s) {
    super(e, "fallback", n);
    /**
     *  If the function can be sent value during invocation.
     */
    b(this, "payable");
    Object.defineProperty(this, Xt, { value: Eu }), Q(this, { payable: s });
  }
  /**
   *  Returns a string representation of this fallback as %%format%%.
   */
  format(e) {
    const n = this.inputs.length === 0 ? "receive" : "fallback";
    if (e === "json") {
      const s = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: n, stateMutability: s });
    }
    return `${n}()${this.payable ? " payable" : ""}`;
  }
  /**
   *  Returns a new **FallbackFragment** for %%obj%%.
   */
  static from(e) {
    if (ar.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return ar.from(sn(e));
      } catch {
        A(!1, "invalid fallback fragment", "obj", e);
      }
    else if (e instanceof Be) {
      const n = e.toString(), s = e.peekKeyword(Kt(["fallback", "receive"]));
      if (A(s, "type must be fallback or receive", "obj", n), e.popKeyword(Kt(["fallback", "receive"])) === "receive") {
        const o = xr(e);
        return A(o.length === 0, "receive cannot have arguments", "obj.inputs", o), Ir(e, Kt(["payable"])), Zn(e), new ar(lt, [], !0);
      }
      let i = xr(e);
      i.length ? A(i.length === 1 && i[0].type === "bytes", "invalid fallback inputs", "obj.inputs", i.map((o) => o.format("minimal")).join(", ")) : i = [St.from("bytes")];
      const a = kd(e);
      if (A(a === "nonpayable" || a === "payable", "fallback cannot be constants", "obj.stateMutability", a), Ir(e, Kt(["returns"])).has("returns")) {
        const o = xr(e);
        A(o.length === 1 && o[0].type === "bytes", "invalid fallback outputs", "obj.outputs", o.map((c) => c.format("minimal")).join(", "));
      }
      return Zn(e), new ar(lt, i, a === "payable");
    }
    if (e.type === "receive")
      return new ar(lt, [], !0);
    if (e.type === "fallback") {
      const n = [St.from("bytes")], s = e.stateMutability === "payable";
      return new ar(lt, n, s);
    }
    A(!1, "invalid fallback description", "obj", e);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(e) {
    return e && e[Xt] === Eu;
  }
}
class qe extends Ao {
  /**
   *  @private
   */
  constructor(e, n, s, i, a, o) {
    super(e, "function", n, i);
    /**
     *  If the function is constant (e.g. ``pure`` or ``view`` functions).
     */
    b(this, "constant");
    /**
     *  The returned types for the result of calling this function.
     */
    b(this, "outputs");
    /**
     *  The state mutability (e.g. ``payable``, ``nonpayable``, ``view``
     *  or ``pure``)
     */
    b(this, "stateMutability");
    /**
     *  If the function can be sent value during invocation.
     */
    b(this, "payable");
    /**
     *  The recommended gas limit to send when calling this function.
     */
    b(this, "gas");
    Object.defineProperty(this, Xt, { value: vu }), a = Object.freeze(a.slice()), Q(this, { constant: s === "view" || s === "pure", gas: o, outputs: a, payable: s === "payable", stateMutability: s });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return Wn(this.format("sighash")).substring(0, 10);
  }
  /**
   *  Returns a string representation of this function as %%format%%.
   */
  format(e) {
    if (e == null && (e = "sighash"), e === "json")
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability: this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(e))),
        outputs: this.outputs.map((s) => JSON.parse(s.format(e)))
      });
    const n = [];
    return e !== "sighash" && n.push("function"), n.push(this.name + Ji(e, this.inputs)), e !== "sighash" && (this.stateMutability !== "nonpayable" && n.push(this.stateMutability), this.outputs && this.outputs.length && (n.push("returns"), n.push(Ji(e, this.outputs))), this.gas != null && n.push(`@${this.gas.toString()}`)), n.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(e, n) {
    return n = (n || []).map((s) => St.from(s)), new qe(lt, e, "view", n, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(e) {
    if (qe.isFragment(e))
      return e;
    if (typeof e == "string")
      try {
        return qe.from(sn(e));
      } catch {
        A(!1, "invalid function fragment", "obj", e);
      }
    else if (e instanceof Be) {
      const s = wo("function", e), i = xr(e), a = kd(e);
      let o = [];
      Ir(e, Kt(["returns"])).has("returns") && (o = xr(e));
      const c = Rd(e);
      return Zn(e), new qe(lt, s, a, i, o, c);
    }
    let n = e.stateMutability;
    return n == null && (n = "payable", typeof e.constant == "boolean" ? (n = "view", e.constant || (n = "payable", typeof e.payable == "boolean" && !e.payable && (n = "nonpayable"))) : typeof e.payable == "boolean" && !e.payable && (n = "nonpayable")), new qe(lt, e.name, n, e.inputs ? e.inputs.map(St.from) : [], e.outputs ? e.outputs.map(St.from) : [], e.gas != null ? e.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(e) {
    return e && e[Xt] === vu;
  }
}
class Qn extends Ao {
  /**
   *  @private
   */
  constructor(t, e, n) {
    super(t, "struct", e, n), Object.defineProperty(this, Xt, { value: xu });
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
        return Qn.from(sn(t));
      } catch {
        A(!1, "invalid struct fragment", "obj", t);
      }
    else if (t instanceof Be) {
      const e = wo("struct", t), n = xr(t);
      return Zn(t), new Qn(lt, e, n);
    }
    return new Qn(lt, t.name, t.inputs ? t.inputs.map(St.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(t) {
    return t && t[Xt] === xu;
  }
}
const Ue = /* @__PURE__ */ new Map();
Ue.set(0, "GENERIC_PANIC");
Ue.set(1, "ASSERT_FALSE");
Ue.set(17, "OVERFLOW");
Ue.set(18, "DIVIDE_BY_ZERO");
Ue.set(33, "ENUM_RANGE_ERROR");
Ue.set(34, "BAD_STORAGE_DATA");
Ue.set(49, "STACK_UNDERFLOW");
Ue.set(50, "ARRAY_RANGE_ERROR");
Ue.set(65, "OUT_OF_MEMORY");
Ue.set(81, "UNINITIALIZED_FUNCTION_CALL");
const wy = new RegExp(/^bytes([0-9]*)$/), Ay = new RegExp(/^(u?int)([0-9]*)$/);
let Ho = null, Nu = 1024;
function by(r, t, e, n) {
  let s = "missing revert data", i = null;
  const a = null;
  let o = null;
  if (e) {
    s = "execution reverted";
    const l = q(e);
    if (e = H(e), l.length === 0)
      s += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (l.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (H(l.slice(0, 4)) === "0x08c379a0")
      try {
        i = n.decode(["string"], l.slice(4))[0], o = {
          signature: "Error(string)",
          name: "Error",
          args: [i]
        }, s += `: ${JSON.stringify(i)}`;
      } catch {
        s += " (could not decode reason; invalid string data)";
      }
    else if (H(l.slice(0, 4)) === "0x4e487b71")
      try {
        const h = Number(n.decode(["uint256"], l.slice(4))[0]);
        o = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [h]
        }, i = `Panic due to ${Ue.get(h) || "UNKNOWN"}(${h})`, s += `: ${i}`;
      } catch {
        s += " (could not decode panic code)";
      }
    else
      s += " (unknown custom error)";
  }
  const c = {
    to: t.to ? nt(t.to) : null,
    data: t.data || "0x"
  };
  return t.from && (c.from = nt(t.from)), ht(s, "CALL_EXCEPTION", {
    action: r,
    data: e,
    reason: i,
    transaction: c,
    invocation: a,
    revert: o
  });
}
var _r, ls;
const io = class io {
  constructor() {
    x(this, _r);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(t) {
    const e = t.map((n) => B(this, _r, ls).call(this, St.from(n)));
    return new Ea(e, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(t, e) {
    sh(e.length, t.length, "types/values length mismatch");
    const n = t.map((a) => B(this, _r, ls).call(this, St.from(a))), s = new Ea(n, "_"), i = new oc();
    return s.encode(i, e), i.data;
  }
  /**
   *  Decode the ABI %%data%% as the %%types%% into values.
   *
   *  If %%loose%% decoding is enabled, then strict padding is
   *  not enforced. Some older versions of Solidity incorrectly
   *  padded event data emitted from ``external`` functions.
   */
  decode(t, e, n) {
    const s = t.map((i) => B(this, _r, ls).call(this, St.from(i)));
    return new Ea(s, "_").decode(new cc(e, n, Nu));
  }
  static _setDefaultMaxInflation(t) {
    A(typeof t == "number" && Number.isInteger(t), "invalid defaultMaxInflation factor", "value", t), Nu = t;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return Ho == null && (Ho = new io()), Ho;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(t, e, n) {
    return by(t, e, n, io.defaultAbiCoder());
  }
};
_r = new WeakSet(), ls = function(t) {
  if (t.isArray())
    return new Hg(B(this, _r, ls).call(this, t.arrayChildren), t.arrayLength, t.name);
  if (t.isTuple())
    return new Ea(t.components.map((n) => B(this, _r, ls).call(this, n)), t.name);
  switch (t.baseType) {
    case "address":
      return new Fg(t.name);
    case "bool":
      return new Gg(t.name);
    case "string":
      return new Wg(t.name);
    case "bytes":
      return new Vg(t.name);
    case "":
      return new Qg(t.name);
  }
  let e = t.type.match(Ay);
  if (e) {
    let n = parseInt(e[2] || "256");
    return A(n !== 0 && n <= 256 && n % 8 === 0, "invalid " + e[1] + " bit length", "param", t), new qg(n / 8, e[1] === "int", t.name);
  }
  if (e = t.type.match(wy), e) {
    let n = parseInt(e[1]);
    return A(n !== 0 && n <= 32, "invalid bytes length", "param", t), new _g(n, t.name);
  }
  A(!1, "invalid type", "type", t.type);
};
let Xn = io;
function xc(r) {
  const t = Se(r);
  if (t.length > 31)
    throw new Error("bytes32 string must be less than 32 bytes");
  return zc(t, 32);
}
class Ey {
  /**
   *  @_ignore:
   */
  constructor(t, e, n) {
    /**
     *  The matching fragment for the ``topic0``.
     */
    b(this, "fragment");
    /**
     *  The name of the Event.
     */
    b(this, "name");
    /**
     *  The full Event signature.
     */
    b(this, "signature");
    /**
     *  The topic hash for the Event.
     */
    b(this, "topic");
    /**
     *  The arguments passed into the Event with ``emit``.
     */
    b(this, "args");
    const s = t.name, i = t.format();
    Q(this, {
      fragment: t,
      name: s,
      signature: i,
      topic: e,
      args: n
    });
  }
}
class vy {
  /**
   *  @_ignore:
   */
  constructor(t, e, n, s) {
    /**
     *  The matching fragment from the transaction ``data``.
     */
    b(this, "fragment");
    /**
     *  The name of the Function from the transaction ``data``.
     */
    b(this, "name");
    /**
     *  The arguments passed to the Function from the transaction ``data``.
     */
    b(this, "args");
    /**
     *  The full Function signature from the transaction ``data``.
     */
    b(this, "signature");
    /**
     *  The selector for the Function from the transaction ``data``.
     */
    b(this, "selector");
    /**
     *  The ``value`` (in wei) from the transaction.
     */
    b(this, "value");
    const i = t.name, a = t.format();
    Q(this, {
      fragment: t,
      name: i,
      args: n,
      signature: a,
      selector: e,
      value: s
    });
  }
}
class xy {
  /**
   *  @_ignore:
   */
  constructor(t, e, n) {
    /**
     *  The matching fragment.
     */
    b(this, "fragment");
    /**
     *  The name of the Error.
     */
    b(this, "name");
    /**
     *  The arguments passed to the Error with ``revert``.
     */
    b(this, "args");
    /**
     *  The full Error signature.
     */
    b(this, "signature");
    /**
     *  The selector for the Error.
     */
    b(this, "selector");
    const s = t.name, i = t.format();
    Q(this, {
      fragment: t,
      name: s,
      args: n,
      signature: i,
      selector: e
    });
  }
}
class Iu {
  /**
   *  @_ignore:
   */
  constructor(t) {
    /**
     *  The ``keccak256`` of the value logged.
     */
    b(this, "hash");
    /**
     *  @_ignore:
     */
    b(this, "_isIndexed");
    Q(this, { hash: t, _isIndexed: !0 });
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
const Tu = {
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
}, Cu = {
  "0x08c379a0": {
    signature: "Error(string)",
    name: "Error",
    inputs: ["string"],
    reason: (r) => `reverted with reason string ${JSON.stringify(r)}`
  },
  "0x4e487b71": {
    signature: "Panic(uint256)",
    name: "Panic",
    inputs: ["uint256"],
    reason: (r) => {
      let t = "unknown panic code";
      return r >= 0 && r <= 255 && Tu[r.toString()] && (t = Tu[r.toString()]), `reverted with panic code 0x${r.toString(16)} (${t})`;
    }
  }
};
var Ve, _e, je, Ut, Ye, Sa, Ba;
const gn = class gn {
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(t) {
    x(this, Ye);
    /**
     *  All the Contract ABI members (i.e. methods, events, errors, etc).
     */
    b(this, "fragments");
    /**
     *  The Contract constructor.
     */
    b(this, "deploy");
    /**
     *  The Fallback method, if any.
     */
    b(this, "fallback");
    /**
     *  If receiving ether is supported.
     */
    b(this, "receive");
    x(this, Ve);
    x(this, _e);
    x(this, je);
    //    #structs: Map<string, StructFragment>;
    x(this, Ut);
    let e = [];
    typeof t == "string" ? e = JSON.parse(t) : e = t, p(this, je, /* @__PURE__ */ new Map()), p(this, Ve, /* @__PURE__ */ new Map()), p(this, _e, /* @__PURE__ */ new Map());
    const n = [];
    for (const a of e)
      try {
        n.push(Yn.from(a));
      } catch (o) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(a)}:`, o.message);
      }
    Q(this, {
      fragments: Object.freeze(n)
    });
    let s = null, i = !1;
    p(this, Ut, this.getAbiCoder()), this.fragments.forEach((a, o) => {
      let c;
      switch (a.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          Q(this, { deploy: a });
          return;
        case "fallback":
          a.inputs.length === 0 ? i = !0 : (A(!s || a.payable !== s.payable, "conflicting fallback fragments", `fragments[${o}]`, a), s = a, i = s.payable);
          return;
        case "function":
          c = d(this, je);
          break;
        case "event":
          c = d(this, _e);
          break;
        case "error":
          c = d(this, Ve);
          break;
        default:
          return;
      }
      const l = a.format();
      c.has(l) || c.set(l, a);
    }), this.deploy || Q(this, {
      deploy: vr.from("constructor()")
    }), Q(this, { fallback: s, receive: i });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(t) {
    const e = t ? "minimal" : "full";
    return this.fragments.map((n) => n.format(e));
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
    return Xn.defaultAbiCoder();
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(t) {
    const e = B(this, Ye, Sa).call(this, t, null, !1);
    return A(e, "no matching function", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(t) {
    return !!B(this, Ye, Sa).call(this, t, null, !1);
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
    return B(this, Ye, Sa).call(this, t, e || null, !0);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(t) {
    const e = Array.from(d(this, je).keys());
    e.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      t(d(this, je).get(s), n);
    }
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(t) {
    const e = B(this, Ye, Ba).call(this, t, null, !1);
    return A(e, "no matching event", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(t) {
    return !!B(this, Ye, Ba).call(this, t, null, !1);
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
    return B(this, Ye, Ba).call(this, t, e || null, !0);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(t) {
    const e = Array.from(d(this, _e).keys());
    e.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      t(d(this, _e).get(s), n);
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
    if (ot(t)) {
      const s = t.toLowerCase();
      if (Cu[s])
        return Yt.from(Cu[s].signature);
      for (const i of d(this, Ve).values())
        if (s === i.selector)
          return i;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const s = [];
      for (const [i, a] of d(this, Ve))
        i.split(
          "("
          /* fix:) */
        )[0] === t && s.push(a);
      if (s.length === 0)
        return t === "Error" ? Yt.from("error Error(string)") : t === "Panic" ? Yt.from("error Panic(uint256)") : null;
      if (s.length > 1) {
        const i = s.map((a) => JSON.stringify(a.format())).join(", ");
        A(!1, `ambiguous error description (i.e. ${i})`, "name", t);
      }
      return s[0];
    }
    return t = Yt.from(t).format(), t === "Error(string)" ? Yt.from("error Error(string)") : t === "Panic(uint256)" ? Yt.from("error Panic(uint256)") : d(this, Ve).get(t) || null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(t) {
    const e = Array.from(d(this, Ve).keys());
    e.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      t(d(this, Ve).get(s), n);
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
    return d(this, Ut).decode(t, e);
  }
  _encodeParams(t, e) {
    return d(this, Ut).encode(t, e);
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
      const n = this.getError(t);
      A(n, "unknown error", "fragment", t), t = n;
    }
    return A(dt(e, 0, 4) === t.selector, `data signature does not match error ${t.name}.`, "data", e), this._decodeParams(t.inputs, dt(e, 4));
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
      const n = this.getError(t);
      A(n, "unknown error", "fragment", t), t = n;
    }
    return ut([
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
      const n = this.getFunction(t);
      A(n, "unknown function", "fragment", t), t = n;
    }
    return A(dt(e, 0, 4) === t.selector, `data signature does not match function ${t.name}.`, "data", e), this._decodeParams(t.inputs, dt(e, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      A(n, "unknown function", "fragment", t), t = n;
    }
    return ut([
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
      A(i, "unknown function", "fragment", t), t = i;
    }
    let n = "invalid length for result data";
    const s = Qt(e);
    if (s.length % 32 === 0)
      try {
        return d(this, Ut).decode(t.outputs, s);
      } catch {
        n = "could not decode result data";
      }
    R(!1, n, "BAD_DATA", {
      value: H(s),
      info: { method: t.name, signature: t.format() }
    });
  }
  makeError(t, e) {
    const n = q(t, "data"), s = Xn.getBuiltinCallException("call", e, n);
    if (s.message.startsWith("execution reverted (unknown custom error)")) {
      const a = H(n.slice(0, 4)), o = this.getError(a);
      if (o)
        try {
          const c = d(this, Ut).decode(o.inputs, n.slice(4));
          s.revert = {
            name: o.name,
            signature: o.format(),
            args: c
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
      const n = this.getFunction(t);
      A(n, "unknown function", "fragment", t), t = n;
    }
    return H(d(this, Ut).encode(t.outputs, e || []));
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
      A(i, "unknown event", "eventFragment", t), t = i;
    }
    R(e.length <= t.inputs.length, `too many arguments for ${t.format()}`, "UNEXPECTED_ARGUMENT", { count: e.length, expectedCount: t.inputs.length });
    const n = [];
    t.anonymous || n.push(t.topicHash);
    const s = (i, a) => i.type === "string" ? Wn(a) : i.type === "bytes" ? ft(H(a)) : (i.type === "bool" && typeof a == "boolean" ? a = a ? "0x01" : "0x00" : i.type.match(/^u?int/) ? a = en(a) : i.type.match(/^bytes/) ? a = zc(a, 32) : i.type === "address" && d(this, Ut).encode(["address"], [a]), Ze(H(a), 32));
    for (e.forEach((i, a) => {
      const o = t.inputs[a];
      if (!o.indexed) {
        A(i == null, "cannot filter non-indexed parameters; must be null", "contract." + o.name, i);
        return;
      }
      i == null ? n.push(null) : o.baseType === "array" || o.baseType === "tuple" ? A(!1, "filtering with tuples or arrays not supported", "contract." + o.name, i) : Array.isArray(i) ? n.push(i.map((c) => s(o, c))) : n.push(s(o, i));
    }); n.length && n[n.length - 1] === null; )
      n.pop();
    return n;
  }
  encodeEventLog(t, e) {
    if (typeof t == "string") {
      const a = this.getEvent(t);
      A(a, "unknown event", "eventFragment", t), t = a;
    }
    const n = [], s = [], i = [];
    return t.anonymous || n.push(t.topicHash), A(e.length === t.inputs.length, "event arguments/values mismatch", "values", e), t.inputs.forEach((a, o) => {
      const c = e[o];
      if (a.indexed)
        if (a.type === "string")
          n.push(Wn(c));
        else if (a.type === "bytes")
          n.push(ft(c));
        else {
          if (a.baseType === "tuple" || a.baseType === "array")
            throw new Error("not implemented");
          n.push(d(this, Ut).encode([a.type], [c]));
        }
      else
        s.push(a), i.push(c);
    }), {
      data: d(this, Ut).encode(s, i),
      topics: n
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(t, e, n) {
    if (typeof t == "string") {
      const y = this.getEvent(t);
      A(y, "unknown event", "eventFragment", t), t = y;
    }
    if (n != null && !t.anonymous) {
      const y = t.topicHash;
      A(ot(n[0], 32) && n[0].toLowerCase() === y, "fragment/topic mismatch", "topics[0]", n[0]), n = n.slice(1);
    }
    const s = [], i = [], a = [];
    t.inputs.forEach((y, m) => {
      y.indexed ? y.type === "string" || y.type === "bytes" || y.baseType === "tuple" || y.baseType === "array" ? (s.push(St.from({ type: "bytes32", name: y.name })), a.push(!0)) : (s.push(y), a.push(!1)) : (i.push(y), a.push(!1));
    });
    const o = n != null ? d(this, Ut).decode(s, ut(n)) : null, c = d(this, Ut).decode(i, e, !0), l = [], h = [];
    let u = 0, f = 0;
    return t.inputs.forEach((y, m) => {
      let g = null;
      if (y.indexed)
        if (o == null)
          g = new Iu(null);
        else if (a[m])
          g = new Iu(o[f++]);
        else
          try {
            g = o[f++];
          } catch (w) {
            g = w;
          }
      else
        try {
          g = c[u++];
        } catch (w) {
          g = w;
        }
      l.push(g), h.push(y.name || null);
    }), ui.fromItems(l, h);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(t) {
    const e = q(t.data, "tx.data"), n = G(t.value != null ? t.value : 0, "tx.value"), s = this.getFunction(H(e.slice(0, 4)));
    if (!s)
      return null;
    const i = d(this, Ut).decode(s.inputs, e.slice(4));
    return new vy(s, s.selector, i, n);
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
    return !e || e.anonymous ? null : new Ey(e, e.topicHash, this.decodeEventLog(e, t.data, t.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(t) {
    const e = H(t), n = this.getError(dt(e, 0, 4));
    if (!n)
      return null;
    const s = d(this, Ut).decode(n.inputs, dt(e, 4));
    return new xy(n, n.selector, s);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(t) {
    return t instanceof gn ? t : typeof t == "string" ? new gn(JSON.parse(t)) : typeof t.formatJson == "function" ? new gn(t.formatJson()) : typeof t.format == "function" ? new gn(t.format("json")) : new gn(t);
  }
};
Ve = new WeakMap(), _e = new WeakMap(), je = new WeakMap(), Ut = new WeakMap(), Ye = new WeakSet(), // Find a function definition by any means necessary (unless it is ambiguous)
Sa = function(t, e, n) {
  if (ot(t)) {
    const i = t.toLowerCase();
    for (const a of d(this, je).values())
      if (i === a.selector)
        return a;
    return null;
  }
  if (t.indexOf("(") === -1) {
    const i = [];
    for (const [a, o] of d(this, je))
      a.split(
        "("
        /* fix:) */
      )[0] === t && i.push(o);
    if (e) {
      const a = e.length > 0 ? e[e.length - 1] : null;
      let o = e.length, c = !0;
      Mt.isTyped(a) && a.type === "overrides" && (c = !1, o--);
      for (let l = i.length - 1; l >= 0; l--) {
        const h = i[l].inputs.length;
        h !== o && (!c || h !== o - 1) && i.splice(l, 1);
      }
      for (let l = i.length - 1; l >= 0; l--) {
        const h = i[l].inputs;
        for (let u = 0; u < e.length; u++)
          if (Mt.isTyped(e[u])) {
            if (u >= h.length) {
              if (e[u].type === "overrides")
                continue;
              i.splice(l, 1);
              break;
            }
            if (e[u].type !== h[u].baseType) {
              i.splice(l, 1);
              break;
            }
          }
      }
    }
    if (i.length === 1 && e && e.length !== i[0].inputs.length) {
      const a = e[e.length - 1];
      (a == null || Array.isArray(a) || typeof a != "object") && i.splice(0, 1);
    }
    if (i.length === 0)
      return null;
    if (i.length > 1 && n) {
      const a = i.map((o) => JSON.stringify(o.format())).join(", ");
      A(!1, `ambiguous function description (i.e. matches ${a})`, "key", t);
    }
    return i[0];
  }
  return d(this, je).get(qe.from(t).format()) || null;
}, // Find an event definition by any means necessary (unless it is ambiguous)
Ba = function(t, e, n) {
  if (ot(t)) {
    const i = t.toLowerCase();
    for (const a of d(this, _e).values())
      if (i === a.topicHash)
        return a;
    return null;
  }
  if (t.indexOf("(") === -1) {
    const i = [];
    for (const [a, o] of d(this, _e))
      a.split(
        "("
        /* fix:) */
      )[0] === t && i.push(o);
    if (e) {
      for (let a = i.length - 1; a >= 0; a--)
        i[a].inputs.length < e.length && i.splice(a, 1);
      for (let a = i.length - 1; a >= 0; a--) {
        const o = i[a].inputs;
        for (let c = 0; c < e.length; c++)
          if (Mt.isTyped(e[c]) && e[c].type !== o[c].baseType) {
            i.splice(a, 1);
            break;
          }
      }
    }
    if (i.length === 0)
      return null;
    if (i.length > 1 && n) {
      const a = i.map((o) => JSON.stringify(o.format())).join(", ");
      A(!1, `ambiguous event description (i.e. matches ${a})`, "key", t);
    }
    return i[0];
  }
  return d(this, _e).get(Ke.from(t).format()) || null;
};
let Lr = gn;
const Sd = BigInt(0);
function vs(r) {
  return r ?? null;
}
function gt(r) {
  return r == null ? null : r.toString();
}
class Ou {
  /**
   *  Creates a new FeeData for %%gasPrice%%, %%maxFeePerGas%% and
   *  %%maxPriorityFeePerGas%%.
   */
  constructor(t, e, n) {
    /**
     *  The gas price for legacy networks.
     */
    b(this, "gasPrice");
    /**
     *  The maximum fee to pay per gas.
     *
     *  The base fee per gas is defined by the network and based on
     *  congestion, increasing the cost during times of heavy load
     *  and lowering when less busy.
     *
     *  The actual fee per gas will be the base fee for the block
     *  and the priority fee, up to the max fee per gas.
     *
     *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
     */
    b(this, "maxFeePerGas");
    /**
     *  The additional amout to pay per gas to encourage a validator
     *  to include the transaction.
     *
     *  The purpose of this is to compensate the validator for the
     *  adjusted risk for including a given transaction.
     *
     *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
     */
    b(this, "maxPriorityFeePerGas");
    Q(this, {
      gasPrice: vs(t),
      maxFeePerGas: vs(e),
      maxPriorityFeePerGas: vs(n)
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { gasPrice: t, maxFeePerGas: e, maxPriorityFeePerGas: n } = this;
    return {
      _type: "FeeData",
      gasPrice: gt(t),
      maxFeePerGas: gt(e),
      maxPriorityFeePerGas: gt(n)
    };
  }
}
function Ya(r) {
  const t = {};
  r.to && (t.to = r.to), r.from && (t.from = r.from), r.data && (t.data = H(r.data));
  const e = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const s of e)
    !(s in r) || r[s] == null || (t[s] = G(r[s], `request.${s}`));
  const n = "type,nonce".split(/,/);
  for (const s of n)
    !(s in r) || r[s] == null || (t[s] = W(r[s], `request.${s}`));
  return r.accessList && (t.accessList = ns(r.accessList)), "blockTag" in r && (t.blockTag = r.blockTag), "enableCcipRead" in r && (t.enableCcipRead = !!r.enableCcipRead), "customData" in r && (t.customData = r.customData), "blobVersionedHashes" in r && r.blobVersionedHashes && (t.blobVersionedHashes = r.blobVersionedHashes.slice()), "kzg" in r && (t.kzg = r.kzg), "blobs" in r && r.blobs && (t.blobs = r.blobs.map((s) => Qc(s) ? H(s) : Object.assign({}, s))), t;
}
var fr;
class Ny {
  /**
   *  Create a new **Block** object.
   *
   *  This should generally not be necessary as the unless implementing a
   *  low-level library.
   */
  constructor(t, e) {
    /**
     *  The provider connected to the block used to fetch additional details
     *  if necessary.
     */
    b(this, "provider");
    /**
     *  The block number, sometimes called the block height. This is a
     *  sequential number that is one higher than the parent block.
     */
    b(this, "number");
    /**
     *  The block hash.
     *
     *  This hash includes all properties, so can be safely used to identify
     *  an exact set of block properties.
     */
    b(this, "hash");
    /**
     *  The timestamp for this block, which is the number of seconds since
     *  epoch that this block was included.
     */
    b(this, "timestamp");
    /**
     *  The block hash of the parent block.
     */
    b(this, "parentHash");
    /**
     *  The hash tree root of the parent beacon block for the given
     *  execution block. See [[link-eip-4788]].
     */
    b(this, "parentBeaconBlockRoot");
    /**
     *  The nonce.
     *
     *  On legacy networks, this is the random number inserted which
     *  permitted the difficulty target to be reached.
     */
    b(this, "nonce");
    /**
     *  The difficulty target.
     *
     *  On legacy networks, this is the proof-of-work target required
     *  for a block to meet the protocol rules to be included.
     *
     *  On modern networks, this is a random number arrived at using
     *  randao.  @TODO: Find links?
     */
    b(this, "difficulty");
    /**
     *  The total gas limit for this block.
     */
    b(this, "gasLimit");
    /**
     *  The total gas used in this block.
     */
    b(this, "gasUsed");
    /**
     *  The root hash for the global state after applying changes
     *  in this block.
     */
    b(this, "stateRoot");
    /**
     *  The hash of the transaction receipts trie.
     */
    b(this, "receiptsRoot");
    /**
     *  The total amount of blob gas consumed by the transactions
     *  within the block. See [[link-eip-4844]].
     */
    b(this, "blobGasUsed");
    /**
     *  The running total of blob gas consumed in excess of the
     *  target, prior to the block. See [[link-eip-4844]].
     */
    b(this, "excessBlobGas");
    /**
     *  The miner coinbase address, wihch receives any subsidies for
     *  including this block.
     */
    b(this, "miner");
    /**
     *  The latest RANDAO mix of the post beacon state of
     *  the previous block.
     */
    b(this, "prevRandao");
    /**
     *  Any extra data the validator wished to include.
     */
    b(this, "extraData");
    /**
     *  The base fee per gas that all transactions in this block were
     *  charged.
     *
     *  This adjusts after each block, depending on how congested the network
     *  is.
     */
    b(this, "baseFeePerGas");
    x(this, fr);
    p(this, fr, t.transactions.map((n) => typeof n != "string" ? new Ki(n, e) : n)), Q(this, {
      provider: e,
      hash: vs(t.hash),
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
      prevRandao: vs(t.prevRandao),
      extraData: t.extraData,
      baseFeePerGas: vs(t.baseFeePerGas),
      stateRoot: t.stateRoot,
      receiptsRoot: t.receiptsRoot
    });
  }
  /**
   *  Returns the list of transaction hashes, in the order
   *  they were executed within the block.
   */
  get transactions() {
    return d(this, fr).map((t) => typeof t == "string" ? t : t.hash);
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
    const t = d(this, fr).slice();
    return t.length === 0 ? [] : (R(typeof t[0] == "object", "transactions were not prefetched with block request", "UNSUPPORTED_OPERATION", {
      operation: "transactionResponses()"
    }), t);
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { baseFeePerGas: t, difficulty: e, extraData: n, gasLimit: s, gasUsed: i, hash: a, miner: o, prevRandao: c, nonce: l, number: h, parentHash: u, parentBeaconBlockRoot: f, stateRoot: y, receiptsRoot: m, timestamp: g, transactions: w } = this;
    return {
      _type: "Block",
      baseFeePerGas: gt(t),
      difficulty: gt(e),
      extraData: n,
      gasLimit: gt(s),
      gasUsed: gt(i),
      blobGasUsed: gt(this.blobGasUsed),
      excessBlobGas: gt(this.excessBlobGas),
      hash: a,
      miner: o,
      prevRandao: c,
      nonce: l,
      number: h,
      parentHash: u,
      timestamp: g,
      parentBeaconBlockRoot: f,
      stateRoot: y,
      receiptsRoot: m,
      transactions: w
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
    return d(this, fr).length;
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
      e = d(this, fr)[t];
    else {
      const n = t.toLowerCase();
      for (const s of d(this, fr))
        if (typeof s == "string") {
          if (s !== n)
            continue;
          e = s;
          break;
        } else {
          if (s.hash === n)
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
    for (const n of e)
      if (n.hash === t)
        return n;
    A(!1, "no matching transaction", "indexOrHash", t);
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
    return Iy(this);
  }
}
fr = new WeakMap();
class ua {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    b(this, "provider");
    /**
     *  The transaction hash of the transaction this log occurred in. Use the
     *  [[Log-getTransaction]] to get the [[TransactionResponse]].
     */
    b(this, "transactionHash");
    /**
     *  The block hash of the block this log occurred in. Use the
     *  [[Log-getBlock]] to get the [[Block]].
     */
    b(this, "blockHash");
    /**
     *  The block number of the block this log occurred in. It is preferred
     *  to use the [[Block-hash]] when fetching the related [[Block]],
     *  since in the case of an orphaned block, the block at that height may
     *  have changed.
     */
    b(this, "blockNumber");
    /**
     *  If the **Log** represents a block that was removed due to an orphaned
     *  block, this will be true.
     *
     *  This can only happen within an orphan event listener.
     */
    b(this, "removed");
    /**
     *  The address of the contract that emitted this log.
     */
    b(this, "address");
    /**
     *  The data included in this log when it was emitted.
     */
    b(this, "data");
    /**
     *  The indexed topics included in this log when it was emitted.
     *
     *  All topics are included in the bloom filters, so they can be
     *  efficiently filtered using the [[Provider-getLogs]] method.
     */
    b(this, "topics");
    /**
     *  The index within the block this log occurred at. This is generally
     *  not useful to developers, but can be used with the various roots
     *  to proof inclusion within a block.
     */
    b(this, "index");
    /**
     *  The index within the transaction of this log.
     */
    b(this, "transactionIndex");
    this.provider = e;
    const n = Object.freeze(t.topics.slice());
    Q(this, {
      transactionHash: t.transactionHash,
      blockHash: t.blockHash,
      blockNumber: t.blockNumber,
      removed: t.removed,
      address: t.address,
      data: t.data,
      topics: n,
      index: t.index,
      transactionIndex: t.transactionIndex
    });
  }
  /**
   *  Returns a JSON-compatible object.
   */
  toJSON() {
    const { address: t, blockHash: e, blockNumber: n, data: s, index: i, removed: a, topics: o, transactionHash: c, transactionIndex: l } = this;
    return {
      _type: "log",
      address: t,
      blockHash: e,
      blockNumber: n,
      data: s,
      index: i,
      removed: a,
      topics: o,
      transactionHash: c,
      transactionIndex: l
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    return R(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const t = await this.provider.getTransaction(this.transactionHash);
    return R(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const t = await this.provider.getTransactionReceipt(this.transactionHash);
    return R(!!t, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return Ty(this);
  }
}
var ta;
class Bd {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    /**
     *  The provider connected to the log used to fetch additional details
     *  if necessary.
     */
    b(this, "provider");
    /**
     *  The address the transaction was sent to.
     */
    b(this, "to");
    /**
     *  The sender of the transaction.
     */
    b(this, "from");
    /**
     *  The address of the contract if the transaction was directly
     *  responsible for deploying one.
     *
     *  This is non-null **only** if the ``to`` is empty and the ``data``
     *  was successfully executed as initcode.
     */
    b(this, "contractAddress");
    /**
     *  The transaction hash.
     */
    b(this, "hash");
    /**
     *  The index of this transaction within the block transactions.
     */
    b(this, "index");
    /**
     *  The block hash of the [[Block]] this transaction was included in.
     */
    b(this, "blockHash");
    /**
     *  The block number of the [[Block]] this transaction was included in.
     */
    b(this, "blockNumber");
    /**
     *  The bloom filter bytes that represent all logs that occurred within
     *  this transaction. This is generally not useful for most developers,
     *  but can be used to validate the included logs.
     */
    b(this, "logsBloom");
    /**
     *  The actual amount of gas used by this transaction.
     *
     *  When creating a transaction, the amount of gas that will be used can
     *  only be approximated, but the sender must pay the gas fee for the
     *  entire gas limit. After the transaction, the difference is refunded.
     */
    b(this, "gasUsed");
    /**
     *  The gas used for BLObs. See [[link-eip-4844]].
     */
    b(this, "blobGasUsed");
    /**
     *  The amount of gas used by all transactions within the block for this
     *  and all transactions with a lower ``index``.
     *
     *  This is generally not useful for developers but can be used to
     *  validate certain aspects of execution.
     */
    b(this, "cumulativeGasUsed");
    /**
     *  The actual gas price used during execution.
     *
     *  Due to the complexity of [[link-eip-1559]] this value can only
     *  be caluclated after the transaction has been mined, snce the base
     *  fee is protocol-enforced.
     */
    b(this, "gasPrice");
    /**
     *  The price paid per BLOB in gas. See [[link-eip-4844]].
     */
    b(this, "blobGasPrice");
    /**
     *  The [[link-eip-2718]] transaction type.
     */
    b(this, "type");
    //readonly byzantium!: boolean;
    /**
     *  The status of this transaction, indicating success (i.e. ``1``) or
     *  a revert (i.e. ``0``).
     *
     *  This is available in post-byzantium blocks, but some backends may
     *  backfill this value.
     */
    b(this, "status");
    /**
     *  The root hash of this transaction.
     *
     *  This is no present and was only included in pre-byzantium blocks, but
     *  could be used to validate certain parts of the receipt.
     */
    b(this, "root");
    x(this, ta);
    p(this, ta, Object.freeze(t.logs.map((s) => new ua(s, e))));
    let n = Sd;
    t.effectiveGasPrice != null ? n = t.effectiveGasPrice : t.gasPrice != null && (n = t.gasPrice), Q(this, {
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
      gasPrice: n,
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
    return d(this, ta);
  }
  /**
   *  Returns a JSON-compatible representation.
   */
  toJSON() {
    const {
      to: t,
      from: e,
      contractAddress: n,
      hash: s,
      index: i,
      blockHash: a,
      blockNumber: o,
      logsBloom: c,
      logs: l,
      //byzantium, 
      status: h,
      root: u
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: a,
      blockNumber: o,
      //byzantium, 
      contractAddress: n,
      cumulativeGasUsed: gt(this.cumulativeGasUsed),
      from: e,
      gasPrice: gt(this.gasPrice),
      blobGasUsed: gt(this.blobGasUsed),
      blobGasPrice: gt(this.blobGasPrice),
      gasUsed: gt(this.gasUsed),
      hash: s,
      index: i,
      logs: l,
      logsBloom: c,
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
    return Dd(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(t) {
    return R(!t || t.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), Ud(this, t);
  }
}
ta = new WeakMap();
var jr;
const xl = class xl {
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    /**
     *  The provider this is connected to, which will influence how its
     *  methods will resolve its async inspection methods.
     */
    b(this, "provider");
    /**
     *  The block number of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    b(this, "blockNumber");
    /**
     *  The blockHash of the block that this transaction was included in.
     *
     *  This is ``null`` for pending transactions.
     */
    b(this, "blockHash");
    /**
     *  The index within the block that this transaction resides at.
     */
    b(this, "index");
    /**
     *  The transaction hash.
     */
    b(this, "hash");
    /**
     *  The [[link-eip-2718]] transaction envelope type. This is
     *  ``0`` for legacy transactions types.
     */
    b(this, "type");
    /**
     *  The receiver of this transaction.
     *
     *  If ``null``, then the transaction is an initcode transaction.
     *  This means the result of executing the [[data]] will be deployed
     *  as a new contract on chain (assuming it does not revert) and the
     *  address may be computed using [[getCreateAddress]].
     */
    b(this, "to");
    /**
     *  The sender of this transaction. It is implicitly computed
     *  from the transaction pre-image hash (as the digest) and the
     *  [[signature]] using ecrecover.
     */
    b(this, "from");
    /**
     *  The nonce, which is used to prevent replay attacks and offer
     *  a method to ensure transactions from a given sender are explicitly
     *  ordered.
     *
     *  When sending a transaction, this must be equal to the number of
     *  transactions ever sent by [[from]].
     */
    b(this, "nonce");
    /**
     *  The maximum units of gas this transaction can consume. If execution
     *  exceeds this, the entries transaction is reverted and the sender
     *  is charged for the full amount, despite not state changes being made.
     */
    b(this, "gasLimit");
    /**
     *  The gas price can have various values, depending on the network.
     *
     *  In modern networks, for transactions that are included this is
     *  the //effective gas price// (the fee per gas that was actually
     *  charged), while for transactions that have not been included yet
     *  is the [[maxFeePerGas]].
     *
     *  For legacy transactions, or transactions on legacy networks, this
     *  is the fee that will be charged per unit of gas the transaction
     *  consumes.
     */
    b(this, "gasPrice");
    /**
     *  The maximum priority fee (per unit of gas) to allow a
     *  validator to charge the sender. This is inclusive of the
     *  [[maxFeeFeePerGas]].
     */
    b(this, "maxPriorityFeePerGas");
    /**
     *  The maximum fee (per unit of gas) to allow this transaction
     *  to charge the sender.
     */
    b(this, "maxFeePerGas");
    /**
     *  The [[link-eip-4844]] max fee per BLOb gas.
     */
    b(this, "maxFeePerBlobGas");
    /**
     *  The data.
     */
    b(this, "data");
    /**
     *  The value, in wei. Use [[formatEther]] to format this value
     *  as ether.
     */
    b(this, "value");
    /**
     *  The chain ID.
     */
    b(this, "chainId");
    /**
     *  The signature.
     */
    b(this, "signature");
    /**
     *  The [[link-eip-2930]] access list for transaction types that
     *  support it, otherwise ``null``.
     */
    b(this, "accessList");
    /**
     *  The [[link-eip-4844]] BLOb versioned hashes.
     */
    b(this, "blobVersionedHashes");
    x(this, jr);
    this.provider = e, this.blockNumber = t.blockNumber != null ? t.blockNumber : null, this.blockHash = t.blockHash != null ? t.blockHash : null, this.hash = t.hash, this.index = t.index, this.type = t.type, this.from = t.from, this.to = t.to || null, this.gasLimit = t.gasLimit, this.nonce = t.nonce, this.data = t.data, this.value = t.value, this.gasPrice = t.gasPrice, this.maxPriorityFeePerGas = t.maxPriorityFeePerGas != null ? t.maxPriorityFeePerGas : null, this.maxFeePerGas = t.maxFeePerGas != null ? t.maxFeePerGas : null, this.maxFeePerBlobGas = t.maxFeePerBlobGas != null ? t.maxFeePerBlobGas : null, this.chainId = t.chainId, this.signature = t.signature, this.accessList = t.accessList != null ? t.accessList : null, this.blobVersionedHashes = t.blobVersionedHashes != null ? t.blobVersionedHashes : null, p(this, jr, -1);
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber: t, blockHash: e, index: n, hash: s, type: i, to: a, from: o, nonce: c, data: l, signature: h, accessList: u, blobVersionedHashes: f } = this;
    return {
      _type: "TransactionResponse",
      accessList: u,
      blockNumber: t,
      blockHash: e,
      blobVersionedHashes: f,
      chainId: gt(this.chainId),
      data: l,
      from: o,
      gasLimit: gt(this.gasLimit),
      gasPrice: gt(this.gasPrice),
      hash: s,
      maxFeePerGas: gt(this.maxFeePerGas),
      maxPriorityFeePerGas: gt(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: gt(this.maxFeePerBlobGas),
      nonce: c,
      signature: h,
      to: a,
      index: n,
      type: i,
      value: gt(this.value)
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
      const n = await this.getTransaction();
      n && (t = n.blockNumber);
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
      const { tx: t, blockNumber: e } = await jt({
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
    const n = t ?? 1, s = e ?? 0;
    let i = d(this, jr), a = -1, o = i === -1;
    const c = async () => {
      if (o)
        return null;
      const { blockNumber: u, nonce: f } = await jt({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (f < this.nonce) {
        i = u;
        return;
      }
      if (o)
        return null;
      const y = await this.getTransaction();
      if (!(y && y.blockNumber != null))
        for (a === -1 && (a = i - 3, a < d(this, jr) && (a = d(this, jr))); a <= u; ) {
          if (o)
            return null;
          const m = await this.provider.getBlock(a, !0);
          if (m == null)
            return;
          for (const g of m)
            if (g === this.hash)
              return;
          for (let g = 0; g < m.length; g++) {
            const w = await m.getTransaction(g);
            if (w.from === this.from && w.nonce === this.nonce) {
              if (o)
                return null;
              const E = await this.provider.getTransactionReceipt(w.hash);
              if (E == null || u - E.blockNumber + 1 < n)
                return;
              let O = "replaced";
              w.data === this.data && w.to === this.to && w.value === this.value ? O = "repriced" : w.data === "0x" && w.from === w.to && w.value === Sd && (O = "cancelled"), R(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: O === "replaced" || O === "cancelled",
                reason: O,
                replacement: w.replaceableTransaction(i),
                hash: w.hash,
                receipt: E
              });
            }
          }
          a++;
        }
    }, l = (u) => {
      if (u == null || u.status !== 0)
        return u;
      R(!1, "transaction execution reverted", "CALL_EXCEPTION", {
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
    if (n === 0)
      return l(h);
    if (h) {
      if (await h.confirmations() >= n)
        return l(h);
    } else if (await c(), n === 0)
      return null;
    return await new Promise((u, f) => {
      const y = [], m = () => {
        y.forEach((w) => w());
      };
      if (y.push(() => {
        o = !0;
      }), s > 0) {
        const w = setTimeout(() => {
          m(), f(ht("wait for transaction timeout", "TIMEOUT"));
        }, s);
        y.push(() => {
          clearTimeout(w);
        });
      }
      const g = async (w) => {
        if (await w.confirmations() >= n) {
          m();
          try {
            u(l(w));
          } catch (E) {
            f(E);
          }
        }
      };
      if (y.push(() => {
        this.provider.off(this.hash, g);
      }), this.provider.on(this.hash, g), i >= 0) {
        const w = async () => {
          try {
            await c();
          } catch (E) {
            if (Ft(E, "TRANSACTION_REPLACED")) {
              m(), f(E);
              return;
            }
          }
          o || this.provider.once("block", w);
        };
        y.push(() => {
          this.provider.off("block", w);
        }), this.provider.once("block", w);
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
    return R(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Dd(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(t) {
    return R(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), R(!t || t.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Ud(this, t);
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
    A(Number.isInteger(t) && t >= 0, "invalid startBlock", "startBlock", t);
    const e = new xl(this, this.provider);
    return p(e, jr, t), e;
  }
};
jr = new WeakMap();
let Ki = xl;
function Iy(r) {
  return { orphan: "drop-block", hash: r.hash, number: r.number };
}
function Ud(r, t) {
  return { orphan: "reorder-transaction", tx: r, other: t };
}
function Dd(r) {
  return { orphan: "drop-transaction", tx: r };
}
function Ty(r) {
  return { orphan: "drop-log", log: {
    transactionHash: r.transactionHash,
    blockHash: r.blockHash,
    blockNumber: r.blockNumber,
    address: r.address,
    data: r.data,
    topics: Object.freeze(r.topics.slice()),
    index: r.index
  } };
}
class ol extends ua {
  /**
   * @_ignore:
   */
  constructor(e, n, s) {
    super(e, e.provider);
    /**
     *  The Contract Interface.
     */
    b(this, "interface");
    /**
     *  The matching event.
     */
    b(this, "fragment");
    /**
     *  The parsed arguments passed to the event by ``emit``.
     */
    b(this, "args");
    const i = n.decodeEventLog(s, e.data, e.topics);
    Q(this, { args: i, fragment: s, interface: n });
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
}
class Ld extends ua {
  /**
   * @_ignore:
   */
  constructor(e, n) {
    super(e, e.provider);
    /**
     *  The error encounted when trying to decode the log.
     */
    b(this, "error");
    Q(this, { error: n });
  }
}
var qs;
class Cy extends Bd {
  /**
   *  @_ignore:
   */
  constructor(e, n, s) {
    super(s, n);
    x(this, qs);
    p(this, qs, e);
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((e) => {
      const n = e.topics.length ? d(this, qs).getEvent(e.topics[0]) : null;
      if (n)
        try {
          return new ol(e, d(this, qs), n);
        } catch (s) {
          return new Ld(e, s);
        }
      return e;
    });
  }
}
qs = new WeakMap();
var ea;
class cl extends Ki {
  /**
   *  @_ignore:
   */
  constructor(e, n, s) {
    super(s, n);
    x(this, ea);
    p(this, ea, e);
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
  async wait(e, n) {
    const s = await super.wait(e, n);
    return s == null ? null : new Cy(d(this, ea), this.provider, s);
  }
}
ea = new WeakMap();
class Fd extends oh {
  /**
   *  @_event:
   */
  constructor(e, n, s, i) {
    super(e, n, s);
    /**
     *  The log with no matching events.
     */
    b(this, "log");
    Q(this, { log: i });
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
class Oy extends Fd {
  /**
   *  @_ignore:
   */
  constructor(t, e, n, s, i) {
    super(t, e, n, new ol(i, t.interface, s));
    const a = t.interface.decodeEventLog(s, this.log.data, this.log.topics);
    Q(this, { args: a, fragment: s });
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
const Pu = BigInt(0);
function Md(r) {
  return r && typeof r.call == "function";
}
function Hd(r) {
  return r && typeof r.estimateGas == "function";
}
function bo(r) {
  return r && typeof r.resolveName == "function";
}
function Gd(r) {
  return r && typeof r.sendTransaction == "function";
}
function Vd(r) {
  if (r != null) {
    if (bo(r))
      return r;
    if (r.provider)
      return r.provider;
  }
}
var ra;
class Py {
  constructor(t, e, n) {
    x(this, ra);
    b(this, "fragment");
    if (Q(this, { fragment: e }), e.inputs.length < n.length)
      throw new Error("too many arguments");
    const s = $n(t.runner, "resolveName"), i = bo(s) ? s : null;
    p(this, ra, async function() {
      const a = await Promise.all(e.inputs.map((o, c) => n[c] == null ? null : o.walkAsync(n[c], (l, h) => l === "address" ? Array.isArray(h) ? Promise.all(h.map((u) => Jt(u, i))) : Jt(h, i) : h)));
      return t.interface.encodeFilterTopics(e, a);
    }());
  }
  getTopicFilter() {
    return d(this, ra);
  }
}
ra = new WeakMap();
function $n(r, t) {
  return r == null ? null : typeof r[t] == "function" ? r : r.provider && typeof r.provider[t] == "function" ? r.provider : null;
}
function bn(r) {
  return r == null ? null : r.provider || null;
}
async function _d(r, t) {
  const e = Mt.dereference(r, "overrides");
  A(typeof e == "object", "invalid overrides parameter", "overrides", r);
  const n = Ya(e);
  return A(n.to == null || (t || []).indexOf("to") >= 0, "cannot override to", "overrides.to", n.to), A(n.data == null || (t || []).indexOf("data") >= 0, "cannot override data", "overrides.data", n.data), n.from && (n.from = n.from), n;
}
async function ky(r, t, e) {
  const n = $n(r, "resolveName"), s = bo(n) ? n : null;
  return await Promise.all(t.map((i, a) => i.walkAsync(e[a], (o, c) => (c = Mt.dereference(c, o), o === "address" ? Jt(c, s) : c))));
}
function Ry(r) {
  const t = async function(a) {
    const o = await _d(a, ["data"]);
    o.to = await r.getAddress(), o.from && (o.from = await Jt(o.from, Vd(r.runner)));
    const c = r.interface, l = G(o.value || Pu, "overrides.value") === Pu, h = (o.data || "0x") === "0x";
    c.fallback && !c.fallback.payable && c.receive && !h && !l && A(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", a), A(c.fallback || h, "cannot send data to receive-only contract", "overrides.data", o.data);
    const u = c.receive || c.fallback && c.fallback.payable;
    return A(u || l, "cannot send value to non-payable fallback", "overrides.value", o.value), A(c.fallback || h, "cannot send data to receive-only contract", "overrides.data", o.data), o;
  }, e = async function(a) {
    const o = $n(r.runner, "call");
    R(Md(o), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const c = await t(a);
    try {
      return await o.call(c);
    } catch (l) {
      throw jc(l) && l.data ? r.interface.makeError(l.data, c) : l;
    }
  }, n = async function(a) {
    const o = r.runner;
    R(Gd(o), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const c = await o.sendTransaction(await t(a)), l = bn(r.runner);
    return new cl(r.interface, l, c);
  }, s = async function(a) {
    const o = $n(r.runner, "estimateGas");
    return R(Hd(o), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await o.estimateGas(await t(a));
  }, i = async (a) => await n(a);
  return Q(i, {
    _contract: r,
    estimateGas: s,
    populateTransaction: t,
    send: n,
    staticCall: e
  }), i;
}
function Sy(r, t) {
  const e = function(...l) {
    const h = r.interface.getFunction(t, l);
    return R(h, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: l }
    }), h;
  }, n = async function(...l) {
    const h = e(...l);
    let u = {};
    if (h.inputs.length + 1 === l.length && (u = await _d(l.pop()), u.from && (u.from = await Jt(u.from, Vd(r.runner)))), h.inputs.length !== l.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const f = await ky(r.runner, h.inputs, l);
    return Object.assign({}, u, await jt({
      to: r.getAddress(),
      data: r.interface.encodeFunctionData(h, f)
    }));
  }, s = async function(...l) {
    const h = await o(...l);
    return h.length === 1 ? h[0] : h;
  }, i = async function(...l) {
    const h = r.runner;
    R(Gd(h), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const u = await h.sendTransaction(await n(...l)), f = bn(r.runner);
    return new cl(r.interface, f, u);
  }, a = async function(...l) {
    const h = $n(r.runner, "estimateGas");
    return R(Hd(h), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await h.estimateGas(await n(...l));
  }, o = async function(...l) {
    const h = $n(r.runner, "call");
    R(Md(h), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const u = await n(...l);
    let f = "0x";
    try {
      f = await h.call(u);
    } catch (m) {
      throw jc(m) && m.data ? r.interface.makeError(m.data, u) : m;
    }
    const y = e(...l);
    return r.interface.decodeFunctionResult(y, f);
  }, c = async (...l) => e(...l).constant ? await s(...l) : await i(...l);
  return Q(c, {
    name: r.interface.getFunctionName(t),
    _contract: r,
    _key: t,
    getFragment: e,
    estimateGas: a,
    populateTransaction: n,
    send: i,
    staticCall: s,
    staticCallResult: o
  }), Object.defineProperty(c, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const l = r.interface.getFunction(t);
      return R(l, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), l;
    }
  }), c;
}
function By(r, t) {
  const e = function(...s) {
    const i = r.interface.getEvent(t, s);
    return R(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: s }
    }), i;
  }, n = function(...s) {
    return new Py(r, e(...s), s);
  };
  return Q(n, {
    name: r.interface.getEventName(t),
    _contract: r,
    _key: t,
    getFragment: e
  }), Object.defineProperty(n, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const s = r.interface.getEvent(t);
      return R(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), s;
    }
  }), n;
}
const Xa = Symbol.for("_ethersInternal_contract"), jd = /* @__PURE__ */ new WeakMap();
function Uy(r, t) {
  jd.set(r[Xa], t);
}
function ne(r) {
  return jd.get(r[Xa]);
}
function Dy(r) {
  return r && typeof r == "object" && "getTopicFilter" in r && typeof r.getTopicFilter == "function" && r.fragment;
}
async function ll(r, t) {
  let e, n = null;
  if (Array.isArray(t)) {
    const i = function(a) {
      if (ot(a, 32))
        return a;
      const o = r.interface.getEvent(a);
      return A(o, "unknown fragment", "name", a), o.topicHash;
    };
    e = t.map((a) => a == null ? null : Array.isArray(a) ? a.map(i) : i(a));
  } else t === "*" ? e = [null] : typeof t == "string" ? ot(t, 32) ? e = [t] : (n = r.interface.getEvent(t), A(n, "unknown fragment", "event", t), e = [n.topicHash]) : Dy(t) ? e = await t.getTopicFilter() : "fragment" in t ? (n = t.fragment, e = [n.topicHash]) : A(!1, "unknown event name", "event", t);
  e = e.map((i) => {
    if (i == null)
      return null;
    if (Array.isArray(i)) {
      const a = Array.from(new Set(i.map((o) => o.toLowerCase())).values());
      return a.length === 1 ? a[0] : (a.sort(), a);
    }
    return i.toLowerCase();
  });
  const s = e.map((i) => i == null ? "null" : Array.isArray(i) ? i.join("|") : i).join("&");
  return { fragment: n, tag: s, topics: e };
}
async function Si(r, t) {
  const { subs: e } = ne(r);
  return e.get((await ll(r, t)).tag) || null;
}
async function ku(r, t, e) {
  const n = bn(r.runner);
  R(n, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: t });
  const { fragment: s, tag: i, topics: a } = await ll(r, e), { addr: o, subs: c } = ne(r);
  let l = c.get(i);
  if (!l) {
    const h = { address: o || r, topics: a }, u = (y) => {
      let m = s;
      if (m == null)
        try {
          m = r.interface.getEvent(y.topics[0]);
        } catch {
        }
      if (m) {
        const g = m, w = s ? r.interface.decodeEventLog(s, y.data, y.topics) : [];
        Ic(r, e, w, (E) => new Oy(r, E, e, g, y));
      } else
        Ic(r, e, [], (g) => new Fd(r, g, e, y));
    };
    let f = [];
    l = { tag: i, listeners: [], start: () => {
      f.length || f.push(n.on(h, u));
    }, stop: async () => {
      if (f.length == 0)
        return;
      let y = f;
      f = [], await Promise.all(y), n.off(h, u);
    } }, c.set(i, l);
  }
  return l;
}
let Nc = Promise.resolve();
async function Ly(r, t, e, n) {
  await Nc;
  const s = await Si(r, t);
  if (!s)
    return !1;
  const i = s.listeners.length;
  return s.listeners = s.listeners.filter(({ listener: a, once: o }) => {
    const c = Array.from(e);
    n && c.push(n(o ? null : a));
    try {
      a.call(r, ...c);
    } catch {
    }
    return !o;
  }), s.listeners.length === 0 && (s.stop(), ne(r).subs.delete(s.tag)), i > 0;
}
async function Ic(r, t, e, n) {
  try {
    await Nc;
  } catch {
  }
  const s = Ly(r, t, e, n);
  return Nc = s, await s;
}
const xa = ["then"];
var Yu;
Yu = Xa;
const Hi = class Hi {
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(t, e, n, s) {
    /**
     *  The target to connect to.
     *
     *  This can be an address, ENS name or any [[Addressable]], such as
     *  another contract. To get the resovled address, use the ``getAddress``
     *  method.
     */
    b(this, "target");
    /**
     *  The contract Interface.
     */
    b(this, "interface");
    /**
     *  The connected runner. This is generally a [[Provider]] or a
     *  [[Signer]], which dictates what operations are supported.
     *
     *  For example, a **Contract** connected to a [[Provider]] may
     *  only execute read-only operations.
     */
    b(this, "runner");
    /**
     *  All the Events available on this contract.
     */
    b(this, "filters");
    /**
     *  @_ignore:
     */
    b(this, Yu);
    /**
     *  The fallback or receive function if any.
     */
    b(this, "fallback");
    A(typeof t == "string" || Kh(t), "invalid value for Contract target", "target", t), n == null && (n = null);
    const i = Lr.from(e);
    Q(this, { target: t, runner: n, interface: i }), Object.defineProperty(this, Xa, { value: {} });
    let a, o = null, c = null;
    if (s) {
      const u = bn(n);
      c = new cl(this.interface, u, s);
    }
    let l = /* @__PURE__ */ new Map();
    if (typeof t == "string")
      if (ot(t))
        o = t, a = Promise.resolve(t);
      else {
        const u = $n(n, "resolveName");
        if (!bo(u))
          throw ht("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        a = u.resolveName(t).then((f) => {
          if (f == null)
            throw ht("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: t
            });
          return ne(this).addr = f, f;
        });
      }
    else
      a = t.getAddress().then((u) => {
        if (u == null)
          throw new Error("TODO");
        return ne(this).addr = u, u;
      });
    Uy(this, { addrPromise: a, addr: o, deployTx: c, subs: l });
    const h = new Proxy({}, {
      get: (u, f, y) => {
        if (typeof f == "symbol" || xa.indexOf(f) >= 0)
          return Reflect.get(u, f, y);
        try {
          return this.getEvent(f);
        } catch (m) {
          if (!Ft(m, "INVALID_ARGUMENT") || m.argument !== "key")
            throw m;
        }
      },
      has: (u, f) => xa.indexOf(f) >= 0 ? Reflect.has(u, f) : Reflect.has(u, f) || this.interface.hasEvent(String(f))
    });
    return Q(this, { filters: h }), Q(this, {
      fallback: i.receive || i.fallback ? Ry(this) : null
    }), new Proxy(this, {
      get: (u, f, y) => {
        if (typeof f == "symbol" || f in u || xa.indexOf(f) >= 0)
          return Reflect.get(u, f, y);
        try {
          return u.getFunction(f);
        } catch (m) {
          if (!Ft(m, "INVALID_ARGUMENT") || m.argument !== "key")
            throw m;
        }
      },
      has: (u, f) => typeof f == "symbol" || f in u || xa.indexOf(f) >= 0 ? Reflect.has(u, f) : u.interface.hasFunction(f)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(t) {
    return new Hi(this.target, this.interface, t);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(t) {
    return new Hi(t, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await ne(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const t = bn(this.runner);
    R(t, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
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
    const e = bn(this.runner);
    return R(e != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" }), new Promise((n, s) => {
      const i = async () => {
        try {
          if (await this.getDeployedCode() != null)
            return n(this);
          e.once("block", i);
        } catch (a) {
          s(a);
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
    return ne(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(t) {
    return typeof t != "string" && (t = t.format()), Sy(this, t);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(t) {
    return typeof t != "string" && (t = t.format()), By(this, t);
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
  async queryFilter(t, e, n) {
    e == null && (e = 0), n == null && (n = "latest");
    const { addr: s, addrPromise: i } = ne(this), a = s || await i, { fragment: o, topics: c } = await ll(this, t), l = { address: a, topics: c, fromBlock: e, toBlock: n }, h = bn(this.runner);
    return R(h, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await h.getLogs(l)).map((u) => {
      let f = o;
      if (f == null)
        try {
          f = this.interface.getEvent(u.topics[0]);
        } catch {
        }
      if (f)
        try {
          return new ol(u, this.interface, f);
        } catch (y) {
          return new Ld(u, y);
        }
      return new ua(u, h);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(t, e) {
    const n = await ku(this, "on", t);
    return n.listeners.push({ listener: e, once: !1 }), n.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(t, e) {
    const n = await ku(this, "once", t);
    return n.listeners.push({ listener: e, once: !0 }), n.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(t, ...e) {
    return await Ic(this, t, e, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(t) {
    if (t) {
      const s = await Si(this, t);
      return s ? s.listeners.length : 0;
    }
    const { subs: e } = ne(this);
    let n = 0;
    for (const { listeners: s } of e.values())
      n += s.length;
    return n;
  }
  /**
   *  Resolves to the listeners subscribed to %%event%% or all listeners
   *  if unspecified.
   */
  async listeners(t) {
    if (t) {
      const s = await Si(this, t);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: e } = ne(this);
    let n = [];
    for (const { listeners: s } of e.values())
      n = n.concat(s.map(({ listener: i }) => i));
    return n;
  }
  /**
   *  Remove the %%listener%% from the listeners for %%event%% or remove
   *  all listeners if unspecified.
   */
  async off(t, e) {
    const n = await Si(this, t);
    if (!n)
      return this;
    if (e) {
      const s = n.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && n.listeners.splice(s, 1);
    }
    return (e == null || n.listeners.length === 0) && (n.stop(), ne(this).subs.delete(n.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(t) {
    if (t) {
      const e = await Si(this, t);
      if (!e)
        return this;
      e.stop(), ne(this).subs.delete(e.tag);
    } else {
      const { subs: e } = ne(this);
      for (const { tag: n, stop: s } of e.values())
        s(), e.delete(n);
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
    class e extends Hi {
      constructor(s, i = null) {
        super(s, t, i);
      }
    }
    return e;
  }
  /**
   *  Create a new BaseContract with a specified Interface.
   */
  static from(t, e, n) {
    return n == null && (n = null), new this(t, e, n);
  }
};
let Tc = Hi;
function Fy() {
  return Tc;
}
class zn extends Fy() {
}
function Go(r) {
  return r.match(/^ipfs:\/\/ipfs\//i) ? r = r.substring(12) : r.match(/^ipfs:\/\//i) ? r = r.substring(7) : A(!1, "unsupported IPFS format", "link", r), `https://gateway.ipfs.io/ipfs/${r}`;
}
class My {
  /**
   *  Creates a new **MulticoinProviderPluing** for %%name%%.
   */
  constructor(t) {
    /**
     *  The name.
     */
    b(this, "name");
    Q(this, { name: t });
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
const Qd = new RegExp("^(ipfs)://(.*)$", "i"), Ru = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  Qd,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
var Qr, Un, zr, us, ao, zd;
const ys = class ys {
  constructor(t, e, n) {
    x(this, zr);
    /**
     *  The connected provider.
     */
    b(this, "provider");
    /**
     *  The address of the resolver.
     */
    b(this, "address");
    /**
     *  The name this resolver was resolved against.
     */
    b(this, "name");
    // For EIP-2544 names, the ancestor that provided the resolver
    x(this, Qr);
    x(this, Un);
    Q(this, { provider: t, address: e, name: n }), p(this, Qr, null), p(this, Un, new zn(e, [
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
    return d(this, Qr) == null && p(this, Qr, (async () => {
      try {
        return await d(this, Un).supportsInterface("0x9061b923");
      } catch (t) {
        if (Ft(t, "CALL_EXCEPTION"))
          return !1;
        throw p(this, Qr, null), t;
      }
    })()), await d(this, Qr);
  }
  /**
   *  Resolves to the address for %%coinType%% or null if the
   *  provided %%coinType%% has not been configured.
   */
  async getAddress(t) {
    if (t == null && (t = 60), t === 60)
      try {
        const i = await B(this, zr, us).call(this, "addr(bytes32)");
        return i == null || i === gi ? null : i;
      } catch (i) {
        if (Ft(i, "CALL_EXCEPTION"))
          return null;
        throw i;
      }
    if (t >= 0 && t < 2147483648) {
      let i = t + 2147483648;
      const a = await B(this, zr, us).call(this, "addr(bytes32,uint)", [i]);
      if (ot(a, 20))
        return nt(a);
    }
    let e = null;
    for (const i of this.provider.plugins)
      if (i instanceof My && i.supportsCoinType(t)) {
        e = i;
        break;
      }
    if (e == null)
      return null;
    const n = await B(this, zr, us).call(this, "addr(bytes32,uint)", [t]);
    if (n == null || n === "0x")
      return null;
    const s = await e.decodeAddress(t, n);
    if (s != null)
      return s;
    R(!1, "invalid coin data", "UNSUPPORTED_OPERATION", {
      operation: `getAddress(${t})`,
      info: { coinType: t, data: n }
    });
  }
  /**
   *  Resolves to the EIP-634 text record for %%key%%, or ``null``
   *  if unconfigured.
   */
  async getText(t) {
    const e = await B(this, zr, us).call(this, "text(bytes32,string)", [t]);
    return e == null || e === "0x" ? null : e;
  }
  /**
   *  Rsolves to the content-hash or ``null`` if unconfigured.
   */
  async getContentHash() {
    const t = await B(this, zr, us).call(this, "contenthash(bytes32)");
    if (t == null || t === "0x")
      return null;
    const e = t.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
    if (e) {
      const s = e[1] === "e3010170" ? "ipfs" : "ipns", i = parseInt(e[4], 16);
      if (e[5].length === i * 2)
        return `${s}://${_f("0x" + e[2])}`;
    }
    const n = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
    if (n && n[1].length === 64)
      return `bzz://${n[1]}`;
    R(!1, "invalid or unsupported content hash data", "UNSUPPORTED_OPERATION", {
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
      for (let n = 0; n < Ru.length; n++) {
        const s = e.match(Ru[n]);
        if (s == null)
          continue;
        const i = s[1].toLowerCase();
        switch (i) {
          case "https":
          case "data":
            return t.push({ type: "url", value: e }), { linkage: t, url: e };
          case "ipfs": {
            const a = Go(e);
            return t.push({ type: "ipfs", value: e }), t.push({ type: "url", value: a }), { linkage: t, url: a };
          }
          case "erc721":
          case "erc1155": {
            const a = i === "erc721" ? "tokenURI(uint256)" : "uri(uint256)";
            t.push({ type: i, value: e });
            const o = await this.getAddress();
            if (o == null)
              return t.push({ type: "!owner", value: "" }), { url: null, linkage: t };
            const c = (s[2] || "").split("/");
            if (c.length !== 2)
              return t.push({ type: `!${i}caip`, value: s[2] || "" }), { url: null, linkage: t };
            const l = c[1], h = new zn(c[0], [
              // ERC-721
              "function tokenURI(uint) view returns (string)",
              "function ownerOf(uint) view returns (address)",
              // ERC-1155
              "function uri(uint) view returns (string)",
              "function balanceOf(address, uint256) view returns (uint)"
            ], this.provider);
            if (i === "erc721") {
              const g = await h.ownerOf(l);
              if (o !== g)
                return t.push({ type: "!owner", value: g }), { url: null, linkage: t };
              t.push({ type: "owner", value: g });
            } else if (i === "erc1155") {
              const g = await h.balanceOf(o, l);
              if (!g)
                return t.push({ type: "!balance", value: "0" }), { url: null, linkage: t };
              t.push({ type: "balance", value: g.toString() });
            }
            let u = await h[a](l);
            if (u == null || u === "0x")
              return t.push({ type: "!metadata-url", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata-url-base", value: u }), i === "erc1155" && (u = u.replace("{id}", en(l, 32).substring(2)), t.push({ type: "metadata-url-expanded", value: u })), u.match(/^ipfs:/i) && (u = Go(u)), t.push({ type: "metadata-url", value: u });
            let f = {};
            const y = await new Nr(u).send();
            y.assertOk();
            try {
              f = y.bodyJson;
            } catch {
              try {
                t.push({ type: "!metadata", value: y.bodyText });
              } catch {
                const g = y.body;
                return g && t.push({ type: "!metadata", value: H(g) }), { url: null, linkage: t };
              }
              return { url: null, linkage: t };
            }
            if (!f)
              return t.push({ type: "!metadata", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata", value: JSON.stringify(f) });
            let m = f.image;
            if (typeof m != "string")
              return t.push({ type: "!imageUrl", value: "" }), { url: null, linkage: t };
            if (!m.match(/^(https:\/\/|data:)/i)) {
              if (m.match(Qd) == null)
                return t.push({ type: "!imageUrl-ipfs", value: m }), { url: null, linkage: t };
              t.push({ type: "imageUrl-ipfs", value: m }), m = Go(m);
            }
            return t.push({ type: "url", value: m }), { linkage: t, url: m };
          }
        }
      }
    } catch {
    }
    return { linkage: t, url: null };
  }
  static async getEnsAddress(t) {
    const e = await t.getNetwork(), n = e.getPlugin("org.ethers.plugins.network.Ens");
    return R(n, "network does not support ENS", "UNSUPPORTED_OPERATION", {
      operation: "getEnsAddress",
      info: { network: e }
    }), n.address;
  }
  /**
   *  Resolve to the ENS resolver for %%name%% using %%provider%% or
   *  ``null`` if unconfigured.
   */
  static async fromName(t, e) {
    var s;
    let n = e;
    for (; ; ) {
      if (n === "" || n === "." || e !== "eth" && n === "eth")
        return null;
      const i = await B(s = ys, ao, zd).call(s, t, n);
      if (i != null) {
        const a = new ys(t, i, e);
        return n !== e && !await a.supportsWildcard() ? null : a;
      }
      n = n.split(".").slice(1).join(".");
    }
  }
};
Qr = new WeakMap(), Un = new WeakMap(), zr = new WeakSet(), us = async function(t, e) {
  e = (e || []).slice();
  const n = d(this, Un).interface;
  e.unshift(Ec(this.name));
  let s = null;
  await this.supportsWildcard() && (s = n.getFunction(t), R(s, "missing fragment", "UNKNOWN_ERROR", {
    info: { funcName: t }
  }), e = [
    Bm(this.name, 255),
    n.encodeFunctionData(s, e)
  ], t = "resolve(bytes,bytes)"), e.push({
    enableCcipRead: !0
  });
  try {
    const i = await d(this, Un)[t](...e);
    return s ? n.decodeFunctionResult(s, i)[0] : i;
  } catch (i) {
    if (!Ft(i, "CALL_EXCEPTION"))
      throw i;
  }
  return null;
}, ao = new WeakSet(), zd = async function(t, e) {
  const n = await ys.getEnsAddress(t);
  try {
    const s = await new zn(n, [
      "function resolver(bytes32) view returns (address)"
    ], t).resolver(Ec(e), {
      enableCcipRead: !0
    });
    return s === gi ? null : s;
  } catch (s) {
    throw s;
  }
  return null;
}, x(ys, ao);
let $a = ys;
const Su = BigInt(0);
function tt(r, t) {
  return function(e) {
    return e == null ? t : r(e);
  };
}
function Eo(r, t) {
  return (e) => {
    if (t && e == null)
      return null;
    if (!Array.isArray(e))
      throw new Error("not an array");
    return e.map((n) => r(n));
  };
}
function ha(r, t) {
  return (e) => {
    const n = {};
    for (const s in r) {
      let i = s;
      if (t && s in t && !(i in e)) {
        for (const a of t[s])
          if (a in e) {
            i = a;
            break;
          }
      }
      try {
        const a = r[s](e[i]);
        a !== void 0 && (n[s] = a);
      } catch (a) {
        const o = a instanceof Error ? a.message : "not-an-error";
        R(!1, `invalid value for value.${s} (${o})`, "BAD_DATA", { value: e });
      }
    }
    return n;
  };
}
function Hy(r) {
  switch (r) {
    case !0:
    case "true":
      return !0;
    case !1:
    case "false":
      return !1;
  }
  A(!1, `invalid boolean; ${JSON.stringify(r)}`, "value", r);
}
function wi(r) {
  return A(ot(r, !0), "invalid data", "value", r), r;
}
function kt(r) {
  return A(ot(r, 32), "invalid hash", "value", r), r;
}
const Gy = ha({
  address: nt,
  blockHash: kt,
  blockNumber: W,
  data: wi,
  index: W,
  removed: tt(Hy, !1),
  topics: Eo(kt),
  transactionHash: kt,
  transactionIndex: W
}, {
  index: ["logIndex"]
});
function Vy(r) {
  return Gy(r);
}
const _y = ha({
  hash: tt(kt),
  parentHash: kt,
  parentBeaconBlockRoot: tt(kt, null),
  number: W,
  timestamp: W,
  nonce: tt(wi),
  difficulty: G,
  gasLimit: G,
  gasUsed: G,
  stateRoot: tt(kt, null),
  receiptsRoot: tt(kt, null),
  blobGasUsed: tt(G, null),
  excessBlobGas: tt(G, null),
  miner: tt(nt),
  prevRandao: tt(kt, null),
  extraData: wi,
  baseFeePerGas: tt(G)
}, {
  prevRandao: ["mixHash"]
});
function jy(r) {
  const t = _y(r);
  return t.transactions = r.transactions.map((e) => typeof e == "string" ? e : Jd(e)), t;
}
const Qy = ha({
  transactionIndex: W,
  blockNumber: W,
  transactionHash: kt,
  address: nt,
  topics: Eo(kt),
  data: wi,
  index: W,
  blockHash: kt
}, {
  index: ["logIndex"]
});
function zy(r) {
  return Qy(r);
}
const Jy = ha({
  to: tt(nt, null),
  from: tt(nt, null),
  contractAddress: tt(nt, null),
  // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
  index: W,
  root: tt(H),
  gasUsed: G,
  blobGasUsed: tt(G, null),
  logsBloom: tt(wi),
  blockHash: kt,
  hash: kt,
  logs: Eo(zy),
  blockNumber: W,
  //confirmations: allowNull(getNumber, null),
  cumulativeGasUsed: G,
  effectiveGasPrice: tt(G),
  blobGasPrice: tt(G, null),
  status: tt(W),
  type: tt(W, 0)
}, {
  effectiveGasPrice: ["gasPrice"],
  hash: ["transactionHash"],
  index: ["transactionIndex"]
});
function Ky(r) {
  return Jy(r);
}
function Jd(r) {
  r.to && G(r.to) === Su && (r.to = "0x0000000000000000000000000000000000000000");
  const t = ha({
    hash: kt,
    // Some nodes do not return this, usually test nodes (like Ganache)
    index: tt(W, void 0),
    type: (e) => e === "0x" || e == null ? 0 : W(e),
    accessList: tt(ns, null),
    blobVersionedHashes: tt(Eo(kt, !0), null),
    blockHash: tt(kt, null),
    blockNumber: tt(W, null),
    transactionIndex: tt(W, null),
    from: nt,
    // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas) must be set
    gasPrice: tt(G),
    maxPriorityFeePerGas: tt(G),
    maxFeePerGas: tt(G),
    maxFeePerBlobGas: tt(G, null),
    gasLimit: G,
    to: tt(nt, null),
    value: G,
    nonce: W,
    data: wi,
    creates: tt(nt, null),
    chainId: tt(G, null)
  }, {
    data: ["input"],
    gasLimit: ["gas"],
    index: ["transactionIndex"]
  })(r);
  if (t.to == null && t.creates == null && (t.creates = Lg(t)), (r.type === 1 || r.type === 2) && r.accessList == null && (t.accessList = []), r.signature ? t.signature = Ae.from(r.signature) : t.signature = Ae.from(r), t.chainId == null) {
    const e = t.signature.legacyChainId;
    e != null && (t.chainId = e);
  }
  return t.blockHash && G(t.blockHash) === Su && (t.blockHash = null), t;
}
const qy = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class da {
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(t) {
    /**
     *  The name of the plugin.
     *
     *  It is recommended to use reverse-domain-notation, which permits
     *  unique names with a known authority as well as hierarchal entries.
     */
    b(this, "name");
    Q(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new da(this.name);
  }
}
class vo extends da {
  /**
   *  Creates a new GasCostPlugin from %%effectiveBlock%% until the
   *  latest block or another GasCostPlugin supercedes that block number,
   *  with the associated %%costs%%.
   */
  constructor(e, n) {
    e == null && (e = 0);
    super(`org.ethers.network.plugins.GasCost#${e || 0}`);
    /**
     *  The block number to treat these values as valid from.
     *
     *  This allows a hardfork to have updated values included as well as
     *  mulutiple hardforks to be supported.
     */
    b(this, "effectiveBlock");
    /**
     *  The transactions base fee.
     */
    b(this, "txBase");
    /**
     *  The fee for creating a new account.
     */
    b(this, "txCreate");
    /**
     *  The fee per zero-byte in the data.
     */
    b(this, "txDataZero");
    /**
     *  The fee per non-zero-byte in the data.
     */
    b(this, "txDataNonzero");
    /**
     *  The fee per storage key in the [[link-eip-2930]] access list.
     */
    b(this, "txAccessListStorageKey");
    /**
     *  The fee per address in the [[link-eip-2930]] access list.
     */
    b(this, "txAccessListAddress");
    const s = { effectiveBlock: e };
    function i(a, o) {
      let c = (n || {})[a];
      c == null && (c = o), A(typeof c == "number", `invalud value for ${a}`, "costs", n), s[a] = c;
    }
    i("txBase", 21e3), i("txCreate", 32e3), i("txDataZero", 4), i("txDataNonzero", 16), i("txAccessListStorageKey", 1900), i("txAccessListAddress", 2400), Q(this, s);
  }
  clone() {
    return new vo(this.effectiveBlock, this);
  }
}
class xo extends da {
  /**
   *  Creates a new **EnsPlugin** connected to %%address%% on the
   *  %%targetNetwork%%. The default ENS address and mainnet is used
   *  if unspecified.
   */
  constructor(e, n) {
    super("org.ethers.plugins.network.Ens");
    /**
     *  The ENS Registrty Contract address.
     */
    b(this, "address");
    /**
     *  The chain ID that the ENS contract lives on.
     */
    b(this, "targetNetwork");
    Q(this, {
      address: e || qy,
      targetNetwork: n ?? 1
    });
  }
  clone() {
    return new xo(this.address, this.targetNetwork);
  }
}
var na, sa;
class Wy extends da {
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(e, n) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    x(this, na);
    x(this, sa);
    p(this, na, e), p(this, sa, n);
  }
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return d(this, na);
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return d(this, sa);
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
na = new WeakMap(), sa = new WeakMap();
const Vo = /* @__PURE__ */ new Map();
var Ws, Zs, Jr;
const ws = class ws {
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, e) {
    x(this, Ws);
    x(this, Zs);
    x(this, Jr);
    p(this, Ws, t), p(this, Zs, G(e)), p(this, Jr, /* @__PURE__ */ new Map());
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
    return d(this, Ws);
  }
  set name(t) {
    p(this, Ws, t);
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return d(this, Zs);
  }
  set chainId(t) {
    p(this, Zs, G(t, "chainId"));
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
        return this.chainId === G(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === G(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === G(t.chainId);
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
    return Array.from(d(this, Jr).values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (d(this, Jr).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return d(this, Jr).set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return d(this, Jr).get(t) || null;
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
    const t = new ws(this.name, this.chainId);
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
    const e = this.getPlugin("org.ethers.plugins.network.GasCost") || new vo();
    let n = e.txBase;
    if (t.to == null && (n += e.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? n += e.txDataZero : n += e.txDataNonzero;
    if (t.accessList) {
      const s = ns(t.accessList);
      for (const i in s)
        n += e.txAccessListAddress + e.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return n;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (Zy(), t == null)
      return ws.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const e = Vo.get(t);
      if (e)
        return e();
      if (typeof t == "bigint")
        return new ws("unknown", t);
      A(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      A(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const e = new ws(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && e.attachPlugin(new xo(t.ensAddress, t.ensNetwork)), e;
    }
    A(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, e) {
    typeof t == "number" && (t = BigInt(t));
    const n = Vo.get(t);
    n && A(!1, `conflicting network for ${JSON.stringify(n.name)}`, "nameOrChainId", t), Vo.set(t, e);
  }
};
Ws = new WeakMap(), Zs = new WeakMap(), Jr = new WeakMap();
let We = ws;
function Bu(r, t) {
  const e = String(r);
  if (!e.match(/^[0-9.]+$/))
    throw new Error(`invalid gwei value: ${r}`);
  const n = e.split(".");
  if (n.length === 1 && n.push(""), n.length !== 2)
    throw new Error(`invalid gwei value: ${r}`);
  for (; n[1].length < t; )
    n[1] += "0";
  if (n[1].length > 9) {
    let s = BigInt(n[1].substring(0, 9));
    n[1].substring(9).match(/^0+$/) || s++, n[1] = s.toString();
  }
  return BigInt(n[0] + n[1]);
}
function Uu(r) {
  return new Wy(r, async (t, e, n) => {
    n.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, a] = await Promise.all([
        n.send(),
        t()
      ]);
      s = i;
      const o = s.bodyJson.standard;
      return {
        gasPrice: a.gasPrice,
        maxFeePerGas: Bu(o.maxFee, 9),
        maxPriorityFeePerGas: Bu(o.maxPriorityFee, 9)
      };
    } catch (i) {
      R(!1, `error encountered with polygon gas station (${JSON.stringify(n.url)})`, "SERVER_ERROR", { request: n, response: s, error: i });
    }
  });
}
let Du = !1;
function Zy() {
  if (Du)
    return;
  Du = !0;
  function r(t, e, n) {
    const s = function() {
      const i = new We(t, e);
      return n.ensNetwork != null && i.attachPlugin(new xo(null, n.ensNetwork)), i.attachPlugin(new vo()), (n.plugins || []).forEach((a) => {
        i.attachPlugin(a);
      }), i;
    };
    We.register(t, s), We.register(e, s), n.altNames && n.altNames.forEach((i) => {
      We.register(i, s);
    });
  }
  r("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), r("ropsten", 3, { ensNetwork: 3 }), r("rinkeby", 4, { ensNetwork: 4 }), r("goerli", 5, { ensNetwork: 5 }), r("kovan", 42, { ensNetwork: 42 }), r("sepolia", 11155111, { ensNetwork: 11155111 }), r("holesky", 17e3, { ensNetwork: 17e3 }), r("classic", 61, {}), r("classicKotti", 6, {}), r("arbitrum", 42161, {
    ensNetwork: 1
  }), r("arbitrum-goerli", 421613, {}), r("arbitrum-sepolia", 421614, {}), r("base", 8453, { ensNetwork: 1 }), r("base-goerli", 84531, {}), r("base-sepolia", 84532, {}), r("bnb", 56, { ensNetwork: 1 }), r("bnbt", 97, {}), r("linea", 59144, { ensNetwork: 1 }), r("linea-goerli", 59140, {}), r("linea-sepolia", 59141, {}), r("matic", 137, {
    ensNetwork: 1,
    plugins: [
      Uu("https://gasstation.polygon.technology/v2")
    ]
  }), r("matic-amoy", 80002, {}), r("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      Uu("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), r("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), r("optimism-goerli", 420, {}), r("optimism-sepolia", 11155420, {}), r("xdai", 100, { ensNetwork: 1 });
}
function Cc(r) {
  return JSON.parse(JSON.stringify(r));
}
var pr, de, Kr, Qe, Ys, Ua;
class Yy {
  /**
   *  Create a new **PollingBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    x(this, Ys);
    x(this, pr);
    x(this, de);
    x(this, Kr);
    // The most recent block we have scanned for events. The value -2
    // indicates we still need to fetch an initial block number
    x(this, Qe);
    p(this, pr, t), p(this, de, null), p(this, Kr, 4e3), p(this, Qe, -2);
  }
  /**
   *  The polling interval.
   */
  get pollingInterval() {
    return d(this, Kr);
  }
  set pollingInterval(t) {
    p(this, Kr, t);
  }
  start() {
    d(this, de) || (p(this, de, d(this, pr)._setTimeout(B(this, Ys, Ua).bind(this), d(this, Kr))), B(this, Ys, Ua).call(this));
  }
  stop() {
    d(this, de) && (d(this, pr)._clearTimeout(d(this, de)), p(this, de, null));
  }
  pause(t) {
    this.stop(), t && p(this, Qe, -2);
  }
  resume() {
    this.start();
  }
}
pr = new WeakMap(), de = new WeakMap(), Kr = new WeakMap(), Qe = new WeakMap(), Ys = new WeakSet(), Ua = async function() {
  try {
    const t = await d(this, pr).getBlockNumber();
    if (d(this, Qe) === -2) {
      p(this, Qe, t);
      return;
    }
    if (t !== d(this, Qe)) {
      for (let e = d(this, Qe) + 1; e <= t; e++) {
        if (d(this, de) == null)
          return;
        await d(this, pr).emit("block", e);
      }
      p(this, Qe, t);
    }
  } catch {
  }
  d(this, de) != null && p(this, de, d(this, pr)._setTimeout(B(this, Ys, Ua).bind(this), d(this, Kr)));
};
var Dn, Ln, qr;
class ul {
  /**
   *  Create a new **OnBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    x(this, Dn);
    x(this, Ln);
    x(this, qr);
    p(this, Dn, t), p(this, qr, !1), p(this, Ln, (e) => {
      this._poll(e, d(this, Dn));
    });
  }
  /**
   *  Called on every new block.
   */
  async _poll(t, e) {
    throw new Error("sub-classes must override this");
  }
  start() {
    d(this, qr) || (p(this, qr, !0), d(this, Ln).call(this, -2), d(this, Dn).on("block", d(this, Ln)));
  }
  stop() {
    d(this, qr) && (p(this, qr, !1), d(this, Dn).off("block", d(this, Ln)));
  }
  pause(t) {
    this.stop();
  }
  resume() {
    this.start();
  }
}
Dn = new WeakMap(), Ln = new WeakMap(), qr = new WeakMap();
var Xs, gr;
class Xy extends ul {
  constructor(e, n) {
    super(e);
    x(this, Xs);
    x(this, gr);
    p(this, Xs, n), p(this, gr, -2);
  }
  pause(e) {
    e && p(this, gr, -2), super.pause(e);
  }
  async _poll(e, n) {
    const s = await n.getBlock(d(this, Xs));
    s != null && (d(this, gr) === -2 ? p(this, gr, s.number) : s.number > d(this, gr) && (n.emit(d(this, Xs), s.number), p(this, gr, s.number)));
  }
}
Xs = new WeakMap(), gr = new WeakMap();
var oo;
class $y extends ul {
  constructor(e, n) {
    super(e);
    x(this, oo);
    p(this, oo, Cc(n));
  }
  async _poll(e, n) {
    throw new Error("@TODO");
  }
}
oo = new WeakMap();
var $s;
class t0 extends ul {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%hash%%.
   */
  constructor(e, n) {
    super(e);
    x(this, $s);
    p(this, $s, n);
  }
  async _poll(e, n) {
    const s = await n.getTransactionReceipt(d(this, $s));
    s && n.emit(d(this, $s), s);
  }
}
$s = new WeakMap();
var mr, ti, ei, Wr, fe, co, Kd;
class hl {
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%filter%%.
   */
  constructor(t, e) {
    x(this, co);
    x(this, mr);
    x(this, ti);
    x(this, ei);
    x(this, Wr);
    // The most recent block we have scanned for events. The value -2
    // indicates we still need to fetch an initial block number
    x(this, fe);
    p(this, mr, t), p(this, ti, Cc(e)), p(this, ei, B(this, co, Kd).bind(this)), p(this, Wr, !1), p(this, fe, -2);
  }
  start() {
    d(this, Wr) || (p(this, Wr, !0), d(this, fe) === -2 && d(this, mr).getBlockNumber().then((t) => {
      p(this, fe, t);
    }), d(this, mr).on("block", d(this, ei)));
  }
  stop() {
    d(this, Wr) && (p(this, Wr, !1), d(this, mr).off("block", d(this, ei)));
  }
  pause(t) {
    this.stop(), t && p(this, fe, -2);
  }
  resume() {
    this.start();
  }
}
mr = new WeakMap(), ti = new WeakMap(), ei = new WeakMap(), Wr = new WeakMap(), fe = new WeakMap(), co = new WeakSet(), Kd = async function(t) {
  if (d(this, fe) === -2)
    return;
  const e = Cc(d(this, ti));
  e.fromBlock = d(this, fe) + 1, e.toBlock = t;
  const n = await d(this, mr).getLogs(e);
  if (n.length === 0) {
    d(this, fe) < t - 60 && p(this, fe, t - 60);
    return;
  }
  for (const s of n)
    d(this, mr).emit(d(this, ti), s), p(this, fe, s.blockNumber);
};
const e0 = BigInt(2), r0 = 10;
function Na(r) {
  return r && typeof r.then == "function";
}
function Da(r, t) {
  return r + ":" + JSON.stringify(t, (e, n) => {
    if (n == null)
      return "null";
    if (typeof n == "bigint")
      return `bigint:${n.toString()}`;
    if (typeof n == "string")
      return n.toLowerCase();
    if (typeof n == "object" && !Array.isArray(n)) {
      const s = Object.keys(n);
      return s.sort(), s.reduce((i, a) => (i[a] = n[a], i), {});
    }
    return n;
  });
}
class qd {
  /**
   *  Create a new UnmanagedSubscriber with %%name%%.
   */
  constructor(t) {
    /**
     *  The name fof the event.
     */
    b(this, "name");
    Q(this, { name: t });
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
function n0(r) {
  return JSON.parse(JSON.stringify(r));
}
function Oc(r) {
  return r = Array.from(new Set(r).values()), r.sort(), r;
}
async function _o(r, t) {
  if (r == null)
    throw new Error("invalid event");
  if (Array.isArray(r) && (r = { topics: r }), typeof r == "string")
    switch (r) {
      case "block":
      case "debug":
      case "error":
      case "finalized":
      case "network":
      case "pending":
      case "safe":
        return { type: r, tag: r };
    }
  if (ot(r, 32)) {
    const e = r.toLowerCase();
    return { type: "transaction", tag: Da("tx", { hash: e }), hash: e };
  }
  if (r.orphan) {
    const e = r;
    return { type: "orphan", tag: Da("orphan", e), filter: n0(e) };
  }
  if (r.address || r.topics) {
    const e = r, n = {
      topics: (e.topics || []).map((s) => s == null ? null : Array.isArray(s) ? Oc(s.map((i) => i.toLowerCase())) : s.toLowerCase())
    };
    if (e.address) {
      const s = [], i = [], a = (o) => {
        ot(o) ? s.push(o) : i.push((async () => {
          s.push(await Jt(o, t));
        })());
      };
      Array.isArray(e.address) ? e.address.forEach(a) : a(e.address), i.length && await Promise.all(i), n.address = Oc(s.map((o) => o.toLowerCase()));
    }
    return { filter: n, tag: Da("event", n), type: "event" };
  }
  A(!1, "unknown ProviderEvent", "event", r);
}
function jo() {
  return (/* @__PURE__ */ new Date()).getTime();
}
const s0 = {
  cacheTimeout: 250,
  pollingInterval: 4e3
};
var Dt, Zr, Lt, ri, oe, Fn, Yr, yr, ia, pe, ni, si, Z, re, Pc, kc, Bi, Rc, Ui, La;
class i0 {
  /**
   *  Create a new **AbstractProvider** connected to %%network%%, or
   *  use the various network detection capabilities to discover the
   *  [[Network]] if necessary.
   */
  constructor(t, e) {
    x(this, Z);
    x(this, Dt);
    x(this, Zr);
    // null=unpaused, true=paused+dropWhilePaused, false=paused
    x(this, Lt);
    x(this, ri);
    x(this, oe);
    x(this, Fn);
    x(this, Yr);
    // The most recent block number if running an event or -1 if no "block" event
    x(this, yr);
    x(this, ia);
    x(this, pe);
    x(this, ni);
    x(this, si);
    if (p(this, si, Object.assign({}, s0, e || {})), t === "any")
      p(this, Fn, !0), p(this, oe, null);
    else if (t) {
      const n = We.from(t);
      p(this, Fn, !1), p(this, oe, Promise.resolve(n)), setTimeout(() => {
        this.emit("network", n, null);
      }, 0);
    } else
      p(this, Fn, !1), p(this, oe, null);
    p(this, yr, -1), p(this, Yr, /* @__PURE__ */ new Map()), p(this, Dt, /* @__PURE__ */ new Map()), p(this, Zr, /* @__PURE__ */ new Map()), p(this, Lt, null), p(this, ri, !1), p(this, ia, 1), p(this, pe, /* @__PURE__ */ new Map()), p(this, ni, !1);
  }
  get pollingInterval() {
    return d(this, si).pollingInterval;
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
    return Array.from(d(this, Zr).values());
  }
  /**
   *  Attach a new plug-in.
   */
  attachPlugin(t) {
    if (d(this, Zr).get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return d(this, Zr).set(t.name, t.connect(this)), this;
  }
  /**
   *  Get a plugin by name.
   */
  getPlugin(t) {
    return d(this, Zr).get(t) || null;
  }
  /**
   *  Prevent any CCIP-read operation, regardless of whether requested
   *  in a [[call]] using ``enableCcipRead``.
   */
  get disableCcipRead() {
    return d(this, ni);
  }
  set disableCcipRead(t) {
    p(this, ni, !!t);
  }
  /**
   *  Resolves to the data for executing the CCIP-read operations.
   */
  async ccipReadFetch(t, e, n) {
    if (this.disableCcipRead || n.length === 0 || t.to == null)
      return null;
    const s = t.to.toLowerCase(), i = e.toLowerCase(), a = [];
    for (let o = 0; o < n.length; o++) {
      const c = n[o], l = c.replace("{sender}", s).replace("{data}", i), h = new Nr(l);
      c.indexOf("{data}") === -1 && (h.body = { data: i, sender: s }), this.emit("debug", { action: "sendCcipReadFetchRequest", request: h, index: o, urls: n });
      let u = "unknown error";
      const f = await h.send();
      try {
        const y = f.bodyJson;
        if (y.data)
          return this.emit("debug", { action: "receiveCcipReadFetchResult", request: h, result: y }), y.data;
        y.message && (u = y.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: h, result: y });
      } catch {
      }
      R(f.statusCode < 400 || f.statusCode >= 500, `response not found during CCIP fetch: ${u}`, "OFFCHAIN_FAULT", { reason: "404_MISSING_RESOURCE", transaction: t, info: { url: c, errorMessage: u } }), a.push(u);
    }
    R(!1, `error encountered during CCIP fetch: ${a.map((o) => JSON.stringify(o)).join(", ")}`, "OFFCHAIN_FAULT", {
      reason: "500_SERVER_ERROR",
      transaction: t,
      info: { urls: n, errorMessages: a }
    });
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a block before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Block]].
   */
  _wrapBlock(t, e) {
    return new Ny(jy(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a log before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Log]].
   */
  _wrapLog(t, e) {
    return new ua(Vy(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  receipt before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionReceipt]].
   */
  _wrapTransactionReceipt(t, e) {
    return new Bd(Ky(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  response before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionResponse]].
   */
  _wrapTransactionResponse(t, e) {
    return new Ki(Jd(t), this);
  }
  /**
   *  Resolves to the Network, forcing a network detection using whatever
   *  technique the sub-class requires.
   *
   *  Sub-classes **must** override this.
   */
  _detectNetwork() {
    R(!1, "sub-classes must implement this", "UNSUPPORTED_OPERATION", {
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
    R(!1, `unsupported method: ${t.method}`, "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: t
    });
  }
  // State
  async getBlockNumber() {
    const t = W(await B(this, Z, re).call(this, { method: "getBlockNumber" }), "%response");
    return d(this, yr) >= 0 && p(this, yr, t), t;
  }
  /**
   *  Returns or resolves to the address for %%address%%, resolving ENS
   *  names and [[Addressable]] objects and returning if already an
   *  address.
   */
  _getAddress(t) {
    return Jt(t, this);
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
    if (ot(t))
      return ot(t, 32) ? t : ps(t);
    if (typeof t == "bigint" && (t = W(t, "blockTag")), typeof t == "number")
      return t >= 0 ? ps(t) : d(this, yr) >= 0 ? ps(d(this, yr) + t) : this.getBlockNumber().then((e) => ps(e + t));
    A(!1, "invalid blockTag", "blockTag", t);
  }
  /**
   *  Returns or resolves to a filter for %%filter%%, resolving any ENS
   *  names or [[Addressable]] object and returning if already a valid
   *  filter.
   */
  _getFilter(t) {
    const e = (t.topics || []).map((c) => c == null ? null : Array.isArray(c) ? Oc(c.map((l) => l.toLowerCase())) : c.toLowerCase()), n = "blockHash" in t ? t.blockHash : void 0, s = (c, l, h) => {
      let u;
      switch (c.length) {
        case 0:
          break;
        case 1:
          u = c[0];
          break;
        default:
          c.sort(), u = c;
      }
      if (n && (l != null || h != null))
        throw new Error("invalid filter");
      const f = {};
      return u && (f.address = u), e.length && (f.topics = e), l && (f.fromBlock = l), h && (f.toBlock = h), n && (f.blockHash = n), f;
    };
    let i = [];
    if (t.address)
      if (Array.isArray(t.address))
        for (const c of t.address)
          i.push(this._getAddress(c));
      else
        i.push(this._getAddress(t.address));
    let a;
    "fromBlock" in t && (a = this._getBlockTag(t.fromBlock));
    let o;
    return "toBlock" in t && (o = this._getBlockTag(t.toBlock)), i.filter((c) => typeof c != "string").length || a != null && typeof a != "string" || o != null && typeof o != "string" ? Promise.all([Promise.all(i), a, o]).then((c) => s(c[0], c[1], c[2])) : s(i, a, o);
  }
  /**
   *  Returns or resolves to a transaction for %%request%%, resolving
   *  any ENS names or [[Addressable]] and returning if already a valid
   *  transaction.
   */
  _getTransactionRequest(t) {
    const e = Ya(t), n = [];
    if (["to", "from"].forEach((s) => {
      if (e[s] == null)
        return;
      const i = Jt(e[s], this);
      Na(i) ? n.push(async function() {
        e[s] = await i;
      }()) : e[s] = i;
    }), e.blockTag != null) {
      const s = this._getBlockTag(e.blockTag);
      Na(s) ? n.push(async function() {
        e.blockTag = await s;
      }()) : e.blockTag = s;
    }
    return n.length ? async function() {
      return await Promise.all(n), e;
    }() : e;
  }
  async getNetwork() {
    if (d(this, oe) == null) {
      const s = (async () => {
        try {
          const i = await this._detectNetwork();
          return this.emit("network", i, null), i;
        } catch (i) {
          throw d(this, oe) === s && p(this, oe, null), i;
        }
      })();
      return p(this, oe, s), (await s).clone();
    }
    const t = d(this, oe), [e, n] = await Promise.all([
      t,
      this._detectNetwork()
      // The actual connected network
    ]);
    return e.chainId !== n.chainId && (d(this, Fn) ? (this.emit("network", n, e), d(this, oe) === t && p(this, oe, Promise.resolve(n))) : R(!1, `network changed: ${e.chainId} => ${n.chainId} `, "NETWORK_ERROR", {
      event: "changed"
    })), e.clone();
  }
  async getFeeData() {
    const t = await this.getNetwork(), e = async () => {
      const { _block: s, gasPrice: i, priorityFee: a } = await jt({
        _block: B(this, Z, Rc).call(this, "latest", !1),
        gasPrice: (async () => {
          try {
            const h = await B(this, Z, re).call(this, { method: "getGasPrice" });
            return G(h, "%response");
          } catch {
          }
          return null;
        })(),
        priorityFee: (async () => {
          try {
            const h = await B(this, Z, re).call(this, { method: "getPriorityFee" });
            return G(h, "%response");
          } catch {
          }
          return null;
        })()
      });
      let o = null, c = null;
      const l = this._wrapBlock(s, t);
      return l && l.baseFeePerGas && (c = a ?? BigInt("1000000000"), o = l.baseFeePerGas * e0 + c), new Ou(i, o, c);
    }, n = t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    if (n) {
      const s = new Nr(n.url), i = await n.processFunc(e, this, s);
      return new Ou(i.gasPrice, i.maxFeePerGas, i.maxPriorityFeePerGas);
    }
    return await e();
  }
  async estimateGas(t) {
    let e = this._getTransactionRequest(t);
    return Na(e) && (e = await e), G(await B(this, Z, re).call(this, {
      method: "estimateGas",
      transaction: e
    }), "%response");
  }
  async call(t) {
    const { tx: e, blockTag: n } = await jt({
      tx: this._getTransactionRequest(t),
      blockTag: this._getBlockTag(t.blockTag)
    });
    return await B(this, Z, kc).call(this, B(this, Z, Pc).call(this, e, n, t.enableCcipRead ? 0 : -1));
  }
  async getBalance(t, e) {
    return G(await B(this, Z, Bi).call(this, { method: "getBalance" }, t, e), "%response");
  }
  async getTransactionCount(t, e) {
    return W(await B(this, Z, Bi).call(this, { method: "getTransactionCount" }, t, e), "%response");
  }
  async getCode(t, e) {
    return H(await B(this, Z, Bi).call(this, { method: "getCode" }, t, e));
  }
  async getStorage(t, e, n) {
    const s = G(e, "position");
    return H(await B(this, Z, Bi).call(this, { method: "getStorage", position: s }, t, n));
  }
  // Write
  async broadcastTransaction(t) {
    const { blockNumber: e, hash: n, network: s } = await jt({
      blockNumber: this.getBlockNumber(),
      hash: this._perform({
        method: "broadcastTransaction",
        signedTransaction: t
      }),
      network: this.getNetwork()
    }), i = Wa.from(t);
    if (i.hash !== n)
      throw new Error("@TODO: the returned hash did not match");
    return this._wrapTransactionResponse(i, s).replaceableTransaction(e);
  }
  // Queries
  async getBlock(t, e) {
    const { network: n, params: s } = await jt({
      network: this.getNetwork(),
      params: B(this, Z, Rc).call(this, t, !!e)
    });
    return s == null ? null : this._wrapBlock(s, n);
  }
  async getTransaction(t) {
    const { network: e, params: n } = await jt({
      network: this.getNetwork(),
      params: B(this, Z, re).call(this, { method: "getTransaction", hash: t })
    });
    return n == null ? null : this._wrapTransactionResponse(n, e);
  }
  async getTransactionReceipt(t) {
    const { network: e, params: n } = await jt({
      network: this.getNetwork(),
      params: B(this, Z, re).call(this, { method: "getTransactionReceipt", hash: t })
    });
    if (n == null)
      return null;
    if (n.gasPrice == null && n.effectiveGasPrice == null) {
      const s = await B(this, Z, re).call(this, { method: "getTransaction", hash: t });
      if (s == null)
        throw new Error("report this; could not find tx or effectiveGasPrice");
      n.effectiveGasPrice = s.gasPrice;
    }
    return this._wrapTransactionReceipt(n, e);
  }
  async getTransactionResult(t) {
    const { result: e } = await jt({
      network: this.getNetwork(),
      result: B(this, Z, re).call(this, { method: "getTransactionResult", hash: t })
    });
    return e == null ? null : H(e);
  }
  // Bloom-filter Queries
  async getLogs(t) {
    let e = this._getFilter(t);
    Na(e) && (e = await e);
    const { network: n, params: s } = await jt({
      network: this.getNetwork(),
      params: B(this, Z, re).call(this, { method: "getLogs", filter: e })
    });
    return s.map((i) => this._wrapLog(i, n));
  }
  // ENS
  _getProvider(t) {
    R(!1, "provider cannot connect to target network", "UNSUPPORTED_OPERATION", {
      operation: "_getProvider()"
    });
  }
  async getResolver(t) {
    return await $a.fromName(this, t);
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
    t = nt(t);
    const e = Ec(t.substring(2).toLowerCase() + ".addr.reverse");
    try {
      const n = await $a.getEnsAddress(this), s = await new zn(n, [
        "function resolver(bytes32) view returns (address)"
      ], this).resolver(e);
      if (s == null || s === gi)
        return null;
      const i = await new zn(s, [
        "function name(bytes32) view returns (string)"
      ], this).name(e);
      return await this.resolveName(i) !== t ? null : i;
    } catch (n) {
      if (Ft(n, "BAD_DATA") && n.value === "0x" || Ft(n, "CALL_EXCEPTION"))
        return null;
      throw n;
    }
    return null;
  }
  async waitForTransaction(t, e, n) {
    const s = e ?? 1;
    return s === 0 ? this.getTransactionReceipt(t) : new Promise(async (i, a) => {
      let o = null;
      const c = async (l) => {
        try {
          const h = await this.getTransactionReceipt(t);
          if (h != null && l - h.blockNumber + 1 >= s) {
            i(h), o && (clearTimeout(o), o = null);
            return;
          }
        } catch (h) {
          console.log("EEE", h);
        }
        this.once("block", c);
      };
      n != null && (o = setTimeout(() => {
        o != null && (o = null, this.off("block", c), a(ht("timeout", "TIMEOUT", { reason: "timeout" })));
      }, n)), c(await this.getBlockNumber());
    });
  }
  async waitForBlock(t) {
    R(!1, "not implemented yet", "NOT_IMPLEMENTED", {
      operation: "waitForBlock"
    });
  }
  /**
   *  Clear a timer created using the [[_setTimeout]] method.
   */
  _clearTimeout(t) {
    const e = d(this, pe).get(t);
    e && (e.timer && clearTimeout(e.timer), d(this, pe).delete(t));
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
    const n = Ni(this, ia)._++, s = () => {
      d(this, pe).delete(n), t();
    };
    if (this.paused)
      d(this, pe).set(n, { timer: null, func: s, time: e });
    else {
      const i = setTimeout(s, e);
      d(this, pe).set(n, { timer: i, func: s, time: jo() });
    }
    return n;
  }
  /**
   *  Perform %%func%% on each subscriber.
   */
  _forEachSubscriber(t) {
    for (const e of d(this, Dt).values())
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
        return new qd(t.type);
      case "block": {
        const e = new Yy(this);
        return e.pollingInterval = this.pollingInterval, e;
      }
      case "safe":
      case "finalized":
        return new Xy(this, t.type);
      case "event":
        return new hl(this, t.filter);
      case "transaction":
        return new t0(this, t.hash);
      case "orphan":
        return new $y(this, t.filter);
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
    for (const n of d(this, Dt).values())
      if (n.subscriber === t) {
        n.started && n.subscriber.stop(), n.subscriber = e, n.started && e.start(), d(this, Lt) != null && e.pause(d(this, Lt));
        break;
      }
  }
  async on(t, e) {
    const n = await B(this, Z, La).call(this, t);
    return n.listeners.push({ listener: e, once: !1 }), n.started || (n.subscriber.start(), n.started = !0, d(this, Lt) != null && n.subscriber.pause(d(this, Lt))), this;
  }
  async once(t, e) {
    const n = await B(this, Z, La).call(this, t);
    return n.listeners.push({ listener: e, once: !0 }), n.started || (n.subscriber.start(), n.started = !0, d(this, Lt) != null && n.subscriber.pause(d(this, Lt))), this;
  }
  async emit(t, ...e) {
    const n = await B(this, Z, Ui).call(this, t, e);
    if (!n || n.listeners.length === 0)
      return !1;
    const s = n.listeners.length;
    return n.listeners = n.listeners.filter(({ listener: i, once: a }) => {
      const o = new oh(this, a ? null : i, t);
      try {
        i.call(this, ...e, o);
      } catch {
      }
      return !a;
    }), n.listeners.length === 0 && (n.started && n.subscriber.stop(), d(this, Dt).delete(n.tag)), s > 0;
  }
  async listenerCount(t) {
    if (t) {
      const n = await B(this, Z, Ui).call(this, t);
      return n ? n.listeners.length : 0;
    }
    let e = 0;
    for (const { listeners: n } of d(this, Dt).values())
      e += n.length;
    return e;
  }
  async listeners(t) {
    if (t) {
      const n = await B(this, Z, Ui).call(this, t);
      return n ? n.listeners.map(({ listener: s }) => s) : [];
    }
    let e = [];
    for (const { listeners: n } of d(this, Dt).values())
      e = e.concat(n.map(({ listener: s }) => s));
    return e;
  }
  async off(t, e) {
    const n = await B(this, Z, Ui).call(this, t);
    if (!n)
      return this;
    if (e) {
      const s = n.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && n.listeners.splice(s, 1);
    }
    return (!e || n.listeners.length === 0) && (n.started && n.subscriber.stop(), d(this, Dt).delete(n.tag)), this;
  }
  async removeAllListeners(t) {
    if (t) {
      const { tag: e, started: n, subscriber: s } = await B(this, Z, La).call(this, t);
      n && s.stop(), d(this, Dt).delete(e);
    } else
      for (const [e, { started: n, subscriber: s }] of d(this, Dt))
        n && s.stop(), d(this, Dt).delete(e);
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
    return d(this, ri);
  }
  /**
   *  Sub-classes may use this to shutdown any sockets or release their
   *  resources and reject any pending requests.
   *
   *  Sub-classes **must** call ``super.destroy()``.
   */
  destroy() {
    this.removeAllListeners();
    for (const t of d(this, pe).keys())
      this._clearTimeout(t);
    p(this, ri, !0);
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
    return d(this, Lt) != null;
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
    if (p(this, yr, -1), d(this, Lt) != null) {
      if (d(this, Lt) == !!t)
        return;
      R(!1, "cannot change pause type; resume first", "UNSUPPORTED_OPERATION", {
        operation: "pause"
      });
    }
    this._forEachSubscriber((e) => e.pause(t)), p(this, Lt, !!t);
    for (const e of d(this, pe).values())
      e.timer && clearTimeout(e.timer), e.time = jo() - e.time;
  }
  /**
   *  Resume the provider.
   */
  resume() {
    if (d(this, Lt) != null) {
      this._forEachSubscriber((t) => t.resume()), p(this, Lt, null);
      for (const t of d(this, pe).values()) {
        let e = t.time;
        e < 0 && (e = 0), t.time = jo(), setTimeout(t.func, e);
      }
    }
  }
}
Dt = new WeakMap(), Zr = new WeakMap(), Lt = new WeakMap(), ri = new WeakMap(), oe = new WeakMap(), Fn = new WeakMap(), Yr = new WeakMap(), yr = new WeakMap(), ia = new WeakMap(), pe = new WeakMap(), ni = new WeakMap(), si = new WeakMap(), Z = new WeakSet(), re = async function(t) {
  const e = d(this, si).cacheTimeout;
  if (e < 0)
    return await this._perform(t);
  const n = Da(t.method, t);
  let s = d(this, Yr).get(n);
  return s || (s = this._perform(t), d(this, Yr).set(n, s), setTimeout(() => {
    d(this, Yr).get(n) === s && d(this, Yr).delete(n);
  }, e)), await s;
}, Pc = async function(t, e, n) {
  R(n < r0, "CCIP read exceeded maximum redirections", "OFFCHAIN_FAULT", {
    reason: "TOO_MANY_REDIRECTS",
    transaction: Object.assign({}, t, { blockTag: e, enableCcipRead: !0 })
  });
  const s = Ya(t);
  try {
    return H(await this._perform({ method: "call", transaction: s, blockTag: e }));
  } catch (i) {
    if (!this.disableCcipRead && jc(i) && i.data && n >= 0 && e === "latest" && s.to != null && dt(i.data, 0, 4) === "0x556f1830") {
      const a = i.data, o = await Jt(s.to, this);
      let c;
      try {
        c = u0(dt(i.data, 4));
      } catch (u) {
        R(!1, u.message, "OFFCHAIN_FAULT", {
          reason: "BAD_DATA",
          transaction: s,
          info: { data: a }
        });
      }
      R(c.sender.toLowerCase() === o.toLowerCase(), "CCIP Read sender mismatch", "CALL_EXCEPTION", {
        action: "call",
        data: a,
        reason: "OffchainLookup",
        transaction: s,
        invocation: null,
        revert: {
          signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
          name: "OffchainLookup",
          args: c.errorArgs
        }
      });
      const l = await this.ccipReadFetch(s, c.calldata, c.urls);
      R(l != null, "CCIP Read failed to fetch data", "OFFCHAIN_FAULT", {
        reason: "FETCH_FAILED",
        transaction: s,
        info: { data: i.data, errorArgs: c.errorArgs }
      });
      const h = {
        to: o,
        data: ut([c.selector, l0([l, c.extraData])])
      };
      this.emit("debug", { action: "sendCcipReadCall", transaction: h });
      try {
        const u = await B(this, Z, Pc).call(this, h, e, n + 1);
        return this.emit("debug", { action: "receiveCcipReadCallResult", transaction: Object.assign({}, h), result: u }), u;
      } catch (u) {
        throw this.emit("debug", { action: "receiveCcipReadCallError", transaction: Object.assign({}, h), error: u }), u;
      }
    }
    throw i;
  }
}, kc = async function(t) {
  const { value: e } = await jt({
    network: this.getNetwork(),
    value: t
  });
  return e;
}, Bi = async function(t, e, n) {
  let s = this._getAddress(e), i = this._getBlockTag(n);
  return (typeof s != "string" || typeof i != "string") && ([s, i] = await Promise.all([s, i])), await B(this, Z, kc).call(this, B(this, Z, re).call(this, Object.assign(t, { address: s, blockTag: i })));
}, Rc = async function(t, e) {
  if (ot(t, 32))
    return await B(this, Z, re).call(this, {
      method: "getBlock",
      blockHash: t,
      includeTransactions: e
    });
  let n = this._getBlockTag(t);
  return typeof n != "string" && (n = await n), await B(this, Z, re).call(this, {
    method: "getBlock",
    blockTag: n,
    includeTransactions: e
  });
}, Ui = async function(t, e) {
  let n = await _o(t, this);
  return n.type === "event" && e && e.length > 0 && e[0].removed === !0 && (n = await _o({ orphan: "drop-log", log: e[0] }, this)), d(this, Dt).get(n.tag) || null;
}, La = async function(t) {
  const e = await _o(t, this), n = e.tag;
  let s = d(this, Dt).get(n);
  return s || (s = { subscriber: this._getSubscriber(e), tag: n, addressableMap: /* @__PURE__ */ new WeakMap(), nameMap: /* @__PURE__ */ new Map(), started: !1, listeners: [] }, d(this, Dt).set(n, s)), s;
};
function a0(r, t) {
  try {
    const e = Sc(r, t);
    if (e)
      return _a(e);
  } catch {
  }
  return null;
}
function Sc(r, t) {
  if (r === "0x")
    return null;
  try {
    const e = W(dt(r, t, t + 32)), n = W(dt(r, e, e + 32));
    return dt(r, e + 32, e + 32 + n);
  } catch {
  }
  return null;
}
function Lu(r) {
  const t = xt(r);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const e = new Uint8Array(32);
  return e.set(t, 32 - t.length), e;
}
function o0(r) {
  if (r.length % 32 === 0)
    return r;
  const t = new Uint8Array(Math.ceil(r.length / 32) * 32);
  return t.set(r), t;
}
const c0 = new Uint8Array([]);
function l0(r) {
  const t = [];
  let e = 0;
  for (let n = 0; n < r.length; n++)
    t.push(c0), e += 32;
  for (let n = 0; n < r.length; n++) {
    const s = q(r[n]);
    t[n] = Lu(e), t.push(Lu(s.length)), t.push(o0(s)), e += 32 + Math.ceil(s.length / 32) * 32;
  }
  return ut(t);
}
const Fu = "0x0000000000000000000000000000000000000000000000000000000000000000";
function u0(r) {
  const t = {
    sender: "",
    urls: [],
    calldata: "",
    selector: "",
    extraData: "",
    errorArgs: []
  };
  R(_n(r) >= 5 * 32, "insufficient OffchainLookup data", "OFFCHAIN_FAULT", {
    reason: "insufficient OffchainLookup data"
  });
  const e = dt(r, 0, 32);
  R(dt(e, 0, 12) === dt(Fu, 0, 12), "corrupt OffchainLookup sender", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup sender"
  }), t.sender = dt(e, 12);
  try {
    const n = [], s = W(dt(r, 32, 64)), i = W(dt(r, s, s + 32)), a = dt(r, s + 32);
    for (let o = 0; o < i; o++) {
      const c = a0(a, o * 32);
      if (c == null)
        throw new Error("abort");
      n.push(c);
    }
    t.urls = n;
  } catch {
    R(!1, "corrupt OffchainLookup urls", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup urls"
    });
  }
  try {
    const n = Sc(r, 64);
    if (n == null)
      throw new Error("abort");
    t.calldata = n;
  } catch {
    R(!1, "corrupt OffchainLookup calldata", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup calldata"
    });
  }
  R(dt(r, 100, 128) === dt(Fu, 0, 28), "corrupt OffchainLookup callbaackSelector", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup callbaackSelector"
  }), t.selector = dt(r, 96, 100);
  try {
    const n = Sc(r, 128);
    if (n == null)
      throw new Error("abort");
    t.extraData = n;
  } catch {
    R(!1, "corrupt OffchainLookup extraData", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup extraData"
    });
  }
  return t.errorArgs = "sender,urls,calldata,selector,extraData".split(/,/).map((n) => t[n]), t;
}
function as(r, t) {
  if (r.provider)
    return r.provider;
  R(!1, "missing provider", "UNSUPPORTED_OPERATION", { operation: t });
}
async function Mu(r, t) {
  let e = Ya(t);
  if (e.to != null && (e.to = Jt(e.to, r)), e.from != null) {
    const n = e.from;
    e.from = Promise.all([
      r.getAddress(),
      Jt(n, r)
    ]).then(([s, i]) => (A(s.toLowerCase() === i.toLowerCase(), "transaction from mismatch", "tx.from", i), s));
  } else
    e.from = r.getAddress();
  return await jt(e);
}
class Wd {
  /**
   *  Creates a new Signer connected to %%provider%%.
   */
  constructor(t) {
    /**
     *  The provider this signer is connected to.
     */
    b(this, "provider");
    Q(this, { provider: t || null });
  }
  async getNonce(t) {
    return as(this, "getTransactionCount").getTransactionCount(await this.getAddress(), t);
  }
  async populateCall(t) {
    return await Mu(this, t);
  }
  async populateTransaction(t) {
    const e = as(this, "populateTransaction"), n = await Mu(this, t);
    n.nonce == null && (n.nonce = await this.getNonce("pending")), n.gasLimit == null && (n.gasLimit = await this.estimateGas(n));
    const s = await this.provider.getNetwork();
    if (n.chainId != null) {
      const a = G(n.chainId);
      A(a === s.chainId, "transaction chainId mismatch", "tx.chainId", t.chainId);
    } else
      n.chainId = s.chainId;
    const i = n.maxFeePerGas != null || n.maxPriorityFeePerGas != null;
    if (n.gasPrice != null && (n.type === 2 || i) ? A(!1, "eip-1559 transaction do not support gasPrice", "tx", t) : (n.type === 0 || n.type === 1) && i && A(!1, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", t), (n.type === 2 || n.type == null) && n.maxFeePerGas != null && n.maxPriorityFeePerGas != null)
      n.type = 2;
    else if (n.type === 0 || n.type === 1) {
      const a = await e.getFeeData();
      R(a.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", {
        operation: "getGasPrice"
      }), n.gasPrice == null && (n.gasPrice = a.gasPrice);
    } else {
      const a = await e.getFeeData();
      if (n.type == null)
        if (a.maxFeePerGas != null && a.maxPriorityFeePerGas != null)
          if (n.type = 2, n.gasPrice != null) {
            const o = n.gasPrice;
            delete n.gasPrice, n.maxFeePerGas = o, n.maxPriorityFeePerGas = o;
          } else
            n.maxFeePerGas == null && (n.maxFeePerGas = a.maxFeePerGas), n.maxPriorityFeePerGas == null && (n.maxPriorityFeePerGas = a.maxPriorityFeePerGas);
        else a.gasPrice != null ? (R(!i, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", {
          operation: "populateTransaction"
        }), n.gasPrice == null && (n.gasPrice = a.gasPrice), n.type = 0) : R(!1, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", {
          operation: "signer.getFeeData"
        });
      else (n.type === 2 || n.type === 3) && (n.maxFeePerGas == null && (n.maxFeePerGas = a.maxFeePerGas), n.maxPriorityFeePerGas == null && (n.maxPriorityFeePerGas = a.maxPriorityFeePerGas));
    }
    return await jt(n);
  }
  async estimateGas(t) {
    return as(this, "estimateGas").estimateGas(await this.populateCall(t));
  }
  async call(t) {
    return as(this, "call").call(await this.populateCall(t));
  }
  async resolveName(t) {
    return await as(this, "resolveName").resolveName(t);
  }
  async sendTransaction(t) {
    const e = as(this, "sendTransaction"), n = await this.populateTransaction(t);
    delete n.from;
    const s = Wa.from(n);
    return await e.broadcastTransaction(await this.signTransaction(s));
  }
}
var ii, Fa;
const Nl = class Nl extends Wd {
  /**
   *  Creates a new **VoidSigner** with %%address%% attached to
   *  %%provider%%.
   */
  constructor(e, n) {
    super(n);
    x(this, ii);
    /**
     *  The signer address.
     */
    b(this, "address");
    Q(this, { address: e });
  }
  async getAddress() {
    return this.address;
  }
  connect(e) {
    return new Nl(this.address, e);
  }
  async signTransaction(e) {
    B(this, ii, Fa).call(this, "transactions", "signTransaction");
  }
  async signMessage(e) {
    B(this, ii, Fa).call(this, "messages", "signMessage");
  }
  async signTypedData(e, n, s) {
    B(this, ii, Fa).call(this, "typed-data", "signTypedData");
  }
};
ii = new WeakSet(), Fa = function(e, n) {
  R(!1, `VoidSigner cannot sign ${e}`, "UNSUPPORTED_OPERATION", { operation: n });
};
let to = Nl;
function h0(r) {
  return JSON.parse(JSON.stringify(r));
}
var _t, ze, Mn, Xr, Hn, ai, nn, Bc, Uc;
class Zd {
  /**
   *  Creates a new **FilterIdSubscriber** which will used [[_subscribe]]
   *  and [[_emitResults]] to setup the subscription and provide the event
   *  to the %%provider%%.
   */
  constructor(t) {
    x(this, nn);
    x(this, _t);
    x(this, ze);
    x(this, Mn);
    x(this, Xr);
    x(this, Hn);
    x(this, ai);
    p(this, _t, t), p(this, ze, null), p(this, Mn, B(this, nn, Bc).bind(this)), p(this, Xr, !1), p(this, Hn, null), p(this, ai, !1);
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
    d(this, Xr) || (p(this, Xr, !0), B(this, nn, Bc).call(this, -2));
  }
  stop() {
    d(this, Xr) && (p(this, Xr, !1), p(this, ai, !0), B(this, nn, Uc).call(this), d(this, _t).off("block", d(this, Mn)));
  }
  pause(t) {
    t && B(this, nn, Uc).call(this), d(this, _t).off("block", d(this, Mn));
  }
  resume() {
    this.start();
  }
}
_t = new WeakMap(), ze = new WeakMap(), Mn = new WeakMap(), Xr = new WeakMap(), Hn = new WeakMap(), ai = new WeakMap(), nn = new WeakSet(), Bc = async function(t) {
  try {
    d(this, ze) == null && p(this, ze, this._subscribe(d(this, _t)));
    let e = null;
    try {
      e = await d(this, ze);
    } catch (i) {
      if (!Ft(i, "UNSUPPORTED_OPERATION") || i.operation !== "eth_newFilter")
        throw i;
    }
    if (e == null) {
      p(this, ze, null), d(this, _t)._recoverSubscriber(this, this._recover(d(this, _t)));
      return;
    }
    const n = await d(this, _t).getNetwork();
    if (d(this, Hn) || p(this, Hn, n), d(this, Hn).chainId !== n.chainId)
      throw new Error("chaid changed");
    if (d(this, ai))
      return;
    const s = await d(this, _t).send("eth_getFilterChanges", [e]);
    await this._emitResults(d(this, _t), s);
  } catch (e) {
    console.log("@TODO", e);
  }
  d(this, _t).once("block", d(this, Mn));
}, Uc = function() {
  const t = d(this, ze);
  t && (p(this, ze, null), t.then((e) => {
    d(this, _t).destroyed || d(this, _t).send("eth_uninstallFilter", [e]);
  }));
};
var Gn;
class d0 extends Zd {
  /**
   *  Creates a new **FilterIdEventSubscriber** attached to %%provider%%
   *  listening for %%filter%%.
   */
  constructor(e, n) {
    super(e);
    x(this, Gn);
    p(this, Gn, h0(n));
  }
  _recover(e) {
    return new hl(e, d(this, Gn));
  }
  async _subscribe(e) {
    return await e.send("eth_newFilter", [d(this, Gn)]);
  }
  async _emitResults(e, n) {
    for (const s of n)
      e.emit(d(this, Gn), e._wrapLog(s, e._network));
  }
}
Gn = new WeakMap();
class f0 extends Zd {
  async _subscribe(t) {
    return await t.send("eth_newPendingTransactionFilter", []);
  }
  async _emitResults(t, e) {
    for (const n of e)
      t.emit("pending", n);
  }
}
const p0 = "bigint,boolean,function,number,string,symbol".split(/,/g);
function Ma(r) {
  if (r == null || p0.indexOf(typeof r) >= 0 || typeof r.getAddress == "function")
    return r;
  if (Array.isArray(r))
    return r.map(Ma);
  if (typeof r == "object")
    return Object.keys(r).reduce((t, e) => (t[e] = r[e], t), {});
  throw new Error(`should not happen: ${r} (${typeof r})`);
}
function g0(r) {
  return new Promise((t) => {
    setTimeout(t, r);
  });
}
function os(r) {
  return r && r.toLowerCase();
}
function Hu(r) {
  return r && typeof r.pollingInterval == "number";
}
const Yd = {
  polling: !1,
  staticNetwork: null,
  batchStallTime: 10,
  batchMaxSize: 1 << 20,
  batchMaxCount: 100,
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class Qo extends Wd {
  constructor(e, n) {
    super(e);
    b(this, "address");
    n = nt(n), Q(this, { address: n });
  }
  connect(e) {
    R(!1, "cannot reconnect JsonRpcSigner", "UNSUPPORTED_OPERATION", {
      operation: "signer.connect"
    });
  }
  async getAddress() {
    return this.address;
  }
  // JSON-RPC will automatially fill in nonce, etc. so we just check from
  async populateTransaction(e) {
    return await this.populateCall(e);
  }
  // Returns just the hash of the transaction after sent, which is what
  // the bare JSON-RPC API does;
  async sendUncheckedTransaction(e) {
    const n = Ma(e), s = [];
    if (n.from) {
      const a = n.from;
      s.push((async () => {
        const o = await Jt(a, this.provider);
        A(o != null && o.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", e), n.from = o;
      })());
    } else
      n.from = this.address;
    if (n.gasLimit == null && s.push((async () => {
      n.gasLimit = await this.provider.estimateGas({ ...n, from: this.address });
    })()), n.to != null) {
      const a = n.to;
      s.push((async () => {
        n.to = await Jt(a, this.provider);
      })());
    }
    s.length && await Promise.all(s);
    const i = this.provider.getRpcTransaction(n);
    return this.provider.send("eth_sendTransaction", [i]);
  }
  async sendTransaction(e) {
    const n = await this.provider.getBlockNumber(), s = await this.sendUncheckedTransaction(e);
    return await new Promise((i, a) => {
      const o = [1e3, 100];
      let c = 0;
      const l = async () => {
        try {
          const h = await this.provider.getTransaction(s);
          if (h != null) {
            i(h.replaceableTransaction(n));
            return;
          }
        } catch (h) {
          if (Ft(h, "CANCELLED") || Ft(h, "BAD_DATA") || Ft(h, "NETWORK_ERROR")) {
            h.info == null && (h.info = {}), h.info.sendTransactionHash = s, a(h);
            return;
          }
          if (Ft(h, "INVALID_ARGUMENT") && (c++, h.info == null && (h.info = {}), h.info.sendTransactionHash = s, c > 10)) {
            a(h);
            return;
          }
          this.provider.emit("error", ht("failed to fetch transation after sending (will try again)", "UNKNOWN_ERROR", { error: h }));
        }
        this.provider._setTimeout(() => {
          l();
        }, o.pop() || 4e3);
      };
      l();
    });
  }
  async signTransaction(e) {
    const n = Ma(e);
    if (n.from) {
      const i = await Jt(n.from, this.provider);
      A(i != null && i.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", e), n.from = i;
    } else
      n.from = this.address;
    const s = this.provider.getRpcTransaction(n);
    return await this.provider.send("eth_signTransaction", [s]);
  }
  async signMessage(e) {
    const n = typeof e == "string" ? Se(e) : e;
    return await this.provider.send("personal_sign", [
      H(n),
      this.address.toLowerCase()
    ]);
  }
  async signTypedData(e, n, s) {
    const i = Ma(s), a = await Za.resolveNames(e, n, i, async (o) => {
      const c = await Jt(o);
      return A(c != null, "TypedData does not support null address", "value", o), c;
    });
    return await this.provider.send("eth_signTypedData_v4", [
      this.address.toLowerCase(),
      JSON.stringify(Za.getPayload(a.domain, n, a.value))
    ]);
  }
  async unlock(e) {
    return this.provider.send("personal_unlockAccount", [
      this.address.toLowerCase(),
      e,
      null
    ]);
  }
  // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
  async _legacySignMessage(e) {
    const n = typeof e == "string" ? Se(e) : e;
    return await this.provider.send("eth_sign", [
      this.address.toLowerCase(),
      H(n)
    ]);
  }
}
var Vn, oi, wr, Je, Pe, ge, Wt, aa, Dc;
class m0 extends i0 {
  constructor(e, n) {
    super(e, n);
    x(this, aa);
    x(this, Vn);
    // The next ID to use for the JSON-RPC ID field
    x(this, oi);
    // Payloads are queued and triggered in batches using the drainTimer
    x(this, wr);
    x(this, Je);
    x(this, Pe);
    x(this, ge);
    x(this, Wt);
    p(this, oi, 1), p(this, Vn, Object.assign({}, Yd, n || {})), p(this, wr, []), p(this, Je, null), p(this, ge, null), p(this, Wt, null);
    {
      let i = null;
      const a = new Promise((o) => {
        i = o;
      });
      p(this, Pe, { promise: a, resolve: i });
    }
    const s = this._getOption("staticNetwork");
    typeof s == "boolean" ? (A(!s || e !== "any", "staticNetwork cannot be used on special network 'any'", "options", n), s && e != null && p(this, ge, We.from(e))) : s && (A(e == null || s.matches(e), "staticNetwork MUST match network object", "options", n), p(this, ge, s));
  }
  /**
   *  Returns the value associated with the option %%key%%.
   *
   *  Sub-classes can use this to inquire about configuration options.
   */
  _getOption(e) {
    return d(this, Vn)[e];
  }
  /**
   *  Gets the [[Network]] this provider has committed to. On each call, the network
   *  is detected, and if it has changed, the call will reject.
   */
  get _network() {
    return R(d(this, ge), "network is not available yet", "NETWORK_ERROR"), d(this, ge);
  }
  /**
   *  Resolves to the non-normalized value by performing %%req%%.
   *
   *  Sub-classes may override this to modify behavior of actions,
   *  and should generally call ``super._perform`` as a fallback.
   */
  async _perform(e) {
    if (e.method === "call" || e.method === "estimateGas") {
      let s = e.transaction;
      if (s && s.type != null && G(s.type) && s.maxFeePerGas == null && s.maxPriorityFeePerGas == null) {
        const i = await this.getFeeData();
        i.maxFeePerGas == null && i.maxPriorityFeePerGas == null && (e = Object.assign({}, e, {
          transaction: Object.assign({}, s, { type: void 0 })
        }));
      }
    }
    const n = this.getRpcRequest(e);
    return n != null ? await this.send(n.method, n.args) : super._perform(e);
  }
  /**
   *  Sub-classes may override this; it detects the *actual* network that
   *  we are **currently** connected to.
   *
   *  Keep in mind that [[send]] may only be used once [[ready]], otherwise the
   *  _send primitive must be used instead.
   */
  async _detectNetwork() {
    const e = this._getOption("staticNetwork");
    if (e)
      if (e === !0) {
        if (d(this, ge))
          return d(this, ge);
      } else
        return e;
    return d(this, Wt) ? await d(this, Wt) : this.ready ? (p(this, Wt, (async () => {
      try {
        const n = We.from(G(await this.send("eth_chainId", [])));
        return p(this, Wt, null), n;
      } catch (n) {
        throw p(this, Wt, null), n;
      }
    })()), await d(this, Wt)) : (p(this, Wt, (async () => {
      const n = {
        id: Ni(this, oi)._++,
        method: "eth_chainId",
        params: [],
        jsonrpc: "2.0"
      };
      this.emit("debug", { action: "sendRpcPayload", payload: n });
      let s;
      try {
        s = (await this._send(n))[0], p(this, Wt, null);
      } catch (i) {
        throw p(this, Wt, null), this.emit("debug", { action: "receiveRpcError", error: i }), i;
      }
      if (this.emit("debug", { action: "receiveRpcResult", result: s }), "result" in s)
        return We.from(G(s.result));
      throw this.getRpcError(n, s);
    })()), await d(this, Wt));
  }
  /**
   *  Sub-classes **MUST** call this. Until [[_start]] has been called, no calls
   *  will be passed to [[_send]] from [[send]]. If it is overridden, then
   *  ``super._start()`` **MUST** be called.
   *
   *  Calling it multiple times is safe and has no effect.
   */
  _start() {
    d(this, Pe) == null || d(this, Pe).resolve == null || (d(this, Pe).resolve(), p(this, Pe, null), (async () => {
      for (; d(this, ge) == null && !this.destroyed; )
        try {
          p(this, ge, await this._detectNetwork());
        } catch (e) {
          if (this.destroyed)
            break;
          console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"), this.emit("error", ht("failed to bootstrap network detection", "NETWORK_ERROR", { event: "initial-network-discovery", info: { error: e } })), await g0(1e3);
        }
      B(this, aa, Dc).call(this);
    })());
  }
  /**
   *  Resolves once the [[_start]] has been called. This can be used in
   *  sub-classes to defer sending data until the connection has been
   *  established.
   */
  async _waitUntilReady() {
    if (d(this, Pe) != null)
      return await d(this, Pe).promise;
  }
  /**
   *  Return a Subscriber that will manage the %%sub%%.
   *
   *  Sub-classes may override this to modify the behavior of
   *  subscription management.
   */
  _getSubscriber(e) {
    return e.type === "pending" ? new f0(this) : e.type === "event" ? this._getOption("polling") ? new hl(this, e.filter) : new d0(this, e.filter) : e.type === "orphan" && e.filter.orphan === "drop-log" ? new qd("orphan") : super._getSubscriber(e);
  }
  /**
   *  Returns true only if the [[_start]] has been called.
   */
  get ready() {
    return d(this, Pe) == null;
  }
  /**
   *  Returns %%tx%% as a normalized JSON-RPC transaction request,
   *  which has all values hexlified and any numeric values converted
   *  to Quantity values.
   */
  getRpcTransaction(e) {
    const n = {};
    return ["chainId", "gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach((s) => {
      if (e[s] == null)
        return;
      let i = s;
      s === "gasLimit" && (i = "gas"), n[i] = ps(G(e[s], `tx.${s}`));
    }), ["from", "to", "data"].forEach((s) => {
      e[s] != null && (n[s] = H(e[s]));
    }), e.accessList && (n.accessList = ns(e.accessList)), e.blobVersionedHashes && (n.blobVersionedHashes = e.blobVersionedHashes.map((s) => s.toLowerCase())), n;
  }
  /**
   *  Returns the request method and arguments required to perform
   *  %%req%%.
   */
  getRpcRequest(e) {
    switch (e.method) {
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
          args: [os(e.address), e.blockTag]
        };
      case "getTransactionCount":
        return {
          method: "eth_getTransactionCount",
          args: [os(e.address), e.blockTag]
        };
      case "getCode":
        return {
          method: "eth_getCode",
          args: [os(e.address), e.blockTag]
        };
      case "getStorage":
        return {
          method: "eth_getStorageAt",
          args: [
            os(e.address),
            "0x" + e.position.toString(16),
            e.blockTag
          ]
        };
      case "broadcastTransaction":
        return {
          method: "eth_sendRawTransaction",
          args: [e.signedTransaction]
        };
      case "getBlock":
        if ("blockTag" in e)
          return {
            method: "eth_getBlockByNumber",
            args: [e.blockTag, !!e.includeTransactions]
          };
        if ("blockHash" in e)
          return {
            method: "eth_getBlockByHash",
            args: [e.blockHash, !!e.includeTransactions]
          };
        break;
      case "getTransaction":
        return {
          method: "eth_getTransactionByHash",
          args: [e.hash]
        };
      case "getTransactionReceipt":
        return {
          method: "eth_getTransactionReceipt",
          args: [e.hash]
        };
      case "call":
        return {
          method: "eth_call",
          args: [this.getRpcTransaction(e.transaction), e.blockTag]
        };
      case "estimateGas":
        return {
          method: "eth_estimateGas",
          args: [this.getRpcTransaction(e.transaction)]
        };
      case "getLogs":
        return e.filter && e.filter.address != null && (Array.isArray(e.filter.address) ? e.filter.address = e.filter.address.map(os) : e.filter.address = os(e.filter.address)), { method: "eth_getLogs", args: [e.filter] };
    }
    return null;
  }
  /**
   *  Returns an ethers-style Error for the given JSON-RPC error
   *  %%payload%%, coalescing the various strings and error shapes
   *  that different nodes return, coercing them into a machine-readable
   *  standardized error.
   */
  getRpcError(e, n) {
    const { method: s } = e, { error: i } = n;
    if (s === "eth_estimateGas" && i.message) {
      const c = i.message;
      if (!c.match(/revert/i) && c.match(/insufficient funds/i))
        return ht("insufficient funds", "INSUFFICIENT_FUNDS", {
          transaction: e.params[0],
          info: { payload: e, error: i }
        });
    }
    if (s === "eth_call" || s === "eth_estimateGas") {
      const c = Lc(i), l = Xn.getBuiltinCallException(s === "eth_call" ? "call" : "estimateGas", e.params[0], c ? c.data : null);
      return l.info = { error: i, payload: e }, l;
    }
    const a = JSON.stringify(w0(i));
    if (typeof i.message == "string" && i.message.match(/user denied|ethers-user-denied/i))
      return ht("user rejected action", "ACTION_REJECTED", {
        action: {
          eth_sign: "signMessage",
          personal_sign: "signMessage",
          eth_signTypedData_v4: "signTypedData",
          eth_signTransaction: "signTransaction",
          eth_sendTransaction: "sendTransaction",
          eth_requestAccounts: "requestAccess",
          wallet_requestAccounts: "requestAccess"
        }[s] || "unknown",
        reason: "rejected",
        info: { payload: e, error: i }
      });
    if (s === "eth_sendRawTransaction" || s === "eth_sendTransaction") {
      const c = e.params[0];
      if (a.match(/insufficient funds|base fee exceeds gas limit/i))
        return ht("insufficient funds for intrinsic transaction cost", "INSUFFICIENT_FUNDS", {
          transaction: c,
          info: { error: i }
        });
      if (a.match(/nonce/i) && a.match(/too low/i))
        return ht("nonce has already been used", "NONCE_EXPIRED", { transaction: c, info: { error: i } });
      if (a.match(/replacement transaction/i) && a.match(/underpriced/i))
        return ht("replacement fee too low", "REPLACEMENT_UNDERPRICED", { transaction: c, info: { error: i } });
      if (a.match(/only replay-protected/i))
        return ht("legacy pre-eip-155 transactions not supported", "UNSUPPORTED_OPERATION", {
          operation: s,
          info: { transaction: c, info: { error: i } }
        });
    }
    let o = !!a.match(/the method .* does not exist/i);
    return o || i && i.details && i.details.startsWith("Unauthorized method:") && (o = !0), o ? ht("unsupported operation", "UNSUPPORTED_OPERATION", {
      operation: e.method,
      info: { error: i, payload: e }
    }) : ht("could not coalesce error", "UNKNOWN_ERROR", { error: i, payload: e });
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
  send(e, n) {
    if (this.destroyed)
      return Promise.reject(ht("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: e }));
    const s = Ni(this, oi)._++, i = new Promise((a, o) => {
      d(this, wr).push({
        resolve: a,
        reject: o,
        payload: { method: e, params: n, id: s, jsonrpc: "2.0" }
      });
    });
    return B(this, aa, Dc).call(this), i;
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
  async getSigner(e) {
    e == null && (e = 0);
    const n = this.send("eth_accounts", []);
    if (typeof e == "number") {
      const i = await n;
      if (e >= i.length)
        throw new Error("no such account");
      return new Qo(this, i[e]);
    }
    const { accounts: s } = await jt({
      network: this.getNetwork(),
      accounts: n
    });
    e = nt(e);
    for (const i of s)
      if (nt(i) === e)
        return new Qo(this, e);
    throw new Error("invalid account");
  }
  async listAccounts() {
    return (await this.send("eth_accounts", [])).map((e) => new Qo(this, e));
  }
  destroy() {
    d(this, Je) && (clearTimeout(d(this, Je)), p(this, Je, null));
    for (const { payload: e, reject: n } of d(this, wr))
      n(ht("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: e.method }));
    p(this, wr, []), super.destroy();
  }
}
Vn = new WeakMap(), oi = new WeakMap(), wr = new WeakMap(), Je = new WeakMap(), Pe = new WeakMap(), ge = new WeakMap(), Wt = new WeakMap(), aa = new WeakSet(), Dc = function() {
  if (d(this, Je))
    return;
  const e = this._getOption("batchMaxCount") === 1 ? 0 : this._getOption("batchStallTime");
  p(this, Je, setTimeout(() => {
    p(this, Je, null);
    const n = d(this, wr);
    for (p(this, wr, []); n.length; ) {
      const s = [n.shift()];
      for (; n.length && s.length !== d(this, Vn).batchMaxCount; )
        if (s.push(n.shift()), JSON.stringify(s.map((i) => i.payload)).length > d(this, Vn).batchMaxSize) {
          n.unshift(s.pop());
          break;
        }
      (async () => {
        const i = s.length === 1 ? s[0].payload : s.map((a) => a.payload);
        this.emit("debug", { action: "sendRpcPayload", payload: i });
        try {
          const a = await this._send(i);
          this.emit("debug", { action: "receiveRpcResult", result: a });
          for (const { resolve: o, reject: c, payload: l } of s) {
            if (this.destroyed) {
              c(ht("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: l.method }));
              continue;
            }
            const h = a.filter((u) => u.id === l.id)[0];
            if (h == null) {
              const u = ht("missing response for request", "BAD_DATA", {
                value: a,
                info: { payload: l }
              });
              this.emit("error", u), c(u);
              continue;
            }
            if ("error" in h) {
              c(this.getRpcError(l, h));
              continue;
            }
            o(h.result);
          }
        } catch (a) {
          this.emit("debug", { action: "receiveRpcError", error: a });
          for (const { reject: o } of s)
            o(a);
        }
      })();
    }
  }, e));
};
var $r;
class y0 extends m0 {
  constructor(e, n) {
    super(e, n);
    x(this, $r);
    let s = this._getOption("pollingInterval");
    s == null && (s = Yd.pollingInterval), p(this, $r, s);
  }
  _getSubscriber(e) {
    const n = super._getSubscriber(e);
    return Hu(n) && (n.pollingInterval = d(this, $r)), n;
  }
  /**
   *  The polling interval (default: 4000 ms)
   */
  get pollingInterval() {
    return d(this, $r);
  }
  set pollingInterval(e) {
    if (!Number.isInteger(e) || e < 0)
      throw new Error("invalid interval");
    p(this, $r, e), this._forEachSubscriber((n) => {
      Hu(n) && (n.pollingInterval = d(this, $r));
    });
  }
}
$r = new WeakMap();
var ci;
class zo extends y0 {
  constructor(e, n, s) {
    e == null && (e = "http://localhost:8545");
    super(n, s);
    x(this, ci);
    typeof e == "string" ? p(this, ci, new Nr(e)) : p(this, ci, e.clone());
  }
  _getConnection() {
    return d(this, ci).clone();
  }
  async send(e, n) {
    return await this._start(), await super.send(e, n);
  }
  async _send(e) {
    const n = this._getConnection();
    n.body = JSON.stringify(e), n.setHeader("content-type", "application/json");
    const s = await n.send();
    s.assertOk();
    let i = s.bodyJson;
    return Array.isArray(i) || (i = [i]), i;
  }
}
ci = new WeakMap();
function Lc(r) {
  if (r == null)
    return null;
  if (typeof r.message == "string" && r.message.match(/revert/i) && ot(r.data))
    return { message: r.message, data: r.data };
  if (typeof r == "object") {
    for (const t in r) {
      const e = Lc(r[t]);
      if (e)
        return e;
    }
    return null;
  }
  if (typeof r == "string")
    try {
      return Lc(JSON.parse(r));
    } catch {
    }
  return null;
}
function Fc(r, t) {
  if (r != null) {
    if (typeof r.message == "string" && t.push(r.message), typeof r == "object")
      for (const e in r)
        Fc(r[e], t);
    if (typeof r == "string")
      try {
        return Fc(JSON.parse(r), t);
      } catch {
      }
  }
}
function w0(r) {
  const t = [];
  return Fc(r, t), t;
}
const Xd = [
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
], A0 = [
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
], Ia = [
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
], hs = [
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
function Gu(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error(`positive integer expected, not ${r}`);
}
function b0(r) {
  return r instanceof Uint8Array || r != null && typeof r == "object" && r.constructor.name === "Uint8Array";
}
function No(r, ...t) {
  if (!b0(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${r.length}`);
}
function E0(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Gu(r.outputLen), Gu(r.blockLen);
}
function eo(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function v0(r, t) {
  No(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const Jo = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ko = (r) => new DataView(r.buffer, r.byteOffset, r.byteLength), Le = (r, t) => r << 32 - t | r >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function x0(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function dl(r) {
  return typeof r == "string" && (r = x0(r)), No(r), r;
}
function N0(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    No(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, s = 0; n < r.length; n++) {
    const i = r[n];
    e.set(i, s), s += i.length;
  }
  return e;
}
class $d {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function I0(r) {
  const t = (n) => r().update(dl(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function T0(r = 32) {
  if (Jo && typeof Jo.getRandomValues == "function")
    return Jo.getRandomValues(new Uint8Array(r));
  throw new Error("crypto.getRandomValues must be defined");
}
function C0(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const s = BigInt(32), i = BigInt(4294967295), a = Number(e >> s & i), o = Number(e & i), c = n ? 4 : 0, l = n ? 0 : 4;
  r.setUint32(t + c, a, n), r.setUint32(t + l, o, n);
}
const O0 = (r, t, e) => r & t ^ ~r & e, P0 = (r, t, e) => r & t ^ r & e ^ t & e;
class k0 extends $d {
  constructor(t, e, n, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ko(this.buffer);
  }
  update(t) {
    eo(this);
    const { view: e, buffer: n, blockLen: s } = this;
    t = dl(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(s - this.pos, i - a);
      if (o === s) {
        const c = Ko(t);
        for (; s <= i - a; a += s)
          this.process(c, a);
        continue;
      }
      n.set(t.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    eo(this), v0(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: s, isLE: i } = this;
    let { pos: a } = this;
    e[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(n, 0), a = 0);
    for (let u = a; u < s; u++)
      e[u] = 0;
    C0(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const o = Ko(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, h = this.get();
    if (l > h.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let u = 0; u < l; u++)
      o.setUint32(4 * u, h[u], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: s, finished: i, destroyed: a, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = a, s % e && t.buffer.set(n), t;
  }
}
const R0 = /* @__PURE__ */ new Uint32Array([
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
]), Sr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Br = /* @__PURE__ */ new Uint32Array(64);
class S0 extends k0 {
  constructor() {
    super(64, 32, 8, !1), this.A = Sr[0] | 0, this.B = Sr[1] | 0, this.C = Sr[2] | 0, this.D = Sr[3] | 0, this.E = Sr[4] | 0, this.F = Sr[5] | 0, this.G = Sr[6] | 0, this.H = Sr[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: s, E: i, F: a, G: o, H: c } = this;
    return [t, e, n, s, i, a, o, c];
  }
  // prettier-ignore
  set(t, e, n, s, i, a, o, c) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = c | 0;
  }
  process(t, e) {
    for (let u = 0; u < 16; u++, e += 4)
      Br[u] = t.getUint32(e, !1);
    for (let u = 16; u < 64; u++) {
      const f = Br[u - 15], y = Br[u - 2], m = Le(f, 7) ^ Le(f, 18) ^ f >>> 3, g = Le(y, 17) ^ Le(y, 19) ^ y >>> 10;
      Br[u] = g + Br[u - 7] + m + Br[u - 16] | 0;
    }
    let { A: n, B: s, C: i, D: a, E: o, F: c, G: l, H: h } = this;
    for (let u = 0; u < 64; u++) {
      const f = Le(o, 6) ^ Le(o, 11) ^ Le(o, 25), y = h + f + O0(o, c, l) + R0[u] + Br[u] | 0, m = (Le(n, 2) ^ Le(n, 13) ^ Le(n, 22)) + P0(n, s, i) | 0;
      h = l, l = c, c = o, o = a + y | 0, a = i, i = s, s = n, n = y + m | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, h = h + this.H | 0, this.set(n, s, i, a, o, c, l, h);
  }
  roundClean() {
    Br.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const B0 = /* @__PURE__ */ I0(() => new S0());
class tf extends $d {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, E0(t);
    const n = dl(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(n.length > s ? t.create().update(n).digest() : n);
    for (let a = 0; a < i.length; a++)
      i[a] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let a = 0; a < i.length; a++)
      i[a] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return eo(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    eo(this), No(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: n, finished: s, destroyed: i, blockLen: a, outputLen: o } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = a, t.outputLen = o, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const ef = (r, t, e) => new tf(r, t).update(e).digest();
ef.create = (r, t) => new tf(r, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const rf = /* @__PURE__ */ BigInt(0), Io = /* @__PURE__ */ BigInt(1), U0 = /* @__PURE__ */ BigInt(2);
function ts(r) {
  return r instanceof Uint8Array || r != null && typeof r == "object" && r.constructor.name === "Uint8Array";
}
function fa(r) {
  if (!ts(r))
    throw new Error("Uint8Array expected");
}
const D0 = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function es(r) {
  fa(r);
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += D0[r[e]];
  return t;
}
function nf(r) {
  const t = r.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function fl(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return BigInt(r === "" ? "0" : `0x${r}`);
}
const er = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Vu(r) {
  if (r >= er._0 && r <= er._9)
    return r - er._0;
  if (r >= er._A && r <= er._F)
    return r - (er._A - 10);
  if (r >= er._a && r <= er._f)
    return r - (er._a - 10);
}
function Ai(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  const t = r.length, e = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const a = Vu(r.charCodeAt(i)), o = Vu(r.charCodeAt(i + 1));
    if (a === void 0 || o === void 0) {
      const c = r[i] + r[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    n[s] = a * 16 + o;
  }
  return n;
}
function Jn(r) {
  return fl(es(r));
}
function pl(r) {
  return fa(r), fl(es(Uint8Array.from(r).reverse()));
}
function bi(r, t) {
  return Ai(r.toString(16).padStart(t * 2, "0"));
}
function gl(r, t) {
  return bi(r, t).reverse();
}
function L0(r) {
  return Ai(nf(r));
}
function Ne(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = Ai(t);
    } catch (i) {
      throw new Error(`${r} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (ts(t))
    n = Uint8Array.from(t);
  else
    throw new Error(`${r} must be hex string or Uint8Array`);
  const s = n.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${r} expected ${e} bytes, got ${s}`);
  return n;
}
function qi(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    fa(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, s = 0; n < r.length; n++) {
    const i = r[n];
    e.set(i, s), s += i.length;
  }
  return e;
}
function F0(r, t) {
  if (r.length !== t.length)
    return !1;
  let e = 0;
  for (let n = 0; n < r.length; n++)
    e |= r[n] ^ t[n];
  return e === 0;
}
function M0(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function H0(r) {
  let t;
  for (t = 0; r > rf; r >>= Io, t += 1)
    ;
  return t;
}
function G0(r, t) {
  return r >> BigInt(t) & Io;
}
function V0(r, t, e) {
  return r | (e ? Io : rf) << BigInt(t);
}
const ml = (r) => (U0 << BigInt(r - 1)) - Io, qo = (r) => new Uint8Array(r), _u = (r) => Uint8Array.from(r);
function sf(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = qo(r), s = qo(r), i = 0;
  const a = () => {
    n.fill(1), s.fill(0), i = 0;
  }, o = (...h) => e(s, n, ...h), c = (h = qo()) => {
    s = o(_u([0]), h), n = o(), h.length !== 0 && (s = o(_u([1]), h), n = o());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let h = 0;
    const u = [];
    for (; h < t; ) {
      n = o();
      const f = n.slice();
      u.push(f), h += n.length;
    }
    return qi(...u);
  };
  return (h, u) => {
    a(), c(h);
    let f;
    for (; !(f = u(l())); )
      c();
    return a(), f;
  };
}
const _0 = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || ts(r),
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function pa(r, t, e = {}) {
  const n = (s, i, a) => {
    const o = _0[i];
    if (typeof o != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const c = r[s];
    if (!(a && c === void 0) && !o(c, r))
      throw new Error(`Invalid param ${String(s)}=${c} (${typeof c}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(e))
    n(s, i, !0);
  return r;
}
const j0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: fa,
  bitGet: G0,
  bitLen: H0,
  bitMask: ml,
  bitSet: V0,
  bytesToHex: es,
  bytesToNumberBE: Jn,
  bytesToNumberLE: pl,
  concatBytes: qi,
  createHmacDrbg: sf,
  ensureBytes: Ne,
  equalBytes: F0,
  hexToBytes: Ai,
  hexToNumber: fl,
  isBytes: ts,
  numberToBytesBE: bi,
  numberToBytesLE: gl,
  numberToHexUnpadded: nf,
  numberToVarBytesBE: L0,
  utf8ToBytes: M0,
  validateObject: pa
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Rt = BigInt(0), wt = BigInt(1), fn = BigInt(2), Q0 = BigInt(3), Mc = BigInt(4), ju = BigInt(5), Qu = BigInt(8);
BigInt(9);
BigInt(16);
function we(r, t) {
  const e = r % t;
  return e >= Rt ? e : t + e;
}
function z0(r, t, e) {
  if (e <= Rt || t < Rt)
    throw new Error("Expected power/modulo > 0");
  if (e === wt)
    return Rt;
  let n = wt;
  for (; t > Rt; )
    t & wt && (n = n * r % e), r = r * r % e, t >>= wt;
  return n;
}
function Hc(r, t) {
  if (r === Rt || t <= Rt)
    throw new Error(`invert: expected positive integers, got n=${r} mod=${t}`);
  let e = we(r, t), n = t, s = Rt, i = wt;
  for (; e !== Rt; ) {
    const a = n / e, o = n % e, c = s - i * a;
    n = e, e = o, s = i, i = c;
  }
  if (n !== wt)
    throw new Error("invert: does not exist");
  return we(s, t);
}
function J0(r) {
  const t = (r - wt) / fn;
  let e, n, s;
  for (e = r - wt, n = 0; e % fn === Rt; e /= fn, n++)
    ;
  for (s = fn; s < r && z0(s, t, r) !== r - wt; s++)
    ;
  if (n === 1) {
    const a = (r + wt) / Mc;
    return function(o, c) {
      const l = o.pow(c, a);
      if (!o.eql(o.sqr(l), c))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  const i = (e + wt) / fn;
  return function(a, o) {
    if (a.pow(o, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let c = n, l = a.pow(a.mul(a.ONE, s), e), h = a.pow(o, i), u = a.pow(o, e);
    for (; !a.eql(u, a.ONE); ) {
      if (a.eql(u, a.ZERO))
        return a.ZERO;
      let f = 1;
      for (let m = a.sqr(u); f < c && !a.eql(m, a.ONE); f++)
        m = a.sqr(m);
      const y = a.pow(l, wt << BigInt(c - f - 1));
      l = a.sqr(y), h = a.mul(h, y), u = a.mul(u, l), c = f;
    }
    return h;
  };
}
function K0(r) {
  if (r % Mc === Q0) {
    const t = (r + wt) / Mc;
    return function(e, n) {
      const s = e.pow(n, t);
      if (!e.eql(e.sqr(s), n))
        throw new Error("Cannot find square root");
      return s;
    };
  }
  if (r % Qu === ju) {
    const t = (r - ju) / Qu;
    return function(e, n) {
      const s = e.mul(n, fn), i = e.pow(s, t), a = e.mul(n, i), o = e.mul(e.mul(a, fn), i), c = e.mul(a, e.sub(o, e.ONE));
      if (!e.eql(e.sqr(c), n))
        throw new Error("Cannot find square root");
      return c;
    };
  }
  return J0(r);
}
const q0 = [
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
function W0(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = q0.reduce((n, s) => (n[s] = "function", n), t);
  return pa(r, e);
}
function Z0(r, t, e) {
  if (e < Rt)
    throw new Error("Expected power > 0");
  if (e === Rt)
    return r.ONE;
  if (e === wt)
    return t;
  let n = r.ONE, s = t;
  for (; e > Rt; )
    e & wt && (n = r.mul(n, s)), s = r.sqr(s), e >>= wt;
  return n;
}
function Y0(r, t) {
  const e = new Array(t.length), n = t.reduce((i, a, o) => r.is0(a) ? i : (e[o] = i, r.mul(i, a)), r.ONE), s = r.inv(n);
  return t.reduceRight((i, a, o) => r.is0(a) ? i : (e[o] = r.mul(i, e[o]), r.mul(i, a)), s), e;
}
function af(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function X0(r, t, e = !1, n = {}) {
  if (r <= Rt)
    throw new Error(`Expected Field ORDER > 0, got ${r}`);
  const { nBitLength: s, nByteLength: i } = af(r, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const a = K0(r), o = Object.freeze({
    ORDER: r,
    BITS: s,
    BYTES: i,
    MASK: ml(s),
    ZERO: Rt,
    ONE: wt,
    create: (c) => we(c, r),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);
      return Rt <= c && c < r;
    },
    is0: (c) => c === Rt,
    isOdd: (c) => (c & wt) === wt,
    neg: (c) => we(-c, r),
    eql: (c, l) => c === l,
    sqr: (c) => we(c * c, r),
    add: (c, l) => we(c + l, r),
    sub: (c, l) => we(c - l, r),
    mul: (c, l) => we(c * l, r),
    pow: (c, l) => Z0(o, c, l),
    div: (c, l) => we(c * Hc(l, r), r),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, l) => c + l,
    subN: (c, l) => c - l,
    mulN: (c, l) => c * l,
    inv: (c) => Hc(c, r),
    sqrt: n.sqrt || ((c) => a(o, c)),
    invertBatch: (c) => Y0(o, c),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (c, l, h) => h ? l : c,
    toBytes: (c) => e ? gl(c, i) : bi(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
      return e ? pl(c) : Jn(c);
    }
  });
  return Object.freeze(o);
}
function of(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function cf(r) {
  const t = of(r);
  return t + Math.ceil(t / 2);
}
function $0(r, t, e = !1) {
  const n = r.length, s = of(t), i = cf(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${n}`);
  const a = e ? Jn(r) : pl(r), o = we(a, t - wt) + wt;
  return e ? gl(o, s) : bi(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const tw = BigInt(0), Wo = BigInt(1);
function ew(r, t) {
  const e = (s, i) => {
    const a = i.negate();
    return s ? a : i;
  }, n = (s) => {
    const i = Math.ceil(t / s) + 1, a = 2 ** (s - 1);
    return { windows: i, windowSize: a };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let a = r.ZERO, o = s;
      for (; i > tw; )
        i & Wo && (a = a.add(o)), o = o.double(), i >>= Wo;
      return a;
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
      const { windows: a, windowSize: o } = n(i), c = [];
      let l = s, h = l;
      for (let u = 0; u < a; u++) {
        h = l, c.push(h);
        for (let f = 1; f < o; f++)
          h = h.add(l), c.push(h);
        l = h.double();
      }
      return c;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(s, i, a) {
      const { windows: o, windowSize: c } = n(s);
      let l = r.ZERO, h = r.BASE;
      const u = BigInt(2 ** s - 1), f = 2 ** s, y = BigInt(s);
      for (let m = 0; m < o; m++) {
        const g = m * c;
        let w = Number(a & u);
        a >>= y, w > c && (w -= f, a += Wo);
        const E = g, O = g + Math.abs(w) - 1, N = m % 2 !== 0, U = w < 0;
        w === 0 ? h = h.add(e(N, i[E])) : l = l.add(e(U, i[O]));
      }
      return { p: l, f: h };
    },
    wNAFCached(s, i, a, o) {
      const c = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, c), c !== 1 && i.set(s, o(l))), this.wNAF(c, l, a);
    }
  };
}
function lf(r) {
  return W0(r.Fp), pa(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...af(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function rw(r) {
  const t = lf(r);
  pa(t, {
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
  const { endo: e, Fp: n, a: s } = t;
  if (e) {
    if (!n.eql(s, n.ZERO))
      throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: nw, hexToBytes: sw } = j0, En = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(r = "") {
      super(r);
    }
  },
  _parseInt(r) {
    const { Err: t } = En;
    if (r.length < 2 || r[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = r[1], n = r.subarray(2, e + 2);
    if (!e || n.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (n[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (n[0] === 0 && !(n[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: nw(n), l: r.subarray(e + 2) };
  },
  toSig(r) {
    const { Err: t } = En, e = typeof r == "string" ? sw(r) : r;
    fa(e);
    let n = e.length;
    if (n < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== n - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = En._parseInt(e.subarray(2)), { d: a, l: o } = En._parseInt(i);
    if (o.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: a };
  },
  hexFromSig(r) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const h = l.toString(16);
      return h.length & 1 ? `0${h}` : h;
    }, n = t(e(r.s)), s = t(e(r.r)), i = n.length / 2, a = s.length / 2, o = e(i), c = e(a);
    return `30${e(a + i + 4)}02${c}${s}02${o}${n}`;
  }
}, br = BigInt(0), ye = BigInt(1);
BigInt(2);
const zu = BigInt(3);
BigInt(4);
function iw(r) {
  const t = rw(r), { Fp: e } = t, n = t.toBytes || ((m, g, w) => {
    const E = g.toAffine();
    return qi(Uint8Array.from([4]), e.toBytes(E.x), e.toBytes(E.y));
  }), s = t.fromBytes || ((m) => {
    const g = m.subarray(1), w = e.fromBytes(g.subarray(0, e.BYTES)), E = e.fromBytes(g.subarray(e.BYTES, 2 * e.BYTES));
    return { x: w, y: E };
  });
  function i(m) {
    const { a: g, b: w } = t, E = e.sqr(m), O = e.mul(E, m);
    return e.add(e.add(O, e.mul(m, g)), w);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(m) {
    return typeof m == "bigint" && br < m && m < t.n;
  }
  function o(m) {
    if (!a(m))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function c(m) {
    const { allowedPrivateKeyLengths: g, nByteLength: w, wrapPrivateKey: E, n: O } = t;
    if (g && typeof m != "bigint") {
      if (ts(m) && (m = es(m)), typeof m != "string" || !g.includes(m.length))
        throw new Error("Invalid key");
      m = m.padStart(w * 2, "0");
    }
    let N;
    try {
      N = typeof m == "bigint" ? m : Jn(Ne("private key", m, w));
    } catch {
      throw new Error(`private key must be ${w} bytes, hex or bigint, not ${typeof m}`);
    }
    return E && (N = we(N, O)), o(N), N;
  }
  const l = /* @__PURE__ */ new Map();
  function h(m) {
    if (!(m instanceof u))
      throw new Error("ProjectivePoint expected");
  }
  class u {
    constructor(g, w, E) {
      if (this.px = g, this.py = w, this.pz = E, g == null || !e.isValid(g))
        throw new Error("x required");
      if (w == null || !e.isValid(w))
        throw new Error("y required");
      if (E == null || !e.isValid(E))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(g) {
      const { x: w, y: E } = g || {};
      if (!g || !e.isValid(w) || !e.isValid(E))
        throw new Error("invalid affine point");
      if (g instanceof u)
        throw new Error("projective point not allowed");
      const O = (N) => e.eql(N, e.ZERO);
      return O(w) && O(E) ? u.ZERO : new u(w, E, e.ONE);
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
    static normalizeZ(g) {
      const w = e.invertBatch(g.map((E) => E.pz));
      return g.map((E, O) => E.toAffine(w[O])).map(u.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(g) {
      const w = u.fromAffine(s(Ne("pointHex", g)));
      return w.assertValidity(), w;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(g) {
      return u.BASE.multiply(c(g));
    }
    // "Private method", don't use it directly
    _setWindowSize(g) {
      this._WINDOW_SIZE = g, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: g, y: w } = this.toAffine();
      if (!e.isValid(g) || !e.isValid(w))
        throw new Error("bad point: x or y not FE");
      const E = e.sqr(w), O = i(g);
      if (!e.eql(E, O))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: g } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(g);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(g) {
      h(g);
      const { px: w, py: E, pz: O } = this, { px: N, py: U, pz: P } = g, I = e.eql(e.mul(w, P), e.mul(N, O)), k = e.eql(e.mul(E, P), e.mul(U, O));
      return I && k;
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
      const { a: g, b: w } = t, E = e.mul(w, zu), { px: O, py: N, pz: U } = this;
      let P = e.ZERO, I = e.ZERO, k = e.ZERO, S = e.mul(O, O), _ = e.mul(N, N), D = e.mul(U, U), F = e.mul(O, N);
      return F = e.add(F, F), k = e.mul(O, U), k = e.add(k, k), P = e.mul(g, k), I = e.mul(E, D), I = e.add(P, I), P = e.sub(_, I), I = e.add(_, I), I = e.mul(P, I), P = e.mul(F, P), k = e.mul(E, k), D = e.mul(g, D), F = e.sub(S, D), F = e.mul(g, F), F = e.add(F, k), k = e.add(S, S), S = e.add(k, S), S = e.add(S, D), S = e.mul(S, F), I = e.add(I, S), D = e.mul(N, U), D = e.add(D, D), S = e.mul(D, F), P = e.sub(P, S), k = e.mul(D, _), k = e.add(k, k), k = e.add(k, k), new u(P, I, k);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(g) {
      h(g);
      const { px: w, py: E, pz: O } = this, { px: N, py: U, pz: P } = g;
      let I = e.ZERO, k = e.ZERO, S = e.ZERO;
      const _ = t.a, D = e.mul(t.b, zu);
      let F = e.mul(w, N), j = e.mul(E, U), $ = e.mul(O, P), Et = e.add(w, E), v = e.add(N, U);
      Et = e.mul(Et, v), v = e.add(F, j), Et = e.sub(Et, v), v = e.add(w, O);
      let T = e.add(N, P);
      return v = e.mul(v, T), T = e.add(F, $), v = e.sub(v, T), T = e.add(E, O), I = e.add(U, P), T = e.mul(T, I), I = e.add(j, $), T = e.sub(T, I), S = e.mul(_, v), I = e.mul(D, $), S = e.add(I, S), I = e.sub(j, S), S = e.add(j, S), k = e.mul(I, S), j = e.add(F, F), j = e.add(j, F), $ = e.mul(_, $), v = e.mul(D, v), j = e.add(j, $), $ = e.sub(F, $), $ = e.mul(_, $), v = e.add(v, $), F = e.mul(j, v), k = e.add(k, F), F = e.mul(T, v), I = e.mul(Et, I), I = e.sub(I, F), F = e.mul(Et, j), S = e.mul(T, S), S = e.add(S, F), new u(I, k, S);
    }
    subtract(g) {
      return this.add(g.negate());
    }
    is0() {
      return this.equals(u.ZERO);
    }
    wNAF(g) {
      return y.wNAFCached(this, l, g, (w) => {
        const E = e.invertBatch(w.map((O) => O.pz));
        return w.map((O, N) => O.toAffine(E[N])).map(u.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(g) {
      const w = u.ZERO;
      if (g === br)
        return w;
      if (o(g), g === ye)
        return this;
      const { endo: E } = t;
      if (!E)
        return y.unsafeLadder(this, g);
      let { k1neg: O, k1: N, k2neg: U, k2: P } = E.splitScalar(g), I = w, k = w, S = this;
      for (; N > br || P > br; )
        N & ye && (I = I.add(S)), P & ye && (k = k.add(S)), S = S.double(), N >>= ye, P >>= ye;
      return O && (I = I.negate()), U && (k = k.negate()), k = new u(e.mul(k.px, E.beta), k.py, k.pz), I.add(k);
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
    multiply(g) {
      o(g);
      let w = g, E, O;
      const { endo: N } = t;
      if (N) {
        const { k1neg: U, k1: P, k2neg: I, k2: k } = N.splitScalar(w);
        let { p: S, f: _ } = this.wNAF(P), { p: D, f: F } = this.wNAF(k);
        S = y.constTimeNegate(U, S), D = y.constTimeNegate(I, D), D = new u(e.mul(D.px, N.beta), D.py, D.pz), E = S.add(D), O = _.add(F);
      } else {
        const { p: U, f: P } = this.wNAF(w);
        E = U, O = P;
      }
      return u.normalizeZ([E, O])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(g, w, E) {
      const O = u.BASE, N = (P, I) => I === br || I === ye || !P.equals(O) ? P.multiplyUnsafe(I) : P.multiply(I), U = N(this, w).add(N(g, E));
      return U.is0() ? void 0 : U;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(g) {
      const { px: w, py: E, pz: O } = this, N = this.is0();
      g == null && (g = N ? e.ONE : e.inv(O));
      const U = e.mul(w, g), P = e.mul(E, g), I = e.mul(O, g);
      if (N)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(I, e.ONE))
        throw new Error("invZ was invalid");
      return { x: U, y: P };
    }
    isTorsionFree() {
      const { h: g, isTorsionFree: w } = t;
      if (g === ye)
        return !0;
      if (w)
        return w(u, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: g, clearCofactor: w } = t;
      return g === ye ? this : w ? w(u, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(g = !0) {
      return this.assertValidity(), n(u, this, g);
    }
    toHex(g = !0) {
      return es(this.toRawBytes(g));
    }
  }
  u.BASE = new u(t.Gx, t.Gy, e.ONE), u.ZERO = new u(e.ZERO, e.ONE, e.ZERO);
  const f = t.nBitLength, y = ew(u, t.endo ? Math.ceil(f / 2) : f);
  return {
    CURVE: t,
    ProjectivePoint: u,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: a
  };
}
function aw(r) {
  const t = lf(r);
  return pa(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function ow(r) {
  const t = aw(r), { Fp: e, n } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function a(v) {
    return br < v && v < e.ORDER;
  }
  function o(v) {
    return we(v, n);
  }
  function c(v) {
    return Hc(v, n);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: h, weierstrassEquation: u, isWithinCurveOrder: f } = iw({
    ...t,
    toBytes(v, T, L) {
      const z = T.toAffine(), V = e.toBytes(z.x), Y = qi;
      return L ? Y(Uint8Array.from([T.hasEvenY() ? 2 : 3]), V) : Y(Uint8Array.from([4]), V, e.toBytes(z.y));
    },
    fromBytes(v) {
      const T = v.length, L = v[0], z = v.subarray(1);
      if (T === s && (L === 2 || L === 3)) {
        const V = Jn(z);
        if (!a(V))
          throw new Error("Point is not on curve");
        const Y = u(V);
        let at;
        try {
          at = e.sqrt(Y);
        } catch (Nt) {
          const vt = Nt instanceof Error ? ": " + Nt.message : "";
          throw new Error("Point is not on curve" + vt);
        }
        const st = (at & ye) === ye;
        return (L & 1) === 1 !== st && (at = e.neg(at)), { x: V, y: at };
      } else if (T === i && L === 4) {
        const V = e.fromBytes(z.subarray(0, e.BYTES)), Y = e.fromBytes(z.subarray(e.BYTES, 2 * e.BYTES));
        return { x: V, y: Y };
      } else
        throw new Error(`Point of length ${T} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), y = (v) => es(bi(v, t.nByteLength));
  function m(v) {
    const T = n >> ye;
    return v > T;
  }
  function g(v) {
    return m(v) ? o(-v) : v;
  }
  const w = (v, T, L) => Jn(v.slice(T, L));
  class E {
    constructor(T, L, z) {
      this.r = T, this.s = L, this.recovery = z, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(T) {
      const L = t.nByteLength;
      return T = Ne("compactSignature", T, L * 2), new E(w(T, 0, L), w(T, L, 2 * L));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(T) {
      const { r: L, s: z } = En.toSig(Ne("DER", T));
      return new E(L, z);
    }
    assertValidity() {
      if (!f(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!f(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(T) {
      return new E(this.r, this.s, T);
    }
    recoverPublicKey(T) {
      const { r: L, s: z, recovery: V } = this, Y = k(Ne("msgHash", T));
      if (V == null || ![0, 1, 2, 3].includes(V))
        throw new Error("recovery id invalid");
      const at = V === 2 || V === 3 ? L + t.n : L;
      if (at >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const st = V & 1 ? "03" : "02", Nt = l.fromHex(st + y(at)), vt = c(at), $t = o(-Y * vt), be = o(z * vt), Ot = l.BASE.multiplyAndAddUnsafe(Nt, $t, be);
      if (!Ot)
        throw new Error("point at infinify");
      return Ot.assertValidity(), Ot;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new E(this.r, o(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Ai(this.toDERHex());
    }
    toDERHex() {
      return En.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Ai(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const O = {
    isValidPrivateKey(v) {
      try {
        return h(v), !0;
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
      const v = cf(t.n);
      return $0(t.randomBytes(v), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(v = 8, T = l.BASE) {
      return T._setWindowSize(v), T.multiply(BigInt(3)), T;
    }
  };
  function N(v, T = !0) {
    return l.fromPrivateKey(v).toRawBytes(T);
  }
  function U(v) {
    const T = ts(v), L = typeof v == "string", z = (T || L) && v.length;
    return T ? z === s || z === i : L ? z === 2 * s || z === 2 * i : v instanceof l;
  }
  function P(v, T, L = !0) {
    if (U(v))
      throw new Error("first arg must be private key");
    if (!U(T))
      throw new Error("second arg must be public key");
    return l.fromHex(T).multiply(h(v)).toRawBytes(L);
  }
  const I = t.bits2int || function(v) {
    const T = Jn(v), L = v.length * 8 - t.nBitLength;
    return L > 0 ? T >> BigInt(L) : T;
  }, k = t.bits2int_modN || function(v) {
    return o(I(v));
  }, S = ml(t.nBitLength);
  function _(v) {
    if (typeof v != "bigint")
      throw new Error("bigint expected");
    if (!(br <= v && v < S))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return bi(v, t.nByteLength);
  }
  function D(v, T, L = F) {
    if (["recovered", "canonical"].some((Ht) => Ht in L))
      throw new Error("sign() legacy options not supported");
    const { hash: z, randomBytes: V } = t;
    let { lowS: Y, prehash: at, extraEntropy: st } = L;
    Y == null && (Y = !0), v = Ne("msgHash", v), at && (v = Ne("prehashed msgHash", z(v)));
    const Nt = k(v), vt = h(T), $t = [_(vt), _(Nt)];
    if (st != null && st !== !1) {
      const Ht = st === !0 ? V(e.BYTES) : st;
      $t.push(Ne("extraEntropy", Ht));
    }
    const be = qi(...$t), Ot = Nt;
    function an(Ht) {
      const te = I(Ht);
      if (!f(te))
        return;
      const $e = c(te), pt = l.BASE.multiply(te).toAffine(), ee = o(pt.x);
      if (ee === br)
        return;
      const tr = o($e * o(Ot + ee * vt));
      if (tr === br)
        return;
      let vi = (pt.x === ee ? 0 : 2) | Number(pt.y & ye), xi = tr;
      return Y && m(tr) && (xi = g(tr), vi ^= 1), new E(ee, xi, vi);
    }
    return { seed: be, k2sig: an };
  }
  const F = { lowS: t.lowS, prehash: !1 }, j = { lowS: t.lowS, prehash: !1 };
  function $(v, T, L = F) {
    const { seed: z, k2sig: V } = D(v, T, L), Y = t;
    return sf(Y.hash.outputLen, Y.nByteLength, Y.hmac)(z, V);
  }
  l.BASE._setWindowSize(8);
  function Et(v, T, L, z = j) {
    var $e;
    const V = v;
    if (T = Ne("msgHash", T), L = Ne("publicKey", L), "strict" in z)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: Y, prehash: at } = z;
    let st, Nt;
    try {
      if (typeof V == "string" || ts(V))
        try {
          st = E.fromDER(V);
        } catch (pt) {
          if (!(pt instanceof En.Err))
            throw pt;
          st = E.fromCompact(V);
        }
      else if (typeof V == "object" && typeof V.r == "bigint" && typeof V.s == "bigint") {
        const { r: pt, s: ee } = V;
        st = new E(pt, ee);
      } else
        throw new Error("PARSE");
      Nt = l.fromHex(L);
    } catch (pt) {
      if (pt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (Y && st.hasHighS())
      return !1;
    at && (T = t.hash(T));
    const { r: vt, s: $t } = st, be = k(T), Ot = c($t), an = o(be * Ot), Ht = o(vt * Ot), te = ($e = l.BASE.multiplyAndAddUnsafe(Nt, an, Ht)) == null ? void 0 : $e.toAffine();
    return te ? o(te.x) === vt : !1;
  }
  return {
    CURVE: t,
    getPublicKey: N,
    getSharedSecret: P,
    sign: $,
    verify: Et,
    ProjectivePoint: l,
    Signature: E,
    utils: O
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function cw(r) {
  return {
    hash: r,
    hmac: (t, ...e) => ef(r, t, N0(...e)),
    randomBytes: T0
  };
}
function lw(r, t) {
  const e = (n) => ow({ ...r, ...cw(n) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const uf = X0(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), uw = uf.create(BigInt("-3")), hw = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), dw = lw({
  a: uw,
  // Equation params: a, b
  b: hw,
  Fp: uf,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: !1
}, B0), Ju = dw, Li = "embeddedWallet", yl = 23294, wl = 23295, Ei = {
  WALLET_CONTEXT: "oaw_context",
  TRANSACTIONS_CONTEXT: "oaw_transactions",
  TOKENS_CONTEXT: "oaw_tokens"
}, Gt = {
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
}, hf = {
  [Gt.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: "Sapphire provider not initialized",
  [Gt.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: "Account manager contract not initialized",
  [Gt.NO_USERNAME]: "No username",
  [Gt.NO_PASSWORD]: "No password",
  [Gt.NO_LOGIN_PROXY_DATA]: "No login proxy data",
  [Gt.AUTHENTICATION_DATA_NOT_PROVIDED]: "Authentication data not provided",
  [Gt.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [Gt.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: "No rpc url configured for selected chainid",
  [Gt.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: "Cross chain provider not initialized",
  [Gt.OASIS_WALLET_NOT_INITIALIZED]: "Embedded wallet not initialized",
  [Gt.CANT_HASH_USERNAME]: "Can't hash username",
  [Gt.NO_APILLON_SESSION_TOKEN_CALLBACK]: "Session token callback must be provided",
  [Gt.INVALID_APILLON_SESSION_TOKEN]: "Session token is not valid"
};
function Ku(r) {
  if (typeof window < "u")
    return window[Li] = new df(r), window[Li];
}
function Fi() {
  if (typeof window < "u")
    return window[Li] || (window[Li] = new df()), window[Li];
}
async function Kn(r = "") {
  var e, n;
  const t = await ((n = (e = Fi()) == null ? void 0 : e.accountManagerContract) == null ? void 0 : n.salt());
  if (t)
    return kf(r, xt(t), 1e5, 32, "sha256");
}
function Zo(r) {
  return [wl, yl].includes(r);
}
function X(r, t = "Error") {
  const e = new Error(t);
  throw e.name = Gt[r], e;
}
class qu {
  constructor() {
    b(this, "abiCoder", Xn.defaultAbiCoder());
  }
  async getRegisterData(t) {
    t.username || X("NO_USERNAME"), t.password || X("NO_PASSWORD");
    const e = await Kn(t.username);
    if (!e) {
      X("CANT_HASH_USERNAME");
      return;
    }
    const n = this.generateNewKeypair();
    return {
      hashedUsername: e,
      credentialId: n.credentialId,
      pubkey: {
        kty: 2,
        // Elliptic Curve format
        alg: -7,
        // ES256 algorithm
        crv: 1,
        // P-256 curve
        x: n.decoded_x,
        y: n.decoded_y
      },
      optionalPassword: xc(t.password)
    };
  }
  async getProxyResponse(t, e, n) {
    n.username || X("NO_USERNAME"), n.password || X("NO_PASSWORD");
    const s = await Kn(n.username);
    s || X("CANT_HASH_USERNAME");
    const i = $m(
      ["bytes32", "bytes"],
      [xc(n.password), e]
    );
    return await t.proxyViewPassword(s, i, e);
  }
  generateNewKeypair() {
    const t = Ju.utils.randomPrivateKey(), e = Ju.getPublicKey(t, !1), n = "0x" + es(e), s = this.abiCoder.encode(["string"], [n]), i = n.slice(4, n.length), a = BigInt("0x" + i.slice(0, 64)), o = BigInt("0x" + i.slice(64, i.length));
    return {
      credentialId: s,
      privateKey: t,
      decoded_x: a,
      decoded_y: o
    };
  }
}
function fw(r) {
  return r[0] << 24 | r[1] << 16 | r[2] << 8 | r[3];
}
function pw(r) {
  return r[0] << 8 | r[1];
}
function gw(r) {
  const t = Xu.decode(r), e = t[1];
  if (e == 2) {
    const n = {
      kty: e,
      alg: t[3],
      crv: t[-1],
      x: li(t[-2]),
      /** @type {Uint8Array} */
      y: li(t[-3])
    };
    if (!(n.alg == -7 && n.crv == 1) && // ES256 + P-256 (NIST)
    !(n.alg == -8 && n.crv == 6))
      throw new Error(`Unknown alg: ${n.alg}, crv: ${n.crv}`);
    return n;
  }
  throw new Error(`Unsupported kty: ${e}`);
}
function mw(r) {
  if (r.byteLength - r.byteOffset < 37)
    throw new Error("Attestation Object must be at least 37 bytes or longer");
  const t = r.slice(32, 33)[0], e = {
    rpIdHash: r.slice(0, 32),
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
    signCount: fw(r.slice(33, 37))
    //  4 bytes
  };
  if (e.flags.ED)
    throw new Error("Extension Data not supported!");
  if (e.flags.AT) {
    const n = pw(r.slice(53, 55));
    e.attestedCredentialData = {
      aaguid: r.slice(37, 53),
      // 16 bytes
      credentialId: r.slice(55, 55 + n),
      // vanillacbor.decodeOnlyFirst(buffer).byteLength;
      // https://www.w3.org/TR/webauthn-2/#sctn-encoded-credPubKey-examples
      credentialPublicKey: gw(r.slice(55 + n).buffer)
    };
  }
  return e;
}
function yw(r) {
  const t = Xu.decode(new Uint8Array(r).buffer).authData;
  return mw(t);
}
async function ww(r, t, e) {
  const n = await navigator.credentials.create({
    publicKey: {
      attestation: "none",
      challenge: e.buffer,
      pubKeyCredParams: [
        //{alg: -8, type: "public-key"},   // Ed25519
        { alg: -7, type: "public-key" }
        // ES256
        //{alg: -257, type: "public-key"}  // RS256
      ],
      rp: r,
      user: t
    }
  });
  if (!n)
    throw new Error("No PublicKeyCredential returned!");
  const s = n.response, i = new TextDecoder("utf-8").decode(s.clientDataJSON);
  return {
    id: new Uint8Array(n.rawId),
    cd: i,
    ad: yw(s.attestationObject)
  };
}
function Aw(r) {
  return Object.entries(r).map(([t, e]) => {
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
const bw = new Ta.Sequence({
  name: "sig",
  value: [
    new Ta.Integer({
      name: "r"
    }),
    new Ta.Integer({
      name: "s"
    })
  ]
});
async function Ew(r, t) {
  t || (t = crypto.getRandomValues(new Uint8Array(32)));
  const e = await navigator.credentials.get({
    publicKey: {
      allowCredentials: r.map((l) => ({ id: l, type: "public-key" })),
      challenge: t
    }
  }), n = e.response, s = Ta.verifySchema(n.signature, bw);
  if (!s.verified)
    throw new Error("Unable to decode ASN.1 signature!");
  const i = s.result, a = i.r.toBigInt(), o = i.s.toBigInt(), c = JSON.parse(new TextDecoder().decode(n.clientDataJSON));
  return {
    credentialIdHashed: ft(new Uint8Array(e.rawId)),
    challenge: t,
    resp: {
      authenticatorData: new Uint8Array(n.authenticatorData),
      clientDataTokens: Aw(c),
      sigR: a,
      sigS: o
    }
  };
}
class Wu {
  async getRegisterData(t) {
    t.username || X("NO_USERNAME");
    const e = await Kn(t.username);
    if (!e) {
      X("CANT_HASH_USERNAME");
      return;
    }
    const n = await ww(
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
      credentialId: n.id,
      pubkey: n.ad.attestedCredentialData.credentialPublicKey,
      optionalPassword: gc
    };
  }
  async getProxyResponse(t, e, n) {
    n.username || X("NO_USERNAME");
    const s = n.hashedUsername || await Kn(n.username);
    s || X("CANT_HASH_USERNAME");
    const i = await t.personalization(), a = await t.credentialIdsByUsername(s), o = await Ew(
      // binary credential ids
      a.map((c) => xt(c)),
      // challenge
      xt(rn(i + rn(e).slice(2)))
    );
    return await t.proxyView(o.credentialIdHashed, o.resp, e);
  }
}
class vw extends $u {
  constructor() {
    super(new Error(hf[Gt.OASIS_WALLET_NOT_INITIALIZED]), {
      code: 4900,
      shortMessage: "Disconnected"
    });
  }
}
class Yo extends $u {
  constructor() {
    super(new Error("Request rejected by user"), {
      code: 4001,
      shortMessage: "User Rejected Request"
    });
  }
}
var xw = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class df {
  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(t) {
    b(this, "sapphireProvider");
    b(this, "accountManagerContract");
    b(this, "abiCoder", Xn.defaultAbiCoder());
    b(this, "events");
    b(this, "onGetSignature");
    b(this, "onGetApillonSessionToken");
    b(this, "isTest", !1);
    b(this, "defaultNetworkId", 0);
    b(this, "rpcUrls", {});
    b(this, "rpcProviders", {});
    b(this, "explorerUrls", {
      [yl]: "https://explorer.oasis.io/mainnet/sapphire",
      [wl]: "https://explorer.oasis.io/testnet/sapphire"
    });
    b(this, "lastAccount", {
      username: "",
      authStrategy: "passkey",
      address: "",
      contractAddress: ""
    });
    /**
     * Resolve on login/register if defined. This resolves EIP-1193 request.
     */
    b(this, "waitForAccountResolver", null);
    const e = new zo(
      t != null && t.test ? "https://testnet.sapphire.oasis.io" : "https://sapphire.oasis.io"
    );
    if (this.sapphireProvider = Pf.wrap(e), this.accountManagerContract = new zn(
      (t == null ? void 0 : t.accountManagerAddress) || "0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1",
      !(t != null && t.onGetSignature) && !(t != null && t.onGetApillonSessionToken) ? A0 : Xd,
      new to(gi, this.sapphireProvider)
    ), this.defaultNetworkId = (t == null ? void 0 : t.defaultNetworkId) || this.defaultNetworkId, t == null ? void 0 : t.networkConfig)
      for (const n in t.networkConfig)
        this.rpcUrls[n] = t.networkConfig[n].rpcUrl, this.explorerUrls[n] = t.networkConfig[n].explorerUrl;
    this.events = Rf(), this.isTest = !!(t != null && t.test), this.onGetSignature = t == null ? void 0 : t.onGetSignature, this.onGetApillonSessionToken = t == null ? void 0 : t.onGetApillonSessionToken;
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
    return this.sapphireProvider || X("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || X("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), await this.accountManagerContract.userExists(
      await Kn(t)
    ) || !1;
  }
  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   */
  async register(t, e) {
    this.sapphireProvider || X("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || X("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    let n;
    t === "password" ? n = await new qu().getRegisterData(e) : t === "passkey" && (n = await new Wu().getRegisterData(e));
    const s = this.abiCoder.encode(
      ["tuple(bytes funcData, uint8 txType)"],
      [
        {
          funcData: this.abiCoder.encode(
            [
              "tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword)"
            ],
            [n]
          ),
          txType: 0
        }
      ]
    ), i = (await this.sapphireProvider.getFeeData()).gasPrice, a = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    );
    let o = "";
    if (this.onGetSignature || this.onGetApillonSessionToken) {
      this.onGetSignature || (this.onGetSignature = this.getApillonSignature);
      const l = await this.onGetSignature(s);
      l.signature || X("CANT_GET_SIGNATURE"), o = await this.accountManagerContract.generateGaslessTx(
        s,
        a,
        l.gasPrice ? BigInt(l.gasPrice) : i,
        l.gasLimit ? BigInt(l.gasLimit) : 1000000n,
        BigInt(l.timestamp),
        l.signature
      );
    } else
      o = await this.accountManagerContract.generateGaslessTx(
        s,
        a,
        i
      );
    const c = await this.sapphireProvider.send("eth_sendRawTransaction", [o]);
    if (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "username",
      newValue: e.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, await this.waitForTxReceipt(c))
      return await this.handleAccountAfterAuth(e.username);
  }
  /**
   * Check that credentials belong to some account.
   */
  async authenticate(t, e) {
    this.sapphireProvider || X("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || X("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), e.username || X("NO_USERNAME");
    const n = "0x000000000000000000000000000000000000000000000000000000000000DEAD", s = await Kn(e.username), i = new Lr(Ia), a = i.encodeFunctionData("sign", [n]), o = await this.getProxyForStrategy(t, a, {
      ...e,
      hashedUsername: s
    });
    o || X("NO_LOGIN_PROXY_DATA");
    const [[c, l, h]] = i.decodeFunctionResult("sign", o).toArray(), u = wd(n, {
      r: c,
      s: l,
      v: h
    }), f = await this.accountManagerContract.getAccount(s);
    if (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "username",
      newValue: e.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, f.length > 1 && u === f[1])
      return await this.handleAccountAfterAuth(e.username);
  }
  /**
   * Return address for username.
   * - Public EVM address
   * - Account contract address (deployed on sapphire)
   */
  async getAccountAddress(t) {
    if (this.sapphireProvider || X("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || X("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), !t) {
      if (this.lastAccount.address)
        return {
          publicAddress: this.lastAccount.address,
          accountContractAddress: this.lastAccount.contractAddress
        };
      X("NO_USERNAME");
    }
    const e = await Kn(t), n = await this.accountManagerContract.getAccount(e);
    if (Array.isArray(n) && n.length > 1)
      return this.events.emit("dataUpdated", {
        name: "address",
        newValue: n[1],
        oldValue: this.lastAccount.address
      }), this.lastAccount.address = n[1], this.lastAccount.contractAddress = n[0], {
        publicAddress: n[1],
        accountContractAddress: n[0]
      };
  }
  async getAccountBalance(t, e = this.defaultNetworkId, n = 18) {
    var i;
    if (!e || Zo(e))
      return Fl(await ((i = this.sapphireProvider) == null ? void 0 : i.getBalance(t)) || 0n, n);
    if (!this.rpcUrls[e])
      return "0";
    const s = this.rpcProviders[e] || new zo(this.rpcUrls[e]);
    return Fl(await s.getBalance(t), n);
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
      return X("NO_APILLON_SESSION_TOKEN_CALLBACK"), { signature: "", gasLimit: 0, timestamp: 0 };
    try {
      const e = await this.onGetApillonSessionToken();
      e || X("INVALID_APILLON_SESSION_TOKEN");
      const { data: n } = await (await fetch(
        `${xw.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/signature`,
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
        signature: n.signature,
        gasLimit: n.gasLimit || 0,
        gasPrice: n.gasPrice || 0,
        timestamp: n.timestamp
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
    this.sapphireProvider || X("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const e = new Lr(Ia);
    let n = t.data || "";
    const s = t.message;
    if ((!n || t.mustConfirm) && (typeof t.message == "string" && !t.message.startsWith("0x") && (t.message = xc(t.message)), n = e.encodeFunctionData("sign", [t.message]), t.mustConfirm))
      return await new Promise((a, o) => {
        this.events.emit("signatureRequest", {
          ...t,
          data: n,
          message: s,
          mustConfirm: !1,
          resolve: a,
          reject: o
        });
      });
    t.authData || (t.strategy === "passkey" && this.lastAccount.username ? t.authData = { username: this.lastAccount.username } : X("AUTHENTICATION_DATA_NOT_PROVIDED"));
    const i = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      n,
      t.authData
    );
    if (i) {
      const [a] = e.decodeFunctionResult("sign", i).toArray();
      if (Array.isArray(a) && a.length > 2) {
        const o = Ae.from({
          r: a[0],
          s: a[1],
          v: a[2]
        }).serialized;
        return t.resolve && t.resolve(o), o;
      }
    }
  }
  /**
   * Authenticate with selected auth strategy through sapphire "Account Manager",
   * then return signed tx data and chainId of tx.
   */
  async signPlainTransaction(t) {
    var a;
    const e = this.validateChainId(
      ((a = t == null ? void 0 : t.tx) == null ? void 0 : a.chainId) && +t.tx.chainId.toString() || 0
    );
    if (t.tx.chainId = e, t.tx.nonce || (t.tx.nonce = await this.getRpcProviderForChainId(e).getTransactionCount(
      this.lastAccount.address
    )), t.tx.type === "eip1559" && (t.tx.type = 2, t.tx.gasLimit = t.tx.gas), t.tx.gasPrice || (t.tx.gasPrice = (await this.getRpcProviderForChainId(t.tx.chainId).getFeeData()).gasPrice), t.tx.gasLimit || (t.tx.gasLimit = 1e6), (t.tx.type === 2 && !t.tx.value || "value" in t.tx && typeof t.tx.value > "u") && (t.tx.value = 0n), t.mustConfirm)
      return await new Promise((o, c) => {
        this.events.emit("txApprove", {
          plain: { ...t, mustConfirm: !1, resolve: o, reject: c }
        });
      });
    t.authData || X("AUTHENTICATION_DATA_NOT_PROVIDED");
    const n = new Lr(Ia), s = n.encodeFunctionData("signEIP155", [t.tx]), i = await this.getProxyForStrategy(t.strategy, s, t.authData);
    if (i) {
      const [o] = n.decodeFunctionResult("signEIP155", i).toArray();
      return t.resolve && t.resolve({
        signedTxData: o,
        chainId: e
      }), {
        signedTxData: o,
        chainId: e
      };
    }
  }
  /**
   * Send raw transaction data to network.
   * If chainId is provided, the transaction is sent to that network (cross-chain).
   */
  async broadcastTransaction(t, e, n = "Transaction") {
    const s = this.getRpcProviderForChainId(e), i = await s.send("eth_sendRawTransaction", [t]), a = {
      hash: i,
      label: n,
      rawData: t,
      owner: this.lastAccount.address || "none",
      status: "pending",
      chainId: e || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[e || this.defaultNetworkId] ? `${this.explorerUrls[e || this.defaultNetworkId]}/tx/${i}` : "",
      createdAt: Date.now()
    };
    return this.events.emit("txSubmitted", a), {
      txHash: i,
      ethProvider: s,
      txItem: a
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
    t.authData || X("AUTHENTICATION_DATA_NOT_PROVIDED");
    const n = await this.getAccountAddress(t.authData.username);
    n != null && n.publicAddress || X("CANT_GET_ACCOUNT_ADDRESS");
    const s = new Lr(t.contractAbi).encodeFunctionData(
      t.contractFunctionName,
      t.contractFunctionValues
    ), i = await new to(
      n.publicAddress,
      this.getRpcProviderForChainId(e)
    ).populateTransaction({
      from: n.publicAddress,
      to: t.contractAddress,
      gasLimit: 1e6,
      value: 0,
      data: s
    });
    i.gasPrice = 2e10;
    const a = new Lr(Ia), o = a.encodeFunctionData("signEIP155", [i]), c = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      o,
      t.authData
    );
    if (c) {
      const [l] = a.decodeFunctionResult("signEIP155", c).toArray();
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
    const e = this.validateChainId(t.chainId), n = this.getRpcProviderForChainId(e), s = new zn(t.contractAddress, t.contractAbi, n);
    return t.contractFunctionValues ? await s[t.contractFunctionName](...t.contractFunctionValues) : await s[t.contractFunctionName]();
  }
  // #endregion
  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(t, e, n) {
    if (this.accountManagerContract || X("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), t === "password")
      return await new qu().getProxyResponse(
        this.accountManagerContract,
        e,
        n
      );
    if (t === "passkey")
      return await new Wu().getProxyResponse(
        this.accountManagerContract,
        e,
        n
      );
  }
  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(t, e) {
    !e && !this.sapphireProvider && X("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const n = 60;
    let s = 0;
    for (; ; ) {
      const i = await (e || this.sapphireProvider).getTransactionReceipt(t);
      if (i)
        return i;
      if (s += 1, s >= n)
        return;
      await new Promise((a) => setTimeout(a, 1e3));
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
    return (t && !Zo(t) && !this.rpcUrls[t] || !t && this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) && X("NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID"), !t && this.defaultNetworkId && (t = this.defaultNetworkId), t;
  }
  /**
   * Get provider object for chainId.
   * If no chainId specified, use sapphire network rpc.
   */
  getRpcProviderForChainId(t) {
    if (!t || t && Zo(+t.toString()))
      return this.sapphireProvider || (this.events.emit("disconnect", { error: new vw() }), X("SAPPHIRE_PROVIDER_NOT_INITIALIZED")), this.sapphireProvider;
    {
      const e = this.rpcProviders[t] || new zo(this.rpcUrls[t]);
      return this.rpcProviders[t] = e, e || X("CROSS_CHAIN_PROVIDER_NOT_INITIALIZED"), e;
    }
  }
  // #endregion
}
Sf(Xd);
const ff = (r = 0) => ({
  username: "",
  address: "",
  contractAddress: "",
  balance: "",
  authStrategy: "passkey",
  networkId: r,
  walletScreen: "main",
  displayedError: ""
});
function Nw(r, t) {
  switch (t.type) {
    case "setValue":
      return {
        ...r,
        [t.payload.key]: t.payload.value
      };
    case "setState":
      return {
        ...r,
        ...t.payload
      };
    case "reset":
      return ff(r.networkId);
    default:
      throw new Error("Unhandled action type." + JSON.stringify(t));
  }
}
const pf = Gc(void 0);
function Iw({
  children: r,
  networks: t = [],
  defaultNetworkId: e = 0,
  ...n
}) {
  t = n != null && n.test ? [
    {
      name: "Sapphire Testnet",
      id: wl,
      rpcUrl: "https://testnet.sapphire.oasis.io",
      explorerUrl: "https://explorer.oasis.io/testnet/sapphire"
    },
    ...t
  ] : [
    {
      name: "Oasis Sapphire",
      id: yl,
      rpcUrl: "https://sapphire.oasis.io",
      explorerUrl: "https://explorer.oasis.io/mainnet/sapphire"
    }
  ];
  const [s, i] = Vc(Nw, ff(e || t[0].id)), [a, o] = At(!1), [c, l] = At();
  Re(() => {
    if (a) {
      const { walletScreen: u, displayedError: f, ...y } = s;
      localStorage.setItem(Ei.WALLET_CONTEXT, JSON.stringify(y));
    }
  }, [s]), Re(() => {
    const u = localStorage.getItem(Ei.WALLET_CONTEXT);
    if (u)
      try {
        const f = JSON.parse(u);
        i({ type: "setState", payload: f });
      } catch (f) {
        console.error("Cant parse global state localStorage", f);
      }
    setTimeout(() => o(!0), 10);
  }, []), Re(() => {
    if (a && !c) {
      let u;
      t && t.length ? u = Ku({
        ...n,
        defaultNetworkId: s.networkId || e,
        networkConfig: t.reduce((f, y) => (f[y.id] = {
          rpcUrl: y.rpcUrl,
          explorerUrl: y.explorerUrl
        }, f), {})
      }) : u = Ku(), u && (l(u), h(u), u.setAccount({
        username: s.username,
        strategy: s.authStrategy,
        address: s.address,
        contractAddress: s.contractAddress
      }));
    }
  }, [t, e, a]);
  async function h(u) {
    const f = u || c;
    if (f && s.address)
      try {
        const y = await (f == null ? void 0 : f.getAccountBalance(s.address));
        i({ type: "setValue", payload: { key: "balance", value: y } });
      } catch (y) {
        console.error("Reloading balance", y);
      }
  }
  return /* @__PURE__ */ C(
    pf.Provider,
    {
      value: {
        state: s,
        dispatch: i,
        networks: t,
        networksById: t.reduce(
          (u, f) => (u[f.id] = f, u),
          {}
        ),
        defaultNetworkId: e || 0,
        wallet: c,
        setWallet: l,
        reloadUserBalance: h,
        setScreen: (u) => i({ type: "setValue", payload: { key: "walletScreen", value: u } }),
        handleError: (u) => {
          var f;
          if (u) {
            console.error(u);
            let y = "";
            u != null && u.name && (y = hf[u.name]), !y && (u != null && u.error) && ((f = u == null ? void 0 : u.error) != null && f.message ? y = u.error.message : typeof u.error == "string" && (y = u.error)), !y && (u != null && u.message) && (y = u.message), y && i({
              type: "setValue",
              payload: { key: "displayedError", value: y }
            });
          } else
            i({ type: "setValue", payload: { key: "displayedError", value: "" } });
        }
      },
      children: r
    }
  );
}
function ce() {
  const r = _c(pf);
  if (r === void 0)
    throw new Error("useWalletContext usage must be wrapped with WalletContext provider.");
  return r;
}
function gf(r) {
  var t, e, n = "";
  if (typeof r == "string" || typeof r == "number") n += r;
  else if (typeof r == "object") if (Array.isArray(r)) {
    var s = r.length;
    for (t = 0; t < s; t++) r[t] && (e = gf(r[t])) && (n && (n += " "), n += e);
  } else for (e in r) r[e] && (n && (n += " "), n += e);
  return n;
}
function Al() {
  for (var r, t, e = 0, n = "", s = arguments.length; e < s; e++) (r = arguments[e]) && (t = gf(r)) && (n && (n += " "), n += t);
  return n;
}
function Tw({
  size: r = 36,
  width: t = 2,
  color: e = "currentColor",
  className: n
}) {
  return /* @__PURE__ */ C(
    "svg",
    {
      style: {
        margin: `-${r / 2}px 0 0 -${r / 2}px`,
        width: `${r}px`,
        height: `${r}px`,
        animation: "rotate 2s linear infinite",
        zIndex: 2,
        position: "absolute",
        top: "50%",
        left: "50%"
      },
      viewBox: "0 0 50 50",
      className: n,
      children: /* @__PURE__ */ C(
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
const Cw = "160px", Ow = "40px", Pw = "px-4 py-2.5", Bt = Nf(
  ({
    blank: r = !1,
    self: t = !1,
    variant: e = "primary",
    minWidth: n = Cw,
    minHeight: s = Ow,
    paddingClass: i = Pw,
    disabled: a = !1,
    loading: o = !1,
    type: c = "button",
    className: l,
    ...h
  }, u) => {
    const f = Al(
      i,
      l,
      "oaw-button relative inline-block rounded-lg text-sm font-bold border-b-[4px] border-t-[4px] border-x-0",
      {
        "transition-all hover:border-b-blue/50 hover:translate-y-[-2px] focus:translate-y-px focus:border-b-yellow/50": !o && !a,
        "bg-yellow text-dark border-b-yellow border-t-yellow": e === "primary",
        "bg-lightdark text-offwhite border-b-lightdark border-t-lightdark": e === "secondary",
        "opacity-60": a
      }
    ), y = { minWidth: n, minHeight: s }, m = /* @__PURE__ */ J(Xe, { children: [
      !!o && /* @__PURE__ */ J(Xe, { children: [
        " ",
        /* @__PURE__ */ C(Tw, { color: "#141721" })
      ] }),
      " ",
      !o && h.children
    ] });
    return (r || t) && typeof h.href == "string" ? /* @__PURE__ */ C(
      "a",
      {
        ref: u,
        href: h.href,
        target: r ? "_blank" : "_self",
        rel: "noreferrer",
        title: h.title,
        className: f,
        style: y,
        onClick: h.onClick,
        children: m
      }
    ) : /* @__PURE__ */ C(
      "button",
      {
        ref: u,
        type: c,
        disabled: o || a,
        className: f,
        style: y,
        ...h,
        children: m
      }
    );
  }
);
Bt.displayName = "Btn";
function Mi({
  text: r,
  show: t,
  className: e
}) {
  const { state: n, handleError: s } = ce();
  return !n.displayedError && !r || !t ? /* @__PURE__ */ C(Xe, {}) : /* @__PURE__ */ J(
    "div",
    {
      className: Al(
        "flex gap-2 justify-between items-start py-2 pl-3 pr-2 break-all text-sm text-white bg-red/75 rounded-md overflow-auto",
        e
      ),
      style: { maxHeight: "250px" },
      children: [
        n.displayedError || r || "",
        /* @__PURE__ */ C(
          "button",
          {
            title: "Dismiss",
            className: "!text-white/50 hover:!text-white -mt-0.5 shrink-0",
            onClick: () => s(),
            children: /* @__PURE__ */ C(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ C(
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
var Zu = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function kw({
  authFormPlaceholder: r = "your e-mail@email.com",
  isAuthEmail: t = !0,
  isEmailConfirm: e = !0,
  onEmailConfirmRequest: n,
  onEmailConfirm: s,
  onGetApillonSessionToken: i
}) {
  const { dispatch: a, defaultNetworkId: o, handleError: c } = ce(), [l, h] = At(""), [u, f] = At(!1), [y, m] = At(!1), [g, w] = At(!1);
  async function E(U) {
    if (U.preventDefault(), !l)
      return;
    const P = Fi();
    f(!0), c();
    try {
      if (await (P == null ? void 0 : P.userExists(l))) {
        const I = await (P == null ? void 0 : P.authenticate("passkey", { username: l }));
        I && N({
          username: l,
          address: I.publicAddress,
          authStrategy: "passkey"
        });
      } else if (e && n)
        await n(l), m(!0);
      else if (e && i) {
        const I = await i();
        I || X("INVALID_APILLON_SESSION_TOKEN"), await fetch(
          `${Zu.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/otp/generate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: I,
              email: l
            })
          }
        ), m(!0);
      } else
        O();
    } catch (I) {
      c(I);
    }
    f(!1);
  }
  async function O() {
    f(!0), c();
    try {
      const U = Fi(), P = await (U == null ? void 0 : U.register("passkey", { username: l }));
      P && N({ username: l, address: P.publicAddress, authStrategy: "passkey" });
    } catch (U) {
      c(U);
    }
    f(!1);
  }
  async function N({
    username: U,
    address: P,
    authStrategy: I
  }) {
    const k = Fi(), S = await (k == null ? void 0 : k.getAccountBalance(P)) || "0";
    a({
      type: "setState",
      payload: {
        address: P,
        username: U,
        balance: S,
        authStrategy: I,
        networkId: o || void 0
      }
    });
  }
  return g ? /* @__PURE__ */ J("div", { className: "text-center", children: [
    /* @__PURE__ */ C("h2", { className: "mb-12", children: n ? "Email succesfully confirmed." : "Welcome" }),
    /* @__PURE__ */ C("p", { className: "text-xl mb-12", children: "Passkey configuration will now start." }),
    /* @__PURE__ */ C(Bt, { loading: u, onClick: () => O(), children: "Retry" }),
    /* @__PURE__ */ C(Mi, { show: !0, className: "mt-6" })
  ] }) : y ? /* @__PURE__ */ J(Xe, { children: [
    /* @__PURE__ */ C(
      Rw,
      {
        isCodeSubmitted: g,
        loading: u,
        onConfirm: async (U) => {
          if (!s && !i)
            return O();
          f(!0), c();
          try {
            if (s)
              await s(l, U);
            else if (i) {
              const P = await i();
              P || X("INVALID_APILLON_SESSION_TOKEN");
              const { data: I } = await (await fetch(
                `${Zu.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/otp/validate`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    token: P,
                    email: l,
                    code: U
                  })
                }
              )).json();
              if (!I)
                throw new Error("Verification code is not valid.");
            }
            w(!0), O();
          } catch (P) {
            c(P), f(!1);
          }
        }
      }
    ),
    /* @__PURE__ */ C(Mi, { show: !0, className: "mt-6" })
  ] }) : /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ C("h2", { className: "mb-6", children: "Sign in or Sign up" }),
    /* @__PURE__ */ J("form", { onSubmit: (U) => E(U), children: [
      /* @__PURE__ */ C(
        "input",
        {
          type: t ? "email" : "text",
          placeholder: r,
          value: l,
          className: "w-full mb-8",
          onChange: (U) => h(U.target.value)
        }
      ),
      /* @__PURE__ */ C(Bt, { type: "submit", loading: u, className: "w-full", children: "Continue" })
    ] }),
    /* @__PURE__ */ C(Mi, { show: !0, className: "mt-6" })
  ] });
}
function Rw({
  loading: r,
  onConfirm: t
}) {
  const [e, n] = At(""), s = [
    cn(null),
    cn(null),
    cn(null),
    cn(null),
    cn(null),
    cn(null)
  ];
  Re(() => {
    e.length === 6 && !/\s/.test(e) && t(e);
  }, [e]);
  function i(c, l) {
    const h = c.target;
    if (/^[^\d]$/.test(h.value)) {
      h.value = "";
      return;
    }
    const u = s[l - 1], f = s[l + 1], y = s.map((m, g) => e[g] || " ");
    y[l] = h.value, n(y.join("")), h.select(), h.value === "" ? u != null && u.current && u.current.focus() : f != null && f.current && f.current.select();
  }
  function a(c, l) {
    const h = c.target, u = s[l - 1];
    (c.key === "Backspace" || c.key === "Delete") && h.value === "" && (c.preventDefault(), n((f) => f.slice(0, l) + " " + f.slice(l + 1)), u != null && u.current && u.current.focus());
  }
  function o(c) {
    const l = c.clipboardData.getData("text");
    l.length === 6 && (n(l), s.forEach((h, u) => {
      h != null && h.current && (h.current.value = l.charAt(u));
    }));
  }
  return /* @__PURE__ */ J("div", { className: "text-center", children: [
    /* @__PURE__ */ C("p", { children: "We just sent a confirmation code to your email. Paste the code below to proceed with account creation." }),
    /* @__PURE__ */ C("h2", { className: "my-6", children: "Check your email" }),
    /* @__PURE__ */ C("p", { className: "mb-6", children: "Enter the 6-digit code you received" }),
    /* @__PURE__ */ C("div", { className: "flex gap-2 mb-12 justify-center", children: [0, 1, 2, 3, 4, 5].map((c) => /* @__PURE__ */ C(
      "input",
      {
        ref: s[c],
        type: "text",
        maxLength: 1,
        autoFocus: c === 0,
        disabled: r,
        className: "min-w-0 w-14 h-14",
        onFocus: (l) => l.target.select(),
        onKeyDown: (l) => a(l, c),
        onPaste: (l) => o(l),
        onChange: (l) => i(l, c)
      },
      c
    )) }),
    /* @__PURE__ */ C(Bt, { disabled: r, children: "Send again" })
  ] });
}
function mf(r) {
  return !r || r.length <= 10 ? r : `${r.slice(0, 6)}...${r.slice(-4)}`;
}
function Sw() {
  const { state: r, dispatch: t, networks: e, wallet: n, setScreen: s } = ce();
  if (!Array.isArray(e) || !e.length)
    return /* @__PURE__ */ C(Xe, {});
  function i(a) {
    t({ type: "setValue", payload: { key: "networkId", value: a } }), n == null || n.setDefaultNetworkId(a), s("main");
  }
  return /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ C("h2", { className: "mb-4", children: "Select network" }),
    /* @__PURE__ */ C("div", { className: "flex flex-col gap-3", children: e.map((a) => /* @__PURE__ */ C(
      Bt,
      {
        variant: "secondary",
        disabled: a.id === r.networkId,
        onClick: () => i(a.id),
        children: a.name
      },
      a.id
    )) })
  ] });
}
const Bw = () => ({
  txs: {},
  pending: [],
  chainIdsForHash: {}
  // for pending hashes
});
function Uw(r, t) {
  switch (t.type) {
    case "setState":
      return {
        ...r,
        ...t.payload
      };
    case "addTx":
      return {
        ...r,
        txs: {
          ...r.txs,
          [t.payload.owner]: {
            ...r.txs[t.payload.owner],
            [t.payload.hash]: t.payload
          }
        },
        // pending: [...new Set([...state.pending, action.payload.hash])],
        chainIdsForHash: {
          ...r.chainIdsForHash,
          [t.payload.hash]: t.payload.chainId
        }
      };
    case "setTxStatus":
      return {
        ...r,
        txs: {
          ...r.txs,
          [t.payload.tx.owner]: {
            ...r.txs[t.payload.tx.owner],
            [t.payload.tx.hash]: {
              ...r.txs[t.payload.tx.owner][t.payload.tx.hash],
              status: t.payload.status
            }
          }
        },
        pending: t.payload.status === "pending" ? [.../* @__PURE__ */ new Set([...r.pending, t.payload.tx.hash])] : r.pending.filter((e) => e !== t.payload.tx.hash),
        chainIdsForHash: t.payload.status === "pending" ? {
          ...r.chainIdsForHash,
          [t.payload.tx.hash]: t.payload.tx.chainId
        } : Object.keys(r.chainIdsForHash).reduce(
          (e, n) => (n !== t.payload.tx.hash && (e[n] = t.payload.tx.chainId), e),
          {}
        )
      };
    default:
      throw new Error("Unhandled action type." + JSON.stringify(t));
  }
}
const yf = Gc(void 0);
function Dw({ children: r }) {
  const [t, e] = Vc(Uw, Bw()), [n, s] = At(!1), {
    state: { address: i },
    reloadUserBalance: a
  } = ce();
  Re(() => {
    if (n) {
      const { pending: c, chainIdsForHash: l, ...h } = t;
      localStorage.setItem(Ei.TRANSACTIONS_CONTEXT, JSON.stringify(h));
    }
  }, [t]), Re(() => {
    const c = localStorage.getItem(Ei.TRANSACTIONS_CONTEXT);
    if (c)
      try {
        const l = JSON.parse(c);
        e({ type: "setState", payload: l });
      } catch (l) {
        console.error("Cant parse context state localStorage", l);
      }
    setTimeout(() => {
      s(!0);
    }, 100);
  }, []), Re(() => {
    if (i && t.txs[i] && Object.keys(t.txs[i]).length)
      for (const c of Object.keys(t.txs[i]))
        o(c);
  }, [i, t.txs]);
  async function o(c) {
    var y;
    if (!i)
      return;
    const l = Fi();
    if (!l)
      throw new Error("Wallet not initialized." + c);
    const h = l.getRpcProviderForChainId(t.chainIdsForHash[c]);
    if (!h)
      throw new Error("Provider not initialized. " + c);
    const u = (y = t.txs[i]) == null ? void 0 : y[c];
    if (!u || u.status === "confirmed" || u.status === "failed" || t.pending.includes(c))
      return;
    if (Date.now() - u.createdAt > 15e3 && !await h.getTransaction(c)) {
      e({ type: "setTxStatus", payload: { tx: u, status: "failed" } });
      return;
    }
    const f = await h.getTransactionReceipt(c);
    f ? (f.status ? e({
      type: "setTxStatus",
      payload: {
        tx: u,
        status: "confirmed"
      }
    }) : e({
      type: "setTxStatus",
      payload: {
        tx: u,
        status: "failed"
      }
    }), a(), l.events.emit("txDone", u)) : (e({
      type: "setTxStatus",
      payload: {
        tx: u,
        status: "pending"
      }
    }), h.once(c, (m) => {
      const g = m && !isNaN(m.status) && m.status === 0;
      a(), e({
        type: "setTxStatus",
        payload: {
          tx: u,
          status: g ? "failed" : "confirmed"
        }
      }), l.events.emit("txDone", u);
    }));
  }
  return /* @__PURE__ */ C(yf.Provider, { value: { state: t, dispatch: e, checkTransaction: o }, children: r });
}
function wf() {
  const r = _c(yf);
  if (r === void 0)
    throw new Error(
      "useTransactionsContext usage must be wrapped with TransactionsContext provider."
    );
  return r;
}
function bl(r = "Copy", t = "Copied!") {
  const [e, n] = At(r);
  let s = null;
  function i(a) {
    navigator.clipboard.writeText(a), s && clearTimeout(s), n(t), s = setTimeout(() => n(r), 2e3);
  }
  return {
    text: e,
    onCopy: i
  };
}
function Lw() {
  const {
    state: { address: r }
  } = ce(), { state: t } = wf();
  return !r || !t.txs[r] ? /* @__PURE__ */ C(Xe, {}) : /* @__PURE__ */ C("div", { children: /* @__PURE__ */ C("div", { className: "flex flex-col gap-1 max-h-[134px] overflow-auto pr-2", children: Object.values(t.txs[r]).sort((e, n) => (n.createdAt || 0) - (e.createdAt || 0)).map((e) => /* @__PURE__ */ C(Fw, { tx: e }, e.hash)) }) });
}
function Fw({ tx: r }) {
  const { text: t, onCopy: e } = bl();
  return /* @__PURE__ */ J("div", { className: "rounded-md bg-offwhite/5 px-2 py-1", children: [
    /* @__PURE__ */ J("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ C("span", { className: "font-bold text-sm", children: /* @__PURE__ */ J(
        "a",
        {
          href: r.explorerUrl || "#",
          target: "_blank",
          title: "View on explorer",
          className: "rounded-sm",
          children: [
            r.label,
            "  ↗"
          ]
        }
      ) }),
      /* @__PURE__ */ C(
        "span",
        {
          className: Al("text-sm", {
            "text-[#FF6188]": r.status === "failed",
            "text-[#A9DC76]": r.status === "confirmed",
            "text-[#F7AF39]": r.status === "pending"
          }),
          children: r.status
        }
      )
    ] }),
    /* @__PURE__ */ J("div", { className: "flex justify-between items-end", children: [
      /* @__PURE__ */ J("span", { title: r.hash, className: "text-sm", children: [
        mf(r.hash),
        " ",
        /* @__PURE__ */ C("button", { className: "text-xs", onClick: () => e(r.hash), children: t })
      ] }),
      /* @__PURE__ */ C("span", { title: new Date(r.createdAt).toISOString(), className: "text-xs", children: new Date(r.createdAt).toISOString().slice(0, -5).replace("T", " ") })
    ] })
  ] });
}
const Mw = () => ({
  list: {},
  selectedToken: ""
  // address
});
function Hw(r, t) {
  var e;
  switch (t.type) {
    case "setState":
      return {
        ...r,
        ...t.payload
      };
    case "setValue":
      return {
        ...r,
        [t.payload.key]: t.payload.value
      };
    case "updateToken": {
      const n = [...((e = r.list[t.payload.owner]) == null ? void 0 : e[t.payload.chainId]) || []], s = n.findIndex((i) => i.address === t.payload.token.address);
      return s < 0 ? n.push(t.payload.token) : n[s] = t.payload.token, {
        ...r,
        list: {
          ...r.list,
          [t.payload.owner]: {
            ...r.list[t.payload.owner],
            [t.payload.chainId]: n
          }
        }
      };
    }
    default:
      throw new Error("Unhandled action type." + JSON.stringify(t));
  }
}
const Af = Gc(void 0);
function Gw({ children: r }) {
  const [t, e] = Vc(Hw, Mw()), [n, s] = At(!1), { state: i, wallet: a } = ce();
  Re(() => {
    n && localStorage.setItem(Ei.TOKENS_CONTEXT, JSON.stringify(t));
  }, [t]), Re(() => {
    var l, h;
    const c = localStorage.getItem(Ei.TOKENS_CONTEXT);
    if (c)
      try {
        const u = JSON.parse(c);
        e({ type: "setState", payload: u }), Array.isArray((h = (l = u == null ? void 0 : u.list) == null ? void 0 : l[i.address]) == null ? void 0 : h[i.networkId]) && u.list[i.address][i.networkId].forEach(
          async (f) => {
            if (a) {
              const y = await a.contractRead({
                contractAddress: f.address,
                contractAbi: hs,
                contractFunctionName: "balanceOf",
                contractFunctionValues: [i.address]
              });
              y && e({
                type: "updateToken",
                payload: {
                  owner: i.address,
                  chainId: i.networkId,
                  token: {
                    ...f,
                    balance: Ga.formatUnits(y, f.decimals)
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
  async function o(c) {
    if (a) {
      const [l, h, u, f] = await Promise.all([
        a.contractRead({
          contractAddress: c,
          contractAbi: hs,
          contractFunctionName: "name"
        }),
        a.contractRead({
          contractAddress: c,
          contractAbi: hs,
          contractFunctionName: "symbol"
        }),
        a.contractRead({
          contractAddress: c,
          contractAbi: hs,
          contractFunctionName: "decimals"
        }),
        a.contractRead({
          contractAddress: c,
          contractAbi: hs,
          contractFunctionName: "balanceOf",
          contractFunctionValues: [i.address]
        })
      ]);
      if (h)
        return {
          address: c,
          name: l,
          symbol: h,
          decimals: Number(u),
          balance: Ga.formatUnits(f, u)
        };
    }
  }
  return /* @__PURE__ */ C(
    Af.Provider,
    {
      value: {
        state: t,
        dispatch: e,
        getTokenDetails: o
      },
      children: r
    }
  );
}
function bf() {
  const r = _c(Af);
  if (r === void 0)
    throw new Error("useTokensContext usage must be wrapped with TokensContext provider.");
  return r;
}
function Vw() {
  const { state: r, networksById: t, setScreen: e, wallet: n, handleError: s } = ce(), { state: i } = bf(), [a, o] = At(""), [c, l] = At(""), [h, u] = At(!1), f = Ha(
    () => {
      var m;
      return {
        address: "",
        name: `${(m = t == null ? void 0 : t[r.networkId]) == null ? void 0 : m.name} ETH`,
        symbol: "ETH",
        decimals: 18,
        balance: r.balance
      };
    },
    [r.balance, r.networkId]
  ), y = Ha(() => {
    if (i.selectedToken) {
      const m = i.list[r.address][r.networkId];
      if (m) {
        const g = m.find((w) => w.address === i.selectedToken);
        if (g)
          return g;
      }
    }
    return f;
  }, [i.selectedToken, i.list]);
  return r.walletScreen === "selectToken" ? /* @__PURE__ */ C(_w, { nativeToken: f }) : r.walletScreen === "receiveToken" ? /* @__PURE__ */ C(jw, {}) : /* @__PURE__ */ J(
    "form",
    {
      onSubmit: async (m) => {
        if (m.preventDefault(), !h) {
          if (!a || !c) {
            console.error("Address and amount are required");
            return;
          }
          if (!n) {
            console.error("Wallet not initialized");
            return;
          }
          u(!0), s();
          try {
            y.address ? await n.signContractWrite({
              mustConfirm: !0,
              contractAbi: hs,
              contractAddress: y.address,
              contractFunctionName: "transfer",
              contractFunctionValues: [
                a,
                Ga.parseUnits(c, y.decimals)
              ],
              label: "Transfer ERC20 token"
            }) : await n.signPlainTransaction({
              mustConfirm: !0,
              strategy: "passkey",
              tx: {
                to: a,
                data: "0x",
                gasLimit: 1e6,
                value: Ga.parseEther(c)
              },
              label: "Transfer native token"
            });
          } catch (g) {
            s(g);
          }
          u(!1);
        }
      },
      children: [
        /* @__PURE__ */ C("h2", { className: "mb-8", children: "Send tokens to address" }),
        /* @__PURE__ */ J(
          Bt,
          {
            variant: "secondary",
            className: "mb-4 w-full text-left",
            onClick: () => e("selectToken"),
            children: [
              "Token: ",
              y.name,
              /* @__PURE__ */ C("br", {}),
              /* @__PURE__ */ J("span", { className: "font-normal", children: [
                "Balance: ",
                y.balance,
                " ",
                y.symbol
              ] })
            ]
          }
        ),
        /* @__PURE__ */ C(
          "input",
          {
            placeholder: "Receiver address",
            value: a,
            className: "w-full mb-4",
            onChange: (m) => o(m.target.value)
          }
        ),
        /* @__PURE__ */ C(
          "input",
          {
            placeholder: "Amount",
            value: c,
            className: "w-full mb-8",
            onChange: (m) => l(m.target.value)
          }
        ),
        /* @__PURE__ */ C(Bt, { type: "submit", className: "w-full", children: "Send" })
      ]
    }
  );
}
function _w({ nativeToken: r }) {
  const { state: t, setScreen: e, handleError: n } = ce(), { state: s, dispatch: i, getTokenDetails: a } = bf(), [o, c] = At(""), [l, h] = At(!1), u = Ha(() => {
    var f;
    return Array.isArray((f = s.list[t.address]) == null ? void 0 : f[t.networkId]) ? [r, ...s.list[t.address][t.networkId]] : [r];
  }, [s.list]);
  return /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ C("h2", { className: "mb-4", children: "Add token" }),
    /* @__PURE__ */ J(
      "form",
      {
        className: "mb-8",
        onSubmit: async (f) => {
          if (f.preventDefault(), !l) {
            if (!o) {
              console.error("No address");
              return;
            }
            h(!0), n();
            try {
              const y = await a(o);
              if (!y)
                throw new Error("Could not get token details");
              i({
                type: "updateToken",
                payload: { owner: t.address, chainId: t.networkId, token: y }
              });
            } catch (y) {
              n(y);
            }
            h(!1);
          }
        },
        children: [
          /* @__PURE__ */ C(
            "input",
            {
              placeholder: "Token address",
              value: o,
              className: "w-full mb-4",
              onChange: (f) => c(f.target.value)
            }
          ),
          /* @__PURE__ */ C(Bt, { type: "submit", loading: l, className: "w-full", children: "Add" })
        ]
      }
    ),
    /* @__PURE__ */ C("h2", { className: "mb-4", children: "Select token" }),
    /* @__PURE__ */ C("div", { className: "flex flex-col gap-3", children: u.map((f) => /* @__PURE__ */ J(
      Bt,
      {
        variant: "secondary",
        disabled: f.address === s.selectedToken,
        className: "w-full text-left",
        onClick: () => {
          i({
            type: "setValue",
            payload: { key: "selectedToken", value: f.address }
          }), e("sendToken");
        },
        children: [
          "Token: ",
          f.name,
          /* @__PURE__ */ C("br", {}),
          /* @__PURE__ */ J("span", { className: "font-normal", children: [
            "Balance: ",
            f.balance,
            " ",
            f.symbol
          ] })
        ]
      },
      f.address
    )) })
  ] });
}
function jw() {
  const { state: r } = ce(), { text: t, onCopy: e } = bl();
  return r.address ? /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ C("div", { className: "p-4 mb-4", children: /* @__PURE__ */ C(
      Bf,
      {
        value: `ethereum:${r.address}`,
        size: 256,
        style: { height: "auto", maxWidth: "100%", width: "256px", margin: "0 auto" },
        viewBox: "0 0 256 256"
      }
    ) }),
    /* @__PURE__ */ C("input", { readOnly: !0, value: r.address, className: "w-full mb-4" }),
    /* @__PURE__ */ C(Bt, { className: "w-full", onClick: () => e(r.address), children: t })
  ] }) : /* @__PURE__ */ C(Xe, {});
}
function Qw() {
  const { wallet: r, state: t, dispatch: e, networksById: n, setScreen: s } = ce(), i = Ha(() => t.walletScreen === "main" ? { key: "networks", label: "Change" } : t.walletScreen === "selectToken" ? { key: "sendToken", label: "Back" } : { key: "main", label: "Back" }, [t.walletScreen]);
  return /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ C("div", { className: "text-center -mt-4 sm:-mt-8 mb-4", children: /* @__PURE__ */ J("div", { className: "inline-block opacity-50 hover:opacity-100", children: [
      /* @__PURE__ */ C("p", { children: t.networkId && n[t.networkId] ? n[t.networkId].name : "No network" }),
      /* @__PURE__ */ C("p", { children: /* @__PURE__ */ C("button", { className: "text-sm", onClick: () => s(i.key), children: i.label }) })
    ] }) }),
    /* @__PURE__ */ C(Mi, { show: !0, className: "mb-2" }),
    t.walletScreen === "main" && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ C(zw, { className: "mb-6" }),
      /* @__PURE__ */ J("div", { className: "flex gap-4 mb-6", children: [
        /* @__PURE__ */ C(Bt, { minWidth: "0", className: "w-full", onClick: () => s("sendToken"), children: "Send" }),
        /* @__PURE__ */ C(Bt, { minWidth: "0", className: "w-full", onClick: () => s("receiveToken"), children: "Receive" })
      ] }),
      /* @__PURE__ */ J("div", { className: "mb-8", children: [
        /* @__PURE__ */ C("h3", { className: "mb-2", children: "Transactions" }),
        /* @__PURE__ */ C(Lw, {})
      ] }),
      /* @__PURE__ */ C(
        Bt,
        {
          variant: "secondary",
          className: "w-full",
          onClick: () => {
            e({ type: "reset" }), r == null || r.setAccount({
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
    t.walletScreen === "networks" && /* @__PURE__ */ C("div", { children: /* @__PURE__ */ C(Sw, {}) }),
    ["sendToken", "selectToken", "receiveToken"].includes(t.walletScreen) && /* @__PURE__ */ C("div", { children: /* @__PURE__ */ C(Gw, { children: /* @__PURE__ */ C(Vw, {}) }) })
  ] });
}
function zw({ className: r }) {
  const { state: t } = ce(), { text: e, onCopy: n } = bl();
  return /* @__PURE__ */ J("div", { className: r, children: [
    /* @__PURE__ */ J("h2", { className: "break-all mb-1", children: [
      "Hi, ",
      t.username
    ] }),
    /* @__PURE__ */ J("p", { title: t.address, className: "text-xl", children: [
      /* @__PURE__ */ C("span", { className: "mr-2", children: mf(t.address) }),
      /* @__PURE__ */ C("button", { className: "text-sm", onClick: () => n(t.address), children: e })
    ] }),
    /* @__PURE__ */ J("p", { children: [
      t.balance,
      " ETH"
    ] })
  ] });
}
function Jw({
  tx: r,
  signMessage: t,
  contractFunctionData: e,
  approveText: n = "Approve",
  declineText: s = "Reject",
  onApprove: i,
  onDecline: a
}) {
  const { networksById: o, wallet: c, dispatch: l } = ce(), [h, u] = At(!1), f = "bg-offwhite/25 p-3 whitespace-pre-wrap break-all rounded-sm mt-2";
  return /* @__PURE__ */ J(Xe, { children: [
    !!t && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ C("h2", { className: "mb-6", children: "Sign Message" }),
      /* @__PURE__ */ J("p", { className: "break-all", children: [
        "You are signing:",
        /* @__PURE__ */ C("br", {}),
        t
      ] })
    ] }),
    !!r && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ C("h2", { className: "mb-6", children: "Approve Transaction" }),
      Object.entries(r).map(([y, m]) => /* @__PURE__ */ J("div", { className: "mb-2 break-all", children: [
        /* @__PURE__ */ C("p", { className: "font-bold text-sm", children: y }),
        /* @__PURE__ */ C(
          "div",
          {
            style: { maxHeight: "220px" },
            className: "overflow-auto pr-8 -mr-8 sm:pr-12 sm:-mr-12",
            children: typeof m == "bigint" ? m.toString() : typeof m == "object" ? /* @__PURE__ */ C("pre", { className: f, children: JSON.stringify(
              r,
              (g, w) => typeof w == "bigint" ? w.toString() : w,
              2
            ) }) : m
          }
        )
      ] }, y))
    ] }),
    !!e && /* @__PURE__ */ J("div", { children: [
      /* @__PURE__ */ C("h2", { className: "mb-6", children: "Approve Contract Transaction" }),
      !!e.chainId && !!o[e.chainId] && /* @__PURE__ */ J("div", { children: [
        /* @__PURE__ */ C("p", { className: "font-bold text-sm", children: "Chain" }),
        o[e.chainId].name
      ] }),
      /* @__PURE__ */ J("div", { className: "mb-3 break-all", children: [
        /* @__PURE__ */ C("p", { className: "font-bold text-sm", children: "Contract address" }),
        e.contractAddress
      ] }),
      /* @__PURE__ */ J("div", { className: "mb-3 break-all", children: [
        /* @__PURE__ */ C("p", { className: "font-bold text-sm", children: "Contract function" }),
        e.contractFunctionName
      ] }),
      !!e.contractFunctionValues && !!e.contractFunctionValues.length && /* @__PURE__ */ J("div", { className: "break-all", children: [
        /* @__PURE__ */ C("p", { className: "font-bold text-sm", children: "Contract function values" }),
        /* @__PURE__ */ C("pre", { className: f, children: JSON.stringify(
          e.contractFunctionValues,
          (y, m) => typeof m == "bigint" ? m.toString() : m,
          2
        ) })
      ] })
    ] }),
    /* @__PURE__ */ C(Mi, { show: !0, className: "mt-6 -mb-6" }),
    /* @__PURE__ */ J("div", { className: "mt-12 flex gap-4", children: [
      /* @__PURE__ */ C(
        Bt,
        {
          loading: h,
          className: "w-full",
          onClick: async () => {
            u(!0), await i(), u(!1);
          },
          children: n
        }
      ),
      /* @__PURE__ */ C(Bt, { variant: "secondary", disabled: h, className: "w-full", onClick: a, children: s })
    ] }),
    /* @__PURE__ */ C("div", { className: "mt-4 text-center", children: /* @__PURE__ */ C(
      "button",
      {
        onClick: () => {
          c == null || c.setAccount({
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
function Kw({
  disableAutoBroadcastAfterSign: r = !1,
  disableDefaultActivatorStyle: t = !1,
  ...e
}) {
  const { state: n, wallet: s, setScreen: i, handleError: a, reloadUserBalance: o } = ce(), { dispatch: c } = wf(), [l, h] = At(!1), [u, f] = At(), [y, m] = At(), [g, w] = At(""), [E, O] = At({
    title: "",
    txHash: "",
    explorerUrl: ""
  }), N = cn(), U = n.username && n.address;
  Re(() => {
    const k = (j) => {
      var $;
      j.plain ? (f(($ = j.plain) == null ? void 0 : $.tx), N.current = j, h(!0)) : j.contractWrite && (m({
        chainId: j.contractWrite.chainId,
        contractAddress: j.contractWrite.contractAddress,
        contractFunctionName: j.contractWrite.contractFunctionName,
        contractFunctionValues: j.contractWrite.contractFunctionValues
      }), N.current = j, h(!0));
    }, S = (j) => {
      w(j.message), N.current = { signature: j }, h(!0);
    }, _ = (j) => {
      c({ type: "addTx", payload: j });
    }, D = () => {
      h(!0);
    }, F = (j) => {
      j.name === "defaultNetworkId" && o();
    };
    return s && (s.events.on("txApprove", k), s.events.on("signatureRequest", S), s.events.on("txSubmitted", _), s.events.on("providerRequestAccounts", D), s.events.on("dataUpdated", F)), () => {
      s && (s.events.off("txApprove", k), s.events.off("signatureRequest", S), s.events.off("txSubmitted", _), s.events.off("providerRequestAccounts", D), s.events.off("dataUpdated", F));
    };
  }, [s]), Re(() => {
    l || ((u || g || y) && P(), n.walletScreen !== "main" && setTimeout(() => {
      i("main");
    }, 200), s && s.waitForAccountResolver && (s.waitForAccountResolver(""), s.waitForAccountResolver = null));
  }, [l]);
  function P() {
    h(!1), setTimeout(() => {
      f(void 0), m(void 0), w(""), O({
        title: "",
        txHash: "",
        explorerUrl: ""
      });
    }, 200);
  }
  let I = /* @__PURE__ */ C(Xe, {});
  return U ? u || g || y ? E.title ? I = /* @__PURE__ */ J("div", { className: "text-center", children: [
    /* @__PURE__ */ C("h2", { className: "mb-6", children: E.title }),
    !!E.explorerUrl && /* @__PURE__ */ C("p", { className: "mb-6", children: /* @__PURE__ */ C(Bt, { variant: "secondary", href: E.explorerUrl, blank: !0, children: "View on explorer" }) }),
    !!E.txHash && /* @__PURE__ */ J("p", { className: "break-all my-3", children: [
      "Transaction hash: ",
      E.txHash
    ] }),
    /* @__PURE__ */ C("div", { className: "mt-12", children: /* @__PURE__ */ C(Bt, { onClick: () => P(), children: "Close" }) })
  ] }) : I = /* @__PURE__ */ C(
    Jw,
    {
      tx: u,
      signMessage: g,
      contractFunctionData: y,
      onApprove: async () => {
        if (N.current)
          try {
            if (a(), N.current.signature)
              await (s == null ? void 0 : s.signMessage({
                ...N.current.signature,
                authData: { username: n.username }
              })), P();
            else if (N.current.plain) {
              const k = await (s == null ? void 0 : s.signPlainTransaction({
                ...N.current.plain,
                authData: { username: n.username }
              }));
              if (r)
                P();
              else if (k) {
                const { signedTxData: S, chainId: _ } = k, D = await (s == null ? void 0 : s.broadcastTransaction(
                  S,
                  _,
                  N.current.plain.label || "Transaction"
                ));
                O({
                  title: "Transaction submitted",
                  explorerUrl: (D == null ? void 0 : D.txItem.explorerUrl) || "",
                  txHash: (D == null ? void 0 : D.txHash) || ""
                });
              }
            } else if (N.current.contractWrite) {
              const k = await (s == null ? void 0 : s.signContractWrite({
                ...N.current.contractWrite,
                authData: { username: n.username }
              }));
              if (r)
                P();
              else if (k) {
                const { signedTxData: S, chainId: _ } = k, D = await (s == null ? void 0 : s.broadcastTransaction(
                  S,
                  _,
                  N.current.contractWrite.label || "Transaction"
                ));
                O({
                  title: "Transaction submitted",
                  explorerUrl: (D == null ? void 0 : D.txItem.explorerUrl) || "",
                  txHash: (D == null ? void 0 : D.txHash) || ""
                });
              }
            }
          } catch (k) {
            a(k);
          }
      },
      onDecline: () => {
        var k, S, _, D, F, j;
        P(), (S = (k = N.current) == null ? void 0 : k.contractWrite) != null && S.reject ? N.current.contractWrite.reject(new Yo()) : (D = (_ = N.current) == null ? void 0 : _.plain) != null && D.reject ? N.current.plain.reject(new Yo()) : (j = (F = N.current) == null ? void 0 : F.signature) != null && j.reject && N.current.signature.reject(new Yo());
      }
    }
  ) : I = /* @__PURE__ */ C(Qw, {}) : I = /* @__PURE__ */ C(kw, { ...e }), /* @__PURE__ */ J("div", { children: [
    /* @__PURE__ */ C(qw, { isOpen: l, setIsOpen: h, children: I }),
    /* @__PURE__ */ C(
      "button",
      {
        id: "oaw-wallet-widget-btn",
        className: t ? void 0 : "oaw-btn-default-style",
        onClick: () => h(!0),
        children: U ? "Open wallet" : "Sign in"
      }
    )
  ] });
}
function qw({
  children: r,
  isOpen: t,
  setIsOpen: e
}) {
  return /* @__PURE__ */ C(Xe, { children: /* @__PURE__ */ C(Tf, { show: t, children: /* @__PURE__ */ J(
    Cf,
    {
      id: "oaw-wallet-widget",
      open: t,
      style: {
        position: "relative",
        zIndex: "10001"
      },
      onClose: () => e(!1),
      children: [
        /* @__PURE__ */ C(
          Tl,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0",
            enterTo: "opacity-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100",
            leaveTo: "opacity-0",
            children: /* @__PURE__ */ C("div", { className: "fixed inset-0 bg-black/50", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ C(
          Tl,
          {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 scale-95",
            enterTo: "opacity-100 scale-100",
            leave: "ease-in duration-200",
            leaveFrom: "opacity-100 scale-100",
            leaveTo: "opacity-0 scale-95",
            children: /* @__PURE__ */ C("div", { className: "fixed inset-0 w-screen overflow-y-auto p-4", children: /* @__PURE__ */ C("div", { className: "flex items-center justify-center min-h-full", children: /* @__PURE__ */ J(Of, { className: "relative max-w-lg w-full min-h-[600px] bg-dark p-8 sm:py-16 sm:px-12 border border-brightdark text-offwhite", children: [
              /* @__PURE__ */ C("button", { className: "absolute top-2 right-2", onClick: () => e(!1), children: /* @__PURE__ */ C(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ C(
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
              r
            ] }) }) })
          }
        )
      ]
    }
  ) }) });
}
function Ww(r) {
  return /* @__PURE__ */ C(Iw, { ...r, children: /* @__PURE__ */ C(Dw, { children: /* @__PURE__ */ C(Kw, { ...r }) }) });
}
function cA(r, t) {
  if (typeof document > "u") {
    console.error("Cannot initialize embedded wallet app UI");
    return;
  }
  let e = null;
  r && (e = document.querySelector(r)), e || (e = document.createElement("div"), e.id = "embedded-wallet", e.setAttribute("style", "display: none;"), document.body.appendChild(e)), Pi.createRoot(e).render(
    /* @__PURE__ */ C(xf.StrictMode, { children: /* @__PURE__ */ C(Ww, { ...t }) })
  );
}
export {
  cA as initializeApp
};
