import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>                                                    // development-only checks.
    <QueryClientProvider client={queryClient}>                      // makes the queryClient available to the entire component tree, so you can use React Query hooks. 
      <BrowserRouter>                                              //enables client-side routing/navigation.
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
