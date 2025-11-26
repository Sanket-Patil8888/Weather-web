import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "agriweather:crops";

const defaultTemplates = [
  { name: "Tomato", daysToHarvest: 75 },
  { name: "Spinach", daysToHarvest: 45 },
  { name: "Rice", daysToHarvest: 120 },
  { name: "Chili Pepper", daysToHarvest: 95 },
];

function useCropPlanner() {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCrops(JSON.parse(raw));
    } catch (err) {
      console.warn("Unable to restore crop planner data", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(crops));
    } catch (err) {
      console.warn("Unable to persist crop planner data", err);
    }
  }, [crops]);

  const addCrop = useCallback((data) => {
    setCrops((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: data.name?.trim() || "Unnamed crop",
        variety: data.variety?.trim() || "",
        plantedOn: data.plantedOn || new Date().toISOString().split("T")[0],
        daysToHarvest: Number(data.daysToHarvest) || 60,
        notes: data.notes?.trim() || "",
        completed: false,
      },
    ]);
  }, []);

  const toggleCompleted = useCallback((id) => {
    setCrops((prev) => prev.map((crop) => (crop.id === id ? { ...crop, completed: !crop.completed } : crop)));
  }, []);

  const removeCrop = useCallback((id) => {
    setCrops((prev) => prev.filter((crop) => crop.id !== id));
  }, []);

  const templates = useMemo(() => defaultTemplates, []);

  return {
    crops,
    addCrop,
    toggleCompleted,
    removeCrop,
    templates,
  };
}

export default useCropPlanner;

