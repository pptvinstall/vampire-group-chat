// THE VAMPIRE GROUP CHAT — S1E1 "New Blood, Who Dis?" — V7 script / V9 cast
// Shot breakdown: stills (camera setups) and clips in cut order.
const BOARD = {
  chars: {
    E: {
      name: "Eiesha",
      look: "Black teen girl, warm brown eyes, long neat braids with gold cuffs, burgundy-and-mustard sweater, light denim jeans, white sneakers. Guarded, dry, quick-witted.",
      voice: "warm young Black woman, a little weary, dry and smart, natural pace"
    },
    B: {
      name: "Bianca",
      look: "East Asian-American teen girl, long wavy dark hair worn down with purple highlights, olive jacket over a dark top, crystal pendant necklace, small gold hoop earrings, dark cargo pants, white sneakers, alert expressive eyes.",
      voice: "Atlanta-raised young woman, quick understated sarcasm, concern under the jokes, no put-on accent"
    },
    S: {
      name: "Stefon",
      look: "V9 FINAL. Young-looking Black teen male, close Caesar cut with 360 waves, slim gold-wire glasses, clean-shaven, strong brow, broad shoulders, blue-gray casual overshirt open over a white crewneck T-shirt, dark pants, gray-and-white sneakers.",
      voice: "restrained, reflective young Black man, lower-mid register, articulate, old-soul serious",
      lock: "Stefon stays a Black teen with waves and wire glasses, clean-shaven. No beard, no turtleneck, no trench coat, no green coat, no leather. He is not Daymondre."
    },
    D: {
      name: "Daymondre",
      look: "Black man, Stefon's older brother with a clearly different face, short curly taper, goatee, black leather jacket, thick gold bat pendant on a chain, smug half-smile.",
      voice: "smooth low-mid Black male voice, cocky and playful, can turn cold without shouting",
      lock: "Daymondre is the only person in leather and the only one with the gold bat pendant. He and Stefon are brothers, never twins."
    },
    M: {
      name: "Marquell",
      look: "V9 FINAL. Mature-looking late-teen Latino quarterback, curly dark hair, freckles, subtle goatee, athletic build, Creekside Grill dark polo with a burgundy work apron. No varsity jacket.",
      voice: "grounded late-teen Latino athlete, warm, protective, no exaggerated accent"
    },
    V: {
      name: "Vanesha",
      look: "Latina woman, Marquell's older sister, long side-parted dark waves, gold hoop earrings, freckles, black jacket with an ivory stripe down the sleeve, dark top, wide-leg dark jeans.",
      voice: "confident adult Latina, quick and warm, direct, a little vulnerability under the bravado"
    }
  },

  // Cast sheets, made in ChatGPT one at a time. Daymondre goes first and becomes the style anchor.
  sheets: [
    { k: "D", ref: "Daymondre_V9_sheet.png",
      outfit: "Black leather jacket over a black top, thick gold chain with a gold bat pendant, black pants, black boots.",
      faces: "smug half-smile, amused grin, bored shrug, cold stare, delighted",
      extra: "One extra head close-up at the far right of the bottom row: his vampire face. Exact same face and goatee, with red-amber irises, faint dark veins under both eyes and two small fangs. No blood.",
      drop: "Drop the toothpick from the old reference." },
    { k: "S", ref: "Stefon_V9_sheet.png",
      outfit: "Blue-gray casual overshirt, open, over a white crewneck T-shirt. Dark pants. Gray-and-white sneakers. Slim gold-wire glasses in every panel.",
      faces: "calm and unblinking, awkward half-smile, quiet anger, caught and guilty, worried",
      drop: "No vampire panel for Stefon. The old reference is close to photoreal; keep the identity, not the rendering." },
    { k: "E", ref: "Eiesha_V9_face_only.jpg",
      outfit: "Burgundy-and-mustard sweater, light denim jeans, white sneakers, small gold hoop earrings, a backpack on one shoulder in the full-body view.",
      faces: "guarded, dry smirk, small real smile, startled, afraid",
      drop: "The reference shows only her face and braids. It is more cartoon than our look: keep her identity and the braids with gold cuffs, but give her the same grounded proportions and eye size as the Daymondre sheet." },
    { k: "B", ref: "Bianca_V9_sheet.png",
      outfit: "Olive jacket over a dark top, crystal pendant necklace, dark cargo pants, white sneakers. Long dark hair with purple highlights.",
      faces: "deadpan, slow side-eye, suspicious squint, amused, alarmed",
      drop: "No magic effects and no glowing hands. The old reference is close to photoreal; keep the identity, not the rendering." },
    { k: "M", ref: "Marquell_V9_sheet.png",
      outfit: "His Creekside Grill work look is the only outfit: dark polo shirt (blank, no logo), burgundy work apron, dark pants, white sneakers. No varsity jacket, no football uniform.",
      faces: "hopeful grin, innocent and literal, flustered, sincere, scared but steady",
      drop: "Use the old reference for his face, curls, freckles, subtle goatee and build only. The old reference is close to photoreal; keep the identity, not the rendering." },
    { k: "V", ref: "Vanesha_V9_sheet.png",
      outfit: "Black jacket with an ivory stripe down each sleeve, dark top, wide-leg dark jeans, gold hoop earrings.",
      faces: "busy and unbothered, amused, irritated, startled, shaken",
      drop: "No attack-aftermath panel. She and Marquell are siblings: family resemblance, not the same face. The old reference is close to photoreal; keep the identity, not the rendering." }
  ],

  plates: [
    { id: "L1", name: "School exterior, morning",
      desc: "Shadow Creek High: an upscale brick-and-glass suburban high school entrance outside Atlanta. Wide front steps, Georgia pines and crepe myrtles, soft gold early-morning light. A few blurred, faceless students far in the background. A blank sign panel above the doors with no lettering.",
      tone: "morning school ambience, birds, distant voices" },
    { id: "L2", name: "School hallway, morning",
      desc: "The main hallway of the same school: navy-blue lockers with thin gold trim along the left wall, polished pale floor, tall windows along the right wall throwing soft gold morning light. Blurred, faceless students in the far background.",
      tone: "school hallway ambience, locker doors, distant chatter" },
    { id: "L3", name: "Creekside Grill storefront, afternoon",
      desc: "Creekside Grill: a neighborhood grill in a red-brick storefront with a dark awning and big front windows glowing amber. A blank sign panel above the door with no lettering. A small parking lot along the right side of the building. Late-afternoon sun.",
      tone: "quiet street, light traffic", doubles: "04A" },
    { id: "L3D", name: "Creekside Grill storefront, dusk",
      desc: "The exact same storefront and camera angle as plate L3 (attach L3). Only the time changes: sky deep orange fading to blue, window glow stronger, the lot lamp at the right just switched on.",
      tone: "evening street, crickets starting", doubles: "07A" },
    { id: "L4", name: "Creekside Grill interior",
      desc: "Inside Creekside Grill: a dark wood counter with a register along the back wall and a kitchen pass window behind it. A burgundy leather booth by the front window on the left. Amber pendant lights, exposed brick. A side door with a small window at the right end of the counter. Background diners blurred and faceless.",
      tone: "grill room tone, low chatter, kitchen sizzle" },
    { id: "L5", name: "Side parking lot, just after dark",
      desc: "The side parking lot of the same red-brick building just after dark. The grill's side door at the left under a caged wall light. One tall lot lamp casting a warm pool of light. A single dark-gray sedan (Vanesha's car) parked under the lamp. Wet-look asphalt, deep cool-blue night with a last trace of blue in the sky.",
      tone: "night parking lot, distant traffic, a lamp buzzing" },
    { id: "L6", name: "Back service exit, night",
      desc: "The back service exit of the same red-brick building at night. A gray metal door with a caged warm light above it, stacked milk crates, the edge of a dumpster. A brick corner at frame left leads back toward the side lot. Cool-blue night fill.",
      tone: "night, back-of-building hum, distant traffic" }
  ],

  scenes: [
    { n: 1, title: "Shadow Creek High", when: "Morning", tc: "0:00–0:13", strip: "ext-day",
      stills: [
        { id: "01A", plate: "L1", who: ["E", "B"],
          frame: "Wide shot, 35mm look, camera behind and slightly to one side. Both girls seen from behind at a three-quarter angle, walking toward the entrance, small in the frame.",
          moment: "Eiesha on the left with a backpack, Bianca on the right. Faces mostly turned away from camera." },
        { id: "01B", plate: "L1", who: ["E"],
          frame: "Medium close-up, 50mm look, Eiesha walking toward camera. Bianca's shoulder is a soft blur at the right edge, no face.",
          moment: "Holding herself together, eyes forward, tired." },
        { id: "01C", plate: "L1", who: ["B"],
          frame: "Medium close-up, 50mm look, Bianca walking toward camera, matching reverse of STILL 01B.",
          moment: "Glancing sideways toward Eiesha off-frame. Warm and matter-of-fact." }
      ],
      cut: [
        { id: "01A-1", still: "01A", act: "They walk toward the doors at an easy pace. Background students drift.", cam: "Slow, gentle push-in from behind." },
        { id: "01B-1", still: "01B", who: "E", line: "I just wanna get through today without another \"How you holding up?\"", act: "Walking, eyes forward. A small tired exhale, then the line.", cam: "Camera tracks back steadily with her." },
        { id: "01C-1", still: "01C", who: "B", line: "Got you. Creekside after class. Fries, no feelings.", act: "Walking, glances over at Eiesha off-frame, easy and sure.", cam: "Camera tracks back steadily with her." },
        { id: "01B-2", still: "01B", who: "E", line: "That might actually work.", act: "A small real smile breaks through. She glances toward Bianca off-frame.", cam: "Camera tracks back steadily with her." }
      ] },

    { n: 2, title: "Hallway", when: "Morning", tc: "0:13–0:27", strip: "int-day",
      stills: [
        { id: "02A", plate: "L2", who: ["S"],
          frame: "Medium-wide, 35mm look. Stefon walking toward camera down the center of the hallway, blurred students parting around him.",
          moment: "Books under one arm, shoulders stiff, trying very hard to look ordinary." },
        { id: "02B", plate: "L2", who: ["E"],
          frame: "Medium close-up, 50mm look. Eiesha at her open locker on the left wall, looking past camera down the hall.",
          moment: "Curious, half hidden behind the locker door." },
        { id: "02C", plate: "L2", who: ["B"],
          frame: "Medium close-up, 50mm look. Bianca leaning against the lockers, arms crossed, looking past camera down the hall.",
          moment: "Eyes narrowed, studying someone." },
        { id: "02D", plate: "L2", who: ["S"], test: true,
          frame: "Close-up, 85mm look. Stefon stopped mid-hallway, facing straight down the hall, eyes just starting to slide toward camera-left where the girls stand.",
          moment: "Calm, unblinking, a little too still." }
      ],
      cut: [
        { id: "02A-1", still: "02A", act: "He walks toward camera and adjusts his glasses once, eyes scanning the hall.", cam: "Slow dolly back ahead of him." },
        { id: "02B-1", still: "02B", who: "E", line: "Who's the new guy?", act: "She leans out from behind the locker door and says it quietly." },
        { id: "02C-1", still: "02C", who: "B", line: "No idea. But the waves, the glasses? He look like he got a 4.0 and a secret.", act: "Studying him. A small head tilt on \"a secret.\"" },
        { id: "02D-1", still: "02D", who: "S", line: "I can hear you.", act: "He turns his head slowly toward camera-left and says it flat. He does not blink." },
        { id: "02C-2", still: "02C", who: "B", line: "Congratulations. Can you blink?", act: "Deadpan, straight past camera at him. One eyebrow up." }
      ] },

    { n: 3, title: "Hallway", when: "Continuous", tc: "0:27–0:41", strip: "int-day",
      stills: [
        { id: "03A", plate: "L2", who: [],
          inFrame: "Only Eiesha's hand and the cuff of her burgundy-and-mustard sweater. No faces.",
          frame: "Insert close-up, 85mm look, at locker height.",
          moment: "Her phone (plain dark screen, no text) is just slipping out of her fingers." },
        { id: "03B", plate: "L2", who: ["E"], back: ["S"],
          backNote: "the back of his head with waves, the edge of his glasses and his blue-gray shoulder. No face.",
          frame: "Over-the-shoulder, 50mm look: over Stefon's right shoulder onto Eiesha's face.",
          moment: "Stefon holds her phone up between them. Eiesha is startled." },
        { id: "03C", plate: "L2", who: ["S"], back: ["E"],
          backNote: "her braids and one shoulder of her sweater. No face.",
          frame: "Reverse over-the-shoulder, 50mm look: over Eiesha's left shoulder onto Stefon's face.",
          moment: "Holding the phone out to her. Mild, almost apologetic." },
        { id: "03D", plate: "L2", who: ["B"],
          frame: "Tight close-up, 85mm look. Bianca at the lockers.",
          moment: "Side-eye toward the two of them off-frame." }
      ],
      cut: [
        { id: "03A-1", still: "03A", act: "The phone slips and drops out of the bottom of the frame. The hand reacts a beat late.", cam: "Locked camera." },
        { id: "03B-1", still: "03B", who: "E", line: "How'd you get over here so fast?", act: "She looks from the phone to him, then down the hall where he was standing.", ots: "Stefon" },
        { id: "03C-1", still: "03C", who: "S", line: "Good reflexes.", act: "Tiny shrug. He offers the phone.", ots: "Eiesha" },
        { id: "03D-1", still: "03D", who: "B", line: "That's not reflexes. That's Peach Pass on legs.", act: "Slow side-eye, flat delivery, tiny head shake." },
        { id: "03B-2", still: "03B", who: "E", line: "Thanks. Creekside after class?", act: "She takes the phone. A small smile, trying to sound casual.", ots: "Stefon" },
        { id: "03C-2", still: "03C", who: "S", line: "Sure.", act: "A beat too long, then a small nod. The first hint of a smile.", ots: "Eiesha" }
      ] },

    { n: 4, title: "Creekside Grill", when: "After school", tc: "0:41–0:58", strip: "int-day",
      stills: [
        { id: "04B", plate: "L4", who: ["M"],
          frame: "Medium shot, 35mm look. Marquell behind the dark wood counter at the register, kitchen pass behind him.",
          moment: "Leaning on the counter with a hopeful grin." },
        { id: "04C", plate: "L4", who: ["E"],
          frame: "Medium close-up, 50mm look. Eiesha at the customer side of the counter, the booth and front window soft behind her.",
          moment: "Patient, unimpressed." },
        { id: "04D", plate: "L4", who: ["V"],
          frame: "Medium close-up, 50mm look. Vanesha at the far end of the counter by the kitchen pass, an order ticket in her hand.",
          moment: "Busy, eyes on the ticket." }
      ],
      cut: [
        { id: "04A", edit: true, still: "L3", act: "Storefront plate L3 with a slow push-in. I add the CREEKSIDE GRILL sign in the edit." },
        { id: "04B-1", still: "04B", who: "M", line: "Eiesha. Your usual?", act: "Looks up, sees her off-frame, grin gets bigger." },
        { id: "04C-1", still: "04C", who: "E", line: "Marquell, we broke up.", act: "Flat and patient, like she has said it before." },
        { id: "04B-2", still: "04B", who: "M", line: "That's crazy. I asked about fries.", act: "Hands up, innocent, completely literal." },
        { id: "04D-1", still: "04D", who: "V", line: "And you on the clock. Table six!", act: "Doesn't look up at first, then points off-frame with the ticket." },
        { id: "04B-3", still: "04B", who: "M", line: "I'm going!", act: "Grabs a tray and hustles out of frame to the right." }
      ] },

    { n: 5, title: "Creekside Grill", when: "Continuous", tc: "0:58–1:15", strip: "int-day",
      stills: [
        { id: "05A", plate: "L4", who: ["D"],
          frame: "Medium-wide, 35mm look. Daymondre stepping in through the front door, daylight behind him, amber interior light on his face.",
          moment: "Hands in his jacket pockets, a slow grin as he spots someone off-frame left." },
        { id: "05B", plate: "L4", who: ["D"], test: true,
          frame: "Medium close-up, 50mm look. Daymondre standing at the end of the burgundy booth, one hand resting on the booth back.",
          moment: "Looking down at someone seated off-frame left. Amused." },
        { id: "05C", plate: "L4", who: ["S"],
          frame: "Medium close-up, 50mm look. Stefon seated in the burgundy booth by the front window.",
          moment: "Frozen. Back straight, hands flat on the table, eyes up toward someone standing off-frame right." }
      ],
      cut: [
        { id: "05A-1", still: "05A", who: "D", line: "Look at my little brother. First day in the suburbs, already got a table.", act: "He strolls in two steps, spots Stefon off-frame, the grin widens, then the line.", cam: "Slight pan with his walk." },
        { id: "05C-1", still: "05C", who: "S", line: "What are you doing here?", act: "Low and controlled, eyes locked on Daymondre off-frame." },
        { id: "05B-1", still: "05B", who: "D", line: "Looking for lemon-pepper wet. And seeing how long you can pretend to be normal.", act: "Light and amused on the first sentence. He leans in a little and drops the smile on the second.", len: 8 }
      ] },

    { n: 6, title: "Creekside Grill, same booth", when: "Continuous", tc: "1:15–1:28", strip: "int-day",
      stills: [
        { id: "06A", plate: "L4", who: ["E"],
          frame: "Medium close-up, 50mm look. Eiesha seated in the booth across from Stefon.",
          moment: "Staring across the table." },
        { id: "06B", plate: "L4", who: ["B"],
          frame: "Medium close-up, 50mm look. Bianca in the booth beside Eiesha, a drink in her hand.",
          moment: "Watching, unbothered." }
      ],
      cut: [
        { id: "06A-1", still: "06A", who: "E", line: "That's your brother?", act: "Her eyes follow Daymondre walking off to the right, then snap back to Stefon." },
        { id: "05C-2", still: "05C", who: "S", line: "Unfortunately.", act: "Eyes closed for half a second, then the line, dry." },
        { id: "06B-1", still: "06B", who: "B", line: "Mhm. One look like honor roll, the other like Buckhead security knows him by name.", act: "Sips, sets the cup down, points two fingers from Stefon to off-frame right.", len: 8 }
      ] },

    { n: 7, title: "Creekside Grill", when: "Evening", tc: "1:28–1:40", strip: "int-night",
      stills: [
        { id: "07B", plate: "L4", light: "Evening version of plate L4: windows dark blue outside, fewer diners, the amber lights feel warmer.", who: ["V"],
          frame: "Medium shot, 35mm look. Vanesha by the side door at the right end of the counter.",
          moment: "Bag on her shoulder, keys in hand, one hand on the door." },
        { id: "07C", plate: "L4", light: "Evening version of plate L4: windows dark blue outside, fewer diners, the amber lights feel warmer.", who: ["M"],
          frame: "Medium shot, 35mm look. Marquell behind the counter hauling a full trash bag.",
          moment: "Mid-chore, looking toward the side door off-frame right." }
      ],
      cut: [
        { id: "07A", edit: true, still: "L3D", act: "Dusk storefront plate L3D, held for a beat so the audience feels the day turn to night." },
        { id: "07B-1", still: "07B", who: "V", line: "Marquell, I'm heading home.", act: "Calls it over her shoulder as she reaches for the door." },
        { id: "07C-1", still: "07C", who: "M", line: "Text when you get there.", act: "Doesn't stop working. Says it like a habit." },
        { id: "07B-2", still: "07B", who: "V", line: "We live together.", act: "Stops with her hand on the door and turns back, amused." },
        { id: "07C-2", still: "07C", who: "M", line: "And I'm still asking.", act: "Shrugs with the bag. Sincere, not joking." }
      ] },

    { n: 8, title: "Parking lot", when: "Just after dark", tc: "1:40–1:54", strip: "ext-night",
      stills: [
        { id: "08A", plate: "L5", who: ["V"],
          frame: "Wide shot, 35mm look. Vanesha walking from the side door toward the dark-gray sedan under the lot lamp, small in the frame, seen from behind.",
          moment: "Alone. Digging in her bag for keys." },
        { id: "08B", plate: "L5", who: ["D"],
          frame: "Medium shot, 50mm look. Daymondre leaning against the back of the sedan, half in the lamp's warm light, half in blue shadow.",
          moment: "Easy smile, head tilted. Perfectly relaxed." },
        { id: "08C", plate: "L5", who: ["V"], test: true,
          frame: "Medium close-up, 50mm look. Vanesha at the driver door, keys in one hand and phone in the other, turned toward camera-right.",
          moment: "Irritated, not scared." },
        { id: "08D", plate: "L5", light: "Background fully blurred and dark, a hint of warm lamp light on one cheek.", who: ["D"],
          frame: "Extreme close-up, 85mm look. Daymondre's face fills the frame from brow to chin.",
          moment: "Normal human face, brown eyes, mouth closed in a faint smirk." },
        { id: "08V", custom: "vamp", plate: "L5", who: ["D"],
          frame: "Same frame as STILL 08D.", moment: "Vampire face." },
        { id: "08E", plate: "L5", who: [], editOnly: true,
          inFrame: "No people. Vanesha's phone (dark screen, no text) lying face-up on the asphalt with her keys beside it.",
          frame: "Insert, ground-level close-up, 85mm look, under the warm lot lamp.",
          moment: "The phone has just landed. Wet-look asphalt, cool blue shadows." }
      ],
      cut: [
        { id: "08A-1", still: "08A", act: "She walks to the car digging for her keys. No one else is visible.", cam: "Slow creeping push-in from behind." },
        { id: "08B-1", still: "08B", who: "D", line: "Need a ride?", act: "He is already there when the shot starts. Easy smile, small head tilt." },
        { id: "08C-1", still: "08C", who: "V", line: "Need you to stop sneaking up on people.", act: "Startles for a split second, then irritated. Points at him with the keys." },
        { id: "08D-1", still: "08D", end: "08V", act: "His irises shift from brown to red-amber, faint dark veins rise under both eyes, and his lips part to show two small fangs. Hold on the changed face. Same face shape throughout. No blood.", cam: "Locked camera." },
        { id: "08E", edit: true, still: "08E", act: "Hard cut to the phone on the asphalt with an impact sound and a small camera jolt. Vanesha's gasp plays over the cut. No contact shown." }
      ] },

    { n: 9, title: "Parking lot", when: "Continuous", tc: "1:54–2:06", strip: "ext-night",
      stills: [
        { id: "09A", plate: "L5", who: ["M"],
          frame: "Medium-wide, 35mm look. Marquell bursting out of the side door under the caged wall light, apron still on.",
          moment: "Scanning the lot, alarmed." },
        { id: "09B", plate: "L5", who: ["M"], back: ["V"],
          backNote: "her dark waves and the striped sleeve of her jacket. No face.",
          frame: "Over-the-shoulder, 50mm look: over Vanesha's shoulder onto Marquell crouched in front of her beside the car.",
          moment: "His hands hover near her shoulders. Scared but steady." },
        { id: "09C", plate: "L5", who: ["V"],
          frame: "Medium close-up, 50mm look. Vanesha sitting on the asphalt against the driver door of the sedan.",
          moment: "Conscious and shaken, one hand at her collar. No wound, no blood." }
      ],
      cut: [
        { id: "09A-1", still: "09A", who: "M", line: "Vee!", act: "The door flies open, he scans the lot, spots her off-frame right, shouts and runs out of frame." },
        { id: "09B-1", still: "09B", who: "M", line: "Hey, look at me. Who was it?", act: "Crouched, searching her face, voice low and urgent.", ots: "Vanesha" },
        { id: "09C-1", still: "09C", who: "V", line: "Leather jacket. His eyes...", act: "Breathing fast. Her eyes are unfocused, then find Marquell off-frame. She trails off." }
      ] },

    { n: 10, title: "Grill and group chat", when: "Continuous", tc: "2:06–2:19", strip: "int-night",
      stills: [
        { id: "10B", plate: "L4", light: "Evening version of plate L4: windows dark blue outside, nearly empty, amber lights.", who: ["E"],
          frame: "Medium close-up, 50mm look. Eiesha in the booth, her face lit by her phone (screen turned away from camera). The seat across from her is empty.",
          moment: "Reading something that scares her." },
        { id: "10C", plate: "L4", light: "Evening version of plate L4: windows dark blue outside, nearly empty, amber lights.", who: ["B"],
          frame: "Medium close-up, 50mm look. Bianca in the booth, phone lowered from her ear, looking toward the back of the grill.",
          moment: "Quiet and certain." }
      ],
      cut: [
        { id: "10G", edit: true, graphic: true, act: "The SHADOW CREEK group chat, built by me so every word is readable. Marquell: Vanesha got attacked. I'm with her. Call somebody! / Kari: AT CREEKSIDE??? / Bianca: I'm calling 911. Everybody stay inside." },
        { id: "10B-1", still: "10B", who: "E", line: "Wait... where's Stefon?", act: "Reads, looks up at the empty seat across the booth, then says it." },
        { id: "10C-1", still: "10C", who: "B", line: "He's not who I'm worried about.", act: "Eyes fixed toward the back of the grill. She does not look at Eiesha." }
      ] },

    { n: 11, title: "Back service exit", when: "Night", tc: "2:19–2:38", strip: "ext-night",
      stills: [
        { id: "11A", plate: "L6", who: ["S", "D"],
          frame: "Wide two-shot, 35mm look. Stefon on the left facing Daymondre on the right, who leans on the brick wall beside the gray service door. Both small in the frame under the caged light.",
          moment: "Stefon squared up. Daymondre has not moved." },
        { id: "11B", plate: "L6", who: ["S"],
          frame: "Close-up, 85mm look. Stefon, warm caged light on one side of his face, cool blue on the other.",
          moment: "Quiet fury, jaw tight." },
        { id: "11C", plate: "L6", who: ["D"],
          frame: "Close-up, 85mm look. Daymondre leaning back against the brick, the gold bat pendant catching the light.",
          moment: "Relaxed. Zero remorse." }
      ],
      cut: [
        { id: "11A-1", still: "11A", act: "Stefon takes two hard steps toward Daymondre and stops. Daymondre does not move.", cam: "Locked camera." },
        { id: "11B-1", still: "11B", who: "S", line: "You attacked Marquell's sister?", act: "Low, controlled, furious." },
        { id: "11C-1", still: "11C", who: "D", line: "I told you I was hungry.", act: "A shrug." },
        { id: "11B-2", still: "11B", who: "S", line: "This ain't 1864. They got cameras everywhere now.", act: "He leans closer, voice low so nobody hears.", cam: "Very slight push-in." },
        { id: "11C-2", still: "11C", who: "D", line: "I know. Between doorbell cameras and traffic on 285, Atlanta ain't vampire-friendly.", act: "Counts the two complaints on his fingers, honestly annoyed.", len: 8 }
      ] },

    { n: 12, title: "Back service exit", when: "Continuous", tc: "2:38–2:51", strip: "ext-night",
      stills: [
        { id: "12A", plate: "L6", who: ["E", "B"],
          frame: "Medium two-shot, 35mm look. Eiesha and Bianca coming around the brick corner at frame left.",
          moment: "Stopped mid-step. Both staring at something off-frame right." },
        { id: "12B", plate: "L6", who: ["E"],
          frame: "Close-up, 85mm look. Eiesha at the brick corner, the caged light warm on her face.",
          moment: "Eyes on Stefon off-frame. Not breathing." },
        { id: "12C", plate: "L6", who: ["S"],
          frame: "Medium close-up, 50mm look. Stefon turned toward the corner at camera-left.",
          moment: "Caught. One hand half raised." },
        { id: "12D", plate: "L6", who: ["B"], back: ["E"],
          backNote: "her braids and the shoulder of her sweater at the edge of frame. No face.",
          frame: "Medium close-up, 50mm look. Bianca just behind Eiesha's shoulder.",
          moment: "Already backing away, one hand on Eiesha's sleeve, eyes locked off-frame right." }
      ],
      cut: [
        { id: "12A-1", still: "12A", act: "They come around the corner and freeze. Neither one speaks.", cam: "Locked camera." },
        { id: "12B-1", still: "12B", who: "E", line: "Vampire?", act: "Barely above a whisper." },
        { id: "11C-3", still: "11C", act: "He turns his head slowly toward camera-left. The smile fades into something cold. Hold.", cam: "Locked camera.", note: "My added beat: two seconds of real threat before the joke, per your continuity rule 10." },
        { id: "12C-1", still: "12C", who: "S", line: "Eiesha, I can explain.", act: "Fast and quiet, palm out." },
        { id: "11C-4", still: "11C", who: "D", line: "Start with why you a hundred and sixty still taking AP History.", act: "Delighted. Looks from the girls off-frame left back to Stefon." },
        { id: "12D-1", still: "12D", who: "B", line: "Girl... we are NOT going back in that grill.", act: "Pulls Eiesha's sleeve. Her eyes never leave Daymondre.", ots: "Eiesha" },
        { id: "08D-2", still: "08D", act: "His irises flash from brown to red-amber and hold. Mouth stays closed in a smirk. No fangs.", cam: "Locked camera." },
        { id: "12B-2", still: "12B", act: "She takes one step back, eyes wide, braids swinging.", cam: "Locked camera.", note: "Hard cut to black on her step." }
      ] }
  ],

  // V7 spoken lines, scene by scene, for the coverage check.
  script: {
    1: ["E|I just wanna get through today without another \"How you holding up?\"", "B|Got you. Creekside after class. Fries, no feelings.", "E|That might actually work."],
    2: ["E|Who's the new guy?", "B|No idea. But the waves, the glasses? He look like he got a 4.0 and a secret.", "S|I can hear you.", "B|Congratulations. Can you blink?"],
    3: ["E|How'd you get over here so fast?", "S|Good reflexes.", "B|That's not reflexes. That's Peach Pass on legs.", "E|Thanks. Creekside after class?", "S|Sure."],
    4: ["M|Eiesha. Your usual?", "E|Marquell, we broke up.", "M|That's crazy. I asked about fries.", "V|And you on the clock. Table six!", "M|I'm going!"],
    5: ["D|Look at my little brother. First day in the suburbs, already got a table.", "S|What are you doing here?", "D|Looking for lemon-pepper wet. And seeing how long you can pretend to be normal."],
    6: ["E|That's your brother?", "S|Unfortunately.", "B|Mhm. One look like honor roll, the other like Buckhead security knows him by name."],
    7: ["V|Marquell, I'm heading home.", "M|Text when you get there.", "V|We live together.", "M|And I'm still asking."],
    8: ["D|Need a ride?", "V|Need you to stop sneaking up on people."],
    9: ["M|Vee! Hey, look at me. Who was it?", "V|Leather jacket. His eyes..."],
    10: ["E|Wait... where's Stefon?", "B|He's not who I'm worried about."],
    11: ["S|You attacked Marquell's sister?", "D|I told you I was hungry.", "S|This ain't 1864. They got cameras everywhere now.", "D|I know. Between doorbell cameras and traffic on 285, Atlanta ain't vampire-friendly."],
    12: ["E|Vampire?", "S|Eiesha, I can explain.", "D|Start with why you a hundred and sixty still taking AP History.", "B|Girl... we are NOT going back in that grill."]
  }
};
if (typeof module !== "undefined") module.exports = BOARD;
