import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl flex items-start justify-between transition-transform hover:-translate-y-1 hover:shadow-2xl">
      <div>
        <p className="text-white/70 font-medium text-sm mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-white">{value}</h4>
        {trend && (
          <p className={`text-sm mt-2 font-medium ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
      </div>
      <div className="p-3 bg-white/10 rounded-xl text-white">
        {icon}
      </div>
    </div>
  );
}
