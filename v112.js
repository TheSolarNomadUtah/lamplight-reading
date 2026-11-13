/* v112 Sky Tonight / El cielo esta noche
   Runtime core: sky/sky.min.js + the three min JSON packs.
   City choice is local only. No geolocation. Nothing is fetched from the network. */
(function(){
'use strict';

/* ---- Pi's optional Spanish nits from the v111 recheck ---- */
(function nit111(){
 try{
  if(typeof STAR_META111!=='object')return;
  const m=STAR_META111;
  if(m.dra)m.dra.vis_es='Circunpolar desde el condado de Cache, Utah: cada estrella se queda por encima del horizonte toda la noche, todas las noches.';
  if(m.umi)m.umi.vis_es='Circunpolar desde el condado de Cache, Utah: cada estrella se queda por encima del horizonte toda la noche, todas las noches.';
  if(m.phe)m.phe.vis_es='Desde el condado de Cache, Utah, el Fénix solo se ve en parte. Ankaa se queda muy baja en el sur, a unos 6°, y apenas se asoma. Wurren y Delta Phoenicis no salen aquí. Puedes ver Ankaa baja en el sur en las noches de otoño, si el horizonte está despejado y oscuro.';
  if(m.lyr)m.lyr.vis_es='Se ve desde el condado de Cache, Utah, bien situada. Vega culmina casi sobre la cabeza.';
  if(m.ncr){
   m.ncr.fact_es='La Cruz del Norte es el corazón brillante del Cisne. Deneb marca la cola, y Albireo marca la cabeza.';
   m.ncr.vis_es='Se ve desde el condado de Cache, Utah, bien situada. Deneb culmina casi sobre la cabeza.';
  }
  if(m.cyg)m.cyg.vis_es='Se ve desde el condado de Cache, Utah, bien situado.';
  if(m.del)m.del.vis_es='Se ve desde el condado de Cache, Utah, bien situado.';
 }catch(e){}
})();

const ANIMAL_IDS112=["uma", "leo", "lmi", "lyn", "lup", "cma", "cmi", "cvn", "aql", "crv", "col", "vul", "lac", "cam", "mon", "peg", "equ", "tau", "ari", "cap", "cnc", "sco", "psc", "psa", "cet", "hya", "hyi", "ser", "cha", "aps", "pav", "tuc", "gru", "vol", "dor"];
const META112={uma:{"id": "uma", "g": "f", "en": "Ursa Major, the Great Bear", "es": "Osa Mayor, la Osa Mayor", "fact_en": "The two front stars of the Big Dipper, Dubhe and Merak, point the way to the North Star.", "fact_es": "Las dos estrellas de adelante del Carro Mayor, Dubhe y Merak, señalan el camino hacia la Estrella Polar.", "vis_en": "Visible from Cache County, Utah, well placed. Best in April evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situada. Mejor en las noches de abril.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
leo:{"id": "leo", "g": "m", "en": "Leo, the Lion", "es": "León, el León", "fact_en": "The Lion's head is a backward question mark in the spring sky, and its heart is a bright star named Regulus.", "fact_es": "La cabeza del León es como un signo de interrogación al revés en el cielo de primavera, y su corazón es una estrella brillante llamada Regulus.", "vis_en": "Visible from Cache County, Utah, well placed. Best in April evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de abril.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
lmi:{"id": "lmi", "g": "m", "en": "Leo Minor, the Little Lion", "es": "León Menor, el León Menor", "fact_en": "The Little Lion is a small, faint group of stars sitting between the Great Bear and the Lion.", "fact_es": "El León Menor es un grupo pequeño y tenue de estrellas, entre la Osa Mayor y el León.", "vis_en": "Visible from Cache County, Utah, well placed. Best in April evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de abril.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
lyn:{"id": "lyn", "g": "m", "en": "Lynx, the Lynx", "es": "Lince, el Lince", "fact_en": "The Lynx is so faint that the astronomer who named it said you need the eyes of a lynx to see it.", "fact_es": "El Lince es tan tenue que el astrónomo que le puso el nombre dijo que hace falta vista de lince para verlo.", "vis_en": "Visible from Cache County, Utah, well placed. Best in March evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de marzo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
lup:{"id": "lup", "g": "m", "en": "Lupus, the Wolf", "es": "Lobo, el Lobo", "fact_en": "The Wolf sits under the Scorpion in the southern sky, and from Utah only its northern stars peek above the horizon.", "fact_es": "El Lobo está bajo el Escorpión en el cielo del sur, y desde Utah solo se asoman sus estrellas del norte.", "vis_en": "Only partly visible from Cache County, Utah. The Wolf sits under the Scorpion, and only its northern stars peek above the horizon here.", "vis_es": "Desde el condado de Cache, Utah, el Lobo solo se ve en parte. Está bajo el Escorpión, y aquí solo se asoman sus estrellas del norte.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cma:{"id": "cma", "g": "m", "en": "Canis Major, the Great Dog", "es": "Can Mayor, el Can Mayor", "fact_en": "Sirius, the Dog Star, is the brightest star in the whole night sky.", "fact_es": "Sirio, la Estrella del Perro, es la estrella más brillante de todo el cielo nocturno.", "vis_en": "Visible from Cache County, Utah, low in the southern sky.", "vis_es": "Se ve desde el condado de Cache, Utah, bajo en el cielo del sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cmi:{"id": "cmi", "g": "m", "en": "Canis Minor, the Little Dog", "es": "Can Menor, el Can Menor", "fact_en": "Procyon is the Little Dog's bright star; its name means “before the dog,” because it rises just before Sirius.", "fact_es": "Proción es la estrella brillante del Can Menor; su nombre significa «antes del perro», porque sale justo antes que Sirio.", "vis_en": "Visible from Cache County, Utah, well placed. Best in February evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de febrero.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cvn:{"id": "cvn", "g": "mp", "en": "Canes Venatici, the Hunting Dogs", "es": "Perros de caza", "fact_en": "Cor Caroli, the bright star of the Hunting Dogs, sits under the tail of the Great Bear.", "fact_es": "Cor Caroli, la estrella brillante de los Perros de caza, está bajo la cola de la Osa Mayor.", "vis_en": "Visible from Cache County, Utah, well placed. Best in May evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situados. Mejor en las noches de mayo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
aql:{"id": "aql", "g": "f", "en": "Aquila, the Eagle", "es": "Águila, el Águila", "fact_en": "Altair is the bright star in the Eagle, and it is one of the three stars of the Summer Triangle.", "fact_es": "Altair es la estrella brillante del Águila, y es una de las tres estrellas del Triángulo de verano.", "vis_en": "Visible from Cache County, Utah, well placed. Best in August evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situada. Mejor en las noches de agosto.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
crv:{"id": "crv", "g": "m", "en": "Corvus, the Crow", "es": "Cuervo, el Cuervo", "fact_en": "The Crow is a neat little box of four bright stars, sitting on the back of the Water Snake.", "fact_es": "El Cuervo es una cajita ordenada de cuatro estrellas brillantes, sentada en el lomo de la Serpiente de agua.", "vis_en": "Visible from Cache County, Utah, low in the southern sky.", "vis_es": "Se ve desde el condado de Cache, Utah, bajo en el cielo del sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
col:{"id": "col", "g": "f", "en": "Columba, the Dove", "es": "Paloma, la Paloma", "fact_en": "The Dove flies just under the Great Dog, low in the winter south.", "fact_es": "La Paloma vuela justo bajo el Can Mayor, baja en el sur de invierno.", "vis_en": "Only partly visible from Cache County, Utah. The Dove stays low in the winter south.", "vis_es": "Desde el condado de Cache, Utah, la Paloma solo se ve en parte. Se queda baja en el sur de invierno.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
vul:{"id": "vul", "g": "f", "en": "Vulpecula, the Little Fox", "es": "Zorrita, la Zorrita", "fact_en": "The Little Fox is a faint animal in the Milky Way, next to the Swan.", "fact_es": "La Zorrita es un animal tenue de la Vía Láctea, junto al Cisne.", "vis_en": "Visible from Cache County, Utah, well placed. Best in September evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situada. Mejor en las noches de septiembre.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
lac:{"id": "lac", "g": "m", "en": "Lacerta, the Lizard", "es": "Lagarto, el Lagarto", "fact_en": "The Lizard is a faint zigzag of stars between the Swan and Cassiopeia.", "fact_es": "El Lagarto es un zigzag tenue de estrellas entre el Cisne y Casiopea.", "vis_en": "Visible from Cache County, Utah, well placed. Best in October evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de octubre.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cam:{"id": "cam", "g": "f", "en": "Camelopardalis, the Giraffe", "es": "Jirafa, la Jirafa", "fact_en": "The Giraffe is a tall, faint constellation near the North Star, and from Utah it never sets.", "fact_es": "La Jirafa es una constelación alta y tenue cerca de la Estrella Polar, y desde Utah no se pone nunca.", "vis_en": "Circumpolar from Cache County, Utah: it stays above the horizon all night, every night.", "vis_es": "Circunpolar desde el condado de Cache, Utah: se queda sobre el horizonte toda la noche, todas las noches.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
mon:{"id": "mon", "g": "m", "en": "Monoceros, the Unicorn", "es": "Unicornio, el Unicornio", "fact_en": "The Unicorn is a made-up animal; its faint stars sit between the two Dog stars and Orion.", "fact_es": "El Unicornio es un animal inventado; sus estrellas tenues están entre las dos estrellas de los Perros y Orión.", "vis_en": "Visible from Cache County, Utah, well placed. Best in February evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de febrero.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
peg:{"id": "peg", "g": "m", "en": "Pegasus, the Winged Horse", "es": "Pegaso, el Caballo alado", "fact_en": "The Winged Horse is a made-up animal; its body is a giant square you can see in the autumn sky.", "fact_es": "El Caballo alado es un animal inventado; su cuerpo es un cuadrado grande que se ve en el cielo de otoño.", "vis_en": "Visible from Cache County, Utah, well placed. Best in October evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de octubre.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
equ:{"id": "equ", "g": "m", "en": "Equuleus, the Little Horse", "es": "Caballito, el Caballito", "fact_en": "The Little Horse is one of the smallest constellations, next to the head of the Winged Horse.", "fact_es": "El Caballito es una de las constelaciones más pequeñas, junto a la cabeza del Caballo alado.", "vis_en": "Visible from Cache County, Utah, well placed. Best in September evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de septiembre.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
tau:{"id": "tau", "g": "m", "en": "Taurus, the Bull", "es": "Toro, el Toro", "fact_en": "Aldebaran is the bright orange eye of the Bull, and a tiny cluster called the Pleiades sits on the bull's shoulder.", "fact_es": "Aldebarán es el ojo naranja brillante del Toro, y un grupo chiquito llamado las Pléyades está en el hombro del toro.", "vis_en": "Visible from Cache County, Utah, well placed. Best in January evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de enero.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
ari:{"id": "ari", "g": "m", "en": "Aries, the Ram", "es": "Carnero, el Carnero", "fact_en": "Hamal is the brightest star in the Ram, which looks like a short, bent line of stars in the autumn sky.", "fact_es": "Hamal es la estrella más brillante del Carnero, que se ve como una raya corta y doblada de estrellas en el cielo de otoño.", "vis_en": "Visible from Cache County, Utah, well placed. Best in December evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de diciembre.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cap:{"id": "cap", "g": "m", "en": "Capricornus, the Sea-Goat", "es": "Capricornio, la cabra marina", "fact_en": "The Sea-Goat is a made-up creature, half goat and half fish, and it is a wide, faint triangle in the late-summer south.", "fact_es": "La cabra marina es una criatura inventada, mitad cabra y mitad pez, y es un triángulo ancho y tenue en el sur a finales del verano.", "vis_en": "Visible from Cache County, Utah, low in the southern sky.", "vis_es": "Se ve desde el condado de Cache, Utah, bajo en el cielo del sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cnc:{"id": "cnc", "g": "m", "en": "Cancer, the Crab", "es": "Cangrejo, el Cangrejo", "fact_en": "The Crab is faint, but in a dark sky you can see a tiny fuzzy cloud in it called the Beehive.", "fact_es": "El Cangrejo es tenue, pero en un cielo oscuro se puede ver una nubecita borrosa llamada el Pesebre.", "vis_en": "Visible from Cache County, Utah, well placed. Best in March evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situado. Mejor en las noches de marzo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
sco:{"id": "sco", "g": "m", "en": "Scorpius, the Scorpion", "es": "Escorpión, el Escorpión", "fact_en": "Antares is the bright red heart of the Scorpion, and from Utah the curved tail stays low in the southern summer sky.", "fact_es": "Antares es el corazón rojo brillante del Escorpión, y desde Utah la cola curva se queda baja en el cielo del sur en verano.", "vis_en": "Only partly visible from Cache County, Utah. Antares, the bright red heart, does rise, but the curved tail stays very low in the southern summer sky, and some of its stars only barely peek up.", "vis_es": "Desde el condado de Cache, Utah, el Escorpión solo se ve en parte. Antares, el corazón rojo brillante, sí sale, pero la cola curva se queda muy baja en el cielo del sur en verano, y algunas de sus estrellas apenas se asoman.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
psc:{"id": "psc", "g": "mp", "en": "Pisces, the Fishes", "es": "Peces, los Peces", "fact_en": "The Fishes are two faint chains of stars, tied together at a star called Alrescha, in the autumn sky.", "fact_es": "Los Peces son dos cadenas tenues de estrellas, unidas en una estrella llamada Alrescha, en el cielo de otoño.", "vis_en": "Visible from Cache County, Utah, well placed. Best in November evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situados. Mejor en las noches de noviembre.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
psa:{"id": "psa", "g": "m", "en": "Piscis Austrinus, the Southern Fish", "es": "Pez Austral, el Pez Austral", "fact_en": "Fomalhaut is the bright, lonely star of the Southern Fish, and from Utah it sits low in the autumn south.", "fact_es": "Fomalhaut es la estrella brillante y solitaria del Pez Austral, y desde Utah se queda baja en el sur de otoño.", "vis_en": "Visible from Cache County, Utah, low in the southern sky.", "vis_es": "Se ve desde el condado de Cache, Utah, bajo en el cielo del sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cet:{"id": "cet", "g": "m", "en": "Cetus, the Sea Monster", "es": "Monstruo marino", "fact_en": "Mira, a star in the Sea Monster, slowly fades and then brightens again over about eleven months.", "fact_es": "Mira, una estrella del Monstruo marino, se apaga despacio y luego vuelve a brillar, a lo largo de unos once meses.", "vis_en": "Visible from Cache County, Utah, low in the southern sky.", "vis_es": "Se ve desde el condado de Cache, Utah, bajo en el cielo del sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
hya:{"id": "hya", "g": "f", "en": "Hydra, the Water Snake", "es": "Hidra, la Serpiente de agua", "fact_en": "The Water Snake is the longest constellation in the whole sky, and its brightest star is the orange star Alphard.", "fact_es": "La Serpiente de agua es la constelación más larga de todo el cielo, y su estrella más brillante es la estrella naranja Alphard.", "vis_en": "Visible from Cache County, Utah, low in the southern sky.", "vis_es": "Se ve desde el condado de Cache, Utah, baja en el cielo del sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
hyi:{"id": "hyi", "g": "m", "en": "Hydrus, the Small Water Snake", "es": "Hidro, la Serpiente de agua menor", "fact_en": "The Small Water Snake is a southern constellation that never rises over Utah.", "fact_es": "La Serpiente de agua menor es una constelación del sur que nunca sale sobre Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verlo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
ser:{"id": "ser", "g": "f", "en": "Serpens, the Serpent", "es": "Serpiente, la Serpiente", "fact_en": "The Serpent is the only constellation split into two parts — a Head and a Tail — with a person standing in between.", "fact_es": "La Serpiente es la única constelación partida en dos — una Cabeza y una Cola — con una persona en medio.", "vis_en": "Visible from Cache County, Utah, well placed. Best in July evenings.", "vis_es": "Se ve desde el condado de Cache, Utah, bien situada. Mejor en las noches de julio.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
cha:{"id": "cha", "g": "m", "en": "Chamaeleon, the Chameleon", "es": "Camaleón, el Camaleón", "fact_en": "The Chameleon is a small southern constellation that never rises over Utah.", "fact_es": "El Camaleón es una constelación pequeña del sur que nunca sale sobre Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verlo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
aps:{"id": "aps", "g": "f", "en": "Apus, the Bird of Paradise", "es": "Ave del paraíso", "fact_en": "The Bird of Paradise is a far-southern bird whose stars never rise over Utah.", "fact_es": "El Ave del paraíso es un ave del extremo sur cuyas estrellas nunca salen sobre Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verla.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
pav:{"id": "pav", "g": "m", "en": "Pavo, the Peacock", "es": "Pavo real, el Pavo real", "fact_en": "The Peacock's brightest star is also named Peacock, and the whole constellation is too far south to see from Utah.", "fact_es": "La estrella más brillante del Pavo real también se llama Peacock, y toda la constelación está demasiado al sur para verse desde Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verlo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
tuc:{"id": "tuc", "g": "m", "en": "Tucana, the Toucan", "es": "Tucán, el Tucán", "fact_en": "The Toucan is a southern bird that never rises over Utah.", "fact_es": "El Tucán es un ave del sur que nunca sale sobre Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verlo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
gru:{"id": "gru", "g": "f", "en": "Grus, the Crane", "es": "Grulla, la Grulla", "fact_en": "Alnair, the Crane's brightest star, only barely peeks above the southern horizon from Utah.", "fact_es": "Alnair, la estrella más brillante de la Grulla, apenas se asoma por el horizonte sur desde Utah.", "vis_en": "Only partly visible from Cache County, Utah. Alnair, the Crane's brightest star, only barely peeks above the southern horizon.", "vis_es": "Desde el condado de Cache, Utah, la Grulla solo se ve en parte. Alnair, su estrella más brillante, apenas se asoma por el horizonte sur.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
vol:{"id": "vol", "g": "m", "en": "Volans, the Flying Fish", "es": "Pez volador, el Pez volador", "fact_en": "The Flying Fish is a far-southern constellation that never rises over Utah.", "fact_es": "El Pez volador es una constelación del extremo sur que nunca sale sobre Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verlo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"},
dor:{"id": "dor", "g": "m", "en": "Dorado, the Goldfish", "es": "Pez dorado, el Pez dorado", "fact_en": "The Goldfish is a far-southern constellation that never rises over Utah.", "fact_es": "El Pez dorado es una constelación del extremo sur que nunca sale sobre Utah.", "vis_en": "Never visible from Cache County, Utah. You'd need to travel far south to see it.", "vis_es": "Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verlo.", "src": "HYG v4.4; Stellarium modern lines; Professor Pi's Sky Tonight table"}};

const CITY_KEY112='lamp_sky_city112';
const DIARY_KEY112='lamp_sky_diary112';
const CUT_KIND112=10; // kind "up" threshold in degrees
const CUT_DRAW112=0;
const PRECESS_YEARS112=3000; // IAU 1976 precess() near 2000; precessLong() beyond
const PLANET_YEAR_MIN112=1800;
const PLANET_YEAR_MAX112=2200;
const SKY112={ready:false,loading:null,figs:null,stars:null,cities:null,names:null,err:null};
const UI112={view:'dome',span:'night',jd:null,city:0,pick:null,open:false,diaryOn:false,note:'',nightT:21};

function skyLang112(){try{return (typeof LANG!=='undefined'&&LANG==='es')||(typeof lang!=='undefined'&&lang==='es')?'es':'en'}catch(e){return 'en'}}
function skyT112(en,es){return skyLang112()==='es'?(es||en):en}
function skyEsc112(s){return (typeof esc==='function'?esc(String(s||'')):String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])))}
function skyReduce112(){return (typeof lampReduced73==='function'&&lampReduced73())||(typeof starReduce111==='function'&&starReduce111({}))||!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}
function skySfx112(){
 if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
 if(document.body.classList.contains('bedtime')&&typeof note!=='function')return;
 try{const c=typeof ac==='function'?ac():null;if(!c||typeof note!=='function')return;note(67,c.currentTime,.4,'glow',.035)}catch(e){}
}
function skyLSGet112(k,fb){
 try{if(typeof LS==='object'&&LS.get){const v=LS.get(k);return v==null?fb:v}}catch(e){}
 try{const v=localStorage.getItem(k);return v==null?fb:v}catch(e){}
 return fb;
}
function skyLSSet112(k,v){
 try{if(typeof LS==='object'&&LS.set){LS.set(k,v);return}}catch(e){}
 try{localStorage.setItem(k,v)}catch(e){}
}
function skyCityIdx112(){
 const raw=skyLSGet112(CITY_KEY112,'0');
 const n=parseInt(raw,10);
 const len=(SKY112.cities&&SKY112.cities.q&&SKY112.cities.q.length)||21;
 return (isFinite(n)&&n>=0&&n<len)?n:0;
}
function skyCity112(){
 const i=skyCityIdx112();
 UI112.city=i;
 const q=SKY112.cities&&SKY112.cities.q&&SKY112.cities.q[i];
 if(q)return {name:q[0],lat:q[1],lon:q[2],i};
 if(typeof SkyTonight!=='undefined'&&SkyTonight.DEFAULT_CITY)return Object.assign({i:0},SkyTonight.DEFAULT_CITY);
 return {name:'Cache County, Utah',lat:41.7,lon:-111.8,i:0};
}
function skySetCity112(i){
 UI112.city=i;
 skyLSSet112(CITY_KEY112,String(i));
 skyRedraw112();
}

function skyLoad112(){
 if(SKY112.ready)return Promise.resolve(SKY112);
 if(SKY112.loading)return SKY112.loading;
 SKY112.loading=Promise.all([
  fetch('sky/constellations.min.json').then(r=>{if(!r.ok)throw new Error('figs');return r.json()}),
  fetch('sky/stars.min.json').then(r=>{if(!r.ok)throw new Error('stars');return r.json()}),
  fetch('sky/cities.min.json').then(r=>{if(!r.ok)throw new Error('cities');return r.json()})
 ]).then(([c,s,k])=>{
  SKY112.figs=c;SKY112.stars=s;SKY112.cities=k;
  const names={};
  (s.nm||[]).forEach(pair=>{names[pair[1]]=pair[0]});
  SKY112.names=names;
  SKY112.ready=true;
  return SKY112;
 }).catch(err=>{SKY112.err=String(err&&err.message||err);throw err});
 return SKY112.loading;
}

function skyFigId112(f){return (f&&f.i)?String(f.i).toLowerCase():(f&&!f.i?'noc':'')}
function skyFigById112(id){
 if(!SKY112.figs||!SKY112.figs.c)return null;
 id=String(id||'').toLowerCase();
 return SKY112.figs.c.find(f=>skyFigId112(f)===id)||null;
}
function skyMeta112(id){
 id=String(id||'').toLowerCase();
 if(typeof STAR_META111==='object'&&STAR_META111[id])return STAR_META111[id];
 return META112[id]||null;
}
function skyTitle112(id,short){
 const m=skyMeta112(id);
 if(!m)return id;
 const full=skyLang112()==='es'?(m.es||m.en):m.en;
 if(!short)return full;
 const cut=full.split(',')[0].trim();
 return cut||full;
}
function skyFact112(id){
 const m=skyMeta112(id);
 if(!m)return '';
 return skyLang112()==='es'?(m.fact_es||m.fact_en):m.fact_en;
}
function skyVis112(id){
 const m=skyMeta112(id);
 if(!m)return '';
 return skyLang112()==='es'?(m.vis_es||m.vis_en):m.vis_en;
}

/* ---- time ---- */
function skyNowJD112(){
 const d=new Date();
 return SkyTonight.julianDate(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate(),d.getUTCHours()+d.getUTCMinutes()/60+d.getUTCSeconds()/3600);
}
function skyCivilToJD112(y,mo,d,h,mi,s){
 // interpret as local civil time on this device, then convert to UT
 const dt=new Date(0);
 dt.setFullYear(y, (mo||1)-1, d||1);
 dt.setHours(h||0, mi||0, s||0, 0);
 return SkyTonight.julianDate(dt.getUTCFullYear(),dt.getUTCMonth()+1,dt.getUTCDate(),dt.getUTCHours()+dt.getUTCMinutes()/60+dt.getUTCSeconds()/3600);
}
function skyJDToDate112(jd){
 return new Date(Math.round((jd-2440587.5)*86400000));
}
function skyYearOf112(jd){
 const d=skyJDToDate112(jd);
 const y=d.getUTCFullYear();
 const start=new Date(Date.UTC(2000,0,1));
 start.setUTCFullYear(y,0,1);
 const next=new Date(Date.UTC(2000,0,1));
 next.setUTCFullYear(y+1,0,1);
 const span=next.getTime()-start.getTime();
 const frac=span>0?(d.getTime()-start.getTime())/span:0;
 return y+frac;
}
function skyYearLabel112(y){
 const yi=Math.round(y);
 if(yi>0)return String(yi);
 if(yi===0)return skyT112('1 BCE','1 a. e. c.');
 const bce=1-yi;
 return skyT112(bce+' BCE',bce+' a. e. c.');
}
function skyDateLabel112(jd){
 const y=skyYearOf112(jd);
 const era=Math.abs(y-2000)>80;
 const d=skyJDToDate112(jd);
 if(era){
  return skyYearLabel112(d.getUTCFullYear());
 }
 try{
  return d.toLocaleString(skyLang112()==='es'?'es':'en',{weekday:'short',year:'numeric',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
 }catch(e){return d.toISOString()}
}
function skyInPlanetEra112(jd){
 const y=skyYearOf112(jd);
 return y>=PLANET_YEAR_MIN112&&y<=PLANET_YEAR_MAX112;
}
function skyPrecess112(ra,dec,jd){
 const y=skyYearOf112(jd);
 const d=Math.abs(y-2000);
 const near=SkyTonight.precess(ra,dec,SkyTonight.J2000,jd);
 const far=SkyTonight.precessLong(ra,dec,SkyTonight.J2000,jd);
 const lo=PRECESS_YEARS112-200, hi=PRECESS_YEARS112+200;
 if(d<=lo)return near;
 if(d>=hi)return far;
 const t=(d-lo)/(hi-lo);
 const toVec=p=>{
  const r=p.ra*Math.PI/180, de=p.dec*Math.PI/180, c=Math.cos(de);
  return [c*Math.cos(r), c*Math.sin(r), Math.sin(de)];
 };
 const A=toVec(near), B=toVec(far);
 const x=A[0]+t*(B[0]-A[0]), yy=A[1]+t*(B[1]-A[1]), z=A[2]+t*(B[2]-A[2]);
 const len=Math.hypot(x,yy,z)||1;
 const dec2=Math.asin(z/len)*180/Math.PI;
 let ra2=Math.atan2(yy/len,x/len)*180/Math.PI; if(ra2<0)ra2+=360;
 return {ra:ra2, dec:dec2};
}
function skyEnsureJD112(){
 if(UI112.jd==null)UI112.jd=skyCivilToJD112(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate(),21,0,0);
 return UI112.jd;
}

/* presets */
function skyPreset112(which){
 const now=new Date();
 const y=now.getFullYear(),mo=now.getMonth()+1,d=now.getDate();
 if(which==='evening'){UI112.span='night';UI112.jd=skyCivilToJD112(y,mo,d,21,0,0);UI112.nightT=21}
 else if(which==='midnight'){UI112.span='night';const n=new Date(now);n.setDate(n.getDate()+(now.getHours()>=12?1:0));UI112.jd=skyCivilToJD112(n.getFullYear(),n.getMonth()+1,n.getDate(),0,0,0);UI112.nightT=24}
 else if(which==='dawn'){UI112.span='night';const n=new Date(now);if(now.getHours()>=12)n.setDate(n.getDate()+1);UI112.jd=skyCivilToJD112(n.getFullYear(),n.getMonth()+1,n.getDate(),5,30,0);UI112.nightT=5.5}
 else if(which==='week'){UI112.span='night';const n=new Date(now);n.setDate(n.getDate()-7);UI112.jd=skyCivilToJD112(n.getFullYear(),n.getMonth()+1,n.getDate(),21,0,0);UI112.nightT=21}
 else if(which==='pyramids'){UI112.span='ages';UI112.jd=SkyTonight.julianDate(-2699,7,1,4)} // 2700 BCE, 21:00-ish MST ≈ 04 UT in July
 else if(which==='grown'){UI112.span='ages';UI112.jd=skyCivilToJD112(y+20,mo,d,21,0,0)}
 skyRedraw112();
}

/* ---- projection ---- */
function skyAltAz112(ra,dec,jd,city){
 const p=skyPrecess112(ra,dec,jd);
 return SkyTonight.altAz(p.ra,p.dec,city.lat,city.lon,jd);
}
function skyDomeXY112(alt,az,cx,cy,R){
 const r=((90-alt)/90)*R;
 if(r>R*1.08)return null;
 const rad=az*Math.PI/180;
 return {x:cx+r*Math.sin(rad),y:cy-r*Math.cos(rad)};
}
function skyWinXY112(alt,az,x0,y0,W,H){
 let d=((az-180+540)%360)-180; // 0 = south, east negative (left)
 if(alt<-4)return null;
 if(Math.abs(d)>100&&alt<70)return null;
 const x=x0+W/2+(d/90)*(W*0.5);
 const y=y0+H-(Math.max(alt,-2)/90)*H*0.92-H*0.04;
 return {x,y};
}

function skySunAlt112(jd,city){
 try{const s=SkyTonight.sun(jd);const a=SkyTonight.altAz(s.ra,s.dec,city.lat,city.lon,jd);return a.alt}catch(e){return -90}
}
function skyStillLight112(jd,city){return skySunAlt112(jd,city)>-6}

function skyNamed112(idx){return (SKY112.names&&SKY112.names[idx])||''}

function skyAgesLabel112(ns){
 if(ns&&ns.label)return ns.label;
 const name=(ns&&ns.short)||'Polaris';
 return skyT112('Year — the North Star is '+name,'Año — la Estrella Polar es '+name);
}
function skyNorthCopy112(jd){
 const year=typeof skyYearOf112==='function'?skyYearOf112(jd):null;
 // 1590 BCE is astronomical year -1589; 380 CE is 380.
 // skyYearOf112 is fractional; use the calendar year so mid-year 380 still counts.
 const yi=year==null?null:Math.floor(year);
 if(yi!=null&&yi>=-1589&&yi<=380){
  return {
   short:skyT112('none then','ninguna entonces'),
   label:skyT112('Year — there was no bright North Star then','Año — entonces no había una Estrella Polar brillante'),
   long:skyT112(
    'There was no bright North Star then. Kochab, in the Little Bear, was nearest — about 6.4 degrees from the pole at its closest.',
    'Entonces no había una Estrella Polar brillante. Kochab, en la Osa Menor, era la más cercana: a unos 6,4 grados del polo en su momento más cercano.'
   )
  };
 }
 const ns=SkyTonight.northStar(jd);
 const ALD={name:'Alderamin',ra:319.6449,dec:62.5856};
 const ap=SkyTonight.precessLong(ALD.ra,ALD.dec,SkyTonight.J2000,jd);
 const aldDist=90-ap.dec;
 let name=ns&&ns.name||'Polaris';
 let dist=ns&&isFinite(ns.dist)?ns.dist:0;
 if(aldDist<dist){name='Alderamin';dist=aldDist;}
 if(name==='Vega'){
  return {
   short:skyT112('Vega','Vega'),
   long:skyT112(
    'The North Star is Vega, in the Lyre. Around the year 14,000 it comes about 5 degrees from the pole — not as close as Polaris is today.',
    'La Estrella Polar es Vega, en la Lira. Hacia el año 14 000 se acerca a unos 5 grados del polo; no llega tan cerca como Polaris hoy.'
   )
  };
 }
 if(name==='Thuban'){
  return {
   short:skyT112('Thuban','Thuban'),
   long:skyT112(
    'The North Star is Thuban, in the Dragon. Around 2700 BCE it stood about 0.75 degrees from the pole.',
    'La Estrella Polar es Thuban, en el Dragón. Hacia el 2700 a. e. c. estuvo a unos 0,75 grados del polo.'
   )
  };
 }
 if(name==='Errai'){
  return {short:'Errai',long:skyT112('The North Star is Errai.','La Estrella Polar es Errai.')};
 }
 if(name==='Deneb'){
  return {short:'Deneb',long:skyT112('The North Star is Deneb, in the Swan.','La Estrella Polar es Deneb, en el Cisne.')};
 }
 if(name==='Alderamin'){
  return {
   short:skyT112('Alderamin','Alderamin'),
   long:skyT112(
    'The North Star is Alderamin, in Cepheus. Around the year 7500 it comes close to the pole.',
    'La Estrella Polar es Alderamin, en Cefeo. Hacia el año 7500 se acerca al polo.'
   )
  };
 }
 return {
  short:skyT112('Polaris','Polaris'),
  long:skyT112(
   'The North Star is Polaris. It sits about '+(dist?dist.toFixed(2):'0.74')+' degrees from the pole.',
   'La Estrella Polar es Polaris. Está a unos '+(dist?dist.toFixed(2).replace('.',','):'0,74')+' grados del polo.'
  )
 };
}

function skyAnimalsUp112(jd,city){
 if(!SKY112.figs)return [];
 const out=[];
 SKY112.figs.c.forEach(f=>{
  const id=skyFigId112(f);
  // tonight's animals: animal set, plus companion figures
  if(f.s!=='a'&&f.s!=='c')return;
  let best=-99,any=false,nUp=0,n=0;
  (f.q||[]).forEach(st=>{
   const a=skyAltAz112(st[0],st[1],jd,city);
   n++;
   if(a.alt>best)best=a.alt;
   if(a.alt>=CUT_KIND112){any=true;nUp++}
  });
  if(any||best>=CUT_KIND112){
   out.push({id,fig:f,alt:best,nUp,n,partial:best>=CUT_DRAW112&&nUp<(n*0.7)&&f.u==='b'});
  }
 });
 out.sort((a,b)=>b.alt-a.alt);
 return out;
}

/* ---- SVG sky ---- */
function skyDraw112(){
 const jd=skyEnsureJD112();
 const city=skyCity112();
 const reduce=skyReduce112();
 const view=UI112.view;
 const W=320,H=320;
 const still=skyStillLight112(jd,city);
 const sunAlt=skySunAlt112(jd,city);
 const dusk=still?(sunAlt>0?'#6b83a8':'#3a4660'):'#120e18';
 const ink=still?'#f7f1e2':'#f6efe0';
 const line=still?'#d9c07a':'#e6b454';
 const ground=still?'#8a7a62':'#1a1410';
 let parts=[];
 const cx=W/2,cy=H/2,R=148;
 const x0=16,y0=16,wW=W-32,wH=H-48;
 function proj(alt,az){
  return view==='window'?skyWinXY112(alt,az,x0,y0,wW,wH):skyDomeXY112(alt,az,cx,cy,R);
 }
 if(view==='dome'){
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${dusk}" stroke="#72583f" stroke-width="2"/>`);
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#e6b454" stroke-width="0.6" opacity=".35"/>`);
  // N E S W
  const labs=[['N',0],['E',90],['S',180],['W',270]];
  labs.forEach(L=>{
   const p=skyDomeXY112(2,L[1],cx,cy,R+12);
   if(p)parts.push(`<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="#e6b454">${L[0]}</text>`);
  });
  parts.push(`<circle cx="${cx}" cy="${cy}" r="1.6" fill="#e6b454" opacity=".7"/>`); // zenith
 }else{
  parts.push(`<rect x="${x0}" y="${y0}" width="${wW}" height="${wH}" fill="${dusk}" stroke="#72583f" stroke-width="2"/>`);
  const hy=y0+wH-wH*0.04;
  parts.push(`<rect x="${x0}" y="${hy}" width="${wW}" height="${H-hy-8}" fill="${ground}" stroke="none"/>`);
  parts.push(`<text x="${x0+8}" y="${hy-4}" font-size="10" fill="#e6b454">${skyT112('E','E')}</text>`);
  parts.push(`<text x="${x0+wW/2}" y="${hy-4}" text-anchor="middle" font-size="10" fill="#e6b454">${skyT112('S','S')}</text>`);
  parts.push(`<text x="${x0+wW-8}" y="${hy-4}" text-anchor="end" font-size="10" fill="#e6b454">${skyT112('W','O')}</text>`);
 }
 // background stars
 const clipId='skyclip112';
 if(view==='dome')parts.push(`<clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${R-1}"/></clipPath>`);
 else parts.push(`<clipPath id="${clipId}"><rect x="${x0+1}" y="${y0+1}" width="${wW-2}" height="${wH-2}"/></clipPath>`);
 let stars='';
 (SKY112.stars.q||[]).forEach((st,i)=>{
  const a=skyAltAz112(st[0],st[1],jd,city);
  if(a.alt<CUT_DRAW112)return;
  const p=proj(a.alt,a.az);if(!p)return;
  const mag=st[2];
  const r=Math.max(0.45,1.8*Math.pow(10,-0.15*(mag-0.03)));
  const op=still?0.55:0.95;
  const nm=skyNamed112(i);
  stars+=`<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${r.toFixed(2)}" fill="${ink}" opacity="${op}" stroke="none"/>`;
  if(nm&&mag<=1.6){
   stars+=`<text x="${(p.x+3.5).toFixed(1)}" y="${(p.y-3).toFixed(1)}" font-size="7.5" fill="${ink}" opacity=".8">${skyEsc112(nm)}</text>`;
  }
 });
 parts.push(`<g clip-path="url(#${clipId})">${stars}</g>`);
 // figures
 let lines='';
 const up=skyAnimalsUp112(jd,city);
 const pick=UI112.pick;
 (SKY112.figs.c||[]).forEach(f=>{
  const id=skyFigId112(f);
  const hi=pick&&pick===id;
  const shown=hi||!pick; // if a figure is picked, still draw others faintly
  if(!shown&&!hi)return;
  const pts=(f.q||[]).map(st=>{
   const a=skyAltAz112(st[0],st[1],jd,city);
   return {alt:a.alt,az:a.az,p:a.alt>=CUT_DRAW112-1?proj(a.alt,a.az):null};
  });
  (f.l||[]).forEach(pair=>{
   const A=pts[pair[0]],B=pts[pair[1]];
   if(!A||!B||!A.p||!B.p)return;
   if(A.alt<CUT_DRAW112||B.alt<CUT_DRAW112)return;
   const op=hi?0.95:(pick?0.18:0.45);
   const sw=hi?1.7:1.05;
   lines+=`<path d="M${A.p.x.toFixed(2)} ${A.p.y.toFixed(2)} L${B.p.x.toFixed(2)} ${B.p.y.toFixed(2)}" stroke="${line}" stroke-width="${sw}" fill="none" stroke-linecap="round" opacity="${op}"/>`;
  });
 });
 parts.push(`<g clip-path="url(#${clipId})">${lines}</g>`);
 // Sun / Moon / planets
 if(skyInPlanetEra112(jd)){
  try{
   const sun=SkyTonight.sun(jd);
   const sa=SkyTonight.altAz(sun.ra,sun.dec,city.lat,city.lon,jd);
   if(sa.alt>-6){
    const p=proj(Math.max(sa.alt,0.2),sa.az);
    if(p)parts.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="#f3d48a" opacity=".9" stroke="#e6b454" stroke-width="1"/>`);
   }
   const mo=SkyTonight.moon(jd);
   const ma=SkyTonight.altAz(mo.ra,mo.dec,city.lat,city.lon,jd);
   if(ma.alt>CUT_DRAW112){
    const p=proj(ma.alt,ma.az);
    if(p){
     const phase=isFinite(mo.phase)?mo.phase:0.5;
     parts.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.2" fill="#f3efe4" opacity=".9" stroke="#cfc6b4" stroke-width=".6"/>`);
     parts.push(`<text x="${(p.x+6).toFixed(1)}" y="${(p.y-4).toFixed(1)}" font-size="7.5" fill="${ink}" opacity=".85">${skyT112('Moon','Luna')}</text>`);
    }
   }
   SkyTonight.planets(jd).forEach(pl=>{
    const a=SkyTonight.altAz(pl.ra,pl.dec,city.lat,city.lon,jd);
    if(a.alt<CUT_DRAW112)return;
    const p=proj(a.alt,a.az);if(!p)return;
    const col={Mercury:'#c9c0b0',Venus:'#f0e6c4',Mars:'#d9896a',Jupiter:'#e6c494',Saturn:'#e2d2a8'}[pl.name]||'#e6d8b0';
    const nm={Mercury:skyT112('Mercury','Mercurio'),Venus:skyT112('Venus','Venus'),Mars:skyT112('Mars','Marte'),Jupiter:skyT112('Jupiter','Júpiter'),Saturn:skyT112('Saturn','Saturno')}[pl.name]||pl.name;
    parts.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.4" fill="${col}" stroke="#fff6d8" stroke-width=".4"/>`);
    parts.push(`<text x="${(p.x+4).toFixed(1)}" y="${(p.y-3).toFixed(1)}" font-size="7" fill="${ink}" opacity=".85">${skyEsc112(nm)}</text>`);
   });
  }catch(e){}
 }
 // a small tucked turtle on the rim (Shell's cousin, always present)
 const tx=view==='dome'?cx+R-18:x0+wW-22;
 const ty=view==='dome'?cy+R-18:y0+wH-18;
 parts.push(skyTurtleMark112(tx,ty,ink));
 const cls='skyView112'+(reduce?' reduce112':'')+(still?' is-light112':'');
 const aria=skyT112('The sky from '+city.name,'El cielo desde '+city.name);
 return `<svg class="${cls}" id="skyCanvas112" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${skyEsc112(aria)}" style="touch-action:pan-y;max-width:28rem;display:block;margin:0 auto">${parts.join('')}</svg>`;
}

function skyTurtleMark112(x,y,ink){
 // tiny original turtle, quiet on the rim
 return `<g class="skyTurtle112" transform="translate(${(x-8).toFixed(1)} ${(y-7).toFixed(1)})" aria-hidden="true">
  <ellipse cx="8" cy="8" rx="6.2" ry="4.6" fill="#7d9574" stroke="#72583f" stroke-width=".8"/>
  <ellipse cx="8" cy="8" rx="3.2" ry="2.4" fill="#cfe0c4" stroke="none" opacity=".8"/>
  <circle cx="14.2" cy="7.2" r="2.1" fill="#7d9574" stroke="#72583f" stroke-width=".7"/>
  <circle cx="15" cy="6.7" r=".45" fill="#2a241c"/>
  <path d="M2 9 Q0 10 1.4 11" fill="none" stroke="#72583f" stroke-width=".7" stroke-linecap="round"/>
  <path d="M13 11 Q14.5 13 12.5 13" fill="none" stroke="#72583f" stroke-width=".7" stroke-linecap="round"/>
 </g>`;
}

/* ---- figure pictures (catalog) ---- */
function skySize112(mag){return Math.min(Math.max(0.12,Math.pow(10,-0.2*((Number(mag)||4)-0.03))),0.46)}
function skyFigSVG112(id,opt){
 opt=opt||{};
 if(typeof STAR_META111==='object'&&STAR_META111[id]&&typeof starFigureSVG111==='function'){
  return starFigureSVG111(id,opt);
 }
 const f=skyFigById112(id);if(!f)return '';
 const W=opt.w||100,H=opt.h||100,pad=opt.pad||8;
 const reduce=opt.reduce!=null?!!opt.reduce:skyReduce112();
 const ink=opt.ink||'#f6efe0',line=opt.line||'#e6b454',sky=opt.sky||'';
 const q=f.q||[],lns=f.l||[];
 const pos=q.map(st=>{
  const x=pad+(Number(st[3])||0)*(W-2*pad);
  const y=pad+(Number(st[4])||0)*(H-2*pad);
  return {x,y,mag:st[2]};
 });
 const nL=lns.length,step=nL?Math.min(1.1,7/nL):0;
 const lines=lns.map((pair,i)=>{
  const a=pos[pair[0]],b=pos[pair[1]];if(!a||!b)return '';
  const d='M'+a.x.toFixed(2)+' '+a.y.toFixed(2)+' L'+b.x.toFixed(2)+' '+b.y.toFixed(2);
  const delay=reduce?0:(i*step);
  return `<path class="starLine111" pathLength="1" d="${d}" stroke="${line}" stroke-width="${opt.sw||1.35}" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:${delay}s"/>`;
 }).join('');
 const named=SKY112.names||{};
 // map ra/dec to named catalog stars for labels
 const labels=[];
 if(opt.labels){
  const catalog=SKY112.stars&&SKY112.stars.q||[];
  const nm=SKY112.stars&&SKY112.stars.nm||[];
  const byIdx={};nm.forEach(p=>{byIdx[p[1]]=p[0]});
  q.forEach((st,i)=>{
   let name='';
   for(let k=0;k<catalog.length;k++){
    const c=catalog[k];
    if(Math.abs(c[0]-st[0])<0.05&&Math.abs(c[1]-st[1])<0.05){name=byIdx[k]||'';break}
   }
   if(name&&(st[2]<=2.5||name==='Arneb'))labels[i]=name;
  });
 }
 const stars=pos.map((p,i)=>{
  const r=Math.max(0.85,(W/26)*skySize112(p.mag)*(opt.scale||1));
  const lab=labels[i]?`<text x="${(p.x+4.2).toFixed(1)}" y="${(p.y-3.2).toFixed(1)}" font-size="${Math.max(5,W/28)}" fill="${ink}" opacity=".85">${skyEsc112(labels[i])}</text>`:'';
  return `<circle class="starDot111" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${r.toFixed(2)}" fill="${ink}" stroke="none"/>${lab}`;
 }).join('');
 const cls='starTrace111'+(reduce?' reduce111':'');
 const bg=sky?`<rect width="${W}" height="${H}" fill="${sky}" rx="${opt.rx||0}"/>`:'';
 return `<g class="${cls}" data-starfig="${id}" data-reduce="${reduce?'1':'0'}" data-lines="${nL}">${bg}${lines}${stars}</g>`;
}
function skySkySVG112(id,opt){
 opt=opt||{};
 const W=opt.w||240,H=opt.h||240;
 const inner=skyFigSVG112(id,{w:W,h:H,pad:opt.pad||28,labels:!!opt.labels,reduce:skyReduce112(),scale:opt.scale||1.15,sw:opt.sw||1.7,sky:'#120e18',ink:'#f6efe0',line:'#e6b454',rx:opt.rx||0});
 return `<svg class="starSky111" viewBox="0 0 ${W} ${H}" width="${opt.width||W}" height="${opt.height||H}" role="img" aria-label="${skyEsc112(skyTitle112(id))}">${inner}</svg>`;
}
function skyTileArt112(id){
 return `<svg class="lamp-art63" data-original-art="star-${id}-112" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">${skyFigSVG112(id,{w:100,h:100,pad:16,reduce:true,sky:'#120e18',ink:'#f6efe0',line:'#e6b454',rx:50,sw:1.4})}<circle cx="50" cy="50" r="47" fill="none" stroke="#72583f" stroke-width="2"/></svg>`;
}

/* ---- diary (local only) ---- */
function skyDiary112(){
 try{return JSON.parse(skyLSGet112(DIARY_KEY112,'[]'))||[]}catch(e){return []}
}
function skyDiarySave112(){
 const list=skyDiary112();
 const city=skyCity112();
 const rec={v:1,on:new Date().toISOString(),jd:skyEnsureJD112(),city:city.name,lat:city.lat,lon:city.lon,note:String(UI112.note||'').slice(0,160)};
 list.unshift(rec);
 skyLSSet112(DIARY_KEY112,JSON.stringify(list.slice(0,40)));
 UI112.note='';
 skyRedraw112(true);
}
function skyDiaryOpen112(i){
 const rec=skyDiary112()[i];
 if(!rec)return;
 UI112.jd=rec.jd;
 UI112.span=Math.abs(skyYearOf112(rec.jd)-new Date().getFullYear())>2?'ages':'night';
 // match city by name if we can
 if(SKY112.cities&&SKY112.cities.q){
  const ix=SKY112.cities.q.findIndex(q=>q[0]===rec.city);
  if(ix>=0){UI112.city=ix;skyLSSet112(CITY_KEY112,String(ix))}
 }
 skyRedraw112();
}
function skyDiaryClearOne112(i){
 const list=skyDiary112();
 list.splice(i,1);
 skyLSSet112(DIARY_KEY112,JSON.stringify(list));
 skyRedraw112(true);
}

/* ---- HTML ---- */
function skyStyle112(){
 if(document.getElementById('skyStyle112'))return;
 const s=document.createElement('style');
 s.id='skyStyle112';
 s.textContent=`
 .skyCard112{padding-bottom:1rem}
 .skyView112{background:transparent}
 .skyToolbar112{display:flex;flex-wrap:wrap;gap:.4rem;margin:.6rem 0;align-items:center}
 .skyToolbar112 button[aria-pressed="true"]{outline:2px solid #e6b454;outline-offset:1px}
 .skySlide112{width:100%;accent-color:#e6b454}
 .skyAnimals112{display:flex;flex-wrap:wrap;gap:.35rem;margin:.5rem 0}
 .skyAnimals112 button{font:inherit;padding:.25rem .55rem;border-radius:999px;border:1px solid #72583f;background:#f7f1e2;color:inherit}
 .skyAnimals112 button[aria-pressed="true"]{background:#e6b454;color:#2a241c}
 .skyStill112{background:#efe6d4;border-radius:.6rem;padding:.5rem .7rem;margin:.4rem 0}
 .skyDiary112 textarea{width:100%;min-height:3.2rem;font:inherit}
 .skyTurtleCorner112{float:right;margin:.2rem .1rem 0 .4rem}
 @media (prefers-reduced-motion:reduce){
  .skyView112 *,.reduce112, .reduce112 *{animation:none!important;transition:none!important}
 }
 .body.bedtime .skyAnimals112 button,.bedtime .skyAnimals112 button{background:#241c16;color:#f6efe0;border-color:#e6b454}
 `;
 document.head.appendChild(s);
}

function skyHTML112(){
 skyStyle112();
 if(!SKY112.ready){
  skyLoad112().then(()=>{if(typeof LU83==='object'&&LU83.sky112&&typeof luRender83==='function')luRender83()}).catch(()=>{});
  return `<div class="card skyCard112"><button type="button" onclick="skyClose112()">${skyEsc112(typeof gT==='function'?gT('Back'):'Back')}</button>
  <h2 class="kline">${skyT112('Sky Tonight','El cielo esta noche')}</h2>
  <p class="soft">${skyT112('Looking up…','Mirando al cielo…')}</p></div>`;
 }
 if(SKY112.err){
  return `<div class="card skyCard112"><button type="button" onclick="skyClose112()">${skyEsc112(typeof gT==='function'?gT('Back'):'Back')}</button>
  <h2 class="kline">${skyT112('Sky Tonight','El cielo esta noche')}</h2>
  <p class="kline">${skyT112('The sky pack could not be read on this device.','No se pudo leer el paquete del cielo en este aparato.')}</p></div>`;
 }
 const jd=skyEnsureJD112();
 const city=skyCity112();
 const still=skyStillLight112(jd,city);
 const ns=skyNorthCopy112(jd);
 const up=skyAnimalsUp112(jd,city);
 const planets=skyInPlanetEra112(jd);
 const cities=(SKY112.cities.q||[]).map((q,i)=>`<option value="${i}"${i===city.i?' selected':''}>${skyEsc112(q[0])}</option>`).join('');
 const gTfn=typeof gT==='function'?gT:(s=>s);
 const animals=up.map(a=>{
  const pressed=UI112.pick===a.id?'true':'false';
  return `<button type="button" aria-pressed="${pressed}" onclick="skyPick112('${a.id}')">${skyEsc112(skyTitle112(a.id))}</button>`;
 }).join('')||`<span class="soft">${skyT112('No animal figures are above 10° from here at this hour.','Ninguna figura animal está a más de 10° desde aquí a esta hora.')}</span>`;
 const fact=UI112.pick?`<div class="card" data-skyfact112="${UI112.pick}"><h3 class="kline">${skyEsc112(skyTitle112(UI112.pick))}</h3>
  <p class="kline">${skyEsc112(skyFact112(UI112.pick))}</p>
  <p class="soft">${skyEsc112(skyVis112(UI112.pick))}</p>
  <p class="soft">${skyT112('Visibility notes describe the view from Cache County, Utah. The picture above uses the city you picked.','Las notas de visibilidad describen la vista desde el condado de Cache, Utah. El dibujo de arriba usa la ciudad que elegiste.')}</p></div>`:'';
 const year=skyYearOf112(jd);
 const nightVal=UI112.span==='night'?skyNightVal112(jd):'';
 const agesVal=Math.round(year);
 const diary=skyDiary112();
 const diaryList=diary.length?`<ul class="soft">${diary.map((r,i)=>`<li><button type="button" onclick="skyDiaryOpen112(${i})">${skyEsc112((r.city||'')+' · '+skyDateLabel112(r.jd))}${r.note?' — '+skyEsc112(r.note):''}</button> <button type="button" class="soft" onclick="skyDiaryClearOne112(${i})">${skyT112('Remove','Quitar')}</button></li>`).join('')}</ul>`:`<p class="soft">${skyT112('No nights saved yet.','Aún no hay noches guardadas.')}</p>`;
 const turtle=`<svg class="skyTurtleCorner112" viewBox="0 0 28 24" width="36" height="32" aria-hidden="true" focusable="false">${skyTurtleMark112(14,12,'#72583f')}</svg>`;
 return `<div class="card skyCard112" data-sky112="1"><button type="button" onclick="skyClose112()">${skyEsc112(gTfn('Back'))}</button>
 ${turtle}
 <h2 class="kline">${skyT112('Sky Tonight','El cielo esta noche')}</h2>
 <p class="kline">${skyT112('A quiet look at the stars from a city you pick. The sky stays on this device.','Una mirada tranquila a las estrellas desde una ciudad que tú eliges. El cielo se queda en este aparato.')}</p>
 <label class="soft">${skyT112('City','Ciudad')}
  <select id="skyCity112" onchange="skySetCity112(parseInt(this.value,10))">${cities}</select>
 </label>
 <p class="soft">${skyT112('There is no GPS. Your choice is saved only on this device.','No hay geolocalización. Tu elección se guarda solo en este aparato.')}</p>
 ${still?`<p class="skyStill112 kline" data-still112="1">${skyT112('Still light. The Sun is not far enough below the horizon for a dark sky yet.','Todavía hay luz. El Sol no está lo bastante bajo en el horizonte para un cielo oscuro.')}</p>`:''}
 <div class="skyToolbar112">
  <button type="button" aria-pressed="${UI112.view==='dome'?'true':'false'}" onclick="skySetView112('dome')">${skyT112('Dome','Cúpula')}</button>
  <button type="button" aria-pressed="${UI112.view==='window'?'true':'false'}" onclick="skySetView112('window')">${skyT112('Window','Ventana')}</button>
  <button type="button" aria-pressed="${UI112.span==='night'?'true':'false'}" onclick="skySetSpan112('night')">${skyT112('This night','Esta noche')}</button>
  <button type="button" aria-pressed="${UI112.span==='ages'?'true':'false'}" onclick="skySetSpan112('ages')">${skyT112('All time','A lo largo del tiempo')}</button>
 </div>
 <div data-skystage112="1">${skyDraw112()}</div>
 <p class="kline" data-skylabel112="1">${skyEsc112(skyDateLabel112(jd))}</p>
 <p class="kline" data-skynorth112="1">${skyEsc112(ns.long)}</p>
 ${!planets?`<p class="soft" data-skyhide112="1">${skyT112('The Moon and the wandering stars are drawn only for nights near our own time. For this faraway night, we just draw the stars.','La Luna y los astros errantes se dibujan solo en noches cercanas a nuestro tiempo. En esta noche lejana, solo dibujamos las estrellas.')}</p>`:''}
 ${UI112.span==='night'?`<label class="soft">${skyT112('Time tonight','Hora de esta noche')}<input class="skySlide112" id="skySlide112" type="range" min="16" max="32" step="0.05" value="${skyNightVal112(jd)}" oninput="skySlideNight112(this.value)"></label>`:
 `<label class="soft"><span data-skyslidelab112="1">${skyEsc112(skyAgesLabel112(ns))}</span><input class="skySlide112" id="skySlide112" type="range" min="-4000" max="16000" step="10" value="${agesVal}" oninput="skySlideAges112(this.value)"></label>`}
 <div class="skyToolbar112">
  <button type="button" onclick="skyPreset112('evening')">${skyT112('Tonight evening','Esta noche, al anochecer')}</button>
  <button type="button" onclick="skyPreset112('midnight')">${skyT112('Midnight','Medianoche')}</button>
  <button type="button" onclick="skyPreset112('dawn')">${skyT112('Before dawn','Antes del amanecer')}</button>
  <button type="button" onclick="skyPreset112('week')">${skyT112('Last week','La semana pasada')}</button>
  <button type="button" onclick="skyPreset112('pyramids')">${skyT112('Night of the pyramids','La noche de las pirámides')}</button>
  <button type="button" onclick="skyPreset112('grown')">${skyT112('When I am grown','Cuando sea mayor')}</button>
 </div>
 <h3 class="kline">${skyT112("Tonight's animals",'Los animales de esta noche')}</h3>
 <p class="soft">${skyT112('These animal figures (and the companion pictures) are at least 10° up from here. Circumpolar ones stay. Ones that never rise from this city stay quietly away.','Estas figuras de animales (y las de los compañeros) están al menos a 10° desde aquí. Las circunpolares se quedan. Las que nunca salen desde esta ciudad se ausentan en silencio.')}</p>
 <div class="skyAnimals112" data-skyanimals112="1">${animals}</div>
 ${fact}
 <div class="skyDiary112">
  <h3 class="kline">${skyT112('My sky diary','Mi diario del cielo')}</h3>
  <p class="soft">${skyT112('A small list of nights you want to remember. It lives only on this device, and it is cleared if this site’s storage is cleared. Nothing is sent away.','Una lista pequeña de noches que quieres recordar. Vive solo en este aparato, y se borra si se borra el almacenamiento de este sitio. No se envía nada.')}</p>
  <label class="soft">${skyT112('A quiet note, if you want','Una nota breve, si quieres')}<textarea id="skyNote112" maxlength="160" oninput="UI112.note=this.value">${skyEsc112(UI112.note||'')}</textarea></label>
  <p><button type="button" class="p" onclick="skyDiarySave112()">${skyT112('Remember this night','Recordar esta noche')}</button></p>
  ${diaryList}
 </div>
 <p class="soft lu83-credit">${skyT112('Star places: HYG v4.4, CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/ (plain text). Stick figures follow Stellarium’s modern lines. Sky math is Professor Pi’s, with Moon and planet paths in the style of Schlyter, only for nights near our own time.','Lugares de las estrellas: HYG v4.4, CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/ (texto simple). Las figuras siguen las líneas modernas de Stellarium. La matemática del cielo es de la profesora Pi, con las rutas de la Luna y los planetas al estilo de Schlyter, solo para noches cercanas a nuestro tiempo.')}</p>
 </div>`;
}

function skyNightVal112(jd){
 // hours from local midnight, allowing 16..32 (4pm to 8am next day)
 const ms=(jd-2440587.5)*86400000;
 const d=new Date(ms);
 let h=d.getHours()+d.getMinutes()/60;
 if(h<12)h+=24;
 return Math.max(16,Math.min(32,h));
}
function skySlideNight112(v){
 const h=parseFloat(v);
 if(!isFinite(h))return;
 const now=new Date();
 const base=new Date(now);
 // if value >=24, next calendar morning
 let day=base.getDate();
 let hour=h;
 if(h>=24){hour=h-24;if(now.getHours()>=12||true){/* keep today's morning only if already morning and sliding dawn */} }
 // Anchor to the date of the current jd when possible
 const cur=new Date((skyEnsureJD112()-2440587.5)*86400000);
 const y=cur.getFullYear(),mo=cur.getMonth()+1,d=cur.getDate();
 let useY=y,useM=mo,useD=d,useH=h;
 if(h>=24){
  // morning after the evening date: if current local hour of cur is >=16, add a day
  const next=new Date(cur);
  if(cur.getHours()>=12)next.setDate(next.getDate()+1);
  // if we were already in the morning (jd is 0-8h), keep that morning
  if(cur.getHours()<12){/* same morning */}
  else {useY=next.getFullYear();useM=next.getMonth()+1;useD=next.getDate()}
  useH=h-24;
 }
 UI112.nightT=h;
 UI112.jd=skyCivilToJD112(useY,useM,useD,Math.floor(useH),(useH%1)*60,0);
 skyPatch112();
}
function skySlideAges112(v){
 const year=parseFloat(v);
 if(!isFinite(year))return;
 const cur=new Date((skyEnsureJD112()-2440587.5)*86400000);
 // keep month/day/hour; for BCE, julianDate accepts astronomical years
 const mo=cur.getUTCMonth()+1,d=cur.getUTCDate();
 const h=cur.getUTCHours()+cur.getUTCMinutes()/60;
 // Use a stable mid-year evening when jumping far, but keep clock from cur
 const yi=Math.round(year);
 if(yi<=0){
  UI112.jd=SkyTonight.julianDate(yi,7,1,4);
 }else if(yi>3000||yi<1600){
  UI112.jd=SkyTonight.julianDate(yi,7,1,4);
 }else{
  UI112.jd=SkyTonight.julianDate(yi,mo,d,h);
 }
 skyPatch112();
}
function skySetView112(v){UI112.view=v==='window'?'window':'dome';skyPatch112()}
function skySetSpan112(v){
 const next=v==='ages'?'ages':'night';
 if(next!==UI112.span){
  UI112.span=next;
  if(next==='night'&&Math.abs(skyYearOf112(skyEnsureJD112())-new Date().getFullYear())>2){
   skyPreset112('evening');return;
  }
 }
 skyRedraw112();
}
function skyPick112(id){
 UI112.pick=(UI112.pick===id)?null:id;
 skyRedraw112(true);
}
function skyOpen112(){
 if(typeof LU83==='object'){LU83.sky112=true;LU83.star111=null;LU83.story101=null}
 skySfx112();
 if(UI112.jd==null)UI112.jd=skyCivilToJD112(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate(),21,0,0);
 skyLoad112().then(()=>{if(typeof luRender83==='function')luRender83();window.scrollTo(0,0)}).catch(()=>{if(typeof luRender83==='function')luRender83()});
 if(typeof luRender83==='function')luRender83();
 window.scrollTo(0,0);
}
function skyClose112(){
 if(typeof LU83==='object')LU83.sky112=false;
 if(typeof luRender83==='function')luRender83();
 window.scrollTo(0,0);
}

function skyRedraw112(keepScroll){
 if(typeof LU83==='object'&&LU83.sky112&&typeof luRender83==='function'){
  const y=keepScroll?window.scrollY:0;
  luRender83();
  if(keepScroll)window.scrollTo(0,y);
  skyBindSwipe112();
 }
}
function skyPatch112(){
 // faster path: rewrite the stage + labels if the card is up
 const stage=document.querySelector('[data-skystage112]');
 if(!stage||!SKY112.ready){skyRedraw112();return}
 stage.innerHTML=skyDraw112();
 const jd=skyEnsureJD112();
 const lab=document.querySelector('[data-skylabel112]');
 if(lab)lab.textContent=skyDateLabel112(jd);
 const north=document.querySelector('[data-skynorth112]');
 const ns=skyNorthCopy112(jd);
 if(north)north.textContent=ns.long;
 const slideLab=document.querySelector('[data-skyslidelab112]');
 if(slideLab)slideLab.textContent=skyAgesLabel112(ns);
 const city=skyCity112();
 const still=skyStillLight112(jd,city);
 let stillEl=document.querySelector('[data-still112]');
 if(still&&!stillEl){
  skyRedraw112();return;
 }
 if(!still&&stillEl)stillEl.remove();
 const hideWant=!skyInPlanetEra112(jd);
 const hideEl=document.querySelector('[data-skyhide112]');
 if(hideWant&&!hideEl){skyRedraw112();return}
 if(!hideWant&&hideEl)hideEl.remove();
 const box=document.querySelector('[data-skyanimals112]');
 if(box){
  const up=skyAnimalsUp112(jd,city);
  box.innerHTML=up.map(a=>{
   const pressed=UI112.pick===a.id?'true':'false';
   return `<button type="button" aria-pressed="${pressed}" onclick="skyPick112('${a.id}')">${skyEsc112(skyTitle112(a.id))}</button>`;
  }).join('')||`<span class="soft">${skyT112('No animal figures are above 10° from here at this hour.','Ninguna figura animal está a más de 10° desde aquí a esta hora.')}</span>`;
 }
 skyBindSwipe112();
}

function skyBindSwipe112(){
 const el=document.getElementById('skyCanvas112');
 if(!el||el._skySwipe)return;
 el._skySwipe=true;
 let x0=0,t0=0,from=0,axis=null;
 el.addEventListener('pointerdown',e=>{
  x0=e.clientX;t0=e.clientY;axis=null;
  if(UI112.span==='night')from=skyNightVal112(skyEnsureJD112());
  else from=Math.round(skyYearOf112(skyEnsureJD112()));
  try{el.setPointerCapture(e.pointerId)}catch(err){}
 });
 el.addEventListener('pointermove',e=>{
  if(t0===0&&x0===0)return;
  const dx=e.clientX-x0,dy=e.clientY-t0;
  if(axis==null&&(Math.abs(dx)>8||Math.abs(dy)>8))axis=Math.abs(dx)>Math.abs(dy)?'x':'y';
  if(axis!=='x')return;
  e.preventDefault();
  if(UI112.span==='night'){
   const next=Math.max(16,Math.min(32,from-dx/28));
   skySlideNight112(next);
   const sl=document.getElementById('skySlide112');if(sl)sl.value=String(next);
  }else{
   const next=Math.max(-4000,Math.min(16000,from-dx*8));
   skySlideAges112(next);
   const sl=document.getElementById('skySlide112');if(sl)sl.value=String(Math.round(next));
  }
 });
 el.addEventListener('pointerup',()=>{x0=0;t0=0;axis=null});
 el.addEventListener('pointercancel',()=>{x0=0;t0=0;axis=null});
}

/* ---- Look Up hooks ---- */
function skyNavCard112(){
 return `<div class="card" data-skynav112="1"><h3>${skyT112('Sky Tonight','El cielo esta noche')}</h3>
 <p class="soft">${skyT112('See the sky from a city you pick, tonight or far away in time. A small diary can remember a night on this device.','Mira el cielo desde una ciudad que elijas, esta noche o en un tiempo lejano. Un diario pequeño puede recordar una noche en este aparato.')}</p>
 <p><button type="button" class="p" onclick="skyOpen112()">${skyT112('Open Sky Tonight','Abrir El cielo esta noche')}</button></p>
 </div>`;
}

function skyStarNav112(){
 if(!SKY112.ready)skyLoad112().then(()=>{if(typeof luRender83==='function')luRender83()}).catch(()=>{});
 const gTfn=typeof gT==='function'?gT:(s=>s);
 const four=['cyg','del','lep','umi'];
 const comps=['dra','phe','lyr','mus','noc'];
 const animals=ANIMAL_IDS112;
 const tile=id=>`<button class="hubtile" type="button" onclick="luStarOpen111('${id}')">${skyTileArt112(id)}<span class="kline">${skyEsc112(skyTitle112(id,true))}</span></button>`;
 return `<div class="card" data-lustars111="1"><h3>${gTfn('Star friends')}</h3>
 <p class="soft">${gTfn('Real shapes in the sky, with one true fact each. The stars stay on this device.')}</p>
 <div class="hubgrid">${four.map(tile).join('')}</div>
 <p class="soft">${skyT112('More animal figures from the same quiet catalog.','Más figuras de animales del mismo catálogo callado.')}</p>
 <div class="hubgrid">${animals.map(tile).join('')}</div>
 <p class="soft">${gTfn('Companion stars live here too.')}</p>
 <div class="hubgrid">${comps.map(tile).join('')}</div>
 </div>`;
}

function skyStarHTML112(id){
 const gTfn=typeof gT==='function'?gT:(s=>s);
 if(!id||id==='list'){
  return `<div class="card luStar111"><button type="button" onclick="luStarClose111()">${gTfn('Back')}</button><h2 class="kline">${gTfn('Star friends')}</h2><p class="kline">${gTfn('These pictures use real star places. Look as long as you like.')}</p>${skyStarNav112().replace('<div class="card" data-lustars111="1">','<div data-lustars111="1">')}</div>`;
 }
 const m=skyMeta112(id);if(!m)return '';
 const src=m.src||'HYG v4.4; Stellarium modern lines';
 const cap=(typeof starCaption111==='function')?starCaption111(id):'';
 const story=(typeof starStory111==='function')?starStory111(id):'';
 return `<div class="card luStar111" data-starpage="${id}"><button type="button" onclick="luStarClose111()">${gTfn('Back')}</button>
 <h2 class="kline">${skyEsc112(skyTitle112(id))}</h2>
 ${cap?`<p class="kline">${skyEsc112(cap)}</p>`:''}
 <div class="luPlanetArt101">${skySkySVG112(id,{w:240,h:240,width:240,height:240,labels:true,pad:28})}</div>
 <p class="kline">${skyEsc112(skyFact112(id))}</p>
 ${skyVis112(id)?`<p class="soft">${skyEsc112(skyVis112(id))}</p>`:''}
 ${story?`<p class="kline">${skyEsc112(story)}</p>`:''}
 <p class="soft">${skyT112('Visibility notes describe the view from Cache County, Utah.','Las notas de visibilidad describen la vista desde el condado de Cache, Utah.')}</p>
 <p class="soft lu83-credit">${skyEsc112(typeof starCredit111==='function'?starCredit111():'HYG v4.4, CC BY-SA 4.0, https://creativecommons.org/licenses/by-sa/4.0/')}</p>
 <p class="soft lu83-credit">${skyEsc112(gTfn('Fact source: {src}.',{src:src}))}</p>
 </div>`;
}

// Wrap Look Up star friends so new animals work, and Arneb is labeled.
if(typeof luStarOpen111==='function'){
 const prevOpen=luStarOpen111;
 luStarOpen111=function(id){
  if(id&&id!=='list'&&!skyMeta112(id))return;
  if(typeof LU83==='object'){LU83.star111=id||'list';LU83.story101=null;LU83.sky112=false}
  skySfx112();
  if(typeof luRender83==='function')luRender83();
  window.scrollTo(0,0);
 };
}
if(typeof luStarNav111==='function'){luStarNav111=skyStarNav112}
if(typeof luStarHTML111==='function'){luStarHTML111=skyStarHTML112}
if(typeof luStarTileArt111==='function'){luStarTileArt111=skyTileArt112}
if(typeof starFigureSVG111==='function'){
 const prevFig=starFigureSVG111;
 starFigureSVG111=function(id,opt){
  const html=prevFig.apply(this,arguments);
  opt=opt||{};
  if(id!=='lep'||!opt.labels||!html||/Arneb/.test(html))return html;
  try{
   const data=typeof starFigureData111==='function'?starFigureData111('lep'):null;
   const s=data&&data.rows&&data.rows.find(r=>r.name==='Arneb');
   if(!s||typeof starMap111!=='function')return html;
   const W=opt.w||100,H=opt.h||100,pad=opt.pad||0;
   const p=starMap111(s,W,H,pad);
   const ink=opt.ink||'#f6efe0';
   const label=`<text x="${(p.x+4.2).toFixed(1)}" y="${(p.y-3.2).toFixed(1)}" font-size="${Math.max(5,W/28)}" fill="${ink}" opacity=".85">Arneb</text>`;
   return html.replace('</g>',label+'</g>');
  }catch(e){return html}
 };
}

{if(typeof luRender83==='function'){
 const prev=luRender83;
 luRender83=function(){
  if(typeof LU83==='object'&&LU83.sky112){
   const root=typeof $==='function'?$('lookup'):document.getElementById('lookup');
   if(!root)return prev.apply(this,arguments);
   root.innerHTML=skyHTML112();
   root.classList.add('luGrander101');
   skyBindSwipe112();
   return;
  }
  const r=prev.apply(this,arguments);
  const root=typeof $==='function'?$('lookup'):document.getElementById('lookup');
  if(!root)return r;
  if(typeof LU83==='object'&&LU83.star111)return r;
  if(!root.querySelector('[data-skynav112]')&&!root.querySelector('[data-sky112]')){
   const host=root.querySelector('[data-lustars111], [data-lustories101], .lu83-nav, .card:last-child')||root;
   host.insertAdjacentHTML('beforebegin',skyNavCard112());
  }
  return r;
 };
}}

function whatsNewText112(){
 return (typeof gT==='function'?gT: (s=>s))("Sky Tonight is ready in Look Up: a quiet window into the stars, tonight or far away in time. You can pick a city (nothing is sent away), see which animal figures are up, and keep a small sky diary on this device. The Moon and the wandering stars are drawn only for nights near our own time.");
}
function whatsNewAttach112(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root)return;
 const old=root.querySelector('[data-whatsnew101], [data-whatsnew111]');
 if(old){
  const p=old.querySelector('p');
  if(p)p.textContent=whatsNewText112();
  return;
 }
 if(root.querySelector('[data-whatsnew112]'))return;
 try{if(typeof LS==='object'&&LS.get&&LS.get('lamp_whatsnew112'))return}catch(e){}
 const html=`<div class="card whatsnew101" data-whatsnew112="1"><h2>${(typeof gT==='function'?gT("What's new"):"What's new")}</h2>
 <p>${whatsNewText112()}</p>
 <p><button type="button" class="p" onclick="whatsNewDismiss112()">${typeof gT==='function'?gT('OK'):'OK'}</button></p></div>`;
 root.insertAdjacentHTML('afterbegin',html);
}
function whatsNewDismiss112(){
 try{if(typeof LS==='object'&&LS.set)LS.set('lamp_whatsnew112','1')}catch(e){}
 const el=document.querySelector('[data-whatsnew112], [data-whatsnew111], [data-whatsnew101]');
 if(el)el.remove();
}
{if(typeof showImpl97==='function'){
 const prev=showImpl97;
 showImpl97=function(id){
  try{if(id!=='lookup'&&typeof LU83==='object')LU83.sky112=false}catch(e){}
  const r=prev.apply(this,arguments);
  try{if(id==='adults')whatsNewAttach112()}catch(e){}
  return r;
 };
}}
{const ra=typeof renderAdults==='function'?renderAdults:(typeof RENDER==='object'&&RENDER.adults);
 if(typeof ra==='function'){
  renderAdults=function(){const r=ra.apply(this,arguments);try{whatsNewAttach112();skyAdultNote112()}catch(e){}return r};
  if(typeof RENDER==='object')RENDER.adults=renderAdults;
 }
}
function skyAdultNote112(){
 const root=typeof $==='function'?$('adults'):document.getElementById('adults');
 if(!root||root.querySelector('[data-skyhelp112]'))return;
 const html=`<div class="card" data-skyhelp112="1"><h3>${skyT112('Sky Tonight','El cielo esta noche')}</h3>
 <p class="soft">${skyT112('Sky Tonight lives in Look Up. A city list is stored only on this device — there is no GPS, and the app does not go online for stars. The Moon and planets are hidden, with a gentle note, when the time slider leaves the years around our own era. Vega, at its closest around 14,000 CE, stays about 5 degrees from the pole and is not as close as Polaris is today. Scorpius is only partly visible from Utah. Zodiac figures are sky pictures only, not signs. The optional sky diary is a local list; clearing this site’s storage clears it.','El cielo esta noche vive en Mira arriba. La lista de ciudades se guarda solo en este aparato: no hay GPS, y la app no sale a la red a buscar estrellas. La Luna y los planetas se ocultan, con una nota suave, cuando la barra de tiempo deja los años de nuestra era. Vega, en su momento más cercano hacia el año 14 000, se queda a unos 5 grados del polo y no llega tan cerca como Polaris hoy. El Escorpión solo se ve en parte desde Utah. Las figuras del zodiaco son dibujos del cielo, no signos. El diario del cielo es una lista local; si se borra el almacenamiento de este sitio, también se borra.')}</p></div>`;
 root.insertAdjacentHTML('beforeend',html);
}

// Preload the packs once the page is idle so the first open is quick.
try{if(typeof requestIdleCallback==='function')requestIdleCallback(()=>skyLoad112().catch(()=>{}));else setTimeout(()=>skyLoad112().catch(()=>{}),800)}catch(e){}

// Expose a few helpers for seatbelt and the tour.
window.SkyTonightUI={UI112,SKY112,skyLoad112,skyOpen112,skyAnimalsUp112,skyNorthCopy112,skyAgesLabel112,skyPrecess112,skyInPlanetEra112,skyStillLight112,skyCivilToJD112,skyYearOf112,skyFigSVG112,skyDraw112,META112,ANIMAL_IDS112,whatsNewText112};
window.skyOpen112=skyOpen112;
window.skyClose112=skyClose112;
window.skySetCity112=skySetCity112;
window.skySetView112=skySetView112;
window.skySetSpan112=skySetSpan112;
window.skyPreset112=skyPreset112;
window.skySlideNight112=skySlideNight112;
window.skySlideAges112=skySlideAges112;
window.skyPick112=skyPick112;
window.skyDiarySave112=skyDiarySave112;
window.skyDiaryOpen112=skyDiaryOpen112;
window.skyDiaryClearOne112=skyDiaryClearOne112;
window.skyLoad112=skyLoad112;
window.UI112=UI112;
window.whatsNewDismiss112=whatsNewDismiss112;
window.skyTurtleMark112=skyTurtleMark112;
window.skyDraw112=skyDraw112;
window.skyCity112=skyCity112;
window.skyAnimalsUp112=skyAnimalsUp112;
window.skyNorthCopy112=skyNorthCopy112;
window.skyAgesLabel112=skyAgesLabel112;
window.skyYearOf112=skyYearOf112;
window.skyPrecess112=skyPrecess112;
window.skyTitle112=skyTitle112;
window.skyCivilToJD112=skyCivilToJD112;
window.skyRedraw112=skyRedraw112;

})();
