import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-base-200 bg-base-100">
            <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3">
                <div>
                    <h3 className="text-lg font-extrabold">
                        Care<span className="text-primary">.xyz</span>
                    </h3>
                    <p className="text-base-content/60 mt-2">
                        Trusted baby, elderly, and sick care booking platform.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-2">Quick Links</h4>
                    <div className="flex flex-col gap-2 text-base-content/70">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <a href="/#services" className="hover:text-primary">Services</a>
                        <Link to="/my-bookings" className="hover:text-primary">My Bookings</Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-2">Contact</h4>
                    <p className="text-base-content/70">Support: support@care.xyz</p>
                    <p className="text-base-content/70">Dhaka, Bangladesh</p>
                </div>
            </div>

            <div className="text-center text-sm text-base-content/60 py-4 border-t border-base-200">
                © {new Date().getFullYear()} Care.xyz — All rights reserved
            </div>
        </footer>
    );
}
