/* ══════════════════════════════════════════════
   BABY AI DOLL – MAIN APP LOGIC
   Version 1.0
══════════════════════════════════════════════ */

'use strict';

// ─── STATE ───
let state = {
  babyName: '',
  babyNick: '',
  babyAge: '0-3',
  language: 'en',
  voiceStyle: 'parent',
  currentScreen: 'welcome',
  previousScreen: 'home',
  soundPlaying: null,
  audioCtx: null,
  soundNodes: [],
  timerInterval: null,
  timerRemaining: 0,
  atMode: 'calm',
  atDuration: 2,
  atInterval: null,
  atPaused: false,
  atRunning: false,
  atElapsed: 0,
  atPhraseIndex: 0,
  learnCategory: 0,
  learnIndex: 0,
  currentStory: null,
  currentStoryPage: 0,
  currentGame: null,
  currentGameStep: 0,
  nightMode: false,
  recordings: {},
};

// ─── INIT ───
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  buildBgStars();
  buildPhraseList('calm', PHRASES.calm);
  buildPhraseList('sleep', PHRASES.sleep);
  buildLearningCategories();
  buildGameGrid();
  buildStoryList();
  buildRecordingPhrases();
  setupVoiceOptions();
  setupATVolume();

  if (state.babyName) {
    populateSettings();
    showScreen('home');
    updateHomeGreeting();
  } else {
    showScreen('welcome');
  }

  document.getElementById('btnStart').addEventListener('click', handleWelcomeStart);
  document.getElementById('btnSettings').addEventListener('click', () => { showScreen('settings'); populateSettings(); });
});

// ─── STORAGE ───
function saveState() {
  try {
    const data = {
      babyName: state.babyName,
      babyNick: state.babyNick,
      babyAge: state.babyAge,
      language: state.language,
      voiceStyle: state.voiceStyle,
      recordings: state.recordings,
    };
    localStorage.setItem('babyAIDoll', JSON.stringify(data));
  } catch(e) {}
}
function loadState() {
  try {
    const raw = localStorage.getItem('babyAIDoll');
    if (raw) {
      const data = JSON.parse(raw);
      Object.assign(state, data);
    }
  } catch(e) {}
}

// ─── BG STARS ───
function buildBgStars() {
  const container = document.getElementById('bgStars');
  const emojis = ['✨','⭐','🌟','💫','✦','✧'];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.textContent = emojis[i % emojis.length];
    s.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      --dur: ${3 + Math.random() * 4}s;
      --delay: ${Math.random() * 6}s;
    `;
    container.appendChild(s);
  }
}

// ─── SCREEN ROUTING ───
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
    state.previousScreen = state.currentScreen;
    state.currentScreen = id;
    window.scrollTo(0, 0);
  }
}
function goBack() {
  stopSound();
  showScreen(state.previousScreen || 'home');
}
function goMode(mode) {
  showScreen(mode);
  if (mode === 'calm') populatePhraseList('calm');
  if (mode === 'sleep') populatePhraseList('sleep');
  if (mode === 'autotalk') resetAutoTalkUI();
}

// ─── WELCOME START ───
function handleWelcomeStart() {
  const name = document.getElementById('babyNameInput').value.trim();
  if (!name) { showToast('Please enter your baby\'s name 💛'); return; }
  state.babyName = name;
  state.babyNick = document.getElementById('babyNickInput').value.trim();
  state.babyAge = document.getElementById('babyAgeInput').value;
  state.language = document.getElementById('babyLangInput').value;
  saveState();
  showScreen('home');
  updateHomeGreeting();
  startHomeRotation();
  showToast(`Welcome, little ${state.babyName}! 🧸`);
}

// ─── HOME GREETING ───
function updateHomeGreeting() {
  const n = state.babyNick || state.babyName;
  document.getElementById('homeGreeting').textContent = `Hi ${n}, let's have a lovely time! 💛`;
  document.getElementById('chipName').textContent = state.babyName;
  document.getElementById('babyChip').querySelector('.chip-icon').textContent = getAgeEmoji();
}
function getAgeEmoji() {
  const a = state.babyAge;
  if (a === '0-3') return '🍼';
  if (a === '3-6') return '🌙';
  if (a === '6-12') return '🌟';
  return '🎈';
}
function startHomeRotation() {
  const phrases = [
    `Hello ${state.babyName}! I'm Baby AI Doll 💛`,
    `I'm here for you, ${state.babyName} 🌙`,
    `Let's play together, ${state.babyName}! 🎈`,
    `Time to learn something new, ${state.babyName}! ⭐`,
    `You are loved, ${state.babyName} 🤍`,
  ];
  let i = 0;
  const el = document.getElementById('speechText');
  setInterval(() => {
    i = (i + 1) % phrases.length;
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = phrases[i]; el.style.opacity = '1'; }, 300);
  }, 4000);
  el.style.transition = 'opacity 0.3s';
}

