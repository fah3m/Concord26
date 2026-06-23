import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
const cbs = { fontFamily: "'Canterbury', serif" };

const scheduleDays = [
  {
    day: "Day 1",
    date: "1st July, 2026",
    venue: "Calcutta Boys' School",
    rows: [
      {
        event: "Registration",
        time: "08:00 am – 09:00 am",
        venue: "Reception",
      },
      {
        event: "Basketball Registration",
        time: "08:00 am – 09:00 am",
        venue: "Reception",
      },

      { section: "On-Stage Events" },
      {
        event: "Inauguration Ceremony",
        time: "09:00 am – 10:30 am",
        venue: "Chapel Hall",
      },
      {
        event: "Devotional Choir",
        time: "11:00 am – 12:30 pm",
        venue: "Chapel Hall",
      },
      {
        event: "Instrumental",
        time: "12:30 pm – 02:00 pm",
        venue: "Chapel Hall",
      },
      {
        event: "Eastern Music",
        time: "02:00 pm – 03:30 pm",
        venue: "Chapel Hall",
      },

      { section: "Off-Stage Events" },
      { event: "Shark Tank", time: "10:00 am – 01:00 pm", venue: "Lounge" },
      {
        event: "Pretentious Movie Review",
        time: "12:00 noon – 02:00 pm",
        venue: "VII A",
      },
      {
        event: "Robotics",
        time: "10:00 am – 12:00 noon",
        venue: "Physics Lab",
      },
      { event: "Poster Making", time: "11:00 am – 01:30 pm", venue: "VIII B" },
      { event: "Quiz Prelims", time: "10:00 am – 12:00 noon", venue: "IX B" },
      { event: "Dance Face-off", time: "10:00 am – 12:00 noon", venue: "X A" },
      {
        event: "Console Gaming",
        time: "12:00 noon – 02:00 pm",
        venue: "VIII A",
      },
      {
        event: "Multimedia Videography",
        time: "02:00 pm – 03:00 pm",
        venue: "VIII C",
      },
      { event: "BGMI", time: "11:00 am – 01:00 pm", venue: "Computer Lab" },
      { event: "Quiz Finals", time: "01:30 pm – 03:00 pm", venue: "Lounge" },
      {
        event: "Graphics Designing",
        time: "10:30 am – 01:00 pm",
        venue: "X C",
      },
      {
        event: "Comic Strip",
        time: "01:00 pm – 03:00 pm",
        venue: "XI Commerce",
      },

      { section: "Field Events" },
      {
        event: "Basketball",
        time: "09:00 am – 02:00 pm",
        venue: "Basketball Court",
      },
      {
        event: "Tug of War (Girls)",
        time: "11:00 am – 12:30 pm",
        venue: "Field",
      },
      {
        event: "Tug of War (Boys)",
        time: "01:00 pm – 02:30 pm",
        venue: "Field",
      },
    ],
  },

  {
    day: "Day 2",
    date: "2nd July, 2026",
    venue: "Calcutta Boys' School",
    rows: [
      {
        event: "Registration",
        time: "08:00 am – 09:00 am",
        venue: "Reception",
      },
      {
        event: "Football Registration",
        time: "08:30 am – 09:00 am",
        venue: "Reception",
      },

      { section: "On-Stage Events" },
      {
        event: "Antakshari",
        time: "09:00 am – 10:30 am",
        venue: "Chapel Hall",
      },
      {
        event: "Acoustic Event",
        time: "10:30 am – 12:00 pm",
        venue: "Chapel Hall",
      },
      {
        event: "Fan Fiction Drama",
        time: "12:00 pm – 03:00 pm",
        venue: "Chapel Hall",
      },

      { section: "Off-Stage Events" },
      {
        event: "Visual Poetry Slam",
        time: "09:00 am – 11:00 am",
        venue: "X A",
      },
      { event: "IPL Auction", time: "10:00 am – 03:00 pm", venue: "Lounge" },
      {
        event: "Coding Jam",
        time: "11:00 am – 12:30 pm",
        venue: "Computer Lab",
      },
      { event: "Hindi Monologue", time: "11:00 am – 01:00 pm", venue: "VII A" },
      { event: "Photography", time: "10:00 am – 12:00 noon", venue: "VIII A" },
      {
        event: "Terribly Tiny Tales",
        time: "11:00 am – 01:00 pm",
        venue: "XII Commerce",
      },
      { event: "Moot Court", time: "10:00 am – 02:00 pm", venue: "IX C, IX B" },
      { event: "Turncoat", time: "01:00 pm – 03:00 pm", venue: "XI Commerce" },
      { event: "Non-Fire Cooking", time: "11:00 am – 01:00 pm", venue: "IX A" },
      {
        event: "Blogging Contest",
        time: "11:00 am – 12:00 noon",
        venue: "X D",
      },
      { event: "Chess", time: "01:30 pm – 03:30 pm", venue: "XI Science" },

      { section: "Field Events" },
      { event: "Football", time: "09:00 am – 04:00 pm", venue: "Field" },
    ],
  },

  {
    day: "Day 3",
    date: "3rd July, 2026",
    venue: "EZCC Auditorium",
    rows: [
      { section: "On-Stage Events" },
      {
        event: "Western Dance",
        time: "10:00 am – 11:30 am",
        venue: "EZCC Auditorium",
      },
      {
        event: "Fashion Show",
        time: "12:00 noon – 01:30 pm",
        venue: "EZCC Auditorium",
      },
      { event: "Break", time: "01:30 pm – 03:30 pm", venue: "EZCC Auditorium" },
      {
        event: "Western Band",
        time: "03:30 pm – 05:00 pm",
        venue: "EZCC Auditorium",
      },
      {
        event: "Prize Distribution",
        time: "05:00 pm – 06:30 pm",
        venue: "EZCC Auditorium",
      },
      {
        event: "Guest Performance",
        time: "06:30 pm – 07:30 pm",
        venue: "EZCC Auditorium",
      },
    ],
  },
];

