/* ══════════════════════════════════════════════
   BABY AI DOLL – DATA FILE
   Phrases, Stories, Learning Content, Games
══════════════════════════════════════════════ */

const PHRASES = {
  calm: {
    en: [
      "It's okay, {name}. You are safe.",
      "Take it easy, {name}. Mama or papa is here.",
      "Shhh... slowly, softly, {name}.",
      "You are loved, {name}. Everything is alright.",
      "Let's listen to a soft sound together, {name}.",
      "Calm down gently, {name}. I am right here.",
      "Let's breathe slowly together, {name}.",
      "You are safe, {name}. Nothing to worry about.",
      "Mama or papa is close, {name}.",
      "Shh shh shh... it's alright, {name}.",
      "Let's calm down together, {name}.",
      "Soft and slow, {name}. You're doing great."
    ],
    bn: [
      "{name}, সব ঠিক আছে। তুমি নিরাপদ।",
      "শান্ত হও, {name}। মা অথবা বাবা এখানে আছেন।",
      "ধীরে ধীরে, {name}। কিছু হয়নি।",
      "তুমি ভালোবাসা পাচ্ছো, {name}।",
      "আস্তে আস্তে শ্বাস নাও, {name}।"
    ],
    ar: [
      "لا بأس يا {name}. أنت بأمان.",
      "هدّئ نفسك يا {name}. ماما أو بابا هنا.",
      "شش... رويدًا رويدًا يا {name}.",
      "أنت محبوب يا {name}. كل شيء على ما يرام.",
      "تنفس ببطء يا {name}. أنا هنا معك."
    ],
    hi: [
      "ठीक है, {name}। तुम सुरक्षित हो।",
      "धीरे धीरे, {name}। मम्मी या पापा यहाँ हैं।",
      "शांत हो जाओ, {name}। सब ठीक है।",
      "तुमसे प्यार है, {name}।",
      "साथ मिलकर शांत होते हैं, {name}।"
    ],
    ur: [
      "ٹھیک ہے {name}۔ تم محفوظ ہو۔",
      "آہستہ آہستہ {name}۔ ماما یا بابا یہاں ہیں۔",
      "پرسکون ہو جاؤ {name}۔ سب ٹھیک ہے۔",
      "تم سے پیار ہے، {name}۔",
      "ہم مل کر پرسکون ہوتے ہیں، {name}۔"
    ],
    fr: [
      "Tout va bien, {name}. Tu es en sécurité.",
      "Doucement, {name}. Maman ou papa est là.",
      "Chuuut... doucement, {name}.",
      "Tu es aimé(e), {name}. Tout va bien.",
      "Respirons ensemble doucement, {name}."
    ]
  },
  sleep: {
    en: [
      "Good night, {name}. Time to rest.",
      "Close your eyes slowly, {name}.",
      "Sleep softly, {name}. Sweet dreams.",
      "Mama or papa is near, {name}.",
      "Let's listen to a gentle lullaby, {name}.",
      "The stars are watching over you, {name}.",
      "Drift off to sleep, little {name}.",
      "Rest now, {name}. All is calm.",
      "Sleep tight, {name}. I love you.",
      "The moon is saying goodnight, {name}."
    ],
    bn: [
      "শুভ রাত্রি, {name}। এখন ঘুমাও।",
      "চোখ বন্ধ করো, {name}।",
      "মিষ্টি স্বপ্ন দেখো, {name}।",
      "মা অথবা বাবা কাছেই আছেন, {name}।"
    ],
    ar: [
      "تصبح على خير يا {name}. حان وقت النوم.",
      "أغمض عينيك برفق يا {name}.",
      "نم بهدوء يا {name}. أحلام سعيدة.",
      "ماما وبابا قريبان منك يا {name}."
    ],
    hi: [
      "शुभ रात्रि, {name}। अब सो जाओ।",
      "आँखें धीरे से बंद करो, {name}।",
      "मीठे सपने देखो, {name}।",
      "मम्मी या पापा पास हैं, {name}।"
    ],
    ur: [
      "شب بخیر، {name}۔ اب سو جاؤ۔",
      "آنکھیں آہستہ بند کرو، {name}۔",
      "میٹھے خواب دیکھو، {name}۔",
      "ماما یا بابا قریب ہیں، {name}۔"
    ],
    fr: [
      "Bonne nuit, {name}. Il est temps de dormir.",
      "Ferme les yeux doucement, {name}.",
      "Dors paisiblement, {name}. Fais de beaux rêves.",
      "Maman ou papa est près de toi, {name}."
    ]
  },
  learn: {
    en: [
      "Hi {name}, this is a ball! 🎾",
      "Can you see the cat, {name}? 🐱",
      "Let's say mama! Ma-ma. 👩",
      "Good job, {name}! You're so smart! ⭐",
      "Touch your nose, {name}! 👃",
      "Clap with me, {name}! Clap clap! 👏",
      "This is a flower, {name}. Pretty! 🌸",
      "Can you say dog? Dog! 🐶",
      "Look, {name}! A butterfly! 🦋",
      "Let's count — one, two, three! 1️⃣2️⃣3️⃣"
    ]
  },
  praise: {
    en: [
      "Good job, {name}! 🌟",
      "You did it, {name}! So proud! 🎉",
      "Wonderful, {name}! ✨",
      "Amazing, {name}! You're so clever! 🌈",
      "I'm so proud of you, {name}! 💛"
    ]
  }
};

