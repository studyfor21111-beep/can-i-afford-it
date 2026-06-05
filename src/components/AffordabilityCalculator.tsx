"use client";
import { useState, useTransition, Suspense, lazy } from "react";
import { runAffordabilityCheck, type AffordabilityResult, type CalculatorInput } from "@/lib/calculator";

const AffordabilityChart = lazy(() =>
  import("./AffordabilityChart").then((m) => ({ default: m.AffordabilityChart }))
);

const CATEGORIES = [
  { value: "car", label: "🚗 Car" },
  { value: "home", label: "🏠 Home" },
  { value: "phone", label: "📱 Phone" },
  { value: "laptop", label: "💻 Laptop" },
  { value: "education", label: "🎓 Education" },
  { value: "other", label: "💡 Other" },
];

const DEFAULT: CalculatorInput = {
  monthlyIncome: 80000,
  monthlyExpenses: 30000,
  existingEMI: 0,
  savings: 200000,
  purchasePrice: 800000,
  downPaymentPct: 20,
  loanTermYears: 5,
  interestRatePct: 9,
  category: "car",
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: "var(--text3)",
          marginBottom: 6,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 4 }}>{hint}</p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg2)",
  border: "1px solid var(--border2)",
  borderRadius: "var(--radius2)",
  padding: "11px 14px",
  color: "var(--text)",
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
};

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 65 ? "#22d3a3" : score >= 40 ? "#fbbf24" : "#f87171";
  const pct = score / 100;
  const r = 50;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * pct;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={140} height={140} viewBox="0 0 140 140" aria-hidden="true">
        <circle cx={70} cy={70} r={r} fill="none" stroke="var(--bg3)" strokeWidth={14} />
        <circle
          cx={70}
          cy={70}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill={color} fontSize={28} fontWeight={800}>
          {score}
        </text>
        <text x="50%" y="66%" dominantBaseline="middle" textAnchor="middle" fill="var(--text3)" fontSize={10}>
          / 100
        </text>
      </svg>
    </div>
  );
}

