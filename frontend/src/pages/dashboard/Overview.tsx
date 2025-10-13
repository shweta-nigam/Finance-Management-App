
import { Card, CardContent } from "@/components/ui/card"; 
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import dayjs from "dayjs"
import useExpense from "@/context/ExpenseContext";
import useBudget from "@/context/BudgetContext";

function Overview() {
  const { expenses} = useExpense()
  const { budgets} = useBudget()

const totalIncome = budgets
.filter((b) => b.type === "Income")
.reduce((sum,b) => sum + b.amount,0)

const totalExpenses = expenses.reduce((sum,e)=> sum + e.amount,0 )
const savings = totalIncome - totalExpenses;
const totalTransactions = expenses.length

const summaryCards = [
  {
    title: "Total Income",
    value: `₹${totalIncome.toLocaleString()}`,
    color: "text-green-600",
  },
  {
    title: "Total Expenses",
    value:`₹${totalExpenses.toLocaleString()}`,
    color: "text-red-600",
  },
  {
    title: "Savings",
    value: `₹${savings.toLocaleString()}`,
    color: "text-blue-600",
  },
  {
    title: "Transactions",
    value: `₹${totalTransactions.toLocaleString()}`,
    color: "text-purple-600",
  },
];

const monthlyData = budgets.map((b)=> {
  month: dayjs(b.date).format("MMM"),
  income: budgets
  .filter((x)=> x.type === "Income" && dayjs(x.date).formate("MMM") === dayjs(b.date).formate("MMM"))
  .reduce((a,x) => a + x.amount, 0),
  expenses: expenses
  .filter((x)=> dayjs(x.date).format("MMM")=== dayjs(b.date).format("MMM"))
  .reduce((a,x)=> a + x.amount, 0)
})

const categoryData = expenses.reduce((acc: any[], e) => {
    const existing = acc.find((x) => x.name === e.category?.title);
    if (existing) existing.value += e.amount;
    else acc.push({ name: e.category?.title || "Others", value: e.amount });
    return acc;
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

 return (
    <div className="p-6 space-y-6">
      {/* Top Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {summaryCards.map((card, i) => (
          <Card key={i} className="shadow-md bg-D-blue">
            <CardContent className="p-4">
              <h2 className="text-sm text-gray-400">{card.title}</h2>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md bg-D-blue">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-4 text-white">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
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
                <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // return (
  //   <div className="p-6 space-y-6">
      
  //      {/* Top Section: Summary Cards */}
  //     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  //       {summaryCards.map((card, index) => (
  //         <Card key={index} className="shadow-md bg-D-blue">
  //           <CardContent className="p-4">
  //             <h2 className="text-sm text-gray-500">{card.title}</h2>
  //             <p className={`text-2xl font-bold ${card.color}`}>
  //               {card.value}
  //             </p>
  //           </CardContent>
  //         </Card>
  //       ))}
  //     </div>

  //     {/* Middle Section: Charts */}
  //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
  //       <Card className="shadow-md bg-D-blue">
  //         <CardContent className="p-4">
  //           <h2 className="font-semibold mb-4 text-white">Income vs Expenses</h2>
  //           <ResponsiveContainer width="100%" height={250}>
  //             <BarChart data={expensesIncome}>
  //               <XAxis dataKey="month" />
  //               <YAxis />
  //               <Tooltip />
  //               <Legend />
  //               <Bar dataKey="income" fill="#4CAF50" />
  //               <Bar dataKey="expenses" fill="#F44336" />
  //             </BarChart>
  //           </ResponsiveContainer>
  //         </CardContent>
  //       </Card>

  //       <Card className="shadow-md bg-D-blue">
  //         <CardContent className="p-4">
  //           <h2 className="font-semibold mb-4 text-white">Expenses by Category</h2>
  //           <ResponsiveContainer width="100%" height={250}>
  //             <PieChart>
  //               <Pie
  //                 data={categoryData}
  //                 cx="50%"
  //                 cy="50%"
  //                 labelLine={false}
  //                 outerRadius={80}
  //                 fill="#8884d8"
  //                 dataKey="value"
  //                 label
  //               >
  //                 {categoryData.map((entry, index) => (
  //                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //                 ))}
  //               </Pie>
  //               <Tooltip />
  //             </PieChart>
  //           </ResponsiveContainer>
  //         </CardContent>
  //       </Card>
  //     </div>

  //     {/* Bottom Section: Trends */}
  //     <Card className="shadow-md bg-D-blue">
  //       <CardContent className="p-4">
  //         <h2 className="font-semibold mb-4 text-white">Daily Spending Trend</h2>
  //         <ResponsiveContainer width="100%" height={250}>
  //           <LineChart data={expensesIncome}>
  //             <XAxis dataKey="month" />
  //             <YAxis />
  //             <Tooltip />
  //             <Line type="monotone" dataKey="expenses" stroke="#FF5733" />
  //             <Line type="monotone" dataKey="income" stroke="#28A745" />
  //           </LineChart>
  //         </ResponsiveContainer>
  //       </CardContent>
  //     </Card>
  //   </div>
  // );
}

export default Overview;
