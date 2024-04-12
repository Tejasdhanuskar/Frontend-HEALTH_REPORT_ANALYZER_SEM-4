import React, { useState } from 'react';
import { Form, Input, message } from "antd";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import Layout from './../../components/Layout'

const { Item } = Form;

const Comment = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        description: '',
        date: ''
    });

    const onFinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                'api/v1/doctor/comment',
                {
                    ...values,
                    doctorId: localStorage.userId,
                    patientId: localStorage.patientId,
                    description: formData.description,
                    date: formData.date
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Layout>
            <Form onFinish={onFinishHandler} className="comment-form">
                <h1>Comment Section:</h1>
                <Item label="Description" name="description">
                    <Input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Item>

                <Item label="Next Appointment Date" name="date">
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                </Item>

                <button className="btn btn-primary" type="submit">Comment</button>
            </Form>
        </Layout>
    );
};

export default Comment;
