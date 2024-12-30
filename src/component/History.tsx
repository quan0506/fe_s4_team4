import {useEffect, useState} from 'react';
import {Card, Avatar, Segmented} from 'antd';
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
import dayjs from 'dayjs';
import {useNavigate} from "react-router-dom";

export default function BookingHistory({data , shuttle = false , spa=false, title}) {
    const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
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

    const pathname = location.pathname
    const [selectedOption, setSelectedOption] = useState('Lịch sử đặt phòng');
    const navigate = useNavigate();
    console.log(data)
    useEffect(() => {
        if (pathname.includes('/bookinghistory/room')) {
            setSelectedOption('Lịch sử đặt phòng');
        } else if (pathname.includes('/bookinghistory/shuttle')) {
            setSelectedOption('Lịch sử đặt xe');
        } else if (pathname.includes('/bookinghistory/spa')) {
            setSelectedOption('Lịch sử đặt spa');
        }
    }, [pathname]);

    const handleSegmentChange = (value) => {
        setSelectedOption(value);
        // Chuyển hướng URL dựa trên lựa chọn
        if (value === 'Lịch sử đặt phòng') {
            navigate('/bookinghistory/room');
        } else if (value === 'Lịch sử đặt xe') {
            navigate('/bookinghistory/shuttle');
        } else if (value === 'Lịch sử đặt spa') {
            navigate('/bookinghistory/spa');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
            <div className='flex justify-end'>
                <Segmented
                    size='large'
                    options={['Lịch sử đặt phòng', 'Lịch sử đặt xe', 'Lịch sử đặt spa']}
                    value={selectedOption}
                    onChange={handleSegmentChange}
                    className="mb-8 bg-white/10 p-1 rounded-full"
                />
            </div>
            <h1 className="text-2xl font-bold text-center text-white mb-6">
                Lịch sử {title}
            </h1>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.map((booking) => (
                        <div key={booking.id} className="relative">
                            <Card
                                className="w-full bg-white/10 border border-white/20 shadow-lg"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Avatar
                                            src={booking?.shuttle?.photos[0] || booking?.spa?.photos[0]}
                                            size={50}
                                            icon={<CarOutlined/>}
                                            className="bg-gradient-to-r from-blue-400 to-blue-500"
                                        />
                                            <div className="ml-4">
                                                <p className="text-sm font-semibold text-white">
                                                    {booking?.carType || booking?.spa?.spaServiceName}
                                                </p>
                                            </div>

                                    </div>
                                    <div className="flex items-center">
                                        <Avatar
                                            size={50}
                                            icon={<UserOutlined/>}
                                            className="bg-gradient-to-r from-purple-400 to-purple-500"
                                        />
                                        {shuttle === true || spa=== true && (
                                            <div className="ml-4">
                                                <p className="text-sm font-semibold text-white">
                                                    {spa ? booking?.fullName : `${booking?.user?.lastName} ${booking?.user?.firstName}`}
                                                </p>
                                                <p className="text-xs text-gray-300">
                                                    Số điện thoại: {booking?.user?.phone}
                                                </p>
                                                {spa === true && (
                                                    <div>
                                                        <p className="text-xs text-gray-300">
                                                            Số lượng người: {booking?.numberOfPeople}/người
                                                        </p>
                                                        <p className="text-xs text-gray-300">
                                                            {booking?.userEmail}
                                                        </p>
                                                    </div>

                                                )}
                                            </div>
                                        )}
                                        {!shuttle === true || !spa === true && (
                                            <div className="ml-4">
                                                <p className="text-sm font-semibold text-white">
                                                </p>
                                                <p className="text-xs text-gray-300">
                                                    Số lượng người lớn: {booking?.adults}/người
                                                </p>
                                                <p className="text-xs text-gray-300">
                                                    Số lượng người trẻ em: {booking?.children}/người
                                                </p>
                                                <p className="text-xs text-gray-300">
                                                    Số điện thoại: {booking?.user?.phone}
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                    <div className="flex items-center">
                                        <HomeOutlined className="text-white text-xl"/>
                                        <div className="ml-4">
                                            <p className="text-sm font-semibold text-yellow-200">
                                                {booking?.locationInfo?.name}
                                            </p>
                                            <p className="text-sm text-yellow-300">
                                                {booking?.branchName|| booking?.spa?.branchName}<br/> Địa chỉ: {' '}
                                                {booking?.shuttle?.branchAddress || booking?.spa?.branchAddress}
                                            </p>
                                        </div>
                                    </div>
                                    {!spa === true && (
                                        <div className="flex items-center">
                                            <CalendarOutlined className="text-white text-xl"/>
                                            <div className="ml-4 flex items-center space-x-2 ">
                                                <div className="text-sm text-pink-200">
                                                    <span className="font-semibold">Bắt đầu: </span>
                                                    <span>{formatDateTime(booking?.shuttleCheckInDate || booking.checkInDate).date}</span>
                                                </div>
                                                <div className="text-sm text-pink-200">
                                                    <span className="font-semibold">Kết thúc: </span>
                                                    <span>{formatDateTime(booking?.shuttleCheckOutDate || booking?.checkOutDate).date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {spa === true && (
                                        <div className="flex items-center">
                                            <CalendarOutlined className="text-white text-xl"/>
                                            <div className="ml-4">
                                                <div className="text-sm text-pink-200">
                                                    <span className="font-semibold">Thời gian đặt lịch: </span>
                                                    <span>
                                                         {booking?.appointmentTime
                                                             ? dayjs(new Date(...booking.appointmentTime)).format('YYYY-MM-DD HH:mm')
                                                                : 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-pink-200">
                                                <span className="font-semibold">Thời gian sử dụng dịch vụ: </span>
                                                    <span>{booking?.spaServiceTime}/Phút</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span
                                            className={`px-4 py-1 text-xs font-semibold text-white rounded-full ${getStatusColor(
                                                booking?.status
                                            )}`}
                                        >
                                            {booking?.totalPrice?.toLocaleString() || booking?.spa?.spaServicePrice.toLocaleString()}/VNĐ
                                        </span>

                                        <div className="flex items-center gap-2">
                                            {!spa === true && (
                                                <p className="text-xs text-gray-400">Mã: {booking?.bookingConfirmationCode || booking?.confirmBookingCode}</p>
                                            )}
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
                                        Chi tiết đặt  {shuttle ? 'loại xe' : spa ? 'spa' : 'nhà hàng'}
                                    </h3>
                                    <p className="text-gray-200">{booking?.shuttle?.carDescription || booking?.spa?.spaDescription}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
