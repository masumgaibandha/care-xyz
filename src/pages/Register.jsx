import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Register() {
    const { registerUser, updateUserProfile, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const [nid, setNid] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const validatePassword = (pass) => {
        const okLen = pass.length >= 6;
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        return okLen && hasUpper && hasLower;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!validatePassword(password)) {
            setError("Password must be 6+ chars with 1 uppercase and 1 lowercase.");
            return;
        }

        try {
            await registerUser(email, password);
            await updateUserProfile(name);

            // Optional: store extra info locally for now (AG fields)
            localStorage.setItem(
                "care_profile",
                JSON.stringify({ nid, name, contact, email })
            );

            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogle = async () => {
        setError("");
        try {
            await googleLogin();
            navigate(from, { replace: true });
        } catch {
            setError("Google registration failed");
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-10">
            <div className="card bg-base-100 shadow border border-base-200">
                <div className="card-body">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <p className="text-base-content/60">Create your Care.xyz account</p>

                    <button onClick={handleGoogle} type="button" className="btn btn-outline w-full mt-4">
                        Continue with Google
                    </button>

                    <div className="divider">OR</div>

                    <form onSubmit={handleRegister} className="space-y-3">
                        <input
                            className="input input-bordered w-full"
                            placeholder="NID No"
                            value={nid}
                            onChange={(e) => setNid(e.target.value)}
                            required
                        />

                        <input
                            className="input input-bordered w-full"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className="input input-bordered w-full"
                            placeholder="Contact"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="Password (6+ chars, upper+lower)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p className="text-error text-sm">{error}</p>}

                        <button className="btn btn-primary w-full">Register</button>
                    </form>

                    <p className="text-sm text-base-content/70 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="link link-primary">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
