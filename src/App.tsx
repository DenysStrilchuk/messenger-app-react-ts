import React from 'react';
import { AuthProvider } from './contexts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App: React.FC = () => (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);

export { App };
