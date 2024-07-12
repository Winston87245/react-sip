import { jsxs as nt, jsx as at } from "react/jsx-runtime";
import { createContext as ot, useState as ct, useRef as Ae, useEffect as dt } from "react";
const ht = "0.21.1";
class ce extends Error {
  constructor(e) {
    super(e), Object.setPrototypeOf(this, new.target.prototype);
  }
}
class qe extends ce {
  constructor(e) {
    super(e || "Unsupported content type.");
  }
}
class we extends ce {
  /** @internal */
  constructor(e) {
    super(e || "Request pending.");
  }
}
class lt extends ce {
  constructor(e) {
    super(e || "Unspecified session description handler error.");
  }
}
class De extends ce {
  constructor() {
    super("The session has terminated.");
  }
}
class fe extends ce {
  constructor(e) {
    super(e || "An error occurred during state transition.");
  }
}
class ut {
  /** @internal */
  constructor(e) {
    this.incomingAckRequest = e;
  }
  /** Incoming ACK request message. */
  get request() {
    return this.incomingAckRequest.message;
  }
}
class gt {
  /** @internal */
  constructor(e) {
    this.incomingByeRequest = e;
  }
  /** Incoming BYE request message. */
  get request() {
    return this.incomingByeRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingByeRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingByeRequest.reject(e), Promise.resolve();
  }
}
class ft {
  /** @internal */
  constructor(e) {
    this.incomingCancelRequest = e;
  }
  /** Incoming CANCEL request message. */
  get request() {
    return this.incomingCancelRequest;
  }
}
class ve {
  constructor() {
    this.listeners = new Array();
  }
  /**
   * Sets up a function that will be called whenever the target changes.
   * @param listener - Callback function.
   * @param options - An options object that specifies characteristics about the listener.
   *                  If once true, indicates that the listener should be invoked at most once after being added.
   *                  If once true, the listener would be automatically removed when invoked.
   */
  addListener(e, t) {
    const r = (s) => {
      this.removeListener(r), e(s);
    };
    (t == null ? void 0 : t.once) === !0 ? this.listeners.push(r) : this.listeners.push(e);
  }
  /**
   * Emit change.
   * @param data - Data to emit.
   */
  emit(e) {
    this.listeners.slice().forEach((t) => t(e));
  }
  /**
   * Removes all listeners previously registered with addListener.
   */
  removeAllListeners() {
    this.listeners = [];
  }
  /**
   * Removes a listener previously registered with addListener.
   * @param listener - Callback function.
   */
  removeListener(e) {
    this.listeners = this.listeners.filter((t) => t !== e);
  }
  /**
   * Registers a listener.
   * @param listener - Callback function.
   * @deprecated Use addListener.
   */
  on(e) {
    return this.addListener(e);
  }
  /**
   * Unregisters a listener.
   * @param listener - Callback function.
   * @deprecated Use removeListener.
   */
  off(e) {
    return this.removeListener(e);
  }
  /**
   * Registers a listener then unregisters the listener after one event emission.
   * @param listener - Callback function.
   * @deprecated Use addListener.
   */
  once(e) {
    return this.addListener(e, { once: !0 });
  }
}
class pt {
  /** @internal */
  constructor(e) {
    this.incomingInfoRequest = e;
  }
  /** Incoming MESSAGE request message. */
  get request() {
    return this.incomingInfoRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingInfoRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingInfoRequest.reject(e), Promise.resolve();
  }
}
class Ge {
  constructor(e) {
    this.parameters = {};
    for (const t in e)
      e.hasOwnProperty(t) && this.setParam(t, e[t]);
  }
  setParam(e, t) {
    e && (this.parameters[e.toLowerCase()] = typeof t > "u" || t === null ? null : t.toString());
  }
  getParam(e) {
    if (e)
      return this.parameters[e.toLowerCase()];
  }
  hasParam(e) {
    return !!(e && this.parameters[e.toLowerCase()] !== void 0);
  }
  deleteParam(e) {
    if (e = e.toLowerCase(), this.hasParam(e)) {
      const t = this.parameters[e];
      return delete this.parameters[e], t;
    }
  }
  clearParams() {
    this.parameters = {};
  }
}
class O extends Ge {
  /**
   * Constructor
   * @param uri -
   * @param displayName -
   * @param parameters -
   */
  constructor(e, t, r) {
    super(r), this.uri = e, this._displayName = t;
  }
  get friendlyName() {
    return this.displayName || this.uri.aor;
  }
  get displayName() {
    return this._displayName;
  }
  set displayName(e) {
    this._displayName = e;
  }
  clone() {
    return new O(this.uri.clone(), this._displayName, JSON.parse(JSON.stringify(this.parameters)));
  }
  toString() {
    let e = this.displayName || this.displayName === "0" ? '"' + this.displayName + '" ' : "";
    e += "<" + this.uri.toString() + ">";
    for (const t in this.parameters)
      this.parameters.hasOwnProperty(t) && (e += ";" + t, this.parameters[t] !== null && (e += "=" + this.parameters[t]));
    return e;
  }
}
class J extends Ge {
  /**
   * Constructor
   * @param scheme -
   * @param user -
   * @param host -
   * @param port -
   * @param parameters -
   * @param headers -
   */
  constructor(e = "sip", t, r, s, i, n) {
    if (super(i || {}), this.headers = {}, !r)
      throw new TypeError('missing or invalid "host" parameter');
    for (const o in n)
      n.hasOwnProperty(o) && this.setHeader(o, n[o]);
    this.raw = {
      scheme: e,
      user: t,
      host: r,
      port: s
    }, this.normal = {
      scheme: e.toLowerCase(),
      user: t,
      host: r.toLowerCase(),
      port: s
    };
  }
  get scheme() {
    return this.normal.scheme;
  }
  set scheme(e) {
    this.raw.scheme = e, this.normal.scheme = e.toLowerCase();
  }
  get user() {
    return this.normal.user;
  }
  set user(e) {
    this.normal.user = this.raw.user = e;
  }
  get host() {
    return this.normal.host;
  }
  set host(e) {
    this.raw.host = e, this.normal.host = e.toLowerCase();
  }
  get aor() {
    return this.normal.user + "@" + this.normal.host;
  }
  get port() {
    return this.normal.port;
  }
  set port(e) {
    this.normal.port = this.raw.port = e;
  }
  setHeader(e, t) {
    this.headers[this.headerize(e)] = t instanceof Array ? t : [t];
  }
  getHeader(e) {
    if (e)
      return this.headers[this.headerize(e)];
  }
  hasHeader(e) {
    return !!e && !!this.headers.hasOwnProperty(this.headerize(e));
  }
  deleteHeader(e) {
    if (e = this.headerize(e), this.headers.hasOwnProperty(e)) {
      const t = this.headers[e];
      return delete this.headers[e], t;
    }
  }
  clearHeaders() {
    this.headers = {};
  }
  clone() {
    return new J(this._raw.scheme, this._raw.user || "", this._raw.host, this._raw.port, JSON.parse(JSON.stringify(this.parameters)), JSON.parse(JSON.stringify(this.headers)));
  }
  toRaw() {
    return this._toString(this._raw);
  }
  toString() {
    return this._toString(this._normal);
  }
  get _normal() {
    return this.normal;
  }
  get _raw() {
    return this.raw;
  }
  _toString(e) {
    let t = e.scheme + ":";
    e.scheme.toLowerCase().match("^sips?$") || (t += "//"), e.user && (t += this.escapeUser(e.user) + "@"), t += e.host, (e.port || e.port === 0) && (t += ":" + e.port);
    for (const s in this.parameters)
      this.parameters.hasOwnProperty(s) && (t += ";" + s, this.parameters[s] !== null && (t += "=" + this.parameters[s]));
    const r = [];
    for (const s in this.headers)
      if (this.headers.hasOwnProperty(s))
        for (const i in this.headers[s])
          this.headers[s].hasOwnProperty(i) && r.push(s + "=" + this.headers[s][i]);
    return r.length > 0 && (t += "?" + r.join("&")), t;
  }
  /*
   * Hex-escape a SIP URI user.
   * @private
   * @param {String} user
   */
  escapeUser(e) {
    let t;
    try {
      t = decodeURIComponent(e);
    } catch (r) {
      throw r;
    }
    return encodeURIComponent(t).replace(/%3A/ig, ":").replace(/%2B/ig, "+").replace(/%3F/ig, "?").replace(/%2F/ig, "/");
  }
  headerize(e) {
    const t = {
      "Call-Id": "Call-ID",
      Cseq: "CSeq",
      "Min-Se": "Min-SE",
      Rack: "RAck",
      Rseq: "RSeq",
      "Www-Authenticate": "WWW-Authenticate"
    }, r = e.toLowerCase().replace(/_/g, "-").split("-"), s = r.length;
    let i = "";
    for (let n = 0; n < s; n++)
      n !== 0 && (i += "-"), i += r[n].charAt(0).toUpperCase() + r[n].substring(1);
    return t[i] && (i = t[i]), i;
  }
}
function je(a, e) {
  if (a.scheme !== e.scheme || a.user !== e.user || a.host !== e.host || a.port !== e.port)
    return !1;
  function t(i, n) {
    const o = Object.keys(i.parameters), d = Object.keys(n.parameters);
    return !(!o.filter((f) => d.includes(f)).every((f) => i.parameters[f] === n.parameters[f]) || !["user", "ttl", "method", "transport"].every((f) => i.hasParam(f) && n.hasParam(f) || !i.hasParam(f) && !n.hasParam(f)) || !["maddr"].every((f) => i.hasParam(f) && n.hasParam(f) || !i.hasParam(f) && !n.hasParam(f)));
  }
  if (!t(a, e))
    return !1;
  const r = Object.keys(a.headers), s = Object.keys(e.headers);
  if (r.length !== 0 || s.length !== 0) {
    if (r.length !== s.length)
      return !1;
    const i = r.filter((n) => s.includes(n));
    if (i.length !== s.length || !i.every((n) => a.headers[n].length && e.headers[n].length && a.headers[n][0] === e.headers[n][0]))
      return !1;
  }
  return !0;
}
function He(a, e, t) {
  return t = t || " ", a.length > e ? a : (e -= a.length, t += t.repeat(e), a + t.slice(0, e));
}
class de extends Error {
  constructor(e, t, r, s) {
    super(), this.message = e, this.expected = t, this.found = r, this.location = s, this.name = "SyntaxError", typeof Object.setPrototypeOf == "function" ? Object.setPrototypeOf(this, de.prototype) : this.__proto__ = de.prototype, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, de);
  }
  static buildMessage(e, t) {
    function r(w) {
      return w.charCodeAt(0).toString(16).toUpperCase();
    }
    function s(w) {
      return w.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (f) => "\\x0" + r(f)).replace(/[\x10-\x1F\x7F-\x9F]/g, (f) => "\\x" + r(f));
    }
    function i(w) {
      return w.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (f) => "\\x0" + r(f)).replace(/[\x10-\x1F\x7F-\x9F]/g, (f) => "\\x" + r(f));
    }
    function n(w) {
      switch (w.type) {
        case "literal":
          return '"' + s(w.text) + '"';
        case "class":
          const f = w.parts.map((m) => Array.isArray(m) ? i(m[0]) + "-" + i(m[1]) : i(m));
          return "[" + (w.inverted ? "^" : "") + f + "]";
        case "any":
          return "any character";
        case "end":
          return "end of input";
        case "other":
          return w.description;
      }
    }
    function o(w) {
      const f = w.map(n);
      let m, E;
      if (f.sort(), f.length > 0) {
        for (m = 1, E = 1; m < f.length; m++)
          f[m - 1] !== f[m] && (f[E] = f[m], E++);
        f.length = E;
      }
      switch (f.length) {
        case 1:
          return f[0];
        case 2:
          return f[0] + " or " + f[1];
        default:
          return f.slice(0, -1).join(", ") + ", or " + f[f.length - 1];
      }
    }
    function d(w) {
      return w ? '"' + s(w) + '"' : "end of input";
    }
    return "Expected " + o(e) + " but " + d(t) + " found.";
  }
  format(e) {
    let t = "Error: " + this.message;
    if (this.location) {
      let r = null, s;
      for (s = 0; s < e.length; s++)
        if (e[s].source === this.location.source) {
          r = e[s].text.split(/\r\n|\n|\r/g);
          break;
        }
      let i = this.location.start, n = this.location.source + ":" + i.line + ":" + i.column;
      if (r) {
        let o = this.location.end, d = He("", i.line.toString().length, " "), w = r[i.line - 1], f = i.line === o.line ? o.column : w.length + 1;
        t += `
 --> ` + n + `
` + d + ` |
` + i.line + " | " + w + `
` + d + " | " + He("", i.column - 1, " ") + He("", f - i.column, "^");
      } else
        t += `
 at ` + n;
    }
    return t;
  }
}
function mt(a, e) {
  e = e !== void 0 ? e : {};
  const t = {}, r = e.grammarSource, s = { Contact: 119, Name_Addr_Header: 156, Record_Route: 176, Request_Response: 81, SIP_URI: 45, Subscription_State: 186, Supported: 191, Require: 182, Via: 194, absoluteURI: 84, Call_ID: 118, Content_Disposition: 130, Content_Length: 135, Content_Type: 136, CSeq: 146, displayName: 122, Event: 149, From: 151, host: 52, Max_Forwards: 154, Min_SE: 213, Proxy_Authenticate: 157, quoted_string: 40, Refer_To: 178, Replaces: 179, Session_Expires: 210, stun_URI: 217, To: 192, turn_URI: 223, uuid: 226, WWW_Authenticate: 209, challenge: 158, sipfrag: 230, Referred_By: 231 };
  let i = 119;
  const n = [
    `\r
`,
    g(`\r
`, !1),
    /^[0-9]/,
    R([["0", "9"]], !1, !1),
    /^[a-zA-Z]/,
    R([["a", "z"], ["A", "Z"]], !1, !1),
    /^[0-9a-fA-F]/,
    R([["0", "9"], ["a", "f"], ["A", "F"]], !1, !1),
    /^[\0-\xFF]/,
    R([["\0", "ÿ"]], !1, !1),
    /^["]/,
    R(['"'], !1, !1),
    " ",
    g(" ", !1),
    "	",
    g("	", !1),
    /^[a-zA-Z0-9]/,
    R([["a", "z"], ["A", "Z"], ["0", "9"]], !1, !1),
    ";",
    g(";", !1),
    "/",
    g("/", !1),
    "?",
    g("?", !1),
    ":",
    g(":", !1),
    "@",
    g("@", !1),
    "&",
    g("&", !1),
    "=",
    g("=", !1),
    "+",
    g("+", !1),
    "$",
    g("$", !1),
    ",",
    g(",", !1),
    "-",
    g("-", !1),
    "_",
    g("_", !1),
    ".",
    g(".", !1),
    "!",
    g("!", !1),
    "~",
    g("~", !1),
    "*",
    g("*", !1),
    "'",
    g("'", !1),
    "(",
    g("(", !1),
    ")",
    g(")", !1),
    "%",
    g("%", !1),
    function() {
      return " ";
    },
    function() {
      return ":";
    },
    /^[!-~]/,
    R([["!", "~"]], !1, !1),
    /^[\x80-\uFFFF]/,
    R([["", "￿"]], !1, !1),
    /^[\x80-\xBF]/,
    R([["", "¿"]], !1, !1),
    /^[a-f]/,
    R([["a", "f"]], !1, !1),
    "`",
    g("`", !1),
    "<",
    g("<", !1),
    ">",
    g(">", !1),
    "\\",
    g("\\", !1),
    "[",
    g("[", !1),
    "]",
    g("]", !1),
    "{",
    g("{", !1),
    "}",
    g("}", !1),
    function() {
      return "*";
    },
    function() {
      return "/";
    },
    function() {
      return "=";
    },
    function() {
      return "(";
    },
    function() {
      return ")";
    },
    function() {
      return ">";
    },
    function() {
      return "<";
    },
    function() {
      return ",";
    },
    function() {
      return ";";
    },
    function() {
      return ":";
    },
    function() {
      return '"';
    },
    /^[!-']/,
    R([["!", "'"]], !1, !1),
    /^[*-[]/,
    R([["*", "["]], !1, !1),
    /^[\]-~]/,
    R([["]", "~"]], !1, !1),
    function(h) {
      return h;
    },
    /^[#-[]/,
    R([["#", "["]], !1, !1),
    /^[\0-\t]/,
    R([["\0", "	"]], !1, !1),
    /^[\v-\f]/,
    R([["\v", "\f"]], !1, !1),
    /^[\x0E-\x7F]/,
    R([["", ""]], !1, !1),
    function() {
      e = e || { data: {} }, e.data.uri = new J(e.data.scheme, e.data.user, e.data.host, e.data.port), delete e.data.scheme, delete e.data.user, delete e.data.host, delete e.data.host_type, delete e.data.port;
    },
    function() {
      e = e || { data: {} }, e.data.uri = new J(e.data.scheme, e.data.user, e.data.host, e.data.port, e.data.uri_params, e.data.uri_headers), delete e.data.scheme, delete e.data.user, delete e.data.host, delete e.data.host_type, delete e.data.port, delete e.data.uri_params, e.startRule === "SIP_URI" && (e.data = e.data.uri);
    },
    "sips",
    g("sips", !0),
    "sip",
    g("sip", !0),
    function(h) {
      e = e || { data: {} }, e.data.scheme = h;
    },
    function() {
      e = e || { data: {} }, e.data.user = decodeURIComponent(S().slice(0, -1));
    },
    function() {
      e = e || { data: {} }, e.data.password = S();
    },
    function() {
      return e = e || { data: {} }, e.data.host = S(), e.data.host;
    },
    function() {
      return e = e || { data: {} }, e.data.host_type = "domain", S();
    },
    /^[a-zA-Z0-9_\-]/,
    R([["a", "z"], ["A", "Z"], ["0", "9"], "_", "-"], !1, !1),
    /^[a-zA-Z0-9\-]/,
    R([["a", "z"], ["A", "Z"], ["0", "9"], "-"], !1, !1),
    function() {
      return e = e || { data: {} }, e.data.host_type = "IPv6", S();
    },
    "::",
    g("::", !1),
    function() {
      return e = e || { data: {} }, e.data.host_type = "IPv6", S();
    },
    function() {
      return e = e || { data: {} }, e.data.host_type = "IPv4", S();
    },
    "25",
    g("25", !1),
    /^[0-5]/,
    R([["0", "5"]], !1, !1),
    "2",
    g("2", !1),
    /^[0-4]/,
    R([["0", "4"]], !1, !1),
    "1",
    g("1", !1),
    /^[1-9]/,
    R([["1", "9"]], !1, !1),
    function(h) {
      return e = e || { data: {} }, h = parseInt(h.join("")), e.data.port = h, h;
    },
    "transport=",
    g("transport=", !0),
    "udp",
    g("udp", !0),
    "tcp",
    g("tcp", !0),
    "sctp",
    g("sctp", !0),
    "tls",
    g("tls", !0),
    function(h) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.transport = h.toLowerCase();
    },
    "user=",
    g("user=", !0),
    "phone",
    g("phone", !0),
    "ip",
    g("ip", !0),
    function(h) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.user = h.toLowerCase();
    },
    "method=",
    g("method=", !0),
    function(h) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.method = h;
    },
    "ttl=",
    g("ttl=", !0),
    function(h) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), e.data.params.ttl = h;
    },
    "maddr=",
    g("maddr=", !0),
    function(h) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.maddr = h;
    },
    "lr",
    g("lr", !0),
    function() {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), e.data.uri_params.lr = void 0;
    },
    function(h, v) {
      e = e || { data: {} }, e.data.uri_params || (e.data.uri_params = {}), v === null ? v = void 0 : v = v[1], e.data.uri_params[h.toLowerCase()] = v;
    },
    function(h, v) {
      h = h.join("").toLowerCase(), v = v.join(""), e = e || { data: {} }, e.data.uri_headers || (e.data.uri_headers = {}), e.data.uri_headers[h] ? e.data.uri_headers[h].push(v) : e.data.uri_headers[h] = [v];
    },
    function() {
      e = e || { data: {} }, e.startRule === "Refer_To" && (e.data.uri = new J(e.data.scheme, e.data.user, e.data.host, e.data.port, e.data.uri_params, e.data.uri_headers), delete e.data.scheme, delete e.data.user, delete e.data.host, delete e.data.host_type, delete e.data.port, delete e.data.uri_params);
    },
    "//",
    g("//", !1),
    function() {
      e = e || { data: {} }, e.data.scheme = S();
    },
    g("SIP", !0),
    function() {
      e = e || { data: {} }, e.data.sip_version = S();
    },
    "INVITE",
    g("INVITE", !1),
    "ACK",
    g("ACK", !1),
    "VXACH",
    g("VXACH", !1),
    "OPTIONS",
    g("OPTIONS", !1),
    "BYE",
    g("BYE", !1),
    "CANCEL",
    g("CANCEL", !1),
    "REGISTER",
    g("REGISTER", !1),
    "SUBSCRIBE",
    g("SUBSCRIBE", !1),
    "NOTIFY",
    g("NOTIFY", !1),
    "REFER",
    g("REFER", !1),
    "PUBLISH",
    g("PUBLISH", !1),
    function() {
      return e = e || { data: {} }, e.data.method = S(), e.data.method;
    },
    function(h) {
      e = e || { data: {} }, e.data.status_code = parseInt(h.join(""));
    },
    function() {
      e = e || { data: {} }, e.data.reason_phrase = S();
    },
    function() {
      e = e || { data: {} }, e.data = S();
    },
    function() {
      var h, v;
      for (e = e || { data: {} }, v = e.data.multi_header.length, h = 0; h < v; h++)
        if (e.data.multi_header[h].parsed === null) {
          e.data = null;
          break;
        }
      e.data !== null ? e.data = e.data.multi_header : e.data = -1;
    },
    function() {
      var h;
      e = e || { data: {} }, e.data.multi_header || (e.data.multi_header = []);
      try {
        h = new O(e.data.uri, e.data.displayName, e.data.params), delete e.data.uri, delete e.data.displayName, delete e.data.params;
      } catch {
        h = null;
      }
      e.data.multi_header.push({
        position: d,
        offset: X().start.offset,
        parsed: h
      });
    },
    function(h) {
      h = S().trim(), h[0] === '"' && (h = h.substring(1, h.length - 1)), e = e || { data: {} }, e.data.displayName = h;
    },
    "q",
    g("q", !0),
    function(h) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), e.data.params.q = h;
    },
    "expires",
    g("expires", !0),
    function(h) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), e.data.params.expires = h;
    },
    function(h) {
      return parseInt(h.join(""));
    },
    "0",
    g("0", !1),
    function() {
      return parseFloat(S());
    },
    function(h, v) {
      e = e || { data: {} }, e.data.params || (e.data.params = {}), v === null ? v = void 0 : v = v[1], e.data.params[h.toLowerCase()] = v;
    },
    "render",
    g("render", !0),
    "session",
    g("session", !0),
    "icon",
    g("icon", !0),
    "alert",
    g("alert", !0),
    function() {
      e = e || { data: {} }, e.startRule === "Content_Disposition" && (e.data.type = S().toLowerCase());
    },
    "handling",
    g("handling", !0),
    "optional",
    g("optional", !0),
    "required",
    g("required", !0),
    function(h) {
      e = e || { data: {} }, e.data = parseInt(h.join(""));
    },
    function() {
      e = e || { data: {} }, e.data = S();
    },
    "text",
    g("text", !0),
    "image",
    g("image", !0),
    "audio",
    g("audio", !0),
    "video",
    g("video", !0),
    "application",
    g("application", !0),
    "message",
    g("message", !0),
    "multipart",
    g("multipart", !0),
    "x-",
    g("x-", !0),
    function(h) {
      e = e || { data: {} }, e.data.value = parseInt(h.join(""));
    },
    function(h) {
      e = e || { data: {} }, e.data = h;
    },
    function(h) {
      e = e || { data: {} }, e.data.event = h.toLowerCase();
    },
    function() {
      e = e || { data: {} };
      var h = e.data.tag;
      e.data = new O(e.data.uri, e.data.displayName, e.data.params), h && e.data.setParam("tag", h);
    },
    "tag",
    g("tag", !0),
    function(h) {
      e = e || { data: {} }, e.data.tag = h;
    },
    function(h) {
      e = e || { data: {} }, e.data = parseInt(h.join(""));
    },
    function(h) {
      e = e || { data: {} }, e.data = h;
    },
    function() {
      e = e || { data: {} }, e.data = new O(e.data.uri, e.data.displayName, e.data.params);
    },
    "digest",
    g("Digest", !0),
    "realm",
    g("realm", !0),
    function(h) {
      e = e || { data: {} }, e.data.realm = h;
    },
    "domain",
    g("domain", !0),
    "nonce",
    g("nonce", !0),
    function(h) {
      e = e || { data: {} }, e.data.nonce = h;
    },
    "opaque",
    g("opaque", !0),
    function(h) {
      e = e || { data: {} }, e.data.opaque = h;
    },
    "stale",
    g("stale", !0),
    "true",
    g("true", !0),
    function() {
      e = e || { data: {} }, e.data.stale = !0;
    },
    "false",
    g("false", !0),
    function() {
      e = e || { data: {} }, e.data.stale = !1;
    },
    "algorithm",
    g("algorithm", !0),
    "md5",
    g("MD5", !0),
    "md5-sess",
    g("MD5-sess", !0),
    function(h) {
      e = e || { data: {} }, e.data.algorithm = h.toUpperCase();
    },
    "qop",
    g("qop", !0),
    "auth-int",
    g("auth-int", !0),
    "auth",
    g("auth", !0),
    function(h) {
      e = e || { data: {} }, e.data.qop || (e.data.qop = []), e.data.qop.push(h.toLowerCase());
    },
    function(h) {
      e = e || { data: {} }, e.data.value = parseInt(h.join(""));
    },
    function() {
      var h, v;
      for (e = e || { data: {} }, v = e.data.multi_header.length, h = 0; h < v; h++)
        if (e.data.multi_header[h].parsed === null) {
          e.data = null;
          break;
        }
      e.data !== null ? e.data = e.data.multi_header : e.data = -1;
    },
    function() {
      var h;
      e = e || { data: {} }, e.data.multi_header || (e.data.multi_header = []);
      try {
        h = new O(e.data.uri, e.data.displayName, e.data.params), delete e.data.uri, delete e.data.displayName, delete e.data.params;
      } catch {
        h = null;
      }
      e.data.multi_header.push({
        position: d,
        offset: X().start.offset,
        parsed: h
      });
    },
    function() {
      e = e || { data: {} }, e.data = new O(e.data.uri, e.data.displayName, e.data.params);
    },
    function() {
      e = e || { data: {} }, e.data.replaces_from_tag && e.data.replaces_to_tag || (e.data = -1);
    },
    function() {
      e = e || { data: {} }, e.data = {
        call_id: e.data
      };
    },
    "from-tag",
    g("from-tag", !0),
    function(h) {
      e = e || { data: {} }, e.data.replaces_from_tag = h;
    },
    "to-tag",
    g("to-tag", !0),
    function(h) {
      e = e || { data: {} }, e.data.replaces_to_tag = h;
    },
    "early-only",
    g("early-only", !0),
    function() {
      e = e || { data: {} }, e.data.early_only = !0;
    },
    function(h, v) {
      return v;
    },
    function(h, v) {
      return st(h, v);
    },
    function(h) {
      e = e || { data: {} }, e.startRule === "Require" && (e.data = h || []);
    },
    function(h) {
      e = e || { data: {} }, e.data.value = parseInt(h.join(""));
    },
    "active",
    g("active", !0),
    "pending",
    g("pending", !0),
    "terminated",
    g("terminated", !0),
    function() {
      e = e || { data: {} }, e.data.state = S();
    },
    "reason",
    g("reason", !0),
    function(h) {
      e = e || { data: {} }, typeof h < "u" && (e.data.reason = h);
    },
    function(h) {
      e = e || { data: {} }, typeof h < "u" && (e.data.expires = h);
    },
    "retry_after",
    g("retry_after", !0),
    function(h) {
      e = e || { data: {} }, typeof h < "u" && (e.data.retry_after = h);
    },
    "deactivated",
    g("deactivated", !0),
    "probation",
    g("probation", !0),
    "rejected",
    g("rejected", !0),
    "timeout",
    g("timeout", !0),
    "giveup",
    g("giveup", !0),
    "noresource",
    g("noresource", !0),
    "invariant",
    g("invariant", !0),
    function(h) {
      e = e || { data: {} }, e.startRule === "Supported" && (e.data = h || []);
    },
    function() {
      e = e || { data: {} };
      var h = e.data.tag;
      e.data = new O(e.data.uri, e.data.displayName, e.data.params), h && e.data.setParam("tag", h);
    },
    "ttl",
    g("ttl", !0),
    function(h) {
      e = e || { data: {} }, e.data.ttl = h;
    },
    "maddr",
    g("maddr", !0),
    function(h) {
      e = e || { data: {} }, e.data.maddr = h;
    },
    "received",
    g("received", !0),
    function(h) {
      e = e || { data: {} }, e.data.received = h;
    },
    "branch",
    g("branch", !0),
    function(h) {
      e = e || { data: {} }, e.data.branch = h;
    },
    "rport",
    g("rport", !0),
    function(h) {
      e = e || { data: {} }, typeof h < "u" && (e.data.rport = h.join(""));
    },
    function(h) {
      e = e || { data: {} }, e.data.protocol = h;
    },
    g("UDP", !0),
    g("TCP", !0),
    g("TLS", !0),
    g("SCTP", !0),
    function(h) {
      e = e || { data: {} }, e.data.transport = h;
    },
    function() {
      e = e || { data: {} }, e.data.host = S();
    },
    function(h) {
      e = e || { data: {} }, e.data.port = parseInt(h.join(""));
    },
    function(h) {
      return parseInt(h.join(""));
    },
    function(h) {
      e = e || { data: {} }, e.startRule === "Session_Expires" && (e.data.deltaSeconds = h);
    },
    "refresher",
    g("refresher", !1),
    "uas",
    g("uas", !1),
    "uac",
    g("uac", !1),
    function(h) {
      e = e || { data: {} }, e.startRule === "Session_Expires" && (e.data.refresher = h);
    },
    function(h) {
      e = e || { data: {} }, e.startRule === "Min_SE" && (e.data = h);
    },
    "stuns",
    g("stuns", !0),
    "stun",
    g("stun", !0),
    function(h) {
      e = e || { data: {} }, e.data.scheme = h;
    },
    function(h) {
      e = e || { data: {} }, e.data.host = h;
    },
    "?transport=",
    g("?transport=", !1),
    "turns",
    g("turns", !0),
    "turn",
    g("turn", !0),
    function(h) {
      e = e || { data: {} }, e.data.transport = h;
    },
    function() {
      e = e || { data: {} }, e.data = S();
    },
    "Referred-By",
    g("Referred-By", !1),
    "b",
    g("b", !1),
    "cid",
    g("cid", !1)
  ], o = [
    c('2 ""6 7!'),
    c('4"""5!7#'),
    c('4$""5!7%'),
    c(`4&""5!7'`),
    c(";'.# &;("),
    c('4(""5!7)'),
    c('4*""5!7+'),
    c('2,""6,7-'),
    c('2.""6.7/'),
    c('40""5!71'),
    c('22""6273. &24""6475.} &26""6677.q &28""6879.e &2:""6:7;.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E'),
    c(";).# &;,"),
    c('2F""6F7G.} &2H""6H7I.q &2J""6J7K.e &2L""6L7M.Y &2N""6N7O.M &2P""6P7Q.A &2R""6R7S.5 &2T""6T7U.) &2V""6V7W'),
    c(`%%2X""6X7Y/5#;#/,$;#/#$+#)(#'#("'#&'#/"!&,)`),
    c(`%%$;$0#*;$&/,#; /#$+")("'#&'#." &"/=#$;$/&#0#*;$&&&#/'$8":Z" )("'#&'#`),
    c(';.." &"'),
    c(`%$;'.# &;(0)*;'.# &;(&/?#28""6879/0$;//'$8#:[# )(#'#("'#&'#`),
    c(`%%$;2/&#0#*;2&&&#/g#$%$;.0#*;.&/,#;2/#$+")("'#&'#0=*%$;.0#*;.&/,#;2/#$+")("'#&'#&/#$+")("'#&'#/"!&,)`),
    c('4\\""5!7].# &;3'),
    c('4^""5!7_'),
    c('4`""5!7a'),
    c(';!.) &4b""5!7c'),
    c('%$;). &2F""6F7G. &2J""6J7K.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O/#0*;). &2F""6F7G. &2J""6J7K.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O&&&#/"!&,)'),
    c('%$;). &2F""6F7G.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O/#0*;). &2F""6F7G.} &2L""6L7M.q &2X""6X7Y.e &2P""6P7Q.Y &2H""6H7I.M &2@""6@7A.A &2d""6d7e.5 &2R""6R7S.) &2N""6N7O&&&#/"!&,)'),
    c(`2T""6T7U.ã &2V""6V7W.× &2f""6f7g.Ë &2h""6h7i.¿ &2:""6:7;.³ &2D""6D7E.§ &22""6273. &28""6879. &2j""6j7k. &;&.} &24""6475.q &2l""6l7m.e &2n""6n7o.Y &26""6677.M &2>""6>7?.A &2p""6p7q.5 &2r""6r7s.) &;'.# &;(`),
    c('%$;).ī &2F""6F7G.ğ &2J""6J7K.ē &2L""6L7M.ć &2X""6X7Y.û &2P""6P7Q.ï &2H""6H7I.ã &2@""6@7A.× &2d""6d7e.Ë &2R""6R7S.¿ &2N""6N7O.³ &2T""6T7U.§ &2V""6V7W. &2f""6f7g. &2h""6h7i. &28""6879.w &2j""6j7k.k &;&.e &24""6475.Y &2l""6l7m.M &2n""6n7o.A &26""6677.5 &2p""6p7q.) &2r""6r7s/Ĵ#0ı*;).ī &2F""6F7G.ğ &2J""6J7K.ē &2L""6L7M.ć &2X""6X7Y.û &2P""6P7Q.ï &2H""6H7I.ã &2@""6@7A.× &2d""6d7e.Ë &2R""6R7S.¿ &2N""6N7O.³ &2T""6T7U.§ &2V""6V7W. &2f""6f7g. &2h""6h7i. &28""6879.w &2j""6j7k.k &;&.e &24""6475.Y &2l""6l7m.M &2n""6n7o.A &26""6677.5 &2p""6p7q.) &2r""6r7s&&&#/"!&,)'),
    c(`%;//?#2P""6P7Q/0$;//'$8#:t# )(#'#("'#&'#`),
    c(`%;//?#24""6475/0$;//'$8#:u# )(#'#("'#&'#`),
    c(`%;//?#2>""6>7?/0$;//'$8#:v# )(#'#("'#&'#`),
    c(`%;//?#2T""6T7U/0$;//'$8#:w# )(#'#("'#&'#`),
    c(`%;//?#2V""6V7W/0$;//'$8#:x# )(#'#("'#&'#`),
    c(`%2h""6h7i/0#;//'$8":y" )("'#&'#`),
    c(`%;//6#2f""6f7g/'$8":z" )("'#&'#`),
    c(`%;//?#2D""6D7E/0$;//'$8#:{# )(#'#("'#&'#`),
    c(`%;//?#22""6273/0$;//'$8#:|# )(#'#("'#&'#`),
    c(`%;//?#28""6879/0$;//'$8#:}# )(#'#("'#&'#`),
    c(`%;//0#;&/'$8":~" )("'#&'#`),
    c(`%;&/0#;//'$8":~" )("'#&'#`),
    c(`%;=/T#$;G.) &;K.# &;F0/*;G.) &;K.# &;F&/,$;>/#$+#)(#'#("'#&'#`),
    c('4""5!7.A &4""5!7.5 &4""5!7.) &;3.# &;.'),
    c(`%%;//Q#;&/H$$;J.# &;K0)*;J.# &;K&/,$;&/#$+$)($'#(#'#("'#&'#/"!&,)`),
    c(`%;//]#;&/T$%$;J.# &;K0)*;J.# &;K&/"!&,)/1$;&/($8$:$!!)($'#(#'#("'#&'#`),
    c(';..G &2L""6L7M.; &4""5!7./ &4""5!7.# &;3'),
    c(`%2j""6j7k/J#4""5!7.5 &4""5!7.) &4""5!7/#$+")("'#&'#`),
    c(`%;N/M#28""6879/>$;O." &"/0$;S/'$8$:$ )($'#(#'#("'#&'#`),
    c(`%;N/d#28""6879/U$;O." &"/G$;S/>$;_/5$;l." &"/'$8&:& )(&'#(%'#($'#(#'#("'#&'#`),
    c(`%3""5$7.) &3""5#7/' 8!:!! )`),
    c(`%;P/]#%28""6879/,#;R/#$+")("'#&'#." &"/6$2:""6:7;/'$8#:# )(#'#("'#&'#`),
    c("$;+.) &;-.# &;Q/2#0/*;+.) &;-.# &;Q&&&#"),
    c('2<""6<7=.q &2>""6>7?.e &2@""6@7A.Y &2B""6B7C.M &2D""6D7E.A &22""6273.5 &26""6677.) &24""6475'),
    c('%$;+._ &;-.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E0e*;+._ &;-.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E&/& 8!:! )'),
    c(`%;T/J#%28""6879/,#;^/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c("%;U.) &;\\.# &;X/& 8!:! )"),
    c(`%$%;V/2#2J""6J7K/#$+")("'#&'#0<*%;V/2#2J""6J7K/#$+")("'#&'#&/D#;W/;$2J""6J7K." &"/'$8#:# )(#'#("'#&'#`),
    c('$4""5!7/,#0)*4""5!7&&&#'),
    c(`%4$""5!7%/?#$4""5!70)*4""5!7&/#$+")("'#&'#`),
    c(`%2l""6l7m/?#;Y/6$2n""6n7o/'$8#:# )(#'#("'#&'#`),
    c(`%%;Z/³#28""6879/¤$;Z/$28""6879/$;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+-)(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.ސ &%2""67/¤#;Z/$28""6879/$;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+,)(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.۹ &%2""67/#;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.ٺ &%2""67/t#;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#.ؓ &%2""67/\\#;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+&)(&'#(%'#($'#(#'#("'#&'#.ׄ &%2""67/D#;Z/;$28""6879/,$;[/#$+$)($'#(#'#("'#&'#.֍ &%2""67/,#;[/#$+")("'#&'#.ծ &%2""67/,#;Z/#$+")("'#&'#.Տ &%;Z/#2""67/$;Z/$28""6879/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$++)(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.Ӈ &%;Z/ª#%28""6879/,#;Z/#$+")("'#&'#." &"/$2""67/t$;Z/k$28""6879/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.а &%;Z/¹#%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/k$2""67/\\$;Z/S$28""6879/D$;Z/;$28""6879/,$;[/#$+))()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#.Ί &%;Z/È#%28""6879/,#;Z/#$+")("'#&'#." &"/¡$%28""6879/,#;Z/#$+")("'#&'#." &"/z$%28""6879/,#;Z/#$+")("'#&'#." &"/S$2""67/D$;Z/;$28""6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#.˕ &%;Z/×#%28""6879/,#;Z/#$+")("'#&'#." &"/°$%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/b$%28""6879/,#;Z/#$+")("'#&'#." &"/;$2""67/,$;[/#$+')(''#(&'#(%'#($'#(#'#("'#&'#.ȑ &%;Z/þ#%28""6879/,#;Z/#$+")("'#&'#." &"/×$%28""6879/,#;Z/#$+")("'#&'#." &"/°$%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/b$%28""6879/,#;Z/#$+")("'#&'#." &"/;$2""67/,$;Z/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#.Ħ &%;Z/Ĝ#%28""6879/,#;Z/#$+")("'#&'#." &"/õ$%28""6879/,#;Z/#$+")("'#&'#." &"/Î$%28""6879/,#;Z/#$+")("'#&'#." &"/§$%28""6879/,#;Z/#$+")("'#&'#." &"/$%28""6879/,#;Z/#$+")("'#&'#." &"/Y$%28""6879/,#;Z/#$+")("'#&'#." &"/2$2""67/#$+()(('#(''#(&'#(%'#($'#(#'#("'#&'#/& 8!: ! )`),
    c(`%;#/M#;#." &"/?$;#." &"/1$;#." &"/#$+$)($'#(#'#("'#&'#`),
    c(`%;Z/;#28""6879/,$;Z/#$+#)(#'#("'#&'#.# &;\\`),
    c(`%;]/o#2J""6J7K/\`$;]/W$2J""6J7K/H$;]/?$2J""6J7K/0$;]/'$8':¡' )(''#(&'#(%'#($'#(#'#("'#&'#`),
    c(`%2¢""6¢7£/2#4¤""5!7¥/#$+")("'#&'#. &%2¦""6¦7§/;#4¨""5!7©/,$;!/#$+#)(#'#("'#&'#.j &%2ª""6ª7«/5#;!/,$;!/#$+#)(#'#("'#&'#.B &%4¬""5!7­/,#;!/#$+")("'#&'#.# &;!`),
    c(`%%;!." &"/[#;!." &"/M$;!." &"/?$;!." &"/1$;!." &"/#$+%)(%'#($'#(#'#("'#&'#/' 8!:®!! )`),
    c(`$%22""6273/,#;\`/#$+")("'#&'#0<*%22""6273/,#;\`/#$+")("'#&'#&`),
    c(";a.A &;b.; &;c.5 &;d./ &;e.) &;f.# &;g"),
    c(`%3¯""5*7°/a#3±""5#7².G &3³""5#7´.; &3µ""5$7¶./ &3·""5#7¸.# &;6/($8":¹"! )("'#&'#`),
    c(`%3º""5%7»/I#3¼""5%7½./ &3¾""5"7¿.# &;6/($8":À"! )("'#&'#`),
    c(`%3Á""5'7Â/1#;/($8":Ã"! )("'#&'#`),
    c(`%3Ä""5$7Å/1#;ð/($8":Æ"! )("'#&'#`),
    c(`%3Ç""5&7È/1#;T/($8":É"! )("'#&'#`),
    c(`%3Ê""5"7Ë/N#%2>""6>7?/,#;6/#$+")("'#&'#." &"/'$8":Ì" )("'#&'#`),
    c(`%;h/P#%2>""6>7?/,#;i/#$+")("'#&'#." &"/)$8":Í""! )("'#&'#`),
    c('%$;j/&#0#*;j&&&#/"!&,)'),
    c('%$;j/&#0#*;j&&&#/"!&,)'),
    c(";k.) &;+.# &;-"),
    c('2l""6l7m.e &2n""6n7o.Y &24""6475.M &28""6879.A &2<""6<7=.5 &2@""6@7A.) &2B""6B7C'),
    c(`%26""6677/n#;m/e$$%2<""6<7=/,#;m/#$+")("'#&'#0<*%2<""6<7=/,#;m/#$+")("'#&'#&/#$+#)(#'#("'#&'#`),
    c(`%;n/A#2>""6>7?/2$;o/)$8#:Î#"" )(#'#("'#&'#`),
    c("$;p.) &;+.# &;-/2#0/*;p.) &;+.# &;-&&&#"),
    c("$;p.) &;+.# &;-0/*;p.) &;+.# &;-&"),
    c('2l""6l7m.e &2n""6n7o.Y &24""6475.M &26""6677.A &28""6879.5 &2@""6@7A.) &2B""6B7C'),
    c(";.# &;r"),
    c(`%;/G#;'/>$;s/5$;'/,$;/#$+%)(%'#($'#(#'#("'#&'#`),
    c(";M.# &;t"),
    c(`%;/E#28""6879/6$;u.# &;x/'$8#:Ï# )(#'#("'#&'#`),
    c(`%;v.# &;w/J#%26""6677/,#;/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c(`%2Ð""6Ð7Ñ/:#;/1$;w." &"/#$+#)(#'#("'#&'#`),
    c(`%24""6475/,#;{/#$+")("'#&'#`),
    c(`%;z/3#$;y0#*;y&/#$+")("'#&'#`),
    c(";*.) &;+.# &;-"),
    c(';+. &;-. &22""6273.} &26""6677.q &28""6879.e &2:""6:7;.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E'),
    c(`%;|/e#$%24""6475/,#;|/#$+")("'#&'#0<*%24""6475/,#;|/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%$;~0#*;~&/e#$%22""6273/,#;}/#$+")("'#&'#0<*%22""6273/,#;}/#$+")("'#&'#&/#$+")("'#&'#`),
    c("$;~0#*;~&"),
    c(';+.w &;-.q &28""6879.e &2:""6:7;.Y &2<""6<7=.M &2>""6>7?.A &2@""6@7A.5 &2B""6B7C.) &2D""6D7E'),
    c(`%%;"/#$;".G &;!.A &2@""6@7A.5 &2F""6F7G.) &2J""6J7K0M*;".G &;!.A &2@""6@7A.5 &2F""6F7G.) &2J""6J7K&/#$+")("'#&'#/& 8!:Ò! )`),
    c(";.# &;"),
    c(`%%;O/2#2:""6:7;/#$+")("'#&'#." &"/,#;S/#$+")("'#&'#." &"`),
    c('$;+. &;-.} &2B""6B7C.q &2D""6D7E.e &22""6273.Y &28""6879.M &2:""6:7;.A &2<""6<7=.5 &2>""6>7?.) &2@""6@7A/#0*;+. &;-.} &2B""6B7C.q &2D""6D7E.e &22""6273.Y &28""6879.M &2:""6:7;.A &2<""6<7=.5 &2>""6>7?.) &2@""6@7A&&&#'),
    c("$;y0#*;y&"),
    c(`%3""5#7Ó/q#24""6475/b$$;!/&#0#*;!&&&#/L$2J""6J7K/=$$;!/&#0#*;!&&&#/'$8%:Ô% )(%'#($'#(#'#("'#&'#`),
    c('2Õ""6Õ7Ö'),
    c('2×""6×7Ø'),
    c('2Ù""6Ù7Ú'),
    c('2Û""6Û7Ü'),
    c('2Ý""6Ý7Þ'),
    c('2ß""6ß7à'),
    c('2á""6á7â'),
    c('2ã""6ã7ä'),
    c('2å""6å7æ'),
    c('2ç""6ç7è'),
    c('2é""6é7ê'),
    c("%;.Y &;.S &;.M &;.G &;.A &;.; &;.5 &;./ &;.) &;.# &;6/& 8!:ë! )"),
    c(`%;/G#;'/>$;/5$;'/,$;/#$+%)(%'#($'#(#'#("'#&'#`),
    c("%;/' 8!:ì!! )"),
    c(`%;!/5#;!/,$;!/#$+#)(#'#("'#&'#`),
    c("%$;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(0G*;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(&/& 8!:í! )"),
    c(`%;¶/Y#$%;A/,#;¶/#$+")("'#&'#06*%;A/,#;¶/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;9/N#%2:""6:7;/,#;9/#$+")("'#&'#." &"/'$8":î" )("'#&'#`),
    c(`%;:.c &%;/Y#$%;A/,#;/#$+")("'#&'#06*%;A/,#;/#$+")("'#&'#&/#$+")("'#&'#/& 8!:ï! )`),
    c(`%;L.# &;/]#$%;B/,#;/#$+")("'#&'#06*%;B/,#;/#$+")("'#&'#&/'$8":ð" )("'#&'#`),
    c(`%;." &"/>#;@/5$;M/,$;?/#$+$)($'#(#'#("'#&'#`),
    c(`%%;6/Y#$%;./,#;6/#$+")("'#&'#06*%;./,#;6/#$+")("'#&'#&/#$+")("'#&'#.# &;H/' 8!:ñ!! )`),
    c(";.) &;.# &; "),
    c(`%3ò""5!7ó/:#;</1$;/($8#:ô#! )(#'#("'#&'#`),
    c(`%3õ""5'7ö/:#;</1$;/($8#:÷#! )(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ø!! )"),
    c(`%2ù""6ù7ú/o#%2J""6J7K/M#;!." &"/?$;!." &"/1$;!." &"/#$+$)($'#(#'#("'#&'#." &"/'$8":û" )("'#&'#`),
    c(`%;6/J#%;</,#;¡/#$+")("'#&'#." &"/)$8":ü""! )("'#&'#`),
    c(";6.) &;T.# &;H"),
    c(`%;£/Y#$%;B/,#;¤/#$+")("'#&'#06*%;B/,#;¤/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%3ý""5&7þ.G &3ÿ""5'7Ā.; &3ā""5$7Ă./ &3ă""5%7Ą.# &;6/& 8!:ą! )`),
    c(";¥.# &; "),
    c(`%3Ć""5(7ć/M#;</D$3Ĉ""5(7ĉ./ &3Ċ""5(7ċ.# &;6/#$+#)(#'#("'#&'#`),
    c(`%;6/Y#$%;A/,#;6/#$+")("'#&'#06*%;A/,#;6/#$+")("'#&'#&/#$+")("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:Č!! )"),
    c("%;©/& 8!:č! )"),
    c(`%;ª/k#;;/b$;¯/Y$$%;B/,#;°/#$+")("'#&'#06*%;B/,#;°/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(";«.# &;¬"),
    c('3Ď""5$7ď.S &3Đ""5%7đ.G &3Ē""5%7ē.; &3Ĕ""5%7ĕ./ &3Ė""5+7ė.# &;­'),
    c(`3Ę""5'7ę./ &3Ě""5)7ě.# &;­`),
    c(";6.# &;®"),
    c(`%3Ĝ""5"7ĝ/,#;6/#$+")("'#&'#`),
    c(";­.# &;6"),
    c(`%;6/5#;</,$;±/#$+#)(#'#("'#&'#`),
    c(";6.# &;H"),
    c(`%;³/5#;./,$;/#$+#)(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:Ğ!! )"),
    c("%;/' 8!:ğ!! )"),
    c(`%;¶/^#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/($8":Ġ"!!)("'#&'#`),
    c(`%%;7/e#$%2J""6J7K/,#;7/#$+")("'#&'#0<*%2J""6J7K/,#;7/#$+")("'#&'#&/#$+")("'#&'#/"!&,)`),
    c(`%;L.# &;/]#$%;B/,#;¸/#$+")("'#&'#06*%;B/,#;¸/#$+")("'#&'#&/'$8":ġ" )("'#&'#`),
    c(";¹.# &; "),
    c(`%3Ģ""5#7ģ/:#;</1$;6/($8#:Ĥ#! )(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ĥ!! )"),
    c("%;/' 8!:Ħ!! )"),
    c(`%$;0#*;&/x#;@/o$;M/f$;?/]$$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/'$8%:ħ% )(%'#($'#(#'#("'#&'#`),
    c(";¾"),
    c(`%3Ĩ""5&7ĩ/k#;./b$;Á/Y$$%;A/,#;Á/#$+")("'#&'#06*%;A/,#;Á/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#.# &;¿`),
    c(`%;6/k#;./b$;À/Y$$%;A/,#;À/#$+")("'#&'#06*%;A/,#;À/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(`%;6/;#;</2$;6.# &;H/#$+#)(#'#("'#&'#`),
    c(";Â.G &;Ä.A &;Æ.; &;È.5 &;É./ &;Ê.) &;Ë.# &;À"),
    c(`%3Ī""5%7ī/5#;</,$;Ã/#$+#)(#'#("'#&'#`),
    c("%;I/' 8!:Ĭ!! )"),
    c(`%3ĭ""5&7Į/#;</$;D/$;Å/|$$%$;'/&#0#*;'&&&#/,#;Å/#$+")("'#&'#0C*%$;'/&#0#*;'&&&#/,#;Å/#$+")("'#&'#&/,$;E/#$+&)(&'#(%'#($'#(#'#("'#&'#`),
    c(";t.# &;w"),
    c(`%3į""5%7İ/5#;</,$;Ç/#$+#)(#'#("'#&'#`),
    c("%;I/' 8!:ı!! )"),
    c(`%3Ĳ""5&7ĳ/:#;</1$;I/($8#:Ĵ#! )(#'#("'#&'#`),
    c(`%3ĵ""5%7Ķ/]#;</T$%3ķ""5$7ĸ/& 8!:Ĺ! ).4 &%3ĺ""5%7Ļ/& 8!:ļ! )/#$+#)(#'#("'#&'#`),
    c(`%3Ľ""5)7ľ/R#;</I$3Ŀ""5#7ŀ./ &3Ł""5(7ł.# &;6/($8#:Ń#! )(#'#("'#&'#`),
    c(`%3ń""5#7Ņ/#;</$;D/$%;Ì/e#$%2D""6D7E/,#;Ì/#$+")("'#&'#0<*%2D""6D7E/,#;Ì/#$+")("'#&'#&/#$+")("'#&'#/,$;E/#$+%)(%'#($'#(#'#("'#&'#`),
    c(`%3ņ""5(7Ň./ &3ň""5$7ŉ.# &;6/' 8!:Ŋ!! )`),
    c(`%;6/Y#$%;A/,#;6/#$+")("'#&'#06*%;A/,#;6/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;Ï/G#;./>$;Ï/5$;./,$;/#$+%)(%'#($'#(#'#("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ŋ!! )"),
    c(`%;Ñ/]#$%;A/,#;Ñ/#$+")("'#&'#06*%;A/,#;Ñ/#$+")("'#&'#&/'$8":Ō" )("'#&'#`),
    c(`%;/]#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/'$8":ō" )("'#&'#`),
    c(`%;L.O &;.I &%;@." &"/:#;t/1$;?." &"/#$+#)(#'#("'#&'#/]#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/'$8":Ŏ" )("'#&'#`),
    c(`%;Ô/]#$%;B/,#;Õ/#$+")("'#&'#06*%;B/,#;Õ/#$+")("'#&'#&/'$8":ŏ" )("'#&'#`),
    c("%;/& 8!:Ő! )"),
    c(`%3ő""5(7Œ/:#;</1$;6/($8#:œ#! )(#'#("'#&'#.g &%3Ŕ""5&7ŕ/:#;</1$;6/($8#:Ŗ#! )(#'#("'#&'#.: &%3ŗ""5*7Ř/& 8!:ř! ).# &; `),
    c(`%%;6/k#$%;A/2#;6/)$8":Ś""$ )("'#&'#0<*%;A/2#;6/)$8":Ś""$ )("'#&'#&/)$8":ś""! )("'#&'#." &"/' 8!:Ŝ!! )`),
    c(`%;Ø/Y#$%;A/,#;Ø/#$+")("'#&'#06*%;A/,#;Ø/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;/Y#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/#$+")("'#&'#`),
    c("%$;!/&#0#*;!&&&#/' 8!:ŝ!! )"),
    c(`%;Û/Y#$%;B/,#;Ü/#$+")("'#&'#06*%;B/,#;Ü/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%3Ş""5&7ş.; &3Š""5'7š./ &3Ţ""5*7ţ.# &;6/& 8!:Ť! )`),
    c(`%3ť""5&7Ŧ/:#;</1$;Ý/($8#:ŧ#! )(#'#("'#&'#.} &%3õ""5'7ö/:#;</1$;/($8#:Ũ#! )(#'#("'#&'#.P &%3ũ""5+7Ū/:#;</1$;/($8#:ū#! )(#'#("'#&'#.# &; `),
    c(`3Ŭ""5+7ŭ.k &3Ů""5)7ů._ &3Ű""5(7ű.S &3Ų""5'7ų.G &3Ŵ""5&7ŵ.; &3Ŷ""5*7ŷ./ &3Ÿ""5)7Ź.# &;6`),
    c(';1." &"'),
    c(`%%;6/k#$%;A/2#;6/)$8":Ś""$ )("'#&'#0<*%;A/2#;6/)$8":Ś""$ )("'#&'#&/)$8":ś""! )("'#&'#." &"/' 8!:ź!! )`),
    c(`%;L.# &;/]#$%;B/,#;á/#$+")("'#&'#06*%;B/,#;á/#$+")("'#&'#&/'$8":Ż" )("'#&'#`),
    c(";¹.# &; "),
    c(`%;ã/Y#$%;A/,#;ã/#$+")("'#&'#06*%;A/,#;ã/#$+")("'#&'#&/#$+")("'#&'#`),
    c(`%;ê/k#;./b$;í/Y$$%;B/,#;ä/#$+")("'#&'#06*%;B/,#;ä/#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(";å.; &;æ.5 &;ç./ &;è.) &;é.# &; "),
    c(`%3ż""5#7Ž/:#;</1$;ð/($8#:ž#! )(#'#("'#&'#`),
    c(`%3ſ""5%7ƀ/:#;</1$;T/($8#:Ɓ#! )(#'#("'#&'#`),
    c(`%3Ƃ""5(7ƃ/F#;</=$;\\.) &;Y.# &;X/($8#:Ƅ#! )(#'#("'#&'#`),
    c(`%3ƅ""5&7Ɔ/:#;</1$;6/($8#:Ƈ#! )(#'#("'#&'#`),
    c(`%3ƈ""5%7Ɖ/A#;</8$$;!0#*;!&/($8#:Ɗ#! )(#'#("'#&'#`),
    c(`%;ë/G#;;/>$;6/5$;;/,$;ì/#$+%)(%'#($'#(#'#("'#&'#`),
    c(`%3""5#7Ó.# &;6/' 8!:Ƌ!! )`),
    c(`%3±""5#7ƌ.G &3³""5#7ƍ.; &3·""5#7Ǝ./ &3µ""5$7Ə.# &;6/' 8!:Ɛ!! )`),
    c(`%;î/D#%;C/,#;ï/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c("%;U.) &;\\.# &;X/& 8!:Ƒ! )"),
    c(`%%;!." &"/[#;!." &"/M$;!." &"/?$;!." &"/1$;!." &"/#$+%)(%'#($'#(#'#("'#&'#/' 8!:ƒ!! )`),
    c(`%%;!/?#;!." &"/1$;!." &"/#$+#)(#'#("'#&'#/' 8!:Ɠ!! )`),
    c(";¾"),
    c(`%;/^#$%;B/,#;ó/#$+")("'#&'#06*%;B/,#;ó/#$+")("'#&'#&/($8":Ɣ"!!)("'#&'#`),
    c(";ô.# &; "),
    c(`%2ƕ""6ƕ7Ɩ/L#;</C$2Ɨ""6Ɨ7Ƙ.) &2ƙ""6ƙ7ƚ/($8#:ƛ#! )(#'#("'#&'#`),
    c(`%;/^#$%;B/,#; /#$+")("'#&'#06*%;B/,#; /#$+")("'#&'#&/($8":Ɯ"!!)("'#&'#`),
    c(`%;6/5#;0/,$;÷/#$+#)(#'#("'#&'#`),
    c("$;2.) &;4.# &;.0/*;2.) &;4.# &;.&"),
    c("$;%0#*;%&"),
    c(`%;ú/;#28""6879/,$;û/#$+#)(#'#("'#&'#`),
    c(`%3Ɲ""5%7ƞ.) &3Ɵ""5$7Ơ/' 8!:ơ!! )`),
    c(`%;ü/J#%28""6879/,#;^/#$+")("'#&'#." &"/#$+")("'#&'#`),
    c("%;\\.) &;X.# &;/' 8!:Ƣ!! )"),
    c(';".S &;!.M &2F""6F7G.A &2J""6J7K.5 &2H""6H7I.) &2N""6N7O'),
    c('2L""6L7M. &2B""6B7C. &2<""6<7=.} &2R""6R7S.q &2T""6T7U.e &2V""6V7W.Y &2P""6P7Q.M &2@""6@7A.A &2D""6D7E.5 &22""6273.) &2>""6>7?'),
    c(`%;Ā/b#28""6879/S$;û/J$%2ƣ""6ƣ7Ƥ/,#;ì/#$+")("'#&'#." &"/#$+$)($'#(#'#("'#&'#`),
    c(`%3ƥ""5%7Ʀ.) &3Ƨ""5$7ƨ/' 8!:ơ!! )`),
    c(`%3±""5#7².6 &3³""5#7´.* &$;+0#*;+&/' 8!:Ʃ!! )`),
    c(`%;Ą/#2F""6F7G/x$;ă/o$2F""6F7G/\`$;ă/W$2F""6F7G/H$;ă/?$2F""6F7G/0$;ą/'$8):ƪ) )()'#(('#(''#(&'#(%'#($'#(#'#("'#&'#`),
    c(`%;#/>#;#/5$;#/,$;#/#$+$)($'#(#'#("'#&'#`),
    c(`%;ă/,#;ă/#$+")("'#&'#`),
    c(`%;ă/5#;ă/,$;ă/#$+#)(#'#("'#&'#`),
    c(`%;q/T#$;m0#*;m&/D$%; /,#;ø/#$+")("'#&'#." &"/#$+#)(#'#("'#&'#`),
    c(`%2ƫ""6ƫ7Ƭ.) &2ƭ""6ƭ7Ʈ/w#;0/n$;Ĉ/e$$%;B/2#;ĉ.# &; /#$+")("'#&'#0<*%;B/2#;ĉ.# &; /#$+")("'#&'#&/#$+$)($'#(#'#("'#&'#`),
    c(";.# &;L"),
    c(`%2Ư""6Ư7ư/5#;</,$;Ċ/#$+#)(#'#("'#&'#`),
    c(`%;D/S#;,/J$2:""6:7;/;$;,.# &;T/,$;E/#$+%)(%'#($'#(#'#("'#&'#`)
  ];
  let d = 0, w = 0;
  const f = [{ line: 1, column: 1 }];
  let m = 0, E = [], I = 0, D;
  if (e.startRule !== void 0) {
    if (!(e.startRule in s))
      throw new Error(`Can't start parsing from rule "` + e.startRule + '".');
    i = s[e.startRule];
  }
  function S() {
    return a.substring(w, d);
  }
  function X() {
    return ge(w, d);
  }
  function g(h, v) {
    return { type: "literal", text: h, ignoreCase: v };
  }
  function R(h, v, l) {
    return { type: "class", parts: h, inverted: v, ignoreCase: l };
  }
  function ee() {
    return { type: "end" };
  }
  function B(h) {
    let v = f[h], l;
    if (v)
      return v;
    for (l = h - 1; !f[l]; )
      l--;
    for (v = f[l], v = {
      line: v.line,
      column: v.column
    }; l < h; )
      a.charCodeAt(l) === 10 ? (v.line++, v.column = 1) : v.column++, l++;
    return f[h] = v, v;
  }
  function ge(h, v) {
    const l = B(h), L = B(v);
    return {
      source: r,
      start: {
        offset: h,
        line: l.line,
        column: l.column
      },
      end: {
        offset: v,
        line: L.line,
        column: L.column
      }
    };
  }
  function Oe(h) {
    d < m || (d > m && (m = d, E = []), E.push(h));
  }
  function rt(h, v, l) {
    return new de(de.buildMessage(h, v), h, v, l);
  }
  function c(h) {
    return h.split("").map((v) => v.charCodeAt(0) - 32);
  }
  function Ne(h) {
    const v = o[h];
    let l = 0;
    const L = [];
    let A = v.length;
    const W = [], y = [];
    let Ue;
    for (; ; ) {
      for (; l < A; )
        switch (v[l]) {
          case 0:
            y.push(n[v[l + 1]]), l += 2;
            break;
          case 1:
            y.push(void 0), l++;
            break;
          case 2:
            y.push(null), l++;
            break;
          case 3:
            y.push(t), l++;
            break;
          case 4:
            y.push([]), l++;
            break;
          case 5:
            y.push(d), l++;
            break;
          case 6:
            y.pop(), l++;
            break;
          case 7:
            d = y.pop(), l++;
            break;
          case 8:
            y.length -= v[l + 1], l += 2;
            break;
          case 9:
            y.splice(-2, 1), l++;
            break;
          case 10:
            y[y.length - 2].push(y.pop()), l++;
            break;
          case 11:
            y.push(y.splice(y.length - v[l + 1], v[l + 1])), l += 2;
            break;
          case 12:
            y.push(a.substring(y.pop(), d)), l++;
            break;
          case 13:
            W.push(A), L.push(l + 3 + v[l + 1] + v[l + 2]), y[y.length - 1] ? (A = l + 3 + v[l + 1], l += 3) : (A = l + 3 + v[l + 1] + v[l + 2], l += 3 + v[l + 1]);
            break;
          case 14:
            W.push(A), L.push(l + 3 + v[l + 1] + v[l + 2]), y[y.length - 1] === t ? (A = l + 3 + v[l + 1], l += 3) : (A = l + 3 + v[l + 1] + v[l + 2], l += 3 + v[l + 1]);
            break;
          case 15:
            W.push(A), L.push(l + 3 + v[l + 1] + v[l + 2]), y[y.length - 1] !== t ? (A = l + 3 + v[l + 1], l += 3) : (A = l + 3 + v[l + 1] + v[l + 2], l += 3 + v[l + 1]);
            break;
          case 16:
            y[y.length - 1] !== t ? (W.push(A), L.push(l), A = l + 2 + v[l + 1], l += 2) : l += 2 + v[l + 1];
            break;
          case 17:
            W.push(A), L.push(l + 3 + v[l + 1] + v[l + 2]), a.length > d ? (A = l + 3 + v[l + 1], l += 3) : (A = l + 3 + v[l + 1] + v[l + 2], l += 3 + v[l + 1]);
            break;
          case 18:
            W.push(A), L.push(l + 4 + v[l + 2] + v[l + 3]), a.substr(d, n[v[l + 1]].length) === n[v[l + 1]] ? (A = l + 4 + v[l + 2], l += 4) : (A = l + 4 + v[l + 2] + v[l + 3], l += 4 + v[l + 2]);
            break;
          case 19:
            W.push(A), L.push(l + 4 + v[l + 2] + v[l + 3]), a.substr(d, n[v[l + 1]].length).toLowerCase() === n[v[l + 1]] ? (A = l + 4 + v[l + 2], l += 4) : (A = l + 4 + v[l + 2] + v[l + 3], l += 4 + v[l + 2]);
            break;
          case 20:
            W.push(A), L.push(l + 4 + v[l + 2] + v[l + 3]), n[v[l + 1]].test(a.charAt(d)) ? (A = l + 4 + v[l + 2], l += 4) : (A = l + 4 + v[l + 2] + v[l + 3], l += 4 + v[l + 2]);
            break;
          case 21:
            y.push(a.substr(d, v[l + 1])), d += v[l + 1], l += 2;
            break;
          case 22:
            y.push(n[v[l + 1]]), d += n[v[l + 1]].length, l += 2;
            break;
          case 23:
            y.push(t), I === 0 && Oe(n[v[l + 1]]), l += 2;
            break;
          case 24:
            w = y[y.length - 1 - v[l + 1]], l += 2;
            break;
          case 25:
            w = d, l++;
            break;
          case 26:
            Ue = v.slice(l + 4, l + 4 + v[l + 3]).map(function(it) {
              return y[y.length - 1 - it];
            }), y.splice(y.length - v[l + 2], v[l + 2], n[v[l + 1]].apply(null, Ue)), l += 4 + v[l + 3];
            break;
          case 27:
            y.push(Ne(v[l + 1])), l += 2;
            break;
          case 28:
            I++, l++;
            break;
          case 29:
            I--, l++;
            break;
          default:
            throw new Error("Invalid opcode: " + v[l] + ".");
        }
      if (W.length > 0)
        A = W.pop(), l = L.pop();
      else
        break;
    }
    return y[0];
  }
  e.data = {};
  function st(h, v) {
    return [h].concat(v);
  }
  if (D = Ne(i), D !== t && d === a.length)
    return D;
  throw D !== t && d < a.length && Oe(ee()), rt(E, m < a.length ? a.charAt(m) : null, m < a.length ? ge(m, m + 1) : ge(m, m));
}
const wt = mt;
var P;
(function(a) {
  function e(s, i) {
    const n = { startRule: i };
    try {
      wt(s, n);
    } catch {
      n.data = -1;
    }
    return n.data;
  }
  a.parse = e;
  function t(s) {
    const i = a.parse(s, "Name_Addr_Header");
    return i !== -1 ? i : void 0;
  }
  a.nameAddrHeaderParse = t;
  function r(s) {
    const i = a.parse(s, "SIP_URI");
    return i !== -1 ? i : void 0;
  }
  a.URIParse = r;
})(P = P || (P = {}));
const vt = {
  100: "Trying",
  180: "Ringing",
  181: "Call Is Being Forwarded",
  182: "Queued",
  183: "Session Progress",
  199: "Early Dialog Terminated",
  200: "OK",
  202: "Accepted",
  204: "No Notification",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Moved Temporarily",
  305: "Use Proxy",
  380: "Alternative Service",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  410: "Gone",
  412: "Conditional Request Failed",
  413: "Request Entity Too Large",
  414: "Request-URI Too Long",
  415: "Unsupported Media Type",
  416: "Unsupported URI Scheme",
  417: "Unknown Resource-Priority",
  420: "Bad Extension",
  421: "Extension Required",
  422: "Session Interval Too Small",
  423: "Interval Too Brief",
  428: "Use Identity Header",
  429: "Provide Referrer Identity",
  430: "Flow Failed",
  433: "Anonymity Disallowed",
  436: "Bad Identity-Info",
  437: "Unsupported Certificate",
  438: "Invalid Identity Header",
  439: "First Hop Lacks Outbound Support",
  440: "Max-Breadth Exceeded",
  469: "Bad Info Package",
  470: "Consent Needed",
  478: "Unresolvable Destination",
  480: "Temporarily Unavailable",
  481: "Call/Transaction Does Not Exist",
  482: "Loop Detected",
  483: "Too Many Hops",
  484: "Address Incomplete",
  485: "Ambiguous",
  486: "Busy Here",
  487: "Request Terminated",
  488: "Not Acceptable Here",
  489: "Bad Event",
  491: "Request Pending",
  493: "Undecipherable",
  494: "Security Agreement Required",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Server Time-out",
  505: "Version Not Supported",
  513: "Message Too Large",
  580: "Precondition Failure",
  600: "Busy Everywhere",
  603: "Decline",
  604: "Does Not Exist Anywhere",
  606: "Not Acceptable"
};
function ae(a, e = 32) {
  let t = "";
  for (let r = 0; r < a; r++) {
    const s = Math.floor(Math.random() * e);
    t += s.toString(e);
  }
  return t;
}
function $e(a) {
  return vt[a] || "";
}
function Ce() {
  return ae(10);
}
function Y(a) {
  const e = {
    "Call-Id": "Call-ID",
    Cseq: "CSeq",
    "Min-Se": "Min-SE",
    Rack: "RAck",
    Rseq: "RSeq",
    "Www-Authenticate": "WWW-Authenticate"
  }, t = a.toLowerCase().replace(/_/g, "-").split("-"), r = t.length;
  let s = "";
  for (let i = 0; i < r; i++)
    i !== 0 && (s += "-"), s += t[i].charAt(0).toUpperCase() + t[i].substring(1);
  return e[s] && (s = e[s]), s;
}
function Te(a) {
  return encodeURIComponent(a).replace(/%[A-F\d]{2}/g, "U").length;
}
class Ke {
  constructor() {
    this.headers = {};
  }
  /**
   * Insert a header of the given name and value into the last position of the
   * header array.
   * @param name - header name
   * @param value - header value
   */
  addHeader(e, t) {
    const r = { raw: t };
    e = Y(e), this.headers[e] ? this.headers[e].push(r) : this.headers[e] = [r];
  }
  /**
   * Get the value of the given header name at the given position.
   * @param name - header name
   * @returns Returns the specified header, undefined if header doesn't exist.
   */
  getHeader(e) {
    const t = this.headers[Y(e)];
    if (t) {
      if (t[0])
        return t[0].raw;
    } else
      return;
  }
  /**
   * Get the header/s of the given name.
   * @param name - header name
   * @returns Array - with all the headers of the specified name.
   */
  getHeaders(e) {
    const t = this.headers[Y(e)], r = [];
    if (!t)
      return [];
    for (const s of t)
      r.push(s.raw);
    return r;
  }
  /**
   * Verify the existence of the given header.
   * @param name - header name
   * @returns true if header with given name exists, false otherwise
   */
  hasHeader(e) {
    return !!this.headers[Y(e)];
  }
  /**
   * Parse the given header on the given index.
   * @param name - header name
   * @param idx - header index
   * @returns Parsed header object, undefined if the
   *   header is not present or in case of a parsing error.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseHeader(e, t = 0) {
    if (e = Y(e), this.headers[e]) {
      if (t >= this.headers[e].length)
        return;
    } else return;
    const r = this.headers[e][t], s = r.raw;
    if (r.parsed)
      return r.parsed;
    const i = P.parse(s, e.replace(/-/g, "_"));
    if (i === -1) {
      this.headers[e].splice(t, 1);
      return;
    } else
      return r.parsed = i, i;
  }
  /**
   * Message Header attribute selector. Alias of parseHeader.
   * @param name - header name
   * @param idx - header index
   * @returns Parsed header object, undefined if the
   *   header is not present or in case of a parsing error.
   *
   * @example
   * message.s('via',3).port
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  s(e, t = 0) {
    return this.parseHeader(e, t);
  }
  /**
   * Replace the value of the given header by the value.
   * @param name - header name
   * @param value - header value
   */
  setHeader(e, t) {
    this.headers[Y(e)] = [{ raw: t }];
  }
  toString() {
    return this.data;
  }
}
class he extends Ke {
  constructor() {
    super();
  }
}
class ne extends Ke {
  constructor() {
    super();
  }
}
class oe {
  constructor(e, t, r, s, i, n, o) {
    this.headers = {}, this.extraHeaders = [], this.options = oe.getDefaultOptions(), i && (this.options = Object.assign(Object.assign({}, this.options), i), this.options.optionTags && this.options.optionTags.length && (this.options.optionTags = this.options.optionTags.slice()), this.options.routeSet && this.options.routeSet.length && (this.options.routeSet = this.options.routeSet.slice())), n && n.length && (this.extraHeaders = n.slice()), o && (this.body = {
      body: o.content,
      contentType: o.contentType
    }), this.method = e, this.ruri = t.clone(), this.fromURI = r.clone(), this.fromTag = this.options.fromTag ? this.options.fromTag : Ce(), this.from = oe.makeNameAddrHeader(this.fromURI, this.options.fromDisplayName, this.fromTag), this.toURI = s.clone(), this.toTag = this.options.toTag, this.to = oe.makeNameAddrHeader(this.toURI, this.options.toDisplayName, this.toTag), this.callId = this.options.callId ? this.options.callId : this.options.callIdPrefix + ae(15), this.cseq = this.options.cseq, this.setHeader("route", this.options.routeSet), this.setHeader("via", ""), this.setHeader("to", this.to.toString()), this.setHeader("from", this.from.toString()), this.setHeader("cseq", this.cseq + " " + this.method), this.setHeader("call-id", this.callId), this.setHeader("max-forwards", "70");
  }
  /** Get a copy of the default options. */
  static getDefaultOptions() {
    return {
      callId: "",
      callIdPrefix: "",
      cseq: 1,
      toDisplayName: "",
      toTag: "",
      fromDisplayName: "",
      fromTag: "",
      forceRport: !1,
      hackViaTcp: !1,
      optionTags: ["outbound"],
      routeSet: [],
      userAgentString: "sip.js",
      viaHost: ""
    };
  }
  static makeNameAddrHeader(e, t, r) {
    const s = {};
    return r && (s.tag = r), new O(e, t, s);
  }
  /**
   * Get the value of the given header name at the given position.
   * @param name - header name
   * @returns Returns the specified header, undefined if header doesn't exist.
   */
  getHeader(e) {
    const t = this.headers[Y(e)];
    if (t) {
      if (t[0])
        return t[0];
    } else {
      const r = new RegExp("^\\s*" + e + "\\s*:", "i");
      for (const s of this.extraHeaders)
        if (r.test(s))
          return s.substring(s.indexOf(":") + 1).trim();
    }
  }
  /**
   * Get the header/s of the given name.
   * @param name - header name
   * @returns Array with all the headers of the specified name.
   */
  getHeaders(e) {
    const t = [], r = this.headers[Y(e)];
    if (r)
      for (const s of r)
        t.push(s);
    else {
      const s = new RegExp("^\\s*" + e + "\\s*:", "i");
      for (const i of this.extraHeaders)
        s.test(i) && t.push(i.substring(i.indexOf(":") + 1).trim());
    }
    return t;
  }
  /**
   * Verify the existence of the given header.
   * @param name - header name
   * @returns true if header with given name exists, false otherwise
   */
  hasHeader(e) {
    if (this.headers[Y(e)])
      return !0;
    {
      const t = new RegExp("^\\s*" + e + "\\s*:", "i");
      for (const r of this.extraHeaders)
        if (t.test(r))
          return !0;
    }
    return !1;
  }
  /**
   * Replace the the given header by the given value.
   * @param name - header name
   * @param value - header value
   */
  setHeader(e, t) {
    this.headers[Y(e)] = t instanceof Array ? t : [t];
  }
  /**
   * The Via header field indicates the transport used for the transaction
   * and identifies the location where the response is to be sent.  A Via
   * header field value is added only after the transport that will be
   * used to reach the next hop has been selected (which may involve the
   * usage of the procedures in [4]).
   *
   * When the UAC creates a request, it MUST insert a Via into that
   * request.  The protocol name and protocol version in the header field
   * MUST be SIP and 2.0, respectively.  The Via header field value MUST
   * contain a branch parameter.  This parameter is used to identify the
   * transaction created by that request.  This parameter is used by both
   * the client and the server.
   * https://tools.ietf.org/html/rfc3261#section-8.1.1.7
   * @param branchParameter - The branch parameter.
   * @param transport - The sent protocol transport.
   */
  setViaHeader(e, t) {
    this.options.hackViaTcp && (t = "TCP");
    let r = "SIP/2.0/" + t;
    r += " " + this.options.viaHost + ";branch=" + e, this.options.forceRport && (r += ";rport"), this.setHeader("via", r), this.branch = e;
  }
  toString() {
    let e = "";
    e += this.method + " " + this.ruri.toRaw() + ` SIP/2.0\r
`;
    for (const t in this.headers)
      if (this.headers[t])
        for (const r of this.headers[t])
          e += t + ": " + r + `\r
`;
    for (const t of this.extraHeaders)
      e += t.trim() + `\r
`;
    return e += "Supported: " + this.options.optionTags.join(", ") + `\r
`, e += "User-Agent: " + this.options.userAgentString + `\r
`, this.body ? typeof this.body == "string" ? (e += "Content-Length: " + Te(this.body) + `\r
\r
`, e += this.body) : this.body.body && this.body.contentType ? (e += "Content-Type: " + this.body.contentType + `\r
`, e += "Content-Length: " + Te(this.body.body) + `\r
\r
`, e += this.body.body) : e += `Content-Length: 0\r
\r
` : e += `Content-Length: 0\r
\r
`, e;
  }
}
function We(a) {
  return a === "application/sdp" ? "session" : "render";
}
function Re(a) {
  const e = typeof a == "string" ? a : a.body, t = typeof a == "string" ? "application/sdp" : a.contentType;
  return { contentDisposition: We(t), contentType: t, content: e };
}
function Ye(a) {
  return a && typeof a.content == "string" && typeof a.contentType == "string" && a.contentDisposition === void 0 ? !0 : typeof a.contentDisposition == "string";
}
function me(a) {
  let e, t, r;
  if (a instanceof he && a.body) {
    const s = a.parseHeader("Content-Disposition");
    e = s ? s.type : void 0, t = a.parseHeader("Content-Type"), r = a.body;
  }
  if (a instanceof ne && a.body) {
    const s = a.parseHeader("Content-Disposition");
    e = s ? s.type : void 0, t = a.parseHeader("Content-Type"), r = a.body;
  }
  if (a instanceof oe && a.body)
    if (e = a.getHeader("Content-Disposition"), t = a.getHeader("Content-Type"), typeof a.body == "string") {
      if (!t)
        throw new Error("Header content type header does not equal body content type.");
      r = a.body;
    } else {
      if (t && t !== a.body.contentType)
        throw new Error("Header content type header does not equal body content type.");
      t = a.body.contentType, r = a.body.body;
    }
  if (Ye(a) && (e = a.contentDisposition, t = a.contentType, r = a.content), !!r) {
    if (t && !e && (e = We(t)), !e)
      throw new Error("Content disposition undefined.");
    if (!t)
      throw new Error("Content type undefined.");
    return {
      contentDisposition: e,
      contentType: t,
      content: r
    };
  }
}
var V;
(function(a) {
  a.Initial = "Initial", a.Early = "Early", a.AckWait = "AckWait", a.Confirmed = "Confirmed", a.Terminated = "Terminated";
})(V = V || (V = {}));
var T;
(function(a) {
  a.Initial = "Initial", a.HaveLocalOffer = "HaveLocalOffer", a.HaveRemoteOffer = "HaveRemoteOffer", a.Stable = "Stable", a.Closed = "Closed";
})(T = T || (T = {}));
const Q = 500, Tt = 4e3, Pe = 5e3, q = {
  T1: Q,
  T2: Tt,
  T4: Pe,
  TIMER_B: 64 * Q,
  TIMER_D: 0 * Q,
  TIMER_F: 64 * Q,
  TIMER_H: 64 * Q,
  TIMER_I: 0 * Pe,
  TIMER_J: 0 * Q,
  TIMER_K: 0 * Pe,
  TIMER_L: 64 * Q,
  TIMER_M: 64 * Q,
  TIMER_N: 64 * Q,
  PROVISIONAL_RESPONSE_INTERVAL: 6e4
  // See RFC 3261 Section 13.3.1.1
};
class re extends ce {
  constructor(e) {
    super(e || "Transaction state error.");
  }
}
var b;
(function(a) {
  a.ACK = "ACK", a.BYE = "BYE", a.CANCEL = "CANCEL", a.INFO = "INFO", a.INVITE = "INVITE", a.MESSAGE = "MESSAGE", a.NOTIFY = "NOTIFY", a.OPTIONS = "OPTIONS", a.REGISTER = "REGISTER", a.UPDATE = "UPDATE", a.SUBSCRIBE = "SUBSCRIBE", a.PUBLISH = "PUBLISH", a.REFER = "REFER", a.PRACK = "PRACK";
})(b = b || (b = {}));
const se = [
  b.ACK,
  b.BYE,
  b.CANCEL,
  b.INFO,
  b.INVITE,
  b.MESSAGE,
  b.NOTIFY,
  b.OPTIONS,
  b.PRACK,
  b.REFER,
  b.REGISTER,
  b.SUBSCRIBE
];
class Ze {
  /** @internal */
  constructor(e) {
    this.incomingMessageRequest = e;
  }
  /** Incoming MESSAGE request message. */
  get request() {
    return this.incomingMessageRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingMessageRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingMessageRequest.reject(e), Promise.resolve();
  }
}
class Fe {
  /** @internal */
  constructor(e) {
    this.incomingNotifyRequest = e;
  }
  /** Incoming NOTIFY request message. */
  get request() {
    return this.incomingNotifyRequest.message;
  }
  /** Accept the request. */
  accept(e) {
    return this.incomingNotifyRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingNotifyRequest.reject(e), Promise.resolve();
  }
}
class bt {
  /** @internal */
  constructor(e, t) {
    this.incomingReferRequest = e, this.session = t;
  }
  get referTo() {
    const e = this.incomingReferRequest.message.parseHeader("refer-to");
    if (!(e instanceof O))
      throw new Error("Failed to parse Refer-To header.");
    return e;
  }
  get referredBy() {
    return this.incomingReferRequest.message.getHeader("referred-by");
  }
  get replaces() {
    const e = this.referTo.uri.getHeader("replaces");
    return e instanceof Array ? e[0] : e;
  }
  /** Incoming REFER request message. */
  get request() {
    return this.incomingReferRequest.message;
  }
  /** Accept the request. */
  accept(e = { statusCode: 202 }) {
    return this.incomingReferRequest.accept(e), Promise.resolve();
  }
  /** Reject the request. */
  reject(e) {
    return this.incomingReferRequest.reject(e), Promise.resolve();
  }
  /**
   * Creates an inviter which may be used to send an out of dialog INVITE request.
   *
   * @remarks
   * This a helper method to create an Inviter which will execute the referral
   * of the `Session` which was referred. The appropriate headers are set and
   * the referred `Session` is linked to the new `Session`. Note that only a
   * single instance of the `Inviter` will be created and returned (if called
   * more than once a reference to the same `Inviter` will be returned every time).
   *
   * @param options - Options bucket.
   * @param modifiers - Session description handler modifiers.
   */
  makeInviter(e) {
    if (this.inviter)
      return this.inviter;
    const t = this.referTo.uri.clone();
    t.clearHeaders(), e = e || {};
    const r = (e.extraHeaders || []).slice(), s = this.replaces;
    s && r.push("Replaces: " + decodeURIComponent(s));
    const i = this.referredBy;
    return i && r.push("Referred-By: " + i), e.extraHeaders = r, this.inviter = this.session.userAgent._makeInviter(t, e), this.inviter._referred = this.session, this.session._referral = this.inviter, this.inviter;
  }
}
var p;
(function(a) {
  a.Initial = "Initial", a.Establishing = "Establishing", a.Established = "Established", a.Terminating = "Terminating", a.Terminated = "Terminated";
})(p = p || (p = {}));
class le {
  /**
   * Constructor.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @internal
   */
  constructor(e, t = {}) {
    this.pendingReinvite = !1, this.pendingReinviteAck = !1, this._state = p.Initial, this.delegate = t.delegate, this._stateEventEmitter = new ve(), this._userAgent = e;
  }
  /**
   * Destructor.
   */
  dispose() {
    switch (this.logger.log(`Session ${this.id} in state ${this._state} is being disposed`), delete this.userAgent._sessions[this.id], this._sessionDescriptionHandler && this._sessionDescriptionHandler.close(), this.state) {
      case p.Initial:
        break;
      case p.Establishing:
        break;
      case p.Established:
        return new Promise((e) => {
          this._bye({
            // wait for the response to the BYE before resolving
            onAccept: () => e(),
            onRedirect: () => e(),
            onReject: () => e()
          });
        });
      case p.Terminating:
        break;
      case p.Terminated:
        break;
      default:
        throw new Error("Unknown state.");
    }
    return Promise.resolve();
  }
  /**
   * The asserted identity of the remote user.
   */
  get assertedIdentity() {
    return this._assertedIdentity;
  }
  /**
   * The confirmed session dialog.
   */
  get dialog() {
    return this._dialog;
  }
  /**
   * A unique identifier for this session.
   */
  get id() {
    return this._id;
  }
  /**
   * The session being replace by this one.
   */
  get replacee() {
    return this._replacee;
  }
  /**
   * Session description handler.
   * @remarks
   * If `this` is an instance of `Invitation`,
   * `sessionDescriptionHandler` will be defined when the session state changes to "established".
   * If `this` is an instance of `Inviter` and an offer was sent in the INVITE,
   * `sessionDescriptionHandler` will be defined when the session state changes to "establishing".
   * If `this` is an instance of `Inviter` and an offer was not sent in the INVITE,
   * `sessionDescriptionHandler` will be defined when the session state changes to "established".
   * Otherwise `undefined`.
   */
  get sessionDescriptionHandler() {
    return this._sessionDescriptionHandler;
  }
  /**
   * Session description handler factory.
   */
  get sessionDescriptionHandlerFactory() {
    return this.userAgent.configuration.sessionDescriptionHandlerFactory;
  }
  /**
   * SDH modifiers for the initial INVITE transaction.
   * @remarks
   * Used in all cases when handling the initial INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Inviter.invite() or Invitation.accept().
   */
  get sessionDescriptionHandlerModifiers() {
    return this._sessionDescriptionHandlerModifiers || [];
  }
  set sessionDescriptionHandlerModifiers(e) {
    this._sessionDescriptionHandlerModifiers = e.slice();
  }
  /**
   * SDH options for the initial INVITE transaction.
   * @remarks
   * Used in all cases when handling the initial INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Inviter.invite() or Invitation.accept().
   */
  get sessionDescriptionHandlerOptions() {
    return this._sessionDescriptionHandlerOptions || {};
  }
  set sessionDescriptionHandlerOptions(e) {
    this._sessionDescriptionHandlerOptions = Object.assign({}, e);
  }
  /**
   * SDH modifiers for re-INVITE transactions.
   * @remarks
   * Used in all cases when handling a re-INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Session.invite().
   */
  get sessionDescriptionHandlerModifiersReInvite() {
    return this._sessionDescriptionHandlerModifiersReInvite || [];
  }
  set sessionDescriptionHandlerModifiersReInvite(e) {
    this._sessionDescriptionHandlerModifiersReInvite = e.slice();
  }
  /**
   * SDH options for re-INVITE transactions.
   * @remarks
   * Used in all cases when handling a re-INVITE transaction as either UAC or UAS.
   * May be set directly at anytime.
   * May optionally be set via constructor option.
   * May optionally be set via options passed to Session.invite().
   */
  get sessionDescriptionHandlerOptionsReInvite() {
    return this._sessionDescriptionHandlerOptionsReInvite || {};
  }
  set sessionDescriptionHandlerOptionsReInvite(e) {
    this._sessionDescriptionHandlerOptionsReInvite = Object.assign({}, e);
  }
  /**
   * Session state.
   */
  get state() {
    return this._state;
  }
  /**
   * Session state change emitter.
   */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /**
   * The user agent.
   */
  get userAgent() {
    return this._userAgent;
  }
  /**
   * End the {@link Session}. Sends a BYE.
   * @param options - Options bucket. See {@link SessionByeOptions} for details.
   */
  bye(e = {}) {
    let t = "Session.bye() may only be called if established session.";
    switch (this.state) {
      case p.Initial:
        typeof this.cancel == "function" ? (t += " However Inviter.invite() has not yet been called.", t += " Perhaps you should have called Inviter.cancel()?") : typeof this.reject == "function" && (t += " However Invitation.accept() has not yet been called.", t += " Perhaps you should have called Invitation.reject()?");
        break;
      case p.Establishing:
        typeof this.cancel == "function" ? (t += " However a dialog does not yet exist.", t += " Perhaps you should have called Inviter.cancel()?") : typeof this.reject == "function" && (t += " However Invitation.accept() has not yet been called (or not yet resolved).", t += " Perhaps you should have called Invitation.reject()?");
        break;
      case p.Established: {
        const r = e.requestDelegate, s = this.copyRequestOptions(e.requestOptions);
        return this._bye(r, s);
      }
      case p.Terminating:
        t += " However this session is already terminating.", typeof this.cancel == "function" ? t += " Perhaps you have already called Inviter.cancel()?" : typeof this.reject == "function" && (t += " Perhaps you have already called Session.bye()?");
        break;
      case p.Terminated:
        t += " However this session is already terminated.";
        break;
      default:
        throw new Error("Unknown state");
    }
    return this.logger.error(t), Promise.reject(new Error(`Invalid session state ${this.state}`));
  }
  /**
   * Share {@link Info} with peer. Sends an INFO.
   * @param options - Options bucket. See {@link SessionInfoOptions} for details.
   */
  info(e = {}) {
    if (this.state !== p.Established)
      return this.logger.error("Session.info() may only be called if established session."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const t = e.requestDelegate, r = this.copyRequestOptions(e.requestOptions);
    return this._info(t, r);
  }
  /**
   * Renegotiate the session. Sends a re-INVITE.
   * @param options - Options bucket. See {@link SessionInviteOptions} for details.
   */
  invite(e = {}) {
    if (this.logger.log("Session.invite"), this.state !== p.Established)
      return Promise.reject(new Error(`Invalid session state ${this.state}`));
    if (this.pendingReinvite)
      return Promise.reject(new we("Reinvite in progress. Please wait until complete, then try again."));
    this.pendingReinvite = !0, e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiersReInvite = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptionsReInvite = e.sessionDescriptionHandlerOptions);
    const t = {
      onAccept: (i) => {
        const n = me(i.message);
        if (!n) {
          this.logger.error("Received 2xx response to re-INVITE without a session description"), this.ackAndBye(i, 400, "Missing session description"), this.stateTransition(p.Terminated), this.pendingReinvite = !1;
          return;
        }
        if (e.withoutSdp) {
          const o = {
            sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
            sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
          };
          this.setOfferAndGetAnswer(n, o).then((d) => {
            i.ack({ body: d });
          }).catch((d) => {
            this.logger.error("Failed to handle offer in 2xx response to re-INVITE"), this.logger.error(d.message), this.state === p.Terminated ? i.ack() : (this.ackAndBye(i, 488, "Bad Media Description"), this.stateTransition(p.Terminated));
          }).then(() => {
            this.pendingReinvite = !1, e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(i);
          });
        } else {
          const o = {
            sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
            sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
          };
          this.setAnswer(n, o).then(() => {
            i.ack();
          }).catch((d) => {
            this.logger.error("Failed to handle answer in 2xx response to re-INVITE"), this.logger.error(d.message), this.state !== p.Terminated ? (this.ackAndBye(i, 488, "Bad Media Description"), this.stateTransition(p.Terminated)) : i.ack();
          }).then(() => {
            this.pendingReinvite = !1, e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(i);
          });
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onProgress: (i) => {
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onRedirect: (i) => {
      },
      onReject: (i) => {
        this.logger.warn("Received a non-2xx response to re-INVITE"), this.pendingReinvite = !1, e.withoutSdp ? e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(i) : this.rollbackOffer().catch((n) => {
          if (this.logger.error("Failed to rollback offer on non-2xx response to re-INVITE"), this.logger.error(n.message), this.state !== p.Terminated) {
            if (!this.dialog)
              throw new Error("Dialog undefined.");
            const o = [];
            o.push("Reason: " + this.getReasonHeaderValue(500, "Internal Server Error")), this.dialog.bye(void 0, { extraHeaders: o }), this.stateTransition(p.Terminated);
          }
        }).then(() => {
          e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(i);
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onTrying: (i) => {
      }
    }, r = e.requestOptions || {};
    if (r.extraHeaders = (r.extraHeaders || []).slice(), r.extraHeaders.push("Allow: " + se.toString()), r.extraHeaders.push("Contact: " + this._contact), e.withoutSdp) {
      if (!this.dialog)
        throw this.pendingReinvite = !1, new Error("Dialog undefined.");
      return Promise.resolve(this.dialog.invite(t, r));
    }
    const s = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
    };
    return this.getOffer(s).then((i) => {
      if (!this.dialog)
        throw this.pendingReinvite = !1, new Error("Dialog undefined.");
      return r.body = i, this.dialog.invite(t, r);
    }).catch((i) => {
      throw this.logger.error(i.message), this.logger.error("Failed to send re-INVITE"), this.pendingReinvite = !1, i;
    });
  }
  /**
   * Deliver a {@link Message}. Sends a MESSAGE.
   * @param options - Options bucket. See {@link SessionMessageOptions} for details.
   */
  message(e = {}) {
    if (this.state !== p.Established)
      return this.logger.error("Session.message() may only be called if established session."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const t = e.requestDelegate, r = this.copyRequestOptions(e.requestOptions);
    return this._message(t, r);
  }
  /**
   * Proffer a {@link Referral}. Send a REFER.
   * @param referTo - The referral target. If a `Session`, a REFER w/Replaces is sent.
   * @param options - Options bucket. See {@link SessionReferOptions} for details.
   */
  refer(e, t = {}) {
    if (this.state !== p.Established)
      return this.logger.error("Session.refer() may only be called if established session."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    if (e instanceof le && !e.dialog)
      return this.logger.error("Session.refer() may only be called with session which is established. You are perhaps attempting to attended transfer to a target for which there is not dialog yet established. Perhaps you are attempting a 'semi-attended' tansfer? Regardless, this is not supported. The recommended approached is to check to see if the target Session is in the Established state before calling refer(); if the state is not Established you may proceed by falling back using a URI as the target (blind transfer)."), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const r = t.requestDelegate, s = this.copyRequestOptions(t.requestOptions);
    return s.extraHeaders = s.extraHeaders ? s.extraHeaders.concat(this.referExtraHeaders(this.referToString(e))) : this.referExtraHeaders(this.referToString(e)), this._refer(t.onNotify, r, s);
  }
  /**
   * Send BYE.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _bye(e, t) {
    if (!this.dialog)
      return Promise.reject(new Error("Session dialog undefined."));
    const r = this.dialog;
    switch (r.sessionState) {
      case V.Initial:
        throw new Error(`Invalid dialog state ${r.sessionState}`);
      case V.Early:
        throw new Error(`Invalid dialog state ${r.sessionState}`);
      case V.AckWait:
        return this.stateTransition(p.Terminating), new Promise((s) => {
          r.delegate = {
            // When ACK shows up, say BYE.
            onAck: () => {
              const i = r.bye(e, t);
              return this.stateTransition(p.Terminated), s(i), Promise.resolve();
            },
            // Or the server transaction times out before the ACK arrives.
            onAckTimeout: () => {
              const i = r.bye(e, t);
              this.stateTransition(p.Terminated), s(i);
            }
          };
        });
      case V.Confirmed: {
        const s = r.bye(e, t);
        return this.stateTransition(p.Terminated), Promise.resolve(s);
      }
      case V.Terminated:
        throw new Error(`Invalid dialog state ${r.sessionState}`);
      default:
        throw new Error("Unrecognized state.");
    }
  }
  /**
   * Send INFO.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _info(e, t) {
    return this.dialog ? Promise.resolve(this.dialog.info(e, t)) : Promise.reject(new Error("Session dialog undefined."));
  }
  /**
   * Send MESSAGE.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _message(e, t) {
    return this.dialog ? Promise.resolve(this.dialog.message(e, t)) : Promise.reject(new Error("Session dialog undefined."));
  }
  /**
   * Send REFER.
   * @param onNotify - Notification callback.
   * @param delegate - Request delegate.
   * @param options - Request options bucket.
   * @internal
   */
  _refer(e, t, r) {
    return this.dialog ? (this.onNotify = e, Promise.resolve(this.dialog.refer(t, r))) : Promise.reject(new Error("Session dialog undefined."));
  }
  /**
   * Send ACK and then BYE. There are unrecoverable errors which can occur
   * while handling dialog forming and in-dialog INVITE responses and when
   * they occur we ACK the response and send a BYE.
   * Note that the BYE is sent in the dialog associated with the response
   * which is not necessarily `this.dialog`. And, accordingly, the
   * session state is not transitioned to terminated and session is not closed.
   * @param inviteResponse - The response causing the error.
   * @param statusCode - Status code for he reason phrase.
   * @param reasonPhrase - Reason phrase for the BYE.
   * @internal
   */
  ackAndBye(e, t, r) {
    e.ack();
    const s = [];
    t && s.push("Reason: " + this.getReasonHeaderValue(t, r)), e.session.bye(void 0, { extraHeaders: s });
  }
  /**
   * Handle in dialog ACK request.
   * @internal
   */
  onAckRequest(e) {
    if (this.logger.log("Session.onAckRequest"), this.state !== p.Established && this.state !== p.Terminating)
      return this.logger.error(`ACK received while in state ${this.state}, dropping request`), Promise.resolve();
    const t = this.dialog;
    if (!t)
      throw new Error("Dialog undefined.");
    const r = {
      sessionDescriptionHandlerOptions: this.pendingReinviteAck ? this.sessionDescriptionHandlerOptionsReInvite : this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.pendingReinviteAck ? this._sessionDescriptionHandlerModifiersReInvite : this._sessionDescriptionHandlerModifiers
    };
    if (this.delegate && this.delegate.onAck) {
      const s = new ut(e);
      this.delegate.onAck(s);
    }
    switch (this.pendingReinviteAck = !1, t.signalingState) {
      case T.Initial: {
        this.logger.error(`Invalid signaling state ${t.signalingState}.`);
        const s = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
        return t.bye(void 0, { extraHeaders: s }), this.stateTransition(p.Terminated), Promise.resolve();
      }
      case T.Stable: {
        const s = me(e.message);
        return s ? s.contentDisposition === "render" ? (this._renderbody = s.content, this._rendertype = s.contentType, Promise.resolve()) : s.contentDisposition !== "session" ? Promise.resolve() : this.setAnswer(s, r).catch((i) => {
          this.logger.error(i.message);
          const n = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
          t.bye(void 0, { extraHeaders: n }), this.stateTransition(p.Terminated);
        }) : Promise.resolve();
      }
      case T.HaveLocalOffer: {
        this.logger.error(`Invalid signaling state ${t.signalingState}.`);
        const s = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
        return t.bye(void 0, { extraHeaders: s }), this.stateTransition(p.Terminated), Promise.resolve();
      }
      case T.HaveRemoteOffer: {
        this.logger.error(`Invalid signaling state ${t.signalingState}.`);
        const s = ["Reason: " + this.getReasonHeaderValue(488, "Bad Media Description")];
        return t.bye(void 0, { extraHeaders: s }), this.stateTransition(p.Terminated), Promise.resolve();
      }
      case T.Closed:
        throw new Error(`Invalid signaling state ${t.signalingState}.`);
      default:
        throw new Error(`Invalid signaling state ${t.signalingState}.`);
    }
  }
  /**
   * Handle in dialog BYE request.
   * @internal
   */
  onByeRequest(e) {
    if (this.logger.log("Session.onByeRequest"), this.state !== p.Established) {
      this.logger.error(`BYE received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onBye) {
      const t = new gt(e);
      this.delegate.onBye(t);
    } else
      e.accept();
    this.stateTransition(p.Terminated);
  }
  /**
   * Handle in dialog INFO request.
   * @internal
   */
  onInfoRequest(e) {
    if (this.logger.log("Session.onInfoRequest"), this.state !== p.Established) {
      this.logger.error(`INFO received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onInfo) {
      const t = new pt(e);
      this.delegate.onInfo(t);
    } else
      e.accept();
  }
  /**
   * Handle in dialog INVITE request.
   * @internal
   */
  onInviteRequest(e) {
    if (this.logger.log("Session.onInviteRequest"), this.state !== p.Established) {
      this.logger.error(`INVITE received while in state ${this.state}, dropping request`);
      return;
    }
    this.pendingReinviteAck = !0;
    const t = ["Contact: " + this._contact];
    if (e.message.hasHeader("P-Asserted-Identity")) {
      const s = e.message.getHeader("P-Asserted-Identity");
      if (!s)
        throw new Error("Header undefined.");
      this._assertedIdentity = P.nameAddrHeaderParse(s);
    }
    const r = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptionsReInvite,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiersReInvite
    };
    this.generateResponseOfferAnswerInDialog(r).then((s) => {
      const i = e.accept({ statusCode: 200, extraHeaders: t, body: s });
      this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, i.message, 200);
    }).catch((s) => {
      if (this.logger.error(s.message), this.logger.error("Failed to handle to re-INVITE request"), !this.dialog)
        throw new Error("Dialog undefined.");
      if (this.logger.error(this.dialog.signalingState), this.dialog.signalingState === T.Stable) {
        const i = e.reject({ statusCode: 488 });
        this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, i.message, 488);
        return;
      }
      this.rollbackOffer().then(() => {
        const i = e.reject({ statusCode: 488 });
        this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, i.message, 488);
      }).catch((i) => {
        this.logger.error(i.message), this.logger.error("Failed to rollback offer on re-INVITE request");
        const n = e.reject({ statusCode: 488 });
        if (this.state !== p.Terminated) {
          if (!this.dialog)
            throw new Error("Dialog undefined.");
          const o = [];
          o.push("Reason: " + this.getReasonHeaderValue(500, "Internal Server Error")), this.dialog.bye(void 0, { extraHeaders: o }), this.stateTransition(p.Terminated);
        }
        this.delegate && this.delegate.onInvite && this.delegate.onInvite(e.message, n.message, 488);
      });
    });
  }
  /**
   * Handle in dialog MESSAGE request.
   * @internal
   */
  onMessageRequest(e) {
    if (this.logger.log("Session.onMessageRequest"), this.state !== p.Established) {
      this.logger.error(`MESSAGE received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onMessage) {
      const t = new Ze(e);
      this.delegate.onMessage(t);
    } else
      e.accept();
  }
  /**
   * Handle in dialog NOTIFY request.
   * @internal
   */
  onNotifyRequest(e) {
    if (this.logger.log("Session.onNotifyRequest"), this.state !== p.Established) {
      this.logger.error(`NOTIFY received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.onNotify) {
      const t = new Fe(e);
      this.onNotify(t);
      return;
    }
    if (this.delegate && this.delegate.onNotify) {
      const t = new Fe(e);
      this.delegate.onNotify(t);
    } else
      e.accept();
  }
  /**
   * Handle in dialog PRACK request.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPrackRequest(e) {
    if (this.logger.log("Session.onPrackRequest"), this.state !== p.Established) {
      this.logger.error(`PRACK received while in state ${this.state}, dropping request`);
      return;
    }
    throw new Error("Unimplemented.");
  }
  /**
   * Handle in dialog REFER request.
   * @internal
   */
  onReferRequest(e) {
    if (this.logger.log("Session.onReferRequest"), this.state !== p.Established) {
      this.logger.error(`REFER received while in state ${this.state}, dropping request`);
      return;
    }
    if (!e.message.hasHeader("refer-to")) {
      this.logger.warn("Invalid REFER packet. A refer-to header is required. Rejecting."), e.reject();
      return;
    }
    const t = new bt(e, this);
    this.delegate && this.delegate.onRefer ? this.delegate.onRefer(t) : (this.logger.log("No delegate available to handle REFER, automatically accepting and following."), t.accept().then(() => t.makeInviter(this._referralInviterOptions).invite()).catch((r) => {
      this.logger.error(r.message);
    }));
  }
  /**
   * Generate an offer or answer for a response to an INVITE request.
   * If a remote offer was provided in the request, set the remote
   * description and get a local answer. If a remote offer was not
   * provided, generates a local offer.
   * @internal
   */
  generateResponseOfferAnswer(e, t) {
    if (this.dialog)
      return this.generateResponseOfferAnswerInDialog(t);
    const r = me(e.message);
    return !r || r.contentDisposition !== "session" ? this.getOffer(t) : this.setOfferAndGetAnswer(r, t);
  }
  /**
   * Generate an offer or answer for a response to an INVITE request
   * when a dialog (early or otherwise) has already been established.
   * This method may NOT be called if a dialog has yet to be established.
   * @internal
   */
  generateResponseOfferAnswerInDialog(e) {
    if (!this.dialog)
      throw new Error("Dialog undefined.");
    switch (this.dialog.signalingState) {
      case T.Initial:
        return this.getOffer(e);
      case T.HaveLocalOffer:
        return Promise.resolve(void 0);
      case T.HaveRemoteOffer:
        if (!this.dialog.offer)
          throw new Error(`Session offer undefined in signaling state ${this.dialog.signalingState}.`);
        return this.setOfferAndGetAnswer(this.dialog.offer, e);
      case T.Stable:
        return this.state !== p.Established ? Promise.resolve(void 0) : this.getOffer(e);
      case T.Closed:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      default:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
    }
  }
  /**
   * Get local offer.
   * @internal
   */
  getOffer(e) {
    const t = this.setupSessionDescriptionHandler(), r = e.sessionDescriptionHandlerOptions, s = e.sessionDescriptionHandlerModifiers;
    try {
      return t.getDescription(r, s).then((i) => Re(i)).catch((i) => {
        this.logger.error("Session.getOffer: SDH getDescription rejected...");
        const n = i instanceof Error ? i : new Error("Session.getOffer unknown error.");
        throw this.logger.error(n.message), n;
      });
    } catch (i) {
      this.logger.error("Session.getOffer: SDH getDescription threw...");
      const n = i instanceof Error ? i : new Error(i);
      return this.logger.error(n.message), Promise.reject(n);
    }
  }
  /**
   * Rollback local/remote offer.
   * @internal
   */
  rollbackOffer() {
    const e = this.setupSessionDescriptionHandler();
    if (e.rollbackDescription === void 0)
      return Promise.resolve();
    try {
      return e.rollbackDescription().catch((t) => {
        this.logger.error("Session.rollbackOffer: SDH rollbackDescription rejected...");
        const r = t instanceof Error ? t : new Error("Session.rollbackOffer unknown error.");
        throw this.logger.error(r.message), r;
      });
    } catch (t) {
      this.logger.error("Session.rollbackOffer: SDH rollbackDescription threw...");
      const r = t instanceof Error ? t : new Error(t);
      return this.logger.error(r.message), Promise.reject(r);
    }
  }
  /**
   * Set remote answer.
   * @internal
   */
  setAnswer(e, t) {
    const r = this.setupSessionDescriptionHandler(), s = t.sessionDescriptionHandlerOptions, i = t.sessionDescriptionHandlerModifiers;
    try {
      if (!r.hasDescription(e.contentType))
        return Promise.reject(new qe());
    } catch (n) {
      this.logger.error("Session.setAnswer: SDH hasDescription threw...");
      const o = n instanceof Error ? n : new Error(n);
      return this.logger.error(o.message), Promise.reject(o);
    }
    try {
      return r.setDescription(e.content, s, i).catch((n) => {
        this.logger.error("Session.setAnswer: SDH setDescription rejected...");
        const o = n instanceof Error ? n : new Error("Session.setAnswer unknown error.");
        throw this.logger.error(o.message), o;
      });
    } catch (n) {
      this.logger.error("Session.setAnswer: SDH setDescription threw...");
      const o = n instanceof Error ? n : new Error(n);
      return this.logger.error(o.message), Promise.reject(o);
    }
  }
  /**
   * Set remote offer and get local answer.
   * @internal
   */
  setOfferAndGetAnswer(e, t) {
    const r = this.setupSessionDescriptionHandler(), s = t.sessionDescriptionHandlerOptions, i = t.sessionDescriptionHandlerModifiers;
    try {
      if (!r.hasDescription(e.contentType))
        return Promise.reject(new qe());
    } catch (n) {
      this.logger.error("Session.setOfferAndGetAnswer: SDH hasDescription threw...");
      const o = n instanceof Error ? n : new Error(n);
      return this.logger.error(o.message), Promise.reject(o);
    }
    try {
      return r.setDescription(e.content, s, i).then(() => r.getDescription(s, i)).then((n) => Re(n)).catch((n) => {
        this.logger.error("Session.setOfferAndGetAnswer: SDH setDescription or getDescription rejected...");
        const o = n instanceof Error ? n : new Error("Session.setOfferAndGetAnswer unknown error.");
        throw this.logger.error(o.message), o;
      });
    } catch (n) {
      this.logger.error("Session.setOfferAndGetAnswer: SDH setDescription or getDescription threw...");
      const o = n instanceof Error ? n : new Error(n);
      return this.logger.error(o.message), Promise.reject(o);
    }
  }
  /**
   * SDH for confirmed dialog.
   * @internal
   */
  setSessionDescriptionHandler(e) {
    if (this._sessionDescriptionHandler)
      throw new Error("Session description handler defined.");
    this._sessionDescriptionHandler = e;
  }
  /**
   * SDH for confirmed dialog.
   * @internal
   */
  setupSessionDescriptionHandler() {
    var e;
    return this._sessionDescriptionHandler ? this._sessionDescriptionHandler : (this._sessionDescriptionHandler = this.sessionDescriptionHandlerFactory(this, this.userAgent.configuration.sessionDescriptionHandlerFactoryOptions), !((e = this.delegate) === null || e === void 0) && e.onSessionDescriptionHandler && this.delegate.onSessionDescriptionHandler(this._sessionDescriptionHandler, !1), this._sessionDescriptionHandler);
  }
  /**
   * Transition session state.
   * @internal
   */
  stateTransition(e) {
    const t = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    switch (this._state) {
      case p.Initial:
        e !== p.Establishing && e !== p.Established && e !== p.Terminating && e !== p.Terminated && t();
        break;
      case p.Establishing:
        e !== p.Established && e !== p.Terminating && e !== p.Terminated && t();
        break;
      case p.Established:
        e !== p.Terminating && e !== p.Terminated && t();
        break;
      case p.Terminating:
        e !== p.Terminated && t();
        break;
      case p.Terminated:
        t();
        break;
      default:
        throw new Error("Unrecognized state.");
    }
    this._state = e, this.logger.log(`Session ${this.id} transitioned to state ${this._state}`), this._stateEventEmitter.emit(this._state), e === p.Terminated && this.dispose();
  }
  copyRequestOptions(e = {}) {
    const t = e.extraHeaders ? e.extraHeaders.slice() : void 0, r = e.body ? {
      contentDisposition: e.body.contentDisposition || "render",
      contentType: e.body.contentType || "text/plain",
      content: e.body.content || ""
    } : void 0;
    return {
      extraHeaders: t,
      body: r
    };
  }
  getReasonHeaderValue(e, t) {
    const r = e;
    let s = $e(e);
    return !s && t && (s = t), "SIP;cause=" + r + ';text="' + s + '"';
  }
  referExtraHeaders(e) {
    const t = [];
    return t.push("Referred-By: <" + this.userAgent.configuration.uri + ">"), t.push("Contact: " + this._contact), t.push("Allow: " + ["ACK", "CANCEL", "INVITE", "MESSAGE", "BYE", "OPTIONS", "INFO", "NOTIFY", "REFER"].toString()), t.push("Refer-To: " + e), t;
  }
  referToString(e) {
    let t;
    if (e instanceof J)
      t = e.toString();
    else {
      if (!e.dialog)
        throw new Error("Dialog undefined.");
      const r = e.remoteIdentity.friendlyName, s = e.dialog.remoteTarget.toString(), i = e.dialog.callId, n = e.dialog.remoteTag, o = e.dialog.localTag, d = encodeURIComponent(`${i};to-tag=${n};from-tag=${o}`);
      t = `"${r}" <${s}?Replaces=${d}>`;
    }
    return t;
  }
}
var K;
(function(a) {
  a.Required = "Required", a.Supported = "Supported", a.Unsupported = "Unsupported";
})(K = K || (K = {}));
const Et = {
  "100rel": !0,
  199: !0,
  answermode: !0,
  "early-session": !0,
  eventlist: !0,
  explicitsub: !0,
  "from-change": !0,
  "geolocation-http": !0,
  "geolocation-sip": !0,
  gin: !0,
  gruu: !0,
  histinfo: !0,
  ice: !0,
  join: !0,
  "multiple-refer": !0,
  norefersub: !0,
  nosub: !0,
  outbound: !0,
  path: !0,
  policy: !0,
  precondition: !0,
  pref: !0,
  privacy: !0,
  "recipient-list-invite": !0,
  "recipient-list-message": !0,
  "recipient-list-subscribe": !0,
  replaces: !0,
  "resource-priority": !0,
  "sdp-anat": !0,
  "sec-agree": !0,
  tdialog: !0,
  timer: !0,
  uui: !0
  // RFC 7433
};
class pe extends le {
  /** @internal */
  constructor(e, t) {
    super(e), this.incomingInviteRequest = t, this.disposed = !1, this.expiresTimer = void 0, this.isCanceled = !1, this.rel100 = "none", this.rseq = Math.floor(Math.random() * 1e4), this.userNoAnswerTimer = void 0, this.waitingForPrack = !1, this.logger = e.getLogger("sip.Invitation");
    const r = this.incomingInviteRequest.message, s = r.getHeader("require");
    s && s.toLowerCase().includes("100rel") && (this.rel100 = "required");
    const i = r.getHeader("supported");
    if (i && i.toLowerCase().includes("100rel") && (this.rel100 = "supported"), r.toTag = t.toTag, typeof r.toTag != "string")
      throw new TypeError("toTag should have been a string.");
    if (this.userNoAnswerTimer = setTimeout(() => {
      t.reject({ statusCode: 480 }), this.stateTransition(p.Terminated);
    }, this.userAgent.configuration.noAnswerTimeout ? this.userAgent.configuration.noAnswerTimeout * 1e3 : 6e4), r.hasHeader("expires")) {
      const d = Number(r.getHeader("expires") || 0) * 1e3;
      this.expiresTimer = setTimeout(() => {
        this.state === p.Initial && (t.reject({ statusCode: 487 }), this.stateTransition(p.Terminated));
      }, d);
    }
    const n = this.request.getHeader("P-Asserted-Identity");
    n && (this._assertedIdentity = P.nameAddrHeaderParse(n)), this._contact = this.userAgent.contact.toString();
    const o = r.parseHeader("Content-Disposition");
    o && o.type === "render" && (this._renderbody = r.body, this._rendertype = r.getHeader("Content-Type")), this._id = r.callId + r.fromTag, this.userAgent._sessions[this._id] = this;
  }
  /**
   * Destructor.
   */
  dispose() {
    if (this.disposed)
      return Promise.resolve();
    switch (this.disposed = !0, this.expiresTimer && (clearTimeout(this.expiresTimer), this.expiresTimer = void 0), this.userNoAnswerTimer && (clearTimeout(this.userNoAnswerTimer), this.userNoAnswerTimer = void 0), this.prackNeverArrived(), this.state) {
      case p.Initial:
        return this.reject().then(() => super.dispose());
      case p.Establishing:
        return this.reject().then(() => super.dispose());
      case p.Established:
        return super.dispose();
      case p.Terminating:
        return super.dispose();
      case p.Terminated:
        return super.dispose();
      default:
        throw new Error("Unknown state.");
    }
  }
  /**
   * If true, a first provisional response after the 100 Trying
   * will be sent automatically. This is false it the UAC required
   * reliable provisional responses (100rel in Require header) or
   * the user agent configuration has specified to not send an
   * initial response, otherwise it is true. The provisional is sent by
   * calling `progress()` without any options.
   */
  get autoSendAnInitialProvisionalResponse() {
    return this.rel100 !== "required" && this.userAgent.configuration.sendInitialProvisionalResponse;
  }
  /**
   * Initial incoming INVITE request message body.
   */
  get body() {
    return this.incomingInviteRequest.message.body;
  }
  /**
   * The identity of the local user.
   */
  get localIdentity() {
    return this.request.to;
  }
  /**
   * The identity of the remote user.
   */
  get remoteIdentity() {
    return this.request.from;
  }
  /**
   * Initial incoming INVITE request message.
   */
  get request() {
    return this.incomingInviteRequest.message;
  }
  /**
   * Accept the invitation.
   *
   * @remarks
   * Accept the incoming INVITE request to start a Session.
   * Replies to the INVITE request with a 200 Ok response.
   * Resolves once the response sent, otherwise rejects.
   *
   * This method may reject for a variety of reasons including
   * the receipt of a CANCEL request before `accept` is able
   * to construct a response.
   * @param options - Options bucket.
   */
  accept(e = {}) {
    if (this.logger.log("Invitation.accept"), this.state !== p.Initial) {
      const t = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(t.message), Promise.reject(t);
    }
    return e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = e.sessionDescriptionHandlerOptions), this.stateTransition(p.Establishing), this.sendAccept(e).then(({ message: t, session: r }) => {
      r.delegate = {
        onAck: (s) => this.onAckRequest(s),
        onAckTimeout: () => this.onAckTimeout(),
        onBye: (s) => this.onByeRequest(s),
        onInfo: (s) => this.onInfoRequest(s),
        onInvite: (s) => this.onInviteRequest(s),
        onMessage: (s) => this.onMessageRequest(s),
        onNotify: (s) => this.onNotifyRequest(s),
        onPrack: (s) => this.onPrackRequest(s),
        onRefer: (s) => this.onReferRequest(s)
      }, this._dialog = r, this.stateTransition(p.Established), this._replacee && this._replacee._bye();
    }).catch((t) => this.handleResponseError(t));
  }
  /**
   * Indicate progress processing the invitation.
   *
   * @remarks
   * Report progress to the the caller.
   * Replies to the INVITE request with a 1xx provisional response.
   * Resolves once the response sent, otherwise rejects.
   * @param options - Options bucket.
   */
  progress(e = {}) {
    if (this.logger.log("Invitation.progress"), this.state !== p.Initial) {
      const r = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(r.message), Promise.reject(r);
    }
    const t = e.statusCode || 180;
    if (t < 100 || t > 199)
      throw new TypeError("Invalid statusCode: " + t);
    return e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = e.sessionDescriptionHandlerOptions), this.waitingForPrack ? (this.logger.warn("Unexpected call for progress while waiting for prack, ignoring"), Promise.resolve()) : e.statusCode === 100 ? this.sendProgressTrying().then(() => {
    }).catch((r) => this.handleResponseError(r)) : this.rel100 !== "required" && !(this.rel100 === "supported" && e.rel100) && !(this.rel100 === "supported" && this.userAgent.configuration.sipExtension100rel === K.Required) ? this.sendProgress(e).then(() => {
    }).catch((r) => this.handleResponseError(r)) : this.sendProgressReliableWaitForPrack(e).then(() => {
    }).catch((r) => this.handleResponseError(r));
  }
  /**
   * Reject the invitation.
   *
   * @remarks
   * Replies to the INVITE request with a 4xx, 5xx, or 6xx final response.
   * Resolves once the response sent, otherwise rejects.
   *
   * The expectation is that this method is used to reject an INVITE request.
   * That is indeed the case - a call to `progress` followed by `reject` is
   * a typical way to "decline" an incoming INVITE request. However it may
   * also be called after calling `accept` (but only before it completes)
   * which will reject the call and cause `accept` to reject.
   * @param options - Options bucket.
   */
  reject(e = {}) {
    if (this.logger.log("Invitation.reject"), this.state !== p.Initial && this.state !== p.Establishing) {
      const n = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(n.message), Promise.reject(n);
    }
    const t = e.statusCode || 480, r = e.reasonPhrase ? e.reasonPhrase : $e(t), s = e.extraHeaders || [];
    if (t < 300 || t > 699)
      throw new TypeError("Invalid statusCode: " + t);
    const i = e.body ? Re(e.body) : void 0;
    return t < 400 ? this.incomingInviteRequest.redirect([], { statusCode: t, reasonPhrase: r, extraHeaders: s, body: i }) : this.incomingInviteRequest.reject({ statusCode: t, reasonPhrase: r, extraHeaders: s, body: i }), this.stateTransition(p.Terminated), Promise.resolve();
  }
  /**
   * Handle CANCEL request.
   *
   * @param message - CANCEL message.
   * @internal
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onCancel(e) {
    if (this.logger.log("Invitation._onCancel"), this.state !== p.Initial && this.state !== p.Establishing) {
      this.logger.error(`CANCEL received while in state ${this.state}, dropping request`);
      return;
    }
    if (this.delegate && this.delegate.onCancel) {
      const t = new ft(e);
      this.delegate.onCancel(t);
    }
    this.isCanceled = !0, this.incomingInviteRequest.reject({ statusCode: 487 }), this.stateTransition(p.Terminated);
  }
  /**
   * Helper function to handle offer/answer in a PRACK.
   */
  handlePrackOfferAnswer(e) {
    if (!this.dialog)
      throw new Error("Dialog undefined.");
    const t = me(e.message);
    if (!t || t.contentDisposition !== "session")
      return Promise.resolve(void 0);
    const r = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    };
    switch (this.dialog.signalingState) {
      case T.Initial:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      case T.Stable:
        return this.setAnswer(t, r).then(() => {
        });
      case T.HaveLocalOffer:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      case T.HaveRemoteOffer:
        return this.setOfferAndGetAnswer(t, r);
      case T.Closed:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
      default:
        throw new Error(`Invalid signaling state ${this.dialog.signalingState}.`);
    }
  }
  /**
   * A handler for errors which occur while attempting to send 1xx and 2xx responses.
   * In all cases, an attempt is made to reject the request if it is still outstanding.
   * And while there are a variety of things which can go wrong and we log something here
   * for all errors, there are a handful of common exceptions we pay some extra attention to.
   * @param error - The error which occurred.
   */
  handleResponseError(e) {
    let t = 480;
    if (e instanceof Error ? this.logger.error(e.message) : this.logger.error(e), e instanceof qe ? (this.logger.error("A session description handler occurred while sending response (content type unsupported"), t = 415) : e instanceof lt ? this.logger.error("A session description handler occurred while sending response") : e instanceof De ? this.logger.error("Session ended before response could be formulated and sent (while waiting for PRACK)") : e instanceof re && this.logger.error("Session changed state before response could be formulated and sent"), this.state === p.Initial || this.state === p.Establishing)
      try {
        this.incomingInviteRequest.reject({ statusCode: t }), this.stateTransition(p.Terminated);
      } catch (r) {
        throw this.logger.error("An error occurred attempting to reject the request while handling another error"), r;
      }
    if (this.isCanceled) {
      this.logger.warn("An error occurred while attempting to formulate and send a response to an incoming INVITE. However a CANCEL was received and processed while doing so which can (and often does) result in errors occurring as the session terminates in the meantime. Said error is being ignored.");
      return;
    }
    throw e;
  }
  /**
   * Callback for when ACK for a 2xx response is never received.
   * @param session - Session the ACK never arrived for.
   */
  onAckTimeout() {
    if (this.logger.log("Invitation.onAckTimeout"), !this.dialog)
      throw new Error("Dialog undefined.");
    this.logger.log("No ACK received for an extended period of time, terminating session"), this.dialog.bye(), this.stateTransition(p.Terminated);
  }
  /**
   * A version of `accept` which resolves a session when the 200 Ok response is sent.
   * @param options - Options bucket.
   */
  sendAccept(e = {}) {
    const t = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    }, r = e.extraHeaders || [];
    return this.waitingForPrack ? this.waitForArrivalOfPrack().then(() => clearTimeout(this.userNoAnswerTimer)).then(() => this.generateResponseOfferAnswer(this.incomingInviteRequest, t)).then((s) => this.incomingInviteRequest.accept({ statusCode: 200, body: s, extraHeaders: r })) : (clearTimeout(this.userNoAnswerTimer), this.generateResponseOfferAnswer(this.incomingInviteRequest, t).then((s) => this.incomingInviteRequest.accept({ statusCode: 200, body: s, extraHeaders: r })));
  }
  /**
   * A version of `progress` which resolves when the provisional response is sent.
   * @param options - Options bucket.
   */
  sendProgress(e = {}) {
    const t = e.statusCode || 180, r = e.reasonPhrase, s = (e.extraHeaders || []).slice(), i = e.body ? Re(e.body) : void 0;
    if (t === 183 && !i)
      return this.sendProgressWithSDP(e);
    try {
      const n = this.incomingInviteRequest.progress({ statusCode: t, reasonPhrase: r, extraHeaders: s, body: i });
      return this._dialog = n.session, Promise.resolve(n);
    } catch (n) {
      return Promise.reject(n);
    }
  }
  /**
   * A version of `progress` which resolves when the provisional response with sdp is sent.
   * @param options - Options bucket.
   */
  sendProgressWithSDP(e = {}) {
    const t = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    }, r = e.statusCode || 183, s = e.reasonPhrase, i = (e.extraHeaders || []).slice();
    return this.generateResponseOfferAnswer(this.incomingInviteRequest, t).then((n) => this.incomingInviteRequest.progress({ statusCode: r, reasonPhrase: s, extraHeaders: i, body: n })).then((n) => (this._dialog = n.session, n));
  }
  /**
   * A version of `progress` which resolves when the reliable provisional response is sent.
   * @param options - Options bucket.
   */
  sendProgressReliable(e = {}) {
    return e.extraHeaders = (e.extraHeaders || []).slice(), e.extraHeaders.push("Require: 100rel"), e.extraHeaders.push("RSeq: " + Math.floor(Math.random() * 1e4)), this.sendProgressWithSDP(e);
  }
  /**
   * A version of `progress` which resolves when the reliable provisional response is acknowledged.
   * @param options - Options bucket.
   */
  sendProgressReliableWaitForPrack(e = {}) {
    const t = {
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions,
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers
    }, r = e.statusCode || 183, s = e.reasonPhrase, i = (e.extraHeaders || []).slice();
    i.push("Require: 100rel"), i.push("RSeq: " + this.rseq++);
    let n;
    return new Promise((o, d) => {
      this.waitingForPrack = !0, this.generateResponseOfferAnswer(this.incomingInviteRequest, t).then((w) => (n = w, this.incomingInviteRequest.progress({ statusCode: r, reasonPhrase: s, extraHeaders: i, body: n }))).then((w) => {
        this._dialog = w.session;
        let f, m;
        w.session.delegate = {
          onPrack: (g) => {
            f = g, clearTimeout(I), clearTimeout(X), this.waitingForPrack && (this.waitingForPrack = !1, this.handlePrackOfferAnswer(f).then((R) => {
              try {
                m = f.accept({ statusCode: 200, body: R }), this.prackArrived(), o({ prackRequest: f, prackResponse: m, progressResponse: w });
              } catch (ee) {
                d(ee);
              }
            }).catch((R) => d(R)));
          }
        };
        const I = setTimeout(() => {
          this.waitingForPrack && (this.waitingForPrack = !1, this.logger.warn("No PRACK received, rejecting INVITE."), clearTimeout(X), this.reject({ statusCode: 504 }).then(() => d(new De())).catch((g) => d(g)));
        }, q.T1 * 64), D = () => {
          try {
            this.incomingInviteRequest.progress({ statusCode: r, reasonPhrase: s, extraHeaders: i, body: n });
          } catch (g) {
            this.waitingForPrack = !1, d(g);
            return;
          }
          X = setTimeout(D, S *= 2);
        };
        let S = q.T1, X = setTimeout(D, S);
      }).catch((w) => {
        this.waitingForPrack = !1, d(w);
      });
    });
  }
  /**
   * A version of `progress` which resolves when a 100 Trying provisional response is sent.
   */
  sendProgressTrying() {
    try {
      const e = this.incomingInviteRequest.trying();
      return Promise.resolve(e);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * When attempting to accept the INVITE, an invitation waits
   * for any outstanding PRACK to arrive before sending the 200 Ok.
   * It will be waiting on this Promise to resolve which lets it know
   * the PRACK has arrived and it may proceed to send the 200 Ok.
   */
  waitForArrivalOfPrack() {
    if (this.waitingForPrackPromise)
      throw new Error("Already waiting for PRACK");
    return this.waitingForPrackPromise = new Promise((e, t) => {
      this.waitingForPrackResolve = e, this.waitingForPrackReject = t;
    }), this.waitingForPrackPromise;
  }
  /**
   * Here we are resolving the promise which in turn will cause
   * the accept to proceed (it may still fail for other reasons, but...).
   */
  prackArrived() {
    this.waitingForPrackResolve && this.waitingForPrackResolve(), this.waitingForPrackPromise = void 0, this.waitingForPrackResolve = void 0, this.waitingForPrackReject = void 0;
  }
  /**
   * Here we are rejecting the promise which in turn will cause
   * the accept to fail and the session to transition to "terminated".
   */
  prackNeverArrived() {
    this.waitingForPrackReject && this.waitingForPrackReject(new De()), this.waitingForPrackPromise = void 0, this.waitingForPrackResolve = void 0, this.waitingForPrackReject = void 0;
  }
}
class Ee extends le {
  /**
   * Constructs a new instance of the `Inviter` class.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @param targetURI - Request URI identifying the target of the message.
   * @param options - Options bucket. See {@link InviterOptions} for details.
   */
  constructor(e, t, r = {}) {
    super(e, r), this.disposed = !1, this.earlyMedia = !1, this.earlyMediaSessionDescriptionHandlers = /* @__PURE__ */ new Map(), this.isCanceled = !1, this.inviteWithoutSdp = !1, this.logger = e.getLogger("sip.Inviter"), this.earlyMedia = r.earlyMedia !== void 0 ? r.earlyMedia : this.earlyMedia, this.fromTag = Ce(), this.inviteWithoutSdp = r.inviteWithoutSdp !== void 0 ? r.inviteWithoutSdp : this.inviteWithoutSdp;
    const s = Object.assign({}, r);
    s.params = Object.assign({}, r.params);
    const i = r.anonymous || !1, n = e.contact.toString({
      anonymous: i,
      // Do not add ;ob in initial forming dialog requests if the
      // registration over the current connection got a GRUU URI.
      outbound: i ? !e.contact.tempGruu : !e.contact.pubGruu
    });
    i && e.configuration.uri && (s.params.fromDisplayName = "Anonymous", s.params.fromUri = "sip:anonymous@anonymous.invalid");
    let o = e.userAgentCore.configuration.aor;
    if (s.params.fromUri && (o = typeof s.params.fromUri == "string" ? P.URIParse(s.params.fromUri) : s.params.fromUri), !o)
      throw new TypeError("Invalid from URI: " + s.params.fromUri);
    let d = t;
    if (s.params.toUri && (d = typeof s.params.toUri == "string" ? P.URIParse(s.params.toUri) : s.params.toUri), !d)
      throw new TypeError("Invalid to URI: " + s.params.toUri);
    const w = Object.assign({}, s.params);
    w.fromTag = this.fromTag;
    const f = (s.extraHeaders || []).slice();
    i && e.configuration.uri && (f.push("P-Preferred-Identity: " + e.configuration.uri.toString()), f.push("Privacy: id")), f.push("Contact: " + n), f.push("Allow: " + ["ACK", "CANCEL", "INVITE", "MESSAGE", "BYE", "OPTIONS", "INFO", "NOTIFY", "REFER"].toString()), e.configuration.sipExtension100rel === K.Required && f.push("Require: 100rel"), e.configuration.sipExtensionReplaces === K.Required && f.push("Require: replaces"), s.extraHeaders = f;
    const m = void 0;
    this.outgoingRequestMessage = e.userAgentCore.makeOutgoingRequestMessage(b.INVITE, t, o, d, w, f, m), this._contact = n, this._referralInviterOptions = s, this._renderbody = r.renderbody, this._rendertype = r.rendertype, r.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = r.sessionDescriptionHandlerModifiers), r.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = r.sessionDescriptionHandlerOptions), r.sessionDescriptionHandlerModifiersReInvite && (this.sessionDescriptionHandlerModifiersReInvite = r.sessionDescriptionHandlerModifiersReInvite), r.sessionDescriptionHandlerOptionsReInvite && (this.sessionDescriptionHandlerOptionsReInvite = r.sessionDescriptionHandlerOptionsReInvite), this._id = this.outgoingRequestMessage.callId + this.fromTag, this.userAgent._sessions[this._id] = this;
  }
  /**
   * Destructor.
   */
  dispose() {
    if (this.disposed)
      return Promise.resolve();
    switch (this.disposed = !0, this.disposeEarlyMedia(), this.state) {
      case p.Initial:
        return this.cancel().then(() => super.dispose());
      case p.Establishing:
        return this.cancel().then(() => super.dispose());
      case p.Established:
        return super.dispose();
      case p.Terminating:
        return super.dispose();
      case p.Terminated:
        return super.dispose();
      default:
        throw new Error("Unknown state.");
    }
  }
  /**
   * Initial outgoing INVITE request message body.
   */
  get body() {
    return this.outgoingRequestMessage.body;
  }
  /**
   * The identity of the local user.
   */
  get localIdentity() {
    return this.outgoingRequestMessage.from;
  }
  /**
   * The identity of the remote user.
   */
  get remoteIdentity() {
    return this.outgoingRequestMessage.to;
  }
  /**
   * Initial outgoing INVITE request message.
   */
  get request() {
    return this.outgoingRequestMessage;
  }
  /**
   * Cancels the INVITE request.
   *
   * @remarks
   * Sends a CANCEL request.
   * Resolves once the response sent, otherwise rejects.
   *
   * After sending a CANCEL request the expectation is that a 487 final response
   * will be received for the INVITE. However a 200 final response to the INVITE
   * may nonetheless arrive (it's a race between the CANCEL reaching the UAS before
   * the UAS sends a 200) in which case an ACK & BYE will be sent. The net effect
   * is that this method will terminate the session regardless of the race.
   * @param options - Options bucket.
   */
  cancel(e = {}) {
    if (this.logger.log("Inviter.cancel"), this.state !== p.Initial && this.state !== p.Establishing) {
      const r = new Error(`Invalid session state ${this.state}`);
      return this.logger.error(r.message), Promise.reject(r);
    }
    this.isCanceled = !0, this.stateTransition(p.Terminating);
    function t(r, s) {
      if (r && r < 200 || r > 699)
        throw new TypeError("Invalid statusCode: " + r);
      if (r) {
        const i = r, n = $e(r) || s;
        return "SIP;cause=" + i + ';text="' + n + '"';
      }
    }
    if (this.outgoingInviteRequest) {
      let r;
      e.statusCode && e.reasonPhrase && (r = t(e.statusCode, e.reasonPhrase)), this.outgoingInviteRequest.cancel(r, e);
    } else
      this.logger.warn("Canceled session before INVITE was sent"), this.stateTransition(p.Terminated);
    return Promise.resolve();
  }
  /**
   * Sends the INVITE request.
   *
   * @remarks
   * TLDR...
   *  1) Only one offer/answer exchange permitted during initial INVITE.
   *  2) No "early media" if the initial offer is in an INVITE (default behavior).
   *  3) If "early media" and the initial offer is in an INVITE, no INVITE forking.
   *
   * 1) Only one offer/answer exchange permitted during initial INVITE.
   *
   * Our implementation replaces the following bullet point...
   *
   * o  After having sent or received an answer to the first offer, the
   *    UAC MAY generate subsequent offers in requests based on rules
   *    specified for that method, but only if it has received answers
   *    to any previous offers, and has not sent any offers to which it
   *    hasn't gotten an answer.
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   *
   * ...with...
   *
   * o  After having sent or received an answer to the first offer, the
   *    UAC MUST NOT generate subsequent offers in requests based on rules
   *    specified for that method.
   *
   * ...which in combination with this bullet point...
   *
   * o  Once the UAS has sent or received an answer to the initial
   *    offer, it MUST NOT generate subsequent offers in any responses
   *    to the initial INVITE.  This means that a UAS based on this
   *    specification alone can never generate subsequent offers until
   *    completion of the initial transaction.
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   *
   * ...ensures that EXACTLY ONE offer/answer exchange will occur
   * during an initial out of dialog INVITE request made by our UAC.
   *
   *
   * 2) No "early media" if the initial offer is in an INVITE (default behavior).
   *
   * While our implementation adheres to the following bullet point...
   *
   * o  If the initial offer is in an INVITE, the answer MUST be in a
   *    reliable non-failure message from UAS back to UAC which is
   *    correlated to that INVITE.  For this specification, that is
   *    only the final 2xx response to that INVITE.  That same exact
   *    answer MAY also be placed in any provisional responses sent
   *    prior to the answer.  The UAC MUST treat the first session
   *    description it receives as the answer, and MUST ignore any
   *    session descriptions in subsequent responses to the initial
   *    INVITE.
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   *
   * We have made the following implementation decision with regard to early media...
   *
   * o  If the initial offer is in the INVITE, the answer from the
   *    UAS back to the UAC will establish a media session only
   *    only after the final 2xx response to that INVITE is received.
   *
   * The reason for this decision is rooted in a restriction currently
   * inherent in WebRTC. Specifically, while a SIP INVITE request with an
   * initial offer may fork resulting in more than one provisional answer,
   * there is currently no easy/good way to to "fork" an offer generated
   * by a peer connection. In particular, a WebRTC offer currently may only
   * be matched with one answer and we have no good way to know which
   * "provisional answer" is going to be the "final answer". So we have
   * decided to punt and not create any "early media" sessions in this case.
   *
   * The upshot is that if you want "early media", you must not put the
   * initial offer in the INVITE. Instead, force the UAS to provide the
   * initial offer by sending an INVITE without an offer. In the WebRTC
   * case this allows us to create a unique peer connection with a unique
   * answer for every provisional offer with "early media" on all of them.
   *
   *
   * 3) If "early media" and the initial offer is in an INVITE, no INVITE forking.
   *
   * The default behavior may be altered and "early media" utilized if the
   * initial offer is in the an INVITE by setting the `earlyMedia` options.
   * However in that case the INVITE request MUST NOT fork. This allows for
   * "early media" in environments where the forking behavior of the SIP
   * servers being utilized is configured to disallow forking.
   */
  invite(e = {}) {
    if (this.logger.log("Inviter.invite"), this.state !== p.Initial)
      return super.invite(e);
    if (e.sessionDescriptionHandlerModifiers && (this.sessionDescriptionHandlerModifiers = e.sessionDescriptionHandlerModifiers), e.sessionDescriptionHandlerOptions && (this.sessionDescriptionHandlerOptions = e.sessionDescriptionHandlerOptions), e.withoutSdp || this.inviteWithoutSdp)
      return this._renderbody && this._rendertype && (this.outgoingRequestMessage.body = { contentType: this._rendertype, body: this._renderbody }), this.stateTransition(p.Establishing), Promise.resolve(this.sendInvite(e));
    const t = {
      sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
      sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
    };
    return this.getOffer(t).then((r) => (this.outgoingRequestMessage.body = { body: r.content, contentType: r.contentType }, this.stateTransition(p.Establishing), this.sendInvite(e))).catch((r) => {
      throw this.logger.log(r.message), this.state !== p.Terminated && this.stateTransition(p.Terminated), r;
    });
  }
  /**
   * 13.2.1 Creating the Initial INVITE
   *
   * Since the initial INVITE represents a request outside of a dialog,
   * its construction follows the procedures of Section 8.1.1.  Additional
   * processing is required for the specific case of INVITE.
   *
   * An Allow header field (Section 20.5) SHOULD be present in the INVITE.
   * It indicates what methods can be invoked within a dialog, on the UA
   * sending the INVITE, for the duration of the dialog.  For example, a
   * UA capable of receiving INFO requests within a dialog [34] SHOULD
   * include an Allow header field listing the INFO method.
   *
   * A Supported header field (Section 20.37) SHOULD be present in the
   * INVITE.  It enumerates all the extensions understood by the UAC.
   *
   * An Accept (Section 20.1) header field MAY be present in the INVITE.
   * It indicates which Content-Types are acceptable to the UA, in both
   * the response received by it, and in any subsequent requests sent to
   * it within dialogs established by the INVITE.  The Accept header field
   * is especially useful for indicating support of various session
   * description formats.
   *
   * The UAC MAY add an Expires header field (Section 20.19) to limit the
   * validity of the invitation.  If the time indicated in the Expires
   * header field is reached and no final answer for the INVITE has been
   * received, the UAC core SHOULD generate a CANCEL request for the
   * INVITE, as per Section 9.
   *
   * A UAC MAY also find it useful to add, among others, Subject (Section
   * 20.36), Organization (Section 20.25) and User-Agent (Section 20.41)
   * header fields.  They all contain information related to the INVITE.
   *
   * The UAC MAY choose to add a message body to the INVITE.  Section
   * 8.1.1.10 deals with how to construct the header fields -- Content-
   * Type among others -- needed to describe the message body.
   *
   * https://tools.ietf.org/html/rfc3261#section-13.2.1
   */
  sendInvite(e = {}) {
    return this.outgoingInviteRequest = this.userAgent.userAgentCore.invite(this.outgoingRequestMessage, {
      onAccept: (t) => {
        if (this.dialog) {
          this.logger.log("Additional confirmed dialog, sending ACK and BYE"), this.ackAndBye(t);
          return;
        }
        if (this.isCanceled) {
          this.logger.log("Canceled session accepted, sending ACK and BYE"), this.ackAndBye(t), this.stateTransition(p.Terminated);
          return;
        }
        this.notifyReferer(t), this.onAccept(t).then(() => {
          this.disposeEarlyMedia();
        }).catch(() => {
          this.disposeEarlyMedia();
        }).then(() => {
          e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(t);
        });
      },
      onProgress: (t) => {
        this.isCanceled || (this.notifyReferer(t), this.onProgress(t).catch(() => {
          this.disposeEarlyMedia();
        }).then(() => {
          e.requestDelegate && e.requestDelegate.onProgress && e.requestDelegate.onProgress(t);
        }));
      },
      onRedirect: (t) => {
        this.notifyReferer(t), this.onRedirect(t), e.requestDelegate && e.requestDelegate.onRedirect && e.requestDelegate.onRedirect(t);
      },
      onReject: (t) => {
        this.notifyReferer(t), this.onReject(t), e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(t);
      },
      onTrying: (t) => {
        this.notifyReferer(t), this.onTrying(t), e.requestDelegate && e.requestDelegate.onTrying && e.requestDelegate.onTrying(t);
      }
    }), this.outgoingInviteRequest;
  }
  disposeEarlyMedia() {
    this.earlyMediaSessionDescriptionHandlers.forEach((e) => {
      e.close();
    }), this.earlyMediaSessionDescriptionHandlers.clear();
  }
  notifyReferer(e) {
    if (!this._referred)
      return;
    if (!(this._referred instanceof le))
      throw new Error("Referred session not instance of session");
    if (!this._referred.dialog)
      return;
    if (!e.message.statusCode)
      throw new Error("Status code undefined.");
    if (!e.message.reasonPhrase)
      throw new Error("Reason phrase undefined.");
    const t = e.message.statusCode, r = e.message.reasonPhrase, s = `SIP/2.0 ${t} ${r}`.trim(), i = this._referred.dialog.notify(void 0, {
      extraHeaders: ["Event: refer", "Subscription-State: terminated"],
      body: {
        contentDisposition: "render",
        contentType: "message/sipfrag",
        content: s
      }
    });
    i.delegate = {
      onReject: () => {
        this._referred = void 0;
      }
    };
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 2xx response.
   */
  onAccept(e) {
    if (this.logger.log("Inviter.onAccept"), this.state !== p.Establishing)
      return this.logger.error(`Accept received while in state ${this.state}, dropping response`), Promise.reject(new Error(`Invalid session state ${this.state}`));
    const t = e.message, r = e.session;
    switch (t.hasHeader("P-Asserted-Identity") && (this._assertedIdentity = P.nameAddrHeaderParse(t.getHeader("P-Asserted-Identity"))), r.delegate = {
      onAck: (s) => this.onAckRequest(s),
      onBye: (s) => this.onByeRequest(s),
      onInfo: (s) => this.onInfoRequest(s),
      onInvite: (s) => this.onInviteRequest(s),
      onMessage: (s) => this.onMessageRequest(s),
      onNotify: (s) => this.onNotifyRequest(s),
      onPrack: (s) => this.onPrackRequest(s),
      onRefer: (s) => this.onReferRequest(s)
    }, this._dialog = r, r.signalingState) {
      case T.Initial:
        return this.logger.error("Received 2xx response to INVITE without a session description"), this.ackAndBye(e, 400, "Missing session description"), this.stateTransition(p.Terminated), Promise.reject(new Error("Bad Media Description"));
      case T.HaveLocalOffer:
        return this.logger.error("Received 2xx response to INVITE without a session description"), this.ackAndBye(e, 400, "Missing session description"), this.stateTransition(p.Terminated), Promise.reject(new Error("Bad Media Description"));
      case T.HaveRemoteOffer: {
        if (!this._dialog.offer)
          throw new Error(`Session offer undefined in signaling state ${this._dialog.signalingState}.`);
        const s = {
          sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
          sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
        };
        return this.setOfferAndGetAnswer(this._dialog.offer, s).then((i) => {
          e.ack({ body: i }), this.stateTransition(p.Established);
        }).catch((i) => {
          throw this.ackAndBye(e, 488, "Invalid session description"), this.stateTransition(p.Terminated), i;
        });
      }
      case T.Stable: {
        if (this.earlyMediaSessionDescriptionHandlers.size > 0) {
          const n = this.earlyMediaSessionDescriptionHandlers.get(r.id);
          if (!n)
            throw new Error("Session description handler undefined.");
          return this.setSessionDescriptionHandler(n), this.earlyMediaSessionDescriptionHandlers.delete(r.id), e.ack(), this.stateTransition(p.Established), Promise.resolve();
        }
        if (this.earlyMediaDialog) {
          if (this.earlyMediaDialog !== r) {
            this.earlyMedia && this.logger.error("You have set the 'earlyMedia' option to 'true' which requires that your INVITE requests do not fork and yet this INVITE request did in fact fork. Consequentially and not surprisingly the end point which accepted the INVITE (confirmed dialog) does not match the end point with which early media has been setup (early dialog) and thus this session is unable to proceed. In accordance with the SIP specifications, the SIP servers your end point is connected to determine if an INVITE forks and the forking behavior of those servers cannot be controlled by this library. If you wish to use early media with this library you must configure those servers accordingly. Alternatively you may set the 'earlyMedia' to 'false' which will allow this library to function with any INVITE requests which do fork.");
            const n = new Error("Early media dialog does not equal confirmed dialog, terminating session");
            return this.logger.error(n.message), this.ackAndBye(e, 488, "Not Acceptable Here"), this.stateTransition(p.Terminated), Promise.reject(n);
          }
          return e.ack(), this.stateTransition(p.Established), Promise.resolve();
        }
        const s = r.answer;
        if (!s)
          throw new Error("Answer is undefined.");
        const i = {
          sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
          sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
        };
        return this.setAnswer(s, i).then(() => {
          let n;
          this._renderbody && this._rendertype && (n = {
            body: { contentDisposition: "render", contentType: this._rendertype, content: this._renderbody }
          }), e.ack(n), this.stateTransition(p.Established);
        }).catch((n) => {
          throw this.logger.error(n.message), this.ackAndBye(e, 488, "Not Acceptable Here"), this.stateTransition(p.Terminated), n;
        });
      }
      case T.Closed:
        return Promise.reject(new Error("Terminated."));
      default:
        throw new Error("Unknown session signaling state.");
    }
  }
  /**
   * Handle provisional response to initial INVITE.
   * @param inviteResponse - 1xx response.
   */
  onProgress(e) {
    var t;
    if (this.logger.log("Inviter.onProgress"), this.state !== p.Establishing)
      return this.logger.error(`Progress received while in state ${this.state}, dropping response`), Promise.reject(new Error(`Invalid session state ${this.state}`));
    if (!this.outgoingInviteRequest)
      throw new Error("Outgoing INVITE request undefined.");
    const r = e.message, s = e.session;
    r.hasHeader("P-Asserted-Identity") && (this._assertedIdentity = P.nameAddrHeaderParse(r.getHeader("P-Asserted-Identity")));
    const i = r.getHeader("require"), n = r.getHeader("rseq"), d = !!(i && i.includes("100rel") && n ? Number(n) : void 0), w = [];
    switch (d && w.push("RAck: " + r.getHeader("rseq") + " " + r.getHeader("cseq")), s.signalingState) {
      case T.Initial:
        return d && (this.logger.warn("First reliable provisional response received MUST contain an offer when INVITE does not contain an offer."), e.prack({ extraHeaders: w })), Promise.resolve();
      case T.HaveLocalOffer:
        return d && e.prack({ extraHeaders: w }), Promise.resolve();
      case T.HaveRemoteOffer:
        if (!d)
          return this.logger.warn("Non-reliable provisional response MUST NOT contain an initial offer, discarding response."), Promise.resolve();
        {
          const f = this.sessionDescriptionHandlerFactory(this, this.userAgent.configuration.sessionDescriptionHandlerFactoryOptions || {});
          return !((t = this.delegate) === null || t === void 0) && t.onSessionDescriptionHandler && this.delegate.onSessionDescriptionHandler(f, !0), this.earlyMediaSessionDescriptionHandlers.set(s.id, f), f.setDescription(r.body, this.sessionDescriptionHandlerOptions, this.sessionDescriptionHandlerModifiers).then(() => f.getDescription(this.sessionDescriptionHandlerOptions, this.sessionDescriptionHandlerModifiers)).then((m) => {
            const E = {
              contentDisposition: "session",
              contentType: m.contentType,
              content: m.body
            };
            e.prack({ extraHeaders: w, body: E });
          }).catch((m) => {
            throw this.stateTransition(p.Terminated), m;
          });
        }
      case T.Stable:
        if (d && e.prack({ extraHeaders: w }), this.earlyMedia && !this.earlyMediaDialog) {
          this.earlyMediaDialog = s;
          const f = s.answer;
          if (!f)
            throw new Error("Answer is undefined.");
          const m = {
            sessionDescriptionHandlerModifiers: this.sessionDescriptionHandlerModifiers,
            sessionDescriptionHandlerOptions: this.sessionDescriptionHandlerOptions
          };
          return this.setAnswer(f, m).catch((E) => {
            throw this.stateTransition(p.Terminated), E;
          });
        }
        return Promise.resolve();
      case T.Closed:
        return Promise.reject(new Error("Terminated."));
      default:
        throw new Error("Unknown session signaling state.");
    }
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 3xx response.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRedirect(e) {
    if (this.logger.log("Inviter.onRedirect"), this.state !== p.Establishing && this.state !== p.Terminating) {
      this.logger.error(`Redirect received while in state ${this.state}, dropping response`);
      return;
    }
    this.stateTransition(p.Terminated);
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 4xx, 5xx, or 6xx response.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onReject(e) {
    if (this.logger.log("Inviter.onReject"), this.state !== p.Establishing && this.state !== p.Terminating) {
      this.logger.error(`Reject received while in state ${this.state}, dropping response`);
      return;
    }
    this.stateTransition(p.Terminated);
  }
  /**
   * Handle final response to initial INVITE.
   * @param inviteResponse - 100 response.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTrying(e) {
    if (this.logger.log("Inviter.onTrying"), this.state !== p.Establishing) {
      this.logger.error(`Trying received while in state ${this.state}, dropping response`);
      return;
    }
  }
}
class xt {
  /**
   * Constructs a new instance of the `Messager` class.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @param targetURI - Request URI identifying the target of the message.
   * @param content - Content for the body of the message.
   * @param contentType - Content type of the body of the message.
   * @param options - Options bucket. See {@link MessagerOptions} for details.
   */
  constructor(e, t, r, s = "text/plain", i = {}) {
    this.logger = e.getLogger("sip.Messager"), i.params = i.params || {};
    let n = e.userAgentCore.configuration.aor;
    if (i.params.fromUri && (n = typeof i.params.fromUri == "string" ? P.URIParse(i.params.fromUri) : i.params.fromUri), !n)
      throw new TypeError("Invalid from URI: " + i.params.fromUri);
    let o = t;
    if (i.params.toUri && (o = typeof i.params.toUri == "string" ? P.URIParse(i.params.toUri) : i.params.toUri), !o)
      throw new TypeError("Invalid to URI: " + i.params.toUri);
    const d = i.params ? Object.assign({}, i.params) : {}, w = (i.extraHeaders || []).slice(), m = {
      contentDisposition: "render",
      contentType: s,
      content: r
    };
    this.request = e.userAgentCore.makeOutgoingRequestMessage(b.MESSAGE, t, n, o, d, w, m), this.userAgent = e;
  }
  /**
   * Send the message.
   */
  message(e = {}) {
    return this.userAgent.userAgentCore.request(this.request, e.requestDelegate), Promise.resolve();
  }
}
var $;
(function(a) {
  a.Initial = "Initial", a.Registered = "Registered", a.Unregistered = "Unregistered", a.Terminated = "Terminated";
})($ = $ || ($ = {}));
class Z {
  /**
   * Constructs a new instance of the `Registerer` class.
   * @param userAgent - User agent. See {@link UserAgent} for details.
   * @param options - Options bucket. See {@link RegistererOptions} for details.
   */
  constructor(e, t = {}) {
    this.disposed = !1, this._contacts = [], this._retryAfter = void 0, this._state = $.Initial, this._waiting = !1, this._stateEventEmitter = new ve(), this._waitingEventEmitter = new ve(), this.userAgent = e;
    const r = e.configuration.uri.clone();
    if (r.user = void 0, this.options = Object.assign(Object.assign(Object.assign({}, Z.defaultOptions()), { registrar: r }), Z.stripUndefinedProperties(t)), this.options.extraContactHeaderParams = (this.options.extraContactHeaderParams || []).slice(), this.options.extraHeaders = (this.options.extraHeaders || []).slice(), !this.options.registrar)
      throw new Error("Registrar undefined.");
    if (this.options.registrar = this.options.registrar.clone(), this.options.regId && !this.options.instanceId ? this.options.instanceId = this.userAgent.instanceId : !this.options.regId && this.options.instanceId && (this.options.regId = 1), this.options.instanceId && P.parse(this.options.instanceId, "uuid") === -1)
      throw new Error("Invalid instanceId.");
    if (this.options.regId && this.options.regId < 0)
      throw new Error("Invalid regId.");
    const s = this.options.registrar, i = this.options.params && this.options.params.fromUri || e.userAgentCore.configuration.aor, n = this.options.params && this.options.params.toUri || e.configuration.uri, o = this.options.params || {}, d = (t.extraHeaders || []).slice();
    if (this.request = e.userAgentCore.makeOutgoingRequestMessage(b.REGISTER, s, i, n, o, d, void 0), this.expires = this.options.expires || Z.defaultExpires, this.expires < 0)
      throw new Error("Invalid expires.");
    if (this.refreshFrequency = this.options.refreshFrequency || Z.defaultRefreshFrequency, this.refreshFrequency < 50 || this.refreshFrequency > 99)
      throw new Error("Invalid refresh frequency. The value represents a percentage of the expiration time and should be between 50 and 99.");
    this.logger = e.getLogger("sip.Registerer"), this.options.logConfiguration && (this.logger.log("Configuration:"), Object.keys(this.options).forEach((w) => {
      const f = this.options[w];
      switch (w) {
        case "registrar":
          this.logger.log("· " + w + ": " + f);
          break;
        default:
          this.logger.log("· " + w + ": " + JSON.stringify(f));
      }
    })), this.id = this.request.callId + this.request.from.parameters.tag, this.userAgent._registerers[this.id] = this;
  }
  /** Default registerer options. */
  static defaultOptions() {
    return {
      expires: Z.defaultExpires,
      extraContactHeaderParams: [],
      extraHeaders: [],
      logConfiguration: !0,
      instanceId: "",
      params: {},
      regId: 0,
      registrar: new J("sip", "anonymous", "anonymous.invalid"),
      refreshFrequency: Z.defaultRefreshFrequency
    };
  }
  /**
   * Strip properties with undefined values from options.
   * This is a work around while waiting for missing vs undefined to be addressed (or not)...
   * https://github.com/Microsoft/TypeScript/issues/13195
   * @param options - Options to reduce
   */
  static stripUndefinedProperties(e) {
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }
  /** The registered contacts. */
  get contacts() {
    return this._contacts.slice();
  }
  /**
   * The number of seconds to wait before retrying to register.
   * @defaultValue `undefined`
   * @remarks
   * When the server rejects a registration request, if it provides a suggested
   * duration to wait before retrying, that value is available here when and if
   * the state transitions to `Unsubscribed`. It is also available during the
   * callback to `onReject` after a call to `register`. (Note that if the state
   * if already `Unsubscribed`, a rejected request created by `register` will
   * not cause the state to transition to `Unsubscribed`. One way to avoid this
   * case is to dispose of `Registerer` when unregistered and create a new
   * `Registerer` for any attempts to retry registering.)
   * @example
   * ```ts
   * // Checking for retry after on state change
   * registerer.stateChange.addListener((newState) => {
   *   switch (newState) {
   *     case RegistererState.Unregistered:
   *       const retryAfter = registerer.retryAfter;
   *       break;
   *   }
   * });
   *
   * // Checking for retry after on request rejection
   * registerer.register({
   *   requestDelegate: {
   *     onReject: () => {
   *       const retryAfter = registerer.retryAfter;
   *     }
   *   }
   * });
   * ```
   */
  get retryAfter() {
    return this._retryAfter;
  }
  /** The registration state. */
  get state() {
    return this._state;
  }
  /** Emits when the registerer state changes. */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /** Destructor. */
  dispose() {
    return this.disposed ? Promise.resolve() : (this.disposed = !0, this.logger.log(`Registerer ${this.id} in state ${this.state} is being disposed`), delete this.userAgent._registerers[this.id], new Promise((e) => {
      const t = () => {
        if (!this.waiting && this._state === $.Registered) {
          this.stateChange.addListener(() => {
            this.terminated(), e();
          }, { once: !0 }), this.unregister();
          return;
        }
        this.terminated(), e();
      };
      this.waiting ? this.waitingChange.addListener(() => {
        t();
      }, { once: !0 }) : t();
    }));
  }
  /**
   * Sends the REGISTER request.
   * @remarks
   * If successful, sends re-REGISTER requests prior to registration expiration until `unsubscribe()` is called.
   * Rejects with `RequestPendingError` if a REGISTER request is already in progress.
   */
  register(e = {}) {
    if (this.state === $.Terminated)
      throw this.stateError(), new Error("Registerer terminated. Unable to register.");
    if (this.disposed)
      throw this.stateError(), new Error("Registerer disposed. Unable to register.");
    if (this.waiting) {
      this.waitingWarning();
      const s = new we("REGISTER request already in progress, waiting for final response");
      return Promise.reject(s);
    }
    e.requestOptions && (this.options = Object.assign(Object.assign({}, this.options), e.requestOptions));
    const t = (this.options.extraHeaders || []).slice();
    t.push("Contact: " + this.generateContactHeader(this.expires)), t.push("Allow: " + ["ACK", "CANCEL", "INVITE", "MESSAGE", "BYE", "OPTIONS", "INFO", "NOTIFY", "REFER"].toString()), this.request.cseq++, this.request.setHeader("cseq", this.request.cseq + " REGISTER"), this.request.extraHeaders = t, this.waitingToggle(!0);
    const r = this.userAgent.userAgentCore.register(this.request, {
      onAccept: (s) => {
        let i;
        s.message.hasHeader("expires") && (i = Number(s.message.getHeader("expires"))), this._contacts = s.message.getHeaders("contact");
        let n = this._contacts.length;
        if (!n) {
          this.logger.error("No Contact header in response to REGISTER, dropping response."), this.unregistered();
          return;
        }
        let o;
        for (; n--; ) {
          if (o = s.message.parseHeader("contact", n), !o)
            throw new Error("Contact undefined");
          if (this.userAgent.contact.pubGruu && je(o.uri, this.userAgent.contact.pubGruu)) {
            i = Number(o.getParam("expires"));
            break;
          }
          if (this.userAgent.configuration.contactName === "") {
            if (o.uri.user === this.userAgent.contact.uri.user) {
              i = Number(o.getParam("expires"));
              break;
            }
          } else if (je(o.uri, this.userAgent.contact.uri)) {
            i = Number(o.getParam("expires"));
            break;
          }
          o = void 0;
        }
        if (o === void 0) {
          this.logger.error("No Contact header pointing to us, dropping response"), this.unregistered(), this.waitingToggle(!1);
          return;
        }
        if (i === void 0) {
          this.logger.error("Contact pointing to us is missing expires parameter, dropping response"), this.unregistered(), this.waitingToggle(!1);
          return;
        }
        if (o.hasParam("temp-gruu")) {
          const d = o.getParam("temp-gruu");
          d && (this.userAgent.contact.tempGruu = P.URIParse(d.replace(/"/g, "")));
        }
        if (o.hasParam("pub-gruu")) {
          const d = o.getParam("pub-gruu");
          d && (this.userAgent.contact.pubGruu = P.URIParse(d.replace(/"/g, "")));
        }
        this.registered(i), e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(s), this.waitingToggle(!1);
      },
      onProgress: (s) => {
        e.requestDelegate && e.requestDelegate.onProgress && e.requestDelegate.onProgress(s);
      },
      onRedirect: (s) => {
        this.logger.error("Redirect received. Not supported."), this.unregistered(), e.requestDelegate && e.requestDelegate.onRedirect && e.requestDelegate.onRedirect(s), this.waitingToggle(!1);
      },
      onReject: (s) => {
        if (s.message.statusCode === 423) {
          if (!s.message.hasHeader("min-expires")) {
            this.logger.error("423 response received for REGISTER without Min-Expires, dropping response"), this.unregistered(), this.waitingToggle(!1);
            return;
          }
          this.expires = Number(s.message.getHeader("min-expires")), this.waitingToggle(!1), this.register();
          return;
        }
        this.logger.warn(`Failed to register, status code ${s.message.statusCode}`);
        let i = NaN;
        if (s.message.statusCode === 500 || s.message.statusCode === 503) {
          const n = s.message.getHeader("retry-after");
          n && (i = Number.parseInt(n, void 0));
        }
        this._retryAfter = isNaN(i) ? void 0 : i, this.unregistered(), e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(s), this._retryAfter = void 0, this.waitingToggle(!1);
      },
      onTrying: (s) => {
        e.requestDelegate && e.requestDelegate.onTrying && e.requestDelegate.onTrying(s);
      }
    });
    return Promise.resolve(r);
  }
  /**
   * Sends the REGISTER request with expires equal to zero.
   * @remarks
   * Rejects with `RequestPendingError` if a REGISTER request is already in progress.
   */
  unregister(e = {}) {
    if (this.state === $.Terminated)
      throw this.stateError(), new Error("Registerer terminated. Unable to register.");
    if (this.disposed && this.state !== $.Registered)
      throw this.stateError(), new Error("Registerer disposed. Unable to register.");
    if (this.waiting) {
      this.waitingWarning();
      const s = new we("REGISTER request already in progress, waiting for final response");
      return Promise.reject(s);
    }
    this._state !== $.Registered && !e.all && this.logger.warn("Not currently registered, but sending an unregister anyway.");
    const t = (e.requestOptions && e.requestOptions.extraHeaders || []).slice();
    this.request.extraHeaders = t, e.all ? (t.push("Contact: *"), t.push("Expires: 0")) : t.push("Contact: " + this.generateContactHeader(0)), this.request.cseq++, this.request.setHeader("cseq", this.request.cseq + " REGISTER"), this.registrationTimer !== void 0 && (clearTimeout(this.registrationTimer), this.registrationTimer = void 0), this.waitingToggle(!0);
    const r = this.userAgent.userAgentCore.register(this.request, {
      onAccept: (s) => {
        this._contacts = s.message.getHeaders("contact"), this.unregistered(), e.requestDelegate && e.requestDelegate.onAccept && e.requestDelegate.onAccept(s), this.waitingToggle(!1);
      },
      onProgress: (s) => {
        e.requestDelegate && e.requestDelegate.onProgress && e.requestDelegate.onProgress(s);
      },
      onRedirect: (s) => {
        this.logger.error("Unregister redirected. Not currently supported."), this.unregistered(), e.requestDelegate && e.requestDelegate.onRedirect && e.requestDelegate.onRedirect(s), this.waitingToggle(!1);
      },
      onReject: (s) => {
        this.logger.error(`Unregister rejected with status code ${s.message.statusCode}`), this.unregistered(), e.requestDelegate && e.requestDelegate.onReject && e.requestDelegate.onReject(s), this.waitingToggle(!1);
      },
      onTrying: (s) => {
        e.requestDelegate && e.requestDelegate.onTrying && e.requestDelegate.onTrying(s);
      }
    });
    return Promise.resolve(r);
  }
  /**
   * Clear registration timers.
   */
  clearTimers() {
    this.registrationTimer !== void 0 && (clearTimeout(this.registrationTimer), this.registrationTimer = void 0), this.registrationExpiredTimer !== void 0 && (clearTimeout(this.registrationExpiredTimer), this.registrationExpiredTimer = void 0);
  }
  /**
   * Generate Contact Header
   */
  generateContactHeader(e) {
    let t = this.userAgent.contact.toString({ register: !0 });
    return this.options.regId && this.options.instanceId && (t += ";reg-id=" + this.options.regId, t += ';+sip.instance="<urn:uuid:' + this.options.instanceId + '>"'), this.options.extraContactHeaderParams && this.options.extraContactHeaderParams.forEach((r) => {
      t += ";" + r;
    }), t += ";expires=" + e, t;
  }
  /**
   * Helper function, called when registered.
   */
  registered(e) {
    this.clearTimers(), this.registrationTimer = setTimeout(() => {
      this.registrationTimer = void 0, this.register();
    }, this.refreshFrequency / 100 * e * 1e3), this.registrationExpiredTimer = setTimeout(() => {
      this.logger.warn("Registration expired"), this.unregistered();
    }, e * 1e3), this._state !== $.Registered && this.stateTransition($.Registered);
  }
  /**
   * Helper function, called when unregistered.
   */
  unregistered() {
    this.clearTimers(), this._state !== $.Unregistered && this.stateTransition($.Unregistered);
  }
  /**
   * Helper function, called when terminated.
   */
  terminated() {
    this.clearTimers(), this._state !== $.Terminated && this.stateTransition($.Terminated);
  }
  /**
   * Transition registration state.
   */
  stateTransition(e) {
    const t = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    switch (this._state) {
      case $.Initial:
        e !== $.Registered && e !== $.Unregistered && e !== $.Terminated && t();
        break;
      case $.Registered:
        e !== $.Unregistered && e !== $.Terminated && t();
        break;
      case $.Unregistered:
        e !== $.Registered && e !== $.Terminated && t();
        break;
      case $.Terminated:
        t();
        break;
      default:
        throw new Error("Unrecognized state.");
    }
    this._state = e, this.logger.log(`Registration transitioned to state ${this._state}`), this._stateEventEmitter.emit(this._state), e === $.Terminated && this.dispose();
  }
  /** True if the registerer is currently waiting for final response to a REGISTER request. */
  get waiting() {
    return this._waiting;
  }
  /** Emits when the registerer waiting state changes. */
  get waitingChange() {
    return this._waitingEventEmitter;
  }
  /**
   * Toggle waiting.
   */
  waitingToggle(e) {
    if (this._waiting === e)
      throw new Error(`Invalid waiting transition from ${this._waiting} to ${e}`);
    this._waiting = e, this.logger.log(`Waiting toggled to ${this._waiting}`), this._waitingEventEmitter.emit(this._waiting);
  }
  /** Hopefully helpful as the standard behavior has been found to be unexpected. */
  waitingWarning() {
    let e = "An attempt was made to send a REGISTER request while a prior one was still in progress.";
    e += " RFC 3261 requires UAs MUST NOT send a new registration until they have received a final response", e += " from the registrar for the previous one or the previous REGISTER request has timed out.", e += " Note that if the transport disconnects, you still must wait for the prior request to time out before", e += " sending a new REGISTER request or alternatively dispose of the current Registerer and create a new Registerer.", this.logger.warn(e);
  }
  /** Hopefully helpful as the standard behavior has been found to be unexpected. */
  stateError() {
    let t = `An attempt was made to send a REGISTER request when the Registerer ${this.state === $.Terminated ? "is in 'Terminated' state" : "has been disposed"}.`;
    t += " The Registerer transitions to 'Terminated' when Registerer.dispose() is called.", t += " Perhaps you called UserAgent.stop() which dipsoses of all Registerers?", this.logger.error(t);
  }
}
Z.defaultExpires = 600;
Z.defaultRefreshFrequency = 99;
var C;
(function(a) {
  a.Initial = "Initial", a.NotifyWait = "NotifyWait", a.Pending = "Pending", a.Active = "Active", a.Terminated = "Terminated";
})(C = C || (C = {}));
var x;
(function(a) {
  a.Connecting = "Connecting", a.Connected = "Connected", a.Disconnecting = "Disconnecting", a.Disconnected = "Disconnected";
})(x = x || (x = {}));
var H;
(function(a) {
  a.Started = "Started", a.Stopped = "Stopped";
})(H = H || (H = {}));
class _ {
  constructor() {
    this._dataLength = 0, this._bufferLength = 0, this._state = new Int32Array(4), this._buffer = new ArrayBuffer(68), this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
  }
  static hashStr(e, t = !1) {
    return this.onePassHasher.start().appendStr(e).end(t);
  }
  static hashAsciiStr(e, t = !1) {
    return this.onePassHasher.start().appendAsciiStr(e).end(t);
  }
  static _hex(e) {
    const t = _.hexChars, r = _.hexOut;
    let s, i, n, o;
    for (o = 0; o < 4; o += 1)
      for (i = o * 8, s = e[o], n = 0; n < 8; n += 2)
        r[i + 1 + n] = t.charAt(s & 15), s >>>= 4, r[i + 0 + n] = t.charAt(s & 15), s >>>= 4;
    return r.join("");
  }
  static _md5cycle(e, t) {
    let r = e[0], s = e[1], i = e[2], n = e[3];
    r += (s & i | ~s & n) + t[0] - 680876936 | 0, r = (r << 7 | r >>> 25) + s | 0, n += (r & s | ~r & i) + t[1] - 389564586 | 0, n = (n << 12 | n >>> 20) + r | 0, i += (n & r | ~n & s) + t[2] + 606105819 | 0, i = (i << 17 | i >>> 15) + n | 0, s += (i & n | ~i & r) + t[3] - 1044525330 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & i | ~s & n) + t[4] - 176418897 | 0, r = (r << 7 | r >>> 25) + s | 0, n += (r & s | ~r & i) + t[5] + 1200080426 | 0, n = (n << 12 | n >>> 20) + r | 0, i += (n & r | ~n & s) + t[6] - 1473231341 | 0, i = (i << 17 | i >>> 15) + n | 0, s += (i & n | ~i & r) + t[7] - 45705983 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & i | ~s & n) + t[8] + 1770035416 | 0, r = (r << 7 | r >>> 25) + s | 0, n += (r & s | ~r & i) + t[9] - 1958414417 | 0, n = (n << 12 | n >>> 20) + r | 0, i += (n & r | ~n & s) + t[10] - 42063 | 0, i = (i << 17 | i >>> 15) + n | 0, s += (i & n | ~i & r) + t[11] - 1990404162 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & i | ~s & n) + t[12] + 1804603682 | 0, r = (r << 7 | r >>> 25) + s | 0, n += (r & s | ~r & i) + t[13] - 40341101 | 0, n = (n << 12 | n >>> 20) + r | 0, i += (n & r | ~n & s) + t[14] - 1502002290 | 0, i = (i << 17 | i >>> 15) + n | 0, s += (i & n | ~i & r) + t[15] + 1236535329 | 0, s = (s << 22 | s >>> 10) + i | 0, r += (s & n | i & ~n) + t[1] - 165796510 | 0, r = (r << 5 | r >>> 27) + s | 0, n += (r & i | s & ~i) + t[6] - 1069501632 | 0, n = (n << 9 | n >>> 23) + r | 0, i += (n & s | r & ~s) + t[11] + 643717713 | 0, i = (i << 14 | i >>> 18) + n | 0, s += (i & r | n & ~r) + t[0] - 373897302 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s & n | i & ~n) + t[5] - 701558691 | 0, r = (r << 5 | r >>> 27) + s | 0, n += (r & i | s & ~i) + t[10] + 38016083 | 0, n = (n << 9 | n >>> 23) + r | 0, i += (n & s | r & ~s) + t[15] - 660478335 | 0, i = (i << 14 | i >>> 18) + n | 0, s += (i & r | n & ~r) + t[4] - 405537848 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s & n | i & ~n) + t[9] + 568446438 | 0, r = (r << 5 | r >>> 27) + s | 0, n += (r & i | s & ~i) + t[14] - 1019803690 | 0, n = (n << 9 | n >>> 23) + r | 0, i += (n & s | r & ~s) + t[3] - 187363961 | 0, i = (i << 14 | i >>> 18) + n | 0, s += (i & r | n & ~r) + t[8] + 1163531501 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s & n | i & ~n) + t[13] - 1444681467 | 0, r = (r << 5 | r >>> 27) + s | 0, n += (r & i | s & ~i) + t[2] - 51403784 | 0, n = (n << 9 | n >>> 23) + r | 0, i += (n & s | r & ~s) + t[7] + 1735328473 | 0, i = (i << 14 | i >>> 18) + n | 0, s += (i & r | n & ~r) + t[12] - 1926607734 | 0, s = (s << 20 | s >>> 12) + i | 0, r += (s ^ i ^ n) + t[5] - 378558 | 0, r = (r << 4 | r >>> 28) + s | 0, n += (r ^ s ^ i) + t[8] - 2022574463 | 0, n = (n << 11 | n >>> 21) + r | 0, i += (n ^ r ^ s) + t[11] + 1839030562 | 0, i = (i << 16 | i >>> 16) + n | 0, s += (i ^ n ^ r) + t[14] - 35309556 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (s ^ i ^ n) + t[1] - 1530992060 | 0, r = (r << 4 | r >>> 28) + s | 0, n += (r ^ s ^ i) + t[4] + 1272893353 | 0, n = (n << 11 | n >>> 21) + r | 0, i += (n ^ r ^ s) + t[7] - 155497632 | 0, i = (i << 16 | i >>> 16) + n | 0, s += (i ^ n ^ r) + t[10] - 1094730640 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (s ^ i ^ n) + t[13] + 681279174 | 0, r = (r << 4 | r >>> 28) + s | 0, n += (r ^ s ^ i) + t[0] - 358537222 | 0, n = (n << 11 | n >>> 21) + r | 0, i += (n ^ r ^ s) + t[3] - 722521979 | 0, i = (i << 16 | i >>> 16) + n | 0, s += (i ^ n ^ r) + t[6] + 76029189 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (s ^ i ^ n) + t[9] - 640364487 | 0, r = (r << 4 | r >>> 28) + s | 0, n += (r ^ s ^ i) + t[12] - 421815835 | 0, n = (n << 11 | n >>> 21) + r | 0, i += (n ^ r ^ s) + t[15] + 530742520 | 0, i = (i << 16 | i >>> 16) + n | 0, s += (i ^ n ^ r) + t[2] - 995338651 | 0, s = (s << 23 | s >>> 9) + i | 0, r += (i ^ (s | ~n)) + t[0] - 198630844 | 0, r = (r << 6 | r >>> 26) + s | 0, n += (s ^ (r | ~i)) + t[7] + 1126891415 | 0, n = (n << 10 | n >>> 22) + r | 0, i += (r ^ (n | ~s)) + t[14] - 1416354905 | 0, i = (i << 15 | i >>> 17) + n | 0, s += (n ^ (i | ~r)) + t[5] - 57434055 | 0, s = (s << 21 | s >>> 11) + i | 0, r += (i ^ (s | ~n)) + t[12] + 1700485571 | 0, r = (r << 6 | r >>> 26) + s | 0, n += (s ^ (r | ~i)) + t[3] - 1894986606 | 0, n = (n << 10 | n >>> 22) + r | 0, i += (r ^ (n | ~s)) + t[10] - 1051523 | 0, i = (i << 15 | i >>> 17) + n | 0, s += (n ^ (i | ~r)) + t[1] - 2054922799 | 0, s = (s << 21 | s >>> 11) + i | 0, r += (i ^ (s | ~n)) + t[8] + 1873313359 | 0, r = (r << 6 | r >>> 26) + s | 0, n += (s ^ (r | ~i)) + t[15] - 30611744 | 0, n = (n << 10 | n >>> 22) + r | 0, i += (r ^ (n | ~s)) + t[6] - 1560198380 | 0, i = (i << 15 | i >>> 17) + n | 0, s += (n ^ (i | ~r)) + t[13] + 1309151649 | 0, s = (s << 21 | s >>> 11) + i | 0, r += (i ^ (s | ~n)) + t[4] - 145523070 | 0, r = (r << 6 | r >>> 26) + s | 0, n += (s ^ (r | ~i)) + t[11] - 1120210379 | 0, n = (n << 10 | n >>> 22) + r | 0, i += (r ^ (n | ~s)) + t[2] + 718787259 | 0, i = (i << 15 | i >>> 17) + n | 0, s += (n ^ (i | ~r)) + t[9] - 343485551 | 0, s = (s << 21 | s >>> 11) + i | 0, e[0] = r + e[0] | 0, e[1] = s + e[1] | 0, e[2] = i + e[2] | 0, e[3] = n + e[3] | 0;
  }
  start() {
    return this._dataLength = 0, this._bufferLength = 0, this._state.set(_.stateIdentity), this;
  }
  // Char to code point to to array conversion:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
  // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
  appendStr(e) {
    const t = this._buffer8, r = this._buffer32;
    let s = this._bufferLength, i, n;
    for (n = 0; n < e.length; n += 1) {
      if (i = e.charCodeAt(n), i < 128)
        t[s++] = i;
      else if (i < 2048)
        t[s++] = (i >>> 6) + 192, t[s++] = i & 63 | 128;
      else if (i < 55296 || i > 56319)
        t[s++] = (i >>> 12) + 224, t[s++] = i >>> 6 & 63 | 128, t[s++] = i & 63 | 128;
      else {
        if (i = (i - 55296) * 1024 + (e.charCodeAt(++n) - 56320) + 65536, i > 1114111)
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        t[s++] = (i >>> 18) + 240, t[s++] = i >>> 12 & 63 | 128, t[s++] = i >>> 6 & 63 | 128, t[s++] = i & 63 | 128;
      }
      s >= 64 && (this._dataLength += 64, _._md5cycle(this._state, r), s -= 64, r[0] = r[16]);
    }
    return this._bufferLength = s, this;
  }
  appendAsciiStr(e) {
    const t = this._buffer8, r = this._buffer32;
    let s = this._bufferLength, i, n = 0;
    for (; ; ) {
      for (i = Math.min(e.length - n, 64 - s); i--; )
        t[s++] = e.charCodeAt(n++);
      if (s < 64)
        break;
      this._dataLength += 64, _._md5cycle(this._state, r), s = 0;
    }
    return this._bufferLength = s, this;
  }
  appendByteArray(e) {
    const t = this._buffer8, r = this._buffer32;
    let s = this._bufferLength, i, n = 0;
    for (; ; ) {
      for (i = Math.min(e.length - n, 64 - s); i--; )
        t[s++] = e[n++];
      if (s < 64)
        break;
      this._dataLength += 64, _._md5cycle(this._state, r), s = 0;
    }
    return this._bufferLength = s, this;
  }
  getState() {
    const e = this, t = e._state;
    return {
      buffer: String.fromCharCode.apply(null, e._buffer8),
      buflen: e._bufferLength,
      length: e._dataLength,
      state: [t[0], t[1], t[2], t[3]]
    };
  }
  setState(e) {
    const t = e.buffer, r = e.state, s = this._state;
    let i;
    for (this._dataLength = e.length, this._bufferLength = e.buflen, s[0] = r[0], s[1] = r[1], s[2] = r[2], s[3] = r[3], i = 0; i < t.length; i += 1)
      this._buffer8[i] = t.charCodeAt(i);
  }
  end(e = !1) {
    const t = this._bufferLength, r = this._buffer8, s = this._buffer32, i = (t >> 2) + 1;
    let n;
    if (this._dataLength += t, r[t] = 128, r[t + 1] = r[t + 2] = r[t + 3] = 0, s.set(_.buffer32Identity.subarray(i), i), t > 55 && (_._md5cycle(this._state, s), s.set(_.buffer32Identity)), n = this._dataLength * 8, n <= 4294967295)
      s[14] = n;
    else {
      const o = n.toString(16).match(/(.*?)(.{0,8})$/);
      if (o === null)
        return;
      const d = parseInt(o[2], 16), w = parseInt(o[1], 16) || 0;
      s[14] = d, s[15] = w;
    }
    return _._md5cycle(this._state, s), e ? this._state : _._hex(this._state);
  }
}
_.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
_.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
_.hexChars = "0123456789abcdef";
_.hexOut = [];
_.onePassHasher = new _();
_.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592" && console.error("Md5 self test failed.");
function te(a) {
  return _.hashStr(a);
}
class Rt {
  /**
   * Constructor.
   * @param loggerFactory - LoggerFactory.
   * @param username - Username.
   * @param password - Password.
   */
  constructor(e, t, r, s) {
    this.logger = e.getLogger("sipjs.digestauthentication"), this.username = r, this.password = s, this.ha1 = t, this.nc = 0, this.ncHex = "00000000";
  }
  /**
   * Performs Digest authentication given a SIP request and the challenge
   * received in a response to that request.
   * @param request -
   * @param challenge -
   * @returns true if credentials were successfully generated, false otherwise.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate(e, t, r) {
    if (this.algorithm = t.algorithm, this.realm = t.realm, this.nonce = t.nonce, this.opaque = t.opaque, this.stale = t.stale, this.algorithm) {
      if (this.algorithm !== "MD5")
        return this.logger.warn("challenge with Digest algorithm different than 'MD5', authentication aborted"), !1;
    } else
      this.algorithm = "MD5";
    if (!this.realm)
      return this.logger.warn("challenge without Digest realm, authentication aborted"), !1;
    if (!this.nonce)
      return this.logger.warn("challenge without Digest nonce, authentication aborted"), !1;
    if (t.qop)
      if (t.qop.indexOf("auth") > -1)
        this.qop = "auth";
      else if (t.qop.indexOf("auth-int") > -1)
        this.qop = "auth-int";
      else
        return this.logger.warn("challenge without Digest qop different than 'auth' or 'auth-int', authentication aborted"), !1;
    else
      this.qop = void 0;
    return this.method = e.method, this.uri = e.ruri, this.cnonce = ae(12), this.nc += 1, this.updateNcHex(), this.nc === 4294967296 && (this.nc = 1, this.ncHex = "00000001"), this.calculateResponse(r), !0;
  }
  /**
   * Return the Proxy-Authorization or WWW-Authorization header value.
   */
  toString() {
    const e = [];
    if (!this.response)
      throw new Error("response field does not exist, cannot generate Authorization header");
    return e.push("algorithm=" + this.algorithm), e.push('username="' + this.username + '"'), e.push('realm="' + this.realm + '"'), e.push('nonce="' + this.nonce + '"'), e.push('uri="' + this.uri + '"'), e.push('response="' + this.response + '"'), this.opaque && e.push('opaque="' + this.opaque + '"'), this.qop && (e.push("qop=" + this.qop), e.push('cnonce="' + this.cnonce + '"'), e.push("nc=" + this.ncHex)), "Digest " + e.join(", ");
  }
  /**
   * Generate the 'nc' value as required by Digest in this.ncHex by reading this.nc.
   */
  updateNcHex() {
    const e = Number(this.nc).toString(16);
    this.ncHex = "00000000".substr(0, 8 - e.length) + e;
  }
  /**
   * Generate Digest 'response' value.
   */
  calculateResponse(e) {
    let t, r;
    t = this.ha1, (t === "" || t === void 0) && (t = te(this.username + ":" + this.realm + ":" + this.password)), this.qop === "auth" ? (r = te(this.method + ":" + this.uri), this.response = te(t + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth:" + r)) : this.qop === "auth-int" ? (r = te(this.method + ":" + this.uri + ":" + te(e || "")), this.response = te(t + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth-int:" + r)) : this.qop === void 0 && (r = te(this.method + ":" + this.uri), this.response = te(t + ":" + this.nonce + ":" + r));
  }
}
var k;
(function(a) {
  a[a.error = 0] = "error", a[a.warn = 1] = "warn", a[a.log = 2] = "log", a[a.debug = 3] = "debug";
})(k = k || (k = {}));
class Be {
  constructor(e, t, r) {
    this.logger = e, this.category = t, this.label = r;
  }
  error(e) {
    this.genericLog(k.error, e);
  }
  warn(e) {
    this.genericLog(k.warn, e);
  }
  log(e) {
    this.genericLog(k.log, e);
  }
  debug(e) {
    this.genericLog(k.debug, e);
  }
  genericLog(e, t) {
    this.logger.genericLog(e, this.category, this.label, t);
  }
  get level() {
    return this.logger.level;
  }
  set level(e) {
    this.logger.level = e;
  }
}
class yt {
  constructor() {
    this.builtinEnabled = !0, this._level = k.log, this.loggers = {}, this.logger = this.getLogger("sip:loggerfactory");
  }
  get level() {
    return this._level;
  }
  set level(e) {
    e >= 0 && e <= 3 ? this._level = e : e > 3 ? this._level = 3 : k.hasOwnProperty(e) ? this._level = e : this.logger.error("invalid 'level' parameter value: " + JSON.stringify(e));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get connector() {
    return this._connector;
  }
  set connector(e) {
    e ? typeof e == "function" ? this._connector = e : this.logger.error("invalid 'connector' parameter value: " + JSON.stringify(e)) : this._connector = void 0;
  }
  getLogger(e, t) {
    if (t && this.level === 3)
      return new Be(this, e, t);
    if (this.loggers[e])
      return this.loggers[e];
    {
      const r = new Be(this, e);
      return this.loggers[e] = r, r;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genericLog(e, t, r, s) {
    this.level >= e && this.builtinEnabled && this.print(e, t, r, s), this.connector && this.connector(k[e], t, r, s);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  print(e, t, r, s) {
    if (typeof s == "string") {
      const i = [/* @__PURE__ */ new Date(), t];
      r && i.push(r), s = i.concat(s).join(" | ");
    }
    switch (e) {
      case k.error:
        console.error(s);
        break;
      case k.warn:
        console.warn(s);
        break;
      case k.log:
        console.log(s);
        break;
      case k.debug:
        console.debug(s);
        break;
    }
  }
}
var xe;
(function(a) {
  function e(s, i) {
    let n = i, o = 0, d = 0;
    if (s.substring(n, n + 2).match(/(^\r\n)/))
      return -2;
    for (; o === 0; ) {
      if (d = s.indexOf(`\r
`, n), d === -1)
        return d;
      !s.substring(d + 2, d + 4).match(/(^\r\n)/) && s.charAt(d + 2).match(/(^\s+)/) ? n = d + 2 : o = d;
    }
    return o;
  }
  a.getHeader = e;
  function t(s, i, n, o) {
    const d = i.indexOf(":", n), w = i.substring(n, d).trim(), f = i.substring(d + 1, o).trim();
    let m;
    switch (w.toLowerCase()) {
      case "via":
      case "v":
        s.addHeader("via", f), s.getHeaders("via").length === 1 ? (m = s.parseHeader("Via"), m && (s.via = m, s.viaBranch = m.branch)) : m = 0;
        break;
      case "from":
      case "f":
        s.setHeader("from", f), m = s.parseHeader("from"), m && (s.from = m, s.fromTag = m.getParam("tag"));
        break;
      case "to":
      case "t":
        s.setHeader("to", f), m = s.parseHeader("to"), m && (s.to = m, s.toTag = m.getParam("tag"));
        break;
      case "record-route":
        if (m = P.parse(f, "Record_Route"), m === -1) {
          m = void 0;
          break;
        }
        if (!(m instanceof Array)) {
          m = void 0;
          break;
        }
        m.forEach((E) => {
          s.addHeader("record-route", f.substring(E.position, E.offset)), s.headers["Record-Route"][s.getHeaders("record-route").length - 1].parsed = E.parsed;
        });
        break;
      case "call-id":
      case "i":
        s.setHeader("call-id", f), m = s.parseHeader("call-id"), m && (s.callId = f);
        break;
      case "contact":
      case "m":
        if (m = P.parse(f, "Contact"), m === -1) {
          m = void 0;
          break;
        }
        if (!(m instanceof Array)) {
          m = void 0;
          break;
        }
        m.forEach((E) => {
          s.addHeader("contact", f.substring(E.position, E.offset)), s.headers.Contact[s.getHeaders("contact").length - 1].parsed = E.parsed;
        });
        break;
      case "content-length":
      case "l":
        s.setHeader("content-length", f), m = s.parseHeader("content-length");
        break;
      case "content-type":
      case "c":
        s.setHeader("content-type", f), m = s.parseHeader("content-type");
        break;
      case "cseq":
        s.setHeader("cseq", f), m = s.parseHeader("cseq"), m && (s.cseq = m.value), s instanceof ne && (s.method = m.method);
        break;
      case "max-forwards":
        s.setHeader("max-forwards", f), m = s.parseHeader("max-forwards");
        break;
      case "www-authenticate":
        s.setHeader("www-authenticate", f), m = s.parseHeader("www-authenticate");
        break;
      case "proxy-authenticate":
        s.setHeader("proxy-authenticate", f), m = s.parseHeader("proxy-authenticate");
        break;
      case "refer-to":
      case "r":
        s.setHeader("refer-to", f), m = s.parseHeader("refer-to"), m && (s.referTo = m);
        break;
      default:
        s.addHeader(w.toLowerCase(), f), m = 0;
    }
    return m === void 0 ? {
      error: "error parsing header '" + w + "'"
    } : !0;
  }
  a.parseHeader = t;
  function r(s, i) {
    let n = 0, o = s.indexOf(`\r
`);
    if (o === -1) {
      i.warn("no CRLF found, not a SIP message, discarded");
      return;
    }
    const d = s.substring(0, o), w = P.parse(d, "Request_Response");
    let f;
    if (w === -1) {
      i.warn('error parsing first line of SIP message: "' + d + '"');
      return;
    } else w.status_code ? (f = new ne(), f.statusCode = w.status_code, f.reasonPhrase = w.reason_phrase) : (f = new he(), f.method = w.method, f.ruri = w.uri);
    f.data = s, n = o + 2;
    let m;
    for (; ; ) {
      if (o = e(s, n), o === -2) {
        m = n + 2;
        break;
      } else if (o === -1) {
        i.error("malformed message");
        return;
      }
      const E = t(f, s, n, o);
      if (E && E !== !0) {
        i.error(E.error);
        return;
      }
      n = o + 2;
    }
    return f.hasHeader("content-length") ? f.body = s.substr(m, Number(f.getHeader("content-length"))) : f.body = s.substring(m), f;
  }
  a.parseMessage = r;
})(xe = xe || (xe = {}));
function Je(a, e) {
  const t = `\r
`;
  if (e.statusCode < 100 || e.statusCode > 699)
    throw new TypeError("Invalid statusCode: " + e.statusCode);
  const r = e.reasonPhrase ? e.reasonPhrase : $e(e.statusCode);
  let s = "SIP/2.0 " + e.statusCode + " " + r + t;
  e.statusCode >= 100 && e.statusCode < 200, e.statusCode;
  const i = "From: " + a.getHeader("From") + t, n = "Call-ID: " + a.callId + t, o = "CSeq: " + a.cseq + " " + a.method + t, d = a.getHeaders("via").reduce((I, D) => I + "Via: " + D + t, "");
  let w = "To: " + a.getHeader("to");
  if (e.statusCode > 100 && !a.parseHeader("to").hasParam("tag")) {
    let I = e.toTag;
    I || (I = Ce()), w += ";tag=" + I;
  }
  w += t;
  let f = "";
  e.supported && (f = "Supported: " + e.supported.join(", ") + t);
  let m = "";
  e.userAgent && (m = "User-Agent: " + e.userAgent + t);
  let E = "";
  return e.extraHeaders && (E = e.extraHeaders.reduce((I, D) => I + D.trim() + t, "")), s += d, s += i, s += w, s += o, s += n, s += f, s += m, s += E, e.body ? (s += "Content-Type: " + e.body.contentType + t, s += "Content-Length: " + Te(e.body.content) + t + t, s += e.body.content) : s += "Content-Length: 0" + t + t, { message: s };
}
class _e extends ce {
  constructor(e) {
    super(e || "Unspecified transport error.");
  }
}
class ze {
  constructor(e, t, r, s, i) {
    this._transport = e, this._user = t, this._id = r, this._state = s, this.listeners = new Array(), this.logger = t.loggerFactory.getLogger(i, r), this.logger.debug(`Constructing ${this.typeToString()} with id ${this.id}.`);
  }
  /**
   * Destructor.
   * Once the transaction is in the "terminated" state, it is destroyed
   * immediately and there is no need to call `dispose`. However, if a
   * transaction needs to be ended prematurely, the transaction user may
   * do so by calling this method (for example, perhaps the UA is shutting down).
   * No state transition will occur upon calling this method, all outstanding
   * transmission timers will be cancelled, and use of the transaction after
   * calling `dispose` is undefined.
   */
  dispose() {
    this.logger.debug(`Destroyed ${this.typeToString()} with id ${this.id}.`);
  }
  /** Transaction id. */
  get id() {
    return this._id;
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    throw new Error("Invalid kind.");
  }
  /** Transaction state. */
  get state() {
    return this._state;
  }
  /** Transaction transport. */
  get transport() {
    return this._transport;
  }
  /**
   * Sets up a function that will be called whenever the transaction state changes.
   * @param listener - Callback function.
   * @param options - An options object that specifies characteristics about the listener.
   *                  If once true, indicates that the listener should be invoked at most once after being added.
   *                  If once true, the listener would be automatically removed when invoked.
   */
  addStateChangeListener(e, t) {
    const r = () => {
      this.removeStateChangeListener(r), e();
    };
    (t == null ? void 0 : t.once) === !0 ? this.listeners.push(r) : this.listeners.push(e);
  }
  /**
   * This is currently public so tests may spy on it.
   * @internal
   */
  notifyStateChangeListeners() {
    this.listeners.slice().forEach((e) => e());
  }
  /**
   * Removes a listener previously registered with addStateListener.
   * @param listener - Callback function.
   */
  removeStateChangeListener(e) {
    this.listeners = this.listeners.filter((t) => t !== e);
  }
  logTransportError(e, t) {
    this.logger.error(e.message), this.logger.error(`Transport error occurred in ${this.typeToString()} with id ${this.id}.`), this.logger.error(t);
  }
  /**
   * Pass message to transport for transmission. If transport fails,
   * the transaction user is notified by callback to onTransportError().
   * @returns
   * Rejects with `TransportError` if transport fails.
   */
  send(e) {
    return this.transport.send(e).catch((t) => {
      if (t instanceof _e)
        throw this.onTransportError(t), t;
      let r;
      throw t && typeof t.message == "string" ? r = new _e(t.message) : r = new _e(), this.onTransportError(r), r;
    });
  }
  setState(e) {
    this.logger.debug(`State change to "${e}" on ${this.typeToString()} with id ${this.id}.`), this._state = e, this._user.onStateChange && this._user.onStateChange(e), this.notifyStateChangeListeners();
  }
  typeToString() {
    return "UnknownType";
  }
}
class Xe extends ze {
  constructor(e, t, r, s, i) {
    super(t, r, e.viaBranch, s, i), this._request = e, this.user = r;
  }
  /** The incoming request the transaction handling. */
  get request() {
    return this._request;
  }
}
var u;
(function(a) {
  a.Accepted = "Accepted", a.Calling = "Calling", a.Completed = "Completed", a.Confirmed = "Confirmed", a.Proceeding = "Proceeding", a.Terminated = "Terminated", a.Trying = "Trying";
})(u = u || (u = {}));
class N extends Xe {
  /**
   * Constructor.
   * Upon construction, a "100 Trying" reply will be immediately sent.
   * After construction the transaction will be in the "proceeding" state and the transaction
   * `id` will equal the branch parameter set in the Via header of the incoming request.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   * @param request - Incoming INVITE request from the transport.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, u.Proceeding, "sip.transaction.ist");
  }
  /**
   * Destructor.
   */
  dispose() {
    this.stopProgressExtensionTimer(), this.H && (clearTimeout(this.H), this.H = void 0), this.I && (clearTimeout(this.I), this.I = void 0), this.L && (clearTimeout(this.L), this.L = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "ist";
  }
  /**
   * Receive requests from transport matching this transaction.
   * @param request - Request matching this transaction.
   */
  receiveRequest(e) {
    switch (this.state) {
      case u.Proceeding:
        if (e.method === b.INVITE) {
          this.lastProvisionalResponse && this.send(this.lastProvisionalResponse).catch((r) => {
            this.logTransportError(r, "Failed to send retransmission of provisional response.");
          });
          return;
        }
        break;
      case u.Accepted:
        if (e.method === b.INVITE)
          return;
        break;
      case u.Completed:
        if (e.method === b.INVITE) {
          if (!this.lastFinalResponse)
            throw new Error("Last final response undefined.");
          this.send(this.lastFinalResponse).catch((r) => {
            this.logTransportError(r, "Failed to send retransmission of final response.");
          });
          return;
        }
        if (e.method === b.ACK) {
          this.stateTransition(u.Confirmed);
          return;
        }
        break;
      case u.Confirmed:
        if (e.method === b.INVITE || e.method === b.ACK)
          return;
        break;
      case u.Terminated:
        if (e.method === b.INVITE || e.method === b.ACK)
          return;
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const t = `INVITE server transaction received unexpected ${e.method} request while in state ${this.state}.`;
    this.logger.warn(t);
  }
  /**
   * Receive responses from TU for this transaction.
   * @param statusCode - Status code of response.
   * @param response - Response.
   */
  receiveResponse(e, t) {
    if (e < 100 || e > 699)
      throw new Error(`Invalid status code ${e}`);
    switch (this.state) {
      case u.Proceeding:
        if (e >= 100 && e <= 199) {
          this.lastProvisionalResponse = t, e > 100 && this.startProgressExtensionTimer(), this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send 1xx response.");
          });
          return;
        }
        if (e >= 200 && e <= 299) {
          this.lastFinalResponse = t, this.stateTransition(u.Accepted), this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send 2xx response.");
          });
          return;
        }
        if (e >= 300 && e <= 699) {
          this.lastFinalResponse = t, this.stateTransition(u.Completed), this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send non-2xx final response.");
          });
          return;
        }
        break;
      case u.Accepted:
        if (e >= 200 && e <= 299) {
          this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send 2xx response.");
          });
          return;
        }
        break;
      case u.Completed:
        break;
      case u.Confirmed:
        break;
      case u.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `INVITE server transaction received unexpected ${e} response from TU while in state ${this.state}.`;
    throw this.logger.error(r), new Error(r);
  }
  /**
   * Retransmit the last 2xx response. This is a noop if not in the "accepted" state.
   */
  retransmitAcceptedResponse() {
    this.state === u.Accepted && this.lastFinalResponse && this.send(this.lastFinalResponse).catch((e) => {
      this.logTransportError(e, "Failed to send 2xx response.");
    });
  }
  /**
   * First, the procedures in [4] are followed, which attempt to deliver the response to a backup.
   * If those should all fail, based on the definition of failure in [4], the server transaction SHOULD
   * inform the TU that a failure has occurred, and MUST remain in the current state.
   * https://tools.ietf.org/html/rfc6026#section-8.8
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e);
  }
  /** For logging. */
  typeToString() {
    return "INVITE server transaction";
  }
  /**
   * Execute a state transition.
   * @param newState - New state.
   */
  stateTransition(e) {
    const t = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case u.Proceeding:
        t();
        break;
      case u.Accepted:
      case u.Completed:
        this.state !== u.Proceeding && t();
        break;
      case u.Confirmed:
        this.state !== u.Completed && t();
        break;
      case u.Terminated:
        this.state !== u.Accepted && this.state !== u.Completed && this.state !== u.Confirmed && t();
        break;
      default:
        t();
    }
    this.stopProgressExtensionTimer(), e === u.Accepted && (this.L = setTimeout(() => this.timerL(), q.TIMER_L)), e === u.Completed && (this.H = setTimeout(() => this.timerH(), q.TIMER_H)), e === u.Confirmed && (this.I = setTimeout(() => this.timerI(), q.TIMER_I)), e === u.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * FIXME: UAS Provisional Retransmission Timer. See RFC 3261 Section 13.3.1.1
   * This is in the wrong place. This is not a transaction level thing. It's a UAS level thing.
   */
  startProgressExtensionTimer() {
    this.progressExtensionTimer === void 0 && (this.progressExtensionTimer = setInterval(() => {
      if (this.logger.debug(`Progress extension timer expired for INVITE server transaction ${this.id}.`), !this.lastProvisionalResponse)
        throw new Error("Last provisional response undefined.");
      this.send(this.lastProvisionalResponse).catch((e) => {
        this.logTransportError(e, "Failed to send retransmission of provisional response.");
      });
    }, q.PROVISIONAL_RESPONSE_INTERVAL));
  }
  /**
   * FIXME: UAS Provisional Retransmission Timer id. See RFC 3261 Section 13.3.1.1
   * This is in the wrong place. This is not a transaction level thing. It's a UAS level thing.
   */
  stopProgressExtensionTimer() {
    this.progressExtensionTimer !== void 0 && (clearInterval(this.progressExtensionTimer), this.progressExtensionTimer = void 0);
  }
  /**
   * While in the "Proceeding" state, if the TU passes a response with status code
   * from 300 to 699 to the server transaction, the response MUST be passed to the
   * transport layer for transmission, and the state machine MUST enter the "Completed" state.
   * For unreliable transports, timer G is set to fire in T1 seconds, and is not set to fire for
   * reliable transports. If timer G fires, the response is passed to the transport layer once
   * more for retransmission, and timer G is set to fire in MIN(2*T1, T2) seconds. From then on,
   * when timer G fires, the response is passed to the transport again for transmission, and
   * timer G is reset with a value that doubles, unless that value exceeds T2, in which case
   * it is reset with the value of T2.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   */
  timerG() {
  }
  /**
   * If timer H fires while in the "Completed" state, it implies that the ACK was never received.
   * In this case, the server transaction MUST transition to the "Terminated" state, and MUST
   * indicate to the TU that a transaction failure has occurred.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   */
  timerH() {
    this.logger.debug(`Timer H expired for INVITE server transaction ${this.id}.`), this.state === u.Completed && (this.logger.warn("ACK to negative final response was never received, terminating transaction."), this.stateTransition(u.Terminated));
  }
  /**
   * Once timer I fires, the server MUST transition to the "Terminated" state.
   * https://tools.ietf.org/html/rfc3261#section-17.2.1
   */
  timerI() {
    this.logger.debug(`Timer I expired for INVITE server transaction ${this.id}.`), this.stateTransition(u.Terminated);
  }
  /**
   * When Timer L fires and the state machine is in the "Accepted" state, the machine MUST
   * transition to the "Terminated" state. Once the transaction is in the "Terminated" state,
   * it MUST be destroyed immediately. Timer L reflects the amount of time the server
   * transaction could receive 2xx responses for retransmission from the
   * TU while it is waiting to receive an ACK.
   * https://tools.ietf.org/html/rfc6026#section-7.1
   * https://tools.ietf.org/html/rfc6026#section-8.7
   */
  timerL() {
    this.logger.debug(`Timer L expired for INVITE server transaction ${this.id}.`), this.state === u.Accepted && this.stateTransition(u.Terminated);
  }
}
class Ie extends ze {
  constructor(e, t, r, s, i) {
    super(t, r, Ie.makeId(e), s, i), this._request = e, this.user = r, e.setViaHeader(this.id, t.protocol);
  }
  static makeId(e) {
    if (e.method === "CANCEL") {
      if (!e.branch)
        throw new Error("Outgoing CANCEL request without a branch.");
      return e.branch;
    } else
      return "z9hG4bK" + Math.floor(Math.random() * 1e7);
  }
  /** The outgoing request the transaction handling. */
  get request() {
    return this._request;
  }
  /**
   * A 408 to non-INVITE will always arrive too late to be useful ([3]),
   * The client already has full knowledge of the timeout. The only
   * information this message would convey is whether or not the server
   * believed the transaction timed out. However, with the current design
   * of the NIT, a client cannot do anything with this knowledge. Thus,
   * the 408 is simply wasting network resources and contributes to the
   * response bombardment illustrated in [3].
   * https://tools.ietf.org/html/rfc4320#section-4.1
   */
  onRequestTimeout() {
    this.user.onRequestTimeout && this.user.onRequestTimeout();
  }
}
class j extends Ie {
  /**
   * Constructor
   * Upon construction, the outgoing request's Via header is updated by calling `setViaHeader`.
   * Then `toString` is called on the outgoing request and the message is sent via the transport.
   * After construction the transaction will be in the "calling" state and the transaction id
   * will equal the branch parameter set in the Via header of the outgoing request.
   * https://tools.ietf.org/html/rfc3261#section-17.1.2
   * @param request - The outgoing Non-INVITE request.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, u.Trying, "sip.transaction.nict"), this.F = setTimeout(() => this.timerF(), q.TIMER_F), this.send(e.toString()).catch((s) => {
      this.logTransportError(s, "Failed to send initial outgoing request.");
    });
  }
  /**
   * Destructor.
   */
  dispose() {
    this.F && (clearTimeout(this.F), this.F = void 0), this.K && (clearTimeout(this.K), this.K = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "nict";
  }
  /**
   * Handler for incoming responses from the transport which match this transaction.
   * @param response - The incoming response.
   */
  receiveResponse(e) {
    const t = e.statusCode;
    if (!t || t < 100 || t > 699)
      throw new Error(`Invalid status code ${t}`);
    switch (this.state) {
      case u.Trying:
        if (t >= 100 && t <= 199) {
          this.stateTransition(u.Proceeding), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 200 && t <= 699) {
          if (this.stateTransition(u.Completed), t === 408) {
            this.onRequestTimeout();
            return;
          }
          this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case u.Proceeding:
        if (t >= 100 && t <= 199 && this.user.receiveResponse)
          return this.user.receiveResponse(e);
        if (t >= 200 && t <= 699) {
          if (this.stateTransition(u.Completed), t === 408) {
            this.onRequestTimeout();
            return;
          }
          this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case u.Completed:
        return;
      case u.Terminated:
        return;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `Non-INVITE client transaction received unexpected ${t} response while in state ${this.state}.`;
    this.logger.warn(r);
  }
  /**
   * The client transaction SHOULD inform the TU that a transport failure has occurred,
   * and the client transaction SHOULD transition directly to the "Terminated" state.
   * The TU will handle the fail over mechanisms described in [4].
   * https://tools.ietf.org/html/rfc3261#section-17.1.4
   * @param error - Transport error
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e), this.stateTransition(u.Terminated, !0);
  }
  /** For logging. */
  typeToString() {
    return "non-INVITE client transaction";
  }
  /**
   * Execute a state transition.
   * @param newState - New state.
   */
  stateTransition(e, t = !1) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case u.Trying:
        r();
        break;
      case u.Proceeding:
        this.state !== u.Trying && r();
        break;
      case u.Completed:
        this.state !== u.Trying && this.state !== u.Proceeding && r();
        break;
      case u.Terminated:
        this.state !== u.Trying && this.state !== u.Proceeding && this.state !== u.Completed && (t || r());
        break;
      default:
        r();
    }
    e === u.Completed && (this.F && (clearTimeout(this.F), this.F = void 0), this.K = setTimeout(() => this.timerK(), q.TIMER_K)), e === u.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * If Timer F fires while the client transaction is still in the
   * "Trying" state, the client transaction SHOULD inform the TU about the
   * timeout, and then it SHOULD enter the "Terminated" state.
   * If timer F fires while in the "Proceeding" state, the TU MUST be informed of
   * a timeout, and the client transaction MUST transition to the terminated state.
   * https://tools.ietf.org/html/rfc3261#section-17.1.2.2
   */
  timerF() {
    this.logger.debug(`Timer F expired for non-INVITE client transaction ${this.id}.`), (this.state === u.Trying || this.state === u.Proceeding) && (this.onRequestTimeout(), this.stateTransition(u.Terminated));
  }
  /**
   * If Timer K fires while in this (COMPLETED) state, the client transaction
   * MUST transition to the "Terminated" state.
   * https://tools.ietf.org/html/rfc3261#section-17.1.2.2
   */
  timerK() {
    this.state === u.Completed && this.stateTransition(u.Terminated);
  }
}
class ue {
  /**
   * Dialog constructor.
   * @param core - User agent core.
   * @param dialogState - Initial dialog state.
   */
  constructor(e, t) {
    this.core = e, this.dialogState = t, this.core.dialogs.set(this.id, this);
  }
  /**
   * When a UAC receives a response that establishes a dialog, it
   * constructs the state of the dialog.  This state MUST be maintained
   * for the duration of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.1.2
   * @param outgoingRequestMessage - Outgoing request message for dialog.
   * @param incomingResponseMessage - Incoming response message creating dialog.
   */
  static initialDialogStateForUserAgentClient(e, t) {
    const s = t.getHeaders("record-route").reverse(), i = t.parseHeader("contact");
    if (!i)
      throw new Error("Contact undefined.");
    if (!(i instanceof O))
      throw new Error("Contact not instance of NameAddrHeader.");
    const n = i.uri, o = e.cseq, d = void 0, w = e.callId, f = e.fromTag, m = t.toTag;
    if (!w)
      throw new Error("Call id undefined.");
    if (!f)
      throw new Error("From tag undefined.");
    if (!m)
      throw new Error("To tag undefined.");
    if (!e.from)
      throw new Error("From undefined.");
    if (!e.to)
      throw new Error("To undefined.");
    const E = e.from.uri, I = e.to.uri;
    if (!t.statusCode)
      throw new Error("Incoming response status code undefined.");
    const D = t.statusCode < 200;
    return {
      id: w + f + m,
      early: D,
      callId: w,
      localTag: f,
      remoteTag: m,
      localSequenceNumber: o,
      remoteSequenceNumber: d,
      localURI: E,
      remoteURI: I,
      remoteTarget: n,
      routeSet: s,
      secure: !1
    };
  }
  /**
   * The UAS then constructs the state of the dialog.  This state MUST be
   * maintained for the duration of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.1.1
   * @param incomingRequestMessage - Incoming request message creating dialog.
   * @param toTag - Tag in the To field in the response to the incoming request.
   */
  static initialDialogStateForUserAgentServer(e, t, r = !1) {
    const i = e.getHeaders("record-route"), n = e.parseHeader("contact");
    if (!n)
      throw new Error("Contact undefined.");
    if (!(n instanceof O))
      throw new Error("Contact not instance of NameAddrHeader.");
    const o = n.uri, d = e.cseq, w = void 0, f = e.callId, m = t, E = e.fromTag, I = e.from.uri, D = e.to.uri;
    return {
      id: f + m + E,
      early: r,
      callId: f,
      localTag: m,
      remoteTag: E,
      localSequenceNumber: w,
      remoteSequenceNumber: d,
      localURI: D,
      remoteURI: I,
      remoteTarget: o,
      routeSet: i,
      secure: !1
    };
  }
  /** Destructor. */
  dispose() {
    this.core.dialogs.delete(this.id);
  }
  /**
   * A dialog is identified at each UA with a dialog ID, which consists of
   * a Call-ID value, a local tag and a remote tag.  The dialog ID at each
   * UA involved in the dialog is not the same.  Specifically, the local
   * tag at one UA is identical to the remote tag at the peer UA.  The
   * tags are opaque tokens that facilitate the generation of unique
   * dialog IDs.
   * https://tools.ietf.org/html/rfc3261#section-12
   */
  get id() {
    return this.dialogState.id;
  }
  /**
   * A dialog can also be in the "early" state, which occurs when it is
   * created with a provisional response, and then it transition to the
   * "confirmed" state when a 2xx final response received or is sent.
   *
   * Note: RFC 3261 is concise on when a dialog is "confirmed", but it
   * can be a point of confusion if an INVITE dialog is "confirmed" after
   * a 2xx is sent or after receiving the ACK for the 2xx response.
   * With careful reading it can be inferred a dialog is always is
   * "confirmed" when the 2xx is sent (regardless of type of dialog).
   * However a INVITE dialog does have additional considerations
   * when it is confirmed but an ACK has not yet been received (in
   * particular with regard to a callee sending BYE requests).
   */
  get early() {
    return this.dialogState.early;
  }
  /** Call identifier component of the dialog id. */
  get callId() {
    return this.dialogState.callId;
  }
  /** Local tag component of the dialog id. */
  get localTag() {
    return this.dialogState.localTag;
  }
  /** Remote tag component of the dialog id. */
  get remoteTag() {
    return this.dialogState.remoteTag;
  }
  /** Local sequence number (used to order requests from the UA to its peer). */
  get localSequenceNumber() {
    return this.dialogState.localSequenceNumber;
  }
  /** Remote sequence number (used to order requests from its peer to the UA). */
  get remoteSequenceNumber() {
    return this.dialogState.remoteSequenceNumber;
  }
  /** Local URI. */
  get localURI() {
    return this.dialogState.localURI;
  }
  /** Remote URI. */
  get remoteURI() {
    return this.dialogState.remoteURI;
  }
  /** Remote target. */
  get remoteTarget() {
    return this.dialogState.remoteTarget;
  }
  /**
   * Route set, which is an ordered list of URIs. The route set is the
   * list of servers that need to be traversed to send a request to the peer.
   */
  get routeSet() {
    return this.dialogState.routeSet;
  }
  /**
   * If the request was sent over TLS, and the Request-URI contained
   * a SIPS URI, the "secure" flag is set to true. *NOT IMPLEMENTED*
   */
  get secure() {
    return this.dialogState.secure;
  }
  /** The user agent core servicing this dialog. */
  get userAgentCore() {
    return this.core;
  }
  /** Confirm the dialog. Only matters if dialog is currently early. */
  confirm() {
    this.dialogState.early = !1;
  }
  /**
   * Requests sent within a dialog, as any other requests, are atomic.  If
   * a particular request is accepted by the UAS, all the state changes
   * associated with it are performed.  If the request is rejected, none
   * of the state changes are performed.
   *
   *    Note that some requests, such as INVITEs, affect several pieces of
   *    state.
   *
   * https://tools.ietf.org/html/rfc3261#section-12.2.2
   * @param message - Incoming request message within this dialog.
   */
  receiveRequest(e) {
    if (e.method !== b.ACK) {
      if (this.remoteSequenceNumber) {
        if (e.cseq <= this.remoteSequenceNumber)
          throw new Error("Out of sequence in dialog request. Did you forget to call sequenceGuard()?");
        this.dialogState.remoteSequenceNumber = e.cseq;
      }
      this.remoteSequenceNumber || (this.dialogState.remoteSequenceNumber = e.cseq);
    }
  }
  /**
   * If the dialog identifier in the 2xx response matches the dialog
   * identifier of an existing dialog, the dialog MUST be transitioned to
   * the "confirmed" state, and the route set for the dialog MUST be
   * recomputed based on the 2xx response using the procedures of Section
   * 12.2.1.2.  Otherwise, a new dialog in the "confirmed" state MUST be
   * constructed using the procedures of Section 12.1.2.
   *
   * Note that the only piece of state that is recomputed is the route
   * set.  Other pieces of state such as the highest sequence numbers
   * (remote and local) sent within the dialog are not recomputed.  The
   * route set only is recomputed for backwards compatibility.  RFC
   * 2543 did not mandate mirroring of the Record-Route header field in
   * a 1xx, only 2xx.  However, we cannot update the entire state of
   * the dialog, since mid-dialog requests may have been sent within
   * the early dialog, modifying the sequence numbers, for example.
   *
   *  https://tools.ietf.org/html/rfc3261#section-13.2.2.4
   */
  recomputeRouteSet(e) {
    this.dialogState.routeSet = e.getHeaders("record-route").reverse();
  }
  /**
   * A request within a dialog is constructed by using many of the
   * components of the state stored as part of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.2.1.1
   * @param method - Outgoing request method.
   */
  createOutgoingRequestMessage(e, t) {
    const r = this.remoteURI, s = this.remoteTag, i = this.localURI, n = this.localTag, o = this.callId;
    let d;
    t && t.cseq ? d = t.cseq : this.dialogState.localSequenceNumber ? d = this.dialogState.localSequenceNumber += 1 : d = this.dialogState.localSequenceNumber = 1;
    const w = this.remoteTarget, f = this.routeSet, m = t && t.extraHeaders, E = t && t.body;
    return this.userAgentCore.makeOutgoingRequestMessage(e, w, i, r, {
      callId: o,
      cseq: d,
      fromTag: n,
      toTag: s,
      routeSet: f
    }, m, E);
  }
  /**
   * Increment the local sequence number by one.
   * It feels like this should be protected, but the current authentication handling currently
   * needs this to keep the dialog in sync when "auto re-sends" request messages.
   * @internal
   */
  incrementLocalSequenceNumber() {
    if (!this.dialogState.localSequenceNumber)
      throw new Error("Local sequence number undefined.");
    this.dialogState.localSequenceNumber += 1;
  }
  /**
   * If the remote sequence number was not empty, but the sequence number
   * of the request is lower than the remote sequence number, the request
   * is out of order and MUST be rejected with a 500 (Server Internal
   * Error) response.
   * https://tools.ietf.org/html/rfc3261#section-12.2.2
   * @param request - Incoming request to guard.
   * @returns True if the program execution is to continue in the branch in question.
   *          Otherwise a 500 Server Internal Error was stateless sent and request processing must stop.
   */
  sequenceGuard(e) {
    return e.method === b.ACK ? !0 : this.remoteSequenceNumber && e.cseq <= this.remoteSequenceNumber ? (this.core.replyStateless(e, { statusCode: 500 }), !1) : !0;
  }
}
class ie extends Ie {
  /**
   * Constructor.
   * Upon construction, the outgoing request's Via header is updated by calling `setViaHeader`.
   * Then `toString` is called on the outgoing request and the message is sent via the transport.
   * After construction the transaction will be in the "calling" state and the transaction id
   * will equal the branch parameter set in the Via header of the outgoing request.
   * https://tools.ietf.org/html/rfc3261#section-17.1.1
   * @param request - The outgoing INVITE request.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, u.Calling, "sip.transaction.ict"), this.ackRetransmissionCache = /* @__PURE__ */ new Map(), this.B = setTimeout(() => this.timerB(), q.TIMER_B), this.send(e.toString()).catch((s) => {
      this.logTransportError(s, "Failed to send initial outgoing request.");
    });
  }
  /**
   * Destructor.
   */
  dispose() {
    this.B && (clearTimeout(this.B), this.B = void 0), this.D && (clearTimeout(this.D), this.D = void 0), this.M && (clearTimeout(this.M), this.M = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "ict";
  }
  /**
   * ACK a 2xx final response.
   *
   * The transaction includes the ACK only if the final response was not a 2xx response (the
   * transaction will generate and send the ACK to the transport automagically). If the
   * final response was a 2xx, the ACK is not considered part of the transaction (the
   * transaction user needs to generate and send the ACK).
   *
   * This library is not strictly RFC compliant with regard to ACK handling for 2xx final
   * responses. Specifically, retransmissions of ACKs to a 2xx final responses is handled
   * by the transaction layer (instead of the UAC core). The "standard" approach is for
   * the UAC core to receive all 2xx responses and manage sending ACK retransmissions to
   * the transport directly. Herein the transaction layer manages sending ACKs to 2xx responses
   * and any retransmissions of those ACKs as needed.
   *
   * @param ack - The outgoing ACK request.
   */
  ackResponse(e) {
    const t = e.toTag;
    if (!t)
      throw new Error("To tag undefined.");
    const r = "z9hG4bK" + Math.floor(Math.random() * 1e7);
    e.setViaHeader(r, this.transport.protocol), this.ackRetransmissionCache.set(t, e), this.send(e.toString()).catch((s) => {
      this.logTransportError(s, "Failed to send ACK to 2xx response.");
    });
  }
  /**
   * Handler for incoming responses from the transport which match this transaction.
   * @param response - The incoming response.
   */
  receiveResponse(e) {
    const t = e.statusCode;
    if (!t || t < 100 || t > 699)
      throw new Error(`Invalid status code ${t}`);
    switch (this.state) {
      case u.Calling:
        if (t >= 100 && t <= 199) {
          this.stateTransition(u.Proceeding), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 200 && t <= 299) {
          this.ackRetransmissionCache.set(e.toTag, void 0), this.stateTransition(u.Accepted), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 300 && t <= 699) {
          this.stateTransition(u.Completed), this.ack(e), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case u.Proceeding:
        if (t >= 100 && t <= 199) {
          this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 200 && t <= 299) {
          this.ackRetransmissionCache.set(e.toTag, void 0), this.stateTransition(u.Accepted), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        if (t >= 300 && t <= 699) {
          this.stateTransition(u.Completed), this.ack(e), this.user.receiveResponse && this.user.receiveResponse(e);
          return;
        }
        break;
      case u.Accepted:
        if (t >= 200 && t <= 299) {
          if (!this.ackRetransmissionCache.has(e.toTag)) {
            this.ackRetransmissionCache.set(e.toTag, void 0), this.user.receiveResponse && this.user.receiveResponse(e);
            return;
          }
          const s = this.ackRetransmissionCache.get(e.toTag);
          if (s) {
            this.send(s.toString()).catch((i) => {
              this.logTransportError(i, "Failed to send retransmission of ACK to 2xx response.");
            });
            return;
          }
          return;
        }
        break;
      case u.Completed:
        if (t >= 300 && t <= 699) {
          this.ack(e);
          return;
        }
        break;
      case u.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `Received unexpected ${t} response while in state ${this.state}.`;
    this.logger.warn(r);
  }
  /**
   * The client transaction SHOULD inform the TU that a transport failure
   * has occurred, and the client transaction SHOULD transition directly
   * to the "Terminated" state.  The TU will handle the failover
   * mechanisms described in [4].
   * https://tools.ietf.org/html/rfc3261#section-17.1.4
   * @param error - The error.
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e), this.stateTransition(u.Terminated, !0);
  }
  /** For logging. */
  typeToString() {
    return "INVITE client transaction";
  }
  ack(e) {
    const t = this.request.ruri, r = this.request.callId, s = this.request.cseq, i = this.request.getHeader("from"), n = e.getHeader("to"), o = this.request.getHeader("via"), d = this.request.getHeader("route");
    if (!i)
      throw new Error("From undefined.");
    if (!n)
      throw new Error("To undefined.");
    if (!o)
      throw new Error("Via undefined.");
    let w = `ACK ${t} SIP/2.0\r
`;
    d && (w += `Route: ${d}\r
`), w += `Via: ${o}\r
`, w += `To: ${n}\r
`, w += `From: ${i}\r
`, w += `Call-ID: ${r}\r
`, w += `CSeq: ${s} ACK\r
`, w += `Max-Forwards: 70\r
`, w += `Content-Length: 0\r
\r
`, this.send(w).catch((f) => {
      this.logTransportError(f, "Failed to send ACK to non-2xx response.");
    });
  }
  /**
   * Execute a state transition.
   * @param newState - New state.
   */
  stateTransition(e, t = !1) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case u.Calling:
        r();
        break;
      case u.Proceeding:
        this.state !== u.Calling && r();
        break;
      case u.Accepted:
      case u.Completed:
        this.state !== u.Calling && this.state !== u.Proceeding && r();
        break;
      case u.Terminated:
        this.state !== u.Calling && this.state !== u.Accepted && this.state !== u.Completed && (t || r());
        break;
      default:
        r();
    }
    this.B && (clearTimeout(this.B), this.B = void 0), u.Proceeding, e === u.Completed && (this.D = setTimeout(() => this.timerD(), q.TIMER_D)), e === u.Accepted && (this.M = setTimeout(() => this.timerM(), q.TIMER_M)), e === u.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * When timer A fires, the client transaction MUST retransmit the
   * request by passing it to the transport layer, and MUST reset the
   * timer with a value of 2*T1.
   * When timer A fires 2*T1 seconds later, the request MUST be
   * retransmitted again (assuming the client transaction is still in this
   * state). This process MUST continue so that the request is
   * retransmitted with intervals that double after each transmission.
   * These retransmissions SHOULD only be done while the client
   * transaction is in the "Calling" state.
   * https://tools.ietf.org/html/rfc3261#section-17.1.1.2
   */
  timerA() {
  }
  /**
   * If the client transaction is still in the "Calling" state when timer
   * B fires, the client transaction SHOULD inform the TU that a timeout
   * has occurred.  The client transaction MUST NOT generate an ACK.
   * https://tools.ietf.org/html/rfc3261#section-17.1.1.2
   */
  timerB() {
    this.logger.debug(`Timer B expired for INVITE client transaction ${this.id}.`), this.state === u.Calling && (this.onRequestTimeout(), this.stateTransition(u.Terminated));
  }
  /**
   * If Timer D fires while the client transaction is in the "Completed" state,
   * the client transaction MUST move to the "Terminated" state.
   * https://tools.ietf.org/html/rfc6026#section-8.4
   */
  timerD() {
    this.logger.debug(`Timer D expired for INVITE client transaction ${this.id}.`), this.state === u.Completed && this.stateTransition(u.Terminated);
  }
  /**
   * If Timer M fires while the client transaction is in the "Accepted"
   * state, the client transaction MUST move to the "Terminated" state.
   * https://tools.ietf.org/html/rfc6026#section-8.4
   */
  timerM() {
    this.logger.debug(`Timer M expired for INVITE client transaction ${this.id}.`), this.state === u.Accepted && this.stateTransition(u.Terminated);
  }
}
class F {
  constructor(e, t, r, s) {
    this.transactionConstructor = e, this.core = t, this.message = r, this.delegate = s, this.challenged = !1, this.stale = !1, this.logger = this.loggerFactory.getLogger("sip.user-agent-client"), this.init();
  }
  dispose() {
    this.transaction.dispose();
  }
  get loggerFactory() {
    return this.core.loggerFactory;
  }
  /** The transaction associated with this request. */
  get transaction() {
    if (!this._transaction)
      throw new Error("Transaction undefined.");
    return this._transaction;
  }
  /**
   * Since requests other than INVITE are responded to immediately, sending a
   * CANCEL for a non-INVITE request would always create a race condition.
   * A CANCEL request SHOULD NOT be sent to cancel a request other than INVITE.
   * https://tools.ietf.org/html/rfc3261#section-9.1
   * @param options - Cancel options bucket.
   */
  cancel(e, t = {}) {
    if (!this.transaction)
      throw new Error("Transaction undefined.");
    if (!this.message.to)
      throw new Error("To undefined.");
    if (!this.message.from)
      throw new Error("From undefined.");
    const r = this.core.makeOutgoingRequestMessage(b.CANCEL, this.message.ruri, this.message.from.uri, this.message.to.uri, {
      toTag: this.message.toTag,
      fromTag: this.message.fromTag,
      callId: this.message.callId,
      cseq: this.message.cseq
    }, t.extraHeaders);
    return r.branch = this.message.branch, this.message.headers.Route && (r.headers.Route = this.message.headers.Route), e && r.setHeader("Reason", e), this.transaction.state === u.Proceeding ? new F(j, this.core, r) : this.transaction.addStateChangeListener(() => {
      this.transaction && this.transaction.state === u.Proceeding && new F(j, this.core, r);
    }, { once: !0 }), r;
  }
  /**
   * If a 401 (Unauthorized) or 407 (Proxy Authentication Required)
   * response is received, the UAC SHOULD follow the authorization
   * procedures of Section 22.2 and Section 22.3 to retry the request with
   * credentials.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3.5
   * 22 Usage of HTTP Authentication
   * https://tools.ietf.org/html/rfc3261#section-22
   * 22.1 Framework
   * https://tools.ietf.org/html/rfc3261#section-22.1
   * 22.2 User-to-User Authentication
   * https://tools.ietf.org/html/rfc3261#section-22.2
   * 22.3 Proxy-to-User Authentication
   * https://tools.ietf.org/html/rfc3261#section-22.3
   *
   * FIXME: This "guard for and retry the request with credentials"
   * implementation is not complete and at best minimally passable.
   * @param response - The incoming response to guard.
   * @param dialog - If defined, the dialog within which the response was received.
   * @returns True if the program execution is to continue in the branch in question.
   *          Otherwise the request is retried with credentials and current request processing must stop.
   */
  authenticationGuard(e, t) {
    const r = e.statusCode;
    if (!r)
      throw new Error("Response status code undefined.");
    if (r !== 401 && r !== 407)
      return !0;
    let s, i;
    if (r === 401 ? (s = e.parseHeader("www-authenticate"), i = "authorization") : (s = e.parseHeader("proxy-authenticate"), i = "proxy-authorization"), !s)
      return this.logger.warn(r + " with wrong or missing challenge, cannot authenticate"), !0;
    if (this.challenged && (this.stale || s.stale !== !0))
      return this.logger.warn(r + " apparently in authentication loop, cannot authenticate"), !0;
    if (!this.credentials && (this.credentials = this.core.configuration.authenticationFactory(), !this.credentials))
      return this.logger.warn("Unable to obtain credentials, cannot authenticate"), !0;
    if (!this.credentials.authenticate(this.message, s))
      return !0;
    this.challenged = !0, s.stale && (this.stale = !0);
    let n = this.message.cseq += 1;
    return t && t.localSequenceNumber && (t.incrementLocalSequenceNumber(), n = this.message.cseq = t.localSequenceNumber), this.message.setHeader("cseq", n + " " + this.message.method), this.message.setHeader(i, this.credentials.toString()), this.init(), !1;
  }
  /**
   * 8.1.3.1 Transaction Layer Errors
   * In some cases, the response returned by the transaction layer will
   * not be a SIP message, but rather a transaction layer error.  When a
   * timeout error is received from the transaction layer, it MUST be
   * treated as if a 408 (Request Timeout) status code has been received.
   * If a fatal transport error is reported by the transport layer
   * (generally, due to fatal ICMP errors in UDP or connection failures in
   * TCP), the condition MUST be treated as a 503 (Service Unavailable)
   * status code.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3.1
   */
  onRequestTimeout() {
    this.logger.warn("User agent client request timed out. Generating internal 408 Request Timeout.");
    const e = new ne();
    e.statusCode = 408, e.reasonPhrase = "Request Timeout", this.receiveResponse(e);
  }
  /**
   * 8.1.3.1 Transaction Layer Errors
   * In some cases, the response returned by the transaction layer will
   * not be a SIP message, but rather a transaction layer error.  When a
   * timeout error is received from the transaction layer, it MUST be
   * treated as if a 408 (Request Timeout) status code has been received.
   * If a fatal transport error is reported by the transport layer
   * (generally, due to fatal ICMP errors in UDP or connection failures in
   * TCP), the condition MUST be treated as a 503 (Service Unavailable)
   * status code.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3.1
   * @param error - Transport error
   */
  onTransportError(e) {
    this.logger.error(e.message), this.logger.error("User agent client request transport error. Generating internal 503 Service Unavailable.");
    const t = new ne();
    t.statusCode = 503, t.reasonPhrase = "Service Unavailable", this.receiveResponse(t);
  }
  /**
   * Receive a response from the transaction layer.
   * @param message - Incoming response message.
   */
  receiveResponse(e) {
    if (!this.authenticationGuard(e))
      return;
    const t = e.statusCode ? e.statusCode.toString() : "";
    if (!t)
      throw new Error("Response status code undefined.");
    switch (!0) {
      case /^100$/.test(t):
        this.delegate && this.delegate.onTrying && this.delegate.onTrying({ message: e });
        break;
      case /^1[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onProgress && this.delegate.onProgress({ message: e });
        break;
      case /^2[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onAccept && this.delegate.onAccept({ message: e });
        break;
      case /^3[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onRedirect && this.delegate.onRedirect({ message: e });
        break;
      case /^[4-6][0-9]{2}$/.test(t):
        this.delegate && this.delegate.onReject && this.delegate.onReject({ message: e });
        break;
      default:
        throw new Error(`Invalid status code ${t}`);
    }
  }
  init() {
    const e = {
      loggerFactory: this.loggerFactory,
      onRequestTimeout: () => this.onRequestTimeout(),
      onStateChange: (s) => {
        s === u.Terminated && (this.core.userAgentClients.delete(r), t === this._transaction && this.dispose());
      },
      onTransportError: (s) => this.onTransportError(s),
      receiveResponse: (s) => this.receiveResponse(s)
    }, t = new this.transactionConstructor(this.message, this.core.transport, e);
    this._transaction = t;
    const r = t.id + t.request.method;
    this.core.userAgentClients.set(r, this);
  }
}
class St extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.BYE, r);
    super(j, e.userAgentCore, s, t), e.dispose();
  }
}
class U extends Xe {
  /**
   * Constructor.
   * After construction the transaction will be in the "trying": state and the transaction
   * `id` will equal the branch parameter set in the Via header of the incoming request.
   * https://tools.ietf.org/html/rfc3261#section-17.2.2
   * @param request - Incoming Non-INVITE request from the transport.
   * @param transport - The transport.
   * @param user - The transaction user.
   */
  constructor(e, t, r) {
    super(e, t, r, u.Trying, "sip.transaction.nist");
  }
  /**
   * Destructor.
   */
  dispose() {
    this.J && (clearTimeout(this.J), this.J = void 0), super.dispose();
  }
  /** Transaction kind. Deprecated. */
  get kind() {
    return "nist";
  }
  /**
   * Receive requests from transport matching this transaction.
   * @param request - Request matching this transaction.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  receiveRequest(e) {
    switch (this.state) {
      case u.Trying:
        break;
      case u.Proceeding:
        if (!this.lastResponse)
          throw new Error("Last response undefined.");
        this.send(this.lastResponse).catch((t) => {
          this.logTransportError(t, "Failed to send retransmission of provisional response.");
        });
        break;
      case u.Completed:
        if (!this.lastResponse)
          throw new Error("Last response undefined.");
        this.send(this.lastResponse).catch((t) => {
          this.logTransportError(t, "Failed to send retransmission of final response.");
        });
        break;
      case u.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
  }
  /**
   * Receive responses from TU for this transaction.
   * @param statusCode - Status code of response. 101-199 not allowed per RFC 4320.
   * @param response - Response to send.
   */
  receiveResponse(e, t) {
    if (e < 100 || e > 699)
      throw new Error(`Invalid status code ${e}`);
    if (e > 100 && e <= 199)
      throw new Error("Provisional response other than 100 not allowed.");
    switch (this.state) {
      case u.Trying:
        if (this.lastResponse = t, e >= 100 && e < 200) {
          this.stateTransition(u.Proceeding), this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send provisional response.");
          });
          return;
        }
        if (e >= 200 && e <= 699) {
          this.stateTransition(u.Completed), this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send final response.");
          });
          return;
        }
        break;
      case u.Proceeding:
        if (this.lastResponse = t, e >= 200 && e <= 699) {
          this.stateTransition(u.Completed), this.send(t).catch((s) => {
            this.logTransportError(s, "Failed to send final response.");
          });
          return;
        }
        break;
      case u.Completed:
        return;
      case u.Terminated:
        break;
      default:
        throw new Error(`Invalid state ${this.state}`);
    }
    const r = `Non-INVITE server transaction received unexpected ${e} response from TU while in state ${this.state}.`;
    throw this.logger.error(r), new Error(r);
  }
  /**
   * First, the procedures in [4] are followed, which attempt to deliver the response to a backup.
   * If those should all fail, based on the definition of failure in [4], the server transaction SHOULD
   * inform the TU that a failure has occurred, and SHOULD transition to the terminated state.
   * https://tools.ietf.org/html/rfc3261#section-17.2.4
   */
  onTransportError(e) {
    this.user.onTransportError && this.user.onTransportError(e), this.stateTransition(u.Terminated, !0);
  }
  /** For logging. */
  typeToString() {
    return "non-INVITE server transaction";
  }
  stateTransition(e, t = !1) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this.state} to ${e}`);
    };
    switch (e) {
      case u.Trying:
        r();
        break;
      case u.Proceeding:
        this.state !== u.Trying && r();
        break;
      case u.Completed:
        this.state !== u.Trying && this.state !== u.Proceeding && r();
        break;
      case u.Terminated:
        this.state !== u.Proceeding && this.state !== u.Completed && (t || r());
        break;
      default:
        r();
    }
    e === u.Completed && (this.J = setTimeout(() => this.timerJ(), q.TIMER_J)), e === u.Terminated && this.dispose(), this.setState(e);
  }
  /**
   * The server transaction remains in this state until Timer J fires,
   * at which point it MUST transition to the "Terminated" state.
   * https://tools.ietf.org/html/rfc3261#section-17.2.2
   */
  timerJ() {
    this.logger.debug(`Timer J expired for NON-INVITE server transaction ${this.id}.`), this.state === u.Completed && this.stateTransition(u.Terminated);
  }
}
class z {
  constructor(e, t, r, s) {
    this.transactionConstructor = e, this.core = t, this.message = r, this.delegate = s, this.logger = this.loggerFactory.getLogger("sip.user-agent-server"), this.toTag = r.toTag ? r.toTag : Ce(), this.init();
  }
  dispose() {
    this.transaction.dispose();
  }
  get loggerFactory() {
    return this.core.loggerFactory;
  }
  /** The transaction associated with this request. */
  get transaction() {
    if (!this._transaction)
      throw new Error("Transaction undefined.");
    return this._transaction;
  }
  accept(e = { statusCode: 200 }) {
    if (!this.acceptable)
      throw new re(`${this.message.method} not acceptable in state ${this.transaction.state}.`);
    const t = e.statusCode;
    if (t < 200 || t > 299)
      throw new TypeError(`Invalid statusCode: ${t}`);
    return this.reply(e);
  }
  progress(e = { statusCode: 180 }) {
    if (!this.progressable)
      throw new re(`${this.message.method} not progressable in state ${this.transaction.state}.`);
    const t = e.statusCode;
    if (t < 101 || t > 199)
      throw new TypeError(`Invalid statusCode: ${t}`);
    return this.reply(e);
  }
  redirect(e, t = { statusCode: 302 }) {
    if (!this.redirectable)
      throw new re(`${this.message.method} not redirectable in state ${this.transaction.state}.`);
    const r = t.statusCode;
    if (r < 300 || r > 399)
      throw new TypeError(`Invalid statusCode: ${r}`);
    const s = new Array();
    return e.forEach((n) => s.push(`Contact: ${n.toString()}`)), t.extraHeaders = (t.extraHeaders || []).concat(s), this.reply(t);
  }
  reject(e = { statusCode: 480 }) {
    if (!this.rejectable)
      throw new re(`${this.message.method} not rejectable in state ${this.transaction.state}.`);
    const t = e.statusCode;
    if (t < 400 || t > 699)
      throw new TypeError(`Invalid statusCode: ${t}`);
    return this.reply(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  trying(e) {
    if (!this.tryingable)
      throw new re(`${this.message.method} not tryingable in state ${this.transaction.state}.`);
    return this.reply({ statusCode: 100 });
  }
  /**
   * If the UAS did not find a matching transaction for the CANCEL
   * according to the procedure above, it SHOULD respond to the CANCEL
   * with a 481 (Call Leg/Transaction Does Not Exist).  If the transaction
   * for the original request still exists, the behavior of the UAS on
   * receiving a CANCEL request depends on whether it has already sent a
   * final response for the original request.  If it has, the CANCEL
   * request has no effect on the processing of the original request, no
   * effect on any session state, and no effect on the responses generated
   * for the original request.  If the UAS has not issued a final response
   * for the original request, its behavior depends on the method of the
   * original request.  If the original request was an INVITE, the UAS
   * SHOULD immediately respond to the INVITE with a 487 (Request
   * Terminated).  A CANCEL request has no impact on the processing of
   * transactions with any other method defined in this specification.
   * https://tools.ietf.org/html/rfc3261#section-9.2
   * @param request - Incoming CANCEL request.
   */
  receiveCancel(e) {
    this.delegate && this.delegate.onCancel && this.delegate.onCancel(e);
  }
  get acceptable() {
    if (this.transaction instanceof N)
      return this.transaction.state === u.Proceeding || this.transaction.state === u.Accepted;
    if (this.transaction instanceof U)
      return this.transaction.state === u.Trying || this.transaction.state === u.Proceeding;
    throw new Error("Unknown transaction type.");
  }
  get progressable() {
    if (this.transaction instanceof N)
      return this.transaction.state === u.Proceeding;
    if (this.transaction instanceof U)
      return !1;
    throw new Error("Unknown transaction type.");
  }
  get redirectable() {
    if (this.transaction instanceof N)
      return this.transaction.state === u.Proceeding;
    if (this.transaction instanceof U)
      return this.transaction.state === u.Trying || this.transaction.state === u.Proceeding;
    throw new Error("Unknown transaction type.");
  }
  get rejectable() {
    if (this.transaction instanceof N)
      return this.transaction.state === u.Proceeding;
    if (this.transaction instanceof U)
      return this.transaction.state === u.Trying || this.transaction.state === u.Proceeding;
    throw new Error("Unknown transaction type.");
  }
  get tryingable() {
    if (this.transaction instanceof N)
      return this.transaction.state === u.Proceeding;
    if (this.transaction instanceof U)
      return this.transaction.state === u.Trying;
    throw new Error("Unknown transaction type.");
  }
  /**
   * When a UAS wishes to construct a response to a request, it follows
   * the general procedures detailed in the following subsections.
   * Additional behaviors specific to the response code in question, which
   * are not detailed in this section, may also be required.
   *
   * Once all procedures associated with the creation of a response have
   * been completed, the UAS hands the response back to the server
   * transaction from which it received the request.
   * https://tools.ietf.org/html/rfc3261#section-8.2.6
   * @param statusCode - Status code to reply with.
   * @param options - Reply options bucket.
   */
  reply(e) {
    !e.toTag && e.statusCode !== 100 && (e.toTag = this.toTag), e.userAgent = e.userAgent || this.core.configuration.userAgentHeaderFieldValue, e.supported = e.supported || this.core.configuration.supportedOptionTagsResponse;
    const t = Je(this.message, e);
    return this.transaction.receiveResponse(e.statusCode, t.message), t;
  }
  init() {
    const e = {
      loggerFactory: this.loggerFactory,
      onStateChange: (s) => {
        s === u.Terminated && (this.core.userAgentServers.delete(r), this.dispose());
      },
      onTransportError: (s) => {
        this.logger.error(s.message), this.delegate && this.delegate.onTransportError ? this.delegate.onTransportError(s) : this.logger.error("User agent server response transport error.");
      }
    }, t = new this.transactionConstructor(this.message, this.core.transport, e);
    this._transaction = t;
    const r = t.id;
    this.core.userAgentServers.set(t.id, this);
  }
}
class $t extends z {
  constructor(e, t, r) {
    super(U, e.userAgentCore, t, r);
  }
}
class Ct extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.INFO, r);
    super(j, e.userAgentCore, s, t);
  }
}
class It extends z {
  constructor(e, t, r) {
    super(U, e.userAgentCore, t, r);
  }
}
class Qe extends F {
  constructor(e, t, r) {
    super(j, e, t, r);
  }
}
class et extends z {
  constructor(e, t, r) {
    super(U, e, t, r);
  }
}
class At extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.NOTIFY, r);
    super(j, e.userAgentCore, s, t);
  }
}
function Dt(a) {
  return a.userAgentCore !== void 0;
}
class ye extends z {
  /**
   * NOTIFY UAS constructor.
   * @param dialogOrCore - Dialog for in dialog NOTIFY, UserAgentCore for out of dialog NOTIFY (deprecated).
   * @param message - Incoming NOTIFY request message.
   */
  constructor(e, t, r) {
    const s = Dt(e) ? e.userAgentCore : e;
    super(U, s, t, r);
  }
}
class Ht extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.PRACK, r);
    super(j, e.userAgentCore, s, t), e.signalingStateTransition(s);
  }
}
class Pt extends z {
  constructor(e, t, r) {
    super(U, e.userAgentCore, t, r), e.signalingStateTransition(t), this.dialog = e;
  }
  /**
   * Update the dialog signaling state on a 2xx response.
   * @param options - Options bucket.
   */
  accept(e = { statusCode: 200 }) {
    return e.body && this.dialog.signalingStateTransition(e.body), super.accept(e);
  }
}
class _t extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.INVITE, r);
    super(ie, e.userAgentCore, s, t), this.delegate = t, e.signalingStateTransition(s), e.reinviteUserAgentClient = this, this.dialog = e;
  }
  receiveResponse(e) {
    if (!this.authenticationGuard(e, this.dialog))
      return;
    const t = e.statusCode ? e.statusCode.toString() : "";
    if (!t)
      throw new Error("Response status code undefined.");
    switch (!0) {
      case /^100$/.test(t):
        this.delegate && this.delegate.onTrying && this.delegate.onTrying({ message: e });
        break;
      case /^1[0-9]{2}$/.test(t):
        this.delegate && this.delegate.onProgress && this.delegate.onProgress({
          message: e,
          session: this.dialog,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          prack: (r) => {
            throw new Error("Unimplemented.");
          }
        });
        break;
      case /^2[0-9]{2}$/.test(t):
        this.dialog.signalingStateTransition(e), this.delegate && this.delegate.onAccept && this.delegate.onAccept({
          message: e,
          session: this.dialog,
          ack: (r) => this.dialog.ack(r)
        });
        break;
      case /^3[0-9]{2}$/.test(t):
        this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentClient = void 0, this.delegate && this.delegate.onRedirect && this.delegate.onRedirect({ message: e });
        break;
      case /^[4-6][0-9]{2}$/.test(t):
        this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentClient = void 0, this.delegate && this.delegate.onReject && this.delegate.onReject({ message: e });
        break;
      default:
        throw new Error(`Invalid status code ${t}`);
    }
  }
}
class kt extends z {
  constructor(e, t, r) {
    super(N, e.userAgentCore, t, r), e.reinviteUserAgentServer = this, this.dialog = e;
  }
  /**
   * Update the dialog signaling state on a 2xx response.
   * @param options - Options bucket.
   */
  accept(e = { statusCode: 200 }) {
    e.extraHeaders = e.extraHeaders || [], e.extraHeaders = e.extraHeaders.concat(this.dialog.routeSet.map((i) => `Record-Route: ${i}`));
    const t = super.accept(e), r = this.dialog, s = Object.assign(Object.assign({}, t), { session: r });
    return e.body && this.dialog.signalingStateTransition(e.body), this.dialog.reConfirm(), s;
  }
  /**
   * Update the dialog signaling state on a 1xx response.
   * @param options - Progress options bucket.
   */
  progress(e = { statusCode: 180 }) {
    const t = super.progress(e), r = this.dialog, s = Object.assign(Object.assign({}, t), { session: r });
    return e.body && this.dialog.signalingStateTransition(e.body), s;
  }
  /**
   * TODO: Not Yet Supported
   * @param contacts - Contacts to redirect to.
   * @param options - Redirect options bucket.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  redirect(e, t = { statusCode: 302 }) {
    throw this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentServer = void 0, new Error("Unimplemented.");
  }
  /**
   * 3.1 Background on Re-INVITE Handling by UASs
   * An error response to a re-INVITE has the following semantics.  As
   * specified in Section 12.2.2 of RFC 3261 [RFC3261], if a re-INVITE is
   * rejected, no state changes are performed.
   * https://tools.ietf.org/html/rfc6141#section-3.1
   * @param options - Reject options bucket.
   */
  reject(e = { statusCode: 488 }) {
    return this.dialog.signalingStateRollback(), this.dialog.reinviteUserAgentServer = void 0, super.reject(e);
  }
}
class qt extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.REFER, r);
    super(j, e.userAgentCore, s, t);
  }
}
function Ft(a) {
  return a.userAgentCore !== void 0;
}
class tt extends z {
  /**
   * REFER UAS constructor.
   * @param dialogOrCore - Dialog for in dialog REFER, UserAgentCore for out of dialog REFER.
   * @param message - Incoming REFER request message.
   */
  constructor(e, t, r) {
    const s = Ft(e) ? e.userAgentCore : e;
    super(U, s, t, r);
  }
}
class Se extends ue {
  constructor(e, t, r, s) {
    super(t, r), this.initialTransaction = e, this._signalingState = T.Initial, this.ackWait = !1, this.ackProcessing = !1, this.delegate = s, e instanceof N && (this.ackWait = !0), this.early || this.start2xxRetransmissionTimer(), this.signalingStateTransition(e.request), this.logger = t.loggerFactory.getLogger("sip.invite-dialog"), this.logger.log(`INVITE dialog ${this.id} constructed`);
  }
  dispose() {
    super.dispose(), this._signalingState = T.Closed, this._offer = void 0, this._answer = void 0, this.invite2xxTimer && (clearTimeout(this.invite2xxTimer), this.invite2xxTimer = void 0), this.logger.log(`INVITE dialog ${this.id} destroyed`);
  }
  // FIXME: Need real state machine
  get sessionState() {
    return this.early ? V.Early : this.ackWait ? V.AckWait : this._signalingState === T.Closed ? V.Terminated : V.Confirmed;
  }
  /** The state of the offer/answer exchange. */
  get signalingState() {
    return this._signalingState;
  }
  /** The current offer. Undefined unless signaling state HaveLocalOffer, HaveRemoteOffer, of Stable. */
  get offer() {
    return this._offer;
  }
  /** The current answer. Undefined unless signaling state Stable. */
  get answer() {
    return this._answer;
  }
  /** Confirm the dialog. Only matters if dialog is currently early. */
  confirm() {
    this.early && this.start2xxRetransmissionTimer(), super.confirm();
  }
  /** Re-confirm the dialog. Only matters if handling re-INVITE request. */
  reConfirm() {
    this.reinviteUserAgentServer && this.startReInvite2xxRetransmissionTimer();
  }
  /**
   * The UAC core MUST generate an ACK request for each 2xx received from
   * the transaction layer.  The header fields of the ACK are constructed
   * in the same way as for any request sent within a dialog (see Section
   * 12) with the exception of the CSeq and the header fields related to
   * authentication.  The sequence number of the CSeq header field MUST be
   * the same as the INVITE being acknowledged, but the CSeq method MUST
   * be ACK.  The ACK MUST contain the same credentials as the INVITE.  If
   * the 2xx contains an offer (based on the rules above), the ACK MUST
   * carry an answer in its body.  If the offer in the 2xx response is not
   * acceptable, the UAC core MUST generate a valid answer in the ACK and
   * then send a BYE immediately.
   * https://tools.ietf.org/html/rfc3261#section-13.2.2.4
   * @param options - ACK options bucket.
   */
  ack(e = {}) {
    this.logger.log(`INVITE dialog ${this.id} sending ACK request`);
    let t;
    if (this.reinviteUserAgentClient) {
      if (!(this.reinviteUserAgentClient.transaction instanceof ie))
        throw new Error("Transaction not instance of InviteClientTransaction.");
      t = this.reinviteUserAgentClient.transaction, this.reinviteUserAgentClient = void 0;
    } else {
      if (!(this.initialTransaction instanceof ie))
        throw new Error("Initial transaction not instance of InviteClientTransaction.");
      t = this.initialTransaction;
    }
    const r = this.createOutgoingRequestMessage(b.ACK, {
      cseq: t.request.cseq,
      extraHeaders: e.extraHeaders,
      body: e.body
    });
    return t.ackResponse(r), this.signalingStateTransition(r), { message: r };
  }
  /**
   * Terminating a Session
   *
   * This section describes the procedures for terminating a session
   * established by SIP.  The state of the session and the state of the
   * dialog are very closely related.  When a session is initiated with an
   * INVITE, each 1xx or 2xx response from a distinct UAS creates a
   * dialog, and if that response completes the offer/answer exchange, it
   * also creates a session.  As a result, each session is "associated"
   * with a single dialog - the one which resulted in its creation.  If an
   * initial INVITE generates a non-2xx final response, that terminates
   * all sessions (if any) and all dialogs (if any) that were created
   * through responses to the request.  By virtue of completing the
   * transaction, a non-2xx final response also prevents further sessions
   * from being created as a result of the INVITE.  The BYE request is
   * used to terminate a specific session or attempted session.  In this
   * case, the specific session is the one with the peer UA on the other
   * side of the dialog.  When a BYE is received on a dialog, any session
   * associated with that dialog SHOULD terminate.  A UA MUST NOT send a
   * BYE outside of a dialog.  The caller's UA MAY send a BYE for either
   * confirmed or early dialogs, and the callee's UA MAY send a BYE on
   * confirmed dialogs, but MUST NOT send a BYE on early dialogs.
   *
   * However, the callee's UA MUST NOT send a BYE on a confirmed dialog
   * until it has received an ACK for its 2xx response or until the server
   * transaction times out.  If no SIP extensions have defined other
   * application layer states associated with the dialog, the BYE also
   * terminates the dialog.
   *
   * https://tools.ietf.org/html/rfc3261#section-15
   * FIXME: Make these proper Exceptions...
   * @param options - BYE options bucket.
   * @returns
   * Throws `Error` if callee's UA attempts a BYE on an early dialog.
   * Throws `Error` if callee's UA attempts a BYE on a confirmed dialog
   *                while it's waiting on the ACK for its 2xx response.
   */
  bye(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending BYE request`), this.initialTransaction instanceof N) {
      if (this.early)
        throw new Error("UAS MUST NOT send a BYE on early dialogs.");
      if (this.ackWait && this.initialTransaction.state !== u.Terminated)
        throw new Error("UAS MUST NOT send a BYE on a confirmed dialog until it has received an ACK for its 2xx response or until the server transaction times out.");
    }
    return new St(this, e, t);
  }
  /**
   * An INFO request can be associated with an Info Package (see
   * Section 5), or associated with a legacy INFO usage (see Section 2).
   *
   * The construction of the INFO request is the same as any other
   * non-target refresh request within an existing invite dialog usage as
   * described in Section 12.2 of RFC 3261.
   * https://tools.ietf.org/html/rfc6086#section-4.2.1
   * @param options - Options bucket.
   */
  info(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending INFO request`), this.early)
      throw new Error("Dialog not confirmed.");
    return new Ct(this, e, t);
  }
  /**
   * Modifying an Existing Session
   *
   * A successful INVITE request (see Section 13) establishes both a
   * dialog between two user agents and a session using the offer-answer
   * model.  Section 12 explains how to modify an existing dialog using a
   * target refresh request (for example, changing the remote target URI
   * of the dialog).  This section describes how to modify the actual
   * session.  This modification can involve changing addresses or ports,
   * adding a media stream, deleting a media stream, and so on.  This is
   * accomplished by sending a new INVITE request within the same dialog
   * that established the session.  An INVITE request sent within an
   * existing dialog is known as a re-INVITE.
   *
   *    Note that a single re-INVITE can modify the dialog and the
   *    parameters of the session at the same time.
   *
   * Either the caller or callee can modify an existing session.
   * https://tools.ietf.org/html/rfc3261#section-14
   * @param options - Options bucket
   */
  invite(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending INVITE request`), this.early)
      throw new Error("Dialog not confirmed.");
    if (this.reinviteUserAgentClient)
      throw new Error("There is an ongoing re-INVITE client transaction.");
    if (this.reinviteUserAgentServer)
      throw new Error("There is an ongoing re-INVITE server transaction.");
    return new _t(this, e, t);
  }
  /**
   * A UAC MAY associate a MESSAGE request with an existing dialog.  If a
   * MESSAGE request is sent within a dialog, it is "associated" with any
   * media session or sessions associated with that dialog.
   * https://tools.ietf.org/html/rfc3428#section-4
   * @param options - Options bucket.
   */
  message(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending MESSAGE request`), this.early)
      throw new Error("Dialog not confirmed.");
    const r = this.createOutgoingRequestMessage(b.MESSAGE, t);
    return new Qe(this.core, r, e);
  }
  /**
   * The NOTIFY mechanism defined in [2] MUST be used to inform the agent
   * sending the REFER of the status of the reference.
   * https://tools.ietf.org/html/rfc3515#section-2.4.4
   * @param options - Options bucket.
   */
  notify(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending NOTIFY request`), this.early)
      throw new Error("Dialog not confirmed.");
    return new At(this, e, t);
  }
  /**
   * Assuming the response is to be transmitted reliably, the UAC MUST
   * create a new request with method PRACK.  This request is sent within
   * the dialog associated with the provisional response (indeed, the
   * provisional response may have created the dialog).  PRACK requests
   * MAY contain bodies, which are interpreted according to their type and
   * disposition.
   * https://tools.ietf.org/html/rfc3262#section-4
   * @param options - Options bucket.
   */
  prack(e, t) {
    return this.logger.log(`INVITE dialog ${this.id} sending PRACK request`), new Ht(this, e, t);
  }
  /**
   * REFER is a SIP request and is constructed as defined in [1].  A REFER
   * request MUST contain exactly one Refer-To header field value.
   * https://tools.ietf.org/html/rfc3515#section-2.4.1
   * @param options - Options bucket.
   */
  refer(e, t) {
    if (this.logger.log(`INVITE dialog ${this.id} sending REFER request`), this.early)
      throw new Error("Dialog not confirmed.");
    return new qt(this, e, t);
  }
  /**
   * Requests sent within a dialog, as any other requests, are atomic.  If
   * a particular request is accepted by the UAS, all the state changes
   * associated with it are performed.  If the request is rejected, none
   * of the state changes are performed.
   * https://tools.ietf.org/html/rfc3261#section-12.2.2
   * @param message - Incoming request message within this dialog.
   */
  receiveRequest(e) {
    if (this.logger.log(`INVITE dialog ${this.id} received ${e.method} request`), e.method === b.ACK) {
      if (this.ackWait) {
        if (this.initialTransaction instanceof ie) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        if (this.initialTransaction.request.cseq !== e.cseq) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        this.ackWait = !1;
      } else {
        if (!this.reinviteUserAgentServer) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        if (this.reinviteUserAgentServer.transaction.request.cseq !== e.cseq) {
          this.logger.warn(`INVITE dialog ${this.id} received unexpected ${e.method} request, dropping.`);
          return;
        }
        this.reinviteUserAgentServer = void 0;
      }
      if (this.signalingStateTransition(e), this.delegate && this.delegate.onAck) {
        const t = this.delegate.onAck({ message: e });
        t instanceof Promise && (this.ackProcessing = !0, t.then(() => this.ackProcessing = !1).catch(() => this.ackProcessing = !1));
      }
      return;
    }
    if (!this.sequenceGuard(e)) {
      this.logger.log(`INVITE dialog ${this.id} rejected out of order ${e.method} request.`);
      return;
    }
    if (super.receiveRequest(e), e.method === b.INVITE) {
      const t = () => {
        const i = this.ackWait ? "waiting for initial ACK" : "processing initial ACK";
        this.logger.warn(`INVITE dialog ${this.id} received re-INVITE while ${i}`);
        let n = "RFC 5407 suggests the following to avoid this race condition... ";
        n += " Note: Implementation issues are outside the scope of this document,", n += " but the following tip is provided for avoiding race conditions of", n += " this type.  The caller can delay sending re-INVITE F6 for some period", n += " of time (2 seconds, perhaps), after which the caller can reasonably", n += " assume that its ACK has been received.  Implementors can decouple the", n += " actions of the user (e.g., pressing the hold button) from the actions", n += " of the protocol (the sending of re-INVITE F6), so that the UA can", n += " behave like this.  In this case, it is the implementor's choice as to", n += " how long to wait.  In most cases, such an implementation may be", n += " useful to prevent the type of race condition shown in this section.", n += " This document expresses no preference about whether or not they", n += " should wait for an ACK to be delivered.  After considering the impact", n += " on user experience, implementors should decide whether or not to wait", n += " for a while, because the user experience depends on the", n += " implementation and has no direct bearing on protocol behavior.", this.logger.warn(n);
      }, s = [`Retry-After: ${Math.floor(Math.random() * 10) + 1}`];
      if (this.ackProcessing) {
        this.core.replyStateless(e, { statusCode: 500, extraHeaders: s }), t();
        return;
      }
      if (this.ackWait && this.signalingState !== T.Stable) {
        this.core.replyStateless(e, { statusCode: 500, extraHeaders: s }), t();
        return;
      }
      if (this.reinviteUserAgentServer) {
        this.core.replyStateless(e, { statusCode: 500, extraHeaders: s });
        return;
      }
      if (this.reinviteUserAgentClient) {
        this.core.replyStateless(e, { statusCode: 491 });
        return;
      }
    }
    if (e.method === b.INVITE) {
      const t = e.parseHeader("contact");
      if (!t)
        throw new Error("Contact undefined.");
      if (!(t instanceof O))
        throw new Error("Contact not instance of NameAddrHeader.");
      this.dialogState.remoteTarget = t.uri;
    }
    switch (e.method) {
      case b.BYE:
        {
          const t = new $t(this, e);
          this.delegate && this.delegate.onBye ? this.delegate.onBye(t) : t.accept(), this.dispose();
        }
        break;
      case b.INFO:
        {
          const t = new It(this, e);
          this.delegate && this.delegate.onInfo ? this.delegate.onInfo(t) : t.reject({
            statusCode: 469,
            extraHeaders: ["Recv-Info:"]
          });
        }
        break;
      case b.INVITE:
        {
          const t = new kt(this, e);
          this.signalingStateTransition(e), this.delegate && this.delegate.onInvite ? this.delegate.onInvite(t) : t.reject({ statusCode: 488 });
        }
        break;
      case b.MESSAGE:
        {
          const t = new et(this.core, e);
          this.delegate && this.delegate.onMessage ? this.delegate.onMessage(t) : t.accept();
        }
        break;
      case b.NOTIFY:
        {
          const t = new ye(this, e);
          this.delegate && this.delegate.onNotify ? this.delegate.onNotify(t) : t.accept();
        }
        break;
      case b.PRACK:
        {
          const t = new Pt(this, e);
          this.delegate && this.delegate.onPrack ? this.delegate.onPrack(t) : t.accept();
        }
        break;
      case b.REFER:
        {
          const t = new tt(this, e);
          this.delegate && this.delegate.onRefer ? this.delegate.onRefer(t) : t.reject();
        }
        break;
      default:
        this.logger.log(`INVITE dialog ${this.id} received unimplemented ${e.method} request`), this.core.replyStateless(e, { statusCode: 501 });
        break;
    }
  }
  /**
   * Guard against out of order reliable provisional responses and retransmissions.
   * Returns false if the response should be discarded, otherwise true.
   * @param message - Incoming response message within this dialog.
   */
  reliableSequenceGuard(e) {
    const t = e.statusCode;
    if (!t)
      throw new Error("Status code undefined");
    if (t > 100 && t < 200) {
      const r = e.getHeader("require"), s = e.getHeader("rseq"), i = r && r.includes("100rel") && s ? Number(s) : void 0;
      if (i) {
        if (this.rseq && this.rseq + 1 !== i)
          return !1;
        this.rseq = this.rseq ? this.rseq + 1 : i;
      }
    }
    return !0;
  }
  /**
   * If not in a stable signaling state, rollback to prior stable signaling state.
   */
  signalingStateRollback() {
    (this._signalingState === T.HaveLocalOffer || this.signalingState === T.HaveRemoteOffer) && this._rollbackOffer && this._rollbackAnswer && (this._signalingState = T.Stable, this._offer = this._rollbackOffer, this._answer = this._rollbackAnswer);
  }
  /**
   * Update the signaling state of the dialog.
   * @param message - The message to base the update off of.
   */
  signalingStateTransition(e) {
    const t = me(e);
    if (!(!t || t.contentDisposition !== "session")) {
      if (this._signalingState === T.Stable && (this._rollbackOffer = this._offer, this._rollbackAnswer = this._answer), e instanceof he)
        switch (this._signalingState) {
          case T.Initial:
          case T.Stable:
            this._signalingState = T.HaveRemoteOffer, this._offer = t, this._answer = void 0;
            break;
          case T.HaveLocalOffer:
            this._signalingState = T.Stable, this._answer = t;
            break;
          case T.HaveRemoteOffer:
            break;
          case T.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
      if (e instanceof ne)
        switch (this._signalingState) {
          case T.Initial:
          case T.Stable:
            this._signalingState = T.HaveRemoteOffer, this._offer = t, this._answer = void 0;
            break;
          case T.HaveLocalOffer:
            this._signalingState = T.Stable, this._answer = t;
            break;
          case T.HaveRemoteOffer:
            break;
          case T.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
      if (e instanceof oe)
        switch (this._signalingState) {
          case T.Initial:
          case T.Stable:
            this._signalingState = T.HaveLocalOffer, this._offer = t, this._answer = void 0;
            break;
          case T.HaveLocalOffer:
            break;
          case T.HaveRemoteOffer:
            this._signalingState = T.Stable, this._answer = t;
            break;
          case T.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
      if (Ye(e))
        switch (this._signalingState) {
          case T.Initial:
          case T.Stable:
            this._signalingState = T.HaveLocalOffer, this._offer = t, this._answer = void 0;
            break;
          case T.HaveLocalOffer:
            break;
          case T.HaveRemoteOffer:
            this._signalingState = T.Stable, this._answer = t;
            break;
          case T.Closed:
            break;
          default:
            throw new Error("Unexpected signaling state.");
        }
    }
  }
  start2xxRetransmissionTimer() {
    if (this.initialTransaction instanceof N) {
      const e = this.initialTransaction;
      let t = q.T1;
      const r = () => {
        if (!this.ackWait) {
          this.invite2xxTimer = void 0;
          return;
        }
        this.logger.log("No ACK for 2xx response received, attempting retransmission"), e.retransmitAcceptedResponse(), t = Math.min(t * 2, q.T2), this.invite2xxTimer = setTimeout(r, t);
      };
      this.invite2xxTimer = setTimeout(r, t);
      const s = () => {
        e.state === u.Terminated && (e.removeStateChangeListener(s), this.invite2xxTimer && (clearTimeout(this.invite2xxTimer), this.invite2xxTimer = void 0), this.ackWait && (this.delegate && this.delegate.onAckTimeout ? this.delegate.onAckTimeout() : this.bye()));
      };
      e.addStateChangeListener(s);
    }
  }
  // FIXME: Refactor
  startReInvite2xxRetransmissionTimer() {
    if (this.reinviteUserAgentServer && this.reinviteUserAgentServer.transaction instanceof N) {
      const e = this.reinviteUserAgentServer.transaction;
      let t = q.T1;
      const r = () => {
        if (!this.reinviteUserAgentServer) {
          this.invite2xxTimer = void 0;
          return;
        }
        this.logger.log("No ACK for 2xx response received, attempting retransmission"), e.retransmitAcceptedResponse(), t = Math.min(t * 2, q.T2), this.invite2xxTimer = setTimeout(r, t);
      };
      this.invite2xxTimer = setTimeout(r, t);
      const s = () => {
        e.state === u.Terminated && (e.removeStateChangeListener(s), this.invite2xxTimer && (clearTimeout(this.invite2xxTimer), this.invite2xxTimer = void 0), this.reinviteUserAgentServer);
      };
      e.addStateChangeListener(s);
    }
  }
}
class Mt extends F {
  constructor(e, t, r) {
    super(ie, e, t, r), this.confirmedDialogAcks = /* @__PURE__ */ new Map(), this.confirmedDialogs = /* @__PURE__ */ new Map(), this.earlyDialogs = /* @__PURE__ */ new Map(), this.delegate = r;
  }
  dispose() {
    this.earlyDialogs.forEach((e) => e.dispose()), this.earlyDialogs.clear(), super.dispose();
  }
  /**
   * Special case for transport error while sending ACK.
   * @param error - Transport error
   */
  onTransportError(e) {
    if (this.transaction.state === u.Calling)
      return super.onTransportError(e);
    this.logger.error(e.message), this.logger.error("User agent client request transport error while sending ACK.");
  }
  /**
   * Once the INVITE has been passed to the INVITE client transaction, the
   * UAC waits for responses for the INVITE.
   * https://tools.ietf.org/html/rfc3261#section-13.2.2
   * @param incomingResponse - Incoming response to INVITE request.
   */
  receiveResponse(e) {
    if (!this.authenticationGuard(e))
      return;
    const t = e.statusCode ? e.statusCode.toString() : "";
    if (!t)
      throw new Error("Response status code undefined.");
    switch (!0) {
      case /^100$/.test(t):
        this.delegate && this.delegate.onTrying && this.delegate.onTrying({ message: e });
        return;
      case /^1[0-9]{2}$/.test(t):
        {
          if (!e.toTag) {
            this.logger.warn("Non-100 1xx INVITE response received without a to tag, dropping.");
            return;
          }
          if (!e.parseHeader("contact")) {
            this.logger.error("Non-100 1xx INVITE response received without a Contact header field, dropping.");
            return;
          }
          const s = ue.initialDialogStateForUserAgentClient(this.message, e);
          let i = this.earlyDialogs.get(s.id);
          if (!i) {
            const o = this.transaction;
            if (!(o instanceof ie))
              throw new Error("Transaction not instance of InviteClientTransaction.");
            i = new Se(o, this.core, s), this.earlyDialogs.set(i.id, i);
          }
          if (!i.reliableSequenceGuard(e)) {
            this.logger.warn("1xx INVITE reliable response received out of order or is a retransmission, dropping.");
            return;
          }
          (i.signalingState === T.Initial || i.signalingState === T.HaveLocalOffer) && i.signalingStateTransition(e);
          const n = i;
          this.delegate && this.delegate.onProgress && this.delegate.onProgress({
            message: e,
            session: n,
            prack: (o) => n.prack(void 0, o)
          });
        }
        return;
      case /^2[0-9]{2}$/.test(t):
        {
          if (!e.toTag) {
            this.logger.error("2xx INVITE response received without a to tag, dropping.");
            return;
          }
          if (!e.parseHeader("contact")) {
            this.logger.error("2xx INVITE response received without a Contact header field, dropping.");
            return;
          }
          const s = ue.initialDialogStateForUserAgentClient(this.message, e);
          let i = this.confirmedDialogs.get(s.id);
          if (i) {
            const o = this.confirmedDialogAcks.get(s.id);
            if (o) {
              const d = this.transaction;
              if (!(d instanceof ie))
                throw new Error("Client transaction not instance of InviteClientTransaction.");
              d.ackResponse(o.message);
            }
            return;
          }
          if (i = this.earlyDialogs.get(s.id), i)
            i.confirm(), i.recomputeRouteSet(e), this.earlyDialogs.delete(i.id), this.confirmedDialogs.set(i.id, i);
          else {
            const o = this.transaction;
            if (!(o instanceof ie))
              throw new Error("Transaction not instance of InviteClientTransaction.");
            i = new Se(o, this.core, s), this.confirmedDialogs.set(i.id, i);
          }
          (i.signalingState === T.Initial || i.signalingState === T.HaveLocalOffer) && i.signalingStateTransition(e);
          const n = i;
          if (this.delegate && this.delegate.onAccept)
            this.delegate.onAccept({
              message: e,
              session: n,
              ack: (o) => {
                const d = n.ack(o);
                return this.confirmedDialogAcks.set(n.id, d), d;
              }
            });
          else {
            const o = n.ack();
            this.confirmedDialogAcks.set(n.id, o);
          }
        }
        return;
      case /^3[0-9]{2}$/.test(t):
        this.earlyDialogs.forEach((r) => r.dispose()), this.earlyDialogs.clear(), this.delegate && this.delegate.onRedirect && this.delegate.onRedirect({ message: e });
        return;
      case /^[4-6][0-9]{2}$/.test(t):
        this.earlyDialogs.forEach((r) => r.dispose()), this.earlyDialogs.clear(), this.delegate && this.delegate.onReject && this.delegate.onReject({ message: e });
        return;
      default:
        throw new Error(`Invalid status code ${t}`);
    }
  }
}
class ke extends z {
  constructor(e, t, r) {
    super(N, e, t, r), this.core = e;
  }
  dispose() {
    this.earlyDialog && this.earlyDialog.dispose(), super.dispose();
  }
  /**
   * 13.3.1.4 The INVITE is Accepted
   * The UAS core generates a 2xx response.  This response establishes a
   * dialog, and therefore follows the procedures of Section 12.1.1 in
   * addition to those of Section 8.2.6.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.4
   * @param options - Accept options bucket.
   */
  accept(e = { statusCode: 200 }) {
    if (!this.acceptable)
      throw new re(`${this.message.method} not acceptable in state ${this.transaction.state}.`);
    if (!this.confirmedDialog)
      if (this.earlyDialog)
        this.earlyDialog.confirm(), this.confirmedDialog = this.earlyDialog, this.earlyDialog = void 0;
      else {
        const d = this.transaction;
        if (!(d instanceof N))
          throw new Error("Transaction not instance of InviteClientTransaction.");
        const w = ue.initialDialogStateForUserAgentServer(this.message, this.toTag);
        this.confirmedDialog = new Se(d, this.core, w);
      }
    const t = this.message.getHeaders("record-route").map((d) => `Record-Route: ${d}`), r = `Contact: ${this.core.configuration.contact.toString()}`, s = "Allow: " + se.toString();
    if (!e.body) {
      if (this.confirmedDialog.signalingState === T.Stable)
        e.body = this.confirmedDialog.answer;
      else if (this.confirmedDialog.signalingState === T.Initial || this.confirmedDialog.signalingState === T.HaveRemoteOffer)
        throw new Error("Response must have a body.");
    }
    e.statusCode = e.statusCode || 200, e.extraHeaders = e.extraHeaders || [], e.extraHeaders = e.extraHeaders.concat(t), e.extraHeaders.push(s), e.extraHeaders.push(r);
    const i = super.accept(e), n = this.confirmedDialog, o = Object.assign(Object.assign({}, i), { session: n });
    return e.body && this.confirmedDialog.signalingState !== T.Stable && this.confirmedDialog.signalingStateTransition(e.body), o;
  }
  /**
   * 13.3.1.1 Progress
   * If the UAS is not able to answer the invitation immediately, it can
   * choose to indicate some kind of progress to the UAC (for example, an
   * indication that a phone is ringing).  This is accomplished with a
   * provisional response between 101 and 199.  These provisional
   * responses establish early dialogs and therefore follow the procedures
   * of Section 12.1.1 in addition to those of Section 8.2.6.  A UAS MAY
   * send as many provisional responses as it likes.  Each of these MUST
   * indicate the same dialog ID.  However, these will not be delivered
   * reliably.
   *
   * If the UAS desires an extended period of time to answer the INVITE,
   * it will need to ask for an "extension" in order to prevent proxies
   * from canceling the transaction.  A proxy has the option of canceling
   * a transaction when there is a gap of 3 minutes between responses in a
   * transaction.  To prevent cancellation, the UAS MUST send a non-100
   * provisional response at every minute, to handle the possibility of
   * lost provisional responses.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.1
   * @param options - Progress options bucket.
   */
  progress(e = { statusCode: 180 }) {
    if (!this.progressable)
      throw new re(`${this.message.method} not progressable in state ${this.transaction.state}.`);
    if (!this.earlyDialog) {
      const o = this.transaction;
      if (!(o instanceof N))
        throw new Error("Transaction not instance of InviteClientTransaction.");
      const d = ue.initialDialogStateForUserAgentServer(this.message, this.toTag, !0);
      this.earlyDialog = new Se(o, this.core, d);
    }
    const t = this.message.getHeaders("record-route").map((o) => `Record-Route: ${o}`), r = `Contact: ${this.core.configuration.contact}`;
    e.extraHeaders = e.extraHeaders || [], e.extraHeaders = e.extraHeaders.concat(t), e.extraHeaders.push(r);
    const s = super.progress(e), i = this.earlyDialog, n = Object.assign(Object.assign({}, s), { session: i });
    return e.body && this.earlyDialog.signalingState !== T.Stable && this.earlyDialog.signalingStateTransition(e.body), n;
  }
  /**
   * 13.3.1.2 The INVITE is Redirected
   * If the UAS decides to redirect the call, a 3xx response is sent.  A
   * 300 (Multiple Choices), 301 (Moved Permanently) or 302 (Moved
   * Temporarily) response SHOULD contain a Contact header field
   * containing one or more URIs of new addresses to be tried.  The
   * response is passed to the INVITE server transaction, which will deal
   * with its retransmissions.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.2
   * @param contacts - Contacts to redirect to.
   * @param options - Redirect options bucket.
   */
  redirect(e, t = { statusCode: 302 }) {
    return super.redirect(e, t);
  }
  /**
   * 13.3.1.3 The INVITE is Rejected
   * A common scenario occurs when the callee is currently not willing or
   * able to take additional calls at this end system.  A 486 (Busy Here)
   * SHOULD be returned in such a scenario.
   * https://tools.ietf.org/html/rfc3261#section-13.3.1.3
   * @param options - Reject options bucket.
   */
  reject(e = { statusCode: 486 }) {
    return super.reject(e);
  }
}
class Ot extends F {
  constructor(e, t, r) {
    super(j, e, t, r);
  }
}
class Nt extends F {
  constructor(e, t, r) {
    super(j, e, t, r);
  }
}
class Ut extends z {
  constructor(e, t, r) {
    super(U, e, t, r), this.core = e;
  }
}
class jt extends F {
  constructor(e, t, r) {
    const s = e.createOutgoingRequestMessage(b.SUBSCRIBE, r);
    super(j, e.userAgentCore, s, t), this.dialog = e;
  }
  waitNotifyStop() {
  }
  /**
   * Receive a response from the transaction layer.
   * @param message - Incoming response message.
   */
  receiveResponse(e) {
    if (e.statusCode && e.statusCode >= 200 && e.statusCode < 300) {
      const t = e.getHeader("Expires");
      if (!t)
        this.logger.warn("Expires header missing in a 200-class response to SUBSCRIBE");
      else {
        const r = Number(t);
        this.dialog.subscriptionExpires > r && (this.dialog.subscriptionExpires = r);
      }
    }
    e.statusCode && e.statusCode >= 400 && e.statusCode < 700 && [404, 405, 410, 416, 480, 481, 482, 483, 484, 485, 489, 501, 604].includes(e.statusCode) && this.dialog.terminate(), super.receiveResponse(e);
  }
}
class Le extends ue {
  constructor(e, t, r, s, i, n) {
    super(s, i), this.delegate = n, this._autoRefresh = !1, this._subscriptionEvent = e, this._subscriptionExpires = t, this._subscriptionExpiresInitial = t, this._subscriptionExpiresLastSet = Math.floor(Date.now() / 1e3), this._subscriptionRefresh = void 0, this._subscriptionRefreshLastSet = void 0, this._subscriptionState = r, this.logger = s.loggerFactory.getLogger("sip.subscribe-dialog"), this.logger.log(`SUBSCRIBE dialog ${this.id} constructed`);
  }
  /**
   * When a UAC receives a response that establishes a dialog, it
   * constructs the state of the dialog.  This state MUST be maintained
   * for the duration of the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.1.2
   * @param outgoingRequestMessage - Outgoing request message for dialog.
   * @param incomingResponseMessage - Incoming response message creating dialog.
   */
  static initialDialogStateForSubscription(e, t) {
    const s = t.getHeaders("record-route"), i = t.parseHeader("contact");
    if (!i)
      throw new Error("Contact undefined.");
    if (!(i instanceof O))
      throw new Error("Contact not instance of NameAddrHeader.");
    const n = i.uri, o = e.cseq, d = void 0, w = e.callId, f = e.fromTag, m = t.fromTag;
    if (!w)
      throw new Error("Call id undefined.");
    if (!f)
      throw new Error("From tag undefined.");
    if (!m)
      throw new Error("To tag undefined.");
    if (!e.from)
      throw new Error("From undefined.");
    if (!e.to)
      throw new Error("To undefined.");
    const E = e.from.uri, I = e.to.uri;
    return {
      id: w + f + m,
      early: !1,
      callId: w,
      localTag: f,
      remoteTag: m,
      localSequenceNumber: o,
      remoteSequenceNumber: d,
      localURI: E,
      remoteURI: I,
      remoteTarget: n,
      routeSet: s,
      secure: !1
    };
  }
  dispose() {
    super.dispose(), this.N && (clearTimeout(this.N), this.N = void 0), this.refreshTimerClear(), this.logger.log(`SUBSCRIBE dialog ${this.id} destroyed`);
  }
  get autoRefresh() {
    return this._autoRefresh;
  }
  set autoRefresh(e) {
    this._autoRefresh = !0, this.refreshTimerSet();
  }
  get subscriptionEvent() {
    return this._subscriptionEvent;
  }
  /** Number of seconds until subscription expires. */
  get subscriptionExpires() {
    const e = Math.floor(Date.now() / 1e3) - this._subscriptionExpiresLastSet, t = this._subscriptionExpires - e;
    return Math.max(t, 0);
  }
  set subscriptionExpires(e) {
    if (e < 0)
      throw new Error("Expires must be greater than or equal to zero.");
    if (this._subscriptionExpires = e, this._subscriptionExpiresLastSet = Math.floor(Date.now() / 1e3), this.autoRefresh) {
      const t = this.subscriptionRefresh;
      (t === void 0 || t >= e) && this.refreshTimerSet();
    }
  }
  get subscriptionExpiresInitial() {
    return this._subscriptionExpiresInitial;
  }
  /** Number of seconds until subscription auto refresh. */
  get subscriptionRefresh() {
    if (this._subscriptionRefresh === void 0 || this._subscriptionRefreshLastSet === void 0)
      return;
    const e = Math.floor(Date.now() / 1e3) - this._subscriptionRefreshLastSet, t = this._subscriptionRefresh - e;
    return Math.max(t, 0);
  }
  get subscriptionState() {
    return this._subscriptionState;
  }
  /**
   * Receive in dialog request message from transport.
   * @param message -  The incoming request message.
   */
  receiveRequest(e) {
    if (this.logger.log(`SUBSCRIBE dialog ${this.id} received ${e.method} request`), !this.sequenceGuard(e)) {
      this.logger.log(`SUBSCRIBE dialog ${this.id} rejected out of order ${e.method} request.`);
      return;
    }
    switch (super.receiveRequest(e), e.method) {
      case b.NOTIFY:
        this.onNotify(e);
        break;
      default:
        this.logger.log(`SUBSCRIBE dialog ${this.id} received unimplemented ${e.method} request`), this.core.replyStateless(e, { statusCode: 501 });
        break;
    }
  }
  /**
   * 4.1.2.2.  Refreshing of Subscriptions
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
   */
  refresh() {
    const e = "Allow: " + se.toString(), t = {};
    return t.extraHeaders = (t.extraHeaders || []).slice(), t.extraHeaders.push(e), t.extraHeaders.push("Event: " + this.subscriptionEvent), t.extraHeaders.push("Expires: " + this.subscriptionExpiresInitial), t.extraHeaders.push("Contact: " + this.core.configuration.contact.toString()), this.subscribe(void 0, t);
  }
  /**
   * 4.1.2.2.  Refreshing of Subscriptions
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
   * @param delegate - Delegate to handle responses.
   * @param options - Options bucket.
   */
  subscribe(e, t = {}) {
    var r;
    if (this.subscriptionState !== C.Pending && this.subscriptionState !== C.Active)
      throw new Error(`Invalid state ${this.subscriptionState}. May only re-subscribe while in state "pending" or "active".`);
    this.logger.log(`SUBSCRIBE dialog ${this.id} sending SUBSCRIBE request`);
    const s = new jt(this, e, t);
    return this.N && (clearTimeout(this.N), this.N = void 0), !((r = t.extraHeaders) === null || r === void 0) && r.includes("Expires: 0") || (this.N = setTimeout(() => this.timerN(), q.TIMER_N)), s;
  }
  /**
   * 4.4.1.  Dialog Creation and Termination
   * A subscription is destroyed after a notifier sends a NOTIFY request
   * with a "Subscription-State" of "terminated", or in certain error
   * situations described elsewhere in this document.
   * https://tools.ietf.org/html/rfc6665#section-4.4.1
   */
  terminate() {
    this.stateTransition(C.Terminated), this.onTerminated();
  }
  /**
   * 4.1.2.3.  Unsubscribing
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.3
   */
  unsubscribe() {
    const e = "Allow: " + se.toString(), t = {};
    return t.extraHeaders = (t.extraHeaders || []).slice(), t.extraHeaders.push(e), t.extraHeaders.push("Event: " + this.subscriptionEvent), t.extraHeaders.push("Expires: 0"), t.extraHeaders.push("Contact: " + this.core.configuration.contact.toString()), this.subscribe(void 0, t);
  }
  /**
   * Handle in dialog NOTIFY requests.
   * This does not include the first NOTIFY which created the dialog.
   * @param message - The incoming NOTIFY request message.
   */
  onNotify(e) {
    const t = e.parseHeader("Event").event;
    if (!t || t !== this.subscriptionEvent) {
      this.core.replyStateless(e, { statusCode: 489 });
      return;
    }
    this.N && (clearTimeout(this.N), this.N = void 0);
    const r = e.parseHeader("Subscription-State");
    if (!r || !r.state) {
      this.core.replyStateless(e, { statusCode: 489 });
      return;
    }
    const s = r.state, i = r.expires ? Math.max(r.expires, 0) : void 0;
    switch (s) {
      case "pending":
        this.stateTransition(C.Pending, i);
        break;
      case "active":
        this.stateTransition(C.Active, i);
        break;
      case "terminated":
        this.stateTransition(C.Terminated, i);
        break;
      default:
        this.logger.warn("Unrecognized subscription state.");
        break;
    }
    const n = new ye(this, e);
    this.delegate && this.delegate.onNotify ? this.delegate.onNotify(n) : n.accept();
  }
  onRefresh(e) {
    this.delegate && this.delegate.onRefresh && this.delegate.onRefresh(e);
  }
  onTerminated() {
    this.delegate && this.delegate.onTerminated && this.delegate.onTerminated();
  }
  refreshTimerClear() {
    this.refreshTimer && (clearTimeout(this.refreshTimer), this.refreshTimer = void 0);
  }
  refreshTimerSet() {
    if (this.refreshTimerClear(), this.autoRefresh && this.subscriptionExpires > 0) {
      const e = this.subscriptionExpires * 900;
      this._subscriptionRefresh = Math.floor(e / 1e3), this._subscriptionRefreshLastSet = Math.floor(Date.now() / 1e3), this.refreshTimer = setTimeout(() => {
        this.refreshTimer = void 0, this._subscriptionRefresh = void 0, this._subscriptionRefreshLastSet = void 0, this.onRefresh(this.refresh());
      }, e);
    }
  }
  stateTransition(e, t) {
    const r = () => {
      this.logger.warn(`Invalid subscription state transition from ${this.subscriptionState} to ${e}`);
    };
    switch (e) {
      case C.Initial:
        r();
        return;
      case C.NotifyWait:
        r();
        return;
      case C.Pending:
        if (this.subscriptionState !== C.NotifyWait && this.subscriptionState !== C.Pending) {
          r();
          return;
        }
        break;
      case C.Active:
        if (this.subscriptionState !== C.NotifyWait && this.subscriptionState !== C.Pending && this.subscriptionState !== C.Active) {
          r();
          return;
        }
        break;
      case C.Terminated:
        if (this.subscriptionState !== C.NotifyWait && this.subscriptionState !== C.Pending && this.subscriptionState !== C.Active) {
          r();
          return;
        }
        break;
      default:
        r();
        return;
    }
    e === C.Pending && t && (this.subscriptionExpires = t), e === C.Active && t && (this.subscriptionExpires = t), e === C.Terminated && this.dispose(), this._subscriptionState = e;
  }
  /**
   * When refreshing a subscription, a subscriber starts Timer N, set to
   * 64*T1, when it sends the SUBSCRIBE request.  If this Timer N expires
   * prior to the receipt of a NOTIFY request, the subscriber considers
   * the subscription terminated.  If the subscriber receives a success
   * response to the SUBSCRIBE request that indicates that no NOTIFY
   * request will be generated -- such as the 204 response defined for use
   * with the optional extension described in [RFC5839] -- then it MUST
   * cancel Timer N.
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
   */
  timerN() {
    this.logger.warn("Timer N expired for SUBSCRIBE dialog. Timed out waiting for NOTIFY."), this.subscriptionState !== C.Terminated && (this.stateTransition(C.Terminated), this.onTerminated());
  }
}
class Bt extends F {
  constructor(e, t, r) {
    const s = t.getHeader("Event");
    if (!s)
      throw new Error("Event undefined");
    const i = t.getHeader("Expires");
    if (!i)
      throw new Error("Expires undefined");
    super(j, e, t, r), this.delegate = r, this.subscriberId = t.callId + t.fromTag + s, this.subscriptionExpiresRequested = this.subscriptionExpires = Number(i), this.subscriptionEvent = s, this.subscriptionState = C.NotifyWait, this.waitNotifyStart();
  }
  /**
   * Destructor.
   * Note that Timer N may live on waiting for an initial NOTIFY and
   * the delegate may still receive that NOTIFY. If you don't want
   * that behavior then either clear the delegate so the delegate
   * doesn't get called (a 200 will be sent in response to the NOTIFY)
   * or call `waitNotifyStop` which will clear Timer N and remove this
   * UAC from the core (a 481 will be sent in response to the NOTIFY).
   */
  dispose() {
    super.dispose();
  }
  /**
   * Handle out of dialog NOTIFY associated with SUBSCRIBE request.
   * This is the first NOTIFY received after the SUBSCRIBE request.
   * @param uas - User agent server handling the subscription creating NOTIFY.
   */
  onNotify(e) {
    const t = e.message.parseHeader("Event").event;
    if (!t || t !== this.subscriptionEvent) {
      this.logger.warn("Failed to parse event."), e.reject({ statusCode: 489 });
      return;
    }
    const r = e.message.parseHeader("Subscription-State");
    if (!r || !r.state) {
      this.logger.warn("Failed to parse subscription state."), e.reject({ statusCode: 489 });
      return;
    }
    const s = r.state;
    switch (s) {
      case "pending":
        break;
      case "active":
        break;
      case "terminated":
        break;
      default:
        this.logger.warn(`Invalid subscription state ${s}`), e.reject({ statusCode: 489 });
        return;
    }
    if (s !== "terminated" && !e.message.parseHeader("contact")) {
      this.logger.warn("Failed to parse contact."), e.reject({ statusCode: 489 });
      return;
    }
    if (this.dialog)
      throw new Error("Dialog already created. This implementation only supports install of single subscriptions.");
    switch (this.waitNotifyStop(), this.subscriptionExpires = r.expires ? Math.min(this.subscriptionExpires, Math.max(r.expires, 0)) : this.subscriptionExpires, s) {
      case "pending":
        this.subscriptionState = C.Pending;
        break;
      case "active":
        this.subscriptionState = C.Active;
        break;
      case "terminated":
        this.subscriptionState = C.Terminated;
        break;
      default:
        throw new Error(`Unrecognized state ${s}.`);
    }
    if (this.subscriptionState !== C.Terminated) {
      const i = Le.initialDialogStateForSubscription(this.message, e.message);
      this.dialog = new Le(this.subscriptionEvent, this.subscriptionExpires, this.subscriptionState, this.core, i);
    }
    if (this.delegate && this.delegate.onNotify) {
      const i = e, n = this.dialog;
      this.delegate.onNotify({ request: i, subscription: n });
    } else
      e.accept();
  }
  waitNotifyStart() {
    this.N || (this.core.subscribers.set(this.subscriberId, this), this.N = setTimeout(() => this.timerN(), q.TIMER_N));
  }
  waitNotifyStop() {
    this.N && (this.core.subscribers.delete(this.subscriberId), clearTimeout(this.N), this.N = void 0);
  }
  /**
   * Receive a response from the transaction layer.
   * @param message - Incoming response message.
   */
  receiveResponse(e) {
    if (this.authenticationGuard(e)) {
      if (e.statusCode && e.statusCode >= 200 && e.statusCode < 300) {
        const t = e.getHeader("Expires");
        if (!t)
          this.logger.warn("Expires header missing in a 200-class response to SUBSCRIBE");
        else {
          const r = Number(t);
          r > this.subscriptionExpiresRequested && this.logger.warn("Expires header in a 200-class response to SUBSCRIBE with a higher value than the one in the request"), r < this.subscriptionExpires && (this.subscriptionExpires = r);
        }
        this.dialog && this.dialog.subscriptionExpires > this.subscriptionExpires && (this.dialog.subscriptionExpires = this.subscriptionExpires);
      }
      e.statusCode && e.statusCode >= 300 && e.statusCode < 700 && this.waitNotifyStop(), super.receiveResponse(e);
    }
  }
  /**
   * To ensure that subscribers do not wait indefinitely for a
   * subscription to be established, a subscriber starts a Timer N, set to
   * 64*T1, when it sends a SUBSCRIBE request.  If this Timer N expires
   * prior to the receipt of a NOTIFY request, the subscriber considers
   * the subscription failed, and cleans up any state associated with the
   * subscription attempt.
   * https://tools.ietf.org/html/rfc6665#section-4.1.2.4
   */
  timerN() {
    this.logger.warn("Timer N expired for SUBSCRIBE user agent client. Timed out waiting for NOTIFY."), this.waitNotifyStop(), this.delegate && this.delegate.onNotifyTimeout && this.delegate.onNotifyTimeout();
  }
}
class Lt extends z {
  constructor(e, t, r) {
    super(U, e, t, r), this.core = e;
  }
}
const Ve = ["application/sdp", "application/dtmf-relay"];
class Vt {
  /**
   * Constructor.
   * @param configuration - Configuration.
   * @param delegate - Delegate.
   */
  constructor(e, t = {}) {
    this.userAgentClients = /* @__PURE__ */ new Map(), this.userAgentServers = /* @__PURE__ */ new Map(), this.configuration = e, this.delegate = t, this.dialogs = /* @__PURE__ */ new Map(), this.subscribers = /* @__PURE__ */ new Map(), this.logger = e.loggerFactory.getLogger("sip.user-agent-core");
  }
  /** Destructor. */
  dispose() {
    this.reset();
  }
  /** Reset. */
  reset() {
    this.dialogs.forEach((e) => e.dispose()), this.dialogs.clear(), this.subscribers.forEach((e) => e.dispose()), this.subscribers.clear(), this.userAgentClients.forEach((e) => e.dispose()), this.userAgentClients.clear(), this.userAgentServers.forEach((e) => e.dispose()), this.userAgentServers.clear();
  }
  /** Logger factory. */
  get loggerFactory() {
    return this.configuration.loggerFactory;
  }
  /** Transport. */
  get transport() {
    const e = this.configuration.transportAccessor();
    if (!e)
      throw new Error("Transport undefined.");
    return e;
  }
  /**
   * Send INVITE.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  invite(e, t) {
    return new Mt(this, e, t);
  }
  /**
   * Send MESSAGE.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  message(e, t) {
    return new Qe(this, e, t);
  }
  /**
   * Send PUBLISH.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  publish(e, t) {
    return new Ot(this, e, t);
  }
  /**
   * Send REGISTER.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  register(e, t) {
    return new Nt(this, e, t);
  }
  /**
   * Send SUBSCRIBE.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  subscribe(e, t) {
    return new Bt(this, e, t);
  }
  /**
   * Send a request.
   * @param request - Outgoing request.
   * @param delegate - Request delegate.
   */
  request(e, t) {
    return new F(j, this, e, t);
  }
  /**
   * Outgoing request message factory function.
   * @param method - Method.
   * @param requestURI - Request-URI.
   * @param fromURI - From URI.
   * @param toURI - To URI.
   * @param options - Request options.
   * @param extraHeaders - Extra headers to add.
   * @param body - Message body.
   */
  makeOutgoingRequestMessage(e, t, r, s, i, n, o) {
    const d = this.configuration.sipjsId, w = this.configuration.displayName, f = this.configuration.viaForceRport, m = this.configuration.hackViaTcp, E = this.configuration.supportedOptionTags.slice();
    e === b.REGISTER && E.push("path", "gruu"), e === b.INVITE && (this.configuration.contact.pubGruu || this.configuration.contact.tempGruu) && E.push("gruu");
    const I = this.configuration.routeSet, D = this.configuration.userAgentHeaderFieldValue, S = this.configuration.viaHost, g = Object.assign(Object.assign({}, {
      callIdPrefix: d,
      forceRport: f,
      fromDisplayName: w,
      hackViaTcp: m,
      optionTags: E,
      routeSet: I,
      userAgentString: D,
      viaHost: S
    }), i);
    return new oe(e, t, r, s, g, n, o);
  }
  /**
   * Handle an incoming request message from the transport.
   * @param message - Incoming request message from transport layer.
   */
  receiveIncomingRequestFromTransport(e) {
    this.receiveRequestFromTransport(e);
  }
  /**
   * Handle an incoming response message from the transport.
   * @param message - Incoming response message from transport layer.
   */
  receiveIncomingResponseFromTransport(e) {
    this.receiveResponseFromTransport(e);
  }
  /**
   * A stateless UAS is a UAS that does not maintain transaction state.
   * It replies to requests normally, but discards any state that would
   * ordinarily be retained by a UAS after a response has been sent.  If a
   * stateless UAS receives a retransmission of a request, it regenerates
   * the response and re-sends it, just as if it were replying to the first
   * instance of the request. A UAS cannot be stateless unless the request
   * processing for that method would always result in the same response
   * if the requests are identical. This rules out stateless registrars,
   * for example.  Stateless UASs do not use a transaction layer; they
   * receive requests directly from the transport layer and send responses
   * directly to the transport layer.
   * https://tools.ietf.org/html/rfc3261#section-8.2.7
   * @param message - Incoming request message to reply to.
   * @param statusCode - Status code to reply with.
   */
  replyStateless(e, t) {
    const r = this.configuration.userAgentHeaderFieldValue, s = this.configuration.supportedOptionTagsResponse;
    t = Object.assign(Object.assign({}, t), { userAgent: r, supported: s });
    const i = Je(e, t);
    return this.transport.send(i.message).catch((n) => {
      n instanceof Error && this.logger.error(n.message), this.logger.error(`Transport error occurred sending stateless reply to ${e.method} request.`);
    }), i;
  }
  /**
   * In Section 18.2.1, replace the last paragraph with:
   *
   * Next, the server transport attempts to match the request to a
   * server transaction.  It does so using the matching rules described
   * in Section 17.2.3.  If a matching server transaction is found, the
   * request is passed to that transaction for processing.  If no match
   * is found, the request is passed to the core, which may decide to
   * construct a new server transaction for that request.
   * https://tools.ietf.org/html/rfc6026#section-8.10
   * @param message - Incoming request message from transport layer.
   */
  receiveRequestFromTransport(e) {
    const t = e.viaBranch, r = this.userAgentServers.get(t);
    if (e.method === b.ACK && r && r.transaction.state === u.Accepted && r instanceof ke) {
      this.logger.warn(`Discarding out of dialog ACK after 2xx response sent on transaction ${t}.`);
      return;
    }
    if (e.method === b.CANCEL) {
      r ? (this.replyStateless(e, { statusCode: 200 }), r.transaction instanceof N && r.transaction.state === u.Proceeding && r instanceof ke && r.receiveCancel(e)) : this.replyStateless(e, { statusCode: 481 });
      return;
    }
    if (r) {
      r.transaction.receiveRequest(e);
      return;
    }
    this.receiveRequest(e);
  }
  /**
   * UAC and UAS procedures depend strongly on two factors.  First, based
   * on whether the request or response is inside or outside of a dialog,
   * and second, based on the method of a request.  Dialogs are discussed
   * thoroughly in Section 12; they represent a peer-to-peer relationship
   * between user agents and are established by specific SIP methods, such
   * as INVITE.
   * @param message - Incoming request message.
   */
  receiveRequest(e) {
    if (!se.includes(e.method)) {
      const s = "Allow: " + se.toString();
      this.replyStateless(e, {
        statusCode: 405,
        extraHeaders: [s]
      });
      return;
    }
    if (!e.ruri)
      throw new Error("Request-URI undefined.");
    if (e.ruri.scheme !== "sip") {
      this.replyStateless(e, { statusCode: 416 });
      return;
    }
    const t = e.ruri, r = (s) => !!s && s.user === t.user;
    if (!r(this.configuration.aor) && !(r(this.configuration.contact.uri) || r(this.configuration.contact.pubGruu) || r(this.configuration.contact.tempGruu))) {
      this.logger.warn("Request-URI does not point to us."), e.method !== b.ACK && this.replyStateless(e, { statusCode: 404 });
      return;
    }
    if (e.method === b.INVITE && !e.hasHeader("Contact")) {
      this.replyStateless(e, {
        statusCode: 400,
        reasonPhrase: "Missing Contact Header"
      });
      return;
    }
    if (!e.toTag) {
      const s = e.viaBranch;
      if (!this.userAgentServers.has(s) && Array.from(this.userAgentServers.values()).some((n) => n.transaction.request.fromTag === e.fromTag && n.transaction.request.callId === e.callId && n.transaction.request.cseq === e.cseq)) {
        this.replyStateless(e, { statusCode: 482 });
        return;
      }
    }
    e.toTag ? this.receiveInsideDialogRequest(e) : this.receiveOutsideDialogRequest(e);
  }
  /**
   * Once a dialog has been established between two UAs, either of them
   * MAY initiate new transactions as needed within the dialog.  The UA
   * sending the request will take the UAC role for the transaction.  The
   * UA receiving the request will take the UAS role.  Note that these may
   * be different roles than the UAs held during the transaction that
   * established the dialog.
   * https://tools.ietf.org/html/rfc3261#section-12.2
   * @param message - Incoming request message.
   */
  receiveInsideDialogRequest(e) {
    if (e.method === b.NOTIFY) {
      const s = e.parseHeader("Event");
      if (!s || !s.event) {
        this.replyStateless(e, { statusCode: 489 });
        return;
      }
      const i = e.callId + e.toTag + s.event, n = this.subscribers.get(i);
      if (n) {
        const o = new ye(this, e);
        n.onNotify(o);
        return;
      }
    }
    const t = e.callId + e.toTag + e.fromTag, r = this.dialogs.get(t);
    if (r) {
      if (e.method === b.OPTIONS) {
        const s = "Allow: " + se.toString(), i = "Accept: " + Ve.toString();
        this.replyStateless(e, {
          statusCode: 200,
          extraHeaders: [s, i]
        });
        return;
      }
      r.receiveRequest(e);
      return;
    }
    e.method !== b.ACK && this.replyStateless(e, { statusCode: 481 });
  }
  /**
   * Assuming all of the checks in the previous subsections are passed,
   * the UAS processing becomes method-specific.
   *  https://tools.ietf.org/html/rfc3261#section-8.2.5
   * @param message - Incoming request message.
   */
  receiveOutsideDialogRequest(e) {
    switch (e.method) {
      case b.ACK:
        break;
      case b.BYE:
        this.replyStateless(e, { statusCode: 481 });
        break;
      case b.CANCEL:
        throw new Error(`Unexpected out of dialog request method ${e.method}.`);
      case b.INFO:
        this.replyStateless(e, { statusCode: 405 });
        break;
      case b.INVITE:
        {
          const t = new ke(this, e);
          this.delegate.onInvite ? this.delegate.onInvite(t) : t.reject();
        }
        break;
      case b.MESSAGE:
        {
          const t = new et(this, e);
          this.delegate.onMessage ? this.delegate.onMessage(t) : t.accept();
        }
        break;
      case b.NOTIFY:
        {
          const t = new ye(this, e);
          this.delegate.onNotify ? this.delegate.onNotify(t) : t.reject({ statusCode: 405 });
        }
        break;
      case b.OPTIONS:
        {
          const t = "Allow: " + se.toString(), r = "Accept: " + Ve.toString();
          this.replyStateless(e, {
            statusCode: 200,
            extraHeaders: [t, r]
          });
        }
        break;
      case b.REFER:
        {
          const t = new tt(this, e);
          this.delegate.onRefer ? this.delegate.onRefer(t) : t.reject({ statusCode: 405 });
        }
        break;
      case b.REGISTER:
        {
          const t = new Ut(this, e);
          this.delegate.onRegister ? this.delegate.onRegister(t) : t.reject({ statusCode: 405 });
        }
        break;
      case b.SUBSCRIBE:
        {
          const t = new Lt(this, e);
          this.delegate.onSubscribe ? this.delegate.onSubscribe(t) : t.reject({ statusCode: 480 });
        }
        break;
      default:
        throw new Error(`Unexpected out of dialog request method ${e.method}.`);
    }
  }
  /**
   * Responses are first processed by the transport layer and then passed
   * up to the transaction layer.  The transaction layer performs its
   * processing and then passes the response up to the TU.  The majority
   * of response processing in the TU is method specific.  However, there
   * are some general behaviors independent of the method.
   * https://tools.ietf.org/html/rfc3261#section-8.1.3
   * @param message - Incoming response message from transport layer.
   */
  receiveResponseFromTransport(e) {
    if (e.getHeaders("via").length > 1) {
      this.logger.warn("More than one Via header field present in the response, dropping");
      return;
    }
    const t = e.viaBranch + e.method, r = this.userAgentClients.get(t);
    r ? r.transaction.receiveResponse(e) : this.logger.warn(`Discarding unmatched ${e.statusCode} response to ${e.method} ${t}.`);
  }
}
function Gt() {
  return (a) => !a.audio && !a.video ? Promise.resolve(new MediaStream()) : navigator.mediaDevices === void 0 ? Promise.reject(new Error("Media devices not available in insecure contexts.")) : navigator.mediaDevices.getUserMedia.call(navigator.mediaDevices, a);
}
function Kt() {
  return {
    bundlePolicy: "balanced",
    certificates: void 0,
    iceCandidatePoolSize: 0,
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    iceTransportPolicy: "all",
    rtcpMuxPolicy: "require"
  };
}
class M {
  /**
   * Constructor
   * @param logger - A logger
   * @param mediaStreamFactory - A factory to provide a MediaStream
   * @param options - Options passed from the SessionDescriptionHandleFactory
   */
  constructor(e, t, r) {
    e.debug("SessionDescriptionHandler.constructor"), this.logger = e, this.mediaStreamFactory = t, this.sessionDescriptionHandlerConfiguration = r, this._localMediaStream = new MediaStream(), this._remoteMediaStream = new MediaStream(), this._peerConnection = new RTCPeerConnection(r == null ? void 0 : r.peerConnectionConfiguration), this.initPeerConnectionEventHandlers();
  }
  /**
   * The local media stream currently being sent.
   *
   * @remarks
   * The local media stream initially has no tracks, so the presence of tracks
   * should not be assumed. Furthermore, tracks may be added or removed if the
   * local media changes - for example, on upgrade from audio only to a video session.
   * At any given time there will be at most one audio track and one video track
   * (it's possible that this restriction may not apply to sub-classes).
   * Use `MediaStream.onaddtrack` or add a listener for the `addtrack` event
   * to detect when a new track becomes available:
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
   */
  get localMediaStream() {
    return this._localMediaStream;
  }
  /**
   * The remote media stream currently being received.
   *
   * @remarks
   * The remote media stream initially has no tracks, so the presence of tracks
   * should not be assumed. Furthermore, tracks may be added or removed if the
   * remote media changes - for example, on upgrade from audio only to a video session.
   * At any given time there will be at most one audio track and one video track
   * (it's possible that this restriction may not apply to sub-classes).
   * Use `MediaStream.onaddtrack` or add a listener for the `addtrack` event
   * to detect when a new track becomes available:
   * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
   */
  get remoteMediaStream() {
    return this._remoteMediaStream;
  }
  /**
   * The data channel. Undefined before it is created.
   */
  get dataChannel() {
    return this._dataChannel;
  }
  /**
   * The peer connection. Undefined if peer connection has closed.
   *
   * @remarks
   * Use the peerConnectionDelegate to get access to the events associated
   * with the RTCPeerConnection. For example...
   *
   * Do NOT do this...
   * ```ts
   * peerConnection.onicecandidate = (event) => {
   *   // do something
   * };
   * ```
   * Instead, do this...
   * ```ts
   * peerConnection.peerConnectionDelegate = {
   *   onicecandidate: (event) => {
   *     // do something
   *   }
   * };
   * ```
   * While access to the underlying `RTCPeerConnection` is provided, note that
   * using methods which modify it may break the operation of this class.
   * In particular, this class depends on exclusive access to the
   * event handler properties. If you need access to the peer connection
   * events, either register for events using `addEventListener()` on
   * the `RTCPeerConnection` or set the `peerConnectionDelegate` on
   * this `SessionDescriptionHandler`.
   */
  get peerConnection() {
    return this._peerConnection;
  }
  /**
   * A delegate which provides access to the peer connection event handlers.
   *
   * @remarks
   * Use the peerConnectionDelegate to get access to the events associated
   * with the RTCPeerConnection. For example...
   *
   * Do NOT do this...
   * ```ts
   * peerConnection.onicecandidate = (event) => {
   *   // do something
   * };
   * ```
   * Instead, do this...
   * ```
   * peerConnection.peerConnectionDelegate = {
   *   onicecandidate: (event) => {
   *     // do something
   *   }
   * };
   * ```
   * Setting the peer connection event handlers directly is not supported
   * and may break this class. As this class depends on exclusive access
   * to them. This delegate is intended to provide access to the
   * RTCPeerConnection events in a fashion which is supported.
   */
  get peerConnectionDelegate() {
    return this._peerConnectionDelegate;
  }
  set peerConnectionDelegate(e) {
    this._peerConnectionDelegate = e;
  }
  // The addtrack event does not get fired when JavaScript code explicitly adds tracks to the stream (by calling addTrack()).
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
  static dispatchAddTrackEvent(e, t) {
    e.dispatchEvent(new MediaStreamTrackEvent("addtrack", { track: t }));
  }
  // The removetrack event does not get fired when JavaScript code explicitly removes tracks from the stream (by calling removeTrack()).
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onremovetrack
  static dispatchRemoveTrackEvent(e, t) {
    e.dispatchEvent(new MediaStreamTrackEvent("removetrack", { track: t }));
  }
  /**
   * Stop tracks and close peer connection.
   */
  close() {
    this.logger.debug("SessionDescriptionHandler.close"), this._peerConnection !== void 0 && (this._peerConnection.getReceivers().forEach((e) => {
      e.track && e.track.stop();
    }), this._peerConnection.getSenders().forEach((e) => {
      e.track && e.track.stop();
    }), this._dataChannel && this._dataChannel.close(), this._peerConnection.close(), this._peerConnection = void 0);
  }
  /**
   * Helper function to enable/disable media tracks.
   * @param enable - If true enable tracks, otherwise disable tracks.
   */
  enableReceiverTracks(e) {
    const t = this.peerConnection;
    if (!t)
      throw new Error("Peer connection closed.");
    t.getReceivers().forEach((r) => {
      r.track && (r.track.enabled = e);
    });
  }
  /**
   * Helper function to enable/disable media tracks.
   * @param enable - If true enable tracks, otherwise disable tracks.
   */
  enableSenderTracks(e) {
    const t = this.peerConnection;
    if (!t)
      throw new Error("Peer connection closed.");
    t.getSenders().forEach((r) => {
      r.track && (r.track.enabled = e);
    });
  }
  /**
   * Creates an offer or answer.
   * @param options - Options bucket.
   * @param modifiers - Modifiers.
   */
  getDescription(e, t) {
    var r, s;
    if (this.logger.debug("SessionDescriptionHandler.getDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    this.onDataChannel = e == null ? void 0 : e.onDataChannel;
    const i = (r = e == null ? void 0 : e.offerOptions) === null || r === void 0 ? void 0 : r.iceRestart, n = (e == null ? void 0 : e.iceGatheringTimeout) === void 0 ? (s = this.sessionDescriptionHandlerConfiguration) === null || s === void 0 ? void 0 : s.iceGatheringTimeout : e == null ? void 0 : e.iceGatheringTimeout;
    return this.getLocalMediaStream(e).then(() => this.updateDirection(e)).then(() => this.createDataChannel(e)).then(() => this.createLocalOfferOrAnswer(e)).then((o) => this.applyModifiers(o, t)).then((o) => this.setLocalSessionDescription(o)).then(() => this.waitForIceGatheringComplete(i, n)).then(() => this.getLocalSessionDescription()).then((o) => ({
      body: o.sdp,
      contentType: "application/sdp"
    })).catch((o) => {
      throw this.logger.error("SessionDescriptionHandler.getDescription failed - " + o), o;
    });
  }
  /**
   * Returns true if the SessionDescriptionHandler can handle the Content-Type described by a SIP message.
   * @param contentType - The content type that is in the SIP Message.
   */
  hasDescription(e) {
    return this.logger.debug("SessionDescriptionHandler.hasDescription"), e === "application/sdp";
  }
  /**
   * Called when ICE gathering completes and resolves any waiting promise.
   * @remarks
   * May be called prior to ICE gathering actually completing to allow the
   * session descirption handler proceed with whatever candidates have been
   * gathered up to this point in time. Use this to stop waiting on ICE to
   * complete if you are implementing your own ICE gathering completion strategy.
   */
  iceGatheringComplete() {
    this.logger.debug("SessionDescriptionHandler.iceGatheringComplete"), this.iceGatheringCompleteTimeoutId !== void 0 && (this.logger.debug("SessionDescriptionHandler.iceGatheringComplete - clearing timeout"), clearTimeout(this.iceGatheringCompleteTimeoutId), this.iceGatheringCompleteTimeoutId = void 0), this.iceGatheringCompletePromise !== void 0 && (this.logger.debug("SessionDescriptionHandler.iceGatheringComplete - resolving promise"), this.iceGatheringCompleteResolve && this.iceGatheringCompleteResolve(), this.iceGatheringCompletePromise = void 0, this.iceGatheringCompleteResolve = void 0, this.iceGatheringCompleteReject = void 0);
  }
  /**
   * Send DTMF via RTP (RFC 4733).
   * Returns true if DTMF send is successful, false otherwise.
   * @param tones - A string containing DTMF digits.
   * @param options - Options object to be used by sendDtmf.
   */
  sendDtmf(e, t) {
    if (this.logger.debug("SessionDescriptionHandler.sendDtmf"), this._peerConnection === void 0)
      return this.logger.error("SessionDescriptionHandler.sendDtmf failed - peer connection closed"), !1;
    const r = this._peerConnection.getSenders();
    if (r.length === 0)
      return this.logger.error("SessionDescriptionHandler.sendDtmf failed - no senders"), !1;
    const s = r[0].dtmf;
    if (!s)
      return this.logger.error("SessionDescriptionHandler.sendDtmf failed - no DTMF sender"), !1;
    const i = t == null ? void 0 : t.duration, n = t == null ? void 0 : t.interToneGap;
    try {
      s.insertDTMF(e, i, n);
    } catch (o) {
      return this.logger.error(o.toString()), !1;
    }
    return this.logger.log("SessionDescriptionHandler.sendDtmf sent via RTP: " + e.toString()), !0;
  }
  /**
   * Sets an offer or answer.
   * @param sdp - The session description.
   * @param options - Options bucket.
   * @param modifiers - Modifiers.
   */
  setDescription(e, t, r) {
    if (this.logger.debug("SessionDescriptionHandler.setDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    this.onDataChannel = t == null ? void 0 : t.onDataChannel;
    const s = this._peerConnection.signalingState === "have-local-offer" ? "answer" : "offer";
    return this.getLocalMediaStream(t).then(() => this.applyModifiers({ sdp: e, type: s }, r)).then((i) => this.setRemoteSessionDescription(i)).catch((i) => {
      throw this.logger.error("SessionDescriptionHandler.setDescription failed - " + i), i;
    });
  }
  /**
   * Applies modifiers to SDP prior to setting the local or remote description.
   * @param sdp - SDP to modify.
   * @param modifiers - Modifiers to apply.
   */
  applyModifiers(e, t) {
    return this.logger.debug("SessionDescriptionHandler.applyModifiers"), !t || t.length === 0 ? Promise.resolve(e) : t.reduce((r, s) => r.then(s), Promise.resolve(e)).then((r) => {
      if (this.logger.debug("SessionDescriptionHandler.applyModifiers - modified sdp"), !r.sdp || !r.type)
        throw new Error("Invalid SDP.");
      return { sdp: r.sdp, type: r.type };
    });
  }
  /**
   * Create a data channel.
   * @remarks
   * Only creates a data channel if SessionDescriptionHandlerOptions.dataChannel is true.
   * Only creates a data channel if creating a local offer.
   * Only if one does not already exist.
   * @param options - Session description handler options.
   */
  createDataChannel(e) {
    if (this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    if ((e == null ? void 0 : e.dataChannel) !== !0 || this._dataChannel)
      return Promise.resolve();
    switch (this._peerConnection.signalingState) {
      case "stable":
        this.logger.debug("SessionDescriptionHandler.createDataChannel - creating data channel");
        try {
          return this._dataChannel = this._peerConnection.createDataChannel((e == null ? void 0 : e.dataChannelLabel) || "", e == null ? void 0 : e.dataChannelOptions), this.onDataChannel && this.onDataChannel(this._dataChannel), Promise.resolve();
        } catch (t) {
          return Promise.reject(t);
        }
      case "have-remote-offer":
        return Promise.resolve();
      case "have-local-offer":
      case "have-local-pranswer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
  }
  /**
   * Depending on current signaling state, create a local offer or answer.
   * @param options - Session description handler options.
   */
  createLocalOfferOrAnswer(e) {
    if (this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    switch (this._peerConnection.signalingState) {
      case "stable":
        return this.logger.debug("SessionDescriptionHandler.createLocalOfferOrAnswer - creating SDP offer"), this._peerConnection.createOffer(e == null ? void 0 : e.offerOptions);
      case "have-remote-offer":
        return this.logger.debug("SessionDescriptionHandler.createLocalOfferOrAnswer - creating SDP answer"), this._peerConnection.createAnswer(e == null ? void 0 : e.answerOptions);
      case "have-local-offer":
      case "have-local-pranswer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
  }
  /**
   * Get a media stream from the media stream factory and set the local media stream.
   * @param options - Session description handler options.
   */
  getLocalMediaStream(e) {
    if (this.logger.debug("SessionDescriptionHandler.getLocalMediaStream"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    let t = Object.assign({}, e == null ? void 0 : e.constraints);
    if (this.localMediaStreamConstraints) {
      if (t.audio = t.audio || this.localMediaStreamConstraints.audio, t.video = t.video || this.localMediaStreamConstraints.video, JSON.stringify(this.localMediaStreamConstraints.audio) === JSON.stringify(t.audio) && JSON.stringify(this.localMediaStreamConstraints.video) === JSON.stringify(t.video))
        return Promise.resolve();
    } else
      t.audio === void 0 && t.video === void 0 && (t = { audio: !0 });
    return this.localMediaStreamConstraints = t, this.mediaStreamFactory(t, this, e).then((r) => this.setLocalMediaStream(r));
  }
  /**
   * Sets the peer connection's sender tracks and local media stream tracks.
   *
   * @remarks
   * Only the first audio and video tracks of the provided MediaStream are utilized.
   * Adds tracks if audio and/or video tracks are not already present, otherwise replaces tracks.
   *
   * @param stream - Media stream containing tracks to be utilized.
   */
  setLocalMediaStream(e) {
    if (this.logger.debug("SessionDescriptionHandler.setLocalMediaStream"), !this._peerConnection)
      throw new Error("Peer connection undefined.");
    const t = this._peerConnection, r = this._localMediaStream, s = [], i = (d) => {
      const w = d.kind;
      if (w !== "audio" && w !== "video")
        throw new Error(`Unknown new track kind ${w}.`);
      const f = t.getSenders().find((m) => m.track && m.track.kind === w);
      f ? s.push(new Promise((m) => {
        this.logger.debug(`SessionDescriptionHandler.setLocalMediaStream - replacing sender ${w} track`), m();
      }).then(() => f.replaceTrack(d).then(() => {
        const m = r.getTracks().find((E) => E.kind === w);
        m && (m.stop(), r.removeTrack(m), M.dispatchRemoveTrackEvent(r, m)), r.addTrack(d), M.dispatchAddTrackEvent(r, d);
      }).catch((m) => {
        throw this.logger.error(`SessionDescriptionHandler.setLocalMediaStream - failed to replace sender ${w} track`), m;
      }))) : s.push(new Promise((m) => {
        this.logger.debug(`SessionDescriptionHandler.setLocalMediaStream - adding sender ${w} track`), m();
      }).then(() => {
        try {
          t.addTrack(d, r);
        } catch (m) {
          throw this.logger.error(`SessionDescriptionHandler.setLocalMediaStream - failed to add sender ${w} track`), m;
        }
        r.addTrack(d), M.dispatchAddTrackEvent(r, d);
      }));
    }, n = e.getAudioTracks();
    n.length && i(n[0]);
    const o = e.getVideoTracks();
    return o.length && i(o[0]), s.reduce((d, w) => d.then(() => w), Promise.resolve());
  }
  /**
   * Gets the peer connection's local session description.
   */
  getLocalSessionDescription() {
    if (this.logger.debug("SessionDescriptionHandler.getLocalSessionDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    const e = this._peerConnection.localDescription;
    return e ? Promise.resolve(e) : Promise.reject(new Error("Failed to get local session description"));
  }
  /**
   * Sets the peer connection's local session description.
   * @param sessionDescription - sessionDescription The session description.
   */
  setLocalSessionDescription(e) {
    return this.logger.debug("SessionDescriptionHandler.setLocalSessionDescription"), this._peerConnection === void 0 ? Promise.reject(new Error("Peer connection closed.")) : this._peerConnection.setLocalDescription(e);
  }
  /**
   * Sets the peer connection's remote session description.
   * @param sessionDescription - The session description.
   */
  setRemoteSessionDescription(e) {
    if (this.logger.debug("SessionDescriptionHandler.setRemoteSessionDescription"), this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    const t = e.sdp;
    let r;
    switch (this._peerConnection.signalingState) {
      case "stable":
        r = "offer";
        break;
      case "have-local-offer":
        r = "answer";
        break;
      case "have-local-pranswer":
      case "have-remote-offer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
    return t ? this._peerConnection.setRemoteDescription({ sdp: t, type: r }) : (this.logger.error("SessionDescriptionHandler.setRemoteSessionDescription failed - cannot set null sdp"), Promise.reject(new Error("SDP is undefined")));
  }
  /**
   * Sets a remote media stream track.
   *
   * @remarks
   * Adds tracks if audio and/or video tracks are not already present, otherwise replaces tracks.
   *
   * @param track - Media stream track to be utilized.
   */
  setRemoteTrack(e) {
    this.logger.debug("SessionDescriptionHandler.setRemoteTrack");
    const t = this._remoteMediaStream;
    t.getTrackById(e.id) ? this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - have remote ${e.kind} track`) : e.kind === "audio" ? (this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - adding remote ${e.kind} track`), t.getAudioTracks().forEach((r) => {
      r.stop(), t.removeTrack(r), M.dispatchRemoveTrackEvent(t, r);
    }), t.addTrack(e), M.dispatchAddTrackEvent(t, e)) : e.kind === "video" && (this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - adding remote ${e.kind} track`), t.getVideoTracks().forEach((r) => {
      r.stop(), t.removeTrack(r), M.dispatchRemoveTrackEvent(t, r);
    }), t.addTrack(e), M.dispatchAddTrackEvent(t, e));
  }
  /**
   * Depending on the current signaling state and the session hold state, update transceiver direction.
   * @param options - Session description handler options.
   */
  updateDirection(e) {
    if (this._peerConnection === void 0)
      return Promise.reject(new Error("Peer connection closed."));
    switch (this._peerConnection.signalingState) {
      case "stable":
        this.logger.debug("SessionDescriptionHandler.updateDirection - setting offer direction");
        {
          const t = (r) => {
            switch (r) {
              case "inactive":
                return e != null && e.hold ? "inactive" : "recvonly";
              case "recvonly":
                return e != null && e.hold ? "inactive" : "recvonly";
              case "sendonly":
                return e != null && e.hold ? "sendonly" : "sendrecv";
              case "sendrecv":
                return e != null && e.hold ? "sendonly" : "sendrecv";
              case "stopped":
                return "stopped";
              default:
                throw new Error("Should never happen");
            }
          };
          this._peerConnection.getTransceivers().forEach((r) => {
            if (r.direction) {
              const s = t(r.direction);
              r.direction !== s && (r.direction = s);
            }
          });
        }
        break;
      case "have-remote-offer":
        this.logger.debug("SessionDescriptionHandler.updateDirection - setting answer direction");
        {
          const t = (() => {
            const s = this._peerConnection.remoteDescription;
            if (!s)
              throw new Error("Failed to read remote offer");
            const i = /a=sendrecv\r\n|a=sendonly\r\n|a=recvonly\r\n|a=inactive\r\n/.exec(s.sdp);
            if (i)
              switch (i[0]) {
                case `a=inactive\r
`:
                  return "inactive";
                case `a=recvonly\r
`:
                  return "recvonly";
                case `a=sendonly\r
`:
                  return "sendonly";
                case `a=sendrecv\r
`:
                  return "sendrecv";
                default:
                  throw new Error("Should never happen");
              }
            return "sendrecv";
          })(), r = (() => {
            switch (t) {
              case "inactive":
                return "inactive";
              case "recvonly":
                return "sendonly";
              case "sendonly":
                return e != null && e.hold ? "inactive" : "recvonly";
              case "sendrecv":
                return e != null && e.hold ? "sendonly" : "sendrecv";
              default:
                throw new Error("Should never happen");
            }
          })();
          this._peerConnection.getTransceivers().forEach((s) => {
            s.direction && s.direction !== "stopped" && s.direction !== r && (s.direction = r);
          });
        }
        break;
      case "have-local-offer":
      case "have-local-pranswer":
      case "have-remote-pranswer":
      case "closed":
      default:
        return Promise.reject(new Error("Invalid signaling state " + this._peerConnection.signalingState));
    }
    return Promise.resolve();
  }
  /**
   * Wait for ICE gathering to complete.
   * @param restart - If true, waits if current state is "complete" (waits for transition to "complete").
   * @param timeout - Milliseconds after which waiting times out. No timeout if 0.
   */
  waitForIceGatheringComplete(e = !1, t = 0) {
    return this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete"), this._peerConnection === void 0 ? Promise.reject("Peer connection closed.") : !e && this._peerConnection.iceGatheringState === "complete" ? (this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - already complete"), Promise.resolve()) : (this.iceGatheringCompletePromise !== void 0 && (this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - rejecting prior waiting promise"), this.iceGatheringCompleteReject && this.iceGatheringCompleteReject(new Error("Promise superseded.")), this.iceGatheringCompletePromise = void 0, this.iceGatheringCompleteResolve = void 0, this.iceGatheringCompleteReject = void 0), this.iceGatheringCompletePromise = new Promise((r, s) => {
      this.iceGatheringCompleteResolve = r, this.iceGatheringCompleteReject = s, t > 0 && (this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - timeout in " + t), this.iceGatheringCompleteTimeoutId = setTimeout(() => {
        this.logger.debug("SessionDescriptionHandler.waitForIceGatheringToComplete - timeout"), this.iceGatheringComplete();
      }, t));
    }), this.iceGatheringCompletePromise);
  }
  /**
   * Initializes the peer connection event handlers
   */
  initPeerConnectionEventHandlers() {
    if (this.logger.debug("SessionDescriptionHandler.initPeerConnectionEventHandlers"), !this._peerConnection)
      throw new Error("Peer connection undefined.");
    const e = this._peerConnection;
    e.onconnectionstatechange = (t) => {
      var r;
      const s = e.connectionState;
      this.logger.debug(`SessionDescriptionHandler.onconnectionstatechange ${s}`), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onconnectionstatechange && this._peerConnectionDelegate.onconnectionstatechange(t);
    }, e.ondatachannel = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.ondatachannel"), this._dataChannel = t.channel, this.onDataChannel && this.onDataChannel(this._dataChannel), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.ondatachannel && this._peerConnectionDelegate.ondatachannel(t);
    }, e.onicecandidate = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.onicecandidate"), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onicecandidate && this._peerConnectionDelegate.onicecandidate(t);
    }, e.onicecandidateerror = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.onicecandidateerror"), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onicecandidateerror && this._peerConnectionDelegate.onicecandidateerror(t);
    }, e.oniceconnectionstatechange = (t) => {
      var r;
      const s = e.iceConnectionState;
      this.logger.debug(`SessionDescriptionHandler.oniceconnectionstatechange ${s}`), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.oniceconnectionstatechange && this._peerConnectionDelegate.oniceconnectionstatechange(t);
    }, e.onicegatheringstatechange = (t) => {
      var r;
      const s = e.iceGatheringState;
      this.logger.debug(`SessionDescriptionHandler.onicegatheringstatechange ${s}`), s === "complete" && this.iceGatheringComplete(), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onicegatheringstatechange && this._peerConnectionDelegate.onicegatheringstatechange(t);
    }, e.onnegotiationneeded = (t) => {
      var r;
      this.logger.debug("SessionDescriptionHandler.onnegotiationneeded"), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onnegotiationneeded && this._peerConnectionDelegate.onnegotiationneeded(t);
    }, e.onsignalingstatechange = (t) => {
      var r;
      const s = e.signalingState;
      this.logger.debug(`SessionDescriptionHandler.onsignalingstatechange ${s}`), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.onsignalingstatechange && this._peerConnectionDelegate.onsignalingstatechange(t);
    }, e.ontrack = (t) => {
      var r;
      const s = t.track.kind, i = t.track.enabled ? "enabled" : "disabled";
      this.logger.debug(`SessionDescriptionHandler.ontrack ${s} ${i}`), this.setRemoteTrack(t.track), !((r = this._peerConnectionDelegate) === null || r === void 0) && r.ontrack && this._peerConnectionDelegate.ontrack(t);
    };
  }
}
function Wt(a) {
  return (e, t) => {
    a === void 0 && (a = Gt());
    const s = {
      iceGatheringTimeout: (t == null ? void 0 : t.iceGatheringTimeout) !== void 0 ? t == null ? void 0 : t.iceGatheringTimeout : 5e3,
      peerConnectionConfiguration: Object.assign(Object.assign({}, Kt()), t == null ? void 0 : t.peerConnectionConfiguration)
    }, i = e.userAgent.getLogger("sip.SessionDescriptionHandler");
    return new M(i, a, s);
  };
}
class be {
  constructor(e, t) {
    if (this._state = x.Disconnected, this.transitioningState = !1, this._stateEventEmitter = new ve(), this.logger = e, t) {
      const i = t, n = i == null ? void 0 : i.wsServers, o = i == null ? void 0 : i.maxReconnectionAttempts;
      n !== void 0 && this.logger.warn('The transport option "wsServers" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), o !== void 0 && this.logger.warn('The transport option "maxReconnectionAttempts" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), n && !t.server && (typeof n == "string" && (t.server = n), n instanceof Array && (t.server = n[0]));
    }
    this.configuration = Object.assign(Object.assign({}, be.defaultOptions), t);
    const r = this.configuration.server, s = P.parse(r, "absoluteURI");
    if (s === -1)
      throw this.logger.error(`Invalid WebSocket Server URL "${r}"`), new Error("Invalid WebSocket Server URL");
    if (!["wss", "ws", "udp"].includes(s.scheme))
      throw this.logger.error(`Invalid scheme in WebSocket Server URL "${r}"`), new Error("Invalid scheme in WebSocket Server URL");
    this._protocol = s.scheme.toUpperCase();
  }
  dispose() {
    return this.disconnect();
  }
  /**
   * The protocol.
   *
   * @remarks
   * Formatted as defined for the Via header sent-protocol transport.
   * https://tools.ietf.org/html/rfc3261#section-20.42
   */
  get protocol() {
    return this._protocol;
  }
  /**
   * The URL of the WebSocket Server.
   */
  get server() {
    return this.configuration.server;
  }
  /**
   * Transport state.
   */
  get state() {
    return this._state;
  }
  /**
   * Transport state change emitter.
   */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /**
   * The WebSocket.
   */
  get ws() {
    return this._ws;
  }
  /**
   * Connect to network.
   * Resolves once connected. Otherwise rejects with an Error.
   */
  connect() {
    return this._connect();
  }
  /**
   * Disconnect from network.
   * Resolves once disconnected. Otherwise rejects with an Error.
   */
  disconnect() {
    return this._disconnect();
  }
  /**
   * Returns true if the `state` equals "Connected".
   * @remarks
   * This is equivalent to `state === TransportState.Connected`.
   */
  isConnected() {
    return this.state === x.Connected;
  }
  /**
   * Sends a message.
   * Resolves once message is sent. Otherwise rejects with an Error.
   * @param message - Message to send.
   */
  send(e) {
    return this._send(e);
  }
  _connect() {
    switch (this.logger.log(`Connecting ${this.server}`), this.state) {
      case x.Connecting:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(x.Connecting));
        if (!this.connectPromise)
          throw new Error("Connect promise must be defined.");
        return this.connectPromise;
      case x.Connected:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(x.Connecting));
        if (this.connectPromise)
          throw new Error("Connect promise must not be defined.");
        return Promise.resolve();
      case x.Disconnecting:
        if (this.connectPromise)
          throw new Error("Connect promise must not be defined.");
        try {
          this.transitionState(x.Connecting);
        } catch (t) {
          if (t instanceof fe)
            return Promise.reject(t);
          throw t;
        }
        break;
      case x.Disconnected:
        if (this.connectPromise)
          throw new Error("Connect promise must not be defined.");
        try {
          this.transitionState(x.Connecting);
        } catch (t) {
          if (t instanceof fe)
            return Promise.reject(t);
          throw t;
        }
        break;
      default:
        throw new Error("Unknown state");
    }
    let e;
    try {
      e = new WebSocket(this.server, "sip"), e.binaryType = "arraybuffer", e.addEventListener("close", (t) => this.onWebSocketClose(t, e)), e.addEventListener("error", (t) => this.onWebSocketError(t, e)), e.addEventListener("open", (t) => this.onWebSocketOpen(t, e)), e.addEventListener("message", (t) => this.onWebSocketMessage(t, e)), this._ws = e;
    } catch (t) {
      return this._ws = void 0, this.logger.error("WebSocket construction failed."), this.logger.error(t.toString()), new Promise((r, s) => {
        this.connectResolve = r, this.connectReject = s, this.transitionState(x.Disconnected, t);
      });
    }
    return this.connectPromise = new Promise((t, r) => {
      this.connectResolve = t, this.connectReject = r, this.connectTimeout = setTimeout(() => {
        this.logger.warn("Connect timed out. Exceeded time set in configuration.connectionTimeout: " + this.configuration.connectionTimeout + "s."), e.close(1e3);
      }, this.configuration.connectionTimeout * 1e3);
    }), this.connectPromise;
  }
  _disconnect() {
    switch (this.logger.log(`Disconnecting ${this.server}`), this.state) {
      case x.Connecting:
        if (this.disconnectPromise)
          throw new Error("Disconnect promise must not be defined.");
        try {
          this.transitionState(x.Disconnecting);
        } catch (t) {
          if (t instanceof fe)
            return Promise.reject(t);
          throw t;
        }
        break;
      case x.Connected:
        if (this.disconnectPromise)
          throw new Error("Disconnect promise must not be defined.");
        try {
          this.transitionState(x.Disconnecting);
        } catch (t) {
          if (t instanceof fe)
            return Promise.reject(t);
          throw t;
        }
        break;
      case x.Disconnecting:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(x.Disconnecting));
        if (!this.disconnectPromise)
          throw new Error("Disconnect promise must be defined.");
        return this.disconnectPromise;
      case x.Disconnected:
        if (this.transitioningState)
          return Promise.reject(this.transitionLoopDetectedError(x.Disconnecting));
        if (this.disconnectPromise)
          throw new Error("Disconnect promise must not be defined.");
        return Promise.resolve();
      default:
        throw new Error("Unknown state");
    }
    if (!this._ws)
      throw new Error("WebSocket must be defined.");
    const e = this._ws;
    return this.disconnectPromise = new Promise((t, r) => {
      this.disconnectResolve = t, this.disconnectReject = r;
      try {
        e.close(1e3);
      } catch (s) {
        throw this.logger.error("WebSocket close failed."), this.logger.error(s.toString()), s;
      }
    }), this.disconnectPromise;
  }
  _send(e) {
    if (this.configuration.traceSip === !0 && this.logger.log(`Sending WebSocket message:

` + e + `
`), this._state !== x.Connected)
      return Promise.reject(new Error("Not connected."));
    if (!this._ws)
      throw new Error("WebSocket undefined.");
    try {
      this._ws.send(e);
    } catch (t) {
      return t instanceof Error ? Promise.reject(t) : Promise.reject(new Error("WebSocket send failed."));
    }
    return Promise.resolve();
  }
  /**
   * WebSocket "onclose" event handler.
   * @param ev - Event.
   */
  onWebSocketClose(e, t) {
    if (t !== this._ws)
      return;
    const r = `WebSocket closed ${this.server} (code: ${e.code})`, s = this.disconnectPromise ? void 0 : new Error(r);
    s && this.logger.warn("WebSocket closed unexpectedly"), this.logger.log(r), this._ws = void 0, this.transitionState(x.Disconnected, s);
  }
  /**
   * WebSocket "onerror" event handler.
   * @param ev - Event.
   */
  onWebSocketError(e, t) {
    t === this._ws && this.logger.error("WebSocket error occurred.");
  }
  /**
   * WebSocket "onmessage" event handler.
   * @param ev - Event.
   */
  onWebSocketMessage(e, t) {
    if (t !== this._ws)
      return;
    const r = e.data;
    let s;
    if (/^(\r\n)+$/.test(r)) {
      this.clearKeepAliveTimeout(), this.configuration.traceSip === !0 && this.logger.log("Received WebSocket message with CRLF Keep Alive response");
      return;
    }
    if (!r) {
      this.logger.warn("Received empty message, discarding...");
      return;
    }
    if (typeof r != "string") {
      try {
        s = new TextDecoder().decode(new Uint8Array(r));
      } catch (i) {
        this.logger.error(i.toString()), this.logger.error("Received WebSocket binary message failed to be converted into string, message discarded");
        return;
      }
      this.configuration.traceSip === !0 && this.logger.log(`Received WebSocket binary message:

` + s + `
`);
    } else
      s = r, this.configuration.traceSip === !0 && this.logger.log(`Received WebSocket text message:

` + s + `
`);
    if (this.state !== x.Connected) {
      this.logger.warn("Received message while not connected, discarding...");
      return;
    }
    if (this.onMessage)
      try {
        this.onMessage(s);
      } catch (i) {
        throw this.logger.error(i.toString()), this.logger.error("Exception thrown by onMessage callback"), i;
      }
  }
  /**
   * WebSocket "onopen" event handler.
   * @param ev - Event.
   */
  onWebSocketOpen(e, t) {
    t === this._ws && this._state === x.Connecting && (this.logger.log(`WebSocket opened ${this.server}`), this.transitionState(x.Connected));
  }
  /**
   * Helper function to generate an Error.
   * @param state - State transitioning to.
   */
  transitionLoopDetectedError(e) {
    let t = "A state transition loop has been detected.";
    return t += ` An attempt to transition from ${this._state} to ${e} before the prior transition completed.`, t += " Perhaps you are synchronously calling connect() or disconnect() from a callback or state change handler?", this.logger.error(t), new fe("Loop detected.");
  }
  /**
   * Transition transport state.
   * @internal
   */
  transitionState(e, t) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    if (this.transitioningState)
      throw this.transitionLoopDetectedError(e);
    switch (this.transitioningState = !0, this._state) {
      case x.Connecting:
        e !== x.Connected && e !== x.Disconnecting && e !== x.Disconnected && r();
        break;
      case x.Connected:
        e !== x.Disconnecting && e !== x.Disconnected && r();
        break;
      case x.Disconnecting:
        e !== x.Connecting && e !== x.Disconnected && r();
        break;
      case x.Disconnected:
        e !== x.Connecting && r();
        break;
      default:
        throw new Error("Unknown state.");
    }
    const s = this._state;
    this._state = e;
    const i = this.connectResolve, n = this.connectReject;
    s === x.Connecting && (this.connectPromise = void 0, this.connectResolve = void 0, this.connectReject = void 0);
    const o = this.disconnectResolve, d = this.disconnectReject;
    if (s === x.Disconnecting && (this.disconnectPromise = void 0, this.disconnectResolve = void 0, this.disconnectReject = void 0), this.connectTimeout && (clearTimeout(this.connectTimeout), this.connectTimeout = void 0), this.logger.log(`Transitioned from ${s} to ${this._state}`), this._stateEventEmitter.emit(this._state), e === x.Connected && (this.startSendingKeepAlives(), this.onConnect))
      try {
        this.onConnect();
      } catch (w) {
        throw this.logger.error(w.toString()), this.logger.error("Exception thrown by onConnect callback"), w;
      }
    if (s === x.Connected && (this.stopSendingKeepAlives(), this.onDisconnect))
      try {
        t ? this.onDisconnect(t) : this.onDisconnect();
      } catch (w) {
        throw this.logger.error(w.toString()), this.logger.error("Exception thrown by onDisconnect callback"), w;
      }
    if (s === x.Connecting) {
      if (!i)
        throw new Error("Connect resolve undefined.");
      if (!n)
        throw new Error("Connect reject undefined.");
      e === x.Connected ? i() : n(t || new Error("Connect aborted."));
    }
    if (s === x.Disconnecting) {
      if (!o)
        throw new Error("Disconnect resolve undefined.");
      if (!d)
        throw new Error("Disconnect reject undefined.");
      e === x.Disconnected ? o() : d(t || new Error("Disconnect aborted."));
    }
    this.transitioningState = !1;
  }
  // TODO: Review "KeepAlive Stuff".
  // It is not clear if it works and there are no tests for it.
  // It was blindly lifted the keep alive code unchanged from earlier transport code.
  //
  // From the RFC...
  //
  // SIP WebSocket Clients and Servers may keep their WebSocket
  // connections open by sending periodic WebSocket "Ping" frames as
  // described in [RFC6455], Section 5.5.2.
  // ...
  // The indication and use of the CRLF NAT keep-alive mechanism defined
  // for SIP connection-oriented transports in [RFC5626], Section 3.5.1 or
  // [RFC6223] are, of course, usable over the transport defined in this
  // specification.
  // https://tools.ietf.org/html/rfc7118#section-6
  //
  // and...
  //
  // The Ping frame contains an opcode of 0x9.
  // https://tools.ietf.org/html/rfc6455#section-5.5.2
  //
  // ==============================
  // KeepAlive Stuff
  // ==============================
  clearKeepAliveTimeout() {
    this.keepAliveDebounceTimeout && clearTimeout(this.keepAliveDebounceTimeout), this.keepAliveDebounceTimeout = void 0;
  }
  /**
   * Send a keep-alive (a double-CRLF sequence).
   */
  sendKeepAlive() {
    return this.keepAliveDebounceTimeout ? Promise.resolve() : (this.keepAliveDebounceTimeout = setTimeout(() => {
      this.clearKeepAliveTimeout();
    }, this.configuration.keepAliveDebounce * 1e3), this.send(`\r
\r
`));
  }
  /**
   * Start sending keep-alives.
   */
  startSendingKeepAlives() {
    const e = (t) => {
      const r = t * 0.8;
      return 1e3 * (Math.random() * (t - r) + r);
    };
    this.configuration.keepAliveInterval && !this.keepAliveInterval && (this.keepAliveInterval = setInterval(() => {
      this.sendKeepAlive(), this.startSendingKeepAlives();
    }, e(this.configuration.keepAliveInterval)));
  }
  /**
   * Stop sending keep-alives.
   */
  stopSendingKeepAlives() {
    this.keepAliveInterval && clearInterval(this.keepAliveInterval), this.keepAliveDebounceTimeout && clearTimeout(this.keepAliveDebounceTimeout), this.keepAliveInterval = void 0, this.keepAliveDebounceTimeout = void 0;
  }
}
be.defaultOptions = {
  server: "",
  connectionTimeout: 5,
  keepAliveInterval: 0,
  keepAliveDebounce: 10,
  traceSip: !0
};
class G {
  /**
   * Constructs a new instance of the `UserAgent` class.
   * @param options - Options bucket. See {@link UserAgentOptions} for details.
   */
  constructor(e = {}) {
    if (this._publishers = {}, this._registerers = {}, this._sessions = {}, this._subscriptions = {}, this._state = H.Stopped, this._stateEventEmitter = new ve(), this.delegate = e.delegate, this.options = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, G.defaultOptions()), { sipjsId: ae(5) }), { uri: new J("sip", "anonymous." + ae(6), "anonymous.invalid") }), { viaHost: ae(12) + ".invalid" }), G.stripUndefinedProperties(e)), this.options.hackIpInContact)
      if (typeof this.options.hackIpInContact == "boolean" && this.options.hackIpInContact) {
        const s = Math.floor(Math.random() * 254 + 1);
        this.options.viaHost = "192.0.2." + s;
      } else this.options.hackIpInContact && (this.options.viaHost = this.options.hackIpInContact);
    switch (this.loggerFactory = new yt(), this.logger = this.loggerFactory.getLogger("sip.UserAgent"), this.loggerFactory.builtinEnabled = this.options.logBuiltinEnabled, this.loggerFactory.connector = this.options.logConnector, this.options.logLevel) {
      case "error":
        this.loggerFactory.level = k.error;
        break;
      case "warn":
        this.loggerFactory.level = k.warn;
        break;
      case "log":
        this.loggerFactory.level = k.log;
        break;
      case "debug":
        this.loggerFactory.level = k.debug;
        break;
    }
    if (this.options.logConfiguration && (this.logger.log("Configuration:"), Object.keys(this.options).forEach((t) => {
      const r = this.options[t];
      switch (t) {
        case "uri":
        case "sessionDescriptionHandlerFactory":
          this.logger.log("· " + t + ": " + r);
          break;
        case "authorizationPassword":
          this.logger.log("· " + t + ": NOT SHOWN");
          break;
        case "transportConstructor":
          this.logger.log("· " + t + ": " + r.name);
          break;
        default:
          this.logger.log("· " + t + ": " + JSON.stringify(r));
      }
    })), this.options.transportOptions) {
      const t = this.options.transportOptions, r = t.maxReconnectionAttempts, s = t.reconnectionTimeout;
      r !== void 0 && this.logger.warn('The transport option "maxReconnectionAttempts" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), s !== void 0 && this.logger.warn('The transport option "reconnectionTimeout" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), e.reconnectionDelay === void 0 && s !== void 0 && (this.options.reconnectionDelay = s), e.reconnectionAttempts === void 0 && r !== void 0 && (this.options.reconnectionAttempts = r);
    }
    if (e.reconnectionDelay !== void 0 && this.logger.warn('The user agent option "reconnectionDelay" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), e.reconnectionAttempts !== void 0 && this.logger.warn('The user agent option "reconnectionAttempts" as has apparently been specified and has been deprecated. It will no longer be available starting with SIP.js release 0.16.0. Please update accordingly.'), this._transport = new this.options.transportConstructor(this.getLogger("sip.Transport"), this.options.transportOptions), this.initTransportCallbacks(), this._contact = this.initContact(), this._instanceId = this.options.instanceId ? this.options.instanceId : G.newUUID(), P.parse(this._instanceId, "uuid") === -1)
      throw new Error("Invalid instanceId.");
    this._userAgentCore = this.initCore();
  }
  /**
   * Create a URI instance from a string.
   * @param uri - The string to parse.
   *
   * @remarks
   * Returns undefined if the syntax of the URI is invalid.
   * The syntax must conform to a SIP URI as defined in the RFC.
   * 25 Augmented BNF for the SIP Protocol
   * https://tools.ietf.org/html/rfc3261#section-25
   *
   * @example
   * ```ts
   * const uri = UserAgent.makeURI("sip:edgar@example.com");
   * ```
   */
  static makeURI(e) {
    return P.URIParse(e);
  }
  /** Default user agent options. */
  static defaultOptions() {
    return {
      allowLegacyNotifications: !1,
      authorizationHa1: "",
      authorizationPassword: "",
      authorizationUsername: "",
      delegate: {},
      contactName: "",
      contactParams: { transport: "ws" },
      displayName: "",
      forceRport: !1,
      gracefulShutdown: !0,
      hackAllowUnregisteredOptionTags: !1,
      hackIpInContact: !1,
      hackViaTcp: !1,
      instanceId: "",
      instanceIdAlwaysAdded: !1,
      logBuiltinEnabled: !0,
      logConfiguration: !0,
      logConnector: () => {
      },
      logLevel: "log",
      noAnswerTimeout: 60,
      preloadedRouteSet: [],
      reconnectionAttempts: 0,
      reconnectionDelay: 4,
      sendInitialProvisionalResponse: !0,
      sessionDescriptionHandlerFactory: Wt(),
      sessionDescriptionHandlerFactoryOptions: {},
      sipExtension100rel: K.Unsupported,
      sipExtensionReplaces: K.Unsupported,
      sipExtensionExtraSupported: [],
      sipjsId: "",
      transportConstructor: be,
      transportOptions: {},
      uri: new J("sip", "anonymous", "anonymous.invalid"),
      userAgentString: "SIP.js/" + ht,
      viaHost: ""
    };
  }
  // http://stackoverflow.com/users/109538/broofa
  static newUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
      const r = Math.floor(Math.random() * 16);
      return (t === "x" ? r : r % 4 + 8).toString(16);
    });
  }
  /**
   * Strip properties with undefined values from options.
   * This is a work around while waiting for missing vs undefined to be addressed (or not)...
   * https://github.com/Microsoft/TypeScript/issues/13195
   * @param options - Options to reduce
   */
  static stripUndefinedProperties(e) {
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }
  /**
   * User agent configuration.
   */
  get configuration() {
    return this.options;
  }
  /**
   * User agent contact.
   */
  get contact() {
    return this._contact;
  }
  /**
   * User agent instance id.
   */
  get instanceId() {
    return this._instanceId;
  }
  /**
   * User agent state.
   */
  get state() {
    return this._state;
  }
  /**
   * User agent state change emitter.
   */
  get stateChange() {
    return this._stateEventEmitter;
  }
  /**
   * User agent transport.
   */
  get transport() {
    return this._transport;
  }
  /**
   * User agent core.
   */
  get userAgentCore() {
    return this._userAgentCore;
  }
  /**
   * The logger.
   */
  getLogger(e, t) {
    return this.loggerFactory.getLogger(e, t);
  }
  /**
   * The logger factory.
   */
  getLoggerFactory() {
    return this.loggerFactory;
  }
  /**
   * True if transport is connected.
   */
  isConnected() {
    return this.transport.isConnected();
  }
  /**
   * Reconnect the transport.
   */
  reconnect() {
    return this.state === H.Stopped ? Promise.reject(new Error("User agent stopped.")) : Promise.resolve().then(() => this.transport.connect());
  }
  /**
   * Start the user agent.
   *
   * @remarks
   * Resolves if transport connects, otherwise rejects.
   * Calling `start()` after calling `stop()` will fail if `stop()` has yet to resolve.
   *
   * @example
   * ```ts
   * userAgent.start()
   *   .then(() => {
   *     // userAgent.isConnected() === true
   *   })
   *   .catch((error: Error) => {
   *     // userAgent.isConnected() === false
   *   });
   * ```
   */
  start() {
    return this.state === H.Started ? (this.logger.warn("User agent already started"), Promise.resolve()) : (this.logger.log(`Starting ${this.configuration.uri}`), this.transitionState(H.Started), this.transport.connect());
  }
  /**
   * Stop the user agent.
   *
   * @remarks
   * Resolves when the user agent has completed a graceful shutdown.
   * ```txt
   * 1) Sessions terminate.
   * 2) Registerers unregister.
   * 3) Subscribers unsubscribe.
   * 4) Publishers unpublish.
   * 5) Transport disconnects.
   * 6) User Agent Core resets.
   * ```
   * The user agent state transistions to stopped once these steps have been completed.
   * Calling `start()` after calling `stop()` will fail if `stop()` has yet to resolve.
   *
   * NOTE: While this is a "graceful shutdown", it can also be very slow one if you
   * are waiting for the returned Promise to resolve. The disposal of the clients and
   * dialogs is done serially - waiting on one to finish before moving on to the next.
   * This can be slow if there are lot of subscriptions to unsubscribe for example.
   *
   * THE SLOW PACE IS INTENTIONAL!
   * While one could spin them all down in parallel, this could slam the remote server.
   * It is bad practice to denial of service attack (DoS attack) servers!!!
   * Moreover, production servers will automatically blacklist clients which send too
   * many requests in too short a period of time - dropping any additional requests.
   *
   * If a different approach to disposing is needed, one can implement whatever is
   * needed and execute that prior to calling `stop()`. Alternatively one may simply
   * not wait for the Promise returned by `stop()` to complete.
   */
  async stop() {
    if (this.state === H.Stopped)
      return this.logger.warn("User agent already stopped"), Promise.resolve();
    if (this.logger.log(`Stopping ${this.configuration.uri}`), !this.options.gracefulShutdown)
      return this.logger.log("Dispose of transport"), this.transport.dispose().catch((o) => {
        throw this.logger.error(o.message), o;
      }), this.logger.log("Dispose of core"), this.userAgentCore.dispose(), this._publishers = {}, this._registerers = {}, this._sessions = {}, this._subscriptions = {}, this.transitionState(H.Stopped), Promise.resolve();
    const e = Object.assign({}, this._publishers), t = Object.assign({}, this._registerers), r = Object.assign({}, this._sessions), s = Object.assign({}, this._subscriptions), i = this.transport, n = this.userAgentCore;
    this.logger.log("Dispose of registerers");
    for (const o in t)
      t[o] && await t[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._registerers[o], d;
      });
    this.logger.log("Dispose of sessions");
    for (const o in r)
      r[o] && await r[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._sessions[o], d;
      });
    this.logger.log("Dispose of subscriptions");
    for (const o in s)
      s[o] && await s[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._subscriptions[o], d;
      });
    this.logger.log("Dispose of publishers");
    for (const o in e)
      e[o] && await e[o].dispose().catch((d) => {
        throw this.logger.error(d.message), delete this._publishers[o], d;
      });
    this.logger.log("Dispose of transport"), await i.dispose().catch((o) => {
      throw this.logger.error(o.message), o;
    }), this.logger.log("Dispose of core"), n.dispose(), this.transitionState(H.Stopped);
  }
  /**
   * Used to avoid circular references.
   * @internal
   */
  _makeInviter(e, t) {
    return new Ee(this, e, t);
  }
  /**
   * Attempt reconnection up to `maxReconnectionAttempts` times.
   * @param reconnectionAttempt - Current attempt number.
   */
  attemptReconnection(e = 1) {
    const t = this.options.reconnectionAttempts, r = this.options.reconnectionDelay;
    if (e > t) {
      this.logger.log("Maximum reconnection attempts reached");
      return;
    }
    this.logger.log(`Reconnection attempt ${e} of ${t} - trying`), setTimeout(() => {
      this.reconnect().then(() => {
        this.logger.log(`Reconnection attempt ${e} of ${t} - succeeded`);
      }).catch((s) => {
        this.logger.error(s.message), this.logger.log(`Reconnection attempt ${e} of ${t} - failed`), this.attemptReconnection(++e);
      });
    }, e === 1 ? 0 : r * 1e3);
  }
  /**
   * Initialize contact.
   */
  initContact() {
    const e = this.options.contactName !== "" ? this.options.contactName : ae(8), t = this.options.contactParams;
    return {
      pubGruu: void 0,
      tempGruu: void 0,
      uri: new J("sip", e, this.options.viaHost, void 0, t),
      toString: (s = {}) => {
        const i = s.anonymous || !1, n = s.outbound || !1, o = s.register || !1;
        let d = "<";
        return i ? d += this.contact.tempGruu || `sip:anonymous@anonymous.invalid;transport=${t.transport ? t.transport : "ws"}` : o ? d += this.contact.uri : d += this.contact.pubGruu || this.contact.uri, n && (d += ";ob"), d += ">", this.options.instanceIdAlwaysAdded && (d += ';+sip.instance="<urn:uuid:' + this._instanceId + '>"'), d;
      }
    };
  }
  /**
   * Initialize user agent core.
   */
  initCore() {
    let e = [];
    e.push("outbound"), this.options.sipExtension100rel === K.Supported && e.push("100rel"), this.options.sipExtensionReplaces === K.Supported && e.push("replaces"), this.options.sipExtensionExtraSupported && e.push(...this.options.sipExtensionExtraSupported), this.options.hackAllowUnregisteredOptionTags || (e = e.filter((i) => Et[i])), e = Array.from(new Set(e));
    const t = e.slice();
    (this.contact.pubGruu || this.contact.tempGruu) && t.push("gruu");
    const r = {
      aor: this.options.uri,
      contact: this.contact,
      displayName: this.options.displayName,
      loggerFactory: this.loggerFactory,
      hackViaTcp: this.options.hackViaTcp,
      routeSet: this.options.preloadedRouteSet,
      supportedOptionTags: e,
      supportedOptionTagsResponse: t,
      sipjsId: this.options.sipjsId,
      userAgentHeaderFieldValue: this.options.userAgentString,
      viaForceRport: this.options.forceRport,
      viaHost: this.options.viaHost,
      authenticationFactory: () => {
        const i = this.options.authorizationUsername ? this.options.authorizationUsername : this.options.uri.user, n = this.options.authorizationPassword ? this.options.authorizationPassword : void 0, o = this.options.authorizationHa1 ? this.options.authorizationHa1 : void 0;
        return new Rt(this.getLoggerFactory(), o, i, n);
      },
      transportAccessor: () => this.transport
    }, s = {
      onInvite: (i) => {
        var n;
        const o = new pe(this, i);
        if (i.delegate = {
          onCancel: (d) => {
            o._onCancel(d);
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onTransportError: (d) => {
            this.logger.error("A transport error has occurred while handling an incoming INVITE request.");
          }
        }, i.trying(), this.options.sipExtensionReplaces !== K.Unsupported) {
          const w = i.message.parseHeader("replaces");
          if (w) {
            const f = w.call_id;
            if (typeof f != "string")
              throw new Error("Type of call id is not string");
            const m = w.replaces_to_tag;
            if (typeof m != "string")
              throw new Error("Type of to tag is not string");
            const E = w.replaces_from_tag;
            if (typeof E != "string")
              throw new Error("type of from tag is not string");
            const I = f + m + E, D = this.userAgentCore.dialogs.get(I);
            if (!D) {
              o.reject({ statusCode: 481 });
              return;
            }
            if (!D.early && w.early_only === !0) {
              o.reject({ statusCode: 486 });
              return;
            }
            const S = this._sessions[f + E] || this._sessions[f + m] || void 0;
            if (!S)
              throw new Error("Session does not exist.");
            o._replacee = S;
          }
        }
        if (!((n = this.delegate) === null || n === void 0) && n.onInvite) {
          if (o.autoSendAnInitialProvisionalResponse) {
            o.progress().then(() => {
              var d;
              if (((d = this.delegate) === null || d === void 0 ? void 0 : d.onInvite) === void 0)
                throw new Error("onInvite undefined.");
              this.delegate.onInvite(o);
            });
            return;
          }
          this.delegate.onInvite(o);
          return;
        }
        o.reject({ statusCode: 486 });
      },
      onMessage: (i) => {
        if (this.delegate && this.delegate.onMessage) {
          const n = new Ze(i);
          this.delegate.onMessage(n);
        } else
          i.accept();
      },
      onNotify: (i) => {
        if (this.delegate && this.delegate.onNotify) {
          const n = new Fe(i);
          this.delegate.onNotify(n);
        } else
          this.options.allowLegacyNotifications ? i.accept() : i.reject({ statusCode: 481 });
      },
      onRefer: (i) => {
        this.logger.warn("Received an out of dialog REFER request"), this.delegate && this.delegate.onReferRequest ? this.delegate.onReferRequest(i) : i.reject({ statusCode: 405 });
      },
      onRegister: (i) => {
        this.logger.warn("Received an out of dialog REGISTER request"), this.delegate && this.delegate.onRegisterRequest ? this.delegate.onRegisterRequest(i) : i.reject({ statusCode: 405 });
      },
      onSubscribe: (i) => {
        this.logger.warn("Received an out of dialog SUBSCRIBE request"), this.delegate && this.delegate.onSubscribeRequest ? this.delegate.onSubscribeRequest(i) : i.reject({ statusCode: 405 });
      }
    };
    return new Vt(r, s);
  }
  initTransportCallbacks() {
    this.transport.onConnect = () => this.onTransportConnect(), this.transport.onDisconnect = (e) => this.onTransportDisconnect(e), this.transport.onMessage = (e) => this.onTransportMessage(e);
  }
  onTransportConnect() {
    this.state !== H.Stopped && this.delegate && this.delegate.onConnect && this.delegate.onConnect();
  }
  onTransportDisconnect(e) {
    this.state !== H.Stopped && (this.delegate && this.delegate.onDisconnect && this.delegate.onDisconnect(e), e && this.options.reconnectionAttempts > 0 && this.attemptReconnection());
  }
  onTransportMessage(e) {
    const t = xe.parseMessage(e, this.getLogger("sip.Parser"));
    if (!t) {
      this.logger.warn("Failed to parse incoming message. Dropping.");
      return;
    }
    if (this.state === H.Stopped && t instanceof he) {
      this.logger.warn(`Received ${t.method} request while stopped. Dropping.`);
      return;
    }
    const r = () => {
      const s = ["from", "to", "call_id", "cseq", "via"];
      for (const i of s)
        if (!t.hasHeader(i))
          return this.logger.warn(`Missing mandatory header field : ${i}.`), !1;
      return !0;
    };
    if (t instanceof he) {
      if (!r()) {
        this.logger.warn("Request missing mandatory header field. Dropping.");
        return;
      }
      if (!t.toTag && t.callId.substr(0, 5) === this.options.sipjsId) {
        this.userAgentCore.replyStateless(t, { statusCode: 482 });
        return;
      }
      const s = Te(t.body), i = t.getHeader("content-length");
      if (i && s < Number(i)) {
        this.userAgentCore.replyStateless(t, { statusCode: 400 });
        return;
      }
    }
    if (t instanceof ne) {
      if (!r()) {
        this.logger.warn("Response missing mandatory header field. Dropping.");
        return;
      }
      if (t.getHeaders("via").length > 1) {
        this.logger.warn("More than one Via header field present in the response. Dropping.");
        return;
      }
      if (t.via.host !== this.options.viaHost || t.via.port !== void 0) {
        this.logger.warn("Via sent-by in the response does not match UA Via host value. Dropping.");
        return;
      }
      const s = Te(t.body), i = t.getHeader("content-length");
      if (i && s < Number(i)) {
        this.logger.warn("Message body length is lower than the value in Content-Length header field. Dropping.");
        return;
      }
    }
    if (t instanceof he) {
      this.userAgentCore.receiveIncomingRequestFromTransport(t);
      return;
    }
    if (t instanceof ne) {
      this.userAgentCore.receiveIncomingResponseFromTransport(t);
      return;
    }
    throw new Error("Invalid message type.");
  }
  /**
   * Transition state.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transitionState(e, t) {
    const r = () => {
      throw new Error(`Invalid state transition from ${this._state} to ${e}`);
    };
    switch (this._state) {
      case H.Started:
        e !== H.Stopped && r();
        break;
      case H.Stopped:
        e !== H.Started && r();
        break;
      default:
        throw new Error("Unknown state.");
    }
    this.logger.log(`Transitioned from ${this._state} to ${e}`), this._state = e, this._stateEventEmitter.emit(this._state);
  }
}
function Yt() {
  return (a, e) => ({ session: e, held: !1, muted: !1 });
}
class Me {
  /**
   * Constructs a new instance of the `SessionManager` class.
   * @param server - SIP WebSocket Server URL.
   * @param options - Options bucket. See {@link SessionManagerOptions} for details.
   */
  constructor(e, t = {}) {
    this.managedSessions = [], this.attemptingReconnection = !1, this.optionsPingFailure = !1, this.optionsPingRunning = !1, this.shouldBeConnected = !1, this.shouldBeRegistered = !1, this.delegate = t.delegate, this.options = Object.assign({
      aor: "",
      autoStop: !0,
      delegate: {},
      iceStopWaitingOnServerReflexive: !1,
      managedSessionFactory: Yt(),
      maxSimultaneousSessions: 2,
      media: {},
      optionsPingInterval: -1,
      optionsPingRequestURI: "",
      reconnectionAttempts: 3,
      reconnectionDelay: 4,
      registrationRetry: !1,
      registrationRetryInterval: 3,
      registerGuard: null,
      registererOptions: {},
      registererRegisterOptions: {},
      sendDTMFUsingSessionDescriptionHandler: !1,
      userAgentOptions: {}
    }, Me.stripUndefinedProperties(t));
    const r = Object.assign({}, t.userAgentOptions);
    if (r.transportConstructor || (r.transportConstructor = be), r.transportOptions || (r.transportOptions = {
      server: e
    }), !r.uri && t.aor) {
      const s = G.makeURI(t.aor);
      if (!s)
        throw new Error(`Failed to create valid URI from ${t.aor}`);
      r.uri = s;
    }
    if (this.userAgent = new G(r), this.userAgent.delegate = {
      // Handle connection with server established
      onConnect: () => {
        this.logger.log("Connected"), this.delegate && this.delegate.onServerConnect && this.delegate.onServerConnect(), this.shouldBeRegistered && this.register(), this.options.optionsPingInterval > 0 && this.optionsPingStart();
      },
      // Handle connection with server lost
      onDisconnect: async (s) => {
        this.logger.log("Disconnected");
        let i = !1;
        this.options.optionsPingInterval > 0 && (i = this.optionsPingFailure, this.optionsPingFailure = !1, this.optionsPingStop()), this.delegate && this.delegate.onServerDisconnect && this.delegate.onServerDisconnect(s), (s || i) && (this.registerer && (this.logger.log("Disposing of registerer..."), this.registerer.dispose().catch((n) => {
          this.logger.debug("Error occurred disposing of registerer after connection with server was lost."), this.logger.debug(n.toString());
        }), this.registerer = void 0), this.managedSessions.slice().map((n) => n.session).forEach(async (n) => {
          this.logger.log("Disposing of session..."), n.dispose().catch((o) => {
            this.logger.debug("Error occurred disposing of a session after connection with server was lost."), this.logger.debug(o.toString());
          });
        }), this.shouldBeConnected && this.attemptReconnection());
      },
      // Handle incoming invitations
      onInvite: (s) => {
        this.logger.log(`[${s.id}] Received INVITE`);
        const i = this.options.maxSimultaneousSessions;
        if (i !== 0 && this.managedSessions.length > i) {
          this.logger.warn(`[${s.id}] Session already in progress, rejecting INVITE...`), s.reject().then(() => {
            this.logger.log(`[${s.id}] Rejected INVITE`);
          }).catch((o) => {
            this.logger.error(`[${s.id}] Failed to reject INVITE`), this.logger.error(o.toString());
          });
          return;
        }
        const n = {
          sessionDescriptionHandlerOptions: { constraints: this.constraints }
        };
        this.initSession(s, n), this.delegate && this.delegate.onCallReceived ? this.delegate.onCallReceived(s) : (this.logger.warn(`[${s.id}] No handler available, rejecting INVITE...`), s.reject().then(() => {
          this.logger.log(`[${s.id}] Rejected INVITE`);
        }).catch((o) => {
          this.logger.error(`[${s.id}] Failed to reject INVITE`), this.logger.error(o.toString());
        }));
      },
      // Handle incoming messages
      onMessage: (s) => {
        s.accept().then(() => {
          this.delegate && this.delegate.onMessageReceived && this.delegate.onMessageReceived(s);
        });
      },
      // Handle incoming notifications
      onNotify: (s) => {
        s.accept().then(() => {
          this.delegate && this.delegate.onNotificationReceived && this.delegate.onNotificationReceived(s);
        });
      }
    }, this.registererOptions = Object.assign({}, t.registererOptions), this.registererRegisterOptions = Object.assign({}, t.registererRegisterOptions), this.options.registrationRetry) {
      this.registererRegisterOptions.requestDelegate = this.registererRegisterOptions.requestDelegate || {};
      const s = this.registererRegisterOptions.requestDelegate.onReject;
      this.registererRegisterOptions.requestDelegate.onReject = (i) => {
        s && s(i), this.attemptRegistration();
      };
    }
    this.logger = this.userAgent.getLogger("sip.SessionManager"), window.addEventListener("online", () => {
      this.logger.log("Online"), this.shouldBeConnected && this.connect();
    }), this.options.autoStop && window.addEventListener("beforeunload", async () => {
      this.shouldBeConnected = !1, this.shouldBeRegistered = !1, this.userAgent.state !== H.Stopped && await this.userAgent.stop();
    });
  }
  /**
   * Strip properties with undefined values from options.
   * This is a work around while waiting for missing vs undefined to be addressed (or not)...
   * https://github.com/Microsoft/TypeScript/issues/13195
   * @param options - Options to reduce
   */
  static stripUndefinedProperties(e) {
    return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
  }
  /**
   * The local media stream. Undefined if call not answered.
   * @param session - Session to get the media stream from.
   */
  getLocalMediaStream(e) {
    const t = e.sessionDescriptionHandler;
    if (t) {
      if (!(t instanceof M))
        throw new Error("Session description handler not instance of web SessionDescriptionHandler");
      return t.localMediaStream;
    }
  }
  /**
   * The remote media stream. Undefined if call not answered.
   * @param session - Session to get the media stream from.
   */
  getRemoteMediaStream(e) {
    const t = e.sessionDescriptionHandler;
    if (t) {
      if (!(t instanceof M))
        throw new Error("Session description handler not instance of web SessionDescriptionHandler");
      return t.remoteMediaStream;
    }
  }
  /**
   * The local audio track, if available.
   * @param session - Session to get track from.
   * @deprecated Use localMediaStream and get track from the stream.
   */
  getLocalAudioTrack(e) {
    var t;
    return (t = this.getLocalMediaStream(e)) === null || t === void 0 ? void 0 : t.getTracks().find((r) => r.kind === "audio");
  }
  /**
   * The local video track, if available.
   * @param session - Session to get track from.
   * @deprecated Use localMediaStream and get track from the stream.
   */
  getLocalVideoTrack(e) {
    var t;
    return (t = this.getLocalMediaStream(e)) === null || t === void 0 ? void 0 : t.getTracks().find((r) => r.kind === "video");
  }
  /**
   * The remote audio track, if available.
   * @param session - Session to get track from.
   * @deprecated Use remoteMediaStream and get track from the stream.
   */
  getRemoteAudioTrack(e) {
    var t;
    return (t = this.getRemoteMediaStream(e)) === null || t === void 0 ? void 0 : t.getTracks().find((r) => r.kind === "audio");
  }
  /**
   * The remote video track, if available.
   * @param session - Session to get track from.
   * @deprecated Use remoteMediaStream and get track from the stream.
   */
  getRemoteVideoTrack(e) {
    var t;
    return (t = this.getRemoteMediaStream(e)) === null || t === void 0 ? void 0 : t.getTracks().find((r) => r.kind === "video");
  }
  /**
   * Connect.
   * @remarks
   * If not started, starts the UserAgent connecting the WebSocket Transport.
   * Otherwise reconnects the UserAgent's WebSocket Transport.
   * Attempts will be made to reconnect as needed.
   */
  async connect() {
    return this.logger.log("Connecting UserAgent..."), this.shouldBeConnected = !0, this.userAgent.state !== H.Started ? this.userAgent.start() : this.userAgent.reconnect();
  }
  /**
   * Disconnect.
   * @remarks
   * If not stopped, stops the UserAgent disconnecting the WebSocket Transport.
   */
  async disconnect() {
    return this.logger.log("Disconnecting UserAgent..."), this.userAgent.state === H.Stopped ? Promise.resolve() : (this.shouldBeConnected = !1, this.shouldBeRegistered = !1, this.registerer = void 0, this.userAgent.stop());
  }
  /**
   * Return true if transport is connected.
   */
  isConnected() {
    return this.userAgent.isConnected();
  }
  /**
   * Start receiving incoming calls.
   * @remarks
   * Send a REGISTER request for the UserAgent's AOR.
   * Resolves when the REGISTER request is sent, otherwise rejects.
   * Attempts will be made to re-register as needed.
   */
  async register(e) {
    return this.logger.log("Registering UserAgent..."), this.shouldBeRegistered = !0, e !== void 0 && (this.registererRegisterOptions = Object.assign({}, e)), this.registerer || (this.registerer = new Z(this.userAgent, this.registererOptions), this.registerer.stateChange.addListener((t) => {
      switch (t) {
        case $.Initial:
          break;
        case $.Registered:
          this.delegate && this.delegate.onRegistered && this.delegate.onRegistered();
          break;
        case $.Unregistered:
          this.delegate && this.delegate.onUnregistered && this.delegate.onUnregistered(), this.shouldBeRegistered && this.attemptRegistration();
          break;
        case $.Terminated:
          break;
        default:
          throw new Error("Unknown registerer state.");
      }
    })), this.attemptRegistration(!0);
  }
  /**
   * Stop receiving incoming calls.
   * @remarks
   * Send an un-REGISTER request for the UserAgent's AOR.
   * Resolves when the un-REGISTER request is sent, otherwise rejects.
   */
  async unregister(e) {
    return this.logger.log("Unregistering UserAgent..."), this.shouldBeRegistered = !1, this.registerer ? this.registerer.unregister(e).then(() => {
    }) : (this.logger.warn("No registerer to unregister."), Promise.resolve());
  }
  /**
   * Make an outgoing call.
   * @remarks
   * Send an INVITE request to create a new Session.
   * Resolves when the INVITE request is sent, otherwise rejects.
   * Use `onCallAnswered` delegate method to determine if Session is established.
   * @param destination - The target destination to call. A SIP address to send the INVITE to.
   * @param inviterOptions - Optional options for Inviter constructor.
   * @param inviterInviteOptions - Optional options for Inviter.invite().
   */
  async call(e, t, r) {
    this.logger.log("Beginning Session...");
    const s = this.options.maxSimultaneousSessions;
    if (s !== 0 && this.managedSessions.length > s)
      return Promise.reject(new Error("Maximum number of sessions already exists."));
    const i = G.makeURI(e);
    if (!i)
      return Promise.reject(new Error(`Failed to create a valid URI from "${e}"`));
    if (t || (t = {}), t.sessionDescriptionHandlerOptions || (t.sessionDescriptionHandlerOptions = {}), t.sessionDescriptionHandlerOptions.constraints || (t.sessionDescriptionHandlerOptions.constraints = this.constraints), t.earlyMedia) {
      r = r || {}, r.requestDelegate = r.requestDelegate || {};
      const o = r.requestDelegate.onProgress;
      r.requestDelegate.onProgress = (d) => {
        d.message.statusCode === 183 && this.setupRemoteMedia(n), o && o(d);
      };
    }
    this.options.iceStopWaitingOnServerReflexive && (t.delegate = t.delegate || {}, t.delegate.onSessionDescriptionHandler = (o) => {
      if (!(o instanceof M))
        throw new Error("Session description handler not instance of SessionDescriptionHandler");
      o.peerConnectionDelegate = {
        onicecandidate: (d) => {
          var w;
          ((w = d.candidate) === null || w === void 0 ? void 0 : w.type) === "srflx" && (this.logger.log(`[${n.id}] Found srflx ICE candidate, stop waiting...`), o.iceGatheringComplete());
        }
      };
    });
    const n = new Ee(this.userAgent, i, t);
    return this.sendInvite(n, t, r).then(() => n);
  }
  /**
   * Hangup a call.
   * @param session - Session to hangup.
   * @remarks
   * Send a BYE request, CANCEL request or reject response to end the current Session.
   * Resolves when the request/response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when call is ended.
   */
  async hangup(e) {
    return this.logger.log(`[${e.id}] Hangup...`), this.sessionExists(e) ? this.terminate(e) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Answer an incoming call.
   * @param session - Session to answer.
   * @remarks
   * Accept an incoming INVITE request creating a new Session.
   * Resolves with the response is sent, otherwise rejects.
   * Use `onCallAnswered` delegate method to determine if and when call is established.
   * @param invitationAcceptOptions - Optional options for Inviter.accept().
   */
  async answer(e, t) {
    return this.logger.log(`[${e.id}] Accepting Invitation...`), this.sessionExists(e) ? e instanceof pe ? (t || (t = {}), t.sessionDescriptionHandlerOptions || (t.sessionDescriptionHandlerOptions = {}), t.sessionDescriptionHandlerOptions.constraints || (t.sessionDescriptionHandlerOptions.constraints = this.constraints), e.accept(t)) : Promise.reject(new Error("Session not instance of Invitation.")) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Decline an incoming call.
   * @param session - Session to decline.
   * @remarks
   * Reject an incoming INVITE request.
   * Resolves with the response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when call is ended.
   */
  async decline(e) {
    return this.logger.log(`[${e.id}] Rejecting Invitation...`), this.sessionExists(e) ? e instanceof pe ? e.reject() : Promise.reject(new Error("Session not instance of Invitation.")) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Hold call
   * @param session - Session to hold.
   * @remarks
   * Send a re-INVITE with new offer indicating "hold".
   * Resolves when the re-INVITE request is sent, otherwise rejects.
   * Use `onCallHold` delegate method to determine if request is accepted or rejected.
   * See: https://tools.ietf.org/html/rfc6337
   */
  async hold(e) {
    return this.logger.log(`[${e.id}] Holding session...`), this.setHold(e, !0);
  }
  /**
   * Unhold call.
   * @param session - Session to unhold.
   * @remarks
   * Send a re-INVITE with new offer indicating "unhold".
   * Resolves when the re-INVITE request is sent, otherwise rejects.
   * Use `onCallHold` delegate method to determine if request is accepted or rejected.
   * See: https://tools.ietf.org/html/rfc6337
   */
  async unhold(e) {
    return this.logger.log(`[${e.id}] Unholding session...`), this.setHold(e, !1);
  }
  /**
   * Hold state.
   * @param session - Session to check.
   * @remarks
   * True if session is on hold.
   */
  isHeld(e) {
    const t = this.sessionManaged(e);
    return t ? t.held : !1;
  }
  /**
   * Mute call.
   * @param session - Session to mute.
   * @remarks
   * Disable sender's media tracks.
   */
  mute(e) {
    this.logger.log(`[${e.id}] Disabling media tracks...`), this.setMute(e, !0);
  }
  /**
   * Unmute call.
   * @param session - Session to unmute.
   * @remarks
   * Enable sender's media tracks.
   */
  unmute(e) {
    this.logger.log(`[${e.id}] Enabling media tracks...`), this.setMute(e, !1);
  }
  /**
   * Mute state.
   * @param session - Session to check.
   * @remarks
   * True if sender's media track is disabled.
   */
  isMuted(e) {
    const t = this.sessionManaged(e);
    return t ? t.muted : !1;
  }
  /**
   * Send DTMF.
   * @param session - Session to send on.
   * @remarks
   * Send an INFO request with content type application/dtmf-relay.
   * @param tone - Tone to send.
   */
  async sendDTMF(e, t) {
    if (this.logger.log(`[${e.id}] Sending DTMF...`), !/^[0-9A-D#*,]$/.exec(t))
      return Promise.reject(new Error("Invalid DTMF tone."));
    if (!this.sessionExists(e))
      return Promise.reject(new Error("Session does not exist."));
    if (this.logger.log(`[${e.id}] Sending DTMF tone: ${t}`), this.options.sendDTMFUsingSessionDescriptionHandler)
      return e.sessionDescriptionHandler ? e.sessionDescriptionHandler.sendDtmf(t) ? Promise.resolve() : Promise.reject(new Error("Failed to send DTMF")) : Promise.reject(new Error("Session desciption handler undefined."));
    {
      const n = { body: {
        contentDisposition: "render",
        contentType: "application/dtmf-relay",
        content: "Signal=" + t + `\r
Duration=` + 2e3
      } };
      return e.info({ requestOptions: n }).then(() => {
      });
    }
  }
  /**
   * Transfer.
   * @param session - Session with the transferee to transfer.
   * @param target - The referral target.
   * @remarks
   * If target is a Session this is an attended transfer completion (REFER with Replaces),
   * otherwise this is a blind transfer (REFER). Attempting an attended transfer
   * completion on a call that has not been answered will be rejected. To implement
   * an attended transfer with early completion, hangup the call with the target
   * and execute a blind transfer to the target.
   */
  async transfer(e, t, r) {
    if (this.logger.log(`[${e.id}] Referring session...`), t instanceof le)
      return e.refer(t, r).then(() => {
      });
    const s = G.makeURI(t);
    return s ? e.refer(s, r).then(() => {
    }) : Promise.reject(new Error(`Failed to create a valid URI from "${t}"`));
  }
  /**
   * Send a message.
   * @remarks
   * Send a MESSAGE request.
   * @param destination - The target destination for the message. A SIP address to send the MESSAGE to.
   */
  async message(e, t) {
    this.logger.log("Sending message...");
    const r = G.makeURI(e);
    return r ? new xt(this.userAgent, r, t).message() : Promise.reject(new Error(`Failed to create a valid URI from "${e}"`));
  }
  /** Media constraints. */
  get constraints() {
    let e = { audio: !0, video: !1 };
    return this.options.media.constraints && (e = Object.assign({}, this.options.media.constraints)), e;
  }
  /**
   * Attempt reconnection up to `reconnectionAttempts` times.
   * @param reconnectionAttempt - Current attempt number.
   */
  attemptReconnection(e = 1) {
    const t = this.options.reconnectionAttempts, r = this.options.reconnectionDelay;
    if (!this.shouldBeConnected) {
      this.logger.log("Should not be connected currently");
      return;
    }
    if (this.attemptingReconnection && this.logger.log("Reconnection attempt already in progress"), e > t) {
      this.logger.log("Reconnection maximum attempts reached");
      return;
    }
    e === 1 ? this.logger.log(`Reconnection attempt ${e} of ${t} - trying`) : this.logger.log(`Reconnection attempt ${e} of ${t} - trying in ${r} seconds`), this.attemptingReconnection = !0, setTimeout(() => {
      if (!this.shouldBeConnected) {
        this.logger.log(`Reconnection attempt ${e} of ${t} - aborted`), this.attemptingReconnection = !1;
        return;
      }
      this.userAgent.reconnect().then(() => {
        this.logger.log(`Reconnection attempt ${e} of ${t} - succeeded`), this.attemptingReconnection = !1;
      }).catch((s) => {
        this.logger.log(`Reconnection attempt ${e} of ${t} - failed`), this.logger.error(s.message), this.attemptingReconnection = !1, this.attemptReconnection(++e);
      });
    }, e === 1 ? 0 : r * 1e3);
  }
  /**
   * Register to receive calls.
   * @param withoutDelay - If true attempt immediately, otherwise wait `registrationRetryInterval`.
   */
  attemptRegistration(e = !1) {
    if (this.logger.log(`Registration attempt ${e ? "without delay" : ""}`), !this.shouldBeRegistered)
      return this.logger.log("Should not be registered currently"), Promise.resolve();
    if (this.registrationAttemptTimeout !== void 0)
      return this.logger.log("Registration attempt already in progress"), Promise.resolve();
    const t = () => this.registerer ? this.isConnected() ? this.userAgent.state === H.Stopped ? (this.logger.log("User agent stopped"), Promise.resolve()) : this.options.registerGuard ? this.options.registerGuard().catch((s) => {
      throw this.logger.log("Register guard rejected will making registration attempt"), s;
    }).then((s) => s || !this.registerer ? Promise.resolve() : this.registerer.register(this.registererRegisterOptions).then(() => {
    })) : this.registerer.register(this.registererRegisterOptions).then(() => {
    }) : (this.logger.log("User agent not connected"), Promise.resolve()) : (this.logger.log("Registerer undefined"), Promise.resolve()), r = (s) => {
      const i = s * 2;
      return 1e3 * (Math.random() * (i - s) + s);
    };
    return new Promise((s, i) => {
      this.registrationAttemptTimeout = setTimeout(() => {
        t().then(() => {
          this.registrationAttemptTimeout = void 0, s();
        }).catch((n) => {
          this.registrationAttemptTimeout = void 0, n instanceof we ? s() : i(n);
        });
      }, e ? 0 : r(this.options.registrationRetryInterval));
    });
  }
  /** Helper function to remove media from html elements. */
  cleanupMedia(e) {
    const t = this.sessionManaged(e);
    if (!t)
      throw new Error("Managed session does not exist.");
    t.mediaLocal && t.mediaLocal.video && (t.mediaLocal.video.srcObject = null, t.mediaLocal.video.pause()), t.mediaRemote && (t.mediaRemote.audio && (t.mediaRemote.audio.srcObject = null, t.mediaRemote.audio.pause()), t.mediaRemote.video && (t.mediaRemote.video.srcObject = null, t.mediaRemote.video.pause()));
  }
  /** Helper function to enable/disable media tracks. */
  enableReceiverTracks(e, t) {
    if (!this.sessionExists(e))
      throw new Error("Session does not exist.");
    const r = e.sessionDescriptionHandler;
    if (!(r instanceof M))
      throw new Error("Session's session description handler not instance of SessionDescriptionHandler.");
    r.enableReceiverTracks(t);
  }
  /** Helper function to enable/disable media tracks. */
  enableSenderTracks(e, t) {
    if (!this.sessionExists(e))
      throw new Error("Session does not exist.");
    const r = e.sessionDescriptionHandler;
    if (!(r instanceof M))
      throw new Error("Session's session description handler not instance of SessionDescriptionHandler.");
    r.enableSenderTracks(t);
  }
  /**
   * Setup session delegate and state change handler.
   * @param session - Session to setup.
   * @param referralInviterOptions - Options for any Inviter created as result of a REFER.
   */
  initSession(e, t) {
    this.sessionAdd(e), this.delegate && this.delegate.onCallCreated && this.delegate.onCallCreated(e), e.stateChange.addListener((r) => {
      switch (this.logger.log(`[${e.id}] Session state changed to ${r}`), r) {
        case p.Initial:
          break;
        case p.Establishing:
          break;
        case p.Established:
          this.setupLocalMedia(e), this.setupRemoteMedia(e), this.delegate && this.delegate.onCallAnswered && this.delegate.onCallAnswered(e);
          break;
        case p.Terminating:
        case p.Terminated:
          this.sessionExists(e) && (this.cleanupMedia(e), this.sessionRemove(e), this.delegate && this.delegate.onCallHangup && this.delegate.onCallHangup(e));
          break;
        default:
          throw new Error("Unknown session state.");
      }
    }), e.delegate = e.delegate || {}, e.delegate.onInfo = (r) => {
      var s;
      if (((s = this.delegate) === null || s === void 0 ? void 0 : s.onCallDTMFReceived) === void 0) {
        r.reject();
        return;
      }
      const i = r.request.getHeader("content-type");
      if (!i || !/^application\/dtmf-relay/i.exec(i)) {
        r.reject();
        return;
      }
      const n = r.request.body.split(`\r
`, 2);
      if (n.length !== 2) {
        r.reject();
        return;
      }
      let o;
      const d = /^(Signal\s*?=\s*?)([0-9A-D#*]{1})(\s)?.*/;
      if (n[0] !== void 0 && d.test(n[0]) && (o = n[0].replace(d, "$2")), !o) {
        r.reject();
        return;
      }
      let w;
      const f = /^(Duration\s?=\s?)([0-9]{1,4})(\s)?.*/;
      if (n[1] !== void 0 && f.test(n[1]) && (w = parseInt(n[1].replace(f, "$2"), 10)), !w) {
        r.reject();
        return;
      }
      r.accept().then(() => {
        if (this.delegate && this.delegate.onCallDTMFReceived) {
          if (!o || !w)
            throw new Error("Tone or duration undefined.");
          this.delegate.onCallDTMFReceived(e, o, w);
        }
      }).catch((m) => {
        this.logger.error(m.message);
      });
    }, e.delegate.onRefer = (r) => {
      r.accept().then(() => this.sendInvite(r.makeInviter(t), t)).catch((s) => {
        this.logger.error(s.message);
      });
    };
  }
  /**
   * Periodically send OPTIONS pings and disconnect when a ping fails.
   * @param requestURI - Request URI to target
   * @param fromURI - From URI
   * @param toURI - To URI
   */
  optionsPingRun(e, t, r) {
    if (this.options.optionsPingInterval < 1)
      throw new Error("Invalid options ping interval.");
    this.optionsPingRunning || (this.optionsPingRunning = !0, this.optionsPingTimeout = setTimeout(() => {
      this.optionsPingTimeout = void 0;
      const s = () => {
        this.optionsPingFailure = !1, this.optionsPingRunning && (this.optionsPingRunning = !1, this.optionsPingRun(e, t, r));
      }, i = () => {
        this.logger.error("OPTIONS ping failed"), this.optionsPingFailure = !0, this.optionsPingRunning = !1, this.userAgent.transport.disconnect().catch((d) => this.logger.error(d));
      }, n = this.userAgent.userAgentCore, o = n.makeOutgoingRequestMessage("OPTIONS", e, t, r, {});
      this.optionsPingRequest = n.request(o, {
        onAccept: () => {
          this.optionsPingRequest = void 0, s();
        },
        onReject: (d) => {
          this.optionsPingRequest = void 0, d.message.statusCode === 408 || d.message.statusCode === 503 ? i() : s();
        }
      });
    }, this.options.optionsPingInterval * 1e3));
  }
  /**
   * Start sending OPTIONS pings.
   */
  optionsPingStart() {
    this.logger.log("OPTIONS pings started");
    let e, t, r;
    if (this.options.optionsPingRequestURI) {
      if (e = G.makeURI(this.options.optionsPingRequestURI), !e)
        throw new Error("Failed to create Request URI.");
      t = this.userAgent.contact.uri.clone(), r = this.userAgent.contact.uri.clone();
    } else if (this.options.aor) {
      const s = G.makeURI(this.options.aor);
      if (!s)
        throw new Error("Failed to create URI.");
      e = s.clone(), e.user = void 0, t = s.clone(), r = s.clone();
    } else {
      this.logger.error("You have enabled sending OPTIONS pings and as such you must provide either a) an AOR to register, or b) an RURI to use for the target of the OPTIONS ping requests. ");
      return;
    }
    this.optionsPingRun(e, t, r);
  }
  /**
   * Stop sending OPTIONS pings.
   */
  optionsPingStop() {
    this.logger.log("OPTIONS pings stopped"), this.optionsPingRunning = !1, this.optionsPingFailure = !1, this.optionsPingRequest && (this.optionsPingRequest.dispose(), this.optionsPingRequest = void 0), this.optionsPingTimeout && (clearTimeout(this.optionsPingTimeout), this.optionsPingTimeout = void 0);
  }
  /** Helper function to init send then send invite. */
  async sendInvite(e, t, r) {
    return this.initSession(e, t), e.invite(r).then(() => {
      this.logger.log(`[${e.id}] Sent INVITE`);
    });
  }
  /** Helper function to add a session to the ones we are managing. */
  sessionAdd(e) {
    const t = this.options.managedSessionFactory(this, e);
    this.managedSessions.push(t);
  }
  /** Helper function to check if the session is one we are managing. */
  sessionExists(e) {
    return this.sessionManaged(e) !== void 0;
  }
  /** Helper function to check if the session is one we are managing. */
  sessionManaged(e) {
    return this.managedSessions.find((t) => t.session.id === e.id);
  }
  /** Helper function to remoce a session from the ones we are managing. */
  sessionRemove(e) {
    this.managedSessions = this.managedSessions.filter((t) => t.session.id !== e.id);
  }
  /**
   * Puts Session on hold.
   * @param session - The session to set.
   * @param hold - Hold on if true, off if false.
   */
  async setHold(e, t) {
    if (!this.sessionExists(e))
      return Promise.reject(new Error("Session does not exist."));
    if (this.isHeld(e) === t)
      return Promise.resolve();
    if (!(e.sessionDescriptionHandler instanceof M))
      throw new Error("Session's session description handler not instance of SessionDescriptionHandler.");
    const s = {
      requestDelegate: {
        onAccept: () => {
          const o = this.sessionManaged(e);
          o !== void 0 && (o.held = t, this.enableReceiverTracks(e, !o.held), this.enableSenderTracks(e, !o.held && !o.muted), this.delegate && this.delegate.onCallHold && this.delegate.onCallHold(e, o.held));
        },
        onReject: () => {
          this.logger.warn(`[${e.id}] Re-invite request was rejected`);
          const o = this.sessionManaged(e);
          o !== void 0 && (o.held = !t, this.enableReceiverTracks(e, !o.held), this.enableSenderTracks(e, !o.held && !o.muted), this.delegate && this.delegate.onCallHold && this.delegate.onCallHold(e, o.held));
        }
      }
    }, i = e.sessionDescriptionHandlerOptionsReInvite;
    i.hold = t, e.sessionDescriptionHandlerOptionsReInvite = i;
    const n = this.sessionManaged(e);
    if (!n)
      throw new Error("Managed session is undefiend.");
    return n.held = t, e.invite(s).then(() => {
      const o = this.sessionManaged(e);
      o !== void 0 && (this.enableReceiverTracks(e, !o.held), this.enableSenderTracks(e, !o.held && !o.muted));
    }).catch((o) => {
      throw n.held = !t, o instanceof we && this.logger.error(`[${e.id}] A hold request is already in progress.`), o;
    });
  }
  /**
   * Puts Session on mute.
   * @param session - The session to mute.
   * @param mute - Mute on if true, off if false.
   */
  setMute(e, t) {
    if (!this.sessionExists(e)) {
      this.logger.warn(`[${e.id}] A session is required to enabled/disable media tracks`);
      return;
    }
    if (e.state !== p.Established) {
      this.logger.warn(`[${e.id}] An established session is required to enable/disable media tracks`);
      return;
    }
    const r = this.sessionManaged(e);
    r !== void 0 && (r.muted = t, this.enableSenderTracks(e, !r.held && !r.muted));
  }
  /** Helper function to attach local media to html elements. */
  setupLocalMedia(e) {
    const t = this.sessionManaged(e);
    if (!t)
      throw new Error("Managed session does not exist.");
    const r = typeof this.options.media.local == "function" ? this.options.media.local(e) : this.options.media.local;
    t.mediaLocal = r;
    const s = r == null ? void 0 : r.video;
    if (s) {
      const i = this.getLocalMediaStream(e);
      if (!i)
        throw new Error("Local media stream undefiend.");
      s.srcObject = i, s.volume = 0, s.play().catch((n) => {
        this.logger.error(`[${e.id}] Failed to play local media`), this.logger.error(n.message);
      });
    }
  }
  /** Helper function to attach remote media to html elements. */
  setupRemoteMedia(e) {
    const t = this.sessionManaged(e);
    if (!t)
      throw new Error("Managed session does not exist.");
    const r = typeof this.options.media.remote == "function" ? this.options.media.remote(e) : this.options.media.remote;
    t.mediaRemote = r;
    const s = (r == null ? void 0 : r.video) || (r == null ? void 0 : r.audio);
    if (s) {
      const i = this.getRemoteMediaStream(e);
      if (!i)
        throw new Error("Remote media stream undefiend.");
      s.autoplay = !0, s.srcObject = i, s.play().catch((n) => {
        this.logger.error(`[${e.id}] Failed to play remote media`), this.logger.error(n.message);
      }), i.onaddtrack = () => {
        this.logger.log("Remote media onaddtrack"), s.load(), s.play().catch((n) => {
          this.logger.error(`[${e.id}] Failed to play remote media`), this.logger.error(n.message);
        });
      };
    }
  }
  /**
   * End a session.
   * @param session - The session to terminate.
   * @remarks
   * Send a BYE request, CANCEL request or reject response to end the current Session.
   * Resolves when the request/response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when Session is terminated.
   */
  async terminate(e) {
    switch (this.logger.log(`[${e.id}] Terminating...`), e.state) {
      case p.Initial:
        if (e instanceof Ee)
          return e.cancel().then(() => {
            this.logger.log(`[${e.id}] Inviter never sent INVITE (canceled)`);
          });
        if (e instanceof pe)
          return e.reject().then(() => {
            this.logger.log(`[${e.id}] Invitation rejected (sent 480)`);
          });
        throw new Error("Unknown session type.");
      case p.Establishing:
        if (e instanceof Ee)
          return e.cancel().then(() => {
            this.logger.log(`[${e.id}] Inviter canceled (sent CANCEL)`);
          });
        if (e instanceof pe)
          return e.reject().then(() => {
            this.logger.log(`[${e.id}] Invitation rejected (sent 480)`);
          });
        throw new Error("Unknown session type.");
      case p.Established:
        return e.bye().then(() => {
          this.logger.log(`[${e.id}] Session ended (sent BYE)`);
        });
      case p.Terminating:
        break;
      case p.Terminated:
        break;
      default:
        throw new Error("Unknown state");
    }
    return this.logger.log(`[${e.id}] Terminating in state ${e.state}, no action taken`), Promise.resolve();
  }
}
class Zt {
  /**
   * Constructs a new instance of the `SimpleUser` class.
   * @param server - SIP WebSocket Server URL.
   * @param options - Options bucket. See {@link SimpleUserOptions} for details.
   */
  constructor(e, t = {}) {
    this.session = void 0, this.delegate = t.delegate, this.options = Object.assign({}, t);
    const r = {
      aor: this.options.aor,
      delegate: {
        onCallAnswered: () => {
          var s, i;
          return (i = (s = this.delegate) === null || s === void 0 ? void 0 : s.onCallAnswered) === null || i === void 0 ? void 0 : i.call(s);
        },
        onCallCreated: (s) => {
          var i, n;
          this.session = s, (n = (i = this.delegate) === null || i === void 0 ? void 0 : i.onCallCreated) === null || n === void 0 || n.call(i);
        },
        onCallReceived: () => {
          var s, i;
          return (i = (s = this.delegate) === null || s === void 0 ? void 0 : s.onCallReceived) === null || i === void 0 ? void 0 : i.call(s);
        },
        onCallHangup: () => {
          var s, i;
          this.session = void 0, !((s = this.delegate) === null || s === void 0) && s.onCallHangup && ((i = this.delegate) === null || i === void 0 || i.onCallHangup());
        },
        onCallHold: (s, i) => {
          var n, o;
          return (o = (n = this.delegate) === null || n === void 0 ? void 0 : n.onCallHold) === null || o === void 0 ? void 0 : o.call(n, i);
        },
        onCallDTMFReceived: (s, i, n) => {
          var o, d;
          return (d = (o = this.delegate) === null || o === void 0 ? void 0 : o.onCallDTMFReceived) === null || d === void 0 ? void 0 : d.call(o, i, n);
        },
        onMessageReceived: (s) => {
          var i, n;
          return (n = (i = this.delegate) === null || i === void 0 ? void 0 : i.onMessageReceived) === null || n === void 0 ? void 0 : n.call(i, s.request.body);
        },
        onRegistered: () => {
          var s, i;
          return (i = (s = this.delegate) === null || s === void 0 ? void 0 : s.onRegistered) === null || i === void 0 ? void 0 : i.call(s);
        },
        onUnregistered: () => {
          var s, i;
          return (i = (s = this.delegate) === null || s === void 0 ? void 0 : s.onUnregistered) === null || i === void 0 ? void 0 : i.call(s);
        },
        onServerConnect: () => {
          var s, i;
          return (i = (s = this.delegate) === null || s === void 0 ? void 0 : s.onServerConnect) === null || i === void 0 ? void 0 : i.call(s);
        },
        onServerDisconnect: () => {
          var s, i;
          return (i = (s = this.delegate) === null || s === void 0 ? void 0 : s.onServerDisconnect) === null || i === void 0 ? void 0 : i.call(s);
        }
      },
      maxSimultaneousSessions: 1,
      media: this.options.media,
      reconnectionAttempts: this.options.reconnectionAttempts,
      reconnectionDelay: this.options.reconnectionDelay,
      registererOptions: this.options.registererOptions,
      sendDTMFUsingSessionDescriptionHandler: this.options.sendDTMFUsingSessionDescriptionHandler,
      userAgentOptions: this.options.userAgentOptions
    };
    this.sessionManager = new Me(e, r), this.logger = this.sessionManager.userAgent.getLogger("sip.SimpleUser");
  }
  /**
   * Instance identifier.
   * @internal
   */
  get id() {
    return this.options.userAgentOptions && this.options.userAgentOptions.displayName || "Anonymous";
  }
  /** The local media stream. Undefined if call not answered. */
  get localMediaStream() {
    return this.session && this.sessionManager.getLocalMediaStream(this.session);
  }
  /** The remote media stream. Undefined if call not answered. */
  get remoteMediaStream() {
    return this.session && this.sessionManager.getRemoteMediaStream(this.session);
  }
  /**
   * The local audio track, if available.
   * @deprecated Use localMediaStream and get track from the stream.
   */
  get localAudioTrack() {
    return this.session && this.sessionManager.getLocalAudioTrack(this.session);
  }
  /**
   * The local video track, if available.
   * @deprecated Use localMediaStream and get track from the stream.
   */
  get localVideoTrack() {
    return this.session && this.sessionManager.getLocalVideoTrack(this.session);
  }
  /**
   * The remote audio track, if available.
   * @deprecated Use remoteMediaStream and get track from the stream.
   */
  get remoteAudioTrack() {
    return this.session && this.sessionManager.getRemoteAudioTrack(this.session);
  }
  /**
   * The remote video track, if available.
   * @deprecated Use remoteMediaStream and get track from the stream.
   */
  get remoteVideoTrack() {
    return this.session && this.sessionManager.getRemoteVideoTrack(this.session);
  }
  /**
   * Connect.
   * @remarks
   * Start the UserAgent's WebSocket Transport.
   */
  connect() {
    return this.logger.log(`[${this.id}] Connecting UserAgent...`), this.sessionManager.connect();
  }
  /**
   * Disconnect.
   * @remarks
   * Stop the UserAgent's WebSocket Transport.
   */
  disconnect() {
    return this.logger.log(`[${this.id}] Disconnecting UserAgent...`), this.sessionManager.disconnect();
  }
  /**
   * Return true if connected.
   */
  isConnected() {
    return this.sessionManager.isConnected();
  }
  /**
   * Start receiving incoming calls.
   * @remarks
   * Send a REGISTER request for the UserAgent's AOR.
   * Resolves when the REGISTER request is sent, otherwise rejects.
   */
  register(e) {
    return this.logger.log(`[${this.id}] Registering UserAgent...`), this.sessionManager.register(e);
  }
  /**
   * Stop receiving incoming calls.
   * @remarks
   * Send an un-REGISTER request for the UserAgent's AOR.
   * Resolves when the un-REGISTER request is sent, otherwise rejects.
   */
  unregister(e) {
    return this.logger.log(`[${this.id}] Unregistering UserAgent...`), this.sessionManager.unregister(e);
  }
  /**
   * Make an outgoing call.
   * @remarks
   * Send an INVITE request to create a new Session.
   * Resolves when the INVITE request is sent, otherwise rejects.
   * Use `onCallAnswered` delegate method to determine if Session is established.
   * @param destination - The target destination to call. A SIP address to send the INVITE to.
   * @param inviterOptions - Optional options for Inviter constructor.
   * @param inviterInviteOptions - Optional options for Inviter.invite().
   */
  call(e, t, r) {
    return this.logger.log(`[${this.id}] Beginning Session...`), this.session ? Promise.reject(new Error("Session already exists.")) : this.sessionManager.call(e, t, r).then(() => {
    });
  }
  /**
   * Hangup a call.
   * @remarks
   * Send a BYE request, CANCEL request or reject response to end the current Session.
   * Resolves when the request/response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when call is ended.
   */
  hangup() {
    return this.logger.log(`[${this.id}] Hangup...`), this.session ? this.sessionManager.hangup(this.session).then(() => {
      this.session = void 0;
    }) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Answer an incoming call.
   * @remarks
   * Accept an incoming INVITE request creating a new Session.
   * Resolves with the response is sent, otherwise rejects.
   * Use `onCallAnswered` delegate method to determine if and when call is established.
   * @param invitationAcceptOptions - Optional options for Inviter.accept().
   */
  answer(e) {
    return this.logger.log(`[${this.id}] Accepting Invitation...`), this.session ? this.sessionManager.answer(this.session, e) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Decline an incoming call.
   * @remarks
   * Reject an incoming INVITE request.
   * Resolves with the response is sent, otherwise rejects.
   * Use `onCallHangup` delegate method to determine if and when call is ended.
   */
  decline() {
    return this.logger.log(`[${this.id}] rejecting Invitation...`), this.session ? this.sessionManager.decline(this.session) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Hold call
   * @remarks
   * Send a re-INVITE with new offer indicating "hold".
   * Resolves when the re-INVITE request is sent, otherwise rejects.
   * Use `onCallHold` delegate method to determine if request is accepted or rejected.
   * See: https://tools.ietf.org/html/rfc6337
   */
  hold() {
    return this.logger.log(`[${this.id}] holding session...`), this.session ? this.sessionManager.hold(this.session) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Unhold call.
   * @remarks
   * Send a re-INVITE with new offer indicating "unhold".
   * Resolves when the re-INVITE request is sent, otherwise rejects.
   * Use `onCallHold` delegate method to determine if request is accepted or rejected.
   * See: https://tools.ietf.org/html/rfc6337
   */
  unhold() {
    return this.logger.log(`[${this.id}] unholding session...`), this.session ? this.sessionManager.unhold(this.session) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Hold state.
   * @remarks
   * True if session is on hold.
   */
  isHeld() {
    return this.session ? this.sessionManager.isHeld(this.session) : !1;
  }
  /**
   * Mute call.
   * @remarks
   * Disable sender's media tracks.
   */
  mute() {
    return this.logger.log(`[${this.id}] disabling media tracks...`), this.session && this.sessionManager.mute(this.session);
  }
  /**
   * Unmute call.
   * @remarks
   * Enable sender's media tracks.
   */
  unmute() {
    return this.logger.log(`[${this.id}] enabling media tracks...`), this.session && this.sessionManager.unmute(this.session);
  }
  /**
   * Mute state.
   * @remarks
   * True if sender's media track is disabled.
   */
  isMuted() {
    return this.session ? this.sessionManager.isMuted(this.session) : !1;
  }
  /**
   * Send DTMF.
   * @remarks
   * Send an INFO request with content type application/dtmf-relay.
   * @param tone - Tone to send.
   */
  sendDTMF(e) {
    return this.logger.log(`[${this.id}] sending DTMF...`), this.session ? this.sessionManager.sendDTMF(this.session, e) : Promise.reject(new Error("Session does not exist."));
  }
  /**
   * Send a message.
   * @remarks
   * Send a MESSAGE request.
   * @param destination - The target destination for the message. A SIP address to send the MESSAGE to.
   */
  message(e, t) {
    return this.logger.log(`[${this.id}] sending message...`), this.sessionManager.message(e, t);
  }
}
var Jt = /* @__PURE__ */ ((a) => (a.idle = "idle", a.connecting = "connecting", a.calling = "calling", a.ringing = "ringing", a.connected = "connected", a.failed = "failed", a.busy = "busy", a.error = "error", a.unknown = "unknown", a))(Jt || {});
const zt = ot({
  state: "idle",
  call: (a) => {
  },
  receive: () => {
  },
  hangup: () => {
  }
}), er = ({ children: a, sipConfig: e }) => {
  const [t, r] = ct(
    "idle"
    /* idle */
  ), s = Ae(null), i = Ae(null), {
    baseUri: n,
    server: o,
    aor: d,
    userAgentOptions: w
  } = e, f = "../PhoneRing.mp3", m = Ae(new Audio(f)), E = {
    aor: d,
    media: {
      remote: {
        audio: s.current ? s.current : void 0
      }
    },
    userAgentOptions: w
  };
  dt(() => {
    i.current || (i.current = new Zt(o, E));
    const R = i.current;
    return R.delegate = {
      onCallAnswered: () => {
        r(
          "connected"
          /* connected */
        ), g(), console.log("Call answered");
      },
      onCallCreated: () => {
        console.log("Call created");
      },
      onCallReceived: () => {
        r(
          "ringing"
          /* ringing */
        ), X(), console.log("Call received");
      },
      onCallHangup: () => {
        r(
          "idle"
          /* idle */
        ), g(), console.log("Call hung up");
      },
      onCallHold: (B) => {
        console.log(`Call ${B ? "held" : "resumed"}`);
      },
      onCallDTMFReceived: (B, ge) => {
        console.log(`DTMF received: ${B} for ${ge}ms`);
      },
      onMessageReceived: (B) => {
        console.log(`Message received: ${B}`);
      },
      onRegistered: () => {
        console.log("User registered");
      },
      onUnregistered: () => {
        console.log("User unregistered");
      },
      onServerConnect: () => {
        r(
          "idle"
          /* idle */
        ), console.log("Connected to server");
      },
      onServerDisconnect: (B) => {
        r(
          "error"
          /* error */
        ), console.error("Disconnected from server", B);
      }
    }, (async () => {
      r(
        "connecting"
        /* connecting */
      );
      try {
        await R.connect(), await R.register(), r(
          "idle"
          /* idle */
        );
      } catch (B) {
        console.error(B), r(
          "error"
          /* error */
        );
      }
    })(), () => {
      i.current && (i.current.delegate = {}, i.current.disconnect()), m.current.pause(), m.current.currentTime = 0;
    };
  }, []);
  async function I(R) {
    if (i.current) {
      r(
        "calling"
        /* calling */
      );
      try {
        const ee = `sip:${R}@${n}`;
        await i.current.call(ee);
      } catch (ee) {
        console.error(ee), r(
          "error"
          /* error */
        );
      }
    }
  }
  async function D() {
    if (i.current)
      try {
        await i.current.answer();
      } catch (R) {
        console.error(R), r(
          "error"
          /* error */
        );
      }
  }
  async function S() {
    if (i.current)
      if (t === "ringing") {
        try {
          await i.current.decline();
        } catch (R) {
          console.error(R), r(
            "error"
            /* error */
          );
        }
        return;
      } else
        try {
          await i.current.hangup();
        } catch (R) {
          console.error(R), r(
            "error"
            /* error */
          );
        }
  }
  const X = () => {
    console.log("Playing ring audio"), m.current.play().catch((R) => {
      console.error("Failed to play audio:", R);
    });
  }, g = () => {
    console.log("Pausing ring audio"), m.current.pause(), m.current.currentTime = 0;
  };
  return /* @__PURE__ */ nt(zt.Provider, { value: { state: t, call: I, receive: D, hangup: S }, children: [
    /* @__PURE__ */ at("audio", { ref: s }),
    a
  ] });
};
export {
  zt as SipContext,
  er as SipContextProvider,
  Jt as SipState
};
