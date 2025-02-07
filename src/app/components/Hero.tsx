'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";
const Hero = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <Image src={"/light.png"} height={10000} width={10000} alt={'light'} className='absolute overflow-hidden top-[-300px] opacity-5' />
      <div className='max-w-[1400px] gap-2 text-white flex flex-col overflow-hidden h-auto mx-auto'>
  
        <h1 className='text-[30px] md:text-[32px] lg:text-[58px]  flex justify-center items-center flex-col text-center font-bold'>
        Think smarter. Adapt faster. Optimize your logistics for
            <div className='mx-auto w-full flex justify-center'>
            <div className={`absolute text-[#A77DFF] text-[32px] md:text-[92px]  ${visibleIndex === 0 ? 'animate-show' : 'animate-hide'}`}>
                efficiency.
            </div>
  
            <div className={`absolute text-[#A77DFF] text-[32px] md:text-[92px]  ${visibleIndex === 1 ? 'animate-show' : 'animate-hide'}`}>
            growth 
            </div>

            <div className={`absolute text-[#A77DFF] text-[32px] md:text-[92px]  ${visibleIndex === 2 ? 'animate-show' : 'animate-hide'}`}>
            success 
            </div>


            </div>
   
            
        
        </h1>

        

      
        {/* Animated text */}
   

        {/* Call to Action Buttons */}
        <div className='flex flex-col m-2 md:flex-row gap-12 mt-24  md:mt-[200px] text-[48px] '>
            <button className='bg-[#A77DFF] rounded-[10px] py-2 md:w-1/2 w-full text-[24px] font-bold text-white '>
            Sign up
            </button>
            <button className='rounded-[10px] py-2 md:w-1/2 w-full  border-[2px] text-[24px] font-bold border-white border-solid text-white'>
            Contact us
              </button>
          </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        .animate-show {
          animation: fadeInUp 1s ease-in-out forwards;
        }
        .animate-hide {
          animation: fadeOutDown 1s ease-in-out forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutDown {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
