import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconMenu, IconClose, IconPhone } from './Icons';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/dich-vu', label: t('nav.services') },
    { to: '/thu-vien-anh', label: t('nav.gallery') },
    { to: '/dat-lich', label: t('nav.booking') },
    { to: '/lien-he', label: t('nav.contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const navBg = scrolled || !isHome
    ? 'bg-dark-950/98 backdrop-blur-sm shadow-lg shadow-black/50'
    : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      {/* Top bar */}
      <div className="hidden md:flex justify-between items-center px-8 py-2 border-b border-gold/20 text-xs text-dark-300">
        <span>{t('nav.openHours')}</span>
        <a href="tel:+84901905991" className="flex items-center gap-2 text-gold hover:text-gold-300 transition-colors font-medium">
          <IconPhone size={10} />
          +84 90 190 59 91
        </a>
      </div>

      {/* Main nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link to="/" className="flex flex-col leading-none select-none">
          <span className="font-playfair text-2xl font-bold text-white tracking-wide">
            <span className="text-gold">ANNA</span> SPA
          </span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-dark-300 font-inter">Da Nang</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-xs tracking-[0.2em] uppercase font-inter font-medium transition-colors duration-200
                   ${isActive ? 'text-gold' : 'text-dark-200 hover:text-gold'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Link to="/dat-lich" className="hidden md:block btn-gold text-xs py-2.5 px-6">
            {t('nav.bookNow')}
          </Link>
          <button className="md:hidden text-white p-2" onClick={() => setOpen(v => !v)}>
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-dark-950/98 backdrop-blur-sm border-t border-dark-800 px-6 py-6">
          <ul className="flex flex-col gap-5 mb-5">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `block text-sm tracking-widest uppercase font-medium transition-colors
                     ${isActive ? 'text-gold' : 'text-dark-200 hover:text-gold'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a href="tel:+84901905991" className="flex items-center gap-2 text-gold text-sm">
                <IconPhone size={14} /> +84 90 190 59 91
              </a>
            </li>
          </ul>
          <LanguageSwitcher mobile />
        </div>
      )}
    </header>
  );
}
