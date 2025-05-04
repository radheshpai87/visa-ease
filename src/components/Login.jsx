import React, { useState } from 'react';

const LoginRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const toggleForm = () => setIsLogin(!isLogin);

  const PlaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {[0, 1, 2].map((_, idx) => (
        <div
          key={idx}
          className={`absolute w-64 h-64 opacity-5 ${
            idx === 0 ? 'bottom-0 left-0' : idx === 1 ? 'top-0 right-0 rotate-180' : 'top-1/4 left-1/4 rotate-45'
          }`}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,90 Q40,40 90,10" stroke="white" fill="transparent" strokeWidth="2" />
          </svg>
        </div>
      ))}

      {/* Card */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="bg-blue-900 text-white p-8 md:w-2/5 flex flex-col justify-between relative">
          <div className="z-10">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-red-600 p-2 rounded-md">
                <PlaneIcon />
              </div>
              <span className="text-2xl font-bold">VisaEase</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Global Journey Starts Here</h2>
            <p className="mb-8 opacity-80">Join thousands of students and professionals who've achieved their international dreams with our help.</p>
            <div className="flex gap-4 mb-8">
              {[
                { value: '15+', label: 'Years' },
                { value: '50+', label: 'Countries' },
                { value: '10k+', label: 'Clients' },
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-800 p-3 h-16 w-16 rounded-lg flex flex-col items-center justify-center text-xs">
                  <span className="font-bold text-lg">{item.value}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 right-8 opacity-20">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
              <path d="M22 16.5H8c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zM16.94 2c-.3 0-.59.13-.79.33l-1.66 1.66c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0l.72-.72 3.5 3.5-9.74 9.74c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l9.74-9.74 3.5 3.5-.72.72c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l1.66-1.66c.29-.29.29-.77 0-1.06l-8.07-8.07c-.2-.2-.49-.33-.79-.33z" />
            </svg>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:w-3/5 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isLogin ? 'bg-red-600 text-white' : 'text-gray-500'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isLogin ? 'bg-red-600 text-white' : 'text-gray-500'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {isLogin ? (
              <>
                <div>
                  <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-login"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password-login"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="h-4 w-4 text-red-600" />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <a href="#" className="text-red-600 hover:underline">Forgot password?</a>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-register"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="+1 (123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password-register"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <button className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <PlaneIcon />
            </button>

            {/* Social Logins */}
            <div className="text-center mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Google', 'Facebook', 'Apple'].map((provider, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span>{provider}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={toggleForm} className="text-red-600 hover:underline font-medium">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
