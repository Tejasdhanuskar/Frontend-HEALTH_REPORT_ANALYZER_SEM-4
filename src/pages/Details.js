import React, { useState, useEffect } from 'react'
import Layout from './../components/Layout'
import axios from 'axios';
import { Table, message } from 'antd'

const Details = () => {


    const [description, setDescription] = useState([])

    // get comment from doctor
    const getComment = async () => {
        try {
            const res = await axios.get('/api/v1/user/user-comment', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setDescription(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getComment()
    })

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Next Appointment Date',
            dataIndex: 'date'
        },

    ]

    return (
        <Layout>
            <h1 className='text-center m-2'>Description</h1>
            <Table columns={columns} dataSource={description} />
        </Layout>
    )
}

export default Details