// ─── PHRASE HELPERS ───
function insertName(phrase) {
  const n = state.babyNick || state.babyName || 'little one';
  return phrase.replace(/\{name\}/g, n);
}
function getPhrases(mode) {
  const lang = state.language;
  const set = PHRASES[mode] || PHRASES.calm;
  const langPhrases = set[lang] || set['en'];
  return langPhrases.map(p => insertName(p));
}
function buildPhraseList(mode, phraseSet) {
  const container = document.getElementById(mode + 'PhraseList');
  if (!container) return;
  const phrases = phraseSet['en'];
  phrases.forEach(p => {
    const item = document.createElement('div');
    item.className = 'phrase-item';
    item.innerHTML = `<span class="pi-icon">💬</span><span>${insertName(p)}</span>`;
    item.addEventListener('click', () => speakText(insertName(p)));
    container.appendChild(item);
  });
}
function populatePhraseList(mode) {
  const container = document.getElementById(mode + 'PhraseList');
  if (!container) return;
  container.innerHTML = '';
  const phrases = getPhrases(mode);
  phrases.forEach(p => {
    const item = document.createElement('div');
    item.className = 'phrase-item';
    const icon = mode === 'calm' ? '🤍' : '🌙';
    item.innerHTML = `<span class="pi-icon">${icon}</span><span>${p}</span>`;
    item.addEventListener('click', () => {
      speakText(p);
      document.getElementById(mode + 'Phrase').textContent = p;
    });
    container.appendChild(item);
  });
}

// ─── SPEECH (Web Speech API) ───
function speakText(text) {
  if (!('speechSynthesis' in window)) {
    showToast('Voice not supported on this device.');
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  applyVoiceStyle(utter);
  window.speechSynthesis.speak(utter);
}
function applyVoiceStyle(utter) {
  const voices = window.speechSynthesis.getVoices();
  utter.lang = getLangCode();
  switch (state.voiceStyle) {
    case 'lullaby':  utter.rate = 0.65; utter.pitch = 1.15; utter.volume = 0.8; break;
    case 'story':    utter.rate = 0.80; utter.pitch = 1.1;  utter.volume = 0.9; break;
    case 'playful':  utter.rate = 1.05; utter.pitch = 1.3;  utter.volume = 1.0; break;
    default:         utter.rate = 0.75; utter.pitch = 1.1;  utter.volume = 0.85; break;
  }
  // Try to pick a female voice
  const femVoice = voices.find(v => v.lang.startsWith(utter.lang.split('-')[0]) && /female|woman|girl/i.test(v.name));
  const anyVoice = voices.find(v => v.lang.startsWith(utter.lang.split('-')[0]));
  if (femVoice) utter.voice = femVoice;
  else if (anyVoice) utter.voice = anyVoice;
}
function getLangCode() {
  const map = { en:'en-US', bn:'bn-BD', ar:'ar-SA', hi:'hi-IN', ur:'ur-PK', fr:'fr-FR' };
  return map[state.language] || 'en-US';
}

function speakRandom(mode) {
  const phrases = getPhrases(mode);
  const p = phrases[Math.floor(Math.random() * phrases.length)];
  speakText(p);
  const displayEl = document.getElementById(mode + 'Phrase');
  if (displayEl) displayEl.textContent = p;
}

// ─── SOUND ENGINE (Web Audio API) ───
function getAudioCtx() {
  if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return state.audioCtx;
}
function stopSound() {
  state.soundNodes.forEach(n => { try { n.stop(); } catch(e){} });
  state.soundNodes = [];
  state.soundPlaying = null;
  document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('playing'));
}
function playSound(type) {
  stopSound();
  state.soundPlaying = type;
  try {
    const ctx = getAudioCtx();
    if (ctx.state === 'suspended') ctx.resume();
    switch (type) {
      case 'white':     playWhiteNoise(ctx); break;
      case 'heartbeat': playHeartbeat(ctx);  break;
      case 'womb':      playWomb(ctx);       break;
      case 'shush':     playShush(ctx);      break;
      case 'lullaby':   playLullaby(ctx);    break;
      case 'rain':      playRain(ctx);       break;
      case 'ocean':     playOcean(ctx);      break;
      case 'crickets':  playCrickets(ctx);   break;
    }
    showToast('🎵 Sound playing...');
  } catch(e) {
    showToast('Audio not available on this device.');
  }
}

