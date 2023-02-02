export function md5(d) {
  var r = M(V(Y(X(d), 8 * d.length)));
  return r.toLowerCase();
}
function M(d) {
  for (var _, m = '0123456789ABCDEF', f = '', r = 0; r < d.length; r++)
    (_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
  return f;
}
function X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
  for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
  return _;
}
function V(d) {
  for (var _ = '', m = 0; m < 32 * d.length; m += 8)
    _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
  return _;
}
function Y(d, _) {
  (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
  for (
    var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0;
    n < d.length;
    n += 16
  ) {
    var h = m,
      t = f,
      g = r,
      e = i;
    (f = md5_ii(
      (f = md5_ii(
        (f = md5_ii(
          (f = md5_ii(
            (f = md5_hh(
              (f = md5_hh(
                (f = md5_hh(
                  (f = md5_hh(
                    (f = md5_gg(
                      (f = md5_gg(
                        (f = md5_gg(
                          (f = md5_gg(
                            (f = md5_ff(
                              (f = md5_ff(
                                (f = md5_ff(
                                  (f = md5_ff(
                                    f,
                                    (r = md5_ff(
                                      r,
                                      (i = md5_ff(
                                        i,
                                        (m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936)),
                                        f,
                                        r,
                                        d[n + 1],
                                        12,
                                        -389564586,
                                      )),
                                      m,
                                      f,
                                      d[n + 2],
                                      17,
                                      606105819,
                                    )),
                                    i,
                                    m,
                                    d[n + 3],
                                    22,
                                    -1044525330,
                                  )),
                                  (r = md5_ff(
                                    r,
                                    (i = md5_ff(
                                      i,
                                      (m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897)),
                                      f,
                                      r,
                                      d[n + 5],
                                      12,
                                      1200080426,
                                    )),
                                    m,
                                    f,
                                    d[n + 6],
                                    17,
                                    -1473231341,
                                  )),
                                  i,
                                  m,
                                  d[n + 7],
                                  22,
                                  -45705983,
                                )),
                                (r = md5_ff(
                                  r,
                                  (i = md5_ff(
                                    i,
                                    (m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416)),
                                    f,
                                    r,
                                    d[n + 9],
                                    12,
                                    -1958414417,
                                  )),
                                  m,
                                  f,
                                  d[n + 10],
                                  17,
                                  -42063,
                                )),
                                i,
                                m,
                                d[n + 11],
                                22,
                                -1990404162,
                              )),
                              (r = md5_ff(
                                r,
                                (i = md5_ff(
                                  i,
                                  (m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682)),
                                  f,
                                  r,
                                  d[n + 13],
                                  12,
                                  -40341101,
                                )),
                                m,
                                f,
                                d[n + 14],
                                17,
                                -1502002290,
                              )),
                              i,
                              m,
                              d[n + 15],
                              22,
                              1236535329,
                            )),
                            (r = md5_gg(
                              r,
                              (i = md5_gg(
                                i,
                                (m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510)),
                                f,
                                r,
                                d[n + 6],
                                9,
                                -1069501632,
                              )),
                              m,
                              f,
                              d[n + 11],
                              14,
                              643717713,
                            )),
                            i,
                            m,
                            d[n + 0],
                            20,
                            -373897302,
                          )),
                          (r = md5_gg(
                            r,
                            (i = md5_gg(
                              i,
                              (m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691)),
                              f,
                              r,
                              d[n + 10],
                              9,
                              38016083,
                            )),
                            m,
                            f,
                            d[n + 15],
                            14,
                            -660478335,
                          )),
                          i,
                          m,
                          d[n + 4],
                          20,
                          -405537848,
                        )),
                        (r = md5_gg(
                          r,
                          (i = md5_gg(
                            i,
                            (m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438)),
                            f,
                            r,
                            d[n + 14],
                            9,
                            -1019803690,
                          )),
                          m,
                          f,
                          d[n + 3],
                          14,
                          -187363961,
                        )),
                        i,
                        m,
                        d[n + 8],
                        20,
                        1163531501,
                      )),
                      (r = md5_gg(
                        r,
                        (i = md5_gg(
                          i,
                          (m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467)),
                          f,
                          r,
                          d[n + 2],
                          9,
                          -51403784,
                        )),
                        m,
                        f,
                        d[n + 7],
                        14,
                        1735328473,
                      )),
                      i,
                      m,
                      d[n + 12],
                      20,
                      -1926607734,
                    )),
                    (r = md5_hh(
                      r,
                      (i = md5_hh(
                        i,
                        (m = md5_hh(m, f, r, i, d[n + 5], 4, -378558)),
                        f,
                        r,
                        d[n + 8],
                        11,
                        -2022574463,
                      )),
                      m,
                      f,
                      d[n + 11],
                      16,
                      1839030562,
                    )),
                    i,
                    m,
                    d[n + 14],
                    23,
                    -35309556,
                  )),
                  (r = md5_hh(
                    r,
                    (i = md5_hh(
                      i,
                      (m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)),
                      f,
                      r,
                      d[n + 4],
                      11,
                      1272893353,
                    )),
                    m,
                    f,
                    d[n + 7],
                    16,
                    -155497632,
                  )),
                  i,
                  m,
                  d[n + 10],
                  23,
                  -1094730640,
                )),
                (r = md5_hh(
                  r,
                  (i = md5_hh(
                    i,
                    (m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174)),
                    f,
                    r,
                    d[n + 0],
                    11,
                    -358537222,
                  )),
                  m,
                  f,
                  d[n + 3],
                  16,
                  -722521979,
                )),
                i,
                m,
                d[n + 6],
                23,
                76029189,
              )),
              (r = md5_hh(
                r,
                (i = md5_hh(
                  i,
                  (m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487)),
                  f,
                  r,
                  d[n + 12],
                  11,
                  -421815835,
                )),
                m,
                f,
                d[n + 15],
                16,
                530742520,
              )),
              i,
              m,
              d[n + 2],
              23,
              -995338651,
            )),
            (r = md5_ii(
              r,
              (i = md5_ii(
                i,
                (m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844)),
                f,
                r,
                d[n + 7],
                10,
                1126891415,
              )),
              m,
              f,
              d[n + 14],
              15,
              -1416354905,
            )),
            i,
            m,
            d[n + 5],
            21,
            -57434055,
          )),
          (r = md5_ii(
            r,
            (i = md5_ii(
              i,
              (m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)),
              f,
              r,
              d[n + 3],
              10,
              -1894986606,
            )),
            m,
            f,
            d[n + 10],
            15,
            -1051523,
          )),
          i,
          m,
          d[n + 1],
          21,
          -2054922799,
        )),
        (r = md5_ii(
          r,
          (i = md5_ii(
            i,
            (m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)),
            f,
            r,
            d[n + 15],
            10,
            -30611744,
          )),
          m,
          f,
          d[n + 6],
          15,
          -1560198380,
        )),
        i,
        m,
        d[n + 13],
        21,
        1309151649,
      )),
      (r = md5_ii(
        r,
        (i = md5_ii(
          i,
          (m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070)),
          f,
          r,
          d[n + 11],
          10,
          -1120210379,
        )),
        m,
        f,
        d[n + 2],
        15,
        718787259,
      )),
      i,
      m,
      d[n + 9],
      21,
      -343485551,
    )),
      (m = safe_add(m, h)),
      (f = safe_add(f, t)),
      (r = safe_add(r, g)),
      (i = safe_add(i, e));
  }
  return Array(m, f, r, i);
}
function md5_cmn(d, _, m, f, r, i) {
  return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
}
function md5_ff(d, _, m, f, r, i, n) {
  return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
}
function md5_gg(d, _, m, f, r, i, n) {
  return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
}
function md5_hh(d, _, m, f, r, i, n) {
  return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
}
function md5_ii(d, _, m, f, r, i, n) {
  return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
}
function safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);
  return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
}
function bit_rol(d, _) {
  return (d << _) | (d >>> (32 - _));
}

