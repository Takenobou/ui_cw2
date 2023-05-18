import {ChangeEvent, FormEvent, useState} from "react";
import loginData from '../data/userdata.json';
import {Link, useNavigate} from "react-router-dom";
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}


const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: loginData.name,
        email: loginData.email,
        password: loginData.password,
        confirmPassword: loginData.password,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        if (formData.password !== formData.confirmPassword) {
            console.error('Passwords do not match');
        } else {
            console.log('Form data submitted:', formData);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg shadow-md w-full lg:w-1/3">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 py-12 flex items-center text-gray-500 h-full"
                        >
                            {showPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 py-12 flex items-center text-gray-500 h-full"
                        >
                            {showConfirmPassword ? (
                                <FiEyeOff className="h-5 w-5" />
                            ) : (
                                <FiEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md focus:outline-none hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-sm">Already have an account?</span>
                        <Link to="/signin" className="text-indigo-600 ml-1">
                            Log in here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;