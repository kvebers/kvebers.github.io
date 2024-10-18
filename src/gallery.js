import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    githubUrl: "https://github.com/kvebers/42-Scop",
    imageUrl: scop1,
  },
  {
    githubUrl: "https://github.com/kvebers/minishell",
    imageUrl: mini,
  },
  {
    githubUrl: "https://github.com/kvebers/cube4d",
    imageUrl: cube,
  },
  {
    imageUrl: tractor,
  },
  {
    imageUrl: tank,
  },
  {
    githubUrl: "https://github.com/kvebers/irc",
    imageUrl: irc,
  },
  {
    githubUrl: "https://github.com/kvebers/1bit",
    imageUrl: bit,
  },
  {
    githubUrl: "https://github.com/kvebers/loong",
    imageUrl: long,
  },
  {
    githubUrl: "https://github.com/kvebers/pushswap",
    imageUrl: push,
  },
  {
    githubUrl: "https://github.com/kvebers/42-Scop",
    imageUrl: scop2,
  },
  {
    githubUrl: "https://github.com/kvebers/Python_Piscine",
    imageUrl: python,
  },
  {
    imageUrl: watt,
  },
  {
    imageUrl: space,
  },
  {
    githubUrl: "https://github.com/kvebers/get_next_line",
    imageUrl: rick,
  },
];

function GallerySection() {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <section className="gallery-section">
      <h2>Projects</h2>
      <Slider {...settings}>
        {projects.map((project, index) => (
          <div key={index}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={project.imageUrl}
                alt="Project Image"
                style={{ width: "80%" }}
              />
            </a>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default GallerySection;
