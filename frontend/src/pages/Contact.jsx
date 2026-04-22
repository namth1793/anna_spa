import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { IconPhone, IconEnvelope, IconMapPin, IconClock, IconFacebook, IconTripadvisor, IconCheck } from '../components/Icons';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMsg(t('contact.errRequired'));
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await api.post('/api/contact', form);
      setMsg(res.data.message);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setMsg(t('contact.errGeneral'));
      setStatus('error');
    }
  };

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="relative z-10 text-center px-6">
          <p className="section-subtitle mb-3">{t('contact.label')}</p>
          <h1 className="section-title mb-3">{t('contact.title')}</h1>
          <div className="gold-divider" />
        </div>
      </section>

      <section className="py-20 bg-dark-950">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-playfair text-3xl text-white mb-3">Anna Spa Da Nang</h2>
            <div className="w-12 h-px bg-gold mb-6" />
            <p className="text-dark-400 text-sm leading-relaxed mb-10">{t('contact.desc')}</p>

            <ul className="space-y-6 mb-10">
              <li className="flex gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                  <IconMapPin className="text-gold" size={14} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{t('contact.address_label')}</p>
                  <p className="text-dark-400 text-sm">28 An Thượng 26, Bắc Mỹ Phú,<br />Ngũ Hành Sơn, Đà Nẵng, Việt Nam</p>
                  <a
                    href="https://maps.google.com/?q=28+An+Thuong+26+Da+Nang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-xs hover:underline mt-1 block"
                  >
                    {t('contact.viewMap')}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                  <IconPhone className="text-gold" size={14} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{t('contact.phone_label')}</p>
                  <a href="tel:+84901905991" className="text-dark-400 text-sm hover:text-gold transition-colors">+84 90 190 59 91</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                  <IconEnvelope className="text-gold" size={14} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{t('contact.email_label')}</p>
                  <a href="mailto:annaspa.danang@gmail.com" className="text-dark-400 text-sm hover:text-gold transition-colors">annaspa.danang@gmail.com</a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 border border-gold/40 flex items-center justify-center shrink-0">
                  <IconClock className="text-gold" size={14} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{t('contact.hours_label')}</p>
                  <p className="text-dark-400 text-sm">{t('contact.hours')}</p>
                </div>
              </li>
            </ul>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/dragonspadanang/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-dark-700 px-4 py-2 text-sm text-dark-400 hover:border-gold hover:text-gold transition-colors"
              >
                <IconFacebook /> Facebook
              </a>
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g298085-d24191320-Reviews-Dragon_Spa_DaNang-Da_Nang.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-dark-700 px-4 py-2 text-sm text-dark-400 hover:border-gold hover:text-gold transition-colors"
              >
                <IconTripadvisor /> TripAdvisor
              </a>
            </div>

            {/* Map embed */}
            <div className="mt-10 aspect-video border border-dark-700 overflow-hidden">
              <iframe
                title="Anna Spa Da Nang Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=108.2381,16.0352,108.2481,16.0420&layer=mapnik&marker=16.0386,108.2431"
                className="w-full h-full"
                style={{ filter: 'invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-playfair text-3xl text-white mb-3">{t('contact.sendMessage')}</h2>
            <div className="w-12 h-px bg-gold mb-8" />

            {status === 'success' ? (
              <div className="text-center py-16 border border-gold/30 bg-gold/5">
                <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mx-auto mb-5">
                  <IconCheck className="text-dark-950 text-xl" />
                </div>
                <h3 className="font-playfair text-xl text-white mb-2">{t('contact.successTitle')}</h3>
                <p className="text-dark-300 text-sm">{msg}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 btn-outline-gold">{t('contact.sendAnother')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('contact.name')} *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('contact.email')} *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="email@example.com"
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+84 xxx xxx xxx"
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('contact.subject')}</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => set('subject', e.target.value)}
                      placeholder={t('contact.subject_ph')}
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('contact.message')} *</label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={6}
                    placeholder={t('contact.message_ph')}
                    className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600 resize-none"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 p-3">{msg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold w-full py-4 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {status === 'loading' ? t('contact.submitting') : t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
