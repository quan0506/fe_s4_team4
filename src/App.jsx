import AppLayout from "./layouts";
import './index.css'
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-slideshow-image/dist/styles.css';

function App() {
  return (
    <>
      <AppLayout />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
