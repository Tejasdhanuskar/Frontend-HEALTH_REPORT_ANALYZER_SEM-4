import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ type, data }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: type,
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [type, data]);

    return <canvas ref={chartRef} />;
};

export default Graph;
