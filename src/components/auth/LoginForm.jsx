import React from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaDiscord, FaTwitch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';
import FormInput from './FormInput';
import SocialButton from './SocialButton';
import AuthCard from './AuthCard';

const LoginForm = ({ formData, errors, handleChange, handleSubmit }) => {
    return (
        <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md">
                <AuthCard>
                    <SectionHeader 
                        title="Welcome Back" 
                        subtitle="Sign in to access your account" 
                    />
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            icon={<FaEnvelope />}
                            error={errors.email}
                            placeholder="your@email.com"
                        />
                        
                        <FormInput
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            icon={<FaLock />}
                            error={errors.password}
                            placeholder="••••••••"
                        />
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/30"
                            >
                                Sign in
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                            </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <SocialButton icon={<FaGoogle />} provider="Google" />
                            <SocialButton icon={<FaDiscord />} provider="Discord" />
                            <SocialButton icon={<FaTwitch />} provider="Twitch" />
                        </div>
                    </div>
                </AuthCard>
            </div>
        </div>
    );
};

export default LoginForm;