/* v104: Professor Pi's math correctness fixes for Explore Numbers.
   1. Counting labels lamps by tap order, not position.
   2. A square is a rectangle: squares stay out of rectangle rounds, and
      square+rectangle are never an odd-one-out pair (and vice versa).
   3. The ten-frame shows parts (7 + 2, then 7 + 3 = 10), not a slash fraction.
   4. Added lamps in the ten-frame use a different fill from the starting lamps.
   Also: ten rising count tones, a five-across layout for 6–10 lamps, and a
   little turn and size variation so a shape is still itself when moved.
   See math.js. Do not wrap show(). */
(function(){
 const s=document.createElement('style');
 s.id='v104css';
 document.head.appendChild(s);
})();
