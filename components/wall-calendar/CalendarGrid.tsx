import { CalendarEntry, Holiday } from "../../lib/types";
import { FilePenLine, Plus } from "lucide-react";
import { WEEKDAY_LABELS, isoWithinRange, joinClasses, shortDateLabel } from "../../lib/utils";

type CalendarGridProps = {
  days: CalendarEntry[];
  holidayMap: Map<string, Holiday>;
  dayNotes: Record<string, string>;
  rangeNotesByKey: Record<string, string>;
  startDate: string | null;
  endDate: string | null;
  accentColor: string;
  accentSoftColor: string;
  onDayClick: (iso: string) => void;
  onOpenDayNote: (iso: string) => void;
};

export function CalendarGrid({
  days,
  holidayMap,
  dayNotes,
  rangeNotesByKey,
  startDate,
  endDate,
  accentColor,
  accentSoftColor,
  onDayClick,
  onOpenDayNote
}: CalendarGridProps) {
  function isBetween(iso: string) {
    return Boolean(startDate && endDate && iso > startDate && iso < endDate);
  }

  function isEdge(iso: string) {
    return iso === startDate || iso === endDate;
  }

  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
      {WEEKDAY_LABELS.map((day, weekdayIndex) => (
        <span
          key={day}
          className={joinClasses(
            "pb-0.5 text-[0.54rem] uppercase tracking-[0.06em] font-medium sm:pb-1 sm:text-[0.68rem] sm:tracking-[0.12em]",
            weekdayIndex < 5 && "text-[#778391]"
          )}
          style={
            weekdayIndex === 5
              ? { color: accentColor }
              : weekdayIndex === 6
                ? { color: "#d97757" }
                : undefined
          }
        >
          {day}
        </span>
      ))}

      {days.map((day, index) => {
        const between = isBetween(day.iso);
        const edge = isEdge(day.iso);
        const inRange = between || edge;
        const isSingle = startDate === endDate && day.iso === startDate;
        const hasPinnedNote = Boolean(dayNotes[day.iso]?.trim());
        const hasRangeNote = Object.entries(rangeNotesByKey).some(([rangeKey, note]) => {
          if (!note.trim()) return false;
          const [rangeStart, rangeEnd] = rangeKey.split("__");
          return Boolean(rangeStart && rangeEnd && isoWithinRange(day.iso, rangeStart, rangeEnd));
        });
        const holiday = holidayMap.get(day.iso);
        const weekdayIndex = index % 7;
        const weekendTextClass =
          weekdayIndex === 5
            ? ""
            : weekdayIndex === 6
              ? "text-[#d97757]"
              : "text-[#13253a]";
        const outMonthWeekendTextClass =
          weekdayIndex === 5
            ? ""
            : weekdayIndex === 6
              ? "text-[rgba(217,119,87,0.45)]"
              : "text-[rgba(19,37,58,0.28)]";

        return (
          <div
            key={day.iso}
            role="button"
            tabIndex={0}
            aria-label={`Select ${new Date(day.iso).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric"
            })}${holiday ? `, ${holiday.name}` : ""}${hasPinnedNote ? ", has pinned note" : ""}${hasRangeNote ? ", has range note" : ""}`}
            title={[shortDateLabel(day.iso), holiday?.name, hasPinnedNote ? "Pinned note" : null, hasRangeNote ? "Range note" : null]
              .filter(Boolean)
              .join(" - ")}
            className={joinClasses(
              "relative min-h-[36px] cursor-pointer rounded-[8px] border border-transparent bg-white/60 transition hover:-translate-y-px sm:min-h-[48px] sm:rounded-xl",
              inRange ? "text-white" : day.inMonth ? weekendTextClass : outMonthWeekendTextClass,
              !day.inMonth && "bg-white/32",
              isSingle && "rounded-[10px] sm:rounded-xl"
            )}
            style={{
              borderColor: edge ? `${accentColor}55` : between ? `${accentColor}45` : undefined,
              backgroundColor: edge
                ? accentColor
                : between
                  ? accentColor
                  : undefined,
              boxShadow: edge
                ? `0 10px 18px ${accentColor}30`
                : between
                  ? "inset 0 1px 0 rgba(255,255,255,0.16)"
                  : undefined,
              color:
                !inRange && day.inMonth && weekdayIndex === 5
                  ? accentColor
                  : !inRange && !day.inMonth && weekdayIndex === 5
                    ? `${accentColor}75`
                    : undefined
            }}
            onClick={() => onDayClick(day.iso)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onDayClick(day.iso);
              }
            }}
          >
            <span className="absolute left-1.5 top-1.5 text-[0.75rem] sm:left-2.5 sm:top-2.5 sm:text-[0.92rem]">
              {day.day}
            </span>
            <button
              type="button"
              aria-label={`Open note for ${shortDateLabel(day.iso)}`}
              className={joinClasses(
                "absolute right-1 top-1 z-10 flex h-4.5 w-4.5 items-center justify-center rounded-full border text-[0.72rem] leading-none transition sm:right-2 sm:top-2 sm:h-5 sm:w-5",
                hasPinnedNote
                  ? inRange
                    ? "border-white/60 bg-white/18 text-white"
                    : "border-[rgba(245,158,11,0.18)] bg-[rgba(245,158,11,0.1)] text-[#b45309]"
                  : inRange
                    ? "border-white/35 bg-transparent text-white/80"
                    : ""
              )}
              style={
                !hasPinnedNote && !inRange
                  ? {
                      borderColor: `${accentColor}24`,
                      backgroundColor: accentSoftColor,
                      color: accentColor
                    }
                  : undefined
              }
              onClick={(event) => {
                event.stopPropagation();
                onOpenDayNote(day.iso);
              }}
            >
              {hasPinnedNote ? (
                <FilePenLine className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.2} />
              ) : (
                <Plus className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.2} />
              )}
            </button>
            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-0.5 sm:bottom-2.5 sm:left-2.5 sm:gap-1">
              {holiday ? (
                <span
                  className={joinClasses(
                    "h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2",
                    holiday.kind === "gazetted"
                      ? "bg-[#ff6b6b]"
                      : holiday.kind === "tentative"
                        ? "bg-[#c67dff]"
                        : "bg-[#f4b942]",
                    inRange && "bg-white/90"
                  )}
                  aria-hidden="true"
                />
              ) : null}
              {hasPinnedNote ? (
                <span
                  className={joinClasses("h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2", inRange ? "bg-white/70" : "bg-[#13253a]")}
                  aria-hidden="true"
                />
              ) : null}
              {hasRangeNote ? (
                <span
                  className="h-1.5 w-1.5 rotate-45 sm:h-2 sm:w-2"
                  style={{ backgroundColor: inRange ? "rgba(255,255,255,0.8)" : accentColor }}
                  aria-hidden="true"
                />
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}
