const svg = (path, size, className, viewBox = '0 0 24 24') => (
  <svg
    width={size || '1em'} height={size || '1em'}
    viewBox={viewBox} fill="currentColor"
    className={className} aria-hidden="true"
  >
    {path}
  </svg>
);

export const IconPhone = ({ size, className }) => svg(
  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.47 11.47 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />,
  size, className
);

export const IconEnvelope = ({ size, className }) => svg(
  <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V9l8 5 8-5v9z" />,
  size, className
);

export const IconMapPin = ({ size, className }) => svg(
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z" />,
  size, className
);

export const IconClock = ({ size, className }) => svg(
  <><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z" /><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></>,
  size, className
);

export const IconCheck = ({ size, className }) => svg(
  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />,
  size, className
);

export const IconStar = ({ size, className }) => svg(
  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />,
  size, className
);

export const IconQuote = ({ size, className }) => svg(
  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />,
  size, className
);

export const IconMenu = ({ size, className }) => svg(
  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />,
  size, className
);

export const IconClose = ({ size, className }) => svg(
  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />,
  size, className
);

export const IconChevronLeft = ({ size, className }) => svg(
  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />,
  size, className
);

export const IconChevronRight = ({ size, className }) => svg(
  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />,
  size, className
);

export const IconAward = ({ size, className }) => svg(
  <><path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 8a3 3 0 110-6 3 3 0 010 6z" /><path d="M8.21 11.86L7 22l5-3 5 3-1.21-10.14A6.96 6.96 0 0112 13a6.96 6.96 0 01-3.79-1.14z" /></>,
  size, className
);

export const IconLeaf = ({ size, className }) => svg(
  <path d="M17 8C8 10 5.9 16.17 3.82 21h2.86c.61-1.51 1.37-2.96 2.32-4.2C11 19.23 13.5 20 16 20c4.42 0 8-3.58 8-8 0-3.5-2.24-6.49-5.37-7.61A9.95 9.95 0 0117 8z" />,
  size, className
);

export const IconFlame = ({ size, className }) => svg(
  <path d="M13.5 .67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM12 20c-2.21 0-4-1.79-4-4 0-1.48.81-2.75 2-3.45v1.95c0 1.1.9 2 2 2s2-.9 2-2v-2.5c1.19.7 2 1.97 2 3.5 0 2.21-1.79 4-4 4z" />,
  size, className
);

export const IconSpa = ({ size, className }) => svg(
  <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zm0 0c0-4.97-4.03-9-9-9 0 4.97 4.03 9 9 9zm0-18c0 4.97 4.03 9 9 9-4.97 0-9-4.03-9-9zm0 0c0 4.97-4.03 9-9 9 4.97 0 9-4.03 9-9z" />,
  size, className
);

export const IconHands = ({ size, className }) => svg(
  <path d="M21 7c0-1.1-.9-2-2-2h-4V3c0-1.1-.9-2-2-2s-2 .9-2 2v7.29l-1.93-1.12c-.38-.22-.8-.33-1.22-.33-.87 0-1.69.47-2.13 1.21L5.43 11l4.48 4.48C10.43 16 11.21 16.5 12 16.5h6c1.1 0 2-.9 2-2v-1.5c.58-.34 1-.97 1-1.7V7zm-8 9.5h-1l-4-4 .19-.33c.14-.24.4-.38.67-.38.13 0 .26.04.38.11L11 13.3V3c0-.28.22-.5.5-.5s.5.22.5.5v8h7v.3c0 .27-.22.5-.5.5H17v2h-4zM19 13h-1v-2h1.5v1.5c0 .27-.22.5-.5.5z" />,
  size, className
);

export const IconFacebook = ({ size, className }) => svg(
  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />,
  size, className
);

export const IconInstagram = ({ size, className }) => svg(
  <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>,
  size, className, '0 0 24 24'
);

export const IconTripadvisor = ({ size, className }) => svg(
  <><circle cx="6.5" cy="13.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="13.5" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7c-3 0-5.5.9-7.5 2.5h15C17.5 7.9 15 7 12 7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="6.5" cy="13.5" r="1.2"/><circle cx="17.5" cy="13.5" r="1.2"/></>,
  size, className, '0 0 24 24'
);
