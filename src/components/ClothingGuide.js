import React, { useMemo } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(12, 22, 34, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.li`
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #f5f7fb;
  align-items: flex-start;
`;

const Emoji = styled.span`
  font-size: 1.4rem;
  line-height: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.strong`
  font-size: 1rem;
`;

const Meta = styled.span`
  font-size: 0.85rem;
  color: rgba(245, 247, 251, 0.75);
`;

const ClothingGuide = ({ weather }) => {
  const items = useMemo(() => {
    if (!weather) return [];
    const temp = weather.main?.temp ?? 0;
    const humidity = weather.main?.humidity ?? 0;
    const wind = weather.wind?.speed ?? 0;
    const isRainy = (weather.weather?.[0]?.main || "").toLowerCase().includes("rain");
    return buildRecommendations({ temp, humidity, wind, isRainy });
  }, [weather]);

  if (!items.length) return null;

  return (
    <Section>
      <div>
        <strong>Clothing & comfort guide</strong>
        <p style={{ margin: "4px 0 0", color: "rgba(248,251,255,0.75)", fontSize: "0.9rem" }}>
          Wardrobe tips tuned to the current feel, moisture, and wind.
        </p>
      </div>
      <List>
        {items.map((item) => (
          <Item key={item.title}>
            <Emoji>{item.emoji}</Emoji>
            <Content>
              <Title>{item.title}</Title>
              <p style={{ margin: 0 }}>{item.tip}</p>
              <Meta>{item.meta}</Meta>
            </Content>
          </Item>
        ))}
      </List>
    </Section>
  );
};

function buildRecommendations({ temp, humidity, wind, isRainy }) {
  const recs = [];

  if (temp >= 30) {
    recs.push({
      emoji: "🧢",
      title: "Light & breathable layers",
      tip: "Opt for moisture-wicking fabrics, shorts, and ventilated footwear.",
      meta: "Heat index favors airy outfits.",
    });
  } else if (temp <= 10) {
    recs.push({
      emoji: "🧥",
      title: "Insulated outerwear",
      tip: "Layer with thermal base, mid insulation, and windproof shell.",
      meta: "Cold stress likely below 10°C.",
    });
  } else {
    recs.push({
      emoji: "👕",
      title: "Comfort core",
      tip: "A light layer plus optional jacket keeps you flexible as temps shift.",
      meta: "Mild zone ideal for cotton/poly blends.",
    });
  }

  if (humidity >= 75) {
    recs.push({
      emoji: "💧",
      title: "Humidity-ready",
      tip: "Avoid heavy denim; choose quick-dry fabrics and carry face wipes.",
      meta: `Humidity at ${humidity}% raises stickiness.`,
    });
  } else if (humidity <= 35) {
    recs.push({
      emoji: "🧴",
      title: "Dry air toolkit",
      tip: "Hydrate skin with moisturizer, carry lip balm, and drink extra water.",
      meta: "Low humidity accelerates evaporation.",
    });
  }

  if (isRainy || wind >= 10) {
    recs.push({
      emoji: isRainy ? "☂️" : "🌀",
      title: isRainy ? "Rain protection" : "Wind barrier",
      tip: isRainy
        ? "Pack a waterproof shell or umbrella, and avoid suede/leather shoes."
        : "Choose a windbreaker and secure loose accessories.",
      meta: isRainy ? "Showers likely within the next few hours." : `Wind speeds near ${Math.round(wind)} m/s.`,
    });
  }

  recs.push({
    emoji: "👟",
    title: "Footwear cue",
    tip:
      temp >= 28
        ? "Breathable sneakers or sandals prevent overheating."
        : temp <= 12
        ? "Insulated shoes with warm socks keep feet cozy."
        : "Standard trainers work for most plans today.",
    meta: "Adjust socks/fabric mix to match temperature swing.",
  });

  return recs;
}

export default ClothingGuide;

