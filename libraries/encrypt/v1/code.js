'use strict';
var __defProp = Object.defineProperty,
  __getOwnPropDesc = Object.getOwnPropertyDescriptor,
  __getOwnPropNames = Object.getOwnPropertyNames,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __export = (t, e) => {
    for (var i in e) __defProp(t, i, { get: e[i], enumerable: !0 });
  },
  __copyProps = (t, e, i, r) => {
    if ((e && 'object' == typeof e) || 'function' == typeof e)
      for (let n of __getOwnPropNames(e))
        __hasOwnProp.call(t, n) ||
          n === i ||
          __defProp(t, n, {
            get: () => e[n],
            enumerable: !(r = __getOwnPropDesc(e, n)) || r.enumerable,
          });
    return t;
  },
  __toCommonJS = (t) => __copyProps(__defProp({}, '__esModule', { value: !0 }), t),
  lib_exports = {};
__export(lib_exports, { JSEncrypt: () => JSEncrypt, default: () => lib_default });
var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
function int2char(t) {
  return BI_RM.charAt(t);
}
function op_and(t, e) {
  return t & e;
}
function op_or(t, e) {
  return t | e;
}
function op_xor(t, e) {
  return t ^ e;
}
function op_andnot(t, e) {
  return t & ~e;
}
function lbit(t) {
  if (0 == t) return -1;
  var e = 0;
  return (
    0 == (65535 & t) && ((t >>= 16), (e += 16)),
    0 == (255 & t) && ((t >>= 8), (e += 8)),
    0 == (15 & t) && ((t >>= 4), (e += 4)),
    0 == (3 & t) && ((t >>= 2), (e += 2)),
    0 == (1 & t) && ++e,
    e
  );
}
function cbit(t) {
  for (var e = 0; 0 != t; ) (t &= t - 1), ++e;
  return e;
}
var decoder,
  b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  b64pad = '=';
