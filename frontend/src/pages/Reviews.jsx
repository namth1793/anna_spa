import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconClose } from '../components/Icons';
import useSiteImages, { pickUrl, pickUrls } from '../lib/useSiteImages';

const FEEDBACK_IMAGES = [
  '/img/feedback/1.jpg',
  '/img/feedback/2.jpg',
  '/img/feedback/3.jpg',
  '/img/feedback/4.jpg',
  '/img/feedback/5.jpg',
];

export default function Reviews() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState(null);
  const siteImages = useSiteImages();
  const headerUrl = pickUrl(siteImages, 'reviews_header', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80');
  const feedbackUrls = pickUrls(siteImages, 'feedback', FEEDBACK_IMAGES);

  return (
    <>
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <img
          src={headerUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-950/85" />
        <div className="relative z-10 text-center px-6">
          <p className="section-subtitle mb-3">{t('reviewsPage.label')}</p>
          <h1 className="section-title mb-3">{t('reviewsPage.title')}</h1>
          <div className="gold-divider" />
          <p className="text-dark-300 mt-4 max-w-xl mx-auto text-sm">{t('reviewsPage.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackUrls.map((src, i) => (
            <div
              key={i}
              className="border border-dark-700 hover:border-gold/40 transition-colors cursor-pointer overflow-hidden"
              onClick={() => setLightbox(src)}
            >
              <img src={src} alt={`Đánh giá khách hàng ${i + 1}`} className="w-full h-auto" />
            </div>
          ))}
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
            <IconClose size={24} />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[85vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
