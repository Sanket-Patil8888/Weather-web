import React, { useMemo } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(14, 20, 35, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  gap: 12px;
  color: #f5f7fb;
`;

const Badge = styled.span`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${(props) => props.bg || "rgba(255,255,255,0.1)"};
  color: ${(props) => props.color || "#f5f7fb"};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const Content = styled.div`
  flex: 1;
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

const NotificationCenter = ({ weather, hourly, daily, airQuality, crops = [] }) => {
  const notifications = useMemo(() => {
    if (!weather) return [];
    return [
      ...buildHealthAlerts(weather, airQuality),
      ...buildWeatherAlerts(hourly, daily, weather),
      ...buildCropAlerts(crops, daily),
    ].slice(0, 4);
  }, [weather, hourly, daily, airQuality, crops]);

  if (!notifications.length) return null;

  return (
    <Section>
      <div>
        <strong>Smart notifications</strong>
        <p style={{ margin: "4px 0 0", color: "rgba(248,251,255,0.75)", fontSize: "0.9rem" }}>
          Personalized safety, comfort, and crop care alerts based on your data.
        </p>
      </div>
      <List>
        {notifications.map((note) => (
          <Item key={note.id}>
            <Badge bg={note.bg} color={note.color}>
              {note.kind}
            </Badge>
            <Content>
              <Title>{note.title}</Title>
              <p style={{ margin: 0 }}>{note.message}</p>
              {note.meta ? <Meta>{note.meta}</Meta> : null}
            </Content>
          </Item>
        ))}
      </List>
    </Section>
  );
};

function buildHealthAlerts(weather, airQuality) {
  const alerts = [];
  const temp = weather.main?.temp ?? 0;
  const condition = (weather.weather?.[0]?.main || "").toLowerCase();
  const wind = weather.wind?.speed ?? 0;

  if (temp >= 32) {
    alerts.push({
      id: "health-heat",
      kind: "HEALTH",
      title: "Heat stress risk",
      message: "Drink water frequently, avoid midday outdoor work, and schedule rest breaks.",
      meta: `Feels like ${Math.round(temp)}°C with ${Math.round(wind)} m/s wind.`,
      bg: "rgba(255, 120, 120, 0.18)",
      color: "#ffd1d1",
    });
  }

  if (temp <= 8) {
    alerts.push({
      id: "health-cold",
      kind: "HEALTH",
      title: "Cold exposure warning",
      message: "Layer up and limit early-morning outdoor chores to prevent frost stress.",
      meta: `Reported at ${Math.round(temp)}°C.`,
      bg: "rgba(120, 180, 255, 0.18)",
      color: "#d1e2ff",
    });
  }

  if (condition.includes("rain") || condition.includes("storm")) {
    alerts.push({
      id: "health-rain",
      kind: "SAFETY",
      title: "Wet conditions",
      message: "Expect slippery surfaces; move equipment under cover and delay spraying.",
      meta: "Rain showing in the current band.",
      bg: "rgba(120, 200, 255, 0.18)",
      color: "#d0edff",
    });
  }

  if (airQuality?.main?.aqi >= 4) {
    alerts.push({
      id: "health-aqi",
      kind: "AIR",
      title: "Poor air quality",
      message: "Limit strenuous outdoor activity; use masks if sensitive to pollution.",
      meta: `AQI level ${airQuality.main.aqi}`,
      bg: "rgba(255, 200, 120, 0.18)",
      color: "#ffe2b8",
    });
  }

  if (wind >= 12) {
    alerts.push({
      id: "health-wind",
      kind: "SAFETY",
      title: "Gusty winds",
      message: "Secure loose materials and reschedule greenhouse ventilation checks.",
      meta: `${Math.round(wind)} m/s gusts reported.`,
      bg: "rgba(180, 160, 255, 0.18)",
      color: "#ece1ff",
    });
  }

  return alerts;
}

function buildWeatherAlerts(hourly = [], daily = [], weather) {
  const alerts = [];
  const upcomingRain = hourly.slice(0, 6).some((h) => (h.pop || 0) > 0.5);
  if (upcomingRain) {
    alerts.push({
      id: "weather-rain",
      kind: "WEATHER",
      title: "Rain expected soon",
      message: "Delay irrigation or fertilizer application; check drainage near fields.",
      meta: "Rain probability exceeds 50% within 6 hours.",
      bg: "rgba(102, 126, 234, 0.18)",
      color: "#d6defc",
    });
  }

  const frost = daily.slice(0, 2).some((day) => day.temp?.min <= 2);
  if (frost) {
    alerts.push({
      id: "weather-frost",
      kind: "WEATHER",
      title: "Frost risk",
      message: "Protect sensitive seedlings with cover cloths or move pots indoors.",
      meta: "Forecast shows overnight lows near freezing.",
      bg: "rgba(148, 210, 255, 0.18)",
      color: "#dcf0ff",
    });
  }

  if ((weather.main?.humidity || 0) >= 80 && (weather.main?.temp || 0) >= 26) {
    alerts.push({
      id: "weather-fungal",
      kind: "FARM",
      title: "High humidity & warmth",
      message: "Increase scouting for fungal diseases; ventilate polyhouses mid-day.",
      meta: "Sticky air raises powdery mildew risk.",
      bg: "rgba(120, 255, 215, 0.18)",
      color: "#d4fff0",
    });
  }

  return alerts;
}

function buildCropAlerts(crops = [], daily = []) {
  if (!crops.length) return [];
  const alerts = [];
  const nextDryDay = daily.find((day) => (day.pop || 0) < 0.2);
  const dryLabel = nextDryDay
    ? new Date(nextDryDay.dt * 1000).toLocaleDateString(undefined, { weekday: "short" })
    : null;

  crops.forEach((crop) => {
    const daysRemaining = Math.max((crop.daysToHarvest || 0) - getDaysSince(crop.plantedOn), 0);
    if (!crop.completed && daysRemaining <= 7) {
      alerts.push({
        id: `crop-harvest-${crop.id}`,
        kind: "CROP",
        title: `${crop.name} harvest window`,
        message: `Expect readiness within ${daysRemaining || "few"} days. Prep crates and cold storage.`,
        meta: dryLabel ? `Plan harvest on ${dryLabel} if conditions stay dry.` : undefined,
        bg: "rgba(255, 230, 120, 0.18)",
        color: "#fff1b3",
      });
    }
  });

  return alerts.slice(0, 2);
}

function getDaysSince(dateStr) {
  const planted = new Date(dateStr);
  const diff = Date.now() - planted.getTime();
  return Math.max(Math.floor(diff / 86_400_000), 0);
}

export default NotificationCenter;

