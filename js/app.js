/**
 * IRONVAULT FITNESS // Built by Discipline
 * Cinematic Motion System Controller (GSAP & ScrollTrigger)
 */

function initIronVaultMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Scroll Progress Bar ---
  const progressBar = document.getElementById('scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // Fallback for reduced motion or missing libraries
  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.log('[IRONVAULT] Standard motion active (reduced motion or fallback)');
    const counters = document.querySelectorAll('.metric-counter');
    counters.forEach(el => {
      el.textContent = el.getAttribute('data-target') || el.textContent;
    });
    return;
  }

  // Register plugin
  gsap.registerPlugin(ScrollTrigger);

  const isDesktop = window.innerWidth >= 1024;

  // ========================================================
  // 01 — OPENING SCENE: CINEMATIC HERO CHOREOGRAPHY
  // ========================================================
  // Elements are visible by default in HTML/CSS for instantaneous rendering.
  // We apply a fluid choreographed entrance on page load.
  const heroLines = document.querySelectorAll('.hero-title-line');
  const heroBadge = document.querySelector('.hero-category');
  const heroCopy = document.querySelector('.hero-copy-block');
  const heroCtas = document.querySelector('.hero-cta-group');
  const heroMaskWrap = document.querySelector('.hero-mask-wrap');

  // Hero entrance timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (heroMaskWrap) {
    heroTl.fromTo(heroMaskWrap,
      { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0.9 },
      { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.1, ease: 'power3.inOut' },
      0
    );
  }

  if (heroBadge) {
    heroTl.fromTo(heroBadge,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.2
    );
  }

  if (heroLines.length > 0) {
    heroTl.fromTo(heroLines,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
      0.3
    );
  }

  if (heroCopy) {
    heroTl.fromTo(heroCopy,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.65
    );
  }

  if (heroCtas) {
    heroTl.fromTo(heroCtas,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.75
    );
  }

  // 4. Coordinated scroll transition into Scene 02 / Metrics
  if (isDesktop) {
    // Subtle parallax depth and scale on the photograph as user scrolls away
    gsap.to('#hero-img', {
      yPercent: 8,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    });

    // Clean subtle parallax on the copy block
    gsap.to('.hero-copy-block', {
      y: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    });

    // Elevate header styling on scroll
    ScrollTrigger.create({
      start: 'top -60',
      onEnter: () => {
        const header = document.getElementById('main-header');
        if (header) {
          header.classList.add('border-b', 'border-[#33363F]', 'bg-[#0A0B0D]/98');
          header.classList.remove('bg-[#0A0B0D]/90');
        }
      },
      onLeaveBack: () => {
        const header = document.getElementById('main-header');
        if (header) {
          header.classList.remove('border-[#33363F]', 'bg-[#0A0B0D]/98');
          header.classList.add('bg-[#0A0B0D]/90');
        }
      }
    });
  }

  // ========================================================
  // METRICS BENCHMARK STRIP
  // ========================================================
  const metricCards = document.querySelectorAll('.metric-card');
  if (metricCards.length > 0) {
    ScrollTrigger.create({
      trigger: '#metrics',
      start: 'top 95%',
      once: true,
      onEnter: () => {
        gsap.fromTo(metricCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out'
          }
        );

        // Numeric counter roll
        const counters = document.querySelectorAll('.metric-counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toLocaleString();
            }
          });
        });
      }
    });
  }

  // ========================================================
  // SECTION HEADERS STAGGER REVEAL
  // ========================================================
  const headers = document.querySelectorAll('.section-reveal-header');
  headers.forEach(header => {
    gsap.fromTo(header.children,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 90%',
          once: true
        }
      }
    );
  });

  // ========================================================
  // 02 — THE RITUAL: EDITORIAL PHOTO SEQUENCE
  // ========================================================
  const ritualFrames = document.querySelectorAll('.ritual-photo-frame');
  ritualFrames.forEach((frame, idx) => {
    gsap.fromTo(frame,
      { clipPath: 'inset(15% 0% 15% 0%)', opacity: 0.8 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 0.85,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: frame,
          start: 'top 88%',
          once: true
        }
      }
    );

    // Varied subtle parallax rates on desktop
    if (isDesktop) {
      const img = frame.querySelector('.ritual-img');
      if (img) {
        const rate = (idx % 2 === 0) ? 8 : 14;
        gsap.to(img, {
          yPercent: rate,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }
  });

  // ========================================================
  // 03 — THE FACILITY: ARCHITECTURAL PARALLAX & SPECS
  // ========================================================
  const facilityMask = document.querySelector('.facility-mask-wrap');
  const facilityImg = document.getElementById('facility-img');

  if (facilityMask && facilityImg) {
    gsap.fromTo(facilityMask,
      { clipPath: 'inset(12% 0% 12% 0%)', opacity: 0.85 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 0.9,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: facilityMask,
          start: 'top 88%',
          once: true
        }
      }
    );

    if (isDesktop) {
      gsap.to(facilityImg, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: facilityMask,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  // ========================================================
  // 04 — TRAINING PROGRAMS: EDITORIAL COMPOSITION
  // ========================================================
  const programCard = document.querySelector('.program-featured-card');
  if (programCard) {
    gsap.fromTo(programCard,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: programCard,
          start: 'top 88%',
          once: true
        }
      }
    );
  }

  const quoteBlock = document.querySelector('.quote-reveal-block');
  if (quoteBlock) {
    gsap.fromTo(quoteBlock,
      { opacity: 0, x: 18 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: quoteBlock,
          start: 'top 88%',
          once: true
        }
      }
    );
  }

  const supportingCards = document.querySelectorAll('.program-supporting-card');
  if (supportingCards.length > 0) {
    gsap.fromTo(supportingCards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: supportingCards[0],
          start: 'top 90%',
          once: true
        }
      }
    );
  }

  // ========================================================
  // 05 — MEMBERSHIP: CLEAR TIERS & RECOMMENDED ACCENT
  // ========================================================
  const membershipCards = document.querySelectorAll('.membership-card');
  if (membershipCards.length > 0) {
    gsap.fromTo(membershipCards,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.membership-cards-container',
          start: 'top 88%',
          once: true
        }
      }
    );

    // Accent flash on the recommended plan
    const protocolCard = document.querySelector('.membership-card[data-tier="protocol"]');
    if (protocolCard) {
      ScrollTrigger.create({
        trigger: protocolCard,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo(protocolCard,
            { borderColor: '#33363F' },
            { borderColor: '#CCFF00', duration: 1.0, ease: 'power2.out' }
          );
        }
      });
    }
  }

  // ========================================================
  // 06 — COACHES: GENUINE PORTRAITS REVEAL
  // ========================================================
  const coachCards = document.querySelectorAll('.coach-card');
  if (coachCards.length > 0) {
    gsap.fromTo(coachCards,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.coaches-grid',
          start: 'top 88%',
          once: true
        }
      }
    );
  }

  // ========================================================
  // 07 — THE FINAL FRAME: CINEMATIC CLIMAX
  // ========================================================
  const finalFrame = document.getElementById('final-frame');
  if (finalFrame) {
    const finalBg = finalFrame.querySelector('.final-frame-bg');
    if (finalBg && isDesktop) {
      gsap.to(finalBg, {
        scale: 1.08,
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: finalFrame,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }

    gsap.fromTo(finalFrame.querySelector('.relative.z-10'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: finalFrame,
          start: 'top 75%',
          once: true
        }
      }
    );
  }

  // ========================================================
  // 08 — INTAKE FORM & MANIFESTO
  // ========================================================
  const intakeCard = document.querySelector('.intake-form-card');
  if (intakeCard) {
    gsap.fromTo(intakeCard,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: intakeCard,
          start: 'top 88%',
          once: true
        }
      }
    );
  }

  const manifesto = document.querySelector('.manifesto-content');
  if (manifesto) {
    gsap.fromTo(manifesto.children,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: manifesto,
          start: 'top 88%',
          once: true
        }
      }
    );
  }
}

