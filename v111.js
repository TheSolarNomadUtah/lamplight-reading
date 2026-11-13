/* v111: Star Friends / Amigos de las estrellas.
   Dragon and Phoenix companions (v101 rules). Every companion's last
   stage traces a real constellation or asterism, slowly, with no flash,
   and still if reduced motion. Look Up gains a Star friends view.
   The five post-v83 Lamp effects keep their names and stay fully open,
   drawn a little richer and calmer. No new audio files. Do not wrap show(). */
const FIGS111={
 dra:{"stars":[[87585,"Grumium",3.73,0.197,0.7801,0.182],[87833,"Eltanin",2.24,0.1519,0.9078,0.361],[85670,"Rastaban",2.79,0.2538,0.9061,0.281],[85829,"\u03bd\u00b2 Dra",4.86,0.2589,0.8346,0.12],[94376,"Altais",3.07,0.0948,0.4574,0.247],[97433,"\u03b5 Dra",3.84,0.069,0.3589,0.173],[94648,"\u03c4 Dra",4.45,0.1657,0.339,0.131],[89937,"\u03c7 Dra",3.55,0.2447,0.398,0.198],[83895,"Aldhibah",3.17,0.3572,0.592,0.236],[80331,"Athebyne",2.73,0.4762,0.6888,0.288],[78527,"\u03b8 Dra",4.01,0.552,0.749,0.16],[75458,"Edasich",3.29,0.6613,0.7107,0.223],[68756,"Thuban",3.67,0.8058,0.486,0.187],[61281,"\u03ba Dra",3.85,0.8568,0.2277,0.172],[56211,"Giausar",3.82,0.931,0.0922,0.175]],"lines":[[0,1],[1,2],[2,3],[3,0],[0,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14]],"official":true,"vis":"circumpolar","span":44.9},
 phe:{"stars":[[5348,"Wurren",3.94,0.4525,0.8016,0.165],[5165,"\u03b2 Phe",3.32,0.4609,0.3936,0.22],[2072,"\u03ba Phe",3.93,0.8017,0.264,0.166],[7083,"\u03b4 Phe",3.93,0.2669,0.5172,0.166],[8837,"\u03c8 Phe",4.39,0.069,0.4103,0.134],[6867,"\u03b3 Phe",3.41,0.265,0.2417,0.211],[2081,"Ankaa",2.4,0.8082,0.1984,0.336],[765,"\u03b5 Phe",3.88,0.931,0.381,0.17]],"lines":[[0,1],[1,2],[2,0],[1,3],[3,4],[4,1],[1,5],[5,2],[2,6],[6,7],[7,2]],"official":true,"vis":"partial","span":18.0},
 lyr:{"stars":[[91262,"Vega",0.03,0.8134,0.069,1.0],[91971,"\u03b6\u00b9 Lyr",4.34,0.5997,0.2403,0.137],[92420,"Sheliak",3.52,0.4502,0.8392,0.2],[93194,"Sulafat",3.25,0.1866,0.931,0.227],[92791,"\u03b4\u00b2 Lyr",4.22,0.3266,0.3396,0.145]],"lines":[[0,1],[1,2],[2,3],[3,4],[4,1]],"official":true,"vis":"yes","span":7.6},
 noc:{"stars":[[67494,"89 Vir",4.96,0.931,0.2296,0.12],[70306,"51 Hya",4.78,0.5201,0.6864,0.12],[70753,"52 Hya",4.97,0.4633,0.7703,0.12],[71974,"4 Lib",5.7,0.3005,0.549,0.12],[72197,"54 Hya",5.15,0.27,0.5711,0.12],[72323,"55 Hya",5.61,0.2549,0.5802,0.12],[72357,"56 Hya",5.23,0.2512,0.603,0.12],[72378,"57 Hya",5.76,0.2494,0.6304,0.12],[72571,"Solitaire",4.42,0.2253,0.6954,0.132],[73714,"Brachium",3.25,0.069,0.5694,0.227]],"lines":[],"official":false,"vis":"yes","span":18.6},
 mus:{"stars":[[62322,"\u03b2 Mus",3.04,0.1958,0.3186,0.25],[57363,"\u03bb Mus",3.63,0.931,0.1851,0.191],[61199,"\u03b3 Mus",3.84,0.3641,0.8149,0.173],[61585,"\u03b1 Mus",2.69,0.306,0.4414,0.294],[63613,"\u03b4 Mus",3.61,0.069,0.7644,0.192],[59929,"\u03b5 Mus",4.06,0.5309,0.296,0.156]],"lines":[[0,1],[1,2],[2,3],[3,0]],"official":true,"vis":"no","span":8.3},
 cyg:{"stars":[[94779,"\u03ba Cyg",3.8,0.8882,0.1269,0.176],[95853,"\u03b9\u00b2 Cyg",3.76,0.8397,0.187,0.179],[97165,"Fawaris",2.86,0.7897,0.3887,0.272],[100453,"Sadr",2.23,0.6016,0.5367,0.363],[102098,"Deneb",1.25,0.5063,0.3906,0.57],[102488,"Aljanah",2.48,0.4588,0.7103,0.324],[104732,"\u03b6 Cyg",3.21,0.2826,0.8036,0.231],[107310,"\u03bc\u00b9 Cyg",4.49,0.069,0.8171,0.128],[98110,"\u03b7 Cyg",3.89,0.7516,0.6793,0.169],[95947,"Albireo",3.05,0.931,0.8731,0.249]],"lines":[[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[6,7],[3,8],[8,9]],"official":true,"vis":"yes","span":36.4},
 del:{"stars":[[101421,"Aldulfin",4.03,0.7918,0.931,0.158],[101769,"Rotanev",3.64,0.5999,0.3431,0.19],[101958,"Sualocin",3.77,0.5095,0.108,0.179],[102532,"\u03b3\u00b2 Del",4.27,0.2082,0.069,0.142],[102281,"\u03b4 Del",4.43,0.3448,0.2574,0.132]],"lines":[[0,1],[1,2],[2,3],[3,4],[4,1]],"official":true,"vis":"yes","span":5.8},
 lep:{"stars":[[28910,"\u03b8 Lep",4.67,0.069,0.3745,0.12],[28103,"\u03b7 Lep",3.71,0.2097,0.3238,0.184],[27288,"Darlugal",3.55,0.3477,0.3599,0.198],[25985,"Arneb",2.58,0.5527,0.5363,0.309],[24305,"Bade",3.29,0.8356,0.4432,0.223],[27654,"\u03b4 Lep",3.76,0.2936,0.7228,0.179],[27072,"\u03b3 Lep",3.59,0.391,0.8145,0.194],[25606,"Nihal",2.81,0.6155,0.7115,0.278],[23685,"Ping",3.19,0.931,0.8157,0.233],[24845,"\u03bb Lep",4.29,0.7431,0.261,0.141],[24327,"\u03ba Lep",4.36,0.8357,0.2483,0.136],[24244,"\u03b9 Lep",4.45,0.8508,0.1843,0.131],[24873,"\u03bd Lep",5.29,0.7379,0.2095,0.12]],"lines":[[0,1],[1,2],[2,3],[3,4],[3,5],[5,6],[6,7],[7,8],[3,7],[4,9],[4,10],[8,4],[10,11],[9,12]],"official":true,"vis":"yes","span":16.2},
 umi:{"stars":[[11767,"Polaris",1.97,0.4508,0.069,0.409],[85822,"Yildun",4.35,0.3916,0.2438,0.137],[82080,"\u03b5 UMi",4.21,0.3678,0.4565,0.146],[77055,"\u03b6 UMi",4.29,0.4658,0.662,0.141],[79822,"\u03b7 UMi",4.95,0.3729,0.7491,0.12],[75097,"Pherkad",3.0,0.5513,0.931,0.255],[72607,"Kochab",2.07,0.6322,0.8085,0.391]],"lines":[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],"official":true,"vis":"circumpolar","span":18.9},
};

const STAR_CREDIT111='Star places and brightness come from a small copy of the HYG Star Database (v4.4, Astronomy Nexus), used under CC BY-SA 4.0. https://creativecommons.org/licenses/by-sa/4.0/ Positions are for the year 2000. The stick-figure lines follow the Stellarium modern star pictures. The app does not go online to fetch stars.';
const STAR_CREDIT_ES111='Los lugares y el brillo de las estrellas salen de una copia pequeña de la base HYG (v4.4, Astronomy Nexus), usada bajo CC BY-SA 4.0. https://creativecommons.org/licenses/by-sa/4.0/ Las posiciones son del año 2000. Las líneas de las figuras siguen los dibujos modernos de Stellarium. La app no sale a buscar estrellas en internet.';

const STAR_META111={
 dra:{id:'dra',kind:'dragon',en:'Draco, the Dragon',es:'Draco, el Dragón',
  fact_en:'A star in the Dragon called Thuban used to be the North Star, back when the pyramids were built.',
  fact_es:'Una estrella del Dragón llamada Thuban fue la Estrella Polar, en la época en que se construyeron las pirámides.',
  vis_en:'Circumpolar from Cache County, Utah: every star stays above the horizon all night, every night.',
  vis_es:'Circumpolar desde el condado de Cache, Utah: cada estrella se queda por encima del horizonte toda la noche, todas las noches.',
  src:'HYG v4.4; Earth precession (Thuban as past pole star, ~2700–2600 BCE)'},
 phe:{id:'phe',kind:'phoenix',en:'Phoenix',es:'Fénix',
  fact_en:'Ankaa, the Phoenix’s brightest star, shines a warm orange color.',
  fact_es:'Ankaa, la estrella más brillante del Fénix, brilla con un color naranja cálido.',
  vis_en:'From Cache County, Utah, the Phoenix is only partly visible. Ankaa stays very low in the south — about 6° up, and only barely. Wurren and Delta Phoenicis never rise here. You may see Ankaa low in the south on autumn evenings, if the horizon is clear and dark.',
  vis_es:'Desde el condado de Cache, Utah, el Fénix solo se ve en parte. Ankaa se queda muy baja en el sur, a unos 6°, y apenas se asoma. Wurren y Delta Phoenicis no salen aquí. Puedes ver Ankaa baja en el sur en las tardes de otoño, si el horizonte está despejado y oscuro.',
  story_en:'Old stories say a phoenix is reborn from ashes. That is a story people told, not something that happens in the real sky.',
  story_es:'Los cuentos viejos dicen que un fénix renace de las cenizas. Eso es una historia que la gente contaba, no algo que ocurra en el cielo de verdad.',
  src:'HYG v4.4; IAU constellation Phoenix; Ankaa is a K-type orange giant (V = 2.40); Utah visibility from Pi’s field (Ankaa culminates at 6.0°)'},
 lyr:{id:'lyr',kind:'turtle',en:'Lyra, the Lyre',es:'Lira',
  fact_en:'Vega is the brightest star in the Lyre, and it is much hotter and bluer than our Sun.',
  fact_es:'Vega es la estrella más brillante de la Lira, y es mucho más caliente y más azul que nuestro Sol.',
  vis_en:'Visible from Cache County, Utah, well placed. Vega culminates almost overhead.',
  vis_es:'Se ve desde el condado de Cache, Utah, bien situada. Vega culmina casi por encima.',
  story_en:'In the old Greek story, Hermes made the first lyre from a tortoise shell.',
  story_es:'En el cuento griego antiguo, Hermes hizo la primera lira con el caparazón de una tortuga.',
  src:'HYG v4.4 (Vega = Alpha Lyrae, mag 0.03, A0V); Homeric Hymn to Hermes (old story, told separately)'},
 mus:{id:'mus',kind:'moth',en:'Musca, the Fly',es:'Mosca',
  fact_en:'Musca means “the Fly,” and its stars are so far south that they never rise over Utah.',
  fact_es:'Musca significa “la Mosca”, y sus estrellas están tan al sur que nunca salen sobre Utah.',
  vis_en:'Never visible from Cache County, Utah. You’d need to travel far south to see it.',
  vis_es:'Nunca se ve desde el condado de Cache, Utah. Tendrías que viajar muy al sur para verla.',
  story_en:'There is no moth in the sky, but its little cousin the fly, Musca, is there.',
  story_es:'No hay una polilla en el cielo, pero sí está su prima pequeña, la mosca, Musca.',
  src:'HYG v4.4; IAU constellation Musca (Latin musca = fly)'},
 noc:{id:'noc',kind:'owl',en:'Noctua, the Owl',es:'Noctua, el búho',
  fact_en:'These stars were once drawn as a little owl sitting on the tail of the Water Snake.',
  fact_es:'Estas estrellas alguna vez se dibujaron como un búho pequeño sentado en la cola de la Serpiente de agua.',
  vis_en:'Visible from Cache County, Utah, low in the southern sky.',
  vis_es:'Se ve desde el condado de Cache, Utah, baja en el cielo del sur.',
  caption_en:'Old star maps drew an owl here',
  caption_es:'Los mapas antiguos dibujaban un búho aquí',
  story_en:'Noctua is not an official constellation today, so this picture shows the real stars and a soft owl outline, with no made-up lines between them. One of these stars is now named Solitaire, in memory of the older bird on the map.',
  story_es:'Noctua hoy no es una constelación oficial, así que este dibujo muestra las estrellas de verdad y un contorno suave de búho, sin líneas inventadas entre ellas. Una de estas estrellas ahora se llama Solitaire, en memoria del ave de aquellos mapas.',
  src:'Jamieson, A Celestial Atlas (1822), Plate 27; Burritt 19th-c. atlases; Ian Ridpath, Star Tales; HYG v4.4; IAU WGSN 2024 name Solitaire (58 Hya)'},
 ncr:{id:'ncr',kind:'lamp',en:'The Northern Cross',es:'La Cruz del Norte',
  fact_en:'The Northern Cross is the bright heart of Cygnus, the Swan. Deneb marks the tail, and Albireo marks the head.',
  fact_es:'La Cruz del Norte es el corazón brillante de Cisne. Deneb marca la cola, y Albireo marca la cabeza.',
  vis_en:'Visible from Cache County, Utah, well placed. Deneb culminates almost overhead.',
  vis_es:'Se ve desde el condado de Cache, Utah, bien situada. Deneb culmina casi por encima.',
  src:'HYG v4.4; asterism drawn from the Cygnus stars and Stellarium modern line segments in Professor Pi’s table'},
 cyg:{id:'cyg',kind:'',en:'Cygnus, the Swan',es:'Cisne',
  fact_en:'Deneb, the bright star at the Swan’s tail, is so far away that its light takes more than a thousand years to reach us.',
  fact_es:'Deneb, la estrella brillante en la cola del Cisne, está tan lejos que su luz tarda más de mil años en llegarnos.',
  vis_en:'Visible from Cache County, Utah, well placed.',
  vis_es:'Se ve desde el condado de Cache, Utah, bien situada.',
  src:'HYG v4.4; IAU constellation Cygnus; Deneb distance typically cited well above 1,000 light-years'},
 del:{id:'del',kind:'',en:'Delphinus, the Dolphin',es:'Delfín',
  fact_en:'Two of the Dolphin’s stars are named Sualocin and Rotanev — that is the astronomer Nicolaus Venator’s name written backwards.',
  fact_es:'Dos de las estrellas del Delfín se llaman Sualocin y Rotanev: es el nombre del astrónomo Nicolaus Venator escrito al revés.',
  vis_en:'Visible from Cache County, Utah, well placed.',
  vis_es:'Se ve desde el condado de Cache, Utah, bien situada.',
  src:'HYG v4.4; IAU constellation Delphinus; Palermo Catalogue 1814 (Niccolò Cacciatore / Nicolaus Venator)'},
 lep:{id:'lep',kind:'',en:'Lepus, the Hare',es:'Liebre',
  fact_en:'The Hare sits just under the feet of Orion the Hunter, and its brightest star is named Arneb.',
  fact_es:'La Liebre está justo bajo los pies de Orión el Cazador, y su estrella más brillante se llama Arneb.',
  vis_en:'Visible from Cache County, Utah, low in the southern sky.',
  vis_es:'Se ve desde el condado de Cache, Utah, baja en el cielo del sur.',
  src:'HYG v4.4; IAU constellation Lepus (under Orion)'},
 umi:{id:'umi',kind:'',en:'Ursa Minor, the Little Bear',es:'Osa Menor',
  fact_en:'Polaris, the North Star, sits at the end of the Little Dipper’s handle and stays almost still while the rest of the sky turns.',
  fact_es:'Polaris, la Estrella Polar, está al final del mango del Carro Chico y se queda casi quieta mientras el resto del cielo gira.',
  vis_en:'Circumpolar from Cache County, Utah: every star stays above the horizon all night, every night.',
  vis_es:'Circumpolar desde el condado de Cache, Utah: cada estrella se queda por encima del horizonte toda la noche, todas las noches.',
  src:'HYG v4.4 (Polaris, dec +89.26°); apparent sky rotation around the north celestial pole'}
};
const FRIEND_FIG111={dragon:'dra',phoenix:'phe',turtle:'lyr',moth:'mus',owl:'noc',lamp:'ncr'};
const STAR_FRIEND_IDS111=['cyg','del','lep','umi','dra','phe','lyr','mus','noc'];

function starLang111(){return (typeof LANG==='string'&&LANG==='es')?'es':'en'}
function starCredit111(){return starLang111()==='es'?STAR_CREDIT_ES111:STAR_CREDIT111}
function starTitle111(id){const m=STAR_META111[id];return m?(starLang111()==='es'?m.es:m.en):id}
function starFact111(id){const m=STAR_META111[id];return m?(starLang111()==='es'?m.fact_es:m.fact_en):''}
function starSrc111(id){return (STAR_META111[id]&&STAR_META111[id].src)||''}

function starReduce111(opt){
 if(opt&&opt.reduce!=null)return !!opt.reduce;
 if(typeof lampReduced73==='function')return !!lampReduced73();
 try{return !!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}
}

function starVis111(id){const m=STAR_META111[id];if(!m)return '';return starLang111()==='es'?(m.vis_es||''):(m.vis_en||'')}
function starStory111(id){const m=STAR_META111[id];if(!m)return '';return starLang111()==='es'?(m.story_es||''):(m.story_en||'')}
function starCaption111(id){const m=STAR_META111[id];if(!m)return '';return starLang111()==='es'?(m.caption_es||''):(m.caption_en||'')}
/* Northern Cross: crop of Cygnus stars and Stellarium line segments already in Pi’s table. */
function starNcrFig111(){
 const fig=FIGS111.cyg;if(!fig)return null;
 const hips=[102098,100453,98110,95947,97165,102488];
 const rows=fig.stars.filter(s=>hips.indexOf(s[0])>=0);
 if(rows.length<5)return null;
 const xs=rows.map(s=>s[3]),ys=rows.map(s=>s[4]);
 const minx=Math.min.apply(null,xs),maxx=Math.max.apply(null,xs),miny=Math.min.apply(null,ys),maxy=Math.max.apply(null,ys);
 const pad=0.12,dx=maxx-minx||1,dy=maxy-miny||1,sc=(1-2*pad)/Math.max(dx,dy),cx=(minx+maxx)/2,cy=(miny+maxy)/2;
 const stars=rows.map(s=>[s[0],s[1],s[2],+(0.5+(s[3]-cx)*sc).toFixed(4),+(0.5+(s[4]-cy)*sc).toFixed(4),s[5]]);
 const idx={};stars.forEach((s,i)=>{idx[s[0]]=i});
 const segs=[[102098,100453],[100453,98110],[98110,95947],[97165,100453],[100453,102488]];
 return {stars,lines:segs.map(([a,b])=>[idx[a],idx[b]]),official:true,vis:'yes'};
}
function starFigureData111(id){
 const fig=id==='ncr'?starNcrFig111():FIGS111[id];
 if(!fig||!fig.stars||!fig.stars.length)return null;
 const rows=fig.stars.map(s=>({hip:s[0],name:s[1],mag:s[2],x:s[3],y:s[4],size:s[5]}));
 return {id,rows,lines:fig.lines||[],official:fig.official!==false,vis:fig.vis};
}
function starOwlOutline111(rows,W,H,pad,ink,showCap){
 const map=(x,y)=>starMap111({x,y,size:1},W,H,pad);
 const h=map(0.90,0.26),body=map(0.33,0.64);
 const tu1=map(0.84,0.14),tu2=map(0.98,0.14);
 const wr=Math.max(10,W*0.11),hr=Math.max(8,H*0.09);
 const brx=Math.max(18,W*0.28),bry=Math.max(14,H*0.18);
 const cap=showCap?starCaption111('noc'):'';
 const fs=Math.max(6,W/22);
 const label=cap?`<text x="${(W*0.08).toFixed(1)}" y="${(H*0.08).toFixed(1)}" font-size="${fs}" fill="${ink}" opacity=".8">${esc(cap)}</text>`:'';
 return `<g class="starOwl111" fill="none" stroke="${ink}" stroke-width="${Math.max(1.1,W/90).toFixed(2)}" opacity=".38" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="${h.x.toFixed(1)}" cy="${h.y.toFixed(1)}" rx="${wr.toFixed(1)}" ry="${hr.toFixed(1)}"/>
  <path d="M${(h.x-wr*0.35).toFixed(1)} ${(h.y-hr*0.7).toFixed(1)} L${tu1.x.toFixed(1)} ${tu1.y.toFixed(1)} L${(h.x-wr*0.05).toFixed(1)} ${(h.y-hr*0.5).toFixed(1)}"/>
  <path d="M${(h.x+wr*0.05).toFixed(1)} ${(h.y-hr*0.5).toFixed(1)} L${tu2.x.toFixed(1)} ${tu2.y.toFixed(1)} L${(h.x+wr*0.4).toFixed(1)} ${(h.y-hr*0.65).toFixed(1)}"/>
  <path d="M${h.x.toFixed(1)} ${(h.y+hr).toFixed(1)} Q${((h.x+body.x)/2).toFixed(1)} ${((h.y+body.y)/2-H*0.04).toFixed(1)} ${body.x.toFixed(1)} ${(body.y-bry*0.7).toFixed(1)}"/>
  <ellipse cx="${body.x.toFixed(1)}" cy="${body.y.toFixed(1)}" rx="${brx.toFixed(1)}" ry="${bry.toFixed(1)}"/>
 </g>${label}`;
}
function starMap111(s,W,H,pad){
 const inner=Math.max(0,Math.min(W,H)-2*pad);
 const ox=(W-inner)/2,oy=(H-inner)/2;
 return {x:ox+s.x*inner,y:oy+s.y*inner};
}
function starRad111(size,W,scale){const s=Math.min(Number(size)||0.2,0.46);return Math.max(0.85,(W/26)*s*(scale||1))}

/* Build an SVG of a constellation from Professor Pi's 0..1 coordinates
   (gnomonic, east left, north up). Lines trace slowly unless reduced motion.
   Noctua has no official lines — stars only. */
function starFigureSVG111(id,opt){
 opt=opt||{};
 const data=starFigureData111(id);if(!data)return '';
 const W=opt.w||100,H=opt.h||100,pad=opt.pad||0;
 const reduce=starReduce111(opt);
 const ink=opt.ink||'#f6efe0',line=opt.line||'#e6b454';
 const pos={};
 data.rows.forEach((s,i)=>{pos[i]=starMap111(s,W,H,pad)});
 const nL=data.lines.length,step=nL?Math.min(1.1,7/nL):0;
 const lines=data.lines.map((pair,i)=>{
  const a=pos[pair[0]],b=pos[pair[1]];if(!a||!b)return '';
  const d='M'+a.x.toFixed(2)+' '+a.y.toFixed(2)+' L'+b.x.toFixed(2)+' '+b.y.toFixed(2);
  const delay=reduce?0:(i*step);
  return `<path class="starLine111" pathLength="1" d="${d}" stroke="${line}" stroke-width="${opt.sw||1.35}" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:${delay}s"/>`;
 }).join('');
 const stars=data.rows.map((s,i)=>{
  const p=pos[i];if(!p)return '';
  const r=starRad111(s.size,W,opt.scale);
  const label=opt.labels&&s.name&&s.mag<=2.5?`<text x="${(p.x+4.2).toFixed(1)}" y="${(p.y-3.2).toFixed(1)}" font-size="${Math.max(5,W/28)}" fill="${ink}" opacity=".85">${esc(s.name)}</text>`:'';
  return `<circle class="starDot111" cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${r.toFixed(2)}" fill="${ink}" stroke="none"/>${label}`;
 }).join('');
 const owl=id==='noc'?starOwlOutline111(data.rows,W,H,pad,ink,!!(opt.labels||opt.caption||W>=180)):'';
 const cls='starTrace111'+(reduce?' reduce111':'');
 const bg=opt.sky?`<rect width="${W}" height="${H}" fill="${opt.sky}" rx="${opt.rx||0}"/>`:'';
 return `<g class="${cls}" data-starfig="${id}" data-reduce="${reduce?'1':'0'}" data-lines="${nL}" view-w="${W}" view-h="${H}">${bg}${owl}${lines}${stars}</g>`;
}

function starSkySVG111(id,opt){
 opt=opt||{};
 const W=opt.w||200,H=opt.h||200;
 const reduce=starReduce111(opt);
 const inner=starFigureSVG111(id,{w:W,h:H,pad:opt.pad||22,labels:!!opt.labels,reduce,scale:opt.scale||1.15,sw:opt.sw||1.7,sky:'#120e18',ink:'#f6efe0',line:'#e6b454',rx:opt.rx||0});
 return `<svg class="starSky111" viewBox="0 0 ${W} ${H}" width="${opt.width||W}" height="${opt.height||H}" role="img" aria-label="${esc(starTitle111(id))}">${inner}</svg>`;
}

function starStillCheck111(root){
 if(!root||!root.querySelector)return {ok:false};
 const g=root.querySelector('.starTrace111')||(root.classList&&root.classList.contains('starTrace111')?root:null);
 if(!g)return {ok:false,missing:true};
 const reduce=g.classList.contains('reduce111')||g.getAttribute('data-reduce')==='1';
 const lines=[...g.querySelectorAll('path.starLine111')];
 const flashes=[...g.querySelectorAll('[style*="blink"], .flash, .strobe')];
 let animating=0;
 lines.forEach(p=>{
  try{
   const cs=getComputedStyle(p);
   const name=(cs.animationName||'')+' '+(cs.getPropertyValue('animation-name')||'');
   if(!reduce&&name&&!/none/i.test(name))animating++;
   if(reduce&&name&&!/none/i.test(name)&&!/^\s*$/.test(name.replace(/none/gi,'')))animating++;
  }catch(e){}
 });
 return {ok:reduce?animating===0&&flashes.length===0:flashes.length===0,reduce,lines:lines.length,animating,flashes:flashes.length};
}

/* ---------- Companion art: Dragon and Phoenix ---------- */
function pal111(){try{if(typeof lampPal101==='function')return lampPal101()}catch(e){}return{mid:'#e6b454',core:'#ffe4a4',tip:'#fff6d8',deep:'#855a00'}}
function ink111(){return '#72583f'}

function dragonArt111(stage){
 const pal=pal111(),line=ink111(),s=Math.max(1,Math.min(6,stage||1));
 const mid=pal.mid,core=pal.core,tip=pal.tip,deep=pal.deep;
 const scale='#7d9574',skin='#e8c894',belly='#f4e4c4';
 const puddle=`<ellipse cx="50" cy="88" rx="26" ry="5" fill="${mid}" opacity=".32"/>`;
 if(s===6)return starStageArt111('dra','dragon');
 if(s===1)return `${puddle}<ellipse cx="50" cy="62" rx="16" ry="20" fill="${skin}" stroke="${line}" stroke-width="2"/><path d="M42 54 Q50 70 58 54" fill="${scale}" stroke="${line}" stroke-width="1.1"/><path d="M46 50 Q50 46 54 50" fill="none" stroke="${line}" stroke-width="1.2"/>`;
 if(s===2)return `${puddle}<ellipse cx="52" cy="66" rx="18" ry="14" fill="${scale}" stroke="${line}" stroke-width="2"/><path d="M36 66 Q28 70 30 78" fill="${scale}" stroke="${line}" stroke-width="1.5"/><ellipse cx="38" cy="52" rx="10" ry="9" fill="${skin}" stroke="${line}" stroke-width="1.7"/><circle cx="34" cy="50" r="1.5" fill="${deep}" stroke="none"/><path d="M30 54 Q28 56 30 57" fill="none" stroke="${line}" stroke-width="1.1"/><path d="M58 58 Q70 48 68 40" fill="none" stroke="${line}" stroke-width="2.2"/>`;
 const wing=(x,flip)=>{const k=flip?-1:1;return `<path d="M${x} 52 Q${x+k*22} 36 ${x+k*18} 58 Q${x+k*8} 62 ${x} 56Z" fill="${scale}" stroke="${line}" stroke-width="1.5" opacity=".9"/>`};
 const head=(cx,cy)=>`<ellipse cx="${cx}" cy="${cy}" rx="11" ry="9" fill="${skin}" stroke="${line}" stroke-width="1.7"/><circle cx="${cx-3.5}" cy="${cy-1}" r="1.7" fill="${deep}" stroke="none"/><circle cx="${cx-4}" cy="${cy-1.6}" r=".5" fill="${tip}" stroke="none"/><path d="M${cx-10} ${cy+1} Q${cx-16} ${cy+2} ${cx-11} ${cy+4}" fill="${skin}" stroke="${line}" stroke-width="1.2"/><path d="M${cx-2} ${cy+7} Q${cx+2} ${cy+10} ${cx+6} ${cy+7}" fill="${belly}" stroke="${line}" stroke-width="1"/>`;
 if(s===3)return `${puddle}${wing(52,0)}<ellipse cx="54" cy="66" rx="20" ry="13" fill="${scale}" stroke="${line}" stroke-width="2"/><path d="M70 68 Q86 62 84 78" fill="${scale}" stroke="${line}" stroke-width="1.6"/>${head(36,54)}`;
 if(s===4)return `${puddle}${wing(48,0)}${wing(56,1)}<ellipse cx="52" cy="66" rx="22" ry="14" fill="${scale}" stroke="${line}" stroke-width="2"/><path d="M28 70 Q18 78 26 84 Q34 78 32 72" fill="${scale}" stroke="${line}" stroke-width="1.5"/><path d="M70 70 Q88 58 86 78 Q74 80 70 74" fill="${scale}" stroke="${line}" stroke-width="1.6"/>${head(34,50)}<path d="M44 66 Q52 72 62 66" fill="${belly}" stroke="${line}" stroke-width="1"/>`;
 const glow=`<ellipse cx="50" cy="58" rx="36" ry="28" fill="${mid}" opacity=".16" stroke="none"/>`;
 return `${puddle}${glow}${wing(46,0)}${wing(58,1)}<ellipse cx="52" cy="66" rx="23" ry="14" fill="${scale}" stroke="${line}" stroke-width="2.1"/><path d="M26 70 Q14 80 24 88 Q36 78 32 70" fill="${scale}" stroke="${line}" stroke-width="1.6"/><path d="M70 70 Q92 52 88 78 Q74 84 70 74" fill="${scale}" stroke="${line}" stroke-width="1.7"/><path d="M40 64 L50 58 L62 64" fill="none" stroke="${core}" stroke-width="1.1" opacity=".7"/>${head(32,48)}<path d="M44 66 Q52 74 64 66" fill="${belly}" stroke="${line}" stroke-width="1"/>`;
}

function phoenixArt111(stage){
 const pal=pal111(),line=ink111(),s=Math.max(1,Math.min(6,stage||1));
 const mid=pal.mid,core=pal.core,tip=pal.tip,deep=pal.deep;
 const clay='#d9b27a',down='#e8c894';
 /* Flame-test colors, kept soft: sodium yellow, copper green-blue, strontium red, potassium lilac. */
 const na='#e0c34a',cu='#3f9a8a',sr='#c45a4a',k='#a888c0';
 const puddle=`<ellipse cx="50" cy="88" rx="26" ry="5" fill="${mid}" opacity=".34"/>`;
 if(s===6)return starStageArt111('phe','phoenix');
 if(s===1)return `${puddle}<ellipse cx="50" cy="58" rx="16" ry="20" fill="${clay}" stroke="${line}" stroke-width="2.1"/><path d="M50 40 L52 62 L48 58Z" fill="${na}" stroke="${deep}" stroke-width=".8"/><ellipse cx="51" cy="52" rx="3" ry="7" fill="${core}" opacity=".85" stroke="none"/><path d="M42 50 Q50 46 58 52" fill="none" stroke="${line}" stroke-width="1" opacity=".45"/>`;
 if(s===2)return `${puddle}<path d="M32 78 L28 70 L38 74 M68 78 L74 68 L62 74" fill="${clay}" stroke="${line}" stroke-width="1.2"/><ellipse cx="50" cy="64" rx="12" ry="14" fill="${down}" stroke="${line}" stroke-width="1.8"/><circle cx="50" cy="46" r="8" fill="${down}" stroke="${line}" stroke-width="1.6"/><circle cx="47" cy="45" r="1.5" fill="${deep}" stroke="none"/><path d="M50 48 L56 50 L50 51Z" fill="${sr}" stroke="${line}" stroke-width=".8"/><path d="M40 58 Q32 50 36 44" fill="none" stroke="${line}" stroke-width="1.3"/><path d="M60 58 Q68 50 64 44" fill="none" stroke="${line}" stroke-width="1.3"/><path d="M50 76 Q52 86 50 90" fill="${na}" stroke="${line}" stroke-width="1"/>`;
 const body=`<ellipse cx="50" cy="58" rx="13" ry="16" fill="${down}" stroke="${line}" stroke-width="1.8"/><circle cx="50" cy="40" r="8.5" fill="${down}" stroke="${line}" stroke-width="1.6"/><circle cx="47" cy="39" r="1.6" fill="${deep}" stroke="none"/><circle cx="46.4" cy="38.4" r=".5" fill="${tip}" stroke="none"/><path d="M50 42 L57 44 L50 45.5Z" fill="${sr}" stroke="${line}" stroke-width=".8"/>`;
 const wing=()=>`<path d="M40 52 Q22 40 24 62 Q36 66 44 58Z" fill="${cu}" opacity=".75" stroke="${line}" stroke-width="1.4"/><path d="M60 52 Q78 40 76 62 Q64 66 56 58Z" fill="${cu}" opacity=".75" stroke="${line}" stroke-width="1.4"/>`;
 if(s===3)return `${puddle}${body}<path d="M38 52 Q24 44 28 62 Q40 64 44 56Z" fill="${down}" stroke="${line}" stroke-width="1.3"/><path d="M62 52 Q76 44 72 62 Q60 64 56 56Z" fill="${down}" stroke="${line}" stroke-width="1.3"/><path d="M48 72 Q46 86 42 92" fill="none" stroke="${na}" stroke-width="2.4" stroke-linecap="round"/><path d="M52 72 Q56 86 58 92" fill="none" stroke="${na}" stroke-width="2" stroke-linecap="round"/><path d="M36 48 L32 40" fill="none" stroke="${line}" stroke-width="1.2"/>`;
 if(s===4)return `${puddle}${wing()}${body}<path d="M44 72 Q36 90 32 96" fill="none" stroke="${cu}" stroke-width="2.3" stroke-linecap="round"/><path d="M50 74 Q50 92 48 98" fill="none" stroke="${na}" stroke-width="2.4" stroke-linecap="round"/><path d="M56 72 Q62 88 66 96" fill="none" stroke="${cu}" stroke-width="2.1" stroke-linecap="round"/><path d="M40 48 Q28 36 30 32" fill="none" stroke="${line}" stroke-width="1.2"/><path d="M58 46 L66 36" fill="none" stroke="${na}" stroke-width="1.4"/>`;
 const halo=`<ellipse cx="50" cy="52" rx="38" ry="36" fill="${mid}" opacity=".16" stroke="none"/>`;
 const tail=`<path d="M42 70 Q28 92 24 100" fill="none" stroke="${sr}" stroke-width="2.4" stroke-linecap="round"/><path d="M46 72 Q40 94 36 100" fill="none" stroke="${na}" stroke-width="2.3" stroke-linecap="round"/><path d="M50 74 Q52 96 50 102" fill="none" stroke="${cu}" stroke-width="2.5" stroke-linecap="round"/><path d="M54 72 Q62 92 66 100" fill="none" stroke="${k}" stroke-width="2.2" stroke-linecap="round"/><path d="M58 70 Q70 88 74 96" fill="none" stroke="${sr}" stroke-width="2" stroke-linecap="round"/><path d="M44 76 Q42 86 40 90" fill="none" stroke="${na}" stroke-width="1.4" stroke-linecap="round"/>`;
 return `${puddle}${halo}${wing()}${body}${tail}<path d="M36 44 Q24 28 28 24" fill="none" stroke="${k}" stroke-width="1.4"/><path d="M64 44 Q76 26 72 22" fill="none" stroke="${na}" stroke-width="1.4"/>`;
}

function starSilhouette111(kind){
 const line=ink111();
 if(kind==='dragon')return `<g opacity=".28" transform="translate(72 74) scale(.22)" fill="#7d9574" stroke="${line}" stroke-width="3"><ellipse cx="50" cy="60" rx="28" ry="16"/><ellipse cx="22" cy="48" rx="12" ry="10"/></g>`;
 if(kind==='phoenix')return `<g opacity=".28" transform="translate(72 74) scale(.22)" fill="#e8c894" stroke="${line}" stroke-width="3"><ellipse cx="50" cy="54" rx="16" ry="20"/><path d="M50 70 Q40 90 30 98 M50 70 Q60 90 70 98" fill="none"/></g>`;
 if(kind==='turtle'&&typeof turtleInner105==='function')return `<g opacity=".3" transform="translate(74 76) scale(.2)">${turtleInner105('tuck')}</g>`;
 if(kind==='moth'&&typeof mothArt101==='function')return `<g opacity=".28" transform="translate(74 76) scale(.2)">${mothArt101(5)}</g>`;
 if(kind==='owl'&&typeof owlArt101==='function')return `<g opacity=".28" transform="translate(74 76) scale(.2)">${owlArt101(5)}</g>`;
 if(kind==='lamp'&&typeof lampArtUpgrade101==='function')return '';
 return '';
}

function starStageArt111(fig,kind){
 const reduce=starReduce111();
 if(kind==='lamp'&&typeof lampArtUpgrade101==='function'){
  const lamp=lampArtUpgrade101(6);
  const tri=starFigureSVG111(fig,{w:100,h:100,pad:8,reduce,scale:.85,sw:1.2,ink:'#fff6d8',line:'#e6b454'});
  return `${lamp}<g class="starLampTri111" aria-hidden="true">${tri}</g>`;
 }
 const sky=`<ellipse cx="50" cy="50" rx="46" ry="46" fill="#120e18" stroke="#72583f" stroke-width="1.6"/>`;
 const figSvg=starFigureSVG111(fig,{w:100,h:100,pad:14,reduce,scale:1,sw:1.35});
 return `${sky}${figSvg}${starSilhouette111(kind)}`;
}

/* ---------- Register Dragon and Phoenix (do not drop Shell) ---------- */
if(typeof FRIENDS101!=='undefined'){
 ['dragon','phoenix'].forEach(k=>{if(FRIENDS101.indexOf(k)<0)FRIENDS101.push(k)});
}
/* v115 folded: friendsLoad101 / friendsPut101 live in v101.js. */
{const prev=typeof friendKindName101==='function'?friendKindName101:null;
 friendKindName101=function(kind){
  if(kind==='dragon')return gT('Dragon');
  if(kind==='phoenix')return gT('Phoenix');
  return prev?prev(kind):(kind==='turtle'?gT('Shell'):gT('Lamp'));
 };
}
{const prev=typeof friendState101==='function'?friendState101:null;
 friendState101=function(kind,pid){
  if(kind==='dragon'||kind==='phoenix')return (typeof friendNorm101==='function'?friendNorm101: (x=>x))(friendsLoad101(pid)[kind]);
  return prev?prev(kind,pid):null;
 };
}
{const prev=typeof friendArtInner101==='function'?friendArtInner101:null;
 friendArtInner101=function(id,stage){
  const s=Math.max(1,Math.min(6,stage||1));
  if(id==='dragon')return dragonArt111(s);
  if(id==='phoenix')return phoenixArt111(s);
  if(s===6&&FRIEND_FIG111[id])return starStageArt111(FRIEND_FIG111[id],id);
  return prev?prev(id,stage):'';
 };
}

function friendOfferHTML111(){
 return `<p class="kline">${esc(gT('A Moth, an Owl, a Turtle named Shell, a Dragon, and a Phoenix would like to sit with you, if you want. You can pick one, or keep your Lamp. You can change anytime in Kids.'))}</p>
<div class="row101">
<button type="button" class="p" data-pick="moth">${esc(gT('Moth'))}</button>
<button type="button" class="p" data-pick="owl">${esc(gT('Owl'))}</button>
<button type="button" class="p" data-pick="turtle">${esc(gT('Shell'))}</button>
<button type="button" class="p" data-pick="dragon">${esc(gT('Dragon'))}</button>
<button type="button" class="p" data-pick="phoenix">${esc(gT('Phoenix'))}</button>
<button type="button" data-pick="lamp">${esc(gT('Keep the Lamp'))}</button>
</div>`;
}
friendOfferMaybe101=function(){
 if(typeof LAMP73==='object'&&LAMP73.shown)return;
 if(document.querySelector('dialog.lamp73-dialog, dialog.friendOffer101'))return;
 const pid=typeof curPid==='function'?curPid():'';
 const f=friendsLoad101(pid);
 if(f.offered)return;
 const s=typeof lampLoad73==='function'?lampLoad73(pid):null;
 if(s&&s.pending&&s.pending.length)return;
 f.offered=true;friendsPut101(f,pid);
 const d=document.createElement('dialog');
 d.className='friendOffer101';
 d.setAttribute('aria-modal','true');
 d.setAttribute('aria-label',gT('A new friend'));
 d.innerHTML=friendOfferHTML111();
 const finish=pick=>{
  if(pick&&pick!=='lamp'){f.active=pick;friendsPut101(f,pid)}
  try{if(d.open)d.close()}catch(e){}
  d.remove();
  if(typeof lampMountAll73==='function')lampMountAll73();
  if(typeof friendLine101==='function')friendLine101();
 };
 d.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>finish(b.dataset.pick));
 d.addEventListener('cancel',e=>{e.preventDefault();finish('lamp')});
 document.body.appendChild(d);
 if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');
 const btn=d.querySelector('button');if(btn)btn.focus({preventScroll:true});
};

