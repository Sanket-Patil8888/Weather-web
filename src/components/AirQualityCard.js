import React from "react";
import styled from "styled-components";

const Card = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(14, 23, 36, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AQIValue = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
`;

const PollutantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const Pill = styled.div`
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.85rem;
  color: rgba(247, 251, 255, 0.85);
`;

const AirQualityCard = ({ airQuality }) => {
  if (!airQuality) return null;
  const index = airQuality.main?.aqi ?? 0;
  const label = getAqiLabel(index);

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: "0.9rem", color: "rgba(248,251,255,0.75)" }}>Air Quality Index</span>
          <AQIValue>{index}</AQIValue>
        </div>
        <span style={{ fontSize: "1rem", fontWeight: 600 }}>{label}</span>
      </div>
      <PollutantGrid>
        {Object.entries(airQuality.components || {}).map(([key, value]) => (
          <Pill key={key}>
            <strong
              style={{
                display: "block",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {key}
            </strong>
            {value.toFixed(1)} μg/m³
          </Pill>
        ))}
      </PollutantGrid>
    </Card>
  );
};

function getAqiLabel(index) {
  switch (index) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "Unknown";
  }
}

export default AirQualityCard;

