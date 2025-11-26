import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.6s ease-out 0.2s both;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Icon = styled.span`
  font-size: 1.8rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #FFFFFF;
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 11px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }
  
  @media (max-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  @media (max-height: 500px) and (orientation: landscape) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }
`;

const ActivityCard = styled.div`
  padding: 14px 12px;
  border-radius: 14px;
  background: ${(props) => props.bgColor || "rgba(255, 255, 255, 0.08)"};
  border: 1px solid ${(props) => props.borderColor || "rgba(255, 255, 255, 0.1)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.4s ease-out both;

  &:nth-child(1) { animation-delay: 0.25s; }
  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.35s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.45s; }
  &:nth-child(6) { animation-delay: 0.5s; }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
    border-color: ${(props) => props.borderColor || "rgba(255, 255, 255, 0.25)"};

    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px 10px;
    gap: 6px;
    border-radius: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 10px 8px;
    gap: 5px;
    border-radius: 10px;
  }
  
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const ActivityIcon = styled.span`
  font-size: 2rem;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 360px) {
    font-size: 1.5rem;
  }
`;

const ActivityName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.75rem;
  }
`;

const ActivityTip = styled.div`
  font-size: 0.75rem;
  color: #BFD7EA;
  margin-top: 4px;
  opacity: 0.8;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
  
  @media (max-width: 360px) {
    font-size: 0.65rem;
    display: none;
  }
`;

const CategorySection = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #BFD7EA;
  margin-bottom: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(191, 215, 234, 0.3), transparent);
  }
