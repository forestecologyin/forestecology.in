"use client";

import { useEffect, useState } from "react";
import { FiTree } from "react-icons/fi";

export default function MaintenancePage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4 md:px-6">
            {/* Animated background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main content card */}
            <div
                className={`relative z-10 w-full max-w-2xl transform transition-all duration-1000 ${isVisible
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 translate-y-10"
                    }`}
            >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100">
                    {/* Header gradient accent */}
                    <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400"></div>

                    <div className="px-8 md:px-12 py-12 md:py-16 text-center">
                        {/* Leaf Icon */}
                        <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 animate-pulse">
                            <FiTree className="w-8 h-8 text-emerald-600" />
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            Forest Ecology Lab Website is Under Maintenance
                        </h1>

                        {/* Divider */}
                        <div className="h-1 w-16 mx-auto bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mb-8"></div>

                        {/* Main description */}
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-light">
                            Our website is currently undergoing scheduled maintenance and content updates to
                            improve research resources, publications, team information, and overall performance.
                        </p>

                        {/* Secondary message */}
                        <p className="text-base text-gray-600 mb-8">
                            Please check back shortly. Thank you for your patience.
                        </p>

                        {/* Estimated downtime */}
                        <div className="inline-flex items-center justify-center px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-lg mb-12">
                            <p className="text-sm font-medium text-emerald-800">
                                📋 Estimated downtime: <span className="font-semibold">30–60 minutes</span>
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className="pt-8 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-3">
                                If you have urgent inquiries, please contact:
                            </p>
                            <a
                                href="mailto:forestecology.in@gmail.com"
                                className="inline-flex items-center justify-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                            >
                                <span>📧 forestecology.in@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-500 tracking-wide">
                            © Forest Ecology Lab | All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}
