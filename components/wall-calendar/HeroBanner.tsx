type HeroBannerProps = {
  currentMonthName: string;
  currentYear: number;
  imageUrl: string;
  accentColor: string;
  accentSoftColor: string;
  headlineTop: string;
  headlineBottom: string;
};

export function HeroBanner({
  currentMonthName,
  currentYear,
  imageUrl,
  accentColor,
  accentSoftColor,
  headlineTop,
  headlineBottom
}: HeroBannerProps) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    >
      <div className="absolute inset-0 bg-[rgba(14,24,35,0.3)]" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-[30%] h-32 w-[70%] sm:left-[28%] sm:h-42 sm:w-[72%]"
        style={{
          backgroundColor: accentColor,
          clipPath: "polygon(0 84%, 18% 64%, 40% 42%, 64% 24%, 100% 10%, 100% 100%, 14% 100%)"
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-px left-[4%] z-10 h-23 w-[46%] sm:left-[6%] sm:h-31 sm:w-[44%]"
        style={{
          backgroundColor: accentSoftColor,
          clipPath: "polygon(0 100%, 50% 30%, 100% 100%)"
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 h-16 w-[26%] bg-[rgba(255,255,255,0.14)] sm:h-21"
        style={{ clipPath: "polygon(0 34%, 34% 50%, 66% 68%, 100% 82%, 70% 100%, 0 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute left-3.5 top-3.5 z-10 max-w-[62%] text-white sm:left-8 sm:top-8 sm:max-w-[52%]">
        <p className="m-0 text-[0.7rem] uppercase tracking-[0.24em] text-white/72 sm:text-[0.78rem]">
          Wall Calendar
        </p>
        <h1 className="mt-2 font-sans text-[clamp(1.4rem,6vw,2.25rem)] font-extrabold leading-[0.92] uppercase tracking-[0.04em] sm:mt-3 sm:text-4xl">
          {headlineTop}
          <br />
          {headlineBottom}
        </h1>
      </div>
      <div className="absolute bottom-3.5 right-3 z-10 w-[52%] text-right text-white sm:bottom-7 sm:right-8 sm:w-[48%]">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.22em] text-white/82 sm:text-[1rem]">
          {currentYear}
        </p>
        <h2 className="m-[6px_0_0] font-sans text-[clamp(1.45rem,6vw,3.4rem)] font-black leading-[0.92] uppercase tracking-[0.02em] sm:m-[8px_0_0]">
          {currentMonthName}
        </h2>
      </div>
    </section>
  );
}
