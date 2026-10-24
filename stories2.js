// v7 batch: Pre-K "Awakening", more Kindergarten stories + lessons, and new Grade 1-2 stories.
// q = solo-mode comprehension taps: [question, [choices], index of right answer]
S.push(
// ---------- Pre-K · Awakening (read WITH an adult: you read, child points and echoes) ----------
{id:'a1',lvl:'Pre-K · Awakening · echo me',g:0.1,t:'I See',focus:'pointing to words, "I see"',
 text:`I see a sun. ☀️
I see a dog. 🐶
I see a cup. 🥤
I see a bug. 🐞
I see Mom.
Mom sees me!`,
 hook:'I see, I see, and someone sees me!',
 takeaway:'Words go left to right, one word for each tap. Being seen and loved is the best part of reading together.',
 coach:['Warm-up: point to each word as you say it, slowly. Let her finger ride on top of yours.','You read a line, she echoes it. Swap Mom for any name she loves.','Celebrate the pointing, not the reading: "You touched every word!"'],
 talk:['What do you see right now?','Who sees you every day?'],words:['I','see','sun','dog','cup','bug'],
 q:[['What did we see that is in the sky?',['sun','cup','bug'],0],['Who sees me?',['Mom','a bug','a cup'],0]]},
{id:'a2',lvl:'Pre-K · Awakening · sound play',g:0.12,t:'Mmm, Mmm, Mmm',focus:'letter sound /m/',
 text:`M says mmm.
Mmm, moon. 🌙
Mmm, milk. 🥛
Mmm, mouse. 🐭
Mmm, muffin.
Mmm, yum!`,
 hook:'M says mmm, like something yummy.',
 takeaway:'Every letter makes a sound. M hums like "mmm" when food tastes good.',
 coach:['Warm-up: rub your tummy and hum "mmm." That hum is the letter M.','Say each word slowly with a long mmm at the start.','Find something in the room that starts with mmm.'],
 talk:['What food makes you say mmm?','Can you think of a name that starts with mmm?'],words:['M','moon','milk','mouse','muffin','yum'],
 q:[['What sound does M make?',['mmm','sss','t-t-t'],0],['Which one starts with mmm?',['moon','sun','dog'],0]]},
{id:'a3',lvl:'Pre-K · Awakening · body rhythm',g:0.14,t:'Up and Down',focus:'opposites, movement words',
 text:`Up, up, up! 🙌
Down, down, down. 👇
Big, big, big!
Small, small, small.
Fast, fast, fast!
Slow… slow… slow…
Stop.
Hug!`,
 hook:'Up and down, big and small, a hug is the best of all.',
 takeaway:'Opposites are pairs: up and down, fast and slow. Moving your body helps words stick.',
 coach:['Warm-up: stand up. Act out each word as you read it.','Read "fast" quickly and "slow" very slowly. Rhythm teaches meaning.','End with a real hug.'],
 talk:['What is the opposite of hot?','Show me big, then small.'],words:['up','down','big','small','fast','slow','stop'],
 q:[['What is the opposite of up?',['down','big','fast'],0],['What did we do at the end?',['hug','run','sleep'],0]]},
{id:'a4',lvl:'Pre-K · Awakening · counting song',g:0.16,t:'One Duck, Two Ducks',focus:'counting 1-5, the word "duck"',
 text:`One duck. 🦆
Two ducks. 🦆🦆
Three ducks swim.
Four ducks dip.
Five ducks say,
"Quack, quack, QUACK!"`,
 hook:'One, two, three, four, five: quack and swim, the ducks are alive!',
 takeaway:'Numbers tell how many. Adding an s (ducks) means more than one.',
 coach:['Warm-up: count her fingers to five.','Hold up fingers for each line. Let her shout the quacks.','Point out the s on "ducks": s means more than one.'],
 talk:['How many ducks said quack?','What else can you count to five?'],words:['one','two','three','four','five','duck','quack'],
 q:[['How many ducks at the end?',['five','two','one'],0],['What do ducks say?',['quack','moo','woof'],0]]},
{id:'a5',lvl:'Pre-K · Awakening · goodnight lull',g:0.18,t:'Night, Night',focus:'repeated phrase, calm reading',
 text:`Night, night, sun.
Night, night, tree.
Night, night, cat.
Night, night, me.
The moon is up.
Shh… shh… shh.`,
 hook:'Night, night, sun. Night, night, me.',
 takeaway:'Saying goodnight to the world helps your body calm down for sleep.',
 coach:['Warm-up: read in a whisper voice. Soft voices teach that print can be calm too.','Let her fill in the last word of each line.','Say goodnight to three real things in her room.'],
 talk:['What do you say goodnight to?','What comes out at night?'],words:['night','sun','tree','cat','me','moon'],
 q:[['What is up at night?',['the moon','the sun','a duck'],0],['What do we say?',['Night, night','Good morning','Quack'],0]]},
{id:'a6',lvl:'Pre-K · Awakening · letter hunt',g:0.2,t:'Where Is B?',focus:'letter B, /b/ sound',
 text:`B is for ball. ⚽
B is for bear. 🐻
B is for bus. 🚌
B, b, b!
Big B, little b.
Bounce, bounce, bounce!`,
 hook:'Big B, little b, bounce with me!',
 takeaway:'Letters come in big (uppercase) and little (lowercase) shapes. B and b both say /b/.',
 coach:['Warm-up: pop your lips: /b/ /b/ /b/. Feel the little puff of air.','Point to the big B and the little b. Same sound, two shapes.','Try the Letters game afterward to match B with b.'],
 talk:['What else starts with /b/?','Can you draw a big B in the air?'],words:['B','ball','bear','bus','big','little'],
 q:[['Which one starts with B?',['bear','cat','sun'],0],['What sound does B make?',['/b/','/m/','/s/'],0]]},
// ---------- Kindergarten: short lessons ----------
{id:'kl1',lvl:'K · Lesson · letter sounds (s, a, t, p)',g:0.3,t:'Lesson: Four Sounds Make Words',focus:'letter sounds s a t p, blending',
 text:`s says sss, like a snake.
a says a, like an apple.
t says t, like a tap.
p says p, like a pop.
s-a-t, sat.
p-a-t, pat.
t-a-p, tap.
s-a-p, sap.
Four sounds, so many words!`,
 hook:'Say the sounds, then smoosh them together.',
 takeaway:'Blending: say each letter sound, then push them together fast to make a word.',
 coach:['Warm-up: make each sound with an action: snake hand for s, bite an apple for a, tap for t, pop for p.','For s-a-t, slide your finger under the letters as you blend faster and faster.','Let her make a new word by swapping one letter.'],
 talk:['Which word can you make with p, a, t?','What other sound would you like to learn?'],words:['sat','pat','tap','sap'],
 q:[['s-a-t makes…',['sat','tap','pig'],0],['What sound does s make?',['sss','mmm','p'],0]]},
{id:'kl2',lvl:'K · Lesson · sight words (the, a, is, I, see)',g:0.35,t:'Lesson: Snap Words',focus:'high-frequency sight words',
 text:`Some words we just know. Snap!
the. Snap!
a. Snap!
is. Snap!
I. Snap!
see. Snap!
I see the cat.
The cat is big.
I see a hat.
Snap, snap, I can read that!`,
 hook:'Snap words: see them, snap them, know them!',
 takeaway:'Sight words show up in almost every book. Knowing them by sight makes reading faster.',
 coach:['Warm-up: write the five words on paper. Snap your fingers when she reads one.','Read the sentences together, then let her try them alone.','Hunt for "the" in any other book. It is everywhere!'],
 talk:['Which snap word is the easiest?','Can you find "the" on a cereal box?'],words:['the','a','is','I','see'],
 q:[['Which is a snap word?',['the','zebra','muffin'],0],['The cat is…',['big','blue','sad'],0]]},
{id:'kl3',lvl:'K · Lesson · CVC word ladder (short o, u, e)',g:0.45,t:'Lesson: The Word Ladder',focus:'CVC words, changing one sound',
 text:`Hop on the word ladder!
hot, change the h to p… pot!
pot, change the o to e… pet!
pet, change the p to w… wet!
wet, change the e to i… wit!
wit, change the w to s… sit!
sun, change the s to b… bun!
bun, change the n to g… bug!
bug, change the b to h… hug!
Top of the ladder. Hug!`,
 hook:'Change one sound, climb one step.',
 takeaway:'Change one letter and you get a new word. Every word is made of sounds you can swap.',
 coach:['Warm-up: say "hot." Now say it with /p/ instead of /h/. That is pot!','Write each word on a ladder drawing and climb with a finger.','Let her invent the next step.'],
 talk:['What word comes after hug if you change h to m?','Which step was hardest?'],words:['hot','pot','pet','wet','sit','sun','bun','bug','hug'],
 q:[['hot, change h to p…',['pot','pet','hug'],0],['What was at the top of the ladder?',['hug','sun','pet'],0]]},
{id:'kl4',lvl:'K · Lesson · rhyme time',g:0.5,t:'Lesson: Rhyme Train',focus:'rhyming families -at, -en, -op, -ug',
 text:`All aboard the rhyme train! Choo choo!
Car one: cat, hat, bat, mat.
Car two: hen, ten, pen, men.
Car three: hop, top, mop, pop.
Car four: bug, rug, mug, hug.
Rhymes sound the same at the end.
Choo choo, rhyme with a friend!`,
 hook:'Same at the end? Then it is a rhyme, my friend!',
 takeaway:'Rhyming words share the same ending sound. If you can read cat, you can read hat, bat, and mat.',
 coach:['Warm-up: "Does cat rhyme with hat? With dog?" Thumbs up or down.','Read one train car at a time. Underline the shared ending.','Make a fifth car together.'],
 talk:['What rhymes with "sun"?','Can you make up a silly rhyme?'],words:['cat','hen','hop','bug','rhyme'],
 q:[['Which rhymes with cat?',['hat','hen','bug'],0],['Which rhymes with bug?',['rug','top','ten'],0]]},
// ---------- Kindergarten: stories ----------
{id:'k5',lvl:'K · Decodable (short o) · knock-knock bounce',g:0.55,t:'Dot the Fox',focus:'short o, CVC words',
 text:`Dot is a fox.
Dot has a box.
Knock, knock! Not a sock.
Knock, knock! Not a rock.
Dot lifts the top.
Pop! Hop! Hop!
A frog in a box!
The frog and the fox
hop, hop, hop on a log.`,
 hook:'Knock, knock, open the box, and find a friend for the fox!',
 takeaway:'Short o says /o/, like "fox." Being curious can lead to a new friend.',
 coach:['Warm-up: open your mouth wide like a doctor visit: /o/. Say fox, box, top.','Knock on the table for each "knock."','Ask her to guess what is in the box before the end.'],
 talk:['What did Dot find in the box?','What would you want to find in a box?'],words:['fox','box','sock','rock','top','hop','frog','log'],
 q:[['What was in the box?',['a frog','a sock','a rock'],0],['Who is Dot?',['a fox','a frog','a dog'],0]]},
{id:'k6',lvl:'K · Decodable (short u) · rainy rhythm',g:0.6,t:'Mud Fun',focus:'short u, CVC words',
 text:`Rain, rain. Drip, drip.
Up pops the sun!
Gus runs to the mud.
Jump! Jump! Thump!
Mud on his legs.
Mud on his tum.
Mud on the pup!
Rub, rub, scrub in the tub.
Mud is fun. The tub is fun too.`,
 hook:'Jump in the mud, scrub in the tub!',
 takeaway:'Short u says /u/, like "mud." Getting messy is okay when you clean up after.',
 coach:['Warm-up: /u/ like you are lifting something heavy: uh! Say mud, pup, tub.','Read "Jump! Jump! Thump!" with a jump on each word.','Point out: rain first, then sun, then mud. Order matters.'],
 talk:['What happens first, the rain or the mud?','Do you like puddles?'],words:['sun','Gus','mud','jump','pup','rub','tub'],
 q:[['Where did Gus jump?',['in the mud','in a box','on a log'],0],['How did Gus get clean?',['in the tub','in the rain','with a fox'],0]]},
{id:'k7',lvl:'K · Decodable (short e) · market call',g:0.65,t:'Ten Red Hens',focus:'short e, counting',
 text:`Ten red hens get set.
Peck, peck, peck.
Ten red hens get wet.
Peck, peck, peck.
Ten red hens rest in a nest.
Ten red eggs!
Yes, yes, yes!
The best nest is a nest that is shared.`,
 hook:'Peck, peck, peck. Share the nest, that is best!',
 takeaway:'Short e says /e/, like "hen." Sharing a space can be the best kind of home.',
 coach:['Warm-up: /e/ like a creaky door: eh. Say hen, red, ten.','Peck with your fingers on the "peck" lines.','Count the hens together on your fingers.'],
 talk:['How many eggs were there?','What do you share with your family?'],words:['ten','red','hen','set','wet','peck','nest','yes','best'],
 q:[['How many hens?',['ten','two','five'],0],['What color are the hens?',['red','blue','green'],0]]},
{id:'k8',lvl:'K · Sight words · gentle science',g:0.7,t:'The Seed',focus:'sight words: the, is, it, can, look',
 text:`Look! It is a seed.
The seed is in the dirt.
The rain can come.
The sun can come.
Look! It is a sprout.
Look! It is a stem.
Look! It is a flower.
It was a seed. It can grow. So can you!`,
 hook:'Rain and sun, a seed can grow. So can you!',
 takeaway:'Plants need water, sun, and soil to grow. People grow a little every day too.',
 coach:['Warm-up: read the snap words "look," "it," "is" on a card first.','Use your hand as a seed and slowly open it into a flower.','If you can, plant a bean in a cup together this week.'],
 talk:['What does a seed need to grow?','How have you grown since last year?'],words:['look','seed','dirt','rain','sun','sprout','stem','flower'],
 q:[['What does a seed need?',['rain and sun','a box','a hat'],0],['What did the seed become?',['a flower','a frog','a rock'],0]]},
{id:'k9',lvl:'K · Decodable mix · feelings',g:0.75,t:'Big Mad, Little Mad',focus:'CVC words, naming feelings',
 text:`Jen is mad. Big, big mad!
Her face is hot. Her hands are fists.
Jen sits. Jen stops.
In, in, in, a big breath.
Out, out, out.
Now Jen is a little mad.
In, in, out, out.
Jen is not mad. Jen is glad.`,
 hook:'Breathe in, breathe out. Big mad gets small.',
 takeaway:'Feelings are okay. Slow breaths can shrink a big feeling so you can think again.',
 coach:['Warm-up: practice one slow breath together: in for 3, out for 3.','Breathe for real on the in/out lines.','Name a time you felt big mad. Kids love hearing that adults do too.'],
 talk:['What helps you when you feel mad?','Where do you feel mad in your body?'],words:['Jen','mad','big','hot','sits','stops','glad'],
 q:[['What did Jen do to feel better?',['took breaths','yelled','ran away'],0],['How did Jen feel at the end?',['glad','mad','sleepy'],0]]},
{id:'k10',lvl:'K · Decodable mix · night sky (Star Fleet!)',g:0.8,t:'The Moon Is Not a Lamp',focus:'CVC + sight words, space fact',
 text:`At night, I look up.
The moon is big and white.
Is the moon a lamp? No!
The moon has no light of its own.
The sun shines on the moon.
The moon is like a mirror in the sky.
It glows back at us.
Hi, moon! Thank you, sun!`,
 hook:'The moon is a mirror. The sun is the light.',
 takeaway:'The moon does not make its own light. It reflects sunlight, like a mirror.',
 coach:['Warm-up: shine a flashlight on a spoon or mirror. The spoon "glows" too.','Read "No!" with a big shake of the head.','Go outside tonight and look for the moon.'],
 talk:['Where does the moon get its light?','What shape is the moon tonight?'],words:['night','moon','white','lamp','light','sun','mirror'],
 q:[['Does the moon make its own light?',['No','Yes'],0],['The moon is like a…',['mirror','lamp','box'],0]]},
{id:'k11',lvl:'K · Pattern book · kitchen helper',g:0.85,t:'I Can Help',focus:'"I can" pattern, verbs',
 text:`I can wash the plum.
I can mix the jam.
I can set the cups.
I can wipe the mess.
I can not reach the top.
Dad can!
Dad can lift. I can help.
Help is a gift we give.`,
 hook:'I can help. Help is a gift.',
 takeaway:'Everyone can help in their own way, and asking for help is okay too.',
 coach:['Warm-up: act out each "I can" with your hands.','Notice the pattern so she can predict each line.','Pick one real job she can do tonight.'],
 talk:['What can you help with at home?','What is something you need help with?'],words:['wash','plum','mix','jam','cups','wipe','help'],
 q:[['Who could reach the top?',['Dad','the cat','me'],0],['Help is a…',['gift','plum','mess'],0]]},
// ---------- Grade 1 ----------
{id:'g1x',lvl:'Grade 1 · Story · chugging train rhythm',g:1.1,t:'The Little Snowplow',focus:'digraphs sh, ch, and blends',
 text:`Chug, chug, push! went the little snowplow.
The snow was deep on Shady Street.
Big trucks said, "You are too small."
But the little plow did not stop.
Chug, chug, push! It made a path to the school.
Chug, chug, push! It made a path to the shop.
By morning the kids could walk and the bus could go.
Small and steady still gets the job done.`,
 hook:'Chug, chug, push! Small and steady gets it done.',
 takeaway:'Sh and ch are two letters that make one sound. Being small does not mean you cannot do big work.',
 coach:['Warm-up: "sh" is a quiet finger-on-lips sound; "ch" is a train sound. Practice both.','Read "Chug, chug, push!" together like a train every time.','Ask: why did the trucks think it could not help?'],
 talk:['When did you do something people thought was too big for you?','Why did the path matter for the kids?'],words:['chug','push','plow','Shady','school','shop','steady'],
 q:[['What did the plow clear?',['snow','leaves','sand'],0],['What did the big trucks say?',['You are too small','Good job','Go home'],0]]},
{id:'g1y',lvl:'Grade 1 · Informational · busy buzz',g:1.3,t:'Bees Have a Job',focus:'nonfiction facts, long e (ee)',
 text:`Bzz, bzz! A bee lands on a flower.
She sips sweet nectar and gets yellow dust on her legs.
That dust is pollen.
She flies to the next flower, and some pollen falls off.
That helps the flower make seeds and fruit.
Apples, berries, and pumpkins need help from bees.
So when you see a bee, be calm and let her work.`,
 hook:'Flower to flower, the bees give us food power.',
 takeaway:'Bees carry pollen between flowers, which helps plants make fruit we eat.',
 coach:['Warm-up: "ee" says its name: bee, see, sweet, seeds.','Draw two flowers and move a finger "bee" between them.','Ask her to retell the steps in order.'],
 talk:['Name a food that needs bees.','What should you do if a bee is near?'],words:['bee','flower','nectar','pollen','seeds','fruit','calm'],
 q:[['What is the yellow dust called?',['pollen','sugar','sand'],0],['What should you do near a bee?',['be calm','swat it','yell'],0]]},
{id:'g1z',lvl:'Grade 1 · Folk tale · call and answer',g:1.6,t:'The Stone Soup Pot',focus:'story sequence, sharing',
 text:`A tired traveler came to a quiet town with only a pot and a stone.
"I will make stone soup," she said. "It would be better with a carrot."
A boy brought a carrot.
"It would be better with an onion." A grandma brought an onion.
"It would be better with beans." A farmer brought beans.
Soon the whole town sat together, sipping soup.
"It was just a stone," the traveler smiled. "You made it a feast."`,
 hook:'One stone, many hands, one big feast.',
 takeaway:'When everyone gives a little, a group can make something none of them could make alone.',
 coach:['Warm-up: preview "traveler" and "feast."','Read the "It would be better with…" lines in a sing-song voice.','Ask her to list what each person brought, in order.'],
 talk:['What would you add to the soup?','What can your family make together?'],words:['traveler','stone','carrot','onion','beans','together','feast'],
 q:[['What was in the pot first?',['a stone','a carrot','beans'],0],['Who made the feast?',['the whole town','just the boy','nobody'],0]]},
// ---------- Grade 2 ----------
{id:'g2x',lvl:'Grade 2 · Informational · desert stillness',g:2.1,t:'How the Desert Tortoise Waits',focus:'nonfiction, cause and effect (Utah!)',
 text:`In the hot desert of southern Utah lives a patient animal: the desert tortoise.
When summer sun bakes the sand, the tortoise digs a burrow and rests in the cool dark.
When rain finally falls, it drinks deeply and can store water in its body for months.
It eats flowers, grasses, and cactus fruit, slowly, carefully.
A desert tortoise can live more than fifty years.
Its secret is not speed. Its secret is knowing when to wait.`,
 hook:'Not fast, but wise: know when to wait.',
 takeaway:'Desert tortoises survive heat by resting underground and storing water. Patience can be a survival skill.',
 coach:['Warm-up: preview "burrow," "patient," "store."','Read slowly. The rhythm should feel like a tortoise walking.','Ask: what causes the tortoise to dig? (the heat)'],
 talk:['When is waiting a smart choice?','Why is it illegal to take a desert tortoise home?'],words:['desert','tortoise','patient','burrow','store','cactus','secret'],
 q:[['Where does the tortoise rest in summer?',['in a burrow','in a tree','in a river'],0],['What is its secret?',['knowing when to wait','running fast','flying'],0]]},
{id:'g2y',lvl:'Grade 2 · Story · tick-tock suspense',g:2.4,t:'The Broken Clock Tower',focus:'problem and solution, -ck and -tch',
 text:`Every hour, the town clock tower rang. Bong! Bong!
One morning, it was silent. Tick… nothing. Tock… nothing.
People were late for the bakery, the bus, and the dentist.
Mira climbed the stairs with her grandpa, who used to fix watches.
Inside, a pigeon had built a nest right against the gears.
They gently moved the nest to a safe ledge.
Tick, tock, BONG! The town cheered, and the pigeon cooed.
Sometimes a big problem has a small, gentle fix.`,
 hook:'Tick, tock: look closely. Big problems can have small fixes.',
 takeaway:'Looking closely at a problem helps you find the real cause, and the kindest fix.',
 coach:['Warm-up: find words with -ck and -tch: tick, tock, clock, watches.','Read the silent part slowly, then BONG loudly.','Ask: what was the real problem, and how did they solve it kindly?'],
 talk:['Have you ever found a small cause of a big problem?','Why did they move the nest instead of removing it?'],words:['clock','tower','silent','bakery','gears','pigeon','ledge'],
 q:[['What stopped the clock?',['a pigeon nest','the rain','a cat'],0],['Who helped Mira?',['her grandpa','a baker','the bus driver'],0]]},
{id:'g2z',lvl:'Grade 2 · Poem · skipping rhyme',g:2.6,t:'Jump Rope Planets',focus:'rhythm, planet order',
 text:`Mercury's quick and Venus is hot,
Earth is the home with the oceans we've got.
Mars is rusty and Jupiter's grand,
Saturn has rings like a sparkly band.
Uranus rolls on its side, so they say,
Neptune is windy and far, far away.
Eight little planets, around and around,
Jump to the sun and then back to the ground!`,
 hook:'Eight little planets, around and around!',
 takeaway:'The eight planets in order from the sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
 coach:['Warm-up: clap a steady beat. Every line has four strong claps.','If you have a jump rope, jump it while chanting!','Ask her to name the planets in order without looking.'],
 talk:['Which planet would you visit?','Why is Earth special?'],words:['Mercury','Venus','Jupiter','Saturn','Uranus','Neptune','planets'],
 q:[['Which planet has rings like a band?',['Saturn','Mars','Earth'],0],['How many planets?',['eight','three','twenty'],0]]}
);
