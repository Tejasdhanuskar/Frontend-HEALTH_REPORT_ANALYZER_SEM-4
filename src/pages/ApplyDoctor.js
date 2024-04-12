import React, { useState } from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startHour, setStartHour] = useState(0); // State for selected start hour
  const [startMinute, setStartMinute] = useState(0); // State for selected start minute
  const [endHour, setEndHour] = useState(0); // State for selected end hour
  const [endMinute, setEndMinute] = useState(0); // State for selected end minute

  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment().hours(startHour).minutes(startMinute).format("HH:mm"), // Construct start time with selected hour and minute
            moment().hours(endHour).minutes(endMinute).format("HH:mm"), // Construct end time with selected hour and minute
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const handleStartHourChange = (value) => {
    setStartHour(value);
  };

  const handleStartMinuteChange = (value) => {
    setStartMinute(value);
  };

  const handleEndHourChange = (value) => {
    setEndHour(value);
  };

  const handleEndMinuteChange = (value) => {
    setEndMinute(value);
  };



  // Phone number validation
  const validatePhoneNumber = (_, value) => {
    if (!value) {
      return Promise.reject("Please enter your phone number");
    }
    if (!/^\d{10}$/.test(value)) {
      return Promise.reject("Phone number must be 10 digits");
    }
    return Promise.resolve();
  };



  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          {/* Other form items */}
          {/* ... */}
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[
                { required: true, message: "Please enter your phone number" },
                { validator: validatePhoneNumber },
              ]}
            >
              <Input type="text" placeholder="Your contact number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Cunsaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          {/* Add more form items as needed */}
          {/* ... */}
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Start Time" required>
              <Row gutter={8}>
                <Col xs={12} md={12} lg={12}>
                  <Select
                    onChange={handleStartHourChange}
                    value={startHour}
                  >
                    {[...Array(24).keys()].map((hour) => (
                      <Select.Option key={hour} value={hour}>
                        {hour}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={12} md={12} lg={12}>
                  <Select
                    onChange={handleStartMinuteChange}
                    value={startMinute}
                  >
                    {[...Array(60).keys()].map((minute) => (
                      <Select.Option key={minute} value={minute}>
                        {minute}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="End Time" required>
              <Row gutter={8}>
                <Col xs={12} md={12} lg={12}>
                  <Select onChange={handleEndHourChange} value={endHour}>
                    {[...Array(24).keys()].map((hour) => (
                      <Select.Option key={hour} value={hour}>
                        {hour}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={12} md={12} lg={12}>
                  <Select onChange={handleEndMinuteChange} value={endMinute}>
                    {[...Array(60).keys()].map((minute) => (
                      <Select.Option key={minute} value={minute}>
                        {minute}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Submit
            </button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
