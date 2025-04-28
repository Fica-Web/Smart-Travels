import { Link } from "react-router-dom";
import FormWelcome from "../../components/reusable/FormWelcome";
import FormTitle from "../../components/reusable/FormTitle";
import UserSignupForm from "../../components/UserAuth/UserSignupForm";

const SignUpPage = () => {
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
                        title="Sign up"
                        description="Join us by creating your account and unlock all the amazing features."
                        mobileTitle="Join Us!"
                        mobileDescription="Create your account and become part of our community. Let’s get started!"
                    />

                    <UserSignupForm />

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#2e6bbf] hover:text-[#4a94d0]">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage