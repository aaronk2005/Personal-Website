import type { Channel } from '../data/portfolio';
import { ChannelIcon } from './ChannelIcon';
import { DEFAULT_MII, DEMO_MIIS, MiiAvatar } from './MiiPlaza';
import { AdvancedGameArtwork } from './AdvancedGameArtwork';

/** Channel identities share a bezel, but each has its own broadcast composition. */
export function ChannelArtwork({ channel }: { channel: Channel }) {
  const title = <span className="broadcast-title">{channel.title}</span>;
  const game=channel.to.split('/').pop()!;
  if(channel.icon==='arcade'&&['breaker','snake','mines','reversi'].includes(game))return <div className={'broadcast broadcast-arcade broadcast-game-'+game} aria-hidden="true"><div className="game-channel-preview"><AdvancedGameArtwork game={game}/></div>{title}</div>;
  let content;

  switch (channel.icon) {
    case 'profile':
      content = <><img className="broadcast-portrait" src="/images/linkedin-headshot.jpg" alt="" /><div className="broadcast-copy"><span className="broadcast-eyebrow">Aaron Kleiman</span>{title}<span className="broadcast-detail">Computer Engineering</span></div></>;
      break;
    case 'experience':
      content = <><img className="broadcast-disc" src="/images/wii/reference-disc.png" alt="" /><div className="broadcast-copy">{title}<span className="broadcast-detail">AMD - Tallysight - QSET</span></div></>;
      break;
    case 'projects':
      content = <>{title}<div className="broadcast-prints"><img src="/images/projects/odysseywalk.png" alt="" /><img src="/images/projects/perfex-prototype.png" alt="" /></div></>;
      break;
    case 'toolbox':
      content = <>{title}<div className="broadcast-shop-art"><img src="/images/wii/reference-shop.jpg" alt="" /></div></>;
      break;
    case 'resume':
      content = <><span className="broadcast-eyebrow">Aaron Kleiman</span>{title}<span className="broadcast-rule" /><span className="broadcast-detail">Education - Experience - Selected work</span></>;
      break;
    case 'spark':
      content = <><span className="broadcast-eyebrow">In progress</span>{title}<span className="broadcast-project">AgentBench</span><span className="broadcast-detail">Agent tests & version comparisons</span></>;
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
      content = <><div className="game-channel-preview">
        {channel.to.endsWith('memory') ? <div className="tile-memory"><MiiAvatar mii={DEFAULT_MII} bust/><MiiAvatar mii={DEMO_MIIS[2]} bust/></div> : channel.to.endsWith('four') ? <div className="tile-four">{Array.from({length:28},(_,i)=><i key={i} className={i>16?(i%3?'red':'yellow'):''}/>)}</div> : channel.to.endsWith('tennis') ? <svg viewBox="0 0 220 95"><rect x="15" y="8" width="190" height="78" rx="4" fill="#287d77"/><path d="M110 8V86" stroke="white" strokeDasharray="4 3"/><path d="M24 40v23M196 24v23" stroke="white" strokeWidth="5" strokeLinecap="round"/><circle cx="151" cy="56" r="4" fill="white"/></svg> : channel.to.endsWith('targets') ? <svg viewBox="0 0 220 95">{[[68,44,29],[150,58,21]].map(([x,y,r])=><g key={x}><circle cx={x} cy={y} r={r} fill="#fafafa" stroke="#e57161" strokeWidth="7"/><circle cx={x} cy={y} r={r/2} fill="#e57161"/><circle cx={x} cy={y} r="3" fill="white"/></g>)}</svg> : <svg viewBox="0 0 220 95"><path d="M87 4h48l40 90H45Z" fill="#e7c79a"/>{[94,110,126,102,118,110].map((x,i)=><g key={i} transform={`translate(${x} ${i<3?15:i<5?31:47})`}><path d="M-2-4Q-4-11 0-11Q4-11 2-4L2 0Q6 8 0 8Q-6 8-2 0Z" fill="white" stroke="#abb7bd" strokeWidth=".5"/><path d="M-2-2h4" stroke="#cd554d" strokeWidth="2"/></g>)}<circle cx="86" cy="77" r="13" fill="#397fbd"/></svg>}
      </div>{title}</>;
      break;
    case 'photo':
      content = <><img className="photo-channel-art" src="/images/wii/photo-channel.jpg" alt=""/>{title}</>;
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

  return <div className={`broadcast broadcast-${channel.icon}${channel.icon==='arcade'?' broadcast-game-'+channel.to.split('/').pop():''}`} aria-hidden="true">{content}</div>;
}
