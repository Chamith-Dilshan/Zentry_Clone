import React, { useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;

    // THREE SEPARATE REFS FOR THREE VIDEO PLAYERS
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);  // Background video
    const nextVideoRef = useRef<HTMLVideoElement>(null);        // Hidden transition video
    const miniVideoRef = useRef<HTMLVideoElement>(null);       // Mini preview video

    const handelVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex = () => (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex());
    }

    useGSAP(() => {
        if (hasClicked) {
            gsap.set('#next-video', { visibility: 'visible' });

            gsap.from('#mini-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            })

            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => {
                    // Start the hidden video and pause ALL other videos
                    if (nextVideoRef.current) {
                        nextVideoRef.current.play();
                    }
                    if (miniVideoRef.current) {
                        miniVideoRef.current.pause();
                    }
                    if (backgroundVideoRef.current) {
                        backgroundVideoRef.current.pause();
                    }
                },
                onComplete: () => {
                    // After transition, reset mini video for next interaction
                    if (miniVideoRef.current) {
                        miniVideoRef.current.currentTime = 0;
                        miniVideoRef.current.pause(); // Ensure it stays paused
                    }

                    // Update background video to match current state
                    if (backgroundVideoRef.current) {
                        backgroundVideoRef.current.src = getVideoSource(currentIndex);
                        backgroundVideoRef.current.load();
                        backgroundVideoRef.current.play();
                    }

                    // Hide the next video after transition
                    gsap.set('#next-video', { visibility: 'hidden' });
                }
            })
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true })

    const getVideoSource = (index: number) => `videos/hero-${index}.mp4`;

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden 
            rounded-lg bg-blue-75'>
                <div>
                    {/* 1. BACKGROUND VIDEO - Currently playing video */}
                    <video
                        ref={backgroundVideoRef}
                        src={getVideoSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 size-full object-cover object-center z-0'
                        onLoadedData={handelVideoLoad}
                    />

                    {/* 2. NEXT VIDEO - HIDDEN (for transition) */}
                    <video
                        ref={nextVideoRef}
                        src={getVideoSource(currentIndex)}
                        loop
                        muted
                        id='next-video'
                        className='absolute-center invisible absolute z-20
                        size-1/2 object-cover object-center'
                        onLoadedData={handelVideoLoad}
                    />

                    {/* 3. MINI VIDEO CONTAINER - Shows NEXT video preview (PAUSED) */}
                    <div className='mask-clip-path absolute-center absolute z-50 
                    size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVideoClick} className='origin-center
                        scale-50 opacity-0 transition-all duration-500 ease-in
                        hover:scale-100 hover:opacity-100'>
                            <video
                                ref={miniVideoRef}
                                src={getVideoSource(upcomingVideoIndex())}
                                loop
                                muted
                                id='current-video'
                                className='size-64 origin-center scale-150 object-cover
                                object-center'
                                onLoadedData={handelVideoLoad}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Right corner text*/}
                <h1 className='special-font hero-heading sm:hero-heading-sm 
                md:hero-heading-md lg:hero-heading-lg  absolute bottom-5
                right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>

                {/* Top left corner text */}
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading sm:hero-heading-sm 
                        md:hero-heading-md lg:hero-heading-lg
                        text-blue-100'>redefi<b>n</b>e
                        </h1>
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>
                        <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />}
                            containerClass='bg-yellow-300 flex-center gap-1' />
                    </div>
                </div>
            </div>

            {/* Bottom Right corner text*/}
            <h1 className='special-font hero-heading sm:hero-heading-sm 
                md:hero-heading-md lg:hero-heading-lg absolute bottom-5
                right-5 text-black'>G<b>a</b>ming</h1>
        </div>
    )
}

export default Hero