const LEARNING_CATEGORIES = [
  {
    name: "Animals",
    icon: "🐾",
    items: [
      { emoji: "🐱", word: "Cat", sound: "meow" },
      { emoji: "🐶", word: "Dog", sound: "woof" },
      { emoji: "🐮", word: "Cow", sound: "moo" },
      { emoji: "🐸", word: "Frog", sound: "ribbit" },
      { emoji: "🦆", word: "Duck", sound: "quack" },
      { emoji: "🐥", word: "Chick", sound: "peep" },
      { emoji: "🐘", word: "Elephant", sound: "trumpet" },
      { emoji: "🦁", word: "Lion", sound: "roar" }
    ]
  },
  {
    name: "Fruits",
    icon: "🍎",
    items: [
      { emoji: "🍎", word: "Apple", sound: null },
      { emoji: "🍌", word: "Banana", sound: null },
      { emoji: "🍊", word: "Orange", sound: null },
      { emoji: "🍓", word: "Strawberry", sound: null },
      { emoji: "🍇", word: "Grapes", sound: null },
      { emoji: "🍉", word: "Watermelon", sound: null }
    ]
  },
  {
    name: "Colors",
    icon: "🌈",
    items: [
      { emoji: "🔴", word: "Red", sound: null },
      { emoji: "🔵", word: "Blue", sound: null },
      { emoji: "🟡", word: "Yellow", sound: null },
      { emoji: "🟢", word: "Green", sound: null },
      { emoji: "🟠", word: "Orange", sound: null },
      { emoji: "🟣", word: "Purple", sound: null }
    ]
  },
  {
    name: "Body",
    icon: "👁️",
    items: [
      { emoji: "👁️", word: "Eyes", sound: null },
      { emoji: "👃", word: "Nose", sound: null },
      { emoji: "👄", word: "Mouth", sound: null },
      { emoji: "👂", word: "Ears", sound: null },
      { emoji: "✋", word: "Hand", sound: null },
      { emoji: "🦶", word: "Feet", sound: null }
    ]
  },
  {
    name: "Words",
    icon: "💬",
    items: [
      { emoji: "👩", word: "Mama", sound: null },
      { emoji: "👨", word: "Dada", sound: null },
      { emoji: "🤱", word: "Baby", sound: null },
      { emoji: "🎈", word: "Ball", sound: null },
      { emoji: "🍼", word: "Milk", sound: null },
      { emoji: "🧸", word: "Doll", sound: null }
    ]
  }
];

const GAMES = [
  {
    id: "peekaboo",
    name: "Peekaboo!",
    icon: "🙈",
    color: "#FFB5C8",
    play: function(name) {
      const steps = [
        { emoji: "🙈", text: `Where is ${name}?`, action: "Tap to find!" },
        { emoji: "😄", text: `Peekaboo! There's ${name}!`, action: "Tap again!" }
      ];
      return steps;
    }
  },
  {
    id: "clap",
    name: "Clap With Me",
    icon: "👏",
    color: "#B5FFDA",
    play: function(name) {
      return [
        { emoji: "👏", text: `Clap with me, ${name}!`, action: "Tap to clap!" },
        { emoji: "🙌", text: `Yay ${name}! Great clapping!`, action: "Again!" }
      ];
    }
  },
  {
    id: "animals",
    name: "Animal Sounds",
    icon: "🐾",
    color: "#B5D8FF",
    items: [
      { emoji: "🐱", name: "Cat", sound: "Meow meow!" },
      { emoji: "🐶", name: "Dog", sound: "Woof woof!" },
      { emoji: "🐮", name: "Cow", sound: "Moo moo!" },
      { emoji: "🐸", name: "Frog", sound: "Ribbit ribbit!" },
      { emoji: "🦆", name: "Duck", sound: "Quack quack!" },
      { emoji: "🐘", name: "Elephant", sound: "Trrrrr!" }
    ]
  },
  {
    id: "bodyparts",
    name: "Body Parts",
    icon: "👃",
    color: "#C5B8FF",
    items: [
      { emoji: "👁️", name: "Eyes", action: "Blink your eyes!" },
      { emoji: "👃", name: "Nose", action: "Touch your nose!" },
      { emoji: "👄", name: "Mouth", action: "Open your mouth!" },
      { emoji: "👂", name: "Ear", action: "Touch your ear!" },
      { emoji: "✋", name: "Hand", action: "Wave your hand!" },
      { emoji: "🦶", name: "Feet", action: "Kick your feet!" }
    ]
  },
  {
    id: "counting",
    name: "Count 1-5",
    icon: "🔢",
    color: "#FFD97D",
    items: [
      { emoji: "1️⃣", name: "One", action: "Hold up one finger!" },
      { emoji: "2️⃣", name: "Two", action: "Hold up two fingers!" },
      { emoji: "3️⃣", name: "Three", action: "Hold up three fingers!" },
      { emoji: "4️⃣", name: "Four", action: "Hold up four fingers!" },
      { emoji: "5️⃣", name: "Five", action: "Hold up all five fingers!" }
    ]
  },
  {
    id: "colors",
    name: "Find the Color",
    icon: "🌈",
    color: "#FFCBA4",
    items: [
      { emoji: "🔴", name: "Red", action: "Find something red nearby!" },
      { emoji: "🔵", name: "Blue", action: "Find something blue nearby!" },
      { emoji: "🟡", name: "Yellow", action: "Find something yellow nearby!" },
      { emoji: "🟢", name: "Green", action: "Find something green nearby!" }
    ]
  }
];

