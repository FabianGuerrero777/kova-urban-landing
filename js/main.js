/* ============================================
   KOVA URBAN — Main JavaScript
   GSAP Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ====== PRELOADER ======
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initAnimations();
    }, 1200);
  });

  // Fallback: hide preloader after 4s max
  setTimeout(() => {
    preloader.classList.add('hidden');
    initAnimations();
  }, 4000);

  // ====== NAVBAR SCROLL ======
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ====== HAMBURGER MENU ======
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ====== SMOOTH SCROLL ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ====== GSAP ANIMATIONS ======
  function initAnimations() {
    // Wait for GSAP to load
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Retry after a short delay if GSAP hasn't loaded yet
      setTimeout(initAnimations, 200);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Entrance Timeline ---
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
      .to('#heroBadge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .fromTo('#heroTitle', 
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' },
        '-=0.4'
      )
      .to('#heroSubtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .to('#heroCta', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .to('#scrollIndicator', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.2');

    // --- Hero parallax effect ---
    gsap.to('.hero-video', {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });

    // --- Hero title parallax ---
    gsap.to('.hero-content', {
      y: 150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: '30% top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // --- Red particle line animations ---
    document.querySelectorAll('.hero-particles .line').forEach((line, i) => {
      gsap.to(line, {
        opacity: 0.15,
        duration: 2 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3
      });
    });

    // --- Infinite Marquee ---
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack) {
      const marqueeWidth = marqueeTrack.scrollWidth / 2;
      
      gsap.to(marqueeTrack, {
        x: -marqueeWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % marqueeWidth)
        }
      });
    }

    // --- Section Header Reveal ---
    gsap.utils.toArray('.section-header.reveal-up, .section-header .reveal-up').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Product Cards Stagger ---
    const productCards = gsap.utils.toArray('.product-card');
    
    productCards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.15
        }
      );
    });

    // --- Product Card Hover Glow ---
    productCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          boxShadow: '0 20px 60px rgba(255, 0, 0, 0.15)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          boxShadow: '0 0px 0px rgba(255, 0, 0, 0)',
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    // --- Brand Banner Text ---
    gsap.utils.toArray('.brand-large-text').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    gsap.utils.toArray('.brand-tagline.reveal-up').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Trust Items Stagger ---
    const trustItems = gsap.utils.toArray('.trust-item');
    trustItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          delay: i * 0.2
        }
      );
    });

    // --- WhatsApp Float Entrance ---
    gsap.fromTo('#whatsappFloat',
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 2
      }
    );

    // --- Scroll-linked navbar red line ---
    const redProgress = document.createElement('div');
    redProgress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #FF0000, #CC0000);
      z-index: 10001;
      transform-origin: left;
      transform: scaleX(0);
    `;
    document.body.appendChild(redProgress);

    gsap.to(redProgress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    });

    // --- Magnetic effect on CTA button ---
    const heroCta = document.getElementById('heroCta');
    if (heroCta && window.innerWidth > 768) {
      heroCta.addEventListener('mousemove', (e) => {
        const rect = heroCta.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(heroCta, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      heroCta.addEventListener('mouseleave', () => {
        gsap.to(heroCta, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    }

    // --- Custom cursor glow effect (desktop only) ---
    if (window.innerWidth > 1024) {
      const cursorGlow = document.createElement('div');
      cursorGlow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,0,0,0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
      `;
      document.body.appendChild(cursorGlow);

      document.addEventListener('mousemove', (e) => {
        gsap.to(cursorGlow, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }

    // --- Text split animation for section title ---
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
      const text = sectionTitle.textContent;
      sectionTitle.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(40px)';
        sectionTitle.appendChild(span);
      });

      gsap.to(sectionTitle.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionTitle,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

  } // end initAnimations

  // ====== INTERSECTION OBSERVER FALLBACK ======
  // For browsers where GSAP might not load
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

});
