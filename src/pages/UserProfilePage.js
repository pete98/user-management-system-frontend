import React from 'react';
import Navigationbar from "../components/Navigationbar";
import {
    Card,
    CardBody, CardHeader, Divider,
} from "@nextui-org/react";


const UserProfilePage = () => {
    return (
        <div>
            <Navigationbar/>
            <Card className={"max-w-screen-lg mx-auto px-4 mt-2.5 flex-col"}>
                <CardHeader className={"flex flex-row justify-between"}>
                        <p className={"text-large font-serif"}>My Profile</p>
                </CardHeader>
                <Divider/>
                <CardBody className={"flex flex-col space-y-5"}>
                    <div>
                        <p className={"text-large font-serif"}>Name : </p>
                    </div>
                    <div>
                        <p className={"text-large font-serif"}>Position : </p>
                    </div>
                    <div>
                        <p className={"text-large font-serif"}>Email : </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserProfilePage;