import { Link } from "react-router-dom";

const services = [
    {
        id: "baby",
        title: "Baby Care",
        img: "/images/baby.jpg",
        desc: "Reliable babysitters for hourly or daily care at home.",
        price: "৳350 / hour",
    },
    {
        id: "elderly",
        title: "Elderly Care",
        img: "/images/elderly.jpg",
        desc: "Compassionate support for seniors—safe and trusted.",
        price: "৳300 / hour",
    },
    {
        id: "sick",
        title: "Sick Care",
        img: "/images/sick.jpg",
        desc: "Home assistance for recovery and special care needs.",
        price: "৳400 / hour",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* HERO */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20" />
                <div className="relative max-w-6xl mx-auto px-4 py-14">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="badge badge-primary badge-outline mb-4">
                                Care.xyz / Care.IO
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                Book trusted care for your family—fast & secure
                            </h1>
                            <p className="mt-4 text-base-content/70 max-w-xl">
                                Choose baby care, elderly care, or sick care. Book by duration and
                                location, track status, and manage bookings from one place.
                            </p>

                            <div className="mt-6 flex gap-3 flex-wrap">
                                <a href="#services" className="btn btn-primary">
                                    Explore Services
                                </a>
                                <Link to="/my-bookings" className="btn btn-secondary btn-outline">
                                    My Bookings
                                </Link>
                            </div>

                            {/* Quick features */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="card bg-base-100 shadow-sm border border-base-200">
                                    <div className="card-body p-4">
                                        <div className="font-bold">Verified</div>
                                        <div className="text-sm text-base-content/60">
                                            Trusted caregivers
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow-sm border border-base-200">
                                    <div className="card-body p-4">
                                        <div className="font-bold">Dynamic Cost</div>
                                        <div className="text-sm text-base-content/60">
                                            Auto calculation
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg-base-100 shadow-sm border border-base-200">
                                    <div className="card-body p-4">
                                        <div className="font-bold">Status</div>
                                        <div className="text-sm text-base-content/60">
                                            Pending → Completed
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero image card */}
                        <div className="card bg-base-100 shadow-xl border border-base-200">
                            <figure className="h-72 md:h-80">
                                <img
                                    className="w-full h-full object-cover"
                                    src="/images/elderly.jpg"
                                    alt="Care service"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    Care that feels like family
                                    <div className="badge badge-accent">24/7</div>
                                </h2>
                                <p className="text-base-content/70">
                                    Designed for safe home care booking with a clean and simple flow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="max-w-6xl mx-auto px-4">
                {/* About */}
                <section className="py-10">
                    <div className="card bg-base-100 shadow border border-base-200">
                        <div className="card-body">
                            <h2 className="text-2xl font-bold">About Care.xyz</h2>
                            <p className="text-base-content/70">
                                Care.xyz helps families hire reliable caregivers for children, elderly,
                                and sick family members. Our mission is to make caregiving easy,
                                secure, and accessible for everyone.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section id="services" className="py-10">
                    <div className="flex items-end justify-between flex-wrap gap-2 mb-5">
                        <h2 className="text-2xl font-bold">Services</h2>
                        <p className="text-sm text-base-content/60">
                            View details → then book by duration & location
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((s) => (
                            <div key={s.id} className="card bg-base-100 shadow-xl border border-base-200">
                                <figure className="h-44">
                                    <img className="w-full h-full object-cover" src={s.img} alt={s.title} />
                                </figure>

                                <div className="card-body">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="card-title">{s.title}</h3>
                                        <span className="badge badge-primary badge-outline">{s.price}</span>
                                    </div>
                                    <p className="text-base-content/70">{s.desc}</p>

                                    <div className="card-actions justify-end mt-2">
                                        <Link to={`/service/${s.id}`} className="btn btn-primary btn-sm">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials / Stats */}
                <section className="py-10">
                    <h2 className="text-2xl font-bold mb-5">Testimonials / Success</h2>

                    <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-100 border border-base-200 w-full">
                        <div className="stat">
                            <div className="stat-title">Average Rating</div>
                            <div className="stat-value text-primary">4.8</div>
                            <div className="stat-desc">From verified bookings</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Bookings Completed</div>
                            <div className="stat-value text-secondary">1200+</div>
                            <div className="stat-desc">Across Bangladesh</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Support</div>
                            <div className="stat-value text-accent">24/7</div>
                            <div className="stat-desc">Care team ready</div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card bg-base-100 shadow border border-base-200">
                            <div className="card-body">
                                <p className="text-base-content/80">
                                    “Booking was smooth, and the caregiver was professional and kind.”
                                </p>
                                <div className="text-sm text-base-content/60">— User review</div>
                            </div>
                        </div>
                        <div className="card bg-base-100 shadow border border-base-200">
                            <div className="card-body">
                                <p className="text-base-content/80">
                                    “I can track booking status anytime. Very helpful for busy families.”
                                </p>
                                <div className="text-sm text-base-content/60">— User review</div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="py-10 text-center text-sm text-base-content/60">
                    © {new Date().getFullYear()} Care.xyz
                </footer>
            </div>
        </div>
    );
}
