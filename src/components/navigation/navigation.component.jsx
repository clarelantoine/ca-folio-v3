import { Link, NavLink, Outlet } from 'react-router-dom';
import './navigation.styles.scss';

const Navigation = () => (
    <>
        <nav className="navigation">
            <ul className="navigation__items">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </ul>
        </nav>
        <Outlet />
    </>
);

export default Navigation;
