import React, { useMemo } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(9, 16, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${(props) => props.color || "#f5f7fb"};
  background: ${(props) => props.bg || "rgba(255, 255, 255, 0.1)"};
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`;

const Card = styled.article`
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #f5f7fb;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
`;

const Meta = styled.span`
  font-size: 0.85rem;
  color: rgba(245, 247, 251, 0.75);
`;

const ActivityPlanner = ({ weather, hourly }) => {
  const summary = useMemo(() => {
    if (!weather) return null;
    const temp = weather.main?.temp ?? 0;
    const humidity = weather.main?.humidity ?? 0;
    const wind = weather.wind?.speed ?? 0;
    const condition = (weather.weather?.[0]?.main || "").toLowerCase();
    const nextRainChance = getNextRainChance(hourly);

    const suitability = evaluateSuitability({ temp, humidity, wind, condition, nextRainChance });
    const cards = buildActivityCards({ temp, humidity, wind, condition, nextRainChance });

    return { suitability, cards };
  }, [weather, hourly]);

  if (!summary) return null;

  return (
    <Section>
      <Header>
        <div>
          <strong>Weather-based activity planner</strong>
          <p style={{ margin: "4px 0 0", color: "rgba(248,251,255,0.75)", fontSize: "0.9rem" }}>
            Quick guidance for outdoor vs indoor plans based on the next few hours.
          </p>
        </div>
        <Pill bg={summary.suitability.bg} color={summary.suitability.color}>
          {summary.suitability.label}
        </Pill>
      </Header>
      <Grid>
        {summary.cards.map((card) => (
          <Card key={card.title}>
            <Title>{card.title}</Title>
            <Meta>{card.window}</Meta>
            <p style={{ margin: 0 }}>{card.tip}</p>
            <Meta>{card.detail}</Meta>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

function getNextRainChance(hourly = []) {
  if (!hourly.length) return 0;
  const horizon = hourly.slice(0, 6);
  return Math.round(Math.max(...horizon.map((h) => (h.pop || 0) * 100)));
}

function evaluateSuitability({ temp, humidity, wind, condition, nextRainChance }) {
  let label = "Comfortable outdoors";
  let bg = "rgba(59, 222, 152, 0.15)";
  let color = "#5af7c4";

  const isStormy = condition.includes("storm") || nextRainChance >= 70;
  const isWindy = wind >= 10;
  const isHot = temp >= 34 || humidity >= 80;
  const isCold = temp <= 5;

  if (isStormy || isWindy) {
    label = "Indoor priority";
    bg = "rgba(255, 120, 120, 0.15)";
    color = "#ffc6c6";
  } else if (isHot || isCold || nextRainChance >= 40) {
    label = "Plan cautiously";
    bg = "rgba(255, 200, 120, 0.15)";
    color = "#ffe0b0";
  }

  return { label, bg, color };
}

function buildActivityCards({ temp, humidity, wind, condition, nextRainChance }) {
  const cards = [];
  if (temp >= 32) {
    cards.push({
      title: "Heat-aware outdoor time",
      window: "Before 10:00 AM · After 6:00 PM",
      tip: "Schedule walks or field visits for cooler pockets of the day.",
      detail: "High heat detected — hydrate often and wear breathable layers.",
    });
  } else if (temp <= 8) {
    cards.push({
      title: "Bundle up outdoors",
      window: "Midday is warmest",
      tip: "Limit early morning/evening exposure; keep layers ready.",
      detail: "Cold temps increase flu risk when combined with low humidity.",
    });
  } else {
    cards.push({
      title: "Prime outdoor window",
      window: "Next 6 hours",
      tip: "Great for gardening, exercise, or field inspections.",
      detail: "Mild temperature range supports moderate activity.",
    });
  }

  if (nextRainChance >= 60 || condition.includes("rain")) {
    cards.push({
      title: "Rain-ready plan",
      window: "Rain likely soon",
      tip: "Shift workouts indoors, prep drainage for fields, keep umbrellas handy.",
      detail: `Rain probability peaks at ${nextRainChance}%. Consider delaying irrigation or fertilizer.`,
    });
  } else {
    cards.push({
      title: "Dry spell advantage",
      window: "Low rain risk",
      tip: "Ideal for airing laundry, painting, or equipment maintenance.",
      detail: "Skies stay mostly clear; take advantage of low precipitation chance.",
    });
  }

  if (wind >= 10) {
    cards.push({
      title: "Wind caution",
      window: "Gusts above comfort",
      tip: "Secure loose outdoor items and avoid spraying pesticides.",
      detail: `Wind speeds around ${Math.round(wind)} m/s may disrupt canopy-level tasks.`,
    });
  } else {
    cards.push({
      title: "Gentle breeze",
      window: "Spraying-friendly",
      tip: "Good conditions for foliar feed or precise irrigation runs.",
      detail: "Low wind reduces drift and evaporation.",
    });
  }

  const humidityNote =
    humidity >= 75
      ? "High humidity increases fungal pressure; ventilate greenhouses."
      : humidity <= 35
      ? "Dry air — consider mulching and stay hydrated."
      : "Comfortable humidity for most activities.";
  cards.push({
    title: "Humidity insight",
    window: `${humidity}% relative`,
    tip: humidityNote,
    detail: "Use this to tune indoor comfort and crop monitoring plans.",
  });

  return cards.slice(0, 4);
}

export default ActivityPlanner;