function hex2b64(t) {
  var e,
    i,
    r = '';
  for (e = 0; e + 3 <= t.length; e += 3)
    (i = parseInt(t.substring(e, e + 3), 16)), (r += b64map.charAt(i >> 6) + b64map.charAt(63 & i));
  for (
    e + 1 == t.length
      ? ((i = parseInt(t.substring(e, e + 1), 16)), (r += b64map.charAt(i << 2)))
      : e + 2 == t.length &&
        ((i = parseInt(t.substring(e, e + 2), 16)),
        (r += b64map.charAt(i >> 2) + b64map.charAt((3 & i) << 4)));
    (3 & r.length) > 0;

  )
    r += b64pad;
  return r;
}
function b64tohex(t) {
  var e,
    i = '',
    r = 0,
    n = 0;
  for (e = 0; e < t.length && t.charAt(e) != b64pad; ++e) {
    var s = b64map.indexOf(t.charAt(e));
    s < 0 ||
      (0 == r
        ? ((i += int2char(s >> 2)), (n = 3 & s), (r = 1))
        : 1 == r
        ? ((i += int2char((n << 2) | (s >> 4))), (n = 15 & s), (r = 2))
        : 2 == r
        ? ((i += int2char(n)), (i += int2char(s >> 2)), (n = 3 & s), (r = 3))
        : ((i += int2char((n << 2) | (s >> 4))), (i += int2char(15 & s)), (r = 0)));
  }
  return 1 == r && (i += int2char(n << 2)), i;
}
var decoder2,
  Hex = {
    decode: function (t) {
      var e;
      if (void 0 === decoder) {
        var i = '0123456789ABCDEF',
          r = ' \f\n\r\t \u2028\u2029';
        for (decoder = {}, e = 0; e < 16; ++e) decoder[i.charAt(e)] = e;
        for (i = i.toLowerCase(), e = 10; e < 16; ++e) decoder[i.charAt(e)] = e;
        for (e = 0; e < r.length; ++e) decoder[r.charAt(e)] = -1;
      }
      var n = [],
        s = 0,
        o = 0;
      for (e = 0; e < t.length; ++e) {
        var h = t.charAt(e);
        if ('=' == h) break;
        if (-1 != (h = decoder[h])) {
          if (void 0 === h) throw new Error('Illegal character at offset ' + e);
          (s |= h), ++o >= 2 ? ((n[n.length] = s), (s = 0), (o = 0)) : (s <<= 4);
        }
      }
      if (o) throw new Error('Hex encoding incomplete: 4 bits missing');
      return n;
    },
  },
  Base64 = {
    decode: function (t) {
      var e;
      if (void 0 === decoder2) {
        var i = '= \f\n\r\t \u2028\u2029';
        for (decoder2 = Object.create(null), e = 0; e < 64; ++e)
          decoder2['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(e)] =
            e;
        for (decoder2['-'] = 62, decoder2._ = 63, e = 0; e < i.length; ++e)
          decoder2[i.charAt(e)] = -1;
      }
      var r = [],
        n = 0,
        s = 0;
      for (e = 0; e < t.length; ++e) {
        var o = t.charAt(e);
        if ('=' == o) break;
        if (-1 != (o = decoder2[o])) {
          if (void 0 === o) throw new Error('Illegal character at offset ' + e);
          (n |= o),
            ++s >= 4
              ? ((r[r.length] = n >> 16),
                (r[r.length] = (n >> 8) & 255),
                (r[r.length] = 255 & n),
                (n = 0),
                (s = 0))
              : (n <<= 6);
        }
      }
      switch (s) {
        case 1:
          throw new Error('Base64 encoding incomplete: at least 2 bits missing');
        case 2:
          r[r.length] = n >> 10;
          break;
        case 3:
          (r[r.length] = n >> 16), (r[r.length] = (n >> 8) & 255);
      }
      return r;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function (t) {
      var e = Base64.re.exec(t);
      if (e)
        if (e[1]) t = e[1];
        else {
          if (!e[2]) throw new Error('RegExp out of sync');
          t = e[2];
        }
      return Base64.decode(t);
    },
  },
  max = 1e13,
  Int10 = (function () {
    function t(t) {
      this.buf = [+t || 0];
    }
    return (
      (t.prototype.mulAdd = function (t, e) {
        var i,
          r,
          n = this.buf,
          s = n.length;
        for (i = 0; i < s; ++i)
          (r = n[i] * t + e) < max ? (e = 0) : (r -= (e = 0 | (r / max)) * max), (n[i] = r);
        e > 0 && (n[i] = e);
      }),
      (t.prototype.sub = function (t) {
        var e,
          i,
          r = this.buf,
          n = r.length;
        for (e = 0; e < n; ++e) (i = r[e] - t) < 0 ? ((i += max), (t = 1)) : (t = 0), (r[e] = i);
        for (; 0 === r[r.length - 1]; ) r.pop();
      }),
      (t.prototype.toString = function (t) {
        if (10 != (t || 10)) throw new Error('only base 10 is supported');
        for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; r >= 0; --r)
          i += (max + e[r]).toString().substring(1);
        return i;
      }),
      (t.prototype.valueOf = function () {
        for (var t = this.buf, e = 0, i = t.length - 1; i >= 0; --i) e = e * max + t[i];
        return e;
      }),
      (t.prototype.simplify = function () {
        var t = this.buf;
        return 1 == t.length ? t[0] : this;
      }),
      t
    );
  })(),
  ellipsis = '…',
  reTimeS =
    /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
  reTimeL =
    /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function stringCut(t, e) {
  return t.length > e && (t = t.substring(0, e) + ellipsis), t;
}
var dbits,
  Stream = (function () {
    function t(e, i) {
      (this.hexDigits = '0123456789ABCDEF'),
        e instanceof t
          ? ((this.enc = e.enc), (this.pos = e.pos))
          : ((this.enc = e), (this.pos = i));
    }
    return (
      (t.prototype.get = function (t) {
        if ((void 0 === t && (t = this.pos++), t >= this.enc.length))
          throw new Error(
            'Requesting byte offset '.concat(t, ' on a stream of length ').concat(this.enc.length),
          );
        return 'string' == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t];
      }),
      (t.prototype.hexByte = function (t) {
        return this.hexDigits.charAt((t >> 4) & 15) + this.hexDigits.charAt(15 & t);
      }),
      (t.prototype.hexDump = function (t, e, i) {
        for (var r = '', n = t; n < e; ++n)
          if (((r += this.hexByte(this.get(n))), !0 !== i))
            switch (15 & n) {
              case 7:
                r += '  ';
                break;
              case 15:
                r += '\n';
                break;
              default:
                r += ' ';
            }
        return r;
      }),
      (t.prototype.isASCII = function (t, e) {
        for (var i = t; i < e; ++i) {
          var r = this.get(i);
          if (r < 32 || r > 176) return !1;
        }
        return !0;
      }),
      (t.prototype.parseStringISO = function (t, e) {
        for (var i = '', r = t; r < e; ++r) i += String.fromCharCode(this.get(r));
        return i;
      }),
      (t.prototype.parseStringUTF = function (t, e) {
        for (var i = '', r = t; r < e; ) {
          var n = this.get(r++);
          i +=
            n < 128
              ? String.fromCharCode(n)
              : n > 191 && n < 224
              ? String.fromCharCode(((31 & n) << 6) | (63 & this.get(r++)))
              : String.fromCharCode(
                  ((15 & n) << 12) | ((63 & this.get(r++)) << 6) | (63 & this.get(r++)),
                );
        }
        return i;
      }),
      (t.prototype.parseStringBMP = function (t, e) {
        for (var i, r, n = '', s = t; s < e; )
          (i = this.get(s++)), (r = this.get(s++)), (n += String.fromCharCode((i << 8) | r));
        return n;
      }),
      (t.prototype.parseTime = function (t, e, i) {
        var r = this.parseStringISO(t, e),
          n = (i ? reTimeS : reTimeL).exec(r);
        return n
          ? (i && ((n[1] = +n[1]), (n[1] += +n[1] < 70 ? 2e3 : 1900)),
            (r = n[1] + '-' + n[2] + '-' + n[3] + ' ' + n[4]),
            n[5] && ((r += ':' + n[5]), n[6] && ((r += ':' + n[6]), n[7] && (r += '.' + n[7]))),
            n[8] && ((r += ' UTC'), 'Z' != n[8] && ((r += n[8]), n[9] && (r += ':' + n[9]))),
            r)
          : 'Unrecognized time: ' + r;
      }),
      (t.prototype.parseInteger = function (t, e) {
        for (var i, r = this.get(t), n = r > 127, s = n ? 255 : 0, o = ''; r == s && ++t < e; )
          r = this.get(t);
        if (0 === (i = e - t)) return n ? -1 : 0;
        if (i > 4) {
          for (o = r, i <<= 3; 0 == (128 & (+o ^ s)); ) (o = +o << 1), --i;
          o = '(' + i + ' bit)\n';
        }
        n && (r -= 256);
        for (var h = new Int10(r), a = t + 1; a < e; ++a) h.mulAdd(256, this.get(a));
        return o + h.toString();
      }),
      (t.prototype.parseBitString = function (t, e, i) {
        for (
          var r = this.get(t), n = '(' + (((e - t - 1) << 3) - r) + ' bit)\n', s = '', o = t + 1;
          o < e;
          ++o
        ) {
          for (var h = this.get(o), a = o == e - 1 ? r : 0, u = 7; u >= a; --u)
            s += (h >> u) & 1 ? '1' : '0';
          if (s.length > i) return n + stringCut(s, i);
        }
        return n + s;
      }),
      (t.prototype.parseOctetString = function (t, e, i) {
        if (this.isASCII(t, e)) return stringCut(this.parseStringISO(t, e), i);
        var r = e - t,
          n = '(' + r + ' byte)\n';
        r > (i /= 2) && (e = t + i);
        for (var s = t; s < e; ++s) n += this.hexByte(this.get(s));
        return r > i && (n += ellipsis), n;
      }),
      (t.prototype.parseOID = function (t, e, i) {
        for (var r = '', n = new Int10(), s = 0, o = t; o < e; ++o) {
          var h = this.get(o);
          if ((n.mulAdd(128, 127 & h), (s += 7), !(128 & h))) {
            if ('' === r)
              if ((n = n.simplify()) instanceof Int10) n.sub(80), (r = '2.' + n.toString());
              else {
                var a = n < 80 ? (n < 40 ? 0 : 1) : 2;
                r = a + '.' + (n - 40 * a);
              }
            else r += '.' + n.toString();
            if (r.length > i) return stringCut(r, i);
            (n = new Int10()), (s = 0);
          }
        }
        return s > 0 && (r += '.incomplete'), r;
      }),
      t
    );
  })(),
  ASN1 = (function () {
    function t(t, e, i, r, n) {
      if (!(r instanceof ASN1Tag)) throw new Error('Invalid tag value.');
      (this.stream = t), (this.header = e), (this.length = i), (this.tag = r), (this.sub = n);
    }
    return (
      (t.prototype.typeName = function () {
        switch (this.tag.tagClass) {
          case 0:
            switch (this.tag.tagNumber) {
              case 0:
                return 'EOC';
              case 1:
                return 'BOOLEAN';
              case 2:
                return 'INTEGER';
              case 3:
                return 'BIT_STRING';
              case 4:
                return 'OCTET_STRING';
              case 5:
                return 'NULL';
              case 6:
                return 'OBJECT_IDENTIFIER';
              case 7:
                return 'ObjectDescriptor';
              case 8:
                return 'EXTERNAL';
              case 9:
                return 'REAL';
              case 10:
                return 'ENUMERATED';
              case 11:
                return 'EMBEDDED_PDV';
              case 12:
                return 'UTF8String';
              case 16:
                return 'SEQUENCE';
              case 17:
                return 'SET';
              case 18:
                return 'NumericString';
              case 19:
                return 'PrintableString';
              case 20:
                return 'TeletexString';
              case 21:
                return 'VideotexString';
              case 22:
                return 'IA5String';
              case 23:
                return 'UTCTime';
              case 24:
                return 'GeneralizedTime';
              case 25:
                return 'GraphicString';
              case 26:
                return 'VisibleString';
              case 27:
                return 'GeneralString';
              case 28:
                return 'UniversalString';
              case 30:
                return 'BMPString';
            }
            return 'Universal_' + this.tag.tagNumber.toString();
          case 1:
            return 'Application_' + this.tag.tagNumber.toString();
          case 2:
            return '[' + this.tag.tagNumber.toString() + ']';
          case 3:
            return 'Private_' + this.tag.tagNumber.toString();
        }
      }),
      (t.prototype.content = function (t) {
        if (void 0 === this.tag) return null;
        void 0 === t && (t = 1 / 0);
        var e = this.posContent(),
          i = Math.abs(this.length);
        if (!this.tag.isUniversal())
          return null !== this.sub
            ? '(' + this.sub.length + ' elem)'
            : this.stream.parseOctetString(e, e + i, t);
        switch (this.tag.tagNumber) {
          case 1:
            return 0 === this.stream.get(e) ? 'false' : 'true';
          case 2:
            return this.stream.parseInteger(e, e + i);
          case 3:
            return this.sub
              ? '(' + this.sub.length + ' elem)'
              : this.stream.parseBitString(e, e + i, t);
          case 4:
            return this.sub
              ? '(' + this.sub.length + ' elem)'
              : this.stream.parseOctetString(e, e + i, t);
          case 6:
            return this.stream.parseOID(e, e + i, t);
          case 16:
          case 17:
            return null !== this.sub ? '(' + this.sub.length + ' elem)' : '(no elem)';
          case 12:
            return stringCut(this.stream.parseStringUTF(e, e + i), t);
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 26:
            return stringCut(this.stream.parseStringISO(e, e + i), t);
          case 30:
            return stringCut(this.stream.parseStringBMP(e, e + i), t);
          case 23:
          case 24:
            return this.stream.parseTime(e, e + i, 23 == this.tag.tagNumber);
        }
        return null;
      }),
      (t.prototype.toString = function () {
        return (
          this.typeName() +
          '@' +
          this.stream.pos +
          '[header:' +
          this.header +
          ',length:' +
          this.length +
          ',sub:' +
          (null === this.sub ? 'null' : this.sub.length) +
          ']'
        );
      }),
      (t.prototype.toPrettyString = function (t) {
        void 0 === t && (t = '');
        var e = t + this.typeName() + ' @' + this.stream.pos;
        if (
          (this.length >= 0 && (e += '+'),
          (e += this.length),
          this.tag.tagConstructed
            ? (e += ' (constructed)')
            : !this.tag.isUniversal() ||
              (3 != this.tag.tagNumber && 4 != this.tag.tagNumber) ||
              null === this.sub ||
              (e += ' (encapsulates)'),
          (e += '\n'),
          null !== this.sub)
        ) {
          t += '  ';
          for (var i = 0, r = this.sub.length; i < r; ++i) e += this.sub[i].toPrettyString(t);
        }
        return e;
      }),
      (t.prototype.posStart = function () {
        return this.stream.pos;
      }),
      (t.prototype.posContent = function () {
        return this.stream.pos + this.header;
      }),
      (t.prototype.posEnd = function () {
        return this.stream.pos + this.header + Math.abs(this.length);
      }),
      (t.prototype.toHexString = function () {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
      }),
      (t.decodeLength = function (t) {
        var e = t.get(),
          i = 127 & e;
        if (i == e) return i;
        if (i > 6) throw new Error('Length over 48 bits not supported at position ' + (t.pos - 1));
        if (0 === i) return null;
        e = 0;
        for (var r = 0; r < i; ++r) e = 256 * e + t.get();
        return e;
      }),
      (t.prototype.getHexStringValue = function () {
        var t = this.toHexString(),
          e = 2 * this.header,
          i = 2 * this.length;
        return t.substr(e, i);
      }),
      (t.decode = function (e) {
        var i;
        i = e instanceof Stream ? e : new Stream(e, 0);
        var r = new Stream(i),
          n = new ASN1Tag(i),
          s = t.decodeLength(i),
          o = i.pos,
          h = o - r.pos,
          a = null,
          u = function () {
            var e = [];
            if (null !== s) {
              for (var r = o + s; i.pos < r; ) e[e.length] = t.decode(i);
              if (i.pos != r)
                throw new Error(
                  'Content size is not correct for container starting at offset ' + o,
                );
            } else
              try {
                for (;;) {
                  var n = t.decode(i);
                  if (n.tag.isEOC()) break;
                  e[e.length] = n;
                }
                s = o - i.pos;
              } catch (t) {
                throw new Error('Exception while decoding undefined length content: ' + t);
              }
            return e;
          };
        if (n.tagConstructed) a = u();
        else if (n.isUniversal() && (3 == n.tagNumber || 4 == n.tagNumber))
          try {
            if (3 == n.tagNumber && 0 != i.get())
              throw new Error('BIT STRINGs with unused bits cannot encapsulate.');
            a = u();
            for (var c = 0; c < a.length; ++c)
              if (a[c].tag.isEOC()) throw new Error('EOC is not supposed to be actual content.');
          } catch (t) {
            a = null;
          }
        if (null === a) {
          if (null === s)
            throw new Error(
              "We can't skip over an invalid tag with undefined length at offset " + o,
            );
          i.pos = o + Math.abs(s);
        }
        return new t(r, h, s, n, a);
      }),
      t
    );
  })(),
  ASN1Tag = (function () {
    function t(t) {
      var e = t.get();
      if (
        ((this.tagClass = e >> 6),
        (this.tagConstructed = 0 != (32 & e)),
        (this.tagNumber = 31 & e),
        31 == this.tagNumber)
      ) {
        var i = new Int10();
        do {
          (e = t.get()), i.mulAdd(128, 127 & e);
        } while (128 & e);
        this.tagNumber = i.simplify();
      }
    }
    return (
      (t.prototype.isUniversal = function () {
        return 0 === this.tagClass;
      }),
      (t.prototype.isEOC = function () {
        return 0 === this.tagClass && 0 === this.tagNumber;
      }),
      t
    );
  })(),
  canary = 0xdeadbeefcafe,
  j_lm = 15715070 == (16777215 & canary),
  lowprimes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193,
    197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307,
    311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421,
    431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547,
    557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
    661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797,
    809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929,
    937, 941, 947, 953, 967, 971, 977, 983, 991, 997,
  ],
  lplim = (1 << 26) / lowprimes[lowprimes.length - 1],
  BigInteger = (function () {
    function t(t, e, i) {
      null != t &&
        ('number' == typeof t
          ? this.fromNumber(t, e, i)
          : null == e && 'string' != typeof t
          ? this.fromString(t, 256)
          : this.fromString(t, e));
    }
    return (
      (t.prototype.toString = function (t) {
        if (this.s < 0) return '-' + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
          if (4 != t) return this.toRadix(t);
          e = 2;
        }
        var i,
          r = (1 << e) - 1,
          n = !1,
          s = '',
          o = this.t,
          h = this.DB - ((o * this.DB) % e);
        if (o-- > 0)
          for (h < this.DB && (i = this[o] >> h) > 0 && ((n = !0), (s = int2char(i))); o >= 0; )
            h < e
              ? ((i = (this[o] & ((1 << h) - 1)) << (e - h)),
                (i |= this[--o] >> (h += this.DB - e)))
              : ((i = (this[o] >> (h -= e)) & r), h <= 0 && ((h += this.DB), --o)),
              i > 0 && (n = !0),
              n && (s += int2char(i));
        return n ? s : '0';
      }),
      (t.prototype.negate = function () {
        var e = nbi();
        return t.ZERO.subTo(this, e), e;
      }),
      (t.prototype.abs = function () {
        return this.s < 0 ? this.negate() : this;
      }),
      (t.prototype.compareTo = function (t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var i = this.t;
        if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;
        for (; --i >= 0; ) if (0 != (e = this[i] - t[i])) return e;
        return 0;
      }),
      (t.prototype.bitLength = function () {
        return this.t <= 0
          ? 0
          : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
      }),
      (t.prototype.mod = function (e) {
        var i = nbi();
        return (
          this.abs().divRemTo(e, null, i), this.s < 0 && i.compareTo(t.ZERO) > 0 && e.subTo(i, i), i
        );
      }),
      (t.prototype.modPowInt = function (t, e) {
        var i;
        return (i = t < 256 || e.isEven() ? new Classic(e) : new Montgomery(e)), this.exp(t, i);
      }),
      (t.prototype.clone = function () {
        var t = nbi();
        return this.copyTo(t), t;
      }),
      (t.prototype.intValue = function () {
        if (this.s < 0) {
          if (1 == this.t) return this[0] - this.DV;
          if (0 == this.t) return -1;
        } else {
          if (1 == this.t) return this[0];
          if (0 == this.t) return 0;
        }
        return ((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) | this[0];
      }),
      (t.prototype.byteValue = function () {
        return 0 == this.t ? this.s : (this[0] << 24) >> 24;
      }),
      (t.prototype.shortValue = function () {
        return 0 == this.t ? this.s : (this[0] << 16) >> 16;
      }),
      (t.prototype.signum = function () {
        return this.s < 0 ? -1 : this.t <= 0 || (1 == this.t && this[0] <= 0) ? 0 : 1;
      }),
      (t.prototype.toByteArray = function () {
        var t = this.t,
          e = [];
        e[0] = this.s;
        var i,
          r = this.DB - ((t * this.DB) % 8),
          n = 0;
        if (t-- > 0)
          for (
            r < this.DB &&
            (i = this[t] >> r) != (this.s & this.DM) >> r &&
            (e[n++] = i | (this.s << (this.DB - r)));
            t >= 0;

          )
            r < 8
              ? ((i = (this[t] & ((1 << r) - 1)) << (8 - r)),
                (i |= this[--t] >> (r += this.DB - 8)))
              : ((i = (this[t] >> (r -= 8)) & 255), r <= 0 && ((r += this.DB), --t)),
              0 != (128 & i) && (i |= -256),
              0 == n && (128 & this.s) != (128 & i) && ++n,
              (n > 0 || i != this.s) && (e[n++] = i);
        return e;
      }),
      (t.prototype.equals = function (t) {
        return 0 == this.compareTo(t);
      }),
      (t.prototype.min = function (t) {
        return this.compareTo(t) < 0 ? this : t;
      }),
      (t.prototype.max = function (t) {
        return this.compareTo(t) > 0 ? this : t;
      }),
      (t.prototype.and = function (t) {
        var e = nbi();
        return this.bitwiseTo(t, op_and, e), e;
      }),
      (t.prototype.or = function (t) {
        var e = nbi();
        return this.bitwiseTo(t, op_or, e), e;
      }),
      (t.prototype.xor = function (t) {
        var e = nbi();
        return this.bitwiseTo(t, op_xor, e), e;
      }),
      (t.prototype.andNot = function (t) {
        var e = nbi();
        return this.bitwiseTo(t, op_andnot, e), e;
      }),
      (t.prototype.not = function () {
        for (var t = nbi(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
        return (t.t = this.t), (t.s = ~this.s), t;
      }),
      (t.prototype.shiftLeft = function (t) {
        var e = nbi();
        return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
      }),
      (t.prototype.shiftRight = function (t) {
        var e = nbi();
        return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
      }),
      (t.prototype.getLowestSetBit = function () {
        for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + lbit(this[t]);
        return this.s < 0 ? this.t * this.DB : -1;
      }),
      (t.prototype.bitCount = function () {
        for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += cbit(this[i] ^ e);
        return t;
      }),
      (t.prototype.testBit = function (t) {
        var e = Math.floor(t / this.DB);
        return e >= this.t ? 0 != this.s : 0 != (this[e] & (1 << t % this.DB));
      }),
      (t.prototype.setBit = function (t) {
        return this.changeBit(t, op_or);
      }),
      (t.prototype.clearBit = function (t) {
        return this.changeBit(t, op_andnot);
      }),
      (t.prototype.flipBit = function (t) {
        return this.changeBit(t, op_xor);
      }),
      (t.prototype.add = function (t) {
        var e = nbi();
        return this.addTo(t, e), e;
      }),
      (t.prototype.subtract = function (t) {
        var e = nbi();
        return this.subTo(t, e), e;
      }),
      (t.prototype.multiply = function (t) {
        var e = nbi();
        return this.multiplyTo(t, e), e;
      }),
      (t.prototype.divide = function (t) {
        var e = nbi();
        return this.divRemTo(t, e, null), e;
      }),
      (t.prototype.remainder = function (t) {
        var e = nbi();
        return this.divRemTo(t, null, e), e;
      }),
      (t.prototype.divideAndRemainder = function (t) {
        var e = nbi(),
          i = nbi();
        return this.divRemTo(t, e, i), [e, i];
      }),
      (t.prototype.modPow = function (t, e) {
        var i,
          r,
          n = t.bitLength(),
          s = nbv(1);
        if (n <= 0) return s;
        (i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6),
          (r = n < 8 ? new Classic(e) : e.isEven() ? new Barrett(e) : new Montgomery(e));
        var o = [],
          h = 3,
          a = i - 1,
          u = (1 << i) - 1;
        if (((o[1] = r.convert(this)), i > 1)) {
          var c = nbi();
          for (r.sqrTo(o[1], c); h <= u; ) (o[h] = nbi()), r.mulTo(c, o[h - 2], o[h]), (h += 2);
        }
        var f,
          p,
          l = t.t - 1,
          g = !0,
          d = nbi();
        for (n = nbits(t[l]) - 1; l >= 0; ) {
          for (
            n >= a
              ? (f = (t[l] >> (n - a)) & u)
              : ((f = (t[l] & ((1 << (n + 1)) - 1)) << (a - n)),
                l > 0 && (f |= t[l - 1] >> (this.DB + n - a))),
              h = i;
            0 == (1 & f);

          )
            (f >>= 1), --h;
          if (((n -= h) < 0 && ((n += this.DB), --l), g)) o[f].copyTo(s), (g = !1);
          else {
            for (; h > 1; ) r.sqrTo(s, d), r.sqrTo(d, s), (h -= 2);
            h > 0 ? r.sqrTo(s, d) : ((p = s), (s = d), (d = p)), r.mulTo(d, o[f], s);
          }
          for (; l >= 0 && 0 == (t[l] & (1 << n)); )
            r.sqrTo(s, d), (p = s), (s = d), (d = p), --n < 0 && ((n = this.DB - 1), --l);
        }
        return r.revert(s);
      }),
      (t.prototype.modInverse = function (e) {
        var i = e.isEven();
        if ((this.isEven() && i) || 0 == e.signum()) return t.ZERO;
        for (
          var r = e.clone(), n = this.clone(), s = nbv(1), o = nbv(0), h = nbv(0), a = nbv(1);
          0 != r.signum();

        ) {
          for (; r.isEven(); )
            r.rShiftTo(1, r),
              i
                ? ((s.isEven() && o.isEven()) || (s.addTo(this, s), o.subTo(e, o)),
                  s.rShiftTo(1, s))
                : o.isEven() || o.subTo(e, o),
              o.rShiftTo(1, o);
          for (; n.isEven(); )
            n.rShiftTo(1, n),
              i
                ? ((h.isEven() && a.isEven()) || (h.addTo(this, h), a.subTo(e, a)),
                  h.rShiftTo(1, h))
                : a.isEven() || a.subTo(e, a),
              a.rShiftTo(1, a);
          r.compareTo(n) >= 0
            ? (r.subTo(n, r), i && s.subTo(h, s), o.subTo(a, o))
            : (n.subTo(r, n), i && h.subTo(s, h), a.subTo(o, a));
        }
        return 0 != n.compareTo(t.ONE)
          ? t.ZERO
          : a.compareTo(e) >= 0
          ? a.subtract(e)
          : a.signum() < 0
          ? (a.addTo(e, a), a.signum() < 0 ? a.add(e) : a)
          : a;
      }),
      (t.prototype.pow = function (t) {
        return this.exp(t, new NullExp());
      }),
      (t.prototype.gcd = function (t) {
        var e = this.s < 0 ? this.negate() : this.clone(),
          i = t.s < 0 ? t.negate() : t.clone();
        if (e.compareTo(i) < 0) {
          var r = e;
          (e = i), (i = r);
        }
        var n = e.getLowestSetBit(),
          s = i.getLowestSetBit();
        if (s < 0) return e;
        for (n < s && (s = n), s > 0 && (e.rShiftTo(s, e), i.rShiftTo(s, i)); e.signum() > 0; )
          (n = e.getLowestSetBit()) > 0 && e.rShiftTo(n, e),
            (n = i.getLowestSetBit()) > 0 && i.rShiftTo(n, i),
            e.compareTo(i) >= 0
              ? (e.subTo(i, e), e.rShiftTo(1, e))
              : (i.subTo(e, i), i.rShiftTo(1, i));
        return s > 0 && i.lShiftTo(s, i), i;
      }),
      (t.prototype.isProbablePrime = function (t) {
        var e,
          i = this.abs();
        if (1 == i.t && i[0] <= lowprimes[lowprimes.length - 1]) {
          for (e = 0; e < lowprimes.length; ++e) if (i[0] == lowprimes[e]) return !0;
          return !1;
        }
        if (i.isEven()) return !1;
        for (e = 1; e < lowprimes.length; ) {
          for (var r = lowprimes[e], n = e + 1; n < lowprimes.length && r < lplim; )
            r *= lowprimes[n++];
          for (r = i.modInt(r); e < n; ) if (r % lowprimes[e++] == 0) return !1;
        }
        return i.millerRabin(t);
      }),
      (t.prototype.copyTo = function (t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        (t.t = this.t), (t.s = this.s);
      }),
      (t.prototype.fromInt = function (t) {
        (this.t = 1),
          (this.s = t < 0 ? -1 : 0),
          t > 0 ? (this[0] = t) : t < -1 ? (this[0] = t + this.DV) : (this.t = 0);
      }),
      (t.prototype.fromString = function (e, i) {
        var r;
        if (16 == i) r = 4;
        else if (8 == i) r = 3;
        else if (256 == i) r = 8;
        else if (2 == i) r = 1;
        else if (32 == i) r = 5;
        else {
          if (4 != i) return void this.fromRadix(e, i);
          r = 2;
        }
        (this.t = 0), (this.s = 0);
        for (var n = e.length, s = !1, o = 0; --n >= 0; ) {
          var h = 8 == r ? 255 & +e[n] : intAt(e, n);
          h < 0
            ? '-' == e.charAt(n) && (s = !0)
            : ((s = !1),
              0 == o
                ? (this[this.t++] = h)
                : o + r > this.DB
                ? ((this[this.t - 1] |= (h & ((1 << (this.DB - o)) - 1)) << o),
                  (this[this.t++] = h >> (this.DB - o)))
                : (this[this.t - 1] |= h << o),
              (o += r) >= this.DB && (o -= this.DB));
        }
        8 == r &&
          0 != (128 & +e[0]) &&
          ((this.s = -1), o > 0 && (this[this.t - 1] |= ((1 << (this.DB - o)) - 1) << o)),
          this.clamp(),
          s && t.ZERO.subTo(this, this);
      }),
      (t.prototype.clamp = function () {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
      }),
      (t.prototype.dlShiftTo = function (t, e) {
        var i;
        for (i = this.t - 1; i >= 0; --i) e[i + t] = this[i];
        for (i = t - 1; i >= 0; --i) e[i] = 0;
        (e.t = this.t + t), (e.s = this.s);
      }),
      (t.prototype.drShiftTo = function (t, e) {
        for (var i = t; i < this.t; ++i) e[i - t] = this[i];
        (e.t = Math.max(this.t - t, 0)), (e.s = this.s);
      }),
      (t.prototype.lShiftTo = function (t, e) {
        for (
          var i = t % this.DB,
            r = this.DB - i,
            n = (1 << r) - 1,
            s = Math.floor(t / this.DB),
            o = (this.s << i) & this.DM,
            h = this.t - 1;
          h >= 0;
          --h
        )
          (e[h + s + 1] = (this[h] >> r) | o), (o = (this[h] & n) << i);
        for (h = s - 1; h >= 0; --h) e[h] = 0;
        (e[s] = o), (e.t = this.t + s + 1), (e.s = this.s), e.clamp();
      }),
      (t.prototype.rShiftTo = function (t, e) {
        e.s = this.s;
        var i = Math.floor(t / this.DB);
        if (i >= this.t) e.t = 0;
        else {
          var r = t % this.DB,
            n = this.DB - r,
            s = (1 << r) - 1;
          e[0] = this[i] >> r;
          for (var o = i + 1; o < this.t; ++o)
            (e[o - i - 1] |= (this[o] & s) << n), (e[o - i] = this[o] >> r);
          r > 0 && (e[this.t - i - 1] |= (this.s & s) << n), (e.t = this.t - i), e.clamp();
        }
      }),
      (t.prototype.subTo = function (t, e) {
        for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
          (r += this[i] - t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
        if (t.t < this.t) {
          for (r -= t.s; i < this.t; ) (r += this[i]), (e[i++] = r & this.DM), (r >>= this.DB);
          r += this.s;
        } else {
          for (r += this.s; i < t.t; ) (r -= t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
          r -= t.s;
        }
        (e.s = r < 0 ? -1 : 0),
          r < -1 ? (e[i++] = this.DV + r) : r > 0 && (e[i++] = r),
          (e.t = i),
          e.clamp();
      }),
      (t.prototype.multiplyTo = function (e, i) {
        var r = this.abs(),
          n = e.abs(),
          s = r.t;
        for (i.t = s + n.t; --s >= 0; ) i[s] = 0;
        for (s = 0; s < n.t; ++s) i[s + r.t] = r.am(0, n[s], i, s, 0, r.t);
        (i.s = 0), i.clamp(), this.s != e.s && t.ZERO.subTo(i, i);
      }),
      (t.prototype.squareTo = function (t) {
        for (var e = this.abs(), i = (t.t = 2 * e.t); --i >= 0; ) t[i] = 0;
        for (i = 0; i < e.t - 1; ++i) {
          var r = e.am(i, e[i], t, 2 * i, 0, 1);
          (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV &&
            ((t[i + e.t] -= e.DV), (t[i + e.t + 1] = 1));
        }
        t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), (t.s = 0), t.clamp();
      }),
      (t.prototype.divRemTo = function (e, i, r) {
        var n = e.abs();
        if (!(n.t <= 0)) {
          var s = this.abs();
          if (s.t < n.t) return null != i && i.fromInt(0), void (null != r && this.copyTo(r));
          null == r && (r = nbi());
          var o = nbi(),
            h = this.s,
            a = e.s,
            u = this.DB - nbits(n[n.t - 1]);
          u > 0 ? (n.lShiftTo(u, o), s.lShiftTo(u, r)) : (n.copyTo(o), s.copyTo(r));
          var c = o.t,
            f = o[c - 1];
          if (0 != f) {
            var p = f * (1 << this.F1) + (c > 1 ? o[c - 2] >> this.F2 : 0),
              l = this.FV / p,
              g = (1 << this.F1) / p,
              d = 1 << this.F2,
              v = r.t,
              m = v - c,
              y = null == i ? nbi() : i;
            for (
              o.dlShiftTo(m, y),
                r.compareTo(y) >= 0 && ((r[r.t++] = 1), r.subTo(y, r)),
                t.ONE.dlShiftTo(c, y),
                y.subTo(o, o);
              o.t < c;

            )
              o[o.t++] = 0;
            for (; --m >= 0; ) {
              var b = r[--v] == f ? this.DM : Math.floor(r[v] * l + (r[v - 1] + d) * g);
              if ((r[v] += o.am(0, b, r, m, 0, c)) < b)
                for (o.dlShiftTo(m, y), r.subTo(y, r); r[v] < --b; ) r.subTo(y, r);
            }
            null != i && (r.drShiftTo(c, i), h != a && t.ZERO.subTo(i, i)),
              (r.t = c),
              r.clamp(),
              u > 0 && r.rShiftTo(u, r),
              h < 0 && t.ZERO.subTo(r, r);
          }
        }
      }),
      (t.prototype.invDigit = function () {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return (e =
          ((e =
            ((e = ((e = (e * (2 - (15 & t) * e)) & 15) * (2 - (255 & t) * e)) & 255) *
              (2 - (((65535 & t) * e) & 65535))) &
            65535) *
            (2 - ((t * e) % this.DV))) %
          this.DV) > 0
          ? this.DV - e
          : -e;
      }),
      (t.prototype.isEven = function () {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s);
      }),
      (t.prototype.exp = function (e, i) {
        if (e > 4294967295 || e < 1) return t.ONE;
        var r = nbi(),
          n = nbi(),
          s = i.convert(this),
          o = nbits(e) - 1;
        for (s.copyTo(r); --o >= 0; )
          if ((i.sqrTo(r, n), (e & (1 << o)) > 0)) i.mulTo(n, s, r);
          else {
            var h = r;
            (r = n), (n = h);
          }
        return i.revert(r);
      }),
      (t.prototype.chunkSize = function (t) {
        return Math.floor((Math.LN2 * this.DB) / Math.log(t));
      }),
      (t.prototype.toRadix = function (t) {
        if ((null == t && (t = 10), 0 == this.signum() || t < 2 || t > 36)) return '0';
        var e = this.chunkSize(t),
          i = Math.pow(t, e),
          r = nbv(i),
          n = nbi(),
          s = nbi(),
          o = '';
        for (this.divRemTo(r, n, s); n.signum() > 0; )
          (o = (i + s.intValue()).toString(t).substr(1) + o), n.divRemTo(r, n, s);
        return s.intValue().toString(t) + o;
      }),
      (t.prototype.fromRadix = function (e, i) {
        this.fromInt(0), null == i && (i = 10);
        for (
          var r = this.chunkSize(i), n = Math.pow(i, r), s = !1, o = 0, h = 0, a = 0;
          a < e.length;
          ++a
        ) {
          var u = intAt(e, a);
          u < 0
            ? '-' == e.charAt(a) && 0 == this.signum() && (s = !0)
            : ((h = i * h + u),
              ++o >= r && (this.dMultiply(n), this.dAddOffset(h, 0), (o = 0), (h = 0)));
        }
        o > 0 && (this.dMultiply(Math.pow(i, o)), this.dAddOffset(h, 0)),
          s && t.ZERO.subTo(this, this);
      }),
      (t.prototype.fromNumber = function (e, i, r) {
        if ('number' == typeof i)
          if (e < 2) this.fromInt(1);
          else
            for (
              this.fromNumber(e, r),
                this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), op_or, this),
                this.isEven() && this.dAddOffset(1, 0);
              !this.isProbablePrime(i);

            )
              this.dAddOffset(2, 0),
                this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
        else {
          var n = [],
            s = 7 & e;
          (n.length = 1 + (e >> 3)),
            i.nextBytes(n),
            s > 0 ? (n[0] &= (1 << s) - 1) : (n[0] = 0),
            this.fromString(n, 256);
        }
      }),
      (t.prototype.bitwiseTo = function (t, e, i) {
        var r,
          n,
          s = Math.min(t.t, this.t);
        for (r = 0; r < s; ++r) i[r] = e(this[r], t[r]);
        if (t.t < this.t) {
          for (n = t.s & this.DM, r = s; r < this.t; ++r) i[r] = e(this[r], n);
          i.t = this.t;
        } else {
          for (n = this.s & this.DM, r = s; r < t.t; ++r) i[r] = e(n, t[r]);
          i.t = t.t;
        }
        (i.s = e(this.s, t.s)), i.clamp();
      }),
      (t.prototype.changeBit = function (e, i) {
        var r = t.ONE.shiftLeft(e);
        return this.bitwiseTo(r, i, r), r;
      }),
      (t.prototype.addTo = function (t, e) {
        for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
          (r += this[i] + t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
        if (t.t < this.t) {
          for (r += t.s; i < this.t; ) (r += this[i]), (e[i++] = r & this.DM), (r >>= this.DB);
          r += this.s;
        } else {
          for (r += this.s; i < t.t; ) (r += t[i]), (e[i++] = r & this.DM), (r >>= this.DB);
          r += t.s;
        }
        (e.s = r < 0 ? -1 : 0),
          r > 0 ? (e[i++] = r) : r < -1 && (e[i++] = this.DV + r),
          (e.t = i),
          e.clamp();
      }),
      (t.prototype.dMultiply = function (t) {
        (this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)), ++this.t, this.clamp();
      }),
      (t.prototype.dAddOffset = function (t, e) {
        if (0 != t) {
          for (; this.t <= e; ) this[this.t++] = 0;
          for (this[e] += t; this[e] >= this.DV; )
            (this[e] -= this.DV), ++e >= this.t && (this[this.t++] = 0), ++this[e];
        }
      }),
      (t.prototype.multiplyLowerTo = function (t, e, i) {
        var r = Math.min(this.t + t.t, e);
        for (i.s = 0, i.t = r; r > 0; ) i[--r] = 0;
        for (var n = i.t - this.t; r < n; ++r) i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
        for (n = Math.min(t.t, e); r < n; ++r) this.am(0, t[r], i, r, 0, e - r);
        i.clamp();
      }),
      (t.prototype.multiplyUpperTo = function (t, e, i) {
        --e;
        var r = (i.t = this.t + t.t - e);
        for (i.s = 0; --r >= 0; ) i[r] = 0;
        for (r = Math.max(e - this.t, 0); r < t.t; ++r)
          i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
        i.clamp(), i.drShiftTo(1, i);
      }),
      (t.prototype.modInt = function (t) {
        if (t <= 0) return 0;
        var e = this.DV % t,
          i = this.s < 0 ? t - 1 : 0;
        if (this.t > 0)
          if (0 == e) i = this[0] % t;
          else for (var r = this.t - 1; r >= 0; --r) i = (e * i + this[r]) % t;
        return i;
      }),
      (t.prototype.millerRabin = function (e) {
        var i = this.subtract(t.ONE),
          r = i.getLowestSetBit();
        if (r <= 0) return !1;
        var n = i.shiftRight(r);
        (e = (e + 1) >> 1) > lowprimes.length && (e = lowprimes.length);
        for (var s = nbi(), o = 0; o < e; ++o) {
          s.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
          var h = s.modPow(n, this);
          if (0 != h.compareTo(t.ONE) && 0 != h.compareTo(i)) {
            for (var a = 1; a++ < r && 0 != h.compareTo(i); )
              if (0 == (h = h.modPowInt(2, this)).compareTo(t.ONE)) return !1;
            if (0 != h.compareTo(i)) return !1;
          }
        }
        return !0;
      }),
      (t.prototype.square = function () {
        var t = nbi();
        return this.squareTo(t), t;
      }),
      (t.prototype.gcda = function (t, e) {
        var i = this.s < 0 ? this.negate() : this.clone(),
          r = t.s < 0 ? t.negate() : t.clone();
        if (i.compareTo(r) < 0) {
          var n = i;
          (i = r), (r = n);
        }
        var s = i.getLowestSetBit(),
          o = r.getLowestSetBit();
        if (o < 0) e(i);
        else {
          s < o && (o = s), o > 0 && (i.rShiftTo(o, i), r.rShiftTo(o, r));
          var h = function () {
            (s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i),
              (s = r.getLowestSetBit()) > 0 && r.rShiftTo(s, r),
              i.compareTo(r) >= 0
                ? (i.subTo(r, i), i.rShiftTo(1, i))
                : (r.subTo(i, r), r.rShiftTo(1, r)),
              i.signum() > 0
                ? setTimeout(h, 0)
                : (o > 0 && r.lShiftTo(o, r),
                  setTimeout(function () {
                    e(r);
                  }, 0));
          };
          setTimeout(h, 10);
        }
      }),
      (t.prototype.fromNumberAsync = function (e, i, r, n) {
        if ('number' == typeof i)
          if (e < 2) this.fromInt(1);
          else {
            this.fromNumber(e, r),
              this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), op_or, this),
              this.isEven() && this.dAddOffset(1, 0);
            var s = this,
              o = function () {
                s.dAddOffset(2, 0),
                  s.bitLength() > e && s.subTo(t.ONE.shiftLeft(e - 1), s),
                  s.isProbablePrime(i)
                    ? setTimeout(function () {
                        n();
                      }, 0)
                    : setTimeout(o, 0);
              };
            setTimeout(o, 0);
          }
        else {
          var h = [],
            a = 7 & e;
          (h.length = 1 + (e >> 3)),
            i.nextBytes(h),
            a > 0 ? (h[0] &= (1 << a) - 1) : (h[0] = 0),
            this.fromString(h, 256);
        }
      }),
      t
    );
  })(),
  NullExp = (function () {
    function t() {}
    return (
      (t.prototype.convert = function (t) {
        return t;
      }),
      (t.prototype.revert = function (t) {
        return t;
      }),
      (t.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i);
      }),
      (t.prototype.sqrTo = function (t, e) {
        t.squareTo(e);
      }),
      t
    );
  })(),
  Classic = (function () {
    function t(t) {
      this.m = t;
    }
    return (
      (t.prototype.convert = function (t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
      }),
      (t.prototype.revert = function (t) {
        return t;
      }),
      (t.prototype.reduce = function (t) {
        t.divRemTo(this.m, null, t);
      }),
      (t.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i), this.reduce(i);
      }),
      (t.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      t
    );
  })(),
  Montgomery = (function () {
    function t(t) {
      (this.m = t),
        (this.mp = t.invDigit()),
        (this.mpl = 32767 & this.mp),
        (this.mph = this.mp >> 15),
        (this.um = (1 << (t.DB - 15)) - 1),
        (this.mt2 = 2 * t.t);
    }
    return (
      (t.prototype.convert = function (t) {
        var e = nbi();
        return (
          t.abs().dlShiftTo(this.m.t, e),
          e.divRemTo(this.m, null, e),
          t.s < 0 && e.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(e, e),
          e
        );
      }),
      (t.prototype.revert = function (t) {
        var e = nbi();
        return t.copyTo(e), this.reduce(e), e;
      }),
      (t.prototype.reduce = function (t) {
        for (; t.t <= this.mt2; ) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
          var i = 32767 & t[e],
            r =
              (i * this.mpl + (((i * this.mph + (t[e] >> 15) * this.mpl) & this.um) << 15)) & t.DM;
          for (t[(i = e + this.m.t)] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV; )
            (t[i] -= t.DV), t[++i]++;
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
      }),
      (t.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i), this.reduce(i);
      }),
      (t.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      t
    );
  })(),
  Barrett = (function () {
    function t(t) {
      (this.m = t),
        (this.r2 = nbi()),
        (this.q3 = nbi()),
        BigInteger.ONE.dlShiftTo(2 * t.t, this.r2),
        (this.mu = this.r2.divide(t));
    }
    return (
      (t.prototype.convert = function (t) {
        if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
        if (t.compareTo(this.m) < 0) return t;
        var e = nbi();
        return t.copyTo(e), this.reduce(e), e;
      }),
      (t.prototype.revert = function (t) {
        return t;
      }),
      (t.prototype.reduce = function (t) {
        for (
          t.drShiftTo(this.m.t - 1, this.r2),
            t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
          t.compareTo(this.r2) < 0;

        )
          t.dAddOffset(1, this.m.t + 1);
        for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; ) t.subTo(this.m, t);
      }),
      (t.prototype.mulTo = function (t, e, i) {
        t.multiplyTo(e, i), this.reduce(i);
      }),
      (t.prototype.sqrTo = function (t, e) {
        t.squareTo(e), this.reduce(e);
      }),
      t
    );
  })();
