// ===== ELITE-PATH site JS =====
(function() {
  'use strict';

  // ---------- Language toggle (EN / AR) ----------
  const langToggle = document.getElementById('langToggle');
  const html = document.documentElement;

  function setLanguage(lang) {
    const isAr = lang === 'ar';
    html.setAttribute('lang', lang);
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Swap all elements with data-en / data-ar
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (text) el.textContent = text;
    });

    // Update toggle label
    const cur = langToggle.querySelector('.lang-toggle__current');
    const other = langToggle.querySelector('.lang-toggle__other');
    cur.textContent = isAr ? 'AR' : 'EN';
    other.textContent = isAr ? 'EN' : 'ع';

    // Persist
    try { localStorage.setItem('elite-path-lang', lang); } catch (e) {}

    // Update document title direction hint
    document.title = isAr
      ? 'إيليت باث — خدمات التأشيرات والدراسة والهجرة'
      : 'Elite-Path — Premium Visa, Study & Immigration Services';
  }

  langToggle.addEventListener('click', () => {
    const current = html.getAttribute('lang');
    setLanguage(current === 'ar' ? 'en' : 'ar');
  });

  // Load saved language
  try {
    const saved = localStorage.getItem('elite-path-lang');
    if (saved === 'ar') setLanguage('ar');
  } catch (e) {}

  // ---------- Nav scroll effect ----------
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    if (open) {
      navLinks.style.cssText = `
        display:flex; flex-direction:column; position:absolute;
        top:100%; left:0; right:0; padding:24px;
        background:rgba(10,22,40,0.98); border-bottom:1px solid rgba(206,167,97,0.15);
        gap:20px; backdrop-filter:blur(20px);
      `;
    } else {
      navLinks.style.cssText = '';
    }
  });

  // Close mobile menu when a link is tapped
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navLinks.style.cssText = '';
      }
    });
  });

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll(
    '.service-card, .why__feature, .process__step, .testimonial, .section-head'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 80);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => io.observe(el));

  // ---------- Smooth anchor offset for fixed nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ---------- Contact form (opens WhatsApp / mailto) ----------
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const lang = document.documentElement.getAttribute('lang') || 'en';

  const name = data.get('name') || '';
  const phone = data.get('phone') || '';
  const email = data.get('email') || '';
  const service = data.get('service') || '';
  const message = data.get('message') || '';

  const body = lang === 'ar'
    ? `مرحبًا، أرغب في الاستفسار عن خدماتكم.\n\nالاسم: ${name}\nالهاتف: ${phone}\nالبريد: ${email}\nالخدمة: ${service}\n\n${message}`
    : `Hello, I'd like to inquire about your services.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\n${message}`;

  // Open WhatsApp with pre-filled message
  const waUrl = `https://wa.me/971559312283?text=${encodeURIComponent(body)}`;
  window.open(waUrl, '_blank');

  // Show confirmation
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = lang === 'ar' ? '✓ تم الإرسال' : '✓ Sent!';
  btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    form.reset();
  }, 2500);
}
