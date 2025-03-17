import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios.js";

const StateContext = createContext({
    userToken: null,
    setUserToken: () => {},
    adminToken: null,
    setAdminToken: () => {},
    userInfo: [],
    fetchUserInfo: () => {},
    adminInfo: {},
    fetchAdminInfo: () => {},
    nosotrosFirst: [],
    fetchNosotrosFirstInfo: () => {},
    contactInfo: {},
    fetchContactInfo: () => {},
    sliderInfo: {},
    fetchSliderInfo: () => {},
    categoryInfo: [],
    fetchCategoryInfo: () => {},
    productInfo: [],
    fetchProductInfo: () => {},
    subCategoryInfo: [],
    fetchSubCategoryInfo: () => {},
    provincias: [],
    fetchProvincias: () => {},
    allUsers: [],
    fetchAllUsers: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    cart: [],
    realProducts: [],
    fetchRealProducts: () => {},
    sliderImage: [],
    fetchSliderImage: () => {},
    pdfInfo: [],
    fetchPdfInfo: () => {},
    linkInfo: "",
    setLinkInfo: () => {},
    clearCart: () => {},
    pedidos: [],
    fetchPedidos: () => {},
    categoryInicio: [],
    fetchCategoriasInicio: () => {},
    nosotrosInicio: {},
    fetchNosotrosInicio: () => {},
    calidadInicio: {},
    fetchCalidadInicio: () => {},
    allAdmins: [],
    fetchAllAdmins: () => {},
    novedades: [],
    fetchNovedades: () => {},
    metadatos: [],
    fetchMetadatos: () => {},
    pedidosInfo: {},
    fetchPedidosInfo: () => {},
    listadeprecios: [],
    fetchListadeprecios: () => {},
    nosotrosSecond: {},
    fetchNosotrosSecond: () => {},
    logos: {},
    fetchLogos: () => {},
    userId: "",
    fetchCalidadInfo: () => {},
    calidadInfo: {},
    contactoProd: "",
    setContactoProd: () => {},
    currentAdmin: {},
    fetchCurrentAdmin: () => {},
});

