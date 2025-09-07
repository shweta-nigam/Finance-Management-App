import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    text: "I finally know where my money goes every month. Amazing app!",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "The charts and reports are life savers for budgeting.",
    name: "Larry Brown",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    text: "Setting savings goals has never been this easy.",
    name: "Daniel Carter",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    text: "Simple, clean, and powerful. Perfect for tracking expenses.",
    name: "Sophia Miller",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "My financial life feels under control for the first time.",
    name: "Emma Davis",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  {
    text: "The insights helped me cut down unnecessary spending.",
    name: "Michael Lee",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    text: "Finally, an app that makes money management enjoyable.",
    name: "Olivia Wilson",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    text: "My savings doubled in just 3 months thanks to FinEase.",
    name: "Ethan Taylor",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-10">
      <h2 className="text-4xl font-bold mb-4">What Users Say</h2>
      <p className="max-w-xl text-center mb-10 text-lg">
        Thousands of people are already managing money smarter with FinEase.
      </p>

      {/* Cards Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-white shadow-md"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/64x64.png?text=User")
              }
            />
            <p className="text-sm italic">“{t.text}”</p>
            <p className="mt-4 font-semibold">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
