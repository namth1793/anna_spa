import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCheck } from 'react-icons/fa';

export default function Services() {
  const { t } = useTranslation();

  const MENU = [
    {
      category: t('servicesPage.cat_massage'), emoji: '💆',
      items: [
        { name: t('servicesPage.thai_name'), desc: t('servicesPage.thai_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '420.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '600.000đ' }, { label: `120 ${t('servicesPage.min')}`, price: '780.000đ' }] },
        { name: t('servicesPage.stone_name'), desc: t('servicesPage.stone_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '500.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '700.000đ' }, { label: `120 ${t('servicesPage.min')}`, price: '900.000đ' }] },
        { name: t('servicesPage.bamboo_name'), desc: t('servicesPage.bamboo_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '450.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '650.000đ' }, { label: `120 ${t('servicesPage.min')}`, price: '820.000đ' }] },
        { name: t('servicesPage.aroma_name'), desc: t('servicesPage.aroma_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '480.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '680.000đ' }, { label: `120 ${t('servicesPage.min')}`, price: '860.000đ' }] },
        { name: t('servicesPage.herbal_name'), desc: t('servicesPage.herbal_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '460.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '660.000đ' }, { label: `120 ${t('servicesPage.min')}`, price: '840.000đ' }] },
      ],
    },
    {
      category: t('servicesPage.cat_body'), emoji: '✨',
      items: [
        { name: t('servicesPage.scrub_name'), desc: t('servicesPage.scrub_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '500.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '700.000đ' }] },
        { name: t('servicesPage.wrap_name'), desc: t('servicesPage.wrap_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '520.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '730.000đ' }] },
      ],
    },
    {
      category: t('servicesPage.cat_facial'), emoji: '🌸',
      items: [
        { name: t('servicesPage.facial_name'), desc: t('servicesPage.facial_desc'), prices: [{ label: `60 ${t('servicesPage.min')}`, price: '550.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '750.000đ' }] },
        { name: t('servicesPage.anti_name'), desc: t('servicesPage.anti_desc'), prices: [{ label: `75 ${t('servicesPage.min')}`, price: '750.000đ' }, { label: `105 ${t('servicesPage.min')}`, price: '950.000đ' }] },
      ],
    },
    {
      category: t('servicesPage.cat_local'), emoji: '🙌',
      items: [
        { name: t('servicesPage.foot_name'), desc: t('servicesPage.foot_desc'), prices: [{ label: `45 ${t('servicesPage.min')}`, price: '280.000đ' }, { label: `60 ${t('servicesPage.min')}`, price: '350.000đ' }, { label: `90 ${t('servicesPage.min')}`, price: '500.000đ' }] },
        { name: t('servicesPage.head_name'), desc: t('servicesPage.head_desc'), prices: [{ label: `30 ${t('servicesPage.min')}`, price: '220.000đ' }, { label: `45 ${t('servicesPage.min')}`, price: '320.000đ' }, { label: `60 ${t('servicesPage.min')}`, price: '400.000đ' }] },
        { name: t('servicesPage.back_name'), desc: t('servicesPage.back_desc'), prices: [{ label: `30 ${t('servicesPage.min')}`, price: '200.000đ' }, { label: `45 ${t('servicesPage.min')}`, price: '300.000đ' }, { label: `60 ${t('servicesPage.min')}`, price: '380.000đ' }] },
      ],
    },
    {
      category: t('servicesPage.cat_nail'), emoji: '💅',
      items: [
        { name: t('servicesPage.mani_name'), desc: t('servicesPage.mani_desc'), prices: [{ label: 'Classic', price: '180.000đ' }, { label: 'Gel', price: '280.000đ' }, { label: 'Acrylic', price: '350.000đ' }] },
        { name: t('servicesPage.pedi_name'), desc: t('servicesPage.pedi_desc'), prices: [{ label: 'Classic', price: '220.000đ' }, { label: 'Gel', price: '320.000đ' }, { label: 'Acrylic', price: '400.000đ' }] },
        { name: t('servicesPage.nailart_name'), desc: t('servicesPage.nailart_desc'), prices: [{ label: 'Basic', price: '50.000đ/nail' }, { label: 'Advanced', price: '100.000đ/nail' }] },
      ],
    },
    {
      category: t('servicesPage.cat_combo'), emoji: '🎁',
      items: [
        { name: 'Anna Relaxation Package', desc: t('servicesPage.relax_desc'), prices: [{ label: `90 ${t('servicesPage.min')}`, price: '650.000đ' }] },
        { name: 'Anna Royal Package', desc: t('servicesPage.royal_desc'), prices: [{ label: `165 ${t('servicesPage.min')}`, price: '1.500.000đ' }] },
        { name: 'Couples Spa Package', desc: t('servicesPage.couple_desc'), prices: [{ label: `90 ${t('servicesPage.min')}`, price: '1.600.000đ / 2' }] },
      ],
    },
  ];

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="relative z-10 text-center px-6">
          <p className="section-subtitle mb-3">{t('servicesPage.label')}</p>
          <h1 className="section-title mb-3">{t('servicesPage.title')}</h1>
          <div className="gold-divider" />
          <p className="text-dark-300 mt-4 max-w-xl mx-auto text-sm">{t('servicesPage.subtitle')}</p>
        </div>
      </section>

      {/* Included in all services */}
      <section className="py-10 bg-dark-800 border-y border-dark-700">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t('servicesPage.includes', { returnObjects: true }).map((item, i) => (
            <div key={i} className="text-dark-300 text-sm font-inter">{item}</div>
          ))}
        </div>
      </section>

      {/* Services Menu */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
          {MENU.map((cat, ci) => (
            <div key={ci}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl">{cat.emoji}</span>
                <div>
                  <h2 className="font-playfair text-2xl md:text-3xl text-white">{cat.category}</h2>
                  <div className="w-12 h-px bg-gold mt-2" />
                </div>
              </div>
              <div className="space-y-4">
                {cat.items.map((item, ii) => (
                  <div key={ii} className="card-dark p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-playfair text-xl text-white mb-2">{item.name}</h3>
                        <p className="text-dark-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="md:text-right shrink-0">
                        {item.prices.map((p, pi) => (
                          <div key={pi} className="flex md:justify-end items-center gap-3 mb-1">
                            <span className="text-dark-500 text-xs">{p.label}</span>
                            <span className="text-gold font-semibold text-sm min-w-[100px] md:text-right">{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 mt-12">
          <div className="border border-gold/30 bg-gold/5 p-6 text-center">
            <p className="text-dark-300 text-sm leading-relaxed">
              <span className="text-gold font-semibold">{t('servicesPage.note')}</span> <span className="text-gold">{t('servicesPage.discount')}</span>.{' '}
              {t('servicesPage.loyalty')} <a href="tel:+84901905991" className="text-gold hover:underline">+84 90 190 59 91</a>.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/dat-lich" className="btn-gold">{t('servicesPage.bookNow')}</Link>
        </div>
      </section>
    </>
  );
}
