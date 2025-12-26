import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


function badgeClass(status) {
    if (status === "Pending") return "badge badge-warning";
    if (status === "Confirmed") return "badge badge-info";
    if (status === "Completed") return "badge badge-success";
    if (status === "Cancelled") return "badge badge-error";
    return "badge";
}

export default function MyBookings() {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const key = user?.email ? `care_bookings_${user.email}` : null;

    const load = () => {
        if (!key) return;
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        setBookings(data);
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const rows = useMemo(() => bookings, [bookings]);

    const handleCancel = (id) => {
        if (!key) return;

        const next = bookings.map((b) =>
            b.id === id ? { ...b, status: "Cancelled" } : b
        );

        setBookings(next);
        localStorage.setItem(key, JSON.stringify(next));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Bookings</h1>
                    <p className="text-base-content/60">
                        Track your booking status and manage your bookings.
                    </p>
                </div>

                <Link to="/#services" className="btn btn-primary btn-sm">
                    Book New Service
                </Link>
            </div>

            {rows.length === 0 ? (
                <div className="card bg-base-100 shadow border border-base-200">
                    <div className="card-body">
                        <h2 className="card-title">No bookings yet</h2>
                        <p className="text-base-content/70">
                            Book a service to see it here.
                        </p>
                        <div className="card-actions justify-end">
                            <Link to="/" className="btn btn-primary">
                                Go to Home
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-xl shadow">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Duration</th>
                                <th>Location</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.map((b) => (
                                <tr key={b.id}>
                                    <td className="font-semibold">{b.serviceName || b.serviceId}</td>

                                    <td>{b.durationHours} hour(s)</td>

                                    {/* ✅ Full AG location */}
                                    <td>
                                        <div className="text-sm">
                                            <div className="font-medium">
                                                {b.division}, {b.district}
                                            </div>
                                            <div className="text-base-content/70">
                                                {b.city}, {b.area}
                                            </div>
                                            <div className="text-base-content/50 text-xs mt-1">
                                                {b.address}
                                            </div>
                                        </div>
                                    </td>

                                    <td>৳{b.total}</td>

                                    <td>
                                        <span className={badgeClass(b.status)}>{b.status}</span>
                                    </td>

                                    {/* ✅ View Details + Cancel (AG) */}
                                    <td className="text-right space-x-2">
                                        <Link
                                            to={`/my-bookings/${b.id}`}
                                            className="btn btn-outline btn-sm"
                                        >
                                            View Details
                                        </Link>

                                        <button
                                            className="btn btn-error btn-outline btn-sm"
                                            onClick={() => handleCancel(b.id)}
                                            disabled={b.status === "Cancelled" || b.status === "Completed"}
                                            title={
                                                b.status === "Completed"
                                                    ? "Completed bookings cannot be cancelled"
                                                    : ""
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="p-4 text-sm text-base-content/60">
                        Note: Status updates to Confirmed/Completed can be added later (admin/payment).
                    </div>
                </div>
            )}
        </div>
    );
}