{const prev=typeof helpCompanion101==='function'?helpCompanion101:null;
 helpCompanion101=function(){
  const r=prev?prev.apply(this,arguments):undefined;
  const p=$('helpFriend101');
  if(p)p.textContent=gT('A Moth, an Owl, a Turtle named Shell, a Dragon, and a Phoenix can sit with them too. Only the one who is with them grows; the others rest and keep what they have. You can change anytime in Kids. When a friend has grown all the way, their last shape is a real group of stars, traced slowly.');
  return r;
 };
}

function whatsNewSeen111(){return typeof RAW!=='undefined'&&RAW.get('lamp_whatsnew111')==='1'}
function whatsNewDismiss111(){
 try{RAW.set('lamp_whatsnew111','1')}catch(e){}
 document.querySelectorAll('[data-whatsnew111]').forEach(n=>n.remove());
}
function whatsNewText111(){
 return gT("Star Friends is ready in Look Up: real star pictures, drawn from a small offline catalog. A Dragon and a Phoenix can sit with your child, and every companion’s last stage becomes a constellation (or the Northern Cross, for the Lamp). Growth still comes only from noticing or trying again, and it is kept on this device.");
}
function whatsNewAttach111(){
 const root=$('adults');if(!root)return;
 const old=root.querySelector('[data-whatsnew101]:not([data-whatsnew111])');
 if(old){
  const p=old.querySelector('p');
  if(p)p.textContent=whatsNewText111();
  return;
 }
 if(whatsNewSeen111())return;
 if(root.querySelector('[data-whatsnew111]'))return;
 const html=`<div class="card whatsnew101" data-whatsnew111="1"><h2>${gT("What's new")}</h2>
<p>${whatsNewText111()}</p>
<p><button type="button" class="p" onclick="whatsNewDismiss111()">${gT('OK')}</button></p></div>`;
 root.insertAdjacentHTML('afterbegin',html);
}

