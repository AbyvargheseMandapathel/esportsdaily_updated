import React from 'react';

// Import gaming illustrations
const gamingIllustration1 = "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const gamingIllustration2 = "https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

const GamingVisuals = () => {
    return (
        <div className="hidden md:block w-full md:w-1/2 relative overflow-hidden">
            {/* Gaming background image with overlay */}
            <div 
                className="absolute inset-0 bg-indigo-900"
                style={{
                    backgroundImage: `url(${gamingIllustration1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-purple-900/70"></div>
            </div>

            {/* Gaming content overlay */}
            <div className="relative h-full flex flex-col justify-center items-center text-center p-12">
                {/* Gaming logo/icon */}
                <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-full">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                </div>

                {/* Gaming-themed text */}
                <h1 className="text-4xl font-bold text-white mb-4">Join the Arena</h1>
                <p className="text-xl text-white/80 mb-8 max-w-md">
                    Compete, connect, and conquer in the ultimate eSports platform
                </p>

                {/* Gaming stats or features */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400">100K+</div>
                        <div className="text-sm text-white/70">Active Players</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">500+</div>
                        <div className="text-sm text-white/70">Daily Tournaments</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-pink-400">24/7</div>
                        <div className="text-sm text-white/70">Competitions</div>
                    </div>
                </div>

                {/* Gaming character illustration */}
                <div className="relative w-64 h-64">
                    <img 
                        src={gamingIllustration2} 
                        alt="Gaming character"
                        className="absolute inset-0 w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default GamingVisuals;