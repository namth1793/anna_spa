import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import { IconCheck, IconPhone } from '../components/Icons';

const SERVICES = [
  'Thai Massage', 'Hot Stone Massage', 'Bamboo Massage', 'Aroma Therapy',
  'Herbal Massage', 'Body Scrub', 'Body Wrap', 'Classic Facial',
  'Anti-Aging Facial', 'Foot Massage', 'Head & Shoulder Massage', 'Back Massage',
  'Manicure', 'Pedicure', 'Anna Relaxation Package', 'Anna Royal Package', 'Couples Spa Package',
];

const DURATIONS = ['30', '45', '60', '75', '90', '105', '120', '165'];

const TIMES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30',
];

const today = new Date().toISOString().split('T')[0];

export default function Booking() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '',
    duration: '60', date: '', time: '', notes: '',
  });
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      setMsg(t('booking.errRequired'));
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const payload = { ...form, duration: `${form.duration} ${t('servicesPage.min')}` };
      const res = await api.post('/api/bookings', payload);
      setMsg(res.data.message);
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', duration: '60', date: '', time: '', notes: '' });
    } catch {
      setMsg(t('booking.errGeneral'));
      setStatus('error');
    }
  };

  const notes = t('booking.notes', { returnObjects: true });

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="relative z-10 text-center px-6">
          <p className="section-subtitle mb-3">{t('booking.label')}</p>
          <h1 className="section-title mb-3">{t('booking.title')}</h1>
          <div className="gold-divider" />
          <p className="text-dark-300 mt-4 max-w-xl mx-auto text-sm">{t('booking.subtitle')}</p>
        </div>
      </section>

      <section className="py-20 bg-dark-950">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12">
          {/* Info sidebar */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="font-playfair text-2xl text-white mb-4">{t('booking.contactInfo')}</h3>
              <div className="w-10 h-px bg-gold mb-6" />
              <ul className="space-y-4 text-sm text-dark-300">
                <li className="flex gap-3">
                  <span className="text-gold mt-0.5">📍</span>
                  <span>28 An Thượng 26, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">📞</span>
                  <a href="tel:+84901905991" className="hover:text-gold transition-colors">+84 90 190 59 91</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">✉️</span>
                  <a href="mailto:annaspa.danang@gmail.com" className="hover:text-gold transition-colors">annaspa.danang@gmail.com</a>
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">🕘</span>
                  <span>{t('booking.hours')}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-playfair text-xl text-white mb-4">{t('booking.notesTitle')}</h3>
              <div className="w-10 h-px bg-gold mb-5" />
              <ul className="space-y-3">
                {Array.isArray(notes) && notes.map((note, i) => (
                  <li key={i} className="flex gap-2 text-sm text-dark-400">
                    <IconCheck className="text-gold shrink-0 mt-0.5" size={11} />
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gold/30 bg-gold/5 p-5">
              <p className="text-dark-300 text-sm text-center">
                {t('booking.needAdvice')}<br />
                <a href="tel:+84901905991" className="text-gold font-semibold text-base hover:text-gold-300 transition-colors flex items-center justify-center gap-2 mt-2">
                  <IconPhone size={12} /> +84 90 190 59 91
                </a>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {status === 'success' ? (
              <div className="text-center py-16 border border-gold/30 bg-gold/5">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconCheck className="text-dark-950 text-2xl" />
                </div>
                <h3 className="font-playfair text-2xl text-white mb-3">{t('booking.successTitle')}</h3>
                <p className="text-dark-300 text-sm max-w-sm mx-auto mb-8">{msg}</p>
                <button onClick={() => setStatus('idle')} className="btn-gold">{t('booking.bookAnother')}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.name')} *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.phone')} *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+84 xxx xxx xxx"
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.email')} {t('booking.emailOpt')}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-dark-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.service')} *</label>
                    <select
                      value={form.service}
                      onChange={e => set('service', e.target.value)}
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">{t('booking.selectService')}</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.duration')} *</label>
                    <select
                      value={form.duration}
                      onChange={e => set('duration', e.target.value)}
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                    >
                      {DURATIONS.map(d => <option key={d} value={d}>{d} {t('servicesPage.min')}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.date')} *</label>
                    <input
                      type="date"
                      value={form.date}
                      min={today}
                      onChange={e => set('date', e.target.value)}
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.time')} *</label>
                    <select
                      value={form.time}
                      onChange={e => set('time', e.target.value)}
                      className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">{t('booking.selectTime')}</option>
                      {TIMES.map(time => <option key={time} value={time}>{time}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-widest uppercase text-dark-400 mb-2">{t('booking.notes_field')}</label>
                  <textarea
                    value={form.notes}
                    onChange={e => set('notes', e.target.value)}
                    rows={4}
                    placeholder={t('booking.notes_ph')}
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
                  {status === 'loading' ? t('booking.submitting') : t('booking.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
