import { useEffect, useRef, useState } from "react";
import GallerySection from "./gallery";
import { startAnimation } from "./animation";
import "./App.css";
import githubIcon from "./images/github.png";
import linkedinIcon from "./images/linkedin.png";

const BANNERS = [
  { text: "CHECKOUT GITHUB",        url: "https://github.com/kvebers",                icon: githubIcon,   key: "github"   },
  { text: "CONTACT ME ON LINKEDIN", url: "https://www.linkedin.com/in/karlisvebers/", icon: linkedinIcon, key: "linkedin" },
];

function App() {
  const canvasRef   = useRef(null);
  const githubRef   = useRef(null);
  const linkedinRef = useRef(null);
  const [banner, setBanner]   = useState(null);
  const [visible, setVisible] = useState(false);
  const [bannerBottom, setBannerBottom] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    const stop = startAnimation(canvasRef.current);
    return stop;
  }, []);

  useEffect(() => {
    const show = () => {
      const b   = BANNERS[indexRef.current % BANNERS.length];
      const ref = b.key === "github" ? githubRef : linkedinRef;
      indexRef.current++;

      if (ref.current) {
        const rect         = ref.current.getBoundingClientRect();
        const iconCenterY  = window.innerHeight - rect.top - rect.height / 2;
        setBannerBottom(iconCenterY);
      }

      setBanner(b);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const id = setInterval(show, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="projects-transition">
        <h2>Projects</h2>
      </div>
      <section className="gallery-section">
        <GallerySection />
      </section>
      <footer>
        <p>© 2026 Karlis Vilhelms Vebers</p>
      </footer>

      <div className="fixed-contacts">
        <a href="https://github.com/kvebers" target="_blank" rel="noopener noreferrer" className="contact-icon-link" ref={githubRef}>
          <img src={githubIcon} alt="GitHub" />
          <div className="contact-icon-overlay">GitHub</div>
        </a>
        <a href="https://www.linkedin.com/in/karlisvebers/" target="_blank" rel="noopener noreferrer" className="contact-icon-link" ref={linkedinRef}>
          <img src={linkedinIcon} alt="LinkedIn" />
          <div className="contact-icon-overlay">LinkedIn</div>
        </a>
      </div>

      {banner && (
        <a
          href={banner.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`micro-banner ${visible ? "micro-banner--in" : "micro-banner--out"}`}
          style={{ bottom: `${bannerBottom}px`, transform: visible ? "translateX(0) translateY(50%)" : "translateX(calc(100% + 72px)) translateY(50%)" }}
        >
          <img src={banner.icon} alt="" />
          <span>{banner.text}</span>
        </a>
      )}
    </div>
  );
}

export default App;
