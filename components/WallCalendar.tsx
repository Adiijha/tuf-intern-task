"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { CalendarGrid } from "./wall-calendar/CalendarGrid";
import { CalendarOverview } from "./wall-calendar/CalendarOverview";
import { DateNoteModal } from "./wall-calendar/DateNoteModal";
import { HeroBanner } from "./wall-calendar/HeroBanner";
import { NotesSidebar } from "./wall-calendar/NotesSidebar";
import { StoredMonthData } from "../lib/types";
import {
  addMonths,
  displayLabel,
  getDaysMatrix,
  getMonthTheme,
  getRangeKey,
  getIndianHolidayMap,
  nightsBetween,
  startOfMonth
} from "../lib/utils";

export function WallCalendar() {
  const [monthDate, setMonthDate] = useState(() => startOfMonth(new Date()));
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [monthNotes, setMonthNotes] = useState("");
  const [rangeNotes, setRangeNotes] = useState("");
  const [rangeNotesByKey, setRangeNotesByKey] = useState<Record<string, string>>({});
  const [dayNotes, setDayNotes] = useState<Record<string, string>>({});
  const [noteEditorDate, setNoteEditorDate] = useState<string | null>(null);
  const [loadedMonthKey, setLoadedMonthKey] = useState<string | null>(null);
  const monthKey = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;

  const days = useMemo(() => getDaysMatrix(monthDate), [monthDate]);
  const holidayMap = useMemo(() => getIndianHolidayMap(monthDate.getFullYear()), [monthDate]);
  const monthTheme = useMemo(() => getMonthTheme(monthDate.getMonth()), [monthDate]);

  useEffect(() => {
    const stored = window.localStorage.getItem(`calendar-month-${monthKey}`);
    const parsed = stored ? (JSON.parse(stored) as StoredMonthData) : null;
    setMonthNotes(parsed?.monthNotes ?? "");
    setRangeNotesByKey(parsed?.rangeNotesByKey ?? {});
    setRangeNotes("");
    setDayNotes(parsed?.dayNotes ?? {});
    setLoadedMonthKey(monthKey);
  }, [monthKey]);

  useEffect(() => {
    if (loadedMonthKey !== monthKey) return;

    window.localStorage.setItem(
      `calendar-month-${monthKey}`,
      JSON.stringify({
        monthNotes,
        rangeNotes,
        rangeNotesByKey,
        dayNotes
      })
    );
  }, [dayNotes, loadedMonthKey, monthKey, monthNotes, rangeNotes, rangeNotesByKey]);

  const activeRangeKey = getRangeKey(startDate, endDate);

  useEffect(() => {
    if (!activeRangeKey) {
      setRangeNotes("");
      return;
    }

    setRangeNotes(rangeNotesByKey[activeRangeKey] ?? "");
  }, [activeRangeKey, rangeNotesByKey]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;
      const isTypingTarget =
        target?.isContentEditable || tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";

      if (isTypingTarget) return;

      if (event.key === "ArrowLeft") {
        setMonthDate((value) => addMonths(value, -1));
      }

      if (event.key === "ArrowRight") {
        setMonthDate((value) => addMonths(value, 1));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleDayClick(iso: string) {
    if (iso === startDate && !endDate) {
      setStartDate(null);
      return;
    }

    if (iso === endDate) {
      setEndDate(null);
      return;
    }

    if (iso === startDate && endDate) {
      setStartDate(endDate);
      setEndDate(null);
      return;
    }

    if (!startDate || endDate) {
      setStartDate(iso);
      setEndDate(null);
      return;
    }

    if (iso < startDate) {
      setStartDate(iso);
      setEndDate(null);
      return;
    }

    setEndDate(iso);
  }

  function clearSelection() {
    setStartDate(null);
    setEndDate(null);
  }

  function updateRangeNote(value: string) {
    setRangeNotes(value);

    if (!activeRangeKey) return;

    setRangeNotesByKey((current) => {
      if (!value.trim()) {
        const next = { ...current };
        delete next[activeRangeKey];
        return next;
      }

      return {
        ...current,
        [activeRangeKey]: value
      };
    });
  }

  function removeSavedRangeNote(rangeKey: string) {
    setRangeNotesByKey((current) => {
      const next = { ...current };
      delete next[rangeKey];
      return next;
    });

    if (activeRangeKey === rangeKey) {
      setRangeNotes("");
    }
  }

  function updateDayNote(iso: string, value: string) {
    setDayNotes((current) => {
      if (!value.trim()) {
        const next = { ...current };
        delete next[iso];
        return next;
      }

      return {
        ...current,
        [iso]: value
      };
    });
  }

  const currentMonthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(monthDate);
  const currentYear = monthDate.getFullYear();
  const selectedNights = nightsBetween(startDate, endDate);
  const selectedDaysCount = endDate ? selectedNights + 1 : null;
  const activeDayNote = noteEditorDate ? dayNotes[noteEditorDate] ?? "" : "";
  const activeRangeHasNote = Boolean(activeRangeKey && rangeNotesByKey[activeRangeKey]?.trim());
  const savedRangeNotes = Object.entries(rangeNotesByKey)
    .filter(([, note]) => note.trim())
    .map(([key, note]) => {
      const [start, end] = key.split("__");
      return start && end ? { key, start, end, note } : null;
    })
    .filter((entry): entry is { key: string; start: string; end: string; note: string } => Boolean(entry));
  const holidayEntries = days
    .filter((day) => day.inMonth)
    .map((day) => ({
      iso: day.iso,
      holiday: holidayMap.get(day.iso)
    }))
    .filter((entry): entry is { iso: string; holiday: NonNullable<typeof entry.holiday> } => Boolean(entry.holiday));
  const navButtonClass =
    "cursor-pointer rounded-full border px-3 py-2 text-sm transition hover:-translate-y-px";
  const subtleButtonClass =
    "cursor-pointer rounded-full border border-[rgba(19,37,58,0.16)] bg-white/80 px-3.5 py-2 text-sm text-[#13253a] transition hover:-translate-y-px hover:border-[rgba(19,37,58,0.28)] hover:bg-white";
  const destructiveButtonClass =
    "cursor-pointer rounded-full border border-[rgba(220,38,38,0.18)] bg-[rgba(220,38,38,0.06)] px-3.5 py-2 text-sm text-[#b42318] transition hover:-translate-y-px hover:border-[rgba(220,38,38,0.3)] hover:bg-[rgba(220,38,38,0.12)]";

  return (
    <main className="grid min-h-screen place-items-center px-1.5 py-4 sm:px-3.5 sm:py-8">
      <section className="relative w-full max-w-[760px] pt-10">
        <div className="absolute left-1/2 top-0 h-14 w-[116px] -translate-x-1/2" aria-hidden="true">
          <span className="absolute left-0 top-6 w-[42px] border-t-2 border-[rgba(69,62,52,0.7)]" />
          <span className="absolute right-0 top-6 w-[42px] border-t-2 border-[rgba(69,62,52,0.7)]" />
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#b8b1a5] shadow-[0_2px_8px_rgba(0,0,0,0.12)]" />
          <span className="absolute left-1/2 top-3 h-10 w-10 -translate-x-1/2 rotate-45 rounded-tl-[4px] border-l-2 border-t-2 border-[rgba(69,62,52,0.7)]" />
        </div>

        <article className="overflow-hidden rounded-[6px] bg-[linear-gradient(180deg,#fcfaf5_0%,#f8f4ec_100%)] shadow-[0_26px_58px_rgba(48,39,26,0.16),0_6px_18px_rgba(31,22,15,0.08)] sm:rounded-[8px]">
          <div className="flex justify-center gap-1.5 px-2.5 pt-3 pb-1.5 sm:gap-2.5 sm:px-5 sm:pt-3.5 sm:pb-2" aria-hidden="true">
            {Array.from({ length: 26 }, (_, index) => (
              <span
                key={index}
                className="h-[14px] w-[7px] rounded-full border-2 border-b-0 border-[#3b3d42] opacity-90 sm:h-[18px] sm:w-[9px]"
              />
            ))}
          </div>

          <div className="grid grid-rows-[260px_auto] sm:grid-rows-[380px_auto] md:grid-rows-[430px_auto]">
            <HeroBanner
              currentMonthName={currentMonthName}
              currentYear={currentYear}
              imageUrl={monthTheme.imageUrl}
              accentColor={monthTheme.accentColor}
              accentSoftColor={monthTheme.accentSoftColor}
              headlineTop={monthTheme.headlineTop}
              headlineBottom={monthTheme.headlineBottom}
            />

            <section className="grid gap-4 px-3 py-4 sm:gap-[18px] sm:px-4 sm:py-5 md:grid-cols-[minmax(180px,0.34fr)_minmax(0,0.66fr)] md:gap-[22px] md:px-6 md:pb-6">
              <NotesSidebar
                monthNotes={monthNotes}
                rangeNotes={rangeNotes}
                dayNoteCount={Object.keys(dayNotes).length}
                hasActiveRange={Boolean(activeRangeKey)}
                activeRangeHasNote={activeRangeHasNote}
                savedRangeNotes={savedRangeNotes}
                selectedDaysLabel={startDate && endDate ? `${selectedNights + 1} days selected` : "Choose a full range"}
                actionButtonClass={subtleButtonClass}
                destructiveButtonClass={destructiveButtonClass}
                accentColor={monthTheme.accentColor}
                accentSoftColor={monthTheme.accentSoftColor}
                onMonthNotesChange={setMonthNotes}
                onRangeNotesChange={updateRangeNote}
                onClearSelection={clearSelection}
                onSelectSavedRange={(start, end) => {
                  setStartDate(start);
                  setEndDate(end);
                }}
                onRemoveSavedRangeNote={removeSavedRangeNote}
              />

              <section className="order-1 grid gap-4 md:order-2">
                <header className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="m-0 text-[0.8rem] uppercase tracking-[0.12em] text-[#778391]">Wall Calendar</p>
                    <h2
                      className="m-[2px_0_0] font-[Georgia,'Times_New_Roman',serif] text-[clamp(1.8rem,3vw,2.4rem)]"
                      style={{ color: monthTheme.accentColor }}
                    >
                      {displayLabel(monthDate)}
                    </h2>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      aria-label="Go to previous month"
                      onClick={() => setMonthDate((value) => addMonths(value, -1))}
                      className={`${navButtonClass} flex h-10 w-10 items-center justify-center px-0 sm:h-11 sm:w-11`}
                      style={{
                        borderColor: `${monthTheme.accentColor}33`,
                        backgroundColor: monthTheme.accentSoftColor,
                        color: monthTheme.accentColor
                      }}
                    >
                      <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                    <button
                      type="button"
                      aria-label="Go to next month"
                      onClick={() => setMonthDate((value) => addMonths(value, 1))}
                      className={`${navButtonClass} flex h-10 w-10 items-center justify-center px-0 sm:h-11 sm:w-11`}
                      style={{
                        borderColor: `${monthTheme.accentColor}33`,
                        backgroundColor: monthTheme.accentSoftColor,
                        color: monthTheme.accentColor
                      }}
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                  </div>
                </header>

                <CalendarOverview
                  selectedRangeStart={startDate}
                  selectedRangeEnd={endDate}
                  selectedDaysCount={selectedDaysCount}
                  activeRangeHasNote={activeRangeHasNote}
                  holidayEntries={holidayEntries}
                  accentColor={monthTheme.accentColor}
                  accentSoftColor={monthTheme.accentSoftColor}
                />

                <CalendarGrid
                  days={days}
                  holidayMap={holidayMap}
                  dayNotes={dayNotes}
                  rangeNotesByKey={rangeNotesByKey}
                  startDate={startDate}
                  endDate={endDate}
                  accentColor={monthTheme.accentColor}
                  accentSoftColor={monthTheme.accentSoftColor}
                  onDayClick={handleDayClick}
                  onOpenDayNote={setNoteEditorDate}
                />
              </section>
            </section>
          </div>
        </article>

        <DateNoteModal
          noteEditorDate={noteEditorDate}
          activeDayNote={activeDayNote}
          subtleButtonClass={subtleButtonClass}
          destructiveButtonClass={destructiveButtonClass}
          onClose={() => setNoteEditorDate(null)}
          onChange={(value) => noteEditorDate && updateDayNote(noteEditorDate, value)}
          onRemove={() => noteEditorDate && updateDayNote(noteEditorDate, "")}
        />
      </section>
    </main>
  );
}
