import React, { useEffect, useRef } from "react";

const sponsors = [
  "Rolex",
  "Taj Hotels",
  "ITC",
  "Tata Sons",
  "Infosys",
  "Birla Group",
  "Reliance",
  "HDFC Bank",
  "Mahindra",
  "Godrej",
  "Wipro",
  "Bajaj",
];

const SponsorRibbon = () => {
  const trackRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; // half because we doubled the array
    const duration = 28000;

    function loop() {
      animRef.current = track.animate(
        [
          { transform: "translateX(0px)" },
          { transform: `translateX(-${totalWidth}px)` },
        ],
        { duration, iterations: Infinity },
      );
    }

    loop();

    const pause = () => animRef.current?.pause();
    const resume = () => animRef.current?.play();

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });
    track.addEventListener("touchcancel", resume, { passive: true });

    return () => {
      animRef.current?.cancel();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
      track.removeEventListener("touchcancel", resume);
    };
  }, []);

  const allSponsors = [...sponsors, ...sponsors];

  return (
    <div
      className="absolute bottom-0 w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(4,2,1,0) 0%, rgba(10,5,2,0.85) 30%, rgba(10,5,2,0.85) 70%, rgba(4,2,1,0) 100%)",
        padding: "18px 0",
        zIndex: 10,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,190,60,0.25) 20%, rgba(255,190,60,0.25) 80%, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,190,60,0.25) 20%, rgba(255,190,60,0.25) 80%, transparent)",
        }}
      />
      <div
        className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, rgba(10,5,2,1), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to left, rgba(10,5,2,1), transparent)",
        }}
      />

      <div
        ref={trackRef}
        className="flex"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {allSponsors.map((name, i) => (
          <span key={i} className="flex items-center">
            <span
              className="mx-5 opacity-40"
              style={{
                display: "inline-block",
                width: "5px",
                height: "5px",
                background: "rgba(255,190,60,0.6)",
                transform: "rotate(45deg)",
                flexShrink: 0,
              }}
            />
            <span
              className="font-main font-bold uppercase"
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.28em",
                color: "rgba(255,240,200,0.55)",
              }}
            >
              {name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SponsorRibbon;
