import React, { useEffect } from "react";
import { CheckCircle, ArrowRight, Download, Clock, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Reset scroll position and body styles when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.documentElement.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  // Enhanced navigation function
  const handleNavigateToOrders = () => {
    window.scrollTo(0, 0);
    navigate("/my-account/orders", {
      replace: false,
      state: { fromPaymentSuccess: true },
    });
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        {/* Success Icon Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block">
            {/* Main Success Icon */}
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                <CheckCircle
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-white"
                  strokeWidth={2.5}
                />
              </div>

              {/* Floating Stars */}
              <div className="absolute -top-4 -right-2 animate-bounce [animation-delay:0.5s]">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="absolute -top-2 -left-4 animate-bounce [animation-delay:1s]">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </div>
              <div className="absolute -bottom-2 right-0 animate-bounce [animation-delay:1.5s]">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
            </div>

            {/* Ripple Effects */}
            <div className="absolute inset-0 -m-8">
              <div className="w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 border-2 border-emerald-400/30 rounded-full animate-ping opacity-40"></div>
            </div>
            <div className="absolute inset-0 -m-12">
              <div className="w-44 h-44 sm:w-48 sm:h-48 lg:w-52 lg:h-52 border border-emerald-400/20 rounded-full animate-ping opacity-30 [animation-delay:0.5s]"></div>
            </div>
          </div>
        </div>

        {/* Main Success Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl sm:rounded-4xl shadow-2xl p-6 sm:p-8 lg:p-10 text-center border border-white/20 hover:bg-white/100 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-tight">
              Payment Successful!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-2 leading-relaxed">
              Thank you for your purchase! Your payment has been processed
              successfully.
            </p>
            <p className="text-emerald-600 text-sm sm:text-base font-medium flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Transaction completed at {new Date().toLocaleTimeString()}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            {/* Primary Button */}
            <button
              onClick={handleNavigateToOrders}
              className="group w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-semibold py-4 sm:py-5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-200 relative overflow-hidden"
            >
              <span className="relative flex items-center justify-center text-base sm:text-lg">
                View Your Order
                <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {/* Secondary Button */}
            {/* <button className="group w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 sm:py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-gray-200">
              <span className="flex items-center justify-center text-sm sm:text-base">
                <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
                Download Receipt
              </span>
            </button> */}
          </div>

          {/* Order Details Preview */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-6 mb-6">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono font-semibold text-emerald-600">
                #{id}
              </span>
            </div>
            {/* <div className="flex items-center justify-between text-sm sm:text-base mt-2">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-emerald-600 text-lg">
                $129.99
              </span>
            </div> */}
          </div>

          {/* Animated Progress Dots */}
          <div className="flex justify-center space-x-3 mb-4">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-400 rounded-full animate-pulse [animation-delay:200ms]"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:400ms]"></div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            A confirmation email has been sent to your inbox.
            <br />
            <span className="text-emerald-300 font-medium">
              Thank you for choosing us!
            </span>
          </p>
        </div>

        {/* Additional Trust Indicators */}
        <div className="flex justify-center items-center gap-4 mt-6 sm:mt-8 text-white/60">
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Secure Payment
          </div>
          <div className="w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-1 text-xs sm:text-sm">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse [animation-delay:0.5s]"></div>
            SSL Protected
          </div>
        </div>
      </div>
    </div>
  );
}
