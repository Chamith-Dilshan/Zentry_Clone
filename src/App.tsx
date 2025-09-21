import { useState } from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Story from './components/Story'
import LoadingScreen from './components/LoadingScreen'

const App = () => {
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowContent(true);
    document.body.style.overflow = 'unset';
  };

  // Disable scroll during loading
  if (!showContent) {
    document.body.style.overflow = 'hidden';
  }

  // Optional: Specify which videos to track
  const criticalVideos = [
    'videos/hero-1.mp4',
    'videos/hero-2.mp4',
    'videos/hero-3.mp4',
    'videos/hero-4.mp4',
  ];

  return (
    <>
      {/* Self-contained Loading Screen */}
      {!showContent && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          videoSources={criticalVideos} // Optional: specify videos to track
        />
      )}

      {/* Main Content */}
      {showContent && (
        <main className='relative min-h-screen w-screen overflow-x-hidden'>
          <Navbar />
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}

export default App