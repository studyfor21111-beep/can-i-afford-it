"use client";
import dynamic from "next/dynamic";
import type { AffordabilityResult } from "@/lib/calculator";

// Dynamic import prevents SSR issues with Recharts
const ResponsiveContainer = dynamic(
  () => import("recharts").then((m) => m.ResponsiveContainer),
  { ssr: false }
);
const BarChart = dynamic(
  () => import("recharts").then((m) => m.BarChart),
  { ssr: false }
);
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const PieChart = dynamic(() => import("recharts").then((m) => m.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((m) => m.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((m) => m.Cell), { ssr: false });
const Legend = dynamic(() => import("recharts").then((m) => m.Legend), { ssr: false });

interface Props {
  result: AffordabilityResult;
}

const COLORS = ["#6c63ff", "#22d3a3", "#fbbf24", "#f87171"];

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v}`;
}

export function AffordabilityChart({ result }: Props) {
  const monthlyData = [
    { name: "Income", value: result.monthlyIncome },
    { name: "EMI", value: result.emi },
    { name: "Expenses", value: result.monthlyExpenses },
    { name: "Savings", value: result.savingsAfter },
  ];

  const pieData = [
    { name: "EMI", value: result.emi },
    { name: "Expenses", value: result.monthlyExpenses },
    { name: "Savings", value: Math.max(0, result.savingsAfter) },
    { name: "Other", value: Math.max(0, result.monthlyIncome - result.emi - result.monthlyExpenses - result.savingsAfter) },
  ].filter((d) => d.value > 0);

  return (
    <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
      {/* Bar chart */}
      <div
        style={{
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: "var(--radius)",
          padding: 20,
        }}
      >
        <h3 style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16 }}>Monthly Breakdown</h3>
        <div className="chart-container" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="name" tick={{ fill: "var(--text3)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fill: "var(--text3)", fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
              <Tooltip
                formatter={(v) => [fmt(Number(v)), ""]}
                contentStyle={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border2)",
                  borderRadius: 8,
                  color: "var(--text)",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="value" fill="#6c63ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie chart */}
      <div
        style={{
          background: "var(--bg3)",
          border: "1px solid var(--border2)",
          borderRadius: "var(--radius)",
          padding: 20,
        }}
      >
        <h3 style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16 }}>Budget Split</h3>
        <div className="chart-container" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [fmt(Number(v)), ""]}
                contentStyle={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border2)",
                  borderRadius: 8,
                  color: "var(--text)",
                  fontSize: 13,
                }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span style={{ color: "var(--text2)", fontSize: 12 }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