// Client Functional Interaction Setup
function initIronVault() {
  // Mobile Navigation Drawer with full accessibility & focus management
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
      // Focus first interactive element in drawer
      if (mobileMenuCloseBtn) {
        mobileMenuCloseBtn.focus();
      }
    }
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.add('hidden');
      document.body.style.overflow = '';
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.focus();
      }
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Prospectus Modal
  const prospectusModal = document.getElementById('prospectus-modal');
  const openProspectusBtns = document.querySelectorAll('[data-action="open-prospectus"]');
  const closeProspectusBtns = document.querySelectorAll('[data-action="close-prospectus"]');

  function openProspectus(e) {
    if (e) e.preventDefault();
    if (prospectusModal) {
      prospectusModal.classList.remove('hidden');
      prospectusModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeProspectus() {
    if (prospectusModal) {
      prospectusModal.classList.add('hidden');
      prospectusModal.classList.remove('flex');
      document.body.style.overflow = '';
    }
  }

  openProspectusBtns.forEach(btn => btn.addEventListener('click', openProspectus));
  closeProspectusBtns.forEach(btn => btn.addEventListener('click', closeProspectus));

  if (prospectusModal) {
    prospectusModal.addEventListener('click', (e) => {
      if (e.target === prospectusModal) closeProspectus();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProspectus();
      closeMobileMenu();
    }
  });

  // Membership Tier Selection & Routing
  const tierSelect = document.getElementById('intake-tier');
  const intakeForm = document.getElementById('intake-form');
  const intakeNameInput = document.getElementById('intake-name');

  window.selectTierAndScroll = function(tierValue) {
    if (tierSelect) {
      tierSelect.value = tierValue;
    }
    const intakeSection = document.getElementById('intake');
    if (intakeSection) {
      intakeSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (intakeNameInput) intakeNameInput.focus();
      }, 600);
    }
  };

  // Intake Form Submission
  if (intakeForm) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const confirmBox = document.getElementById('confirmation-msg');
      const submitBtn = document.getElementById('intake-submit-btn');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'PROCESSING APPLICATION...';
      }

      setTimeout(() => {
        if (confirmBox) {
          confirmBox.classList.remove('hidden');
          confirmBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'APPLICATION SUBMITTED';
          submitBtn.classList.remove('bg-primary-container', 'text-on-primary-fixed');
          submitBtn.classList.add('bg-[#23252A]', 'text-secondary');
        }
        intakeForm.reset();
      }, 500);
    });
  }

  // Active Nav Scrollspy
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('header nav a[data-path]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('data-path') === id) {
            link.classList.add('text-primary', 'border-b', 'border-primary-container', 'font-semibold');
            link.classList.remove('text-text-muted');
          } else {
            link.classList.remove('text-primary', 'border-b', 'border-primary-container', 'font-semibold');
            link.classList.add('text-text-muted');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Initialize GSAP Motion Choreography
  initIronVaultMotion();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initIronVault);
} else {
  initIronVault();
}
