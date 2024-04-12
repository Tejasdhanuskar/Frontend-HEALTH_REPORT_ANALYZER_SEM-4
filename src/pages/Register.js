import React from 'react';
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Custom password validation function
    const validatePassword = (_, value) => {
        if (!value) {
            return Promise.reject('Please enter your password');
        }
        if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}/.test(value)) {
            return Promise.reject('Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long');
        }
        return Promise.resolve();
    };

    // form handler
    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/register', values);
            dispatch(hideLoading());
            if (res.data.success) {
                message.success('Register Successfully!');
                navigate('/login');
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something Went Wrong');
        }
    };

    return (
        <>
            <div className='form-container' >
                <Form layout="vertical" onFinish={onFinishHandler} className="register-form" >
                    <h3 className='text-center'>Register Form</h3>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                        <Input type="text" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email address' }
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ validator: validatePassword }]}
                    >
                        <Input type="password" />
                    </Form.Item>


                    <Form.Item>
                        <button className="btn btn-primary" type="submit" >Register</button>
                    </Form.Item>

                    <Link to="/login" className='m-2'>
                        Already user login here
                    </Link>
                </Form>
            </div>
        </>
    );
};

export default Register;
