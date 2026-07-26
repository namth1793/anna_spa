import { IconZalo } from './Icons';

export default function ZaloButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 w-14 h-14">
      <span className="absolute inset-0 rounded-full bg-[#0068FF] opacity-60 animate-ping" />
      <a
        href="https://zalo.me/84397807877"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Liên hệ qua Zalo"
        className="relative block w-14 h-14 rounded-full shadow-lg shadow-black/40 hover:scale-110 transition-transform duration-200 animate-bounce-gentle"
      >
        <IconZalo size={56} />
      </a>
    </div>
  );
}
