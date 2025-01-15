import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddUser from "./pages/AddUser";
import UpdateUser from "./pages/UpdateUser";
import CreateNewAdmin from "./pages/CreateNewAdmin";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";

function App() {
  return (
      <Router>
          <Routes>
              {/*<Route path={"/LoginPage"} element={<LoginPage />} />*/}
              <Route path={"/AdminDashboardPage"} element={<AdminDashboardPage />} />
              <Route path={"/SuperAdminDashboardPage"} element={<SuperAdminDashboardPage />} />
              <Route path={"/AddUser"} element={<AddUser />} />
              <Route path={"/UpdateUser"} element={<UpdateUser />} />
              <Route path={"/CreateNewAdmin"} element={<CreateNewAdmin />} />
              <Route path={"/UserProfilePage"} element={<UserProfilePage />} />
              <Route path={"/*"} element={<LoginPage />} />
          </Routes>
      </Router>
  );
}

export default App;
