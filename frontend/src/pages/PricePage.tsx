import { motion } from "framer-motion";

export default function PricePage() {
  const plans = [
    {
      title: "Basic",
      price: 199,
      duration: "per month",
      description: "Perfect for individuals getting started.",
      features: ["Track expenses", "Set budgets", "Basic reports"],
    },
    {
      title: "Pro",
      price: 499,
      duration: "per month",
      description: "Great for growing users who need more insights.",
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "Export reports",
        "Email support",
      ],
      highlighted: true, // to make this one stand out
    },
    {
      title: "Premium",
      price: 999,
      duration: "per month",
      description: "Best for power users & professionals.",
      features: [
        "Everything in Pro",
        "Unlimited accounts",
        "Priority support",
        "Custom insights",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-600 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-12">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-2xl shadow-xl p-8 text-center bg-white transition-all duration-300 ${
              plan.highlighted ? "border-4 border-yellow-400 shadow-2xl" : ""
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
            <p className="text-gray-600 mb-4">{plan.description}</p>
            <div className="text-4xl font-extrabold text-indigo-600 mb-1">
              ₹{plan.price}
            </div>
            <div className="text-gray-500 mb-6">{plan.duration}</div>
            <ul className="text-left mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                plan.highlighted
                  ? "bg-yellow-400 text-black hover:bg-yellow-500"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

