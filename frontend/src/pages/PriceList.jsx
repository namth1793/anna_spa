import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function PriceList() {
  const { t } = useTranslation();
  const pl = t('priceList', { returnObjects: true });

  if (!pl || typeof pl === 'string') return null;

  const sections = pl.sections || [];
  const combo = pl.combo || {};

  return (
    <div className="bg-dark-950 min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center mb-12">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3">{pl.label}</p>
        <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">{pl.title}</h1>
        <div className="w-16 h-px bg-gold mx-auto" />
      </div>

      {/* Info bar */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-10">
        <div className="bg-dark-900 border border-dark-700 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <span className="text-gold mt-0.5">📍</span>
            <span className="text-dark-300">{pl.address}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-gold mt-0.5">🕐</span>
            <span className="text-dark-300">{pl.hours}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-gold mt-0.5">🎁</span>
            <span className="text-gold font-medium">{pl.bonus}</span>
          </div>
        </div>
      </div>

      {/* Service sections */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-10">
        {sections.map((section, si) => (
          <div key={si}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{section.icon}</span>
              <h2 className="font-playfair text-2xl text-white">{section.title}</h2>
              <div className="flex-1 h-px bg-dark-700 ml-2" />
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(section.services || []).map((svc, vi) => (
                <div key={vi} className="bg-dark-900 border border-dark-700 hover:border-gold/40 transition-colors p-5">
                  <h3 className="text-white font-medium mb-3 text-sm leading-snug">{svc.name}</h3>
                  <div className="space-y-1.5">
                    {(svc.options || []).map((opt, oi) => (
                      <div key={oi} className="flex items-center justify-between">
                        <span className="text-dark-400 text-xs">
                          {opt.dur} {pl.minUnit}
                        </span>
                        <span className="text-gold font-medium text-sm tabular-nums">
                          {opt.price} <span className="text-dark-400 text-xs font-normal">{pl.vndUnit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Combo Signature - special section */}
        <div className="border border-gold/40 bg-gradient-to-br from-dark-900 to-dark-950 p-7">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🌿</span>
            <h2 className="font-playfair text-2xl text-gold">{pl.comboTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Includes */}
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider mb-3">{pl.comboIncludesLabel}</p>
              <ul className="space-y-2">
                {(pl.comboIncludes || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-dark-200 text-sm">
                    <span className="text-gold mt-1 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Combo pricing */}
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider mb-3">
                {pl.minUnit === 'phút' ? 'Giá:' : pl.minUnit === 'mins' ? 'Price:' : pl.minUnit === '분' ? '가격:' : pl.minUnit === '分钟' ? '价格:' : '料金:'}
              </p>
              <div className="space-y-2">
                {(combo.options || []).map((opt, i) => (
                  <div key={i} className="flex items-center justify-between bg-dark-800/50 px-4 py-3 border border-dark-700">
                    <span className="text-white font-medium">
                      {opt.dur} {pl.minUnit}
                    </span>
                    <span className="text-gold font-semibold text-lg tabular-nums">
                      {opt.price} <span className="text-dark-400 text-xs font-normal">{pl.vndUnit}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4 space-y-4">
          <Link to="/dat-lich" className="btn-gold py-3.5 px-10 text-sm inline-block">
            {t('nav.bookNow')}
          </Link>
          <p className="text-dark-500 text-xs">
            <a href="tel:+84901905991" className="hover:text-gold transition-colors">
              +84 90 190 59 91
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
