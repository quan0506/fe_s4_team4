import { useEffect } from 'react';
import {Form, Input, Button, Card, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import {createOrbs, createStars} from "../../../component/Background.js";
import upstashService from "../../../services/upstashService.js";
import {access_Token} from "../../../constants/index.js";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect(() => {
    createStars();
    createOrbs();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await upstashService.loginUser({
        ... values
      });
      console.log(response)
        localStorage.setItem(access_Token, response.token);
        navigate('/');
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data || error.message);
    }
  };
  return (
    <div className="login-background min-h-screen flex items-center justify-center relative">
      <Card
        className="w-full max-w-md p-8 rounded-lg bg-black bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 ">
        <h2 className="text-center text-white text-2xl font-bold mb-6 ">Login</h2>
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
          className="space-y-4"
        >
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
            name="password"
            rules={[{required: true, message: 'Please input your Password!'}]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon"/>}
              placeholder="Password"
              className=" bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
            />
          </Form.Item>

          <div className="flex items-center justify-between text-sm">
            <div>
              <Link to='/forgot-password' className="text-white hover:underline">Quên mật khẩu</Link>
            </div>
          </div>
          <Button htmlType="submit" className="w-full bg-white text-blue-900 hover:bg-blue-100">Submit</Button>
        </Form>
        <p className="mt-4 text-center text-sm text-white/70">
          Don't have an account? <Link to='/register' className="text-white hover:underline">Register</Link>
        </p>
      </Card>
    </div>
  );
};
export default Login;
