import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { GooglePlusOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, registerUser } from '../../redux/slice/authSlice';
import '../../styles/login.css';

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [roleName, setRoleName] = useState('');

    const onFinish = async (values) => {
        dispatch(clearError());
        try {
            if (isSignUp) {
                const resultAction = await dispatch(registerUser({ ...values, roleName }));
                if (registerUser.fulfilled.match(resultAction)) {
                    const { user, token } = resultAction.payload;
                    message.success(`Đăng ký thành công. Chào bạn, ${user.name}!`);
                    localStorage.setItem('user', JSON.stringify(user));
                    if (user.roleName === 'Customer') {
                        navigate('/dashboard');
                    } else {
                        navigate('/home');
                    }
                } else {
                    message.error(resultAction.payload || 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
                }
            } else {
                const resultAction = await dispatch(loginUser(values));
                if (loginUser.fulfilled.match(resultAction)) {
                    const { user, token } = resultAction.payload;
                    message.success(`Đăng nhập thành công. Chào bạn, ${user.name}!`);
                    localStorage.setItem('user', JSON.stringify(user));
                    if (user.roleName === 'Customer') {
                        navigate('/dashboard');
                    } else {
                        navigate('/home');
                    }
                } else {
                    message.error(resultAction.payload || 'Email hoặc Mật khẩu không hợp lệ');
                }
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            message.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Thất bại:', errorInfo);
    };

    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
        if (!isSignUp) {
            setRoleName('Customer');
        } else {
            setRoleName('');
        }
    };

    return (
        <div className='login-container'>
            <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
                <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
                    <Form
                        form={form}
                        name={isSignUp ? 'Đăng ký' : 'Đăng nhập'}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <h1>{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><GooglePlusOutlined /></a>
                            <a href="#" className="icon"><FacebookOutlined /></a>
                            <a href="#" className="icon"><GithubOutlined /></a>
                            <a href="#" className="icon"><LinkedinOutlined /></a>
                        </div>
                        <span>{isSignUp ? 'hoặc sử dụng email của bạn để đăng ký' : 'hoặc sử dụng email của bạn để đăng nhập'}</span>
                        {isSignUp && (
                            <>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
                            >
                                <Input placeholder="Tên" />
                            </Form.Item>
                            <Form.Item
                                name="telephone"
                                rules={[{ required: true, message: 'Nhập số điện thoại!' }]}
                            >
                                <Input placeholder="Số điện thoại" type='phone' />
                            </Form.Item>
                            </>
                            
                        )}
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>
                        {isSignUp && (
                            <Form.Item
                                name="roleName"
                                initialValue="Customer"
                                hidden
                            >
                                <Input disabled />
                            </Form.Item>
                        )}
                        {!isSignUp && <a href="#">Quên mật khẩu?</a>}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {isSignUp ? 'Đăng ký' : 'Đăng nhập'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Chào mừng trở lại!</h1>
                            <p>Nhập thông tin cá nhân của bạn để sử dụng các tính năng của trang web</p>
                            <Button className="hidden" id="login" onClick={() => setIsSignUp(false)}>
                                Đăng nhập
                            </Button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Xin chào, bạn thân mến!</h1>
                            <p>Hãy đăng ký với thông tin cá nhân của bạn để sử dụng các tính năng của trang web</p>
                            <Button className="hidden" id="register" onClick={() => setIsSignUp(true)}>
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
