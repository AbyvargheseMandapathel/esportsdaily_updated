import React from 'react';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaDiscord, FaTwitch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';
import FormInput from './FormInput';
import SocialButton from './SocialButton';
import AuthCard from './AuthCard';

const SignupForm = ({ formData, errors, handleChange, handleSubmit }) => {
    return (
        <div className="w-full md:w-1/2 bg-gray-900 flex items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-md">
                <AuthCard>
                    <SectionHeader
                        title="Create Account"
                        subtitle="Join the eSports Daily community"
                    />

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            label="Username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            icon={<FaUser />}
                            error={errors.username}
                            placeholder="Choose a username"
                        />

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

                        <FormInput
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            icon={<FaLock />}
                            error={errors.confirmPassword}
                            placeholder="••••••••"
                        />

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agree-terms"
                                    name="agreeTerms"
                                    type="checkbox"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agree-terms" className="text-gray-300">
                                    I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                                </label>
                                {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/30"
                            >
                                Create Account
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                    Sign in
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

export default SignupForm;