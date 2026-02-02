import React from 'react'
import { PixelImage } from './ui/pixel-image'
import { RotatingTextDemo } from './ui/RotatingText'

const BodySection = () => {
  const texts=[
    'Where Creators Stay HOT',
    'Join In. Stand Out. Shine Bright.',
    'Post what you love. Find who loves it too.',
    'Compete. Connect. Conquer.',
    'Keep it HOT. Keep it real.',
  ]
  const subtexts=[
    'House of Talent isn’t just a platform — it’s your arena. Share your art, own the spotlight, and turn your everyday content into a journey toward fame and recognition.',
    'Create your profile, connect with trendsetters, and make your mark in the HOT community. Every big name starts somewhere — start here.',
    'From dance moves to daily thoughts — express yourself freely and discover others doing the same.',
    'Compete in HOT challenges, turn your creativity into impact, and earn genuine love from a community that celebrates real talent.',
    'Share your moments, your creativity, and your vibe — because authenticity is what makes this community glow.',
  ]
  return (
    <div className="py-30 px-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* Rotating Text Section - now on the left */}
        <div className="flex-1 max-w-lg -mt-32 lg:-mt-80 mr-10">
          <div className="space-y-4">
            {/* Main Text */}
            <div>
              <RotatingTextDemo 
                delay={0} 
                y={0} 
                duration={3500} 
                texts={texts} 
                className="text-4xl font-semibold" 
              />
            </div>
            
            {/* Subtext */}
            <div>
              <RotatingTextDemo 
                delay={0} 
                y={0} 
                duration={3500} 
                texts={subtexts} 
                className="text-lg text-[#696969] dark:text-[#FAEBD7] opacity-75 mt-20 lg:mt-15" 
              />
            </div>
          </div>
        </div>

        {/* Pixel Image Section - now on the right */}
        <div className="flex-shrink-0">
          <PixelImage
            src="/Images/monetizing-content-6918852_1280.jpg"
            customGrid={{ rows: 4, cols: 6 }}
            grayscaleAnimation
          />
        </div>
      </div>
    </div>
  )
}

export default BodySection