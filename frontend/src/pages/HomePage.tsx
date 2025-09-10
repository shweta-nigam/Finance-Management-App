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
          <button className="shadow-md mt-6 transition btn-L-blue btn-L-blue:hover">
            Get Started
          </button>
        </div>
        {/* coins animation */}
        <div>
          <CoinAnimation />
        </div>
      </div>
      {/* quote: 2nd section */}
      <div className=" min-h-screen flex flex-col items-center justify-center text-center p-6 text-cyan-400 bg-D-blue">
        <h1 className="text-6xl font-bold mb-4">Less Math, More Clarity</h1>
        <p className="text-lg max-w-xl mb-6">
          Track your expenses, set smart budgets, and achieve your financial
          {/* goals — all in one simple dashboard. */}
        </p>

        {/* <p className="text-md  italic mb-8">
        “A budget is telling your money where to go instead of wondering where it went.”
      </p> */}
        <p>links and icons here</p>
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
