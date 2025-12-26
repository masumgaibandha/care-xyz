import { useContext, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";


export default function BookingDetails() {
    const { user } = useContext(AuthContext);
    const { bookingId } = useParams();

    const booking = useMemo(() => {
        if (!user?.email) return null;
        const key = `care_bookings_${user.email}`;
        const list = JSON.parse(localStorage.getItem(key) || "[]");
        return list.find((b) => b.id === bookingId) || null;
    }, [user?.email, bookingId]);

    if (!booking) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="alert alert-error">
                    <span>Booking not found.</span>
                </div>
                <Link to="/my-bookings" className="btn btn-link mt-3">
                    ← Back to My Bookings
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="breadcrumbs text-sm mb-4">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/my-bookings">My Bookings</Link></li>
                    <li>Details</li>
                </ul>
            </div>

            <div className="card bg-base-100 shadow border border-base-200">
                <div className="card-body">
                    <h1 className="text-2xl font-bold">Booking Details</h1>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-base-200">
                            <div className="text-sm text-base-content/60">Service</div>
                            <div className="font-semibold">{booking.serviceName}</div>
                        </div>

                        <div className="p-4 rounded-lg bg-base-200">
                            <div className="text-sm text-base-content/60">Status</div>
                            <div className="font-semibold">{booking.status}</div>
                        </div>

                        <div className="p-4 rounded-lg bg-base-200">
                            <div className="text-sm text-base-content/60">Duration</div>
                            <div className="font-semibold">{booking.durationHours} hour(s)</div>
                        </div>

                        <div className="p-4 rounded-lg bg-base-200">
                            <div className="text-sm text-base-content/60">Total</div>
                            <div className="font-semibold">৳{booking.total}</div>
                        </div>

                        <div className="p-4 rounded-lg bg-base-200 md:col-span-2">
                            <div className="text-sm text-base-content/60">Location</div>
                            <div className="font-semibold">
                                {booking.division}, {booking.district}, {booking.city}, {booking.area}
                            </div>
                            <div className="text-sm text-base-content/70 mt-1">{booking.address}</div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <Link to="/my-bookings" className="btn btn-outline">
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
