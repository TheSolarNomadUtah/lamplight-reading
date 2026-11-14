// SPDX-License-Identifier: GPL-3.0-or-later
/* v133 print pages: ink-light SVGs. Facts only from PATTERN_FACTS.md or Pi's specs. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.LampPrint133 = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var INK = "#222222";
  var MID = "#666666";
  var PALE = "#e6e1d6";
  var W = 816, H = 1056;

  var PHASES = [
    { id: "new", en: "New moon", es: "Luna nueva", frac: 0 },
    { id: "waxing-crescent", en: "Waxing crescent", es: "Creciente", frac: 0.125 },
    { id: "first-quarter", en: "First quarter", es: "Cuarto creciente", frac: 0.25 },
    { id: "waxing-gibbous", en: "Waxing gibbous", es: "Gibosa creciente", frac: 0.375 },
    { id: "full", en: "Full moon", es: "Luna llena", frac: 0.5 },
    { id: "waning-gibbous", en: "Waning gibbous", es: "Gibosa menguante", frac: 0.625 },
    { id: "last-quarter", en: "Last quarter", es: "Cuarto menguante", frac: 0.75 },
    { id: "waning-crescent", en: "Waning crescent", es: "Menguante", frac: 0.875 }
  ];

  var COPY = {
    en: {
      brand: "Lamplight Learning",
      print: "Print this page",
      back: "All print pages",
      esLink: "Español",
      enLink: "English",
      pages: "Print",
      intro: "Five ink-light pages to print and use offline.",
      all: "Print all five",
      honeycomb: "Honeycomb to color",
      dragon: "Dragon-curve fold strip",
      moon: "Moon-phase wheel",
      walk: "Pattern Walk",
      seed: "Share a Seed",
      seedLine: "A free, calm bedtime app. No accounts. It works offline. Hand this to a family you would like to share it with.",
      seedUrl: "lamplightlearn.org",
      seedCut: "Cut along the dotted line.",
      factHex: "Bees build honeycomb from hexagons. They fit together with no gaps.",
      factDragon: "Fold a paper strip in half again and again. Open it, and its edge draws this dragon.",
      look: "Look outside",
      moonHint: "Turn the wheel to match the moon you see.",
      find: "Find outside:",
      walkThen: "Then you can find those patterns in the app.",
      items: [
        { find: "a spiral", fact: "Sunflower seeds grow in spirals." },
        { find: "a hexagon", fact: "Bees build honeycomb from hexagons. They fit together with no gaps." },
        { find: "a branch that splits", fact: "Trees split into smaller and smaller branches." },
        { find: "something with 5 petals", fact: "Each petal is turned the same amount, so the flower looks the same all the way around." },
        { find: "a mirror twin", fact: "" }
      ],
      folds: [
        "Fold the strip in half.",
        "Fold it in half again, the same way.",
        "Fold one or two more times.",
        "Open each fold to a square corner.",
        "The edge of the paper draws the dragon."
      ]
    },
    es: {
      brand: "Lamplight Learning",
      print: "Imprimir esta página",
      back: "Todas las páginas",
      esLink: "Español",
      enLink: "English",
      pages: "Imprimir",
      intro: "Cinco páginas de tinta ligera para imprimir y usar sin conexión.",
      all: "Imprimir las cinco",
      honeycomb: "Panal para colorear",
      dragon: "Tira para doblar el dragón",
      moon: "Rueda de las fases de la luna",
      walk: "Paseo de patrones",
      seed: "Comparte una Semilla",
      seedLine: "Una app gratuita y tranquila para la noche. Sin cuentas. Funciona sin conexión. Entrega esta tarjeta a otra familia.",
      seedUrl: "lamplightlearn.org",
      seedCut: "Corta por la línea de puntos.",
      factHex: "Las abejas hacen panales con hexágonos. Encajan sin dejar huecos.",
      factDragon: "Dobla una tira de papel por la mitad una y otra vez. Al abrirla, su borde dibuja este dragón.",
      look: "Mira afuera",
      moonHint: "Gira la rueda para que coincida con la luna que ves.",
      find: "Busca afuera:",
      walkThen: "Luego puedes encontrar esos patrones en la app.",
      items: [
        { find: "una espiral", fact: "Las semillas del girasol crecen en espirales." },
        { find: "un hexágono", fact: "Las abejas hacen panales con hexágonos. Encajan sin dejar huecos." },
        { find: "una rama que se divide", fact: "Los árboles se dividen en ramas cada vez más pequeñas." },
        { find: "algo con 5 pétalos", fact: "Cada pétalo gira lo mismo, y la flor se ve igual por todos lados." },
        { find: "un gemelo en el espejo", fact: "" }
      ],
      folds: [
        "Dobla la tira por la mitad.",
        "Vuelve a doblarla por la mitad, del mismo modo.",
        "Dobla una o dos veces más.",
        "Abre cada pliegue en un ángulo recto.",
        "El borde del papel dibuja el dragón."
      ]
    }
  };

  function langOf(l) { return l === "es" ? "es" : "en"; }
  function T(l) { return COPY[langOf(l)]; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }
  function f(n, d) {
    d = d == null ? 2 : d;
    var s = Number(n).toFixed(d).replace(/\.?0+$/, "");
    return s || "0";
  }

  function wrapText(text, max, font) {
    font = font || 16;
    var words = String(text).split(/\s+/), lines = [], line = "";
    var width = function (s) { return s.length * font * 0.52; };
    words.forEach(function (w) {
      var next = line ? line + " " + w : w;
      if (line && width(next) > max) { lines.push(line); line = w; }
      else line = next;
    });
    if (line) lines.push(line);
    return lines;
  }
  function tspans(lines, x, y, size, fill, anchor) {
    return lines.map(function (ln, i) {
      return '<text x="' + x + '" y="' + (y + i * (size * 1.35)) + '" text-anchor="' + (anchor || "middle") +
        '" font-family="sans-serif" font-size="' + size + '" fill="' + (fill || INK) + '">' + esc(ln) + "</text>";
    }).join("");
  }

  function sheetOpen(title) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H +
      '" width="816" height="1056" role="img" aria-label="' + esc(title) + '">' +
      '<rect width="' + W + '" height="' + H + '" fill="#fff"/>';
  }
  function sheetClose(copy) {
    return '<text x="408" y="1036" text-anchor="middle" font-family="sans-serif" font-size="11" fill="' + MID + '">' +
      esc(copy.brand) + "</text></svg>";
  }
  function titleBlock(title, y) {
    return '<text x="408" y="' + (y || 64) + '" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="700" fill="' + INK + '">' +
      esc(title) + "</text>";
  }
  function factBlock(fact, y) {
    return tspans(wrapText(fact, 680, 16), 408, y || 980, 16, INK, "middle");
  }

  /* ---- honeycomb ---- */
  function hexXY(q, r, size) {
    return [size * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r), size * (1.5 * r)];
  }
  function hexRing(n) {
    if (!n) return [[0, 0]];
    var c = [], q = n, r = 0, s = [[0, -1], [-1, 0], [-1, 1], [0, 1], [1, 0], [1, -1]], k, i;
    for (k = 0; k < 6; k++) for (i = 0; i < n; i++) { c.push([q, r]); q += s[k][0]; r += s[k][1]; }
    return c;
  }
  function hexD(cx, cy, size) {
    var pts = [], i, a;
    for (i = 0; i < 6; i++) {
      a = (30 + 60 * i) * Math.PI / 180;
      pts.push([cx + size * Math.cos(a), cy + size * Math.sin(a)]);
    }
    return "M" + pts.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join("L") + "Z";
  }
  function honeycombSVG(lang) {
    var copy = T(lang), cells = [], k, size = 36, cx = 408, cy = 500;
    for (k = 0; k <= 3; k++) cells = cells.concat(hexRing(k));
    var paths = cells.map(function (c) {
      var xy = hexXY(c[0], c[1], size);
      return '<path d="' + hexD(cx + xy[0], cy + xy[1], size * 0.96) + '" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round"/>';
    }).join("");
    return sheetOpen(copy.honeycomb) + titleBlock(copy.honeycomb, 64) + paths + factBlock(copy.factHex, 980) + sheetClose(copy);
  }

  /* ---- dragon fold strip ---- */
  function hwy(o) {
    var p = [[0, 0]], x = 0, y = 0, dx = 1, dy = 0, n = 1 << o, i, t;
    for (i = 1; i <= n; i++) {
      x += dx; y += dy; p.push([x, y]);
      if ((i & ((i & -i) << 1)) === 0) { t = dx; dx = -dy; dy = t; }
      else { t = dx; dx = dy; dy = -t; }
    }
    return p;
  }
  function fit(pts, x0, y0, x1, y1) {
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    pts.forEach(function (p) {
      if (p[0] < minX) minX = p[0]; if (p[0] > maxX) maxX = p[0];
      if (p[1] < minY) minY = p[1]; if (p[1] > maxY) maxY = p[1];
    });
    var sx = (x1 - x0) / ((maxX - minX) || 1), sy = (y1 - y0) / ((maxY - minY) || 1);
    var s = Math.min(sx, sy);
    var ox = (x0 + x1) / 2 - s * (minX + maxX) / 2;
    var oy = (y0 + y1) / 2 - s * (minY + maxY) / 2;
    return pts.map(function (p) { return [p[0] * s + ox, p[1] * s + oy]; });
  }
  function pathOf(pts) {
    return "M" + pts.map(function (p) { return f(p[0]) + " " + f(p[1]); }).join("L");
  }
  function dragonSVG(lang) {
    var copy = T(lang);
    var strip = '<rect x="58" y="120" width="700" height="70" rx="6" fill="none" stroke="' + INK + '" stroke-width="1.6"/>';
    var folds = "", labels = "", i, n = 8;
    for (i = 1; i < n; i++) {
      var x = 58 + (700 * i) / n;
      var sw = (i === 4) ? "1.8" : (i % 2 === 0 ? "1.3" : "1");
      var dash = (i === 4) ? "0" : "4 3";
      folds += '<line x1="' + f(x) + '" y1="120" x2="' + f(x) + '" y2="190" stroke="' + INK + '" stroke-width="' + sw + '" stroke-dasharray="' + dash + '"/>';
    }
    labels += '<text x="408" y="228" text-anchor="middle" font-family="sans-serif" font-size="13" fill="' + MID + '">' + esc(copy.folds[0]) + "</text>";
    var steps = copy.folds.map(function (s, idx) {
      return '<text x="80" y="' + (270 + idx * 28) + '" font-family="sans-serif" font-size="16" fill="' + INK + '">' + esc((idx + 1) + ". " + s) + "</text>";
    }).join("");
    var curve = fit(hwy(7), 80, 470, 736, 920);
    var dpath = '<path d="' + pathOf(curve) + '" fill="none" stroke="' + INK + '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>';
    return sheetOpen(copy.dragon) + titleBlock(copy.dragon, 64) + strip + folds + labels + steps + dpath + factBlock(copy.factDragon, 980) + sheetClose(copy);
  }

  /* ---- moon wheel (Pi phase names; waxing lights the right, northern default) ---- */
  function litMoon(cx, cy, r, frac) {
    var p = frac, out = '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="' + PALE + '" stroke="' + INK + '" stroke-width="1.4"/>';
    if (p < 0.008) return out;
    if (p > 0.992 || Math.abs(p - 0.5) < 0.008) {
      return '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/>';
    }
    var waxing = p < 0.5;
    var c = Math.cos(2 * Math.PI * p);
    var rx = Math.max(Math.abs(c) * r, 0.05);
    var limbSweep = waxing ? 1 : 0;
    var termSweep = c >= 0 ? (waxing ? 0 : 1) : (waxing ? 1 : 0);
    out += '<path d="M' + f(cx) + " " + f(cy - r) +
      "A" + f(r) + " " + f(r) + " 0 0 " + limbSweep + " " + f(cx) + " " + f(cy + r) +
      "A" + f(rx) + " " + f(r) + " 0 0 " + termSweep + " " + f(cx) + " " + f(cy - r) +
      'Z" fill="#fff" stroke="none"/>';
    out += '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="none" stroke="' + INK + '" stroke-width="1.4"/>';
    return out;
  }
  function moonSVG(lang) {
    var copy = T(lang), L = langOf(lang);
    var cx = 408, cy = 530, R = 250, mr = 46, parts = [];
    parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="' + (R + 58) + '" fill="none" stroke="' + INK + '" stroke-width="1.2" stroke-dasharray="5 4"/>');
    parts.push('<circle cx="' + cx + '" cy="' + cy + '" r="70" fill="#fff" stroke="' + INK + '" stroke-width="1.2"/>');
    parts.push(tspans(wrapText(copy.look, 120, 16), cx, cy + 6, 16, INK, "middle"));
    PHASES.forEach(function (ph, i) {
      var a = (-90 + i * 45) * Math.PI / 180;
      var x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R;
      parts.push(litMoon(x, y, mr, ph.frac));
      var lx = cx + Math.cos(a) * (R + 86), ly = cy + Math.sin(a) * (R + 86);
      var name = L === "es" ? ph.es : ph.en;
      var lines = wrapText(name, 130, 13);
      parts.push(tspans(lines, lx, ly - (lines.length - 1) * 8, 13, INK, "middle"));
    });
    return sheetOpen(copy.moon) + titleBlock(copy.moon, 56) +
      tspans(wrapText(copy.moonHint, 680, 16), 408, 92, 16, MID, "middle") +
      parts.join("") + sheetClose(copy);
  }

  /* ---- Pattern Walk ---- */
  function iconSpiral(x, y) {
    var d = "", i, t, r, px, py;
    for (i = 0; i <= 40; i++) {
      t = i / 40 * 4.2 * Math.PI;
      r = 2 + i * 0.55;
      px = x + r * Math.cos(t); py = y + r * Math.sin(t);
      d += (i ? "L" : "M") + f(px) + " " + f(py);
    }
    return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round"/>';
  }
  function iconHex(x, y) { return '<path d="' + hexD(x, y, 20) + '" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round"/>'; }
  function iconBranch(x, y) {
    return '<path d="M' + x + " " + (y + 22) + "L" + x + " " + y + "M" + x + " " + (y + 2) + "L" + (x - 14) + " " + (y - 14) + "M" + x + " " + (y + 2) + "L" + (x + 14) + " " + (y - 14) + "M" + (x - 7) + " " + (y - 6) + "L" + (x - 16) + " " + (y - 2) + "M" + (x + 7) + " " + (y - 6) + "L" + (x + 16) + " " + (y - 2) +
      '" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round"/>';
  }
  function iconPetals(x, y) {
    var i, a, px, py, d = "";
    for (i = 0; i < 5; i++) {
      a = (-90 + i * 72) * Math.PI / 180;
      px = x + 14 * Math.cos(a); py = y + 14 * Math.sin(a);
      d += '<ellipse cx="' + f(px) + '" cy="' + f(py) + '" rx="7" ry="11" transform="rotate(' + f(-90 + i * 72) + " " + f(px) + " " + f(py) + ')" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
    }
    d += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="none" stroke="' + INK + '" stroke-width="1.5"/>';
    return d;
  }
  function iconMirror(x, y) {
    return '<path d="M' + (x - 18) + " " + (y + 16) + "L" + (x - 18) + " " + (y - 16) + "L" + (x - 4) + " " + (y + 16) + "Z" +
      "M" + (x + 18) + " " + (y + 16) + "L" + (x + 18) + " " + (y - 16) + "L" + (x + 4) + " " + (y + 16) + 'Z" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<line x1="' + x + '" y1="' + (y - 20) + '" x2="' + x + '" y2="' + (y + 20) + '" stroke="' + INK + '" stroke-width="1.2" stroke-dasharray="3 3"/>';
  }
  var ICONS = [iconSpiral, iconHex, iconBranch, iconPetals, iconMirror];
  function walkSVG(lang) {
    var copy = T(lang), parts = [], i;
    parts.push(titleBlock(copy.walk, 64));
    parts.push('<text x="80" y="110" font-family="sans-serif" font-size="20" font-weight="700" fill="' + INK + '">' + esc(copy.find) + "</text>");
    for (i = 0; i < 5; i++) {
      var y = 160 + i * 150;
      var it = copy.items[i];
      parts.push('<rect x="80" y="' + y + '" width="656" height="130" rx="14" fill="none" stroke="' + INK + '" stroke-width="1.4"/>');
      parts.push('<rect x="100" y="' + (y + 40) + '" width="44" height="44" rx="6" fill="none" stroke="' + INK + '" stroke-width="2"/>');
      parts.push('<g transform="translate(190 ' + (y + 62) + ')">' + ICONS[i](0, 0) + "</g>");
      parts.push('<text x="240" y="' + (y + 42) + '" font-family="sans-serif" font-size="20" font-weight="700" fill="' + INK + '">' + esc(it.find) + "</text>");
      if (it.fact) parts.push(tspans(wrapText(it.fact, 500, 15), 240, y + 70, 15, INK, "start"));
    }
    parts.push(tspans(wrapText(copy.walkThen, 680, 15), 408, 980, 15, MID, "middle"));
    return sheetOpen(copy.walk) + parts.join("") + sheetClose(copy);
  }


  /* Share a Seed: two ink-light cards on one letter sheet, QR for the site. */
  var SEED_QR = "M2 2h7v1h-7zM11 2h1v1h-1zM14 2h4v1h-4zM20 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM10 3h1v1h-1zM15 3h3v1h-3zM20 3h1v1h-1zM26 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM11 4h1v1h-1zM13 4h1v1h-1zM16 4h1v1h-1zM20 4h1v1h-1zM22 4h3v1h-3zM26 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM12 5h2v1h-2zM16 5h3v1h-3zM20 5h1v1h-1zM22 5h3v1h-3zM26 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM10 6h5v1h-5zM16 6h2v1h-2zM20 6h1v1h-1zM22 6h3v1h-3zM26 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM11 7h3v1h-3zM15 7h3v1h-3zM20 7h1v1h-1zM26 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h7v1h-7zM14 9h4v1h-4zM2 10h1v1h-1zM4 10h1v1h-1zM6 10h1v1h-1zM8 10h1v1h-1zM13 10h3v1h-3zM17 10h2v1h-2zM22 10h1v1h-1zM25 10h1v1h-1zM5 11h1v1h-1zM7 11h1v1h-1zM9 11h1v1h-1zM12 11h1v1h-1zM14 11h2v1h-2zM18 11h3v1h-3zM26 11h1v1h-1zM5 12h2v1h-2zM8 12h2v1h-2zM11 12h1v1h-1zM14 12h1v1h-1zM16 12h1v1h-1zM20 12h1v1h-1zM22 12h1v1h-1zM24 12h3v1h-3zM2 13h1v1h-1zM11 13h1v1h-1zM13 13h1v1h-1zM15 13h2v1h-2zM18 13h1v1h-1zM22 13h1v1h-1zM25 13h1v1h-1zM2 14h2v1h-2zM5 14h11v1h-11zM18 14h3v1h-3zM23 14h1v1h-1zM25 14h2v1h-2zM3 15h2v1h-2zM6 15h2v1h-2zM9 15h1v1h-1zM11 15h1v1h-1zM13 15h1v1h-1zM15 15h2v1h-2zM18 15h3v1h-3zM23 15h1v1h-1zM26 15h1v1h-1zM2 16h1v1h-1zM5 16h1v1h-1zM7 16h3v1h-3zM12 16h1v1h-1zM15 16h2v1h-2zM19 16h1v1h-1zM21 16h1v1h-1zM24 16h3v1h-3zM3 17h2v1h-2zM6 17h2v1h-2zM10 17h3v1h-3zM14 17h2v1h-2zM17 17h1v1h-1zM22 17h1v1h-1zM25 17h1v1h-1zM2 18h1v1h-1zM4 18h1v1h-1zM6 18h1v1h-1zM8 18h2v1h-2zM12 18h1v1h-1zM14 18h2v1h-2zM17 18h7v1h-7zM10 19h1v1h-1zM14 19h1v1h-1zM17 19h2v1h-2zM22 19h2v1h-2zM25 19h2v1h-2zM2 20h7v1h-7zM12 20h1v1h-1zM14 20h2v1h-2zM17 20h2v1h-2zM20 20h1v1h-1zM22 20h2v1h-2zM25 20h2v1h-2zM2 21h1v1h-1zM8 21h1v1h-1zM15 21h1v1h-1zM18 21h1v1h-1zM22 21h2v1h-2zM25 21h2v1h-2zM2 22h1v1h-1zM4 22h3v1h-3zM8 22h1v1h-1zM10 22h3v1h-3zM15 22h2v1h-2zM18 22h6v1h-6zM2 23h1v1h-1zM4 23h3v1h-3zM8 23h1v1h-1zM11 23h2v1h-2zM14 23h1v1h-1zM17 23h1v1h-1zM21 23h4v1h-4zM2 24h1v1h-1zM4 24h3v1h-3zM8 24h1v1h-1zM10 24h3v1h-3zM15 24h1v1h-1zM17 24h1v1h-1zM19 24h1v1h-1zM22 24h1v1h-1zM26 24h1v1h-1zM2 25h1v1h-1zM8 25h1v1h-1zM11 25h2v1h-2zM14 25h2v1h-2zM17 25h3v1h-3zM22 25h2v1h-2zM25 25h1v1h-1zM2 26h7v1h-7zM10 26h1v1h-1zM12 26h4v1h-4zM17 26h2v1h-2zM20 26h2v1h-2zM25 26h2v1h-2z";
  var SEED_QR_N = 29;
  function lanternInk(x, y, s) {
    /* Simplified hanging lantern + seed-tree, stroke only, for print. */
    return '<g fill="none" stroke="' + INK + '" stroke-linecap="round" stroke-linejoin="round" transform="translate(' + x + " " + y + ") scale(" + s + ') translate(-100 -100)">' +
      '<circle cx="100" cy="24" r="8" stroke-width="2.6"/>' +
      '<path d="M100 32v10" stroke-width="2"/>' +
      '<path d="M64 48c18-10 54-10 72 0c8 4 10 12 8 20H56c-2-8 0-16 8-20z" stroke-width="1.8"/>' +
      '<path d="M48 70c0-10 14-18 52-18s52 8 52 18v90c0 20-16 32-52 32s-52-12-52-32z" stroke-width="2.1"/>' +
      '<path d="M100 148L98.5 124M98.5 124L89.7 109.2M98.5 124L107.9 109.6M89.7 109.2L79 102.8M89.7 109.2L90.3 96.8M107.9 109.6L109.6 97.2M107.9 109.6L119 103.8" stroke-width="2"/>' +
      '<ellipse cx="100" cy="152" rx="11" ry="8" stroke-width="1.4"/>' +
      '</g>';
  }
  function seedOne(copy, y0) {
    var qx = 500, qy = y0 + 200, qs = 180 / SEED_QR_N;
    var lines = wrapText(copy.seedLine, 640, 16);
    return [
      '<rect x="60" y="' + y0 + '" width="696" height="470" rx="18" fill="none" stroke="' + INK + '" stroke-width="1.8"/>',
      '<text x="408" y="' + (y0 + 52) + '" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="' + INK + '">' + esc(copy.seed) + "</text>",
      tspans(lines, 408, y0 + 86, 16, INK, "middle"),
      lanternInk(220, y0 + 310, 0.9),
      '<g transform="translate(' + qx + " " + qy + ") scale(" + qs.toFixed(4) + ')"><path d="' + SEED_QR + '" fill="' + INK + '"/></g>',
      '<text x="' + (qx + 90) + '" y="' + (qy + 200) + '" text-anchor="middle" font-family="sans-serif" font-size="15" fill="' + INK + '">' + esc(copy.seedUrl) + "</text>"
    ].join("");
  }
  function seedSVG(lang) {
    var copy = T(lang);
    return sheetOpen(copy.seed) +
      seedOne(copy, 36) +
      '<line x1="60" y1="528" x2="756" y2="528" stroke="' + MID + '" stroke-width="1" stroke-dasharray="5 6"/>' +
      '<text x="408" y="542" text-anchor="middle" font-family="sans-serif" font-size="11" fill="' + MID + '">' + esc(copy.seedCut) + "</text>" +
      seedOne(copy, 548) +
      sheetClose(copy);
  }

  var DRAW = { honeycomb: honeycombSVG, dragon: dragonSVG, moon: moonSVG, walk: walkSVG, seed: seedSVG };
  var IDS = ["honeycomb", "dragon", "moon", "walk", "seed"];

  function titleOf(id, lang) {
    var c = T(lang);
    return ({ honeycomb: c.honeycomb, dragon: c.dragon, moon: c.moon, walk: c.walk, seed: c.seed })[id] || id;
  }
  function page(id, lang) {
    if (!DRAW[id]) return null;
    return { id: id, lang: langOf(lang), title: titleOf(id, lang), svg: DRAW[id](lang) };
  }
  function pages(lang) { return IDS.map(function (id) { return page(id, lang); }); }

  function thumb(id) {
    /* 56–72 px unique marks for the Grown-ups card and hub tiles */
    if (id === "honeycomb") return '<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/><g transform="translate(36 38) scale(.7)">' + hexRing(0).concat(hexRing(1)).map(function (c) { var xy = hexXY(c[0], c[1], 14); return '<path d="' + hexD(xy[0], xy[1], 13) + '" fill="none" stroke="' + INK + '" stroke-width="1.6"/>'; }).join("") + "</g></svg>";
    if (id === "dragon") return '<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/><path d="' + pathOf(fit(hwy(5), 10, 14, 62, 58)) + '" fill="none" stroke="' + INK + '" stroke-width="1.6" stroke-linecap="round"/></svg>';
    if (id === "moon") return '<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/>' + litMoon(36, 36, 18, 0.25) + "</svg>";
    if (id === "seed") return '<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/>' + lanternInk(36, 40, 0.26) + "</svg>";
    return '<svg viewBox="0 0 72 72" width="56" height="56" aria-hidden="true"><rect width="72" height="72" rx="12" fill="#fff" stroke="' + INK + '" stroke-width="1.4"/><rect x="16" y="24" width="16" height="16" rx="2" fill="none" stroke="' + INK + '" stroke-width="1.8"/>' + iconSpiral(48, 36) + "</svg>";
  }

  return {
    IDS: IDS,
    PHASES: PHASES,
    copy: T,
    langOf: langOf,
    page: page,
    pages: pages,
    svg: function (id, lang) { var p = page(id, lang); return p ? p.svg : ""; },
    thumb: thumb,
    titleOf: titleOf,
    W: W,
    H: H
  };
});
