import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import Icon from "../components/Icon";

const RIBBON_META = {
  Red: {
    dot: "bg-[#ba1a1a]",
    ring: "ring-[#ffdad6]",
    bar: "bg-[#ba1a1a]",
    badgeBg: "bg-[#ffdad6]",
    badgeText: "text-[#93000a]",
    label: "Critical",
    priorityText: "text-[#ba1a1a]",
  },
  Yellow: {
    dot: "bg-[#f8bd2a]",
    ring: "ring-[#694d00]",
    bar: "bg-[#f8bd2a]",
    badgeBg: "bg-[#694d00]",
    badgeText: "text-[#f6bc28]",
    label: "Monitoring",
    priorityText: "text-[#4c3700]",
  },
  Green: {
    dot: "bg-[#2a6b2c]",
    ring: "ring-[#90d689]",
    bar: "bg-[#2a6b2c]",
    badgeBg: "bg-[#1b5e20]",
    badgeText: "text-[#90d689]",
    label: "Healthy",
    priorityText: "text-[#00450d]",
  },
  Blue: {
    dot: "bg-blue-500",
    ring: "ring-blue-100",
    bar: "bg-blue-500",
    badgeBg: "bg-[#ffd7ce]",
    badgeText: "text-[#7a5b54]",
    label: "Growth",
    priorityText: "text-blue-700",
  },
};

function SummaryCard({ label, value, valueClass = "text-[#00450d]", big = true }) {
  return (
    <div className="bg-white border border-[#c0c9bb] p-6 rounded-xl flex flex-col gap-2">
      <span className="text-[#41493e] text-xs font-medium">{label}</span>
      <span className={`${valueClass} ${big ? "text-4xl md:text-5xl font-bold tracking-tight" : "text-2xl font-semibold"}`}>
        {value}
      </span>
    </div>
  );
}

const DEFAULT_META = {
  dot: "bg-[#755750]",
  ring: "ring-[#ffdad2]",
  bar: "bg-[#755750]",
  badgeBg: "bg-[#ffd7ce]",
  badgeText: "text-[#7a5b54]",
  label: "Registered",
  priorityText: "text-[#755750]",
};

function HistoryRow({ entry, onEdit }) {
  const meta = RIBBON_META[entry.ribbon] || DEFAULT_META;

  return (
    <div
      className="relative group hover:bg-[#f3f3f3] transition-colors duration-200 cursor-pointer"
      onClick={() => onEdit(entry)}
    >
      <div className={`absolute left-0 top-0 w-1 h-full ${meta.bar}`}></div>
      <div className="grid grid-cols-4 md:grid-cols-12 items-center px-4 md:px-6 py-4 min-h-[56px]">
        <div className="col-span-2 md:col-span-2">
          <span className="text-lg md:text-base text-[#1a1c1c]">{entry.lotNumber}</span>
          <p className="md:hidden text-xs text-[#41493e]">Lot Number</p>
        </div>

        <div className="col-span-2 md:col-span-3 flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ring-2 ${meta.dot} ${meta.ring}`}></div>
          <span className="text-xs font-medium text-[#1a1c1c] hidden md:inline">{entry.ribbon} Ribbon</span>
        </div>

        <div className="hidden md:block md:col-span-3">
          <span className="text-base text-[#1a1c1c]">{entry.time}</span>
        </div>

        <div className="hidden md:block md:col-span-3">
          <span className={`${meta.badgeBg} ${meta.badgeText} px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter`}>
            {meta.label}
          </span>
        </div>

        <div className="col-span-4 md:col-span-1 flex justify-end gap-4 md:gap-0 mt-4 md:mt-0">
          <div className="md:hidden flex-1 flex flex-col gap-1">
            <span className="text-xs text-[#41493e]">Time: {entry.time}</span>
            <span className={`text-xs font-bold ${meta.priorityText}`}>Priority: {entry.ribbon}</span>
          </div>
          <button
            aria-label="Edit Profile"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(entry);
            }}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-[#e8e8e8] text-[#00450d] transition-all active:scale-90"
          >
            <Icon name="edit" />
          </button>
        </div>
      </div>
    </div>
  );
}

function formatTime(timestamp) {
  if (!timestamp?.toDate) return "—";
  return timestamp.toDate().toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DailyHistory() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "profiles"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            lotNumber: data.lotNumber || "—",
            ribbon: data.ribbon || "Green",
            time: formatTime(data.createdAt),
          };
        });
        setEntries(docs);
        setLoading(false);
      },
      (err) => {
        console.error("Error leyendo perfiles:", err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const handleEdit = (entry) => {
    // Navega a Data Entry para editar este registro
    // (ajusta la ruta/params según cómo quieras precargar el formulario)
    navigate("/", { state: { editEntry: entry } });
  };

  const handleLoadMore = () => {
    console.log("Load older entries");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 mt-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">Daily History</h2>
          <p className="text-base text-[#41493e]">Review and edit profiling records for October 24, 2023.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#eeeeee] px-4 py-2 rounded-lg border border-[#c0c9bb] hover:bg-[#e8e8e8] transition-colors">
            <Icon name="calendar_today" className="text-[#41493e] text-sm" />
            <span className="text-xs font-medium">Today</span>
          </button>
          <button className="flex items-center gap-2 bg-[#eeeeee] px-4 py-2 rounded-lg border border-[#c0c9bb] hover:bg-[#e8e8e8] transition-colors">
            <Icon name="filter_list" className="text-[#41493e] text-sm" />
            <span className="text-xs font-medium">Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard label="Total Profiles" value={entries.length} />
        <SummaryCard label="Active Zone" value="Zone A" big={false} />
        <SummaryCard label="Efficiency" value="98%" valueClass="text-[#2a6b2c]" />
        <SummaryCard label="Last Sync" value="14:05 PM" valueClass="text-[#1a1c1c]" big={false} />
      </div>

      <div className="bg-white border border-[#c0c9bb] rounded-xl overflow-hidden">
        <div className="md:hidden p-4 border-b border-[#c0c9bb] bg-[#f3f3f3]">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#41493e]">Profile Entries</span>
        </div>
        <div className="hidden md:grid grid-cols-12 px-6 py-4 border-b border-[#c0c9bb] bg-[#f3f3f3] text-sm font-semibold text-[#41493e]">
          <div className="col-span-2">Lot Number</div>
          <div className="col-span-3">Ribbon Color</div>
          <div className="col-span-3">Time Recorded</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>
        <div className="divide-y divide-[#c0c9bb]">
          {loading && (
            <p className="text-center text-sm text-[#41493e] py-10">Cargando registros...</p>
          )}
          {!loading && entries.length === 0 && (
            <p className="text-center text-sm text-[#41493e] py-10">
              Aún no hay perfiles registrados. Crea uno desde "Data Entry".
            </p>
          )}
          {entries.map((entry) => (
            <HistoryRow key={entry.id} entry={entry} onEdit={handleEdit} />
          ))}
        </div>
      </div>

      {entries.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-[#eeeeee] text-[#41493e] border border-[#c0c9bb] px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#e8e8e8] transition-colors active:scale-95"
          >
            Load Older Entries
          </button>
        </div>
      )}
    </>
  );
}