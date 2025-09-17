import { Link } from "react-router-dom";
import {
  Wallet,
  Settings,
  PieChart,
  BarChart3,
  Lightbulb,
  Target,
} from "lucide-react";

type Card = {
  title: string;
  description: string;
  route: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  borderColor: string;
  textColor: string;
  img: string;
};

const cardData: Card[] = [
  {
    title: "Track Expenses",
    description:
      "Easily record and monitor your daily spending to stay on top of your finances.",
    route: "/expenses",
    icon: Wallet,
    borderColor: "border-red-400",
    textColor: "text-red-500",
    img: "/assets/img1.webp",
  },
  {
    title: "Manage Budget",
    description:
      "Set your monthly budget and track your progress throughout the month.",
    route: "/budget",
    icon: Settings,
    borderColor: "border-yellow-400",
    textColor: "text-yellow-500",
    img: "/assets/img2.webp", // different image
  },
  {
    title: "Check Charts",
    description:
      "Visualize your income, expenses, and savings with interactive charts.",
    route: "/charts",
    icon: PieChart,
    borderColor: "border-blue-400",
    textColor: "text-blue-500",
    img: "/assets/img3-1.webp",
  },
  {
    title: "Analyze Reports",
    description:
      "Get detailed reports to understand your spending patterns better.",
    route: "/reports",
    icon: BarChart3,
    borderColor: "border-green-400",
    textColor: "text-green-500",
    img: "/assets/img4.webp",
  },
  {
    title: "Set Goals",
    description:
      "Define savings or investment goals and track your journey towards achieving them.",
    route: "/goals",
    icon: Target,
    borderColor: "border-purple-400",
    textColor: "text-purple-500",
    img: "/assets/img5.webp",
  },
  {
    title: "View Insights",
    description:
      "Discover personalized tips and insights to improve your financial habits.",
    route: "/insights",
    icon: Lightbulb,
    borderColor: "border-indigo-400",
    textColor: "text-indigo-500",
    img: "/assets/img6.webp",
  },
];

export function FeatureCards() {
  return (
    <div className="bg-D-blue flex flex-wrap justify-center gap-6 p-6">
      {cardData.map((card, index) => {
        const Icon = card.icon;
        return (
          <Link
            key={index}
            to={card.route}
            className={`card w-80 bg-base-100 shadow-lg border-t-4 ${card.borderColor} hover:shadow-xl hover:scale-105 transform transition-transform duration-300 p-5`}
          >
            <figure className="px-10 pt-10">
              <img src={card.img} alt={card.title} className="rounded-xl text-white" />
            </figure>
            <div className="card-body items-center cursor-pointer">
              <Icon className={`w-12 h-12 ${card.textColor} mb-3`} />
              <h2 className={`card-title ${card.textColor}`}>{card.title}</h2>
              <p className="text-white">{card.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