function playWhiteNoise(ctx) {
  const bufSize = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const gain = ctx.createGain(); gain.gain.value = 0.15;
  const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 800;
  src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
  src.start();
  state.soundNodes.push(src);
}
function playHeartbeat(ctx) {
  function beat(t) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.3, t + 0.04);
    g.gain.linearRampToValueAtTime(0, t + 0.15);
    g.gain.linearRampToValueAtTime(0.2, t + 0.22);
    g.gain.linearRampToValueAtTime(0, t + 0.35);
    osc1.frequency.value = 55; osc1.type = 'sine';
    osc2.frequency.value = 48; osc2.type = 'sine';
    osc1.connect(g); osc2.connect(g); g.connect(ctx.destination);
    osc1.start(t); osc1.stop(t + 0.4);
    osc2.start(t); osc2.stop(t + 0.4);
    state.soundNodes.push(osc1, osc2);
  }
  let t = ctx.currentTime;
  const id = setInterval(() => {
    if (!state.soundPlaying) { clearInterval(id); return; }
    t = ctx.currentTime;
    beat(t);
  }, 900);
  state.soundNodes.push({ stop: () => clearInterval(id) });
}
function playWomb(ctx) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain(); g.gain.value = 0.1;
  const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 200;
  osc.type = 'sawtooth'; osc.frequency.value = 70;
  osc.connect(filter); filter.connect(g); g.connect(ctx.destination);
  osc.start(); state.soundNodes.push(osc);
}
function playShush(ctx) {
  const bufSize = ctx.sampleRate * 1;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const g = ctx.createGain(); g.gain.value = 0.08;
  const filter = ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.value = 3000; filter.Q.value = 0.5;
  src.connect(filter); filter.connect(g); g.connect(ctx.destination);
  src.start(); state.soundNodes.push(src);
}
function playLullaby(ctx) {
  const notes = [523.25, 587.33, 659.25, 523.25, 587.33, 784.0, 698.46, 659.25, 523.25];
  const dur = 0.6;
  let t = ctx.currentTime;
  const playNote = (freq, start) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(0.2, start + 0.05);
    g.gain.linearRampToValueAtTime(0, start + dur - 0.05);
    osc.type = 'sine'; osc.frequency.value = freq;
    osc.connect(g); g.connect(ctx.destination);
    osc.start(start); osc.stop(start + dur);
    state.soundNodes.push(osc);
  };
  const loop = () => {
    if (!state.soundPlaying) return;
    t = ctx.currentTime;
    notes.forEach((n, i) => playNote(n, t + i * dur));
    setTimeout(loop, notes.length * dur * 1000);
  };
  loop();
}
function playRain(ctx) {
  const bufSize = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(2, bufSize, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const g = ctx.createGain(); g.gain.value = 0.12;
  const filter = ctx.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 2000;
  src.connect(filter); filter.connect(g); g.connect(ctx.destination);
  src.start(); state.soundNodes.push(src);
}
function playOcean(ctx) {
  const bufSize = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
  const g = ctx.createGain(); g.gain.value = 0.1;
  const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 600;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.1; lfo.type = 'sine';
  const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.05;
  lfo.connect(lfoGain); lfoGain.connect(g.gain);
  src.connect(filter); filter.connect(g); g.connect(ctx.destination);
  lfo.start(); src.start(); state.soundNodes.push(src, lfo);
}
function playCrickets(ctx) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain(); g.gain.value = 0.06;
  osc.type = 'square'; osc.frequency.value = 900;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 8;
  const lfoG = ctx.createGain(); lfoG.gain.value = 0.04;
  lfo.connect(lfoG); lfoG.connect(g.gain);
  osc.connect(g); g.connect(ctx.destination);
  lfo.start(); osc.start();
  state.soundNodes.push(osc, lfo);
}

