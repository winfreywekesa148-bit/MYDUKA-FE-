import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterAdmin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        accessCode: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        // Check passwords
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Check access code
        if (!formData.accessCode.trim()) {
            setError("Please enter your access code.");
            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/register-admin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        access_code: formData.accessCode,
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.error ||
                    "Invalid access code or registration failed."
                );
                return;
            }

            setSuccess(
                "Admin account created successfully!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            setError(
                "Unable to connect to the server."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Admin Registration</h1>

                <p>
                    Enter the access code provided by
                    your store merchant.
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* ACCESS CODE */}

                    <label>
                        Merchant Access Code
                    </label>

                    <input
                        type="text"
                        name="accessCode"
                        placeholder="Enter access code"
                        value={formData.accessCode}
                        onChange={handleChange}
                        required
                    />

                    {/* NAME */}

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* EMAIL */}

                    <label>
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* PASSWORD */}

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {/* CONFIRM PASSWORD */}

                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register as Admin"}
                    </button>

                </form>

                <p>
                    Already have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/auth/login")}
                    >
                        Login
                    </button>
                </p>

            </div>

        </div>
    );
}

export default RegisterAdmin;