import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import nectarlogo from "./assets/images/nectar-logo.svg"


const Sidenav = () => {

    const location = useLocation();

    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between">
                    <Link to="https://www.nectarit.com/" target='_blank' className="text-nowrap logo-img">
                        <img className="n-logo" src={nectarlogo} alt="" />
                        <span className="fs-7 mx-3">Nectar</span>
                    </Link>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
                        <i className="fa-solid fa-xmark fs-8"></i>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="sidebar-item">
                            <Link to="" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`} aria-expanded="false">
                                <span>
                                    <i className="fa-solid fa-house"></i>
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/orders" className={`sidebar-link ${location.pathname === '/orders' ? 'active' : ''}`} aria-expanded="false">
                                <span>
                                    <i className="fa-solid fa-list-check"></i>
                                </span>
                                <span className="hide-menu">Orders</span>
                            </Link>
                        </li>
                      
                        <li className="sidebar-item">
                            <Link className="sidebar-link" aria-expanded="false">
                                <span>
                                    <i className="fa-solid fa-chart-column"></i>
                                </span>
                                <span className="hide-menu">Revenue</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" aria-expanded="false">
                                <span>
                                    <i className="fa-solid fa-bell"></i>
                                </span>
                                <span className="hide-menu">Notifications</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link className="sidebar-link" aria-expanded="false">
                                <span>
                                    <i className="fa-solid fa-chart-pie"></i>
                                </span>
                                <span className="hide-menu">Analytics</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidenav;
