const DynamicContentSections = ({
    sections,
    onChange,
    onAdd,
    onRemove,
    errors,
    fieldConfig,
    title = 'Sections',
    addButtonLabel = '+ Add Section'
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{title}</h3>

            {sections?.map((section, index) => (
                <div key={index} className="border border-gray-300 p-4 rounded-lg bg-gray-50 space-y-4">
                    {fieldConfig.map(({ name, label, type = "text", placeholder }, fIndex) => (
                        <div key={fIndex}>
                            <label className="block text-gray-700 font-medium">{label}</label>
                            {type === "textarea" ? (
                                <textarea
                                    value={section[name]}
                                    onChange={(e) => onChange(index, name, e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md mt-1"
                                    rows="3"
                                    placeholder={placeholder}
                                />
                            ) : (
                                <input
                                    type={type}
                                    value={section[name]}
                                    onChange={(e) => onChange(index, name, e.target.value)}
                                    className="w-full border border-gray-300 p-2 rounded-md mt-1"
                                    placeholder={placeholder}
                                />
                            )}
                            {errors?.[`${name}${index}`] && (
                                <p className="text-red-500 text-sm">{errors[`${name}${index}`]}</p>
                            )}
                        </div>
                    ))}

                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="text-red-500 font-semibold hover:text-red-700"
                        >
                            Remove Section
                        </button>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={onAdd}
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
            >
                {addButtonLabel}
            </button>
        </div>
    );
};

export default DynamicContentSections;