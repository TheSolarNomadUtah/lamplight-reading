// v7 batch: Grades 3-5, built for solo reading too.
// Story format (all fields optional except id,lvl,g,t,text):
//  tags: interests for filtering / future personalized stories, e.g. ['space','animals','mystery']
//  hero: optional name slot. Reserved: later, {name} in text can be filled in for personalized stories.
//  q: solo comprehension taps [question,[choices],rightIndex]
S.push(
// ---------- Grade 3 ----------
{id:'g3x',lvl:'Grade 3 · Mystery · clue-by-clue',g:3.1,t:'The Case of the Missing Muffins',focus:'inference, using clues',tags:['mystery','humor','food'],
 text:`Every Saturday, Grandma Rosa baked twelve blueberry muffins and set them on the windowsill to cool.
This Saturday, when she came back, only nine were left.
"A mystery," said Leo, grabbing his notebook. "Detectives need clues."
Clue one: blue crumbs led across the sill and down the outside wall.
Clue two: the window screen had a small, neat hole in one corner.
Clue three: tiny muddy prints, each with five long fingers, dotted the porch railing.
Leo's little sister guessed the dog. But the dog was asleep inside, and dogs cannot climb walls.
Leo looked at the prints again. Five fingers. Climbing. A taste for treats. Out at dawn.
"Raccoon," he announced, and that night they spotted a masked face peeking from the old oak tree.
Grandma Rosa fixed the screen and laughed. "Next week, I will bake thirteen. One for the thief."`,
 hook:'Clue by clue, the truth comes through.',
 takeaway:'Detectives (and scientists) use evidence, not guesses. Each clue rules something in or out.',
 coach:['Warm-up: what is a clue? Preview "evidence," "announced," "dawn."','Stop after clue three and let her guess before reading on.','Ask: which clue ruled out the dog?'],
 talk:['Which clue was the most important?','What would you bake for a raccoon?'],words:['mystery','detective','clues','screen','railing','raccoon','announced'],
 q:[['How many muffins were missing?',['three','nine','twelve'],0],['Who took the muffins?',['a raccoon','the dog','Leo'],0],['Why was it not the dog?',['dogs cannot climb walls','the dog was full','the dog was outside'],0]]},
{id:'g3y',lvl:'Grade 3 · Science · how-it-works',g:3.3,t:'Why Your Breath Makes Clouds',focus:'cause and effect, science vocabulary',tags:['science','weather'],
 text:`On a cold morning, you breathe out and a little cloud appears. Are you a dragon? Not quite.
Your breath is warm and full of water vapor, which is water in the form of an invisible gas.
When that warm breath hits cold air, the vapor cools quickly.
Cool water vapor turns back into tiny droplets of liquid water. This is called condensation.
Millions of droplets together are big enough to see, so they look like a small cloud.
Real clouds in the sky form the same way: warm, wet air rises, cools, and condenses.
On a hot day, your breath is still full of water. The air is just too warm for it to condense.
So the next time you puff a cloud, you can say, "I just made weather."`,
 hook:'Warm meets cold, and water vapor shows.',
 takeaway:'Condensation happens when warm water vapor cools into tiny droplets. Your breath and sky clouds work the same way.',
 coach:['Warm-up: breathe on a cold glass or mirror and watch it fog.','Ask her to explain condensation in her own words.','Draw: warm breath, cold air, droplets.'],
 talk:['Where else have you seen condensation?','Why can you not see your breath in summer?'],words:['vapor','invisible','droplets','condensation','condense','millions'],
 q:[['What is the cloud from your breath made of?',['tiny water droplets','smoke','dust'],0],['What is this process called?',['condensation','evaporation','melting'],0]]},
{id:'g3z',lvl:'Grade 3 · Adventure · steady climb',g:3.5,t:'Up Timpanogos',focus:'sequence, perseverance',tags:['adventure','outdoors','utah'],
 text:`Ava's legs burned. The trail up Mount Timpanogos switched back and forth like a zipper on the mountainside.
"How much farther?" she asked her uncle for the third time.
"Look how far you've come instead," he said, pointing down. The parking lot was a tiny gray stamp.
They passed a waterfall that sprayed rainbows, and a meadow so full of wildflowers it looked painted.
Near the top, a mountain goat stood on a ledge and stared at them like a bored lifeguard.
The last stretch was rocky and steep. Ava counted steps: twenty, then rest; twenty, then rest.
At the summit, wind whipped her hair, and all of Utah Valley spread out below, lakes shining like coins.
"I didn't think I could do it," she said.
"Nobody climbs a mountain all at once," said her uncle. "You climbed it twenty steps at a time."`,
 hook:'Twenty steps, then rest. That is how mountains are climbed.',
 takeaway:'Big goals are reached by breaking them into small steps and noticing how far you have come.',
 coach:['Warm-up: preview "switched back," "summit," "meadow."','Read the counting line slowly, like climbing.','Ask: what changed Ava\'s mind about quitting?'],
 talk:['What big goal could you break into small steps?','What would you most want to see on a hike?'],words:['trail','switched','waterfall','meadow','ledge','summit','valley'],
 q:[['What animal did they see?',['a mountain goat','a bear','a moose'],0],['How did Ava climb the steep part?',['twenty steps at a time','by running','her uncle carried her'],0]]},
{id:'g3w',lvl:'Grade 3 · Humor · tall tale swagger',g:3.7,t:'The Day Gravity Took a Nap',focus:'exaggeration, cause and effect',tags:['humor','science','space'],
 text:`Nobody knows why, but one Tuesday at 10:14 a.m., gravity took a nap.
Pencils floated off desks. Mr. Patel's coffee rose out of its mug in a wobbly brown ball.
Kids drifted to the ceiling, giggling, while the class hamster spun like a fuzzy planet.
At first it was the best day ever. Then lunch floated away. Then the principal floated away.
The school's flag pole kept everyone from drifting into space, because Maya had tied a jump rope to it.
"Without gravity," Maya shouted, "nothing stays put! Not air, not oceans, not us!"
Everyone held hands in a long, floating chain and chanted, "Wake up, gravity! Wake up!"
At 10:31, gravity yawned, stretched, and turned back on. Thump. Splash. Squeak.
Mr. Patel wiped coffee off his glasses. "Well," he said, "that is today's science lesson."`,
 hook:'Gravity holds the world together, even when nobody notices.',
 takeaway:'Gravity pulls everything toward Earth: us, the air, and the oceans. A tall tale exaggerates to make a real idea memorable.',
 coach:['Warm-up: drop a pencil. What pulled it down?','Read the floating parts with a light, bouncy voice and the "Thump" loudly.','Ask: which parts could really happen, and which are exaggerated?'],
 talk:['What would you do if gravity napped for five minutes?','Why do astronauts float?'],words:['gravity','floated','wobbly','drifted','principal','chanted','yawned'],
 q:[['What stopped working?',['gravity','the lights','the clocks'],0],['What kept kids from floating to space?',['a jump rope on the flag pole','the hamster','a big net'],0]]},
// ---------- Grade 4 ----------
{id:'g4x',lvl:'Grade 4 · History · brave, steady cadence',g:4.1,t:'The Code Talkers',focus:'history, main idea',tags:['history','language','heroes'],
 text:`During World War II, armies listened in on each other's radio messages, so secret codes mattered.
Many codes were cracked. One was never broken: the code spoken by Navajo Marines.
The Navajo language was complex, rarely written down, and spoken by very few people outside the Navajo Nation.
Code talkers built a code on top of it. A tank became "chay-da-gahi," turtle. A submarine became "besh-lo," iron fish.
They could send a message in minutes that took machines half an hour to encode.
In the battle of Iwo Jima, code talkers sent more than eight hundred messages without a single error.
What makes the story remarkable is that, years earlier, many of these men had been punished in boarding schools for speaking Navajo.
The language some had tried to erase helped protect the country.
Their work stayed secret until 1968. Today, they are honored with Congressional Gold Medals.`,
 hook:'A language is a treasure. Never let it be erased.',
 takeaway:'Navajo code talkers used their language to create an unbreakable code. Every language carries knowledge worth protecting.',
 coach:['Warm-up: preview "complex," "encode," "remarkable."','Have her find the main idea sentence.','Ask: why is the boarding school detail important?'],
 talk:['What words would you make up for a secret code?','Why should languages be protected?'],words:['radio','cracked','complex','submarine','encode','error','remarkable'],
 q:[['What was a tank called in the code?',['turtle','iron fish','eagle'],0],['Was the code ever broken?',['No','Yes'],0]]},
{id:'g4y',lvl:'Grade 4 · Science · deep, slow wonder',g:4.3,t:'Lights at the Bottom of the Sea',focus:'science vocabulary, compare and contrast',tags:['science','ocean','animals'],
 text:`Sunlight fades fast in the ocean. By about 200 meters down, it is dim twilight. By 1,000 meters, it is darker than any night on land.
Yet down there, the water glitters. Many deep-sea animals make their own light, called bioluminescence.
They mix chemicals inside their bodies, a little like cracking a glow stick.
The anglerfish dangles a glowing lure in front of its huge jaws. Small fish swim toward it, thinking it is food.
Some shrimp spit out clouds of glowing goo to confuse attackers, the way a squid squirts ink.
Lanternfish have light spots on their bellies that match the faint light from above, so predators below cannot see their shadow.
Scientists think three out of four deep-sea animals can glow.
In the darkest place on Earth, life did not wait for light. It made its own.`,
 hook:'In the darkest dark, life makes its own light.',
 takeaway:'Bioluminescence lets deep-sea animals hunt, hide, and escape by making their own light through chemistry.',
 coach:['Warm-up: preview "bioluminescence" by splitting it: bio (life) + lumin (light).','Make a table: animal, how it glows, why.','Ask: how is the lanternfish\'s trick like camouflage?'],
 talk:['If you could glow, how would you use it?','Why do you think so much of the ocean is unexplored?'],words:['twilight','bioluminescence','chemicals','anglerfish','lure','predators','lanternfish'],
 q:[['What is bioluminescence?',['animals making their own light','sunlight in water','a kind of fish food'],0],['How does the anglerfish use light?',['a lure to catch fish','to read','to warm up'],0]]},
{id:'g4z',lvl:'Grade 4 · Mystery · eerie, short beats',g:4.4,t:'The Humming Bridge',focus:'problem solving, sound science',tags:['mystery','science','engineering'],
 text:`Every evening at six, the old footbridge over Willow Creek began to hum.
Some kids said it was haunted. Others dared each other to cross it at six sharp.
Priya did not believe in ghosts. She believed in notebooks.
For a week she recorded the time, the weather, and the hum. Calm days: no hum. Windy days: loud hum.
She noticed the hum was loudest when the wind blew straight down the creek, through the bridge's metal railings.
At the library, she learned that wind flowing past thin rods can make them vibrate, the same way blowing across a bottle makes a note.
Six o'clock was simply when the evening wind picked up in the canyon.
She presented her findings to the city council, who wrapped the railings in rope to change their shape.
The bridge went quiet. Some kids missed the ghost. Priya missed nothing. She was already curious about the next mystery.`,
 hook:'Record it, test it, explain it. Mysteries melt under curiosity.',
 takeaway:'Careful observations and patterns can explain "spooky" events. Wind can make metal vibrate and sing.',
 coach:['Warm-up: blow across a bottle to make a note.','Have her list Priya\'s observations in a chart.','Ask: what was the pattern that solved it?'],
 talk:['What "spooky" thing could you investigate?','Why did a notebook help Priya more than guessing?'],words:['footbridge','haunted','recorded','railings','vibrate','canyon','council'],
 q:[['What made the bridge hum?',['wind through the railings','a ghost','trains'],0],['On which days was there no hum?',['calm days','windy days','Mondays'],0]]},
{id:'g4w',lvl:'Grade 4 · Adventure · survival rhythm',g:4.6,t:'Lost in the Corn Maze',focus:'problem solving, figurative language',tags:['adventure','humor','autumn'],
 text:`The sign said "Easy Maze: 20 minutes." Forty minutes later, Marcus and his cousin Jade had seen the same scarecrow three times.
"He's mocking us," Jade whispered. The scarecrow's button eyes did seem smug.
The corn stood twice their height, a rustling green wall in every direction. Their phones had no signal.
Marcus remembered something his dad had told him about mazes: keep one hand on a wall and never let go. You will eventually find the exit.
So they did. Right hand on the corn, step after step, around dead ends and back again.
The sun slid lower, painting the tassels gold. Jade's stomach growled like a bear.
Then they heard it: the crackle of a bonfire and the smell of kettle corn.
They burst out of the maze, sticky with corn silk, to find their parents waiting with cider.
"Easy maze?" Marcus said. "That sign needs to take a long walk in there."`,
 hook:'Keep one hand on the wall and keep going.',
 takeaway:'The wall-follower rule solves many mazes. A simple plan beats panic when you are lost.',
 coach:['Warm-up: draw a small maze and try the right-hand rule on paper.','Find the figurative language: smug scarecrow, growled like a bear.','Ask: why does the wall rule work?'],
 talk:['What would you do if you got lost somewhere?','What is the funniest line?'],words:['scarecrow','mocking','rustling','signal','tassels','bonfire','cider'],
 q:[['What trick got them out?',['keep one hand on the wall','follow the scarecrow','climb the corn'],0],['What did they smell near the exit?',['kettle corn','rain','pizza'],0]]},
// ---------- Grade 5 ----------
{id:'g5x',lvl:'Grade 5 · Science · Star Fleet · measured wonder',g:5.1,t:'How We Found Worlds We Cannot See',focus:'scientific method, data from light',tags:['space','science','star fleet'],
 text:`For most of history, nobody knew whether other stars had planets. They are too far, too faint, and too close to their blinding stars to photograph.
So astronomers stopped trying to see the planets and started watching the stars instead.
When a planet passes in front of its star, it blocks a tiny bit of light, sometimes less than one percent. This is called a transit.
If the star dims by the same amount on a regular schedule, every 3 days or every 365 days, a planet is probably circling it.
The Kepler space telescope stared at about 150,000 stars and found thousands of planets this way.
Amazingly, some transits can be measured with backyard telescopes and careful cameras. Amateur astronomers around the world help confirm discoveries.
From how much light is blocked, scientists estimate the planet's size. From the timing, they learn its orbit.
Today we know of more than 5,000 exoplanets, and some sit in the zone where liquid water could exist.
We found them not by seeing, but by measuring patiently, a lesson for any scientist: sometimes the clue is in what goes missing.`,
 hook:'Sometimes the clue is in what goes missing.',
 takeaway:'The transit method finds planets by measuring tiny, repeating dips in starlight. Even amateurs with backyard telescopes can help.',
 coach:['Warm-up: shine a flashlight, pass a coin in front, and watch the light dip.','Ask: what two things can scientists learn from a transit?','Connect to Star Fleet: citizen scientists really do this.'],
 talk:['Would you want to help discover a planet?','Why does a regular schedule matter?'],words:['astronomers','transit','percent','schedule','amateur','exoplanets','orbit'],
 q:[['What is a transit?',['a planet passing in front of its star','a falling star','a moon eclipse'],0],['What tells scientists the planet\'s size?',['how much light is blocked','its color','its sound'],0]]},
{id:'g5y',lvl:'Grade 5 · History · inventive momentum',g:5.3,t:'The Farm Boy Who Invented Television',focus:'biography, cause and effect (Utah!)',tags:['history','inventors','utah','science'],
 text:`In 1921, a fourteen-year-old Utah-born boy named Philo Farnsworth was plowing a potato field in Idaho, row after row after row.
Looking back at the neat parallel lines, he had an idea: what if a picture could be broken into lines, sent through the air as electricity, and rebuilt on a screen, line by line?
He sketched his idea for his high school chemistry teacher, who kept the drawing.
Years later, in a small lab in San Francisco, Farnsworth and his team transmitted the first fully electronic television image in 1927: a single straight line.
A giant company later claimed it had invented television first. Farnsworth's teacher's old drawing helped prove the idea was his.
Farnsworth earned many patents, but he grew frustrated watching TV fill up with things he thought wasted its potential.
Late in life, he was glad to see one broadcast: astronauts walking on the moon in 1969, shown on screens built from his idea.
His story shows that big ideas can come from ordinary moments, and that keeping records protects your work.`,
 hook:'Row by row, line by line, an idea grows.',
 takeaway:'Philo Farnsworth, born in Utah, imagined electronic TV while plowing a field. Ordinary moments can spark inventions, and records protect ideas.',
 coach:['Warm-up: preview "parallel," "transmitted," "patents," "potential."','Make a timeline from 1921 to 1969.','Ask: why did the teacher\'s drawing matter so much?'],
 talk:['What ordinary thing could spark an invention?','How should TV or the internet be used well?'],words:['plowing','parallel','electricity','transmitted','electronic','patents','potential'],
 q:[['Where did Farnsworth get his idea?',['plowing a field','at the movies','in a dream'],0],['What helped prove the idea was his?',['his teacher\'s drawing','a photo','a letter from NASA'],0]]},
{id:'g5z',lvl:'Grade 5 · Mystery · noir-lite, clipped sentences',g:5.4,t:'The Library Ghost Who Wasn\'t',focus:'inference, red herrings',tags:['mystery','humor','books'],
 text:`It started with the books. Every morning, the librarian found three or four on the floor of the history aisle. Always the history aisle. Always face down.
Rumors spread faster than lice. "The ghost of old Mr. Thornbury," the fifth graders whispered. He had donated the history collection in 1952.
Nadia wasn't buying it. Ghosts were a theory with no evidence.
She checked the facts. The doors were locked at night. The alarm never went off. The fallen books were random: wars, castles, a cookbook from colonial times.
Red herring number one: a cold draft near the aisle. That turned out to be a broken vent. Nothing to do with books.
Then Nadia noticed the shelf itself. It leaned slightly forward. And the building's heating system clicked on every morning at 5 a.m., rattling the floor.
She stacked a book near the edge, waited until morning, and checked the security camera with the librarian.
At 5:02 a.m., the heater rumbled. The shelf shivered. The book slid, tipped, and fell, face down.
The custodian leveled the shelf with two wooden shims. The ghost of Mr. Thornbury retired, and Nadia started a detective club that met, of course, in the history aisle.`,
 hook:'No evidence, no ghost. Test it and see.',
 takeaway:'Good thinkers separate evidence from rumors, rule out red herrings, and test their explanation.',
 coach:['Warm-up: what is a red herring? (a clue that misleads)','Pause before the camera part. Let her predict the cause.','Ask: how did Nadia test her idea?'],
 talk:['Why do rumors spread so fast?','What clue would you have checked first?'],words:['librarian','rumors','donated','theory','evidence','herring','custodian'],
 q:[['What made the books fall?',['a leaning shelf shaken by the heater','a ghost','a cat'],0],['What was the cold draft?',['a broken vent','the ghost','an open window'],0],['How did Nadia prove it?',['a test and the security camera','she asked the ghost','she guessed'],0]]},
{id:'g5w',lvl:'Grade 5 · Humor · letters back and forth',g:5.5,t:'Dear Robot Vacuum',focus:'point of view, persuasive writing',tags:['humor','technology','writing'],
 text:`Dear Robot Vacuum,
I am writing to complain. Yesterday you ate my science fair poster, two socks, and the ears off my drawing of a cat. Please explain.
Sincerely, Owen

Dear Owen,
Thank you for your letter. My job is to clean the floor. Your poster was on the floor. Your socks were on the floor. The cat ears were also, I am sorry to say, on the floor. I simply followed my programming.
Beep, Robot Vacuum

Dear Robot Vacuum,
Fine. But a smart robot should know the difference between trash and treasure.
Owen

Dear Owen,
I can sense walls, stairs, and dirt. I cannot sense what is important to you. Machines only know what people teach them. Perhaps the floor is not the best place for treasure?
Beep (thoughtfully), Robot Vacuum

Dear Robot Vacuum,
Point taken. I put my things away. You may clean in peace.
Owen
P.S. I made you a new science fair poster: "How Robots Think." You are the star.`,
 hook:'Machines only know what people teach them.',
 takeaway:'Robots and AI follow their programming; they do not understand meaning the way people do. Taking responsibility solves many problems.',
 coach:['Warm-up: read it with two voices, one for Owen and a beepy one for the robot.','Ask: how did each character\'s point of view change?','Have her write one more letter from the robot.'],
 talk:['What can a robot know, and what can it not know?','Who was right, Owen or the robot?'],words:['complain','sincerely','programming','difference','treasure','sense','thoughtfully'],
 q:[['What did the robot eat?',['a poster, socks, and cat ears','a sandwich','homework only'],0],['What can the robot NOT sense?',['what is important to Owen','walls','stairs'],0]]}
);
