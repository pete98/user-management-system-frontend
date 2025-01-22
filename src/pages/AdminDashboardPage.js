import React, {useEffect, useState} from 'react';
import Navigationbar from "../components/Navigationbar";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue, Button
} from "@heroui/react";

import {Card, CardBody} from "@heroui/react";
import {TbEdit, TbTrash} from "react-icons/tb";
import apiClient from "../api/apiClient";
import {useNavigate} from "react-router-dom";


const AdminDashboardPage = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get("/users/role/USER", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.log("Error fetching users", error);
        }
    }

    //Request to fetch users to display in table
    useEffect(() => {
        fetchUsers();
    }, []);

    //Delete user
    const deleteUser = async (id) => {
        try {
            const response = await apiClient.delete(`/users/${id}`);
            console.log('User deleted successfully:', response.data);

            //Remove the delete user from the state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.log('Error deleting user:', error.response?.data || error.message);
        }
    }

    const handleUpdate = (id) => {
        navigate(`/UpdateUser/${id}`);
    }


    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);


    return (

        <div className={"flex-col"}>
            <Navigationbar/>
            <Card className={"max-w-screen-lg mx-auto mt-2.5 flex-col"}>

                <CardBody>
                    <div className={"flex justify-between"}>

                        <div className={"flex w-[300px]  items-center px-4"}>
                            <p className={"font-serif content w-fit"}>Admin Dashboard</p>
                        </div>


                        <div className={"flex items-center"}>

                            <Button color={"primary"} onPress={() => navigate("/AddUser")}>Add User</Button>
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
                        <TableBody items={users}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) =>
                                        columnKey === "action" ? (
                                            <TableCell>
                                                <div className={"flex items-center justify-center gap-2"}>
                                                    {/* Edit User */}
                                                    <Button color={"secondary"} isIconOnly={true} variant={"ghost"}
                                                            onPress={() => handleUpdate(item.id)}><TbEdit/></Button>

                                                    {/* Delete User */}
                                                    <Button color={"danger"} isIconOnly={true} variant={"ghost"}
                                                            onPress={() => deleteUser(item.id)}><TbTrash/></Button>
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

export default AdminDashboardPage;