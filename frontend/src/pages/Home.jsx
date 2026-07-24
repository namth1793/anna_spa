import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../lib/api';
import {
  IconStar, IconQuote,
  IconPhone, IconMapPin, IconClock, IconChevronLeft, IconChevronRight, IconAward
} from '../components/Icons';

const HERO_IMG = '/img/hero.jpg';

const GALLERY = [
  '/img/gallery/1.jpg',
  '/img/gallery/2.jpg',
  '/img/gallery/3.jpg',
  '/img/gallery/4.jpg',
  '/img/gallery/5.jpg',
  '/img/gallery/6.jpg',
  '/img/gallery/7.jpg',
  '/img/gallery/8.jpg',
  '/img/gallery/9.jpg',
];

export default function Home() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [tSlide, setTSlide] = useState(0);

  const pl = t('priceList', { returnObjects: true });
  const packages = pl?.packages || [];
  const vnd = pl?.vndUnit || 'VNĐ';
  const minUnit = pl?.minUnit || 'phút';
  const from = t('services.from');

  const SERVICES = packages.map(pkg => ({
    icon: <span className="text-3xl">{pkg.icon}</span>,
    title: pkg.name,
    desc: (pkg.desc || []).join(' '),
    price: `${from} ${pkg.price} ${vnd}`,
    duration: `${pkg.duration} ${minUnit}`,
  }));

  const STATS = [
    { num: '5.000+', label: t('stats.customers') },
    { num: '5.0', label: t('stats.rating') },
    { num: '10+', label: t('stats.years') },
    { num: '50+', label: t('stats.treatments') },
  ];

  const WHY = [
    { icon: '👨‍⚕️', title: t('why.expert_title'), desc: t('why.expert_desc') },
    { icon: '✨', title: t('why.space_title'), desc: t('why.space_desc') },
  ];

  const FLOW = [
    { step: '01', title: t('flow.s1_title'), desc: t('flow.s1_desc') },
    { step: '02', title: t('flow.s2_title'), desc: t('flow.s2_desc') },
    { step: '03', title: t('flow.s3_title'), desc: t('flow.s3_desc') },
    { step: '04', title: t('flow.s4_title'), desc: t('flow.s4_desc') },
  ];

  useEffect(() => {
    api.get('/api/testimonials').then(r => setTestimonials(r.data)).catch(() => {});
  }, []);

  const nextT = () => setTSlide(s => (s + 1) % testimonials.length);
  const prevT = () => setTSlide(s => (s - 1 + testimonials.length) % testimonials.length);

  const testimony = testimonials[tSlide];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="section-subtitle text-gold mb-4 text-shadow">{t('hero.brand')}</p>
          <h1 className="font-playfair text-5xl md:text-7xl text-white font-bold leading-tight mb-4 text-shadow">
            {t('hero.s1_title')}
          </h1>
          <p className="text-dark-200 text-base md:text-xl mb-10 max-w-xl text-shadow font-light">
            {t('hero.s1_sub')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dat-lich" className="btn-gold">{t('hero.ctaBook')}</Link>
            <Link to="/bang-gia" className="btn-outline-gold">{t('hero.ctaExplore')}</Link>
          </div>
        </div>
      </section>

      {/* ── WELCOME ── */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="/img/welcome.jpg"
              alt="Apollo Spa interior"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold p-6 text-center hidden md:block">
              <span className="font-playfair text-4xl font-bold text-dark-950 block">10+</span>
              <span className="text-dark-800 text-xs tracking-widest uppercase font-inter">{t('welcome.years')}</span>
            </div>
          </div>
          <div>
            <p className="section-subtitle mb-3">{t('welcome.label')}</p>
            <h2 className="section-title mb-2">{t('welcome.title')}</h2>
            <div className="gold-divider mx-0 mb-6" />
            <p className="text-dark-300 leading-relaxed mb-4">{t('welcome.p1')}</p>
            <p className="text-dark-300 leading-relaxed mb-2">{t('welcome.p2')}</p>
            <ul className="mb-4 space-y-1 pl-1">
              {t('welcome.services', { returnObjects: true }).map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                  <span className="text-gold mt-0.5 select-none">•</span>{s}
                </li>
              ))}
            </ul>
            <p className="text-dark-300 leading-relaxed mb-2">{t('welcome.highlights_title')}</p>
            <ul className="mb-4 space-y-1 pl-1">
              {t('welcome.highlights', { returnObjects: true }).map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                  <span className="text-gold mt-0.5 select-none">•</span>{h}
                </li>
              ))}
            </ul>
            <p className="text-dark-300 leading-relaxed mb-8">{t('welcome.p3')}</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-gold gap-0.5">
                {[...Array(5)].map((_, i) => <IconStar key={i} size={16} />)}
              </div>
              <span className="text-dark-300 text-sm">{t('welcome.rating')}</span>
            </div>
            <Link to="/bang-gia" className="btn-gold">{t('welcome.viewServices')}</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">{t('services.label')}</p>
            <h2 className="section-title mb-2">{t('services.title')}</h2>
            <div className="gold-divider" />
            <p className="text-dark-400 max-w-xl mx-auto mt-4 text-sm leading-relaxed">{t('services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="card-dark p-8 group cursor-pointer">
                <div className="mb-5">{s.icon}</div>
                <h3 className="font-playfair text-xl text-white mb-3 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between border-t border-dark-700 pt-4 mt-auto">
                  <span className="text-gold font-semibold text-sm">{s.price}</span>
                  <span className="text-dark-500 text-xs">{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/bang-gia" className="btn-outline-gold">{t('services.viewAll')}</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-gold">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={i}>
              <span className="font-playfair text-4xl md:text-5xl font-bold text-dark-950 block">{s.num}</span>
              <span className="text-dark-800 text-xs tracking-widest uppercase font-inter mt-1 block">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">{t('why.label')}</p>
            <h2 className="section-title mb-2">{t('why.title')}</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {WHY.map((w, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-5">{w.icon}</div>
                <h3 className="font-playfair text-lg text-white mb-3">{w.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE FLOW ── */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">{t('flow.label')}</p>
            <h2 className="section-title mb-2">{t('flow.title')}</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {FLOW.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-8 border border-dark-800 group hover:border-gold/30 transition-colors">
                <span className="font-playfair text-7xl font-bold text-dark-800 absolute top-4 left-4 leading-none group-hover:text-gold/10 transition-colors">{step.step}</span>
                <div className="relative z-10 mt-8">
                  <h3 className="font-playfair text-xl text-white mb-3">{step.title}</h3>
                  <p className="text-dark-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">{t('gallery.label')}</p>
            <h2 className="section-title mb-2">{t('gallery.title')}</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((img, i) => (
              <div key={i} className={`overflow-hidden ${i === 0 ? 'md:col-span-2 row-span-2' : ''}`}>
                <img
                  src={img}
                  alt={`Apollo Spa gallery ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  style={{ height: i === 0 ? '420px' : '200px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-dark-950">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <p className="section-subtitle mb-3">{t('testimonials.label')}</p>
            <h2 className="section-title mb-2">{t('testimonials.title')}</h2>
            <div className="gold-divider" />
          </div>

          {testimony && (
            <div className="relative">
              <IconQuote className="text-gold/20 text-8xl absolute -top-4 -left-4" />
              <div className="bg-dark-800 border border-dark-700 p-10 md:p-14 text-center relative">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimony.rating)].map((_, i) => <IconStar key={i} className="text-gold" size={18} />)}
                </div>
                <p className="text-dark-200 text-base md:text-lg leading-relaxed italic mb-8 font-light">
                  "{testimony.content}"
                </p>
                <div>
                  <span className="text-2xl mr-2">{testimony.flag}</span>
                  <span className="font-playfair text-white font-semibold">{testimony.name}</span>
                  <span className="text-dark-400 text-sm ml-2">— {testimony.country}</span>
                </div>
              </div>
            </div>
          )}

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-8">
              <button onClick={prevT} className="w-10 h-10 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
                <IconChevronLeft size={12} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTSlide(i)}
                    className={`h-0.5 transition-all duration-300 ${i === tSlide ? 'w-8 bg-gold' : 'w-4 bg-dark-700'}`}
                  />
                ))}
              </div>
              <button onClick={nextT} className="w-10 h-10 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
                <IconChevronRight size={12} />
              </button>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <IconAward className="text-gold" />
              <span>{t('testimonials.award')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/80" />
        <div className="relative z-10 text-center px-6">
          <p className="section-subtitle mb-4">{t('cta.label')}</p>
          <h2 className="font-playfair text-4xl md:text-6xl text-white font-bold mb-4">{t('cta.title')}</h2>
          <div className="gold-divider mb-6" />
          <p className="text-dark-300 max-w-xl mx-auto mb-10 leading-relaxed">{t('cta.desc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dat-lich" className="btn-gold">{t('cta.bookOnline')}</Link>
            <a href="tel:+84363194995" className="btn-outline-gold flex items-center justify-center gap-2">
              <IconPhone size={12} /> {t('cta.callNow')}
            </a>
          </div>
        </div>
      </section>

      {/* ── MAP & INFO ── */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="flex items-start gap-4">
            <IconMapPin className="text-gold text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-1">{t('info.address_label')}</h4>
              <p className="text-dark-400 text-sm">{t('info.address')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IconClock className="text-gold text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-1">{t('info.hours_label')}</h4>
              <p className="text-dark-400 text-sm">{t('info.hours')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <IconPhone className="text-gold text-2xl mt-1 shrink-0" />
            <div>
              <h4 className="text-white font-semibold mb-1">{t('info.contact_label')}</h4>
              <a href="tel:+84363194995" className="text-dark-400 text-sm hover:text-gold transition-colors block">0363 194 995</a>
              <a href="mailto:apollospa.danang@gmail.com" className="text-dark-400 text-sm hover:text-gold transition-colors block">apollospa.danang@gmail.com</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
