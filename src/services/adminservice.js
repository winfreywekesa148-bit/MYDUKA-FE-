import { apiRequest } from "./api";


// Add a clerk
export function addClerk(clerkData) {

    return apiRequest("/admin/add-clerk", {

        method: "POST",

        body: JSON.stringify(clerkData)

    });

}


// Get all clerks
export function getClerks() {

    return apiRequest("/admin/clerks");

}


// Approve supply request
export function approveRequest(id) {

    return apiRequest(`/admin/supply-request/${id}`, {

        method: "PUT"

    });

}


// Decline supply request
export function declineRequest(id) {

    return apiRequest(`/admin/supply-request/${id}/decline`, {

        method: "PUT"

    });

}


// View payments
export function getPayments() {

    return apiRequest("/admin/payments");

}


// Change payment status
export function markAsPaid(id) {

    return apiRequest(`/admin/payments/${id}`, {

        method: "PUT"

    });

}
