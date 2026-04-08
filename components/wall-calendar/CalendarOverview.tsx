import { Holiday } from "../../lib/types";
import { rangeLabel } from "../../lib/utils";

type CalendarOverviewProps = {
  selectedRangeStart: string | null;
  selectedRangeEnd: string | null;
  selectedDaysCount: number | null;
  activeRangeHasNote: boolean;
  holidayEntries: Array<{ iso: string; holiday: Holiday }>;
  accentColor: string;
  accentSoftColor: string;
};

export function CalendarOverview({
  selectedRangeStart,
  selectedRangeEnd,
  selectedDaysCount,
  activeRangeHasNote,
  holidayEntries,
  accentColor,
  accentSoftColor
}: CalendarOverviewProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
        <div
          className="rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.56))] px-4 py-3.5"
          style={{ borderColor: `${accentColor}20` }}
        >
          <span className="mb-1.25 block text-[0.74rem] uppercase tracking-widest" style={{ color: accentColor }}>
            Selected Range
          </span>
          <strong>{rangeLabel(selectedRangeStart, selectedRangeEnd)}</strong>
          <div className="mt-2 text-[0.75rem] text-[#778391]">
            {selectedRangeStart && selectedRangeEnd
              ? activeRangeHasNote
                ? "Note attached to this range."
                : "No note attached to this range."
              : "Select a full range to attach a note."}
          </div>
        </div>
        <div
          className="rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.56))] px-4 py-3.5"
          style={{ borderColor: `${accentColor}20` }}
        >
          <span className="mb-1.25 block text-[0.74rem] uppercase tracking-widest" style={{ color: accentColor }}>
            Duration
          </span>
          <strong>{selectedDaysCount ? `${selectedDaysCount} days` : "No days selected"}</strong>
        </div>
      </div>

      <div
        className="rounded-2xl border bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.56))] px-4 py-3.5"
        style={{ borderColor: `${accentColor}20` }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[0.74rem] uppercase tracking-widest" style={{ color: accentColor }}>
            Holiday
          </span>
          <span className="text-[0.76rem] text-[#778391]">
            {holidayEntries.length ? `${holidayEntries.length} this month` : "No markers this month"}
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {holidayEntries.length ? (
            holidayEntries.map(({ iso, holiday }) => (
              <span
                key={iso}
                className="rounded-full border px-3 py-1 text-[0.78rem]"
                style={{
                  borderColor: `${accentColor}33`,
                  backgroundColor: accentSoftColor,
                  color: accentColor
                }}
              >
                {new Date(iso).getDate()} {holiday.name}
              </span>
            ))
          ) : (
            <span className="text-[0.82rem] text-[#778391]">
              This month does not have any holidays.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
