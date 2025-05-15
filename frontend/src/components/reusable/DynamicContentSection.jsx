
const DynamicContentSections = ({
    sections,
    onChange,
    onAdd,
    onRemove,
    errors,
    title = 'Content Sections',
    addButtonLabel = '+ Add Section'
}) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            {sections.map((section, index) => (
                <div key={index} className="border border-gray-500 p-4 rounded-lg bg-gray-100">
                    <div>
                        <label className="block text-gray-700 font-medium">Content Title</label>
                        <input
                            type="text"
                            value={section.contentTitle}
                            onChange={(e) => onChange(index, 'contentTitle', e.target.value)}
                            className="w-full border border-gray-500 p-2 rounded-md mt-1"
                        />
                        {errors?.[`contentTitle${index}`] && (
                            <p className="text-red-500 text-sm">{errors[`contentTitle${index}`]}</p>
                        )}
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-700 font-medium">Content Description</label>
                        <textarea
                            value={section.contentDescription}
                            onChange={(e) => onChange(index, 'contentDescription', e.target.value)}
                            rows="3"
                            className="w-full border border-gray-500 p-2 rounded-md mt-1"
                        />
                        {errors?.[`contentDescription${index}`] && (
                            <p className="text-red-500 text-sm">{errors[`contentDescription${index}`]}</p>
                        )}
                    </div>

                    {index > 0 && (
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="text-red-500 font-semibold mt-2 hover:text-red-700"
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