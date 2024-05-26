// import React, { useEffect, useState } from 'react';
// import { Form, Input, Button, message } from 'antd';
// import { GooglePlusOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
// import "../styles/login.css";
// import { userLoginMutation } from '../redux/slice/authApiSlice';
// import { setCredentials } from '../redux/slice/authSlice';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const userRef = userRef();
//   const errRef = userRef();
//   const [errMsg, setErrMsg] = useState('');
//   const [user, setUser] = useState('');
//   const [pwd, setPws] = useState('');
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [login, { sLoading }] = userLoginMutation();

//   const onFinish = (values) => {
//     console.log('Success:', values);
//     message.success(`${isSignUp ? 'Sign Up' : 'Sign In'} successful!`);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//     message.error(`Failed to ${isSignUp ? 'sign up' : 'sign in'}. Please check your input.`);
//   };
//   useEffect(() => { userRef.current.focus() }, [])
//   useEffect(() => {
//     setErrMsg('')
//   }, [user, pwd])
//    const handleSubmit = async(e) =>{
//     e.preventDefault();
//     try {
//       const userData = await login({user, pwd}).unwrap();
//       dispatch(setCredentials({...userData, user}));
//       setUser('');
//       setPws('');
//       navigate('/');
//     } catch (error) {
//       if(!error?.response){
//         setErrMsg('No Server Response');
//       }else if (error.response?.status === 400){
//         setErrMsg('Missing Usernam or Password');
//       }else if (error.response?.status === 401){
//         setErrMsg('Unauthorized');
//       }else{
//         setErrMsg('Login Failed');
//       }
//       errRef.current.focus();
//     }
//    }
//    const handleUserInput = (e) => setUser(e.target.value);
//    const handlePwdInput = (e) => setPws(e.target.value);
//   return (
    
//     <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
//       <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
//         <Form
//           name={isSignUp ? 'signUp' : 'signIn'}
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           submit={handleSubmit}
//         >
//           <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
//           <div className="social-icons">
//             <a href="#" className="icon"><GooglePlusOutlined /></a>
//             <a href="#" className="icon"><FacebookOutlined /></a>
//             <a href="#" className="icon"><GithubOutlined /></a>
//             <a href="#" className="icon"><LinkedinOutlined /></a>
//           </div>
//           <span>{isSignUp ? 'or use your email for registration' : 'or use your email for login'}</span>
//           {isSignUp && (
//             <Form.Item
//               name="name"
//               rules={[{ required: true, message: 'Please input your name!' }]}
//             >
//               <Input placeholder="Name"
//               ref={userRef}
//               value={user}
//               id='username'
//               onChange={handleUserInput} 
//               autoComplete='off'
//               required/>
//             </Form.Item>
//           )}
//           <Form.Item
//             name="email"
//             rules={[{ required: true, message: 'Please input your email!' }]}
//           >
//             <Input placeholder="Email" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password placeholder="Password"
//             id='password'
//             onChange={handlePwdInput}
//             value={pwd}
//             required />
//           </Form.Item>
//           {!isSignUp && <a href="#">Forget Your Password?</a>}
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               {isSignUp ? 'Sign Up' : 'Sign In'}
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//       <div className="toggle-container">
//         <div className="toggle">
//           <div className="toggle-panel toggle-left">
//             <h1>Welcome Back!</h1>
//             <p>Enter your personal details to use all of the site features</p>
//             <Button className="hidden" id="login" onClick={() => setIsSignUp(false)}>
//               Sign In
//             </Button>
//           </div>
//           <div className="toggle-panel toggle-right">
//             <h1>Hello, Friend!</h1>
//             <p>Register with your personal details to use all of the site features</p>
//             <Button className="hidden" id="register" onClick={() => setIsSignUp(true)}>
//               Sign Up
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
