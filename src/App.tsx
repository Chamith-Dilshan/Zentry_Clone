import About from './components/About'
import Features from './components/Features'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidde'>
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  )
}

export default App