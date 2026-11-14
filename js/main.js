/**
 * JARDINS CLAROS - MAIN CORE JAVASCRIPT
 * Ambient Soundscape, Navigation, Mobile Drawer & Global Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initSoundscape();
  initLanguageSwitcher();
});

/* Sticky Header on Scroll */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Mobile Hamburger Menu */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    
    // Animate hamburger lines
    const spans = toggleBtn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close when clicking any link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      const spans = toggleBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* Ambient Natural Soundscape using Web Audio API
   (Synthesizes gentle Mediterranean forest breeze and subtle birdsong) */
let audioCtx = null;
let soundscapeActive = false;
let masterGain = null;
let birdInterval = null;

function initSoundscape() {
  const toggleBtn = document.querySelector('.soundscape-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', async () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }

    if (audioCtx.state === 'suspended') {
      await audioCtx.resume();
    }

    if (!soundscapeActive) {
      startAmbientForest();
      soundscapeActive = true;
      toggleBtn.classList.add('playing');
      toggleBtn.querySelector('.sound-label').textContent = 'Som da Floresta';
      showToast('🍃 Paisagem sonora ativada: brisa e pássaros da floresta.');
    } else {
      stopAmbientForest();
      soundscapeActive = false;
      toggleBtn.classList.remove('playing');
      toggleBtn.querySelector('.sound-label').textContent = 'Ouvir a Floresta';
      showToast('🔇 Som da floresta pausado.');
    }
  });
}

function startAmbientForest() {
  if (!audioCtx || !masterGain) return;

  masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 1.5);

  // Generate Pink Noise for Gentle Wind in Maritime Pines
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
    b6 = white * 0.115926;
  }

  const windNode = audioCtx.createBufferSource();
  windNode.buffer = noiseBuffer;
  windNode.loop = true;

  // Filter wind to soft forest rustle
  const windFilter = audioCtx.createBiquadFilter();
  windFilter.type = 'lowpass';
  windFilter.frequency.setValueAtTime(320, audioCtx.currentTime);

  windNode.connect(windFilter);
  windFilter.connect(masterGain);
  windNode.start();

  // Subtle natural bird chirps every 4-8 seconds
  birdInterval = setInterval(() => {
    if (!soundscapeActive) return;
    playSoftBirdChirp();
  }, Math.random() * 4000 + 4000);
}

function playSoftBirdChirp() {
  if (!audioCtx || !soundscapeActive) return;

  const osc = audioCtx.createOscillator();
  const chirpGain = audioCtx.createGain();
  
  const now = audioCtx.currentTime;
  const baseFreq = 2600 + Math.random() * 800;

  osc.type = 'sine';
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.08);
  osc.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.16);

  chirpGain.gain.setValueAtTime(0.001, now);
  chirpGain.gain.linearRampToValueAtTime(0.06, now + 0.04);
  chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  osc.connect(chirpGain);
  chirpGain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 0.25);
}

function stopAmbientForest() {
  if (masterGain && audioCtx) {
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
  }
  if (birdInterval) {
    clearInterval(birdInterval);
  }
}

/* Toast Notifications */
function showToast(message, duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* Simulated Language Switcher */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.textContent.trim();
      if (lang === 'EN') {
        showToast('🇬🇧 English preview active. Botanical and heritage guides adapted.');
      } else {
        showToast('🇵🇹 Modo Português ativo.');
      }
    });
  });
}

window.showToast = showToast;
