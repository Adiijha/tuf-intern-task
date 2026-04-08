export type CalendarEntry = {
  iso: string;
  inMonth: boolean;
  day: number;
};

export type Holiday = {
  name: string;
  kind?: "gazetted" | "restricted" | "tentative";
};

export type StoredMonthData = {
  monthNotes?: string;
  rangeNotes?: string;
  rangeNotesByKey?: Record<string, string>;
  dayNotes?: Record<string, string>;
};
