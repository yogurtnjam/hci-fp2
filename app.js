const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('.nav-btn');
const habitRange = document.getElementById('habit-range');
const habitOutput = document.getElementById('habit-output');
const contextButtons = document.querySelectorAll('[data-context]');
const contextOutput = document.getElementById('context-output');
const sessionDurationEl = document.getElementById('session-duration');
const sessionCaptionEl = document.getElementById('session-caption');
const adaptiveStateEl = document.getElementById('adaptive-state');
const streakEl = document.getElementById('streak-count');
const colorPreview = document.getElementById('color-preview');
const scrollFeed = document.getElementById('scroll-feed');
const slowdownMessage = document.getElementById('slowdown-message');
const breakMessage = document.getElementById('break-message');
const breakChip = document.getElementById('break-chip');
const logBreakBtn = document.getElementById('log-break');
const reflectionLog = document.getElementById('reflection-log');
const mockDataList = document.getElementById('mock-data');
const adaptiveToggle = document.getElementById('adaptive-toggle');
const cueIntensityRange = document.getElementById('cue-intensity');
const intensityOutput = document.getElementById('intensity-output');

const appState = {
  sessionStart: Date.now(),
  mindfulBreaks: 1,
  streak: 1,
  cueIntensity: 0.5,
  adaptive: true,
  context: 'studying',
  lastInteraction: Date.now(),
  pauseSuggestionShown: false,
  scrollStress: 0,
  reflectionEntries: [],
};

function setActiveScreen(id) {
  screens.forEach((section) => {
    section.classList.toggle('active', section.id === id);
  });
  navButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.screenTarget === id);
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => setActiveScreen(btn.dataset.screenTarget));
});

habitRange.addEventListener('input', (event) => {
  const labels = {
    1: 'Need extra care',
    2: 'Feeling scattered',
    3: 'Balanced today',
    4: 'Gentle focus',
    5: 'Flowing focus',
  };
  habitOutput.textContent = labels[event.target.value];
  updateAmbientIntensity();
});

contextButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    contextButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const labelMap = {
      studying: 'Studying quietly',
      relaxing: 'Resting & recharging',
      social: 'Soft social scrolling',
    };
    appState.context = btn.dataset.context;
    contextOutput.textContent = labelMap[btn.dataset.context];
  });
});

const emojiButtons = document.querySelectorAll('.emoji');
emojiButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const entry = `${btn.textContent} · ${btn.dataset.mood} · ${timestamp}`;
    appState.reflectionEntries.unshift(entry);
    appState.reflectionEntries = appState.reflectionEntries.slice(0, 4);
    reflectionLog.innerHTML = appState.reflectionEntries.map((line) => `<p>${line}</p>`).join('');
    appState.mindfulBreaks += 1;
    appState.streak += 1;
    updateDashboard();
    hideBreakSuggestion();
  })
);

function updateDashboard() {
  streakEl.textContent = appState.streak;
  const streakBar = document.querySelector('.streak-bar span');
  streakBar.style.width = `${Math.min(100, appState.streak * 20)}%`;
  mockDataList.innerHTML = `
    <li>Session length average: ${getSessionMinutes().toFixed(1)} min</li>
    <li>Fast scroll events (mocked): ${Math.round(appState.scrollStress * 10)}</li>
    <li>Mindful breaks logged: ${appState.mindfulBreaks}</li>`;
}

function getSessionMinutes() {
  return (Date.now() - appState.sessionStart) / 60000;
}

function updateAmbientIntensity() {
  const minutes = getSessionMinutes();
  const sliderFactor = parseInt(habitRange.value, 10) / 5;
  const intensityBase = Math.min(1, minutes / 45 + appState.scrollStress * 0.5);
  const adaptiveBoost = appState.adaptive ? 0.1 : 0;
  const combined = Math.min(1, (intensityBase + sliderFactor * 0.3 + adaptiveBoost) * appState.cueIntensity);
  document.documentElement.style.setProperty('--ambient-shift', combined.toFixed(2));

  const states = [
    'Calm baseline',
    'Soft guidance',
    'Warm reminder',
    'Strong restorative nudge',
  ];
  const stateIndex = Math.min(states.length - 1, Math.floor(combined * states.length));
  adaptiveStateEl.textContent = states[stateIndex];

  sessionCaptionEl.textContent =
    combined > 0.6 ? 'Amber glow says “time for a breath”.' : 'Soft sunrise hues = light focus.';
}

function updateSessionDuration() {
  const minutes = getSessionMinutes();
  const mins = Math.floor(minutes);
  const secs = Math.floor((minutes - mins) * 60);
  sessionDurationEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
}

function checkIdleBreak() {
  const idleMs = Date.now() - appState.lastInteraction;
  if (idleMs > 15000 && !appState.pauseSuggestionShown) {
    showBreakSuggestion('You’ve been working hard — want a tiny reset?');
  }
}

function showBreakSuggestion(message) {
  appState.pauseSuggestionShown = true;
  breakMessage.textContent = message;
  breakChip.hidden = false;
}

function hideBreakSuggestion() {
  appState.pauseSuggestionShown = false;
  breakChip.hidden = true;
}

['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach((evt) =>
  document.addEventListener(evt, () => {
    appState.lastInteraction = Date.now();
  })
);

breakChip.addEventListener('click', () => {
  setActiveScreen('break');
});

logBreakBtn.addEventListener('click', () => {
  appState.mindfulBreaks += 1;
  appState.streak = appState.mindfulBreaks;
  updateDashboard();
  showBreakSuggestion('Take 20 seconds to stretch?');
  setActiveScreen('reflection');
});

let lastScrollTime = 0;
scrollFeed.addEventListener(
  'wheel',
  (event) => {
    const now = performance.now();
    const deltaTime = now - lastScrollTime;
    lastScrollTime = now;
    const scrollSpeed = Math.abs(event.deltaY) / Math.max(1, deltaTime);
    if (scrollSpeed > 0.5) {
      appState.scrollStress = Math.min(1, appState.scrollStress + 0.05);
      document.body.dataset.slow = 'true';
      slowdownMessage.classList.add('active');
      event.preventDefault();
      scrollFeed.scrollTop += event.deltaY * 0.35;
      showBreakSuggestion('Let’s take things slow 🌿');
    } else {
      document.body.dataset.slow = 'false';
      slowdownMessage.classList.remove('active');
    }
    updateAmbientIntensity();
  },
  { passive: false }
);

scrollFeed.addEventListener('scroll', () => {
  appState.lastInteraction = Date.now();
});

cueIntensityRange.addEventListener('input', (event) => {
  const value = Number(event.target.value);
  appState.cueIntensity = value / 100;
  intensityOutput.textContent = `${value}%`;
  updateAmbientIntensity();
});

adaptiveToggle.addEventListener('change', (event) => {
  appState.adaptive = event.target.checked;
  updateAmbientIntensity();
});

setInterval(() => {
  updateSessionDuration();
  updateAmbientIntensity();
  checkIdleBreak();
}, 1000);

updateDashboard();
updateAmbientIntensity();
setActiveScreen('onboarding');
