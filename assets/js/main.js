/**
 * UMAR FARUK J. - PORTFOLIO INTERACTIVITY & SCRIPTING
 * High-performance, vanilla JavaScript with scroll-triggered animations and micro-interactions
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Data Store for Academic & Engineering Projects
  // --------------------------------------------------------------------------
  const caseStudies = {
    hostelflow: {
      badge: 'Academic Project',
      title: 'Hostel Room Allocation & Student Management System',
      category: 'Java · MySQL · UI/UX Dashboard · Workflow Automation',
      image: 'assets/images/project-hostelflow.jpg',
      overview:
        'Engineered an automated hostel room allocation framework that eliminated redundant manual processes and streamlined the overall workflow. Reduced manual data-entry effort and administrative errors by designing structured input flows and validation-driven interfaces. Designed and wireframed intuitive dashboard modules for administrators and students, improving data discovery and day-to-day management efficiency. The system was built to handle real-time allocation updates while keeping the interface simple for non-technical staff.',
      role: 'System Architect & UI/UX Designer',
      timeline: 'Academic Project (2025 – 2026)',
      tools: 'Java, MySQL, Figma, Responsive Web, Workflow Automation',
      problem:
        'Hostel administrative teams in high-capacity collegiate campuses relied on fragmented physical ledgers and static spreadsheets. This caused slow room allocations, manual validation errors, double bookings, lack of visibility into room maintenance status, and administrative delays during peak semester check-ins.',
      uxSolution:
        'Engineered a centralized automated allocation framework featuring validation-driven input forms, role-specific dashboard views (student vs administrator), and instantaneous vacancy calculations to eliminate administrative friction.',
      highlights: [
        'Automated allocation framework eliminating redundant manual steps and ledger tracking.',
        'Validation-driven input flows reducing manual data-entry effort and conflicting assignments.',
        'Intuitive dashboard modules for administrators and students, accelerating data discovery.',
        'Real-time allocation status engine with clean, accessible interfaces for non-technical staff.'
      ],
      impact:
        'Reduced allocation turnaround from multiple days to real-time operations, eliminating data-entry errors and streamlining institutional housing workflows.'
    },
    socialopti: {
      badge: 'Academic Project',
      title: 'Multi-Agent System for Social Media Optimization & Engagement Prediction',
      category: 'Multi-Agent AI · React.js · Data Analytics · Python · REST APIs',
      image: 'assets/images/project-socialopti.jpg',
      overview:
        'Engineered an intelligent multi-agent framework for social media content optimization and engagement prediction, analyzing captions, visuals, hashtags, and overall content quality. Developed recommendation modules to suggest content improvements, relevant hashtags, and optimal posting times based on predicted engagement. Designed an analytics dashboard to visualize engagement predictions and surface data-driven insights for content planning. The workflow combined design and data analysis to help creators make faster, more informed decisions.',
      role: 'Lead Architect & UI/UX Designer',
      timeline: 'Academic Project (2025 – 2026)',
      tools: 'React.js, Python Multi-Agent AI, REST APIs, Figma, Data Analytics',
      problem:
        'Digital creators and social media teams face disjointed planning: guessing optimal posting times, manually assessing caption effectiveness vs visual quality, and lacking predictive clarity on expected audience reach before publishing.',
      uxSolution:
        'Engineered a multi-agent AI system with specialized analytical agents evaluating text sentiment, visual elements, and timing trends, presenting actionable optimization recommendations inside a sleek analytics dashboard.',
      highlights: [
        'Multi-agent inference analyzing captions, visual aesthetics, and hashtags simultaneously.',
        'Intelligent recommendation modules generating content enhancements and optimal posting windows.',
        'Interactive analytics dashboard translating complex prediction models into actionable visual curves.',
        'Combined design and data analysis empowering creators to make faster, confident decisions.'
      ],
      impact:
        'Enabled high-confidence engagement forecasts and provided creators with clear, data-backed optimization paths in a single unified dashboard.'
    }
  };

  // --------------------------------------------------------------------------
  // 2. DOM Elements Selection
  // --------------------------------------------------------------------------
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const toastContainer = document.getElementById('toastContainer');
  const caseStudyModal = document.getElementById('caseStudyModal');
  const resumeModal = document.getElementById('resumeModal');
  const contactForm = document.getElementById('contactForm');
  const liveClockElement = document.getElementById('liveClock');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // --------------------------------------------------------------------------
  // 3. Theme Toggle & Persistence
  // --------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('umar_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
  }

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('umar_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark Mode' : 'Clean Light Mode'}`);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // 4. Live IST Clock (Krishnagiri, Tamil Nadu)
  // --------------------------------------------------------------------------
  function updateISTClock() {
    if (!liveClockElement) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    try {
      const timeString = new Intl.DateTimeFormat('en-IN', options).format(now);
      liveClockElement.textContent = `${timeString} IST`;
    } catch (e) {
      liveClockElement.textContent = now.toLocaleTimeString();
    }
  }

  setInterval(updateISTClock, 1000);
  updateISTClock();

  // --------------------------------------------------------------------------
  // 5. ScrollSpy & Sticky Navbar Styling
  // --------------------------------------------------------------------------
  function handleScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active navigation link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  // --------------------------------------------------------------------------
  // 6. Scroll-Triggered Fade-In Animations (Reveal on Scroll)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 7. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', openMobileDrawer);
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileDrawer();
      }
    });
  }

  document.querySelectorAll('.mobile-drawer-link').forEach((link) => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // --------------------------------------------------------------------------
  // 8. Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message, duration = 3000) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // --------------------------------------------------------------------------
  // 9. Functional Resume Download Feedback
  // --------------------------------------------------------------------------
  const resumeDownloadButtons = document.querySelectorAll('a[download]');
  resumeDownloadButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('Downloading Umar Faruk J. Resume (PDF)...');
    });
  });

  // --------------------------------------------------------------------------
  // 10. Clipboard Copy Handlers (Email & Phone)
  // --------------------------------------------------------------------------
  window.copyToClipboard = function (text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showToast(`Copied ${label} to clipboard: ${text}`);
        })
        .catch(() => {
          fallbackCopyText(text, label);
        });
    } else {
      fallbackCopyText(text, label);
    }
  };

  function fallbackCopyText(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label} to clipboard: ${text}`);
    } catch (err) {
      showToast(`Could not automatically copy: ${text}`);
    }
    document.body.removeChild(tempInput);
  }

  // --------------------------------------------------------------------------
  // 11. Interactive Case Study Modal
  // --------------------------------------------------------------------------
  window.openCaseStudyModal = function (studyKey) {
    const study = caseStudies[studyKey];
    if (!study || !caseStudyModal) return;

    const modalTitle = document.getElementById('modalCaseTitle');
    const modalImage = document.getElementById('modalCaseImage');
    const modalBadge = document.getElementById('modalCaseBadge');
    const modalRole = document.getElementById('modalCaseRole');
    const modalTimeline = document.getElementById('modalCaseTimeline');
    const modalTools = document.getElementById('modalCaseTools');
    const modalOverview = document.getElementById('modalCaseOverview');
    const modalProblem = document.getElementById('modalCaseProblem');
    const modalSolution = document.getElementById('modalCaseSolution');
    const modalHighlights = document.getElementById('modalCaseHighlights');
    const modalImpact = document.getElementById('modalCaseImpact');

    if (modalTitle) modalTitle.textContent = study.title;
    if (modalImage) {
      modalImage.src = study.image;
      modalImage.alt = study.title;
    }
    if (modalBadge) modalBadge.textContent = study.badge;
    if (modalRole) modalRole.textContent = study.role;
    if (modalTimeline) modalTimeline.textContent = study.timeline;
    if (modalTools) modalTools.textContent = study.tools;
    if (modalOverview) modalOverview.textContent = study.overview;
    if (modalProblem) modalProblem.textContent = study.problem;
    if (modalSolution) modalSolution.textContent = study.uxSolution;

    if (modalHighlights) {
      modalHighlights.innerHTML = study.highlights
        .map(
          (h) =>
            `<li class="project-highlight-item"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg><span>${h}</span></li>`
        )
        .join('');
    }

    if (modalImpact) modalImpact.textContent = study.impact;

    caseStudyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeCaseStudyModal = function () {
    if (caseStudyModal) {
      caseStudyModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (caseStudyModal) {
    caseStudyModal.addEventListener('click', (e) => {
      if (e.target === caseStudyModal) {
        window.closeCaseStudyModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. Resume Modal & Print / Download Handler
  // --------------------------------------------------------------------------
  window.openResumeModal = function () {
    if (resumeModal) {
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeResumeModal = function () {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        window.closeResumeModal();
      }
    });
  }

  window.printResume = function () {
    window.print();
  };

  // Keyboard accessibility (ESC to close open modal)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeCaseStudyModal();
      window.closeResumeModal();
      closeMobileDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 13. Bento & Project Card Spotlight Mouse Follower Effect
  // --------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll(
    '.bento-card, .project-card, .education-card, .skill-category-card, .summary-card'
  );

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --------------------------------------------------------------------------
  // 14. Contact Form Submission (Validation & UX feedback)
  // --------------------------------------------------------------------------
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');
      const submitBtn = document.getElementById('contactSubmitBtn');

      let isValid = true;

      [nameInput, emailInput, messageInput].forEach((input) => {
        if (!input || !input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        } else {
          input.classList.remove('error');
        }
      });

      if (!isValid) {
        showToast('Please fill out all required fields.');
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        <span>Transmitting Message...</span>
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showToast('Thank you! Your message has been received. Umar will connect with you shortly.');
      }, 1200);
    });
  }

  // --------------------------------------------------------------------------
  // 15. Back to Top Button
  // --------------------------------------------------------------------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // Initialize
  // --------------------------------------------------------------------------
  initTheme();
})();
