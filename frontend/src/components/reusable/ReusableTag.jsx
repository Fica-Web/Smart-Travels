const tagColors = {
    "visa": "bg-blue-100 text-blue-700",
    "flight": "bg-green-100 text-green-700",
    "hotel": "bg-yellow-100 text-yellow-800",
    "insurance": "bg-purple-100 text-purple-700",
    "package": "bg-pink-100 text-pink-700",
    "Other": "bg-gray-100 text-gray-700",
};

const ReusableTag = ({ label }) => {
    const colorClass = tagColors[label] || tagColors["Other"];
    
    return (
        <span className={`px-3 py-1 text-sm rounded-full font-medium ${colorClass}`}>
            {label}
        </span>
    );
};

export default ReusableTag;