'use client';
import { useEffect, useState } from 'react';

export default function SiteView({ content }) {
  const [lang, setLang] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const isAr = lang === 'ar';
  const t = (en, ar) => (isAr ? ar : en);

  // Apply design tokens via CSS variables
  useEffect(() => {
    const d = content.design;
    const root = document.documentElement;
    root.style.setProperty('--color-bg', d.color_bg);
    root.style.setProperty('--color-bg-elevated', d.color_bg_elevated);
    root.style.setProperty('--color-surface', d.color_surface);
    root.style.setProperty('--color-gold', d.color_gold);
    root.style.setProperty('--color-gold-bright', d.color_gold_bright);
    root.style.setProperty('--color-text', d.color_text);
    root.style.setProperty('--font-display', `"${d.font_display}", "Amiri", Georgia, serif`);
    root.style.setProperty('--font-body', `"${d.font_body}", "Amiri", -apple-system, sans-serif`);
  }, [content.design]);

  // Load saved language
  useEffect(() => {
    try {
      const saved = localStorage.getItem('elite-path-lang');
      if (saved === 'ar') setLang('ar');
    } catch (e) {}
  }, []);

  // Update html lang/dir
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.title = isAr
      ? 'إيليت باث — خدمات التأشيرات والدراسة والهجرة'
      : 'Elite-Path — Premium Visa, Study & Immigration Services';
    try { localStorage.setItem('elite-path-lang', lang); } catch (e) {}
  }, [lang, isAr]);

  // Nav scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  // Close WA popup on outside click
  useEffect(() => {
    if (!waOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.wa-widget')) setWaOpen(false);
    };
    setTimeout(() => document.addEventListener('click', handler), 10);
    return () => document.removeEventListener('click', handler);
  }, [waOpen]);

  // Smooth anchor scroll
  const handleAnchor = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
    setMenuOpen(false);
  };

  // Contact form submit → WhatsApp
  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const body = isAr
      ? `مرحبًا، أرغب في الاستفسار عن خدماتكم.\n\nالاسم: ${data.get('name')}\nالهاتف: ${data.get('phone')}\nالبريد: ${data.get('email')}\nالخدمة: ${data.get('service')}\n\n${data.get('message')}`
      : `Hello, I'd like to inquire about your services.\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
    const waUrl = `https://wa.me/${content.advisors[0].phone}?text=${encodeURIComponent(body)}`;
    window.open(waUrl, '_blank');
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = isAr ? '✓ تم الإرسال' : '✓ Sent!';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      form.reset();
    }, 2500);
  };

  const brandInitial = content.brand.name_en.charAt(0);

  return (
    <>
      {/* ===== NAV ===== */}
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="container nav__inner">
          <a href="#home" className="nav__brand" onClick={(e) => handleAnchor(e, '#home')}>
            <span className="nav__brand-mark">{brandInitial}</span>
            <span className="nav__brand-text">
              <span className="nav__brand-en">{content.brand.name_en}</span>
              <span className="nav__brand-ar">{content.brand.name_ar}</span>
            </span>
          </a>
          <nav className={`nav__links${menuOpen ? ' open' : ''}`}>
            <a href="#services" onClick={(e) => handleAnchor(e, '#services')}>{t('Services', 'خدماتنا')}</a>
            <a href="#why" onClick={(e) => handleAnchor(e, '#why')}>{t('Why Us', 'لماذا نحن')}</a>
            <a href="#process" onClick={(e) => handleAnchor(e, '#process')}>{t('Process', 'خطوات العمل')}</a>
            <a href="#success" onClick={(e) => handleAnchor(e, '#success')}>{t('Success', 'قصص النجاح')}</a>
            <a href="#contact" onClick={(e) => handleAnchor(e, '#contact')}>{t('Contact', 'تواصل')}</a>
          </nav>
          <div className="nav__actions">
            <button className="lang-toggle" onClick={() => setLang(isAr ? 'en' : 'ar')} aria-label="Switch language">
              <span className="lang-toggle__current">{isAr ? 'AR' : 'EN'}</span>
              <span className="lang-toggle__divider">/</span>
              <span className="lang-toggle__other">{isAr ? 'EN' : 'ع'}</span>
            </button>
            <a href="#contact" className="btn btn--primary btn--sm" onClick={(e) => handleAnchor(e, '#contact')}>
              {t('Apply Now', 'قدّم الآن')}
            </a>
            <button className="nav__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero__bg-grid" aria-hidden="true"></div>
        <div className="hero__bg-glow" aria-hidden="true"></div>
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot"></span>
              <span>{t(content.hero.eyebrow_en, content.hero.eyebrow_ar)}</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-line">{t(content.hero.title_line_en, content.hero.title_line_ar)}</span>
              <span className="hero__title-highlight">{t(content.hero.title_highlight_en, content.hero.title_highlight_ar)}</span>
            </h1>
            <p className="hero__lede">{t(content.hero.lede_en, content.hero.lede_ar)}</p>
            <div className="hero__cta">
              <a href="#contact" className="btn btn--primary btn--lg" onClick={(e) => handleAnchor(e, '#contact')}>
                {t(content.hero.cta_primary_en, content.hero.cta_primary_ar)}
              </a>
              <a href="#services" className="btn btn--ghost btn--lg" onClick={(e) => handleAnchor(e, '#services')}>
                {t(content.hero.cta_secondary_en, content.hero.cta_secondary_ar)}
              </a>
            </div>
            <div className="hero__meta">
              {content.stats.map((s, i) => (
                <>
                  <div key={i} className="hero__meta-item">
                    <strong>{s.value}</strong>
                    <span>{t(s.label_en, s.label_ar)}</span>
                  </div>
                  {i < content.stats.length - 1 && <div key={`d${i}`} className="hero__meta-divider"></div>}
                </>
              ))}
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="passport">
              <div className="passport__cover">
                <div className="passport__seal">✦</div>
                <div className="passport__emboss">{content.brand.name_en.toUpperCase()}</div>
                <div className="passport__subemboss">{content.brand.name_ar}</div>
                <div className="passport__line"></div>
                <div className="passport__subemboss" style={{ fontSize: 11, letterSpacing: 3 }}>
                  {t('APPROVED · مقبول', 'مقبول · APPROVED')}
                </div>
              </div>
              <div className="passport__stamp passport__stamp--1"><span>USA</span><small>B1/B2 ✓</small></div>
              <div className="passport__stamp passport__stamp--2"><span>CANADA</span><small>VISITOR ✓</small></div>
              <div className="passport__stamp passport__stamp--3"><span>UK</span><small>✓</small></div>
            </div>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>{t('Scroll', 'مرر')}</span>
          <div className="hero__scroll-line"></div>
        </div>
      </section>

      {/* ===== TRUST MARQUEE ===== */}
      <section className="trust">
        <div className="container">
          <div className="trust__marquee">
            <div className="trust__track">
              {['USA B1/B2', 'CANADA VISITOR', 'STUDY ABROAD', 'UK TOURISM', 'SCHENGEN', 'IMMIGRATION', 'USA B1/B2', 'CANADA VISITOR', 'STUDY ABROAD', 'UK TOURISM', 'SCHENGEN', 'IMMIGRATION'].map((x, i) => (
                <span key={i}>✦ {x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-head__eyebrow">{t('Our Services', 'خدماتنا')}</span>
            <h2 className="section-head__title">{t('Everything you need, handled with care.', 'كل ما تحتاجه، بعناية واحترافية.')}</h2>
          </div>
          <div className="services__grid">
            {content.services.map((s, i) => (
              <article key={i} className={`service-card reveal${s.featured ? ' service-card--featured' : ''}`}>
                <div className="service-card__number">{String(i + 1).padStart(2, '0')}</div>
                <div className="service-card__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3>{t(s.title_en, s.title_ar)}</h3>
                <p>{t(s.desc_en, s.desc_ar)}</p>
                {s.featured && <div className="service-card__tag">★ {t('Most Popular', 'الأكثر طلبًا')}</div>}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY ===== */}
      <section className="why" id="why">
        <div className="container">
          <div className="why__grid">
            <div className="why__left reveal">
              <span className="section-head__eyebrow">{t('Why ' + content.brand.name_en, 'لماذا ' + content.brand.name_ar)}</span>
              <h2 className="section-head__title">{t(`We're not the only ones. We're ${content.brand.name_en}.`, `لسنا الوحيدين. نحن ${content.brand.name_ar}.`)}</h2>
              <p className="why__lede">{t(
                'Every approved visa in our community is a story of a family reunited, a dream university reached, or a business opportunity captured. We take that responsibility seriously.',
                'كل تأشيرة معتمدة في مجتمعنا هي قصة عائلة اجتمعت، أو جامعة الأحلام وصل إليها صاحبها، أو فرصة عمل تم اقتناصها. نحن نأخذ هذه المسؤولية على محمل الجد.'
              )}</p>
              <a href="#contact" className="btn btn--primary" onClick={(e) => handleAnchor(e, '#contact')}>
                {t('Book a Consultation', 'احجز استشارة')}
              </a>
            </div>
            <div className="why__right">
              {content.why.map((w, i) => (
                <div key={i} className="why__feature reveal">
                  <div className="why__feature-num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h4>{t(w.title_en, w.title_ar)}</h4>
                    <p>{t(w.desc_en, w.desc_ar)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="process" id="process">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="section-head__eyebrow">{t('How It Works', 'كيف نعمل')}</span>
            <h2 className="section-head__title">{t('Four steps to approval.', 'أربع خطوات للموافقة.')}</h2>
          </div>
          <div className="process__steps">
            {content.process.map((p, i) => (
              <div key={i} className="process__step reveal">
                <div className="process__step-num">{String(i + 1).padStart(2, '0')}</div>
                <h4>{t(p.title_en, p.title_ar)}</h4>
                <p>{t(p.desc_en, p.desc_ar)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUCCESS ===== */}
      <section className="success" id="success">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-head__eyebrow">{t('Success Stories', 'قصص النجاح')}</span>
            <h2 className="section-head__title">{t('Approvals. Every single week.', 'موافقات. كل أسبوع.')}</h2>
          </div>
          <div className="success__grid">
            {content.testimonials.map((ts, i) => (
              <article key={i} className="testimonial reveal">
                <div className="testimonial__badge">✓ {t('Approved', 'معتمد')}</div>
                <div className="testimonial__flag">{ts.flag} {t(ts.type_en, ts.type_ar)}</div>
                <blockquote>&ldquo;{t(ts.quote_en, ts.quote_ar)}&rdquo;</blockquote>
                <div className="testimonial__author">
                  <div className="testimonial__avatar">{ts.name.charAt(0)}</div>
                  <div>
                    <strong>{ts.name}</strong>
                    <span>{t(ts.location_en, ts.location_ar)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner__inner">
            <h2>{t("Ready to travel? Let's make it official.", 'مستعد للسفر؟ لنجعلها رسمية.')}</h2>
            <p>{t('Book a free consultation. No commitment, no pressure — just clarity on your path forward.', 'احجز استشارة مجانية. بدون التزام أو ضغط — مجرد وضوح حول مسارك القادم.')}</p>
            <a href="#contact" className="btn btn--primary btn--lg" onClick={(e) => handleAnchor(e, '#contact')}>
              {t('Start Free Consultation', 'ابدأ الاستشارة المجانية')}
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact__grid">
            <div className="contact__info">
              <span className="section-head__eyebrow">{t('Get In Touch', 'تواصل معنا')}</span>
              <h2 className="section-head__title">{t("Let's talk about your journey.", 'لنتحدث عن رحلتك.')}</h2>
              <p className="contact__lede">{t('Fill out the form, or reach us on any of the channels below. We respond within one business day.', 'املأ النموذج، أو تواصل معنا عبر أي من القنوات أدناه. نرد خلال يوم عمل واحد.')}</p>

              <div className="contact__team">
                <div className="contact__team-heading">{t('Speak with our advisors', 'تحدث مع مستشارينا')}</div>
                <div className="contact__team-grid">
                  {content.advisors.map((a, i) => (
                    <a key={i} href={`https://wa.me/${a.phone}`} className="advisor-card" target="_blank" rel="noopener noreferrer">
                      <div className="advisor-card__avatar">{a.initials}</div>
                      <div className="advisor-card__body">
                        <strong>{t(a.name_en, a.name_ar)}</strong>
                        <span className="advisor-card__phone" dir="ltr">{a.phone_display}</span>
                      </div>
                      <div className="advisor-card__wa" aria-label="WhatsApp">
                        <WhatsAppIcon />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact__channels">
                <a href={content.contact.facebook_url} className="contact__channel" target="_blank" rel="noopener noreferrer">
                  <div className="contact__channel-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z" /></svg>
                  </div>
                  <div>
                    <strong>Facebook Group</strong>
                    <span>{t('13.8K members', '13.8 ألف عضو')}</span>
                  </div>
                </a>

                <a href={`mailto:${content.contact.email}`} className="contact__channel">
                  <div className="contact__channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>{content.contact.email}</span>
                  </div>
                </a>

                <div className="contact__channel">
                  <div className="contact__channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div>
                    <strong>{t('Office', 'مكتبنا')}</strong>
                    <span>{t(content.contact.office_en, content.contact.office_ar)}</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact__form" onSubmit={submitForm}>
              <div className="form-row">
                <label>
                  <span>{t('Full name', 'الاسم الكامل')}</span>
                  <input type="text" name="name" required placeholder="..." />
                </label>
                <label>
                  <span>{t('Phone', 'الهاتف')}</span>
                  <input type="tel" name="phone" required placeholder="..." />
                </label>
              </div>
              <label>
                <span>{t('Email', 'البريد الإلكتروني')}</span>
                <input type="email" name="email" required placeholder="..." />
              </label>
              <label>
                <span>{t('Service needed', 'الخدمة المطلوبة')}</span>
                <select name="service" required defaultValue="">
                  <option value="" disabled>{t('Select a service...', 'اختر خدمة...')}</option>
                  {content.services.map((s, i) => (
                    <option key={i}>{t(s.title_en, s.title_ar)}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('Tell us about your goal', 'أخبرنا عن هدفك')}</span>
                <textarea name="message" rows={4} placeholder="..." />
              </label>
              <button type="submit" className="btn btn--primary btn--lg btn--full">
                {t('Send Message', 'إرسال الرسالة')}
              </button>
              <p className="contact__form-note">{t('We respond within 24 hours. Your data is private.', 'نرد خلال 24 ساعة. بياناتك خاصة.')}</p>
            </form>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="nav__brand-mark">{brandInitial}</span>
                <div>
                  <strong>{content.brand.name_en}</strong>
                  <span>{content.brand.name_ar} {t('for visa & immigration', 'للفيزا والهجرة')}</span>
                </div>
              </div>
              <p>{t(content.brand.tagline_en, content.brand.tagline_ar)}</p>
            </div>
            <div className="footer__col">
              <h5>{t('Services', 'الخدمات')}</h5>
              {content.services.slice(0, 4).map((s, i) => (
                <a key={i} href="#services" onClick={(e) => handleAnchor(e, '#services')}>{t(s.title_en, s.title_ar)}</a>
              ))}
            </div>
            <div className="footer__col">
              <h5>{t('Company', 'الشركة')}</h5>
              <a href="#why" onClick={(e) => handleAnchor(e, '#why')}>{t('Why ' + content.brand.name_en, 'لماذا ' + content.brand.name_ar)}</a>
              <a href="#process" onClick={(e) => handleAnchor(e, '#process')}>{t('Our Process', 'طريقة عملنا')}</a>
              <a href="#success" onClick={(e) => handleAnchor(e, '#success')}>{t('Success Stories', 'قصص النجاح')}</a>
              <a href="#contact" onClick={(e) => handleAnchor(e, '#contact')}>{t('Contact', 'تواصل')}</a>
            </div>
            <div className="footer__col">
              <h5>{t('Connect', 'تواصل')}</h5>
              <a href={content.contact.facebook_url} target="_blank" rel="noopener noreferrer">Facebook Group</a>
              <a href={`https://wa.me/${content.advisors[0].phone}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
            </div>
          </div>
          <div className="footer__bottom">
            <span>© 2026 {content.brand.name_en}. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}</span>
            <span>{t(`Built with care in ${content.contact.office_en.split(',')[0]}.`, `صُنع بعناية في ${content.contact.office_ar.split('،')[0]}.`)}</span>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP ===== */}
      <div className="wa-widget">
        <div className={`wa-popup${waOpen ? ' open' : ''}`} aria-hidden={!waOpen}>
          <div className="wa-popup__head">
            <div className="wa-popup__avatar">{brandInitial}</div>
            <div>
              <strong>{content.brand.name_en} {t('Team', 'فريق')}</strong>
              <span>{t('Typically replies within minutes', 'نرد عادة خلال دقائق')}</span>
            </div>
            <button className="wa-popup__close" onClick={() => setWaOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="wa-popup__intro">
            {t('👋 Hi! Choose an advisor to chat with on WhatsApp:', '👋 مرحبًا! اختر مستشارًا للتواصل عبر واتساب:')}
          </div>
          <div className="wa-popup__list">
            {content.advisors.map((a, i) => (
              <a
                key={i}
                href={`https://wa.me/${a.phone}?text=${encodeURIComponent(isAr ? `مرحبًا ${content.brand.name_ar}، أرغب في الاستفسار عن خدماتكم.` : `Hello ${content.brand.name_en}, I'd like to inquire about your services.`)}`}
                className="wa-popup__advisor"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setTimeout(() => setWaOpen(false), 200)}
              >
                <div className="wa-popup__ava">{a.initials}</div>
                <div>
                  <strong>{t(a.name_en, a.name_ar)}</strong>
                  <span dir="ltr">{a.phone_display}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <button className="whatsapp-float" onClick={(e) => { e.stopPropagation(); setWaOpen(!waOpen); }} aria-label="WhatsApp">
          <WhatsAppIcon />
        </button>
      </div>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  );
}
