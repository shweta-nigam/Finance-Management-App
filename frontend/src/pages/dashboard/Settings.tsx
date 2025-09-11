import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [defaultPage, setDefaultPage] = useState("overview");
  const [chartType, setChartType] = useState("bar");
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-transparent bg-clip-text">
        App Settings
      </h1>

      {/* Theme Settings */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Theme Preferences</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Display */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Dashboard Display</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Default Page</span>
              <Select value={defaultPage} onValueChange={setDefaultPage}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="goals">Goals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <span>Default Chart Type</span>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Chart" />
                </SelectTrigger>
                <SelectContent>
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
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Notifications</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable Budget Alerts</span>
            <Switch checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Data Preferences */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Data Preferences</h2>
          <div className="flex justify-between items-center">
            <span>Currency</span>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">₹ INR</SelectItem>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="EUR">€ EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white w-full">
        Save Settings
      </Button>
    </div>
  );
}

export default Settings;
