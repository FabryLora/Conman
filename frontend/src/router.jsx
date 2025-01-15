import { createBrowserRouter } from "react-router-dom"
import Home from "./views/Home"
import DefaultLayout from "./views/DefaultLayout";
import Administrator from "./views/Administrator";

const router = createBrowserRouter([
    
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/inicio",
                element: <Home />
            }
        ],
    },
    {
        path: "/adm",
        element: <Administrator />
    }
])

export default router;