function nbi() {
  return new BigInteger(null);
}
function parseBigInt(t, e) {
  return new BigInteger(t, e);
}
var inBrowser = 'undefined' != typeof navigator;
inBrowser && j_lm && 'Microsoft Internet Explorer' == navigator.appName
  ? ((BigInteger.prototype.am = function (t, e, i, r, n, s) {
      for (var o = 32767 & e, h = e >> 15; --s >= 0; ) {
        var a = 32767 & this[t],
          u = this[t++] >> 15,
          c = h * a + u * o;
        (n =
          ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) +
          (c >>> 15) +
          h * u +
          (n >>> 30)),
          (i[r++] = 1073741823 & a);
      }
      return n;
    }),
    (dbits = 30))
  : inBrowser && j_lm && 'Netscape' != navigator.appName
  ? ((BigInteger.prototype.am = function (t, e, i, r, n, s) {
      for (; --s >= 0; ) {
        var o = e * this[t++] + i[r] + n;
        (n = Math.floor(o / 67108864)), (i[r++] = 67108863 & o);
      }
      return n;
    }),
    (dbits = 26))
  : ((BigInteger.prototype.am = function (t, e, i, r, n, s) {
      for (var o = 16383 & e, h = e >> 14; --s >= 0; ) {
        var a = 16383 & this[t],
          u = this[t++] >> 14,
          c = h * a + u * o;
        (n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u),
          (i[r++] = 268435455 & a);
      }
      return n;
    }),
    (dbits = 28)),
  (BigInteger.prototype.DB = dbits),
  (BigInteger.prototype.DM = (1 << dbits) - 1),
  (BigInteger.prototype.DV = 1 << dbits);
