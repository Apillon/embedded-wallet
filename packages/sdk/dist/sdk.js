import * as Au from "@oasisprotocol/sapphire-paratime";
import { pbkdf2Sync as bu } from "pbkdf2";
import { CBOR as ra } from "cbor-redux";
import * as pr from "asn1js";
import sa from "mitt";
import { ProviderRpcError as ia, hashMessage as Eu, hexToString as xu } from "viem";
import { parseAbi as Iu } from "abitype";
const Nu = "6.13.1";
function Bu(n, t, e) {
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
async function Bt(n) {
  const t = Object.keys(n);
  return (await Promise.all(t.map((r) => Promise.resolve(n[r])))).reduce((r, s, i) => (r[t[i]] = s, r), {});
}
function D(n, t, e) {
  for (let r in t) {
    let s = t[r];
    const i = e ? e[r] : null;
    i && Bu(s, i, r), Object.defineProperty(n, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function un(n) {
  if (n == null)
    return "null";
  if (Array.isArray(n))
    return "[ " + n.map(un).join(", ") + " ]";
  if (n instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let r = 0; r < n.length; r++)
      e += t[n[r] >> 4], e += t[n[r] & 15];
    return e;
  }
  if (typeof n == "object" && typeof n.toJSON == "function")
    return un(n.toJSON());
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
      return t.sort(), "{ " + t.map((e) => `${un(e)}: ${un(n[e])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Et(n, t) {
  return n && n.code === t;
}
function Js(n) {
  return Et(n, "CALL_EXCEPTION");
}
function nt(n, t, e) {
  let r = n;
  {
    const i = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${un(e)}`);
      for (const o in e) {
        if (o === "shortMessage")
          continue;
        const a = e[o];
        i.push(o + "=" + un(a));
      }
    }
    i.push(`code=${t}`), i.push(`version=${Nu}`), i.length && (n += " (" + i.join(", ") + ")");
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
  return D(s, { code: t }), e && Object.assign(s, e), s.shortMessage == null && D(s, { shortMessage: r }), s;
}
function I(n, t, e, r) {
  if (!n)
    throw nt(t, e, r);
}
function g(n, t, e, r) {
  I(n, t, "INVALID_ARGUMENT", { argument: e, value: r });
}
function oa(n, t, e) {
  e == null && (e = ""), e && (e = ": " + e), I(n >= t, "missing arguemnt" + e, "MISSING_ARGUMENT", {
    count: n,
    expectedCount: t
  }), I(n <= t, "too many arguments" + e, "UNEXPECTED_ARGUMENT", {
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
function Zn(n, t, e) {
  if (e == null && (e = ""), n !== t) {
    let r = e, s = "new";
    e && (r += ".", s += " " + e), I(!1, `private constructor; use ${r}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: s
    });
  }
}
function aa(n, t, e) {
  if (n instanceof Uint8Array)
    return e ? new Uint8Array(n) : n;
  if (typeof n == "string" && n.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const r = new Uint8Array((n.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < r.length; i++)
      r[i] = parseInt(n.substring(s, s + 2), 16), s += 2;
    return r;
  }
  g(!1, "invalid BytesLike value", t || "value", n);
}
function _(n, t) {
  return aa(n, t, !1);
}
function Tt(n, t) {
  return aa(n, t, !0);
}
function q(n, t) {
  return !(typeof n != "string" || !n.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && n.length !== 2 + 2 * t || t === !0 && n.length % 2 !== 0);
}
function $s(n) {
  return q(n, !0) || n instanceof Uint8Array;
}
const Ti = "0123456789abcdef";
function S(n) {
  const t = _(n);
  let e = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    e += Ti[(s & 240) >> 4] + Ti[s & 15];
  }
  return e;
}
function et(n) {
  return "0x" + n.map((t) => S(t).substring(2)).join("");
}
function Ve(n) {
  return q(n, !0) ? (n.length - 2) / 2 : _(n).length;
}
function rt(n, t, e) {
  const r = _(n);
  return e != null && e > r.length && I(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: e
  }), S(r.slice(t ?? 0, e ?? r.length));
}
function ca(n, t, e) {
  const r = _(n);
  I(t >= r.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(r),
    length: t,
    offset: t + 1
  });
  const s = new Uint8Array(t);
  return s.fill(0), e ? s.set(r, t - r.length) : s.set(r, 0), S(s);
}
function ne(n, t) {
  return ca(n, t, !0);
}
function Zs(n, t) {
  return ca(n, t, !1);
}
const Rr = BigInt(0), Zt = BigInt(1), ln = 9007199254740991;
function br(n, t) {
  const e = kr(n, "value"), r = BigInt(G(t, "width"));
  if (I(e >> r === Rr, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: n
  }), e >> r - Zt) {
    const s = (Zt << r) - Zt;
    return -((~e & s) + Zt);
  }
  return e;
}
function js(n, t) {
  let e = k(n, "value");
  const r = BigInt(G(t, "width")), s = Zt << r - Zt;
  if (e < Rr) {
    e = -e, I(e <= s, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: n
    });
    const i = (Zt << r) - Zt;
    return (~e & i) + Zt;
  } else
    I(e < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: n
    });
  return e;
}
function Fe(n, t) {
  const e = kr(n, "value"), r = BigInt(G(t, "bits"));
  return e & (Zt << r) - Zt;
}
function k(n, t) {
  switch (typeof n) {
    case "bigint":
      return n;
    case "number":
      return g(Number.isInteger(n), "underflow", t || "value", n), g(n >= -ln && n <= ln, "overflow", t || "value", n), BigInt(n);
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return n[0] === "-" && n[1] !== "-" ? -BigInt(n.substring(1)) : BigInt(n);
      } catch (e) {
        g(!1, `invalid BigNumberish string: ${e.message}`, t || "value", n);
      }
  }
  g(!1, "invalid BigNumberish value", t || "value", n);
}
function kr(n, t) {
  const e = k(n, t);
  return I(e >= Rr, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: n
  }), e;
}
const Pi = "0123456789abcdef";
function wn(n) {
  if (n instanceof Uint8Array) {
    let t = "0x0";
    for (const e of n)
      t += Pi[e >> 4], t += Pi[e & 15];
    return BigInt(t);
  }
  return k(n);
}
function G(n, t) {
  switch (typeof n) {
    case "bigint":
      return g(n >= -ln && n <= ln, "overflow", t || "value", n), Number(n);
    case "number":
      return g(Number.isInteger(n), "underflow", t || "value", n), g(n >= -ln && n <= ln, "overflow", t || "value", n), n;
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return G(BigInt(n), t);
      } catch (e) {
        g(!1, `invalid numeric string: ${e.message}`, t || "value", n);
      }
  }
  g(!1, "invalid numeric value", t || "value", n);
}
function Tu(n) {
  return G(wn(n));
}
function Te(n, t) {
  let r = kr(n, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = G(t, "width");
    for (I(s * 2 >= r.length, `value exceeds width (${s} bytes)`, "NUMERIC_FAULT", {
      operation: "toBeHex",
      fault: "overflow",
      value: n
    }); r.length < s * 2; )
      r = "0" + r;
  }
  return "0x" + r;
}
function gt(n) {
  const t = kr(n, "value");
  if (t === Rr)
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
function fn(n) {
  let t = S($s(n) ? n : gt(n)).substring(2);
  for (; t.startsWith("0"); )
    t = t.substring(1);
  return t === "" && (t = "0"), "0x" + t;
}
const Oi = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
BigInt(0);
const Ci = BigInt(58);
function Pu(n) {
  const t = _(n);
  let e = wn(t), r = "";
  for (; e; )
    r = Oi[Number(e % Ci)] + r, e /= Ci;
  for (let s = 0; s < t.length && !t[s]; s++)
    r = Oi[0] + r;
  return r;
}
function Ou(n) {
  n = atob(n);
  const t = new Uint8Array(n.length);
  for (let e = 0; e < n.length; e++)
    t[e] = n.charCodeAt(e);
  return _(t);
}
function Cu(n) {
  const t = _(n);
  let e = "";
  for (let r = 0; r < t.length; r++)
    e += String.fromCharCode(t[r]);
  return btoa(e);
}
class ua {
  /**
   *  The event filter.
   */
  filter;
  /**
   *  The **EventEmitterable**.
   */
  emitter;
  #t;
  /**
   *  Create a new **EventPayload** for %%emitter%% with
   *  the %%listener%% and for %%filter%%.
   */
  constructor(t, e, r) {
    this.#t = e, D(this, { emitter: t, filter: r });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    this.#t != null && await this.emitter.off(this.filter, this.#t);
  }
}
function vu(n, t, e, r, s) {
  g(!1, `invalid codepoint at offset ${t}; ${n}`, "bytes", e);
}
function la(n, t, e, r, s) {
  if (n === "BAD_PREFIX" || n === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < e.length && e[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return n === "OVERRUN" ? e.length - t - 1 : 0;
}
function Su(n, t, e, r, s) {
  return n === "OVERLONG" ? (g(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), la(n, t, e));
}
const Ru = Object.freeze({
  error: vu,
  ignore: la,
  replace: Su
});
function ku(n, t) {
  t == null && (t = Ru.error);
  const e = _(n, "bytes"), r = [];
  let s = 0;
  for (; s < e.length; ) {
    const i = e[s++];
    if (!(i >> 7)) {
      r.push(i);
      continue;
    }
    let o = null, a = null;
    if ((i & 224) === 192)
      o = 1, a = 127;
    else if ((i & 240) === 224)
      o = 2, a = 2047;
    else if ((i & 248) === 240)
      o = 3, a = 65535;
    else {
      (i & 192) === 128 ? s += t("UNEXPECTED_CONTINUE", s - 1, e, r) : s += t("BAD_PREFIX", s - 1, e, r);
      continue;
    }
    if (s - 1 + o >= e.length) {
      s += t("OVERRUN", s - 1, e, r);
      continue;
    }
    let c = i & (1 << 8 - o - 1) - 1;
    for (let u = 0; u < o; u++) {
      let f = e[s];
      if ((f & 192) != 128) {
        s += t("MISSING_CONTINUE", s, e, r), c = null;
        break;
      }
      c = c << 6 | f & 63, s++;
    }
    if (c !== null) {
      if (c > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - o, e, r, c);
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - o, e, r, c);
        continue;
      }
      if (c <= a) {
        s += t("OVERLONG", s - 1 - o, e, r, c);
        continue;
      }
      r.push(c);
    }
  }
  return r;
}
function jt(n, t) {
  g(typeof n == "string", "invalid string value", "str", n);
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
      g(r < n.length && (i & 64512) === 56320, "invalid surrogate pair", "str", n);
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      e.push(o >> 18 | 240), e.push(o >> 12 & 63 | 128), e.push(o >> 6 & 63 | 128), e.push(o & 63 | 128);
    } else
      e.push(s >> 12 | 224), e.push(s >> 6 & 63 | 128), e.push(s & 63 | 128);
  }
  return new Uint8Array(e);
}
function Uu(n) {
  return n.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function Er(n, t) {
  return Uu(ku(n, t));
}
function fa(n) {
  async function t(e, r) {
    I(r == null || !r.cancelled, "request cancelled before sending", "CANCELLED");
    const s = e.url.split(":")[0].toLowerCase();
    I(s === "http" || s === "https", `unsupported protocol ${s}`, "UNSUPPORTED_OPERATION", {
      info: { protocol: s },
      operation: "request"
    }), I(s === "https" || !e.credentials || e.allowInsecureAuthentication, "insecure authorized connections unsupported", "UNSUPPORTED_OPERATION", {
      operation: "request"
    });
    let i = null;
    const o = new AbortController(), a = setTimeout(() => {
      i = nt("request timeout", "TIMEOUT"), o.abort();
    }, e.timeout);
    r && r.addListener(() => {
      i = nt("request cancelled", "CANCELLED"), o.abort();
    });
    const c = {
      method: e.method,
      headers: new Headers(Array.from(e)),
      body: e.body || void 0,
      signal: o.signal
    };
    let u;
    try {
      u = await fetch(e.url, c);
    } catch (y) {
      throw clearTimeout(a), i || y;
    }
    clearTimeout(a);
    const f = {};
    u.headers.forEach((y, m) => {
      f[m.toLowerCase()] = y;
    });
    const l = await u.arrayBuffer(), d = l == null ? null : new Uint8Array(l);
    return {
      statusCode: u.status,
      statusMessage: u.statusText,
      headers: f,
      body: d
    };
  }
  return t;
}
const Lu = 12, Du = 250;
let vi = fa();
const Fu = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), Mu = new RegExp("^ipfs://(ipfs/)?(.*)$", "i");
let jr = !1;
async function ha(n, t) {
  try {
    const e = n.match(Fu);
    if (!e)
      throw new Error("invalid data");
    return new Be(200, "OK", {
      "content-type": e[1] || "text/plain"
    }, e[2] ? Ou(e[3]) : Hu(e[3]));
  } catch {
    return new Be(599, "BAD REQUEST (invalid data: URI)", {}, null, new re(n));
  }
}
function da(n) {
  async function t(e, r) {
    try {
      const s = e.match(Mu);
      if (!s)
        throw new Error("invalid link");
      return new re(`${n}${s[2]}`);
    } catch {
      return new Be(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new re(e));
    }
  }
  return t;
}
const sr = {
  data: ha,
  ipfs: da("https://gateway.ipfs.io/ipfs/")
}, ga = /* @__PURE__ */ new WeakMap();
class _u {
  #t;
  #e;
  constructor(t) {
    this.#t = [], this.#e = !1, ga.set(t, () => {
      if (!this.#e) {
        this.#e = !0;
        for (const e of this.#t)
          setTimeout(() => {
            e();
          }, 0);
        this.#t = [];
      }
    });
  }
  addListener(t) {
    I(!this.#e, "singal already cancelled", "UNSUPPORTED_OPERATION", {
      operation: "fetchCancelSignal.addCancelListener"
    }), this.#t.push(t);
  }
  get cancelled() {
    return this.#e;
  }
  checkSignal() {
    I(!this.cancelled, "cancelled", "CANCELLED", {});
  }
}
function ir(n) {
  if (n == null)
    throw new Error("missing signal; should not happen");
  return n.checkSignal(), n;
}
class re {
  #t;
  #e;
  #n;
  #r;
  #s;
  #o;
  #i;
  #a;
  #f;
  // Hooks
  #u;
  #g;
  #p;
  #c;
  #l;
  #h;
  /**
   *  The fetch URL to request.
   */
  get url() {
    return this.#o;
  }
  set url(t) {
    this.#o = String(t);
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
    return this.#i == null ? null : new Uint8Array(this.#i);
  }
  set body(t) {
    if (t == null)
      this.#i = void 0, this.#a = void 0;
    else if (typeof t == "string")
      this.#i = jt(t), this.#a = "text/plain";
    else if (t instanceof Uint8Array)
      this.#i = t, this.#a = "application/octet-stream";
    else if (typeof t == "object")
      this.#i = jt(JSON.stringify(t)), this.#a = "application/json";
    else
      throw new Error("invalid body");
  }
  /**
   *  Returns true if the request has a body.
   */
  hasBody() {
    return this.#i != null;
  }
  /**
   *  The HTTP method to use when requesting the URI. If no method
   *  has been explicitly set, then ``GET`` is used if the body is
   *  null and ``POST`` otherwise.
   */
  get method() {
    return this.#r ? this.#r : this.hasBody() ? "POST" : "GET";
  }
  set method(t) {
    t == null && (t = ""), this.#r = String(t).toUpperCase();
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
    const t = Object.assign({}, this.#n);
    return this.#f && (t.authorization = `Basic ${Cu(jt(this.#f))}`), this.allowGzip && (t["accept-encoding"] = "gzip"), t["content-type"] == null && this.#a && (t["content-type"] = this.#a), this.body && (t["content-length"] = String(this.body.length)), t;
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
    this.#n[String(t).toLowerCase()] = String(e);
  }
  /**
   *  Clear all headers, resetting all intrinsic headers.
   */
  clearHeaders() {
    this.#n = {};
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
    return this.#f || null;
  }
  /**
   *  Sets an ``Authorization`` for %%username%% with %%password%%.
   */
  setCredentials(t, e) {
    g(!t.match(/:/), "invalid basic authentication username", "username", "[REDACTED]"), this.#f = `${t}:${e}`;
  }
  /**
   *  Enable and request gzip-encoded responses. The response will
   *  automatically be decompressed. //(default: true)//
   */
  get allowGzip() {
    return this.#e;
  }
  set allowGzip(t) {
    this.#e = !!t;
  }
  /**
   *  Allow ``Authentication`` credentials to be sent over insecure
   *  channels. //(default: false)//
   */
  get allowInsecureAuthentication() {
    return !!this.#t;
  }
  set allowInsecureAuthentication(t) {
    this.#t = !!t;
  }
  /**
   *  The timeout (in milliseconds) to wait for a complete response.
   *  //(default: 5 minutes)//
   */
  get timeout() {
    return this.#s;
  }
  set timeout(t) {
    g(t >= 0, "timeout must be non-zero", "timeout", t), this.#s = t;
  }
  /**
   *  This function is called prior to each request, for example
   *  during a redirection or retry in case of server throttling.
   *
   *  This offers an opportunity to populate headers or update
   *  content before sending a request.
   */
  get preflightFunc() {
    return this.#u || null;
  }
  set preflightFunc(t) {
    this.#u = t;
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
    return this.#g || null;
  }
  set processFunc(t) {
    this.#g = t;
  }
  /**
   *  This function is called on each retry attempt.
   */
  get retryFunc() {
    return this.#p || null;
  }
  set retryFunc(t) {
    this.#p = t;
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
    return this.#h || vi;
  }
  set getUrlFunc(t) {
    this.#h = t;
  }
  /**
   *  Create a new FetchRequest instance with default values.
   *
   *  Once created, each property may be set before issuing a
   *  ``.send()`` to make the request.
   */
  constructor(t) {
    this.#o = String(t), this.#t = !1, this.#e = !0, this.#n = {}, this.#r = "", this.#s = 3e5, this.#l = {
      slotInterval: Du,
      maxAttempts: Lu
    }, this.#h = null;
  }
  toString() {
    return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${this.#i ? S(this.#i) : "null"}>`;
  }
  /**
   *  Update the throttle parameters used to determine maximum
   *  attempts and exponential-backoff properties.
   */
  setThrottleParams(t) {
    t.slotInterval != null && (this.#l.slotInterval = t.slotInterval), t.maxAttempts != null && (this.#l.maxAttempts = t.maxAttempts);
  }
  async #d(t, e, r, s, i) {
    if (t >= this.#l.maxAttempts)
      return i.makeServerError("exceeded maximum retry limit");
    I(Si() <= e, "timeout", "TIMEOUT", {
      operation: "request.send",
      reason: "timeout",
      request: s
    }), r > 0 && await Gu(r);
    let o = this.clone();
    const a = (o.url.split(":")[0] || "").toLowerCase();
    if (a in sr) {
      const f = await sr[a](o.url, ir(s.#c));
      if (f instanceof Be) {
        let l = f;
        if (this.processFunc) {
          ir(s.#c);
          try {
            l = await this.processFunc(o, l);
          } catch (d) {
            (d.throttle == null || typeof d.stall != "number") && l.makeServerError("error in post-processing function", d).assertOk();
          }
        }
        return l;
      }
      o = f;
    }
    this.preflightFunc && (o = await this.preflightFunc(o));
    const c = await this.getUrlFunc(o, ir(s.#c));
    let u = new Be(c.statusCode, c.statusMessage, c.headers, c.body, s);
    if (u.statusCode === 301 || u.statusCode === 302) {
      try {
        const f = u.headers.location || "";
        return o.redirect(f).#d(t + 1, e, 0, s, u);
      } catch {
      }
      return u;
    } else if (u.statusCode === 429 && (this.retryFunc == null || await this.retryFunc(o, u, t))) {
      const f = u.headers["retry-after"];
      let l = this.#l.slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
      return typeof f == "string" && f.match(/^[1-9][0-9]*$/) && (l = parseInt(f)), o.clone().#d(t + 1, e, l, s, u);
    }
    if (this.processFunc) {
      ir(s.#c);
      try {
        u = await this.processFunc(o, u);
      } catch (f) {
        (f.throttle == null || typeof f.stall != "number") && u.makeServerError("error in post-processing function", f).assertOk();
        let l = this.#l.slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
        return f.stall >= 0 && (l = f.stall), o.clone().#d(t + 1, e, l, s, u);
      }
    }
    return u;
  }
  /**
   *  Resolves to the response by sending the request.
   */
  send() {
    return I(this.#c == null, "request already sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.send" }), this.#c = new _u(this), this.#d(0, Si() + this.timeout, 0, this, new Be(0, "", {}, null, this));
  }
  /**
   *  Cancels the inflight response, causing a ``CANCELLED``
   *  error to be rejected from the [[send]].
   */
  cancel() {
    I(this.#c != null, "request has not been sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.cancel" });
    const t = ga.get(this);
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
    I(this.method === "GET" && (e !== "https" || r !== "http") && t.match(/^https?:/), "unsupported redirect", "UNSUPPORTED_OPERATION", {
      operation: `redirect(${this.method} ${JSON.stringify(this.url)} => ${JSON.stringify(t)})`
    });
    const s = new re(t);
    return s.method = "GET", s.allowGzip = this.allowGzip, s.timeout = this.timeout, s.#n = Object.assign({}, this.#n), this.#i && (s.#i = new Uint8Array(this.#i)), s.#a = this.#a, s;
  }
  /**
   *  Create a new copy of this request.
   */
  clone() {
    const t = new re(this.url);
    return t.#r = this.#r, this.#i && (t.#i = this.#i), t.#a = this.#a, t.#n = Object.assign({}, this.#n), t.#f = this.#f, this.allowGzip && (t.allowGzip = !0), t.timeout = this.timeout, this.allowInsecureAuthentication && (t.allowInsecureAuthentication = !0), t.#u = this.#u, t.#g = this.#g, t.#p = this.#p, t.#l = Object.assign({}, this.#l), t.#h = this.#h, t;
  }
  /**
   *  Locks all static configuration for gateways and FetchGetUrlFunc
   *  registration.
   */
  static lockConfig() {
    jr = !0;
  }
  /**
   *  Get the current Gateway function for %%scheme%%.
   */
  static getGateway(t) {
    return sr[t.toLowerCase()] || null;
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
    if (jr)
      throw new Error("gateways locked");
    sr[t] = e;
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
    if (jr)
      throw new Error("gateways locked");
    vi = t;
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
    return fa();
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
    return ha;
  }
  /**
   *  Creates a function that will fetch IPFS (unvalidated) from
   *  a custom gateway baseUrl.
   *
   *  The default IPFS gateway used internally is
   *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
   */
  static createIpfsGatewayFunc(t) {
    return da(t);
  }
}
class Be {
  #t;
  #e;
  #n;
  #r;
  #s;
  #o;
  toString() {
    return `<FetchResponse status=${this.statusCode} body=${this.#r ? S(this.#r) : "null"}>`;
  }
  /**
   *  The response status code.
   */
  get statusCode() {
    return this.#t;
  }
  /**
   *  The response status message.
   */
  get statusMessage() {
    return this.#e;
  }
  /**
   *  The response headers. All keys are lower-case.
   */
  get headers() {
    return Object.assign({}, this.#n);
  }
  /**
   *  The response body, or ``null`` if there was no body.
   */
  get body() {
    return this.#r == null ? null : new Uint8Array(this.#r);
  }
  /**
   *  The response body as a UTF-8 encoded string, or the empty
   *  string (i.e. ``""``) if there was no body.
   *
   *  An error is thrown if the body is invalid UTF-8 data.
   */
  get bodyText() {
    try {
      return this.#r == null ? "" : Er(this.#r);
    } catch {
      I(!1, "response body is not valid UTF-8 data", "UNSUPPORTED_OPERATION", {
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
      I(!1, "response body is not valid JSON", "UNSUPPORTED_OPERATION", {
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
  constructor(t, e, r, s, i) {
    this.#t = t, this.#e = e, this.#n = Object.keys(r).reduce((o, a) => (o[a.toLowerCase()] = String(r[a]), o), {}), this.#r = s == null ? null : new Uint8Array(s), this.#s = i || null, this.#o = { message: "" };
  }
  /**
   *  Return a Response with matching headers and body, but with
   *  an error status code (i.e. 599) and %%message%% with an
   *  optional %%error%%.
   */
  makeServerError(t, e) {
    let r;
    t ? r = `CLIENT ESCALATED SERVER ERROR (${this.statusCode} ${this.statusMessage}; ${t})` : (t = `${this.statusCode} ${this.statusMessage}`, r = `CLIENT ESCALATED SERVER ERROR (${t})`);
    const s = new Be(599, r, this.headers, this.body, this.#s || void 0);
    return s.#o = { message: t, error: e }, s;
  }
  /**
   *  If called within a [request.processFunc](FetchRequest-processFunc)
   *  call, causes the request to retry as if throttled for %%stall%%
   *  milliseconds.
   */
  throwThrottleError(t, e) {
    e == null ? e = -1 : g(Number.isInteger(e) && e >= 0, "invalid stall timeout", "stall", e);
    const r = new Error(t || "throttling requests");
    throw D(r, { stall: e, throttle: !0 }), r;
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
    return this.#r != null;
  }
  /**
   *  The request made for this response.
   */
  get request() {
    return this.#s;
  }
  /**
   *  Returns true if this response was a success statusCode.
   */
  ok() {
    return this.#o.message === "" && this.statusCode >= 200 && this.statusCode < 300;
  }
  /**
   *  Throws a ``SERVER_ERROR`` if this response is not ok.
   */
  assertOk() {
    if (this.ok())
      return;
    let { message: t, error: e } = this.#o;
    t === "" && (t = `server response ${this.statusCode} ${this.statusMessage}`);
    let r = null;
    this.request && (r = this.request.url);
    let s = null;
    try {
      this.#r && (s = Er(this.#r));
    } catch {
    }
    I(!1, t, "SERVER_ERROR", {
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
}
function Si() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function Hu(n) {
  return jt(n.replace(/%([0-9a-f][0-9a-f])/gi, (t, e) => String.fromCharCode(parseInt(e, 16))));
}
function Gu(n) {
  return new Promise((t) => setTimeout(t, n));
}
const Vu = BigInt(-1), Kt = BigInt(0), hn = BigInt(1), Qu = BigInt(5), rn = {};
let dn = "0000";
for (; dn.length < 80; )
  dn += dn;
function Re(n) {
  let t = dn;
  for (; t.length < n; )
    t += t;
  return BigInt("1" + t.substring(0, n));
}
function Rn(n, t, e) {
  const r = BigInt(t.width);
  if (t.signed) {
    const s = hn << r - hn;
    I(e == null || n >= -s && n < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: n
    }), n > Kt ? n = br(Fe(n, r), r) : n = -br(Fe(-n, r), r);
  } else {
    const s = hn << r;
    I(e == null || n >= 0 && n < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: n
    }), n = (n % s + s) % s & s - hn;
  }
  return n;
}
function Wr(n) {
  typeof n == "number" && (n = `fixed128x${n}`);
  let t = !0, e = 128, r = 18;
  if (typeof n == "string") {
    if (n !== "fixed") if (n === "ufixed")
      t = !1;
    else {
      const i = n.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
      g(i, "invalid fixed format", "format", n), t = i[1] !== "u", e = parseInt(i[2]), r = parseInt(i[3]);
    }
  } else if (n) {
    const i = n, o = (a, c, u) => i[a] == null ? u : (g(typeof i[a] === c, "invalid fixed format (" + a + " not " + c + ")", "format." + a, i[a]), i[a]);
    t = o("signed", "boolean", t), e = o("width", "number", e), r = o("decimals", "number", r);
  }
  g(e % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", e), g(r <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", r);
  const s = (t ? "" : "u") + "fixed" + String(e) + "x" + String(r);
  return { signed: t, width: e, decimals: r, name: s };
}
function zu(n, t) {
  let e = "";
  n < Kt && (e = "-", n *= Vu);
  let r = n.toString();
  if (t === 0)
    return e + r;
  for (; r.length <= t; )
    r = dn + r;
  const s = r.length - t;
  for (r = r.substring(0, s) + "." + r.substring(s); r[0] === "0" && r[1] !== "."; )
    r = r.substring(1);
  for (; r[r.length - 1] === "0" && r[r.length - 2] !== "."; )
    r = r.substring(0, r.length - 1);
  return e + r;
}
class Ne {
  /**
   *  The specific fixed-point arithmetic field for this value.
   */
  format;
  #t;
  // The actual value (accounting for decimals)
  #e;
  // A base-10 value to multiple values by to maintain the magnitude
  #n;
  /**
   *  This is a property so console.log shows a human-meaningful value.
   *
   *  @private
   */
  _value;
  // Use this when changing this file to get some typing info,
  // but then switch to any to mask the internal type
  //constructor(guard: any, value: bigint, format: _FixedFormat) {
  /**
   *  @private
   */
  constructor(t, e, r) {
    Zn(t, rn, "FixedNumber"), this.#e = e, this.#t = r;
    const s = zu(e, r.decimals);
    D(this, { format: r.name, _value: s }), this.#n = Re(r.decimals);
  }
  /**
   *  If true, negative values are permitted, otherwise only
   *  positive values and zero are allowed.
   */
  get signed() {
    return this.#t.signed;
  }
  /**
   *  The number of bits available to store the value.
   */
  get width() {
    return this.#t.width;
  }
  /**
   *  The number of decimal places in the fixed-point arithment field.
   */
  get decimals() {
    return this.#t.decimals;
  }
  /**
   *  The value as an integer, based on the smallest unit the
   *  [[decimals]] allow.
   */
  get value() {
    return this.#e;
  }
  #r(t) {
    g(this.format === t.format, "incompatible format; use fixedNumber.toFormat", "other", t);
  }
  #s(t, e) {
    return t = Rn(t, this.#t, e), new Ne(rn, t, this.#t);
  }
  #o(t, e) {
    return this.#r(t), this.#s(this.#e + t.#e, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%, ignoring overflow.
   */
  addUnsafe(t) {
    return this.#o(t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% added
   *  to %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  add(t) {
    return this.#o(t, "add");
  }
  #i(t, e) {
    return this.#r(t), this.#s(this.#e - t.#e, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%, ignoring overflow.
   */
  subUnsafe(t) {
    return this.#i(t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%other%% subtracted
   *  from %%this%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  sub(t) {
    return this.#i(t, "sub");
  }
  #a(t, e) {
    return this.#r(t), this.#s(this.#e * t.#e / this.#n, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%, ignoring overflow and underflow (precision loss).
   */
  mulUnsafe(t) {
    return this.#a(t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs.
   */
  mul(t) {
    return this.#a(t, "mul");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% multiplied
   *  by %%other%%. A [[NumericFaultError]] is thrown if overflow
   *  occurs or if underflow (precision loss) occurs.
   */
  mulSignal(t) {
    this.#r(t);
    const e = this.#e * t.#e;
    return I(e % this.#n === Kt, "precision lost during signalling mul", "NUMERIC_FAULT", {
      operation: "mulSignal",
      fault: "underflow",
      value: this
    }), this.#s(e / this.#n, "mulSignal");
  }
  #f(t, e) {
    return I(t.#e !== Kt, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    }), this.#r(t), this.#s(this.#e * this.#n / t.#e, e);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  divUnsafe(t) {
    return this.#f(t);
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%, ignoring underflow (precision loss). A
   *  [[NumericFaultError]] is thrown if overflow occurs.
   */
  div(t) {
    return this.#f(t, "div");
  }
  /**
   *  Returns a new [[FixedNumber]] with the result of %%this%% divided
   *  by %%other%%. A [[NumericFaultError]] is thrown if underflow
   *  (precision loss) occurs.
   */
  divSignal(t) {
    I(t.#e !== Kt, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    }), this.#r(t);
    const e = this.#e * this.#n;
    return I(e % t.#e === Kt, "precision lost during signalling div", "NUMERIC_FAULT", {
      operation: "divSignal",
      fault: "underflow",
      value: this
    }), this.#s(e / t.#e, "divSignal");
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
    return s > 0 ? r *= Re(s) : s < 0 && (e *= Re(-s)), e < r ? -1 : e > r ? 1 : 0;
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
    let t = this.#e;
    return this.#e < Kt && (t -= this.#n - hn), t = this.#e / this.#n * this.#n, this.#s(t, "floor");
  }
  /**
   *  Returns a new [[FixedNumber]] which is the smallest **integer**
   *  that is greater than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  ceiling() {
    let t = this.#e;
    return this.#e > Kt && (t += this.#n - hn), t = this.#e / this.#n * this.#n, this.#s(t, "ceiling");
  }
  /**
   *  Returns a new [[FixedNumber]] with the decimal component
   *  rounded up on ties at %%decimals%% places.
   */
  round(t) {
    if (t == null && (t = 0), t >= this.decimals)
      return this;
    const e = this.decimals - t, r = Qu * Re(e - 1);
    let s = this.value + r;
    const i = Re(e);
    return s = s / i * i, Rn(s, this.#t, "round"), new Ne(rn, s, this.#t);
  }
  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero() {
    return this.#e === Kt;
  }
  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative() {
    return this.#e < Kt;
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
    return Ne.fromString(this.toString(), t);
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
    const s = e == null ? 0 : G(e), i = Wr(r);
    let o = k(t, "value");
    const a = s - i.decimals;
    if (a > 0) {
      const c = Re(a);
      I(o % c === Kt, "value loses precision for format", "NUMERIC_FAULT", {
        operation: "fromValue",
        fault: "underflow",
        value: t
      }), o /= c;
    } else a < 0 && (o *= Re(-a));
    return Rn(o, i, "fromValue"), new Ne(rn, o, i);
  }
  /**
   *  Creates a new [[FixedNumber]] for %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%%, either due to overflow or underflow (precision loss).
   */
  static fromString(t, e) {
    const r = t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
    g(r && r[2].length + r[3].length > 0, "invalid FixedNumber string value", "value", t);
    const s = Wr(e);
    let i = r[2] || "0", o = r[3] || "";
    for (; o.length < s.decimals; )
      o += dn;
    I(o.substring(s.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
      operation: "fromString",
      fault: "underflow",
      value: t
    }), o = o.substring(0, s.decimals);
    const a = BigInt(r[1] + i + o);
    return Rn(a, s, "fromString"), new Ne(rn, a, s);
  }
  /**
   *  Creates a new [[FixedNumber]] with the big-endian representation
   *  %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%% due to overflow.
   */
  static fromBytes(t, e) {
    let r = wn(_(t, "value"));
    const s = Wr(e);
    return s.signed && (r = br(r, s.width)), Rn(r, s, "fromBytes"), new Ne(rn, r, s);
  }
}
function Ku(n) {
  let t = n.toString(16);
  for (; t.length < 2; )
    t = "0" + t;
  return "0x" + t;
}
function Ri(n, t, e) {
  let r = 0;
  for (let s = 0; s < e; s++)
    r = r * 256 + n[t + s];
  return r;
}
function ki(n, t, e, r) {
  const s = [];
  for (; e < t + 1 + r; ) {
    const i = pa(n, e);
    s.push(i.result), e += i.consumed, I(e <= t + 1 + r, "child data too short", "BUFFER_OVERRUN", {
      buffer: n,
      length: r,
      offset: t
    });
  }
  return { consumed: 1 + r, result: s };
}
function pa(n, t) {
  I(n.length !== 0, "data too short", "BUFFER_OVERRUN", {
    buffer: n,
    length: 0,
    offset: 1
  });
  const e = (r) => {
    I(r <= n.length, "data short segment too short", "BUFFER_OVERRUN", {
      buffer: n,
      length: n.length,
      offset: r
    });
  };
  if (n[t] >= 248) {
    const r = n[t] - 247;
    e(t + 1 + r);
    const s = Ri(n, t + 1, r);
    return e(t + 1 + r + s), ki(n, t, t + 1 + r, r + s);
  } else if (n[t] >= 192) {
    const r = n[t] - 192;
    return e(t + 1 + r), ki(n, t, t + 1, r);
  } else if (n[t] >= 184) {
    const r = n[t] - 183;
    e(t + 1 + r);
    const s = Ri(n, t + 1, r);
    e(t + 1 + r + s);
    const i = S(n.slice(t + 1 + r, t + 1 + r + s));
    return { consumed: 1 + r + s, result: i };
  } else if (n[t] >= 128) {
    const r = n[t] - 128;
    e(t + 1 + r);
    const s = S(n.slice(t + 1, t + 1 + r));
    return { consumed: 1 + r, result: s };
  }
  return { consumed: 1, result: Ku(n[t]) };
}
function Ur(n) {
  const t = _(n, "data"), e = pa(t, 0);
  return g(e.consumed === t.length, "unexpected junk after rlp payload", "data", n), e.result;
}
function Ui(n) {
  const t = [];
  for (; n; )
    t.unshift(n & 255), n >>= 8;
  return t;
}
function ya(n) {
  if (Array.isArray(n)) {
    let r = [];
    if (n.forEach(function(i) {
      r = r.concat(ya(i));
    }), r.length <= 55)
      return r.unshift(192 + r.length), r;
    const s = Ui(r.length);
    return s.unshift(247 + s.length), s.concat(r);
  }
  const t = Array.prototype.slice.call(_(n, "object"));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const e = Ui(t.length);
  return e.unshift(183 + e.length), e.concat(t);
}
const Li = "0123456789abcdef";
function je(n) {
  let t = "0x";
  for (const e of ya(n))
    t += Li[e >> 4], t += Li[e & 15];
  return t;
}
const Ju = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function Di(n, t) {
  let e = 18;
  if (typeof t == "string") {
    const r = Ju.indexOf(t);
    g(r >= 0, "invalid unit", "unit", t), e = 3 * r;
  } else t != null && (e = G(t, "unit"));
  return Ne.fromValue(n, e, { decimals: e, width: 512 }).toString();
}
const Pt = 32, Es = new Uint8Array(Pt), $u = ["then"], or = {}, wa = /* @__PURE__ */ new WeakMap();
function Ue(n) {
  return wa.get(n);
}
function Fi(n, t) {
  wa.set(n, t);
}
function kn(n, t) {
  const e = new Error(`deferred error during ABI decoding triggered accessing ${n}`);
  throw e.error = t, e;
}
function xs(n, t, e) {
  return n.indexOf(null) >= 0 ? t.map((r, s) => r instanceof he ? xs(Ue(r), r, e) : r) : n.reduce((r, s, i) => {
    let o = t.getValue(s);
    return s in r || (e && o instanceof he && (o = xs(Ue(o), o, e)), r[s] = o), r;
  }, {});
}
class he extends Array {
  // No longer used; but cannot be removed as it will remove the
  // #private field from the .d.ts which may break backwards
  // compatibility
  #t;
  /**
   *  @private
   */
  constructor(...t) {
    const e = t[0];
    let r = t[1], s = (t[2] || []).slice(), i = !0;
    e !== or && (r = t, s = [], i = !1), super(r.length), r.forEach((c, u) => {
      this[u] = c;
    });
    const o = s.reduce((c, u) => (typeof u == "string" && c.set(u, (c.get(u) || 0) + 1), c), /* @__PURE__ */ new Map());
    if (Fi(this, Object.freeze(r.map((c, u) => {
      const f = s[u];
      return f != null && o.get(f) === 1 ? f : null;
    }))), this.#t = [], this.#t == null && this.#t, !i)
      return;
    Object.freeze(this);
    const a = new Proxy(this, {
      get: (c, u, f) => {
        if (typeof u == "string") {
          if (u.match(/^[0-9]+$/)) {
            const d = G(u, "%index");
            if (d < 0 || d >= this.length)
              throw new RangeError("out of result range");
            const y = c[d];
            return y instanceof Error && kn(`index ${d}`, y), y;
          }
          if ($u.indexOf(u) >= 0)
            return Reflect.get(c, u, f);
          const l = c[u];
          if (l instanceof Function)
            return function(...d) {
              return l.apply(this === f ? c : this, d);
            };
          if (!(u in c))
            return c.getValue.apply(this === f ? c : this, [u]);
        }
        return Reflect.get(c, u, f);
      }
    });
    return Fi(a, Ue(this)), a;
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
      r instanceof Error && kn(`index ${s}`, r), t && r instanceof he && (r = r.toArray(t)), e.push(r);
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
    const e = Ue(this);
    return e.reduce((r, s, i) => (I(s != null, `value at index ${i} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), xs(e, this, t)), {});
  }
  /**
   *  @_ignore
   */
  slice(t, e) {
    t == null && (t = 0), t < 0 && (t += this.length, t < 0 && (t = 0)), e == null && (e = this.length), e < 0 && (e += this.length, e < 0 && (e = 0)), e > this.length && (e = this.length);
    const r = Ue(this), s = [], i = [];
    for (let o = t; o < e; o++)
      s.push(this[o]), i.push(r[o]);
    return new he(or, s, i);
  }
  /**
   *  @_ignore
   */
  filter(t, e) {
    const r = Ue(this), s = [], i = [];
    for (let o = 0; o < this.length; o++) {
      const a = this[o];
      a instanceof Error && kn(`index ${o}`, a), t.call(e, a, o, this) && (s.push(a), i.push(r[o]));
    }
    return new he(or, s, i);
  }
  /**
   *  @_ignore
   */
  map(t, e) {
    const r = [];
    for (let s = 0; s < this.length; s++) {
      const i = this[s];
      i instanceof Error && kn(`index ${s}`, i), r.push(t.call(e, i, s, this));
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
    const e = Ue(this).indexOf(t);
    if (e === -1)
      return;
    const r = this[e];
    return r instanceof Error && kn(`property ${JSON.stringify(t)}`, r.error), r;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(t, e) {
    return new he(or, t, e);
  }
}
function Mi(n) {
  let t = gt(n);
  return I(t.length <= Pt, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: t, length: Pt, offset: t.length }), t.length !== Pt && (t = Tt(et([Es.slice(t.length % Pt), t]))), t;
}
class ye {
  // The coder name:
  //   - address, uint256, tuple, array, etc.
  name;
  // The fully expanded type, including composite types:
  //   - address, uint256, tuple(address,bytes), uint256[3][4][],  etc.
  type;
  // The localName bound in the signature, in this example it is "baz":
  //   - tuple(address foo, uint bar) baz
  localName;
  // Whether this type is dynamic:
  //  - Dynamic: bytes, string, address[], tuple(boolean[]), etc.
  //  - Not Dynamic: address, uint256, boolean[3], tuple(address, uint8)
  dynamic;
  constructor(t, e, r, s) {
    D(this, { name: t, type: e, localName: r, dynamic: s }, {
      name: "string",
      type: "string",
      localName: "string",
      dynamic: "boolean"
    });
  }
  _throwError(t, e) {
    g(!1, t, this.localName, e);
  }
}
class Is {
  // An array of WordSize lengthed objects to concatenation
  #t;
  #e;
  constructor() {
    this.#t = [], this.#e = 0;
  }
  get data() {
    return et(this.#t);
  }
  get length() {
    return this.#e;
  }
  #n(t) {
    return this.#t.push(t), this.#e += t.length, t.length;
  }
  appendWriter(t) {
    return this.#n(Tt(t.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(t) {
    let e = Tt(t);
    const r = e.length % Pt;
    return r && (e = Tt(et([e, Es.slice(r)]))), this.#n(e);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(t) {
    return this.#n(Mi(t));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const t = this.#t.length;
    return this.#t.push(Es), this.#e += Pt, (e) => {
      this.#t[t] = Mi(e);
    };
  }
}
class Ws {
  // Allows incomplete unpadded data to be read; otherwise an error
  // is raised if attempting to overrun the buffer. This is required
  // to deal with an old Solidity bug, in which event data for
  // external (not public thoguh) was tightly packed.
  allowLoose;
  #t;
  #e;
  #n;
  #r;
  #s;
  constructor(t, e, r) {
    D(this, { allowLoose: !!e }), this.#t = Tt(t), this.#n = 0, this.#r = null, this.#s = r ?? 1024, this.#e = 0;
  }
  get data() {
    return S(this.#t);
  }
  get dataLength() {
    return this.#t.length;
  }
  get consumed() {
    return this.#e;
  }
  get bytes() {
    return new Uint8Array(this.#t);
  }
  #o(t) {
    if (this.#r)
      return this.#r.#o(t);
    this.#n += t, I(this.#s < 1 || this.#n <= this.#s * this.dataLength, `compressed ABI data exceeds inflation ratio of ${this.#s} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
      buffer: Tt(this.#t),
      offset: this.#e,
      length: t,
      info: {
        bytesRead: this.#n,
        dataLength: this.dataLength
      }
    });
  }
  #i(t, e, r) {
    let s = Math.ceil(e / Pt) * Pt;
    return this.#e + s > this.#t.length && (this.allowLoose && r && this.#e + e <= this.#t.length ? s = e : I(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
      buffer: Tt(this.#t),
      length: this.#t.length,
      offset: this.#e + s
    })), this.#t.slice(this.#e, this.#e + s);
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(t) {
    const e = new Ws(this.#t.slice(this.#e + t), this.allowLoose, this.#s);
    return e.#r = this, e;
  }
  // Read bytes
  readBytes(t, e) {
    let r = this.#i(0, t, !!e);
    return this.#o(t), this.#e += r.length, r.slice(0, t);
  }
  // Read a numeric values
  readValue() {
    return wn(this.readBytes(Pt));
  }
  readIndex() {
    return Tu(this.readBytes(Pt));
  }
}
const _i = globalThis || void 0 || self;
function xr(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function Ys(n, ...t) {
  if (!(n instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${n.length}`);
}
function Zu(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  xr(n.outputLen), xr(n.blockLen);
}
function mn(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function ma(n, t) {
  Ys(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const Yr = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Aa = (n) => n instanceof Uint8Array, ju = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4)), qr = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), Yt = (n, t) => n << 32 - t | n >>> t, Wu = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Wu)
  throw new Error("Non little-endian hardware is not supported");
function Yu(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Lr(n) {
  if (typeof n == "string" && (n = Yu(n)), !Aa(n))
    throw new Error(`expected Uint8Array, got ${typeof n}`);
  return n;
}
function qu(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!Aa(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
let qs = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function Xs(n) {
  const t = (r) => n().update(Lr(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function Xu(n = 32) {
  if (Yr && typeof Yr.getRandomValues == "function")
    return Yr.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
let ba = class extends qs {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, Zu(t);
    const r = Lr(e);
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
    return mn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    mn(this), Ys(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: a } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = e._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
};
const Ea = (n, t, e) => new ba(n, t).update(e).digest();
Ea.create = (n, t) => new ba(n, t);
function tl(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), a = Number(e & i), c = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(t + c, o, r), n.setUint32(t + u, a, r);
}
class xa extends qs {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = qr(this.buffer);
  }
  update(t) {
    mn(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Lr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const c = qr(t);
        for (; s <= i - o; o += s)
          this.process(c, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    mn(this), ma(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let l = o; l < s; l++)
      e[l] = 0;
    tl(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = qr(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = c / 4, f = this.get();
    if (u > f.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let l = 0; l < u; l++)
      a.setUint32(4 * l, f[l], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: o, pos: a } = this;
    return t.length = s, t.pos = a, t.finished = i, t.destroyed = o, s % e && t.buffer.set(r), t;
  }
}
const el = (n, t, e) => n & t ^ ~n & e, nl = (n, t, e) => n & t ^ n & e ^ t & e, rl = /* @__PURE__ */ new Uint32Array([
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
]), we = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), me = /* @__PURE__ */ new Uint32Array(64);
let sl = class extends xa {
  constructor() {
    super(64, 32, 8, !1), this.A = we[0] | 0, this.B = we[1] | 0, this.C = we[2] | 0, this.D = we[3] | 0, this.E = we[4] | 0, this.F = we[5] | 0, this.G = we[6] | 0, this.H = we[7] | 0;
  }
  get() {
    const { A: t, B: e, C: r, D: s, E: i, F: o, G: a, H: c } = this;
    return [t, e, r, s, i, o, a, c];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, a, c) {
    this.A = t | 0, this.B = e | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(t, e) {
    for (let l = 0; l < 16; l++, e += 4)
      me[l] = t.getUint32(e, !1);
    for (let l = 16; l < 64; l++) {
      const d = me[l - 15], y = me[l - 2], m = Yt(d, 7) ^ Yt(d, 18) ^ d >>> 3, h = Yt(y, 17) ^ Yt(y, 19) ^ y >>> 10;
      me[l] = h + me[l - 7] + m + me[l - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: c, G: u, H: f } = this;
    for (let l = 0; l < 64; l++) {
      const d = Yt(a, 6) ^ Yt(a, 11) ^ Yt(a, 25), y = f + d + el(a, c, u) + rl[l] + me[l] | 0, h = (Yt(r, 2) ^ Yt(r, 13) ^ Yt(r, 22)) + nl(r, s, i) | 0;
      f = u, u = c, c = a, a = o + y | 0, o = i, i = s, s = r, r = y + h | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, u = u + this.G | 0, f = f + this.H | 0, this.set(r, s, i, o, a, c, u, f);
  }
  roundClean() {
    me.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const Ia = /* @__PURE__ */ Xs(() => new sl()), ar = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ns = /* @__PURE__ */ BigInt(32);
function Na(n, t = !1) {
  return t ? { h: Number(n & ar), l: Number(n >> Ns & ar) } : { h: Number(n >> Ns & ar) | 0, l: Number(n & ar) | 0 };
}
function Ba(n, t = !1) {
  let e = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: i, l: o } = Na(n[s], t);
    [e[s], r[s]] = [i, o];
  }
  return [e, r];
}
const il = (n, t) => BigInt(n >>> 0) << Ns | BigInt(t >>> 0), ol = (n, t, e) => n >>> e, al = (n, t, e) => n << 32 - e | t >>> e, cl = (n, t, e) => n >>> e | t << 32 - e, ul = (n, t, e) => n << 32 - e | t >>> e, ll = (n, t, e) => n << 64 - e | t >>> e - 32, fl = (n, t, e) => n >>> e - 32 | t << 64 - e, hl = (n, t) => t, dl = (n, t) => n, Ta = (n, t, e) => n << e | t >>> 32 - e, Pa = (n, t, e) => t << e | n >>> 32 - e, Oa = (n, t, e) => t << e - 32 | n >>> 64 - e, Ca = (n, t, e) => n << e - 32 | t >>> 64 - e;
function gl(n, t, e, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: n + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const pl = (n, t, e) => (n >>> 0) + (t >>> 0) + (e >>> 0), yl = (n, t, e, r) => t + e + r + (n / 2 ** 32 | 0) | 0, wl = (n, t, e, r) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0), ml = (n, t, e, r, s) => t + e + r + s + (n / 2 ** 32 | 0) | 0, Al = (n, t, e, r, s) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0) + (s >>> 0), bl = (n, t, e, r, s, i) => t + e + r + s + i + (n / 2 ** 32 | 0) | 0, H = {
  fromBig: Na,
  split: Ba,
  toBig: il,
  shrSH: ol,
  shrSL: al,
  rotrSH: cl,
  rotrSL: ul,
  rotrBH: ll,
  rotrBL: fl,
  rotr32H: hl,
  rotr32L: dl,
  rotlSH: Ta,
  rotlSL: Pa,
  rotlBH: Oa,
  rotlBL: Ca,
  add: gl,
  add3L: pl,
  add3H: yl,
  add4L: wl,
  add4H: ml,
  add5H: bl,
  add5L: Al
}, [El, xl] = H.split([
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
].map((n) => BigInt(n))), Ae = /* @__PURE__ */ new Uint32Array(80), be = /* @__PURE__ */ new Uint32Array(80);
class Il extends xa {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: r, Bl: s, Ch: i, Cl: o, Dh: a, Dl: c, Eh: u, El: f, Fh: l, Fl: d, Gh: y, Gl: m, Hh: h, Hl: p } = this;
    return [t, e, r, s, i, o, a, c, u, f, l, d, y, m, h, p];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, a, c, u, f, l, d, y, m, h, p) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = c | 0, this.Eh = u | 0, this.El = f | 0, this.Fh = l | 0, this.Fl = d | 0, this.Gh = y | 0, this.Gl = m | 0, this.Hh = h | 0, this.Hl = p | 0;
  }
  process(t, e) {
    for (let E = 0; E < 16; E++, e += 4)
      Ae[E] = t.getUint32(e), be[E] = t.getUint32(e += 4);
    for (let E = 16; E < 80; E++) {
      const C = Ae[E - 15] | 0, P = be[E - 15] | 0, N = H.rotrSH(C, P, 1) ^ H.rotrSH(C, P, 8) ^ H.shrSH(C, P, 7), T = H.rotrSL(C, P, 1) ^ H.rotrSL(C, P, 8) ^ H.shrSL(C, P, 7), B = Ae[E - 2] | 0, M = be[E - 2] | 0, U = H.rotrSH(B, M, 19) ^ H.rotrBH(B, M, 61) ^ H.shrSH(B, M, 6), R = H.rotrSL(B, M, 19) ^ H.rotrBL(B, M, 61) ^ H.shrSL(B, M, 6), K = H.add4L(T, R, be[E - 7], be[E - 16]), $ = H.add4H(K, N, U, Ae[E - 7], Ae[E - 16]);
      Ae[E] = $ | 0, be[E] = K | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: a, Cl: c, Dh: u, Dl: f, Eh: l, El: d, Fh: y, Fl: m, Gh: h, Gl: p, Hh: w, Hl: x } = this;
    for (let E = 0; E < 80; E++) {
      const C = H.rotrSH(l, d, 14) ^ H.rotrSH(l, d, 18) ^ H.rotrBH(l, d, 41), P = H.rotrSL(l, d, 14) ^ H.rotrSL(l, d, 18) ^ H.rotrBL(l, d, 41), N = l & y ^ ~l & h, T = d & m ^ ~d & p, B = H.add5L(x, P, T, xl[E], be[E]), M = H.add5H(B, w, C, N, El[E], Ae[E]), U = B | 0, R = H.rotrSH(r, s, 28) ^ H.rotrBH(r, s, 34) ^ H.rotrBH(r, s, 39), K = H.rotrSL(r, s, 28) ^ H.rotrBL(r, s, 34) ^ H.rotrBL(r, s, 39), $ = r & i ^ r & a ^ i & a, dt = s & o ^ s & c ^ o & c;
      w = h | 0, x = p | 0, h = y | 0, p = m | 0, y = l | 0, m = d | 0, { h: l, l: d } = H.add(u | 0, f | 0, M | 0, U | 0), u = a | 0, f = c | 0, a = i | 0, c = o | 0, i = r | 0, o = s | 0;
      const A = H.add3L(U, K, dt);
      r = H.add3H(A, M, R, $), s = A | 0;
    }
    ({ h: r, l: s } = H.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = H.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: c } = H.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0), { h: u, l: f } = H.add(this.Dh | 0, this.Dl | 0, u | 0, f | 0), { h: l, l: d } = H.add(this.Eh | 0, this.El | 0, l | 0, d | 0), { h: y, l: m } = H.add(this.Fh | 0, this.Fl | 0, y | 0, m | 0), { h, l: p } = H.add(this.Gh | 0, this.Gl | 0, h | 0, p | 0), { h: w, l: x } = H.add(this.Hh | 0, this.Hl | 0, w | 0, x | 0), this.set(r, s, i, o, a, c, u, f, l, d, y, m, h, p, w, x);
  }
  roundClean() {
    Ae.fill(0), be.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const Nl = /* @__PURE__ */ Xs(() => new Il());
function Bl() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof _i < "u")
    return _i;
  throw new Error("unable to locate global object");
}
const Hi = Bl();
Hi.crypto || Hi.msCrypto;
function Tl(n) {
  switch (n) {
    case "sha256":
      return Ia.create();
    case "sha512":
      return Nl.create();
  }
  g(!1, "invalid hashing algorithm name", "algorithm", n);
}
const [va, Sa, Ra] = [[], [], []], Pl = /* @__PURE__ */ BigInt(0), Un = /* @__PURE__ */ BigInt(1), Ol = /* @__PURE__ */ BigInt(2), Cl = /* @__PURE__ */ BigInt(7), vl = /* @__PURE__ */ BigInt(256), Sl = /* @__PURE__ */ BigInt(113);
for (let n = 0, t = Un, e = 1, r = 0; n < 24; n++) {
  [e, r] = [r, (2 * e + 3 * r) % 5], va.push(2 * (5 * r + e)), Sa.push((n + 1) * (n + 2) / 2 % 64);
  let s = Pl;
  for (let i = 0; i < 7; i++)
    t = (t << Un ^ (t >> Cl) * Sl) % vl, t & Ol && (s ^= Un << (Un << /* @__PURE__ */ BigInt(i)) - Un);
  Ra.push(s);
}
const [Rl, kl] = /* @__PURE__ */ Ba(Ra, !0), Gi = (n, t, e) => e > 32 ? Oa(n, t, e) : Ta(n, t, e), Vi = (n, t, e) => e > 32 ? Ca(n, t, e) : Pa(n, t, e);
function Ul(n, t = 24) {
  const e = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      e[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, u = e[c], f = e[c + 1], l = Gi(u, f, 1) ^ e[a], d = Vi(u, f, 1) ^ e[a + 1];
      for (let y = 0; y < 50; y += 10)
        n[o + y] ^= l, n[o + y + 1] ^= d;
    }
    let s = n[2], i = n[3];
    for (let o = 0; o < 24; o++) {
      const a = Sa[o], c = Gi(s, i, a), u = Vi(s, i, a), f = va[o];
      s = n[f], i = n[f + 1], n[f] = c, n[f + 1] = u;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        e[a] = n[o + a];
      for (let a = 0; a < 10; a++)
        n[o + a] ^= ~e[(a + 2) % 10] & e[(a + 4) % 10];
    }
    n[0] ^= Rl[r], n[1] ^= kl[r];
  }
  e.fill(0);
}
let Ll = class ka extends qs {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, xr(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = ju(this.state);
  }
  keccak() {
    Ul(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    mn(this);
    const { blockLen: e, state: r } = this;
    t = Lr(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(e - this.pos, s - i);
      for (let a = 0; a < o; a++)
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
    mn(this, !1), Ys(t), this.finish();
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
    return xr(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (ma(t, this), this.finished)
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
    return t || (t = new ka(e, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const Dl = (n, t, e) => Xs(() => new Ll(t, n, e)), Fl = /* @__PURE__ */ Dl(1, 136, 256 / 8);
let Ua = !1;
const La = function(n) {
  return Fl(n);
};
let Da = La;
function it(n) {
  const t = _(n, "data");
  return S(Da(t));
}
it._ = La;
it.lock = function() {
  Ua = !0;
};
it.register = function(n) {
  if (Ua)
    throw new TypeError("keccak256 is locked");
  Da = n;
};
Object.freeze(it);
const Fa = function(n) {
  return Tl("sha256").update(n).digest();
};
let Ma = Fa, _a = !1;
function Pe(n) {
  const t = _(n, "data");
  return S(Ma(t));
}
Pe._ = Fa;
Pe.lock = function() {
  _a = !0;
};
Pe.register = function(n) {
  if (_a)
    throw new Error("sha256 is locked");
  Ma = n;
};
Object.freeze(Pe);
Object.freeze(Pe);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ha = BigInt(0), Dr = BigInt(1), Ml = BigInt(2), Fr = (n) => n instanceof Uint8Array, _l = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function An(n) {
  if (!Fr(n))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += _l[n[e]];
  return t;
}
function Ga(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function ti(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
function bn(n) {
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
function Qe(n) {
  return ti(An(n));
}
function ei(n) {
  if (!Fr(n))
    throw new Error("Uint8Array expected");
  return ti(An(Uint8Array.from(n).reverse()));
}
function En(n, t) {
  return bn(n.toString(16).padStart(t * 2, "0"));
}
function ni(n, t) {
  return En(n, t).reverse();
}
function Hl(n) {
  return bn(Ga(n));
}
function Jt(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = bn(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (Fr(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function Gn(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!Fr(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
function Gl(n, t) {
  if (n.length !== t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !1;
  return !0;
}
function Vl(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Ql(n) {
  let t;
  for (t = 0; n > Ha; n >>= Dr, t += 1)
    ;
  return t;
}
function zl(n, t) {
  return n >> BigInt(t) & Dr;
}
const Kl = (n, t, e) => n | (e ? Dr : Ha) << BigInt(t), ri = (n) => (Ml << BigInt(n - 1)) - Dr, Xr = (n) => new Uint8Array(n), Qi = (n) => Uint8Array.from(n);
function Va(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = Xr(n), s = Xr(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, a = (...l) => e(s, r, ...l), c = (l = Xr()) => {
    s = a(Qi([0]), l), r = a(), l.length !== 0 && (s = a(Qi([1]), l), r = a());
  }, u = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let l = 0;
    const d = [];
    for (; l < t; ) {
      r = a();
      const y = r.slice();
      d.push(y), l += r.length;
    }
    return Gn(...d);
  };
  return (l, d) => {
    o(), c(l);
    let y;
    for (; !(y = d(u())); )
      c();
    return o(), y;
  };
}
const Jl = {
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
function jn(n, t, e = {}) {
  const r = (s, i, o) => {
    const a = Jl[i];
    if (typeof a != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const c = n[s];
    if (!(o && c === void 0) && !a(c, n))
      throw new Error(`Invalid param ${String(s)}=${c} (${typeof c}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: zl,
  bitLen: Ql,
  bitMask: ri,
  bitSet: Kl,
  bytesToHex: An,
  bytesToNumberBE: Qe,
  bytesToNumberLE: ei,
  concatBytes: Gn,
  createHmacDrbg: Va,
  ensureBytes: Jt,
  equalBytes: Gl,
  hexToBytes: bn,
  hexToNumber: ti,
  numberToBytesBE: En,
  numberToBytesLE: ni,
  numberToHexUnpadded: Ga,
  numberToVarBytesBE: Hl,
  utf8ToBytes: Vl,
  validateObject: jn
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const yt = BigInt(0), ct = BigInt(1), Le = BigInt(2), Zl = BigInt(3), Bs = BigInt(4), zi = BigInt(5), Ki = BigInt(8);
BigInt(9);
BigInt(16);
function vt(n, t) {
  const e = n % t;
  return e >= yt ? e : t + e;
}
function jl(n, t, e) {
  if (e <= yt || t < yt)
    throw new Error("Expected power/modulo > 0");
  if (e === ct)
    return yt;
  let r = ct;
  for (; t > yt; )
    t & ct && (r = r * n % e), n = n * n % e, t >>= ct;
  return r;
}
function Mt(n, t, e) {
  let r = n;
  for (; t-- > yt; )
    r *= r, r %= e;
  return r;
}
function Ts(n, t) {
  if (n === yt || t <= yt)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = vt(n, t), r = t, s = yt, i = ct;
  for (; e !== yt; ) {
    const a = r / e, c = r % e, u = s - i * a;
    r = e, e = c, s = i, i = u;
  }
  if (r !== ct)
    throw new Error("invert: does not exist");
  return vt(s, t);
}
function Wl(n) {
  const t = (n - ct) / Le;
  let e, r, s;
  for (e = n - ct, r = 0; e % Le === yt; e /= Le, r++)
    ;
  for (s = Le; s < n && jl(s, t, n) !== n - ct; s++)
    ;
  if (r === 1) {
    const o = (n + ct) / Bs;
    return function(c, u) {
      const f = c.pow(u, o);
      if (!c.eql(c.sqr(f), u))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  const i = (e + ct) / Le;
  return function(a, c) {
    if (a.pow(c, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let u = r, f = a.pow(a.mul(a.ONE, s), e), l = a.pow(c, i), d = a.pow(c, e);
    for (; !a.eql(d, a.ONE); ) {
      if (a.eql(d, a.ZERO))
        return a.ZERO;
      let y = 1;
      for (let h = a.sqr(d); y < u && !a.eql(h, a.ONE); y++)
        h = a.sqr(h);
      const m = a.pow(f, ct << BigInt(u - y - 1));
      f = a.sqr(m), l = a.mul(l, m), d = a.mul(d, f), u = y;
    }
    return l;
  };
}
function Yl(n) {
  if (n % Bs === Zl) {
    const t = (n + ct) / Bs;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (n % Ki === zi) {
    const t = (n - zi) / Ki;
    return function(r, s) {
      const i = r.mul(s, Le), o = r.pow(i, t), a = r.mul(s, o), c = r.mul(r.mul(a, Le), o), u = r.mul(a, r.sub(c, r.ONE));
      if (!r.eql(r.sqr(u), s))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  return Wl(n);
}
const ql = [
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
function Xl(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = ql.reduce((r, s) => (r[s] = "function", r), t);
  return jn(n, e);
}
function tf(n, t, e) {
  if (e < yt)
    throw new Error("Expected power > 0");
  if (e === yt)
    return n.ONE;
  if (e === ct)
    return t;
  let r = n.ONE, s = t;
  for (; e > yt; )
    e & ct && (r = n.mul(r, s)), s = n.sqr(s), e >>= ct;
  return r;
}
function ef(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, a) => n.is0(o) ? i : (e[a] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, a) => n.is0(o) ? i : (e[a] = n.mul(i, e[a]), n.mul(i, o)), s), e;
}
function Qa(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function nf(n, t, e = !1, r = {}) {
  if (n <= yt)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = Qa(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Yl(n), a = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: ri(s),
    ZERO: yt,
    ONE: ct,
    create: (c) => vt(c, n),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);
      return yt <= c && c < n;
    },
    is0: (c) => c === yt,
    isOdd: (c) => (c & ct) === ct,
    neg: (c) => vt(-c, n),
    eql: (c, u) => c === u,
    sqr: (c) => vt(c * c, n),
    add: (c, u) => vt(c + u, n),
    sub: (c, u) => vt(c - u, n),
    mul: (c, u) => vt(c * u, n),
    pow: (c, u) => tf(a, c, u),
    div: (c, u) => vt(c * Ts(u, n), n),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, u) => c + u,
    subN: (c, u) => c - u,
    mulN: (c, u) => c * u,
    inv: (c) => Ts(c, n),
    sqrt: r.sqrt || ((c) => o(a, c)),
    invertBatch: (c) => ef(a, c),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (c, u, f) => f ? u : c,
    toBytes: (c) => e ? ni(c, i) : En(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
      return e ? ei(c) : Qe(c);
    }
  });
  return Object.freeze(a);
}
function za(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function Ka(n) {
  const t = za(n);
  return t + Math.ceil(t / 2);
}
function rf(n, t, e = !1) {
  const r = n.length, s = za(t), i = Ka(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? Qe(n) : ei(n), a = vt(o, t - ct) + ct;
  return e ? ni(a, s) : En(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const sf = BigInt(0), ts = BigInt(1);
function of(n, t) {
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
      let o = n.ZERO, a = s;
      for (; i > sf; )
        i & ts && (o = o.add(a)), a = a.double(), i >>= ts;
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
      const { windows: o, windowSize: a } = r(i), c = [];
      let u = s, f = u;
      for (let l = 0; l < o; l++) {
        f = u, c.push(f);
        for (let d = 1; d < a; d++)
          f = f.add(u), c.push(f);
        u = f.double();
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
    wNAF(s, i, o) {
      const { windows: a, windowSize: c } = r(s);
      let u = n.ZERO, f = n.BASE;
      const l = BigInt(2 ** s - 1), d = 2 ** s, y = BigInt(s);
      for (let m = 0; m < a; m++) {
        const h = m * c;
        let p = Number(o & l);
        o >>= y, p > c && (p -= d, o += ts);
        const w = h, x = h + Math.abs(p) - 1, E = m % 2 !== 0, C = p < 0;
        p === 0 ? f = f.add(e(E, i[w])) : u = u.add(e(C, i[x]));
      }
      return { p: u, f };
    },
    wNAFCached(s, i, o, a) {
      const c = s._WINDOW_SIZE || 1;
      let u = i.get(s);
      return u || (u = this.precomputeWindow(s, c), c !== 1 && i.set(s, a(u))), this.wNAF(c, u, o);
    }
  };
}
function Ja(n) {
  return Xl(n.Fp), jn(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Qa(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function af(n) {
  const t = Ja(n);
  jn(t, {
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
const { bytesToNumberBE: cf, hexToBytes: uf } = $l, Me = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(n) {
    const { Err: t } = Me;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: cf(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = Me, e = typeof n == "string" ? uf(n) : n;
    if (!(e instanceof Uint8Array))
      throw new Error("ui8a expected");
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Me._parseInt(e.subarray(2)), { d: o, l: a } = Me._parseInt(i);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (u) => Number.parseInt(u[0], 16) & 8 ? "00" + u : u, e = (u) => {
      const f = u.toString(16);
      return f.length & 1 ? `0${f}` : f;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, a = e(i), c = e(o);
    return `30${e(o + i + 4)}02${c}${s}02${a}${r}`;
  }
}, ue = BigInt(0), _t = BigInt(1);
BigInt(2);
const Ji = BigInt(3);
BigInt(4);
function lf(n) {
  const t = af(n), { Fp: e } = t, r = t.toBytes || ((m, h, p) => {
    const w = h.toAffine();
    return Gn(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((m) => {
    const h = m.subarray(1), p = e.fromBytes(h.subarray(0, e.BYTES)), w = e.fromBytes(h.subarray(e.BYTES, 2 * e.BYTES));
    return { x: p, y: w };
  });
  function i(m) {
    const { a: h, b: p } = t, w = e.sqr(m), x = e.mul(w, m);
    return e.add(e.add(x, e.mul(m, h)), p);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(m) {
    return typeof m == "bigint" && ue < m && m < t.n;
  }
  function a(m) {
    if (!o(m))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function c(m) {
    const { allowedPrivateKeyLengths: h, nByteLength: p, wrapPrivateKey: w, n: x } = t;
    if (h && typeof m != "bigint") {
      if (m instanceof Uint8Array && (m = An(m)), typeof m != "string" || !h.includes(m.length))
        throw new Error("Invalid key");
      m = m.padStart(p * 2, "0");
    }
    let E;
    try {
      E = typeof m == "bigint" ? m : Qe(Jt("private key", m, p));
    } catch {
      throw new Error(`private key must be ${p} bytes, hex or bigint, not ${typeof m}`);
    }
    return w && (E = vt(E, x)), a(E), E;
  }
  const u = /* @__PURE__ */ new Map();
  function f(m) {
    if (!(m instanceof l))
      throw new Error("ProjectivePoint expected");
  }
  class l {
    constructor(h, p, w) {
      if (this.px = h, this.py = p, this.pz = w, h == null || !e.isValid(h))
        throw new Error("x required");
      if (p == null || !e.isValid(p))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(h) {
      const { x: p, y: w } = h || {};
      if (!h || !e.isValid(p) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (h instanceof l)
        throw new Error("projective point not allowed");
      const x = (E) => e.eql(E, e.ZERO);
      return x(p) && x(w) ? l.ZERO : new l(p, w, e.ONE);
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
    static normalizeZ(h) {
      const p = e.invertBatch(h.map((w) => w.pz));
      return h.map((w, x) => w.toAffine(p[x])).map(l.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(h) {
      const p = l.fromAffine(s(Jt("pointHex", h)));
      return p.assertValidity(), p;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(h) {
      return l.BASE.multiply(c(h));
    }
    // "Private method", don't use it directly
    _setWindowSize(h) {
      this._WINDOW_SIZE = h, u.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: h, y: p } = this.toAffine();
      if (!e.isValid(h) || !e.isValid(p))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(p), x = i(h);
      if (!e.eql(w, x))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: h } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(h);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(h) {
      f(h);
      const { px: p, py: w, pz: x } = this, { px: E, py: C, pz: P } = h, N = e.eql(e.mul(p, P), e.mul(E, x)), T = e.eql(e.mul(w, P), e.mul(C, x));
      return N && T;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new l(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: h, b: p } = t, w = e.mul(p, Ji), { px: x, py: E, pz: C } = this;
      let P = e.ZERO, N = e.ZERO, T = e.ZERO, B = e.mul(x, x), M = e.mul(E, E), U = e.mul(C, C), R = e.mul(x, E);
      return R = e.add(R, R), T = e.mul(x, C), T = e.add(T, T), P = e.mul(h, T), N = e.mul(w, U), N = e.add(P, N), P = e.sub(M, N), N = e.add(M, N), N = e.mul(P, N), P = e.mul(R, P), T = e.mul(w, T), U = e.mul(h, U), R = e.sub(B, U), R = e.mul(h, R), R = e.add(R, T), T = e.add(B, B), B = e.add(T, B), B = e.add(B, U), B = e.mul(B, R), N = e.add(N, B), U = e.mul(E, C), U = e.add(U, U), B = e.mul(U, R), P = e.sub(P, B), T = e.mul(U, M), T = e.add(T, T), T = e.add(T, T), new l(P, N, T);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(h) {
      f(h);
      const { px: p, py: w, pz: x } = this, { px: E, py: C, pz: P } = h;
      let N = e.ZERO, T = e.ZERO, B = e.ZERO;
      const M = t.a, U = e.mul(t.b, Ji);
      let R = e.mul(p, E), K = e.mul(w, C), $ = e.mul(x, P), dt = e.add(p, w), A = e.add(E, C);
      dt = e.mul(dt, A), A = e.add(R, K), dt = e.sub(dt, A), A = e.add(p, x);
      let b = e.add(E, P);
      return A = e.mul(A, b), b = e.add(R, $), A = e.sub(A, b), b = e.add(w, x), N = e.add(C, P), b = e.mul(b, N), N = e.add(K, $), b = e.sub(b, N), B = e.mul(M, A), N = e.mul(U, $), B = e.add(N, B), N = e.sub(K, B), B = e.add(K, B), T = e.mul(N, B), K = e.add(R, R), K = e.add(K, R), $ = e.mul(M, $), A = e.mul(U, A), K = e.add(K, $), $ = e.sub(R, $), $ = e.mul(M, $), A = e.add(A, $), R = e.mul(K, A), T = e.add(T, R), R = e.mul(b, A), N = e.mul(dt, N), N = e.sub(N, R), R = e.mul(dt, K), B = e.mul(b, B), B = e.add(B, R), new l(N, T, B);
    }
    subtract(h) {
      return this.add(h.negate());
    }
    is0() {
      return this.equals(l.ZERO);
    }
    wNAF(h) {
      return y.wNAFCached(this, u, h, (p) => {
        const w = e.invertBatch(p.map((x) => x.pz));
        return p.map((x, E) => x.toAffine(w[E])).map(l.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(h) {
      const p = l.ZERO;
      if (h === ue)
        return p;
      if (a(h), h === _t)
        return this;
      const { endo: w } = t;
      if (!w)
        return y.unsafeLadder(this, h);
      let { k1neg: x, k1: E, k2neg: C, k2: P } = w.splitScalar(h), N = p, T = p, B = this;
      for (; E > ue || P > ue; )
        E & _t && (N = N.add(B)), P & _t && (T = T.add(B)), B = B.double(), E >>= _t, P >>= _t;
      return x && (N = N.negate()), C && (T = T.negate()), T = new l(e.mul(T.px, w.beta), T.py, T.pz), N.add(T);
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
    multiply(h) {
      a(h);
      let p = h, w, x;
      const { endo: E } = t;
      if (E) {
        const { k1neg: C, k1: P, k2neg: N, k2: T } = E.splitScalar(p);
        let { p: B, f: M } = this.wNAF(P), { p: U, f: R } = this.wNAF(T);
        B = y.constTimeNegate(C, B), U = y.constTimeNegate(N, U), U = new l(e.mul(U.px, E.beta), U.py, U.pz), w = B.add(U), x = M.add(R);
      } else {
        const { p: C, f: P } = this.wNAF(p);
        w = C, x = P;
      }
      return l.normalizeZ([w, x])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(h, p, w) {
      const x = l.BASE, E = (P, N) => N === ue || N === _t || !P.equals(x) ? P.multiplyUnsafe(N) : P.multiply(N), C = E(this, p).add(E(h, w));
      return C.is0() ? void 0 : C;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(h) {
      const { px: p, py: w, pz: x } = this, E = this.is0();
      h == null && (h = E ? e.ONE : e.inv(x));
      const C = e.mul(p, h), P = e.mul(w, h), N = e.mul(x, h);
      if (E)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(N, e.ONE))
        throw new Error("invZ was invalid");
      return { x: C, y: P };
    }
    isTorsionFree() {
      const { h, isTorsionFree: p } = t;
      if (h === _t)
        return !0;
      if (p)
        return p(l, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h, clearCofactor: p } = t;
      return h === _t ? this : p ? p(l, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(h = !0) {
      return this.assertValidity(), r(l, this, h);
    }
    toHex(h = !0) {
      return An(this.toRawBytes(h));
    }
  }
  l.BASE = new l(t.Gx, t.Gy, e.ONE), l.ZERO = new l(e.ZERO, e.ONE, e.ZERO);
  const d = t.nBitLength, y = of(l, t.endo ? Math.ceil(d / 2) : d);
  return {
    CURVE: t,
    ProjectivePoint: l,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function ff(n) {
  const t = Ja(n);
  return jn(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function hf(n) {
  const t = ff(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(A) {
    return ue < A && A < e.ORDER;
  }
  function a(A) {
    return vt(A, r);
  }
  function c(A) {
    return Ts(A, r);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: f, weierstrassEquation: l, isWithinCurveOrder: d } = lf({
    ...t,
    toBytes(A, b, O) {
      const F = b.toAffine(), L = e.toBytes(F.x), V = Gn;
      return O ? V(Uint8Array.from([b.hasEvenY() ? 2 : 3]), L) : V(Uint8Array.from([4]), L, e.toBytes(F.y));
    },
    fromBytes(A) {
      const b = A.length, O = A[0], F = A.subarray(1);
      if (b === s && (O === 2 || O === 3)) {
        const L = Qe(F);
        if (!o(L))
          throw new Error("Point is not on curve");
        const V = l(L);
        let j = e.sqrt(V);
        const W = (j & _t) === _t;
        return (O & 1) === 1 !== W && (j = e.neg(j)), { x: L, y: j };
      } else if (b === i && O === 4) {
        const L = e.fromBytes(F.subarray(0, e.BYTES)), V = e.fromBytes(F.subarray(e.BYTES, 2 * e.BYTES));
        return { x: L, y: V };
      } else
        throw new Error(`Point of length ${b} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), y = (A) => An(En(A, t.nByteLength));
  function m(A) {
    const b = r >> _t;
    return A > b;
  }
  function h(A) {
    return m(A) ? a(-A) : A;
  }
  const p = (A, b, O) => Qe(A.slice(b, O));
  class w {
    constructor(b, O, F) {
      this.r = b, this.s = O, this.recovery = F, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(b) {
      const O = t.nByteLength;
      return b = Jt("compactSignature", b, O * 2), new w(p(b, 0, O), p(b, O, 2 * O));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(b) {
      const { r: O, s: F } = Me.toSig(Jt("DER", b));
      return new w(O, F);
    }
    assertValidity() {
      if (!d(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!d(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(b) {
      return new w(this.r, this.s, b);
    }
    recoverPublicKey(b) {
      const { r: O, s: F, recovery: L } = this, V = T(Jt("msgHash", b));
      if (L == null || ![0, 1, 2, 3].includes(L))
        throw new Error("recovery id invalid");
      const j = L === 2 || L === 3 ? O + t.n : O;
      if (j >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const W = L & 1 ? "03" : "02", wt = u.fromHex(W + y(j)), ft = c(j), xt = a(-V * ft), zt = a(F * ft), mt = u.BASE.multiplyAndAddUnsafe(wt, xt, zt);
      if (!mt)
        throw new Error("point at infinify");
      return mt.assertValidity(), mt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return bn(this.toDERHex());
    }
    toDERHex() {
      return Me.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return bn(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const x = {
    isValidPrivateKey(A) {
      try {
        return f(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: f,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = Ka(t.n);
      return rf(t.randomBytes(A), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(A = 8, b = u.BASE) {
      return b._setWindowSize(A), b.multiply(BigInt(3)), b;
    }
  };
  function E(A, b = !0) {
    return u.fromPrivateKey(A).toRawBytes(b);
  }
  function C(A) {
    const b = A instanceof Uint8Array, O = typeof A == "string", F = (b || O) && A.length;
    return b ? F === s || F === i : O ? F === 2 * s || F === 2 * i : A instanceof u;
  }
  function P(A, b, O = !0) {
    if (C(A))
      throw new Error("first arg must be private key");
    if (!C(b))
      throw new Error("second arg must be public key");
    return u.fromHex(b).multiply(f(A)).toRawBytes(O);
  }
  const N = t.bits2int || function(A) {
    const b = Qe(A), O = A.length * 8 - t.nBitLength;
    return O > 0 ? b >> BigInt(O) : b;
  }, T = t.bits2int_modN || function(A) {
    return a(N(A));
  }, B = ri(t.nBitLength);
  function M(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(ue <= A && A < B))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return En(A, t.nByteLength);
  }
  function U(A, b, O = R) {
    if (["recovered", "canonical"].some((It) => It in O))
      throw new Error("sign() legacy options not supported");
    const { hash: F, randomBytes: L } = t;
    let { lowS: V, prehash: j, extraEntropy: W } = O;
    V == null && (V = !0), A = Jt("msgHash", A), j && (A = Jt("prehashed msgHash", F(A)));
    const wt = T(A), ft = f(b), xt = [M(ft), M(wt)];
    if (W != null) {
      const It = W === !0 ? L(e.BYTES) : W;
      xt.push(Jt("extraEntropy", It));
    }
    const zt = Gn(...xt), mt = wt;
    function Se(It) {
      const kt = N(It);
      if (!d(kt))
        return;
      const Cn = c(kt), ot = u.BASE.multiply(kt).toAffine(), Ut = a(ot.x);
      if (Ut === ue)
        return;
      const se = a(Cn * a(mt + Ut * ft));
      if (se === ue)
        return;
      let vn = (ot.x === Ut ? 0 : 2) | Number(ot.y & _t), Sn = se;
      return V && m(se) && (Sn = h(se), vn ^= 1), new w(Ut, Sn, vn);
    }
    return { seed: zt, k2sig: Se };
  }
  const R = { lowS: t.lowS, prehash: !1 }, K = { lowS: t.lowS, prehash: !1 };
  function $(A, b, O = R) {
    const { seed: F, k2sig: L } = U(A, b, O), V = t;
    return Va(V.hash.outputLen, V.nByteLength, V.hmac)(F, L);
  }
  u.BASE._setWindowSize(8);
  function dt(A, b, O, F = K) {
    const L = A;
    if (b = Jt("msgHash", b), O = Jt("publicKey", O), "strict" in F)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: V, prehash: j } = F;
    let W, wt;
    try {
      if (typeof L == "string" || L instanceof Uint8Array)
        try {
          W = w.fromDER(L);
        } catch (ot) {
          if (!(ot instanceof Me.Err))
            throw ot;
          W = w.fromCompact(L);
        }
      else if (typeof L == "object" && typeof L.r == "bigint" && typeof L.s == "bigint") {
        const { r: ot, s: Ut } = L;
        W = new w(ot, Ut);
      } else
        throw new Error("PARSE");
      wt = u.fromHex(O);
    } catch (ot) {
      if (ot.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (V && W.hasHighS())
      return !1;
    j && (b = t.hash(b));
    const { r: ft, s: xt } = W, zt = T(b), mt = c(xt), Se = a(zt * mt), It = a(ft * mt), kt = u.BASE.multiplyAndAddUnsafe(wt, Se, It)?.toAffine();
    return kt ? a(kt.x) === ft : !1;
  }
  return {
    CURVE: t,
    getPublicKey: E,
    getSharedSecret: P,
    sign: $,
    verify: dt,
    ProjectivePoint: u,
    Signature: w,
    utils: x
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function df(n) {
  return {
    hash: n,
    hmac: (t, ...e) => Ea(n, t, qu(...e)),
    randomBytes: Xu
  };
}
function gf(n, t) {
  const e = (r) => hf({ ...n, ...df(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const $a = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), $i = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), pf = BigInt(1), Ps = BigInt(2), Zi = (n, t) => (n + t / Ps) / t;
function yf(n) {
  const t = $a, e = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), c = BigInt(88), u = n * n * n % t, f = u * u * n % t, l = Mt(f, e, t) * f % t, d = Mt(l, e, t) * f % t, y = Mt(d, Ps, t) * u % t, m = Mt(y, s, t) * y % t, h = Mt(m, i, t) * m % t, p = Mt(h, a, t) * h % t, w = Mt(p, c, t) * p % t, x = Mt(w, a, t) * h % t, E = Mt(x, e, t) * f % t, C = Mt(E, o, t) * m % t, P = Mt(C, r, t) * u % t, N = Mt(P, Ps, t);
  if (!Os.eql(Os.sqr(N), n))
    throw new Error("Cannot find square root");
  return N;
}
const Os = nf($a, void 0, void 0, { sqrt: yf }), Ie = gf({
  a: BigInt(0),
  b: BigInt(7),
  Fp: Os,
  n: $i,
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
      const t = $i, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -pf * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, o = BigInt("0x100000000000000000000000000000000"), a = Zi(i * n, t), c = Zi(-r * n, t);
      let u = vt(n - a * e - c * s, t), f = vt(-a * r - c * i, t);
      const l = u > o, d = f > o;
      if (l && (u = t - u), d && (f = t - f), u > o || f > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: l, k1: u, k2neg: d, k2: f };
    }
  }
}, Ia);
BigInt(0);
Ie.ProjectivePoint;
const xn = "0x0000000000000000000000000000000000000000", Cs = "0x0000000000000000000000000000000000000000000000000000000000000000", ji = BigInt(0), Wi = BigInt(1), Yi = BigInt(2), qi = BigInt(27), Xi = BigInt(28), cr = BigInt(35), sn = {};
function to(n) {
  return ne(gt(n), 32);
}
class ht {
  #t;
  #e;
  #n;
  #r;
  /**
   *  The ``r`` value for a signautre.
   *
   *  This represents the ``x`` coordinate of a "reference" or
   *  challenge point, from which the ``y`` can be computed.
   */
  get r() {
    return this.#t;
  }
  set r(t) {
    g(Ve(t) === 32, "invalid r", "value", t), this.#t = S(t);
  }
  /**
   *  The ``s`` value for a signature.
   */
  get s() {
    return this.#e;
  }
  set s(t) {
    g(Ve(t) === 32, "invalid s", "value", t);
    const e = S(t);
    g(parseInt(e.substring(0, 3)) < 8, "non-canonical s", "value", e), this.#e = e;
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
    return this.#n;
  }
  set v(t) {
    const e = G(t, "value");
    g(e === 27 || e === 28, "invalid v", "v", t), this.#n = e;
  }
  /**
   *  The EIP-155 ``v`` for legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get networkV() {
    return this.#r;
  }
  /**
   *  The chain ID for EIP-155 legacy transactions. For non-legacy
   *  transactions, this value is ``null``.
   */
  get legacyChainId() {
    const t = this.networkV;
    return t == null ? null : ht.getChainId(t);
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
    const t = _(this.s);
    return this.yParity && (t[0] |= 128), S(t);
  }
  /**
   *  The [[link-eip-2098]] compact representation.
   */
  get compactSerialized() {
    return et([this.r, this.yParityAndS]);
  }
  /**
   *  The serialized representation.
   */
  get serialized() {
    return et([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    Zn(t, sn, "Signature"), this.#t = e, this.#e = r, this.#n = s, this.#r = null;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Signature { r: "${this.r}", s: "${this.s}", yParity: ${this.yParity}, networkV: ${this.networkV} }`;
  }
  /**
   *  Returns a new identical [[Signature]].
   */
  clone() {
    const t = new ht(sn, this.r, this.s, this.v);
    return this.networkV && (t.#r = this.networkV), t;
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
    const e = k(t, "v");
    return e == qi || e == Xi ? ji : (g(e >= cr, "invalid EIP-155 v", "v", t), (e - cr) / Yi);
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
    return k(t) * Yi + BigInt(35 + e - 27);
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
    const e = k(t);
    return e === ji || e === qi ? 27 : e === Wi || e === Xi ? 28 : (g(e >= cr, "invalid v", "v", t), e & Wi ? 27 : 28);
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
    function e(u, f) {
      g(u, f, "signature", t);
    }
    if (t == null)
      return new ht(sn, Cs, Cs, 27);
    if (typeof t == "string") {
      const u = _(t, "signature");
      if (u.length === 64) {
        const f = S(u.slice(0, 32)), l = u.slice(32, 64), d = l[0] & 128 ? 28 : 27;
        return l[0] &= 127, new ht(sn, f, S(l), d);
      }
      if (u.length === 65) {
        const f = S(u.slice(0, 32)), l = u.slice(32, 64);
        e((l[0] & 128) === 0, "non-canonical s");
        const d = ht.getNormalizedV(u[64]);
        return new ht(sn, f, S(l), d);
      }
      e(!1, "invalid raw signature length");
    }
    if (t instanceof ht)
      return t.clone();
    const r = t.r;
    e(r != null, "missing r");
    const s = to(r), i = function(u, f) {
      if (u != null)
        return to(u);
      if (f != null) {
        e(q(f, 32), "invalid yParityAndS");
        const l = _(f);
        return l[0] &= 127, S(l);
      }
      e(!1, "missing s");
    }(t.s, t.yParityAndS);
    e((_(i)[0] & 128) == 0, "non-canonical s");
    const { networkV: o, v: a } = function(u, f, l) {
      if (u != null) {
        const d = k(u);
        return {
          networkV: d >= cr ? d : void 0,
          v: ht.getNormalizedV(d)
        };
      }
      if (f != null)
        return e(q(f, 32), "invalid yParityAndS"), { v: _(f)[0] & 128 ? 28 : 27 };
      if (l != null) {
        switch (G(l, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        e(!1, "invalid yParity");
      }
      e(!1, "missing v");
    }(t.v, t.yParityAndS, t.yParity), c = new ht(sn, s, i, a);
    return o && (c.#r = o), e(t.yParity == null || G(t.yParity, "sig.yParity") === c.yParity, "yParity mismatch"), e(t.yParityAndS == null || t.yParityAndS === c.yParityAndS, "yParityAndS mismatch"), c;
  }
}
class le {
  #t;
  /**
   *  Creates a new **SigningKey** for %%privateKey%%.
   */
  constructor(t) {
    g(Ve(t) === 32, "invalid private key", "privateKey", "[REDACTED]"), this.#t = S(t);
  }
  /**
   *  The private key.
   */
  get privateKey() {
    return this.#t;
  }
  /**
   *  The uncompressed public key.
   *
   * This will always begin with the prefix ``0x04`` and be 132
   * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
   */
  get publicKey() {
    return le.computePublicKey(this.#t);
  }
  /**
   *  The compressed public key.
   *
   *  This will always begin with either the prefix ``0x02`` or ``0x03``
   *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
   *  nibbles)
   */
  get compressedPublicKey() {
    return le.computePublicKey(this.#t, !0);
  }
  /**
   *  Return the signature of the signed %%digest%%.
   */
  sign(t) {
    g(Ve(t) === 32, "invalid digest length", "digest", t);
    const e = Ie.sign(Tt(t), Tt(this.#t), {
      lowS: !0
    });
    return ht.from({
      r: Te(e.r, 32),
      s: Te(e.s, 32),
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
    const e = le.computePublicKey(t);
    return S(Ie.getSharedSecret(Tt(this.#t), _(e), !1));
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
    let r = _(t, "key");
    if (r.length === 32) {
      const i = Ie.getPublicKey(r, !!e);
      return S(i);
    }
    if (r.length === 64) {
      const i = new Uint8Array(65);
      i[0] = 4, i.set(r, 1), r = i;
    }
    const s = Ie.ProjectivePoint.fromHex(r);
    return S(s.toRawBytes(e));
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
    g(Ve(t) === 32, "invalid digest length", "digest", t);
    const r = ht.from(e);
    let s = Ie.Signature.fromCompact(Tt(et([r.r, r.s])));
    s = s.addRecoveryBit(r.yParity);
    const i = s.recoverPublicKey(Tt(t));
    return g(i != null, "invalid signautre for digest", "signature", e), "0x" + i.toHex(!1);
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
    const s = Ie.ProjectivePoint.fromHex(le.computePublicKey(t).substring(2)), i = Ie.ProjectivePoint.fromHex(le.computePublicKey(e).substring(2));
    return "0x" + s.add(i).toHex(!!r);
  }
}
const wf = BigInt(0), mf = BigInt(36);
function eo(n) {
  n = n.toLowerCase();
  const t = n.substring(2).split(""), e = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    e[s] = t[s].charCodeAt(0);
  const r = _(it(e));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const si = {};
for (let n = 0; n < 10; n++)
  si[String(n)] = String(n);
for (let n = 0; n < 26; n++)
  si[String.fromCharCode(65 + n)] = String(10 + n);
const no = 15;
function Af(n) {
  n = n.toUpperCase(), n = n.substring(4) + n.substring(0, 2) + "00";
  let t = n.split("").map((r) => si[r]).join("");
  for (; t.length >= no; ) {
    let r = t.substring(0, no);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
const bf = function() {
  const n = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    n[e] = BigInt(t);
  }
  return n;
}();
function Ef(n) {
  n = n.toLowerCase();
  let t = wf;
  for (let e = 0; e < n.length; e++)
    t = t * mf + bf[n[e]];
  return t;
}
function Z(n) {
  if (g(typeof n == "string", "invalid address", "address", n), n.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    n.startsWith("0x") || (n = "0x" + n);
    const t = eo(n);
    return g(!n.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === n, "bad address checksum", "address", n), t;
  }
  if (n.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    g(n.substring(2, 4) === Af(n), "bad icap checksum", "address", n);
    let t = Ef(n.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return eo("0x" + t);
  }
  g(!1, "invalid address", "address", n);
}
function xf(n) {
  const t = Z(n.from);
  let r = k(n.nonce, "tx.nonce").toString(16);
  return r === "0" ? r = "0x" : r.length % 2 ? r = "0x0" + r : r = "0x" + r, Z(rt(it(je([t, r])), 12));
}
function Za(n) {
  return n && typeof n.getAddress == "function";
}
async function es(n, t) {
  const e = await t;
  return (e == null || e === "0x0000000000000000000000000000000000000000") && (I(typeof n != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: n }), g(!1, "invalid AddressLike value; did not resolve to a value address", "target", n)), Z(e);
}
function Ot(n, t) {
  if (typeof n == "string")
    return n.match(/^0x[0-9a-f]{40}$/i) ? Z(n) : (I(t != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), es(n, t.resolveName(n)));
  if (Za(n))
    return es(n, n.getAddress());
  if (n && typeof n.then == "function")
    return es(n, n);
  g(!1, "unsupported addressable value", "target", n);
}
const ae = {};
function v(n, t) {
  let e = !1;
  return t < 0 && (e = !0, t *= -1), new st(ae, `${e ? "" : "u"}int${t}`, n, { signed: e, width: t });
}
function J(n, t) {
  return new st(ae, `bytes${t || ""}`, n, { size: t });
}
const ro = Symbol.for("_ethers_typed");
class st {
  /**
   *  The type, as a Solidity-compatible type.
   */
  type;
  /**
   *  The actual value.
   */
  value;
  #t;
  /**
   *  @_ignore:
   */
  _typedSymbol;
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s) {
    s == null && (s = null), Zn(ae, t, "Typed"), D(this, { _typedSymbol: ro, type: e, value: r }), this.#t = s, this.format();
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
    return this.#t;
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
    return this.#t === !0 ? -1 : this.#t === !1 ? this.value.length : null;
  }
  /**
   *  Returns a new **Typed** of %%type%% with the %%value%%.
   */
  static from(t, e) {
    return new st(ae, t, e);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(t) {
    return v(t, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(t) {
    return v(t, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(t) {
    return v(t, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(t) {
    return v(t, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(t) {
    return v(t, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(t) {
    return v(t, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(t) {
    return v(t, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(t) {
    return v(t, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(t) {
    return v(t, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(t) {
    return v(t, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(t) {
    return v(t, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(t) {
    return v(t, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(t) {
    return v(t, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(t) {
    return v(t, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(t) {
    return v(t, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(t) {
    return v(t, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(t) {
    return v(t, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(t) {
    return v(t, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(t) {
    return v(t, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(t) {
    return v(t, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(t) {
    return v(t, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(t) {
    return v(t, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(t) {
    return v(t, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(t) {
    return v(t, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(t) {
    return v(t, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(t) {
    return v(t, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(t) {
    return v(t, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(t) {
    return v(t, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(t) {
    return v(t, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(t) {
    return v(t, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(t) {
    return v(t, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(t) {
    return v(t, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(t) {
    return v(t, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(t) {
    return v(t, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(t) {
    return v(t, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(t) {
    return v(t, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(t) {
    return v(t, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(t) {
    return v(t, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(t) {
    return v(t, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(t) {
    return v(t, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(t) {
    return v(t, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(t) {
    return v(t, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(t) {
    return v(t, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(t) {
    return v(t, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(t) {
    return v(t, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(t) {
    return v(t, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(t) {
    return v(t, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(t) {
    return v(t, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(t) {
    return v(t, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(t) {
    return v(t, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(t) {
    return v(t, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(t) {
    return v(t, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(t) {
    return v(t, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(t) {
    return v(t, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(t) {
    return v(t, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(t) {
    return v(t, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(t) {
    return v(t, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(t) {
    return v(t, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(t) {
    return v(t, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(t) {
    return v(t, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(t) {
    return v(t, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(t) {
    return v(t, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(t) {
    return v(t, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(t) {
    return v(t, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(t) {
    return v(t, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(t) {
    return v(t, -256);
  }
  /**
   *  Return a new ``bytes1`` type for %%v%%.
   */
  static bytes1(t) {
    return J(t, 1);
  }
  /**
   *  Return a new ``bytes2`` type for %%v%%.
   */
  static bytes2(t) {
    return J(t, 2);
  }
  /**
   *  Return a new ``bytes3`` type for %%v%%.
   */
  static bytes3(t) {
    return J(t, 3);
  }
  /**
   *  Return a new ``bytes4`` type for %%v%%.
   */
  static bytes4(t) {
    return J(t, 4);
  }
  /**
   *  Return a new ``bytes5`` type for %%v%%.
   */
  static bytes5(t) {
    return J(t, 5);
  }
  /**
   *  Return a new ``bytes6`` type for %%v%%.
   */
  static bytes6(t) {
    return J(t, 6);
  }
  /**
   *  Return a new ``bytes7`` type for %%v%%.
   */
  static bytes7(t) {
    return J(t, 7);
  }
  /**
   *  Return a new ``bytes8`` type for %%v%%.
   */
  static bytes8(t) {
    return J(t, 8);
  }
  /**
   *  Return a new ``bytes9`` type for %%v%%.
   */
  static bytes9(t) {
    return J(t, 9);
  }
  /**
   *  Return a new ``bytes10`` type for %%v%%.
   */
  static bytes10(t) {
    return J(t, 10);
  }
  /**
   *  Return a new ``bytes11`` type for %%v%%.
   */
  static bytes11(t) {
    return J(t, 11);
  }
  /**
   *  Return a new ``bytes12`` type for %%v%%.
   */
  static bytes12(t) {
    return J(t, 12);
  }
  /**
   *  Return a new ``bytes13`` type for %%v%%.
   */
  static bytes13(t) {
    return J(t, 13);
  }
  /**
   *  Return a new ``bytes14`` type for %%v%%.
   */
  static bytes14(t) {
    return J(t, 14);
  }
  /**
   *  Return a new ``bytes15`` type for %%v%%.
   */
  static bytes15(t) {
    return J(t, 15);
  }
  /**
   *  Return a new ``bytes16`` type for %%v%%.
   */
  static bytes16(t) {
    return J(t, 16);
  }
  /**
   *  Return a new ``bytes17`` type for %%v%%.
   */
  static bytes17(t) {
    return J(t, 17);
  }
  /**
   *  Return a new ``bytes18`` type for %%v%%.
   */
  static bytes18(t) {
    return J(t, 18);
  }
  /**
   *  Return a new ``bytes19`` type for %%v%%.
   */
  static bytes19(t) {
    return J(t, 19);
  }
  /**
   *  Return a new ``bytes20`` type for %%v%%.
   */
  static bytes20(t) {
    return J(t, 20);
  }
  /**
   *  Return a new ``bytes21`` type for %%v%%.
   */
  static bytes21(t) {
    return J(t, 21);
  }
  /**
   *  Return a new ``bytes22`` type for %%v%%.
   */
  static bytes22(t) {
    return J(t, 22);
  }
  /**
   *  Return a new ``bytes23`` type for %%v%%.
   */
  static bytes23(t) {
    return J(t, 23);
  }
  /**
   *  Return a new ``bytes24`` type for %%v%%.
   */
  static bytes24(t) {
    return J(t, 24);
  }
  /**
   *  Return a new ``bytes25`` type for %%v%%.
   */
  static bytes25(t) {
    return J(t, 25);
  }
  /**
   *  Return a new ``bytes26`` type for %%v%%.
   */
  static bytes26(t) {
    return J(t, 26);
  }
  /**
   *  Return a new ``bytes27`` type for %%v%%.
   */
  static bytes27(t) {
    return J(t, 27);
  }
  /**
   *  Return a new ``bytes28`` type for %%v%%.
   */
  static bytes28(t) {
    return J(t, 28);
  }
  /**
   *  Return a new ``bytes29`` type for %%v%%.
   */
  static bytes29(t) {
    return J(t, 29);
  }
  /**
   *  Return a new ``bytes30`` type for %%v%%.
   */
  static bytes30(t) {
    return J(t, 30);
  }
  /**
   *  Return a new ``bytes31`` type for %%v%%.
   */
  static bytes31(t) {
    return J(t, 31);
  }
  /**
   *  Return a new ``bytes32`` type for %%v%%.
   */
  static bytes32(t) {
    return J(t, 32);
  }
  /**
   *  Return a new ``address`` type for %%v%%.
   */
  static address(t) {
    return new st(ae, "address", t);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(t) {
    return new st(ae, "bool", !!t);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(t) {
    return new st(ae, "bytes", t);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(t) {
    return new st(ae, "string", t);
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
    return new st(ae, "overrides", Object.assign({}, t));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(t) {
    return t && typeof t == "object" && "_typedSymbol" in t && t._typedSymbol === ro;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(t, e) {
    if (st.isTyped(t)) {
      if (t.type !== e)
        throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
      return t.value;
    }
    return t;
  }
}
class If extends ye {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    let r = st.dereference(e, "string");
    try {
      r = Z(r);
    } catch (s) {
      return this._throwError(s.message, e);
    }
    return t.writeValue(r);
  }
  decode(t) {
    return Z(Te(t.readValue(), 20));
  }
}
class Nf extends ye {
  coder;
  constructor(t) {
    super(t.name, t.type, "_", t.dynamic), this.coder = t;
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
}
function ja(n, t, e) {
  let r = [];
  if (Array.isArray(e))
    r = e;
  else if (e && typeof e == "object") {
    let c = {};
    r = t.map((u) => {
      const f = u.localName;
      return I(f, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: u }, value: e }), I(!c[f], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: u }, value: e }), c[f] = !0, e[f];
    });
  } else
    g(!1, "invalid tuple value", "tuple", e);
  g(t.length === r.length, "types/value length mismatch", "tuple", e);
  let s = new Is(), i = new Is(), o = [];
  t.forEach((c, u) => {
    let f = r[u];
    if (c.dynamic) {
      let l = i.length;
      c.encode(i, f);
      let d = s.writeUpdatableValue();
      o.push((y) => {
        d(y + l);
      });
    } else
      c.encode(s, f);
  }), o.forEach((c) => {
    c(s.length);
  });
  let a = n.appendWriter(s);
  return a += n.appendWriter(i), a;
}
function Wa(n, t) {
  let e = [], r = [], s = n.subReader(0);
  return t.forEach((i) => {
    let o = null;
    if (i.dynamic) {
      let a = n.readIndex(), c = s.subReader(a);
      try {
        o = i.decode(c);
      } catch (u) {
        if (Et(u, "BUFFER_OVERRUN"))
          throw u;
        o = u, o.baseType = i.name, o.name = i.localName, o.type = i.type;
      }
    } else
      try {
        o = i.decode(n);
      } catch (a) {
        if (Et(a, "BUFFER_OVERRUN"))
          throw a;
        o = a, o.baseType = i.name, o.name = i.localName, o.type = i.type;
      }
    if (o == null)
      throw new Error("investigate");
    e.push(o), r.push(i.localName || null);
  }), he.fromItems(e, r);
}
class Bf extends ye {
  coder;
  length;
  constructor(t, e, r) {
    const s = t.type + "[" + (e >= 0 ? e : "") + "]", i = e === -1 || t.dynamic;
    super("array", s, r, i), D(this, { coder: t, length: e });
  }
  defaultValue() {
    const t = this.coder.defaultValue(), e = [];
    for (let r = 0; r < this.length; r++)
      e.push(t);
    return e;
  }
  encode(t, e) {
    const r = st.dereference(e, "array");
    Array.isArray(r) || this._throwError("expected array value", r);
    let s = this.length;
    s === -1 && (s = r.length, t.writeValue(r.length)), oa(r.length, s, "coder array" + (this.localName ? " " + this.localName : ""));
    let i = [];
    for (let o = 0; o < r.length; o++)
      i.push(this.coder);
    return ja(t, i, r);
  }
  decode(t) {
    let e = this.length;
    e === -1 && (e = t.readIndex(), I(e * Pt <= t.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: t.bytes, offset: e * Pt, length: t.dataLength }));
    let r = [];
    for (let s = 0; s < e; s++)
      r.push(new Nf(this.coder));
    return Wa(t, r);
  }
}
class Tf extends ye {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    const r = st.dereference(e, "bool");
    return t.writeValue(r ? 1 : 0);
  }
  decode(t) {
    return !!t.readValue();
  }
}
class Ya extends ye {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = Tt(e);
    let r = t.writeValue(e.length);
    return r += t.writeBytes(e), r;
  }
  decode(t) {
    return t.readBytes(t.readIndex(), !0);
  }
}
class Pf extends Ya {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return S(super.decode(t));
  }
}
class Of extends ye {
  size;
  constructor(t, e) {
    let r = "bytes" + String(t);
    super(r, r, e, !1), D(this, { size: t }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(t, e) {
    let r = Tt(st.dereference(e, this.type));
    return r.length !== this.size && this._throwError("incorrect data length", e), t.writeBytes(r);
  }
  decode(t) {
    return S(t.readBytes(this.size));
  }
}
const Cf = new Uint8Array([]);
class vf extends ye {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes(Cf);
  }
  decode(t) {
    return t.readBytes(0), null;
  }
}
const Sf = BigInt(0), Rf = BigInt(1), kf = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class Uf extends ye {
  size;
  signed;
  constructor(t, e, r) {
    const s = (e ? "int" : "uint") + t * 8;
    super(s, s, r, !1), D(this, { size: t, signed: e }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(t, e) {
    let r = k(st.dereference(e, this.type)), s = Fe(kf, Pt * 8);
    if (this.signed) {
      let i = Fe(s, this.size * 8 - 1);
      (r > i || r < -(i + Rf)) && this._throwError("value out-of-bounds", e), r = js(r, 8 * Pt);
    } else (r < Sf || r > Fe(s, this.size * 8)) && this._throwError("value out-of-bounds", e);
    return t.writeValue(r);
  }
  decode(t) {
    let e = Fe(t.readValue(), this.size * 8);
    return this.signed && (e = br(e, this.size * 8)), e;
  }
}
class Lf extends Ya {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, jt(st.dereference(e, "string")));
  }
  decode(t) {
    return Er(super.decode(t));
  }
}
class ur extends ye {
  coders;
  constructor(t, e) {
    let r = !1;
    const s = [];
    t.forEach((o) => {
      o.dynamic && (r = !0), s.push(o.type);
    });
    const i = "tuple(" + s.join(",") + ")";
    super("tuple", i, e, r), D(this, { coders: Object.freeze(t.slice()) });
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
    const r = st.dereference(e, "tuple");
    return ja(t, this.coders, r);
  }
  decode(t) {
    return Wa(t, this.coders);
  }
}
function We(n) {
  return it(jt(n));
}
var Df = "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";
const so = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), io = 4;
function Ff(n) {
  let t = 0;
  function e() {
    return n[t++] << 8 | n[t++];
  }
  let r = e(), s = 1, i = [0, 1];
  for (let P = 1; P < r; P++)
    i.push(s += e());
  let o = e(), a = t;
  t += o;
  let c = 0, u = 0;
  function f() {
    return c == 0 && (u = u << 8 | n[t++], c = 8), u >> --c & 1;
  }
  const l = 31, d = 2 ** l, y = d >>> 1, m = y >> 1, h = d - 1;
  let p = 0;
  for (let P = 0; P < l; P++) p = p << 1 | f();
  let w = [], x = 0, E = d;
  for (; ; ) {
    let P = Math.floor(((p - x + 1) * s - 1) / E), N = 0, T = r;
    for (; T - N > 1; ) {
      let U = N + T >>> 1;
      P < i[U] ? T = U : N = U;
    }
    if (N == 0) break;
    w.push(N);
    let B = x + Math.floor(E * i[N] / s), M = x + Math.floor(E * i[N + 1] / s) - 1;
    for (; !((B ^ M) & y); )
      p = p << 1 & h | f(), B = B << 1 & h, M = M << 1 & h | 1;
    for (; B & ~M & m; )
      p = p & y | p << 1 & h >>> 1 | f(), B = B << 1 ^ y, M = (M ^ y) << 1 | y | 1;
    x = B, E = 1 + M - B;
  }
  let C = r - 4;
  return w.map((P) => {
    switch (P - C) {
      case 3:
        return C + 65792 + (n[a++] << 16 | n[a++] << 8 | n[a++]);
      case 2:
        return C + 256 + (n[a++] << 8 | n[a++]);
      case 1:
        return C + n[a++];
      default:
        return P - 1;
    }
  });
}
function Mf(n) {
  let t = 0;
  return () => n[t++];
}
function qa(n) {
  return Mf(Ff(_f(n)));
}
function _f(n) {
  let t = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((s, i) => t[s.charCodeAt(0)] = i);
  let e = n.length, r = new Uint8Array(6 * e >> 3);
  for (let s = 0, i = 0, o = 0, a = 0; s < e; s++)
    a = a << 6 | t[n.charCodeAt(s)], o += 6, o >= 8 && (r[i++] = a >> (o -= 8));
  return r;
}
function Hf(n) {
  return n & 1 ? ~n >> 1 : n >> 1;
}
function Gf(n, t) {
  let e = Array(n);
  for (let r = 0, s = 0; r < n; r++) e[r] = s += Hf(t());
  return e;
}
function Vn(n, t = 0) {
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
function Xa(n) {
  return Qn(() => {
    let t = Vn(n);
    if (t.length) return t;
  });
}
function tc(n) {
  let t = [];
  for (; ; ) {
    let e = n();
    if (e == 0) break;
    t.push(Vf(e, n));
  }
  for (; ; ) {
    let e = n() - 1;
    if (e < 0) break;
    t.push(Qf(e, n));
  }
  return t.flat();
}
function Qn(n) {
  let t = [];
  for (; ; ) {
    let e = n(t.length);
    if (!e) break;
    t.push(e);
  }
  return t;
}
function ec(n, t, e) {
  let r = Array(n).fill().map(() => []);
  for (let s = 0; s < t; s++)
    Gf(n, e).forEach((i, o) => r[o].push(i));
  return r;
}
function Vf(n, t) {
  let e = 1 + t(), r = t(), s = Qn(t);
  return ec(s.length, 1 + n, t).flatMap((o, a) => {
    let [c, ...u] = o;
    return Array(s[a]).fill().map((f, l) => {
      let d = l * r;
      return [c + l * e, u.map((y) => y + d)];
    });
  });
}
function Qf(n, t) {
  let e = 1 + t();
  return ec(e, 1 + n, t).map((s) => [s[0], s.slice(1)]);
}
function zf(n) {
  let t = [], e = Vn(n);
  return s(r([]), []), t;
  function r(i) {
    let o = n(), a = Qn(() => {
      let c = Vn(n).map((u) => e[u]);
      if (c.length) return r(c);
    });
    return { S: o, B: a, Q: i };
  }
  function s({ S: i, B: o }, a, c) {
    if (!(i & 4 && c === a[a.length - 1])) {
      i & 2 && (c = a[a.length - 1]), i & 1 && t.push(a);
      for (let u of o)
        for (let f of u.Q)
          s(u, [...a, f], c);
    }
  }
}
function Kf(n) {
  return n.toString(16).toUpperCase().padStart(2, "0");
}
function nc(n) {
  return `{${Kf(n)}}`;
}
function Jf(n) {
  let t = [];
  for (let e = 0, r = n.length; e < r; ) {
    let s = n.codePointAt(e);
    e += s < 65536 ? 1 : 2, t.push(s);
  }
  return t;
}
function In(n) {
  let e = n.length;
  if (e < 4096) return String.fromCodePoint(...n);
  let r = [];
  for (let s = 0; s < e; )
    r.push(String.fromCodePoint(...n.slice(s, s += 4096)));
  return r.join("");
}
function $f(n, t) {
  let e = n.length, r = e - t.length;
  for (let s = 0; r == 0 && s < e; s++) r = n[s] - t[s];
  return r;
}
var Zf = "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";
const zn = 44032, Ir = 4352, Nr = 4449, Br = 4519, rc = 19, sc = 21, Nn = 28, Tr = sc * Nn, jf = rc * Tr, Wf = zn + jf, Yf = Ir + rc, qf = Nr + sc, Xf = Br + Nn;
function Dn(n) {
  return n >> 24 & 255;
}
function ic(n) {
  return n & 16777215;
}
let vs, oo, Ss, yr;
function th() {
  let n = qa(Zf);
  vs = new Map(Xa(n).flatMap((t, e) => t.map((r) => [r, e + 1 << 24]))), oo = new Set(Vn(n)), Ss = /* @__PURE__ */ new Map(), yr = /* @__PURE__ */ new Map();
  for (let [t, e] of tc(n)) {
    if (!oo.has(t) && e.length == 2) {
      let [r, s] = e, i = yr.get(r);
      i || (i = /* @__PURE__ */ new Map(), yr.set(r, i)), i.set(s, t);
    }
    Ss.set(t, e.reverse());
  }
}
function oc(n) {
  return n >= zn && n < Wf;
}
function eh(n, t) {
  if (n >= Ir && n < Yf && t >= Nr && t < qf)
    return zn + (n - Ir) * Tr + (t - Nr) * Nn;
  if (oc(n) && t > Br && t < Xf && (n - zn) % Nn == 0)
    return n + (t - Br);
  {
    let e = yr.get(n);
    return e && (e = e.get(t), e) ? e : -1;
  }
}
function ac(n) {
  vs || th();
  let t = [], e = [], r = !1;
  function s(i) {
    let o = vs.get(i);
    o && (r = !0, i |= o), t.push(i);
  }
  for (let i of n)
    for (; ; ) {
      if (i < 128)
        t.push(i);
      else if (oc(i)) {
        let o = i - zn, a = o / Tr | 0, c = o % Tr / Nn | 0, u = o % Nn;
        s(Ir + a), s(Nr + c), u > 0 && s(Br + u);
      } else {
        let o = Ss.get(i);
        o ? e.push(...o) : s(i);
      }
      if (!e.length) break;
      i = e.pop();
    }
  if (r && t.length > 1) {
    let i = Dn(t[0]);
    for (let o = 1; o < t.length; o++) {
      let a = Dn(t[o]);
      if (a == 0 || i <= a) {
        i = a;
        continue;
      }
      let c = o - 1;
      for (; ; ) {
        let u = t[c + 1];
        if (t[c + 1] = t[c], t[c] = u, !c || (i = Dn(t[--c]), i <= a)) break;
      }
      i = Dn(t[o]);
    }
  }
  return t;
}
function nh(n) {
  let t = [], e = [], r = -1, s = 0;
  for (let i of n) {
    let o = Dn(i), a = ic(i);
    if (r == -1)
      o == 0 ? r = a : t.push(a);
    else if (s > 0 && s >= o)
      o == 0 ? (t.push(r, ...e), e.length = 0, r = a) : e.push(a), s = o;
    else {
      let c = eh(r, a);
      c >= 0 ? r = c : s == 0 && o == 0 ? (t.push(r), r = a) : (e.push(a), s = o);
    }
  }
  return r >= 0 && t.push(r, ...e), t;
}
function cc(n) {
  return ac(n).map(ic);
}
function rh(n) {
  return nh(ac(n));
}
const ao = 45, uc = ".", lc = 65039, fc = 1, Pr = (n) => Array.from(n);
function Kn(n, t) {
  return n.P.has(t) || n.Q.has(t);
}
class sh extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let Rs, hc, _e, ks, dc, gn, ns, cn, ke, co, Us;
function ii() {
  if (Rs) return;
  let n = qa(Df);
  const t = () => Vn(n), e = () => new Set(t()), r = (f, l) => l.forEach((d) => f.add(d));
  Rs = new Map(tc(n)), hc = e(), _e = t(), ks = new Set(t().map((f) => _e[f])), _e = new Set(_e), dc = e(), e();
  let s = Xa(n), i = n();
  const o = () => {
    let f = /* @__PURE__ */ new Set();
    return t().forEach((l) => r(f, s[l])), r(f, t()), f;
  };
  gn = Qn((f) => {
    let l = Qn(n).map((d) => d + 96);
    if (l.length) {
      let d = f >= i;
      l[0] -= 32, l = In(l), d && (l = `Restricted[${l}]`);
      let y = o(), m = o(), h = !n();
      return { N: l, P: y, Q: m, M: h, R: d };
    }
  }), ns = e(), cn = /* @__PURE__ */ new Map();
  let a = t().concat(Pr(ns)).sort((f, l) => f - l);
  a.forEach((f, l) => {
    let d = n(), y = a[l] = d ? a[l - d] : { V: [], M: /* @__PURE__ */ new Map() };
    y.V.push(f), ns.has(f) || cn.set(f, y);
  });
  for (let { V: f, M: l } of new Set(cn.values())) {
    let d = [];
    for (let m of f) {
      let h = gn.filter((w) => Kn(w, m)), p = d.find(({ G: w }) => h.some((x) => w.has(x)));
      p || (p = { G: /* @__PURE__ */ new Set(), V: [] }, d.push(p)), p.V.push(m), r(p.G, h);
    }
    let y = d.flatMap((m) => Pr(m.G));
    for (let { G: m, V: h } of d) {
      let p = new Set(y.filter((w) => !m.has(w)));
      for (let w of h)
        l.set(w, p);
    }
  }
  ke = /* @__PURE__ */ new Set();
  let c = /* @__PURE__ */ new Set();
  const u = (f) => ke.has(f) ? c.add(f) : ke.add(f);
  for (let f of gn) {
    for (let l of f.P) u(l);
    for (let l of f.Q) u(l);
  }
  for (let f of ke)
    !cn.has(f) && !c.has(f) && cn.set(f, fc);
  r(ke, cc(ke)), co = zf(n).map((f) => sh.from(f)).sort($f), Us = /* @__PURE__ */ new Map();
  for (let f of co) {
    let l = [Us];
    for (let d of f) {
      let y = l.map((m) => {
        let h = m.get(d);
        return h || (h = /* @__PURE__ */ new Map(), m.set(d, h)), h;
      });
      d === lc ? l.push(...y) : l = y;
    }
    for (let d of l)
      d.V = f;
  }
}
function oi(n) {
  return (gc(n) ? "" : `${ai(Mr([n]))} `) + nc(n);
}
function ai(n) {
  return `"${n}"‎`;
}
function ih(n) {
  if (n.length >= 4 && n[2] == ao && n[3] == ao)
    throw new Error(`invalid label extension: "${In(n.slice(0, 4))}"`);
}
function oh(n) {
  for (let e = n.lastIndexOf(95); e > 0; )
    if (n[--e] !== 95)
      throw new Error("underscore allowed only at start");
}
function ah(n) {
  let t = n[0], e = so.get(t);
  if (e) throw Mn(`leading ${e}`);
  let r = n.length, s = -1;
  for (let i = 1; i < r; i++) {
    t = n[i];
    let o = so.get(t);
    if (o) {
      if (s == i) throw Mn(`${e} + ${o}`);
      s = i + 1, e = o;
    }
  }
  if (s == r) throw Mn(`trailing ${e}`);
}
function Mr(n, t = 1 / 0, e = nc) {
  let r = [];
  ch(n[0]) && r.push("◌"), n.length > t && (t >>= 1, n = [...n.slice(0, t), 8230, ...n.slice(-t)]);
  let s = 0, i = n.length;
  for (let o = 0; o < i; o++) {
    let a = n[o];
    gc(a) && (r.push(In(n.slice(s, o))), r.push(e(a)), s = o + 1);
  }
  return r.push(In(n.slice(s, i))), r.join("");
}
function ch(n) {
  return ii(), _e.has(n);
}
function gc(n) {
  return ii(), dc.has(n);
}
function uh(n) {
  return dh(lh(n, rh, yh));
}
function lh(n, t, e) {
  if (!n) return [];
  ii();
  let r = 0;
  return n.split(uc).map((s) => {
    let i = Jf(s), o = {
      input: i,
      offset: r
      // codepoint, not substring!
    };
    r += i.length + 1;
    try {
      let a = o.tokens = ph(i, t, e), c = a.length, u;
      if (!c)
        throw new Error("empty label");
      let f = o.output = a.flat();
      if (oh(f), !(o.emoji = c > 1 || a[0].is_emoji) && f.every((d) => d < 128))
        ih(f), u = "ASCII";
      else {
        let d = a.flatMap((y) => y.is_emoji ? [] : y);
        if (!d.length)
          u = "Emoji";
        else {
          if (_e.has(f[0])) throw Mn("leading combining mark");
          for (let h = 1; h < c; h++) {
            let p = a[h];
            if (!p.is_emoji && _e.has(p[0]))
              throw Mn(`emoji + combining mark: "${In(a[h - 1])} + ${Mr([p[0]])}"`);
          }
          ah(f);
          let y = Pr(new Set(d)), [m] = hh(y);
          gh(m, d), fh(m, y), u = m.N;
        }
      }
      o.type = u;
    } catch (a) {
      o.error = a;
    }
    return o;
  });
}
function fh(n, t) {
  let e, r = [];
  for (let s of t) {
    let i = cn.get(s);
    if (i === fc) return;
    if (i) {
      let o = i.M.get(s);
      if (e = e ? e.filter((a) => o.has(a)) : Pr(o), !e.length) return;
    } else
      r.push(s);
  }
  if (e) {
    for (let s of e)
      if (r.every((i) => Kn(s, i)))
        throw new Error(`whole-script confusable: ${n.N}/${s.N}`);
  }
}
function hh(n) {
  let t = gn;
  for (let e of n) {
    let r = t.filter((s) => Kn(s, e));
    if (!r.length)
      throw gn.some((s) => Kn(s, e)) ? yc(t[0], e) : pc(e);
    if (t = r, r.length == 1) break;
  }
  return t;
}
function dh(n) {
  return n.map(({ input: t, error: e, output: r }) => {
    if (e) {
      let s = e.message;
      throw new Error(n.length == 1 ? s : `Invalid label ${ai(Mr(t, 63))}: ${s}`);
    }
    return In(r);
  }).join(uc);
}
function pc(n) {
  return new Error(`disallowed character: ${oi(n)}`);
}
function yc(n, t) {
  let e = oi(t), r = gn.find((s) => s.P.has(t));
  return r && (e = `${r.N} ${e}`), new Error(`illegal mixture: ${n.N} + ${e}`);
}
function Mn(n) {
  return new Error(`illegal placement: ${n}`);
}
function gh(n, t) {
  for (let e of t)
    if (!Kn(n, e))
      throw yc(n, e);
  if (n.M) {
    let e = cc(t);
    for (let r = 1, s = e.length; r < s; r++)
      if (ks.has(e[r])) {
        let i = r + 1;
        for (let o; i < s && ks.has(o = e[i]); i++)
          for (let a = r; a < i; a++)
            if (e[a] == o)
              throw new Error(`duplicate non-spacing marks: ${oi(o)}`);
        if (i - r > io)
          throw new Error(`excessive non-spacing marks: ${ai(Mr(e.slice(r - 1, i)))} (${i - r}/${io})`);
        r = i;
      }
  }
}
function ph(n, t, e) {
  let r = [], s = [];
  for (n = n.slice().reverse(); n.length; ) {
    let i = wh(n);
    if (i)
      s.length && (r.push(t(s)), s = []), r.push(e(i));
    else {
      let o = n.pop();
      if (ke.has(o))
        s.push(o);
      else {
        let a = Rs.get(o);
        if (a)
          s.push(...a);
        else if (!hc.has(o))
          throw pc(o);
      }
    }
  }
  return s.length && r.push(t(s)), r;
}
function yh(n) {
  return n.filter((t) => t != lc);
}
function wh(n, t) {
  let e = Us, r, s = n.length;
  for (; s && (e = e.get(n[--s]), !!e); ) {
    let { V: i } = e;
    i && (r = i, n.length = s);
  }
  return r;
}
const wc = new Uint8Array(32);
wc.fill(0);
function uo(n) {
  return g(n.length !== 0, "invalid ENS name; empty component", "comp", n), n;
}
function mc(n) {
  const t = jt(mh(n)), e = [];
  if (n.length === 0)
    return e;
  let r = 0;
  for (let s = 0; s < t.length; s++)
    t[s] === 46 && (e.push(uo(t.slice(r, s))), r = s + 1);
  return g(r < t.length, "invalid ENS name; empty component", "name", n), e.push(uo(t.slice(r))), e;
}
function mh(n) {
  try {
    if (n.length === 0)
      throw new Error("empty label");
    return uh(n);
  } catch (t) {
    g(!1, `invalid ENS name (${t.message})`, "name", n);
  }
}
function Ls(n) {
  g(typeof n == "string", "invalid ENS name; not a string", "name", n), g(n.length, "invalid ENS name (empty label)", "name", n);
  let t = wc;
  const e = mc(n);
  for (; e.length; )
    t = it(et([t, it(e.pop())]));
  return S(t);
}
function Ah(n, t) {
  const e = t;
  return g(e <= 255, "DNS encoded label cannot exceed 255", "length", e), S(et(mc(n).map((r) => {
    g(r.length <= e, `label ${JSON.stringify(n)} exceeds ${e} bytes`, "name", n);
    const s = new Uint8Array(r.length + 1);
    return s.set(r, 1), s[0] = s.length - 1, s;
  }))) + "00";
}
function rs(n, t) {
  return {
    address: Z(n),
    storageKeys: t.map((e, r) => (g(q(e, 32), "invalid slot", `storageKeys[${r}]`, e), e.toLowerCase()))
  };
}
function nn(n) {
  if (Array.isArray(n))
    return n.map((e, r) => Array.isArray(e) ? (g(e.length === 2, "invalid slot set", `value[${r}]`, e), rs(e[0], e[1])) : (g(e != null && typeof e == "object", "invalid address-slot set", "value", n), rs(e.address, e.storageKeys)));
  g(n != null && typeof n == "object", "invalid access list", "value", n);
  const t = Object.keys(n).map((e) => {
    const r = n[e].reduce((s, i) => (s[i] = !0, s), {});
    return rs(e, Object.keys(r).sort());
  });
  return t.sort((e, r) => e.address.localeCompare(r.address)), t;
}
function bh(n) {
  let t;
  return typeof n == "string" ? t = le.computePublicKey(n, !1) : t = n.publicKey, Z(it("0x" + t.substring(4)).substring(26));
}
function Ac(n, t) {
  return bh(le.recoverPublicKey(n, t));
}
const pt = BigInt(0), Eh = BigInt(2), xh = BigInt(27), Ih = BigInt(28), Nh = BigInt(35), Bh = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), ss = 4096 * 32;
function lo(n, t) {
  let e = n.toString(16);
  for (; e.length < 2; )
    e = "0" + e;
  return e += Pe(t).substring(4), "0x" + e;
}
function _r(n) {
  return n === "0x" ? null : Z(n);
}
function ci(n, t) {
  try {
    return nn(n);
  } catch (e) {
    g(!1, e.message, t, n);
  }
}
function Wn(n, t) {
  return n === "0x" ? 0 : G(n, t);
}
function ut(n, t) {
  if (n === "0x")
    return pt;
  const e = k(n, t);
  return g(e <= Bh, "value exceeds uint size", t, e), e;
}
function X(n, t) {
  const e = k(n, "value"), r = gt(e);
  return g(r.length <= 32, "value too large", `tx.${t}`, e), r;
}
function ui(n) {
  return nn(n).map((t) => [t.address, t.storageKeys]);
}
function Th(n, t) {
  g(Array.isArray(n), `invalid ${t}`, "value", n);
  for (let e = 0; e < n.length; e++)
    g(q(n[e], 32), "invalid ${ param } hash", `value[${e}]`, n[e]);
  return n;
}
function Ph(n) {
  const t = Ur(n);
  g(Array.isArray(t) && (t.length === 9 || t.length === 6), "invalid field count for legacy transaction", "data", n);
  const e = {
    type: 0,
    nonce: Wn(t[0], "nonce"),
    gasPrice: ut(t[1], "gasPrice"),
    gasLimit: ut(t[2], "gasLimit"),
    to: _r(t[3]),
    value: ut(t[4], "value"),
    data: S(t[5]),
    chainId: pt
  };
  if (t.length === 6)
    return e;
  const r = ut(t[6], "v"), s = ut(t[7], "r"), i = ut(t[8], "s");
  if (s === pt && i === pt)
    e.chainId = r;
  else {
    let o = (r - Nh) / Eh;
    o < pt && (o = pt), e.chainId = o, g(o !== pt || r === xh || r === Ih, "non-canonical legacy v", "v", t[6]), e.signature = ht.from({
      r: ne(t[7], 32),
      s: ne(t[8], 32),
      v: r
    });
  }
  return e;
}
function Oh(n, t) {
  const e = [
    X(n.nonce, "nonce"),
    X(n.gasPrice || 0, "gasPrice"),
    X(n.gasLimit, "gasLimit"),
    n.to || "0x",
    X(n.value, "value"),
    n.data
  ];
  let r = pt;
  if (n.chainId != pt)
    r = k(n.chainId, "tx.chainId"), g(!t || t.networkV == null || t.legacyChainId === r, "tx.chainId/sig.v mismatch", "sig", t);
  else if (n.signature) {
    const i = n.signature.legacyChainId;
    i != null && (r = i);
  }
  if (!t)
    return r !== pt && (e.push(gt(r)), e.push("0x"), e.push("0x")), je(e);
  let s = BigInt(27 + t.yParity);
  return r !== pt ? s = ht.getChainIdV(r, t.v) : BigInt(t.v) !== s && g(!1, "tx.chainId/sig.v mismatch", "sig", t), e.push(gt(s)), e.push(gt(t.r)), e.push(gt(t.s)), je(e);
}
function li(n, t) {
  let e;
  try {
    if (e = Wn(t[0], "yParity"), e !== 0 && e !== 1)
      throw new Error("bad yParity");
  } catch {
    g(!1, "invalid yParity", "yParity", t[0]);
  }
  const r = ne(t[1], 32), s = ne(t[2], 32), i = ht.from({ r, s, yParity: e });
  n.signature = i;
}
function Ch(n) {
  const t = Ur(_(n).slice(1));
  g(Array.isArray(t) && (t.length === 9 || t.length === 12), "invalid field count for transaction type: 2", "data", S(n));
  const e = {
    type: 2,
    chainId: ut(t[0], "chainId"),
    nonce: Wn(t[1], "nonce"),
    maxPriorityFeePerGas: ut(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: ut(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: ut(t[4], "gasLimit"),
    to: _r(t[5]),
    value: ut(t[6], "value"),
    data: S(t[7]),
    accessList: ci(t[8], "accessList")
  };
  return t.length === 9 || li(e, t.slice(9)), e;
}
function vh(n, t) {
  const e = [
    X(n.chainId, "chainId"),
    X(n.nonce, "nonce"),
    X(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    X(n.maxFeePerGas || 0, "maxFeePerGas"),
    X(n.gasLimit, "gasLimit"),
    n.to || "0x",
    X(n.value, "value"),
    n.data,
    ui(n.accessList || [])
  ];
  return t && (e.push(X(t.yParity, "yParity")), e.push(gt(t.r)), e.push(gt(t.s))), et(["0x02", je(e)]);
}
function Sh(n) {
  const t = Ur(_(n).slice(1));
  g(Array.isArray(t) && (t.length === 8 || t.length === 11), "invalid field count for transaction type: 1", "data", S(n));
  const e = {
    type: 1,
    chainId: ut(t[0], "chainId"),
    nonce: Wn(t[1], "nonce"),
    gasPrice: ut(t[2], "gasPrice"),
    gasLimit: ut(t[3], "gasLimit"),
    to: _r(t[4]),
    value: ut(t[5], "value"),
    data: S(t[6]),
    accessList: ci(t[7], "accessList")
  };
  return t.length === 8 || li(e, t.slice(8)), e;
}
function Rh(n, t) {
  const e = [
    X(n.chainId, "chainId"),
    X(n.nonce, "nonce"),
    X(n.gasPrice || 0, "gasPrice"),
    X(n.gasLimit, "gasLimit"),
    n.to || "0x",
    X(n.value, "value"),
    n.data,
    ui(n.accessList || [])
  ];
  return t && (e.push(X(t.yParity, "recoveryParam")), e.push(gt(t.r)), e.push(gt(t.s))), et(["0x01", je(e)]);
}
function kh(n) {
  let t = Ur(_(n).slice(1)), e = "3", r = null;
  if (t.length === 4 && Array.isArray(t[0])) {
    e = "3 (network format)";
    const i = t[1], o = t[2], a = t[3];
    g(Array.isArray(i), "invalid network format: blobs not an array", "fields[1]", i), g(Array.isArray(o), "invalid network format: commitments not an array", "fields[2]", o), g(Array.isArray(a), "invalid network format: proofs not an array", "fields[3]", a), g(i.length === o.length, "invalid network format: blobs/commitments length mismatch", "fields", t), g(i.length === a.length, "invalid network format: blobs/proofs length mismatch", "fields", t), r = [];
    for (let c = 0; c < t[1].length; c++)
      r.push({
        data: i[c],
        commitment: o[c],
        proof: a[c]
      });
    t = t[0];
  }
  g(Array.isArray(t) && (t.length === 11 || t.length === 14), `invalid field count for transaction type: ${e}`, "data", S(n));
  const s = {
    type: 3,
    chainId: ut(t[0], "chainId"),
    nonce: Wn(t[1], "nonce"),
    maxPriorityFeePerGas: ut(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: ut(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: ut(t[4], "gasLimit"),
    to: _r(t[5]),
    value: ut(t[6], "value"),
    data: S(t[7]),
    accessList: ci(t[8], "accessList"),
    maxFeePerBlobGas: ut(t[9], "maxFeePerBlobGas"),
    blobVersionedHashes: t[10]
  };
  r && (s.blobs = r), g(s.to != null, `invalid address for transaction type: ${e}`, "data", n), g(Array.isArray(s.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", n);
  for (let i = 0; i < s.blobVersionedHashes.length; i++)
    g(q(s.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", n);
  return t.length === 11 || li(s, t.slice(11)), s;
}
function Uh(n, t, e) {
  const r = [
    X(n.chainId, "chainId"),
    X(n.nonce, "nonce"),
    X(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    X(n.maxFeePerGas || 0, "maxFeePerGas"),
    X(n.gasLimit, "gasLimit"),
    n.to || xn,
    X(n.value, "value"),
    n.data,
    ui(n.accessList || []),
    X(n.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
    Th(n.blobVersionedHashes || [], "blobVersionedHashes")
  ];
  return t && (r.push(X(t.yParity, "yParity")), r.push(gt(t.r)), r.push(gt(t.s)), e) ? et([
    "0x03",
    je([
      r,
      e.map((s) => s.data),
      e.map((s) => s.commitment),
      e.map((s) => s.proof)
    ])
  ]) : et(["0x03", je(r)]);
}
class Xt {
  #t;
  #e;
  #n;
  #r;
  #s;
  #o;
  #i;
  #a;
  #f;
  #u;
  #g;
  #p;
  #c;
  #l;
  #h;
  #d;
  /**
   *  The transaction type.
   *
   *  If null, the type will be automatically inferred based on
   *  explicit properties.
   */
  get type() {
    return this.#t;
  }
  set type(t) {
    switch (t) {
      case null:
        this.#t = null;
        break;
      case 0:
      case "legacy":
        this.#t = 0;
        break;
      case 1:
      case "berlin":
      case "eip-2930":
        this.#t = 1;
        break;
      case 2:
      case "london":
      case "eip-1559":
        this.#t = 2;
        break;
      case 3:
      case "cancun":
      case "eip-4844":
        this.#t = 3;
        break;
      default:
        g(!1, "unsupported transaction type", "type", t);
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
    const t = this.#e;
    return t == null && this.type === 3 ? xn : t;
  }
  set to(t) {
    this.#e = t == null ? null : Z(t);
  }
  /**
   *  The transaction nonce.
   */
  get nonce() {
    return this.#r;
  }
  set nonce(t) {
    this.#r = G(t, "value");
  }
  /**
   *  The gas limit.
   */
  get gasLimit() {
    return this.#s;
  }
  set gasLimit(t) {
    this.#s = k(t);
  }
  /**
   *  The gas price.
   *
   *  On legacy networks this defines the fee that will be paid. On
   *  EIP-1559 networks, this should be ``null``.
   */
  get gasPrice() {
    const t = this.#o;
    return t == null && (this.type === 0 || this.type === 1) ? pt : t;
  }
  set gasPrice(t) {
    this.#o = t == null ? null : k(t, "gasPrice");
  }
  /**
   *  The maximum priority fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxPriorityFeePerGas() {
    const t = this.#i;
    return t ?? (this.type === 2 || this.type === 3 ? pt : null);
  }
  set maxPriorityFeePerGas(t) {
    this.#i = t == null ? null : k(t, "maxPriorityFeePerGas");
  }
  /**
   *  The maximum total fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxFeePerGas() {
    const t = this.#a;
    return t ?? (this.type === 2 || this.type === 3 ? pt : null);
  }
  set maxFeePerGas(t) {
    this.#a = t == null ? null : k(t, "maxFeePerGas");
  }
  /**
   *  The transaction data. For ``init`` transactions this is the
   *  deployment code.
   */
  get data() {
    return this.#n;
  }
  set data(t) {
    this.#n = S(t);
  }
  /**
   *  The amount of ether (in wei) to send in this transactions.
   */
  get value() {
    return this.#f;
  }
  set value(t) {
    this.#f = k(t, "value");
  }
  /**
   *  The chain ID this transaction is valid on.
   */
  get chainId() {
    return this.#u;
  }
  set chainId(t) {
    this.#u = k(t);
  }
  /**
   *  If signed, the signature for this transaction.
   */
  get signature() {
    return this.#g || null;
  }
  set signature(t) {
    this.#g = t == null ? null : ht.from(t);
  }
  /**
   *  The access list.
   *
   *  An access list permits discounted (but pre-paid) access to
   *  bytecode and state variable access within contract execution.
   */
  get accessList() {
    const t = this.#p || null;
    return t ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(t) {
    this.#p = t == null ? null : nn(t);
  }
  /**
   *  The max fee per blob gas for Cancun transactions.
   */
  get maxFeePerBlobGas() {
    const t = this.#c;
    return t == null && this.type === 3 ? pt : t;
  }
  set maxFeePerBlobGas(t) {
    this.#c = t == null ? null : k(t, "maxFeePerBlobGas");
  }
  /**
   *  The BLOb versioned hashes for Cancun transactions.
   */
  get blobVersionedHashes() {
    let t = this.#l;
    return t == null && this.type === 3 ? [] : t;
  }
  set blobVersionedHashes(t) {
    if (t != null) {
      g(Array.isArray(t), "blobVersionedHashes must be an Array", "value", t), t = t.slice();
      for (let e = 0; e < t.length; e++)
        g(q(t[e], 32), "invalid blobVersionedHash", `value[${e}]`, t[e]);
    }
    this.#l = t;
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
    return this.#d == null ? null : this.#d.map((t) => Object.assign({}, t));
  }
  set blobs(t) {
    if (t == null) {
      this.#d = null;
      return;
    }
    const e = [], r = [];
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if ($s(i)) {
        I(this.#h, "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
          operation: "set blobs()"
        });
        let o = _(i);
        if (g(o.length <= ss, "blob is too large", `blobs[${s}]`, i), o.length !== ss) {
          const u = new Uint8Array(ss);
          u.set(o), o = u;
        }
        const a = this.#h.blobToKzgCommitment(o), c = S(this.#h.computeBlobKzgProof(o, a));
        e.push({
          data: S(o),
          commitment: S(a),
          proof: c
        }), r.push(lo(1, a));
      } else {
        const o = S(i.commitment);
        e.push({
          data: S(i.data),
          commitment: o,
          proof: S(i.proof)
        }), r.push(lo(1, o));
      }
    }
    this.#d = e, this.#l = r;
  }
  get kzg() {
    return this.#h;
  }
  set kzg(t) {
    this.#h = t;
  }
  /**
   *  Creates a new Transaction with default values.
   */
  constructor() {
    this.#t = null, this.#e = null, this.#r = 0, this.#s = pt, this.#o = null, this.#i = null, this.#a = null, this.#n = "0x", this.#f = pt, this.#u = pt, this.#g = null, this.#p = null, this.#c = null, this.#l = null, this.#d = null, this.#h = null;
  }
  /**
   *  The transaction hash, if signed. Otherwise, ``null``.
   */
  get hash() {
    return this.signature == null ? null : it(this.#y(!0, !1));
  }
  /**
   *  The pre-image hash of this transaction.
   *
   *  This is the digest that a [[Signer]] must sign to authorize
   *  this transaction.
   */
  get unsignedHash() {
    return it(this.unsignedSerialized);
  }
  /**
   *  The sending address, if signed. Otherwise, ``null``.
   */
  get from() {
    return this.signature == null ? null : Ac(this.unsignedHash, this.signature);
  }
  /**
   *  The public key of the sender, if signed. Otherwise, ``null``.
   */
  get fromPublicKey() {
    return this.signature == null ? null : le.recoverPublicKey(this.unsignedHash, this.signature);
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
  #y(t, e) {
    I(!t || this.signature != null, "cannot serialize unsigned transaction; maybe you meant .unsignedSerialized", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
    const r = t ? this.signature : null;
    switch (this.inferType()) {
      case 0:
        return Oh(this, r);
      case 1:
        return Rh(this, r);
      case 2:
        return vh(this, r);
      case 3:
        return Uh(this, r, e ? this.blobs : null);
    }
    I(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: ".serialized" });
  }
  /**
   *  The serialized transaction.
   *
   *  This throws if the transaction is unsigned. For the pre-image,
   *  use [[unsignedSerialized]].
   */
  get serialized() {
    return this.#y(!0, !0);
  }
  /**
   *  The transaction pre-image.
   *
   *  The hash of this is the digest which needs to be signed to
   *  authorize this transaction.
   */
  get unsignedSerialized() {
    return this.#y(!1, !1);
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
    const t = this.gasPrice != null, e = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, r = this.accessList != null, s = this.#c != null || this.#l;
    this.maxFeePerGas != null && this.maxPriorityFeePerGas != null && I(this.maxFeePerGas >= this.maxPriorityFeePerGas, "priorityFee cannot be more than maxFee", "BAD_DATA", { value: this }), I(!e || this.type !== 0 && this.type !== 1, "transaction type cannot have maxFeePerGas or maxPriorityFeePerGas", "BAD_DATA", { value: this }), I(this.type !== 0 || !r, "legacy transaction cannot have accessList", "BAD_DATA", { value: this });
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
    return Xt.from(this);
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
      return new Xt();
    if (typeof t == "string") {
      const r = _(t);
      if (r[0] >= 127)
        return Xt.from(Ph(r));
      switch (r[0]) {
        case 1:
          return Xt.from(Sh(r));
        case 2:
          return Xt.from(Ch(r));
        case 3:
          return Xt.from(kh(r));
      }
      I(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const e = new Xt();
    return t.type != null && (e.type = t.type), t.to != null && (e.to = t.to), t.nonce != null && (e.nonce = t.nonce), t.gasLimit != null && (e.gasLimit = t.gasLimit), t.gasPrice != null && (e.gasPrice = t.gasPrice), t.maxPriorityFeePerGas != null && (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas), t.maxFeePerGas != null && (e.maxFeePerGas = t.maxFeePerGas), t.maxFeePerBlobGas != null && (e.maxFeePerBlobGas = t.maxFeePerBlobGas), t.data != null && (e.data = t.data), t.value != null && (e.value = t.value), t.chainId != null && (e.chainId = t.chainId), t.signature != null && (e.signature = ht.from(t.signature)), t.accessList != null && (e.accessList = t.accessList), t.blobVersionedHashes != null && (e.blobVersionedHashes = t.blobVersionedHashes), t.kzg != null && (e.kzg = t.kzg), t.blobs != null && (e.blobs = t.blobs), t.hash != null && (g(e.isSigned(), "unsigned transaction cannot define '.hash'", "tx", t), g(e.hash === t.hash, "hash mismatch", "tx", t)), t.from != null && (g(e.isSigned(), "unsigned transaction cannot define '.from'", "tx", t), g(e.from.toLowerCase() === (t.from || "").toLowerCase(), "from mismatch", "tx", t)), e;
  }
}
const Lh = new RegExp("^bytes([0-9]+)$"), Dh = new RegExp("^(u?int)([0-9]*)$"), Fh = new RegExp("^(.*)\\[([0-9]*)\\]$");
function bc(n, t, e) {
  switch (n) {
    case "address":
      return _(e ? ne(t, 32) : Z(t));
    case "string":
      return jt(t);
    case "bytes":
      return _(t);
    case "bool":
      return t = t ? "0x01" : "0x00", _(e ? ne(t, 32) : t);
  }
  let r = n.match(Dh);
  if (r) {
    let s = r[1] === "int", i = parseInt(r[2] || "256");
    return g((!r[2] || r[2] === String(i)) && i % 8 === 0 && i !== 0 && i <= 256, "invalid number type", "type", n), e && (i = 256), s && (t = js(t, i)), _(ne(gt(t), i / 8));
  }
  if (r = n.match(Lh), r) {
    const s = parseInt(r[1]);
    return g(String(s) === r[1] && s !== 0 && s <= 32, "invalid bytes type", "type", n), g(Ve(t) === s, `invalid value for ${n}`, "value", t), e ? _(Zs(t, 32)) : t;
  }
  if (r = n.match(Fh), r && Array.isArray(t)) {
    const s = r[1], i = parseInt(r[2] || String(t.length));
    g(i === t.length, `invalid array length for ${n}`, "value", t);
    const o = [];
    return t.forEach(function(a) {
      o.push(bc(s, a, !0));
    }), _(et(o));
  }
  g(!1, "invalid type", "type", n);
}
function Mh(n, t) {
  g(n.length === t.length, "wrong number of values; expected ${ types.length }", "values", t);
  const e = [];
  return n.forEach(function(r, s) {
    e.push(bc(r, t[s]));
  }), S(et(e));
}
function _h(n, t) {
  return it(Mh(n, t));
}
const Ec = new Uint8Array(32);
Ec.fill(0);
const Hh = BigInt(-1), xc = BigInt(0), Ic = BigInt(1), Gh = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function Vh(n) {
  const t = _(n), e = t.length % 32;
  return e ? et([t, Ec.slice(e)]) : S(t);
}
const Qh = Te(Ic, 32), zh = Te(xc, 32), fo = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, is = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function ho(n) {
  return function(t) {
    return g(typeof t == "string", `invalid domain value for ${JSON.stringify(n)}`, `domain.${n}`, t), t;
  };
}
const Kh = {
  name: ho("name"),
  version: ho("version"),
  chainId: function(n) {
    const t = k(n, "domain.chainId");
    return g(t >= 0, "invalid chain ID", "domain.chainId", n), Number.isSafeInteger(t) ? Number(t) : fn(t);
  },
  verifyingContract: function(n) {
    try {
      return Z(n).toLowerCase();
    } catch {
    }
    g(!1, 'invalid domain value "verifyingContract"', "domain.verifyingContract", n);
  },
  salt: function(n) {
    const t = _(n, "domain.salt");
    return g(t.length === 32, 'invalid domain value "salt"', "domain.salt", n), S(t);
  }
};
function os(n) {
  {
    const t = n.match(/^(u?)int(\d+)$/);
    if (t) {
      const e = t[1] === "", r = parseInt(t[2]);
      g(r % 8 === 0 && r !== 0 && r <= 256 && t[2] === String(r), "invalid numeric width", "type", n);
      const s = Fe(Gh, e ? r - 1 : r), i = e ? (s + Ic) * Hh : xc;
      return function(o) {
        const a = k(o, "value");
        return g(a >= i && a <= s, `value out-of-bounds for ${n}`, "value", a), Te(e ? js(a, 256) : a, 32);
      };
    }
  }
  {
    const t = n.match(/^bytes(\d+)$/);
    if (t) {
      const e = parseInt(t[1]);
      return g(e !== 0 && e <= 32 && t[1] === String(e), "invalid bytes width", "type", n), function(r) {
        const s = _(r);
        return g(s.length === e, `invalid length for ${n}`, "value", r), Vh(r);
      };
    }
  }
  switch (n) {
    case "address":
      return function(t) {
        return ne(Z(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? Qh : zh;
      };
    case "bytes":
      return function(t) {
        return it(t);
      };
    case "string":
      return function(t) {
        return We(t);
      };
  }
  return null;
}
function go(n, t) {
  return `${n}(${t.map(({ name: e, type: r }) => r + " " + e).join(",")})`;
}
function lr(n) {
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
class Lt {
  /**
   *  The primary type for the structured [[types]].
   *
   *  This is derived automatically from the [[types]], since no
   *  recursion is possible, once the DAG for the types is consturcted
   *  internally, the primary type must be the only remaining type with
   *  no parent nodes.
   */
  primaryType;
  #t;
  /**
   *  The types.
   */
  get types() {
    return JSON.parse(this.#t);
  }
  #e;
  #n;
  /**
   *  Create a new **TypedDataEncoder** for %%types%%.
   *
   *  This performs all necessary checking that types are valid and
   *  do not violate the [[link-eip-712]] structural constraints as
   *  well as computes the [[primaryType]].
   */
  constructor(t) {
    this.#e = /* @__PURE__ */ new Map(), this.#n = /* @__PURE__ */ new Map();
    const e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = {};
    Object.keys(t).forEach((c) => {
      i[c] = t[c].map(({ name: u, type: f }) => {
        let { base: l, index: d } = lr(f);
        return l === "int" && !t.int && (l = "int256"), l === "uint" && !t.uint && (l = "uint256"), { name: u, type: l + (d || "") };
      }), e.set(c, /* @__PURE__ */ new Set()), r.set(c, []), s.set(c, /* @__PURE__ */ new Set());
    }), this.#t = JSON.stringify(i);
    for (const c in i) {
      const u = /* @__PURE__ */ new Set();
      for (const f of i[c]) {
        g(!u.has(f.name), `duplicate variable name ${JSON.stringify(f.name)} in ${JSON.stringify(c)}`, "types", t), u.add(f.name);
        const l = lr(f.type).base;
        g(l !== c, `circular type reference to ${JSON.stringify(l)}`, "types", t), !os(l) && (g(r.has(l), `unknown type ${JSON.stringify(l)}`, "types", t), r.get(l).push(c), e.get(c).add(l));
      }
    }
    const o = Array.from(r.keys()).filter((c) => r.get(c).length === 0);
    g(o.length !== 0, "missing primary type", "types", t), g(o.length === 1, `ambiguous primary types or unused types: ${o.map((c) => JSON.stringify(c)).join(", ")}`, "types", t), D(this, { primaryType: o[0] });
    function a(c, u) {
      g(!u.has(c), `circular type reference to ${JSON.stringify(c)}`, "types", t), u.add(c);
      for (const f of e.get(c))
        if (r.has(f)) {
          a(f, u);
          for (const l of u)
            s.get(l).add(f);
        }
      u.delete(c);
    }
    a(this.primaryType, /* @__PURE__ */ new Set());
    for (const [c, u] of s) {
      const f = Array.from(u);
      f.sort(), this.#e.set(c, go(c, i[c]) + f.map((l) => go(l, i[l])).join(""));
    }
  }
  /**
   *  Returnthe encoder for the specific %%type%%.
   */
  getEncoder(t) {
    let e = this.#n.get(t);
    return e || (e = this.#r(t), this.#n.set(t, e)), e;
  }
  #r(t) {
    {
      const s = os(t);
      if (s)
        return s;
    }
    const e = lr(t).array;
    if (e) {
      const s = e.prefix, i = this.getEncoder(s);
      return (o) => {
        g(e.count === -1 || e.count === o.length, `array length mismatch; expected length ${e.count}`, "value", o);
        let a = o.map(i);
        return this.#e.has(s) && (a = a.map(it)), it(et(a));
      };
    }
    const r = this.types[t];
    if (r) {
      const s = We(this.#e.get(t));
      return (i) => {
        const o = r.map(({ name: a, type: c }) => {
          const u = this.getEncoder(c)(i[a]);
          return this.#e.has(c) ? it(u) : u;
        });
        return o.unshift(s), et(o);
      };
    }
    g(!1, `unknown type: ${t}`, "type", t);
  }
  /**
   *  Return the full type for %%name%%.
   */
  encodeType(t) {
    const e = this.#e.get(t);
    return g(e, `unknown type: ${JSON.stringify(t)}`, "name", t), e;
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
    return it(this.encodeData(t, e));
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
    if (os(t))
      return r(t, e);
    const s = lr(t).array;
    if (s)
      return g(s.count === -1 || s.count === e.length, `array length mismatch; expected length ${s.count}`, "value", e), e.map((o) => this._visit(s.prefix, o, r));
    const i = this.types[t];
    if (i)
      return i.reduce((o, { name: a, type: c }) => (o[a] = this._visit(c, e[a], r), o), {});
    g(!1, `unknown type: ${t}`, "type", t);
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
    return new Lt(t);
  }
  /**
   *  Return the primary type for %%types%%.
   */
  static getPrimaryType(t) {
    return Lt.from(t).primaryType;
  }
  /**
   *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
   */
  static hashStruct(t, e, r) {
    return Lt.from(e).hashStruct(t, r);
  }
  /**
   *  Return the domain hash for %%domain%%.
   */
  static hashDomain(t) {
    const e = [];
    for (const r in t) {
      if (t[r] == null)
        continue;
      const s = fo[r];
      g(s, `invalid typed-data domain key: ${JSON.stringify(r)}`, "domain", t), e.push({ name: r, type: s });
    }
    return e.sort((r, s) => is.indexOf(r.name) - is.indexOf(s.name)), Lt.hashStruct("EIP712Domain", { EIP712Domain: e }, t);
  }
  /**
   *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static encode(t, e, r) {
    return et([
      "0x1901",
      Lt.hashDomain(t),
      Lt.from(e).hash(r)
    ]);
  }
  /**
   *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static hash(t, e, r) {
    return it(Lt.encode(t, e, r));
  }
  // Replaces all address types with ENS names with their looked up address
  /**
   * Resolves to the value from resolving all addresses in %%value%% for
   * %%types%% and the %%domain%%.
   */
  static async resolveNames(t, e, r, s) {
    t = Object.assign({}, t);
    for (const a in t)
      t[a] == null && delete t[a];
    const i = {};
    t.verifyingContract && !q(t.verifyingContract, 20) && (i[t.verifyingContract] = "0x");
    const o = Lt.from(e);
    o.visit(r, (a, c) => (a === "address" && !q(c, 20) && (i[c] = "0x"), c));
    for (const a in i)
      i[a] = await s(a);
    return t.verifyingContract && i[t.verifyingContract] && (t.verifyingContract = i[t.verifyingContract]), r = o.visit(r, (a, c) => a === "address" && i[c] ? i[c] : c), { domain: t, value: r };
  }
  /**
   *  Returns the JSON-encoded payload expected by nodes which implement
   *  the JSON-RPC [[link-eip-712]] method.
   */
  static getPayload(t, e, r) {
    Lt.hashDomain(t);
    const s = {}, i = [];
    is.forEach((c) => {
      const u = t[c];
      u != null && (s[c] = Kh[c](u), i.push({ name: c, type: fo[c] }));
    });
    const o = Lt.from(e);
    e = o.types;
    const a = Object.assign({}, e);
    return g(a.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", e), a.EIP712Domain = i, o.encode(r), {
      types: a,
      domain: s,
      primaryType: o.primaryType,
      message: o.visit(r, (c, u) => {
        if (c.match(/^bytes(\d*)/))
          return S(_(u));
        if (c.match(/^u?int/))
          return k(u).toString();
        switch (c) {
          case "address":
            return u.toLowerCase();
          case "bool":
            return !!u;
          case "string":
            return g(typeof u == "string", "invalid string", "value", u), u;
        }
        g(!1, "unsupported type", "type", c);
      })
    };
  }
}
function Ct(n) {
  const t = /* @__PURE__ */ new Set();
  return n.forEach((e) => t.add(e)), Object.freeze(t);
}
const Jh = "external public payable override", $h = Ct(Jh.split(" ")), Nc = "constant external internal payable private public pure view override", Zh = Ct(Nc.split(" ")), Bc = "constructor error event fallback function receive struct", Tc = Ct(Bc.split(" ")), Pc = "calldata memory storage payable indexed", jh = Ct(Pc.split(" ")), Wh = "tuple returns", Yh = [Bc, Pc, Wh, Nc].join(" "), qh = Ct(Yh.split(" ")), Xh = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, td = new RegExp("^(\\s*)"), ed = new RegExp("^([0-9]+)"), nd = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), Oc = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), Cc = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
class Qt {
  #t;
  #e;
  get offset() {
    return this.#t;
  }
  get length() {
    return this.#e.length - this.#t;
  }
  constructor(t) {
    this.#t = 0, this.#e = t.slice();
  }
  clone() {
    return new Qt(this.#e);
  }
  reset() {
    this.#t = 0;
  }
  #n(t = 0, e = 0) {
    return new Qt(this.#e.slice(t, e).map((r) => Object.freeze(Object.assign({}, r, {
      match: r.match - t,
      linkBack: r.linkBack - t,
      linkNext: r.linkNext - t
    }))));
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
    const e = this.#n(this.#t + 1, t.match + 1);
    return this.#t = t.match + 1, e;
  }
  // Pops and returns the items within "(" ITEM1 "," ITEM2 "," ... ")"
  popParams() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN")
      throw new Error("bad start");
    const e = [];
    for (; this.#t < t.match - 1; ) {
      const r = this.peek().linkNext;
      e.push(this.#n(this.#t + 1, r)), this.#t = r;
    }
    return this.#t = t.match + 1, e;
  }
  // Returns the top Token, throwing if out of tokens
  peek() {
    if (this.#t >= this.#e.length)
      throw new Error("out-of-bounds");
    return this.#e[this.#t];
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
    return this.#t++, t;
  }
  toString() {
    const t = [];
    for (let e = this.#t; e < this.#e.length; e++) {
      const r = this.#e[e];
      t.push(`${r.type}:${r.text}`);
    }
    return `<TokenString ${t.join(" ")}>`;
  }
}
function ve(n) {
  const t = [], e = (o) => {
    const a = i < n.length ? JSON.stringify(n[i]) : "$EOI";
    throw new Error(`invalid token ${a} at ${i}: ${o}`);
  };
  let r = [], s = [], i = 0;
  for (; i < n.length; ) {
    let o = n.substring(i), a = o.match(td);
    a && (i += a[1].length, o = n.substring(i));
    const c = { depth: r.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    t.push(c);
    let u = Xh[o[0]] || "";
    if (u) {
      if (c.type = u, c.text = o[0], i++, u === "OPEN_PAREN")
        r.push(t.length - 1), s.push(t.length - 1);
      else if (u == "CLOSE_PAREN")
        r.length === 0 && e("no matching open bracket"), c.match = r.pop(), t[c.match].match = t.length - 1, c.depth--, c.linkBack = s.pop(), t[c.linkBack].linkNext = t.length - 1;
      else if (u === "COMMA")
        c.linkBack = s.pop(), t[c.linkBack].linkNext = t.length - 1, s.push(t.length - 1);
      else if (u === "OPEN_BRACKET")
        c.type = "BRACKET";
      else if (u === "CLOSE_BRACKET") {
        let f = t.pop().text;
        if (t.length > 0 && t[t.length - 1].type === "NUMBER") {
          const l = t.pop().text;
          f = l + f, t[t.length - 1].value = G(l);
        }
        if (t.length === 0 || t[t.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        t[t.length - 1].text += f;
      }
      continue;
    }
    if (a = o.match(nd), a) {
      if (c.text = a[1], i += c.text.length, qh.has(c.text)) {
        c.type = "KEYWORD";
        continue;
      }
      if (c.text.match(Cc)) {
        c.type = "TYPE";
        continue;
      }
      c.type = "ID";
      continue;
    }
    if (a = o.match(ed), a) {
      c.text = a[1], c.type = "NUMBER", i += c.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(o[0])} at position ${i}`);
  }
  return new Qt(t.map((o) => Object.freeze(o)));
}
function po(n, t) {
  let e = [];
  for (const r in t.keys())
    n.has(r) && e.push(r);
  if (e.length > 1)
    throw new Error(`conflicting types: ${e.join(", ")}`);
}
function Hr(n, t) {
  if (t.peekKeyword(Tc)) {
    const e = t.pop().text;
    if (e !== n)
      throw new Error(`expected ${n}, got ${e}`);
  }
  return t.popType("ID");
}
function pe(n, t) {
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
function vc(n) {
  let t = pe(n, Zh);
  return po(t, Ct("constant payable nonpayable".split(" "))), po(t, Ct("pure view payable nonpayable".split(" "))), t.has("view") ? "view" : t.has("pure") ? "pure" : t.has("payable") ? "payable" : t.has("nonpayable") ? "nonpayable" : t.has("constant") ? "view" : "nonpayable";
}
function ge(n, t) {
  return n.popParams().map((e) => Y.from(e, t));
}
function Sc(n) {
  if (n.peekType("AT")) {
    if (n.pop(), n.peekType("NUMBER"))
      return k(n.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function Ye(n) {
  if (n.length)
    throw new Error(`unexpected tokens at offset ${n.offset}: ${n.toString()}`);
}
const rd = new RegExp(/^(.*)\[([0-9]*)\]$/);
function yo(n) {
  const t = n.match(Cc);
  if (g(t, "invalid type", "type", n), n === "uint")
    return "uint256";
  if (n === "int")
    return "int256";
  if (t[2]) {
    const e = parseInt(t[2]);
    g(e !== 0 && e <= 32, "invalid bytes length", "type", n);
  } else if (t[3]) {
    const e = parseInt(t[3]);
    g(e !== 0 && e <= 256 && e % 8 === 0, "invalid numeric width", "type", n);
  }
  return n;
}
const tt = {}, Rt = Symbol.for("_ethers_internal"), wo = "_ParamTypeInternal", mo = "_ErrorInternal", Ao = "_EventInternal", bo = "_ConstructorInternal", Eo = "_FallbackInternal", xo = "_FunctionInternal", Io = "_StructInternal";
class Y {
  /**
   *  The local name of the parameter (or ``""`` if unbound)
   */
  name;
  /**
   *  The fully qualified type (e.g. ``"address"``, ``"tuple(address)"``,
   *  ``"uint256[3][]"``)
   */
  type;
  /**
   *  The base type (e.g. ``"address"``, ``"tuple"``, ``"array"``)
   */
  baseType;
  /**
   *  True if the parameters is indexed.
   *
   *  For non-indexable types this is ``null``.
   */
  indexed;
  /**
   *  The components for the tuple.
   *
   *  For non-tuple types this is ``null``.
   */
  components;
  /**
   *  The array length, or ``-1`` for dynamic-lengthed arrays.
   *
   *  For non-array types this is ``null``.
   */
  arrayLength;
  /**
   *  The type of each child in the array.
   *
   *  For non-array types this is ``null``.
   */
  arrayChildren;
  /**
   *  @private
   */
  constructor(t, e, r, s, i, o, a, c) {
    if (Zn(t, tt, "ParamType"), Object.defineProperty(this, Rt, { value: wo }), o && (o = Object.freeze(o.slice())), s === "array") {
      if (a == null || c == null)
        throw new Error("");
    } else if (a != null || c != null)
      throw new Error("");
    if (s === "tuple") {
      if (o == null)
        throw new Error("");
    } else if (o != null)
      throw new Error("");
    D(this, {
      name: e,
      type: r,
      baseType: s,
      indexed: i,
      components: o,
      arrayLength: a,
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
  #t(t, e, r, s) {
    if (this.isArray()) {
      if (!Array.isArray(e))
        throw new Error("invalid array value");
      if (this.arrayLength !== -1 && e.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const o = this.arrayChildren, a = e.slice();
      a.forEach((c, u) => {
        o.#t(t, c, r, (f) => {
          a[u] = f;
        });
      }), s(a);
      return;
    }
    if (this.isTuple()) {
      const o = this.components;
      let a;
      if (Array.isArray(e))
        a = e.slice();
      else {
        if (e == null || typeof e != "object")
          throw new Error("invalid tuple value");
        a = o.map((c) => {
          if (!c.name)
            throw new Error("cannot use object value with unnamed components");
          if (!(c.name in e))
            throw new Error(`missing value for component ${c.name}`);
          return e[c.name];
        });
      }
      if (a.length !== this.components.length)
        throw new Error("array is wrong length");
      a.forEach((c, u) => {
        o[u].#t(t, c, r, (f) => {
          a[u] = f;
        });
      }), s(a);
      return;
    }
    const i = r(this.type, e);
    i.then ? t.push(async function() {
      s(await i);
    }()) : s(i);
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
    return this.#t(r, t, e, (i) => {
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
    if (Y.isParamType(t))
      return t;
    if (typeof t == "string")
      try {
        return Y.from(ve(t), e);
      } catch {
        g(!1, "invalid param type", "obj", t);
      }
    else if (t instanceof Qt) {
      let a = "", c = "", u = null;
      pe(t, Ct(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN") ? (c = "tuple", u = t.popParams().map((h) => Y.from(h)), a = `tuple(${u.map((h) => h.format()).join(",")})`) : (a = yo(t.popType("TYPE")), c = a);
      let f = null, l = null;
      for (; t.length && t.peekType("BRACKET"); ) {
        const h = t.pop();
        f = new Y(tt, "", a, c, null, u, l, f), l = h.value, a += h.text, c = "array", u = null;
      }
      let d = null;
      if (pe(t, jh).has("indexed")) {
        if (!e)
          throw new Error("");
        d = !0;
      }
      const m = t.peekType("ID") ? t.pop().text : "";
      if (t.length)
        throw new Error("leftover tokens");
      return new Y(tt, m, a, c, d, u, l, f);
    }
    const r = t.name;
    g(!r || typeof r == "string" && r.match(Oc), "invalid name", "obj.name", r);
    let s = t.indexed;
    s != null && (g(e, "parameter cannot be indexed", "obj.indexed", t.indexed), s = !!s);
    let i = t.type, o = i.match(rd);
    if (o) {
      const a = parseInt(o[2] || "-1"), c = Y.from({
        type: o[1],
        components: t.components
      });
      return new Y(tt, r || "", i, "array", s, null, a, c);
    }
    if (i === "tuple" || i.startsWith(
      "tuple("
      /* fix: ) */
    ) || i.startsWith(
      "("
      /* fix: ) */
    )) {
      const a = t.components != null ? t.components.map((u) => Y.from(u)) : null;
      return new Y(tt, r || "", i, "tuple", s, a, null, null);
    }
    return i = yo(t.type), new Y(tt, r || "", i, i, s, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(t) {
    return t && t[Rt] === wo;
  }
}
class qe {
  /**
   *  The type of the fragment.
   */
  type;
  /**
   *  The inputs for the fragment.
   */
  inputs;
  /**
   *  @private
   */
  constructor(t, e, r) {
    Zn(t, tt, "Fragment"), r = Object.freeze(r.slice()), D(this, { type: e, inputs: r });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(t) {
    if (typeof t == "string") {
      try {
        qe.from(JSON.parse(t));
      } catch {
      }
      return qe.from(ve(t));
    }
    if (t instanceof Qt)
      switch (t.peekKeyword(Tc)) {
        case "constructor":
          return de.from(t);
        case "error":
          return St.from(t);
        case "event":
          return te.from(t);
        case "fallback":
        case "receive":
          return ce.from(t);
        case "function":
          return ee.from(t);
        case "struct":
          return ze.from(t);
      }
    else if (typeof t == "object") {
      switch (t.type) {
        case "constructor":
          return de.from(t);
        case "error":
          return St.from(t);
        case "event":
          return te.from(t);
        case "fallback":
        case "receive":
          return ce.from(t);
        case "function":
          return ee.from(t);
        case "struct":
          return ze.from(t);
      }
      I(!1, `unsupported type: ${t.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from"
      });
    }
    g(!1, "unsupported frgament object", "obj", t);
  }
  /**
   *  Returns true if %%value%% is a [[ConstructorFragment]].
   */
  static isConstructor(t) {
    return de.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(t) {
    return St.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(t) {
    return te.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(t) {
    return ee.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(t) {
    return ze.isFragment(t);
  }
}
class Gr extends qe {
  /**
   *  The name of the fragment.
   */
  name;
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    super(t, e, s), g(typeof r == "string" && r.match(Oc), "invalid identifier", "name", r), s = Object.freeze(s.slice()), D(this, { name: r });
  }
}
function Jn(n, t) {
  return "(" + t.map((e) => e.format(n)).join(n === "full" ? ", " : ",") + ")";
}
class St extends Gr {
  /**
   *  @private
   */
  constructor(t, e, r) {
    super(t, "error", e, r), Object.defineProperty(this, Rt, { value: mo });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return We(this.format("sighash")).substring(0, 10);
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
    return t !== "sighash" && e.push("error"), e.push(this.name + Jn(t, this.inputs)), e.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(t) {
    if (St.isFragment(t))
      return t;
    if (typeof t == "string")
      return St.from(ve(t));
    if (t instanceof Qt) {
      const e = Hr("error", t), r = ge(t);
      return Ye(t), new St(tt, e, r);
    }
    return new St(tt, t.name, t.inputs ? t.inputs.map(Y.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(t) {
    return t && t[Rt] === mo;
  }
}
class te extends Gr {
  /**
   *  Whether this event is anonymous.
   */
  anonymous;
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    super(t, "event", e, r), Object.defineProperty(this, Rt, { value: Ao }), D(this, { anonymous: s });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return We(this.format("sighash"));
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
    return t !== "sighash" && e.push("event"), e.push(this.name + Jn(t, this.inputs)), t !== "sighash" && this.anonymous && e.push("anonymous"), e.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(t, e) {
    return e = (e || []).map((s) => Y.from(s)), new te(tt, t, e, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(t) {
    if (te.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return te.from(ve(t));
      } catch {
        g(!1, "invalid event fragment", "obj", t);
      }
    else if (t instanceof Qt) {
      const e = Hr("event", t), r = ge(t, !0), s = !!pe(t, Ct(["anonymous"])).has("anonymous");
      return Ye(t), new te(tt, e, r, s);
    }
    return new te(tt, t.name, t.inputs ? t.inputs.map((e) => Y.from(e, !0)) : [], !!t.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(t) {
    return t && t[Rt] === Ao;
  }
}
class de extends qe {
  /**
   *  Whether the constructor can receive an endowment.
   */
  payable;
  /**
   *  The recommended gas limit for deployment or ``null``.
   */
  gas;
  /**
   *  @private
   */
  constructor(t, e, r, s, i) {
    super(t, e, r), Object.defineProperty(this, Rt, { value: bo }), D(this, { payable: s, gas: i });
  }
  /**
   *  Returns a string representation of this constructor as %%format%%.
   */
  format(t) {
    if (I(t != null && t !== "sighash", "cannot format a constructor for sighash", "UNSUPPORTED_OPERATION", { operation: "format(sighash)" }), t === "json")
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((r) => JSON.parse(r.format(t)))
      });
    const e = [`constructor${Jn(t, this.inputs)}`];
    return this.payable && e.push("payable"), this.gas != null && e.push(`@${this.gas.toString()}`), e.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(t) {
    if (de.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return de.from(ve(t));
      } catch {
        g(!1, "invalid constuctor fragment", "obj", t);
      }
    else if (t instanceof Qt) {
      pe(t, Ct(["constructor"]));
      const e = ge(t), r = !!pe(t, $h).has("payable"), s = Sc(t);
      return Ye(t), new de(tt, "constructor", e, r, s);
    }
    return new de(tt, "constructor", t.inputs ? t.inputs.map(Y.from) : [], !!t.payable, t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(t) {
    return t && t[Rt] === bo;
  }
}
class ce extends qe {
  /**
   *  If the function can be sent value during invocation.
   */
  payable;
  constructor(t, e, r) {
    super(t, "fallback", e), Object.defineProperty(this, Rt, { value: Eo }), D(this, { payable: r });
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
    if (ce.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return ce.from(ve(t));
      } catch {
        g(!1, "invalid fallback fragment", "obj", t);
      }
    else if (t instanceof Qt) {
      const e = t.toString(), r = t.peekKeyword(Ct(["fallback", "receive"]));
      if (g(r, "type must be fallback or receive", "obj", e), t.popKeyword(Ct(["fallback", "receive"])) === "receive") {
        const a = ge(t);
        return g(a.length === 0, "receive cannot have arguments", "obj.inputs", a), pe(t, Ct(["payable"])), Ye(t), new ce(tt, [], !0);
      }
      let i = ge(t);
      i.length ? g(i.length === 1 && i[0].type === "bytes", "invalid fallback inputs", "obj.inputs", i.map((a) => a.format("minimal")).join(", ")) : i = [Y.from("bytes")];
      const o = vc(t);
      if (g(o === "nonpayable" || o === "payable", "fallback cannot be constants", "obj.stateMutability", o), pe(t, Ct(["returns"])).has("returns")) {
        const a = ge(t);
        g(a.length === 1 && a[0].type === "bytes", "invalid fallback outputs", "obj.outputs", a.map((c) => c.format("minimal")).join(", "));
      }
      return Ye(t), new ce(tt, i, o === "payable");
    }
    if (t.type === "receive")
      return new ce(tt, [], !0);
    if (t.type === "fallback") {
      const e = [Y.from("bytes")], r = t.stateMutability === "payable";
      return new ce(tt, e, r);
    }
    g(!1, "invalid fallback description", "obj", t);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(t) {
    return t && t[Rt] === Eo;
  }
}
class ee extends Gr {
  /**
   *  If the function is constant (e.g. ``pure`` or ``view`` functions).
   */
  constant;
  /**
   *  The returned types for the result of calling this function.
   */
  outputs;
  /**
   *  The state mutability (e.g. ``payable``, ``nonpayable``, ``view``
   *  or ``pure``)
   */
  stateMutability;
  /**
   *  If the function can be sent value during invocation.
   */
  payable;
  /**
   *  The recommended gas limit to send when calling this function.
   */
  gas;
  /**
   *  @private
   */
  constructor(t, e, r, s, i, o) {
    super(t, "function", e, s), Object.defineProperty(this, Rt, { value: xo }), i = Object.freeze(i.slice()), D(this, { constant: r === "view" || r === "pure", gas: o, outputs: i, payable: r === "payable", stateMutability: r });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return We(this.format("sighash")).substring(0, 10);
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
    return t !== "sighash" && e.push("function"), e.push(this.name + Jn(t, this.inputs)), t !== "sighash" && (this.stateMutability !== "nonpayable" && e.push(this.stateMutability), this.outputs && this.outputs.length && (e.push("returns"), e.push(Jn(t, this.outputs))), this.gas != null && e.push(`@${this.gas.toString()}`)), e.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(t, e) {
    return e = (e || []).map((s) => Y.from(s)), new ee(tt, t, "view", e, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(t) {
    if (ee.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return ee.from(ve(t));
      } catch {
        g(!1, "invalid function fragment", "obj", t);
      }
    else if (t instanceof Qt) {
      const r = Hr("function", t), s = ge(t), i = vc(t);
      let o = [];
      pe(t, Ct(["returns"])).has("returns") && (o = ge(t));
      const a = Sc(t);
      return Ye(t), new ee(tt, r, i, s, o, a);
    }
    let e = t.stateMutability;
    return e == null && (e = "payable", typeof t.constant == "boolean" ? (e = "view", t.constant || (e = "payable", typeof t.payable == "boolean" && !t.payable && (e = "nonpayable"))) : typeof t.payable == "boolean" && !t.payable && (e = "nonpayable")), new ee(tt, t.name, e, t.inputs ? t.inputs.map(Y.from) : [], t.outputs ? t.outputs.map(Y.from) : [], t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(t) {
    return t && t[Rt] === xo;
  }
}
class ze extends Gr {
  /**
   *  @private
   */
  constructor(t, e, r) {
    super(t, "struct", e, r), Object.defineProperty(this, Rt, { value: Io });
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
        return ze.from(ve(t));
      } catch {
        g(!1, "invalid struct fragment", "obj", t);
      }
    else if (t instanceof Qt) {
      const e = Hr("struct", t), r = ge(t);
      return Ye(t), new ze(tt, e, r);
    }
    return new ze(tt, t.name, t.inputs ? t.inputs.map(Y.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(t) {
    return t && t[Rt] === Io;
  }
}
const Wt = /* @__PURE__ */ new Map();
Wt.set(0, "GENERIC_PANIC");
Wt.set(1, "ASSERT_FALSE");
Wt.set(17, "OVERFLOW");
Wt.set(18, "DIVIDE_BY_ZERO");
Wt.set(33, "ENUM_RANGE_ERROR");
Wt.set(34, "BAD_STORAGE_DATA");
Wt.set(49, "STACK_UNDERFLOW");
Wt.set(50, "ARRAY_RANGE_ERROR");
Wt.set(65, "OUT_OF_MEMORY");
Wt.set(81, "UNINITIALIZED_FUNCTION_CALL");
const sd = new RegExp(/^bytes([0-9]*)$/), id = new RegExp(/^(u?int)([0-9]*)$/);
let as = null, No = 1024;
function od(n, t, e, r) {
  let s = "missing revert data", i = null;
  const o = null;
  let a = null;
  if (e) {
    s = "execution reverted";
    const u = _(e);
    if (e = S(e), u.length === 0)
      s += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (u.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (S(u.slice(0, 4)) === "0x08c379a0")
      try {
        i = r.decode(["string"], u.slice(4))[0], a = {
          signature: "Error(string)",
          name: "Error",
          args: [i]
        }, s += `: ${JSON.stringify(i)}`;
      } catch {
        s += " (could not decode reason; invalid string data)";
      }
    else if (S(u.slice(0, 4)) === "0x4e487b71")
      try {
        const f = Number(r.decode(["uint256"], u.slice(4))[0]);
        a = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [f]
        }, i = `Panic due to ${Wt.get(f) || "UNKNOWN"}(${f})`, s += `: ${i}`;
      } catch {
        s += " (could not decode panic code)";
      }
    else
      s += " (unknown custom error)";
  }
  const c = {
    to: t.to ? Z(t.to) : null,
    data: t.data || "0x"
  };
  return t.from && (c.from = Z(t.from)), nt(s, "CALL_EXCEPTION", {
    action: n,
    data: e,
    reason: i,
    transaction: c,
    invocation: o,
    revert: a
  });
}
class Oe {
  #t(t) {
    if (t.isArray())
      return new Bf(this.#t(t.arrayChildren), t.arrayLength, t.name);
    if (t.isTuple())
      return new ur(t.components.map((r) => this.#t(r)), t.name);
    switch (t.baseType) {
      case "address":
        return new If(t.name);
      case "bool":
        return new Tf(t.name);
      case "string":
        return new Lf(t.name);
      case "bytes":
        return new Pf(t.name);
      case "":
        return new vf(t.name);
    }
    let e = t.type.match(id);
    if (e) {
      let r = parseInt(e[2] || "256");
      return g(r !== 0 && r <= 256 && r % 8 === 0, "invalid " + e[1] + " bit length", "param", t), new Uf(r / 8, e[1] === "int", t.name);
    }
    if (e = t.type.match(sd), e) {
      let r = parseInt(e[1]);
      return g(r !== 0 && r <= 32, "invalid bytes length", "param", t), new Of(r, t.name);
    }
    g(!1, "invalid type", "type", t.type);
  }
  /**
   *  Get the default values for the given %%types%%.
   *
   *  For example, a ``uint`` is by default ``0`` and ``bool``
   *  is by default ``false``.
   */
  getDefaultValue(t) {
    const e = t.map((s) => this.#t(Y.from(s)));
    return new ur(e, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(t, e) {
    oa(e.length, t.length, "types/values length mismatch");
    const r = t.map((o) => this.#t(Y.from(o))), s = new ur(r, "_"), i = new Is();
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
    const s = t.map((o) => this.#t(Y.from(o)));
    return new ur(s, "_").decode(new Ws(e, r, No));
  }
  static _setDefaultMaxInflation(t) {
    g(typeof t == "number" && Number.isInteger(t), "invalid defaultMaxInflation factor", "value", t), No = t;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return as == null && (as = new Oe()), as;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(t, e, r) {
    return od(t, e, r, Oe.defaultAbiCoder());
  }
}
function Ds(n) {
  const t = jt(n);
  if (t.length > 31)
    throw new Error("bytes32 string must be less than 32 bytes");
  return Zs(t, 32);
}
class ad {
  /**
   *  The matching fragment for the ``topic0``.
   */
  fragment;
  /**
   *  The name of the Event.
   */
  name;
  /**
   *  The full Event signature.
   */
  signature;
  /**
   *  The topic hash for the Event.
   */
  topic;
  /**
   *  The arguments passed into the Event with ``emit``.
   */
  args;
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    const s = t.name, i = t.format();
    D(this, {
      fragment: t,
      name: s,
      signature: i,
      topic: e,
      args: r
    });
  }
}
class cd {
  /**
   *  The matching fragment from the transaction ``data``.
   */
  fragment;
  /**
   *  The name of the Function from the transaction ``data``.
   */
  name;
  /**
   *  The arguments passed to the Function from the transaction ``data``.
   */
  args;
  /**
   *  The full Function signature from the transaction ``data``.
   */
  signature;
  /**
   *  The selector for the Function from the transaction ``data``.
   */
  selector;
  /**
   *  The ``value`` (in wei) from the transaction.
   */
  value;
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s) {
    const i = t.name, o = t.format();
    D(this, {
      fragment: t,
      name: i,
      args: r,
      signature: o,
      selector: e,
      value: s
    });
  }
}
class ud {
  /**
   *  The matching fragment.
   */
  fragment;
  /**
   *  The name of the Error.
   */
  name;
  /**
   *  The arguments passed to the Error with ``revert``.
   */
  args;
  /**
   *  The full Error signature.
   */
  signature;
  /**
   *  The selector for the Error.
   */
  selector;
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    const s = t.name, i = t.format();
    D(this, {
      fragment: t,
      name: s,
      args: r,
      signature: i,
      selector: e
    });
  }
}
class Bo {
  /**
   *  The ``keccak256`` of the value logged.
   */
  hash;
  /**
   *  @_ignore:
   */
  _isIndexed;
  /**
   *  Returns ``true`` if %%value%% is an **Indexed**.
   *
   *  This provides a Type Guard for property access.
   */
  static isIndexed(t) {
    return !!(t && t._isIndexed);
  }
  /**
   *  @_ignore:
   */
  constructor(t) {
    D(this, { hash: t, _isIndexed: !0 });
  }
}
const To = {
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
}, Po = {
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
      return n >= 0 && n <= 255 && To[n.toString()] && (t = To[n.toString()]), `reverted with panic code 0x${n.toString(16)} (${t})`;
    }
  }
};
class Vt {
  /**
   *  All the Contract ABI members (i.e. methods, events, errors, etc).
   */
  fragments;
  /**
   *  The Contract constructor.
   */
  deploy;
  /**
   *  The Fallback method, if any.
   */
  fallback;
  /**
   *  If receiving ether is supported.
   */
  receive;
  #t;
  #e;
  #n;
  //    #structs: Map<string, StructFragment>;
  #r;
  /**
   *  Create a new Interface for the %%fragments%%.
   */
  constructor(t) {
    let e = [];
    typeof t == "string" ? e = JSON.parse(t) : e = t, this.#n = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map(), this.#e = /* @__PURE__ */ new Map();
    const r = [];
    for (const o of e)
      try {
        r.push(qe.from(o));
      } catch (a) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(o)}:`, a.message);
      }
    D(this, {
      fragments: Object.freeze(r)
    });
    let s = null, i = !1;
    this.#r = this.getAbiCoder(), this.fragments.forEach((o, a) => {
      let c;
      switch (o.type) {
        case "constructor":
          if (this.deploy) {
            console.log("duplicate definition - constructor");
            return;
          }
          D(this, { deploy: o });
          return;
        case "fallback":
          o.inputs.length === 0 ? i = !0 : (g(!s || o.payable !== s.payable, "conflicting fallback fragments", `fragments[${a}]`, o), s = o, i = s.payable);
          return;
        case "function":
          c = this.#n;
          break;
        case "event":
          c = this.#e;
          break;
        case "error":
          c = this.#t;
          break;
        default:
          return;
      }
      const u = o.format();
      c.has(u) || c.set(u, o);
    }), this.deploy || D(this, {
      deploy: de.from("constructor()")
    }), D(this, { fallback: s, receive: i });
  }
  /**
   *  Returns the entire Human-Readable ABI, as an array of
   *  signatures, optionally as %%minimal%% strings, which
   *  removes parameter names and unneceesary spaces.
   */
  format(t) {
    const e = t ? "minimal" : "full";
    return this.fragments.map((s) => s.format(e));
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
    return Oe.defaultAbiCoder();
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  #s(t, e, r) {
    if (q(t)) {
      const i = t.toLowerCase();
      for (const o of this.#n.values())
        if (i === o.selector)
          return o;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const i = [];
      for (const [o, a] of this.#n)
        o.split(
          "("
          /* fix:) */
        )[0] === t && i.push(a);
      if (e) {
        const o = e.length > 0 ? e[e.length - 1] : null;
        let a = e.length, c = !0;
        st.isTyped(o) && o.type === "overrides" && (c = !1, a--);
        for (let u = i.length - 1; u >= 0; u--) {
          const f = i[u].inputs.length;
          f !== a && (!c || f !== a - 1) && i.splice(u, 1);
        }
        for (let u = i.length - 1; u >= 0; u--) {
          const f = i[u].inputs;
          for (let l = 0; l < e.length; l++)
            if (st.isTyped(e[l])) {
              if (l >= f.length) {
                if (e[l].type === "overrides")
                  continue;
                i.splice(u, 1);
                break;
              }
              if (e[l].type !== f[l].baseType) {
                i.splice(u, 1);
                break;
              }
            }
        }
      }
      if (i.length === 1 && e && e.length !== i[0].inputs.length) {
        const o = e[e.length - 1];
        (o == null || Array.isArray(o) || typeof o != "object") && i.splice(0, 1);
      }
      if (i.length === 0)
        return null;
      if (i.length > 1 && r) {
        const o = i.map((a) => JSON.stringify(a.format())).join(", ");
        g(!1, `ambiguous function description (i.e. matches ${o})`, "key", t);
      }
      return i[0];
    }
    const s = this.#n.get(ee.from(t).format());
    return s || null;
  }
  /**
   *  Get the function name for %%key%%, which may be a function selector,
   *  function name or function signature that belongs to the ABI.
   */
  getFunctionName(t) {
    const e = this.#s(t, null, !1);
    return g(e, "no matching function", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (a function selector, function name or
   *  function signature) is present in the ABI.
   *
   *  In the case of a function name, the name may be ambiguous, so
   *  accessing the [[FunctionFragment]] may require refinement.
   */
  hasFunction(t) {
    return !!this.#s(t, null, !1);
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
    return this.#s(t, e || null, !0);
  }
  /**
   *  Iterate over all functions, calling %%callback%%, sorted by their name.
   */
  forEachFunction(t) {
    const e = Array.from(this.#n.keys());
    e.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t(this.#n.get(s), r);
    }
  }
  // Find an event definition by any means necessary (unless it is ambiguous)
  #o(t, e, r) {
    if (q(t)) {
      const i = t.toLowerCase();
      for (const o of this.#e.values())
        if (i === o.topicHash)
          return o;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const i = [];
      for (const [o, a] of this.#e)
        o.split(
          "("
          /* fix:) */
        )[0] === t && i.push(a);
      if (e) {
        for (let o = i.length - 1; o >= 0; o--)
          i[o].inputs.length < e.length && i.splice(o, 1);
        for (let o = i.length - 1; o >= 0; o--) {
          const a = i[o].inputs;
          for (let c = 0; c < e.length; c++)
            if (st.isTyped(e[c]) && e[c].type !== a[c].baseType) {
              i.splice(o, 1);
              break;
            }
        }
      }
      if (i.length === 0)
        return null;
      if (i.length > 1 && r) {
        const o = i.map((a) => JSON.stringify(a.format())).join(", ");
        g(!1, `ambiguous event description (i.e. matches ${o})`, "key", t);
      }
      return i[0];
    }
    const s = this.#e.get(te.from(t).format());
    return s || null;
  }
  /**
   *  Get the event name for %%key%%, which may be a topic hash,
   *  event name or event signature that belongs to the ABI.
   */
  getEventName(t) {
    const e = this.#o(t, null, !1);
    return g(e, "no matching event", "key", t), e.name;
  }
  /**
   *  Returns true if %%key%% (an event topic hash, event name or
   *  event signature) is present in the ABI.
   *
   *  In the case of an event name, the name may be ambiguous, so
   *  accessing the [[EventFragment]] may require refinement.
   */
  hasEvent(t) {
    return !!this.#o(t, null, !1);
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
    return this.#o(t, e || null, !0);
  }
  /**
   *  Iterate over all events, calling %%callback%%, sorted by their name.
   */
  forEachEvent(t) {
    const e = Array.from(this.#e.keys());
    e.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t(this.#e.get(s), r);
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
    if (q(t)) {
      const s = t.toLowerCase();
      if (Po[s])
        return St.from(Po[s].signature);
      for (const i of this.#t.values())
        if (s === i.selector)
          return i;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const s = [];
      for (const [i, o] of this.#t)
        i.split(
          "("
          /* fix:) */
        )[0] === t && s.push(o);
      if (s.length === 0)
        return t === "Error" ? St.from("error Error(string)") : t === "Panic" ? St.from("error Panic(uint256)") : null;
      if (s.length > 1) {
        const i = s.map((o) => JSON.stringify(o.format())).join(", ");
        g(!1, `ambiguous error description (i.e. ${i})`, "name", t);
      }
      return s[0];
    }
    if (t = St.from(t).format(), t === "Error(string)")
      return St.from("error Error(string)");
    if (t === "Panic(uint256)")
      return St.from("error Panic(uint256)");
    const r = this.#t.get(t);
    return r || null;
  }
  /**
   *  Iterate over all errors, calling %%callback%%, sorted by their name.
   */
  forEachError(t) {
    const e = Array.from(this.#t.keys());
    e.sort((r, s) => r.localeCompare(s));
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t(this.#t.get(s), r);
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
    return this.#r.decode(t, e);
  }
  _encodeParams(t, e) {
    return this.#r.encode(t, e);
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
      g(r, "unknown error", "fragment", t), t = r;
    }
    return g(rt(e, 0, 4) === t.selector, `data signature does not match error ${t.name}.`, "data", e), this._decodeParams(t.inputs, rt(e, 4));
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
      g(r, "unknown error", "fragment", t), t = r;
    }
    return et([
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
      g(r, "unknown function", "fragment", t), t = r;
    }
    return g(rt(e, 0, 4) === t.selector, `data signature does not match function ${t.name}.`, "data", e), this._decodeParams(t.inputs, rt(e, 4));
  }
  /**
   *  Encodes the ``tx.data`` for a transaction that calls the function
   *  specified (see [[getFunction]] for valid values for %%fragment%%) with
   *  the %%values%%.
   */
  encodeFunctionData(t, e) {
    if (typeof t == "string") {
      const r = this.getFunction(t);
      g(r, "unknown function", "fragment", t), t = r;
    }
    return et([
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
      g(i, "unknown function", "fragment", t), t = i;
    }
    let r = "invalid length for result data";
    const s = Tt(e);
    if (s.length % 32 === 0)
      try {
        return this.#r.decode(t.outputs, s);
      } catch {
        r = "could not decode result data";
      }
    I(!1, r, "BAD_DATA", {
      value: S(s),
      info: { method: t.name, signature: t.format() }
    });
  }
  makeError(t, e) {
    const r = _(t, "data"), s = Oe.getBuiltinCallException("call", e, r);
    if (s.message.startsWith("execution reverted (unknown custom error)")) {
      const a = S(r.slice(0, 4)), c = this.getError(a);
      if (c)
        try {
          const u = this.#r.decode(c.inputs, r.slice(4));
          s.revert = {
            name: c.name,
            signature: c.format(),
            args: u
          }, s.reason = s.revert.signature, s.message = `execution reverted: ${s.reason}`;
        } catch {
          s.message = "execution reverted (coult not decode custom error)";
        }
    }
    const o = this.parseTransaction(e);
    return o && (s.invocation = {
      method: o.name,
      signature: o.signature,
      args: o.args
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
      g(r, "unknown function", "fragment", t), t = r;
    }
    return S(this.#r.encode(t.outputs, e || []));
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
      g(i, "unknown event", "eventFragment", t), t = i;
    }
    I(e.length <= t.inputs.length, `too many arguments for ${t.format()}`, "UNEXPECTED_ARGUMENT", { count: e.length, expectedCount: t.inputs.length });
    const r = [];
    t.anonymous || r.push(t.topicHash);
    const s = (i, o) => i.type === "string" ? We(o) : i.type === "bytes" ? it(S(o)) : (i.type === "bool" && typeof o == "boolean" ? o = o ? "0x01" : "0x00" : i.type.match(/^u?int/) ? o = Te(o) : i.type.match(/^bytes/) ? o = Zs(o, 32) : i.type === "address" && this.#r.encode(["address"], [o]), ne(S(o), 32));
    for (e.forEach((i, o) => {
      const a = t.inputs[o];
      if (!a.indexed) {
        g(i == null, "cannot filter non-indexed parameters; must be null", "contract." + a.name, i);
        return;
      }
      i == null ? r.push(null) : a.baseType === "array" || a.baseType === "tuple" ? g(!1, "filtering with tuples or arrays not supported", "contract." + a.name, i) : Array.isArray(i) ? r.push(i.map((c) => s(a, c))) : r.push(s(a, i));
    }); r.length && r[r.length - 1] === null; )
      r.pop();
    return r;
  }
  encodeEventLog(t, e) {
    if (typeof t == "string") {
      const o = this.getEvent(t);
      g(o, "unknown event", "eventFragment", t), t = o;
    }
    const r = [], s = [], i = [];
    return t.anonymous || r.push(t.topicHash), g(e.length === t.inputs.length, "event arguments/values mismatch", "values", e), t.inputs.forEach((o, a) => {
      const c = e[a];
      if (o.indexed)
        if (o.type === "string")
          r.push(We(c));
        else if (o.type === "bytes")
          r.push(it(c));
        else {
          if (o.baseType === "tuple" || o.baseType === "array")
            throw new Error("not implemented");
          r.push(this.#r.encode([o.type], [c]));
        }
      else
        s.push(o), i.push(c);
    }), {
      data: this.#r.encode(s, i),
      topics: r
    };
  }
  // Decode a filter for the event and the search criteria
  decodeEventLog(t, e, r) {
    if (typeof t == "string") {
      const y = this.getEvent(t);
      g(y, "unknown event", "eventFragment", t), t = y;
    }
    if (r != null && !t.anonymous) {
      const y = t.topicHash;
      g(q(r[0], 32) && r[0].toLowerCase() === y, "fragment/topic mismatch", "topics[0]", r[0]), r = r.slice(1);
    }
    const s = [], i = [], o = [];
    t.inputs.forEach((y, m) => {
      y.indexed ? y.type === "string" || y.type === "bytes" || y.baseType === "tuple" || y.baseType === "array" ? (s.push(Y.from({ type: "bytes32", name: y.name })), o.push(!0)) : (s.push(y), o.push(!1)) : (i.push(y), o.push(!1));
    });
    const a = r != null ? this.#r.decode(s, et(r)) : null, c = this.#r.decode(i, e, !0), u = [], f = [];
    let l = 0, d = 0;
    return t.inputs.forEach((y, m) => {
      let h = null;
      if (y.indexed)
        if (a == null)
          h = new Bo(null);
        else if (o[m])
          h = new Bo(a[d++]);
        else
          try {
            h = a[d++];
          } catch (p) {
            h = p;
          }
      else
        try {
          h = c[l++];
        } catch (p) {
          h = p;
        }
      u.push(h), f.push(y.name || null);
    }), he.fromItems(u, f);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(t) {
    const e = _(t.data, "tx.data"), r = k(t.value != null ? t.value : 0, "tx.value"), s = this.getFunction(S(e.slice(0, 4)));
    if (!s)
      return null;
    const i = this.#r.decode(s.inputs, e.slice(4));
    return new cd(s, s.selector, i, r);
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
    return !e || e.anonymous ? null : new ad(e, e.topicHash, this.decodeEventLog(e, t.data, t.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(t) {
    const e = S(t), r = this.getError(rt(e, 0, 4));
    if (!r)
      return null;
    const s = this.#r.decode(r.inputs, rt(e, 4));
    return new ud(r, r.selector, s);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(t) {
    return t instanceof Vt ? t : typeof t == "string" ? new Vt(JSON.parse(t)) : typeof t.formatJson == "function" ? new Vt(t.formatJson()) : typeof t.format == "function" ? new Vt(t.format("json")) : new Vt(t);
  }
}
const Rc = BigInt(0);
function pn(n) {
  return n ?? null;
}
function at(n) {
  return n == null ? null : n.toString();
}
class Oo {
  /**
   *  The gas price for legacy networks.
   */
  gasPrice;
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
  maxFeePerGas;
  /**
   *  The additional amout to pay per gas to encourage a validator
   *  to include the transaction.
   *
   *  The purpose of this is to compensate the validator for the
   *  adjusted risk for including a given transaction.
   *
   *  This will be ``null`` on legacy networks (i.e. [pre-EIP-1559](link-eip-1559))
   */
  maxPriorityFeePerGas;
  /**
   *  Creates a new FeeData for %%gasPrice%%, %%maxFeePerGas%% and
   *  %%maxPriorityFeePerGas%%.
   */
  constructor(t, e, r) {
    D(this, {
      gasPrice: pn(t),
      maxFeePerGas: pn(e),
      maxPriorityFeePerGas: pn(r)
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { gasPrice: t, maxFeePerGas: e, maxPriorityFeePerGas: r } = this;
    return {
      _type: "FeeData",
      gasPrice: at(t),
      maxFeePerGas: at(e),
      maxPriorityFeePerGas: at(r)
    };
  }
}
function Or(n) {
  const t = {};
  n.to && (t.to = n.to), n.from && (t.from = n.from), n.data && (t.data = S(n.data));
  const e = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const s of e)
    !(s in n) || n[s] == null || (t[s] = k(n[s], `request.${s}`));
  const r = "type,nonce".split(/,/);
  for (const s of r)
    !(s in n) || n[s] == null || (t[s] = G(n[s], `request.${s}`));
  return n.accessList && (t.accessList = nn(n.accessList)), "blockTag" in n && (t.blockTag = n.blockTag), "enableCcipRead" in n && (t.enableCcipRead = !!n.enableCcipRead), "customData" in n && (t.customData = n.customData), "blobVersionedHashes" in n && n.blobVersionedHashes && (t.blobVersionedHashes = n.blobVersionedHashes.slice()), "kzg" in n && (t.kzg = n.kzg), "blobs" in n && n.blobs && (t.blobs = n.blobs.map((s) => $s(s) ? S(s) : Object.assign({}, s))), t;
}
class ld {
  /**
   *  The provider connected to the block used to fetch additional details
   *  if necessary.
   */
  provider;
  /**
   *  The block number, sometimes called the block height. This is a
   *  sequential number that is one higher than the parent block.
   */
  number;
  /**
   *  The block hash.
   *
   *  This hash includes all properties, so can be safely used to identify
   *  an exact set of block properties.
   */
  hash;
  /**
   *  The timestamp for this block, which is the number of seconds since
   *  epoch that this block was included.
   */
  timestamp;
  /**
   *  The block hash of the parent block.
   */
  parentHash;
  /**
   *  The hash tree root of the parent beacon block for the given
   *  execution block. See [[link-eip-4788]].
   */
  parentBeaconBlockRoot;
  /**
   *  The nonce.
   *
   *  On legacy networks, this is the random number inserted which
   *  permitted the difficulty target to be reached.
   */
  nonce;
  /**
   *  The difficulty target.
   *
   *  On legacy networks, this is the proof-of-work target required
   *  for a block to meet the protocol rules to be included.
   *
   *  On modern networks, this is a random number arrived at using
   *  randao.  @TODO: Find links?
   */
  difficulty;
  /**
   *  The total gas limit for this block.
   */
  gasLimit;
  /**
   *  The total gas used in this block.
   */
  gasUsed;
  /**
   *  The root hash for the global state after applying changes
   *  in this block.
   */
  stateRoot;
  /**
   *  The hash of the transaction receipts trie.
   */
  receiptsRoot;
  /**
   *  The total amount of blob gas consumed by the transactions
   *  within the block. See [[link-eip-4844]].
   */
  blobGasUsed;
  /**
   *  The running total of blob gas consumed in excess of the
   *  target, prior to the block. See [[link-eip-4844]].
   */
  excessBlobGas;
  /**
   *  The miner coinbase address, wihch receives any subsidies for
   *  including this block.
   */
  miner;
  /**
   *  The latest RANDAO mix of the post beacon state of
   *  the previous block.
   */
  prevRandao;
  /**
   *  Any extra data the validator wished to include.
   */
  extraData;
  /**
   *  The base fee per gas that all transactions in this block were
   *  charged.
   *
   *  This adjusts after each block, depending on how congested the network
   *  is.
   */
  baseFeePerGas;
  #t;
  /**
   *  Create a new **Block** object.
   *
   *  This should generally not be necessary as the unless implementing a
   *  low-level library.
   */
  constructor(t, e) {
    this.#t = t.transactions.map((r) => typeof r != "string" ? new qn(r, e) : r), D(this, {
      provider: e,
      hash: pn(t.hash),
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
      prevRandao: pn(t.prevRandao),
      extraData: t.extraData,
      baseFeePerGas: pn(t.baseFeePerGas),
      stateRoot: t.stateRoot,
      receiptsRoot: t.receiptsRoot
    });
  }
  /**
   *  Returns the list of transaction hashes, in the order
   *  they were executed within the block.
   */
  get transactions() {
    return this.#t.map((t) => typeof t == "string" ? t : t.hash);
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
    const t = this.#t.slice();
    return t.length === 0 ? [] : (I(typeof t[0] == "object", "transactions were not prefetched with block request", "UNSUPPORTED_OPERATION", {
      operation: "transactionResponses()"
    }), t);
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { baseFeePerGas: t, difficulty: e, extraData: r, gasLimit: s, gasUsed: i, hash: o, miner: a, prevRandao: c, nonce: u, number: f, parentHash: l, parentBeaconBlockRoot: d, stateRoot: y, receiptsRoot: m, timestamp: h, transactions: p } = this;
    return {
      _type: "Block",
      baseFeePerGas: at(t),
      difficulty: at(e),
      extraData: r,
      gasLimit: at(s),
      gasUsed: at(i),
      blobGasUsed: at(this.blobGasUsed),
      excessBlobGas: at(this.excessBlobGas),
      hash: o,
      miner: a,
      prevRandao: c,
      nonce: u,
      number: f,
      parentHash: l,
      timestamp: h,
      parentBeaconBlockRoot: d,
      stateRoot: y,
      receiptsRoot: m,
      transactions: p
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
    return this.#t.length;
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
      e = this.#t[t];
    else {
      const r = t.toLowerCase();
      for (const s of this.#t)
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
    g(!1, "no matching transaction", "indexOrHash", t);
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
    return fd(this);
  }
}
class Yn {
  /**
   *  The provider connected to the log used to fetch additional details
   *  if necessary.
   */
  provider;
  /**
   *  The transaction hash of the transaction this log occurred in. Use the
   *  [[Log-getTransaction]] to get the [[TransactionResponse]].
   */
  transactionHash;
  /**
   *  The block hash of the block this log occurred in. Use the
   *  [[Log-getBlock]] to get the [[Block]].
   */
  blockHash;
  /**
   *  The block number of the block this log occurred in. It is preferred
   *  to use the [[Block-hash]] when fetching the related [[Block]],
   *  since in the case of an orphaned block, the block at that height may
   *  have changed.
   */
  blockNumber;
  /**
   *  If the **Log** represents a block that was removed due to an orphaned
   *  block, this will be true.
   *
   *  This can only happen within an orphan event listener.
   */
  removed;
  /**
   *  The address of the contract that emitted this log.
   */
  address;
  /**
   *  The data included in this log when it was emitted.
   */
  data;
  /**
   *  The indexed topics included in this log when it was emitted.
   *
   *  All topics are included in the bloom filters, so they can be
   *  efficiently filtered using the [[Provider-getLogs]] method.
   */
  topics;
  /**
   *  The index within the block this log occurred at. This is generally
   *  not useful to developers, but can be used with the various roots
   *  to proof inclusion within a block.
   */
  index;
  /**
   *  The index within the transaction of this log.
   */
  transactionIndex;
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    this.provider = e;
    const r = Object.freeze(t.topics.slice());
    D(this, {
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
    const { address: t, blockHash: e, blockNumber: r, data: s, index: i, removed: o, topics: a, transactionHash: c, transactionIndex: u } = this;
    return {
      _type: "log",
      address: t,
      blockHash: e,
      blockNumber: r,
      data: s,
      index: i,
      removed: o,
      topics: a,
      transactionHash: c,
      transactionIndex: u
    };
  }
  /**
   *  Returns the block that this log occurred in.
   */
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    return I(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction that this log occurred in.
   */
  async getTransaction() {
    const t = await this.provider.getTransaction(this.transactionHash);
    return I(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  Returns the transaction receipt fot the transaction that this
   *  log occurred in.
   */
  async getTransactionReceipt() {
    const t = await this.provider.getTransactionReceipt(this.transactionHash);
    return I(!!t, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), t;
  }
  /**
   *  @_ignore:
   */
  removedEvent() {
    return hd(this);
  }
}
class kc {
  /**
   *  The provider connected to the log used to fetch additional details
   *  if necessary.
   */
  provider;
  /**
   *  The address the transaction was sent to.
   */
  to;
  /**
   *  The sender of the transaction.
   */
  from;
  /**
   *  The address of the contract if the transaction was directly
   *  responsible for deploying one.
   *
   *  This is non-null **only** if the ``to`` is empty and the ``data``
   *  was successfully executed as initcode.
   */
  contractAddress;
  /**
   *  The transaction hash.
   */
  hash;
  /**
   *  The index of this transaction within the block transactions.
   */
  index;
  /**
   *  The block hash of the [[Block]] this transaction was included in.
   */
  blockHash;
  /**
   *  The block number of the [[Block]] this transaction was included in.
   */
  blockNumber;
  /**
   *  The bloom filter bytes that represent all logs that occurred within
   *  this transaction. This is generally not useful for most developers,
   *  but can be used to validate the included logs.
   */
  logsBloom;
  /**
   *  The actual amount of gas used by this transaction.
   *
   *  When creating a transaction, the amount of gas that will be used can
   *  only be approximated, but the sender must pay the gas fee for the
   *  entire gas limit. After the transaction, the difference is refunded.
   */
  gasUsed;
  /**
   *  The gas used for BLObs. See [[link-eip-4844]].
   */
  blobGasUsed;
  /**
   *  The amount of gas used by all transactions within the block for this
   *  and all transactions with a lower ``index``.
   *
   *  This is generally not useful for developers but can be used to
   *  validate certain aspects of execution.
   */
  cumulativeGasUsed;
  /**
   *  The actual gas price used during execution.
   *
   *  Due to the complexity of [[link-eip-1559]] this value can only
   *  be caluclated after the transaction has been mined, snce the base
   *  fee is protocol-enforced.
   */
  gasPrice;
  /**
   *  The price paid per BLOB in gas. See [[link-eip-4844]].
   */
  blobGasPrice;
  /**
   *  The [[link-eip-2718]] transaction type.
   */
  type;
  //readonly byzantium!: boolean;
  /**
   *  The status of this transaction, indicating success (i.e. ``1``) or
   *  a revert (i.e. ``0``).
   *
   *  This is available in post-byzantium blocks, but some backends may
   *  backfill this value.
   */
  status;
  /**
   *  The root hash of this transaction.
   *
   *  This is no present and was only included in pre-byzantium blocks, but
   *  could be used to validate certain parts of the receipt.
   */
  root;
  #t;
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    this.#t = Object.freeze(t.logs.map((s) => new Yn(s, e)));
    let r = Rc;
    t.effectiveGasPrice != null ? r = t.effectiveGasPrice : t.gasPrice != null && (r = t.gasPrice), D(this, {
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
    return this.#t;
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
      blockNumber: a,
      logsBloom: c,
      logs: u,
      //byzantium, 
      status: f,
      root: l
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: o,
      blockNumber: a,
      //byzantium, 
      contractAddress: r,
      cumulativeGasUsed: at(this.cumulativeGasUsed),
      from: e,
      gasPrice: at(this.gasPrice),
      blobGasUsed: at(this.blobGasUsed),
      blobGasPrice: at(this.blobGasPrice),
      gasUsed: at(this.gasUsed),
      hash: s,
      index: i,
      logs: u,
      logsBloom: c,
      root: l,
      status: f,
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
    return Lc(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(t) {
    return I(!t || t.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), Uc(this, t);
  }
}
class qn {
  /**
   *  The provider this is connected to, which will influence how its
   *  methods will resolve its async inspection methods.
   */
  provider;
  /**
   *  The block number of the block that this transaction was included in.
   *
   *  This is ``null`` for pending transactions.
   */
  blockNumber;
  /**
   *  The blockHash of the block that this transaction was included in.
   *
   *  This is ``null`` for pending transactions.
   */
  blockHash;
  /**
   *  The index within the block that this transaction resides at.
   */
  index;
  /**
   *  The transaction hash.
   */
  hash;
  /**
   *  The [[link-eip-2718]] transaction envelope type. This is
   *  ``0`` for legacy transactions types.
   */
  type;
  /**
   *  The receiver of this transaction.
   *
   *  If ``null``, then the transaction is an initcode transaction.
   *  This means the result of executing the [[data]] will be deployed
   *  as a new contract on chain (assuming it does not revert) and the
   *  address may be computed using [[getCreateAddress]].
   */
  to;
  /**
   *  The sender of this transaction. It is implicitly computed
   *  from the transaction pre-image hash (as the digest) and the
   *  [[signature]] using ecrecover.
   */
  from;
  /**
   *  The nonce, which is used to prevent replay attacks and offer
   *  a method to ensure transactions from a given sender are explicitly
   *  ordered.
   *
   *  When sending a transaction, this must be equal to the number of
   *  transactions ever sent by [[from]].
   */
  nonce;
  /**
   *  The maximum units of gas this transaction can consume. If execution
   *  exceeds this, the entries transaction is reverted and the sender
   *  is charged for the full amount, despite not state changes being made.
   */
  gasLimit;
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
  gasPrice;
  /**
   *  The maximum priority fee (per unit of gas) to allow a
   *  validator to charge the sender. This is inclusive of the
   *  [[maxFeeFeePerGas]].
   */
  maxPriorityFeePerGas;
  /**
   *  The maximum fee (per unit of gas) to allow this transaction
   *  to charge the sender.
   */
  maxFeePerGas;
  /**
   *  The [[link-eip-4844]] max fee per BLOb gas.
   */
  maxFeePerBlobGas;
  /**
   *  The data.
   */
  data;
  /**
   *  The value, in wei. Use [[formatEther]] to format this value
   *  as ether.
   */
  value;
  /**
   *  The chain ID.
   */
  chainId;
  /**
   *  The signature.
   */
  signature;
  /**
   *  The [[link-eip-2930]] access list for transaction types that
   *  support it, otherwise ``null``.
   */
  accessList;
  /**
   *  The [[link-eip-4844]] BLOb versioned hashes.
   */
  blobVersionedHashes;
  #t;
  /**
   *  @_ignore:
   */
  constructor(t, e) {
    this.provider = e, this.blockNumber = t.blockNumber != null ? t.blockNumber : null, this.blockHash = t.blockHash != null ? t.blockHash : null, this.hash = t.hash, this.index = t.index, this.type = t.type, this.from = t.from, this.to = t.to || null, this.gasLimit = t.gasLimit, this.nonce = t.nonce, this.data = t.data, this.value = t.value, this.gasPrice = t.gasPrice, this.maxPriorityFeePerGas = t.maxPriorityFeePerGas != null ? t.maxPriorityFeePerGas : null, this.maxFeePerGas = t.maxFeePerGas != null ? t.maxFeePerGas : null, this.maxFeePerBlobGas = t.maxFeePerBlobGas != null ? t.maxFeePerBlobGas : null, this.chainId = t.chainId, this.signature = t.signature, this.accessList = t.accessList != null ? t.accessList : null, this.blobVersionedHashes = t.blobVersionedHashes != null ? t.blobVersionedHashes : null, this.#t = -1;
  }
  /**
   *  Returns a JSON-compatible representation of this transaction.
   */
  toJSON() {
    const { blockNumber: t, blockHash: e, index: r, hash: s, type: i, to: o, from: a, nonce: c, data: u, signature: f, accessList: l, blobVersionedHashes: d } = this;
    return {
      _type: "TransactionResponse",
      accessList: l,
      blockNumber: t,
      blockHash: e,
      blobVersionedHashes: d,
      chainId: at(this.chainId),
      data: u,
      from: a,
      gasLimit: at(this.gasLimit),
      gasPrice: at(this.gasPrice),
      hash: s,
      maxFeePerGas: at(this.maxFeePerGas),
      maxPriorityFeePerGas: at(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: at(this.maxFeePerBlobGas),
      nonce: c,
      signature: f,
      to: o,
      index: r,
      type: i,
      value: at(this.value)
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
      const { tx: e, blockNumber: r } = await Bt({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber()
      });
      return e == null || e.blockNumber == null ? 0 : r - e.blockNumber + 1;
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
    let i = this.#t, o = -1, a = i === -1;
    const c = async () => {
      if (a)
        return null;
      const { blockNumber: d, nonce: y } = await Bt({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (y < this.nonce) {
        i = d;
        return;
      }
      if (a)
        return null;
      const m = await this.getTransaction();
      if (!(m && m.blockNumber != null))
        for (o === -1 && (o = i - 3, o < this.#t && (o = this.#t)); o <= d; ) {
          if (a)
            return null;
          const h = await this.provider.getBlock(o, !0);
          if (h == null)
            return;
          for (const p of h)
            if (p === this.hash)
              return;
          for (let p = 0; p < h.length; p++) {
            const w = await h.getTransaction(p);
            if (w.from === this.from && w.nonce === this.nonce) {
              if (a)
                return null;
              const x = await this.provider.getTransactionReceipt(w.hash);
              if (x == null || d - x.blockNumber + 1 < r)
                return;
              let E = "replaced";
              w.data === this.data && w.to === this.to && w.value === this.value ? E = "repriced" : w.data === "0x" && w.from === w.to && w.value === Rc && (E = "cancelled"), I(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: E === "replaced" || E === "cancelled",
                reason: E,
                replacement: w.replaceableTransaction(i),
                hash: w.hash,
                receipt: x
              });
            }
          }
          o++;
        }
    }, u = (d) => {
      if (d == null || d.status !== 0)
        return d;
      I(!1, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: d.to,
          from: d.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: d
      });
    }, f = await this.provider.getTransactionReceipt(this.hash);
    if (r === 0)
      return u(f);
    if (f) {
      if (await f.confirmations() >= r)
        return u(f);
    } else if (await c(), r === 0)
      return null;
    return await new Promise((d, y) => {
      const m = [], h = () => {
        m.forEach((w) => w());
      };
      if (m.push(() => {
        a = !0;
      }), s > 0) {
        const w = setTimeout(() => {
          h(), y(nt("wait for transaction timeout", "TIMEOUT"));
        }, s);
        m.push(() => {
          clearTimeout(w);
        });
      }
      const p = async (w) => {
        if (await w.confirmations() >= r) {
          h();
          try {
            d(u(w));
          } catch (x) {
            y(x);
          }
        }
      };
      if (m.push(() => {
        this.provider.off(this.hash, p);
      }), this.provider.on(this.hash, p), i >= 0) {
        const w = async () => {
          try {
            await c();
          } catch (x) {
            if (Et(x, "TRANSACTION_REPLACED")) {
              h(), y(x);
              return;
            }
          }
          a || this.provider.once("block", w);
        };
        m.push(() => {
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
    return I(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Lc(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(t) {
    return I(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), I(!t || t.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), Uc(this, t);
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
    g(Number.isInteger(t) && t >= 0, "invalid startBlock", "startBlock", t);
    const e = new qn(this, this.provider);
    return e.#t = t, e;
  }
}
function fd(n) {
  return { orphan: "drop-block", hash: n.hash, number: n.number };
}
function Uc(n, t) {
  return { orphan: "reorder-transaction", tx: n, other: t };
}
function Lc(n) {
  return { orphan: "drop-transaction", tx: n };
}
function hd(n) {
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
class fi extends Yn {
  /**
   *  The Contract Interface.
   */
  interface;
  /**
   *  The matching event.
   */
  fragment;
  /**
   *  The parsed arguments passed to the event by ``emit``.
   */
  args;
  /**
   * @_ignore:
   */
  constructor(t, e, r) {
    super(t, t.provider);
    const s = e.decodeEventLog(r, t.data, t.topics);
    D(this, { args: s, fragment: r, interface: e });
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
class Dc extends Yn {
  /**
   *  The error encounted when trying to decode the log.
   */
  error;
  /**
   * @_ignore:
   */
  constructor(t, e) {
    super(t, t.provider), D(this, { error: e });
  }
}
class dd extends kc {
  #t;
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    super(r, e), this.#t = t;
  }
  /**
   *  The parsed logs for any [[Log]] which has a matching event in the
   *  Contract ABI.
   */
  get logs() {
    return super.logs.map((t) => {
      const e = t.topics.length ? this.#t.getEvent(t.topics[0]) : null;
      if (e)
        try {
          return new fi(t, this.#t, e);
        } catch (r) {
          return new Dc(t, r);
        }
      return t;
    });
  }
}
class hi extends qn {
  #t;
  /**
   *  @_ignore:
   */
  constructor(t, e, r) {
    super(r, e), this.#t = t;
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
    return r == null ? null : new dd(this.#t, this.provider, r);
  }
}
class Fc extends ua {
  /**
   *  The log with no matching events.
   */
  log;
  /**
   *  @_event:
   */
  constructor(t, e, r, s) {
    super(t, e, r), D(this, { log: s });
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
class gd extends Fc {
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s, i) {
    super(t, e, r, new fi(i, t.interface, s));
    const o = t.interface.decodeEventLog(s, this.log.data, this.log.topics);
    D(this, { args: o, fragment: s });
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
const Co = BigInt(0);
function Mc(n) {
  return n && typeof n.call == "function";
}
function _c(n) {
  return n && typeof n.estimateGas == "function";
}
function Vr(n) {
  return n && typeof n.resolveName == "function";
}
function Hc(n) {
  return n && typeof n.sendTransaction == "function";
}
function Gc(n) {
  if (n != null) {
    if (Vr(n))
      return n;
    if (n.provider)
      return n.provider;
  }
}
class pd {
  #t;
  fragment;
  constructor(t, e, r) {
    if (D(this, { fragment: e }), e.inputs.length < r.length)
      throw new Error("too many arguments");
    const s = Xe(t.runner, "resolveName"), i = Vr(s) ? s : null;
    this.#t = async function() {
      const o = await Promise.all(e.inputs.map((a, c) => r[c] == null ? null : a.walkAsync(r[c], (f, l) => f === "address" ? Array.isArray(l) ? Promise.all(l.map((d) => Ot(d, i))) : Ot(l, i) : l)));
      return t.interface.encodeFilterTopics(e, o);
    }();
  }
  getTopicFilter() {
    return this.#t;
  }
}
function Xe(n, t) {
  return n == null ? null : typeof n[t] == "function" ? n : n.provider && typeof n.provider[t] == "function" ? n.provider : null;
}
function He(n) {
  return n == null ? null : n.provider || null;
}
async function Vc(n, t) {
  const e = st.dereference(n, "overrides");
  g(typeof e == "object", "invalid overrides parameter", "overrides", n);
  const r = Or(e);
  return g(r.to == null || (t || []).indexOf("to") >= 0, "cannot override to", "overrides.to", r.to), g(r.data == null || (t || []).indexOf("data") >= 0, "cannot override data", "overrides.data", r.data), r.from && (r.from = r.from), r;
}
async function yd(n, t, e) {
  const r = Xe(n, "resolveName"), s = Vr(r) ? r : null;
  return await Promise.all(t.map((i, o) => i.walkAsync(e[o], (a, c) => (c = st.dereference(c, a), a === "address" ? Ot(c, s) : c))));
}
function wd(n) {
  const t = async function(o) {
    const a = await Vc(o, ["data"]);
    a.to = await n.getAddress(), a.from && (a.from = await Ot(a.from, Gc(n.runner)));
    const c = n.interface, u = k(a.value || Co, "overrides.value") === Co, f = (a.data || "0x") === "0x";
    c.fallback && !c.fallback.payable && c.receive && !f && !u && g(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", o), g(c.fallback || f, "cannot send data to receive-only contract", "overrides.data", a.data);
    const l = c.receive || c.fallback && c.fallback.payable;
    return g(l || u, "cannot send value to non-payable fallback", "overrides.value", a.value), g(c.fallback || f, "cannot send data to receive-only contract", "overrides.data", a.data), a;
  }, e = async function(o) {
    const a = Xe(n.runner, "call");
    I(Mc(a), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const c = await t(o);
    try {
      return await a.call(c);
    } catch (u) {
      throw Js(u) && u.data ? n.interface.makeError(u.data, c) : u;
    }
  }, r = async function(o) {
    const a = n.runner;
    I(Hc(a), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const c = await a.sendTransaction(await t(o)), u = He(n.runner);
    return new hi(n.interface, u, c);
  }, s = async function(o) {
    const a = Xe(n.runner, "estimateGas");
    return I(_c(a), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await a.estimateGas(await t(o));
  }, i = async (o) => await r(o);
  return D(i, {
    _contract: n,
    estimateGas: s,
    populateTransaction: t,
    send: r,
    staticCall: e
  }), i;
}
function md(n, t) {
  const e = function(...u) {
    const f = n.interface.getFunction(t, u);
    return I(f, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: u }
    }), f;
  }, r = async function(...u) {
    const f = e(...u);
    let l = {};
    if (f.inputs.length + 1 === u.length && (l = await Vc(u.pop()), l.from && (l.from = await Ot(l.from, Gc(n.runner)))), f.inputs.length !== u.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const d = await yd(n.runner, f.inputs, u);
    return Object.assign({}, l, await Bt({
      to: n.getAddress(),
      data: n.interface.encodeFunctionData(f, d)
    }));
  }, s = async function(...u) {
    const f = await a(...u);
    return f.length === 1 ? f[0] : f;
  }, i = async function(...u) {
    const f = n.runner;
    I(Hc(f), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const l = await f.sendTransaction(await r(...u)), d = He(n.runner);
    return new hi(n.interface, d, l);
  }, o = async function(...u) {
    const f = Xe(n.runner, "estimateGas");
    return I(_c(f), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await f.estimateGas(await r(...u));
  }, a = async function(...u) {
    const f = Xe(n.runner, "call");
    I(Mc(f), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const l = await r(...u);
    let d = "0x";
    try {
      d = await f.call(l);
    } catch (m) {
      throw Js(m) && m.data ? n.interface.makeError(m.data, l) : m;
    }
    const y = e(...u);
    return n.interface.decodeFunctionResult(y, d);
  }, c = async (...u) => e(...u).constant ? await s(...u) : await i(...u);
  return D(c, {
    name: n.interface.getFunctionName(t),
    _contract: n,
    _key: t,
    getFragment: e,
    estimateGas: o,
    populateTransaction: r,
    send: i,
    staticCall: s,
    staticCallResult: a
  }), Object.defineProperty(c, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const u = n.interface.getFunction(t);
      return I(u, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), u;
    }
  }), c;
}
function Ad(n, t) {
  const e = function(...s) {
    const i = n.interface.getEvent(t, s);
    return I(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: s }
    }), i;
  }, r = function(...s) {
    return new pd(n, e(...s), s);
  };
  return D(r, {
    name: n.interface.getEventName(t),
    _contract: n,
    _key: t,
    getFragment: e
  }), Object.defineProperty(r, "fragment", {
    configurable: !1,
    enumerable: !0,
    get: () => {
      const s = n.interface.getEvent(t);
      return I(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), s;
    }
  }), r;
}
const Cr = Symbol.for("_ethersInternal_contract"), Qc = /* @__PURE__ */ new WeakMap();
function bd(n, t) {
  Qc.set(n[Cr], t);
}
function Dt(n) {
  return Qc.get(n[Cr]);
}
function Ed(n) {
  return n && typeof n == "object" && "getTopicFilter" in n && typeof n.getTopicFilter == "function" && n.fragment;
}
async function di(n, t) {
  let e, r = null;
  if (Array.isArray(t)) {
    const i = function(o) {
      if (q(o, 32))
        return o;
      const a = n.interface.getEvent(o);
      return g(a, "unknown fragment", "name", o), a.topicHash;
    };
    e = t.map((o) => o == null ? null : Array.isArray(o) ? o.map(i) : i(o));
  } else t === "*" ? e = [null] : typeof t == "string" ? q(t, 32) ? e = [t] : (r = n.interface.getEvent(t), g(r, "unknown fragment", "event", t), e = [r.topicHash]) : Ed(t) ? e = await t.getTopicFilter() : "fragment" in t ? (r = t.fragment, e = [r.topicHash]) : g(!1, "unknown event name", "event", t);
  e = e.map((i) => {
    if (i == null)
      return null;
    if (Array.isArray(i)) {
      const o = Array.from(new Set(i.map((a) => a.toLowerCase())).values());
      return o.length === 1 ? o[0] : (o.sort(), o);
    }
    return i.toLowerCase();
  });
  const s = e.map((i) => i == null ? "null" : Array.isArray(i) ? i.join("|") : i).join("&");
  return { fragment: r, tag: s, topics: e };
}
async function Fn(n, t) {
  const { subs: e } = Dt(n);
  return e.get((await di(n, t)).tag) || null;
}
async function vo(n, t, e) {
  const r = He(n.runner);
  I(r, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: t });
  const { fragment: s, tag: i, topics: o } = await di(n, e), { addr: a, subs: c } = Dt(n);
  let u = c.get(i);
  if (!u) {
    const l = { address: a || n, topics: o }, d = (p) => {
      let w = s;
      if (w == null)
        try {
          w = n.interface.getEvent(p.topics[0]);
        } catch {
        }
      if (w) {
        const x = w, E = s ? n.interface.decodeEventLog(s, p.data, p.topics) : [];
        Ms(n, e, E, (C) => new gd(n, C, e, x, p));
      } else
        Ms(n, e, [], (x) => new Fc(n, x, e, p));
    };
    let y = [];
    u = { tag: i, listeners: [], start: () => {
      y.length || y.push(r.on(l, d));
    }, stop: async () => {
      if (y.length == 0)
        return;
      let p = y;
      y = [], await Promise.all(p), r.off(l, d);
    } }, c.set(i, u);
  }
  return u;
}
let Fs = Promise.resolve();
async function xd(n, t, e, r) {
  await Fs;
  const s = await Fn(n, t);
  if (!s)
    return !1;
  const i = s.listeners.length;
  return s.listeners = s.listeners.filter(({ listener: o, once: a }) => {
    const c = Array.from(e);
    r && c.push(r(a ? null : o));
    try {
      o.call(n, ...c);
    } catch {
    }
    return !a;
  }), s.listeners.length === 0 && (s.stop(), Dt(n).subs.delete(s.tag)), i > 0;
}
async function Ms(n, t, e, r) {
  try {
    await Fs;
  } catch {
  }
  const s = xd(n, t, e, r);
  return Fs = s, await s;
}
const fr = ["then"];
class _n {
  /**
   *  The target to connect to.
   *
   *  This can be an address, ENS name or any [[Addressable]], such as
   *  another contract. To get the resovled address, use the ``getAddress``
   *  method.
   */
  target;
  /**
   *  The contract Interface.
   */
  interface;
  /**
   *  The connected runner. This is generally a [[Provider]] or a
   *  [[Signer]], which dictates what operations are supported.
   *
   *  For example, a **Contract** connected to a [[Provider]] may
   *  only execute read-only operations.
   */
  runner;
  /**
   *  All the Events available on this contract.
   */
  filters;
  /**
   *  @_ignore:
   */
  [Cr];
  /**
   *  The fallback or receive function if any.
   */
  fallback;
  /**
   *  Creates a new contract connected to %%target%% with the %%abi%% and
   *  optionally connected to a %%runner%% to perform operations on behalf
   *  of.
   */
  constructor(t, e, r, s) {
    g(typeof t == "string" || Za(t), "invalid value for Contract target", "target", t), r == null && (r = null);
    const i = Vt.from(e);
    D(this, { target: t, runner: r, interface: i }), Object.defineProperty(this, Cr, { value: {} });
    let o, a = null, c = null;
    if (s) {
      const l = He(r);
      c = new hi(this.interface, l, s);
    }
    let u = /* @__PURE__ */ new Map();
    if (typeof t == "string")
      if (q(t))
        a = t, o = Promise.resolve(t);
      else {
        const l = Xe(r, "resolveName");
        if (!Vr(l))
          throw nt("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        o = l.resolveName(t).then((d) => {
          if (d == null)
            throw nt("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: t
            });
          return Dt(this).addr = d, d;
        });
      }
    else
      o = t.getAddress().then((l) => {
        if (l == null)
          throw new Error("TODO");
        return Dt(this).addr = l, l;
      });
    bd(this, { addrPromise: o, addr: a, deployTx: c, subs: u });
    const f = new Proxy({}, {
      get: (l, d, y) => {
        if (typeof d == "symbol" || fr.indexOf(d) >= 0)
          return Reflect.get(l, d, y);
        try {
          return this.getEvent(d);
        } catch (m) {
          if (!Et(m, "INVALID_ARGUMENT") || m.argument !== "key")
            throw m;
        }
      },
      has: (l, d) => fr.indexOf(d) >= 0 ? Reflect.has(l, d) : Reflect.has(l, d) || this.interface.hasEvent(String(d))
    });
    return D(this, { filters: f }), D(this, {
      fallback: i.receive || i.fallback ? wd(this) : null
    }), new Proxy(this, {
      get: (l, d, y) => {
        if (typeof d == "symbol" || d in l || fr.indexOf(d) >= 0)
          return Reflect.get(l, d, y);
        try {
          return l.getFunction(d);
        } catch (m) {
          if (!Et(m, "INVALID_ARGUMENT") || m.argument !== "key")
            throw m;
        }
      },
      has: (l, d) => typeof d == "symbol" || d in l || fr.indexOf(d) >= 0 ? Reflect.has(l, d) : l.interface.hasFunction(d)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(t) {
    return new _n(this.target, this.interface, t);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(t) {
    return new _n(t, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await Dt(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const t = He(this.runner);
    I(t, "runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "getDeployedCode" });
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
    const r = He(this.runner);
    return I(r != null, "contract runner does not support .provider", "UNSUPPORTED_OPERATION", { operation: "waitForDeployment" }), new Promise((s, i) => {
      const o = async () => {
        try {
          if (await this.getDeployedCode() != null)
            return s(this);
          r.once("block", o);
        } catch (a) {
          i(a);
        }
      };
      o();
    });
  }
  /**
   *  Return the transaction used to deploy this contract.
   *
   *  This is only available if this instance was returned from a
   *  [[ContractFactory]].
   */
  deploymentTransaction() {
    return Dt(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(t) {
    return typeof t != "string" && (t = t.format()), md(this, t);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(t) {
    return typeof t != "string" && (t = t.format()), Ad(this, t);
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
    const { addr: s, addrPromise: i } = Dt(this), o = s || await i, { fragment: a, topics: c } = await di(this, t), u = { address: o, topics: c, fromBlock: e, toBlock: r }, f = He(this.runner);
    return I(f, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await f.getLogs(u)).map((l) => {
      let d = a;
      if (d == null)
        try {
          d = this.interface.getEvent(l.topics[0]);
        } catch {
        }
      if (d)
        try {
          return new fi(l, this.interface, d);
        } catch (y) {
          return new Dc(l, y);
        }
      return new Yn(l, f);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(t, e) {
    const r = await vo(this, "on", t);
    return r.listeners.push({ listener: e, once: !1 }), r.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(t, e) {
    const r = await vo(this, "once", t);
    return r.listeners.push({ listener: e, once: !0 }), r.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(t, ...e) {
    return await Ms(this, t, e, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(t) {
    if (t) {
      const s = await Fn(this, t);
      return s ? s.listeners.length : 0;
    }
    const { subs: e } = Dt(this);
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
      const s = await Fn(this, t);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: e } = Dt(this);
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
    const r = await Fn(this, t);
    if (!r)
      return this;
    if (e) {
      const s = r.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && r.listeners.splice(s, 1);
    }
    return (e == null || r.listeners.length === 0) && (r.stop(), Dt(this).subs.delete(r.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(t) {
    if (t) {
      const e = await Fn(this, t);
      if (!e)
        return this;
      e.stop(), Dt(this).subs.delete(e.tag);
    } else {
      const { subs: e } = Dt(this);
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
    class e extends _n {
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
}
function Id() {
  return _n;
}
class Ke extends Id() {
}
function cs(n) {
  return n.match(/^ipfs:\/\/ipfs\//i) ? n = n.substring(12) : n.match(/^ipfs:\/\//i) ? n = n.substring(7) : g(!1, "unsupported IPFS format", "link", n), `https://gateway.ipfs.io/ipfs/${n}`;
}
class Nd {
  /**
   *  The name.
   */
  name;
  /**
   *  Creates a new **MulticoinProviderPluing** for %%name%%.
   */
  constructor(t) {
    D(this, { name: t });
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
const zc = new RegExp("^(ipfs)://(.*)$", "i"), So = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  zc,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
class yn {
  /**
   *  The connected provider.
   */
  provider;
  /**
   *  The address of the resolver.
   */
  address;
  /**
   *  The name this resolver was resolved against.
   */
  name;
  // For EIP-2544 names, the ancestor that provided the resolver
  #t;
  #e;
  constructor(t, e, r) {
    D(this, { provider: t, address: e, name: r }), this.#t = null, this.#e = new Ke(e, [
      "function supportsInterface(bytes4) view returns (bool)",
      "function resolve(bytes, bytes) view returns (bytes)",
      "function addr(bytes32) view returns (address)",
      "function addr(bytes32, uint) view returns (bytes)",
      "function text(bytes32, string) view returns (string)",
      "function contenthash(bytes32) view returns (bytes)"
    ], t);
  }
  /**
   *  Resolves to true if the resolver supports wildcard resolution.
   */
  async supportsWildcard() {
    return this.#t == null && (this.#t = (async () => {
      try {
        return await this.#e.supportsInterface("0x9061b923");
      } catch (t) {
        if (Et(t, "CALL_EXCEPTION"))
          return !1;
        throw this.#t = null, t;
      }
    })()), await this.#t;
  }
  async #n(t, e) {
    e = (e || []).slice();
    const r = this.#e.interface;
    e.unshift(Ls(this.name));
    let s = null;
    await this.supportsWildcard() && (s = r.getFunction(t), I(s, "missing fragment", "UNKNOWN_ERROR", {
      info: { funcName: t }
    }), e = [
      Ah(this.name, 255),
      r.encodeFunctionData(s, e)
    ], t = "resolve(bytes,bytes)"), e.push({
      enableCcipRead: !0
    });
    try {
      const i = await this.#e[t](...e);
      return s ? r.decodeFunctionResult(s, i)[0] : i;
    } catch (i) {
      if (!Et(i, "CALL_EXCEPTION"))
        throw i;
    }
    return null;
  }
  /**
   *  Resolves to the address for %%coinType%% or null if the
   *  provided %%coinType%% has not been configured.
   */
  async getAddress(t) {
    if (t == null && (t = 60), t === 60)
      try {
        const i = await this.#n("addr(bytes32)");
        return i == null || i === xn ? null : i;
      } catch (i) {
        if (Et(i, "CALL_EXCEPTION"))
          return null;
        throw i;
      }
    if (t >= 0 && t < 2147483648) {
      let i = t + 2147483648;
      const o = await this.#n("addr(bytes32,uint)", [i]);
      if (q(o, 20))
        return Z(o);
    }
    let e = null;
    for (const i of this.provider.plugins)
      if (i instanceof Nd && i.supportsCoinType(t)) {
        e = i;
        break;
      }
    if (e == null)
      return null;
    const r = await this.#n("addr(bytes32,uint)", [t]);
    if (r == null || r === "0x")
      return null;
    const s = await e.decodeAddress(t, r);
    if (s != null)
      return s;
    I(!1, "invalid coin data", "UNSUPPORTED_OPERATION", {
      operation: `getAddress(${t})`,
      info: { coinType: t, data: r }
    });
  }
  /**
   *  Resolves to the EIP-634 text record for %%key%%, or ``null``
   *  if unconfigured.
   */
  async getText(t) {
    const e = await this.#n("text(bytes32,string)", [t]);
    return e == null || e === "0x" ? null : e;
  }
  /**
   *  Rsolves to the content-hash or ``null`` if unconfigured.
   */
  async getContentHash() {
    const t = await this.#n("contenthash(bytes32)");
    if (t == null || t === "0x")
      return null;
    const e = t.match(/^0x(e3010170|e5010172)(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
    if (e) {
      const s = e[1] === "e3010170" ? "ipfs" : "ipns", i = parseInt(e[4], 16);
      if (e[5].length === i * 2)
        return `${s}://${Pu("0x" + e[2])}`;
    }
    const r = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
    if (r && r[1].length === 64)
      return `bzz://${r[1]}`;
    I(!1, "invalid or unsupported content hash data", "UNSUPPORTED_OPERATION", {
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
      for (let r = 0; r < So.length; r++) {
        const s = e.match(So[r]);
        if (s == null)
          continue;
        const i = s[1].toLowerCase();
        switch (i) {
          case "https":
          case "data":
            return t.push({ type: "url", value: e }), { linkage: t, url: e };
          case "ipfs": {
            const o = cs(e);
            return t.push({ type: "ipfs", value: e }), t.push({ type: "url", value: o }), { linkage: t, url: o };
          }
          case "erc721":
          case "erc1155": {
            const o = i === "erc721" ? "tokenURI(uint256)" : "uri(uint256)";
            t.push({ type: i, value: e });
            const a = await this.getAddress();
            if (a == null)
              return t.push({ type: "!owner", value: "" }), { url: null, linkage: t };
            const c = (s[2] || "").split("/");
            if (c.length !== 2)
              return t.push({ type: `!${i}caip`, value: s[2] || "" }), { url: null, linkage: t };
            const u = c[1], f = new Ke(c[0], [
              // ERC-721
              "function tokenURI(uint) view returns (string)",
              "function ownerOf(uint) view returns (address)",
              // ERC-1155
              "function uri(uint) view returns (string)",
              "function balanceOf(address, uint256) view returns (uint)"
            ], this.provider);
            if (i === "erc721") {
              const h = await f.ownerOf(u);
              if (a !== h)
                return t.push({ type: "!owner", value: h }), { url: null, linkage: t };
              t.push({ type: "owner", value: h });
            } else if (i === "erc1155") {
              const h = await f.balanceOf(a, u);
              if (!h)
                return t.push({ type: "!balance", value: "0" }), { url: null, linkage: t };
              t.push({ type: "balance", value: h.toString() });
            }
            let l = await f[o](u);
            if (l == null || l === "0x")
              return t.push({ type: "!metadata-url", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata-url-base", value: l }), i === "erc1155" && (l = l.replace("{id}", Te(u, 32).substring(2)), t.push({ type: "metadata-url-expanded", value: l })), l.match(/^ipfs:/i) && (l = cs(l)), t.push({ type: "metadata-url", value: l });
            let d = {};
            const y = await new re(l).send();
            y.assertOk();
            try {
              d = y.bodyJson;
            } catch {
              try {
                t.push({ type: "!metadata", value: y.bodyText });
              } catch {
                const w = y.body;
                return w && t.push({ type: "!metadata", value: S(w) }), { url: null, linkage: t };
              }
              return { url: null, linkage: t };
            }
            if (!d)
              return t.push({ type: "!metadata", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata", value: JSON.stringify(d) });
            let m = d.image;
            if (typeof m != "string")
              return t.push({ type: "!imageUrl", value: "" }), { url: null, linkage: t };
            if (!m.match(/^(https:\/\/|data:)/i)) {
              if (m.match(zc) == null)
                return t.push({ type: "!imageUrl-ipfs", value: m }), { url: null, linkage: t };
              t.push({ type: "imageUrl-ipfs", value: m }), m = cs(m);
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
    const e = await t.getNetwork(), r = e.getPlugin("org.ethers.plugins.network.Ens");
    return I(r, "network does not support ENS", "UNSUPPORTED_OPERATION", {
      operation: "getEnsAddress",
      info: { network: e }
    }), r.address;
  }
  static async #r(t, e) {
    const r = await yn.getEnsAddress(t);
    try {
      const i = await new Ke(r, [
        "function resolver(bytes32) view returns (address)"
      ], t).resolver(Ls(e), {
        enableCcipRead: !0
      });
      return i === xn ? null : i;
    } catch (s) {
      throw s;
    }
    return null;
  }
  /**
   *  Resolve to the ENS resolver for %%name%% using %%provider%% or
   *  ``null`` if unconfigured.
   */
  static async fromName(t, e) {
    let r = e;
    for (; ; ) {
      if (r === "" || r === "." || e !== "eth" && r === "eth")
        return null;
      const s = await yn.#r(t, r);
      if (s != null) {
        const i = new yn(t, s, e);
        return r !== e && !await i.supportsWildcard() ? null : i;
      }
      r = r.split(".").slice(1).join(".");
    }
  }
}
const Ro = BigInt(0);
function z(n, t) {
  return function(e) {
    return e == null ? t : n(e);
  };
}
function Qr(n, t) {
  return (e) => {
    if (t && e == null)
      return null;
    if (!Array.isArray(e))
      throw new Error("not an array");
    return e.map((r) => n(r));
  };
}
function Xn(n, t) {
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
        const a = o instanceof Error ? o.message : "not-an-error";
        I(!1, `invalid value for value.${s} (${a})`, "BAD_DATA", { value: e });
      }
    }
    return r;
  };
}
function Bd(n) {
  switch (n) {
    case !0:
    case "true":
      return !0;
    case !1:
    case "false":
      return !1;
  }
  g(!1, `invalid boolean; ${JSON.stringify(n)}`, "value", n);
}
function Bn(n) {
  return g(q(n, !0), "invalid data", "value", n), n;
}
function At(n) {
  return g(q(n, 32), "invalid hash", "value", n), n;
}
const Td = Xn({
  address: Z,
  blockHash: At,
  blockNumber: G,
  data: Bn,
  index: G,
  removed: z(Bd, !1),
  topics: Qr(At),
  transactionHash: At,
  transactionIndex: G
}, {
  index: ["logIndex"]
});
function Pd(n) {
  return Td(n);
}
const Od = Xn({
  hash: z(At),
  parentHash: At,
  parentBeaconBlockRoot: z(At, null),
  number: G,
  timestamp: G,
  nonce: z(Bn),
  difficulty: k,
  gasLimit: k,
  gasUsed: k,
  stateRoot: z(At, null),
  receiptsRoot: z(At, null),
  blobGasUsed: z(k, null),
  excessBlobGas: z(k, null),
  miner: z(Z),
  prevRandao: z(At, null),
  extraData: Bn,
  baseFeePerGas: z(k)
}, {
  prevRandao: ["mixHash"]
});
function Cd(n) {
  const t = Od(n);
  return t.transactions = n.transactions.map((e) => typeof e == "string" ? e : Kc(e)), t;
}
const vd = Xn({
  transactionIndex: G,
  blockNumber: G,
  transactionHash: At,
  address: Z,
  topics: Qr(At),
  data: Bn,
  index: G,
  blockHash: At
}, {
  index: ["logIndex"]
});
function Sd(n) {
  return vd(n);
}
const Rd = Xn({
  to: z(Z, null),
  from: z(Z, null),
  contractAddress: z(Z, null),
  // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
  index: G,
  root: z(S),
  gasUsed: k,
  blobGasUsed: z(k, null),
  logsBloom: z(Bn),
  blockHash: At,
  hash: At,
  logs: Qr(Sd),
  blockNumber: G,
  //confirmations: allowNull(getNumber, null),
  cumulativeGasUsed: k,
  effectiveGasPrice: z(k),
  blobGasPrice: z(k, null),
  status: z(G),
  type: z(G, 0)
}, {
  effectiveGasPrice: ["gasPrice"],
  hash: ["transactionHash"],
  index: ["transactionIndex"]
});
function kd(n) {
  return Rd(n);
}
function Kc(n) {
  n.to && k(n.to) === Ro && (n.to = "0x0000000000000000000000000000000000000000");
  const t = Xn({
    hash: At,
    // Some nodes do not return this, usually test nodes (like Ganache)
    index: z(G, void 0),
    type: (e) => e === "0x" || e == null ? 0 : G(e),
    accessList: z(nn, null),
    blobVersionedHashes: z(Qr(At, !0), null),
    blockHash: z(At, null),
    blockNumber: z(G, null),
    transactionIndex: z(G, null),
    from: Z,
    // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas) must be set
    gasPrice: z(k),
    maxPriorityFeePerGas: z(k),
    maxFeePerGas: z(k),
    maxFeePerBlobGas: z(k, null),
    gasLimit: k,
    to: z(Z, null),
    value: k,
    nonce: G,
    data: Bn,
    creates: z(Z, null),
    chainId: z(k, null)
  }, {
    data: ["input"],
    gasLimit: ["gas"],
    index: ["transactionIndex"]
  })(n);
  if (t.to == null && t.creates == null && (t.creates = xf(t)), (n.type === 1 || n.type === 2) && n.accessList == null && (t.accessList = []), n.signature ? t.signature = ht.from(n.signature) : t.signature = ht.from(n), t.chainId == null) {
    const e = t.signature.legacyChainId;
    e != null && (t.chainId = e);
  }
  return t.blockHash && k(t.blockHash) === Ro && (t.blockHash = null), t;
}
const Ud = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class tr {
  /**
   *  The name of the plugin.
   *
   *  It is recommended to use reverse-domain-notation, which permits
   *  unique names with a known authority as well as hierarchal entries.
   */
  name;
  /**
   *  Creates a new **NetworkPlugin**.
   */
  constructor(t) {
    D(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new tr(this.name);
  }
}
class zr extends tr {
  /**
   *  The block number to treat these values as valid from.
   *
   *  This allows a hardfork to have updated values included as well as
   *  mulutiple hardforks to be supported.
   */
  effectiveBlock;
  /**
   *  The transactions base fee.
   */
  txBase;
  /**
   *  The fee for creating a new account.
   */
  txCreate;
  /**
   *  The fee per zero-byte in the data.
   */
  txDataZero;
  /**
   *  The fee per non-zero-byte in the data.
   */
  txDataNonzero;
  /**
   *  The fee per storage key in the [[link-eip-2930]] access list.
   */
  txAccessListStorageKey;
  /**
   *  The fee per address in the [[link-eip-2930]] access list.
   */
  txAccessListAddress;
  /**
   *  Creates a new GasCostPlugin from %%effectiveBlock%% until the
   *  latest block or another GasCostPlugin supercedes that block number,
   *  with the associated %%costs%%.
   */
  constructor(t, e) {
    t == null && (t = 0), super(`org.ethers.network.plugins.GasCost#${t || 0}`);
    const r = { effectiveBlock: t };
    function s(i, o) {
      let a = (e || {})[i];
      a == null && (a = o), g(typeof a == "number", `invalud value for ${i}`, "costs", e), r[i] = a;
    }
    s("txBase", 21e3), s("txCreate", 32e3), s("txDataZero", 4), s("txDataNonzero", 16), s("txAccessListStorageKey", 1900), s("txAccessListAddress", 2400), D(this, r);
  }
  clone() {
    return new zr(this.effectiveBlock, this);
  }
}
class Kr extends tr {
  /**
   *  The ENS Registrty Contract address.
   */
  address;
  /**
   *  The chain ID that the ENS contract lives on.
   */
  targetNetwork;
  /**
   *  Creates a new **EnsPlugin** connected to %%address%% on the
   *  %%targetNetwork%%. The default ENS address and mainnet is used
   *  if unspecified.
   */
  constructor(t, e) {
    super("org.ethers.plugins.network.Ens"), D(this, {
      address: t || Ud,
      targetNetwork: e ?? 1
    });
  }
  clone() {
    return new Kr(this.address, this.targetNetwork);
  }
}
class Ld extends tr {
  #t;
  #e;
  /**
   *  The URL to initialize the FetchRequest with in %%processFunc%%.
   */
  get url() {
    return this.#t;
  }
  /**
   *  The callback to use when computing the FeeData.
   */
  get processFunc() {
    return this.#e;
  }
  /**
   *  Creates a new **FetchUrlFeeDataNetworkPlugin** which will
   *  be used when computing the fee data for the network.
   */
  constructor(t, e) {
    super("org.ethers.plugins.network.FetchUrlFeeDataPlugin"), this.#t = t, this.#e = e;
  }
  // We are immutable, so we can serve as our own clone
  clone() {
    return this;
  }
}
const us = /* @__PURE__ */ new Map();
class Ft {
  #t;
  #e;
  #n;
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, e) {
    this.#t = t, this.#e = k(e), this.#n = /* @__PURE__ */ new Map();
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
    return this.#t;
  }
  set name(t) {
    this.#t = t;
  }
  /**
   *  The network chain ID.
   */
  get chainId() {
    return this.#e;
  }
  set chainId(t) {
    this.#e = k(t, "chainId");
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
        return this.chainId === k(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === k(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === k(t.chainId);
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
    return Array.from(this.#n.values());
  }
  /**
   *  Attach a new %%plugin%% to this Network. The network name
   *  must be unique, excluding any fragment.
   */
  attachPlugin(t) {
    if (this.#n.get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return this.#n.set(t.name, t.clone()), this;
  }
  /**
   *  Return the plugin, if any, matching %%name%% exactly. Plugins
   *  with fragments will not be returned unless %%name%% includes
   *  a fragment.
   */
  getPlugin(t) {
    return this.#n.get(t) || null;
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
    const t = new Ft(this.name, this.chainId);
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
    const e = this.getPlugin("org.ethers.plugins.network.GasCost") || new zr();
    let r = e.txBase;
    if (t.to == null && (r += e.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += e.txDataZero : r += e.txDataNonzero;
    if (t.accessList) {
      const s = nn(t.accessList);
      for (const i in s)
        r += e.txAccessListAddress + e.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (Dd(), t == null)
      return Ft.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const e = us.get(t);
      if (e)
        return e();
      if (typeof t == "bigint")
        return new Ft("unknown", t);
      g(!1, "unknown network", "network", t);
    }
    if (typeof t.clone == "function")
      return t.clone();
    if (typeof t == "object") {
      g(typeof t.name == "string" && typeof t.chainId == "number", "invalid network object name or chainId", "network", t);
      const e = new Ft(t.name, t.chainId);
      return (t.ensAddress || t.ensNetwork != null) && e.attachPlugin(new Kr(t.ensAddress, t.ensNetwork)), e;
    }
    g(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, e) {
    typeof t == "number" && (t = BigInt(t));
    const r = us.get(t);
    r && g(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), us.set(t, e);
  }
}
function ko(n, t) {
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
function Uo(n) {
  return new Ld(n, async (t, e, r) => {
    r.setHeader("User-Agent", "ethers");
    let s;
    try {
      const [i, o] = await Promise.all([
        r.send(),
        t()
      ]);
      s = i;
      const a = s.bodyJson.standard;
      return {
        gasPrice: o.gasPrice,
        maxFeePerGas: ko(a.maxFee, 9),
        maxPriorityFeePerGas: ko(a.maxPriorityFee, 9)
      };
    } catch (i) {
      I(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
let Lo = !1;
function Dd() {
  if (Lo)
    return;
  Lo = !0;
  function n(t, e, r) {
    const s = function() {
      const i = new Ft(t, e);
      return r.ensNetwork != null && i.attachPlugin(new Kr(null, r.ensNetwork)), i.attachPlugin(new zr()), (r.plugins || []).forEach((o) => {
        i.attachPlugin(o);
      }), i;
    };
    Ft.register(t, s), Ft.register(e, s), r.altNames && r.altNames.forEach((i) => {
      Ft.register(i, s);
    });
  }
  n("mainnet", 1, { ensNetwork: 1, altNames: ["homestead"] }), n("ropsten", 3, { ensNetwork: 3 }), n("rinkeby", 4, { ensNetwork: 4 }), n("goerli", 5, { ensNetwork: 5 }), n("kovan", 42, { ensNetwork: 42 }), n("sepolia", 11155111, { ensNetwork: 11155111 }), n("holesky", 17e3, { ensNetwork: 17e3 }), n("classic", 61, {}), n("classicKotti", 6, {}), n("arbitrum", 42161, {
    ensNetwork: 1
  }), n("arbitrum-goerli", 421613, {}), n("arbitrum-sepolia", 421614, {}), n("base", 8453, { ensNetwork: 1 }), n("base-goerli", 84531, {}), n("base-sepolia", 84532, {}), n("bnb", 56, { ensNetwork: 1 }), n("bnbt", 97, {}), n("linea", 59144, { ensNetwork: 1 }), n("linea-goerli", 59140, {}), n("linea-sepolia", 59141, {}), n("matic", 137, {
    ensNetwork: 1,
    plugins: [
      Uo("https://gasstation.polygon.technology/v2")
    ]
  }), n("matic-amoy", 80002, {}), n("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      Uo("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), n("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), n("optimism-goerli", 420, {}), n("optimism-sepolia", 11155420, {}), n("xdai", 100, { ensNetwork: 1 });
}
function _s(n) {
  return JSON.parse(JSON.stringify(n));
}
class Fd {
  #t;
  #e;
  #n;
  // The most recent block we have scanned for events. The value -2
  // indicates we still need to fetch an initial block number
  #r;
  /**
   *  Create a new **PollingBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    this.#t = t, this.#e = null, this.#n = 4e3, this.#r = -2;
  }
  /**
   *  The polling interval.
   */
  get pollingInterval() {
    return this.#n;
  }
  set pollingInterval(t) {
    this.#n = t;
  }
  async #s() {
    try {
      const t = await this.#t.getBlockNumber();
      if (this.#r === -2) {
        this.#r = t;
        return;
      }
      if (t !== this.#r) {
        for (let e = this.#r + 1; e <= t; e++) {
          if (this.#e == null)
            return;
          await this.#t.emit("block", e);
        }
        this.#r = t;
      }
    } catch {
    }
    this.#e != null && (this.#e = this.#t._setTimeout(this.#s.bind(this), this.#n));
  }
  start() {
    this.#e || (this.#e = this.#t._setTimeout(this.#s.bind(this), this.#n), this.#s());
  }
  stop() {
    this.#e && (this.#t._clearTimeout(this.#e), this.#e = null);
  }
  pause(t) {
    this.stop(), t && (this.#r = -2);
  }
  resume() {
    this.start();
  }
}
class gi {
  #t;
  #e;
  #n;
  /**
   *  Create a new **OnBlockSubscriber** attached to %%provider%%.
   */
  constructor(t) {
    this.#t = t, this.#n = !1, this.#e = (e) => {
      this._poll(e, this.#t);
    };
  }
  /**
   *  Called on every new block.
   */
  async _poll(t, e) {
    throw new Error("sub-classes must override this");
  }
  start() {
    this.#n || (this.#n = !0, this.#e(-2), this.#t.on("block", this.#e));
  }
  stop() {
    this.#n && (this.#n = !1, this.#t.off("block", this.#e));
  }
  pause(t) {
    this.stop();
  }
  resume() {
    this.start();
  }
}
class Md extends gi {
  #t;
  #e;
  constructor(t, e) {
    super(t), this.#t = e, this.#e = -2;
  }
  pause(t) {
    t && (this.#e = -2), super.pause(t);
  }
  async _poll(t, e) {
    const r = await e.getBlock(this.#t);
    r != null && (this.#e === -2 ? this.#e = r.number : r.number > this.#e && (e.emit(this.#t, r.number), this.#e = r.number));
  }
}
class _d extends gi {
  #t;
  constructor(t, e) {
    super(t), this.#t = _s(e);
  }
  async _poll(t, e) {
    throw new Error("@TODO");
  }
}
class Hd extends gi {
  #t;
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%hash%%.
   */
  constructor(t, e) {
    super(t), this.#t = e;
  }
  async _poll(t, e) {
    const r = await e.getTransactionReceipt(this.#t);
    r && e.emit(this.#t, r);
  }
}
class pi {
  #t;
  #e;
  #n;
  #r;
  // The most recent block we have scanned for events. The value -2
  // indicates we still need to fetch an initial block number
  #s;
  /**
   *  Create a new **PollingTransactionSubscriber** attached to
   *  %%provider%%, listening for %%filter%%.
   */
  constructor(t, e) {
    this.#t = t, this.#e = _s(e), this.#n = this.#o.bind(this), this.#r = !1, this.#s = -2;
  }
  async #o(t) {
    if (this.#s === -2)
      return;
    const e = _s(this.#e);
    e.fromBlock = this.#s + 1, e.toBlock = t;
    const r = await this.#t.getLogs(e);
    if (r.length === 0) {
      this.#s < t - 60 && (this.#s = t - 60);
      return;
    }
    for (const s of r)
      this.#t.emit(this.#e, s), this.#s = s.blockNumber;
  }
  start() {
    this.#r || (this.#r = !0, this.#s === -2 && this.#t.getBlockNumber().then((t) => {
      this.#s = t;
    }), this.#t.on("block", this.#n));
  }
  stop() {
    this.#r && (this.#r = !1, this.#t.off("block", this.#n));
  }
  pause(t) {
    this.stop(), t && (this.#s = -2);
  }
  resume() {
    this.start();
  }
}
const Gd = BigInt(2), Vd = 10;
function hr(n) {
  return n && typeof n.then == "function";
}
function wr(n, t) {
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
class Jc {
  /**
   *  The name fof the event.
   */
  name;
  /**
   *  Create a new UnmanagedSubscriber with %%name%%.
   */
  constructor(t) {
    D(this, { name: t });
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
function Qd(n) {
  return JSON.parse(JSON.stringify(n));
}
function Hs(n) {
  return n = Array.from(new Set(n).values()), n.sort(), n;
}
async function ls(n, t) {
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
  if (q(n, 32)) {
    const e = n.toLowerCase();
    return { type: "transaction", tag: wr("tx", { hash: e }), hash: e };
  }
  if (n.orphan) {
    const e = n;
    return { type: "orphan", tag: wr("orphan", e), filter: Qd(e) };
  }
  if (n.address || n.topics) {
    const e = n, r = {
      topics: (e.topics || []).map((s) => s == null ? null : Array.isArray(s) ? Hs(s.map((i) => i.toLowerCase())) : s.toLowerCase())
    };
    if (e.address) {
      const s = [], i = [], o = (a) => {
        q(a) ? s.push(a) : i.push((async () => {
          s.push(await Ot(a, t));
        })());
      };
      Array.isArray(e.address) ? e.address.forEach(o) : o(e.address), i.length && await Promise.all(i), r.address = Hs(s.map((a) => a.toLowerCase()));
    }
    return { filter: r, tag: wr("event", r), type: "event" };
  }
  g(!1, "unknown ProviderEvent", "event", n);
}
function fs() {
  return (/* @__PURE__ */ new Date()).getTime();
}
const zd = {
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class Kd {
  #t;
  #e;
  // null=unpaused, true=paused+dropWhilePaused, false=paused
  #n;
  #r;
  #s;
  #o;
  #i;
  // The most recent block number if running an event or -1 if no "block" event
  #a;
  #f;
  #u;
  #g;
  #p;
  /**
   *  Create a new **AbstractProvider** connected to %%network%%, or
   *  use the various network detection capabilities to discover the
   *  [[Network]] if necessary.
   */
  constructor(t, e) {
    if (this.#p = Object.assign({}, zd, e || {}), t === "any")
      this.#o = !0, this.#s = null;
    else if (t) {
      const r = Ft.from(t);
      this.#o = !1, this.#s = Promise.resolve(r), setTimeout(() => {
        this.emit("network", r, null);
      }, 0);
    } else
      this.#o = !1, this.#s = null;
    this.#a = -1, this.#i = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map(), this.#e = /* @__PURE__ */ new Map(), this.#n = null, this.#r = !1, this.#f = 1, this.#u = /* @__PURE__ */ new Map(), this.#g = !1;
  }
  get pollingInterval() {
    return this.#p.pollingInterval;
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
    return Array.from(this.#e.values());
  }
  /**
   *  Attach a new plug-in.
   */
  attachPlugin(t) {
    if (this.#e.get(t.name))
      throw new Error(`cannot replace existing plugin: ${t.name} `);
    return this.#e.set(t.name, t.connect(this)), this;
  }
  /**
   *  Get a plugin by name.
   */
  getPlugin(t) {
    return this.#e.get(t) || null;
  }
  /**
   *  Prevent any CCIP-read operation, regardless of whether requested
   *  in a [[call]] using ``enableCcipRead``.
   */
  get disableCcipRead() {
    return this.#g;
  }
  set disableCcipRead(t) {
    this.#g = !!t;
  }
  // Shares multiple identical requests made during the same 250ms
  async #c(t) {
    const e = this.#p.cacheTimeout;
    if (e < 0)
      return await this._perform(t);
    const r = wr(t.method, t);
    let s = this.#i.get(r);
    return s || (s = this._perform(t), this.#i.set(r, s), setTimeout(() => {
      this.#i.get(r) === s && this.#i.delete(r);
    }, e)), await s;
  }
  /**
   *  Resolves to the data for executing the CCIP-read operations.
   */
  async ccipReadFetch(t, e, r) {
    if (this.disableCcipRead || r.length === 0 || t.to == null)
      return null;
    const s = t.to.toLowerCase(), i = e.toLowerCase(), o = [];
    for (let a = 0; a < r.length; a++) {
      const c = r[a], u = c.replace("{sender}", s).replace("{data}", i), f = new re(u);
      c.indexOf("{data}") === -1 && (f.body = { data: i, sender: s }), this.emit("debug", { action: "sendCcipReadFetchRequest", request: f, index: a, urls: r });
      let l = "unknown error";
      const d = await f.send();
      try {
        const y = d.bodyJson;
        if (y.data)
          return this.emit("debug", { action: "receiveCcipReadFetchResult", request: f, result: y }), y.data;
        y.message && (l = y.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: f, result: y });
      } catch {
      }
      I(d.statusCode < 400 || d.statusCode >= 500, `response not found during CCIP fetch: ${l}`, "OFFCHAIN_FAULT", { reason: "404_MISSING_RESOURCE", transaction: t, info: { url: c, errorMessage: l } }), o.push(l);
    }
    I(!1, `error encountered during CCIP fetch: ${o.map((a) => JSON.stringify(a)).join(", ")}`, "OFFCHAIN_FAULT", {
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
    return new ld(Cd(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a log before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Log]].
   */
  _wrapLog(t, e) {
    return new Yn(Pd(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  receipt before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionReceipt]].
   */
  _wrapTransactionReceipt(t, e) {
    return new kc(kd(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  response before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionResponse]].
   */
  _wrapTransactionResponse(t, e) {
    return new qn(Kc(t), this);
  }
  /**
   *  Resolves to the Network, forcing a network detection using whatever
   *  technique the sub-class requires.
   *
   *  Sub-classes **must** override this.
   */
  _detectNetwork() {
    I(!1, "sub-classes must implement this", "UNSUPPORTED_OPERATION", {
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
    I(!1, `unsupported method: ${t.method}`, "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: t
    });
  }
  // State
  async getBlockNumber() {
    const t = G(await this.#c({ method: "getBlockNumber" }), "%response");
    return this.#a >= 0 && (this.#a = t), t;
  }
  /**
   *  Returns or resolves to the address for %%address%%, resolving ENS
   *  names and [[Addressable]] objects and returning if already an
   *  address.
   */
  _getAddress(t) {
    return Ot(t, this);
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
    if (q(t))
      return q(t, 32) ? t : fn(t);
    if (typeof t == "bigint" && (t = G(t, "blockTag")), typeof t == "number")
      return t >= 0 ? fn(t) : this.#a >= 0 ? fn(this.#a + t) : this.getBlockNumber().then((e) => fn(e + t));
    g(!1, "invalid blockTag", "blockTag", t);
  }
  /**
   *  Returns or resolves to a filter for %%filter%%, resolving any ENS
   *  names or [[Addressable]] object and returning if already a valid
   *  filter.
   */
  _getFilter(t) {
    const e = (t.topics || []).map((c) => c == null ? null : Array.isArray(c) ? Hs(c.map((u) => u.toLowerCase())) : c.toLowerCase()), r = "blockHash" in t ? t.blockHash : void 0, s = (c, u, f) => {
      let l;
      switch (c.length) {
        case 0:
          break;
        case 1:
          l = c[0];
          break;
        default:
          c.sort(), l = c;
      }
      if (r && (u != null || f != null))
        throw new Error("invalid filter");
      const d = {};
      return l && (d.address = l), e.length && (d.topics = e), u && (d.fromBlock = u), f && (d.toBlock = f), r && (d.blockHash = r), d;
    };
    let i = [];
    if (t.address)
      if (Array.isArray(t.address))
        for (const c of t.address)
          i.push(this._getAddress(c));
      else
        i.push(this._getAddress(t.address));
    let o;
    "fromBlock" in t && (o = this._getBlockTag(t.fromBlock));
    let a;
    return "toBlock" in t && (a = this._getBlockTag(t.toBlock)), i.filter((c) => typeof c != "string").length || o != null && typeof o != "string" || a != null && typeof a != "string" ? Promise.all([Promise.all(i), o, a]).then((c) => s(c[0], c[1], c[2])) : s(i, o, a);
  }
  /**
   *  Returns or resolves to a transaction for %%request%%, resolving
   *  any ENS names or [[Addressable]] and returning if already a valid
   *  transaction.
   */
  _getTransactionRequest(t) {
    const e = Or(t), r = [];
    if (["to", "from"].forEach((s) => {
      if (e[s] == null)
        return;
      const i = Ot(e[s], this);
      hr(i) ? r.push(async function() {
        e[s] = await i;
      }()) : e[s] = i;
    }), e.blockTag != null) {
      const s = this._getBlockTag(e.blockTag);
      hr(s) ? r.push(async function() {
        e.blockTag = await s;
      }()) : e.blockTag = s;
    }
    return r.length ? async function() {
      return await Promise.all(r), e;
    }() : e;
  }
  async getNetwork() {
    if (this.#s == null) {
      const s = (async () => {
        try {
          const i = await this._detectNetwork();
          return this.emit("network", i, null), i;
        } catch (i) {
          throw this.#s === s && (this.#s = null), i;
        }
      })();
      return this.#s = s, (await s).clone();
    }
    const t = this.#s, [e, r] = await Promise.all([
      t,
      this._detectNetwork()
      // The actual connected network
    ]);
    return e.chainId !== r.chainId && (this.#o ? (this.emit("network", r, e), this.#s === t && (this.#s = Promise.resolve(r))) : I(!1, `network changed: ${e.chainId} => ${r.chainId} `, "NETWORK_ERROR", {
      event: "changed"
    })), e.clone();
  }
  async getFeeData() {
    const t = await this.getNetwork(), e = async () => {
      const { _block: s, gasPrice: i, priorityFee: o } = await Bt({
        _block: this.#y("latest", !1),
        gasPrice: (async () => {
          try {
            const f = await this.#c({ method: "getGasPrice" });
            return k(f, "%response");
          } catch {
          }
          return null;
        })(),
        priorityFee: (async () => {
          try {
            const f = await this.#c({ method: "getPriorityFee" });
            return k(f, "%response");
          } catch {
          }
          return null;
        })()
      });
      let a = null, c = null;
      const u = this._wrapBlock(s, t);
      return u && u.baseFeePerGas && (c = o ?? BigInt("1000000000"), a = u.baseFeePerGas * Gd + c), new Oo(i, a, c);
    }, r = t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    if (r) {
      const s = new re(r.url), i = await r.processFunc(e, this, s);
      return new Oo(i.gasPrice, i.maxFeePerGas, i.maxPriorityFeePerGas);
    }
    return await e();
  }
  async estimateGas(t) {
    let e = this._getTransactionRequest(t);
    return hr(e) && (e = await e), k(await this.#c({
      method: "estimateGas",
      transaction: e
    }), "%response");
  }
  async #l(t, e, r) {
    I(r < Vd, "CCIP read exceeded maximum redirections", "OFFCHAIN_FAULT", {
      reason: "TOO_MANY_REDIRECTS",
      transaction: Object.assign({}, t, { blockTag: e, enableCcipRead: !0 })
    });
    const s = Or(t);
    try {
      return S(await this._perform({ method: "call", transaction: s, blockTag: e }));
    } catch (i) {
      if (!this.disableCcipRead && Js(i) && i.data && r >= 0 && e === "latest" && s.to != null && rt(i.data, 0, 4) === "0x556f1830") {
        const o = i.data, a = await Ot(s.to, this);
        let c;
        try {
          c = Wd(rt(i.data, 4));
        } catch (l) {
          I(!1, l.message, "OFFCHAIN_FAULT", {
            reason: "BAD_DATA",
            transaction: s,
            info: { data: o }
          });
        }
        I(c.sender.toLowerCase() === a.toLowerCase(), "CCIP Read sender mismatch", "CALL_EXCEPTION", {
          action: "call",
          data: o,
          reason: "OffchainLookup",
          transaction: s,
          invocation: null,
          revert: {
            signature: "OffchainLookup(address,string[],bytes,bytes4,bytes)",
            name: "OffchainLookup",
            args: c.errorArgs
          }
        });
        const u = await this.ccipReadFetch(s, c.calldata, c.urls);
        I(u != null, "CCIP Read failed to fetch data", "OFFCHAIN_FAULT", {
          reason: "FETCH_FAILED",
          transaction: s,
          info: { data: i.data, errorArgs: c.errorArgs }
        });
        const f = {
          to: a,
          data: et([c.selector, jd([u, c.extraData])])
        };
        this.emit("debug", { action: "sendCcipReadCall", transaction: f });
        try {
          const l = await this.#l(f, e, r + 1);
          return this.emit("debug", { action: "receiveCcipReadCallResult", transaction: Object.assign({}, f), result: l }), l;
        } catch (l) {
          throw this.emit("debug", { action: "receiveCcipReadCallError", transaction: Object.assign({}, f), error: l }), l;
        }
      }
      throw i;
    }
  }
  async #h(t) {
    const { value: e } = await Bt({
      network: this.getNetwork(),
      value: t
    });
    return e;
  }
  async call(t) {
    const { tx: e, blockTag: r } = await Bt({
      tx: this._getTransactionRequest(t),
      blockTag: this._getBlockTag(t.blockTag)
    });
    return await this.#h(this.#l(e, r, t.enableCcipRead ? 0 : -1));
  }
  // Account
  async #d(t, e, r) {
    let s = this._getAddress(e), i = this._getBlockTag(r);
    return (typeof s != "string" || typeof i != "string") && ([s, i] = await Promise.all([s, i])), await this.#h(this.#c(Object.assign(t, { address: s, blockTag: i })));
  }
  async getBalance(t, e) {
    return k(await this.#d({ method: "getBalance" }, t, e), "%response");
  }
  async getTransactionCount(t, e) {
    return G(await this.#d({ method: "getTransactionCount" }, t, e), "%response");
  }
  async getCode(t, e) {
    return S(await this.#d({ method: "getCode" }, t, e));
  }
  async getStorage(t, e, r) {
    const s = k(e, "position");
    return S(await this.#d({ method: "getStorage", position: s }, t, r));
  }
  // Write
  async broadcastTransaction(t) {
    const { blockNumber: e, hash: r, network: s } = await Bt({
      blockNumber: this.getBlockNumber(),
      hash: this._perform({
        method: "broadcastTransaction",
        signedTransaction: t
      }),
      network: this.getNetwork()
    }), i = Xt.from(t);
    if (i.hash !== r)
      throw new Error("@TODO: the returned hash did not match");
    return this._wrapTransactionResponse(i, s).replaceableTransaction(e);
  }
  async #y(t, e) {
    if (q(t, 32))
      return await this.#c({
        method: "getBlock",
        blockHash: t,
        includeTransactions: e
      });
    let r = this._getBlockTag(t);
    return typeof r != "string" && (r = await r), await this.#c({
      method: "getBlock",
      blockTag: r,
      includeTransactions: e
    });
  }
  // Queries
  async getBlock(t, e) {
    const { network: r, params: s } = await Bt({
      network: this.getNetwork(),
      params: this.#y(t, !!e)
    });
    return s == null ? null : this._wrapBlock(s, r);
  }
  async getTransaction(t) {
    const { network: e, params: r } = await Bt({
      network: this.getNetwork(),
      params: this.#c({ method: "getTransaction", hash: t })
    });
    return r == null ? null : this._wrapTransactionResponse(r, e);
  }
  async getTransactionReceipt(t) {
    const { network: e, params: r } = await Bt({
      network: this.getNetwork(),
      params: this.#c({ method: "getTransactionReceipt", hash: t })
    });
    if (r == null)
      return null;
    if (r.gasPrice == null && r.effectiveGasPrice == null) {
      const s = await this.#c({ method: "getTransaction", hash: t });
      if (s == null)
        throw new Error("report this; could not find tx or effectiveGasPrice");
      r.effectiveGasPrice = s.gasPrice;
    }
    return this._wrapTransactionReceipt(r, e);
  }
  async getTransactionResult(t) {
    const { result: e } = await Bt({
      network: this.getNetwork(),
      result: this.#c({ method: "getTransactionResult", hash: t })
    });
    return e == null ? null : S(e);
  }
  // Bloom-filter Queries
  async getLogs(t) {
    let e = this._getFilter(t);
    hr(e) && (e = await e);
    const { network: r, params: s } = await Bt({
      network: this.getNetwork(),
      params: this.#c({ method: "getLogs", filter: e })
    });
    return s.map((i) => this._wrapLog(i, r));
  }
  // ENS
  _getProvider(t) {
    I(!1, "provider cannot connect to target network", "UNSUPPORTED_OPERATION", {
      operation: "_getProvider()"
    });
  }
  async getResolver(t) {
    return await yn.fromName(this, t);
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
    t = Z(t);
    const e = Ls(t.substring(2).toLowerCase() + ".addr.reverse");
    try {
      const r = await yn.getEnsAddress(this), i = await new Ke(r, [
        "function resolver(bytes32) view returns (address)"
      ], this).resolver(e);
      if (i == null || i === xn)
        return null;
      const a = await new Ke(i, [
        "function name(bytes32) view returns (string)"
      ], this).name(e);
      return await this.resolveName(a) !== t ? null : a;
    } catch (r) {
      if (Et(r, "BAD_DATA") && r.value === "0x" || Et(r, "CALL_EXCEPTION"))
        return null;
      throw r;
    }
    return null;
  }
  async waitForTransaction(t, e, r) {
    const s = e ?? 1;
    return s === 0 ? this.getTransactionReceipt(t) : new Promise(async (i, o) => {
      let a = null;
      const c = async (u) => {
        try {
          const f = await this.getTransactionReceipt(t);
          if (f != null && u - f.blockNumber + 1 >= s) {
            i(f), a && (clearTimeout(a), a = null);
            return;
          }
        } catch (f) {
          console.log("EEE", f);
        }
        this.once("block", c);
      };
      r != null && (a = setTimeout(() => {
        a != null && (a = null, this.off("block", c), o(nt("timeout", "TIMEOUT", { reason: "timeout" })));
      }, r)), c(await this.getBlockNumber());
    });
  }
  async waitForBlock(t) {
    I(!1, "not implemented yet", "NOT_IMPLEMENTED", {
      operation: "waitForBlock"
    });
  }
  /**
   *  Clear a timer created using the [[_setTimeout]] method.
   */
  _clearTimeout(t) {
    const e = this.#u.get(t);
    e && (e.timer && clearTimeout(e.timer), this.#u.delete(t));
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
    const r = this.#f++, s = () => {
      this.#u.delete(r), t();
    };
    if (this.paused)
      this.#u.set(r, { timer: null, func: s, time: e });
    else {
      const i = setTimeout(s, e);
      this.#u.set(r, { timer: i, func: s, time: fs() });
    }
    return r;
  }
  /**
   *  Perform %%func%% on each subscriber.
   */
  _forEachSubscriber(t) {
    for (const e of this.#t.values())
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
        return new Jc(t.type);
      case "block": {
        const e = new Fd(this);
        return e.pollingInterval = this.pollingInterval, e;
      }
      case "safe":
      case "finalized":
        return new Md(this, t.type);
      case "event":
        return new pi(this, t.filter);
      case "transaction":
        return new Hd(this, t.hash);
      case "orphan":
        return new _d(this, t.filter);
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
    for (const r of this.#t.values())
      if (r.subscriber === t) {
        r.started && r.subscriber.stop(), r.subscriber = e, r.started && e.start(), this.#n != null && e.pause(this.#n);
        break;
      }
  }
  async #w(t, e) {
    let r = await ls(t, this);
    return r.type === "event" && e && e.length > 0 && e[0].removed === !0 && (r = await ls({ orphan: "drop-log", log: e[0] }, this)), this.#t.get(r.tag) || null;
  }
  async #m(t) {
    const e = await ls(t, this), r = e.tag;
    let s = this.#t.get(r);
    return s || (s = { subscriber: this._getSubscriber(e), tag: r, addressableMap: /* @__PURE__ */ new WeakMap(), nameMap: /* @__PURE__ */ new Map(), started: !1, listeners: [] }, this.#t.set(r, s)), s;
  }
  async on(t, e) {
    const r = await this.#m(t);
    return r.listeners.push({ listener: e, once: !1 }), r.started || (r.subscriber.start(), r.started = !0, this.#n != null && r.subscriber.pause(this.#n)), this;
  }
  async once(t, e) {
    const r = await this.#m(t);
    return r.listeners.push({ listener: e, once: !0 }), r.started || (r.subscriber.start(), r.started = !0, this.#n != null && r.subscriber.pause(this.#n)), this;
  }
  async emit(t, ...e) {
    const r = await this.#w(t, e);
    if (!r || r.listeners.length === 0)
      return !1;
    const s = r.listeners.length;
    return r.listeners = r.listeners.filter(({ listener: i, once: o }) => {
      const a = new ua(this, o ? null : i, t);
      try {
        i.call(this, ...e, a);
      } catch {
      }
      return !o;
    }), r.listeners.length === 0 && (r.started && r.subscriber.stop(), this.#t.delete(r.tag)), s > 0;
  }
  async listenerCount(t) {
    if (t) {
      const r = await this.#w(t);
      return r ? r.listeners.length : 0;
    }
    let e = 0;
    for (const { listeners: r } of this.#t.values())
      e += r.length;
    return e;
  }
  async listeners(t) {
    if (t) {
      const r = await this.#w(t);
      return r ? r.listeners.map(({ listener: s }) => s) : [];
    }
    let e = [];
    for (const { listeners: r } of this.#t.values())
      e = e.concat(r.map(({ listener: s }) => s));
    return e;
  }
  async off(t, e) {
    const r = await this.#w(t);
    if (!r)
      return this;
    if (e) {
      const s = r.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && r.listeners.splice(s, 1);
    }
    return (!e || r.listeners.length === 0) && (r.started && r.subscriber.stop(), this.#t.delete(r.tag)), this;
  }
  async removeAllListeners(t) {
    if (t) {
      const { tag: e, started: r, subscriber: s } = await this.#m(t);
      r && s.stop(), this.#t.delete(e);
    } else
      for (const [e, { started: r, subscriber: s }] of this.#t)
        r && s.stop(), this.#t.delete(e);
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
    return this.#r;
  }
  /**
   *  Sub-classes may use this to shutdown any sockets or release their
   *  resources and reject any pending requests.
   *
   *  Sub-classes **must** call ``super.destroy()``.
   */
  destroy() {
    this.removeAllListeners();
    for (const t of this.#u.keys())
      this._clearTimeout(t);
    this.#r = !0;
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
    return this.#n != null;
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
    if (this.#a = -1, this.#n != null) {
      if (this.#n == !!t)
        return;
      I(!1, "cannot change pause type; resume first", "UNSUPPORTED_OPERATION", {
        operation: "pause"
      });
    }
    this._forEachSubscriber((e) => e.pause(t)), this.#n = !!t;
    for (const e of this.#u.values())
      e.timer && clearTimeout(e.timer), e.time = fs() - e.time;
  }
  /**
   *  Resume the provider.
   */
  resume() {
    if (this.#n != null) {
      this._forEachSubscriber((t) => t.resume()), this.#n = null;
      for (const t of this.#u.values()) {
        let e = t.time;
        e < 0 && (e = 0), t.time = fs(), setTimeout(t.func, e);
      }
    }
  }
}
function Jd(n, t) {
  try {
    const e = Gs(n, t);
    if (e)
      return Er(e);
  } catch {
  }
  return null;
}
function Gs(n, t) {
  if (n === "0x")
    return null;
  try {
    const e = G(rt(n, t, t + 32)), r = G(rt(n, e, e + 32));
    return rt(n, e + 32, e + 32 + r);
  } catch {
  }
  return null;
}
function Do(n) {
  const t = gt(n);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const e = new Uint8Array(32);
  return e.set(t, 32 - t.length), e;
}
function $d(n) {
  if (n.length % 32 === 0)
    return n;
  const t = new Uint8Array(Math.ceil(n.length / 32) * 32);
  return t.set(n), t;
}
const Zd = new Uint8Array([]);
function jd(n) {
  const t = [];
  let e = 0;
  for (let r = 0; r < n.length; r++)
    t.push(Zd), e += 32;
  for (let r = 0; r < n.length; r++) {
    const s = _(n[r]);
    t[r] = Do(e), t.push(Do(s.length)), t.push($d(s)), e += 32 + Math.ceil(s.length / 32) * 32;
  }
  return et(t);
}
const Fo = "0x0000000000000000000000000000000000000000000000000000000000000000";
function Wd(n) {
  const t = {
    sender: "",
    urls: [],
    calldata: "",
    selector: "",
    extraData: "",
    errorArgs: []
  };
  I(Ve(n) >= 5 * 32, "insufficient OffchainLookup data", "OFFCHAIN_FAULT", {
    reason: "insufficient OffchainLookup data"
  });
  const e = rt(n, 0, 32);
  I(rt(e, 0, 12) === rt(Fo, 0, 12), "corrupt OffchainLookup sender", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup sender"
  }), t.sender = rt(e, 12);
  try {
    const r = [], s = G(rt(n, 32, 64)), i = G(rt(n, s, s + 32)), o = rt(n, s + 32);
    for (let a = 0; a < i; a++) {
      const c = Jd(o, a * 32);
      if (c == null)
        throw new Error("abort");
      r.push(c);
    }
    t.urls = r;
  } catch {
    I(!1, "corrupt OffchainLookup urls", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup urls"
    });
  }
  try {
    const r = Gs(n, 64);
    if (r == null)
      throw new Error("abort");
    t.calldata = r;
  } catch {
    I(!1, "corrupt OffchainLookup calldata", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup calldata"
    });
  }
  I(rt(n, 100, 128) === rt(Fo, 0, 28), "corrupt OffchainLookup callbaackSelector", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup callbaackSelector"
  }), t.selector = rt(n, 96, 100);
  try {
    const r = Gs(n, 128);
    if (r == null)
      throw new Error("abort");
    t.extraData = r;
  } catch {
    I(!1, "corrupt OffchainLookup extraData", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup extraData"
    });
  }
  return t.errorArgs = "sender,urls,calldata,selector,extraData".split(/,/).map((r) => t[r]), t;
}
function on(n, t) {
  if (n.provider)
    return n.provider;
  I(!1, "missing provider", "UNSUPPORTED_OPERATION", { operation: t });
}
async function Mo(n, t) {
  let e = Or(t);
  if (e.to != null && (e.to = Ot(e.to, n)), e.from != null) {
    const r = e.from;
    e.from = Promise.all([
      n.getAddress(),
      Ot(r, n)
    ]).then(([s, i]) => (g(s.toLowerCase() === i.toLowerCase(), "transaction from mismatch", "tx.from", i), s));
  } else
    e.from = n.getAddress();
  return await Bt(e);
}
class yi {
  /**
   *  The provider this signer is connected to.
   */
  provider;
  /**
   *  Creates a new Signer connected to %%provider%%.
   */
  constructor(t) {
    D(this, { provider: t || null });
  }
  async getNonce(t) {
    return on(this, "getTransactionCount").getTransactionCount(await this.getAddress(), t);
  }
  async populateCall(t) {
    return await Mo(this, t);
  }
  async populateTransaction(t) {
    const e = on(this, "populateTransaction"), r = await Mo(this, t);
    r.nonce == null && (r.nonce = await this.getNonce("pending")), r.gasLimit == null && (r.gasLimit = await this.estimateGas(r));
    const s = await this.provider.getNetwork();
    if (r.chainId != null) {
      const o = k(r.chainId);
      g(o === s.chainId, "transaction chainId mismatch", "tx.chainId", t.chainId);
    } else
      r.chainId = s.chainId;
    const i = r.maxFeePerGas != null || r.maxPriorityFeePerGas != null;
    if (r.gasPrice != null && (r.type === 2 || i) ? g(!1, "eip-1559 transaction do not support gasPrice", "tx", t) : (r.type === 0 || r.type === 1) && i && g(!1, "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "tx", t), (r.type === 2 || r.type == null) && r.maxFeePerGas != null && r.maxPriorityFeePerGas != null)
      r.type = 2;
    else if (r.type === 0 || r.type === 1) {
      const o = await e.getFeeData();
      I(o.gasPrice != null, "network does not support gasPrice", "UNSUPPORTED_OPERATION", {
        operation: "getGasPrice"
      }), r.gasPrice == null && (r.gasPrice = o.gasPrice);
    } else {
      const o = await e.getFeeData();
      if (r.type == null)
        if (o.maxFeePerGas != null && o.maxPriorityFeePerGas != null)
          if (r.type = 2, r.gasPrice != null) {
            const a = r.gasPrice;
            delete r.gasPrice, r.maxFeePerGas = a, r.maxPriorityFeePerGas = a;
          } else
            r.maxFeePerGas == null && (r.maxFeePerGas = o.maxFeePerGas), r.maxPriorityFeePerGas == null && (r.maxPriorityFeePerGas = o.maxPriorityFeePerGas);
        else o.gasPrice != null ? (I(!i, "network does not support EIP-1559", "UNSUPPORTED_OPERATION", {
          operation: "populateTransaction"
        }), r.gasPrice == null && (r.gasPrice = o.gasPrice), r.type = 0) : I(!1, "failed to get consistent fee data", "UNSUPPORTED_OPERATION", {
          operation: "signer.getFeeData"
        });
      else (r.type === 2 || r.type === 3) && (r.maxFeePerGas == null && (r.maxFeePerGas = o.maxFeePerGas), r.maxPriorityFeePerGas == null && (r.maxPriorityFeePerGas = o.maxPriorityFeePerGas));
    }
    return await Bt(r);
  }
  async estimateGas(t) {
    return on(this, "estimateGas").estimateGas(await this.populateCall(t));
  }
  async call(t) {
    return on(this, "call").call(await this.populateCall(t));
  }
  async resolveName(t) {
    return await on(this, "resolveName").resolveName(t);
  }
  async sendTransaction(t) {
    const e = on(this, "sendTransaction"), r = await this.populateTransaction(t);
    delete r.from;
    const s = Xt.from(r);
    return await e.broadcastTransaction(await this.signTransaction(s));
  }
}
class vr extends yi {
  /**
   *  The signer address.
   */
  address;
  /**
   *  Creates a new **VoidSigner** with %%address%% attached to
   *  %%provider%%.
   */
  constructor(t, e) {
    super(e), D(this, { address: t });
  }
  async getAddress() {
    return this.address;
  }
  connect(t) {
    return new vr(this.address, t);
  }
  #t(t, e) {
    I(!1, `VoidSigner cannot sign ${t}`, "UNSUPPORTED_OPERATION", { operation: e });
  }
  async signTransaction(t) {
    this.#t("transactions", "signTransaction");
  }
  async signMessage(t) {
    this.#t("messages", "signMessage");
  }
  async signTypedData(t, e, r) {
    this.#t("typed-data", "signTypedData");
  }
}
function Yd(n) {
  return JSON.parse(JSON.stringify(n));
}
class $c {
  #t;
  #e;
  #n;
  #r;
  #s;
  #o;
  /**
   *  Creates a new **FilterIdSubscriber** which will used [[_subscribe]]
   *  and [[_emitResults]] to setup the subscription and provide the event
   *  to the %%provider%%.
   */
  constructor(t) {
    this.#t = t, this.#e = null, this.#n = this.#i.bind(this), this.#r = !1, this.#s = null, this.#o = !1;
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
  async #i(t) {
    try {
      this.#e == null && (this.#e = this._subscribe(this.#t));
      let e = null;
      try {
        e = await this.#e;
      } catch (i) {
        if (!Et(i, "UNSUPPORTED_OPERATION") || i.operation !== "eth_newFilter")
          throw i;
      }
      if (e == null) {
        this.#e = null, this.#t._recoverSubscriber(this, this._recover(this.#t));
        return;
      }
      const r = await this.#t.getNetwork();
      if (this.#s || (this.#s = r), this.#s.chainId !== r.chainId)
        throw new Error("chaid changed");
      if (this.#o)
        return;
      const s = await this.#t.send("eth_getFilterChanges", [e]);
      await this._emitResults(this.#t, s);
    } catch (e) {
      console.log("@TODO", e);
    }
    this.#t.once("block", this.#n);
  }
  #a() {
    const t = this.#e;
    t && (this.#e = null, t.then((e) => {
      this.#t.destroyed || this.#t.send("eth_uninstallFilter", [e]);
    }));
  }
  start() {
    this.#r || (this.#r = !0, this.#i(-2));
  }
  stop() {
    this.#r && (this.#r = !1, this.#o = !0, this.#a(), this.#t.off("block", this.#n));
  }
  pause(t) {
    t && this.#a(), this.#t.off("block", this.#n);
  }
  resume() {
    this.start();
  }
}
class qd extends $c {
  #t;
  /**
   *  Creates a new **FilterIdEventSubscriber** attached to %%provider%%
   *  listening for %%filter%%.
   */
  constructor(t, e) {
    super(t), this.#t = Yd(e);
  }
  _recover(t) {
    return new pi(t, this.#t);
  }
  async _subscribe(t) {
    return await t.send("eth_newFilter", [this.#t]);
  }
  async _emitResults(t, e) {
    for (const r of e)
      t.emit(this.#t, t._wrapLog(r, t._network));
  }
}
class Xd extends $c {
  async _subscribe(t) {
    return await t.send("eth_newPendingTransactionFilter", []);
  }
  async _emitResults(t, e) {
    for (const r of e)
      t.emit("pending", r);
  }
}
const tg = "bigint,boolean,function,number,string,symbol".split(/,/g);
function mr(n) {
  if (n == null || tg.indexOf(typeof n) >= 0 || typeof n.getAddress == "function")
    return n;
  if (Array.isArray(n))
    return n.map(mr);
  if (typeof n == "object")
    return Object.keys(n).reduce((t, e) => (t[e] = n[e], t), {});
  throw new Error(`should not happen: ${n} (${typeof n})`);
}
function eg(n) {
  return new Promise((t) => {
    setTimeout(t, n);
  });
}
function an(n) {
  return n && n.toLowerCase();
}
function _o(n) {
  return n && typeof n.pollingInterval == "number";
}
const Zc = {
  polling: !1,
  staticNetwork: null,
  batchStallTime: 10,
  batchMaxSize: 1 << 20,
  batchMaxCount: 100,
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class hs extends yi {
  address;
  constructor(t, e) {
    super(t), e = Z(e), D(this, { address: e });
  }
  connect(t) {
    I(!1, "cannot reconnect JsonRpcSigner", "UNSUPPORTED_OPERATION", {
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
    const e = mr(t), r = [];
    if (e.from) {
      const i = e.from;
      r.push((async () => {
        const o = await Ot(i, this.provider);
        g(o != null && o.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), e.from = o;
      })());
    } else
      e.from = this.address;
    if (e.gasLimit == null && r.push((async () => {
      e.gasLimit = await this.provider.estimateGas({ ...e, from: this.address });
    })()), e.to != null) {
      const i = e.to;
      r.push((async () => {
        e.to = await Ot(i, this.provider);
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
      let a = 0;
      const c = async () => {
        try {
          const u = await this.provider.getTransaction(r);
          if (u != null) {
            s(u.replaceableTransaction(e));
            return;
          }
        } catch (u) {
          if (Et(u, "CANCELLED") || Et(u, "BAD_DATA") || Et(u, "NETWORK_ERROR")) {
            u.info == null && (u.info = {}), u.info.sendTransactionHash = r, i(u);
            return;
          }
          if (Et(u, "INVALID_ARGUMENT") && (a++, u.info == null && (u.info = {}), u.info.sendTransactionHash = r, a > 10)) {
            i(u);
            return;
          }
          this.provider.emit("error", nt("failed to fetch transation after sending (will try again)", "UNKNOWN_ERROR", { error: u }));
        }
        this.provider._setTimeout(() => {
          c();
        }, o.pop() || 4e3);
      };
      c();
    });
  }
  async signTransaction(t) {
    const e = mr(t);
    if (e.from) {
      const s = await Ot(e.from, this.provider);
      g(s != null && s.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), e.from = s;
    } else
      e.from = this.address;
    const r = this.provider.getRpcTransaction(e);
    return await this.provider.send("eth_signTransaction", [r]);
  }
  async signMessage(t) {
    const e = typeof t == "string" ? jt(t) : t;
    return await this.provider.send("personal_sign", [
      S(e),
      this.address.toLowerCase()
    ]);
  }
  async signTypedData(t, e, r) {
    const s = mr(r), i = await Lt.resolveNames(t, e, s, async (o) => {
      const a = await Ot(o);
      return g(a != null, "TypedData does not support null address", "value", o), a;
    });
    return await this.provider.send("eth_signTypedData_v4", [
      this.address.toLowerCase(),
      JSON.stringify(Lt.getPayload(i.domain, e, i.value))
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
    const e = typeof t == "string" ? jt(t) : t;
    return await this.provider.send("eth_sign", [
      this.address.toLowerCase(),
      S(e)
    ]);
  }
}
class ng extends Kd {
  #t;
  // The next ID to use for the JSON-RPC ID field
  #e;
  // Payloads are queued and triggered in batches using the drainTimer
  #n;
  #r;
  #s;
  #o;
  #i;
  #a() {
    if (this.#r)
      return;
    const t = this._getOption("batchMaxCount") === 1 ? 0 : this._getOption("batchStallTime");
    this.#r = setTimeout(() => {
      this.#r = null;
      const e = this.#n;
      for (this.#n = []; e.length; ) {
        const r = [e.shift()];
        for (; e.length && r.length !== this.#t.batchMaxCount; )
          if (r.push(e.shift()), JSON.stringify(r.map((i) => i.payload)).length > this.#t.batchMaxSize) {
            e.unshift(r.pop());
            break;
          }
        (async () => {
          const s = r.length === 1 ? r[0].payload : r.map((i) => i.payload);
          this.emit("debug", { action: "sendRpcPayload", payload: s });
          try {
            const i = await this._send(s);
            this.emit("debug", { action: "receiveRpcResult", result: i });
            for (const { resolve: o, reject: a, payload: c } of r) {
              if (this.destroyed) {
                a(nt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: c.method }));
                continue;
              }
              const u = i.filter((f) => f.id === c.id)[0];
              if (u == null) {
                const f = nt("missing response for request", "BAD_DATA", {
                  value: i,
                  info: { payload: c }
                });
                this.emit("error", f), a(f);
                continue;
              }
              if ("error" in u) {
                a(this.getRpcError(c, u));
                continue;
              }
              o(u.result);
            }
          } catch (i) {
            this.emit("debug", { action: "receiveRpcError", error: i });
            for (const { reject: o } of r)
              o(i);
          }
        })();
      }
    }, t);
  }
  constructor(t, e) {
    super(t, e), this.#e = 1, this.#t = Object.assign({}, Zc, e || {}), this.#n = [], this.#r = null, this.#o = null, this.#i = null;
    {
      let s = null;
      const i = new Promise((o) => {
        s = o;
      });
      this.#s = { promise: i, resolve: s };
    }
    const r = this._getOption("staticNetwork");
    typeof r == "boolean" ? (g(!r || t !== "any", "staticNetwork cannot be used on special network 'any'", "options", e), r && t != null && (this.#o = Ft.from(t))) : r && (g(t == null || r.matches(t), "staticNetwork MUST match network object", "options", e), this.#o = r);
  }
  /**
   *  Returns the value associated with the option %%key%%.
   *
   *  Sub-classes can use this to inquire about configuration options.
   */
  _getOption(t) {
    return this.#t[t];
  }
  /**
   *  Gets the [[Network]] this provider has committed to. On each call, the network
   *  is detected, and if it has changed, the call will reject.
   */
  get _network() {
    return I(this.#o, "network is not available yet", "NETWORK_ERROR"), this.#o;
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
      if (r && r.type != null && k(r.type) && r.maxFeePerGas == null && r.maxPriorityFeePerGas == null) {
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
        if (this.#o)
          return this.#o;
      } else
        return t;
    return this.#i ? await this.#i : this.ready ? (this.#i = (async () => {
      try {
        const e = Ft.from(k(await this.send("eth_chainId", [])));
        return this.#i = null, e;
      } catch (e) {
        throw this.#i = null, e;
      }
    })(), await this.#i) : (this.#i = (async () => {
      const e = {
        id: this.#e++,
        method: "eth_chainId",
        params: [],
        jsonrpc: "2.0"
      };
      this.emit("debug", { action: "sendRpcPayload", payload: e });
      let r;
      try {
        r = (await this._send(e))[0], this.#i = null;
      } catch (s) {
        throw this.#i = null, this.emit("debug", { action: "receiveRpcError", error: s }), s;
      }
      if (this.emit("debug", { action: "receiveRpcResult", result: r }), "result" in r)
        return Ft.from(k(r.result));
      throw this.getRpcError(e, r);
    })(), await this.#i);
  }
  /**
   *  Sub-classes **MUST** call this. Until [[_start]] has been called, no calls
   *  will be passed to [[_send]] from [[send]]. If it is overridden, then
   *  ``super._start()`` **MUST** be called.
   *
   *  Calling it multiple times is safe and has no effect.
   */
  _start() {
    this.#s == null || this.#s.resolve == null || (this.#s.resolve(), this.#s = null, (async () => {
      for (; this.#o == null && !this.destroyed; )
        try {
          this.#o = await this._detectNetwork();
        } catch (t) {
          if (this.destroyed)
            break;
          console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"), this.emit("error", nt("failed to bootstrap network detection", "NETWORK_ERROR", { event: "initial-network-discovery", info: { error: t } })), await eg(1e3);
        }
      this.#a();
    })());
  }
  /**
   *  Resolves once the [[_start]] has been called. This can be used in
   *  sub-classes to defer sending data until the connection has been
   *  established.
   */
  async _waitUntilReady() {
    if (this.#s != null)
      return await this.#s.promise;
  }
  /**
   *  Return a Subscriber that will manage the %%sub%%.
   *
   *  Sub-classes may override this to modify the behavior of
   *  subscription management.
   */
  _getSubscriber(t) {
    return t.type === "pending" ? new Xd(this) : t.type === "event" ? this._getOption("polling") ? new pi(this, t.filter) : new qd(this, t.filter) : t.type === "orphan" && t.filter.orphan === "drop-log" ? new Jc("orphan") : super._getSubscriber(t);
  }
  /**
   *  Returns true only if the [[_start]] has been called.
   */
  get ready() {
    return this.#s == null;
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
      r === "gasLimit" && (s = "gas"), e[s] = fn(k(t[r], `tx.${r}`));
    }), ["from", "to", "data"].forEach((r) => {
      t[r] != null && (e[r] = S(t[r]));
    }), t.accessList && (e.accessList = nn(t.accessList)), t.blobVersionedHashes && (e.blobVersionedHashes = t.blobVersionedHashes.map((r) => r.toLowerCase())), e;
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
          args: [an(t.address), t.blockTag]
        };
      case "getTransactionCount":
        return {
          method: "eth_getTransactionCount",
          args: [an(t.address), t.blockTag]
        };
      case "getCode":
        return {
          method: "eth_getCode",
          args: [an(t.address), t.blockTag]
        };
      case "getStorage":
        return {
          method: "eth_getStorageAt",
          args: [
            an(t.address),
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
        return t.filter && t.filter.address != null && (Array.isArray(t.filter.address) ? t.filter.address = t.filter.address.map(an) : t.filter.address = an(t.filter.address)), { method: "eth_getLogs", args: [t.filter] };
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
      const a = s.message;
      if (!a.match(/revert/i) && a.match(/insufficient funds/i))
        return nt("insufficient funds", "INSUFFICIENT_FUNDS", {
          transaction: t.params[0],
          info: { payload: t, error: s }
        });
    }
    if (r === "eth_call" || r === "eth_estimateGas") {
      const a = Vs(s), c = Oe.getBuiltinCallException(r === "eth_call" ? "call" : "estimateGas", t.params[0], a ? a.data : null);
      return c.info = { error: s, payload: t }, c;
    }
    const i = JSON.stringify(sg(s));
    if (typeof s.message == "string" && s.message.match(/user denied|ethers-user-denied/i))
      return nt("user rejected action", "ACTION_REJECTED", {
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
      const a = t.params[0];
      if (i.match(/insufficient funds|base fee exceeds gas limit/i))
        return nt("insufficient funds for intrinsic transaction cost", "INSUFFICIENT_FUNDS", {
          transaction: a,
          info: { error: s }
        });
      if (i.match(/nonce/i) && i.match(/too low/i))
        return nt("nonce has already been used", "NONCE_EXPIRED", { transaction: a, info: { error: s } });
      if (i.match(/replacement transaction/i) && i.match(/underpriced/i))
        return nt("replacement fee too low", "REPLACEMENT_UNDERPRICED", { transaction: a, info: { error: s } });
      if (i.match(/only replay-protected/i))
        return nt("legacy pre-eip-155 transactions not supported", "UNSUPPORTED_OPERATION", {
          operation: r,
          info: { transaction: a, info: { error: s } }
        });
    }
    let o = !!i.match(/the method .* does not exist/i);
    return o || s && s.details && s.details.startsWith("Unauthorized method:") && (o = !0), o ? nt("unsupported operation", "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: { error: s, payload: t }
    }) : nt("could not coalesce error", "UNKNOWN_ERROR", { error: s, payload: t });
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
      return Promise.reject(nt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t }));
    const r = this.#e++, s = new Promise((i, o) => {
      this.#n.push({
        resolve: i,
        reject: o,
        payload: { method: t, params: e, id: r, jsonrpc: "2.0" }
      });
    });
    return this.#a(), s;
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
      return new hs(this, s[t]);
    }
    const { accounts: r } = await Bt({
      network: this.getNetwork(),
      accounts: e
    });
    t = Z(t);
    for (const s of r)
      if (Z(s) === t)
        return new hs(this, t);
    throw new Error("invalid account");
  }
  async listAccounts() {
    return (await this.send("eth_accounts", [])).map((e) => new hs(this, e));
  }
  destroy() {
    this.#r && (clearTimeout(this.#r), this.#r = null);
    for (const { payload: t, reject: e } of this.#n)
      e(nt("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t.method }));
    this.#n = [], super.destroy();
  }
}
class rg extends ng {
  #t;
  constructor(t, e) {
    super(t, e);
    let r = this._getOption("pollingInterval");
    r == null && (r = Zc.pollingInterval), this.#t = r;
  }
  _getSubscriber(t) {
    const e = super._getSubscriber(t);
    return _o(e) && (e.pollingInterval = this.#t), e;
  }
  /**
   *  The polling interval (default: 4000 ms)
   */
  get pollingInterval() {
    return this.#t;
  }
  set pollingInterval(t) {
    if (!Number.isInteger(t) || t < 0)
      throw new Error("invalid interval");
    this.#t = t, this._forEachSubscriber((e) => {
      _o(e) && (e.pollingInterval = this.#t);
    });
  }
}
class ds extends rg {
  #t;
  constructor(t, e, r) {
    t == null && (t = "http://localhost:8545"), super(e, r), typeof t == "string" ? this.#t = new re(t) : this.#t = t.clone();
  }
  _getConnection() {
    return this.#t.clone();
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
}
function Vs(n) {
  if (n == null)
    return null;
  if (typeof n.message == "string" && n.message.match(/revert/i) && q(n.data))
    return { message: n.message, data: n.data };
  if (typeof n == "object") {
    for (const t in n) {
      const e = Vs(n[t]);
      if (e)
        return e;
    }
    return null;
  }
  if (typeof n == "string")
    try {
      return Vs(JSON.parse(n));
    } catch {
    }
  return null;
}
function Qs(n, t) {
  if (n != null) {
    if (typeof n.message == "string" && t.push(n.message), typeof n == "object")
      for (const e in n)
        Qs(n[e], t);
    if (typeof n == "string")
      try {
        return Qs(JSON.parse(n), t);
      } catch {
      }
  }
}
function sg(n) {
  const t = [];
  return Qs(n, t), t;
}
const jc = [
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
], ig = [
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
], dr = [
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
], t0 = [
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
function Sr(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function og(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function er(n, ...t) {
  if (!og(n))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${n.length}`);
}
function ag(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Sr(n.outputLen), Sr(n.blockLen);
}
function Tn(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function Wc(n, t) {
  er(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const gs = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const cg = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4)), ps = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), qt = (n, t) => n << 32 - t | n >>> t, Ho = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, ug = (n) => n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
function Go(n) {
  for (let t = 0; t < n.length; t++)
    n[t] = ug(n[t]);
}
function lg(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Jr(n) {
  return typeof n == "string" && (n = lg(n)), er(n), n;
}
function fg(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    er(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
class wi {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Yc(n) {
  const t = (r) => n().update(Jr(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function hg(n = 32) {
  if (gs && typeof gs.getRandomValues == "function")
    return gs.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
function dg(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), a = Number(e & i), c = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(t + c, o, r), n.setUint32(t + u, a, r);
}
const gg = (n, t, e) => n & t ^ ~n & e, pg = (n, t, e) => n & t ^ n & e ^ t & e;
class yg extends wi {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ps(this.buffer);
  }
  update(t) {
    Tn(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Jr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const c = ps(t);
        for (; s <= i - o; o += s)
          this.process(c, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Tn(this), Wc(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let l = o; l < s; l++)
      e[l] = 0;
    dg(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = ps(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = c / 4, f = this.get();
    if (u > f.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let l = 0; l < u; l++)
      a.setUint32(4 * l, f[l], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: o, pos: a } = this;
    return t.length = s, t.pos = a, t.finished = i, t.destroyed = o, s % e && t.buffer.set(r), t;
  }
}
const wg = /* @__PURE__ */ new Uint32Array([
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
]), Ee = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), xe = /* @__PURE__ */ new Uint32Array(64);
class mg extends yg {
  constructor() {
    super(64, 32, 8, !1), this.A = Ee[0] | 0, this.B = Ee[1] | 0, this.C = Ee[2] | 0, this.D = Ee[3] | 0, this.E = Ee[4] | 0, this.F = Ee[5] | 0, this.G = Ee[6] | 0, this.H = Ee[7] | 0;
  }
  get() {
    const { A: t, B: e, C: r, D: s, E: i, F: o, G: a, H: c } = this;
    return [t, e, r, s, i, o, a, c];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, a, c) {
    this.A = t | 0, this.B = e | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = o | 0, this.G = a | 0, this.H = c | 0;
  }
  process(t, e) {
    for (let l = 0; l < 16; l++, e += 4)
      xe[l] = t.getUint32(e, !1);
    for (let l = 16; l < 64; l++) {
      const d = xe[l - 15], y = xe[l - 2], m = qt(d, 7) ^ qt(d, 18) ^ d >>> 3, h = qt(y, 17) ^ qt(y, 19) ^ y >>> 10;
      xe[l] = h + xe[l - 7] + m + xe[l - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: c, G: u, H: f } = this;
    for (let l = 0; l < 64; l++) {
      const d = qt(a, 6) ^ qt(a, 11) ^ qt(a, 25), y = f + d + gg(a, c, u) + wg[l] + xe[l] | 0, h = (qt(r, 2) ^ qt(r, 13) ^ qt(r, 22)) + pg(r, s, i) | 0;
      f = u, u = c, c = a, a = o + y | 0, o = i, i = s, s = r, r = y + h | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, u = u + this.G | 0, f = f + this.H | 0, this.set(r, s, i, o, a, c, u, f);
  }
  roundClean() {
    xe.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const Ag = /* @__PURE__ */ Yc(() => new mg());
class qc extends wi {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, ag(t);
    const r = Jr(e);
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
    return Tn(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Tn(this), er(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: r, finished: s, destroyed: i, blockLen: o, outputLen: a } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = o, t.outputLen = a, t.oHash = e._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Xc = (n, t, e) => new qc(n, t).update(e).digest();
Xc.create = (n, t) => new qc(n, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const tu = /* @__PURE__ */ BigInt(0), $r = /* @__PURE__ */ BigInt(1), bg = /* @__PURE__ */ BigInt(2);
function tn(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function nr(n) {
  if (!tn(n))
    throw new Error("Uint8Array expected");
}
const Eg = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function en(n) {
  nr(n);
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += Eg[n[e]];
  return t;
}
function eu(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function mi(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
const ie = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Vo(n) {
  if (n >= ie._0 && n <= ie._9)
    return n - ie._0;
  if (n >= ie._A && n <= ie._F)
    return n - (ie._A - 10);
  if (n >= ie._a && n <= ie._f)
    return n - (ie._a - 10);
}
function Pn(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length, e = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const o = Vo(n.charCodeAt(i)), a = Vo(n.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = n[i] + n[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    r[s] = o * 16 + a;
  }
  return r;
}
function Je(n) {
  return mi(en(n));
}
function Ai(n) {
  return nr(n), mi(en(Uint8Array.from(n).reverse()));
}
function On(n, t) {
  return Pn(n.toString(16).padStart(t * 2, "0"));
}
function bi(n, t) {
  return On(n, t).reverse();
}
function xg(n) {
  return Pn(eu(n));
}
function $t(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = Pn(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (tn(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function $n(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    nr(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
function Ig(n, t) {
  if (n.length !== t.length)
    return !1;
  let e = 0;
  for (let r = 0; r < n.length; r++)
    e |= n[r] ^ t[r];
  return e === 0;
}
function Ng(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Bg(n) {
  let t;
  for (t = 0; n > tu; n >>= $r, t += 1)
    ;
  return t;
}
function Tg(n, t) {
  return n >> BigInt(t) & $r;
}
function Pg(n, t, e) {
  return n | (e ? $r : tu) << BigInt(t);
}
const Ei = (n) => (bg << BigInt(n - 1)) - $r, ys = (n) => new Uint8Array(n), Qo = (n) => Uint8Array.from(n);
function nu(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = ys(n), s = ys(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, a = (...l) => e(s, r, ...l), c = (l = ys()) => {
    s = a(Qo([0]), l), r = a(), l.length !== 0 && (s = a(Qo([1]), l), r = a());
  }, u = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let l = 0;
    const d = [];
    for (; l < t; ) {
      r = a();
      const y = r.slice();
      d.push(y), l += r.length;
    }
    return $n(...d);
  };
  return (l, d) => {
    o(), c(l);
    let y;
    for (; !(y = d(u())); )
      c();
    return o(), y;
  };
}
const Og = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || tn(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function rr(n, t, e = {}) {
  const r = (s, i, o) => {
    const a = Og[i];
    if (typeof a != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const c = n[s];
    if (!(o && c === void 0) && !a(c, n))
      throw new Error(`Invalid param ${String(s)}=${c} (${typeof c}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const Cg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: nr,
  bitGet: Tg,
  bitLen: Bg,
  bitMask: Ei,
  bitSet: Pg,
  bytesToHex: en,
  bytesToNumberBE: Je,
  bytesToNumberLE: Ai,
  concatBytes: $n,
  createHmacDrbg: nu,
  ensureBytes: $t,
  equalBytes: Ig,
  hexToBytes: Pn,
  hexToNumber: mi,
  isBytes: tn,
  numberToBytesBE: On,
  numberToBytesLE: bi,
  numberToHexUnpadded: eu,
  numberToVarBytesBE: xg,
  utf8ToBytes: Ng,
  validateObject: rr
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const bt = BigInt(0), lt = BigInt(1), De = BigInt(2), vg = BigInt(3), zs = BigInt(4), zo = BigInt(5), Ko = BigInt(8);
BigInt(9);
BigInt(16);
function Gt(n, t) {
  const e = n % t;
  return e >= bt ? e : t + e;
}
function Sg(n, t, e) {
  if (e <= bt || t < bt)
    throw new Error("Expected power/modulo > 0");
  if (e === lt)
    return bt;
  let r = lt;
  for (; t > bt; )
    t & lt && (r = r * n % e), n = n * n % e, t >>= lt;
  return r;
}
function Ks(n, t) {
  if (n === bt || t <= bt)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = Gt(n, t), r = t, s = bt, i = lt;
  for (; e !== bt; ) {
    const a = r / e, c = r % e, u = s - i * a;
    r = e, e = c, s = i, i = u;
  }
  if (r !== lt)
    throw new Error("invert: does not exist");
  return Gt(s, t);
}
function Rg(n) {
  const t = (n - lt) / De;
  let e, r, s;
  for (e = n - lt, r = 0; e % De === bt; e /= De, r++)
    ;
  for (s = De; s < n && Sg(s, t, n) !== n - lt; s++)
    ;
  if (r === 1) {
    const o = (n + lt) / zs;
    return function(c, u) {
      const f = c.pow(u, o);
      if (!c.eql(c.sqr(f), u))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  const i = (e + lt) / De;
  return function(a, c) {
    if (a.pow(c, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let u = r, f = a.pow(a.mul(a.ONE, s), e), l = a.pow(c, i), d = a.pow(c, e);
    for (; !a.eql(d, a.ONE); ) {
      if (a.eql(d, a.ZERO))
        return a.ZERO;
      let y = 1;
      for (let h = a.sqr(d); y < u && !a.eql(h, a.ONE); y++)
        h = a.sqr(h);
      const m = a.pow(f, lt << BigInt(u - y - 1));
      f = a.sqr(m), l = a.mul(l, m), d = a.mul(d, f), u = y;
    }
    return l;
  };
}
function kg(n) {
  if (n % zs === vg) {
    const t = (n + lt) / zs;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (n % Ko === zo) {
    const t = (n - zo) / Ko;
    return function(r, s) {
      const i = r.mul(s, De), o = r.pow(i, t), a = r.mul(s, o), c = r.mul(r.mul(a, De), o), u = r.mul(a, r.sub(c, r.ONE));
      if (!r.eql(r.sqr(u), s))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  return Rg(n);
}
const Ug = [
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
function Lg(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Ug.reduce((r, s) => (r[s] = "function", r), t);
  return rr(n, e);
}
function Dg(n, t, e) {
  if (e < bt)
    throw new Error("Expected power > 0");
  if (e === bt)
    return n.ONE;
  if (e === lt)
    return t;
  let r = n.ONE, s = t;
  for (; e > bt; )
    e & lt && (r = n.mul(r, s)), s = n.sqr(s), e >>= lt;
  return r;
}
function Fg(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, a) => n.is0(o) ? i : (e[a] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, a) => n.is0(o) ? i : (e[a] = n.mul(i, e[a]), n.mul(i, o)), s), e;
}
function ru(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function Mg(n, t, e = !1, r = {}) {
  if (n <= bt)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = ru(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = kg(n), a = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: Ei(s),
    ZERO: bt,
    ONE: lt,
    create: (c) => Gt(c, n),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);
      return bt <= c && c < n;
    },
    is0: (c) => c === bt,
    isOdd: (c) => (c & lt) === lt,
    neg: (c) => Gt(-c, n),
    eql: (c, u) => c === u,
    sqr: (c) => Gt(c * c, n),
    add: (c, u) => Gt(c + u, n),
    sub: (c, u) => Gt(c - u, n),
    mul: (c, u) => Gt(c * u, n),
    pow: (c, u) => Dg(a, c, u),
    div: (c, u) => Gt(c * Ks(u, n), n),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, u) => c + u,
    subN: (c, u) => c - u,
    mulN: (c, u) => c * u,
    inv: (c) => Ks(c, n),
    sqrt: r.sqrt || ((c) => o(a, c)),
    invertBatch: (c) => Fg(a, c),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (c, u, f) => f ? u : c,
    toBytes: (c) => e ? bi(c, i) : On(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
      return e ? Ai(c) : Je(c);
    }
  });
  return Object.freeze(a);
}
function su(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function iu(n) {
  const t = su(n);
  return t + Math.ceil(t / 2);
}
function _g(n, t, e = !1) {
  const r = n.length, s = su(t), i = iu(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? Je(n) : Ai(n), a = Gt(o, t - lt) + lt;
  return e ? bi(a, s) : On(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Hg = BigInt(0), ws = BigInt(1);
function Gg(n, t) {
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
      let o = n.ZERO, a = s;
      for (; i > Hg; )
        i & ws && (o = o.add(a)), a = a.double(), i >>= ws;
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
      const { windows: o, windowSize: a } = r(i), c = [];
      let u = s, f = u;
      for (let l = 0; l < o; l++) {
        f = u, c.push(f);
        for (let d = 1; d < a; d++)
          f = f.add(u), c.push(f);
        u = f.double();
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
    wNAF(s, i, o) {
      const { windows: a, windowSize: c } = r(s);
      let u = n.ZERO, f = n.BASE;
      const l = BigInt(2 ** s - 1), d = 2 ** s, y = BigInt(s);
      for (let m = 0; m < a; m++) {
        const h = m * c;
        let p = Number(o & l);
        o >>= y, p > c && (p -= d, o += ws);
        const w = h, x = h + Math.abs(p) - 1, E = m % 2 !== 0, C = p < 0;
        p === 0 ? f = f.add(e(E, i[w])) : u = u.add(e(C, i[x]));
      }
      return { p: u, f };
    },
    wNAFCached(s, i, o, a) {
      const c = s._WINDOW_SIZE || 1;
      let u = i.get(s);
      return u || (u = this.precomputeWindow(s, c), c !== 1 && i.set(s, a(u))), this.wNAF(c, u, o);
    }
  };
}
function ou(n) {
  return Lg(n.Fp), rr(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...ru(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Vg(n) {
  const t = ou(n);
  rr(t, {
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
const { bytesToNumberBE: Qg, hexToBytes: zg } = Cg, Ge = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(n) {
    const { Err: t } = Ge;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Qg(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = Ge, e = typeof n == "string" ? zg(n) : n;
    nr(e);
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Ge._parseInt(e.subarray(2)), { d: o, l: a } = Ge._parseInt(i);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (u) => Number.parseInt(u[0], 16) & 8 ? "00" + u : u, e = (u) => {
      const f = u.toString(16);
      return f.length & 1 ? `0${f}` : f;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, a = e(i), c = e(o);
    return `30${e(o + i + 4)}02${c}${s}02${a}${r}`;
  }
}, fe = BigInt(0), Ht = BigInt(1);
BigInt(2);
const Jo = BigInt(3);
BigInt(4);
function Kg(n) {
  const t = Vg(n), { Fp: e } = t, r = t.toBytes || ((m, h, p) => {
    const w = h.toAffine();
    return $n(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((m) => {
    const h = m.subarray(1), p = e.fromBytes(h.subarray(0, e.BYTES)), w = e.fromBytes(h.subarray(e.BYTES, 2 * e.BYTES));
    return { x: p, y: w };
  });
  function i(m) {
    const { a: h, b: p } = t, w = e.sqr(m), x = e.mul(w, m);
    return e.add(e.add(x, e.mul(m, h)), p);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(m) {
    return typeof m == "bigint" && fe < m && m < t.n;
  }
  function a(m) {
    if (!o(m))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function c(m) {
    const { allowedPrivateKeyLengths: h, nByteLength: p, wrapPrivateKey: w, n: x } = t;
    if (h && typeof m != "bigint") {
      if (tn(m) && (m = en(m)), typeof m != "string" || !h.includes(m.length))
        throw new Error("Invalid key");
      m = m.padStart(p * 2, "0");
    }
    let E;
    try {
      E = typeof m == "bigint" ? m : Je($t("private key", m, p));
    } catch {
      throw new Error(`private key must be ${p} bytes, hex or bigint, not ${typeof m}`);
    }
    return w && (E = Gt(E, x)), a(E), E;
  }
  const u = /* @__PURE__ */ new Map();
  function f(m) {
    if (!(m instanceof l))
      throw new Error("ProjectivePoint expected");
  }
  class l {
    constructor(h, p, w) {
      if (this.px = h, this.py = p, this.pz = w, h == null || !e.isValid(h))
        throw new Error("x required");
      if (p == null || !e.isValid(p))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(h) {
      const { x: p, y: w } = h || {};
      if (!h || !e.isValid(p) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (h instanceof l)
        throw new Error("projective point not allowed");
      const x = (E) => e.eql(E, e.ZERO);
      return x(p) && x(w) ? l.ZERO : new l(p, w, e.ONE);
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
    static normalizeZ(h) {
      const p = e.invertBatch(h.map((w) => w.pz));
      return h.map((w, x) => w.toAffine(p[x])).map(l.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(h) {
      const p = l.fromAffine(s($t("pointHex", h)));
      return p.assertValidity(), p;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(h) {
      return l.BASE.multiply(c(h));
    }
    // "Private method", don't use it directly
    _setWindowSize(h) {
      this._WINDOW_SIZE = h, u.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: h, y: p } = this.toAffine();
      if (!e.isValid(h) || !e.isValid(p))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(p), x = i(h);
      if (!e.eql(w, x))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: h } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(h);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(h) {
      f(h);
      const { px: p, py: w, pz: x } = this, { px: E, py: C, pz: P } = h, N = e.eql(e.mul(p, P), e.mul(E, x)), T = e.eql(e.mul(w, P), e.mul(C, x));
      return N && T;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new l(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: h, b: p } = t, w = e.mul(p, Jo), { px: x, py: E, pz: C } = this;
      let P = e.ZERO, N = e.ZERO, T = e.ZERO, B = e.mul(x, x), M = e.mul(E, E), U = e.mul(C, C), R = e.mul(x, E);
      return R = e.add(R, R), T = e.mul(x, C), T = e.add(T, T), P = e.mul(h, T), N = e.mul(w, U), N = e.add(P, N), P = e.sub(M, N), N = e.add(M, N), N = e.mul(P, N), P = e.mul(R, P), T = e.mul(w, T), U = e.mul(h, U), R = e.sub(B, U), R = e.mul(h, R), R = e.add(R, T), T = e.add(B, B), B = e.add(T, B), B = e.add(B, U), B = e.mul(B, R), N = e.add(N, B), U = e.mul(E, C), U = e.add(U, U), B = e.mul(U, R), P = e.sub(P, B), T = e.mul(U, M), T = e.add(T, T), T = e.add(T, T), new l(P, N, T);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(h) {
      f(h);
      const { px: p, py: w, pz: x } = this, { px: E, py: C, pz: P } = h;
      let N = e.ZERO, T = e.ZERO, B = e.ZERO;
      const M = t.a, U = e.mul(t.b, Jo);
      let R = e.mul(p, E), K = e.mul(w, C), $ = e.mul(x, P), dt = e.add(p, w), A = e.add(E, C);
      dt = e.mul(dt, A), A = e.add(R, K), dt = e.sub(dt, A), A = e.add(p, x);
      let b = e.add(E, P);
      return A = e.mul(A, b), b = e.add(R, $), A = e.sub(A, b), b = e.add(w, x), N = e.add(C, P), b = e.mul(b, N), N = e.add(K, $), b = e.sub(b, N), B = e.mul(M, A), N = e.mul(U, $), B = e.add(N, B), N = e.sub(K, B), B = e.add(K, B), T = e.mul(N, B), K = e.add(R, R), K = e.add(K, R), $ = e.mul(M, $), A = e.mul(U, A), K = e.add(K, $), $ = e.sub(R, $), $ = e.mul(M, $), A = e.add(A, $), R = e.mul(K, A), T = e.add(T, R), R = e.mul(b, A), N = e.mul(dt, N), N = e.sub(N, R), R = e.mul(dt, K), B = e.mul(b, B), B = e.add(B, R), new l(N, T, B);
    }
    subtract(h) {
      return this.add(h.negate());
    }
    is0() {
      return this.equals(l.ZERO);
    }
    wNAF(h) {
      return y.wNAFCached(this, u, h, (p) => {
        const w = e.invertBatch(p.map((x) => x.pz));
        return p.map((x, E) => x.toAffine(w[E])).map(l.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(h) {
      const p = l.ZERO;
      if (h === fe)
        return p;
      if (a(h), h === Ht)
        return this;
      const { endo: w } = t;
      if (!w)
        return y.unsafeLadder(this, h);
      let { k1neg: x, k1: E, k2neg: C, k2: P } = w.splitScalar(h), N = p, T = p, B = this;
      for (; E > fe || P > fe; )
        E & Ht && (N = N.add(B)), P & Ht && (T = T.add(B)), B = B.double(), E >>= Ht, P >>= Ht;
      return x && (N = N.negate()), C && (T = T.negate()), T = new l(e.mul(T.px, w.beta), T.py, T.pz), N.add(T);
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
    multiply(h) {
      a(h);
      let p = h, w, x;
      const { endo: E } = t;
      if (E) {
        const { k1neg: C, k1: P, k2neg: N, k2: T } = E.splitScalar(p);
        let { p: B, f: M } = this.wNAF(P), { p: U, f: R } = this.wNAF(T);
        B = y.constTimeNegate(C, B), U = y.constTimeNegate(N, U), U = new l(e.mul(U.px, E.beta), U.py, U.pz), w = B.add(U), x = M.add(R);
      } else {
        const { p: C, f: P } = this.wNAF(p);
        w = C, x = P;
      }
      return l.normalizeZ([w, x])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(h, p, w) {
      const x = l.BASE, E = (P, N) => N === fe || N === Ht || !P.equals(x) ? P.multiplyUnsafe(N) : P.multiply(N), C = E(this, p).add(E(h, w));
      return C.is0() ? void 0 : C;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(h) {
      const { px: p, py: w, pz: x } = this, E = this.is0();
      h == null && (h = E ? e.ONE : e.inv(x));
      const C = e.mul(p, h), P = e.mul(w, h), N = e.mul(x, h);
      if (E)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(N, e.ONE))
        throw new Error("invZ was invalid");
      return { x: C, y: P };
    }
    isTorsionFree() {
      const { h, isTorsionFree: p } = t;
      if (h === Ht)
        return !0;
      if (p)
        return p(l, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h, clearCofactor: p } = t;
      return h === Ht ? this : p ? p(l, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(h = !0) {
      return this.assertValidity(), r(l, this, h);
    }
    toHex(h = !0) {
      return en(this.toRawBytes(h));
    }
  }
  l.BASE = new l(t.Gx, t.Gy, e.ONE), l.ZERO = new l(e.ZERO, e.ONE, e.ZERO);
  const d = t.nBitLength, y = Gg(l, t.endo ? Math.ceil(d / 2) : d);
  return {
    CURVE: t,
    ProjectivePoint: l,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function Jg(n) {
  const t = ou(n);
  return rr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function $g(n) {
  const t = Jg(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(A) {
    return fe < A && A < e.ORDER;
  }
  function a(A) {
    return Gt(A, r);
  }
  function c(A) {
    return Ks(A, r);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: f, weierstrassEquation: l, isWithinCurveOrder: d } = Kg({
    ...t,
    toBytes(A, b, O) {
      const F = b.toAffine(), L = e.toBytes(F.x), V = $n;
      return O ? V(Uint8Array.from([b.hasEvenY() ? 2 : 3]), L) : V(Uint8Array.from([4]), L, e.toBytes(F.y));
    },
    fromBytes(A) {
      const b = A.length, O = A[0], F = A.subarray(1);
      if (b === s && (O === 2 || O === 3)) {
        const L = Je(F);
        if (!o(L))
          throw new Error("Point is not on curve");
        const V = l(L);
        let j;
        try {
          j = e.sqrt(V);
        } catch (ft) {
          const xt = ft instanceof Error ? ": " + ft.message : "";
          throw new Error("Point is not on curve" + xt);
        }
        const W = (j & Ht) === Ht;
        return (O & 1) === 1 !== W && (j = e.neg(j)), { x: L, y: j };
      } else if (b === i && O === 4) {
        const L = e.fromBytes(F.subarray(0, e.BYTES)), V = e.fromBytes(F.subarray(e.BYTES, 2 * e.BYTES));
        return { x: L, y: V };
      } else
        throw new Error(`Point of length ${b} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), y = (A) => en(On(A, t.nByteLength));
  function m(A) {
    const b = r >> Ht;
    return A > b;
  }
  function h(A) {
    return m(A) ? a(-A) : A;
  }
  const p = (A, b, O) => Je(A.slice(b, O));
  class w {
    constructor(b, O, F) {
      this.r = b, this.s = O, this.recovery = F, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(b) {
      const O = t.nByteLength;
      return b = $t("compactSignature", b, O * 2), new w(p(b, 0, O), p(b, O, 2 * O));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(b) {
      const { r: O, s: F } = Ge.toSig($t("DER", b));
      return new w(O, F);
    }
    assertValidity() {
      if (!d(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!d(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(b) {
      return new w(this.r, this.s, b);
    }
    recoverPublicKey(b) {
      const { r: O, s: F, recovery: L } = this, V = T($t("msgHash", b));
      if (L == null || ![0, 1, 2, 3].includes(L))
        throw new Error("recovery id invalid");
      const j = L === 2 || L === 3 ? O + t.n : O;
      if (j >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const W = L & 1 ? "03" : "02", wt = u.fromHex(W + y(j)), ft = c(j), xt = a(-V * ft), zt = a(F * ft), mt = u.BASE.multiplyAndAddUnsafe(wt, xt, zt);
      if (!mt)
        throw new Error("point at infinify");
      return mt.assertValidity(), mt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return m(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new w(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Pn(this.toDERHex());
    }
    toDERHex() {
      return Ge.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Pn(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const x = {
    isValidPrivateKey(A) {
      try {
        return f(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: f,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = iu(t.n);
      return _g(t.randomBytes(A), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(A = 8, b = u.BASE) {
      return b._setWindowSize(A), b.multiply(BigInt(3)), b;
    }
  };
  function E(A, b = !0) {
    return u.fromPrivateKey(A).toRawBytes(b);
  }
  function C(A) {
    const b = tn(A), O = typeof A == "string", F = (b || O) && A.length;
    return b ? F === s || F === i : O ? F === 2 * s || F === 2 * i : A instanceof u;
  }
  function P(A, b, O = !0) {
    if (C(A))
      throw new Error("first arg must be private key");
    if (!C(b))
      throw new Error("second arg must be public key");
    return u.fromHex(b).multiply(f(A)).toRawBytes(O);
  }
  const N = t.bits2int || function(A) {
    const b = Je(A), O = A.length * 8 - t.nBitLength;
    return O > 0 ? b >> BigInt(O) : b;
  }, T = t.bits2int_modN || function(A) {
    return a(N(A));
  }, B = Ei(t.nBitLength);
  function M(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(fe <= A && A < B))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return On(A, t.nByteLength);
  }
  function U(A, b, O = R) {
    if (["recovered", "canonical"].some((It) => It in O))
      throw new Error("sign() legacy options not supported");
    const { hash: F, randomBytes: L } = t;
    let { lowS: V, prehash: j, extraEntropy: W } = O;
    V == null && (V = !0), A = $t("msgHash", A), j && (A = $t("prehashed msgHash", F(A)));
    const wt = T(A), ft = f(b), xt = [M(ft), M(wt)];
    if (W != null && W !== !1) {
      const It = W === !0 ? L(e.BYTES) : W;
      xt.push($t("extraEntropy", It));
    }
    const zt = $n(...xt), mt = wt;
    function Se(It) {
      const kt = N(It);
      if (!d(kt))
        return;
      const Cn = c(kt), ot = u.BASE.multiply(kt).toAffine(), Ut = a(ot.x);
      if (Ut === fe)
        return;
      const se = a(Cn * a(mt + Ut * ft));
      if (se === fe)
        return;
      let vn = (ot.x === Ut ? 0 : 2) | Number(ot.y & Ht), Sn = se;
      return V && m(se) && (Sn = h(se), vn ^= 1), new w(Ut, Sn, vn);
    }
    return { seed: zt, k2sig: Se };
  }
  const R = { lowS: t.lowS, prehash: !1 }, K = { lowS: t.lowS, prehash: !1 };
  function $(A, b, O = R) {
    const { seed: F, k2sig: L } = U(A, b, O), V = t;
    return nu(V.hash.outputLen, V.nByteLength, V.hmac)(F, L);
  }
  u.BASE._setWindowSize(8);
  function dt(A, b, O, F = K) {
    const L = A;
    if (b = $t("msgHash", b), O = $t("publicKey", O), "strict" in F)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: V, prehash: j } = F;
    let W, wt;
    try {
      if (typeof L == "string" || tn(L))
        try {
          W = w.fromDER(L);
        } catch (ot) {
          if (!(ot instanceof Ge.Err))
            throw ot;
          W = w.fromCompact(L);
        }
      else if (typeof L == "object" && typeof L.r == "bigint" && typeof L.s == "bigint") {
        const { r: ot, s: Ut } = L;
        W = new w(ot, Ut);
      } else
        throw new Error("PARSE");
      wt = u.fromHex(O);
    } catch (ot) {
      if (ot.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (V && W.hasHighS())
      return !1;
    j && (b = t.hash(b));
    const { r: ft, s: xt } = W, zt = T(b), mt = c(xt), Se = a(zt * mt), It = a(ft * mt), kt = u.BASE.multiplyAndAddUnsafe(wt, Se, It)?.toAffine();
    return kt ? a(kt.x) === ft : !1;
  }
  return {
    CURVE: t,
    getPublicKey: E,
    getSharedSecret: P,
    sign: $,
    verify: dt,
    ProjectivePoint: u,
    Signature: w,
    utils: x
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Zg(n) {
  return {
    hash: n,
    hmac: (t, ...e) => Xc(n, t, fg(...e)),
    randomBytes: hg
  };
}
function jg(n, t) {
  const e = (r) => $g({ ...n, ...Zg(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const au = Mg(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), Wg = au.create(BigInt("-3")), Yg = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), qg = jg({
  a: Wg,
  // Equation params: a, b
  b: Yg,
  Fp: au,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: !1
}, Ag), $o = qg, $e = "embeddedWallet", cu = 23294, uu = 23295, n0 = {
  WALLET_CONTEXT: "oaw_context",
  TRANSACTIONS_CONTEXT: "oaw_transactions",
  TOKENS_CONTEXT: "oaw_tokens"
}, Nt = {
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
}, Xg = {
  [Nt.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: "Sapphire provider not initialized",
  [Nt.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: "Account manager contract not initialized",
  [Nt.NO_USERNAME]: "No username",
  [Nt.NO_PASSWORD]: "No password",
  [Nt.NO_LOGIN_PROXY_DATA]: "No login proxy data",
  [Nt.AUTHENTICATION_DATA_NOT_PROVIDED]: "Authentication data not provided",
  [Nt.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [Nt.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: "No rpc url configured for selected chainid",
  [Nt.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: "Cross chain provider not initialized",
  [Nt.OASIS_WALLET_NOT_INITIALIZED]: "Embedded wallet not initialized",
  [Nt.CANT_HASH_USERNAME]: "Can't hash username",
  [Nt.NO_APILLON_SESSION_TOKEN_CALLBACK]: "Session token callback must be provided",
  [Nt.INVALID_APILLON_SESSION_TOKEN]: "Session token is not valid"
};
function r0(n) {
  if (typeof window < "u")
    return window[$e] = new mu(n), window[$e];
}
function xi() {
  if (typeof window < "u")
    return window[$e] || (window[$e] = new mu()), window[$e];
}
async function Hn(n = 0, t = 4) {
  return typeof window < "u" && window[$e] ? window[$e] : n >= t ? null : (await new Promise((e) => setTimeout(e, 500)), await Hn(n + 1, t));
}
async function Ze(n = "") {
  const e = await xi()?.accountManagerContract?.salt();
  if (e)
    return bu(n, gt(e), 1e5, 32, "sha256");
}
function ms(n) {
  return [uu, cu].includes(n);
}
function Q(n, t = "Error") {
  const e = new Error(t);
  throw e.name = Nt[n], e;
}
class Zo {
  abiCoder = Oe.defaultAbiCoder();
  async getRegisterData(t) {
    t.username || Q("NO_USERNAME"), t.password || Q("NO_PASSWORD");
    const e = await Ze(t.username);
    if (!e) {
      Q("CANT_HASH_USERNAME");
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
      optionalPassword: Ds(t.password)
    };
  }
  async getProxyResponse(t, e, r) {
    r.username || Q("NO_USERNAME"), r.password || Q("NO_PASSWORD");
    const s = await Ze(r.username);
    s || Q("CANT_HASH_USERNAME");
    const i = _h(
      ["bytes32", "bytes"],
      [Ds(r.password), e]
    );
    return await t.proxyViewPassword(s, i, e);
  }
  generateNewKeypair() {
    const t = $o.utils.randomPrivateKey(), e = $o.getPublicKey(t, !1), r = "0x" + en(e), s = this.abiCoder.encode(["string"], [r]), i = r.slice(4, r.length), o = BigInt("0x" + i.slice(0, 64)), a = BigInt("0x" + i.slice(64, i.length));
    return {
      credentialId: s,
      privateKey: t,
      decoded_x: o,
      decoded_y: a
    };
  }
}
function tp(n) {
  return n[0] << 24 | n[1] << 16 | n[2] << 8 | n[3];
}
function ep(n) {
  return n[0] << 8 | n[1];
}
function np(n) {
  const t = ra.decode(n), e = t[1];
  if (e == 2) {
    const r = {
      kty: e,
      alg: t[3],
      crv: t[-1],
      x: wn(t[-2]),
      /** @type {Uint8Array} */
      y: wn(t[-3])
    };
    if (!(r.alg == -7 && r.crv == 1) && // ES256 + P-256 (NIST)
    !(r.alg == -8 && r.crv == 6))
      throw new Error(`Unknown alg: ${r.alg}, crv: ${r.crv}`);
    return r;
  }
  throw new Error(`Unsupported kty: ${e}`);
}
function rp(n) {
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
    signCount: tp(n.slice(33, 37))
    //  4 bytes
  };
  if (e.flags.ED)
    throw new Error("Extension Data not supported!");
  if (e.flags.AT) {
    const r = ep(n.slice(53, 55));
    e.attestedCredentialData = {
      aaguid: n.slice(37, 53),
      // 16 bytes
      credentialId: n.slice(55, 55 + r),
      // vanillacbor.decodeOnlyFirst(buffer).byteLength;
      // https://www.w3.org/TR/webauthn-2/#sctn-encoded-credPubKey-examples
      credentialPublicKey: np(n.slice(55 + r).buffer)
    };
  }
  return e;
}
function sp(n) {
  const e = ra.decode(new Uint8Array(n).buffer).authData;
  return rp(e);
}
async function ip(n, t, e) {
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
    ad: sp(s.attestationObject)
  };
}
function op(n) {
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
const ap = new pr.Sequence({
  name: "sig",
  value: [
    new pr.Integer({
      name: "r"
    }),
    new pr.Integer({
      name: "s"
    })
  ]
});
async function cp(n, t) {
  t || (t = crypto.getRandomValues(new Uint8Array(32)));
  const e = await navigator.credentials.get({
    publicKey: {
      allowCredentials: n.map((u) => ({ id: u, type: "public-key" })),
      challenge: t
    }
  }), r = e.response, s = pr.verifySchema(r.signature, ap);
  if (!s.verified)
    throw new Error("Unable to decode ASN.1 signature!");
  const i = s.result, o = i.r.toBigInt(), a = i.s.toBigInt(), c = JSON.parse(new TextDecoder().decode(r.clientDataJSON));
  return {
    credentialIdHashed: it(new Uint8Array(e.rawId)),
    challenge: t,
    resp: {
      authenticatorData: new Uint8Array(r.authenticatorData),
      clientDataTokens: op(c),
      sigR: o,
      sigS: a
    }
  };
}
class jo {
  async getRegisterData(t) {
    t.username || Q("NO_USERNAME");
    const e = await Ze(t.username);
    if (!e) {
      Q("CANT_HASH_USERNAME");
      return;
    }
    const r = await ip(
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
      optionalPassword: Cs
    };
  }
  async getProxyResponse(t, e, r) {
    r.username || Q("NO_USERNAME");
    const s = r.hashedUsername || await Ze(r.username);
    s || Q("CANT_HASH_USERNAME");
    const i = await t.personalization(), o = await t.credentialIdsByUsername(s), a = await cp(
      // binary credential ids
      o.map((c) => gt(c)),
      // challenge
      gt(Pe(i + Pe(e).slice(2)))
    );
    return await t.proxyView(a.credentialIdHashed, a.resp, e);
  }
}
class up extends yi {
  address = "";
  wallet;
  provider;
  constructor(t) {
    super(t);
    const e = xi();
    e || Q("OASIS_WALLET_NOT_INITIALIZED"), this.wallet = e, this.provider = t;
  }
  connect() {
    return this;
  }
  async getAddress() {
    return (await this.wallet.getAccountAddress())?.publicAddress || "";
  }
  async signTransaction(t, e = !1) {
    return (await this.wallet.signPlainTransaction({
      strategy: this.wallet.lastAccount.authStrategy,
      authData: {
        username: this.wallet.lastAccount.username
      },
      mustConfirm: e,
      tx: await this.populateTransaction(t)
    }))?.signedTxData || "";
  }
  async signMessage(t, e = !1) {
    return await this.wallet.signMessage({
      message: t,
      strategy: this.wallet.lastAccount.authStrategy,
      authData: {
        username: this.wallet.lastAccount.username
      },
      mustConfirm: e
    }) || "";
  }
  async sendTransaction(t) {
    const e = await this.signTransaction(t);
    let r = +(t?.chainId?.toString() || 0);
    r || (r = +(await this.provider.getNetwork()).chainId.toString());
    const s = await this.wallet.broadcastTransaction(e, r);
    return {
      ...t,
      chainId: BigInt(r),
      hash: s.txHash,
      blockHash: null,
      blockNumber: null,
      index: 0,
      // @ts-expect-error - unreliable
      signature: null
    };
  }
  /**
   * NOT implemented
   */
  async signTypedData(t, e, r) {
    return console.error("EmbeddedEthersSigner#signTypedData Not implemented", { domain: t, types: e, value: r }), "";
  }
}
const gr = /* @__PURE__ */ BigInt(2 ** 32 - 1), Wo = /* @__PURE__ */ BigInt(32);
function lp(n, t = !1) {
  return t ? { h: Number(n & gr), l: Number(n >> Wo & gr) } : { h: Number(n >> Wo & gr) | 0, l: Number(n & gr) | 0 };
}
function fp(n, t = !1) {
  let e = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: i, l: o } = lp(n[s], t);
    [e[s], r[s]] = [i, o];
  }
  return [e, r];
}
const hp = (n, t, e) => n << e | t >>> 32 - e, dp = (n, t, e) => t << e | n >>> 32 - e, gp = (n, t, e) => t << e - 32 | n >>> 64 - e, pp = (n, t, e) => n << e - 32 | t >>> 64 - e, yp = "2.17.1", wp = () => `viem@${yp}`;
class Ce extends Error {
  constructor(t, e = {}) {
    super(), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ViemError"
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: wp()
    });
    const r = e.cause instanceof Ce ? e.cause.details : e.cause?.message ? e.cause.message : e.details, s = e.cause instanceof Ce && e.cause.docsPath || e.docsPath;
    this.message = [
      t || "An error occurred.",
      "",
      ...e.metaMessages ? [...e.metaMessages, ""] : [],
      ...s ? [
        `Docs: ${e.docsBaseUrl ?? "https://viem.sh"}${s}${e.docsSlug ? `#${e.docsSlug}` : ""}`
      ] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: ${this.version}`
    ].join(`
`), e.cause && (this.cause = e.cause), this.details = r, this.docsPath = s, this.metaMessages = e.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return lu(this, t);
  }
}
function lu(n, t) {
  return t?.(n) ? n : n && typeof n == "object" && "cause" in n ? lu(n.cause, t) : t ? null : n;
}
class mp extends Ce {
  constructor({ max: t, min: e, signed: r, size: s, value: i }) {
    super(`Number "${i}" is not in safe ${s ? `${s * 8}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${e} to ${t})` : `(above ${e})`}`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "IntegerOutOfRangeError"
    });
  }
}
class Ap extends Ce {
  constructor({ givenSize: t, maxSize: e }) {
    super(`Size cannot exceed ${e} bytes. Given size: ${t} bytes.`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeOverflowError"
    });
  }
}
class fu extends Ce {
  constructor({ size: t, targetSize: e, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${t}) exceeds padding size (${e}).`), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SizeExceedsPaddingSizeError"
    });
  }
}
function Zr(n, { dir: t, size: e = 32 } = {}) {
  return typeof n == "string" ? bp(n, { dir: t, size: e }) : Ep(n, { dir: t, size: e });
}
function bp(n, { dir: t, size: e = 32 } = {}) {
  if (e === null)
    return n;
  const r = n.replace("0x", "");
  if (r.length > e * 2)
    throw new fu({
      size: Math.ceil(r.length / 2),
      targetSize: e,
      type: "hex"
    });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](e * 2, "0")}`;
}
function Ep(n, { dir: t, size: e = 32 } = {}) {
  if (e === null)
    return n;
  if (n.length > e)
    throw new fu({
      size: n.length,
      targetSize: e,
      type: "bytes"
    });
  const r = new Uint8Array(e);
  for (let s = 0; s < e; s++) {
    const i = t === "right";
    r[i ? s : e - s - 1] = n[i ? s : n.length - s - 1];
  }
  return r;
}
function Ii(n, { strict: t = !0 } = {}) {
  return !n || typeof n != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(n) : n.startsWith("0x");
}
function Yo(n) {
  return Ii(n, { strict: !1 }) ? Math.ceil((n.length - 2) / 2) : n.length;
}
const xp = /* @__PURE__ */ new TextEncoder();
function Ip(n, t = {}) {
  return typeof n == "number" || typeof n == "bigint" ? Bp(n, t) : typeof n == "boolean" ? Np(n, t) : Ii(n) ? hu(n, t) : du(n, t);
}
function Np(n, t = {}) {
  const e = new Uint8Array(1);
  return e[0] = Number(n), typeof t.size == "number" ? (Ni(e, { size: t.size }), Zr(e, { size: t.size })) : e;
}
const oe = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function qo(n) {
  if (n >= oe.zero && n <= oe.nine)
    return n - oe.zero;
  if (n >= oe.A && n <= oe.F)
    return n - (oe.A - 10);
  if (n >= oe.a && n <= oe.f)
    return n - (oe.a - 10);
}
function hu(n, t = {}) {
  let e = n;
  t.size && (Ni(e, { size: t.size }), e = Zr(e, { dir: "right", size: t.size }));
  let r = e.slice(2);
  r.length % 2 && (r = `0${r}`);
  const s = r.length / 2, i = new Uint8Array(s);
  for (let o = 0, a = 0; o < s; o++) {
    const c = qo(r.charCodeAt(a++)), u = qo(r.charCodeAt(a++));
    if (c === void 0 || u === void 0)
      throw new Ce(`Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`);
    i[o] = c * 16 + u;
  }
  return i;
}
function Bp(n, t) {
  const e = Tp(n, t);
  return hu(e);
}
function du(n, t = {}) {
  const e = xp.encode(n);
  return typeof t.size == "number" ? (Ni(e, { size: t.size }), Zr(e, { dir: "right", size: t.size })) : e;
}
function Ni(n, { size: t }) {
  if (Yo(n) > t)
    throw new Ap({
      givenSize: Yo(n),
      maxSize: t
    });
}
function Tp(n, t = {}) {
  const { signed: e, size: r } = t, s = BigInt(n);
  let i;
  r ? e ? i = (1n << BigInt(r) * 8n - 1n) - 1n : i = 2n ** (BigInt(r) * 8n) - 1n : typeof n == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof i == "bigint" && e ? -i - 1n : 0;
  if (i && s > i || s < o) {
    const c = typeof n == "bigint" ? "n" : "";
    throw new mp({
      max: i ? `${i}${c}` : void 0,
      min: `${o}${c}`,
      signed: e,
      size: r,
      value: `${n}${c}`
    });
  }
  const a = `0x${(e && s < 0 ? (1n << BigInt(r * 8)) + BigInt(s) : s).toString(16)}`;
  return r ? Zr(a, { size: r }) : a;
}
class Xo extends Ce {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAddressError"
    });
  }
}
class gu extends Map {
  constructor(t) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = t;
  }
  set(t, e) {
    return super.set(t, e), this.maxSize && this.size > this.maxSize && this.delete(this.keys().next().value), this;
  }
}
const pu = [], yu = [], wu = [], Pp = /* @__PURE__ */ BigInt(0), Ln = /* @__PURE__ */ BigInt(1), Op = /* @__PURE__ */ BigInt(2), Cp = /* @__PURE__ */ BigInt(7), vp = /* @__PURE__ */ BigInt(256), Sp = /* @__PURE__ */ BigInt(113);
for (let n = 0, t = Ln, e = 1, r = 0; n < 24; n++) {
  [e, r] = [r, (2 * e + 3 * r) % 5], pu.push(2 * (5 * r + e)), yu.push((n + 1) * (n + 2) / 2 % 64);
  let s = Pp;
  for (let i = 0; i < 7; i++)
    t = (t << Ln ^ (t >> Cp) * Sp) % vp, t & Op && (s ^= Ln << (Ln << /* @__PURE__ */ BigInt(i)) - Ln);
  wu.push(s);
}
const [Rp, kp] = /* @__PURE__ */ fp(wu, !0), ta = (n, t, e) => e > 32 ? gp(n, t, e) : hp(n, t, e), ea = (n, t, e) => e > 32 ? pp(n, t, e) : dp(n, t, e);
function Up(n, t = 24) {
  const e = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      e[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, u = e[c], f = e[c + 1], l = ta(u, f, 1) ^ e[a], d = ea(u, f, 1) ^ e[a + 1];
      for (let y = 0; y < 50; y += 10)
        n[o + y] ^= l, n[o + y + 1] ^= d;
    }
    let s = n[2], i = n[3];
    for (let o = 0; o < 24; o++) {
      const a = yu[o], c = ta(s, i, a), u = ea(s, i, a), f = pu[o];
      s = n[f], i = n[f + 1], n[f] = c, n[f + 1] = u;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        e[a] = n[o + a];
      for (let a = 0; a < 10; a++)
        n[o + a] ^= ~e[(a + 2) % 10] & e[(a + 4) % 10];
    }
    n[0] ^= Rp[r], n[1] ^= kp[r];
  }
  e.fill(0);
}
class Bi extends wi {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Sr(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = cg(this.state);
  }
  keccak() {
    Ho || Go(this.state32), Up(this.state32, this.rounds), Ho || Go(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Tn(this);
    const { blockLen: e, state: r } = this;
    t = Jr(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(e - this.pos, s - i);
      for (let a = 0; a < o; a++)
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
    Tn(this, !1), er(t), this.finish();
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
    return Sr(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (Wc(t, this), this.finished)
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
    return t || (t = new Bi(e, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const Lp = (n, t, e) => Yc(() => new Bi(t, n, e)), Dp = /* @__PURE__ */ Lp(1, 136, 256 / 8);
function Fp(n, t) {
  return Dp(Ii(n, { strict: !1 }) ? Ip(n) : n);
}
const As = /* @__PURE__ */ new gu(8192);
function Mp(n, t) {
  if (As.has(`${n}.${t}`))
    return As.get(`${n}.${t}`);
  const e = n.substring(2).toLowerCase(), r = Fp(du(e)), s = e.split("");
  for (let o = 0; o < 40; o += 2)
    r[o >> 1] >> 4 >= 8 && s[o] && (s[o] = s[o].toUpperCase()), (r[o >> 1] & 15) >= 8 && s[o + 1] && (s[o + 1] = s[o + 1].toUpperCase());
  const i = `0x${s.join("")}`;
  return As.set(`${n}.${t}`, i), i;
}
const _p = /^0x[a-fA-F0-9]{40}$/, bs = /* @__PURE__ */ new gu(8192);
function na(n, t) {
  const { strict: e = !0 } = t ?? {}, r = `${n}.${e}`;
  if (bs.has(r))
    return bs.get(r);
  const s = _p.test(n) ? n.toLowerCase() === n ? !0 : e ? Mp(n) === n : !0 : !1;
  return bs.set(r, s), s;
}
function Hp(n) {
  if (typeof n == "string") {
    if (!na(n, { strict: !1 }))
      throw new Xo({ address: n });
    return {
      address: n,
      type: "json-rpc"
    };
  }
  if (!na(n.address, { strict: !1 }))
    throw new Xo({ address: n.address });
  return {
    address: n.address,
    nonceManager: n.nonceManager,
    signMessage: n.signMessage,
    signTransaction: n.signTransaction,
    signTypedData: n.signTypedData,
    source: "custom",
    type: "local"
  };
}
class Gp {
  address = "";
  wallet;
  constructor() {
    const t = xi();
    t || Q("OASIS_WALLET_NOT_INITIALIZED"), this.wallet = t;
  }
  getAccount() {
    return Hp({
      address: this.wallet.lastAccount.address,
      signMessage: async ({ message: t }, e = !1) => {
        const r = await this.wallet.signMessage({
          message: t,
          strategy: this.wallet.lastAccount.authStrategy,
          authData: {
            username: this.wallet.lastAccount.username
          },
          mustConfirm: e
        });
        return r || "0x";
      },
      signTransaction: async (t, e, r = !1) => {
        const s = await this.wallet.signPlainTransaction({
          strategy: this.wallet.lastAccount.authStrategy,
          authData: {
            username: this.wallet.lastAccount.username
          },
          mustConfirm: r,
          tx: t
        });
        return s ? s.signedTxData : "";
      },
      signTypedData: async (t) => (console.error("EmbeddedViemAdapter#signTypedData Not implemented", t), "0x")
    });
  }
}
class Ar extends ia {
  constructor() {
    super(new Error(Xg[Nt.OASIS_WALLET_NOT_INITIALIZED]), {
      code: 4900,
      shortMessage: "Disconnected"
    });
  }
}
class Vp extends ia {
  constructor() {
    super(new Error("Request rejected by user"), {
      code: 4001,
      shortMessage: "User Rejected Request"
    });
  }
}
async function Qp(n) {
  const t = await Hn();
  t && (t.events.on("connect", (e) => n.emit("connect", e)), t.events.on("disconnect", (e) => n.emit("disconnect", e)), t.events.on("chainChanged", (e) => n.emit("chainChanged", e)), t.events.on("accountsChanged", (e) => n.emit("accountsChanged", e)));
}
function s0() {
  const n = sa();
  Qp(n);
  const t = async ({ method: s, params: i }) => {
    const o = await Hn();
    if (!o)
      throw new Ar();
    console.log([s, i]);
    let a = null;
    switch (s) {
      case "eth_requestAccounts": {
        if (o.lastAccount.address) {
          a = [o.lastAccount.address];
          break;
        }
        const c = await o.waitForAccount();
        if (!c)
          throw new Vp();
        a = [c];
        break;
      }
      case "eth_accounts": {
        if (o.lastAccount.address) {
          a = [o.lastAccount.address];
          break;
        }
        a = [];
        break;
      }
      case "personal_sign": {
        a = await o.signMessage({
          mustConfirm: !0,
          strategy: "passkey",
          message: Eu(xu(i[0]))
        });
        break;
      }
      case "eth_sign": {
        a = await o.signMessage({
          mustConfirm: !0,
          strategy: "passkey",
          message: i[1]
        });
        break;
      }
      case "eth_signTransaction": {
        a = (await o.signPlainTransaction({
          mustConfirm: !0,
          strategy: o.lastAccount.authStrategy,
          authData: {
            username: o.lastAccount.username
          },
          tx: i[0]
        }))?.signedTxData || "";
        break;
      }
      case "wallet_switchEthereumChain": {
        o.setDefaultNetworkId(Number(i[0].chainId)), a = null;
        break;
      }
      case "eth_sendTransaction": {
        const c = await o.signPlainTransaction({
          mustConfirm: !0,
          strategy: o.lastAccount.authStrategy,
          authData: {
            username: o.lastAccount.username
          },
          tx: i[0]
        });
        if (c?.signedTxData) {
          a = (await o.broadcastTransaction(c.signedTxData, i[0]?.chainId)).txHash;
          break;
        }
        a = null;
        break;
      }
      case "eth_sendRawTransaction": {
        a = (await o.broadcastTransaction(i[0], i[0]?.chainId)).txHash;
        break;
      }
      default: {
        a = await o.getRpcProviderForChainId(o.defaultNetworkId).send(s, i);
        break;
      }
    }
    return console.log("====", s), console.log(a), a;
  }, e = async () => {
    const s = await Hn();
    if (!s)
      throw new Ar();
    return new up(s.getRpcProviderForChainId(s.defaultNetworkId));
  }, r = async () => {
    if (!Hn())
      throw new Ar();
    return new Gp().getAccount();
  };
  return {
    on: n.on,
    removeListener: n.off,
    request: t,
    getSigner: e,
    getAccount: r
  };
}
var zp = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
class mu {
  sapphireProvider;
  accountManagerContract;
  abiCoder = Oe.defaultAbiCoder();
  events;
  onGetSignature;
  onGetApillonSessionToken;
  isTest = !1;
  defaultNetworkId = 0;
  rpcUrls = {};
  rpcProviders = {};
  explorerUrls = {
    [cu]: "https://explorer.oasis.io/mainnet/sapphire",
    [uu]: "https://explorer.oasis.io/testnet/sapphire"
  };
  lastAccount = {
    username: "",
    authStrategy: "passkey",
    address: "",
    contractAddress: ""
  };
  /**
   * Resolve on login/register if defined. This resolves EIP-1193 request.
   */
  waitForAccountResolver = null;
  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(t) {
    const e = new ds(
      t?.test ? "https://testnet.sapphire.oasis.io" : "https://sapphire.oasis.io"
    );
    if (this.sapphireProvider = Au.wrap(e), this.accountManagerContract = new Ke(
      t?.accountManagerAddress || "0xF35C3eB93c6D3764A7D5efC6e9DEB614779437b1",
      !t?.onGetSignature && !t?.onGetApillonSessionToken ? ig : jc,
      new vr(xn, this.sapphireProvider)
    ), this.defaultNetworkId = t?.defaultNetworkId || this.defaultNetworkId, t?.networkConfig)
      for (const r in t.networkConfig)
        this.rpcUrls[r] = t.networkConfig[r].rpcUrl, this.explorerUrls[r] = t.networkConfig[r].explorerUrl;
    this.events = sa(), this.isTest = !!t?.test, this.onGetSignature = t?.onGetSignature, this.onGetApillonSessionToken = t?.onGetApillonSessionToken;
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
    return this.sapphireProvider || Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || Q("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), await this.accountManagerContract.userExists(
      await Ze(t)
    ) || !1;
  }
  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   */
  async register(t, e) {
    this.sapphireProvider || Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || Q("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    let r;
    t === "password" ? r = await new Zo().getRegisterData(e) : t === "passkey" && (r = await new jo().getRegisterData(e));
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
    let a = "";
    if (this.onGetSignature || this.onGetApillonSessionToken) {
      this.onGetSignature || (this.onGetSignature = this.getApillonSignature);
      const u = await this.onGetSignature(s);
      u.signature || Q("CANT_GET_SIGNATURE"), a = await this.accountManagerContract.generateGaslessTx(
        s,
        o,
        u.gasPrice ? BigInt(u.gasPrice) : i,
        u.gasLimit ? BigInt(u.gasLimit) : 1000000n,
        BigInt(u.timestamp),
        u.signature
      );
    } else
      a = await this.accountManagerContract.generateGaslessTx(
        s,
        o,
        i
      );
    const c = await this.sapphireProvider.send("eth_sendRawTransaction", [a]);
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
    this.sapphireProvider || Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || Q("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), e.username || Q("NO_USERNAME");
    const r = "0x000000000000000000000000000000000000000000000000000000000000DEAD", s = await Ze(e.username), i = new Vt(dr), o = i.encodeFunctionData("sign", [r]), a = await this.getProxyForStrategy(t, o, {
      ...e,
      hashedUsername: s
    });
    a || Q("NO_LOGIN_PROXY_DATA");
    const [[c, u, f]] = i.decodeFunctionResult("sign", a).toArray(), l = Ac(r, {
      r: c,
      s: u,
      v: f
    }), d = await this.accountManagerContract.getAccount(s);
    if (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "username",
      newValue: e.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, d.length > 1 && l === d[1])
      return await this.handleAccountAfterAuth(e.username);
  }
  /**
   * Return address for username.
   * - Public EVM address
   * - Account contract address (deployed on sapphire)
   */
  async getAccountAddress(t) {
    if (this.sapphireProvider || Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || Q("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), !t) {
      if (this.lastAccount.address)
        return {
          publicAddress: this.lastAccount.address,
          accountContractAddress: this.lastAccount.contractAddress
        };
      Q("NO_USERNAME");
    }
    const e = await Ze(t), r = await this.accountManagerContract.getAccount(e);
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
    if (!e || ms(e))
      return Di(await this.sapphireProvider?.getBalance(t) || 0n, r);
    if (!this.rpcUrls[e])
      return "0";
    const s = this.rpcProviders[e] || new ds(this.rpcUrls[e]);
    return Di(await s.getBalance(t), r);
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
      return Q("NO_APILLON_SESSION_TOKEN_CALLBACK"), { signature: "", gasLimit: 0, timestamp: 0 };
    try {
      const e = await this.onGetApillonSessionToken();
      e || Q("INVALID_APILLON_SESSION_TOKEN");
      const { data: r } = await (await fetch(
        `${zp.VITE_APILLON_BASE_URL ?? "https://api.apillon.io"}/embedded-wallet/signature`,
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
    this.sapphireProvider || Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const e = new Vt(dr);
    let r = t.data || "";
    const s = t.message;
    if ((!r || t.mustConfirm) && (typeof t.message == "string" && !t.message.startsWith("0x") && (t.message = Ds(t.message)), r = e.encodeFunctionData("sign", [t.message]), t.mustConfirm))
      return await new Promise((o, a) => {
        this.events.emit("signatureRequest", {
          ...t,
          data: r,
          message: s,
          mustConfirm: !1,
          resolve: o,
          reject: a
        });
      });
    t.authData || (t.strategy === "passkey" && this.lastAccount.username ? t.authData = { username: this.lastAccount.username } : Q("AUTHENTICATION_DATA_NOT_PROVIDED"));
    const i = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      r,
      t.authData
    );
    if (i) {
      const [o] = e.decodeFunctionResult("sign", i).toArray();
      if (Array.isArray(o) && o.length > 2) {
        const a = ht.from({
          r: o[0],
          s: o[1],
          v: o[2]
        }).serialized;
        return t.resolve && t.resolve(a), a;
      }
    }
  }
  /**
   * Authenticate with selected auth strategy through sapphire "Account Manager",
   * then return signed tx data and chainId of tx.
   */
  async signPlainTransaction(t) {
    const e = this.validateChainId(
      t?.tx?.chainId && +t.tx.chainId.toString() || 0
    );
    if (t.tx.chainId = e, t.tx.nonce || (t.tx.nonce = await this.getRpcProviderForChainId(e).getTransactionCount(
      this.lastAccount.address
    )), t.tx.type === "eip1559" && (t.tx.type = 2, t.tx.gasLimit = t.tx.gas), t.tx.gasPrice || (t.tx.gasPrice = (await this.getRpcProviderForChainId(t.tx.chainId).getFeeData()).gasPrice), t.tx.gasLimit || (t.tx.gasLimit = 1e6), (t.tx.type === 2 && !t.tx.value || "value" in t.tx && typeof t.tx.value > "u") && (t.tx.value = 0n), t.mustConfirm)
      return await new Promise((o, a) => {
        this.events.emit("txApprove", {
          plain: { ...t, mustConfirm: !1, resolve: o, reject: a }
        });
      });
    t.authData || Q("AUTHENTICATION_DATA_NOT_PROVIDED");
    const r = new Vt(dr), s = r.encodeFunctionData("signEIP155", [t.tx]), i = await this.getProxyForStrategy(t.strategy, s, t.authData);
    if (i) {
      const [o] = r.decodeFunctionResult("signEIP155", i).toArray();
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
      return await new Promise((f, l) => {
        this.events.emit("txApprove", {
          contractWrite: { ...t, mustConfirm: !1, resolve: f, reject: l }
        });
      });
    t.authData || Q("AUTHENTICATION_DATA_NOT_PROVIDED");
    const r = await this.getAccountAddress(t.authData.username);
    r?.publicAddress || Q("CANT_GET_ACCOUNT_ADDRESS");
    const i = new Vt(t.contractAbi).encodeFunctionData(
      t.contractFunctionName,
      t.contractFunctionValues
    ), o = await new vr(
      r.publicAddress,
      this.getRpcProviderForChainId(e)
    ).populateTransaction({
      from: r.publicAddress,
      to: t.contractAddress,
      gasLimit: 1e6,
      value: 0,
      data: i
    });
    o.gasPrice = 2e10;
    const a = new Vt(dr), c = a.encodeFunctionData("signEIP155", [o]), u = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      c,
      t.authData
    );
    if (u) {
      const [f] = a.decodeFunctionResult("signEIP155", u).toArray();
      return t.resolve && t.resolve({
        signedTxData: f,
        chainId: e
      }), {
        signedTxData: f,
        chainId: e
      };
    }
  }
  /**
   * Get result of contract read.
   * Utility function, this has nothing to do with Oasis.
   */
  async contractRead(t) {
    const e = this.validateChainId(t.chainId), r = this.getRpcProviderForChainId(e), s = new Ke(t.contractAddress, t.contractAbi, r);
    return t.contractFunctionValues ? await s[t.contractFunctionName](...t.contractFunctionValues) : await s[t.contractFunctionName]();
  }
  // #endregion
  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(t, e, r) {
    if (this.accountManagerContract || Q("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), t === "password")
      return await new Zo().getProxyResponse(
        this.accountManagerContract,
        e,
        r
      );
    if (t === "passkey")
      return await new jo().getProxyResponse(
        this.accountManagerContract,
        e,
        r
      );
  }
  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(t, e) {
    !e && !this.sapphireProvider && Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
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
    return (t && !ms(t) && !this.rpcUrls[t] || !t && this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) && Q("NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID"), !t && this.defaultNetworkId && (t = this.defaultNetworkId), t;
  }
  /**
   * Get provider object for chainId.
   * If no chainId specified, use sapphire network rpc.
   */
  getRpcProviderForChainId(t) {
    if (!t || t && ms(+t.toString()))
      return this.sapphireProvider || (this.events.emit("disconnect", { error: new Ar() }), Q("SAPPHIRE_PROVIDER_NOT_INITIALIZED")), this.sapphireProvider;
    {
      const e = this.rpcProviders[t] || new ds(this.rpcUrls[t]);
      return this.rpcProviders[t] = e, e || Q("CROSS_CHAIN_PROVIDER_NOT_INITIALIZED"), e;
    }
  }
  // #endregion
}
Iu(jc);
export {
  dr as AccountAbi,
  jc as AccountManagerAbi,
  ig as AccountManagerAbiOld,
  t0 as ERC20Abi,
  up as EmbeddedEthersSigner,
  Gp as EmbeddedViemAdapter,
  mu as EmbeddedWallet,
  Xg as ErrorMessages,
  Nt as Errors,
  cu as SapphireMainnet,
  uu as SapphireTestnet,
  Vp as UserRejectedRequestError,
  Ar as WalletDisconnectedError,
  n0 as WebStorageKeys,
  $e as WindowId,
  Q as abort,
  xi as getEmbeddedWallet,
  Hn as getEmbeddedWalletRetry,
  Ze as getHashedUsername,
  s0 as getProvider,
  r0 as initializeOnWindow,
  ms as networkIdIsSapphire
};
