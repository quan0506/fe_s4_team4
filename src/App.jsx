import AppLayout from "./layouts";
import './index.css'
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-slideshow-image/dist/styles.css';
import UserStore from "./constants/states/user.js";
import upstashService from "./services/upstashService.js";
import {useEffect} from "react";
// ssadsad
function App() {
  const {setUser}=UserStore()
  const fetchtUser = async () => {
    const token = localStorage.getItem('accessToken')
    if(!token) {
      return
    }
    const res = await upstashService.getme()
    setUser(res)
  }

  useEffect(() => {
    fetchtUser()
  }, [])
  return (
    <>
      <AppLayout />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
