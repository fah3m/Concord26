import React from "react";

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

// Duplicate for seamless infinite loop
const allSponsors = [...sponsors, ...sponsors];

const SponsorRibbon = () => {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(4,2,1,0) 0%, rgba(10,5,2,0.85) 30%, rgba(10,5,2,0.85) 70%, rgba(4,2,1,0) 100%)",
        padding: "18px 0",
        zIndex: 10,
      }}
    >
      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,190,60,0.25) 20%, rgba(255,190,60,0.25) 80%, transparent)",
        }}
      />

      {/* Bottom hairline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,190,60,0.25) 20%, rgba(255,190,60,0.25) 80%, transparent)",
        }}
      />

      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, rgba(10,5,2,1), transparent)",
        }}
      />

      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to left, rgba(10,5,2,1), transparent)",
        }}
      />

      {/* "Sponsors" label pinned left */}

      {/* Scrolling track */}
      <div className="flex" style={{ width: "max-content" }}>
        <div
          className="flex items-center gap-0"
          style={{
            animation: "ribbonScroll 28s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {allSponsors.map((name, i) => (
            <span key={i} className="flex items-center">
              {/* Diamond separator */}
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
              {/* Sponsor name */}
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

      <style>{`
        @keyframes ribbonScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default SponsorRibbon;
