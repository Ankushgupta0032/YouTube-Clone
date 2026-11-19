import React, { useState } from "react";
import logo from "../assets/download (1).png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../store/slice/authSlice";

function Signup() {
    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setAvatar(file);
            setError("");
        }
    };

    // Submit form
    const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    setError("");
    setSuccessMessage("");

    if (!avatar) {
        setError("Please select a profile picture.");
        setLoader(false);
        return;
    }

    try {
        const data = new FormData();

        data.append("fullName", formData.fullName);
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("avatar", avatar);

        console.log("========== SIGNUP DATA ==========");

        for (const [key, value] of data.entries()) {
            console.log(key, value);
        }

        console.log("=================================");

        const result = await dispatch(register(data)).unwrap();

        console.log("Registration successful:", result);

        setSuccessMessage("Signup successful!");

        alert("Signup Successfully");

        setFormData({
            fullName: "",
            username: "",
            email: "",
            password: "",
        });

        setAvatar(null);

        navigate("/login");

    } catch (err) {
        console.error("Signup Error:", err);

        setError(
            typeof err === "string"
                ? err
                : err?.message || "Registration failed"
        );

    } finally {
        setLoader(false);
    }
};

    // Loading screen
    if (loader) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-100">
                <div className="text-center">
                    <div
                        className="inline-block w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"
                        role="status"
                        aria-label="Loading"
                    ></div>

                    <p className="mt-4 text-gray-700">
                        Creating your account...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen bg-slate-100">

            {/* Logo */}
            <Link
                to="/"
                className="flex items-center justify-center mb-8"
            >
                <img
                    src={logo}
                    className="mr-4 h-11"
                    alt="Logo"
                />
            </Link>

            {/* Signup Card */}
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow sm:p-8">

                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Create a New Account
                </h2>

                <form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                >

                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Ankush Gupta"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="ankush123"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="ankush@gmail.com"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                            required
                        />
                    </div>

                    {/* Avatar */}
                    <div>
                        <label
                            htmlFor="avatar"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Profile Picture
                        </label>

                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
                            required
                        />

                        {avatar && (
                            <p className="mt-2 text-sm text-green-600">
                                Selected: {avatar.name}
                            </p>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {successMessage && (
                        <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
                            {successMessage}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loader}
                        className="w-full px-5 py-3 text-base font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-black disabled:opacity-50"
                    >
                        Create Account
                    </button>

                    {/* Login */}
                    <div className="text-sm font-medium text-gray-500">
                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-blue-700 hover:underline"
                        >
                            Login here
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Signup;