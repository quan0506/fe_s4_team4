import axiosClient from "./axiosClient";
const upstashService = {
    loginUser: async (param) => {
        const url ='login' ;
        return await axiosClient.post( url , param)
      },
    registerUser : async (param) => {
        const url ='' ;
        return await axiosClient.post( url , param)
    },
    getBookingByConfirmationCode: async (param) => {
        const url ='' ;
        return await axiosClient.get(url)
    },
    isAdmin: async (param) => {
        const url ='' ;
        return await axiosClient.get(url)
    },
    getAllRooms: async (param) => {
        const url ='' ;
        return await axiosClient.get(url)
    },
    isAuthenticated: async (param) => {
        const url ='' ;
        return await axiosClient.get(url)
    },
    getRoomTypes: async (param) => {
        const url ='' ;
        return await axiosClient.get(url)
    },
    isUser: async () => {
        const url ='' ;
        return await axiosClient.get(url)
    }

}
export default upstashService
