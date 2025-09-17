import Charts from "@/components/homePage/Charts";
import CoinAnimation from "@/components/homePage/CoinAnimation";
import { FeatureCards } from "@/components/homePage/FeatureCards";
import Testimonials from "@/components/homePage/Testimonials";

function HomePage() {
  return (
    <>
      <div className="w-full min-h-screen bg  ">
        <div className="flex flex-col items-center justify-center text-center p-6 text-white pt-34">
          <h1 className="text-5xl font-bold mb-6">
            FinEase - Manage Money Easily
          </h1>
          <p className="text-lg max-w-xl mb-2">
            Single destination to track and manage your money
          </p>
          <p className="text-gray-400">— all in one simple dashboard.</p>
          <button className="shadow-md mt-6 transition btn-D-blue btn-D-blue:hover">
            Get Started
          </button>
        </div>

        {/* coins animation */}
        <div>
          <CoinAnimation />
        </div>
      </div>

      {/* quote: 2nd section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 t-L bg-D-blue overflow-hidden">
        <h1 className="text-6xl font-bold mb-4">Less Math, More Clarity</h1>
        <p className="text-lg max-w-xl">
          Track your expenses, set smart budgets, and achieve your financial
          goals
        </p>
        <p className="italic mb-8 text-cyan-200">
          “A budget is telling your money where to go instead of wondering where
          it went.”
        </p>
        
        <div className="mt-12 flex flex-col md:flex-row gap-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-72 text-white backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-2">📱 FinEase App</h2>
            <p className="text-sm">
              Download our Android app and manage your finances on the go.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-72 text-white backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-2">⬇️ 50K+ Downloads</h2>
            <p className="text-sm">
              Trusted by thousands of users across India.
            </p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-72 text-white backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-2">⭐ 4.8/5 Rating</h2>
            <p className="text-sm">
              Loved by our community for simplicity and clarity.
            </p>
          </div>
        </div>
      </div>

      {/* cards: 3rd section */}
      <FeatureCards />

      {/* charts preview : 4th section*/}

      <Charts />
      {/* testimonials: 5th section */}

      {/* accordion */}

      <Testimonials />
      {/* final call to action :last section*/}
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-D-blue text-white p-8">
        <h2 className="text-4xl font-bold mb-4">Ready to Take Control?</h2>
        <p className="mb-6 text-gray-300 max-w-md text-center">
          Start tracking expenses and building smarter budgets today.
        </p>
        <button className="btn-D shadow-md">Create Free Account</button>
      </div>
    </>
  );
}

export default HomePage;
