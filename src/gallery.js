import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import mini from './images/minishell.jpg';
import scop from './images/scop.jpg';

const projects = [
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: mini,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: scop,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: mini,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: scop,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: mini,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: scop,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: mini,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: scop,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: mini,
  },
  {
    githubUrl: 'https://github.com/user/project2',
    imageUrl: scop,
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
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <img src={project.imageUrl} alt="Project Image" style={{ width: '80%' }} />
            </a>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default GallerySection;