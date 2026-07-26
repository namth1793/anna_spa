const db = require('./init');

const tCount = db.prepare('SELECT COUNT(*) as c FROM testimonials').get().c;

if (tCount === 0) {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      country: 'Hoa Kỳ',
      flag: '🇺🇸',
      rating: 5,
      content: 'Absolutely the best spa experience I have ever had! The Thai massage was incredible — the therapist was professional, attentive, and perfectly adjusted the pressure. The herbal foot bath at the start was a lovely touch. I will definitely come back every time I visit Da Nang!'
    },
    {
      name: 'James Kowalski',
      country: 'Úc',
      flag: '🇦🇺',
      rating: 5,
      content: 'Apollo Spa is hands down the finest spa in Da Nang. The hot stone massage melted away all my travel tension. The facility is impeccably clean, the ambiance is serene, and the staff go above and beyond to ensure you are comfortable. Highly recommend!'
    },
    {
      name: 'Yuki Tanaka',
      country: 'Nhật Bản',
      flag: '🇯🇵',
      rating: 5,
      content: 'とても素晴らしいスパでした！スタッフはとても親切で、アロマセラピーマッサージは最高でした。Da Nangに来たら必ずまた訪れたいと思います。 (Wonderful spa! Staff was very kind, the aroma therapy massage was superb. Will definitely visit again!)'
    },
    {
      name: 'Thomas Leblanc',
      country: 'Pháp',
      flag: '🇫🇷',
      rating: 5,
      content: 'Une expérience absolument magnifique! The bamboo massage was unique and deeply relaxing. The staff speaks good English, the prices are very fair, and the quality is exceptional. This is the gem of Da Nang spa scene. Merci beaucoup!'
    },
    {
      name: 'Emma Williams',
      country: 'Anh',
      flag: '🇬🇧',
      rating: 5,
      content: 'I visited Apollo Spa three times during my two-week stay in Da Nang — that tells you everything! The herbal massage using traditional Vietnamese remedies was extraordinary. The welcome drink, herbal foot bath, and farewell tea make it a complete luxury experience.'
    },
    {
      name: 'Min Ji Park',
      country: 'Hàn Quốc',
      flag: '🇰🇷',
      rating: 5,
      content: '다낭 최고의 스파입니다! 시설이 매우 깔끔하고 직원들이 정말 친절해요. 핫스톤 마사지와 페이셜 트리트먼트를 받았는데 둘 다 완벽했습니다. (Best spa in Da Nang! Very clean facilities and incredibly kind staff. Perfect hot stone and facial!)'
    },
    {
      name: 'Marco Rossi',
      country: 'Ý',
      flag: '🇮🇹',
      rating: 5,
      content: 'Spectacular! The body scrub and aroma massage combo was absolutely divine. My skin felt incredible afterward. The spa is conveniently located near My Khe Beach, making it perfect after a day at the beach. The prices are very reasonable for such high quality.'
    },
    {
      name: 'Nadia Ivanova',
      country: 'Nga',
      flag: '🇷🇺',
      rating: 5,
      content: 'Прекрасный спа-центр! Массаж бамбуком был невероятным — совершенно новые ощущения. Персонал очень профессиональный и доброжелательный. (Wonderful spa! The bamboo massage was incredible. Very professional and friendly staff.)'
    }
  ];

  const insert = db.prepare(`
    INSERT INTO testimonials (name, country, flag, rating, content)
    VALUES (@name, @country, @flag, @rating, @content)
  `);
  db.transaction(() => testimonials.forEach(t => insert.run(t)))();
  console.log(`✅ Seeded ${testimonials.length} testimonials.`);
} else {
  console.log('Testimonials already seeded.');
}

const iCount = db.prepare('SELECT COUNT(*) as c FROM site_images').get().c;

if (iCount === 0) {
  const images = [
    { section: 'hero', position: 0, url: '/img/hero.jpg' },
    { section: 'hero_mobile', position: 0, url: '/img/hero-mobile.jpg' },
    { section: 'welcome', position: 0, url: '/img/welcome.jpg' },
    { section: 'home_cta', position: 0, url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80' },
    { section: 'contact_header', position: 0, url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1920&q=80' },
    { section: 'booking_header', position: 0, url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80' },
    { section: 'reviews_header', position: 0, url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80' },
    { section: 'favicon', position: 0, url: '/favicon.jpg' },
    ...Array.from({ length: 9 }, (_, i) => ({ section: 'gallery', position: i, url: `/img/gallery/${i + 1}.jpg` })),
    ...Array.from({ length: 5 }, (_, i) => ({ section: 'feedback', position: i, url: `/img/feedback/${i + 1}.jpg` })),
  ];

  const insertImg = db.prepare('INSERT INTO site_images (section, position, url) VALUES (@section, @position, @url)');
  db.transaction(() => images.forEach(img => insertImg.run(img)))();
  console.log(`✅ Seeded ${images.length} site images.`);
} else {
  console.log('Site images already seeded.');
}