// ─── TIMER ───
function setTimer(minutes) {
  clearTimer();
  state.timerRemaining = minutes * 60;
  const toast = document.getElementById('timerToast');
  toast.style.display = 'flex';
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timerRemaining--;
    updateTimerDisplay();
    if (state.timerRemaining <= 0) {
      clearTimer();
      stopSound();
      window.speechSynthesis && window.speechSynthesis.cancel();
      showToast('⏰ Sleep timer ended. Good night! 🌙');
      const name = state.babyNick || state.babyName;
      showNightMode(`Sweet dreams, ${name}... 🌙`);
    }
  }, 1000);
  showToast(`⏱ Timer set for ${minutes} min`);
}
function updateTimerDisplay() {
  const m = Math.floor(state.timerRemaining / 60).toString().padStart(2,'0');
  const s = (state.timerRemaining % 60).toString().padStart(2,'0');
  document.getElementById('timerCountdown').textContent = `${m}:${s}`;
}
function clearTimer() {
  if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
  document.getElementById('timerToast').style.display = 'none';
}

// ─── NIGHT MODE ───
function toggleNightMode() {
  state.nightMode = !state.nightMode;
  const overlay = document.getElementById('nightOverlay');
  overlay.classList.toggle('active', state.nightMode);
  if (state.nightMode) {
    const name = state.babyNick || state.babyName;
    document.getElementById('nightPhrase').textContent = `Goodnight, ${name}... 🌙`;
    speakText(getPhrases('sleep')[0]);
  } else {
    window.speechSynthesis && window.speechSynthesis.cancel();
  }
}
function showNightMode(phrase) {
  state.nightMode = true;
  document.getElementById('nightPhrase').textContent = phrase;
  document.getElementById('nightOverlay').classList.add('active');
}

// ─── LEARNING MODE ───
function buildLearningCategories() {
  const row = document.getElementById('learnCategoryRow');
  LEARNING_CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (i === 0 ? ' active' : '');
    btn.textContent = cat.icon + ' ' + cat.name;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.learnCategory = i;
      state.learnIndex = 0;
      updateLearnCard();
    });
    row.appendChild(btn);
  });
  updateLearnCard();
}
function updateLearnCard() {
  const cat = LEARNING_CATEGORIES[state.learnCategory];
  const item = cat.items[state.learnIndex];
  document.getElementById('learnEmoji').textContent = item.emoji;
  document.getElementById('learnWord').textContent = item.word;
  const name = state.babyNick || state.babyName;
  const phrase = insertName(`Hi {name}, this is a ${item.word}!`);
  document.getElementById('learnPhrase').textContent = phrase;
  document.getElementById('learnCard').style.animation = 'none';
  setTimeout(() => document.getElementById('learnCard').style.animation = '', 50);
}
function nextLearn() {
  const cat = LEARNING_CATEGORIES[state.learnCategory];
  state.learnIndex = (state.learnIndex + 1) % cat.items.length;
  updateLearnCard();
}
function prevLearn() {
  const cat = LEARNING_CATEGORIES[state.learnCategory];
  state.learnIndex = (state.learnIndex - 1 + cat.items.length) % cat.items.length;
  updateLearnCard();
}
function speakLearn() {
  const phrase = document.getElementById('learnPhrase').textContent;
  speakText(phrase);
  const cat = LEARNING_CATEGORIES[state.learnCategory];
  const item = cat.items[state.learnIndex];
  if (item.sound) {
    setTimeout(() => speakText(item.sound + '! ' + item.sound + '!'), 1800);
  }
}

