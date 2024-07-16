import css  from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={css.Header}>
            <h1>My message</h1>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/registration'}>Register</NavLink>
        </div>
    );
};

export {Header};