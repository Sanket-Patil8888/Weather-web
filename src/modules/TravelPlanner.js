import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";

const TravelCard = styled.div`
  margin-top: ${(props) => (props.$standalone ? "0" : "20px")};
  padding: 24px;
  border-radius: 22px;
  background: rgba(6, 14, 24, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 30px rgba(8, 15, 30, 0.45);
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeInUp 0.6s ease-out 0.15s both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(5, 10, 20, 0.55);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 18px;
    gap: 14px;
  }
`;

const TravelHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TravelTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & strong {
    font-size: 1.2rem;
    font-weight: 600;
    color: #ffffff;
    letter-spacing: 0.3px;
  }

  & span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const TravelStatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border: 1px solid currentColor;
  color: ${(props) =>
    props.status === "great"
      ? "#9ff9c0"
      : props.status === "caution"
      ? "#ffe29f"
      : "#ffc2c2"};
  background: ${(props) =>
    props.status === "great"
      ? "rgba(159, 249, 192, 0.12)"
      : props.status === "caution"
      ? "rgba(255, 226, 159, 0.12)"
      : "rgba(255, 194, 194, 0.12)"};
`;

const TravelInputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);

  & label {
    font-weight: 600;
    letter-spacing: 0.4px;
  }

  & input {
    border-radius: 14px;
    padding: 10px 14px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
    font-size: 0.95rem;
    transition: border 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      border-color: rgba(255, 255, 255, 0.35);
      outline: none;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.3);
    }
  }
`;

const TravelStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

const TravelStat = styled.div`
  border-radius: 16px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);

  & strong {
    font-size: 1.1rem;
    color: #ffffff;
  }
`;

const TravelMessage = styled.div`
  background: rgba(26, 115, 232, 0.12);
  border-radius: 16px;
  border: 1px solid rgba(26, 115, 232, 0.3);
  padding: 14px 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #d8e6ff;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const PlanItem = styled.div`
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlanTitle = styled.h4`
  font-size: 0.85rem;
  margin: 0;
  color: #ffffff;
`;

const PlanDescription = styled.p`
  font-size: 0.75rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
`;

const TipList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TipItem = styled.li`
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
`;

const TravelPlaceholder = styled.div`
  border-radius: 16px;
  padding: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: center;
`;

