import React from "react";

const blogPosts = [
  {
    title: "The Human Rights and Democracy Programme",
    image: "https://i.pinimg.com/736x/b0/aa/71/b0aa712b004c5458e8ff7fa22394f2e4.jpg",
  },
  {
    title: "Project Concepts Or Related Queries Should Be",
    image: "https://i.pinimg.com/736x/fc/01/d3/fc01d347bb95d062e585b5c1d71d11fb.jpg",
  },
  {
    title: "Customers Applying for a Priority Visas (PVs) ..",
    image: "https://i.pinimg.com/736x/8e/34/e2/8e34e2dcb37b6c98ddde94a6f3c16db7.jpg",
  },
  {
    title: "Visa Application Guidance for New Applicants",
    image: "https://i.pinimg.com/736x/a4/40/05/a440052a8048a64b5bb9e311e2d96bf7.jpg",
  },
  {
    title: "Business Travel Simplified with Our Services",
    image: "https://i.pinimg.com/736x/83/83/8f/83838f6ec0b252aac34808fd64ecd729.jpg",
  },
  {
    title: "Explore the World with Confidence",
    image: "https://i.pinimg.com/736x/fa/aa/f4/faaaf493f4f4e84c87cf17b15f149072.jpg",
  },
];

const BlogSection = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 pt-28 relative z-50" data-scroll data-scroll-section>
      <section className="px-6 py-16 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          <h2 className="text-[#be0b32] uppercase tracking-widest font-extrabold text-4xl mb-2">
            Our Blog
          </h2>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#051440] leading-tight mb-4">
            Stay Updated With The <br />
            <span className="bg-gradient-to-r from-[#be0b32] to-[#8a0e24] text-transparent bg-clip-text">
              Latest Immigration News
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Explore expert tips, policy updates, and success stories from people like you. Get informed before your next visa step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-40">
                <h3 className="text-[#051440] font-bold text-lg mb-2">
                  {post.title}
                </h3>
                <a
                  href="#"
                  className="text-[#be0b32] font-semibold hover:underline text-sm"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
