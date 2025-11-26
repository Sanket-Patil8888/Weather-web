import React from 'react';

export const SunIcon = ({ className = '' }) => (
  <svg className={className + ' icon-sun'} viewBox="0 0 64 64" width="88" height="88" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <defs>
      <radialGradient id="g1" cx="30%" cy="25%">
        <stop offset="0%" stopColor="#fff7c2" />
        <stop offset="60%" stopColor="#ffd54a" />
        <stop offset="100%" stopColor="#ffb347" />
      </radialGradient>
    </defs>
    <g>
      <circle cx="32" cy="32" r="12" fill="url(#g1)" />
      {/* rays */}
      {[0,45,90,135,180,225,270,315].map((a,i)=> (
        <rect key={i} x="31" y="4" width="2" height="10" rx="1" fill="#ffd98a" transform={`rotate(${a} 32 32)`} opacity="0.95" />
      ))}
    </g>
  </svg>
);

export const CloudIcon = ({ className = '' }) => (
  <svg className={className + ' icon-cloud'} viewBox="0 0 64 64" width="88" height="88" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <g fill="#e6f0ff">
      <ellipse cx="32" cy="36" rx="18" ry="10" fill="#dfefff" />
      <ellipse cx="22" cy="34" rx="10" ry="8" fill="#eaf6ff" />
      <ellipse cx="42" cy="34" rx="10" ry="8" fill="#d4ebff" />
    </g>
  </svg>
);

export const RainIcon = ({ className = '' }) => (
  <svg className={className + ' icon-rain'} viewBox="0 0 64 64" width="88" height="88" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <g>
      <ellipse cx="32" cy="28" rx="18" ry="10" fill="#d9eefc" />
      {/* drops */}
      <g fill="#6fb3ff" className="raindrops">
        <path d="M20 44c0 3 3 6 3 6s3-3 3-6-3-4-3-4-3 1-3 4z" />
        <path d="M30 44c0 3 3 6 3 6s3-3 3-6-3-4-3-4-3 1-3 4z" />
        <path d="M40 44c0 3 3 6 3 6s3-3 3-6-3-4-3-4-3 1-3 4z" />
      </g>
    </g>
  </svg>
);

export const SnowIcon = ({ className = '' }) => (
  <svg className={className + ' icon-snow'} viewBox="0 0 64 64" width="88" height="88" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <g>
      <ellipse cx="32" cy="28" rx="16" ry="9" fill="#f3fbff" />
      <g fill="#cfeafc" className="snowflakes">
        <circle cx="24" cy="44" r="2.4" />
        <circle cx="32" cy="46" r="2.4" />
        <circle cx="40" cy="44" r="2.4" />
      </g>
    </g>
  </svg>
);

export default { SunIcon, CloudIcon, RainIcon, SnowIcon };
