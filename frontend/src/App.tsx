import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
// import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-30">
        <AppRoutes />
         {/* <Toaster richColors position="top-right" /> */}
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
