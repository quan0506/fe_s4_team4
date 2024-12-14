import HomePage from '../Page/home/HomePage'
import ProfilePage from '../Page/profile/ProfilePage';
import EditProfilePage from '../Page/profile/EditProfilePage'
import IndexBooking from '../Page/booking/IndexBooking.jsx'
import Bookinginformation from '../Page/booking/Bookinginformation/Bookinginformation'
import IndexServices from '../component/Services/IndexServices.jsx'
import DiscountCode from  '../Page/home/DiscountCode/DiscountCode.jsx'
import IndexFasterDetails from '../Page/FasterDetails/IndexFasterDetails'
import DetailBranches from '../Page/FasterDetails/DetailBranches'
import IndexBranchoffice from '../Page/FasterDetails/AllBranchoffice/IndexBranchoffice'
import IndexDashboard from "../Page/Admin/Dashboard/IndexDashboard";
// import IndexHotel from "../Page/Admin/Hotel/IndexHotel"
import Shuttles from "../Page/FasterDetails/Service/Shuttles.jsx"
import IndexBranch from "../Page/Admin/Branch/IndexBranch";
import IndexReview from "../Page/Admin/Review/IndexReview";
import IndexRoom from "../Page/Admin/Room/IndexRoom";
import BookingHistory from "../component/History";
import IndexShuttle from "../Page/Admin/Shuttle/IndexShuttle";
import IndexSpa from "../Page/Admin/Spa/IndexSpa";
import IndexRestaurant from  "../Page/Admin/Restaurant/IndexRestaurant";
// import IndexBookingShuttle from "../Page/Admin/BookingShuttle/IndexBookingShuttle";
// import IndexBookingSpa from "../Page/Admin/BookingSpa/IndexBookingSpa";
// import IndexBookingRestaurant from "../Page/Admin/BookingRestaurant/IndexBookingRestaurant";

const privateRoutes = {
  home: {
    path: '/',
    component: HomePage
  },
  services : {
    path: '/fasterdetails/services/:id',
    component : Shuttles
  },
  profile:{
    path: '/profile',
    component: ProfilePage,
  },
  editprofile :{
    path: '/edit-profile',
    component: EditProfilePage,
  },
  Bookking : {
    path: '/booking',
    component: IndexBooking,
  },
  Bookinginformation: {
    path: '/bookinginformation/:id',
    component: Bookinginformation
  },
  DiscountCode : {
    path: '/discountcode',
    component: DiscountCode
  },
  FasterDetails : {
    path: '/fasterdetails',
    component: IndexFasterDetails
  },
  DetailBranches : {
    path: '/detailbranches/:id',
    component: DetailBranches,
  },
  IndexBranchoffice : {
    path: '/allbranchoffice/:id',
    component: IndexBranchoffice,
  },
  // BookingHistory
  BookingHistory: {
    path: '/bookinghistory/shuttle',
    component: BookingHistory,
  },
  // Admin
  indexAdmin : {
    path: '/admin/IndexDashboard',
    component : IndexDashboard
  },
  IndexBranch: {
    path: '/admin/branches',
    component : IndexBranch
  },

  IndexReview: {
    path: '/admin/reviews',
    component : IndexReview
  },

  IndexShuttle: {
    path: '/admin/shuttles',
    component : IndexShuttle
  },

  IndexRoom: {
    path: '/admin/rooms',
    component : IndexRoom
  },

  IndexSpa: {
    path: '/admin/spas',
    component : IndexSpa
  },

  IndexRestaurant: {
    path: '/admin/restaurants',
    component : IndexRestaurant
  },

  // IndexShuttleBooking: {
  //   path: '/admin/shuttle-bookings',
  //   component : IndexBookingShuttle
  // },
  //
  // IndexShuttleRestaurant: {
  //   path: '/admin/restaurant-bookings',
  //   component : IndexBookingRestaurant
  // },
  // IndexShuttleSpa: {
  //   path: '/admin/spa-bookings',
  //   component : IndexBookingSpa
  // },
};

export default privateRoutes;
