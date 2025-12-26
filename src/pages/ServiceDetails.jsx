import { Link, useParams } from "react-router-dom";

const serviceMap = {
    baby: {
        title: "Baby Care",
        img: "/images/baby.jpg",
        price: 350,
        desc: "Trusted babysitters for hourly or daily care at home. Safe, caring, and reliable support for your child.",
    },
    elderly: {
        title: "Elderly Care",
        img: "/images/elderly.jpg",
        price: 300,
        desc: "Compassionate home care support for seniors. Assistance with daily routine, companionship, and safety.",
    },
    sick: {
        title: "Sick Care",
        img: "/images/sick.jpg",
        price: 400,
        desc: "Home assistance for recovery and special care needs. Support tailored to patient comfort and routine.",
    },
};

export default function ServiceDetails() {
    const { service_id } = useParams();
    const service = serviceMap[service_id];

    if (!service) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="alert alert-error">
                    <span>Service not found.</span>
                </div>
                <Link className="btn btn-link mt-3" to="/">
                    ← Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="breadcrumbs text-sm mb-4">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li>{service.title}</li>
                </ul>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
                <figure className="h-64 md:h-80">
                    <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="card-body">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <h1 className="card-title text-2xl md:text-3xl">{service.title}</h1>
                        <div className="badge badge-primary badge-outline">
                            ৳{service.price} / hour
                        </div>
                    </div>

                    <p className="text-base-content/70">{service.desc}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                        <div className="card bg-base-200">
                            <div className="card-body p-4">
                                <div className="font-bold">Flexible Duration</div>
                                <div className="text-sm text-base-content/60">
                                    Hours or days
                                </div>
                            </div>
                        </div>
                        <div className="card bg-base-200">
                            <div className="card-body p-4">
                                <div className="font-bold">Location Based</div>
                                <div className="text-sm text-base-content/60">
                                    Division → Area
                                </div>
                            </div>
                        </div>
                        <div className="card bg-base-200">
                            <div className="card-body p-4">
                                <div className="font-bold">Status Tracking</div>
                                <div className="text-sm text-base-content/60">
                                    Pending → Completed
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <Link
                            to={`/booking/${service_id}`}
                            className="btn btn-primary"
                        >
                            Book Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
