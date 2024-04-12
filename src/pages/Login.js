import React from 'react';
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import FormItem from 'antd/es/form/FormItem';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Custom password validation function
    const validatePassword = (_, value) => {
        if (!value) {
            return Promise.reject('Please enter your password');
        }
        // Adjust the regex pattern to fit your requirements
        if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(value)) {
            return Promise.reject('');
        }
        return Promise.resolve();
    };

    // Form handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/login', values);
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem('userId', res.data.user._id);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem('isDoctor', res.data.user.isDoctor);
                message.success('Login successfully');

                // If the user is a doctor, navigate to '/home1', else navigate to '/home'
                const homePath = res.data.user.isDoctor ? '/homedoctor' : '/home';
                setTimeout(() => navigate(homePath));
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    return (
        <div className='form-container' >
            <Form layout="vertical" onFinish={onFinishHandler} className="register-form" >
                <h3 className='text-center'>Login Form</h3>

                <FormItem label="Email" name="email" >
                    <Input type="email" required />
                </FormItem>

                <FormItem label="Password" name="password" rules={[{ validator: validatePassword }]}>
                    <Input type="password" />
                </FormItem>

                <Link to="/register" className='m-2'>
                    Not a user Register here
                </Link>

                <button className="btn btn-primary" type="submit" >Login</button>
            </Form>
        </div>
    );
};

export default Login;
