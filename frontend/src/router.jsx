import { createBrowserRouter } from "react-router-dom";
import AcoplesRapidos from "./views/AcoplesRapidos";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import Calidad from "./views/Calidad";
import CategoriasAdmin from "./views/CategoriasAdmin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import DefaultLayout from "./views/DefaultLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import Mangueras from "./views/Mangueras";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import Novedades from "./views/Novedades";
import Productos from "./views/Productos";
import ProductosAdmin from "./views/ProductosAdmin";
import Signup from "./views/Signup";
import SliderAdmin from "./views/SliderAdmin";
import TerminalesyAccesorios from "./views/TerminalesyAccesorios";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/registro",
        element: <Signup />,
    },
    {
        path: "/iniciar-sesion",
        element: <Login />,
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
        element: <AdminLogin />,
    },
    {
        path: "/dashboard",
        element: <Administrator />,
        children: [
            {
                path: "/dashboard/nosotros",
                element: <NosotrosAdmin />,
            },
            {
                path: "/dashboard/slider",
                element: <SliderAdmin />,
            },
            {
                path: "/dashboard/categorias",
                element: <CategoriasAdmin />,
            },
            {
                path: "/dashboard/productos",
                element: <ProductosAdmin />,
            },
            {
                path: "/dashboard/contacto-admin",
                element: <ContactoAdmin />,
            },
        ],
    },
]);

export default router;
