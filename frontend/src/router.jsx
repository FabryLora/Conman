import { createBrowserRouter } from "react-router-dom"
import Home from "./views/Home"
import DefaultLayout from "./views/DefaultLayout";

const router = createBrowserRouter([
    
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/inicio",
                element: <Home />
            }
        ]
    }
])

export default router;