/* ---------- Look Up: Star friends ---------- */
function luStarChime111(){
 if(typeof lampSfxOn73==='function'&&!lampSfxOn73())return;
 if(document.body.classList.contains('bedtime')&&typeof note!=='function')return;
 try{
  const c=typeof ac==='function'?ac():null;
  if(!c||typeof note!=='function')return;
  note(67,c.currentTime,.4,'glow',.035);
 }catch(e){}
}
function luStarOpen111(id){
 if(id&&!STAR_META111[id]&&id!=='list')return;
 if(typeof LU83==='object')LU83.star111=id||'list';
 if(typeof LU83==='object')LU83.story101=null;
 luStarChime111();
 if(typeof luRender83==='function')luRender83();
 window.scrollTo(0,0);
}
function luStarClose111(){
 if(typeof LU83==='object'){
  if(LU83.star111&&LU83.star111!=='list')LU83.star111='list';
  else LU83.star111=null;
 }
 if(typeof luRender83==='function')luRender83();
 window.scrollTo(0,0);
}
function luStarTileArt111(id){
 return `<svg class="lamp-art63" data-original-art="star-${id}-111" viewBox="0 0 100 100" width="100" height="100" aria-hidden="true" focusable="false">${starFigureSVG111(id,{w:100,h:100,pad:16,reduce:true,sky:'#120e18',ink:'#f6efe0',line:'#e6b454',rx:50,sw:1.4})}<circle cx="50" cy="50" r="47" fill="none" stroke="#72583f" stroke-width="2"/></svg>`;
}
function luStarNav111(){
 const ids=['cyg','del','lep','umi'];
 return `<div class="card" data-lustars111="1"><h3>${gT('Star friends')}</h3>
<p class="soft">${gT('Real shapes in the sky, with one true fact each. The stars stay on this device.')}</p>
<div class="hubgrid">${ids.map(id=>`<button class="hubtile" type="button" onclick="luStarOpen111('${id}')">${luStarTileArt111(id)}<span class="kline">${esc(starTitle111(id))}</span></button>`).join('')}</div>
<p class="soft">${gT('Companion stars live here too.')}</p>
<div class="hubgrid">${['dra','phe','lyr','mus','noc'].map(id=>`<button class="hubtile" type="button" onclick="luStarOpen111('${id}')">${luStarTileArt111(id)}<span class="kline">${esc(starTitle111(id))}</span></button>`).join('')}</div>
</div>`;
}
function luStarHTML111(id){
 if(!id||id==='list'){
  return `<div class="card luStar111"><button type="button" onclick="luStarClose111()">${gT('Back')}</button><h2 class="kline">${gT('Star friends')}</h2><p class="kline">${gT('These pictures use real star places. Look as long as you like.')}</p>${luStarNav111().replace('<div class="card" data-lustars111="1">','<div data-lustars111="1">')}</div>`;
 }
 const m=STAR_META111[id];if(!m)return '';
 return `<div class="card luStar111" data-starpage="${id}"><button type="button" onclick="luStarClose111()">${gT('Back')}</button>
<h2 class="kline">${esc(starTitle111(id))}</h2>
${starCaption111(id)?`<p class="kline">${esc(starCaption111(id))}</p>`:''}
<div class="luPlanetArt101">${starSkySVG111(id,{w:240,h:240,width:240,height:240,labels:true,pad:28})}</div>
<p class="kline">${esc(starFact111(id))}</p>
${starVis111(id)?`<p class="soft">${esc(starVis111(id))}</p>`:''}
${starStory111(id)?`<p class="kline">${esc(starStory111(id))}</p>`:''}
<p class="soft lu83-credit">${esc(starCredit111())}</p>
<p class="soft lu83-credit">${esc(gT('Fact source: {src}.',{src:starSrc111(id)}))}</p>
</div>`;
}

