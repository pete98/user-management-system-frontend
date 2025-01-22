import React, {useEffect, useState} from 'react';
import Navigationbar from "../components/Navigationbar";
import {
    Button, Card,
    CardBody, CardFooter, CardHeader, Divider,
    Input
} from "@heroui/react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import apiClient from "../api/apiClient";



const AddUser = () => {

    const[email, setEmail] = useState("");
    const [fullName, setFullName] = useState("")
    const [position, setPosition] = useState("");
    const [password, setPassword] = useState("");

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

    //Save user
    const saveUser = async () => {
        try {
            const response = await apiClient.post("/auth/signup", {email, fullName, position, password})
            console.log("User saved successfully:", response.data);
            //Navigating to dashboard after saving
            handleBack();
        } catch (error) {
            console.log("Error saving user:", error)
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
                    <p className={"font-serif"}>Enter New User Information</p>
                </div>
                <CardBody className={"flex flex-col mx-auto justify-center w-1/2"}>

                    <div className={"flex flex-col"}>
                        <div className={"flex mt-2.5"}>
                            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={"flex mt-2.5"}>
                            <Input label="Name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <div className={"mt-2.5"}>
                            <Input label="Position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                        </div>
                        <div className={"mt-2.5 "}>
                            <Input label="New Password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                    </div>

                </CardBody>
                <CardFooter className={"mb-5 justify-center space-x-3"}>
                    <div className={"mt-2.5"}>
                        <Button color={"default"} variant={"bordered"} onPress={() => handleBack()}>Back</Button>
                    </div>
                    <div className={"mt-2.5"}>
                        <Button color={"primary"} onPress={() => saveUser()}>Save</Button>
                    </div>

                </CardFooter>

            </Card>
        </div>
    );
};

export default AddUser;