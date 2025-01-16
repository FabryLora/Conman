import { createBrowserRouter, Navigate } from "react-router-dom";
import AcoplesRapidos from "./views/AcoplesRapidos";
import Administrator from "./views/Administrator";
import DefaultLayout from "./views/DefaultLayout";
import Home from "./views/Home";
import Nosotros from "./views/Nosotros";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/inicio",
        element: <DefaultLayout />,
        children: [
            {
                path: "/inicio/nosotros",
                element: <Nosotros />,
            },
            {
                path: "/inicio/acoples-rapidos-hidraulicos",
                element: <AcoplesRapidos />,
            },
        ],
    },
    {
        path: "/adm",
        element: <Administrator />,
    },
]);

export default router;
