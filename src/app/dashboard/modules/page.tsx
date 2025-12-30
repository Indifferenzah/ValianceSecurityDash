"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Shield, Power, Settings } from "lucide-react";

export default function ModulesPage() {
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModules();
  }, []);

  async function loadModules() {
    try {
      const data = await apiClient.getModules();
      setModules(data.modules || []);
    } catch (error) {
      console.error("Failed to load modules:", error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleModule(name: string, enabled: boolean) {
    try {
      if (enabled) {
        await apiClient.disableModule(name);
      } else {
        await apiClient.enableModule(name);
      }
      await loadModules();
    } catch (error) {
      console.error("Failed to toggle module:", error);
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
        <h1 className="text-3xl font-bold text-white mb-2">Security Modules</h1>
        <p className="text-gray-400">Configure protection modules for your server</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.name}
            className={`bg-gray-800 rounded-lg p-6 border-2 transition-all ${
              module.enabled ? "border-green-500" : "border-gray-700"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    module.enabled ? "bg-green-900/50 text-green-400" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-semibold capitalize">
                    {module.name.replace(/^anti/, "Anti-")}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      module.enabled
                        ? "bg-green-900/50 text-green-400"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {module.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4">{module.description}</p>

            <div className="flex gap-2">
              <button
                onClick={() => toggleModule(module.name, module.enabled)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  module.enabled
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                <Power className="w-4 h-4 inline mr-2" />
                {module.enabled ? "Disable" : "Enable"}
              </button>
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
                title="Configure"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
