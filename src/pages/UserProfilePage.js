import React, {useEffect, useState} from 'react';
import Navigationbar from "../components/Navigationbar";
import {
    Card,
    CardBody, CardHeader, Divider
} from "@heroui/react";
import apiClient from "../api/apiClient";


const UserProfilePage = () => {

    const [userData, setUserData] = useState({
        email: "",
        fullName: "",
        position: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get("/users/me");
                setUserData(response.data);
            } catch (error) {
                console.log("Error fetching user data", error);
            }
        }

        fetchUserData();
    }, [userData])




    return (
        <div>
            <Navigationbar/>
            <Card className={"max-w-screen-lg mx-auto px-4 mt-2.5 flex-col"}>
                <CardHeader className={"flex flex-row justify-between"}>
                        <p className={"text-large font-serif"}>My Profile</p>
                </CardHeader>
                <Divider/>
                <CardBody className={"flex flex-col space-y-5"}>
                    <div className={"flex"}>
                        <p className={"text-large font-serif"}>Name: {userData.fullName}</p>
                    </div>
                    <div>
                        <p className={"text-large font-serif"}>Position : {userData.position} </p>
                    </div>
                    <div>
                        <p className={"text-large font-serif"}>Email : {userData.email}</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserProfilePage;