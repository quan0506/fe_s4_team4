import './login/Login.css';
import { useEffect, useState } from 'react';
import { createOrbs, createStars } from '../../component/Background.js';
import { Button, Card, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import upstashService from '../../services/upstashService.js';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showform, setShowform] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    createStars();
    createOrbs();
  }, []);

  const hadcodeemail = async () => {
    try {
      setLoading(true);
      await upstashService.forgotPassword(email);
      setShowform(true);
      toast.success('Vui lòng kiểm tra gmail');
    } catch (e) {
      console.log(e);
      toast.error(e?.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await upstashService.formresetpassword(values);
      toast.success('Đã khôi phục mật khẩu thành công!');
      navigate('/login')
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data || e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-background min-h-screen flex items-center justify-center relative">
        <Card className="w-full max-w-md p-8 rounded-lg bg-black bg-opacity-30 backdrop-blur-md border border-white border-opacity-20">
          <h2 className="text-center text-white text-2xl font-bold mb-3">Nhập Gmail</h2>
          {showform ? (
            <Form
              form={form}
              name="forgot-password"
              onFinish={handleSubmit}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="email"
                initialValue={email}
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[{ required: true, message: 'Please input your new password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="New Password"
                  className="bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Confirm New Password"
                  className="bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                />
              </Form.Item>
              <Form.Item
                name="code"
                rules={[{ required: true, message: 'Please input your verification code!' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Verification Code"
                  className="bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                />
              </Form.Item>
              <div className="flex justify-center mt-3">
                <Button
                  loading={loading}
                  htmlType="submit"
                  className="w-1/2 bg-white text-blue-900 hover:bg-blue-100 font-bold"
                >
                  Cập nhật mật khẩu
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <Input
                placeholder="Email..."
                className="bg-transparent border-b border-white/30 focus:border-white text-white placeholder-white/70 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-center mt-3">
                <Button
                  loading={loading}
                  onClick={hadcodeemail}
                  className="w-1/2 bg-white text-blue-900 hover:bg-blue-100 font-bold"
                >
                  Gửi yêu cầu
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
