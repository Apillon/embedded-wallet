import { ethers as O, keccak256 as de, toBigInt as Zt } from "ethers";
import * as fe from "@oasisprotocol/sapphire-paratime";
import { CBOR as Xt } from "cbor-redux";
import * as mt from "asn1js";
import le from "mitt";
import { pbkdf2Sync as he } from "pbkdf2";
const pe = [
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
], Et = [
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
], Tn = [
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
function qt(n) {
  if (!Number.isSafeInteger(n) || n < 0)
    throw new Error(`positive integer expected, not ${n}`);
}
function ye(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function _t(n, ...t) {
  if (!ye(n))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(n.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${n.length}`);
}
function ge(n) {
  if (typeof n != "function" || typeof n.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  qt(n.outputLen), qt(n.blockLen);
}
function It(n, t = !0) {
  if (n.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && n.finished)
    throw new Error("Hash#digest() has already been called");
}
function we(n, t) {
  _t(n);
  const e = t.outputLen;
  if (n.length < e)
    throw new Error(`digestInto() expects output buffer of length at least ${e}`);
}
const Nt = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const St = (n) => new DataView(n.buffer, n.byteOffset, n.byteLength), K = (n, t) => n << 32 - t | n >>> t;
new Uint8Array(new Uint32Array([287454020]).buffer)[0];
function be(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Ut(n) {
  return typeof n == "string" && (n = be(n)), _t(n), n;
}
function Ae(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    _t(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
class Jt {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function Ee(n) {
  const t = (r) => n().update(Ut(r)).digest(), e = n();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => n(), t;
}
function me(n = 32) {
  if (Nt && typeof Nt.getRandomValues == "function")
    return Nt.getRandomValues(new Uint8Array(n));
  throw new Error("crypto.getRandomValues must be defined");
}
class Qt extends Jt {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, ge(t);
    const r = Ut(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(r.length > s ? t.create().update(r).digest() : r);
    for (let c = 0; c < i.length; c++)
      i[c] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let c = 0; c < i.length; c++)
      i[c] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return It(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    It(this), _t(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: r, finished: s, destroyed: i, blockLen: c, outputLen: o } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = c, t.outputLen = o, t.oHash = e._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const te = (n, t, e) => new Qt(n, t).update(e).digest();
te.create = (n, t) => new Qt(n, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ee = BigInt(0), xt = BigInt(1), Ie = BigInt(2);
function ct(n) {
  return n instanceof Uint8Array || n != null && typeof n == "object" && n.constructor.name === "Uint8Array";
}
function wt(n) {
  if (!ct(n))
    throw new Error("Uint8Array expected");
}
const _e = /* @__PURE__ */ Array.from({ length: 256 }, (n, t) => t.toString(16).padStart(2, "0"));
function ut(n) {
  wt(n);
  let t = "";
  for (let e = 0; e < n.length; e++)
    t += _e[n[e]];
  return t;
}
function ne(n) {
  const t = n.toString(16);
  return t.length & 1 ? `0${t}` : t;
}
function Pt(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  return BigInt(n === "" ? "0" : `0x${n}`);
}
const j = { _0: 48, _9: 57, _A: 65, _F: 70, _a: 97, _f: 102 };
function Ft(n) {
  if (n >= j._0 && n <= j._9)
    return n - j._0;
  if (n >= j._A && n <= j._F)
    return n - (j._A - 10);
  if (n >= j._a && n <= j._f)
    return n - (j._a - 10);
}
function lt(n) {
  if (typeof n != "string")
    throw new Error("hex string expected, got " + typeof n);
  const t = n.length, e = t / 2;
  if (t % 2)
    throw new Error("padded hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const c = Ft(n.charCodeAt(i)), o = Ft(n.charCodeAt(i + 1));
    if (c === void 0 || o === void 0) {
      const a = n[i] + n[i + 1];
      throw new Error('hex string expected, got non-hex character "' + a + '" at index ' + i);
    }
    r[s] = c * 16 + o;
  }
  return r;
}
function ot(n) {
  return Pt(ut(n));
}
function Dt(n) {
  return wt(n), Pt(ut(Uint8Array.from(n).reverse()));
}
function ht(n, t) {
  return lt(n.toString(16).padStart(t * 2, "0"));
}
function Lt(n, t) {
  return ht(n, t).reverse();
}
function xe(n) {
  return lt(ne(n));
}
function W(n, t, e) {
  let r;
  if (typeof t == "string")
    try {
      r = lt(t);
    } catch (i) {
      throw new Error(`${n} must be valid hex string, got "${t}". Cause: ${i}`);
    }
  else if (ct(t))
    r = Uint8Array.from(t);
  else
    throw new Error(`${n} must be hex string or Uint8Array`);
  const s = r.length;
  if (typeof e == "number" && s !== e)
    throw new Error(`${n} expected ${e} bytes, got ${s}`);
  return r;
}
function gt(...n) {
  let t = 0;
  for (let r = 0; r < n.length; r++) {
    const s = n[r];
    wt(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let r = 0, s = 0; r < n.length; r++) {
    const i = n[r];
    e.set(i, s), s += i.length;
  }
  return e;
}
function Te(n, t) {
  if (n.length !== t.length)
    return !1;
  let e = 0;
  for (let r = 0; r < n.length; r++)
    e |= n[r] ^ t[r];
  return e === 0;
}
function Ne(n) {
  if (typeof n != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof n}`);
  return new Uint8Array(new TextEncoder().encode(n));
}
function Se(n) {
  let t;
  for (t = 0; n > ee; n >>= xt, t += 1)
    ;
  return t;
}
function Oe(n, t) {
  return n >> BigInt(t) & xt;
}
function ve(n, t, e) {
  return n | (e ? xt : ee) << BigInt(t);
}
const Ht = (n) => (Ie << BigInt(n - 1)) - xt, Ot = (n) => new Uint8Array(n), $t = (n) => Uint8Array.from(n);
function re(n, t, e) {
  if (typeof n != "number" || n < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let r = Ot(n), s = Ot(n), i = 0;
  const c = () => {
    r.fill(1), s.fill(0), i = 0;
  }, o = (...f) => e(s, r, ...f), a = (f = Ot()) => {
    s = o($t([0]), f), r = o(), f.length !== 0 && (s = o($t([1]), f), r = o());
  }, u = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let f = 0;
    const N = [];
    for (; f < t; ) {
      r = o();
      const v = r.slice();
      N.push(v), f += r.length;
    }
    return gt(...N);
  };
  return (f, N) => {
    c(), a(f);
    let v;
    for (; !(v = N(u())); )
      a();
    return c(), v;
  };
}
const Ce = {
  bigint: (n) => typeof n == "bigint",
  function: (n) => typeof n == "function",
  boolean: (n) => typeof n == "boolean",
  string: (n) => typeof n == "string",
  stringOrUint8Array: (n) => typeof n == "string" || ct(n),
  isSafeInteger: (n) => Number.isSafeInteger(n),
  array: (n) => Array.isArray(n),
  field: (n, t) => t.Fp.isValid(n),
  hash: (n) => typeof n == "function" && Number.isSafeInteger(n.outputLen)
};
function bt(n, t, e = {}) {
  const r = (s, i, c) => {
    const o = Ce[i];
    if (typeof o != "function")
      throw new Error(`Invalid validator "${i}", expected function`);
    const a = n[s];
    if (!(c && a === void 0) && !o(a, n))
      throw new Error(`Invalid param ${String(s)}=${a} (${typeof a}), expected ${i}`);
  };
  for (const [s, i] of Object.entries(t))
    r(s, i, !1);
  for (const [s, i] of Object.entries(e))
    r(s, i, !0);
  return n;
}
const Re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  abytes: wt,
  bitGet: Oe,
  bitLen: Se,
  bitMask: Ht,
  bitSet: ve,
  bytesToHex: ut,
  bytesToNumberBE: ot,
  bytesToNumberLE: Dt,
  concatBytes: gt,
  createHmacDrbg: re,
  ensureBytes: W,
  equalBytes: Te,
  hexToBytes: lt,
  hexToNumber: Pt,
  isBytes: ct,
  numberToBytesBE: ht,
  numberToBytesLE: Lt,
  numberToHexUnpadded: ne,
  numberToVarBytesBE: xe,
  utf8ToBytes: Ne,
  validateObject: bt
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const L = BigInt(0), P = BigInt(1), st = BigInt(2), Be = BigInt(3), Rt = BigInt(4), Gt = BigInt(5), Wt = BigInt(8);
BigInt(9);
BigInt(16);
function $(n, t) {
  const e = n % t;
  return e >= L ? e : t + e;
}
function Ue(n, t, e) {
  if (e <= L || t < L)
    throw new Error("Expected power/modulo > 0");
  if (e === P)
    return L;
  let r = P;
  for (; t > L; )
    t & P && (r = r * n % e), n = n * n % e, t >>= P;
  return r;
}
function Bt(n, t) {
  if (n === L || t <= L)
    throw new Error(`invert: expected positive integers, got n=${n} mod=${t}`);
  let e = $(n, t), r = t, s = L, i = P;
  for (; e !== L; ) {
    const o = r / e, a = r % e, u = s - i * o;
    r = e, e = a, s = i, i = u;
  }
  if (r !== P)
    throw new Error("invert: does not exist");
  return $(s, t);
}
function Pe(n) {
  const t = (n - P) / st;
  let e, r, s;
  for (e = n - P, r = 0; e % st === L; e /= st, r++)
    ;
  for (s = st; s < n && Ue(s, t, n) !== n - P; s++)
    ;
  if (r === 1) {
    const c = (n + P) / Rt;
    return function(a, u) {
      const g = a.pow(u, c);
      if (!a.eql(a.sqr(g), u))
        throw new Error("Cannot find square root");
      return g;
    };
  }
  const i = (e + P) / st;
  return function(o, a) {
    if (o.pow(a, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let u = r, g = o.pow(o.mul(o.ONE, s), e), f = o.pow(a, i), N = o.pow(a, e);
    for (; !o.eql(N, o.ONE); ) {
      if (o.eql(N, o.ZERO))
        return o.ZERO;
      let v = 1;
      for (let d = o.sqr(N); v < u && !o.eql(d, o.ONE); v++)
        d = o.sqr(d);
      const b = o.pow(g, P << BigInt(u - v - 1));
      g = o.sqr(b), f = o.mul(f, b), N = o.mul(N, g), u = v;
    }
    return f;
  };
}
function De(n) {
  if (n % Rt === Be) {
    const t = (n + P) / Rt;
    return function(r, s) {
      const i = r.pow(s, t);
      if (!r.eql(r.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (n % Wt === Gt) {
    const t = (n - Gt) / Wt;
    return function(r, s) {
      const i = r.mul(s, st), c = r.pow(i, t), o = r.mul(s, c), a = r.mul(r.mul(o, st), c), u = r.mul(o, r.sub(a, r.ONE));
      if (!r.eql(r.sqr(u), s))
        throw new Error("Cannot find square root");
      return u;
    };
  }
  return Pe(n);
}
const Le = [
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
function He(n) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = Le.reduce((r, s) => (r[s] = "function", r), t);
  return bt(n, e);
}
function ke(n, t, e) {
  if (e < L)
    throw new Error("Expected power > 0");
  if (e === L)
    return n.ONE;
  if (e === P)
    return t;
  let r = n.ONE, s = t;
  for (; e > L; )
    e & P && (r = n.mul(r, s)), s = n.sqr(s), e >>= P;
  return r;
}
function Me(n, t) {
  const e = new Array(t.length), r = t.reduce((i, c, o) => n.is0(c) ? i : (e[o] = i, n.mul(i, c)), n.ONE), s = n.inv(r);
  return t.reduceRight((i, c, o) => n.is0(c) ? i : (e[o] = n.mul(i, e[o]), n.mul(i, c)), s), e;
}
function se(n, t) {
  const e = t !== void 0 ? t : n.toString(2).length, r = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: r };
}
function Ve(n, t, e = !1, r = {}) {
  if (n <= L)
    throw new Error(`Expected Field ORDER > 0, got ${n}`);
  const { nBitLength: s, nByteLength: i } = se(n, t);
  if (i > 2048)
    throw new Error("Field lengths over 2048 bytes are not supported");
  const c = De(n), o = Object.freeze({
    ORDER: n,
    BITS: s,
    BYTES: i,
    MASK: Ht(s),
    ZERO: L,
    ONE: P,
    create: (a) => $(a, n),
    isValid: (a) => {
      if (typeof a != "bigint")
        throw new Error(`Invalid field element: expected bigint, got ${typeof a}`);
      return L <= a && a < n;
    },
    is0: (a) => a === L,
    isOdd: (a) => (a & P) === P,
    neg: (a) => $(-a, n),
    eql: (a, u) => a === u,
    sqr: (a) => $(a * a, n),
    add: (a, u) => $(a + u, n),
    sub: (a, u) => $(a - u, n),
    mul: (a, u) => $(a * u, n),
    pow: (a, u) => ke(o, a, u),
    div: (a, u) => $(a * Bt(u, n), n),
    // Same as above, but doesn't normalize
    sqrN: (a) => a * a,
    addN: (a, u) => a + u,
    subN: (a, u) => a - u,
    mulN: (a, u) => a * u,
    inv: (a) => Bt(a, n),
    sqrt: r.sqrt || ((a) => c(o, a)),
    invertBatch: (a) => Me(o, a),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (a, u, g) => g ? u : a,
    toBytes: (a) => e ? Lt(a, i) : ht(a, i),
    fromBytes: (a) => {
      if (a.length !== i)
        throw new Error(`Fp.fromBytes: expected ${i}, got ${a.length}`);
      return e ? Dt(a) : ot(a);
    }
  });
  return Object.freeze(o);
}
function ie(n) {
  if (typeof n != "bigint")
    throw new Error("field order must be bigint");
  const t = n.toString(2).length;
  return Math.ceil(t / 8);
}
function oe(n) {
  const t = ie(n);
  return t + Math.ceil(t / 2);
}
function Ze(n, t, e = !1) {
  const r = n.length, s = ie(t), i = oe(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error(`expected ${i}-1024 bytes of input, got ${r}`);
  const c = e ? ot(n) : Dt(n), o = $(c, t - P) + P;
  return e ? Lt(o, s) : ht(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const qe = BigInt(0), vt = BigInt(1);
function Fe(n, t) {
  const e = (s, i) => {
    const c = i.negate();
    return s ? c : i;
  }, r = (s) => {
    const i = Math.ceil(t / s) + 1, c = 2 ** (s - 1);
    return { windows: i, windowSize: c };
  };
  return {
    constTimeNegate: e,
    // non-const time multiplication ladder
    unsafeLadder(s, i) {
      let c = n.ZERO, o = s;
      for (; i > qe; )
        i & vt && (c = c.add(o)), o = o.double(), i >>= vt;
      return c;
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
      const { windows: c, windowSize: o } = r(i), a = [];
      let u = s, g = u;
      for (let f = 0; f < c; f++) {
        g = u, a.push(g);
        for (let N = 1; N < o; N++)
          g = g.add(u), a.push(g);
        u = g.double();
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
    wNAF(s, i, c) {
      const { windows: o, windowSize: a } = r(s);
      let u = n.ZERO, g = n.BASE;
      const f = BigInt(2 ** s - 1), N = 2 ** s, v = BigInt(s);
      for (let b = 0; b < o; b++) {
        const d = b * a;
        let h = Number(c & f);
        c >>= v, h > a && (h -= N, c += vt);
        const y = d, A = d + Math.abs(h) - 1, m = b % 2 !== 0, C = h < 0;
        h === 0 ? g = g.add(e(m, i[y])) : u = u.add(e(C, i[A]));
      }
      return { p: u, f: g };
    },
    wNAFCached(s, i, c, o) {
      const a = s._WINDOW_SIZE || 1;
      let u = i.get(s);
      return u || (u = this.precomputeWindow(s, a), a !== 1 && i.set(s, o(u))), this.wNAF(a, u, c);
    }
  };
}
function ae(n) {
  return He(n.Fp), bt(n, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...se(n.n, n.nBitLength),
    ...n,
    p: n.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function $e(n) {
  const t = ae(n);
  bt(t, {
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
const { bytesToNumberBE: Ge, hexToBytes: We } = Re, it = {
  // asn.1 DER encoding utils
  Err: class extends Error {
    constructor(t = "") {
      super(t);
    }
  },
  _parseInt(n) {
    const { Err: t } = it;
    if (n.length < 2 || n[0] !== 2)
      throw new t("Invalid signature integer tag");
    const e = n[1], r = n.subarray(2, e + 2);
    if (!e || r.length !== e)
      throw new t("Invalid signature integer: wrong length");
    if (r[0] & 128)
      throw new t("Invalid signature integer: negative");
    if (r[0] === 0 && !(r[1] & 128))
      throw new t("Invalid signature integer: unnecessary leading zero");
    return { d: Ge(r), l: n.subarray(e + 2) };
  },
  toSig(n) {
    const { Err: t } = it, e = typeof n == "string" ? We(n) : n;
    wt(e);
    let r = e.length;
    if (r < 2 || e[0] != 48)
      throw new t("Invalid signature tag");
    if (e[1] !== r - 2)
      throw new t("Invalid signature: incorrect length");
    const { d: s, l: i } = it._parseInt(e.subarray(2)), { d: c, l: o } = it._parseInt(i);
    if (o.length)
      throw new t("Invalid signature: left bytes after parsing");
    return { r: s, s: c };
  },
  hexFromSig(n) {
    const t = (u) => Number.parseInt(u[0], 16) & 8 ? "00" + u : u, e = (u) => {
      const g = u.toString(16);
      return g.length & 1 ? `0${g}` : g;
    }, r = t(e(n.s)), s = t(e(n.r)), i = r.length / 2, c = s.length / 2, o = e(i), a = e(c);
    return `30${e(c + i + 4)}02${a}${s}02${o}${r}`;
  }
}, Y = BigInt(0), F = BigInt(1);
BigInt(2);
const zt = BigInt(3);
BigInt(4);
function ze(n) {
  const t = $e(n), { Fp: e } = t, r = t.toBytes || ((b, d, h) => {
    const y = d.toAffine();
    return gt(Uint8Array.from([4]), e.toBytes(y.x), e.toBytes(y.y));
  }), s = t.fromBytes || ((b) => {
    const d = b.subarray(1), h = e.fromBytes(d.subarray(0, e.BYTES)), y = e.fromBytes(d.subarray(e.BYTES, 2 * e.BYTES));
    return { x: h, y };
  });
  function i(b) {
    const { a: d, b: h } = t, y = e.sqr(b), A = e.mul(y, b);
    return e.add(e.add(A, e.mul(b, d)), h);
  }
  if (!e.eql(e.sqr(t.Gy), i(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function c(b) {
    return typeof b == "bigint" && Y < b && b < t.n;
  }
  function o(b) {
    if (!c(b))
      throw new Error("Expected valid bigint: 0 < bigint < curve.n");
  }
  function a(b) {
    const { allowedPrivateKeyLengths: d, nByteLength: h, wrapPrivateKey: y, n: A } = t;
    if (d && typeof b != "bigint") {
      if (ct(b) && (b = ut(b)), typeof b != "string" || !d.includes(b.length))
        throw new Error("Invalid key");
      b = b.padStart(h * 2, "0");
    }
    let m;
    try {
      m = typeof b == "bigint" ? b : ot(W("private key", b, h));
    } catch {
      throw new Error(`private key must be ${h} bytes, hex or bigint, not ${typeof b}`);
    }
    return y && (m = $(m, A)), o(m), m;
  }
  const u = /* @__PURE__ */ new Map();
  function g(b) {
    if (!(b instanceof f))
      throw new Error("ProjectivePoint expected");
  }
  class f {
    constructor(d, h, y) {
      if (this.px = d, this.py = h, this.pz = y, d == null || !e.isValid(d))
        throw new Error("x required");
      if (h == null || !e.isValid(h))
        throw new Error("y required");
      if (y == null || !e.isValid(y))
        throw new Error("z required");
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(d) {
      const { x: h, y } = d || {};
      if (!d || !e.isValid(h) || !e.isValid(y))
        throw new Error("invalid affine point");
      if (d instanceof f)
        throw new Error("projective point not allowed");
      const A = (m) => e.eql(m, e.ZERO);
      return A(h) && A(y) ? f.ZERO : new f(h, y, e.ONE);
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
      const h = e.invertBatch(d.map((y) => y.pz));
      return d.map((y, A) => y.toAffine(h[A])).map(f.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(d) {
      const h = f.fromAffine(s(W("pointHex", d)));
      return h.assertValidity(), h;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(d) {
      return f.BASE.multiply(a(d));
    }
    // "Private method", don't use it directly
    _setWindowSize(d) {
      this._WINDOW_SIZE = d, u.delete(this);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      if (this.is0()) {
        if (t.allowInfinityPoint && !e.is0(this.py))
          return;
        throw new Error("bad point: ZERO");
      }
      const { x: d, y: h } = this.toAffine();
      if (!e.isValid(d) || !e.isValid(h))
        throw new Error("bad point: x or y not FE");
      const y = e.sqr(h), A = i(d);
      if (!e.eql(y, A))
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
      g(d);
      const { px: h, py: y, pz: A } = this, { px: m, py: C, pz: T } = d, w = e.eql(e.mul(h, T), e.mul(m, A)), E = e.eql(e.mul(y, T), e.mul(C, A));
      return w && E;
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
      const { a: d, b: h } = t, y = e.mul(h, zt), { px: A, py: m, pz: C } = this;
      let T = e.ZERO, w = e.ZERO, E = e.ZERO, _ = e.mul(A, A), Z = e.mul(m, m), U = e.mul(C, C), S = e.mul(A, m);
      return S = e.add(S, S), E = e.mul(A, C), E = e.add(E, E), T = e.mul(d, E), w = e.mul(y, U), w = e.add(T, w), T = e.sub(Z, w), w = e.add(Z, w), w = e.mul(T, w), T = e.mul(S, T), E = e.mul(y, E), U = e.mul(d, U), S = e.sub(_, U), S = e.mul(d, S), S = e.add(S, E), E = e.add(_, _), _ = e.add(E, _), _ = e.add(_, U), _ = e.mul(_, S), w = e.add(w, _), U = e.mul(m, C), U = e.add(U, U), _ = e.mul(U, S), T = e.sub(T, _), E = e.mul(U, Z), E = e.add(E, E), E = e.add(E, E), new f(T, w, E);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(d) {
      g(d);
      const { px: h, py: y, pz: A } = this, { px: m, py: C, pz: T } = d;
      let w = e.ZERO, E = e.ZERO, _ = e.ZERO;
      const Z = t.a, U = e.mul(t.b, zt);
      let S = e.mul(h, m), M = e.mul(y, C), V = e.mul(A, T), X = e.add(h, y), l = e.add(m, C);
      X = e.mul(X, l), l = e.add(S, M), X = e.sub(X, l), l = e.add(h, A);
      let p = e.add(m, T);
      return l = e.mul(l, p), p = e.add(S, V), l = e.sub(l, p), p = e.add(y, A), w = e.add(C, T), p = e.mul(p, w), w = e.add(M, V), p = e.sub(p, w), _ = e.mul(Z, l), w = e.mul(U, V), _ = e.add(w, _), w = e.sub(M, _), _ = e.add(M, _), E = e.mul(w, _), M = e.add(S, S), M = e.add(M, S), V = e.mul(Z, V), l = e.mul(U, l), M = e.add(M, V), V = e.sub(S, V), V = e.mul(Z, V), l = e.add(l, V), S = e.mul(M, l), E = e.add(E, S), S = e.mul(p, l), w = e.mul(X, w), w = e.sub(w, S), S = e.mul(X, M), _ = e.mul(p, _), _ = e.add(_, S), new f(w, E, _);
    }
    subtract(d) {
      return this.add(d.negate());
    }
    is0() {
      return this.equals(f.ZERO);
    }
    wNAF(d) {
      return v.wNAFCached(this, u, d, (h) => {
        const y = e.invertBatch(h.map((A) => A.pz));
        return h.map((A, m) => A.toAffine(y[m])).map(f.fromAffine);
      });
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(d) {
      const h = f.ZERO;
      if (d === Y)
        return h;
      if (o(d), d === F)
        return this;
      const { endo: y } = t;
      if (!y)
        return v.unsafeLadder(this, d);
      let { k1neg: A, k1: m, k2neg: C, k2: T } = y.splitScalar(d), w = h, E = h, _ = this;
      for (; m > Y || T > Y; )
        m & F && (w = w.add(_)), T & F && (E = E.add(_)), _ = _.double(), m >>= F, T >>= F;
      return A && (w = w.negate()), C && (E = E.negate()), E = new f(e.mul(E.px, y.beta), E.py, E.pz), w.add(E);
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
      o(d);
      let h = d, y, A;
      const { endo: m } = t;
      if (m) {
        const { k1neg: C, k1: T, k2neg: w, k2: E } = m.splitScalar(h);
        let { p: _, f: Z } = this.wNAF(T), { p: U, f: S } = this.wNAF(E);
        _ = v.constTimeNegate(C, _), U = v.constTimeNegate(w, U), U = new f(e.mul(U.px, m.beta), U.py, U.pz), y = _.add(U), A = Z.add(S);
      } else {
        const { p: C, f: T } = this.wNAF(h);
        y = C, A = T;
      }
      return f.normalizeZ([y, A])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(d, h, y) {
      const A = f.BASE, m = (T, w) => w === Y || w === F || !T.equals(A) ? T.multiplyUnsafe(w) : T.multiply(w), C = m(this, h).add(m(d, y));
      return C.is0() ? void 0 : C;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(d) {
      const { px: h, py: y, pz: A } = this, m = this.is0();
      d == null && (d = m ? e.ONE : e.inv(A));
      const C = e.mul(h, d), T = e.mul(y, d), w = e.mul(A, d);
      if (m)
        return { x: e.ZERO, y: e.ZERO };
      if (!e.eql(w, e.ONE))
        throw new Error("invZ was invalid");
      return { x: C, y: T };
    }
    isTorsionFree() {
      const { h: d, isTorsionFree: h } = t;
      if (d === F)
        return !0;
      if (h)
        return h(f, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: d, clearCofactor: h } = t;
      return d === F ? this : h ? h(f, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(d = !0) {
      return this.assertValidity(), r(f, this, d);
    }
    toHex(d = !0) {
      return ut(this.toRawBytes(d));
    }
  }
  f.BASE = new f(t.Gx, t.Gy, e.ONE), f.ZERO = new f(e.ZERO, e.ONE, e.ZERO);
  const N = t.nBitLength, v = Fe(f, t.endo ? Math.ceil(N / 2) : N);
  return {
    CURVE: t,
    ProjectivePoint: f,
    normPrivateKeyToScalar: a,
    weierstrassEquation: i,
    isWithinCurveOrder: c
  };
}
function Ke(n) {
  const t = ae(n);
  return bt(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function je(n) {
  const t = Ke(n), { Fp: e, n: r } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function c(l) {
    return Y < l && l < e.ORDER;
  }
  function o(l) {
    return $(l, r);
  }
  function a(l) {
    return Bt(l, r);
  }
  const { ProjectivePoint: u, normPrivateKeyToScalar: g, weierstrassEquation: f, isWithinCurveOrder: N } = ze({
    ...t,
    toBytes(l, p, I) {
      const B = p.toAffine(), R = e.toBytes(B.x), D = gt;
      return I ? D(Uint8Array.from([p.hasEvenY() ? 2 : 3]), R) : D(Uint8Array.from([4]), R, e.toBytes(B.y));
    },
    fromBytes(l) {
      const p = l.length, I = l[0], B = l.subarray(1);
      if (p === s && (I === 2 || I === 3)) {
        const R = ot(B);
        if (!c(R))
          throw new Error("Point is not on curve");
        const D = f(R);
        let H;
        try {
          H = e.sqrt(D);
        } catch (G) {
          const Q = G instanceof Error ? ": " + G.message : "";
          throw new Error("Point is not on curve" + Q);
        }
        const k = (H & F) === F;
        return (I & 1) === 1 !== k && (H = e.neg(H)), { x: R, y: H };
      } else if (p === i && I === 4) {
        const R = e.fromBytes(B.subarray(0, e.BYTES)), D = e.fromBytes(B.subarray(e.BYTES, 2 * e.BYTES));
        return { x: R, y: D };
      } else
        throw new Error(`Point of length ${p} was invalid. Expected ${s} compressed bytes or ${i} uncompressed bytes`);
    }
  }), v = (l) => ut(ht(l, t.nByteLength));
  function b(l) {
    const p = r >> F;
    return l > p;
  }
  function d(l) {
    return b(l) ? o(-l) : l;
  }
  const h = (l, p, I) => ot(l.slice(p, I));
  class y {
    constructor(p, I, B) {
      this.r = p, this.s = I, this.recovery = B, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(p) {
      const I = t.nByteLength;
      return p = W("compactSignature", p, I * 2), new y(h(p, 0, I), h(p, I, 2 * I));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(p) {
      const { r: I, s: B } = it.toSig(W("DER", p));
      return new y(I, B);
    }
    assertValidity() {
      if (!N(this.r))
        throw new Error("r must be 0 < r < CURVE.n");
      if (!N(this.s))
        throw new Error("s must be 0 < s < CURVE.n");
    }
    addRecoveryBit(p) {
      return new y(this.r, this.s, p);
    }
    recoverPublicKey(p) {
      const { r: I, s: B, recovery: R } = this, D = E(W("msgHash", p));
      if (R == null || ![0, 1, 2, 3].includes(R))
        throw new Error("recovery id invalid");
      const H = R === 2 || R === 3 ? I + t.n : I;
      if (H >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const k = R & 1 ? "03" : "02", J = u.fromHex(k + v(H)), G = a(H), Q = o(-D * G), pt = o(B * G), tt = u.BASE.multiplyAndAddUnsafe(J, Q, pt);
      if (!tt)
        throw new Error("point at infinify");
      return tt.assertValidity(), tt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return b(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new y(this.r, o(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return lt(this.toDERHex());
    }
    toDERHex() {
      return it.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return lt(this.toCompactHex());
    }
    toCompactHex() {
      return v(this.r) + v(this.s);
    }
  }
  const A = {
    isValidPrivateKey(l) {
      try {
        return g(l), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: g,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const l = oe(t.n);
      return Ze(t.randomBytes(l), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(l = 8, p = u.BASE) {
      return p._setWindowSize(l), p.multiply(BigInt(3)), p;
    }
  };
  function m(l, p = !0) {
    return u.fromPrivateKey(l).toRawBytes(p);
  }
  function C(l) {
    const p = ct(l), I = typeof l == "string", B = (p || I) && l.length;
    return p ? B === s || B === i : I ? B === 2 * s || B === 2 * i : l instanceof u;
  }
  function T(l, p, I = !0) {
    if (C(l))
      throw new Error("first arg must be private key");
    if (!C(p))
      throw new Error("second arg must be public key");
    return u.fromHex(p).multiply(g(l)).toRawBytes(I);
  }
  const w = t.bits2int || function(l) {
    const p = ot(l), I = l.length * 8 - t.nBitLength;
    return I > 0 ? p >> BigInt(I) : p;
  }, E = t.bits2int_modN || function(l) {
    return o(w(l));
  }, _ = Ht(t.nBitLength);
  function Z(l) {
    if (typeof l != "bigint")
      throw new Error("bigint expected");
    if (!(Y <= l && l < _))
      throw new Error(`bigint expected < 2^${t.nBitLength}`);
    return ht(l, t.nByteLength);
  }
  function U(l, p, I = S) {
    if (["recovered", "canonical"].some((rt) => rt in I))
      throw new Error("sign() legacy options not supported");
    const { hash: B, randomBytes: R } = t;
    let { lowS: D, prehash: H, extraEntropy: k } = I;
    D == null && (D = !0), l = W("msgHash", l), H && (l = W("prehashed msgHash", B(l)));
    const J = E(l), G = g(p), Q = [Z(G), Z(J)];
    if (k != null && k !== !1) {
      const rt = k === !0 ? R(e.BYTES) : k;
      Q.push(W("extraEntropy", rt));
    }
    const pt = gt(...Q), tt = J;
    function Tt(rt) {
      const dt = w(rt);
      if (!N(dt))
        return;
      const kt = a(dt), z = u.BASE.multiply(dt).toAffine(), ft = o(z.x);
      if (ft === Y)
        return;
      const At = o(kt * o(tt + ft * G));
      if (At === Y)
        return;
      let Mt = (z.x === ft ? 0 : 2) | Number(z.y & F), Vt = At;
      return D && b(At) && (Vt = d(At), Mt ^= 1), new y(ft, Vt, Mt);
    }
    return { seed: pt, k2sig: Tt };
  }
  const S = { lowS: t.lowS, prehash: !1 }, M = { lowS: t.lowS, prehash: !1 };
  function V(l, p, I = S) {
    const { seed: B, k2sig: R } = U(l, p, I), D = t;
    return re(D.hash.outputLen, D.nByteLength, D.hmac)(B, R);
  }
  u.BASE._setWindowSize(8);
  function X(l, p, I, B = M) {
    const R = l;
    if (p = W("msgHash", p), I = W("publicKey", I), "strict" in B)
      throw new Error("options.strict was renamed to lowS");
    const { lowS: D, prehash: H } = B;
    let k, J;
    try {
      if (typeof R == "string" || ct(R))
        try {
          k = y.fromDER(R);
        } catch (z) {
          if (!(z instanceof it.Err))
            throw z;
          k = y.fromCompact(R);
        }
      else if (typeof R == "object" && typeof R.r == "bigint" && typeof R.s == "bigint") {
        const { r: z, s: ft } = R;
        k = new y(z, ft);
      } else
        throw new Error("PARSE");
      J = u.fromHex(I);
    } catch (z) {
      if (z.message === "PARSE")
        throw new Error("signature must be Signature instance, Uint8Array or hex string");
      return !1;
    }
    if (D && k.hasHighS())
      return !1;
    H && (p = t.hash(p));
    const { r: G, s: Q } = k, pt = E(p), tt = a(Q), Tt = o(pt * tt), rt = o(G * tt), dt = u.BASE.multiplyAndAddUnsafe(J, Tt, rt)?.toAffine();
    return dt ? o(dt.x) === G : !1;
  }
  return {
    CURVE: t,
    getPublicKey: m,
    getSharedSecret: T,
    sign: V,
    verify: X,
    ProjectivePoint: u,
    Signature: y,
    utils: A
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Ye(n) {
  return {
    hash: n,
    hmac: (t, ...e) => te(n, t, Ae(...e)),
    randomBytes: me
  };
}
function Xe(n, t) {
  const e = (r) => je({ ...n, ...Ye(r) });
  return Object.freeze({ ...e(t), create: e });
}
function Je(n, t, e, r) {
  if (typeof n.setBigUint64 == "function")
    return n.setBigUint64(t, e, r);
  const s = BigInt(32), i = BigInt(4294967295), c = Number(e >> s & i), o = Number(e & i), a = r ? 4 : 0, u = r ? 0 : 4;
  n.setUint32(t + a, c, r), n.setUint32(t + u, o, r);
}
const Qe = (n, t, e) => n & t ^ ~n & e, tn = (n, t, e) => n & t ^ n & e ^ t & e;
class en extends Jt {
  constructor(t, e, r, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = r, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = St(this.buffer);
  }
  update(t) {
    It(this);
    const { view: e, buffer: r, blockLen: s } = this;
    t = Ut(t);
    const i = t.length;
    for (let c = 0; c < i; ) {
      const o = Math.min(s - this.pos, i - c);
      if (o === s) {
        const a = St(t);
        for (; s <= i - c; c += s)
          this.process(a, c);
        continue;
      }
      r.set(t.subarray(c, c + o), this.pos), this.pos += o, c += o, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    It(this), we(t, this), this.finished = !0;
    const { buffer: e, view: r, blockLen: s, isLE: i } = this;
    let { pos: c } = this;
    e[c++] = 128, this.buffer.subarray(c).fill(0), this.padOffset > s - c && (this.process(r, 0), c = 0);
    for (let f = c; f < s; f++)
      e[f] = 0;
    Je(r, s - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const o = St(t), a = this.outputLen;
    if (a % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = a / 4, g = this.get();
    if (u > g.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f = 0; f < u; f++)
      o.setUint32(4 * f, g[f], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const r = t.slice(0, e);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: r, length: s, finished: i, destroyed: c, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = c, s % e && t.buffer.set(r), t;
  }
}
const nn = /* @__PURE__ */ new Uint32Array([
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
]), et = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), nt = /* @__PURE__ */ new Uint32Array(64);
class rn extends en {
  constructor() {
    super(64, 32, 8, !1), this.A = et[0] | 0, this.B = et[1] | 0, this.C = et[2] | 0, this.D = et[3] | 0, this.E = et[4] | 0, this.F = et[5] | 0, this.G = et[6] | 0, this.H = et[7] | 0;
  }
  get() {
    const { A: t, B: e, C: r, D: s, E: i, F: c, G: o, H: a } = this;
    return [t, e, r, s, i, c, o, a];
  }
  // prettier-ignore
  set(t, e, r, s, i, c, o, a) {
    this.A = t | 0, this.B = e | 0, this.C = r | 0, this.D = s | 0, this.E = i | 0, this.F = c | 0, this.G = o | 0, this.H = a | 0;
  }
  process(t, e) {
    for (let f = 0; f < 16; f++, e += 4)
      nt[f] = t.getUint32(e, !1);
    for (let f = 16; f < 64; f++) {
      const N = nt[f - 15], v = nt[f - 2], b = K(N, 7) ^ K(N, 18) ^ N >>> 3, d = K(v, 17) ^ K(v, 19) ^ v >>> 10;
      nt[f] = d + nt[f - 7] + b + nt[f - 16] | 0;
    }
    let { A: r, B: s, C: i, D: c, E: o, F: a, G: u, H: g } = this;
    for (let f = 0; f < 64; f++) {
      const N = K(o, 6) ^ K(o, 11) ^ K(o, 25), v = g + N + Qe(o, a, u) + nn[f] + nt[f] | 0, d = (K(r, 2) ^ K(r, 13) ^ K(r, 22)) + tn(r, s, i) | 0;
      g = u, u = a, a = o, o = c + v | 0, c = i, i = s, s = r, r = v + d | 0;
    }
    r = r + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, c = c + this.D | 0, o = o + this.E | 0, a = a + this.F | 0, u = u + this.G | 0, g = g + this.H | 0, this.set(r, s, i, c, o, a, u, g);
  }
  roundClean() {
    nt.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const sn = /* @__PURE__ */ Ee(() => new rn());
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ce = Ve(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")), on = ce.create(BigInt("-3")), an = BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"), cn = Xe({
  a: on,
  // Equation params: a, b
  b: an,
  Fp: ce,
  // Field: 2n**224n * (2n**32n-1n) + 2n**192n + 2n**96n-1n
  // Curve order, total count of valid points in the field
  n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
  // Base (generator) point (x, y)
  Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
  Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),
  h: BigInt(1),
  lowS: !1
}, sn), Kt = cn, yt = "oasisAppWallet", un = 23294, dn = 23295, Sn = {
  WALLET_CONTEXT: "oaw_context",
  TRANSACTIONS_CONTEXT: "oaw_transactions",
  TOKENS_CONTEXT: "oaw_tokens"
}, q = {
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
  CANT_GET_SIGNATURE: "CANT_GET_SIGNATURE"
}, On = {
  [q.SAPPHIRE_PROVIDER_NOT_INITIALIZED]: "Sapphire provider not initialized",
  [q.ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED]: "Account manager contract not initialized",
  [q.NO_USERNAME]: "No username",
  [q.NO_PASSWORD]: "No password",
  [q.NO_LOGIN_PROXY_DATA]: "No login proxy data",
  [q.AUTHENTICATION_DATA_NOT_PROVIDED]: "Authentication data not provided",
  [q.CANT_GET_ACCOUNT_ADDRESS]: "Can't get account address",
  [q.NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID]: "No rpc url configured for selected chainid",
  [q.CROSS_CHAIN_PROVIDER_NOT_INITIALIZED]: "Cross chain provider not initialized",
  [q.OASIS_WALLET_NOT_INITIALIZED]: "Oasis wallet not initialized",
  [q.CANT_HASH_USERNAME]: "Can't hash username"
};
function vn(n) {
  if (typeof window < "u")
    return window[yt] = new ue(n), window[yt];
}
function fn() {
  if (typeof window < "u")
    return window[yt] || (window[yt] = new ue()), window[yt];
}
async function at(n = "") {
  const e = await fn()?.accountManagerContract?.salt();
  if (e)
    return he(n, O.toBeArray(e), 1e5, 32, "sha256");
}
function Ct(n) {
  return [dn, un].includes(n);
}
function x(n, t = "Error") {
  const e = new Error(t);
  throw e.name = q[n], e;
}
class jt {
  abiCoder = O.AbiCoder.defaultAbiCoder();
  async getRegisterData(t) {
    t.username || x("NO_USERNAME"), t.password || x("NO_PASSWORD");
    const e = await at(t.username);
    if (!e) {
      x("CANT_HASH_USERNAME");
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
      optionalPassword: O.encodeBytes32String(t.password)
    };
  }
  async getProxyResponse(t, e, r) {
    r.username || x("NO_USERNAME"), r.password || x("NO_PASSWORD");
    const s = await at(r.username);
    s || x("CANT_HASH_USERNAME");
    const i = O.solidityPackedKeccak256(
      ["bytes32", "bytes"],
      [O.encodeBytes32String(r.password), e]
    );
    return await t.proxyViewPassword(s, i, e);
  }
  generateNewKeypair() {
    const t = Kt.utils.randomPrivateKey(), e = Kt.getPublicKey(t, !1), r = "0x" + ut(e), s = this.abiCoder.encode(["string"], [r]), i = r.slice(4, r.length), c = BigInt("0x" + i.slice(0, 64)), o = BigInt("0x" + i.slice(64, i.length));
    return {
      credentialId: s,
      privateKey: t,
      decoded_x: c,
      decoded_y: o
    };
  }
}
function ln(n) {
  return n[0] << 24 | n[1] << 16 | n[2] << 8 | n[3];
}
function hn(n) {
  return n[0] << 8 | n[1];
}
function pn(n) {
  const t = Xt.decode(n), e = t[1];
  if (e == 2) {
    const r = {
      kty: e,
      alg: t[3],
      crv: t[-1],
      x: Zt(t[-2]),
      /** @type {Uint8Array} */
      y: Zt(t[-3])
    };
    if (!(r.alg == -7 && r.crv == 1) && // ES256 + P-256 (NIST)
    !(r.alg == -8 && r.crv == 6))
      throw new Error(`Unknown alg: ${r.alg}, crv: ${r.crv}`);
    return r;
  }
  throw new Error(`Unsupported kty: ${e}`);
}
function yn(n) {
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
    signCount: ln(n.slice(33, 37))
    //  4 bytes
  };
  if (e.flags.ED)
    throw new Error("Extension Data not supported!");
  if (e.flags.AT) {
    const r = hn(n.slice(53, 55));
    e.attestedCredentialData = {
      aaguid: n.slice(37, 53),
      // 16 bytes
      credentialId: n.slice(55, 55 + r),
      // vanillacbor.decodeOnlyFirst(buffer).byteLength;
      // https://www.w3.org/TR/webauthn-2/#sctn-encoded-credPubKey-examples
      credentialPublicKey: pn(n.slice(55 + r).buffer)
    };
  }
  return e;
}
function gn(n) {
  const e = Xt.decode(new Uint8Array(n).buffer).authData;
  return yn(e);
}
async function wn(n, t, e) {
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
    ad: gn(s.attestationObject)
  };
}
function bn(n) {
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
const An = new mt.Sequence({
  name: "sig",
  value: [
    new mt.Integer({
      name: "r"
    }),
    new mt.Integer({
      name: "s"
    })
  ]
});
async function En(n, t) {
  t || (t = crypto.getRandomValues(new Uint8Array(32)));
  const e = await navigator.credentials.get({
    publicKey: {
      allowCredentials: n.map((u) => ({ id: u, type: "public-key" })),
      challenge: t
    }
  }), r = e.response, s = mt.verifySchema(r.signature, An);
  if (!s.verified)
    throw new Error("Unable to decode ASN.1 signature!");
  const i = s.result, c = i.r.toBigInt(), o = i.s.toBigInt(), a = JSON.parse(new TextDecoder().decode(r.clientDataJSON));
  return {
    credentialIdHashed: de(new Uint8Array(e.rawId)),
    challenge: t,
    resp: {
      authenticatorData: new Uint8Array(r.authenticatorData),
      clientDataTokens: bn(a),
      sigR: c,
      sigS: o
    }
  };
}
class Yt {
  async getRegisterData(t) {
    t.username || x("NO_USERNAME");
    const e = await at(t.username);
    if (!e) {
      x("CANT_HASH_USERNAME");
      return;
    }
    const r = await wn(
      {
        name: "Oasis Wallet Account",
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
      optionalPassword: O.ZeroHash
    };
  }
  async getProxyResponse(t, e, r) {
    r.username || x("NO_USERNAME");
    const s = r.hashedUsername || await at(r.username);
    s || x("CANT_HASH_USERNAME");
    const i = await t.personalization(), c = await t.credentialIdsByUsername(s), o = await En(
      // binary credential ids
      c.map((a) => O.toBeArray(a)),
      // challenge
      O.toBeArray(O.sha256(i + O.sha256(e).slice(2)))
    );
    return await t.proxyView(o.credentialIdHashed, o.resp, e);
  }
}
class ue {
  sapphireProvider;
  accountManagerContract;
  abiCoder = O.AbiCoder.defaultAbiCoder();
  events;
  onGetSignature;
  defaultNetworkId = 0;
  rpcUrls = {};
  rpcProviders = {};
  explorerUrls = {
    23294: "https://explorer.oasis.io/mainnet/sapphire",
    23295: "https://explorer.oasis.io/testnet/sapphire"
  };
  lastAccount = {
    username: "",
    authStrategy: "passkey",
    address: "",
    contractAddress: ""
  };
  /**
   * Prepare sapphire provider and account manager (WebAuthn) contract.
   * Prepare data for available chains
   */
  constructor(t) {
    const e = new O.JsonRpcProvider(
      t?.sapphireUrl || "https://testnet.sapphire.oasis.dev"
    );
    if (this.sapphireProvider = fe.wrap(e), this.accountManagerContract = new O.Contract(
      t?.accountManagerAddress || "0x5C357DaFfe6b1016C0c9A5607367E8f47765D4bC",
      pe,
      new O.VoidSigner(O.ZeroAddress, this.sapphireProvider)
    ), this.defaultNetworkId = t?.defaultNetworkId || this.defaultNetworkId, t?.networkConfig)
      for (const r in t.networkConfig)
        this.rpcUrls[r] = t.networkConfig[r].rpcUrl, this.explorerUrls[r] = t.networkConfig[r].explorerUrl;
    this.events = le(), this.onGetSignature = t?.signatureCallback;
  }
  // #region Auth utils
  /**
   * Check if `username` is already registered on accountManager
   */
  async userExists(t) {
    return this.sapphireProvider || x("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || x("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), await this.accountManagerContract.userExists(
      await at(t)
    ) || !1;
  }
  /**
   * Create new "wallet" for username.
   * Creates a new contract for each account on sapphire network.
   */
  async register(t, e) {
    this.sapphireProvider || x("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || x("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED");
    let r;
    t === "password" ? r = await new jt().getRegisterData(e) : t === "passkey" && (r = await new Yt().getRegisterData(e));
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
    ), i = (await this.sapphireProvider.getFeeData()).gasPrice, c = await this.sapphireProvider.getTransactionCount(
      await this.accountManagerContract.gaspayingAddress()
    );
    let o = "";
    if (this.onGetSignature) {
      const u = await this.onGetSignature(s);
      u.signature || x("CANT_GET_SIGNATURE"), o = await this.accountManagerContract.generateGaslessTx(
        s,
        c,
        i,
        u.gasLimit ? BigInt(u.gasLimit) : 1000000n,
        BigInt(u.timestamp),
        u.signature
      );
    } else
      o = await this.accountManagerContract.generateGaslessTx(
        s,
        c,
        i
      );
    const a = await this.sapphireProvider.send("eth_sendRawTransaction", [o]);
    if (this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, await this.waitForTxReceipt(a))
      return await this.getAccountAddress(e.username);
  }
  /**
   * Check that credentials belong to some account.
   */
  async authenticate(t, e) {
    this.sapphireProvider || x("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || x("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), e.username || x("NO_USERNAME");
    const r = "0x000000000000000000000000000000000000000000000000000000000000DEAD", s = await at(e.username), i = new O.Interface(Et), c = i.encodeFunctionData("sign", [r]), o = await this.getProxyForStrategy(t, c, {
      ...e,
      hashedUsername: s
    });
    o || x("NO_LOGIN_PROXY_DATA");
    const [[a, u, g]] = i.decodeFunctionResult("sign", o).toArray(), f = O.recoverAddress(r, {
      r: a,
      s: u,
      v: g
    }), N = await this.accountManagerContract.getAccount(s);
    if (this.lastAccount.authStrategy = t, this.lastAccount.username = e.username, N.length > 1 && f === N[1])
      return await this.getAccountAddress(e.username);
  }
  /**
   * Return address for username.
   * - Public EVM address
   * - Account contract address (deployed on sapphire)
   */
  async getAccountAddress(t) {
    if (this.sapphireProvider || x("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.accountManagerContract || x("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), !t) {
      if (this.lastAccount.address)
        return {
          publicAddress: this.lastAccount.address,
          accountContractAddress: this.lastAccount.contractAddress
        };
      x("NO_USERNAME");
    }
    const e = await at(t), r = await this.accountManagerContract.getAccount(e);
    if (Array.isArray(r) && r.length > 1)
      return this.lastAccount.address = r[1], this.lastAccount.contractAddress = r[0], {
        publicAddress: r[1],
        accountContractAddress: r[0]
      };
  }
  async getAccountBalance(t, e = this.defaultNetworkId, r = 18) {
    if (!e || Ct(e))
      return O.formatUnits(await this.sapphireProvider?.getBalance(t) || 0n, r);
    if (!this.rpcUrls[e])
      return "0";
    const s = this.rpcProviders[e] || new O.JsonRpcProvider(this.rpcUrls[e]);
    return O.formatUnits(await s.getBalance(t), r);
  }
  setAccount(t) {
    this.lastAccount.username = t.username, this.lastAccount.authStrategy = t.strategy, this.lastAccount.address = t.address, this.lastAccount.contractAddress = t.contractAddress;
  }
  // #endregion
  // #region Transactions
  async signMessage(t) {
    this.sapphireProvider || x("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const e = new O.Interface(Et);
    let r = t.data || "";
    const s = t.message;
    if ((!r || t.mustConfirm) && (typeof t.message == "string" && (t.message = O.encodeBytes32String(t.message)), r = e.encodeFunctionData("sign", [t.message]), t.mustConfirm))
      return await new Promise((c) => {
        this.events.emit("signatureRequest", {
          ...t,
          data: r,
          message: s,
          mustConfirm: !1,
          resolve: c
        });
      });
    t.authData || x("AUTHENTICATION_DATA_NOT_PROVIDED");
    const i = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      r,
      t.authData
    );
    if (i) {
      const [c] = e.decodeFunctionResult("sign", i).toArray();
      if (Array.isArray(c) && c.length > 2) {
        const o = O.Signature.from({
          r: c[0],
          s: c[1],
          v: c[2]
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
    const e = this.validateChainId(
      t?.tx?.chainId && +t.tx.chainId.toString() || 0
    );
    if (t.tx.chainId = e, t.tx.nonce || (t.tx.nonce = await this.getRpcProviderForChainId(e).getTransactionCount(
      this.lastAccount.address
    )), t.tx.type === "eip1559" && (t.tx.type = 2, t.tx.gasLimit = t.tx.gas), t.tx.type === 2 && (t.tx.gasPrice || (t.tx.gasPrice = 2e10), t.tx.value || (t.tx.value = 0n)), t.mustConfirm)
      return await new Promise((c) => {
        this.events.emit("txApprove", { plain: { ...t, mustConfirm: !1, resolve: c } });
      });
    t.authData || x("AUTHENTICATION_DATA_NOT_PROVIDED");
    const r = new O.Interface(Et), s = r.encodeFunctionData("signEIP155", [t.tx]), i = await this.getProxyForStrategy(t.strategy, s, t.authData);
    if (i) {
      const [c] = r.decodeFunctionResult("signEIP155", i).toArray();
      return t.resolve && t.resolve({
        signedTxData: c,
        chainId: e
      }), {
        signedTxData: c,
        chainId: e
      };
    }
  }
  /**
   * Send raw transaction data to network.
   * If chainId is provided, the transaction is sent to that network (cross-chain).
   */
  async broadcastTransaction(t, e, r = "Transaction") {
    const s = this.getRpcProviderForChainId(e), i = await s.send("eth_sendRawTransaction", [t]), c = {
      hash: i,
      label: r,
      rawData: t,
      owner: this.lastAccount.address || "none",
      status: "pending",
      chainId: e || this.defaultNetworkId,
      explorerUrl: this.explorerUrls[e || this.defaultNetworkId] ? `${this.explorerUrls[e || this.defaultNetworkId]}/tx/${i}` : "",
      createdAt: Date.now()
    };
    return this.events.emit("txSubmitted", c), {
      txHash: i,
      ethProvider: s,
      txItem: c
    };
  }
  /**
   * Get signed tx for making a contract write call.
   */
  async signContractWrite(t) {
    const e = this.validateChainId(t.chainId);
    if (t.mustConfirm)
      return await new Promise((g) => {
        this.events.emit("txApprove", {
          contractWrite: { ...t, mustConfirm: !1, resolve: g }
        });
      });
    t.authData || x("AUTHENTICATION_DATA_NOT_PROVIDED");
    const r = await this.getAccountAddress(t.authData.username);
    r?.publicAddress || x("CANT_GET_ACCOUNT_ADDRESS");
    const i = new O.Interface(t.contractAbi).encodeFunctionData(
      t.contractFunctionName,
      t.contractFunctionValues
    ), c = await new O.VoidSigner(
      r.publicAddress,
      this.getRpcProviderForChainId(e)
    ).populateTransaction({
      from: r.publicAddress,
      to: t.contractAddress,
      gasLimit: 1e6,
      value: 0,
      data: i
    });
    c.gasPrice = 2e10;
    const o = new O.Interface(Et), a = o.encodeFunctionData("signEIP155", [c]), u = await this.getProxyForStrategy(
      t.strategy || this.lastAccount.authStrategy,
      a,
      t.authData
    );
    if (u) {
      const [g] = o.decodeFunctionResult("signEIP155", u).toArray();
      return t.resolve && t.resolve({
        signedTxData: g,
        chainId: e
      }), {
        signedTxData: g,
        chainId: e
      };
    }
  }
  /**
   * Get result of contract read.
   * Utility function, this has nothing to do with Oasis.
   */
  async contractRead(t) {
    const e = this.validateChainId(t.chainId), r = this.getRpcProviderForChainId(e), s = new O.Contract(t.contractAddress, t.contractAbi, r);
    return t.contractFunctionValues ? await s[t.contractFunctionName](...t.contractFunctionValues) : await s[t.contractFunctionName]();
  }
  // #endregion
  // #region Helpers
  /**
   * Helper for triggering different auth strategies
   */
  async getProxyForStrategy(t, e, r) {
    if (this.accountManagerContract || x("ACCOUNT_MANAGER_CONTRACT_NOT_INITIALIZED"), t === "password")
      return await new jt().getProxyResponse(
        this.accountManagerContract,
        e,
        r
      );
    if (t === "passkey")
      return await new Yt().getProxyResponse(
        this.accountManagerContract,
        e,
        r
      );
  }
  /**
   * Helper for waiting for tx receipt
   */
  async waitForTxReceipt(t, e) {
    !e && !this.sapphireProvider && x("SAPPHIRE_PROVIDER_NOT_INITIALIZED");
    const r = 60;
    let s = 0;
    for (; ; ) {
      const i = await (e || this.sapphireProvider).getTransactionReceipt(t);
      if (i)
        return i;
      if (s += 1, s >= r)
        return;
      await new Promise((c) => setTimeout(c, 1e3));
    }
  }
  setDefaultNetworkId(t) {
    this.rpcUrls[t] && (this.defaultNetworkId = t);
  }
  /**
   * Check if rpc is configured for desired network ID.
   */
  validateChainId(t) {
    return (t && !Ct(t) && !this.rpcUrls[t] || !t && this.defaultNetworkId && !this.rpcUrls[this.defaultNetworkId]) && x("NO_RPC_URL_CONFIGURED_FOR_SELECTED_CHAINID"), !t && this.defaultNetworkId && (t = this.defaultNetworkId), t;
  }
  /**
   * Get provider object for chainId.
   * If no chainId specified, use sapphire network rpc.
   */
  getRpcProviderForChainId(t) {
    if (!t || t && Ct(+t.toString()))
      return this.sapphireProvider || x("SAPPHIRE_PROVIDER_NOT_INITIALIZED"), this.sapphireProvider;
    {
      const e = this.rpcProviders[t] || new O.JsonRpcProvider(this.rpcUrls[t]);
      return this.rpcProviders[t] = e, e || x("CROSS_CHAIN_PROVIDER_NOT_INITIALIZED"), e;
    }
  }
  // #endregion
}
export {
  pe as A,
  On as E,
  ue as O,
  Sn as W,
  at as a,
  x as b,
  Tn as c,
  fn as g,
  vn as i,
  Ct as n
};
