import React from 'react';
import GallerySection from './gallery';
import useParticles from './particles';
import './App.css';
import githubIcon from './images/github.png'; // replace with your path
import linkedinIcon from './images/linkedin.png';

function App() {
  useParticles();
  return (
    <div className="App">
      <div className="App-header">
        <h1>Kārlis Vēbers</h1>
        <canvas id="particleCanvas"></canvas>
      </div>
      <section class="about-section">
        <p>I'm a programmer with hands-on experience in multiple languages like C, C++, C# and Python.</p>
        <p>I have a strong foundation in robotics and design, with an emphasis on product development.</p>
        <p>My passion lies not only in coding but also in achieving visual results, whether it's through graphics or data presentation.  </p>
      </section>
      <section class="gallery-section">
        <GallerySection/>
      </section>
      <section class="contact-section">
        <h2>Contacts</h2>
          <div className="contact-icons">
          <a href="https://github.com/kvebers" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" style={{ width: '128px', margin: '0 10px' }} />
          </a>
          <a href="https://www.linkedin.com/in/karlisvebers/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" style={{ width: '128px', margin: '0 10px' }} />
          </a>
          </div>
      </section>
      <footer>
        <p>© 2023 Karlis Vilhelms Vebers</p>
      </footer>
    </div>
  );
}

export default App;
