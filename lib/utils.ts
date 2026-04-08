import { CalendarEntry, Holiday } from "./types";

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTH_THEMES = [
  {
    imageUrl: "/images/months/january.jpg",
    accentColor: "#71879b",
    accentSoftColor: "#dbe3ea",
    headlineTop: "Shape Quiet",
    headlineBottom: "Bold Plans"
  },
  {
    imageUrl: "/images/months/february.jpg",
    accentColor: "#7d846f",
    accentSoftColor: "#e3e5dc",
    headlineTop: "Move Slowly",
    headlineBottom: "Stay Clear"
  },
  {
    imageUrl: "/images/months/march.jpg",
    accentColor: "#8b9a6a",
    accentSoftColor: "#e3e8d7",
    headlineTop: "Start Fresh",
    headlineBottom: "Stay Ready"
  },
  {
    imageUrl: "/images/months/april.jpg",
    accentColor: "#6f8d98",
    accentSoftColor: "#dce5e8",
    headlineTop: "Plan Ahead",
    headlineBottom: "Climb Higher"
  },
  {
    imageUrl: "/images/months/may.jpg",
    accentColor: "#6e9076",
    accentSoftColor: "#dce7de",
    headlineTop: "Keep Focus",
    headlineBottom: "In Motion"
  },
  {
    imageUrl: "/images/months/june.jpg",
    accentColor: "#5f8f92",
    accentSoftColor: "#d7e6e7",
    headlineTop: "Follow Light",
    headlineBottom: "Make Room"
  },
  {
    imageUrl: "/images/months/july.jpg",
    accentColor: "#9b7e62",
    accentSoftColor: "#eadfcf",
    headlineTop: "Hold Course",
    headlineBottom: "Through Heat"
  },
  {
    imageUrl: "/images/months/august.jpg",
    accentColor: "#5f8571",
    accentSoftColor: "#d8e2dc",
    headlineTop: "Build Rhythm",
    headlineBottom: "With Ease"
  },
  {
    imageUrl: "/images/months/september.jpg",
    accentColor: "#8f6e57",
    accentSoftColor: "#e8dcd3",
    headlineTop: "Return Sharp",
    headlineBottom: "Work Deep"
  },
  {
    imageUrl: "/images/months/october.jpg",
    accentColor: "#7c687f",
    accentSoftColor: "#e2dbe4",
    headlineTop: "Think Wide",
    headlineBottom: "Move Smart"
  },
  {
    imageUrl: "/images/months/november.jpg",
    accentColor: "#5f707c",
    accentSoftColor: "#d7dfe4",
    headlineTop: "Hold Steady",
    headlineBottom: "Finish Well"
  },
  {
    imageUrl: "/images/months/december.jpg",
    accentColor: "#657d95",
    accentSoftColor: "#dae3eb",
    headlineTop: "Close Strong",
    headlineBottom: "Begin Again"
  }
] as const;

export function getMonthTheme(monthIndex: number) {
  return MONTH_THEMES[monthIndex] ?? MONTH_THEMES[0];
}

export function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function displayLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(date);
}

export function shortDateLabel(iso: string | null) {
  if (!iso) return "Select a date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(iso));
}

export function rangeLabel(start: string | null, end: string | null) {
  if (!start) return "Select a start date";
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  if (!end) return formatter.format(new Date(start));
  return `${formatter.format(new Date(start))} - ${formatter.format(new Date(end))}`;
}

export function getRangeKey(start: string | null, end: string | null) {
  if (!start || !end) return null;
  return `${start}__${end}`;
}

export function isoWithinRange(iso: string, start: string, end: string) {
  return iso >= start && iso <= end;
}

export function getDaysMatrix(monthDate: Date) {
  const first = startOfMonth(monthDate);
  const firstWeekday = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - firstWeekday);

  return Array.from({ length: 42 }, (_, index): CalendarEntry => {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);

    return {
      iso: toIsoDate(current),
      inMonth: current.getMonth() === monthDate.getMonth(),
      day: current.getDate()
    };
  });
}

export function getIndianHolidayMap(year: number) {
  const holidays = new Map<string, Holiday>([
    [`${year}-01-26`, { name: "Republic Day", kind: "gazetted" }],
    [`${year}-08-15`, { name: "Independence Day", kind: "gazetted" }],
    [`${year}-10-02`, { name: "Gandhi Jayanti", kind: "gazetted" }],
    [`${year}-12-25`, { name: "Christmas", kind: "gazetted" }]
  ]);

  if (year === 2026) {
    const holidayEntries: Array<[string, Holiday]> = [
      ["2026-02-15", { name: "Maha Shivaratri", kind: "restricted" }],
      ["2026-03-04", { name: "Holi", kind: "gazetted" }],
      ["2026-03-19", { name: "Ugadi / Gudi Padwa", kind: "restricted" }],
      ["2026-03-21", { name: "Ramzan Id", kind: "tentative" }],
      ["2026-03-26", { name: "Rama Navami", kind: "gazetted" }],
      ["2026-03-31", { name: "Mahavir Jayanti", kind: "gazetted" }],
      ["2026-04-03", { name: "Good Friday", kind: "gazetted" }],
      ["2026-04-14", { name: "Vaisakhi / Ambedkar Jayanti", kind: "restricted" }],
      ["2026-05-01", { name: "Buddha Purnima", kind: "gazetted" }],
      ["2026-05-27", { name: "Bakrid", kind: "tentative" }],
      ["2026-06-26", { name: "Muharram", kind: "tentative" }],
      ["2026-08-26", { name: "Milad-un-Nabi / Onam", kind: "tentative" }],
      ["2026-09-04", { name: "Janmashtami", kind: "gazetted" }],
      ["2026-10-20", { name: "Dussehra", kind: "gazetted" }],
      ["2026-11-08", { name: "Diwali", kind: "gazetted" }],
      ["2026-11-24", { name: "Guru Nanak Jayanti", kind: "gazetted" }]
    ];

    holidayEntries.forEach(([iso, holiday]) => {
      holidays.set(iso, holiday);
    });
  }

  return holidays;
}

export function nightsBetween(start: string | null, end: string | null) {
  if (!start || !end) return 0;
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return Math.round((endTime - startTime) / 86400000);
}
