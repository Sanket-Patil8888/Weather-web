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
  gap: 10px;
  margin-bottom: 14px;
`;

const Icon = styled.span`
  font-size: 1.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #FFFFFF;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
  
  @media (max-width: 360px) {
    gap: 6px;
  }
`;

const SuggestionItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border-left: 3px solid ${(props) => props.color || "rgba(255, 255, 255, 0.3)"};
  font-size: 0.875rem;
  line-height: 1.6;
  color: #FFFFFF;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.4s ease-out both;
  
  &:nth-child(1) { animation-delay: 0.25s; }
  &:nth-child(2) { animation-delay: 0.3s; }
  &:nth-child(3) { animation-delay: 0.35s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.45s; }
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(6px) translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  }
  
  @media (max-width: 480px) {
    padding: 10px 14px;
    gap: 10px;
    font-size: 0.8rem;
    border-radius: 14px;
  }
  
  @media (max-width: 360px) {
    padding: 8px 12px;
    gap: 8px;
    font-size: 0.75rem;
    border-radius: 12px;
  }
  
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const Bullet = styled.span`
  color: ${(props) => props.color || "rgba(255, 255, 255, 0.6)"};
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
`;

const CategoryLabel = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #BFD7EA;
  margin-top: 16px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const generateClothingSuggestions = (weather) => {
  if (!weather) return [];

  const temp = weather.main?.temp ?? 0;
  const humidity = weather.main?.humidity ?? 0;
  const windSpeed = weather.wind?.speed ?? 0;
  const condition = (weather.weather?.[0]?.main || "").toLowerCase();
  const description = (weather.weather?.[0]?.description || "").toLowerCase();
  const isRaining = condition.includes("rain") || condition.includes("drizzle");
  const isSnowing = condition.includes("snow");
  const isClear = condition.includes("clear");
  const isCloudy = condition.includes("cloud");

  const suggestions = [];

  // Temperature-based suggestions
  if (temp <= 0) {
    suggestions.push({
      text: "Wear a heavy winter coat, thermal layers, gloves, and a warm hat",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    suggestions.push({
      text: "Layer with thermal underwear and wool socks",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    if (windSpeed > 5) {
      suggestions.push({
        text: "Wind-resistant outer layer recommended due to strong winds",
        category: "Wind Protection",
        color: "#7B68EE",
        priority: 2,
      });
    }
  } else if (temp > 0 && temp <= 10) {
    suggestions.push({
      text: "Wear a warm jacket or heavy coat",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    suggestions.push({
      text: "Layer with a sweater or fleece underneath",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    if (humidity > 70) {
      suggestions.push({
        text: "Consider moisture-wicking base layers due to high humidity",
        category: "Comfort",
        color: "#50C878",
        priority: 2,
      });
    }
  } else if (temp > 10 && temp <= 18) {
    suggestions.push({
      text: "Light jacket or sweater recommended",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    if (humidity > 75) {
      suggestions.push({
        text: "Avoid heavy cotton — choose breathable fabrics",
        category: "Comfort",
        color: "#50C878",
        priority: 2,
      });
    }
  } else if (temp > 18 && temp <= 25) {
    suggestions.push({
      text: "Light layers — t-shirt or light long-sleeve shirt",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    if (humidity > 70) {
      suggestions.push({
        text: "Wear breathable, moisture-wicking fabrics (avoid heavy cotton)",
        category: "Comfort",
        color: "#50C878",
        priority: 2,
      });
    }
    if (isClear) {
      suggestions.push({
        text: "Carry sunglasses and consider a light hat for sun protection",
        category: "Sun Protection",
        color: "#FFB347",
        priority: 2,
      });
    }
  } else if (temp > 25 && temp <= 30) {
    suggestions.push({
      text: "Light, loose-fitting clothing — shorts and t-shirt",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    if (humidity > 65) {
      suggestions.push({
        text: "Hot and humid — wear lightweight, breathable fabrics (linen, cotton blends)",
        category: "Comfort",
        color: "#50C878",
        priority: 1,
      });
      suggestions.push({
        text: "Avoid synthetic materials that trap moisture",
        category: "Comfort",
        color: "#50C878",
        priority: 2,
      });
    }
    if (isClear) {
      suggestions.push({
        text: "Essential: Wear a hat, sunglasses, and apply sunscreen",
        category: "Sun Protection",
        color: "#FFB347",
        priority: 1,
      });
    }
  } else if (temp > 30) {
    suggestions.push({
      text: "Very hot — wear minimal, light-colored clothing",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    suggestions.push({
      text: "Shorts, tank top, or light t-shirt recommended",
      category: "Essential",
      color: "#4A90E2",
      priority: 1,
    });
    if (humidity > 60) {
      suggestions.push({
        text: "Extreme heat and humidity — prioritize breathable, moisture-wicking fabrics",
        category: "Comfort",
        color: "#50C878",
        priority: 1,
      });
      suggestions.push({
        text: "Avoid dark colors and heavy fabrics",
        category: "Comfort",
        color: "#50C878",
        priority: 2,
      });
    }
    suggestions.push({
      text: "Must have: Wide-brimmed hat, sunglasses, and high SPF sunscreen",
      category: "Sun Protection",
      color: "#FFB347",
      priority: 1,
    });
  }

  // Weather condition-based suggestions
  if (isRaining) {
    suggestions.push({
      text: "Carry an umbrella or wear a waterproof jacket",
      category: "Rain Protection",
      color: "#5B9BD5",
      priority: 1,
    });
    suggestions.push({
      text: "Wear waterproof or water-resistant shoes",
      category: "Rain Protection",
      color: "#5B9BD5",
      priority: 2,
    });
  }

  if (isSnowing) {
    suggestions.push({
      text: "Wear waterproof boots and snow-resistant outerwear",
      category: "Snow Protection",
      color: "#B0C4DE",
      priority: 1,
    });
    suggestions.push({
      text: "Gloves and a warm hat are essential",
      category: "Snow Protection",
      color: "#B0C4DE",
      priority: 1,
    });
  }

  if (windSpeed > 10) {
    suggestions.push({
      text: "Windy conditions — wear a windbreaker or close-fitting layers",
      category: "Wind Protection",
      color: "#7B68EE",
      priority: 2,
    });
    if (temp < 15) {
      suggestions.push({
        text: "Strong winds increase chill — add an extra layer",
        category: "Wind Protection",
        color: "#7B68EE",
        priority: 1,
      });
    }
  }

  // Sort by priority (lower number = higher priority)
  suggestions.sort((a, b) => a.priority - b.priority);

  return suggestions;
};

const ClothingSuggestions = ({ weather }) => {
  const suggestions = generateClothingSuggestions(weather);

  if (!suggestions.length) {
    return null;
  }

  // Group suggestions by category
  const grouped = suggestions.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <Container>
      <Header>
        <Icon>👕</Icon>
        <Title>Smart Clothing Suggestions</Title>
      </Header>
      <SuggestionsList>
        {categories.map((category) => (
          <React.Fragment key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            {grouped[category].map((suggestion, index) => (
              <SuggestionItem key={`${category}-${index}`} color={suggestion.color}>
                <Bullet color={suggestion.color}>•</Bullet>
                <span>{suggestion.text}</span>
              </SuggestionItem>
            ))}
          </React.Fragment>
        ))}
      </SuggestionsList>
    </Container>
  );
};

export default ClothingSuggestions;

