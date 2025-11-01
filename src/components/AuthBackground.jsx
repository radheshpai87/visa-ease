import React from "react";

const AuthBackground = ({ children }) => (
  <div className="w-full min-h-screen relative overflow-hidden bg-blue-900 flex items-center justify-center px-6 py-12">
    {/* Base dot grid pattern */}
    <div className="absolute inset-0"
         style={{
           backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#ffffff 1.5px, transparent 1.5px)',
           backgroundSize: '25px 25px',
           backgroundPosition: '0 0, 12.5px 12.5px',
           opacity: 0.1
         }}
    />
    {/* Decorative background elements */}
    <div className="absolute inset-0">
      {/* Top Left Pattern */}
      <div className="absolute top-[5%] left-[10%]">
        <svg className="w-32 h-32" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
        </svg>
      </div>
      {/* Top Right Pattern */}
      <div className="absolute top-[15%] right-[10%]">
        <svg className="w-40 h-40" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
        </svg>
      </div>
      {/* Bottom Left Pattern */}
      <div className="absolute bottom-[10%] left-[15%]">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
        </svg>
      </div>
      {/* Bottom Right Pattern */}
      <div className="absolute bottom-[20%] right-[12%]">
        <svg className="w-28 h-28" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
        </svg>
      </div>
      {/* Additional Decorative Elements */}
      <div className="absolute top-[40%] left-[5%]">
        <svg className="w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </div>
      <div className="absolute bottom-[35%] right-[8%]">
        <svg className="w-16 h-16 opacity-10 rotate-45" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </div>
    </div>
    {/* Curved lines */}
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
    {/* Main Content */}
    <div className="relative w-full max-w-4xl z-10">
      {children}
    </div>
  </div>
);

export default AuthBackground;
