import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=75', cat: 'space', caption: 'Phòng trị liệu đá nóng sang trọng' },
  { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=75', cat: 'space', caption: 'Không gian thư giãn với nến thơm' },
  { src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=75', cat: 'service', caption: 'Thai massage chuyên nghiệp' },
  { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&q=75', cat: 'service', caption: 'Massage thảo dược truyền thống' },
  { src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=75', cat: 'service', caption: 'Chăm sóc sắc đẹp toàn diện' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=75', cat: 'space', caption: 'Phòng chờ và lễ tân' },
  { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=75', cat: 'service', caption: 'Facial treatment cao cấp' },
  { src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=400&q=75', cat: 'space', caption: 'Reception area trang nhã' },
  { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=75', cat: 'service', caption: 'Aroma therapy với tinh dầu tự nhiên' },
  { src: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?w=400&q=75', cat: 'service', caption: 'Foot massage thư giãn' },
  { src: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400&q=75', cat: 'space', caption: 'Pool & relaxation area' },
  { src: 'https://images.unsplash.com/photo-1591343395902-1adcb454c4e2?w=800&q=80', thumb: 'https://images.unsplash.com/photo-1591343395902-1adcb454c4e2?w=400&q=75', cat: 'nail', caption: 'Nail art chuyên nghiệp' },
];

export default function Gallery() {
  const { t } = useTranslation();
  const [cat, setCat] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const CATS = [
    { key: 'all', label: t('galleryPage.all') },
    { key: 'space', label: t('galleryPage.space') },
    { key: 'service', label: t('galleryPage.service') },
    { key: 'nail', label: t('galleryPage.nail') },
  ];

  const filtered = cat === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === cat);

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="relative z-10 text-center px-6">
          <p className="section-subtitle mb-3">{t('galleryPage.label')}</p>
          <h1 className="section-title mb-3">{t('galleryPage.title')}</h1>
          <div className="gold-divider" />
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATS.map(c => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`px-6 py-2 text-xs tracking-widest uppercase font-inter transition-all duration-200
                  ${cat === c.key ? 'bg-gold text-dark-950 font-semibold' : 'border border-dark-700 text-dark-400 hover:border-gold hover:text-gold'}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((photo, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-pointer group relative"
                onClick={() => setLightbox(photo)}
              >
                <img
                  src={photo.thumb}
                  alt={photo.caption}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                  <p className="text-white text-xs px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
            onClick={() => setLightbox(null)}
          >
            <FaTimes size={24} />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.caption}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-dark-300 text-sm font-inter">{lightbox.caption}</p>
        </div>
      )}
    </>
  );
}
