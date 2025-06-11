import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import notFoundImage from '../../assets/image/shared/not-found.png';

const NotFoundPage = () => {
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center lg:pt-0 pt-10">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Page Not Found</p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-6 lg:px-0 px-5">Sorry, the page you are looking for could not be found.</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-primary-blue text-white px-5 py-2 rounded-xl shadow-lg hover:bg-[#397bb3] transition-transform transform hover:scale-105"
                >
                    <Home className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>
            <div className="w-full lg:w-1/2 lg:h-full flex lg:items-center justify-center p-4 lg:p-8  h-fit">
                <img src={notFoundImage} alt="404 Image" />
            </div>
        </div>
    );
};

export default NotFoundPage;