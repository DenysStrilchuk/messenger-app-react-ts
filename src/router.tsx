import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "./layouts";
import {ChatPage, LoginPage, RegisterPage} from "./pages";

const router = createBrowserRouter([
    {
        path:'', element: <MainLayout/>, children: [
            {
                path:'login', element: <LoginPage/>
            },
            {
                path:'registration', element: <RegisterPage/>
            },
            {
                path: 'chat', element: <ChatPage/>
            }
        ]
    }
]);

export {router}