import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import "./index.css";
import router from "./router.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router}>
                <ScrollToTop />
            </RouterProvider>
        </ContextProvider>
    </StrictMode>
);
