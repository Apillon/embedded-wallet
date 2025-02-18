import { pbkdf2Sync as pu } from "pbkdf2";
import { wrapEthersProvider as gu } from "@oasisprotocol/sapphire-ethers-v6";
import { CBOR as Ha } from "cbor-redux";
import * as Sr from "asn1js";
import Ga from "mitt";
const yu = "6.13.5";
function wu(n, t, e) {
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
async function It(n) {
  const t = Object.keys(n);
  return (await Promise.all(t.map((r) => Promise.resolve(n[r])))).reduce((r, s, i) => (r[t[i]] = s, r), {});
}
function F(n, t, e) {
  for (let r in t) {
    let s = t[r];
    const i = e ? e[r] : null;
    i && wu(s, i, r), Object.defineProperty(n, r, { enumerable: !0, value: s, writable: !1 });
  }
}
function mn(n) {
  if (n == null)
    return "null";
  if (Array.isArray(n))
    return "[ " + n.map(mn).join(", ") + " ]";
  if (n instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let r = 0; r < n.length; r++)
      e += t[n[r] >> 4], e += t[n[r] & 15];
    return e;
  }
  if (typeof n == "object" && typeof n.toJSON == "function")
    return mn(n.toJSON());
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
      return t.sort(), "{ " + t.map((e) => `${mn(e)}: ${mn(n[e])}`).join(", ") + " }";
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function Et(n, t) {
  return n && n.code === t;
}
function xi(n) {
  return Et(n, "CALL_EXCEPTION");
}
function ot(n, t, e) {
  let r = n;
  {
    const i = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${mn(e)}`);
      for (const o in e) {
        if (o === "shortMessage")
          continue;
        const a = e[o];
        i.push(o + "=" + mn(a));
      }
    }
    i.push(`code=${t}`), i.push(`version=${yu}`), i.length && (n += " (" + i.join(", ") + ")");
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
  return F(s, { code: t }), e && Object.assign(s, e), s.shortMessage == null && F(s, { shortMessage: r }), s;
}
function I(n, t, e, r) {
  if (!n)
    throw ot(t, e, r);
}
function g(n, t, e, r) {
  I(n, t, "INVALID_ARGUMENT", { argument: e, value: r });
}
function Va(n, t, e) {
  e == null && (e = ""), e && (e = ": " + e), I(n >= t, "missing argument" + e, "MISSING_ARGUMENT", {
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
function ar(n, t, e) {
  if (e == null && (e = ""), n !== t) {
    let r = e, s = "new";
    e && (r += ".", s += " " + e), I(!1, `private constructor; use ${r}from* methods`, "UNSUPPORTED_OPERATION", {
      operation: s
    });
  }
}
function za(n, t, e) {
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
function V(n, t) {
  return za(n, t, !1);
}
function Nt(n, t) {
  return za(n, t, !0);
}
function X(n, t) {
  return !(typeof n != "string" || !n.match(/^0x[0-9A-Fa-f]*$/) || typeof t == "number" && n.length !== 2 + 2 * t || t === !0 && n.length % 2 !== 0);
}
function Ii(n) {
  return X(n, !0) || n instanceof Uint8Array;
}
const so = "0123456789abcdef";
function U(n) {
  const t = V(n);
  let e = "0x";
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    e += so[(s & 240) >> 4] + so[s & 15];
  }
  return e;
}
function tt(n) {
  return "0x" + n.map((t) => U(t).substring(2)).join("");
}
function Je(n) {
  return X(n, !0) ? (n.length - 2) / 2 : V(n).length;
}
function at(n, t, e) {
  const r = V(n);
  return e != null && e > r.length && I(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
    buffer: r,
    length: r.length,
    offset: e
  }), U(r.slice(t ?? 0, e ?? r.length));
}
function Qa(n, t, e) {
  const r = V(n);
  I(t >= r.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(r),
    length: t,
    offset: t + 1
  });
  const s = new Uint8Array(t);
  return s.fill(0), e ? s.set(r, t - r.length) : s.set(r, 0), U(s);
}
function ce(n, t) {
  return Qa(n, t, !0);
}
function Ni(n, t) {
  return Qa(n, t, !1);
}
const Wr = BigInt(0), Xt = BigInt(1), Ks = 9007199254740991;
function Lr(n, t) {
  const e = jr(n, "value"), r = BigInt(Q(t, "width"));
  if (I(e >> r === Wr, "overflow", "NUMERIC_FAULT", {
    operation: "fromTwos",
    fault: "overflow",
    value: n
  }), e >> r - Xt) {
    const s = (Xt << r) - Xt;
    return -((~e & s) + Xt);
  }
  return e;
}
function Pi(n, t) {
  let e = D(n, "value");
  const r = BigInt(Q(t, "width")), s = Xt << r - Xt;
  if (e < Wr) {
    e = -e, I(e <= s, "too low", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: n
    });
    const i = (Xt << r) - Xt;
    return (~e & i) + Xt;
  } else
    I(e < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: n
    });
  return e;
}
function ze(n, t) {
  const e = jr(n, "value"), r = BigInt(Q(t, "bits"));
  return e & (Xt << r) - Xt;
}
function D(n, t) {
  switch (typeof n) {
    case "bigint":
      return n;
    case "number":
      return g(Number.isInteger(n), "underflow", t || "value", n), g(n >= -9007199254740991 && n <= Ks, "overflow", t || "value", n), BigInt(n);
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
function jr(n, t) {
  const e = D(n, t);
  return I(e >= Wr, "unsigned value cannot be negative", "NUMERIC_FAULT", {
    fault: "overflow",
    operation: "getUint",
    value: n
  }), e;
}
const io = "0123456789abcdef";
function vn(n) {
  if (n instanceof Uint8Array) {
    let t = "0x0";
    for (const e of n)
      t += io[e >> 4], t += io[e & 15];
    return BigInt(t);
  }
  return D(n);
}
function Q(n, t) {
  switch (typeof n) {
    case "bigint":
      return g(n >= -9007199254740991 && n <= Ks, "overflow", t || "value", n), Number(n);
    case "number":
      return g(Number.isInteger(n), "underflow", t || "value", n), g(n >= -9007199254740991 && n <= Ks, "overflow", t || "value", n), n;
    case "string":
      try {
        if (n === "")
          throw new Error("empty string");
        return Q(BigInt(n), t);
      } catch (e) {
        g(!1, `invalid numeric string: ${e.message}`, t || "value", n);
      }
  }
  g(!1, "invalid numeric value", t || "value", n);
}
function mu(n) {
  return Q(vn(n));
}
function ke(n, t) {
  let r = jr(n, "value").toString(16);
  if (t == null)
    r.length % 2 && (r = "0" + r);
  else {
    const s = Q(t, "width");
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
  const t = jr(n, "value");
  if (t === Wr)
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
function An(n) {
  let t = U(Ii(n) ? n : gt(n)).substring(2);
  for (; t.startsWith("0"); )
    t = t.substring(1);
  return t === "" && (t = "0"), "0x" + t;
}
const oo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
BigInt(0);
const ao = BigInt(58);
function Au(n) {
  const t = V(n);
  let e = vn(t), r = "";
  for (; e; )
    r = oo[Number(e % ao)] + r, e /= ao;
  for (let s = 0; s < t.length && !t[s]; s++)
    r = oo[0] + r;
  return r;
}
function bu(n) {
  n = atob(n);
  const t = new Uint8Array(n.length);
  for (let e = 0; e < n.length; e++)
    t[e] = n.charCodeAt(e);
  return V(t);
}
function Eu(n) {
  const t = V(n);
  let e = "";
  for (let r = 0; r < t.length; r++)
    e += String.fromCharCode(t[r]);
  return btoa(e);
}
class $a {
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
    this.#t = e, F(this, { emitter: t, filter: r });
  }
  /**
   *  Unregister the triggered listener for future events.
   */
  async removeListener() {
    this.#t != null && await this.emitter.off(this.filter, this.#t);
  }
}
function xu(n, t, e, r, s) {
  g(!1, `invalid codepoint at offset ${t}; ${n}`, "bytes", e);
}
function Ka(n, t, e, r, s) {
  if (n === "BAD_PREFIX" || n === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < e.length && e[o] >> 6 === 2; o++)
      i++;
    return i;
  }
  return n === "OVERRUN" ? e.length - t - 1 : 0;
}
function Iu(n, t, e, r, s) {
  return n === "OVERLONG" ? (g(typeof s == "number", "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), Ka(n, t, e));
}
const Nu = Object.freeze({
  error: xu,
  ignore: Ka,
  replace: Iu
});
function Pu(n, t) {
  t == null && (t = Nu.error);
  const e = V(n, "bytes"), r = [];
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
    for (let l = 0; l < o; l++) {
      let u = e[s];
      if ((u & 192) != 128) {
        s += t("MISSING_CONTINUE", s, e, r), c = null;
        break;
      }
      c = c << 6 | u & 63, s++;
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
function Rt(n, t) {
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
function vu(n) {
  return n.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode((t >> 10 & 1023) + 55296, (t & 1023) + 56320))).join("");
}
function _r(n, t) {
  return vu(Pu(n, t));
}
function Ja(n) {
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
      i = ot("request timeout", "TIMEOUT"), o.abort();
    }, e.timeout);
    r && r.addListener(() => {
      i = ot("request cancelled", "CANCELLED"), o.abort();
    });
    const c = {
      method: e.method,
      headers: new Headers(Array.from(e)),
      body: e.body || void 0,
      signal: o.signal
    };
    let l;
    try {
      l = await fetch(e.url, c);
    } catch (y) {
      throw clearTimeout(a), i || y;
    }
    clearTimeout(a);
    const u = {};
    l.headers.forEach((y, m) => {
      u[m.toLowerCase()] = y;
    });
    const f = await l.arrayBuffer(), h = f == null ? null : new Uint8Array(f);
    return {
      statusCode: l.status,
      statusMessage: l.statusText,
      headers: u,
      body: h
    };
  }
  return t;
}
const Tu = 12, Cu = 250;
let co = Ja();
const Ou = new RegExp("^data:([^;:]*)?(;base64)?,(.*)$", "i"), Su = new RegExp("^ipfs://(ipfs/)?(.*)$", "i");
let gs = !1;
async function Za(n, t) {
  try {
    const e = n.match(Ou);
    if (!e)
      throw new Error("invalid data");
    return new Re(200, "OK", {
      "content-type": e[1] || "text/plain"
    }, e[2] ? bu(e[3]) : Ru(e[3]));
  } catch {
    return new Re(599, "BAD REQUEST (invalid data: URI)", {}, null, new Qt(n));
  }
}
function Wa(n) {
  async function t(e, r) {
    try {
      const s = e.match(Su);
      if (!s)
        throw new Error("invalid link");
      return new Qt(`${n}${s[2]}`);
    } catch {
      return new Re(599, "BAD REQUEST (invalid IPFS URI)", {}, null, new Qt(e));
    }
  }
  return t;
}
const yr = {
  data: Za,
  ipfs: Wa("https://gateway.ipfs.io/ipfs/")
}, ja = /* @__PURE__ */ new WeakMap();
class Bu {
  #t;
  #e;
  constructor(t) {
    this.#t = [], this.#e = !1, ja.set(t, () => {
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
function wr(n) {
  if (n == null)
    throw new Error("missing signal; should not happen");
  return n.checkSignal(), n;
}
class Qt {
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
  #l;
  #p;
  #g;
  #c;
  #u;
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
      this.#i = Rt(t), this.#a = "text/plain";
    else if (t instanceof Uint8Array)
      this.#i = t, this.#a = "application/octet-stream";
    else if (typeof t == "object")
      this.#i = Rt(JSON.stringify(t)), this.#a = "application/json";
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
    return this.#f && (t.authorization = `Basic ${Eu(Rt(this.#f))}`), this.allowGzip && (t["accept-encoding"] = "gzip"), t["content-type"] == null && this.#a && (t["content-type"] = this.#a), this.body && (t["content-length"] = String(this.body.length)), t;
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
    return this.#l || null;
  }
  set preflightFunc(t) {
    this.#l = t;
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
    return this.#p || null;
  }
  set processFunc(t) {
    this.#p = t;
  }
  /**
   *  This function is called on each retry attempt.
   */
  get retryFunc() {
    return this.#g || null;
  }
  set retryFunc(t) {
    this.#g = t;
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
    return this.#h || co;
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
    this.#o = String(t), this.#t = !1, this.#e = !0, this.#n = {}, this.#r = "", this.#s = 3e5, this.#u = {
      slotInterval: Cu,
      maxAttempts: Tu
    }, this.#h = null;
  }
  toString() {
    return `<FetchRequest method=${JSON.stringify(this.method)} url=${JSON.stringify(this.url)} headers=${JSON.stringify(this.headers)} body=${this.#i ? U(this.#i) : "null"}>`;
  }
  /**
   *  Update the throttle parameters used to determine maximum
   *  attempts and exponential-backoff properties.
   */
  setThrottleParams(t) {
    t.slotInterval != null && (this.#u.slotInterval = t.slotInterval), t.maxAttempts != null && (this.#u.maxAttempts = t.maxAttempts);
  }
  async #d(t, e, r, s, i) {
    if (t >= this.#u.maxAttempts)
      return i.makeServerError("exceeded maximum retry limit");
    I(lo() <= e, "timeout", "TIMEOUT", {
      operation: "request.send",
      reason: "timeout",
      request: s
    }), r > 0 && await ku(r);
    let o = this.clone();
    const a = (o.url.split(":")[0] || "").toLowerCase();
    if (a in yr) {
      const u = await yr[a](o.url, wr(s.#c));
      if (u instanceof Re) {
        let f = u;
        if (this.processFunc) {
          wr(s.#c);
          try {
            f = await this.processFunc(o, f);
          } catch (h) {
            (h.throttle == null || typeof h.stall != "number") && f.makeServerError("error in post-processing function", h).assertOk();
          }
        }
        return f;
      }
      o = u;
    }
    this.preflightFunc && (o = await this.preflightFunc(o));
    const c = await this.getUrlFunc(o, wr(s.#c));
    let l = new Re(c.statusCode, c.statusMessage, c.headers, c.body, s);
    if (l.statusCode === 301 || l.statusCode === 302) {
      try {
        const u = l.headers.location || "";
        return o.redirect(u).#d(t + 1, e, 0, s, l);
      } catch {
      }
      return l;
    } else if (l.statusCode === 429 && (this.retryFunc == null || await this.retryFunc(o, l, t))) {
      const u = l.headers["retry-after"];
      let f = this.#u.slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
      return typeof u == "string" && u.match(/^[1-9][0-9]*$/) && (f = parseInt(u)), o.clone().#d(t + 1, e, f, s, l);
    }
    if (this.processFunc) {
      wr(s.#c);
      try {
        l = await this.processFunc(o, l);
      } catch (u) {
        (u.throttle == null || typeof u.stall != "number") && l.makeServerError("error in post-processing function", u).assertOk();
        let f = this.#u.slotInterval * Math.trunc(Math.random() * Math.pow(2, t));
        return u.stall >= 0 && (f = u.stall), o.clone().#d(t + 1, e, f, s, l);
      }
    }
    return l;
  }
  /**
   *  Resolves to the response by sending the request.
   */
  send() {
    return I(this.#c == null, "request already sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.send" }), this.#c = new Bu(this), this.#d(0, lo() + this.timeout, 0, this, new Re(0, "", {}, null, this));
  }
  /**
   *  Cancels the inflight response, causing a ``CANCELLED``
   *  error to be rejected from the [[send]].
   */
  cancel() {
    I(this.#c != null, "request has not been sent", "UNSUPPORTED_OPERATION", { operation: "fetchRequest.cancel" });
    const t = ja.get(this);
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
    const s = new Qt(t);
    return s.method = "GET", s.allowGzip = this.allowGzip, s.timeout = this.timeout, s.#n = Object.assign({}, this.#n), this.#i && (s.#i = new Uint8Array(this.#i)), s.#a = this.#a, s;
  }
  /**
   *  Create a new copy of this request.
   */
  clone() {
    const t = new Qt(this.url);
    return t.#r = this.#r, this.#i && (t.#i = this.#i), t.#a = this.#a, t.#n = Object.assign({}, this.#n), t.#f = this.#f, this.allowGzip && (t.allowGzip = !0), t.timeout = this.timeout, this.allowInsecureAuthentication && (t.allowInsecureAuthentication = !0), t.#l = this.#l, t.#p = this.#p, t.#g = this.#g, t.#u = Object.assign({}, this.#u), t.#h = this.#h, t;
  }
  /**
   *  Locks all static configuration for gateways and FetchGetUrlFunc
   *  registration.
   */
  static lockConfig() {
    gs = !0;
  }
  /**
   *  Get the current Gateway function for %%scheme%%.
   */
  static getGateway(t) {
    return yr[t.toLowerCase()] || null;
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
    if (gs)
      throw new Error("gateways locked");
    yr[t] = e;
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
    if (gs)
      throw new Error("gateways locked");
    co = t;
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
    return Ja();
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
    return Za;
  }
  /**
   *  Creates a function that will fetch IPFS (unvalidated) from
   *  a custom gateway baseUrl.
   *
   *  The default IPFS gateway used internally is
   *  ``"https:/\/gateway.ipfs.io/ipfs/"``.
   */
  static createIpfsGatewayFunc(t) {
    return Wa(t);
  }
}
class Re {
  #t;
  #e;
  #n;
  #r;
  #s;
  #o;
  toString() {
    return `<FetchResponse status=${this.statusCode} body=${this.#r ? U(this.#r) : "null"}>`;
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
      return this.#r == null ? "" : _r(this.#r);
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
    const s = new Re(599, r, this.headers, this.body, this.#s || void 0);
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
    throw F(r, { stall: e, throttle: !0 }), r;
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
      this.#r && (s = _r(this.#r));
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
function lo() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function Ru(n) {
  return Rt(n.replace(/%([0-9a-f][0-9a-f])/gi, (t, e) => String.fromCharCode(parseInt(e, 16))));
}
function ku(n) {
  return new Promise((t) => setTimeout(t, n));
}
const Uu = BigInt(-1), Wt = BigInt(0), bn = BigInt(1), Du = BigInt(5), hn = {};
let xn = "0000";
for (; xn.length < 80; )
  xn += xn;
function Fe(n) {
  let t = xn;
  for (; t.length < n; )
    t += t;
  return BigInt("1" + t.substring(0, n));
}
function Vn(n, t, e) {
  const r = BigInt(t.width);
  if (t.signed) {
    const s = bn << r - bn;
    I(e == null || n >= -s && n < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: n
    }), n > Wt ? n = Lr(ze(n, r), r) : n = -Lr(ze(-n, r), r);
  } else {
    const s = bn << r;
    I(e == null || n >= 0 && n < s, "overflow", "NUMERIC_FAULT", {
      operation: e,
      fault: "overflow",
      value: n
    }), n = (n % s + s) % s & s - bn;
  }
  return n;
}
function ys(n) {
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
    const i = n, o = (a, c, l) => i[a] == null ? l : (g(typeof i[a] === c, "invalid fixed format (" + a + " not " + c + ")", "format." + a, i[a]), i[a]);
    t = o("signed", "boolean", t), e = o("width", "number", e), r = o("decimals", "number", r);
  }
  g(e % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", e), g(r <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", r);
  const s = (t ? "" : "u") + "fixed" + String(e) + "x" + String(r);
  return { signed: t, width: e, decimals: r, name: s };
}
function Lu(n, t) {
  let e = "";
  n < Wt && (e = "-", n *= Uu);
  let r = n.toString();
  if (t === 0)
    return e + r;
  for (; r.length <= t; )
    r = xn + r;
  const s = r.length - t;
  for (r = r.substring(0, s) + "." + r.substring(s); r[0] === "0" && r[1] !== "."; )
    r = r.substring(1);
  for (; r[r.length - 1] === "0" && r[r.length - 2] !== "."; )
    r = r.substring(0, r.length - 1);
  return e + r;
}
class Be {
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
    ar(t, hn, "FixedNumber"), this.#e = e, this.#t = r;
    const s = Lu(e, r.decimals);
    F(this, { format: r.name, _value: s }), this.#n = Fe(r.decimals);
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
    return t = Vn(t, this.#t, e), new Be(hn, t, this.#t);
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
    return I(e % this.#n === Wt, "precision lost during signalling mul", "NUMERIC_FAULT", {
      operation: "mulSignal",
      fault: "underflow",
      value: this
    }), this.#s(e / this.#n, "mulSignal");
  }
  #f(t, e) {
    return I(t.#e !== Wt, "division by zero", "NUMERIC_FAULT", {
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
    I(t.#e !== Wt, "division by zero", "NUMERIC_FAULT", {
      operation: "div",
      fault: "divide-by-zero",
      value: this
    }), this.#r(t);
    const e = this.#e * this.#n;
    return I(e % t.#e === Wt, "precision lost during signalling div", "NUMERIC_FAULT", {
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
    return s > 0 ? r *= Fe(s) : s < 0 && (e *= Fe(-s)), e < r ? -1 : e > r ? 1 : 0;
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
    return this.#e < Wt && (t -= this.#n - bn), t = this.#e / this.#n * this.#n, this.#s(t, "floor");
  }
  /**
   *  Returns a new [[FixedNumber]] which is the smallest **integer**
   *  that is greater than or equal to %%this%%.
   *
   *  The decimal component of the result will always be ``0``.
   */
  ceiling() {
    let t = this.#e;
    return this.#e > Wt && (t += this.#n - bn), t = this.#e / this.#n * this.#n, this.#s(t, "ceiling");
  }
  /**
   *  Returns a new [[FixedNumber]] with the decimal component
   *  rounded up on ties at %%decimals%% places.
   */
  round(t) {
    if (t == null && (t = 0), t >= this.decimals)
      return this;
    const e = this.decimals - t, r = Du * Fe(e - 1);
    let s = this.value + r;
    const i = Fe(e);
    return s = s / i * i, Vn(s, this.#t, "round"), new Be(hn, s, this.#t);
  }
  /**
   *  Returns true if %%this%% is equal to ``0``.
   */
  isZero() {
    return this.#e === Wt;
  }
  /**
   *  Returns true if %%this%% is less than ``0``.
   */
  isNegative() {
    return this.#e < Wt;
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
    return Be.fromString(this.toString(), t);
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
    const s = e == null ? 0 : Q(e), i = ys(r);
    let o = D(t, "value");
    const a = s - i.decimals;
    if (a > 0) {
      const c = Fe(a);
      I(o % c === Wt, "value loses precision for format", "NUMERIC_FAULT", {
        operation: "fromValue",
        fault: "underflow",
        value: t
      }), o /= c;
    } else a < 0 && (o *= Fe(-a));
    return Vn(o, i, "fromValue"), new Be(hn, o, i);
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
    const s = ys(e);
    let i = r[2] || "0", o = r[3] || "";
    for (; o.length < s.decimals; )
      o += xn;
    I(o.substring(s.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
      operation: "fromString",
      fault: "underflow",
      value: t
    }), o = o.substring(0, s.decimals);
    const a = BigInt(r[1] + i + o);
    return Vn(a, s, "fromString"), new Be(hn, a, s);
  }
  /**
   *  Creates a new [[FixedNumber]] with the big-endian representation
   *  %%value%% with %%format%%.
   *
   *  This will throw a [[NumericFaultError]] if %%value%% cannot fit
   *  in %%format%% due to overflow.
   */
  static fromBytes(t, e) {
    let r = vn(V(t, "value"));
    const s = ys(e);
    return s.signed && (r = Lr(r, s.width)), Vn(r, s, "fromBytes"), new Be(hn, r, s);
  }
}
function _u(n) {
  let t = n.toString(16);
  for (; t.length < 2; )
    t = "0" + t;
  return "0x" + t;
}
function uo(n, t, e) {
  let r = 0;
  for (let s = 0; s < e; s++)
    r = r * 256 + n[t + s];
  return r;
}
function fo(n, t, e, r) {
  const s = [];
  for (; e < t + 1 + r; ) {
    const i = qa(n, e);
    s.push(i.result), e += i.consumed, I(e <= t + 1 + r, "child data too short", "BUFFER_OVERRUN", {
      buffer: n,
      length: r,
      offset: t
    });
  }
  return { consumed: 1 + r, result: s };
}
function qa(n, t) {
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
    const s = uo(n, t + 1, r);
    return e(t + 1 + r + s), fo(n, t, t + 1 + r, r + s);
  } else if (n[t] >= 192) {
    const r = n[t] - 192;
    return e(t + 1 + r), fo(n, t, t + 1, r);
  } else if (n[t] >= 184) {
    const r = n[t] - 183;
    e(t + 1 + r);
    const s = uo(n, t + 1, r);
    e(t + 1 + r + s);
    const i = U(n.slice(t + 1 + r, t + 1 + r + s));
    return { consumed: 1 + r + s, result: i };
  } else if (n[t] >= 128) {
    const r = n[t] - 128;
    e(t + 1 + r);
    const s = U(n.slice(t + 1, t + 1 + r));
    return { consumed: 1 + r, result: s };
  }
  return { consumed: 1, result: _u(n[t]) };
}
function qr(n) {
  const t = V(n, "data"), e = qa(t, 0);
  return g(e.consumed === t.length, "unexpected junk after rlp payload", "data", n), e.result;
}
function ho(n) {
  const t = [];
  for (; n; )
    t.unshift(n & 255), n >>= 8;
  return t;
}
function Xa(n) {
  if (Array.isArray(n)) {
    let r = [];
    if (n.forEach(function(i) {
      r = r.concat(Xa(i));
    }), r.length <= 55)
      return r.unshift(192 + r.length), r;
    const s = ho(r.length);
    return s.unshift(247 + s.length), s.concat(r);
  }
  const t = Array.prototype.slice.call(V(n, "object"));
  if (t.length === 1 && t[0] <= 127)
    return t;
  if (t.length <= 55)
    return t.unshift(128 + t.length), t;
  const e = ho(t.length);
  return e.unshift(183 + e.length), e.concat(t);
}
const po = "0123456789abcdef";
function nn(n) {
  let t = "0x";
  for (const e of Xa(n))
    t += po[e >> 4], t += po[e & 15];
  return t;
}
const Fu = [
  "wei",
  "kwei",
  "mwei",
  "gwei",
  "szabo",
  "finney",
  "ether"
];
function go(n, t) {
  let e = 18;
  if (typeof t == "string") {
    const r = Fu.indexOf(t);
    g(r >= 0, "invalid unit", "unit", t), e = 3 * r;
  } else t != null && (e = Q(t, "unit"));
  return Be.fromValue(n, e, { decimals: e, width: 512 }).toString();
}
const Pt = 32, Js = new Uint8Array(Pt), Mu = ["then"], mr = {}, Ya = /* @__PURE__ */ new WeakMap();
function He(n) {
  return Ya.get(n);
}
function yo(n, t) {
  Ya.set(n, t);
}
function zn(n, t) {
  const e = new Error(`deferred error during ABI decoding triggered accessing ${n}`);
  throw e.error = t, e;
}
function Zs(n, t, e) {
  return n.indexOf(null) >= 0 ? t.map((r, s) => r instanceof me ? Zs(He(r), r, e) : r) : n.reduce((r, s, i) => {
    let o = t.getValue(s);
    return s in r || (e && o instanceof me && (o = Zs(He(o), o, e)), r[s] = o), r;
  }, {});
}
class me extends Array {
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
    e !== mr && (r = t, s = [], i = !1), super(r.length), r.forEach((c, l) => {
      this[l] = c;
    });
    const o = s.reduce((c, l) => (typeof l == "string" && c.set(l, (c.get(l) || 0) + 1), c), /* @__PURE__ */ new Map());
    if (yo(this, Object.freeze(r.map((c, l) => {
      const u = s[l];
      return u != null && o.get(u) === 1 ? u : null;
    }))), this.#t = [], this.#t == null && this.#t, !i)
      return;
    Object.freeze(this);
    const a = new Proxy(this, {
      get: (c, l, u) => {
        if (typeof l == "string") {
          if (l.match(/^[0-9]+$/)) {
            const h = Q(l, "%index");
            if (h < 0 || h >= this.length)
              throw new RangeError("out of result range");
            const y = c[h];
            return y instanceof Error && zn(`index ${h}`, y), y;
          }
          if (Mu.indexOf(l) >= 0)
            return Reflect.get(c, l, u);
          const f = c[l];
          if (f instanceof Function)
            return function(...h) {
              return f.apply(this === u ? c : this, h);
            };
          if (!(l in c))
            return c.getValue.apply(this === u ? c : this, [l]);
        }
        return Reflect.get(c, l, u);
      }
    });
    return yo(a, He(this)), a;
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
      r instanceof Error && zn(`index ${s}`, r), t && r instanceof me && (r = r.toArray(t)), e.push(r);
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
    const e = He(this);
    return e.reduce((r, s, i) => (I(s != null, `value at index ${i} unnamed`, "UNSUPPORTED_OPERATION", {
      operation: "toObject()"
    }), Zs(e, this, t)), {});
  }
  /**
   *  @_ignore
   */
  slice(t, e) {
    t == null && (t = 0), t < 0 && (t += this.length, t < 0 && (t = 0)), e == null && (e = this.length), e < 0 && (e += this.length, e < 0 && (e = 0)), e > this.length && (e = this.length);
    const r = He(this), s = [], i = [];
    for (let o = t; o < e; o++)
      s.push(this[o]), i.push(r[o]);
    return new me(mr, s, i);
  }
  /**
   *  @_ignore
   */
  filter(t, e) {
    const r = He(this), s = [], i = [];
    for (let o = 0; o < this.length; o++) {
      const a = this[o];
      a instanceof Error && zn(`index ${o}`, a), t.call(e, a, o, this) && (s.push(a), i.push(r[o]));
    }
    return new me(mr, s, i);
  }
  /**
   *  @_ignore
   */
  map(t, e) {
    const r = [];
    for (let s = 0; s < this.length; s++) {
      const i = this[s];
      i instanceof Error && zn(`index ${s}`, i), r.push(t.call(e, i, s, this));
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
    const e = He(this).indexOf(t);
    if (e === -1)
      return;
    const r = this[e];
    return r instanceof Error && zn(`property ${JSON.stringify(t)}`, r.error), r;
  }
  /**
   *  Creates a new [[Result]] for %%items%% with each entry
   *  also accessible by its corresponding name in %%keys%%.
   */
  static fromItems(t, e) {
    return new me(mr, t, e);
  }
}
function wo(n) {
  let t = gt(n);
  return I(t.length <= Pt, "value out-of-bounds", "BUFFER_OVERRUN", { buffer: t, length: Pt, offset: t.length }), t.length !== Pt && (t = Nt(tt([Js.slice(t.length % Pt), t]))), t;
}
class xe {
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
    F(this, { name: t, type: e, localName: r, dynamic: s }, {
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
class Ws {
  // An array of WordSize lengthed objects to concatenation
  #t;
  #e;
  constructor() {
    this.#t = [], this.#e = 0;
  }
  get data() {
    return tt(this.#t);
  }
  get length() {
    return this.#e;
  }
  #n(t) {
    return this.#t.push(t), this.#e += t.length, t.length;
  }
  appendWriter(t) {
    return this.#n(Nt(t.data));
  }
  // Arrayish item; pad on the right to *nearest* WordSize
  writeBytes(t) {
    let e = Nt(t);
    const r = e.length % Pt;
    return r && (e = Nt(tt([e, Js.slice(r)]))), this.#n(e);
  }
  // Numeric item; pad on the left *to* WordSize
  writeValue(t) {
    return this.#n(wo(t));
  }
  // Inserts a numeric place-holder, returning a callback that can
  // be used to asjust the value later
  writeUpdatableValue() {
    const t = this.#t.length;
    return this.#t.push(Js), this.#e += Pt, (e) => {
      this.#t[t] = wo(e);
    };
  }
}
class vi {
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
    F(this, { allowLoose: !!e }), this.#t = Nt(t), this.#n = 0, this.#r = null, this.#s = r ?? 1024, this.#e = 0;
  }
  get data() {
    return U(this.#t);
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
      buffer: Nt(this.#t),
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
      buffer: Nt(this.#t),
      length: this.#t.length,
      offset: this.#e + s
    })), this.#t.slice(this.#e, this.#e + s);
  }
  // Create a sub-reader with the same underlying data, but offset
  subReader(t) {
    const e = new vi(this.#t.slice(this.#e + t), this.allowLoose, this.#s);
    return e.#r = this, e;
  }
  // Read bytes
  readBytes(t, e) {
    let r = this.#i(0, t, !!e);
    return this.#o(t), this.#e += r.length, r.slice(0, t);
  }
  // Read a numeric values
  readValue() {
    return vn(this.readBytes(Pt));
  }
  readIndex() {
    return mu(this.readBytes(Pt));
  }
}
const mo = globalThis || void 0 || self;
function Fr(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`Wrong positive integer: ${n}`);
}
function Ti(n, ...t) {
  if (!(n instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Expected Uint8Array of length ${t}, not of length=${n.length}`);
}
function Hu(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Fr(n.outputLen), Fr(n.blockLen);
}
function Tn(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function tc(n, t) {
  Ti(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const ws = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ec = (n) => n instanceof Uint8Array, Gu = (n) => new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4)), ms = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), re = (n, t) => n << 32 - t | n >>> t, Vu = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Vu)
  throw new Error("Non little-endian hardware is not supported");
function zu(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Xr(n) {
  if (typeof n == "string" && (n = zu(n)), !ec(n))
    throw new Error(`expected Uint8Array, got ${typeof n}`);
  return n;
}
function Qu(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!ec(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
let Ci = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function Oi(n) {
  const t = (r) => n().update(Xr(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function $u(n = 32) {
  if (ws && typeof ws.getRandomValues == "function")
    return ws.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
let nc = class extends Ci {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, Hu(t);
    const r = Xr(e);
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
    Tn(this), Ti(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const rc = (n, t, e) => new nc(n, t).update(e).digest();
rc.create = (n, t) => new nc(n, t);
function Ku(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), a = Number(e & i), c = r ? 4 : 0, l = r ? 0 : 4;
  n.setUint32(t + c, o, r), n.setUint32(t + l, a, r);
}
class sc extends Ci {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = ms(this.buffer);
  }
  update(t) {
    Tn(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Xr(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const c = ms(t);
        for (; s <= i - o; o += s)
          this.process(c, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Tn(this), tc(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let f = o; f < s; f++)
      e[f] = 0;
    Ku(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = ms(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < l; f++)
      a.setUint32(4 * f, u[f], i);
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
const Ju = (n, t, e) => n & t ^ ~n & e, Zu = (n, t, e) => n & t ^ n & e ^ t & e, Wu = /* @__PURE__ */ new Uint32Array([
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
]), Ne = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Pe = /* @__PURE__ */ new Uint32Array(64);
let ju = class extends sc {
  constructor() {
    super(64, 32, 8, !1), this.A = Ne[0] | 0, this.B = Ne[1] | 0, this.C = Ne[2] | 0, this.D = Ne[3] | 0, this.E = Ne[4] | 0, this.F = Ne[5] | 0, this.G = Ne[6] | 0, this.H = Ne[7] | 0;
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
    for (let f = 0; f < 16; f++, e += 4)
      Pe[f] = t.getUint32(e, !1);
    for (let f = 16; f < 64; f++) {
      const h = Pe[f - 15], y = Pe[f - 2], m = re(h, 7) ^ re(h, 18) ^ h >>> 3, p = re(y, 17) ^ re(y, 19) ^ y >>> 10;
      Pe[f] = p + Pe[f - 7] + m + Pe[f - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: c, G: l, H: u } = this;
    for (let f = 0; f < 64; f++) {
      const h = re(a, 6) ^ re(a, 11) ^ re(a, 25), y = u + h + Ju(a, c, l) + Wu[f] + Pe[f] | 0, p = (re(r, 2) ^ re(r, 13) ^ re(r, 22)) + Zu(r, s, i) | 0;
      u = l, l = c, c = a, a = o + y | 0, o = i, i = s, s = r, r = y + p | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(r, s, i, o, a, c, l, u);
  }
  roundClean() {
    Pe.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
const ic = /* @__PURE__ */ Oi(() => new ju()), Ar = /* @__PURE__ */ BigInt(2 ** 32 - 1), js = /* @__PURE__ */ BigInt(32);
function oc(n, t = !1) {
  return t ? { h: Number(n & Ar), l: Number(n >> js & Ar) } : { h: Number(n >> js & Ar) | 0, l: Number(n & Ar) | 0 };
}
function ac(n, t = !1) {
  let e = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: i, l: o } = oc(n[s], t);
    [e[s], r[s]] = [i, o];
  }
  return [e, r];
}
const qu = (n, t) => BigInt(n >>> 0) << js | BigInt(t >>> 0), Xu = (n, t, e) => n >>> e, Yu = (n, t, e) => n << 32 - e | t >>> e, tf = (n, t, e) => n >>> e | t << 32 - e, ef = (n, t, e) => n << 32 - e | t >>> e, nf = (n, t, e) => n << 64 - e | t >>> e - 32, rf = (n, t, e) => n >>> e - 32 | t << 64 - e, sf = (n, t) => t, of = (n, t) => n, cc = (n, t, e) => n << e | t >>> 32 - e, lc = (n, t, e) => t << e | n >>> 32 - e, uc = (n, t, e) => t << e - 32 | n >>> 64 - e, fc = (n, t, e) => n << e - 32 | t >>> 64 - e;
function af(n, t, e, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: n + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const cf = (n, t, e) => (n >>> 0) + (t >>> 0) + (e >>> 0), lf = (n, t, e, r) => t + e + r + (n / 2 ** 32 | 0) | 0, uf = (n, t, e, r) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0), ff = (n, t, e, r, s) => t + e + r + s + (n / 2 ** 32 | 0) | 0, hf = (n, t, e, r, s) => (n >>> 0) + (t >>> 0) + (e >>> 0) + (r >>> 0) + (s >>> 0), df = (n, t, e, r, s, i) => t + e + r + s + i + (n / 2 ** 32 | 0) | 0, z = {
  fromBig: oc,
  split: ac,
  toBig: qu,
  shrSH: Xu,
  shrSL: Yu,
  rotrSH: tf,
  rotrSL: ef,
  rotrBH: nf,
  rotrBL: rf,
  rotr32H: sf,
  rotr32L: of,
  rotlSH: cc,
  rotlSL: lc,
  rotlBH: uc,
  rotlBL: fc,
  add: af,
  add3L: cf,
  add3H: lf,
  add4L: uf,
  add4H: ff,
  add5H: df,
  add5L: hf
}, [pf, gf] = z.split([
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
].map((n) => BigInt(n))), ve = /* @__PURE__ */ new Uint32Array(80), Te = /* @__PURE__ */ new Uint32Array(80);
class yf extends sc {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: r, Bl: s, Ch: i, Cl: o, Dh: a, Dl: c, Eh: l, El: u, Fh: f, Fl: h, Gh: y, Gl: m, Hh: p, Hl: d } = this;
    return [t, e, r, s, i, o, a, c, l, u, f, h, y, m, p, d];
  }
  // prettier-ignore
  set(t, e, r, s, i, o, a, c, l, u, f, h, y, m, p, d) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = r | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = o | 0, this.Dh = a | 0, this.Dl = c | 0, this.Eh = l | 0, this.El = u | 0, this.Fh = f | 0, this.Fl = h | 0, this.Gh = y | 0, this.Gl = m | 0, this.Hh = p | 0, this.Hl = d | 0;
  }
  process(t, e) {
    for (let b = 0; b < 16; b++, e += 4)
      ve[b] = t.getUint32(e), Te[b] = t.getUint32(e += 4);
    for (let b = 16; b < 80; b++) {
      const C = ve[b - 15] | 0, T = Te[b - 15] | 0, N = z.rotrSH(C, T, 1) ^ z.rotrSH(C, T, 8) ^ z.shrSH(C, T, 7), P = z.rotrSL(C, T, 1) ^ z.rotrSL(C, T, 8) ^ z.shrSL(C, T, 7), v = ve[b - 2] | 0, B = Te[b - 2] | 0, M = z.rotrSH(v, B, 19) ^ z.rotrBH(v, B, 61) ^ z.shrSH(v, B, 6), L = z.rotrSL(v, B, 19) ^ z.rotrBL(v, B, 61) ^ z.shrSL(v, B, 6), G = z.add4L(P, L, Te[b - 7], Te[b - 16]), Z = z.add4H(G, N, M, ve[b - 7], ve[b - 16]);
      ve[b] = Z | 0, Te[b] = G | 0;
    }
    let { Ah: r, Al: s, Bh: i, Bl: o, Ch: a, Cl: c, Dh: l, Dl: u, Eh: f, El: h, Fh: y, Fl: m, Gh: p, Gl: d, Hh: w, Hl: x } = this;
    for (let b = 0; b < 80; b++) {
      const C = z.rotrSH(f, h, 14) ^ z.rotrSH(f, h, 18) ^ z.rotrBH(f, h, 41), T = z.rotrSL(f, h, 14) ^ z.rotrSL(f, h, 18) ^ z.rotrBL(f, h, 41), N = f & y ^ ~f & p, P = h & m ^ ~h & d, v = z.add5L(x, T, P, gf[b], Te[b]), B = z.add5H(v, w, C, N, pf[b], ve[b]), M = v | 0, L = z.rotrSH(r, s, 28) ^ z.rotrBH(r, s, 34) ^ z.rotrBH(r, s, 39), G = z.rotrSL(r, s, 28) ^ z.rotrBL(r, s, 34) ^ z.rotrBL(r, s, 39), Z = r & i ^ r & a ^ i & a, O = s & o ^ s & c ^ o & c;
      w = p | 0, x = d | 0, p = y | 0, d = m | 0, y = f | 0, m = h | 0, { h: f, l: h } = z.add(l | 0, u | 0, B | 0, M | 0), l = a | 0, u = c | 0, a = i | 0, c = o | 0, i = r | 0, o = s | 0;
      const A = z.add3L(M, G, O);
      r = z.add3H(A, B, L, Z), s = A | 0;
    }
    ({ h: r, l: s } = z.add(this.Ah | 0, this.Al | 0, r | 0, s | 0)), { h: i, l: o } = z.add(this.Bh | 0, this.Bl | 0, i | 0, o | 0), { h: a, l: c } = z.add(this.Ch | 0, this.Cl | 0, a | 0, c | 0), { h: l, l: u } = z.add(this.Dh | 0, this.Dl | 0, l | 0, u | 0), { h: f, l: h } = z.add(this.Eh | 0, this.El | 0, f | 0, h | 0), { h: y, l: m } = z.add(this.Fh | 0, this.Fl | 0, y | 0, m | 0), { h: p, l: d } = z.add(this.Gh | 0, this.Gl | 0, p | 0, d | 0), { h: w, l: x } = z.add(this.Hh | 0, this.Hl | 0, w | 0, x | 0), this.set(r, s, i, o, a, c, l, u, f, h, y, m, p, d, w, x);
  }
  roundClean() {
    ve.fill(0), Te.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const wf = /* @__PURE__ */ Oi(() => new yf());
function mf() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof mo < "u")
    return mo;
  throw new Error("unable to locate global object");
}
const Ao = mf();
Ao.crypto || Ao.msCrypto;
function Af(n) {
  switch (n) {
    case "sha256":
      return ic.create();
    case "sha512":
      return wf.create();
  }
  g(!1, "invalid hashing algorithm name", "algorithm", n);
}
const [hc, dc, pc] = [[], [], []], bf = /* @__PURE__ */ BigInt(0), Qn = /* @__PURE__ */ BigInt(1), Ef = /* @__PURE__ */ BigInt(2), xf = /* @__PURE__ */ BigInt(7), If = /* @__PURE__ */ BigInt(256), Nf = /* @__PURE__ */ BigInt(113);
for (let n = 0, t = Qn, e = 1, r = 0; n < 24; n++) {
  [e, r] = [r, (2 * e + 3 * r) % 5], hc.push(2 * (5 * r + e)), dc.push((n + 1) * (n + 2) / 2 % 64);
  let s = bf;
  for (let i = 0; i < 7; i++)
    t = (t << Qn ^ (t >> xf) * Nf) % If, t & Ef && (s ^= Qn << (Qn << /* @__PURE__ */ BigInt(i)) - Qn);
  pc.push(s);
}
const [Pf, vf] = /* @__PURE__ */ ac(pc, !0), bo = (n, t, e) => e > 32 ? uc(n, t, e) : cc(n, t, e), Eo = (n, t, e) => e > 32 ? fc(n, t, e) : lc(n, t, e);
function Tf(n, t = 24) {
  const e = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      e[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = e[c], u = e[c + 1], f = bo(l, u, 1) ^ e[a], h = Eo(l, u, 1) ^ e[a + 1];
      for (let y = 0; y < 50; y += 10)
        n[o + y] ^= f, n[o + y + 1] ^= h;
    }
    let s = n[2], i = n[3];
    for (let o = 0; o < 24; o++) {
      const a = dc[o], c = bo(s, i, a), l = Eo(s, i, a), u = hc[o];
      s = n[u], i = n[u + 1], n[u] = c, n[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        e[a] = n[o + a];
      for (let a = 0; a < 10; a++)
        n[o + a] ^= ~e[(a + 2) % 10] & e[(a + 4) % 10];
    }
    n[0] ^= Pf[r], n[1] ^= vf[r];
  }
  e.fill(0);
}
let Cf = class gc extends Ci {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Fr(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = Gu(this.state);
  }
  keccak() {
    Tf(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Tn(this);
    const { blockLen: e, state: r } = this;
    t = Xr(t);
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
    Tn(this, !1), Ti(t), this.finish();
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
    return Fr(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (tc(t, this), this.finished)
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
    return t || (t = new gc(e, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
};
const Of = (n, t, e) => Oi(() => new Cf(t, n, e)), Sf = /* @__PURE__ */ Of(1, 136, 256 / 8);
let yc = !1;
const wc = function(n) {
  return Sf(n);
};
let mc = wc;
function it(n) {
  const t = V(n, "data");
  return U(mc(t));
}
it._ = wc;
it.lock = function() {
  yc = !0;
};
it.register = function(n) {
  if (yc)
    throw new TypeError("keccak256 is locked");
  mc = n;
};
Object.freeze(it);
const Ac = function(n) {
  return Af("sha256").update(n).digest();
};
let bc = Ac, Ec = !1;
function Ue(n) {
  const t = V(n, "data");
  return U(bc(t));
}
Ue._ = Ac;
Ue.lock = function() {
  Ec = !0;
};
Ue.register = function(n) {
  if (Ec)
    throw new Error("sha256 is locked");
  bc = n;
};
Object.freeze(Ue);
Object.freeze(Ue);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xc = BigInt(0), Yr = BigInt(1), Bf = BigInt(2), ts = (n) => n instanceof Uint8Array, Rf = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function Cn(n) {
  if (!ts(n))
    throw new Error("Uint8Array expected");
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += Rf[n[e]];
  return t;
}
function Ic(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Si(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
function On(n) {
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
function Ze(n) {
  return Si(Cn(n));
}
function Bi(n) {
  if (!ts(n))
    throw new Error("Uint8Array expected");
  return Si(Cn(Uint8Array.from(n).reverse()));
}
function Sn(n, t) {
  return On(n.toString(16).padStart(t * 2, "0"));
}
function Ri(n, t) {
  return Sn(n, t).reverse();
}
function kf(n) {
  return On(Ic(n));
}
function jt(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = On(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (ts(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function Xn(...n) {
  const t = new Uint8Array(n.reduce((r, s) => r + s.length, 0));
  let e = 0;
  return n.forEach((r) => {
    if (!ts(r))
      throw new Error("Uint8Array expected");
    t.set(r, e), e += r.length;
  }), t;
}
function Uf(n, t) {
  if (n.length !== t.length)
    return !1;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !1;
  return !0;
}
function Df(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Lf(n) {
  let t;
  for (t = 0; n > xc; n >>= Yr, t += 1)
    ;
  return t;
}
function _f(n, t) {
  return n >> BigInt(t) & Yr;
}
const Ff = (n, t, e) => n | (e ? Yr : xc) << BigInt(t), ki = (n) => (Bf << BigInt(n - 1)) - Yr, As = (n) => new Uint8Array(n), xo = (n) => Uint8Array.from(n);
function Nc(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = As(n), s = As(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, a = (...f) => e(s, r, ...f), c = (f = As()) => {
    s = a(xo([0]), f), r = a(), f.length !== 0 && (s = a(xo([1]), f), r = a());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let f = 0;
    const h = [];
    for (; f < t; ) {
      r = a();
      const y = r.slice();
      h.push(y), f += r.length;
    }
    return Xn(...h);
  };
  return (f, h) => {
    o(), c(f);
    let y;
    for (; !(y = h(l())); )
      c();
    return o(), y;
  };
}
const Mf = {
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
function cr(n, t, e = {}) {
  const r = (s, i, o) => {
    const a = Mf[i];
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
const Hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bitGet: _f,
  bitLen: Lf,
  bitMask: ki,
  bitSet: Ff,
  bytesToHex: Cn,
  bytesToNumberBE: Ze,
  bytesToNumberLE: Bi,
  concatBytes: Xn,
  createHmacDrbg: Nc,
  ensureBytes: jt,
  equalBytes: Uf,
  hexToBytes: On,
  hexToNumber: Si,
  numberToBytesBE: Sn,
  numberToBytesLE: Ri,
  numberToHexUnpadded: Ic,
  numberToVarBytesBE: kf,
  utf8ToBytes: Df,
  validateObject: cr
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const At = BigInt(0), ut = BigInt(1), Ge = BigInt(2), Gf = BigInt(3), qs = BigInt(4), Io = BigInt(5), No = BigInt(8);
BigInt(9);
BigInt(16);
function St(n, t) {
  const e = n % t;
  return e >= At ? e : t + e;
}
function Vf(n, t, e) {
  if (e <= At || t < At)
    throw new Error("Expected power/modulo > 0");
  if (e === ut)
    return At;
  let r = ut;
  for (; t > At; )
    t & ut && (r = r * n % e), n = n * n % e, t >>= ut;
  return r;
}
function Gt(n, t, e) {
  let r = n;
  for (; t-- > At; )
    r *= r, r %= e;
  return r;
}
function Xs(n, t) {
  if (n === At || t <= At)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = St(n, t), r = t, s = At, i = ut;
  for (; e !== At; ) {
    const a = r / e, c = r % e, l = s - i * a;
    r = e, e = c, s = i, i = l;
  }
  if (r !== ut)
    throw new Error("invert: does not exist");
  return St(s, t);
}
function zf(n) {
  const t = (n - ut) / Ge;
  let e, r, s;
  for (e = n - ut, r = 0; e % Ge === At; e /= Ge, r++)
    ;
  for (s = Ge; s < n && Vf(s, t, n) !== n - ut; s++)
    ;
  if (r === 1) {
    const o = (n + ut) / qs;
    return function(c, l) {
      const u = c.pow(l, o);
      if (!c.eql(c.sqr(u), l))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  const i = (e + ut) / Ge;
  return function(a, c) {
    if (a.pow(c, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let l = r, u = a.pow(a.mul(a.ONE, s), e), f = a.pow(c, i), h = a.pow(c, e);
    for (; !a.eql(h, a.ONE); ) {
      if (a.eql(h, a.ZERO))
        return a.ZERO;
      let y = 1;
      for (let p = a.sqr(h); y < l && !a.eql(p, a.ONE); y++)
        p = a.sqr(p);
      const m = a.pow(u, ut << BigInt(l - y - 1));
      u = a.sqr(m), f = a.mul(f, m), h = a.mul(h, u), l = y;
    }
    return f;
  };
}
function Qf(n) {
  if (n % qs === Gf) {
    const t = (n + ut) / qs;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (n % No === Io) {
    const t = (n - Io) / No;
    return function(r, s) {
      const i = r.mul(s, Ge), o = r.pow(i, t), a = r.mul(s, o), c = r.mul(r.mul(a, Ge), o), l = r.mul(a, r.sub(c, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return zf(n);
}
const $f = [
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
function Kf(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = $f.reduce((r, s) => (r[s] = "function", r), t);
  return cr(n, e);
}
function Jf(n, t, e) {
  if (e < At)
    throw new Error("Expected power > 0");
  if (e === At)
    return n.ONE;
  if (e === ut)
    return t;
  let r = n.ONE, s = t;
  for (; e > At; )
    e & ut && (r = n.mul(r, s)), s = n.sqr(s), e >>= ut;
  return r;
}
function Zf(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, a) => n.is0(o) ? i : (e[a] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, a) => n.is0(o) ? i : (e[a] = n.mul(i, e[a]), n.mul(i, o)), s), e;
}
function Pc(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function Wf(n, t, e = !1, r = {}) {
  if (n <= At)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = Pc(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const o = Qf(n), a = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: ki(s),
    ZERO: At,
    ONE: ut,
    create: (c) => St(c, n),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof c}`);
      return At <= c && c < n;
    },
    is0: (c) => c === At,
    isOdd: (c) => (c & ut) === ut,
    neg: (c) => St(-c, n),
    eql: (c, l) => c === l,
    sqr: (c) => St(c * c, n),
    add: (c, l) => St(c + l, n),
    sub: (c, l) => St(c - l, n),
    mul: (c, l) => St(c * l, n),
    pow: (c, l) => Jf(a, c, l),
    div: (c, l) => St(c * Xs(l, n), n),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, l) => c + l,
    subN: (c, l) => c - l,
    mulN: (c, l) => c * l,
    inv: (c) => Xs(c, n),
    sqrt: r.sqrt || ((c) => o(a, c)),
    invertBatch: (c) => Zf(a, c),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (c, l, u) => u ? l : c,
    toBytes: (c) => e ? Ri(c, i) : Sn(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${c.length}`);
      return e ? Bi(c) : Ze(c);
    }
  });
  return Object.freeze(a);
}
function vc(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function Tc(n) {
  const t = vc(n);
  return t + Math.ceil(t / 2);
}
function jf(n, t, e = !1) {
  const r = n.length, s = vc(t), i = Tc(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const o = e ? Ze(n) : Bi(n), a = St(o, t - ut) + ut;
  return e ? Ri(a, s) : Sn(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const qf = BigInt(0), bs = BigInt(1);
function Xf(n, t) {
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
      for (; i > qf; )
        i & bs && (o = o.add(a)), a = a.double(), i >>= bs;
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
      let l = s, u = l;
      for (let f = 0; f < o; f++) {
        u = l, c.push(u);
        for (let h = 1; h < a; h++)
          u = u.add(l), c.push(u);
        l = u.double();
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
      let l = n.ZERO, u = n.BASE;
      const f = BigInt(2 ** s - 1), h = 2 ** s, y = BigInt(s);
      for (let m = 0; m < a; m++) {
        const p = m * c;
        let d = Number(o & f);
        o >>= y, d > c && (d -= h, o += bs);
        const w = p, x = p + Math.abs(d) - 1, b = m % 2 !== 0, C = d < 0;
        d === 0 ? u = u.add(e(b, i[w])) : l = l.add(e(C, i[x]));
      }
      return { p: l, f: u };
    },
    wNAFCached(s, i, o, a) {
      const c = s._WINDOW_SIZE || 1;
      let l = i.get(s);
      return l || (l = this.precomputeWindow(s, c), c !== 1 && i.set(s, a(l))), this.wNAF(c, l, o);
    }
  };
}
function Cc(n) {
  return Kf(n.Fp), cr(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Pc(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Yf(n) {
  const t = Cc(n);
  cr(t, {
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
const { bytesToNumberBE: th, hexToBytes: eh } = Hf, Qe = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(n) {
    const { Err: t } = Qe;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: th(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = Qe, e = typeof n == "string" ? eh(n) : n;
    if (!(e instanceof Uint8Array))
      throw new Error("ui8a expected");
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = Qe._parseInt(e.subarray(2)), { d: o, l: a } = Qe._parseInt(i);
    if (a.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: o };
  },
  hexFromSig(n) {
    const t = (l) => Number.parseInt(l[0], 16) & 8 ? "00" + l : l, e = (l) => {
      const u = l.toString(16);
      return u.length & 1 ? `0${u}` : u;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, o = s.length / 2, a = e(i), c = e(o);
    return `30${e(o + i + 4)}02${c}${s}02${a}${r}`;
  }
}, ge = BigInt(0), Vt = BigInt(1);
BigInt(2);
const Po = BigInt(3);
BigInt(4);
function nh(n) {
  const t = Yf(n), { Fp: e } = t, r = t.toBytes || ((m, p, d) => {
    const w = p.toAffine();
    return Xn(Uint8Array.from([4]), e.toBytes(w.x), e.toBytes(w.y));
  }), s = t.fromBytes || ((m) => {
    const p = m.subarray(1), d = e.fromBytes(p.subarray(0, e.BYTES)), w = e.fromBytes(p.subarray(e.BYTES, 2 * e.BYTES));
    return { x: d, y: w };
  });
  function i(m) {
    const { a: p, b: d } = t, w = e.sqr(m), x = e.mul(w, m);
    return e.add(e.add(x, e.mul(m, p)), d);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(m) {
    return typeof m == "bigint" && ge < m && m < t.n;
  }
  function a(m) {
    if (!o(m))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function c(m) {
    const { allowedPrivateKeyLengths: p, nByteLength: d, wrapPrivateKey: w, n: x } = t;
    if (p && typeof m != "bigint") {
      if (m instanceof Uint8Array && (m = Cn(m)), typeof m != "string" || !p.includes(m.length))
        throw new Error("Invalid key");
      m = m.padStart(d * 2, "0");
    }
    let b;
    try {
      b = typeof m == "bigint" ? m : Ze(jt("private key", m, d));
    } catch {
      throw new Error(`private key must be ${d} bytes, hex or bigint, not ${typeof m}`);
    }
    return w && (b = St(b, x)), a(b), b;
  }
  const l = /* @__PURE__ */ new Map();
  function u(m) {
    if (!(m instanceof f))
      throw new Error("ProjectivePoint expected");
  }
  class f {
    constructor(p, d, w) {
      if (this.px = p, this.py = d, this.pz = w, p == null || !e.isValid(p))
        throw new Error("x required");
      if (d == null || !e.isValid(d))
        throw new Error("y required");
      if (w == null || !e.isValid(w))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x: d, y: w } = p || {};
      if (!p || !e.isValid(d) || !e.isValid(w))
        throw new Error("invalid affine point");
      if (p instanceof f)
        throw new Error("projective point not allowed");
      const x = (b) => e.eql(b, e.ZERO);
      return x(d) && x(w) ? f.ZERO : new f(d, w, e.ONE);
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
    static normalizeZ(p) {
      const d = e.invertBatch(p.map((w) => w.pz));
      return p.map((w, x) => w.toAffine(d[x])).map(f.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(p) {
      const d = f.fromAffine(s(jt("pointHex", p)));
      return d.assertValidity(), d;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(p) {
      return f.BASE.multiply(c(p));
    }
    // "Private method", don't use it directly
    _setWindowSize(p) {
      this._WINDOW_SIZE = p, l.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: p, y: d } = this.toAffine();
      if (!e.isValid(p) || !e.isValid(d))
        throw new Error("bad point: x or y not FE");
      const w = e.sqr(d), x = i(p);
      if (!e.eql(w, x))
        throw new Error("bad point: equation left != right");
      if (!this.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
    }
    hasEvenY() {
      const { y: p } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(p);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(p) {
      u(p);
      const { px: d, py: w, pz: x } = this, { px: b, py: C, pz: T } = p, N = e.eql(e.mul(d, T), e.mul(b, x)), P = e.eql(e.mul(w, T), e.mul(C, x));
      return N && P;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new f(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: p, b: d } = t, w = e.mul(d, Po), { px: x, py: b, pz: C } = this;
      let T = e.ZERO, N = e.ZERO, P = e.ZERO, v = e.mul(x, x), B = e.mul(b, b), M = e.mul(C, C), L = e.mul(x, b);
      return L = e.add(L, L), P = e.mul(x, C), P = e.add(P, P), T = e.mul(p, P), N = e.mul(w, M), N = e.add(T, N), T = e.sub(B, N), N = e.add(B, N), N = e.mul(T, N), T = e.mul(L, T), P = e.mul(w, P), M = e.mul(p, M), L = e.sub(v, M), L = e.mul(p, L), L = e.add(L, P), P = e.add(v, v), v = e.add(P, v), v = e.add(v, M), v = e.mul(v, L), N = e.add(N, v), M = e.mul(b, C), M = e.add(M, M), v = e.mul(M, L), T = e.sub(T, v), P = e.mul(M, B), P = e.add(P, P), P = e.add(P, P), new f(T, N, P);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(p) {
      u(p);
      const { px: d, py: w, pz: x } = this, { px: b, py: C, pz: T } = p;
      let N = e.ZERO, P = e.ZERO, v = e.ZERO;
      const B = t.a, M = e.mul(t.b, Po);
      let L = e.mul(d, b), G = e.mul(w, C), Z = e.mul(x, T), O = e.add(d, w), A = e.add(b, C);
      O = e.mul(O, A), A = e.add(L, G), O = e.sub(O, A), A = e.add(d, x);
      let E = e.add(b, T);
      return A = e.mul(A, E), E = e.add(L, Z), A = e.sub(A, E), E = e.add(w, x), N = e.add(C, T), E = e.mul(E, N), N = e.add(G, Z), E = e.sub(E, N), v = e.mul(B, A), N = e.mul(M, Z), v = e.add(N, v), N = e.sub(G, v), v = e.add(G, v), P = e.mul(N, v), G = e.add(L, L), G = e.add(G, L), Z = e.mul(B, Z), A = e.mul(M, A), G = e.add(G, Z), Z = e.sub(L, Z), Z = e.mul(B, Z), A = e.add(A, Z), L = e.mul(G, A), P = e.add(P, L), L = e.mul(E, A), N = e.mul(O, N), N = e.sub(N, L), L = e.mul(O, G), v = e.mul(E, v), v = e.add(v, L), new f(N, P, v);
    }
    subtract(p) {
      return this.add(p.negate());
    }
    is0() {
      return this.equals(f.ZERO);
    }
    wNAF(p) {
      return y.wNAFCached(this, l, p, (d) => {
        const w = e.invertBatch(d.map((x) => x.pz));
        return d.map((x, b) => x.toAffine(w[b])).map(f.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(p) {
      const d = f.ZERO;
      if (p === ge)
        return d;
      if (a(p), p === Vt)
        return this;
      const { endo: w } = t;
      if (!w)
        return y.unsafeLadder(this, p);
      let { k1neg: x, k1: b, k2neg: C, k2: T } = w.splitScalar(p), N = d, P = d, v = this;
      for (; b > ge || T > ge; )
        b & Vt && (N = N.add(v)), T & Vt && (P = P.add(v)), v = v.double(), b >>= Vt, T >>= Vt;
      return x && (N = N.negate()), C && (P = P.negate()), P = new f(e.mul(P.px, w.beta), P.py, P.pz), N.add(P);
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
    multiply(p) {
      a(p);
      let d = p, w, x;
      const { endo: b } = t;
      if (b) {
        const { k1neg: C, k1: T, k2neg: N, k2: P } = b.splitScalar(d);
        let { p: v, f: B } = this.wNAF(T), { p: M, f: L } = this.wNAF(P);
        v = y.constTimeNegate(C, v), M = y.constTimeNegate(N, M), M = new f(e.mul(M.px, b.beta), M.py, M.pz), w = v.add(M), x = B.add(L);
      } else {
        const { p: C, f: T } = this.wNAF(d);
        w = C, x = T;
      }
      return f.normalizeZ([w, x])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(p, d, w) {
      const x = f.BASE, b = (T, N) => N === ge || N === Vt || !T.equals(x) ? T.multiplyUnsafe(N) : T.multiply(N), C = b(this, d).add(b(p, w));
      return C.is0() ? void 0 : C;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(p) {
      const { px: d, py: w, pz: x } = this, b = this.is0();
      p == null && (p = b ? e.ONE : e.inv(x));
      const C = e.mul(d, p), T = e.mul(w, p), N = e.mul(x, p);
      if (b)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(N, e.ONE))
        throw new Error("invZ was invalid");
      return { x: C, y: T };
    }
    isTorsionFree() {
      const { h: p, isTorsionFree: d } = t;
      if (p === Vt)
        return !0;
      if (d)
        return d(f, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: p, clearCofactor: d } = t;
      return p === Vt ? this : d ? d(f, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(p = !0) {
      return this.assertValidity(), r(f, this, p);
    }
    toHex(p = !0) {
      return Cn(this.toRawBytes(p));
    }
  }
  f.BASE = new f(t.Gx, t.Gy, e.ONE), f.ZERO = new f(e.ZERO, e.ONE, e.ZERO);
  const h = t.nBitLength, y = Xf(f, t.endo ? Math.ceil(h / 2) : h);
  return {
    CURVE: t,
    ProjectivePoint: f,
    normPrivateKeyToScalar: c,
    weierstrassEquation: i,
    isWithinCurveOrder: o
  };
}
function rh(n) {
  const t = Cc(n);
  return cr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function sh(n) {
  const t = rh(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(A) {
    return ge < A && A < e.ORDER;
  }
  function a(A) {
    return St(A, r);
  }
  function c(A) {
    return Xs(A, r);
  }
  const { ProjectivePoint: l, normPrivateKeyToScalar: u, weierstrassEquation: f, isWithinCurveOrder: h } = nh({
    ...t,
    toBytes(A, E, S) {
      const _ = E.toAffine(), H = e.toBytes(_.x), K = Xn;
      return S ? K(Uint8Array.from([E.hasEvenY() ? 2 : 3]), H) : K(Uint8Array.from([4]), H, e.toBytes(_.y));
    },
    fromBytes(A) {
      const E = A.length, S = A[0], _ = A.subarray(1);
      if (E === s && (S === 2 || S === 3)) {
        const H = Ze(_);
        if (!o(H))
          throw new Error("Point is not on curve");
        const K = f(H);
        let W = e.sqrt(K);
        const et = (W & Vt) === Vt;
        return (S & 1) === 1 !== et && (W = e.neg(W)), { x: H, y: W };
      } else if (E === i && S === 4) {
        const H = e.fromBytes(_.subarray(0, e.BYTES)), K = e.fromBytes(_.subarray(e.BYTES, 2 * e.BYTES));
        return { x: H, y: K };
      } else
        throw new Error(`Point of length ${E} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), y = (A) => Cn(Sn(A, t.nByteLength));
  function m(A) {
    const E = r >> Vt;
    return A > E;
  }
  function p(A) {
    return m(A) ? a(-A) : A;
  }
  const d = (A, E, S) => Ze(A.slice(E, S));
  class w {
    constructor(E, S, _) {
      this.r = E, this.s = S, this.recovery = _, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(E) {
      const S = t.nByteLength;
      return E = jt("compactSignature", E, S * 2), new w(d(E, 0, S), d(E, S, 2 * S));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(E) {
      const { r: S, s: _ } = Qe.toSig(jt("DER", E));
      return new w(S, _);
    }
    assertValidity() {
      if (!h(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!h(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(E) {
      return new w(this.r, this.s, E);
    }
    recoverPublicKey(E) {
      const { r: S, s: _, recovery: H } = this, K = P(jt("msgHash", E));
      if (H == null || ![0, 1, 2, 3].includes(H))
        throw new Error("recovery id invalid");
      const W = H === 2 || H === 3 ? S + t.n : S;
      if (W >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const et = H & 1 ? "03" : "02", dt = l.fromHex(et + y(W)), nt = c(W), Ut = a(-K * nt), Ct = a(_ * nt), Mt = l.BASE.multiplyAndAddUnsafe(dt, Ut, Ct);
      if (!Mt)
        throw new Error("point at infinify");
      return Mt.assertValidity(), Mt;
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
      return On(this.toDERHex());
    }
    toDERHex() {
      return Qe.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return On(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const x = {
    isValidPrivateKey(A) {
      try {
        return u(A), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: u,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const A = Tc(t.n);
      return jf(t.randomBytes(A), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(A = 8, E = l.BASE) {
      return E._setWindowSize(A), E.multiply(BigInt(3)), E;
    }
  };
  function b(A, E = !0) {
    return l.fromPrivateKey(A).toRawBytes(E);
  }
  function C(A) {
    const E = A instanceof Uint8Array, S = typeof A == "string", _ = (E || S) && A.length;
    return E ? _ === s || _ === i : S ? _ === 2 * s || _ === 2 * i : A instanceof l;
  }
  function T(A, E, S = !0) {
    if (C(A))
      throw new Error("first arg must be private key");
    if (!C(E))
      throw new Error("second arg must be public key");
    return l.fromHex(E).multiply(u(A)).toRawBytes(S);
  }
  const N = t.bits2int || function(A) {
    const E = Ze(A), S = A.length * 8 - t.nBitLength;
    return S > 0 ? E >> BigInt(S) : E;
  }, P = t.bits2int_modN || function(A) {
    return a(N(A));
  }, v = ki(t.nBitLength);
  function B(A) {
    if (typeof A != "bigint")
      throw new Error("bigint expected");
    if (!(ge <= A && A < v))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return Sn(A, t.nByteLength);
  }
  function M(A, E, S = L) {
    if (["recovered", "canonical"].some((Ot) => Ot in S))
      throw new Error("sign() legacy options not supported");
    const { hash: _, randomBytes: H } = t;
    let { lowS: K, prehash: W, extraEntropy: et } = S;
    K == null && (K = !0), A = jt("msgHash", A), W && (A = jt("prehashed msgHash", _(A)));
    const dt = P(A), nt = u(E), Ut = [B(nt), B(dt)];
    if (et != null) {
      const Ot = et === !0 ? H(e.BYTES) : et;
      Ut.push(jt("extraEntropy", Ot));
    }
    const Ct = Xn(...Ut), Mt = dt;
    function Jt(Ot) {
      const ne = N(Ot);
      if (!h(ne))
        return;
      const Ie = c(ne), yt = l.BASE.multiply(ne).toAffine(), Ht = a(yt.x);
      if (Ht === ge)
        return;
      const Zt = a(Ie * a(Mt + Ht * nt));
      if (Zt === ge)
        return;
      let Gn = (yt.x === Ht ? 0 : 2) | Number(yt.y & Vt), ro = Zt;
      return K && m(Zt) && (ro = p(Zt), Gn ^= 1), new w(Ht, ro, Gn);
    }
    return { seed: Ct, k2sig: Jt };
  }
  const L = { lowS: t.lowS, prehash: !1 }, G = { lowS: t.lowS, prehash: !1 };
  function Z(A, E, S = L) {
    const { seed: _, k2sig: H } = M(A, E, S), K = t;
    return Nc(K.hash.outputLen, K.nByteLength, K.hmac)(_, H);
  }
  l.BASE._setWindowSize(8);
  function O(A, E, S, _ = G) {
    const H = A;
    if (E = jt("msgHash", E), S = jt("publicKey", S), "strict" in _)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: K, prehash: W } = _;
    let et, dt;
    try {
      if (typeof H == "string" || H instanceof Uint8Array)
        try {
          et = w.fromDER(H);
        } catch (yt) {
          if (!(yt instanceof Qe.Err))
            throw yt;
          et = w.fromCompact(H);
        }
      else if (typeof H == "object" && typeof H.r == "bigint" && typeof H.s == "bigint") {
        const { r: yt, s: Ht } = H;
        et = new w(yt, Ht);
      } else
        throw new Error("PARSE");
      dt = l.fromHex(S);
    } catch (yt) {
      if (yt.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (K && et.hasHighS())
      return !1;
    W && (E = t.hash(E));
    const { r: nt, s: Ut } = et, Ct = P(E), Mt = c(Ut), Jt = a(Ct * Mt), Ot = a(nt * Mt), ne = l.BASE.multiplyAndAddUnsafe(dt, Jt, Ot)?.toAffine();
    return ne ? a(ne.x) === nt : !1;
  }
  return {
    CURVE: t,
    getPublicKey: b,
    getSharedSecret: T,
    sign: Z,
    verify: O,
    ProjectivePoint: l,
    Signature: w,
    utils: x
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function ih(n) {
  return {
    hash: n,
    hmac: (t, ...e) => rc(n, t, Qu(...e)),
    randomBytes: $u
  };
}
function oh(n, t) {
  const e = (r) => sh({ ...n, ...ih(r) });
  return Object.freeze({ ...e(t), create: e });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Oc = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), vo = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), ah = BigInt(1), Ys = BigInt(2), To = (n, t) => (n + t / Ys) / t;
function ch(n) {
  const t = Oc, e = BigInt(3), r = BigInt(6), s = BigInt(11), i = BigInt(22), o = BigInt(23), a = BigInt(44), c = BigInt(88), l = n * n * n % t, u = l * l * n % t, f = Gt(u, e, t) * u % t, h = Gt(f, e, t) * u % t, y = Gt(h, Ys, t) * l % t, m = Gt(y, s, t) * y % t, p = Gt(m, i, t) * m % t, d = Gt(p, a, t) * p % t, w = Gt(d, c, t) * d % t, x = Gt(w, a, t) * p % t, b = Gt(x, e, t) * u % t, C = Gt(b, o, t) * m % t, T = Gt(C, r, t) * l % t, N = Gt(T, Ys, t);
  if (!ti.eql(ti.sqr(N), n))
    throw new Error("Cannot find square root");
  return N;
}
const ti = Wf(Oc, void 0, void 0, { sqrt: ch }), Se = oh({
  a: BigInt(0),
  b: BigInt(7),
  Fp: ti,
  n: vo,
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
      const t = vo, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -ah * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, o = BigInt("0x100000000000000000000000000000000"), a = To(i * n, t), c = To(-r * n, t);
      let l = St(n - a * e - c * s, t), u = St(-a * r - c * i, t);
      const f = l > o, h = u > o;
      if (f && (l = t - l), h && (u = t - u), l > o || u > o)
        throw new Error("splitScalar: Endomorphism failed, k=" + n);
      return { k1neg: f, k1: l, k2neg: h, k2: u };
    }
  }
}, ic);
BigInt(0);
Se.ProjectivePoint;
const Bn = "0x0000000000000000000000000000000000000000", We = "0x0000000000000000000000000000000000000000000000000000000000000000", lh = `Ethereum Signed Message:
`, Co = BigInt(0), Oo = BigInt(1), So = BigInt(2), Bo = BigInt(27), Ro = BigInt(28), br = BigInt(35), dn = {};
function ko(n) {
  return ce(gt(n), 32);
}
class pt {
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
    g(Je(t) === 32, "invalid r", "value", t), this.#t = U(t);
  }
  /**
   *  The ``s`` value for a signature.
   */
  get s() {
    return this.#e;
  }
  set s(t) {
    g(Je(t) === 32, "invalid s", "value", t);
    const e = U(t);
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
    const e = Q(t, "value");
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
    return t == null ? null : pt.getChainId(t);
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
    const t = V(this.s);
    return this.yParity && (t[0] |= 128), U(t);
  }
  /**
   *  The [[link-eip-2098]] compact representation.
   */
  get compactSerialized() {
    return tt([this.r, this.yParityAndS]);
  }
  /**
   *  The serialized representation.
   */
  get serialized() {
    return tt([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
  }
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    ar(t, dn, "Signature"), this.#t = e, this.#e = r, this.#n = s, this.#r = null;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Signature { r: "${this.r}", s: "${this.s}", yParity: ${this.yParity}, networkV: ${this.networkV} }`;
  }
  /**
   *  Returns a new identical [[Signature]].
   */
  clone() {
    const t = new pt(dn, this.r, this.s, this.v);
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
    const e = D(t, "v");
    return e == Bo || e == Ro ? Co : (g(e >= br, "invalid EIP-155 v", "v", t), (e - br) / So);
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
    return D(t) * So + BigInt(35 + e - 27);
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
    const e = D(t);
    return e === Co || e === Bo ? 27 : e === Oo || e === Ro ? 28 : (g(e >= br, "invalid v", "v", t), e & Oo ? 27 : 28);
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
    function e(l, u) {
      g(l, u, "signature", t);
    }
    if (t == null)
      return new pt(dn, We, We, 27);
    if (typeof t == "string") {
      const l = V(t, "signature");
      if (l.length === 64) {
        const u = U(l.slice(0, 32)), f = l.slice(32, 64), h = f[0] & 128 ? 28 : 27;
        return f[0] &= 127, new pt(dn, u, U(f), h);
      }
      if (l.length === 65) {
        const u = U(l.slice(0, 32)), f = l.slice(32, 64);
        e((f[0] & 128) === 0, "non-canonical s");
        const h = pt.getNormalizedV(l[64]);
        return new pt(dn, u, U(f), h);
      }
      e(!1, "invalid raw signature length");
    }
    if (t instanceof pt)
      return t.clone();
    const r = t.r;
    e(r != null, "missing r");
    const s = ko(r), i = function(l, u) {
      if (l != null)
        return ko(l);
      if (u != null) {
        e(X(u, 32), "invalid yParityAndS");
        const f = V(u);
        return f[0] &= 127, U(f);
      }
      e(!1, "missing s");
    }(t.s, t.yParityAndS);
    e((V(i)[0] & 128) == 0, "non-canonical s");
    const { networkV: o, v: a } = function(l, u, f) {
      if (l != null) {
        const h = D(l);
        return {
          networkV: h >= br ? h : void 0,
          v: pt.getNormalizedV(h)
        };
      }
      if (u != null)
        return e(X(u, 32), "invalid yParityAndS"), { v: V(u)[0] & 128 ? 28 : 27 };
      if (f != null) {
        switch (Q(f, "sig.yParity")) {
          case 0:
            return { v: 27 };
          case 1:
            return { v: 28 };
        }
        e(!1, "invalid yParity");
      }
      e(!1, "missing v");
    }(t.v, t.yParityAndS, t.yParity), c = new pt(dn, s, i, a);
    return o && (c.#r = o), e(t.yParity == null || Q(t.yParity, "sig.yParity") === c.yParity, "yParity mismatch"), e(t.yParityAndS == null || t.yParityAndS === c.yParityAndS, "yParityAndS mismatch"), c;
  }
}
class ye {
  #t;
  /**
   *  Creates a new **SigningKey** for %%privateKey%%.
   */
  constructor(t) {
    g(Je(t) === 32, "invalid private key", "privateKey", "[REDACTED]"), this.#t = U(t);
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
    return ye.computePublicKey(this.#t);
  }
  /**
   *  The compressed public key.
   *
   *  This will always begin with either the prefix ``0x02`` or ``0x03``
   *  and be 68 characters long (the ``0x`` prefix and 33 hexadecimal
   *  nibbles)
   */
  get compressedPublicKey() {
    return ye.computePublicKey(this.#t, !0);
  }
  /**
   *  Return the signature of the signed %%digest%%.
   */
  sign(t) {
    g(Je(t) === 32, "invalid digest length", "digest", t);
    const e = Se.sign(Nt(t), Nt(this.#t), {
      lowS: !0
    });
    return pt.from({
      r: ke(e.r, 32),
      s: ke(e.s, 32),
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
    const e = ye.computePublicKey(t);
    return U(Se.getSharedSecret(Nt(this.#t), V(e), !1));
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
    let r = V(t, "key");
    if (r.length === 32) {
      const i = Se.getPublicKey(r, !!e);
      return U(i);
    }
    if (r.length === 64) {
      const i = new Uint8Array(65);
      i[0] = 4, i.set(r, 1), r = i;
    }
    const s = Se.ProjectivePoint.fromHex(r);
    return U(s.toRawBytes(e));
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
    g(Je(t) === 32, "invalid digest length", "digest", t);
    const r = pt.from(e);
    let s = Se.Signature.fromCompact(Nt(tt([r.r, r.s])));
    s = s.addRecoveryBit(r.yParity);
    const i = s.recoverPublicKey(Nt(t));
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
    const s = Se.ProjectivePoint.fromHex(ye.computePublicKey(t).substring(2)), i = Se.ProjectivePoint.fromHex(ye.computePublicKey(e).substring(2));
    return "0x" + s.add(i).toHex(!!r);
  }
}
const uh = BigInt(0), fh = BigInt(36);
function Uo(n) {
  n = n.toLowerCase();
  const t = n.substring(2).split(""), e = new Uint8Array(40);
  for (let s = 0; s < 40; s++)
    e[s] = t[s].charCodeAt(0);
  const r = V(it(e));
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const Ui = {};
for (let n = 0; n < 10; n++)
  Ui[String(n)] = String(n);
for (let n = 0; n < 26; n++)
  Ui[String.fromCharCode(65 + n)] = String(10 + n);
const Do = 15;
function hh(n) {
  n = n.toUpperCase(), n = n.substring(4) + n.substring(0, 2) + "00";
  let t = n.split("").map((r) => Ui[r]).join("");
  for (; t.length >= Do; ) {
    let r = t.substring(0, Do);
    t = parseInt(r, 10) % 97 + t.substring(r.length);
  }
  let e = String(98 - parseInt(t, 10) % 97);
  for (; e.length < 2; )
    e = "0" + e;
  return e;
}
const dh = function() {
  const n = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    n[e] = BigInt(t);
  }
  return n;
}();
function ph(n) {
  n = n.toLowerCase();
  let t = uh;
  for (let e = 0; e < n.length; e++)
    t = t * fh + dh[n[e]];
  return t;
}
function j(n) {
  if (g(typeof n == "string", "invalid address", "address", n), n.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    n.startsWith("0x") || (n = "0x" + n);
    const t = Uo(n);
    return g(!n.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === n, "bad address checksum", "address", n), t;
  }
  if (n.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    g(n.substring(2, 4) === hh(n), "bad icap checksum", "address", n);
    let t = ph(n.substring(4)).toString(16);
    for (; t.length < 40; )
      t = "0" + t;
    return Uo("0x" + t);
  }
  g(!1, "invalid address", "address", n);
}
function gh(n) {
  const t = j(n.from);
  let r = D(n.nonce, "tx.nonce").toString(16);
  return r === "0" ? r = "0x" : r.length % 2 ? r = "0x0" + r : r = "0x" + r, j(at(it(nn([t, r])), 12));
}
function Sc(n) {
  return n && typeof n.getAddress == "function";
}
async function Es(n, t) {
  const e = await t;
  return (e == null || e === "0x0000000000000000000000000000000000000000") && (I(typeof n != "string", "unconfigured name", "UNCONFIGURED_NAME", { value: n }), g(!1, "invalid AddressLike value; did not resolve to a value address", "target", n)), j(e);
}
function vt(n, t) {
  if (typeof n == "string")
    return n.match(/^0x[0-9a-f]{40}$/i) ? j(n) : (I(t != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", { operation: "resolveName" }), Es(n, t.resolveName(n)));
  if (Sc(n))
    return Es(n, n.getAddress());
  if (n && typeof n.then == "function")
    return Es(n, n);
  g(!1, "unsupported addressable value", "target", n);
}
const he = {};
function k(n, t) {
  let e = !1;
  return t < 0 && (e = !0, t *= -1), new ct(he, `${e ? "" : "u"}int${t}`, n, { signed: e, width: t });
}
function J(n, t) {
  return new ct(he, `bytes${t || ""}`, n, { size: t });
}
const Lo = Symbol.for("_ethers_typed");
class ct {
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
    s == null && (s = null), ar(he, t, "Typed"), F(this, { _typedSymbol: Lo, type: e, value: r }), this.#t = s, this.format();
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
    return new ct(he, t, e);
  }
  /**
   *  Return a new ``uint8`` type for %%v%%.
   */
  static uint8(t) {
    return k(t, 8);
  }
  /**
   *  Return a new ``uint16`` type for %%v%%.
   */
  static uint16(t) {
    return k(t, 16);
  }
  /**
   *  Return a new ``uint24`` type for %%v%%.
   */
  static uint24(t) {
    return k(t, 24);
  }
  /**
   *  Return a new ``uint32`` type for %%v%%.
   */
  static uint32(t) {
    return k(t, 32);
  }
  /**
   *  Return a new ``uint40`` type for %%v%%.
   */
  static uint40(t) {
    return k(t, 40);
  }
  /**
   *  Return a new ``uint48`` type for %%v%%.
   */
  static uint48(t) {
    return k(t, 48);
  }
  /**
   *  Return a new ``uint56`` type for %%v%%.
   */
  static uint56(t) {
    return k(t, 56);
  }
  /**
   *  Return a new ``uint64`` type for %%v%%.
   */
  static uint64(t) {
    return k(t, 64);
  }
  /**
   *  Return a new ``uint72`` type for %%v%%.
   */
  static uint72(t) {
    return k(t, 72);
  }
  /**
   *  Return a new ``uint80`` type for %%v%%.
   */
  static uint80(t) {
    return k(t, 80);
  }
  /**
   *  Return a new ``uint88`` type for %%v%%.
   */
  static uint88(t) {
    return k(t, 88);
  }
  /**
   *  Return a new ``uint96`` type for %%v%%.
   */
  static uint96(t) {
    return k(t, 96);
  }
  /**
   *  Return a new ``uint104`` type for %%v%%.
   */
  static uint104(t) {
    return k(t, 104);
  }
  /**
   *  Return a new ``uint112`` type for %%v%%.
   */
  static uint112(t) {
    return k(t, 112);
  }
  /**
   *  Return a new ``uint120`` type for %%v%%.
   */
  static uint120(t) {
    return k(t, 120);
  }
  /**
   *  Return a new ``uint128`` type for %%v%%.
   */
  static uint128(t) {
    return k(t, 128);
  }
  /**
   *  Return a new ``uint136`` type for %%v%%.
   */
  static uint136(t) {
    return k(t, 136);
  }
  /**
   *  Return a new ``uint144`` type for %%v%%.
   */
  static uint144(t) {
    return k(t, 144);
  }
  /**
   *  Return a new ``uint152`` type for %%v%%.
   */
  static uint152(t) {
    return k(t, 152);
  }
  /**
   *  Return a new ``uint160`` type for %%v%%.
   */
  static uint160(t) {
    return k(t, 160);
  }
  /**
   *  Return a new ``uint168`` type for %%v%%.
   */
  static uint168(t) {
    return k(t, 168);
  }
  /**
   *  Return a new ``uint176`` type for %%v%%.
   */
  static uint176(t) {
    return k(t, 176);
  }
  /**
   *  Return a new ``uint184`` type for %%v%%.
   */
  static uint184(t) {
    return k(t, 184);
  }
  /**
   *  Return a new ``uint192`` type for %%v%%.
   */
  static uint192(t) {
    return k(t, 192);
  }
  /**
   *  Return a new ``uint200`` type for %%v%%.
   */
  static uint200(t) {
    return k(t, 200);
  }
  /**
   *  Return a new ``uint208`` type for %%v%%.
   */
  static uint208(t) {
    return k(t, 208);
  }
  /**
   *  Return a new ``uint216`` type for %%v%%.
   */
  static uint216(t) {
    return k(t, 216);
  }
  /**
   *  Return a new ``uint224`` type for %%v%%.
   */
  static uint224(t) {
    return k(t, 224);
  }
  /**
   *  Return a new ``uint232`` type for %%v%%.
   */
  static uint232(t) {
    return k(t, 232);
  }
  /**
   *  Return a new ``uint240`` type for %%v%%.
   */
  static uint240(t) {
    return k(t, 240);
  }
  /**
   *  Return a new ``uint248`` type for %%v%%.
   */
  static uint248(t) {
    return k(t, 248);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint256(t) {
    return k(t, 256);
  }
  /**
   *  Return a new ``uint256`` type for %%v%%.
   */
  static uint(t) {
    return k(t, 256);
  }
  /**
   *  Return a new ``int8`` type for %%v%%.
   */
  static int8(t) {
    return k(t, -8);
  }
  /**
   *  Return a new ``int16`` type for %%v%%.
   */
  static int16(t) {
    return k(t, -16);
  }
  /**
   *  Return a new ``int24`` type for %%v%%.
   */
  static int24(t) {
    return k(t, -24);
  }
  /**
   *  Return a new ``int32`` type for %%v%%.
   */
  static int32(t) {
    return k(t, -32);
  }
  /**
   *  Return a new ``int40`` type for %%v%%.
   */
  static int40(t) {
    return k(t, -40);
  }
  /**
   *  Return a new ``int48`` type for %%v%%.
   */
  static int48(t) {
    return k(t, -48);
  }
  /**
   *  Return a new ``int56`` type for %%v%%.
   */
  static int56(t) {
    return k(t, -56);
  }
  /**
   *  Return a new ``int64`` type for %%v%%.
   */
  static int64(t) {
    return k(t, -64);
  }
  /**
   *  Return a new ``int72`` type for %%v%%.
   */
  static int72(t) {
    return k(t, -72);
  }
  /**
   *  Return a new ``int80`` type for %%v%%.
   */
  static int80(t) {
    return k(t, -80);
  }
  /**
   *  Return a new ``int88`` type for %%v%%.
   */
  static int88(t) {
    return k(t, -88);
  }
  /**
   *  Return a new ``int96`` type for %%v%%.
   */
  static int96(t) {
    return k(t, -96);
  }
  /**
   *  Return a new ``int104`` type for %%v%%.
   */
  static int104(t) {
    return k(t, -104);
  }
  /**
   *  Return a new ``int112`` type for %%v%%.
   */
  static int112(t) {
    return k(t, -112);
  }
  /**
   *  Return a new ``int120`` type for %%v%%.
   */
  static int120(t) {
    return k(t, -120);
  }
  /**
   *  Return a new ``int128`` type for %%v%%.
   */
  static int128(t) {
    return k(t, -128);
  }
  /**
   *  Return a new ``int136`` type for %%v%%.
   */
  static int136(t) {
    return k(t, -136);
  }
  /**
   *  Return a new ``int144`` type for %%v%%.
   */
  static int144(t) {
    return k(t, -144);
  }
  /**
   *  Return a new ``int52`` type for %%v%%.
   */
  static int152(t) {
    return k(t, -152);
  }
  /**
   *  Return a new ``int160`` type for %%v%%.
   */
  static int160(t) {
    return k(t, -160);
  }
  /**
   *  Return a new ``int168`` type for %%v%%.
   */
  static int168(t) {
    return k(t, -168);
  }
  /**
   *  Return a new ``int176`` type for %%v%%.
   */
  static int176(t) {
    return k(t, -176);
  }
  /**
   *  Return a new ``int184`` type for %%v%%.
   */
  static int184(t) {
    return k(t, -184);
  }
  /**
   *  Return a new ``int92`` type for %%v%%.
   */
  static int192(t) {
    return k(t, -192);
  }
  /**
   *  Return a new ``int200`` type for %%v%%.
   */
  static int200(t) {
    return k(t, -200);
  }
  /**
   *  Return a new ``int208`` type for %%v%%.
   */
  static int208(t) {
    return k(t, -208);
  }
  /**
   *  Return a new ``int216`` type for %%v%%.
   */
  static int216(t) {
    return k(t, -216);
  }
  /**
   *  Return a new ``int224`` type for %%v%%.
   */
  static int224(t) {
    return k(t, -224);
  }
  /**
   *  Return a new ``int232`` type for %%v%%.
   */
  static int232(t) {
    return k(t, -232);
  }
  /**
   *  Return a new ``int240`` type for %%v%%.
   */
  static int240(t) {
    return k(t, -240);
  }
  /**
   *  Return a new ``int248`` type for %%v%%.
   */
  static int248(t) {
    return k(t, -248);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int256(t) {
    return k(t, -256);
  }
  /**
   *  Return a new ``int256`` type for %%v%%.
   */
  static int(t) {
    return k(t, -256);
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
    return new ct(he, "address", t);
  }
  /**
   *  Return a new ``bool`` type for %%v%%.
   */
  static bool(t) {
    return new ct(he, "bool", !!t);
  }
  /**
   *  Return a new ``bytes`` type for %%v%%.
   */
  static bytes(t) {
    return new ct(he, "bytes", t);
  }
  /**
   *  Return a new ``string`` type for %%v%%.
   */
  static string(t) {
    return new ct(he, "string", t);
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
    return new ct(he, "overrides", Object.assign({}, t));
  }
  /**
   *  Returns true only if %%value%% is a [[Typed]] instance.
   */
  static isTyped(t) {
    return t && typeof t == "object" && "_typedSymbol" in t && t._typedSymbol === Lo;
  }
  /**
   *  If the value is a [[Typed]] instance, validates the underlying value
   *  and returns it, otherwise returns value directly.
   *
   *  This is useful for functions that with to accept either a [[Typed]]
   *  object or values.
   */
  static dereference(t, e) {
    if (ct.isTyped(t)) {
      if (t.type !== e)
        throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
      return t.value;
    }
    return t;
  }
}
class yh extends xe {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    let r = ct.dereference(e, "string");
    try {
      r = j(r);
    } catch (s) {
      return this._throwError(s.message, e);
    }
    return t.writeValue(r);
  }
  decode(t) {
    return j(ke(t.readValue(), 20));
  }
}
class wh extends xe {
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
function Bc(n, t, e) {
  let r = [];
  if (Array.isArray(e))
    r = e;
  else if (e && typeof e == "object") {
    let c = {};
    r = t.map((l) => {
      const u = l.localName;
      return I(u, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", { argument: "values", info: { coder: l }, value: e }), I(!c[u], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", { argument: "values", info: { coder: l }, value: e }), c[u] = !0, e[u];
    });
  } else
    g(!1, "invalid tuple value", "tuple", e);
  g(t.length === r.length, "types/value length mismatch", "tuple", e);
  let s = new Ws(), i = new Ws(), o = [];
  t.forEach((c, l) => {
    let u = r[l];
    if (c.dynamic) {
      let f = i.length;
      c.encode(i, u);
      let h = s.writeUpdatableValue();
      o.push((y) => {
        h(y + f);
      });
    } else
      c.encode(s, u);
  }), o.forEach((c) => {
    c(s.length);
  });
  let a = n.appendWriter(s);
  return a += n.appendWriter(i), a;
}
function Rc(n, t) {
  let e = [], r = [], s = n.subReader(0);
  return t.forEach((i) => {
    let o = null;
    if (i.dynamic) {
      let a = n.readIndex(), c = s.subReader(a);
      try {
        o = i.decode(c);
      } catch (l) {
        if (Et(l, "BUFFER_OVERRUN"))
          throw l;
        o = l, o.baseType = i.name, o.name = i.localName, o.type = i.type;
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
  }), me.fromItems(e, r);
}
class mh extends xe {
  coder;
  length;
  constructor(t, e, r) {
    const s = t.type + "[" + (e >= 0 ? e : "") + "]", i = e === -1 || t.dynamic;
    super("array", s, r, i), F(this, { coder: t, length: e });
  }
  defaultValue() {
    const t = this.coder.defaultValue(), e = [];
    for (let r = 0; r < this.length; r++)
      e.push(t);
    return e;
  }
  encode(t, e) {
    const r = ct.dereference(e, "array");
    Array.isArray(r) || this._throwError("expected array value", r);
    let s = this.length;
    s === -1 && (s = r.length, t.writeValue(r.length)), Va(r.length, s, "coder array" + (this.localName ? " " + this.localName : ""));
    let i = [];
    for (let o = 0; o < r.length; o++)
      i.push(this.coder);
    return Bc(t, i, r);
  }
  decode(t) {
    let e = this.length;
    e === -1 && (e = t.readIndex(), I(e * Pt <= t.dataLength, "insufficient data length", "BUFFER_OVERRUN", { buffer: t.bytes, offset: e * Pt, length: t.dataLength }));
    let r = [];
    for (let s = 0; s < e; s++)
      r.push(new wh(this.coder));
    return Rc(t, r);
  }
}
class Ah extends xe {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    const r = ct.dereference(e, "bool");
    return t.writeValue(r ? 1 : 0);
  }
  decode(t) {
    return !!t.readValue();
  }
}
class kc extends xe {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = Nt(e);
    let r = t.writeValue(e.length);
    return r += t.writeBytes(e), r;
  }
  decode(t) {
    return t.readBytes(t.readIndex(), !0);
  }
}
class bh extends kc {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return U(super.decode(t));
  }
}
class Eh extends xe {
  size;
  constructor(t, e) {
    let r = "bytes" + String(t);
    super(r, r, e, !1), F(this, { size: t }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(0, 2 + this.size * 2);
  }
  encode(t, e) {
    let r = Nt(ct.dereference(e, this.type));
    return r.length !== this.size && this._throwError("incorrect data length", e), t.writeBytes(r);
  }
  decode(t) {
    return U(t.readBytes(this.size));
  }
}
const xh = new Uint8Array([]);
class Ih extends xe {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes(xh);
  }
  decode(t) {
    return t.readBytes(0), null;
  }
}
const Nh = BigInt(0), Ph = BigInt(1), vh = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
class Th extends xe {
  size;
  signed;
  constructor(t, e, r) {
    const s = (e ? "int" : "uint") + t * 8;
    super(s, s, r, !1), F(this, { size: t, signed: e }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(t, e) {
    let r = D(ct.dereference(e, this.type)), s = ze(vh, Pt * 8);
    if (this.signed) {
      let i = ze(s, this.size * 8 - 1);
      (r > i || r < -(i + Ph)) && this._throwError("value out-of-bounds", e), r = Pi(r, 8 * Pt);
    } else (r < Nh || r > ze(s, this.size * 8)) && this._throwError("value out-of-bounds", e);
    return t.writeValue(r);
  }
  decode(t) {
    let e = ze(t.readValue(), this.size * 8);
    return this.signed && (e = Lr(e, this.size * 8)), e;
  }
}
class Ch extends kc {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, Rt(ct.dereference(e, "string")));
  }
  decode(t) {
    return _r(super.decode(t));
  }
}
class Er extends xe {
  coders;
  constructor(t, e) {
    let r = !1;
    const s = [];
    t.forEach((o) => {
      o.dynamic && (r = !0), s.push(o.type);
    });
    const i = "tuple(" + s.join(",") + ")";
    super("tuple", i, e, r), F(this, { coders: Object.freeze(t.slice()) });
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
    const r = ct.dereference(e, "tuple");
    return Bc(t, this.coders, r);
  }
  decode(t) {
    return Rc(t, this.coders);
  }
}
function rn(n) {
  return it(Rt(n));
}
var Oh = "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";
const _o = /* @__PURE__ */ new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), Fo = 4;
function Sh(n) {
  let t = 0;
  function e() {
    return n[t++] << 8 | n[t++];
  }
  let r = e(), s = 1, i = [0, 1];
  for (let T = 1; T < r; T++)
    i.push(s += e());
  let o = e(), a = t;
  t += o;
  let c = 0, l = 0;
  function u() {
    return c == 0 && (l = l << 8 | n[t++], c = 8), l >> --c & 1;
  }
  const f = 31, h = 2 ** f, y = h >>> 1, m = y >> 1, p = h - 1;
  let d = 0;
  for (let T = 0; T < f; T++) d = d << 1 | u();
  let w = [], x = 0, b = h;
  for (; ; ) {
    let T = Math.floor(((d - x + 1) * s - 1) / b), N = 0, P = r;
    for (; P - N > 1; ) {
      let M = N + P >>> 1;
      T < i[M] ? P = M : N = M;
    }
    if (N == 0) break;
    w.push(N);
    let v = x + Math.floor(b * i[N] / s), B = x + Math.floor(b * i[N + 1] / s) - 1;
    for (; !((v ^ B) & y); )
      d = d << 1 & p | u(), v = v << 1 & p, B = B << 1 & p | 1;
    for (; v & ~B & m; )
      d = d & y | d << 1 & p >>> 1 | u(), v = v << 1 ^ y, B = (B ^ y) << 1 | y | 1;
    x = v, b = 1 + B - v;
  }
  let C = r - 4;
  return w.map((T) => {
    switch (T - C) {
      case 3:
        return C + 65792 + (n[a++] << 16 | n[a++] << 8 | n[a++]);
      case 2:
        return C + 256 + (n[a++] << 8 | n[a++]);
      case 1:
        return C + n[a++];
      default:
        return T - 1;
    }
  });
}
function Bh(n) {
  let t = 0;
  return () => n[t++];
}
function Uc(n) {
  return Bh(Sh(Rh(n)));
}
function Rh(n) {
  let t = [];
  [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((s, i) => t[s.charCodeAt(0)] = i);
  let e = n.length, r = new Uint8Array(6 * e >> 3);
  for (let s = 0, i = 0, o = 0, a = 0; s < e; s++)
    a = a << 6 | t[n.charCodeAt(s)], o += 6, o >= 8 && (r[i++] = a >> (o -= 8));
  return r;
}
function kh(n) {
  return n & 1 ? ~n >> 1 : n >> 1;
}
function Uh(n, t) {
  let e = Array(n);
  for (let r = 0, s = 0; r < n; r++) e[r] = s += kh(t());
  return e;
}
function Yn(n, t = 0) {
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
function Dc(n) {
  return tr(() => {
    let t = Yn(n);
    if (t.length) return t;
  });
}
function Lc(n) {
  let t = [];
  for (; ; ) {
    let e = n();
    if (e == 0) break;
    t.push(Dh(e, n));
  }
  for (; ; ) {
    let e = n() - 1;
    if (e < 0) break;
    t.push(Lh(e, n));
  }
  return t.flat();
}
function tr(n) {
  let t = [];
  for (; ; ) {
    let e = n(t.length);
    if (!e) break;
    t.push(e);
  }
  return t;
}
function _c(n, t, e) {
  let r = Array(n).fill().map(() => []);
  for (let s = 0; s < t; s++)
    Uh(n, e).forEach((i, o) => r[o].push(i));
  return r;
}
function Dh(n, t) {
  let e = 1 + t(), r = t(), s = tr(t);
  return _c(s.length, 1 + n, t).flatMap((o, a) => {
    let [c, ...l] = o;
    return Array(s[a]).fill().map((u, f) => {
      let h = f * r;
      return [c + f * e, l.map((y) => y + h)];
    });
  });
}
function Lh(n, t) {
  let e = 1 + t();
  return _c(e, 1 + n, t).map((s) => [s[0], s.slice(1)]);
}
function _h(n) {
  let t = [], e = Yn(n);
  return s(r([]), []), t;
  function r(i) {
    let o = n(), a = tr(() => {
      let c = Yn(n).map((l) => e[l]);
      if (c.length) return r(c);
    });
    return { S: o, B: a, Q: i };
  }
  function s({ S: i, B: o }, a, c) {
    if (!(i & 4 && c === a[a.length - 1])) {
      i & 2 && (c = a[a.length - 1]), i & 1 && t.push(a);
      for (let l of o)
        for (let u of l.Q)
          s(l, [...a, u], c);
    }
  }
}
function Fh(n) {
  return n.toString(16).toUpperCase().padStart(2, "0");
}
function Fc(n) {
  return `{${Fh(n)}}`;
}
function Mh(n) {
  let t = [];
  for (let e = 0, r = n.length; e < r; ) {
    let s = n.codePointAt(e);
    e += s < 65536 ? 1 : 2, t.push(s);
  }
  return t;
}
function Rn(n) {
  let e = n.length;
  if (e < 4096) return String.fromCodePoint(...n);
  let r = [];
  for (let s = 0; s < e; )
    r.push(String.fromCodePoint(...n.slice(s, s += 4096)));
  return r.join("");
}
function Hh(n, t) {
  let e = n.length, r = e - t.length;
  for (let s = 0; r == 0 && s < e; s++) r = n[s] - t[s];
  return r;
}
var Gh = "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";
const er = 44032, Mr = 4352, Hr = 4449, Gr = 4519, Mc = 19, Hc = 21, kn = 28, Vr = Hc * kn, Vh = Mc * Vr, zh = er + Vh, Qh = Mr + Mc, $h = Hr + Hc, Kh = Gr + kn;
function Jn(n) {
  return n >> 24 & 255;
}
function Gc(n) {
  return n & 16777215;
}
let ei, Mo, ni, Br;
function Jh() {
  let n = Uc(Gh);
  ei = new Map(Dc(n).flatMap((t, e) => t.map((r) => [r, e + 1 << 24]))), Mo = new Set(Yn(n)), ni = /* @__PURE__ */ new Map(), Br = /* @__PURE__ */ new Map();
  for (let [t, e] of Lc(n)) {
    if (!Mo.has(t) && e.length == 2) {
      let [r, s] = e, i = Br.get(r);
      i || (i = /* @__PURE__ */ new Map(), Br.set(r, i)), i.set(s, t);
    }
    ni.set(t, e.reverse());
  }
}
function Vc(n) {
  return n >= er && n < zh;
}
function Zh(n, t) {
  if (n >= Mr && n < Qh && t >= Hr && t < $h)
    return er + (n - Mr) * Vr + (t - Hr) * kn;
  if (Vc(n) && t > Gr && t < Kh && (n - er) % kn == 0)
    return n + (t - Gr);
  {
    let e = Br.get(n);
    return e && (e = e.get(t), e) ? e : -1;
  }
}
function zc(n) {
  ei || Jh();
  let t = [], e = [], r = !1;
  function s(i) {
    let o = ei.get(i);
    o && (r = !0, i |= o), t.push(i);
  }
  for (let i of n)
    for (; ; ) {
      if (i < 128)
        t.push(i);
      else if (Vc(i)) {
        let o = i - er, a = o / Vr | 0, c = o % Vr / kn | 0, l = o % kn;
        s(Mr + a), s(Hr + c), l > 0 && s(Gr + l);
      } else {
        let o = ni.get(i);
        o ? e.push(...o) : s(i);
      }
      if (!e.length) break;
      i = e.pop();
    }
  if (r && t.length > 1) {
    let i = Jn(t[0]);
    for (let o = 1; o < t.length; o++) {
      let a = Jn(t[o]);
      if (a == 0 || i <= a) {
        i = a;
        continue;
      }
      let c = o - 1;
      for (; ; ) {
        let l = t[c + 1];
        if (t[c + 1] = t[c], t[c] = l, !c || (i = Jn(t[--c]), i <= a)) break;
      }
      i = Jn(t[o]);
    }
  }
  return t;
}
function Wh(n) {
  let t = [], e = [], r = -1, s = 0;
  for (let i of n) {
    let o = Jn(i), a = Gc(i);
    if (r == -1)
      o == 0 ? r = a : t.push(a);
    else if (s > 0 && s >= o)
      o == 0 ? (t.push(r, ...e), e.length = 0, r = a) : e.push(a), s = o;
    else {
      let c = Zh(r, a);
      c >= 0 ? r = c : s == 0 && o == 0 ? (t.push(r), r = a) : (e.push(a), s = o);
    }
  }
  return r >= 0 && t.push(r, ...e), t;
}
function Qc(n) {
  return zc(n).map(Gc);
}
function jh(n) {
  return Wh(zc(n));
}
const Ho = 45, $c = ".", Kc = 65039, Jc = 1, zr = (n) => Array.from(n);
function nr(n, t) {
  return n.P.has(t) || n.Q.has(t);
}
class qh extends Array {
  get is_emoji() {
    return !0;
  }
  // free tagging system
}
let ri, Zc, $e, si, Wc, In, xs, wn, Me, Go, ii;
function Di() {
  if (ri) return;
  let n = Uc(Oh);
  const t = () => Yn(n), e = () => new Set(t()), r = (u, f) => f.forEach((h) => u.add(h));
  ri = new Map(Lc(n)), Zc = e(), $e = t(), si = new Set(t().map((u) => $e[u])), $e = new Set($e), Wc = e(), e();
  let s = Dc(n), i = n();
  const o = () => {
    let u = /* @__PURE__ */ new Set();
    return t().forEach((f) => r(u, s[f])), r(u, t()), u;
  };
  In = tr((u) => {
    let f = tr(n).map((h) => h + 96);
    if (f.length) {
      let h = u >= i;
      f[0] -= 32, f = Rn(f), h && (f = `Restricted[${f}]`);
      let y = o(), m = o(), p = !n();
      return { N: f, P: y, Q: m, M: p, R: h };
    }
  }), xs = e(), wn = /* @__PURE__ */ new Map();
  let a = t().concat(zr(xs)).sort((u, f) => u - f);
  a.forEach((u, f) => {
    let h = n(), y = a[f] = h ? a[f - h] : { V: [], M: /* @__PURE__ */ new Map() };
    y.V.push(u), xs.has(u) || wn.set(u, y);
  });
  for (let { V: u, M: f } of new Set(wn.values())) {
    let h = [];
    for (let m of u) {
      let p = In.filter((w) => nr(w, m)), d = h.find(({ G: w }) => p.some((x) => w.has(x)));
      d || (d = { G: /* @__PURE__ */ new Set(), V: [] }, h.push(d)), d.V.push(m), r(d.G, p);
    }
    let y = h.flatMap((m) => zr(m.G));
    for (let { G: m, V: p } of h) {
      let d = new Set(y.filter((w) => !m.has(w)));
      for (let w of p)
        f.set(w, d);
    }
  }
  Me = /* @__PURE__ */ new Set();
  let c = /* @__PURE__ */ new Set();
  const l = (u) => Me.has(u) ? c.add(u) : Me.add(u);
  for (let u of In) {
    for (let f of u.P) l(f);
    for (let f of u.Q) l(f);
  }
  for (let u of Me)
    !wn.has(u) && !c.has(u) && wn.set(u, Jc);
  r(Me, Qc(Me)), Go = _h(n).map((u) => qh.from(u)).sort(Hh), ii = /* @__PURE__ */ new Map();
  for (let u of Go) {
    let f = [ii];
    for (let h of u) {
      let y = f.map((m) => {
        let p = m.get(h);
        return p || (p = /* @__PURE__ */ new Map(), m.set(h, p)), p;
      });
      h === Kc ? f.push(...y) : f = y;
    }
    for (let h of f)
      h.V = u;
  }
}
function Li(n) {
  return (jc(n) ? "" : `${_i(es([n]))} `) + Fc(n);
}
function _i(n) {
  return `"${n}"‎`;
}
function Xh(n) {
  if (n.length >= 4 && n[2] == Ho && n[3] == Ho)
    throw new Error(`invalid label extension: "${Rn(n.slice(0, 4))}"`);
}
function Yh(n) {
  for (let e = n.lastIndexOf(95); e > 0; )
    if (n[--e] !== 95)
      throw new Error("underscore allowed only at start");
}
function td(n) {
  let t = n[0], e = _o.get(t);
  if (e) throw Wn(`leading ${e}`);
  let r = n.length, s = -1;
  for (let i = 1; i < r; i++) {
    t = n[i];
    let o = _o.get(t);
    if (o) {
      if (s == i) throw Wn(`${e} + ${o}`);
      s = i + 1, e = o;
    }
  }
  if (s == r) throw Wn(`trailing ${e}`);
}
function es(n, t = 1 / 0, e = Fc) {
  let r = [];
  ed(n[0]) && r.push("◌"), n.length > t && (t >>= 1, n = [...n.slice(0, t), 8230, ...n.slice(-t)]);
  let s = 0, i = n.length;
  for (let o = 0; o < i; o++) {
    let a = n[o];
    jc(a) && (r.push(Rn(n.slice(s, o))), r.push(e(a)), s = o + 1);
  }
  return r.push(Rn(n.slice(s, i))), r.join("");
}
function ed(n) {
  return Di(), $e.has(n);
}
function jc(n) {
  return Di(), Wc.has(n);
}
function nd(n) {
  return od(rd(n, jh, ld));
}
function rd(n, t, e) {
  if (!n) return [];
  Di();
  let r = 0;
  return n.split($c).map((s) => {
    let i = Mh(s), o = {
      input: i,
      offset: r
      // codepoint, not substring!
    };
    r += i.length + 1;
    try {
      let a = o.tokens = cd(i, t, e), c = a.length, l;
      if (!c)
        throw new Error("empty label");
      let u = o.output = a.flat();
      if (Yh(u), !(o.emoji = c > 1 || a[0].is_emoji) && u.every((h) => h < 128))
        Xh(u), l = "ASCII";
      else {
        let h = a.flatMap((y) => y.is_emoji ? [] : y);
        if (!h.length)
          l = "Emoji";
        else {
          if ($e.has(u[0])) throw Wn("leading combining mark");
          for (let p = 1; p < c; p++) {
            let d = a[p];
            if (!d.is_emoji && $e.has(d[0]))
              throw Wn(`emoji + combining mark: "${Rn(a[p - 1])} + ${es([d[0]])}"`);
          }
          td(u);
          let y = zr(new Set(h)), [m] = id(y);
          ad(m, h), sd(m, y), l = m.N;
        }
      }
      o.type = l;
    } catch (a) {
      o.error = a;
    }
    return o;
  });
}
function sd(n, t) {
  let e, r = [];
  for (let s of t) {
    let i = wn.get(s);
    if (i === Jc) return;
    if (i) {
      let o = i.M.get(s);
      if (e = e ? e.filter((a) => o.has(a)) : zr(o), !e.length) return;
    } else
      r.push(s);
  }
  if (e) {
    for (let s of e)
      if (r.every((i) => nr(s, i)))
        throw new Error(`whole-script confusable: ${n.N}/${s.N}`);
  }
}
function id(n) {
  let t = In;
  for (let e of n) {
    let r = t.filter((s) => nr(s, e));
    if (!r.length)
      throw In.some((s) => nr(s, e)) ? Xc(t[0], e) : qc(e);
    if (t = r, r.length == 1) break;
  }
  return t;
}
function od(n) {
  return n.map(({ input: t, error: e, output: r }) => {
    if (e) {
      let s = e.message;
      throw new Error(n.length == 1 ? s : `Invalid label ${_i(es(t, 63))}: ${s}`);
    }
    return Rn(r);
  }).join($c);
}
function qc(n) {
  return new Error(`disallowed character: ${Li(n)}`);
}
function Xc(n, t) {
  let e = Li(t), r = In.find((s) => s.P.has(t));
  return r && (e = `${r.N} ${e}`), new Error(`illegal mixture: ${n.N} + ${e}`);
}
function Wn(n) {
  return new Error(`illegal placement: ${n}`);
}
function ad(n, t) {
  for (let e of t)
    if (!nr(n, e))
      throw Xc(n, e);
  if (n.M) {
    let e = Qc(t);
    for (let r = 1, s = e.length; r < s; r++)
      if (si.has(e[r])) {
        let i = r + 1;
        for (let o; i < s && si.has(o = e[i]); i++)
          for (let a = r; a < i; a++)
            if (e[a] == o)
              throw new Error(`duplicate non-spacing marks: ${Li(o)}`);
        if (i - r > Fo)
          throw new Error(`excessive non-spacing marks: ${_i(es(e.slice(r - 1, i)))} (${i - r}/${Fo})`);
        r = i;
      }
  }
}
function cd(n, t, e) {
  let r = [], s = [];
  for (n = n.slice().reverse(); n.length; ) {
    let i = ud(n);
    if (i)
      s.length && (r.push(t(s)), s = []), r.push(e(i));
    else {
      let o = n.pop();
      if (Me.has(o))
        s.push(o);
      else {
        let a = ri.get(o);
        if (a)
          s.push(...a);
        else if (!Zc.has(o))
          throw qc(o);
      }
    }
  }
  return s.length && r.push(t(s)), r;
}
function ld(n) {
  return n.filter((t) => t != Kc);
}
function ud(n, t) {
  let e = ii, r, s = n.length;
  for (; s && (e = e.get(n[--s]), !!e); ) {
    let { V: i } = e;
    i && (r = i, n.length = s);
  }
  return r;
}
const Yc = new Uint8Array(32);
Yc.fill(0);
function Vo(n) {
  return g(n.length !== 0, "invalid ENS name; empty component", "comp", n), n;
}
function tl(n) {
  const t = Rt(fd(n)), e = [];
  if (n.length === 0)
    return e;
  let r = 0;
  for (let s = 0; s < t.length; s++)
    t[s] === 46 && (e.push(Vo(t.slice(r, s))), r = s + 1);
  return g(r < t.length, "invalid ENS name; empty component", "name", n), e.push(Vo(t.slice(r))), e;
}
function fd(n) {
  try {
    if (n.length === 0)
      throw new Error("empty label");
    return nd(n);
  } catch (t) {
    g(!1, `invalid ENS name (${t.message})`, "name", n);
  }
}
function oi(n) {
  g(typeof n == "string", "invalid ENS name; not a string", "name", n), g(n.length, "invalid ENS name (empty label)", "name", n);
  let t = Yc;
  const e = tl(n);
  for (; e.length; )
    t = it(tt([t, it(e.pop())]));
  return U(t);
}
function hd(n, t) {
  const e = t;
  return g(e <= 255, "DNS encoded label cannot exceed 255", "length", e), U(tt(tl(n).map((r) => {
    g(r.length <= e, `label ${JSON.stringify(n)} exceeds ${e} bytes`, "name", n);
    const s = new Uint8Array(r.length + 1);
    return s.set(r, 1), s[0] = s.length - 1, s;
  }))) + "00";
}
function Is(n, t) {
  return {
    address: j(n),
    storageKeys: t.map((e, r) => (g(X(e, 32), "invalid slot", `storageKeys[${r}]`, e), e.toLowerCase()))
  };
}
function fn(n) {
  if (Array.isArray(n))
    return n.map((e, r) => Array.isArray(e) ? (g(e.length === 2, "invalid slot set", `value[${r}]`, e), Is(e[0], e[1])) : (g(e != null && typeof e == "object", "invalid address-slot set", "value", n), Is(e.address, e.storageKeys)));
  g(n != null && typeof n == "object", "invalid access list", "value", n);
  const t = Object.keys(n).map((e) => {
    const r = n[e].reduce((s, i) => (s[i] = !0, s), {});
    return Is(e, Object.keys(r).sort());
  });
  return t.sort((e, r) => e.address.localeCompare(r.address)), t;
}
function dd(n) {
  let t;
  return typeof n == "string" ? t = ye.computePublicKey(n, !1) : t = n.publicKey, j(it("0x" + t.substring(4)).substring(26));
}
function pd(n, t) {
  return dd(ye.recoverPublicKey(n, t));
}
const mt = BigInt(0), gd = BigInt(2), yd = BigInt(27), wd = BigInt(28), md = BigInt(35), Ad = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"), Ns = 4096 * 32;
function zo(n, t) {
  let e = n.toString(16);
  for (; e.length < 2; )
    e = "0" + e;
  return e += Ue(t).substring(4), "0x" + e;
}
function ns(n) {
  return n === "0x" ? null : j(n);
}
function Fi(n, t) {
  try {
    return fn(n);
  } catch (e) {
    g(!1, e.message, t, n);
  }
}
function lr(n, t) {
  return n === "0x" ? 0 : Q(n, t);
}
function ft(n, t) {
  if (n === "0x")
    return mt;
  const e = D(n, t);
  return g(e <= Ad, "value exceeds uint size", t, e), e;
}
function Y(n, t) {
  const e = D(n, "value"), r = gt(e);
  return g(r.length <= 32, "value too large", `tx.${t}`, e), r;
}
function Mi(n) {
  return fn(n).map((t) => [t.address, t.storageKeys]);
}
function bd(n, t) {
  g(Array.isArray(n), `invalid ${t}`, "value", n);
  for (let e = 0; e < n.length; e++)
    g(X(n[e], 32), "invalid ${ param } hash", `value[${e}]`, n[e]);
  return n;
}
function Ed(n) {
  const t = qr(n);
  g(Array.isArray(t) && (t.length === 9 || t.length === 6), "invalid field count for legacy transaction", "data", n);
  const e = {
    type: 0,
    nonce: lr(t[0], "nonce"),
    gasPrice: ft(t[1], "gasPrice"),
    gasLimit: ft(t[2], "gasLimit"),
    to: ns(t[3]),
    value: ft(t[4], "value"),
    data: U(t[5]),
    chainId: mt
  };
  if (t.length === 6)
    return e;
  const r = ft(t[6], "v"), s = ft(t[7], "r"), i = ft(t[8], "s");
  if (s === mt && i === mt)
    e.chainId = r;
  else {
    let o = (r - md) / gd;
    o < mt && (o = mt), e.chainId = o, g(o !== mt || r === yd || r === wd, "non-canonical legacy v", "v", t[6]), e.signature = pt.from({
      r: ce(t[7], 32),
      s: ce(t[8], 32),
      v: r
    });
  }
  return e;
}
function xd(n, t) {
  const e = [
    Y(n.nonce, "nonce"),
    Y(n.gasPrice || 0, "gasPrice"),
    Y(n.gasLimit, "gasLimit"),
    n.to || "0x",
    Y(n.value, "value"),
    n.data
  ];
  let r = mt;
  if (n.chainId != mt)
    r = D(n.chainId, "tx.chainId"), g(!t || t.networkV == null || t.legacyChainId === r, "tx.chainId/sig.v mismatch", "sig", t);
  else if (n.signature) {
    const i = n.signature.legacyChainId;
    i != null && (r = i);
  }
  if (!t)
    return r !== mt && (e.push(gt(r)), e.push("0x"), e.push("0x")), nn(e);
  let s = BigInt(27 + t.yParity);
  return r !== mt ? s = pt.getChainIdV(r, t.v) : BigInt(t.v) !== s && g(!1, "tx.chainId/sig.v mismatch", "sig", t), e.push(gt(s)), e.push(gt(t.r)), e.push(gt(t.s)), nn(e);
}
function Hi(n, t) {
  let e;
  try {
    if (e = lr(t[0], "yParity"), e !== 0 && e !== 1)
      throw new Error("bad yParity");
  } catch {
    g(!1, "invalid yParity", "yParity", t[0]);
  }
  const r = ce(t[1], 32), s = ce(t[2], 32), i = pt.from({ r, s, yParity: e });
  n.signature = i;
}
function Id(n) {
  const t = qr(V(n).slice(1));
  g(Array.isArray(t) && (t.length === 9 || t.length === 12), "invalid field count for transaction type: 2", "data", U(n));
  const e = {
    type: 2,
    chainId: ft(t[0], "chainId"),
    nonce: lr(t[1], "nonce"),
    maxPriorityFeePerGas: ft(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: ft(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: ft(t[4], "gasLimit"),
    to: ns(t[5]),
    value: ft(t[6], "value"),
    data: U(t[7]),
    accessList: Fi(t[8], "accessList")
  };
  return t.length === 9 || Hi(e, t.slice(9)), e;
}
function Nd(n, t) {
  const e = [
    Y(n.chainId, "chainId"),
    Y(n.nonce, "nonce"),
    Y(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    Y(n.maxFeePerGas || 0, "maxFeePerGas"),
    Y(n.gasLimit, "gasLimit"),
    n.to || "0x",
    Y(n.value, "value"),
    n.data,
    Mi(n.accessList || [])
  ];
  return t && (e.push(Y(t.yParity, "yParity")), e.push(gt(t.r)), e.push(gt(t.s))), tt(["0x02", nn(e)]);
}
function Pd(n) {
  const t = qr(V(n).slice(1));
  g(Array.isArray(t) && (t.length === 8 || t.length === 11), "invalid field count for transaction type: 1", "data", U(n));
  const e = {
    type: 1,
    chainId: ft(t[0], "chainId"),
    nonce: lr(t[1], "nonce"),
    gasPrice: ft(t[2], "gasPrice"),
    gasLimit: ft(t[3], "gasLimit"),
    to: ns(t[4]),
    value: ft(t[5], "value"),
    data: U(t[6]),
    accessList: Fi(t[7], "accessList")
  };
  return t.length === 8 || Hi(e, t.slice(8)), e;
}
function vd(n, t) {
  const e = [
    Y(n.chainId, "chainId"),
    Y(n.nonce, "nonce"),
    Y(n.gasPrice || 0, "gasPrice"),
    Y(n.gasLimit, "gasLimit"),
    n.to || "0x",
    Y(n.value, "value"),
    n.data,
    Mi(n.accessList || [])
  ];
  return t && (e.push(Y(t.yParity, "recoveryParam")), e.push(gt(t.r)), e.push(gt(t.s))), tt(["0x01", nn(e)]);
}
function Td(n) {
  let t = qr(V(n).slice(1)), e = "3", r = null;
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
  g(Array.isArray(t) && (t.length === 11 || t.length === 14), `invalid field count for transaction type: ${e}`, "data", U(n));
  const s = {
    type: 3,
    chainId: ft(t[0], "chainId"),
    nonce: lr(t[1], "nonce"),
    maxPriorityFeePerGas: ft(t[2], "maxPriorityFeePerGas"),
    maxFeePerGas: ft(t[3], "maxFeePerGas"),
    gasPrice: null,
    gasLimit: ft(t[4], "gasLimit"),
    to: ns(t[5]),
    value: ft(t[6], "value"),
    data: U(t[7]),
    accessList: Fi(t[8], "accessList"),
    maxFeePerBlobGas: ft(t[9], "maxFeePerBlobGas"),
    blobVersionedHashes: t[10]
  };
  r && (s.blobs = r), g(s.to != null, `invalid address for transaction type: ${e}`, "data", n), g(Array.isArray(s.blobVersionedHashes), "invalid blobVersionedHashes: must be an array", "data", n);
  for (let i = 0; i < s.blobVersionedHashes.length; i++)
    g(X(s.blobVersionedHashes[i], 32), `invalid blobVersionedHash at index ${i}: must be length 32`, "data", n);
  return t.length === 11 || Hi(s, t.slice(11)), s;
}
function Cd(n, t, e) {
  const r = [
    Y(n.chainId, "chainId"),
    Y(n.nonce, "nonce"),
    Y(n.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
    Y(n.maxFeePerGas || 0, "maxFeePerGas"),
    Y(n.gasLimit, "gasLimit"),
    n.to || Bn,
    Y(n.value, "value"),
    n.data,
    Mi(n.accessList || []),
    Y(n.maxFeePerBlobGas || 0, "maxFeePerBlobGas"),
    bd(n.blobVersionedHashes || [], "blobVersionedHashes")
  ];
  return t && (r.push(Y(t.yParity, "yParity")), r.push(gt(t.r)), r.push(gt(t.s)), e) ? tt([
    "0x03",
    nn([
      r,
      e.map((s) => s.data),
      e.map((s) => s.commitment),
      e.map((s) => s.proof)
    ])
  ]) : tt(["0x03", nn(r)]);
}
class ie {
  #t;
  #e;
  #n;
  #r;
  #s;
  #o;
  #i;
  #a;
  #f;
  #l;
  #p;
  #g;
  #c;
  #u;
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
    return t == null && this.type === 3 ? Bn : t;
  }
  set to(t) {
    this.#e = t == null ? null : j(t);
  }
  /**
   *  The transaction nonce.
   */
  get nonce() {
    return this.#r;
  }
  set nonce(t) {
    this.#r = Q(t, "value");
  }
  /**
   *  The gas limit.
   */
  get gasLimit() {
    return this.#s;
  }
  set gasLimit(t) {
    this.#s = D(t);
  }
  /**
   *  The gas price.
   *
   *  On legacy networks this defines the fee that will be paid. On
   *  EIP-1559 networks, this should be ``null``.
   */
  get gasPrice() {
    const t = this.#o;
    return t == null && (this.type === 0 || this.type === 1) ? mt : t;
  }
  set gasPrice(t) {
    this.#o = t == null ? null : D(t, "gasPrice");
  }
  /**
   *  The maximum priority fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxPriorityFeePerGas() {
    const t = this.#i;
    return t ?? (this.type === 2 || this.type === 3 ? mt : null);
  }
  set maxPriorityFeePerGas(t) {
    this.#i = t == null ? null : D(t, "maxPriorityFeePerGas");
  }
  /**
   *  The maximum total fee per unit of gas to pay. On legacy
   *  networks this should be ``null``.
   */
  get maxFeePerGas() {
    const t = this.#a;
    return t ?? (this.type === 2 || this.type === 3 ? mt : null);
  }
  set maxFeePerGas(t) {
    this.#a = t == null ? null : D(t, "maxFeePerGas");
  }
  /**
   *  The transaction data. For ``init`` transactions this is the
   *  deployment code.
   */
  get data() {
    return this.#n;
  }
  set data(t) {
    this.#n = U(t);
  }
  /**
   *  The amount of ether (in wei) to send in this transactions.
   */
  get value() {
    return this.#f;
  }
  set value(t) {
    this.#f = D(t, "value");
  }
  /**
   *  The chain ID this transaction is valid on.
   */
  get chainId() {
    return this.#l;
  }
  set chainId(t) {
    this.#l = D(t);
  }
  /**
   *  If signed, the signature for this transaction.
   */
  get signature() {
    return this.#p || null;
  }
  set signature(t) {
    this.#p = t == null ? null : pt.from(t);
  }
  /**
   *  The access list.
   *
   *  An access list permits discounted (but pre-paid) access to
   *  bytecode and state variable access within contract execution.
   */
  get accessList() {
    const t = this.#g || null;
    return t ?? (this.type === 1 || this.type === 2 || this.type === 3 ? [] : null);
  }
  set accessList(t) {
    this.#g = t == null ? null : fn(t);
  }
  /**
   *  The max fee per blob gas for Cancun transactions.
   */
  get maxFeePerBlobGas() {
    const t = this.#c;
    return t == null && this.type === 3 ? mt : t;
  }
  set maxFeePerBlobGas(t) {
    this.#c = t == null ? null : D(t, "maxFeePerBlobGas");
  }
  /**
   *  The BLOb versioned hashes for Cancun transactions.
   */
  get blobVersionedHashes() {
    let t = this.#u;
    return t == null && this.type === 3 ? [] : t;
  }
  set blobVersionedHashes(t) {
    if (t != null) {
      g(Array.isArray(t), "blobVersionedHashes must be an Array", "value", t), t = t.slice();
      for (let e = 0; e < t.length; e++)
        g(X(t[e], 32), "invalid blobVersionedHash", `value[${e}]`, t[e]);
    }
    this.#u = t;
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
      if (Ii(i)) {
        I(this.#h, "adding a raw blob requires a KZG library", "UNSUPPORTED_OPERATION", {
          operation: "set blobs()"
        });
        let o = V(i);
        if (g(o.length <= Ns, "blob is too large", `blobs[${s}]`, i), o.length !== Ns) {
          const l = new Uint8Array(Ns);
          l.set(o), o = l;
        }
        const a = this.#h.blobToKzgCommitment(o), c = U(this.#h.computeBlobKzgProof(o, a));
        e.push({
          data: U(o),
          commitment: U(a),
          proof: c
        }), r.push(zo(1, a));
      } else {
        const o = U(i.commitment);
        e.push({
          data: U(i.data),
          commitment: o,
          proof: U(i.proof)
        }), r.push(zo(1, o));
      }
    }
    this.#d = e, this.#u = r;
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
    this.#t = null, this.#e = null, this.#r = 0, this.#s = mt, this.#o = null, this.#i = null, this.#a = null, this.#n = "0x", this.#f = mt, this.#l = mt, this.#p = null, this.#g = null, this.#c = null, this.#u = null, this.#d = null, this.#h = null;
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
    return this.signature == null ? null : pd(this.unsignedHash, this.signature);
  }
  /**
   *  The public key of the sender, if signed. Otherwise, ``null``.
   */
  get fromPublicKey() {
    return this.signature == null ? null : ye.recoverPublicKey(this.unsignedHash, this.signature);
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
        return xd(this, r);
      case 1:
        return vd(this, r);
      case 2:
        return Nd(this, r);
      case 3:
        return Cd(this, r, e ? this.blobs : null);
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
    const t = this.gasPrice != null, e = this.maxFeePerGas != null || this.maxPriorityFeePerGas != null, r = this.accessList != null, s = this.#c != null || this.#u;
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
    return ie.from(this);
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
      return new ie();
    if (typeof t == "string") {
      const r = V(t);
      if (r[0] >= 127)
        return ie.from(Ed(r));
      switch (r[0]) {
        case 1:
          return ie.from(Pd(r));
        case 2:
          return ie.from(Id(r));
        case 3:
          return ie.from(Td(r));
      }
      I(!1, "unsupported transaction type", "UNSUPPORTED_OPERATION", { operation: "from" });
    }
    const e = new ie();
    return t.type != null && (e.type = t.type), t.to != null && (e.to = t.to), t.nonce != null && (e.nonce = t.nonce), t.gasLimit != null && (e.gasLimit = t.gasLimit), t.gasPrice != null && (e.gasPrice = t.gasPrice), t.maxPriorityFeePerGas != null && (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas), t.maxFeePerGas != null && (e.maxFeePerGas = t.maxFeePerGas), t.maxFeePerBlobGas != null && (e.maxFeePerBlobGas = t.maxFeePerBlobGas), t.data != null && (e.data = t.data), t.value != null && (e.value = t.value), t.chainId != null && (e.chainId = t.chainId), t.signature != null && (e.signature = pt.from(t.signature)), t.accessList != null && (e.accessList = t.accessList), t.blobVersionedHashes != null && (e.blobVersionedHashes = t.blobVersionedHashes), t.kzg != null && (e.kzg = t.kzg), t.blobs != null && (e.blobs = t.blobs), t.hash != null && (g(e.isSigned(), "unsigned transaction cannot define '.hash'", "tx", t), g(e.hash === t.hash, "hash mismatch", "tx", t)), t.from != null && (g(e.isSigned(), "unsigned transaction cannot define '.from'", "tx", t), g(e.from.toLowerCase() === (t.from || "").toLowerCase(), "from mismatch", "tx", t)), e;
  }
}
function Od(n) {
  return typeof n == "string" && (n = Rt(n)), it(tt([
    Rt(lh),
    Rt(String(n.length)),
    n
  ]));
}
const Sd = new RegExp("^bytes([0-9]+)$"), Bd = new RegExp("^(u?int)([0-9]*)$"), Rd = new RegExp("^(.*)\\[([0-9]*)\\]$");
function el(n, t, e) {
  switch (n) {
    case "address":
      return V(e ? ce(t, 32) : j(t));
    case "string":
      return Rt(t);
    case "bytes":
      return V(t);
    case "bool":
      return t = t ? "0x01" : "0x00", V(e ? ce(t, 32) : t);
  }
  let r = n.match(Bd);
  if (r) {
    let s = r[1] === "int", i = parseInt(r[2] || "256");
    return g((!r[2] || r[2] === String(i)) && i % 8 === 0 && i !== 0 && i <= 256, "invalid number type", "type", n), e && (i = 256), s && (t = Pi(t, i)), V(ce(gt(t), i / 8));
  }
  if (r = n.match(Sd), r) {
    const s = parseInt(r[1]);
    return g(String(s) === r[1] && s !== 0 && s <= 32, "invalid bytes type", "type", n), g(Je(t) === s, `invalid value for ${n}`, "value", t), e ? V(Ni(t, 32)) : t;
  }
  if (r = n.match(Rd), r && Array.isArray(t)) {
    const s = r[1], i = parseInt(r[2] || String(t.length));
    g(i === t.length, `invalid array length for ${n}`, "value", t);
    const o = [];
    return t.forEach(function(a) {
      o.push(el(s, a, !0));
    }), V(tt(o));
  }
  g(!1, "invalid type", "type", n);
}
function kd(n, t) {
  g(n.length === t.length, "wrong number of values; expected ${ types.length }", "values", t);
  const e = [];
  return n.forEach(function(r, s) {
    e.push(el(r, t[s]));
  }), U(tt(e));
}
function Ps(n, t) {
  return it(kd(n, t));
}
const nl = new Uint8Array(32);
nl.fill(0);
const Ud = BigInt(-1), rl = BigInt(0), sl = BigInt(1), Dd = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
function Ld(n) {
  const t = V(n), e = t.length % 32;
  return e ? tt([t, nl.slice(e)]) : U(t);
}
const _d = ke(sl, 32), Fd = ke(rl, 32), Qo = {
  name: "string",
  version: "string",
  chainId: "uint256",
  verifyingContract: "address",
  salt: "bytes32"
}, vs = [
  "name",
  "version",
  "chainId",
  "verifyingContract",
  "salt"
];
function $o(n) {
  return function(t) {
    return g(typeof t == "string", `invalid domain value for ${JSON.stringify(n)}`, `domain.${n}`, t), t;
  };
}
const Md = {
  name: $o("name"),
  version: $o("version"),
  chainId: function(n) {
    const t = D(n, "domain.chainId");
    return g(t >= 0, "invalid chain ID", "domain.chainId", n), Number.isSafeInteger(t) ? Number(t) : An(t);
  },
  verifyingContract: function(n) {
    try {
      return j(n).toLowerCase();
    } catch {
    }
    g(!1, 'invalid domain value "verifyingContract"', "domain.verifyingContract", n);
  },
  salt: function(n) {
    const t = V(n, "domain.salt");
    return g(t.length === 32, 'invalid domain value "salt"', "domain.salt", n), U(t);
  }
};
function Ts(n) {
  {
    const t = n.match(/^(u?)int(\d+)$/);
    if (t) {
      const e = t[1] === "", r = parseInt(t[2]);
      g(r % 8 === 0 && r !== 0 && r <= 256 && t[2] === String(r), "invalid numeric width", "type", n);
      const s = ze(Dd, e ? r - 1 : r), i = e ? (s + sl) * Ud : rl;
      return function(o) {
        const a = D(o, "value");
        return g(a >= i && a <= s, `value out-of-bounds for ${n}`, "value", a), ke(e ? Pi(a, 256) : a, 32);
      };
    }
  }
  {
    const t = n.match(/^bytes(\d+)$/);
    if (t) {
      const e = parseInt(t[1]);
      return g(e !== 0 && e <= 32 && t[1] === String(e), "invalid bytes width", "type", n), function(r) {
        const s = V(r);
        return g(s.length === e, `invalid length for ${n}`, "value", r), Ld(r);
      };
    }
  }
  switch (n) {
    case "address":
      return function(t) {
        return ce(j(t), 32);
      };
    case "bool":
      return function(t) {
        return t ? _d : Fd;
      };
    case "bytes":
      return function(t) {
        return it(t);
      };
    case "string":
      return function(t) {
        return rn(t);
      };
  }
  return null;
}
function Ko(n, t) {
  return `${n}(${t.map(({ name: e, type: r }) => r + " " + e).join(",")})`;
}
function xr(n) {
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
class Dt {
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
      i[c] = t[c].map(({ name: l, type: u }) => {
        let { base: f, index: h } = xr(u);
        return f === "int" && !t.int && (f = "int256"), f === "uint" && !t.uint && (f = "uint256"), { name: l, type: f + (h || "") };
      }), e.set(c, /* @__PURE__ */ new Set()), r.set(c, []), s.set(c, /* @__PURE__ */ new Set());
    }), this.#t = JSON.stringify(i);
    for (const c in i) {
      const l = /* @__PURE__ */ new Set();
      for (const u of i[c]) {
        g(!l.has(u.name), `duplicate variable name ${JSON.stringify(u.name)} in ${JSON.stringify(c)}`, "types", t), l.add(u.name);
        const f = xr(u.type).base;
        g(f !== c, `circular type reference to ${JSON.stringify(f)}`, "types", t), !Ts(f) && (g(r.has(f), `unknown type ${JSON.stringify(f)}`, "types", t), r.get(f).push(c), e.get(c).add(f));
      }
    }
    const o = Array.from(r.keys()).filter((c) => r.get(c).length === 0);
    g(o.length !== 0, "missing primary type", "types", t), g(o.length === 1, `ambiguous primary types or unused types: ${o.map((c) => JSON.stringify(c)).join(", ")}`, "types", t), F(this, { primaryType: o[0] });
    function a(c, l) {
      g(!l.has(c), `circular type reference to ${JSON.stringify(c)}`, "types", t), l.add(c);
      for (const u of e.get(c))
        if (r.has(u)) {
          a(u, l);
          for (const f of l)
            s.get(f).add(u);
        }
      l.delete(c);
    }
    a(this.primaryType, /* @__PURE__ */ new Set());
    for (const [c, l] of s) {
      const u = Array.from(l);
      u.sort(), this.#e.set(c, Ko(c, i[c]) + u.map((f) => Ko(f, i[f])).join(""));
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
      const s = Ts(t);
      if (s)
        return s;
    }
    const e = xr(t).array;
    if (e) {
      const s = e.prefix, i = this.getEncoder(s);
      return (o) => {
        g(e.count === -1 || e.count === o.length, `array length mismatch; expected length ${e.count}`, "value", o);
        let a = o.map(i);
        return this.#e.has(s) && (a = a.map(it)), it(tt(a));
      };
    }
    const r = this.types[t];
    if (r) {
      const s = rn(this.#e.get(t));
      return (i) => {
        const o = r.map(({ name: a, type: c }) => {
          const l = this.getEncoder(c)(i[a]);
          return this.#e.has(c) ? it(l) : l;
        });
        return o.unshift(s), tt(o);
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
    if (Ts(t))
      return r(t, e);
    const s = xr(t).array;
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
    return new Dt(t);
  }
  /**
   *  Return the primary type for %%types%%.
   */
  static getPrimaryType(t) {
    return Dt.from(t).primaryType;
  }
  /**
   *  Return the hashed struct for %%value%% using %%types%% and %%name%%.
   */
  static hashStruct(t, e, r) {
    return Dt.from(e).hashStruct(t, r);
  }
  /**
   *  Return the domain hash for %%domain%%.
   */
  static hashDomain(t) {
    const e = [];
    for (const r in t) {
      if (t[r] == null)
        continue;
      const s = Qo[r];
      g(s, `invalid typed-data domain key: ${JSON.stringify(r)}`, "domain", t), e.push({ name: r, type: s });
    }
    return e.sort((r, s) => vs.indexOf(r.name) - vs.indexOf(s.name)), Dt.hashStruct("EIP712Domain", { EIP712Domain: e }, t);
  }
  /**
   *  Return the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static encode(t, e, r) {
    return tt([
      "0x1901",
      Dt.hashDomain(t),
      Dt.from(e).hash(r)
    ]);
  }
  /**
   *  Return the hash of the fully encoded [[link-eip-712]] %%value%% for %%types%% with %%domain%%.
   */
  static hash(t, e, r) {
    return it(Dt.encode(t, e, r));
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
    t.verifyingContract && !X(t.verifyingContract, 20) && (i[t.verifyingContract] = "0x");
    const o = Dt.from(e);
    o.visit(r, (a, c) => (a === "address" && !X(c, 20) && (i[c] = "0x"), c));
    for (const a in i)
      i[a] = await s(a);
    return t.verifyingContract && i[t.verifyingContract] && (t.verifyingContract = i[t.verifyingContract]), r = o.visit(r, (a, c) => a === "address" && i[c] ? i[c] : c), { domain: t, value: r };
  }
  /**
   *  Returns the JSON-encoded payload expected by nodes which implement
   *  the JSON-RPC [[link-eip-712]] method.
   */
  static getPayload(t, e, r) {
    Dt.hashDomain(t);
    const s = {}, i = [];
    vs.forEach((c) => {
      const l = t[c];
      l != null && (s[c] = Md[c](l), i.push({ name: c, type: Qo[c] }));
    });
    const o = Dt.from(e);
    e = o.types;
    const a = Object.assign({}, e);
    return g(a.EIP712Domain == null, "types must not contain EIP712Domain type", "types.EIP712Domain", e), a.EIP712Domain = i, o.encode(r), {
      types: a,
      domain: s,
      primaryType: o.primaryType,
      message: o.visit(r, (c, l) => {
        if (c.match(/^bytes(\d*)/))
          return U(V(l));
        if (c.match(/^u?int/))
          return D(l).toString();
        switch (c) {
          case "address":
            return l.toLowerCase();
          case "bool":
            return !!l;
          case "string":
            return g(typeof l == "string", "invalid string", "value", l), l;
        }
        g(!1, "unsupported type", "type", c);
      })
    };
  }
}
function Tt(n) {
  const t = /* @__PURE__ */ new Set();
  return n.forEach((e) => t.add(e)), Object.freeze(t);
}
const Hd = "external public payable override", Gd = Tt(Hd.split(" ")), il = "constant external internal payable private public pure view override", Vd = Tt(il.split(" ")), ol = "constructor error event fallback function receive struct", al = Tt(ol.split(" ")), cl = "calldata memory storage payable indexed", zd = Tt(cl.split(" ")), Qd = "tuple returns", $d = [ol, cl, Qd, il].join(" "), Kd = Tt($d.split(" ")), Jd = {
  "(": "OPEN_PAREN",
  ")": "CLOSE_PAREN",
  "[": "OPEN_BRACKET",
  "]": "CLOSE_BRACKET",
  ",": "COMMA",
  "@": "AT"
}, Zd = new RegExp("^(\\s*)"), Wd = new RegExp("^([0-9]+)"), jd = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), ll = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), ul = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
class $t {
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
    return new $t(this.#e);
  }
  reset() {
    this.#t = 0;
  }
  #n(t = 0, e = 0) {
    return new $t(this.#e.slice(t, e).map((r) => Object.freeze(Object.assign({}, r, {
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
function Le(n) {
  const t = [], e = (o) => {
    const a = i < n.length ? JSON.stringify(n[i]) : "$EOI";
    throw new Error(`invalid token ${a} at ${i}: ${o}`);
  };
  let r = [], s = [], i = 0;
  for (; i < n.length; ) {
    let o = n.substring(i), a = o.match(Zd);
    a && (i += a[1].length, o = n.substring(i));
    const c = { depth: r.length, linkBack: -1, linkNext: -1, match: -1, type: "", text: "", offset: i, value: -1 };
    t.push(c);
    let l = Jd[o[0]] || "";
    if (l) {
      if (c.type = l, c.text = o[0], i++, l === "OPEN_PAREN")
        r.push(t.length - 1), s.push(t.length - 1);
      else if (l == "CLOSE_PAREN")
        r.length === 0 && e("no matching open bracket"), c.match = r.pop(), t[c.match].match = t.length - 1, c.depth--, c.linkBack = s.pop(), t[c.linkBack].linkNext = t.length - 1;
      else if (l === "COMMA")
        c.linkBack = s.pop(), t[c.linkBack].linkNext = t.length - 1, s.push(t.length - 1);
      else if (l === "OPEN_BRACKET")
        c.type = "BRACKET";
      else if (l === "CLOSE_BRACKET") {
        let u = t.pop().text;
        if (t.length > 0 && t[t.length - 1].type === "NUMBER") {
          const f = t.pop().text;
          u = f + u, t[t.length - 1].value = Q(f);
        }
        if (t.length === 0 || t[t.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        t[t.length - 1].text += u;
      }
      continue;
    }
    if (a = o.match(jd), a) {
      if (c.text = a[1], i += c.text.length, Kd.has(c.text)) {
        c.type = "KEYWORD";
        continue;
      }
      if (c.text.match(ul)) {
        c.type = "TYPE";
        continue;
      }
      c.type = "ID";
      continue;
    }
    if (a = o.match(Wd), a) {
      c.text = a[1], c.type = "NUMBER", i += c.text.length;
      continue;
    }
    throw new Error(`unexpected token ${JSON.stringify(o[0])} at position ${i}`);
  }
  return new $t(t.map((o) => Object.freeze(o)));
}
function Jo(n, t) {
  let e = [];
  for (const r in t.keys())
    n.has(r) && e.push(r);
  if (e.length > 1)
    throw new Error(`conflicting types: ${e.join(", ")}`);
}
function rs(n, t) {
  if (t.peekKeyword(al)) {
    const e = t.pop().text;
    if (e !== n)
      throw new Error(`expected ${n}, got ${e}`);
  }
  return t.popType("ID");
}
function Ee(n, t) {
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
function fl(n) {
  let t = Ee(n, Vd);
  return Jo(t, Tt("constant payable nonpayable".split(" "))), Jo(t, Tt("pure view payable nonpayable".split(" "))), t.has("view") ? "view" : t.has("pure") ? "pure" : t.has("payable") ? "payable" : t.has("nonpayable") ? "nonpayable" : t.has("constant") ? "view" : "nonpayable";
}
function be(n, t) {
  return n.popParams().map((e) => q.from(e, t));
}
function hl(n) {
  if (n.peekType("AT")) {
    if (n.pop(), n.peekType("NUMBER"))
      return D(n.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function sn(n) {
  if (n.length)
    throw new Error(`unexpected tokens at offset ${n.offset}: ${n.toString()}`);
}
const qd = new RegExp(/^(.*)\[([0-9]*)\]$/);
function Zo(n) {
  const t = n.match(ul);
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
const st = {}, kt = Symbol.for("_ethers_internal"), Wo = "_ParamTypeInternal", jo = "_ErrorInternal", qo = "_EventInternal", Xo = "_ConstructorInternal", Yo = "_FallbackInternal", ta = "_FunctionInternal", ea = "_StructInternal";
class q {
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
    if (ar(t, st, "ParamType"), Object.defineProperty(this, kt, { value: Wo }), o && (o = Object.freeze(o.slice())), s === "array") {
      if (a == null || c == null)
        throw new Error("");
    } else if (a != null || c != null)
      throw new Error("");
    if (s === "tuple") {
      if (o == null)
        throw new Error("");
    } else if (o != null)
      throw new Error("");
    F(this, {
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
      a.forEach((c, l) => {
        o.#t(t, c, r, (u) => {
          a[l] = u;
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
      a.forEach((c, l) => {
        o[l].#t(t, c, r, (u) => {
          a[l] = u;
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
    if (q.isParamType(t))
      return t;
    if (typeof t == "string")
      try {
        return q.from(Le(t), e);
      } catch {
        g(!1, "invalid param type", "obj", t);
      }
    else if (t instanceof $t) {
      let a = "", c = "", l = null;
      Ee(t, Tt(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN") ? (c = "tuple", l = t.popParams().map((p) => q.from(p)), a = `tuple(${l.map((p) => p.format()).join(",")})`) : (a = Zo(t.popType("TYPE")), c = a);
      let u = null, f = null;
      for (; t.length && t.peekType("BRACKET"); ) {
        const p = t.pop();
        u = new q(st, "", a, c, null, l, f, u), f = p.value, a += p.text, c = "array", l = null;
      }
      let h = null;
      if (Ee(t, zd).has("indexed")) {
        if (!e)
          throw new Error("");
        h = !0;
      }
      const m = t.peekType("ID") ? t.pop().text : "";
      if (t.length)
        throw new Error("leftover tokens");
      return new q(st, m, a, c, h, l, f, u);
    }
    const r = t.name;
    g(!r || typeof r == "string" && r.match(ll), "invalid name", "obj.name", r);
    let s = t.indexed;
    s != null && (g(e, "parameter cannot be indexed", "obj.indexed", t.indexed), s = !!s);
    let i = t.type, o = i.match(qd);
    if (o) {
      const a = parseInt(o[2] || "-1"), c = q.from({
        type: o[1],
        components: t.components
      });
      return new q(st, r || "", i, "array", s, null, a, c);
    }
    if (i === "tuple" || i.startsWith(
      "tuple("
      /* fix: ) */
    ) || i.startsWith(
      "("
      /* fix: ) */
    )) {
      const a = t.components != null ? t.components.map((l) => q.from(l)) : null;
      return new q(st, r || "", i, "tuple", s, a, null, null);
    }
    return i = Zo(t.type), new q(st, r || "", i, i, s, null, null, null);
  }
  /**
   *  Returns true if %%value%% is a **ParamType**.
   */
  static isParamType(t) {
    return t && t[kt] === Wo;
  }
}
class on {
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
    ar(t, st, "Fragment"), r = Object.freeze(r.slice()), F(this, { type: e, inputs: r });
  }
  /**
   *  Creates a new **Fragment** for %%obj%%, wich can be any supported
   *  ABI frgament type.
   */
  static from(t) {
    if (typeof t == "string") {
      try {
        on.from(JSON.parse(t));
      } catch {
      }
      return on.from(Le(t));
    }
    if (t instanceof $t)
      switch (t.peekKeyword(al)) {
        case "constructor":
          return Ae.from(t);
        case "error":
          return Bt.from(t);
        case "event":
          return oe.from(t);
        case "fallback":
        case "receive":
          return de.from(t);
        case "function":
          return ae.from(t);
        case "struct":
          return je.from(t);
      }
    else if (typeof t == "object") {
      switch (t.type) {
        case "constructor":
          return Ae.from(t);
        case "error":
          return Bt.from(t);
        case "event":
          return oe.from(t);
        case "fallback":
        case "receive":
          return de.from(t);
        case "function":
          return ae.from(t);
        case "struct":
          return je.from(t);
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
    return Ae.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[ErrorFragment]].
   */
  static isError(t) {
    return Bt.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is an [[EventFragment]].
   */
  static isEvent(t) {
    return oe.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[FunctionFragment]].
   */
  static isFunction(t) {
    return ae.isFragment(t);
  }
  /**
   *  Returns true if %%value%% is a [[StructFragment]].
   */
  static isStruct(t) {
    return je.isFragment(t);
  }
}
class ss extends on {
  /**
   *  The name of the fragment.
   */
  name;
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    super(t, e, s), g(typeof r == "string" && r.match(ll), "invalid identifier", "name", r), s = Object.freeze(s.slice()), F(this, { name: r });
  }
}
function rr(n, t) {
  return "(" + t.map((e) => e.format(n)).join(n === "full" ? ", " : ",") + ")";
}
class Bt extends ss {
  /**
   *  @private
   */
  constructor(t, e, r) {
    super(t, "error", e, r), Object.defineProperty(this, kt, { value: jo });
  }
  /**
   *  The Custom Error selector.
   */
  get selector() {
    return rn(this.format("sighash")).substring(0, 10);
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
    return t !== "sighash" && e.push("error"), e.push(this.name + rr(t, this.inputs)), e.join(" ");
  }
  /**
   *  Returns a new **ErrorFragment** for %%obj%%.
   */
  static from(t) {
    if (Bt.isFragment(t))
      return t;
    if (typeof t == "string")
      return Bt.from(Le(t));
    if (t instanceof $t) {
      const e = rs("error", t), r = be(t);
      return sn(t), new Bt(st, e, r);
    }
    return new Bt(st, t.name, t.inputs ? t.inputs.map(q.from) : []);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **ErrorFragment**.
   */
  static isFragment(t) {
    return t && t[kt] === jo;
  }
}
class oe extends ss {
  /**
   *  Whether this event is anonymous.
   */
  anonymous;
  /**
   *  @private
   */
  constructor(t, e, r, s) {
    super(t, "event", e, r), Object.defineProperty(this, kt, { value: qo }), F(this, { anonymous: s });
  }
  /**
   *  The Event topic hash.
   */
  get topicHash() {
    return rn(this.format("sighash"));
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
    return t !== "sighash" && e.push("event"), e.push(this.name + rr(t, this.inputs)), t !== "sighash" && this.anonymous && e.push("anonymous"), e.join(" ");
  }
  /**
   *  Return the topic hash for an event with %%name%% and %%params%%.
   */
  static getTopicHash(t, e) {
    return e = (e || []).map((s) => q.from(s)), new oe(st, t, e, !1).topicHash;
  }
  /**
   *  Returns a new **EventFragment** for %%obj%%.
   */
  static from(t) {
    if (oe.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return oe.from(Le(t));
      } catch {
        g(!1, "invalid event fragment", "obj", t);
      }
    else if (t instanceof $t) {
      const e = rs("event", t), r = be(t, !0), s = !!Ee(t, Tt(["anonymous"])).has("anonymous");
      return sn(t), new oe(st, e, r, s);
    }
    return new oe(st, t.name, t.inputs ? t.inputs.map((e) => q.from(e, !0)) : [], !!t.anonymous);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is an
   *  **EventFragment**.
   */
  static isFragment(t) {
    return t && t[kt] === qo;
  }
}
class Ae extends on {
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
    super(t, e, r), Object.defineProperty(this, kt, { value: Xo }), F(this, { payable: s, gas: i });
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
    const e = [`constructor${rr(t, this.inputs)}`];
    return this.payable && e.push("payable"), this.gas != null && e.push(`@${this.gas.toString()}`), e.join(" ");
  }
  /**
   *  Returns a new **ConstructorFragment** for %%obj%%.
   */
  static from(t) {
    if (Ae.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return Ae.from(Le(t));
      } catch {
        g(!1, "invalid constuctor fragment", "obj", t);
      }
    else if (t instanceof $t) {
      Ee(t, Tt(["constructor"]));
      const e = be(t), r = !!Ee(t, Gd).has("payable"), s = hl(t);
      return sn(t), new Ae(st, "constructor", e, r, s);
    }
    return new Ae(st, "constructor", t.inputs ? t.inputs.map(q.from) : [], !!t.payable, t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **ConstructorFragment**.
   */
  static isFragment(t) {
    return t && t[kt] === Xo;
  }
}
class de extends on {
  /**
   *  If the function can be sent value during invocation.
   */
  payable;
  constructor(t, e, r) {
    super(t, "fallback", e), Object.defineProperty(this, kt, { value: Yo }), F(this, { payable: r });
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
    if (de.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return de.from(Le(t));
      } catch {
        g(!1, "invalid fallback fragment", "obj", t);
      }
    else if (t instanceof $t) {
      const e = t.toString(), r = t.peekKeyword(Tt(["fallback", "receive"]));
      if (g(r, "type must be fallback or receive", "obj", e), t.popKeyword(Tt(["fallback", "receive"])) === "receive") {
        const a = be(t);
        return g(a.length === 0, "receive cannot have arguments", "obj.inputs", a), Ee(t, Tt(["payable"])), sn(t), new de(st, [], !0);
      }
      let i = be(t);
      i.length ? g(i.length === 1 && i[0].type === "bytes", "invalid fallback inputs", "obj.inputs", i.map((a) => a.format("minimal")).join(", ")) : i = [q.from("bytes")];
      const o = fl(t);
      if (g(o === "nonpayable" || o === "payable", "fallback cannot be constants", "obj.stateMutability", o), Ee(t, Tt(["returns"])).has("returns")) {
        const a = be(t);
        g(a.length === 1 && a[0].type === "bytes", "invalid fallback outputs", "obj.outputs", a.map((c) => c.format("minimal")).join(", "));
      }
      return sn(t), new de(st, i, o === "payable");
    }
    if (t.type === "receive")
      return new de(st, [], !0);
    if (t.type === "fallback") {
      const e = [q.from("bytes")], r = t.stateMutability === "payable";
      return new de(st, e, r);
    }
    g(!1, "invalid fallback description", "obj", t);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FallbackFragment**.
   */
  static isFragment(t) {
    return t && t[kt] === Yo;
  }
}
class ae extends ss {
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
    super(t, "function", e, s), Object.defineProperty(this, kt, { value: ta }), i = Object.freeze(i.slice()), F(this, { constant: r === "view" || r === "pure", gas: o, outputs: i, payable: r === "payable", stateMutability: r });
  }
  /**
   *  The Function selector.
   */
  get selector() {
    return rn(this.format("sighash")).substring(0, 10);
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
    return t !== "sighash" && e.push("function"), e.push(this.name + rr(t, this.inputs)), t !== "sighash" && (this.stateMutability !== "nonpayable" && e.push(this.stateMutability), this.outputs && this.outputs.length && (e.push("returns"), e.push(rr(t, this.outputs))), this.gas != null && e.push(`@${this.gas.toString()}`)), e.join(" ");
  }
  /**
   *  Return the selector for a function with %%name%% and %%params%%.
   */
  static getSelector(t, e) {
    return e = (e || []).map((s) => q.from(s)), new ae(st, t, "view", e, [], null).selector;
  }
  /**
   *  Returns a new **FunctionFragment** for %%obj%%.
   */
  static from(t) {
    if (ae.isFragment(t))
      return t;
    if (typeof t == "string")
      try {
        return ae.from(Le(t));
      } catch {
        g(!1, "invalid function fragment", "obj", t);
      }
    else if (t instanceof $t) {
      const r = rs("function", t), s = be(t), i = fl(t);
      let o = [];
      Ee(t, Tt(["returns"])).has("returns") && (o = be(t));
      const a = hl(t);
      return sn(t), new ae(st, r, i, s, o, a);
    }
    let e = t.stateMutability;
    return e == null && (e = "payable", typeof t.constant == "boolean" ? (e = "view", t.constant || (e = "payable", typeof t.payable == "boolean" && !t.payable && (e = "nonpayable"))) : typeof t.payable == "boolean" && !t.payable && (e = "nonpayable")), new ae(st, t.name, e, t.inputs ? t.inputs.map(q.from) : [], t.outputs ? t.outputs.map(q.from) : [], t.gas != null ? t.gas : null);
  }
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **FunctionFragment**.
   */
  static isFragment(t) {
    return t && t[kt] === ta;
  }
}
class je extends ss {
  /**
   *  @private
   */
  constructor(t, e, r) {
    super(t, "struct", e, r), Object.defineProperty(this, kt, { value: ea });
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
        return je.from(Le(t));
      } catch {
        g(!1, "invalid struct fragment", "obj", t);
      }
    else if (t instanceof $t) {
      const e = rs("struct", t), r = be(t);
      return sn(t), new je(st, e, r);
    }
    return new je(st, t.name, t.inputs ? t.inputs.map(q.from) : []);
  }
  // @TODO: fix this return type
  /**
   *  Returns ``true`` and provides a type guard if %%value%% is a
   *  **StructFragment**.
   */
  static isFragment(t) {
    return t && t[kt] === ea;
  }
}
const ee = /* @__PURE__ */ new Map();
ee.set(0, "GENERIC_PANIC");
ee.set(1, "ASSERT_FALSE");
ee.set(17, "OVERFLOW");
ee.set(18, "DIVIDE_BY_ZERO");
ee.set(33, "ENUM_RANGE_ERROR");
ee.set(34, "BAD_STORAGE_DATA");
ee.set(49, "STACK_UNDERFLOW");
ee.set(50, "ARRAY_RANGE_ERROR");
ee.set(65, "OUT_OF_MEMORY");
ee.set(81, "UNINITIALIZED_FUNCTION_CALL");
const Xd = new RegExp(/^bytes([0-9]*)$/), Yd = new RegExp(/^(u?int)([0-9]*)$/);
let Cs = null, na = 1024;
function tp(n, t, e, r) {
  let s = "missing revert data", i = null;
  const o = null;
  let a = null;
  if (e) {
    s = "execution reverted";
    const l = V(e);
    if (e = U(e), l.length === 0)
      s += " (no data present; likely require(false) occurred", i = "require(false)";
    else if (l.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (U(l.slice(0, 4)) === "0x08c379a0")
      try {
        i = r.decode(["string"], l.slice(4))[0], a = {
          signature: "Error(string)",
          name: "Error",
          args: [i]
        }, s += `: ${JSON.stringify(i)}`;
      } catch {
        s += " (could not decode reason; invalid string data)";
      }
    else if (U(l.slice(0, 4)) === "0x4e487b71")
      try {
        const u = Number(r.decode(["uint256"], l.slice(4))[0]);
        a = {
          signature: "Panic(uint256)",
          name: "Panic",
          args: [u]
        }, i = `Panic due to ${ee.get(u) || "UNKNOWN"}(${u})`, s += `: ${i}`;
      } catch {
        s += " (could not decode panic code)";
      }
    else
      s += " (unknown custom error)";
  }
  const c = {
    to: t.to ? j(t.to) : null,
    data: t.data || "0x"
  };
  return t.from && (c.from = j(t.from)), ot(s, "CALL_EXCEPTION", {
    action: n,
    data: e,
    reason: i,
    transaction: c,
    invocation: o,
    revert: a
  });
}
class De {
  #t(t) {
    if (t.isArray())
      return new mh(this.#t(t.arrayChildren), t.arrayLength, t.name);
    if (t.isTuple())
      return new Er(t.components.map((r) => this.#t(r)), t.name);
    switch (t.baseType) {
      case "address":
        return new yh(t.name);
      case "bool":
        return new Ah(t.name);
      case "string":
        return new Ch(t.name);
      case "bytes":
        return new bh(t.name);
      case "":
        return new Ih(t.name);
    }
    let e = t.type.match(Yd);
    if (e) {
      let r = parseInt(e[2] || "256");
      return g(r !== 0 && r <= 256 && r % 8 === 0, "invalid " + e[1] + " bit length", "param", t), new Th(r / 8, e[1] === "int", t.name);
    }
    if (e = t.type.match(Xd), e) {
      let r = parseInt(e[1]);
      return g(r !== 0 && r <= 32, "invalid bytes length", "param", t), new Eh(r, t.name);
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
    const e = t.map((s) => this.#t(q.from(s)));
    return new Er(e, "_").defaultValue();
  }
  /**
   *  Encode the %%values%% as the %%types%% into ABI data.
   *
   *  @returns DataHexstring
   */
  encode(t, e) {
    Va(e.length, t.length, "types/values length mismatch");
    const r = t.map((o) => this.#t(q.from(o))), s = new Er(r, "_"), i = new Ws();
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
    const s = t.map((o) => this.#t(q.from(o)));
    return new Er(s, "_").decode(new vi(e, r, na));
  }
  static _setDefaultMaxInflation(t) {
    g(typeof t == "number" && Number.isInteger(t), "invalid defaultMaxInflation factor", "value", t), na = t;
  }
  /**
   *  Returns the shared singleton instance of a default [[AbiCoder]].
   *
   *  On the first call, the instance is created internally.
   */
  static defaultAbiCoder() {
    return Cs == null && (Cs = new De()), Cs;
  }
  /**
   *  Returns an ethers-compatible [[CallExceptionError]] Error for the given
   *  result %%data%% for the [[CallExceptionAction]] %%action%% against
   *  the Transaction %%tx%%.
   */
  static getBuiltinCallException(t, e, r) {
    return tp(t, e, r, De.defaultAbiCoder());
  }
}
function Ir(n) {
  const t = Rt(n);
  if (t.length > 31)
    throw new Error("bytes32 string must be less than 32 bytes");
  return Ni(t, 32);
}
class ep {
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
    F(this, {
      fragment: t,
      name: s,
      signature: i,
      topic: e,
      args: r
    });
  }
}
class np {
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
    F(this, {
      fragment: t,
      name: i,
      args: r,
      signature: o,
      selector: e,
      value: s
    });
  }
}
class rp {
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
    F(this, {
      fragment: t,
      name: s,
      args: r,
      signature: i,
      selector: e
    });
  }
}
class ra {
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
    F(this, { hash: t, _isIndexed: !0 });
  }
}
const sa = {
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
}, ia = {
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
      return n >= 0 && n <= 255 && sa[n.toString()] && (t = sa[n.toString()]), `reverted with panic code 0x${n.toString(16)} (${t})`;
    }
  }
};
class _t {
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
        r.push(on.from(o));
      } catch (a) {
        console.log(`[Warning] Invalid Fragment ${JSON.stringify(o)}:`, a.message);
      }
    F(this, {
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
          F(this, { deploy: o });
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
      const l = o.format();
      c.has(l) || c.set(l, o);
    }), this.deploy || F(this, {
      deploy: Ae.from("constructor()")
    }), F(this, { fallback: s, receive: i });
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
    return De.defaultAbiCoder();
  }
  // Find a function definition by any means necessary (unless it is ambiguous)
  #s(t, e, r) {
    if (X(t)) {
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
        ct.isTyped(o) && o.type === "overrides" && (c = !1, a--);
        for (let l = i.length - 1; l >= 0; l--) {
          const u = i[l].inputs.length;
          u !== a && (!c || u !== a - 1) && i.splice(l, 1);
        }
        for (let l = i.length - 1; l >= 0; l--) {
          const u = i[l].inputs;
          for (let f = 0; f < e.length; f++)
            if (ct.isTyped(e[f])) {
              if (f >= u.length) {
                if (e[f].type === "overrides")
                  continue;
                i.splice(l, 1);
                break;
              }
              if (e[f].type !== u[f].baseType) {
                i.splice(l, 1);
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
    const s = this.#n.get(ae.from(t).format());
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
    if (X(t)) {
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
            if (ct.isTyped(e[c]) && e[c].type !== a[c].baseType) {
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
    const s = this.#e.get(oe.from(t).format());
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
    if (X(t)) {
      const s = t.toLowerCase();
      if (ia[s])
        return Bt.from(ia[s].signature);
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
        return t === "Error" ? Bt.from("error Error(string)") : t === "Panic" ? Bt.from("error Panic(uint256)") : null;
      if (s.length > 1) {
        const i = s.map((o) => JSON.stringify(o.format())).join(", ");
        g(!1, `ambiguous error description (i.e. ${i})`, "name", t);
      }
      return s[0];
    }
    if (t = Bt.from(t).format(), t === "Error(string)")
      return Bt.from("error Error(string)");
    if (t === "Panic(uint256)")
      return Bt.from("error Panic(uint256)");
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
    return g(at(e, 0, 4) === t.selector, `data signature does not match error ${t.name}.`, "data", e), this._decodeParams(t.inputs, at(e, 4));
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
    return tt([
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
    return g(at(e, 0, 4) === t.selector, `data signature does not match function ${t.name}.`, "data", e), this._decodeParams(t.inputs, at(e, 4));
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
    return tt([
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
    const s = Nt(e);
    if (s.length % 32 === 0)
      try {
        return this.#r.decode(t.outputs, s);
      } catch {
        r = "could not decode result data";
      }
    I(!1, r, "BAD_DATA", {
      value: U(s),
      info: { method: t.name, signature: t.format() }
    });
  }
  makeError(t, e) {
    const r = V(t, "data"), s = De.getBuiltinCallException("call", e, r);
    if (s.message.startsWith("execution reverted (unknown custom error)")) {
      const a = U(r.slice(0, 4)), c = this.getError(a);
      if (c)
        try {
          const l = this.#r.decode(c.inputs, r.slice(4));
          s.revert = {
            name: c.name,
            signature: c.format(),
            args: l
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
    return U(this.#r.encode(t.outputs, e || []));
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
    const s = (i, o) => i.type === "string" ? rn(o) : i.type === "bytes" ? it(U(o)) : (i.type === "bool" && typeof o == "boolean" ? o = o ? "0x01" : "0x00" : i.type.match(/^u?int/) ? o = ke(o) : i.type.match(/^bytes/) ? o = Ni(o, 32) : i.type === "address" && this.#r.encode(["address"], [o]), ce(U(o), 32));
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
          r.push(rn(c));
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
      g(X(r[0], 32) && r[0].toLowerCase() === y, "fragment/topic mismatch", "topics[0]", r[0]), r = r.slice(1);
    }
    const s = [], i = [], o = [];
    t.inputs.forEach((y, m) => {
      y.indexed ? y.type === "string" || y.type === "bytes" || y.baseType === "tuple" || y.baseType === "array" ? (s.push(q.from({ type: "bytes32", name: y.name })), o.push(!0)) : (s.push(y), o.push(!1)) : (i.push(y), o.push(!1));
    });
    const a = r != null ? this.#r.decode(s, tt(r)) : null, c = this.#r.decode(i, e, !0), l = [], u = [];
    let f = 0, h = 0;
    return t.inputs.forEach((y, m) => {
      let p = null;
      if (y.indexed)
        if (a == null)
          p = new ra(null);
        else if (o[m])
          p = new ra(a[h++]);
        else
          try {
            p = a[h++];
          } catch (d) {
            p = d;
          }
      else
        try {
          p = c[f++];
        } catch (d) {
          p = d;
        }
      l.push(p), u.push(y.name || null);
    }), me.fromItems(l, u);
  }
  /**
   *  Parses a transaction, finding the matching function and extracts
   *  the parameter values along with other useful function details.
   *
   *  If the matching function cannot be found, return null.
   */
  parseTransaction(t) {
    const e = V(t.data, "tx.data"), r = D(t.value != null ? t.value : 0, "tx.value"), s = this.getFunction(U(e.slice(0, 4)));
    if (!s)
      return null;
    const i = this.#r.decode(s.inputs, e.slice(4));
    return new np(s, s.selector, i, r);
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
    return !e || e.anonymous ? null : new ep(e, e.topicHash, this.decodeEventLog(e, t.data, t.topics));
  }
  /**
   *  Parses a revert data, finding the matching error and extracts
   *  the parameter values along with other useful error details.
   *
   *  If the matching error cannot be found, returns null.
   */
  parseError(t) {
    const e = U(t), r = this.getError(at(e, 0, 4));
    if (!r)
      return null;
    const s = this.#r.decode(r.inputs, at(e, 4));
    return new rp(r, r.selector, s);
  }
  /**
   *  Creates a new [[Interface]] from the ABI %%value%%.
   *
   *  The %%value%% may be provided as an existing [[Interface]] object,
   *  a JSON-encoded ABI or any Human-Readable ABI format.
   */
  static from(t) {
    return t instanceof _t ? t : typeof t == "string" ? new _t(JSON.parse(t)) : typeof t.formatJson == "function" ? new _t(t.formatJson()) : typeof t.format == "function" ? new _t(t.format("json")) : new _t(t);
  }
}
const dl = BigInt(0);
function Nn(n) {
  return n ?? null;
}
function lt(n) {
  return n == null ? null : n.toString();
}
class oa {
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
    F(this, {
      gasPrice: Nn(t),
      maxFeePerGas: Nn(e),
      maxPriorityFeePerGas: Nn(r)
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  toJSON() {
    const { gasPrice: t, maxFeePerGas: e, maxPriorityFeePerGas: r } = this;
    return {
      _type: "FeeData",
      gasPrice: lt(t),
      maxFeePerGas: lt(e),
      maxPriorityFeePerGas: lt(r)
    };
  }
}
function Qr(n) {
  const t = {};
  n.to && (t.to = n.to), n.from && (t.from = n.from), n.data && (t.data = U(n.data));
  const e = "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(/,/);
  for (const s of e)
    !(s in n) || n[s] == null || (t[s] = D(n[s], `request.${s}`));
  const r = "type,nonce".split(/,/);
  for (const s of r)
    !(s in n) || n[s] == null || (t[s] = Q(n[s], `request.${s}`));
  return n.accessList && (t.accessList = fn(n.accessList)), "blockTag" in n && (t.blockTag = n.blockTag), "enableCcipRead" in n && (t.enableCcipRead = !!n.enableCcipRead), "customData" in n && (t.customData = n.customData), "blobVersionedHashes" in n && n.blobVersionedHashes && (t.blobVersionedHashes = n.blobVersionedHashes.slice()), "kzg" in n && (t.kzg = n.kzg), "blobs" in n && n.blobs && (t.blobs = n.blobs.map((s) => Ii(s) ? U(s) : Object.assign({}, s))), t;
}
class sp {
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
    this.#t = t.transactions.map((r) => typeof r != "string" ? new fr(r, e) : r), F(this, {
      provider: e,
      hash: Nn(t.hash),
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
      prevRandao: Nn(t.prevRandao),
      extraData: t.extraData,
      baseFeePerGas: Nn(t.baseFeePerGas),
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
    const { baseFeePerGas: t, difficulty: e, extraData: r, gasLimit: s, gasUsed: i, hash: o, miner: a, prevRandao: c, nonce: l, number: u, parentHash: f, parentBeaconBlockRoot: h, stateRoot: y, receiptsRoot: m, timestamp: p, transactions: d } = this;
    return {
      _type: "Block",
      baseFeePerGas: lt(t),
      difficulty: lt(e),
      extraData: r,
      gasLimit: lt(s),
      gasUsed: lt(i),
      blobGasUsed: lt(this.blobGasUsed),
      excessBlobGas: lt(this.excessBlobGas),
      hash: o,
      miner: a,
      prevRandao: c,
      nonce: l,
      number: u,
      parentHash: f,
      timestamp: p,
      parentBeaconBlockRoot: h,
      stateRoot: y,
      receiptsRoot: m,
      transactions: d
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
          if (s.hash !== r)
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
    return ip(this);
  }
}
class ur {
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
    F(this, {
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
    const { address: t, blockHash: e, blockNumber: r, data: s, index: i, removed: o, topics: a, transactionHash: c, transactionIndex: l } = this;
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
      transactionIndex: l
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
    return op(this);
  }
}
class pl {
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
    this.#t = Object.freeze(t.logs.map((s) => new ur(s, e)));
    let r = dl;
    t.effectiveGasPrice != null ? r = t.effectiveGasPrice : t.gasPrice != null && (r = t.gasPrice), F(this, {
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
      logs: l,
      //byzantium, 
      status: u,
      root: f
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: o,
      blockNumber: a,
      //byzantium, 
      contractAddress: r,
      cumulativeGasUsed: lt(this.cumulativeGasUsed),
      from: e,
      gasPrice: lt(this.gasPrice),
      blobGasUsed: lt(this.blobGasUsed),
      blobGasPrice: lt(this.blobGasPrice),
      gasUsed: lt(this.gasUsed),
      hash: s,
      index: i,
      logs: l,
      logsBloom: c,
      root: f,
      status: u,
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
    return yl(this);
  }
  /**
   *  @_ignore:
   */
  reorderedEvent(t) {
    return I(!t || t.isMined(), "unmined 'other' transction cannot be orphaned", "UNSUPPORTED_OPERATION", { operation: "reorderedEvent(other)" }), gl(this, t);
  }
}
class fr {
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
    const { blockNumber: t, blockHash: e, index: r, hash: s, type: i, to: o, from: a, nonce: c, data: l, signature: u, accessList: f, blobVersionedHashes: h } = this;
    return {
      _type: "TransactionResponse",
      accessList: f,
      blockNumber: t,
      blockHash: e,
      blobVersionedHashes: h,
      chainId: lt(this.chainId),
      data: l,
      from: a,
      gasLimit: lt(this.gasLimit),
      gasPrice: lt(this.gasPrice),
      hash: s,
      maxFeePerGas: lt(this.maxFeePerGas),
      maxPriorityFeePerGas: lt(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: lt(this.maxFeePerBlobGas),
      nonce: c,
      signature: u,
      to: o,
      index: r,
      type: i,
      value: lt(this.value)
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
      const { tx: e, blockNumber: r } = await It({
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
      const { blockNumber: h, nonce: y } = await It({
        blockNumber: this.provider.getBlockNumber(),
        nonce: this.provider.getTransactionCount(this.from)
      });
      if (y < this.nonce) {
        i = h;
        return;
      }
      if (a)
        return null;
      const m = await this.getTransaction();
      if (!(m && m.blockNumber != null))
        for (o === -1 && (o = i - 3, o < this.#t && (o = this.#t)); o <= h; ) {
          if (a)
            return null;
          const p = await this.provider.getBlock(o, !0);
          if (p == null)
            return;
          for (const d of p)
            if (d === this.hash)
              return;
          for (let d = 0; d < p.length; d++) {
            const w = await p.getTransaction(d);
            if (w.from === this.from && w.nonce === this.nonce) {
              if (a)
                return null;
              const x = await this.provider.getTransactionReceipt(w.hash);
              if (x == null || h - x.blockNumber + 1 < r)
                return;
              let b = "replaced";
              w.data === this.data && w.to === this.to && w.value === this.value ? b = "repriced" : w.data === "0x" && w.from === w.to && w.value === dl && (b = "cancelled"), I(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                cancelled: b === "replaced" || b === "cancelled",
                reason: b,
                replacement: w.replaceableTransaction(i),
                hash: w.hash,
                receipt: x
              });
            }
          }
          o++;
        }
    }, l = (h) => {
      if (h == null || h.status !== 0)
        return h;
      I(!1, "transaction execution reverted", "CALL_EXCEPTION", {
        action: "sendTransaction",
        data: null,
        reason: null,
        invocation: null,
        revert: null,
        transaction: {
          to: h.to,
          from: h.from,
          data: ""
          // @TODO: in v7, split out sendTransaction properties
        },
        receipt: h
      });
    }, u = await this.provider.getTransactionReceipt(this.hash);
    if (r === 0)
      return l(u);
    if (u) {
      if (await u.confirmations() >= r)
        return l(u);
    } else if (await c(), r === 0)
      return null;
    return await new Promise((h, y) => {
      const m = [], p = () => {
        m.forEach((w) => w());
      };
      if (m.push(() => {
        a = !0;
      }), s > 0) {
        const w = setTimeout(() => {
          p(), y(ot("wait for transaction timeout", "TIMEOUT"));
        }, s);
        m.push(() => {
          clearTimeout(w);
        });
      }
      const d = async (w) => {
        if (await w.confirmations() >= r) {
          p();
          try {
            h(l(w));
          } catch (x) {
            y(x);
          }
        }
      };
      if (m.push(() => {
        this.provider.off(this.hash, d);
      }), this.provider.on(this.hash, d), i >= 0) {
        const w = async () => {
          try {
            await c();
          } catch (x) {
            if (Et(x, "TRANSACTION_REPLACED")) {
              p(), y(x);
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
    return I(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), yl(this);
  }
  /**
   *  Returns a filter which can be used to listen for orphan events
   *  that re-order this event against %%other%%.
   */
  reorderedEvent(t) {
    return I(this.isMined(), "unmined transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), I(!t || t.isMined(), "unmined 'other' transaction canot be orphaned", "UNSUPPORTED_OPERATION", { operation: "removeEvent()" }), gl(this, t);
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
    const e = new fr(this, this.provider);
    return e.#t = t, e;
  }
}
function ip(n) {
  return { orphan: "drop-block", hash: n.hash, number: n.number };
}
function gl(n, t) {
  return { orphan: "reorder-transaction", tx: n, other: t };
}
function yl(n) {
  return { orphan: "drop-transaction", tx: n };
}
function op(n) {
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
class Gi extends ur {
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
    F(this, { args: s, fragment: r, interface: e });
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
class wl extends ur {
  /**
   *  The error encounted when trying to decode the log.
   */
  error;
  /**
   * @_ignore:
   */
  constructor(t, e) {
    super(t, t.provider), F(this, { error: e });
  }
}
class ap extends pl {
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
          return new Gi(t, this.#t, e);
        } catch (r) {
          return new wl(t, r);
        }
      return t;
    });
  }
}
class Vi extends fr {
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
    return r == null ? null : new ap(this.#t, this.provider, r);
  }
}
class ml extends $a {
  /**
   *  The log with no matching events.
   */
  log;
  /**
   *  @_event:
   */
  constructor(t, e, r, s) {
    super(t, e, r), F(this, { log: s });
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
class cp extends ml {
  /**
   *  @_ignore:
   */
  constructor(t, e, r, s, i) {
    super(t, e, r, new Gi(i, t.interface, s));
    const o = t.interface.decodeEventLog(s, this.log.data, this.log.topics);
    F(this, { args: o, fragment: s });
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
const aa = BigInt(0);
function Al(n) {
  return n && typeof n.call == "function";
}
function bl(n) {
  return n && typeof n.estimateGas == "function";
}
function is(n) {
  return n && typeof n.resolveName == "function";
}
function El(n) {
  return n && typeof n.sendTransaction == "function";
}
function xl(n) {
  if (n != null) {
    if (is(n))
      return n;
    if (n.provider)
      return n.provider;
  }
}
class lp {
  #t;
  fragment;
  constructor(t, e, r) {
    if (F(this, { fragment: e }), e.inputs.length < r.length)
      throw new Error("too many arguments");
    const s = an(t.runner, "resolveName"), i = is(s) ? s : null;
    this.#t = async function() {
      const o = await Promise.all(e.inputs.map((a, c) => r[c] == null ? null : a.walkAsync(r[c], (u, f) => u === "address" ? Array.isArray(f) ? Promise.all(f.map((h) => vt(h, i))) : vt(f, i) : f)));
      return t.interface.encodeFilterTopics(e, o);
    }();
  }
  getTopicFilter() {
    return this.#t;
  }
}
function an(n, t) {
  return n == null ? null : typeof n[t] == "function" ? n : n.provider && typeof n.provider[t] == "function" ? n.provider : null;
}
function Ke(n) {
  return n == null ? null : n.provider || null;
}
async function Il(n, t) {
  const e = ct.dereference(n, "overrides");
  g(typeof e == "object", "invalid overrides parameter", "overrides", n);
  const r = Qr(e);
  return g(r.to == null || (t || []).indexOf("to") >= 0, "cannot override to", "overrides.to", r.to), g(r.data == null || (t || []).indexOf("data") >= 0, "cannot override data", "overrides.data", r.data), r.from && (r.from = r.from), r;
}
async function up(n, t, e) {
  const r = an(n, "resolveName"), s = is(r) ? r : null;
  return await Promise.all(t.map((i, o) => i.walkAsync(e[o], (a, c) => (c = ct.dereference(c, a), a === "address" ? vt(c, s) : c))));
}
function fp(n) {
  const t = async function(o) {
    const a = await Il(o, ["data"]);
    a.to = await n.getAddress(), a.from && (a.from = await vt(a.from, xl(n.runner)));
    const c = n.interface, l = D(a.value || aa, "overrides.value") === aa, u = (a.data || "0x") === "0x";
    c.fallback && !c.fallback.payable && c.receive && !u && !l && g(!1, "cannot send data to receive or send value to non-payable fallback", "overrides", o), g(c.fallback || u, "cannot send data to receive-only contract", "overrides.data", a.data);
    const f = c.receive || c.fallback && c.fallback.payable;
    return g(f || l, "cannot send value to non-payable fallback", "overrides.value", a.value), g(c.fallback || u, "cannot send data to receive-only contract", "overrides.data", a.data), a;
  }, e = async function(o) {
    const a = an(n.runner, "call");
    I(Al(a), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const c = await t(o);
    try {
      return await a.call(c);
    } catch (l) {
      throw xi(l) && l.data ? n.interface.makeError(l.data, c) : l;
    }
  }, r = async function(o) {
    const a = n.runner;
    I(El(a), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const c = await a.sendTransaction(await t(o)), l = Ke(n.runner);
    return new Vi(n.interface, l, c);
  }, s = async function(o) {
    const a = an(n.runner, "estimateGas");
    return I(bl(a), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await a.estimateGas(await t(o));
  }, i = async (o) => await r(o);
  return F(i, {
    _contract: n,
    estimateGas: s,
    populateTransaction: t,
    send: r,
    staticCall: e
  }), i;
}
function hp(n, t) {
  const e = function(...l) {
    const u = n.interface.getFunction(t, l);
    return I(u, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: l }
    }), u;
  }, r = async function(...l) {
    const u = e(...l);
    let f = {};
    if (u.inputs.length + 1 === l.length && (f = await Il(l.pop()), f.from && (f.from = await vt(f.from, xl(n.runner)))), u.inputs.length !== l.length)
      throw new Error("internal error: fragment inputs doesn't match arguments; should not happen");
    const h = await up(n.runner, u.inputs, l);
    return Object.assign({}, f, await It({
      to: n.getAddress(),
      data: n.interface.encodeFunctionData(u, h)
    }));
  }, s = async function(...l) {
    const u = await a(...l);
    return u.length === 1 ? u[0] : u;
  }, i = async function(...l) {
    const u = n.runner;
    I(El(u), "contract runner does not support sending transactions", "UNSUPPORTED_OPERATION", { operation: "sendTransaction" });
    const f = await u.sendTransaction(await r(...l)), h = Ke(n.runner);
    return new Vi(n.interface, h, f);
  }, o = async function(...l) {
    const u = an(n.runner, "estimateGas");
    return I(bl(u), "contract runner does not support gas estimation", "UNSUPPORTED_OPERATION", { operation: "estimateGas" }), await u.estimateGas(await r(...l));
  }, a = async function(...l) {
    const u = an(n.runner, "call");
    I(Al(u), "contract runner does not support calling", "UNSUPPORTED_OPERATION", { operation: "call" });
    const f = await r(...l);
    let h = "0x";
    try {
      h = await u.call(f);
    } catch (m) {
      throw xi(m) && m.data ? n.interface.makeError(m.data, f) : m;
    }
    const y = e(...l);
    return n.interface.decodeFunctionResult(y, h);
  }, c = async (...l) => e(...l).constant ? await s(...l) : await i(...l);
  return F(c, {
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
      const l = n.interface.getFunction(t);
      return I(l, "no matching fragment", "UNSUPPORTED_OPERATION", {
        operation: "fragment",
        info: { key: t }
      }), l;
    }
  }), c;
}
function dp(n, t) {
  const e = function(...s) {
    const i = n.interface.getEvent(t, s);
    return I(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
      operation: "fragment",
      info: { key: t, args: s }
    }), i;
  }, r = function(...s) {
    return new lp(n, e(...s), s);
  };
  return F(r, {
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
const $r = Symbol.for("_ethersInternal_contract"), Nl = /* @__PURE__ */ new WeakMap();
function pp(n, t) {
  Nl.set(n[$r], t);
}
function Lt(n) {
  return Nl.get(n[$r]);
}
function gp(n) {
  return n && typeof n == "object" && "getTopicFilter" in n && typeof n.getTopicFilter == "function" && n.fragment;
}
async function zi(n, t) {
  let e, r = null;
  if (Array.isArray(t)) {
    const i = function(o) {
      if (X(o, 32))
        return o;
      const a = n.interface.getEvent(o);
      return g(a, "unknown fragment", "name", o), a.topicHash;
    };
    e = t.map((o) => o == null ? null : Array.isArray(o) ? o.map(i) : i(o));
  } else t === "*" ? e = [null] : typeof t == "string" ? X(t, 32) ? e = [t] : (r = n.interface.getEvent(t), g(r, "unknown fragment", "event", t), e = [r.topicHash]) : gp(t) ? e = await t.getTopicFilter() : "fragment" in t ? (r = t.fragment, e = [r.topicHash]) : g(!1, "unknown event name", "event", t);
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
async function Zn(n, t) {
  const { subs: e } = Lt(n);
  return e.get((await zi(n, t)).tag) || null;
}
async function ca(n, t, e) {
  const r = Ke(n.runner);
  I(r, "contract runner does not support subscribing", "UNSUPPORTED_OPERATION", { operation: t });
  const { fragment: s, tag: i, topics: o } = await zi(n, e), { addr: a, subs: c } = Lt(n);
  let l = c.get(i);
  if (!l) {
    const f = { address: a || n, topics: o }, h = (d) => {
      let w = s;
      if (w == null)
        try {
          w = n.interface.getEvent(d.topics[0]);
        } catch {
        }
      if (w) {
        const x = w, b = s ? n.interface.decodeEventLog(s, d.data, d.topics) : [];
        ci(n, e, b, (C) => new cp(n, C, e, x, d));
      } else
        ci(n, e, [], (x) => new ml(n, x, e, d));
    };
    let y = [];
    l = { tag: i, listeners: [], start: () => {
      y.length || y.push(r.on(f, h));
    }, stop: async () => {
      if (y.length == 0)
        return;
      let d = y;
      y = [], await Promise.all(d), r.off(f, h);
    } }, c.set(i, l);
  }
  return l;
}
let ai = Promise.resolve();
async function yp(n, t, e, r) {
  await ai;
  const s = await Zn(n, t);
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
  }), s.listeners.length === 0 && (s.stop(), Lt(n).subs.delete(s.tag)), i > 0;
}
async function ci(n, t, e, r) {
  try {
    await ai;
  } catch {
  }
  const s = yp(n, t, e, r);
  return ai = s, await s;
}
const Nr = ["then"];
class jn {
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
  [$r];
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
    g(typeof t == "string" || Sc(t), "invalid value for Contract target", "target", t), r == null && (r = null);
    const i = _t.from(e);
    F(this, { target: t, runner: r, interface: i }), Object.defineProperty(this, $r, { value: {} });
    let o, a = null, c = null;
    if (s) {
      const f = Ke(r);
      c = new Vi(this.interface, f, s);
    }
    let l = /* @__PURE__ */ new Map();
    if (typeof t == "string")
      if (X(t))
        a = t, o = Promise.resolve(t);
      else {
        const f = an(r, "resolveName");
        if (!is(f))
          throw ot("contract runner does not support name resolution", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
          });
        o = f.resolveName(t).then((h) => {
          if (h == null)
            throw ot("an ENS name used for a contract target must be correctly configured", "UNCONFIGURED_NAME", {
              value: t
            });
          return Lt(this).addr = h, h;
        });
      }
    else
      o = t.getAddress().then((f) => {
        if (f == null)
          throw new Error("TODO");
        return Lt(this).addr = f, f;
      });
    pp(this, { addrPromise: o, addr: a, deployTx: c, subs: l });
    const u = new Proxy({}, {
      get: (f, h, y) => {
        if (typeof h == "symbol" || Nr.indexOf(h) >= 0)
          return Reflect.get(f, h, y);
        try {
          return this.getEvent(h);
        } catch (m) {
          if (!Et(m, "INVALID_ARGUMENT") || m.argument !== "key")
            throw m;
        }
      },
      has: (f, h) => Nr.indexOf(h) >= 0 ? Reflect.has(f, h) : Reflect.has(f, h) || this.interface.hasEvent(String(h))
    });
    return F(this, { filters: u }), F(this, {
      fallback: i.receive || i.fallback ? fp(this) : null
    }), new Proxy(this, {
      get: (f, h, y) => {
        if (typeof h == "symbol" || h in f || Nr.indexOf(h) >= 0)
          return Reflect.get(f, h, y);
        try {
          return f.getFunction(h);
        } catch (m) {
          if (!Et(m, "INVALID_ARGUMENT") || m.argument !== "key")
            throw m;
        }
      },
      has: (f, h) => typeof h == "symbol" || h in f || Nr.indexOf(h) >= 0 ? Reflect.has(f, h) : f.interface.hasFunction(h)
    });
  }
  /**
   *  Return a new Contract instance with the same target and ABI, but
   *  a different %%runner%%.
   */
  connect(t) {
    return new jn(this.target, this.interface, t);
  }
  /**
   *  Return a new Contract instance with the same ABI and runner, but
   *  a different %%target%%.
   */
  attach(t) {
    return new jn(t, this.interface, this.runner);
  }
  /**
   *  Return the resolved address of this Contract.
   */
  async getAddress() {
    return await Lt(this).addrPromise;
  }
  /**
   *  Return the deployed bytecode or null if no bytecode is found.
   */
  async getDeployedCode() {
    const t = Ke(this.runner);
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
    const r = Ke(this.runner);
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
    return Lt(this).deployTx;
  }
  /**
   *  Return the function for a given name. This is useful when a contract
   *  method name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getFunction(t) {
    return typeof t != "string" && (t = t.format()), hp(this, t);
  }
  /**
   *  Return the event for a given name. This is useful when a contract
   *  event name conflicts with a JavaScript name such as ``prototype`` or
   *  when using a Contract programatically.
   */
  getEvent(t) {
    return typeof t != "string" && (t = t.format()), dp(this, t);
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
    const { addr: s, addrPromise: i } = Lt(this), o = s || await i, { fragment: a, topics: c } = await zi(this, t), l = { address: o, topics: c, fromBlock: e, toBlock: r }, u = Ke(this.runner);
    return I(u, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", { operation: "queryFilter" }), (await u.getLogs(l)).map((f) => {
      let h = a;
      if (h == null)
        try {
          h = this.interface.getEvent(f.topics[0]);
        } catch {
        }
      if (h)
        try {
          return new Gi(f, this.interface, h);
        } catch (y) {
          return new wl(f, y);
        }
      return new ur(f, u);
    });
  }
  /**
   *  Add an event %%listener%% for the %%event%%.
   */
  async on(t, e) {
    const r = await ca(this, "on", t);
    return r.listeners.push({ listener: e, once: !1 }), r.start(), this;
  }
  /**
   *  Add an event %%listener%% for the %%event%%, but remove the listener
   *  after it is fired once.
   */
  async once(t, e) {
    const r = await ca(this, "once", t);
    return r.listeners.push({ listener: e, once: !0 }), r.start(), this;
  }
  /**
   *  Emit an %%event%% calling all listeners with %%args%%.
   *
   *  Resolves to ``true`` if any listeners were called.
   */
  async emit(t, ...e) {
    return await ci(this, t, e, null);
  }
  /**
   *  Resolves to the number of listeners of %%event%% or the total number
   *  of listeners if unspecified.
   */
  async listenerCount(t) {
    if (t) {
      const s = await Zn(this, t);
      return s ? s.listeners.length : 0;
    }
    const { subs: e } = Lt(this);
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
      const s = await Zn(this, t);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: e } = Lt(this);
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
    const r = await Zn(this, t);
    if (!r)
      return this;
    if (e) {
      const s = r.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && r.listeners.splice(s, 1);
    }
    return (e == null || r.listeners.length === 0) && (r.stop(), Lt(this).subs.delete(r.tag)), this;
  }
  /**
   *  Remove all the listeners for %%event%% or remove all listeners if
   *  unspecified.
   */
  async removeAllListeners(t) {
    if (t) {
      const e = await Zn(this, t);
      if (!e)
        return this;
      e.stop(), Lt(this).subs.delete(e.tag);
    } else {
      const { subs: e } = Lt(this);
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
    class e extends jn {
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
function wp() {
  return jn;
}
class qe extends wp() {
}
function Os(n) {
  return n.match(/^ipfs:\/\/ipfs\//i) ? n = n.substring(12) : n.match(/^ipfs:\/\//i) ? n = n.substring(7) : g(!1, "unsupported IPFS format", "link", n), `https://gateway.ipfs.io/ipfs/${n}`;
}
class mp {
  /**
   *  The name.
   */
  name;
  /**
   *  Creates a new **MulticoinProviderPluing** for %%name%%.
   */
  constructor(t) {
    F(this, { name: t });
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
const Pl = new RegExp("^(ipfs)://(.*)$", "i"), la = [
  new RegExp("^(https)://(.*)$", "i"),
  new RegExp("^(data):(.*)$", "i"),
  Pl,
  new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i")
];
class Pn {
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
    F(this, { provider: t, address: e, name: r }), this.#t = null, this.#e = new qe(e, [
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
    e.unshift(oi(this.name));
    let s = null;
    await this.supportsWildcard() && (s = r.getFunction(t), I(s, "missing fragment", "UNKNOWN_ERROR", {
      info: { funcName: t }
    }), e = [
      hd(this.name, 255),
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
        return i == null || i === Bn ? null : i;
      } catch (i) {
        if (Et(i, "CALL_EXCEPTION"))
          return null;
        throw i;
      }
    if (t >= 0 && t < 2147483648) {
      let i = t + 2147483648;
      const o = await this.#n("addr(bytes32,uint)", [i]);
      if (X(o, 20))
        return j(o);
    }
    let e = null;
    for (const i of this.provider.plugins)
      if (i instanceof mp && i.supportsCoinType(t)) {
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
        return `${s}://${Au("0x" + e[2])}`;
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
      for (let r = 0; r < la.length; r++) {
        const s = e.match(la[r]);
        if (s == null)
          continue;
        const i = s[1].toLowerCase();
        switch (i) {
          case "https":
          case "data":
            return t.push({ type: "url", value: e }), { linkage: t, url: e };
          case "ipfs": {
            const o = Os(e);
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
            const l = c[1], u = new qe(c[0], [
              // ERC-721
              "function tokenURI(uint) view returns (string)",
              "function ownerOf(uint) view returns (address)",
              // ERC-1155
              "function uri(uint) view returns (string)",
              "function balanceOf(address, uint256) view returns (uint)"
            ], this.provider);
            if (i === "erc721") {
              const p = await u.ownerOf(l);
              if (a !== p)
                return t.push({ type: "!owner", value: p }), { url: null, linkage: t };
              t.push({ type: "owner", value: p });
            } else if (i === "erc1155") {
              const p = await u.balanceOf(a, l);
              if (!p)
                return t.push({ type: "!balance", value: "0" }), { url: null, linkage: t };
              t.push({ type: "balance", value: p.toString() });
            }
            let f = await u[o](l);
            if (f == null || f === "0x")
              return t.push({ type: "!metadata-url", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata-url-base", value: f }), i === "erc1155" && (f = f.replace("{id}", ke(l, 32).substring(2)), t.push({ type: "metadata-url-expanded", value: f })), f.match(/^ipfs:/i) && (f = Os(f)), t.push({ type: "metadata-url", value: f });
            let h = {};
            const y = await new Qt(f).send();
            y.assertOk();
            try {
              h = y.bodyJson;
            } catch {
              try {
                t.push({ type: "!metadata", value: y.bodyText });
              } catch {
                const w = y.body;
                return w && t.push({ type: "!metadata", value: U(w) }), { url: null, linkage: t };
              }
              return { url: null, linkage: t };
            }
            if (!h)
              return t.push({ type: "!metadata", value: "" }), { url: null, linkage: t };
            t.push({ type: "metadata", value: JSON.stringify(h) });
            let m = h.image;
            if (typeof m != "string")
              return t.push({ type: "!imageUrl", value: "" }), { url: null, linkage: t };
            if (!m.match(/^(https:\/\/|data:)/i)) {
              if (m.match(Pl) == null)
                return t.push({ type: "!imageUrl-ipfs", value: m }), { url: null, linkage: t };
              t.push({ type: "imageUrl-ipfs", value: m }), m = Os(m);
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
    const r = await Pn.getEnsAddress(t);
    try {
      const i = await new qe(r, [
        "function resolver(bytes32) view returns (address)"
      ], t).resolver(oi(e), {
        enableCcipRead: !0
      });
      return i === Bn ? null : i;
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
      const s = await Pn.#r(t, r);
      if (s != null) {
        const i = new Pn(t, s, e);
        return r !== e && !await i.supportsWildcard() ? null : i;
      }
      r = r.split(".").slice(1).join(".");
    }
  }
}
const ua = BigInt(0);
function $(n, t) {
  return function(e) {
    return e == null ? t : n(e);
  };
}
function os(n, t) {
  return (e) => {
    if (t && e == null)
      return null;
    if (!Array.isArray(e))
      throw new Error("not an array");
    return e.map((r) => n(r));
  };
}
function hr(n, t) {
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
function Ap(n) {
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
function Un(n) {
  return g(X(n, !0), "invalid data", "value", n), n;
}
function bt(n) {
  return g(X(n, 32), "invalid hash", "value", n), n;
}
const bp = hr({
  address: j,
  blockHash: bt,
  blockNumber: Q,
  data: Un,
  index: Q,
  removed: $(Ap, !1),
  topics: os(bt),
  transactionHash: bt,
  transactionIndex: Q
}, {
  index: ["logIndex"]
});
function Ep(n) {
  return bp(n);
}
const xp = hr({
  hash: $(bt),
  parentHash: bt,
  parentBeaconBlockRoot: $(bt, null),
  number: Q,
  timestamp: Q,
  nonce: $(Un),
  difficulty: D,
  gasLimit: D,
  gasUsed: D,
  stateRoot: $(bt, null),
  receiptsRoot: $(bt, null),
  blobGasUsed: $(D, null),
  excessBlobGas: $(D, null),
  miner: $(j),
  prevRandao: $(bt, null),
  extraData: Un,
  baseFeePerGas: $(D)
}, {
  prevRandao: ["mixHash"]
});
function Ip(n) {
  const t = xp(n);
  return t.transactions = n.transactions.map((e) => typeof e == "string" ? e : vl(e)), t;
}
const Np = hr({
  transactionIndex: Q,
  blockNumber: Q,
  transactionHash: bt,
  address: j,
  topics: os(bt),
  data: Un,
  index: Q,
  blockHash: bt
}, {
  index: ["logIndex"]
});
function Pp(n) {
  return Np(n);
}
const vp = hr({
  to: $(j, null),
  from: $(j, null),
  contractAddress: $(j, null),
  // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
  index: Q,
  root: $(U),
  gasUsed: D,
  blobGasUsed: $(D, null),
  logsBloom: $(Un),
  blockHash: bt,
  hash: bt,
  logs: os(Pp),
  blockNumber: Q,
  //confirmations: allowNull(getNumber, null),
  cumulativeGasUsed: D,
  effectiveGasPrice: $(D),
  blobGasPrice: $(D, null),
  status: $(Q),
  type: $(Q, 0)
}, {
  effectiveGasPrice: ["gasPrice"],
  hash: ["transactionHash"],
  index: ["transactionIndex"]
});
function Tp(n) {
  return vp(n);
}
function vl(n) {
  n.to && D(n.to) === ua && (n.to = "0x0000000000000000000000000000000000000000");
  const t = hr({
    hash: bt,
    // Some nodes do not return this, usually test nodes (like Ganache)
    index: $(Q, void 0),
    type: (e) => e === "0x" || e == null ? 0 : Q(e),
    accessList: $(fn, null),
    blobVersionedHashes: $(os(bt, !0), null),
    blockHash: $(bt, null),
    blockNumber: $(Q, null),
    transactionIndex: $(Q, null),
    from: j,
    // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas) must be set
    gasPrice: $(D),
    maxPriorityFeePerGas: $(D),
    maxFeePerGas: $(D),
    maxFeePerBlobGas: $(D, null),
    gasLimit: D,
    to: $(j, null),
    value: D,
    nonce: Q,
    data: Un,
    creates: $(j, null),
    chainId: $(D, null)
  }, {
    data: ["input"],
    gasLimit: ["gas"],
    index: ["transactionIndex"]
  })(n);
  if (t.to == null && t.creates == null && (t.creates = gh(t)), (n.type === 1 || n.type === 2) && n.accessList == null && (t.accessList = []), n.signature ? t.signature = pt.from(n.signature) : t.signature = pt.from(n), t.chainId == null) {
    const e = t.signature.legacyChainId;
    e != null && (t.chainId = e);
  }
  return t.blockHash && D(t.blockHash) === ua && (t.blockHash = null), t;
}
const Cp = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
class dr {
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
    F(this, { name: t });
  }
  /**
   *  Creates a copy of this plugin.
   */
  clone() {
    return new dr(this.name);
  }
}
class as extends dr {
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
    s("txBase", 21e3), s("txCreate", 32e3), s("txDataZero", 4), s("txDataNonzero", 16), s("txAccessListStorageKey", 1900), s("txAccessListAddress", 2400), F(this, r);
  }
  clone() {
    return new as(this.effectiveBlock, this);
  }
}
class cs extends dr {
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
    super("org.ethers.plugins.network.Ens"), F(this, {
      address: t || Cp,
      targetNetwork: e ?? 1
    });
  }
  clone() {
    return new cs(this.address, this.targetNetwork);
  }
}
class Op extends dr {
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
const Ss = /* @__PURE__ */ new Map();
class Ft {
  #t;
  #e;
  #n;
  /**
   *  Creates a new **Network** for %%name%% and %%chainId%%.
   */
  constructor(t, e) {
    this.#t = t, this.#e = D(e), this.#n = /* @__PURE__ */ new Map();
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
    this.#e = D(t, "chainId");
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
        return this.chainId === D(t);
      } catch {
      }
      return this.name === t;
    }
    if (typeof t == "number" || typeof t == "bigint") {
      try {
        return this.chainId === D(t);
      } catch {
      }
      return !1;
    }
    if (typeof t == "object") {
      if (t.chainId != null) {
        try {
          return this.chainId === D(t.chainId);
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
    const e = this.getPlugin("org.ethers.plugins.network.GasCost") || new as();
    let r = e.txBase;
    if (t.to == null && (r += e.txCreate), t.data)
      for (let s = 2; s < t.data.length; s += 2)
        t.data.substring(s, s + 2) === "00" ? r += e.txDataZero : r += e.txDataNonzero;
    if (t.accessList) {
      const s = fn(t.accessList);
      for (const i in s)
        r += e.txAccessListAddress + e.txAccessListStorageKey * s[i].storageKeys.length;
    }
    return r;
  }
  /**
   *  Returns a new Network for the %%network%% name or chainId.
   */
  static from(t) {
    if (Sp(), t == null)
      return Ft.from("mainnet");
    if (typeof t == "number" && (t = BigInt(t)), typeof t == "string" || typeof t == "bigint") {
      const e = Ss.get(t);
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
      return (t.ensAddress || t.ensNetwork != null) && e.attachPlugin(new cs(t.ensAddress, t.ensNetwork)), e;
    }
    g(!1, "invalid network", "network", t);
  }
  /**
   *  Register %%nameOrChainId%% with a function which returns
   *  an instance of a Network representing that chain.
   */
  static register(t, e) {
    typeof t == "number" && (t = BigInt(t));
    const r = Ss.get(t);
    r && g(!1, `conflicting network for ${JSON.stringify(r.name)}`, "nameOrChainId", t), Ss.set(t, e);
  }
}
function fa(n, t) {
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
function ha(n) {
  return new Op(n, async (t, e, r) => {
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
        maxFeePerGas: fa(a.maxFee, 9),
        maxPriorityFeePerGas: fa(a.maxPriorityFee, 9)
      };
    } catch (i) {
      I(!1, `error encountered with polygon gas station (${JSON.stringify(r.url)})`, "SERVER_ERROR", { request: r, response: s, error: i });
    }
  });
}
let da = !1;
function Sp() {
  if (da)
    return;
  da = !0;
  function n(t, e, r) {
    const s = function() {
      const i = new Ft(t, e);
      return r.ensNetwork != null && i.attachPlugin(new cs(null, r.ensNetwork)), i.attachPlugin(new as()), (r.plugins || []).forEach((o) => {
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
      ha("https://gasstation.polygon.technology/v2")
    ]
  }), n("matic-amoy", 80002, {}), n("matic-mumbai", 80001, {
    altNames: ["maticMumbai", "maticmum"],
    plugins: [
      ha("https://gasstation-testnet.polygon.technology/v2")
    ]
  }), n("optimism", 10, {
    ensNetwork: 1,
    plugins: []
  }), n("optimism-goerli", 420, {}), n("optimism-sepolia", 11155420, {}), n("xdai", 100, { ensNetwork: 1 });
}
function li(n) {
  return JSON.parse(JSON.stringify(n));
}
class Bp {
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
class Qi {
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
class Rp extends Qi {
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
class kp extends Qi {
  #t;
  constructor(t, e) {
    super(t), this.#t = li(e);
  }
  async _poll(t, e) {
    throw new Error("@TODO");
  }
}
class Up extends Qi {
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
class $i {
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
    this.#t = t, this.#e = li(e), this.#n = this.#o.bind(this), this.#r = !1, this.#s = -2;
  }
  async #o(t) {
    if (this.#s === -2)
      return;
    const e = li(this.#e);
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
const Dp = BigInt(2), Lp = 10;
function Pr(n) {
  return n && typeof n.then == "function";
}
function Rr(n, t) {
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
class Tl {
  /**
   *  The name fof the event.
   */
  name;
  /**
   *  Create a new UnmanagedSubscriber with %%name%%.
   */
  constructor(t) {
    F(this, { name: t });
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
function _p(n) {
  return JSON.parse(JSON.stringify(n));
}
function ui(n) {
  return n = Array.from(new Set(n).values()), n.sort(), n;
}
async function Bs(n, t) {
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
  if (X(n, 32)) {
    const e = n.toLowerCase();
    return { type: "transaction", tag: Rr("tx", { hash: e }), hash: e };
  }
  if (n.orphan) {
    const e = n;
    return { type: "orphan", tag: Rr("orphan", e), filter: _p(e) };
  }
  if (n.address || n.topics) {
    const e = n, r = {
      topics: (e.topics || []).map((s) => s == null ? null : Array.isArray(s) ? ui(s.map((i) => i.toLowerCase())) : s.toLowerCase())
    };
    if (e.address) {
      const s = [], i = [], o = (a) => {
        X(a) ? s.push(a) : i.push((async () => {
          s.push(await vt(a, t));
        })());
      };
      Array.isArray(e.address) ? e.address.forEach(o) : o(e.address), i.length && await Promise.all(i), r.address = ui(s.map((a) => a.toLowerCase()));
    }
    return { filter: r, tag: Rr("event", r), type: "event" };
  }
  g(!1, "unknown ProviderEvent", "event", n);
}
function Rs() {
  return (/* @__PURE__ */ new Date()).getTime();
}
const Fp = {
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class Mp {
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
  #l;
  #p;
  #g;
  /**
   *  Create a new **AbstractProvider** connected to %%network%%, or
   *  use the various network detection capabilities to discover the
   *  [[Network]] if necessary.
   */
  constructor(t, e) {
    if (this.#g = Object.assign({}, Fp, e || {}), t === "any")
      this.#o = !0, this.#s = null;
    else if (t) {
      const r = Ft.from(t);
      this.#o = !1, this.#s = Promise.resolve(r), setTimeout(() => {
        this.emit("network", r, null);
      }, 0);
    } else
      this.#o = !1, this.#s = null;
    this.#a = -1, this.#i = /* @__PURE__ */ new Map(), this.#t = /* @__PURE__ */ new Map(), this.#e = /* @__PURE__ */ new Map(), this.#n = null, this.#r = !1, this.#f = 1, this.#l = /* @__PURE__ */ new Map(), this.#p = !1;
  }
  get pollingInterval() {
    return this.#g.pollingInterval;
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
    return this.#p;
  }
  set disableCcipRead(t) {
    this.#p = !!t;
  }
  // Shares multiple identical requests made during the same 250ms
  async #c(t) {
    const e = this.#g.cacheTimeout;
    if (e < 0)
      return await this._perform(t);
    const r = Rr(t.method, t);
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
      const c = r[a], l = c.replace("{sender}", s).replace("{data}", i), u = new Qt(l);
      c.indexOf("{data}") === -1 && (u.body = { data: i, sender: s }), this.emit("debug", { action: "sendCcipReadFetchRequest", request: u, index: a, urls: r });
      let f = "unknown error", h;
      try {
        h = await u.send();
      } catch (y) {
        o.push(y.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: u, result: { error: y } });
        continue;
      }
      try {
        const y = h.bodyJson;
        if (y.data)
          return this.emit("debug", { action: "receiveCcipReadFetchResult", request: u, result: y }), y.data;
        y.message && (f = y.message), this.emit("debug", { action: "receiveCcipReadFetchError", request: u, result: y });
      } catch {
      }
      I(h.statusCode < 400 || h.statusCode >= 500, `response not found during CCIP fetch: ${f}`, "OFFCHAIN_FAULT", { reason: "404_MISSING_RESOURCE", transaction: t, info: { url: c, errorMessage: f } }), o.push(f);
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
    return new sp(Ip(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a log before
   *  returning it, to add additional properties or an alternate
   *  sub-class of [[Log]].
   */
  _wrapLog(t, e) {
    return new ur(Ep(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  receipt before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionReceipt]].
   */
  _wrapTransactionReceipt(t, e) {
    return new pl(Tp(t), this);
  }
  /**
   *  Provides the opportunity for a sub-class to wrap a transaction
   *  response before returning it, to add additional properties or an
   *  alternate sub-class of [[TransactionResponse]].
   */
  _wrapTransactionResponse(t, e) {
    return new fr(vl(t), this);
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
    const t = Q(await this.#c({ method: "getBlockNumber" }), "%response");
    return this.#a >= 0 && (this.#a = t), t;
  }
  /**
   *  Returns or resolves to the address for %%address%%, resolving ENS
   *  names and [[Addressable]] objects and returning if already an
   *  address.
   */
  _getAddress(t) {
    return vt(t, this);
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
    if (X(t))
      return X(t, 32) ? t : An(t);
    if (typeof t == "bigint" && (t = Q(t, "blockTag")), typeof t == "number")
      return t >= 0 ? An(t) : this.#a >= 0 ? An(this.#a + t) : this.getBlockNumber().then((e) => An(e + t));
    g(!1, "invalid blockTag", "blockTag", t);
  }
  /**
   *  Returns or resolves to a filter for %%filter%%, resolving any ENS
   *  names or [[Addressable]] object and returning if already a valid
   *  filter.
   */
  _getFilter(t) {
    const e = (t.topics || []).map((c) => c == null ? null : Array.isArray(c) ? ui(c.map((l) => l.toLowerCase())) : c.toLowerCase()), r = "blockHash" in t ? t.blockHash : void 0, s = (c, l, u) => {
      let f;
      switch (c.length) {
        case 0:
          break;
        case 1:
          f = c[0];
          break;
        default:
          c.sort(), f = c;
      }
      if (r && (l != null || u != null))
        throw new Error("invalid filter");
      const h = {};
      return f && (h.address = f), e.length && (h.topics = e), l && (h.fromBlock = l), u && (h.toBlock = u), r && (h.blockHash = r), h;
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
    const e = Qr(t), r = [];
    if (["to", "from"].forEach((s) => {
      if (e[s] == null)
        return;
      const i = vt(e[s], this);
      Pr(i) ? r.push(async function() {
        e[s] = await i;
      }()) : e[s] = i;
    }), e.blockTag != null) {
      const s = this._getBlockTag(e.blockTag);
      Pr(s) ? r.push(async function() {
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
      const { _block: s, gasPrice: i, priorityFee: o } = await It({
        _block: this.#y("latest", !1),
        gasPrice: (async () => {
          try {
            const u = await this.#c({ method: "getGasPrice" });
            return D(u, "%response");
          } catch {
          }
          return null;
        })(),
        priorityFee: (async () => {
          try {
            const u = await this.#c({ method: "getPriorityFee" });
            return D(u, "%response");
          } catch {
          }
          return null;
        })()
      });
      let a = null, c = null;
      const l = this._wrapBlock(s, t);
      return l && l.baseFeePerGas && (c = o ?? BigInt("1000000000"), a = l.baseFeePerGas * Dp + c), new oa(i, a, c);
    }, r = t.getPlugin("org.ethers.plugins.network.FetchUrlFeeDataPlugin");
    if (r) {
      const s = new Qt(r.url), i = await r.processFunc(e, this, s);
      return new oa(i.gasPrice, i.maxFeePerGas, i.maxPriorityFeePerGas);
    }
    return await e();
  }
  async estimateGas(t) {
    let e = this._getTransactionRequest(t);
    return Pr(e) && (e = await e), D(await this.#c({
      method: "estimateGas",
      transaction: e
    }), "%response");
  }
  async #u(t, e, r) {
    I(r < Lp, "CCIP read exceeded maximum redirections", "OFFCHAIN_FAULT", {
      reason: "TOO_MANY_REDIRECTS",
      transaction: Object.assign({}, t, { blockTag: e, enableCcipRead: !0 })
    });
    const s = Qr(t);
    try {
      return U(await this._perform({ method: "call", transaction: s, blockTag: e }));
    } catch (i) {
      if (!this.disableCcipRead && xi(i) && i.data && r >= 0 && e === "latest" && s.to != null && at(i.data, 0, 4) === "0x556f1830") {
        const o = i.data, a = await vt(s.to, this);
        let c;
        try {
          c = Qp(at(i.data, 4));
        } catch (f) {
          I(!1, f.message, "OFFCHAIN_FAULT", {
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
        const l = await this.ccipReadFetch(s, c.calldata, c.urls);
        I(l != null, "CCIP Read failed to fetch data", "OFFCHAIN_FAULT", {
          reason: "FETCH_FAILED",
          transaction: s,
          info: { data: i.data, errorArgs: c.errorArgs }
        });
        const u = {
          to: a,
          data: tt([c.selector, zp([l, c.extraData])])
        };
        this.emit("debug", { action: "sendCcipReadCall", transaction: u });
        try {
          const f = await this.#u(u, e, r + 1);
          return this.emit("debug", { action: "receiveCcipReadCallResult", transaction: Object.assign({}, u), result: f }), f;
        } catch (f) {
          throw this.emit("debug", { action: "receiveCcipReadCallError", transaction: Object.assign({}, u), error: f }), f;
        }
      }
      throw i;
    }
  }
  async #h(t) {
    const { value: e } = await It({
      network: this.getNetwork(),
      value: t
    });
    return e;
  }
  async call(t) {
    const { tx: e, blockTag: r } = await It({
      tx: this._getTransactionRequest(t),
      blockTag: this._getBlockTag(t.blockTag)
    });
    return await this.#h(this.#u(e, r, t.enableCcipRead ? 0 : -1));
  }
  // Account
  async #d(t, e, r) {
    let s = this._getAddress(e), i = this._getBlockTag(r);
    return (typeof s != "string" || typeof i != "string") && ([s, i] = await Promise.all([s, i])), await this.#h(this.#c(Object.assign(t, { address: s, blockTag: i })));
  }
  async getBalance(t, e) {
    return D(await this.#d({ method: "getBalance" }, t, e), "%response");
  }
  async getTransactionCount(t, e) {
    return Q(await this.#d({ method: "getTransactionCount" }, t, e), "%response");
  }
  async getCode(t, e) {
    return U(await this.#d({ method: "getCode" }, t, e));
  }
  async getStorage(t, e, r) {
    const s = D(e, "position");
    return U(await this.#d({ method: "getStorage", position: s }, t, r));
  }
  // Write
  async broadcastTransaction(t) {
    const { blockNumber: e, hash: r, network: s } = await It({
      blockNumber: this.getBlockNumber(),
      hash: this._perform({
        method: "broadcastTransaction",
        signedTransaction: t
      }),
      network: this.getNetwork()
    }), i = ie.from(t);
    if (i.hash !== r)
      throw new Error("@TODO: the returned hash did not match");
    return this._wrapTransactionResponse(i, s).replaceableTransaction(e);
  }
  async #y(t, e) {
    if (X(t, 32))
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
    const { network: r, params: s } = await It({
      network: this.getNetwork(),
      params: this.#y(t, !!e)
    });
    return s == null ? null : this._wrapBlock(s, r);
  }
  async getTransaction(t) {
    const { network: e, params: r } = await It({
      network: this.getNetwork(),
      params: this.#c({ method: "getTransaction", hash: t })
    });
    return r == null ? null : this._wrapTransactionResponse(r, e);
  }
  async getTransactionReceipt(t) {
    const { network: e, params: r } = await It({
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
    const { result: e } = await It({
      network: this.getNetwork(),
      result: this.#c({ method: "getTransactionResult", hash: t })
    });
    return e == null ? null : U(e);
  }
  // Bloom-filter Queries
  async getLogs(t) {
    let e = this._getFilter(t);
    Pr(e) && (e = await e);
    const { network: r, params: s } = await It({
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
    return await Pn.fromName(this, t);
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
    t = j(t);
    const e = oi(t.substring(2).toLowerCase() + ".addr.reverse");
    try {
      const r = await Pn.getEnsAddress(this), i = await new qe(r, [
        "function resolver(bytes32) view returns (address)"
      ], this).resolver(e);
      if (i == null || i === Bn)
        return null;
      const a = await new qe(i, [
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
      const c = async (l) => {
        try {
          const u = await this.getTransactionReceipt(t);
          if (u != null && l - u.blockNumber + 1 >= s) {
            i(u), a && (clearTimeout(a), a = null);
            return;
          }
        } catch (u) {
          console.log("EEE", u);
        }
        this.once("block", c);
      };
      r != null && (a = setTimeout(() => {
        a != null && (a = null, this.off("block", c), o(ot("timeout", "TIMEOUT", { reason: "timeout" })));
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
    const e = this.#l.get(t);
    e && (e.timer && clearTimeout(e.timer), this.#l.delete(t));
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
      this.#l.delete(r), t();
    };
    if (this.paused)
      this.#l.set(r, { timer: null, func: s, time: e });
    else {
      const i = setTimeout(s, e);
      this.#l.set(r, { timer: i, func: s, time: Rs() });
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
        return new Tl(t.type);
      case "block": {
        const e = new Bp(this);
        return e.pollingInterval = this.pollingInterval, e;
      }
      case "safe":
      case "finalized":
        return new Rp(this, t.type);
      case "event":
        return new $i(this, t.filter);
      case "transaction":
        return new Up(this, t.hash);
      case "orphan":
        return new kp(this, t.filter);
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
    let r = await Bs(t, this);
    return r.type === "event" && e && e.length > 0 && e[0].removed === !0 && (r = await Bs({ orphan: "drop-log", log: e[0] }, this)), this.#t.get(r.tag) || null;
  }
  async #m(t) {
    const e = await Bs(t, this), r = e.tag;
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
      const a = new $a(this, o ? null : i, t);
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
    for (const t of this.#l.keys())
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
    for (const e of this.#l.values())
      e.timer && clearTimeout(e.timer), e.time = Rs() - e.time;
  }
  /**
   *  Resume the provider.
   */
  resume() {
    if (this.#n != null) {
      this._forEachSubscriber((t) => t.resume()), this.#n = null;
      for (const t of this.#l.values()) {
        let e = t.time;
        e < 0 && (e = 0), t.time = Rs(), setTimeout(t.func, e);
      }
    }
  }
}
function Hp(n, t) {
  try {
    const e = fi(n, t);
    if (e)
      return _r(e);
  } catch {
  }
  return null;
}
function fi(n, t) {
  if (n === "0x")
    return null;
  try {
    const e = Q(at(n, t, t + 32)), r = Q(at(n, e, e + 32));
    return at(n, e + 32, e + 32 + r);
  } catch {
  }
  return null;
}
function pa(n) {
  const t = gt(n);
  if (t.length > 32)
    throw new Error("internal; should not happen");
  const e = new Uint8Array(32);
  return e.set(t, 32 - t.length), e;
}
function Gp(n) {
  if (n.length % 32 === 0)
    return n;
  const t = new Uint8Array(Math.ceil(n.length / 32) * 32);
  return t.set(n), t;
}
const Vp = new Uint8Array([]);
function zp(n) {
  const t = [];
  let e = 0;
  for (let r = 0; r < n.length; r++)
    t.push(Vp), e += 32;
  for (let r = 0; r < n.length; r++) {
    const s = V(n[r]);
    t[r] = pa(e), t.push(pa(s.length)), t.push(Gp(s)), e += 32 + Math.ceil(s.length / 32) * 32;
  }
  return tt(t);
}
const ga = "0x0000000000000000000000000000000000000000000000000000000000000000";
function Qp(n) {
  const t = {
    sender: "",
    urls: [],
    calldata: "",
    selector: "",
    extraData: "",
    errorArgs: []
  };
  I(Je(n) >= 5 * 32, "insufficient OffchainLookup data", "OFFCHAIN_FAULT", {
    reason: "insufficient OffchainLookup data"
  });
  const e = at(n, 0, 32);
  I(at(e, 0, 12) === at(ga, 0, 12), "corrupt OffchainLookup sender", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup sender"
  }), t.sender = at(e, 12);
  try {
    const r = [], s = Q(at(n, 32, 64)), i = Q(at(n, s, s + 32)), o = at(n, s + 32);
    for (let a = 0; a < i; a++) {
      const c = Hp(o, a * 32);
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
    const r = fi(n, 64);
    if (r == null)
      throw new Error("abort");
    t.calldata = r;
  } catch {
    I(!1, "corrupt OffchainLookup calldata", "OFFCHAIN_FAULT", {
      reason: "corrupt OffchainLookup calldata"
    });
  }
  I(at(n, 100, 128) === at(ga, 0, 28), "corrupt OffchainLookup callbaackSelector", "OFFCHAIN_FAULT", {
    reason: "corrupt OffchainLookup callbaackSelector"
  }), t.selector = at(n, 96, 100);
  try {
    const r = fi(n, 128);
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
function pn(n, t) {
  if (n.provider)
    return n.provider;
  I(!1, "missing provider", "UNSUPPORTED_OPERATION", { operation: t });
}
async function ya(n, t) {
  let e = Qr(t);
  if (e.to != null && (e.to = vt(e.to, n)), e.from != null) {
    const r = e.from;
    e.from = Promise.all([
      n.getAddress(),
      vt(r, n)
    ]).then(([s, i]) => (g(s.toLowerCase() === i.toLowerCase(), "transaction from mismatch", "tx.from", i), s));
  } else
    e.from = n.getAddress();
  return await It(e);
}
class ls {
  /**
   *  The provider this signer is connected to.
   */
  provider;
  /**
   *  Creates a new Signer connected to %%provider%%.
   */
  constructor(t) {
    F(this, { provider: t || null });
  }
  async getNonce(t) {
    return pn(this, "getTransactionCount").getTransactionCount(await this.getAddress(), t);
  }
  async populateCall(t) {
    return await ya(this, t);
  }
  async populateTransaction(t) {
    const e = pn(this, "populateTransaction"), r = await ya(this, t);
    r.nonce == null && (r.nonce = await this.getNonce("pending")), r.gasLimit == null && (r.gasLimit = await this.estimateGas(r));
    const s = await this.provider.getNetwork();
    if (r.chainId != null) {
      const o = D(r.chainId);
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
    return await It(r);
  }
  async estimateGas(t) {
    return pn(this, "estimateGas").estimateGas(await this.populateCall(t));
  }
  async call(t) {
    return pn(this, "call").call(await this.populateCall(t));
  }
  async resolveName(t) {
    return await pn(this, "resolveName").resolveName(t);
  }
  async sendTransaction(t) {
    const e = pn(this, "sendTransaction"), r = await this.populateTransaction(t);
    delete r.from;
    const s = ie.from(r);
    return await e.broadcastTransaction(await this.signTransaction(s));
  }
}
class Kr extends ls {
  /**
   *  The signer address.
   */
  address;
  /**
   *  Creates a new **VoidSigner** with %%address%% attached to
   *  %%provider%%.
   */
  constructor(t, e) {
    super(e), F(this, { address: t });
  }
  async getAddress() {
    return this.address;
  }
  connect(t) {
    return new Kr(this.address, t);
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
function $p(n) {
  return JSON.parse(JSON.stringify(n));
}
class Cl {
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
class Kp extends Cl {
  #t;
  /**
   *  Creates a new **FilterIdEventSubscriber** attached to %%provider%%
   *  listening for %%filter%%.
   */
  constructor(t, e) {
    super(t), this.#t = $p(e);
  }
  _recover(t) {
    return new $i(t, this.#t);
  }
  async _subscribe(t) {
    return await t.send("eth_newFilter", [this.#t]);
  }
  async _emitResults(t, e) {
    for (const r of e)
      t.emit(this.#t, t._wrapLog(r, t._network));
  }
}
class Jp extends Cl {
  async _subscribe(t) {
    return await t.send("eth_newPendingTransactionFilter", []);
  }
  async _emitResults(t, e) {
    for (const r of e)
      t.emit("pending", r);
  }
}
const Zp = "bigint,boolean,function,number,string,symbol".split(/,/g);
function kr(n) {
  if (n == null || Zp.indexOf(typeof n) >= 0 || typeof n.getAddress == "function")
    return n;
  if (Array.isArray(n))
    return n.map(kr);
  if (typeof n == "object")
    return Object.keys(n).reduce((t, e) => (t[e] = n[e], t), {});
  throw new Error(`should not happen: ${n} (${typeof n})`);
}
function Wp(n) {
  return new Promise((t) => {
    setTimeout(t, n);
  });
}
function gn(n) {
  return n && n.toLowerCase();
}
function wa(n) {
  return n && typeof n.pollingInterval == "number";
}
const Ol = {
  polling: !1,
  staticNetwork: null,
  batchStallTime: 10,
  batchMaxSize: 1 << 20,
  batchMaxCount: 100,
  cacheTimeout: 250,
  pollingInterval: 4e3
};
class ks extends ls {
  address;
  constructor(t, e) {
    super(t), e = j(e), F(this, { address: e });
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
    const e = kr(t), r = [];
    if (e.from) {
      const i = e.from;
      r.push((async () => {
        const o = await vt(i, this.provider);
        g(o != null && o.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), e.from = o;
      })());
    } else
      e.from = this.address;
    if (e.gasLimit == null && r.push((async () => {
      e.gasLimit = await this.provider.estimateGas({ ...e, from: this.address });
    })()), e.to != null) {
      const i = e.to;
      r.push((async () => {
        e.to = await vt(i, this.provider);
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
          const l = await this.provider.getTransaction(r);
          if (l != null) {
            s(l.replaceableTransaction(e));
            return;
          }
        } catch (l) {
          if (Et(l, "CANCELLED") || Et(l, "BAD_DATA") || Et(l, "NETWORK_ERROR") || Et(l, "UNSUPPORTED_OPERATION")) {
            l.info == null && (l.info = {}), l.info.sendTransactionHash = r, i(l);
            return;
          }
          if (Et(l, "INVALID_ARGUMENT") && (a++, l.info == null && (l.info = {}), l.info.sendTransactionHash = r, a > 10)) {
            i(l);
            return;
          }
          this.provider.emit("error", ot("failed to fetch transation after sending (will try again)", "UNKNOWN_ERROR", { error: l }));
        }
        this.provider._setTimeout(() => {
          c();
        }, o.pop() || 4e3);
      };
      c();
    });
  }
  async signTransaction(t) {
    const e = kr(t);
    if (e.from) {
      const s = await vt(e.from, this.provider);
      g(s != null && s.toLowerCase() === this.address.toLowerCase(), "from address mismatch", "transaction", t), e.from = s;
    } else
      e.from = this.address;
    const r = this.provider.getRpcTransaction(e);
    return await this.provider.send("eth_signTransaction", [r]);
  }
  async signMessage(t) {
    const e = typeof t == "string" ? Rt(t) : t;
    return await this.provider.send("personal_sign", [
      U(e),
      this.address.toLowerCase()
    ]);
  }
  async signTypedData(t, e, r) {
    const s = kr(r), i = await Dt.resolveNames(t, e, s, async (o) => {
      const a = await vt(o);
      return g(a != null, "TypedData does not support null address", "value", o), a;
    });
    return await this.provider.send("eth_signTypedData_v4", [
      this.address.toLowerCase(),
      JSON.stringify(Dt.getPayload(i.domain, e, i.value))
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
    const e = typeof t == "string" ? Rt(t) : t;
    return await this.provider.send("eth_sign", [
      this.address.toLowerCase(),
      U(e)
    ]);
  }
}
class jp extends Mp {
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
                a(ot("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: c.method }));
                continue;
              }
              const l = i.filter((u) => u.id === c.id)[0];
              if (l == null) {
                const u = ot("missing response for request", "BAD_DATA", {
                  value: i,
                  info: { payload: c }
                });
                this.emit("error", u), a(u);
                continue;
              }
              if ("error" in l) {
                a(this.getRpcError(c, l));
                continue;
              }
              o(l.result);
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
    super(t, e), this.#e = 1, this.#t = Object.assign({}, Ol, e || {}), this.#n = [], this.#r = null, this.#o = null, this.#i = null;
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
      if (r && r.type != null && D(r.type) && r.maxFeePerGas == null && r.maxPriorityFeePerGas == null) {
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
        const e = Ft.from(D(await this.send("eth_chainId", [])));
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
        return Ft.from(D(r.result));
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
          console.log("JsonRpcProvider failed to detect network and cannot start up; retry in 1s (perhaps the URL is wrong or the node is not started)"), this.emit("error", ot("failed to bootstrap network detection", "NETWORK_ERROR", { event: "initial-network-discovery", info: { error: t } })), await Wp(1e3);
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
    return t.type === "pending" ? new Jp(this) : t.type === "event" ? this._getOption("polling") ? new $i(this, t.filter) : new Kp(this, t.filter) : t.type === "orphan" && t.filter.orphan === "drop-log" ? new Tl("orphan") : super._getSubscriber(t);
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
      r === "gasLimit" && (s = "gas"), e[s] = An(D(t[r], `tx.${r}`));
    }), ["from", "to", "data"].forEach((r) => {
      t[r] != null && (e[r] = U(t[r]));
    }), t.accessList && (e.accessList = fn(t.accessList)), t.blobVersionedHashes && (e.blobVersionedHashes = t.blobVersionedHashes.map((r) => r.toLowerCase())), e;
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
          args: [gn(t.address), t.blockTag]
        };
      case "getTransactionCount":
        return {
          method: "eth_getTransactionCount",
          args: [gn(t.address), t.blockTag]
        };
      case "getCode":
        return {
          method: "eth_getCode",
          args: [gn(t.address), t.blockTag]
        };
      case "getStorage":
        return {
          method: "eth_getStorageAt",
          args: [
            gn(t.address),
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
        return t.filter && t.filter.address != null && (Array.isArray(t.filter.address) ? t.filter.address = t.filter.address.map(gn) : t.filter.address = gn(t.filter.address)), { method: "eth_getLogs", args: [t.filter] };
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
        return ot("insufficient funds", "INSUFFICIENT_FUNDS", {
          transaction: t.params[0],
          info: { payload: t, error: s }
        });
    }
    if (r === "eth_call" || r === "eth_estimateGas") {
      const a = hi(s), c = De.getBuiltinCallException(r === "eth_call" ? "call" : "estimateGas", t.params[0], a ? a.data : null);
      return c.info = { error: s, payload: t }, c;
    }
    const i = JSON.stringify(Xp(s));
    if (typeof s.message == "string" && s.message.match(/user denied|ethers-user-denied/i))
      return ot("user rejected action", "ACTION_REJECTED", {
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
        return ot("insufficient funds for intrinsic transaction cost", "INSUFFICIENT_FUNDS", {
          transaction: a,
          info: { error: s }
        });
      if (i.match(/nonce/i) && i.match(/too low/i))
        return ot("nonce has already been used", "NONCE_EXPIRED", { transaction: a, info: { error: s } });
      if (i.match(/replacement transaction/i) && i.match(/underpriced/i))
        return ot("replacement fee too low", "REPLACEMENT_UNDERPRICED", { transaction: a, info: { error: s } });
      if (i.match(/only replay-protected/i))
        return ot("legacy pre-eip-155 transactions not supported", "UNSUPPORTED_OPERATION", {
          operation: r,
          info: { transaction: a, info: { error: s } }
        });
    }
    let o = !!i.match(/the method .* does not exist/i);
    return o || s && s.details && s.details.startsWith("Unauthorized method:") && (o = !0), o ? ot("unsupported operation", "UNSUPPORTED_OPERATION", {
      operation: t.method,
      info: { error: s, payload: t }
    }) : ot("could not coalesce error", "UNKNOWN_ERROR", { error: s, payload: t });
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
      return Promise.reject(ot("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t }));
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
      return new ks(this, s[t]);
    }
    const { accounts: r } = await It({
      network: this.getNetwork(),
      accounts: e
    });
    t = j(t);
    for (const s of r)
      if (j(s) === t)
        return new ks(this, t);
    throw new Error("invalid account");
  }
  async listAccounts() {
    return (await this.send("eth_accounts", [])).map((e) => new ks(this, e));
  }
  destroy() {
    this.#r && (clearTimeout(this.#r), this.#r = null);
    for (const { payload: t, reject: e } of this.#n)
      e(ot("provider destroyed; cancelled request", "UNSUPPORTED_OPERATION", { operation: t.method }));
    this.#n = [], super.destroy();
  }
}
class qp extends jp {
  #t;
  constructor(t, e) {
    super(t, e);
    let r = this._getOption("pollingInterval");
    r == null && (r = Ol.pollingInterval), this.#t = r;
  }
  _getSubscriber(t) {
    const e = super._getSubscriber(t);
    return wa(e) && (e.pollingInterval = this.#t), e;
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
      wa(e) && (e.pollingInterval = this.#t);
    });
  }
}
class Jr extends qp {
  #t;
  constructor(t, e, r) {
    t == null && (t = "http://localhost:8545"), super(e, r), typeof t == "string" ? this.#t = new Qt(t) : this.#t = t.clone();
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
function hi(n) {
  if (n == null)
    return null;
  if (typeof n.message == "string" && n.message.match(/revert/i) && X(n.data))
    return { message: n.message, data: n.data };
  if (typeof n == "object") {
    for (const t in n) {
      const e = hi(n[t]);
      if (e)
        return e;
    }
    return null;
  }
  if (typeof n == "string")
    try {
      return hi(JSON.parse(n));
    } catch {
    }
  return null;
}
function di(n, t) {
  if (n != null) {
    if (typeof n.message == "string" && t.push(n.message), typeof n == "object")
      for (const e in n)
        di(n[e], t);
    if (typeof n == "string")
      try {
        return di(JSON.parse(n), t);
      } catch {
      }
  }
}
function Xp(n) {
  const t = [];
  return di(n, t), t;
}
const Yp = "1.0.8";
let Kt = class pi extends Error {
  constructor(t, e = {}) {
    const r = e.cause instanceof pi ? e.cause.details : e.cause?.message ? e.cause.message : e.details, s = e.cause instanceof pi && e.cause.docsPath || e.docsPath, i = [
      t || "An error occurred.",
      "",
      ...e.metaMessages ? [...e.metaMessages, ""] : [],
      ...s ? [`Docs: https://abitype.dev${s}`] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: abitype@${Yp}`
    ].join(`
`);
    super(i), Object.defineProperty(this, "details", {
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
      value: "AbiTypeError"
    }), e.cause && (this.cause = e.cause), this.details = r, this.docsPath = s, this.metaMessages = e.metaMessages, this.shortMessage = t;
  }
};
function _e(n, t) {
  return n.exec(t)?.groups;
}
const Sl = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, Bl = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/, Rl = /^\(.+?\).*?$/, kl = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function tg(n) {
  return kl.test(n);
}
function eg(n) {
  return _e(kl, n);
}
const Ul = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function ng(n) {
  return Ul.test(n);
}
function rg(n) {
  return _e(Ul, n);
}
const Dl = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function sg(n) {
  return Dl.test(n);
}
function ig(n) {
  return _e(Dl, n);
}
const Ll = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function _l(n) {
  return Ll.test(n);
}
function og(n) {
  return _e(Ll, n);
}
const Fl = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function ag(n) {
  return Fl.test(n);
}
function cg(n) {
  return _e(Fl, n);
}
const Ml = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function lg(n) {
  return Ml.test(n);
}
function ug(n) {
  return _e(Ml, n);
}
const fg = /^receive\(\) external payable$/;
function hg(n) {
  return fg.test(n);
}
const dg = /* @__PURE__ */ new Set(["indexed"]), gi = /* @__PURE__ */ new Set([
  "calldata",
  "memory",
  "storage"
]);
class pg extends Kt {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [
        `Type "${t}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownTypeError"
    });
  }
}
class gg extends Kt {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [`Type "${t}" is not a valid ABI type.`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownSolidityTypeError"
    });
  }
}
class yg extends Kt {
  constructor({ param: t }) {
    super("Invalid ABI parameter.", {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidParameterError"
    });
  }
}
class wg extends Kt {
  constructor({ param: t, name: e }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `"${e}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "SolidityProtectedKeywordError"
    });
  }
}
class mg extends Kt {
  constructor({ param: t, type: e, modifier: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${r}" not allowed${e ? ` in "${e}" type` : ""}.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidModifierError"
    });
  }
}
class Ag extends Kt {
  constructor({ param: t, type: e, modifier: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${r}" not allowed${e ? ` in "${e}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${r}" was given.`
      ]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidFunctionModifierError"
    });
  }
}
class bg extends Kt {
  constructor({ abiParameter: t }) {
    super("Invalid ABI parameter.", {
      details: JSON.stringify(t, null, 2),
      metaMessages: ["ABI parameter type is invalid."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidAbiTypeParameterError"
    });
  }
}
class Fn extends Kt {
  constructor({ signature: t, type: e }) {
    super(`Invalid ${e} signature.`, {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidSignatureError"
    });
  }
}
class Eg extends Kt {
  constructor({ signature: t }) {
    super("Unknown signature.", {
      details: t
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "UnknownSignatureError"
    });
  }
}
class xg extends Kt {
  constructor({ signature: t }) {
    super("Invalid struct signature.", {
      details: t,
      metaMessages: ["No properties exist."]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidStructSignatureError"
    });
  }
}
class Ig extends Kt {
  constructor({ type: t }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${t}" is a circular reference.`]
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "CircularReferenceError"
    });
  }
}
class Ng extends Kt {
  constructor({ current: t, depth: e }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${t.trim()}" has too many ${e > 0 ? "opening" : "closing"} parentheses.`
      ],
      details: `Depth "${e}"`
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "InvalidParenthesisError"
    });
  }
}
function Pg(n, t, e) {
  let r = "";
  if (e)
    for (const s of Object.entries(e)) {
      if (!s)
        continue;
      let i = "";
      for (const o of s[1])
        i += `[${o.type}${o.name ? `:${o.name}` : ""}]`;
      r += `(${s[0]}{${i}})`;
    }
  return t ? `${t}:${n}${r}` : n;
}
const Us = /* @__PURE__ */ new Map([
  // Unnamed
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  // Named
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  // Indexed
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: !0 }
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 }
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 }
  ]
]);
function vg(n, t = {}) {
  if (sg(n))
    return Tg(n, t);
  if (ng(n))
    return Cg(n, t);
  if (tg(n))
    return Og(n, t);
  if (ag(n))
    return Sg(n, t);
  if (lg(n))
    return Bg(n);
  if (hg(n))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new Eg({ signature: n });
}
function Tg(n, t = {}) {
  const e = ig(n);
  if (!e)
    throw new Fn({ signature: n, type: "function" });
  const r = Yt(e.parameters), s = [], i = r.length;
  for (let a = 0; a < i; a++)
    s.push(cn(r[a], {
      modifiers: gi,
      structs: t,
      type: "function"
    }));
  const o = [];
  if (e.returns) {
    const a = Yt(e.returns), c = a.length;
    for (let l = 0; l < c; l++)
      o.push(cn(a[l], {
        modifiers: gi,
        structs: t,
        type: "function"
      }));
  }
  return {
    name: e.name,
    type: "function",
    stateMutability: e.stateMutability ?? "nonpayable",
    inputs: s,
    outputs: o
  };
}
function Cg(n, t = {}) {
  const e = rg(n);
  if (!e)
    throw new Fn({ signature: n, type: "event" });
  const r = Yt(e.parameters), s = [], i = r.length;
  for (let o = 0; o < i; o++)
    s.push(cn(r[o], {
      modifiers: dg,
      structs: t,
      type: "event"
    }));
  return { name: e.name, type: "event", inputs: s };
}
function Og(n, t = {}) {
  const e = eg(n);
  if (!e)
    throw new Fn({ signature: n, type: "error" });
  const r = Yt(e.parameters), s = [], i = r.length;
  for (let o = 0; o < i; o++)
    s.push(cn(r[o], { structs: t, type: "error" }));
  return { name: e.name, type: "error", inputs: s };
}
function Sg(n, t = {}) {
  const e = cg(n);
  if (!e)
    throw new Fn({ signature: n, type: "constructor" });
  const r = Yt(e.parameters), s = [], i = r.length;
  for (let o = 0; o < i; o++)
    s.push(cn(r[o], { structs: t, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: e.stateMutability ?? "nonpayable",
    inputs: s
  };
}
function Bg(n) {
  const t = ug(n);
  if (!t)
    throw new Fn({ signature: n, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: t.stateMutability ?? "nonpayable"
  };
}
const Rg = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, kg = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, Ug = /^u?int$/;
function cn(n, t) {
  const e = Pg(n, t?.type, t?.structs);
  if (Us.has(e))
    return Us.get(e);
  const r = Rl.test(n), s = _e(r ? kg : Rg, n);
  if (!s)
    throw new yg({ param: n });
  if (s.name && Lg(s.name))
    throw new wg({ param: n, name: s.name });
  const i = s.name ? { name: s.name } : {}, o = s.modifier === "indexed" ? { indexed: !0 } : {}, a = t?.structs ?? {};
  let c, l = {};
  if (r) {
    c = "tuple";
    const f = Yt(s.type), h = [], y = f.length;
    for (let m = 0; m < y; m++)
      h.push(cn(f[m], { structs: a }));
    l = { components: h };
  } else if (s.type in a)
    c = "tuple", l = { components: a[s.type] };
  else if (Ug.test(s.type))
    c = `${s.type}256`;
  else if (c = s.type, t?.type !== "struct" && !Hl(c))
    throw new gg({ type: c });
  if (s.modifier) {
    if (!t?.modifiers?.has?.(s.modifier))
      throw new mg({
        param: n,
        type: t?.type,
        modifier: s.modifier
      });
    if (gi.has(s.modifier) && !_g(c, !!s.array))
      throw new Ag({
        param: n,
        type: t?.type,
        modifier: s.modifier
      });
  }
  const u = {
    type: `${c}${s.array ?? ""}`,
    ...i,
    ...o,
    ...l
  };
  return Us.set(e, u), u;
}
function Yt(n, t = [], e = "", r = 0) {
  const s = n.trim().length;
  for (let i = 0; i < s; i++) {
    const o = n[i], a = n.slice(i + 1);
    switch (o) {
      case ",":
        return r === 0 ? Yt(a, [...t, e.trim()]) : Yt(a, t, `${e}${o}`, r);
      case "(":
        return Yt(a, t, `${e}${o}`, r + 1);
      case ")":
        return Yt(a, t, `${e}${o}`, r - 1);
      default:
        return Yt(a, t, `${e}${o}`, r);
    }
  }
  if (e === "")
    return t;
  if (r !== 0)
    throw new Ng({ current: e, depth: r });
  return t.push(e.trim()), t;
}
function Hl(n) {
  return n === "address" || n === "bool" || n === "function" || n === "string" || Sl.test(n) || Bl.test(n);
}
const Dg = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function Lg(n) {
  return n === "address" || n === "bool" || n === "function" || n === "string" || n === "tuple" || Sl.test(n) || Bl.test(n) || Dg.test(n);
}
function _g(n, t) {
  return t || n === "bytes" || n === "string" || n === "tuple";
}
function Fg(n) {
  const t = {}, e = n.length;
  for (let o = 0; o < e; o++) {
    const a = n[o];
    if (!_l(a))
      continue;
    const c = og(a);
    if (!c)
      throw new Fn({ signature: a, type: "struct" });
    const l = c.properties.split(";"), u = [], f = l.length;
    for (let h = 0; h < f; h++) {
      const m = l[h].trim();
      if (!m)
        continue;
      const p = cn(m, {
        type: "struct"
      });
      u.push(p);
    }
    if (!u.length)
      throw new xg({ signature: a });
    t[c.name] = u;
  }
  const r = {}, s = Object.entries(t), i = s.length;
  for (let o = 0; o < i; o++) {
    const [a, c] = s[o];
    r[a] = Gl(c, t);
  }
  return r;
}
const Mg = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function Gl(n, t, e = /* @__PURE__ */ new Set()) {
  const r = [], s = n.length;
  for (let i = 0; i < s; i++) {
    const o = n[i];
    if (Rl.test(o.type))
      r.push(o);
    else {
      const c = _e(Mg, o.type);
      if (!c?.type)
        throw new bg({ abiParameter: o });
      const { array: l, type: u } = c;
      if (u in t) {
        if (e.has(u))
          throw new Ig({ type: u });
        r.push({
          ...o,
          type: `tuple${l ?? ""}`,
          components: Gl(t[u] ?? [], t, /* @__PURE__ */ new Set([...e, u]))
        });
      } else if (Hl(u))
        r.push(o);
      else
        throw new pg({ type: u });
    }
  }
  return r;
}
function Hg(n) {
  const t = Fg(n), e = [], r = n.length;
  for (let s = 0; s < r; s++) {
    const i = n[s];
    _l(i) || e.push(vg(i, t));
  }
  return e;
}
const us = [
  "constructor()",
  "error AccessControlBadConfirmation()",
  "error AccessControlUnauthorizedAccount(address account, bytes32 neededRole)",
  "error AddressEmptyCode(address target)",
  "error DER_Split_Error()",
  "error ECDSAInvalidSignature()",
  "error ECDSAInvalidSignatureLength(uint256 length)",
  "error ECDSAInvalidSignatureS(bytes32 s)",
  "error ERC1967InvalidImplementation(address implementation)",
  "error ERC1967NonPayable()",
  "error FailedInnerCall()",
  "error InvalidInitialization()",
  "error NotInitializing()",
  "error UUPSUnauthorizedCallContext()",
  "error UUPSUnsupportedProxiableUUID(bytes32 slot)",
  "error expmod_Error()",
  "error k256Decompress_Invalid_Length_Error()",
  "error k256DeriveY_Invalid_Prefix_Error()",
  "error recoverV_Error()",
  "event GaslessTransaction(bytes32 indexed dataHash, bytes32 indexed hashedUsername, address indexed publicAddress)",
  "event Initialized(uint64 version)",
  "event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)",
  "event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)",
  "event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)",
  "event Upgraded(address indexed implementation)",
  "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
  "function UPGRADE_INTERFACE_VERSION() view returns (string)",
  "function addWallet((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)",
  "function addWalletPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)",
  "function createAccount((bytes32 hashedUsername, bytes credentialId, (uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword, (uint8 walletType, bytes32 keypairSecret) wallet) args)",
  "function credentialIdsByUsername(bytes32 in_hashedUsername) view returns (bytes[] out_credentialIds)",
  "function encryptedTx(bytes32 nonce, bytes ciphertext, uint256 timestamp, bytes32 dataHash)",
  "function gaspayingAddress() view returns (address)",
  "function generateGaslessTx(bytes in_data, uint64 nonce, uint256 gasPrice, uint64 gasLimit, uint256 timestamp, bytes signature) view returns (bytes out_data)",
  "function getAccount(bytes32 in_username, uint8 walletType) view returns (address)",
  "function getRoleAdmin(bytes32 role) view returns (bytes32)",
  "function grantRole(bytes32 role, address account)",
  "function hasRole(bytes32 role, address account) view returns (bool)",
  "function hashUsage(bytes32) view returns (bool)",
  "function initialize(address _accountFactory, address _signer) payable",
  "function manageCredential((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)",
  "function manageCredentialPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)",
  "function personalization() view returns (bytes32)",
  "function proxiableUUID() view returns (bytes32)",
  "function proxyView(bytes32 in_credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) in_resp, uint8 walletType, bytes in_data) view returns (bytes out_data)",
  "function proxyViewPassword(bytes32 in_hashedUsername, uint8 walletType, bytes32 in_digest, bytes in_data) view returns (bytes out_data)",
  "function removeWallet((bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data) args)",
  "function removeWalletPassword((bytes32 hashedUsername, bytes32 digest, bytes data) args)",
  "function renounceRole(bytes32 role, address callerConfirmation)",
  "function revokeRole(bytes32 role, address account)",
  "function salt() view returns (bytes32)",
  "function setSigner(address _signer)",
  "function signer() view returns (address)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function upgradeToAndCall(address newImplementation, bytes data) payable",
  "function userExists(bytes32 in_username) view returns (bool)",
  "function validateSignature(uint256 _gasPrice, uint64 _gasLimit, uint256 _timestamp, bytes32 _dataKeccak, bytes _signature) view returns (bytes32, bool)"
], $n = [
  "error DER_Split_Error()",
  "error expmod_Error()",
  "error k256Decompress_Invalid_Length_Error()",
  "error k256DeriveY_Invalid_Prefix_Error()",
  "error recoverV_Error()",
  "function addressToBytes32(address _addr) pure returns (bytes32)",
  "function bytes32ToAddress(bytes32 _b) pure returns (address)",
  "function call(address in_contract, bytes in_data) returns (bytes out_data)",
  "function createWallet(bytes32 keypairSecret) returns (address)",
  "function exportPrivateKey(uint256 walletId) view returns (bytes32)",
  "function getWalletList() view returns (bytes32[])",
  "function init(address initialController, bytes32 keypairSecret)",
  "function isController(address who) view returns (bool)",
  "function modifyController(address who, bool status)",
  "function removeWallet(uint256 walletId)",
  "function sign(uint256 walletId, bytes32 digest) view returns ((bytes32 r, bytes32 s, uint256 v))",
  "function signEIP155(uint256 walletId, (uint64 nonce, uint256 gasPrice, uint64 gasLimit, address to, uint256 value, bytes data, uint256 chainId) txToSign) view returns (bytes)",
  "function staticcall(address in_contract, bytes in_data) view returns (bytes out_data)",
  "function transfer(address in_target, uint256 amount)",
  "function walletAddress(uint256 walletId) view returns (bytes32)"
], sw = [
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
Hg(us);
var Ur = /* @__PURE__ */ ((n) => (n[n.CreateAccount = 0] = "CreateAccount", n[n.ManageCredential = 1] = "ManageCredential", n[n.ManageCredentialPassword = 2] = "ManageCredentialPassword", n[n.AddWallet = 3] = "AddWallet", n[n.AddWalletPassword = 4] = "AddWalletPassword", n))(Ur || {});
function ma(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function Gg(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function fs(n, ...t) {
  if (!Gg(n))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + n.length);
}
function Vg(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  ma(n.outputLen), ma(n.blockLen);
}
function Zr(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function zg(n, t) {
  fs(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const yn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ds(n) {
  return new DataView(n.buffer, n.byteOffset, n.byteLength);
}
function se(n, t) {
  return n << 32 - t | n >>> t;
}
function Qg(n) {
  if (typeof n != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof n);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Ki(n) {
  return typeof n == "string" && (n = Qg(n)), fs(n), n;
}
function $g(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    fs(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
let Vl = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function Kg(n) {
  const t = (r) => n().update(Ki(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function Jg(n = 32) {
  if (yn && typeof yn.getRandomValues == "function")
    return yn.getRandomValues(new Uint8Array(n));
  if (yn && typeof yn.randomBytes == "function")
    return yn.randomBytes(n);
  throw new Error("crypto.getRandomValues must be defined");
}
function Zg(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), o = Number(e >> s & i), a = Number(e & i), c = r ? 4 : 0, l = r ? 0 : 4;
  n.setUint32(t + c, o, r), n.setUint32(t + l, a, r);
}
function Wg(n, t, e) {
  return n & t ^ ~n & e;
}
function jg(n, t, e) {
  return n & t ^ n & e ^ t & e;
}
class qg extends Vl {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ds(this.buffer);
  }
  update(t) {
    Zr(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Ki(t);
    const i = t.length;
    for (let o = 0; o < i; ) {
      const a = Math.min(s - this.pos, i - o);
      if (a === s) {
        const c = Ds(t);
        for (; s <= i - o; o += s)
          this.process(c, o);
        continue;
      }
      r.set(t.subarray(o, o + a), this.pos), this.pos += a, o += a, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Zr(this), zg(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: o } = this;
    e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > s - o && (this.process(r, 0), o = 0);
    for (let f = o; f < s; f++)
      e[f] = 0;
    Zg(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = Ds(t), c = this.outputLen;
    if (c % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const l = c / 4, u = this.get();
    if (l > u.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < l; f++)
      a.setUint32(4 * f, u[f], i);
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
const Xg = /* @__PURE__ */ new Uint32Array([
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
]), Ce = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), Oe = /* @__PURE__ */ new Uint32Array(64);
class Yg extends qg {
  constructor() {
    super(64, 32, 8, !1), this.A = Ce[0] | 0, this.B = Ce[1] | 0, this.C = Ce[2] | 0, this.D = Ce[3] | 0, this.E = Ce[4] | 0, this.F = Ce[5] | 0, this.G = Ce[6] | 0, this.H = Ce[7] | 0;
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
    for (let f = 0; f < 16; f++, e += 4)
      Oe[f] = t.getUint32(e, !1);
    for (let f = 16; f < 64; f++) {
      const h = Oe[f - 15], y = Oe[f - 2], m = se(h, 7) ^ se(h, 18) ^ h >>> 3, p = se(y, 17) ^ se(y, 19) ^ y >>> 10;
      Oe[f] = p + Oe[f - 7] + m + Oe[f - 16] | 0;
    }
    let { A: r, B: s, C: i, D: o, E: a, F: c, G: l, H: u } = this;
    for (let f = 0; f < 64; f++) {
      const h = se(a, 6) ^ se(a, 11) ^ se(a, 25), y = u + h + Wg(a, c, l) + Xg[f] + Oe[f] | 0, p = (se(r, 2) ^ se(r, 13) ^ se(r, 22)) + jg(r, s, i) | 0;
      u = l, l = c, c = a, a = o + y | 0, o = i, i = s, s = r, r = y + p | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, a = a + this.E | 0, c = c + this.F | 0, l = l + this.G | 0, u = u + this.H | 0, this.set(r, s, i, o, a, c, l, u);
  }
  roundClean() {
    Oe.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const ty = /* @__PURE__ */ Kg(() => new Yg());
class zl extends Vl {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, Vg(t);
    const r = Ki(e);
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
    return Zr(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    Zr(this), fs(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
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
const Ql = (n, t, e) => new zl(n, t).update(e).digest();
Ql.create = (n, t) => new zl(n, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const hs = /* @__PURE__ */ BigInt(0), ds = /* @__PURE__ */ BigInt(1), ey = /* @__PURE__ */ BigInt(2);
function ln(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function pr(n) {
  if (!ln(n))
    throw new Error("Uint8Array expected");
}
function Dn(n, t) {
  if (typeof t != "boolean")
    throw new Error(n + " boolean expected, got " + t);
}
const ny = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function un(n) {
  pr(n);
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += ny[n[e]];
  return t;
}
function En(n) {
  const t = n.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Ji(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return n === "" ? hs : BigInt("0x" + n);
}
const ue = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Aa(n) {
  if (n >= ue._0 && n <= ue._9)
    return n - ue._0;
  if (n >= ue.A && n <= ue.F)
    return n - (ue.A - 10);
  if (n >= ue.a && n <= ue.f)
    return n - (ue.a - 10);
}
function Ln(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length, e = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const o = Aa(n.charCodeAt(i)), a = Aa(n.charCodeAt(i + 1));
    if (o === void 0 || a === void 0) {
      const c = n[i] + n[i + 1];
      throw new Error('hex string expected, got non-hex character "' + c + '" at index ' + i);
    }
    r[s] = o * 16 + a;
  }
  return r;
}
function Xe(n) {
  return Ji(un(n));
}
function Zi(n) {
  return pr(n), Ji(un(Uint8Array.from(n).reverse()));
}
function _n(n, t) {
  return Ln(n.toString(16).padStart(t * 2, "0"));
}
function Wi(n, t) {
  return _n(n, t).reverse();
}
function ry(n) {
  return Ln(En(n));
}
function qt(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = Ln(t);
    } catch (i) {
      throw new Error(n + " must be hex string or Uint8Array, cause: " + i);
    }
  else if (ln(t))
    r = Uint8Array.from(t);
  else
    throw new Error(n + " must be hex string or Uint8Array");
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(n + " of length " + e + " expected, got " + s);
  return r;
}
function sr(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    pr(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
function sy(n, t) {
  if (n.length !== t.length)
    return !1;
  let e = 0;
  for (let r = 0; r < n.length; r++)
    e |= n[r] ^ t[r];
  return e === 0;
}
function iy(n) {
  if (typeof n != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(n));
}
const Ls = (n) => typeof n == "bigint" && hs <= n;
function ps(n, t, e) {
  return Ls(n) && Ls(t) && Ls(e) && t <= n && n < e;
}
function Ye(n, t, e, r) {
  if (!ps(t, e, r))
    throw new Error("expected valid " + n + ": " + e + " <= n < " + r + ", got " + t);
}
function $l(n) {
  let t;
  for (t = 0; n > hs; n >>= ds, t += 1)
    ;
  return t;
}
function oy(n, t) {
  return n >> BigInt(t) & ds;
}
function ay(n, t, e) {
  return n | (e ? ds : hs) << BigInt(t);
}
const ji = (n) => (ey << BigInt(n - 1)) - ds, _s = (n) => new Uint8Array(n), ba = (n) => Uint8Array.from(n);
function Kl(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = _s(n), s = _s(n), i = 0;
  const o = () => {
    r.fill(1), s.fill(0), i = 0;
  }, a = (...f) => e(s, r, ...f), c = (f = _s()) => {
    s = a(ba([0]), f), r = a(), f.length !== 0 && (s = a(ba([1]), f), r = a());
  }, l = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let f = 0;
    const h = [];
    for (; f < t; ) {
      r = a();
      const y = r.slice();
      h.push(y), f += r.length;
    }
    return sr(...h);
  };
  return (f, h) => {
    o(), c(f);
    let y;
    for (; !(y = h(l())); )
      c();
    return o(), y;
  };
}
const cy = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || ln(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function gr(n, t, e = {}) {
  const r = (s, i, o) => {
    const a = cy[i];
    if (typeof a != "function")
      throw new Error("invalid validator function");
    const c = n[s];
    if (!(o && c === void 0) && !a(c, n))
      throw new Error("param " + String(s) + " is invalid. Expected " + i + ", got " + c);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const ly = () => {
  throw new Error("not implemented");
};
function yi(n) {
  const t = /* @__PURE__ */ new WeakMap();
  return (e, ...r) => {
    const s = t.get(e);
    if (s !== void 0)
      return s;
    const i = n(e, ...r);
    return t.set(e, i), i;
  };
}
const uy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: Ye,
  abool: Dn,
  abytes: pr,
  bitGet: oy,
  bitLen: $l,
  bitMask: ji,
  bitSet: ay,
  bytesToHex: un,
  bytesToNumberBE: Xe,
  bytesToNumberLE: Zi,
  concatBytes: sr,
  createHmacDrbg: Kl,
  ensureBytes: qt,
  equalBytes: sy,
  hexToBytes: Ln,
  hexToNumber: Ji,
  inRange: ps,
  isBytes: ln,
  memoized: yi,
  notImplemented: ly,
  numberToBytesBE: _n,
  numberToBytesLE: Wi,
  numberToHexUnpadded: En,
  numberToVarBytesBE: ry,
  utf8ToBytes: iy,
  validateObject: gr
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const xt = BigInt(0), ht = BigInt(1), Ve = /* @__PURE__ */ BigInt(2), fy = /* @__PURE__ */ BigInt(3), wi = /* @__PURE__ */ BigInt(4), Ea = /* @__PURE__ */ BigInt(5), xa = /* @__PURE__ */ BigInt(8);
function zt(n, t) {
  const e = n % t;
  return e >= xt ? e : t + e;
}
function hy(n, t, e) {
  if (t < xt)
    throw new Error("invalid exponent, negatives unsupported");
  if (e <= xt)
    throw new Error("invalid modulus");
  if (e === ht)
    return xt;
  let r = ht;
  for (; t > xt; )
    t & ht && (r = r * n % e), n = n * n % e, t >>= ht;
  return r;
}
function mi(n, t) {
  if (n === xt)
    throw new Error("invert: expected non-zero number");
  if (t <= xt)
    throw new Error("invert: expected positive modulus, got " + t);
  let e = zt(n, t), r = t, s = xt, i = ht;
  for (; e !== xt; ) {
    const a = r / e, c = r % e, l = s - i * a;
    r = e, e = c, s = i, i = l;
  }
  if (r !== ht)
    throw new Error("invert: does not exist");
  return zt(s, t);
}
function dy(n) {
  const t = (n - ht) / Ve;
  let e, r, s;
  for (e = n - ht, r = 0; e % Ve === xt; e /= Ve, r++)
    ;
  for (s = Ve; s < n && hy(s, t, n) !== n - ht; s++)
    if (s > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (r === 1) {
    const o = (n + ht) / wi;
    return function(c, l) {
      const u = c.pow(l, o);
      if (!c.eql(c.sqr(u), l))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  const i = (e + ht) / Ve;
  return function(a, c) {
    if (a.pow(c, t) === a.neg(a.ONE))
      throw new Error("Cannot find square root");
    let l = r, u = a.pow(a.mul(a.ONE, s), e), f = a.pow(c, i), h = a.pow(c, e);
    for (; !a.eql(h, a.ONE); ) {
      if (a.eql(h, a.ZERO))
        return a.ZERO;
      let y = 1;
      for (let p = a.sqr(h); y < l && !a.eql(p, a.ONE); y++)
        p = a.sqr(p);
      const m = a.pow(u, ht << BigInt(l - y - 1));
      u = a.sqr(m), f = a.mul(f, m), h = a.mul(h, u), l = y;
    }
    return f;
  };
}
function py(n) {
  if (n % wi === fy) {
    const t = (n + ht) / wi;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (n % xa === Ea) {
    const t = (n - Ea) / xa;
    return function(r, s) {
      const i = r.mul(s, Ve), o = r.pow(i, t), a = r.mul(s, o), c = r.mul(r.mul(a, Ve), o), l = r.mul(a, r.sub(c, r.ONE));
      if (!r.eql(r.sqr(l), s))
        throw new Error("Cannot find square root");
      return l;
    };
  }
  return dy(n);
}
const gy = [
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
function yy(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = gy.reduce((r, s) => (r[s] = "function", r), t);
  return gr(n, e);
}
function wy(n, t, e) {
  if (e < xt)
    throw new Error("invalid exponent, negatives unsupported");
  if (e === xt)
    return n.ONE;
  if (e === ht)
    return t;
  let r = n.ONE, s = t;
  for (; e > xt; )
    e & ht && (r = n.mul(r, s)), s = n.sqr(s), e >>= ht;
  return r;
}
function my(n, t) {
  const e = new Array(t.length), r = t.reduce((i, o, a) => n.is0(o) ? i : (e[a] = i, n.mul(i, o)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, o, a) => n.is0(o) ? i : (e[a] = n.mul(i, e[a]), n.mul(i, o)), s), e;
}
function Jl(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function Zl(n, t, e = !1, r = {}) {
  if (n <= xt)
    throw new Error("invalid field: expected ORDER > 0, got " + n);
  const { nBitLength: s, nByteLength: i } = Jl(n, t);
  if (i > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let o;
  const a = Object.freeze({
    ORDER: n,
    isLE: e,
    BITS: s,
    BYTES: i,
    MASK: ji(s),
    ZERO: xt,
    ONE: ht,
    create: (c) => zt(c, n),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof c);
      return xt <= c && c < n;
    },
    is0: (c) => c === xt,
    isOdd: (c) => (c & ht) === ht,
    neg: (c) => zt(-c, n),
    eql: (c, l) => c === l,
    sqr: (c) => zt(c * c, n),
    add: (c, l) => zt(c + l, n),
    sub: (c, l) => zt(c - l, n),
    mul: (c, l) => zt(c * l, n),
    pow: (c, l) => wy(a, c, l),
    div: (c, l) => zt(c * mi(l, n), n),
    // Same as above, but doesn't normalize
    sqrN: (c) => c * c,
    addN: (c, l) => c + l,
    subN: (c, l) => c - l,
    mulN: (c, l) => c * l,
    inv: (c) => mi(c, n),
    sqrt: r.sqrt || ((c) => (o || (o = py(n)), o(a, c))),
    invertBatch: (c) => my(a, c),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (c, l, u) => u ? l : c,
    toBytes: (c) => e ? Wi(c, i) : _n(c, i),
    fromBytes: (c) => {
      if (c.length !== i)
        throw new Error("Field.fromBytes: expected " + i + " bytes, got " + c.length);
      return e ? Zi(c) : Xe(c);
    }
  });
  return Object.freeze(a);
}
function Wl(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function jl(n) {
  const t = Wl(n);
  return t + Math.ceil(t / 2);
}
function Ay(n, t, e = !1) {
  const r = n.length, s = Wl(t), i = jl(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + r);
  const o = e ? Zi(n) : Xe(n), a = zt(o, t - ht) + ht;
  return e ? Wi(a, s) : _n(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Ia = BigInt(0), vr = BigInt(1);
function Fs(n, t) {
  const e = t.negate();
  return n ? e : t;
}
function ql(n, t) {
  if (!Number.isSafeInteger(n) || n <= 0 || n > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + n);
}
function Ms(n, t) {
  ql(n, t);
  const e = Math.ceil(t / n) + 1, r = 2 ** (n - 1);
  return { windows: e, windowSize: r };
}
function by(n, t) {
  if (!Array.isArray(n))
    throw new Error("array expected");
  n.forEach((e, r) => {
    if (!(e instanceof t))
      throw new Error("invalid point at index " + r);
  });
}
function Ey(n, t) {
  if (!Array.isArray(n))
    throw new Error("array of scalars expected");
  n.forEach((e, r) => {
    if (!t.isValid(e))
      throw new Error("invalid scalar at index " + r);
  });
}
const Hs = /* @__PURE__ */ new WeakMap(), Xl = /* @__PURE__ */ new WeakMap();
function Gs(n) {
  return Xl.get(n) || 1;
}
function xy(n, t) {
  return {
    constTimeNegate: Fs,
    hasPrecomputes(e) {
      return Gs(e) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(e, r, s = n.ZERO) {
      let i = e;
      for (; r > Ia; )
        r & vr && (s = s.add(i)), i = i.double(), r >>= vr;
      return s;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(e, r) {
      const { windows: s, windowSize: i } = Ms(r, t), o = [];
      let a = e, c = a;
      for (let l = 0; l < s; l++) {
        c = a, o.push(c);
        for (let u = 1; u < i; u++)
          c = c.add(a), o.push(c);
        a = c.double();
      }
      return o;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(e, r, s) {
      const { windows: i, windowSize: o } = Ms(e, t);
      let a = n.ZERO, c = n.BASE;
      const l = BigInt(2 ** e - 1), u = 2 ** e, f = BigInt(e);
      for (let h = 0; h < i; h++) {
        const y = h * o;
        let m = Number(s & l);
        s >>= f, m > o && (m -= u, s += vr);
        const p = y, d = y + Math.abs(m) - 1, w = h % 2 !== 0, x = m < 0;
        m === 0 ? c = c.add(Fs(w, r[p])) : a = a.add(Fs(x, r[d]));
      }
      return { p: a, f: c };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(e, r, s, i = n.ZERO) {
      const { windows: o, windowSize: a } = Ms(e, t), c = BigInt(2 ** e - 1), l = 2 ** e, u = BigInt(e);
      for (let f = 0; f < o; f++) {
        const h = f * a;
        if (s === Ia)
          break;
        let y = Number(s & c);
        if (s >>= u, y > a && (y -= l, s += vr), y === 0)
          continue;
        let m = r[h + Math.abs(y) - 1];
        y < 0 && (m = m.negate()), i = i.add(m);
      }
      return i;
    },
    getPrecomputes(e, r, s) {
      let i = Hs.get(r);
      return i || (i = this.precomputeWindow(r, e), e !== 1 && Hs.set(r, s(i))), i;
    },
    wNAFCached(e, r, s) {
      const i = Gs(e);
      return this.wNAF(i, this.getPrecomputes(i, e, s), r);
    },
    wNAFCachedUnsafe(e, r, s, i) {
      const o = Gs(e);
      return o === 1 ? this.unsafeLadder(e, r, i) : this.wNAFUnsafe(o, this.getPrecomputes(o, e, s), r, i);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(e, r) {
      ql(r, t), Xl.set(e, r), Hs.delete(e);
    }
  };
}
function Iy(n, t, e, r) {
  if (by(e, n), Ey(r, t), e.length !== r.length)
    throw new Error("arrays of points and scalars must have equal length");
  const s = n.ZERO, i = $l(BigInt(e.length)), o = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, a = (1 << o) - 1, c = new Array(a + 1).fill(s), l = Math.floor((t.BITS - 1) / o) * o;
  let u = s;
  for (let f = l; f >= 0; f -= o) {
    c.fill(s);
    for (let y = 0; y < r.length; y++) {
      const m = r[y], p = Number(m >> BigInt(f) & BigInt(a));
      c[p] = c[p].add(e[y]);
    }
    let h = s;
    for (let y = c.length - 1, m = s; y > 0; y--)
      m = m.add(c[y]), h = h.add(m);
    if (u = u.add(h), f !== 0)
      for (let y = 0; y < o; y++)
        u = u.double();
  }
  return u;
}
function Yl(n) {
  return yy(n.Fp), gr(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Jl(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Na(n) {
  n.lowS !== void 0 && Dn("lowS", n.lowS), n.prehash !== void 0 && Dn("prehash", n.prehash);
}
function Ny(n) {
  const t = Yl(n);
  gr(t, {
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
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: Py, hexToBytes: vy } = uy;
class Ty extends Error {
  constructor(t = "") {
    super(t);
  }
}
const pe = {
  // asn.1 DER encoding utils
  Err: Ty,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (n, t) => {
      const { Err: e } = pe;
      if (n < 0 || n > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new e("tlv.encode: unpadded data");
      const r = t.length / 2, s = En(r);
      if (s.length / 2 & 128)
        throw new e("tlv.encode: long form length too big");
      const i = r > 127 ? En(s.length / 2 | 128) : "";
      return En(n) + i + s + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(n, t) {
      const { Err: e } = pe;
      let r = 0;
      if (n < 0 || n > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length < 2 || t[r++] !== n)
        throw new e("tlv.decode: wrong tlv");
      const s = t[r++], i = !!(s & 128);
      let o = 0;
      if (!i)
        o = s;
      else {
        const c = s & 127;
        if (!c)
          throw new e("tlv.decode(long): indefinite length not supported");
        if (c > 4)
          throw new e("tlv.decode(long): byte length is too big");
        const l = t.subarray(r, r + c);
        if (l.length !== c)
          throw new e("tlv.decode: length bytes not complete");
        if (l[0] === 0)
          throw new e("tlv.decode(long): zero leftmost byte");
        for (const u of l)
          o = o << 8 | u;
        if (r += c, o < 128)
          throw new e("tlv.decode(long): not minimal encoding");
      }
      const a = t.subarray(r, r + o);
      if (a.length !== o)
        throw new e("tlv.decode: wrong value length");
      return { v: a, l: t.subarray(r + o) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(n) {
      const { Err: t } = pe;
      if (n < we)
        throw new t("integer: negative integers are not allowed");
      let e = En(n);
      if (Number.parseInt(e[0], 16) & 8 && (e = "00" + e), e.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return e;
    },
    decode(n) {
      const { Err: t } = pe;
      if (n[0] & 128)
        throw new t("invalid signature integer: negative");
      if (n[0] === 0 && !(n[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return Py(n);
    }
  },
  toSig(n) {
    const { Err: t, _int: e, _tlv: r } = pe, s = typeof n == "string" ? vy(n) : n;
    pr(s);
    const { v: i, l: o } = r.decode(48, s);
    if (o.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: a, l: c } = r.decode(2, i), { v: l, l: u } = r.decode(2, c);
    if (u.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: e.decode(a), s: e.decode(l) };
  },
  hexFromSig(n) {
    const { _tlv: t, _int: e } = pe, r = t.encode(2, e.encode(n.r)), s = t.encode(2, e.encode(n.s)), i = r + s;
    return t.encode(48, i);
  }
}, we = BigInt(0), wt = BigInt(1);
BigInt(2);
const Pa = BigInt(3);
BigInt(4);
function Cy(n) {
  const t = Ny(n), { Fp: e } = t, r = Zl(t.n, t.nBitLength), s = t.toBytes || ((p, d, w) => {
    const x = d.toAffine();
    return sr(Uint8Array.from([4]), e.toBytes(x.x), e.toBytes(x.y));
  }), i = t.fromBytes || ((p) => {
    const d = p.subarray(1), w = e.fromBytes(d.subarray(0, e.BYTES)), x = e.fromBytes(d.subarray(e.BYTES, 2 * e.BYTES));
    return { x: w, y: x };
  });
  function o(p) {
    const { a: d, b: w } = t, x = e.sqr(p), b = e.mul(x, p);
    return e.add(e.add(b, e.mul(p, d)), w);
  }
  if (!e.eql(e.sqr(t.Gy), o(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function a(p) {
    return ps(p, wt, t.n);
  }
  function c(p) {
    const { allowedPrivateKeyLengths: d, nByteLength: w, wrapPrivateKey: x, n: b } = t;
    if (d && typeof p != "bigint") {
      if (ln(p) && (p = un(p)), typeof p != "string" || !d.includes(p.length))
        throw new Error("invalid private key");
      p = p.padStart(w * 2, "0");
    }
    let C;
    try {
      C = typeof p == "bigint" ? p : Xe(qt("private key", p, w));
    } catch {
      throw new Error("invalid private key, expected hex or " + w + " bytes, got " + typeof p);
    }
    return x && (C = zt(C, b)), Ye("private key", C, wt, b), C;
  }
  function l(p) {
    if (!(p instanceof h))
      throw new Error("ProjectivePoint expected");
  }
  const u = yi((p, d) => {
    const { px: w, py: x, pz: b } = p;
    if (e.eql(b, e.ONE))
      return { x: w, y: x };
    const C = p.is0();
    d == null && (d = C ? e.ONE : e.inv(b));
    const T = e.mul(w, d), N = e.mul(x, d), P = e.mul(b, d);
    if (C)
      return { x: e.ZERO, y: e.ZERO };
    if (!e.eql(P, e.ONE))
      throw new Error("invZ was invalid");
    return { x: T, y: N };
  }), f = yi((p) => {
    if (p.is0()) {
      if (t.allowInfinityPoint && !e.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: d, y: w } = p.toAffine();
    if (!e.isValid(d) || !e.isValid(w))
      throw new Error("bad point: x or y not FE");
    const x = e.sqr(w), b = o(d);
    if (!e.eql(x, b))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class h {
    constructor(d, w, x) {
      if (this.px = d, this.py = w, this.pz = x, d == null || !e.isValid(d))
        throw new Error("x required");
      if (w == null || !e.isValid(w))
        throw new Error("y required");
      if (x == null || !e.isValid(x))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(d) {
      const { x: w, y: x } = d || {};
      if (!d || !e.isValid(w) || !e.isValid(x))
        throw new Error("invalid affine point");
      if (d instanceof h)
        throw new Error("projective point not allowed");
      const b = (C) => e.eql(C, e.ZERO);
      return b(w) && b(x) ? h.ZERO : new h(w, x, e.ONE);
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
      const w = e.invertBatch(d.map((x) => x.pz));
      return d.map((x, b) => x.toAffine(w[b])).map(h.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(d) {
      const w = h.fromAffine(i(qt("pointHex", d)));
      return w.assertValidity(), w;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(d) {
      return h.BASE.multiply(c(d));
    }
    // Multiscalar Multiplication
    static msm(d, w) {
      return Iy(h, r, d, w);
    }
    // "Private method", don't use it directly
    _setWindowSize(d) {
      m.setWindowSize(this, d);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      f(this);
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
      l(d);
      const { px: w, py: x, pz: b } = this, { px: C, py: T, pz: N } = d, P = e.eql(e.mul(w, N), e.mul(C, b)), v = e.eql(e.mul(x, N), e.mul(T, b));
      return P && v;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new h(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: d, b: w } = t, x = e.mul(w, Pa), { px: b, py: C, pz: T } = this;
      let N = e.ZERO, P = e.ZERO, v = e.ZERO, B = e.mul(b, b), M = e.mul(C, C), L = e.mul(T, T), G = e.mul(b, C);
      return G = e.add(G, G), v = e.mul(b, T), v = e.add(v, v), N = e.mul(d, v), P = e.mul(x, L), P = e.add(N, P), N = e.sub(M, P), P = e.add(M, P), P = e.mul(N, P), N = e.mul(G, N), v = e.mul(x, v), L = e.mul(d, L), G = e.sub(B, L), G = e.mul(d, G), G = e.add(G, v), v = e.add(B, B), B = e.add(v, B), B = e.add(B, L), B = e.mul(B, G), P = e.add(P, B), L = e.mul(C, T), L = e.add(L, L), B = e.mul(L, G), N = e.sub(N, B), v = e.mul(L, M), v = e.add(v, v), v = e.add(v, v), new h(N, P, v);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(d) {
      l(d);
      const { px: w, py: x, pz: b } = this, { px: C, py: T, pz: N } = d;
      let P = e.ZERO, v = e.ZERO, B = e.ZERO;
      const M = t.a, L = e.mul(t.b, Pa);
      let G = e.mul(w, C), Z = e.mul(x, T), O = e.mul(b, N), A = e.add(w, x), E = e.add(C, T);
      A = e.mul(A, E), E = e.add(G, Z), A = e.sub(A, E), E = e.add(w, b);
      let S = e.add(C, N);
      return E = e.mul(E, S), S = e.add(G, O), E = e.sub(E, S), S = e.add(x, b), P = e.add(T, N), S = e.mul(S, P), P = e.add(Z, O), S = e.sub(S, P), B = e.mul(M, E), P = e.mul(L, O), B = e.add(P, B), P = e.sub(Z, B), B = e.add(Z, B), v = e.mul(P, B), Z = e.add(G, G), Z = e.add(Z, G), O = e.mul(M, O), E = e.mul(L, E), Z = e.add(Z, O), O = e.sub(G, O), O = e.mul(M, O), E = e.add(E, O), G = e.mul(Z, E), v = e.add(v, G), G = e.mul(S, E), P = e.mul(A, P), P = e.sub(P, G), G = e.mul(A, Z), B = e.mul(S, B), B = e.add(B, G), new h(P, v, B);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(h.ZERO);
    }
    wNAF(d) {
      return m.wNAFCached(this, d, h.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(d) {
      const { endo: w, n: x } = t;
      Ye("scalar", d, we, x);
      const b = h.ZERO;
      if (d === we)
        return b;
      if (this.is0() || d === wt)
        return this;
      if (!w || m.hasPrecomputes(this))
        return m.wNAFCachedUnsafe(this, d, h.normalizeZ);
      let { k1neg: C, k1: T, k2neg: N, k2: P } = w.splitScalar(d), v = b, B = b, M = this;
      for (; T > we || P > we; )
        T & wt && (v = v.add(M)), P & wt && (B = B.add(M)), M = M.double(), T >>= wt, P >>= wt;
      return C && (v = v.negate()), N && (B = B.negate()), B = new h(e.mul(B.px, w.beta), B.py, B.pz), v.add(B);
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
      const { endo: w, n: x } = t;
      Ye("scalar", d, wt, x);
      let b, C;
      if (w) {
        const { k1neg: T, k1: N, k2neg: P, k2: v } = w.splitScalar(d);
        let { p: B, f: M } = this.wNAF(N), { p: L, f: G } = this.wNAF(v);
        B = m.constTimeNegate(T, B), L = m.constTimeNegate(P, L), L = new h(e.mul(L.px, w.beta), L.py, L.pz), b = B.add(L), C = M.add(G);
      } else {
        const { p: T, f: N } = this.wNAF(d);
        b = T, C = N;
      }
      return h.normalizeZ([b, C])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(d, w, x) {
      const b = h.BASE, C = (N, P) => P === we || P === wt || !N.equals(b) ? N.multiplyUnsafe(P) : N.multiply(P), T = C(this, w).add(C(d, x));
      return T.is0() ? void 0 : T;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(d) {
      return u(this, d);
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: w } = t;
      if (d === wt)
        return !0;
      if (w)
        return w(h, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d, clearCofactor: w } = t;
      return d === wt ? this : w ? w(h, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return Dn("isCompressed", d), this.assertValidity(), s(h, this, d);
    }
    toHex(d = !0) {
      return Dn("isCompressed", d), un(this.toRawBytes(d));
    }
  }
  h.BASE = new h(t.Gx, t.Gy, e.ONE), h.ZERO = new h(e.ZERO, e.ONE, e.ZERO);
  const y = t.nBitLength, m = xy(h, t.endo ? Math.ceil(y / 2) : y);
  return {
    CURVE: t,
    ProjectivePoint: h,
    normPrivateKeyToScalar: c,
    weierstrassEquation: o,
    isWithinCurveOrder: a
  };
}
function Oy(n) {
  const t = Yl(n);
  return gr(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function Sy(n) {
  const t = Oy(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function o(O) {
    return zt(O, r);
  }
  function a(O) {
    return mi(O, r);
  }
  const { ProjectivePoint: c, normPrivateKeyToScalar: l, weierstrassEquation: u, isWithinCurveOrder: f } = Cy({
    ...t,
    toBytes(O, A, E) {
      const S = A.toAffine(), _ = e.toBytes(S.x), H = sr;
      return Dn("isCompressed", E), E ? H(Uint8Array.from([A.hasEvenY() ? 2 : 3]), _) : H(Uint8Array.from([4]), _, e.toBytes(S.y));
    },
    fromBytes(O) {
      const A = O.length, E = O[0], S = O.subarray(1);
      if (A === s && (E === 2 || E === 3)) {
        const _ = Xe(S);
        if (!ps(_, wt, e.ORDER))
          throw new Error("Point is not on curve");
        const H = u(_);
        let K;
        try {
          K = e.sqrt(H);
        } catch (dt) {
          const nt = dt instanceof Error ? ": " + dt.message : "";
          throw new Error("Point is not on curve" + nt);
        }
        const W = (K & wt) === wt;
        return (E & 1) === 1 !== W && (K = e.neg(K)), { x: _, y: K };
      } else if (A === i && E === 4) {
        const _ = e.fromBytes(S.subarray(0, e.BYTES)), H = e.fromBytes(S.subarray(e.BYTES, 2 * e.BYTES));
        return { x: _, y: H };
      } else {
        const _ = s, H = i;
        throw new Error("invalid Point, expected length of " + _ + ", or uncompressed " + H + ", got " + A);
      }
    }
  }), h = (O) => un(_n(O, t.nByteLength));
  function y(O) {
    const A = r >> wt;
    return O > A;
  }
  function m(O) {
    return y(O) ? o(-O) : O;
  }
  const p = (O, A, E) => Xe(O.slice(A, E));
  class d {
    constructor(A, E, S) {
      this.r = A, this.s = E, this.recovery = S, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(A) {
      const E = t.nByteLength;
      return A = qt("compactSignature", A, E * 2), new d(p(A, 0, E), p(A, E, 2 * E));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(A) {
      const { r: E, s: S } = pe.toSig(qt("DER", A));
      return new d(E, S);
    }
    assertValidity() {
      Ye("r", this.r, wt, r), Ye("s", this.s, wt, r);
    }
    addRecoveryBit(A) {
      return new d(this.r, this.s, A);
    }
    recoverPublicKey(A) {
      const { r: E, s: S, recovery: _ } = this, H = N(qt("msgHash", A));
      if (_ == null || ![0, 1, 2, 3].includes(_))
        throw new Error("recovery id invalid");
      const K = _ === 2 || _ === 3 ? E + t.n : E;
      if (K >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const W = _ & 1 ? "03" : "02", et = c.fromHex(W + h(K)), dt = a(K), nt = o(-H * dt), Ut = o(S * dt), Ct = c.BASE.multiplyAndAddUnsafe(et, nt, Ut);
      if (!Ct)
        throw new Error("point at infinify");
      return Ct.assertValidity(), Ct;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return y(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new d(this.r, o(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Ln(this.toDERHex());
    }
    toDERHex() {
      return pe.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Ln(this.toCompactHex());
    }
    toCompactHex() {
      return h(this.r) + h(this.s);
    }
  }
  const w = {
    isValidPrivateKey(O) {
      try {
        return l(O), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: l,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const O = jl(t.n);
      return Ay(t.randomBytes(O), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(O = 8, A = c.BASE) {
      return A._setWindowSize(O), A.multiply(BigInt(3)), A;
    }
  };
  function x(O, A = !0) {
    return c.fromPrivateKey(O).toRawBytes(A);
  }
  function b(O) {
    const A = ln(O), E = typeof O == "string", S = (A || E) && O.length;
    return A ? S === s || S === i : E ? S === 2 * s || S === 2 * i : O instanceof c;
  }
  function C(O, A, E = !0) {
    if (b(O))
      throw new Error("first arg must be private key");
    if (!b(A))
      throw new Error("second arg must be public key");
    return c.fromHex(A).multiply(l(O)).toRawBytes(E);
  }
  const T = t.bits2int || function(O) {
    if (O.length > 8192)
      throw new Error("input is too large");
    const A = Xe(O), E = O.length * 8 - t.nBitLength;
    return E > 0 ? A >> BigInt(E) : A;
  }, N = t.bits2int_modN || function(O) {
    return o(T(O));
  }, P = ji(t.nBitLength);
  function v(O) {
    return Ye("num < 2^" + t.nBitLength, O, we, P), _n(O, t.nByteLength);
  }
  function B(O, A, E = M) {
    if (["recovered", "canonical"].some((Jt) => Jt in E))
      throw new Error("sign() legacy options not supported");
    const { hash: S, randomBytes: _ } = t;
    let { lowS: H, prehash: K, extraEntropy: W } = E;
    H == null && (H = !0), O = qt("msgHash", O), Na(E), K && (O = qt("prehashed msgHash", S(O)));
    const et = N(O), dt = l(A), nt = [v(dt), v(et)];
    if (W != null && W !== !1) {
      const Jt = W === !0 ? _(e.BYTES) : W;
      nt.push(qt("extraEntropy", Jt));
    }
    const Ut = sr(...nt), Ct = et;
    function Mt(Jt) {
      const Ot = T(Jt);
      if (!f(Ot))
        return;
      const ne = a(Ot), Ie = c.BASE.multiply(Ot).toAffine(), yt = o(Ie.x);
      if (yt === we)
        return;
      const Ht = o(ne * o(Ct + yt * dt));
      if (Ht === we)
        return;
      let Zt = (Ie.x === yt ? 0 : 2) | Number(Ie.y & wt), Gn = Ht;
      return H && y(Ht) && (Gn = m(Ht), Zt ^= 1), new d(yt, Gn, Zt);
    }
    return { seed: Ut, k2sig: Mt };
  }
  const M = { lowS: t.lowS, prehash: !1 }, L = { lowS: t.lowS, prehash: !1 };
  function G(O, A, E = M) {
    const { seed: S, k2sig: _ } = B(O, A, E), H = t;
    return Kl(H.hash.outputLen, H.nByteLength, H.hmac)(S, _);
  }
  c.BASE._setWindowSize(8);
  function Z(O, A, E, S = L) {
    const _ = O;
    A = qt("msgHash", A), E = qt("publicKey", E);
    const { lowS: H, prehash: K, format: W } = S;
    if (Na(S), "strict" in S)
      throw new Error("options.strict was renamed to lowS");
    if (W !== void 0 && W !== "compact" && W !== "der")
      throw new Error("format must be compact or der");
    const et = typeof _ == "string" || ln(_), dt = !et && !W && typeof _ == "object" && _ !== null && typeof _.r == "bigint" && typeof _.s == "bigint";
    if (!et && !dt)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let nt, Ut;
    try {
      if (dt && (nt = new d(_.r, _.s)), et) {
        try {
          W !== "compact" && (nt = d.fromDER(_));
        } catch (Zt) {
          if (!(Zt instanceof pe.Err))
            throw Zt;
        }
        !nt && W !== "der" && (nt = d.fromCompact(_));
      }
      Ut = c.fromHex(E);
    } catch {
      return !1;
    }
    if (!nt || H && nt.hasHighS())
      return !1;
    K && (A = t.hash(A));
    const { r: Ct, s: Mt } = nt, Jt = N(A), Ot = a(Mt), ne = o(Jt * Ot), Ie = o(Ct * Ot), yt = c.BASE.multiplyAndAddUnsafe(Ut, ne, Ie)?.toAffine();
    return yt ? o(yt.x) === Ct : !1;
  }
  return {
    CURVE: t,
    getPublicKey: x,
    getSharedSecret: C,
    sign: G,
    verify: Z,
    ProjectivePoint: c,
    Signature: d,
    utils: w
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function By(n) {
  return {
    hash: n,
    hmac: (t, ...e) => Ql(n, t, $g(...e)),
    randomBytes: Jg
  };
}
function Ry(n, t) {
  const e = (r) => Sy({ ...n, ...By(r) });
  return { ...e(t), create: e };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const tu = Zl(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), ky = tu.create(BigInt("-3")), Uy = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), Dy = Ry({
  a: ky,
  // Equation params: a, b
  b: Uy,
  Fp: tu,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: !1
}, ty), va = Dy, tn = "embeddedWallet", ir = 23294, or = 23295, en = {
  EVM: 0,
  SUBSTRATE: 1,
  BITCOIN: 2
}, rt = {
  SAPPHIRE_PROVIDER_NOT_INITIALIZED: "OAW_SAPPHIRE_PROVIDER_NOT_INITIALIZED",
  ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED: "OAW_ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED",
  NO_USERNAME: "OAW_NO_USERNAME",
  NO_PASSWORD: "OAW_NO_PASSWORD",
  NO_LOGIN_PROXY_DATA: "OAW_NO_LOGIN_PROXY_DATA",
  AUTHENTICATION_DATA_NOT_PROVIDED: "OAW_AUTHENTICATION_DATA_NOT_PROVIDED",
  CANT_GET_ACCOUNT_ADDRESS: "OAW_CANT_GET_ACCOUNT_ADDRESS",
  CANT_GET_ACCOUNT_WALLETS: "OAW_CANT_GET_ACCOUNT_WALLETS",
  NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID: "OAW_NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID",
  CROSS_CHAIN_PROVIDER_NOT_INITIALIZED: "OAW_CROSS_CHAIN_PROVIDER_NOT_INITIALIZED",
  OASIS_WALLET_NOT_INITIALIZED: "OAW_OASIS_WALLET_NOT_INITIALIZED",
  CANT_HASH_USERNAME: "OAW_CANT_HASH_USERNAME",
  CANT_GET_SIGNATURE: "CANT_GET_SIGNATURE",
  NO_APILLON_SESSION_TOKEN_CALLBACK: "NO_APILLON_SESSION_TOKEN_CALLBACK",
  INVALID_APILLON_SESSION_TOKEN: "INVALID_APILLON_SESSION_TOKEN",
  NO_APILLON_CLIENT_ID: "NO_APILLON_CLIENT_ID",
  CANT_GET_SIGNED_TX: "CANT_GET_SIGNED_TX",
  CHAIN_CHANGE_FAILED: "CHAIN_CHANGE_FAILED",
  XDOMAIN_NOT_INIT: "XDOMAIN_NOT_INIT",
  XDOMAIN_STOPPED: "XDOMAIN_STOPPED",
  XDOMAIN_BLOCKED: "XDOMAIN_BLOCKED",
  CANT_GET_WALLET_ADDRESS: "CANT_GET_WALLET_ADDRESS",
  WALLET_TITLE_UPDATE_FAILED: "WALLET_TITLE_UPDATE_FAILED"
}, Ai = {
  [rt.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: "Sapphire provider not initialized",
  [rt.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: "Account manager contract not initialized",
  [rt.NO_USERNAME]: "No username",
  [rt.NO_PASSWORD]: "No password",
  [rt.NO_LOGIN_PROXY_DATA]: "No login proxy data",
  [rt.AUTHENTICATION_DATA_NOT_PROVIDED]: "Authentication data not provided",
  [rt.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [rt.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: "Selected chain is not supported",
  [rt.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: "Cross chain provider not initialized",
  [rt.OASIS_WALLET_NOT_INITIALIZED]: "Embedded wallet not initialized",
  [rt.CANT_HASH_USERNAME]: "Can't hash username",
  [rt.NO_APILLON_SESSION_TOKEN_CALLBACK]: "Session token callback must be provided",
  [rt.INVALID_APILLON_SESSION_TOKEN]: "Session token is not valid",
  [rt.NO_APILLON_CLIENT_ID]: "Client ID is not valid",
  [rt.CANT_GET_SIGNED_TX]: "Could not get signed transaction",
  [rt.CHAIN_CHANGE_FAILED]: "Failed to switch chain",
  [rt.XDOMAIN_NOT_INIT]: "Passkey interface not initialized",
  [rt.XDOMAIN_STOPPED]: "Passkey configuration stopped, window closed",
  [rt.XDOMAIN_BLOCKED]: "Passkey configuration popup blocked, please allow browser popups to continue"
}, Ly = {
  addWallet: {
    passkey: "addWallet",
    password: "addWalletPassword"
  },
  manageCredential: {
    passkey: "manageCredential",
    password: "manageCredentialPassword"
  }
}, Ta = {
  404130001: "Invalid wallet integration UUID",
  // EMBEDDED_WALLET_INTEGRATION_NOT_FOUND
  40313e4: "Domain not whitelisted for wallet usage",
  // EMBEDDED_WALLET_INTEGRATION_DOMAIN_NOT_WHITELISTED
  40013002: "Wallet usage limit reached",
  // MAX_NUMBER_OF_EMBEDDED_WALLET_SIGNATURES_REACHED
  40300001: "Invalid origin"
  // INVALID_ORIGIN
};
function ow(n) {
  if (typeof window < "u")
    return window[tn] = new du(n), window[tn];
}
function qi() {
  if (typeof window < "u")
    return window[tn] || (window[tn] = new du()), window[tn];
}
async function qn(n = 0, t = 4) {
  return typeof window < "u" && window[tn] ? window[tn] : n >= t ? null : (await new Promise((e) => setTimeout(e, 500)), await qn(n + 1, t));
}
async function te(n = "") {
  const e = await qi()?.accountManagerContract?.salt();
  if (e)
    return pu(n, gt(e), 1e5, 32, "sha256");
}
function Vs(n) {
  return [or, ir].includes(n);
}
function R(n, t = "Error") {
  const e = new Error(t);
  throw e.name = rt[n], e;
}
class _y extends Jr {
  providers = [];
  frs = [];
  rpcUrls;
  lastIndex = -1;
  error;
  constructor(t, e) {
    super(t[0], e), this.rpcUrls = t;
  }
  /**
   * Must override this.
   * Even if action is started with `send`, this connection gets used in background.
   */
  _getConnection() {
    return this.lastIndex < 0 || this.lastIndex > this.frs.length - 1 ? new Qt(this.rpcUrls[0]) : this.frs[this.lastIndex].clone();
  }
  /**
   * Switch through all specified rpc urls until one works, or throw error if none works
   */
  async send(t, e, r = 0) {
    if (this.lastIndex > -1 && (r = this.lastIndex), r >= this.rpcUrls.length) {
      const s = this.error;
      throw this.error = void 0, new Error(s);
    }
    try {
      if (r > this.providers.length - 1) {
        const i = new Qt(this.rpcUrls[r]);
        i.timeout = 15e3, this.providers.push(gu(new Jr(i))), this.frs.push(i);
      }
      const s = await this.providers[r].send(t, e);
      return this.lastIndex = r, s;
    } catch (s) {
      return this.error = s, this.lastIndex > 0 ? (this.lastIndex = -1, this.send(t, e, 0)) : (this.lastIndex = -1, this.send(t, e, r + 1));
    }
  }
}
function Ca() {
  const n = "https://localhost:5175";
  try {
    return new URL(n).hostname;
  } catch (t) {
    console.error(t);
  }
  return "passkey.apillon.io";
}
function Fy() {
  var n = navigator.userAgent.toLowerCase();
  return n.indexOf("safari") != -1 && n.indexOf("chrome") === -1;
}
class Tr {
  constructor(t) {
    this.wallet = t;
  }
  abiCoder = De.defaultAbiCoder();
  async getRegisterData(t) {
    t.username || R("NO_USERNAME"), t.password || R("NO_PASSWORD");
    const e = await te(t.username);
    if (!e) {
      R("CANT_HASH_USERNAME");
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
      optionalPassword: Ir(t.password),
      wallet: {
        walletType: en.EVM,
        keypairSecret: We
      }
    };
  }
  async getProxyResponse(t, e) {
    if (!e.username) {
      R("NO_USERNAME");
      return;
    }
    if (!e.password) {
      R("NO_PASSWORD");
      return;
    }
    const r = await te(e.username);
    if (!r) {
      R("CANT_HASH_USERNAME");
      return;
    }
    const s = Ps(
      ["bytes32", "bytes"],
      [Ir(e.password), t]
    );
    return await this.wallet.accountManagerContract.proxyViewPassword(
      r,
      BigInt(en.EVM),
      s,
      t
    );
  }
  async proxyWrite(t, e, r, s, i = !1) {
    if (!r.username) {
      R("NO_USERNAME");
      return;
    }
    if (!r.password) {
      R("NO_PASSWORD");
      return;
    }
    const o = await te(r.username);
    if (!o) {
      R("CANT_HASH_USERNAME");
      return;
    }
    const a = Ps(
      ["bytes32", "bytes"],
      [Ir(r.password), e]
    ), c = await this.wallet.signContractWrite({
      authData: r,
      strategy: "password",
      label: s,
      contractAddress: this.wallet.accountManagerAddress,
      contractAbi: us,
      contractFunctionName: t,
      contractFunctionValues: [
        {
          hashedUsername: o,
          digest: a,
          data: e
        }
      ],
      chainId: "https://testnet.sapphire.oasis.io".includes("testnet") ? or : ir
    });
    if (c) {
      const { txHash: l } = await this.wallet.broadcastTransaction(
        c?.signedTxData,
        c?.chainId,
        s,
        `proxyWrite_${t}`
      );
      if (i || await this.wallet.waitForTxReceipt(l))
        return l;
    }
  }
  async getCredentials(t, e) {
    if (!(e.hashedUsername || await te(e.username))) {
      R("CANT_HASH_USERNAME");
      return;
    }
    return Ps(
      ["bytes32", "bytes"],
      [Ir(e.password), t]
    );
  }
  generateNewKeypair() {
    const t = va.utils.randomPrivateKey(), e = va.getPublicKey(t, !1), r = "0x" + un(e), s = this.abiCoder.encode(["string"], [r]), i = r.slice(4, r.length), o = BigInt("0x" + i.slice(0, 64)), a = BigInt("0x" + i.slice(64, i.length));
    return {
      credentialId: s,
      privateKey: t,
      decoded_x: o,
      decoded_y: a
    };
  }
}
function My(n) {
  return n[0] << 24 | n[1] << 16 | n[2] << 8 | n[3];
}
function Hy(n) {
  return n[0] << 8 | n[1];
}
function Gy(n) {
  const t = Ha.decode(n), e = t[1];
  if (e == 2) {
    const r = {
      kty: e,
      alg: t[3],
      crv: t[-1],
      x: vn(t[-2]),
      /** @type {Uint8Array} */
      y: vn(t[-3])
    };
    if (!(r.alg == -7 && r.crv == 1) && // ES256 + P-256 (NIST)
    !(r.alg == -8 && r.crv == 6))
      throw new Error(`Unknown alg: ${r.alg}, crv: ${r.crv}`);
    return r;
  }
  throw new Error(`Unsupported kty: ${e}`);
}
function Vy(n) {
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
    signCount: My(n.slice(33, 37))
    //  4 bytes
  };
  if (e.flags.ED)
    throw new Error("Extension Data not supported!");
  if (e.flags.AT) {
    const r = Hy(n.slice(53, 55));
    e.attestedCredentialData = {
      aaguid: n.slice(37, 53),
      // 16 bytes
      credentialId: n.slice(55, 55 + r),
      // vanillacbor.decodeOnlyFirst(buffer).byteLength;
      // https://www.w3.org/TR/webauthn-2/#sctn-encoded-credPubKey-examples
      credentialPublicKey: Gy(n.slice(55 + r).buffer)
    };
  }
  return e;
}
function zy(n) {
  const e = Ha.decode(new Uint8Array(n).buffer).authData;
  return Vy(e);
}
async function Qy(n, t, e) {
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
    ad: zy(s.attestationObject)
  };
}
function $y(n) {
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
const Ky = new Sr.Sequence({
  name: "sig",
  value: [
    new Sr.Integer({
      name: "r"
    }),
    new Sr.Integer({
      name: "s"
    })
  ]
});
async function Jy(n, t, e) {
  t || (t = crypto.getRandomValues(new Uint8Array(32)));
  const r = await navigator.credentials.get({
    publicKey: {
      rpId: e,
      allowCredentials: n.map((u) => ({ id: u, type: "public-key" })),
      challenge: t
    }
  }), s = r.response, i = Sr.verifySchema(s.signature, Ky);
  if (!i.verified)
    throw new Error("Unable to decode ASN.1 signature!");
  const o = i.result, a = o.r.toBigInt(), c = o.s.toBigInt(), l = JSON.parse(new TextDecoder().decode(s.clientDataJSON));
  return {
    credentialIdHashed: it(new Uint8Array(r.rawId)),
    challenge: t,
    resp: {
      authenticatorData: new Uint8Array(s.authenticatorData),
      clientDataTokens: $y(l),
      sigR: a,
      sigS: c
    }
  };
}
class Cr {
  constructor(t) {
    this.wallet = t;
  }
  async getRegisterData(t) {
    if (!t.username) {
      R("NO_USERNAME");
      return;
    }
    if (t.hashedUsername || (t.hashedUsername = await te(t.username)), !t.hashedUsername) {
      R("CANT_HASH_USERNAME");
      return;
    }
    const e = {
      walletType: en.EVM,
      keypairSecret: We
    };
    if (this.wallet.xdomain?.mode === "popup") {
      const r = await this.wallet.xdomain?.create(t.hashedUsername, t.username);
      if (!r) {
        R("XDOMAIN_NOT_INIT");
        return;
      }
      return {
        hashedUsername: t.hashedUsername,
        credentialId: r.credentialId,
        pubkey: r.pubkey,
        optionalPassword: We,
        wallet: e
      };
    } else {
      const r = await Qy(
        {
          name: "Embedded Wallet Account",
          id: Ca()
        },
        {
          id: t.hashedUsername,
          name: t.username,
          displayName: t.username
        },
        crypto.getRandomValues(new Uint8Array(32))
      );
      return {
        hashedUsername: t.hashedUsername,
        credentialId: r.id,
        pubkey: r.ad.attestedCredentialData.credentialPublicKey,
        optionalPassword: We,
        wallet: e
      };
    }
  }
  async getProxyResponse(t, e) {
    if (!e.username) {
      R("NO_USERNAME");
      return;
    }
    const r = e.hashedUsername || await te(e.username);
    if (!r) {
      R("CANT_HASH_USERNAME");
      return;
    }
    const s = await this.getPasskeyForMode(
      this.wallet?.xdomain?.mode || "standalone",
      r,
      t
    );
    if (!s) {
      R("XDOMAIN_NOT_INIT");
      return;
    }
    return await this.wallet.accountManagerContract.proxyView(
      s.credentialIdHashed,
      // @ts-expect-error AbiTypes
      s.resp,
      BigInt(en.EVM),
      t
    );
  }
  async proxyWrite(t, e, r, s, i = !1) {
    if (!r.username) {
      R("NO_USERNAME");
      return;
    }
    const o = r.hashedUsername || await te(r.username);
    if (!o) {
      R("CANT_HASH_USERNAME");
      return;
    }
    const a = await this.getPasskeyForMode(
      this.wallet?.xdomain?.mode || "standalone",
      o,
      e
    );
    if (!a) {
      R("XDOMAIN_NOT_INIT");
      return;
    }
    const c = await this.wallet.signContractWrite({
      authData: r,
      strategy: "passkey",
      label: s,
      contractAddress: this.wallet.accountManagerAddress,
      contractAbi: us,
      contractFunctionName: t,
      contractFunctionValues: [
        {
          credentialIdHashed: a.credentialIdHashed,
          resp: a.resp,
          data: e
        }
      ],
      chainId: "https://testnet.sapphire.oasis.io".includes("testnet") ? or : ir
    });
    if (c) {
      const { txHash: l } = await this.wallet.broadcastTransaction(
        c?.signedTxData,
        c?.chainId,
        s,
        `proxyWrite_${t}`
      );
      if (i || await this.wallet.waitForTxReceipt(l))
        return l;
    }
  }
  async getPasskeyForMode(t, e, r) {
    const s = await this.wallet.accountManagerContract.personalization(), o = (await this.wallet.accountManagerContract.credentialIdsByUsername(
      e
    )).map((c) => gt(c)), a = gt(
      Ue(s + Ue(r).slice(2))
    );
    if (["popup", "redirect", "iframe", "tab_form"].includes(t)) {
      const c = await this.wallet.xdomain?.get(o, a);
      return c ? {
        credentialIdHashed: c.credentials.credentialIdHashed,
        resp: c.credentials.resp
      } : void 0;
    } else {
      const c = await Jy(o, a, Ca());
      return {
        credentialIdHashed: c.credentialIdHashed,
        resp: c.resp
      };
    }
  }
}
function Xi(n, { strict: t = !0 } = {}) {
  return !n || typeof n != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(n) : n.startsWith("0x");
}
function bi(n) {
  return Xi(n, { strict: !1 }) ? Math.ceil((n.length - 2) / 2) : n.length;
}
const eu = "2.23.2";
let zs = {
  getDocsUrl: ({ docsBaseUrl: n, docsPath: t = "", docsSlug: e }) => t ? `${n ?? "https://viem.sh"}${t}${e ? `#${e}` : ""}` : void 0,
  version: `viem@${eu}`
};
class le extends Error {
  constructor(t, e = {}) {
    const r = e.cause instanceof le ? e.cause.details : e.cause?.message ? e.cause.message : e.details, s = e.cause instanceof le && e.cause.docsPath || e.docsPath, i = zs.getDocsUrl?.({ ...e, docsPath: s }), o = [
      t || "An error occurred.",
      "",
      ...e.metaMessages ? [...e.metaMessages, ""] : [],
      ...i ? [`Docs: ${i}`] : [],
      ...r ? [`Details: ${r}`] : [],
      ...zs.version ? [`Version: ${zs.version}`] : []
    ].join(`
`);
    super(o, e.cause ? { cause: e.cause } : void 0), Object.defineProperty(this, "details", {
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
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseError"
    }), this.details = r, this.docsPath = s, this.metaMessages = e.metaMessages, this.name = e.name ?? this.name, this.shortMessage = t, this.version = eu;
  }
  walk(t) {
    return nu(this, t);
  }
}
function nu(n, t) {
  return t?.(n) ? n : n && typeof n == "object" && "cause" in n && n.cause !== void 0 ? nu(n.cause, t) : t ? null : n;
}
class ru extends le {
  constructor({ size: t, targetSize: e, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${t}) exceeds padding size (${e}).`, { name: "SizeExceedsPaddingSizeError" });
  }
}
function Mn(n, { dir: t, size: e = 32 } = {}) {
  return typeof n == "string" ? Zy(n, { dir: t, size: e }) : Wy(n, { dir: t, size: e });
}
function Zy(n, { dir: t, size: e = 32 } = {}) {
  if (e === null)
    return n;
  const r = n.replace("0x", "");
  if (r.length > e * 2)
    throw new ru({
      size: Math.ceil(r.length / 2),
      targetSize: e,
      type: "hex"
    });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](e * 2, "0")}`;
}
function Wy(n, { dir: t, size: e = 32 } = {}) {
  if (e === null)
    return n;
  if (n.length > e)
    throw new ru({
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
class jy extends le {
  constructor({ max: t, min: e, signed: r, size: s, value: i }) {
    super(`Number "${i}" is not in safe ${s ? `${s * 8}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${e} to ${t})` : `(above ${e})`}`, { name: "IntegerOutOfRangeError" });
  }
}
class qy extends le {
  constructor({ givenSize: t, maxSize: e }) {
    super(`Size cannot exceed ${e} bytes. Given size: ${t} bytes.`, { name: "SizeOverflowError" });
  }
}
function Xy(n, { dir: t = "left" } = {}) {
  let e = typeof n == "string" ? n.replace("0x", "") : n, r = 0;
  for (let s = 0; s < e.length - 1 && e[t === "left" ? s : e.length - s - 1].toString() === "0"; s++)
    r++;
  return e = t === "left" ? e.slice(r) : e.slice(0, e.length - r), typeof n == "string" ? (e.length === 1 && t === "right" && (e = `${e}0`), `0x${e.length % 2 === 1 ? `0${e}` : e}`) : e;
}
function Hn(n, { size: t }) {
  if (bi(n) > t)
    throw new qy({
      givenSize: bi(n),
      maxSize: t
    });
}
function Yy(n, t = {}) {
  let e = to(n);
  return t.size && (Hn(e, { size: t.size }), e = Xy(e, { dir: "right" })), new TextDecoder().decode(e);
}
const t0 = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function e0(n, t = {}) {
  return typeof n == "number" || typeof n == "bigint" ? su(n, t) : typeof n == "string" ? Ei(n, t) : typeof n == "boolean" ? n0(n, t) : Yi(n, t);
}
function n0(n, t = {}) {
  const e = `0x${Number(n)}`;
  return typeof t.size == "number" ? (Hn(e, { size: t.size }), Mn(e, { size: t.size })) : e;
}
function Yi(n, t = {}) {
  let e = "";
  for (let s = 0; s < n.length; s++)
    e += t0[n[s]];
  const r = `0x${e}`;
  return typeof t.size == "number" ? (Hn(r, { size: t.size }), Mn(r, { dir: "right", size: t.size })) : r;
}
function su(n, t = {}) {
  const { signed: e, size: r } = t, s = BigInt(n);
  let i;
  r ? e ? i = (1n << BigInt(r) * 8n - 1n) - 1n : i = 2n ** (BigInt(r) * 8n) - 1n : typeof n == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof i == "bigint" && e ? -i - 1n : 0;
  if (i && s > i || s < o) {
    const c = typeof n == "bigint" ? "n" : "";
    throw new jy({
      max: i ? `${i}${c}` : void 0,
      min: `${o}${c}`,
      signed: e,
      size: r,
      value: `${n}${c}`
    });
  }
  const a = `0x${(e && s < 0 ? (1n << BigInt(r * 8)) + BigInt(s) : s).toString(16)}`;
  return r ? Mn(a, { size: r }) : a;
}
const r0 = /* @__PURE__ */ new TextEncoder();
function Ei(n, t = {}) {
  const e = r0.encode(n);
  return Yi(e, t);
}
const s0 = /* @__PURE__ */ new TextEncoder();
function i0(n, t = {}) {
  return typeof n == "number" || typeof n == "bigint" ? a0(n, t) : typeof n == "boolean" ? o0(n, t) : Xi(n) ? to(n, t) : iu(n, t);
}
function o0(n, t = {}) {
  const e = new Uint8Array(1);
  return e[0] = Number(n), typeof t.size == "number" ? (Hn(e, { size: t.size }), Mn(e, { size: t.size })) : e;
}
const fe = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function Oa(n) {
  if (n >= fe.zero && n <= fe.nine)
    return n - fe.zero;
  if (n >= fe.A && n <= fe.F)
    return n - (fe.A - 10);
  if (n >= fe.a && n <= fe.f)
    return n - (fe.a - 10);
}
function to(n, t = {}) {
  let e = n;
  t.size && (Hn(e, { size: t.size }), e = Mn(e, { dir: "right", size: t.size }));
  let r = e.slice(2);
  r.length % 2 && (r = `0${r}`);
  const s = r.length / 2, i = new Uint8Array(s);
  for (let o = 0, a = 0; o < s; o++) {
    const c = Oa(r.charCodeAt(a++)), l = Oa(r.charCodeAt(a++));
    if (c === void 0 || l === void 0)
      throw new le(`Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`);
    i[o] = c * 16 + l;
  }
  return i;
}
function a0(n, t) {
  const e = su(n, t);
  return to(e);
}
function iu(n, t = {}) {
  const e = s0.encode(n);
  return typeof t.size == "number" ? (Hn(e, { size: t.size }), Mn(e, { dir: "right", size: t.size })) : e;
}
function Sa(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error("positive integer expected, got " + n);
}
function c0(n) {
  return n instanceof Uint8Array || ArrayBuffer.isView(n) && n.constructor.name === "Uint8Array";
}
function eo(n, ...t) {
  if (!c0(n))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + n.length);
}
function Ba(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function l0(n, t) {
  eo(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const Or = /* @__PURE__ */ BigInt(2 ** 32 - 1), Ra = /* @__PURE__ */ BigInt(32);
function u0(n, t = !1) {
  return t ? { h: Number(n & Or), l: Number(n >> Ra & Or) } : { h: Number(n >> Ra & Or) | 0, l: Number(n & Or) | 0 };
}
function f0(n, t = !1) {
  let e = new Uint32Array(n.length), r = new Uint32Array(n.length);
  for (let s = 0; s < n.length; s++) {
    const { h: i, l: o } = u0(n[s], t);
    [e[s], r[s]] = [i, o];
  }
  return [e, r];
}
const h0 = (n, t, e) => n << e | t >>> 32 - e, d0 = (n, t, e) => t << e | n >>> 32 - e, p0 = (n, t, e) => t << e - 32 | n >>> 64 - e, g0 = (n, t, e) => n << e - 32 | t >>> 64 - e;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function y0(n) {
  return new Uint32Array(n.buffer, n.byteOffset, Math.floor(n.byteLength / 4));
}
const ka = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function w0(n) {
  return n << 24 & 4278190080 | n << 8 & 16711680 | n >>> 8 & 65280 | n >>> 24 & 255;
}
function Ua(n) {
  for (let t = 0; t < n.length; t++)
    n[t] = w0(n[t]);
}
function m0(n) {
  if (typeof n != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof n);
  return new Uint8Array(new TextEncoder().encode(n));
}
function ou(n) {
  return typeof n == "string" && (n = m0(n)), eo(n), n;
}
class A0 {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function b0(n) {
  const t = (r) => n().update(ou(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
const au = [], cu = [], lu = [], E0 = /* @__PURE__ */ BigInt(0), Kn = /* @__PURE__ */ BigInt(1), x0 = /* @__PURE__ */ BigInt(2), I0 = /* @__PURE__ */ BigInt(7), N0 = /* @__PURE__ */ BigInt(256), P0 = /* @__PURE__ */ BigInt(113);
for (let n = 0, t = Kn, e = 1, r = 0; n < 24; n++) {
  [e, r] = [r, (2 * e + 3 * r) % 5], au.push(2 * (5 * r + e)), cu.push((n + 1) * (n + 2) / 2 % 64);
  let s = E0;
  for (let i = 0; i < 7; i++)
    t = (t << Kn ^ (t >> I0) * P0) % N0, t & x0 && (s ^= Kn << (Kn << /* @__PURE__ */ BigInt(i)) - Kn);
  lu.push(s);
}
const [v0, T0] = /* @__PURE__ */ f0(lu, !0), Da = (n, t, e) => e > 32 ? p0(n, t, e) : h0(n, t, e), La = (n, t, e) => e > 32 ? g0(n, t, e) : d0(n, t, e);
function C0(n, t = 24) {
  const e = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      e[o] = n[o] ^ n[o + 10] ^ n[o + 20] ^ n[o + 30] ^ n[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10, c = (o + 2) % 10, l = e[c], u = e[c + 1], f = Da(l, u, 1) ^ e[a], h = La(l, u, 1) ^ e[a + 1];
      for (let y = 0; y < 50; y += 10)
        n[o + y] ^= f, n[o + y + 1] ^= h;
    }
    let s = n[2], i = n[3];
    for (let o = 0; o < 24; o++) {
      const a = cu[o], c = Da(s, i, a), l = La(s, i, a), u = au[o];
      s = n[u], i = n[u + 1], n[u] = c, n[u + 1] = l;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++)
        e[a] = n[o + a];
      for (let a = 0; a < 10; a++)
        n[o + a] ^= ~e[(a + 2) % 10] & e[(a + 4) % 10];
    }
    n[0] ^= v0[r], n[1] ^= T0[r];
  }
  e.fill(0);
}
class no extends A0 {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, r, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = r, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Sa(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = y0(this.state);
  }
  keccak() {
    ka || Ua(this.state32), C0(this.state32, this.rounds), ka || Ua(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Ba(this);
    const { blockLen: e, state: r } = this;
    t = ou(t);
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
    Ba(this, !1), eo(t), this.finish();
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
    return Sa(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (l0(t, this), this.finished)
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
    return t || (t = new no(e, r, s, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = s, t.enableXOF = o, t.destroyed = this.destroyed, t;
  }
}
const O0 = (n, t, e) => b0(() => new no(t, n, e)), S0 = /* @__PURE__ */ O0(1, 136, 256 / 8);
function uu(n, t) {
  const e = t || "hex", r = S0(Xi(n, { strict: !1 }) ? i0(n) : n);
  return e === "bytes" ? r : e0(r);
}
class _a extends le {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
}
class fu extends Map {
  constructor(t) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = t;
  }
  get(t) {
    const e = super.get(t);
    return super.has(t) && e !== void 0 && (this.delete(t), super.set(t, e)), e;
  }
  set(t, e) {
    if (super.set(t, e), this.maxSize && this.size > this.maxSize) {
      const r = this.keys().next().value;
      r && this.delete(r);
    }
    return this;
  }
}
const Qs = /* @__PURE__ */ new fu(8192);
function B0(n, t) {
  if (Qs.has(`${n}.${t}`))
    return Qs.get(`${n}.${t}`);
  const e = n.substring(2).toLowerCase(), r = uu(iu(e), "bytes"), s = e.split("");
  for (let o = 0; o < 40; o += 2)
    r[o >> 1] >> 4 >= 8 && s[o] && (s[o] = s[o].toUpperCase()), (r[o >> 1] & 15) >= 8 && s[o + 1] && (s[o + 1] = s[o + 1].toUpperCase());
  const i = `0x${s.join("")}`;
  return Qs.set(`${n}.${t}`, i), i;
}
const R0 = /^0x[a-fA-F0-9]{40}$/, $s = /* @__PURE__ */ new fu(8192);
function Fa(n, t) {
  const { strict: e = !0 } = t ?? {}, r = `${n}.${e}`;
  if ($s.has(r))
    return $s.get(r);
  const s = R0.test(n) ? n.toLowerCase() === n ? !0 : e ? B0(n) === n : !0 : !1;
  return $s.set(r, s), s;
}
function k0(n) {
  return typeof n[0] == "string" ? D0(n) : U0(n);
}
function U0(n) {
  let t = 0;
  for (const s of n)
    t += s.length;
  const e = new Uint8Array(t);
  let r = 0;
  for (const s of n)
    e.set(s, r), r += s.length;
  return e;
}
function D0(n) {
  return `0x${n.reduce((t, e) => t + e.replace("0x", ""), "")}`;
}
const L0 = (n, t, e) => JSON.stringify(n, (r, s) => typeof s == "bigint" ? s.toString() : s, e), _0 = (n) => n;
class F0 extends le {
  constructor({ body: t, error: e, url: r }) {
    super("RPC Request failed.", {
      cause: e,
      details: e.message,
      metaMessages: [`URL: ${_0(r)}`, `Request body: ${L0(t)}`],
      name: "RpcRequestError"
    }), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.code = e.code, this.data = e.data;
  }
}
const M0 = -1;
class H0 extends le {
  constructor(t, { code: e, docsPath: r, metaMessages: s, name: i, shortMessage: o }) {
    super(o, {
      cause: t,
      docsPath: r,
      metaMessages: s || t?.metaMessages,
      name: i || "RpcError"
    }), Object.defineProperty(this, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.name = i || t.name, this.code = t instanceof F0 ? t.code : e ?? M0;
  }
}
class hu extends H0 {
  constructor(t, e) {
    super(t, e), Object.defineProperty(this, "data", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.data = e.data;
  }
}
const G0 = `Ethereum Signed Message:
`;
function V0(n) {
  const t = typeof n == "string" ? Ei(n) : typeof n.raw == "string" ? n.raw : Yi(n.raw), e = Ei(`${G0}${bi(t)}`);
  return k0([e, t]);
}
function z0(n, t) {
  return uu(V0(n), t);
}
class Q0 extends ls {
  wallet;
  internalSigner;
  constructor(t) {
    const e = qi();
    if (!e)
      throw R("OASIS_WALLET_NOT_INITIALIZED");
    super(t || e.getRpcProviderForChainId(e.defaultNetworkId)), this.internalSigner = new Ma(
      t || e.getRpcProviderForChainId(e.defaultNetworkId),
      e
    ), this.wallet = e, e.events.on("dataUpdated", ({ name: r, newValue: s }) => {
      r === "defaultNetworkId" && (this.internalSigner = new Ma(
        e.getRpcProviderForChainId(s),
        this.wallet
      ));
    });
  }
  connect() {
    return this.internalSigner;
  }
  async getAddress() {
    return await this.wallet.getAccountAddress() || "";
  }
  async signTransaction(t, e = !0) {
    return this.internalSigner.signTransaction(t, e);
  }
  async signMessage(t, e = !0) {
    return this.internalSigner.signMessage(t, e);
  }
  async sendTransaction(t) {
    return this.internalSigner.sendTransaction(t);
  }
  /**
   * NOT implemented
   */
  async signTypedData(t, e, r) {
    return console.error("EmbeddedEthersSigner#signTypedData Not implemented", { domain: t, types: e, value: r }), "";
  }
  /**
   * @deprecated v5 signer properties
   */
  _isSigner = !0;
  async getBalance(t) {
    return this.internalSigner.getBalance(t);
  }
  async getTransactionCount(t) {
    return this.internalSigner.getTransactionCount(t);
  }
  async getChainId() {
    return this.internalSigner.getChainId();
  }
  async getGasPrice() {
    return this.internalSigner.getGasPrice();
  }
  async getFeeData() {
    return this.internalSigner.getFeeData();
  }
}
class Ma extends ls {
  // address = '';
  // override provider: ethers.JsonRpcProvider;
  constructor(t, e) {
    super(t), this.wallet = e;
  }
  connect() {
    return this;
  }
  async getAddress() {
    return await this.wallet.getAccountAddress() || "";
  }
  async signTransaction(t, e = !0) {
    return (await this.wallet.signPlainTransaction({
      strategy: this.wallet.lastAccount.authStrategy,
      authData: {
        username: this.wallet.lastAccount.username
      },
      mustConfirm: e,
      tx: await this.populateTransaction(t)
    }))?.signedTxData || "";
  }
  async signMessage(t, e = !0) {
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
  /**
   * @deprecated v5 signer properties
   */
  _isSigner = !0;
  async getBalance(t) {
    return await this.provider.getBalance(await this.getAddress(), t);
  }
  async getTransactionCount(t) {
    return await this.provider.getTransactionCount(await this.getAddress(), t);
  }
  async getChainId() {
    return (await this.provider.getNetwork()).chainId;
  }
  async getGasPrice() {
    return (await this.provider.getFeeData()).gasPrice;
  }
  async getFeeData() {
    return await this.provider.getFeeData();
  }
}
function $0(n) {
  if (typeof n == "string") {
    if (!Fa(n, { strict: !1 }))
      throw new _a({ address: n });
    return {
      address: n,
      type: "json-rpc"
    };
  }
  if (!Fa(n.address, { strict: !1 }))
    throw new _a({ address: n.address });
  return {
    address: n.address,
    nonceManager: n.nonceManager,
    sign: n.sign,
    experimental_signAuthorization: n.experimental_signAuthorization,
    signMessage: n.signMessage,
    signTransaction: n.signTransaction,
    signTypedData: n.signTypedData,
    source: "custom",
    type: "local"
  };
}
class K0 {
  address = "";
  wallet;
  constructor() {
    const t = qi();
    t || R("OASIS_WALLET_NOT_INITIALIZED"), this.wallet = t;
  }
  getAccount() {
    return $0({
      address: this.wallet.lastAccount.wallets[this.wallet.lastAccount.walletIndex].address,
      signMessage: async ({ message: t }, e = !0) => {
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
      signTransaction: async (t, e, r = !0) => {
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
class Dr extends hu {
  constructor() {
    super(new Error(Ai[rt.OASIS_WALLET_NOT_INITIALIZED]), {
      code: 4900,
      shortMessage: "Disconnected"
    });
  }
}
class J0 extends hu {
  constructor() {
    super(new Error("Request rejected by user"), {
      code: 4001,
      shortMessage: "User Rejected Request"
    });
  }
}
async function Z0(n) {
  const t = await qn();
  t && (t.events.on("connect", (e) => n.emit("connect", e)), t.events.on("disconnect", (e) => n.emit("disconnect", e)), t.events.on("chainChanged", (e) => n.emit("chainChanged", e)), t.events.on("accountsChanged", (e) => n.emit("accountsChanged", e)));
}
function aw() {
  const n = Ga();
  Z0(n);
  const t = async ({ method: s, params: i }) => {
    const o = await qn();
    if (!o)
      throw new Dr();
    console.log([s, i]);
    let a = null;
    switch (s) {
      /**
       * Return an address to be identified by.
       * If not logged in, trigger login SDK event (open modal, wait for auth...)
       */
      case "eth_requestAccounts": {
        if (o.lastAccount.wallets[o.lastAccount.walletIndex].address) {
          a = [o.lastAccount.wallets[o.lastAccount.walletIndex].address];
          break;
        }
        const c = await o.waitForAccount();
        if (!c)
          throw new J0();
        a = [c];
        break;
      }
      case "eth_accounts": {
        if (o.lastAccount.wallets[o.lastAccount.walletIndex].address) {
          a = [o.lastAccount.wallets[o.lastAccount.walletIndex].address];
          break;
        }
        a = [];
        break;
      }
      /**
       * Sign string message
       */
      case "personal_sign": {
        a = await o.signMessage({
          mustConfirm: !0,
          strategy: "passkey",
          message: z0(Yy(i[0]))
        });
        break;
      }
      /**
       * Sign string message (reversed params)
       */
      case "eth_sign": {
        a = await o.signMessage({
          mustConfirm: !0,
          strategy: "passkey",
          message: i[1]
        });
        break;
      }
      /**
       * Return signed tx
       */
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
      /**
       * Change chain, emit 'chainChanged' on success
       */
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
      /**
       * Pass through to JsonRpcProvider ?
       */
      default: {
        a = await o.getRpcProviderForChainId(o.defaultNetworkId).send(s, i);
        break;
      }
    }
    return console.log("====", s), console.log(a), a;
  }, e = async () => {
    const s = await qn();
    if (!s)
      throw new Dr();
    return new Q0(s.getRpcProviderForChainId(s.defaultNetworkId));
  }, r = async () => {
    if (!qn())
      throw new Dr();
    return new K0().getAccount();
  };
  return {
    on: n.on,
    removeListener: n.off,
    request: t,
    getSigner: e,
    getAccount: r
  };
}
class W0 {
  // monitor if popup was closed
  constructor(t, e = "redirect") {
    this.clientId = t, this.mode = e, e !== "standalone" && e !== "iframe" && (window.addEventListener("message", this.onResponse.bind(this)), this.initIframe());
  }
  src = "https://localhost:5175";
  promises = [];
  lastEventId = 0;
  // use this to match iframe response with promise resolvers
  iframe;
  iframeLoadPromise;
  isIframeLoaded = !1;
  popup = null;
  popupLoadPromise;
  isPopupLoaded = !1;
  popupCheckInterval = null;
  onResponse(t) {
    if (t?.data?.type === "apillon_pk_response" || t?.data?.type === "apillon_pk_error") {
      const e = this.promises.findIndex((r) => r.id === t.data.id);
      e > -1 && (t.data.type === "apillon_pk_response" ? this.promises[e].resolve(t.data.content) : this.promises[e].reject(t.data.content), this.promises.splice(e, 1)), this.popupCheckInterval && (clearInterval(this.popupCheckInterval), this.popupCheckInterval = null), this.popup && (this.popup.close(), this.popup = null), this.isPopupLoaded = !1, this.popupLoadPromise = void 0;
    } else t?.data?.type === "apillon_pk_load" && (this.isPopupLoaded = !0, this.popupLoadPromise && (this.popupLoadPromise.resolve(), this.popupLoadPromise = void 0));
  }
  async initIframe() {
    if (!window) {
      R("XDOMAIN_NOT_INIT");
      return;
    }
    if (this.iframeLoadPromise && (await this.iframeLoadPromise, await new Promise((e) => setTimeout(e, 150)), this.iframe))
      return;
    const t = document.createElement("iframe");
    this.iframeLoadPromise = new Promise((e) => {
      t.addEventListener(
        "load",
        () => {
          this.isIframeLoaded = !0, e();
        },
        { once: !0 }
      );
    }), t.setAttribute("src", `${this.src}?clientId=${this.clientId}`), t.setAttribute("allow", `publickey-credentials-get ${this.src}`), t.style.pointerEvents = "none", t.style.width = "1px", t.style.height = "1px", t.style.overflow = "hidden", t.style.opacity = "0", this.iframe = t, document.body.appendChild(t), await this.iframeLoadPromise, await new Promise((e) => setTimeout(e, 150));
  }
  async openPopup(t) {
    if (this.popup && (this.popup.close(), this.popup = null), this.popupCheckInterval && (clearInterval(this.popupCheckInterval), this.popupCheckInterval = null), setTimeout(() => {
      this.popup = window.open(
        this.mode === "tab_form" ? `${this.src}?tab=1&${[
          `clientId=${this.clientId}`,
          `username=${encodeURIComponent(t || "")}`
        ].join("&")}` : `${this.src}?popup=1`,
        "_blank",
        this.mode === "tab_form" ? void 0 : [
          "width=400",
          "height=400",
          `left=${Math.round(window.innerWidth / 2 + window.screenX - 400 / 2)}`,
          `top=${Math.round(window.innerHeight / 2 + window.screenY - 400 / 2)}`,
          "location=no",
          "resizable=no"
        ].join(",")
      );
    }, 1), await new Promise((e) => setTimeout(e, 20)), !this.popup || this.popup.closed || typeof this.popup.closed > "u")
      return R("XDOMAIN_BLOCKED");
    try {
      this.popup.focus();
    } catch {
      return R("XDOMAIN_BLOCKED");
    }
    this.popupCheckInterval = setInterval(() => {
      if (this.popup?.closed) {
        for (const e of this.promises)
          e.reject(Ai[rt.XDOMAIN_STOPPED]);
        this.promises = [], this.popupLoadPromise && this.popupLoadPromise.reject(Ai[rt.XDOMAIN_STOPPED]), this.popupCheckInterval && (clearInterval(this.popupCheckInterval), this.popupCheckInterval = null), this.popup = null, this.popupLoadPromise = void 0, this.isPopupLoaded = !1;
      } else this.popup?.closed === void 0 && this.popupCheckInterval && (clearInterval(this.popupCheckInterval), this.popupCheckInterval = null, this.popupLoadPromise = void 0, this.isPopupLoaded = !1);
    }, 500), await new Promise((e, r) => {
      if (this.isPopupLoaded)
        return e();
      this.popupLoadPromise = { resolve: e, reject: r };
    });
  }
  /**
   * Create credentials through popup window. Not available in iframe!
   */
  async create(t, e) {
    if (await this.openPopup(e), !this.popup)
      return R("XDOMAIN_NOT_INIT");
    const r = this.getEventId();
    return this.popup.postMessage(
      {
        type: "create_pk_credentials",
        id: r,
        content: {
          hashedUsername: t,
          username: e
        }
      },
      this.src
    ), new Promise((s, i) => {
      this.promises.push({
        id: r,
        resolve: s,
        reject: i
      });
    });
  }
  async createViaTab(t) {
    if (await this.openPopup(t), !this.popup)
      return R("XDOMAIN_NOT_INIT");
    const e = this.getEventId();
    return this.popup.postMessage(
      {
        type: "save_pk_event_id",
        id: e
      },
      this.src
    ), new Promise((r, s) => {
      this.promises.push({
        id: e,
        resolve: r,
        reject: s
      });
    });
  }
  /**
   * Get credentials -- always through iframe.
   */
  async get(t, e) {
    if ((!this.iframe || !this.isIframeLoaded) && (await this.initIframe(), !this.iframe))
      return R("XDOMAIN_NOT_INIT");
    this.iframe.focus(), Fy() && setTimeout(() => {
      this.iframe?.contentWindow?.focus();
    }, 10), await new Promise((s) => setTimeout(s, 100));
    const r = this.getEventId();
    return this.iframe.contentWindow?.postMessage(
      {
        type: "get_pk_credentials",
        id: r,
        content: {
          credentials: t,
          challenge: e
        }
      },
      this.src
    ), new Promise((s, i) => {
      this.promises.push({
        id: r,
        resolve: s,
        reject: i
      });
    });
  }
  /**
   * Gateway localStorage get
   * @param isSession Use sessionStorage instead of localStorage
   */
  async storageGet(t, e = !1) {
    if ((!this.iframe || !this.isIframeLoaded) && (await this.initIframe(), !this.iframe))
      return R("XDOMAIN_NOT_INIT");
    await new Promise((s) => setTimeout(s, 100));
    const r = this.getEventId();
    return this.iframe.contentWindow?.postMessage(
      {
        type: "storage_get",
        id: r,
        content: {
          key: t,
          isSession: e
        }
      },
      this.src
    ), new Promise((s, i) => {
      this.promises.push({
        id: r,
        resolve: s,
        reject: i
      });
    });
  }
  /**
   * Gateway localStorage set
   */
  storageSet(t, e, r = !1) {
    if (!this.iframe)
      return R("XDOMAIN_NOT_INIT");
    const s = this.getEventId();
    this.iframe.contentWindow?.postMessage(
      {
        type: "storage_set",
        id: s,
        content: { key: t, value: e, isSession: r }
      },
      this.src
    );
  }
  getEventId() {
    return this.lastEventId += 1, this.lastEventId;
  }
}
class du {
  sapphireProvider;
  sapphireChainId = 0;
  accountManagerAddress;
  accountManagerContract;
  abiCoder = De.defaultAbiCoder();
  events;
  apillonClientId;
  xdomain;
  defaultNetworkId = 0;
  rpcUrls = {};
  rpcProviders = {};
  explorerUrls = {
    [ir]: "https://explorer.oasis.io/mainnet/sapphire",
    [or]: "https://explorer.oasis.io/testnet/sapphire"
  };
  lastAccount = {
    contractAddress: "",
    username: "",
    authStrategy: "passkey",
    wallets: [],
    walletIndex: 0
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
    if (this.sapphireProvider = new _y([
      "https://testnet.sapphire.oasis.io"
    ]), this.loadSapphireChainId(), this.accountManagerAddress = "0x8830d613c7Cd114cA6d71dd5cE0691622c626bCc", this.accountManagerContract = new qe(
      this.accountManagerAddress,
      us,
      new Kr(Bn, this.sapphireProvider)
    ), this.defaultNetworkId = t?.defaultNetworkId || this.defaultNetworkId, t?.networks)
      for (const e of t.networks)
        this.rpcUrls[e.id] = e.rpcUrl, this.explorerUrls[e.id] = e.explorerUrl;
    this.events = Ga(), this.apillonClientId = t?.clientId || "", this.xdomain = new W0(this.apillonClientId, t?.passkeyAuthMode || "redirect");
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
    return this.sapphireProvider || R("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), await this.accountManagerContract.userExists(
      await te(t)
    ) || !1;
  }
  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   *
   * @param skipAccountWallets  Dont make another request for listing the wallets on account
   * @param origin  Add custom header for origin website
   */
  async register(t, e, r, s = !1, i) {
    if (!this.sapphireProvider)
      return R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    if (!this.accountManagerContract)
      return R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    let o;
    t === "password" ? o = await new Tr(this).getRegisterData(e) : t === "passkey" && (o = await new Cr(this).getRegisterData({
      ...e,
      hashedUsername: r
    }));
    const a = this.abiCoder.encode(
      ["tuple(bytes funcData, uint8 txType)"],
      [
        {
          funcData: this.abiCoder.encode(
            [
              // AccountManagerAbi createAccount
              "tuple(bytes32 hashedUsername, bytes credentialId, tuple(uint8 kty, int8 alg, uint8 crv, uint256 x, uint256 y) pubkey, bytes32 optionalPassword, tuple(uint8 walletType, bytes32 keypairSecret) wallet)"
            ],
            [o]
          ),
          txType: 0
        }
      ]
    ), c = (await this.sapphireProvider.getFeeData()).gasPrice, l = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    ), u = await this.getApillonSignature(a, i);
    if (!u.signature)
      return R("CANT_GET_SIGNATURE");
    const f = await this.accountManagerContract.generateGaslessTx(
      a,
      l,
      u.gasPrice ? BigInt(u.gasPrice) : c,
      u.gasLimit ? BigInt(u.gasLimit) : 1000000n,
      BigInt(u.timestamp),
      u.signature
    ), h = await this.sapphireProvider.send("eth_sendRawTransaction", [f]);
    if (await this.waitForTxReceipt(h))
      return s ? "" : await this.finalizeAccountAuth(t, e);
  }
  /**
   * Check that credentials belong to some account.
   */
  async authenticate(t, e) {
    if (!this.sapphireProvider) {
      R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
      return;
    }
    if (!this.accountManagerContract) {
      R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
      return;
    }
    if (!e.username) {
      R("NO_USERNAME");
      return;
    }
    return await this.getAccountWallets({ authData: e, strategy: t, reload: !0 }), await this.finalizeAccountAuth(t, e);
  }
  /**
   * Return public address for username.
   */
  async getAccountAddress(t, e) {
    if (!this.sapphireProvider) {
      R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
      return;
    }
    if (!this.accountManagerContract) {
      R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
      return;
    }
    if (this.lastAccount.wallets.length || await this.getAccountWallets({ authData: e, strategy: t }), !e?.username) {
      if (this.lastAccount.wallets.length > this.lastAccount.walletIndex)
        return this.lastAccount.wallets[this.lastAccount.walletIndex].address;
      R("NO_USERNAME");
      return;
    }
    if (this.lastAccount.wallets.length)
      return this.lastAccount.wallets.length > this.lastAccount.walletIndex ? this.lastAccount.wallets[this.lastAccount.walletIndex].address : (this.events.emit("dataUpdated", {
        name: "walletIndex",
        newValue: 0,
        oldValue: this.lastAccount.walletIndex
      }), this.lastAccount.walletIndex = 0, this.lastAccount.wallets[this.lastAccount.walletIndex].address);
    R("CANT_GET_ACCOUNT_ADDRESS");
  }
  async getAccountBalance(t, e = this.defaultNetworkId, r = 18) {
    if (!e || !this.rpcUrls[e] && Vs(e))
      return go(await this.sapphireProvider?.getBalance(t) || 0n, r);
    if (!this.rpcUrls[e])
      return "0";
    const s = this.rpcProviders[e] || new Jr(this.rpcUrls[e]);
    return go(await s.getBalance(t), r);
  }
  async getAccountPrivateKey(t = {}) {
    this.sapphireProvider || R("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), t.strategy || (t.strategy = this.lastAccount.authStrategy), t.authData || (t.strategy === "passkey" && this.lastAccount.username ? t.authData = {
      username: this.lastAccount.username
    } : R("AUTHENTICATION_DATA_NOT_PROVIDED"));
    const e = new _t($n), r = e.encodeFunctionData("exportPrivateKey", [
      t.walletIndex || this.lastAccount.walletIndex
    ]), s = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      r,
      t.authData
    );
    if (s) {
      const [i] = e.decodeFunctionResult("exportPrivateKey", s).toArray();
      return i;
    }
  }
  // #endregion
  // #region Account wallets
  /**
   * Get all wallets added on user's account. Requires authentication.
   * @param reload Ignore cache and get wallets from contract again
   */
  async getAccountWallets(t = {}) {
    if (!this.sapphireProvider) {
      R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
      return;
    }
    if (!this.accountManagerContract) {
      R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
      return;
    }
    if (!t.reload && this.lastAccount.wallets.length)
      return this.lastAccount.wallets;
    if (t.strategy || (t.strategy = this.lastAccount.authStrategy), !t.authData || !t.authData.username)
      if (t.strategy === "passkey" && this.lastAccount.username)
        t.authData = {
          username: this.lastAccount.username
        };
      else {
        R("AUTHENTICATION_DATA_NOT_PROVIDED");
        return;
      }
    if (!this.lastAccount.contractAddress) {
      const i = await te(t.authData.username);
      this.lastAccount.contractAddress = await this.accountManagerContract.getAccount(
        i,
        BigInt(en.EVM)
      ), this.events.emit("dataUpdated", {
        name: "contractAddress",
        newValue: this.lastAccount.contractAddress,
        oldValue: ""
      });
    }
    const e = new _t($n), r = e.encodeFunctionData("getWalletList", []), s = await this.getProxyForStrategy(t.strategy, r, t.authData);
    if (s) {
      const [i] = e.decodeFunctionResult("getWalletList", s).toArray();
      if (Array.isArray(i) && i.length) {
        const o = i.map(
          (a, c) => ({
            walletType: en.EVM,
            address: `0x${a.slice(-40)}`,
            index: c
          })
        ).filter((a) => !!a);
        return this.events.emit("dataUpdated", {
          name: "wallets",
          newValue: o,
          oldValue: this.lastAccount.wallets
        }), this.lastAccount.wallets = o, o;
      }
      R("CANT_GET_ACCOUNT_WALLETS");
    }
  }
  /**
   * Add new wallet or import from privateKey.
   * Returns tx hash on success.
   */
  async addAccountWallet(t) {
    if (!this.sapphireProvider) {
      R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
      return;
    }
    if (!this.accountManagerContract) {
      R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
      return;
    }
    if (t.strategy || (t.strategy = this.lastAccount.authStrategy), t.walletType || (t.walletType = en.EVM), !t.authData)
      if (t.strategy === "passkey" && this.lastAccount.username)
        t.authData = {
          username: this.lastAccount.username
        };
      else {
        R("AUTHENTICATION_DATA_NOT_PROVIDED");
        return;
      }
    const e = this.abiCoder.encode(
      ["tuple(uint256 walletType, bytes32 keypairSecret)"],
      [
        {
          walletType: BigInt(t.walletType),
          keypairSecret: t.privateKey || We
        }
      ]
    );
    let r = Ur.AddWallet, s = "";
    t.strategy === "passkey" ? (r = Ur.AddWallet, s = "tuple(bytes32 credentialIdHashed, (bytes authenticatorData, (uint8 t, string k, string v)[] clientDataTokens, uint256 sigR, uint256 sigS) resp, bytes data)") : t.strategy === "password" && (r = Ur.AddWalletPassword, s = "tuple(bytes32 hashedUsername, bytes32 digest, bytes data)");
    const i = await this.processGaslessMethod({
      label: t.privateKey ? "Import new account" : "Add new account",
      strategy: t.strategy,
      authData: t.authData,
      data: e,
      txType: r,
      funcDataTypes: s,
      funcDataValuesFormatter(o) {
        return o.credentials.passkey ? {
          ...o.credentials.passkey,
          data: e
        } : o.credentials.password ? {
          hashedUsername: o.hashedUsername,
          digest: o.credentials.password,
          data: e
        } : {};
      }
    });
    if (i)
      return i;
    R("CANT_GET_WALLET_ADDRESS");
  }
  // #endregion
  // #region Auth helpers
  /**
   * Handler for getting signature.
   *
   * The request is limited to whitelisted domains determined by client integration ID.
   */
  async getApillonSignature(t, e) {
    if (!this.apillonClientId)
      return R("NO_APILLON_CLIENT_ID"), { signature: "", gasLimit: 0, timestamp: 0 };
    const r = await (await fetch(
      "https://api-dev.apillon.io/embedded-wallet/signature",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: t,
          integration_uuid: this.apillonClientId,
          ...e ? { referrerDomain: e } : {}
        })
      }
    )).json();
    if (r.data)
      return {
        signature: r.data.signature,
        gasLimit: r.data.gasLimit || 0,
        gasPrice: r.data.gasPrice || 0,
        timestamp: r.data.timestamp
      };
    if (r.code && Ta[r.code])
      throw new Error(Ta[r.code]);
    return { signature: "", gasLimit: 0, timestamp: 0 };
  }
  setAccount(t) {
    typeof t.username < "u" && t.username !== this.lastAccount.username && (this.events.emit("dataUpdated", {
      name: "username",
      newValue: t.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.username = t.username), typeof t.walletIndex < "u" && t.walletIndex >= 0 && t.walletIndex !== this.lastAccount.walletIndex && (this.events.emit("dataUpdated", {
      name: "walletIndex",
      newValue: t.walletIndex,
      oldValue: this.lastAccount.walletIndex
    }), this.lastAccount.walletIndex = t.walletIndex), typeof t.strategy < "u" && t.strategy !== this.lastAccount.authStrategy && (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t.strategy,
      oldValue: this.lastAccount.authStrategy
    }), this.lastAccount.authStrategy = t.strategy), typeof t.contractAddress < "u" && t.contractAddress !== this.lastAccount.contractAddress && (this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t.contractAddress,
      oldValue: this.lastAccount.contractAddress
    }), this.lastAccount.contractAddress = t.contractAddress), Array.isArray(t.wallets) && t.wallets.length !== this.lastAccount.wallets.length && (this.events.emit("dataUpdated", {
      name: "wallets",
      newValue: t.wallets,
      oldValue: this.lastAccount.wallets
    }), this.lastAccount.wallets = [...t.wallets]);
  }
  setWallets(t) {
    this.events.emit("dataUpdated", {
      name: "wallets",
      newValue: t,
      oldValue: this.lastAccount.wallets
    }), this.lastAccount.wallets = t;
  }
  /**
   * Get a wallet address for account and pass it to listeners.
   * Update the stored lastAccount.
   * This process includes getting all wallets (getAccountWallets) which requires authentication (when no cache is available).
   */
  async finalizeAccountAuth(t, e) {
    const r = await this.getAccountAddress(t, e);
    return r && this.waitForAccountResolver && (this.waitForAccountResolver(r), this.waitForAccountResolver = null), r && this.events.emit("accountsChanged", [r]), this.events.emit("dataUpdated", {
      name: "authStrategy",
      newValue: t,
      oldValue: this.lastAccount.authStrategy
    }), this.events.emit("dataUpdated", {
      name: "username",
      newValue: e.username,
      oldValue: this.lastAccount.username
    }), this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, r;
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
    this.sapphireProvider || R("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), t.strategy || (t.strategy = this.lastAccount.authStrategy), t.authData || (t.strategy === "passkey" && this.lastAccount.username ? t.authData = {
      username: this.lastAccount.username
    } : R("AUTHENTICATION_DATA_NOT_PROVIDED"));
    const e = new _t($n);
    let r = t.data || "";
    const s = t.message;
    if ((!r || t.mustConfirm) && (typeof t.message == "string" && !t.message.startsWith("0x") && (t.message = Od(t.message)), r = e.encodeFunctionData("sign", [
      t.walletIndex || this.lastAccount.walletIndex,
      t.message
    ]), t.mustConfirm))
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
    const i = await this.getProxyForStrategy(t.strategy, r, t.authData);
    if (i) {
      const [o] = e.decodeFunctionResult("sign", i).toArray();
      if (Array.isArray(o) && o.length > 2) {
        const a = pt.from({
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
    if (await this.handleNetworkChange(e), t.tx.chainId = e, t.strategy || (t.strategy = this.lastAccount.authStrategy), t.walletIndex || (t.walletIndex = this.lastAccount.walletIndex), !t.authData)
      if (t.strategy === "passkey" && this.lastAccount.username)
        t.authData = {
          username: this.lastAccount.username
        };
      else
        return R("AUTHENTICATION_DATA_NOT_PROVIDED");
    if (t.tx.data || (t.tx.data = "0x"), t.tx.nonce || (t.tx.nonce = await this.getRpcProviderForChainId(e).getTransactionCount(
      this.lastAccount.wallets[this.lastAccount.walletIndex].address
    )), t.tx.type === "eip1559" && (t.tx.type = 2, t.tx.gasLimit = t.tx.gas), !t.tx.gasPrice) {
      const o = await this.getRpcProviderForChainId(t.tx.chainId).getFeeData();
      t.tx.gasPrice = o.gasPrice, o.maxPriorityFeePerGas && (t.tx.maxPriorityFeePerGas = o.maxPriorityFeePerGas), o.maxFeePerGas ? t.tx.maxFeePerGas = o.maxFeePerGas : t.tx.maxFeePerGas = BigInt(o.gasPrice || 0) * BigInt(2) + (o.maxPriorityFeePerGas || 0n);
    }
    if (!t.tx.gasLimit) {
      const o = await this.getRpcProviderForChainId(t.tx.chainId).estimateGas(t.tx);
      t.tx.gasLimit = o ? Math.floor(Number(o) * 1.01) : 1e6;
    }
    if ((t.tx.type === 2 && !t.tx.value || "value" in t.tx && (typeof t.tx.value > "u" || t.tx.value === null)) && (t.tx.value = 0n), t.mustConfirm)
      return await new Promise((o, a) => {
        this.events.emit("txApprove", {
          plain: { ...t, mustConfirm: !1, resolve: o, reject: a }
        });
      });
    const r = new _t($n), s = r.encodeFunctionData("signEIP155", [
      t.walletIndex || this.lastAccount.walletIndex,
      t.tx
    ]), i = await this.getProxyForStrategy(t.strategy, s, t.authData);
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
  async broadcastTransaction(t, e, r = "Transaction", s) {
    const i = this.getRpcProviderForChainId(e), o = await i.send("eth_sendRawTransaction", [t]), a = {
      hash: o,
      label: r,
      rawData: t,
      owner: this.lastAccount.wallets[this.lastAccount.walletIndex].address || "none",
      status: "pending",
      chainId: e || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[e || this.defaultNetworkId] ? `${this.explorerUrls[e || this.defaultNetworkId]}/tx/${o}` : "",
      createdAt: Date.now(),
      internalLabel: s
    };
    return this.events.emit("txSubmitted", a), {
      txHash: o,
      ethProvider: i,
      txItem: a
    };
  }
  /**
   * Prepare tx and emit `txSubmitted` event (to show tx in tx history in UI e.g.)
   */
  submitTransaction(t, e, r, s = "Transaction", i) {
    const o = {
      hash: t,
      label: s,
      rawData: e || "",
      owner: this.lastAccount.wallets[this.lastAccount.walletIndex].address || "none",
      status: "pending",
      chainId: r || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[r || this.defaultNetworkId] ? `${this.explorerUrls[r || this.defaultNetworkId]}/tx/${t}` : "",
      createdAt: Date.now(),
      internalLabel: i
    };
    return this.events.emit("txSubmitted", o), o;
  }
  /**
   * Get signed tx for making a contract write call.
   */
  async signContractWrite(t) {
    const e = this.validateChainId(t.chainId);
    if (await this.handleNetworkChange(e), t.strategy || (t.strategy = this.lastAccount.authStrategy), t.walletIndex || (t.walletIndex = this.lastAccount.walletIndex), !t.authData)
      if (t.strategy === "passkey" && this.lastAccount.username)
        t.authData = {
          username: this.lastAccount.username
        };
      else {
        R("AUTHENTICATION_DATA_NOT_PROVIDED");
        return;
      }
    const r = this.lastAccount.wallets[t.walletIndex]?.address;
    if (!r) {
      R("CANT_GET_ACCOUNT_ADDRESS");
      return;
    }
    if (t.mustConfirm)
      return await new Promise((u, f) => {
        this.events.emit("txApprove", {
          contractWrite: { ...t, mustConfirm: !1, resolve: u, reject: f }
        });
      });
    const i = new _t(t.contractAbi).encodeFunctionData(
      t.contractFunctionName,
      t.contractFunctionValues
    ), o = await new Kr(
      r,
      this.getRpcProviderForChainId(e)
    ).populateTransaction({
      from: r,
      to: t.contractAddress,
      value: 0,
      data: i
    });
    if (!o.gasPrice) {
      const u = await this.getRpcProviderForChainId(t.chainId).getFeeData();
      o.gasPrice = u.gasPrice || 2e10, u.maxPriorityFeePerGas && (o.maxPriorityFeePerGas = u.maxPriorityFeePerGas), u.maxFeePerGas ? o.maxFeePerGas = u.maxFeePerGas : o.maxFeePerGas = BigInt(u.gasPrice || 0) * BigInt(2) + (u.maxPriorityFeePerGas || 0n);
    }
    if (!o.gasLimit) {
      const u = await this.getRpcProviderForChainId(t.chainId).estimateGas(o);
      o.gasLimit = u ? Math.floor(Number(u) * 1.01) : 1e6;
    }
    const a = new _t($n), c = a.encodeFunctionData("signEIP155", [t.walletIndex, o]), l = await this.getProxyForStrategy(t.strategy, c, t.authData);
    if (l) {
      const [u] = a.decodeFunctionResult("signEIP155", l).toArray();
      return t.resolve && t.resolve({
        signedTxData: u,
        chainId: e
      }), {
        signedTxData: u,
        chainId: e
      };
    }
  }
  /**
   * Get result of contract read.
   * Utility function, this has nothing to do with Oasis.
   */
  async contractRead(t) {
    const e = this.validateChainId(t.chainId), r = this.getRpcProviderForChainId(e);
    await this.handleNetworkChange(e);
    const s = new qe(t.contractAddress, t.contractAbi, r);
    return t.contractFunctionValues ? await s[t.contractFunctionName](...t.contractFunctionValues) : await s[t.contractFunctionName]();
  }
  /**
   * Call an `Account Manager` contract method with a gasless transaction.
   * This means that app owner (clientId) pays for the transaction fees instead of user.
   * These methods must be supported by `generateGaslessTx` method on the contract.
   * Supported methods are defined by `GaslessTxType`.
   * About
   * - get & confirm credentials
   * - calculate and format tx data (according to `funcDataTypes` and `funcDataValuesFormatter` params)
   * - broadcast the tx (marked with `label` from params)
   */
  async processGaslessMethod(t) {
    if (!this.sapphireProvider)
      return R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    if (!this.accountManagerContract)
      return R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    if (t.authData.hashedUsername || (t.authData.hashedUsername = await te(t.authData.username)), !t.authData.hashedUsername) {
      R("CANT_HASH_USERNAME");
      return;
    }
    const e = {
      [t.strategy]: await this.getCredentialsForStrategy(
        t.strategy,
        t.data,
        t.authData
      )
    }, r = t.funcDataValuesFormatter({
      credentials: e,
      hashedUsername: t.authData.hashedUsername
    }), s = this.abiCoder.encode(
      ["tuple(bytes funcData, uint8 txType)"],
      [
        {
          funcData: this.abiCoder.encode([t.funcDataTypes], [r]),
          txType: t.txType
        }
      ]
    ), i = (await this.sapphireProvider.getFeeData()).gasPrice, o = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    ), a = await this.getApillonSignature(s);
    if (!a.signature)
      return R("CANT_GET_SIGNATURE");
    const c = await this.accountManagerContract.generateGaslessTx(
      s,
      o,
      a.gasPrice ? BigInt(a.gasPrice) : i,
      a.gasLimit ? BigInt(a.gasLimit) : 1000000n,
      BigInt(a.timestamp),
      a.signature
    ), l = await this.broadcastTransaction(
      c,
      this.sapphireChainId,
      t.label || "Gasless Transaction",
      t.internalLabel || `gasless_${t.txType}`
    );
    if (l.txHash)
      return l.txHash;
  }
  // #endregion
  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(t, e, r) {
    if (this.accountManagerContract || R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), t === "password")
      return await new Tr(this).getProxyResponse(e, r);
    if (t === "passkey")
      return await new Cr(this).getProxyResponse(e, r);
  }
  /**
   * Use signContractWrite to invoke an account manager method and broadcast the tx
   * @returns txHash | undefined
   */
  async proxyWriteForStrategy(t, e, r, s, i, o = !1) {
    this.accountManagerContract || R("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    const a = Ly[e][t];
    if (t === "password")
      return await new Tr(this).proxyWrite(
        a,
        r,
        s,
        i,
        o
      );
    if (t === "passkey")
      return await new Cr(this).proxyWrite(
        a,
        r,
        s,
        i,
        o
      );
  }
  async getCredentialsForStrategy(t, e, r) {
    const s = r.hashedUsername || await te(r.username);
    if (t === "password")
      return await new Tr(this).getCredentials(e, { ...r, hashedUsername: s });
    if (t === "passkey")
      return await new Cr(this).getPasskeyForMode(
        this?.xdomain?.mode || "standalone",
        s,
        e
      );
  }
  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(t, e) {
    !e && !this.sapphireProvider && R("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
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
    return this.rpcUrls[t] || t === ir || t === or ? (this.events.emit("dataUpdated", {
      name: "defaultNetworkId",
      newValue: t,
      oldValue: this.defaultNetworkId
    }), this.events.emit("chainChanged", { chainId: `0x${t.toString(16)}` }), this.defaultNetworkId = t, !0) : !1;
  }
  /**
   * Send event requestChainChange, wait for it to resolve.
   * Throws error if chain was not changed.
   */
  async handleNetworkChange(t) {
    if (t && t !== this.defaultNetworkId) {
      if (!await new Promise(
        (r) => this.events.emit("requestChainChange", { chainId: t, resolve: r })
      ))
        return R("CHAIN_CHANGE_FAILED");
      this.setDefaultNetworkId(t);
    }
  }
  // Get sapphire chain id from connected provider
  async loadSapphireChainId() {
    return !this.sapphireChainId && this.sapphireProvider && (this.sapphireChainId = +(await this.sapphireProvider.getNetwork()).chainId.toString()), this.sapphireChainId;
  }
  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(t) {
    return (t && !Vs(t) && !this.rpcUrls[t] || !t && this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) && R("NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID"), !t && this.defaultNetworkId && (t = this.defaultNetworkId), t;
  }
  /**
   * Get provider object for chainId.
   * If no chainId specified, use sapphire network rpc.
   */
  getRpcProviderForChainId(t) {
    if (!t || t && !this.rpcUrls[t] && Vs(+t.toString()))
      return this.sapphireProvider || (this.events.emit("disconnect", { error: new Dr() }), R("SAPPHIRE_PROVIDER_NOT_INITIALIZED")), this.sapphireProvider;
    {
      const e = this.rpcProviders[t] || new Jr(this.rpcUrls[t]);
      return this.rpcProviders[t] = e, e || R("CROSS_CHAIN_PROVIDER_NOT_INITIALIZED"), e;
    }
  }
  getGaspayingAddress() {
    return this.accountManagerContract.gaspayingAddress();
  }
  // #endregion
}
export {
  us as AccountManagerAbi,
  Ta as ApillonApiErrors,
  sw as ERC20Abi,
  $n as EVMAccountAbi,
  Q0 as EmbeddedEthersSigner,
  K0 as EmbeddedViemAdapter,
  du as EmbeddedWallet,
  ow as EmbeddedWalletSDK,
  Ai as ErrorMessages,
  rt as Errors,
  Ur as GaslessTxType,
  _y as JsonMultiRpcProvider,
  Ly as ProxyWriteFunctionsByStrategy,
  ir as SapphireMainnet,
  or as SapphireTestnet,
  J0 as UserRejectedRequestError,
  Dr as WalletDisconnectedError,
  en as WalletType,
  tn as WindowId,
  R as abort,
  Qy as credentialCreate,
  Jy as credentialGet,
  qi as getEmbeddedWallet,
  qn as getEmbeddedWalletRetry,
  te as getHashedUsername,
  Ca as getPasskeyOrigin,
  aw as getProvider,
  Fy as isSafari,
  Vs as networkIdIsSapphire
};
