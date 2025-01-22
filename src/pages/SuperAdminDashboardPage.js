import React, {useEffect, useState} from 'react'
import Navigationbar from "../components/Navigationbar";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue, Button,
} from "@heroui/react";
import {Select, SelectItem} from "@heroui/react";
import {Card, CardBody} from "@heroui/react";
import {TbEdit, TbTrash} from "react-icons/tb";
import {useNavigate} from "react-router-dom";
import apiClient from "../api/apiClient";


const SuperAdminDashboardPage = () => {


    const [users, setUsers] = useState([])
    const [selectedRole, setSelectedRole] = useState("All Users");

    const fetchUsers = async (role = "All Users") => {
        try {
            if (role === "All Users") {
                const response = await apiClient.get(`/users/`);
                setUsers(response.data);
            } else {
                const response = await apiClient.get(`/users/role/${role}`);
                setUsers(response.data);
            }
        } catch (error) {
            console.log("Failed to fetch users", error);
        }
    }

    //Fetch all users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const roles = [
        {
            id: 0,
            name: "All Users",
            param: "All Users",
        },
        {
            id: 1,
            name: "Administrator",
            param: "ADMIN",
        },
        {
            id: 2,
            name: "User",
            param: "USER",
        }
    ];


    //Handle Role Selection
    const handleRoleChange = (role) => {

        const param = roles[role.currentKey].param

        setSelectedRole(param);
        fetchUsers(param);

        console.log(param);
    }

    //Implementing Pagination
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const navigate = useNavigate();

    //Implementing navigation to update user page with user details and id
    const handleUpdate = (id) => {
        navigate(`/UpdateUser/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/users/${id}`);
            await fetchUsers();
        } catch (error) {
            console.log("Error deleting user:", error);
        }
    }


    return (

        <div className={"flex-col"}>
            <Navigationbar/>
            <Card className={"max-w-screen-lg mx-auto mt-2.5 flex-col"}>

                <CardBody>
                    <div className={"flex"}>

                        <div className={"flex w-[300px] justify-center items-center"}>
                            <p className={"font-serif content w-fit"}>Super Admin Dashboard</p>
                        </div>


                        <div className={"flex space-x-2 w-full justify-end"}>

                            <Select aria-label="Selected Role" className="flex w-1/4" placeholder={"Filter by Role"}
                                    items={roles}
                                    onSelectionChange={handleRoleChange}
                                    variant={"faded"} size={"md"}>
                                {(role) => (
                                    <SelectItem
                                        key={role.id}
                                        value={role.param}
                                    >
                                        {role.name}
                                    </SelectItem>
                                )}
                            < /Select>

                            <Button color={"primary"} variant={"solid"}
                                    onPress={() => navigate("/CreateNewAdmin")}>Create
                                Admin</Button>
                            <Button color={"primary"} variant={"solid"} onPress={() => navigate("/AddUser")}>Add
                                User</Button>
                        </div>
                    </div>

                    <Table
                        removeWrapper={true}
                        aria-label="table with client side pagination"
                        bottomContent={
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="secondary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}/>

                            </div>
                        }
                        className={"max-w-screen-lg mx-auto mt-2.5"}>
                        >
                        <TableHeader>
                            <TableColumn key="id">ID</TableColumn>
                            <TableColumn key="fullName">NAME</TableColumn>
                            <TableColumn key="position">POSITION</TableColumn>
                            <TableColumn key="email">EMAIL</TableColumn>
                            <TableColumn key="action">
                                <div className={"flex items-center justify-center"}>
                                    ACTION
                                </div>
                            </TableColumn>
                        </TableHeader>
                        <TableBody items={items}>
                            {(item) => (
                                <TableRow key={item.name}>
                                    {(columnKey) =>
                                        columnKey === "action" ? (
                                            <TableCell>
                                                <div className={"flex items-center justify-center gap-2"}>
                                                    {/* Edit User */}
                                                    <Button color={"secondary"} isIconOnly={true} variant={"ghost"}
                                                            onPress={() => handleUpdate(item.id)}><TbEdit/></Button>

                                                    {/* Delete User */}
                                                    <Button color={"danger"} isIconOnly={true} variant={"ghost"}
                                                            onPress={() => handleDelete(item.id)}><TbTrash/></Button>

                                                </div>
                                            </TableCell>

                                        ) : (
                                            <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                        )
                                    }
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>


        </div>
    );


};

export default SuperAdminDashboardPage;