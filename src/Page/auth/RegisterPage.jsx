import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Card, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {createOrbs, createStars} from "../../component/Background";
import toast from "react-hot-toast";
import upstashService from "../../services/upstashService.js";
function RegisterPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const handleSubmit = async (values) => {
        try {
             await upstashService.registerUser({
                ...values
            });
                toast.success('User registered successfully');
                navigate('/login')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data || error.message);
        }
    };
    useEffect(() => {
        createStars();
        createOrbs();
    }, []);
    return (
      <div className="login-background min-h-screen flex items-center justify-center relative">
          <Card
            className="w-full max-w-md p-8 rounded-lg bg-black bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 ">
              <h2 className="text-center text-white text-2xl font-bold mb-6 ">Register</h2>
              <Form
                form={form}
                name="login"
                onFinish={handleSubmit}
                layout="vertical"
                className="space-y-4"
              >
                  <Form.Item
                    name="firstName"
                    rules={[{required: true, message: 'Please input your email!'}]}
                  >
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="Firstname"
                        className=" bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                      />
                  </Form.Item>
                  <Form.Item
                    name="lastName"
                    rules={[{required: true, message: 'Please input your email!'}]}
                  >
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="LastName"
                        className=" bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                      />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                  >
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="Email"
                        className=" bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                      />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[{required: true, message: 'Please input your Phone!'}]}
                  >
                      <Input
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                        placeholder="Phone"
                        className=" bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                      />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                  >
                      <Input.Password
                        prefix={<LockOutlined className="  text-white"/>}
                        placeholder="Password"
                        className=" bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                      />
                  </Form.Item>
                  <Button htmlType="submit" className="w-full bg-white text-blue-900 hover:bg-blue-100">Submit</Button>
              </Form>
              <p className="mt-4 text-center text-sm text-white/70">
                  Don't have an account? <Link to='/login' className="text-white hover:underline">Login</Link>
              </p>
          </Card>
      </div>
    );
}

export default RegisterPage;
