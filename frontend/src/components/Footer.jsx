import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTripadvisor } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="mb-5">
            <span className="font-playfair text-3xl font-bold text-white">
              <span className="text-gold">ANNA</span> SPA
            </span>
            <p className="text-[10px] tracking-[0.4em] uppercase text-dark-400 font-inter mt-1">Da Nang</p>
          </div>
          <p className="text-dark-300 text-sm leading-relaxed mb-6">{t('footer.desc')}</p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/dragonspadanang/" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
              <FaFacebook size={14} />
            </a>
            <a href="#" className="w-9 h-9 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
              <FaInstagram size={14} />
            </a>
            <a href="https://www.tripadvisor.com/Attraction_Review-g298085-d24191320-Reviews-Dragon_Spa_DaNang-Da_Nang.html" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 border border-dark-700 flex items-center justify-center text-dark-400 hover:border-gold hover:text-gold transition-colors">
              <FaTripadvisor size={14} />
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
              { to: '/dich-vu', label: t('nav.services') },
              { to: '/thu-vien-anh', label: t('nav.gallery') },
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
            {['Thai Massage','Hot Stone Massage','Bamboo Massage','Aroma Therapy','Herbal Treatment','Body Scrub','Facial Treatment','Nail Care'].map(s => (
              <li key={s}>
                <Link to="/dich-vu" className="text-dark-300 hover:text-gold text-sm transition-colors flex items-center gap-2">
                  <span className="w-3 h-px bg-gold/50" />{s}
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
              <FaMapMarkerAlt className="text-gold mt-0.5 shrink-0" />
              <span>28 An Thượng 26, Bắc Mỹ Phú, Ngũ Hành Sơn, Đà Nẵng</span>
            </li>
            <li>
              <a href="tel:+84901905991" className="flex gap-3 text-sm text-dark-300 hover:text-gold transition-colors">
                <FaPhone className="text-gold mt-0.5 shrink-0" />+84 90 190 59 91
              </a>
            </li>
            <li>
              <a href="mailto:annaspa.danang@gmail.com" className="flex gap-3 text-sm text-dark-300 hover:text-gold transition-colors">
                <FaEnvelope className="text-gold mt-0.5 shrink-0" />annaspa.danang@gmail.com
              </a>
            </li>
            <li className="flex gap-3 text-sm text-dark-300">
              <FaClock className="text-gold mt-0.5 shrink-0" />
              <span>09:00 – 23:00 | Mon – Sun</span>
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
          <span className="text-gold">★★★★★</span>
          <span>5.0/5 · Travelers' Choice 2025</span>
        </div>
      </div>
    </footer>
  );
}
