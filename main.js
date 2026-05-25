import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for Smooth Momentum Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
if (window.location.hash) {
  window.history.replaceState(null, null, window.location.pathname);
  window.scrollTo(0, 0);
}

// Navbar Blur Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileOverlay) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = mobileMenuBtn.classList.contains('open');
    if (isOpen) {
      mobileMenuBtn.classList.remove('open');
      mobileOverlay.classList.remove('open');
      lenis.start();
    } else {
      mobileMenuBtn.classList.add('open');
      mobileOverlay.classList.add('open');
      lenis.stop();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('open');
      mobileOverlay.classList.remove('open');
      lenis.start();
    });
  });
}

// Global smooth reveal for all major elements (desktop only)
if (window.innerWidth > 768) {
  gsap.utils.toArray('.price-list, .process-sticky').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    });
  });

  // Kinetic Text Reveal (SplitType)
  const titles = document.querySelectorAll('.text-title');
  titles.forEach(title => {
    const splitTitle = new SplitType(title, { types: 'words, chars' });
    gsap.from(splitTitle.chars, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
      },
      opacity: 0,
      y: 50,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  });
}

// 3D Card Tilt Effect
const tiltCards = document.querySelectorAll('.service-card, .tm-card');
if (window.matchMedia('(hover: hover)').matches) {
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// Magnetic Hover Buttons
const magneticButtons = document.querySelectorAll('.btn-solid');
if (window.matchMedia('(hover: hover)').matches) {
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' });
    });
  });
}

// Global Parallax Effect
gsap.utils.toArray('.parallax-bg').forEach((bg) => {
  gsap.to(bg, {
    yPercent: 20, // Move down slightly as you scroll down
    ease: "none",
    scrollTrigger: {
      trigger: bg.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Results block reveal (desktop only)
if (window.innerWidth > 768) {
  gsap.from('.ba-slider', {
    scrollTrigger: {
      trigger: '.results-layout',
      start: 'top 80%',
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
  });

  gsap.from('.case-card', {
    scrollTrigger: {
      trigger: '.results-layout',
      start: 'top 80%',
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    delay: 0.1,
    ease: 'power4.out'
  });

  // Initial Hero Load
  const tl = gsap.timeline();

  tl.from('.hero-bg', {
    scale: 1.1,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
  })
  .from('.hero-headline', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, "-=1")
  .from('.hero-sub', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, "-=0.6")
  .from('.hero .btn-solid', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, "-=0.5")
  .from('.hero-glass-card', {
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.5)'
  }, "-=0.8");
}

// Marquee GSAP
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
  // clone nodes for infinite scroll
  const children = Array.from(marqueeTrack.children);
  children.forEach(child => {
    marqueeTrack.appendChild(child.cloneNode(true));
  });
  
  let currentScroll = 0;
  let isScrollingDown = true;
  
  const marqueeTween = gsap.to(marqueeTrack, {
    xPercent: -50,
    ease: "none",
    duration: 15,
    repeat: -1
  });
  
  window.addEventListener('scroll', () => {
    isScrollingDown = window.scrollY > currentScroll;
    currentScroll = window.scrollY;
    
    gsap.to(marqueeTween, {
      timeScale: isScrollingDown ? 1 : -1,
      duration: 0.5
    });
  });
}

// Desktop-only ScrollTrigger animations
if (window.innerWidth > 768) {
  // Services Cards Reveal
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.services-bento-grid',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: i * 0.15,
      ease: 'power4.out'
    });
  });

  // Process Items Stagger Reveal
  gsap.utils.toArray('.process-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: '.process-list',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: i * 0.15,
      ease: 'power4.out'
    });
  });

  // Testimonials Reveal
  gsap.utils.toArray('.t-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 75%',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      delay: i * 0.2,
      ease: 'power4.out'
    });
  });

  // Team Cards Parallax/Reveal + Masking
  gsap.utils.toArray('.tm-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.specialists',
        start: 'top 80%',
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: i * 0.15,
      ease: 'power4.out'
    });
    
    const img = card.querySelector('.tm-img');
    if(img) {
      gsap.from(img, {
        scrollTrigger: {
          trigger: '.specialists',
          start: 'top 80%',
        },
        clipPath: 'inset(100% 0 0 0)',
        duration: 1.5,
        delay: i * 0.15,
        ease: 'power3.inOut'
      });
    }
  });

  // Story Image Masking
  gsap.from('.story-main img, .story-side img', {
    scrollTrigger: {
      trigger: '.visual-story',
      start: 'top 75%',
    },
    clipPath: 'inset(100% 0 0 0)',
    duration: 1.5,
    stagger: 0.2,
    ease: 'power3.inOut'
  });

  // Footer Reveal
  gsap.from('.footer-huge', {
    scrollTrigger: {
      trigger: '.footer-mag',
      start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
  });
}

// Before/After Slider Logic
const slider = document.getElementById('ba-slider');
const afterImage = document.getElementById('ba-after');
const handle = document.getElementById('ba-handle');

if (slider && afterImage && handle) {
  let isDragging = false;

  const updateSlider = (x) => {
    const rect = slider.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    
    // Clamp
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    
    afterImage.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
    handle.style.left = `${position}%`;
  };

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  // Mobile Touch Support
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  }, {passive: true});
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  }, {passive: true});
  
}

// Price Drawer Toggle Logic
const openPricesBtn = document.getElementById('openPricesBtn');
const priceDrawer = document.getElementById('priceDrawer');
if (openPricesBtn && priceDrawer) {
  openPricesBtn.addEventListener('click', () => {
    const isOpen = priceDrawer.classList.toggle('open');
    openPricesBtn.textContent = isOpen ? 'Свернуть цены' : 'Открыть все цены';
    if (isOpen) {
      setTimeout(() => {
        priceDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  });
}

// Mobile CTA Logic
const mobileCta = document.getElementById('mobileCta');
if (mobileCta) {
  const updateCta = () => mobileCta.classList.toggle('show', (window.scrollY || 0) > 620);
  updateCta();
  window.addEventListener('scroll', updateCta, { passive: true });
}

// Contact Form Logic
const leadForm = document.getElementById('leadForm');
const formNote = document.getElementById('formNote');
if (leadForm && formNote) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.textContent = 'Спасибо. Заявка принята, администратор свяжется с вами в ближайшее время.';
    formNote.style.color = '#0d9488';
    leadForm.reset();
  });
}

// Extra GSAP Reveals for newly added elements (desktop only)
if (window.innerWidth > 768) {
  gsap.utils.toArray('.trust-chip, .story-main, .story-side, .case-card, .contact-info, .contact-form, .map').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });
}
