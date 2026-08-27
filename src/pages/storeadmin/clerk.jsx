import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getClerks } from "../../services/adminservice";

function AdminDashboard() {
    const clerk = {
        id: 1,
        name: "Clerk One",
        email: "clerk1@gmail.com"
    }

    const navigate = useNavigate();

    const [clerks, setClerks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            const data = await getClerks();

            setClerks(data.clerks || data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="admin-dashboard">

            {/* SIDEBAR */}

            <aside className="admin-sidebar">

                <div className="admin-logo">
                    <span>My</span>Duka
                </div>

                <p className="role">
                    STORE ADMIN
                </p>


                <nav>

                    <button
                        onClick={() =>
                            navigate("/admin")
                        }
                    >
                        🏠 Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/clerks")
                        }
                    >
                        👥 Clerks
                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/supply-requests")
                        }
                    >
                        📦 Supply Requests
                    </button>

                    <button
                        onClick={() =>
                            navigate("/admin/payments")
                        }
                    >
                        💰 Payments
                    </button>

                    <button
                        onClick={() =>
                            navigate("/bar-chart")
                        }
                    >
                        📊 Bar Chart Reports
                    </button>

                    <button
                        onClick={() =>
                            navigate("/pie-chart")
                        }
                    >
                        📊 Pie Chart Reports
                    </button>

                </nav>


                <button
                    className="logout"
                    onClick={() => {

                        localStorage.removeItem("token");
                        localStorage.removeItem("user");

                        navigate("/auth/login");

                    }}
                >
                    🚪 Logout
                </button>

            </aside>


            {/* MAIN CONTENT */}

            <main className="admin-main">

                <header className="admin-header">

                    <div>

                        <h1>
                            Store Admin Dashboard
                        </h1>

                        <p>
                            Manage your store and team.
                        </p>

                    </div>

                </header>


                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                {/* STATISTICS */}

                <div className="admin-stats">

                    <div className="stat-card">

                        <div className="stat-icon">
                            👥
                        </div>

                        <div>
                            <p>Total Clerks</p>

                            <h2>
                                {clerks.length}
                            </h2>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📦
                        </div>

                        <div>
                            <p>Supply Requests</p>

                            <h2>
                                <button
                                    onClick={() =>
                                        navigate("/admin/supply-requests")
                                    }
                                >
                                    📦 View Requests
                                </button>
                            </h2>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            💰
                        </div>

                        <div>
                            <p>Unpaid Products</p>

                            <h2>
                                <button
                                    onClick={() =>
                                        navigate("/clerk/unpaid-products")
                                    }
                                >
                                    💰 View Unpaid Products
                                </button>
                            </h2>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📊
                        </div>

                        <div>
                            <p>Performance</p>

                            <h2>
                                <button
                                    onClick={() =>
                                       navigate("/bar-chart")
                                    }
                              >
                                    📊 Bar Chart Reports
                             </button>
                            </h2>
                        </div>

                    </div>

                </div>

                {/* RECENT CLERKS */}

                <section className="recent-section">

                    <div className="section-header">

                        <h2>
                            Store Clerks
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/admin/clerks")
                            }
                        >
                            View All
                        </button>

                    </div>


                    {loading ? (

                        <p>Loading clerks...</p>

                    ) : clerks.length === 0 ? (

                        <p>
                            No clerks have been added yet.
                        </p>

                    ) : (

                        <div className="clerk-table">

                            {clerks.slice(0, 5).map(
                                (clerk) => (

                                    <div
                                        className="clerk-row"
                                        key={clerk.id}
                                    >

                                        <div>

                                            <strong>
                                                {clerk.name}
                                            </strong>

                                            <small>
                                                {clerk.email}
                                            </small>

                                        </div>

                                        <span
                                            className={
                                                clerk.is_active
                                                    ? "active"
                                                    : "inactive"
                                            }
                                        >
                                            {clerk.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;
