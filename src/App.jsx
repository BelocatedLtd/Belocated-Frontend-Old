import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./pages/mainlayout/MainLayout"
import axios from 'axios'
import { Home } from "./pages/mainlayout/Home"
import { Toaster } from 'react-hot-toast';
import About from "./pages/mainlayout/About";
import Contact from "./pages/mainlayout/Contact";
import AuthLayout from "./pages/authLayout/AuthLayout";
import Register from "./pages/authLayout/Register"
import Login from "./pages/authLayout/Login"
import ConfirmPassword from "./pages/authLayout/ConfirmPassword"
import RetrievePassword from "./pages/authLayout/RetrievePassword"
import Dashboard from "./pages/dashboardlayout/Dashboard";
import DashLayout from "./pages/dashboardlayout/DashLayout";
import SidebarLeft from "./pages/dashboardlayout/SidebarLeft";
import SidebarRight from "./pages/dashboardlayout/SidebarRight";
import Earn from "./pages/dashboardlayout/userPages/Earn";
import Advertise from "./pages/dashboardlayout/userPages/Advertise";
import TransHistory from "./pages/dashboardlayout/userPages/TransHistory";
import Profile from "./pages/dashboardlayout/userPages/Profile";
import PasswordUpdate from "./pages/dashboardlayout/userPages/PasswordUpdate";
import ContactSupport from "./pages/dashboardlayout/userPages/ContactSupport";
import AdBuy from "./pages/dashboardlayout/userPages/AdBuy";
import CampaignStats from "./pages/dashboardlayout/userPages/CampaignStats";
import PaymentMethod from "./components/PaymentMethod";
import { SET_LOGIN } from "./redux/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authServices";
import UpdateProfile from "./pages/dashboardlayout/userPages/UpdateProfile";
import Logout from "./pages/authLayout/Logout";
import FundWallet from "./components/FundWallet";
import TaskEarn from "./pages/dashboardlayout/userPages/TaskEarn";
import TaskPerform from "./pages/dashboardlayout/userPages/TaskPerform";
import TaskList from "./pages/dashboardlayout/userPages/TaskList";
import TaskSubmit from "./pages/dashboardlayout/userPages/TaskSubmit";
import Error404Page from "./pages/mainlayout/Error404Page";
import AdminDashboard from "./pages/dashboardlayout/adminPages/AdminDashboard";
import Users from "./pages/dashboardlayout/adminPages/Users";
import Adverts from "./pages/dashboardlayout/adminPages/Adverts";
import Tasks from "./pages/dashboardlayout/adminPages/Tasks";
import Transactions from "./pages/dashboardlayout/adminPages/Transactions";
import Supportmessages from "./pages/dashboardlayout/adminPages/Supportmessages";
import AccountSettings from "./pages/dashboardlayout/adminPages/AccountSettings";
import VerifyOTP from "./pages/authLayout/VerifyOTP";
import AdvertSingle from "./pages/dashboardlayout/adminPages/AdvertSingle";
import UserSingle from "./pages/dashboardlayout/adminPages/UserSingle";
import TaskSingle from "./pages/dashboardlayout/adminPages/TaskSingle";
import VerifyEmail from "./pages/authLayout/VerifyEmail";
import EmailVerified from "./pages/authLayout/EmailVerified";
import PasswordChangeOTP from "./pages/dashboardlayout/userPages/PasswordChangeOTP";
import ChangePassword from "./pages/dashboardlayout/userPages/settings/ChangePassword";
import AdvertSingleUser from "./pages/dashboardlayout/adminPages/AdvertSingleUser";
import TransactionsSingleUser from "./pages/dashboardlayout/adminPages/TransactionsSingleUser";
import TasksSingleUser from "./pages/dashboardlayout/adminPages/TasksSingleUser";
import { useState } from "react";
import RefRegister from "./pages/authLayout/RefRegister";


axios.defaults.withCredentials = true 

function App() {
  const dispatch = useDispatch();
  const [regBtn, setRegBtn] = useState(false)
  const [loginBtn, setLoginBtn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) 

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])

  const handleRegister = (e) => {
    e.preventDefault()
    setRegBtn(!regBtn)
}

const handleLogin = (e) => {
    e.preventDefault()
    setLoginBtn(!loginBtn)
}

