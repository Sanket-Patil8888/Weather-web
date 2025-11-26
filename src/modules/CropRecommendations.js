import React, { useMemo, useState } from "react";
import styled from "styled-components";
import CROP_RECOMMENDATIONS from "../data/cropRecommendations";

const Section = styled.section`
  margin-top: 28px;
  padding: 24px;
  border-radius: 28px;
  background: rgba(16, 36, 28, 0.6);
  border: 1px solid rgba(73, 208, 142, 0.2);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(18px);
  animation: fadeIn 0.6s ease-out 0.2s both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 24px;
  }
  
  @media (max-width: 520px) {
    padding: 18px;
  }
  
  @media (max-width: 360px) {
    padding: 16px 12px;
    margin-top: 20px;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    padding: 14px 12px;
    margin-top: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 18px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #e6ffe6;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 480px) {
    font-size: 1.15rem;
    gap: 6px;
  }
  
  @media (max-width: 360px) {
    font-size: 1rem;
    gap: 4px;
  }
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(230, 255, 230, 0.8);
`;

const Message = styled.div`
  margin-top: 6px;
  font-size: 0.85rem;
  color: rgba(230, 255, 230, 0.7);
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? "rgba(73, 208, 142, 0.9)" : "rgba(255, 255, 255, 0.2)")};
  background: ${({ active }) => (active ? "rgba(73, 208, 142, 0.15)" : "transparent")};
  color: ${({ active }) => (active ? "#5df2a5" : "#f3fff3")};
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 36px;
  
  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 0.8rem;
    min-height: 38px;
  }
  
  @media (max-width: 360px) {
    padding: 6px 12px;
    font-size: 0.75rem;
    min-height: 36px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(73, 208, 142, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    border-color: ${({ active }) => (active ? "rgba(73, 208, 142, 1)" : "rgba(255, 255, 255, 0.3)")};
    
    &::before {
      width: 200px;
      height: 200px;
    }
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
  }
`;

const Card = styled.article`
  border-radius: 24px;
  background: rgba(6, 20, 14, 0.6);
  border: 1px solid rgba(73, 208, 142, 0.18);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: fadeInUp 0.5s ease-out both;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.15s; }
  &:nth-child(3) { animation-delay: 0.2s; }
  &:nth-child(4) { animation-delay: 0.25s; }
  &:nth-child(5) { animation-delay: 0.3s; }
  &:nth-child(6) { animation-delay: 0.35s; }
  &:nth-child(7) { animation-delay: 0.4s; }
  &:nth-child(8) { animation-delay: 0.45s; }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(73, 208, 142, 0.3);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 130px;
  background-image: ${({ src }) =>
    `linear-gradient(120deg, rgba(0,0,0,0.2), rgba(0,0,0,0.35)), url(${src})`};
  background-size: cover;
  background-position: center;
`;

const Suitability = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ status }) =>
    status === "perfect"
      ? "rgba(93, 242, 165, 0.9)"
      : status === "good"
      ? "rgba(255, 210, 74, 0.9)"
      : "rgba(255, 120, 120, 0.9)"};
  color: #051007;
  font-weight: 600;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CropName = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: #e8ffe8;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(73, 208, 142, 0.15);
  border: 1px solid rgba(73, 208, 142, 0.3);
  color: #a8f5cf;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(232, 255, 232, 0.85);
`;

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #f0fff0;
`;

const Tip = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: rgba(232, 255, 232, 0.75);
`;

const AddButton = styled.button`
  margin-top: 10px;
  border: 1px solid rgba(93, 242, 165, 0.4);
  background: rgba(93, 242, 165, 0.1);
  color: #9ffed0;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 200ms ease;

  &:hover {
    background: rgba(93, 242, 165, 0.2);
  }
`;

const bandMessage = {
  freezing: "Perfect for hardy cold-season crops.",
  cold: "Perfect for hardy cold-season crops.",
  cool: "Ideal for cool-season vegetables.",
  moderate: "Best growing conditions—plant most crops.",
  warm: "Perfect for heat-loving crops.",
  hot: "Limited options—focus on heat-tolerant varieties.",
};

const CATEGORY_FILTERS = ["All", "Vegetables", "Fruits", "Herbs"];

const getBand = (temp) => {
  if (temp === null || temp === undefined) return "moderate";
  if (temp < 10) return "cold";
  if (temp < 20) return "cool";
  if (temp <= 25) return "moderate";
  if (temp <= 30) return "warm";
  return "hot";
};

const getSuitability = (temp, [min, max]) => {
  if (temp === null) return "good";
  if (temp >= min && temp <= max) return "perfect";
  const delta = Math.min(Math.abs(temp - min), Math.abs(temp - max));
  if (delta <= 5) return "good";
  return "marginal";
};

const CropRecommendations = ({ weather }) => {
  const [category, setCategory] = useState("All");
  const temp = weather?.main?.temp ?? null;
  const band = getBand(temp);
  const subtitle =
    temp !== null ? `${temp.toFixed(0)}°C · ${weather?.weather?.[0]?.description || ""}` : "Loading...";

  const suggestions = useMemo(() => {
    const list = CROP_RECOMMENDATIONS.map((crop) => ({
      ...crop,
      suitability: getSuitability(temp, crop.tempRange),
    })).sort((a, b) => {
      const priority = { perfect: 0, good: 1, marginal: 2 };
      return priority[a.suitability] - priority[b.suitability];
    });
    return list;
  }, [temp]);

  const filtered = useMemo(() => {
    let arr = suggestions;
    if (category !== "All") {
      arr = arr.filter((crop) => crop.category === category);
    }
    return arr.slice(0, 8);
  }, [category, suggestions]);

  return (
    <Section aria-live="polite">
      <Header>
        <TitleRow>
          <Title>🌱 Crop Recommendations</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitleRow>
        <Message>{bandMessage[band]}</Message>
      </Header>

      <Filters>
        {CATEGORY_FILTERS.map((label) => (
          <FilterButton
            key={label}
            active={category === label}
            onClick={() => setCategory(label)}
          >
            {label}
          </FilterButton>
        ))}
      </Filters>

      <Grid>
        {filtered.map((crop) => (
          <Card key={crop.id}>
            <CardImage src={crop.image} role="img" aria-label={crop.name} />
            <Suitability status={crop.suitability}>
              {crop.suitability === "perfect"
                ? "Perfect"
                : crop.suitability === "good"
                ? "Good"
                : "Marginal"}
            </Suitability>
            <CardBody>
              <CropName>{crop.name}</CropName>
              {crop.nameHindi && (
                <CropName style={{ fontSize: "0.9rem", color: "rgba(232, 255, 232, 0.85)", marginTop: "-4px" }}>
                  {crop.nameHindi}
                </CropName>
              )}
              <Tag>{crop.category}</Tag>
              <StatRow>
                <span>Optimal temp</span>
                <strong>{crop.optimal}</strong>
              </StatRow>
              <StatRow>
                <span>Days to harvest</span>
                <strong>{crop.daysToHarvest}</strong>
              </StatRow>
              <ChipRow>
                <Chip>
                  💧 {crop.water}
                </Chip>
                <Chip>
                  ☀️ {crop.sun}
                </Chip>
              </ChipRow>
              <Tip>{crop.tip}</Tip>
              <AddButton onClick={() => console.log(`Add ${crop.name} to My Garden`)}>
                ➕ Add to My Garden
              </AddButton>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default CropRecommendations;


