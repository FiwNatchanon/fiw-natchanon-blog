import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { jwtInterceptor } from "@/utils/jwtInterceptor";
import "./index.css";
import App from "./App.jsx";

jwtInterceptor();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="bottom-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
