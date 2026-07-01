import React, { useState } from "react";
import Icon from "../components/Icon";

const RIBBON_DATA = [
  {
    key: "yellow",
    label: "Yellow - Week 8",
    dot: "bg-yellow-400",
    borderColor: "#facc15",
    avgHands: "8.4",
    subBasal: { grade: "39.2", length: "22.5", fingers: "18" },
    apical: { grade: "36.1", length: "20.8", fingers: "14" },
  },
  {
    key: "blue",
    label: "Blue - Week 9",
    dot: "bg-blue-500",
    borderColor: "#3b82f6",
    avgHands: "9.1",
    subBasal: { grade: "40.5", length: "23.1", fingers: "20" },
    apical: { grade: "37.4", length: "21.5", fingers: "16" },
  },
  {
    key: "red",
    label: "Red - Week 10",
    dot: "bg-red-500",
    borderColor: "#ef4444",
    avgHands: "7.8",
    subBasal: { grade: "38.0", length: "21.2", fingers: "17" },
    apical: { grade: "34.9", length: "19.5", fingers: "13" },
  },
  {
    key: "green",
    label: "Green - Week 11",
    dot: "bg-green-500",
    borderColor: "#22c55e",
    avgHands: "8.9",
    subBasal: { grade: "41.2", length: "24.0", fingers: "21" },
    apical: { grade: "38.1", length: "22.2", fingers: "15" },
  },
  {
    key: "purple",
    label: "Purple - Week 12",
    dot: "bg-purple-500",
    borderColor: "#a855f7",
    avgHands: "8.2",
    subBasal: { grade: "39.8", length: "22.9", fingers: "19" },
    apical: { grade: "36.5", length: "20.5", fingers: "14" },
  },
];

function StatBlock({ label, value }) {
  return (
    <div className="text-center p-2 bg-[#eeeeee] rounded">
      <p className="text-xs text-[#41493e] uppercase">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
}

function MeasurementGroup({ title, icon, data }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4 text-[#41493e]">
        <Icon name={icon} className="text-sm" />
        <span className="text-sm font-semibold uppercase">{title}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <StatBlock label="Grade" value={data.grade} />
        <StatBlock label="Length" value={data.length} />
        <StatBlock label="Fingers" value={data.fingers} />
      </div>
    </div>
  );
}

function RibbonCard({ ribbon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderLeftColor: ribbon.borderColor,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
          : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        transition: "all 0.3s ease",
      }}
      className="bg-white border border-[#c0c9bb] border-l-4 rounded-lg overflow-hidden flex flex-col md:flex-row"
    >
      <div className="p-6 md:w-1/4 border-b md:border-b-0 md:border-r border-[#c0c9bb] bg-[#f9f9f9]">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-3 h-3 rounded-full ${ribbon.dot}`}></div>
          <h2 className="text-lg font-medium">{ribbon.label}</h2>
        </div>
        <p className="text-[#41493e] text-xs mb-4 uppercase tracking-wider">Avg. Hands</p>
        <div className="text-5xl font-bold text-[#00450d]">{ribbon.avgHands}</div>
      </div>

      <div className="p-6 flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
        <MeasurementGroup title="Sub-basal Averages" icon="straighten" data={ribbon.subBasal} />
        <MeasurementGroup title="Apical Averages" icon="vertical_align_top" data={ribbon.apical} />
      </div>
    </div>
  );
}

export default function AveragesDashboard() {
  const [filter, setFilter] = useState("general"); // "general" | "lot"

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">Averages Dashboard</h1>
            <p className="text-[#41493e] text-base mt-1">Aggregated analytics for banana profiling zones.</p>
          </div>

          <div className="bg-[#eeeeee] flex p-1 rounded-full w-fit">
            <button
              onClick={() => setFilter("general")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === "general" ? "bg-[#00450d] text-white" : "text-[#41493e] hover:bg-[#e8e8e8]"
              }`}
            >
              General Averages
            </button>
            <button
              onClick={() => setFilter("lot")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === "lot" ? "bg-[#00450d] text-white" : "text-[#41493e] hover:bg-[#e8e8e8]"
              }`}
            >
              Filter by Lot
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filter === "general" ? (
          RIBBON_DATA.map((ribbon) => <RibbonCard key={ribbon.key} ribbon={ribbon} />)
        ) : (
          <div className="bg-white border border-[#c0c9bb] rounded-lg p-10 text-center text-[#41493e]">
            <Icon name="filter_alt" className="text-4xl mb-2" />
            <p className="font-semibold">Lot filter view</p>
            <p className="text-sm">Select a specific lot to see its averages here.</p>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#eeeeee] rounded-xl p-6 relative overflow-hidden h-48 border border-[#c0c9bb]">
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2">Yield Forecast</h3>
            <p className="text-[#41493e] text-base">
              Projected bunch weight based on current averages:{" "}
              <span className="font-bold text-[#00450d]">24.5 kg</span>
            </p>
          </div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20 pointer-events-none bg-gradient-to-tl from-[#1b5e20] to-transparent"></div>
        </div>
        <div className="bg-[#eeeeee] rounded-xl p-6 relative overflow-hidden h-48 border border-[#c0c9bb]">
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2">Zone Health Index</h3>
            <p className="text-[#41493e] text-base">
              Environmental stress levels remain <span className="font-bold text-[#755750]">Optimal</span> for Zone A.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
