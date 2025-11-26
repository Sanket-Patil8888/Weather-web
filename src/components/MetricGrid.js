import React from "react";
import styled from "styled-components";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
`;

const Card = styled.article`
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(247, 251, 255, 0.7);
`;

const Value = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #f8fbff;
`;

const Meta = styled.span`
  font-size: 0.85rem;
  color: rgba(247, 251, 255, 0.75);
`;

const MetricGrid = ({ weather }) => {
  if (!weather) return null;
  const visibilityKm = weather.visibility ? weather.visibility / 1000 : null;
  const windDir = typeof weather.wind?.deg === "number" ? degreeToDirection(weather.wind.deg) : null;
  return (
    <Grid>
      <Card>
        <Label>Humidity</Label>
        <Value>{weather.main?.humidity ?? 0}%</Value>
        <Meta>Dew pt {Math.round(weather.main?.temp - ((100 - weather.main?.humidity) / 5) || 0)}°</Meta>
      </Card>
      <Card>
        <Label>Pressure</Label>
        <Value>{weather.main?.pressure ?? 0} hPa</Value>
        <Meta>Sea level pressure</Meta>
      </Card>
      <Card>
        <Label>Visibility</Label>
        <Value>{visibilityKm != null ? `${visibilityKm.toFixed(1)} km` : "—"}</Value>
        <Meta>Surface clarity</Meta>
      </Card>
      <Card>
        <Label>Wind</Label>
        <Value>{Math.round(weather.wind?.speed ?? 0)} m/s</Value>
        <Meta>{windDir || "Calm"}</Meta>
      </Card>
    </Grid>
  );
};

function degreeToDirection(deg) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const idx = Math.round(deg / 45) % 8;
  return directions[idx];
}

export default MetricGrid;

