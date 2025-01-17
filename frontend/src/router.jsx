import { createBrowserRouter } from "react-router-dom";
import AcoplesRapidos from "./views/AcoplesRapidos";
import Administrator from "./views/Administrator";
import Calidad from "./views/Calidad";
import Contacto from "./views/Contacto";
import DefaultLayout from "./views/DefaultLayout";
import Home from "./views/Home";
import Mangueras from "./views/Mangueras";
import Nosotros from "./views/Nosotros";
import Novedades from "./views/Novedades";
import Productos from "./views/Productos";
import TerminalesyAccesorios from "./views/TerminalesyAccesorios";

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
            {
                path: "/inicio/terminales-y-accesorios",
                element: <TerminalesyAccesorios />,
            },
            {
                path: "/inicio/mangueras",
                element: <Mangueras />,
            },
            {
                path: "/inicio/productos",
                element: <Productos />,
            },
            {
                path: "/inicio/calidad",
                element: <Calidad />,
            },
            {
                path: "/inicio/novedades",
                element: <Novedades />,
            },
            {
                path: "/inicio/contacto",
                element: <Contacto />,
            },
        ],
    },
    {
        path: "/adm",
        element: <Administrator />,
    },
]);

export default router;
