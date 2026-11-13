/* Pattern Quilt layout. Requires recipes.js (the six squares).
   Unearned squares are omitted — no locks, no grey slots.
   Incomplete last row is centered so the quilt never shows empty cells. */
(function (root, factory) {
  var rec = (typeof require === "function" && require("./recipes.js")) || root.PatternQuilt;
  var Q = factory(rec);
  if (typeof module === "object" && module.exports) module.exports = Q;
  else root.PatternQuilt = Q;
})(typeof self !== "undefined" ? self : this, function (R) {
  "use strict";
  var N = "#120E18", A = "#E6B454";
  function f(n, d) {
    d = d == null ? 1 : d;
    var s = (+n).toFixed(d).replace(/\.?0+$/, "");
    if (s.indexOf("-0.") === 0) s = "-." + s.slice(3);
    else if (s.charAt(0) === "0" && s.charAt(1) === ".") s = s.slice(1);
    return s || "0";
  }
  function pack(n) {
    var c = Math.ceil(Math.sqrt(n)) || 1;
    return { cols: c, rows: Math.ceil(n / c) || 1 };
  }
  function quilt(earned, opt) {
    opt = opt || {};
    earned = earned || [];
    var n = earned.length, NS = "http://www.w3.org/2000/svg";
    if (!n) {
      return '<svg xmlns="' + NS + '" viewBox="0 0 200 200"><rect width="200" height="200" fill="' + N + '"/></svg>';
    }
    var g = pack(n), cols = g.cols, rows = g.rows;
    var gap = opt.gap == null ? 4 : opt.gap;
    var size = opt.size || 100;
    var pad = opt.pad == null ? 16 : opt.pad;
    var w = pad * 2 + cols * size + (cols - 1) * gap;
    var h = pad * 2 + rows * size + (rows - 1) * gap;
    var p = [
      '<rect width="' + f(w) + '" height="' + f(h) + '" fill="' + N + '"/>',
      '<ellipse cx="' + f(w / 2) + '" cy="' + f(h - pad * 0.2) + '" rx="' + f(w * 0.36) +
        '" ry="' + f(pad * 0.45) + '" fill="' + A + '" opacity=".2"/>'
    ];
    for (var i = 0; i < n; i++) {
      var r = (i / cols) | 0, c = i % cols;
      var ir = r === rows - 1 ? n - r * cols : cols;
      var x0 = pad + (cols - ir) * (size + gap) / 2;
      var x = x0 + c * (size + gap);
      var y = pad + r * (size + gap);
      var e = earned[i];
      var inner = R.square(e.id || e[0], e.level != null ? e.level : e[1], { idx: i, uid: "q" + i })
        .replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
      p.push('<g transform="translate(' + f(x) + " " + f(y) + ") scale(" + f(size / 100, 3) + ')">' + inner + "</g>");
    }
    return '<svg xmlns="' + NS + '" viewBox="0 0 ' + f(w) + " " + f(h) +
      '" role="img" aria-label="Pattern quilt">' + p.join("") + "</svg>";
  }
  R.pack = pack;
  R.quilt = quilt;
  return R;
});
