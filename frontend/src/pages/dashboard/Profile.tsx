import { Edit, Lock, Shield } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {/* Profile Header */}
      <div className="relative bg-D-blue rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-8">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold">John Doe</h2>
            <p className="text-gray-200">john.doe@example.com</p>
            <p className="text-gray-300 mt-1">📍 New Delhi, India</p>
          </div>
          <button className="btn shadow-md mt-6 transition btn-L-blue btn-L-blue:hover">
            <Edit className="w-4 h-4 mr-2" /> Edit Profile
          </button>
        </div>
      </div>

      {/*Information Section */}
      <div className="bg-D-blue rounded-xl shadow-md mt-8 p-6">
        <h3 className="text-xl font-semibold mb-6  border-b pb-3">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 font-medium">Full Name</p>
            <p className="text-lg font-semibold ">John Doe</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Email</p>
            <p className="text-lg font-semibold ">john.doe@example.com</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">username</p>
            <p className="text-lg font-semibold "> Jantyi</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Account Balance</p>
            <p className="text-lg font-bold text-green-600">₹45,200</p>
          </div>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="bg-D-blue rounded-xl shadow-md mt-8 p-6 text-white">
        <h3 className="text-xl font-semibold mb-6 border-b pb-3">
          Security Settings
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600" />
              <span>Password</span>
            </div>
            <button className="btn btn-sm btn-outline">Change</button>
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2 ">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span>Two-Factor Authentication</span>
            </div>
            <button className="btn btn-sm btn-outline">Enable</button>
          </div>
        </div>
      </div>
    </div>
  );
}
