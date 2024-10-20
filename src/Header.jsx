import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
// import nectarlogo from "./assets/images/nectar-logo.svg"
import $ from 'jquery'


const Header = () => {
    
    useEffect(() => {
        const setSidebarType = () => {
            const width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;
            if (width < 1199) {
                $("#main-wrapper").attr("data-sidebartype", "mini-sidebar").addClass("mini-sidebar");
            } else {
                $("#main-wrapper").attr("data-sidebartype", "full").removeClass("mini-sidebar");
            }
        };

        $(window).on("resize", setSidebarType);
        $(window).ready(setSidebarType);

        $(".sidebartoggler").on("click", function () {
            // alert("Adf")
            $("#main-wrapper").toggleClass("show-sidebar");
        });

        return () => {
            $(window).off("resize", setSidebarType);
            $(".sidebartoggler").off("click");
        };
    }, []);

    return (
        <>
            <header className="app-header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <ul className="navbar-nav">
                        <li className="nav-item d-block d-xl-none">
                            <Link className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse">
                                <i className="fa-solid fa-bars"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-icon-hover" href="">
                                <i className="fa-solid fa-bell"></i>
                                <div className="notification bg-primary rounded-circle"></div>
                            </Link>
                        </li>
                    </ul>
                    <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
                        <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link nav-icon-hover"
                                    href=""
                                    id="drop2"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-circle-user fs-8 text-col"></i>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                                    <div className="message-body">
                                        <Link href="" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="fa-solid fa-user"></i>
                                            <p className="mb-0 fs-3">My Profile</p>
                                        </Link>
                                        <Link href="" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="fa-solid fa-gears"></i>
                                            <p className="mb-0 fs-3">My Account</p>
                                        </Link>
                                        <Link href="" className="d-flex align-items-center gap-2 dropdown-item">
                                            <i className="fa-solid fa-list-check"></i>
                                            <p className="mb-0 fs-3">My Task</p>
                                        </Link>
                                        <Link className="btn btn-outline-primary mx-3 mt-2 d-block">Logout</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header></>
    );
};

export default Header;
