import { motion } from "framer-motion";

export default function PricePage() {
  const plans = [
    {
      title: "Basic",
      price: 199,
      duration: "per month",
      description: "Perfect for individuals getting started.",
      features: ["Track expenses", "Set budgets", "Basic reports"],
      details:
        "The Basic plan is best suited for individuals who are just starting out with money management. It includes essential features like expense tracking and budgeting, giving you a solid foundation.",
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
      highlighted: true,
      details:
        "The Pro plan is ideal for growing users who need deeper insights into their spending. With advanced analytics, report exporting, and email support, it helps you stay on top of your finances with more control.",
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
      details:
        "The Premium plan is designed for power users and professionals who want the most flexibility. Get unlimited accounts, custom insights, and priority support to supercharge your financial management.",
    },
  ];

  return (
    <div className="min-h-screen bg flex flex-col items-center justify-center p-6">
      {/* Pricing cards */}
      <h1 className="text-4xl font-bold text-white mb-12">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full ">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`rounded-2xl shadow-xl p-8 text-center flex flex-col justify-between bg-D-blue transition-all duration-300 bg-[#0f172a] text-white ${
              plan.highlighted ? "border-4 border-yellow-400 shadow-2xl" : ""
            }`}
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
              <p className="text-gray-300 mb-4">{plan.description}</p>
              <div className="text-4xl font-extrabold text-cyan-500 mb-1">
                ₹{plan.price}
              </div>
              <div className="text-gray-400 mb-6">{plan.duration}</div>
              <ul className="text-left mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-green-400">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted ? "btn-L-blue" : "btn-D-blue"
                }`}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Plan details */}
      <div className="max-w-5xl w-full mt-16 ">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Plan Details
        </h2>
        <div className="space-y-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className=" bg-D-blue rounded-xl p-6 shadow-md text-left text-white"
            >
              <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
              <p className="text-gray-300">{plan.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


