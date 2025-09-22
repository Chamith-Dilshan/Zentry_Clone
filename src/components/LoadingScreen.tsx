import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
    onComplete: () => void;
    videoSources?: string[]; // Optional: pass specific videos to track
}

const LoadingScreen = ({ onComplete, videoSources }: LoadingScreenProps) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [actualProgress, setActualProgress] = useState(0);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('Initializing assets...');

    // Default video sources if not provided
    const defaultVideoSources = [
        'videos/hero-1.mp4',
        'videos/hero-2.mp4',
        'videos/hero-3.mp4',
        'videos/hero-4.mp4',
        'videos/feature-1.mp4',
        'videos/feature-2.mp4',
        'videos/feature-3.mp4',
        'videos/feature-4.mp4'
    ];

    const videosToLoad = videoSources || defaultVideoSources;
    const totalVideos = videosToLoad.length;

    // Animate progress counter smoothly
    useEffect(() => {
        gsap.to({ value: displayProgress }, {
            value: actualProgress,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: function () {
                const newProgress = Math.round(this.targets()[0].value);
                setDisplayProgress(newProgress);

                // Update status messages based on progress
                if (newProgress < 25) {
                    setLoadingStatus('Initializing assets...');
                } else if (newProgress < 50) {
                    setLoadingStatus('Loading videos...');
                } else if (newProgress < 75) {
                    setLoadingStatus('Preparing experience...');
                } else if (newProgress < 100) {
                    setLoadingStatus('Almost ready...');
                } else {
                    setLoadingStatus('Welcome to Zentry!');
                }
            }
        });
    }, [actualProgress, displayProgress]);

    // Video loading logic
    useEffect(() => {
        let loadedCount = 0;
        let loadingStarted = false;

        const updateProgress = () => {
            const progress = Math.round((loadedCount / totalVideos) * 100);
            setActualProgress(progress);

            if (progress === 100 && !isAnimatingOut) {
                setTimeout(() => {
                    startExitAnimation();
                }, 800); // Wait a bit before starting exit
            }
        };

        // Exit animation
        const startExitAnimation = () => {
            if (isAnimatingOut) return;
            setIsAnimatingOut(true);

            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                }
            });

            tl.to('.loading-text', {
                opacity: 0,
                y: -20,
                duration: 0.6,
                ease: 'power2.in'
            })
                .to('.loading-progress', {
                    scaleX: 0,
                    duration: 0.4,
                    ease: 'power2.in'
                }, '-=0.4')
                .to('.loading-screen', {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in'
                }, '-=0.3');
        };

        const loadVideo = (src: string, index: number): Promise<void> => {
            return new Promise((resolve) => {
                const video = document.createElement('video');
                video.preload = 'auto';
                video.muted = true;
                video.playsInline = true;
                video.crossOrigin = 'anonymous';

                const handleLoad = () => {
                    loadedCount++;
                    console.log(`✅ Video ${index + 1}/${totalVideos} loaded: ${src}`);
                    updateProgress();
                    cleanup();
                    resolve();
                };

                const handleError = (error: ErrorEvent) => {
                    loadedCount++;
                    console.warn(`⚠️ Video ${index + 1}/${totalVideos} failed to load: ${src}`, error);
                    updateProgress();
                    cleanup();
                    resolve();
                };

                const handleTimeout = () => {
                    loadedCount++;
                    console.warn(`⏱️ Video ${index + 1}/${totalVideos} loading timeout: ${src}`);
                    updateProgress();
                    cleanup();
                    resolve();
                };

                const cleanup = () => {
                    video.removeEventListener('canplaythrough', handleLoad);
                    video.removeEventListener('loadeddata', handleLoad);
                    video.removeEventListener('error', handleError);
                    clearTimeout(timeoutId);
                };

                // Multiple event listeners for better compatibility
                video.addEventListener('canplaythrough', handleLoad, { once: true });
                video.addEventListener('loadeddata', handleLoad, { once: true });
                video.addEventListener('error', handleError, { once: true });

                // Timeout fallback (10 seconds per video)
                const timeoutId = setTimeout(handleTimeout, 10000);

                // Start loading
                video.src = src;
                video.load();
            });
        };

        const startLoading = async () => {
            if (loadingStarted) return;
            loadingStarted = true;

            console.log(`🎬 Starting to load ${totalVideos} videos...`);

            // Initial progress for assets/fonts (simulate 10%)
            setTimeout(() => {
                if (loadedCount === 0) {
                    setActualProgress(10);
                }
            }, 500);

            // Load videos in batches for better performance
            const batchSize = 3;
            for (let i = 0; i < videosToLoad.length; i += batchSize) {
                const batch = videosToLoad.slice(i, i + batchSize);
                const batchPromises = batch.map((src, batchIndex) =>
                    loadVideo(src, i + batchIndex)
                );

                await Promise.allSettled(batchPromises);

                // Small delay between batches to prevent overwhelming the browser
                await new Promise(resolve => setTimeout(resolve, 200));
            }

            console.log('🎉 All videos processing completed');
        };

        // Fallback: Force completion after 30 seconds
        const fallbackTimeout = setTimeout(() => {
            console.warn('🚨 Loading fallback triggered after 30 seconds');
            setActualProgress(100);
            setTimeout(startExitAnimation, 500);
        }, 30000);

        startLoading();

        return () => {
            clearTimeout(fallbackTimeout);
        };
    }, [videosToLoad, totalVideos, isAnimatingOut, onComplete]);



    return (
        <div className='loading-screen fixed inset-0 z-[9999] flex flex-col items-center 
        justify-center bg-blue-200'>
            {/* Background Animation */}
            <div className='absolute inset-0 overflow-hidden'>
                <div className='loading-bg-1 absolute -top-1/2 -left-1/2 w-full h-full 
                bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse'></div>
                <div className='loading-bg-2 absolute -bottom-1/2 -right-1/2 w-full 
                h-full bg-gradient-radial from-yellow-300/20 to-transparent
                rounded-full animate-pulse'
                    style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Loading Content */}
            <div className='relative z-10 text-center'>
                {/* Logo/Brand */}
                {/* <div className='loading-text mb-8'>
                    <h1 className='special-font text-6xl md:text-8xl text-white mb-4'>
                        Z<span className='text-yellow-300'>E</span>NTRY
                    </h1>
                    <p className='text-white/70 text-lg font-robert-regular'>
                        Enter the Metagame Layer
                    </p>
                </div> */}

                {/* Progress Section */}
                <div className='loading-text mt-12 w-80 max-w-sm'>
                    {/* Percentage */}
                    <div className='mb-6'>
                        <span className='text-5xl font-black text-white'>
                            {displayProgress}
                        </span>
                        <span className='text-2xl text-white/70 ml-1'>%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className='relative'>
                        {/* Background Bar */}
                        <div className='loading-progress w-full h-2 bg-white/20 rounded-full overflow-hidden'>
                            <div
                                className='loading-progress h-full bg-gradient-to-r 
                                from-yellow-300 to-white rounded-full transition-all 
                                duration-500 ease-out'
                                style={{ width: `${displayProgress}%` }}
                            ></div>
                        </div>

                        {/* Glow Effect */}
                        <div
                            className='absolute top-0 h-2 bg-gradient-to-r 
                            from-yellow-300/50 to-white/50 rounded-full blur-sm 
                            transition-all duration-500'
                            style={{ width: `${displayProgress}%` }}
                        ></div>
                    </div>

                    {/* Loading Status Text */}
                    <div className='mt-4 h-6'>
                        <p className='text-white/60 text-sm font-robert-regular'>
                            {loadingStatus}
                        </p>
                    </div>

                    {/* Video Counter */}
                    <div className='mt-2'>
                        <p className='text-white/40 text-xs font-robert-regular'>
                            Loading assets... ({Math.round((actualProgress / 100) * totalVideos)}/{totalVideos})
                        </p>
                    </div>
                </div>

                {/* Animated Dots */}
                <div className='loading-text flex justify-center mt-8 space-x-2'>
                    <div className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
                        style={{ animationDelay: '0ms' }}></div>
                    <div className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
                        style={{ animationDelay: '150ms' }}></div>
                    <div className='w-2 h-2 bg-white/60 rounded-full animate-bounce'
                        style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;