var BI_FP = 52;
(BigInteger.prototype.FV = Math.pow(2, BI_FP)),
  (BigInteger.prototype.F1 = BI_FP - dbits),
  (BigInteger.prototype.F2 = 2 * dbits - BI_FP);
var rr,
  vv,
  BI_RC = [];
for (rr = '0'.charCodeAt(0), vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
for (rr = 'a'.charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
for (rr = 'A'.charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
function intAt(t, e) {
  var i = BI_RC[t.charCodeAt(e)];
  return null == i ? -1 : i;
}
function nbv(t) {
  var e = nbi();
  return e.fromInt(t), e;
}
function nbits(t) {
  var e,
    i = 1;
  return (
    0 != (e = t >>> 16) && ((t = e), (i += 16)),
    0 != (e = t >> 8) && ((t = e), (i += 8)),
    0 != (e = t >> 4) && ((t = e), (i += 4)),
    0 != (e = t >> 2) && ((t = e), (i += 2)),
    0 != (e = t >> 1) && ((t = e), (i += 1)),
    i
  );
}
(BigInteger.ZERO = nbv(0)), (BigInteger.ONE = nbv(1));
var Arcfour = (function () {
  function t() {
    (this.i = 0), (this.j = 0), (this.S = []);
  }
  return (
    (t.prototype.init = function (t) {
      var e, i, r;
      for (e = 0; e < 256; ++e) this.S[e] = e;
      for (i = 0, e = 0; e < 256; ++e)
        (i = (i + this.S[e] + t[e % t.length]) & 255),
          (r = this.S[e]),
          (this.S[e] = this.S[i]),
          (this.S[i] = r);
      (this.i = 0), (this.j = 0);
    }),
    (t.prototype.next = function () {
      var t;
      return (
        (this.i = (this.i + 1) & 255),
        (this.j = (this.j + this.S[this.i]) & 255),
        (t = this.S[this.i]),
        (this.S[this.i] = this.S[this.j]),
        (this.S[this.j] = t),
        this.S[(t + this.S[this.i]) & 255]
      );
    }),
    t
  );
})();
function prng_newstate() {
  return new Arcfour();
}
var rng_state,
  rng_pptr,
  t,
  z,
  count,
  onMouseMoveListener_1,
  rng_psize = 256,
  rng_pool = null;
if (null == rng_pool) {
  if (
    ((rng_pool = []),
    (rng_pptr = 0),
    (t = void 0),
    'undefined' != typeof window && window.crypto && window.crypto.getRandomValues)
  )
    for (z = new Uint32Array(256), window.crypto.getRandomValues(z), t = 0; t < z.length; ++t)
      rng_pool[rng_pptr++] = 255 & z[t];
  (count = 0),
    (onMouseMoveListener_1 = function (t) {
      if ((count = count || 0) >= 256 || rng_pptr >= rng_psize)
        window.removeEventListener
          ? window.removeEventListener('mousemove', onMouseMoveListener_1, !1)
          : window.detachEvent && window.detachEvent('onmousemove', onMouseMoveListener_1);
      else
        try {
          var e = t.x + t.y;
          (rng_pool[rng_pptr++] = 255 & e), (count += 1);
        } catch (t) {}
    }),
    'undefined' != typeof window &&
      (window.addEventListener
        ? window.addEventListener('mousemove', onMouseMoveListener_1, !1)
        : window.attachEvent && window.attachEvent('onmousemove', onMouseMoveListener_1));
}
function rng_get_byte() {
  if (null == rng_state) {
    for (rng_state = prng_newstate(); rng_pptr < rng_psize; ) {
      var t = Math.floor(65536 * Math.random());
      rng_pool[rng_pptr++] = 255 & t;
    }
    for (rng_state.init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
      rng_pool[rng_pptr] = 0;
    rng_pptr = 0;
  }
  return rng_state.next();
}
var SecureRandom = (function () {
  function t() {}
  return (
    (t.prototype.nextBytes = function (t) {
      for (var e = 0; e < t.length; ++e) t[e] = rng_get_byte();
    }),
    t
  );
})();
function pkcs1pad1(t, e) {
  if (e < t.length + 22) return console.error('Message too long for RSA'), null;
  for (var i = e - t.length - 6, r = '', n = 0; n < i; n += 2) r += 'ff';
  return parseBigInt('0001' + r + '00' + t, 16);
}
function pkcs1pad2(t, e) {
  if (e < t.length + 11) return console.error('Message too long for RSA'), null;
  for (var i = [], r = t.length - 1; r >= 0 && e > 0; ) {
    var n = t.charCodeAt(r--);
    n < 128
      ? (i[--e] = n)
      : n > 127 && n < 2048
      ? ((i[--e] = (63 & n) | 128), (i[--e] = (n >> 6) | 192))
      : ((i[--e] = (63 & n) | 128), (i[--e] = ((n >> 6) & 63) | 128), (i[--e] = (n >> 12) | 224));
  }
  i[--e] = 0;
  for (var s = new SecureRandom(), o = []; e > 2; ) {
    for (o[0] = 0; 0 == o[0]; ) s.nextBytes(o);
    i[--e] = o[0];
  }
  return (i[--e] = 2), (i[--e] = 0), new BigInteger(i);
}
var RSAKey = (function () {
  function t() {
    (this.n = null),
      (this.e = 0),
      (this.d = null),
      (this.p = null),
      (this.q = null),
      (this.dmp1 = null),
      (this.dmq1 = null),
      (this.coeff = null);
  }
  return (
    (t.prototype.doPublic = function (t) {
      return t.modPowInt(this.e, this.n);
    }),
    (t.prototype.doPrivate = function (t) {
      if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
      for (
        var e = t.mod(this.p).modPow(this.dmp1, this.p),
          i = t.mod(this.q).modPow(this.dmq1, this.q);
        e.compareTo(i) < 0;

      )
        e = e.add(this.p);
      return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i);
    }),
    (t.prototype.setPublic = function (t, e) {
      null != t && null != e && t.length > 0 && e.length > 0
        ? ((this.n = parseBigInt(t, 16)), (this.e = parseInt(e, 16)))
        : console.error('Invalid RSA public key');
    }),
    (t.prototype.encrypt = function (t) {
      var e = (this.n.bitLength() + 7) >> 3,
        i = pkcs1pad2(t, e);
      if (null == i) return null;
      var r = this.doPublic(i);
      if (null == r) return null;
      for (var n = r.toString(16), s = n.length, o = 0; o < 2 * e - s; o++) n = '0' + n;
      return n;
    }),
    (t.prototype.setPrivate = function (t, e, i) {
      null != t && null != e && t.length > 0 && e.length > 0
        ? ((this.n = parseBigInt(t, 16)), (this.e = parseInt(e, 16)), (this.d = parseBigInt(i, 16)))
        : console.error('Invalid RSA private key');
    }),
    (t.prototype.setPrivateEx = function (t, e, i, r, n, s, o, h) {
      null != t && null != e && t.length > 0 && e.length > 0
        ? ((this.n = parseBigInt(t, 16)),
          (this.e = parseInt(e, 16)),
          (this.d = parseBigInt(i, 16)),
          (this.p = parseBigInt(r, 16)),
          (this.q = parseBigInt(n, 16)),
          (this.dmp1 = parseBigInt(s, 16)),
          (this.dmq1 = parseBigInt(o, 16)),
          (this.coeff = parseBigInt(h, 16)))
        : console.error('Invalid RSA private key');
    }),
    (t.prototype.generate = function (t, e) {
      var i = new SecureRandom(),
        r = t >> 1;
      this.e = parseInt(e, 16);
      for (var n = new BigInteger(e, 16); ; ) {
        for (
          ;
          (this.p = new BigInteger(t - r, 1, i)),
            0 != this.p.subtract(BigInteger.ONE).gcd(n).compareTo(BigInteger.ONE) ||
              !this.p.isProbablePrime(10);

        );
        for (
          ;
          (this.q = new BigInteger(r, 1, i)),
            0 != this.q.subtract(BigInteger.ONE).gcd(n).compareTo(BigInteger.ONE) ||
              !this.q.isProbablePrime(10);

        );
        if (this.p.compareTo(this.q) <= 0) {
          var s = this.p;
          (this.p = this.q), (this.q = s);
        }
        var o = this.p.subtract(BigInteger.ONE),
          h = this.q.subtract(BigInteger.ONE),
          a = o.multiply(h);
        if (0 == a.gcd(n).compareTo(BigInteger.ONE)) {
          (this.n = this.p.multiply(this.q)),
            (this.d = n.modInverse(a)),
            (this.dmp1 = this.d.mod(o)),
            (this.dmq1 = this.d.mod(h)),
            (this.coeff = this.q.modInverse(this.p));
          break;
        }
      }
    }),
    (t.prototype.decrypt = function (t) {
      var e = parseBigInt(t, 16),
        i = this.doPrivate(e);
      return null == i ? null : pkcs1unpad2(i, (this.n.bitLength() + 7) >> 3);
    }),
    (t.prototype.generateAsync = function (t, e, i) {
      var r = new SecureRandom(),
        n = t >> 1;
      this.e = parseInt(e, 16);
      var s = new BigInteger(e, 16),
        o = this,
        h = function () {
          var e = function () {
              if (o.p.compareTo(o.q) <= 0) {
                var t = o.p;
                (o.p = o.q), (o.q = t);
              }
              var e = o.p.subtract(BigInteger.ONE),
                r = o.q.subtract(BigInteger.ONE),
                n = e.multiply(r);
              0 == n.gcd(s).compareTo(BigInteger.ONE)
                ? ((o.n = o.p.multiply(o.q)),
                  (o.d = s.modInverse(n)),
                  (o.dmp1 = o.d.mod(e)),
                  (o.dmq1 = o.d.mod(r)),
                  (o.coeff = o.q.modInverse(o.p)),
                  setTimeout(function () {
                    i();
                  }, 0))
                : setTimeout(h, 0);
            },
            a = function () {
              (o.q = nbi()),
                o.q.fromNumberAsync(n, 1, r, function () {
                  o.q.subtract(BigInteger.ONE).gcda(s, function (t) {
                    0 == t.compareTo(BigInteger.ONE) && o.q.isProbablePrime(10)
                      ? setTimeout(e, 0)
                      : setTimeout(a, 0);
                  });
                });
            },
            u = function () {
              (o.p = nbi()),
                o.p.fromNumberAsync(t - n, 1, r, function () {
                  o.p.subtract(BigInteger.ONE).gcda(s, function (t) {
                    0 == t.compareTo(BigInteger.ONE) && o.p.isProbablePrime(10)
                      ? setTimeout(a, 0)
                      : setTimeout(u, 0);
                  });
                });
            };
          setTimeout(u, 0);
        };
      setTimeout(h, 0);
    }),
    (t.prototype.sign = function (t, e, i) {
      var r = pkcs1pad1(getDigestHeader(i) + e(t).toString(), this.n.bitLength() / 4);
      if (null == r) return null;
      var n = this.doPrivate(r);
      if (null == n) return null;
      var s = n.toString(16);
      return 0 == (1 & s.length) ? s : '0' + s;
    }),
    (t.prototype.verify = function (t, e, i) {
      var r = parseBigInt(e, 16),
        n = this.doPublic(r);
      return null == n
        ? null
        : removeDigestHeader(n.toString(16).replace(/^1f+00/, '')) == i(t).toString();
    }),
    t
  );
})();
function pkcs1unpad2(t, e) {
  for (var i = t.toByteArray(), r = 0; r < i.length && 0 == i[r]; ) ++r;
  if (i.length - r != e - 1 || 2 != i[r]) return null;
  for (++r; 0 != i[r]; ) if (++r >= i.length) return null;
  for (var n = ''; ++r < i.length; ) {
    var s = 255 & i[r];
    s < 128
      ? (n += String.fromCharCode(s))
      : s > 191 && s < 224
      ? ((n += String.fromCharCode(((31 & s) << 6) | (63 & i[r + 1]))), ++r)
      : ((n += String.fromCharCode(((15 & s) << 12) | ((63 & i[r + 1]) << 6) | (63 & i[r + 2]))),
        (r += 2));
  }
  return n;
}
var DIGEST_HEADERS = {
  md2: '3020300c06082a864886f70d020205000410',
  md5: '3020300c06082a864886f70d020505000410',
  sha1: '3021300906052b0e03021a05000414',
  sha224: '302d300d06096086480165030402040500041c',
  sha256: '3031300d060960864801650304020105000420',
  sha384: '3041300d060960864801650304020205000430',
  sha512: '3051300d060960864801650304020305000440',
  ripemd160: '3021300906052b2403020105000414',
};
function getDigestHeader(t) {
  return DIGEST_HEADERS[t] || '';
}
function removeDigestHeader(t) {
  for (var e in DIGEST_HEADERS)
    if (DIGEST_HEADERS.hasOwnProperty(e)) {
      var i = DIGEST_HEADERS[e],
        r = i.length;
      if (t.substr(0, r) == i) return t.substr(r);
    }
  return t;
}
var YAHOO = {};
YAHOO.lang = {
  extend: function (t, e, i) {
    if (!e || !t)
      throw new Error('YAHOO.lang.extend failed, please check that all dependencies are included.');
    var r = function () {};
    if (
      ((r.prototype = e.prototype),
      (t.prototype = new r()),
      (t.prototype.constructor = t),
      (t.superclass = e.prototype),
      e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
      i)
    ) {
      var n;
      for (n in i) t.prototype[n] = i[n];
      var s = function () {},
        o = ['toString', 'valueOf'];
      try {
        /MSIE/.test(navigator.userAgent) &&
          (s = function (t, e) {
            for (n = 0; n < o.length; n += 1) {
              var i = o[n],
                r = e[i];
              'function' == typeof r && r != Object.prototype[i] && (t[i] = r);
            }
          });
      } catch (t) {}
      s(t.prototype, i);
    }
  },
};
var KJUR = {};
(void 0 !== KJUR.asn1 && KJUR.asn1) || (KJUR.asn1 = {}),
  (KJUR.asn1.ASN1Util = new (function () {
    (this.integerToByteHex = function (t) {
      var e = t.toString(16);
      return e.length % 2 == 1 && (e = '0' + e), e;
    }),
      (this.bigIntToMinTwosComplementsHex = function (t) {
        var e = t.toString(16);
        if ('-' != e.substr(0, 1))
          e.length % 2 == 1 ? (e = '0' + e) : e.match(/^[0-7]/) || (e = '00' + e);
        else {
          var i = e.substr(1).length;
          i % 2 == 1 ? (i += 1) : e.match(/^[0-7]/) || (i += 2);
          for (var r = '', n = 0; n < i; n++) r += 'f';
          e = new BigInteger(r, 16).xor(t).add(BigInteger.ONE).toString(16).replace(/^-/, '');
        }
        return e;
      }),
      (this.getPEMStringFromHex = function (t, e) {
        return hextopem(t, e);
      }),
      (this.newObject = function (t) {
        var e = KJUR.asn1,
          i = e.DERBoolean,
          r = e.DERInteger,
          n = e.DERBitString,
          s = e.DEROctetString,
          o = e.DERNull,
          h = e.DERObjectIdentifier,
          a = e.DEREnumerated,
          u = e.DERUTF8String,
          c = e.DERNumericString,
          f = e.DERPrintableString,
          p = e.DERTeletexString,
          l = e.DERIA5String,
          g = e.DERUTCTime,
          d = e.DERGeneralizedTime,
          v = e.DERSequence,
          m = e.DERSet,
          y = e.DERTaggedObject,
          b = e.ASN1Util.newObject,
          S = Object.keys(t);
        if (1 != S.length) throw 'key of param shall be only one.';
        var T = S[0];
        if (
          -1 ==
          ':bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:'.indexOf(
            ':' + T + ':',
          )
        )
          throw 'undefined key: ' + T;
        if ('bool' == T) return new i(t[T]);
        if ('int' == T) return new r(t[T]);
        if ('bitstr' == T) return new n(t[T]);
        if ('octstr' == T) return new s(t[T]);
        if ('null' == T) return new o(t[T]);
        if ('oid' == T) return new h(t[T]);
        if ('enum' == T) return new a(t[T]);
        if ('utf8str' == T) return new u(t[T]);
        if ('numstr' == T) return new c(t[T]);
        if ('prnstr' == T) return new f(t[T]);
        if ('telstr' == T) return new p(t[T]);
        if ('ia5str' == T) return new l(t[T]);
        if ('utctime' == T) return new g(t[T]);
        if ('gentime' == T) return new d(t[T]);
        if ('seq' == T) {
          for (var R = t[T], E = [], w = 0; w < R.length; w++) {
            var B = b(R[w]);
            E.push(B);
          }
          return new v({ array: E });
        }
        if ('set' == T) {
          for (R = t[T], E = [], w = 0; w < R.length; w++) {
            B = b(R[w]);
            E.push(B);
          }
          return new m({ array: E });
        }
        if ('tag' == T) {
          var D = t[T];
          if ('[object Array]' === Object.prototype.toString.call(D) && 3 == D.length) {
            var I = b(D[2]);
            return new y({ tag: D[0], explicit: D[1], obj: I });
          }
          var x = {};
          if (
            (void 0 !== D.explicit && (x.explicit = D.explicit),
            void 0 !== D.tag && (x.tag = D.tag),
            void 0 === D.obj)
          )
            throw "obj shall be specified for 'tag'.";
          return (x.obj = b(D.obj)), new y(x);
        }
      }),
      (this.jsonToASN1HEX = function (t) {
        return this.newObject(t).getEncodedHex();
      });
  })()),
  (KJUR.asn1.ASN1Util.oidHexToInt = function (t) {
    for (
      var e = '',
        i = parseInt(t.substr(0, 2), 16),
        r = ((e = Math.floor(i / 40) + '.' + (i % 40)), ''),
        n = 2;
      n < t.length;
      n += 2
    ) {
      var s = ('00000000' + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
      if (((r += s.substr(1, 7)), '0' == s.substr(0, 1)))
        (e = e + '.' + new BigInteger(r, 2).toString(10)), (r = '');
    }
    return e;
  }),
  (KJUR.asn1.ASN1Util.oidIntToHex = function (t) {
    var e = function (t) {
        var e = t.toString(16);
        return 1 == e.length && (e = '0' + e), e;
      },
      i = function (t) {
        var i = '',
          r = new BigInteger(t, 10).toString(2),
          n = 7 - (r.length % 7);
        7 == n && (n = 0);
        for (var s = '', o = 0; o < n; o++) s += '0';
        r = s + r;
        for (o = 0; o < r.length - 1; o += 7) {
          var h = r.substr(o, 7);
          o != r.length - 7 && (h = '1' + h), (i += e(parseInt(h, 2)));
        }
        return i;
      };
    if (!t.match(/^[0-9.]+$/)) throw 'malformed oid string: ' + t;
    var r = '',
      n = t.split('.'),
      s = 40 * parseInt(n[0]) + parseInt(n[1]);
    (r += e(s)), n.splice(0, 2);
    for (var o = 0; o < n.length; o++) r += i(n[o]);
    return r;
  }),
  (KJUR.asn1.ASN1Object = function () {
    (this.getLengthHexFromValue = function () {
      if (void 0 === this.hV || null == this.hV) throw 'this.hV is null or undefined.';
      if (this.hV.length % 2 == 1)
        throw 'value hex must be even length: n=' + ''.length + ',v=' + this.hV;
      var t = this.hV.length / 2,
        e = t.toString(16);
      if ((e.length % 2 == 1 && (e = '0' + e), t < 128)) return e;
      var i = e.length / 2;
      if (i > 15) throw 'ASN.1 length too long to represent by 8x: n = ' + t.toString(16);
      return (128 + i).toString(16) + e;
    }),
      (this.getEncodedHex = function () {
        return (
          (null == this.hTLV || this.isModified) &&
            ((this.hV = this.getFreshValueHex()),
            (this.hL = this.getLengthHexFromValue()),
            (this.hTLV = this.hT + this.hL + this.hV),
            (this.isModified = !1)),
          this.hTLV
        );
      }),
      (this.getValueHex = function () {
        return this.getEncodedHex(), this.hV;
      }),
      (this.getFreshValueHex = function () {
        return '';
      });
  }),
  (KJUR.asn1.DERAbstractString = function (t) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    (this.getString = function () {
      return this.s;
    }),
      (this.setString = function (t) {
        (this.hTLV = null), (this.isModified = !0), (this.s = t), (this.hV = stohex(this.s));
      }),
      (this.setStringHex = function (t) {
        (this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = t);
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      }),
      void 0 !== t &&
        ('string' == typeof t
          ? this.setString(t)
          : void 0 !== t.str
          ? this.setString(t.str)
          : void 0 !== t.hex && this.setStringHex(t.hex));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERAbstractTime = function (t) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    (this.localDateToUTC = function (t) {
      return (utc = t.getTime() + 6e4 * t.getTimezoneOffset()), new Date(utc);
    }),
      (this.formatDate = function (t, e, i) {
        var r = this.zeroPadding,
          n = this.localDateToUTC(t),
          s = String(n.getFullYear());
        'utc' == e && (s = s.substr(2, 2));
        var o =
          s +
          r(String(n.getMonth() + 1), 2) +
          r(String(n.getDate()), 2) +
          r(String(n.getHours()), 2) +
          r(String(n.getMinutes()), 2) +
          r(String(n.getSeconds()), 2);
        if (!0 === i) {
          var h = n.getMilliseconds();
          if (0 != h) {
            var a = r(String(h), 3);
            o = o + '.' + (a = a.replace(/[0]+$/, ''));
          }
        }
        return o + 'Z';
      }),
      (this.zeroPadding = function (t, e) {
        return t.length >= e ? t : new Array(e - t.length + 1).join('0') + t;
      }),
      (this.getString = function () {
        return this.s;
      }),
      (this.setString = function (t) {
        (this.hTLV = null), (this.isModified = !0), (this.s = t), (this.hV = stohex(t));
      }),
      (this.setByDateValue = function (t, e, i, r, n, s) {
        var o = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
        this.setByDate(o);
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      });
  }),
  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERAbstractStructured = function (t) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    (this.setByASN1ObjectArray = function (t) {
      (this.hTLV = null), (this.isModified = !0), (this.asn1Array = t);
    }),
      (this.appendASN1Object = function (t) {
        (this.hTLV = null), (this.isModified = !0), this.asn1Array.push(t);
      }),
      (this.asn1Array = new Array()),
      void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array);
  }),
  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERBoolean = function () {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this),
      (this.hT = '01'),
      (this.hTLV = '0101ff');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERInteger = function (t) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this),
      (this.hT = '02'),
      (this.setByBigInteger = function (t) {
        (this.hTLV = null),
          (this.isModified = !0),
          (this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t));
      }),
      (this.setByInteger = function (t) {
        var e = new BigInteger(String(t), 10);
        this.setByBigInteger(e);
      }),
      (this.setValueHex = function (t) {
        this.hV = t;
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      }),
      void 0 !== t &&
        (void 0 !== t.bigint
          ? this.setByBigInteger(t.bigint)
          : void 0 !== t.int
          ? this.setByInteger(t.int)
          : 'number' == typeof t
          ? this.setByInteger(t)
          : void 0 !== t.hex && this.setValueHex(t.hex));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERBitString = function (t) {
    if (void 0 !== t && void 0 !== t.obj) {
      var e = KJUR.asn1.ASN1Util.newObject(t.obj);
      t.hex = '00' + e.getEncodedHex();
    }
    KJUR.asn1.DERBitString.superclass.constructor.call(this),
      (this.hT = '03'),
      (this.setHexValueIncludingUnusedBits = function (t) {
        (this.hTLV = null), (this.isModified = !0), (this.hV = t);
      }),
      (this.setUnusedBitsAndHexValue = function (t, e) {
        if (t < 0 || 7 < t) throw 'unused bits shall be from 0 to 7: u = ' + t;
        var i = '0' + t;
        (this.hTLV = null), (this.isModified = !0), (this.hV = i + e);
      }),
      (this.setByBinaryString = function (t) {
        var e = 8 - ((t = t.replace(/0+$/, '')).length % 8);
        8 == e && (e = 0);
        for (var i = 0; i <= e; i++) t += '0';
        var r = '';
        for (i = 0; i < t.length - 1; i += 8) {
          var n = t.substr(i, 8),
            s = parseInt(n, 2).toString(16);
          1 == s.length && (s = '0' + s), (r += s);
        }
        (this.hTLV = null), (this.isModified = !0), (this.hV = '0' + e + r);
      }),
      (this.setByBooleanArray = function (t) {
        for (var e = '', i = 0; i < t.length; i++) 1 == t[i] ? (e += '1') : (e += '0');
        this.setByBinaryString(e);
      }),
      (this.newFalseArray = function (t) {
        for (var e = new Array(t), i = 0; i < t; i++) e[i] = !1;
        return e;
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      }),
      void 0 !== t &&
        ('string' == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/)
          ? this.setHexValueIncludingUnusedBits(t)
          : void 0 !== t.hex
          ? this.setHexValueIncludingUnusedBits(t.hex)
          : void 0 !== t.bin
          ? this.setByBinaryString(t.bin)
          : void 0 !== t.array && this.setByBooleanArray(t.array));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DEROctetString = function (t) {
    if (void 0 !== t && void 0 !== t.obj) {
      var e = KJUR.asn1.ASN1Util.newObject(t.obj);
      t.hex = e.getEncodedHex();
    }
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, t), (this.hT = '04');
  }),
  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
  (KJUR.asn1.DERNull = function () {
    KJUR.asn1.DERNull.superclass.constructor.call(this), (this.hT = '05'), (this.hTLV = '0500');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERObjectIdentifier = function (t) {
    var e = function (t) {
        var e = t.toString(16);
        return 1 == e.length && (e = '0' + e), e;
      },
      i = function (t) {
        var i = '',
          r = new BigInteger(t, 10).toString(2),
          n = 7 - (r.length % 7);
        7 == n && (n = 0);
        for (var s = '', o = 0; o < n; o++) s += '0';
        r = s + r;
        for (o = 0; o < r.length - 1; o += 7) {
          var h = r.substr(o, 7);
          o != r.length - 7 && (h = '1' + h), (i += e(parseInt(h, 2)));
        }
        return i;
      };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
      (this.hT = '06'),
      (this.setValueHex = function (t) {
        (this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = t);
      }),
      (this.setValueOidString = function (t) {
        if (!t.match(/^[0-9.]+$/)) throw 'malformed oid string: ' + t;
        var r = '',
          n = t.split('.'),
          s = 40 * parseInt(n[0]) + parseInt(n[1]);
        (r += e(s)), n.splice(0, 2);
        for (var o = 0; o < n.length; o++) r += i(n[o]);
        (this.hTLV = null), (this.isModified = !0), (this.s = null), (this.hV = r);
      }),
      (this.setValueName = function (t) {
        var e = KJUR.asn1.x509.OID.name2oid(t);
        if ('' === e) throw 'DERObjectIdentifier oidName undefined: ' + t;
        this.setValueOidString(e);
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      }),
      void 0 !== t &&
        ('string' == typeof t
          ? t.match(/^[0-2].[0-9.]+$/)
            ? this.setValueOidString(t)
            : this.setValueName(t)
          : void 0 !== t.oid
          ? this.setValueOidString(t.oid)
          : void 0 !== t.hex
          ? this.setValueHex(t.hex)
          : void 0 !== t.name && this.setValueName(t.name));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DEREnumerated = function (t) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this),
      (this.hT = '0a'),
      (this.setByBigInteger = function (t) {
        (this.hTLV = null),
          (this.isModified = !0),
          (this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t));
      }),
      (this.setByInteger = function (t) {
        var e = new BigInteger(String(t), 10);
        this.setByBigInteger(e);
      }),
      (this.setValueHex = function (t) {
        this.hV = t;
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      }),
      void 0 !== t &&
        (void 0 !== t.int
          ? this.setByInteger(t.int)
          : 'number' == typeof t
          ? this.setByInteger(t)
          : void 0 !== t.hex && this.setValueHex(t.hex));
  }),
  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object),
  (KJUR.asn1.DERUTF8String = function (t) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, t), (this.hT = '0c');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
  (KJUR.asn1.DERNumericString = function (t) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, t), (this.hT = '12');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
  (KJUR.asn1.DERPrintableString = function (t) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, t), (this.hT = '13');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
  (KJUR.asn1.DERTeletexString = function (t) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, t), (this.hT = '14');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
  (KJUR.asn1.DERIA5String = function (t) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, t), (this.hT = '16');
  }),
  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
  (KJUR.asn1.DERUTCTime = function (t) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, t),
      (this.hT = '17'),
      (this.setByDate = function (t) {
        (this.hTLV = null),
          (this.isModified = !0),
          (this.date = t),
          (this.s = this.formatDate(this.date, 'utc')),
          (this.hV = stohex(this.s));
      }),
      (this.getFreshValueHex = function () {
        return (
          void 0 === this.date &&
            void 0 === this.s &&
            ((this.date = new Date()),
            (this.s = this.formatDate(this.date, 'utc')),
            (this.hV = stohex(this.s))),
          this.hV
        );
      }),
      void 0 !== t &&
        (void 0 !== t.str
          ? this.setString(t.str)
          : 'string' == typeof t && t.match(/^[0-9]{12}Z$/)
          ? this.setString(t)
          : void 0 !== t.hex
          ? this.setStringHex(t.hex)
          : void 0 !== t.date && this.setByDate(t.date));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
  (KJUR.asn1.DERGeneralizedTime = function (t) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
      (this.hT = '18'),
      (this.withMillis = !1),
      (this.setByDate = function (t) {
        (this.hTLV = null),
          (this.isModified = !0),
          (this.date = t),
          (this.s = this.formatDate(this.date, 'gen', this.withMillis)),
          (this.hV = stohex(this.s));
      }),
      (this.getFreshValueHex = function () {
        return (
          void 0 === this.date &&
            void 0 === this.s &&
            ((this.date = new Date()),
            (this.s = this.formatDate(this.date, 'gen', this.withMillis)),
            (this.hV = stohex(this.s))),
          this.hV
        );
      }),
      void 0 !== t &&
        (void 0 !== t.str
          ? this.setString(t.str)
          : 'string' == typeof t && t.match(/^[0-9]{14}Z$/)
          ? this.setString(t)
          : void 0 !== t.hex
          ? this.setStringHex(t.hex)
          : void 0 !== t.date && this.setByDate(t.date),
        !0 === t.millis && (this.withMillis = !0));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
  (KJUR.asn1.DERSequence = function (t) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, t),
      (this.hT = '30'),
      (this.getFreshValueHex = function () {
        for (var t = '', e = 0; e < this.asn1Array.length; e++) {
          t += this.asn1Array[e].getEncodedHex();
        }
        return (this.hV = t), this.hV;
      });
  }),
  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
  (KJUR.asn1.DERSet = function (t) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, t),
      (this.hT = '31'),
      (this.sortFlag = !0),
      (this.getFreshValueHex = function () {
        for (var t = new Array(), e = 0; e < this.asn1Array.length; e++) {
          var i = this.asn1Array[e];
          t.push(i.getEncodedHex());
        }
        return 1 == this.sortFlag && t.sort(), (this.hV = t.join('')), this.hV;
      }),
      void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1);
  }),
  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
  (KJUR.asn1.DERTaggedObject = function (t) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
      (this.hT = 'a0'),
      (this.hV = ''),
      (this.isExplicit = !0),
      (this.asn1Object = null),
      (this.setASN1Object = function (t, e, i) {
        (this.hT = e),
          (this.isExplicit = t),
          (this.asn1Object = i),
          this.isExplicit
            ? ((this.hV = this.asn1Object.getEncodedHex()),
              (this.hTLV = null),
              (this.isModified = !0))
            : ((this.hV = null),
              (this.hTLV = i.getEncodedHex()),
              (this.hTLV = this.hTLV.replace(/^../, e)),
              (this.isModified = !1));
      }),
      (this.getFreshValueHex = function () {
        return this.hV;
      }),
      void 0 !== t &&
        (void 0 !== t.tag && (this.hT = t.tag),
        void 0 !== t.explicit && (this.isExplicit = t.explicit),
        void 0 !== t.obj &&
          ((this.asn1Object = t.obj),
          this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
  }),
  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
var _a,
  __extends = (function () {
    var t = function (e, i) {
      return (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        })(e, i);
    };
    return function (e, i) {
      if ('function' != typeof i && null !== i)
        throw new TypeError('Class extends value ' + String(i) + ' is not a constructor or null');
      function r() {
        this.constructor = e;
      }
      t(e, i),
        (e.prototype = null === i ? Object.create(i) : ((r.prototype = i.prototype), new r()));
    };
  })(),
  JSEncryptRSAKey = (function (t) {
    function e(i) {
      var r = t.call(this) || this;
      return (
        i &&
          ('string' == typeof i
            ? r.parseKey(i)
            : (e.hasPrivateKeyProperty(i) || e.hasPublicKeyProperty(i)) &&
              r.parsePropertiesFrom(i)),
        r
      );
    }
    return (
      __extends(e, t),
      (e.prototype.parseKey = function (t) {
        try {
          var e = 0,
            i = 0,
            r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? Hex.decode(t) : Base64.unarmor(t),
            n = ASN1.decode(r);
          if ((3 === n.sub.length && (n = n.sub[2].sub[0]), 9 === n.sub.length)) {
            (e = n.sub[1].getHexStringValue()),
              (this.n = parseBigInt(e, 16)),
              (i = n.sub[2].getHexStringValue()),
              (this.e = parseInt(i, 16));
            var s = n.sub[3].getHexStringValue();
            this.d = parseBigInt(s, 16);
            var o = n.sub[4].getHexStringValue();
            this.p = parseBigInt(o, 16);
            var h = n.sub[5].getHexStringValue();
            this.q = parseBigInt(h, 16);
            var a = n.sub[6].getHexStringValue();
            this.dmp1 = parseBigInt(a, 16);
            var u = n.sub[7].getHexStringValue();
            this.dmq1 = parseBigInt(u, 16);
            var c = n.sub[8].getHexStringValue();
            this.coeff = parseBigInt(c, 16);
          } else {
            if (2 !== n.sub.length) return !1;
            if (n.sub[0].sub) {
              var f = n.sub[1].sub[0];
              (e = f.sub[0].getHexStringValue()),
                (this.n = parseBigInt(e, 16)),
                (i = f.sub[1].getHexStringValue()),
                (this.e = parseInt(i, 16));
            } else
              (e = n.sub[0].getHexStringValue()),
                (this.n = parseBigInt(e, 16)),
                (i = n.sub[1].getHexStringValue()),
                (this.e = parseInt(i, 16));
          }
          return !0;
        } catch (t) {
          return !1;
        }
      }),
      (e.prototype.getPrivateBaseKey = function () {
        var t = {
          array: [
            new KJUR.asn1.DERInteger({ int: 0 }),
            new KJUR.asn1.DERInteger({ bigint: this.n }),
            new KJUR.asn1.DERInteger({ int: this.e }),
            new KJUR.asn1.DERInteger({ bigint: this.d }),
            new KJUR.asn1.DERInteger({ bigint: this.p }),
            new KJUR.asn1.DERInteger({ bigint: this.q }),
            new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
            new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
            new KJUR.asn1.DERInteger({ bigint: this.coeff }),
          ],
        };
        return new KJUR.asn1.DERSequence(t).getEncodedHex();
      }),
      (e.prototype.getPrivateBaseKeyB64 = function () {
        return hex2b64(this.getPrivateBaseKey());
      }),
      (e.prototype.getPublicBaseKey = function () {
        var t = new KJUR.asn1.DERSequence({
            array: [
              new KJUR.asn1.DERObjectIdentifier({ oid: '1.2.840.113549.1.1.1' }),
              new KJUR.asn1.DERNull(),
            ],
          }),
          e = new KJUR.asn1.DERSequence({
            array: [
              new KJUR.asn1.DERInteger({ bigint: this.n }),
              new KJUR.asn1.DERInteger({ int: this.e }),
            ],
          }),
          i = new KJUR.asn1.DERBitString({ hex: '00' + e.getEncodedHex() });
        return new KJUR.asn1.DERSequence({ array: [t, i] }).getEncodedHex();
      }),
      (e.prototype.getPublicBaseKeyB64 = function () {
        return hex2b64(this.getPublicBaseKey());
      }),
      (e.wordwrap = function (t, e) {
        if (!t) return t;
        var i = '(.{1,' + (e = e || 64) + '})( +|$\n?)|(.{1,' + e + '})';
        return t.match(RegExp(i, 'g')).join('\n');
      }),
      (e.prototype.getPrivateKey = function () {
        var t = '-----BEGIN RSA PRIVATE KEY-----\n';
        return (
          (t += e.wordwrap(this.getPrivateBaseKeyB64()) + '\n'),
          (t += '-----END RSA PRIVATE KEY-----')
        );
      }),
      (e.prototype.getPublicKey = function () {
        var t = '-----BEGIN PUBLIC KEY-----\n';
        return (
          (t += e.wordwrap(this.getPublicBaseKeyB64()) + '\n'), (t += '-----END PUBLIC KEY-----')
        );
      }),
      (e.hasPublicKeyProperty = function (t) {
        return (t = t || {}).hasOwnProperty('n') && t.hasOwnProperty('e');
      }),
      (e.hasPrivateKeyProperty = function (t) {
        return (
          (t = t || {}).hasOwnProperty('n') &&
          t.hasOwnProperty('e') &&
          t.hasOwnProperty('d') &&
          t.hasOwnProperty('p') &&
          t.hasOwnProperty('q') &&
          t.hasOwnProperty('dmp1') &&
          t.hasOwnProperty('dmq1') &&
          t.hasOwnProperty('coeff')
        );
      }),
      (e.prototype.parsePropertiesFrom = function (t) {
        (this.n = t.n),
          (this.e = t.e),
          t.hasOwnProperty('d') &&
            ((this.d = t.d),
            (this.p = t.p),
            (this.q = t.q),
            (this.dmp1 = t.dmp1),
            (this.dmq1 = t.dmq1),
            (this.coeff = t.coeff));
      }),
      e
    );
  })(RSAKey),
  version =
    'undefined' != typeof process
      ? null === (_a = process.env) || void 0 === _a
        ? void 0
        : _a.npm_package_version
      : void 0;
