import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormWelcome from "../../components/reusable/FormWelcome";
import FormTitle from "../../components/reusable/FormTitle";
import UserSignupForm from "../../components/UserAuth/UserSignupForm";
import OtpVerificationForm from "../../components/UserAuth/OtpVerificationForm";

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('signup');
    const navigate = useNavigate();

    const handleOtpSent = (userEmail) => {
        setEmail(userEmail);
        setStep('otp');
    };

    const handleVerified = () => {
        setStep('verified');
        navigate('/login');
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-16 px-4">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">

                <FormWelcome
                    firstText="Welcome to"
                    secondText="Rukn Travels"
                    description="Explore the world with confidence and comfort."
                />

                {/* Right Side - Form Section */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <FormTitle
                        title={step === 'signup' ? "Sign Up" : "Verify OTP"}
                        description={step === 'signup' ? "Join us by creating your account and unlock all the amazing features." : 'Verify your OTP to proceed.'}
                        mobileTitle={step === 'signup' ? "Join Us!" : "Verify OTP"}
                        mobileDescription={step === 'signup' ? "Create your account and become part of our community. Let’s get started!" : <p>📩 OTP sent to <span className="font-medium">{email}</span></p>}
                    />

                    {step === 'signup' && <UserSignupForm onOTPSent={handleOtpSent} />}
                    {step === 'otp' && <OtpVerificationForm email={email} onVerified={handleVerified} />}
                    {/* {step === 'verified' && <p>Account verified! You can now log in.</p>} */}

                    {step === 'signup' && (
                        <p className="mt-6 text-sm text-center text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#2e6bbf] hover:text-[#4a94d0]">
                                Login
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignUpPage