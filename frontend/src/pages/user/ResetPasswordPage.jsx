import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPasswordApi } from "../../services/api/userApi";
import PasswordInput from "../../components/reusable/PasswordInput";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [formError, setFormError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setMessage("");

        if (!password || !confirmPassword) {
            return setFormError("All fields are required.");
        }

        if (password !== confirmPassword) {
            return setFormError("Passwords do not match.");
        }

        if (passwordError || confirmPasswordError) {
            return setFormError("Please fix the validation errors.");
        }

        setIsSubmitting(true);
        try {
            const response = await resetPasswordApi({ token, email, password });
            if (response.success) {
                setMessage("Password reset successful. Redirecting to login...");
                setTimeout(() => navigate("/login"), 3000);
            } else {
                setFormError(response.error || "Reset failed. Try again.");
            }
        } catch (err) {
            console.error(err);
            setFormError("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                    Reset Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <PasswordInput
                        id="new-password"
                        label="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        validate={validate}
                        onValidationChange={setPasswordError}
                    />

                    <PasswordInput
                        id="confirm-password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        validate={validate}
                        onValidationChange={setConfirmPasswordError}
                    />

                    {formError && <div className="text-red-500 text-sm text-center">{formError}</div>}
                    {message && <div className="text-green-600 text-sm text-center">{message}</div>}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full ${
                            isSubmitting ? "bg-blue-300" : "bg-[#2e6bbf] hover:bg-[#4a94d0]"
                        } text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition`}
                    >
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;