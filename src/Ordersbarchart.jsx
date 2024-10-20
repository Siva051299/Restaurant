import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const OrdersBarChart = () => {
    const data = {
        weekly: [10, 15, 12, 20, 18, 25, 22], 
        monthly: [100, 120, 150, 110, 90, 170, 200, 210, 180, 20, 220, 230],
        yearly: [1200, 1500, 1300, 1400, 1700]
    };

    const [timeframe, setTimeframe] = useState('weekly');
    const [chartData, setChartData] = useState({
        series: [
            {
                name: 'Orders',
                data: data.weekly
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            title: {
                text: 'Number of Orders (Weekly)',
                align: 'center'
            },
            colors: ['#ea7a9a']
        }
    });

    const handleTimeframeChange = (event) => {
        const selectedTimeframe = event.target.value;
        setTimeframe(selectedTimeframe);

        let newSeriesData;
        let newCategories;
        let newTitle;

        console.log(newTitle,"newTitle")

        if (selectedTimeframe === 'weekly') {
            newSeriesData = data.weekly;
            newCategories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            newTitle = 'Number of Orders (Weekly)';
        } else if (selectedTimeframe === 'monthly') {
            newSeriesData = data.monthly;
            newCategories = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            newTitle = 'Number of Orders (Monthly)';
        } else if (selectedTimeframe === 'yearly') {
            newSeriesData = data.yearly;
            newCategories = ['2020', '2021', '2022', '2023', '2024'];
            newTitle = 'Number of Orders (Yearly)';
        }

        console.log("==========",newSeriesData)
        setChartData({
            series: [
                {
                    name: 'Orders',
                    data: newSeriesData
                }
            ],
            options: {
                ...chartData.options,
                xaxis: {
                    categories: newCategories
                },
                title: {
                    text: newTitle,
                    align: 'center'
                }
            }
        });
    };

    return (
        <div className="bar-chart">
            <h5 className="card-title d-flex align-items-center gap-2 justify-content-between">
                Order Summary
                <select className='form-select form-select-sm w-25'
                    id="timeframe"
                    value={timeframe}
                    onChange={handleTimeframeChange}
                >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </h5>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={220}
            />
        </div>
    );
};

export default OrdersBarChart;
