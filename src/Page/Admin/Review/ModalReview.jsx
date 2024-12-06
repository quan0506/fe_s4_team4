// import { Modal, Button, Upload } from "antd";
// import React, { useState } from "react";
//
// const ModalReview = ({
//                         type,
//                         data,
//                         onClose,
//                         isModalVisible,
//                         onSave
//                     }) => {
//     const [form, setForm] = useState(data || {});
//     const [selectedImages, setSelectedImages] = useState([]);
//
//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setSelectedImages(files);
//     };
//
//     const handleSave = () => {
//         const updatedData = { ...form, images: selectedImages };
//         if (onSave) {
//             onSave(updatedData);
//         }
//         onClose();
//     };
//
//     return (
//         <Modal
//             title={type === "edit" ? "Edit Project" : "Add Project"}
//             open={isModalVisible}
//             onCancel={onClose}
//             footer={
//                 <>
//                     <Button type="primary" onClick={handleSave}>
//                         Save
//                     </Button>
//                     <Button onClick={onClose}>Cancel</Button>
//                 </>
//             }
//             width={800}
//         >
//             <div>
//                 <label>
//                     <strong>Project Name:</strong>
//                     <input
//                         type="text"
//                         value={form.projectName || ""}
//                         onChange={(e) =>
//                             setForm({ ...form, projectName: e.target.value })
//                         }
//                         style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//                     />
//                 </label>
//                 <label>
//                     <strong>Status:</strong>
//                     <select
//                         value={form.status || ""}
//                         onChange={(e) =>
//                             setForm({ ...form, status: e.target.value })
//                         }
//                         style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//                     >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                     </select>
//                 </label>
//                 <label>
//                     <strong>Upload Images:</strong>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileChange}
//                         style={{ marginTop: "10px" }}
//                     />
//                 </label>
//                 <div style={{ marginTop: "20px" }}>
//                     <strong>Selected Images:</strong>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
//                         {selectedImages.map((image, index) => (
//                             <div key={index} style={{ width: "100px", height: "100px", position: "relative" }}>
//                                 <img
//                                     src={URL.createObjectURL(image)}
//                                     alt={`Preview ${index}`}
//                                     style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </Modal>
//     );
// };
//
// export default ModalReview;
