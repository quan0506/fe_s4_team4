import { useState } from 'react';
import { Card, Avatar } from 'antd';
import {
    CarOutlined,
    UserOutlined,
    HomeOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import { Eye } from 'lucide-react';
import {useQuery} from "react-query";
import upstashService from "../services/upstashService";
import UserStore from "../constants/states/user.js"
export default function BookingHistory() {
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
    const {user}=UserStore()
    const { data: listhistoryshuttle } = useQuery(
        ['av.listhistoryshuttle' , user],
        () => upstashService.gethistoryshuttle(user?.id)
    );
    const apishuttle = listhistoryshuttle?.shuttleBookingList
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'cancelled':
                return 'bg-red-500';
            case 'ongoing':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('vi-VN'),
            time: date.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
            <h1 className="text-2xl font-bold text-center text-white mb-6">
                Lịch sử đặt xe
            </h1>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {apishuttle?.map((booking) => (
                        <div key={booking.id} className="relative">
                            <Card
                                className="w-full bg-white/10 border border-white/20 shadow-lg"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Avatar
                                            src={booking?.shuttle?.carPhotoUrl}
                                            size={50}
                                            icon={<CarOutlined/>}
                                            className="bg-gradient-to-r from-blue-400 to-blue-500"
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm font-semibold text-white">
                                                {booking?.shuttle?.carType}
                                            </p>
                                            <p className="text-xs text-gray-300">
                                                Biển số: 1111
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Avatar
                                            size={50}
                                            icon={<UserOutlined/>}
                                            className="bg-gradient-to-r from-purple-400 to-purple-500"
                                        />
                                        <div className="ml-4">
                                            <p className="text-sm font-semibold text-white">
                                                {booking?.user?.lastName} {booking?.user?.firstName}
                                            </p>
                                            <p className="text-xs text-gray-300">
                                                Số điện thoại: {booking?.user?.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <HomeOutlined className="text-white text-xl"/>
                                        <div className="ml-4">
                                            <p className="text-sm font-semibold text-yellow-200">
                                                {booking?.locationInfo?.name}
                                            </p>
                                            <p className="text-xs text-yellow-300">
                                                {booking?.locationInfo?.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <CalendarOutlined className="text-white text-xl"/>
                                        <div className="ml-4 flex items-center space-x-2 ">
                                            <div className="text-sm text-pink-200">
                                                <span className="font-semibold">Bắt đầu: </span>
                                                <span>{formatDateTime(booking?.shuttleCheckInDate).date}</span>
                                            </div>
                                            <div className="text-sm text-pink-200">
                                                <span className="font-semibold">Kết thúc: </span>
                                                <span>{formatDateTime(booking?.shuttleCheckOutDate).date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span
                                            className={`px-4 py-1 text-xs font-semibold text-white rounded-full ${getStatusColor(
                                                booking?.status
                                            )}`}
                                        >
                                            {booking?.status?.charAt(0)?.toUpperCase() +
                                                booking?.status?.slice(1)}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-gray-400">Mã: {booking?.bookingConfirmationCode}</p>
                                            <button
                                                onClick={() =>
                                                    setSelectedBooking(
                                                        selectedBooking === booking?.id ? null : booking?.id
                                                    )
                                                }
                                                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                                            >
                                                <Eye className="w-5 h-5 text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Description Overlay */}
                            <div
                                className={`absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg transition-all duration-300 ease-in-out ${
                                    selectedBooking === booking?.id
                                        ? 'opacity-100 visible'
                                        : 'opacity-0 invisible'
                                } flex items-center justify-center p-6`}
                                onClick={() => setSelectedBooking(null)}
                            >
                                <div
                                    className={`bg-white/10 p-6 rounded-lg border border-white/20 shadow-xl transform transition-all duration-300 ${
                                        selectedBooking === booking?.id ? 'scale-100' : 'scale-95'
                                    } max-w-sm w-full`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        Chi tiết đặt xe
                                    </h3>
                                    <p className="text-gray-200">{booking?.shuttle?.carDescription}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
