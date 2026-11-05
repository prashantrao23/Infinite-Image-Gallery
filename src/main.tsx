import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import AppRouter from "./routes/AppRouter";
import { GalleryProvider } from "./context/GalleryContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GalleryProvider>
      <AppRouter />
    </GalleryProvider>
  </StrictMode>
);