/* v117: luRender83 star composition now lives in v112.js. */
/* v117: showImpl97 star/adults hook now lives in v112.js. */
{if(typeof afterShow95==='function'){
 const prev=afterShow95;
 afterShow95=function(id){
  const r=prev.apply(this,arguments);
  try{if(id==='adults')whatsNewAttach111()}catch(e){}
  return r;
 };
}}
/* v117: renderAdults What's-new hook now lives in v112.js. */

/* ---------- Lamp effects: richer and calmer, same names, still fully open ---------- */
{if(typeof lampFxSpiralSVG89==='function'){
 const prev=lampFxSpiralSVG89;
 lampFxSpiralSVG89=function(asleep,still){
  const GA=Math.PI*(3-Math.sqrt(5)),N=180,d=[];
  for(let i=0;i<N;i++){
   const r=3.85*Math.sqrt(i);
   if(r<20||r>49.5)continue;
   const a=i*GA,x=(50+r*Math.cos(a)).toFixed(2),y=(50+r*Math.sin(a)).toFixed(2);
   const rad=(1.2+0.75*((r-20)/30)).toFixed(2),op=(0.42+0.4*((r-20)/30)).toFixed(2);
   const cls=i%3===0?'t':i%3===1?'c':'m';
   d.push(`<circle class="${cls}" cx="${x}" cy="${y}" r="${rad}" opacity="${op}"/>`);
  }
  const st=(still?' still':'')+(asleep&&!still?' asleep':' awake');
  return `<svg class="fx89-spiral fx111-spiral${st}" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">${d.join('')}</svg>`;
 };
}}
{if(typeof lampFxLayerHTML89==='function'){
 const prev=lampFxLayerHTML89;
 lampFxLayerHTML89=function(id,asleep,still){
  const h=prev.apply(this,arguments);
  if(id==='core')return '<div class="fx89-shell fx111-shell"></div><div class="fx89-mid fx111-mid"></div><div class="fx89-hot fx111-hot"></div><div class="fx111-core-soft"></div>';
  if(id==='smoke')return '<div class="fx111-smoke-haze" aria-hidden="true"></div>'+h;
  return h;
 };
}}
{if(typeof lampFxEmberSVG89==='function'){
 const prev=lampFxEmberSVG89;
 lampFxEmberSVG89=function(still){
  const path='M50 94 C46 80 44 70 48 60 C54 46 44 40 50 28 C55 18 50 12 50 6';
  const dots=still
   ? [[94,8],[82,22],[68,16],[52,22],[36,14],[22,18]].map(([y],i)=>`<circle class="fx89-ed" cx="50" cy="${y}" r="${3.2-i*.18}" style="--d:${i}"/>`).join('')
   : [0,1.8,3.6,5.6,7.8,10.2].map((d,i)=>`<circle class="fx89-ed" r="${3.3-i*.2}" style="--d:${i}"><animateMotion dur="${14+i*2.4}s" repeatCount="indefinite" begin="${-d}s" path="${path}"/></circle>`).join('');
  return `<svg class="fx89-ember fx111-ember${still?' still':''}" viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
  <defs><filter id="fx111eb" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <path class="fx89-etrack" d="${path}" fill="none"/>
  <g filter="url(#fx111eb)">${dots}</g>
 </svg>`;
 };
}}

