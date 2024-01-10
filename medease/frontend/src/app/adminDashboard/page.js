
// pages/admin/dashboard.js
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react"; // Import useState from "react" here

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("createAccount");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      {/* Navbar */}
      <nav className="bg-white p-4">
        <h1 className="text-2xl font-semibold text-blue-600">Admin Dashboard</h1>
      </nav>

      {/* Content */}
      <div className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("createAccount")}
            className={`${
              activeTab === "createAccount"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-4 py-2 rounded-md focus:outline-none`}
          >
            Create Account
          </button>
          <button
            onClick={() => setActiveTab("verifyAccount")}
            className={`${
              activeTab === "verifyAccount"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            } px-4 py-2 rounded-md focus:outline-none`}
          >
            Verify Account
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "createAccount" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Create Accounts</h2>
            {/* Add content for creating accounts */}
            <ul>
              <li>
                <Link href="/admin/create/hospital">Create Hospital Account</Link>
              </li>
              <li>
                <Link href="/admin/create/doctor">Create Doctor Account</Link>
              </li>
              <li>
                <Link href="/admin/create/pharmacy">Create Pharmacy Account</Link>
              </li>
            </ul>
          </div>
        )}

        {activeTab === "verifyAccount" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Verify Accounts</h2>
            {/* Add content for verifying accounts */}
            <ul>
              <li>
                <Link href="/admin/verify/hospital">Verify Hospital Account</Link>
              </li>
              <li>
                <Link href="/admin/verify/doctor">Verify Doctor Account</Link>
              </li>
              <li>
                <Link href="/admin/verify/pharmacy">Verify Pharmacy Account</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
