import { useEffect, useRef } from "react";
import { startStickman } from "./stickman";
import mini from "./images/minishell.jpg";
import scop1 from "./images/scop1.jpg";
import scop2 from "./images/scop2.jpg";
import irc from "./images/irc.jpg";
import cube from "./images/cube4d.jpg";
import bit from "./images/1bit.jpg";
import long from "./images/long.jpg";
import push from "./images/push.jpg";
import python from "./images/python.jpg";
import space from "./images/space.jpg";
import tank from "./images/tank.jpg";
import tractor from "./images/tractor.jpg";
import watt from "./images/watt.jpg";
import rick from "./images/rick.jpg";

const projects = [
  {
    name: "42-Scop",
    githubUrl: "https://github.com/kvebers/42-Scop",
    imageUrl: scop1,
  },
  {
    name: "Minishell",
    githubUrl: "https://github.com/kvebers/minishell",
    imageUrl: mini,
  },
  {
    name: "Cube 4D",
    githubUrl: "https://github.com/kvebers/cube4d",
    imageUrl: cube,
  },
  { name: "Tractor", imageUrl: tractor },
  { name: "Tank", imageUrl: tank },
  {
    name: "IRC Server",
    githubUrl: "https://github.com/kvebers/irc",
    imageUrl: irc,
  },
  {
    name: "1Bit Game",
    githubUrl: "https://github.com/kvebers/1bit",
    imageUrl: bit,
  },
  {
    name: "Loong",
    githubUrl: "https://github.com/kvebers/loong",
    imageUrl: long,
  },
  {
    name: "Push Swap",
    githubUrl: "https://github.com/kvebers/pushswap",
    imageUrl: push,
  },
  {
    name: "42-Scop II",
    githubUrl: "https://github.com/kvebers/42-Scop",
    imageUrl: scop2,
  },
  {
    name: "Python Piscine",
    githubUrl: "https://github.com/kvebers/Python_Piscine",
    imageUrl: python,
  },
  { name: "Watt", imageUrl: watt },
  { name: "Space", imageUrl: space },
  {
    name: "Get Next Line",
    githubUrl: "https://github.com/kvebers/get_next_line",
    imageUrl: rick,
  },
];

function GallerySection() {
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);

  useEffect(() => {
    const getCards = () => Array.from(sectionRef.current.querySelectorAll('.project-card'));
    return startStickman(canvasRef.current, getCards);
  }, []);

  return (
    <section className="gallery-section" ref={sectionRef}>
      <canvas ref={canvasRef} className="stickman-canvas" />
      <div className="projects-grid">
        {projects.map((project, index) => {
          const inner = (
            <>
              <img src={project.imageUrl} alt={project.name} />
              <div className="project-card-overlay">
                <span className="project-card-name">{project.name}</span>
                {project.githubUrl && (
                  <span className="project-card-link">View on GitHub</span>
                )}
              </div>
            </>
          );

          return project.githubUrl ? (
            <a
              key={index}
              className="project-card"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {inner}
            </a>
          ) : (
            <div key={index} className="project-card">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GallerySection;
