import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { GooglePlusOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await fetch('https://65a09e6c600f49256fb01938.mockapi.io/api/users');
      const users = await response.json();
      const user = users.find(user => user.email === values.email && user.password === values.password);

      if (user) {
        message.success(`Login successful. Welcome, ${user.name}!`);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/home');
        }
      } else {
        message.error('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('An error occurred. Please try again later.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
      <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        <Form
          form={form}
          name={isSignUp ? 'signUp' : 'signIn'}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <div className="social-icons">
            <a href="#" className="icon"><GooglePlusOutlined /></a>
            <a href="#" className="icon"><FacebookOutlined /></a>
            <a href="#" className="icon"><GithubOutlined /></a>
            <a href="#" className="icon"><LinkedinOutlined /></a>
          </div>
          <span>{isSignUp ? 'or use your email for registration' : 'or use your email for login'}</span>
          {isSignUp && (
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          {!isSignUp && <a href="#">Forget Your Password?</a>}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <Button className="hidden" id="login" onClick={() => setIsSignUp(false)}>
              Sign In
            </Button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site features</p>
            <Button className="hidden" id="register" onClick={() => setIsSignUp(true)}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
