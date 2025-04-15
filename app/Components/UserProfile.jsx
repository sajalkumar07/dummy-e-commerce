// components/UserProfile.jsx
"use client";

import { useState, useEffect } from "react";
import { User, Package, Heart, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import OrderHistory from "./OrderHistory";
import Wishlist from "./Wishlist";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      // Set initial profile data from user object
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    // In a real application, you would make an API call here
    // and then update the user data in context/localStorage
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div className="p-8 text-center">Please log in to view your profile.</div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Profile</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={profileData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
      case "orders":
        return <OrderHistory />;
      case "wishlist":
        return <Wishlist />;
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Account Settings</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-lg">Password</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Update your password to keep your account secure
                </p>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Change Password
                </button>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-lg">Email Preferences</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Manage your email notification settings
                </p>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="order-updates"
                      className="h-4 w-4 text-indigo-600"
                      defaultChecked
                    />
                    <label
                      htmlFor="order-updates"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Order updates
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="promotions"
                      className="h-4 w-4 text-indigo-600"
                      defaultChecked
                    />
                    <label
                      htmlFor="promotions"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Promotions and deals
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="h-4 w-4 text-indigo-600"
                    />
                    <label
                      htmlFor="newsletter"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Weekly newsletter
                    </label>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-lg text-red-600">
                  Danger Zone
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Permanently delete your account and all data
                </p>
                <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto my-8">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-indigo-500" />
            </div>
            <h3 className="text-xl font-medium">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "profile"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "orders"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Order History
            </button>

            <button
              onClick={() => setActiveTab("wishlist")}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "wishlist"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart className="mr-3 h-5 w-5" />
              Wishlist
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === "settings"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>

            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Log Out
            </button>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 md:p-8">{renderTabContent()}</div>
      </div>
    </div>
  );
};
export default UserProfile;