// ─── PLAY MODE ───
function buildGameGrid() {
  const grid = document.getElementById('gameGrid');
  GAMES.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.borderColor = game.color;
    card.innerHTML = `<div class="game-card-icon">${game.icon}</div><div class="game-card-name">${game.name}</div>`;
    card.addEventListener('click', () => startGame(game.id));
    grid.appendChild(card);
  });
}
function startGame(id) {
  state.currentGame = GAMES.find(g => g.id === id);
  state.currentGameStep = 0;
  document.getElementById('playGameSelect').style.display = 'none';
  document.getElementById('playGameActive').style.display = 'block';
  renderGame();
}
function exitGame() {
  document.getElementById('playGameSelect').style.display = 'block';
  document.getElementById('playGameActive').style.display = 'none';
  state.currentGame = null;
}
function renderGame() {
  const game = state.currentGame;
  const display = document.getElementById('gameDisplay');
  const name = state.babyNick || state.babyName;
  if (!game) return;

  if (game.id === 'peekaboo') {
    const steps = game.play(name);
    const step = steps[state.currentGameStep % steps.length];
    display.innerHTML = `
      <div class="game-title">${step.text}</div>
      <div class="game-content-emoji" onclick="advanceGame()">${step.emoji}</div>
      <p class="game-instruction">${step.action}</p>
      <button class="game-next-btn" onclick="advanceGame()">Tap!</button>`;
    speakText(step.text);
  } else if (game.id === 'clap') {
    const steps = game.play(name);
    const step = steps[state.currentGameStep % steps.length];
    display.innerHTML = `
      <div class="game-title">${step.text}</div>
      <div class="game-content-emoji" onclick="advanceGame()">${step.emoji}</div>
      <button class="game-next-btn" onclick="advanceGame()">Clap!</button>`;
    speakText(step.text);
  } else if (game.items) {
    const item = game.items[state.currentGameStep % game.items.length];
    const extra = item.sound || item.action || '';
    display.innerHTML = `
      <div class="game-title">${game.name}</div>
      <div class="game-content-emoji" onclick="advanceGame()">${item.emoji}</div>
      <div class="game-answer">${item.name || ''}</div>
      <p class="game-instruction">${extra}</p>
      <button class="game-next-btn" onclick="advanceGame()">Next →</button>`;
    const phrase = `${name}, ${item.name}! ${extra}`;
    speakText(phrase);
  }
}
function advanceGame() {
  state.currentGameStep++;
  renderGame();
}

// ─── STORY MODE ───
function buildStoryList() {
  const list = document.getElementById('storyList');
  STORIES.forEach(story => {
    const el = document.createElement('div');
    el.className = 'story-thumb';
    el.innerHTML = `
      <div class="story-thumb-icon">${story.icon}</div>
      <div class="story-thumb-info">
        <h4>${story.title}</h4>
        <p>${story.pages.length} pages</p>
        <span class="story-thumb-tag">${story.ageTag}</span>
      </div>`;
    el.addEventListener('click', () => openStory(story.id));
    list.appendChild(el);
  });
}
function openStory(id) {
  state.currentStory = STORIES.find(s => s.id === id);
  state.currentStoryPage = 0;
  document.getElementById('storyList').style.display = 'none';
  document.getElementById('storyReader').style.display = 'block';
  document.getElementById('storyHeaderDisplay').innerHTML = `
    <div class="story-big-icon">${state.currentStory.icon}</div>
    <h3>${state.currentStory.title}</h3>`;
  renderStoryPage();
}
function exitStory() {
  document.getElementById('storyList').style.display = 'flex';
  document.getElementById('storyReader').style.display = 'none';
  state.currentStory = null;
  window.speechSynthesis && window.speechSynthesis.cancel();
}
function renderStoryPage() {
  const story = state.currentStory;
  if (!story) return;
  const pages = document.getElementById('storyPages');
  const page = story.pages[state.currentStoryPage];
  const text = insertName(page.text);
  pages.innerHTML = `
    <div class="story-page active">
      <div class="story-page-emoji">${page.emoji}</div>
      <p>${text}</p>
    </div>`;
  document.getElementById('storyPageIndicator').textContent =
    `${state.currentStoryPage + 1} / ${story.pages.length}`;
}
function nextPage() {
  if (!state.currentStory) return;
  if (state.currentStoryPage < state.currentStory.pages.length - 1) {
    state.currentStoryPage++;
    renderStoryPage();
  } else {
    showToast('🎉 Story finished! The End. 📖');
    const name = state.babyNick || state.babyName;
    speakText(`The end! Good job listening, ${name}!`);
  }
}
function prevPage() {
  if (state.currentStoryPage > 0) {
    state.currentStoryPage--;
    renderStoryPage();
  }
}
function readPageAloud() {
  const story = state.currentStory;
  if (!story) return;
  const text = insertName(story.pages[state.currentStoryPage].text);
  speakText(text);
}

