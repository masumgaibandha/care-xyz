import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const serviceTitle = {
    baby: "Baby Care",
    elderly: "Elderly Care",
    sick: "Sick Care",
};

function badgeClass(status) {
    if (status === "Pending") return "badge badge-warning";
    if (status === "Confirmed") return "badge badge-info";
    if (status === "Completed") return "badge badge-success";
    if (status === "Cancelled") return "badge badge-error";
    return "badge";
}

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);

    const load = () => {
        const data = JSON.parse(localStorage.getItem("care_bookings") || "[]");
        setBookings(data);
    };

    useEffect(() => {
        load();
    }, []);

    const hasBookings = bookings.length > 0;

    const rows = useMemo(() => bookings, [bookings]);

    const handleCancel = (id) => {
        const next = bookings.map((b) =>
            b.id === id ? { ...b, status: "Cancelled" } : b
        );
        setBookings(next);
        localStorage.setItem("care_bookings", JSON.stringify(next));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Bookings</h1>
                    <p className="text-base-content/60">
                        Track booking status and manage your bookings.
                    </p>
                </div>

                <Link to="/#services" className="btn btn-primary btn-sm">
                    Book New Service
                </Link>
            </div>

            {!hasBookings ? (
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
                                    <td className="font-semibold">
                                        {serviceTitle[b.serviceId] || b.serviceId}
                                    </td>
                                    <td>{b.durationHours} hour(s)</td>
                                    <td>
                                        <div className="text-sm">
                                            <div className="font-medium">{b.division}</div>
                                            <div className="text-base-content/60">{b.cityArea}</div>
                                        </div>
                                    </td>
                                    <td>৳{b.total}</td>
                                    <td>
                                        <span className={badgeClass(b.status)}>{b.status}</span>
                                    </td>
                                    <td className="text-right">
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
                        Tip: Status update to Confirmed/Completed will be done later (admin/payment step).
                    </div>
                </div>
            )}
        </div>
    );
}
