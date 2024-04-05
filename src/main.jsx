import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";
import ThemeProvider from "./theme";
import App from "./App";
import { OnlineStatusProvider } from "./hooks/useNetwork";
import Notifications from "./components/notifications/notifications";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <ThemeProvider>
          <BrowserRouter>
            <OnlineStatusProvider>
              <Notifications />
              <App />
            </OnlineStatusProvider>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </RecoilRoot>
  </StrictMode>
);
