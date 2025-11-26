import React, { useMemo, useState } from "react";
import styled from "styled-components";
import FOOD_RECOMMENDATIONS from "../data/foodRecommendations";

const Section = styled.section`
  margin-top: 28px;
  padding: 24px;
  border-radius: 24px;
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: ${({ tone }) =>
    tone === "warm"
      ? "rgba(255, 147, 97, 0.1)"
      : tone === "hot"
      ? "rgba(255, 215, 97, 0.1)"
      : tone === "cool"
      ? "rgba(97, 179, 255, 0.12)"
      : "rgba(255, 255, 255, 0.07)"};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.6s ease-out 0.2s both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 20px 18px;
    margin-top: 24px;
  }
  
  @media (max-width: 520px) {
    padding: 18px 16px;
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
  gap: 6px;
  margin-bottom: 18px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
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
  color: rgba(255, 255, 255, 0.75);
`;

const Filters = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
`;

const FilterButton = styled.button`
  border: 1px solid ${({ active }) => (active ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.25)")};
  background: ${({ active }) => (active ? "rgba(255, 255, 255, 0.2)" : "transparent")};
  color: #fff;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(6px);
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
    background: rgba(255, 255, 255, 0.15);
    transform: translate(-50%, -50%);
    transition: width 0.4s, height 0.4s;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.7);
    transform: translateY(-2px) scale(1.05);
    
    &::before {
      width: 200px;
      height: 200px;
    }
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  border: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  padding: 8px 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 200ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
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
  border-radius: 20px;
  overflow: hidden;
  background: rgba(15, 19, 29, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
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
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 140px;
  background-image: ${({ src }) => `linear-gradient(120deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${src})`};
  background-size: cover;
  background-position: center;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
`;

const Badge = styled.span`
  align-self: flex-start;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.82);
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const Chip = styled.span`
  font-size: 0.7rem;
  border-radius: 999px;
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const FILTER_OPTIONS = ["all", "breakfast", "lunch", "dinner", "snack", "beverage"];

const getTemperatureBand = (temp) => {
  if (temp === null || temp === undefined) return "moderate";
  if (temp < 0) return "freezing";
  if (temp < 10) return "cold";
  if (temp < 15) return "cool";
  if (temp < 25) return "moderate";
  if (temp < 30) return "warm";
  if (temp < 35) return "hot";
  return "veryHot";
};

const getWeatherTag = (condition = "") => {
  const c = condition.toLowerCase();
  if (c.includes("rain")) return "rainy";
  if (c.includes("storm")) return "rainy";
  if (c.includes("snow")) return "snowy";
  if (c.includes("cloud")) return "cloudy";
  return "sunny";
};

const getSeason = (date) => {
  const month = date.getUTCMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "fall";
  return "winter";
};

const getTimeSlot = (hours) => {
  if (hours >= 5 && hours < 11) return "breakfast";
  if (hours >= 11 && hours < 15) return "lunch";
  if (hours >= 15 && hours < 17) return "snack";
  if (hours >= 17 && hours < 22) return "dinner";
  return "snack";
};

const getTone = (band) => {
  if (band === "hot" || band === "veryHot") return "hot";
  if (band === "warm") return "warm";
  if (band === "cool" || band === "cold" || band === "freezing") return "cool";
  return "neutral";
};

const getWeatherEmoji = (condition) => {
  switch (condition) {
    case "rainy":
      return "🌧️";
    case "snowy":
      return "❄️";
    case "cloudy":
      return "⛅";
    case "sunny":
    default:
      return "☀️";
  }
};

const FoodRecommendations = ({ weather }) => {
  const [filter, setFilter] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const temp = weather?.main?.temp ?? null;
  const condition = weather?.weather?.[0]?.description || "";
  const band = getTemperatureBand(temp);
  const tone = getTone(band);
  const conditionTag = getWeatherTag(condition);
  const now = new Date((weather?.dt || Date.now()) * 1000);
  const timezoneOffsetMs = (weather?.timezone || 0) * 1000;
  const localTime = new Date(now.getTime() + timezoneOffsetMs);
  const season = getSeason(localTime);
  const timeSlot = getTimeSlot(localTime.getUTCHours());

  const recommendations = useMemo(() => {
    if (!weather) return [];
    const matches = FOOD_RECOMMENDATIONS.filter((item) => {
      const [min, max] = item.tempRange;
      const tempOk = temp === null || (temp >= min && temp <= max);
      const weatherOk =
        !item.weather?.length || item.weather.includes(conditionTag) || item.weather.includes(band);
      const timeOk = !item.timeOfDay?.length || item.timeOfDay.includes(timeSlot);
      const seasonOk = !item.seasons?.length || item.seasons.includes(season);
      return tempOk && weatherOk && timeOk && seasonOk;
    });

    if (matches.length >= 4) return matches;
    // fallback add general items
    const fallback = FOOD_RECOMMENDATIONS.filter(
      (item) => !matches.includes(item) && item.tempRange[0] <= 25 && item.tempRange[1] >= 10,
    );
    return [...matches, ...fallback].slice(0, 8);
  }, [band, conditionTag, season, temp, timeSlot, weather, refreshKey]);

  const filtered = useMemo(() => {
    if (filter === "all") return recommendations.slice(0, 6);
    return recommendations.filter((item) => item.category.toLowerCase() === filter).slice(0, 6);
  }, [filter, recommendations]);

  const subtitle =
    temp !== null
      ? `${temp.toFixed(0)}°C · ${condition}`
      : "Weather data updating...";

  return (
    <Section tone={tone} aria-live="polite">
      <Header>
        <TitleRow>
          <Title>
            {getWeatherEmoji(conditionTag)} Perfect Foods for This Weather
          </Title>
          <Actions>
            <ActionButton onClick={() => setRefreshKey((k) => k + 1)}>
              🔄 Refresh
            </ActionButton>
          </Actions>
        </TitleRow>
        <Subtitle>{subtitle}</Subtitle>
      </Header>

      <Filters role="tablist" aria-label="Food categories">
        {FILTER_OPTIONS.map((option) => (
          <FilterButton
            key={option}
            active={filter === option}
            onClick={() => setFilter(option)}
            role="tab"
            aria-selected={filter === option}
          >
            {option === "all" ? "All" : option.charAt(0).toUpperCase() + option.slice(1)}
          </FilterButton>
        ))}
      </Filters>

      {filtered.length ? (
        <Grid>
          {filtered.map((item) => (
            <Card key={`${item.id}-${refreshKey}`}>
              <CardImage src={item.image} role="img" aria-label={item.name} />
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <Badge>{item.category}</Badge>
                <Description>{item.description}</Description>
                <Description style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>
                  {item.why}
                </Description>
                <ChipRow>
                  <Chip>{band === "hot" || band === "veryHot" ? "Cooling" : band === "freezing" || band === "cold" ? "Warming" : "Balanced"}</Chip>
                  {item.tags.slice(0, 2).map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </ChipRow>
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : (
        <EmptyState>Checking weather conditions...</EmptyState>
      )}
    </Section>
  );
};

export default FoodRecommendations;