function starCss111(){
 const s=document.createElement('style');
 s.setAttribute('data-v111','1');
 s.textContent=`
.starTrace111 path.starLine111{stroke-dasharray:1;stroke-dashoffset:1;animation:starDraw111 9.5s ease-out forwards;opacity:1}
.starTrace111.reduce111 path.starLine111,.starTrace111[data-reduce="1"] path.starLine111{animation:none!important;stroke-dashoffset:0}
@media (prefers-reduced-motion:reduce){
 .starTrace111 path.starLine111{animation:none!important;stroke-dashoffset:0}
 .fx111-spiral,.fx111-spiral.awake,.fx111-spiral.asleep{animation:none!important;transform:scale(1)!important}
 .fx111-shell,.fx111-mid,.fx111-hot,.fx111-core-soft{animation:none!important}
}
@keyframes starDraw111{to{stroke-dashoffset:0}}
.luStar111 .luPlanetArt101{display:flex;justify-content:center;margin:.6rem 0}
.luStar111 .starSky111{display:block;max-width:100%;height:auto;border-radius:16px;box-shadow:0 0 24px #e6b45422}
.friendPick101{flex-wrap:wrap}
.fx111-spiral.awake:not(.still){animation:fx89-spin 140s linear infinite 8.5s}
.fx111-shell{animation-duration:16s}
.fx111-mid{animation-duration:13s}
.fx111-hot{animation-duration:11s}
.fx111-core-soft{position:absolute;left:50%;top:48%;width:210%;height:210%;transform:translate(-50%,-50%);border-radius:50%;pointer-events:none;
 background:radial-gradient(circle,color-mix(in oklab,var(--f81-halo,#dbb06b) 40%,transparent) 0%,transparent 70%);filter:blur(16px);opacity:.55;animation:fx89-breathe 18s ease-in-out infinite}
.fx111-smoke-haze{position:absolute;inset:-8%;pointer-events:none;background:radial-gradient(circle at 50% 60%,color-mix(in oklab,var(--f81-halo,#dbb06b) 28%,transparent),transparent 70%);filter:blur(12px);opacity:.4}
.fx89-jelly-a,.fx89-jelly-b{animation-duration:24s}
.row101{display:flex;flex-wrap:wrap;gap:.5rem}
`;
 document.head.appendChild(s);
}
if(!document.querySelector('style[data-v111]'))starCss111();

