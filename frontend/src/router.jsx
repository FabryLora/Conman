import { createBrowserRouter, Navigate } from "react-router-dom";
import AcoplesRapidos from "./views/AcoplesRapidos";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import Calidad from "./views/Calidad";
import CategoriasAdmin from "./views/CategoriasAdmin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import DefaultLayout from "./views/DefaultLayout";
import GeneralView from "./views/GeneralView";
import Home from "./views/Home";
import ListaDePrecios from "./views/ListaDePrecios";
import Login from "./views/Login";
import MultipleView from "./views/MultipleView";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import Novedades from "./views/Novedades";
import Pedidos from "./views/Pedidos";
import PrivateProducts from "./views/PrivateProducts";
import PrivateZone from "./views/PrivateZone";
import ProductosAdmin from "./views/ProductosAdmin";
import RealProducts from "./views/RealProducts";
import Signup from "./views/Signup";
import SliderAdmin from "./views/SliderAdmin";
import UsuariosAdmin from "./views/UsuariosAdmin";

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
                path: "/inicio",
                element: <Navigate to={"/"} />,
            },
            {
                path: "/inicio/nosotros",
                element: <Nosotros />,
            },
            {
                path: "/inicio/acoples-rapidos-hidraulicos",
                element: <AcoplesRapidos />,
            },
            {
                path: "/inicio/acoples-rapidos-hidraulicos/:id",
                element: <MultipleView />,
            },
            {
                path: "/inicio/terminales-y-accesorios",
                element: (
                    <GeneralView categoryName={"terminales y accesorios"} />
                ),
            },
            {
                path: "/inicio/terminales-y-accesorios/:id",
                element: <MultipleView />,
            },

            {
                path: "/inicio/mangueras",
                element: <GeneralView categoryName={"mangueras"} />,
            },
            {
                path: "/inicio/mangueras/:id",
                element: <MultipleView />,
            },
            {
                path: "/inicio/productos",
                element: <GeneralView categoryName={"productos"} />,
            },
            {
                path: "/inicio/productos/:id",
                element: <MultipleView />,
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
                path: "/dashboard/grupo-de-productos",
                element: <ProductosAdmin />,
            },
            {
                path: "/dashboard/productos",
                element: <RealProducts />,
            },
            {
                path: "/dashboard/contacto-admin",
                element: <ContactoAdmin />,
            },
            {
                path: "/dashboard/usuarios",
                element: <UsuariosAdmin />,
            },
        ],
    },
    {
        path: "/privado",
        element: <PrivateZone />,
        children: [
            {
                path: "/privado",
                element: <Navigate to={"/privado/productos"} />,
            },
            {
                path: "/privado/productos",
                element: <PrivateProducts />,
            },
            {
                path: "/privado/pedido",
                element: <Pedidos />,
            },
            {
                path: "/privado/lista-de-precios",
                element: <ListaDePrecios />,
            },
        ],
    },
]);

export default router;
