import { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import { gsap } from 'gsap';

const navItems = ['Hero', 'About', 'Features','Story', 'Contact', 'Footer'];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isIndicatorActive, setIsIndicatorActive] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);

    const navContainerRef = useRef<HTMLDivElement>(null);
    const audioElementRef = useRef<HTMLAudioElement>(null);

    const { y: currentScrollY } = useWindowScroll();

    useEffect(() => {
        if (currentScrollY === 0) { 
            setIsNavVisible(true);
            navContainerRef.current?.classList.remove('floating-nav');
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current?.classList.add('floating-nav');
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current?.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY])

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    
    }, [isNavVisible])
    
    
    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    }

    // useEffect(() => {
    //     if (isAudioPlaying) { 
    //         audioElementRef.current?.play();
    //     } else {
    //         audioElementRef.current?.pause();
    //     }
    // }, [isAudioPlaying])
    
    useEffect(() => {
        const audio = audioElementRef.current;
        if (!audio) return;

        if (isAudioPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Autoplay was blocked by the browser.
                    console.warn("Audio autoplay was prevented.", error);
                    // Set state to false so the UI indicator is correct.
                    setIsAudioPlaying(false);
                    setIsIndicatorActive(false);

                    // Add a one-time event listener to play on the first user interaction.
                    const playOnFirstInteraction = () => {
                        audio.play().then(() => {
                            setIsAudioPlaying(true);
                            setIsIndicatorActive(true);
                        }).catch(err => {
                            console.error("Failed to play audio even after interaction.", err);
                        });
                        // Clean up the listener after it runs.
                        window.removeEventListener('click', playOnFirstInteraction);
                        window.removeEventListener('keydown', playOnFirstInteraction);
                    };

                    window.addEventListener('click', playOnFirstInteraction, { once: true });
                    window.addEventListener('keydown', playOnFirstInteraction, { once: true });
                });
            }
        } else {
            audio.pause();
        }
    }, [isAudioPlaying]);
    

  return (
      <div ref={navContainerRef}
          className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
          <header className='absolute top-1/2 w-full -translate-y-1/2'>
              <nav className='flex size-full items-center justify-between p-4'>
                  <div className='flex items-center gap-7'>
                      <img src="/img/logo.png" alt="logo" className='w-10'/>
                      <Button
                          id='product-button'
                          title='Products'
                          rightIcon={<TiLocationArrow />}
                          containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
                      />
                  </div>

                  <div className='flex h-full items-center'>
                      <div className='hidden md:block'>
                          {navItems.map((item) => (
                              <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn after:nav-hover-btn-after 
                              hover:after:nav-hover-btn-after-hover dark:after:nav-hover-btn-after-dark">
                                  {item}
                              </a>
                          ))}
                      </div>
                        
                      <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
                          <audio
                              src="/audio/loop.mp3"
                              ref={audioElementRef}
                              className='hidden'
                              loop
                          />
                              {[1, 2, 3, 4].map((bar) => (
                                  <div
                                    key={bar}
                                    className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                    style={{animationDelay: `${bar * 0.1}s`}}/>
                              ))}             
                      </button>
                  </div>
              </nav>
          </header>
    </div>
  )
}

export default Navbar