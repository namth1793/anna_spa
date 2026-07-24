import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function PriceList() {
  const { t } = useTranslation();
  const pl = t('priceList', { returnObjects: true });

  if (!pl || typeof pl === 'string') return null;

  const packages = pl.packages || [];
  const benefits = pl.benefits || [];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-dark-950 min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-12">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{pl.label}</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">{pl.title}</h1>
        <div className="w-16 h-px bg-gold mx-auto" />
      </div>

      {/* Packages */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {packages.map((pkg, i) => (
          <div key={i} className="bg-dark-900 border border-dark-700 hover:border-gold/40 transition-colors p-6 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{pkg.icon}</span>
              <h3 className="font-playfair text-xl text-white">{pkg.name}</h3>
            </div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-dark-700">
              <span className="text-dark-400 text-sm">{pkg.duration} {pl.minUnit}</span>
              <span className="text-gold font-semibold text-lg tabular-nums">
                {pkg.price} <span className="text-dark-400 text-xs font-normal">{pl.vndUnit}</span>
              </span>
            </div>
            <ul className="space-y-2 mb-5 flex-1">
              {(pkg.desc || []).map((line, di) => (
                <li key={di} className="flex items-start gap-2 text-dark-300 text-sm leading-relaxed">
                  <span className="text-gold mt-1 shrink-0">✦</span>
                  {line}
                </li>
              ))}
            </ul>
            <Link
              to={`/dat-lich?service=${encodeURIComponent(pkg.name)}&date=${today}`}
              className="btn-gold w-full text-center text-xs py-2.5 block"
            >
              {t('nav.bookNow')}
            </Link>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-14">
        <h2 className="font-playfair text-2xl text-gold text-center mb-8">{pl.benefitsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="border border-dark-700 bg-dark-900 p-6 text-center">
              <span className="text-3xl block mb-3">{b.icon}</span>
              <h3 className="text-white font-medium mb-3">{b.title}</h3>
              <div className="space-y-1">
                {(b.items || []).map((item, ii) => (
                  <p key={ii} className="text-dark-400 text-sm">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center pt-4 space-y-4">
        <Link to="/dat-lich" className="btn-gold py-3.5 px-10 text-sm inline-block">
          {t('nav.bookNow')}
        </Link>
        <p className="text-dark-500 text-xs">
          <a href="tel:+84363194995" className="hover:text-gold transition-colors">
            0363 194 995
          </a>
        </p>
      </div>
    </div>
  );
}