export var JSEncrypt = (function () {
  function t(t) {
    void 0 === t && (t = {}),
      (t = t || {}),
      (this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024),
      (this.default_public_exponent = t.default_public_exponent || '010001'),
      (this.log = t.log || !1),
      (this.key = null);
  }
  return (
    (t.prototype.setKey = function (t) {
      this.log && this.key && console.warn('A key was already set, overriding existing.'),
        (this.key = new JSEncryptRSAKey(t));
    }),
    (t.prototype.setPrivateKey = function (t) {
      this.setKey(t);
    }),
    (t.prototype.setPublicKey = function (t) {
      this.setKey(t);
    }),
    (t.prototype.decrypt = function (t) {
      try {
        return this.getKey().decrypt(b64tohex(t));
      } catch (t) {
        return !1;
      }
    }),
    (t.prototype.encrypt = function (t) {
      try {
        return hex2b64(this.getKey().encrypt(t));
      } catch (t) {
        return !1;
      }
    }),
    (t.prototype.sign = function (t, e, i) {
      try {
        return hex2b64(this.getKey().sign(t, e, i));
      } catch (t) {
        return !1;
      }
    }),
    (t.prototype.verify = function (t, e, i) {
      try {
        return this.getKey().verify(t, b64tohex(e), i);
      } catch (t) {
        return !1;
      }
    }),
    (t.prototype.getKey = function (t) {
      if (!this.key) {
        if (((this.key = new JSEncryptRSAKey()), t && '[object Function]' === {}.toString.call(t)))
          return void this.key.generateAsync(
            this.default_key_size,
            this.default_public_exponent,
            t,
          );
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    }),
    (t.prototype.getPrivateKey = function () {
      return this.getKey().getPrivateKey();
    }),
    (t.prototype.getPrivateKeyB64 = function () {
      return this.getKey().getPrivateBaseKeyB64();
    }),
    (t.prototype.getPublicKey = function () {
      return this.getKey().getPublicKey();
    }),
    (t.prototype.getPublicKeyB64 = function () {
      return this.getKey().getPublicBaseKeyB64();
    }),
    (t.version = version),
    t
  );
})();
var lib_default = JSEncrypt;
