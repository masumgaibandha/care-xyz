import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const servicePrice = {
    baby: 350,
    elderly: 300,
    sick: 400,
};

export default function Booking() {
    const { service_id } = useParams();
    const navigate = useNavigate();

    const pricePerHour = servicePrice[service_id] ?? 0;

    const [duration, setDuration] = useState("");
    const [division, setDivision] = useState("");
    const [cityArea, setCityArea] = useState("");
    const [address, setAddress] = useState("");

    const total = useMemo(() => {
        const h = Number(duration);
        if (!h || !pricePerHour) return 0;
        return h * pricePerHour;
    }, [duration, pricePerHour]);

    const canSubmit =
        duration && division && cityArea.trim() && address.trim() && total > 0;

    const handleConfirm = () => {
        const newBooking = {
            id: crypto.randomUUID(),
            serviceId: service_id,
            durationHours: Number(duration),
            division,
            cityArea: cityArea.trim(),
            address: address.trim(),
            total,
            status: "Pending",
            createdAt: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem("care_bookings") || "[]");
        localStorage.setItem("care_bookings", JSON.stringify([newBooking, ...prev]));

        alert("Booking saved! Status: Pending");
        navigate("/my-bookings");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-2">Book Service</h1>
            <p className="text-base-content/70 mb-6">
                Service: <span className="font-semibold">{service_id}</span> • Rate:{" "}
                <span className="font-semibold">৳{pricePerHour}/hour</span>
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label className="block font-semibold mb-2">Duration (hours)</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>
                            Select duration
                        </option>
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="4">4 hours</option>
                        <option value="8">8 hours</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-2">Location (Division)</label>
                    <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>
                            Choose division
                        </option>
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                        <option>Khulna</option>
                        <option>Rajshahi</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold mb-2">City / Area</label>
                    <input
                        value={cityArea}
                        onChange={(e) => setCityArea(e.target.value)}
                        type="text"
                        placeholder="City or area"
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter detailed address"
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-2">Total cost</label>
                    <input
                        type="text"
                        disabled
                        value={`৳${total}`}
                        className="input input-bordered w-full bg-base-200"
                    />
                    <p className="text-xs text-base-content/60 mt-1">
                        Total = duration × rate
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary w-full"
                    disabled={!canSubmit}
                    onClick={handleConfirm}
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
}
