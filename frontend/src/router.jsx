import { createBrowserRouter, Navigate } from "react-router-dom";
import Administradores from "./views/Administradores";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import Calidad from "./views/Calidad";
import CalidadAdmin from "./views/CalidadAdmin";
import CalidadContenido from "./views/CalidadContenido";
import CalidadInicioAdmin from "./views/CalidadInicioAdmin";
import CargaDeDatos from "./views/CargaDeDatos";
import CargarImportados from "./views/CargarImportados";
import CargarTerminales from "./views/CargarTerminales";
import CategoriasAdmin from "./views/CategoriasAdmin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import DefaultLayout from "./views/DefaultLayout";
import GeneralView from "./views/GeneralView";
import Home from "./views/Home";
import InformacionAdmin from "./views/InformacionAdmin";
import ListaDePrecios from "./views/ListaDePrecios";
import ListaDePreciosAdmin from "./views/ListaDePreciosAdmin";
import Login from "./views/Login";
import LogosAdmin from "./views/LogosAdmin";
import Metadatos from "./views/Metadatos";
import MultipleView from "./views/MultipleView";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import NosotrosInicioAdmin from "./views/NosotrosInicioAdmin";
import Novedades from "./views/Novedades";
import NovedadesAdmin from "./views/NovedadesAdmin";
import NovedadUnica from "./views/NovedadUnica";
import Pedidos from "./views/Pedidos";
import PedidosAdmin from "./views/PedidosAdmin";
import PrivateProducts from "./views/PrivateProducts";
import PrivateZone from "./views/PrivateZone";
import ProductosAdmin from "./views/ProductosAdmin";
import RealProducts from "./views/RealProducts";
import Signup from "./views/Signup";
import SliderAdmin from "./views/SliderAdmin";
import UpdateUser from "./views/UpdateUser";
import UsuariosAdmin from "./views/UsuariosAdmin";
import ValoresAdmin from "./views/ValoresAdmin";

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
        path: "/actualizar-perfil",
        element: <UpdateUser />,
    },
    {
        path: "/inicio",
        element: <DefaultLayout />,
        children: [
            {
                path: "/inicio/:id/",
                element: <GeneralView />,
            },
            {
                path: "/inicio/:id/:id",
                element: <MultipleView />,
            },
            {
                path: "/inicio",
                element: <Navigate to={"/"} />,
            },
            {
                path: "/inicio/nosotros",
                element: <Nosotros />,
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
                path: "/inicio/novedades/:id",
                element: <NovedadUnica />,
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
                path: "/dashboard/clientes",
                element: <UsuariosAdmin />,
            },
            {
                path: "/dashboard/archivos",
                element: <CalidadAdmin />,
            },

            {
                path: "/dashboard/nosotros-inicio",
                element: <NosotrosInicioAdmin />,
            },
            {
                path: "/dashboard/calidad-inicio",
                element: <CalidadInicioAdmin />,
            },
            {
                path: "/dashboard/administradores",
                element: <Administradores />,
            },
            {
                path: "/dashboard/novedades",
                element: <NovedadesAdmin />,
            },
            {
                path: "/dashboard/metadatos",
                element: <Metadatos />,
            },
            {
                path: "/dashboard/pedidos-privada",
                element: <PedidosAdmin />,
            },
            {
                path: "/dashboard/lista-de-precios",
                element: <ListaDePreciosAdmin />,
            },
            {
                path: "/dashboard/informacion",
                element: <InformacionAdmin />,
            },
            {
                path: "/dashboard/valores",
                element: <ValoresAdmin />,
            },
            {
                path: "/dashboard/logos",
                element: <LogosAdmin />,
            },
            {
                path: "/dashboard/contenido",
                element: <CalidadContenido />,
            },
            {
                path: "/dashboard/mangueras",
                element: <CargaDeDatos />,
            },
            {
                path: "/dashboard/terminales",
                element: <CargarTerminales />,
            },
            {
                path: "/dashboard/importados",
                element: <CargarImportados />,
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
