import HomePage from '../Page/home/HomePage'
import AllRoomsPage from '../Page/booking_rooms/AllRoomsPage';
import FindBookingPage from  '../Page/booking_rooms/FindBookingPage'
import RoomDetailsBookingPage from '../Page/booking_rooms/RoomDetailsPage'
import ProfilePage from '../Page/profile/ProfilePage';
import EditProfilePage from '../Page/profile/EditProfilePage'
const privateRoutes = {
  home: {
    path: '/',
    component: HomePage
  },
  rooms:{
    path: '/rooms',
    component: AllRoomsPage,
  },
  booking:{
    path: '/find-booking',
    component: FindBookingPage,
  },
  roombook: {
    path: '/room-details-book/:roomId',
    component: RoomDetailsBookingPage
  },
  profile:{
    path: '/profile',
    component: ProfilePage,
  },
  editprofile :{
    path: '/edit-profile',
    component: EditProfilePage,
  },


};

export default privateRoutes;
