import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./page/admin/AdminLayout";
import AdminCredit from "./page/admin/AdminCredit";
import AdminDebit from "./page/admin/AdminDebit";
import Signup from "./page/Signup";
import Login from "./page/Login";
import Credit from "./page/Credit";
import Debit from "./page/Debit";
import ForgetPassword from "./page/ForgetPassword";
import Verification from "./page/Verification";
import NewPassword from "./page/NewPassword";
import Home from "./page/Home";
import AdminUser from "./page/admin/AdminUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="credit" element={<Credit />} />
          <Route path="debit" element={<Debit />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="verification" element={<Verification />} />
          <Route path="new-password" element={<NewPassword />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminCredit />} /> 
          <Route path="credit" element={<AdminCredit />} />
          <Route path="debit" element={<AdminDebit />} />
           <Route path="user" element={<AdminUser />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
