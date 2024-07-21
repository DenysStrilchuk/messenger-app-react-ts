import {Header} from "../components";
import {Outlet} from "react-router-dom";
import {LoginPage} from "../pages";

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <LoginPage/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};