const STORIES = [
  {
    id: "sleepy-cloud",
    title: "The Sleepy Little Cloud",
    icon: "☁️",
    ageTag: "0–2 years",
    pages: [
      { emoji: "☁️", text: "Once upon a time, there was a tiny little cloud named Fluffy. Fluffy lived high up in the soft blue sky." },
      { emoji: "🌤️", text: "Every night, Fluffy would float gently over the sleeping houses and whisper, 'Shh... it's time to sleep.'" },
      { emoji: "⭐", text: "The little stars came out one by one. They blinked softly at Fluffy and smiled." },
      { emoji: "🌙", text: "The moon said, 'Goodnight, Fluffy.' And Fluffy closed her eyes and drifted into a beautiful dream." },
      { emoji: "💤", text: "And now it is time for little {name} to sleep too... Goodnight, sweet one. 💛" }
    ]
  },
  {
    id: "bunny-moon",
    title: "The Little Bunny and the Moon",
    icon: "🐰",
    ageTag: "0–3 years",
    pages: [
      { emoji: "🐰", text: "A tiny bunny named Pip lived in a cozy meadow filled with soft green grass and wildflowers." },
      { emoji: "🌼", text: "Every evening, Pip would look up at the big, bright moon and wave a little paw." },
      { emoji: "🌙", text: "'Goodnight, Moon!' said Pip. The moon glowed warmly and shone its light on the meadow." },
      { emoji: "🌿", text: "Pip snuggled into a soft nest of leaves and grass. The crickets sang a gentle lullaby." },
      { emoji: "💤", text: "Just like Pip, it's time for {name} to snuggle up and rest. Sweet dreams, little one. 🌙" }
    ]
  },
  {
    id: "stars-dance",
    title: "The Dancing Stars",
    icon: "⭐",
    ageTag: "1–3 years",
    pages: [
      { emoji: "🌃", text: "When the sun went to sleep, the little stars came out to dance in the dark velvet sky." },
      { emoji: "⭐", text: "Star Twinkle was the smallest star. She shone the brightest because she danced with her whole heart." },
      { emoji: "✨", text: "The stars danced in circles, making swirls of light across the night sky." },
      { emoji: "🌙", text: "Then the moon sang a lullaby, and one by one, the stars became still and rested." },
      { emoji: "💫", text: "Tonight, {name}, the stars are dancing just for you. Watch them twinkle before you close your eyes. 💛" }
    ]
  },
  {
    id: "mama-whale",
    title: "Mama Whale and Baby Splash",
    icon: "🐋",
    ageTag: "0–2 years",
    pages: [
      { emoji: "🌊", text: "Deep in the warm blue ocean, a mama whale and her baby Splash swam together every day." },
      { emoji: "🐋", text: "Baby Splash loved to jump out of the water and land with a BIG splash! Splash!" },
      { emoji: "🤱", text: "When evening came, mama whale held Baby Splash close and hummed a soft ocean song." },
      { emoji: "💙", text: "'You are safe. You are loved. You are mine,' said mama whale softly." },
      { emoji: "💤", text: "Just like Baby Splash, {name} is safe and loved too. Rest now, little one. Goodnight. 💙" }
    ]
  }
];

const PARENT_PHRASES = [
  "I love you, baby.",
  "Mama is here.",
  "You are safe.",
  "It's okay, calm down.",
  "Time to sleep.",
  "Good job!",
  "I'm so proud of you."
];

const SOUNDS = {
  white: { label: "White Noise", freq: 440, type: "noise" },
  heartbeat: { label: "Heartbeat", freq: 60, type: "beat" },
  womb: { label: "Womb", freq: 80, type: "womb" },
  shush: { label: "Shush", freq: 200, type: "shush" },
  lullaby: { label: "Lullaby", freq: 523, type: "lullaby" },
  rain: { label: "Rain", freq: 300, type: "rain" },
  ocean: { label: "Ocean", freq: 100, type: "ocean" },
  crickets: { label: "Crickets", freq: 800, type: "crickets" }
};
