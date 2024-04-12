import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Graph from './PatientReport';
import { Link } from 'react-router-dom';

const App = () => {

    const [report, setReports] = useState([])

    const getReport = async () => {
        const patientId = localStorage.getItem('patientId');
        console.log(patientId);
        try {
            const res = await axios.post('/api/v1/doctor/patient-report', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                data: {
                    patientId: patientId // Include patientId in the request body
                }
            });
            if (res.data.success) {
                console.log(res.data);
                setReports(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    };

    useEffect(() => {
        getReport();
    }, []);

    const getGraphData = (obj) => {
        const values = [];
        for (const key in obj) {
            if (key !== 'regDate' && key !== "_id") {
                values.push(parseFloat(obj[key]));
            }
        }
        return values;
    }


    let testOneData = [];
    let testTwoData = [];
    let testThreeData = [];

    if (report.length > 0) {
        const { testOne, testTwo, testThree } = report[0];

        testOneData = getGraphData(testOne);
        testTwoData = getGraphData(testTwo);
        testThreeData = getGraphData(testThree);
    }
    console.log(testOneData, testTwoData, testThreeData)

    console.log(report)
    return (
        <div className="container">

            {report && report[0] && report[0].testName === "cbc" ? <div className="graph-container " >
                <h5>CBC:</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 1</h4>
                    <h4>Date:{report[0].testOne.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Haemoglobin', 'Rbc Count', 'Packed Cell Volume', 'Lymphocytes', 'Platelet Count'],
                        datasets: [{
                            label: 'CBC Test',
                            data: testOneData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',

                            ],
                            borderWidth: 0.5
                        }]
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 2</h4>
                    <h4>Date:{report[0].testTwo.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Haemoglobin', 'Rbc Count', 'Packed Cell Volume', 'Lymphocytes', 'Platelet Count'],
                        datasets: [{
                            label: 'CBC Test',
                            data: testTwoData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',

                            ],
                            borderWidth: 0.5
                        }]
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 3</h4>
                    <h4>Date:{report[0].testThree.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Haemoglobin', 'Rbc Count', 'Packed Cell Volume', 'Lymphocytes', 'Platelet Count'],
                        datasets: [{
                            label: 'CBC Test',
                            data: testThreeData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',

                            ],
                            borderWidth: 0.5
                        }]
                    }}
                />

            </div>
                : ""}

            {report && report[0] && report[0].testName === "urea" ? <div className="graph-container">
                <h2>Urea</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 1</h4>
                    <h4>Date:{report[0].testOne.regDate}</h4>
                </div>

                <Graph
                    type="bar"
                    data={{
                        labels: ['Serum Urea', 'Serum Creatinine', 'Serum Sodium', 'Serum Potassium', 'Serum Chlorides'],
                        datasets: [{
                            label: 'Urea Test',
                            data: testOneData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 2</h4>
                    <h4>Date:{report[0].testTwo.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Serum Urea', 'Serum Creatinine', 'Serum Sodium', 'Serum Potassium', 'Serum Chlorides'],
                        datasets: [{
                            label: 'Urea Test',
                            data: testTwoData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 3</h4>
                    <h4>Date:{report[0].testThree.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Serum Urea', 'Serum Creatinine', 'Serum Sodium', 'Serum Potassium', 'Serum Chlorides'],
                        datasets: [{
                            label: 'Urea Test',
                            data: testThreeData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                />

            </div> : ""}

            {report && report[0] && report[0].testName === "thyroid" ? <div className="graph-container">
                <h5>Thyroid:</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 1</h4>
                    <h4>Date:{report[0].testOne.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Triidothyronine', 'Thyroxine', 'Tsg'],
                        datasets: [{
                            label: 'Thyroid Test',
                            data: testOneData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 2</h4>
                    <h4>Date:{report[0].testTwo.regDate}</h4>
                </div>
                <Graph
                    type="bar"
                    data={{
                        labels: ['Triidothyronine', 'Thyroxine', 'Tsg'],
                        datasets: [{
                            label: 'Thyroid Test',
                            data: testTwoData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <h4>Test 3</h4>
                    <h4>Date:{report[0].testThree.regDate}</h4>
                </div>
                <Graph

                    type="bar"
                    data={{
                        labels: ['Triidothyronine', 'Thyroxine', 'Tsg'],
                        datasets: [{
                            label: 'Thyroid Test',
                            data: testThreeData,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                            ],
                            borderWidth: 1
                        }]
                    }}
                />

            </div> : ""}

            <Link to="/comment">
                <button className="btn btn-success">Comment</button>
            </Link>
        </div>
    );
};

export default App;
