import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import { useTheme } from "../../Contexts/ThemeContext";

// --- Utils ---
const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

// --- Components ---

export const RevenueChart = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (!data || data.length === 0) {
        return (
            <div
                className={`h-full flex items-center justify-center text-sm ${
                    isDark ? "text-gray-500" : "text-gray-400"
                }`}
            >
                Belum ada data pendapatan
            </div>
        );
    }

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#0ea5e9"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#0ea5e9"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? "#374151" : "#f1f5f9"} // gray-700 : slate-100
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: isDark ? "#9ca3af" : "#64748b",
                            fontSize: 12,
                        }} // gray-400 : slate-500
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fill: isDark ? "#9ca3af" : "#64748b",
                            fontSize: 12,
                        }}
                        tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <Tooltip
                        formatter={(value, name) => [
                            name === "revenue" ? formatCurrency(value) : value,
                            name === "revenue" ? "Pendapatan" : "Penjualan",
                        ]}
                        contentStyle={{
                            backgroundColor: isDark ? "#1f2937" : "#ffffff", // gray-800 : white
                            borderRadius: "12px",
                            border: isDark ? "1px solid #374151" : "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            color: isDark ? "#f3f4f6" : "#1e293b",
                        }}
                        itemStyle={{ color: isDark ? "#e5e7eb" : "#334155" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0ea5e9"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const StatusPieChart = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (!data || data.length === 0) {
        return (
            <div
                className={`h-full flex items-center justify-center text-sm ${
                    isDark ? "text-gray-500" : "text-gray-400"
                }`}
            >
                Belum ada data status
            </div>
        );
    }

    // Map status to colors
    const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#6b7280"];

    // Custom Label
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
        const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                className="text-xs font-bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? "#1f2937" : "#ffffff",
                            borderRadius: "12px",
                            border: isDark ? "1px solid #374151" : "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            color: isDark ? "#f3f4f6" : "#1e293b",
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                            <span
                                className={
                                    isDark ? "text-gray-300" : "text-gray-600"
                                }
                            >
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
