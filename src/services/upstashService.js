import axiosClient from "./axiosClient";
import convertJsonToFormData from "../Page/Admin/convertData.js";
import ForgotPassword from "../Page/auth/ForgotPassword.jsx";

const upstashService = {
    getme :async () => {
        const url = `/users/me`;
        return await   axiosClient.get(url);
    },
    loginUser: async (param) => {
        const url ='auth/login' ;
        return await axiosClient.post( url , param)
      },
    registerUser : async (param) => {
        const url ='/auth/register-user?role=ROLE_USER';
        return await axiosClient.post( url , param)
    },
    forgotPassword : async (email) => {
        const url =`/auth/send-forgot-password-code?email=${email}` ;
        return await axiosClient.post( url)
    },
    formresetpassword: async (param) => {
        const url='/auth/reset-password-no-auth'
        return await axiosClient.post( url, param)
    },

    // users
    getAllUsers :async () => {
        const url = `/users/all`;
        return await   axiosClient.get(url);
    },


    // Branch
    addBranch: async (data) => {
        const url = '/admin/branches/add';
        return await axiosClient.post(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    updateBranch: async (id, data) => {
        const url = `/admin/branches/update/${id}`;
        return await axiosClient.put(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    getallbranches: async () => {
        const url = '/admin/branches/all';
        return await axiosClient.get(url);
    },

    getBranchesid: async (id) => {
        const url = `/admin/branches/${id}`;
        return await axiosClient.get(url);
    },

    deleteBranch: async (id) => {
        const url = `/admin/branches/delete/${id}`;
        return await axiosClient.delete(url);
    },

    // Room
    getRoomId : async (id) => {
        const url =`/rooms/room/${id}`;
        return await axiosClient.get(url)
    },
    getAllRoom : async () => {
        const url =`/rooms/all-rooms`;
        return await axiosClient.get(url)
    },

    addRoom : async (data) => {
        const url ='/rooms/add/new-room';
        return await axiosClient.post(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    updateRoom: async (id, data) => {
        const url = `/rooms/update/${id}`;
        return await axiosClient.put(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    deleteRoom: async (id) => {
        const url = `/rooms/delete/room/${id}`;
        return await axiosClient.delete(url);
    },

    getType : async () => {
        const url = `/rooms/room/types`;
        return await axiosClient.get(url);
    },

    // reviews
    addReview : async (data) => {
        const url = `/reviews/create`;
        return await axiosClient.post(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    getAllReview : async () => {
        const url =`/reviews/all`;
        return await axiosClient.get(url)
    },

    deleteReview: async (reviewId) => {
        const url = `/reviews/delete/${reviewId}`;
        return await axiosClient.delete(url);
    },

    // shuttles
    getAllShuttles : async () => {
        const url =`/shuttles/get-all-shuttles`;
        return await axiosClient.get(url)
    },
    addShuttle : async (data) => {
        const url = `/shuttles/add`;
        // return await axiosClient.post(url, data);
        return await axiosClient.post(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    updateShuttle: async (id, data) => {
        const url = `/shuttles/update/${id}`;
        return await axiosClient.put(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteShuttle: async (id, branchId) => {
        const url = `/shuttles/delete/${id}?branchId=${branchId}`;
        return await axiosClient.delete(url);
    },
    getShuttlesid : async (id) => {
        const url =`/shuttles/all?branchId=${id}`;
        return await axiosClient.get(url)
    },

    // booking shuttle
    postBookingShuttle: async (branchId, shuttleId, userId, param) => {
        const url = `/shuttle-bookings/book-shuttle/${branchId}/${shuttleId}/${userId}`;
        return await axiosClient.post(url , param)
    },

    getAllBookingShuttle : async () => {
        const url =`/shuttle-bookings/all-bookings`;
        return await axiosClient.get(url)
    },

    deleteBookingShuttle: async (id, branchId) => {
        const url = `/shuttle-bookings/cancel/${branchId}/${id}`;
        return await axiosClient.delete(url);
    },
    getBookingShuttleBranchId : async (id) => {
        const url =`/shuttles/all?branchId=${id}`;
        return await axiosClient.get(url)
    },

    getBookingShuttleByCode : async (branchId,confirmationCode) => {
        const url =`shuttle-bookings/get-by-confirmation-code/${branchId}/${confirmationCode}`;
        return await axiosClient.get(url)
    },

    // spa
    addSpa : async (data) => {
        const url = `/spas/add`;
        return await axiosClient.post(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    getAllSpas : async () => {
        const url =`/spas/get-all-spas`;
        return await axiosClient.get(url)
    },

    updateSpa : async (id, data) => {
        const url = `/spas/update/${id}`;
        return await axiosClient.put(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    deleteSpa: async (id) => {
        const url = `/spas/delete/${id}`;
        return await axiosClient.delete(url);
    },
    // booking-spa
    postBookingSpa: async (branchId, spaId, userId, param) => {
        const url = `/spa-bookings/book-spa/${branchId}/${spaId}/${userId}`;
        return await axiosClient.post(url , param)
    },

    getAllBookingSpa : async () => {
        const url =`/spa-bookings/all-bookings`;
        return await axiosClient.get(url)
    },

    deleteBookingSpa: async ( branchId, id) => {
        const url = `/spa-bookings/cancel/${branchId}/${id}`;
        return await axiosClient.delete(url);
    },

    // restaurant
    addRestaurant : async (data) => {
        const url = `/restaurants/add`;
        return await axiosClient.post(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    getAllRestaurant : async () => {
        const url =`/restaurants/get-all-restaurants`;
        return await axiosClient.get(url)
    },
    updateRestaurant : async (id, data) => {
        const url = `/restaurants/update/${id}`;
        return await axiosClient.put(url, convertJsonToFormData(data), {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteRestaurant: async (restaurantId) => {
        const url = `/restaurants/delete/${restaurantId}`;
        return await axiosClient.delete(url);
    },

    getrestaurantbranchId : async (id) => {
        const url =`/restaurants/all?branchId=${id}`;
        return await axiosClient.get(url)
    },
    getSpabranchId : async  (id) => {
      const url =`/spas/all?branchId=${id}`;
      return await axiosClient.get(url)
    },
    bookrestaurant : async (branchId , restaurantId , userId , param) => {
        const url =`/restaurant-bookings/book-restaurant/${branchId}/${restaurantId}/${userId}`;
        return await axiosClient.post(url , param)
    },
    bookSpa : async () => {

    },
    // booking restaurant
    postBookingRestaurant: async (branchId, restaurantId, userId, param) => {
        const url = `/restaurant-bookings/book-restaurant/${branchId}/${restaurantId}/${userId}`;
        return await axiosClient.post(url , param)
    },

    getAllBookingRestaurant : async () => {
        const url =`/restaurant-bookings/all-bookings`;
        return await axiosClient.get(url)
    },

    deleteBookingRestaurant: async (id, branchId) => {
        const url = `/restaurant-bookings/cancel/${branchId}/${id}`;
        return await axiosClient.delete(url);
    },

    //  book
    postbookingsRoom : async (param) => {
        const url ='/bookings/create';
        return await axiosClient.post(url , param)
    },
    getAllBookingRoom : async () => {
        const url =`/bookings/all`;
        return await axiosClient.get(url)
    },
    deleteBookingRoom: async (id) => {
        const url = `/bookings/delete/${id}`;
        return await axiosClient.delete(url);
    },
    //vnpay
    vnpay : async (bookingId , modeOfPayment) => {
      const url =`/api/submitOrder?bookingId=${bookingId}&modeOfPayment=${modeOfPayment}`
        return await axiosClient.post(url )
    },

//BookingHistory
    gethistoryshuttle : async (id) => {
        const url = `/shuttle-bookings/user/${id}`;
        return await axiosClient.get(url)
    },
    getIDbook : async (id) => {
        const url =`/bookings/${id}`;
        return await axiosClient.get(url);
    },
    gethistorybookings : async (id) => {
        const url =`/bookings/user/${id}`;
        return await axiosClient.get(url)
    },
    gethistoryspa : async (id) => {
        const url =`/spa-bookings/user-bookings/${id}`;
        return await axiosClient.get(url)
    }
}
export default upstashService
