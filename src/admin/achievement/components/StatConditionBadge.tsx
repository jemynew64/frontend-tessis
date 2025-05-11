import {  Equal, ArrowUp, ArrowDown } from "lucide-react";

type StatConditionProps = {
  value: "gte" | "lte" | "eq" | "gt" | "lt";
};

export const StatConditionBadge = ({ value }: StatConditionProps) => {
  const map: Record<StatConditionProps["value"], { label: string; icon: JSX.Element; color: string }> = {
    gte: { label: "Mayor o igual que", icon: <ArrowUp className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800" },
    gt:  { label: "Mayor que",         icon: <ArrowUp className="w-4 h-4" />, color: "bg-orange-100 text-orange-800" },
    lte: { label: "Menor o igual que", icon: <ArrowDown className="w-4 h-4" />, color: "bg-green-100 text-green-800" },
    lt:  { label: "Menor que",         icon: <ArrowDown className="w-4 h-4" />, color: "bg-blue-100 text-blue-800" },
    eq:  { label: "Igual a",           icon: <Equal className="w-4 h-4" />, color: "bg-gray-200 text-gray-700" },
  };

  const { label, icon, color } = map[value];

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${color}`}>
      {icon}
      {label}
    </div>
  );
};