const Ornament = () => (
  <div className="flex items-center justify-center gap-3">
    <div
      className="h-px w-20 sm:w-32"
      style={{
        background:
          "linear-gradient(to right, transparent, rgba(255,190,60,0.55))",
      }}
    />
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <rect
        x="5"
        y="0.5"
        width="6.5"
        height="6.5"
        transform="rotate(45 5 5)"
        stroke="rgba(255,190,60,0.7)"
        strokeWidth="0.8"
      />
      <rect
        x="5"
        y="3"
        width="3"
        height="3"
        transform="rotate(45 5 5)"
        fill="rgba(255,190,60,0.55)"
      />
    </svg>
    <div
      className="h-px w-20 sm:w-32"
      style={{
        background:
          "linear-gradient(to left, transparent, rgba(255,190,60,0.55))",
      }}
    />
  </div>
);

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(0);
  const currentDay = scheduleDays[activeDay];

  return (
    <section
      id="schedule"
      className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-16 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease }}
          className="mb-10 text-center"
        >
          <p
            className="font-main mb-3 text-[0.62rem] font-bold uppercase tracking-[0.42em]"
            style={{ color: "rgba(255,190,60,0.55)" }}
          >
            Concord 2026
          </p>

          <h2
            className="font-black font-main"
            style={{
              fontSize: "clamp(3.4rem, 8vw, 6.5rem)",
              lineHeight: 0.9,
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundImage:
                "linear-gradient(115deg, #ff940a 0%, #ffd36b 30%, #fff4d0 58%, #d9902f 100%)",
              filter: "drop-shadow(0 0 20px rgba(255,120,0,0.35))",
            }}
          >
            SCHEDULE
          </h2>

          <div className="mt-7">
            <Ornament />
          </div>
        </motion.div>

        {/* Day selector */}
        <div className="mb-8 flex justify-center gap-2 sm:gap-4">
          {scheduleDays.map((item, index) => {
            const isActive = activeDay === index;

            return (
              <button
                key={item.day}
                onClick={() => setActiveDay(index)}
                className="relative px-5 py-3 font-main text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 sm:px-8"
                style={{
                  color: isActive
                    ? "rgba(255,235,185,1)"
                    : "rgba(255,255,255,0.45)",
                  border: `1px solid ${isActive ? "rgba(255,190,60,0.65)" : "rgba(255,190,60,0.16)"}`,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(190,75,0,0.55), rgba(255,180,45,0.16))"
                    : "rgba(255,255,255,0.015)",
                  boxShadow: isActive
                    ? "0 0 22px rgba(255,125,0,0.16)"
                    : "none",
                }}
              >
                {item.day}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.day}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="mb-5 text-center">
              <p
                className="font-main text-xs font-bold uppercase tracking-[0.22em]"
                style={{ color: "rgba(255,205,112,0.82)" }}
              >
                {currentDay.date}
              </p>
              <p
                className="mt-2 font-main text-[0.68rem] uppercase tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {currentDay.venue}
              </p>
            </div>

            <div
              className="overflow-hidden rounded-sm"
              style={{
                border: "1px solid rgba(255,190,60,0.24)",
                boxShadow:
                  "0 0 0 1px rgba(255,110,0,0.05), 0 22px 70px rgba(0,0,0,0.45)",
                background:
                  "linear-gradient(145deg, rgba(255,170,55,0.055), rgba(255,255,255,0.015))",
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse">
                  <thead>
                    <tr
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(156,57,0,0.45), rgba(255,165,35,0.16), rgba(156,57,0,0.45))",
                      }}
                    >
                      {["Event Name", "Event Timing", "Venue"].map(
                        (heading) => (
                          <th
                            key={heading}
                            className="px-6 py-5 text-left font-main text-[0.66rem] font-bold uppercase tracking-[0.25em]"
                            style={{
                              color: "rgba(255,231,173,0.95)",
                              borderBottom: "1px solid rgba(255,190,60,0.3)",
                            }}
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {currentDay.rows.map((item, index) =>
                      item.section ? (
                        <tr key={item.section}>
                          <td
                            colSpan="3"
                            className="px-6 py-4 text-center"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(255,130,0,0.08), rgba(255,194,67,0.17), rgba(255,130,0,0.08))",
                              borderTop: "1px solid rgba(255,190,60,0.26)",
                              borderBottom: "1px solid rgba(255,190,60,0.22)",
                            }}
                          >
                            <span
                              className="font-bold"
                              style={{
                                ...cbs,
                                color: "rgba(255,221,145,0.95)",
                                fontSize: "clamp(1.35rem, 2.5vw, 1.8rem)",
                                letterSpacing: "0.06em",
                              }}
                            >
                              {item.section}
                            </span>
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={`${item.event}-${index}`}
                          className="transition-colors duration-300 hover:bg-amber-400/[0.05]"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.075)",
                          }}
                        >
                          <td
                            className="px-6 py-4 font-main text-sm font-bold sm:text-[0.95rem]"
                            style={{ color: "rgba(255,255,255,0.82)" }}
                          >
                            {item.event}
                          </td>
                          <td
                            className="px-6 py-4 font-main text-xs font-bold tracking-[0.04em] sm:text-sm"
                            style={{ color: "rgba(255,205,112,0.78)" }}
                          >
                            {item.time}
                          </td>
                          <td
                            className="px-6 py-4 font-main text-sm"
                            style={{ color: "rgba(255,255,255,0.58)" }}
                          >
                            {item.venue}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10">
          <Ornament />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
