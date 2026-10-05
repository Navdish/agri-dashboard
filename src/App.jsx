
import { useState } from 'react';
import './index.css';
const W = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

function Line({ series, min, max, step, w = 330, h = 130, dark, fmt = v => v }) {
  const L = 34, R = 8, T = 8, B = 20, pw = w - L - R, ph = h - T - B;
  const x = i => L + i * pw / (W.length - 1), y = v => T + ph - (v - min) / (max - min) * ph;
  const ticks = []; for (let v = min; v <= max + 1e-9; v += step)ticks.push(v);
  const gc = dark ? '#1c2a3d' : '#e3e8e5', tc = dark ? '#5b6a80' : '#555';
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%">
    {ticks.map(v => <g key={v}><line x1={L} x2={w - R} y1={y(v)} y2={y(v)} stroke={gc} /><text x={L - 4} y={y(v) + 3} fontSize="7" fill={tc} textAnchor="end">{fmt(v)}</text></g>)}
    {W.map((l, i) => <text key={l} x={x(i)} y={h - 6} fontSize="7" fill={tc} textAnchor="middle">{l}</text>)}
    {series.map((s, k) => <g key={k}><polyline fill="none" stroke={s.c} strokeWidth="2" points={s.d.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
      {s.d.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill={s.c} />)}</g>)}
  </svg>;
}
function Donut({ data, size = 120, hole = .55, center, dark }) {
  const tot = data.reduce((a, b) => a + b.v, 0), r = 40, C = 2 * Math.PI * r; let off = 0;
  return <svg viewBox="0 0 100 100" width={size} height={size}>
    <g transform="rotate(-90 50 50)">{data.map(d => { const len = d.v / tot * C; const e = <circle key={d.n} cx="50" cy="50" r={r} fill="none" stroke={d.c} strokeWidth={r * hole * 1.1} strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} />; off += len; return e; })}</g>
    {center || data.map((d, i) => null)}
  </svg>;
}
const kpis = [
  ['#1f9d4f', '👥', '500+', 'Farmers Signed Up', 'How many farmers joined in the pilot'],
  ['#2a8fc4', '💬', '3,000+', 'Chats per Week', 'How many times farmers talk to the bot'],
  ['#d4572a', '🎙', '70%', 'Use Their Voice', 'Out of 10 farmers, 7 send voice notes — not text'],
  ['#7a5cc4', '✔', '85%', 'Percentage of users using daily', 'Daily usage'],
  ['#d4900f', '⚡', '< 3 sec', 'Reply Speed', 'Farmer gets an answer in under 3 seconds'],
  ['#c4478f', '↻', '60%', 'Come Back After 7 Days', '6 out of 10 farmers use it again next week'],
  ['#1f9d6f', '☺', '4.0 / 5', 'Farmer Satisfaction Score', 'Farmers rate the chatbot above 4 out of 5'],
  ['#d4572a', '🔔', '80%', 'Open Proactive Alerts', '8 out of 10 weather/mandi alerts are read'],
  ['#c49a0f', '🏆', '100+', 'Sales Leads Generated', 'High-value farmers interested in Mahadhan products'],
];
function DashboardTab() {
  const bars = [30, 60, 100, 150, 210, 310, 420, 500];
  const topics = [{ n: 'Crop Advisory', v: 35, c: '#1f9d4f' }, { n: 'Weather', v: 22, c: '#2a8fc4' }, { n: 'Mandi Prices', v: 18, c: '#c48a0f' }, { n: 'Pest/Disease', v: 14, c: '#7a5cc4' }, { n: 'Registration', v: 6, c: '#566272' }, { n: 'Dealer Search', v: 5, c: '#c4472a' }];
  const bw = 330, bh = 130, L = 30, pw = bw - L - 8, ph = bh - 28;
  return <div className="wrap" style={{ maxWidth: 960 }}>
    <div className="dark"><h2>How Will We Know It's Working?</h2><div className="s">Simple numbers that tell us if farmers are using it, loving it, and coming back</div>
      <div className="kg">{kpis.map((k, i) => <div key={i} className="kc" style={{ borderLeftColor: k[0] }}>
        <div className="ci" style={{ borderColor: k[0], color: k[0] }}>{k[1]}</div>
        <div><strong style={{ color: k[0] }}>{k[2]}</strong><b>{k[3]}</b></div><small>{k[4]}</small></div>)}</div></div>
    <div className="dark"><h2>KPI Charts — Pilot Week-by-Week Progress</h2><div className="s">Expected growth during the 8-week pilot — more farmers, more chats, better accuracy</div>
      <div className="cg">
        <div><h4>Farmers Joined Week-by-Week</h4><div className="cb"><svg viewBox={`0 0 ${bw} ${bh}`} width="100%">
          {[0, 100, 200, 300, 400, 500, 600].map(v => { const y = 6 + (ph) * (1 - v / 600); return <g key={v}><line x1={L} x2={bw - 8} y1={y} y2={y} stroke="#1c2a3d" /><text x={L - 4} y={y + 3} fontSize="7" fill="#5b6a80" textAnchor="end">{v}</text></g> })}
          {bars.map((v, i) => { const bwid = pw / 8, x = L + i * bwid + bwid * .3, hh = ph * v / 600; return <g key={i}><rect x={x} y={6 + ph - hh} width={bwid * .4} height={hh} fill="#1f9d4f" /><text x={x + bwid * .2} y={6 + ph - hh - 3} fontSize="8" fill="#e6ebf2" textAnchor="middle">{v}</text><text x={x + bwid * .2} y={bh - 6} fontSize="7" fill="#5b6a80" textAnchor="middle">{W[i]}</text></g> })}
        </svg></div></div>
        <div><h4>Weekly Chats Volume</h4><div className="cb"><Line dark min={0} max={3500} step={500} series={[{ c: '#2a8fc4', d: [120, 300, 520, 850, 1200, 1900, 2500, 3200] }]} /></div></div>
        <div><h4>What Are Farmers Asking About?</h4><div className="cb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: 10 }}>
          <Donut data={topics} size={130} hole={.5} />
          <div style={{ fontSize: 9 }}>{topics.map(t => <div key={t.n} style={{ margin: '6px 0' }}><span style={{ display: 'inline-block', width: 8, height: 8, background: t.c, marginRight: 6 }} />{t.n} <span style={{ color: '#5b6a80' }}>{t.v}%</span></div>)}</div></div></div>
        <div><h4>Farmer Satisfaction Over Time</h4><div className="cb"><Line dark min={1} max={5} step={.5} series={[{ c: '#1f9d6f', d: [3.2, 3.5, 3.7, 3.8, 4.0, 4.1, 4.2, 4.3] }]} /></div></div>
      </div></div></div>;
}
function Analytics() {
  const funnel = [['Opt-in', '100%', 100, '#0b6b45'], ['Engaged', '72%', 72, '#1a9d70'], ['CTA Used', '41%', 41, '#d4900f'], ['Qualified', '18%', 18, '#c4372a']];
  const topics = [['Mandi Rates', 88, '#0b6b45'], ['Crop Advisory', 74, '#1a9d70'], ['Weather Alerts', 66, '#4a7fd4'], ['Fertiliser Reco', 52, '#d4900f'], ['Dealer Locator', 38, '#c4372a']];
  const stats = [['ACTIVE FARMERS', '90,128', '+12.4%', '#0b6b45', '#0b6b45'], ['CONVERSATIONS', '7.2L', '+18.1%', '#12805a', '#12805a'], ['HOT + URGENT LEADS', '4,310', '+9.6%', '#c4372a', '#c4372a'], ['LEAD CONV. RATE', '18.4%', '+3.2%', '#7a2fc4', '#7a2fc4']];
  return <div className="wrap">
    <div className="top"><div><h1>Lead Engagement Analytics</h1><div className="sub">Farmer engagement, conversion funnel and channel activity across the WhatsApp chatbot</div></div><div className="pill">◔ Last 30 days ▾</div></div>
    <div className="g4">{stats.map(s => <div key={s[0]} className="kp" style={{ borderLeftColor: s[3] }}><div className="r"><div className="ic" style={{ background: s[4] }} /><span>↑ {s[2]}</span></div><small>{s[0]}</small><strong>{s[1]}</strong></div>)}</div>
    <div className="row" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
      <div className="card"><h3>Weekly Engagement Trend</h3><p>Active farmers vs. conversations</p>
        <Line min={0} max={100} step={10} w={420} h={190} series={[{ c: '#0b5d3b', d: [42, 51, 58, 64, 70, 77, 83, 90] }, { c: '#12805a', d: [18, 26, 35, 44, 52, 61, 68, 72] }]} />
        <div style={{ textAlign: 'center', fontSize: 8, color: '#555' }}><span style={{ color: '#0b5d3b' }}>●</span> Active Farmers &nbsp; <span style={{ color: '#12805a' }}>●</span> Conversations (10k)</div></div>
      <div style={{ display: 'grid', gap: 12 }}>
        <div className="card"><h3>Conversion Funnel</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90, marginTop: 6 }}>{funnel.map(f => <div key={f[0]} style={{ flex: 1, textAlign: 'center', fontSize: 8 }}>{f[1]}<div style={{ height: f[2] * .65, background: f[3], marginTop: 2 }} /></div>)}</div>
          <div style={{ display: 'flex', gap: 6, fontSize: 7, color: '#7a877f' }}>{funnel.map(f => <div key={f[0]} style={{ flex: 1, textAlign: 'center' }}>{f[0]}</div>)}</div></div>
        <div className="card"><h3>Top Engagement Topics</h3>{topics.map(t => <div className="hbar" key={t[0]}><i>{t[0]}</i><div><u style={{ width: t[1] + '%', background: t[2] }} /></div><em>{t[1]}%</em></div>)}</div>
      </div></div></div>;
}
function Leads() {
  const tiers = [['Urgent', '2,310', '81+ points', '#7a2fc4'], ['Hot', '2,000', '51–80 points', '#c4372a'], ['Warm', '18,540', '21–50 points', '#d4900f'], ['Cold', '67,278', '0–20 points', '#4a7fd4']];
  const rules = [['Soil test / advisory request', '+20'], ['Uses 4+ features in 30d', '+25'], ['Checks mandi 3+/week', '+15'], ['Requests crop advisory', '+15'], ['Asks AI bot 5+ Qs', '+10'], ['Clicks dealer locator', '+10'], ['Opens onboarding', '+5']];
  const pr = [['Ashish.', 'Nashik', 92, 'Urgent', 'Onion'], ['Ramrao K.', 'Pune', 88, 'Urgent', 'Soybean'], ['Anil D.', 'Jalgaon', 76, 'Hot', 'Cotton'], ['Vijay M.', 'Nagpur', 71, 'Hot', 'Wheat'], ['Ganesh T.', 'Satara', 64, 'Hot', 'Sugarcane'], ['Prakash S.', 'Beed', 58, 'Hot', 'Soybean']];
  const dn = [{ n: 'Cold', v: 67278, c: '#4a7fd4' }, { n: 'Warm', v: 18540, c: '#d4900f' }, { n: 'Hot', v: 2000, c: '#c4372a' }, { n: 'Urgent', v: 2310, c: '#7a2fc4' }];
  return <div className="wrap">
    <h1>Lead Scoring</h1><div className="sub">Behaviour-based scores and tier distribution to prioritise high-intent farmers for sales</div>
    <div className="g4">{tiers.map(t => <div key={t[0]} className="tier" style={{ borderLeftColor: t[3] }}><span><span style={{ color: t[3] }}>● </span>{t[0]}</span><strong>{t[1]}</strong><small>{t[2]}</small></div>)}</div>
    <div className="row" style={{ gridTemplateColumns: '1fr 1fr 1.3fr' }}>
      <div className="card"><h3>Scoring Model</h3><p>Points awarded per farmer behaviour</p>{rules.map(r => <div className="sc" key={r[0]}>{r[0]}<span className="chip">{r[1]}</span></div>)}</div>
      <div className="card"><h3>Tier Distribution</h3><div style={{ position: 'relative', textAlign: 'center', marginTop: 20 }}><Donut data={dn} size={150} hole={.35} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 16 }}><div>90,128<div style={{ fontSize: 7, color: '#888' }}>scored</div></div></div></div>
        <div style={{ textAlign: 'center', fontSize: 8, marginTop: 12 }}>{dn.map(d => <span key={d.n} style={{ marginRight: 8 }}><span style={{ color: d.c }}>● </span>{d.n}</span>)}</div></div>
      <div className="card"><h3>Priority Leads for Outreach</h3><table><thead><tr><th>FARMER</th><th>SCORE</th><th>TIER</th><th>CROP</th></tr></thead><tbody>
        {pr.map(p => <tr key={p[0]}><td>{p[0]} · {p[1]}</td><td>{p[2]}</td><td><span className="tg" style={{ background: p[3] == 'Urgent' ? '#7a2fc4' : '#c4372a' }}>{p[3]}</span></td><td>{p[4]}</td></tr>)}</tbody></table></div>
    </div></div>;
}
function Farmers() {
  const [f, setF] = useState('All');
  const ev = [['🌱', '#0b5d3b', 'Farmer asked about onion price trend', 'Bot: Nashik ₹1,240/qtl (+₹60). Trend up — wait 2 days', 'Today · 09:42', '+15 · CTA', '#16a05a'],
  ['📍', '#c4372a', 'Clicked dealer locator', 'Viewed Ramesh Agri (2.3 km) · tapped call', 'Today · 09:45', '+10 score', '#16a05a'],
  ['☁', '#4a7fd4', 'Weather alert delivered & opened', 'Heavy rain warning — spraying postponed advisory', 'Yesterday · 06:30', 'alert · opened', '#d4900f'],
  ['🌿', '#16a05a', 'Crop advisory requested (voice)', 'Tillering stage fertiliser reco · Mahadhan Smartek DAP', '2 days ago', '+15 score', '#16a05a'],
  ['✔', '#0b5d3b', 'Soil test booking completed', 'Report uploaded · NPK analysis shared', '12 May · 17:10', '+20 · qualified', '#7a2fc4'],
  ['○', '#16a05a', 'Onboarded via WhatsApp', 'Profile created · crop & language set (Marathi)', '09 May · 11:03', '+5 score', '#16a05a']];
  const info = [['PRIMARY CROP', 'Onion (5.2 acres)'], ['WHATSAPP', '+91 98XXX XXX21'], ['SOIL TEST', 'Done · 12 May 2026'], ['EST. VALUE', 'High-value farmer'], ['LAST ACTIVE', '2 hours ago']];
  return <div className="wrap">
    <h1>Interaction History</h1><div className="sub">Full conversation and engagement timeline for a single farmer profile</div>
    <div className="row" style={{ gridTemplateColumns: '1fr 2.6fr' }}>
      <div className="card" style={{ textAlign: 'center' }}><div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0b6b45', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 20, margin: '6px auto' }}>SP</div>
        <b style={{ fontSize: 14 }}>Ashish</b><div style={{ fontSize: 9, color: '#7a877f', margin: '3px 0 6px' }}>Nashik, Maharashtra</div><span className="tg" style={{ background: '#7a2fc4', padding: '3px 14px' }}>URGENT · 92</span>
        <div style={{ textAlign: 'left', marginTop: 16 }}>{info.map(i => <div key={i[0]} style={{ margin: '10px 0', fontSize: 9 }}><small style={{ display: 'block', fontSize: 6, color: '#8a968f' }}>{i[0]}</small>{i[1]}</div>)}</div></div>
      <div className="card"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h3>Conversation &amp; Engagement Timeline</h3>
        <div>{['All', 'Chats', 'Alerts', 'CTAs'].map(t => <span key={t} onClick={() => setF(t)} style={{ cursor: 'pointer', fontSize: 8, padding: '3px 10px', borderRadius: 12, marginLeft: 4, background: f == t ? '#0b5d3b' : '#eef2ef', color: f == t ? '#fff' : '#666' }}>{t}</span>)}</div></div>
        {ev.map((e, i) => <div className="tl" key={i}><div className="dot" style={{ borderColor: e[1], color: e[1] }}>{e[0]}</div><div><b>{e[2]}</b><small>{e[3]}</small></div><div className="t">{e[4]}<u style={{ background: e[6] }}>{e[5]}</u></div></div>)}</div>
    </div></div>;
}
function Soon({ n }) { return <div className="wrap"><h1>{n}</h1><div className="sub">Coming soon.</div></div> }
function App() {
  const [tab, setTab] = useState('Analytics');
  const tabs = ['Dashboard', 'Leads', 'Analytics', 'Campaigns', 'Farmers'];
  return <div><div className="hdr"><div className="logo">✆</div><div><b>Mahadhan Krishi AI</b><small>Sales &amp; Marketing Console</small></div>
    <nav>{tabs.map(t => <a key={t} className={tab == t ? 'on' : ''} onClick={() => setTab(t)}>{t}</a>)}</nav><div className="av">DF</div></div>
    {tab == 'Dashboard' ? <DashboardTab /> : tab == 'Leads' ? <Leads /> : tab == 'Analytics' ? <Analytics /> : tab == 'Farmers' ? <Farmers /> : <Soon n={tab} />}</div>;
}
export default App;
