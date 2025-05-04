import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { slideshowData } from '../data/slideshow';

const Slideshow= () => {
  return (
    <section className="w-full">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showStatus={false} 
        showThumbs={false}
        interval={5000}
        transitionTime={500}
        className="relative"
      >
        {slideshowData.map((slide) => (
          <div key={slide.id} className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="object-cover h-full w-full" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end items-center text-white text-center p-8 md:p-12">
              <h2 className="text-2xl md:text-4xl font-heading font-bold mb-2">{slide.title}</h2>
              <p className="text-base md:text-lg max-w-2xl">{slide.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Slideshow;