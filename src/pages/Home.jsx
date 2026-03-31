import { COLORS, FONT } from '../styles/theme';
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
    <div style={{
      fontFamily: FONT,
      minHeight: '100vh',
      width: '100%',
      overflow: 'auto',
      overflowX: 'hidden',
      scrollSnapType: 'y proximity',
      backgroundColor: COLORS.bg,
      color: COLORS.text,
    }}>
      <GenerativeBackground
        sketch={saturnSketch}
        style={{ position: 'fixed', zIndex: 0 }}
      />
      <a
        href="#about"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 999,
        }}
        onFocus={(e) => {
          Object.assign(e.currentTarget.style, {
            position: 'fixed', left: '16px', top: '16px',
            width: 'auto', height: 'auto', overflow: 'visible',
            padding: '12px 24px', backgroundColor: COLORS.red,
            color: COLORS.white, fontSize: '14px', fontFamily: FONT,
          });
        }}
        onBlur={(e) => {
          Object.assign(e.currentTarget.style, {
            position: 'absolute', left: '-9999px',
            width: '1px', height: '1px', overflow: 'hidden',
          });
        }}
      >
        Skip to content
      </a>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GallerySection />
      <Experience />
      <Education />
      <Footer />
    </div>
  );
};

export default Home;
