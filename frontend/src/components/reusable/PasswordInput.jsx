import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  id = "password",
  label = "Password",
  value,
  onChange,
  validate = false, // ✅ Trigger validation from parent
  onValidationChange, // ✅ Callback to send error to parent
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (validate) {
      const validationError = getValidationError(value);
      setError(validationError);
      if (onValidationChange) onValidationChange(validationError);
    }
  }, [validate, value]); // Re-run when `validate` or `value` changes

  const getValidationError = (password) => {
    if (!password.trim()) return "Password is required!";
    if (password.length < 8) return "Password must be at least 8 characters long!";
    if (!/\d/.test(password)) return "Password must contain at least one number!";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must contain at least one symbol!";
    return "";
  };

  return (
    <div className="flex flex-col gap-3 mb-5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPasswordVisible ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder="********"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
        />
        <span
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default PasswordInput;
