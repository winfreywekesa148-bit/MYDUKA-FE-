import { useEffect, useState } from "react";

import {
    getSupplyRequests,
    approveRequest,
    declineRequest
} from "../../services/adminservice";


function SupplyRequests() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ============================
    // LOAD REQUESTS
    // ============================

    const loadRequests = async () => {

        try {

            setLoading(true);

            const data = await getSupplyRequests();

            setRequests(
                data.requests || data
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to load supply requests."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadRequests();

    }, []);


    // ============================
    // APPROVE REQUEST
    // ============================

    const handleApprove = async (id) => {

        const confirmApprove = window.confirm(
            "Are you sure you want to approve this supply request?"
        );

        if (!confirmApprove) {
            return;
        }


        try {

            await approveSupplyRequest(id);

            setSuccess(
                "Supply request approved successfully."
            );

            setError("");

            await loadRequests();

        } catch (err) {

            setError(
                err.message ||
                "Failed to approve request."
            );

        }

    };


    // ============================
    // DECLINE REQUEST
    // ============================

    const handleDecline = async (id) => {

        const confirmDecline = window.confirm(
            "Are you sure you want to decline this supply request?"
        );

        if (!confirmDecline) {
            return;
        }


        try {

            await declineSupplyRequest(id);

            setSuccess(
                "Supply request declined."
            );

            setError("");

            await loadRequests();

        } catch (err) {

            setError(
                err.message ||
                "Failed to decline request."
            );

        }

    };


    // ============================
    // COUNTS
    // ============================

    const pendingRequests = requests.filter(
        request =>
            request.status === "pending"
    ).length;


    const approvedRequests = requests.filter(
        request =>
            request.status === "approved"
    ).length;


    const declinedRequests = requests.filter(
        request =>
            request.status === "declined"
    ).length;


    // ============================
    // LOADING
    // ============================

    if (loading) {

        return (
            <div className="requests-loading">
                Loading supply requests...
            </div>
        );

    }


    return (

        <div className="requests-page">


            {/* HEADER */}

            <div className="requests-header">

                <div>

                    <h1>
                        Supply Requests
                    </h1>

                    <p>
                        Review and manage requests
                        submitted by clerks.
                    </p>

                </div>

                <button
                    className="refresh-button"
                    onClick={loadRequests}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* ========================= */}
            {/* MESSAGES */}
            {/* ========================= */}

            {error && (

                <div className="request-error">

                    <span>
                        {error}
                    </span>

                    <button
                        onClick={() =>
                            setError("")
                        }
                    >
                        ×
                    </button>

                </div>

            )}


            {success && (

                <div className="request-success">

                    <span>
                        {success}
                    </span>

                    <button
                        onClick={() =>
                            setSuccess("")
                        }
                    >
                        ×
                    </button>

                </div>

            )}


            {/* ========================= */}
            {/* SUMMARY CARDS */}
            {/* ========================= */}

            <div className="request-stats">


                <div className="request-stat">

                    <div className="request-stat-icon">
                        📋
                    </div>

                    <div>

                        <span>
                            Total Requests
                        </span>

                        <strong>
                            {requests.length}
                        </strong>

                    </div>

                </div>


                <div className="request-stat">

                    <div className="request-stat-icon pending-icon">
                        ⏳
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {pendingRequests}
                        </strong>

                    </div>

                </div>


                <div className="request-stat">

                    <div className="request-stat-icon approved-icon">
                        ✓
                    </div>

                    <div>

                        <span>
                            Approved
                        </span>

                        <strong>
                            {approvedRequests}
                        </strong>

                    </div>

                </div>


                <div className="request-stat">

                    <div className="request-stat-icon declined-icon">
                        ✕
                    </div>

                    <div>

                        <span>
                            Declined
                        </span>

                        <strong>
                            {declinedRequests}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ========================= */}
            {/* REQUEST LIST */}
            {/* ========================= */}

            <div className="requests-container">

                <div className="requests-title">

                    <div>

                        <h2>
                            Clerk Requests
                        </h2>

                        <p>
                            Requests requiring your
                            attention.
                        </p>

                    </div>

                </div>


                {requests.length === 0 ? (

                    <div className="no-requests">

                        <div className="empty-icon">
                            📦
                        </div>

                        <h3>
                            No supply requests
                        </h3>

                        <p>
                            There are currently no
                            requests from clerks.
                        </p>

                    </div>

                ) : (

                    <div className="requests-list">

                        {requests.map(request => (

                            <div
                                className="request-card"
                                key={request.id}
                            >


                                {/* CARD HEADER */}

                                <div className="request-card-header">

                                    <div className="request-product">

                                        <div className="product-icon">
                                            📦
                                        </div>

                                        <div>

                                            <h3>
                                                {request.product_name ||
                                                    request.product?.name ||
                                                    "Unknown Product"}
                                            </h3>

                                            <span>
                                                Request #
                                                {request.id}
                                            </span>

                                        </div>

                                    </div>


                                    <span
                                        className={`request-status ${request.status}`}
                                    >
                                        {request.status
                                            ?.charAt(0)
                                            .toUpperCase() +
                                            request.status?.slice(1)}
                                    </span>

                                </div>


                                {/* REQUEST DETAILS */}

                                <div className="request-details">


                                    <div className="detail">

                                        <span>
                                            Requested By
                                        </span>

                                        <strong>
                                            {request.clerk_name ||
                                                request.clerk?.name ||
                                                "Unknown Clerk"}
                                        </strong>

                                    </div>


                                    <div className="detail">

                                        <span>
                                            Quantity
                                        </span>

                                        <strong>
                                            {request.quantity_requested}
                                        </strong>

                                    </div>


                                    <div className="detail">

                                        <span>
                                            Store
                                        </span>

                                        <strong>
                                            {request.store_name ||
                                                "MyDuka Store"}
                                        </strong>

                                    </div>


                                    <div className="detail">

                                        <span>
                                            Date Requested
                                        </span>

                                        <strong>
                                            {request.created_at
                                                ? new Date(
                                                    request.created_at
                                                ).toLocaleDateString()
                                                : "N/A"}
                                        </strong>

                                    </div>

                                </div>


                                {/* REASON */}

                                <div className="request-reason">

                                    <span>
                                        Reason for request
                                    </span>

                                    <p>
                                        {request.reason ||
                                            "No reason provided."}
                                    </p>

                                </div>


                                {/* ACTIONS */}

                                {request.status === "pending" && (

                                    <div className="request-actions">

                                        <button
                                            className="approve-button"
                                            onClick={() =>
                                                handleApprove(
                                                    request.id
                                                )
                                            }
                                        >
                                            ✓ Approve Request
                                        </button>


                                        <button
                                            className="decline-button"
                                            onClick={() =>
                                                handleDecline(
                                                    request.id
                                                )
                                            }
                                        >
                                            ✕ Decline Request
                                        </button>

                                    </div>

                                )}


                                {/* REVIEWED */}

                                {request.status !== "pending" && (

                                    <div className="already-reviewed">

                                        {request.status ===
                                        "approved"
                                            ? "✓ This request has been approved."
                                            : "✕ This request has been declined."}

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default SupplyRequests;