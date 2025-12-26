import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const navItemClass = ({ isActive }) =>
    `hover:text-primary transition ${isActive ? "text-primary font-semibold" : "text-base-content"
    }`;

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/");
    };

    return (
        <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-200">
            <div className="navbar max-w-6xl mx-auto px-4">
                {/* LEFT */}
                <div className="navbar-start">
                    {/* Mobile menu */}
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            ☰
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
                        >
                            <li>
                                <NavLink to="/" className={navItemClass}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <a href="/#services">Services</a>
                            </li>
                            <li>
                                <NavLink to="/my-bookings" className={navItemClass}>
                                    My Bookings
                                </NavLink>
                            </li>

                            {!user ? (
                                <>
                                    <li>
                                        <NavLink to="/login" className={navItemClass}>
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register" className={navItemClass}>
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Brand */}
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

                {/* CENTER (Desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-6">
                        <li>
                            <NavLink to="/" className={navItemClass}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <a className="hover:text-primary transition" href="/#services">
                                Services
                            </a>
                        </li>
                        <li>
                            <NavLink to="/my-bookings" className={navItemClass}>
                                My Bookings
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end hidden lg:flex items-center gap-3">
                    {!user ? (
                        <>
                            <NavLink to="/login" className="btn btn-ghost">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="btn btn-primary">
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block text-right">
                                <div className="text-sm font-semibold leading-4">
                                    {user?.displayName || "User"}
                                </div>
                                <div className="text-xs text-base-content/60 leading-4">
                                    {user?.email}
                                </div>
                            </div>

                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full bg-base-200 flex items-center justify-center">
                                        <span className="font-bold">
                                            {(user?.displayName?.[0] || user?.email?.[0] || "U").toUpperCase()}
                                        </span>
                                    </div>
                                </label>

                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
                                >
                                    <li>
                                        <NavLink to="/my-bookings">My Bookings</NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
