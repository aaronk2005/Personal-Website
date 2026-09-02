import type { IconName } from '../data/portfolio';

interface ChannelIconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export function ChannelIcon({ name, size = 28, className = '' }: ChannelIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  switch (name) {
    case 'profile':
      return (
        <svg {...common}>
          <circle cx="16" cy="11" r="5" />
          <path d="M6.5 26c.9-5.2 4.1-8 9.5-8s8.6 2.8 9.5 8" />
          <path d="M9 7.5c2-3.1 4.4-4.5 7.4-4.5 2.1 0 4 .7 5.7 2.2" opacity=".55" />
        </svg>
      );
    case 'experience':
      return (
        <svg {...common}>
          <rect x="5" y="8" width="22" height="17" rx="4" />
          <path d="M12 8V6.5A2.5 2.5 0 0 1 14.5 4h3A2.5 2.5 0 0 1 20 6.5V8M5 15h22" />
          <path d="M13 15v2h6v-2" />
        </svg>
      );
    case 'projects':
      return (
        <svg {...common}>
          <path d="M6 8.5h8l2 2h10v14H6z" />
          <path d="m11 20 3-3 2.5 2.5 4.5-5 3 3.5" />
          <circle cx="11" cy="14" r="1.3" />
        </svg>
      );
    case 'toolbox':
      return (
        <svg {...common}>
          <path d="M18.5 6.5a6 6 0 0 0-7 7L5 20l7 7 6.5-6.5a6 6 0 0 0 7-7l-4 4-4-1-1-4z" />
          <circle cx="10" cy="22" r="1.2" />
        </svg>
      );
    case 'resume':
      return (
        <svg {...common}>
          <path d="M8 4h11l5 5v19H8z" />
          <path d="M19 4v6h5M12 15h8M12 19h8M12 23h5" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path d="m16 3 2.1 7.2L25 13l-6.9 2.8L16 23l-2.1-7.2L7 13l6.9-2.8z" />
          <path d="m25.5 21 .8 2.7 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z" />
        </svg>
      );
    case 'contact':
    case 'mail':
      return (
        <svg {...common}>
          <rect x="4" y="7" width="24" height="18" rx="4" />
          <path d="m6 10 10 8 10-8" />
        </svg>
      );
    case 'github':
      return (
        <svg {...common}>
          <path d="M16 4.5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0 0 16 4.5Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...common}>
          <rect x="5" y="5" width="22" height="22" rx="4" />
          <path d="M11 14v8M11 10.5v.2M16 22v-8m0 3.5c.5-2.3 5-2.9 5 1V22" />
        </svg>
      );
    case 'home':
      return (
        <svg {...common}>
          <path d="m5 15 11-9 11 9" />
          <path d="M8 13v14h16V13M13 27v-8h6v8" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M26 16H7M14 9l-7 7 7 7" />
        </svg>
      );
    case 'external':
      return (
        <svg {...common}>
          <path d="M18 6h8v8M15 17 26 6M24 17v8H7V8h8" />
        </svg>
      );
    case 'download':
      return (
        <svg {...common}>
          <path d="M16 4v16m-6-6 6 6 6-6M6 25h20" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
          <path d="M16 9v7l4 3" />
        </svg>
      );
    case 'trophy':
      return (
        <svg {...common}>
          <path d="M10 5h12v6c0 5-2.3 8-6 8s-6-3-6-8zM16 19v5M11 27h10M8 8H5v3c0 3 2 5 6 5M24 8h3v3c0 3-2 5-6 5" />
        </svg>
      );
    case 'code':
      return (
        <svg {...common}>
          <path d="m12 9-7 7 7 7M20 9l7 7-7 7M18 5l-4 22" />
        </svg>
      );
    case 'chip':
      return (
        <svg {...common}>
          <rect x="8" y="8" width="16" height="16" rx="3" />
          <rect x="12" y="12" width="8" height="8" rx="1" />
          <path d="M12 3v5M20 3v5M12 24v5M20 24v5M3 12h5M3 20h5M24 12h5M24 20h5" />
        </svg>
      );
    case 'map':
      return (
        <svg {...common}>
          <path d="m4 8 8-3 8 3 8-3v19l-8 3-8-3-8 3zM12 5v19M20 8v19" />
          <circle cx="16" cy="14" r="2.3" />
          <path d="M16 16.3c-2.3-2.2-3.2-3.5-3.2-5a3.2 3.2 0 0 1 6.4 0c0 1.5-.9 2.8-3.2 5Z" />
        </svg>
      );
    default:
      return null;
  }
}
