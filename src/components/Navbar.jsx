import { NavLink, Link } from "react-router-dom";

const activeClass = "text-primary font-semibold";
const baseClass = "hover:text-primary transition";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 bg-base-100 border-b border-base-200">
            <div className="navbar max-w-6xl mx-auto px-4">
                {/* Left: Brand + Mobile menu */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            ☰
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : baseClass)}>
                                    Home
                                </NavLink>
                            </li>
                            <li><a href="/#services">Services</a></li>
                            <li>
                                <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? activeClass : baseClass)}>
                                    My Bookings
                                </NavLink>
                            </li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/register">Register</NavLink></li>
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2">
                        <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-9">
                                <span className="font-bold">C</span>
                            </div>
                        </div>
                        <span className="text-xl font-extrabold">
                            Care<span className="text-primary">.xyz</span>
                        </span>
                    </Link>
                </div>

                {/* Center: Desktop links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6">
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : baseClass)}>
                                Home
                            </NavLink>
                        </li>
                        <li><a className={baseClass} href="/#services">Services</a></li>
                        <li>
                            <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? activeClass : baseClass)}>
                                My Bookings
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Right: Auth buttons */}
                <div className="navbar-end hidden lg:flex gap-2">
                    <NavLink to="/login" className="btn btn-ghost">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="btn btn-primary">
                        Register
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
