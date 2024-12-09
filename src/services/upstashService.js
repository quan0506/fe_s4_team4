import axiosClient from "./axiosClient";
import convertJsonToFormData from "../Page/Admin/convertData.js";

const upstashService = {
    // me
    getme :async () => {
        const url = `/users/me`;
        return await   axiosClient.get(url);
    },
    loginUser: async (param) => {
        const url ='auth/login' ;
        return await axiosClient.post( url , param)
      },
    registerUser : async (param) => {
        const url ='/auth/register-user?role=USER';
        return await axiosClient.post( url , param)
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
    getShuttlesid : async (id) => {
        const url =`/shuttles/all?branchId=${id}`;
        return await axiosClient.get(url)
    },
    postbookshuttle : async (branchId , shuttleId , userId , param) => {
        const url =`/shuttle-bookings/book-shuttle/${branchId}/${shuttleId}/${userId}`;
        return await axiosClient.post(url,param);
    },

    //  book
    postbookingsRoom : async (param) => {
        const url ='/bookings/create';
        return await axiosClient.post(url , param)
    }
}
export default upstashService
