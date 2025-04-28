import React from 'react'
import { useParams } from "react-router-dom";
import { useState } from "react";

const ResetPassword = () => {
      const { token } = useParams();
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [message, setMessage] = useState("");
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          setMessage("Passwords do not match!");
          return;
        }
    
        const response = await fetch(`/api/reset-password/${token}`, {
          method: "POST",
          body: JSON.stringify({ password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const result = await response.json();
        if (response.ok) {
          setMessage("Password has been successfully reset!");
        } else {
          setMessage(result.message || "Something went wrong. Please try again.");
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Reset Password</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-600 mb-1 text-sm">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1 text-sm">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
                />
              </div>
              {message && <div className="text-center text-sm text-gray-600 mt-2">{message}</div>}
              <button
                type="submit"
                className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      );
    }
    

export default ResetPassword