// v13: Spanish phase one. Original Spanish stories (adapted, not literal), Spanish letters (with Ñ, CH, LL), card words.
// Loaded only when the language is Spanish. Same story format as stories.js.
const ES_STORIES=[
{id:'es_p1',lvl:'Pre-K · Eco · mirar y decir',g:0.1,t:'Veo, veo',focus:'señalar palabras',text:`Veo, veo, veo el sol. ☀️
Veo, veo, un caracol. 🐌
Veo, veo, a mamá.
¡Mamá me ve y dice ya!`,hook:'Veo, veo, ¿qué ves tú?',coach:['Señala cada palabra al decirla.','Jueguen a "veo, veo" con cosas de la casa.'],q:[['¿Quién me ve?',['mamá','el sol','un gato'],0]]},
{id:'es_p2',lvl:'Pre-K · Eco · rima',g:0.12,t:'La luna',focus:'sonido mmm / rima',text:`Luna, lunita,
redonda y blanquita.
Mmm, mmm, la luna,
como no hay ninguna.`,hook:'Mmm, mmm, la luna.',coach:['Hagan "mmm" juntos y sientan la vibración en los labios.'],q:[['¿Cómo es la luna?',['redonda','cuadrada','azul'],0]]},
{id:'es_p3',lvl:'Pre-K · Eco · animales',g:0.15,t:'¿Quién hace muu?',focus:'sonidos de animales',text:`La vaca hace muu. 🐄
El gato hace miau. 🐱
El perro hace guau. 🐶
¿Y tú? ¡Hola, hola, hola!`,hook:'Muu, miau, guau.',coach:['Esperen a que el niño haga el sonido.'],q:[['¿Quién hace miau?',['el gato','la vaca','el perro'],0]]},
{id:'es_p4',lvl:'Pre-K · Eco · cuerpo',g:0.18,t:'Mis manitas',focus:'ritmo y palmas',text:`Mis manitas dan, dan, dan.
Mis piecitos van, van, van.
Mi naricita hace achís,
¡y me río muy feliz!`,hook:'Dan, dan, dan. Van, van, van.',coach:['Den palmas en cada "dan".'],q:[['¿Qué hacen los piecitos?',['van','duermen','comen'],0]]},
{id:'es_p5',lvl:'Pre-K · Eco · colores',g:0.2,t:'Colores',focus:'palabras de colores',text:`Rojo el tomate,
verde el limón,
amarillo el sol,
y azul el balón.`,hook:'Rojo, verde, amarillo, azul.',coach:['Busquen algo rojo en la casa.'],q:[['¿De qué color es el sol?',['amarillo','azul','rojo'],0]]},
{id:'es_k1',lvl:'K · Sílabas · ma me mi mo mu',g:0.3,t:'Mi mamá me mima',focus:'la M y sus sílabas',text:`Mi mamá me mima.
Mi mamá me ama.
Amo a mi mamá.
Mmm... ¡mamá!`,hook:'Ma, me, mi, mo, mu.',coach:['Lean la sílaba "ma" y luego la palabra.'],q:[['¿Quién me mima?',['mamá','el sol','el oso'],0]]},
{id:'es_k2',lvl:'K · Sílabas · pa pe pi po pu',g:0.35,t:'El pato Pepe',focus:'la P',text:`Pepe es un pato.
Pepe pisa el piso.
Pepe pía: pi, pi.
¡Pum! Pepe se cae al agua.`,hook:'Pa, pe, pi, po, pu.',coach:['Exagera la P con los labios: p-p-pato.'],q:[['¿Quién es Pepe?',['un pato','un perro','una pera'],0]]},
{id:'es_k3',lvl:'K · Palabras frecuentes · el, la, es, un, una',g:0.4,t:'Es un sol',focus:'palabras frecuentes',text:`El sol es grande.
La luna es blanca.
Es un gato.
Es una casa.
¡Es mi casa!`,hook:'El, la, es, un, una.',coach:['Busquen "es" en cada línea.'],q:[['¿Cómo es el sol?',['grande','blanco','chiquito'],0]]},
{id:'es_k4',lvl:'K · Rima · -ón',g:0.5,t:'El ratón y el botón',focus:'rimas',text:`Un ratón
encontró un botón.
Con el botón
hizo un balón.
¡Qué ratón tan juguetón!`,hook:'Ratón, botón, balón.',coach:['Pregunta: ¿qué otra palabra termina en -ón?'],q:[['¿Qué encontró el ratón?',['un botón','un queso','una casa'],0]]},
{id:'es_k5',lvl:'K · La Ñ · cuento corto',g:0.6,t:'El niño y la piña',focus:'la letra Ñ',text:`Un niño pequeño
tiene una piña.
La piña es para su amiga,
una niña muy risueña.
Ñam, ñam, ¡qué rica!`,hook:'Ña, ñe, ñi, ño, ñu. ¡Ñam!',coach:['La Ñ suena como "ny". Practiquen "ñam ñam".'],q:[['¿Qué tiene el niño?',['una piña','un perro','un libro'],0]]},
{id:'es_k6',lvl:'K · CH y LL · cuento',g:0.75,t:'La lluvia y el chocolate',focus:'CH y LL',text:`Llueve, llueve en la calle.
La llave abre la puerta.
Chema llega mojado.
Mamá le da chocolate.
¡Chocolate calientito!`,hook:'Llueve, llueve. ¡Chocolate!',coach:['LL suena como "y". CH suena como en "chocolate".'],q:[['¿Qué le da mamá a Chema?',['chocolate','una llave','agua'],0]]},
{id:'es_k7',lvl:'K · Ciencia suave',g:0.85,t:'La semilla',focus:'palabras frecuentes: la, es, y',text:`La semilla es chiquita.
Le doy agua y sol.
Sale una hoja. Sale otra.
¡Mira! Es una flor.`,hook:'Agua y sol, ¡y sale una flor!',coach:['Pregunta: ¿qué necesita la semilla?'],q:[['¿Qué necesita la semilla?',['agua y sol','dulces','zapatos'],0]]},
{id:'es_11',lvl:'Grado 1 · Aventura',g:1.1,t:'Dot, la zorrita, y la caja roja',focus:'secuencia: primero, luego, al final',text:`Primero, Dot la zorrita vio una caja roja.
Luego, la empujó con la nariz. ¡No se abrió!
Después llamó a su amigo el oso.
El oso tiró de un lado, y Dot del otro.
Al final, la caja se abrió... ¡y salió un globo azul!`,hook:'Primero, luego, al final.',coach:['Cuenten el cuento con los dedos: primero, luego, al final.'],q:[['¿Qué salió de la caja?',['un globo azul','un pez','un zapato'],0],['¿Quién ayudó a Dot?',['el oso','el gato','la luna'],0]]},
{id:'es_12',lvl:'Grado 1 · Rima y ritmo',g:1.3,t:'El sapo saltarín',focus:'rima y fluidez',text:`Un sapo saltarín
salta en el jardín.
Salta en la flor,
salta con calor,
salta hasta el fin
del gran jardín. ¡Plin!`,hook:'Salta, salta, ¡plin!',coach:['Léanlo dos veces: la segunda, más rápido y con ritmo.'],q:[['¿Dónde salta el sapo?',['en el jardín','en la luna','en el mar'],0]]},
{id:'es_13',lvl:'Grado 1 · Ciencia · el cielo',g:1.5,t:'¿Por qué brillan las estrellas?',focus:'causa y efecto',text:`De noche, miro el cielo.
Veo puntitos de luz. Son estrellas.
Las estrellas son soles muy, muy lejos.
Por eso se ven chiquitas.
¡Nuestro sol también es una estrella!`,hook:'Cada estrella es un sol.',coach:['Salgan a ver el cielo esta noche si se puede.'],q:[['¿Qué son las estrellas?',['soles muy lejos','luces de la casa','luciérnagas'],0]]},
{id:'es_14',lvl:'Grado 1 · Familia',g:1.7,t:'Las tortillas de la abuela',focus:'detalles',text:`La abuela hace tortillas en la mañana.
Mezcla la masa, la aplana con las manos,
y la pone en el comal caliente.
La tortilla se infla como un globo.
¡Puf! Todos se ríen y comen juntos.`,hook:'Masa, manos, comal, ¡puf!',coach:['Pregunta qué comida especial hace su familia.'],q:[['¿Dónde pone la abuela la tortilla?',['en el comal','en el río','en la cama'],0]]},
{id:'es_21',lvl:'Grado 2 · Misterio',g:2.1,t:'¿Quién se comió las galletas?',focus:'pistas',text:`Había seis galletas en el plato. Ahora hay tres.
Pista uno: hay migas cerca de la ventana.
Pista dos: hay plumas en el piso.
Pista tres: afuera se oye "pío, pío".
Lucía sonríe. "¡Fue un pajarito!"
Desde ese día, deja migas para él en el jardín.`,hook:'Pista por pista, la verdad se ve.',coach:['Paren en la pista tres y dejen que adivine.'],q:[['¿Quién se comió las galletas?',['un pajarito','el perro','Lucía'],0],['¿Qué pista había en el piso?',['plumas','agua','hojas'],0]]},
{id:'es_22',lvl:'Grado 2 · Utah · naturaleza',g:2.3,t:'Los arcos de piedra',focus:'vocabulario',text:`En Utah hay arcos de piedra roja.
El viento y el agua los tallaron muy despacio,
durante miles y miles de años.
Al atardecer, la piedra brilla como fuego.
De noche, el cielo se llena de estrellas.`,hook:'Viento, agua y tiempo hacen arcos.',coach:['Busquen una foto de Arches con el niño.'],q:[['¿Quién talló los arcos?',['el viento y el agua','un gigante','las personas'],0]]},
{id:'es_23',lvl:'Grado 2 · Humor',g:2.5,t:'El perro que quería volar',focus:'personajes y sentimientos',text:`Toto el perro miraba a los pájaros todo el día.
"Yo también quiero volar", dijo.
Saltó desde una caja. ¡Plaf! Cayó en el pasto.
Saltó desde un tronco. ¡Plaf! Cayó en el lodo.
Entonces llegó el viento y se llevó su papalote.
Toto corrió detrás, y con las orejas al aire,
¡sintió que volaba!`,hook:'¡Plaf! ¡Plaf! ¡A volar!',coach:['Pregunta: ¿cómo se sentía Toto al final?'],q:[['¿Qué quería Toto?',['volar','nadar','dormir'],0]]},
{id:'es_24',lvl:'Grado 2 · Ciencia',g:2.7,t:'El arcoíris',focus:'causa y efecto',text:`Después de la lluvia, sale el sol.
La luz del sol pasa por las gotitas de agua.
Las gotitas separan la luz en colores:
rojo, naranja, amarillo, verde, azul y violeta.
¡Así nace un arcoíris!
Si mezclas todos los colores de luz, vuelves a tener luz blanca.`,hook:'Sol más lluvia, ¡arcoíris!',coach:['Hagan un arcoíris con una manguera o un vaso de agua al sol.'],q:[['¿Qué necesitas para un arcoíris?',['sol y gotitas de agua','nieve','una lámpara'],0]]},
];
const ES_ECHO=[
{id:'es_e1',t:'Hola, hola',kind:'Tú dices, yo digo',lines:['¡Ho-la, ho-la!','¿Có-mo es-tás?','¡Ho-la, ho-la!','¡Te veo ya!'],tip:'Cara a cara, despacio y cantando. Esperen su turno: cualquier sonido cuenta.'},
{id:'es_e2',t:'Aserrín, aserrán',kind:'Rima tradicional',lines:['A-se-rrín, a-se-rrán,','los ma-de-ros de San Juan,','pi-den pan, no les dan,','pi-den que-so, les dan hue-so.'],tip:'Mézanse juntos al ritmo, hacia adelante y hacia atrás.'},
{id:'es_e3',t:'Pon, pon',kind:'Palmas',lines:['Pon, pon, pon,','el de-di-to en el bo-tón.','Tor-ti-tas, tor-ti-tas,','pa-ra ma-má que es bo-ni-ta.'],tip:'Toquen la palma con el dedito y luego hagan tortitas con las manos.'},
{id:'es_e4',t:'Duérmete, lunita',kind:'Arrullo',lines:['Duér-me-te, lu-ni-ta,','duér-me-te ya,','que las es-tre-lli-tas','te cui-da-rán.'],tip:'Voz baja y lenta para calmarse antes de dormir.'},
];
// [Letter, syllable sound, word, word]
const ES_LETTERS=[['A','a','abeja','árbol'],['B','ba','ballena','barco'],['C','ca','casa','conejo'],['CH','cha','chocolate','chile'],['D','da','dedo','dado'],['E','e','elefante','estrella'],['F','fa','foca','flor'],['G','ga','gato','gusano'],['H','','hilo','helado'],['I','i','iglú','isla'],['J','ja','jirafa','jugo'],['K','ka','koala','kiwi'],['L','la','luna','león'],['LL','lla','llave','lluvia'],['M','ma','mamá','mano'],['N','na','nube','nido'],['Ñ','ña','ñandú','piña'],['O','o','oso','ojo'],['P','pa','pato','pera'],['Q','que','queso','quince'],['R','rra','ratón','rosa'],['S','sa','sol','sapo'],['T','ta','tortuga','taza'],['U','u','uva','uno'],['V','va','vaca','vela'],['W','ua','wafle','kiwi'],['X','ks','xilófono','taxi'],['Y','ya','yoyó','yema'],['Z','za','zapato','zorro']];
const ES_CARDS={cat:'gato',dog:'perro',fish:'pez',bee:'abeja',owl:'búho',duck:'pato',bed:'cama',cup:'taza',lamp:'lámpara',door:'puerta',book:'libro',moon:'luna',sun:'sol',star:'estrella',cloud:'nube',rain:'lluvia',apple:'manzana',egg:'huevo',milk:'leche',bread:'pan',pear:'pera',hand:'mano',foot:'pie',eye:'ojo',nose:'nariz',ear:'oreja',happy:'feliz',sad:'triste',calm:'tranquilo',mad:'enojado',love:'amor'};
