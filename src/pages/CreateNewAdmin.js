import React, {useState} from 'react';
import Navigationbar from "../components/Navigationbar";
import {
    Button, Card,
    CardBody, CardFooter, CardHeader, Divider,
    Input
} from "@heroui/react";
import {useNavigate} from "react-router-dom";
import apiClient from "../api/apiClient";



const CreateNewAdmin = () => {

    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        password: "",
        position: ""
    })

    const handleSave = async () => {
        try {
            const response = await apiClient.post("/admins/createAdmin", userData);
            handleBack()
        } catch (error) {
            console.log("Error saving user", error);
        }
    }



   const handleBack = () => {
        const role = sessionStorage.getItem("role");
        if (role === "ROLE_ADMIN") {
            navigate("/AdminDashboardPage");
        } else if (role === "ROLE_SUPER_ADMIN") {
            navigate("/SuperAdminDashboardPage");
        } else {
            navigate("/PageNotFound")
        }
   }





    const navigate = useNavigate();
    return (
        <div>
            <Navigationbar/>
            <Card className={"max-w-screen-md mx-auto px-4 mt-2.5 flex-col"}>
                <CardHeader className={"flex"}>
                    <div>
                        <p className={"text-large font-serif"}>Super Admin Dashboard</p>
                    </div>
                </CardHeader>
                <Divider/>
                <div className={"flex mt-5  px-3 justify-center"}>
                    <p className={"font-serif"}>Enter New Admin Information</p>
                </div>
                <CardBody className={"flex flex-col mx-auto justify-center w-1/2"}>

                    <div className={"flex flex-col"}>
                        <div className={"flex mt-2.5"}>
                            <Input label="Email" type="email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                        </div>
                        <div className={"flex mt-2.5"}>
                            <Input label="Name" type="text" value={userData.fullName} onChange={(e) => setUserData({...userData, fullName: e.target.value})}/>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <div className={"mt-2.5"}>
                            <Input label="Position" type="text" value={userData.position} onChange={(e) => setUserData({...userData, position: e.target.value})}/>
                        </div>
                        <div className={"mt-2.5 "}>
                            <Input label="New Password" type="text" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                        </div>

                    </div>

                </CardBody>
                <CardFooter className={"mb-5 justify-center space-x-3"}>
                    <div className={"mt-2.5"}>
                        <Button color={"default"} variant={"bordered"} onPress={() => navigate("/SuperAdminDashboardPage")}>Back</Button>
                    </div>
                    <div className={"mt-2.5"}>
                        <Button color={"primary"} onPress={() => handleSave()}>Save</Button>
                    </div>

                </CardFooter>

            </Card>
        </div>
    );
};

export default CreateNewAdmin;