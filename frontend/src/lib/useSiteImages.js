import { useEffect, useState } from 'react';
import api from './api';

export default function useSiteImages() {
  const [images, setImages] = useState({});
  useEffect(() => {
    api.get('/api/images').then(res => setImages(res.data)).catch(() => {});
  }, []);
  return images;
}

export function pickUrl(images, section, fallback) {
  return images?.[section]?.[0]?.url || fallback;
}

export function pickUrls(images, section, fallbackArray) {
  const arr = images?.[section];
  return arr && arr.length > 0 ? arr.map(i => i.url) : fallbackArray;
}
