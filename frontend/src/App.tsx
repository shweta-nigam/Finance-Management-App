import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-30">
        <AppRoutes />
      </div>
      <Footer />
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
