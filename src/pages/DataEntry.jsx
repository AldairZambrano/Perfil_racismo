import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

const RIBBON_OPTIONS = [
  { value: "Yellow", label: "Yellow / 8", dot: "bg-yellow-400" },
  { value: "Blue", label: "Blue / 9", dot: "bg-blue-500" },
  { value: "Red", label: "Red / 10", dot: "bg-red-600" },
  { value: "Green", label: "Green / 11", dot: "bg-green-600" },
  { value: "Purple", label: "Purple / 12", dot: "bg-purple-600" },
];

function HandMeasurementCard({ title, icon, accentClass, values, onChange }) {
  const handleField = (field) => (e) => {
    onChange({ ...values, [field]: e.target.value });
  };

  return (
    <section className="bg-white border border-[#c0c9bb] p-4 rounded-lg relative overflow-hidden">
      <div className={`absolute left-0 top-0 w-1 h-full ${accentClass}`}></div>
      <h3 className="font-semibold text-sm text-[#41493e] mb-6 flex items-center gap-2">
        <Icon name={icon} className="text-[20px]" />
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#41493e] block">Grade (mm)</label>
          <input
            className="w-full h-12 px-4 bg-transparent border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg text-base transition-all outline-none"
            placeholder="38.5"
            step="0.1"
            type="number"
            value={values.grade}
            onChange={handleField("grade")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#41493e] block">Length (cm)</label>
          <input
            className="w-full h-12 px-4 bg-transparent border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg text-base transition-all outline-none"
            placeholder="22.0"
            step="0.5"
            type="number"
            value={values.length}
            onChange={handleField("length")}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#41493e] block">Number of Fingers</label>
          <input
            className="w-full h-12 px-4 bg-transparent border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg text-base transition-all outline-none"
            placeholder="18"
            type="number"
            value={values.fingers}
            onChange={handleField("fingers")}
          />
        </div>
      </div>
    </section>
  );
}

const EMPTY_FORM = {
  lotNumber: "",
  numHands: "",
  ribbon: "",
  subBasal: { grade: "", length: "", fingers: "" },
  apical: { grade: "", length: "", fingers: "" },
};

export default function DataEntry() {
  const { user } = useAuth();
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSaveState("saving");

    try {
      await addDoc(collection(db, "profiles"), {
        lotNumber: form.lotNumber,
        numHands: form.numHands,
        ribbon: form.ribbon,
        subBasal: form.subBasal,
        apical: form.apical,
        createdBy: user?.uid ?? null,
        createdAt: serverTimestamp(),
      });

      setSaveState("saved");
      setForm(EMPTY_FORM);
      setTimeout(() => setSaveState("idle"), 2000);
    } catch (err) {
      console.error("Error guardando el perfil:", err);
      setErrorMsg("No se pudo guardar el perfil. Intenta de nuevo.");
      setSaveState("error");
    }
  };

  const saveButtonContent = () => {
    if (saveState === "saving") {
      return (
        <>
          <Icon name="sync" className="animate-spin" />
          Saving...
        </>
      );
    }
    if (saveState === "saved") {
      return (
        <>
          <Icon name="check_circle" />
          Profile Saved
        </>
      );
    }
    if (saveState === "error") {
      return (
        <>
          <Icon name="error" />
          Retry Save
        </>
      );
    }
    return (
      <>
        <Icon name="save" filled />
        Save Profile
      </>
    );
  };

  return (
    <>
      <header className="mb-4">
        <h2 className="text-xl font-medium text-[#00450d]">Banana Bunch Profiling</h2>
        <p className="text-xs text-[#41493e]">Complete all required fields for accurate zone assessment.</p>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* General Information */}
        <section className="bg-white border border-[#c0c9bb] p-4 rounded-lg">
          <h3 className="font-semibold text-sm text-[#41493e] mb-4 flex items-center gap-2">
            <Icon name="info" className="text-[20px]" />
            General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#41493e] block" htmlFor="lot_number">
                Lot Number
              </label>
              <input
                id="lot_number"
                className="w-full h-12 px-4 bg-transparent border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg text-base transition-all outline-none"
                placeholder="e.g. A204-5"
                type="text"
                value={form.lotNumber}
                onChange={(e) => setForm({ ...form, lotNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#41493e] block" htmlFor="num_hands">
                Number of Hands
              </label>
              <input
                id="num_hands"
                className="w-full h-12 px-4 bg-transparent border border-[#717a6d] focus:border-[#00450d] focus:ring-1 focus:ring-[#00450d] rounded-lg text-base transition-all outline-none"
                placeholder="0"
                type="number"
                value={form.numHands}
                onChange={(e) => setForm({ ...form, numHands: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="text-xs font-medium text-[#41493e] block">Ribbon Color / Week</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {RIBBON_OPTIONS.map((opt) => {
                const checked = form.ribbon === opt.value;
                return (
                  <label key={opt.value} className="relative cursor-pointer group">
                    <input
                      className="peer sr-only"
                      name="ribbon"
                      type="radio"
                      value={opt.value}
                      checked={checked}
                      onChange={() => setForm({ ...form, ribbon: opt.value })}
                    />
                    <div
                      className={`flex items-center justify-center gap-2 p-3 border rounded-lg transition-all hover:bg-[#f3f3f3] ${
                        checked ? "border-[#00450d] bg-[#f3f3f3]" : "border-[#c0c9bb]"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border border-black/10 ${opt.dot}`}></span>
                      <span className="text-xs font-medium">{opt.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </section>

        <HandMeasurementCard
          title="Sub-basal Hand"
          icon="straighten"
          accentClass="bg-[#1b5e20]"
          values={form.subBasal}
          onChange={(vals) => setForm({ ...form, subBasal: vals })}
        />

        <HandMeasurementCard
          title="Apical Hand"
          icon="analytics"
          accentClass="bg-[#ffd7ce]"
          values={form.apical}
          onChange={(vals) => setForm({ ...form, apical: vals })}
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={saveState === "saving"}
            className={`w-full md:w-auto md:px-12 h-12 font-semibold text-sm rounded-full shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white ${
              saveState === "saved"
                ? "bg-green-700"
                : saveState === "error"
                ? "bg-[#ba1a1a] hover:bg-[#93000a]"
                : "bg-[#00450d] hover:bg-[#1b5e20]"
            }`}
          >
            {saveButtonContent()}
          </button>
          {errorMsg && <p className="text-sm text-[#ba1a1a] mt-2">{errorMsg}</p>}
        </div>
      </form>

      <div className="mt-12 rounded-xl overflow-hidden h-48 relative border border-[#c0c9bb] bg-gradient-to-br from-[#1b5e20] to-[#00450d]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00450d]/70 to-transparent"></div>
        <div className="absolute bottom-4 left-6 text-white">
          <p className="text-2xl font-bold">Field Precision</p>
          <p className="text-xs opacity-90">Recording data for a sustainable harvest.</p>
        </div>
      </div>
    </>
  );
}