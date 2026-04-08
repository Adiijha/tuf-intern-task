import { Trash2, X } from "lucide-react";
import { shortDateLabel } from "../../lib/utils";

type DateNoteModalProps = {
  noteEditorDate: string | null;
  activeDayNote: string;
  subtleButtonClass: string;
  destructiveButtonClass: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onRemove: () => void;
};

export function DateNoteModal({
  noteEditorDate,
  activeDayNote,
  subtleButtonClass,
  destructiveButtonClass,
  onClose,
  onChange,
  onRemove
}: DateNoteModalProps) {
  if (!noteEditorDate) return null;

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-[rgba(17,24,39,0.28)] px-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[22px] border border-[rgba(19,37,58,0.1)] bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1e8_100%)] p-4 shadow-[0_24px_50px_rgba(31,22,15,0.18)] sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="m-0 text-[0.68rem] uppercase tracking-[0.12em] text-[#778391]">Date note</p>
            <strong className="font-[Georgia,'Times_New_Roman',serif] text-[1.05rem] text-[#13253a]">
              {shortDateLabel(noteEditorDate)}
            </strong>
          </div>
          <button
            type="button"
            aria-label="Close date note"
            onClick={onClose}
            className={`${subtleButtonClass} flex items-center justify-center px-3`}
          >
            <X className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>

        <textarea
          id="day-note"
          placeholder="Write a note for this date..."
          value={activeDayNote}
          onChange={(event) => onChange(event.target.value)}
          className="mt-4 min-h-[168px] w-full resize-y border-none bg-[linear-gradient(transparent_23px,rgba(19,37,58,0.12)_24px)] bg-[length:100%_24px] px-0 py-1 leading-6 text-[#13253a] outline-none focus:shadow-[inset_0_-2px_0_rgba(32,162,235,0.22)]"
          autoFocus
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[0.8rem] text-[#778391]">
          <span>
            {activeDayNote.trim()
              ? "This note saves automatically for the selected month."
              : "Leave it blank if you want this date to have no note."}
          </span>
          {activeDayNote.trim() ? (
            <button
              type="button"
              onClick={onRemove}
              className={`${destructiveButtonClass} flex items-center gap-2`}
            >
              <Trash2 className="h-4 w-4" strokeWidth={2.1} />
              <span>Remove note</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
