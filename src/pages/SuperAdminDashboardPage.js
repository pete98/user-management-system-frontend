import React from 'react';
import Navigationbar, {SearchIcon} from "../components/Navigationbar";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue, Button, Input,
} from "@nextui-org/react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Card, CardBody} from "@nextui-org/react";
import {TbEdit, TbTrash} from "react-icons/tb";



export const users = [
    {
        key: "1",
        name: "Tony Reichert",
        role: "CEO",
        email: "Active",
    },
    {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        email: "Paused",
    },
    {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        email: "Active",
    },
    {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        email: "Vacation",
    },
    {
        key: "5",
        name: "Emily Collins",
        role: "Marketing Manager",
        email: "Active",
    },
    {
        key: "6",
        name: "Brian Kim",
        role: "Product Manager",
        email: "Active",
    },
    {
        key: "7",
        name: "Laura Thompson",
        role: "UX Designer",
        email: "Active",
    },
    {
        key: "8",
        name: "Michael Stevens",
        role: "Data Analyst",
        email: "Paused",
    },
    {
        key: "9",
        name: "Sophia Nguyen",
        role: "Quality Assurance",
        email: "Active",
    },
    {
        key: "10",
        name: "James Wilson",
        role: "Front-end Developer",
        email: "Vacation",
    },
    {
        key: "11",
        name: "Ava Johnson",
        role: "Back-end Developer",
        email: "Active",
    },
    {
        key: "12",
        name: "Isabella Smith",
        role: "Graphic Designer",
        email: "Active",
    },
    {
        key: "13",
        name: "Oliver Brown",
        role: "Content Writer",
        email: "Paused",
    },
    {
        key: "14",
        name: "Lucas Jones",
        role: "Project Manager",
        email: "Active",
    },
    {
        key: "15",
        name: "Grace Davis",
        role: "HR Manager",
        email: "Active",
    },
    {
        key: "16",
        name: "Elijah Garcia",
        role: "Network Administrator",
        email: "Active",
    },
    {
        key: "17",
        name: "Emma Martinez",
        role: "Accountant",
        email: "Vacation",
    },
    {
        key: "18",
        name: "Benjamin Lee",
        role: "Operations Manager",
        email: "Active",
    },
    {
        key: "19",
        name: "Mia Hernandez",
        role: "Sales Manager",
        email: "Paused",
    },
    {
        key: "20",
        name: "Daniel Lewis",
        role: "DevOps Engineer",
        email: "Active",
    },
    {
        key: "21",
        name: "Amelia Clark",
        role: "Social Media Specialist",
        email: "Active",
    },
    {
        key: "22",
        name: "Jackson Walker",
        role: "Customer Support",
        email: "Active",
    },
    {
        key: "23",
        name: "Henry Hall",
        role: "Security Analyst",
        email: "Active",
    },
    {
        key: "24",
        name: "Charlotte Young",
        role: "PR Specialist",
        email: "Paused",
    },
    {
        key: "25",
        name: "Liam King",
        role: "Mobile App Developer",
        email: "Active",
    },
];


const SuperAdminDashboardPage = () => {
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
                    <div className={"flex"}>

                        <div className={"flex w-[300px] justify-center items-center"}>
                            <p className={"font-serif content w-fit"}>Super Admin Dashboard</p>
                        </div>


                        <div className={"flex space-x-2 w-full justify-end"}>
                            <Input
                                classNames={{
                                    base: "sm:max-w-[40rem] h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper:
                                        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                placeholder="Search by name..."
                                size="sm"
                                startContent={<SearchIcon size={18}/>}
                                type="search"
                            />
                            <Button color={"primary"} variant={"solid"}>Create Admin</Button>
                            <Button color={"primary"} variant={"solid"}>Add User</Button>
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
                            <TableColumn key="name">NAME</TableColumn>
                            <TableColumn key="role">ROLE</TableColumn>
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
                                                    <Button color={"secondary"} isIconOnly={true} variant={"ghost"} ><TbEdit/></Button>

                                                    {/* Delete User */}
                                                    <Button  color={"danger"} isIconOnly={true} variant={"ghost"} ><TbTrash/></Button>

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