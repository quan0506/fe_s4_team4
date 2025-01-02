// import React, { useState, useEffect } from "react";
// import {Modal, Form, Input, Button, message,} from "antd";
//
// const ModalUser = ({ type, data, isModalVisible, onClose, onSave }) => {
//     const [form] = Form.useForm();
//
//     useEffect(() => {
//         if (data) {
//             form.setFieldsValue({
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 email: data.email,
//                 phone: data.phone,
//             });
//         } else {
//             form.resetFields();
//         }
//     }, [data, form]);
//
//     const handleOk = () => {
//         form.validateFields()
//             .then((values) => {
//                 onSave(values);
//             })
//             .catch((errorInfo) => {
//                 console.error("Validation Failed:", errorInfo);
//             });
//     };
//
//     return (
//         <Modal
//             title={type === "add" ? "Thêm khách hàng" : ""}
//             visible={isModalVisible}
//             onCancel={onClose}
//             footer={null}
//         >
//             <Form
//                 form={form}
//                 layout="vertical"
//                 initialValues={{
//                     firstName: "",
//                     lastName: "",
//                     email: "",
//                     phone: "",
//                 }}
//             >
//                 <Form.Item
//                     label="First Name"
//                     name="firstName"
//                 >
//                     <Input placeholder="Nhập First Name" />
//                 </Form.Item>
//
//                 <Form.Item
//                     label="Last Name"
//                     name="lastName"
//                 >
//                     <Input placeholder="Nhập Last Name" />
//                 </Form.Item>
//
//                 <Form.Item
//                     label="Email"
//                     name="email"
//                     rules={[{ type: "email", message: "Email không hợp lệ!" },]}
//                 >
//                     <Input placeholder="Nhập Email" />
//                 </Form.Item>
//
//                 <Form.Item
//                     label="Password"
//                     name="password"
//                     rules={[{ required: type === "add", message: "Nhập Password đủ 8 kí tự, Chữ hoa,số và kí tự!" },]}
//                 >
//                     <Input.Password placeholder="Nhập Password" />
//                 </Form.Item>
//
//                 <Form.Item
//                     label="Phone"
//                     name="phone"
//                 >
//                     <Input placeholder="Nhập số điện thoại" />
//                 </Form.Item>
//
//                 <Form.Item>
//                     <Button type="primary" onClick={handleOk} style={{ marginRight: 8 }}>
//                         Lưu
//                     </Button>
//                     <Button onClick={onClose}>Hủy</Button>
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };
//
// export default ModalUser;




import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";

const ModalUser = ({ type, data, isModalVisible, onClose, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
            });
        } else if (isModalVisible) {
            form.resetFields();
        }
    }, [data, form, isModalVisible]);

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                onSave(values);
            })
            .catch((errorInfo) => {
                console.error("Validation Failed:", errorInfo);
            });
    };

    return (
        <Modal
            title={type === "add" ? "Thêm khách hàng" : ""}
            open={isModalVisible} // Sử dụng 'open' thay vì 'visible'
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                }}
            >
                <Form.Item label="First Name" name="firstName">
                    <Input placeholder="Nhập First Name" />
                </Form.Item>

                <Form.Item label="Last Name" name="lastName">
                    <Input placeholder="Nhập Last Name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                >
                    <Input placeholder="Nhập Email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: type === "add",
                            message:
                                "Nhập Password đủ 8 kí tự, Chữ hoa,số và kí tự!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Nhập Password" />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleOk} style={{ marginRight: 8 }}>
                        Lưu
                    </Button>
                    <Button onClick={onClose}>Hủy</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUser;
