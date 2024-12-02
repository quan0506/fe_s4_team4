// import { Modal, Button } from "antd";
// import React, { useState } from "react";
//
// const ModalUser = ({
//                         type,
//                         data,
//                         onClose,
//                         isModalVisible,
//                         onSave,
//                         onDelete
//                     }) => {
//     const [form, setForm] = useState(data || {});
//
//     const handleSave = () => {
//         if (onSave) {
//             onSave(form);
//         }
//         onClose();
//     };
//
//     return (
//         <Modal
//             title={
//                 type === "view"
//                     ? "Project Details"
//                     : type === "edit"
//                         ? "Edit Project"
//                         : type === "delete"
//                             ? "Confirm Delete"
//                             : "Add Project"
//             }
//             open={isModalVisible}
//             onCancel={onClose}
//             footer={
//                 type === "view" ? (
//                     <Button type="primary" onClick={onClose}>
//                         Close
//                     </Button>
//                 ) : type === "delete" ? (
//                     <>
//                         <Button type="primary" danger onClick={onDelete}>
//                             Delete
//                         </Button>
//                         <Button onClick={onClose}>Cancel</Button>
//                     </>
//                 ) : (
//                     <>
//                         <Button type="primary" onClick={handleSave}>
//                             Save
//                         </Button>
//                         <Button onClick={onClose}>Cancel</Button>
//                     </>
//                 )
//             }
//             width={800}
//         >
//             {type === "view" && (
//                 <div>
//                     <p>
//                         <strong>Project Name:</strong> {data?.projectName}
//                     </p>
//                     <p>
//                         <strong>Status:</strong> {data?.status}
//                     </p>
//                     <p>
//                         <strong>Created At:</strong>{" "}
//                         {new Date(data?.createdAt).toLocaleString()}
//                     </p>
//                 </div>
//             )}
//
//             {type === "edit" && (
//                 <div>
//                     <label>
//                         <strong>Project Name:</strong>
//                         <input
//                             type="text"
//                             value={form.projectName}
//                             onChange={(e) =>
//                                 setForm({ ...form, projectName: e.target.value })
//                             }
//                             style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//                         />
//                     </label>
//                     <label>
//                         <strong>Status:</strong>
//                         <select
//                             value={form.status}
//                             onChange={(e) =>
//                                 setForm({ ...form, status: e.target.value })
//                             }
//                             style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
//                         >
//                             <option value="Active">Active</option>
//                             <option value="Inactive">Inactive</option>
//                         </select>
//                     </label>
//                 </div>
//             )}
//
//             {type === "delete" && (
//                 <p>
//                     Are you sure you want to delete <strong>{data?.projectName}</strong>?
//                 </p>
//             )}
//         </Modal>
//     );
// };
//
// export default ModalUser;
