import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const { loginUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await loginUser(email, password);
            navigate(from, { replace: true });
        } catch {
            setError("Invalid email or password");
        }
    };

    const handleGoogle = async () => {
        setError("");
        try {
            await googleLogin();
            navigate(from, { replace: true });
        } catch {
            setError("Google login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-10">
            <div className="card bg-base-100 shadow border border-base-200">
                <div className="card-body">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-base-content/60">Welcome back to Care.xyz</p>

                    <button onClick={handleGoogle} type="button" className="btn btn-outline w-full mt-4">
                        Continue with Google
                    </button>

                    <div className="divider">OR</div>

                    <form onSubmit={handleEmailLogin} className="space-y-4">
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
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {error && <p className="text-error text-sm">{error}</p>}

                        <button className="btn btn-primary w-full">Login</button>
                    </form>

                    <p className="text-sm text-base-content/70 mt-4">
                        New here?{" "}
                        <Link to="/register" className="link link-primary">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
