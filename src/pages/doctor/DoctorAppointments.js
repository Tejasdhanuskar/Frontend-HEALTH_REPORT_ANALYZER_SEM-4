import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from './../../components/Layout'
import moment from 'moment'
import { Table, message } from 'antd'
import { Link } from 'react-router-dom';

const DoctorAppointments = () => {


    const [appointments, setAppointments] = useState([])
    const navigate = useNavigate();

    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1//doctor/doctor-appointments', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const handleReportId = (reportId) => {
        console.log(reportId)
        for (let i = 0; i < appointments.length; i++) {
            if (appointments[i]._id === reportId) {
                console.log(appointments[i].userId)
                localStorage.setItem("patientId", appointments[i].userId);
                break;
            }
        }
        navigate('../patient-report', { replace: true })
    }
    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post('api/v1/doctor/update-status', { appointmentsId: record._id, status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (res.data.success) {
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.log(error)
            message.error('Something went wrong')
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.name}
                </span>

            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },

        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === "pending" && (
                        <div className='d-flex'>
                            <button className='btn btn-success' onClick={() => handleStatus(record, 'approved')}>Approved</button>  &nbsp;
                            {/* <button className='btn btn-danger' onClick={() => handleStatus(record, 'reject')}>Reject</button>  &nbsp; &nbsp; */}


                        </div>)}
                    <div className='d-flex'>

                        <button className="btn btn-primary" onClick={() => handleReportId(record._id)}>Report</button>

                    </div>
                </div>
            )
        }

    ]

    return (
        <Layout>
            <h1>Appointment List</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default DoctorAppointments
