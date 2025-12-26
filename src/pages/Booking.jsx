import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const servicePrice = {
    baby: 350,
    elderly: 300,
    sick: 400,
};

const serviceTitle = {
    baby: "Baby Care",
    elderly: "Elderly Care",
    sick: "Sick Care",
};

export default function Booking() {
    const { user } = useContext(AuthContext);
    const { service_id } = useParams();
    const navigate = useNavigate();

    const pricePerHour = servicePrice[service_id] ?? 0;
    const title = serviceTitle[service_id] ?? service_id;

    const [duration, setDuration] = useState("");
    const [division, setDivision] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [address, setAddress] = useState("");

    const total = useMemo(() => {
        const h = Number(duration);
        if (!h || !pricePerHour) return 0;
        return h * pricePerHour;
    }, [duration, pricePerHour]);

    const canSubmit =
        !!user?.email &&
        duration &&
        division &&
        district &&
        city &&
        area &&
        address.trim() &&
        total > 0;

    const handleConfirm = () => {
        if (!user?.email) return;

        const newBooking = {
            id: crypto.randomUUID(),
            userEmail: user.email,

            serviceId: service_id,
            serviceName: title,
            ratePerHour: pricePerHour,

            durationHours: Number(duration),

            division,
            district,
            city,
            area,
            address: address.trim(),

            total,
            status: "Pending",
            createdAt: new Date().toISOString(),
        };

        // ✅ Per-user storage key
        const key = `care_bookings_${user.email}`;
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(key, JSON.stringify([newBooking, ...prev]));

        // ✅ Email invoice (AG) - opens user's email client
        const subject = encodeURIComponent(
            `Care.xyz Invoice - ${newBooking.serviceName}`
        );
        const body = encodeURIComponent(
            `Hello ${user?.displayName || "User"},\n\n` +
            `Your booking has been placed successfully.\n\n` +
            `Invoice Details:\n` +
            `- Booking ID: ${newBooking.id}\n` +
            `- Service: ${newBooking.serviceName}\n` +
            `- Duration: ${newBooking.durationHours} hour(s)\n` +
            `- Rate: ৳${newBooking.ratePerHour}/hour\n` +
            `- Total: ৳${newBooking.total}\n` +
            `- Status: ${newBooking.status}\n` +
            `- Date: ${new Date(newBooking.createdAt).toLocaleString()}\n\n` +
            `Location:\n` +
            `${newBooking.division}, ${newBooking.district}, ${newBooking.city}, ${newBooking.area}\n` +
            `${newBooking.address}\n\n` +
            `Thank you for using Care.xyz\n`
        );

        // Opens mail compose
        window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;

        alert("Booking saved! Invoice email draft opened.");
        navigate("/my-bookings");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-2">Book Service</h1>
            <p className="text-base-content/70 mb-6">
                Service: <span className="font-semibold">{title}</span> • Rate:{" "}
                <span className="font-semibold">৳{pricePerHour}/hour</span>
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Duration */}
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

                {/* Division */}
                <div>
                    <label className="block font-semibold mb-2">Division</label>
                    <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="" disabled>
                            Choose division
                        </option>
                        <option>Dhaka</option>
                        <option>Chattogram</option>
                        <option>Khulna</option>
                        <option>Rajshahi</option>
                        <option>Barishal</option>
                        <option>Sylhet</option>
                        <option>Rangpur</option>
                        <option>Mymensingh</option>
                    </select>
                </div>

                {/* District / City / Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-semibold mb-2">District</label>
                        <select
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>
                                Select district
                            </option>
                            <option>Dhaka</option>
                            <option>Gazipur</option>
                            <option>Narayanganj</option>
                            <option>Chattogram</option>
                            <option>Cumilla</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">City</label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>
                                Select city
                            </option>
                            <option>Dhaka City</option>
                            <option>Gazipur City</option>
                            <option>Chattogram City</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Area</label>
                        <select
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            className="select select-bordered w-full"
                        >
                            <option value="" disabled>
                                Select area
                            </option>
                            <option>Mirpur</option>
                            <option>Dhanmondi</option>
                            <option>Uttara</option>
                            <option>Banani</option>
                            <option>Mohammadpur</option>
                        </select>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block font-semibold mb-2">Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House/Road details"
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Total */}
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
