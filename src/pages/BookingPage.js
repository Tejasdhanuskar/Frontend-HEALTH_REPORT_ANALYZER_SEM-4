import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
  const { user } = useSelector(state => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [images, setImages] = useState(['', '', '']);
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState(0);
  const [testOne, setTestOne] = useState({});
  const [testTwo, setTestTwo] = useState({});
  const [testThree, setTestThree] = useState({});
  const [isAvailable, setIsAvailable] = useState(false);
  const [testName, setTestName] = useState("");
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [error, setError] = useState('');


  const dispatch = useDispatch();

  useEffect(() => {
    console.log("testOne", testOne);
    console.log("testTwo", testTwo);
    console.log("testThree", testThree);
  }, [testOne, testTwo, testThree]);

  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.post('/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to handle time

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  const handleTimeChange = () => {
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    const formattedTime = `${formattedHour}:${formattedMinute}`;
    setTime(formattedTime);
  };

  useEffect(() => {
    handleTimeChange();
  }, [hour, minute]);


  // Generating options for hours (0-23)
  const hourOptions = Array.from({ length: 24 }, (_, index) => {
    const paddedHour = index.toString().padStart(2, '0');
    return <option key={paddedHour} value={paddedHour}>{paddedHour}</option>;
  });

  // Generating options for minutes (0-59)
  const minuteOptions = Array.from({ length: 60 }, (_, index) => {
    const paddedMinute = index.toString().padStart(2, '0');
    return <option key={paddedMinute} value={paddedMinute}>{paddedMinute}</option>;
  });



  // Upload Report Handle Function
  const handleUploadReport = async () => {
    setIsLoading(true);
    for (let i = 0; i < 3; i++) {
      if (images[i]) {
        await Tesseract.recognize(images[i], 'eng', {
          logger: m => {
            if (m.status === 'recognizing text') {
              setProgress(parseInt(m.progress * 100));
            }
          }
        }).then(result => {
          if (i === 0) setTestOne(extractData(result.data.lines));
          else if (i === 1) setTestTwo(extractData(result.data.lines));
          else if (i === 2) setTestThree(extractData(result.data.lines));
          setText(result.data.text);
        });
      }
    }
    setIsLoading(false);
  };

  // Booking Handle Function
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert('Date & Time Required');
      }
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointment', {
        doctorId: params.doctorId,
        name: user.name,
        userId: user._id,
        doctorInfo: doctors,
        date: date,
        userInfo: user,
        time: time
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  // const handleAvailability = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       '/api/v1/user/book-appointment',
  //       { doctorId: params.doctorId, date, time },
  //       
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (res.data.success) {
  //       setIsAvailable(true);
  //       console.log(isAvailable);
  //       message.success(res.data.message);
  //     } else {
  //       message.error(res.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };

  const extractData = (ocrDetails) => {
    const extractedData = {};

    ocrDetails.forEach(item => {
      const text = item.text.toLowerCase();
      if (text.includes('name') && text.includes(':')) {
        const nameIndex = text.indexOf(':') + 1;
        extractedData.customerName = text.slice(nameIndex).trim();
      } else if (text.includes('reg. on') && text.includes(':')) {
        const regDateIndex = text.indexOf(':') + 1;
        extractedData.regDate = text.slice(regDateIndex).trim();
      } else if (text.includes('haemoglobin') && text.includes(':')) {
        const hemoglobinIndex = text.indexOf(':') + 1;
        extractedData.hemoglobin = text.slice(hemoglobinIndex).trim();
      } else if (text.includes('rbc count') && text.includes(':')) {
        const rbcCountIndex = text.indexOf(':') + 1;
        extractedData.rbcCount = text.slice(rbcCountIndex).trim();
      } else if (text.includes('packed cell volume') && text.includes(':')) {
        const packedCellVolumeIndex = text.indexOf(':') + 1;
        extractedData.packedCellVolume = text.slice(packedCellVolumeIndex).trim();
      } else if (text.includes('lymphocytes') && text.includes(':')) {
        const lymphocytesIndex = text.indexOf(':') + 1;
        extractedData.lymphocytes = text.slice(lymphocytesIndex).trim();
      } else if (text.includes('platelet count') && text.includes(':')) {
        const plateletCountIndex = text.indexOf(':') + 1;
        extractedData.plateletCount = text.slice(plateletCountIndex).trim();
      } else if (text.includes('triidothyronine') && text.includes(':')) {
        const triidothyronineIndex = text.lastIndexOf(':') + 1;
        extractedData.triidothyronine = text.slice(triidothyronineIndex).trim();
      } else if (text.includes('thyroxine') && text.includes(':')) {
        const thyroxineIndex = text.lastIndexOf(':') + 1;
        extractedData.thyroxine = text.slice(thyroxineIndex).trim();
      } else if (text.includes('tsg') && text.includes(':')) {
        const tsgIndex = text.lastIndexOf(':') + 1;
        extractedData.tsg = text.slice(tsgIndex).trim();
      } else if (text.includes('serum urea') && text.includes(':')) {
        const serumUreaIndex = text.lastIndexOf(':') + 1;
        extractedData.serumUrea = text.slice(serumUreaIndex).trim();
      } else if (text.includes('serum creatinine') && text.includes(':')) {
        const creatinineIndex = text.lastIndexOf(':') + 1;
        extractedData.serumCreatinine = text.slice(creatinineIndex).trim();
      } else if (text.includes('serum sodium') && text.includes(':')) {
        const SerumSodiumIndex = text.lastIndexOf(':') + 1;
        extractedData.serumSodium = text.slice(SerumSodiumIndex).trim();
      } else if (text.includes('serum potassium') && text.includes(':')) {
        const SerumPotassiumIndex = text.lastIndexOf(':') + 1;
        extractedData.serumPotassium = text.slice(SerumPotassiumIndex).trim();
      } else if (text.includes('serum chlorides') && text.includes(':')) {
        const SerumChloridesIndex = text.lastIndexOf(':') + 1;
        extractedData.serumChlorides = text.slice(SerumChloridesIndex).trim();
      }
    });

    // Output the extracted data
    console.log(extractedData);
    return extractedData;
  }

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  const handleReportData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userItem"));
      const data = { testName, testOne, testTwo, testThree, userId }
      const response = await axios.post('/api/v1/user/report-data', { data }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCombinedActions = () => {
    handleTimeChange();
    handleReportData();
    handleBooking();
  };

  return (
    <Layout>
      <h1>Booking Page</h1>
      <div className='container m-2'>
        {doctors && (
          <div>
            <h4>
              Dr.{doctors.firstName} {doctors.lastName}{' '}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings: {doctors.timings && doctors.timings[0]} - {doctors.timings && doctors.timings[1]}
            </h4>
            <div className='d-flex flex-column w-50'>
              <DatePicker
                aria-required={"true"}
                className='m-2'
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false)
                  setDate(moment(value).format("DD-MM-YYYY"))
                }}
              />

              {/* <input
                className='d-flex flex-column w-50 m-2'
                type="text"
                value={time}
                onChange={handleTimeChange}
                placeholder="Enter time (HH:mm)"
                aria-required="true"

              /> */}


              <div className="d-flex">
                <select value={hour} onChange={handleHourChange} aria-required="true">
                  <option value="">HH</option>
                  {hourOptions}
                </select>
                <span>:</span>
                <select value={minute} onChange={handleMinuteChange} aria-required="true">
                  <option value="">mm</option>
                  {minuteOptions}
                </select>
              </div>


              {/* <button className='btn btn-primary mt-2' onClick={handleAvailability}>
                Check Availability
              </button> */}

              <select
                className="form-control m-2"
                onChange={(e) => {
                  // Handle selected test here
                  console.log("Selected Test:", e.target.value);
                  setTestName(e.target.value);
                }}
                required // Make the dropdown required
              >
                <option value="" disabled selected>Select Test</option>
                <option value="cbc">CBC</option>
                <option value="thyroid">Thyroid</option>
                <option value="urea">Urea</option>
              </select>

              <div className="container">


                <div>
                  {isLoading && (
                    <>
                      <progress className="form-control" value={progress} max="100">
                        {progress}%{' '}
                      </progress>{' '}
                      <p className="text-center py-0 my-0">Loading:- {progress} %</p>
                    </>
                  )}
                  {!isLoading && (
                    <>
                      <input
                        type="file"
                        onChange={(e) =>
                          setImages(prevState => {
                            const newImages = [...prevState];
                            newImages[0] = URL.createObjectURL(e.target.files[0]);
                            return newImages;
                          })
                        }
                        className="form-control m-2"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          setImages(prevState => {
                            const newImages = [...prevState];
                            newImages[1] = URL.createObjectURL(e.target.files[0]);
                            return newImages;
                          })
                        }
                        className="form-control m-2"
                      />
                      <input
                        type="file"
                        onChange={(e) =>
                          setImages(prevState => {
                            const newImages = [...prevState];
                            newImages[2] = URL.createObjectURL(e.target.files[0]);
                            return newImages;
                          })
                        }
                        className="form-control m-2"
                      />
                      <input
                        type="button"
                        onClick={handleUploadReport}
                        className="btn btn-primary m-2"
                        value="Upload"
                      />
                    </>
                  )}
                  {!isLoading && text && (
                    <>
                      <div
                        className="form-control w-100 mt-5"
                        rows="6"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      ></div>
                    </>
                  )}
                </div>

                {/* {error && <p className="error">{error}</p>}
                <button onClick={handleTimeChange}>Save Time</button>


                {!isAvailable && (
                  <button className='btn btn-dark m-2' onClick={handleReportData}>
                    Save Reports
                  </button>
                )} */}

                {!isAvailable && (
                  <button className='btn btn-dark m-2' onClick={handleCombinedActions}>
                    Book Now
                  </button>
                )}




              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default BookingPage;
