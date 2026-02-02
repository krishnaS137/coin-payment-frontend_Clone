import React from 'react'
import { BoxReveal } from './ui/box-reveal'


const HotSection = () => {
  return (
    <>
    <div className=" lg:ml-40 overflow-hidden py-8 md:mr-30 sm:mr-30">
      <div className=" mx-auto max-w-6xl px-6 lg:px-12 flex justify-center">
        <div className="w-full max-w-3xl mx-auto md:mx-0 md:ml-12 lg:ml-[110px] xl:ml-[140px] 2xl:ml-[180px]">
          <BoxReveal boxColor={"#A52A2A"} duration={0.5}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mt-3 text-center md:text-left">
              With Hot, You Can:
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#A52A2A"} duration={0.5}>
            <h3 className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-[1.7rem] mb-3 text-center md:text-left">
              The perfect place for <span className="text-[#A52A2A]">Content creators</span>
            </h3>
          </BoxReveal>

          <BoxReveal boxColor={"#A52A2A"} duration={0.5}>
            <div className="mt-4 sm:mt-6 text-base sm:text-lg md:text-[1.3rem] space-y-3 text-center md:text-left">
              <p className='mb-3'>
                -&gt; Step up, stand out, and own your spotlight..<br />
              </p>
              <p className='mb-3'>
                -&gt; Compete, create, and climb the leaderboard.<br />
              </p>
              <p className='mb-3'>
                -&gt; Build your circle, no matter your starting followers.
              </p>
            </div>
          </BoxReveal>
        </div>
      </div>
    </div>
    </>
  )
}

export default HotSection