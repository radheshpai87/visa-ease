import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MarqueeBanner = () => {
  const bannerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    const contentWidth = contentRef.current.offsetWidth;

    // Animate content continuously from left to right
    gsap.to(contentRef.current, {
      x: `-${contentWidth / 2}`,
      ease: 'linear',
      duration: 15,
      repeat: -1,
    });
  }, []);

  return (
    <div
      ref={bannerRef}
      className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 py-3 overflow-hidden shadow-lg"
    >
      <div className="whitespace-nowrap flex text-white text-lg font-semibold tracking-wider w-max" ref={contentRef}>
        <div className="flex gap-10 px-10">
          <h2>✨ Get Free Online Visa Assessment! ✨</h2>
          <h2>⭐ Fast Process ⭐</h2>
          <h2>💼 100% Expert Support!</h2>
          <h2>✈️ Start Your Journey Today!</h2>
          <h2>📞 Contact Us Anytime!</h2>
        </div>
        {/* Clone of the same content for seamless looping */}
        <div className="flex gap-10 px-10">
          <h2>✨ Get Free Online Visa Assessment! ✨</h2>
          <h2>⭐ Fast Process ⭐</h2>
          <h2>💼 100% Expert Support!</h2>
          <h2>✈️ Start Your Journey Today!</h2>
          <h2>📞 Contact Us Anytime!</h2>
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