`;

const WarningBox = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 177, 75, 0.15);
  border: 1px solid rgba(255, 177, 75, 0.25);
  color: #ffe8c9;
  font-size: 0.85rem;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const generateActivitySuggestions = (weather) => {
  if (!weather) return { recommended: [], avoid: [], indoor: [] };

  const temp = weather.main?.temp ?? 0;
  const humidity = weather.main?.humidity ?? 0;
  const windSpeed = weather.wind?.speed ?? 0;
  const condition = (weather.weather?.[0]?.main || "").toLowerCase();
  const description = (weather.weather?.[0]?.description || "").toLowerCase();
  const isRaining = condition.includes("rain") || condition.includes("drizzle");
  const isSnowing = condition.includes("snow");
  const isClear = condition.includes("clear");
  const isCloudy = condition.includes("cloud");
  const isStormy = condition.includes("storm") || condition.includes("thunder");
  const isWindy = windSpeed > 10;

  const recommended = [];
  const avoid = [];
  const indoor = [];

  // Sunny/Clear Weather Activities
  if (isClear && temp >= 15 && temp <= 30) {
    recommended.push({
      icon: "🏃",
      name: "Outdoor Running",
      tip: "Perfect conditions",
      bgColor: "rgba(255, 204, 51, 0.15)",
      borderColor: "rgba(255, 204, 51, 0.3)",
    });
    recommended.push({
      icon: "🚴",
      name: "Cycling",
      tip: "Great weather",
      bgColor: "rgba(255, 204, 51, 0.15)",
      borderColor: "rgba(255, 204, 51, 0.3)",
    });
    recommended.push({
      icon: "🧘",
      name: "Yoga Outdoors",
      tip: "Peaceful setting",
      bgColor: "rgba(255, 204, 51, 0.15)",
      borderColor: "rgba(255, 204, 51, 0.3)",
    });
    recommended.push({
      icon: "🏖️",
      name: "Beach Visit",
      tip: "Ideal conditions",
      bgColor: "rgba(255, 204, 51, 0.15)",
      borderColor: "rgba(255, 204, 51, 0.3)",
    });
    recommended.push({
      icon: "🥾",
      name: "Hiking",
      tip: "Clear trails",
      bgColor: "rgba(255, 204, 51, 0.15)",
      borderColor: "rgba(255, 204, 51, 0.3)",
    });
    recommended.push({
      icon: "🏸",
      name: "Outdoor Sports",
      tip: "Perfect for games",
      bgColor: "rgba(255, 204, 51, 0.15)",
      borderColor: "rgba(255, 204, 51, 0.3)",
    });
  }

  // Hot Weather Activities
  if (temp > 30) {
    recommended.push({
      icon: "🏊",
      name: "Swimming",
      tip: "Cool down",
      bgColor: "rgba(63, 132, 231, 0.15)",
      borderColor: "rgba(63, 132, 231, 0.3)",
    });
    recommended.push({
      icon: "🌊",
      name: "Water Sports",
      tip: "Stay cool",
      bgColor: "rgba(63, 132, 231, 0.15)",
      borderColor: "rgba(63, 132, 231, 0.3)",
    });
    avoid.push({
      icon: "🏃",
      name: "Intense Running",
      tip: "Too hot",
      bgColor: "rgba(255, 90, 90, 0.15)",
      borderColor: "rgba(255, 90, 90, 0.3)",
    });
  }

  // Cold Weather Activities
  if (temp < 10 && !isRaining && !isSnowing) {
    recommended.push({
      icon: "🚶",
      name: "Brisk Walking",
      tip: "Stay warm",
      bgColor: "rgba(176, 196, 222, 0.15)",
      borderColor: "rgba(176, 196, 222, 0.3)",
    });
    recommended.push({
      icon: "☕",
      name: "Outdoor Café",
      tip: "Cozy break",
      bgColor: "rgba(176, 196, 222, 0.15)",
      borderColor: "rgba(176, 196, 222, 0.3)",
    });
  }

  // Rainy Weather - Indoor Activities
  if (isRaining) {
    indoor.push({
      icon: "🏋️",
      name: "Gym Workout",
      tip: "Stay dry",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
    indoor.push({
      icon: "📚",
      name: "Reading",
      tip: "Perfect indoors",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
    indoor.push({
      icon: "🎬",
      name: "Movie Time",
      tip: "Cozy activity",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
    indoor.push({
      icon: "🧘",
      name: "Indoor Yoga",
      tip: "Mindful practice",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
    indoor.push({
      icon: "🎨",
      name: "Creative Projects",
      tip: "Productive time",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
    indoor.push({
      icon: "🍳",
      name: "Cooking",
      tip: "Try new recipes",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
    avoid.push({
      icon: "☂️",
      name: "Using Umbrella",
      tip: isWindy ? "Too windy for umbrella" : "Heavy rain",
      bgColor: "rgba(255, 90, 90, 0.15)",
      borderColor: "rgba(255, 90, 90, 0.3)",
    });
  }

  // Windy Weather Warnings
  if (isWindy) {
    avoid.push({
      icon: "☂️",
      name: "Umbrella",
      tip: "Will flip inside out",
      bgColor: "rgba(255, 90, 90, 0.15)",
      borderColor: "rgba(255, 90, 90, 0.3)",
    });
    if (windSpeed > 15) {
      avoid.push({
        icon: "🪁",
        name: "Flying Kites",
        tip: "Too dangerous",
        bgColor: "rgba(255, 90, 90, 0.15)",
        borderColor: "rgba(255, 90, 90, 0.3)",
      });
      avoid.push({
        icon: "🏕️",
        name: "Camping",
        tip: "Unsafe conditions",
        bgColor: "rgba(255, 90, 90, 0.15)",
        borderColor: "rgba(255, 90, 90, 0.3)",
      });
    }
  }

  // Snowy Weather
  if (isSnowing) {
    recommended.push({
      icon: "⛷️",
      name: "Skiing",
      tip: "Perfect conditions",
      bgColor: "rgba(176, 196, 222, 0.15)",
      borderColor: "rgba(176, 196, 222, 0.3)",
    });
    recommended.push({
      icon: "🏂",
      name: "Snowboarding",
      tip: "Great weather",
      bgColor: "rgba(176, 196, 222, 0.15)",
      borderColor: "rgba(176, 196, 222, 0.3)",
    });
    recommended.push({
      icon: "☃️",
      name: "Snow Activities",
      tip: "Build a snowman",
      bgColor: "rgba(176, 196, 222, 0.15)",
      borderColor: "rgba(176, 196, 222, 0.3)",
    });
    indoor.push({
      icon: "🔥",
      name: "Cozy Indoors",
      tip: "Stay warm",
      bgColor: "rgba(91, 155, 213, 0.15)",
      borderColor: "rgba(91, 155, 213, 0.3)",
    });
  }

  // Cloudy/Mild Weather
  if (isCloudy && !isRaining && temp >= 10 && temp <= 25) {
    recommended.push({
      icon: "🚶",
      name: "Walking",
      tip: "Comfortable",
      bgColor: "rgba(160, 160, 160, 0.15)",
      borderColor: "rgba(160, 160, 160, 0.3)",
    });
    recommended.push({
      icon: "📸",
      name: "Photography",
      tip: "Good lighting",
      bgColor: "rgba(160, 160, 160, 0.15)",
      borderColor: "rgba(160, 160, 160, 0.3)",
    });
    recommended.push({
      icon: "🛍️",
      name: "Shopping",
      tip: "Pleasant weather",
      bgColor: "rgba(160, 160, 160, 0.15)",
      borderColor: "rgba(160, 160, 160, 0.3)",
    });
  }

  // Stormy Weather
  if (isStormy) {
    indoor.push({
      icon: "🏠",
      name: "Stay Indoors",
      tip: "Safety first",
      bgColor: "rgba(139, 69, 19, 0.15)",
      borderColor: "rgba(139, 69, 19, 0.3)",
    });
    avoid.push({
      icon: "🌳",
      name: "Outdoor Activities",
      tip: "Lightning risk",
      bgColor: "rgba(255, 90, 90, 0.15)",
      borderColor: "rgba(255, 90, 90, 0.3)",
    });
  }

  // High Humidity
  if (humidity > 75 && temp > 25) {
    avoid.push({
      icon: "🏃",
      name: "Strenuous Exercise",
      tip: "Too humid",
      bgColor: "rgba(255, 90, 90, 0.15)",
      borderColor: "rgba(255, 90, 90, 0.3)",
    });
    recommended.push({
      icon: "🏊",
      name: "Swimming",
      tip: "Best option",
      bgColor: "rgba(63, 132, 231, 0.15)",
      borderColor: "rgba(63, 132, 231, 0.3)",
    });
  }

  return { recommended, avoid, indoor };
};

const ActivitySuggestions = ({ weather }) => {
  const { recommended, avoid, indoor } = generateActivitySuggestions(weather);

  if (!recommended.length && !avoid.length && !indoor.length) {
    return null;
  }

  const hasWarnings = avoid.length > 0;

  return (
    <Container>
      <Header>
        <Icon>🎯</Icon>
        <Title>Activity Recommendations</Title>
      </Header>

      {recommended.length > 0 && (
        <CategorySection>
          <CategoryTitle>✅ Recommended</CategoryTitle>
          <ActivitiesGrid>
            {recommended.map((activity, index) => (
              <ActivityCard
                key={`rec-${index}`}
                bgColor={activity.bgColor}
                borderColor={activity.borderColor}
              >
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityName>{activity.name}</ActivityName>
                {activity.tip && <ActivityTip>{activity.tip}</ActivityTip>}
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </CategorySection>
      )}

      {indoor.length > 0 && (
        <CategorySection>
          <CategoryTitle>🏠 Indoor Activities</CategoryTitle>
          <ActivitiesGrid>
            {indoor.map((activity, index) => (
              <ActivityCard
                key={`indoor-${index}`}
                bgColor={activity.bgColor}
                borderColor={activity.borderColor}
              >
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityName>{activity.name}</ActivityName>
                {activity.tip && <ActivityTip>{activity.tip}</ActivityTip>}
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </CategorySection>
      )}

      {hasWarnings && (
        <CategorySection>
          <CategoryTitle>⚠️ Avoid</CategoryTitle>
          <ActivitiesGrid>
            {avoid.map((activity, index) => (
              <ActivityCard
                key={`avoid-${index}`}
                bgColor={activity.bgColor}
                borderColor={activity.borderColor}
              >
                <ActivityIcon>{activity.icon}</ActivityIcon>
                <ActivityName>{activity.name}</ActivityName>
                {activity.tip && <ActivityTip>{activity.tip}</ActivityTip>}
              </ActivityCard>
            ))}
          </ActivitiesGrid>
        </CategorySection>
      )}
    </Container>
  );
};

export default ActivitySuggestions;


