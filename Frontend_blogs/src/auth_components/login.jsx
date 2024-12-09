
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });
  const navigate = useNavigate(); // Initialize navigate


  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" }); // Clear any previous errors
  
    axiosClient
      .post("/login", { email, password })
      .then(({ data }) => {
        setCurrentUser(data.user); // Store the logged-in user
        setUserToken(data.token); // Store the authentication token
        navigate("/"); // Redirect to the homepage or dashboard
      })
      .catch((error) => {
        if (error.response) {
          // Check if the response has error messages
          if (error.response.data.error) {
            // If the error is a single message (e.g., incorrect credentials)
            setError({ __html: error.response.data.error });
          } else if (error.response.data.message) {
            // If the error includes validation errors
            const finalErrors = Object.values(error.response.data.message).reduce(
              (accum, next) => [...accum, ...next],
              []
            );
            setError({ __html: finalErrors.join("<br>") });
          }
        }
        console.error(error);
      });
  };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg border-0" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="text-center fs-4 fw-bold text-dark">
            Sign in to Your Account
          </h2>
          <p className="text-center fs-6 text-muted">
            Or{" "}
            <Link
              to="/signup"
              className="fw-medium text-primary text-decoration-none"
            >
              Signup 
            </Link>
          </p>

          {error.__html && (
            <div
              className="alert alert-danger text-center"
              dangerouslySetInnerHTML={error}
            ></div>
          )}

          <form onSubmit={onSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="email-address" className="form-label">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="form-control"
              
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="form-control"

              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="form-check-input"
                />
                <label htmlFor="remember-me" className="form-check-label">
                  Remember me
                </label>
              </div>
             
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
