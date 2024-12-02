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

  // Admin
  indexAdmin : {
    path: '/admin/IndexDashboard',
    component : IndexDashboard
  },
  IndexBranch: {
    path: '/admin/branches',
    component : IndexBranch
  },
  // IndexUser: {
  //   path: '/admin/users',
  //   component : IndexUser
  // }

  IndexReview: {
    path: '/admin/reviews',
    component : IndexReview
  },
};

export default privateRoutes;
