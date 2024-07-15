import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "./layouts";

const router = createBrowserRouter([
    {
        path:'auth', element: <MainLayout/>
    }
]);

export {router}