export const ContextProvider = ({ children }) => {
    const [contactInfo, setContactInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [currentAdmin, setCurrentAdmin] = useState({});
    const [adminInfo, setAdminInfo] = useState({});
    const [sliderInfo, setSliderInfo] = useState({});
    const [sliderImage, setSliderImage] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState([]);
    const [productInfo, setProductInfo] = useState([]);
    const [subCategoryInfo, setSubCategoryInfo] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [realProducts, setRealProducts] = useState([]);
    const [pdfInfo, setPdfInfo] = useState([]);
    const [linkInfo, setLinkInfo] = useState("");
    const [pedidos, setPedidos] = useState([]);
    const [categoryInicio, setCategoryInicio] = useState([]);
    const [nosotrosInicio, setNosotrosInicio] = useState({});
    const [calidadInicio, setCalidadInicio] = useState({});
    const [allAdmins, setAllAdmins] = useState([]);
    const [novedades, setNovedades] = useState([]);
    const [metadatos, setMetadatos] = useState([]);
    const [pedidosInfo, setPedidosInfo] = useState({});
    const [listadeprecios, setListadeprecios] = useState([]);
    const [nosotrosSecond, setNosotrosSecond] = useState({});
    const [logos, setLogos] = useState({});
    const [calidadInfo, setCalidadInfo] = useState({});
    const [userId, setUserId] = useState("");
    const [contactoProd, setContactoProd] = useState("");

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product, additionalInfo) => {
        const exists = cart.find((item) => item.id === product.id);
        let updatedCart;

        if (exists) {
            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                          additionalInfo: {
                              ...item.additionalInfo,
                              ...additionalInfo,
                          },
                      }
                    : item
            );
        } else {
            updatedCart = [
                ...cart,
                { ...product, quantity: 1, additionalInfo },
            ];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);

        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]); // Vaciar el estado del carrito
        localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [adminToken, _setAdminToken] = useState(
        localStorage.getItem("ADMIN_TOKEN") || ""
    );
    const [nosotrosFirstInfo, setNosotrosFirstInfo] = useState({});

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    const setAdminToken = (token) => {
        if (token) {
            localStorage.setItem("ADMIN_TOKEN", token);
        } else {
            localStorage.removeItem("ADMIN_TOKEN");
        }
        _setAdminToken(token);
    };

    const fetchUserInfo = () => {
        axiosClient.get("/me").then(({ data }) => {
            setUserInfo(data[0]);
            setUserId(data.id);
        });
    };

    const fetchCurrentAdmin = () => {
        axiosClient.get("/me-unico-admin").then(({ data }) => {
            setCurrentAdmin(data[0]);
        });
    };

    const fetchAllUsers = () => {
        axiosClient.get("/allusers").then(({ data }) => {
            setAllUsers(data.data);
        });
    };

    const fetchNosotrosFirstInfo = () => {
        axiosClient.get("/nosotros-first").then(({ data }) => {
            setNosotrosFirstInfo(data.data[0]);
        });
    };

    const fetchContactInfo = () => {
        axiosClient.get("/contact-info").then(({ data }) => {
            setContactInfo(data.data[0]);
        });
    };

    const fetchSliderInfo = () => {
        axiosClient.get("/slider").then(({ data }) => {
            setSliderInfo(data.data[0]);
        });
    };

    const fetchSliderImage = () => {
        axiosClient.get("/sliderimage").then(({ data }) => {
            setSliderImage(data.data);
        });
    };

    const fetchCategoryInfo = () => {
        axiosClient.get("/category").then(({ data }) => {
            setCategoryInfo(data.data);
        });
    };

    const fetchProductInfo = () => {
        axiosClient.get("/product").then(({ data }) => {
            setProductInfo(data.data);
        });
    };

    const fetchSubCategoryInfo = () => {
        axiosClient.get("/subcategory").then(({ data }) => {
            setSubCategoryInfo(data.data);
        });
    };

    const fetchProvincias = () => {
        axiosClient.get("/provincia").then(({ data }) => {
            setProvincias(data.data);
        });
    };

    const fetchRealProducts = () => {
        axiosClient.get("/realproducts").then(({ data }) => {
            setRealProducts(data.data);
        });
    };

    const fetchPdfInfo = () => {
        axiosClient.get("/pdf").then(({ data }) => {
            setPdfInfo(data.data);
        });
    };

    const fetchPedidos = () => {
        axiosClient.get("/pedidos").then(({ data }) => {
            setPedidos(data.data);
        });
    };

    const fetchCategoriasInicio = () => {
        axiosClient.get("/categoriasinicio").then(({ data }) => {
            setCategoryInicio(data.data);
        });
    };

    const fetchNosotrosInicio = () => {
        axiosClient.get("/nosotrosinicio").then(({ data }) => {
            setNosotrosInicio(data.data[0]);
        });
    };

    const fetchCalidadInicio = () => {
        axiosClient.get("/calidadinicio").then(({ data }) => {
            setCalidadInicio(data.data[0]);
        });
    };

    const fetchPedidosInfo = () => {
        axiosClient.get("/pedidosinformacion").then(({ data }) => {
            setPedidosInfo(data.data[0]);
        });
    };

    const fetchAllAdmins = () => {
        axiosClient.get("/alladmins").then(({ data }) => {
            setAllAdmins(data.data);
        });
    };

    const fetchNovedades = () => {
        axiosClient.get("/novedades").then(({ data }) => {
            setNovedades(data.data);
        });
    };

    const fetchMetadatos = () => {
        axiosClient.get("/metadatos").then(({ data }) => {
            setMetadatos(data.data);
        });
    };

    const fetchListadeprecios = () => {
        axiosClient.get("/listadeprecios").then(({ data }) => {
            setListadeprecios(data.data);
        });
    };

    const fetchNosotrosSecond = () => {
        axiosClient.get("/nosotrossecond").then(({ data }) => {
            setNosotrosSecond(data.data[0]);
        });
    };

    const fetchLogos = () => {
        axiosClient.get("/logos").then(({ data }) => {
            setLogos(data.data[0]);
        });
    };

    const fetchCalidadInfo = () => {
        axiosClient.get("/calidadinfo").then(({ data }) => {
            setCalidadInfo(data.data[0]);
        });
    };

    useEffect(() => {
        fetchNosotrosFirstInfo();
        fetchContactInfo();
        fetchSliderInfo();
        fetchCategoryInfo();
        fetchProductInfo();
        fetchSubCategoryInfo();
        fetchProvincias();
        fetchAllUsers();
        fetchRealProducts();
        fetchSliderImage();
        fetchPdfInfo();
        fetchPedidos();
        fetchCategoriasInicio();
        fetchNosotrosInicio();
        fetchCalidadInicio();
        fetchAllAdmins();
        fetchNovedades();
        fetchMetadatos();
        fetchPedidosInfo();
        fetchListadeprecios();
        fetchNosotrosSecond();
        fetchLogos();
        fetchCalidadInfo();
    }, []);

    useEffect(() => {
        if (userToken) {
            fetchUserInfo();
        }
    }, [userToken]);

    const fetchAdminInfo = () => {
        axiosClient.get("/me-admin").then(({ data }) => {
            setAdminInfo(data);
        });
    };

    return (
        <StateContext.Provider
            value={{
                currentAdmin,
                fetchCurrentAdmin,
                contactoProd,
                setContactoProd,
                fetchCalidadInfo,
                calidadInfo,
                userId,
                logos,
                fetchLogos,
                nosotrosSecond,
                fetchNosotrosSecond,
                listadeprecios,
                fetchListadeprecios,
                pedidosInfo,
                fetchPedidosInfo,
                metadatos,
                fetchMetadatos,
                novedades,
                fetchNovedades,
                allAdmins,
                fetchAllAdmins,
                calidadInicio,
                fetchCalidadInicio,
                nosotrosInicio,
                fetchNosotrosInicio,
                categoryInicio,
                fetchCategoriasInicio,
                pedidos,
                fetchPedidos,
                clearCart,
                linkInfo,
                setLinkInfo,
                pdfInfo,
                fetchPdfInfo,
                sliderImage,
                fetchSliderImage,
                realProducts,
                fetchRealProducts,
                cart,
                removeFromCart,
                addToCart,
                allUsers,
                fetchAllUsers,
                provincias,
                fetchProvincias,
                subCategoryInfo,
                fetchSubCategoryInfo,
                productInfo,
                fetchProductInfo,
                categoryInfo,
                fetchCategoryInfo,
                sliderInfo,
                fetchSliderInfo,
                contactInfo,
                fetchContactInfo,
                nosotrosFirstInfo,
                fetchNosotrosFirstInfo,
                adminInfo,
                fetchAdminInfo,
                adminToken,
                setAdminToken,
                userToken,
                setUserToken,
                userInfo,
                fetchUserInfo,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
