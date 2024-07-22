import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './contexts';
import { router } from './router';

const App: React.FC = () => (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);

export { App };
