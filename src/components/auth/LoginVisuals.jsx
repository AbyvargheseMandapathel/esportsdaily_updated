import React from 'react';

// Import gaming illustrations
const gamingIllustration = "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";

const LoginVisuals = () => {
    return (
        <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden">
            {/* Gaming background image with overlay */}
            <div 
                className="absolute inset-0 bg-blue-900"
                style={{
                    backgroundImage: `url(${gamingIllustration})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-indigo-900/70"></div>
            </div>

            {/* Content overlay */}
            <div className="relative h-full flex flex-col justify-center items-center text-center p-12">
                {/* Logo/icon */}
                <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                    </div>
                </div>

                {/* Welcome text */}
                <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
                <p className="text-xl text-white/80 mb-8 max-w-md">
                    Sign in to continue your eSports journey and stay connected with the community
                </p>

                {/* Benefits */}
                <div className="space-y-4 w-full max-w-md mb-12">
                    <div className="flex items-center">
                        <div className="bg-white/20 rounded-full p-2 mr-4">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-white text-lg">Access your personalized dashboard</span>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-white/20 rounded-full p-2 mr-4">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-white text-lg">Track your favorite teams and players</span>
                    </div>
                    <div className="flex items-center">
                        <div className="bg-white/20 rounded-full p-2 mr-4">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <span className="text-white text-lg">Join exclusive tournaments and events</span>
                    </div>
                </div>

                {/* Quote */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl max-w-md">
                    <p className="text-white/90 italic mb-4">
                        "The best way to predict the future of eSports is to create it."
                    </p>
                    <p className="text-white/70 text-sm text-right">— eSports Daily Team</p>
                </div>
            </div>
        </div>
    );
};

export default LoginVisuals;