/* ---------- Art Director lamp light + constellation look (Pi positions) ---------- */
const STAR_PHASE111={
 dra:{hatch:['Eltanin','Rastaban','Athebyne','Aldhibah'],young:['Eltanin','Rastaban','ν² Dra','Grumium','Edasich','θ Dra','Athebyne','Aldhibah','Thuban','κ Dra','Giausar']},
 phe:{hatch:['Ankaa','β Phe','γ Phe','ε Phe'],young:['Ankaa','β Phe','γ Phe','δ Phe','ε Phe','Wurren']},
 lyr:{hatch:['Vega','Sheliak','Sulafat'],young:['Vega','ζ¹ Lyr','Sheliak','Sulafat','δ² Lyr']},
 mus:{hatch:['α Mus','β Mus','λ Mus'],young:null},
 noc:{hatch:['Brachium','Solitaire','51 Hya'],young:['Brachium','Solitaire','51 Hya','54 Hya','56 Hya','89 Vir']},
 cyg:{hatch:['Deneb','Sadr','Albireo'],young:['Deneb','Sadr','Albireo','Fawaris','Aljanah','η Cyg']},
 del:{hatch:['Rotanev','Sualocin','Aldulfin'],young:null},
 lep:{hatch:['Arneb','Nihal','Bade'],young:['Arneb','Nihal','Bade','γ Lep','δ Lep','Darlugal']},
 umi:{hatch:['Polaris','Kochab','Pherkad'],young:null},
 ncr:{hatch:['Deneb','Sadr','Albireo'],young:null}
};
const STAR_ALT111={
 lamp_idle:{en:'A clay lantern with a soft glow and a warm puddle of light.',es:'Un farol de barro con un brillo suave y un charquito de luz tibia.'},
 lamp_lit:{en:'The lantern glows a little brighter, slowly.',es:'El farol brilla un poco más, despacio.'},
 dra_hatch:{en:'A few bright stars of the dragon, Draco.',es:'Unas cuantas estrellas brillantes del dragón, Draco.'},
 dra_young:{en:'More stars of Draco, with faint lines beginning to show the dragon.',es:'Más estrellas de Draco, con líneas suaves que empiezan a mostrar el dragón.'},
 dra_grown:{en:'The Draco constellation, with lines and a faint dragon outline.',es:'La constelación de Draco, con líneas y el contorno suave de un dragón.'},
 dra_wise:{en:'The Draco constellation, with lines, a faint dragon outline, and a tiny lantern star.',es:'La constelación de Draco, con líneas, el contorno suave de un dragón y una estrellita en forma de farol.'},
 phe_hatch:{en:'A few bright stars of the phoenix bird, Phoenix.',es:'Unas cuantas estrellas brillantes del ave Fénix, Phoenix.'},
 phe_young:{en:'More stars of Phoenix, with faint lines beginning to show the bird.',es:'Más estrellas de Phoenix, con líneas suaves que empiezan a mostrar el ave.'},
 phe_grown:{en:'The Phoenix constellation, with lines and a faint bird outline.',es:'La constelación de Phoenix, con líneas y el contorno suave de un ave.'},
 phe_wise:{en:'The Phoenix constellation, with lines, a faint bird outline, and a tiny lantern star.',es:'La constelación de Phoenix, con líneas, el contorno suave de un ave y una estrellita en forma de farol.'},
 lyr_hatch:{en:'Three bright stars of the lyre, Lyra, including Vega.',es:'Tres estrellas brillantes de la lira, Lyra, entre ellas Vega.'},
 lyr_young:{en:'More stars of Lyra, with faint lines beginning to show the lyre.',es:'Más estrellas de Lyra, con líneas suaves que empiezan a mostrar la lira.'},
 lyr_grown:{en:'The Lyra constellation, with lines and a faint lyre outline.',es:'La constelación de Lyra, con líneas y el contorno suave de una lira.'},
 lyr_wise:{en:'The Lyra constellation, with lines, a faint lyre outline, and a tiny lantern star.',es:'La constelación de Lyra, con líneas, el contorno suave de una lira y una estrellita en forma de farol.'},
 noc_hatch:{en:'A few stars of Noctua, a historical owl constellation.',es:'Unas cuantas estrellas de Noctua, una constelación histórica del búho.'},
 noc_young:{en:'More stars of Noctua, a historical owl constellation.',es:'Más estrellas de Noctua, una constelación histórica del búho.'},
 noc_grown:{en:'Noctua, a historical owl constellation, with a faint owl outline around the real stars. It is not an official constellation today, so there are no official lines between the stars.',es:'Noctua, una constelación histórica del búho, con el contorno suave de un búho alrededor de las estrellas de verdad. Hoy no es una constelación oficial, así que no hay líneas oficiales entre las estrellas.'},
 noc_wise:{en:'Noctua, a historical owl constellation, with a faint owl outline, the real stars, and a tiny lantern star. There are no official lines between the stars.',es:'Noctua, una constelación histórica del búho, con el contorno suave de un búho, las estrellas de verdad y una estrellita en forma de farol. No hay líneas oficiales entre las estrellas.'},
 mus_hatch:{en:'A few bright stars of Musca, the Fly.',es:'Unas cuantas estrellas brillantes de Musca, la Mosca.'},
 mus_young:{en:'More stars of Musca, the Fly, with faint lines beginning to show the pattern.',es:'Más estrellas de Musca, la Mosca, con líneas suaves que empiezan a mostrar el dibujo.'},
 mus_grown:{en:'Musca, the Fly, a real southern constellation, with lines and a faint moth-like outline. There is no official moth constellation, so the moth uses Musca.',es:'Musca, la Mosca, una constelación real del cielo del sur, con líneas y el contorno suave de una polilla. No hay una constelación oficial de la polilla, así que la polilla usa a Musca.'},
 mus_wise:{en:'Musca, the Fly, with lines, a faint moth-like outline, and a tiny lantern star.',es:'Musca, la Mosca, con líneas, el contorno suave de una polilla y una estrellita en forma de farol.'}
};
function starAlt111(id,phase){
 const m=STAR_ALT111[(id||'')+'_'+(phase||'grown')];
 return m?(starLang111()==='es'?m.es:m.en):starTitle111(id);
}
function starTwinkle111(i,mag){
 return `--t:${(6.4+((i*1.17+(mag||3)*0.31)%3.6)).toFixed(2)}s;--w:${(-((i*1.73)%8)).toFixed(2)}s`;
}
function starMid111(a,b,t){t=t==null?0.5:t;return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t}}
function starPtName111(data,W,H,pad,name){
 const s=data.rows.find(r=>r.name===name);return s?starMap111(s,W,H,pad):null;
}
function starP111(p){return p.x.toFixed(1)+' '+p.y.toFixed(1)}
function starSmooth111(pts){
 if(pts.length<2)return pts.length?'M'+starP111(pts[0]):'';
 if(pts.length===2)return 'M'+starP111(pts[0])+'L'+starP111(pts[1]);
 let d='M'+starP111(pts[0])+'L'+starP111(starMid111(pts[0],pts[1]));
 for(let i=1;i<pts.length-1;i++)d+='Q'+starP111(pts[i])+' '+starP111(starMid111(pts[i],pts[i+1]));
 return d+'L'+starP111(pts[pts.length-1]);
}
function starRibbon111(spine,widths){
 const n=spine.length,left=[],right=[];
 for(let i=0;i<n;i++){
  let dx,dy;
  if(i===0){dx=spine[1].x-spine[0].x;dy=spine[1].y-spine[0].y}
  else if(i===n-1){dx=spine[i].x-spine[i-1].x;dy=spine[i].y-spine[i-1].y}
  else {dx=spine[i+1].x-spine[i-1].x;dy=spine[i+1].y-spine[i-1].y}
  const L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,w=widths[i];
  left.push({x:spine[i].x+nx*w,y:spine[i].y+ny*w});
  right.push({x:spine[i].x-nx*w,y:spine[i].y-ny*w});
 }
 let d=starSmooth111(left);
 d+='Q'+starP111(spine[n-1])+' '+starP111(right[n-1]);
 const rest=[right[n-1]].concat(right.slice(0,-1).reverse());
 if(rest.length===2)d+='L'+starP111(rest[1]);
 else{
  d+='L'+starP111(starMid111(rest[0],rest[1]));
  for(let i=1;i<rest.length-1;i++)d+='Q'+starP111(rest[i])+' '+starP111(starMid111(rest[i],rest[i+1]));
  d+='L'+starP111(rest[rest.length-1]);
 }
 return d+'Q'+starP111(spine[0])+' '+starP111(left[0])+'Z';
}
function starOutlinePath111(d,sc){
 return `<path class="starCreature111" d="${d}" fill="#d9c9a8" fill-opacity=".05" stroke="#d9c9a8" stroke-width="${(1.35*(sc||1)).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round" opacity=".24"/>`;
}
function starCreatureOutline111(id,data,W,H,pad){
 const sc=W/200,P=n=>starPtName111(data,W,H,pad,n),C='#d9c9a8';
 if(id==='dra'){
  const g=P('Eltanin'),n=P('ν² Dra'),x=P('Grumium'),z=P('Aldhibah'),h=P('Athebyne'),th=P('θ Dra'),i=P('Edasich'),a=P('Thuban'),k=P('κ Dra'),l=P('Giausar'),c=P('χ Dra'),d=P('Altais'),e=P('ε Dra');
  if(!g||!l||!z)return '';
  const spine=[{x:g.x-10*sc,y:g.y+3*sc},g,n?starMid111(g,n):g,x||g,z,h||z,th||z,i||z,a||z,k||l,l,{x:l.x+10*sc,y:l.y-7*sc}];
  const widths=[3.2,6.5,8.5,6.2,7.2,6.4,6.2,6.2,5.8,5,4.2,2.4].map(w=>w*sc);
  let html=starOutlinePath111(starRibbon111(spine,widths),sc);
  if(c&&d&&e){
   const p1={x:z.x-4*sc,y:z.y-6*sc},p2={x:c.x+5*sc,y:c.y+2*sc},tip={x:e.x-6*sc,y:e.y-9*sc},sh={x:d.x-8*sc,y:d.y-2*sc};
   html+=`<path class="starCreature111" d="M${starP111(p1)}Q${starP111(sh)} ${starP111(tip)}Q${(c.x-4*sc).toFixed(1)} ${(e.y+4*sc).toFixed(1)} ${starP111(p2)}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.3*sc).toFixed(2)}" stroke-linejoin="round" opacity=".24"/>`;
  }
  html+=`<path d="M${(g.x-6*sc).toFixed(1)} ${(g.y+sc).toFixed(1)}q${(4*sc).toFixed(1)} ${(4*sc).toFixed(1)} ${(8*sc).toFixed(1)} ${sc.toFixed(1)}" fill="none" stroke="${C}" stroke-width="${(1.1*sc).toFixed(2)}" stroke-linecap="round" opacity=".3"/>`;
  return html;
 }
 if(id==='phe'){
  const a=P('Ankaa'),b=P('β Phe'),g=P('γ Phe'),d=P('δ Phe'),e=P('ε Phe'),z=P('Wurren'),p=P('ψ Phe');
  if(!a||!b)return '';
  const tail=z||d||b,tip={x:tail.x+(tail.x-b.x)*0.2,y:tail.y+(tail.y-b.y)*0.2};
  const spine=[{x:a.x-12*sc,y:a.y+8*sc},starMid111(a,b,0.35),b,starMid111(b,tail,0.55),tail,tip];
  let html=starOutlinePath111(starRibbon111(spine,[5.5,8,9,7,5.5,3.2].map(w=>w*sc)),sc);
  html+=`<ellipse cx="${(a.x-sc).toFixed(1)}" cy="${(a.y+sc).toFixed(1)}" rx="${(10*sc).toFixed(1)}" ry="${(9*sc).toFixed(1)}" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.35*sc).toFixed(2)}" opacity=".23"/>`;
  html+=`<path d="M${(a.x+7*sc).toFixed(1)} ${(a.y-2*sc).toFixed(1)}L${(a.x+16*sc).toFixed(1)} ${(a.y+2*sc).toFixed(1)}L${(a.x+7*sc).toFixed(1)} ${(a.y+5*sc).toFixed(1)}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.15*sc).toFixed(2)}" stroke-linejoin="round" opacity=".23"/>`;
  html+=`<circle cx="${(a.x-2*sc).toFixed(1)}" cy="${a.y.toFixed(1)}" r="${(1.5*sc).toFixed(1)}" fill="${C}" opacity=".35"/>`;
  if(p&&g)html+=`<path class="starCreature111" d="M${starP111({x:b.x-2*sc,y:b.y-6*sc})}Q${starP111({x:g.x+4*sc,y:g.y-12*sc})} ${starP111({x:p.x-6*sc,y:p.y-6*sc})}Q${starP111({x:p.x-2*sc,y:p.y+6*sc})} ${starP111({x:g.x-2*sc,y:g.y+8*sc})}Q${starP111({x:b.x-8*sc,y:b.y+2*sc})} ${starP111({x:b.x-2*sc,y:b.y-6*sc})}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.3*sc).toFixed(2)}" stroke-linejoin="round" opacity=".23"/>`;
  if(d)html+=`<path class="starCreature111" d="M${starP111({x:b.x-4*sc,y:b.y+6*sc})}Q${starP111({x:d.x-6*sc,y:d.y-4*sc})} ${starP111({x:d.x-8*sc,y:d.y+8*sc})}Q${starP111({x:d.x+4*sc,y:d.y+8*sc})} ${starP111({x:d.x+2*sc,y:d.y-2*sc})}Q${starP111({x:b.x+4*sc,y:b.y+8*sc})} ${starP111({x:b.x-4*sc,y:b.y+6*sc})}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.3*sc).toFixed(2)}" stroke-linejoin="round" opacity=".23"/>`;
  if(tail)html+=`<path class="starCreature111" d="M${(tail.x-3*sc).toFixed(1)} ${(tail.y-2*sc).toFixed(1)}Q${(tail.x-10*sc).toFixed(1)} ${(tail.y+8*sc).toFixed(1)} ${(tail.x-4*sc).toFixed(1)} ${(tail.y+14*sc).toFixed(1)}Q${(tail.x+2*sc).toFixed(1)} ${(tail.y+6*sc).toFixed(1)} ${(tail.x-sc).toFixed(1)} ${(tail.y-sc).toFixed(1)}Z M${(tail.x+3*sc).toFixed(1)} ${(tail.y-sc).toFixed(1)}Q${(tail.x+10*sc).toFixed(1)} ${(tail.y+8*sc).toFixed(1)} ${(tail.x+12*sc).toFixed(1)} ${(tail.y+13*sc).toFixed(1)}Q${(tail.x+4*sc).toFixed(1)} ${(tail.y+5*sc).toFixed(1)} ${(tail.x+2*sc).toFixed(1)} ${(tail.y-sc).toFixed(1)}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.15*sc).toFixed(2)}" stroke-linejoin="round" opacity=".23"/>`;
  return html;
 }
 if(id==='lyr'){
  const a=P('Vega'),z=P('ζ¹ Lyr'),d=P('δ² Lyr'),b=P('Sheliak'),g=P('Sulafat');
  if(!a||!b||!g)return '';
  const yokeL={x:(d?d.x:a.x)-8*sc,y:a.y-10*sc},yokeR={x:a.x+12*sc,y:a.y-8*sc};
  const armR={x:b.x+12*sc,y:((z?z.y:a.y)+b.y)/2},armL={x:(d?d.x:g.x)-10*sc,y:((d?d.y:a.y)+g.y)/2};
  const footL={x:g.x-8*sc,y:g.y+8*sc},footR={x:b.x+8*sc,y:b.y+8*sc};
  const frame=`M${starP111(yokeL)}Q${((d?d.x:a.x)+a.x)/2} ${(Math.min(a.y,yokeL.y)-8*sc).toFixed(1)} ${starP111(yokeR)}Q${(a.x+8*sc).toFixed(1)} ${((z?z.y:a.y)-4*sc).toFixed(1)} ${starP111(armR)}Q${(b.x+10*sc).toFixed(1)} ${(b.y+2*sc).toFixed(1)} ${starP111(footR)}Q${((b.x+g.x)/2).toFixed(1)} ${(Math.max(b.y,g.y)+10*sc).toFixed(1)} ${starP111(footL)}Q${(g.x-10*sc).toFixed(1)} ${(g.y+2*sc).toFixed(1)} ${starP111(armL)}Q${((d?d.x:g.x)-8*sc).toFixed(1)} ${((z?z.y:a.y)-2*sc).toFixed(1)} ${starP111(yokeL)}Z`;
  let strings='';
  [0.28,0.5,0.72].forEach(t=>{
   const p1=starMid111({x:yokeL.x+6*sc,y:yokeL.y+10*sc},{x:yokeR.x-6*sc,y:yokeR.y+10*sc},t);
   const p2=starMid111({x:footL.x+6*sc,y:footL.y-6*sc},{x:footR.x-6*sc,y:footR.y-6*sc},t);
   strings+=`M${starP111(p1)}L${starP111(p2)}`;
  });
  return starOutlinePath111(frame,sc)+`<path d="${strings}" fill="none" stroke="${C}" stroke-width="${(0.9*sc).toFixed(2)}" stroke-linecap="round" opacity=".22"/>`;
 }
 if(id==='mus'){
  const a=P('α Mus'),b=P('β Mus'),g=P('γ Mus'),d=P('δ Mus'),e=P('ε Mus');
  if(!a||!b||!e)return '';
  const abdomen=starMid111(a,b,0.6);abdomen.x+=3*sc;abdomen.y+=3*sc;
  let html=starOutlinePath111(starRibbon111([e,starMid111(e,a,0.45),abdomen],[8,9.5,6.5].map(w=>w*sc)),sc);
  if(g)html+=`<path class="starCreature111" d="M${starP111({x:a.x-2*sc,y:a.y-6*sc})}Q${starP111({x:g.x-8*sc,y:g.y-10*sc})} ${starP111({x:g.x+8*sc,y:g.y-8*sc})}Q${starP111({x:g.x+8*sc,y:g.y+8*sc})} ${starP111({x:a.x+8*sc,y:a.y-2*sc})}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.3*sc).toFixed(2)}" stroke-linejoin="round" opacity=".23"/>`;
  if(d)html+=`<path class="starCreature111" d="M${starP111({x:b.x+2*sc,y:b.y-2*sc})}Q${starP111({x:d.x-6*sc,y:d.y-6*sc})} ${starP111({x:d.x+10*sc,y:d.y+2*sc})}Q${starP111({x:d.x+2*sc,y:d.y+10*sc})} ${starP111({x:b.x+6*sc,y:b.y+6*sc})}Z" fill="${C}" fill-opacity=".05" stroke="${C}" stroke-width="${(1.3*sc).toFixed(2)}" stroke-linejoin="round" opacity=".23"/>`;
  const ant1={x:e.x-10*sc,y:e.y-14*sc},ant2={x:e.x+2*sc,y:e.y-16*sc};
  html+=`<path d="M${(e.x-2*sc).toFixed(1)} ${(e.y-6*sc).toFixed(1)}Q${(ant1.x+2*sc).toFixed(1)} ${(ant1.y+4*sc).toFixed(1)} ${starP111(ant1)}M${(e.x+2*sc).toFixed(1)} ${(e.y-6*sc).toFixed(1)}Q${(ant2.x-sc).toFixed(1)} ${(ant2.y+4*sc).toFixed(1)} ${starP111(ant2)}" fill="none" stroke="${C}" stroke-width="${(1.15*sc).toFixed(2)}" stroke-linecap="round" opacity=".28"/>`;
  html+=`<circle cx="${ant1.x.toFixed(1)}" cy="${ant1.y.toFixed(1)}" r="${(1.3*sc).toFixed(1)}" fill="#e6b454" opacity=".4"/><circle cx="${ant2.x.toFixed(1)}" cy="${ant2.y.toFixed(1)}" r="${(1.3*sc).toFixed(1)}" fill="#e6b454" opacity=".4"/>`;
  html+=`<circle cx="${(e.x-2.4*sc).toFixed(1)}" cy="${(e.y-2*sc).toFixed(1)}" r="${(1.15*sc).toFixed(1)}" fill="${C}" opacity=".35"/><circle cx="${(e.x+2.2*sc).toFixed(1)}" cy="${(e.y-2.2*sc).toFixed(1)}" r="${(1.15*sc).toFixed(1)}" fill="${C}" opacity=".35"/>`;
  return html;
 }
 if(id==='noc')return starOwlOutline111(data.rows,W,H,pad,'#d9c9a8',false);
 if(id==='cyg'||id==='ncr'){
  const den=P('Deneb'),sadr=P('Sadr'),alb=P('Albireo'),fa=P('Fawaris'),alj=P('Aljanah');
  if(!den||!sadr||!alb)return '';
  let html=starOutlinePath111(starRibbon111([den,sadr,alb],[6,9,5].map(w=>w*sc)),sc);
  if(fa&&alj)html+=`<path class="starCreature111" d="M${starP111(fa)}Q${starP111(sadr)} ${starP111(alj)}" fill="none" stroke="${C}" stroke-width="${(2.4*sc).toFixed(2)}" stroke-linecap="round" opacity=".2"/>`;
  return html;
 }
 return '';
}
function starLanternMark111(x,y,s){
 s=s||1;
 const X=n=>(x+n*s).toFixed(1),Y=n=>(y+n*s).toFixed(1);
 return `<g class="starLantern111" fill="none" stroke="#72583f" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="${X(0)}" cy="${Y(0)}" r="${(2.4*s).toFixed(1)}" stroke-width="${(1.4*s).toFixed(2)}"/>
  <path d="M${X(-5.6)} ${Y(4.6)}c0-${(3.2*s).toFixed(1)} ${(2.4*s).toFixed(1)}-${(4.4*s).toFixed(1)} ${(5.6*s).toFixed(1)}-${(4.4*s).toFixed(1)}s${(5.6*s).toFixed(1)} ${(1.2*s).toFixed(1)} ${(5.6*s).toFixed(1)} ${(4.4*s).toFixed(1)}v${(1.5*s).toFixed(1)}H${X(-5.6)}z" fill="#d9b27a" stroke-width="${(1.1*s).toFixed(2)}"/>
  <rect x="${X(-6.8)}" y="${Y(7.2)}" width="${(13.6*s).toFixed(1)}" height="${(14.2*s).toFixed(1)}" rx="${(1.6*s).toFixed(1)}" fill="#ffe4a4" stroke-width="${(1.25*s).toFixed(2)}"/>
  <path d="M${X(-6.8)} ${Y(14.3)}h${(13.6*s).toFixed(1)}M${X(0)} ${Y(7.2)}v${(14.2*s).toFixed(1)}" stroke-width="${s.toFixed(2)}"/>
  <path d="M${X(-1.4)} ${Y(16.4)}q${(1.4*s).toFixed(1)}-${(4.8*s).toFixed(1)} ${(2.8*s).toFixed(1)} 0q-${(1.4*s).toFixed(1)} ${(2.1*s).toFixed(1)}-${(2.8*s).toFixed(1)} 0z" fill="#e6b454" stroke="#855a00" stroke-width="${(0.65*s).toFixed(2)}"/>
  <path d="M${X(-7.4)} ${Y(22.2)}h${(14.8*s).toFixed(1)}" stroke-width="${(1.6*s).toFixed(2)}"/>
 </g>`;
}
function starLanternSpot111(data,W,H,pad){
 const pts=data.rows.map(s=>starMap111(s,W,H,pad));
 if(!pts.length)return {x:W*0.82,y:H*0.12};
 const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
 const minx=Math.min.apply(null,xs),maxx=Math.max.apply(null,xs),miny=Math.min.apply(null,ys),cx=(minx+maxx)/2;
 const cands=[[Math.min(maxx+20,W*0.88),Math.max(H*0.08,miny-8)],[cx+28,Math.max(H*0.08,miny-20)],[cx-28,Math.max(H*0.08,miny-20)],[cx,Math.max(H*0.08,miny-24)],[Math.min(maxx+18,W*0.88),miny+14],[Math.max(minx-18,W*0.12),miny+14]];
 let best=null,bestD=-1;
 cands.forEach(c=>{
  if(c[0]<W*0.1||c[0]>W*0.9||c[1]<H*0.07||c[1]>H*0.84)return;
  const d=Math.min.apply(null,pts.map(p=>Math.hypot(c[0]-p.x,c[1]+10-p.y)));
  if(d>bestD){bestD=d;best={x:c[0],y:c[1]}}
 });
 return best||{x:cx,y:Math.max(H*0.08,miny-22)};
}
function starPhaseFilter111(id,phase,rows){
 const spec=STAR_PHASE111[id];
 if(!spec||!phase||phase==='grown'||phase==='wise'||!spec[phase])return rows.map((_,i)=>i);
 const names=spec[phase];
 if(!names)return rows.map((_,i)=>i);
 const idx=[];rows.forEach((s,i)=>{if(names.indexOf(s.name)>=0)idx.push(i)});
 return idx.length?idx:rows.map((_,i)=>i);
}
starFigureSVG111=function(id,opt){
 opt=opt||{};
 const data=starFigureData111(id);if(!data)return '';
 const W=opt.w||100,H=opt.h||100,pad=opt.pad||0;
 const reduce=starReduce111(opt);
 const ink=opt.ink||'#f6efe0',line=opt.line||'#e6b454';
 const phase=opt.phase||'';
 const keep=starPhaseFilter111(id,phase,data.rows);
 const keepSet={};keep.forEach(i=>keepSet[i]=1);
 const pos={};data.rows.forEach((s,i)=>{pos[i]=starMap111(s,W,H,pad)});
 const useLines=(id==='noc')?[]:data.lines.filter(pair=>keepSet[pair[0]]&&keepSet[pair[1]]);
 const nL=useLines.length,step=nL?Math.min(1.1,7/nL):0;
 const lines=useLines.map((pair,i)=>{
  const a=pos[pair[0]],b=pos[pair[1]];if(!a||!b)return '';
  const d='M'+a.x.toFixed(2)+' '+a.y.toFixed(2)+' L'+b.x.toFixed(2)+' '+b.y.toFixed(2);
  return `<path class="starLine111" pathLength="1" d="${d}" stroke="${line}" stroke-width="${opt.sw||1.35}" fill="none" stroke-linecap="round" stroke-linejoin="round" style="animation-delay:${reduce?0:(i*step)}s"/>`;
 }).join('');
 const stars=keep.map((i,n)=>{
  const s=data.rows[i],p=pos[i];if(!p)return '';
  const r=starRad111(s.size,W,opt.scale);
  const label=opt.labels&&s.name&&s.mag<=2.5?`<text x="${(p.x+4.2).toFixed(1)}" y="${(p.y-3.2).toFixed(1)}" font-size="${Math.max(5,W/28)}" fill="${ink}" opacity=".85">${esc(s.name)}</text>`:'';
  return `<g class="s starDot111" style="${starTwinkle111(n,s.mag)}"><circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${r.toFixed(2)}" fill="${ink}" stroke="none"/><circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${(r*2.1).toFixed(2)}" fill="#e6b454" opacity=".18" stroke="none"/></g>${label}`;
 }).join('');
 const showOutline=!!opt.outline||phase==='grown'||phase==='wise'||((opt.labels||W>=180)&&!phase);
 const outline=showOutline?starCreatureOutline111(id,data,W,H,pad):'';
 const capOn=id==='noc'&&opt.caption===true;
 const owlCap=capOn?starOwlOutline111(data.rows,W,H,pad,ink,true).replace(/<g class="starOwl111"[\s\S]*?<\/g>/,''):'';
 const lantern=(phase==='wise'||opt.lantern)?(function(){const sp=starLanternSpot111({rows:keep.map(i=>data.rows[i])},W,H,pad);return starLanternMark111(sp.x,sp.y,W/200*0.85)})():'';
 const cls='constel starTrace111'+(reduce?' reduce111':'');
 const bg=opt.sky?`<rect width="${W}" height="${H}" fill="${opt.sky}" rx="${opt.rx||0}"/>`:'';
 return `<g class="${cls}" data-starfig="${id}" data-reduce="${reduce?'1':'0'}" data-lines="${nL}" data-phase="${phase||'full'}">${bg}${outline}${owlCap}${lines}${stars}${lantern}</g>`;
};
function starCompanionArt111(fig,kind,stage){
 const phase=stage>=6?'wise':stage===5?'grown':stage===4?'young':'hatch';
 const reduce=starReduce111();
 return `<ellipse cx="50" cy="50" rx="46" ry="46" fill="#120e18" stroke="#72583f" stroke-width="1.6"/>${starFigureSVG111(fig,{w:100,h:100,pad:12,reduce,scale:1,sw:1.25,phase,outline:phase==='grown'||phase==='wise',lantern:phase==='wise',ink:'#fff6d8',line:'#e6b454'})}`;
}
{const prevDragon=dragonArt111;
 dragonArt111=function(stage){const s=Math.max(1,Math.min(6,stage||1));return s>=3?starCompanionArt111('dra','dragon',s):prevDragon(s)};
}
{const prevPhoenix=phoenixArt111;
 phoenixArt111=function(stage){const s=Math.max(1,Math.min(6,stage||1));return s>=3?starCompanionArt111('phe','phoenix',s):prevPhoenix(s)};
}
{const prevInner=friendArtInner101;
 friendArtInner101=function(id,stage){
  const s=Math.max(1,Math.min(6,stage||1));
  if(id==='dragon')return dragonArt111(s);
  if(id==='phoenix')return phoenixArt111(s);
  if(id==='lamp'&&s===6)return starStageArt111('ncr','lamp');
  if(s>=3&&FRIEND_FIG111[id]&&id!=='lamp')return starCompanionArt111(FRIEND_FIG111[id],id,s);
  return prevInner?prevInner(id,stage):'';
 };
}
{if(typeof starStageArt111==='function'){
 const prev=starStageArt111;
 starStageArt111=function(fig,kind){
  const reduce=starReduce111();
  if(kind==='lamp'&&typeof lampArtUpgrade101==='function'){
   const lamp=lampArtUpgrade101(6);
   const tri=starFigureSVG111(fig,{w:100,h:100,pad:8,reduce,scale:.85,sw:1.2,ink:'#fff6d8',line:'#e6b454',outline:true,phase:'wise'});
   return `${lamp}<g class="starLampTri111" aria-hidden="true">${tri}</g>`;
  }
  return prev.apply(this,arguments);
 };
}}
let LAMP_FX_N111=0,LAMP_LIT_T111=0;
function lampFxLightSVG111(){
 const n=++LAMP_FX_N111,hid='halo111-'+n,bid='bloom111-'+n,sid='spill111-'+n;
 return `<svg class="lamp-fx-light" viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="${hid}" cx="50%" cy="46%" r="58%">
      <stop offset="0" stop-color="#FFF6D8" stop-opacity=".55"/>
      <stop offset=".4" stop-color="#E6B454" stop-opacity=".22"/>
      <stop offset="1" stop-color="#E6B454" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${bid}" cx="50%" cy="48%" r="72%">
      <stop offset="0" stop-color="#FFF6D8" stop-opacity=".4"/>
      <stop offset=".5" stop-color="#E6B454" stop-opacity=".16"/>
      <stop offset="1" stop-color="#E6B454" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${sid}" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#E6B454" stop-opacity=".55"/>
      <stop offset=".7" stop-color="#E6B454" stop-opacity=".18"/>
      <stop offset="1" stop-color="#E6B454" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse class="bloom" cx="100" cy="110" rx="90" ry="90" fill="url(#${bid})" opacity="0.7"/>
  <ellipse class="halo" cx="100" cy="112" rx="78" ry="78" fill="url(#${hid})" opacity="0.55"/>
  <ellipse class="spill" cx="100" cy="186" rx="52" ry="14" fill="url(#${sid})" opacity="0.28"/>
  <g class="embers">
    <g class="ember"><circle cx="58" cy="88" r="4.84" fill="#E6B454" opacity=".2"/><circle cx="58" cy="88" r="2.2" fill="#FFF6D8"/></g>
    <g class="ember"><circle cx="148" cy="96" r="3.96" fill="#E6B454" opacity=".2"/><circle cx="148" cy="96" r="1.8" fill="#FFF6D8"/></g>
    <g class="ember"><circle cx="46" cy="128" r="3.74" fill="#E6B454" opacity=".2"/><circle cx="46" cy="128" r="1.7" fill="#FFF6D8"/></g>
    <g class="ember"><circle cx="154" cy="136" r="4.4" fill="#E6B454" opacity=".2"/><circle cx="154" cy="136" r="2.0" fill="#FFF6D8"/></g>
    <g class="ember"><circle cx="72" cy="64" r="3.52" fill="#E6B454" opacity=".2"/><circle cx="72" cy="64" r="1.6" fill="#FFF6D8"/></g>
  </g>
 </svg>`;
}
function lampReducedNow111(){
 try{if(typeof lampReduced73==='function'&&lampReduced73())return true}catch(e){}
 return starReduce111();
}
function lampThemeDay111(){
 try{
  if(document.body.classList.contains('bedtime')||document.body.classList.contains('night')||document.documentElement.classList.contains('night'))return false;
  if(typeof lampThemeDark76==='function'&&lampThemeDark76())return false;
 }catch(e){}
 return true;
}
function lampFxDecorate111(root){
 const host=root&&root.querySelectorAll?root:document;
 host.querySelectorAll('.lamp73-shell').forEach(el=>{
  el.classList.add('lamp-fx');
  el.classList.toggle('reduce73',lampReducedNow111());
  el.classList.toggle('lamp-fx-day',lampThemeDay111());
  if(!el.querySelector('.lamp-fx-light'))el.insertAdjacentHTML('afterbegin',lampFxLightSVG111());
 });
}
function lampLit111(el){
 if(lampReducedNow111())return;
 const now=Date.now();
 if(LAMP_LIT_T111&&now-LAMP_LIT_T111<1900)return;
 const nodes=el?[el]:[...document.querySelectorAll('.lamp-fx')];
 if(!nodes.length)return;
 LAMP_LIT_T111=now;
 nodes.forEach(n=>{n.classList.remove('is-lit');void n.offsetWidth;n.classList.add('is-lit')});
 setTimeout(()=>{nodes.forEach(n=>n.classList.remove('is-lit'));if(Date.now()-LAMP_LIT_T111>=1800)LAMP_LIT_T111=0},1900);
}
{if(typeof lampMountAll73==='function'){
 const prev=lampMountAll73;
 lampMountAll73=function(){
  const r=prev.apply(this,arguments);
  try{lampFxDecorate111();if(document.querySelector('.dailyGlowCard64 .finishGlow64 .lamp-fx'))lampLit111()}catch(e){}
  return r;
 };
}}
{if(typeof lampMount73==='function'){
 const prev=lampMount73;
 lampMount73=function(){
  const r=prev.apply(this,arguments);
  try{lampFxDecorate111()}catch(e){}
  return r;
 };
}}
{if(typeof afterShow95==='function'){
 const prev=afterShow95;
 afterShow95=function(id){
  const r=prev.apply(this,arguments);
  try{lampFxDecorate111()}catch(e){}
  return r;
 };
}}
function lampFxCss111(){
 if(document.querySelector('style[data-v111-fx]'))return;
 const s=document.createElement('style');
 s.setAttribute('data-v111-fx','1');
 s.textContent=`
.lamp-fx{position:relative}
.lamp-fx .lamp-fx-light{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:visible}
.lamp-fx .lamp73-stage{position:relative;z-index:1}
.lamp-fx.breathe .lamp73-stage,.today64 .lamp-fx.breathe .lamp73-stage,.daily64 .lamp-fx.breathe .lamp73-stage{animation:none!important;transform:none!important}
.lamp-fx .halo,.lamp-fx .bloom{transform-origin:50% 48%;animation:lamp-breath 4s ease-in-out infinite}
.lamp-fx .flame,.lamp-fx .flame-core{animation:lamp-core 4s ease-in-out infinite}
.lamp-fx .spill{transform-origin:50% 50%;animation:lamp-spill 4s ease-in-out infinite}
@keyframes lamp-breath{0%,100%{opacity:0.55;transform:scale(1)}50%{opacity:0.85;transform:scale(1.06)}}
@keyframes lamp-core{0%,100%{opacity:0.90}50%{opacity:1}}
@keyframes lamp-spill{0%,100%{opacity:0.28;transform:scaleX(1)}50%{opacity:0.45;transform:scaleX(1.08)}}
.lamp-fx .ember{animation:lamp-ember var(--ember-dur,14s) ease-in-out var(--ember-delay,0s) infinite}
@keyframes lamp-ember{0%,100%{transform:translate(0,0);opacity:0.20}50%{transform:translate(var(--dx,6px),var(--dy,-14px));opacity:0.45}}
.lamp-fx .ember:nth-child(1){--ember-dur:13.2s;--ember-delay:-2.1s;--dx:7px;--dy:-13px}
.lamp-fx .ember:nth-child(2){--ember-dur:15.4s;--ember-delay:-6.8s;--dx:-5px;--dy:-16px}
.lamp-fx .ember:nth-child(3){--ember-dur:17.1s;--ember-delay:-9.4s;--dx:4px;--dy:-11px}
.lamp-fx .ember:nth-child(4){--ember-dur:14.6s;--ember-delay:-3.7s;--dx:-7px;--dy:-15px}
.lamp-fx .ember:nth-child(5){--ember-dur:16.3s;--ember-delay:-11.2s;--dx:5px;--dy:-12px}
.lamp-fx.is-lit .halo,.lamp-fx.is-lit .bloom,.lamp-fx.is-lit .spill{animation:lamp-lit 1.8s ease-in-out 1 both}
.lamp-fx.is-lit .flame,.lamp-fx.is-lit .flame-core{animation:lamp-lit-core 1.8s ease-in-out 1 both}
@keyframes lamp-lit{0%{opacity:0.55;transform:scale(1)}45%{opacity:0.95;transform:scale(1.14)}100%{opacity:0.70;transform:scale(1.04)}}
@keyframes lamp-lit-core{0%{opacity:0.90}45%{opacity:1}100%{opacity:0.96}}
.lamp-fx.lamp-fx-day .halo,.lamp-fx.lamp-fx-day .bloom{animation-name:lamp-breath-day}
@keyframes lamp-breath-day{0%,100%{opacity:0.35;transform:scale(0.88)}50%{opacity:0.55;transform:scale(0.94)}}
body.bedtime .lamp-fx .halo,body.bedtime .lamp-fx .bloom,body.bedtime .lamp-fx .spill,
body.night .lamp-fx .halo,body.night .lamp-fx .bloom,body.night .lamp-fx .spill{animation-duration:6.5s}
body.bedtime .lamp-fx .halo,body.night .lamp-fx .halo{filter:brightness(0.88)}
.finishGlow64:has(.lamp-fx){animation:none;background:transparent}
.constel .s,.constel .star{animation:star-twinkle var(--t,8s) ease-in-out var(--w,0s) infinite}
@keyframes star-twinkle{0%,100%{opacity:0.78}50%{opacity:1}}
@media (prefers-reduced-motion:reduce){
  .lamp-fx .halo,.lamp-fx .bloom,.lamp-fx .flame,.lamp-fx .flame-core,.lamp-fx .spill,.lamp-fx .ember,
  .lamp-fx.is-lit .halo,.lamp-fx.is-lit .bloom,.lamp-fx.is-lit .spill,.lamp-fx.is-lit .flame,.lamp-fx.is-lit .flame-core,
  .constel .s,.constel .star{animation:none!important;transform:none!important}
  .lamp-fx .halo,.lamp-fx .bloom{opacity:0.70}
  .lamp-fx .spill{opacity:0.36}
  .lamp-fx .ember{opacity:0.28}
  .lamp-fx .flame,.lamp-fx .flame-core{opacity:0.95}
  .constel .s,.constel .star{opacity:0.92}
}
.lamp-fx.reduce73 .halo,.lamp-fx.reduce73 .bloom,.lamp-fx.reduce73 .flame,.lamp-fx.reduce73 .flame-core,
.lamp-fx.reduce73 .spill,.lamp-fx.reduce73 .ember,.reduce111 .s,.constel.reduce111 .s{animation:none!important;transform:none!important}
.lamp-fx.reduce73 .halo,.lamp-fx.reduce73 .bloom{opacity:0.70}
.lamp-fx.reduce73 .spill{opacity:0.36}
.lamp-fx.reduce73 .ember{opacity:0.28}
.reduce111 .s,.constel.reduce111 .s{opacity:0.92}
`;
 document.head.appendChild(s);
}
if(!document.querySelector('style[data-v111-fx]'))lampFxCss111();

