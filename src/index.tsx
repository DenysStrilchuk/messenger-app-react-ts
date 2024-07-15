import React from 'react';
import ReactDOM from 'react-dom/client';
// import {RouterProvider} from "react-router-dom";
// import {router} from "./router";
import {App} from "./App";

const container = document.getElementById('root');

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
            <App/>
            // <RouterProvider router={router}/>
    );
}
