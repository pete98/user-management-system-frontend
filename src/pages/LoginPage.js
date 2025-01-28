import React, {useEffect, useState} from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@heroui/react";
import {useNavigate} from "react-router-dom";
import apiClient from "../api/apiClient";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import {jwtDecode} from "jwt-decode";




const LoginPage = () => {

    const [selected, setSelected] = React.useState("login");
    const [color, setColor] = useState("secondary");
    const [variant, setVariant] = React.useState("solid");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signUpData, setSignUpData] = useState({fullName: "", email: "", password: ""});
    const [error, setError] = useState("")
    const navigate = useNavigate();




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

    const handleLogin = async () => {
        try {
            const response = await apiClient.post("/auth/login", { email, password });
            const token = response.data.token;

            if (token) {
                sessionStorage.setItem("token", token); // Save the token

                // Decode the JWT token
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role; // Extract role from the token
                sessionStorage.setItem("role", role);

                // Navigate based on role
                if (role === "ROLE_SUPER_ADMIN") {
                    navigate("/SuperAdminDashboardPage");
                } else if (role === "ROLE_ADMIN") {
                    navigate("/AdminDashboardPage");
                } else if (role === "ROLE_USER") {
                    navigate("/UserProfilePage");
                } else {
                    console.log("Unknown role, redirecting to default page");
                    navigate("/LoginPage");
                }
            }
        } catch (error) {
            console.log("Login Failed: ", error);
            setError("Invalid email or password. Please try again later.");
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await apiClient.post("/auth/signup", signUpData);

            if (response.status === 200) {
                setSelected("/LoginPage");
                window.alert("Sign up Successful!, Please log in to your account!");
            }
        } catch (error) {
            console.log("Signup Failed: ", error);
            setError("Sign up Failed. Please check your details again");

        }
    }

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);



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
                                    <Input isRequired label="Email"
                                           placeholder="'super.admin@email.com' or signup"
                                           type="email"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter : '123456' for super admin "
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={isVisible ? "text" : "password"}
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }

                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <p className="text-center text-small">
                                        Need to create an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("sign-up")}
                                              className={"hover:cursor-pointer"}>
                                            Sign up
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary"  onPress={(e) => handleLogin(e)} >
                                            Login
                                        </Button>

                                    </div>
                                </form>
                            </Tab>
                            <Tab key="sign-up" title="Sign up">
                                <form className="flex flex-col gap-3 h-[400px]">
                                    <Input isRequired label="Name"
                                           placeholder="Enter your name"
                                           type="text"
                                           value={signUpData.fullName}
                                           onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
                                           variant={"bordered"}/>
                                    <Input isRequired label="Email"
                                           placeholder="Enter your email"
                                           type="email"
                                           value={signUpData.email}
                                           onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                                           variant={"bordered"}/>
                                    <Input
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        value={signUpData.password}
                                        onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                                        variant={"bordered"}
                                        type={isVisible ? "text" : "password"}
                                        endContent={
                                            <button
                                                aria-label="toggle password visibility"
                                                className="focus:outline-none"
                                                type="button"
                                                onClick={toggleVisibility}
                                            >
                                                {isVisible ? (
                                                    <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                                                ) : (
                                                    <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                            </button>
                                        }
                                        />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <p className="text-center text-small">
                                        Already have an account?{" "}
                                        <Link size="sm" onPress={() => setSelected("login")}
                                              className={"hover:cursor-pointer"}>
                                            Login
                                        </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                        <Button fullWidth color="primary" onPress={(e) => handleSignUp(e)}>
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