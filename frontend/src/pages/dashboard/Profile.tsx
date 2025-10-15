// import UserAvatar from "@/components/UserAvatar";
// import useAuth from "@/context/AuthContext";
// import { Edit, Lock, Shield } from "lucide-react";

// export default function Profile() {
//   const { user } = useAuth();

//   if (!user) {
//     return <p className="text-xl bg text-white">Please log in to view your profile</p>;
//   }

//   return (
//     <div className="max-w-5xl mx-auto p-6 text-white">
//       {/* Profile Header */}
//       <div className="relative bg-D-blue rounded-2xl shadow-lg">
//         <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-8">
//           <UserAvatar size="w-25 h-25 text-lg" />
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-3xl font-bold">{user.name} </h2>
//             <p className="text-gray-200">{user.email}</p>
//           </div>
//           <button className="btn shadow-md mt-6 transition btn-L-blue btn-L-blue:hover">
//             <Edit className="w-4 h-4 mr-2" /> Edit Profile
//           </button>
//         </div>
//       </div>

//       {/*Information Section */}
//       <div className="bg-D-blue rounded-xl shadow-md mt-8 p-6">
//         <h3 className="text-xl font-semibold mb-6  border-b pb-3">
//           Personal Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <p className="text-gray-500 font-medium">Full Name</p>
//             <p className="text-lg font-semibold ">{user.name}</p>
//           </div>
//           <div>
//             <p className="text-gray-500 font-medium">Email</p>
//             <p className="text-lg font-semibold ">{user.email}</p>
//           </div>
//           <div>
//             <p className="text-gray-500 font-medium">username</p>
//             {/* <p className="text-lg font-semibold ">{user.username}</p> */}
//           </div>
//           <div>
//             <p className="text-gray-500 font-medium">Account Balance</p>
//             {/* <p className="text-lg font-bold text-green-600">{user.balance}</p> */}
//           </div>
//         </div>
//       </div>

//       {/* Security Settings Section */}
//       <div className="bg-D-blue rounded-xl shadow-md mt-8 p-6 text-white">
//         <h3 className="text-xl font-semibold mb-6 border-b pb-3">
//           Security Settings
//         </h3>
//         <div className="space-y-4">
//           <div className="flex justify-between items-center py-2">
//             <div className="flex items-center gap-2">
//               <Lock className="w-5 h-5 text-indigo-600" />
//               <span>Password</span>
//             </div>
//             <button className="btn btn-sm btn-outline">Change</button>
//           </div>
//           <div className="flex justify-between items-center py-2">
//             <div className="flex items-center gap-2 ">
//               <Shield className="w-5 h-5 text-indigo-600" />
//               <span>Two-Factor Authentication</span>
//             </div>
//             <button className="btn btn-sm btn-outline">Enable</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import UserAvatar from "@/components/UserAvatar";
import useAuth from "@/context/AuthContext";
import { Edit, Lock, Shield } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Please log in to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 text-white space-y-8">
      {/* Profile Header */}
      <div className="relative bg-D-blue/90 rounded-2xl shadow-lg overflow-hidden">
        {/* Decorative Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500" />

        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-8 bg-D-blue">
          <UserAvatar size="w-28 h-28 text-lg" />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
            <p className="text-gray-300 mt-1">{user.email}</p>
          </div>

          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition shadow-md hover:shadow-lg mt-6 md:mt-0">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-D-blue rounded-xl shadow-md p-6 border border-white/10 hover:border-indigo-500/30 transition">
        <h3 className="text-xl font-semibold mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
          🧾 Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              Full Name
            </p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              Email
            </p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              Username
            </p>

            {user.username ? (
              <p className="text-lg font-semibold italic opacity-75">
                {user.username}
              </p>
            ) : (
              <p className="text-lg font-semibold italic opacity-75">Not Set</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              Account Balance
            </p>
            <p className="text-lg font-bold text-green-500">₹0.00</p>
          </div>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="bg-D-blue rounded-xl shadow-md p-6 border border-white/10 hover:border-indigo-500/30 transition">
        <h3 className="text-xl font-semibold mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
          🔒 Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 rounded-lg hover:bg-white/5 px-3 transition">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Password</span>
            </div>
            <button className="px-3 py-1 border border-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition text-sm">
              Change
            </button>
          </div>

          <div className="flex justify-between items-center py-3 rounded-lg hover:bg-white/5 px-3 transition">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="font-medium">Two-Factor Authentication</span>
            </div>
            <button className="px-3 py-1 border border-indigo-500 rounded-md hover:bg-indigo-500 hover:text-white transition text-sm">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
