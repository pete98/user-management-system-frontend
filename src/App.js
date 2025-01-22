import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddUser from "./pages/AddUser";
import UpdateUser from "./pages/UpdateUser";
import CreateNewAdmin from "./pages/CreateNewAdmin";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import {HeroUIProvider} from "@heroui/react";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
      <HeroUIProvider>
      <Router>
          <Routes>
              {/*<Route path={"/LoginPage"} element={<LoginPage />} />*/}
              <Route path={"/AdminDashboardPage"} element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
              <Route path={"/SuperAdminDashboardPage"} element={<ProtectedRoute><SuperAdminDashboardPage /></ProtectedRoute>} />
              <Route path={"/AddUser"} element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
              <Route path={"/UpdateUser/:id"} element={<ProtectedRoute><UpdateUser /></ProtectedRoute>} />
              <Route path={"/CreateNewAdmin"} element={<ProtectedRoute><CreateNewAdmin /></ProtectedRoute>} />
              <Route path={"/UserProfilePage"} element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
              <Route path={"/PageNotFound"} element={<PageNotFound />} />
              <Route path={"/*"} element={<LoginPage />} />
          </Routes>
      </Router>
      </HeroUIProvider>
  );
}

export default App;