const handleCloseMenu = () => {
  setMobileMenuOpen(!mobileMenuOpen)
}

  return (
    <BrowserRouter>
      <Toaster/>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home handleLogin={handleLogin} handleRegister={handleRegister} loginBtn={loginBtn} regBtn={regBtn} handleCloseMenu={handleCloseMenu}/>}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/*" element={<Error404Page />}/>
          <Route path="/retrieve-pass" element={<RetrievePassword />}/>
          <Route path="/verify-phone" element={<VerifyOTP />}/>
          <Route path="/verify-email" element={<VerifyEmail />}/>
          <Route path="/verified" element={<EmailVerified />}/>
        </Route>

        <Route path="/" element={<AuthLayout />}>
          <Route path="/register/:referrerId" element={<RefRegister />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/confirm-pass" element={<ConfirmPassword />}/>
        </Route>

        <Route path="/logout" element={<Logout />}/>
        <Route path="/*" element={<Error404Page />}/>

      {/* Dashboard home route */}
      <Route 
        path="/dashboard/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Dashboard/>
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Dashboard Earn Route */}
      <Route 
        path="/dashboard/earn" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Earn/>
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

         {/* Dashboard Task Earn route */}
      <Route 
        path="/dashboard/taskearn/:platformName" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TaskEarn />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Dashboard Task Earn Perform route */}
      <Route 
        path="/dashboard/submittask/:taskId" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TaskSubmit />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

         {/* Dashboard Tasks List */}
      <Route 
        path="/dashboard/tasks/:userId" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TaskList />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Advertise Route */}
        <Route 
        path="/dashboard/advertise" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Advertise />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Dashboard Ad buy route */}
      <Route 
        path="/dashboard/adbuy/:platformName" 
        element={
          <SidebarLeft>
            <DashLayout>
              <AdBuy />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Dashboard Ad buy Stats Route */}
      <Route 
        path="/dashboard/campaign-stats" 
        element={
          <SidebarLeft>
            <DashLayout>
              <CampaignStats />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Transaction History Route */}
        <Route 
        path="/dashboard/transactions" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TransHistory />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Profile Route */}
        <Route 
        path="/dashboard/profile/" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Profile />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

         {/* Location Route */}
         <Route 
        path="/dashboard/update-profile/" 
        element={
          <SidebarLeft>
            <DashLayout>
              <UpdateProfile />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Password Route */}
        <Route 
        path="/dashboard/account-settings/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <PasswordUpdate />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Password OTP Password Route */}
        <Route 
        path="/dashboard/password-verify" 
        element={
          <SidebarLeft>
            <DashLayout>
              <PasswordChangeOTP />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Password Change Route */}
        <Route 
        path="/dashboard/password-change" 
        element={
          <SidebarLeft>
            <DashLayout>
              <ChangePassword />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Contact Route */}
        <Route 
        path="/dashboard/contact-support" 
        element={
          <SidebarLeft>
            <DashLayout>
              <ContactSupport />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />


     {/* ************************************************************************************************************* */}

     {/* Admin Routes Starts Here */}

      {/* Admin Dashboard*/}
      <Route 
        path="/admin/dashboard/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <AdminDashboard />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Users*/}
      <Route 
        path="/admin/dashboard/users/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Users />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Users Single*/}
      <Route 
        path="/admin/dashboard/user/:id" 
        element={
          <SidebarLeft>
            <DashLayout>
              <UserSingle />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Adverts*/}
      <Route 
        path="/admin/dashboard/adverts/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Adverts />
            </DashLayout>
          </SidebarLeft>
        }
        />

         {/* Admin Adverts Single*/}
      <Route 
        path="/admin/dashboard/advert/:id" 
        element={
          <SidebarLeft>
            <DashLayout>
              <AdvertSingle />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Adverts Single User*/}
      <Route 
        path="/admin/dashboard/adverts/user/:userId" 
        element={
          <SidebarLeft>
            <DashLayout>
              <AdvertSingleUser/>
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Tasks*/}
      <Route 
        path="/admin/dashboard/tasks/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Tasks />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Tasks Single*/}
      <Route 
        path="/admin/dashboard/task/:id" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TaskSingle />
              <SidebarRight />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Tasks Single User*/}
      <Route 
        path="/admin/dashboard/tasks/user/:userId" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TasksSingleUser />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Transactions*/}
      <Route 
        path="/admin/dashboard/transactions/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Transactions />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin transactions Single*/}
      <Route 
        path="/admin/dashboard/adverts/:id" 
        element={
          <SidebarLeft>
            <DashLayout>
              <AdvertSingle />
            </DashLayout>
          </SidebarLeft>
        }
        />

        {/* Admin Transactions Single User*/}
      <Route 
        path="/admin/dashboard/transactions/user/:userId" 
        element={
          <SidebarLeft>
            <DashLayout>
              <TransactionsSingleUser />
            </DashLayout>
          </SidebarLeft>
        }
        />

         {/* Admin Support messages*/}
      <Route 
        path="/admin/dashboard/support-messages/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <Supportmessages />
            </DashLayout>
          </SidebarLeft>
        }
        />

         {/* Admin Support messages*/}
      <Route 
        path="/admin/dashboard/account-settings/:username" 
        element={
          <SidebarLeft>
            <DashLayout>
              <AccountSettings />
            </DashLayout>
          </SidebarLeft>
        }
        />
    
    
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
