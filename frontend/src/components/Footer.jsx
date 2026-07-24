import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconPhone, IconEnvelope, IconMapPin, IconClock, IconFacebook, IconInstagram, IconTripadvisor } from './Icons';

export default function Footer() {
  const { t } = useTranslation();
  const pl = t('priceList', { returnObjects: true });
  const mainServices = pl?.packages || [];

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <span className="font-playfair text-3xl font-bold text-white">
              <span className="text-gold">APOLLO</span> SPA
            </span>
            <p className="text-[10px] tracking-[0.4em] uppercase text-dark-400 font-inter mt-1">Da Nang</p>
          </div>
          <p className="text-dark-300 text-sm leading-relaxed mb-6">{t('footer.desc')}</p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/dragonspadanang/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
              <IconFacebook size={14} />
            </a>
            <a href="#" className="w-9 h-9 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
              <IconInstagram size={14} />
            </a>
            <a href="https://www.tripadvisor.com/Attraction_Review-g298085-d24191320-Reviews-Dragon_Spa_DaNang-Da_Nang.html" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
              <IconTripadvisor size={14} />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-playfair text-lg mb-5">{t('footer.explore')}</h4>
          <div className="w-10 h-px bg-gold mb-5" />
          <ul className="space-y-3">
            {[
              { to: '/', label: t('nav.home') },
              { to: '/bang-gia', label: t('nav.price') },
              { to: '/thu-vien-anh', label: t('nav.gallery') },
              { to: '/danh-gia', label: t('nav.reviews') },
              { to: '/dat-lich', label: t('nav.booking') },
              { to: '/lien-he', label: t('nav.contact') },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="text-dark-300 hover:text-gold text-sm transition-colors flex items-center gap-2">
                  <span className="w-3 h-px bg-gold/50" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-playfair text-lg mb-5">{t('footer.servicesTitle')}</h4>
          <div className="w-10 h-px bg-gold mb-5" />
          <ul className="space-y-3">
            {mainServices.filter(s => s?.name).map((s, i) => (
              <li key={i}>
                <Link to="/bang-gia" className="text-dark-300 hover:text-gold text-sm transition-colors flex items-center gap-2">
                  <span className="w-3 h-px bg-gold/50" />{s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-playfair text-lg mb-5">{t('footer.contactTitle')}</h4>
          <div className="w-10 h-px bg-gold mb-5" />
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-dark-300">
              <IconMapPin className="text-gold mt-0.5 shrink-0" size={14} />
              <span>{t('info.address')}</span>
            </li>
            <li>
              <a href="tel:+84363194995" className="flex gap-3 text-sm text-dark-300 hover:text-gold transition-colors">
                <IconPhone className="text-gold mt-0.5 shrink-0" size={14} />0363 194 995
              </a>
            </li>
            <li>
              <a href="mailto:apollospa.danang@gmail.com" className="flex gap-3 text-sm text-dark-300 hover:text-gold transition-colors">
                <IconEnvelope className="text-gold mt-0.5 shrink-0" size={14} />apollospa.danang@gmail.com
              </a>
            </li>
            <li className="flex gap-3 text-sm text-dark-300">
              <IconClock className="text-gold mt-0.5 shrink-0" size={14} />
              <span>{t('info.hours')}</span>
            </li>
          </ul>
          <Link to="/dat-lich" className="mt-6 btn-gold text-xs py-2.5 px-6 inline-block">
            {t('footer.bookNow')}
          </Link>
        </div>
      </div>

      <div className="border-t border-dark-800 py-5 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-dark-500">
        <span>© {new Date().getFullYear()} {t('footer.rights')}</span>
        <div className="flex items-center gap-2">
          <span className="text-gold">🎁</span>
          <span className="text-gold font-medium">Giảm 10% Happy Time · 9:00 – 14:30</span>
        </div>
        <Link to="/admin/login" className="text-white text-xs hover:text-gold transition-colors">Admin</Link>
      </div>
    </footer>
  );
}
