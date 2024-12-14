import "./index.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalProvider>
  </BrowserRouter>
);
