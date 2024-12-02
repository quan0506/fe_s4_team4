import axiosClient from "./axiosClient";
const upstashService = {
    loginUser: async (param) => {
        const url ='auth/login' ;
        return await axiosClient.post( url , param)
      },
    registerUser : async (param) => {
        const url ='/auth/register-user?role=USER';
        return await axiosClient.post( url , param)
    },
    // branches
    getallbranches : async () => {
        const url ='/admin/branches/all';
        return await axiosClient.get( url )
    },
    getBranchesid : async (id) => {
        const url =`/admin/branches/${id}`;
        return await axiosClient.get( url )
    },
    // phong
    getRoomId : async (id) => {
        const url =`/rooms/room/${id}`;
        return await axiosClient.get(url)
    },
    getAllRoom : async () => {
        const url =`/rooms/all-rooms`;
        return await axiosClient.get(url)
    },
    // shuttles
    getShuttlesid : async (id) => {
        const url =`/shuttles/all?branchId=${id}`;
        return await axiosClient.get(url)
    }
}
export default upstashService
