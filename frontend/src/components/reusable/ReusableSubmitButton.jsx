
const ReusableSubmitButton = ({ loading, text, loadingText, ...props }) => {
    return (
        <button
            {...props}
            disabled={loading}
            className={`w-full py-2 rounded-md cursor-pointer text-white transition duration-200 
                ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}
            `}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                        ></path>
                    </svg>
                    {loadingText || "Loading..."}
                </div>
            ) : (
                text
            )}
        </button>
    );
};

export default ReusableSubmitButton;