// src/lib/colors.ts
export type ColorName =
  | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald"
  | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple"
  | "fuchsia" | "pink" | "rose"
  | "slate" | "gray" | "zinc" | "neutral" | "stone";

export const colorMap: Record<ColorName, {
  from: string;
  to: string;
  border: string;
  ring: string;
  bg: string;
  text: string;
  contrastText: string;
}> = {
  red:     { from: "from-red-300",  to: "to-red-500",   border: "border-red-700",    ring: "focus:ring-red-400",    bg: "bg-red-500",    text: "text-red-100",    contrastText: "text-white"     },
  orange:  { from: "from-orange-300",to: "to-orange-500",border: "border-orange-700", ring: "focus:ring-orange-400", bg: "bg-orange-500", text: "text-orange-100", contrastText: "text-white"     },
  amber:   { from: "from-amber-300", to: "to-amber-500", border: "border-amber-700",  ring: "focus:ring-amber-400",  bg: "bg-amber-500",  text: "text-amber-100",  contrastText: "text-black" },
  yellow:  { from: "from-yellow-300",to: "to-yellow-500",border: "border-yellow-700", ring: "focus:ring-yellow-400", bg: "bg-yellow-500", text: "text-yellow-100", contrastText: "text-black" },
  lime:    { from: "from-lime-300",  to: "to-lime-500",  border: "border-lime-700",   ring: "focus:ring-lime-400",   bg: "bg-lime-500",   text: "text-lime-100",   contrastText: "text-black" },
  green:   { from: "from-green-300", to: "to-green-500", border: "border-green-700",  ring: "focus:ring-green-400",  bg: "bg-green-500",  text: "text-green-100",  contrastText: "text-white"     },
  emerald: { from: "from-emerald-300",to: "to-emerald-500",border: "border-emerald-700",ring: "focus:ring-emerald-400",bg: "bg-emerald-500",text: "text-emerald-100",contrastText: "text-white"     },
  teal:    { from: "from-teal-300",  to: "to-teal-500",  border: "border-teal-700",   ring: "focus:ring-teal-400",   bg: "bg-teal-500",   text: "text-teal-100",   contrastText: "text-white"     },
  cyan:    { from: "from-cyan-300",  to: "to-cyan-500",  border: "border-cyan-700",   ring: "focus:ring-cyan-400",   bg: "bg-cyan-500",   text: "text-cyan-100",   contrastText: "text-black" },
  sky:     { from: "from-sky-300",   to: "to-sky-500",   border: "border-sky-700",    ring: "focus:ring-sky-400",    bg: "bg-sky-500",    text: "text-sky-100",    contrastText: "text-black" },
  blue:    { from: "from-blue-300",  to: "to-blue-500",  border: "border-blue-700",   ring: "focus:ring-blue-400",   bg: "bg-blue-500",   text: "text-blue-100",   contrastText: "text-white"     },
  indigo:  { from: "from-indigo-300",to: "to-indigo-500",border: "border-indigo-700", ring: "focus:ring-indigo-400", bg: "bg-indigo-500", text: "text-indigo-100", contrastText: "text-white"     },
  violet:  { from: "from-violet-300",to: "to-violet-500",border: "border-violet-700", ring: "focus:ring-violet-400", bg: "bg-violet-500", text: "text-violet-100", contrastText: "text-white"     },
  purple:  { from: "from-purple-300",to: "to-purple-500",border: "border-purple-700", ring: "focus:ring-purple-400", bg: "bg-purple-500", text: "text-purple-100", contrastText: "text-white"     },
  fuchsia: { from: "from-fuchsia-300",to: "to-fuchsia-500",border: "border-fuchsia-700",ring: "focus:ring-fuchsia-400",bg: "bg-fuchsia-500",text: "text-fuchsia-100",contrastText: "text-white"     },
  pink:    { from: "from-pink-300",  to: "to-pink-500",  border: "border-pink-700",    ring: "focus:ring-pink-400",    bg: "bg-pink-500",    text: "text-pink-100",    contrastText: "text-white"     },
  rose:    { from: "from-rose-300",  to: "to-rose-500",  border: "border-rose-700",    ring: "focus:ring-rose-400",    bg: "bg-rose-500",    text: "text-rose-100",    contrastText: "text-white"     },
  slate:   { from: "from-slate-300", to: "to-slate-500", border: "border-slate-700",   ring: "focus:ring-slate-400",   bg: "bg-slate-500",   text: "text-slate-100",   contrastText: "text-white"     },
  gray:    { from: "from-gray-300",  to: "to-gray-500",  border: "border-gray-700",    ring: "focus:ring-gray-400",    bg: "bg-gray-500",    text: "text-gray-100",    contrastText: "text-white"     },
  zinc:    { from: "from-zinc-300",  to: "to-zinc-500",  border: "border-zinc-700",    ring: "focus:ring-zinc-400",    bg: "bg-zinc-500",    text: "text-zinc-100",    contrastText: "text-white"     },
  neutral: { from: "from-neutral-300",to: "to-neutral-500",border: "border-neutral-700",ring: "focus:ring-neutral-400",bg: "bg-neutral-500",text: "text-neutral-100",contrastText: "text-white"},
  stone:   { from: "from-stone-300", to: "to-stone-500",  border: "border-stone-700",   ring: "focus:ring-stone-400",   bg: "bg-stone-500",   text: "text-stone-100",   contrastText: "text-white"     },
};
