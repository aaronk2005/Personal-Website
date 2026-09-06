import type { Channel } from '../data/portfolio';
import { ChannelIcon } from './ChannelIcon';

/** Channel identities share a bezel, but each has its own broadcast composition. */
export function ChannelArtwork({ channel }: { channel: Channel }) {
  const title = <span className="broadcast-title">{channel.title}</span>;
  let content;

  switch (channel.icon) {
    case 'profile':
      content = <><img className="broadcast-portrait" src="/images/linkedin-headshot.jpg" alt="" /><div className="broadcast-copy"><span className="broadcast-eyebrow">Aaron Kleiman</span>{title}<span className="broadcast-detail">Computer Engineering</span></div></>;
      break;
    case 'experience':
      content = <><img className="broadcast-disc" src="/images/wii/reference-disc.png" alt="" /><div className="broadcast-copy">{title}<span className="broadcast-detail">AMD - Tallysight - QSET</span></div></>;
      break;
    case 'projects':
      content = <>{title}<div className="broadcast-prints"><img src="/images/projects/odysseywalk.png" alt="" /><img src="/images/projects/spin2dine.png" alt="" /></div></>;
      break;
    case 'toolbox':
      content = <>{title}<div className="broadcast-shop-art"><img src="/images/wii/reference-shop.jpg" alt="" /></div></>;
      break;
    case 'resume':
      content = <><span className="broadcast-eyebrow">Aaron Kleiman</span>{title}<span className="broadcast-rule" /><span className="broadcast-detail">Education - Experience - Selected work</span></>;
      break;
    case 'spark':
      content = <><span className="broadcast-eyebrow">In progress</span>{title}<span className="broadcast-project">AgentBench</span><span className="broadcast-detail">Building reliable AI agents</span></>;
      break;
    case 'ai':
      content = <><div className="broadcast-ai-copy">{title}<span className="broadcast-detail">Ask about my work</span></div><div className="broadcast-mii-art"><img src="/images/wii/reference-check-mii.png" alt="" /></div></>;
      break;
    case 'hobbies':
      content = <><div className="broadcast-copy">{title}<span className="broadcast-detail">Life beyond the keyboard</span></div><div className="broadcast-crowd"><img src="/images/wii/reference-mii.png" alt="" /></div></>;
      break;
    case 'mii':
      content = <><div className="broadcast-copy">{title}<span className="broadcast-detail">Create. Gather. Play.</span></div><div className="broadcast-crowd"><img src="/images/wii/reference-mii.png" alt="" /></div></>;
      break;
    case 'arcade':
      content = <><span className="broadcast-eyebrow">Three little games</span>{title}<span className="arcade-tile-controls" aria-hidden="true"><b>+</b><i>A</i><i>B</i></span></>;
      break;
    case 'contact':
      content = <><img className="broadcast-city" src="/images/channels/toronto.jpg" alt="" /><div className="broadcast-copy">{title}<span className="broadcast-detail">Say hello from anywhere.</span></div></>;
      break;
    case 'github':
      content = <><ChannelIcon name="github" size={72} /><div className="broadcast-copy">{title}<span className="broadcast-detail">aaronk2005</span></div></>;
      break;
    case 'linkedin':
      content = <><span className="broadcast-linkedin-mark">in</span><div className="broadcast-copy">{title}<span className="broadcast-detail">Aaron Kleiman</span></div></>;
      break;
    default:
      content = title;
  }

  return <div className={`broadcast broadcast-${channel.icon}`} aria-hidden="true">{content}</div>;
}
