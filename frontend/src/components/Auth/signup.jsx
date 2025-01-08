import React, { useState } from "react";
import Select from "react-select";
import Modal from "./Modal";
import { signup } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Home/Header";
import { Navigate, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: null,
    location: { lng: "", lat: "" },
  });
  const [locationSelected, setLocationSelected] = useState(false);

  const roleOptions = [
    { value: "donor", label: "Donor" },
    { value: "receiver", label: "Receiver" },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, role: selectedOption });
  };

  const handleSaveLocation = (coords) => {
    setFormData({
      ...formData,
      location: {
        lng: coords.lng,
        lat: coords.lat,
      },
    });
    setLocationSelected(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role.value,
      location: {
        type: "Point",
        coordinates: [formData.location.lng, formData.location.lat],
      },
    };
    try {
      const response = await fetch("https://ecobite-foodwastereductionsystem.onrender.com/api/Register", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        dispatch(signup(data.data.user));
        navigate("/donate");
        console.log("Signup successful:", data);
      } else {
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
    console.log(formData);
  };

  return (
    <>
      {!selector.isLoggedIn ? (
        <>
          <Header />
          <div className="flex py-12 items-center justify-center">
            <div className="mx-auto w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight">Sign Up</h2>
                <p className="mt-2 text-gray-500">
                  Create your account to get started.
                </p>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <Select
                      id="role"
                      options={roleOptions}
                      placeholder="Select a role"
                      className="basic-single"
                      classNamePrefix="select"
                      value={formData.role}
                      onChange={handleSelectChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <input
                      id="location"
                      type="text"
                      placeholder={
                        locationSelected
                          ? `${formData.location.lng}, ${formData.location.lat}`
                          : "Enter your location"
                      }
                      required
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 ${locationSelected ? "bg-green-200" : ""}`}
                      value={
                        locationSelected
                          ? `longitude: ${formData.location.lng.toFixed(4)}, latitude: ${formData.location.lat.toFixed(4)}`
                          : ""
                      }
                      readOnly
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Modal onSaveLocation={handleSaveLocation} />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500">
                  already have an account ?{" "}
                  <a
                    href="/login"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>{" "}
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default SignUpForm;
