import Header from '../components/Header';
import GenerativeBackground from '../components/GenerativeBackground';
import saturnSketch from '../sketches/saturnSketch';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import GallerySection from '../sections/GallerySection';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Education from '../sections/Education';
import Footer from '../sections/Footer';

const Home = () => {
  return (
    <>
      <GenerativeBackground sketch={saturnSketch} style={{ position: 'fixed', zIndex: 'var(--z-canvas)' }} />
      <a href="#about" className="skip">
        Skip to content
      </a>
      <Header />
      <main className="page">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GallerySection />
        <Experience />
        <Education />
        <Footer />
      </main>
    </>
  );
};

export default Home;
