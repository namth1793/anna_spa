import { IconZalo, IconFacebookBadge, IconTiktokBadge } from './Icons';

function FloatingSocialButton({ href, label, bottomClass, ringColor, Icon }) {
  return (
    <div className={`fixed ${bottomClass} right-6 z-40 w-14 h-14`}>
      <span className={`absolute inset-0 rounded-full opacity-60 animate-ping ${ringColor}`} />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="relative block w-14 h-14 rounded-full shadow-lg shadow-black/40 hover:scale-110 transition-transform duration-200 animate-bounce-gentle"
      >
        <Icon size={56} />
      </a>
    </div>
  );
}

export default function ZaloButton() {
  return (
    <>
      <FloatingSocialButton
        href="https://tiktok.com/@apollospa.thugiannam"
        label="Liên hệ qua TikTok"
        bottomClass="bottom-[15rem]"
        ringColor="bg-black"
        Icon={IconTiktokBadge}
      />
      <FloatingSocialButton
        href="https://www.facebook.com/share/1BbrmxVGKJ/?mibextid=wwXIfr"
        label="Liên hệ qua Facebook"
        bottomClass="bottom-[10.5rem]"
        ringColor="bg-[#1877F2]"
        Icon={IconFacebookBadge}
      />
      <FloatingSocialButton
        href="https://zalo.me/84397807877"
        label="Liên hệ qua Zalo"
        bottomClass="bottom-24"
        ringColor="bg-[#0068FF]"
        Icon={IconZalo}
      />
    </>
  );
}
