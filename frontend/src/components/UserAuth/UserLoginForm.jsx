import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PasswordInput from '../reusable/PasswordInput';

const UserLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [validatePassword, setValidatePassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null); // API or general error
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidatePassword(true); // Trigger internal validation
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid!";
    }

    if (Object.keys(newErrors).length > 0 || passwordError) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    setError(null);

    try {
      await login(formData); // Login function from AuthContext
      navigate('/');         // Redirect to homepage or dashboard
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      setError(serverMessage || "Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-600 mb-1 text-sm">Email</label>
        <input
          name="email"
          value={formData.email}
          type="email"
          placeholder="username@gmail.com"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4a94d0]"
        />
        {formErrors.email && <small className="text-red-500">{formErrors.email}</small>}
      </div>

      <PasswordInput
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={validatePassword}
        onValidationChange={setPasswordError}
      />

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember">Remember Me</label>
        </div>
        <Link to="/forgot-password" className="text-[#2e6bbf] hover:text-[#4a94d0] hover:underline">
          Forgot Password?
        </Link>
      </div>

      {error && <div className="text-sm text-red-600 text-center">{error}</div>}

      <button
        type="submit"
        className="w-full bg-[#2e6bbf] hover:bg-[#4a94d0] text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a94d0] focus:ring-offset-2 transition"
      >
        Login
      </button>
    </form>
  );
};

export default UserLoginForm;
