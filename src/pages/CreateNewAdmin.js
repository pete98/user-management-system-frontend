import React from 'react';
import Navigationbar, {SearchIcon} from "../components/Navigationbar";
import {
    Button, Card,
    CardBody, CardFooter, CardHeader, Divider,
    Input
} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";


const CreateNewAdmin = () => {
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
                            <Input label="Email" type="email"/>
                        </div>
                        <div className={"flex mt-2.5"}>
                            <Input label="Name" type="text"/>
                        </div>
                    </div>
                    <div className={"flex flex-col"}>
                        <div className={"mt-2.5"}>
                            <Input label="Position" type="text"/>
                        </div>
                        <div className={"mt-2.5 "}>
                            <Input label="New Password" type="password"/>
                        </div>

                    </div>

                </CardBody>
                <CardFooter className={"mb-5 justify-center space-x-3"}>
                    <div className={"mt-2.5"}>
                        <Button color={"default"} variant={"bordered"} onPress={() => navigate("/SuperAdminDashboardPage")}>Back</Button>
                    </div>
                    <div className={"mt-2.5"}>
                        <Button color={"primary"}>Save</Button>
                    </div>

                </CardFooter>

            </Card>
        </div>
    );
};

export default CreateNewAdmin;