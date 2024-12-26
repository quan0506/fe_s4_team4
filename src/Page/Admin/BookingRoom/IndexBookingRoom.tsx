// import React, { useEffect, useState } from "react";
// import upstashService from "../../../services/upstashService.js";
// import ModalBookingRoom from "./ModalBookingRoom";
//
// export default function IndexBookingRoom() {
//     const [listBookingRoom, setListBookingRoom] = useState([]);
//     const [modalType, setModalType] = useState(null);
//     const [currentBookingRoom, setCurrentBookingRoom] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [rooms, setRooms] = useState([]);
//     const [selectedRoomType, setSelectedRoomType] = useState(null);
//
//     const fetchBookingRooms = async () => {
//         try {
//             const bookingRoomResponse = await upstashService.getAllBookingRoom();
//             console.log("API Response:", bookingRoomResponse);
//
//             if (bookingRoomResponse && Array.isArray(bookingRoomResponse.bookings)) {
//                 setListBookingRoom(bookingRoomResponse.bookings);
//                 console.log("Booking Rooms response:", bookingRoomResponse.bookings);
//             } else {
//                 console.warn("Unexpected response :", bookingRoomResponse);
//             }
//         } catch (error) {
//             console.error("Error fetching booking rooms:", error);
//         }
//     };
//
//     useEffect(() => {
//         console.log("Fetching booking rooms: ");
//         fetchBookingRooms();
//     }, []);
//
//     console.log("List booking", listBookingRoom);
//
//     return (
//         <div>
//             <h1>Booking Room List</h1>
//             {listBookingRoom.length === 0 ? (
//                 <p>No bookings available.</p>
//             ) : (
//                 <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
//                     <thead>
//                     <tr>
//                         <th>Booking ID</th>
//                         <th>User Name</th>
//                         <th>Room Type</th>
//                         <th>Check-In Date</th>
//                         <th>Check-Out Date</th>
//                         <th>Adults</th>
//                         <th>Children</th>
//                         <th>Total Price</th>
//                         <th>Status</th>
//                         <th>Confirmation Code</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {listBookingRoom.map((booking) => (
//                         <tr key={booking.bookingId}>
//                             <td>{booking.bookingId || "N/A"}</td>
//                             <td>{booking.userName || "N/A"}</td>
//                             <td>{booking.roomType || "N/A"}</td>
//                             <td>{booking.checkInDate ? `${booking.checkInDate[0]}-${booking.checkInDate[1]}-${booking.checkInDate[2]}` : "N/A"}</td>
//                             <td>{booking.checkOutDate ? `${booking.checkOutDate[0]}-${booking.checkOutDate[1]}-${booking.checkOutDate[2]}` : "N/A"}</td>
//                             <td>{booking.adults || 0}</td>
//                             <td>{booking.children || 0}</td>
//                             <td>{booking.totalPrice ? booking.totalPrice.toFixed(2) : "0.00"}</td>
//                             <td>{booking.status || "Unknown"}</td>
//                             <td>{booking.confirmBookingCode || "None"}</td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import upstashService from "../../../services/upstashService.js";
import ModalBookingRoom from "./ModalBookingRoom";
import { Table, Button, Modal, Space, message, Dropdown } from "antd";

export default function IndexBookingRoom() {
    const [listBookingRoom, setListBookingRoom] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [currentBookingRoom, setCurrentBookingRoom] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState(null);

    const fetchBookingRooms = async () => {
        try {
            const bookingRoomResponse = await upstashService.getAllBookingRoom();
            const bookingRoomData = bookingRoomResponse.bookings;
            console.log("Booking Room Data:", bookingRoomData);

            setListBookingRoom(listBookingRoom);
        } catch (error) {
            console.error("Failed to fetch Room:", error);
        }
    };

    useEffect(() => {
        fetchBookingRooms();
    }, []);

    const columns = [
        {
            title: "Booking ID",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "Người đặt",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Loại Phòng",
            dataIndex: "roomType",
            key: "roomType",
        },
        {
            title: "Số Người Lớn",
            dataIndex: "adults",
            key: "adults",
        },
        {
            title: "Số Trẻ em",
            dataIndex: "children",
            key: "children",
        },
        {
            title: "Ngày Đặt Phòng",
            dataIndex: "checkInDate",
            key: "checkInDate",
            render: (checkInDate) => {
                const [year, month, day] = checkInDate;
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Ngày Trả Phòng",
            dataIndex: "checkOutDate",
            key: "checkOutDate",
            render: (checkOutDate) => {
                const [year, month, day] = checkOutDate;
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: "Tổng Tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Mã Xác Nhận",
            dataIndex: "confirmBookingCode",
            key: "confirmBookingCode",
        },
    ];

    console.log('listbookingroom',listBookingRoom);
    return (
        <div>
            <Table columns={columns} dataSource={listBookingRoom} rowKey="bookingId" />

        </div>
    );
}