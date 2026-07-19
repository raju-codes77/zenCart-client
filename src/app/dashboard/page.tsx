'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import StatCard from '@/components/dashboard/StatCard';
import SalesChart from '@/components/dashboard/SalesChart';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { Package, ShoppingBag, DollarSign, Star, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  avgRating: number;
  salesOverTime: { date: string; sales: number }[];
  revenueByCategory: { category: string; revenue: number }[];
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user?.role !== 'admin') {
        alert("This page is for store admins only.");
        router.push("/");
      }
    }

    if (isAuthenticated) {
      const fetchStats = async () => {
        try {
          const res = await api.get('/dashboard/stats');
          setStats(res.data);
        } catch (err: any) {
          setError(err.message || 'Failed to load dashboard stats');
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || loading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-rose-400 bg-rose-500/10 p-4 rounded-xl">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/60">Welcome back, {user?.name || 'Admin'}! Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toFixed(2)}`}
            icon={<DollarSign className="w-6 h-6" />}
            trend="+12.5%"
            trendUp={true}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={<ShoppingBag className="w-6 h-6" />}
            trend="+5.2%"
            trendUp={true}
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Package className="w-6 h-6" />}
          />
          <StatCard
            title="Average Rating"
            value={stats.avgRating.toFixed(1)}
            icon={<Star className="w-6 h-6 text-yellow-400" />}
            trend="+0.3"
            trendUp={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesChart data={stats.salesOverTime} />
          <RevenueChart data={stats.revenueByCategory} />
        </div>
      </div>
    </div>
  );
}
