"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";
import { Shield, Activity, Users, AlertTriangle, Settings, FileText, Lock } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await apiClient.getOverviewStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Monitor your server security in real-time</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Modules"
          value={stats?.modules?.total || 0}
          icon={<Shield className="w-6 h-6" />}
          color="purple"
        />
        <StatCard
          title="Active Modules"
          value={stats?.modules?.enabled || 0}
          icon={<Activity className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Security Events (24h)"
          value={stats?.audit?.recent24h || 0}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="yellow"
        />
        <StatCard
          title="Active Violations"
          value={stats?.security?.trackedViolators || 0}
          icon={<Users className="w-6 h-6" />}
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickAction
            title="Modules"
            description="Configure security modules"
            icon={<Settings className="w-5 h-5" />}
            onClick={() => router.push("/dashboard/modules")}
          />
          <QuickAction
            title="Audit Logs"
            description="View security events"
            icon={<FileText className="w-5 h-5" />}
            onClick={() => router.push("/dashboard/audit")}
          />
          <QuickAction
            title="Configuration"
            description="Manage settings"
            icon={<Lock className="w-5 h-5" />}
            onClick={() => router.push("/dashboard/config")}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Security Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Events by Type</h3>
            <div className="space-y-2">
              {stats?.audit?.byType &&
                Object.entries(stats.audit.byType).map(([type, count]: any) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize">{type}</span>
                    <span className="text-white font-semibold">{count}</span>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Events by Module</h3>
            <div className="space-y-2">
              {stats?.audit?.byModule &&
                Object.entries(stats.audit.byModule).slice(0, 5).map(([module, count]: any) => (
                  <div key={module} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize">{module}</span>
                    <span className="text-white font-semibold">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  const colorClasses = {
    purple: "bg-purple-900/50 text-purple-400",
    green: "bg-green-900/50 text-green-400",
    yellow: "bg-yellow-900/50 text-yellow-400",
    red: "bg-red-900/50 text-red-400",
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}

function QuickAction({ title, description, icon, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-left transition duration-200"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="text-purple-400">{icon}</div>
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </button>
  );
}
