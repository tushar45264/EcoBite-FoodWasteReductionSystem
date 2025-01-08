// import logo from './logo.svg';
import "./App.css";
import Home from "./components/Home/Home";
import Track from "./components/Tracking/Track";
import SignUpForm from "./components/Auth/signup";
import Login from "./components/Auth/login";
import Donation from "./components/MakeDonation/Donation";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllDonation from "./components/Donation/AllDonation";
import MakeDonation from "./components/MakeDonation/MakeDonation";
import Dashboard from "./components/MakeDonation/Dashboard";
// import Chat from './components/Tracking/resChat';

function App() {
  const selector = useSelector((state) => state.user);
  // console.log(selector)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/track"
            element={
              selector.user && selector.user.role === "receiver" ? (
                <Track />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/donate"
            element={
              selector.user && selector.user.role === "donor" ? (
                <Donation />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/makedonation"
            element={
              selector.user && selector.user.role === "donor" ? (
                <MakeDonation />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              selector.user && selector.user.role === "donor" ? (
                <Dashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/alldonation"
            element={
              selector.user && selector.user.role === "receiver" ? (
                <AllDonation />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
