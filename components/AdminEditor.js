'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'brand', label: 'Brand' },
  { id: 'hero', label: 'Hero' },
  { id: 'stats', label: 'Stats' },
  { id: 'services', label: 'Services' },
  { id: 'why', label: 'Why Us' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'advisors', label: 'Advisors' },
  { id: 'contact', label: 'Contact' },
  { id: 'design', label: 'Design' },
];

const DISPLAY_FONTS = ['Cormorant Garamond', 'Playfair Display', 'Fraunces', 'DM Serif Display', 'Bodoni Moda'];
const BODY_FONTS = ['Manrope', 'Inter', 'DM Sans', 'Work Sans'];

export default function AdminEditor({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState('brand');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const update = (path, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        obj = isNaN(k) ? obj[k] : obj[parseInt(k)];
      }
      const last = keys[keys.length - 1];
      if (isNaN(last)) obj[last] = value;
      else obj[parseInt(last)] = value;
      return next;
    });
  };

  const updateArrayItem = (arrayKey, index, field, value) => {
    setContent((prev) => {
      const next = structuredClone(prev);
      next[arrayKey][index][field] = value;
      return next;
    });
  };

  const addArrayItem = (arrayKey, template) => {
    setContent((prev) => ({ ...prev, [arrayKey]: [...prev[arrayKey], structuredClone(template)] }));
  };

  const removeArrayItem = (arrayKey, index) => {
    if (!confirm('Remove this item?')) return;
    setContent((prev) => ({ ...prev, [arrayKey]: prev[arrayKey].filter((_, i) => i !== index) }));
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Save failed');
      }
      setMessage({ type: 'success', text: '✓ Saved. Changes are live.' });
      setTimeout(() => setMessage(null), 4000);
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <span className="nav__brand-mark">{content.brand.name_en.charAt(0)}</span>
          <div>
            <strong>{content.brand.name_en}</strong>
            <span>Admin Panel</span>
          </div>
        </div>
        <nav className="admin__nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`admin__nav-btn${activeTab === tab.id ? ' active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="admin__sidebar-bottom">
          <a href="/" target="_blank" rel="noopener" className="admin__link">↗ View site</a>
          <button onClick={logout} className="admin__link admin__link--danger">Sign out</button>
        </div>
      </aside>

      <main className="admin__main">
        <header className="admin__header">
          <h1>{TABS.find((t) => t.id === activeTab)?.label}</h1>
          <div className="admin__header-actions">
            {message && (
              <span className={`admin__message admin__message--${message.type}`}>{message.text}</span>
            )}
            <button onClick={save} disabled={saving} className="btn btn--primary">
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </header>

        <div className="admin__content">
          {activeTab === 'brand' && (
            <div className="admin__section">
              <Field label="Brand name (English)" value={content.brand.name_en} onChange={(v) => update('brand.name_en', v)} />
              <Field label="Brand name (Arabic)" value={content.brand.name_ar} onChange={(v) => update('brand.name_ar', v)} />
              <Field label="Tagline (English)" value={content.brand.tagline_en} onChange={(v) => update('brand.tagline_en', v)} multiline />
              <Field label="Tagline (Arabic)" value={content.brand.tagline_ar} onChange={(v) => update('brand.tagline_ar', v)} multiline />
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="admin__section">
              <Field label="Eyebrow (English)" value={content.hero.eyebrow_en} onChange={(v) => update('hero.eyebrow_en', v)} />
              <Field label="Eyebrow (Arabic)" value={content.hero.eyebrow_ar} onChange={(v) => update('hero.eyebrow_ar', v)} />
              <Field label="Title line 1 (English)" value={content.hero.title_line_en} onChange={(v) => update('hero.title_line_en', v)} />
              <Field label="Title line 1 (Arabic)" value={content.hero.title_line_ar} onChange={(v) => update('hero.title_line_ar', v)} />
              <Field label="Title highlight (English)" value={content.hero.title_highlight_en} onChange={(v) => update('hero.title_highlight_en', v)} />
              <Field label="Title highlight (Arabic)" value={content.hero.title_highlight_ar} onChange={(v) => update('hero.title_highlight_ar', v)} />
              <Field label="Description (English)" value={content.hero.lede_en} onChange={(v) => update('hero.lede_en', v)} multiline />
              <Field label="Description (Arabic)" value={content.hero.lede_ar} onChange={(v) => update('hero.lede_ar', v)} multiline />
              <Field label="Primary button (English)" value={content.hero.cta_primary_en} onChange={(v) => update('hero.cta_primary_en', v)} />
              <Field label="Primary button (Arabic)" value={content.hero.cta_primary_ar} onChange={(v) => update('hero.cta_primary_ar', v)} />
              <Field label="Secondary button (English)" value={content.hero.cta_secondary_en} onChange={(v) => update('hero.cta_secondary_en', v)} />
              <Field label="Secondary button (Arabic)" value={content.hero.cta_secondary_ar} onChange={(v) => update('hero.cta_secondary_ar', v)} />
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="admin__section">
              {content.stats.map((s, i) => (
                <div key={i} className="admin__item">
                  <div className="admin__item-head">
                    <strong>Stat #{i + 1}</strong>
                    {content.stats.length > 1 && <button className="admin__remove" onClick={() => removeArrayItem('stats', i)}>Remove</button>}
                  </div>
                  <Field label="Value (e.g., 13.8K+)" value={s.value} onChange={(v) => updateArrayItem('stats', i, 'value', v)} />
                  <Field label="Label (English)" value={s.label_en} onChange={(v) => updateArrayItem('stats', i, 'label_en', v)} />
                  <Field label="Label (Arabic)" value={s.label_ar} onChange={(v) => updateArrayItem('stats', i, 'label_ar', v)} />
                </div>
              ))}
              <button className="admin__add" onClick={() => addArrayItem('stats', { value: '100+', label_en: 'New stat', label_ar: 'إحصائية جديدة' })}>+ Add stat</button>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="admin__section">
              {content.services.map((s, i) => (
                <div key={i} className="admin__item">
                  <div className="admin__item-head">
                    <strong>Service #{i + 1}</strong>
                    <button className="admin__remove" onClick={() => removeArrayItem('services', i)}>Remove</button>
                  </div>
                  <Field label="Title (English)" value={s.title_en} onChange={(v) => updateArrayItem('services', i, 'title_en', v)} />
                  <Field label="Title (Arabic)" value={s.title_ar} onChange={(v) => updateArrayItem('services', i, 'title_ar', v)} />
                  <Field label="Description (English)" value={s.desc_en} onChange={(v) => updateArrayItem('services', i, 'desc_en', v)} multiline />
                  <Field label="Description (Arabic)" value={s.desc_ar} onChange={(v) => updateArrayItem('services', i, 'desc_ar', v)} multiline />
                  <label className="admin__checkbox">
                    <input type="checkbox" checked={s.featured} onChange={(e) => updateArrayItem('services', i, 'featured', e.target.checked)} />
                    <span>Mark as "Most Popular"</span>
                  </label>
                </div>
              ))}
              <button className="admin__add" onClick={() => addArrayItem('services', { title_en: 'New Service', title_ar: 'خدمة جديدة', desc_en: '', desc_ar: '', featured: false })}>+ Add service</button>
            </div>
          )}

          {activeTab === 'why' && (
            <div className="admin__section">
              {content.why.map((w, i) => (
                <div key={i} className="admin__item">
                  <div className="admin__item-head">
                    <strong>Reason #{i + 1}</strong>
                    <button className="admin__remove" onClick={() => removeArrayItem('why', i)}>Remove</button>
                  </div>
                  <Field label="Title (English)" value={w.title_en} onChange={(v) => updateArrayItem('why', i, 'title_en', v)} />
                  <Field label="Title (Arabic)" value={w.title_ar} onChange={(v) => updateArrayItem('why', i, 'title_ar', v)} />
                  <Field label="Description (English)" value={w.desc_en} onChange={(v) => updateArrayItem('why', i, 'desc_en', v)} multiline />
                  <Field label="Description (Arabic)" value={w.desc_ar} onChange={(v) => updateArrayItem('why', i, 'desc_ar', v)} multiline />
                </div>
              ))}
              <button className="admin__add" onClick={() => addArrayItem('why', { title_en: 'New reason', title_ar: 'سبب جديد', desc_en: '', desc_ar: '' })}>+ Add reason</button>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="admin__section">
              {content.process.map((p, i) => (
                <div key={i} className="admin__item">
                  <div className="admin__item-head">
                    <strong>Step #{i + 1}</strong>
                    <button className="admin__remove" onClick={() => removeArrayItem('process', i)}>Remove</button>
                  </div>
                  <Field label="Title (English)" value={p.title_en} onChange={(v) => updateArrayItem('process', i, 'title_en', v)} />
                  <Field label="Title (Arabic)" value={p.title_ar} onChange={(v) => updateArrayItem('process', i, 'title_ar', v)} />
                  <Field label="Description (English)" value={p.desc_en} onChange={(v) => updateArrayItem('process', i, 'desc_en', v)} multiline />
                  <Field label="Description (Arabic)" value={p.desc_ar} onChange={(v) => updateArrayItem('process', i, 'desc_ar', v)} multiline />
                </div>
              ))}
              <button className="admin__add" onClick={() => addArrayItem('process', { title_en: 'New step', title_ar: 'خطوة جديدة', desc_en: '', desc_ar: '' })}>+ Add step</button>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="admin__section">
              {content.testimonials.map((ts, i) => (
                <div key={i} className="admin__item">
                  <div className="admin__item-head">
                    <strong>Testimonial #{i + 1}</strong>
                    <button className="admin__remove" onClick={() => removeArrayItem('testimonials', i)}>Remove</button>
                  </div>
                  <Field label="Client name" value={ts.name} onChange={(v) => updateArrayItem('testimonials', i, 'name', v)} />
                  <Field label="Location (English)" value={ts.location_en} onChange={(v) => updateArrayItem('testimonials', i, 'location_en', v)} />
                  <Field label="Location (Arabic)" value={ts.location_ar} onChange={(v) => updateArrayItem('testimonials', i, 'location_ar', v)} />
                  <Field label="Flag emoji (e.g., 🇺🇸)" value={ts.flag} onChange={(v) => updateArrayItem('testimonials', i, 'flag', v)} />
                  <Field label="Visa type (English)" value={ts.type_en} onChange={(v) => updateArrayItem('testimonials', i, 'type_en', v)} />
                  <Field label="Visa type (Arabic)" value={ts.type_ar} onChange={(v) => updateArrayItem('testimonials', i, 'type_ar', v)} />
                  <Field label="Quote (English)" value={ts.quote_en} onChange={(v) => updateArrayItem('testimonials', i, 'quote_en', v)} multiline />
                  <Field label="Quote (Arabic)" value={ts.quote_ar} onChange={(v) => updateArrayItem('testimonials', i, 'quote_ar', v)} multiline />
                </div>
              ))}
              <button className="admin__add" onClick={() => addArrayItem('testimonials', { name: 'Client', location_en: '', location_ar: '', flag: '🇺🇸', type_en: '', type_ar: '', quote_en: '', quote_ar: '' })}>+ Add testimonial</button>
            </div>
          )}

          {activeTab === 'advisors' && (
            <div className="admin__section">
              {content.advisors.map((a, i) => (
                <div key={i} className="admin__item">
                  <div className="admin__item-head">
                    <strong>Advisor #{i + 1}</strong>
                    <button className="admin__remove" onClick={() => removeArrayItem('advisors', i)}>Remove</button>
                  </div>
                  <Field label="Name (English)" value={a.name_en} onChange={(v) => updateArrayItem('advisors', i, 'name_en', v)} />
                  <Field label="Name (Arabic)" value={a.name_ar} onChange={(v) => updateArrayItem('advisors', i, 'name_ar', v)} />
                  <Field label="Initials (2 letters)" value={a.initials} onChange={(v) => updateArrayItem('advisors', i, 'initials', v)} />
                  <Field label="Phone (digits only, with country code, no + or spaces)" value={a.phone} onChange={(v) => updateArrayItem('advisors', i, 'phone', v)} />
                  <Field label="Phone (display format, e.g. +971 55 931 2283)" value={a.phone_display} onChange={(v) => updateArrayItem('advisors', i, 'phone_display', v)} />
                </div>
              ))}
              <button className="admin__add" onClick={() => addArrayItem('advisors', { name_en: 'New Advisor', name_ar: '', initials: 'NA', phone: '', phone_display: '' })}>+ Add advisor</button>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="admin__section">
              <Field label="Email" value={content.contact.email} onChange={(v) => update('contact.email', v)} />
              <Field label="Office location (English)" value={content.contact.office_en} onChange={(v) => update('contact.office_en', v)} />
              <Field label="Office location (Arabic)" value={content.contact.office_ar} onChange={(v) => update('contact.office_ar', v)} />
              <Field label="Facebook group URL" value={content.contact.facebook_url} onChange={(v) => update('contact.facebook_url', v)} />
            </div>
          )}

          {activeTab === 'design' && (
            <div className="admin__section">
              <div className="admin__hint">Changes to colors and fonts apply instantly on save. You can always restore the originals from the starter values.</div>
              <ColorField label="Background" value={content.design.color_bg} onChange={(v) => update('design.color_bg', v)} />
              <ColorField label="Background (elevated surfaces)" value={content.design.color_bg_elevated} onChange={(v) => update('design.color_bg_elevated', v)} />
              <ColorField label="Surface (cards)" value={content.design.color_surface} onChange={(v) => update('design.color_surface', v)} />
              <ColorField label="Gold accent" value={content.design.color_gold} onChange={(v) => update('design.color_gold', v)} />
              <ColorField label="Gold bright (gradient)" value={content.design.color_gold_bright} onChange={(v) => update('design.color_gold_bright', v)} />
              <ColorField label="Text color" value={content.design.color_text} onChange={(v) => update('design.color_text', v)} />
              <SelectField label="Display font (headings)" value={content.design.font_display} onChange={(v) => update('design.font_display', v)} options={DISPLAY_FONTS} />
              <SelectField label="Body font" value={content.design.font_body} onChange={(v) => update('design.font_body', v)} options={BODY_FONTS} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({ label, value, onChange, multiline }) {
  return (
    <label className="admin__field">
      <span>{label}</span>
      {multiline ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="admin__field admin__field--color">
      <span>{label}</span>
      <div className="admin__color-row">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="admin__field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
  );
}
