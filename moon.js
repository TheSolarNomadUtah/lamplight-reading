/* Moon-phase dusk — Lamplight Learning
   Offline phase from the date only. No location, no child data.
   Mean synodic month 29.530588853 d from the new moon of 2000-01-06 18:14 UT
   (the same night Sky Tonight already documents). Accuracy about ±1 day.
   Default view is northern (waxing lights the right limb). A grown-up
   southern-sky toggle may flip the terminator; still no location.
   Hooks: phase() feeds Moon Shape Diary; svg(..., {stars:false}) leaves
   the dusk sky clear for Star Count Tonight.
*/
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.MoonDusk = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  var SYNODIC = 29.530588853;
  /* New moon 2000 Jan 6, 18:14 UT → JD 2451550.259722... */
  var EPOCH_JD = 2451550.259722222;
  var NIGHT = "#120E18", DUSK = "#1C1624", WARM = "#F6EFE0", LINE = "#D9C9A8";
  var TIP = "#FFF6D8", AMBER = "#E6B454", DEEP = "#855A00", INK = "#72583F";
  var CLAY = "#D9B27A", LIT = "#F6EFE0", DARK = "#2C241C";

  var PHASES = [
    { id: "new",              en: "New moon",         es: "Luna nueva" },
    { id: "waxing-crescent",  en: "Waxing crescent",  es: "Creciente" },
    { id: "first-quarter",    en: "First quarter",    es: "Cuarto creciente" },
    { id: "waxing-gibbous",   en: "Waxing gibbous",   es: "Gibosa creciente" },
    { id: "full",             en: "Full moon",        es: "Luna llena" },
    { id: "waning-gibbous",   en: "Waning gibbous",   es: "Gibosa menguante" },
    { id: "last-quarter",     en: "Last quarter",     es: "Cuarto menguante" },
    { id: "waning-crescent",  en: "Waning crescent",  es: "Menguante" }
  ];

  function f(n, d) {
    d = d == null ? 1 : d;
    if (typeof n === "number" && n === (n | 0)) return String(n);
    var s = Number(n).toFixed(d).replace(/\.?0+$/, "");
    if (s.indexOf("-0.") === 0) s = "-." + s.slice(3);
    else if (s.charAt(0) === "0" && s.charAt(1) === ".") s = s.slice(1);
    return s || "0";
  }

  /* Julian date. month is 1–12. Hour defaults 0. */
  function julianDate(year, month, day, hour, minute, second) {
    hour = (hour || 0) + (minute || 0) / 60 + (second || 0) / 3600;
    var y = year, m = month;
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100);
    var B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5 + hour / 24;
  }

  /* Tonight = the device's local calendar date at 19:00 local (look-outside time). */
  function dateToJD(date) {
    if (typeof date === "number") return date;
    var d = date instanceof Date ? date : new Date(date);
    var dusk = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 19, 0, 0);
    return 2440587.5 + dusk.getTime() / 86400000;
  }

  function wrap01(x) {
    x = x % 1;
    return x < 0 ? x + 1 : x;
  }

  /* Name bands are 8 equal slices, 45° of the synodic cycle, centered on each phase. */
  function nameIndex(frac) {
    return Math.round(wrap01(frac) * 8) % 8;
  }

  function phaseFromFrac(frac) {
    frac = wrap01(frac);
    var age = frac * SYNODIC;
    var illum = 0.5 * (1 - Math.cos(2 * Math.PI * frac));
    var i = nameIndex(frac);
    var p = PHASES[i];
    return {
      frac: frac,
      ageDays: age,
      illum: illum,
      index: i,
      id: p.id,
      name: p.en,
      nameEs: p.es,
      accuracy: "±1 day"
    };
  }

  function phase(date) {
    var jd = dateToJD(date == null ? new Date() : date);
    var frac = wrap01((jd - EPOCH_JD) / SYNODIC);
    var out = phaseFromFrac(frac);
    out.jd = jd;
    return out;
  }

  /* Lit portion. Terminator is an ellipse arc. p=0 new, p=0.5 full.
     Northern default: waxing lights the right limb. south:true flips it. */
  function litPath(cx, cy, r, p, south) {
    if (south) p = wrap01(1 - p);
    if (p < 0.008 || p > 0.992) return "";
    if (Math.abs(p - 0.5) < 0.008) {
      return '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="' + LIT + '"/>';
    }
    var waxing = p < 0.5;
    var c = Math.cos(2 * Math.PI * p);
    var rx = Math.abs(c) * r;
    if (rx < 0.05) rx = 0.05;
    var limbSweep = waxing ? 1 : 0;
    var termSweep = c >= 0 ? (waxing ? 0 : 1) : (waxing ? 1 : 0);
    return '<path d="M' + f(cx) + " " + f(cy - r) +
      "A" + f(r) + " " + f(r) + " 0 0 " + limbSweep + " " + f(cx) + " " + f(cy + r) +
      "A" + f(rx) + " " + f(r) + " 0 0 " + termSweep + " " + f(cx) + " " + f(cy - r) +
      'Z" fill="' + LIT + '"/>';
  }

  function quietStars(uid) {
    /* Decorative only — not catalog stars. Pass stars:false to leave the sky for Star Count. */
    var dots = [
      [28, 36, 1.1], [48, 22, 0.9], [72, 30, 1.3], [160, 40, 1.0],
      [178, 58, 0.8], [150, 22, 0.7], [22, 70, 0.7], [188, 90, 0.6],
      [40, 50, 0.6], [168, 78, 0.9]
    ];
    var d = dots.map(function (s) {
      return "M" + s[0] + " " + s[1] + "h0";
    }).join(" ");
    return '<path d="' + d + '" fill="none" stroke="' + TIP +
      '" stroke-width="2.2" stroke-linecap="round" opacity=".7"/>';
  }

  function lantern() {
    /* Tiny hanging lantern at the bottom, same language as the lantern mark. */
    return '<g transform="translate(100 168) scale(.42) translate(-100 -140)">' +
      '<ellipse cx="100" cy="180" rx="34" ry="6" fill="' + AMBER + '" opacity=".3"/>' +
      '<circle cx="100" cy="28" r="10" fill="none" stroke="' + INK + '" stroke-width="3"/>' +
      '<path d="M72 54c0-16 12-22 28-22s28 6 28 22v8H72z" fill="' + CLAY + '" stroke="' + INK + '" stroke-width="2.1" stroke-linejoin="round"/>' +
      '<path d="M68 60h64" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>' +
      '<rect x="58" y="64" width="84" height="100" rx="9" fill="' + AMBER + '" stroke="' + INK + '" stroke-width="2.6"/>' +
      '<path d="M58 114h84M100 64v100" fill="none" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M92 128q8-32 16 0q-8 14-16 0z" fill="' + AMBER + '" stroke="' + DEEP + '" stroke-width="1.15" stroke-linejoin="round"/>' +
      '<path d="M97 118q3-16 6 0" fill="none" stroke="' + TIP + '" stroke-width="1.4" stroke-linecap="round"/>' +
      '<circle cx="100" cy="122" r="2.6" fill="' + TIP + '"/>' +
      '<path d="M54 164h92" stroke="' + INK + '" stroke-width="3.6" stroke-linecap="round"/>' +
      "</g>";
  }

  function moonGroup(frac, opt) {
    opt = opt || {};
    var cx = opt.cx == null ? 100 : opt.cx;
    var cy = opt.cy == null ? 78 : opt.cy;
    var r = opt.r == null ? 28 : opt.r;
    var south = !!opt.south;
    var glowR = r * 2.15;
    var glowOp = 0.22 + 0.28 * (0.5 * (1 - Math.cos(2 * Math.PI * frac)));
    var lit = litPath(cx, cy, r, frac, south);
    return '<defs>' +
      '<radialGradient id="' + (opt.gid || "mg") + '" cx="50%" cy="50%" r="50%">' +
      '<stop offset="0" stop-color="' + TIP + '" stop-opacity=".55"/>' +
      '<stop offset=".45" stop-color="' + AMBER + '" stop-opacity=".22"/>' +
      '<stop offset="1" stop-color="' + AMBER + '" stop-opacity="0"/>' +
      "</radialGradient></defs>" +
      '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(glowR) + '" ry="' + f(glowR * 0.96) +
      '" fill="url(#' + (opt.gid || "mg") + ')" opacity="' + f(glowOp, 2) + '"/>' +
      '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="' + DARK + '"/>' +
      '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(r) + '" fill="none" stroke="' + LINE +
      '" stroke-width="1.1" opacity=".45"/>' +
      lit;
  }

  /* Full 200×200 dusk scene. date or {frac}. */
  function svg(dateOrFrac, opt) {
    opt = opt || {};
    var info = (typeof dateOrFrac === "number" && dateOrFrac >= 0 && dateOrFrac < 2)
      ? phaseFromFrac(dateOrFrac)
      : (dateOrFrac && dateOrFrac.frac != null ? phaseFromFrac(dateOrFrac.frac) : phase(dateOrFrac));
    var showStars = opt.stars !== false;
    var showLamp = opt.lantern !== false;
    var showName = !!opt.name;
    var label = "";
    if (showName) {
      var txt = opt.lang === "es" ? info.nameEs : info.name;
      label = '<text x="100" y="194" text-anchor="middle" fill="' + WARM +
        '" font-size="7" font-family="sans-serif" opacity=".85">' + txt + "</text>";
    }
    var mid = '<rect width="200" height="200" fill="' + NIGHT + '"/>' +
      '<ellipse cx="100" cy="200" rx="120" ry="70" fill="' + DUSK + '" opacity=".85"/>';
    var stars = showStars ? quietStars() : "";
    var moon = moonGroup(info.frac, {
      cx: opt.cx, cy: opt.cy, r: opt.r, south: opt.south, gid: opt.gid || "mg"
    });
    var lamp = showLamp ? lantern() : "";
    var aria = (opt.lang === "es" ? info.nameEs : info.name);
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="' +
      aria + '">' + mid + stars + moon + lamp + label + "</svg>";
  }

  return {
    SYNODIC: SYNODIC,
    EPOCH_JD: EPOCH_JD,
    PHASES: PHASES,
    julianDate: julianDate,
    phase: phase,
    phaseFromFrac: phaseFromFrac,
    litPath: litPath,
    svg: svg,
    /* Diary: store {d: "YYYY-MM-DD", f: frac} locally, one tap per night, no streaks. */
    /* Star Count: svg(date, {stars:false}) and draw catalog figures behind the moon. */
    accuracyNote: "Mean synodic month from a known new moon. About ±1 day. Not for eclipses.",
    hemisphereNote: "Default is the northern view (waxing lights the right). Southern families can flip with south:true — a grown-up setting, never a location."
  };
});
