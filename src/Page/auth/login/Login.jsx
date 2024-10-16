import { useEffect } from 'react';
import {Form, Input, Button, Card, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import {createOrbs, createStars} from "../../../component/Background.js";
import upstashService from "../../../services/upstashService.js";
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
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.token);
        navigate('/home');
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      console.log('Login failed. Please try again.');
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
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-white/30"/>
              <label htmlFor="remember" className="text-white/70">Remember Me</label>
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
