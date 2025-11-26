import React from "react";
import styled from "styled-components";

const Card = styled.section`
  padding: 18px 20px;
  border-radius: 24px;
  background: rgba(13, 21, 34, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(248, 251, 255, 0.7);
`;

const Time = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #f8fbff;
`;

const SunriseSunset = ({ weather }) => {
  if (!weather?.sys) return null;
  const timezone = weather.timezone || 0;
  const sunrise = new Date((weather.sys.sunrise + timezone) * 1000);
  const sunset = new Date((weather.sys.sunset + timezone) * 1000);

  return (
    <Card>
      <Block>
        <Label>Sunrise</Label>
        <Time>{sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Time>
      </Block>
      <Block>
        <Label>Sunset</Label>
        <Time>{sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Time>
      </Block>
      <Block>
        <Label>Day Length</Label>
        <Time>{formatDuration((weather.sys.sunset - weather.sys.sunrise) * 1000)}</Time>
      </Block>
    </Card>
  );
};

function formatDuration(ms) {
  const hours = Math.floor(ms / 3_600_000);
  const minutes = Math.round((ms % 3_600_000) / 60_000);
  return `${hours}h ${minutes}m`;
}

export default SunriseSunset;

