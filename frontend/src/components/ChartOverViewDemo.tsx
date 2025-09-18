
import { Card, CardContent } from "@/components/ui/card"; 
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

function ChartOverViewDemo() {
  // Sample Data
  const expensesIncome = [
    { month: "Jan", income: 4000, expenses: 2400 },
    { month: "Feb", income: 3000, expenses: 1398 },
    { month: "Mar", income: 5000, expenses: 2000 },
  ];

  const categoryData = [
    { name: "Food", value: 400 },
    { name: "Rent", value: 800 },
    { name: "Travel", value: 300 },
    { name: "Others", value: 200 },
  ];

const summaryCards = [
  {
    title: "Total Income",
    value: "₹12,500",
    color: "text-green-600",
  },
  {
    title: "Total Expenses",
    value: "₹9,200",
    color: "text-red-600",
  },
  {
    title: "Savings",
    value: "₹3,300",
    color: "text-blue-600",
  },
  {
    title: "Transactions",
    value: "124",
    color: "text-purple-600",
  },
];


  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 space-y-6">
      
       {/* Top Section: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="shadow-md bg-D-blue">
            <CardContent className="p-4">
              <h2 className="text-sm text-gray-500">{card.title}</h2>
              <p className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <Card className="shadow-md bg-D-blue">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4 text-white">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expensesIncome}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4CAF50" />
                <Bar dataKey="expenses" fill="#F44336" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-D-blue">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4 text-white">Expenses by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Trends */}
      <Card className="shadow-md bg-D-blue">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4 text-white">Daily Spending Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={expensesIncome}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="expenses" stroke="#FF5733" />
              <Line type="monotone" dataKey="income" stroke="#28A745" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChartOverViewDemo;