const TravelPlanner = ({
  weather,
  daily = [],
  title = "Travel weather planner",
  subtitle = "Pick a date in the next week to see ideal travel windows.",
  standalone = false,
}) => {
  const [travelDate, setTravelDate] = useState("");

  const travelLimits = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1);

    const maxForecastWindow = Math.min(daily.length || 7, 7);
    const horizonEnd = new Date(today);
    horizonEnd.setDate(today.getDate() + maxForecastWindow);

    return {
      min: minDate.toISOString().split("T")[0],
      horizonEnd: horizonEnd.toISOString().split("T")[0],
    };
  }, [daily.length]);

  useEffect(() => {
    if (!travelDate && travelLimits.min) {
      setTravelDate(travelLimits.min);
    }
  }, [travelLimits.min, travelDate]);

  const travelForecast = useMemo(() => {
    if (!travelDate || !Array.isArray(daily) || !daily.length) return null;

    const timezoneOffset = weather?.timezone || 0;
    const normalizeDate = (dt) =>
      new Date((dt + timezoneOffset) * 1000).toISOString().split("T")[0];

    let match = daily.find((entry) => normalizeDate(entry.dt) === travelDate);
    let isFallback = false;

    if (!match) {
      match = daily[daily.length - 1];
      isFallback = true;
    }

    if (!match) return null;

    const maxTemp = Math.round(match.temp?.max ?? 0);
    const minTemp = Math.round(match.temp?.min ?? 0);
    const rainChance = Math.round((match.pop ?? 0) * 100);
    const description = match.weather?.[0]?.description ?? "n/a";
    const condition = match.weather?.[0]?.main?.toLowerCase() ?? "";

    let status = "great";
    const reasons = [];
    let message = "Perfect conditions for a smooth travel day.";

    if (maxTemp >= 32 || minTemp <= 5 || rainChance >= 40) {
      status = "caution";
      if (maxTemp >= 32) reasons.push("Expect warm afternoons.");
      if (minTemp <= 5) reasons.push("Pack layers for cool mornings.");
      if (rainChance >= 40) reasons.push("Keep rain-ready gear handy.");
      message = "Mixed conditions—plan with flexibility.";
    }
    if (rainChance >= 70 || condition.includes("storm") || condition.includes("snow")) {
      status = "not-ideal";
      reasons.push("High chance of heavy rain or storms.");
      message = "Weather not ideal—consider backup plans.";
    }

    const schedule =
      status === "great"
        ? [
            { title: "Morning", desc: "Great for outdoor sightseeing and photo walks." },
            { title: "Afternoon", desc: "Plan headline attractions or day trips." },
            { title: "Evening", desc: "Perfect for rooftop dining or sunset cruises." },
          ]
        : status === "caution"
        ? [
            { title: "Morning", desc: "Mild start—pack a light layer." },
            { title: "Afternoon", desc: "Monitor heat or showers; keep hydration handy." },
            { title: "Evening", desc: "Carry a jacket or umbrella depending on outlook." },
          ]
        : [
            { title: "Morning", desc: "Prioritize indoor plans and keep notifications on." },
            { title: "Afternoon", desc: "Rebook outdoor tours, focus on cozy cafes or museums." },
            { title: "Evening", desc: "Stay flexible—weather may stay unsettled." },
          ];

    const tips = [];
    if (maxTemp >= 32) tips.push("Light, breathable clothing and SPF are essential.");
    if (minTemp <= 5) tips.push("Layer up—include gloves or a beanie for comfort.");
    if (rainChance >= 40) tips.push("Compact umbrella or rain jacket recommended.");
    if (condition.includes("storm")) tips.push("Monitor local alerts for severe weather.");
    if (!tips.length) tips.push("Pack for comfort and enjoy favorable travel weather!");

    const formatDisplayDate = (dateStr) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    };

    return {
      maxTemp,
      minTemp,
      rainChance,
      description,
      status,
      message,
      reasons,
      tips,
      schedule,
      targetDateLabel: formatDisplayDate(travelDate),
      sourceDateLabel: formatDisplayDate(normalizeDate(match.dt)),
      isFallback,
      fallbackNote: isFallback
        ? `Showing the closest forecast available (${formatDisplayDate(
            travelLimits.horizonEnd,
          )} horizon).`
        : "",
    };
  }, [travelDate, daily, weather, travelLimits.horizonEnd]);

  return (
    <TravelCard $standalone={standalone}>
      <TravelHeader>
        <TravelTitle>
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </TravelTitle>
        {travelForecast ? (
          <TravelStatusBadge status={travelForecast.status}>
            {travelForecast.status === "great"
              ? "Great"
              : travelForecast.status === "caution"
              ? "Mixed"
              : "Not ideal"}
          </TravelStatusBadge>
        ) : null}
      </TravelHeader>
      <TravelInputRow>
        <label htmlFor="travel-date">Select a date</label>
        <input
          id="travel-date"
          type="date"
          min={travelLimits.min}
          max={travelLimits.horizonEnd}
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
        />
      </TravelInputRow>
      {travelForecast ? (
        <>
          <TravelStats>
            <TravelStat>
              <span>Temperature</span>
              <strong>
                {travelForecast.minTemp}° / {travelForecast.maxTemp}°C
              </strong>
            </TravelStat>
            <TravelStat>
              <span>Rain chance</span>
              <strong>{travelForecast.rainChance}%</strong>
            </TravelStat>
            <TravelStat>
              <span>Conditions</span>
              <strong style={{ textTransform: "capitalize" }}>
                {travelForecast.description}
              </strong>
            </TravelStat>
          </TravelStats>
          <TravelMessage>
            {travelForecast.message} {travelForecast.reasons.join(" ")}
            <br />
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)" }}>
              Target date: {travelForecast.targetDateLabel}
              {travelForecast.isFallback ? ` · Using ${travelForecast.sourceDateLabel}` : ""}
            </span>
            {travelForecast.fallbackNote ? (
              <div style={{ marginTop: 6, color: "#ffdc7b", fontSize: "0.78rem" }}>
                {travelForecast.fallbackNote}
              </div>
            ) : null}
          </TravelMessage>
          <PlanGrid>
            {travelForecast.schedule.map((block) => (
              <PlanItem key={block.title}>
                <PlanTitle>{block.title}</PlanTitle>
                <PlanDescription>{block.desc}</PlanDescription>
              </PlanItem>
            ))}
          </PlanGrid>
          <PlanTitle style={{ marginTop: "6px" }}>Travel prep</PlanTitle>
          <TipList>
            {travelForecast.tips.map((tip) => (
              <TipItem key={tip}>{tip}</TipItem>
            ))}
          </TipList>
        </>
      ) : (
        <TravelPlaceholder>
          Forecasts available from {travelLimits.min} through {travelLimits.horizonEnd}. Pick a
          date in this range for personalized travel guidance.
        </TravelPlaceholder>
      )}
    </TravelCard>
  );
};

export default TravelPlanner;

