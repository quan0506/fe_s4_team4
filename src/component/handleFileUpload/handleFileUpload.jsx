import axios from 'axios';
import toast from "react-hot-toast";
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"];
const apiClou = 'https://api.cloudinary.com/v1_1/dufutaaau/image/upload';
const handleFileUpload = async (file, setThumbnailPreview, setFile) => {
  if (ALLOWED_TYPES.includes(file.type)) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rjp8ijj0');
    try {
      const response = await axios.post(apiClou, formData);
      setThumbnailPreview(response.data.secure_url);
      setFile(file);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("Lỗi khi upload ảnh lên Cloudinary!");
    }
  } else {
    toast.error("Định dạng file không hợp lệ!");
  }
};

export default handleFileUpload;
