import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl border border-base-200 max-w-lg w-full">
        <div className="card-body text-center">
          <div className="text-6xl">😵‍💫</div>
          <h1 className="text-3xl font-extrabold mt-2">404 - Page Not Found</h1>
          <p className="text-base-content/70">
            The page you’re looking for doesn’t exist or was moved.
          </p>

          <div className="card-actions justify-center mt-4">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
