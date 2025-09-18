import { Link } from "react-router-dom";

function UnderConstructionAppPage() {
  return (
    <div className="bg h-screen w-full flex flex-col items-center justify-center text-center px-4">
      <img
        src="/assets/app-construction.svg"
        alt="app under construction"
        className="object-contain w-1/2 max-w-md mb-6"
      />
      <h1 className="text-white text-2xl font-semibold">
        FinEase App Under Development
      </h1>
      <Link to="/" className="shadow-md mt-6 transition btn-D-blue btn-D-blue:hover"> Go Back → </Link>
    </div>
  );
}

export default UnderConstructionAppPage;