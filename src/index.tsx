import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
//import {App} from "./App";
import {router} from "./router";

const container = document.getElementById('root');

if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
            //<App/>
            <RouterProvider router={router}/>
    );
}
