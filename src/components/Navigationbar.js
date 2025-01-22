import React, {useEffect, useState} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    Button,
} from "@heroui/react";
import {useNavigate} from "react-router-dom";





export const SearchIcon = ({size = 24, strokeWidth = 1.5, width, height, ...props}) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={height || size}
            role="presentation"
            viewBox="0 0 24 24"
            width={width || size}
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

const Navigationbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.clear()
        navigate("/LoginPage");
    }
    return (
        <div>
            <Navbar isBordered>
                <NavbarContent justify="start">
                    <NavbarBrand className="mr-4">
                        <p className="font-serif">User Management System</p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent as="div" className="items-center" justify="end">
                    <Button color={"danger"} variant={"ghost"} onPress={handleLogout}>Log Out</Button>

                </NavbarContent>
            </Navbar>
            
        </div>
    );
};

export default Navigationbar;