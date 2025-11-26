import React, { useMemo, useState } from "react";
import styled from "styled-components";
import useCropPlanner from "../hooks/useCropPlanner";

const Section = styled.section`
  padding: 20px;
  border-radius: 24px;
  background: rgba(9, 14, 26, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: #f8fbff;
  font-size: 0.95rem;
  ::placeholder {
    color: rgba(248, 251, 255, 0.6);
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.08);
  color: #f8fbff;
  font-size: 0.95rem;
`;

const Button = styled.button`
  padding: 12px 16px;
  border-radius: 14px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #9be15d, #00e3ae);
  color: #082318;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
`;

const Card = styled.article`
  padding: 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #f5f7fb;
`;

const Stage = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: inherit;
  font-size: 0.85rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  padding: 18px;
  border-radius: 18px;
  border: 1px dashed rgba(255, 255, 255, 0.25);
  text-align: center;
  color: rgba(248, 251, 255, 0.75);
`;

const CropPlanner = ({ daily = [], timezone = 0, store }) => {
  const fallbackStore = useCropPlanner();
  const { crops, addCrop, templates, removeCrop, toggleCompleted } = store || fallbackStore;
  const [draft, setDraft] = useState({
    template: "",
    name: "",
    plantedOn: new Date().toISOString().split("T")[0],
    daysToHarvest: "",
    notes: "",
  });

  const rainOutlook = useMemo(() => {
    if (!daily.length) return [];
    return daily.slice(0, 3).map((day) => {
      const date = new Date((day.dt + timezone) * 1000);
      return {
        date: date.toLocaleDateString(undefined, { weekday: "short" }),
        rainChance: Math.round((day.pop || 0) * 100),
        temp: Math.round(day.temp?.day ?? 0),
      };
    });
  }, [daily, timezone]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.name && !draft.template) return;
    const template = templates.find((t) => t.name === draft.template);
    addCrop({
      name: draft.name || template?.name,
      variety: draft.variety,
      plantedOn: draft.plantedOn,
      daysToHarvest: draft.daysToHarvest || template?.daysToHarvest,
      notes: draft.notes,
    });
    setDraft((prev) => ({
      ...prev,
      name: "",
      variety: "",
      notes: "",
    }));
  };

  const renderedCrops = useMemo(
    () =>
      crops.map((crop) => ({
        ...crop,
        stage: getStage(crop.plantedOn, crop.daysToHarvest),
        daysElapsed: getDaysSince(crop.plantedOn),
        daysRemaining: Math.max((crop.daysToHarvest || 0) - getDaysSince(crop.plantedOn), 0),
      })),
    [crops],
  );

  return (
    <Section>
      <div>
        <strong>Crop tracker & planner</strong>
        <p style={{ margin: "4px 0 0", color: "rgba(248,251,255,0.75)", fontSize: "0.9rem" }}>
          Log planted crops, watch their stage, and align care with upcoming weather.
        </p>
      </div>

      <Form onSubmit={handleSubmit}>
        <Select
          value={draft.template}
          onChange={(e) =>
            setDraft((prev) => ({
              ...prev,
              template: e.target.value,
              name: e.target.value || prev.name,
            }))
          }
        >
          <option value="">Choose preset crop</option>
          {templates.map((template) => (
            <option key={template.name} value={template.name}>
              {template.name} · {template.daysToHarvest} days
            </option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder="Crop name"
          value={draft.name}
          onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Input
          type="text"
          placeholder="Variety / notes"
          value={draft.variety || ""}
          onChange={(e) => setDraft((prev) => ({ ...prev, variety: e.target.value }))}
        />
        <Input
          type="date"
          value={draft.plantedOn}
          onChange={(e) => setDraft((prev) => ({ ...prev, plantedOn: e.target.value }))}
        />
        <Input
          type="number"
          min="30"
          max="200"
          placeholder="Days to harvest"
          value={draft.daysToHarvest}
          onChange={(e) => setDraft((prev) => ({ ...prev, daysToHarvest: e.target.value }))}
        />
        <Button type="submit">Add crop</Button>
      </Form>

      {rainOutlook.length ? (
        <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(248,251,255,0.7)" }}>
          Next rain chances:{" "}
          {rainOutlook.map((slot) => `${slot.date} ${slot.rainChance}%`).join(" · ")} — plan watering accordingly.
        </p>
      ) : null}

      {renderedCrops.length ? (
        <CardGrid>
          {renderedCrops.map((crop) => (
            <Card key={crop.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{crop.name}</strong>
                <Stage>
                  {crop.stage.emoji} {crop.stage.label}
                </Stage>
              </div>
              <span style={{ fontSize: "0.9rem", color: "rgba(248,251,255,0.75)" }}>
                Planted {crop.daysElapsed} days ago · {crop.daysRemaining} days until harvest
              </span>
              {crop.notes ? <p style={{ margin: 0 }}>{crop.notes}</p> : null}
              <Actions>
                <ActionButton type="button" onClick={() => toggleCompleted(crop.id)}>
                  {crop.completed ? "Mark active" : "Mark harvested"}
                </ActionButton>
                <ActionButton type="button" onClick={() => removeCrop(crop.id)}>
                  Remove
                </ActionButton>
              </Actions>
            </Card>
          ))}
        </CardGrid>
      ) : (
        <EmptyState>
          No crops tracked yet. Log your current beds or pots to get tailored reminders.
        </EmptyState>
      )}
    </Section>
  );
};

function getDaysSince(dateStr) {
  const planted = new Date(dateStr);
  const diff = Date.now() - planted.getTime();
  return Math.max(Math.floor(diff / 86_400_000), 0);
}

function getStage(plantedOn, totalDays = 60) {
  const days = getDaysSince(plantedOn);
  const progress = days / totalDays;
  if (progress < 0.2) return { label: "Germination", emoji: "🌱" };
  if (progress < 0.5) return { label: "Vegetative", emoji: "🌿" };
  if (progress < 0.8) return { label: "Flowering", emoji: "🌼" };
  return { label: "Harvest window", emoji: "🥕" };
}

export default CropPlanner;

