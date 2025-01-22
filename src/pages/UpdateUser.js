import React, {useEffect, useState} from 'react';
import Navigationbar from "../components/Navigationbar";
import {
    Button, Card,
    CardBody, CardFooter, CardHeader, Divider,
    Input
} from "@heroui/react";
import {useNavigate, useParams} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import apiClient from "../api/apiClient";



const UpdateUser = () => {

    const {id} = useParams();

    const [userData, setUserData] = useState({
        email: "",
        fullName: "",
        position: "",
    });

    useEffect(() => {
        //function to fetch user data
        const fetchUser = async () => {
            try {
                const response = await apiClient.get(`/users/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user" ,error);
            }
        }

        fetchUser();

    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure 'name' and 'value'
        setUserData((prev) => ({ ...prev, [name]: value })); // Use 'name' to update the correct field
    };



    const handleSubmit = async () => {
        try {
            await apiClient.put(`/users/${id}`, userData);
            console.log("User updated successfully!");
            handleBack(); // Navigate back after successful update
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };




    //Getting role to implement handleBack function
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;


    const handleBack = () => {
        if (role === "ROLE_ADMIN") {
            navigate("/AdminDashboardPage");
        } else if (role === "ROLE_SUPER_ADMIN") {
            navigate("/SuperAdminDashboardPage");
        } else {
            navigate("/PageNotFound");
        }
    }

    const pageTitle = () => {
        if (role === "ROLE_ADMIN") {
            return "Admin Dashboard";
        } else if (role === "ROLE_SUPER_ADMIN") {
            return "Super Admin Dashboard";
        }
    }



    return (
        <div>
            <Navigationbar/>
            <Card className={"max-w-screen-md mx-auto px-4 mt-2.5 flex-col"}>
                <CardHeader className={"flex"}>
                    <div>
                        <p className={"text-large font-serif"}>{pageTitle()}</p>
                    </div>
                </CardHeader>
                <Divider/>
                <div className={"flex mt-5  px-3 justify-center"}>
                    <p className={"font-serif"}>Update User Information</p>
                </div>
                <CardBody className={"flex flex-col mx-auto justify-center w-1/2"}>

                    <div className={"flex flex-col"}>
                        <div className={"flex mt-2.5"}>
                            <Input label="Email" type="email" value={userData.email} name="email" onChange={handleChange} />
                        </div>
                        <div className={"flex mt-2.5"}>
                            <Input label="Name" type="text" value={userData.fullName} name="fullName" onChange={handleChange}  />
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <div className={"mt-2.5"}>
                            <Input label="Position" type="text" value={userData.position} name="position" onChange={handleChange} />
                        </div>


                    </div>

                </CardBody>
                <CardFooter className={"mb-5 justify-center space-x-3"}>
                    <div className={"mt-2.5"}>
                        <Button color={"default"} variant={"bordered"} onPress={() => handleBack()}>Back</Button>
                    </div>
                    <div className={"mt-2.5"}>
                        <Button color={"primary"} onPress={() => handleSubmit()} >Update User</Button>
                    </div>

                </CardFooter>

            </Card>
        </div>
    );
};

export default UpdateUser;