export function sha256(s) {
  var chrsz = 8;
  var hexcase = 0;
  function safe_add(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function S(X, n) {
    return (X >>> n) | (X << (32 - n));
  }
  function R(X, n) {
    return X >>> n;
  }
  function Ch(x, y, z) {
    return (x & y) ^ (~x & z);
  }
  function Maj(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }
  function Sigma0256(x) {
    return S(x, 2) ^ S(x, 13) ^ S(x, 22);
  }
  function Sigma1256(x) {
    return S(x, 6) ^ S(x, 11) ^ S(x, 25);
  }
  function Gamma0256(x) {
    return S(x, 7) ^ S(x, 18) ^ R(x, 3);
  }
  function Gamma1256(x) {
    return S(x, 17) ^ S(x, 19) ^ R(x, 10);
  }
  function core_sha256(m, l) {
    var K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4,
      0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe,
      0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0xfc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa,
      0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3,
      0xd5a79147, 0x6ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354,
      0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
      0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c,
      0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f,
      0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];
    var HASH = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab,
      0x5be0cd19,
    ];
    var W = [64];
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << (24 - (l % 32));
    m[(((l + 64) >> 9) << 4) + 15] = l;
    for (var i = 0; i < m.length; i += 16) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];
      for (var j = 0; j < 64; j += 1) {
        if (j < 16) {
          W[j] = m[j + i];
        } else {
          W[j] = safe_add(
            safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])),
            W[j - 16],
          );
        }
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }
      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }
  function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - (i % 32));
    }
    return bin;
  }
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n += 1) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  function binb2hex(binarray) {
    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef';
    var str = '';
    for (var i = 0; i < binarray.length * 4; i += 1) {
      str +=
        hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
        hex_tab.charAt((binarray[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
    }
    return str;
  }
  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
