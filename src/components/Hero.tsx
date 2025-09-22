import { useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoPreview from './VideoPreview';

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);

    const totalVideos = 4;
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    // const handelVideoLoad = () => {
    //     setLoadedVideos((prev) => prev + 1);
    // }

    const upcomingVideoIndex = () => (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex());
    }

    // useEffect(() => {
    //     if (loadedVideos === totalVideos -1) {
    //         setIsLoading(false);
    //     }
    // }, [loadedVideos])
    
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => { void nextVideoRef.current?.play(); },
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        {
            dependencies: [currentIndex],
            revertOnUpdate: true,
        }
    );

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });


    const getVideoSource = (index: number) => `videos/hero-${index}.mp4`;
    const getVideoPoster = (index: number) => `videos/thumbnails/hero-${index}.png`;

    return (
        <div id='hero' className='relative h-dvh w-screen overflow-x-hidden'>

            {/* {isLoading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot'/>
                        <div className='three-body__dot'/>
                        <div className='three-body__dot'/>
                    </div>
                </div>
            )} */}

            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden 
            rounded-lg bg-blue-75'>
                <div>

                    {/* 1. MINI VIDEO CONTAINER - Shows NEXT video preview (PAUSED) */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-96 
                    cursor-pointer overflow-hidden rounded-lg">
                        <VideoPreview>
                            <div
                                onClick={handleMiniVideoClick}
                                className="origin-center scale-50 opacity-0 transition-all 
                                duration-500 ease-in hover:scale-100 hover:opacity-100"
                            >
                                <video
                                    key={`mini-${currentIndex}`}
                                    ref={nextVideoRef}
                                    src={getVideoSource(upcomingVideoIndex())}
                                    poster={getVideoPoster(upcomingVideoIndex())}
                                    loop
                                    muted
                                    id="current-video"
                                    className="size-64 origin-center scale-150 object-cover object-center"
                                    //onLoadedData={handleVideoLoad}
                                />
                            </div>
                        </VideoPreview>
                    </div>

                    {/* 2. NEXT VIDEO - HIDDEN (for transition) */}
                    <video
                        key={`next-${currentIndex}`} 
                        ref={nextVideoRef}
                        src={getVideoSource(currentIndex)}
                        poster={getVideoPoster(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        //onLoadedData={handleVideoLoad}
                    />

                    {/* 1. BACKGROUND VIDEO - Currently playing video */}
                    <video
                        key={`background-${currentIndex}`}
                        src={getVideoSource(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        poster={getVideoSource(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        //onLoadedData={handleVideoLoad}
                    />
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