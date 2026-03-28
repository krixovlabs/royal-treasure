/* ══════════════════════════════════════════════════
   ROYAL TREASURE — Premium Interactive Script
   ══════════════════════════════════════════════════ */

// ── LOADING SCREEN ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader')?.classList.add('hidden');
  }, 800);
});

// ── FLOATING GOLD PARTICLES ──
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 50;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.5 - 0.1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      this.opacity = (this.life / this.maxLife) * 0.4;
      if (this.life <= 0 || this.y < -10) this.reset();
      if (this.y < -10) { this.y = canvas.height + 10; }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = '#C9A84C';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#C9A84C';
      ctx.beginPath();
      // Diamond shape
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x + this.size * 0.7, this.y);
      ctx.lineTo(this.x, this.y + this.size);
      ctx.lineTo(this.x - this.size * 0.7, this.y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── NAVBAR SCROLL ──
const nav = document.getElementById('main-nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
  lastScroll = window.scrollY;
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION ──
const statNums = document.querySelectorAll('.stat-num[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      const target = parseInt(e.target.dataset.count);
      const suffix = e.target.dataset.suffix || '';
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        e.target.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => countObserver.observe(el));

// ── FILTER BUTTONS ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── ENQUIRE BUTTONS ──
document.querySelectorAll('.item-enquire').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const t = e.target;
    t.textContent = 'Sent ✦';
    t.style.background = 'var(--mahogany)';
    t.style.color = 'var(--gold)';
    t.style.border = '1px solid var(--gold)';
    setTimeout(() => {
      t.textContent = 'Enquire';
      t.style.background = '';
      t.style.color = '';
      t.style.border = '';
    }, 2500);
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── FORM HANDLING ──
const formSubmit = document.querySelector('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    formSubmit.textContent = '✦ Enquiry Received ✦';
    formSubmit.style.background = 'var(--mahogany)';
    formSubmit.style.color = 'var(--gold)';
    formSubmit.style.border = '1px solid var(--gold)';
    setTimeout(() => {
      formSubmit.textContent = 'Send Royal Enquiry';
      formSubmit.style.background = '';
      formSubmit.style.color = '';
      formSubmit.style.border = '';
    }, 3000);
  });
}

// ── PARALLAX SUBTLE ──
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.15}px)`;
  }
});

// ── HAMBURGER MENU (mobile) ──
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.nav-links');
if (hamburger && mobileMenu) {
  let menuOpen = false;
  hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.style.display = 'flex';
      mobileMenu.style.position = 'absolute';
      mobileMenu.style.top = '68px';
      mobileMenu.style.left = '0';
      mobileMenu.style.right = '0';
      mobileMenu.style.flexDirection = 'column';
      mobileMenu.style.background = 'rgba(254,251,243,0.98)';
      mobileMenu.style.padding = '16px 20px';
      mobileMenu.style.gap = '16px';
      mobileMenu.style.borderBottom = '1px solid rgba(155,125,46,0.15)';
      mobileMenu.style.backdropFilter = 'blur(12px)';
      mobileMenu.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
    } else {
      mobileMenu.style.display = 'none';
    }
  });
  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.style.display = 'none';
    });
  });
}
