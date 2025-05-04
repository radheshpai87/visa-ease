import React from 'react'
import { GiCommercialAirplane } from "react-icons/gi";


const Center = () => {
  return (
    <div className='h-full w-full md:px-30 md:flex gap-[1vw] mt-2 pb-5  md:flex-row flex-col'>
        <div className='p-10 md:w-1/2 relative pl-10 w-full'>
            <img src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/about-img-1-1.jpg" alt=""  className='bg-cover'/>
            <div className=''>
                <img src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/about-img-2-1.jpg" alt="" className='absolute bottom-0 md:right-[20%] bg-cover h-[220px] right-2 w-[240px] md:h-cover md:w-[17vw]'/>
            </div>
            <div className=''>
                <div className='md:h-[200px] md:w-[200px] h-[35vw] w-[35vw] rounded-full bg-[#be0b32] absolute bottom-0 md:right-[33vw] left-0 flex items-center justify-center flex-col text-2xl text-white font-bold border-2 border-white-700  font-serif text-center'>
                    <h1>100 %</h1>
                    <h1>Success rate</h1>
                </div>
            </div>
        </div>
        <div className='md:w-1/2 md:flex md:flex-col md:gap-[1.7vw] md:mt-5 mt-[8vw] flex-col pl-[8vw] md:pl-0 w-full gap-4 md:pr-0 pr-[8vw]'>
            <div className='flex gap-[0.7vw] flex-row '>
                <GiCommercialAirplane className='text-[#be0b32] text-2xl'/>
                <p className="font-bold text-[#be0b32] text-2xl">About VisaEase</p>
            </div>
            <div className='md:text-4xl font-bold text-2xl'>
                <h1>Not just traditional visa &</h1>
                <h1 className='md:my-2'>immigration firm</h1>
            </div>
            <div className='text-1xl font-light md:mt-0 mt-3'>
                <p>The Most Trusted Immigration and Visa Consultant. There are locations in the United states of america as well as internationally. The organization was established in 2000 on the basis of a small idea conceived.</p>
            </div>
            <div className='flex flex-col md:gap-2 gap-3 md:mt-0 mt-3'>
                <div className='flex md:gap-2 items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0.625C4.825 0.625 0.625 4.825 0.625 10C0.625 15.175 4.825 19.375 10 19.375C15.175 19.375 19.375 15.175 19.375 10C19.375 4.825 15.175 0.625 10 0.625ZM14.6875 8.325L10.3125 13.325C10.0688 13.6062 9.725 13.75 9.375 13.75C9.1 13.75 8.825 13.6625 8.59375 13.475L5.46875 10.975C4.87762 10.5007 4.83075 9.5955 5.41969 9.06588C5.88287 8.64931 6.59975 8.67981 7.08625 9.069L8.98894 10.5911C9.1175 10.6939 9.30419 10.6774 9.41275 10.5537L12.8125 6.675C13.2625 6.15625 14.0562 6.10625 14.575 6.5625C15.0938 7.0125 15.1438 7.80625 14.6875 8.325Z" className='text-red-700'></path></svg>
                    <p>We offer flexible hours to fit your busy schedule.</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0.625C4.825 0.625 0.625 4.825 0.625 10C0.625 15.175 4.825 19.375 10 19.375C15.175 19.375 19.375 15.175 19.375 10C19.375 4.825 15.175 0.625 10 0.625ZM14.6875 8.325L10.3125 13.325C10.0688 13.6062 9.725 13.75 9.375 13.75C9.1 13.75 8.825 13.6625 8.59375 13.475L5.46875 10.975C4.87762 10.5007 4.83075 9.5955 5.41969 9.06588C5.88287 8.64931 6.59975 8.67981 7.08625 9.069L8.98894 10.5911C9.1175 10.6939 9.30419 10.6774 9.41275 10.5537L12.8125 6.675C13.2625 6.15625 14.0562 6.10625 14.575 6.5625C15.0938 7.0125 15.1438 7.80625 14.6875 8.325Z" className='text-red-700'></path></svg>
                    <p>Team is committed making you feel comfort..</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 0.625C4.825 0.625 0.625 4.825 0.625 10C0.625 15.175 4.825 19.375 10 19.375C15.175 19.375 19.375 15.175 19.375 10C19.375 4.825 15.175 0.625 10 0.625ZM14.6875 8.325L10.3125 13.325C10.0688 13.6062 9.725 13.75 9.375 13.75C9.1 13.75 8.825 13.6625 8.59375 13.475L5.46875 10.975C4.87762 10.5007 4.83075 9.5955 5.41969 9.06588C5.88287 8.64931 6.59975 8.67981 7.08625 9.069L8.98894 10.5911C9.1175 10.6939 9.30419 10.6774 9.41275 10.5537L12.8125 6.675C13.2625 6.15625 14.0562 6.10625 14.575 6.5625C15.0938 7.0125 15.1438 7.80625 14.6875 8.325Z" className='text-red-700'></path></svg>
                    <p>Team is committed making you feel comfort.</p>
                </div>
            </div>
            <div>
                <div className='md:flex gap-4 md:pr-0 pr-3 md:mt-0 mt-5'>
                    <img src="https://demo.awaikenthemes.com/imigo/wp-content/uploads/2024/12/about-experience-image.jpg" alt="" className='md:h-[5vw] '/>
                    <p className='md:mt-0 mt-5 '>25 + Years of sponsoring and managing works visas part now become results in the experience.</p>
                </div>
            </div>
            <div>
                <button className='p-3 border-1 border-[#be0b32] rounded-1xl text-xl md:mt-0 mt-3'>Learn More</button>
            </div>
        </div>
    </div>
  )
}

export default Center