import React, { useState, useEffect } from 'react';

function Slideshow({ slides, autoplay = true, interval = 4000 }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    let intervalId;
    if (autoplay) {
      intervalId = setInterval(nextSlide, interval);
    }
    return () => clearInterval(intervalId);
  }, [autoplay, interval]);

  return (
    <div className="slideshow">
      <img src={slides[slideIndex]} alt={`Slide ${slideIndex + 1}`} />
      <button onClick={prevSlide}>&#10094;</button>
      <button onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default Slideshow;