export function AffordabilityCalculator() {
  const [form, setForm] = useState<CalculatorInput>(DEFAULT);
  const [result, setResult] = useState<AffordabilityResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "category" ? value : parseFloat(value) || 0,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(() => {
      const res = runAffordabilityCheck(form);
      setResult(res);
    });
  }

  const verdictColor =
    result?.verdict === "green"
      ? "#22d3a3"
      : result?.verdict === "amber"
      ? "#fbbf24"
      : "#f87171";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 24,
        alignItems: "start",
      }}
    >
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        aria-label="Affordability calculator"
        style={{
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: "var(--radius)",
          padding: 28,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: "var(--text3)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Your Information
        </p>

        <Field label="Category">
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Monthly Income (₹)" hint="Take-home, post-tax">
          <input
            type="number"
            name="monthlyIncome"
            value={form.monthlyIncome}
            onChange={handleChange}
            min={1}
            required
            style={inputStyle}
          />
        </Field>

        <Field label="Monthly Expenses (₹)" hint="Rent, food, utilities, etc.">
          <input
            type="number"
            name="monthlyExpenses"
            value={form.monthlyExpenses}
            onChange={handleChange}
            min={0}
            required
            style={inputStyle}
          />
        </Field>

        <Field label="Existing EMI (₹)" hint="Any current loan EMIs">
          <input
            type="number"
            name="existingEMI"
            value={form.existingEMI}
            onChange={handleChange}
            min={0}
            style={inputStyle}
          />
        </Field>

        <Field label="Current Savings (₹)">
          <input
            type="number"
            name="savings"
            value={form.savings}
            onChange={handleChange}
            min={0}
            style={inputStyle}
          />
        </Field>

        <Field label="Purchase Price (₹)">
          <input
            type="number"
            name="purchasePrice"
            value={form.purchasePrice}
            onChange={handleChange}
            min={1}
            required
            style={inputStyle}
          />
        </Field>

        <Field label={`Down Payment: ${form.downPaymentPct}%`}>
          <input
            type="range"
            name="downPaymentPct"
            value={form.downPaymentPct}
            onChange={handleChange}
            min={5}
            max={80}
            step={5}
            style={{ width: "100%", accentColor: "var(--accent)" }}
            aria-valuenow={form.downPaymentPct}
            aria-valuemin={5}
            aria-valuemax={80}
          />
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Loan (years)">
            <input
              type="number"
              name="loanTermYears"
              value={form.loanTermYears}
              onChange={handleChange}
              min={1}
              max={30}
              style={inputStyle}
            />
          </Field>
          <Field label="Rate (% p.a.)">
            <input
              type="number"
              name="interestRatePct"
              value={form.interestRatePct}
              onChange={handleChange}
              min={0}
              max={30}
              step={0.1}
              style={inputStyle}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 30,
            background: "linear-gradient(135deg,#6c63ff,#a78bfa)",
            color: "#fff",
            border: "none",
            fontWeight: 700,
            fontSize: 15,
            cursor: isPending ? "not-allowed" : "pointer",
            opacity: isPending ? 0.7 : 1,
            fontFamily: "inherit",
            marginTop: 8,
            transition: "opacity 0.2s",
          }}
        >
          {isPending ? "Calculating…" : "⚡ Check Affordability"}
        </button>
      </form>

      {/* Result */}
      {result ? (
        <div aria-live="polite" aria-atomic="true">
          {/* Verdict */}
          <div
            style={{
              background: "var(--bg3)",
              border: `1px solid ${verdictColor}40`,
              borderRadius: "var(--radius)",
              padding: 28,
              marginBottom: 20,
              textAlign: "center",
            }}
            role="status"
          >
            <ScoreGauge score={result.score} />
            <p
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: verdictColor,
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              {result.verdictText}
            </p>
            <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>
              EMI: ₹{Math.round(result.emi).toLocaleString("en-IN")} / month
              {result.timeToAffordMonths > 0 && (
                <> · Ready in {result.timeToAffordMonths} months</>
              )}
            </p>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              { label: "Down Payment", val: `₹${result.downPayment.toLocaleString("en-IN")}` },
              { label: "Loan Amount", val: `₹${Math.round(result.loanAmount).toLocaleString("en-IN")}` },
              {
                label: "Savings After EMI",
                val: `₹${Math.round(result.savingsAfter).toLocaleString("en-IN")}`,
                warn: result.savingsAfter < 0,
              },
              { label: "Total Cost", val: `₹${Math.round(result.totalCost).toLocaleString("en-IN")}` },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--bg3)",
                  border: "1px solid var(--border2)",
                  borderRadius: "var(--radius2)",
                  padding: 16,
                }}
              >
                <p style={{ fontSize: 11, color: "var(--text3)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: 18, fontWeight: 700, color: s.warn ? "#f87171" : "var(--text)" }}>
                  {s.val}
                </p>
              </div>
            ))}
          </div>

          {/* Tips */}
          {result.tips.length > 0 && (
            <div
              style={{
                background: "var(--bg3)",
                border: "1px solid var(--border2)",
                borderRadius: "var(--radius)",
                padding: 20,
                marginBottom: 20,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>💡 Tips</p>
              <ul style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
                {result.tips.map((t, i) => (
                  <li key={i} style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Charts — lazy loaded */}
          <Suspense
            fallback={
              <div
                style={{
                  height: 260,
                  background: "var(--bg3)",
                  borderRadius: "var(--radius)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text3)",
                  fontSize: 13,
                }}
              >
                Loading charts…
              </div>
            }
          >
            <AffordabilityChart result={result} />
          </Suspense>
        </div>
      ) : (
        <div
          style={{
            background: "var(--bg3)",
            border: "1px solid var(--border2)",
            borderRadius: "var(--radius)",
            padding: 40,
            textAlign: "center",
            color: "var(--text3)",
          }}
          aria-label="Fill in the form to see your results"
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
          <p style={{ fontSize: 15, lineHeight: 1.7 }}>
            Fill in your details and click<br />
            <strong style={{ color: "var(--accent2)" }}>Check Affordability</strong> to see your personalised report.
          </p>
        </div>
      )}
    </div>
  );
}
