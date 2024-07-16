import css  from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={css.Header}>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/registration'}>Register</NavLink>
        </div>
    );
};

export {Header};