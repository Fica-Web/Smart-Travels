import { Link } from 'react-router-dom';
import FormWelcome from '../../components/reusable/FormWelcome';
import FormTitle from '../../components/reusable/FormTitle';
import UserLoginForm from '../../components/UserAuth/UserLoginForm';

const UserLoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 py-16 px-4">
            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">

                {/* Left Side - Welcome Section */}
                <FormWelcome 
                    firstText="Welcome"
                    secondText="Back!"
                />

                {/* Right Side - Form Section */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <FormTitle 
                        title="Login"
                        description="Enter your details below to access your account."
                        mobileTitle="Welcome Back!"
                        mobileDescription="Login to your account and continue where you left off. Let’s get you back on track!"
                    />

                    <UserLoginForm />

                    <p className="mt-6 text-sm text-center text-gray-600">
                        New User? <Link to="/signup" className="text-[#2e6bbf] hover:text-[#4a94d0]">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserLoginPage;