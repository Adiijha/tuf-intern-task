import { rangeLabel } from "../../lib/utils";

type NotesSidebarProps = {
  monthNotes: string;
  rangeNotes: string;
  dayNoteCount: number;
  hasActiveRange: boolean;
  activeRangeHasNote: boolean;
  savedRangeNotes: Array<{ key: string; start: string; end: string; note: string }>;
  selectedDaysLabel: string;
  actionButtonClass: string;
  destructiveButtonClass: string;
  accentColor: string;
  accentSoftColor: string;
  onMonthNotesChange: (value: string) => void;
  onRangeNotesChange: (value: string) => void;
  onClearSelection: () => void;
  onSelectSavedRange: (start: string, end: string) => void;
  onRemoveSavedRangeNote: (key: string) => void;
};

export function NotesSidebar({
  monthNotes,
  rangeNotes,
  dayNoteCount,
  hasActiveRange,
  activeRangeHasNote,
  savedRangeNotes,
  selectedDaysLabel,
  actionButtonClass,
  destructiveButtonClass,
  accentColor,
  accentSoftColor,
  onMonthNotesChange,
  onRangeNotesChange,
  onClearSelection,
  onSelectSavedRange,
  onRemoveSavedRangeNote
}: NotesSidebarProps) {
  return (
    <aside className="order-2 grid content-start gap-3 md:order-1">
      <div className="grid gap-1">
        <p className="m-0 text-[0.8rem] uppercase tracking-[0.12em]" style={{ color: accentColor }}>
          Notes
        </p>
      </div>
      <div className="grid gap-2.5">
        <label htmlFor="month-notes" className="text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: accentColor }}>
          Monthly notes
        </label>
        <textarea
          id="month-notes"
          placeholder="Deadlines, reminders, goals..."
          value={monthNotes}
          onChange={(event) => onMonthNotesChange(event.target.value)}
          className="min-h-30 w-full resize-y border-none bg-[linear-gradient(transparent_23px,rgba(19,37,58,0.12)_24px)] bg-size-[100%_24px] px-0 py-1 text-sm leading-6 text-[#13253a] outline-none focus:shadow-[inset_0_-2px_0_rgba(32,162,235,0.22)] md:min-h-43"
        />
      </div>
      <div className="mt-1.5 grid gap-2.5 border-t pt-3" style={{ borderColor: `${accentColor}20` }}>
        <label htmlFor="range-notes" className="text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: accentColor }}>
          Range notes
        </label>
        <textarea
          id="range-notes"
          placeholder={hasActiveRange ? "Trip details, packing list, meeting prep..." : "Select a full range to attach a range note..."}
          value={rangeNotes}
          onChange={(event) => onRangeNotesChange(event.target.value)}
          disabled={!hasActiveRange}
          className="min-h-25 w-full resize-y border-none bg-[linear-gradient(transparent_23px,rgba(19,37,58,0.12)_24px)] bg-size-[100%_24px] px-0 py-1 text-sm leading-6 text-[#13253a] outline-none focus:shadow-[inset_0_-2px_0_rgba(32,162,235,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
        />

        <div className="flex items-center justify-between gap-3 text-[0.82rem] text-[#778391]">
          <span>{selectedDaysLabel}</span>
          <button
            type="button"
            aria-label="Clear selected range"
            onClick={onClearSelection}
            className={`${destructiveButtonClass} flex h-8 w-8 shrink-0 cursor-pointer bg-red-100 items-center justify-center rounded-full border border-[rgba(220,38,38,0.22)] text-[#b42318] transition hover:border-[rgba(220,38,38,0.36)] hover:bg-[rgba(220,38,38,0.08)]`}
          >
            <span aria-hidden="true" className="text-[1.1rem] font-semibold mb-0.5 leading-none text-[#b42318]">
              ×
            </span>
          </button>
        </div>
        {hasActiveRange ? (
          <span className="text-[0.78rem] text-[#778391]">
            {activeRangeHasNote ? "This selected range has a note attached." : "No note attached to this selected range yet."}
          </span>
        ) : null}
        <div className="grid gap-2">
          <span className="text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: accentColor }}>
            Saved range notes
          </span>
          {savedRangeNotes.length ? (
            <div className="grid gap-2">
              {savedRangeNotes.map((rangeEntry) => (
                <div
                  key={rangeEntry.key}
                  className="rounded-2xl border bg-white/60 px-3 py-2 transition hover:bg-white"
                  style={{ borderColor: `${accentColor}20` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectSavedRange(rangeEntry.start, rangeEntry.end)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <strong className="block text-[0.84rem]" style={{ color: accentColor }}>
                        {rangeLabel(rangeEntry.start, rangeEntry.end)}
                      </strong>
                      <span className="mt-1 block line-clamp-2 text-[0.76rem] text-[#778391]">{rangeEntry.note}</span>
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove note for ${rangeLabel(rangeEntry.start, rangeEntry.end)}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemoveSavedRangeNote(rangeEntry.key);
                      }}
                      className="mt-0.5 flex h-8 w-8 shrink-0 cursor-pointer bg-red-100 items-center justify-center rounded-full border border-[rgba(220,38,38,0.22)] text-[#b42318] transition hover:border-[rgba(220,38,38,0.36)] hover:bg-[rgba(220,38,38,0.08)]"
                    >
                      <span aria-hidden="true" className="text-[1.1rem] font-semibold leading-none mb-0.5 text-[#b42318]">
                        ×
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-[0.78rem] text-[#778391]">Saved range notes for this month will appear here.</span>
          )}
        </div>
      </div>

      <div className="mt-1.5 grid gap-2.5 border-t pt-3" style={{ borderColor: `${accentColor}20` }}>
        <div className="grid gap-1">
          <label htmlFor="day-note" className="text-[0.7rem] uppercase tracking-[0.12em]" style={{ color: accentColor }}>
            Date notes
          </label>
        </div>

        <span className="text-[0.78rem] text-[#778391]">
          Click on a date to add a note.
        </span>
        <span className="text-[0.78rem] text-[#778391]">
          {dayNoteCount
            ? `${dayNoteCount} date note${dayNoteCount === 1 ? "" : "s"} saved this month.`
            : "No date-specific notes saved for this month yet."}
        </span>
      </div>
    </aside>
  );
}
