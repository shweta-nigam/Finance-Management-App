import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const data = [
  { month: "Jan", expense: 400, income: 2400 },
  { month: "Feb", expense: 300, income: 2210 },
  { month: "Mar", expense: 200, income: 2290 },
  { month: "Apr", expense: 278, income: 2000 },
  { month: "May", expense: 189, income: 2181 },
];

const pieData = [
  { name: "Food", value: 400 },
  { name: "Rent", value: 700 },
  { name: "Travel", value: 300 },
  { name: "Savings", value: 600 },
];
const COLORS = ["#00c6ff", "#ff5f6d", "#ffc658", "#4caf50"];

export default function Charts() {
  // different backgrounds for each chart card
  const backgrounds = [
    "bg-gradient-to-br from-gray-800 to-gray-900",
    "bg-gradient-to-br from-[#1e3c72] to-[#2a5298]",
    "bg-gradient-to-br from-[#232526] to-[#414345]",
    "bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]",
  ];

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg text-white">
      <motion.div
        className="flex flex-col items-center pr-6 text-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4">Visualize Your Money</h2>
        <p className="text-gray-400 max-w-lg mb-8 text-center">
          Get interactive insights with charts and reports to understand your
          spending patterns.
        </p>
        <Link
          to="/dashboard/overview"
          className="mt-6 transition btn-D-blue btn-D-blue:hover"
        >
          See charts
        </Link>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {[
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="income" stroke="#00c6ff" />
            <Line type="monotone" dataKey="expense" stroke="#ff5f6d" />
          </LineChart>,

          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00c6ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#00c6ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff5f6d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff5f6d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#00c6ff"
              fill="url(#colorIncome)"
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ff5f6d"
              fill="url(#colorExpense)"
              isAnimationActive
            />
          </AreaChart>,

          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00c6ff" isAnimationActive />
            <Bar dataKey="expense" fill="#ff5f6d" isAnimationActive />
          </BarChart>,

          <PieChart>
            <Tooltip />
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              label
              isAnimationActive
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>,
        ].map((chart, index) => (
          <motion.div
            key={index}
            className={`${backgrounds[index]} rounded-xl shadow p-2`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <ResponsiveContainer width="100%" height={200}>
              {chart}
            </ResponsiveContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
