import { apiRequest } from "./api";


// Invite a new admin
export function inviteAdmin(email) {

    return apiRequest("/merchant/invite-admin", {

        method: "POST",

        body: JSON.stringify({ email })

    });

}


// Get all stores
export function getStores() {

    return apiRequest("/merchant/stores");

}


// Get all admins
export function getAdmins() {

    return apiRequest("/merchant/admins");

}


// Deactivate an admin
export function deactivateAdmin(id) {

    return apiRequest(`/merchant/admins/${id}`, {

        method: "PUT"

    });

}


// Delete an admin
export function deleteAdmin(id) {

    return apiRequest(`/merchant/admins/${id}`, {

        method: "DELETE"

    });

}


// Merchant reports
export function getMerchantReports() {

    return apiRequest("/merchant/reports");

}