// ─── AUTO TALK ───
function selectATMode(mode, btn) {
  state.atMode = mode;
  document.querySelectorAll('.at-mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
function selectATDuration(mins, btn) {
  state.atDuration = mins;
  document.querySelectorAll('.timer-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Show volume warning if > 10 min
  document.getElementById('volumeWarning').style.display = mins >= 10 ? 'block' : 'none';
}
function setupATVolume() {
  const slider = document.getElementById('atVolume');
  const val = document.getElementById('atVolumeVal');
  slider.addEventListener('input', () => {
    val.textContent = slider.value + '%';
    if (parseInt(slider.value) > 80) {
      document.getElementById('volumeWarning').style.display = 'block';
    }
  });
}
function resetAutoTalkUI() {
  document.getElementById('btnATStop').style.display = 'none';
  document.getElementById('btnATpause').style.display = 'none';
  document.getElementById('btnATStart').style.display = 'inline-flex';
  document.getElementById('atProgress').classList.remove('active');
  document.getElementById('atCurrentPhrase').textContent = '–';
  document.getElementById('atProgressFill').style.width = '0%';
  document.getElementById('atTimerDisplay').textContent = '00:00';
  state.atRunning = false;
  state.atPaused = false;
}
function startAutoTalk() {
  if (state.atRunning) return;
  const totalSecs = state.atDuration * 60;
  state.atElapsed = 0;
  state.atRunning = true;
  state.atPaused = false;
  state.atPhraseIndex = 0;

  document.getElementById('btnATStart').style.display = 'none';
  document.getElementById('btnATStop').style.display = 'inline-flex';
  document.getElementById('btnATpause').style.display = 'inline-flex';
  document.getElementById('atProgress').classList.add('active');

  const doll = document.getElementById('autotalkDoll');
  doll.classList.add('pulse');

  function tick() {
    if (!state.atRunning || state.atPaused) return;
    state.atElapsed++;
    const pct = (state.atElapsed / totalSecs) * 100;
    document.getElementById('atProgressFill').style.width = pct + '%';
    const rem = totalSecs - state.atElapsed;
    const m = Math.floor(rem / 60).toString().padStart(2,'0');
    const s = (rem % 60).toString().padStart(2,'0');
    document.getElementById('atTimerDisplay').textContent = `${m}:${s}`;
    if (state.atElapsed >= totalSecs) {
      stopAutoTalk();
      showToast('✅ Auto Talk session complete. 💛');
      return;
    }
  }

  function speakNext() {
    if (!state.atRunning || state.atPaused) return;
    const phrases = getPhrases(state.atMode);
    const phrase = phrases[state.atPhraseIndex % phrases.length];
    state.atPhraseIndex++;
    document.getElementById('atCurrentPhrase').textContent = phrase;
    speakText(phrase);
  }

  speakNext();
  state.atInterval = setInterval(() => {
    if (!state.atRunning || state.atPaused) return;
    tick();
    // Speak every ~12 seconds
    if (state.atElapsed % 12 === 0) speakNext();
  }, 1000);
}
function stopAutoTalk() {
  state.atRunning = false;
  state.atPaused = false;
  if (state.atInterval) { clearInterval(state.atInterval); state.atInterval = null; }
  window.speechSynthesis && window.speechSynthesis.cancel();
  document.getElementById('autotalkDoll').classList.remove('pulse');
  resetAutoTalkUI();
}
function pauseAutoTalk() {
  state.atPaused = !state.atPaused;
  const btn = document.getElementById('btnATpause');
  if (state.atPaused) {
    btn.textContent = '▶ Resume';
    window.speechSynthesis && window.speechSynthesis.pause();
  } else {
    btn.textContent = '⏸ Pause';
    window.speechSynthesis && window.speechSynthesis.resume();
    // Continue speaking
    const phrases = getPhrases(state.atMode);
    const phrase = phrases[state.atPhraseIndex % phrases.length];
    speakText(phrase);
  }
}
function startAutoTalkMode(mode, mins) {
  state.atMode = mode;
  state.atDuration = mins;
  showScreen('autotalk');
  document.querySelectorAll('.at-mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
}

// ─── SETTINGS ───
function populateSettings() {
  document.getElementById('settingName').value = state.babyName;
  document.getElementById('settingNick').value = state.babyNick || '';
  document.getElementById('settingAge').value = state.babyAge;
  document.getElementById('settingLang').value = state.language;
  document.querySelectorAll('.voice-option').forEach(el => {
    const v = el.dataset.voice;
    el.classList.toggle('active', v === state.voiceStyle);
    el.querySelector('input').checked = v === state.voiceStyle;
  });
}
function saveSettings() {
  const name = document.getElementById('settingName').value.trim();
  if (!name) { showToast('Please enter a baby name.'); return; }
  state.babyName = name;
  state.babyNick = document.getElementById('settingNick').value.trim();
  state.babyAge = document.getElementById('settingAge').value;
  state.language = document.getElementById('settingLang').value;
  const checked = document.querySelector('input[name="voiceStyle"]:checked');
  if (checked) state.voiceStyle = checked.value;
  saveState();
  updateHomeGreeting();
  showToast('✅ Settings saved! 💛');
  showScreen('home');
}
function setupVoiceOptions() {
  document.querySelectorAll('.voice-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.voice-option').forEach(e => e.classList.remove('active'));
      el.classList.add('active');
      el.querySelector('input').checked = true;
    });
  });
}

