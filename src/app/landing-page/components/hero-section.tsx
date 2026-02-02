import React from 'react'
import Link from 'next/link'
import { Button } from '@/app/landing-page/components/ui/button'
import { HeroHeader } from './header'
import { ProgressiveBlur } from '@/app/landing-page/components/ui/progressive-blur'
import { IconCloud } from './magicui/icon-cloud'
import { motion } from 'motion/react'
import {data} from '../../../../public/DemoData/Data/DemoData'
import InfinityCards from './ui/InfinityCards'

export default function HeroSection() {
    
    const images=Array(21).fill('/Images/image.png')
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,ease: "easeOut" }}
        >
            <HeroHeader />
            <main className="overflow-x-hidden">
            <section>
                                        <div className="pb-16 pt-12 md:pb-20 lg:pb-20 lg:pt-10 border-red-900 dark:border-amber-100 border-2 m-5 mt-20 rounded-lg">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:flex lg:flex-row lg:items-center lg:gap-8">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">Where Talent<span className='text-primary'> Meets Fame</span></h1>
                                <p className="mt-8 max-w-2xl text-pretty text-lg">Stop posting alone. Start connecting with creators and audiences daily.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">Join Now</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div className="order-first mt-10 w-full h-64 sm:h-80 md:h-96 lg:order-last lg:h-auto lg:w-1/2 dark:mix-blend-lighten">
                                <div className="relative flex size-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-none mx-auto items-center justify-center overflow-hidden rounded-lg">
                                    <div className='transform scale-100 sm:scale-110 md:scale-125 lg:scale-120'>
                                        <IconCloud images={images} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>  
                <section className="bg-background pb-16 md:pb-32">
                    <div className="group relative m-auto max-w-6xl pr-10">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm">Reviews from our daily users</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <div className='m-[0,auto] p-[20px,0] max-w-4xl overflow-hidden flex [&>*]:flex-none [&>*]:w-full  justify-between gap-4'>
                                    <div className='flex gap-5 pr-5 will-change-transform animate-[scrolling_10s_linear_infinite] group-hover:[animation-play-state:paused]'>
                                        {
                                            data.map((data,index)=>(
                                                <InfinityCards image={data.img} content={data.review} key={index}/>
                                            ))
                                        }
                                    </div>
                                    <div aria-hidden className='flex gap-5 pr-5 will-change-transform animate-[scrolling_10s_linear_infinite] group-hover:[animation-play-state:paused]'>
                                        {
                                            data.map((data,index)=>(
                                                <InfinityCards image={data.img} content={data.review} key={index}/>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </motion.div>
    )
}
