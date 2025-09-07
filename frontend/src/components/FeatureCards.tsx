import { Link } from "react-router-dom";
import {
  Wallet,
  Settings,
  PieChart,
  BarChart3,
  Lightbulb,
  Target,
} from "lucide-react";

const cardData = [
    {
    title: "Track Expenses",
    description: "Easily record and monitor your daily spending to stay on top of your finances.",
    route: "/expenses",
    icon: Wallet,
    borderColor: "border-red-400",
    textColor: "text-red-500",
    img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  {
    title: "Manage Budget",
    description: "Set your monthly budget and track your progress throughout the month.",
    route: "/budget",
    icon: Settings,
    borderColor: "border-yellow-400",
    textColor: "text-yellow-500",
    img: "https://picsum.photos/id/1015/400/250", // different image
  },
  {
    title: "Check Charts",
    description: "Visualize your income, expenses, and savings with interactive charts.",
    route: "/charts",
    icon: PieChart,
    borderColor: "border-blue-400",
    textColor: "text-blue-500",
    img: "https://picsum.photos/id/1025/400/250",
  },
  {
    title: "Analyze Reports",
    description: "Get detailed reports to understand your spending patterns better.",
    route: "/reports",
    icon: BarChart3,
    borderColor: "border-green-400",
    textColor: "text-green-500",
    img: "https://picsum.photos/id/1035/400/250",
  },
  {
    title: "Set Goals",
    description: "Define savings or investment goals and track your journey towards achieving them.",
    route: "/goals",
    icon: Target,
    borderColor: "border-purple-400",
    textColor: "text-purple-500",
    img: "https://picsum.photos/id/1045/400/250",
  },
  {
    title: "View Insights",
    description: "Discover personalized tips and insights to improve your financial habits.",
    route: "/insights",
    icon: Lightbulb,
    borderColor: "border-indigo-400",
    textColor: "text-indigo-500",
    img: "https://picsum.photos/id/1055/400/250",
  }
]

// export function FeatureCards() {
//   return (
//     <div className="bg-D-blue flex flex-wrap justify-center gap-6 p-6">
//       {/* Track Expenses */}
//       <Link
//         to="/expenses"
//         className="card w-80 bg-base-100 shadow-lg border-t-4 border-red-400 hover:shadow-xl transition-all"
//       >
//         <figure className="px-10 pt-10">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center cursor-pointer">
//           <Wallet className="w-12 h-12 text-red-500 mb-3" />
//           <h2 className="card-title text-red-500">Track Expenses</h2>
//           <p className="text-gray-600">
//             Easily record and monitor your daily spending to stay on top of your
//             finances.
//           </p>
//         </div>
//       </Link>

//       {/* Manage Budget */}
//       <Link
//         to="/budget"
//         className="card w-80 bg-base-100 shadow-lg border-t-4 border-yellow-400 hover:shadow-xl transition-all"
//       >
//         <figure className="px-10 pt-10">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center cursor-pointer">
//           <Settings className="w-12 h-12 text-yellow-500 mb-3" />
//           <h2 className="card-title text-yellow-500">Manage Budget</h2>
//           <p className="text-gray-600">
//             Set your monthly budget and track your progress throughout the
//             month.
//           </p>
//         </div>
//       </Link>

//       {/* Check Charts */}
//       <Link
//         to="/charts"
//         className="card w-80 bg-base-100 shadow-lg border-t-4 border-blue-400 hover:shadow-xl transition-all"
//       >
//         <figure className="px-10 pt-10">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center cursor-pointer">
//           <PieChart className="w-12 h-12 text-blue-500 mb-3" />
//           <h2 className="card-title text-blue-500">Check Charts</h2>
//           <p className="text-gray-600">
//             Visualize your income, expenses, and savings with interactive
//             charts.
//           </p>
//         </div>
//       </Link>

//       {/* Analyze Reports */}
//       <Link
//         to="/reports"
//         className="card w-80 bg-base-100 shadow-lg border-t-4 border-green-400 hover:shadow-xl transition-all"
//       >
//         <figure className="px-10 pt-10">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center cursor-pointer">
//           <BarChart3 className="w-12 h-12 text-green-500 mb-3" />
//           <h2 className="card-title text-green-500">Analyze Reports</h2>
//           <p className="text-gray-600">
//             Get detailed reports to understand your spending patterns better.
//           </p>
//         </div>
//       </Link>
//       {/* Set Goals */}
//       <Link
//         to="/goals"
//         className="card w-80 bg-base-100 shadow-lg border-t-4 border-purple-400 hover:shadow-xl transition-all"
//       >
//         <figure className="px-10 pt-10">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center cursor-pointer">
//           <Target className="w-12 h-12 text-purple-500 mb-3" />
//           <h2 className="card-title text-purple-500">Set Goals</h2>
//           <p className="text-gray-600">
//             Define savings or investment goals and track your journey towards
//             achieving them.
//           </p>
//         </div>
//       </Link>

//       {/* View Insights */}
//       <Link
//         to="/insights"
//         className="card w-80 bg-base-100 shadow-lg border-t-4 border-indigo-400 hover:shadow-xl transition-all"
//       >
//         <figure className="px-10 pt-10">
//           <img
//             src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//             alt="Shoes"
//             className="rounded-xl"
//           />
//         </figure>
//         <div className="card-body items-center text-center cursor-pointer">
//           <Lightbulb className="w-12 h-12 text-indigo-500 mb-3" />
//           <h2 className="card-title text-indigo-500">View Insights</h2>
//           <p className="text-gray-600">
//             Discover personalized tips and insights to improve your financial
//             habits.
//           </p>
//         </div>
//       </Link>
//     </div>
//   );
// }

export function FeatureCards(){
   
        <div className="bg-D-blue flex flex-wrap justify-center gap-6 p-6">
            {cardData.map((card,index)=>{
                return(

            <Link 
            key={index}
            to={card.route}
            className={`card w-80 bg-base-100 shadow-lg border-t-4 ${card.borderColor} hover:shadow-xl transition-all `}
            >

            </Link>
                )
            })}

        </div>
    
}