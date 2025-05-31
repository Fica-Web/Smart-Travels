const ActionButton = ({ onClick, label = "View" }) => {
    return (
        <button
            onClick={onClick}
            className="px-3 py-1 text-sm rounded bg-primary-blue text-white hover:bg-primary-dark transition-all duration-150"
        >
            {label}
        </button>
    );
};

export default ActionButton;
