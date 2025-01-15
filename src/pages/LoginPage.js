import React, {useEffect, useState} from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";




const LoginPage = () => {

    const [selected, setSelected] = React.useState("login");

    const [color, setColor] = useState("secondary");

    const [variant, setVariant] = React.useState("solid");

    useEffect(() => {
        if (selected === "login") {
            setColor("secondary")
            setVariant("solid")
        }
        else {
            setColor("primary")
            setVariant("solid")
            setVariant("bordered")
        }

    }, [selected])

    return (
        <div className={"bg-blue-950"}>
            <div className="flex content-center items-center justify-center h-screen">

                <Card className="max-w-full w-[340px] h-[450px]">
                    <CardHeader className={"items-center justify-center content-center text-2xl font-light"}>User Management System</CardHeader>
                    <div className={"flex justify-center"}><p className={"font-serif text-sm"}>Developed By Pranavkumar Sailor</p></div>
                    <CardBody className="overflow-hidden">
                    <Tabs
                            fullWidth
                            aria-label="Tabs form"
                            selectedKey={selected}
                            size="md"
                            onSelectionChange={setSelected}
                            color={color}

                            variant={variant}
                        >
                            <Tab key="login" title="Login">
                                <form className="flex flex-col gap-4 justify-between">
                                    <Input isRequired label="Email" placeholder="Enter your email" type="email"/>
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                        Need to create an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("sign-up")}
                                              className={"hover:cursor-pointer"}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary">
                                            Login
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Sign up">
                                <form className="flex flex-col gap-3 h-[400px]">
                                    <Input isRequired label="Name" placeholder="Enter your name" type="text" variant={"bordered"}/>
                                    <Input isRequired label="Email" placeholder="Enter your email" type="email" variant={"bordered"}/>
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                        variant={"bordered"}
                                    />
                                    <p className="text-center text-small">
                                        Already have an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("login")}
                                              className={"hover:cursor-pointer"}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary">
                                            Sign up
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;