import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "./layouts";
import { ChatPage, LoginPage, RegisterPage } from "./pages";
import { UsersPage } from "./pages/UsersPage";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout />, children: [
            {
                path: 'login', element: <LoginPage />
            },
            {
                path: 'registration', element: <RegisterPage />
            },
            {
                path: 'users', element: <UsersPage />
            },
            {
                path: 'chat/:receiverId', element: <ChatPage />
            },
            {
                path: '*', element: <Navigate to="login" />
            }
        ]
    }
]);

export { router };
