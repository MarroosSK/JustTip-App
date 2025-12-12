import React, { createContext, ReactNode, useContext, useState } from "react";

type FilterType = "all" | "unlocked" | "locked";

interface BadgeContextType {
  filter: FilterType;
  selectedBadgeId: string | null;
  setFilter: (val: FilterType) => void;
  setSelectedBadgeId: (id: string | null) => void;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

export const BadgeProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilterState] = useState<FilterType>("all");
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);

  const setFilter = (val: FilterType) => {
    setFilterState(val);
    setSelectedBadgeId(null);
  };

  return (
    <BadgeContext.Provider
      value={{ filter, selectedBadgeId, setFilter, setSelectedBadgeId }}
    >
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadgeContext = () => {
  const context = useContext(BadgeContext);
  if (!context) {
    throw new Error("useBadgeContext must be used within a BadgeProvider");
  }
  return context;
};
