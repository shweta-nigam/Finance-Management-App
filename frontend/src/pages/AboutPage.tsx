const teams = [
  {
    id: 1,
    imgUrl: "t-user1.avif",
    name: "Alex Johnson",
    role: "Product Designer",
  },
  {
    id: 2,
    imgUrl: "t-user2.avif",
    name: "Suzen Patel",
    role: "Finance Specialist",
  },
  {
    id: 3,
    imgUrl: "t-user3.avif",
    name: "James Lee",
    role: "Frontend Developer",
  },
];

const AboutPage = () => {
  return (
    <div className="w-full min-h-screen bg-D-blue text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center p-10 min-h-[60vh] bg-gradient-to-r from-cyan-600/30 to-blue-800/30">
        <h1 className="text-5xl font-bold mb-6">About FinEase</h1>
        <p className="text-lg max-w-2xl text-gray-300">
          FinEase is your personal finance companion — designed to help you
          track expenses, set budgets, and achieve your financial goals with
          clarity and simplicity.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-cyan-400">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            At FinEase, our mission is to make financial management simple and
            stress-free for everyone. We believe that tracking money should be
            effortless, so you can focus on what really matters — reaching your
            dreams.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/assets/mission.png"
            alt="Mission illustration"
            className="w-auto object-contain"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-950/40 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-blue-900/40 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Expense Tracking</h3>
            <p className="text-gray-400">
              Get clear insights into where your money goes every month.
            </p>
          </div>
          <div className="p-6 bg-blue-900/40 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Smart Budgets</h3>
            <p className="text-gray-400">
              Set personalized budgets and stay on top of your goals.
            </p>
          </div>
          <div className="p-6 bg-blue-900/40 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Clear Insights</h3>
            <p className="text-gray-400">
              Visual charts and analytics to guide smarter financial decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">Meet the Team</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          We’re a passionate group of creators, designers, and finance
          enthusiasts who believe financial freedom should be accessible to
          everyone.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {teams.map((team, index) => (
            <div
              key={index}
              className="p-6 bg-blue-900/40 rounded-2xl shadow-lg"
            >
              <img
                src={`user/${team.imgUrl}`}
                alt="Team Member"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <p className="text-gray-400 text-sm">{team.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-D-blue text-center py-16">
        <h2 className="text-4xl font-bold mb-4">Join FinEase Today</h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-6">
          Take control of your finances with ease. Start tracking your expenses
          and building smarter budgets now.
        </p>
        <button className="btn-L-blue shadow-md">Get Started</button>
      </div>
    </div>
  );
};

export default AboutPage;
