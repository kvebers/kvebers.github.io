import React from 'react';
import useParticles from './particles';
import './App.css';

function App() {
  useParticles();
  return (
    <div className="App">
      <div className="App-header">
        <h1>Kārlis Vēbers</h1>
        <canvas id="particleCanvas"></canvas>
      </div>
      <section class="about-section">
        <p>I'm a programmer with hands-on experience in multiple languages like C, C++, C# and Python. I have a strong foundation in robotics and design, with an emphasis on product development. My passion lies not only in coding but also in achieving visual results, whether it's through graphics or data presentation.  </p>
      </section>
      <section class="gallery-section">
        <h2>My Projects</h2>
        <p>Detail your services or any other information you'd like to convey to your visitors here.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Provide contact information or a form here for users to get in touch.</p>
      </section>
      <footer>
        <p>© 2023 Karlis Vilhelms Vebers</p>
      </footer>
    </div>
  );
}

export default App;