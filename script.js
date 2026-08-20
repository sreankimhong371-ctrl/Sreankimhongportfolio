/* =====================================================
   SREAN KIMHONG — Graphic Designer Portfolio
   JavaScript — Interactions, Animations & Canvas
   ===================================================== */

// ========== LOADER ==========
(function initLoader() {
  document.body.classList.add('loading');
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 18 + 5;
    if (width >= 100) {
      width = 100;
      progress.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.remove('loading');
        initHeroAnimations();
      }, 500);
    } else {
      progress.style.width = width + '%';
    }
  }, 80);
})();

// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

const interactiveEls = document.querySelectorAll('a, button, .filter-tab, .portfolio-card, .sw-skill, .contact-item');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor && cursorTrail) {
      cursor.classList.add('hover');
      cursorTrail.classList.add('hover');
    }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor && cursorTrail) {
      cursor.classList.remove('hover');
      cursorTrail.classList.remove('hover');
    }
  });
});

// ========== CANVAS PARTICLES ==========
const canvas = document.getElementById('heroCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
if (canvas && ctx) {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

const particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * (canvas ? canvas.width : 800);
    this.y = Math.random() * (canvas ? canvas.height : 600);
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '96, 165, 250' : '147, 197, 253';
    this.life = 0;
    this.maxLife = Math.random() * 300 + 200;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life++;
    if (this.life > this.maxLife || this.x < 0 || (canvas && this.x > canvas.width) || this.y < 0 || (canvas && this.y > canvas.height)) {
      this.reset();
    }
  }
  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function drawConnections() {
  if (!ctx) return;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const alpha = (1 - dist / 120) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}

if (canvas && ctx) {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ========== HERO ANIMATIONS ==========
function initHeroAnimations() {
  const heroEls = document.querySelectorAll('.hero-badge, .hero-greeting, .hero-title, .hero-role-wrap, .hero-sub, .hero-cta, .hero-stats, .hero-card, .scroll-indicator');
  heroEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.8s ease ${i * 0.1 + 0.2}s, transform 0.8s ease ${i * 0.1 + 0.2}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });

  setTimeout(animateCounters, 800);
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 40);
  });
}

// ========== NAVIGATION ==========
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
});

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger && mobileMenu) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

function updateActiveNav() {
  const sections = ['home', 'about', 'skills', 'experience', 'portfolio', 'contact'];
  const scrollPos = window.scrollY + 140;

  sections.forEach(id => {
    const el = document.getElementById(id);
    const navLink = document.getElementById('nav-' + id);
    if (el && navLink) {
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      navLink.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
    }
  });
}

// ========== SCROLL REVEAL ==========
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.about-grid, .skills-two-col, .timeline-two-col, .contact-grid, .section-label, .section-title, .section-sub, .filter-tabs'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ========== SKILL BARS ANIMATION ==========
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.sw-fill');
      fills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const softwareSkills = document.querySelector('.software-skills');
if (softwareSkills) {
  skillObserver.observe(softwareSkills);
}

// ========== PORTFOLIO FILTER & ANIMATIONS ==========
const filterTabs = document.querySelectorAll('.filter-tab');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.getAttribute('data-filter');

    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const shouldShow = filter === 'all' || category === filter;

      if (shouldShow) {
        item.classList.remove('hidden');
        setTimeout(() => item.classList.add('motion-visible'), 50);
      } else {
        item.classList.remove('motion-visible');
        item.classList.add('hidden');
      }
    });
  });
});

// ========== LIGHTBOX FOR POSTERS ==========
function openLightbox(imageSrc, captionText) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (lightbox && lightboxImg) {
    lightboxImg.src = imageSrc;
    if (lightboxCaption) lightboxCaption.textContent = captionText;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const sendBtnText = document.getElementById('sendBtnText');

if (contactForm && formSuccess && sendBtnText) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendBtnText.textContent = 'Sending...';

    setTimeout(() => {
      sendBtnText.textContent = 'Send Message 🚀';
      formSuccess.classList.add('visible');
      contactForm.reset();
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }, 1200);
  });
}

// ========== PAGE PROGRESS & EXTRA INTERACTIONS ==========
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress = document.getElementById('pageProgress');

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if (reduceMotion) return;

  const itemObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      itemObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  portfolioItems.forEach((item, i) => {
    item.style.transitionDelay = `${Math.min(i % 3, 2) * 100}ms`;
    itemObserver.observe(item);
  });

  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
})();

// ========== HANGING PROFILE CARD 3D INTERACTION ==========
(() => {
  const card = document.getElementById('profileIdCard');
  if (!card) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let raf = null;
  let targetX = 0;
  let targetY = 0;

  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    targetX = x * 9;
    targetY = y * -7;

    if (!raf) {
      raf = requestAnimationFrame(() => {
        card.style.animationPlayState = 'paused';
        card.style.transform =
          `rotateZ(${(targetX * 0.18).toFixed(2)}deg) ` +
          `rotateX(${targetY.toFixed(2)}deg) ` +
          `rotateY(${targetX.toFixed(2)}deg) ` +
          `translateY(-6px)`;
        raf = null;
      });
    }
  });

  card.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
    card.style.transform = '';
    card.style.animationPlayState = '';
  });
})();


// ========== PREMIUM HANGING-BADGE PHYSICS ==========
(() => {
  const card = document.getElementById('profileIdCard');
  if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let active = false;
  let raf = null;
  let mouseX = 0;
  let mouseY = 0;

  const update = () => {
    raf = null;
    if (!active) return;

    const r = card.getBoundingClientRect();
    const px = (mouseX - r.left) / r.width - .5;
    const py = (mouseY - r.top) / r.height - .5;

    const rotateY = px * 8;
    const rotateX = -py * 6;
    const swing = px * 3.5;

    card.style.animationPlayState = 'paused';
    card.style.transform =
      `rotateZ(${swing.toFixed(2)}deg) ` +
      `rotateX(${rotateX.toFixed(2)}deg) ` +
      `rotateY(${rotateY.toFixed(2)}deg) ` +
      `translateY(-5px)`;
  };

  card.addEventListener('pointerenter', () => {
    active = true;
  });

  card.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!raf) raf = requestAnimationFrame(update);
  });

  card.addEventListener('pointerleave', () => {
    active = false;
    card.style.transform = '';
    card.style.animationPlayState = '';
  });
})();
