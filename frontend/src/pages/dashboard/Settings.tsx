import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Moon,
  Bell,
  Database,
  LayoutDashboard,
  Palette,
} from "lucide-react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [defaultPage, setDefaultPage] = useState("overview");
  const [chartType, setChartType] = useState("bar");
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-[rgba(0,36,31,1)] via-[rgba(84,9,121,1)] to-[rgba(0,102,255,1)] px-4 py-2 rounded-md shadow-md">
          App Settings
        </h1>
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-[rgba(0,36,31,1)] via-[rgba(84,9,121,1)] to-[rgba(0,102,255,1)] text-white shadow-md hover:opacity-90 transition-all"
        >
          Save Settings
        </Button>
      </div>

      {/* Theme Preferences */}
      <Card className="bg-[#0b1120] border border-gray-700 hover:shadow-lg transition-all rounded-xl">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Palette className="text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              Theme Preferences
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Display */}
      <Card className="bg-[#0b1120] border border-gray-700 hover:shadow-lg transition-all rounded-xl">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              Dashboard Display
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Default Page</span>
              <Select value={defaultPage} onValueChange={setDefaultPage}>
                <SelectTrigger className="w-44 bg-[#1a1f35] border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Page" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f35] text-white border-gray-700">
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="goals">Goals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Default Chart Type</span>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-44 bg-[#1a1f35] border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Chart" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1f35] text-white border-gray-700">
                  <SelectItem value="bar">Bar</SelectItem>
                  <SelectItem value="pie">Pie</SelectItem>
                  <SelectItem value="line">Line</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="bg-[#0b1120] border border-gray-700 hover:shadow-lg transition-all rounded-xl">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Bell className="text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Enable Budget Alerts</span>
            <Switch checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Data Preferences */}
      <Card className="bg-[#0b1120] border border-gray-700 hover:shadow-lg transition-all rounded-xl">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Database className="text-blue-400" />
            <h2 className="text-xl font-semibold text-white">
              Data Preferences
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Currency</span>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-44 bg-[#1a1f35] border-gray-600 text-white focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f35] text-white border-gray-700">
                <SelectItem value="INR">₹ INR</SelectItem>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="EUR">€ EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
