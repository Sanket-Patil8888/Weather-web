import React from 'react';
import styled from 'styled-components';

const GaugeWrap = styled.div`
  display:flex; align-items:center; gap:12px;
`;

const SvgWrap = styled.svg`
  width:84px; height:84px; display:block;
`;

const Label = styled.div`
  display:flex; flex-direction:column; gap:4px;
`;

const LabelTitle = styled.span`
  font-size:0.78rem; color: rgba(191,215,234,0.95); font-weight:600;
`;

const LabelValue = styled.span`
  font-size:1.05rem; color: #fff; font-weight:700;
`;

function colorForPercent(p) {
  if (p <= 20) return '#4CD964'; // green
  if (p <= 50) return '#FFD60A'; // yellow
  if (p <= 75) return '#FF9500'; // orange
  return '#FF3B30'; // red
}

const RainGauge = ({ percent = 0, size = 84 }) => {
  const radius = 34; // circle radius
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const capped = Math.max(0, Math.min(100, Math.round(percent)));
  const offset = circumference - (capped / 100) * circumference;
  const color = colorForPercent(capped);

  return (
    <GaugeWrap>
      <SvgWrap viewBox="0 0 84 84" aria-hidden>
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" x2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={color} stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <g transform="translate(42,42)">
          <circle
            r={normalizedRadius}
            fill="transparent"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          <circle
            r={normalizedRadius}
            fill="transparent"
            stroke="url(#gaugeGrad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={offset}
            transform="rotate(-90)"
          />
        </g>
      </SvgWrap>
      <Label>
        <LabelTitle>Rain probability</LabelTitle>
        <LabelValue>{capped}%</LabelValue>
      </Label>
    </GaugeWrap>
  );
};

export default RainGauge;
