import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

import data from "./assets/js/data.json"
import TrendingMenus from "./TrendingMenus";
import CustomerFeeback from "./Feedback";
import OrdersBarChart from "./Ordersbarchart";

function Dashboard() {
    function calculateOrderDetails(orders) {
        let totalRevenue = 0;
        let itemCount = 0;
        let customerSet = new Set();
        let orderCount = orders.length;
        let totalDelivered = 0;
        let totalPending = 0;
        let totalonDelivery = 0;

        orders.forEach(order => {
            order.Items.forEach(item => {
                totalRevenue += item.Total_Price;
                itemCount += item.Quantity;
            });

            customerSet.add(order.Customer_Name);

            // console.log(customerSet,"customerset")
            console.log(order.Order_Status, "order.Order_Status")
            if (order.Order_Status.toLowerCase() === "delivered") {
                totalDelivered++;
            } else if (order.Order_Status.toLowerCase() === "pending") {
                totalPending++;
            } else if (order.Order_Status.toLowerCase() === "in transit") {
                totalonDelivery++;
            }
        });

        let customerCount = customerSet.size;
        let deliveredPercentage = parseFloat(((totalDelivered / orderCount) * 100).toFixed(2)) + "%";
        let pendingPercentage = parseFloat(((totalPending / orderCount) * 100).toFixed(2)) + "%";
        let onDeliveryPercentage = parseFloat(((totalonDelivery / orderCount) * 100).toFixed(2)) + "%";
        return {
            totalRevenue: totalRevenue.toFixed(2),
            itemCount: itemCount,
            customerCount: customerCount,
            orderCount: orderCount,
            totalDelivered: totalDelivered,
            totalPending: totalPending,
            totalonDelivery: totalonDelivery,
            deliveredPercentage: deliveredPercentage,
            pendingPercentage: pendingPercentage,
            onDeliveryPercentage: onDeliveryPercentage
        };
    }

    const calculatedData = calculateOrderDetails(data);
    console.log(calculatedData);

    console.log(data, "json data")
    const chartRef = useRef(null);

    useEffect(() => {
        const chartValues = {
            "2023": [107, 211, 280, 380, 410, 314, 510, 415, 513, 218, 506, 514],
            "2024": [155, 251, 357, 140, 495, 559, 690, 508, 612, 684, null, null]
        };

        if (chartRef.current) {
            const seriesData = Object.entries(chartValues).map(([year, data]) => ({
                name: year,
                data,
            }));

            const chartOptions = {
                series: seriesData,
                chart: {
                    toolbar: { show: false },
                    type: 'line',
                    fontFamily: 'inherit',
                    foreColor: '#adb0bb',
                    height: 260,
                    stacked: false,
                },
                colors: ["#C0C0C0", "#ea7a9a"],
                stroke: { width: 2, curve: 'smooth', dashArray: [8, 0] },
                xaxis: {
                    categories: [
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                    ],
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                },
                yaxis: { tickAmount: 4 },
                markers: {
                    strokeColors: ["#C0C0C0", "#ea7a9a"],
                    strokeWidth: 2,
                },
                tooltip: { theme: 'dark' },
            };

            const chart = new ApexCharts(chartRef.current, chartOptions);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, []);

    return (

        <div className="container-fluid">
            <div className="row mt-4 card-padding">
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card border-0 card-bg">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Revenue</span>
                                    <span className="h3 font-bold mb-0">${calculatedData.totalRevenue}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="text-lg fs-9 text-col">
                                        <i className="fa-solid fa-sack-dollar"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 mb-0 text-sm">
                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                    <i className="bi bi-arrow-up me-1"></i>30%
                                </span>
                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card border-0 card-bg">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Oders</span>
                                    <span className="h3 font-bold mb-0">{calculatedData.orderCount}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="text-lg fs-9 text-col">
                                        <i className="fa-solid fa-clipboard-list"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 mb-0 text-sm">
                                <span className="badge badge-pill bg-soft-danger text-danger me-2">
                                    <i className="bi bi-arrow-down me-1"></i>-5%
                                </span>
                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card border-0 card-bg">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total Customers</span>
                                    <span className="h3 font-bold mb-0">{calculatedData.customerCount}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="text-lg fs-9 text-col">
                                        <i className="fa-solid fa-users"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 mb-0 text-sm">
                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                    <i className="bi bi-arrow-up me-1"></i>10%
                                </span>
                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                    <div className="card border-0 card-bg">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">Total items ordered</span>
                                    <span className="h3 font-bold mb-0">{calculatedData.itemCount}</span>
                                </div>
                                <div className="col-auto">
                                    <div className="text-lg fs-9 text-col">
                                        <i className="fa-solid fa-bowl-rice"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 mb-0 text-sm">
                                <span className="badge badge-pill bg-soft-success text-success me-2">
                                    <i className="bi bi-arrow-up me-1"></i>13%
                                </span>
                                <span className="text-nowrap text-xs text-muted">Since last month</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title d-flex align-items-center gap-2 mb-4">
                                Revenue
                                <span>
                                    <i className="fa-solid fa-circle-question"></i>
                                </span>
                            </h5>
                            <div ref={chartRef} id="traffic-overview"></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title d-flex align-items-center gap-2 pb-3">
                                Order Summary
                                <span>
                                    <i className="fa-solid fa-circle-question"></i>
                                </span>
                            </h5>
                            <div className="row">
                                {[
                                    { device: 'On Delivery', percentage: calculatedData.totalonDelivery, icon: 'fa-truck-fast text-warning' },
                                    { device: 'Delivered', percentage: calculatedData.totalDelivered, icon: 'fa-thumbs-up text-success' },
                                    { device: 'Canceled', percentage: calculatedData.totalPending, icon: 'fa-ban text-danger' },
                                ].map((item, index) => (
                                    <div className="col-4" key={index}>
                                        <i className={`fa-solid ${item.icon} fs-8 text-primary`}></i>
                                        <span className="fs-11 mt-2 d-block text-nowrap">{item.device}</span>
                                        <h4 className="mb-0 mt-1">{item.percentage}</h4>
                                    </div>
                                ))}
                            </div>
                            <div className="vstack gap-4 mt-4 pt-2">
                                {[
                                    { label: 'On Delivery', percentage: calculatedData.onDeliveryPercentage, width: calculatedData.onDeliveryPercentage },
                                    { label: 'Delivered', percentage: calculatedData.deliveredPercentage, width: calculatedData.deliveredPercentage },
                                    { label: 'Canceled', percentage: calculatedData.pendingPercentage, width: calculatedData.pendingPercentage },
                                ].map((progress, index) => (
                                    <div key={index}>
                                        <div className="hstack justify-content-between">
                                            <span className="fs-3 fw-medium">{progress.label}</span>
                                            <h6 className="fs-3 fw-medium text-dark lh-base mb-0">{progress.percentage}</h6>
                                        </div>
                                        <div className="progress mt-6" role="progressbar" aria-label="Warning example" aria-valuenow={progress.width} aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-bar bg_gradient" style={{ width: progress.width }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Recent Customer Feedback</h5>
                            <CustomerFeeback />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <OrdersBarChart />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <TrendingMenus />
                </div>

                <div className="col-lg-4">
                    <div className="card h-auto sticky">
                        <div className="card-body">
                            <h3 className="card-title mb-4 fs-28 font-w600">🔥 Newest</h3>
                            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="items">
                                            <p className="mb-3">“An extraordinary dining experience with each dish crafted to perfection using the finest ingredients.</p>
                                            <p className="mb-3">The service was quick, professional, and welcoming. We opted for the six-course tasting menu, and every plate was a delightful masterpiece.”</p>
                                            <div className="media align-items-center mb-2">
                                                <img className="me-3 img-fluid rounded-circle" width="50" src="https://png.pngtree.com/png-clipart/20240629/original/pngtree-single-asian-girl-in-formal-office-dress-business-professional-women-style-png-image_15446834.png" alt="Samuel Hawkins" />
                                                <div className="media-body">
                                                    <h4 className="mt-0 mb-1 text-black">Ava Thompson</h4>
                                                    <small className="mb-0">Head Marketing</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="carousel-item">
                                        <div className="items">
                                            <p className="mb-3">“Truly remarkable cuisine, prepared with top-quality ingredients and a passion for excellence.</p>
                                            <p className="mb-3">The staff was attentive, warm, and efficient. We chose the six-course tasting menu, and each dish was a stunning culinary delight.”</p>
                                            <div className="media align-items-center mb-3">
                                                <img className="me-3 img-fluid rounded-circle" width="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9bmI2yr20c6LL9e3fR2I_Lpko7gtdONyzg&s" alt="James Kowalski" />
                                                <div className="media-body">
                                                    <h4 className="mt-0 mb-1 text-black">Logan Carter</h4>
                                                    <small className="mb-0">Head Marketing</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className="card-footer border-0 text-center py-4 bg_gradient rounded-xl">
                            <div className="star-review text-md-center d-flex justify-content-center align-items-center">
                                <span className="text-white fs-32 font-w600 me-3">4.0</span>
                                <i className="fa fa-star fs-22 mx-1 text-white"></i>
                                <i className="fa fa-star fs-22 mx-1 text-white"></i>
                                <i className="fa fa-star fs-22 mx-1 text-white"></i>
                                <i className="fa fa-star fs-22 mx-1 text-white"></i>
                                <i className="fa fa-star fs-22 mx-1 text-white op3"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-2">Restaurant Sales Overview</h5>
                            <div className="table-responsive">
                                <table className="table text-nowrap align-middle mb-0">
                                    <thead>
                                        <tr className="border-gradient">
                                            <th scope="col" className="ps-0">Item Category</th>
                                            <th scope="col" className="text-center">Orders</th>
                                            <th scope="col" className="text-center">Revenue</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {[
                                            {
                                                category: 'Food',
                                                orders: '12,345',
                                                revenue: '$5,230',
                                            },
                                            {
                                                category: 'Beverages',
                                                orders: '8,234',
                                                revenue: '$2,110',
                                            },
                                            {
                                                category: 'Desserts',
                                                orders: '5,678',
                                                revenue: '$1,345',
                                            },
                                            {
                                                category: 'Starters',
                                                orders: '3,456',
                                                revenue: '$890',
                                            },
                                            {
                                                category: 'Icecream',
                                                orders: '1,234',
                                                revenue: '$450',
                                            },
                                            {
                                                category: 'Others',
                                                orders: '1,234',
                                                revenue: '$450',
                                            },
                                        ].map((row, index) => (
                                            <tr key={index}>
                                                <th scope="row" className="ps-0 fw-medium p-3">
                                                    <span className="table-link1 text-truncate d-block">{row.category}</span>
                                                </th>
                                                <td className="text-center fw-medium p-3">{row.orders}</td>
                                                <td className="text-center fw-medium p-3">{row.revenue}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 d-none">
                    <div className="card">
                        <div className="card-body text-center">
                            <h4 className="mt-7">Productivity Tips!</h4>
                            <p className="card-subtitle mt-2 mb-3">
                                Duis at orci justo nulla in libero id leo molestie sodales phasellus justo.
                            </p>
                            <button className="btn btn-primary mb-3">View All Tips</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;