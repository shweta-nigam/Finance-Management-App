export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Profile Header */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-500">john.doe@example.com</p>
          <p className="text-gray-500">📍 New Delhi, India</p>
          <div className="mt-4">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <div className="card bg-base-100 shadow-md mt-6">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-gray-600">Full Name</p>
              <p className="text-lg">John Doe</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Email</p>
              <p className="text-lg">john.doe@example.com</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Date of Birth</p>
              <p className="text-lg">12 Jan 1995</p>
            </div>
            <div>
              <p className="font-medium text-gray-600">Account Balance</p>
              <p className="text-lg text-green-600 font-bold">₹45,200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="card bg-base-100 shadow-md mt-6">
        <div className="card-body">
          <h3 className="text-xl font-semibold mb-4">Security</h3>
          <div className="flex justify-between items-center border-b py-2">
            <span>Password</span>
            <button className="btn btn-sm btn-outline">Change</button>
          </div>
          <div className="flex justify-between items-center border-b py-2">
            <span>Two-Factor Authentication</span>
            <button className="btn btn-sm btn-outline">Enable</button>
          </div>
        </div>
      </div>
    </div>
  );
}
