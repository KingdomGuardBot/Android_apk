/* ========================================
   KG Smart Clicker — Landing Page Scripts
   ======================================== */

(function () {
  'use strict';

  // ---- Navbar scroll effect ----
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');
  var lastScroll = 0;

  function onScroll() {
    var scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('visible', scrollY > 600);
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Back to top ----
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll animations (IntersectionObserver) ----
  var fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // ---- Form Validation ----
  var form = document.getElementById('trialForm');
  var emailInput = document.getElementById('email');
  var emailError = document.getElementById('emailError');
  var agreeInput = document.getElementById('agree');
  var agreeError = document.getElementById('agreeError');
  var submitBtn = document.getElementById('submitBtn');
  var formSuccess = document.getElementById('formSuccess');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(errorEl, message) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }

  function clearError(errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }

  emailInput.addEventListener('blur', function () {
    if (emailInput.value && !validateEmail(emailInput.value)) {
      showError(emailError, 'Please enter a valid email address.');
    } else {
      clearError(emailError);
    }
  });

  emailInput.addEventListener('input', function () {
    if (emailError.textContent && validateEmail(emailInput.value)) {
      clearError(emailError);
    }
  });

  form.addEventListener('submit', function (e) {
    var valid = true;

    if (!emailInput.value || !validateEmail(emailInput.value)) {
      showError(emailError, 'Please enter a valid email address.');
      valid = false;
    } else {
      clearError(emailError);
    }

    if (!agreeInput.checked) {
      showError(agreeError, 'You must agree to receive your trial license by email.');
      valid = false;
    } else {
      clearError(agreeError);
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    // If using Formspree, the form will submit normally.
    // For demo / no-backend mode, prevent default and show success.
    // Remove the next block when using a real Formspree endpoint.
    e.preventDefault();
    form.style.display = 'none';
    formSuccess.removeAttribute('hidden');

    /*
      ========================================
      FORMSPREE INTEGRATION NOTE
      ========================================
      When you have a real Formspree endpoint,
      remove the e.preventDefault() and the
      success message block above.
      The form will POST to Formspree natively.
      ========================================
    */
  });

  // ---- Smooth Scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