// ─── PARENT RECORDING ───
function buildRecordingPhrases() {
  const section = document.getElementById('recordingPhrases');
  PARENT_PHRASES.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'rec-phrase-row';
    row.innerHTML = `
      <span class="rec-phrase-text">"${p}"</span>
      <button class="rec-phrase-btn" id="recBtn${i}" onclick="handleRecPhrase(${i}, '${p.replace(/'/g,"\\'")}')">🎙 Record</button>`;
    section.appendChild(row);
  });
}
function openRecordingGate() {
  const ok = confirm('Parent Gate: Are you the parent or guardian of this baby?');
  if (ok) {
    document.getElementById('recordingSection').style.display = 'block';
    document.getElementById('btnOpenRecording').textContent = '✓ Unlocked';
    document.getElementById('btnOpenRecording').disabled = true;
    showToast('Recording section unlocked 🔓');
  }
}
function handleRecPhrase(index, phrase) {
  showToast(`🎤 Voice recording requires a native app. Phrase saved as text: "${phrase}"`);
  state.recordings[index] = { phrase, type: 'text' };
  const btn = document.getElementById('recBtn' + index);
  if (btn) { btn.textContent = '✓ Saved'; btn.style.background = '#B5FFD5'; btn.style.color = '#2A6A4A'; }
}

// ─── DELETE DATA ───
function confirmDeleteData() {
  const ok = confirm('Delete all baby data? This cannot be undone.');
  if (ok) {
    localStorage.removeItem('babyAIDoll');
    state.babyName = ''; state.babyNick = ''; state.recordings = {};
    showToast('🗑 Baby data deleted.');
    showScreen('welcome');
  }
}

// ─── TOAST ───
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Expose globals ───
window.goMode = goMode;
window.goBack = goBack;
window.playSound = playSound;
window.stopSound = stopSound;
window.speakRandom = speakRandom;
window.speakText = speakText;
window.toggleNightMode = toggleNightMode;
window.setTimer = setTimer;
window.clearTimer = clearTimer;
window.nextLearn = nextLearn;
window.prevLearn = prevLearn;
window.speakLearn = speakLearn;
window.exitGame = exitGame;
window.advanceGame = advanceGame;
window.nextPage = nextPage;
window.prevPage = prevPage;
window.readPageAloud = readPageAloud;
window.exitStory = exitStory;
window.selectATMode = selectATMode;
window.selectATDuration = selectATDuration;
window.startAutoTalk = startAutoTalk;
window.stopAutoTalk = stopAutoTalk;
window.pauseAutoTalk = pauseAutoTalk;
window.startAutoTalkMode = startAutoTalkMode;
window.saveSettings = saveSettings;
window.populateSettings = populateSettings;
window.openRecordingGate = openRecordingGate;
window.handleRecPhrase = handleRecPhrase;
window.confirmDeleteData = confirmDeleteData;
